import type { Meta, StoryFn } from '@storybook/react';
import { DownloadFeastAppCtaWithImage } from './DownloadFeastAppCtaWithImage';

export default {
	title: 'Components/DownloadFeastAppCtaWithImage',
	component: DownloadFeastAppCtaWithImage,
} as Meta<typeof DownloadFeastAppCtaWithImage>;

export const Default: StoryFn<typeof DownloadFeastAppCtaWithImage> = () => (
	<DownloadFeastAppCtaWithImage />
);
