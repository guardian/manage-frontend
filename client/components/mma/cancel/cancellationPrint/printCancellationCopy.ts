import type { ProductDetail, ProductTier } from '@/shared/productResponse';

export type PrintCancellationCopyFamily =
	| 'guardianWeekly'
	| 'homeDelivery'
	| 'voucher'
	| 'subscriptionCard';

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

export interface PrintReasonPickerCopy {
	pageTitle: string;
	previous: string;
	title: (supporterNamePrefix: string, sorryWord: string) => string;
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
	advisorBody: string;
	emailLabel: string;
	emailAddress: string;
	callUsLeadIn: string;
	phoneNumber: string;
	phoneHours: string;
	continueToCancel: string;
}

export interface PrintConfirmCopy {
	previous: string;
	title: (
		supporterNamePrefix: string,
		thankWord: string,
		supportSinceDate: string,
	) => string;
	supportParagraph: string;
	confirmCancellationBody: (productTitle: string) => string;
	subscriptionEndsOn: (subscriptionEndDate: string) => string;
	subscriptionEndsAtBillingPeriod: string;
	retainBenefits: string;
	confirmCta: string;
}

export interface PrintSuccessCopy {
	heading: (productTitle: string) => string;
	effectiveLeadIn: string;
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

const guardianWeeklyReasonPickerCopy: PrintReasonPickerCopy = {
	pageTitle: 'Manage subscription',
	previous: 'Previous',
	title: (supporterNamePrefix, sorryWord) =>
		`${supporterNamePrefix}${sorryWord} sorry to see you go`,
	introBeforeEmphasis:
		'As a reader-funded organisation, we rely on the generous support from those who are in a position to pay for news.',
	introEmphasis:
		"Would you take a moment to tell us why you'd like to cancel?",
	reasonHeading: 'Please select a reason for cancelling',
	feedbackPrompt: 'Help us improve by sharing more detail',
	continueToCancel: 'Continue to cancel',
	skipToCancel: 'Skip to cancel',
};

const guardianWeeklyAlternativesCopy: PrintAlternativesCopy = {
	previous: 'Previous',
	pauseTitle: 'Pause your subscription',
	pauseHeading: 'Do you need a break?',
	pauseBody:
		'Put your print deliveries on hold for up to five weeks and we will apply a credit for the suspended issues to your next bill date. If you have digital benefits you will still receive and be charged for those during this time.',
	pauseCta: 'Pause subscription',
	advisorTitle: 'Speak with an advisor',
	advisorBody:
		'Get in touch with our customer care team if you require any assistance or simply wish to discuss other subscription options.',
	emailLabel: 'Email',
	emailAddress: 'customer.help@theguardian.com',
	callUsLeadIn: 'Call us at',
	phoneNumber: '+44 (0) 330 333 6767',
	phoneHours: '9am to 6pm, Monday to Sunday',
	continueToCancel: 'Continue to cancel',
};

const guardianWeeklyConfirmCopy: PrintConfirmCopy = {
	previous: 'Previous',
	title: (supporterNamePrefix, thankWord, supportSinceDate) =>
		`${supporterNamePrefix}${thankWord} you for supporting the Guardian since ${supportSinceDate}. Is this really goodbye?`,
	supportParagraph:
		"Your continued support has ensured that our independent journalism remains open to all. We couldn't do what we do without you. Please consider remaining a supporter.",
	confirmCancellationBody: (productTitle) =>
		`By confirming the cancellation of the renewal of your ${productTitle} subscription, you will no longer be supporting the Guardian's reader-funded journalism.`,
	subscriptionEndsOn: (subscriptionEndDate) =>
		`Your subscription ends on ${subscriptionEndDate}.`,
	subscriptionEndsAtBillingPeriod:
		'Your subscription will end at the end of your current billing period.',
	retainBenefits:
		'Until then, you will retain all your current subscription benefits.',
	confirmCta: 'Confirm cancellation',
};

const guardianWeeklySuccessCopy: PrintSuccessCopy = {
	heading: (productTitle) =>
		`Your subscription to ${productTitle} has been cancelled.`,
	effectiveLeadIn: 'Your cancellation will take effect on',
	confirmationEmailLeadIn: 'You will receive a confirmation email to',
	confirmationEmailTail: 'in the next 24 hours.',
	thankYou: (supporterName) => `Thank you, ${supporterName}`,
	thankYouBody:
		'Your support has played a vital role in keeping independent journalism open to all.',
	continueReading: 'Continue reading the Guardian',
	fallbackSupporterName: 'supporter',
	fallbackCancellationDate: 'the end of your current billing period',
	fallbackEmail: 'your registered email address',
};

const guardianWeeklyProgressCopy: PrintProgressCopy = {
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

const reasonPickerCopyByFamily: Partial<
	Record<PrintCancellationCopyFamily, PrintReasonPickerCopy>
> = {
	guardianWeekly: guardianWeeklyReasonPickerCopy,
};

const alternativesCopyByFamily: Partial<
	Record<PrintCancellationCopyFamily, PrintAlternativesCopy>
> = {
	guardianWeekly: guardianWeeklyAlternativesCopy,
};

const confirmCopyByFamily: Partial<
	Record<PrintCancellationCopyFamily, PrintConfirmCopy>
> = {
	guardianWeekly: guardianWeeklyConfirmCopy,
};

const successCopyByFamily: Partial<
	Record<PrintCancellationCopyFamily, PrintSuccessCopy>
> = {
	guardianWeekly: guardianWeeklySuccessCopy,
};

const progressCopyByFamily: Partial<
	Record<PrintCancellationCopyFamily, PrintProgressCopy>
> = {
	guardianWeekly: guardianWeeklyProgressCopy,
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

const copyForFamily = <T>(
	productDetail: ProductDetail | undefined,
	byFamily: Partial<Record<PrintCancellationCopyFamily, T>> & {
		guardianWeekly: T;
	},
): T => {
	if (!productDetail) {
		return byFamily.guardianWeekly;
	}
	const family = getPrintCancellationCopyFamily(productDetail);
	return byFamily[family] ?? byFamily.guardianWeekly;
};

export const getReasonPickerCopy = (
	productDetail: ProductDetail,
): PrintReasonPickerCopy =>
	copyForFamily(productDetail, {
		...reasonPickerCopyByFamily,
		guardianWeekly: guardianWeeklyReasonPickerCopy,
	});

export const getAlternativesCopy = (
	productDetail?: ProductDetail | null,
): PrintAlternativesCopy =>
	copyForFamily(productDetail ?? undefined, {
		...alternativesCopyByFamily,
		guardianWeekly: guardianWeeklyAlternativesCopy,
	});

export const getConfirmCopy = (
	productDetail: ProductDetail,
): PrintConfirmCopy =>
	copyForFamily(productDetail, {
		...confirmCopyByFamily,
		guardianWeekly: guardianWeeklyConfirmCopy,
	});

export const getSuccessCopy = (
	productDetail: ProductDetail,
): PrintSuccessCopy =>
	copyForFamily(productDetail, {
		...successCopyByFamily,
		guardianWeekly: guardianWeeklySuccessCopy,
	});

export const getProgressCopy = (
	productDetail?: ProductDetail | null,
): PrintProgressCopy =>
	copyForFamily(productDetail ?? undefined, {
		...progressCopyByFamily,
		guardianWeekly: guardianWeeklyProgressCopy,
	});
