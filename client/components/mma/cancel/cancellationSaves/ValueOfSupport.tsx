import { css } from '@emotion/react';
import { space, textSans } from '@guardian/source-foundations';
import { Button, Stack } from '@guardian/source-react-components';
import { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { dateString } from '../../../../../shared/dates';
import { ProgressStepper } from '../../shared/ProgressStepper';
import type {
	CancellationContextInterface,
	CancellationRouterState,
} from '../CancellationContainer';
import { CancellationContext } from '../CancellationContainer';
import {
	buttonCentredCss,
	headingCss,
	reverseStackedButtonLayoutCss,
} from './SaveStyles';

export const ValueOfSupport = () => {
	const navigate = useNavigate();
	const cancellationContext = useContext(
		CancellationContext,
	) as CancellationContextInterface;
	const productDetail = cancellationContext.productDetail;

	const location = useLocation();
	const routerState = location.state as CancellationRouterState;

	if (!productDetail) {
		return <Navigate to="/" />;
	}

	const supportStartYear = dateString(
		new Date(productDetail.joinDate),
		'yyyy',
	);

	return (
		<>
			<ProgressStepper
				steps={[
					{ title: 'Details', isCurrentStep: true },
					{ title: 'Options' },
					{ title: 'Confirmation' },
				]}
				additionalCSS={css`
					margin: ${space[5]}px 0 ${space[12]}px;
					max-width: 350px;
				`}
			/>
			<Stack space={4}>
				<h2 css={headingCss}>
					Thank you for supporting the Guardian since{' '}
					{supportStartYear}.
					<span>
						Your funding has played a vital role in our progress
					</span>
				</h2>
				<p
					css={css`
						${textSans.medium()}
					`}
				>
					Since you first joined as a Guardian Member, we've lived
					through some of the most important news events of our times.
					Without you, our fearless, independent journalism wouldn't
					have reached millions around the world. We're so grateful.
				</p>
			</Stack>
			<div>Image placeholder</div>
			<div css={reverseStackedButtonLayoutCss}>
				<Button
					priority="tertiary"
					cssOverrides={buttonCentredCss}
					onClick={() => navigate('../landing')}
				>
					Go back to my account
				</Button>
				<Button
					iconSide="right"
					cssOverrides={buttonCentredCss}
					onClick={() =>
						navigate('../offers', { state: { ...routerState } })
					}
				>
					Continue to cancellation
				</Button>
			</div>
		</>
	);
};
