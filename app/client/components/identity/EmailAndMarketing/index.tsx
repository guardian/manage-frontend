import React, { useEffect, useState } from "react";
import palette from "../../../colours";
import { headline } from "../../../styles/fonts";
import { MembershipLinks } from "../../membershipLinks";
import { navLinks } from "../../nav";
import { PageContainer, PageHeaderContainer } from "../../page";
import { Spinner } from "../../spinner";
import { ConsentOptions, Users } from "../identity";
import { IdentityLocations } from "../IdentityLocations";
import { Lines } from "../Lines";
import { MarginWrapper } from "../MarginWrapper";
import { Actions, useConsentOptions } from "../useConsentOptions";
import { ConsentSection } from "./ConsentSection";
import { EmailSettingsSection } from "./EmailSettingsSection";
import { NewsletterSection } from "./NewsletterSection";
import { OptOutSection } from "./OptOutSection";

export const EmailAndMarketing = (props: { path?: string }) => {
  const { options, error, subscribe, unsubscribe, unsubscribeAll } = Actions;
  const [email, setEmail] = useState();
  const [removed, setRemoved] = useState(false);
  const [state, dispatch] = useConsentOptions();

  const toggleSubscription = async (id: string) => {
    const option = ConsentOptions.findById(state.options, id);
    try {
      if (option === undefined) {
        throw Error("Id not found");
      }
      if (option.subscribed) {
        await ConsentOptions.unsubscribe(option);
        dispatch(unsubscribe(id));
      } else {
        await ConsentOptions.subscribe(option);
        dispatch(subscribe(id));
      }
    } catch (e) {
      dispatch(error(e));
    }
  };

  const setRemoveAllEmailConsents = async () => {
    try {
      await ConsentOptions.unsubscribeAll();
      setRemoved(true);
      dispatch(unsubscribeAll());
    } catch (e) {
      dispatch(error(e));
    }
  };

  useEffect(() => {
    const makeInitialAPICalls = async () => {
      try {
        const user = await Users.getCurrentUser();
        if (!user.validated) {
          window.location.assign(IdentityLocations.VERIFY_EMAIL);
          return;
        }
        const consentOptions = await ConsentOptions.getAll();
        setEmail(user.email);
        dispatch(options(consentOptions));
      } catch (e) {
        dispatch(error(e));
      }
    };
    makeInitialAPICalls();
  }, []);

  const newsletters = ConsentOptions.newsletters(state.options);
  const consents = ConsentOptions.consents(state.options);
  const loading = newsletters.length === 0 && consents.length === 0;

  const errorRef = React.createRef<HTMLDivElement>();

  useEffect(
    () => {
      if (state.error && errorRef.current) {
        window.scrollTo(0, errorRef.current.offsetTop - 20);
      }
    },
    [state.error]
  );

  const errorMessage = (
    <PageContainer>
      <div
        ref={errorRef}
        css={{
          fontSize: "13px",
          lineHeight: "18px",
          backgroundColor: "#ffe1e1",
          borderBottom: `1px solid ${palette.red.light}`,
          borderTop: `1px solid ${palette.red.light}`,
          color: palette.red.medium,
          marginTop: "6px",
          padding: "7px 8px"
        }}
      >
        <p css={{ marginBottom: "10px" }}>Sorry, something went wrong!</p>
        <p css={{ marginBottom: "0" }}>
          <a
            css={{
              color: palette.blue.dark,
              cursor: "pointer"
            }}
            onClick={() => window.location.reload()}
          >
            Refresh this page
          </a>
        </p>
      </div>
    </PageContainer>
  );

  const content = (
    <>
      <PageContainer>
        <NewsletterSection
          newsletters={newsletters}
          clickHandler={toggleSubscription}
        />
      </PageContainer>
      <PageContainer>
        <MarginWrapper>
          <Lines n={4} />
        </MarginWrapper>
      </PageContainer>
      <PageContainer>
        <ConsentSection consents={consents} clickHandler={toggleSubscription} />
      </PageContainer>
      <PageContainer>
        <MarginWrapper>
          <Lines n={1} />
        </MarginWrapper>
      </PageContainer>
      <PageContainer>
        <EmailSettingsSection
          email={email}
          actionHandler={setRemoveAllEmailConsents}
          removed={removed}
        />
      </PageContainer>
      <PageContainer>
        <MarginWrapper>
          <Lines n={4} />
        </MarginWrapper>
      </PageContainer>
      <PageContainer>
        <OptOutSection consents={consents} clickHandler={toggleSubscription} />
      </PageContainer>
      <PageContainer>
        <MarginWrapper>
          <MembershipLinks />
        </MarginWrapper>
      </PageContainer>
    </>
  );

  const loader = (
    <PageContainer>
      <Spinner loadingMessage="Loading your email preferences..." />
    </PageContainer>
  );

  return (
    <>
      <PageHeaderContainer selectedNavItem={navLinks.emailPrefs}>
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
      {state.error ? errorMessage : null}
      {loading ? (!state.error ? loader : null) : content}
    </>
  );
};
