import { css } from "emotion";
import React from "react";
import palette from "../colours";
import { minWidth } from "../styles/breakpoints";
import { serif } from "../styles/fonts";
import AsyncLoader from "./asyncLoader";
import { Button, LinkButton } from "./buttons";
import { CancellationSummary } from "./cancel/cancellationSummary";
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
  verticalAlign: "top",

  [minWidth.phablet]: {
    display: "flex"
  }
});

export const spaceBetweenCSS = {
  [minWidth.mobileLandscape]: {
    display: "flex",
    alignItems: "top",
    justifyContent: "space-between"
  }
};

const MembershipRow = (props: MembershipRowProps) => {
  return (
    <div className={membershipRowStyles}>
      <div
        css={{
          flexBasis: "320px"
        }}
      >
        <p
          css={{
            fontSize: "18px",
            margin: "0 0 5px 0",
            fontWeight: "bold"
          }}
        >
          {props.label}
        </p>
      </div>
      <div
        css={{
          [minWidth.phablet]: {
            width: "460px"
          }
        }}
      >
        {props.data}
      </div>
    </div>
  );
};

const getPaymentMethodRow = (subscription: Subscription) => {
  if (subscription.card) {
    return (
      <MembershipRow
        label={"Card details"}
        data={
          <div css={spaceBetweenCSS}>
            <div css={{ marginRight: "15px" }}>
              <CardDisplay margin="0" {...subscription.card} />
            </div>
            <LinkButton
              text="Update Payment Details"
              textColor={palette.white}
              color={palette.neutral["1"]}
              to="/payment/membership"
            />
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
          label={"Annual payment"}
          data={
            data.subscription.plan.currency +
            (data.subscription.plan.amount / 100.0).toFixed(2)
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
        {data.regNumber ? (
          <MembershipRow label={"Membership number"} data={data.regNumber} />
        ) : (
          undefined
        )}
        <MembershipRow
          label={"Membership tier"}
          data={
            <div css={spaceBetweenCSS}>
              <span css={{ marginRight: "15px" }}>{data.tier}</span>
              <a
                href={
                  "https://membership." +
                  window.guardian.domain +
                  "/tier/change"
                }
              >
                <Button
                  text="Change tier"
                  textColor={palette.white}
                  color={palette.neutral["1"]}
                />
              </a>
            </div>
          }
        />
        <MembershipRow
          label={"Start date"}
          data={formatDate(data.subscription.start || data.joinDate)}
        />
        {getPaymentPart(data)}
      </div>
    );
  }
  return <h2>No Membership</h2>;
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
    <PageContainer>
      <MembershipAsyncLoader
        fetch={loadMembershipData}
        render={renderMembershipData}
        loadingMessage="Loading your membership details..."
      />
      <MembershipLinks />
    </PageContainer>
  </>
);
