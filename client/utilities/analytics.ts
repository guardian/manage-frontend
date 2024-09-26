import type { ProductDetail } from '../../shared/productResponse';
import type { ProductType } from '../../shared/productTypes';
import ophan from "@guardian/ophan-tracker-js";

interface Event {
	eventCategory: string;
	eventAction: string;
	product?: {
		productType: ProductType;
		productDetail: ProductDetail;
	};
	eventLabel?: string;
	eventValue?: number;
}

export const MMA_AB_TEST_DIMENSION_VALUE = ''; // this can be used for a/b testing

export const trackEvent = ({
	eventCategory,
	eventAction,
	product,
	eventLabel,
	eventValue,
}: Event) => {
		const ophanProduct =
			product &&
			product.productType.getOphanProductType &&
			product.productType.getOphanProductType(product.productDetail);

		ophan.record({
			componentEvent: {
				component: {
					componentType: 'ACQUISITIONS_MANAGE_MY_ACCOUNT',
					products: ophanProduct ? [ophanProduct] : undefined,
					campaignCode: window.guardian.INTCMP,
					labels: [
						eventCategory.toUpperCase(),
						eventAction.toUpperCase(),
						...(eventLabel ? [eventLabel.toUpperCase()] : []),
						...(MMA_AB_TEST_DIMENSION_VALUE
							? [MMA_AB_TEST_DIMENSION_VALUE]
							: []),
					],
				},
				action: 'VIEW',
				value: eventValue !== undefined ? `${eventValue}` : undefined,
				abTest: window.guardian.abTest,
			},
		});
};

export const trackEventInOphanOnly = (event: Event) => trackEvent(event);
