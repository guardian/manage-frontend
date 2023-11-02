import { loadScript } from '@guardian/libs';
import * as Sentry from '@sentry/browser';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import parse from 'url-parse';
import {
	applyAnyOptimiseExperiments,
	MMA_AB_TEST_DIMENSION_VALUE,
} from '../analytics';
import { runGaStub } from '../gaStub';

declare global {
	interface Window {
		ga?: any;
		gaData?: string;
		dataLayer?: any;
	}
}

const GA_AVAILABLE = false;
const GA_UA = 'UA-51507017-5';

export const useAnalytics = () => {
	const location = useLocation();
	const [cmpIsInitialised, setCmpIsInitialised] = useState<boolean>(false);
	const [gaIsInitialised, setGaIsInitialised] = useState<boolean>(false);
	const [qmIsInitialised, setQmIsInitialised] = useState<boolean>(false);

	const initialiseGa = () => {
		// Run self evoking GA script
		runGaStub();

		if (typeof window !== 'undefined' && window.ga) {
			const queryParams = parse(window.location.href, true).query;

			const INTCMP = queryParams.INTCMP;

			if (window.guardian) {
				// tslint:disable-next-line:no-object-mutation
				window.guardian.INTCMP = INTCMP;

				const abName = queryParams.abName;
				const abVariant = queryParams.abVariant;

				if (abName && abVariant) {
					// tslint:disable-next-line:no-object-mutation
					window.guardian.abTest = {
						name: abName,
						variant: abVariant,
					};
				}
			}

			if (window.dataLayer === undefined) {
				// tslint:disable-next-line:no-object-mutation
				window.dataLayer = [];
			}

			window.ga('create', GA_UA, 'auto');
			window.ga('require', 'GTM-M985W29');
			window.ga('set', 'transport', 'beacon');
			if (INTCMP) {
				window.ga('set', 'dimension12', INTCMP);
			}
			window.ga('set', 'dimension29', MMA_AB_TEST_DIMENSION_VALUE);

			new MutationObserver(applyAnyOptimiseExperiments).observe(
				document.body,
				{
					attributes: false,
					characterData: false,
					childList: true,
					subtree: true,
					attributeOldValue: false,
					characterDataOldValue: false,
				},
			);
		}

		setGaIsInitialised(true);
	};

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
		import('@guardian/consent-management-platform').then(
			({ onConsentChange, getConsentFor }) => {
				onConsentChange((consentState) => {
					const gaConsentState = getConsentFor(
						'google-analytics',
						consentState,
					);

					const qmConsentState = getConsentFor('qm', consentState);

					// @ts-expect-error: Suppressing "element implicitly has an 'any' type because index expression is not of type 'number'."
					window[`ga-disable-${GA_UA}`] = !gaConsentState;

					if (GA_AVAILABLE && gaConsentState && !gaIsInitialised) {
						initialiseGa();
					}

					if (qmConsentState && !qmIsInitialised) {
						initialiseQm();
					}

					setCmpIsInitialised(true);
				});
			},
		);
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

		if (gaIsInitialised && window.ga) {
			window.ga('send', 'pageview', {
				location: window.location.href,
				page: window.location.pathname + window.location.search,
				dimension12: window.guardian.INTCMP,
				dimension29: MMA_AB_TEST_DIMENSION_VALUE,
			});
			applyAnyOptimiseExperiments();
		}
	}, [location, cmpIsInitialised, gaIsInitialised]);
};
