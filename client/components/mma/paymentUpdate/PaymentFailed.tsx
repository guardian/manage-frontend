import { css } from '@emotion/react';
import { from, palette, space, textSans17 } from '@guardian/source/foundations';
import {
	Button,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { CallCentreNumbers } from '../../shared/CallCentreNumbers';

export function PaymentFailed() {
	const location = useLocation();
	const state = location.state as {
		newPaymentMethodDetailFriendlyName: string;
	};
	const navigate = useNavigate();

	return state ? (
		<>
			<div
				css={css`
					border-top: 1px solid ${palette.neutral['86']};
					text-align: left;
					margin-top: ${space[9]}px;
					margin-bottom: ${space[6]}px;
					${textSans17};
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
					border-top: 1px solid ${palette.neutral[86]};
					${textSans17};
					color: ${palette.neutral[46]};
					padding-top: ${space[4]}px;
					margin-top: ${space[6]}px;

					a {
						color: ${palette.brand[500]};
					}

					${from.tablet} {
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
