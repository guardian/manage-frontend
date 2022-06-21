// ----- Setup ----- //
const catalogue = {
	digitalSubPackshot: '71ff2a443acb92047e428782ed0239075fd2007a/0_0_497_285',
	googlePlay: '0a3eda7d719ad8ebe3a13a9bab8fd2b3348d1f20/0_0_554_160',
	appleAppStore: 'a0787d3b313f03ed87a16ced224ab4022f794bc5/0_0_554_160',
};

export const GRID_DOMAIN = 'https://media.guim.co.uk';
export const imageCatalogue: Record<string, string> = catalogue;

// ----- Types ----- //
import { $Keys } from 'utility-types';

export type ImageType = 'jpg' | 'png';
export type GridImage = {
	gridId: ImageId;
	srcSizes: number[];
	imgType: ImageType;
};
export type GridSlot = {
	sizes: string;
	media: string;
};
export type Source = GridImage & GridSlot;

// Utility type: https://flow.org/en/docs/types/utilities/#toc-keys
export type ImageId = $Keys<typeof imageCatalogue>;

// ----- Functions ----- //

// Builds a grid url from and id and an image size.
// Example: https://media.guim.co.uk/g65756g5/300.jpg
export function gridUrl(
	gridId: ImageId,
	size: number,
	imgType: ImageType = 'jpg',
): string {
	const path = `${imageCatalogue[gridId]}/${size}.${imgType}`;
	const url = new URL(path, GRID_DOMAIN);
	return url.toString();
}

// Returns a series of grid urls and their corresponding sizes.
// Example:
//   "https://media.guim.co.uk/g65756g5/300.jpg 300w,
//    https://media.guim.co.uk/g65756g5/500.jpg 500w,
//    https://media.guim.co.uk/g65756g5/700.jpg 700w"
export function gridSrcset(
	gridId: ImageId,
	sizes: number[],
	imgType?: ImageType,
): string {
	const sources = sizes.map(
		(size) => `${gridUrl(gridId, size, imgType)} ${size}w`,
	);
	return sources.join(', ');
}

// ----- Helper functions ----- //

// Ascending comparison function for use with Array.prototype.sort.
export function ascending(a: number, b: number): number {
	return a - b;
}
