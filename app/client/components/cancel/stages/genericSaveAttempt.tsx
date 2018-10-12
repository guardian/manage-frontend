import { navigate } from "@reach/router";
import React, { ChangeEvent, ReactNode } from "react";
import { MembersDataApiResponseContext } from "../../../../shared/productResponse";
import { WithProductType } from "../../../../shared/productTypes";
import palette from "../../../colours";
import { maxWidth } from "../../../styles/breakpoints";
import { sans } from "../../../styles/fonts";
import { trackEvent } from "../../analytics";
import { Button } from "../../buttons";
import { CallCentreNumbers } from "../../callCentreNumbers";
import { GoogleOptimiseAwaitFlagWrapper } from "../../GoogleOptimiseAwaitFlagWrapper";
import { PageContainerSection } from "../../page";
import {
  MultiRouteableProps,
  ReturnToYourProductButton,
  WizardStep
} from "../../wizardRouterAdapter";
import {
  CancellationCaseIdContext,
  CancellationReasonContext
} from "../cancellationContexts";
import {
  CancellationReason,
  CancellationReasonId
} from "../cancellationReason";
import { CaseCreationWrapper } from "../caseCreationWrapper";
import { CaseUpdateAsyncLoader, getUpdateCasePromise } from "../caseUpdate";

export interface GenericSaveAttemptProps extends MultiRouteableProps {
  reason: CancellationReason;
}

interface FeedbackFormProps extends WithProductType {
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

const ContactUs = (reason: CancellationReason) =>
  reason.hideContactUs ? (
    <></>
  ) : (
    <CallCentreNumbers
      prefixText={reason.alternateCallUsPrefix || "To contact us"}
    />
  );

class FeedbackFormAndContactUs extends React.Component<
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
          <div css={{ height: "20px" }} />
          <ConfirmCancellationAndReturnRow
            reasonId={this.props.reason.reasonId}
            productType={this.props.productType}
          />
        </>
      );
    }
    return (
      <div>
        {!this.props.reason.hideContactUs &&
        !this.props.productType.cancellationSwapFeedbackAndContactUs ? (
          <ContactUs {...this.props.reason} />
        ) : (
          undefined
        )}
        {this.props.productType.cancellationSwapFeedbackAndContactUs ? (
          undefined
        ) : (
          <p>
            {this.props.reason.alternateFeedbackIntro ||
              "Alternatively provide feedback in the box below"}
          </p>
        )}
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
            text="Submit feedback"
            disabled={this.state.feedback.length === 0}
          />
          <ConfirmCancellationAndReturnRow
            reasonId={this.props.reason.reasonId}
            productType={this.props.productType}
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
          {!this.props.reason.hideContactUs &&
          this.props.productType.cancellationSwapFeedbackAndContactUs ? (
            <div css={{ marginTop: "20px" }}>
              <ContactUs {...this.props.reason} />
            </div>
          ) : (
            undefined
          )}
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
        <p
          css={{
            fontSize: "1rem",
            fontWeight: "500"
          }}
        >
          {reason.alternateFeedbackThankYouTitle ||
            "Thank you for your feedback."}
        </p>
        <span>
          {reason.alternateFeedbackThankYouBody ||
            "The Guardian is dedicated to keeping our independent, investigative journalism open to all. We report on the facts, challenging the powerful and holding them to account. Support from our readers makes what we do possible."}
        </span>
      </div>
    );
  }
}

interface ConfirmCancellationAndReturnRowProps extends WithProductType {
  onClick?: () => any;
  reasonId: CancellationReasonId;
}

const ConfirmCancellationAndReturnRow = (
  props: ConfirmCancellationAndReturnRowProps
) => (
  <div
    css={{
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row-reverse",
      marginTop: "10px",
      textAlign: "left",
      [maxWidth.mobileLandscape]: {
        flexDirection: "column"
      }
    }}
  >
    <div
      css={{
        textAlign: "right",
        marginBottom: "30px"
      }}
    >
      <Button
        text="Confirm cancellation"
        onClick={() => {
          if (props.onClick) {
            props.onClick();
          }
          navigate(props.reasonId + "/confirmed");
        }}
        right
      />
    </div>
    <div>
      <ReturnToYourProductButton productType={props.productType} />
    </div>
  </div>
);

export const GenericSaveAttempt = (props: GenericSaveAttemptProps) => (
  <MembersDataApiResponseContext.Consumer>
    {membersDataApiResponse => (
      <CancellationReasonContext.Provider
        value={props.path as CancellationReasonId}
      >
        <CaseCreationWrapper
          membersDataApiResponse={membersDataApiResponse}
          sfProduct={props.productType.sfProduct}
        >
          <WizardStep routeableStepProps={props} hideBackButton>
            <PageContainerSection>
              <h3 id="save_title">
                {props.productType.cancellationSaveTitlePrefix || ""}
                {props.reason.saveTitle}
              </h3>
              <GoogleOptimiseAwaitFlagWrapper
                experimentFlagName={props.reason.experimentTriggerFlag}
              >
                {{
                  flagIsSet: props.reason.experimentSaveBody,
                  flagIsNotSet: <p id="save_body">{props.reason.saveBody}</p>
                }}
              </GoogleOptimiseAwaitFlagWrapper>

              <CancellationCaseIdContext.Consumer>
                {caseId =>
                  caseId && !props.reason.skipFeedback ? (
                    <FeedbackFormAndContactUs
                      characterLimit={2500}
                      caseId={caseId}
                      reason={props.reason}
                      productType={props.productType}
                    />
                  ) : (
                    <div
                      css={{
                        display: "flex",
                        flexDirection: props.productType
                          .cancellationSwapFeedbackAndContactUs
                          ? "column-reverse"
                          : "column"
                      }}
                    >
                      <ContactUs {...props.reason} />
                      <ConfirmCancellationAndReturnRow
                        reasonId={props.reason.reasonId}
                        productType={props.productType}
                      />
                    </div>
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
