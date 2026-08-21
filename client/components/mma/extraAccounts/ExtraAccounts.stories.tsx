import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import {
	emptyMmaPrimaryResponse,
	extraAccountsMswHandlers,
	mixedMmaPrimaryResponse,
} from '../../../fixtures/extraAccounts';
import { useAccountStore } from '../../../stores/AccountStore';
import { useExtraAccountsStore } from '../../../stores/ExtraAccountsStore';
import { ExtraAccounts } from './ExtraAccounts';

const ClearStoresDecorator: Decorator = (Story) => {
	const cleared = useRef(false);
	if (!cleared.current) {
		useExtraAccountsStore.getState().clearStore();
		useAccountStore.getState().clearAccount();
		cleared.current = true;
	}
	return <Story />;
};

export default {
	title: 'Pages/ExtraAccounts',
	component: ExtraAccounts,
	decorators: [ReactRouterDecorator, ClearStoresDecorator],
	parameters: {
		layout: 'fullscreen',
		chromatic: {
			viewports: [320, 1300],
		},
		reactRouter: {
			location: '/extra-accounts',
		},
	},
} as Meta<typeof ExtraAccounts>;

const emptyParameters = {
	msw: extraAccountsMswHandlers(emptyMmaPrimaryResponse),
};

const mixedParameters = {
	msw: extraAccountsMswHandlers(mixedMmaPrimaryResponse),
};

export const Empty: StoryObj<typeof ExtraAccounts> = {
	render: () => <ExtraAccounts />,
	parameters: emptyParameters,
};

export const Mixed: StoryObj<typeof ExtraAccounts> = {
	render: () => <ExtraAccounts />,
	parameters: mixedParameters,
};
