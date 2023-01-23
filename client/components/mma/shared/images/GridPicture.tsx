// ----- NOTE ----- //
// This code is designed to work with multiple image sources and crops (different pictures)
// If you want to work with a single image at different crops, maybe consider gridImage instead
// ----- Imports ----- //
import type { SerializedStyles } from '@emotion/react';
import type { ImageType, Source } from './theGrid';
import { gridSrcset, gridUrl } from './theGrid';

export type PropTypes = {
	sources: Source[];
	fallback: string;
	fallbackSize: number;
	altText: string;
	fallbackImgType: ImageType;
	cssOverrides?: SerializedStyles | SerializedStyles[];
}; // ----- Component ----- //

export function GridPicture(props: PropTypes) {
	const sources = props.sources.map((source) => {
		const srcSet = gridSrcset(
			source.gridId,
			source.srcSizes,
			source.imgType,
		);
		return (
			<source
				key={source.gridId}
				sizes={source.sizes}
				media={source.media}
				srcSet={srcSet}
			/>
		);
	});
	return (
		<picture className="component-grid-picture">
			{sources}
			<img
				css={props.cssOverrides}
				className="component-grid-picture__image"
				src={gridUrl(
					props.fallback,
					props.fallbackSize,
					props.fallbackImgType,
				)}
				alt={props.altText}
			/>
		</picture>
	);
} // ----- Default Props ----- //

GridPicture.defaultProps = {
	altText: '',
	fallbackImgType: 'jpg',
};
