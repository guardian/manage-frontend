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

const GA_UA = 'UA-51507017-5';

const useAnalytics = () => {
	const location = useLocation();
	const [cmpIsInitialised, setCmpIsInitialised] = useState<boolean>(false);
	const [gaIsInitialised, setGaIsInitialised] = useState<boolean>(false);

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

	useEffect(() => {
		import('@guardian/consent-management-platform').then(
			({ onConsentChange, getConsentFor }) => {
				onConsentChange((consentState) => {
					const gaConsentState = getConsentFor(
						'google-analytics',
						consentState,
					);

					// @ts-expect-error: Suppressing "element implicitly has an 'any' type because index expression is not of type 'number'."
					window[`ga-disable-${GA_UA}`] = !gaConsentState;

					if (gaConsentState && !gaIsInitialised) {
						initialiseGa();
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
			// TODO add ophan pageViewId as a GA dimension
			applyAnyOptimiseExperiments();
		}
	}, [location, cmpIsInitialised, gaIsInitialised]);
};

export default useAnalytics;
