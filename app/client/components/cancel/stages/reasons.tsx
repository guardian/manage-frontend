import * as React from "react";
import {
  BranchingStageRenderer,
  NavToChild,
  StageMap
} from "../cancellationFlows";

export const ReasonsStageRenderer: BranchingStageRenderer = (
  children: StageMap,
  navToChild: NavToChild
) => {
  return (
    <div>
      Please tell us your reason...
      <ul>
        {Object.keys(children).map(stageID => (
          <button key={stageID} onClick={() => navToChild(stageID)}>
            {children[stageID].metadata}
          </button>
        ))}
      </ul>
    </div>
  );
};
