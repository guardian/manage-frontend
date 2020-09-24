import {
  getScopeFromRequestPathOrEmptyString,
  X_GU_ID_FORWARDED_SCOPE
} from "../../../shared/identity";
import AsyncLoader from "../asyncLoader";

export interface CancellationDateResponse {
  cancellationEffectiveDate: string;
}

export class CancellationDateAsyncLoader extends AsyncLoader<
  CancellationDateResponse
> {}

export const cancellationDateFetcher = (subscriptionName: string) => () =>
  fetch("/api/cancellation-date/" + subscriptionName, {
    credentials: "include",
    mode: "same-origin",
    headers: {
      [X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
        window.location.href
      )
    }
  });
