import React, { FC } from "react";
import { sans } from "../../styles/fonts";
import { css } from "@emotion/core";
import { ToggleSwitch } from "./ToggleSwitch";

interface MarketingToggleProps {
  id: string;
  description?: string;
  title?: string;
  selected?: boolean;
  onClick: (id: string) => {};
}

const standardText = {
  fontFamily: sans,
  fontSize: "14px",
  lineHeight: "1.333"
};

const getDescription = (description: MarketingToggleProps["description"]) => (
  <p
    css={[
      standardText,
      {
        margin: "0",
        padding: "2.88px 90px 0 0"
      }
    ]}
  >
    {description}
  </p>
);

export const MarketingToggle: FC<MarketingToggleProps> = (props) => {
  const { id, description, selected, title, onClick } = props;
  return (
    <div
      onClick={(e) => {
        // Checkboxes inside labels will trigger click events twice.
        // Ignore the input click event
        if (e.target instanceof Element && e.target.nodeName === "INPUT") {
          return;
        }
        onClick(id);
      }}
      css={[
        standardText,
        {
          marginTop: "12px",
          position: "relative"
        }
      ]}
    >
      <div css={{ left: 0 }}>
        <ToggleSwitch
          cssOverrides={css`
            label {
              ${standardText};
              padding-right: 5px;
              font-weight: bold;
            }
          `}
          label={title}
          labelPosition="left"
          labelId={id}
          checked={!!selected}
          onClick={(_) => {
            return;
          }}
        />
      </div>
      {description && getDescription(description)}
    </div>
  );
};
