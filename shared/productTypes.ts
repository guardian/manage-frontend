import { capitalize } from 'lodash';
import type { ReactNode } from 'react';
import type {
	CancellationReason,
	OptionalCancellationReasonId,
} from '../client/components/mma/cancel/cancellationReason';
import { contributionsCancellationFlowStart } from '../client/components/mma/cancel/contributions/ContributionsCancellationFlowStart';
import { shuffledContributionsCancellationReasons } from '../client/components/mma/cancel/contributions/ContributionsCancellationReasons';
import { digipackCancellationFlowStart } from '../client/components/mma/cancel/digipack/DigipackCancellationFlowStart';
import { digipackCancellationReasons } from '../client/components/mma/cancel/digipack/DigipackCancellationReasons';
import { gwCancellationFlowStart } from '../client/components/mma/cancel/gw/GwCancellationFlowStart';
import { gwCancellationReasons } from '../client/components/mma/cancel/gw/GwCancellationReasons';
import { membershipCancellationFlowStart } from '../client/components/mma/cancel/membership/MembershipCancellationFlowStart';
import { membershipCancellationReasons } from '../client/components/mma/cancel/membership/MembershipCancellationReasons';
import type { RestOfCancellationFlow } from '../client/components/mma/cancel/PhysicalSubsCancellationFlowWrapper';
import { physicalSubsCancellationFlowWrapper } from '../client/components/mma/cancel/PhysicalSubsCancellationFlowWrapper';
import { supporterplusCancellationFlowStart } from '../client/components/mma/cancel/supporterplus/SupporterplusCancellationFlowStart';
import { shuffledSupporterPlusCancellationReasons } from '../client/components/mma/cancel/supporterplus/SupporterplusCancellationReasons';
import { voucherCancellationFlowStart } from '../client/components/mma/cancel/voucher/VoucherCancellationFlowStart';
import { voucherCancellationReasons } from '../client/components/mma/cancel/voucher/VoucherCancellationReasons';
import type { SupportTheGuardianButtonProps } from '../client/components/shared/SupportTheGuardianButton';
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
import { SoftOptInIDs } from './softOptInIDs';

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
	| 'GuardianPatron';

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
	alternateSummaryHeading: (
		productDetail: ProductDetail,
	) => string | undefined;
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

