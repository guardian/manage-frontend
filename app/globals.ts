export interface Globals {
  domain: string;
  dsn: string | null;
  experimentFlags?: {
    showSwitchToContributionPlaceholder?: true;
  };
}

declare global {
  interface Window {
    gaData?: any;
    guardian: Globals;
  }
}
