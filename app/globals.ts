export interface Globals {
  domain: string;
  dsn: string | null;
}

declare global {
  interface Window {
    guardian: Globals;
  }
}
