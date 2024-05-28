import { css } from '@emotion/react';
import { from, palette, space, textSans17 } from '@guardian/source/foundations';

const privacyNoticeLinkCss = css`
	color: ${palette.brand[500]};
	text-decoration: underline;
`;

export const ContactUs = () => (
	<p
		css={css`
			width: 100%;
			border-top: 1px solid ${palette.neutral[86]};
			${textSans17};
			color: ${palette.neutral[46]};
			margin: 0;
			padding-top: ${space[4]}px;

			${from.tablet} {
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
