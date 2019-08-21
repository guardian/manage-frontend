import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import React from "react";
import * as Yup from "yup";
import { Button } from "../../buttons";
import { PageContainer } from "../../page";
import { User } from "../models";
import { PageSection } from "../PageSection";
import { labelCss, textSmall } from "../sharedStyles";

interface ProfileFormSectionProps {
  user: User;
  saveUser: (values: User) => Promise<void>;
}

const hasUsername = (user: User) => !!user.username;

const formValidationSchema = Yup.object().shape({
  location: Yup.string().max(255, "Maximum length is 255"),
  aboutMe: Yup.string(),
  interests: Yup.string()
});

const usernameInput = () => (
  <>
    <label css={labelCss}>
      Username
      <Field type="text" name="username" />
    </label>
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
          render={(formikBag: FormikProps<User>) => (
            <Form>
              {!hasUsername(user) ? usernameInput() : null}
              <label css={labelCss}>
                Location
                <Field type="text" name="location" />
                <ErrorMessage name="location" />
              </label>
              <label css={labelCss}>
                About Me
                <Field component="textarea" name="aboutMe" />
              </label>
              <label css={labelCss}>
                Interests
                <Field component="textarea" name="interests" />
              </label>
              <Button
                text="Save changes"
                type="button"
                onClick={() => formikBag.submitForm()}
              />
            </Form>
          )}
        />
      </PageSection>
    </PageContainer>
  );
};
