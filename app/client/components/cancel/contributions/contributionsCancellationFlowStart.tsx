import { css } from '@emotion/react';
import { Stack } from '@guardian/source-react-components';
import { featureSwitches } from '../../../../shared/featureSwitches';
import { heading, measure } from '../../../styles/typography';

export const contributionsCancellationFlowStart = () =>
	featureSwitches.cancellationProductSwitch ? (
		<h2 css={heading}>
			<span
				css={[
					css`
						display: inline-block;
					`,
					measure.medium,
				]}
			>
				Please could you take a moment to tell us why you want to
				cancel?
			</span>
		</h2>
	) : (
		<Stack space={4}>
			<h2 css={heading}>
				<span
					css={[
						css`
							display: inline-block;
						`,
						measure.medium,
					]}
				>
					We’re sorry to hear you’re thinking of cancelling your
					recurring contribution.
				</span>
			</h2>
			<p>
				Your support means The Guardian can remain editorially
				independent, free from the influence of billionaire owners and
				politicians. This enables us to give a voice to the voiceless,
				challenge the powerful and hold them to account. The support
				from our readers helps us to keep our journalism free of a
				paywall, so it’s open and accessible to all.
			</p>
			<p>
				Please could you take a moment to tell us why you want to
				cancel?
			</p>
		</Stack>
	);
