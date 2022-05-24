import { css } from '@emotion/core';
import { space } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { minWidth } from '../../styles/breakpoints';

export const linkAnchorStyle = css`
	display: inline-block;
	width: 100%;
	${textSans.medium()};
	color: ${neutral['7']};
	:visited {
		color: ${neutral['7']};
	}
`;

export const linkArrowStyle = css`
	display: block;
	width: 7px;
	height: 7px;
	border-top: 2px solid ${neutral['7']};
	border-right: 2px solid ${neutral['7']};
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
	border-bottom: 1px solid ${neutral['86']};
	position: relative;
`;

export const containterCss = css`
	width: 100%;
	border: 1px solid ${neutral['86']};
`;

export const sectionTitleCss = (
	isOpen: boolean,
	isNotFirstOption: boolean,
) => css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: ${neutral['7']};
	${textSans.medium()};
	margin: 0;
	padding: ${space[4]}px 14px ${space[4]}px ${space[3]}px;
	${minWidth.desktop} {
		padding: ${space[4]}px 31px ${space[4]}px ${space[3]}px;
	}
	position: relative;
	cursor: pointer;
	:after {
		content: '';
		display: block;
		width: 7px;
		height: 7px;
		border-top: 2px solid ${neutral['7']};
		border-right: 2px solid ${neutral['7']};
		position: absolute;
		top: 50%;
		transform: translateY(${isOpen ? '-10%' : '-50%'})
			${isOpen ? 'rotate(-45deg)' : 'rotate(135deg)'};
		transition: transform 0.4s;
		right: 0;
		${minWidth.desktop} {
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
      background-color: ${neutral['86']}
    }
  `}
`;

export const innerSectionDivCss = css`
	${textSans.medium()};
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
	border-top: 1px solid ${neutral[86]};
`;

export const h2Css = css`
	margin-top: 0;
	margin-bottom: ${space[6]}px;
	padding-top: 2px;
	border-top: 1px solid ${neutral['86']};
	${headline.small({ fontWeight: 'bold' })};
	${minWidth.desktop} {
		font-size: 32px;
	}
`;
