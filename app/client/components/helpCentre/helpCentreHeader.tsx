import { css } from "@emotion/core";
import { breakpoints, palette, space } from "@guardian/src-foundations";
import { Link } from "@reach/router";
import React from "react";
import { minWidth } from "../../styles/breakpoints";
import { DropdownNav } from ".././nav/dropdownNav";
import { TheGuardianLogo } from ".././svgs/theGuardianLogo";
import { HeaderStatus } from "../header";

interface HelpCentreHeaderProps {
  headerStatus: HeaderStatus;
  pageRequiresSignin: boolean;
}

const HelpCentreHeader = (props: HelpCentreHeaderProps) => {
  const headerCss = css`
    background-color: ${palette.brand[400]};
    min-height: 50px;
    overflow: visible;
    position: relative;
    box-shadow: 0 2px 1px -1px ${palette.brand[600]};
    z-index: 1070;
    ${minWidth.desktop} {
      min-height: 82px;
    }
  `;

  const containerCss = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    max-width: calc(${breakpoints.wide}px + 2.5rem);
    margin: auto;
    padding: 0px ${space[5]}px;
  `;

  const h1Css = css`
    font-size: 1.75rem;
    font-weight: bold;
    color: ${palette.neutral["100"]};
    display: none;
    ${minWidth.desktop} {
      display: block;
    }
  `;

  const linkCss = css`
    text-decoration: none;
    color: ${palette.neutral["100"]};
    &:visited {
      color: inherit;
    }
  `;

  const divCss = css`
    margin: ${space[3]}px;
    align-self: flex-start;
  `;

  const aCss = css`
    text-decoration: none;
    color: ${palette.neutral["100"]};
    white-space: nowrap;
    margin: auto 0;
    ${minWidth.desktop} {
      position: relative;
      left: 0.5rem;
      margin-left: auto;
    }
  `;

  return (
    <header css={headerCss}>
      <div css={containerCss}>
        {props.headerStatus === "signedIn" && (
          <div css={divCss}>
            {props.pageRequiresSignin && (
              <h1 css={h1Css}>
                <Link to={"/"} css={linkCss}>
                  My account
                </Link>
              </h1>
            )}

            <DropdownNav />
          </div>
        )}
        {props.headerStatus === "signedOut" && (
          <a href={"/"} css={aCss}>
            Sign in
          </a>
        )}
        <TheGuardianLogo fill={palette.neutral["100"]} />
      </div>
    </header>
  );
};

export default HelpCentreHeader;
