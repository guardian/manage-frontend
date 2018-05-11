import React from "react";
import { injectGlobal } from "../styles/emotion";
import fonts from "../styles/fonts";
import global from "../styles/global";
import AsyncLoader from "./asyncLoader";
import { Main } from "./main";

interface MembershipData {
  regNumber: string;
  tier: string;
}

type MembersDataApiResponse = MembershipData | {};

function hasMembership(data: MembersDataApiResponse): data is MembershipData {
  return data.hasOwnProperty("tier");
}

class Membership extends AsyncLoader<MembersDataApiResponse> {}

const loadMembershipData: () => Promise<MembersDataApiResponse> = async () => {
  return (await fetch("api/membership", { credentials: "include" })).json();
};

const renderMembershipData = (data: MembersDataApiResponse) => {
  if (hasMembership(data)) {
    return (
      <table>
        <tr>
          <th>Membership number</th>
          <td>{data.regNumber}</td>
        </tr>
        <tr>
          <th>Membership tier</th>
          <td>{data.tier}</td>
        </tr>
      </table>
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
