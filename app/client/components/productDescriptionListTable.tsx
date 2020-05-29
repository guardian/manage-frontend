import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import React, { ReactElement } from "react";
import { minWidth } from "../styles/breakpoints";

export interface ProductDescriptionListKeyValue {
  title: string;
  value?: string | number | ReactElement | HTMLElement;
  spanTwoCols?: boolean;
}

interface ProductDescriptionListTable {
  borderColour?: string;
  alternateRowBgColors?: true;
  seperateEachRow?: true;
  content: ProductDescriptionListKeyValue[];
}

export const ProductDescriptionListTable = (
  props: ProductDescriptionListTable
) => {
  const tableEntryTitleCss = (isTwoColWidth: boolean) => {
    return css`
      display: inline-block;
      vertical-align: top;
      width: ${isTwoColWidth ? "100" : "60"}%;
      padding-right: ${space[3]}px;
      margin: ${isTwoColWidth ? `0 0 ${space[3]}px` : "0"};
      ${textSans.medium({ fontWeight: "bold" })}
      ${minWidth.tablet} {
        padding-right: ${space[5]}px;
        width: 16ch;
        margin: 0;
      }
    `;
  };

  const tableValueCss = (isTwoColWidth: boolean) => {
    return css`
      display: inline-block;
      vertical-align: top;
      margin: 0;
      width: ${isTwoColWidth ? "100" : "40"}%;
      ${minWidth.tablet} {
        width: auto;
      }
    `;
  };

  const filteredContent = props.content.filter(
    tableEntry => !!tableEntry.value
  );

  interface ContentRowMapEntry {
    row: number;
    isFirstCollum: boolean;
  }

  const contentRowMap = new Map<number, ContentRowMapEntry>();
  filteredContent.map((tableEntry, tableEntryIndex) => {
    const previousContentRowMapEntry = contentRowMap.get(tableEntryIndex - 1);

    if (!previousContentRowMapEntry) {
      contentRowMap.set(tableEntryIndex, {
        row: tableEntryIndex,
        isFirstCollum: true
      });
    } else {
      const previousTableEntry = filteredContent[tableEntryIndex - 1];
      const contentRowMapEntryTwoBack = contentRowMap.get(tableEntryIndex - 2);
      const currentRow =
        previousTableEntry.spanTwoCols ||
        (contentRowMapEntryTwoBack &&
          previousContentRowMapEntry.row === contentRowMapEntryTwoBack.row)
          ? previousContentRowMapEntry.row + 1
          : previousContentRowMapEntry.row;
      contentRowMap.set(tableEntryIndex, {
        row: currentRow,
        isFirstCollum:
          previousTableEntry.spanTwoCols ||
          previousContentRowMapEntry.row !== currentRow
      });
    }
  });

  return (
    <div
      css={css`
        ${textSans.medium()};
        border: 1px solid ${props.borderColour || palette.neutral[20]};
        display: flex;
        flex-wrap: wrap;
        margin ${space[5]}px 0; 
      `}
    >
      {filteredContent.map((tableEntry, tableEntryIndex) => {
        const isFirstTableRow = tableEntryIndex < 2;
        const isLastTableRow =
          tableEntryIndex === props.content.length - 1 ||
          (props.content.length % 2 === 0 &&
            !tableEntry.spanTwoCols &&
            tableEntryIndex === props.content.length - 2);
        const { row: currentRow, isFirstCollum } = contentRowMap.get(
          tableEntryIndex
        ) as ContentRowMapEntry;

        return (
          <dl
            key={tableEntryIndex}
            css={css`
              display: ${tableEntry.spanTwoCols ? "block" : "inline-flex"};
              width: 100%;
              padding: ${isFirstCollum ? space[3] : space[3] * 0.5}px ${
              space[3]
            }px ${
              tableEntry.spanTwoCols || !isFirstCollum
                ? space[3]
                : space[3] * 0.5
            }px;
              margin: 0;
              background-color: ${
                props.alternateRowBgColors && currentRow % 2 === 0
                  ? palette.neutral[97]
                  : "transparent"
              };
              border-top: ${
                !isFirstTableRow && isFirstCollum
                  ? `1px solid ${props.borderColour || palette.neutral[20]};`
                  : "none;"
              }
              ${minWidth.tablet} {
                border-top: ${
                  !isFirstTableRow
                    ? `1px solid ${props.borderColour || palette.neutral[20]};`
                    : "none;"
                }
                width: ${tableEntry.spanTwoCols ? "100%;" : "50%;"};
                padding: ${
                  isFirstTableRow
                    ? space[5]
                    : props.alternateRowBgColors
                    ? space[5]
                    : space[5] * 0.5
                }px
                ${space[5]}px
                ${
                  isLastTableRow
                    ? space[5]
                    : props.alternateRowBgColors
                    ? space[5]
                    : space[5] * 0.5
                }px;
              }
            `}
          >
            <dt css={tableEntryTitleCss(!!tableEntry.spanTwoCols)}>
              {tableEntry.title}
            </dt>
            <dd css={tableValueCss(!!tableEntry.spanTwoCols)}>
              {tableEntry.value}
            </dd>
          </dl>
        );
      })}
    </div>
  );
};
