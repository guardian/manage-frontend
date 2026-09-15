import type { DeliveryRecordDetail } from '../delivery/records/deliveryRecordsApi';
import type { OutstandingHolidayStop } from '../holiday/HolidayStopApi';
import {
	financialCircumstances,
	inOrderToImproveSubs,
	standardAlternateFeedbackIntro,
} from './cancellationConstants';
import { ContributionsCancellationAmountUpdatedSaved } from './contributions/ContributionsCancellationAmountUpdatedSaved';
import { ContributionsCancellationFlowFinancialSaveAttempt } from './contributions/ContributionsCancellationFlowFinancialSaveAttempt';
import {
	BreakFromNews,
	BreakFromNewsWithAlternative,
	BreakFromNewsWithGW,
	PaymentIssue,
} from './GenericSaveBodyResponses';
import type { SavedBodyProps } from './stages/SavedCancellation';

export interface SaveBodyProps {
	caseId: string;
	holidayStops?: OutstandingHolidayStop[];
	deliveryCredits?: DeliveryRecordDetail[];
}

export interface CancellationReason {
	reasonId: CancellationReasonId;
	linkLabel: string;
	saveTitle?: string;
	saveBody?: string[] | React.FC<SaveBodyProps>;
	hideSaveActions?: boolean;
	escalationSaveBody?: string[] | React.FC<SaveBodyProps>;
	alternateCallUsPrefix?: string;
	alternateFeedbackIntro?: string;
	alternateFeedbackThankYouTitle?: string;
	alternateFeedbackThankYouBody?: string;
	hideContactUs?: boolean;
	skipFeedback?: boolean;
	skipSaveOffer?: boolean;
	savedBody?: React.FC<SavedBodyProps>;
}

export type CancellationReasonId =
	| 'mma_autorenew'
	| 'mma_covid'
	| 'mma_delivery_issue'
	| 'mma_redemption_issue'
	| 'mma_time'
	| 'mma_dont_read_enough'
	| 'mma_better_offer'
	| 'mma_issue'
	| 'mma_financial_circumstances'
	| 'mma_payment_issue'
	| 'mma_price_increase'
	| 'mma_editorial'
	| 'mma_benefits'
	| 'mma_value_for_money'
	| 'mma_support_another_way'
	| 'mma_health'
	| 'mma_break_from_news'
	| 'mma_values'
	| 'mma_other'
	| 'mma_duplicate_subscription'
	| 'mma_shared_subscription_recipient'
	| 'mma_cancellation_default'
	| 'mma_membership_cancellation_default';

// ----- Auto Renew -----
// T3 Only
export const reasonAutoRenew: CancellationReason = {
	reasonId: 'mma_autorenew',
	linkLabel: 'I don’t want an auto-renewing subscription',
	skipFeedback: true,
};

// ----- Covid -----
// T3, Voucher
export const reasonCovid: CancellationReason = {
	reasonId: 'mma_covid',
	linkLabel: 'My subscription use is disrupted due to COVID-19',
	alternateFeedbackIntro: inOrderToImproveSubs,
};

// ----- Delivery Issue -----
// T3, Voucher
export const reasonDeliveryIssue: CancellationReason = {
	reasonId: 'mma_delivery_issue',
	linkLabel: 'I’ve had repeated delivery issues',
	alternateFeedbackIntro: inOrderToImproveSubs,
};

// ----- Redemption Issue -----
// Voucher
export const reasonRedemptionIssue: CancellationReason = {
	reasonId: 'mma_redemption_issue',
	linkLabel: 'I’ve had problems redeeming my vouchers',
	alternateFeedbackIntro: inOrderToImproveSubs,
};

// ----- Time -----
// Digipack, T3, Voucher
export const reasonTime1: CancellationReason = {
	reasonId: 'mma_time',
	linkLabel: "I don't have time to use my subscription",
	alternateFeedbackIntro: inOrderToImproveSubs,
};
// Print
export const reasonTime2: CancellationReason = {
	reasonId: 'mma_time',
	linkLabel: 'I no longer engage with the content as I used to',
	alternateFeedbackIntro: standardAlternateFeedbackIntro,
};

// ----- Don't Read Enough -----
//S+
export const reasonDontReadEnough1: CancellationReason = {
	reasonId: 'mma_dont_read_enough',
	linkLabel: 'I don’t have enough time to read regularly',
	alternateFeedbackIntro: standardAlternateFeedbackIntro,
};
// Print
export const reasonDontReadEnough2: CancellationReason = {
	reasonId: 'mma_dont_read_enough',
	linkLabel: "I don't use the subscription enough to justify the cost",
	alternateFeedbackIntro: standardAlternateFeedbackIntro,
};

