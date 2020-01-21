import { css } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import React, { useState } from "react";
import { CallCentreNumbersProps } from "./callCentreNumbers";

const contactUsStyles = {
  margin: "0 0 10px",
  paddingRight: "5px"
};

const callCenterStyles = css({
  marginBottom: "10px",
  display: "flex",
  flexWrap: "wrap",
  textAlign: "left",
  fontWeight: "normal"
});

export const CallCentreEmailAndNumbers = (props: CallCentreNumbersProps) => {
  const [accordianStatus, setAccordianStatus] = useState([
    {
      isOpen: true
    },
    {
      isOpen: false
    },
    {
      isOpen: false
    }
  ]);

  const sectionTitleCss = (sectionNum: number) => `
    ${textSans.medium()};
    margin: 0;
    padding: 12px 17px 12px 12px;
    position: relative;
    ${sectionNum > 0 &&
      `
      :before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 12px;
        width: calc(100% - 24px);
        height: 1px;
        background-color: ${palette.neutral["86"]}
      }
    `}
    :after {
      content: "";
      display: block;
      width: 7px;
      height: 7px;
      border-top: 2px solid ${palette.neutral["7"]};
      border-right: 2px solid ${palette.neutral["7"]};
      position: absolute;
      top: 50%;
      transform: translateY(-50%) ${
        accordianStatus[sectionNum].isOpen ? "rotate(-45deg)" : "rotate(135deg)"
      };
      transition: transform 0.4s;
      right: 17px;
    }
  `;
  const innerSectionCss = (isOpen: boolean) => `
    display: ${isOpen ? "block" : "none"};
    background-color: ${palette.neutral["97"]};
    padding: 12px;
  `;

  const innerSectionPCss = `
    ${textSans.medium()};
  `;

  const innerSectionBlockSpanCss = `
      display: block;
      margin-bottom: 4px;
      font-weight: bold;
  `;

  const innerSectionTitleCss = (isTopTitle: boolean) => `
    ${textSans.medium()};
    margin: ${isTopTitle ? "6px 0 4px" : "20px 0 4px"};
  `;

  const handleSectionClick = (sectionNum: number) => () => {
    setAccordianStatus(
      accordianStatus.map((section, sectionIndex) =>
        sectionIndex === sectionNum
          ? { isOpen: !section.isOpen }
          : { isOpen: false }
      )
    );
  };
  return (
    <div css={callCenterStyles}>
      {props.prefixText && <p css={contactUsStyles}>{props.prefixText}</p>}
      <div
        css={css`
          width: 100%;
          border: 1px solid ${palette.neutral["86"]};
        `}
      >
        <div css={css`subsectionCss`}>
          <h2
            css={css`
              ${sectionTitleCss(0)}
            `}
            onClick={handleSectionClick(0)}
          >
            United Kingdom, Europe and rest of world
          </h2>
          <div
            css={css`
              ${innerSectionCss(accordianStatus[0].isOpen)}
            `}
          >
            <h4
              css={css`
                ${innerSectionTitleCss(true)}
              `}
            >
              Email:
            </h4>
            <span
              css={css`
                ${textSans.medium({ fontWeight: "bold" })};
              `}
            >
              customer.help@theguardian.com
            </span>
            <h4
              css={css`
                ${innerSectionTitleCss(true)}
              `}
            >
              Phone:
            </h4>
            <p
              css={css`
                ${innerSectionPCss}
              `}
            >
              <span>+44 (0) 330 333 6790</span>
              8am - 8pm on weekdays, 8am - 6pm at weekends (GMP/BST)
            </p>
          </div>
        </div>
        <div css={css`subsectionCss`}>
          <h2
            css={css`
              ${sectionTitleCss(1)}
            `}
            onClick={handleSectionClick(1)}
          >
            Australia, New Zealand, and Asia Pacific
          </h2>
          <div
            css={css`
              ${innerSectionCss(accordianStatus[1].isOpen)}
            `}
          >
            <h4
              css={css`
                ${innerSectionTitleCss(true)}
              `}
            >
              Email:
            </h4>
            <span
              css={css`
                ${textSans.medium({ fontWeight: "bold" })};
              `}
            >
              customer.help@theguardian.com
            </span>
            <h4
              css={css`
                ${innerSectionTitleCss(true)}
              `}
            >
              Phone:
            </h4>
            <p
              css={css`
                ${innerSectionPCss}
              `}
            >
              <span
                css={css`
                  ${innerSectionBlockSpanCss}
                `}
              >
                1800 773 766{" "}
                <span
                  css={css`
                    font-weight: normal;
                  `}
                >
                  (within Australia)
                </span>
              </span>
              <span
                css={css`
                  ${innerSectionBlockSpanCss}
                `}
              >
                +61 28076 8599{" "}
                <span
                  css={css`
                    font-weight: normal;
                  `}
                >
                  (outside Australia)
                </span>
              </span>
              9am - 5pm Monday - Friday (AEDT)
            </p>
          </div>
        </div>
        <div css={css`subsectionCss`}>
          <h2
            css={css`
              ${sectionTitleCss(2)}
            `}
            onClick={handleSectionClick(2)}
          >
            Canada and USA
          </h2>
          <div
            css={css`
              ${innerSectionCss(accordianStatus[2].isOpen)}
            `}
          >
            <h4
              css={css`
                ${innerSectionTitleCss(true)}
              `}
            >
              Email:
            </h4>
            <span
              css={css`
                ${textSans.medium({ fontWeight: "bold" })};
              `}
            >
              customer.help@theguardian.com
            </span>
            <h4
              css={css`
                ${innerSectionTitleCss(true)}
              `}
            >
              Phone:
            </h4>
            <p
              css={css`
                ${innerSectionPCss}
              `}
            >
              <span
                css={css`
                  ${innerSectionBlockSpanCss}
                `}
              >
                1-844-632-2010{" "}
                <span
                  css={css`
                    font-weight: normal;
                  `}
                >
                  (toll free USA)
                </span>
              </span>
              <span
                css={css`
                  ${innerSectionBlockSpanCss}
                `}
              >
                +1 917-900-4663{" "}
                <span
                  css={css`
                    font-weight: normal;
                  `}
                >
                  (outside USA)
                </span>
              </span>
              9am - 5pm on weekdays (EST/EDT)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
