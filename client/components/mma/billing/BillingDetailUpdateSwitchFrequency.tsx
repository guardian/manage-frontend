import { css } from '@emotion/react';
import {
	headlineBold28,
	palette,
	space,
	until,
} from '@guardian/source/foundations';
import { useContext } from 'react';
import { useLocation } from 'react-router';
import { convertCurrencyToSymbol } from '@/client/utilities/currencyIso';
import type {
	BillingFrequencySwitchPreview,
	BillingFrequencySwitchPreviewState,
} from '@/shared/billingFrequencySwitchTypes';
import type { ProductDetail } from '@/shared/productResponse';
import type { ProductType, WithProductType } from '@/shared/productTypes';
import type { BillingUpdateContextInterface } from './BillingDetailUpdateContainer';
import { BillingUpdateContext } from './BillingDetailUpdateContainer';

const subHeadingCss = css`
	border-top: 1px solid ${palette.neutral['93']};
	padding-top: ${space[3]}px;
	${headlineBold28};
	margin-top: 50px;
	${until.tablet} {
		font-size: 1.25rem;
		line-height: 1.6;
	} ;
`;

const BillingDetailUpdateSwitchFrequencyDisplay = ({
	productType,
	productDetail,
	isFromApp,
	preview,
}: {
	productType: ProductType;
	productDetail: ProductDetail;
	isFromApp?: boolean;
	preview: BillingFrequencySwitchPreview;
}) => {
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
				)}
			</h3>
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

export const BillingDetailUpdateSwitchFrequency = (
	_props: WithProductType<ProductType>,
) => {
	const { productDetail, isFromApp } = useContext(
		BillingUpdateContext,
	) as BillingUpdateContextInterface;

	const { state } = useLocation();
	const routerState = state as BillingFrequencySwitchPreviewState | undefined;
	const preview = routerState?.preview;

	return (
		<>
			{preview ? (
				<BillingDetailUpdateSwitchFrequencyDisplay
					productType={_props.productType}
					productDetail={productDetail}
					isFromApp={isFromApp}
					preview={preview}
				/>
			) : (
				<h1>loading</h1>
			)}
		</>
	);
};
