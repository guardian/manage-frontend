import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import {
	Button,
	Stack,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { dateString } from '../../../../../shared/dates';
import { ProgressIndicator } from '../../shared/ProgressIndicator';
import type { CancellationContextInterface } from '../CancellationContainer';
import { CancellationContext } from '../CancellationContainer';
import { buttonLayoutCss, headingCss } from './SaveStyles';

export const ValueOfSupport = () => {
	const navigate = useNavigate();
	const cancellationContext = useContext(
		CancellationContext,
	) as CancellationContextInterface;
	const productDetail = cancellationContext.productDetail;

	if (!productDetail) {
		return <Navigate to="/" />;
	}

	const supportStartYear = dateString(
		new Date(productDetail.joinDate),
		'yyyy',
	);

	return (
		<>
			<ProgressIndicator
				steps={[
					{ title: 'Details', isCurrentStep: true },
					{ title: '' },
					{ title: '' },
				]}
				additionalCSS={css`
					margin: ${space[5]}px 0 ${space[12]}px;
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
				<p>
					Since you first joined as a Guardian Member, we've lived
					through some of the most important news events of our times.
					Without you, our fearless, independent journalism wouldn't
					have reached millions around the world. We're so grateful.
				</p>
			</Stack>
			<div>Image placeholder</div>
			<div css={[buttonLayoutCss, { textAlign: 'right' }]}>
				<Button
					priority="tertiary"
					onClick={() => navigate('../landing')}
				>
					Back
				</Button>
				<Button
					icon={<SvgArrowRightStraight />}
					iconSide="right"
					onClick={() => navigate('../offers')}
				>
					Continue to cancellation
				</Button>
			</div>
		</>
	);
};
