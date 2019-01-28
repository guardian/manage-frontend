import AsyncLoader from "../client/components/asyncLoader";

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
    weeklySubscriber: boolean;
  };
  alertAvailableFor?: string;
}

export const fetchMe: () => Promise<Response> = async () =>
  await fetch("/api/me", { credentials: "include" });

export class MeAsyncLoader extends AsyncLoader<MeResponse> {}
