import { css } from '@emotion/react';
import { Button } from '@guardian/source/react-components';
import type { FormikProps } from 'formik';
import { Form, withFormik } from 'formik';
import * as Yup from 'yup';
import { WithStandardTopMargin } from '../../../shared/WithStandardTopMargin';
import { FormTextField } from '../form/FormField';
import type { User } from '../models';
import { ErrorTypes } from '../models';
import { PageSection } from '../PageSection';
import { textSmall } from '../sharedStyles';

interface ProfileFormSectionProps {
	user: User;
	saveUser: (values: User) => Promise<User>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- we're only assuming the onError function's argument is an error object?
	onError: (error: any) => void;
	onSuccess: (user: User) => void;
}

const formValidationSchema = Yup.object().shape({
	username: Yup.string()
		.trim()
		.required('Username is required')
		.min(6, 'Must be 6 characters minimum')
		.max(20, 'Must be 20 characters or less')
		.matches(
			/^\w+$/,
			'Username can only contain letters, numbers, and underscores',
		),
});

const usernameInput = (formikProps: FormikProps<User>) => (
	<>
		<FormTextField
			name="username"
			label="Username"
			formikProps={formikProps}
		/>
		<p css={textSmall}>
			You need to set a username before you can comment. You can only set
			your username once. It must be 6-20 characters, using only letters,
			numbers, and underscores.
		</p>
	</>
);

const fieldSetCss = css`
	border: 0;
	margin: 0;
	padding: 0;
`;

const ProfileForm = (props: FormikProps<User> & ProfileFormSectionProps) => (
	<Form>
		<fieldset
			css={fieldSetCss}
			disabled={props.isSubmitting}
			data-qm-masking="blocklist"
		>
			{usernameInput(props)}
			<Button
				onClick={() => props.submitForm()}
				disabled={props.isSubmitting || !props.values.username?.trim()}
			>
				Save changes
			</Button>
		</fieldset>
	</Form>
);

const EnhancedProfileForm = withFormik({
	mapPropsToValues: (props: ProfileFormSectionProps) => props.user,
	handleSubmit: async (values, formikBag) => {
		const { setSubmitting, setStatus } = formikBag;
		const { saveUser, onSuccess, onError } = formikBag.props;
		setStatus(undefined);
		try {
			await saveUser(values);
			onSuccess(values);
		} catch (e) {
			if (e.type && e.type === ErrorTypes.VALIDATION) {
				setStatus(e.error);
			} else {
				onError(e);
			}
		}
		setSubmitting(false);
	},
	validationSchema: formValidationSchema,
})(ProfileForm);

export const ProfileFormSection = (props: ProfileFormSectionProps) => {
	return (
		<WithStandardTopMargin>
			<PageSection title="Profile">
				<EnhancedProfileForm {...props} />
			</PageSection>
		</WithStandardTopMargin>
	);
};
