import * as ophan from "ophan-tracker-js/build/ophan.manage-my-account";
import Raven from "raven-js";
import ReactDOM from "react-dom";
import { RecordOphanComponentEvent } from "../globals";
import { BrowserUser } from "./components/user";

declare var WEBPACK_BUILD: string;

if (typeof window !== "undefined" && window.guardian && window.guardian.dsn) {
  Raven.config(window.guardian.dsn, {
    release: WEBPACK_BUILD || "local",
    environment: window.guardian.domain
  }).install();
}

if (typeof window !== "undefined" && window.guardian) {
  // tslint:disable-next-line:no-object-mutation
  window.guardian.ophan = {
    record: ophan.record as RecordOphanComponentEvent
  };
}

const element = document.getElementById("app");
ReactDOM.hydrate(BrowserUser, element);
