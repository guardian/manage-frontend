import { Link, Router, ServerLocation } from "@reach/router";
import React from "react";
import { injectGlobal } from "../styles/emotion";
import fonts from "../styles/fonts";
import global from "../styles/global";
import AsyncLoader from "./asyncLoader";
import { ContributionsFlow } from "./cancel/contributionsFlow";
import { MembershipFlow } from "./cancel/membershipFlow";
import { NotFound } from "./cancel/notFound";
import { AreYouSure } from "./cancel/stages/areYouSure";
import { Confirmed } from "./cancel/stages/confirmed";
import { SaveOfReasonA } from "./cancel/stages/saveOfReasonA";
import { SaveOfReasonB } from "./cancel/stages/saveOfReasonB";
import { SaveOfReasonC } from "./cancel/stages/saveOfReasonC";
import { Main } from "./main";
import { Membership } from "./membership";

export interface MeResponse {
  userId: string;
  tier: string;
  membershipJoinDate: string;
  contentAccess: {
    member: boolean;
    paidMember: boolean;
    recurringContributor: boolean;
    digitalPack: boolean;
  };
}

export class MeCheckerAsyncLoader extends AsyncLoader<MeResponse> {}

export const fetchMe: () => Promise<MeResponse> = async () => {
  return (await fetch("/api/me", { credentials: "include" })).json();
};

const User = () => (
  <Main>
    {injectGlobal`${global}`}
    {injectGlobal`${fonts}`}

    <Router>
      <Membership path="/" />

      <MembershipFlow path="/cancel/membership/">
        <SaveOfReasonA path="saveReasonA" linkLabel="Reason A">
          <AreYouSure path="areYouSure">
            <Confirmed path="confirmed" />
          </AreYouSure>
        </SaveOfReasonA>
        <SaveOfReasonB path="saveReasonB" linkLabel="Reason B">
          <AreYouSure path="areYouSure">
            <Confirmed path="confirmed" />
          </AreYouSure>
        </SaveOfReasonB>
        <SaveOfReasonC path="saveReasonC" linkLabel="Reason C">
          <AreYouSure path="areYouSure">
            <Confirmed path="confirmed" />
          </AreYouSure>
        </SaveOfReasonC>
      </MembershipFlow>

      <ContributionsFlow path="/cancel/contributions" />

      <NotFound default={true} />
    </Router>
  </Main>
);

export const ServerUser = (url: string) => (
  <ServerLocation url={url}>
    ...{/* wait for https://github.com/reach/router/issues/27 fix and then reenable */}
  </ServerLocation>
);

export const BrowserUser = <User />;
