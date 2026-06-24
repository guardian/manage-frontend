import { css } from '@emotion/react';
import { palette, textEgyptian14Object } from '@guardian/source/foundations';
import type { Context, Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState } from 'react';
import type { SignInStatus } from '../../utilities/signInStatus';
import { Footer } from './footer/Footer';
import { MinimalFooter } from './footer/MinimalFooter';
import { Header } from './Header';

export interface MainProps {
	signInStatus?: SignInStatus;
	children: ReactNode;
	isHelpCentrePage?: boolean;
}

export interface HasMinimalFooterInterface {
	setHasMinimalFooter: Dispatch<SetStateAction<boolean>>;
}

export const HasMinimalFooterContext: Context<
	HasMinimalFooterInterface | object
> = createContext({});

export const Main = ({
	signInStatus = 'init',
	children,
	isHelpCentrePage,
}: MainProps) => {
	const [hasMinimalFooter, setHasMinimalFooter] = useState<boolean>(false);

	return (
		<HasMinimalFooterContext.Provider value={{ setHasMinimalFooter }}>
			<div
				css={css`
					display: flex;
					flex-direction: column;
					height: 100vh;
					align-items: stretch;
					width: 100%;
					color: ${palette.neutral[20]};
				`}
			>
				<a
					css={css`
						color: ${palette.brand[400]};
						position: absolute;
						textalign: center;
						fontsize: 12px;
						:focus {
							position: static;
						}
					`}
					href="#maincontent"
				>
					Skip to main content
				</a>
				<Header
					signInStatus={signInStatus}
					isHelpCentrePage={isHelpCentrePage}
				/>
				<div
					css={css`
						flex-grow: 1;
						flex-shrink: 0;
						display: flex;
						flex-direction: column;
					`}
				>
					<main
						css={css`
							font-family: ${textEgyptian14Object.fontFamily};
							flex-grow: 1;
							flex-shrink: 0;
						`}
					>
						{children}
					</main>
				</div>
				{hasMinimalFooter ? (
					<MinimalFooter />
				) : (
					<Footer hideSupport={!!isHelpCentrePage} />
				)}
			</div>
		</HasMinimalFooterContext.Provider>
	);
};
