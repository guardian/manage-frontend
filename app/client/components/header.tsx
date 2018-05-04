import React from "react";
import palette from "../colours";
import Roundel from "./roundel";


const Header = () =>
    <header
        css={{
            backgroundColor: palette.neutral.header,
            height: "100px",
            color: palette.neutral["1"]
        }}
    >
        My Account
        <Roundel size={56}/>
    </header>

export default Header