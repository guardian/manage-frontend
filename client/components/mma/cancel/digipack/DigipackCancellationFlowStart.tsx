import { Stack } from '@guardian/source/react-components';
import { measure } from '../../../../styles/typography';
import { Heading } from '../../shared/Heading';

export const digipackCancellationFlowStart = () => (
	<Stack space={4}>
		<Heading cssOverrides={measure.heading}>
			We’re sorry to hear you’re thinking of cancelling your digital
			subscription
		</Heading>
		<p>
			Your support means The Guardian can remain editorially independent,
			free from the influence of billionaire owners and politicians. This
			enables us to give a voice to the voiceless, challenge the powerful
			and hold them to account. The support from our readers helps us to
			keep our journalism free of a paywall, so it’s open and accessible
			to all.
		</p>

		<p>Please could you take a moment to tell us why you want to cancel?</p>
	</Stack>
);
