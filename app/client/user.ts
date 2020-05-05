import "@babel/polyfill";
import "ophan-tracker-js/build/ophan.manage-my-account";
import Raven from "raven-js";
import ReactDOM from "react-dom";
import { BrowserUser } from "./components/user";

declare var WEBPACK_BUILD: string;

if (typeof window !== "undefined" && window.guardian && window.guardian.dsn) {
  Raven.config(window.guardian.dsn, {
    release: WEBPACK_BUILD || "local",
    environment: window.guardian.domain
  }).install();
}

const element = document.getElementById("app");
ReactDOM.hydrate(BrowserUser, element);
