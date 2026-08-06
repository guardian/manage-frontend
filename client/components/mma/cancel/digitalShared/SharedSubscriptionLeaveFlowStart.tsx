import {
	Button,
	Stack,
	SvgArrowLeftStraight,
} from '@guardian/source/react-components';
import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { GenericErrorScreen } from '@/client/components/shared/GenericErrorScreen';
import { leaveSharedSubscriptionFetch } from '@/client/utilities/productUtils';
import type { DigitalSharedRouterState } from '../../accountoverview/manageProducts/DigitalShared';
import { Heading } from '../../shared/Heading';
import { bodyCss, ctaContainerCss, titleCss } from '../cancellationConstants';

export const LeaveSharedSubscription = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const routerState = location.state as DigitalSharedRouterState | null;

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [loadingFailed, setLoadingFailed] = useState(false);

	if (!routerState?.primarySubscriber) {
		return <Navigate to="/" />;
	}

	const { primarySubscriber } = routerState;

	const leaveSharedSubscription = async () => {
		// TODO tracking
		const secondaryIdentityId =
			window.guardian?.identityDetails?.userId ?? '';
		setIsSubmitting(true);
		try {
			const response = await leaveSharedSubscriptionFetch(
				primarySubscriber.subscriptionName,
				secondaryIdentityId,
			);
			if (!response.ok) {
				throw new Error(
					`Leave shared subscription request failed: ${response.status}`,
				);
			}
			navigate('/digital-shared/leave/confirmation');
		} catch {
			setIsSubmitting(false);
			setLoadingFailed(true);
		}
	};

	if (loadingFailed) {
		return (
			<GenericErrorScreen loggingMessage="Failed to leave shared (secondary user) subscription" />
		);
	}

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
					isLoading={isSubmitting}
					onClick={leaveSharedSubscription}
				>
					Yes, leave subscription
				</Button>
			</div>
		</Stack>
	);
};
