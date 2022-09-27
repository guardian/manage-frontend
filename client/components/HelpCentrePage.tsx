import { css, Global } from '@emotion/react';
import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { initFeatureSwitchUrlParamOverride } from '../../shared/featureSwitches';
import { setPageTitle } from '../services/pageTitle';
import {
	isSignedIn,
	pageRequiresSignIn,
	SignInStatus,
} from '../services/signInStatus';
import useAnalytics from '../services/useAnalytics';
import useConsent from '../services/useConsent';
import useScrollToTop from '../services/useScrollToTop';
import { fonts } from '../styles/fonts';
import global from '../styles/global';
import ErrorBoundary from './ErrorBoundary';
import { GenericErrorScreen } from './genericErrorScreen';
import { HelpCenterContentWrapper } from './HelpCenterContentWrapper';
import HelpCentreLoadingContent from './HelpCentreLoadingContent';
import { LiveChat } from './liveChat/liveChat';
import { Main } from './main';

initFeatureSwitchUrlParamOverride();

// The code below uses magic comments to instruct Webpack on
// how to name the chunks these dynamic imports produce
// More information: https://webpack.js.org/api/module-methods/#magic-comments

const HelpCentre = lazy(
	() =>
		import(/* webpackChunkName: "HelpCentre" */ './helpCentre/helpCentre'),
);

const HelpCentreArticle = lazy(
	() =>
		import(
			/* webpackChunkName: "HelpCentreArticle" */ './helpCentre/helpCentreArticle'
		),
);

const HelpCentreTopic = lazy(
	() =>
		import(
			/* webpackChunkName: "HelpCentreTopic" */ './helpCentre/helpCentreTopic'
		),
);

const ContactUs = lazy(
	() => import(/* webpackChunkName: "ContactUs" */ './contactUs/contactUs'),
);

const HelpCentreRouter = () => {
	const [signInStatus, setSignInStatus] = useState<SignInStatus>('init');

	useEffect(() => {
		setSignInStatus(isSignedIn() ? 'signedIn' : 'signedOut');
	}, []);

	useAnalytics();
	setPageTitle();
	useConsent();
	useScrollToTop();

	return (
		<Main
			signInStatus={signInStatus}
			requiresSignIn={pageRequiresSignIn()}
			helpCentrePage={true}
		>
			<Global styles={css(`${global}`)} />
			<Global styles={css(`${fonts}`)} />
			<HelpCenterContentWrapper>
				<Suspense fallback={<HelpCentreLoadingContent />}>
					<ErrorBoundary
						fallback={(error) => (
							<GenericErrorScreen loggingMessage={error} />
						)}
					>
						<Routes>
							<Route
								path="/help-centre"
								element={<HelpCentre />}
							/>
							<Route
								path="/help-centre/article/:articleCode"
								element={<HelpCentreArticle />}
							/>
							<Route
								path="/help-centre/topic/:topicCode"
								element={<HelpCentreTopic />}
							/>
							<Route
								path="/help-centre/contact-us"
								element={<ContactUs />}
							/>
							<Route
								path="/help-centre/contact-us/:urlTopicId"
								element={<ContactUs />}
							/>
							<Route
								path="/help-centre/contact-us/:urlTopicId/:urlSubTopicId"
								element={<ContactUs />}
							/>
							<Route
								path="/help-centre/contact-us/:urlTopicId/:urlSubTopicId/:urlSubSubTopicId"
								element={<ContactUs />}
							/>
							<Route
								path="/help-centre/contact-us/:urlTopicId/:urlSubTopicId/:urlSubSubTopicId/:urlSuccess"
								element={<ContactUs />}
							/>
							<Route
								path="/*"
								element={<Navigate to="/help-centre" />}
							/>
						</Routes>
					</ErrorBoundary>
				</Suspense>
			</HelpCenterContentWrapper>
			<LiveChat />
		</Main>
	);
};

export const HelpCentrePage = (
	<BrowserRouter>
		<HelpCentreRouter />
	</BrowserRouter>
);
