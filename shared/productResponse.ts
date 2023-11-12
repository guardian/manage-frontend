import * as Sentry from '@sentry/browser';
import * as React from 'react';
import type { DeliveryRecordDetail } from '../client/components/mma/delivery/records/deliveryRecordsApi';
import { AsyncLoader } from '../client/components/mma/shared/AsyncLoader';
import type { CardProps } from '../client/components/mma/shared/CardDisplay';
import type { PhoneRegionKey } from '../client/components/shared/CallCenterEmailAndNumbers';
import { GROUPED_PRODUCT_TYPES } from './productTypes';
import type { GroupedProductTypeKeys, ProductType } from './productTypes';

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

export type MembersDataApiItem = ProductDetail | {};

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

export interface SelfServiceCancellation {
	isAllowed: boolean;
	shouldDisplayEmail: boolean;
	phoneRegionsToDisplay: PhoneRegionKey[];
}

export interface ProductDetail extends WithSubscription {
	isTestUser: boolean; // THIS IS NOT PART OF THE members-data-api RESPONSE (but inferred from a header)
	isPaidTier: boolean;
	regNumber?: string;
	optIn?: boolean;
	key?: string;
	tier: string;
	joinDate: string;
	mmaCategory: GroupedProductTypeKeys;
	alertText?: string;
	selfServiceCancellation: SelfServiceCancellation;
	billingCountry?: string;
}

export interface CancelledProductDetail {
	mmaCategory: GroupedProductTypeKeys;
	tier: string;
	joinDate: string;
	subscription: CancelledSubscription;
}

export function isProduct(
	data: MembersDataApiItem | undefined,
): data is ProductDetail {
	return !!data && data.hasOwnProperty('tier');
}

export interface Card extends CardProps {
	stripePublicKeyForUpdate: string;
	email?: string;
}

export interface DirectDebitDetails {
	accountName: string;
	accountNumber: string;
	sortCode: string;
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

interface CurrencyAndBillingPeriodDetail {
	currency: string;
	currencyISO: string;
	billingPeriod: string;
}

// 6 weeks billingPeriod referes to GW 6 for 6 up front payment (not to be confused with one off contributions which don't come through in this response
export const augmentBillingPeriod = (billingPeriod: string) =>
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
	subscriberId?: string; // this has not been removed from the backend yet
	subscriptionId: string;
	start?: string;
	end: string;
	renewalDate: string;
	anniversaryDate: string;
	cancelledAt: boolean;
	nextPaymentDate: string | null;
	lastPaymentDate: string | null;
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

export function getSpecificProductTypeFromProduct(
	productDetail: ProductDetail,
): ProductType {
	const groupedProductType = GROUPED_PRODUCT_TYPES[productDetail.mmaCategory];
	const specificProductType =
		groupedProductType.mapGroupedToSpecific(productDetail);
	return specificProductType;
}

export function isSpecificProductType(
	productDetail: ProductDetail,
	targetProductType: ProductType,
): boolean {
	const specificProductType =
		getSpecificProductTypeFromProduct(productDetail);
	return specificProductType === targetProductType;
}
