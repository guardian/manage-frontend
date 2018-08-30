export interface Globals {
  domain: string;
  dsn: string | null;
  supportedBrowser: boolean;
  experimentFlags?: {
    [experimentFlagName: string]: true;
  };
}

declare global {
  interface Window {
    guardian: Globals;
  }
}
