import path from 'path';
import { css, Global } from '@emotion/react';
import type { Preview, StoryFn } from '@storybook/react';
import isChromatic from 'chromatic/isChromatic';
import MockDate from 'mockdate';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { fonts } from '../client/styles/fonts';
import { global } from '../client/styles/global';
import { FooterContextDecorator } from './FooterContextDecorator';
import { viewport } from './viewport';

// Initialize MSW
initialize({
	serviceWorker: {
		url: path.join(__dirname, './mockServiceWorker.js'),
	},
});

if (isChromatic()) {
	MockDate.set('17 Nov 2022');
}

export const decorators = [
	FooterContextDecorator,
	(Story: StoryFn) => (
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

const preview: Preview = {
	loaders: [mswLoader],
	parameters: parameters,
};

export default preview;
