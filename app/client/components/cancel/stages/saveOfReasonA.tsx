import * as React from "react";
import { Link } from "@reach/router";

export const SaveOfReasonA = (props: any) => (
  <React.Fragment>
    <div>
      <h1>SaveOfReasonA</h1>
      <Link to="areYouSure">Cancel Anyway</Link>
    </div>
    {props.children}
  </React.Fragment>
);
