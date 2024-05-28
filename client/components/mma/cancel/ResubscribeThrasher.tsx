import { from, palette } from '@guardian/source/foundations';
import type { ReactNode } from 'react';
import {
	getScopeFromRequestPathOrEmptyString,
	X_GU_ID_FORWARDED_SCOPE,
} from '../../../../shared/identity';
import { trackEvent } from '../../../utilities/analytics';
import { fetchWithDefaultParameters } from '../../../utilities/fetch';
import { SupportTheGuardianButton } from '../../shared/SupportTheGuardianButton';
import { AsyncLoader } from '../shared/AsyncLoader';

const fetchExistingPaymentOptions = () =>
	fetchWithDefaultParameters('/api/existing-payment-options', {
		headers: {
			[X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
				window.location.href,
			),
		},
	});

interface ExistingPaymentSubscriptionInfo {
	name: string;
	isCancelled: boolean;
	isActive: boolean;
}

interface ExistingPaymentOption {
	paymentType: 'Card' | 'DirectDebit';
	billingAccountId: string;
	subscriptions: ExistingPaymentSubscriptionInfo[];
	card?: string;
	mandate?: string;
}

class ExistingPaymentOptionsAsyncLoader extends AsyncLoader<
	ExistingPaymentOption[]
> {}

const getThrasher =
	(args: ResubscribeThrasherProps) =>
	(existingPaymentOptions: ExistingPaymentOption[]) => {
		const eligiblePaymentOptionsIfNoActiveExistingContribution =
			existingPaymentOptions.find(
				(option) =>
					!!option.subscriptions.find(
						(sub) =>
							sub.isActive && sub.name.includes('Contribution'),
					),
			)
				? []
				: existingPaymentOptions;

		if (eligiblePaymentOptionsIfNoActiveExistingContribution.length) {
			trackEvent({
				eventCategory: 'impression',
				eventAction: 'resubscribe_thrasher',
				eventLabel: args.usageContext,
			});
			return (
				<div
					css={{
						backgroundColor: palette.brandAlt[400],
						padding: '10px 15px 15px',
						margin: '30px 0',
					}}
				>
					<div>
						<h2 css={{ fontWeight: 'bold', margin: '0' }}>
							Support us another way?
						</h2>
						<p
							css={{
								br: {
									display: 'none',
									[from.tablet]: {
										display: 'inline',
									},
								},
							}}
						>
							From just $1, or a little more on a regular basis,
							you can fund independent Guardian journalism. No
							need to update your payment details. It only takes a
							minute but makes a big difference.
						</p>
						<SupportTheGuardianButton
							supportReferer={`resubscribe_thrasher_${args.usageContext}`}
							theme="brandAlt"
						/>
					</div>
				</div>
			);
		}
		return args.children;
	};

interface ResubscribeThrasherProps {
	children: ReactNode;
	usageContext: string;
}

export const ResubscribeThrasher = (props: ResubscribeThrasherProps) => (
	<ExistingPaymentOptionsAsyncLoader
		fetch={fetchExistingPaymentOptions}
		render={getThrasher(props)}
		loadingMessage={'Loading...'}
	/>
);
