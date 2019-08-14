import { Field, Form, Formik, FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import { headline } from "../../../styles/fonts";
import { Button } from "../../buttons";
import { navLinks } from "../../nav";
import { PageContainer, PageHeaderContainer } from "../../page";
import { Spinner } from "../../spinner";
import { Users } from "../identity";
import { IdentityLocations } from "../IdentityLocations";
import { Lines } from "../Lines";
import { User } from "../models";
import { PageSection } from "../PageSection";

export const PublicProfile = (props: { path?: string }) => {
  const [user, setUser] = useState();
  const [hasUsername, setHasUsername] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Users.getCurrentUser()
      .then((u: User) => {
        setHasUsername(!!u.username);
        setUser(u);
      })
      .then(() => setLoading(false));
  }, []);

  const saveUser = async (values: User) => {
    setLoading(true);
    const changedUser = { ...user, ...values };
    await Users.saveChanges(user, changedUser);
    setUser(changedUser);
    setHasUsername(!!changedUser.username);
    setLoading(false);
  };

  const loader = (
    <PageContainer>
      <Spinner loadingMessage="Loading your profile ..." />
    </PageContainer>
  );

  const labelCss = {
    display: "block",
    width: "100%",
    "& input, & textarea": {
      display: "block"
    }
  };

  const usernameInput = () => (
    <label css={labelCss}>
      Username
      <Field type="text" name="username" />
    </label>
  );

  const usernameDisplay = (u: User) => (
    <>
      <PageContainer>
        <PageSection title="username">{u.username}</PageSection>
      </PageContainer>
      <PageContainer>
        <Lines n={1} />
      </PageContainer>
    </>
  );

  const content = () => (
    <>
      <PageContainer>
        These details will be publicly visible to everyone who sees your profile
        in the <a href={IdentityLocations.COMMUNITY_FAQS}>commenting</a>{" "}
        section.
      </PageContainer>
      <PageContainer>
        <Lines n={1} />
      </PageContainer>
      {hasUsername ? usernameDisplay(user) : null}
      <PageContainer>
        <PageSection title="Profile">
          <Formik
            initialValues={{
              ...user
            }}
            onSubmit={saveUser}
            render={(formikBag: FormikProps<User>) => (
              <Form>
                {!hasUsername ? usernameInput() : null}
                <label css={labelCss}>
                  Location
                  <Field type="text" name="location" />
                </label>
                <label css={labelCss}>
                  About Me
                  <Field type="textarea" name="aboutMe" />
                </label>
                <label css={labelCss}>
                  Interests
                  <Field type="textarea" name="interests" />
                </label>
                <Button
                  text="Save changes"
                  onClick={() => formikBag.submitForm()}
                />
              </Form>
            )}
          />
        </PageSection>
      </PageContainer>
    </>
  );

  return (
    <>
      <PageHeaderContainer selectedNavItem={navLinks.publicProfile}>
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
      {loading ? loader : content()}
    </>
  );
};
