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
import { aCss, labelCss, textSmall } from "../sharedStyles";
import { AvatarSection } from "./AvatarSection";

const hasUsername = (user: User) => !!user.username;

export const PublicProfile = (props: { path?: string }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Users.getCurrentUser()
      .then((u: User) => {
        setUser(u);
      })
      .then(() => setLoading(false));
  }, []);

  const saveUser = async (values: User) => {
    setLoading(true);
    const changedUser = { ...user, ...values };
    await Users.saveChanges(user, changedUser);
    setUser(changedUser);
    setLoading(false);
  };

  const loader = (
    <PageContainer>
      <Spinner loadingMessage="Loading your profile ..." />
    </PageContainer>
  );

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

  const usernameDisplay = (u: User) => (
    <>
      <PageContainer>
        <PageSection title="Username">{u.username}</PageSection>
      </PageContainer>
      <PageContainer>
        <Lines n={1} />
      </PageContainer>
    </>
  );

  const content = () => (
    <>
      <PageContainer>
        <p css={{ fontSize: "14px" }}>
          These details will be publicly visible to everyone who sees your
          profile in the{" "}
          <a css={aCss} href={IdentityLocations.COMMUNITY_FAQS}>
            commenting
          </a>{" "}
          section.
        </p>
      </PageContainer>
      <PageContainer>
        <Lines n={1} />
      </PageContainer>
      {hasUsername(user) ? usernameDisplay(user) : null}
      <PageContainer>
        <PageSection title="Profile">
          <Formik
            initialValues={{
              ...user
            }}
            onSubmit={saveUser}
            render={(formikBag: FormikProps<User>) => (
              <Form>
                {!hasUsername(user) ? usernameInput() : null}
                <label css={labelCss}>
                  Location
                  <Field type="text" name="location" />
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
                  onClick={() => formikBag.submitForm()}
                />
              </Form>
            )}
          />
        </PageSection>
      </PageContainer>
      <PageContainer>
        <Lines n={1} />
      </PageContainer>
      <PageContainer>
        <AvatarSection userId={user.id} />
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
