import { css } from '@emotion/react';
import {
	from,
	headlineBold20,
	headlineBold34,
	palette,
	space,
	textSans15,
	until,
} from '@guardian/source/foundations';
import { gridColumns } from '../../../styles/grid';

export const dataPrivacyHeadingCss = css`
	margin: 0;
	margin-bottom: 0.5rem;
	${headlineBold20};
	color: ${palette.neutral[7]};
`;

export const dataPrivacyParagraphCss = css`
	margin-bottom: 0.5rem;
	margin-top: 0.5rem;
	${textSans15};
	color: ${palette.neutral[7]};
`;

export const dataPrivacyUnorderedListCss = css`
	margin: 0;
	padding-left: 20px;
	${textSans15};
	color: ${palette.neutral[7]};
	li {
		list-style: none;
	}
	li::before {
		display: inline-block;
		content: '';
		border-radius: 50%;
		height: 13px;
		width: 13px;
		background-color: ${palette.neutral[86]};
		margin-left: -20px;
		margin-right: 7px;
	}
`;

export const dataPrivacyVideoCss = css`
	width: 100%;
`;

export const dataPrivacyVideoOverlayContainer = css`
	width: 100%;
	position: relative;
	video {
		width: 100%;
		display: block;
	}
`;

export const dataPrivacyVideoOverlay = css`
	position: absolute;
	background-color: rgba(0, 0, 0, 0.46);
	z-index: 2;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
`;

export const dataPrivacyVideoTextHeadline = css`
	${headlineBold34};
	left: 25%;
	bottom: 0;
	position: absolute;
	${until.mobileLandscape} {
		margin-bottom: 0.5rem;
	}
`;

export const dataPrivacyFooter = css`
	color: white;
	width: 100%;
	height: 20%;
`;

export const dataPrivacyPlayButtonWrapper = css`
	height: 20%;
	left: 0;
	bottom: 0;
	position: absolute;
	margin-left: 1%;
`;

export const dataPrivacyMarketingToggleCss = css`
	margin-top: 0;
	position: relative;
`;

export const dataPrivacySvgImage = css`
	max-width: 100%;
	max-height: 100%;
	width: 95%;
	height: 95%;
	border-radius: 50%;

	&:focus {
		border: 0;
		outline-offset: -2px;
		outline-style: solid;
	}
`;

export const dataPrivacyWrapper = css`
	*:focus {
		outline-offset: 2px;
		outline-width: 3px;
		outline-color: ${palette.focus[400]};
	}

	display: grid;
	grid-template-columns: repeat(${gridColumns.default}, minmax(0, 1fr));
	column-gap: ${space[5]}px;

	${from.tablet} {
		grid-template-columns: repeat(
			${gridColumns.tabletAndDesktop},
			minmax(0, 1fr)
		);
	}

	${from.wide} {
		grid-template-columns: repeat(${gridColumns.wide}, minmax(0, 1fr));
	} ;
`;
