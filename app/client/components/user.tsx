import React from "react";
import { css, injectGlobal } from "../styles/emotion";
import fonts from "../styles/fonts";
import global from "../styles/global";
import AsyncLoader from "./asyncLoader";
import { Main } from "./main";
import { CardProps, default as CardDisplay } from "./card";

interface MembershipData {
  regNumber: string;
  tier: string;
  subscription: {
    start: string;
    nextPaymentDate: string;
    card: CardProps;
    plan: {
      amount: number;
      currency: string;
    };
  };
}

type MembersDataApiResponse = MembershipData | {};

function hasMembership(data: MembersDataApiResponse): data is MembershipData {
  return data.hasOwnProperty("tier");
}

class Membership extends AsyncLoader<MembersDataApiResponse> {}

const loadMembershipData: () => Promise<MembersDataApiResponse> = async () => {
  return (await fetch("api/membership", { credentials: "include" })).json();
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

const formatDate = (shortForm: string) => {
  return new Date(shortForm).toDateString();
};

const renderMembershipData = (data: MembersDataApiResponse) => {
  if (hasMembership(data)) {
    return (
      <div>
        <MembershipRow label={"Membership number"} data={data.regNumber} />
        <MembershipRow label={"Membership tier"} data={data.tier} />
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
      </div>
    );
  }
  return <h1>No Membership</h1>;
};

const User = (
  <Main>
    {injectGlobal`${global}`}
    {injectGlobal`${fonts}`}
    <Membership fetch={loadMembershipData} render={renderMembershipData} />
  </Main>
);

export default User;
