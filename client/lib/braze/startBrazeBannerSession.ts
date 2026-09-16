import type { Banner } from '@braze/web-sdk';
import type { BrazeInstance } from './initialiseBraze';

export type BrazeBannerSession = {
	unsubscribe: () => void;
};

export const startBrazeBannerSession = (
	braze: BrazeInstance,
	{
		userId,
		placementId,
		onBanner,
	}: {
		userId: string;
		placementId: string;
		onBanner: (banner: Banner | null) => void;
	},
): BrazeBannerSession => {
	const subscriptionId = braze.subscribeToBannersUpdates((banners) => {
		onBanner(banners[placementId] ?? null);
	});

	braze.changeUser(userId);
	braze.openSession();
	braze.requestBannersRefresh([placementId]);

	return {
		unsubscribe: () => {
			if (subscriptionId) {
				braze.removeSubscription(subscriptionId);
			}
		},
	};
};
