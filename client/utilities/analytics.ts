import * as Sentry from '@sentry/browser';
import type { IdentityDetails } from '@/shared/globals';
import type { ProductDetail } from '../../shared/productResponse';
import type { ProductType } from '../../shared/productTypes';
import { isSignedIn } from './signInStatus';

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
	if (typeof window === 'undefined') {
		return;
	}

	const ophanProduct =
		product &&
		product.productType.getOphanProductType &&
		product.productType.getOphanProductType(product.productDetail);

	const labels = [
		eventCategory.toUpperCase(),
		eventAction.toUpperCase(),
		...(eventLabel ? [eventLabel.toUpperCase()] : []),
		...(MMA_AB_TEST_DIMENSION_VALUE ? [MMA_AB_TEST_DIMENSION_VALUE] : []),
	];

	void import('@guardian/ophan-tracker-js/MMA')
		.then(({ record }) => {
			record({
				componentEvent: {
					component: {
						componentType: 'ACQUISITIONS_MANAGE_MY_ACCOUNT',
						products: ophanProduct ? [ophanProduct] : undefined,
						campaignCode: window.guardian?.INTCMP,
						labels,
					},
					action: 'VIEW',
					value:
						eventValue !== undefined ? `${eventValue}` : undefined,
					abTest: window.guardian?.abTest,
				},
			});
		})
		.catch(() => {
			// Tracking is non-critical; ignore blocked or failed Ophan loads.
		});
};

export const trackEventInOphanOnly = (event: Event) => trackEvent(event);

export const setAnalyticsUserFromIdentity = (
	identityDetails: IdentityDetails | undefined,
) => {
	if (!isSignedIn() || !identityDetails) {
		Sentry.setUser(null);
		return;
	}

	if (!identityDetails.userId && !identityDetails.email) {
		Sentry.setUser(null);
		return;
	}

	Sentry.setUser({
		id: identityDetails.userId,
		email: identityDetails.email,
	});
};