// ----- Better Offer -----
// Digipack, T3, Voucher
export const reasonBetterOffer: CancellationReason = {
	reasonId: 'mma_better_offer',
	linkLabel: "I've found a better offer with another publisher",
	alternateFeedbackIntro: inOrderToImproveSubs,
};

// ----- Issue -----
// Print
export const reasonIssue1: CancellationReason = {
	reasonId: 'mma_issue',
	linkLabel:
		'I have encountered usability/technical issues or delivery issues',
	alternateFeedbackIntro: standardAlternateFeedbackIntro,
};
// Contributions, S+
export const reasonIssue2: CancellationReason = {
	reasonId: 'mma_issue',
	linkLabel: 'I’m having technical issues',
	alternateFeedbackIntro: standardAlternateFeedbackIntro,
};
// Digipack
export const reasonIssue3: CancellationReason = {
	reasonId: 'mma_issue',
	linkLabel: 'I’ve been experiencing technical or service problems',
	alternateFeedbackIntro: inOrderToImproveSubs,
};

// ----- Financial Circumstances -----
// Digipack, T3, Voucher
export const reasonFinancialCircumstances1: CancellationReason = {
	reasonId: 'mma_financial_circumstances',
	linkLabel: 'A change in my financial circumstances',
	saveBody: [
		'We understand that financial circumstances can change from time to time.',
		'Making a smaller contribution to the Guardian can be an inexpensive way of keeping journalism open for everyone to read and enjoy. Once you’ve completed your cancellation below, we hope you’ll consider a small one off or recurring contribution in the future.',
	],
	skipFeedback: true,
};
// S+
export const reasonFinancialCircumstances2: CancellationReason = {
	reasonId: 'mma_financial_circumstances',
	linkLabel: 'I can no longer afford to support you',
	saveBody: financialCircumstances,
	alternateFeedbackIntro: standardAlternateFeedbackIntro,
};
// Membership
export const reasonFinancialCircumstances3: CancellationReason = {
	reasonId: 'mma_financial_circumstances',
	linkLabel: 'A change in my financial circumstances',
	saveTitle:
		'We understand that financial circumstances can change from time to time',
	saveBody: [
		'Making a smaller contribution to the Guardian can be an inexpensive way of keeping journalism open for everyone to read and enjoy. There are a number of flexible ways to support us and one of our customer service specialist would be happy to hear from you.',
	],
};
// Contributions
export const reasonFinancialCircumstances4: CancellationReason = {
	reasonId: 'mma_financial_circumstances',
	linkLabel: 'I can no longer afford to support you',
	saveBody: ContributionsCancellationFlowFinancialSaveAttempt,
	savedBody: ContributionsCancellationAmountUpdatedSaved,
	alternateFeedbackIntro: standardAlternateFeedbackIntro,
	hideSaveActions: true,
	skipFeedback: true,
	hideContactUs: true,
};
// Print
export const reasonFinancialCircumstances5: CancellationReason = {
	reasonId: 'mma_financial_circumstances',
	linkLabel:
		'My personal circumstances have changed, or I have decided to take a break from the news',
	alternateFeedbackIntro: standardAlternateFeedbackIntro,
};

// ----- Payment Issue -----
// Membership
export const reasonPaymentIssue: CancellationReason = {
	reasonId: 'mma_payment_issue',
	linkLabel: "I didn't expect The Guardian to take another payment",
	saveTitle: 'We are sorry that you have been charged again',
	saveBody: PaymentIssue,
	alternateFeedbackIntro: '',
};

// ----- Price Increase -----
// S+
export const reasonPriceIncrease1: CancellationReason = {
	reasonId: 'mma_price_increase',
	linkLabel: 'The price has recently increased',
	saveBody: financialCircumstances,
	alternateFeedbackIntro: standardAlternateFeedbackIntro,
};
// Contributions
export const reasonPriceIncrease2: CancellationReason = {
	reasonId: 'mma_price_increase',
	linkLabel: 'The price has recently increased',
	saveBody: ContributionsCancellationFlowFinancialSaveAttempt,
	savedBody: ContributionsCancellationAmountUpdatedSaved,
	alternateFeedbackIntro: standardAlternateFeedbackIntro,
	hideSaveActions: true,
	skipFeedback: true,
	hideContactUs: true,
};

