import { css } from '@emotion/core';
import { textSans } from '@guardian/src-foundations/typography';
import { neutral, brand } from '@guardian/src-foundations/palette';
import { minWidth } from '../../../styles/breakpoints';
import { space } from '@guardian/src-foundations';

const privacyNoticeLinkCss = css`
	color: ${brand[500]};
	text-decoration: underline;
`;

const ContactUs = () => (
	<p
		css={css`
			width: 100%;
			border-top: 1px solid ${neutral[86]};
			${textSans.medium()};
			color: ${neutral[46]};
			padding-top: ${space[4]}px;

			${minWidth.tablet} {
				padding-top: ${space[9]}px;
			}
		`}
	>
		Are you experiencing difficulties switching your payment method?{' '}
		<a css={privacyNoticeLinkCss} href="/help-centre">
			Contact Us &nbsp; &nbsp;
			<svg
				css={css`
					width: 16px;
					height: 16px;
					transform: translate(-14.5px, 2.5px);
				`}
				viewBox="0 0 30 30"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill="#007ABC"
					fillRule="evenodd"
					clipRule="evenodd"
					d="M9.975 4L9 4.95L17.325 14.925L9 24.8999L9.975 25.8499L20.375 15.45V14.4L9.975 4Z"
				/>
			</svg>
		</a>
	</p>
);

export default ContactUs;
