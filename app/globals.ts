export interface Globals {
  domain: string;
}

declare global {
  interface Window {
    guardian: Globals;
  }
}
