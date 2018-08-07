import { conf } from "../../../server/config";

let domain: string;
if (typeof window !== "undefined" && window.guardian) {
  domain = window.guardian.domain;
} else {
  domain = conf.DOMAIN;
}

export interface FooterLink {
  title: string;
  link: string;
}

export const footerLinks: FooterLink[][] = [
  [
    {
      title: "jobs",
      link: `https://jobs${domain}/?INTCMP=NGW_FOOTER_UK_GU_JOBS`
    },
    {
      title: "dating",
      link: `https://soulmates${domain}/?INTCMP=NGW_FOOTER_UK_GU_SOULMATES`
    },
    {
      title: "make a contribution",
      link: `https://support${domain}/contribute?INTCMP=footer_support_contribute&acquisitionData=%7B%22source%22%3A%22GUARDIAN_WEB%22%2C%22componentType%22%3A%22ACQUISITIONS_FOOTER%22%2C%22componentId%22%3A%22footer_support_contribute%22%2C%22referrerPageviewId%22%3A%22jki3y55zbo7ri6mlon9r%22%2C%22referrerUrl%22%3A%22https%3A%2F%2Fprofile${domain}%2Fmembership%2Fedit%22%7D`
    },
    {
      title: "subscribe",
      link: `https://support${domain}/subscribe?INTCMP=footer_support_subscribe&acquisitionData=%7B%22source%22%3A%22GUARDIAN_WEB%22%2C%22componentType%22%3A%22ACQUISITIONS_FOOTER%22%2C%22componentId%22%3A%22footer_support_subscribe%22%2C%22referrerPageviewId%22%3A%22jki3y55zbo7ri6mlon9r%22%2C%22referrerUrl%22%3A%22https%3A%2F%2Fprofile${domain}%2Fmembership%2Fedit%22%7D`
    },
    {
      title: "guardian labs",
      link: `https://www${domain}/guardian-labs`
    }
  ],
  [
    {
      title: "about us",
      link: `https://www${domain}/about`
    },
    {
      title: "work for us",
      link: `https://workforus${domain}/locations/london`
    },
    {
      title: "advertise with us",
      link: `https://advertising${domain}/`
    },
    {
      title: "contact us",
      link: `https://www${domain}/help/contact-us`
    },
    {
      title: "help",
      link: `https://www${domain}/help`
    }
  ],
  [
    {
      title: "terms & conditions",
      link: `https://www${domain}/help/terms-of-service`
    },
    {
      title: "privacy policy",
      link: `https://www${domain}/info/privacy`
    },
    {
      title: "cookie policy",
      link: `https://www${domain}/info/cookies`
    },
    {
      title: "securedrop",
      link: `https://securedrop${domain}/`
    },
    {
      title: "digital newspaper archive",
      link: `https://theguardian.newspapers.com/`
    },
    {
      title: "complaints & corrections",
      link: `https://www${domain}/info/complaints-and-corrections`
    }
  ],
  [
    {
      title: "all topics",
      link: `https://www${domain}/index/subjects/a`
    },
    {
      title: "all contributors",
      link: `https://www${domain}/index/contributors`
    },
    {
      title: "modern slavery act",
      link: `https://www${domain}/info/2016/jul/27/modern-slavery-and-our-supply-chains?INTCMP=NGW_FOOTER_UK_GU_MODERN_SLAVERY_ACT`
    },
    {
      title: "facebook",
      link: `https://www.facebook.com/theguardian`
    },
    {
      title: "twitter",
      link: `https://twitter.com/guardian`
    }
  ]
];
