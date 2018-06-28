import ReactDOM from "react-dom";
import { trackPath } from "./analytics";
import { BrowserUser } from "./components/user";
import { check } from "./identityCheck";

const element = document.getElementById("app");
ReactDOM.hydrate(BrowserUser(trackPath), element);

check();
