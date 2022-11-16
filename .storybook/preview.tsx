import { css, Global } from '@emotion/react';
import { fonts } from '../client/styles/fonts';
import global from '../client/styles/global';
import { viewport } from './viewport';
import { initialize, mswDecorator } from 'msw-storybook-addon';

// Initialize MSW
initialize();

export const decorators = [
	mswDecorator,
	(Story) => (
		<>
			<Global styles={css(`${global}`)} />
			<Global styles={css(`${fonts}`)} />
			<Story />
		</>
	),
];

export const parameters = {
	viewport,
	actions: { argTypesRegex: '^on[A-Z].*' },
};
