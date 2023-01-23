import { palette, textSansSizes } from '@guardian/source-foundations';
import { serif } from '../../styles/fonts';
import type { SignInStatus } from '../../utilities/signInStatus';
import { HelpCentreHeader } from '../helpCentre/HelpCentreHeader';
import { Footer } from './footer/Footer';
import { Header } from './Header';

export interface MainProps {
	signInStatus?: SignInStatus;
	requiresSignIn?: boolean;
	helpCentrePage?: boolean;
	children: JSX.Element | JSX.Element[];
}

export const Main = ({
	signInStatus = 'init',
	requiresSignIn,
	helpCentrePage,
	children,
}: MainProps) => (
	<div
		css={{
			display: 'flex',
			flexDirection: 'column',
			height: '100vh',
			alignItems: 'stretch',
			width: '100%',
			color: palette.neutral[20],
		}}
	>
		<a
			css={{
				color: palette.brand[400],
				position: 'absolute',
				textAlign: 'center',
				fontSize: `${textSansSizes.xxsmall}px`,
				':focus': {
					position: 'static',
				},
			}}
			href="#maincontent"
		>
			Skip to main content
		</a>
		{helpCentrePage ? (
			<HelpCentreHeader
				signInStatus={signInStatus}
				requiresSignIn={requiresSignIn}
			/>
		) : (
			<Header
				signInStatus={signInStatus}
				requiresSignIn={requiresSignIn}
			/>
		)}
		<div
			css={{
				flexGrow: 1,
				flexShrink: 0,
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<main
				css={{
					fontFamily: serif,
					flexGrow: 1,
					flexShrink: 0,
				}}
			>
				{children}
			</main>
		</div>
		<Footer />
	</div>
);
