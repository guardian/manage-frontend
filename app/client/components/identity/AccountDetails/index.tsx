import {
  Field,
  Form,
  FormikErrors,
  FormikProps,
  FormikTouched,
  withFormik
} from "formik";
import Raven from "raven-js";
import React, { useEffect, useState } from "react";
import { headline } from "../../../styles/fonts";
import { trackEvent } from "../../analytics";
import { Button } from "../../buttons";
import { navLinks } from "../../nav";
import { PageContainer, PageHeaderContainer } from "../../page";
import { Spinner } from "../../spinner";
import {
  GenericErrorMessage,
  GenericErrorMessageRef
} from "../GenericErrorMessage";
import { Users } from "../identity";
import { Lines } from "../Lines";
import { User } from "../models";
import { ErrorTypes } from "../models";
import { PageSection } from "../PageSection";
import { formFieldErrorCss, labelCss, textSmall } from "../sharedStyles";

interface AccountFormProps {
  user: User;
  saveUser: (values: User) => Promise<void>;
  onError: (error: any) => void;
  onSuccess: (user: User) => void;
}

const lineSection = () => (
  <PageContainer>
    <Lines n={1} />
  </PageContainer>
);

const errorRef = React.createRef<GenericErrorMessageRef>();

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
    {formField("firstName", "First name", "text", props)}
    {formField("secondName", "Last name", "text", props)}
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
  }
})(BaseForm);

const loader = (
  <PageContainer>
    <Spinner loadingMessage="Loading your profile ..." />
  </PageContainer>
);

export const AccountDetails = (props: { path?: string }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    Users.getCurrentUser()
      .then((u: User) => {
        setUser(u);
      })
      .then(() => setLoading(false));
  }, []);

  const saveUser = async (values: User) => {
    const changedUser = { ...user, ...values };
    return await Users.saveChanges(user, changedUser);
  };

  const content = () => (
    <>
      <PageContainer>
        <span css={textSmall}>
          {" "}
          These details will only be visible to you and the Guardian.
        </span>
      </PageContainer>
      {lineSection()}
      <PageContainer>
        <PageSection title="Personal Information">
          <FormikForm
            user={user}
            saveUser={saveUser}
            onError={setError}
            onSuccess={setUser}
          />
        </PageSection>
      </PageContainer>
    </>
  );

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
        {error ? <GenericErrorMessage ref={errorRef} /> : null}
      </PageContainer>
      {loading ? loader : content()}
    </>
  );
};
