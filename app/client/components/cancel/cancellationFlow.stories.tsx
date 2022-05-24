import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import CancellationFlow from './CancellationContainer';
import { PRODUCT_TYPES } from '../../../shared/productTypes';

import { guardianWeeklyCard } from '../../fixtures/productDetail';
import CancellationContainer from './CancellationContainer';
import CancellationReasonSelection from './CancellationReasonSelection';

export default {
	title: 'Pages/CancellationFlow',
	component: CancellationFlow,
	parameters: {
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof CancellationFlow>;

export const GuardianWeekly: ComponentStory<typeof CancellationFlow> = () => (
	<MemoryRouter
		initialEntries={[
			{
				state: { productDetail: guardianWeeklyCard },
			},
		]}
	>
		<Routes>
			<Route
				path="*"
				element={
					<CancellationContainer
						productType={PRODUCT_TYPES.guardianweekly}
					/>
				}
			>
				<Route index element={<CancellationReasonSelection />} />
			</Route>
		</Routes>
	</MemoryRouter>
);
