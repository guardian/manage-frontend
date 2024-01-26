import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as Sentry from '@sentry/browser';
import 'ophan-tracker-js/build/ophan.manage-my-account';
import { render } from 'react-dom';
import { MMAPage } from './components/mma/MMAPage';

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
render(MMAPage, element);
