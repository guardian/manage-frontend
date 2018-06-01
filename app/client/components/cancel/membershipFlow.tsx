import * as React from "react";
import { Link } from "@reach/router";

export const MembershipFlow = (props: any) => (
  <React.Fragment>
    <div path="bob">
      Please tell us your reason...
      <ul>
        <li>
          <Link to="saveReasonA">Reason A</Link>
        </li>
        <li>
          <Link to="saveReasonB">Reason B</Link>
        </li>
        <li>
          <Link to="saveReasonC">Reason C</Link>
        </li>
      </ul>
    </div>
    {props.children}
  </React.Fragment>
);
