import { css } from '@emotion/react';
import {
	breakpoints,
	from,
	palette,
	space,
} from '@guardian/source-foundations';
import type { SignInStatus } from '../../utilities/signInStatus';
import { TheGuardianLogo } from '../mma/shared/assets/TheGuardianLogo';
import { DropdownNav } from './nav/DropdownNav';

export interface HeaderProps {
	signInStatus: SignInStatus;
	isHelpCentrePage?: boolean;
}

export const Header = ({ signInStatus, isHelpCentrePage }: HeaderProps) => {
	const headerCss = css`
		background-color: ${palette.brand[400]};
		min-height: 50px;
		overflow: visible;
		position: relative;
		box-shadow: 0 2px 1px -1px ${palette.brand[600]};
		${from.desktop} {
			min-height: 82px;
		}
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
				{signInStatus === 'signedIn' && (
					<div css={divCss}>
						<DropdownNav
							isHelpCentrePage={isHelpCentrePage ?? false}
						/>
					</div>
				)}
				{signInStatus === 'signedOut' && (
					<a href={'/'} css={aCss}>
						Sign in
					</a>
				)}
				<TheGuardianLogo fill={palette.neutral['100']} />
			</div>
		</header>
	);
};
