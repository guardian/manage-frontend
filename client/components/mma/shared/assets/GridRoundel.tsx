import { from } from '@guardian/source-foundations';
import { gridColumns, gridItemPlacement } from '../../../../styles/grid';
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
				...gridItemPlacement(-2, 1, gridColumns.tabletAndDesktop),
			},
			[from.wide]: {
				...gridItemPlacement(-2, 1, gridColumns.wide),
			},
		}}
	>
		<Roundel {...props} />
	</div>
);
