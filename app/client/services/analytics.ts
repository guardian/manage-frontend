import { OphanProduct } from '../../shared/ophanTypes';
import { ProductDetail } from '../../shared/productResponse';
import { ProductType } from '../../shared/productTypes';

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

export const trackEvent = (
	{ eventCategory, eventAction, product, eventLabel, eventValue }: Event,
	alsoTrackInGA = true,
) => {
	if (alsoTrackInGA && window.ga) {
		window.ga(
			'send',
			'event',
			eventCategory,
			eventAction,
			eventLabel,
			eventValue,
		);
	}
	if (window.guardian && window.guardian.ophan) {
		const ophanProduct: OphanProduct | undefined =
			product &&
			product.productType.getOphanProductType &&
			product.productType.getOphanProductType(product.productDetail);

		window.guardian.ophan.record({
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
	}
};

export const trackEventInOphanOnly = (event: Event) => trackEvent(event, false);

export const applyAnyOptimiseExperiments = () => {
	if (typeof window !== 'undefined' && window.ga && window.dataLayer) {
		window.dataLayer.push({ event: 'optimize.activate' });
	}
};
