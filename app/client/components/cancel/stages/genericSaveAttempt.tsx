import { Link } from "@reach/router";
import React, { ChangeEvent } from "react";
import palette from "../../../colours";
import { sans } from "../../../styles/fonts";
import { Button } from "../../buttons";
import { CaseCreationWrapper } from "../../caseCreationWrapper";
import { CaseUpdateAsyncLoader, getUpdateCasePromise } from "../../caseUpdate";
import {
  CancellationCaseIdContext,
  CancellationReasonContext,
  MembersDataApiResponseContext
} from "../../user";
import { MultiRouteableProps, WizardStep } from "../../wizardRouterAdapter";

export interface GenericSaveAttemptProps extends MultiRouteableProps {
  sfProduct: string;
}

interface FeedbackFormProps {
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

const renderFeedbackThankYou = () => <h3>Thanks for the feedback</h3>;

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
          render={renderFeedbackThankYou}
        />
      );
    }
    return (
      <div css={{ textAlign: "right" }}>
        <textarea
          rows={5}
          maxLength={this.props.characterLimit}
          css={{ width: "100%", fontSize: "inherit", fontFamily: "inherit" }}
          onChange={this.handleChange}
        />
        <span
          css={{
            fontSize: "small",
            float: "left",
            color: palette.neutral["3"],
            fontFamily: sans
          }}
        >
          You have {this.props.characterLimit - this.state.feedback.length}{" "}
          characters remaining
        </span>
        <Button
          onClick={() => this.setState({ hasHitSubmit: true })}
          text="Submit Feedback"
          textColor={palette.white}
          color={palette.neutral["4"]}
        />
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
            <h2>{props.linkLabel || props.path}</h2>
            <b>We are very interested in your feedback and concerns. </b>
            If there’s anything we can do differently that would ensure your
            continued support please take a moment to call us on xxx
            <CancellationCaseIdContext.Consumer>
              {caseId =>
                caseId ? (
                  <React.Fragment>
                    or use the feedback form below...
                    <FeedbackForm characterLimit={1000} caseId={caseId} />
                  </React.Fragment>
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
