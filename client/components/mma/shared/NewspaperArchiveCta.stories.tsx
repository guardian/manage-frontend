import type { Meta, StoryFn } from '@storybook/react';
import { NewspaperArchiveCta } from './NewspaperArchiveCta';

export default {
	title: 'Components/NewpaperArchiveCta',
	component: NewspaperArchiveCta,
} as Meta<typeof NewspaperArchiveCta>;

export const Default: StoryFn<typeof NewspaperArchiveCta> = () => (
	<NewspaperArchiveCta />
);
