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
import { Wizard } from "./wizard";

const User = () => (
  <Main>
    {injectGlobal`${global}`}
    {injectGlobal`${fonts}`}
    <Wizard />
  </Main>
);

export const ServerUser = (url: string) => (
  <ServerLocation url={url}>
    ...{/* wait for https://github.com/reach/router/issues/27 fix and then reenable */}
  </ServerLocation>
);

export const BrowserUser = <User />;
