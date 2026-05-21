import { css } from '@emotion/react';
import { Link } from '@guardian/source/react-components';
import { ProblemAlert } from '../shared/ProblemAlert';

export const CanadaStrike = () => (
	<ProblemAlert
		message={
			<div>
				<p>
					<b>For Canadian residents only. </b>Please note that Canada
					Post is currently on strike. If you start a Guardian Weekly
					subscription today, we will not be able to deliver your
					copies until postal services resume. We apologise for any
					inconvenience this may cause.' .
				</p>
				<p>
					If you have reached your allowance limit please contact{' '}
					<Link
						href="mailto:customer.help@theguardian.com"
						priority="primary"
					>
						customer.help@theguardian.com
					</Link>
				</p>
			</div>
		}
		additionalcss={css`
			margin-top: 30px;
		`}
	/>
);
