import { css } from '@emotion/react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { WithStandardTopMargin } from './WithStandardTopMargin';

export default {
	title: 'Components/WithStandardTopMargin',
	component: WithStandardTopMargin,
} as ComponentMeta<typeof WithStandardTopMargin>;

export const Default: ComponentStory<typeof WithStandardTopMargin> = () => (
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