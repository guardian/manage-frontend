import { injectGlobal } from "emotion";
import React from "react";
import global from "../styles/global";
import AsyncLoader from "./asyncLoader";
import { Main } from "./main";
import { Table } from "./table";

interface Details {
  id: string;
  tier: string;
  // tslint:disable-next-line:no-mixed-interface
  [key: string]: string; // remove when we remove general table generator.
}

class Membership extends AsyncLoader<Details> {}

const loader: () => Promise<Details> = async () => {
  const resp = await fetch("api/membership", { credentials: "include" });
  const data = await resp.json();
  // tslint:disable-next-line:no-console
  console.log(data);

  return {
    tier: data.tier,
    id: data.subscription.subscriberId
  };
};

const User = (
  <Main>
    {injectGlobal`${global}`}
    <Membership fetch={loader} render={data => <Table data={data} />} />
  </Main>
);

export default User;
