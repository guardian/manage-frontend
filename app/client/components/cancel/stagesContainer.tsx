import { css } from "emotion";
import React, { ReactNode } from "react";
import { RouteComponentProps } from "react-router-dom";
import CancellationFlows, {
  BranchingStageDescriptor,
  CancellationFlow,
  Stage,
  stageHasChildren
} from "./cancellationFlows";
import { default as StageIndicator } from "./stageIndicator";

export interface CancellationRouteParams {
  cancelType: string;
  requestedStageID: string;
}

export interface CancellationFlowState {
  cancelType: string;
  correspondingFlow: CancellationFlow;
  stageHistory: Stage[];
  topLevelStageHistory: Stage[];
}

export default class StagesContainer extends React.Component<
  RouteComponentProps<CancellationRouteParams>,
  CancellationFlowState
> {
  constructor(props: RouteComponentProps<CancellationRouteParams>) {
    super(props);

    const cancelType: string = this.props.match.params.cancelType;

    // route path param whitelist validation should prevent this from being null
    const correspondingFlow: CancellationFlow = CancellationFlows.getCorrespondingFlow(
      cancelType
    );

    this.state = {
      cancelType,
      correspondingFlow,
      stageHistory: [correspondingFlow[0]],
      topLevelStageHistory: [correspondingFlow[0]]
    };
  }

  public componentWillMount() {
    const requestedStageID = this.props.match.params.requestedStageID;

    const currentStage = this.getCurrentStage();

    if (
      requestedStageID === undefined ||
      requestedStageID !== currentStage.id
    ) {
      const separator = this.props.match.url.endsWith("/") ? "" : "/";

      this.props.history.replace(
        this.props.match.url + separator + currentStage.id
      );
      return;
    }
  }

  public shouldComponentUpdate(
    nextProps: Readonly<RouteComponentProps<CancellationRouteParams>>,
    nextState: Readonly<CancellationFlowState>
  ): boolean {
    if (this.props !== nextProps || this.context !== nextState) {
      return true;
    }
    return false;
  }

  public componentWillUpdate() {
    const requestedStageID = this.props.match.params.requestedStageID;

    const currentStage = this.getCurrentStage();

    // catches any manual manipulation of the URL
    if (requestedStageID !== currentStage.id) {
      this.props.history.replace(currentStage.id);
      return;
    }
  }

  public render(): ReactNode {
    const isFinalStage =
      this.getCurrentStage() ===
      this.state.correspondingFlow[this.state.correspondingFlow.length - 1];

    const backFunc = this.buildNavFunction(true);
    const nextFunc = this.buildNavFunction(false);

    let backButton;
    let nextButton;
    if (!isFinalStage) {
      const clickableCSS = { cursor: "pointer" };
      backButton = (
        <button className={css(clickableCSS)} onClick={backFunc}>
          Back
        </button>
      );
      nextButton = (
        <a
          className={css({
            float: "right",
            ...clickableCSS,
            ...this.getNextButtonExtraCSS()
          })}
          onClick={nextFunc}
        >
          Cancel your {this.state.cancelType}
        </a>
      );
    }

    const currentStage = this.getCurrentStage();

    const selectChildFunc = (currentStage: BranchingStageDescriptor) => (
      selectedChildID: string
    ) => {
      this.state.stageHistory.push(
        currentStage.children.filter(
          (child: Stage) => child.id === selectedChildID
        )[0]
      );
      this.props.history.push(selectedChildID);
    };

    return (
      <div>
        <StageIndicator
          currentStage={this.state.stageHistory.length}
          totalStages={
            this.state.stageHistory.length +
            (this.state.correspondingFlow.length -
              this.state.topLevelStageHistory.length)
          }
        />
        <div>
          {stageHasChildren(currentStage)
            ? currentStage.render(currentStage, selectChildFunc(currentStage))
            : currentStage.render()}
        </div>
        <br />
        <div>
          {backButton}
          {nextButton}
        </div>
      </div>
    );
  }

  private getCurrentStage(): Stage {
    return this.state.stageHistory[this.state.stageHistory.length - 1];
  }

  private getCurrentTopLevelStage(): Stage {
    return this.state.topLevelStageHistory[
      this.state.topLevelStageHistory.length - 1
    ];
  }

  private getNextButtonExtraCSS(): object {
    const currentStage = this.getCurrentStage();
    if (stageHasChildren(currentStage)) {
      return {
        display: "none"
      };
    }
    return {};
  }

  private buildNavFunction(isGoingBack: boolean): () => void {
    return () => {
      const currentStage = this.getCurrentStage();
      if (isGoingBack) {
        if (this.state.stageHistory.pop() === this.getCurrentTopLevelStage()) {
          this.state.topLevelStageHistory.pop();
        }
        this.props.history.goBack();
      } else if (!stageHasChildren(currentStage)) {
        const nextTopLevelStage = this.state.correspondingFlow[
          this.state.correspondingFlow.indexOf(this.getCurrentTopLevelStage()) +
            1
        ];
        this.state.topLevelStageHistory.push(nextTopLevelStage);
        this.state.stageHistory.push(nextTopLevelStage);
        this.props.history.push(nextTopLevelStage.id);
      }
    };
  }
}
