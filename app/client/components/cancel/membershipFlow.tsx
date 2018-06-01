import { Link, Router } from "@reach/router";
import * as React from "react";

const ThisStage = () => (
  <>
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
  </>
);

export const MembershipFlow = (props: any) => (
  <div>
    <Router>
      <ThisStage path="/" />
    </Router>
    {props.children}
  </div>
);
