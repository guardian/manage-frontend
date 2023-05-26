import { css } from '@emotion/react';
import { brand, from, neutral, space } from '@guardian/source-foundations';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gridItemPlacement } from '../../../styles/grid';
import { ProfileIcon } from '../../mma/shared/assets/ProfileIcon';
import { expanderButtonCss } from '../ExpanderButton';
import type { MenuSpecificNavItem } from './NavConfig';
import { NAV_LINKS } from './NavConfig';

const dropdownNavCss = (showMenu: boolean) =>
	css({
		display: `${showMenu ? 'block' : 'none'}`,
		background: brand[400],
		borderTop: `1px solid ${brand[600]}`,
		position: 'absolute',
		top: '50px',
		left: 0,
		width: 'calc(100% - 30px)',
		maxWidth: '350px',
		zIndex: 1071,
		listStyle: 'none',
		lineHeight: '1.375rem',
		boxShadow: '0 0 0 0.0625rem rgba(0,0,0,0.1)',
		margin: 0,
		padding: 0,
		' li': {
			padding: 0,
			margin: 0,
		},
		[from.desktop]: {
			width: 'auto',
			minWidth: '220px',
			maxWidth: 'none',
			top: `${space[9]}px`,
			left: 'auto',
			marginRight: '-32px',
			bottom: 'auto',
			borderTop: 'none',
			background: neutral['100'],
			'li:not(:last-child)': {
				borderBottom: `1px solid ${neutral['86']}`,
			},
			':before': {
				content: "''",
				width: 0,
				height: 0,
				position: 'absolute',
				top: `-${space[2]}px`,
				right: '85px',
				borderLeft: `${space[2]}px solid transparent`,
				borderRight: `${space[2]}px solid transparent`,
				borderBottom: `${space[2]}px solid ${neutral['100']}`,
			},
		},
	});

const dropdownNavItemCss = css({
	padding: `9px 30px ${space[2]}px 46px`,
	textDecoration: 'none',
	color: neutral['100'],
	whiteSpace: 'nowrap',
	position: 'relative',
	marginTop: '-1px',
	display: 'flex',
	alignItems: 'center',
	':hover, :focus': {
		backgroundColor: brand[300],
		textDecoration: 'none',
	},
	':focus': {
		outline: 0,
	},
	':after': {
		content: "''",
		display: 'block',
		zIndex: 1,
		position: 'absolute',
		bottom: 0,
		right: 0,
		width: 'calc(100% - 46px)',
		height: '1px',
		backgroundColor: `${brand[600]}`,
	},
	[from.desktop]: {
		padding: '18px 14px',
		color: neutral['20'],
		'.icon--fill': {
			fill: neutral['20'],
		},
		':after': {
			content: 'none',
		},
		':hover, :focus': {
			backgroundColor: neutral['97'],
		},
	},
});

const DropdownNavItem = ({ navItem }: { navItem: MenuSpecificNavItem }) => (
	<>
		{navItem.icon && (
			<div
				css={{
					...(!navItem.isDropDownExclusive && {
						[from.desktop]: {
							display: 'none',
						},
					}),
					position: 'absolute',
					left: `${space[3]}px`,
				}}
			>
				<navItem.icon
					overrideFillColor={neutral[100]}
					overrideWidthAtDesktop={12}
				/>
			</div>
		)}
		<span
			css={{
				lineHeight: '33px',
				[from.desktop]: {
					lineHeight: 'normal',
					marginLeft:
						navItem.isDropDownExclusive && navItem.icon
							? `${space[5]}px`
							: 0,
				},
			}}
		>
			{navItem.title}
		</span>
	</>
);

export const DropdownNav = (props: { isHelpCentrePage: boolean }) => {
	const [showMenu, setShowMenu] = useState(false);
	const wrapperRef = useRef<HTMLElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		addListeners();
		return () => {
			removeListeners();
		};
	});

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.code === 'Escape' && showMenu) {
			setShowMenu(false);
			if (buttonRef.current) {
				buttonRef.current.focus();
			}
		}
	};

	const handleDismissiveClick = (event: MouseEvent): void => {
		if (
			wrapperRef.current &&
			event.target &&
			!wrapperRef.current.contains(event.target as Node)
		) {
			setShowMenu(false);
		}
	};

	const addListeners = () => {
		document.addEventListener('keydown', handleKeyDown, false);
		document.addEventListener('click', handleDismissiveClick, false);
	};

	const removeListeners = () => {
		document.removeEventListener('keydown', handleKeyDown, false);
		document.removeEventListener('click', handleDismissiveClick, false);
	};

	return (
		<nav
			ref={wrapperRef}
			css={{
				...gridItemPlacement(1, 2),
				whiteSpace: 'nowrap',
				maxHeight: '26px',
				margin: 'auto 0',
				[from.desktop]: {
					position: 'relative',
					left: '0.5rem',
					marginLeft: 'auto',
				},
				' button': {
					[from.tablet]: {
						marginLeft: 'auto',
					},
					paddingTop: 0,
					paddingBottom: 0,
				},
			}}
		>
			{/* TODO refactor to full use ExpanderButton */}
			<button
				css={{
					...expanderButtonCss(
						neutral['100'],
						neutral['100'],
					)(showMenu),
				}}
				type="button"
				aria-expanded={showMenu}
				onClick={() => setShowMenu(!showMenu)}
				ref={buttonRef}
			>
				{
					<i
						css={css`
							display: inline-block;
							width: 26px;
							height: 26px;
							margin-right: 0.5rem;
							border-radius: 50%;
							background-color: white;
							position: relative;
						`}
					>
						<ProfileIcon
							additionalCss={css`
								position: absolute;
								bottom: 0;
								left: 50%;
								transform: translateX(-50%);
								width: 65%;
								height: auto;
							`}
						/>
					</i>
				}
				My account
			</button>

			<ul css={dropdownNavCss(showMenu)}>
				{Object.values(NAV_LINKS).map(
					(navItem: MenuSpecificNavItem) => (
						<li key={navItem.title}>
							{navItem.local && !props.isHelpCentrePage ? (
								<Link
									to={navItem.link}
									css={dropdownNavItemCss}
									onClick={() => setShowMenu(false)}
								>
									<DropdownNavItem navItem={navItem} />
								</Link>
							) : (
								<a href={navItem.link} css={dropdownNavItemCss}>
									<DropdownNavItem navItem={navItem} />
								</a>
							)}
						</li>
					),
				)}
			</ul>
		</nav>
	);
};
