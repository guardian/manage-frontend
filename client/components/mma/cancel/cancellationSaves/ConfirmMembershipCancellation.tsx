import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { Button, Stack } from '@guardian/source-react-components';
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
					Please keep in mind that you will be losing access to your
					supporter extras. <br />
					If you cancel you will not be able to rejoin the Guardian
					Members scheme, as it’s now closed to new members.
				</p>
			</Stack>
			<div css={[buttonLayoutCss, { textAlign: 'left' }]}>
				<Button onClick={() => navigate('../reasons')}>
					Confirm Cancellation
				</Button>
				<Button
					priority="tertiary"
					onClick={() => navigate('../offers')}
				>
					Back to options
				</Button>
			</div>
		</>
	);
};
