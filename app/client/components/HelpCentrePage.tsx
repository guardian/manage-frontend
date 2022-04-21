import { css, Global } from '@emotion/core';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react';
import { fonts } from '../styles/fonts';
import global from '../styles/global';
import { CMPBanner } from './consent/CMPBanner';
import { HelpCenterContentWrapper } from './HelpCenterContentWrapper';
import { SeoData } from './helpCentre/seoData';
import HelpCentreLoadingContent from './HelpCentreLoadingContent';
import { LiveChat } from './liveChat/liveChat';
import { Main } from './main';
import { ScrollToTop } from './scrollToTop';
import {
	isSignedIn,
	pageRequiresSignIn,
	SignInStatus,
} from '../services/signInStatus';
import useAnalytics from '../services/useAnalytics';
import { setPageTitle } from '../services/pageTitle';

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
					<Routes>
						<Route path="/help-centre" element={<HelpCentre />} />
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
				</Suspense>
			</HelpCenterContentWrapper>
			<LiveChat />
		</Main>
	);
};

export const HelpCentrePage = (
	<BrowserRouter>
		<HelpCentreRouter />
		<CMPBanner />
		<ScrollToTop />
	</BrowserRouter>
);
