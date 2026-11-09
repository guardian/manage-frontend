import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	FEATURE_SWITCH_QUERY_PARAM,
	rememberFeatureSwitchParam,
	storedFeatureSwitchParam,
} from '@/shared/featureSwitches';

// Keeps ?withFeature= on the URL after client-side navigations drop it.
export const PersistFeatureSwitchQueryParam = () => {
	const location = useLocation();
	const navigate = useNavigate();

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

		params.set(FEATURE_SWITCH_QUERY_PARAM, stored);
		navigate(
			{
				pathname: location.pathname,
				search: params.toString(),
				hash: location.hash,
			},
			{ replace: true, state: location.state },
		);
	}, [location, navigate]);

	return null;
};
