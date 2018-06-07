import { Link, Router, ServerLocation } from "@reach/router";
import React from "react";
import { injectGlobal } from "../styles/emotion";
import { fonts } from "../styles/fonts";
import global from "../styles/global";
import { ContributionsReasons } from "./cancel/contributionsReasons";
import { MembershipReasons } from "./cancel/membershipReasons";
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

      <MembershipReasons path="/cancel/membership/">
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
      </MembershipReasons>

      <ContributionsReasons path="/cancel/contributions" />

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
