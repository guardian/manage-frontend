import { css } from '@emotion/react';
import { palette, space, textSans14 } from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import * as Sentry from '@sentry/browser';
import { Form, Formik } from 'formik';
import { useCallback } from 'react';
import type { ChangeEvent, FC } from 'react';
import { validateAvatarFile } from '@/shared/fileUploadUtils';
import { trackEvent } from '../../../../utilities/analytics';
import { Spinner } from '../../../shared/Spinner';
import { AvatarError } from '../idapi/avatar';
import * as AvatarAPI from '../idapi/avatar';
import { IdentityLocations } from '../IdentityLocations';
import { PageSection } from '../PageSection';
import { errorMessageCss, labelCss } from '../sharedStyles';
import {
	getData,
	isErrored,
	isLoading,
	isSuccessful,
	useAsyncSource,
} from '../useAsyncSource';

interface AvatarSectionProps {
	userId: string;
}

const imgCss = css`
	border: 0;
	border-radius: 50%;
	height: 60px;
	width: 60px;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- we're only assuming the argument object is an error object?
const errorHandler = (e: any) => {
	if (e instanceof AvatarError && !e.reportToSentry) {
		return;
	}

	Sentry.captureException(e);
	trackEvent({
		eventCategory: 'publicProfileError',
		eventAction: 'error',
		eventLabel: e.toString(),
	});
};

export const AvatarSection: FC<AvatarSectionProps> = (props) => {
	const { userId } = props;
	const [avatarSaveState, saveAvatar] = useAsyncSource(
		AvatarAPI.write,
		errorHandler,
	);
	const [avatarGetState, getAvatar] = useAsyncSource(
		AvatarAPI.read,
		errorHandler,
	);

	interface AvatarPayload {
		file: File | null;
	}

	useCallback(() => {
		getAvatar();
	}, [getAvatar]);

	const avatarDisplay = () => {
		const url = isSuccessful(avatarGetState)
			? getData(avatarGetState).data.avatarUrl
			: `${IdentityLocations.AVATAR_USER_IMAGES}/${userId}`;
		const loading = isLoading(avatarGetState);
		return <>{loading ? <Spinner /> : <img css={imgCss} src={url} />}</>;
	};

	const avatarUploadForm = () => (
		<Formik
			initialValues={{
				file: null,
			}}
			validate={(values: AvatarPayload) => {
				const errors: { file?: string } = {};
				const validation = validateAvatarFile(values.file);
				if (!validation.valid) {
					errors.file = validation.error;
				}
				return errors;
			}}
			onSubmit={async (values: AvatarPayload, formikBag) => {
				try {
					if (!values.file) {
						return;
					}
					await saveAvatar(values.file);
				} finally {
					formikBag.setSubmitting(false);
				}
			}}
		>
			{(formikBag) => (
				<Form>
					<label css={labelCss}>
						{avatarDisplay()}
						<input
							aria-describedby={
								formikBag.errors.file ? 'avatar-file-error' : undefined
							}
							aria-invalid={Boolean(formikBag.errors.file)}
							disabled={formikBag.isSubmitting}
							type="file"
							name="file"
							accept="image/gif, image/jpeg, image/png"
							onChange={(e: ChangeEvent) => {
								const target =
									e.currentTarget as HTMLInputElement;
								if (target.files) {
									formikBag.setFieldValue(
										'file',
										target.files[0],
									);
								}
							}}
						/>
					</label>
					{formikBag.errors.file && (
						<div
							css={[errorMessageCss, css`margin-bottom: ${space[6]}px`]}
							id="avatar-file-error"
							role="alert"
						>
							{formikBag.errors.file}
						</div>
					)}
					<Button
						disabled={formikBag.isSubmitting}
						onClick={() => formikBag.submitForm()}
					>
						Upload image
					</Button>
				</Form>
			)}
		</Formik>
	);

	const avatarUploadSuccessNotice = () => (
		<div
			css={css`
				${textSans14};
				line-height: 18px;
				border-bottom: 1px solid ${palette.success[400]};
				border-top: 1px solid ${palette.success[400]};
				color: ${palette.success[400]};
				margin-top: 6px;
				padding: 7px 8px;
			`}
		>
			Thank you for uploading your avatar. It will be checked by Guardian
			moderators shortly.
		</div>
	);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- the argument object might lack a message attribute
	const getErrorMessage = (error: any) => {
		const message =
			error?.message ||
			'An error occurred trying to upload your avatar. Please try again.';
		return <div css={errorMessageCss}>{message}</div>;
	};

	return (
		<PageSection
			title="Profile image"
			description="This image will appear next to your comments. Only .jpg, .png or .gif files of up to 1MB are accepted"
		>
			{isErrored(avatarSaveState)
				? getErrorMessage(avatarSaveState.error)
				: null}
			{isSuccessful(avatarSaveState)
				? avatarUploadSuccessNotice()
				: avatarUploadForm()}
		</PageSection>
	);
};
