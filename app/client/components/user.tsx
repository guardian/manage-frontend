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

const loadMembershipData:()=>Promise<details> = async ()=>{
    const resp = await fetch("api/membership", { credentials: "include" });
    const data = await resp.json();

    return {
        tier: data.tier,
        id: data.subscription.subscriberId
    }
};

const User = (
    <Main>
        {injectGlobal`${global}`}
        {injectGlobal`${fonts}`}
        <Membership fetch={loadMembershipData} render={(data)=><Table data={data}/>} />
    </Main>
);

export default User;
