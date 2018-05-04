import {injectGlobal} from "emotion";
import React from "react";
import global from "../styles/global";
import {Main} from "./main";
import Membership from "./membership";

const User = (
  <Main>
    {injectGlobal`${global}`}
    <Membership />
  </Main>
);

export default User;
