import React, { FC } from "react";
import palette from "../../colours";
import { minWidth } from "../../styles/breakpoints";
import { sans } from "../../styles/fonts";

interface PageSectionProps {
  title: string;
  description?: string;
  subtext?: string;
}

const getTitle = (title: PageSectionProps["title"]) => (
  <h2
    css={{
      fontSize: "1.0625rem",
      lineHeight: "1.5rem",
      fontWeight: "bold",
      margin: "0"
    }}
  >
    {title}
  </h2>
);

const getDescription = (description: PageSectionProps["description"]) => (
  <p
    css={{
      fontFamily: sans,
      fontSize: "0.875rem",
      marginBottom: "0.5rem"
    }}
  >
    {description}
  </p>
);

const getSubtext = (subtext: PageSectionProps["subtext"]) => (
  <p
    css={{
      fontSize: "0.8125rem",
      lineHeight: "1.125rem",
      fontFamily: sans,
      color: palette.neutral["3"],
      marginBottom: "0.75rem",
      marginTop: "0"
    }}
  >
    {subtext}
  </p>
);

export const PageSection: FC<PageSectionProps> = props => {
  const { children, description, title, subtext } = props;
  return (
    <div
      css={{
        [minWidth.desktop]: {
          display: "flex"
        }
      }}
    >
      <div
        css={{
          [minWidth.desktop]: {
            paddingRight: "6.25rem",
            width: "13.75rem",
            boxSizing: "content-box"
          }
        }}
      >
        {getTitle(title)}
        {description && getDescription(description)}
        {subtext && getSubtext(subtext)}
      </div>
      <div
        css={{
          width: "28.75rem"
        }}
      >
        {children}
      </div>
    </div>
  );
};
