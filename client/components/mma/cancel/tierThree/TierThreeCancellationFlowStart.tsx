import { Stack } from '@guardian/source/react-components';
import { PRODUCT_TYPES } from '@/shared/productTypes';
import { measure } from '../../../../styles/typography';
import { trackEvent } from '../../../../utilities/analytics';
import { Heading } from '../../shared/Heading';
import { hrefStyle } from '../cancellationConstants';

const trackCancellationClickEvent = (eventLabel: string) => () =>
	trackEvent({
		eventCategory: 'cancellation',
		eventAction: 'click',
		eventLabel,
	});

export const tierThreeCancellationFlowStart = () => (
	<Stack space={4}>
		<Heading cssOverrides={measure.heading}>
			We’re sorry to hear you’re thinking of cancelling your{' '}
			{PRODUCT_TYPES.tierthree.friendlyName}
		</Heading>

		<p>
			With your vital support, the Guardian can remain editorially
			independent, free from the influence of billionaire owners and
			politicians. This enables us to challenge and hold the powerful to
			account, and to fearlessly pursue the truth. The support from our
			readers helps us keep our journalism without a paywall, open and
			accessible to all.
		</p>

		<p>
			If you’re looking to take a break, it’s possible to suspend your
			subscription to the Guardian Weekly – reducing the cost of your
			total subscription. You can suspend up to six issues per year. This
			pauses delivery and you will receive the refund for any suspended
			issues off your next bill.{' '}
			<a
				css={hrefStyle}
				href="/suspend/digital+print"
				onClick={trackCancellationClickEvent(
					'tierThree_holiday_suspension',
				)}
			>
				Suspend your subscription here
			</a>
			.
		</p>

		<p>Could you please take a moment to tell us why you want to cancel?</p>
	</Stack>
);
