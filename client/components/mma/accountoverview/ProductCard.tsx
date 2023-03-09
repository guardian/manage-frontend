import { css, ThemeProvider } from '@emotion/react';
import {
	from,
	headline,
	palette,
	space,
	textSans,
} from '@guardian/source-foundations';
import {
	Button,
	buttonThemeReaderRevenueBrand,
	Stack,
} from '@guardian/source-react-components';
import { useNavigate } from 'react-router';
import {
	cancellationFormatDate,
	DATE_FNS_LONG_OUTPUT_FORMAT,
	parseDate,
} from '../../../../shared/dates';
import type {
	MembersDataApiUser,
	ProductDetail,
	Subscription,
} from '../../../../shared/productResponse';
import { getMainPlan, isGift } from '../../../../shared/productResponse';
import { GROUPED_PRODUCT_TYPES } from '../../../../shared/productTypes';
import { trackEvent } from '../../../utilities/analytics';
import { InfoSummary } from '../paymentUpdate/Summary';
import { ErrorIcon } from '../shared/assets/ErrorIcon';
import { Card } from '../shared/Card';
import { CardDisplay } from '../shared/CardDisplay';
import { DirectDebitDisplay } from '../shared/DirectDebitDisplay';
import {
	getNextPaymentDetails,
	NewPaymentPriceAlert,
} from '../shared/NextPaymentDetails';
import { PaypalDisplay } from '../shared/PaypalDisplay';
import { SepaDisplay } from '../shared/SepaDisplay';
import { SupporterPlusBenefitsToggle } from '../shared/SupporterPlusBenefits';
import { productCardConfiguration } from './ProductCardConfiguration';

