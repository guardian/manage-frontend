import { css } from '@emotion/react';
import {
	headline,
	palette,
	space,
	textSans,
} from '@guardian/source-foundations';
import { LinkButton } from '@guardian/source-react-components';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { parseDate } from '../../../shared/dates';
import type { ProductDetail } from '../../../shared/productResponse';
import { getMainPlan, isGift } from '../../../shared/productResponse';
import { GROUPED_PRODUCT_TYPES } from '../../../shared/productTypes';
import { trackEvent } from '../../services/analytics';
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

Card.Section = (props: { children: ReactNode }) => {
	const sectionCss = css`
		padding: ${space[5]}px ${space[4]}px;
		& + & {
			margin-top: ${space[5]}px;
			border-top: 1px solid ${palette.neutral[86]};
		}
	`;

	return <div css={sectionCss}>{props.children}</div>;
};

export const AccountOverviewCardV2 = ({
	productDetail,
}: {
	productDetail: ProductDetail;
}) => {
	const navigate = useNavigate();

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

	const sectionHeadingCss = css`
		${textSans.medium({ fontWeight: 'bold' })};
		margin-top: 0;
		margin-bottom: ${space[2]}px;
	`;

	const panelCss = css`
		display: flex;
		flex-direction: row;

		> :first-child {
			flex-grow: 1;
			margin-right: ${space[4]}px;
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
			:after {
				content: ':';
			}
		}

		dd {
			display: inline-block;
			margin-left: 0.5ch;
		}
	`;

	return (
		<Card heading={productTitle}>
			<Card.Section>
				<h4 css={sectionHeadingCss}>Billing and payment</h4>
				<div css={panelCss}>
					<dl css={keyValueCss}>
						<div>
							<dt>
								{groupedProductType.showSupporterId
									? 'Supporter ID'
									: 'Subscription ID'}
							</dt>
							<dd>{productDetail.subscription.subscriptionId}</dd>
						</div>
						{groupedProductType.tierLabel && (
							<div>
								<dt>{groupedProductType.tierLabel}</dt>
								<dd>{productDetail.tier}</dd>
							</div>
						)}
						{subscriptionStartDate && shouldShowStartDate && (
							<div>
								<dt>Start date</dt>
								<dd>
									{parseDate(subscriptionStartDate).dateStr()}
								</dd>
							</div>
						)}
						{shouldShowJoinDateNotStartDate && (
							<div>
								<dt>Join date</dt>
								<dd>
									{parseDate(
										productDetail.joinDate,
									).dateStr()}
								</dd>
							</div>
						)}
						{userIsGifter && giftPurchaseDate && (
							<div>
								<dt>Purchase date</dt>
								<dd>{parseDate(giftPurchaseDate).dateStr()}</dd>
							</div>
						)}
						{isGifted && !userIsGifter && (
							<div>
								<dt>End date</dt>
								<dd>
									{parseDate(subscriptionEndDate).dateStr()}
								</dd>
							</div>
						)}
						{nextPaymentDetails &&
							productDetail.subscription.autoRenew &&
							!hasCancellationPending && (
								<div>
									<dt>{nextPaymentDetails.paymentKey}</dt>
									<dd>
										{nextPaymentDetails.isNewPaymentValue && (
											<NewPaymentPriceAlert />
										)}
										{nextPaymentDetails.paymentValue}
										{nextPaymentDetails.nextPaymentDateValue &&
											productDetail.subscription
												.readerType !== 'Patron' &&
											` on ${nextPaymentDetails.nextPaymentDateValue}`}
									</dd>
								</div>
							)}
					</dl>
					<div>
						{!isGifted && (
							<LinkButton
								aria-label={`${specificProductType.productTitle(
									mainPlan,
								)} : Manage ${groupedProductType.friendlyName()}`}
								data-cy={`Manage ${groupedProductType.friendlyName()}`}
								size="small"
								onClick={() => {
									trackEvent({
										eventCategory: 'account_overview',
										eventAction: 'click',
										eventLabel: `manage_${groupedProductType.urlPart}`,
									});
									navigate(`/${groupedProductType.urlPart}`, {
										state: {
											productDetail: productDetail,
										},
									});
								}}
							>
								{`Manage ${groupedProductType.friendlyName()}`}
							</LinkButton>
						)}
					</div>
				</div>
			</Card.Section>
			<Card.Section>
				<h4 css={sectionHeadingCss}>Payment method</h4>
			</Card.Section>
		</Card>
	);
};
