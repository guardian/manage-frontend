import { css } from "emotion";
import React from "react";
import palette from "../colours";
import AsyncLoader from "./asyncLoader";
import { LinkButton } from "./buttons";
import { CardDisplay } from "./card";
import { formatDate, WithSubscription } from "./user";
import { RouteableProps } from "./wizardRouterAdapter";

export interface MembershipData extends WithSubscription {
  regNumber?: string;
  tier: string;
  isPaidTier: boolean;
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

export const loadMembershipData: () => Promise<
  MembersDataApiResponse
> = async () => {
  return (await fetch("/api/me/membership", { credentials: "include" })).json();
};

interface MembershipRowProps {
  label: string;
  data: string | React.ReactNode;
}

const MembershipRow = (props: MembershipRowProps) => {
  return (
    <div
      className={css({
        textAlign: "left",
        height: "48px",
        marginBottom: "12px"
      })}
    >
      <div
        className={css({
          display: "table-cell",
          width: "320px",
          paddingRight: "100px",
          verticalAlign: "top"
        })}
      >
        <h2
          className={css({
            fontSize: "18px"
          })}
        >
          {props.label}
        </h2>
      </div>
      <div
        className={css({
          display: "table-cell"
        })}
      >
        {props.data}
      </div>
    </div>
  );
};

const renderMembershipData = (data: MembersDataApiResponse) => {
  if (hasMembership(data)) {
    let paymentPart;
    if (data.subscription.cancelledAt) {
      paymentPart = (
        <React.Fragment>
          <MembershipRow label={"Membership Status"} data={"Cancelled"} />
          <MembershipRow
            label={"Effective end date"}
            data={formatDate(data.subscription.end)}
          />
        </React.Fragment>
      );
    } else if (data.isPaidTier && data.subscription.card) {
      paymentPart = (
        <React.Fragment>
          <MembershipRow
            label={"Start date"}
            data={formatDate(data.subscription.start)}
          />
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
          <MembershipRow
            label={"Card details"}
            data={
              <CardDisplay
                last4={data.subscription.card.last4}
                type={data.subscription.card.type}
              />
            }
          />
        </React.Fragment>
      );
    } else {
      paymentPart = <MembershipRow label={"Annual payment"} data={"FREE"} />;
    }

    return (
      <div
        className={css({
          padding: "25px"
        })}
      >
        <MembershipRow label={"Membership number"} data={data.regNumber} />
        <MembershipRow
          label={"Membership tier"}
          data={
            <React.Fragment>
              <span css={{ marginRight: "15px" }}>{data.tier}</span>
              <LinkButton
                to="/cancel/membership"
                text="Cancel Membership"
                textColor={palette.white}
                color={palette.neutral["1"]}
              />
            </React.Fragment>
          }
        />
        {paymentPart}
      </div>
    );
  }
  return <h2>No Membership</h2>;
};

export const Membership = (props: RouteableProps) => (
  <div>
    <h1>Membership</h1>
    <MembershipAsyncLoader
      fetch={loadMembershipData}
      render={renderMembershipData}
    />
  </div>
);
