import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { useState } from 'react';
import type { ProductTypeKeys } from '../../../../../shared/productTypes';
import { expanderButtonCss } from '../../../shared/ExpanderButton';
import { benefitsConfiguration } from './BenefitsConfiguration';
import { BenefitsSection } from './BenefitsSection';
import { benefitsButtonCss } from './BenefitsStyles';

export const BenefitsToggle = (props: { productType: ProductTypeKeys }) => {
	const [showBenefits, setShowBenefits] = useState<boolean>(false);
	const benefits = benefitsConfiguration[props.productType];

	return (
		<>
			<div
				css={css`
					margin: ${space[5]}px 0 ${space[4]}px 0;
				`}
				hidden={!showBenefits}
			>
				<BenefitsSection benefits={benefits} />
			</div>
			<button
				css={[expanderButtonCss()(showBenefits), benefitsButtonCss]}
				type="button"
				aria-expanded={showBenefits}
				aria-controls="benefits"
				onClick={() => setShowBenefits(!showBenefits)}
			>
				{showBenefits ? 'hide' : 'view'} benefits
			</button>
		</>
	);
};
