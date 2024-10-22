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
	| 'digital subscription'
	| 'all-access digital subscription'
	| 'Guardian Weekly subscription'
	| 'digital + print subscription'
	| 'subscription'
	| 'support'
	| 'recurring support'
	| 'guardian light'
	| 'guardian patron';
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
	| 'guardianlight'
	| 'guardianpatron';
type SfCaseProduct =
	| 'Membership'
	| 'Recurring - Contributions'
	| 'Voucher Subscriptions'
	| 'Guardian Weekly'
	| 'Digital Pack Subscriptions'
	| 'Supporter Plus'
	| 'Tier Three'
	| 'Guardian Light'
	| 'Guardian Patron';
export type AllProductsProductTypeFilterString =
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
	| 'GuardianLight'
	| 'TierThree';

interface CancellationFlowProperties {
	reasons: CancellationReason[];
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
	summaryReasonSpecificPara: (
		reasonId: OptionalCancellationReasonId,
		currencyISO?: CurrencyIso,
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
	friendlyName: ProductFriendlyName;
	shortFriendlyName?: string;
	productType: ProductTypeKeys;
	groupedProductType: GroupedProductTypeKeys;
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
	| 'nationaldelivery'
	| 'voucher'
	| 'digitalvoucher'
	| 'guardianweekly'
	| 'digipack'
	| 'supporterplus'
	| 'tierthree'
	| 'guardianlight'
	| 'guardianpatron';

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
		getOphanProductType: () => 'PRINT_SUBSCRIPTION',
		productPageNewsletterIDs: [FRONT_PAGE_NEWSLETTER_ID],
		softOptInIDs: [
			SoftOptInIDs.SupportOnboarding,
			SoftOptInIDs.SubscriberPreview,
			SoftOptInIDs.SupporterNewsletter,
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
	nationaldelivery: {
		productTitle: calculateProductTitle('Newspaper Delivery'),
		friendlyName: 'newspaper home delivery subscription',
		shortFriendlyName: 'newspaper home delivery',
		productType: 'nationaldelivery',
		groupedProductType: 'subscriptions',
		allProductsProductTypeFilterString: 'HomeDelivery',
		urlPart: 'nationaldelivery',
		getOphanProductType: () => 'PRINT_SUBSCRIPTION',
		productPageNewsletterIDs: [FRONT_PAGE_NEWSLETTER_ID],
		softOptInIDs: [
			SoftOptInIDs.SupportOnboarding,
			SoftOptInIDs.SubscriberPreview,
			SoftOptInIDs.SupporterNewsletter,
		],
		holidayStops: {
			issueKeyword: 'paper',
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
	digitalvoucher: {
		productTitle: calculateProductTitle('Newspaper Subscription Card'),
		friendlyName: 'newspaper subscription card',
		productType: 'digitalvoucher',
		groupedProductType: 'subscriptions',
		allProductsProductTypeFilterString: 'DigitalVoucher',
		urlPart: 'subscriptioncard',
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
	guardianweekly: {
		productTitle: () => 'Guardian Weekly',
		friendlyName: 'Guardian Weekly subscription',
		shortFriendlyName: 'Guardian Weekly',
		productType: 'guardianweekly',
		groupedProductType: 'subscriptions',
		allProductsProductTypeFilterString: 'Weekly',
		urlPart: 'guardianweekly',
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
	guardianlight: {
		productTitle: () => 'Guardian Light',
		friendlyName: 'guardian light',
		productType: 'guardianlight',
		groupedProductType: 'recurringSupport',
		allProductsProductTypeFilterString: 'GuardianLight',
		urlPart: 'guardianlight',
		getOphanProductType: () => 'GUARDIAN_LIGHT',
		softOptInIDs: [
			SoftOptInIDs.SupportOnboarding,
			SoftOptInIDs.SupporterNewsletter,
		],
		cancellation: {
			alternateSummaryMainPara:
				'This is immediate and you will not be charged again.',
			reasons: shuffledContributionsCancellationReasons,
			sfCaseProduct: 'Guardian Light',
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
