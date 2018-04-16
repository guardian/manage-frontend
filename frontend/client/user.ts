import ReactDOM from "react-dom";

import User from "./components/user";

const element = document.getElementById("container");

ReactDOM.hydrate(User, element);
