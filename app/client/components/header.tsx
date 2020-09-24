import { breakpoints, palette } from "@guardian/src-foundations";
import { Link } from "@reach/router";
import React from "react";
import { minWidth } from "../styles/breakpoints";
import { gridBase, gridColumns, gridItemPlacement } from "../styles/grid";
import { DropdownNav } from "./nav/dropdownNav";
import { GridRoundel } from "./svgs/gridRoundel";

interface HeaderProps {
  isSignedOut?: boolean;
}

const Header = (props: HeaderProps) => {
  return (
    <header
      css={{
        backgroundColor: palette.brand[400],
        minHeight: "50px",
        overflow: "visible",
        position: "relative",
        boxShadow: `0 2px 1px -1px ${palette.brand[600]}`,
        zIndex: 1070,
        [minWidth.desktop]: {
          minHeight: "82px"
        }
      }}
    >
      <div
        css={{
          ...gridBase,
          height: "100%",
          maxWidth: `calc(${breakpoints.wide}px + 2.5rem)`,
          alignItems: "center",
          margin: "auto"
        }}
      >
        {!props.isSignedOut ? (
          <>
            <h1
              css={{
                fontSize: "1.75rem",
                fontWeight: "bold",
                color: palette.neutral["100"],
                display: "none",
                [minWidth.desktop]: {
                  display: "block",
                  ...gridItemPlacement(1, 8)
                }
              }}
            >
              <Link
                to={"/"}
                css={{
                  textDecoration: "none",
                  color: palette.neutral["100"],
                  ":visited": { color: "inherit" }
                }}
              >
                My account
              </Link>
            </h1>
            <DropdownNav />
          </>
        ) : (
          <Link
            to={"/"}
            css={{
              textDecoration: "none",
              color: palette.neutral["100"],
              ...gridItemPlacement(1, 2),
              whiteSpace: "nowrap",
              margin: "auto 0",
              [minWidth.desktop]: {
                position: "relative",
                left: "0.5rem",
                ...gridItemPlacement(-4, 2, gridColumns.tabletAndDesktop),
                marginLeft: "auto"
              },
              [minWidth.wide]: {
                ...gridItemPlacement(-4, 2, gridColumns.wide)
              }
            }}
          >
            Sign in
          </Link>
        )}
        <GridRoundel
          fillMain={palette.neutral["100"]}
          fillG={palette.brand[400]}
        />
      </div>
    </header>
  );
};

export default Header;
