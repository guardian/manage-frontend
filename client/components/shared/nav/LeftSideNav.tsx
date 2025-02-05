import { css } from '@emotion/react';
import { from, palette, space, textSans20 } from '@guardian/source/foundations';
import { Link } from 'react-router-dom';
import type { MenuSpecificNavItem, NavItem } from './NavConfig';
import { NAV_LINKS, PROFILE_HOST_NAME } from './NavConfig';

const leftNavCss = css({
	width: '100%',
	margin: 0,
	padding: 0,
	borderBottom: 0,
	listStyleType: 'none',
	position: 'sticky',
	top: '1rem',
});

const leftNavLinkCss = (isSelected: boolean | undefined) =>
	css`
		${textSans20};
		font-weight: ${isSelected ? 'bold' : 'normal'};
		line-height: 1.25rem;
		letter-spacing: -0.02rem;
		text-align: left;
		text-decoration: none;
		white-space: nowrap;
		text-overflow: ellipsis;
		display: block;
		box-sizing: border-box;
		padding: 4px 0 0 5px;
		overflow: hidden;
		background: ${palette.neutral['100']};
		color: ${palette.brand[400]};
		${from.desktop} {
			border-left: ${space[2]}px solid
				${isSelected ? palette.brandAlt[400] : palette.neutral['46']};
			box-shadow: ${isSelected ? palette.brandAlt[400] : palette.neutral['46']};
			min-height: 0;
			padding: 18px 0 18px 22px;
			position: relative;
			:after {
				content: "";
				position: absolute;
				bottom: 0;
				right: 0;
				height: 1px;
				width: calc(100% - 22px);
				background-color: ${palette.neutral['86']};
			}
			:hover {
				background-color: isSelected
					? ${palette.neutral['100']}
					: ${palette.neutral['97']};
			}
		}
	`;

const leftNavItemCss = (isSelected: boolean | undefined) => ({
	margin: 0,
	background: isSelected ? palette.neutral['100'] : palette.neutral['86'],
	display: 'block',
	width: '100%',
	[from.tablet]: {
		minWidth: '155.5px', // gross hack to make IE11 work
	},
});

const leftNavIconCss = css({
	display: 'inline-block',
	verticalAlign: 'top',
	width: 'auto',
	height: '100%',
	maxWidth: `${space[5]}px`,
	maxHeight: `${space[5]}px`,
	marginRight: `${space[5]}px`,
});

export interface LeftSideNavProps {
	selectedNavItem?: NavItem;
}

export const LeftSideNav = (props: LeftSideNavProps) => (
	<ul css={leftNavCss}>
		{Object.values(NAV_LINKS)
			.filter((navItem) => !navItem.isDropDownExclusive)
			.map((navItem: MenuSpecificNavItem) => (
				<li
					css={leftNavItemCss(props.selectedNavItem === navItem)}
					key={navItem.title}
				>
					{navItem.local ? (
						<Link
							css={leftNavLinkCss(
								props.selectedNavItem === navItem,
							)}
							aria-current={
								props.selectedNavItem === navItem
									? 'page'
									: undefined
							}
							to={navItem.link}
						>
							{navItem.icon && (
								<i css={leftNavIconCss}>
									<navItem.icon />
								</i>
							)}
							{navItem.title}
						</Link>
					) : (
						<a
							css={leftNavLinkCss(
								props.selectedNavItem === navItem,
							)}
							href={`${PROFILE_HOST_NAME}${navItem.link}`}
						>
							{navItem.title}
						</a>
					)}
				</li>
			))}
	</ul>
);
