import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import {
	featureSwitches,
	initFeatureSwitchUrlParamOverride,
	rememberFeatureSwitchParam,
} from '@/shared/featureSwitches';
import { PersistFeatureSwitchQueryParam } from '../PersistFeatureSwitchQueryParam';

const LocationSearch = () => {
	const location = useLocation();
	return <div>{`${location.pathname}${location.search}`}</div>;
};

describe('PersistFeatureSwitchQueryParam', () => {
	const originalFlag = featureSwitches.exampleFeature;

	beforeEach(() => {
		sessionStorage.clear();
		featureSwitches.exampleFeature = false;
		window.history.replaceState({}, '', '/');
	});

	afterEach(() => {
		sessionStorage.clear();
		featureSwitches.exampleFeature = originalFlag;
	});

	it('turns the switch back on after a reload drops the query param', () => {
		rememberFeatureSwitchParam('exampleFeature');
		featureSwitches.exampleFeature = false;
		window.history.replaceState({}, '', '/billing');

		initFeatureSwitchUrlParamOverride();

		expect(featureSwitches.exampleFeature).toBe(true);
	});

	it('puts the remembered feature switch back on the URL', async () => {
		rememberFeatureSwitchParam('exampleFeature');
		featureSwitches.exampleFeature = false;

		render(
			<MemoryRouter initialEntries={['/billing']}>
				<PersistFeatureSwitchQueryParam />
				<Routes>
					<Route path="*" element={<LocationSearch />} />
				</Routes>
			</MemoryRouter>,
		);

		await waitFor(() => {
			expect(
				screen.getByText('/billing?withFeature=exampleFeature'),
			).toBeInTheDocument();
		});
		expect(featureSwitches.exampleFeature).toBe(true);
	});
});
