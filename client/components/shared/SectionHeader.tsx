import { css } from '@emotion/react';
import {
	breakpoints,
	from,
	palette,
	space,
	textSans17,
	textSansBold17,
	titlepiece42,
} from '@guardian/source/foundations';
import Color from 'color';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { gridBase, gridItemPlacement } from '../../styles/grid';

interface SectionHeaderProps {
	title: ReactNode;
	pageHasNav?: boolean;
}

const chevronCss = css`
	width: 7px;
	height: 7px;
	border-top: 2px solid ${palette.neutral['7']};
	border-right: 2px solid ${palette.neutral['7']};
	position: absolute;
	top: 50%;
	transform: translateY(-50%) rotate(-135deg);
	left: ${space[1]}px;
`;

const headerCss = css`
	background-color: ${Color(palette.brand[800]).alpha(0.3).string()};
`;

const containerCss = css`
	${{ ...gridBase }};
	max-width: ${breakpoints.wide}px;
	margin: 0 auto;
	border-left: 1px solid ${palette.neutral[86]};
	border-right: 1px solid ${palette.neutral[86]};

	${from.desktop} {
		${{ ...(gridBase[from.desktop] as object) }};
	}
	${from.wide} {
		${{ ...(gridBase[from.wide] as object) }};
	}
`;

const divCss = css`
	margin-top: ${space[3]}px;
	${{ ...gridItemPlacement(1, 12) }}
`;

const linkCss = css`
	${textSans17};
	color: ${palette.neutral[0]};
	position: relative;
`;

const spanCss = css`
	${textSansBold17};
	color: ${palette.neutral[0]};
`;

export const SectionHeader = (props: SectionHeaderProps) => {
	const gridPlacementDesktop = props.pageHasNav
		? gridItemPlacement(5, 9)
		: gridItemPlacement(3, 10);

	const gridPlacementWide = props.pageHasNav
		? gridItemPlacement(5, 16)
		: gridItemPlacement(3, 14);

	const h1Css = (pageHasNav: boolean | undefined) => css`
		${titlepiece42};
		font-size: 2rem;
		${{ ...gridItemPlacement(1, 12) }};
		margin: ${space[9]}px 0 0 0;
		padding: ${space[3]}px 0;

		${from.tablet} {
			${{ ...gridItemPlacement(1, 12) }}
		}

		${from.desktop} {
			${{ ...gridPlacementDesktop }};
			font-size: 2.625rem;
			padding-left: ${space[5]}px;
			margin-top: ${space[24]}px;
			margin-left: -${space[5]}px;
			border-left: 1px solid ${palette.neutral[86]};
			border-top: 1px solid ${palette.neutral[86]};
		}
		${from.wide} {
			${{ ...gridPlacementWide }};
			margin-left: ${pageHasNav ? '0px' : `-${space[5]}px`};
		}
	`;

	const isLandingPage =
		window.location.pathname === '/help-centre' ||
		window.location.pathname === '/help-centre/';

	return (
		<header css={headerCss}>
			<div css={containerCss}>
				<div css={divCss}>
					<Link to="/help-centre" css={linkCss}>
						{isLandingPage ? (
							<span css={spanCss}>Help Centre</span>
						) : (
							<span css={{ marginLeft: '1rem' }}>
								<span css={chevronCss} />
								Back to Help Centre
							</span>
						)}
					</Link>
				</div>
				<h1 css={h1Css(props.pageHasNav)}>{props.title}</h1>
			</div>
		</header>
	);
};
