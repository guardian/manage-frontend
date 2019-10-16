import {
  Field,
  Form,
  FormikErrors,
  FormikProps,
  FormikTouched,
  withFormik
} from "formik";
import Raven from "raven-js";
import React from "react";
import * as Yup from "yup";
import { trackEvent } from "../../analytics";
import { Button } from "../../buttons";
import { PageContainer } from "../../page";
import { ErrorTypes, User } from "../models";
import { PageSection } from "../PageSection";
import { formFieldErrorCss, labelCss, textSmall } from "../sharedStyles";

interface ProfileFormSectionProps {
  user: User;
  saveUser: (values: User) => Promise<User>;
  onError: (error: any) => void;
  onSuccess: (user: User) => void;
}

const hasUsername = (user: User) => !!user.username;

const formValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, "Must be 6 characters minimum")
    .max(20, "Must be 20 characters or less"),
  location: Yup.string().max(255, "Maximum length is 255"),
  aboutMe: Yup.string().max(1500, "Maximum length is 1500"),
  interests: Yup.string().max(255, "Maximum length is 255")
});

const getError = (
  name: string,
  { errors, touched, status }: FormikProps<User>
) => {
  const isTouched = touched[name as keyof FormikTouched<User>];
  const error = errors[name as keyof FormikErrors<User>];
  if (error && isTouched) {
    return error;
  }
  if (status && isTouched) {
    return status[name as keyof FormikErrors<User>];
  }
};

const formField = (
  name: string,
  label: string,
  inputType: "textarea" | "text",
  formikProps: FormikProps<User>
) => {
  const error = getError(name, formikProps);
  const inputTypeProps =
    inputType === "text" ? { type: "text" } : { component: "textarea" };
  const errorCss = error ? formFieldErrorCss : {};
  return (
    <label css={{ ...labelCss, ...errorCss }}>
      {label}
      <Field {...inputTypeProps} name={name} />
      {error ? <p>{error}</p> : null}
    </label>
  );
};

const usernameInput = (formikProps: FormikProps<User>) => (
  <>
    {formField("username", "Username", "text", formikProps)}
    <p css={textSmall}>
      You can only set your username once. It must be 6-20 characters, letters
      and/or numbers only and have no spaces. If you do not set your username,
      then your full name will be used.
    </p>
  </>
);

const fieldSetCss = {
  border: "0",
  margin: "0",
  padding: "0"
};

const ProfileForm = (props: FormikProps<User> & ProfileFormSectionProps) => (
  <Form>
    <fieldset css={fieldSetCss} disabled={props.isSubmitting}>
      {!hasUsername(props.user) ? usernameInput(props) : null}
      {formField("location", "Location", "text", props)}
      {formField("aboutMe", "About Me", "textarea", props)}
      {formField("interests", "Interests", "textarea", props)}
      <Button
        disabled={props.isSubmitting}
        text="Save changes"
        type="button"
        onClick={() => props.submitForm()}
      />
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
        Raven.captureException(e);
        trackEvent({
          eventCategory: "publicProfileError",
          eventAction: "error",
          eventLabel: e.toString()
        });
      }
    }
    setSubmitting(false);
  },
  validationSchema: formValidationSchema
})(ProfileForm);

export const ProfileFormSection = (props: ProfileFormSectionProps) => {
  return (
    <PageContainer>
      <PageSection title="Profile">
        <EnhancedProfileForm {...props} />
      </PageSection>
    </PageContainer>
  );
};
