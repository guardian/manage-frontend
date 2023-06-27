import { css } from '@emotion/react';
import {
	breakpoints,
	from,
	headline,
	palette,
	space,
	textSans,
} from '@guardian/source-foundations';
import type { ReactElement } from 'react';
import { useContext, useEffect } from 'react';
import { gridBase, gridColumns, gridItemPlacement } from '../../styles/grid';
import type { HasMinimalFooterInterface } from '../shared/Main';
import { HasMinimalFooterContext } from '../shared/Main';
import type { LeftSideNavProps } from '../shared/nav/LeftSideNav';
import { LeftSideNav } from '../shared/nav/LeftSideNav';
import type { NavItem } from '../shared/nav/NavConfig';

export interface PageContainerProps {
	children: React.ReactNode;
	selectedNavItem: NavItem;
	pageTitle: string | ReactElement;
	compactTitle?: boolean;
	minimalFooter?: boolean;
}

export const PageContainer = (props: PageContainerProps) => {
	const hasMinimalFooterContext = useContext(
		HasMinimalFooterContext,
	) as HasMinimalFooterInterface;

	useEffect(() => {
		hasMinimalFooterContext.setHasMinimalFooter(
			props.minimalFooter ?? false,
		);
	});

	return (
		<>
			<PageHeaderContainer
				selectedNavItem={props.selectedNavItem}
				title={props.pageTitle}
				compactTitle={props.compactTitle}
			/>
			<PageNavAndContentContainer selectedNavItem={props.selectedNavItem}>
				{props.children}
			</PageNavAndContentContainer>
		</>
	);
};

interface PageHeaderContainerProps extends LeftSideNavProps {
	title: string | ReactElement;
	compactTitle?: boolean;
}

const PageHeaderContainer = (props: PageHeaderContainerProps) => {
	const containerCss = css`
		margin-left: auto;
		margin-right: auto;
		background: ${palette.brand[300]};
		border-bottom: 1px solid ${palette.neutral['86']};

		${from.desktop} {
			padding-top: 100px;
		}
	`;

	const gridCss = css`
		display: grid;
		grid-template-columns: repeat(${gridColumns.default}, minmax(0, 1fr));
		grid-auto-columns: max-content;
		column-gap: ${space[5]}px;
		margin: auto;
		padding-left: ${space[3]}px;
		padding-right: ${space[3]}px;
		max-width: calc(${breakpoints.wide}px + 2.5rem);
		color: ${palette.neutral['100']};

		${from.tablet} {
			padding-left: ${space[5]}px;
			padding-right: ${space[5]}px;
			grid-template-columns: repeat(
				${gridColumns.tabletAndDesktop},
				minmax(0, 1fr)
			);
		}

		${from.wide} {
			grid-template-columns: repeat(${gridColumns.wide}, minmax(0, 1fr));
		} ;
	`;

	const titleCss = css`
		${headline.xsmall({ fontWeight: 'bold' })};
		font-size: 1.4375rem;
		grid-column: 1 / -1;
		margin-top: 28px;
		margin-bottom: ${space[2]}px;
		color: ${palette.neutral['100']};

		${props.compactTitle &&
		`
			${textSans.small({ fontWeight: 'bold' })};
			margin-top: ${space[1]}px;
			margin-bottom: ${space[1]}px;
		`}

		${from.mobileMedium} {
			${!props.compactTitle && `font-size: 1.5rem`};
		}

		${from.tablet} {
			${props.compactTitle &&
			`
				${headline.xsmall({ fontWeight: 'bold' })};
				margin-top: 28px;
				margin-bottom: ${space[2]}px;
			`}
		}

		${from.desktop} {
			${headline.large({ fontWeight: 'bold' })};
			grid-column: 5 / span 8;
			margin: 0;
			padding: ${space[1]}px ${space[2]}px;
			border: 1px solid ${palette.brand[600]};
			border-bottom: 0;
		}

		${from.wide} {
			grid-column: 6 / span 10;
		}
	`;

	return (
		<div css={containerCss}>
			<div css={gridCss}>
				<h1 css={titleCss}>{props.title}</h1>
			</div>
		</div>
	);
};

interface PageNavAndContentContainerProps extends LeftSideNavProps {
	children: React.ReactNode;
	withoutNav?: true;
}

const PageNavAndContentContainer = (props: PageNavAndContentContainerProps) => (
	<div
		css={{
			...gridBase,
			maxWidth: `calc(${breakpoints.wide}px + 2.5rem)`,
			margin: '0 auto',
			paddingBottom: `${space[12]}px`,
			[from.desktop]: {
				...(gridBase[from.desktop] as object),
				paddingBottom: `${space[24]}px`,
			},
		}}
	>
		{!props.withoutNav && (
			<nav
				css={{
					marginTop: `calc(-1 * (${space[5]}px + ${space[9]}px))`,
					display: 'none',

					[from.desktop]: {
						...gridItemPlacement(1, 4),
						display: 'block',
						paddingRight: '1.25rem',
					},

					[from.wide]: {
						paddingRight: '0',
					},
				}}
			>
				<LeftSideNav {...props} />
			</nav>
		)}
		<section
			id="maincontent"
			css={{
				...gridItemPlacement(1, 4),

				[from.tablet]: {
					...gridItemPlacement(1, 12),
				},

				[from.desktop]: {
					...gridItemPlacement(5, 8),
				},

				[from.wide]: {
					...gridItemPlacement(6, 10),
				},
			}}
		>
			{props.children}
		</section>
	</div>
);
