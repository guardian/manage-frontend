import React from "react";
import { WithSubscription } from "../../../../shared/productResponse";

export const NewSubscriptionContext: React.Context<
  WithSubscription[] | {}
> = React.createContext({});
