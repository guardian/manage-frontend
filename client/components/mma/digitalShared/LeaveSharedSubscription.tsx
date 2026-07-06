import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	headlineBold28,
	space,
	textSans15,
	textSans17,
} from '@guardian/source/foundations';
import {
	Button,
	SvgArrowLeftStraight,
} from '@guardian/source/react-components';
import { useNavigate } from 'react-router-dom';
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

const ctaContainerCss = css`
	display: flex;
	flex-direction: column;
	gap: ${space[3]}px;

	${from.tablet} {
		flex-direction: row;
	}
`;

export const LeaveSharedSubscription = () => {
	const navigate = useNavigate();

	return (
		<WithStandardTopMargin>
			<h2 css={titleCss}>
				We’re sorry to see you go.
				<br />
				Are you sure you want to leave this subscription?
			</h2>
			<p css={bodyCss}>
				If you leave this shared subscription, you’ll lose access to
				Guardian premium benefits provided through it.
				<br />
				The person who invited you will be notified that you’ve left.
				<br />
				You’ll need a new invitation if you want to rejoin later.
			</p>
			<div css={ctaContainerCss}>
				<Button
					priority="tertiary"
					icon={<SvgArrowLeftStraight />}
					iconSide="left"
					onClick={() => {
						navigate(-1);
					}}
				>
					Previous
				</Button>
				{/* TODO: implement leave shared subscription flow */}
				<Button
					priority="primary"
					onClick={() => {
						// TODO tracking
						// TODO API call to leave shared subscription
						navigate('/digital-shared/leave/confirmation');
					}}
				>
					Yes, leave subscription
				</Button>
			</div>
		</WithStandardTopMargin>
	);
};
