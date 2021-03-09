import { css, Global } from "@emotion/core";
import { Redirect, Router } from "@reach/router";
import React, { lazy, Suspense } from "react";
import { fonts } from "../styles/fonts";
import global from "../styles/global";
import { AnalyticsTracker } from "./analytics";
import { CMPBanner } from "./consent/CMPBanner";
import HelpCentrePageSkeleton from "./HelpCentrePageSkeleton";
import { Main } from "./main";
import { ScrollToTop } from "./scrollToTop";

// The code below uses magic comments to instruct Webpack on
// how to name the chunks these dynamic imports produce
// More information: https://webpack.js.org/api/module-methods/#magic-comments

const HelpCentre = lazy(() =>
  import(/* webpackChunkName: "HelpCentre" */ "./helpCentre/helpCentre")
);

// placeholder import for the help centre see all topics page
// const HelpCentreSeeAllTopics = lazy(() =>
//   import(
//     /* webpackChunkName: "HelpCentre" */ "./helpCentre/helpCentreSeeAllTopics"
//   )
// );

const ContactUs = lazy(() =>
  import(/* webpackChunkName: "ContactUs" */ "./contactUs/contactUs")
);

const HelpCentreRouter = () => {
  return (
    <Main>
      <Global styles={css(`${global}`)} />
      <Global styles={css(`${fonts}`)} />
      <Suspense fallback={<HelpCentrePageSkeleton />}>
        <Router primary={true} css={{ height: "100%" }}>
          <HelpCentre path="/help-centre" />

          {/* <HelpCentreSeeAllTopics path="/help-centre/topic/:topicCode" /> */}

          <ContactUs path="/help-centre/contact-us" />
          <ContactUs path="/help-centre/contact-us/:urlTopicId" />
          <ContactUs path="/help-centre/contact-us/:urlTopicId/:urlSubTopicId" />
          <ContactUs path="/help-centre/contact-us/:urlTopicId/:urlSubTopicId/:urlSubSubTopicId" />
          <ContactUs path="/help-centre/contact-us/:urlTopicId/:urlSubTopicId/:urlSubSubTopicId/:urlSuccess" />

          {/* otherwise redirect to root instead of having a "not found page" */}
          <Redirect default from="/*" to="/help-centre" noThrow />
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
