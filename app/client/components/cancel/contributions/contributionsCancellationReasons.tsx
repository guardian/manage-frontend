import React from "react";
import { conf } from "../../../../server/config";
import { CancellationReason } from "../cancellationReason";

// Webpack doesn't like browser globals
let domain: string;
if (typeof window !== "undefined" && window.guardian) {
  domain = window.guardian.domain;
} else {
  domain = conf.DOMAIN;
}

export const contributionsCancellationReasons: CancellationReason[] = [];
