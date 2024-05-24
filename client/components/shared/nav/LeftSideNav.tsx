import { css } from '@emotion/react';
import {
	brand,
	brandAlt,
	from,
	neutral,
	space,
} from '@guardian/source/foundations';
import { Link } from 'react-router-dom';
import { sans } from '../../../styles/fonts';
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
	css({
		fontSize: '1.25rem',
		fontWeight: isSelected ? 'bold' : 'normal',
		lineHeight: '1.25rem',
		fontFamily: sans,
		display: 'block',
		boxSizing: 'border-box',
		padding: '4px 0 0 5px',
		letterSpacing: '-0.02rem',
		textAlign: 'left',
		textDecoration: 'none',
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		background: neutral['100'],
		color: brand[400],

		[from.desktop]: {
			borderLeft: `${space[2]}px solid ${
				isSelected ? brandAlt[400] : neutral['46']
			}`,
			boxShadow: isSelected ? '0 1px 0 white' : undefined,
			minHeight: 0,
			padding: '18px 0 18px 22px',
			position: 'relative',
			' :after': {
				content: "''",
				position: 'absolute',
				bottom: 0,
				right: 0,
				height: '1px',
				width: 'calc(100% - 22px)',
				backgroundColor: neutral['86'],
			},

			':hover': {
				backgroundColor: isSelected ? neutral['100'] : neutral['97'],
			},
		},
	});

const leftNavItemCss = (isSelected: boolean | undefined) => ({
	margin: 0,
	background: isSelected ? neutral['100'] : neutral['86'],
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
