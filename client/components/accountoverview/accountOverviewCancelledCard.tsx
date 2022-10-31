import { css } from '@emotion/react';
import {
	brand,
	brandAlt,
	from,
	neutral,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import { parseDate } from '../../../shared/dates';
import type { CancelledProductDetail } from '../../../shared/productResponse';
import { isGift } from '../../../shared/productResponse';
import { GROUPED_PRODUCT_TYPES } from '../../../shared/productTypes';
import { trackEvent } from '../../services/analytics';
import { Button } from '../buttons';
import { ErrorIcon } from '../svgs/errorIcon';
import { GiftIcon } from '../svgs/giftIcon';

interface AccountOverviewCancelledCardProps {
	product: CancelledProductDetail;
}

export const AccountOverviewCancelledCard = (
	props: AccountOverviewCancelledCardProps,
) => {
	const groupedProductType = GROUPED_PRODUCT_TYPES[props.product.mmaCategory];

	const specificProductType = groupedProductType.mapGroupedToSpecific(
		props.product,
	);

	/*
	 * TODO: remove 'contributions' from the following list once MDAPI has been changed to return 'recurringSupport' instead
	 */
	const showSubscribeAgainButton =
		props.product.mmaCategory !== 'membership' &&
		props.product.mmaCategory !== 'contributions' &&
		props.product.mmaCategory !== 'recurringSupport';

	const shouldShowJoinDateNotStartDate =
		groupedProductType.shouldShowJoinDateNotStartDate;

	const keyValuePairCss = css`
		list-style: none;
		margin: 0;
		padding: 0;
	`;

	const keyCss = css`
		${textSans.medium({ fontWeight: 'bold' })};
		margin: 0 0 16px 0;
		padding: 0 ${space[2]}px 0 0;
		display: inline-block;
		vertical-align: top;
		width: 14ch;
	`;

	const valueCss = css`
		${textSans.medium()};
		margin: 0 0 16px 0;
		padding: 0;
		display: inline-block;
		vertical-align: top;
		width: calc(100% - 15ch);
	`;

	return (
		<div
			css={css`
				border: 1px solid ${neutral[86]};
				margin-bottom: ${space[6]}px;
			`}
		>
			<div
				css={css`
					display: flex;
					justify-content: space-between;
					align-items: start;
					background-color: ${neutral[97]};
					${from.mobileLandscape} {
						align-items: center;
					}
				`}
			>
				<h3
					css={css`
						font-size: 17px;
						font-weight: bold;
						margin: 0;
						padding: ${space[3]}px;
						color: ${neutral[7]};
						${until.mobileLandscape} {
							padding: ${space[3]}px;
						}
						${from.tablet} {
							font-size: 20px;
							padding: ${space[3]}px ${space[5]}px;
						}
					`}
				>
					{specificProductType.productTitle()}
				</h3>
				<div
					css={css`
						display: flex;
						align-items: center;
						padding: ${space[3]}px 0;
						${until.mobileLandscape} {
							flex-direction: column;
							align-items: end;
						}
					`}
				>
					<div
						css={css`
							margin-right: ${space[3]}px;
							white-space: nowrap;
							transform: translateY(1px);
							${until.mobileLandscape} {
								${isGift(props.product.subscription)
									? 'margin: 0 5px 6px 0;'
									: ''};
							}
							${from.tablet} {
								margin-right: ${space[5]}px;
							}
						`}
					>
						<ErrorIcon
							fill={brandAlt[200]}
							additionalCss={css`
								transform: translateY(1px);
							`}
						/>
						<span
							css={css`
								${textSans.medium({ fontWeight: 'bold' })};
								line-height: 1;
								margin-left: 6px;
							`}
						>
							Cancelled
						</span>
					</div>
					{isGift(props.product.subscription) && (
						<GiftIcon alignArrowToThisSide={'left'} />
					)}
				</div>
			</div>
			<div
				css={css`
					padding: ${space[5]}px ${space[3]}px;
					${from.tablet} {
						padding: ${space[5]}px;
						display: flex;
					}
				`}
			>
				<div
					css={css`
						margin: 0;
						padding: 0;
						${from.tablet} {
							flex: 1;
							display: flex;
							flex-flow: column nowrap;
						}
						ul:last-of-type li {
							margin-bottom: ${showSubscribeAgainButton
								? `${space[5]}px`
								: 0};
						}
					`}
				>
					<ul css={keyValuePairCss}>
						<li css={keyCss}>
							{groupedProductType.showSupporterId
								? 'Supporter ID'
								: 'Subscription ID'}
						</li>
						<li css={valueCss}>
							{props.product.subscription.subscriptionId}
						</li>
					</ul>
					{groupedProductType.tierLabel && (
						<ul css={keyValuePairCss}>
							<li css={keyCss}>{groupedProductType.tierLabel}</li>
							<li css={valueCss}>{props.product.tier}</li>
						</ul>
					)}
					{showSubscribeAgainButton && (
						<div
							css={css`
								margin-top: auto;
							`}
						>
							<a
								href="https://support.theguardian.com/uk/subscribe"
								onClick={() => {
									trackEvent({
										eventCategory: 'href',
										eventAction: 'click',
										eventLabel: 'subscribe_again',
									});
								}}
							>
								<Button
									text="Subscribe again"
									fontWeight="bold"
									colour={brand[800]}
									textColour={brand[400]}
									height="36px"
								/>
							</a>
						</div>
					)}
				</div>
				<div
					css={css`
						margin: ${space[6]}px 0 0 0;
						padding: ${space[6]}px 0 0 0;
						border-top: 1px solid ${neutral[86]};
						${from.tablet} {
							flex: 1;
							display: flex;
							flex-flow: column nowrap;
							padding: 0 0 0 ${space[5]}px;
							border-top: none;
							border-left: 1px solid ${neutral[86]};
							margin: 0;
							padding: 0 0 0 ${space[5]}px;
						}
						ul:last-of-type li {
							margin-bottom: ${showSubscribeAgainButton
								? `${space[5]}px`
								: 0};
						}
					`}
				>
					{props.product.subscription.start && (
						<ul css={keyValuePairCss}>
							<li css={keyCss}>
								{shouldShowJoinDateNotStartDate
									? 'Join'
									: 'Start'}{' '}
								date
							</li>
							<li css={valueCss}>
								{parseDate(
									props.product.subscription.start,
								).dateStr()}
							</li>
						</ul>
					)}
					<ul css={keyValuePairCss}>
						<li css={keyCss}>End date</li>
						<li css={valueCss}>
							{parseDate(
								props.product.subscription.end,
							).dateStr()}
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
