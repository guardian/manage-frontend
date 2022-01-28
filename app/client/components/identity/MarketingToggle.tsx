import React, { FC } from "react";
import { sans } from "../../styles/fonts";
import { ToggleSwitch } from "./ToggleSwitch";

interface MarketingPreferenceProps {
  id: string;
  description: string;
  title?: string;
  selected?: boolean;
  onClick: (id: string) => {};
}

const standardText = {
  fontSize: "14px",
  fontFamily: sans,
};

const getTitle = (title: MarketingPreferenceProps["title"]) => (
  <p
    css={[
      standardText,
      {
        cursor: "pointer",
        fontSize: "14px",
        lineHeight: "22px",
        fontFamily: sans,
        fontWeight: "bold",
        margin: "0",
      },
    ]}
  >
    {title}
  </p>
);

export const MarketingToggle: FC<MarketingPreferenceProps> = (props) => {
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
          lineHeight: "1.333",
          marginTop: "12px",
          position: "relative",
        },
      ]}
    >
      <div css={{ left: 0 }}>
        <ToggleSwitch
          css={[{ paddingRight: "30px" }]}
          label={description}
          labelId={id}
          checked={!!selected}
          onClick={(_) => {
            return;
          }}
        />
      </div>
      {title && getTitle(title)}
    </div>
  );
};
