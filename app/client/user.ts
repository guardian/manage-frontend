import Raven from "raven-js";
import ReactDOM from "react-dom";
import User from "./components/user";
declare var CLIENT_DSN: string;
Raven.config(CLIENT_DSN).install();

const element = document.getElementById("app");
ReactDOM.hydrate(User, element);
