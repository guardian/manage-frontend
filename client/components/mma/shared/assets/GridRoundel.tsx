import { from } from '@guardian/source/foundations';
import { gridItemPlacement } from '../../../../styles/grid';
import type { RoundelProps } from './Roundel';
import { Roundel } from './Roundel';

export const GridRoundel = (props: RoundelProps) => (
	<div
		css={{
			...gridItemPlacement(-2, 1),
			display: 'inline-block',
			[from.tablet]: {
				margin: 'auto',
				maxHeight: '51px',
				...gridItemPlacement(-2, 1),
			},
			[from.wide]: {
				...gridItemPlacement(-2, 1),
			},
		}}
	>
		<Roundel {...props} />
	</div>
);
