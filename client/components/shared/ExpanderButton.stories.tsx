import { css } from '@emotion/react';
import type { Meta, StoryFn } from '@storybook/react';
import { ExpanderButton } from './ExpanderButton';

export default {
	title: 'Components/ExpanderButton',
	component: ExpanderButton,
} as Meta<typeof ExpanderButton>;

export const Default: StoryFn<typeof ExpanderButton> = () => (
	<ExpanderButton buttonLabel="2 issues">
		<ul
			css={css`
				margin: 0;
				padding: 0;
				list-style: none;
			`}
		>
			<li>18 March 2022 (£-2.89)</li>
			<li>18 March 2022 (£-2.89)</li>
		</ul>
	</ExpanderButton>
);
