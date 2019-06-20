import React, { useEffect, useState } from "react";
import { headline } from "../../styles/fonts";
import { navLinks } from "../nav";
import { PageContainer, PageHeaderContainer } from "../page";
import { DropMenu } from "./DropMenu";
import { MarketingPreference } from "./MarketingPreference";

interface Consent {
  id: string;
  name: string;
  description: string;
}

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
const updateNewsletter = async (id: string, subscribed: boolean = true) => {
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
      "This is a test function and should NOT be present in the final merge: Failed to update newsletter data"
    );
  } else {
    return;
  }
};

// @TODO: DEV: TESTING FUNCTION
const readNewsletters = async (): Promise<NewsletterGroup[]> => {
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

// @TODO: DEV: TESTING FUNCTION
const updateConsent = async (id: string, consented: boolean = true) => {
  const url = "https://idapi.thegulocal.com/users/me/consents";
  const payload = {
    id,
    consented
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
      "This is a test function and should NOT be present in the final merge: Failed to update consent data"
    );
  } else {
    return;
  }
};

// @TODO: DEV: TESTING FUNCTION
const readConsents = async (): Promise<Consent[]> => {
  const url = "https://idapi.thegulocal.com/consents";
  const response = await fetch(url);
  if (!response.ok) {
    throw Error(
      "This is a test function and should NOT be present in the final merge: Failed to retrieve consents data"
    );
  } else {
    return await response.json();
  }
};

const newsletterPreference = (newsletter: Newsletter) => {
  const { id, name, description, frequency } = newsletter;
  return (
    <MarketingPreference
      id={id}
      key={id}
      title={name}
      description={description}
      frequency={frequency}
      onClick={updateNewsletter}
    />
  );
};

const consentPreference = (consent: Consent) => {
  const { id, name, description } = consent;
  return (
    <MarketingPreference
      id={id}
      key={id}
      title={name}
      description={description}
      onClick={updateConsent}
    />
  );
};

const newsletterPreferences = (newsletterGroups: NewsletterGroup[]) =>
  newsletterGroups.map(newsletterGroup => {
    const { theme, newsletters } = newsletterGroup;
    return (
      <DropMenu key={theme} title={theme}>
        {newsletters.map(newsletterPreference)}
      </DropMenu>
    );
  });

export const EmailAndMarketing = (props: { path?: string }) => {
  const [newsletterGroups, setNewsletterGroups] = useState(
    [] as NewsletterGroup[]
  );
  const [consents, setConsents] = useState([] as Consent[]);
  useEffect(() => {
    readNewsletters().then(ns => setNewsletterGroups(ns));
    readConsents().then(cs => setConsents(cs));
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
        {newsletterPreferences(newsletterGroups)}
      </PageContainer>
      <PageContainer>
        <h2>Consents</h2>
        {consents.map(consentPreference)}
      </PageContainer>
    </>
  );
};
