import { breakpoints, palette, space } from "@guardian/src-foundations";
import React, { ReactNode } from "react";
import { maxWidth, minWidth } from "../styles/breakpoints";
import { gridBase, gridItemPlacement } from "../styles/grid";
import { HelpCentreNavConfig } from "./helpCentre/helpCentreConfig";
import HelpCentreNav from "./helpCentre/helpCentreNav";

interface SectionPageContainerProps {
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

export const SectionPageContainer = (props: SectionPageContainerProps) => {
  return (
    <div
      css={{
        maxWidth: `${breakpoints.wide}px`,
        margin: "0 auto",
        paddingTop: `${space[12]}px`,
        borderLeft: `1px solid ${palette.neutral[86]}`,
        borderRight: `1px solid ${palette.neutral[86]}`,
        height: "100%",
        [maxWidth.desktop]: {
          paddingTop: 0
        }
      }}
    >
      <div
        css={{
          ...gridBase,
          paddingBottom: "1rem",
          [minWidth.desktop]: {
            ...(gridBase[minWidth.desktop] as object),
            paddingBottom: 0,
            borderTop: `${
              props.hasNav ? "none" : `1px solid ${palette.neutral[86]}`
            }`
          },
          [minWidth.wide]: {
            ...(gridBase[minWidth.wide] as object)
          }
        }}
      >
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