// ----- Editorial -----
// Contributions, S+, Print
export const reasonEditorial1: CancellationReason = {
	reasonId: 'mma_editorial',
	linkLabel: 'I am unhappy with some editorial decisions',
	alternateFeedbackIntro: standardAlternateFeedbackIntro,
};
// Digipack, T3, Voucher
export const reasonEditorial2: CancellationReason = {
	reasonId: 'mma_editorial',
	linkLabel: 'I am unhappy with Guardian journalism',
	saveBody: [
		'In order to improve our journalism, we’d love to know more about why you are thinking of cancelling.',
	],
	alternateFeedbackIntro: standardAlternateFeedbackIntro,
};
// Membership
export const reasonEditorial3: CancellationReason = {
	reasonId: 'mma_editorial',
	linkLabel: 'I am unhappy with Guardian journalism',
	saveTitle:
		'In order to improve our journalism, we’d love to know more about why you are thinking of cancelling',
	saveBody: [
		'If there’s anything we can do differently please take a moment to contact our customer services team we would be happy to hear from you.',
	],
};

// ----- Benefits -----
// S+
export const reasonBenefits1: CancellationReason = {
	reasonId: 'mma_benefits',
	linkLabel: 'I’m not fully satisfied with the product features or benefits',
	alternateFeedbackIntro: standardAlternateFeedbackIntro,
};
// Membership
export const reasonBenefits2: CancellationReason = {
	reasonId: 'mma_benefits',
	linkLabel: 'None of the membership benefits are of interest to me',
	saveTitle:
		'In order to improve our membership programme, we’d love to know more about why you are thinking of cancelling',
	saveBody: [
		'If there’s anything we can do differently please take a moment to give us some feedback',
	],
};
// Digipack
export const reasonBenefits3: CancellationReason = {
	reasonId: 'mma_benefits',
	linkLabel: 'None of the subscription benefits are of interest to me',
	alternateFeedbackIntro: inOrderToImproveSubs,
};
// Contributions
export const reasonBenefits4: CancellationReason = {
	reasonId: 'mma_benefits',
	linkLabel: 'I’m not fully satisfied with the product features or benefits',
	alternateFeedbackIntro: standardAlternateFeedbackIntro,
	saveBody: [
		'Thank you for your ongoing support. Once you’ve completed your cancellation below, you can set up a new product via our online checkouts.',
	],
};
// Print
export const reasonBenefits5: CancellationReason = {
	reasonId: 'mma_benefits',
	linkLabel:
		"The subscription's benefits and features don't match my expectations",
	alternateFeedbackIntro: standardAlternateFeedbackIntro,
};

// ----- Value For Money -----
// Digipack, T3, Voucher
export const reasonValueForMoney: CancellationReason = {
	reasonId: 'mma_value_for_money',
	linkLabel: "I wasn't getting value for money",
	alternateFeedbackIntro: inOrderToImproveSubs,
};

// ----- Support Another Way -----
// Digipack, T3, Voucher
export const reasonSupportAnotherWay1: CancellationReason = {
	reasonId: 'mma_support_another_way',
	linkLabel:
		'I am going to support The Guardian in another way, eg. by subscribing',
	saveBody: [
		'Thank you for your ongoing support.',
		'Once you’ve completed your cancellation below, you can set up a new product via our online checkouts.',
	],
	skipFeedback: true,
};
// S+
export const reasonSupportAnotherWay2: CancellationReason = {
	reasonId: 'mma_support_another_way',
	linkLabel: 'I’d like to support you, but at a lower amount',
	saveBody: financialCircumstances,
	alternateFeedbackIntro: standardAlternateFeedbackIntro,
};
// Membership
export const reasonSupportAnotherWay3: CancellationReason = {
	reasonId: 'mma_support_another_way',
	linkLabel:
		'I am going to support The Guardian in another way, eg. by subscribing',
	saveTitle: 'Thank you for your ongoing support.',
	saveBody: ['Please confirm your membership cancellation below.'],
	alternateCallUsPrefix:
		'If you’re not sure what’s best for you or would like help, to contact us',
	alternateFeedbackIntro:
		"Alternatively if you'd like to give us feedback, please enter in the box the below.",
};
// Contributions
export const reasonSupportAnotherWay4: CancellationReason = {
	reasonId: 'mma_support_another_way',
	linkLabel: 'I want to support in a different way',
	saveBody: ContributionsCancellationFlowFinancialSaveAttempt,
	savedBody: ContributionsCancellationAmountUpdatedSaved,
	alternateFeedbackIntro: standardAlternateFeedbackIntro,
	hideSaveActions: true,
};

// ----- Health -----
// Digipack, T3, Voucher
export const reasonHealth1: CancellationReason = {
	reasonId: 'mma_health',
	linkLabel: 'Ill-health',
	saveBody: [
		'Thank you for your ongoing support.',
		'Your subscription has ensured that our quality journalism remains open for everyone to read and enjoy.',
		'Please confirm your cancellation below.',
	],
	skipFeedback: true,
};
// Contributions, S+
export const reasonHealth2: CancellationReason = {
	reasonId: 'mma_health',
	linkLabel: 'I’m dealing with personal or health matters',
	alternateFeedbackIntro: standardAlternateFeedbackIntro,
};
// Membership
export const reasonHealth3: CancellationReason = {
	reasonId: 'mma_health',
	linkLabel: 'Ill-health',
	saveTitle: 'Thank you so much for your support.',
	saveBody: [
		'Your contribution has ensured that our quality journalism remains open for everyone to read and enjoy. Please confirm your cancellation below.',
	],
	skipFeedback: true,
	hideContactUs: true,
};

