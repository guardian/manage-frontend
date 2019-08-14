import { IdentityLocations } from "../IdentityLocations";

const handleResponseFailure = async (response: Response) => {
  let err;
  // json() and text() can only be used once on a response, so a copy is needed
  const responseCopy = response.clone();
  try {
    err = await response.json();
  } catch (e) {
    err = await responseCopy.text();
  }
  throw new Error(`Response error: ${err}`);
};

const handleResponseSuccess = async (response: Response) => {
  try {
    return await response.json();
  } catch (e) {
    throw new Error(`Error decoding JSON response: ${e}`);
  }
};

export const APIFetch = (baseUrl: string) => async (
  url: string,
  options?: RequestInit
): Promise<any> => {
  const response = await fetch(baseUrl + url, options);
  if (!response.ok) {
    await handleResponseFailure(response);
  } else if (response.status === 204) {
    return null;
  } else {
    return await handleResponseSuccess(response);
  }
};

export const APIPatchOptions = (payload: any): RequestInit => ({
  method: "PATCH",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(payload)
});

export const APIUseCredentials = (options: RequestInit): RequestInit => ({
  ...options,
  credentials: "include"
});

export const identityFetch = APIFetch(IdentityLocations.IDAPI);
