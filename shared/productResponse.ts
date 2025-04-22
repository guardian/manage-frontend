import * as Sentry from '@sentry/browser';
import * as React from 'react';
import type { CurrencyIso } from '@/client/utilities/currencyIso';
import type { DeliveryRecordDetail } from '../client/components/mma/delivery/records/deliveryRecordsApi';
import { AsyncLoader } from '../client/components/mma/shared/AsyncLoader';
import type { CardProps } from '../client/components/mma/shared/CardDisplay';
import type { DirectDebitGatewayOwner } from './directDebit';
import { PRODUCT_TYPES } from './productTypes';
import type { ProductType } from './productTypes';

export type DeliveryRecordApiItem = DeliveryRecordDetail;

export type MembersDataApiUser = {
	firstName: string;
	lastName: string;
	email: string;
};

export type MembersDataApiResponse = {
	user?: MembersDataApiUser;
	products: MembersDataApiItem[];
};

export type MembersDataApiItem = ProductDetail | object;

export type SingleProductDetail = {
	created: number;
	currency: string;
	price: number;
	status: string;
};

export interface InvoiceDataApiItem {
	invoiceId: string;
	subscriptionName: string;
	date: string;
	pdfPath: string;
	price?: number;
	amount?: number;
	paymentMethod: string;
	hasMultipleSubs: boolean;
	last4?: string;
	cardType?: string;
}

export class MembersDataApiAsyncLoader extends AsyncLoader<MembersDataApiResponse> {}

export const MembersDataApiItemContext: React.Context<MembersDataApiItem> =
	React.createContext({});

export const formatDate = (shortForm: string) => {
	return new Date(shortForm).toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
};

export const MDA_TEST_USER_HEADER = 'X-Gu-Membership-Test-User';

export const sortByJoinDate = (a: ProductDetail, b: ProductDetail) =>
	b.joinDate.localeCompare(a.joinDate);

export type PhoneRegionKey = 'US' | 'AUS' | 'UK & ROW';

export interface SelfServiceCancellation {
	isAllowed: boolean;
	shouldDisplayEmail: boolean;
	phoneRegionsToDisplay: PhoneRegionKey[];
}

export const productTiers = [
	'guardianpatron',
	'Tier Three',
	'Digital Pack',
	'Newspaper - National Delivery',
	'Supporter',
	'Supporter Plus',
	'Guardian Weekly - ROW',
	'Guardian Weekly - Domestic',
	'Newspaper Digital Voucher',
	'Contributor',
	'Guardian Weekly Zone A',
	'Guardian Weekly Zone B',
	'Guardian Weekly Zone C',
	'Newspaper Voucher',
	'Newspaper Delivery',
	'Patron',
	'Partner',
	'Guardian Ad-Lite',
	'Newspaper Delivery - Observer',
	'Newspaper Digital Voucher - Observer',
];

export type ProductTier = typeof productTiers[number];

export interface ProductDetail extends WithSubscription {
	isTestUser: boolean; // THIS IS NOT PART OF THE members-data-api RESPONSE (but inferred from a header)
	isPaidTier: boolean;
	regNumber?: string;
	optIn?: boolean;
	key?: string;
	tier: ProductTier;
	joinDate: string;
	alertText?: string;
	selfServiceCancellation: SelfServiceCancellation;
	billingCountry?: string;
}

export interface CancelledProductDetail {
	tier: ProductTier;
	joinDate: string;
	subscription: CancelledSubscription;
}

export function isProduct(
	data: MembersDataApiItem | undefined,
): data is ProductDetail {
	return productTiers.includes((data as ProductDetail)?.tier);
}

export const isObserverProduct = (productDetail: ProductDetail): boolean => {
	return (
		productDetail.tier === 'Newspaper Delivery - Observer' ||
		productDetail.tier === 'Newspaper Digital Voucher - Observer'
	);
};

export interface Card extends CardProps {
	stripePublicKeyForUpdate: string;
	email?: string;
}

export interface DirectDebitDetails {
	accountName: string;
	accountNumber: string;
	sortCode: string;
	gatewayOwner?: DirectDebitGatewayOwner;
}

export interface SubscriptionPlan {
	name: string | null;
	start?: string;
	shouldBeVisible: boolean;
	daysOfWeek?: string[];
}

interface SepaDetails {
	accountName: string;
	iban: string;
}

export type BillingPeriod = 'month' | '6 weeks' | 'quarter' | 'year';

interface CurrencyAndBillingPeriodDetail {
	currency: string;
	currencyISO: CurrencyIso;
	billingPeriod: BillingPeriod;
}

// 6 weeks billingPeriod referes to GW 6 for 6 up front payment (not to be confused with one off contributions which don't come through in this response
export const augmentBillingPeriod = (billingPeriod: BillingPeriod) =>
	billingPeriod === '6 weeks' ? 'one-off' : `${billingPeriod}ly`;

export const isSixForSix = (planName: string | null) =>
	!!planName && planName.includes('6 for 6');

export interface PaidSubscriptionPlan
	extends SubscriptionPlan,
		CurrencyAndBillingPeriodDetail {
	start: string;
	end: string;
	chargedThrough?: string | null;
	price: number;
	features: string;
}

