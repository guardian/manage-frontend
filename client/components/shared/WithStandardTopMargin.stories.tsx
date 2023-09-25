import { css } from '@emotion/react';
import type { Meta, StoryFn } from '@storybook/react';
import { WithStandardTopMargin } from './WithStandardTopMargin';

export default {
	title: 'Components/WithStandardTopMargin',
	component: WithStandardTopMargin,
} as Meta<typeof WithStandardTopMargin>;

export const Default: StoryFn<typeof WithStandardTopMargin> = () => (
	<div
		css={css`
			outline: 1px dotted red;
		`}
	>
		<WithStandardTopMargin>
			<div
				css={css`
					outline: 1px dotted green;
				`}
			>
				Content with standard top margin
			</div>
		</WithStandardTopMargin>
		<WithStandardTopMargin>
			<div
				css={css`
					outline: 1px dotted green;
				`}
			>
				More content with standard top margin
			</div>
		</WithStandardTopMargin>
	</div>
);
