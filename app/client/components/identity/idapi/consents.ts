import { ConsentOption, ConsentOptionType } from "../models";
import { APIPatchOptions, APIUseCredentials, identityFetch } from "./fetch";

interface ConsentAPIResponse {
  id: string;
  description: string;
  name: string;
  isOptOut: boolean;
}

const consentToConsentOption = (
  response: ConsentAPIResponse
): ConsentOption => {
  const { id, description, name, isOptOut } = response;
  return {
    id,
    description,
    name,
    type: isOptOut ? ConsentOptionType.OPT_OUT : ConsentOptionType.EMAIL,
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
