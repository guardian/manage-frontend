import { css } from '@emotion/react';
import {
	LinkButton,
	SvgArrowLeftStraight,
} from '@guardian/source-react-components';
import { space } from '@guardian/source-foundations';
import * as Sentry from '@sentry/browser';
import { useContext } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { GenericErrorMessage } from '../../identity/GenericErrorMessage';
import { ProgressIndicator } from '../../progressIndicator';
import { WithStandardTopMargin } from '../../WithStandardTopMargin';
import {
	CancellationContext,
	CancellationContextInterface,
	CancellationRouterState,
} from '../CancellationContainer';
import { CancellationReason } from '../cancellationReason';

export interface SavedBodyProps {
	amount: number;
}

const SavedCancellation = () => {
	const navigate = useNavigate();

	const location = useLocation();

	const routerState = location.state as CancellationRouterState;
	const { productType } = useContext(
		CancellationContext,
	) as CancellationContextInterface;

	const updatedAmount = routerState.updatedContributionAmount;
	const selectedReasonId = routerState.selectedReasonId;

	if (!updatedAmount || !selectedReasonId || !productType) {
		Sentry.captureMessage(
			'Updated amount and/or cancellation reason not passed to SavedCancellation',
		);
		return <Navigate to="../" />;
	}

	const reason = productType.cancellation.reasons.find(
		(reason) => reason.reasonId === selectedReasonId,
	) as CancellationReason;

	const onReturnClicked = (
		event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
	) => {
		event.preventDefault();
		navigate('/');
	};

	return updatedAmount && reason ? (
		<>
			<ProgressIndicator
				steps={[
					{ title: 'Reason' },
					{ title: 'Review' },
					{ title: 'Confirmation', isCurrentStep: true },
				]}
				additionalCSS={css`
					margin: ${space[5]}px 0 ${space[12]}px;
				`}
			/>
			<WithStandardTopMargin>
				{reason.savedBody && (
					<reason.savedBody amount={updatedAmount} />
				)}

				<div
					css={css`
						margin-top: ${space[24]}px;
					`}
				>
					<LinkButton
						href="/"
						onClick={onReturnClicked}
						priority="tertiary"
						icon={<SvgArrowLeftStraight />}
						iconSide="left"
					>
						Return to your account
					</LinkButton>
				</div>
			</WithStandardTopMargin>
		</>
	) : (
		<GenericErrorMessage />
	);
};

export default SavedCancellation;
