// @ts-expect-error - required for hooks
import type { Stripe as StripeSDK } from '@stripe/stripe-js/pure';
import { loadStripe } from '@stripe/stripe-js/pure';
import { useEffect, useState } from 'react';

export function getStripeKey(
	country: string | undefined,
	isTestUser: boolean,
): string | undefined {
	switch (country) {
		case 'Australia':
			return isTestUser
				? window.guardian?.stripeKeyAustralia?.test
				: window.guardian?.stripeKeyAustralia?.default;

		default:
			return isTestUser
				? window.guardian?.stripeKeyDefaultCurrencies?.test
				: window.guardian?.stripeKeyDefaultCurrencies?.default;
	}
}

//  Check whether the Stripe sdk has been loaded to the page already
const stripeScriptHasBeenAddedToPage = (): boolean =>
	!!document.querySelector("script[src^='https://js.stripe.com']");

export const useStripeSDK = (stripeKey: string) => {
	// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents -- can we assume StripeSDK has somehow been given a type of any (otherwise I don't understand what the linter is complaining about)?
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
	}, [stripeKey, stripeObjects]);

	return stripeObjects;
};
