import { css } from '@emotion/react';
import { palette, space } from '@guardian/source/foundations';
import { InfoSummary } from '@guardian/source-development-kitchen/react-components';
import { Link } from 'react-router-dom';
import { useAccountStore } from '@/client/stores/AccountStore';

const bannerCss = css`
	margin: ${space[5]}px 0;
`;

const linkCss = css`
	text-decoration: underline;
	color: ${palette.brand[500]};
`;

export const LeftSharedSubscriptionBanner = () => {
	const justLeftSharedAccount = useAccountStore(
		(state) => state.justLeftSharedAccount,
	);

	if (!justLeftSharedAccount) {
		return null;
	}

	return (
		<div css={bannerCss}>
			<InfoSummary
				message="You have left the Digital plus shared subscription"
				context={
					<>
						You’ve left this shared subscription, so you no longer
						have access to Digital plus benefits. If you have any
						questions, please contact our{' '}
						<Link to="/help-centre#contact-options" css={linkCss}>
							Customer service team
						</Link>
						.
					</>
				}
			/>
		</div>
	);
};
