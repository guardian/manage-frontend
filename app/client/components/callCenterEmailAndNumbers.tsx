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
  const sectionTitleCss = `
    ${textSans.medium()};
    margin: 0;
    padding: 12px 17px 12px 12px;
    position: relative;
    :after {
      content: "";
      display: block;
      width: 7px;
      height: 7px;
      border-top: 2px solid ${palette.neutral["7"]};
      border-right: 2px solid ${palette.neutral["7"]};
      position: absolute;
      top: 50%;
      transform: translateY(-50%) rotate(135deg);
      transition: transform 0.4s;
      right: 17px;
    }
    [data-open]:after {
      transform: translateY(-50%) rotate(-45deg);
    }
  `;
  const innerSectionCss = (isOpen: boolean) => `
    display: ${isOpen ? "block" : "none"};
    background-color: ${palette.neutral["97"]};
    padding: 12px;
  `;

  const innerSectionPCss = `
    ${textSans.medium()};
    span {
      display: block;
      margin-bottom: 4px;
      font-weight: bold;
    }
  `;

  const innerSectionTitleCss = (isTopTitle: boolean) => `
    ${textSans.medium()};
    margin: ${isTopTitle ? "6px 0 4px" : "20px 0 4px"};
  `;

  // acordian state
  const [accordianStatus, setAccordianStatus] = useState([
    {
      isOpen: false
    },
    {
      isOpen: true
    },
    {
      isOpen: false
    }
  ]);

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
              ${sectionTitleCss}
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
              ${sectionTitleCss}
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
              <span>1800 773 766 (within Australia)</span>
              <span>+61 2​ 8​076 8599 (outside Australia)</span>
              9am - 5pm Monday - Friday (AEDT)
            </p>
          </div>
        </div>
        <div css={css`subsectionCss`}>
          <h2
            css={css`
              ${sectionTitleCss}
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
              <span>1-844-632-2010 (toll free USA)</span>
              <span>+1 917-900-4663 (outside USA)</span>
              9am - 5pm on weekdays (EST/EDT)
            </p>
          </div>
        </div>
      </div>
      {/* <Accordion>
      <div title="United Kingdom, Europe and rest of world">
        <div>
          <b>{ukPhoneNumber}</b>
        </div>
        <div>{ukOpeningTimes}</div>
      </div>
      <div title="Australia, New Zealand, and Asia Pacific">
        <div>
          <b>1800 773 766</b> (within Australia)
        </div>
        <div>
          <b>+61 2​ 8​076 8599</b> (outside Australia)
        </div>
        <div>9am - 5pm Monday - Friday (AEDT)</div>
      </div>
      <div title="Canada and USA">
        <div>
          <b>1-844-632-2010</b> (toll free USA)
        </div>
        <div>
          <b>+1 917-900-4663</b> (outside USA)
        </div>
        <div>9am - 5pm on weekdays (EST/EDT)</div>
      </div>
    </Accordion> */}
    </div>
  );
};
