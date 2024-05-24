import { css } from '@emotion/react';
import { palette, textSans } from '@guardian/source/foundations';
import {
	Button,
	Stack,
	SvgInfoRound,
	themeButtonReaderRevenueBrand,
} from '@guardian/source/react-components';
import { InfoSummary } from '@guardian/source-development-kitchen/react-components';
import { useNavigate } from 'react-router';
import {
	cancellationFormatDate,
	DATE_FNS_LONG_OUTPUT_FORMAT,
	parseDate,
} from '@/shared/dates';
import type {
	MembersDataApiUser,
	PaidSubscriptionPlan,
	ProductDetail,
	Subscription,
} from '@/shared/productResponse';
import { getMainPlan, isGift } from '@/shared/productResponse';
import { GROUPED_PRODUCT_TYPES } from '@/shared/productTypes';
import { wideButtonLayoutCss } from '../../../styles/ButtonStyles';
import { trackEvent } from '../../../utilities/analytics';
import { ErrorIcon } from '../shared/assets/ErrorIcon';
import { BenefitsToggle } from '../shared/benefits/BenefitsToggle';
import { Card } from '../shared/Card';
import { CardDisplay } from '../shared/CardDisplay';
import { DirectDebitDisplay } from '../shared/DirectDebitDisplay';
import { getNextPaymentDetails } from '../shared/NextPaymentDetails';
import { PaypalDisplay } from '../shared/PaypalDisplay';
import { SepaDisplay } from '../shared/SepaDisplay';
import { GiftRibbon } from './GiftRibbon';
import { productCardConfiguration } from './ProductCardConfiguration';
import {
	keyValueCss,
	productCardTitleCss,
	productDetailLayoutCss,
	sectionHeadingCss,
} from './ProductCardStyles';

const PaymentMethod = ({
	subscription,
	inPaymentFailure,
}: {
	subscription: Subscription;
	inPaymentFailure: boolean;
}) => (
	<div
		css={css`
			${textSans.medium()};
		`}
		data-qm-masking="blocklist"
	>
		{subscription.card && (
			<CardDisplay
				inErrorState={inPaymentFailure}
				cssOverrides={css`
					margin: 0;
				`}
				{...subscription.card}
			/>
		)}
		{subscription.payPalEmail && (
			<PaypalDisplay inline={true} payPalId={subscription.payPalEmail} />
		)}
		{subscription.sepaMandate && (
			<SepaDisplay
				inline={true}
				accountName={subscription.sepaMandate.accountName}
				iban={subscription.sepaMandate.iban}
			/>
		)}
		{subscription.mandate && (
			<DirectDebitDisplay inline={true} {...subscription.mandate} />
		)}
		{subscription.stripePublicKeyForCardAddition && (
			<span>No Payment Method</span>
		)}
	</div>
);

const NewPriceAlert = () => {
	const iconCss = css`
		svg {
			position: relative;
			top: 7px;
			margin-left: -4px;
			fill: ${palette.brand[500]};
		}
	`;

	return (
		<span css={iconCss}>
			<SvgInfoRound size="small" />
			New price |{' '}
		</span>
	);
};

