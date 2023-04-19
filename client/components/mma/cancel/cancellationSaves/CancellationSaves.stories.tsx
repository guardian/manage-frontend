import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ReactRouterDecorator } from '../../../../../.storybook/ReactRouterDecorator';
import { PRODUCT_TYPES } from '../../../../../shared/productTypes';
import { membership } from '../../../../fixtures/productDetail';
import { CancellationContainer } from '../CancellationContainer';
import { MembershipSwitch } from './MembershipSwitch';
import { SwitchingOptions } from './SwitchingOptions';
import { ValueOfSupport } from './ValueOfSupport';

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

export const ValueOfSupportPage: ComponentStory<typeof ValueOfSupport> = () => {
	return <ValueOfSupport />;
};

export const Switch: ComponentStory<typeof MembershipSwitch> = () => {
	return <MembershipSwitch />;
};

export const SwitchOptions: ComponentStory<typeof SwitchingOptions> = () => {
	return <SwitchingOptions />;
};
