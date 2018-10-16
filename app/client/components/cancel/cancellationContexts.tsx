import React from "react";
import { OptionalCancellationReasonId } from "./cancellationReason";

export const CancellationReasonContext: React.Context<
  OptionalCancellationReasonId
> = React.createContext(undefined as OptionalCancellationReasonId);

export const CancellationCaseIdContext: React.Context<
  string
> = React.createContext("");
