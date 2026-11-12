import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
	FEATURE_SWITCH_QUERY_PARAM,
	rememberFeatureSwitchParam,
	storedFeatureSwitchParam,
} from '@/shared/featureSwitches';

// Keeps ?withFeature= on the browser URL after client-side navigations drop
// it. replaceState avoids a second React Router navigation, which would copy
// route state and can repeat work that depends on that state.
export const PersistFeatureSwitchQueryParam = () => {
	const location = useLocation();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const fromUrl = params.get(FEATURE_SWITCH_QUERY_PARAM);
		if (fromUrl) {
			rememberFeatureSwitchParam(fromUrl);
			return;
		}

		const stored = storedFeatureSwitchParam();
		if (!stored) {
			return;
		}

		rememberFeatureSwitchParam(stored);
		params.set(FEATURE_SWITCH_QUERY_PARAM, stored);
		const hash = location.hash;
		window.history.replaceState(
			window.history.state,
			'',
			`${location.pathname}?${params.toString()}${hash}`,
		);
	}, [location]);

	return null;
};
