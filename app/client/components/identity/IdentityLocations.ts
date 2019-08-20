import { conf } from "../../../server/config";

const url = (subdomain: string, domain: string, path?: string) =>
  `https://${subdomain}.${domain}${path ? path : ""}`;

const DOMAIN =
  typeof window !== "undefined" && window.guardian
    ? window.guardian.domain
    : conf.DOMAIN;

const IMAGE_DOMAIN =
  DOMAIN === "theguardian.com" ? "guim.co.uk" : "guimcode.co.uk";

const IDAPI_URL =
  DOMAIN === "thegulocal.com" ? "/idapicodeproxy" : url("idapi", DOMAIN);

const AVATAR_URL =
  DOMAIN === "thegulocal.com" ? "/avatarcodeproxy" : url("avatar", DOMAIN);

const getIdentityLocations = (domain: string) => ({
  COMMUNITY_FAQS: url("www", domain, "/community-faqs"),
  CHANGE_EMAIL: url("profile", domain, "/account/edit"),
  MANAGE_JOB_ALERTS: url("jobs", domain, "/your-jobs/?ActiveSection=JbeList"),
  VERIFY_EMAIL: url("profile", domain, "/verify-email"),
  IDAPI: IDAPI_URL,
  AVATAR: AVATAR_URL,
  AVATAR_USER_IMAGES: url("avatar", IMAGE_DOMAIN, "/user")
});

export const IdentityLocations = getIdentityLocations(DOMAIN);
