import React, { ReactNode } from "react";
import { ReasonsStageRenderer } from "./stages/reasons";

export type BranchingStageRenderer = (
  descriptor: BranchingStageDescriptor,
  selectChild: (selectedChildID: string) => void
) => ReactNode;

export interface StageDescriptor {
  id: string;
  render: (descriptor?: any, selectedChildID?: any) => ReactNode;
}

export interface ChildStageDescriptor extends StageDescriptor {
  data: string | object;
}

export interface BranchingStageDescriptor extends StageDescriptor {
  children: ChildStageDescriptor[];
  render: BranchingStageRenderer;
}

export type Stage =
  | StageDescriptor
  | BranchingStageDescriptor
  | ChildStageDescriptor;

export type CancellationFlow = Stage[];

export function stageHasChildren(
  stage: Stage
): stage is BranchingStageDescriptor {
  return (stage as BranchingStageDescriptor).children !== undefined;
}
export function stageIsChild(stage: Stage): stage is ChildStageDescriptor {
  return (stage as ChildStageDescriptor).data !== undefined;
}

const flows: { [cancelType: string]: CancellationFlow } = {
  membership: [
    {
      id: "reasons",
      render: ReasonsStageRenderer,
      children: [
        {
          id: "reasonSaveAttemptA",
          data: "reason A",
          render: () => <h2>save attempt A</h2>
        },
        {
          id: "reasonSaveAttemptB",
          data: "reason B",
          render: () => <h2>save attempt B</h2>
        },
        {
          id: "reasonSaveAttemptC",
          data: "reason C",
          render: () => <h2>save attempt C</h2>
        }
      ]
    },
    {
      id: "cancelAnyway",
      render: () => <h2>cancel anyway</h2>
    },
    {
      id: "cancelConfirmation",
      render: () => <h2>cancel confirmation</h2>
    }
  ],
  contributions: [
    {
      id: "comingSoon",
      render: () => <h2>Coming Soon</h2>
    }
  ]
};

export default class CancellationFlows {
  public static toCancelTypeRouteWhitelist(): string {
    return Object.keys(flows).join("|");
  }

  public static getCorrespondingFlow(cancelType: string): CancellationFlow {
    return flows[cancelType];
  }
}
