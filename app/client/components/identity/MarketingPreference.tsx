import React, { FC } from "react";
import palette from "../../colours";
import { sans } from "../../styles/fonts";

interface MarketingPreferenceProps {
  id: string;
  description: string;
  frequency?: string;
  title: string;
  selected?: boolean;
  onClick: (id: string) => {};
}

const standardText = {
  fontSize: "0.875rem",
  fontFamily: sans
};
const clockSVG = (
  <svg
    css={{ fill: palette.neutral["5"] }}
    width="11"
    height="11"
    viewBox="0 0 11 11"
  >
    <path d="M5.4 0C2.4 0 0 2.4 0 5.4s2.4 5.4 5.4 5.4 5.4-2.4 5.4-5.4S8.4 0 5.4 0zm3 6.8H4.7V1.7h.7L6 5.4l2.4.6v.8z" />
  </svg>
);
export const MarketingPreference: FC<MarketingPreferenceProps> = props => {
  const { id, description, frequency, selected, title, onClick } = props;
  return (
    <div
      onClick={() => onClick(id)}
      css={[
        standardText,
        {
          lineHeight: "1.333",
          marginTop: "0.75rem",
          paddingLeft: "1.48214rem",
          position: "relative"
        }
      ]}
    >
      <input
        css={{ position: "absolute", left: 0 }}
        type="checkbox"
        checked={selected}
      />
      <p
        css={[
          standardText,
          {
            cursor: "pointer",
            fontSize: "0.875rem",
            lineHeight: "1.375rem",
            fontFamily: sans,
            fontWeight: "bold",
            margin: "-0.0625rem 0 0"
          }
        ]}
      >
        {title}
      </p>
      <p
        css={{
          margin: "0.17857rem 0 0 0"
        }}
      >
        {description}
      </p>
      {frequency && (
        <p
          css={{
            fontSize: "0.75rem",
            lineHeight: "1rem",
            margin: "0.1875rem 0 0 0",
            opacity: 0.75
          }}
        >
          <span
            css={{
              display: "inline-block",
              marginRight: "0.5rem",
              verticalAlign: "middle"
            }}
          >
            {clockSVG}
          </span>
          {frequency}
        </p>
      )}
    </div>
  );
};
