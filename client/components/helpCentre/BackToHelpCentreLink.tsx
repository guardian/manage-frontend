import { css } from '@emotion/react';
import {
	neutral,
	palette,
	space,
	textSans,
} from '@guardian/source/foundations';
import { SvgChevronLeftSingle } from '@guardian/source/react-components';
import { Link } from 'react-router-dom';

const dividerCss = css`
	margin-top: ${space[12]}px;
	padding-top: ${space[9]}px;
	border-top: 1px solid ${neutral['86']};
`;

const linkCss = css`
	display: flex;
	align-items: center;
	${textSans.medium()};
	color: ${palette.brand[500]};
	&:hover,
	&:focus {
		text-decoration: underline;
	}
`;

const linkIconCss = css`
	width: 18px;
	height: 18px;
	margin: 0 4px 2px -4px;
	& > svg {
		stroke: currentColor;
	}
`;

export const BackToHelpCentreLink = () => (
	<div css={dividerCss}>
		<Link to="/help-centre" css={linkCss}>
			<span css={linkIconCss}>
				<SvgChevronLeftSingle />
			</span>
			Back to Help Centre
		</Link>
	</div>
);
