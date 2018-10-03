import React, { ChangeEvent, ReactNode } from "react";
import { css } from "react-emotion";
import {
  MembersDataApiResponseContext,
  MembersDatApiAsyncLoader
} from "../../../../shared/meProductResponse";
import {
  hasProduct,
  MembersDataApiResponse
} from "../../../../shared/meProductResponse";
import { ProductTypes } from "../../../../shared/productTypes";
import palette from "../../../colours";
import { minWidth } from "../../../styles/breakpoints";
import { trackEvent } from "../../analytics";
import { LinkButton } from "../../buttons";
import { GoogleOptimiseAwaitFlagWrapper } from "../../GoogleOptimiseAwaitFlagWrapper";
import { NoMembership } from "../../noMembership";
import { PageContainer, PageContainerSection } from "../../page";
import {
  MultiRouteableProps,
  ReturnToYourAccountButton,
  RouteableStepProps,
  WizardStep
} from "../../wizardRouterAdapter";
import { CheckFlowIsValid } from "../cancellationFlowWrapper";
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
      <>
        <select
          value={this.state.reasonPath}
          onChange={this.handleChange}
          css={{
            ...cssInheritFont,
            width: "100%",
            height: "32px",
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
            text="Continue"
            to={this.state.reasonPath}
            disabled={!this.state.reasonPath}
          />
        </div>
      </>
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

const cssBullet = (flexBasis: string = "50%") => css`
  flex-basis: ${flexBasis};
  flex-grow: 1;
  list-style: none;
  list-style-position: inside;
  text-indent: -0.6em;
  padding-left: 20px;
  &::before {
    display: inline-block;
    content: "●";
    margin-right: 0.6em;
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

const clickHereToFindOutMoreAboutOurNewFeatures = (
  <a
    css={{
      textDecoration: "underline",
      color: palette.blue.dark,
      ":visited": { color: palette.blue.dark }
    }}
    href="https://www.theguardian.com/help/insideguardian/2018/may/15/introducing-live-and-discover-to-the-premium-tier-of-the-guardian-app"
    onClick={() => {
      trackEvent({
        eventCategory: "href",
        eventAction: "premium_features"
      });
    }}
  >
    click here to find out about our brand new features
  </a>
);

const getReasonsRenderer = (routeableStepProps: RouteableStepProps) => (
  data: MembersDataApiResponse
) => {
  if (hasProduct(data)) {
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
        <WizardStep routeableStepProps={routeableStepProps}>
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
                marginTop: "0",
                marginBottom: "10px"
              }}
            >
              If you cancel your Membership you will miss out on:
            </h4>
            <GoogleOptimiseAwaitFlagWrapper experimentFlagName="alternateMembershipBenefits">
              {{
                flagIsSet: (
                  <ul className={reasonsCss}>
                    <li className={cssBullet("100%")}>
                      Exclusive emails from our membership editor
                    </li>
                    <li
                      className={cssBullet("100%")}
                      css={{ paddingTop: "5px" }}
                    >
                      Free access to the ad-free premium tier of the Guardian
                      app, now featuring ‘Live’ & ‘Discover’ - two new ways to
                      experience the Guardian, set to the pace of your day.
                      <ul>
                        <li css={{ display: "list-item" }}>
                          Live: Access to every breaking news story and update,
                          in real time
                        </li>
                        <li>
                          Discover: Explore great stories you may have missed,
                          when you have more time
                        </li>
                      </ul>
                    </li>
                    <div
                      css={{
                        textAlign: "center",
                        width: "100%",
                        margin: "10px"
                      }}
                    >
                      {clickHereToFindOutMoreAboutOurNewFeatures}
                    </div>
                  </ul>
                ),
                flagIsNotSet: (
                  <ul className={reasonsCss}>
                    <li className={cssBullet()}>Access to events tickets</li>
                    <li className={cssBullet()}>
                      Exclusive emails from our membership editor
                    </li>
                    <li className={cssBullet()} css={{ paddingTop: "5px" }}>
                      Free access to the premium tier of the Guardian app -{" "}
                      {clickHereToFindOutMoreAboutOurNewFeatures}
                    </li>
                  </ul>
                )
              }}
            </GoogleOptimiseAwaitFlagWrapper>
          </div>

          <PageContainerSection>
            <p
              css={{
                fontSize: "1rem",
                fontWeight: "500"
              }}
            >
              Your support means we can remain independent, open to all readers
              and empowered to hold those in power to account.
            </p>

            <p>
              Sorry to hear you are thinking of cancelling your membership.
              <br />
              Can you take a moment to tell us why?
            </p>

            <ReasonPicker
              options={routeableStepProps.children.props.children.map(
                childWithRouteablePropsToElement
              )}
            />
          </PageContainerSection>
        </WizardStep>
      </MembersDataApiResponseContext.Provider>
    );
  }

  return (
    <>
      <NoMembership />
      <ReturnToYourAccountButton />
    </>
  );
};

export const MembershipCancellationFlow = (props: RouteableStepProps) => (
  <div>
    <PageContainer>
      <h1 css={{ fontSize: "20px" }}>Cancel your Guardian membership</h1>
      <CheckFlowIsValid
        {
          ...ProductTypes.membership /*TODO use for the whole flow*/
        }
      >
        <MembersDatApiAsyncLoader
          fetch={ProductTypes.membership.fetchProductDetail}
          render={getReasonsRenderer(props)}
          loadingMessage="Checking the status of your current membership..."
        />
      </CheckFlowIsValid>
    </PageContainer>
  </div>
);
