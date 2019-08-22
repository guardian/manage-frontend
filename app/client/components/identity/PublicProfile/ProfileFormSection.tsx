import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikErrors,
  FormikProps,
  FormikTouched
} from "formik";
import React from "react";
import * as Yup from "yup";
import { Button } from "../../buttons";
import { PageContainer } from "../../page";
import { User } from "../models";
import { PageSection } from "../PageSection";
import { formFieldErrorCss, labelCss, textSmall } from "../sharedStyles";

interface ProfileFormSectionProps {
  user: User;
  saveUser: (values: User) => Promise<void>;
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

const formField = (
  name: string,
  label: string,
  inputType: "textarea" | "text",
  { errors, touched }: FormikProps<User>
) => {
  const hasError =
    errors[name as keyof FormikErrors<User>] &&
    touched[name as keyof FormikTouched<User>];
  const inputTypeProps =
    inputType === "text" ? { type: "text" } : { component: "textarea" };
  const errorCss = hasError ? formFieldErrorCss : {};
  return (
    <label css={{ ...labelCss, ...errorCss }}>
      {label}
      <Field {...inputTypeProps} name={name} />
      <ErrorMessage component="p" name={name} />
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

export const ProfileFormSection = (props: ProfileFormSectionProps) => {
  const { user, saveUser } = props;
  return (
    <PageContainer>
      <PageSection title="Profile">
        <Formik
          initialValues={{
            ...user
          }}
          onSubmit={saveUser}
          validationSchema={formValidationSchema}
          render={(formikProps: FormikProps<User>) => (
            <Form>
              {!hasUsername(user) ? usernameInput(formikProps) : null}
              {formField("location", "Location", "text", formikProps)}
              {formField("aboutMe", "About Me", "textarea", formikProps)}
              {formField("interests", "Interests", "textarea", formikProps)}
              <Button
                text="Save changes"
                type="button"
                onClick={() => formikProps.submitForm()}
              />
            </Form>
          )}
        />
      </PageSection>
    </PageContainer>
  );
};
