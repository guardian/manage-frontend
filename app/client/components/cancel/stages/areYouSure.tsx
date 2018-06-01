import { Link, Router } from "@reach/router";
import * as React from "react";

const ThisStage = () => (
  <div path="/">
    <h1>are you sure?</h1>
    <Link to="confirmed">Confirm?</Link>
  </div>
);

export const AreYouSure = (props: any) => (
  <React.Fragment>
    <Router>
      <ThisStage path="/" />
    </Router>
    {props.children}
  </React.Fragment>
);
