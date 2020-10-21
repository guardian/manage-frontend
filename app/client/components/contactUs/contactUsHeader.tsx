import { css } from "@emotion/core";
import { breakpoints, palette, space } from "@guardian/src-foundations";
import { textSans, titlepiece } from "@guardian/src-foundations/typography";
import { Link } from "@reach/router";
import React from "react";
import { minWidth } from "../../styles/breakpoints";
import { gridBase, gridItemPlacement } from "../../styles/grid";
import { Breadcrumbs } from "../page";

export const ContactUsHeader = () => {
  const breadcrumbs: Breadcrumbs[] = [
    {
      title: "Help centre",
      link: "/"
    },
    {
      title: "Contact us",
      currentPage: true
    }
  ];

  return (
    <header
      css={{
        backgroundColor: palette.neutral[93]
      }}
    >
      <div
        css={{
          ...gridBase,
          maxWidth: `${breakpoints.wide}px`,
          margin: "0 auto",
          borderLeft: `1px solid ${palette.neutral[86]}`,
          borderRight: `1px solid ${palette.neutral[86]}`,

          [minWidth.desktop]: {
            ...(gridBase[minWidth.desktop] as object)
          },
          [minWidth.wide]: {
            ...(gridBase[minWidth.wide] as object)
          }
        }}
      >
        <div
          css={{
            display: "none",
            marginTop: `${space[3]}px`,
            [minWidth.desktop]: {
              ...gridItemPlacement(1, 4),
              display: "block"
            },

            [minWidth.wide]: {
              ...gridItemPlacement(1, 5)
            }
          }}
        >
          {breadcrumbs.map((breadcrumbItem, index) => (
            <React.Fragment key={`breadcrumb-${index}`}>
              {breadcrumbItem.link ? (
                <Link
                  to={breadcrumbItem.link}
                  css={css`
                    ${textSans.medium()};
                    color: ${palette.neutral[0]};
                  `}
                >
                  {breadcrumbItem.title}
                </Link>
              ) : (
                <span
                  css={css`
                    ${textSans.medium({
                      fontWeight: breadcrumbItem.currentPage
                        ? "bold"
                        : "regular"
                    })};
                    color: ${palette.neutral[0]};
                  `}
                >
                  {breadcrumbItem.title}
                </span>
              )}
              {breadcrumbs?.length && index < breadcrumbs?.length - 1 && (
                <span>{" / "}</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <h1
          css={{
            font: titlepiece.small(),
            fontSize: "24px",
            ...gridItemPlacement(1, 4),
            margin: `${space[9]}px 0 0 0`,
            padding: `${space[3]}px 0`,

            ":after": {
              display: "inline-block",
              content: '"?"'
            },

            [minWidth.tablet]: {
              ...gridItemPlacement(1, 12)
            },

            [minWidth.desktop]: {
              ...gridItemPlacement(5, 8),
              fontSize: "42px",
              paddingLeft: `${space[5]}px`,
              marginTop: `${space[24]}px`,
              marginLeft: `-${space[5]}px`,
              borderLeft: `1px solid ${palette.neutral[86]}`,
              borderTop: `1px solid ${palette.neutral[86]}`,
              ":after": {
                display: "inline-block",
                marginLeft: "0.3ch",
                content: '"about something?"'
              }
            },

            [minWidth.wide]: {
              ...gridItemPlacement(6, 11)
            }
          }}
        >
          Need to contact us
        </h1>
      </div>
    </header>
  );
};
