import React, { ChangeEvent, ReactNode } from "react";
import palette from "../../../colours";
import { sans } from "../../../styles/fonts";
import { Button } from "../../buttons";
import { CallCentreNumbers } from "../../callCentreNumbers";
import { CaseCreationWrapper } from "../../caseCreationWrapper";
import { CaseUpdateAsyncLoader, getUpdateCasePromise } from "../../caseUpdate";
import {
  CancellationCaseIdContext,
  CancellationReason,
  CancellationReasonContext,
  MembersDataApiResponseContext
} from "../../user";
import { MultiRouteableProps, WizardStep } from "../../wizardRouterAdapter";

export interface GenericSaveAttemptProps extends MultiRouteableProps {
  sfProduct: string;
  reason: CancellationReason;
}

interface FeedbackFormProps {
  reason: CancellationReason;
  characterLimit: number;
  caseId: string;
}

interface FeedbackFormState {
  feedback: string;
  hasHitSubmit: boolean;
}

const getPatchUpdateCaseFunc = (feedback: string, caseId: string) => async () =>
  (await getUpdateCasePromise(caseId, {
    Description: feedback,
    Subject: "Online Cancellation Query",
    Status: "Open"
  })).json();

class FeedbackForm extends React.Component<
  FeedbackFormProps,
  FeedbackFormState
> {
  constructor(props: FeedbackFormProps) {
    super(props);
    this.state = {
      feedback: "",
      hasHitSubmit: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  public handleChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    this.setState({ feedback: event.target.value });
  }

  public render(): React.ReactNode {
    if (this.state.hasHitSubmit) {
      return (
        <CaseUpdateAsyncLoader
          loadingMessage="Storing your feedback..."
          fetch={getPatchUpdateCaseFunc(this.state.feedback, this.props.caseId)}
          render={this.getFeedbackThankYouRenderer(this.props.reason)}
        />
      );
    }
    return (
      <div>
        <p>
          {this.props.reason.alternateFeedbackIntro ||
            "Alternatively provide feedback in the box below"}
        </p>
        <textarea
          rows={5}
          maxLength={this.props.characterLimit}
          css={{
            width: "100%",
            fontSize: "inherit",
            fontFamily: "inherit",
            border: "1px black solid"
          }}
          onChange={this.handleChange}
        />
        <div css={{ textAlign: "right" }}>
          <div
            css={{
              fontSize: "small",
              color: palette.neutral["3"],
              fontFamily: sans,
              paddingBottom: "10px"
            }}
          >
            You have {this.props.characterLimit - this.state.feedback.length}{" "}
            characters remaining
          </div>
          <Button
            onClick={() => this.setState({ hasHitSubmit: true })}
            text="Submit Feedback"
            textColor={palette.white}
            color={palette.neutral["2"]}
            disabled={this.state.feedback.length === 0}
          />
        </div>
      </div>
    );
  }

  private getFeedbackThankYouRenderer(
    reason: CancellationReason
  ): () => ReactNode {
    return () => (
      <div
        css={{
          marginLeft: "15px",
          marginTop: "30px",
          paddingLeft: "15px",
          borderLeft: "1px solid " + palette.neutral["4"]
        }}
      >
        <h3>
          {reason.alternateFeedbackThankYouTitle ||
            "Thank you for your feedback."}
        </h3>
        <span>
          {reason.alternateFeedbackThankYouBody ||
            "The Guardian is dedicated to reporting the truth, holding power to account, and exposing corruption wherever we find it. Support from our readers makes what we do possible."}
        </span>
      </div>
    );
  }
}

export const GenericSaveAttempt = (props: GenericSaveAttemptProps) => (
  <MembersDataApiResponseContext.Consumer>
    {membersDataApiResponse => (
      <CancellationReasonContext.Provider value={props.path}>
        <CaseCreationWrapper
          membersDataApiResponse={membersDataApiResponse}
          sfProduct={props.sfProduct}
        >
          <WizardStep routeableProps={props}>
            <h3>{props.reason.saveTitle}</h3>
            <p>{props.reason.saveBody}</p>
            {props.reason.skipFeedback ? (
              undefined
            ) : (
              <div css={{ display: "flex" }}>
                <span css={{ flexShrink: 0, paddingRight: "5px" }}>
                  {props.reason.alternateCallUsPrefix || "To contact us"}
                </span>
                <CallCentreNumbers />
              </div>
            )}
            <CancellationCaseIdContext.Consumer>
              {caseId =>
                caseId && !props.reason.skipFeedback ? (
                  <FeedbackForm
                    characterLimit={2500}
                    caseId={caseId}
                    reason={props.reason}
                  />
                ) : (
                  undefined
                )
              }
            </CancellationCaseIdContext.Consumer>
          </WizardStep>
        </CaseCreationWrapper>
      </CancellationReasonContext.Provider>
    )}
  </MembersDataApiResponseContext.Consumer>
);
