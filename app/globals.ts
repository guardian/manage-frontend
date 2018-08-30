export interface Globals {
  domain: string;
  dsn: string | null;
  supportedBrowser: boolean;
}

declare global {
  interface Window {
    guardian: Globals;
  }
}