export interface GroupedProductType
	extends Omit<
		ProductType,
		'productType' | 'groupedProductType' | 'softOptInIDs'
	> {
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

export const calculateSupporterPlusTitle = (billingPeriod: string) =>
	billingPeriod === 'month' ? 'monthly + extras' : 'annual + extras';

export const calculateMonthlyOrAnnualFromBillingPeriod = (
	billingPeriod: string,
) => (billingPeriod === 'month' ? 'Monthly' : 'Annual');

const FRONT_PAGE_NEWSLETTER_ID = '6009';

export type ProductTypeKeys =
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
	| 'recurringSupport'
	| 'subscriptions';

export const PRODUCT_TYPES: { [productKey in ProductTypeKeys]: ProductType } = {
	membership: {
		productTitle: () => 'Guardian membership',
		friendlyName: () => 'membership',
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
			reasons: membershipCancellationReasons,
			sfCaseProduct: 'Membership',
			startPageBody: membershipCancellationFlowStart,
			alternateSummaryHeading: () => undefined,
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
			SoftOptInIDs.SimilarProducts,
			SoftOptInIDs.SupporterNewsletter,
		],
	},
	contributions: {
		productTitle: (mainPlan?: SubscriptionPlan) => {
			if (!mainPlan) {
				return 'Recurring contribution';
			}

			const paidPlan = mainPlan as PaidSubscriptionPlan;
			return `${calculateMonthlyOrAnnualFromBillingPeriod(
				paidPlan.billingPeriod,
			)} contribution`;
		},
		friendlyName: () => 'recurring contribution',
		productType: 'contributions',
		groupedProductType: 'recurringSupport',
		allProductsProductTypeFilterString: 'Contribution',
		urlPart: 'contributions',
		getOphanProductType: () => 'RECURRING_CONTRIBUTION',
		noProductSupportUrlSuffix: '/contribute',
		updateAmountMdaEndpoint: 'contribution-update-amount',
		softOptInIDs: [
			SoftOptInIDs.SupportOnboarding,
			SoftOptInIDs.SimilarProducts,
			SoftOptInIDs.SupporterNewsletter,
		],
		cancellation: {
			linkOnProductPage: true,
			reasons: shuffledContributionsCancellationReasons,
			sfCaseProduct: 'Recurring - Contributions',
			startPageBody: contributionsCancellationFlowStart,
			shouldHideSummaryMainPara: true,
			alternateSummaryHeading: () => undefined,
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
			alternateSupportButtonUrlSuffix: () => undefined,
			swapFeedbackAndContactUs: true,
			shouldHideThrasher: true,
			shouldShowReminder: true,
		},
	},
	// FIXME: DEPRECATED: once Braze templates have been updated to use voucher/homedelivery, then replace with redirect to /subscriptions for anything with 'paper' in the URL
	newspaper: {
		productTitle: calculateProductTitle('Newspaper subscription'),
		friendlyName: () => 'newspaper subscription',
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
			SoftOptInIDs.SimilarProducts,
			SoftOptInIDs.SupporterNewsletter,
		],
	},
	homedelivery: {
		productTitle: calculateProductTitle('Newspaper Delivery'),
		friendlyName: () => 'newspaper home delivery subscription',
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
			SoftOptInIDs.SimilarProducts,
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
	voucher: {
		productTitle: calculateProductTitle('Newspaper Voucher'),
		friendlyName: () => 'newspaper voucher subscription',
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
			SoftOptInIDs.SimilarProducts,
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
			linkOnProductPage: true,
			reasons: voucherCancellationReasons,
			sfCaseProduct: 'Voucher Subscriptions',
			checkForOutstandingCredits: true,
			flowWrapper: physicalSubsCancellationFlowWrapper,
			startPageBody: voucherCancellationFlowStart,
			startPageOfferEffectiveDateOptions: true,
			summaryReasonSpecificPara: () => undefined,
			onlyShowSupportSectionIfAlternateText: false,
			alternateSummaryHeading: () => undefined,
			alternateSupportButtonText: () => undefined,
			alternateSupportButtonUrlSuffix: () => undefined,
			swapFeedbackAndContactUs: true,
		},
	},
	digitalvoucher: {
		productTitle: calculateProductTitle('Newspaper Subscription Card'),
		friendlyName: () => 'newspaper subscription card',
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
			SoftOptInIDs.SimilarProducts,
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
		friendlyName: () => 'Guardian Weekly subscription',
		shortFriendlyName: 'Guardian Weekly',
		productType: 'guardianweekly',
		groupedProductType: 'subscriptions',
		allProductsProductTypeFilterString: 'Weekly',
		urlPart: 'guardianweekly',
		softOptInIDs: [
			SoftOptInIDs.SupportOnboarding,
			SoftOptInIDs.GuardianWeeklyNewsletter,
			SoftOptInIDs.SimilarProducts,
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
			alternateSummaryHeading: () => undefined,
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
		friendlyName: () => 'digital subscription',
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
			SoftOptInIDs.SimilarProducts,
			SoftOptInIDs.SupporterNewsletter,
		],
		cancellation: {
			linkOnProductPage: true,
			reasons: digipackCancellationReasons,
			sfCaseProduct: 'Digital Pack Subscriptions',
			startPageBody: digipackCancellationFlowStart,
			summaryReasonSpecificPara: () => undefined,
			onlyShowSupportSectionIfAlternateText: false,
			alternateSummaryHeading: () => undefined,
			alternateSupportButtonText: () => undefined,
			alternateSupportButtonUrlSuffix: () => undefined,
			swapFeedbackAndContactUs: true,
		},
	},
	supporterplus: {
		productTitle: (mainPlan?: SubscriptionPlan) => {
			if (!mainPlan) {
				return 'Recurring support';
			}

			const paidMainPlan = mainPlan as PaidSubscriptionPlan;
			return `${capitalize(
				calculateSupporterPlusTitle(paidMainPlan.billingPeriod),
			)}`;
		},
		friendlyName: (productDetail?: ProductDetail) => {
			if (!productDetail) {
				return 'recurring support';
			}

			const billingPeriod = (
				getMainPlan(productDetail.subscription) as PaidSubscriptionPlan
			).billingPeriod;
			return calculateSupporterPlusTitle(billingPeriod);
		},
		productType: 'supporterplus',
		groupedProductType: 'recurringSupport',
		allProductsProductTypeFilterString: 'SupporterPlus',
		urlPart: 'support',
		getOphanProductType: () => 'SUPPORTER_PLUS',
		showTrialRemainingIfApplicable: true,
		softOptInIDs: [
			SoftOptInIDs.SupportOnboarding,
			SoftOptInIDs.SimilarProducts,
			SoftOptInIDs.SupporterNewsletter,
			SoftOptInIDs.DigitalSubscriberPreview,
		],
		cancellation: {
			alternateSummaryMainPara:
				"This is immediate and you will not be charged again. If you've cancelled within the first 14 days, we'll send you a full refund.",
			alternateSummaryHeading: (productDetail: ProductDetail) => {
				const billingPeriod = (
					getMainPlan(
						productDetail.subscription,
					) as PaidSubscriptionPlan
				).billingPeriod;
				return `${calculateMonthlyOrAnnualFromBillingPeriod(
					billingPeriod,
				)} support + extras cancelled`;
			},
			linkOnProductPage: true,
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
		friendlyName: () => 'guardian patron',
		productType: 'guardianpatron',
		groupedProductType: 'subscriptions',
		allProductsProductTypeFilterString: 'GuardianPatron',
		urlPart: 'guardianpatron',
		legacyUrlPart: 'guardianpatron',
		getOphanProductType: () => 'GUARDIAN_PATRON', //TODO: This value doesn't exist in Ophan yet
		showTrialRemainingIfApplicable: true,
		softOptInIDs: [
			SoftOptInIDs.SupportOnboarding,
			SoftOptInIDs.DigitalSubscriberPreview,
			SoftOptInIDs.SimilarProducts,
			SoftOptInIDs.SupporterNewsletter,
		],
	},
};

