import { SvgGift } from '@guardian/source/react-components';
import { Ribbon } from '../../shared/Ribbon';
import { Card } from '../shared/Card';
import type { ProductCardConfiguration } from './ProductCardConfiguration';
import {
	giftRibbonColour,
	giftRibbonCopyColour,
	giftRibbonCss,
	productCardTitleCss,
} from './ProductCardStyles';

export const ProductCardHeader = ({
	cardConfig,
	productTitle,
	isGifted,
}: {
	cardConfig: ProductCardConfiguration;
	productTitle: string;
	isGifted: boolean;
}) => (
	<Card.Header backgroundColor={cardConfig.colour} minHeightOverride="auto">
		<h3 css={productCardTitleCss(cardConfig.invertText)}>{productTitle}</h3>
		{isGifted && (
			<Ribbon
				copy="Gift"
				ribbonColour={giftRibbonColour(cardConfig)}
				copyColour={giftRibbonCopyColour(cardConfig)}
				icon={
					<SvgGift
						isAnnouncedByScreenReader
						size="small"
						theme={{ fill: giftRibbonCopyColour(cardConfig) }}
					/>
				}
				additionalCss={giftRibbonCss}
			/>
		)}
	</Card.Header>
);
