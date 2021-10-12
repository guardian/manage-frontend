import {createClient} from "react-fetching-library";

export const fetchClient = createClient();

export const allErrorStatuses = [100, 101, 103, 200, 201, 202, 203, 204, 205, 206, 300, 301, 302, 303, 304, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 422, 425, 426, 428, 429, 431, 451, 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511];

export const credentialHeaders = {
    credentials: "include",
    mode: "same-origin"
};

export const emitErrorForAllStatuses = {
    emitErrorForStatuses: allErrorStatuses
};
