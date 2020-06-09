import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import { navigate } from "@reach/router";
import React, { ChangeEvent, ReactNode } from "react";
import {
  isProduct,
  MembersDataApiItemContext,
  ProductDetail
} from "../../../../shared/productResponse";
import {
  ProductTypeWithCancellationFlow,
  WithProductType
} from "../../../../shared/productTypes";
import palette from "../../../colours";
import { maxWidth } from "../../../styles/breakpoints";
import { sans } from "../../../styles/fonts";
import { trackEvent } from "../../analytics";
import { Button } from "../../buttons";
import { CallCentreNumbers } from "../../callCentreNumbers";
import { GenericErrorScreen } from "../../genericErrorScreen";
import { navLinks } from "../../nav";
import {
  PageContainerSection,
  PageHeaderContainer,
  PageNavAndContentContainer
} from "../../page";
import { ProgressIndicator } from "../../progressIndicator";
import {
  MultiRouteableProps,
  ReturnToAccountOverviewButton,
  WizardStep
} from "../../wizardRouterAdapter";
import {
  CancellationCaseIdContext,
  CancellationReasonContext
} from "../cancellationContexts";
import { CancellationFlowEscalationCheck } from "../cancellationFlowEscalationCheck";
import {
  CancellationReason,
  CancellationReasonId
} from "../cancellationReason";
import { CaseCreationWrapper } from "../caseCreationWrapper";
import { CaseUpdateAsyncLoader, getUpdateCasePromise } from "../caseUpdate";
import { RestOfCancellationFlow } from "../physicalSubsCancellationFlowWrapper";

export interface GenericSaveAttemptProps extends MultiRouteableProps {
  reason: CancellationReason;
  productType: ProductTypeWithCancellationFlow;
}

interface FeedbackFormProps
  extends WithProductType<ProductTypeWithCancellationFlow> {
  reason: CancellationReason;
  characterLimit: number;
  caseId: string;
  isTestUser: boolean;
}

interface FeedbackFormState {
  feedback: string;
  hasHitSubmit: boolean;
}

const getPatchUpdateCaseFunc = (
  isTestUser: boolean,
  caseId: string,
  feedback: string
) => async () =>
  await getUpdateCasePromise(isTestUser, "_FEEDBACK", caseId, {
    Description: feedback,
    Subject: "Online Cancellation Query"
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
              this.props.isTestUser,
              this.props.caseId,
              this.state.feedback
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
          !this.props.productType.cancellation.swapFeedbackAndContactUs && (
            <ContactUs {...this.props.reason} />
          )}
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
            text="Submit feedback"
            disabled={this.state.feedback.length === 0}
          />
          <ConfirmCancellationAndReturnRow
            reasonId={this.props.reason.reasonId}
            productType={this.props.productType}
            onClick={() => {
              if (this.state.feedback.length > 0) {
                getPatchUpdateCaseFunc(
                  this.props.isTestUser,
                  this.props.caseId,
                  this.state.feedback
                )();
                gaTrackFeedback("submitted silently");
              }
            }}
          />
          {!this.props.reason.hideContactUs &&
            this.props.productType.cancellation.swapFeedbackAndContactUs && (
              <div css={{ marginTop: "20px" }}>
                <ContactUs {...this.props.reason} />
              </div>
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
            fontWeight: 500
          }}
        >
          {reason.alternateFeedbackThankYouTitle ||
            "Thank you for your feedback."}
        </p>
        <span>
          {reason.alternateFeedbackThankYouBody ||
            "The Guardian is dedicated to keeping our independent, investigative journalism open to all. We report on the facts, challenging the powerful and holding them to account. Support from our readers makes what we do possible and we appreciate hearing from you to help improve our service."}
        </span>
      </div>
    );
  }
}

interface ConfirmCancellationAndReturnRowProps
  extends WithProductType<ProductTypeWithCancellationFlow> {
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
      <ReturnToAccountOverviewButton />
    </div>
  </div>
);

export const GenericSaveAttempt = (props: GenericSaveAttemptProps) => {
  const flowWrapper =
    props.productType.cancellation.flowWrapper ||
    (() => (restOfFlow: RestOfCancellationFlow) => restOfFlow);

  const innerContent = (productDetail: ProductDetail) => (
    <>
      <ProgressIndicator
        steps={[
          { title: "Reason" },
          { title: "Review", isCurrentStep: true },
          { title: "Confirmation" }
        ]}
        additionalCSS={css`
          margin: ${space[5]}px 0 ${space[12]}px;
        `}
      />
      <PageContainerSection>
        <h3 id="save_title">
          {props.productType.cancellation.hideReasonTitlePrefix
            ? ""
            : "Reason: "}
          {props.reason.saveTitle || props.reason.linkLabel}
        </h3>

        <CancellationFlowEscalationCheck {...props}>
          {escalationCauses => (
            <>
              {escalationCauses.length > 0 && (
                <p>
                  Once you submit your cancellation request our customer service
                  team will try their best to contact you as soon as possible to
                  confirm the cancellation and refund any credit you are owed.
                </p>
              )}
              <p id="save_body">
                {escalationCauses.length > 0 &&
                props.reason.escalationSaveBody !== undefined
                  ? props.reason.escalationSaveBody
                  : props.reason.saveBody}
              </p>
            </>
          )}
        </CancellationFlowEscalationCheck>

        <CancellationCaseIdContext.Consumer>
          {caseId =>
            caseId && !props.reason.skipFeedback ? (
              <FeedbackFormAndContactUs
                characterLimit={2500}
                caseId={caseId}
                reason={props.reason}
                productType={props.productType}
                isTestUser={productDetail.isTestUser}
              />
            ) : (
              <div
                css={{
                  display: "flex",
                  flexDirection:
                    props.productType.cancellation.swapFeedbackAndContactUs &&
                    caseId
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
    </>
  );

  return (
    <MembersDataApiItemContext.Consumer>
      {productDetail =>
        isProduct(productDetail) ? (
          flowWrapper(
            productDetail,
            props.productType
          )(
            <CancellationReasonContext.Provider
              value={props.path as CancellationReasonId}
            >
              <CaseCreationWrapper
                productDetail={productDetail}
                sfCaseProduct={props.productType.cancellation.sfCaseProduct}
              >
                <WizardStep routeableStepProps={props} hideBackButton fullWidth>
                  <>
                    <PageHeaderContainer
                      title={`Cancel ${props.productType.friendlyName}`}
                      breadcrumbs={[
                        {
                          title: navLinks.accountOverview.title,
                          link: navLinks.accountOverview.link
                        },
                        {
                          title: "Cancel membership",
                          currentPage: true
                        }
                      ]}
                    />
                    <PageNavAndContentContainer
                      selectedNavItem={navLinks.accountOverview}
                    >
                      {innerContent(productDetail)}
                    </PageNavAndContentContainer>
                  </>
                </WizardStep>
              </CaseCreationWrapper>
            </CancellationReasonContext.Provider>
          )
        ) : (
          <GenericErrorScreen loggingMessage="invalid product detail to cancel" />
        )
      }
    </MembersDataApiItemContext.Consumer>
  );
};
