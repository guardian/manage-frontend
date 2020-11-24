export interface HelpCentreTopic {
  id: string;
  title: string;
  links: Array<{ title: string; link: string }>;
  seeAllLink: string;
}

export const helpCentreConfig: HelpCentreTopic[] = [
  {
    id: "delivery",
    title: "Delivery",
    links: [
      {
        title: "I need to pause my delivery",
        link:
          "https://www.theguardian.com/help/2020/nov/17/i-need-to-pause-my-delivery"
      },
      {
        title: "My delivery is late or missing",
        link:
          "https://www.theguardian.com/help/2020/nov/17/my-delivery-is-late-or-missing"
      },
      {
        title: "I need to change my delivery address",
        link:
          "https://www.theguardian.com/help/2020/nov/17/i-need-to-change-my-delivery-address"
      },
      {
        title: "Can I redirect my delivery?",
        link:
          "https://www.theguardian.com/help/2020/nov/17/how-can-i-redirect-my-delivery"
      },
      {
        title: "My paper is missing a section",
        link:
          "https://www.theguardian.com/help/2020/nov/17/my-paper-is-missing-a-section"
      }
    ],
    seeAllLink:
      "https://www.theguardian.com/help/2017/dec/11/help-with-delivery"
  },
  {
    id: "billing",
    title: "Billing",
    links: [
      {
        title: "How do I update my payment details?",
        link:
          "https://www.theguardian.com/help/2020/nov/17/how-do-i-update-my-payment-details"
      },
      {
        title: "Where can I see my payments?",
        link:
          "https://www.theguardian.com/help/2020/nov/18/where-can-i-see-my-payments"
      },
      {
        title: "I want to cancel my regular payments to you",
        link:
          "https://www.theguardian.com/help/2020/nov/18/i-want-to-cancel-my-regular-payments-to-you"
      },
      {
        title: "What payment methods you accept?",
        link:
          "https://www.theguardian.com/help/2020/nov/18/what-payment-methods-do-you-accept"
      },
      {
        title: "Can I change my payment to a different currency?",
        link:
          "https://www.theguardian.com/help/2020/nov/26/can-i-change-my-payment-to-a-different-currency"
      }
    ],
    seeAllLink: "https://www.theguardian.com/help/2019/dec/13/payment-faqs"
  },
  {
    id: "apps-and-website",
    title: "Apps & Website",
    links: [
      {
        title: "I need to report a bug with your app/website",
        link:
          "https://www.theguardian.com/help/2020/nov/18/ive-found-a-bug-how-can-i-report-it"
      },
      {
        title: "What devices are compatible with your apps?",
        link:
          "https://www.theguardian.com/help/2020/nov/18/what-devices-are-compatible-with-your-apps"
      },
      {
        title: "How can I gain access to the Premium Tier of your app?",
        link:
          "https://www.theguardian.com/help/2020/nov/18/how-can-i-gain-access-to-the-premium-tier-of-your-app"
      },
      {
        title: "Why am I still seeings ads/banners?",
        link:
          "https://www.theguardian.com/help/2020/nov/19/why-am-i-still-seeing-adsbanners"
      },
      {
        title: "I'm unable to comment and need help",
        link:
          "https://www.theguardian.com/help/2020/nov/19/im-unable-to-comment-and-need-help"
      }
    ],
    seeAllLink: "https://www.theguardian.com/help/2020/nov/20/apps-website-help"
  },
  {
    id: "signing-in-and-accounts",
    title: "Signing in & Accounts",
    links: [
      {
        title: "I need help signing in on your website",
        link:
          "https://www.theguardian.com/help/2020/nov/19/i-need-help-signing-in-on-your-website"
      },
      {
        title: "I need help signing in on your app",
        link:
          "https://www.theguardian.com/help/2020/nov/19/i-need-help-signing-in-on-your-app"
      },
      {
        title: "I've forgotten my password",
        link:
          "https://www.theguardian.com/help/2020/nov/19/ive-forgotten-my-password"
      },
      {
        title: "I need to change my contact details",
        link:
          "https://www.theguardian.com/help/2020/nov/19/i-need-to-change-my-contact-details"
      },
      {
        title: "I need to update my email preferences",
        link:
          "https://www.theguardian.com/help/2020/nov/19/i-need-to-update-my-email-preferences"
      }
    ],
    seeAllLink: "https://www.theguardian.com/help/identity-faq"
  },
  {
    id: "journalism",
    title: "Journalism",
    links: [
      {
        title: "I need to submit a correction or report a broken link",
        link:
          "https://www.theguardian.com/help/2020/nov/19/i-need-to-submit-a-correction-or-report-a-broken-link"
      },
      {
        title: "I want to make a complaint about your journalism",
        link:
          "https://www.theguardian.com/info/2014/sep/12/-sp-how-to-make-a-complaint-about-guardian-or-observer-content"
      },
      {
        title: "I'd like to offer you a contribution as a freelancer",
        link:
          "https://www.theguardian.com/info/1999/nov/22/contributors-guide-and-contacts"
      },
      {
        title: "I'd like to submit an idea for a story",
        link:
          "https://www.theguardian.com/community/2015/sep/02/guardianwitness-send-us-a-story"
      },
      {
        title:
          "I'd like to contact one of your journalists or desks for another reason",
        link: "https://www.theguardian.com/help/contact-us"
      }
    ],
    seeAllLink:
      "https://www.theguardian.com/info/contributing-to-the-guardian-and-observer"
  },
  {
    id: "subscriptions",
    title: "Subscriptions",
    links: [
      {
        title:
          "I think I'm a subscriber or supporter, what benefits do I have access to?",
        link:
          "https://www.theguardian.com/help/2020/nov/20/i-think-im-a-subscriber-or-supporter-what-benefits-do-i-have-access-to"
      },
      {
        title: "I have an Apple/iTunes subscription that I need help with",
        link:
          "https://www.theguardian.com/help/2020/nov/20/using-my-subscription-on-multiple-devices"
      },
      {
        title: "Can I use my subscription to log in on multiple devices?",
        link:
          "https://www.theguardian.com/help/2020/nov/20/using-my-subscription-on-multiple-devices"
      },
      {
        title: "I'm a print subscriber, where can I pick up my papers?",
        link:
          "https://www.theguardian.com/help/2020/nov/20/im-a-print-subscriber-where-can-i-pick-up-my-papers"
      },
      {
        title: "I want to cancel my subscription",
        link:
          "https://www.theguardian.com/help/2020/nov/20/i-want-to-cancel-my-subscription"
      }
    ],
    seeAllLink:
      "https://www.theguardian.com/subscriber-direct/subscription-frequently-asked-questions"
  }
];
