// @ts-expect-error - required for hooks
import { Stripe as StripeSDK, loadStripe } from '@stripe/stripe-js/pure';
import { useEffect, useState } from 'react';

export function getStripeKey(
	country: string | undefined,
	isTestUser: boolean,
): string | undefined {
	switch (country) {
		case 'Australia':
			return isTestUser
				? window.guardian?.stripeKeyAustralia?.uat
				: window.guardian?.stripeKeyAustralia?.default;

		default:
			return isTestUser
				? window.guardian?.stripeKeyDefaultCurrencies?.uat
				: window.guardian?.stripeKeyDefaultCurrencies?.default;
	}
}

//  Check whether the Stripe sdk has been loaded to the page already
const stripeScriptHasBeenAddedToPage = (): boolean =>
	!!document.querySelector("script[src^='https://js.stripe.com']");

export const useStripeSDK = (stripeKey: string) => {
	const [stripeObjects, setStripeObjects] = useState<StripeSDK | null>(null);

	useEffect(() => {
		if (stripeObjects === null) {
			if (!stripeScriptHasBeenAddedToPage()) {
				loadStripe.setLoadParameters({
					advancedFraudSignals: false,
				});
			}

			loadStripe(stripeKey).then((newStripe) => {
				setStripeObjects(newStripe);
			});
		}
	}, []);

	return stripeObjects;
};