// ----- Break From News -----
// T3, Voucher
export const reasonBreakFromNews1: CancellationReason = {
	reasonId: 'mma_break_from_news',
	linkLabel: 'I am taking a break from news',
	saveBody: BreakFromNewsWithAlternative,
	escalationSaveBody: [
		'We’d love to know more about what we could do better to help provide inspiring and trustworthy news.',
	],
};
// Contributions, S+
export const reasonBreakFromNews2: CancellationReason = {
	reasonId: 'mma_break_from_news',
	linkLabel: 'I’m taking a break from news',
	alternateFeedbackIntro: standardAlternateFeedbackIntro,
};
// Membership
export const reasonBreakFromNews3: CancellationReason = {
	reasonId: 'mma_break_from_news',
	linkLabel: 'I am taking a break from news',
	saveTitle:
		'We understand that sometimes the news cycle can feel a little overwhelming.',
	saveBody: BreakFromNewsWithGW,
};
// Digipack
export const reasonBreakFromNews4: CancellationReason = {
	reasonId: 'mma_break_from_news',
	linkLabel: 'I am taking a break from news',
	saveBody: BreakFromNews,
	alternateFeedbackIntro:
		'Alternatively we’d love to know more about what we could do better to help provide inspiring and trustworthy news.',
};

// ----- Values -----
// T3, Voucher
export const reasonValues1: CancellationReason = {
	reasonId: 'mma_values',
	linkLabel: 'I don’t feel that The Guardian values my support',
	alternateFeedbackIntro: inOrderToImproveSubs,
};
// Contributions, S+
export const reasonValues2: CancellationReason = {
	reasonId: 'mma_values',
	linkLabel: 'I don’t feel that the Guardian values my support',
	alternateFeedbackIntro: standardAlternateFeedbackIntro,
};
// Membership
export const reasonValues3: CancellationReason = {
	reasonId: 'mma_values',
	linkLabel: "I don't feel that the Guardian values my support",
	saveTitle:
		'In order to improve our membership programme, we’d love to know more about why you are thinking of cancelling',
	saveBody: [
		'If there’s anything we can do differently please take a moment to give us some feedback',
	],
};

// ----- Other -----
// Digipack, T3, Voucher
export const otherCancellationReason1: CancellationReason = {
	reasonId: 'mma_other',
	linkLabel: 'None of the above',
	saveTitle: 'Other',
	alternateFeedbackIntro: inOrderToImproveSubs,
};
// Contributions, S+
export const otherCancellationReason2: CancellationReason = {
	reasonId: 'mma_other',
	linkLabel: 'Another reason (please specify)',
	alternateFeedbackIntro: standardAlternateFeedbackIntro,
};
// Membership
export const otherCancellationReason3: CancellationReason = {
	reasonId: 'mma_other',
	linkLabel: 'Other',
	saveTitle:
		'In order to improve our membership programme, we’d love to know more about why you are thinking of cancelling',
	saveBody: [
		'If there’s anything we can do differently please take a moment to give us some feedback',
	],
};
// Print
export const otherCancellationReason4: CancellationReason = {
	reasonId: 'mma_other',
	linkLabel: 'Other (please specify)',
	alternateFeedbackIntro: standardAlternateFeedbackIntro,
};

// ----- Duplicate Subscription -----
// Print
export const reasonDuplicateSubscription: CancellationReason = {
	reasonId: 'mma_duplicate_subscription',
	linkLabel:
		'I realised I have a duplicate subscription or am already covered by a multiple account plan',
	alternateFeedbackIntro: standardAlternateFeedbackIntro,
};

// ----- Shared Subscription Recipient -----
// All
export const reasonSharedSubscriptionCancellation: CancellationReason = {
	reasonId: 'mma_shared_subscription_recipient',
	linkLabel: 'I joined a Digital plus shared subscription',
	saveBody: ['Thank you for your ongoing support.'],
	skipFeedback: true,
	skipSaveOffer: true,
};

// Notes:
// Should add delivery issues to print subscription cancellations?
// Financial Circumstances copy is very similar to the inline one.
// reasonFinancialCircumstances5 combines financial circumstances and taking a break from the news.
// Empty alternateFeedbackIntro in reasonPaymentIssue for Membership.
// Support another way for lower amounts and different subscriptions.

export type OptionalCancellationReasonId = CancellationReasonId | undefined;
