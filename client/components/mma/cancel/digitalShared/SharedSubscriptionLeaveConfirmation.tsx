import { css } from '@emotion/react';
import {
	from,
	space,
	textSans15,
	textSans17,
} from '@guardian/source/foundations';
import { Button, Stack } from '@guardian/source/react-components';
import { useNavigate } from 'react-router-dom';
import { DATE_FNS_LONG_OUTPUT_FORMAT, dateString } from '@/shared/dates';
import { NAV_LINKS } from '../../../shared/nav/NavConfig';
import { Heading } from '../../shared/Heading';
import { ctaContainerCss, titleCss } from '../cancellationConstants';

const bodyCss = css`
	${textSans15};
	margin: ${space[2]}px 0;

	${from.tablet} {
		${textSans17};
	}
`;

export const LeaveSharedSubConfirmation = () => {
	const navigate = useNavigate();

	// TODO: This is not needed. Access will end immediately.
	const accessEndDate = dateString(new Date(), DATE_FNS_LONG_OUTPUT_FORMAT);

	return (
		<Stack space={3}>
			<Heading borderless={true} cssOverrides={titleCss} level={'2'}>
				You have left the digital plus subscription
			</Heading>

			<p css={bodyCss}>
				You can continue to enjoy Digital plus benefits until{' '}
				{accessEndDate}. After this date, you’ll no longer have access
				to Digital plus benefits through this shared subscription.
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
