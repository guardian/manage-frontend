import { css } from '@emotion/react';
import { headline, palette, space } from '@guardian/source-foundations';
import type { ReactNode } from 'react';
import { parseDate } from '../../../shared/dates';
import type { ProductDetail } from '../../../shared/productResponse';
import { getMainPlan , isGift } from '../../../shared/productResponse';
import { GROUPED_PRODUCT_TYPES } from '../../../shared/productTypes';
import {
	getNextPaymentDetails,
	NewPaymentPriceAlert,
} from '../payment/nextPaymentDetails';

interface CardProps {
	heading: string;
	children: ReactNode;
}

const Card = (props: CardProps) => {
	const containerCss = css`
		width: 100%;
		border: 1px solid ${palette.neutral[86]};
	`;

	const headingContainerCss = css`
		padding: ${space[3]}px ${space[4]}px;
		min-height: 128px;
		color: ${palette.neutral[100]};
		background-color: ${palette.brand[500]};
	`;

	const headingCss = css`
		${headline.small({ fontWeight: 'bold' })};
		margin: 0;
		max-width: 20ch;
	`;

	return (
		<div css={containerCss}>
			<div css={headingContainerCss}>
				<h3 css={headingCss}>{props.heading}</h3>
			</div>
			{props.children}
		</div>
	);
};

export const AccountOverviewCardV2 = ({
	productDetail,
}: {
	productDetail: ProductDetail;
}) => {
	const mainPlan = getMainPlan(productDetail.subscription);
	if (!mainPlan) {
		throw new Error('mainPlan does not exist in accountOverviewCard');
	}

	const groupedProductType = GROUPED_PRODUCT_TYPES[productDetail.mmaCategory];
	const specificProductType =
		groupedProductType.mapGroupedToSpecific(productDetail);

	const isPatron = productDetail.subscription.readerType === 'Patron';
	const productTitle = `${specificProductType.productTitle(mainPlan)}${
		isPatron ? ' — Patron' : ''
	}`;

	const isGifted = isGift(productDetail.subscription);
	const userIsGifter = isGifted && productDetail.isPaidTier;
	const giftPurchaseDate = productDetail.subscription.lastPaymentDate;
	const shouldShowJoinDateNotStartDate =
		groupedProductType.shouldShowJoinDateNotStartDate;
	const shouldShowStartDate = !(
		shouldShowJoinDateNotStartDate || userIsGifter
	);
	const subscriptionStartDate = productDetail.subscription.start;
	const subscriptionEndDate = productDetail.subscription.end;
	const hasCancellationPending = productDetail.subscription.cancelledAt;

	const hasPaymentFailure = !!productDetail.alertText;
	const nextPaymentDetails = getNextPaymentDetails(
		mainPlan,
		productDetail.subscription,
		null,
		hasPaymentFailure,
	);

	return (
		<Card heading={productTitle}>
			<h4>Billing and payment</h4>
			<dl>
				<dt>
					{groupedProductType.showSupporterId
						? 'Supporter ID'
						: 'Subscription ID'}
				</dt>
				<dd>{productDetail.subscription.subscriptionId}</dd>
				{groupedProductType.tierLabel && (
					<>
						<dt>{groupedProductType.tierLabel}</dt>
						<dd>{productDetail.tier}</dd>
					</>
				)}
				{subscriptionStartDate && shouldShowStartDate && (
					<>
						<dt>Start date</dt>
						<dd>{parseDate(subscriptionStartDate).dateStr()}</dd>
					</>
				)}
				{shouldShowJoinDateNotStartDate && (
					<>
						<dt>Join date</dt>
						<dd>{parseDate(productDetail.joinDate).dateStr()}</dd>
					</>
				)}
				{userIsGifter && giftPurchaseDate && (
					<>
						<dt>Purchase date</dt>
						<dd>{parseDate(giftPurchaseDate).dateStr()}</dd>
					</>
				)}
				{isGifted && !userIsGifter && (
					<>
						<dt>End date</dt>
						<dd>{parseDate(subscriptionEndDate).dateStr()}</dd>
					</>
				)}
				{nextPaymentDetails &&
					productDetail.subscription.autoRenew &&
					!hasCancellationPending && (
						<>
							<dt>{nextPaymentDetails.paymentKey}</dt>
							<dd>
								{nextPaymentDetails.isNewPaymentValue && (
									<NewPaymentPriceAlert />
								)}
								{nextPaymentDetails.paymentValue}
								{nextPaymentDetails.nextPaymentDateValue &&
									productDetail.subscription.readerType !==
										'Patron' &&
									` on ${nextPaymentDetails.nextPaymentDateValue}`}
							</dd>
						</>
					)}
			</dl>
		</Card>
	);
};
