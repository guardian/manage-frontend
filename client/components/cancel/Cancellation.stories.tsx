import { ComponentStory, ComponentMeta } from '@storybook/react';
import fetchMock from 'fetch-mock';
import { ReactNode } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { PRODUCT_TYPES } from '../../../shared/productTypes';

import { guardianWeeklyCard, contribution } from '../../fixtures/productDetail';
import CancellationContainer from './CancellationContainer';
import CancellationReasonSelection from './CancellationReasonSelection';

export default {
	title: 'Pages/Cancellation',
	component: CancellationContainer,
	parameters: {
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof CancellationContainer>;

interface RouterProviderProps {
	initialState: {};
	container: ReactNode;
	component: ReactNode;
}

const RouterProvider = (props: RouterProviderProps) => (
	<MemoryRouter initialEntries={[{ state: props.initialState }]}>
		<Routes>
			<Route path="*" element={props.container}>
				<Route index element={props.component} />
			</Route>
		</Routes>
	</MemoryRouter>
);

export const ContactCustomerService: ComponentStory<
	typeof CancellationContainer
> = () => (
	<RouterProvider
		initialState={{ productDetail: guardianWeeklyCard }}
		container={
			<CancellationContainer productType={PRODUCT_TYPES.guardianweekly} />
		}
		component={<CancellationReasonSelection />}
	/>
);

export const ReasonSelection: ComponentStory<
	typeof CancellationContainer
> = () => {
	fetchMock.restore().get('glob:/api/cancellation-date/*', {
		body: { cancellationEffectiveDate: '2022-09-01' },
	});

	return (
		<RouterProvider
			initialState={{ productDetail: contribution }}
			container={
				<CancellationContainer
					productType={PRODUCT_TYPES.contributions}
				/>
			}
			component={<CancellationReasonSelection />}
		/>
	);
};
