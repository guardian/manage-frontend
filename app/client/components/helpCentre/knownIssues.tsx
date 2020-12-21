import { css } from "@emotion/core";
import { breakpoints, palette, space } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import React, { useEffect, useState } from "react";
import { ProductDetail } from "../../../shared/productResponse";
import { allProductsDetailFetcher } from "../../../shared/productTypes";
import { minWidth } from "../../styles/breakpoints";
import { gridBase, gridItemPlacement } from "../../styles/grid";
import { ErrorIcon } from "../svgs/errorIcon";
import { knownIssuesConfig } from "./knownIssuesConfig";

interface IdentityDeatilsWithStatus extends IdentityDetails {
  signInStatus?: string;
}

export const KnownIssues = () => {
  const [usersProducts, setUsersProducts] = useState<string[]>([]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const identityDetails: IdentityDeatilsWithStatus =
        window.guardian?.identityDetails;
      if (identityDetails?.signInStatus === "signedInRecently") {
        (async () => {
          const productDetailsResponse = await allProductsDetailFetcher();
          const productDetails: ProductDetail[] = await productDetailsResponse.json();
          setUsersProducts(
            productDetails.map(productDetail => productDetail.tier)
          );
        })();
      }
    }
  }, []);

  const dateSortedIssues = knownIssuesConfig.sort(
    (a, b) => Date.parse(a.date) - Date.parse(b.date)
  );
  const cat1Issues = dateSortedIssues.filter(issue => issue.category === 1);
  const cat2Issues = dateSortedIssues.filter(
    issue =>
      issue.category === 2 &&
      issue.affectedProducts?.some(product => usersProducts.includes(product))
  );
  const categoryAndDateSortedData = cat1Issues.concat(cat2Issues);
  return (
    <>
      {categoryAndDateSortedData.map((issue, index) => (
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
