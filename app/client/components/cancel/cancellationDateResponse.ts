import {
  getScopeFromRequestPathOrEmptyString,
  X_GU_ID_FORWARDED_SCOPE
} from "../../../shared/identity";
import { fetchWithDefaultParameters } from "../../fetch";
import {Action} from "react-fetching-library";
import {credentialHeaders, defaultScopeHeader} from "../../fetchClient";

export interface CancellationDateResponse {
  cancellationEffectiveDate: string;
}

export const cancellationDateFetcher = (subscriptionName: string) => () =>
  fetchWithDefaultParameters("/api/cancellation-date/" + subscriptionName, {
    headers: {
      [X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
        window.location.href
      )
    }
  });

export const cancellationDateEndpoint = (subscriptionName: string): Action<CancellationDateResponse> => ({
  method: 'GET',
  endpoint: "/api/cancellation-date/" + subscriptionName,
  headers: {
    ...defaultScopeHeader
  },
  ...credentialHeaders
})