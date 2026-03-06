import { css } from '@emotion/react';
import { from, palette, space, until } from '@guardian/source/foundations';

export const bannerOuterCss = css`
	margin-top: ${space[8]}px;

	${from.tablet} {
		margin-top: ${space[10]}px;
	}
`;

export const bannerWrapperCss = (bgColor: string) => css`
	max-height: 65svh;
	border-top: 1px solid ${palette.neutral[0]};
	background-color: ${bgColor};
	${until.phablet} {
		border: none;
	}
`;

export const contentWrapperCss = (bgColor: string) => css`
	background-color: ${bgColor};
	box-sizing: border-box;
	position: relative;
	display: grid;
	margin: 0 auto;
	padding: ${space[3]}px ${space[1]}px 0 ${space[3]}px;
	bottom: 0;
	column-gap: 10px;
	align-self: stretch;
	max-width: 1300px;
	grid-template:
		'logo vert-line copy-container close-button'
		/ 219px 1px 840px auto;
	${until.wide} {
		max-width: 1140px;
		grid-template:
			'logo vert-line copy-container close-button'
			/ 140px 1px 840px auto;
	}
	${until.leftCol} {
		max-width: 980px;
		grid-template:
			'copy-container close-button'
			/ auto 68px;
	}
	${until.desktop} {
		max-width: 740px;
		grid-template:
			'. copy-container close-button close-button'
			/ minmax(0px, 0.5fr)
			492px max-content minmax(0px, 0.5fr);
		padding: ${space[3]}px ${space[3]}px 0;
	}
	${until.phablet} {
		max-width: 660px;
		grid-template:
			'. .'
			'copy-container close-button' / auto 0px;
	}
`;

export const logoCss = css`
	box-sizing: border-box;
	grid-area: logo;
	justify-self: end;
	width: 128px;
	height: 41px;
	justify-content: end;
	margin-top: ${space[5]}px;
	${until.leftCol} {
		display: none;
	}
`;

export const vertLineCss = (fgColor: string) => css`
	box-sizing: border-box;
	grid-area: vert-line;
	background-color: ${fgColor};
	width: 1px;
	opacity: 0.2;
	margin: ${space[6]}px ${space[2]}px 0;
	${until.leftCol} {
		display: none;
	}
`;

export const bannerContentCss = css`
	grid-area: copy-container;
	padding: ${space[6]}px ${space[3]}px ${space[3]}px;
	${until.leftCol} {
		padding-left: 0;
		padding-right: 0;
	}
	${until.phablet} {
		padding-top: 0;
		padding-bottom: 0;
	}
	${until.phablet} {
		padding-top: ${space[6]}px;
	}
`;

export const closeButtonContainerCss = css`
	box-sizing: border-box;
	grid-area: close-button;
	display: flex;
	justify-content: space-between;
	column-gap: 2px;
	padding-right: ${space[2]}px;
	margin-top: ${space[6]}px;
	flex-direction: row-reverse;
	${until.desktop} {
		margin-top: ${space[2]}px;
	}
	${until.phablet} {
		position: sticky;
		top: ${space[2]}px;
	}
`;

export const closeButtonWrapperCss = css`
	box-sizing: border-box;
	margin: 0;
	${until.desktop} {
		margin-left: ${space[2]}px;
	}
`;

export const closeButtonCss = (bgColor: string, contrastMix: string) => css`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	border: none;
	background: color-mix(in srgb, ${bgColor}, ${contrastMix} 5%);
	cursor: pointer;
	transition: 0.3s ease-in-out;
	text-decoration: none;
	white-space: nowrap;
	vertical-align: middle;
	font-size: 1.0625rem;
	line-height: 1.3;
	font-weight: 700;
	height: ${space[9]}px;
	min-height: ${space[9]}px;
	border-radius: ${space[9]}px;
	color: ${palette.neutral[7]};
	padding: 0;
	width: ${space[9]}px;
	margin: 0;
	${until.desktop} {
		margin-top: ${space[1]}px;
		margin-right: ${space[1]}px;
	}
`;

export const visuallyHiddenCss = css`
	position: absolute;
	overflow: hidden;
	white-space: nowrap;
	width: 1px;
	height: 1px;
	margin: -1px;
	padding: 0;
	border: 0;
	clip: rect(1px, 1px, 1px, 1px);
	clip-path: inset(50%);
`;

export const closeIconSvgCss = css`
	flex: 0 0 auto;
	display: block;
	fill: currentcolor;
	position: relative;
	width: 26px;
	height: auto;
`;

export const closeIconPathCss = (fgColor: string) => css`
	fill: ${fgColor};
`;
