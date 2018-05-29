import * as React from "react";
import {
  BranchingStageDescriptor,
  BranchingStageRenderer
} from "../cancellationFlows";

export const ReasonsStageRenderer: BranchingStageRenderer = (
  descriptor: BranchingStageDescriptor,
  selectChild: (selectedChildID: string) => any
) => {
  return (
    <div>
      Please tell us your reason...
      <ul>
        {descriptor.children.map(({ id, data }) => (
          <button key={id} onClick={() => selectChild(id)}>
            {data}
          </button>
        ))}
      </ul>
    </div>
  );
};
