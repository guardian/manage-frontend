import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as Sentry from '@sentry/browser';
import 'ophan-tracker-js/build/ophan.manage-my-account';
import { createRoot } from 'react-dom/client';
import { HelpCentrePage } from './components/helpCentre/HelpCentrePage';

declare let WEBPACK_BUILD: string;

if (typeof window !== 'undefined' && window.guardian && window.guardian.dsn) {
	Sentry.init({
		dsn: window.guardian.dsn,
		release: WEBPACK_BUILD || 'local',
		environment: window.guardian.domain,
	});
}

const element = document.getElementById('app');
if (!(element instanceof HTMLElement)) throw Error('Invalid app element');
const root = createRoot(element);
root.render(HelpCentrePage);
