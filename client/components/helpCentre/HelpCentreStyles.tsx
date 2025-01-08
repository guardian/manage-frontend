import { css } from '@emotion/react';
import {
	from,
	headlineBold28,
	palette,
	space,
	textSans17,
} from '@guardian/source/foundations';

export const linkAnchorStyle = css`
	display: inline-block;
	width: 100%;
	${textSans17};
	color: ${palette.neutral['7']};
	:visited {
		color: ${palette.neutral['7']};
	}
`;

export const linkArrowStyle = css`
	display: block;
	width: 7px;
	height: 7px;
	border-top: 2px solid ${palette.neutral['7']};
	border-right: 2px solid ${palette.neutral['7']};
	position: absolute;
	top: 50%;
	transform: translateY(-50%) rotate(45deg);
	right: 7px;
`;

export const linksListStyle = css`
	list-style: none;
	margin: 0 0 ${space[5]}px 0;
	padding: 0;
`;

export const linkListItemStyle = css`
	padding: ${space[3]}px ${space[5]}px ${space[3]}px 0;
	border-bottom: 1px solid ${palette.neutral['86']};
	position: relative;
`;

export const containterCss = css`
	width: 100%;
	border: 1px solid ${palette.neutral['86']};
`;

export const sectionTitleCss = (
	isOpen: boolean,
	isNotFirstOption: boolean,
) => css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: ${palette.neutral['7']};
	${textSans17};
	margin: 0;
	padding: ${space[4]}px 14px ${space[4]}px ${space[3]}px;
	${from.desktop} {
		padding: ${space[4]}px 31px ${space[4]}px ${space[3]}px;
	}
	position: relative;
	cursor: pointer;
	:after {
		content: '';
		display: block;
		width: 7px;
		height: 7px;
		border-top: 2px solid ${palette.neutral['7']};
		border-right: 2px solid ${palette.neutral['7']};
		position: absolute;
		top: 50%;
		transform: translateY(${isOpen ? '-10%' : '-50%'})
			${isOpen ? 'rotate(-45deg)' : 'rotate(135deg)'};
		transition: transform 0.4s;
		right: ${space[3]}px;
		${from.desktop} {
			right: 17px;
		}
	}
	${isNotFirstOption &&
	`
    :before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0px;
      width: 100%;
      height: 1px;
      background-color: ${palette.neutral['86']}
    }
  `}
`;

export const innerSectionDivCss = css`
	${textSans17};
	margin-bottom: 0;
	padding: ${space[4]}px ${space[5]}px ${space[4]}px 0;
	margin: 0 ${space[3]}px;
	position: relative;
`;

export const innerSectionCss = (isOpen: boolean) => css`
	display: ${isOpen ? 'block' : 'none'};
	margin: 0;
	padding: 0;
	list-style: none;
	background-color: rgba(193, 216, 252, 0.3);
	border-top: 1px solid ${palette.neutral[86]};
`;

export const h2Css = css`
	margin-top: 0;
	margin-bottom: ${space[6]}px;
	padding-top: 2px;
	border-top: 1px solid ${palette.neutral['86']};
	${headlineBold28};
	${from.desktop} {
		font-size: 32px;
	}
`;
