import { APIUseCredentials, identityFetch } from "./fetch";

interface Subscription {
  listId: number;
}

export const read = async (): Promise<string[]> => {
  const url = "/users/me/newsletters";
  const data = await identityFetch(url, APIUseCredentials({}));
  return data.result.subscriptions.map((s: Subscription) =>
    s.listId.toString()
  );
};
