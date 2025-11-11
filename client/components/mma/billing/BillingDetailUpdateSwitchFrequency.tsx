import { css } from '@emotion/react';
import {
	headlineBold28,
	palette,
	space,
	textSans17,
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
import type {
	BillingFrequencySwitchPreview,
	BillingFrequencySwitchPreviewState,
} from '@/shared/billingFrequencySwitchTypes';
import { getMainPlan, type ProductDetail } from '@/shared/productResponse';
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
	} ;
`;

const BillingDetailUpdateSwitchFrequencyDisplay = () => {
	const { productType, productDetail, isFromApp, preview } = useContext(
		BillingDetailUpdateSwitchFrequencyContext,
	) as BillingDetailUpdateSwitchFrequencyContextInterface;

	const mainPlan = getMainPlan(productDetail.subscription);

	const formatSavingsDisplay = (amount: number, currency: string) => {
		const symbol = convertCurrencyToSymbol(currency);
		// Amount from savings expected already in major units, display without trailing ISO for consistency with existing promo patterns
		return symbol ? `${symbol}${amount}` : `${amount} ${currency}`;
	};

	return (
		<>
			<h3
				css={css`
					${subHeadingCss}
				`}
			>
				Switch to an annual plan and save{' '}
				{formatSavingsDisplay(
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
