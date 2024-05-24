import { from, space } from '@guardian/source/foundations';

export const gridColumns = {
	default: 4,
	tabletAndDesktop: 12,
	wide: 16,
};

export const gridBase = {
	display: 'grid',
	paddingLeft: `${space[3]}px`,
	paddingRight: `${space[3]}px`,
	gridTemplateColumns: `repeat(${gridColumns.default}, minmax(0, 1fr))`,

	gridAutoColumns: 'max-content',
	columnGap: `${space[5]}px`,
	[from.tablet]: {
		paddingLeft: `${space[5]}px`,
		paddingRight: `${space[5]}px`,
		gridTemplateColumns: `repeat(${gridColumns.tabletAndDesktop}, minmax(0, 1fr))`,
	},
	[from.wide]: {
		gridTemplateColumns: `repeat(${gridColumns.wide}, minmax(0, 1fr))`,
	},
};

export const gridItemPlacement = (
	startingPos: number,
	span: number,
): object => {
	return {
		gridColumnStart: `${startingPos}`,
		gridColumnEnd: `span ${span}`,
	};
};
