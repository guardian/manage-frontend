import { css } from "emotion";
import History from "history";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import StageMaps, {
  Stage,
  stageDoesBranch,
  StageID,
  StageMap
} from "./cancellationFlows";
import { NotFound } from "./notFound";
import StageIndicator from "./stageIndicator";

export type CancelRouteParams = RouteComponentProps<{
  cancelType: string;
  stagePath: string;
}>;

export const StagesContainer: React.SFC<CancelRouteParams> = (
  props: CancelRouteParams
) => {
  // route path param whitelist validation should prevent this from being null
  const cancelType: string = props.match.params.cancelType;
  const correspondingStageMap: StageMap = StageMaps.getCorrespondingStageMap(
    cancelType
  );

  const stageParts: string[] = stagePathToParts(props.match.params.stagePath); // TODO consider obfuscating the stageIDs

  const currentStage: Stage = stagePartsToStage(
    stageParts,
    correspondingStageMap
  );

  if (currentStage === undefined) {
    return <NotFound />;
  }

  const isFinalStage = currentStage.next === undefined;

  let backButton;
  let nextButton;
  if (!isFinalStage) {
    const clickableCSS = { cursor: "pointer" };
    const backFunc = buildNavFunction(props.history);
    backButton = (
      <button className={css(clickableCSS)} onClick={backFunc}>
        Back
      </button>
    );
    if (!stageDoesBranch(currentStage)) {
      const nextFunc = buildNavFunction(
        props.history,
        props.match.url + "/" + currentStage.next
      );
      nextButton = (
        <a
          className={css({
            float: "right",
            ...clickableCSS
          })}
          onClick={nextFunc}
        >
          Cancel your {cancelType}
        </a>
      );
    }
  }

  const renderToReactNode = () => {
    if (stageDoesBranch(currentStage)) {
      const toStageMapReducer = (result: StageMap, stageID: StageID) => ({
        ...result,
        [stageID]: correspondingStageMap[stageID]
      });
      const children = currentStage.next.reduce(toStageMapReducer, {});
      return currentStage.render(children, goToNext);
    }
    return currentStage.render();
  };

  const goToNext = (stageID: string) => {
    const matchUrlWithSlash = props.match.url.endsWith("/")
      ? props.match.url
      : props.match.url + "/";
    props.history.push(matchUrlWithSlash + stageID);
  };

  return (
    <div>
      <StageIndicator
        currentStage={1 + stageParts.length}
        totalStages={
          stageParts.length +
          estimateRemainingSteps(correspondingStageMap, currentStage)
        }
      />
      <div>{renderToReactNode()}</div>
      <br />
      <div>
        {backButton}
        {nextButton}
      </div>
    </div>
  );
};

function stagePathToParts(stagePath: string | undefined): string[] {
  if (stagePath === undefined || stagePath.trim().length === 0) {
    return [];
  }

  return stagePath.split("/");
}

function stagePartsToStage(stageParts: string[], flow: StageMap): Stage {
  if (stageParts.length === 0) {
    return flow.START;
  }

  return flow[stageParts[stageParts.length - 1]]; // TODO validating state prerequisites of every stage thus far
}

function buildNavFunction(history: History.History, next?: string): () => void {
  return () => (next ? history.push(next) : history.goBack());
}

function estimateRemainingSteps(flow: StageMap, fromStage: Stage): number {
  if (stageDoesBranch(fromStage)) {
    return 1 + estimateRemainingSteps(flow, flow[fromStage.next[0]]);
  } else if (fromStage.next) {
    return 1 + estimateRemainingSteps(flow, flow[fromStage.next]);
  }
  return 1; // i.e. fromStage is the last stage
}
