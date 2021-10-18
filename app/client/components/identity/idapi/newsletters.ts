import { ConsentOption, ConsentOptionType } from "../models";
import { APIPatchOptions, APIUseCredentials, identityFetch } from "./fetch";

interface NewsletterAPIResponse {
  id: string;
  theme: string;
  name: string;
  description: string;
  frequency: string;
  subscribed: boolean;
  exactTargetListId: number;
}

const newsletterToConsentOption = (
  newsletter: NewsletterAPIResponse
): ConsentOption => {
  const {
    id: identityName,
    theme,
    name,
    description,
    frequency,
    exactTargetListId
  } = newsletter;
  return {
    id: exactTargetListId.toString(),
    description,
    theme,
    type: ConsentOptionType.NEWSLETTER,
    name,
    frequency,
    subscribed: false,
    identityName
  };
};

const addTrackingQueryParams = (path: string): string => {
  const params = new URLSearchParams({
    ref: window.location.href,
    refViewId:
      (window.guardian &&
        window.guardian.ophan &&
        window.guardian.ophan.viewId) ||
      ""
  });
  return `${path}?${params.toString()}`;
};

export const read = async (): Promise<ConsentOption[]> => {
  const url = addTrackingQueryParams("/newsletters");

  return (await identityFetch<NewsletterAPIResponse[]>(url)).map(
    newsletterToConsentOption
  );
};

export const readRestricted = async (): Promise<ConsentOption[]> => {
  const url = addTrackingQueryParams("/newsletters/restricted");
  return (await identityFetch<NewsletterAPIResponse[]>(url)).map(
    newsletterToConsentOption
  );
};

export const update = async (id: string, subscribed: boolean = true) => {
  const url = addTrackingQueryParams("/users/me/newsletters");
  const payload = {
    id,
    subscribed
  };
  identityFetch(url, APIUseCredentials(APIPatchOptions(payload)));
};
