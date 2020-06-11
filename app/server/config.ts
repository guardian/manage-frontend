interface Config {
  readonly STAGE: string;
  readonly DOMAIN: string;
  readonly API_DOMAIN: string;
  readonly ENVIRONMENT: Environments;
  readonly BUILD: string;
  readonly CLIENT_DSN: string | null;
  readonly SERVER_DSN: string | null;
}

declare var process: {
  env: {
    [key: string]: string | undefined;
  };
};

const getConfig: (name: string) => string | null = name => {
  const value = name in process.env && process.env[name];

  return value || null; // or empty string as typescript not happy about throw
};

export enum Environments {
  PRODUCTION,
  DEVELOPMENT
}

export const conf: Config = {
  STAGE: getConfig("STAGE") || "DEV",
  DOMAIN: getConfig("DOMAIN") || "thegulocal.com",
  API_DOMAIN: getConfig("API_DOMAIN") || "code.dev-guardianapis.com",
  BUILD: getConfig("BUILD") || "DEV",
  ENVIRONMENT:
    getConfig("NODE_ENV") === "production"
      ? Environments.PRODUCTION
      : Environments.DEVELOPMENT,
  CLIENT_DSN: getConfig("CLIENT_DSN"),
  SERVER_DSN: getConfig("SERVER_DSN")
};
