import { ConsentOption, ConsentOptionType } from "../models";
import { APIPatchOptions, APIUseCredentials, identityFetch } from "./fetch";

const consentToConsentOption = (raw: any): ConsentOption => {
  return {
    ...raw,
    type: raw.isOptOut ? ConsentOptionType.OPT_OUT : ConsentOptionType.EMAIL,
    subscribed: false
  };
};

export const read = async (): Promise<ConsentOption[]> => {
  const url = "/consents";
  return (await identityFetch(url)).map(consentToConsentOption);
};

export const update = async (id: string, consented: boolean = true) => {
  const url = "/users/me/consents";
  const payload = [
    {
      id,
      consented
    }
  ];
  await identityFetch(url, APIUseCredentials(APIPatchOptions(payload)));
};
