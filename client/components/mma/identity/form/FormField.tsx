import type { FormikErrors, FormikProps, FormikTouched } from 'formik';
import { Field } from 'formik';
import type { ReactElement } from 'react';
import { cloneElement } from 'react';
import { formFieldErrorCss, labelCss } from '../sharedStyles';

interface FormFieldProps<T> {
	name: string;
	label: string;
	formikProps: FormikProps<T>;
	children: ReactElement<FormInputProps<T>>;
}

// Use Omit<T, K> when TS @ >= 3.5
type FormInputProps<T> = Pick<
	FormFieldProps<T>,
	Exclude<keyof FormFieldProps<T>, 'children'>
>;

type FormSelectProps<T> = FormInputProps<T> & {
	options: string[];
	labelModifier?: (option: string) => string;
	firstOptionDisabled?: boolean;
	firstOptionLabel?: string; // placeholder label for null/empty string
};

const getError = <T,>(
	name: string,
	{ errors, touched, status }: FormikProps<T>,
) => {
	const isTouched = touched[name as keyof FormikTouched<T>];
	const error = errors[name as keyof FormikErrors<T>];
	if (error && isTouched) {
		return error;
	}
	if (status && isTouched) {
		return status[name as keyof FormikErrors<T>];
	}
};

const FormField = <T,>(props: FormFieldProps<T>) => {
	const { name, label, formikProps, children } = props;
	const error = getError(name, formikProps);
	const field = cloneElement(children, { name });
	return (
		<label css={[labelCss, error && formFieldErrorCss]}>
			{label}
			{field}
			{error ? <p>{error}</p> : null}
		</label>
	);
};

export const FormSelectField = <T,>(props: FormSelectProps<T>) => {
	const {
		options,
		firstOptionLabel,
		firstOptionDisabled = false,
		labelModifier,
	} = props;

	const optionEls = options.map((o) => {
		const optionLabel = labelModifier ? labelModifier(o) : o;
		return (
			<option key={o} value={o}>
				{optionLabel}
			</option>
		);
	});
	return (
		<FormField
			name={props.name}
			label={props.label}
			formikProps={props.formikProps}
		>
			<Field component="select" name={name} data-qm-masking="blocklist">
				<option disabled={firstOptionDisabled} value="">
					{firstOptionLabel}
				</option>
				{optionEls}
			</Field>
		</FormField>
	);
};

const getInputFieldOfType = (type: string) => {
	return <T,>(props: FormInputProps<T>) => (
		<FormField
			name={props.name}
			label={props.label}
			formikProps={props.formikProps}
		>
			<Field type={type} data-qm-masking="blocklist" />
		</FormField>
	);
};

export const FormTextField = getInputFieldOfType('text');
export const FormNumberField = getInputFieldOfType('number');
export const FormEmailField = getInputFieldOfType('email');
export const FormTelephoneField = getInputFieldOfType('tel');
