import { css } from '@emotion/react';
import { from, palette } from '@guardian/source-foundations';
import type { FormikProps, FormikState } from 'formik';
import { Form, withFormik } from 'formik';
import type { FC } from 'react';
import { Button } from '../../shared/Buttons';
import {
	FormEmailField,
	FormNumberField,
	FormSelectField,
	FormTextField,
} from '../form/FormField';
import * as PhoneNumber from '../idapi/phonenumber';
import { Users } from '../identity';
import { IdentityLocations } from '../IdentityLocations';
import { Lines } from '../Lines';
import type { User } from '../models';
import {
	COUNTRIES,
	ErrorTypes,
	PHONE_CALLING_CODES,
	RegistrationLocations,
	Titles,
} from '../models';
import { PageSection } from '../PageSection';
import { aCss, textSmall } from '../sharedStyles';

interface SettingsFormProps {
	user: User;
	saveUser: (values: User) => Promise<User>;
	onError: (error: any) => void;
	onSuccess: (input: User, response: User) => void;
	onDone: () => void;
	emailMessage: string | null;
}

type SettingsFormSectionProps = SettingsFormProps;

const lines = () => <Lines n={1} margin="32px auto 16px" />;
const titles = Object.values(Titles);
const registrationLocations = Object.values(RegistrationLocations);
const registrationLocationLabelModifier = (location: string) => {
	switch (location) {
		case 'Europe':
			return `${location} (non UK)`;
		case 'Prefer not to say':
			return `I prefer not to say`;
		default:
			return location;
	}
};

const deletePhoneNumber = async () => {
	await PhoneNumber.remove();
	return await Users.getCurrentUser();
};

const EmailMessage = (email: string) => (
	<p
		css={[
			textSmall,
			{
				padding: '6px 14px',
				backgroundColor: palette.neutral[97],
			},
		]}
	>
		To verify your new email address <strong>{email}</strong> please check
		your inbox - the confirmation email is on its way. In the meantime you
		should keep using your old credentials to sign in.
	</p>
);

const BaseForm = (props: FormikProps<User> & SettingsFormProps) => {
	const validationNotification = (status: FormikState<User>) => {
		const errors = Object.entries(status).map((s) => (
			<li key={s[0]}>{s[1]}</li>
		));
		return (
			<div
				css={[
					{
						color: palette.error[400],
						backgroundColor: '#ffe1e1',
						padding: '20px 15px',
					},
					textSmall,
				]}
			>
				There were some problems submitting your form. Your information
				has not been saved. Please resolve the following:
				<ul>{errors}</ul>
			</div>
		);
	};
	const correpondenceDescription = (
		<span>
			If you wish to change the delivery address for your paper
			subscription vouchers, home delivery, or Guardian Weekly please see{' '}
			<a css={aCss} href={IdentityLocations.CONTACT_AND_DELIVERY_HELP}>
				Help with updating your contact or delivery details.
			</a>
		</span>
	);
	const locationDescription = (
		<span>
			We work out your location using cookies, so your experience is more
			relevant to you. You can make sure this is accurate when you are
			signed in by selecting your location. If you don’t want to share
			this information, please select{' '}
			<span
				css={{
					[from.desktop]: {
						display: 'block',
					},
				}}
			>
				“I prefer not to say”.
			</span>
		</span>
	);
	const deletePhoneNumberButton = (
		<Button
			text="Delete Phone Number"
			type="button"
			onClick={async () => {
				const response = await deletePhoneNumber();
				props.resetForm({ values: response });
			}}
		/>
	);
	return (
		<Form>
			{!props.status || validationNotification(props.status)}
			{lines()}
			<PageSection title="Email & Password">
				<FormEmailField
					name="primaryEmailAddress"
					label="Email"
					formikProps={props}
				/>
				{!props.emailMessage || EmailMessage(props.emailMessage)}
				<label>
					Password
					<ul
						css={css`
							list-style: none;
							margin: 0;
							padding: 0;
							li + li {
								margin-top: 4px;
							}
						`}
					>
						<li>
							<a
								css={aCss}
								href={IdentityLocations.RESET_PASSWORD}
							>
								Change password
							</a>
						</li>
					</ul>
				</label>
			</PageSection>
			{lines()}
			<PageSection title="Phone">
				<FormSelectField
					name="countryCode"
					label="Country code"
					options={PHONE_CALLING_CODES}
					formikProps={props}
					labelModifier={(o: string) => `+${o}`}
				/>
				<FormNumberField
					name="localNumber"
					label="Local Number"
					formikProps={props}
				/>
				{deletePhoneNumberButton}
			</PageSection>
			{lines()}
			<PageSection title="Personal Information">
				<FormSelectField
					name="title"
					label="Title"
					options={titles}
					formikProps={props}
				/>
				<FormTextField
					name="firstName"
					label="First Name"
					formikProps={props}
				/>
				<FormTextField
					name="secondName"
					label="Last Name"
					formikProps={props}
				/>
			</PageSection>
			{lines()}
			<PageSection
				title="Correspondence address"
				description={correpondenceDescription}
			>
				<FormTextField
					name="address1"
					label="Address line 1"
					formikProps={props}
				/>
				<FormTextField
					name="address2"
					label="Address line 2"
					formikProps={props}
				/>
				<FormTextField
					name="address3"
					label="Town"
					formikProps={props}
				/>
				<FormTextField
					name="address4"
					label="County or State"
					formikProps={props}
				/>
				<FormTextField
					name="postcode"
					label="Postcode/Zipcode"
					formikProps={props}
				/>
				<FormSelectField
					name="country"
					label="Country"
					options={COUNTRIES.flatMap((country) => country.name)}
					formikProps={props}
				/>
			</PageSection>
			{lines()}
			<PageSection title="Location" description={locationDescription}>
				<FormSelectField
					name="registrationLocation" // must match api field name
					label="Location"
					labelModifier={registrationLocationLabelModifier}
					options={registrationLocations}
					firstOptionLabel="Unknown"
					firstOptionDisabled={true}
					formikProps={props}
				/>
			</PageSection>
			{lines()}
			<PageSection title="Delete account">
				<a css={aCss} href={IdentityLocations.DELETE_ACCOUNT}>
					Delete your account
				</a>
			</PageSection>
			{lines()}
			<PageSection>
				<Button
					disabled={props.isSubmitting}
					text="Save changes"
					type="button"
					onClick={() => props.submitForm()}
				/>
			</PageSection>
		</Form>
	);
};

const FormikForm = withFormik({
	mapPropsToValues: (props: SettingsFormProps) => props.user,
	handleSubmit: async (values, formikBag) => {
		const { resetForm, setSubmitting, setStatus } = formikBag;
		const { saveUser, onSuccess, onError, onDone } = formikBag.props;
		setStatus(undefined);
		try {
			const response = await saveUser(values);
			resetForm({ values: response });
			onSuccess(values, response);
		} catch (e) {
			if (e.type && e.type === ErrorTypes.VALIDATION) {
				setStatus(e.error);
			} else {
				onError(e);
			}
		}
		onDone();
		setSubmitting(false);
	},
})(BaseForm);

export const SettingsFormSection: FC<SettingsFormSectionProps> = (props) => {
	return <FormikForm {...props} />;
};
