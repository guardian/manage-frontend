import {
	changeUser,
	initialize,
	openSession,
	subscribeToContentCardsUpdates,
} from '@braze/web-sdk';
import { useEffect, useState } from 'react';
import { JsonResponseHandler } from '@/client/components/mma/shared/asyncComponents/DefaultApiResponseHandler';

export const useBraze = () => {
	const [brazeIsInitialised, setBrazeIsInitialised] =
		useState<boolean>(false);

	const initialiseBrazeSDK = async () => {
		const brazeUUID = 'YOUR_BRAZE_ID_HERE';

		const brazeSdkConfigResponse = await fetch('/api/braze-sdk-details', {
			method: 'GET',
		});
		const brazeSdkConfig = await JsonResponseHandler(
			brazeSdkConfigResponse,
		);

		if (brazeSdkConfig.apiKey && brazeSdkConfig.sdkEndpoint) {
			initialize(brazeSdkConfig.apiKey, {
				baseUrl: brazeSdkConfig.sdkEndpoint,
			});

			// if you use Content Cards
			subscribeToContentCardsUpdates(function (cards) {
				console.log(cards.lastUpdated);
				// cards have been updated
			});

			changeUser(brazeUUID);

			openSession();

			setBrazeIsInitialised(true);
		}
	};

	useEffect(() => {
		import('@guardian/libs').then(({ onConsentChange, getConsentFor }) => {
			onConsentChange((consentState) => {
				const tmpSpikeForceBrazeConsent = true;
				const brazeConsentState =
					getConsentFor('braze', consentState) ||
					tmpSpikeForceBrazeConsent; // TODO: make sure braze is set up in consents and has the id 'braze'

				if (brazeConsentState && !brazeIsInitialised) {
					initialiseBrazeSDK();
				}
			});
		});
	}, [brazeIsInitialised]);
};
