import { ConsentOption, ConsentOptionType } from "../models";
import {
  APIFetch,
  APIPatchOptions,
  APIUseCredentials,
  identityFetch
} from "./fetch";

interface Newsletter {
  id: string;
  theme: string;
  name: string;
  description: string;
  frequency: string;
  subscribed: boolean;
  exactTargetListId: number;
}

const newsletterToConsentOption = (
  rawNewsletter: Newsletter
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

export const read = async (): Promise<ConsentOption[]> => {
  const url = "/newsletters";
  return ((await identityFetch(url)) as Newsletter[]).map(
    newsletterToConsentOption
  );
};

export const update = async (id: string, subscribed: boolean = true) => {
  const url = "/users/me/newsletters";
  const payload = {
    id,
    subscribed
  };
  identityFetch(url, APIUseCredentials(APIPatchOptions(payload)));
};
