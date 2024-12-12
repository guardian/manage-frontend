import { css } from '@emotion/react';
import { Link } from '@guardian/source/react-components';
import { ProblemAlert } from '../shared/ProblemAlert';

export const CanadaStrike = () => (
	<ProblemAlert
		message={
			<div>
				<p>
					Due to industrial action by Canada Post, it is not possible
					to deliver your copies of the Guardian Weekly. You are
					welcome to pause your subscription during the period of
					industrial action, details on how to do so can be found{' '}
					<Link
						href="https://manage.theguardian.com/help-centre/article/i-need-to-pause-my-delivery"
						priority="primary"
					>
						here
					</Link>
					.
				</p>
				<p>
					If you have reached your allowance limit please contact{' '}
					<Link
						href="mailto:customer.help@theguardian.com"
						priority="primary"
					>
						customer.help@guardian.co.uk
					</Link>
				</p>
			</div>
		}
		additionalcss={css`
			margin-top: 30px;
		`}
	/>
);
