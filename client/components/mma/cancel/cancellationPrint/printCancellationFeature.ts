import { featureSwitches } from '@/shared/featureSwitches';
import type { ProductType } from '@/shared/productTypes';

// Newspaper products that had no self-serve cancellation before this journey.
// Voucher already had one, and Guardian Weekly is already live.
const gatedPrintCancellationUrlParts: ReadonlySet<ProductType['urlPart']> =
	new Set(['homedelivery', 'nationaldelivery', 'subscriptioncard']);

export const isGatedPrintCancellationProduct = (
	productType: ProductType,
): boolean => gatedPrintCancellationUrlParts.has(productType.urlPart);

// True when this product should render the print cancellation screens.
// Guardian Weekly is always on. Every other print product needs
// ?withFeature=printProductCancellation on the page that loaded manage.
export const isPrintCancellationJourneyEnabled = (
	productType: ProductType,
): boolean =>
	!!productType.cancellation?.usesPrintCancellationFlow &&
	(productType.urlPart === 'guardianweekly' ||
		featureSwitches.printProductCancellation);

// True when account overview and manage your account should offer cancellation.
// Gated products stay on Contact us until the feature param is present.
export const isCancellationEntryOpen = (productType: ProductType): boolean => {
	if (!isGatedPrintCancellationProduct(productType)) {
		return true;
	}
	return featureSwitches.printProductCancellation;
};
