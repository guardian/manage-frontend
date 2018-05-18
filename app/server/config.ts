declare var DOMAIN: string;

declare var SERVER_DSN: string;
declare var BUILD: string;

export default class Config {
  public static readonly DOMAIN: string = DOMAIN;
  public static readonly SERVER_DSN = SERVER_DSN;
  public static readonly BUILD = BUILD;
}
