import Raven from "raven-js";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "../client/components/consent/App";

declare var WEBPACK_BUILD: string;

// TODO: Add CMP feature tag to Raven/Sentry error logs
if (typeof window !== "undefined" && window.guardian && window.guardian.dsn) {
  Raven.config(window.guardian.dsn, {
    release: WEBPACK_BUILD || "local",
    environment: window.guardian.domain
  }).install();
}

const element = document.getElementById("app");

ReactDOM.hydrate(<App />, element);
