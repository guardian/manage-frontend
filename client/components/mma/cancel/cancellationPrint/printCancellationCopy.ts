import type { ProductDetail, ProductTier } from '@/shared/productResponse';
import type { PrintCancellationMode } from './printCancellationTiming';

export type PrintCancellationCopyFamily =
	| 'guardianWeekly'
	| 'homeDelivery'
	| 'voucher'
	| 'subscriptionCard';

export type PrintContactRegion = 'uk' | 'usCanada' | 'asiaPacific';

export type PrintReviewVariant = PrintCancellationMode | 'hardWithCredit';

const homeDeliveryProductKeys: readonly ProductTier[] = [
	'Newspaper Delivery',
	'Newspaper Delivery + Digital',
	'Newspaper - National Delivery',
	'Newspaper - National Delivery + Digital',
	'Newspaper Delivery - Observer',
	'Newspaper Voucher - Observer',
	'Newspaper Digital Voucher - Observer',
];

const voucherProductKeys: readonly ProductTier[] = [
	'Newspaper Voucher',
	'Newspaper Voucher + Digital',
];

const subscriptionCardProductKeys: readonly ProductTier[] = [
	'Newspaper Digital Voucher',
	'Newspaper Digital Voucher + Digital',
];

const guardianWeeklyProductKeys: readonly ProductTier[] = [
	'Guardian Weekly - Domestic',
	'Guardian Weekly - ROW',
	'Guardian Weekly Zone A',
	'Guardian Weekly Zone B',
	'Guardian Weekly Zone C',
];

const usAndCanadaCountries = new Set(['united states', 'canada', 'usa', 'us']);

const asiaPacificCountries = new Set([
	'australia',
	'new zealand',
	'bangladesh',
	'bhutan',
	'brunei',
	'brunei darussalam',
	'cambodia',
	'china',
	'east timor',
	'hong kong',
	'india',
	'indonesia',
	'japan',
	'laos',
	"lao people's democratic republic",
	'macau',
	'macao',
	'malaysia',
	'maldives',
	'mongolia',
	'myanmar',
	'nepal',
	'north korea',
	"korea, democratic people's republic of",
	'pakistan',
	'philippines',
	'singapore',
	'south korea',
	'korea, republic of',
	'sri lanka',
	'taiwan',
	'thailand',
	'timor-leste',
	'vietnam',
	'viet nam',
]);

const helpCentreContactHref = '/help-centre/contact-us';
const helpCentreChatHref = '/help-centre';

export interface PrintReasonPickerCopy {
	pageTitle: string;
	previous: string;
	title: (supporterName?: string) => string;
	introBeforeEmphasis: string;
	introEmphasis: string;
	reasonHeading: string;
	feedbackPrompt: string;
	continueToCancel: string;
	skipToCancel: string;
}

export interface PrintAlternativesCopy {
	previous: string;
	pauseTitle: string;
	pauseHeading: string;
	pauseBody: string;
	pauseCta: string;
	advisorTitle: string;
	advisorIntro: string;
	advisorBody: string;
	emailCta: string;
	emailHref: string;
	callUs?: string;
	chatHours?: string;
	chatCta?: string;
	chatHref?: string;
	continueToCancel: string;
}

export interface PrintConfirmCopy {
	previous: string;
	title: (
		supporterName: string | undefined,
		supportSinceDate: string,
	) => string;
	supportParagraph: string;
	confirmCancellationBody: string;
	subscriptionEndsOn: (subscriptionEndDate: string) => string;
	subscriptionEndsImmediately: string;
	detailParagraphs: (subscriptionEndDate?: string) => string[];
	confirmCta: string;
}

export interface PrintSuccessCopy {
	heading: string;
	effectiveLeadIn: string;
	effectiveImmediately: string;
	confirmationEmailLeadIn: string;
	confirmationEmailTail: string;
	thankYou: (supporterName: string) => string;
	thankYouBody: string;
	continueReading: string;
	fallbackSupporterName: string;
	fallbackCancellationDate: string;
	fallbackEmail: string;
}

export interface PrintProgressCopy {
	checkingStatus: (friendlyName: string) => string;
	checkingDetails: string;
	requestingCancellation: string;
	performingCancellation: string;
	finalisingCancellation: string;
	escalationBody: string;
	returnToAccount: string;
}

