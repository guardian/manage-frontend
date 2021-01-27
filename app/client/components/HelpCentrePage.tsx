import { css, Global } from "@emotion/core";
import { Redirect, Router } from "@reach/router";
import React, { lazy, Suspense } from "react";
import { fonts } from "../styles/fonts";
import global from "../styles/global";
import { AnalyticsTracker } from "./analytics";
import { CMPBanner } from "./consent/CMPBanner";
import { Main } from "./main";
import PageSkeleton from "./pageSkeleton";
import { ScrollToTop } from "./scrollToTop";

const HelpCentre = lazy(() =>
  import(/* webpackChunkName: "HelpCentre" */ "./helpCentre/helpCentre")
);
const ContactUs = lazy(() =>
  import(/* webpackChunkName: "ContactUs" */ "./contactUs/contactUs")
);

const HelpCentreRouter = () => {
  return (
    <Main>
      <Global styles={css(`${global}`)} />
      <Global styles={css(`${fonts}`)} />
      <Suspense fallback={<PageSkeleton />}>
        <Router primary={true} css={{ height: "100%" }}>
          <HelpCentre path="/help-centre" />

          <ContactUs path="/contact-us" />
          <ContactUs path="/contact-us/:urlTopicId" />
          <ContactUs path="/contact-us/:urlTopicId/:urlSubTopicId" />
          <ContactUs path="/contact-us/:urlTopicId/:urlSubTopicId/:urlSubSubTopicId" />
          <ContactUs path="/contact-us/:urlTopicId/:urlSubTopicId/:urlSubSubTopicId/:urlSuccess" />

          {/* otherwise redirect to root instead of having a "not found page" */}
          <Redirect default from="/*" to="/" noThrow />
        </Router>
      </Suspense>
    </Main>
  );
};

export const HelpCentrePage = (
  <>
    <AnalyticsTracker />
    <HelpCentreRouter />
    <CMPBanner />
    <ScrollToTop />
  </>
);
