import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { Button, Stack } from '@guardian/source-react-components';
import { useNavigate } from 'react-router';
import { ProgressIndicator } from '../../shared/ProgressIndicator';
import { headingCss, stackedButtonLeftLayoutCss } from './SaveStyles';

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
				<h2 css={headingCss}>Thank you for keeping your Membership</h2>
				<p>
					The new price of your Membership is £7/month. <br />
					Your first billing date will be XX Month.
				</p>
			</Stack>
			<div css={stackedButtonLeftLayoutCss}>
				<Button priority="tertiary" onClick={() => navigate('/')}>
					Back to account overview
				</Button>
				<Button onClick={() => navigate('https://www.theguardian.com')}>
					Continue to the Guardian
				</Button>
			</div>
		</>
	);
};
