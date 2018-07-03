import React from "react";
import { ProgressCounter } from "../progressCounter";

export const NotFound = (props: { default: boolean }) => (
  <div>
    <div css={{ paddingBottom: "40px" }}>
      <ProgressCounter current={2} total={3} />
    </div>
    <h1>Not Found</h1>
  </div>
);
