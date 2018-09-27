import { css } from "emotion";
import React from "react";
import palette from "../colours";
import { maxWidth, minWidth } from "../styles/breakpoints";
import { serif } from "../styles/fonts";
import AsyncLoader from "./asyncLoader";
import { Button, LinkButton } from "./buttons";
import { CancellationSummary } from "./cancel/cancellationSummary";
import { NoMembership } from "./cancel/membership/noMembership";
import { MembershipLinks } from "./membershipLinks";
import { PageContainer, PageHeaderContainer } from "./page";
import { CardDisplay } from "./payment/cardDisplay";
import { PayPalDisplay } from "./payment/paypalDisplay";
import { formatDate, Subscription, WithSubscription } from "./user";
import { RouteableProps } from "./wizardRouterAdapter";

export interface MembershipData extends WithSubscription {
  regNumber?: string;
  tier: string;
  isPaidTier: boolean;
  joinDate: string;
  alertText?: string;
}

export type MembersDataApiResponse = MembershipData | {};

export function hasMembership(
  data: MembersDataApiResponse
): data is MembershipData {
  return data.hasOwnProperty("tier");
}

export class MembershipAsyncLoader extends AsyncLoader<
  MembersDataApiResponse
> {}

export const loadMembershipData: () => Promise<Response> = async () =>
  await fetch("/api/me/membership", {
    credentials: "include",
    mode: "same-origin"
  });

interface MembershipRowProps {
  label: string;
  data: string | React.ReactNode;
}

const membershipRowStyles = css({
  textAlign: "left",
  marginBottom: "25px",
  alignItems: "center",

  [minWidth.phablet]: {
    display: "flex"
  }
});

export const wrappingContainerCSS = {
  [minWidth.mobileLandscape]: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap"
  }
};

const MembershipRow = (props: MembershipRowProps) => {
  return (
    <div className={membershipRowStyles}>
      <div
        css={{
          flexBasis: "320px",
          [minWidth.phablet]: {
            flexShrink: "0"
          }
        }}
      >
        <p
          css={{
            fontSize: "18px",
            margin: "5px 0",
            fontWeight: "bold"
          }}
        >
          {props.label}
        </p>
      </div>
      <div>{props.data}</div>
    </div>
  );
};

const getPaymentMethodRow = (subscription: Subscription) => {
  if (subscription.card) {
    return (
      <MembershipRow
        label={"Card details"}
        data={
          <div css={wrappingContainerCSS}>
            <div css={{ marginRight: "15px", minWidth: "190px" }}>
              <CardDisplay margin="0" {...subscription.card} />
            </div>
            <div
              css={{
                [maxWidth.desktop]: {
                  margin: "10px 0"
                }
              }}
            >
              <LinkButton
                text="Update Payment Details"
                to="/payment/membership"
              />
            </div>
          </div>
        }
      />
    );
  } else if (subscription.payPalEmail) {
    return (
      <MembershipRow
        label={"Payment method"}
        data={<PayPalDisplay payPalEmail={subscription.payPalEmail} />}
      />
    );
  }
  // TODO send no payment method event via 'trackEvent'
  return undefined;
};

const getPaymentPart = (data: MembershipData) => {
  if (data.isPaidTier) {
    return (
      <>
        <MembershipRow
          label={"Next payment date"}
          data={formatDate(data.subscription.nextPaymentDate)}
        />
        <MembershipRow
          label={
            data.subscription.plan.interval.charAt(0).toUpperCase() +
            data.subscription.plan.interval.substr(1) +
            "ly payment"
          }
          data={
            data.subscription.plan.currency +
            (data.subscription.nextPaymentPrice / 100.0).toFixed(2)
          }
        />
        {getPaymentMethodRow(data.subscription)}
      </>
    );
  } else {
    return <MembershipRow label={"Annual payment"} data={"FREE"} />;
  }
};

const membershipCancelled = (cancelType: string, subscription: Subscription) =>
  CancellationSummary(cancelType)(subscription);

const renderMembershipData = (apiResponse: MembersDataApiResponse) => {
  if (hasMembership(apiResponse)) {
    const data: MembershipData = apiResponse;
    if (data.subscription.cancelledAt) {
      return membershipCancelled("membership", data.subscription);
    }
    return (
      <div>
        {data.alertText ? (
          <div
            css={{
              backgroundColor: palette.blue.dark,
              color: palette.white,
              padding: "10px 15px 15px",
              marginTop: "30px",
              marginBottom: "30px"
            }}
          >
            <PageContainer noVerticalMargin>
              <h2 css={{ fontWeight: "bold", margin: "0" }}>Action required</h2>
              <p
                id="mma-alert-text"
                css={{
                  br: {
                    display: "none",
                    [minWidth.tablet]: {
                      display: "inline"
                    }
                  }
                }}
              >
                {data.alertText.replace(
                  "Please check that the card details shown are up to date.",
                  ""
                )}
                <br />
                Please check that the card details shown are up to date.
              </p>
              <LinkButton
                text="Update Payment Details"
                to="/payment/membership"
                primary
                right
              />
            </PageContainer>
          </div>
        ) : (
          undefined
        )}
        <PageContainer>
          {data.regNumber ? (
            <MembershipRow label={"Membership number"} data={data.regNumber} />
          ) : (
            undefined
          )}
          <MembershipRow
            label={"Membership tier"}
            data={
              <div css={wrappingContainerCSS}>
                <div css={{ marginRight: "15px" }}>{data.tier}</div>
                <a
                  href={
                    "https://membership." +
                    window.guardian.domain +
                    "/tier/change"
                  }
                >
                  <Button text="Change tier" />
                </a>
              </div>
            }
          />
          <MembershipRow
            label={"Start date"}
            data={formatDate(data.subscription.start || data.joinDate)}
          />
          {getPaymentPart(data)}
        </PageContainer>
      </div>
    );
  }
  return (
    <PageContainer>
      <NoMembership />
    </PageContainer>
  );
};

const headerCss = css({
  fontSize: "2rem",
  lineHeight: "2.25rem",
  fontFamily: serif,
  marginBottom: "30px"
});

export const Membership = (props: RouteableProps) => (
  <>
    <PageHeaderContainer>
      <h1 className={headerCss}>Membership</h1>
    </PageHeaderContainer>
    <MembershipAsyncLoader
      fetch={loadMembershipData}
      render={renderMembershipData}
      loadingMessage="Loading your membership details..."
    />
    <PageContainer>
      <MembershipLinks />
    </PageContainer>
  </>
);