const goodbyeTitle = (supporterName?: string) =>
	supporterName
		? `Is this really goodbye, ${supporterName}?`
		: 'Is this really goodbye?';

const softGoodbyeTitle = (
	supporterName: string | undefined,
	supportSinceDate: string,
) =>
	`Thank you for supporting the Guardian since ${supportSinceDate}. ${goodbyeTitle(
		supporterName,
	)}`;

const softSupportParagraph =
	"Your continued support has ensured that our independent journalism remains open to all. We couldn't do what we do without you. Please consider remaining a supporter.";

const hardSupportParagraph =
	"Your continued support will ensure that our independent journalism remains open to all. We couldn't do what we do without you. Please consider remaining a supporter.";

const subscriptionEndsOn = (subscriptionEndDate: string) =>
	`Your subscription ends on ${subscriptionEndDate}.`;

const subscriptionEndsImmediately = 'Your subscription will end immediately.';

const accountCreditRefund =
	'Any credit on your account will be refunded. Please allow up to five working days for it to reach you.';

const coolingOffRefund =
	'Your last payment and any remaining credit will be fully refunded. Please allow up to five working days for your refund to reach you.';

const coolingOffIntro =
	'As you are cancelling within a cooling-off period, your subscription will end immediately.';

const unusedCreditIntro =
	'As you are cancelling within 14 days of a purchase, renewal, or the end of a discount period, you will not be charged for this subscription.';

const unusedCreditRefund =
	'If your first payment has already been processed, we will issue a refund for any unused credits. Please allow up to five working days for it to reach you.';

const retainBenefits =
	'Until then, you will retain all your current subscription benefits.';

const reasonPickerCopy: PrintReasonPickerCopy = {
	pageTitle: 'Manage subscription',
	previous: 'Previous',
	title: (supporterName) =>
		supporterName
			? `We're sorry to see you go, ${supporterName}.`
			: "We're sorry to see you go.",
	introBeforeEmphasis:
		'As a reader-funded organisation, we rely on the generous support from those who are in a position to pay for news.',
	introEmphasis:
		"Would you mind taking a moment to tell us why you'd like to cancel?",
	reasonHeading: 'Please select a reason for cancelling:',
	feedbackPrompt:
		'Help us improve by sharing more detail (please do not share personal data)',
	continueToCancel: 'Continue to cancel',
	skipToCancel: 'Skip to cancel',
};

const sharedAlternatives = {
	previous: 'Previous',
	pauseTitle: 'Pause your subscription',
	pauseHeading: 'Do you need a break?',
	pauseCta: 'Pause subscription',
	advisorTitle: 'Speak with an advisor before you leave',
	advisorIntro: 'Get in touch to explore exclusive offers',
	advisorBody:
		'Contact our customer service team to see if you are eligible for a price freeze or discount, or to find a plan that better fits your needs.',
	emailCta: 'Send us an email',
	emailHref: helpCentreContactHref,
	continueToCancel: 'Continue to cancel',
};

const contactByRegion: Record<
	PrintContactRegion,
	Pick<PrintAlternativesCopy, 'callUs' | 'chatHours' | 'chatCta' | 'chatHref'>
> = {
	uk: {
		callUs: 'Call us at +44 (0) 330 333 6765, 9am to 5pm, Monday to Sunday',
	},
	usCanada: {
		callUs: 'Call us at 1-844-632-2010, 9am to 5pm Monday to Friday, 9am to 1pm Saturday and Sunday',
	},
	asiaPacific: {
		chatHours: 'Chat with us, 9am to 5pm, Monday to Friday',
		chatCta: 'Chat with us',
		chatHref: helpCentreChatHref,
	},
};

const pauseBodyByFamily: Record<PrintCancellationCopyFamily, string> = {
	homeDelivery:
		'Put your print deliveries on hold for up to 5 weeks and we will apply a credit for the suspended issues to your next bill date. If you have digital benefits you will still receive and be charged for those during this time.',
	voucher:
		'Put your voucher subscription on hold for up to 5 weeks and we will apply a credit for the suspended issues to your next bill date. If you have digital benefits you will still receive and be charged for those during this time.',
	subscriptionCard:
		'Put your subscription card on hold for up to 5 weeks and we will apply a credit for the suspended issues to your next bill date. If you have digital benefits you will still receive and be charged for those during this time.',
	guardianWeekly:
		'Put your Guardian Weekly deliveries on hold for up to 6 weeks and we will apply credit for the suspended issues to your next bill date. You will still receive and be charged for your digital benefits during this time.',
};

