import { css, injectGlobal } from 'emotion';
import React from "react";
import global from '../styles/global';
import { Main } from "./main";

const User = (
  <Main>
    {injectGlobal`${global}`}
    <div css={{ color: "hotpink" }}>Hello world!</div>
  </Main>
);

export default User;