const GiftBadge = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 98 30"
		aria-label="gift"
		css={css`
			position: absolute;
			width: 98px;
			top: calc(50% - 15px);
			right: 0;
		`}
	>
		<g clipPath="url(#gift-badge)">
			<path
				fill="#fff"
				fillRule="evenodd"
				d="m.6036.0444 11.8782 15.0407L.6035 29.9469h96.398V.0002L.6035.0444ZM28.1503 4.961l-2.1075 2.533L29.6001 9.52h-4.8504l-.9167 1.0132v5.1671h6.7833v-5.6737h2.0167v5.6737h6.7833v-5.1671l-.9166-1.0132h-4.8695l3.5573-2.0263L35.08 4.961 31.6151 9.084l-3.4648-4.123Zm22.6863 18.5266c.9466.28 2 .42 3.16.42.96 0 1.8666-.0867 2.72-.26.8666-.16 1.5666-.3467 2.1-.56v-4.9l1.04-.44v-1.08h-6.12v1.08l1.32.44v4.18c-.1334.0533-.3067.1-.52.14-.2.04-.4267.06-.68.06-.4934 0-.9267-.0934-1.3-.28-.36-.2-.66-.54-.9-1.02s-.42-1.1267-.54-1.94c-.1067-.8267-.16-1.8534-.16-3.08 0-2.1334.2733-3.6467.82-4.54.5466-.9067 1.36-1.36 2.44-1.36.36 0 .68.0266.96.08.2933.04.54.1.74.18l.94 2.92h1.68l-.08-3.88c-.4534-.1867-1.0667-.34-1.84-.46-.7734-.1334-1.5934-.2-2.46-.2-1.0134 0-1.9934.1333-2.94.4-.9467.2666-1.78.7-2.5 1.3-.7067.5866-1.2734 1.36-1.7 2.32-.4267.96-.64 2.1333-.64 3.52 0 1.2933.18 2.4133.54 3.36.36.9333.8666 1.7 1.52 2.3.6533.5866 1.4533 1.02 2.4 1.3Zm13.8997-14.94c-.3867-.36-.84-.54-1.36-.54-.5334 0-.9867.18-1.36.54-.3734.36-.56.8066-.56 1.34 0 .5333.1866.98.56 1.34.3733.3466.8266.52 1.36.52.52 0 .9733-.1734 1.36-.52.3866-.36.58-.8067.58-1.34 0-.5334-.1934-.98-.58-1.34Zm.18 3.94-4.5.64v.86l1.22.48v7.82l-1.14.5v.86h5.92v-.86l-1.1201-.5v-9.76l-.3799-.04Zm8.3429 10.3-1.42-.52v-8.1h2.02v-1.48h-2.02v-2.12c0-.6134.08-1.0334.24-1.26.1734-.24.4334-.36.78-.36.0934 0 .18.0066.26.02.0934.0133.1867.04.28.08l.46 1.98h1.36v-2.98c-.5333-.0934-1-.1534-1.4-.18-.4-.0267-.8333-.04-1.3-.04-.5866 0-1.1466.0666-1.68.2-.52.1333-.98.3533-1.38.66-.3866.2933-.7.68-.94 1.16-.2266.4666-.34 1.04-.34 1.72v1.12l-1.22.56v.92h1.22v8.1l-1.16.52v.86h6.24v-.86Zm1.041-8.62h1.56v6.38c0 1.1733.2666 2.02.8 2.54.5466.52 1.36.78 2.44.78.6133 0 1.1733-.0734 1.68-.22.52-.1334.94-.2934 1.26-.48v-1.04c-.12.0133-.28.0266-.48.04a7.6068 7.6068 0 0 1-.54.02c-.6 0-1.0067-.12-1.22-.36-.2-.2534-.3-.66-.3-1.22v-6.44h2.42v-1.48h-2.42v-2.54l-3.64.58v1.96l-1.56.54v.94Zm-43.6839 3.6268h-6.325v5.3202l1.0929 1.0964h5.2321v-6.4166Zm2.0167 0h6.325v5.3046l-1.264 1.112h-5.061v-6.4166Z"
				clipRule="evenodd"
			/>
		</g>
		<defs>
			<clipPath id="gift-badge">
				<path fill="#fff" d="M0 0h98v30H0z" />
			</clipPath>
		</defs>
	</svg>
);

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
		specificProductType.productType === 'contributions';

	const productBenefits =
		specificProductType.productType === 'supporterplus'
			? 'supporter benefits'
			: groupedProductType.friendlyName();

	const cardConfig =
		productCardConfiguration[specificProductType.productType];

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
				<Card.Header
					backgroundColor={cardConfig.headerColor}
					minHeightTablet
				>
					<h3 css={productTitleCss}>{productTitle}</h3>
					{isGifted && <GiftBadge />}
				</Card.Header>

				{cardConfig.showBenefitsSection && nextPaymentDetails && (
					<Card.Section backgroundColor="#edf5fA">
						<p css={benefitsTextCss}>
							You’re supporting the Guardian with a{' '}
							{nextPaymentDetails.paymentValue} per{' '}
							{nextPaymentDetails.paymentInterval} support and
							extra benefits.
						</p>
						<SupporterPlusBenefitsToggle />
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
								{nextPaymentDetails &&
									productDetail.subscription.autoRenew &&
									!hasCancellationPending && (
										<div>
											<dt>
												{nextPaymentDetails.paymentKey}
											</dt>
											<dd>
												{nextPaymentDetails.isNewPaymentValue && (
													<NewPaymentPriceAlert />
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
						<div css={buttonLayoutCss}>
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
											eventLabel: `manage_${groupedProductType.urlPart}`,
										});
										navigate(
											`/${groupedProductType.urlPart}`,
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
								<ThemeProvider
									theme={buttonThemeReaderRevenueBrand}
								>
									<Button
										size="small"
										cssOverrides={css`
											justify-content: center;
										`}
										onClick={() =>
											navigate(`/switch`, {
												state: {
													productDetail:
														productDetail,
													user: user,
												},
											})
										}
									>
										Change to monthly + extras
									</Button>
								</ThemeProvider>
							)}
						</div>
					</div>
				</Card.Section>
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
								<div css={buttonLayoutCss}>
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
			</Card>
		</Stack>
	);
};
