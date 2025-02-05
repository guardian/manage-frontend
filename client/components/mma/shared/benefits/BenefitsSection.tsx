import { css } from '@emotion/react';
import { textSans15 } from '@guardian/source/foundations';
import {
	Hide,
	SvgCrossRoundFilled,
	SvgTickRound,
} from '@guardian/source/react-components';
import type { ProductBenefit } from './BenefitsConfiguration';
import { benefitsCss, unavailableBenefitsCss } from './BenefitsStyles';

interface BenefitsSectionProps {
	benefits: ProductBenefit[];
	small?: true;
}

const Benefit = ({
	benefit,
	small,
}: {
	benefit: ProductBenefit;
	small?: boolean;
}) => {
	return (
		<li css={benefit.isUnavailable ? unavailableBenefitsCss : ''}>
			{benefit.isUnavailable ? (
				<SvgCrossRoundFilled
					isAnnouncedByScreenReader
					size={small ? 'xsmall' : 'small'}
				/>
			) : (
				<SvgTickRound
					isAnnouncedByScreenReader
					size={small ? 'xsmall' : 'small'}
				/>
			)}
			<span>
				{benefit.name && (
					<>
						<strong>{benefit.name}</strong>
						<Hide from="tablet">
							<br />
						</Hide>{' '}
					</>
				)}
				{benefit.description}
			</span>
		</li>
	);
};

export const BenefitsSection = ({ benefits, small }: BenefitsSectionProps) => {
	return (
		<ul
			id="benefits"
			css={[
				benefitsCss,
				small &&
					css`
						${textSans15}
					`,
			]}
		>
			{benefits.map((benefit, benefitIndex) => (
				<Benefit
					key={`benefit-${benefitIndex}`}
					benefit={benefit}
					small={!!small}
				/>
			))}
		</ul>
	);
};
