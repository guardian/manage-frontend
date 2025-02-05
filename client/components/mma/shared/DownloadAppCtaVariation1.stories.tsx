import type { Meta, StoryFn } from '@storybook/react';
import { DownloadAppCtaVariation1 } from './DownloadAppCtaVariation1';

export default {
	title: 'Components/DownloadAppCtaVariation1',
	component: DownloadAppCtaVariation1,
} as Meta<typeof DownloadAppCtaVariation1>;

export const Default: StoryFn<typeof DownloadAppCtaVariation1> = () => (
	<DownloadAppCtaVariation1 />
);
