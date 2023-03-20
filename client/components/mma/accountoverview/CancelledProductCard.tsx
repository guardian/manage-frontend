import { css } from '@emotion/react';
import {
	from,
	headline,
	palette,
	space,
	textSans,
} from '@guardian/source-foundations';
import { LinkButton, Stack } from '@guardian/source-react-components';
import { parseDate } from '../../../../shared/dates';
import type { CancelledProductDetail } from '../../../../shared/productResponse';
import { GROUPED_PRODUCT_TYPES } from '../../../../shared/productTypes';
import { trackEvent } from '../../../utilities/analytics';
import { InfoSummary } from '../paymentUpdate/Summary';
import { Card } from '../shared/Card';
import { productCardConfiguration } from './ProductCardConfiguration';

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

	const sectionHeadingCss = css`
		${textSans.medium({ fontWeight: 'bold' })};
		margin-top: 0;
		margin-bottom: ${space[2]}px;
	`;

	const productTitleCss = css`
		${headline.xxsmall({ fontWeight: 'bold' })};
		color: ${palette.neutral[100]};
		margin: 0;
		max-width: 20ch;

		${from.tablet} {
			${headline.small({ fontWeight: 'bold' })};
		}
	`;

	const productDetailLayoutCss = css`
		> * + * {
			margin-top: ${space[5]}px;
		}

		${from.tablet} {
			display: flex;
			flex-direction: row;
			> * + * {
				margin-top: 0;
				margin-left: auto;
				padding-left: ${space[4]}px;
			}
		}
	`;

	const keyValueCss = css`
		${textSans.medium()};
		margin: 0;

		div + div {
			margin-top: ${space[1]}px;
		}

		dt {
			display: inline-block;
			margin-right: 0.5ch;
			:after {
				content: ':';
			}
		}

		dd {
			display: inline-block;
			margin-left: 0;
		}
	`;

	const buttonLayoutCss = css`
		display: flex;
		flex-direction: column;
		justify-content: flex-end;

		> * + * {
			margin-top: ${space[3]}px;
		}
	`;

	return (
		<Stack space={4}>
			<InfoSummary
				message={`Your ${groupedProductType.friendlyName()} has been cancelled`}
			/>
			<Card>
				<Card.Header
					backgroundColor={cardConfig.headerColor}
					minHeightTablet
				>
					<h3 css={productTitleCss}>
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
									<dd data-qm-masking="blocklist">
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
						<div css={buttonLayoutCss}>
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
