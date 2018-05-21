import ReactDOM from "react-dom";

import User from "./components/user";

const element = document.getElementById("app");
ReactDOM.hydrate(User, element);