const renewalCancellation = (subscriptionNoun: string) =>
	`By confirming the cancellation of the renewal of your ${subscriptionNoun}, you will no longer be supporting the Guardian's reader-funded journalism.`;

const immediateCancellation = (subscriptionNoun: string) =>
	`By confirming the cancellation of your ${subscriptionNoun}, you will no longer be supporting the Guardian's reader-funded journalism.`;

const cardInactiveFrom = (subscriptionEndDate?: string) =>
	`From ${
		subscriptionEndDate ?? 'your cancellation date'
	}, your card will no longer be active. Please discontinue use after this date to avoid any issues with retailers.`;

const cardInactiveToday =
	'From today, your card will no longer be active. Please discontinue use immediately to avoid any issues with retailers.';

const discontinueVouchersAfterDate =
	'Please discontinue use of remaining vouchers after this date, and dispose of them responsibly.';

const discontinueVouchersNow =
	'Please discontinue use of any remaining vouchers, and dispose of them responsibly.';

const discontinueVouchersUnusedCredit =
	'Please discontinue use of any remaining vouchers and dispose of them responsibly.';

const confirmCopy = (
	subscriptionNoun: string,
	softDetails: (subscriptionEndDate?: string) => string[],
	hardDetails: string[],
	hardWithCreditDetails: string[],
): Record<PrintReviewVariant, PrintConfirmCopy> => ({
	soft: {
		previous: 'Previous',
		title: softGoodbyeTitle,
		supportParagraph: softSupportParagraph,
		confirmCancellationBody: renewalCancellation(subscriptionNoun),
		subscriptionEndsOn,
		subscriptionEndsImmediately:
			'Your subscription ends at the end of your current billing period.',
		detailParagraphs: softDetails,
		confirmCta: 'Confirm cancellation',
	},
	hard: {
		previous: 'Previous',
		title: (supporterName) => goodbyeTitle(supporterName),
		supportParagraph: hardSupportParagraph,
		confirmCancellationBody: immediateCancellation(subscriptionNoun),
		subscriptionEndsOn: () => subscriptionEndsImmediately,
		subscriptionEndsImmediately,
		detailParagraphs: () => hardDetails,
		confirmCta: 'Confirm cancellation',
	},
	hardWithCredit: {
		previous: 'Previous',
		title: (supporterName) => goodbyeTitle(supporterName),
		supportParagraph: hardSupportParagraph,
		confirmCancellationBody: immediateCancellation(subscriptionNoun),
		subscriptionEndsOn: () => subscriptionEndsImmediately,
		subscriptionEndsImmediately,
		detailParagraphs: () => hardWithCreditDetails,
		confirmCta: 'Continue to cancel',
	},
});

const confirmCopyByFamily: Record<
	PrintCancellationCopyFamily,
	Record<PrintReviewVariant, PrintConfirmCopy>
> = {
	homeDelivery: confirmCopy(
		'print subscription',
		() => [
			'Until then, you will retain all your current subscription benefits, and will continue to receive newspaper deliveries.',
			accountCreditRefund,
		],
		[coolingOffIntro, coolingOffRefund],
		[unusedCreditIntro, unusedCreditRefund],
	),
	voucher: confirmCopy(
		'voucher subscription',
		() => [
			retainBenefits,
			accountCreditRefund,
			discontinueVouchersAfterDate,
		],
		[coolingOffIntro, coolingOffRefund, discontinueVouchersNow],
		[
			unusedCreditIntro,
			unusedCreditRefund,
			discontinueVouchersUnusedCredit,
		],
	),
	subscriptionCard: confirmCopy(
		'subscription card',
		(subscriptionEndDate) => [
			retainBenefits,
			accountCreditRefund,
			cardInactiveFrom(subscriptionEndDate),
		],
		[coolingOffIntro, coolingOffRefund, cardInactiveToday],
		[unusedCreditIntro, unusedCreditRefund, cardInactiveToday],
	),
	guardianWeekly: confirmCopy(
		'Guardian Weekly subscription',
		() => [
			'Until then, you will retain all your current subscription benefits, and will continue to receive Guardian Weekly deliveries.',
			accountCreditRefund,
		],
		[coolingOffIntro, coolingOffRefund],
		[unusedCreditIntro, unusedCreditRefund],
	),
};

