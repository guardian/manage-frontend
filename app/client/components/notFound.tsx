import { RouteComponentProps } from "@reach/router";
import React from "react";
import { PageContainer } from "./page";

export const NotFound = (_: RouteComponentProps) => (
  <PageContainer>
    <h1>Not Found</h1>
  </PageContainer>
);
