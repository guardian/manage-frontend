import { featureSwitches } from '@/shared/featureSwitches';
import type { ProductDetail } from '@/shared/productResponse';
import type { ProductType } from '@/shared/productTypes';

// Newspaper products that had no self-serve cancellation before this journey.
// Voucher already had one. Guardian Weekly outside the UK is already live.
// UK Guardian Weekly stays on its previous path until the feature param is present.
const gatedSelfServeCancellationUrlParts: ReadonlySet<ProductType['urlPart']> =
	new Set(['homedelivery', 'nationaldelivery', 'subscriptioncard']);

const unitedKingdomCountries = new Set(['united kingdom', 'uk']);

export const isGatedSelfServeCancellationProduct = (
	productType: ProductType,
): boolean => gatedSelfServeCancellationUrlParts.has(productType.urlPart);

const isGuardianWeekly = (productType: ProductType): boolean =>
	productType.urlPart === 'guardianweekly';

export const isUnitedKingdomReader = (
	productDetail?: ProductDetail | null,
): boolean => {
	const country = (
		productDetail?.subscription.deliveryAddress?.country ||
		productDetail?.billingCountry ||
		''
	)
		.trim()
		.toLowerCase();
	return unitedKingdomCountries.has(country);
};

// UK Guardian Weekly uses the previous cancellation path until
// ?withFeature=selfServeCancellation is on the page that loaded manage.
const guardianWeeklyUkNeedsFlag = (
	productType: ProductType,
	productDetail?: ProductDetail | null,
): boolean =>
	isGuardianWeekly(productType) &&
	(!productDetail || isUnitedKingdomReader(productDetail)) &&
	!featureSwitches.selfServeCancellation;

// True when this product should render the self-serve cancellation screens.
// Guardian Weekly outside the UK is always on. UK Guardian Weekly and every
// other gated product need ?withFeature=selfServeCancellation.
export const isSelfServeCancellationJourneyEnabled = (
	productType: ProductType,
	productDetail?: ProductDetail | null,
): boolean => {
	if (!productType.cancellation?.usesSelfServeCancellationFlow) {
		return false;
	}
	if (featureSwitches.selfServeCancellation) {
		return true;
	}
	if (isGuardianWeekly(productType)) {
		return !!productDetail && !isUnitedKingdomReader(productDetail);
	}
	return false;
};

// Members-data-api still returns selfServiceCancellation.isAllowed false for
// these newspaper products. The self-serve journey is their cancellation path, so
// that flag does not decide whether they can continue. UK Guardian Weekly keeps
// following it until the feature param is present.
export const cancelsWithoutSelfServeFlag = (
	productType: ProductType,
	productDetail?: ProductDetail | null,
): boolean =>
	!!productType.cancellation?.usesSelfServeCancellationFlow &&
	!guardianWeeklyUkNeedsFlag(productType, productDetail);

// True when account overview and manage your account should offer cancellation.
// Gated products stay on Contact us until the feature param is present.
export const isCancellationEntryOpen = (productType: ProductType): boolean => {
	if (!isGatedSelfServeCancellationProduct(productType)) {
		return true;
	}
	return featureSwitches.selfServeCancellation;
};
