import { css } from "emotion";
import React from "react";

export interface StageIndicatorProps {
  currentStage: number;
  totalStages: number;
}

const StageIndicator = (props: StageIndicatorProps) => (
  <h3
    className={css({
      float: "right"
    })}
  >
    Step {props.currentStage}/{props.totalStages}
  </h3>
);

export default StageIndicator;
