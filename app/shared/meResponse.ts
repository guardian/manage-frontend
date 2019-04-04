import AsyncLoader from "../client/components/asyncLoader";
import {
  getScopeFromRequestPathOrEmptyString,
  X_GU_ID_FORWARDED_SCOPE
} from "./identity";

export interface MeResponse {
  userId: string;
  tier: string;
  membershipJoinDate: string;
  contentAccess: {
    member: boolean;
    paidMember: boolean;
    recurringContributor: boolean;
    digitalPack: boolean;
    paperSubscriber: boolean;
    guardianWeeklySubscriber: boolean;
  };
  alertAvailableFor?: string;
}

export const fetchMe: () => Promise<Response> = async () =>
  await fetch("/api/me", {
    credentials: "include",
    headers: {
      [X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
        window.location.href
      )
    }
  });

export class MeAsyncLoader extends AsyncLoader<MeResponse> {}
