import { css } from '@emotion/react';
import { palette, textSans14 } from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import * as Sentry from '@sentry/browser';
import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import type { ChangeEvent, FC } from 'react';
import { trackEvent } from '../../../../utilities/analytics';
import { Spinner } from '../../../shared/Spinner';
import * as AvatarAPI from '../idapi/avatar';
import { IdentityLocations } from '../IdentityLocations';
import { ErrorTypes } from '../models';
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
const isEmptyAvatarError = (e: any): boolean => {
	return e.type && e.type === ErrorTypes.NOT_FOUND;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- we're only assuming the argument object is an error object?
const errorHandler = (e: any) => {
	if (isEmptyAvatarError(e)) {
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

	useEffect(() => {
		getAvatar();
	}, []);

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
			onSubmit={async (values: AvatarPayload, formikBag) => {
				await saveAvatar(values.file);
				formikBag.setSubmitting(false);
			}}
		>
			{(formikBag) => (
				<Form>
					<label css={labelCss}>
						{avatarDisplay()}
						<input
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
		let message;
		if (error.type && error.type === ErrorTypes.VALIDATION) {
			message = error.error;
		} else {
			message =
				'An error occured trying to upload your avatar. Please try again.';
		}
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
