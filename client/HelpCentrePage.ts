import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as Sentry from '@sentry/browser';
import { createRoot } from 'react-dom/client';
import { HelpCentrePage } from './components/helpCentre/HelpCentrePage';
import { initOphan } from './utilities/initOphan';
import { registerBfCacheTracking } from './utilities/registerBfCacheTracking';

// Initialize ophan on client side only and register BFCache tracking
void initOphan();
registerBfCacheTracking();

declare let WEBPACK_BUILD: string;

if (typeof window !== 'undefined' && window.guardian && window.guardian.dsn) {
	Sentry.init({
		dsn: window.guardian.dsn,
		release: WEBPACK_BUILD || 'local',
		environment: window.guardian.domain,
	});

	Sentry.setTag('gu:referrer', document.referrer || 'none');
}

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(HelpCentrePage);
