import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	headlineBold28,
	palette,
	space,
	textSans15,
	textSans17,
	textSansBold12,
	textSansBold15,
	textSansBold17,
	textSansBold20,
	textSansBold24,
	textSansBold28,
	until,
} from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import type { Context } from 'react';
import { createContext, useContext, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { convertCurrencyToSymbol } from '@/client/utilities/currencyIso';
import {
	changeSubscriptionBillingFrequencyFetch,
	isMonthlySubscription,
} from '@/client/utilities/productUtils';
import { formatAmount } from '@/client/utilities/utils';
import type {
	BillingFrequencySwitchPreview,
	BillingFrequencySwitchPreviewState,
} from '@/shared/billingFrequencySwitchTypes';
import { getCorrectArticle } from '@/shared/generalTypes';
import {
	formatDate,
	getMainPlan,
	isPaidSubscriptionPlan,
	type ProductDetail,
} from '@/shared/productResponse';
import type { ProductType, WithProductType } from '@/shared/productTypes';
import { GenericErrorScreen } from '../../shared/GenericErrorScreen';
import { PaypalLogo } from '../shared/assets/PaypalLogo';
import { AsyncLoader } from '../shared/AsyncLoader';
import { BenefitsToggle } from '../shared/benefits/BenefitsToggle';
import { CardDisplay } from '../shared/CardDisplay';
import { DirectDebitDisplay } from '../shared/DirectDebitDisplay';
import { SepaDisplay } from '../shared/SepaDisplay';
import type { BillingUpdateContextInterface } from './BillingDetailUpdateContainer';
import { BillingUpdateContext } from './BillingDetailUpdateContainer';

const subHeadingCss = css`
	border-top: 1px solid ${palette.neutral['93']};
	padding-top: ${space[3]}px;
	${headlineBold28};
	margin-top: 50px;
	margin-bottom: ${space[3]}px;
	${until.tablet} {
		font-size: 1.25rem;
		line-height: 1.6;
	}
	${until.mobileLandscape} {
		${headlineBold24};
		margin-top: 0px;
		padding-top: ${space[4]}px;
		border-top: none;
	}
`;

const comparisonCardHeaderLabelCss = css`
	${textSans15};
`;
const comparisonCardHeaderPlanCss = css`
	${textSansBold17}
	${from.mobileLandscape} {
		${textSansBold20}
	}
`;
const comparisonCardHeaderPriceCss = css`
	${textSansBold24}
	${from.mobileLandscape} {
		${textSansBold28}
	}
`;

const BillingDetailUpdateSwitchFrequencyDisplaySuccess = () => {
	const navigate = useNavigate();
	const { productDetail } = useContext(
		BillingDetailUpdateSwitchFrequencyContext,
	) as BillingDetailUpdateSwitchFrequencyContextInterface;

	const getNewPlanStartDate = () => {
		return formatDate(productDetail.subscription.renewalDate);
	};

	return (
		<>
			<h3
				css={css`
					${subHeadingCss}
				`}
			>
				You've successfully updated your billing preferences
			</h3>
			<p
				css={css`
					${textSans17}
				`}
				role="status"
				aria-live="polite"
			>
				You'll receive a confirmation email shortly. Your next billing
				date will be {getNewPlanStartDate()}. You can cancel anytime.
			</p>
			<p
				css={css`
					${textSans17}
				`}
			>
				Thank you! Your valued support helps power independent
				journalism.
			</p>
			<div
				className="actions"
				css={css`
					display: flex;
					margin-top: ${space[3]}px;
					gap: ${space[3]}px;
					justify-content: flex-end;
				`}
				role="group"
				aria-label="Navigation buttons"
			>
				<Button priority="tertiary" onClick={() => navigate('/')}>
					Back to account overview
				</Button>
				<Button
					priority="primary"
					onClick={() => {
						window.location.href = 'https://theguardian.com';
					}}
					aria-label="Continue reading The Guardian - opens new window"
				>
					Continue reading the Guardian
				</Button>
			</div>
		</>
	);
};

const BillingDetailUpdateSwitchFrequencyDisplayForm = ({
	onProcessingEnd,
}: {
	onProcessingEnd: (result: boolean) => void;
}) => {
	const [processingSwitch, setProcessingSwitch] = useState<boolean>(false);

	const navigate = useNavigate();
	const { productType, productDetail, preview } = useContext(
		BillingDetailUpdateSwitchFrequencyContext,
	) as BillingDetailUpdateSwitchFrequencyContextInterface;
	const isMonthlySub = isMonthlySubscription(productDetail);
	const mainPlan = getMainPlan(productDetail.subscription);

	const formatAmountDisplay = (amount: number, currency: string) => {
		const symbol = convertCurrencyToSymbol(currency);
		return symbol ? `${symbol}${amount}` : `${amount} ${currency}`;
	};

	const getCurrentPriceDisplay = () => {
		if (
			isPaidSubscriptionPlan(mainPlan) &&
			mainPlan.price !== undefined &&
			mainPlan.currency !== undefined
		) {
			// Price is stored in cents/pence, divide by 100 for display
			const displayPrice = formatAmount(mainPlan.price / 100);
			return `${mainPlan.currency}${displayPrice}`;
		}
		return '—'; // fallback if price data is not available
	};

	const getNewPriceDisplay = () => {
		return formatAmountDisplay(
			preview.newPrice.amount,
			preview.newPrice.currency,
		);
	};

	const getNewPlanStartDate = () => {
		return formatDate(
			productDetail.subscription.nextPaymentDate ??
				productDetail.subscription.renewalDate,
		);
	};

	const processSwitch = () => {
		setProcessingSwitch(true);
		changeSubscriptionBillingFrequencyFetch(
			productDetail.isTestUser,
			productDetail.subscription.subscriptionId,
			false,
			isMonthlySub ? 'Annual' : 'Month',
		)
			.then(() => {
				onProcessingEnd(true);
			})
			.catch(() => {
				/* swallow errors: non-critical UI enhancement */
				onProcessingEnd(false);
			});
	};

	return (
		<>
			<h3
				css={css`
					${subHeadingCss}
				`}
			>
				Switch to an {isMonthlySub ? 'annual' : 'monthly'} plan and save{' '}
				{formatAmountDisplay(
					preview.savings.amount,
					preview.savings.currency,
				)}{' '}
				a year
			</h3>
			<p
				css={css`
					${textSans17}
				`}
			>
				Enjoy the same benefits and keep supporting independent
				journalism.
			</p>
			<BenefitsToggle
				productType={productType.productType}
				subscriptionPlan={mainPlan}
				showProductTypeShortFriendlyName={true}
			/>

			<div
				className="comparison-card"
				css={css`
					margin-top: ${space[5]}px;
					border-radius: ${space[2]}px;
					padding: 0px;
					${from.mobileLandscape} {
						background-color: ${palette.brand['800']};
						padding: ${space[4]}px;
					}
				`}
				role="region"
				aria-label="Billing plan comparison"
			>
				<div
					className="comparison-card-header"
					css={css`
						display: flex;
						flex-direction: column;
						padding: ${space[5]}px;
						gap: ${space[5]}px;
						background-color: ${palette.brand['800']};
						border-radius: ${space[2]}px;
						position: relative;
						z-index: 1;
						${from.mobileLandscape} {
							background-color: none;
							border-radius: 0;
							flex-direction: row;
							align-items: flex-end;
							padding: ${space[2]}px ${space[5]}px ${space[6]}px
								${space[6]}px;
							gap: ${space[4]}px;
							position: static;
							z-index: auto;
						}
					`}
				>
					<div
						className="comparison-card-header-description"
						css={css`
							flex: 1;
						`}
					>
						<div
							css={css`
								${comparisonCardHeaderLabelCss}
							`}
							aria-label="Current plan section"
						>
							Current
						</div>
						<div
							css={css`
								${comparisonCardHeaderPlanCss}
							`}
						>
							{productType.productTitle()}
							{` (${isMonthlySub ? 'monthly' : 'annual'})`}
						</div>
					</div>
					<div
						className="comparison-card-header-price"
						css={css`
							${comparisonCardHeaderPriceCss}
						`}
						aria-label={`Current price: ${getCurrentPriceDisplay()}/${
							isMonthlySub ? 'month' : 'year'
						}`}
					>
						{getCurrentPriceDisplay()}/
						{isMonthlySub ? 'month' : 'year'}
					</div>
				</div>
				<div
					className="comparison-card-content"
					css={css`
						border-radius: ${space[2]}px;
						border-top-left-radius: 0;
						border-top-right-radius: 0;
						border-left: 1px solid ${palette.neutral['73']};
						border-right: 1px solid ${palette.neutral['73']};
						border-bottom: 1px solid ${palette.neutral['73']};
						padding: ${space[6] + 8}px ${space[5]}px ${space[5]}px
							${space[5]}px;
						position: relative;
						top: -8px;
						${from.mobileLandscape} {
							background-color: ${palette.neutral['100']};
							padding: ${space[6]}px;
							border: none;
							border-top-left-radius: ${space[2]}px;
							border-top-right-radius: ${space[2]}px;
							position: static;
							top: 0;
						}
					`}
				>
					<div
						className="comparison-card-content-header"
						css={css`
							display: flex;
							flex-direction: column;
							gap: ${space[5]}px;
							${from.mobileLandscape} {
								flex-direction: row;
								align-items: flex-end;
								gap: ${space[4]}px;
							}
						`}
					>
						<div
							className="comparison-card-content-header-description"
							css={css`
								flex: 1;
							`}
						>
							<div
								css={css`
									${comparisonCardHeaderLabelCss}
								`}
								aria-label="New plan section"
							>
								New
							</div>
							<div
								css={css`
									${comparisonCardHeaderPlanCss}
								`}
							>
								{productType.productTitle()}
								{` (${
									!isMonthlySub ? 'monthly' : 'annual'
								})`}{' '}
								<span
									css={css`
										${textSansBold12};
										color: ${palette.sport['800']};
										background: ${palette.brand['500']};
										padding: ${space[0]}px ${space[1]}px;
										border-radius: ${space[1]}px;
										white-space: nowrap;
									`}
									aria-label={`Savings: ${formatAmountDisplay(
										preview.savings.amount,
										preview.savings.currency,
									)}`}
								>
									Save{' '}
									{formatAmountDisplay(
										preview.savings.amount,
										preview.savings.currency,
									)}
								</span>
							</div>
						</div>
						<div
							className="comparison-card-content-header-price"
							css={css`
								${comparisonCardHeaderPriceCss}
							`}
							aria-label={`New price: ${getNewPriceDisplay()}/${
								!isMonthlySub ? 'month' : 'year'
							}`}
						>
							{getNewPriceDisplay()}/
							{!isMonthlySub ? 'month' : 'year'}
						</div>
					</div>
					<div
						className="comparison-card-content-equivalence"
						css={css`
							display: flex;
							${from.mobileLandscape} {
								justify-content: flex-end;
							}
						`}
					>
						<div
							className="comparison-card-content-equivalence-value"
							css={css`
								${textSans15};
								color: ${palette.neutral['46']};
								${from.mobileLandscape} {
									margin-top: ${space[0]}px;
								}
							`}
						>
							Equivalent to{' '}
							<span
								css={css`
									color: ${palette.brand['500']};
								`}
								aria-label={`Monthly equivalent: ${formatAmountDisplay(
									preview.newPrice.amount / 12,
									preview.newPrice.currency,
								)}`}
							>
								{formatAmountDisplay(
									preview.newPrice.amount / 12,
									preview.newPrice.currency,
								)}
								/{isMonthlySub ? 'month' : 'year'}
							</span>
						</div>
					</div>
					<div
						className="comparison-card-content-payment"
						css={css`
							margin-top: ${space[6]}px;
						`}
					>
						<div
							className="comparison-card-content-payment-start"
							css={css`
								${textSansBold15};
							`}
						>
							Your new plan starts on:{' '}
							<span
								css={css`
									${textSans15};
								`}
								aria-label={`Start date: ${getNewPlanStartDate()}`}
							>
								{getNewPlanStartDate()}
							</span>
						</div>
						<div
							className="comparison-card-content-payment-method"
							css={css`
								margin-top: ${space[0]}px;
								display: flex;
								align-items: center;
							`}
						>
							<div
								css={css`
									${textSansBold15};
									margin-right: ${space[1]}px;
								`}
							>
								Payment method:
							</div>
							<div
								css={css`
									${textSans15};
									display: flex;
									align-items: center;
									gap: 3px;
								`}
								role="group"
								aria-label="Payment method details"
							>
								{productDetail.subscription.card && (
									<CardDisplay
										cssOverrides={css`
											margin: 0;
										`}
										inErrorState={!!productDetail.alertText}
										{...productDetail.subscription.card}
									/>
								)}
								{productDetail.subscription.payPalEmail && (
									<span
										aria-label={`PayPal payment method: ${productDetail.subscription.payPalEmail}`}
									>
										<PaypalLogo />
									</span>
								)}
								{productDetail.subscription.mandate && (
									<DirectDebitDisplay
										inErrorState={!!productDetail.alertText}
										onlyAccountEnding={true}
										{...productDetail.subscription.mandate}
									/>
								)}
								{productDetail.subscription.sepaMandate && (
									<SepaDisplay
										inline={true}
										{...productDetail.subscription
											.sepaMandate}
									/>
								)}
								{productDetail.subscription
									.stripePublicKeyForCardAddition && (
									<span>No Payment Method</span>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className="legal-information"
				css={css`
					margin-top: ${space[2]}px;
					border-radius: ${space[2]}px;
					padding: ${space[3]}px;
					background-color: ${palette.neutral['97']};
					${textSans15};
					color: ${palette.neutral['7']};
				`}
				role="region"
				aria-label="Terms and conditions"
			>
				<p>
					By proceeding, you agree to switch to{' '}
					{getCorrectArticle(productType.shortFriendlyName ?? '')}{' '}
					{productType.shortFriendlyName}{' '}
					{!isMonthlySub ? 'monthly' : 'annual'} plan that will
					auto-renew each {!isMonthlySub ? 'month' : 'year'}, unless
					you cancel.
				</p>
				<p>
					Your first payment will be taken on {getNewPlanStartDate()}.
					You will be charged the subscription amount using your
					chosen payment method at each renewal, at the rate then in
					effect, unless you cancel before the renewal date. You can
					cancel{' '}
					<button
						css={css`
							background: none;
							border: none;
							cursor: pointer;
							text-decoration: underline;
							padding: 0;
							font: inherit;
							&:hover,
							&:visited,
							&:focus {
								color: inherit;
							}
						`}
						onClick={() => {
							navigate(`/cancel/${productType.urlPart}`, {
								state: { productDetail },
							});
						}}
						aria-label="Cancel your subscription"
					>
						here
					</button>
					.
				</p>
				<p
					css={css`
						margin-bottom: 0px;
					`}
				>
					Our{' '}
					<a
						href="https://www.theguardian.com/info/2022/oct/28/the-guardian-supporter-plus-terms-and-conditions"
						css={css`
							${textSansBold15}
							text-decoration: underline;
							color: inherit;
							&:hover,
							&:visited,
							&:focus {
								color: inherit;
							}
						`}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Terms and Conditions, opens in new window"
					>
						Terms and Conditions
					</a>{' '}
					continue to apply.
				</p>
			</div>
			<div
				className="actions"
				css={css`
					display: flex;
					margin-top: ${space[3]}px;
					gap: ${space[3]}px;
					justify-content: flex-end;
					${until.mobileLandscape} {
						flex-direction: column-reverse;
					}
				`}
				role="group"
				aria-label="Action buttons"
			>
				<Button
					disabled={processingSwitch}
					priority="tertiary"
					onClick={() => {
						navigate(`/${productType.urlPart}`, {
							state: { productDetail },
						});
					}}
					aria-label={`Stay with ${
						isMonthlySub ? 'monthly' : 'annual'
					} plan`}
				>
					Stay with {isMonthlySub ? 'monthly' : 'annual'} plan
				</Button>
				<Button
					disabled={processingSwitch}
					isLoading={processingSwitch}
					priority="primary"
					onClick={() => {
						processSwitch();
					}}
					aria-label={`Confirm ${
						!isMonthlySub ? 'monthly' : 'annual'
					} plan - ${
						processingSwitch ? 'processing' : 'ready to submit'
					}`}
					aria-busy={processingSwitch}
				>
					Confirm {!isMonthlySub ? 'monthly' : 'annual'} plan
				</Button>
			</div>
		</>
	);
};

const BillingDetailUpdateSwitchFrequencyDisplay = () => {
	const [stage, setStage] = useState<'form' | 'success' | 'error'>('form');
	return (
		<>
			{stage === 'form' && (
				<BillingDetailUpdateSwitchFrequencyDisplayForm
					onProcessingEnd={(result: boolean) => {
						if (result) {
							setStage('success');
						} else {
							setStage('error');
						}
					}}
				/>
			)}
			{stage === 'success' && (
				<BillingDetailUpdateSwitchFrequencyDisplaySuccess />
			)}
			{stage === 'error' && (
				<GenericErrorScreen loggingMessage="It was not possible to change billing frequency." />
			)}
		</>
	);
};

const renderContext =
	(
		productType: ProductType,
		productDetail: ProductDetail,
		isFromApp?: boolean,
	) =>
	(preview: BillingFrequencySwitchPreview) => {
		return (
			<BillingDetailUpdateSwitchFrequencyContext.Provider
				value={{
					productType,
					productDetail,
					isFromApp,
					preview,
				}}
			>
				<BillingDetailUpdateSwitchFrequencyDisplay />
			</BillingDetailUpdateSwitchFrequencyContext.Provider>
		);
	};
const createPreviewFetcher =
	(productDetail: ProductDetail) => (): Promise<Response> => {
		return changeSubscriptionBillingFrequencyFetch(
			productDetail.isTestUser,
			productDetail.subscription.subscriptionId,
			true,
			isMonthlySubscription(productDetail) ? 'Annual' : 'Month',
		);
	};

class BillingFrequencySwitchPreviewAsyncLoader extends AsyncLoader<BillingFrequencySwitchPreview> {}

interface BillingDetailUpdateSwitchFrequencyContextInterface {
	productType: ProductType;
	productDetail: ProductDetail;
	isFromApp?: boolean;
	preview: BillingFrequencySwitchPreview;
}
const BillingDetailUpdateSwitchFrequencyContext: Context<BillingDetailUpdateSwitchFrequencyContextInterface | null> =
	createContext<BillingDetailUpdateSwitchFrequencyContextInterface | null>(
		null,
	);

export const BillingDetailUpdateSwitchFrequency = (
	props: WithProductType<ProductType>,
) => {
	const { productDetail, isFromApp } = useContext(
		BillingUpdateContext,
	) as BillingUpdateContextInterface;

	const { state } = useLocation();
	const routerState = state as BillingFrequencySwitchPreviewState | undefined;
	const preview = routerState?.preview;

	if (!isMonthlySubscription(productDetail)) {
		// If not monthly, no switch preview to show, redirect to root
		// TODO: handle this case better in future - perhaps show an error message?
		return <Navigate to="/" />;
	}

	return (
		<>
			{preview ? (
				<BillingDetailUpdateSwitchFrequencyContext.Provider
					value={{
						productType: props.productType,
						productDetail,
						isFromApp,
						preview,
					}}
				>
					<BillingDetailUpdateSwitchFrequencyDisplay />
				</BillingDetailUpdateSwitchFrequencyContext.Provider>
			) : (
				<BillingFrequencySwitchPreviewAsyncLoader
					fetch={createPreviewFetcher(productDetail)}
					render={renderContext(
						props.productType,
						productDetail,
						isFromApp,
					)}
					loadingMessage={`Retrieving switch billing frequency preview for your ${props.productType.friendlyName}...`}
				/>
			)}
		</>
	);
};
