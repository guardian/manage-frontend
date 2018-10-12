import React from "react";
import { CancellationReasonId } from "./cancellationReason";

export const CancellationReasonContext: React.Context<
  CancellationReasonId
> = React.createContext("" as CancellationReasonId);

export const CancellationCaseIdContext: React.Context<
  string
> = React.createContext("");
