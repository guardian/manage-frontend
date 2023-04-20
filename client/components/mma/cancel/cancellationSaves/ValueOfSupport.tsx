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
import { Heading } from '../../shared/Heading';
import { ProgressIndicator } from '../../shared/ProgressIndicator';
import type { CancellationContextInterface } from '../CancellationContainer';
import { CancellationContext } from '../CancellationContainer';
import { buttonLayoutCss } from './SaveStyles';

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
					{ title: '' },
					{ title: 'Details', isCurrentStep: true },
					{ title: '' },
				]}
				additionalCSS={css`
					margin: ${space[5]}px 0 ${space[12]}px;
				`}
			/>
			<Stack space={4}>
				<Heading>
					Thank you for supporting the Guardian since{' '}
					{supportStartYear}.
					<span css={{ display: 'block' }}>
						Your support has made such a difference.
					</span>
				</Heading>
				<p>
					Here comes ... Before you go, please consider adapting your
					membership to a monthly support or a Monthly + Extra
					support.
				</p>
			</Stack>
			<div>Image placeholder</div>
			<div css={[buttonLayoutCss, { textAlign: 'right' }]}>
				<Button priority="tertiary" onClick={() => navigate('/')}>
					Back
				</Button>
				<Button icon={<SvgArrowRightStraight />} iconSide="right">
					Continue to cancellation
				</Button>
			</div>
		</>
	);
};
