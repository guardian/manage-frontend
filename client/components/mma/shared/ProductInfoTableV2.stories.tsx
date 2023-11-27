import type { Meta, StoryFn } from '@storybook/react';
import { ProductInfoTableV2 } from '@/client/components/mma/shared/ProductInfoTableV2';

export default {
	title: 'Components/ProductInfoTableV2',
	component: ProductInfoTableV2,
} as Meta<typeof ProductInfoTableV2>;

export const Default: StoryFn<typeof ProductInfoTableV2> = () => (
	<ProductInfoTableV2 />
);
