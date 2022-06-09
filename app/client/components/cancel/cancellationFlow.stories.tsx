import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { PRODUCT_TYPES } from '../../../shared/productTypes';

import { guardianWeeklyCard } from '../../fixtures/productDetail';
import CancellationContainer from './CancellationContainer';
import CancellationReasonSelection from './CancellationReasonSelection';

export default {
	title: 'Pages/CancellationFlow',
	component: CancellationContainer,
	parameters: {
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof CancellationContainer>;

export const GuardianWeekly: ComponentStory<
	typeof CancellationContainer
> = () => (
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
