import { Button, Stack } from '@guardian/source/react-components';
import { useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../../../shared/nav/NavConfig';
import { Heading } from '../../shared/Heading';
import { bodyCss, ctaContainerCss, titleCss } from '../cancellationConstants';

export const LeaveSharedSubConfirmation = () => {
	const navigate = useNavigate();

	return (
		<Stack space={3}>
			<Heading borderless={true} cssOverrides={titleCss} level={'2'}>
				You have left the digital plus subscription
			</Heading>

			<p css={bodyCss}>
				You've left this shared subscription, so you no longer have
				access to Digital Plus benefits.
			</p>

			<p css={bodyCss}>
				If you have any questions, please contact our Customer service
				team.
			</p>

			<div css={ctaContainerCss}>
				<Button
					priority="primary"
					onClick={() => {
						navigate(NAV_LINKS.accountOverview.link);
					}}
				>
					Return to account overview
				</Button>
			</div>
		</Stack>
	);
};
