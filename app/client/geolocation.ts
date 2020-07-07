import { getCookie } from "./cookies";

let countryCode: string | null = null;

const getCountryCode = (): string | null => {
  if (countryCode === null) {
    countryCode = getCookie("GU_geo_country");
  }

  return countryCode;
};

export const isInUSA = (): boolean => getCountryCode() === "US";

export const _ = { resetModule: () => (countryCode = null) };
