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
	textSansBold17,
	textSansBold20,
	textSansBold24,
	textSansBold28,
	until,
} from '@guardian/source/foundations';
import type { Context } from 'react';
import { createContext, useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
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
import {
	getMainPlan,
	isPaidSubscriptionPlan,
	type ProductDetail,
} from '@/shared/productResponse';
import type { ProductType, WithProductType } from '@/shared/productTypes';
import { AsyncLoader } from '../shared/AsyncLoader';
import { BenefitsToggle } from '../shared/benefits/BenefitsToggle';
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

const BillingDetailUpdateSwitchFrequencyDisplay = () => {
	const { productType, productDetail, isFromApp, preview } = useContext(
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
									`}
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
						>
							{getNewPriceDisplay()}/
							{!isMonthlySub ? 'month' : 'year'}
						</div>
					</div>
				</div>
			</div>

			<p>
				{productType.friendlyName} annual plans are billed once a year
				{isFromApp ? ' through the app store' : ''}, giving you peace of
				mind for the year ahead.
				{productDetail.subscription.autoRenew
					? ' Your current subscription is set to auto-renew, so switching to an annual plan will update your renewal settings.'
					: ''}
			</p>
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