export function isPaidSubscriptionPlan(
	subscriptionPlan: SubscriptionPlan,
): subscriptionPlan is PaidSubscriptionPlan {
	return (
		!!subscriptionPlan &&
		(subscriptionPlan.hasOwnProperty('price') ||
			subscriptionPlan.hasOwnProperty('amount'))
	);
}

export interface DeliveryAddress {
	addressLine1: string;
	addressLine2?: string;
	town?: string;
	region?: string;
	postcode: string;
	country: string;
	instructions?: string;
	addressChangeInformation?: string;
}

type ReaderType = 'Gift' | 'Direct' | 'Agent' | 'Complementary' | 'Patron';

export interface Subscription {
	accountId?: string;
	subscriptionId: string;
	start?: string;
	end: string;
	renewalDate: string;
	anniversaryDate: string;
	cancelledAt: boolean;
	nextPaymentDate: string | null;
	lastPaymentDate: string | null;
	potentialCancellationDate: string | null;
	chargedThroughDate: string | null;
	nextPaymentPrice: number | null;
	paymentMethod?: string;
	stripePublicKeyForCardAddition?: string;
	safeToUpdatePaymentMethod: boolean;
	card?: Card;
	payPalEmail?: string;
	mandate?: DirectDebitDetails;
	sepaMandate?: SepaDetails;
	autoRenew: boolean;
	currentPlans: Array<SubscriptionPlan | PaidSubscriptionPlan>;
	futurePlans: Array<SubscriptionPlan | PaidSubscriptionPlan>;
	plan?: PaidSubscriptionPlan; // this is used for memberships (remove when memberships no longer exist)
	trialLength: number;
	readerType: ReaderType;
	deliveryAddress?: DeliveryAddress;
	contactId?: string;
	account?: {
		accountName: string;
	};
	// THIS IS NOT PART OF THE members-data-api RESPONSE (it's injected server-side - see server/routes/api.ts)
	deliveryAddressChangeEffectiveDate?: string;
	cancellationEffectiveDate?: string;
}

interface CancelledSubscription {
	subscriptionId: string;
	cancellationEffectiveDate: string;
	start: string;
	end: string;
	readerType: ReaderType;
	accountId: string;
}

export interface SubscriptionWithDeliveryAddress extends Subscription {
	deliveryAddress: DeliveryAddress;
}

export interface WithSubscription {
	subscription: Subscription;
}

export const isGift = (subscription: { readerType: string }) =>
	subscription.readerType === 'Gift';

export const getMainPlan: (subscription: Subscription) => SubscriptionPlan = (
	subscription: Subscription,
) => {
	if (subscription.currentPlans.length > 0) {
		if (subscription.currentPlans.length > 1) {
			Sentry.captureException(
				"User with more than one 'current plan' for a given subscription",
			);
		}
		return subscription.currentPlans[0];
	} else if (subscription.futurePlans.length > 0) {
		// fallback to use the first future plan (contributions for example are always future plans)
		return subscription.futurePlans[0];
	}
	return {
		name: null,
		start: subscription.start,
		shouldBeVisible: true,
		currency: subscription.plan?.currency,
		currencyISO: subscription.plan?.currencyISO,
		billingPeriod: subscription.plan?.billingPeriod,
	};
};

export function getSpecificProductType(productTier: ProductTier): ProductType {
	let productType: ProductType = {} as ProductType;
	switch (productTier) {
		case 'Partner':
		case 'Patron':
		case 'Supporter':
			productType = PRODUCT_TYPES.membership;
			break;
		case 'Contributor':
			productType = PRODUCT_TYPES.contributions;
			break;
		case 'Tier Three':
			productType = PRODUCT_TYPES.tierthree;
			break;
		case 'Newspaper Voucher':
			productType = PRODUCT_TYPES.voucher;
			break;
		case 'Digital Pack':
			productType = PRODUCT_TYPES.digipack;
			break;
		case 'Newspaper Delivery':
			productType = PRODUCT_TYPES.homedelivery;
			break;
		case 'Supporter Plus':
			productType = PRODUCT_TYPES.supporterplus;
			break;
		case 'Newspaper Digital Voucher':
			productType = PRODUCT_TYPES.digitalvoucher;
			break;
		case 'Guardian Ad-Lite':
			productType = PRODUCT_TYPES.guardianadlite;
			break;
		case 'guardianpatron':
			productType = PRODUCT_TYPES.guardianpatron;
			break;
		case 'Guardian Weekly Zone A':
		case 'Guardian Weekly Zone B':
		case 'Guardian Weekly Zone C':
		case 'Guardian Weekly - ROW':
		case 'Guardian Weekly - Domestic':
			productType = PRODUCT_TYPES.guardianweekly;
			break;
		case 'Newspaper - National Delivery':
			productType = PRODUCT_TYPES.nationaldelivery;
			break;
		case 'Newspaper Delivery - Observer':
			productType = PRODUCT_TYPES.observer;
			break;
		case 'Newspaper Digital Voucher - Observer':
			productType = PRODUCT_TYPES.digitalvoucherobserver;
			break;
	}
	return productType;
}

export function isSpecificProductType(
	productDetail: ProductDetail,
	targetProductType: ProductType,
): boolean {
	const specificProductType = getSpecificProductType(productDetail.tier);
	return specificProductType === targetProductType;
}
