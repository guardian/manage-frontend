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
} from '@guardian/source-react-components';
import { useNavigate } from 'react-router';
import { parseDate } from '../../../../shared/dates';
import type {
	MembersDataApiUser,
	ProductDetail,
} from '../../../../shared/productResponse';
import { getMainPlan, isGift } from '../../../../shared/productResponse';
import type { ProductTypeKeys } from '../../../../shared/productTypes';
import { GROUPED_PRODUCT_TYPES } from '../../../../shared/productTypes';
import { trackEvent } from '../../../utilities/analytics';
import { ErrorIcon } from '../shared/assets/ErrorIcon';
import { Card } from '../shared/Card';
import { CardDisplay } from '../shared/CardDisplay';
import { DirectDebitDisplay } from '../shared/DirectDebitDisplay';
import { GridPicture } from '../shared/images/GridPicture';
import {
	getNextPaymentDetails,
	NewPaymentPriceAlert,
} from '../shared/NextPaymentDetails';
import { PaypalDisplay } from '../shared/PaypalDisplay';
import { SepaDisplay } from '../shared/SepaDisplay';
import { SupporterPlusBenefitsToggle } from '../shared/SupporterPlusBenefits';

interface ProductCardConfiguration {
	headerColor: string;
	headerImageId?: string;
	showBenefitsSection?: boolean;
}

const productCardConfiguration: {
	[productType in ProductTypeKeys]: ProductCardConfiguration;
} = {
	contributions: {
		headerColor: palette.brand[600],
	},
	supporterplus: {
		headerColor: palette.brand[500],
		showBenefitsSection: true,
	},
	digipack: {
		headerColor: '#ff663d',
	},
	digitalvoucher: {
		headerColor: palette.sport[500],
	},
	newspaper: {
		headerColor: palette.sport[500],
	},
	homedelivery: {
		headerColor: palette.sport[500],
	},
	voucher: {
		headerColor: palette.sport[500],
	},
	guardianweekly: {
		headerColor: '#5f8085',
	},
	membership: {
		headerColor: palette.lifestyle[300],
	},
	guardianpatron: {
		headerColor: palette.sport[300],
	},
};

export const AccountOverviewCardV2 = ({
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

	return (
		<Card>
			<Card.Header
				backgroundColor={cardConfig.headerColor}
				minHeightTablet
			>
				<div
					css={css`
						display: flex;
						justify-content: space-between;
					`}
				>
					<h3 css={productTitleCss}>{productTitle}</h3>
					{cardConfig.headerImageId && (
						<GridPicture
							cssOverrides={css`
								margin-top: -${space[3] + 16}px;
								margin-bottom: -${space[3]}px;
								max-height: 80px;
								${from.tablet} {
									max-height: 144px;
								}
							`}
							sources={[
								{
									gridId: cardConfig.headerImageId,
									srcSizes: [497, 285],
									imgType: 'png',
									sizes: '100vw',
									media: '(max-width: 220px)',
								},
							]}
							fallback={cardConfig.headerImageId}
							fallbackSize={497}
							altText=""
							fallbackImgType="png"
						/>
					)}
				</div>
			</Card.Header>

			{cardConfig.showBenefitsSection && nextPaymentDetails && (
				<Card.Section backgroundColor="#edf5fA">
					<p
						css={css`
							${textSans.medium()}
							margin: 0;
							max-width: 35ch;
						`}
					>
						You’re supporting the Guardian with a{' '}
						{nextPaymentDetails.paymentValue} per{' '}
						{nextPaymentDetails.paymentInterval} support and extra
						benefits.
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
									{productDetail.subscription.subscriptionId}
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
										{parseDate(giftPurchaseDate).dateStr()}
									</dd>
								</div>
							)}
							{specificProductType.showTrialRemainingIfApplicable &&
								productDetail.subscription.trialLength > 0 &&
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
									navigate(`/${groupedProductType.urlPart}`, {
										state: {
											productDetail: productDetail,
										},
									});
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
												productDetail: productDetail,
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
							<div
								css={css`
									${textSans.medium()};
								`}
							>
								{productDetail.subscription.card && (
									<CardDisplay
										inErrorState={hasPaymentFailure}
										cssOverrides={css`
											margin: 0;
										`}
										{...productDetail.subscription.card}
									/>
								)}
								{productDetail.subscription.payPalEmail && (
									<PaypalDisplay
										inline={true}
										payPalId={
											productDetail.subscription
												.payPalEmail
										}
									/>
								)}
								{productDetail.subscription.sepaMandate && (
									<SepaDisplay
										inline={true}
										accountName={
											productDetail.subscription
												.sepaMandate.accountName
										}
										iban={
											productDetail.subscription
												.sepaMandate.iban
										}
									/>
								)}
								{productDetail.subscription.mandate && (
									<DirectDebitDisplay
										inline={true}
										{...productDetail.subscription.mandate}
									/>
								)}
								{productDetail.subscription
									.stripePublicKeyForCardAddition && (
									<span>No Payment Method</span>
								)}
							</div>
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
											eventCategory: 'account_overview',
											eventAction: 'click',
											eventLabel: 'manage_payment_method',
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
	);
};
