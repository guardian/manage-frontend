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
			'https://cdn.quantummetric.com/instrumentation/new-worker-gnm-sri/quantum-gnm.js',
			{
				async: true,
				integrity:
					'sha384-s5S5gOJeOYsKXL7ew5daQ9q8c5sVTe9opFXN8mEoXszrOuzBLkV5/7tYfWgPzSNC',
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
	}, []);

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
