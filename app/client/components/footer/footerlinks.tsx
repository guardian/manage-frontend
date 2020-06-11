import { conf } from "../../../server/config";

let domain: string;
if (typeof window !== "undefined" && window.guardian) {
  domain = window.guardian.domain;
} else {
  domain = conf.DOMAIN;
}

interface FooterLink {
  title: string;
  link: string;
}

export const footerLinks: FooterLink[][] = [
  [
    {
      title: "About us",
      link: `https://${domain}/about`
    },
    {
      title: "Contact us",
      link: `https://${domain}/help/contact-us`
    },
    {
      title: "Complaints & corrections",
      link: `https://${domain}/info/complaints-and-corrections`
    },
    {
      title: "Secure Drop",
      link: `https://${domain}/securedrop`
    },
    {
      title: "Work for us",
      link: `https://workforus.${domain}`
    },
    {
      title: "Privacy policy",
      link: `https://${domain}/info/privacy`
    },
    {
      title: "Cookie policy",
      link: `https://${domain}/info/cookies`
    },
    {
      title: "Terms & conditions",
      link: `https://www.${domain}/help/terms-of-service`
    },
    {
      title: "Help",
      link: `https://www.${domain}/help`
    }
  ],
  [
    {
      title: "All topics",
      link: `https://${domain}/index/subjects/a`
    },
    {
      title: "All writers",
      link: `https://${domain}/index/contributors`
    },
    {
      title: "Modern Slavery Act",
      link: `https://${domain}/info/2016/jul/27/modern-slavery-and-our-supply-chains?INTCMP=NGW_FOOTER_UK_GU_MODERN_SLAVERY_ACT`
    },
    {
      title: "Digital newspaper archive",
      link: `https://theguardian.newspapers.com/`
    },
    {
      title: "Facebook",
      link: `https://www.facebook.com/theguardian`
    },
    {
      title: "Twitter",
      link: `https://twitter.com/guardian`
    }
  ],
  [
    {
      title: "Advertise with us",
      link: `https://advertising.${domain}`
    },
    {
      title: "Guardian Labs",
      link: `https://${domain}/guardian-labs`
    },
    {
      title: "Search jobs",
      link: `https://jobs.${domain}/?INTCMP=NGW_FOOTER_UK_GU_JOBS`
    },
    {
      title: "Dating",
      link: `https://soulmates.${domain}/?INTCMP=NGW_FOOTER_UK_GU_SOULMATES`
    },
    {
      title: "Patrons",
      link: `https://patrons.${domain}/?INTCMP=footer_patrons`
    },
    {
      title: "Discount Codes",
      link: `https://discountcode.${domain}/uk?INTCMP=guardian_footer`
    }
  ]
];
