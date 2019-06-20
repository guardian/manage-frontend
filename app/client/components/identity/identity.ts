export interface Consent {
  id: string;
  name: string;
  description: string;
}

interface ExactTargetEntity {
  exactTargetListId: number;
}

export interface Newsletter {
  id: string;
  theme: string;
  name: string;
  description: string;
  frequency: string;
}

export interface NewsletterGroup {
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
export const updateNewsletter = async (
  id: string,
  subscribed: boolean = true
) => {
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
export const readNewsletters = async (): Promise<NewsletterGroup[]> => {
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
export const updateConsent = async (id: string, consented: boolean = true) => {
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
export const readConsents = async (): Promise<Consent[]> => {
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
