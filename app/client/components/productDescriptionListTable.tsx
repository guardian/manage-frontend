import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import React, { ReactElement } from "react";
import { minWidth } from "../styles/breakpoints";

export interface ProductDescriptionListKeyValue {
  title: string;
  value?: string | number | ReactElement | HTMLElement;
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
  const dlCss: string = `
    ${textSans.medium()};
    border: 1px solid ${props.borderColour || palette.neutral[20]};
    ${minWidth.tablet} {
      display: table;
    }
  `;

  const newDlRow = (
    rowIndex: number,
    isFirstRow: boolean,
    isLastRow: boolean
  ) => `
    ${
      (props.alternateRowBgColors || props.seperateEachRow) &&
      rowIndex % 2 === 0
        ? `
        ${
          props.alternateRowBgColors
            ? `background-color: ${palette.neutral[97]};`
            : ""
        }
      ${
        !isFirstRow
          ? `
        dt:first-of-type, 
        dd:first-of-type {
          border-top: 1px solid ${palette.neutral[20]};
        }
        ${minWidth.tablet} {
          dt, dd {
            border-top: 1px solid ${palette.neutral[20]};
          }
        }
      `
          : ""
      }
      ${
        !isLastRow
          ? `
        dt:last-of-type, 
        dd:last-of-type {
          border-bottom: 1px solid ${palette.neutral[20]};
        }
        ${minWidth.tablet} {
          dt, dd {
            border-bottom: 1px solid ${palette.neutral[20]};
          }
        }
      `
          : ""
      }
    `
        : ""
    }
    ${minWidth.tablet} {
      display: table-row;
    }
  `;

  const dtCss = (
    isFirstRow: boolean,
    isLastRow: boolean,
    isFirstOption: boolean,
    isLastOption: boolean
  ) => {
    return `
    display: inline-block;
    vertical-align: top;
    min-width: 15ch;
    font-weight: bold;
    width:1%;
    white-space:nowrap;
    margin: 0;
    

    padding: ${isFirstOption ? `${space[3]}px` : `${space[3] * 0.5}px`} 0 ${
      isLastOption ? `${space[3]}px` : `${space[3] * 0.5}px`
    } ${space[3]}px;
    ${minWidth.tablet} {
      display: table-cell;
      margin-right: 2ch;
      min-width: 14ch;
      margin-top: 0;
      padding: ${space[5]}px 2ch ${space[5]}px ${space[5]}px;
    }
  `;
  };

  const ddCss = (
    isFirstRow: boolean,
    isLastRow: boolean,
    isFirstOption: boolean,
    isLastOption: boolean
  ) => `
    display: inline-block;
    vertical-align: top;
    width: calc(100% - (15ch + 4px));
    margin: 0;

    padding: ${isFirstOption ? `${space[3]}px` : `${space[3] * 0.5}px`} ${
    space[3]
  }px ${isLastOption ? `${space[3]}px` : `${space[3] * 0.5}px`} 0;
    ${minWidth.tablet} {
      width: auto;
      display: table-cell;
      padding: ${space[5]}px ${space[3]}px ${space[5]}px 0;
    }
  `;

  const rowPairs = props.content.reduce(
    (result: ProductDescriptionListKeyValue[][], value, index, array) => {
      if (index % 2 === 0) {
        result.push(array.slice(index, index + 2));
      }
      return result;
    },
    []
  );

  return (
    <dl
      css={css`
        ${dlCss}
      `}
    >
      {rowPairs.map((tableRow, rowIndex) => (
        <div
          css={css`
            ${newDlRow(
              rowIndex,
              rowIndex === 0,
              rowIndex === rowPairs.length - 1
            )}
          `}
          key={`productdlrow-${rowIndex}`}
        >
          {tableRow.map((productTableKeyValue, productIndex) => {
            return productTableKeyValue.value ? (
              <React.Fragment key={`productpart-${productIndex}`}>
                <dt
                  css={css`
                    ${dtCss(
                      rowIndex === 0,
                      rowIndex === rowPairs.length - 1,
                      rowIndex === 0 && productIndex === 0,
                      rowIndex === rowPairs.length - 1 &&
                        productIndex === tableRow.length - 1
                    )}
                  `}
                >
                  {productTableKeyValue.title}
                </dt>
                <dd
                  css={css`
                    ${ddCss(
                      rowIndex === 0,
                      rowIndex === rowPairs.length - 1,
                      rowIndex === 0 && productIndex === 0,
                      rowIndex === rowPairs.length - 1 &&
                        productIndex === tableRow.length - 1
                    )}
                  `}
                >
                  {productTableKeyValue.value}
                </dd>
              </React.Fragment>
            ) : (
              <React.Fragment key={`emptyproductpart-${productIndex}`} />
            );
          })}
        </div>
      ))}
    </dl>
  );
};
