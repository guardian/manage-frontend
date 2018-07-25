import { navigate } from "@reach/router";
import React, { ChangeEvent, ReactNode } from "react";
import { trackEvent } from "../../../analytics";
import palette from "../../../colours";
import { minWidth } from "../../../styles/breakpoints";
import { css } from "../../../styles/emotion";
import { sans } from "../../../styles/fonts";
import { Button } from "../../buttons";
import { CallCentreNumbers } from "../../callCentreNumbers";
import { CaseCreationWrapper } from "../../caseCreationWrapper";
import { CaseUpdateAsyncLoader, getUpdateCasePromise } from "../../caseUpdate";
import { PageContainerSection } from "../../page";
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
  await getUpdateCasePromise(caseId, {
    Description: feedback,
    Subject: "Online Cancellation Query",
    Status: "Open"
  });

const gaTrackFeedback = (actionString: string) =>
  trackEvent({
    eventCategory: "feedback",
    eventAction: actionString
  });

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
  }

  public render(): React.ReactNode {
    if (this.state.hasHitSubmit) {
      return (
        <>
          <CaseUpdateAsyncLoader
            loadingMessage="Storing your feedback..."
            fetch={getPatchUpdateCaseFunc(
              this.state.feedback,
              this.props.caseId
            )}
            render={this.getFeedbackThankYouRenderer(this.props.reason)}
          />
          <ConfirmCancellationButton reasonId={this.props.reason.reasonId} />
        </>
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
            onClick={this.submitFeedback}
            text="Submit Feedback"
            textColor={palette.white}
            color={palette.neutral["2"]}
            disabled={this.state.feedback.length === 0}
          />
          <ConfirmCancellationButton
            reasonId={this.props.reason.reasonId}
            onClick={() => {
              if (this.state.feedback.length > 0) {
                getPatchUpdateCaseFunc(
                  this.state.feedback,
                  this.props.caseId
                )();
                gaTrackFeedback("submitted silently");
              }
            }}
          />
        </div>
      </div>
    );
  }

  private handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ feedback: event.target.value });
  };

  private submitFeedback = () => {
    this.setState({ hasHitSubmit: true });
    gaTrackFeedback("submitted");
  };

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

const contactUsStyles = css({
  margin: "0 0 10px",

  [minWidth.phablet]: {
    flexShrink: 0,
    paddingRight: "5px",
    margin: "0"
  }
});

const callCenterStyles = css({
  marginBottom: "50px",

  [minWidth.phablet]: {
    display: "flex"
  }
});

interface ConfirmCancellationButtonProps {
  onClick?: () => any;
  reasonId: string;
}

const ConfirmCancellationButton = (props: ConfirmCancellationButtonProps) => (
  <div
    css={{
      [minWidth.tablet]: {
        transform: "translateY(51px)",
        margin: 0
      },
      marginTop: "15px",
      textAlign: "right"
    }}
  >
    <Button
      text="Confirm Cancellation"
      textColor={palette.white}
      color={palette.neutral["2"]}
      onClick={() => {
        if (props.onClick) {
          props.onClick();
        }
        navigate(props.reasonId + "/confirmed");
      }}
    />
  </div>
);

export const GenericSaveAttempt = (props: GenericSaveAttemptProps) => (
  <MembersDataApiResponseContext.Consumer>
    {membersDataApiResponse => (
      <CancellationReasonContext.Provider value={props.path}>
        <CaseCreationWrapper
          membersDataApiResponse={membersDataApiResponse}
          sfProduct={props.sfProduct}
        >
          <WizardStep routeableProps={props}>
            <PageContainerSection>
              <h2>{props.reason.saveTitle}</h2>
              <p>{props.reason.saveBody}</p>
              {props.reason.skipFeedback ? (
                undefined
              ) : (
                <div className={callCenterStyles}>
                  <span className={contactUsStyles}>
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
                    <ConfirmCancellationButton
                      reasonId={props.reason.reasonId}
                    />
                  )
                }
              </CancellationCaseIdContext.Consumer>
            </PageContainerSection>
          </WizardStep>
        </CaseCreationWrapper>
      </CancellationReasonContext.Provider>
    )}
  </MembersDataApiResponseContext.Consumer>
);
