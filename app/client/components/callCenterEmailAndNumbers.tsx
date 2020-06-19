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

export type PhoneRegionKey = "US" | "AUS" | "UK & ROW";

interface PhoneRegion {
  key: PhoneRegionKey;
  title: string;
  openingHours: string;
  phoneNumbers: Array<{ phoneNumber: string; suffix?: string }>;
}

const EMAIL_ADDRESS: string = "customer.help@theguardian.com";

const PHONE_DATA: PhoneRegion[] = [
  {
    key: "UK & ROW",
    title: "United Kingdom, Europe and rest of world",
    openingHours: "8am - 8pm on weekdays, 8am - 6pm at weekends (GMP/BST)",
    phoneNumbers: [
      {
        phoneNumber: "+44 (0) 330 333 6790"
      }
    ]
  },
  {
    key: "AUS",
    title: "Australia, New Zealand, and Asia Pacific",
    openingHours: "9am - 5pm Monday - Friday (AEDT)",
    phoneNumbers: [
      {
        phoneNumber: "1800 773 766",
        suffix: "(within Australia)"
      },
      {
        phoneNumber: "+61 28076 8599",
        suffix: "(outside Australia)"
      }
    ]
  },
  {
    key: "US",
    title: "Canada and USA",
    openingHours: "9am - 5pm on weekdays (EST/EDT)",
    phoneNumbers: [
      {
        phoneNumber: "1-844-632-2010",
        suffix: "(toll free USA)"
      },
      {
        phoneNumber: "+1 917-900-4663",
        suffix: "(outside USA)"
      }
    ]
  }
];

interface CallCentreEmailAndNumbersProps extends CallCentreNumbersProps {
  hideEmailAddress?: boolean;
  phoneRegionFilterKeys?: PhoneRegionKey[];
}

export const CallCentreEmailAndNumbers = (
  props: CallCentreEmailAndNumbersProps
) => {
  const [indexOfOpenSection, setIndexOfOpenSection] = useState<number>(0);

  const filteredPhoneData = PHONE_DATA.filter(
    phoneRegion =>
      !props.phoneRegionFilterKeys ||
      props.phoneRegionFilterKeys.includes(phoneRegion.key)
  );

  const sectionTitleCss = (isOpen: boolean, isNotFirstOption: boolean) => `
    ${textSans.medium()};
    margin: 0;
    padding: 12px 17px 12px 12px;
    position: relative;
    cursor: pointer;
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
        isOpen ? "rotate(-45deg)" : "rotate(135deg)"
      };
      transition: transform 0.4s;
      right: 17px;
    }
    ${isNotFirstOption &&
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

  const innerSectionTitleCss = `
    ${textSans.medium()};
    margin: 6px 0 4px;
  `;

  const handleSectionClick = (sectionNum: number) => () => {
    setIndexOfOpenSection(indexOfOpenSection === sectionNum ? -1 : sectionNum);
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
        {filteredPhoneData.map((phoneRegion, index) => {
          const isOpen = index === indexOfOpenSection;
          const isNotFirstOption = index > 0;
          return (
            <div css={css`subsectionCss`} key={phoneRegion.key}>
              <h2
                css={css`
                  ${sectionTitleCss(isOpen, isNotFirstOption)}
                `}
                onClick={handleSectionClick(index)}
              >
                {phoneRegion.title}
              </h2>
              <div
                css={css`
                  ${innerSectionCss(isOpen)}
                `}
              >
                {!props.hideEmailAddress && (
                  <>
                    <h4
                      css={css`
                        ${innerSectionTitleCss}
                      `}
                    >
                      Email:
                    </h4>
                    <span
                      css={css`
                        ${textSans.medium({ fontWeight: "bold" })};
                      `}
                    >
                      {EMAIL_ADDRESS}
                    </span>
                  </>
                )}
                <h4
                  css={css`
                    ${innerSectionTitleCss}
                  `}
                >
                  Phone:
                </h4>
                <p
                  css={css`
                    ${innerSectionPCss}
                  `}
                >
                  {phoneRegion.phoneNumbers.map(({ phoneNumber, suffix }) => (
                    <span
                      key={phoneNumber}
                      css={css`
                        ${innerSectionBlockSpanCss}
                      `}
                    >
                      {phoneNumber}
                      {suffix && (
                        <span
                          css={css`
                            font-weight: normal;
                          `}
                        >
                          {" "}
                          {suffix}
                        </span>
                      )}
                    </span>
                  ))}
                  {phoneRegion.openingHours}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
