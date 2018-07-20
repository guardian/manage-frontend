import React, { ChangeEvent, ReactNode } from "react";
import { css } from "react-emotion";
import { MeResponse } from "../../../../shared/meResponse";
import palette from "../../../colours";
import { minWidth } from "../../../styles/breakpoints";
import { LinkButton } from "../../buttons";
import { CheckFlowIsValid } from "../../cancellationFlowWrapper";
import {
  hasMembership,
  loadMembershipData,
  MembersDataApiResponse,
  MembershipAsyncLoader
} from "../../membership";
import { PageContainer, PageContainerSection } from "../../page";
import { MembersDataApiResponseContext } from "../../user";
import {
  MultiRouteableProps,
  ReturnToYourAccountButton,
  RouteableProps,
  WizardStep
} from "../../wizardRouterAdapter";
import { CancellationSummary } from "../cancellationSummary";

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
            height: "30px",
            border: "1px black solid",
            color: this.state.reasonPath ? undefined : palette.neutral["4"]
            // TODO fix the clipping of font top/bottom because of font-size
          }}
        >
          <option disabled value="">
            please select a reason from this dropdown
          </option>
          {this.props.options}
        </select>
        <br />
        <br />
        <div css={{ textAlign: "right" }}>
          <LinkButton
            color={palette.neutral["2"]}
            textColor={palette.white}
            text="Continue"
            to={this.state.reasonPath}
            disabled={!this.state.reasonPath}
          />
        </div>
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

const cssBullet = css`
  flex-basis: 50%;
  flex-grow: 1;
  list-style: none;
  &::before {
    display: inline-block;
    content: "●";
    margin-right: 15px;
  }
`;

const reasonsCss = css({
  margin: 0,
  padding: 0,

  [minWidth.tablet]: {
    display: "flex",
    flexWrap: "wrap"
  }
});

const getReasonsRenderer = (routeableProps: RouteableProps) => (
  data: MembersDataApiResponse
) => {
  if (hasMembership(data)) {
    if (data.subscription.cancelledAt) {
      return (
        <div>
          {CancellationSummary("membership")(data.subscription)}
          <ReturnToYourAccountButton />
        </div>
      );
    }
    return (
      <MembersDataApiResponseContext.Provider value={data}>
        <WizardStep routeableProps={routeableProps}>
          <div
            css={{
              backgroundColor: palette.neutral["6"],
              padding: "10px 20px",
              marginBottom: "40px"
            }}
          >
            <h4
              css={{
                textAlign: "center",
                marginBottom: "10px"
              }}
            >
              If you cancel your Membership you will miss out on:
            </h4>
            <ul className={reasonsCss}>
              <li className={cssBullet}>Access to events tickets</li>
              <li className={cssBullet}>
                Exclusive emails from our membership editor
              </li>
              <li className={cssBullet} css={{ paddingTop: "5px" }}>
                Free access to the premium tier of the Guardian app -{" "}
                <a
                  css={{ textDecoration: "underline" }}
                  href="https://www.theguardian.com/help/insideguardian/2018/may/15/introducing-live-and-discover-to-the-premium-tier-of-the-guardian-app"
                >
                  click here to find out about our brand new features
                </a>
              </li>
            </ul>
          </div>

          <PageContainerSection>
            <h3>
              Your support means we can remain independent, open to all readers
              and empowered to hold those in power to account.
            </h3>

            <p>
              Sorry to hear you are thinking of cancelling your membership.
              <br />
              Can you take a moment to tell us why?
            </p>

            <ReasonPicker
              options={routeableProps.children.props.children.map(
                childWithRouteablePropsToElement
              )}
            />
          </PageContainerSection>
        </WizardStep>
      </MembersDataApiResponseContext.Provider>
    );
  }

  return <h2>No Membership</h2>;
};

export const PaidMembershipFlow = (props: RouteableProps) => (
  <div>
    <h1
      css={{
        fontSize: "20px"
      }}
    >
      Cancel your Guardian membership
    </h1>
    <PageContainer>
      <div css={{ height: "50px" }} />
      <CheckFlowIsValid
        checkingFor="membership"
        validator={(me: MeResponse) => me.contentAccess.paidMember}
      >
        <MembershipAsyncLoader
          fetch={loadMembershipData}
          render={getReasonsRenderer(props)}
          loadingMessage="Checking the status of your current membership..."
        />
      </CheckFlowIsValid>
    </PageContainer>
  </div>
);
