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

export const ContinueMembershipConfirmation = () => {
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
				<Heading>Thank you for continuing your membership</Heading>
				<p>
					No action is needed from your side. Your membership will
					continue as normal.
				</p>
			</Stack>
			<div css={[buttonLayoutCss, { textAlign: 'left' }]}>
				<Button
					icon={<SvgArrowRightStraight />}
					iconSide="right"
					onClick={() => navigate('../')}
				>
					Continue reading the Guardian
				</Button>
			</div>
		</>
	);
};
