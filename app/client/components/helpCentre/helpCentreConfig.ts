interface Link {
  id: string;
  title: string;
  link: string;
}

export interface HelpCentreTopic {
  id: string;
  title: string;
  links: Link[];
  seeAllLink: string;
}

export const helpCentreConfig: HelpCentreTopic[] = [
  {
    id: "delivery",
    title: "Delivery",
    links: [
      {
        id: "q1",
        title: "I need to pause my delivery",
        link: "/help-centre/article/i-need-to-pause-my-delivery"
      },
      {
        id: "q2",
        title: "My delivery is late or missing",
        link: "/help-centre/article/my-delivery-is-late-or-missing"
      },
      {
        id: "q3",
        title: "I need to change my delivery address",
        link: "/help-centre/article/i-need-to-change-my-delivery-address"
      },
      {
        id: "q4",
        title: "I need to redirect my delivery",
        link: "/help-centre/article/how-can-i-redirect-my-delivery"
      },
      {
        id: "q5",
        title: "My paper is missing a section",
        link: "/help-centre/article/my-paper-is-missing-a-section"
      }
    ],
    seeAllLink: "/help-centre/topic/delivery"
  },
  {
    id: "billing",
    title: "Billing",
    links: [
      {
        id: "q1",
        title: "How do I update my payment details?",
        link: "/help-centre/article/how-do-i-update-my-payment-details"
      },
      {
        id: "q2",
        title: "Where can I see my payments?",
        link: "/help-centre/article/where-can-i-see-my-payments"
      },
      {
        id: "q3",
        title: "I want to cancel my regular payments to you",
        link: "/help-centre/article/i-want-to-cancel-my-regular-payments-to-you"
      },
      {
        id: "q4",
        title: "What payment methods do you accept?",
        link: "/help-centre/article/what-payment-methods-do-you-accept"
      },
      {
        id: "q5",
        title: "Changing my contribution amount",
        link: "/help-centre/article/changing-my-contribution-amount"
      }
    ],
    seeAllLink: "/help-centre/topic/billing"
  },
  {
    id: "accounts-and-sign-in",
    title: "Accounts & Sign in",
    links: [
      {
        id: "q1",
        title: "I need help signing in",
        link: "/help-centre/article/i-need-help-signing-in-on-your-website"
      },
      {
        id: "q2",
        title: "I've forgotten my password",
        link: "/help-centre/article/ive-forgotten-my-password"
      },
      {
        id: "q3",
        title: "I need to change my contact details",
        link: "/help-centre/article/i-need-to-change-my-contact-details"
      },
      {
        id: "q4",
        title: "I want to delete my account",
        link: "/help-centre/article/i-want-to-delete-my-account"
      },
      {
        id: "q5",
        title: "Signing in on multiple devices",
        link: "/help-centre/article/signing-in-on-multiple-devices"
      }
    ],
    seeAllLink: "/help-centre/topic/accounts"
  },
  {
    id: "website",
    title: "The Guardian Website",
    links: [
      {
        id: "q1",
        title: "Why am I still seeings ads/banners?",
        link: "/help-centre/article/why-am-i-still-seeing-adsbanners"
      },
      {
        id: "q2",
        title: "I need to report a bug with your app/website",
        link: "/help-centre/article/ive-found-a-bug-how-can-i-report-it"
      },
      {
        id: "q3",
        title: "I'm unable to comment and need help",
        link: "/help-centre/article/im-unable-to-comment-and-need-help"
      },
      {
        id: "q4",
        title: "I'd like to complain about an advertisement",
        link:
          "/help-centre/article/id-like-to-make-a-complaint-about-an-advertisement"
      },
      {
        id: "q5",
        title: "Can I read your paper/magazines online?",
        link: "/help-centre/article/can-i-read-your-papermagazines-online"
      }
    ],
    seeAllLink: "/help-centre/topic/website"
  },
  {
    id: "journalism",
    title: "Journalism",
    links: [
      {
        id: "q1",
        title: "I need to submit a correction or report a broken link",
        link:
          "/help-centre/article/i-need-to-submit-a-correction-or-report-a-broken-link"
      },
      {
        id: "q2",
        title: "I want to make a complaint about your journalism",
        link:
          "https://www.theguardian.com/info/2014/sep/12/-sp-how-to-make-a-complaint-about-guardian-or-observer-content"
      },
      {
        id: "q3",
        title: "I'd like to offer you a contribution as a freelancer",
        link:
          "https://www.theguardian.com/info/1999/nov/22/contributors-guide-and-contacts"
      },
      {
        id: "q4",
        title: "I'd like to submit an idea for a story",
        link:
          "https://www.theguardian.com/community/2015/sep/02/guardianwitness-send-us-a-story"
      },
      {
        id: "q5",
        title:
          "I'd like to contact one of your journalists or desks for another reason",
        link: "/help-centre/contact-us"
      }
    ],
    seeAllLink: "/help-centre/topic/journalism"
  },
  {
    id: "subscriptions",
    title: "Print Subscriptions",
    links: [
      {
        id: "q1",
        title: "Where do you deliver and when?",
        link: "/help-centre/article/where-and-when-we-deliver"
      },
      {
        id: "q2",
        title: "Where can I pick up my papers?",
        link:
          "/help-centre/article/im-a-print-subscriber-where-can-i-pick-up-my-papers"
      },
      {
        id: "q3",
        title: "I'm having trouble redeeming my paper",
        link:
          "/help-centre/article/what-to-do-if-youre-having-trouble-redeeming"
      },
      {
        id: "q4",
        title: "I've lost my vouchers",
        link: "/help-centre/article/ive-lost-my-vouchers"
      },
      {
        id: "q5",
        title: "I want to cancel my subscription",
        // update?
        link: "/help-centre/article/i-want-to-cancel-my-subscription"
      }
    ],
    seeAllLink: "/help-centre/topic/subscriptions"
  }
];

