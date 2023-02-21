import { css } from '@emotion/react';
import {
	breakpoints,
	from,
	palette,
	space,
} from '@guardian/source-foundations';
import { darkModeCss } from '../../styles/darkMode';
import type { SignInStatus } from '../../utilities/signInStatus';
import { TheGuardianLogo } from '../mma/shared/assets/TheGuardianLogo';
import { DarkModeToggle } from './DarkModeToggle';
import { DropdownNav } from './nav/DropdownNav';

export interface HeaderProps {
	signInStatus: SignInStatus;
}

export const Header = (props: HeaderProps) => {
	const headerCss = css`
		background-color: ${palette.brand[400]};
		min-height: 50px;
		overflow: visible;
		position: relative;
		box-shadow: 0 2px 1px -1px ${palette.brand[600]};
		${from.desktop} {
			min-height: 82px;
		}

		${darkModeCss`
			background-color: ${palette.neutral[0]};
			box-shadow: 0 2px 1px -1px ${palette.neutral[60]};
		`}
	`;

	const containerCss = css`
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		max-width: calc(${breakpoints.wide}px + 2.5rem);
		margin: auto;
		padding: 0px ${space[3]}px;
		${from.tablet} {
			padding: 0px ${space[5]}px;
		}
	`;

	const divCss = css`
		margin: ${space[3]}px ${space[3]}px 0 0;
		align-self: flex-start;
	`;

	const aCss = css`
		text-decoration: none;
		color: ${palette.neutral['100']};
		white-space: nowrap;
		margin: auto 0;
	`;

	return (
		<header css={headerCss}>
			<div css={containerCss}>
				{props.signInStatus === 'signedIn' && (
					<div css={divCss}>
						<DropdownNav />
					</div>
				)}
				{props.signInStatus === 'signedOut' && (
					<>
						<a href={'/'} css={aCss}>
							Sign in
						</a>
						<DarkModeToggle />
					</>
				)}
				<TheGuardianLogo fill={palette.neutral['100']} />
			</div>
		</header>
	);
};
