import {injectGlobal} from "emotion";
import React from "react";
import global from "../styles/global";
import {Main} from "./main";
import AsyncLoader from "./asyncLoader";
import {Table} from "./table";
import fonts from "../styles/fonts";

interface details{
  [key: string]:string
  id: string
  tier: string
}

class Membership extends AsyncLoader<details>{}

const loader:()=>Promise<details> = async ()=>{
  console.log("hello");
  const resp = await fetch("api/membership", { credentials: "include" });
  const data = await resp.json();
  // tslint:disable-next-line:no-console
  console.log(data);

   return {
      tier: data.tier,
      id: data.subscription.subscriberId
    }
};

const User = (
    <Main>
        {injectGlobal`${global}`}
        {injectGlobal`${fonts}`}
        <Membership fetch={loader} render={(data)=><Table data={data}/>} />
    </Main>
);

export default User;
