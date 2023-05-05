import { palette, textSansSizes } from '@guardian/source-foundations';
import { serif } from '../../styles/fonts';
import type { SignInStatus } from '../../utilities/signInStatus';
import { Footer } from './footer/Footer';
import { Header } from './Header';

export interface MainProps {
	signInStatus?: SignInStatus;
	children: JSX.Element | JSX.Element[];
	isHelpCentrePage?: boolean;
}

export const Main = ({
	signInStatus = 'init',
	children,
	isHelpCentrePage,
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
		<Header
			signInStatus={signInStatus}
			isHelpCentrePage={isHelpCentrePage}
		/>
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
