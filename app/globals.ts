export interface Globals {
  domain: string;
  dsn: string | null;
  supportedBrowser: boolean;
  spaTransition?: true;
  INTCMP?: string;
  ophan?: {
    viewId: string;
    record: RecordOphanComponentEvent;
    sendInitialEvent: (url?: string, referer?: string) => void;
  };
}

export type RecordOphanComponentEvent = (
  payload: { componentEvent: OphanComponentEvent }
) => void;

export interface OphanComponentEvent {
  component: string;
  action: string;
  value?: string;
}

declare global {
  interface Window {
    guardian: Globals;
  }
}
