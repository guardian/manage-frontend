import { ComponentStory, ComponentMeta } from '@storybook/react';
import fetchMock from 'fetch-mock';
import { RouterState } from '../../../.storybook/RouterState';

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

export const ContactCustomerService: ComponentStory<
	typeof CancellationContainer
> = () => (
	<RouterState
		initialState={{ productDetail: guardianWeeklyCard }}
		container={
			<CancellationContainer productType={PRODUCT_TYPES.guardianweekly} />
		}
	>
		<CancellationReasonSelection />
	</RouterState>
);

export const ReasonSelection: ComponentStory<
	typeof CancellationContainer
> = () => {
	fetchMock.restore().get('glob:/api/cancellation-date/*', {
		body: { cancellationEffectiveDate: '2022-09-01' },
	});

	return (
		<RouterState
			initialState={{ productDetail: contribution }}
			container={
				<CancellationContainer
					productType={PRODUCT_TYPES.contributions}
				/>
			}
		>
			<CancellationReasonSelection />
		</RouterState>
	);
};
