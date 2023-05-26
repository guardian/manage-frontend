import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import {
	Button,
	Stack,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import { useNavigate } from 'react-router';
import { Heading } from '../../shared/Heading';
import { ProgressIndicator } from '../../shared/ProgressIndicator';
import { buttonLayoutCss } from './SaveStyles';

export const ConfirmMembershipCancellation = () => {
	const navigate = useNavigate();

	return (
		<>
			<ProgressIndicator
				steps={[
					{ title: '' },
					{ title: '' },
					{ title: 'Confirmation', isCurrentStep: true },
				]}
				additionalCSS={css`
					margin: ${space[5]}px 0 ${space[12]}px;
				`}
			/>
			<Stack space={4}>
				<Heading>
					Are you sure you want to cancel your membership?
				</Heading>
				<p>
					Before you do, please keep in mind that you will be losing{' '}
					access to you supporter extras. If you're certain you want
					to cancel, please confirm your cancellation below.
				</p>
			</Stack>
			<div css={[buttonLayoutCss, { textAlign: 'left' }]}>
				<Button
					icon={<SvgArrowRightStraight />}
					iconSide="right"
					onClick={() => navigate('../reasons')}
				>
					Confirm Cancellation
				</Button>
				<Button
					priority="tertiary"
					onClick={() => navigate('../offers')}
				>
					Back to offers
				</Button>
			</div>
		</>
	);
};
