import {
	Hide,
	SvgCrossRound,
	SvgTickRound,
} from '@guardian/source/react-components';
import type { ProductBenefit } from './BenefitsConfiguration';
import { benefitsCss, unavailableBenefitsCss } from './BenefitsStyles';

interface BenefitsSectionProps {
	benefits: ProductBenefit[];
}

const Benefit = ({ benefit }: { benefit: ProductBenefit }) => {
	return (
		<li css={benefit.isUnavailable ? unavailableBenefitsCss : ''}>
			{benefit.isUnavailable ? (
				<SvgCrossRound isAnnouncedByScreenReader size="small" />
			) : (
				<SvgTickRound isAnnouncedByScreenReader size="small" />
			)}
			<span>
				<strong>{benefit.name}</strong>
				<Hide from="tablet">
					<br />
				</Hide>{' '}
				{benefit.description}
			</span>
		</li>
	);
};

export const BenefitsSection = ({ benefits }: BenefitsSectionProps) => {
	return (
		<ul id="benefits" css={benefitsCss}>
			{benefits.map((benefit) => (
				<Benefit key={benefit.name} benefit={benefit} />
			))}
		</ul>
	);
};
