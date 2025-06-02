import { changeUser, initialize, openSession } from '@braze/web-sdk';
import { getCookie } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { JsonResponseHandler } from '@/client/components/mma/shared/asyncComponents/DefaultApiResponseHandler';
import { parseJwt } from '../cookies';

export const useBraze = () => {
	const [brazeIsInitialised, setBrazeIsInitialised] =
		useState<boolean>(false);

	const initialiseBrazeSDK = async () => {
		const guIdTokenCookie = getCookie({
			name: 'GU_ID_TOKEN',
			shouldMemoize: true,
		});
		if (!guIdTokenCookie) {
			return;
		}
		const decodedGuIdToken = parseJwt(guIdTokenCookie);

		const brazeUUID = decodedGuIdToken?.braze_uuid;
		if (!brazeUUID) {
			return;
		}

		const brazeSdkConfigResponse = await fetch('/api/braze-sdk-details', {
			method: 'GET',
		});
		const brazeSdkConfig = await JsonResponseHandler(
			brazeSdkConfigResponse,
		);

		if (brazeSdkConfig.apiKey && brazeSdkConfig.sdkEndpoint) {
			initialize(brazeSdkConfig.apiKey, {
				baseUrl: brazeSdkConfig.sdkEndpoint,
				allowUserSuppliedJavascript: true,
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