export const GROUPED_PRODUCT_TYPES: {
	[productKey in GroupedProductTypeKeys]: GroupedProductType;
} = {
	membership: {
		...PRODUCT_TYPES.membership, // TODO: Can we omit 'groupedProductType' and 'softOptInIDs' from spread properties as omitted from type
		mapGroupedToSpecific: () => PRODUCT_TYPES.membership,
		groupFriendlyName: 'membership',
		showSupporterId: true,
		supportTheGuardianSectionProps: {
			supportReferer: 'account_overview_membership_section',
			message:
				'We no longer have a membership programme but you can still continue to support the Guardian.',
		},
	},
	recurringSupport: {
		productTitle: () => 'Recurring support',
		friendlyName: () => 'recurring support',
		groupFriendlyName: 'recurring support',
		allProductsProductTypeFilterString: 'SupporterPlus', // this will only return SupporterPlus, and not Contributions
		urlPart: 'recurringsupport',
		mapGroupedToSpecific: (
			productDetail: ProductDetail | CancelledProductDetail,
		) => {
			if (productDetail.tier === 'Supporter Plus') {
				return PRODUCT_TYPES.supporterplus;
			} else if (productDetail.tier === 'Contributor') {
				return PRODUCT_TYPES.contributions;
			}
			throw `Specific product type for tier '${productDetail.tier}' not found.`;
		},
		showSupporterId: true,
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
			throw `Specific product type for tier '${productDetail.tier}' not found.`;
		},
		cancelledCopy:
			'Your subscription has been cancelled. You are able to access your subscription until',
	},
};
