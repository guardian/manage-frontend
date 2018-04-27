import ReactDOM from "react-dom";

import User from "./components/user";

const element = document.getElementById("app");
console.log(element,"hi")
ReactDOM.hydrate(User, element);
