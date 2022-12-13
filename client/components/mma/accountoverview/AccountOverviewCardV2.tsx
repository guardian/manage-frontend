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
	SvgTickRound,
} from '@guardian/source-react-components';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { parseDate } from '../../../../shared/dates';
import type { ProductDetail } from '../../../../shared/productResponse';
import { getMainPlan, isGift } from '../../../../shared/productResponse';
import {
	GROUPED_PRODUCT_TYPES,
	PRODUCT_TYPES,
} from '../../../../shared/productTypes';
import { trackEvent } from '../../../utilities/analytics';
import { expanderButtonCss } from '../../shared/ExpanderButton';
import { ErrorIcon } from '../shared/assets/ErrorIcon';
import { CardDisplay } from '../shared/CardDisplay';
import { DirectDebitDisplay } from '../shared/DirectDebitDisplay';
import {
	getNextPaymentDetails,
	NewPaymentPriceAlert,
} from '../shared/NextPaymentDetails';
import { PaypalDisplay } from '../shared/PaypalDisplay';
import { SepaDisplay } from '../shared/SepaDisplay';

interface CardProps {
	heading: string;
	children: ReactNode;
}

const Card = (props: CardProps) => {
	const headingContainerCss = css`
		padding: ${space[3]}px ${space[4]}px;
		min-height: 64px;
		color: ${palette.neutral[100]};
		background-color: ${palette.brand[500]};

		${from.tablet} {
			min-height: 128px;
		}
	`;

	const headingCss = css`
		${headline.xxsmall({ fontWeight: 'bold' })};
		margin: 0;
		max-width: 20ch;

		${from.tablet} {
			${headline.small({ fontWeight: 'bold' })};
		}
	`;

	return (
		<div>
			<div css={headingContainerCss}>
				<h3 css={headingCss}>{props.heading}</h3>
			</div>
			{props.children}
		</div>
	);
};

Card.Section = (props: { children: ReactNode; backgroundColor?: string }) => {
	const sectionCss = css`
		padding: ${space[5]}px ${space[4]}px;
		border: 1px solid ${palette.neutral[86]};
		border-top: none;
		${props.backgroundColor &&
		`
			background-color: ${props.backgroundColor};
		`}
	`;

	return <div css={sectionCss}>{props.children}</div>;
};

export const AccountOverviewCardV2 = ({
	productDetail,
	isEligibleToSwitch,
}: {
	productDetail: ProductDetail;
	isEligibleToSwitch: boolean;
}) => {
	const navigate = useNavigate();
	const [showBenefits, setShowBenefits] = useState<boolean>(false);

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
		specificProductType === PRODUCT_TYPES.contributions;

	const sectionHeadingCss = css`
		${textSans.medium({ fontWeight: 'bold' })};
		margin-top: 0;
		margin-bottom: ${space[2]}px;
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

	const benefitsCss = css`
		${textSans.medium()};
		list-style: none;
		margin: ${space[5]}px 0 ${space[4]}px -4px;
		padding: 0;

		li + li {
			margin-top: ${space[2]}px;
		}

		li {
			display: flex;
			align-items: flex-start;
		}

		svg {
			flex-shrink: 0;
			margin-right: ${space[2]}px;
			fill: ${palette.brand[500]};
		}
	`;

	const benefitsButtonCss = css`
		${textSans.small()}
		margin-top: ${space[1]}px;
		padding: 0;
		color: ${palette.brand[500]};
		border-bottom: 1px solid ${palette.brand[500]};
	`;

	return (
		<Card heading={productTitle}>
			{specificProductType === PRODUCT_TYPES.supporterplus &&
				nextPaymentDetails && (
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
							{nextPaymentDetails.paymentInterval} support and
							extra benefits.
						</p>
						<ul
							id="benefits"
							css={benefitsCss}
							hidden={!showBenefits}
						>
							<li>
								<SvgTickRound size="small" />
								<span>
									<strong>
										A regular supporter newsletter.
									</strong>{' '}
									Get exclusive insight from our newsroom
								</span>
							</li>
							<li>
								<SvgTickRound size="small" />
								<span>
									<strong>Uninterrupted reading.</strong> See
									far fewer asks for support
								</span>
							</li>
							<li>
								<SvgTickRound size="small" />
								<span>
									<strong>
										Full access to our news app.
									</strong>{' '}
									Read our reporting on the go
								</span>
							</li>
							<li>
								<SvgTickRound size="small" />
								<span>
									<strong>Ad-free reading.</strong> Avoid ads
									on all your devices
								</span>
							</li>
						</ul>
						<button
							css={[
								expanderButtonCss()(showBenefits),
								benefitsButtonCss,
							]}
							type="button"
							aria-expanded={showBenefits}
							aria-controls="benefits"
							onClick={() => setShowBenefits(!showBenefits)}
						>
							{showBenefits ? 'hide' : 'view'} benefits
						</button>
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
