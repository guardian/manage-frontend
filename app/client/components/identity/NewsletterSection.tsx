import React, { FC } from "react";
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
    const { theme, newsletters } = newsletterGroup;
    return (
      <DropMenu key={theme} title={theme}>
        {newsletters.map(nl => newsletterPreference(nl, clickHandler))}
      </DropMenu>
    );
  });

export const NewsletterSection: FC<NewsletterSectionProps> = props => {
  const { newsletterGroups, clickHandler } = props;
  return (
    <>
      <h2>Email and Marketing preferences</h2>
      <p>
        Our regular newsletters help you get closer to our quality, independent
        journalism. Pick the issues and topics that interest you below.
      </p>
      <p>
        The Guardian’s newsletters include content from our website, which may
        be funded by outside parties. Newsletters may also display information
        about Guardian News and Media's other products, services or events (such
        as Guardian Jobs or Masterclasses), chosen charities or online
        advertisements.
      </p>
      {newsletterPreferences(newsletterGroups, clickHandler)}
    </>
  );
};
