import React from 'react';
import palette from '../colours';
import { serif } from '../styles/fonts';
import { Footer } from './footer/footer';
import Header from './header';
import { SignInStatus } from '../services/signInStatus';
import HelpCentreHeader from './helpCentre/helpCentreHeader';

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
			color: palette.neutral['2'],
		}}
	>
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
