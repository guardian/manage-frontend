import { Field, FormikErrors, FormikProps, FormikTouched } from "formik";
import React, { cloneElement, ReactElement } from "react";
import { formFieldErrorCss, labelCss } from "../sharedStyles";

interface FormFieldProps<T> {
  name: string;
  label: string;
  formikProps: FormikProps<T>;
  children: ReactElement<FormInputProps<T>>;
}

// Use Omit<T, K> when TS @ >= 3.5
type FormInputProps<T> = Pick<
  FormFieldProps<T>,
  Exclude<keyof FormFieldProps<T>, "children">
>;

type FormTextAreaProps<T> = FormInputProps<T>;
type FormSelectProps<T> = FormInputProps<T> & {
  options: string[];
  labelModifier?: (option: string) => string;
};

const getError = <T extends unknown>(
  name: string,
  { errors, touched, status }: FormikProps<T>
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

export const FormField = <T extends unknown>(props: FormFieldProps<T>) => {
  const { name, label, formikProps, children } = props;
  const error = getError(name, formikProps);
  const errorCss = error ? formFieldErrorCss : {};
  const field = cloneElement(children, { name });
  return (
    <label css={{ ...labelCss, ...errorCss }}>
      {label}
      {field}
      {error ? <p>{error}</p> : null}
    </label>
  );
};

export const FormTextAreaField = <T extends unknown>(
  props: FormTextAreaProps<T>
) => (
  <FormField
    name={props.name}
    label={props.label}
    formikProps={props.formikProps}
  >
    <Field component="textarea" />
  </FormField>
);

export const FormSelectField = <T extends unknown>(
  props: FormSelectProps<T>
) => {
  const { options, labelModifier } = props;
  const optionEls = options.map(o => {
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
      <Field component="select" name={name}>
        <option value="" />
        {optionEls}
      </Field>
    </FormField>
  );
};

const getInputFieldOfType = (type: string) => {
  return <T extends unknown>(props: FormInputProps<T>) => (
    <FormField
      name={props.name}
      label={props.label}
      formikProps={props.formikProps}
    >
      <Field type={type} />
    </FormField>
  );
};

export const FormTextField = getInputFieldOfType("text");
export const FormNumberField = getInputFieldOfType("number");
export const FormEmailField = getInputFieldOfType("email");
