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

export enum ConsentOptionType {
  EMAIL = "EMAIL",
  NEWSLETTER = "NEWSLETTER",
  OPT_OUT = "OPT_OUT"
}

interface User {
  email: string;
  consents: string[];
}

export interface ConsentOption {
  id: string;
  description: string;
  frequency?: string;
  name: string;
  theme?: string;
  type: ConsentOptionType;
  subscribed: boolean;
}

interface Subscription {
  listId: number;
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
  subscribed: boolean;
}

export interface ConsentOptionCollection {
  getAll: () => Promise<ConsentOption[]>;
  subscribe: (id: string) => Promise<void>;
  unsubscribe: (id: string) => Promise<void>;
}

export const filterNewsletters = (options: ConsentOption[]): ConsentOption[] =>
  options.filter(option => option.type === ConsentOptionType.NEWSLETTER);

const filterEmailConsents = (options: ConsentOption[]): ConsentOption[] =>
  options.filter(option => option.type === ConsentOptionType.EMAIL);

const filterOptOuts = (options: ConsentOption[]): ConsentOption[] =>
  options.filter(option => option.type === ConsentOptionType.OPT_OUT);

export const filterConsents = (options: ConsentOption[]): ConsentOption[] => [
  ...filterEmailConsents(options),
  ...filterOptOuts(options)
];

const toSubscriptionIdList = (subscriptions: Subscription[]): string[] =>
  subscriptions.map(s => s.listId.toString());

const toNewsletter = (
  rawNewsletter: Newsletter & ExactTargetEntity
): ConsentOption => {
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
    type: ConsentOptionType.NEWSLETTER,
    name,
    frequency,
    subscribed: false
  };
};

const toConsent = (raw: any): ConsentOption => {
  return {
    ...raw,
    type: raw.isOptOut ? ConsentOptionType.OPT_OUT : ConsentOptionType.EMAIL,
    subscribed: false
  };
};

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

const APIPatchOptions = (payload: any): RequestInit => ({
  method: "PATCH",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(payload)
});

const useCredentials = (options: RequestInit): RequestInit => ({
  ...options,
  credentials: "include"
});

const IDAPI_URL = "https://idapi.code.dev-theguardian.com";
const identityFetch = APIFetch(IDAPI_URL);

const mapSubscriptions = (
  subscriptions: string[],
  options: ConsentOption[]
): ConsentOption[] =>
  options.map(option => ({
    ...option,
    subscribed: option.subscribed ? true : subscriptions.includes(option.id)
  }));

export const Newsletters: ConsentOptionCollection = {
  async getAll(): Promise<ConsentOption[]> {
    const [newsletters, subscriptions] = await Promise.all([
      readNewsletters(),
      readNewsletterSubscriptions()
    ]);
    return mapSubscriptions(subscriptions, newsletters);
  },
  async subscribe(id: string): Promise<void> {
    return updateNewsletter(id, true);
  },
  async unsubscribe(id: string): Promise<void> {
    return updateNewsletter(id, false);
  }
};

export const Consents: ConsentOptionCollection = {
  async getAll(): Promise<ConsentOption[]> {
    const [consents, subscriptions] = await Promise.all([
      readConsents(),
      memoReadConsentSubscriptions()
    ]);
    return mapSubscriptions(subscriptions, consents);
  },
  async subscribe(id: string): Promise<void> {
    return updateConsent(id, true);
  },
  async unsubscribe(id: string): Promise<void> {
    return updateConsent(id, false);
  }
};

export const updateRemoveAllConsents = async () => {
  const url = "/remove/consent/all";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  return identityFetch(url, useCredentials(options));
};

const readConsents = async (): Promise<ConsentOption[]> => {
  const url = "/consents";
  return (await identityFetch(url)).map(toConsent);
};

const updateConsent = async (id: string, consented: boolean = true) => {
  const url = "/users/me/consents";
  const payload = [
    {
      id,
      consented
    }
  ];
  await identityFetch(url, useCredentials(APIPatchOptions(payload)));
};

const readNewsletters = async (): Promise<ConsentOption[]> => {
  const url = "/newsletters";
  return ((await identityFetch(url)) as Array<
    Newsletter & ExactTargetEntity
  >).map(toNewsletter);
};

const updateNewsletter = async (id: string, subscribed: boolean = true) => {
  const url = "/users/me/newsletters";
  const payload = {
    id,
    subscribed
  };
  identityFetch(url, useCredentials(APIPatchOptions(payload)));
};

const readNewsletterSubscriptions = async (): Promise<string[]> => {
  const url = "/users/me/newsletters";
  const data = await identityFetch(url, useCredentials({}));
  return toSubscriptionIdList(data.result.subscriptions);
};

const readUserDetails = async (): Promise<User> => {
  const url = "/user/me";
  const data = await identityFetch(url, useCredentials({}));
  const consents = data.user.consents
    .filter((consent: any) => consent.consented)
    .map((consent: any) => consent.id);
  return {
    email: data.user.primaryEmailAddress,
    consents
  };
};

const memoReadUserDetails = (): [
  () => Promise<string[]>,
  () => Promise<string>
] => {
  let user: Promise<User> | undefined;
  const getUser = (): Promise<User> => {
    if (user === undefined) {
      user = readUserDetails();
    }
    return Promise.resolve(user);
  };
  return [
    async () => (await getUser()).consents,
    async () => (await getUser()).email
  ];
};

export const [
  memoReadConsentSubscriptions,
  memoReadEmail
] = memoReadUserDetails();
