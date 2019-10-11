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
import { Titles, User } from "../models";
import { COUNTRIES, ErrorTypes } from "../models";
import { PageSection } from "../PageSection";
import { formFieldErrorCss, labelCss, textSmall } from "../sharedStyles";

interface AccountFormProps {
  user: User;
  saveUser: (values: User) => Promise<void>;
  onError: (error: any) => void;
  onSuccess: (user: User) => void;
}

const titles = Object.values(Titles);

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

const formSelectField = (
  name: string,
  label: string,
  options: string[],
  formikProps: FormikProps<User>
) => {
  const error = getError(name, formikProps);
  const errorCss = error ? formFieldErrorCss : {};
  const optionEls = options.map(o => (
    <option key={o} value={o}>
      {o}
    </option>
  ));
  return (
    <label css={{ ...labelCss, ...errorCss }}>
      {label}
      <Field component="select" name={name}>
        {optionEls}
      </Field>
      {error ? <p>{error}</p> : null}
    </label>
  );
};

const formField = (
  name: string,
  label: string,
  inputType: string,
  formikProps: FormikProps<User>
) => {
  const error = getError(name, formikProps);
  const inputTypeProps =
    inputType === "textarea" ? { component: "textarea" } : { type: inputType };
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
    <Lines n={1} />
    <PageSection title="Email & Password">
      {formField("email", "Email", "email", props)}
      <label>
        Password
        <p>
          <a>Change your password</a>
        </p>
      </label>
    </PageSection>
    <Lines n={1} />
    <PageSection title="Phone">
      {formField("phoneCountryCode", "Country code", "number", props)}
      {formField("phoneLocalNumber", "Local number", "number", props)}
    </PageSection>
    <PageSection title="Personal Information">
      {formSelectField("title", "Title", titles, props)}
      {formField("firstName", "First name", "text", props)}
      {formField("secondName", "Last name", "text", props)}
    </PageSection>
    <Lines n={1} />
    <PageSection title="Correspondence address">
      {formField("address1", "Address line 1", "text", props)}
      {formField("address2", "Address line 2", "text", props)}
      {formField("address3", "Town", "text", props)}
      {formField("address4", "County or State", "text", props)}
      {formField("postcode", "Postcode/Zipcode", "text", props)}
      {formSelectField("country", "Country", ["None", ...COUNTRIES], props)}
    </PageSection>
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
      <PageContainer>
        <FormikForm
          user={user}
          saveUser={saveUser}
          onError={setError}
          onSuccess={setUser}
        />
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
