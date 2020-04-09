import React from "react";
import {
  hrefStyle,
  inOrderToImproveSubs,
  standardAlternateFeedbackIntro
} from "../cancellationConstants";
import { CancellationReason } from "../cancellationReason";

export const voucherCancellationReasons: CancellationReason[] = [
  {
    reasonId: "mma_editorial",
    linkLabel: "I am unhappy with Guardian journalism",
    saveBody:
      "In order to improve our journalism, we’d love to know more about why you are thinking of cancelling.",
    alternateFeedbackIntro: standardAlternateFeedbackIntro
  },
  {
    reasonId: "mma_financial_circumstances",
    linkLabel: "A change in my financial circumstances",
    saveBody: (
      <>
        We understand that financial circumstances can change from time to time.
        <br />
        Making a smaller contribution to the Guardian can be an inexpensive way
        of keeping journalism open for everyone to read and enjoy. Once you’ve
        completed your cancellation below, we hope you’ll consider a small
        one&nbsp;off or recurring contribution in the future.
      </>
    ),
    escalationSaveBody: "",
    skipFeedback: true
  },
  {
    reasonId: "mma_support_another_way",
    linkLabel:
      "I am going to support The Guardian in another way, eg. by subscribing",
    saveBody: (
      <>
        Thank you for your ongoing support.
        <br />
        <br />
        Once you’ve completed your cancellation below, you can set up a new
        product via our online checkouts.
      </>
    ),
    escalationSaveBody: "",
    skipFeedback: true
  },
  {
    reasonId: "mma_health",
    linkLabel: "Ill-health",
    saveBody: (
      <>
        Thank you for your ongoing support.
        <br />
        <br />
        Your subscription has ensured that our quality journalism remains open
        for everyone to read and enjoy.
        <br />
        Please confirm your cancellation below.
      </>
    ),
    escalationSaveBody: "",
    skipFeedback: true
  },
  {
    reasonId: "mma_break_from_news",
    linkLabel: "I am taking a break from news",
    saveBody: (
      <>
        Thank you for your ongoing support.
        <br />
        <br />
        Your subscription has ensured that our quality journalism remains open
        for everyone to read and enjoy. You can{" "}
        <a css={hrefStyle} href="/email-prefs">
          update your email preferences here
        </a>{" "}
        if you’d like to reduce communication from us.
        <br />
        <br />
        Alternatively we’d love to know more about what we could do better to
        help provide inspiring and trustworthy news.
      </>
    ),
    escalationSaveBody:
      "We’d love to know more about what we could do better to help provide inspiring and trustworthy news."
  },
  {
    reasonId: "mma_values",
    linkLabel: "I don’t feel that The Guardian values my support",
    saveBody: "",
    alternateFeedbackIntro: inOrderToImproveSubs
  },
  {
    reasonId: "mma_time",
    linkLabel: "I don't have time to use my subscription",
    saveBody: "",
    alternateFeedbackIntro: inOrderToImproveSubs
  },
  {
    reasonId: "mma_better_offer",
    linkLabel: "I've found a better offer with another publisher",
    saveBody: "",
    alternateFeedbackIntro: inOrderToImproveSubs
  },
  {
    reasonId: "mma_value_for_money",
    linkLabel: "I wasn't getting value for money",
    saveBody: "",
    alternateFeedbackIntro: inOrderToImproveSubs
  },
  {
    reasonId: "mma_covid",
    linkLabel: "My subscription use is disrupted due to COVID-19",
    saveBody: "",
    alternateFeedbackIntro: inOrderToImproveSubs
  },
  {
    reasonId: "mma_delivery_issue",
    linkLabel: "I’ve had repeated delivery issues",
    saveBody: "",
    alternateFeedbackIntro: inOrderToImproveSubs
  },
  {
    reasonId: "mma_redemption_issue",
    linkLabel: "I’ve had problems redeeming my vouchers",
    saveBody: "",
    alternateFeedbackIntro: inOrderToImproveSubs
  },
  {
    reasonId: "mma_other",
    linkLabel: "None of the above",
    saveTitle: "Other",
    saveBody: "",
    alternateFeedbackIntro: inOrderToImproveSubs
  }
];
