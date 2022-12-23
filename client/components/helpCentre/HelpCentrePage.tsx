import { css, Global } from '@emotion/react';
import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { initFeatureSwitchUrlParamOverride } from '../../../shared/featureSwitches';
import { fonts } from '../../styles/fonts';
import global from '../../styles/global';
import useAnalytics from '../../utilities/hooks/useAnalytics';
import useConsent from '../../utilities/hooks/useConsent';
import useScrollToTop from '../../utilities/hooks/useScrollToTop';
import { setPageTitle } from '../../utilities/pageTitle';
import type { SignInStatus } from '../../utilities/signInStatus';
import { isSignedIn, pageRequiresSignIn } from '../../utilities/signInStatus';
import ErrorBoundary from '../shared/ErrorBoundary';
import { GenericErrorScreen } from '../shared/GenericErrorScreen';
import { Main } from '../shared/Main';
import { HelpCenterContentWrapper } from './HelpCenterContentWrapper';
import HelpCentreLoadingContent from './HelpCentreLoadingContent';
import type { KnownIssueObj } from './KnownIssues';
import { LiveChat } from './liveChat/LiveChat';

initFeatureSwitchUrlParamOverride();

// The code below uses magic comments to instruct Webpack on
// how to name the chunks these dynamic imports produce
// More information: https://webpack.js.org/api/module-methods/#magic-comments

const HelpCentre = lazy(
	() => import(/* webpackChunkName: "HelpCentre" */ './HelpCentre'),
);

const HelpCentreArticle = lazy(
	() =>
		import(
			/* webpackChunkName: "HelpCentreArticle" */ './HelpCentreArticle'
		),
);

const HelpCentreTopic = lazy(
	() => import(/* webpackChunkName: "HelpCentreTopic" */ './HelpCentreTopic'),
);

const ContactUs = lazy(
	() => import(/* webpackChunkName: "ContactUs" */ './contactUs/ContactUs'),
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

	/*
	 * EXAMPLE ISSUE:
	 * leave as a blank array if there are no issues to render
	[
	  {
		"date": "29 Aug 1997 02:40",
		"message": "No papers today, it's judgment day"
	  }
	]
	*/

	const knownIssues: KnownIssueObj[] = [
		{
			date: '22 Dec 2022 10:00',
			message:
				"You may notice the content of todays' paper is slightly different than usual. This is due to operational challenges caused by the ransomware attack on the Guardian. Customer Service phonelines in the US & Australia are currently not available but live chat, email and UK phonelines remain unaffected",
			link: 'https://www.theguardian.com/media/2022/dec/21/guardian-hit-by-serious-it-incident-believed-to-be-ransomware-attack',
		},
		{
			date: '23 Dec 2022 10:00',
			message:
				'Our customer service contact centre, including live chat, will be closed on Christmas Day, Boxing Day and New Year’s Day. Please note the newspaper is not published on Christmas Day and there will be no Guardian Weekly dated 30th December.',
		},
	];

	return (
		<Main
			signInStatus={signInStatus}
			requiresSignIn={pageRequiresSignIn()}
			helpCentrePage={true}
		>
			<Global styles={css(`${global}`)} />
			<Global styles={css(`${fonts}`)} />
			<HelpCenterContentWrapper knownIssues={knownIssues}>
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
