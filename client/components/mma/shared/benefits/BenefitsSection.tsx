import {
	Hide,
	SvgCrossRound,
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
				<SvgCrossRound
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
		<ul id="benefits" css={benefitsCss(!!small)}>
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
