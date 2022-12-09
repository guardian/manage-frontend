import { Stack } from '@guardian/source-react-components';
import { featureSwitches } from '../../../../../shared/featureSwitches';
import { measure } from '../../../../styles/typography';
import { Heading } from '../../shared/Heading';

export const contributionsCancellationFlowStart = () =>
	featureSwitches.cancellationProductSwitch ? (
		<Heading cssOverrides={measure.heading}>
			Please could you take a moment to tell us why you want to cancel?
		</Heading>
	) : (
		<Stack space={4}>
			<Heading cssOverrides={measure.heading}>
				We’re sorry to see you go…
			</Heading>

			<p>
				<strong>
					…please could you take a moment to tell us why you would
					like to cancel today?
				</strong>
				<br />
				As a reader-funded organisation, we rely on the generous support
				from those who are in a position to pay for news. And, we
				welcome your feedback.
			</p>
		</Stack>
	);
