import { css } from '@emotion/react';
import {
	breakpoints,
	from,
	palette,
	space,
} from '@guardian/source-foundations';
import { Link } from 'react-router-dom';
import type { SignInStatus } from '../../utilities/signInStatus';
import { DropdownNav } from '.././nav/dropdownNav';
import { TheGuardianLogo } from '.././svgs/theGuardianLogo';

export interface HelpCentreHeaderProps {
	signInStatus: SignInStatus;
	requiresSignIn?: boolean;
}

const HelpCentreHeader = (props: HelpCentreHeaderProps) => {
	const headerCss = css`
		background-color: ${palette.brand[400]};
		min-height: 50px;
		overflow: visible;
		position: relative;
		box-shadow: 0 2px 1px -1px ${palette.brand[600]};
		z-index: 1070;
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

	const h1Css = css`
		font-size: 1.75rem;
		font-weight: bold;
		color: ${palette.neutral['100']};
		display: none;
		${from.desktop} {
			display: block;
		}
	`;

	const linkCss = css`
		text-decoration: none;
		color: ${palette.neutral['100']};
		&:visited {
			color: inherit;
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
						{props.requiresSignIn && (
							<h1 css={h1Css}>
								<Link to={'/'} css={linkCss}>
									My account
								</Link>
							</h1>
						)}
						<DropdownNav />
					</div>
				)}
				{props.signInStatus === 'signedOut' && (
					<a href={'/'} css={aCss}>
						Sign in
					</a>
				)}
				<TheGuardianLogo fill={palette.neutral['100']} />
			</div>
		</header>
	);
};

export default HelpCentreHeader;
