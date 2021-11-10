import "@babel/polyfill";
import * as Sentry from "@sentry/browser";
import "ophan-tracker-js/build/ophan.manage-my-account";
import ReactDOM from "react-dom";
import { HelpCentrePage } from "./components/HelpCentrePage";

declare let WEBPACK_BUILD: string;

if (typeof window !== "undefined" && window.guardian && window.guardian.dsn) {
  Sentry.init({
    dsn: window.guardian.dsn,
    release: WEBPACK_BUILD || "local",
    environment: window.guardian.domain
  });
}

const element = document.getElementById("app");
ReactDOM.render(HelpCentrePage, element);
