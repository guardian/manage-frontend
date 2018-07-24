import Raven from "raven-js";
import ReactDOM from "react-dom";
import { trackPath } from "./analytics";
import { BrowserUser } from "./components/user";

declare var WEBPACK_BUILD: string;

if (typeof window !== "undefined" && window.guardian && window.guardian.dsn) {
  Raven.config(window.guardian.dsn, {
    release: `${WEBPACK_BUILD}`,
    environment: window.guardian.domain
  }).install();
}

const element = document.getElementById("app");
ReactDOM.hydrate(BrowserUser(trackPath), element);
