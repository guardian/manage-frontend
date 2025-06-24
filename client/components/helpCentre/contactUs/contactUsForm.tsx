import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans15,
	textSans17,
	textSansBold17,
} from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import type { ChangeEvent, FormEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import type { ContactUsFormPayload } from '../../../../shared/contactUsTypes';
import {
	base64FromFile,
	MAX_FILE_ATTACHMENT_SIZE_KB,
	VALID_IMAGE_FILE_EXTENSIONS,
	VALID_IMAGE_FILE_MIME_TYPES,
} from '../../../../shared/fileUploadUtils';
import { isEmail } from '../../../../shared/validationUtils';
import type { Grecaptcha } from '../../../utilities/captcha';
import { ErrorIcon } from '../../mma/shared/assets/ErrorIcon';
import { CallCentreEmailAndNumbers } from '../../shared/CallCenterEmailAndNumbers';
import { FormError } from '../../shared/FormError';
import { Input } from '../../shared/Input';
import { Spinner } from '../../shared/Spinner';
import { UploadFileInput } from './UploadFileInput';

interface ContactUsFormProps {
	submitCallback: (payload: ContactUsFormPayload) => Promise<boolean>;
	title: string;
	subject: string;
	editableSubject?: boolean;
	additionalCss?: SerializedStyles;
}

interface FormElemValidationObject {
	isValid: boolean;
	errorMessage: string;
}

type FieldKey =
	| 'name'
	| 'email'
	| 'subject'
	| 'message'
	| 'captcha'
	| 'fileAttachment';

interface FormValidationState
	extends Record<FieldKey, FormElemValidationObject> {
	inValidationMode: boolean;
}

type AutoFocusFieldState = Partial<Record<FieldKey, boolean>>;

type ContactUsFormStatus = 'form' | 'submitting' | 'failure';

declare const window: Window & {
	grecaptcha: Grecaptcha;
	v2ReCaptchaOnLoadCallback: () => void;
};

export const ContactUsForm = (props: ContactUsFormProps) => {
	const [captchaToken, setCaptchaToken] = useState<string>('');
	const [subject, setSubject] = useState<string>(props.subject);
	const [name, setName] = useState<string>(
		(typeof window !== 'undefined' &&
			window?.guardian?.identityDetails?.displayName) ||
			'',
	);
	const [email, setEmail] = useState<string>(
		(typeof window !== 'undefined' &&
			window.guardian?.identityDetails?.email) ||
			'',
	);
	const [message, setMessage] = useState<string>('');
	const [messageRemainingCharacters, setMessageRemainingCharacters] =
		useState<number>(2500);

	const [fileAttachment, setFileAttachment] = useState<File | undefined>();

	const [status, setStatus] = useState<ContactUsFormStatus>('form');

	const [showCustomerServiceInfo, setShowCustomerServiceInfo] =
		useState<boolean>(false);

	const mandatoryFieldMessage = 'You cannot leave this field empty';

	const [autoFocusField, setAutoFocusField] = useState<AutoFocusFieldState>(
		{},
	);
	const [formValidationState, setFormValidationState] =
		useState<FormValidationState>({
			inValidationMode: false,
			name: {
				isValid: true,
				errorMessage: mandatoryFieldMessage,
			},
			email: {
				isValid: true,
				errorMessage: 'Please insert a valid email address.',
			},
			subject: {
				isValid: true,
				errorMessage: mandatoryFieldMessage,
			},
			message: {
				isValid: true,
				errorMessage: mandatoryFieldMessage,
			},
			captcha: {
				isValid: !!captchaToken.length,
				errorMessage: 'Please confirm you are not a robot',
			},
			fileAttachment: {
				isValid: true,
				errorMessage: 'There is a maximum file size limit of 5mb',
			},
		});

	const validateForm = useCallback(
		(doAutoFocus: boolean = false) => {
			const isNameValid = !!name.trim().length;
			const isEmailValid = isEmail(email.trim());
			const isSubjectValid = !!subject.trim().length;
			const isDetailsValid = !!message.trim().length;
			const isFileAttachmentValid =
				fileAttachment === undefined ||
				fileAttachment.size / 1024 <= MAX_FILE_ATTACHMENT_SIZE_KB;

			const fieldValidations: Record<FieldKey, boolean> = {
				name: isNameValid,
				email: isEmailValid,
				subject: isSubjectValid,
				message: isDetailsValid,
				fileAttachment: isFileAttachmentValid,
				captcha: !!captchaToken.length,
			};

			const invalidFields = (
				Object.keys(fieldValidations) as FieldKey[]
			).filter((field) => !fieldValidations[field]);

			const firstInvalidField = invalidFields[0];
			const isFormInValidState = !invalidFields.length;

			setFormValidationState((prevState) => ({
				...prevState,
				inValidationMode: !isFormInValidState,
				name: { ...prevState.name, isValid: isNameValid },
				email: { ...prevState.email, isValid: isEmailValid },
				subject: {
					...prevState.subject,
					isValid: isSubjectValid,
				},
				message: {
					...prevState.message,
					isValid: isDetailsValid,
				},
				fileAttachment: {
					...prevState.fileAttachment,
					isValid: isFileAttachmentValid,
				},
				captcha: {
					...prevState.captcha,
					isValid: !!captchaToken.length,
				},
			}));

			if (doAutoFocus && firstInvalidField) {
				setAutoFocusField({
					[firstInvalidField]: true,
				});
			}

			return isFormInValidState;
		},
		[captchaToken, email, fileAttachment, message, name, subject],
	);

	useEffect(() => {
		if (window.grecaptcha) {
			renderReCaptcha();
		} else {
			const script = document.createElement('script');
			script.setAttribute(
				'src',
				'https://www.google.com/recaptcha/api.js?onload=v2ReCaptchaOnLoadCallback&render=explicit',
			);
			// tslint:disable-next-line:no-object-mutation
			window.v2ReCaptchaOnLoadCallback = renderReCaptcha;
			document.head.appendChild(script);
		}
	}, []);

	useEffect(() => {
		if (!formValidationState.fileAttachment.isValid) {
			validateForm();
		}
	});

	useEffect(() => {
		if (formValidationState.inValidationMode) {
			validateForm();
		}
	}, [
		name,
		email,
		subject,
		message,
		fileAttachment,
		captchaToken,
		formValidationState.inValidationMode,
		validateForm,
	]);

	const renderReCaptcha = () => {
		window.grecaptcha.render('recaptcha', {
			sitekey: window.guardian?.recaptchaPublicKey,
			callback: (token: string) => setCaptchaToken(token),
		});
	};

	return (
		<form
			onSubmit={async (event: FormEvent) => {
				event.preventDefault();
				if (validateForm(true)) {
					setStatus('submitting');
					props
						.submitCallback({
							name,
							subject,
							email,
							message,
							captchaToken,
							attachment: fileAttachment && {
								name: fileAttachment.name,
								contents: (await base64FromFile(
									fileAttachment,
								)) as string,
							},
						})
						.then((success) => {
							if (!success) {
								setStatus('failure');
							}
						});
				}
			}}
			css={css`
				margin-top: ${space[9]}px;
			`}
		>
			<fieldset
				onChange={() => {
					if (status === 'failure') {
						setStatus('form');
					}
					if (Object.keys(autoFocusField).length > 0) {
						setAutoFocusField({});
					}
				}}
				css={css`
					border: 1px solid ${palette.neutral[86]};
					margin: 0 0 ${space[5]}px;
					padding: 0;
				`}
			>
				<legend
					css={css`
						display: block;
						width: 100%;
						margin: 0;
						padding: ${space[3]}px;
						float: left;
						background-color: ${palette.neutral[97]};
						border-bottom: 1px solid ${palette.neutral[86]};
						${textSansBold17};
						${from.tablet} {
							padding: ${space[3]}px ${space[5]}px;
						}
					`}
				>
					{props.title}
				</legend>
				<p
					css={css`
						${textSans17};
						margin: ${space[5]}px;
						:before {
							display: block;
							content: '';
							clear: both;
							padding-top: ${space[5]}px;
						}
					`}
				>
					Let us know the details of what you'd like to discuss and we
					will aim to get back to you as soon as possible. Please note
					if you are contacting us regarding an account you hold with
					us you will need to use the email you registered with.
				</p>
				<Input
					label="Full Name"
					width={50}
					changeSetState={(newName) =>
						setName(newName.substring(0, 50))
					}
					value={name}
					additionalCss={css`
						margin: ${space[5]}px;
					`}
					inErrorState={
						formValidationState.inValidationMode &&
						!formValidationState.name.isValid
					}
					errorMessage={formValidationState.name.errorMessage}
					setFocus={autoFocusField.name}
				/>
				<Input
					label="Email address"
					secondaryLabel="If you are contacting us regarding an account you hold with us you must use the email you registered with"
					width={50}
					changeSetState={(newEmail) =>
						setEmail(newEmail.substring(0, 50))
					}
					value={email}
					additionalCss={css`
						margin: ${space[5]}px;
					`}
					inErrorState={
						formValidationState.inValidationMode &&
						!formValidationState.email.isValid
					}
					errorMessage={formValidationState.email.errorMessage}
					setFocus={autoFocusField.email}
				/>
				{props.editableSubject ? (
					<Input
						label="Subject of enquiry"
						type="text"
						width={50}
						changeSetState={(newSubject) =>
							setSubject(newSubject.substring(0, 100))
						}
						value={subject}
						additionalCss={css`
							margin: ${space[5]}px;
						`}
						inErrorState={
							formValidationState.inValidationMode &&
							!formValidationState.subject.isValid
						}
						errorMessage={formValidationState.subject.errorMessage}
						setFocus={autoFocusField.subject}
					/>
				) : (
					<label
						css={css`
							display: block;
							color: ${palette.neutral[7]};
							${textSansBold17};
							max-width: 50ch;
							margin: ${space[5]}px;
						`}
					>
						Subject of enquiry
						<span
							css={css`
								display: block;
								font-weight: normal;
							`}
						>
							{subject}
						</span>
					</label>
				)}
				<label
					css={css`
						display: block;
						color: ${palette.neutral[7]};
						${textSansBold17};
						max-width: 50ch;
						margin: ${space[5]}px;
					`}
				>
					Problem details
					{formValidationState.inValidationMode &&
						!formValidationState.message.isValid && (
							<span
								css={css`
									display: block;
									color: ${palette.error[400]};
									font-weight: normal;
								`}
							>
								<i
									css={css`
										margin-right: 4px;
									`}
								>
									<ErrorIcon />
								</i>
								{formValidationState.message.errorMessage}
							</span>
						)}
					<textarea
						id="contact-us-message"
						name="message"
						rows={2}
						maxLength={2500}
						value={message}
						onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
							setMessage(e.target.value);
							setMessageRemainingCharacters(
								2500 - e.target.value.length,
							);
						}}
						css={css`
							width: 100%;
							border: ${formValidationState.inValidationMode &&
							!formValidationState.message.isValid
								? `4px solid ${palette.error[400]}`
								: `2px solid ${palette.neutral[60]}`};
							padding: 12px;
							resize: vertical;
							${textSans17};
						`}
						ref={(el) => {
							if (el && autoFocusField.message) {
								el.focus();
							}
						}}
					/>
					<span
						css={css`
							display: block;
							text-align: right;
							${textSans15};
							color: ${palette.neutral[46]};
						`}
					>
						{messageRemainingCharacters} characters remaining
					</span>
				</label>
				<UploadFileInput
					title="Upload image"
					optional
					description={`File must be in ${VALID_IMAGE_FILE_EXTENSIONS.join(
						', ',
					).replace(/,(?=[^,]*$)/, ' or ')} format and less than 5MB`}
					allowedFileFormats={VALID_IMAGE_FILE_MIME_TYPES}
					changeSetState={setFileAttachment}
					inErrorState={
						formValidationState.inValidationMode &&
						!formValidationState.fileAttachment.isValid
					}
					errorMessage={
						formValidationState.fileAttachment.errorMessage
					}
					additionalCss={css`
						margin: ${space[5]}px;
					`}
					setFocus={autoFocusField.fileAttachment}
				/>
			</fieldset>
			{status === 'failure' && (
				<FormError
					title="Something went wrong when submitting your form"
					messages={[
						<>
							Please try again or if the problem persists please
							contact{' '}
							<Button
								priority="subdued"
								cssOverrides={css`
									font-weight: normal;
									text-decoration: underline;
								`}
								onClick={() => setShowCustomerServiceInfo(true)}
							>
								Customer Service
							</Button>
						</>,
					]}
				/>
			)}
			{showCustomerServiceInfo && <CallCentreEmailAndNumbers />}
			<div
				css={css`
					margin: ${space[5]}px 0;
				`}
			>
				{formValidationState.inValidationMode &&
					!formValidationState.captcha.isValid && (
						<span
							css={css`
								display: block;
								color: ${palette.error[400]};
								${textSans17};
							`}
						>
							<i
								css={css`
									margin-right: 4px;
								`}
							>
								<ErrorIcon />
							</i>
							{formValidationState.captcha.errorMessage}
						</span>
					)}
				<div id="recaptcha" />
			</div>
			<Button
				type="submit"
				iconSide="right"
				icon={
					status === 'submitting' ? (
						<Spinner scale={0.5} />
					) : undefined
				}
				disabled={status === 'submitting'}
			>
				Submit
			</Button>
		</form>
	);
};
