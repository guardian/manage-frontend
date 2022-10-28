import { capitalize } from 'lodash';
import type { ReactNode } from 'react';
import type {
	CancellationReason,
	OptionalCancellationReasonId,
} from '../client/components/cancel/cancellationReason';
import { contributionsCancellationFlowStart } from '../client/components/cancel/contributions/contributionsCancellationFlowStart';
import { contributionsCancellationReasons } from '../client/components/cancel/contributions/contributionsCancellationReasons';
import { digipackCancellationFlowStart } from '../client/components/cancel/digipack/digipackCancellationFlowStart';
import { digipackCancellationReasons } from '../client/components/cancel/digipack/digipackCancellationReasons';
import { gwCancellationFlowStart } from '../client/components/cancel/gw/gwCancellationFlowStart';
import { gwCancellationReasons } from '../client/components/cancel/gw/gwCancellationReasons';
import { membershipCancellationFlowStart } from '../client/components/cancel/membership/membershipCancellationFlowStart';
import { membershipCancellationReasons } from '../client/components/cancel/membership/membershipCancellationReasons';
import type { RestOfCancellationFlow } from '../client/components/cancel/physicalSubsCancellationFlowWrapper';
import { physicalSubsCancellationFlowWrapper } from '../client/components/cancel/physicalSubsCancellationFlowWrapper';
import { supporterplusCancellationFlowStart } from '../client/components/cancel/supporterplus/supporterplusCancellationFlowStart';
import { supporterplusCancellationReasons } from '../client/components/cancel/supporterplus/supporterplusCancellationReasons';
import { voucherCancellationFlowStart } from '../client/components/cancel/voucher/voucherCancellationFlowStart';
import { voucherCancellationReasons } from '../client/components/cancel/voucher/voucherCancellationReasons';
import type { SupportTheGuardianButtonProps } from '../client/components/supportTheGuardianButton';
import type { OphanProduct } from './ophanTypes';
import type {
	CancelledProductDetail,
	PaidSubscriptionPlan,
	ProductDetail,
	Subscription,
	SubscriptionPlan,
	SubscriptionWithDeliveryAddress,
} from './productResponse';
import { getMainPlan, isGift } from './productResponse';

type ProductFriendlyName =
	| 'membership'
	| 'recurring contribution' // TODO use payment frequency instead of 'recurring' e.g. monthly annual etc
	| 'newspaper subscription'
	| 'newspaper voucher subscription'
	| 'newspaper subscription card'
	| 'newspaper home delivery subscription'
	| 'digital subscription'
	| 'monthly + extras'
	| 'annual + extras'
	| 'Guardian Weekly subscription'
	| 'subscription'
	| 'recurring support'
	| 'guardian patron';
type ProductUrlPart =
	| 'membership'
	| 'contributions'
	| 'paper'
	| 'voucher'
	| 'subscriptioncard'
	| 'homedelivery'
	| 'digital'
	| 'support'
	| 'guardianweekly'
	| 'subscriptions'
	| 'recurringsupport'
	| 'guardianpatron';
type SfCaseProduct =
	| 'Membership'
	| 'Recurring - Contributions'
	| 'Voucher Subscriptions'
	| 'Guardian Weekly'
	| 'Digital Pack Subscriptions'
	| 'Supporter Plus'
	| 'Guardian Patron';
type AllProductsProductTypeFilterString =
	| 'Weekly'
	| 'Paper'
	| 'Voucher'
	| 'DigitalVoucher'
	| 'HomeDelivery'
	| 'Contribution'
	| 'Membership'
	| 'Digipack'
	| 'SupporterPlus'
	| 'ContentSubscription'
	| 'GuardianPatron'
	| 'RecurringSupport';

