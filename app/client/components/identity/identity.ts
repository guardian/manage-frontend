export enum Theme {
  news = "news",
  features = "features",
  sport = "sport",
  culture = "culture",
  lifestyle = "lifestyle",
  comment = "comment",
  work = "work",
  FromThePapers = "From the papers"
}

export interface User {
  email: string;
  consents: string[];
}

export interface Consent {
  id: string;
  name: string;
  isOptOut: boolean;
  description: string;
  subscribed: boolean;
}

interface Subscription {
  listId: number;
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
  subscribed: boolean;
}

// @TODO: NO TEST
const toSubscriptionIdList = (subscriptions: Subscription[]): string[] =>
  subscriptions.map(s => s.listId.toString());

// @TODO: NO TEST
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
    frequency,
    subscribed: false
  };
};

// @TODO: NO TEST
const toConsent = (raw: any): Consent => {
  return {
    ...raw,
    subscribed: false
  };
};

// @TODO: NO TEST
export const mapSubscriptions = <T extends { id: string; subscribed: boolean }>(
  subscribables: T[],
  subscriptionIds: string[]
): T[] => {
  return subscribables.map(subscribable => {
    const subscribed = subscriptionIds.includes(subscribable.id);
    return {
      ...subscribable,
      subscribed
    };
  });
};

// @TODO: NO TEST
const APIFetch = (baseUrl: string) => async (
  url: string,
  options?: RequestInit
): Promise<any> => {
  const response = await fetch(baseUrl + url, options);
  if (!response.ok) {
    let err;
    try {
      err = await response.json();
    } catch (e) {
      err = await response.text();
    }
    throw new Error(`Response error: ${err}`);
  } else if (response.status === 204) {
    return null;
  } else {
    let data;
    try {
      data = await response.json();
    } catch (e) {
      throw new Error(`Error decoding JSON response: ${e}`);
    }
    return data;
  }
};

// @TODO: NO TEST
const APIPatchOptions = (payload: any): RequestInit => ({
  method: "PATCH",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(payload)
});

const IDAPI_URL = "https://idapi.code.dev-theguardian.com";
const identityFetch = APIFetch(IDAPI_URL);

// @TODO: NO TEST
export const updateRemoveAllConsents = async () => {
  const url = "remove/consent/all";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  };
  return identityFetch(url, options);
};

// @TODO: NO TEST
export const readConsents = async (): Promise<Consent[]> => {
  const url = "/consents";
  return (await identityFetch(url)).map(toConsent);
};

// @TODO: NO TEST
export const updateConsent = async (id: string, consented: boolean = true) => {
  const url = "/users/me/consents";
  const payload = [
    {
      id,
      consented
    }
  ];
  await identityFetch(url, APIPatchOptions(payload));
};

// @TODO: NO TEST
export const readNewsletters = async (): Promise<Newsletter[]> => {
  const url = "/newsletters";
  return ((await identityFetch(url)) as Array<
    Newsletter & ExactTargetEntity
  >).map(toNewsletter);
};

// @TODO: NO TEST
export const updateNewsletter = async (
  id: string,
  subscribed: boolean = true
) => {
  const url = "/users/me/newsletters";
  const payload = {
    id,
    subscribed
  };
  identityFetch(url, APIPatchOptions(payload));
};

// @TODO: NO TEST
export const readNewsletterSubscriptions = async (): Promise<string[]> => {
  const url = "/users/me/newsletters";
  const data = await identityFetch(url);
  return toSubscriptionIdList(data.result.subscriptions);
};

// @TODO: NO TEST
export const readUserDetails = async (): Promise<User> => {
  const url = "/user/me";
  const data = await identityFetch(url);
  const consents = data.user.consents
    .filter((consent: any) => consent.consented)
    .map((consent: any) => consent.id);
  return {
    email: data.user.primaryEmailAddress,
    consents
  };
};
