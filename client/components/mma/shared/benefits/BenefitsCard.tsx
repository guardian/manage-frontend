import { css } from '@emotion/react';
import { space, textSans } from '@guardian/source-foundations';
import { SvgCrossRound, SvgTickRound } from '@guardian/source-react-components';
import type { ProductBenefit } from './BenefitsConfiguration';
import { benefitsCss, unavailableBenefitsCss } from './BenefitsStyles';

const UpgradeBenefit = ({ benefit }: { benefit: ProductBenefit }) => {
	return (
		<li css={benefit.isUnavailable ? unavailableBenefitsCss : ''}>
			{benefit.isUnavailable ? (
				<SvgCrossRound isAnnouncedByScreenReader size="small" />
			) : (
				<SvgTickRound isAnnouncedByScreenReader size="small" />
			)}
			<span>{benefit.name}</span>
		</li>
	);
};

export const UpgradeBenefitsCard = ({
	chosenAmountDisplay: amountChosenMessage,
	benefits,
}: {
	chosenAmountDisplay: string;
	benefits: ProductBenefit[];
}) => {
	return (
		<div
			css={css`
				background-color: #f3f7fe;
				padding: ${space[4]}px;
			`}
		>
			<div
				css={css`
					${textSans.medium({ fontWeight: 'bold' })}
					margin-bottom: ${space[2]}px;
				`}
			>
				{amountChosenMessage} unlocks:
			</div>
			<ul css={benefitsCss}>
				{benefits.map((benefit) => (
					<UpgradeBenefit key={benefit.name} benefit={benefit} />
				))}
			</ul>
		</div>
	);
};