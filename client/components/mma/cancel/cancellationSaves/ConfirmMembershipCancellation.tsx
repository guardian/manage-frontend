import { css } from '@emotion/react';
import { news, space, textSans } from '@guardian/source-foundations';
import { Button, Stack } from '@guardian/source-react-components';
import { useNavigate } from 'react-router';
import { Heading } from '../../shared/Heading';
import { ProgressIndicator } from '../../shared/ProgressIndicator';
import { stackedButtonLeftLayoutCss } from './SaveStyles';

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
					Are you sure you want to cancel <br /> your membership?
				</Heading>
				<p
					css={css`
						${textSans.medium()}
					`}
				>
					Please keep in mind that you will be losing access to your
					supporter extras.{' '}
				</p>
				<p
					css={css`
						${textSans.medium()}
					`}
				>
					If you cancel you will not be able to rejoin the Guardian
					Members scheme, as it’s now closed to new members.
				</p>
			</Stack>
			<div css={stackedButtonLeftLayoutCss}>
				<Button
					onClick={() => navigate('../reasons')}
					cssOverrides={css`
						background-color: ${news['400']};
						justify-content: center;
					`}
				>
					Confirm Cancellation
				</Button>
				<Button
					priority="tertiary"
					onClick={() => navigate('../offers')}
					cssOverrides={css`
						justify-content: center;
					`}
				>
					Back to options
				</Button>
			</div>
		</>
	);
};
