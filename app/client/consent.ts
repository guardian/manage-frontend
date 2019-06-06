import Raven from "raven-js";
import ReactDOM from "react-dom";
import { ConsentManagementPortal } from "../client/components/consent/ConsentMangementPortal";

declare var WEBPACK_BUILD: string;

// TODO: Add CMP feature tag to Raven/Sentry error logs
if (typeof window !== "undefined" && window.guardian && window.guardian.dsn) {
  Raven.config(window.guardian.dsn, {
    release: WEBPACK_BUILD || "local",
    environment: window.guardian.domain
  }).install();
}

const element = document.getElementById("app");

ReactDOM.hydrate(ConsentManagementPortal, element);
