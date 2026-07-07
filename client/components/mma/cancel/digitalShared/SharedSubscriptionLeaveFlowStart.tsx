import {
	Button,
	Stack,
	SvgArrowLeftStraight,
} from '@guardian/source/react-components';
import { useNavigate } from 'react-router-dom';
import { Heading } from '../../shared/Heading';
import { bodyCss, ctaContainerCss, titleCss } from '../cancellationConstants';

export const LeaveSharedSubscription = () => {
	const navigate = useNavigate();

	return (
		<Stack space={3}>
			<Heading borderless={true} cssOverrides={titleCss} level={'2'}>
				We’re sorry to see you go.
				<br />
				Are you sure you want to leave this subscription?
			</Heading>

			<p css={bodyCss}>
				If you leave this shared subscription, you’ll lose access to
				Guardian premium benefits provided through it.
			</p>
			<p css={bodyCss}>
				The person who invited you will be notified that you’ve left.
			</p>
			<p css={bodyCss}>
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
		</Stack>
	);
};
