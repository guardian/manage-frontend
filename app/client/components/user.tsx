import { Link, Router, ServerLocation } from "@reach/router";
import React from "react";
import { injectGlobal } from "../styles/emotion";
import fonts from "../styles/fonts";
import global from "../styles/global";
import { ContributionsFlow } from "./cancel/contributionsFlow";
import { MembershipFlow, Saver } from "./cancel/membershipFlow";
import { NotFound } from "./cancel/notFound";
import { AreYouSure } from "./cancel/stages/areYouSure";
import { Confirmed } from "./cancel/stages/confirmed";
import { SaveOfReasonA } from "./cancel/stages/saveOfReasonA";
import { SaveOfReasonB } from "./cancel/stages/saveOfReasonB";
import { SaveOfReasonC } from "./cancel/stages/saveOfReasonC";
import { Main } from "./main";
import { Membership } from "./membership";

const User = () => (
  <Main>
    {injectGlobal`${global}`}
    {injectGlobal`${fonts}`}

    <Router>
      <Membership path="/" />

      <MembershipFlow path="/cancel/membership/">
        <SaveOfReasonA path="saveReasonA">
          <AreYouSure path="areYouSure">
            <Confirmed path="confirmed" />
          </AreYouSure>
        </SaveOfReasonA>
        <SaveOfReasonB path="saveReasonB" />
        <SaveOfReasonC path="saveReasonC" />
      </MembershipFlow>

      <ContributionsFlow path="/cancel/contributions" />

      <NotFound default={true} />
    </Router>
  </Main>
);

export const ServerUser = (url: string) => (
  <ServerLocation url={url}>
    <h1>Fix SSR</h1>
  </ServerLocation>
);

export const BrowserUser = <User />;
