import { css } from "@emotion/core";
import { breakpoints, palette, space } from "@guardian/src-foundations";
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

  return (
    <>
      {issuesData.map((issue, index) => (
        <div
          key={`issue${index}`}
          css={{
            maxWidth: `${breakpoints.wide}px`,
            margin: "0 auto",
            borderLeft: `1px solid ${palette.neutral[86]}`,
            borderRight: `1px solid ${palette.neutral[86]}`,
            paddingTop: `${space[3]}px`,
            ...gridBase
          }}
        >
          <div
            css={{
              border: `4px solid ${palette.news[400]}`,
              padding: `${space[3]}px ${space[3]}px ${space[3]}px 42px`,
              position: "relative",
              ...gridItemPlacement(1, 4),

              [minWidth.tablet]: {
                ...gridItemPlacement(1, 12)
              },

              [minWidth.desktop]: {
                ...gridItemPlacement(4, 9)
              },

              [minWidth.wide]: {
                ...gridItemPlacement(4, 12)
              }
            }}
          >
            <i
              css={css`
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: ${space[3]}px;
              `}
            >
              <ErrorIcon />
            </i>
            <h4
              css={css`
                ${textSans.medium({ fontWeight: "bold" })};
                color: ${palette.news[400]};
                margin: 0;
              `}
            >
              {issue.message}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
};
