import type { ReactNode } from 'react';
import { tierThreeCancellationFlowStart } from '@/client/components/mma/cancel/tierThree/TierThreeCancellationFlowStart';
import { shuffledTierThreeCancellationReasons } from '@/client/components/mma/cancel/tierThree/TierThreeCancellationReasons';
import type { CurrencyIso } from '@/client/utilities/currencyIso';
import { convertCurrencyIsoToSymbol } from '@/client/utilities/currencyIso';
import type {
	CancellationReason,
	OptionalCancellationReasonId,
} from '../client/components/mma/cancel/cancellationReason';
import { contributionsCancellationFlowStart } from '../client/components/mma/cancel/contributions/ContributionsCancellationFlowStart';
import { shuffledContributionsCancellationReasons } from '../client/components/mma/cancel/contributions/ContributionsCancellationReasons';
import { digipackCancellationFlowStart } from '../client/components/mma/cancel/digipack/DigipackCancellationFlowStart';
import { shuffledDigipackCancellationReasons } from '../client/components/mma/cancel/digipack/DigipackCancellationReasons';
import { gwCancellationFlowStart } from '../client/components/mma/cancel/gw/GwCancellationFlowStart';
import { shuffledGWCancellationReasons } from '../client/components/mma/cancel/gw/GwCancellationReasons';
import { membershipCancellationFlowStart } from '../client/components/mma/cancel/membership/MembershipCancellationFlowStart';
import { shuffledMembershipCancellationReasons } from '../client/components/mma/cancel/membership/MembershipCancellationReasons';
import type { RestOfCancellationFlow } from '../client/components/mma/cancel/PhysicalSubsCancellationFlowWrapper';
import { physicalSubsCancellationFlowWrapper } from '../client/components/mma/cancel/PhysicalSubsCancellationFlowWrapper';
import { supporterplusCancellationFlowStart } from '../client/components/mma/cancel/supporterplus/SupporterplusCancellationFlowStart';
import { shuffledSupporterPlusCancellationReasons } from '../client/components/mma/cancel/supporterplus/SupporterplusCancellationReasons';
import { voucherCancellationFlowStart } from '../client/components/mma/cancel/voucher/VoucherCancellationFlowStart';
import { shuffledVoucherCancellationReasons } from '../client/components/mma/cancel/voucher/VoucherCancellationReasons';
import type { SupportTheGuardianButtonProps } from '../client/components/shared/SupportTheGuardianButton';
import type { OphanProduct } from './ophanTypes';
import type {
	BillingPeriod,
	PaidSubscriptionPlan,
	ProductDetail,
	Subscription,
	SubscriptionPlan,
	SubscriptionWithDeliveryAddress,
} from './productResponse';
import { isGift } from './productResponse';
import { SoftOptInIDs } from './softOptInIDs';

type ProductFriendlyName =
	| 'Membership'
	| 'recurring contribution' // TODO use payment frequency instead of 'recurring' e.g. monthly annual etc
	| 'newspaper subscription'
	| 'newspaper voucher subscription'
	| 'newspaper subscription card'
	| 'newspaper home delivery subscription'
	| 'newspaper home delivery plus digital subscription'
	| 'digital subscription'
	| 'all-access digital subscription'
	| 'Guardian Weekly subscription'
	| 'digital + print subscription'
	| 'subscription'
	| 'support'
	| 'recurring support'
	| 'guardian ad-lite'
	| 'guardian patron'
	| 'newspaper delivery - Observer subscription'
	| 'newspaper subscription card - Observer'
	| 'newspaper voucher subscription - Observer';
type ProductUrlPart =
	| 'membership'
	| 'contributions'
	| 'paper'
	| 'voucher'
	| 'subscriptioncard'
	| 'homedelivery'
	| 'nationaldelivery'
	| 'digital'
	| 'support'
	| 'guardianweekly'
	| 'digital+print'
	| 'subscriptions'
	| 'recurringsupport'
	| 'guardianadlite'
	| 'guardianpatron';
type SfCaseProduct =
	| 'Membership'
	| 'Recurring - Contributions'
	| 'Voucher Subscriptions'
	| 'Guardian Weekly'
	| 'Digital Pack Subscriptions'
	| 'Supporter Plus'
	| 'Tier Three'
	| 'Guardian Ad-Lite'
	| 'Guardian Patron';
