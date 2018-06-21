import ReactDOM from "react-dom";
import { trackPath } from "./analytics";
import { BrowserUser } from "./components/user";

const element = document.getElementById("app");
ReactDOM.hydrate(BrowserUser(trackPath), element);
