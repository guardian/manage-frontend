import { css } from '@emotion/react';
import { LinkButton, Stack } from '@guardian/source-react-components';
import { InfoSummary } from '@guardian/source-react-components-development-kitchen';
import { parseDate } from '../../../../shared/dates';
import type { CancelledProductDetail } from '../../../../shared/productResponse';
import { GROUPED_PRODUCT_TYPES } from '../../../../shared/productTypes';
import { wideButtonLayoutCss } from '../../../styles/ButtonStyles';
import { trackEvent } from '../../../utilities/analytics';
import { Card } from '../shared/Card';
import { productCardConfiguration } from './ProductCardConfiguration';
import {
	keyValueCss,
	productDetailLayoutCss,
	productTitleCss,
	sectionHeadingCss,
} from './ProductCardStyles';

export const CancelledProductCard = ({
	productDetail,
}: {
	productDetail: CancelledProductDetail;
}) => {
	const groupedProductType = GROUPED_PRODUCT_TYPES[productDetail.mmaCategory];
	const specificProductType =
		groupedProductType.mapGroupedToSpecific(productDetail);

	const cardConfig =
		productCardConfiguration[specificProductType.productType];

	const showSubscribeAgainButton =
		productDetail.mmaCategory !== 'membership' &&
		productDetail.mmaCategory !== 'recurringSupport';

	return (
		<Stack space={4}>
			<InfoSummary
				message={`Your ${groupedProductType.friendlyName()} has been cancelled`}
			/>
			<Card>
				<Card.Header backgroundColor={cardConfig.colour}>
					<h3 css={productTitleCss(cardConfig.invertText)}>
						{specificProductType.productTitle()}
					</h3>
				</Card.Header>
				<Card.Section>
					<div css={productDetailLayoutCss}>
						<div>
							<h4 css={sectionHeadingCss}>Billing and payment</h4>
							<dl css={keyValueCss}>
								<div>
									<dt>
										{groupedProductType.showSupporterId
											? 'Supporter ID'
											: 'Subscription ID'}
									</dt>
									<dd>
										{
											productDetail.subscription
												.subscriptionId
										}
									</dd>
								</div>
								{groupedProductType.tierLabel && (
									<div>
										<dt>{groupedProductType.tierLabel}</dt>
										<dd>{productDetail.tier}</dd>
									</div>
								)}
								{productDetail.subscription.start && (
									<div>
										<dt>
											{groupedProductType.shouldShowJoinDateNotStartDate
												? 'Join'
												: 'Start'}{' '}
											date
										</dt>
										<dd>
											{parseDate(
												productDetail.subscription
													.start,
											).dateStr()}
										</dd>
									</div>
								)}
								<div>
									<dt>End date</dt>
									<dd>
										{parseDate(
											productDetail.subscription.end,
										).dateStr()}
									</dd>
								</div>
							</dl>
						</div>
						<div css={wideButtonLayoutCss}>
							{showSubscribeAgainButton && (
								<LinkButton
									href="https://support.theguardian.com/uk/subscribe"
									size="small"
									cssOverrides={css`
										justify-content: center;
									`}
									priority="primary"
									onClick={() => {
										trackEvent({
											eventCategory: 'href',
											eventAction: 'click',
											eventLabel: 'subscribe_again',
										});
									}}
								>
									Subscribe again
								</LinkButton>
							)}
						</div>
					</div>
				</Card.Section>
			</Card>
		</Stack>
	);
};
