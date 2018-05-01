import { css, injectGlobal } from "emotion";
import React from "react";
import global from "../styles/global";
import { Main } from "./main";
import Membership from "./membership";

const User = (
  <Main>
    {injectGlobal`${global}`}
    <div css={{ color: "hotpink" }}>Hello world!</div>
    <Membership />
  </Main>
);

export default User;
