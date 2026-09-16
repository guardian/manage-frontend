import type { Banner } from '@braze/web-sdk';
import type { BrazeInstance } from '../../../lib/braze/initialiseBraze';
import { startBrazeBannerSession } from '../../../lib/braze/startBrazeBannerSession';

const PLACEMENT_ID = 'manage-frontend_account-overview';

const createFakeBraze = () => {
	let subscriber:
		| ((banners: Record<string, Banner | null>) => void)
		| undefined;
	const callOrder: string[] = [];

	const braze = {
		subscribeToBannersUpdates: jest.fn((callback) => {
			callOrder.push('subscribeToBannersUpdates');
			subscriber = callback;
			return 'subscription-id';
		}),
		removeSubscription: jest.fn(() => {
			callOrder.push('removeSubscription');
		}),
		changeUser: jest.fn(() => {
			callOrder.push('changeUser');
		}),
		openSession: jest.fn(() => {
			callOrder.push('openSession');
		}),
		requestBannersRefresh: jest.fn(() => {
			callOrder.push('requestBannersRefresh');
		}),
	} as unknown as BrazeInstance;

	return {
		braze,
		callOrder,
		emit: (banners: Record<string, Banner | null>) => {
			subscriber?.(banners);
		},
	};
};

describe('startBrazeBannerSession', () => {
	it('subscribes before opening the session, then refreshes banners', () => {
		const { braze, callOrder } = createFakeBraze();

		startBrazeBannerSession(braze, {
			userId: 'cb0ac46a-b609-4583-9fd7-2c097e62c44c',
			placementId: PLACEMENT_ID,
			onBanner: jest.fn(),
		});

		expect(callOrder).toEqual([
			'subscribeToBannersUpdates',
			'changeUser',
			'openSession',
			'requestBannersRefresh',
		]);
		expect(braze.requestBannersRefresh).toHaveBeenCalledWith([
			PLACEMENT_ID,
		]);
	});

	it('delivers a banner that arrives after session start', () => {
		const { braze, emit } = createFakeBraze();
		const onBanner = jest.fn();
		const banner = { id: 'banner-1' } as Banner;

		startBrazeBannerSession(braze, {
			userId: 'cb0ac46a-b609-4583-9fd7-2c097e62c44c',
			placementId: PLACEMENT_ID,
			onBanner,
		});

		emit({ [PLACEMENT_ID]: banner });

		expect(onBanner).toHaveBeenCalledWith(banner);
	});

	it('clears the banner when the placement is empty', () => {
		const { braze, emit } = createFakeBraze();
		const onBanner = jest.fn();

		startBrazeBannerSession(braze, {
			userId: 'cb0ac46a-b609-4583-9fd7-2c097e62c44c',
			placementId: PLACEMENT_ID,
			onBanner,
		});

		emit({ [PLACEMENT_ID]: null });

		expect(onBanner).toHaveBeenCalledWith(null);
	});

	it('unsubscribes on cleanup', () => {
		const { braze } = createFakeBraze();

		const session = startBrazeBannerSession(braze, {
			userId: 'cb0ac46a-b609-4583-9fd7-2c097e62c44c',
			placementId: PLACEMENT_ID,
			onBanner: jest.fn(),
		});

		session.unsubscribe();

		expect(braze.removeSubscription).toHaveBeenCalledWith(
			'subscription-id',
		);
	});
});
