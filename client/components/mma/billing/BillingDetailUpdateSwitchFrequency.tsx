import { css } from '@emotion/react';
import {
	headlineBold28,
	palette,
	space,
	until,
} from '@guardian/source/foundations';
import { convertCurrencyToSymbol } from '@/client/utilities/currencyIso';
import type { FrequencyChangePreviewResponse } from '@/shared/frequencyChangeTypes';
import {
	type ProductType,
	type WithProductType,
} from '../../../../shared/productTypes';

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
	props: WithProductType<ProductType> & {
		annualSwitchPreview?: FrequencyChangePreviewResponse;
	},
) => {
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
			{props.annualSwitchPreview &&
				formatSavingsDisplay(
					props.annualSwitchPreview.savings.amount,
					props.annualSwitchPreview.savings.currency,
				)}
		</h3>
	);
};
