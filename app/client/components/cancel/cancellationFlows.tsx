import React, { ReactNode } from "react";
import { ReasonsStageRenderer } from "./stages/reasons";

export interface StageDescriptor {
  metadata?: string | object;
}

export type NavToChild = (stageID: StageID) => void;

export type BranchingStageRenderer = (
  children: StageMap,
  navToChild: NavToChild
) => ReactNode;

export interface BranchingStageDescriptor extends StageDescriptor {
  render: BranchingStageRenderer;
  next: StageID[];
}
export interface NonBranchingStageDescriptor extends StageDescriptor {
  render: () => ReactNode;
  next: StageID | undefined;
}

export type Stage = BranchingStageDescriptor | NonBranchingStageDescriptor;

export interface StageMap {
  [stageID: string]: Stage;
}

export type StageID = keyof StageMap;

export function stageDoesBranch(
  stage: Stage
): stage is BranchingStageDescriptor {
  return Array.isArray(stage.next);
}

const cancelStageMaps: { [cancelType: string]: StageMap } = {
  membership: {
    START: {
      render: ReasonsStageRenderer,
      next: ["reasonSaveAttemptA", "reasonSaveAttemptB", "reasonSaveAttemptC"]
    },
    reasonSaveAttemptA: {
      metadata: "reason A",
      render: () => <h2>save attempt A</h2>,
      next: "cancelAnyway"
    },
    reasonSaveAttemptB: {
      metadata: "reason B",
      render: () => <h2>save attempt B</h2>,
      next: "cancelAnyway"
    },
    reasonSaveAttemptC: {
      metadata: "reason C",
      render: () => <h2>save attempt C</h2>,
      next: "cancelAnyway"
    },
    cancelAnyway: {
      render: () => <h2>cancel anyway</h2>,
      next: "cancelConfirmation"
    },
    cancelConfirmation: {
      render: () => <h2>cancel confirmation</h2>,
      next: undefined
    }
  },
  contributions: {
    START: {
      render: () => <h2>Coming Soon</h2>,
      next: undefined
    }
  }
};

export default class CancellationFlows {
  public static toCancelTypeRouteWhitelist(): string {
    return Object.keys(cancelStageMaps).join("|");
  }

  public static getCorrespondingStageMap(cancelType: string): StageMap {
    return cancelStageMaps[cancelType];
  }
}
