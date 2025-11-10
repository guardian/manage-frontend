import { css } from '@emotion/react';
import {
	headlineBold28,
	palette,
	space,
	until,
} from '@guardian/source/foundations';
import { useLocation } from 'react-router';
import { convertCurrencyToSymbol } from '@/client/utilities/currencyIso';
import type { BillingFrequencySwitchPreviewState } from '@/shared/billingFrequencySwitchTypes';
import type { ProductType, WithProductType } from '@/shared/productTypes';

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

export const BillingDetailUpdateSwitchFrequency = (
	_props: WithProductType<ProductType>,
) => {
	const { state } = useLocation();
	const routerState = state as BillingFrequencySwitchPreviewState | undefined;
	const formatSavingsDisplay = (amount: number, currency: string) => {
		const symbol = convertCurrencyToSymbol(currency);
		// Amount from savings expected already in major units, display without trailing ISO for consistency with existing promo patterns
		return symbol ? `${symbol}${amount}` : `${amount} ${currency}`;
	};

	return (
		<>
			{routerState && routerState.preview ? (
				<h3
					css={css`
						${subHeadingCss}
					`}
				>
					Switch to an annual plan and save{' '}
					{routerState.preview &&
						formatSavingsDisplay(
							routerState.preview.savings.amount,
							routerState.preview.savings.currency,
						)}
				</h3>
			) : (
				<h1>loading</h1>
			)}
		</>
	);
};
