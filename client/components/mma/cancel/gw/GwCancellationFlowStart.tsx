import { Stack } from '@guardian/source/react-components';
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

export const gwCancellationFlowStart = () => (
	<Stack space={4}>
		<Heading cssOverrides={measure.heading}>
			We’re sorry to hear you’re thinking of cancelling your Guardian
			Weekly subscription
		</Heading>

		<p>
			Your support means The Guardian can remain editorially independent,
			free from the influence of billionaire owners and politicians. This
			enables us to give a voice to the voiceless, challenge the powerful
			and hold them to account. The support from our readers helps us to
			keep our journalism free of a paywall, so it’s open and accessible
			to all.
		</p>

		<p>
			If you’re looking to take a break, it’s possible to take a
			suspension from your subscription. You can suspend up to 6 issues
			per year. This pauses delivery and you will receive the money for
			any suspended issues off your next bill.{' '}
			<a
				css={hrefStyle}
				href="/suspend/guardianweekly"
				onClick={trackCancellationClickEvent('gw_holiday_suspension')}
			>
				Suspend your subscription here
			</a>
			.
		</p>

		<p>Please could you take a moment to tell us why you want to cancel?</p>
	</Stack>
);
