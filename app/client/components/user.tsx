import { injectGlobal } from "emotion";
import React from "react";
import fonts from "../styles/fonts";
import global from "../styles/global";
import AsyncLoader from "./asyncLoader";
import { Main } from "./main";
import { Table } from "./table";

interface Details {
  id: string;
  tier: string;
  [key: string]: string;
}

class Membership extends AsyncLoader<Details> {}

const loadMembershipData: () => Promise<Details> = async () => {
  const resp = await fetch("api/membership", { credentials: "include" });
  const data = await resp.json();

  return {
    tier: data.tier,
    id: data.subscription.subscriberId
  };
};

const User = (
  <Main>
    {injectGlobal`${global}`}
    {injectGlobal`${fonts}`}
    <Membership
      fetch={loadMembershipData}
      render={data => <Table data={data} />}
    />
  </Main>
);

export default User;
