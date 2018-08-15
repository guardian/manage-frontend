export interface Globals {
  domain: string;
  dsn: string | null;
  experimentFlags?: {
    [experimentFlagName: string]: true;
  };
}

declare global {
  interface Window {
    guardian: Globals;
  }
}
