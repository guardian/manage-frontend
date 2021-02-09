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
        link:
          "https://www.theguardian.com/help/2020/nov/17/i-need-to-pause-my-delivery"
      },
      {
        id: "q2",
        title: "My delivery is late or missing",
        link:
          "https://www.theguardian.com/help/2020/nov/17/my-delivery-is-late-or-missing"
      },
      {
        id: "q3",
        title: "I need to change my delivery address",
        link:
          "https://www.theguardian.com/help/2020/nov/17/i-need-to-change-my-delivery-address"
      },
      {
        id: "q4",
        title: "I need to redirect my delivery",
        link:
          "https://www.theguardian.com/help/2020/nov/17/how-can-i-redirect-my-delivery"
      },
      {
        id: "q5",
        title: "My paper is missing a section",
        link:
          "https://www.theguardian.com/help/2020/nov/17/my-paper-is-missing-a-section"
      }
    ],
    seeAllLink:
      "https://www.theguardian.com/help/2021/feb/03/all-delivery-topics"
  },
  {
    id: "billing",
    title: "Billing",
    links: [
      {
        id: "q1",
        title: "How do I update my payment details?",
        link:
          "https://www.theguardian.com/help/2020/nov/17/how-do-i-update-my-payment-details"
      },
      {
        id: "q2",
        title: "Where can I see my payments?",
        link:
          "https://www.theguardian.com/help/2020/nov/18/where-can-i-see-my-payments"
      },
      {
        id: "q3",
        title: "I want to cancel my regular payments to you",
        link:
          "https://www.theguardian.com/help/2020/nov/18/i-want-to-cancel-my-regular-payments-to-you"
      },
      {
        id: "q4",
        title: "What payment methods do you accept?",
        link:
          "https://www.theguardian.com/help/2020/nov/18/what-payment-methods-do-you-accept"
      },
      {
        id: "q5",
        title: "Changing my contribution amount",
        link:
          "https://www.theguardian.com/help/2021/jan/27/changing-my-contribution-amount"
      }
    ],
    seeAllLink:
      "https://www.theguardian.com/help/2021/feb/03/all-billing-topics"
  },
  {
    id: "accounts-and-sign-in",
    title: "Accounts & Sign in",
    links: [
      {
        id: "q1",
        title: "I need help signing in",
        link:
          "https://www.theguardian.com/help/2020/nov/19/i-need-help-signing-in-on-your-website"
      },
      {
        id: "q2",
        title: "I've forgotten my password",
        link:
          "https://www.theguardian.com/help/2020/nov/19/ive-forgotten-my-password"
      },
      {
        id: "q3",
        title: "I need to change my contact details",
        link:
          "https://www.theguardian.com/help/2020/nov/19/i-need-to-change-my-contact-details"
      },
      {
        id: "q4",
        title: "I want to delete my account",
        link:
          "https://www.theguardian.com/help/2021/jan/28/i-want-to-delete-my-account"
      },
      {
        id: "q5",
        title: "Signing in on multiple devices",
        link:
          "https://www.theguardian.com/help/2021/jan/28/signing-in-on-multiple-devices"
      }
    ],
    seeAllLink:
      "https://www.theguardian.com/help/2021/feb/03/all-accounts-sign-in-topics"
  },
  {
    id: "the-guardian-website",
    title: "The Guardian Website",
    links: [
      {
        id: "q1",
        title: "Why am I still seeings ads/banners?",
        link:
          "https://www.theguardian.com/help/2020/nov/19/why-am-i-still-seeing-adsbanners"
      },
      {
        id: "q2",
        title: "I need to report a bug with your app/website",
        link:
          "https://www.theguardian.com/help/2020/nov/18/ive-found-a-bug-how-can-i-report-it"
      },
      {
        id: "q3",
        title: "I'm unable to comment and need help",
        link:
          "https://www.theguardian.com/help/2020/nov/19/im-unable-to-comment-and-need-help"
      },
      {
        id: "q4",
        title: "I'd like to complain about an advertisement",
        link:
          "https://www.theguardian.com/help/2021/feb/03/id-like-to-make-a-complaint-about-an-advertisement"
      },
      {
        id: "q5",
        title: "Can I read your paper/magazines online?",
        link:
          "https://www.theguardian.com/help/2021/jan/28/can-i-read-your-papermagazines-online"
      }
    ],
    seeAllLink:
      "https://www.theguardian.com/help/2021/feb/03/all-website-topics"
  },
  {
    id: "journalism",
    title: "Journalism",
    links: [
      {
        id: "q1",
        title: "I need to submit a correction or report a broken link",
        link:
          "https://www.theguardian.com/help/2020/nov/19/i-need-to-submit-a-correction-or-report-a-broken-link"
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
        link: "https://www.theguardian.com/help/contact-us"
      }
    ],
    seeAllLink:
      "https://www.theguardian.com/help/2021/feb/03/all-journalism-topics"
  },
  {
    id: "print-subscriptions",
    title: "Print Subscriptions",
    links: [
      {
        id: "q1",
        title: "Where do you deliver and when?",
        link:
          "https://www.theguardian.com/help/2021/jan/13/where-and-when-we-deliver"
      },
      {
        id: "q2",
        title: "Where can I pick up my papers?",
        link:
          "https://www.theguardian.com/help/2020/nov/20/im-a-print-subscriber-where-can-i-pick-up-my-papers"
      },
      {
        id: "q3",
        title: "I'm having trouble redeeming my paper",
        link:
          "https://www.theguardian.com/help/2021/jan/13/what-to-do-if-youre-having-trouble-redeeming"
      },
      {
        id: "q4",
        title: "I've lost my vouchers",
        link:
          "https://www.theguardian.com/help/2021/jan/15/ive-lost-my-vouchers"
      },
      {
        id: "q5",
        title: "I want to cancel my subscription",
        // update?
        link:
          "https://www.theguardian.com/help/2020/nov/20/i-want-to-cancel-my-subscription"
      }
    ],
    seeAllLink:
      "https://www.theguardian.com/help/2021/feb/03/all-print-subscriptions-topics"
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
          "https://www.theguardian.com/help/2020/nov/18/how-can-i-gain-access-to-the-premium-tier-of-your-app"
      },
      {
        id: "q2",
        title: "Apple/Google subscriptions",
        link:
          "https://www.theguardian.com/help/2020/nov/20/i-have-a-googleitunes-subscription-that-i-need-help-with"
      },
      {
        id: "q3",
        title: "Personalising your apps",
        link:
          "https://www.theguardian.com/help/2018/apr/18/making-your-app-more-personal"
      },
      {
        id: "q4",
        title: "Device compatability",
        link:
          "https://www.theguardian.com/help/2020/nov/18/what-devices-are-compatible-with-your-apps"
      },
      {
        id: "q5",
        title: "Getting started with your Digital Subscription",
        link:
          "https://www.theguardian.com/help/2021/feb/08/getting-started-with-your-digital-subscription"
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
          "https://www.theguardian.com/help/2021/jan/13/im-not-receiving-emails-from-you-but-think-i-should-be"
      },
      {
        id: "q2",
        title: "Manage your email preferences",
        link:
          "https://www.theguardian.com/help/2020/nov/19/i-need-to-update-my-email-preferences"
      },
      {
        id: "q3",
        title: "Subscribe to our newsletters",
        link:
          "https://www.theguardian.com/help/2021/jan/15/subscribe-to-our-newsletters-and-emails"
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
          "https://www.theguardian.com/help/2021/jan/15/i-can-no-longer-attend-the-live-online-event-can-i-have-a-refund"
      },
      {
        id: "q2",
        title:
          "I can’t find my original confirmation email, can you resend me the event link?",
        link:
          "https://www.theguardian.com/help/2021/jan/15/i-cant-find-my-original-confirmation-email-can-you-resend-me-the-event-link"
      },
      {
        id: "q3",
        title:
          "Once I have purchased a ticket, how will I attend the online event?",
        link:
          "https://www.theguardian.com/help/2021/jan/15/once-i-have-purchased-a-ticket-how-will-i-attend-the-online-event"
      },
      {
        id: "q4",
        title: "I purchased a book with my ticket, when will I receive this?",
        link:
          "https://www.theguardian.com/help/2021/jan/15/i-purchased-a-book-with-my-ticket-when-will-i-receive-this"
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
        link:
          "https://www.theguardian.com/help/2021/jan/15/gifting-a-digital-subscription"
      },
      {
        id: "q2",
        title: "Gifting the Guardian Weekly",
        link:
          "https://www.theguardian.com/help/2021/jan/12/gifting-the-guardian-weekly"
      },
      {
        id: "q3",
        title: "My gift recipient hasn't recieved their gift",
        link:
          "https://www.theguardian.com/help/2021/jan/15/my-gift-recipient-hasnt-received-their-gift"
      },
      {
        id: "q4",
        title: "I've accidentally entered the wrong details when gifting",
        link:
          "https://www.theguardian.com/help/2021/jan/15/ive-accidentally-entered-the-wrong-details"
      },
      {
        id: "q5",
        title:
          "The person I bought a gift for already has a subscription, can I get a refund?",
        link:
          "https://www.theguardian.com/help/2021/jan/15/the-person-i-bought-a-gift-for-already-has-a-subscription-can-i-get-a-refund"
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
          "https://www.theguardian.com/help/2021/jan/15/finding-articles-from-the-past-in-digital-format"
      },
      {
        id: "q2",
        title: "Old newspapers in physical format",
        link:
          "https://www.theguardian.com/help/2021/jan/15/old-newspapers-in-physical-format"
      }
    ]
  }
];