export const ProductCard = ({
	productDetail,
	isEligibleToSwitch,
	user,
}: {
	productDetail: ProductDetail;
	isEligibleToSwitch: boolean;
	user?: MembersDataApiUser;
}) => {
	const navigate = useNavigate();

	const mainPlan = getMainPlan(productDetail.subscription);
	if (!mainPlan) {
		throw new Error('mainPlan does not exist in ProductCard');
	}

	const groupedProductType = GROUPED_PRODUCT_TYPES[productDetail.mmaCategory];
	const specificProductType =
		groupedProductType.mapGroupedToSpecific(productDetail);

	const isPatron = productDetail.subscription.readerType === 'Patron';

	const entitledToEvents =
		['Partner', 'Patron'].includes(productDetail.tier) &&
		(mainPlan as PaidSubscriptionPlan).features.includes('Events');

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

	const isSafeToUpdatePaymentMethod =
		productDetail.subscription.safeToUpdatePaymentMethod;
	const hasPaymentFailure = !!productDetail.alertText;
	const nextPaymentDetails = getNextPaymentDetails(
		mainPlan,
		productDetail.subscription,
		null,
		hasPaymentFailure,
	);

	const showSwitchButton =
		isEligibleToSwitch &&
		!hasCancellationPending &&
		specificProductType.productType === 'contributions';

	const productBenefits =
		specificProductType.productType === 'supporterplus'
			? 'supporter benefits'
			: groupedProductType.friendlyName();

	const cardConfig =
		productCardConfiguration[specificProductType.productType];

	const benefitsTextCss = css`
		${textSans.medium()}
		margin: 0;
		max-width: 35ch;
	`;

	return (
		<Stack space={4}>
			{hasCancellationPending && productDetail.subscription.end && (
				<InfoSummary
					message={`Your ${groupedProductType.friendlyName()} has been cancelled`}
					context={
						<>
							You are able to access your {productBenefits} until{' '}
							<strong>
								{cancellationFormatDate(
									productDetail.subscription
										.cancellationEffectiveDate,
									DATE_FNS_LONG_OUTPUT_FORMAT,
								)}
							</strong>
						</>
					}
				/>
			)}
			<Card>
				<Card.Header backgroundColor={cardConfig.colour}>
					<h3 css={productCardTitleCss(cardConfig.invertText)}>
						{productTitle}
					</h3>
					{isGifted && (
						<GiftRibbon inverted={cardConfig.invertText} />
					)}
				</Card.Header>

				{cardConfig.showBenefitsSection && nextPaymentDetails && (
					<Card.Section backgroundColor="#edf5fA">
						<p css={benefitsTextCss}>
							You’re supporting the Guardian with{' '}
							{nextPaymentDetails.paymentValue} per{' '}
							{nextPaymentDetails.paymentInterval}, and have
							access to exclusive extras.
						</p>
						<BenefitsToggle
							productType={specificProductType.productType}
						/>
					</Card.Section>
				)}
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
								{subscriptionStartDate && shouldShowStartDate && (
									<div>
										<dt>Start date</dt>
										<dd>
											{parseDate(
												subscriptionStartDate,
											).dateStr()}
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
										<dd>
											{parseDate(
												giftPurchaseDate,
											).dateStr()}
										</dd>
									</div>
								)}
								{isGifted && !userIsGifter && (
									<div>
										<dt>End date</dt>
										<dd>
											{parseDate(
												subscriptionEndDate,
											).dateStr()}
										</dd>
									</div>
								)}
								{specificProductType.showTrialRemainingIfApplicable &&
									productDetail.subscription.trialLength >
										0 &&
									!isGifted &&
									productDetail.subscription.readerType !==
										'Patron' && (
										<div>
											<dt>Trial remaining</dt>
											<dd>
												{
													productDetail.subscription
														.trialLength
												}{' '}
												{productDetail.subscription
													.trialLength !== 1
													? 'days'
													: 'day'}
											</dd>
										</div>
									)}
								{nextPaymentDetails &&
									productDetail.subscription.autoRenew &&
									!hasCancellationPending && (
										<div>
											<dt>
												{nextPaymentDetails.paymentKey}
											</dt>
											<dd>
												{nextPaymentDetails.isNewPaymentValue && (
													<NewPriceAlert />
												)}
												{
													nextPaymentDetails.paymentValue
												}
												{nextPaymentDetails.nextPaymentDateValue &&
													productDetail.subscription
														.readerType !==
														'Patron' &&
													` on ${nextPaymentDetails.nextPaymentDateValue}`}
											</dd>
										</div>
									)}
							</dl>
						</div>
						<div css={wideButtonLayoutCss}>
							{!isGifted && (
								<Button
									aria-label={`${specificProductType.productTitle(
										mainPlan,
									)} : Manage ${groupedProductType.friendlyName()}`}
									data-cy={`Manage ${groupedProductType.friendlyName()}`}
									size="small"
									cssOverrides={css`
										justify-content: center;
									`}
									onClick={() => {
										trackEvent({
											eventCategory: 'account_overview',
											eventAction: 'click',
											eventLabel: `manage_${specificProductType.urlPart}`,
										});
										navigate(
											`/${specificProductType.urlPart}`,
											{
												state: {
													productDetail:
														productDetail,
												},
											},
										);
									}}
								>
									{`Manage ${groupedProductType.friendlyName()}`}
								</Button>
							)}
							{showSwitchButton && (
								<Button
									theme={themeButtonReaderRevenueBrand}
									size="small"
									cssOverrides={css`
										justify-content: center;
									`}
									onClick={() =>
										navigate(`/switch`, {
											state: {
												productDetail: productDetail,
												user: user,
											},
										})
									}
								>
									Change to all-access digital
								</Button>
							)}
						</div>
					</div>
				</Card.Section>
				{entitledToEvents && (
					<Card.Section>
						<div>
							<h4 css={sectionHeadingCss}>
								Guardian Live - Eventbrite discount codes
							</h4>
							<div>
								<dl css={keyValueCss}>
									<dt>{window.atob('TFBQRlJFRTZHTFRY')}</dt>
									<dd>
										gives you 6 free tickets each year (1
										per event)
									</dd>
								</dl>
							</div>
							<div>
								<dl css={keyValueCss}>
									<dt>{window.atob('TFBQMjAyR0xUWA==')}</dt>
									<dd>
										gives you 20% off an extra 2 tickets per
										event
									</dd>
								</dl>
							</div>
						</div>
					</Card.Section>
				)}
				{productDetail.isPaidTier && (
					<Card.Section>
						<div css={productDetailLayoutCss}>
							<div>
								<h4 css={sectionHeadingCss}>Payment method</h4>
								<PaymentMethod
									subscription={productDetail.subscription}
									inPaymentFailure={hasPaymentFailure}
								/>
							</div>
							{!isGifted && isSafeToUpdatePaymentMethod && (
								<div css={wideButtonLayoutCss}>
									<Button
										aria-label={`${specificProductType.productTitle(
											mainPlan,
										)} : Update payment method`}
										size="small"
										cssOverrides={css`
											justify-content: center;
										`}
										priority="primary"
										icon={
											hasPaymentFailure ? (
												<ErrorIcon
													fill={palette.neutral[100]}
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
													state: { productDetail },
												},
											);
										}}
									>
										Update payment method
									</Button>
								</div>
							)}
						</div>
					</Card.Section>
				)}
				{!productDetail.isPaidTier && (
					<Card.Section>
						<h4 css={sectionHeadingCss}>Payment</h4>
						<p
							css={css`
								${textSans.medium()};
								margin: 0;
							`}
						>
							{isGifted ? 'Gift redemption' : 'Free'}
						</p>
					</Card.Section>
				)}
			</Card>
		</Stack>
	);
};
