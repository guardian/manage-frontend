import React, { useEffect, useState } from "react";
import { headline } from "../../styles/fonts";
import { navLinks } from "../nav";
import { PageContainer, PageHeaderContainer } from "../page";
import { DropMenu } from "./DropMenu";
import { MarketingPreference } from "./MarketingPreference";

interface ExactTargetEntity {
  exactTargetListId: number;
}

interface Newsletter {
  id: string;
  theme: string;
  name: string;
  description: string;
  frequency: string;
}

interface NewsletterGroup {
  theme: string;
  newsletters: Newsletter[];
}

// @TODO: DEV: POTENTIALLY REPLACEABLE IF CALLS PROXIED
const toNewsletter = (
  rawNewsletter: Newsletter & ExactTargetEntity
): Newsletter => {
  const {
    theme,
    name,
    description,
    frequency,
    exactTargetListId
  } = rawNewsletter;
  return {
    id: exactTargetListId.toString(),
    description,
    theme,
    name,
    frequency
  };
};

// @TODO: DEV: POTENTIALLY REPLACEABLE IF CALLS PROXIED
const toNewsletterGroups = (
  newsletters: Array<Newsletter & ExactTargetEntity>
): NewsletterGroup[] => {
  const template = [
    "news",
    "features",
    "sport",
    "culture",
    "lifestyle",
    "comment",
    "From the papers"
  ];
  return template.map(theme => ({
    theme,
    newsletters: newsletters
      .filter(newsletter => newsletter.theme === theme)
      .map(toNewsletter)
  }));
};

// @TODO: DEV: TESTING FUNCTION
const setNewsletter = async (id: string, subscribed: boolean = true) => {
  const url = "https://idapi.thegulocal.com/users/me/newsletters";
  const payload = {
    id,
    subscribed
  };
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw Error(
      "This is a test function and should NOT be present in the final merge: Failed to set newsletter data"
    );
  } else {
    return;
  }
};

// @TODO: DEV: TESTING FUNCTION
const getNewsletters = async (): Promise<NewsletterGroup[]> => {
  const url = "https://idapi.thegulocal.com/newsletters";
  const response = await fetch(url);
  if (!response.ok) {
    throw Error(
      "This is a test function and should NOT be present in the final merge: Failed to retrieve newsletter data"
    );
  } else {
    return toNewsletterGroups(await response.json());
  }
};

const getNewsletterPreference = (newsletter: Newsletter) => {
  const { id, name, description, frequency } = newsletter;
  return (
    <MarketingPreference
      id={id}
      key={id}
      title={name}
      description={description}
      frequency={frequency}
      onClick={setNewsletter}
    />
  );
};

const getNewsletterPreferences = (newsletterGroups: NewsletterGroup[]) =>
  newsletterGroups.map(newsletterGroup => {
    const { theme, newsletters } = newsletterGroup;
    return (
      <DropMenu key={theme} title={theme}>
        {newsletters.map(getNewsletterPreference)}
      </DropMenu>
    );
  });

export const EmailAndMarketing = (props: { path?: string }) => {
  const [newsletterGroups, setNewsletterGroups] = useState(
    [] as NewsletterGroup[]
  );

  useEffect(() => {
    getNewsletters().then(ns => setNewsletterGroups(ns));
  }, []);

  return (
    <>
      <PageHeaderContainer selectedNavItem={navLinks.emailPrefs}>
        <h1
          css={{
            fontSize: "2rem",
            lineHeight: "2.25rem",
            fontFamily: headline,
            marginBottom: "30px",
            marginTop: "0"
          }}
        >
          Edit your profile
        </h1>
      </PageHeaderContainer>
      <PageContainer>
        <h2>Email and Marketing preferences</h2>
        {getNewsletterPreferences(newsletterGroups)}
      </PageContainer>
    </>
  );
};
