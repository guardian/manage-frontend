import { css } from '@emotion/core';
import { breakpoints, neutral, space } from '@guardian/src-foundations';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { minWidth } from '../styles/breakpoints';

const containerStyle = css`
	max-width: ${breakpoints.wide}px;
	margin: 0 auto;
	padding: ${space[12]}px 0;
	border-left: 1px solid ${neutral[86]};
	border-right: 1px solid ${neutral[86]};
	height: 100%;
`;

const wrapperStyle = css`
	margin: 0 10px;
	max-width: ${breakpoints.mobileLandscape}px;
	${minWidth.tablet} {
		margin: 0 20px;
	}
`;

const headingStyle = css`
	${headline.medium({ fontWeight: 'bold' })};
	margin: 0;
	padding-bottom: ${space[4]}px;
	border-bottom: 1px solid ${neutral['86']};
`;

const grafStyle = css`
	${textSans.medium()};
	margin-top: 0;
	margin-bottom: ${space[4]}px;
`;

const Maintenance = () => {
	return (
		<div css={containerStyle}>
			<section css={wrapperStyle}>
				<h1 css={headingStyle}>We'll be back soon</h1>
				<p css={grafStyle}>
					Sorry for the inconvenience. We are currently performing
					some essential maintenance. Please try again later.
				</p>
			</section>
		</div>
	);
};

export default Maintenance;
