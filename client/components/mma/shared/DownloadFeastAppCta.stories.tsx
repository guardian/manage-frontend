import type { Meta, StoryFn } from '@storybook/react';
import { DownloadFeastAppCta } from './DownloadFeastAppCta';

export default {
	title: 'Components/DownloadFeastAppCta',
	component: DownloadFeastAppCta,
} as Meta<typeof DownloadFeastAppCta>;

export const Default: StoryFn<typeof DownloadFeastAppCta> = () => (
	<DownloadFeastAppCta />
);
