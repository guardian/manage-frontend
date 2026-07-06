import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	headlineBold28,
	space,
	textSans15,
	textSans17,
} from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import { useNavigate } from 'react-router-dom';
import { DATE_FNS_LONG_OUTPUT_FORMAT, dateString } from '@/shared/dates';
import { NAV_LINKS } from '../../shared/nav/NavConfig';
import { WithStandardTopMargin } from '../../shared/WithStandardTopMargin';

const titleCss = css`
	${headlineBold24};
	margin: 0 0 ${space[4]}px;

	${from.tablet} {
		${headlineBold28};
		margin-bottom: ${space[5]}px;
	}
`;

const bodyCss = css`
	${textSans15};
	margin: 0 0 ${space[6]}px;

	${from.tablet} {
		${textSans17};
	}
`;

export const LeaveSharedSubConfirmation = () => {
	const navigate = useNavigate();

	// TODO: This is not needed. Access will end immediately.
	const accessEndDate = dateString(new Date(), DATE_FNS_LONG_OUTPUT_FORMAT);

	return (
		<WithStandardTopMargin>
			<h2 css={titleCss}>You have left the digital plus subscription</h2>
			<p css={bodyCss}>
				You can continue to enjoy Digital plus benefits until{' '}
				{accessEndDate}. After this date, you’ll no longer have access
				to Digital plus benefits through this shared subscription.
				<br />
				If you have any questions, please contact our Customer service
				team.
			</p>
			<Button
				priority="primary"
				onClick={() => {
					navigate(NAV_LINKS.accountOverview.link);
				}}
			>
				Return to account overview
			</Button>
		</WithStandardTopMargin>
	);
};
