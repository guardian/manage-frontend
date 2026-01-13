import { css } from '@emotion/react';
import { palette, space, textSans17 } from '@guardian/source/foundations';
import {
	Button,
	Stack,
	SvgGift,
	SvgInfoRound,
	themeButtonReaderRevenueBrand,
} from '@guardian/source/react-components';
import {
	InfoSummary,
	SuccessSummary,
} from '@guardian/source-development-kitchen/react-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
	cancellationFormatDate,
	DATE_FNS_LONG_OUTPUT_FORMAT,
	parseDate,
} from '@/shared/dates';
import type {
	MembersDataApiUser,
	PaidSubscriptionPlan,
	ProductDetail,
} from '@/shared/productResponse';
import {
	getMainPlan,
	getSpecificProductTypeFromProductKey,
	isGift,
	isPaidSubscriptionPlan,
} from '@/shared/productResponse';
import { GROUPED_PRODUCT_TYPES } from '@/shared/productTypes';
import { wideButtonLayoutCss } from '../../../styles/ButtonStyles';
import { trackEvent } from '../../../utilities/analytics';
import { Ribbon } from '../../shared/Ribbon';
import { ErrorIcon } from '../shared/assets/ErrorIcon';
import { BenefitsToggle } from '../shared/benefits/BenefitsToggle';
import { Card } from '../shared/Card';
import { getNextPaymentDetails } from '../shared/NextPaymentDetails';
import { PaymentMethoDisplay } from '../shared/PaymentMethodDisplay';
import { productCardConfiguration } from './ProductCardConfiguration';
import {
	keyValueCss,
	productCardTitleCss,
	productDetailLayoutCss,
	sectionHeadingCss,
} from './ProductCardStyles';

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
	const location = useLocation();

	const mainPlan = getMainPlan(productDetail.subscription);
	if (!mainPlan) {
		throw new Error('mainPlan does not exist in ProductCard');
	}

	const specificProductType = getSpecificProductTypeFromProductKey(
		productDetail.mmaProductKey,
	);
	const groupedProductType =
		GROUPED_PRODUCT_TYPES[specificProductType.groupedProductType];

	const isPatron = productDetail.subscription.readerType === 'Patron';

	const entitledToEvents =
		['Partner', 'Patron'].includes(productDetail.mmaProductKey) &&
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

	// TODO: Implement this button's eligibility logic.
	// Using a query param for now for testing and QA purposes.
	const showProductUpsellButton =
		new URLSearchParams(location.search).get(
			'showDigitalPlusUpsellButton',
		) === 'TRUE';

	const productBenefits =
		specificProductType.productType === 'supporterplus'
			? 'supporter benefits'
			: groupedProductType.friendlyName;

	const cardConfig =
		productCardConfiguration[specificProductType.productType];

	const giftRibbonColour = cardConfig.invertText
		? palette.brand[400]
		: palette.brandAlt[400];
	const giftRibbonCopyColour = cardConfig.invertText
		? palette.brandAlt[400]
		: palette.brand[400];
	const giftRibbonCss = css`
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 0;
	`;

	const benefitsTextCss = css`
		${textSans17};
		margin: 0;
		margin-bottom: ${space[2]}px;
	`;

	const canBeInOfferPeriod =
		specificProductType.productType === 'supporterplus';
	const canBeInPausePeriod =
		specificProductType.productType === 'contributions';

	const isInOfferOrPausePeriod =
		!hasCancellationPending &&
		productDetail.subscription.nextPaymentDate &&
		productDetail.subscription.potentialCancellationDate &&
		productDetail.subscription.nextPaymentDate !==
			productDetail.subscription.potentialCancellationDate;

	const futureProductTitle =
		productDetail.subscription.futurePlans[0]?.mmaProductKey &&
		productDetail.mmaProductKey &&
		productDetail.subscription.currentPlans.length > 0
			? getSpecificProductTypeFromProductKey(
					productDetail.subscription.futurePlans[0].mmaProductKey,
			  ).productTitle(mainPlan)
			: null;

	return (
		<Stack space={4}>
			{hasCancellationPending && productDetail.subscription.end && (
				<InfoSummary
					message={`Your ${groupedProductType.friendlyName} has been cancelled`}
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
			{canBeInOfferPeriod &&
				isInOfferOrPausePeriod &&
				isPaidSubscriptionPlan(mainPlan) &&
				mainPlan.billingPeriod === 'month' && (
					<SuccessSummary
						message="Your offer is active"
						context={
							<>
								Your free offer is active until{' '}
								{nextPaymentDetails?.nextPaymentDateValue}. If
								you have any questions, feel free to{' '}
								{
									<Link
										to="/help-centre#contact-options"
										css={css`
											text-decoration: underline;
											color: ${palette.brand[500]};
										`}
									>
										contact our support team
									</Link>
								}
								.
							</>
						}
					/>
				)}
			{canBeInPausePeriod && isInOfferOrPausePeriod && (
				<SuccessSummary
					message="You have paused your support"
					context={
						<>
							Your support is now paused until{' '}
							{nextPaymentDetails?.nextPaymentDateValue}. If you
							have any questions, feel free to{' '}
							{
								<Link
									to="/help-centre#contact-options"
									css={css`
										text-decoration: underline;
										color: ${palette.brand[500]};
									`}
								>
									contact our support team
								</Link>
							}
							.
						</>
					}
				/>
			)}
			<Card>
				<Card.Header
					backgroundColor={cardConfig.colour}
					minHeightOverride="auto"
				>
					<h3 css={productCardTitleCss(cardConfig.invertText)}>
						{productTitle}
					</h3>
					{isGifted && (
						<Ribbon
							copy="Gift"
							ribbonColour={giftRibbonColour}
							copyColour={giftRibbonCopyColour}
							icon={
								<SvgGift
									isAnnouncedByScreenReader
									size="small"
									theme={{ fill: giftRibbonCopyColour }}
								/>
							}
							additionalCss={giftRibbonCss}
						/>
					)}
				</Card.Header>

				{(cardConfig.showBenefitsSection ||
					cardConfig.showDigitalBenefitsSection ||
					cardConfig.showUnlimitedDigitalBenefitsSection) &&
					nextPaymentDetails && (
						<Card.Section backgroundColor="#edf5fA" removeBorders>
							<p css={benefitsTextCss}>
								{cardConfig.showDigitalBenefitsSection
									? `You’re supporting the Guardian with ${nextPaymentDetails.currentPriceValue} per ${nextPaymentDetails.paymentInterval}, and have unlocked the full digital experience:`
									: cardConfig.showUnlimitedDigitalBenefitsSection
									? `You’re subscribed to the Guardian for ${nextPaymentDetails.currentPriceValue} per ${nextPaymentDetails.paymentInterval}, unlocking unlimited digital benefits.`
									: `You’re supporting the Guardian with ${nextPaymentDetails.currentPriceValue} per ${nextPaymentDetails.paymentInterval}, and have access to exclusive extras.`}
							</p>
							<BenefitsToggle
								productType={specificProductType.productType}
								subscriptionPlan={mainPlan}
							/>
						</Card.Section>
					)}
				{specificProductType.productType === 'guardianadlite' &&
					nextPaymentDetails && (
						<Card.Section backgroundColor="#edf5fA">
							<p css={benefitsTextCss}>
								You’re subscribed to{' '}
								{specificProductType.productTitle()} and pay{' '}
								{nextPaymentDetails.paymentValueShort} a{' '}
								{nextPaymentDetails.paymentInterval} for
								non-personalised advertising.
							</p>
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
										<dd>{productDetail.mmaProductKey}</dd>
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
								{((isGifted && !userIsGifter) ||
									!productDetail.subscription.autoRenew) && (
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
								{futureProductTitle && (
									<div>
										<dt>Switching to</dt>
										<dd>{futureProductTitle}</dd>
									</div>
								)}
							</dl>
						</div>
						<div css={wideButtonLayoutCss}>
							{showProductUpsellButton && (
								<Button
									aria-label={`Product Card Digital Plus Upsell Button`}
									data-cy={`digital-plus-upsell-button`}
									size="small"
									priority="primary"
									theme={themeButtonReaderRevenueBrand}
									cssOverrides={css`
										justify-content: center;
									`}
									onClick={() => {
										trackEvent({
											eventCategory: 'account_overview',
											eventAction: 'click',
											eventLabel: `/${specificProductType.urlPart}/upgrade-product/information`,
										});
										navigate(
											`/${specificProductType.urlPart}/upgrade-product/information`,
											{
												state: {
													productDetail:
														productDetail,
												},
											},
										);
									}}
								>
									{`Upgrade to Digital plus`}
								</Button>
							)}
							{!isGifted && (
								<Button
									aria-label={`${specificProductType.productTitle(
										mainPlan,
									)} : Manage ${
										groupedProductType.friendlyName
									}`}
									data-cy={`Manage ${groupedProductType.friendlyName}`}
									size="small"
									priority="tertiary"
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
									{`Manage ${groupedProductType.friendlyName}`}
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
								Guardian Live - Ticket Tailor promo codes
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
								<PaymentMethoDisplay
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
										priority="tertiary"
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
								${textSans17};
								margin: 0;
							`}
						>
							{isGifted ? 'Gift redemption' : 'Free'}
						</p>
					</Card.Section>
				)}
				{productDetail.billingCountry === 'United States' &&
					!hasCancellationPending && (
						<Card.Section>
							<div css={productDetailLayoutCss}>
								<div>
									<h4 css={sectionHeadingCss}>
										Cancel {groupedProductType.friendlyName}
									</h4>
									<p
										css={css`
											max-width: 350px;
										`}
									>
										{!productDetail.subscription
											.autoRenew &&
										!productDetail.subscription
											.nextPaymentDate ? (
											<>
												This is a one-off payment and
												will not renew. You’ll continue
												to enjoy your benefits until the
												end of the current billing
												period.
											</>
										) : (
											<>
												Stop your recurring payment, at
												the end of current billing
												period.
											</>
										)}
									</p>
								</div>
								<div css={wideButtonLayoutCss}>
									<Button
										aria-label={`Cancel ${specificProductType.productTitle(
											mainPlan,
										)}`}
										size="small"
										cssOverrides={css`
											justify-content: center;
										`}
										priority="tertiary"
										onClick={() => {
											trackEvent({
												eventCategory:
													'account_overview',
												eventAction: 'click',
												eventLabel: 'cancel_product',
											});
											navigate(
												`/cancel/${specificProductType.urlPart}`,
												{
													state: { productDetail },
												},
											);
										}}
									>
										Cancel {groupedProductType.friendlyName}
									</Button>
								</div>
							</div>
						</Card.Section>
					)}
			</Card>
		</Stack>
	);
};
