import type { Banner } from '@braze/web-sdk';
import { getConsentFor, onConsentChange } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { brazeBannersSystemLogger, getBrazeApiKey } from './brazeConfig';
import type { BrazeInstance } from './initialiseBraze';
import { getInitialisedBraze } from './initialiseBraze';

const hasRequiredConsents = (): Promise<boolean> =>
	new Promise((resolve) => {
		onConsentChange((state) => {
			try {
				resolve(getConsentFor('braze', state));
			} catch {
				resolve(false);
			}
		});
	});

const getIdTokenClaims = (): Record<string, unknown> | null => {
	try {
		const cookies = document.cookie.split('; ');
		const match = cookies.find((c) => c.startsWith('GU_ID_TOKEN='));
		if (!match) {
			return null;
		}

		let token = decodeURIComponent(match.split('=').slice(1).join('='));
		if (token.startsWith('s:')) {
			token = token.slice(2);
		}

		const payload = token.split('.')[1];
		if (!payload) {
			return null;
		}

		return JSON.parse(
			atob(payload.replace(/-/g, '+').replace(/_/g, '/')),
		) as Record<string, unknown>;
	} catch {
		return null;
	}
};

const getBrazeUuid = (): string | null => {
	const claims = getIdTokenClaims();
	const uuid = claims?.braze_uuid;
	return typeof uuid === 'string' ? uuid : null;
};

function refreshBanners(
	braze: BrazeInstance,
	placementIds: string[],
): Promise<void> {
	let timeoutId: ReturnType<typeof setTimeout>;

	const timeout = new Promise<void>((resolve) => {
		timeoutId = setTimeout(() => {
			brazeBannersSystemLogger.warn('Refresh timed out. Proceeding.');
			resolve();
		}, 2000);
	});

	const brazeRequest = new Promise<void>((resolve) => {
		braze.requestBannersRefresh(
			placementIds,
			() => {
				brazeBannersSystemLogger.info('Refresh completed.');
				clearTimeout(timeoutId);
				resolve();
			},
			() => {
				brazeBannersSystemLogger.warn('Refresh failed.');
				clearTimeout(timeoutId);
				resolve();
			},
		);
	});

	return Promise.race([brazeRequest, timeout]);
}

interface UseBrazeBannerResult {
	braze: BrazeInstance | null;
	banner: Banner | null;
	isLoading: boolean;
}

export const useBrazeBanner = (placementId: string): UseBrazeBannerResult => {
	const [braze, setBraze] = useState<BrazeInstance | null>(null);
	const [banner, setBanner] = useState<Banner | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let cancelled = false;

		const init = async () => {
			try {
				const apiKey = getBrazeApiKey();
				if (!apiKey) {
					brazeBannersSystemLogger.info(
						'No Braze API key available.',
					);
					setIsLoading(false);
					return;
				}

				const signInStatus =
					window.guardian?.identityDetails?.signInStatus;
				if (signInStatus !== 'signedInRecently') {
					brazeBannersSystemLogger.info(
						'User not signed in. Skipping Braze init.',
					);
					setIsLoading(false);
					return;
				}

				const brazeUuid = getBrazeUuid();
				if (!brazeUuid) {
					brazeBannersSystemLogger.info(
						'brazeUuid not available in ID token.',
					);
					setIsLoading(false);
					return;
				}

				const consent = await hasRequiredConsents().catch(() => false);

				if (cancelled) {
					return;
				}

				if (!consent) {
					brazeBannersSystemLogger.info('Braze consent not granted.');
					setIsLoading(false);
					return;
				}

				const brazeInstance = await getInitialisedBraze(apiKey);
				if (cancelled) {
					return;
				}

				brazeInstance.changeUser(brazeUuid);

				await refreshBanners(brazeInstance, [placementId]);
				if (cancelled) {
					return;
				}

				brazeInstance.openSession();

				const fetchedBanner = brazeInstance.getBanner(placementId);

				if (fetchedBanner) {
					brazeBannersSystemLogger.info(
						`Banner found for "${placementId}".`,
					);
					setBraze(brazeInstance);
					setBanner(fetchedBanner);
				} else {
					brazeBannersSystemLogger.info(
						`No banner for "${placementId}".`,
					);
				}
			} catch (error) {
				brazeBannersSystemLogger.error('Braze init failed:', error);
			} finally {
				if (!cancelled) {
					setIsLoading(false);
				}
			}
		};

		void init();

		return () => {
			cancelled = true;
		};
	}, [placementId]);

	return { braze, banner, isLoading };
};