interface CancellationFlowProperties {
	reasons: CancellationReason[];
	sfCaseProduct: SfCaseProduct;
	linkOnProductPage?: true;
	checkForOutstandingCredits?: true;
	flowWrapper?: (
		productDetail: ProductDetail,
		productType: ProductType,
	) => (restOfFlow: RestOfCancellationFlow) => ReactNode;
	startPageBody: (productDetail: ProductDetail) => JSX.Element;
	startPageOfferEffectiveDateOptions?: true;
	hideReasonTitlePrefix?: true;
	alternateSummaryMainPara?: string;
	shouldHideSummaryMainPara?: true;
	summaryReasonSpecificPara: (
		reasonId: OptionalCancellationReasonId,
	) => string | undefined;
	onlyShowSupportSectionIfAlternateText: boolean;
	alternateSupportButtonText: (
		reasonId: OptionalCancellationReasonId,
	) => string | undefined;
	alternateSupportButtonUrlSuffix: (
		reasonId: OptionalCancellationReasonId,
	) => string | undefined;
	swapFeedbackAndContactUs?: true;
	shouldShowReminder?: true;
	shouldHideThrasher?: true;
}

export interface HolidayStopFlowProperties {
	issueKeyword: string;
	alternateNoticeString?: string;
	additionalHowAdvice?: string;
	hideDeliveryRedirectionHelpBullet?: true;
	explicitConfirmationRequired?: {
		checkboxLabel: string;
		explainerModalTitle: string;
		explainerModalBody: string;
	};
}

export interface DeliveryProblemType {
	label: string;
	messageIsMandatory: boolean;
}
export const holidaySuspensionDeliveryProblem: DeliveryProblemType = {
	label: 'Delivered despite suspension',
	messageIsMandatory: false,
};

const commonDeliveryProblemTypes: DeliveryProblemType[] = [
	{ label: 'Damaged Paper', messageIsMandatory: true },
	{ label: 'No Delivery', messageIsMandatory: false },
	{ label: 'Other', messageIsMandatory: true },
	// {...holidaySuspensionDeliveryProblem}
];

interface DeliveryRecordsProperties {
	productNameForProblemReport: string;
	showDeliveryInstructions?: true;
	numberOfProblemRecordsToShow: number;
	contactUserOnExistingProblemReport: boolean;
	availableProblemTypes: DeliveryProblemType[];
}

interface DeliveryProperties {
	showAddress?: (
		subscription: Subscription,
	) => subscription is SubscriptionWithDeliveryAddress;
	enableDeliveryInstructionsUpdate?: boolean;
	records?: DeliveryRecordsProperties;
}

export interface ProductType {
	productTitle: (mainPlan?: SubscriptionPlan) => string;
	friendlyName: (productDetail?: ProductDetail) => ProductFriendlyName;
	shortFriendlyName?: string;
	allProductsProductTypeFilterString: AllProductsProductTypeFilterString;
	urlPart: ProductUrlPart;
	softOptInIDs: string[];
	legacyUrlPart?: string; // could easily adapt to be string[] if multiple were required in future
	getOphanProductType?: (
		productDetail: ProductDetail,
	) => OphanProduct | undefined;
	shouldRevealSubscriptionId?: boolean;
	tierLabel?: string;
	renewalMetadata?: SupportTheGuardianButtonProps;
	noProductSupportUrlSuffix?: string;
	cancellation?: CancellationFlowProperties; // undefined 'cancellation' means no cancellation flow
	cancelledCopy?: string;
	showTrialRemainingIfApplicable?: true;
	updateAmountMdaEndpoint?: string;
	holidayStops?: HolidayStopFlowProperties;
	delivery?: DeliveryProperties;
	fulfilmentDateCalculator?: {
		productFilenamePart: string;
		explicitSingleDayOfWeek?: string;
	};
	shouldShowJoinDateNotStartDate?: true;
	productPageNewsletterIDs?: string[];
}

export interface GroupedProductType extends ProductType {
	mapGroupedToSpecific: (
		productDetail: ProductDetail | CancelledProductDetail,
	) => ProductType;
	groupFriendlyName: string;
	supportTheGuardianSectionProps?: SupportTheGuardianButtonProps & {
		message: string;
	};
}

export interface ProductTypeWithCancellationFlow extends ProductType {
	cancellation: CancellationFlowProperties;
}

export interface ProductTypeWithDeliveryRecordsProperties extends ProductType {
	delivery: {
		records: DeliveryRecordsProperties;
		enableDeliveryInstructionsUpdate?: boolean;
	};
}

export interface WithProductType<PT extends ProductType> {
	productType: PT;
}

export interface WithGroupedProductType<GPT extends GroupedProductType> {
	groupedProductType: GPT;
}

