import { css } from "@emotion/core";
import { breakpoints, palette, space } from "@guardian/src-foundations";
import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { maxWidth, minWidth } from "../styles/breakpoints";
import { gridBase, gridItemPlacement } from "../styles/grid";
import HelpCentreNav from "./helpCentre/helpCentreNav";

interface SectionContentProps {
  children: ReactNode;
  hasNav?: boolean;
}

const sectionCss = (
  hasNav: boolean,
  isNavSection: boolean,
  isStickyOnMobile?: boolean
) => ({
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
  },
  ...(isStickyOnMobile && {
    [maxWidth.tablet]: {
      position: "sticky",
      top: 0,
      backgroundColor: palette.neutral[100],
      zIndex: 2
    }
  })
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
  margin-bottom: ${space[24]}px;
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

// TODO: refactor this var to remove need for disabling eslint rule
export const SelectedTopicObjectContext = React.createContext<
  Dispatch<SetStateAction<string | undefined>>
>(undefined!); // eslint-disable-line @typescript-eslint/no-non-null-assertion

export const SectionContent = (props: SectionContentProps) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string | undefined>(
    undefined
  );

  return (
    <div css={containerCss}>
      <div css={divCss(props.hasNav)}>
        {props.hasNav && (
          <section css={sectionCss(props.hasNav || false, true, true)}>
            <HelpCentreNav selectedTopicId={selectedTopicId} />
          </section>
        )}
        <SelectedTopicObjectContext.Provider value={setSelectedTopicId}>
          <section css={sectionCss(props.hasNav || false, false)}>
            {props.children}
          </section>
        </SelectedTopicObjectContext.Provider>
      </div>
    </div>
  );
};
