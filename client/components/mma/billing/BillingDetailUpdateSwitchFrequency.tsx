import { css } from '@emotion/react';
import {
	headlineBold28,
	palette,
	space,
	until,
} from '@guardian/source/foundations';
import { useLocation } from 'react-router-dom';
import { convertCurrencyToSymbol } from '@/client/utilities/currencyIso';
import {
	type ProductType,
	type WithProductType,
} from '../../../../shared/productTypes';
import type { LinkButtonState } from '../shared/Buttons';

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
	const location = useLocation();
	const state = location.state as
		| (LinkButtonState & {
				annualSwitchPreview?: {
					savings?: {
						amount?: number;
						currency?: string;
						period?: string;
					};
				};
		  })
		| undefined;
	const savings = state?.annualSwitchPreview?.savings;
	const savingsDisplay =
		savings?.amount && savings?.currency
			? `${
					convertCurrencyToSymbol(savings.currency) ??
					savings.currency
			  }${savings.amount} a year`
			: '£24 a year'; // fallback to existing static copy
	return (
		<h3
			css={css`
				${subHeadingCss}
			`}
		>
			Switch to an annual plan and save {savingsDisplay}
		</h3>
	);
};