export interface ProductTypeWithHolidayStopsFlow extends ProductType {
	holidayStops: HolidayStopFlowProperties;
}

const showDeliveryAddressCheck = (
	subscription: Subscription,
): subscription is SubscriptionWithDeliveryAddress =>
	!isGift(subscription) && !!subscription.deliveryAddress;

const calculateProductTitle =
	(baseProductTitle: string) => (mainPlan?: SubscriptionPlan) =>
		baseProductTitle + (mainPlan?.name ? ` - ${mainPlan.name}` : '');

const calculateSupporterPlusTitle = (interval: string) =>
	interval === 'month' ? 'monthly + extras' : 'annual + extras';

const FRONT_PAGE_NEWSLETTER_ID = '6009';
enum SOFT_OPT_IN_IDS {
	support_onboarding = 'your_support_onboarding',
	similar_products = 'similar_guardian_products',
	supporter_newsletter = 'supporter_newsletter',
	subscriber_preview = 'subscriber_preview',
	digi_subscriber_preview = 'digital_subscriber_preview',
	guardian_weekly_newsletter = 'guardian_weekly_newsletter',
}

type ProductTypeKeys =
	| 'membership'
	| 'contributions'
	| 'newspaper'
	| 'homedelivery'
	| 'voucher'
	| 'digitalvoucher'
	| 'guardianweekly'
	| 'digipack'
	| 'supporterplus'
	| 'guardianpatron';

export type GroupedProductTypeKeys =
	| 'membership'
	| 'contributions'
	| 'recurringSupport'
	| 'subscriptions';

