import React from "react";
import { applyAnyOptimiseExperiments } from "./analytics";

export interface AwaitOptimiseFlagProps {
  experimentFlagName: string;
  children: {
    flagIsSet: JSX.Element;
    flagIsNotSet: JSX.Element;
  };
}

export const GoogleOptimiseAwaitFlagWrapper = (
  props: AwaitOptimiseFlagProps
) => {
  applyAnyOptimiseExperiments(); // blocks until experiments have run (variant or original)

  if (
    typeof window !== "undefined" &&
    window.guardian &&
    window.guardian.experimentFlags &&
    window.guardian.experimentFlags[props.experimentFlagName]
  ) {
    return props.children.flagIsSet;
  }

  return props.children.flagIsNotSet;
};
