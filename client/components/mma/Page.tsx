import { css } from '@emotion/react';
import {
	brand,
	breakpoints,
	from,
	headline,
	neutral,
	space,
	textSans,
} from '@guardian/source-foundations';
import type { ReactElement } from 'react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { gridBase, gridColumns, gridItemPlacement } from '../../styles/grid';
import type { LeftSideNavProps } from '../shared/nav/LeftSideNav';
import { LeftSideNav } from '../shared/nav/LeftSideNav';
import type { NavItem } from '../shared/nav/NavConfig';

export interface PageContainerProps {
	children: React.ReactNode;
	selectedNavItem: NavItem;
	pageTitle: string | ReactElement;
	breadcrumbs?: Breadcrumbs[] | undefined;
}
export const PageContainer = (props: PageContainerProps) => (
	<>
		<PageHeaderContainer
			selectedNavItem={props.selectedNavItem}
			title={props.pageTitle}
			breadcrumbs={props.breadcrumbs}
		/>
		<PageNavAndContentContainer selectedNavItem={props.selectedNavItem}>
			{props.children}
		</PageNavAndContentContainer>
	</>
);

interface PageHeaderContainerProps extends LeftSideNavProps {
	breadcrumbs?: Breadcrumbs[];
	title: string | ReactElement;
}

const PageHeaderContainer = (props: PageHeaderContainerProps) => {
	const gridBasev2 = () => {
		return `
      display: grid;
      display: -ms-grid;
      -ms-grid-columns: (minmax(0, 1fr))[${gridColumns.default}];
      grid-template-columns: repeat(${gridColumns.default}, minmax(0, 1fr));
      grid-auto-columns: max-content;
      column-gap: ${space[5]}px;
      ${from.tablet} {
        padding-left: ${space[5]}px;
        padding-right: ${space[5]}px;
        -ms-grid-columns: (minmax(0, 1fr))[${gridColumns.tabletAndDesktop}];
        grid-template-columns: repeat(${gridColumns.tabletAndDesktop}, minmax(0, 1fr));
      };
      ${from.wide} {
        -ms-grid-columns: (minmax(0, 1fr))[${gridColumns.wide}];
        grid-template-columns: repeat(${gridColumns.wide}, minmax(0, 1fr));
      };
    `;
	};
	const gridItemPlacementv2 = (
		targetRow: number = 1,
		rowSpan: number = 1,
		startingPos: number,
		span: number,
		columnsBreakpoint: number = gridColumns.default,
	) => {
		return `
      grid-column-start: ${startingPos};
      grid-column-end: span ${span};
      grid-row-start: ${targetRow};
      grid-row-end: span ${rowSpan};
      ${startingPos > 0 ? `-ms-grid-column: ${startingPos};` : ''}
      ${
			startingPos < 0
				? `-ms-grid-column: ${columnsBreakpoint + 2 + startingPos};`
				: ''
		}
      -ms-grid-column-span: ${span};
      -ms-grid-row: ${targetRow};
    `;
	};
	return (
		<div
			css={css`
				border-bottom: 1px solid ${neutral['86']};
				margin-left: auto;
				margin-right: auto;
				background: #0a1f47;
				${from.tablet} {
					${!props.breadcrumbs && `padding-top: 100px;`}
				}
				${from.desktop} {
					position: relative;
				}
			`}
		>
			<div
				css={css`
					padding-left: ${space[3]}px;
					padding-right: ${space[3]}px;
					max-width: calc(${breakpoints.wide}px + 2.5rem);
					margin: auto;
					color: ${neutral['100']};
					${gridBasev2()}
				`}
			>
				{props.breadcrumbs && (
					<div
						css={css`
							display: none;
							${gridItemPlacementv2(1, 1, 1, 3)};
							${from.tablet} {
								display: block;
								padding: ${space[2]}px 0 0;
								min-height: 100px;
								${gridItemPlacementv2(1, 1, 1, 10)};
							}
							${from.desktop} {
								${gridItemPlacementv2(1, 1, 5, 8)};
							}
							${from.wide} {
								${gridItemPlacementv2(1, 1, 6, 10)};
							}
						`}
					>
						{props.breadcrumbs.map((breadcrumbItem, index) => (
							<React.Fragment key={`breadcrumb-${index}`}>
								{breadcrumbItem.link ? (
									<Link
										to={breadcrumbItem.link}
										css={css`
											${textSans.medium()};
											color: ${neutral[100]};
										`}
									>
										{breadcrumbItem.title}
									</Link>
								) : (
									<span
										css={css`
											${textSans.medium({
												fontWeight:
													breadcrumbItem.currentPage
														? 'bold'
														: 'regular',
											})};
											color: ${neutral[100]};
										`}
									>
										{breadcrumbItem.title}
									</span>
								)}
								{props.breadcrumbs?.length &&
									index < props.breadcrumbs?.length - 1 && (
										<span>{' / '}</span>
									)}
							</React.Fragment>
						))}
					</div>
				)}
				<h1
					css={css`
						max-width: calc(${breakpoints.wide}px + 2.5rem);
						margin: 32px 0 0 0;
						color: ${neutral['100']};
						${headline.medium({ fontWeight: 'bold' })};
						font-size: 1.5rem;
						padding: 8px;
						border: 1px solid ${brand[600]};
						border-bottom: 0;
						${from.tablet} {
							line-height: 57px;
							margin-top: 0;
							padding: 0 8px;
						}

						${props.breadcrumbs
							? `
                ${gridItemPlacementv2(2, 1, 1, 4)};
                ${from.mobileMedium} {
                  ${gridItemPlacementv2(2, 1, 1, 3)};
                };
                ${from.tablet} {
                  ${gridItemPlacementv2(2, 1, 1, 10)};
                };
                ${from.desktop} {
                  ${gridItemPlacementv2(2, 1, 5, 8)};
                  font-size: 2.625rem;
                };
                ${from.wide} {
                  ${gridItemPlacementv2(2, 1, 6, 10)};
                };
              `
							: `
                ${gridItemPlacementv2(1, 1, 1, 4)};
                ${from.mobileMedium} {
                  ${gridItemPlacementv2(1, 1, 1, 3)};
                };
                ${from.tablet} {
                  ${gridItemPlacementv2(1, 1, 1, 10)};
                };
                ${from.desktop} {
                  ${gridItemPlacementv2(1, 1, 5, 8)};
                  font-size: 2.625rem;
                };
                ${from.wide} {
                  ${gridItemPlacementv2(1, 1, 6, 10)};
                };
              `}
					`}
				>
					{props.title || <>&nbsp;</>}
				</h1>
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

interface Breadcrumbs {
	title: string;
	link?: string;
	currentPage?: boolean;
}