export const PRODUCT_TYPES: { [productKey in ProductTypeKeys]: ProductType } = {
	membership: {
		productTitle: () => 'Guardian membership',
		friendlyName: () => 'membership',
		allProductsProductTypeFilterString: 'Membership',
		urlPart: 'membership',
		getOphanProductType: (productDetail: ProductDetail) => {
			switch (productDetail.tier) {
				case 'Supporter':
					return 'MEMBERSHIP_SUPPORTER';
				case 'Partner':
					return 'MEMBERSHIP_PARTNER';
				case 'Patron':
					return 'MEMBERSHIP_PATRON';
			}
		},
		cancellation: {
			reasons: membershipCancellationReasons,
			sfCaseProduct: 'Membership',
			startPageBody: membershipCancellationFlowStart,
			hideReasonTitlePrefix: true,
			summaryReasonSpecificPara: () => undefined,
			onlyShowSupportSectionIfAlternateText: false,
			alternateSupportButtonText: () => undefined,
			alternateSupportButtonUrlSuffix: () => undefined,
		},
		cancelledCopy:
			'Your membership has been cancelled. You will continue to receive the benefits of your membership until',
		tierLabel: 'Membership tier',
		shouldShowJoinDateNotStartDate: true,
		softOptInIDs: [
			SOFT_OPT_IN_IDS.support_onboarding,
			SOFT_OPT_IN_IDS.similar_products,
			SOFT_OPT_IN_IDS.supporter_newsletter,
		],
	},
	contributions: {
		productTitle: () => 'Recurring contribution',
		friendlyName: () => 'recurring contribution',
		allProductsProductTypeFilterString: 'Contribution',
		urlPart: 'contributions',
		getOphanProductType: () => 'RECURRING_CONTRIBUTION',
		noProductSupportUrlSuffix: '/contribute',
		updateAmountMdaEndpoint: 'contribution-update-amount',
		softOptInIDs: [
			SOFT_OPT_IN_IDS.support_onboarding,
			SOFT_OPT_IN_IDS.similar_products,
			SOFT_OPT_IN_IDS.supporter_newsletter,
		],
		cancellation: {
			linkOnProductPage: true,
			reasons: contributionsCancellationReasons,
			sfCaseProduct: 'Recurring - Contributions',
			startPageBody: contributionsCancellationFlowStart,
			shouldHideSummaryMainPara: true,
			summaryReasonSpecificPara: (
				reasonId: OptionalCancellationReasonId,
			) => {
				switch (reasonId) {
					case 'mma_financial_circumstances':
					case 'mma_value_for_money':
					case 'mma_one_off':
						return 'You can support The Guardian’s independent journalism with a single contribution, from as little as £1 – and it only takes a minute.';
					case 'mma_wants_annual_contribution':
						return 'You can support The Guardian’s independent journalism for the long term with an annual contribution.';
					case 'mma_wants_monthly_contribution':
						return 'You can support The Guardian’s independent journalism for the long term with a monthly contribution.';
					default:
						return undefined;
				}
			},
			onlyShowSupportSectionIfAlternateText: true,
			alternateSupportButtonText: (
				reasonId: OptionalCancellationReasonId,
			) => {
				switch (reasonId) {
					case 'mma_financial_circumstances':
					case 'mma_value_for_money':
					case 'mma_one_off':
						return 'Make a single contribution';
					case 'mma_wants_annual_contribution':
						return 'Make an annual contribution';
					case 'mma_wants_monthly_contribution':
						return 'Make a monthly contribution';
					default:
						return undefined;
				}
			},
			alternateSupportButtonUrlSuffix: () => '/contribute', // TODO tweak the support url to preselect single/monthly/annual once functionality is available
			swapFeedbackAndContactUs: true,
			shouldHideThrasher: true,
			shouldShowReminder: true,
		},
	},
	// FIXME: DEPRECATED: once Braze templates have been updated to use voucher/homedelivery, then replace with redirect to /subscriptions for anything with 'paper' in the URL
	newspaper: {
		productTitle: calculateProductTitle('Newspaper subscription'),
		friendlyName: () => 'newspaper subscription',
		allProductsProductTypeFilterString: 'Paper',
		urlPart: 'paper',
		getOphanProductType: () => 'PRINT_SUBSCRIPTION',
		productPageNewsletterIDs: [FRONT_PAGE_NEWSLETTER_ID],
		delivery: {
			showAddress: showDeliveryAddressCheck,
			enableDeliveryInstructionsUpdate: true,
		},
		softOptInIDs: [
			SOFT_OPT_IN_IDS.support_onboarding,
			SOFT_OPT_IN_IDS.subscriber_preview,
			SOFT_OPT_IN_IDS.similar_products,
			SOFT_OPT_IN_IDS.supporter_newsletter,
		],
	},
	homedelivery: {
		productTitle: calculateProductTitle('Newspaper Delivery'),
		friendlyName: () => 'newspaper home delivery subscription',
		shortFriendlyName: 'newspaper home delivery',
		allProductsProductTypeFilterString: 'HomeDelivery',
		urlPart: 'homedelivery',
		getOphanProductType: () => 'PRINT_SUBSCRIPTION',
		productPageNewsletterIDs: [FRONT_PAGE_NEWSLETTER_ID],
		softOptInIDs: [
			SOFT_OPT_IN_IDS.support_onboarding,
			SOFT_OPT_IN_IDS.subscriber_preview,
			SOFT_OPT_IN_IDS.similar_products,
			SOFT_OPT_IN_IDS.supporter_newsletter,
		],
		holidayStops: {
			issueKeyword: 'paper',
		},
		delivery: {
			showAddress: showDeliveryAddressCheck,
			enableDeliveryInstructionsUpdate: true,
			records: {
				productNameForProblemReport: 'Home Delivery',
				showDeliveryInstructions: true,
				numberOfProblemRecordsToShow: 14,
				contactUserOnExistingProblemReport: true,
				availableProblemTypes: [
					{
						label: 'Instructions Not Followed',
						messageIsMandatory: true,
					},
					...commonDeliveryProblemTypes,
				],
			},
		},
		fulfilmentDateCalculator: {
			productFilenamePart: 'Newspaper - Home Delivery',
		},
	},
	voucher: {
		productTitle: calculateProductTitle('Newspaper Voucher'),
		friendlyName: () => 'newspaper voucher subscription',
		shortFriendlyName: 'newspaper voucher booklet',
		allProductsProductTypeFilterString: 'Voucher',
		urlPart: 'voucher',
		getOphanProductType: () => 'PRINT_SUBSCRIPTION',
		productPageNewsletterIDs: [FRONT_PAGE_NEWSLETTER_ID],
		softOptInIDs: [
			SOFT_OPT_IN_IDS.support_onboarding,
			SOFT_OPT_IN_IDS.subscriber_preview,
			SOFT_OPT_IN_IDS.similar_products,
			SOFT_OPT_IN_IDS.supporter_newsletter,
		],
		holidayStops: {
			issueKeyword: 'voucher',
			alternateNoticeString: "one day's notice",
			additionalHowAdvice:
				'Please discard suspended vouchers before the voucher dates. Please note that historical suspensions may not appear here.',
			hideDeliveryRedirectionHelpBullet: true,
			explicitConfirmationRequired: {
				checkboxLabel:
					'I confirm that I will destroy suspended vouchers.',
				explainerModalTitle: 'Destroying your vouchers',
				explainerModalBody:
					'We monitor voucher usage and reserve the right to cancel credits where vouchers have been used during the suspension period.',
			},
		},
		delivery: {
			showAddress: showDeliveryAddressCheck,
			enableDeliveryInstructionsUpdate: true,
		},
		cancellation: {
			linkOnProductPage: true,
			reasons: voucherCancellationReasons,
			sfCaseProduct: 'Voucher Subscriptions',
			checkForOutstandingCredits: true,
			flowWrapper: physicalSubsCancellationFlowWrapper,
			startPageBody: voucherCancellationFlowStart,
			startPageOfferEffectiveDateOptions: true,
			summaryReasonSpecificPara: () => undefined,
			onlyShowSupportSectionIfAlternateText: false,
			alternateSupportButtonText: (
				reasonId: OptionalCancellationReasonId,
			) =>
				reasonId === 'mma_financial_circumstances'
					? '/contribute'
					: undefined,
			alternateSupportButtonUrlSuffix: (
				reasonId: OptionalCancellationReasonId,
			) =>
				reasonId === 'mma_financial_circumstances'
					? '/contribute'
					: undefined,
			swapFeedbackAndContactUs: true,
		},
	},
	digitalvoucher: {
		productTitle: calculateProductTitle('Newspaper Subscription Card'),
		friendlyName: () => 'newspaper subscription card',
		allProductsProductTypeFilterString: 'DigitalVoucher',
		urlPart: 'subscriptioncard',
		legacyUrlPart: 'digitalvoucher',
		getOphanProductType: () => 'PRINT_SUBSCRIPTION',
		productPageNewsletterIDs: [FRONT_PAGE_NEWSLETTER_ID],
		softOptInIDs: [
			SOFT_OPT_IN_IDS.support_onboarding,
			SOFT_OPT_IN_IDS.subscriber_preview,
			SOFT_OPT_IN_IDS.similar_products,
			SOFT_OPT_IN_IDS.supporter_newsletter,
		],
		holidayStops: {
			issueKeyword: 'issue',
			alternateNoticeString: "one day's notice",
			additionalHowAdvice:
				'Please note you will not be able to redeem your paper on any days that you have a suspension in place.',
			hideDeliveryRedirectionHelpBullet: true,
		},
		delivery: {
			showAddress: showDeliveryAddressCheck,
		},
	},
	guardianweekly: {
		productTitle: () => 'Guardian Weekly',
		friendlyName: () => 'Guardian Weekly subscription',
		shortFriendlyName: 'Guardian Weekly',
		allProductsProductTypeFilterString: 'Weekly',
		urlPart: 'guardianweekly',
		softOptInIDs: [
			SOFT_OPT_IN_IDS.support_onboarding,
			SOFT_OPT_IN_IDS.guardian_weekly_newsletter,
			SOFT_OPT_IN_IDS.similar_products,
		],
		getOphanProductType: () => 'PRINT_SUBSCRIPTION', // TODO create a GUARDIAN_WEEKLY Product in Ophan data model
		renewalMetadata: {
			alternateButtonText: 'Subscribe here',
			urlSuffix: 'subscribe/weekly',
			supportReferer: 'gw_renewal',
		},
		holidayStops: {
			issueKeyword: 'issue',
		},
		delivery: {
			showAddress: showDeliveryAddressCheck,
			enableDeliveryInstructionsUpdate: false,
			records: {
				productNameForProblemReport: 'Guardian Weekly',
				numberOfProblemRecordsToShow: 4,
				contactUserOnExistingProblemReport: false,
				availableProblemTypes: commonDeliveryProblemTypes,
			},
		},
		cancellation: {
			linkOnProductPage: true,
			reasons: gwCancellationReasons,
			sfCaseProduct: 'Guardian Weekly',
			checkForOutstandingCredits: true,
			flowWrapper: physicalSubsCancellationFlowWrapper,
			startPageBody: gwCancellationFlowStart,
			startPageOfferEffectiveDateOptions: true,
			summaryReasonSpecificPara: () => undefined,
			onlyShowSupportSectionIfAlternateText: false,
			alternateSupportButtonText: (
				reasonId: OptionalCancellationReasonId,
			) =>
				reasonId === 'mma_financial_circumstances'
					? '/contribute'
					: undefined,
			alternateSupportButtonUrlSuffix: (
				reasonId: OptionalCancellationReasonId,
			) =>
				reasonId === 'mma_financial_circumstances'
					? '/contribute'
					: undefined,
			swapFeedbackAndContactUs: true,
		},
		fulfilmentDateCalculator: {
			productFilenamePart: 'Guardian Weekly',
			explicitSingleDayOfWeek: 'Friday',
		},
	},
	digipack: {
		productTitle: () => 'Digital Subscription',
		friendlyName: () => 'digital subscription',
		allProductsProductTypeFilterString: 'Digipack',
		urlPart: 'digital',
		legacyUrlPart: 'digitalpack',
		getOphanProductType: () => 'DIGITAL_SUBSCRIPTION',
		showTrialRemainingIfApplicable: true,
		softOptInIDs: [
			SOFT_OPT_IN_IDS.support_onboarding,
			SOFT_OPT_IN_IDS.digi_subscriber_preview,
			SOFT_OPT_IN_IDS.similar_products,
			SOFT_OPT_IN_IDS.supporter_newsletter,
		],
		cancellation: {
			linkOnProductPage: true,
			reasons: digipackCancellationReasons,
			sfCaseProduct: 'Digital Pack Subscriptions',
			startPageBody: digipackCancellationFlowStart,
			summaryReasonSpecificPara: () => undefined,
			onlyShowSupportSectionIfAlternateText: false,
			alternateSupportButtonText: (
				reasonId: OptionalCancellationReasonId,
			) =>
				reasonId === 'mma_financial_circumstances'
					? '/contribute'
					: undefined,
			alternateSupportButtonUrlSuffix: (
				reasonId: OptionalCancellationReasonId,
			) =>
				reasonId === 'mma_financial_circumstances'
					? '/contribute'
					: undefined,
			swapFeedbackAndContactUs: true,
		},
	},
	supporterplus: {
		productTitle: (mainPlan?: SubscriptionPlan) => {
			const paidMainPlan = mainPlan as PaidSubscriptionPlan;
			return `${capitalize(
				calculateSupporterPlusTitle(paidMainPlan.interval),
			)}`;
		},
		friendlyName: (productDetail?: ProductDetail) => {
			if (!productDetail) {
				return 'recurring support';
			}

			const interval = (
				getMainPlan(productDetail.subscription) as PaidSubscriptionPlan
			).interval;
			return calculateSupporterPlusTitle(interval);
		},
		allProductsProductTypeFilterString: 'SupporterPlus',
		urlPart: 'support',
		getOphanProductType: () => 'SUPPORTER_PLUS',
		showTrialRemainingIfApplicable: true,
		softOptInIDs: [
			SOFT_OPT_IN_IDS.support_onboarding,
			SOFT_OPT_IN_IDS.similar_products,
			SOFT_OPT_IN_IDS.supporter_newsletter,
			SOFT_OPT_IN_IDS.digi_subscriber_preview,
		],
		cancellation: {
			linkOnProductPage: true,
			reasons: supporterplusCancellationReasons,
			sfCaseProduct: 'Supporter Plus',
			startPageBody: supporterplusCancellationFlowStart,
			summaryReasonSpecificPara: () => undefined,
			onlyShowSupportSectionIfAlternateText: false,
			alternateSupportButtonText: (
				reasonId: OptionalCancellationReasonId,
			) =>
				reasonId === 'mma_financial_circumstances'
					? '/contribute'
					: undefined,
			alternateSupportButtonUrlSuffix: (
				reasonId: OptionalCancellationReasonId,
			) =>
				reasonId === 'mma_financial_circumstances'
					? '/contribute'
					: undefined,
			swapFeedbackAndContactUs: true,
			shouldHideThrasher: true,
		},
	},
	guardianpatron: {
		productTitle: () => 'Guardian Patron',
		friendlyName: () => 'guardian patron',
		allProductsProductTypeFilterString: 'GuardianPatron',
		urlPart: 'guardianpatron',
		legacyUrlPart: 'guardianpatron',
		getOphanProductType: () => 'GUARDIAN_PATRON', //TODO: This value doesn't exist in Ophan yet
		showTrialRemainingIfApplicable: true,
		softOptInIDs: [
			SOFT_OPT_IN_IDS.support_onboarding,
			SOFT_OPT_IN_IDS.digi_subscriber_preview,
			SOFT_OPT_IN_IDS.similar_products,
			SOFT_OPT_IN_IDS.supporter_newsletter,
		],
	},
};

