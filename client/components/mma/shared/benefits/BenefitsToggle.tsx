import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { useState } from 'react';
import type { SubscriptionPlan } from '@/shared/productResponse';
import { isPaidSubscriptionPlan } from '@/shared/productResponse';
import {
	PRODUCT_TYPES,
	type ProductTypeKeys,
} from '../../../../../shared/productTypes';
import { expanderButtonCss } from '../../../shared/ExpanderButton';
import {
	benefitsConfiguration,
	filterBenefitByRegion,
} from './BenefitsConfiguration';
import { BenefitsSection } from './BenefitsSection';
import { benefitsButtonCss } from './BenefitsStyles';

type BenfitsToggleProps = {
	productType: ProductTypeKeys;
	subscriptionPlan: SubscriptionPlan;
	alwaysShowBenefits?: boolean;
	showProductTypeShortFriendlyName?: boolean;
};

export const BenefitsToggle = ({
	productType,
	subscriptionPlan,
	alwaysShowBenefits = false,
	showProductTypeShortFriendlyName = false,
}: BenfitsToggleProps) => {
	const currencyIso = isPaidSubscriptionPlan(subscriptionPlan)
		? subscriptionPlan.currencyISO
		: '';

	const [showBenefits, setShowBenefits] =
		useState<boolean>(alwaysShowBenefits);
	const benefits = benefitsConfiguration[productType].filter((benefit) =>
		filterBenefitByRegion(benefit, currencyIso),
	);

	return (
		<>
			{!alwaysShowBenefits && (
				<button
					css={[expanderButtonCss()(showBenefits), benefitsButtonCss]}
					type="button"
					aria-expanded={showBenefits}
					aria-controls="benefits"
					onClick={() => setShowBenefits(!showBenefits)}
				>
					{showBenefits ? 'hide' : 'view'}
					{showProductTypeShortFriendlyName &&
						` your ${PRODUCT_TYPES[productType].shortFriendlyName}`}{' '}
					benefits
				</button>
			)}
			<div
				css={css`
					margin: 0;
					margin-top: ${space[4]}px;
				`}
				hidden={!showBenefits}
			>
				<BenefitsSection benefits={benefits} />
			</div>
		</>
	);
};
