import { css, Global } from '@emotion/react';
import { fonts } from '../client/styles/fonts';
import { global } from '../client/styles/global';
import { viewport } from './viewport';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import isChromatic from 'chromatic/isChromatic';
import MockDate from 'mockdate';
import { FooterContextDecorator } from './FooterContextDecorator';

// Initialize MSW
initialize();

if (isChromatic()) {
	MockDate.set('17 Nov 2022');
}

export const decorators = [
	mswDecorator,
	FooterContextDecorator,
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
