import {createClient} from "react-fetching-library";
import {trackEvent} from "./components/analytics";
import * as Sentry from "@sentry/browser";
import type {Action} from "react-fetching-library";
import {getScopeFromRequestPathOrEmptyString, X_GU_ID_FORWARDED_SCOPE} from "../shared/identity";

export const errorInterceptor = (_: any) => async (_: Action, response: any) => {
    // if (response.status in allErrorStatuses) {
    if(response.error) {
        const locationHeader = response.headers.get("Location");

        if (response.status === 401 && locationHeader && window !== undefined) {
            window.location.replace(locationHeader);
        }

        trackEvent({
            eventCategory: "asyncLoader",
            eventAction: "error",
            eventLabel: response.error ? response.error.toString() : undefined
        });
        Sentry.captureException(response.error);
    }

    return response;
};

export const fetchClient = createClient({
    responseInterceptors: [errorInterceptor]
});

export const allErrorStatuses = [400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 422, 425, 426, 428, 429, 431, 451, 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511];

export const credentialHeaders = {
    credentials: "include",
    mode: "same-origin"
};

export const emitErrorForAllStatuses = {
    emitErrorForStatuses: allErrorStatuses
};

export const defaultScopeHeader = {
    [X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
        window.location.href
    )
}