export type AllProductsProductTypeFilterString =
	| 'Weekly'
	| 'Paper'
	| 'Voucher'
	| 'DigitalVoucher'
	| 'HomeDelivery'
	| 'HomeDeliveryPlusDigital'
	| 'Contribution'
	| 'Membership'
	| 'Digipack'
	| 'SupporterPlus'
	| 'ContentSubscription'
	| 'GuardianPatron'
	| 'GuardianAdLite'
	| 'TierThree';

interface CancellationFlowProperties {
	reasons?: CancellationReason[];
	sfCaseProduct: SfCaseProduct;
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
	summaryReasonSpecificPara?: (
		reasonId: OptionalCancellationReasonId,
		currencyISO?: CurrencyIso,
	) => string | undefined;
	onlyShowSupportSectionIfAlternateText: boolean;
	alternateSupportButtonText?: (
		reasonId: OptionalCancellationReasonId,
	) => string | undefined;
	alternateSupportButtonUrlSuffix: (
		reasonId: OptionalCancellationReasonId,
	) => string | undefined;
	swapFeedbackAndContactUs?: true;
	shouldShowReminder?: true;
	shouldHideThrasher?: true;
}

interface CancellationFlowPropertiesMandatoryReasons
	extends CancellationFlowProperties {
	reasons: CancellationReason[];
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
	friendlyName: ProductFriendlyName;
	shortFriendlyName?: string;
	productType: ProductTypeKeys;
	groupedProductType: GroupedProductTypeKeys;
	checkoutUrlPart?: string;
	allProductsProductTypeFilterString: AllProductsProductTypeFilterString;
	urlPart: ProductUrlPart;
	softOptInIDs: string[];
	legacyUrlPart?: string; // could easily adapt to be string[] if multiple were required in future
	getOphanProductType?: (
		productDetail: ProductDetail,
	) => OphanProduct | undefined;
	showSupporterId?: boolean;
	tierLabel?: string;
	renewalMetadata?: SupportTheGuardianButtonProps;
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

export interface GroupedProductType
	extends Omit<
		ProductType,
		'productType' | 'groupedProductType' | 'softOptInIDs'
	> {
	groupFriendlyName: string;
	supportTheGuardianSectionProps?: SupportTheGuardianButtonProps & {
		message: string;
	};
}

export interface ProductTypeWithCancellationFlow extends ProductType {
	cancellation: CancellationFlowProperties;
}

export interface ProductTypeWithCancellationFlowMandatoryReasons
	extends ProductType {
	cancellation: CancellationFlowPropertiesMandatoryReasons;
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

export function getBillingPeriodAdjective(
	billingPeriod?: BillingPeriod,
): 'Monthly' | 'Annual' | 'Quarterly' {
	if (billingPeriod === 'month') {
		return 'Monthly';
	}
	if (billingPeriod === 'year') {
		return 'Annual';
	}
	if (billingPeriod === 'quarter') {
		return 'Quarterly';
	}

	throw new Error('No billing period for subscription');
}

const FRONT_PAGE_NEWSLETTER_ID = '6009';

export type ProductTypeKeys =
	| 'membership'
	| 'contributions'
	| 'newspaper'
	| 'homedelivery'
	| 'homedeliveryplusdigital'
	| 'nationaldelivery'
	| 'voucher'
	| 'digitalvoucher'
	| 'guardianweekly'
	| 'digipack'
	| 'supporterplus'
	| 'tierthree'
	| 'guardianadlite'
	| 'guardianpatron'
	| 'observer'
	| 'digitalvoucherobserver'
	| 'voucherobserver';

export type GroupedProductTypeKeys =
	| 'membership'
	| 'recurringSupport'
	| 'recurringSupportWithBenefits'
	| 'subscriptions';

export const PRODUCT_TYPES: Record<ProductTypeKeys, ProductType> = {
	membership: {
		productTitle: () => 'Guardian Membership',
		friendlyName: 'Membership',
		productType: 'membership',
		groupedProductType: 'membership',
		allProductsProductTypeFilterString: 'Membership',
		urlPart: 'membership',
		getOphanProductType: (productDetail: ProductDetail) => {
			switch (productDetail.mmaProductKey) {
				case 'Supporter':
					return 'MEMBERSHIP_SUPPORTER';
				case 'Partner':
					return 'MEMBERSHIP_PARTNER';
				case 'Patron':
					return 'MEMBERSHIP_PATRON';
			}
		},
		cancellation: {
			reasons: shuffledMembershipCancellationReasons,
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
			SoftOptInIDs.SupportOnboarding,
			SoftOptInIDs.SupporterNewsletter,
		],
	},
	contributions: {
		productTitle: (mainPlan?: SubscriptionPlan) => {
			if (!mainPlan) {
				return 'Recurring contribution';
			}

			const paidPlan = mainPlan as PaidSubscriptionPlan;
			return `${getBillingPeriodAdjective(
				paidPlan.billingPeriod,
			)} contribution`;
		},
		friendlyName: 'recurring contribution',
		productType: 'contributions',
		groupedProductType: 'recurringSupport',
		allProductsProductTypeFilterString: 'Contribution',
		urlPart: 'contributions',
		checkoutUrlPart: '/contribute', // https://support.theguardian.com/uk/contribute
		getOphanProductType: () => 'RECURRING_CONTRIBUTION',
		updateAmountMdaEndpoint: 'contribution-update-amount',
		softOptInIDs: [
			SoftOptInIDs.SupportOnboarding,
			SoftOptInIDs.SupporterNewsletter,
		],
		cancellation: {
			alternateSummaryMainPara:
				'This is immediate and you will not be charged again.',
			reasons: shuffledContributionsCancellationReasons,
			sfCaseProduct: 'Recurring - Contributions',
			startPageBody: contributionsCancellationFlowStart,
			shouldHideSummaryMainPara: true,
			summaryReasonSpecificPara: (
				reasonId: OptionalCancellationReasonId,
			) => {
				switch (reasonId) {
					case 'mma_financial_circumstances':
					case 'mma_value_for_money':
						return 'You can support The Guardian’s independent journalism with a One-time contribution, from as little as £1 – and it only takes a minute.';
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
						return 'Make a One-time contribution';
					default:
						return undefined;
				}
			},
			alternateSupportButtonUrlSuffix: () => undefined,
			swapFeedbackAndContactUs: true,
			shouldHideThrasher: true,
			shouldShowReminder: true,
		},
	},
	// FIXME: DEPRECATED: once Braze templates have been updated to use voucher/homedelivery, then replace with redirect to /subscriptions for anything with 'paper' in the URL
	newspaper: {
		productTitle: calculateProductTitle('Newspaper subscription'),
		friendlyName: 'newspaper subscription',
		productType: 'newspaper',
		groupedProductType: 'subscriptions',
		allProductsProductTypeFilterString: 'Paper',
		urlPart: 'paper',
		checkoutUrlPart: '/subscribe', // https://support.theguardian.com/uk/subscribe
		getOphanProductType: () => 'PRINT_SUBSCRIPTION',
		productPageNewsletterIDs: [FRONT_PAGE_NEWSLETTER_ID],
		delivery: {
			showAddress: showDeliveryAddressCheck,
			enableDeliveryInstructionsUpdate: true,
		},
		softOptInIDs: [
			SoftOptInIDs.SupportOnboarding,
			SoftOptInIDs.SubscriberPreview,
			SoftOptInIDs.SupporterNewsletter,
		],
	},
	homedelivery: {
		productTitle: calculateProductTitle('Newspaper Delivery'),
		friendlyName: 'newspaper home delivery subscription',
		shortFriendlyName: 'newspaper home delivery',
		productType: 'homedelivery',
		groupedProductType: 'subscriptions',
		allProductsProductTypeFilterString: 'HomeDelivery',
		urlPart: 'homedelivery',
		checkoutUrlPart: '/subscribe', // https://support.theguardian.com/uk/subscribe
		getOphanProductType: () => 'PRINT_SUBSCRIPTION',
		productPageNewsletterIDs: [FRONT_PAGE_NEWSLETTER_ID],
		softOptInIDs: [
			SoftOptInIDs.SupportOnboarding,
			SoftOptInIDs.SubscriberPreview,
			SoftOptInIDs.SupporterNewsletter,
		],
		holidayStops: {
			issueKeyword: 'paper',
			alternateNoticeString: "two working days' notice",
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
	homedeliveryplusdigital: {
		productTitle: calculateProductTitle('Newspaper Delivery'),
		friendlyName: 'newspaper home delivery plus digital subscription',
		shortFriendlyName: 'newspaper home delivery + digital',
		productType: 'homedeliveryplusdigital',
		groupedProductType: 'subscriptions',
		allProductsProductTypeFilterString: 'HomeDeliveryPlusDigital',
		urlPart: 'homedelivery',
		checkoutUrlPart: '/subscribe', // https://support.theguardian.com/uk/subscribe
		getOphanProductType: () => 'PRINT_SUBSCRIPTION',
		productPageNewsletterIDs: [FRONT_PAGE_NEWSLETTER_ID],
		softOptInIDs: [
			SoftOptInIDs.SupportOnboarding,
			SoftOptInIDs.SubscriberPreview,
			SoftOptInIDs.SupporterNewsletter,
		],
		holidayStops: {
			issueKeyword: 'paper',
			alternateNoticeString: "two working days' notice",
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
	observer: {
		productTitle: () => 'Newspaper Delivery - Observer Subscription',
		friendlyName: 'newspaper delivery - Observer subscription',
		shortFriendlyName: 'newspaper delivery - Observer subscription',
		productType: 'homedelivery',
		groupedProductType: 'subscriptions',
		allProductsProductTypeFilterString: 'HomeDelivery',
		urlPart: 'homedelivery',
		checkoutUrlPart: '/subscribe', // https://support.theguardian.com/uk/subscribe
		getOphanProductType: () => 'PRINT_SUBSCRIPTION',
		productPageNewsletterIDs: [FRONT_PAGE_NEWSLETTER_ID],
		softOptInIDs: [],
		holidayStops: {
			issueKeyword: 'paper',
			alternateNoticeString: "two working days' notice",
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
	nationaldelivery: {
		productTitle: calculateProductTitle('Newspaper Delivery'),
		friendlyName: 'newspaper home delivery subscription',
		shortFriendlyName: 'newspaper home delivery',
		productType: 'nationaldelivery',
		groupedProductType: 'subscriptions',
		allProductsProductTypeFilterString: 'HomeDelivery',
		urlPart: 'nationaldelivery',
		checkoutUrlPart: '/subscribe', // https://support.theguardian.com/uk/subscribe
		getOphanProductType: () => 'PRINT_SUBSCRIPTION',
		productPageNewsletterIDs: [FRONT_PAGE_NEWSLETTER_ID],
		softOptInIDs: [
			SoftOptInIDs.SupportOnboarding,
			SoftOptInIDs.SubscriberPreview,
			SoftOptInIDs.SupporterNewsletter,
		],
		holidayStops: {
			issueKeyword: 'paper',
			alternateNoticeString: "three days' notice",
		},
		delivery: {
			showAddress: showDeliveryAddressCheck,
			enableDeliveryInstructionsUpdate: true,
			records: {
				productNameForProblemReport: 'National Delivery',
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
			productFilenamePart: 'Newspaper - National Delivery',
		},
	},
	voucher: {
		productTitle: calculateProductTitle('Newspaper Voucher'),
		friendlyName: 'newspaper voucher subscription',
		shortFriendlyName: 'newspaper voucher booklet',
		productType: 'voucher',
		groupedProductType: 'subscriptions',
		allProductsProductTypeFilterString: 'Voucher',
		urlPart: 'voucher',
		checkoutUrlPart: '/subscribe', // https://support.theguardian.com/uk/subscribe
		getOphanProductType: () => 'PRINT_SUBSCRIPTION',
		productPageNewsletterIDs: [FRONT_PAGE_NEWSLETTER_ID],
		softOptInIDs: [
			SoftOptInIDs.SupportOnboarding,
			SoftOptInIDs.SubscriberPreview,
			SoftOptInIDs.SupporterNewsletter,
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
			reasons: shuffledVoucherCancellationReasons,
			sfCaseProduct: 'Voucher Subscriptions',
			checkForOutstandingCredits: true,
			flowWrapper: physicalSubsCancellationFlowWrapper,
			startPageBody: voucherCancellationFlowStart,
			startPageOfferEffectiveDateOptions: true,
			summaryReasonSpecificPara: () => undefined,
			onlyShowSupportSectionIfAlternateText: false,
			alternateSupportButtonText: () => undefined,
			alternateSupportButtonUrlSuffix: () => undefined,
			swapFeedbackAndContactUs: true,
		},
	},
	voucherobserver: {
		productTitle: () => 'Newspaper Voucher - Observer',
		friendlyName: 'newspaper voucher subscription - Observer',
		shortFriendlyName: 'newspaper voucher booklet',
		productType: 'voucher',
		groupedProductType: 'subscriptions',
		allProductsProductTypeFilterString: 'Voucher',
		urlPart: 'voucher',
		checkoutUrlPart: '/subscribe', // https://support.theguardian.com/uk/subscribe
		getOphanProductType: () => 'PRINT_SUBSCRIPTION',
		productPageNewsletterIDs: [FRONT_PAGE_NEWSLETTER_ID],
		softOptInIDs: [],
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
			reasons: shuffledVoucherCancellationReasons,
			sfCaseProduct: 'Voucher Subscriptions',
			checkForOutstandingCredits: true,
			flowWrapper: physicalSubsCancellationFlowWrapper,
			startPageBody: voucherCancellationFlowStart,
			startPageOfferEffectiveDateOptions: true,
			summaryReasonSpecificPara: () => undefined,
			onlyShowSupportSectionIfAlternateText: false,
			alternateSupportButtonText: () => undefined,
			alternateSupportButtonUrlSuffix: () => undefined,
			swapFeedbackAndContactUs: true,
		},
	},
	digitalvoucher: {
		productTitle: calculateProductTitle('Newspaper Subscription Card'),
		friendlyName: 'newspaper subscription card',
		productType: 'digitalvoucher',
		groupedProductType: 'subscriptions',
		allProductsProductTypeFilterString: 'DigitalVoucher',
		urlPart: 'subscriptioncard',
		checkoutUrlPart: '/subscribe', // https://support.theguardian.com/uk/subscribe
		legacyUrlPart: 'digitalvoucher',
		getOphanProductType: () => 'PRINT_SUBSCRIPTION',
		productPageNewsletterIDs: [FRONT_PAGE_NEWSLETTER_ID],
		softOptInIDs: [
			SoftOptInIDs.SupportOnboarding,
			SoftOptInIDs.SubscriberPreview,
			SoftOptInIDs.SupporterNewsletter,
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
	digitalvoucherobserver: {
		productTitle: () => 'Newspaper Subscription Card - Observer',
		friendlyName: 'newspaper subscription card - Observer',
		productType: 'digitalvoucher',
		groupedProductType: 'subscriptions',
		allProductsProductTypeFilterString: 'DigitalVoucher',
		urlPart: 'subscriptioncard',
		checkoutUrlPart: '/subscribe', // https://support.theguardian.com/uk/subscribe
		legacyUrlPart: 'digitalvoucher',
		getOphanProductType: () => 'PRINT_SUBSCRIPTION',
		productPageNewsletterIDs: [FRONT_PAGE_NEWSLETTER_ID],
		softOptInIDs: [],
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
		friendlyName: 'Guardian Weekly subscription',
		shortFriendlyName: 'Guardian Weekly',
		productType: 'guardianweekly',
		groupedProductType: 'subscriptions',
		allProductsProductTypeFilterString: 'Weekly',
		urlPart: 'guardianweekly',
		checkoutUrlPart: '/subscribe', // https://support.theguardian.com/uk/subscribe
		softOptInIDs: [
			SoftOptInIDs.SupportOnboarding,
			SoftOptInIDs.GuardianWeeklyNewsletter,
		],
		getOphanProductType: () => 'PRINT_SUBSCRIPTION', // TODO create a GUARDIAN_WEEKLY Product in Ophan data model
		renewalMetadata: {
			alternateButtonText: 'Subscribe here',
			urlSuffix: 'subscribe/weekly',
			supportReferer: 'gw_renewal',
		},
		holidayStops: {
			issueKeyword: 'issue',
			alternateNoticeString:
				'notice by the Tuesday of the week before your issue is due',
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
			reasons: shuffledGWCancellationReasons,
			sfCaseProduct: 'Guardian Weekly',
			checkForOutstandingCredits: true,
			flowWrapper: physicalSubsCancellationFlowWrapper,
			startPageBody: gwCancellationFlowStart,
			startPageOfferEffectiveDateOptions: true,
			summaryReasonSpecificPara: () => undefined,
			onlyShowSupportSectionIfAlternateText: false,
			alternateSupportButtonText: () => undefined,
			alternateSupportButtonUrlSuffix: () => undefined,
			swapFeedbackAndContactUs: true,
		},
		fulfilmentDateCalculator: {
			productFilenamePart: 'Guardian Weekly',
			explicitSingleDayOfWeek: 'Friday',
		},
	},
	tierthree: {
		productTitle: () => 'Digital + Print',
		friendlyName: 'digital + print subscription',
		productType: 'tierthree',
		groupedProductType: 'recurringSupportWithBenefits',
		allProductsProductTypeFilterString: 'TierThree',
		urlPart: 'digital+print',
		checkoutUrlPart: '/support', // https://support.theguardian.com/uk/support
		softOptInIDs: [
			SoftOptInIDs.SupportOnboarding,
			SoftOptInIDs.SupporterNewsletter,
			SoftOptInIDs.DigitalSubscriberPreview,
			SoftOptInIDs.GuardianWeeklyNewsletter,
		],
		getOphanProductType: () => 'PRINT_SUBSCRIPTION', //TODO what should this be?
		holidayStops: {
			issueKeyword: 'issue',
		},
		delivery: {
			showAddress: showDeliveryAddressCheck,
			enableDeliveryInstructionsUpdate: false,
			records: {
				productNameForProblemReport: 'Tier Three Guardian Weekly',
				numberOfProblemRecordsToShow: 4,
				contactUserOnExistingProblemReport: false,
				availableProblemTypes: commonDeliveryProblemTypes,
			},
		},
		cancellation: {
			reasons: shuffledTierThreeCancellationReasons,
			sfCaseProduct: 'Tier Three',
			checkForOutstandingCredits: true,
			flowWrapper: physicalSubsCancellationFlowWrapper,
			startPageBody: tierThreeCancellationFlowStart,
			startPageOfferEffectiveDateOptions: true,
			summaryReasonSpecificPara: (_, currencyISO?: CurrencyIso) => {
				const currencySymbol = convertCurrencyIsoToSymbol(
					currencyISO || 'USD',
				);
				return `Your support, no matter what amount, allows us to fund independent Guardian journalism. You can support us from as little as ${currencySymbol}1. It only takes a minute but makes a big difference.`;
			},
			onlyShowSupportSectionIfAlternateText: false,
			alternateSupportButtonText: () => undefined,
			alternateSupportButtonUrlSuffix: () => undefined,
			swapFeedbackAndContactUs: true,
		},
		fulfilmentDateCalculator: {
			productFilenamePart: 'Guardian Weekly',
			explicitSingleDayOfWeek: 'Friday',
		},
	},
	digipack: {
		productTitle: () => 'Digital Subscription',
		friendlyName: 'digital subscription',
		productType: 'digipack',
		groupedProductType: 'subscriptions',
		allProductsProductTypeFilterString: 'Digipack',
		urlPart: 'digital',
		legacyUrlPart: 'digitalpack',
		getOphanProductType: () => 'DIGITAL_SUBSCRIPTION',
		showTrialRemainingIfApplicable: true,
		softOptInIDs: [
			SoftOptInIDs.SupportOnboarding,
			SoftOptInIDs.DigitalSubscriberPreview,
			SoftOptInIDs.SupporterNewsletter,
		],
		cancellation: {
			reasons: shuffledDigipackCancellationReasons,
			sfCaseProduct: 'Digital Pack Subscriptions',
			startPageBody: digipackCancellationFlowStart,
			summaryReasonSpecificPara: () => undefined,
			onlyShowSupportSectionIfAlternateText: false,
			alternateSupportButtonText: () => undefined,
			alternateSupportButtonUrlSuffix: () => undefined,
			swapFeedbackAndContactUs: true,
		},
	},
	supporterplus: {
		productTitle: () => 'All-access digital',
		friendlyName: 'all-access digital subscription',
		shortFriendlyName: 'all-access digital',
		productType: 'supporterplus',
		groupedProductType: 'recurringSupportWithBenefits',
		allProductsProductTypeFilterString: 'SupporterPlus',
		urlPart: 'support',
		checkoutUrlPart: '/support', // https://support.theguardian.com/uk/support
		getOphanProductType: () => 'SUPPORTER_PLUS',
		showTrialRemainingIfApplicable: true,
		softOptInIDs: [
			SoftOptInIDs.SupportOnboarding,
			SoftOptInIDs.SupporterNewsletter,
			SoftOptInIDs.DigitalSubscriberPreview,
		],
		cancelledCopy:
			'Your subscription has been cancelled. You are able to access your subscription until',
		cancellation: {
			alternateSummaryMainPara:
				"This is immediate and you will not be charged again. If you've cancelled within the first 14 days, we'll send you a full refund.",
			reasons: shuffledSupporterPlusCancellationReasons,
			sfCaseProduct: 'Supporter Plus',
			startPageBody: supporterplusCancellationFlowStart,
			summaryReasonSpecificPara: () => undefined,
			onlyShowSupportSectionIfAlternateText: false,
			alternateSupportButtonText: () => undefined,
			alternateSupportButtonUrlSuffix: () => undefined,
			swapFeedbackAndContactUs: true,
			shouldHideThrasher: true,
		},
	},
	guardianpatron: {
		productTitle: () => 'Guardian Patron',
		friendlyName: 'guardian patron',
		productType: 'guardianpatron',
		groupedProductType: 'subscriptions',
		allProductsProductTypeFilterString: 'GuardianPatron',
		urlPart: 'guardianpatron',
		getOphanProductType: () => 'GUARDIAN_PATRON', //TODO: This value doesn't exist in Ophan yet
		showTrialRemainingIfApplicable: true,
		softOptInIDs: [
			SoftOptInIDs.SupportOnboarding,
			SoftOptInIDs.DigitalSubscriberPreview,
			SoftOptInIDs.SupporterNewsletter,
		],
	},
	guardianadlite: {
		productTitle: () => 'Guardian Ad-Lite',
		friendlyName: 'guardian ad-lite',
		productType: 'guardianadlite',
		groupedProductType: 'subscriptions',
		allProductsProductTypeFilterString: 'GuardianAdLite',
		urlPart: 'guardianadlite',
		checkoutUrlPart: '/guardian-ad-lite', // https://support.theguardian.com/uk/guardian-ad-lite
		getOphanProductType: () => 'GUARDIAN_AD_LITE',
		softOptInIDs: [SoftOptInIDs.SupportOnboarding],
		cancellation: {
			sfCaseProduct: 'Guardian Ad-Lite',
			startPageBody: contributionsCancellationFlowStart,
			onlyShowSupportSectionIfAlternateText: true,
			alternateSupportButtonUrlSuffix: () => undefined,
			swapFeedbackAndContactUs: true,
			shouldHideThrasher: true,
			alternateSummaryMainPara:
				"This is immediate and you will not be charged again. If you've cancelled within the first 14 days, your subscription will stop immediately and we will not take the first payment from you.",
		},
	},
};
export const GROUPED_PRODUCT_TYPES: Record<
	GroupedProductTypeKeys,
	GroupedProductType
> = {
	membership: {
		...PRODUCT_TYPES.membership, // TODO: Can we omit 'groupedProductType' and 'softOptInIDs' from spread properties as omitted from type
		groupFriendlyName: 'Membership',
		showSupporterId: true,
		supportTheGuardianSectionProps: {
			supportReferer: 'account_overview_membership_section',
			message:
				'We no longer have a Membership programme but you can still continue to support the Guardian.',
		},
	},
	recurringSupport: {
		productTitle: () => 'Support',
		friendlyName: 'support',
		groupFriendlyName: 'support',
		allProductsProductTypeFilterString: 'Contribution',
		urlPart: 'recurringsupport',
		showSupporterId: true,
	},
	recurringSupportWithBenefits: {
		productTitle: () => 'Subscription',
		friendlyName: 'subscription',
		groupFriendlyName: 'subscription',
		allProductsProductTypeFilterString: 'SupporterPlus', // this will only return SupporterPlus, and not Contributions
		urlPart: 'recurringsupport',
		showSupporterId: true,
	},
	subscriptions: {
		productTitle: () => 'Subscription',
		friendlyName: 'subscription',
		groupFriendlyName: 'subscriptions',
		allProductsProductTypeFilterString: 'ContentSubscription',
		urlPart: 'subscriptions',
		cancelledCopy:
			'Your subscription has been cancelled. You are able to access your subscription until',
	},
};