const successCopy: PrintSuccessCopy = {
	heading: 'Your subscription has been cancelled.',
	effectiveLeadIn: 'Your cancellation will take effect on',
	effectiveImmediately: 'Cancellation will take effect immediately.',
	confirmationEmailLeadIn: 'A confirmation email will be sent to',
	confirmationEmailTail: 'in the next 24 hours.',
	thankYou: (supporterName) => `Thank you, ${supporterName}`,
	thankYouBody:
		'Your support has played a vital role in keeping independent journalism open to all.',
	continueReading: 'Continue reading the Guardian',
	fallbackSupporterName: 'supporter',
	fallbackCancellationDate: 'the end of your current billing period',
	fallbackEmail: 'your registered email address',
};

const progressCopy: PrintProgressCopy = {
	checkingStatus: (friendlyName) =>
		`Checking the status of your ${friendlyName}...`,
	checkingDetails: 'Checking details',
	requestingCancellation: 'Requesting your cancellation...',
	performingCancellation: 'Performing your cancellation...',
	finalisingCancellation: 'Finalising your cancellation...',
	escalationBody:
		'Your cancellation request has been successfully submitted. Our customer service team will try their best to contact you as soon as possible to confirm the cancellation and refund any credit you are owed.',
	returnToAccount: 'Return to your account',
};

const includesProductKey = (
	keys: readonly ProductTier[],
	productKey: ProductTier,
) => keys.includes(productKey);

export const getPrintCancellationCopyFamily = (
	productDetail: ProductDetail,
): PrintCancellationCopyFamily => {
	const productKey = productDetail.mmaProductKey;
	if (includesProductKey(homeDeliveryProductKeys, productKey)) {
		return 'homeDelivery';
	}
	if (includesProductKey(voucherProductKeys, productKey)) {
		return 'voucher';
	}
	if (includesProductKey(subscriptionCardProductKeys, productKey)) {
		return 'subscriptionCard';
	}
	if (includesProductKey(guardianWeeklyProductKeys, productKey)) {
		return 'guardianWeekly';
	}
	return 'guardianWeekly';
};

const contactCountry = (productDetail?: ProductDetail | null) =>
	productDetail?.subscription.deliveryAddress?.country ||
	productDetail?.billingCountry;

export const contactRegionFor = (
	productDetail?: ProductDetail | null,
): PrintContactRegion => {
	const country = contactCountry(productDetail)?.trim().toLowerCase() ?? '';
	if (usAndCanadaCountries.has(country)) {
		return 'usCanada';
	}
	if (asiaPacificCountries.has(country)) {
		return 'asiaPacific';
	}
	return 'uk';
};

export const reviewVariantFor = (
	mode: PrintCancellationMode,
	hasOutstandingCredit: boolean,
): PrintReviewVariant => {
	if (mode === 'hard' && hasOutstandingCredit) {
		return 'hardWithCredit';
	}
	return mode;
};

export const getReasonPickerCopy = (
	_productDetail?: ProductDetail | null,
): PrintReasonPickerCopy => reasonPickerCopy;

export const getAlternativesCopy = (
	productDetail?: ProductDetail | null,
): PrintAlternativesCopy => {
	const family = productDetail
		? getPrintCancellationCopyFamily(productDetail)
		: 'guardianWeekly';
	const region =
		family === 'guardianWeekly' ? contactRegionFor(productDetail) : 'uk';

	return {
		...sharedAlternatives,
		...contactByRegion[region],
		pauseBody: pauseBodyByFamily[family],
	};
};

export const getConfirmCopy = (
	productDetail: ProductDetail | undefined,
	variant: PrintReviewVariant,
): PrintConfirmCopy => {
	const family = productDetail
		? getPrintCancellationCopyFamily(productDetail)
		: 'guardianWeekly';
	return confirmCopyByFamily[family][variant];
};

export const getSuccessCopy = (
	_productDetail?: ProductDetail | null,
	_mode?: PrintCancellationMode,
): PrintSuccessCopy => successCopy;

export const getProgressCopy = (
	_productDetail?: ProductDetail | null,
): PrintProgressCopy => progressCopy;
