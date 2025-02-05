import { loadScript } from '@guardian/libs';
import * as Sentry from '@sentry/browser';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useAnalytics = () => {
	const location = useLocation();
	const [cmpIsInitialised, setCmpIsInitialised] = useState<boolean>(false);
	const [qmIsInitialised, setQmIsInitialised] = useState<boolean>(false);

	const initialiseQm = () => {
		loadScript(
			'https://cdn.quantummetric.com/instrumentation/1.35.4/quantum-gnm.js',
			{
				async: true,
				integrity:
					'sha384-VMLIC70VzACtZAEkPaL+7xW+v0+UjkIUuGxlArtIG+Pzqlp5DkbfVG9tRm75Liwx',
				crossOrigin: 'anonymous',
			},
		)
			.then(() => {
				setQmIsInitialised(true);
			})
			.catch(() => {
				Sentry.captureException('Failed to load Quantum Metric');
			});
	};

	useEffect(() => {
		import('@guardian/libs').then(({ onConsentChange, getConsentFor }) => {
			onConsentChange((consentState) => {
				const qmConsentState = getConsentFor('qm', consentState);

				if (qmConsentState && !qmIsInitialised) {
					initialiseQm();
				}

				setCmpIsInitialised(true);
			});
		});
	}, [qmIsInitialised]);

	useEffect(() => {
		if (!cmpIsInitialised) {
			return;
		}

		if (
			window.guardian &&
			window.guardian.ophan &&
			window.guardian.ophan.sendInitialEvent
		) {
			if (window.guardian.spaTransition) {
				window.guardian.ophan.sendInitialEvent(window.location.href);
			} else {
				// tslint:disable-next-line:no-object-mutation
				window.guardian.spaTransition = true;
			}
		}
	}, [location, cmpIsInitialised]);
};
