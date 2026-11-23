import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import {
	featureSwitches,
	initFeatureSwitchUrlParamOverride,
	rememberFeatureSwitchParam,
} from '@/shared/featureSwitches';
import { PersistFeatureSwitchQueryParam } from '../PersistFeatureSwitchQueryParam';

const LocationSearch = ({ expectedState }: { expectedState?: object }) => {
	const location = useLocation();
	return (
		<>
			<div>{`${location.pathname}${location.search}`}</div>
			<div>
				{location.state === expectedState
					? 'same-state'
					: 'copied-state'}
			</div>
		</>
	);
};

describe('PersistFeatureSwitchQueryParam', () => {
	const originalExampleFeature = featureSwitches.exampleFeature;
	const originalMaintenanceMode = featureSwitches.maintenanceMode;

	beforeEach(() => {
		sessionStorage.clear();
		featureSwitches.exampleFeature = false;
		featureSwitches.maintenanceMode = false;
		window.history.replaceState({}, '', '/');
	});

	afterEach(() => {
		sessionStorage.clear();
		featureSwitches.exampleFeature = originalExampleFeature;
		featureSwitches.maintenanceMode = originalMaintenanceMode;
		window.history.replaceState({}, '', '/');
	});

	it('turns the switch back on after a reload drops the query param', () => {
		rememberFeatureSwitchParam('exampleFeature');
		featureSwitches.exampleFeature = false;
		window.history.replaceState({}, '', '/billing');

		initFeatureSwitchUrlParamOverride();

		expect(featureSwitches.exampleFeature).toBe(true);
	});

	it('clears the previous override when the param changes', () => {
		rememberFeatureSwitchParam('maintenanceMode');
		expect(featureSwitches.maintenanceMode).toBe(true);
		expect(featureSwitches.appSubscriptions).toBe(true);

		rememberFeatureSwitchParam('exampleFeature');

		expect(featureSwitches.exampleFeature).toBe(true);
		expect(featureSwitches.maintenanceMode).toBe(false);
		expect(featureSwitches.appSubscriptions).toBe(true);
	});

	it('puts the remembered feature switch back on the browser URL without navigating', async () => {
		rememberFeatureSwitchParam('exampleFeature');
		featureSwitches.exampleFeature = false;
		const routeState = { paymentMethodInfo: { id: 'pm_123' } };

		render(
			<MemoryRouter
				initialEntries={[
					{
						pathname: '/payment',
						search: '?id=cs_123',
						state: routeState,
					},
				]}
			>
				<PersistFeatureSwitchQueryParam />
				<Routes>
					<Route
						path="*"
						element={<LocationSearch expectedState={routeState} />}
					/>
				</Routes>
			</MemoryRouter>,
		);

		await waitFor(() => {
			expect(window.location.pathname + window.location.search).toBe(
				'/payment?id=cs_123&withFeature=exampleFeature',
			);
		});
		expect(screen.getByText('/payment?id=cs_123')).toBeInTheDocument();
		expect(screen.getByText('same-state')).toBeInTheDocument();
		expect(featureSwitches.exampleFeature).toBe(true);
	});
});
