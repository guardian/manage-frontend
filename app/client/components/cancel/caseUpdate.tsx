import AsyncLoader from "../asyncLoader";

export interface CaseUpdateResponse {
  message: string;
}

export class CaseUpdateAsyncLoader extends AsyncLoader<CaseUpdateResponse> {}

export const getUpdateCasePromise = (caseId: string, body: object) =>
  fetch("/api/case/" + caseId, {
    credentials: "include",
    method: "PATCH",
    mode: "same-origin",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  });
