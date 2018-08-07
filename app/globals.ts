export interface Globals {
  domain: string;
  dsn: string | null;
}

declare global {
  interface Window {
    gaData?: any;
    guardian: Globals;
  }
}
