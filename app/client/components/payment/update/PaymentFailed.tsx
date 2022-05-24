import { css } from '@emotion/core';
import { neutral, brand } from '@guardian/src-foundations/palette';
import { space } from '@guardian/src-foundations';
import { minWidth } from '../../../styles/breakpoints';
import { Button } from '@guardian/src-button';
import { CallCentreNumbers } from '../../callCentreNumbers';
import { textSans } from '@guardian/src-foundations/typography';
import { SvgArrowRightStraight } from '@guardian/src-icons';
import { Navigate, useLocation, useNavigate } from 'react-router';

export default function PaymentFailed() {
	const location = useLocation();
	const state = location.state as {
		newPaymentMethodDetailFriendlyName: string;
	};
	const navigate = useNavigate();

	return state ? (
		<>
			<div
				css={css`
					border-top: 1px solid ${neutral['86']};
					text-align: left;
					margin-top: ${space[9]}px;
					margin-bottom: ${space[6]}px;
					${textSans.medium()}
				`}
			>
				<p
					css={css`
						padding-top: ${space[1]}px;
					`}
				>
					Sorry, the {state.newPaymentMethodDetailFriendlyName} update
					failed.
					<br />
					To try again please go back and re-enter your new{' '}
					{state.newPaymentMethodDetailFriendlyName} details.
				</p>
			</div>
			<Button
				priority="primary"
				onClick={() => navigate('..')}
				icon={<SvgArrowRightStraight />}
				iconSide="right"
			>
				Try again
			</Button>
			<div
				css={css`
					border-top: 1px solid ${neutral[86]};
					${textSans.medium()};
					color: ${neutral[46]};
					padding-top: ${space[4]}px;
					margin-top: ${space[6]}px;

					a {
						color: ${brand[500]};
					}

					${minWidth.tablet} {
						padding-top: ${space[9]}px;
						margin-top: ${space[9]}px;
					}
				`}
			>
				<CallCentreNumbers prefixText="Alternatively, to contact us" />
			</div>
		</>
	) : (
		<Navigate to="/" />
	);
}
