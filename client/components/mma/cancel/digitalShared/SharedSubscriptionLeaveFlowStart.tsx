import {
	Button,
	Stack,
	SvgArrowLeftStraight,
} from '@guardian/source/react-components';
import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { GenericErrorScreen } from '@/client/components/shared/GenericErrorScreen';
import { useAccountStore } from '@/client/stores/AccountStore';
import { leaveSharedSubscriptionFetch } from '@/client/utilities/productUtils';
import type { DigitalSharedRouterState } from '../../accountoverview/manageProducts/DigitalShared';
import { Heading } from '../../shared/Heading';
import { bodyCss, ctaContainerCss, titleCss } from '../cancellationConstants';

export const LeaveSharedSubscription = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const routerState = location.state as DigitalSharedRouterState | null;
	const setJustLeftSharedAccount = useAccountStore(
		(state) => state.setJustLeftSharedAccount,
	);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [loadingFailed, setLoadingFailed] = useState(false);

	if (!routerState?.primarySubscriber) {
		return <Navigate to="/" />;
	}

	const { primarySubscriber } = routerState;

	const leaveSharedSubscription = async () => {
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
			setJustLeftSharedAccount(true);
			navigate('/digital-shared/leave/confirmation', { replace: true });
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
				Are you sure you want to leave?
			</Heading>

			<p css={bodyCss}>
				If you leave, you’ll lose access to all the supporter extras of
				Digital plus. You can come back anytime with a new invitation.
			</p>

			<div css={ctaContainerCss}>
				<Button
					aria-label={`Previous page`}
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
					aria-label={`Confirm leave shared subscription`}
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
