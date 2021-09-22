import { css } from "@emotion/core";
import {
  breakpoints,
  neutral,
  palette,
  space
} from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import React, { useEffect, useState } from "react";
import { ProductDetail } from "../../../shared/productResponse";
import { allProductsDetailFetcher } from "../../productUtils";
import { minWidth } from "../../styles/breakpoints";
import { gridBase, gridItemPlacement } from "../../styles/grid";
import { ErrorIcon } from "../svgs/errorIcon";

interface Issue {
  date: string;
  message: string;
  link?: string;
  affectedProducts?: string[];
}

export const KnownIssues = () => {
  const [issuesData, setIssuesData] = useState<Issue[]>([]);
  useEffect(() => {
    (async () => {
      const knownIssuesResponse = await fetch("/api/known-issues/");
      const unfilteredKnownIssues: Issue[] = knownIssuesResponse.ok
        ? await knownIssuesResponse.json()
        : [];
      const unfilteredDateSortedIssues = unfilteredKnownIssues.sort(
        (a, b) => Date.parse(a.date) - Date.parse(b.date)
      );
      const responseContainsProductIssues = unfilteredKnownIssues.some(
        (issue: Issue) => !!issue.affectedProducts?.length
      );
      const globalIssues = unfilteredDateSortedIssues.filter(
        issue => !issue.affectedProducts
      );
      setIssuesData(globalIssues);

      if (responseContainsProductIssues && typeof window !== "undefined") {
        const signInStatus: string =
          window.guardian?.identityDetails?.signInStatus || "";
        if (signInStatus === "signedInRecently") {
          const productDetailsResponse = await allProductsDetailFetcher();
          const productDetails: ProductDetail[] = await productDetailsResponse.json();
          const userProductNames = productDetails.map(
            productDetail => productDetail.tier
          );

          const productIssues = unfilteredDateSortedIssues.filter(issue =>
            issue.affectedProducts?.some(product =>
              userProductNames.includes(product)
            )
          );
          setIssuesData(globalIssues.concat(productIssues));
        }
      }
    })();
  }, []);

  const containerCss = css`
    border-left: 1px solid #dcdcdc;
    border-right: 1px solid #dcdcdc;
    max-width: ${breakpoints.wide}px;
    margin: 0 auto;
    padding-top: ${space[4]}px;
    ${minWidth.tablet} {
      padding-top: ${space[5]}px;
    }
  `;

  const issuesContainerCss = css`
    padding-top: ${space[3]}px;
    ${{ ...gridBase }};
  `;

  const divCss = css`
    border: 4px solid ${palette.news[400]};
    padding: ${space[3]}px ${space[3]}px ${space[3]}px 42px;
    position: relative;
    ${{ ...gridItemPlacement(1, 4) }}

    ${minWidth.tablet} {
      ${{ ...gridItemPlacement(1, 12) }}
    }

    ${minWidth.desktop} {
      ${{ ...gridItemPlacement(3, 9) }}
    }

    ${minWidth.wide} {
      ${{ ...gridItemPlacement(3, 12) }}
    }
  `;

  const iconCss = css`
    position: absolute;
    top: ${space[4]}px;
    left: ${space[3]}px;
  `;

  const h4Css = css`
    ${textSans.medium({ fontWeight: "bold" })};
    color: ${palette.news[400]};
    margin: 0;
  `;

  const aCss = css`
    ${textSans.medium()};
    text-decoration: underline;
    color: ${neutral[0]};
  `;

  return (
    <>
      {!!issuesData.length && (
        <div css={containerCss}>
          {issuesData.map((issue, index) => (
            <div key={`issue${index}`} css={issuesContainerCss}>
              <div css={divCss}>
                <i css={iconCss}>
                  <ErrorIcon />
                </i>
                <h4 css={h4Css}>{issue.message}</h4>
                {issue.link && (
                  <a
                    css={aCss}
                    href={issue.link}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Click here for more information
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
