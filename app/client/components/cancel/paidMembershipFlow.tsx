import React, { ChangeEvent, ReactNode } from "react";
import palette from "../../colours";
import { LinkButton } from "../buttons";
import { CheckFlowIsValid, MeResponse } from "../cancellationFlowWrapper";
import {
  hasMembership,
  loadMembershipData,
  MembersDataApiResponse,
  MembershipAsyncLoader
} from "../membership";
import { CancellationReason, MembersDataApiResponseContext } from "../user";
import {
  MultiRouteableProps,
  RouteableProps,
  WizardStep
} from "../wizardRouterAdapter";
import { CancellationSummary } from "./cancellationSummary";

export const membershipCancellationReasonMatrix: CancellationReason[] = [
  {
    reasonId: "mma_financial_circumstances",
    linkLabel: "A change in my financial circumstances",
    saveTitle:
      "We understand that financial circumstances can change from time to time",
    saveBody:
      "Making a smaller contribution to the Guardian can be an inexpensive way of keeping journalism open for everyone to read and enjoy. There are a number of flexible ways to make support us and one of our customer service specialist would be happy to hear from you."
  },
  {
    reasonId: "mma_payment_issue",
    linkLabel: "I didn't expect The Guardian to take another payment",
    saveTitle: "We are sorry that you have been charged again",
    saveBody:
      "We’d like to know more details to help resolve the issue. One of our customer service specialists will be more than happy to assist.",
    alternateFeedbackIntro:
      "Alternatively please provide some more details in the form below and we’ll get back to you as soon as possible"
  },
  {
    reasonId: "mma_editorial",
    linkLabel: "I am unhappy with Guardian journalism",
    saveTitle:
      "In order to improve our journalism, we’d love to know more about why you decided to cancel", //TODO check past tense decided
    saveBody:
      "If there’s anything we can do differently please take a moment to call our customer services team we would be happy to hear from you."
  },
  {
    reasonId: "mma_none",
    linkLabel: "None of the membership benefits are of interest to me",
    saveTitle:
      "In order to improve our membership programme, we’d love to know more about why you are thinking of cancelling",
    saveBody:
      "If there’s anything we can do differently please take a moment to give us some feedback"
  },
  {
    reasonId: "mma_support_another_way",
    linkLabel:
      "I am going to support The Guardian in another way, eg. by subscribing",
    saveTitle: "Thank you for your your ongoing support.",
    saveBody: "Please first confirm your membership cancellation below.",
    alternateCallUsPrefix:
      "If you’re not sure what’s best for you or would like help, please call us on",
    alternateFeedbackIntro:
      "Alternatively please provide some more details in the form below and we’ll get back to you as soon as possible"
  },
  {
    reasonId: "mma_health",
    linkLabel: "Ill-health",
    saveTitle: "Thank you so much for your support.",
    saveBody:
      "Your contribution has ensured that our quality journalism remains open for everyone to read and enjoy. Please confirm your cancellation below.",
    skipFeedback: true
  },
  {
    reasonId: "mma_break", // TODO think this needs to be added to zuora
    linkLabel: "I am taking a break from news",
    saveTitle:
      "We understand that sometimes the news cycle can feel a little overwhelming.",
    saveBody: (
      <React.Fragment>
        You can click <a>here to manage your communication preferences.</a>
      </React.Fragment>
    ),
    alternateCallUsPrefix:
      "If you would like some help with your communication preferences our customer services team would be happy to set this up for you. You can contact us on",
    alternateFeedbackIntro:
      "Alternatively please provide some more details in the form below and we’ll get back to you as soon as possible"
  },
  {
    reasonId: "mma_values",
    linkLabel: "I don't feel that the Guardian values my support",
    saveTitle:
      "In order to improve our membership programme, we’d love to know more about why you are thinking of cancelling",
    saveBody:
      "If there’s anything we can do differently please take a moment to give us some feedback"
  },
  {
    reasonId: "mma_other",
    linkLabel: "Other",
    saveTitle:
      "In order to improve our membership programme, we’d love to know more about why you are thinking of cancelling",
    saveBody:
      "If there’s anything we can do differently please take a moment to give us some feedback"
  }
];

interface ReasonPickerProps {
  options: ReactNode[];
}

interface ReasonPickerState {
  reasonPath: string;
}

const cssInheritFont = {
  fontSize: "inherit",
  fontFamily: "inherit"
};

class ReasonPicker extends React.Component<
  ReasonPickerProps,
  ReasonPickerState
> {
  constructor(props: ReasonPickerProps) {
    super(props);
    this.state = {
      reasonPath: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  public handleChange(event: ChangeEvent<HTMLSelectElement>): void {
    this.setState({ reasonPath: event.target.value });
  }

  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <select
          value={this.state.reasonPath}
          onChange={this.handleChange}
          css={{
            ...cssInheritFont,
            width: "100%",
            height: "40px",
            textIndent: "4px",
            border: "1px black solid"
            // TODO fix the clipping of font top/bottom because of font-size
          }}
        >
          <option disabled selected value="">
            please select a reason from this dropdown
          </option>
          {this.props.options}
        </select>
        <br />
        <br />
        {this.state.reasonPath ? (
          <LinkButton
            color={palette.neutral["2"]}
            textColor={palette.white}
            text="Continue"
            to={this.state.reasonPath}
          />
        ) : (
          undefined
        )}
      </React.Fragment>
    );
  }
}

const childWithRouteablePropsToElement = (child: {
  props: MultiRouteableProps;
}) => (
  <option key={child.props.path} value={child.props.path} css={cssInheritFont}>
    {child.props.linkLabel || child.props.path}
  </option>
);

const getReasonsRenderer = (routeableProps: RouteableProps) => (
  data: MembersDataApiResponse
) => {
  if (hasMembership(data)) {
    if (data.subscription.cancelledAt) {
      return CancellationSummary("membership")(data.subscription);
    }
    return (
      <MembersDataApiResponseContext.Provider value={data}>
        <WizardStep routeableProps={routeableProps}>
          <h3>
            Your support means we can remain independent, free from censorship,
            open to all readers and empowered to hold those in power to account.
          </h3>
          <p>Sorry to hear you are thinking of cancelling your membership.</p>
          <p>Can you take a moment to tell us why?</p>
          <ReasonPicker
            options={routeableProps.children.props.children.map(
              childWithRouteablePropsToElement
            )}
          />
        </WizardStep>
      </MembersDataApiResponseContext.Provider>
    );
  }

  return <h2>No Membership</h2>;
};

export const PaidMembershipFlow = (props: RouteableProps) => (
  <CheckFlowIsValid
    checkingFor="membership"
    validator={(me: MeResponse) => me.contentAccess.paidMember}
  >
    <MembershipAsyncLoader
      fetch={loadMembershipData}
      render={getReasonsRenderer(props)}
      loadingMessage="Checking the status of your current membership..."
      errorRender={() => (
        <h2>
          Could not fetch membership details. Please call the call centre...{" "}
          {/* TODO add the call centre number*/}
        </h2>
      )}
    />
  </CheckFlowIsValid>
);
