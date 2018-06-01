import { Link, Router } from "@reach/router";
import * as React from "react";

const ThisStage = () => (
  <div>
    <h1>SaveOfReasonA</h1>
    <Link to="areYouSure">Cancel Anyway</Link>
  </div>
);

export const SaveOfReasonA = (props: any) => (
  <div>
    <Router>
      <ThisStage path="/" />
    </Router>
    {props.children}
  </div>
);
