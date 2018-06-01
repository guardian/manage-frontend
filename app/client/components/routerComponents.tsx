import React from "react";
import { Router } from "@reach/router";

const RootComponent = (props: any) => <div>{props.children}</div>;

export const ThisStageOnly = (props: any) => (
  <Router>
    <RootComponent path="/">{props.children}</RootComponent>
  </Router>
);
