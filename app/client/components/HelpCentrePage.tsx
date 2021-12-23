import { css, Global } from "@emotion/react";
import { Redirect, Router } from "@reach/router";
import { lazy, Suspense } from "react";
import { fonts } from "../styles/fonts";
import global from "../styles/global";
import { AnalyticsTracker } from "./analytics";
import { CMPBanner } from "./consent/CMPBanner";
import { HelpCenterContentWrapper } from "./HelpCenterContentWrapper";
import { PageTitle } from "./helpCentre/pageTitle";
import { SeoData } from "./helpCentre/seoData";
import HelpCentreLoadingContent from "./HelpCentreLoadingContent";
import { LiveChat } from "./liveChat/liveChat";
import { Main } from "./main";
import { ScrollToTop } from "./scrollToTop";

// The code below uses magic comments to instruct Webpack on
// how to name the chunks these dynamic imports produce
// More information: https://webpack.js.org/api/module-methods/#magic-comments

const HelpCentre = lazy(
  () => import(/* webpackChunkName: "HelpCentre" */ "./helpCentre/helpCentre")
);

const HelpCentreArticle = lazy(
  () =>
    import(
      /* webpackChunkName: "HelpCentreArticle" */ "./helpCentre/helpCentreArticle"
    )
);

const HelpCentreTopic = lazy(
  () =>
    import(
      /* webpackChunkName: "HelpCentreTopic" */ "./helpCentre/helpCentreTopic"
    )
);

const ContactUs = lazy(
  () => import(/* webpackChunkName: "ContactUs" */ "./contactUs/contactUs")
);

const HelpCentreRouter = () => {
  return (
    <Main>
      <Global styles={css(`${global}`)} />
      <Global styles={css(`${fonts}`)} />
      <HelpCenterContentWrapper>
        <Suspense fallback={<HelpCentreLoadingContent />}>
          <Router primary={true} css={{ height: "100%" }}>
            <HelpCentre path="/help-centre" />

            <HelpCentreArticle path="/help-centre/article/:articleCode" />
            <HelpCentreTopic path="/help-centre/topic/:topicCode" />

            <ContactUs path="/help-centre/contact-us" />
            <ContactUs path="/help-centre/contact-us/:urlTopicId" />
            <ContactUs path="/help-centre/contact-us/:urlTopicId/:urlSubTopicId" />
            <ContactUs path="/help-centre/contact-us/:urlTopicId/:urlSubTopicId/:urlSubSubTopicId" />
            <ContactUs path="/help-centre/contact-us/:urlTopicId/:urlSubTopicId/:urlSubSubTopicId/:urlSuccess" />

            {/* otherwise redirect to root instead of having a "not found page" */}
            <Redirect default from="/*" to="/help-centre" noThrow />
          </Router>
        </Suspense>
      </HelpCenterContentWrapper>
      <LiveChat />
    </Main>
  );
};

export const HelpCentrePage = (
  <>
    <PageTitle />
    <SeoData />
    <AnalyticsTracker />
    <HelpCentreRouter />
    <CMPBanner />
    <ScrollToTop />
  </>
);
