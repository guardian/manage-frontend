import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as Sentry from '@sentry/browser';
import '@guardian/ophan-tracker-js/MMA';
import { render } from 'react-dom';
import 'ophan-tracker-js/build/ophan.manage-my-account';
import { createRoot } from 'react-dom/client';
import { MMAPage } from './components/mma/MMAPage';

declare let WEBPACK_BUILD: string;

if (typeof window !== 'undefined' && window.guardian && window.guardian.dsn) {
	Sentry.init({
		dsn: window.guardian.dsn,
		release: WEBPACK_BUILD || 'local',
		environment: window.guardian.domain,
	});
}

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(MMAPage);
