import { css } from '@emotion/core';
import { LinkButton } from '@guardian/src-button';
import { space } from '@guardian/src-foundations';
import { SvgArrowLeftStraight } from '@guardian/src-icons';
import * as Sentry from '@sentry/browser';
import { useLocation, useNavigate } from 'react-router-dom';
import { GenericErrorMessage } from '../../identity/GenericErrorMessage';
import { ProgressIndicator } from '../../progressIndicator';
import { WithStandardTopMargin } from '../../WithStandardTopMargin';
import { CancellationRouterState } from '../CancellationContainer';

export interface SavedBodyProps {
	amount: number;
}

const SavedCancellation = () => {
	const navigate = useNavigate();

	const location = useLocation();

	const routerState = location.state as CancellationRouterState;

	const updatedAmount = routerState.updatedContributionAmount;
	const reason = routerState.selectedReason;

	if (!updatedAmount || !reason) {
		Sentry.captureMessage(
			'Updated amount and/or cancellation reason not passed to SavedCancellation',
		);
	}

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
