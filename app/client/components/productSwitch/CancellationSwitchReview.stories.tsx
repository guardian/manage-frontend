import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import fetchMock from 'fetch-mock';

import { PRODUCT_TYPES } from '../../../shared/productTypes';

import { contribution } from '../../fixtures/productDetail';
import { availableProductMovesResponse } from '../../fixtures/productMovement';

import CancellationContainer from '../cancel/CancellationContainer';
import CancellationSwitchReview from './CancellationSwitchReview';

export default {
	title: 'Pages/Product Switch/Review',
	component: CancellationContainer,
	parameters: {
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof CancellationContainer>;

export const WithPaypal: ComponentStory<typeof CancellationContainer> = () => {
	fetchMock.restore().get('/api/me/mma?productType=Contribution', {
		body: [contribution],
	});

	return (
		<MemoryRouter
			initialEntries={[
				{
					state: {
						productDetail: contribution,
						chosenProductToSwitchTo:
							availableProductMovesResponse[0],
					},
				},
			]}
		>
			<Routes>
				<Route
					path="*"
					element={
						<CancellationContainer
							productType={PRODUCT_TYPES.contributions}
						/>
					}
				>
					<Route index element={<CancellationSwitchReview />} />
				</Route>
			</Routes>
		</MemoryRouter>
	);
};
