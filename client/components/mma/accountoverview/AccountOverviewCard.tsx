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
import { LinkButton } from '@guardian/source-react-components';
import { useNavigate } from 'react-router-dom';
import { cancellationFormatDate, parseDate } from '../../../../shared/dates';
import type { ProductDetail } from '../../../../shared/productResponse';
import { getMainPlan, isGift } from '../../../../shared/productResponse';
import { GROUPED_PRODUCT_TYPES } from '../../../../shared/productTypes';
import { trackEvent } from '../../../utilities/analytics';
import { ErrorIcon } from '../shared/assets/ErrorIcon';
import { GiftIcon } from '../shared/assets/GiftIcon';
import { CardDisplay } from '../shared/CardDisplay';
import { DirectDebitDisplay } from '../shared/DirectDebitDisplay';
import {
	getNextPaymentDetails,
	NewPaymentPriceAlert,
} from '../shared/NextPaymentDetails';
import { PaypalDisplay } from '../shared/PaypalDisplay';
import { SepaDisplay } from '../shared/SepaDisplay';
import { SixForSixExplainerIfApplicable } from './SixForSixExplainer';

interface AccountOverviewCardProps {
	productDetail: ProductDetail;
}

export const AccountOverviewCard = (props: AccountOverviewCardProps) => {
	const mainPlan = getMainPlan(props.productDetail.subscription);
	if (!mainPlan) {
		throw new Error('mainPlan does not exist in accountOverviewCard');
	}

	const hasCancellationPending: boolean =
		props.productDetail.subscription.cancelledAt;

	const groupedProductType =
		GROUPED_PRODUCT_TYPES[props.productDetail.mmaCategory];

	const specificProductType = groupedProductType.mapGroupedToSpecific(
		props.productDetail,
	);

	const cancelledCopy =
		specificProductType.cancelledCopy || groupedProductType.cancelledCopy;

	const hasPaymentFailure: boolean = !!props.productDetail.alertText;

	const shouldShowJoinDateNotStartDate =
		groupedProductType.shouldShowJoinDateNotStartDate;

	const subscriptionStartDate = props.productDetail.subscription.start;

	const subscriptionEndDate = props.productDetail.subscription.end;

	const nextPaymentDetails = getNextPaymentDetails(
		mainPlan,
		props.productDetail.subscription,
		null,
		hasPaymentFailure,
	);

	const isGifted = isGift(props.productDetail.subscription);

	const isSafeToUpdatePaymentMethod =
		props.productDetail.subscription.safeToUpdatePaymentMethod;

	const userIsGifter = isGifted && props.productDetail.isPaidTier;

	const giftPurchaseDate = props.productDetail.subscription.lastPaymentDate;

	const maybePatronSuffix =
		props.productDetail.subscription.readerType === 'Patron'
			? ' - Patron'
			: '';

	const shouldShowStartDate = !(
		shouldShowJoinDateNotStartDate || userIsGifter
	);

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
		overflow: hidden;
		text-overflow: ellipsis;
	`;

	const navigate = useNavigate();

	return (
		<div
			css={css`
				border: 1px solid ${neutral[86]};
			`}
		>
			<div
				css={css`
					display: flex;
					justify-content: space-between;
					align-items: start;
					background-color: ${hasCancellationPending
						? neutral[97]
						: brand[400]};
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
						color: ${hasCancellationPending
							? neutral[7]
							: neutral[100]};
						${until.mobileLandscape} {
							padding: ${space[3]}px;
						}
						${from.tablet} {
							font-size: 20px;
							padding: ${space[3]}px ${space[5]}px;
						}
					`}
				>
					{specificProductType.productTitle(mainPlan)}
					{maybePatronSuffix}
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
					{hasCancellationPending && (
						<div
							css={css`
								margin-right: ${space[3]}px;
								white-space: nowrap;
								transform: translateY(1px);
								${until.mobileLandscape} {
									${isGift(props.productDetail.subscription)
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
					)}
					{isGift(props.productDetail.subscription) && (
						<GiftIcon alignArrowToThisSide={'left'} />
					)}
				</div>
			</div>
			<SixForSixExplainerIfApplicable
				additionalCss={css`
					${textSans.medium()};
					padding: ${space[3]}px ${space[3]}px 0;
					margin: 0;
					${from.tablet} {
						padding: ${space[5]}px ${space[5]}px 0;
					}
				`}
				mainPlan={mainPlan}
				hasCancellationPending={hasCancellationPending}
			/>
			{hasCancellationPending &&
				props.productDetail.subscription.end &&
				cancelledCopy && (
					<p
						css={css`
							${textSans.medium()};
							padding: ${space[3]}px ${space[3]}px 0;
							margin: 0;
							${from.tablet} {
								padding: ${space[5]}px ${space[5]}px 0;
							}
						`}
					>
						{cancelledCopy.trim() + ' '}
						<span
							css={css`
								font-weight: bold;
							`}
						>
							{cancellationFormatDate(
								props.productDetail.subscription
									.cancellationEffectiveDate,
							)}
						</span>
						.
					</p>
				)}
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
						ul:last-of-type {
							margin-bottom: ${space[5]}px;
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
							{props.productDetail.subscription.subscriptionId}
						</li>
					</ul>
					{groupedProductType.tierLabel && (
						<ul css={keyValuePairCss}>
							<li css={keyCss}>{groupedProductType.tierLabel}</li>
							<li css={valueCss}>{props.productDetail.tier}</li>
						</ul>
					)}
					{subscriptionStartDate && shouldShowStartDate && (
						<ul css={keyValuePairCss}>
							<li css={keyCss}>Start date</li>
							<li css={valueCss}>
								{parseDate(subscriptionStartDate).dateStr()}
							</li>
						</ul>
					)}
					{shouldShowJoinDateNotStartDate && (
						<ul css={keyValuePairCss}>
							<li css={keyCss}>Join date</li>
							<li css={valueCss}>
								{parseDate(
									props.productDetail.joinDate,
								).dateStr()}
							</li>
						</ul>
					)}
					{userIsGifter && giftPurchaseDate && (
						<ul css={keyValuePairCss}>
							<li css={keyCss}>Purchase date</li>
							<li css={valueCss}>
								{parseDate(giftPurchaseDate).dateStr()}
							</li>
						</ul>
					)}
					{isGifted && !userIsGifter && (
						<ul css={keyValuePairCss}>
							<li css={keyCss}>End date</li>
							<li css={valueCss}>
								{parseDate(subscriptionEndDate).dateStr()}
							</li>
						</ul>
					)}
					{specificProductType.showTrialRemainingIfApplicable &&
						props.productDetail.subscription.trialLength > 0 &&
						!isGifted &&
						props.productDetail.subscription.readerType !==
							'Patron' && (
							<ul css={keyValuePairCss}>
								<li css={keyCss}>Trial remaining</li>
								<li css={valueCss}>
									{
										props.productDetail.subscription
											.trialLength
									}{' '}
									day
									{props.productDetail.subscription
										.trialLength !== 1
										? 's'
										: ''}
								</li>
							</ul>
						)}
					{!isGifted && (
						<div
							css={css`
								margin-top: auto;
							`}
						>
							<LinkButton
								aria-label={`${specificProductType.productTitle(
									mainPlan,
								)} : Manage ${groupedProductType.friendlyName()}`}
								tabIndex={0}
								data-cy={`Manage ${groupedProductType.friendlyName()}`}
								role="link"
								priority="secondary"
								size="small"
								onClick={() => {
									trackEvent({
										eventCategory: 'account_overview',
										eventAction: 'click',
										eventLabel: `manage_${groupedProductType.urlPart}`,
									});
									navigate(`/${groupedProductType.urlPart}`, {
										state: {
											productDetail: props.productDetail,
										},
									});
								}}
							>
								{`Manage ${groupedProductType.friendlyName()}`}
							</LinkButton>
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
						ul:last-of-type {
							margin-bottom: ${space[5]}px;
						}
					`}
				>
					{nextPaymentDetails &&
						props.productDetail.subscription.autoRenew &&
						!hasCancellationPending && (
							<ul css={keyValuePairCss}>
								<li css={keyCss}>
									{nextPaymentDetails.paymentKey}
								</li>
								<li css={valueCss}>
									<span
										css={css`
											display: block;
										`}
									>
										{nextPaymentDetails.isNewPaymentValue && (
											<NewPaymentPriceAlert />
										)}
										{nextPaymentDetails.paymentValue}
									</span>
									{nextPaymentDetails.nextPaymentDateValue &&
										props.productDetail.subscription
											.readerType !== 'Patron' && (
											<span
												css={css`
													display: block;
												`}
											>
												{
													nextPaymentDetails.nextPaymentDateValue
												}
											</span>
										)}
								</li>
							</ul>
						)}
					{props.productDetail.isPaidTier && (
						<>
							<ul css={keyValuePairCss}>
								<li css={keyCss}>Payment method</li>
								<li css={valueCss}>
									{props.productDetail.subscription.card && (
										<CardDisplay
											inErrorState={hasPaymentFailure}
											cssOverrides={css`
												margin: 0;
											`}
											{...props.productDetail.subscription
												.card}
										/>
									)}
									{props.productDetail.subscription
										.payPalEmail && (
										<PaypalDisplay
											payPalId={
												props.productDetail.subscription
													.payPalEmail
											}
										/>
									)}
									{props.productDetail.subscription
										.sepaMandate && (
										<SepaDisplay
											accountName={
												props.productDetail.subscription
													.sepaMandate.accountName
											}
											iban={
												props.productDetail.subscription
													.sepaMandate.iban
											}
										/>
									)}
									{props.productDetail.subscription
										.mandate && (
										<DirectDebitDisplay
											inErrorState={hasPaymentFailure}
											{...props.productDetail.subscription
												.mandate}
										/>
									)}
									{props.productDetail.subscription
										.stripePublicKeyForCardAddition && (
										<span>No Payment Method</span>
									)}
								</li>
							</ul>
							{!isGifted && isSafeToUpdatePaymentMethod && (
								<div
									css={css`
										margin-top: auto;
									`}
								>
									<LinkButton
										aria-label={`${specificProductType.productTitle(
											mainPlan,
										)} : Manage payment method`}
										tabIndex={0}
										role="link"
										size="small"
										priority={
											hasPaymentFailure
												? 'primary'
												: 'secondary'
										}
										icon={
											hasPaymentFailure ? (
												<ErrorIcon
													fill={neutral[100]}
													additionalCss={css`
														margin-right: ${space[2]}px;
													`}
												/>
											) : undefined
										}
										onClick={() => {
											trackEvent({
												eventCategory:
													'account_overview',
												eventAction: 'click',
												eventLabel:
													'manage_payment_method',
											});
											navigate(
												`/payment/${specificProductType.urlPart}`,
												{
													state: {
														productDetail:
															props.productDetail,
													},
												},
											);
										}}
									>
										Manage payment method
									</LinkButton>
								</div>
							)}
						</>
					)}
					{!props.productDetail.isPaidTier && (
						<ul css={keyValuePairCss}>
							<li css={keyCss}>Payment</li>
							<li css={valueCss}>
								{isGifted ? 'Gift redemption' : 'Free'}
							</li>
						</ul>
					)}
				</div>
			</div>
		</div>
	);
};