export const GROUPED_PRODUCT_TYPES: {
	[productKey in GroupedProductTypeKeys]: GroupedProductType;
} = {
	membership: {
		...PRODUCT_TYPES.membership,
		mapGroupedToSpecific: () => PRODUCT_TYPES.membership,
		groupFriendlyName: 'membership',
		supportTheGuardianSectionProps: {
			supportReferer: 'account_overview_membership_section',
			message:
				'We no longer have a membership programme but you can still continue to support The Guardian.',
		},
	},
	contributions: {
		...PRODUCT_TYPES.contributions,
		mapGroupedToSpecific: () => PRODUCT_TYPES.contributions,
		groupFriendlyName: 'contributions',
	},
	recurringSupport: {
		productTitle: () => 'Recurring support',
		friendlyName: () => 'recurring support',
		groupFriendlyName: 'recurring support',
		allProductsProductTypeFilterString: 'RecurringSupport',
		urlPart: 'recurringsupport',
		mapGroupedToSpecific: (
			productDetail: ProductDetail | CancelledProductDetail,
		) => {
			if (productDetail.tier === 'Supporter Plus') {
				return PRODUCT_TYPES.supporterplus;
			} else if (productDetail.tier === 'Contributor') {
				return PRODUCT_TYPES.contributions;
			}
			return GROUPED_PRODUCT_TYPES.recurringSupport; // This should never happen!
		},
		softOptInIDs: [], // this is only here for the sake of the typescript type and the unlikely scenario where the mapGroupedToSpecific function returns a grouped product type
		shouldRevealSubscriptionId: true,
	},
	subscriptions: {
		productTitle: () => 'Subscription',
		friendlyName: () => 'subscription',
		groupFriendlyName: 'subscriptions',
		allProductsProductTypeFilterString: 'ContentSubscription',
		urlPart: 'subscriptions',
		mapGroupedToSpecific: (
			productDetail: ProductDetail | CancelledProductDetail,
		) => {
			if (productDetail.tier === 'Digital Pack') {
				return PRODUCT_TYPES.digipack;
			} else if (productDetail.tier === 'Newspaper Delivery') {
				return PRODUCT_TYPES.homedelivery;
			} else if (productDetail.tier === 'Newspaper Voucher') {
				return PRODUCT_TYPES.voucher;
			} else if (
				productDetail.tier.startsWith('Newspaper Digital Voucher')
			) {
				return PRODUCT_TYPES.digitalvoucher;
			} else if (productDetail.tier.startsWith('Guardian Weekly')) {
				return PRODUCT_TYPES.guardianweekly;
			} else if (productDetail.tier.startsWith('guardianpatron')) {
				return PRODUCT_TYPES.guardianpatron;
			}
			return GROUPED_PRODUCT_TYPES.subscriptions; // This should never happen!
		},
		softOptInIDs: [], // this is only here for the sake of the typescript type and the unlikely scenario where the mapGroupedToSpecific function returns a grouped product type
		cancelledCopy:
			'Your subscription has been cancelled. You are able to access your subscription until',
		shouldRevealSubscriptionId: true,
	},
};
