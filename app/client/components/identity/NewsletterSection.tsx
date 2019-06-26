import React, { FC } from "react";
import palette from "../../colours";
import { minWidth } from "../../styles/breakpoints";
import { sans } from "../../styles/fonts";
import { DropMenu } from "./DropMenu";
import { Newsletter, NewsletterGroup } from "./identity";
import { MarketingPreference } from "./MarketingPreference";

type ClickHandler = (id: string) => {};

export interface NewsletterSectionProps {
  newsletterGroups: NewsletterGroup[];
  clickHandler: ClickHandler;
}

const newsletterPreference = (
  newsletter: Newsletter,
  clickHandler: ClickHandler
) => {
  const { id, name, description, frequency } = newsletter;
  return (
    <MarketingPreference
      id={id}
      key={id}
      title={name}
      description={description}
      frequency={frequency}
      onClick={clickHandler}
    />
  );
};

const newsletterPreferences = (
  newsletterGroups: NewsletterGroup[],
  clickHandler: ClickHandler
) =>
  newsletterGroups.map(newsletterGroup => {
    const { theme, color, newsletters } = newsletterGroup;
    return (
      <DropMenu key={theme} color={color} title={theme}>
        {newsletters.map(nl => newsletterPreference(nl, clickHandler))}
      </DropMenu>
    );
  });

export const NewsletterSection: FC<NewsletterSectionProps> = props => {
  const { newsletterGroups, clickHandler } = props;
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
            width: "26.25rem"
          }
        }}
      >
        <h2
          css={{
            fontSize: "1.0625rem",
            lineHeight: "1.5rem",
            fontWeight: "bold",
            margin: "0"
          }}
        >
          Your newsletters
        </h2>
        <p
          css={{
            fontFamily: sans,
            fontSize: "0.875rem",
            marginBottom: "0.5rem"
          }}
        >
          Our regular newsletters help you get closer to our quality,
          independent journalism. Pick the issues and topics that interest you
          below.
        </p>
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
          The Guardian’s newsletters include content from our website, which may
          be funded by outside parties. Newsletters may also display information
          about Guardian News and Media's other products, services or events
          (such as Guardian Jobs or Masterclasses), chosen charities or online
          advertisements.
        </p>
      </div>
      <div
        css={{
          width: "100%"
        }}
      >
        {newsletterPreferences(newsletterGroups, clickHandler)}
      </div>
    </div>
  );
};
