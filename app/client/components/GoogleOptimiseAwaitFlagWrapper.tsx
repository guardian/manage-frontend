import React from "react";
import { Globals } from "../../shared/globals";
import { applyAnyOptimiseExperiments } from "./analytics";

export interface GlobalsWithExperimentFlags extends Globals {
  experimentFlags?: {
    [experimentFlagName: string]: true;
  };
}

interface WindowWithGlobalsWithExperimentFlags extends Window {
  guardian: GlobalsWithExperimentFlags;
}

declare let window: WindowWithGlobalsWithExperimentFlags;

export interface AwaitOptimiseFlagProps {
  experimentFlagName: string | undefined;
  children: {
    flagIsSet: JSX.Element | undefined;
    flagIsNotSet: JSX.Element;
  };
}

export const GoogleOptimiseAwaitFlagWrapper: (
  props: AwaitOptimiseFlagProps
) => JSX.Element = (props: AwaitOptimiseFlagProps) => {
  applyAnyOptimiseExperiments(); // blocks until experiments have run (variant or original)

  if (
    props.experimentFlagName &&
    typeof window !== "undefined" &&
    window.guardian &&
    window.guardian.experimentFlags &&
    window.guardian.experimentFlags[props.experimentFlagName] &&
    props.children.flagIsSet
  ) {
    return props.children.flagIsSet;
  }

  return props.children.flagIsNotSet;
};
