import React, { useEffect, useState } from "react";
import { headline } from "../../../styles/fonts";
import { Lines } from "../Lines";
import { navLinks } from "../../nav";
import { PageSection } from "../PageSection";
import { PageContainer, PageHeaderContainer } from "../../page";
import { withFormik, Field, Form, FormikTouched, FormikErrors, FormikProps } from "formik";
import { User } from "../models";
import { formFieldErrorCss, labelCss, textSmall } from "../sharedStyles";
import { Button } from "../../buttons";
import { Users } from "../identity";

interface AccountFormProps {
  user: User;
}

const lineSection = () => (
  <PageContainer>
    <Lines n={1} />
  </PageContainer>
);


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

const BaseForm = (props: FormikProps<User>) => (
  <Form>
    { formField("firstname", "Firstname", "text", props) }
      <Button
        disabled={props.isSubmitting}
        text="Save changes"
        type="button"
        onClick={() => props.submitForm()}
      />
  </Form>
);

const FormikForm = withFormik({
  mapPropsToValues: (props: AccountFormProps) => props.user,
  handleSubmit: async () => {}
})(BaseForm);

const personalInformationSection = () => (
  <PageContainer>
    <PageSection title="Personal Information">
      hi
    </PageSection>
  </PageContainer>
)

export const AccountDetails = (props: { path?: string }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    Users.getCurrentUser()
      .then((u: User) => {
        setUser(u);
      })
  }, []);
  return (
    <>
      <PageHeaderContainer selectedNavItem={navLinks.accountDetails}>
        <h1
          css={{
            fontSize: "32px",
            lineHeight: "36px",
            fontFamily: headline,
            marginBottom: "30px",
            marginTop: "0"
          }}
        >
          Edit your profile
        </h1>
      </PageHeaderContainer>
      <PageContainer>
        These details will only be visible to you and the Guardian.
      </PageContainer>
      { lineSection() }
      { personalInformationSection() }
      <FormikForm user={user} />
    </>
  );
};
