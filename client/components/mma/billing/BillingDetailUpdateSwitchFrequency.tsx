import { css } from '@emotion/react';
import {
	headlineBold28,
	palette,
	space,
	until,
} from '@guardian/source/foundations';
import { useLocation } from 'react-router';
import { convertCurrencyToSymbol } from '@/client/utilities/currencyIso';
import type { BillingFrequencyChangePreview } from '@/shared/billingFrequencyChangeTypes';
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
	const preview = state as BillingFrequencyChangePreview;
	const formatSavingsDisplay = (amount: number, currency: string) => {
		const symbol = convertCurrencyToSymbol(currency);
		// Amount from savings expected already in major units, display without trailing ISO for consistency with existing promo patterns
		return symbol ? `${symbol}${amount}` : `${amount} ${currency}`;
	};

	return (
		<h3
			css={css`
				${subHeadingCss}
			`}
		>
			Switch to an annual plan and save{' '}
			{preview &&
				formatSavingsDisplay(
					preview.savings.amount,
					preview.savings.currency,
				)}
		</h3>
	);
};
