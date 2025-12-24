import { css, Global } from '@emotion/react';
import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { fonts } from '@/client/styles/fonts';
import { initFeatureSwitchUrlParamOverride } from '../../../shared/featureSwitches';
import { global } from '../../styles/global';
import { useAnalytics } from '../../utilities/hooks/useAnalytics';
import { useConsent } from '../../utilities/hooks/useConsent';
import { useScrollToHashElement } from '../../utilities/hooks/useScrollToHashElement';
import { useScrollToTop } from '../../utilities/hooks/useScrollToTop';
import { setPageTitle } from '../../utilities/pageTitle';
import type { SignInStatus } from '../../utilities/signInStatus';
import { isSignedIn } from '../../utilities/signInStatus';
import { ErrorBoundary } from '../shared/ErrorBoundary';
import { GenericErrorScreen } from '../shared/GenericErrorScreen';
import { Main } from '../shared/Main';
import { HelpCenterContentWrapper } from './HelpCenterContentWrapper';
import { HelpCentreLoadingContent } from './HelpCentreLoadingContent';
import type { KnownIssueObj } from './KnownIssues';
import { LiveChat } from './liveChat/LiveChat';

initFeatureSwitchUrlParamOverride();

// The code below uses magic comments to instruct Webpack on
// how to name the chunks these dynamic imports produce
// More information: https://webpack.js.org/api/module-methods/#magic-comments

const HelpCentre = lazy(() =>
	import(/* webpackChunkName: "HelpCentre" */ './HelpCentre').then(
		({ HelpCentre }) => ({ default: HelpCentre }),
	),
);

const HelpCentreArticle = lazy(() =>
	import(
		/* webpackChunkName: "HelpCentreArticle" */ './HelpCentreArticle'
	).then(({ HelpCentreArticle }) => ({ default: HelpCentreArticle })),
);

const HelpCentreTopic = lazy(() =>
	import(/* webpackChunkName: "HelpCentreTopic" */ './HelpCentreTopic').then(
		({ HelpCentreTopic }) => ({ default: HelpCentreTopic }),
	),
);

const ContactUs = lazy(() =>
	import(/* webpackChunkName: "ContactUs" */ './contactUs/ContactUs').then(
		({ ContactUs }) => ({ default: ContactUs }),
	),
);
const DiagnosticInformation = lazy(() =>
	import(
		/* webpackChunkName: "DiagnosticInformation" */ './diagnosticInformation/DiagnosticInformation'
	).then(({ DiagnosticInformation }) => ({ default: DiagnosticInformation })),
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
	useScrollToHashElement();

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
			date: '24th Dec 2025 09:00 am',
			message:
				"Please note that our customer service contact centre will be closed on Christmas Day and New Year's Day. We will be open on Boxing Day for US customers only.",
		},
		{
			date: '15th Oct 2025 11:00 am',
			message:
				'Due to strike action by Canada Post, the delivery of copies of the Guardian Weekly to Canadian subscribers may be subject to delays. Subscribers are welcome to pause subscriptions during the period of industrial action.',
		},
	];

	return (
		<Main signInStatus={signInStatus} isHelpCentrePage>
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
								path="/help-centre/public-diagnostic-information"
								element={<DiagnosticInformation />}
							/>
							<Route
								path="/help-centre/diagnostic-information"
								element={<DiagnosticInformation />}
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
