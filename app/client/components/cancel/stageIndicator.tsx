import React from "react";

interface StageProps {
  currentStage: number;
  totalStages: number;
}

const StageIndicator = (props: StageProps) => (
  <h3>
    Step {props.currentStage}/{props.totalStages}
  </h3>
);

export { StageProps, StageIndicator };
