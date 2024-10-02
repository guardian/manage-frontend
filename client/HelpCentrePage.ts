import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as Sentry from '@sentry/browser';
import '@guardian/ophan-tracker-js/MMA';
import { render } from 'react-dom';
import { HelpCentrePage } from './components/helpCentre/HelpCentrePage';

declare let WEBPACK_BUILD: string;

if (typeof window !== 'undefined' && window.guardian && window.guardian.dsn) {
	Sentry.init({
		dsn: window.guardian.dsn,
		release: WEBPACK_BUILD || 'local',
		environment: window.guardian.domain,
	});

	Sentry.setTag('gu:referrer', document.referrer || 'none');
}

const element = document.getElementById('app');
render(HelpCentrePage, element);
