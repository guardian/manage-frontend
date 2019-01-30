import { OphanComponentEvent } from "./ophanTypes";

export interface Globals {
  domain: string;
  dsn: string | null;
  supportedBrowser: boolean;
  spaTransition?: true;
  INTCMP?: string;
  ophan?: {
    viewId: string;
    record: (payload: { componentEvent: OphanComponentEvent }) => void;
    sendInitialEvent: (url?: string, referer?: string) => void;
  };
}

declare global {
  interface Window {
    guardian: Globals;
  }
}
