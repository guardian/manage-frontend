import { css } from "@emotion/core";
import { breakpoints, palette, space } from "@guardian/src-foundations";
import React, { ReactNode } from "react";
import { maxWidth, minWidth } from "../styles/breakpoints";
import { gridBase, gridItemPlacement } from "../styles/grid";
import { HelpCentreNavConfig } from "./helpCentre/helpCentreConfig";
import HelpCentreNav from "./helpCentre/helpCentreNav";

interface SectionContentProps {
  children: ReactNode;
  hasNav?: boolean;
  selectedTopicObject?: HelpCentreNavConfig;
}

const sectionCss = (hasNav: boolean, isNavSection: boolean) => ({
  ...gridItemPlacement(1, 4),
  ...(isNavSection && { marginRight: "-13px", marginLeft: "-13px" }),

  [minWidth.tablet]: {
    ...gridItemPlacement(1, 12),
    ...(isNavSection && { marginRight: "-21px", marginLeft: "-21px" })
  },

  [minWidth.desktop]: {
    ...(isNavSection
      ? gridItemPlacement(1, 3)
      : hasNav
      ? gridItemPlacement(5, 11)
      : gridItemPlacement(3, 9)),
    ...(isNavSection && { marginRight: "-21px", marginLeft: "-21px" })
  },

  [minWidth.wide]: {
    ...(isNavSection
      ? gridItemPlacement(1, 3)
      : hasNav
      ? gridItemPlacement(5, 9)
      : gridItemPlacement(3, 12))
  }
});

const containerCss = css`
  max-width: ${breakpoints.wide}px;
  margin: 0 auto;
  padding-top: ${space[12]}px;
  border-left: 1px solid ${palette.neutral[86]};
  border-right: 1px solid ${palette.neutral[86]};
  height: 100%;
  ${maxWidth.desktop} {
    padding-top: 0;
  }
`;

const divCss = (hasNav: boolean | undefined) => css`
  ${{ ...gridBase }};
  padding-bottom: 1rem;
  ${minWidth.desktop} {
    ${{ ...(gridBase[minWidth.desktop] as object) }};
    padding-bottom: 0;
    border-top: ${hasNav ? "none" : `1px solid ${palette.neutral[86]}`};
  }
  ${minWidth.wide} {
    ${{ ...(gridBase[minWidth.wide] as object) }}
  }
`;

export const SectionContent = (props: SectionContentProps) => {
  return (
    <div css={containerCss}>
      <div css={divCss(props.hasNav)}>
        {props.hasNav && (
          <section css={sectionCss(props.hasNav || false, true)}>
            <HelpCentreNav selectedTopicObject={props.selectedTopicObject} />
          </section>
        )}
        <section css={sectionCss(props.hasNav || false, false)}>
          {props.children}
        </section>
      </div>
    </div>
  );
};
