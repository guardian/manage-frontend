import * as React from "react";
import { Link } from "@reach/router";

export const AreYouSure = (props: any) => (
  <React.Fragment>
    <div path="/">
      <h1>are you sure?</h1>
      <Link to="confirmed">Confirm?</Link>
    </div>
    {props.children}
  </React.Fragment>
);
