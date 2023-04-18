import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import { PRODUCT_TYPES } from '../../../../shared/productTypes';
import { membership } from '../../../fixtures/productDetail';
import { CancellationContainer } from '../cancel/CancellationContainer';
import { MembershipCancellationLanding } from './MembershipCancellationLanding';

export default {
	title: 'Pages/CancellationSave',
	component: CancellationContainer,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
		reactRouter: {
			state: { productDetail: membership },
			container: (
				<CancellationContainer productType={PRODUCT_TYPES.membership} />
			),
		},
	},
} as ComponentMeta<typeof CancellationContainer>;

export const Default: ComponentStory<
	typeof MembershipCancellationLanding
> = () => {
	return <MembershipCancellationLanding />;
};
