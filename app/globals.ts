export interface Globals {
  domain: string;
  dsn: string | null;
  supportedBrowser: boolean;
  ophan?: {
    // viewId: string;
    record: RecordOphanComponentEvent;
    // sendInitialEvent: () => void;
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
