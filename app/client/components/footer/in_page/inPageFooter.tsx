import React from "react";
import palette from "../../../colours";
import { minWidth } from "../../../styles/breakpoints";
import { PageContainer } from "../../page";

interface InPageFooterProps {
  title: string;
  children: any;
}

export const InPageFooter = (props: InPageFooterProps) => (
  <div
    css={{
      margin: "10px",
      marginTop: "40px",
      borderTop: "1px solid " + palette.neutral["5"]
    }}
  >
    <PageContainer noVerticalMargin>
      <div
        css={{
          [minWidth.phablet]: {
            display: "flex"
          }
        }}
      >
        <div css={{ minWidth: "225px" }}>
          <h2
            css={{
              margin: 0,
              [minWidth.phablet]: {
                borderRight: "1px solid " + palette.neutral["5"]
              }
            }}
          >
            {props.title}
          </h2>
        </div>
        <div
          css={{
            margin: "10px",
            maxWidth: "500px"
          }}
        >
          {props.children}
        </div>
      </div>
    </PageContainer>
  </div>
);
