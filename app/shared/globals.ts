import { AbTest, OphanComponentEvent } from "./ophanTypes";

export interface CommonGlobals {
  domain: string;
  dsn: string | null;
  polyfilled?: boolean;
  onPolyfilled?: () => void;
}

export interface Globals extends CommonGlobals {
  spaTransition?: true;
  INTCMP?: string;
  ophan?: {
    viewId: string;
    record: (payload: { componentEvent: OphanComponentEvent }) => void;
    sendInitialEvent: (url?: string, referer?: string) => void;
  };
  abTest?: AbTest;
  identityDetails: IdentityDetails;
}

declare global {
  interface Window {
    guardian: Globals;
  }
}
