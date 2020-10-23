import { Topic } from "../shared/contactUsTypes";

export const contactUsConfig: Topic[] = [
  {
    id: "delivery",
    name: "Delivery",
    enquiryLabel: "your delivery problem",
    subTopicsTitle: "sub topic title here",
    subtopics: [
      {
        id: "s1",
        name: "I'm going on holiday and need to pause deliveries"
      },
      {
        id: "s2",
        name: "I need to report a problem with my delivery"
      },
      {
        id: "s3",
        name: "I need to update my delivery details"
      },
      {
        id: "s4",
        name: "Something else",
        editableSubjectLine: true
      }
    ]
  },
  {
    id: "billing",
    name: "Billing",
    enquiryLabel: "your billing enquiry",
    subTopicsTitle: "sub topic title here",
    subtopics: [
      {
        id: "s5",
        name: "I want to update my payment details",
        selfServiceBox: {
          text:
            "Did you know you can suspend your deliveries online by logging in below and selecting ‘Manage Subscription’? It’s easy to use and means you don’t have to wait for a response.",
          linkText: "Go to your account",
          href: "/billing"
        }
      },
      {
        id: "s6",
        name: "My payment has failed"
      },
      {
        id: "s7",
        name: "I would like to see my invoices and payments"
      },
      {
        id: "s8",
        name: "I would like to cancel my payment",
        noForm: true
      },
      {
        id: "s9",
        name: "Something else",
        editableSubjectLine: true
      }
    ]
  },
  {
    id: "vouchers",
    name: "newspaper vouchers",
    enquiryLabel: "your newspaper voucher issue",
    subTopicsTitle: "sub topic title here",
    subtopics: [
      {
        id: "s10",
        name: "I've lost my vouchers"
      },
      {
        id: "s11",
        name: "Something else",
        editableSubjectLine: true
      }
    ]
  },
  {
    id: "account",
    name: "My account",
    enquiryLabel: "your account issue",
    subTopicsTitle: "sub topic title here",
    subtopics: [
      {
        id: "s12",
        name: "Guardian account",
        subsubTopicsTitle: "sub sub topic title here",
        subsubtopics: [
          {
            id: "ss1",
            name: "I don't remember what email I use to sign in with",
            selfServiceBox: {
              text:
                "Did you know you can suspend your deliveries online by logging in below and selecting ‘Manage Subscription’? It’s easy to use and means you don’t have to wait for a response.",
              linkText: "Go to your account",
              href: "/billing"
            },
            noForm: true
          },
          {
            id: "ss2",
            name: "I forgot my password"
          },
          {
            id: "ss3",
            name: "I need to update my account details"
          },
          {
            id: "ss4",
            name: "I want to delete my account"
          },
          {
            id: "ss5",
            name: "Something else",
            editableSubjectLine: true
          }
        ]
      },
      {
        id: "s13",
        name: "Guardian Jobs account",
        subsubTopicsTitle: "sub sub topic title here",
        subsubtopics: [
          {
            id: "ss6",
            name: "I haven't been receiving job alerts"
          },
          {
            id: "ss7",
            name: "I don't remember what email I use to sign in with"
          },
          {
            id: "ss8",
            name: "I forgot my password"
          },
          {
            id: "ss9",
            name: "I need to update my account details"
          },
          {
            id: "ss10",
            name: "I want to delete my account"
          },
          {
            id: "ss11",
            name: "Something else",
            editableSubjectLine: true
          }
        ]
      },
      {
        id: "s14",
        name: "I have a problem with my newsletter email",
        subsubTopicsTitle: "sub sub topic title here",
        subsubtopics: [
          {
            id: "ss12",
            name: "I'm not receiving my newsletter emails"
          },
          {
            id: "ss13",
            name: "I need to update my email address"
          },
          {
            id: "ss14",
            name: "I would like to unsubscribe from your newsletter emails"
          },
          {
            id: "ss15",
            name: "Something else",
            editableSubjectLine: true
          }
        ]
      }
    ]
  },
  {
    id: "tech",
    name: "Technical issues",
    enquiryLabel: "the technical issue",
    subTopicsTitle: "sub topic title here",
    subtopics: [
      {
        id: "s15",
        name: "I'd like to report a technical issue with your website"
      },
      {
        id: "s16",
        name: "I'd like to report a technical issue with your app"
      },
      {
        id: "s17",
        name: "I'd like to provide feedback on your website or app",
        subsubTopicsTitle: "sub sub topic title here",
        subsubtopics: [
          {
            id: "ss16",
            name: "Website"
          },
          {
            id: "ss17",
            name: "Apps"
          }
        ]
      },
      {
        id: "s18",
        name: "I'd like to report a suspected vulnerability"
      },
      {
        id: "s19",
        name: "I'd like to feedback about the advertisements you’re using"
      },
      {
        id: "s20",
        name: "Something else",
        editableSubjectLine: true
      }
    ]
  },
  {
    id: "journalism",
    name: "Guardian journalism",
    enquiryLabel: "our journalism",
    subTopicsTitle: "sub topic title here",
    subtopics: [
      {
        id: "s21",
        name: "I'd like to report an error in your article"
      },
      {
        id: "s22",
        name: "I'd like to make a complaint about your articles"
      },
      {
        id: "s23",
        name: "I'd like to provide some feedback on your article"
      },
      {
        id: "s24",
        name: "I'd like to report a broken link in your article"
      },
      {
        id: "s25",
        name: "Something else",
        editableSubjectLine: true
      }
    ]
  },
  {
    id: "comments",
    name: "Commenting",
    enquiryLabel: "your comments"
  },
  {
    id: "other",
    name: "Something else",
    enquiryLabel: "your issue",
    editableSubjectLine: true,
    noForm: true
  }
];
