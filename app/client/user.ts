import ReactDOM from "react-dom";
import { BrowserUser } from "./components/user";

const element = document.getElementById("app");
ReactDOM.hydrate(BrowserUser, element);