export interface HelpCentreMoreQuestionsTopic {
  id: string;
  title: string;
  links: Link[];
}

export const helpCentreMoreQuestionsConfig: HelpCentreMoreQuestionsTopic[] = [
  {
    id: "the-guardian-apps",
    title: "The Guardian apps",
    links: [
      {
        id: "q1",
        title: "Premium tier access",
        link:
          "/help-centre/article/how-can-i-gain-access-to-the-premium-tier-of-your-app"
      },
      {
        id: "q2",
        title: "Apple/Google subscriptions",
        link:
          "/help-centre/article/i-have-a-googleitunes-subscription-that-i-need-help-with"
      },
      {
        id: "q3",
        title: "Personalising your apps",
        link: "/help-centre/article/making-your-app-more-personal"
      },
      {
        id: "q4",
        title: "Device compatability",
        link: "/help-centre/article/what-devices-are-compatible-with-your-apps"
      },
      {
        id: "q5",
        title: "Getting started with your Digital Subscription",
        link:
          "/help-centre/article/getting-started-with-your-digital-subscription"
      }
    ]
  },
  {
    id: "newsletters-and-emails",
    title: "Newsletters and emails",
    links: [
      {
        id: "q1",
        title: "I'm not receiving any emails from you but think I should be",
        link:
          "/help-centre/article/im-not-receiving-emails-from-you-but-think-i-should-be"
      },
      {
        id: "q2",
        title: "Manage your email preferences",
        link: "/help-centre/article/i-need-to-update-my-email-preferences"
      },
      {
        id: "q3",
        title: "Subscribe to our newsletters",
        link: "/help-centre/article/subscribe-to-our-newsletters-and-emails"
      }
    ]
  },
  {
    id: "events",
    title: "Events",
    links: [
      {
        id: "q1",
        title:
          "I can no longer attend the live online event, can I have a refund?",
        link:
          "/help-centre/article/i-can-no-longer-attend-the-live-online-event-can-i-have-a-refund"
      },
      {
        id: "q2",
        title:
          "I can’t find my original confirmation email, can you resend me the event link?",
        link:
          "/help-centre/article/i-cant-find-my-original-confirmation-email-can-you-resend-me-the-event-link"
      },
      {
        id: "q3",
        title:
          "Once I have purchased a ticket, how will I attend the online event?",
        link:
          "/help-centre/article/once-i-have-purchased-a-ticket-how-will-i-attend-the-online-event"
      },
      {
        id: "q4",
        title: "I purchased a book with my ticket, when will I receive this?",
        link:
          "/help-centre/article/i-purchased-a-book-with-my-ticket-when-will-i-receive-this"
      }
    ]
  },
  // Masterclasses
  {
    id: "gifting",
    title: "Gifting",
    links: [
      {
        id: "q1",
        title: "Gifting a Digital Subscription",
        link: "/help-centre/article/gifting-a-digital-subscription"
      },
      {
        id: "q2",
        title: "Gifting the Guardian Weekly",
        link: "/help-centre/article/gifting-the-guardian-weekly"
      },
      {
        id: "q3",
        title: "My gift recipient hasn't recieved their gift",
        link: "/help-centre/article/my-gift-recipient-hasnt-received-their-gift"
      },
      {
        id: "q4",
        title: "I've accidentally entered the wrong details when gifting",
        link: "/help-centre/article/ive-accidentally-entered-the-wrong-details"
      },
      {
        id: "q5",
        title:
          "The person I bought a gift for already has a subscription, can I get a refund?",
        link:
          "/help-centre/article/the-person-i-bought-a-gift-for-already-has-a-subscription-can-i-get-a-refund"
      }
    ]
  },
  {
    id: "back-issues-and-archives",
    title: "Back issues and archives",
    links: [
      {
        id: "q1",
        title: "Finding articles from the past in digital format",
        link:
          "/help-centre/article/finding-articles-from-the-past-in-digital-format"
      },
      {
        id: "q2",
        title: "Old newspapers in physical format",
        link: "/help-centre/article/old-newspapers-in-physical-format"
      }
    ]
  }
];

export interface HelpCentreNavConfig {
  id: string;
  title: string;
}

export const helpCentreNavConfig: HelpCentreNavConfig[] = [
  { id: "delivery", title: "Delivery" },
  { id: "billing", title: "Billing" },
  { id: "accounts", title: "Accounts & Sign in" },
  { id: "website", title: "The Guardian Website" },
  { id: "journalism", title: "Journalism" },
  { id: "subscriptions", title: "Print Subscriptions" },
  { id: "more-topics", title: "More Topics" }
];
