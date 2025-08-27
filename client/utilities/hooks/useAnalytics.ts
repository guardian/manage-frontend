import { loadScript } from '@guardian/libs';
import * as Sentry from '@sentry/browser';
import { useEffect, useRef } from 'react';

export const useAnalytics = () => {
	const qmIsInitialised = useRef(false);

	useEffect(() => {
		const initialiseQm = () => {
			loadScript(
				'https://cdn.quantummetric.com/instrumentation/1.35.4/quantum-gnm.js',
				{
					async: true,
					integrity:
						'sha384-VMLIC70VzACtZAEkPaL+7xW+v0+UjkIUuGxlArtIG+Pzqlp5DkbfVG9tRm75Liwx',
					crossOrigin: 'anonymous',
				},
			).catch(() => {
				Sentry.captureException('Failed to load Quantum Metric');
			});
		};

		const initialiseOphen = async () => {
			// Dynamic import to avoid server-side execution
			const { sendInitialEvent } = await import(
				'@guardian/ophan-tracker-js'
			);

			if (window.guardian.spaTransition) {
				sendInitialEvent(window.location.href);
			} else {
				// tslint:disable-next-line:no-object-mutation
				window.guardian.spaTransition = true;
			}
		};

		import('@guardian/libs').then(({ onConsentChange, getConsentFor }) => {
			onConsentChange((consentState) => {
				const qmConsentState = getConsentFor('qm', consentState);

				if (qmConsentState && !qmIsInitialised.current) {
					initialiseQm();
					qmIsInitialised.current = true;
				}

				initialiseOphen();
			});
		});
	}, []);
};
