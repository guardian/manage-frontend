import { css } from '@emotion/react';
import {
	brand,
	from,
	neutral,
	space,
	textSans,
} from '@guardian/source-foundations';
import {
	Button,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import { Navigate, useLocation, useNavigate } from 'react-router';
import type { CancellationRouterState } from '../cancel/CancellationContainer';
import { CallCentreNumbers } from '../shared/callCentreNumbers';

export default function ProductSwitchFailed() {
	const location = useLocation();
	const routerState = location.state as CancellationRouterState;
	const navigate = useNavigate();

	return routerState ? (
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
					To fill in copy.
					<br />
					To fill in copy.
				</p>
			</div>
			<Button
				priority="primary"
				onClick={() => navigate('/')}
				icon={<SvgArrowRightStraight />}
				iconSide="right"
			>
				Back to Account overview
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
