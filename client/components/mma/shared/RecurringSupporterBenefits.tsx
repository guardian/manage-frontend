import { css } from '@emotion/react';
import { palette } from '@guardian/source-foundations';
import { SvgCrossRound, SvgTickRound } from '@guardian/source-react-components';
import { benefitsCss, lineBreakCss } from './BenefitsStyles';

export const RecurringSupporterBenefitsSection = () => {
	const unavailableBenefits = css`
		color: ${palette.neutral[60]};
		svg {
			fill: ${palette.neutral[60]};
		}
	`;

	return (
		<ul id="benefits" css={benefitsCss}>
			<li>
				<SvgTickRound size="small" />
				<span>
					<strong>Uninterrupted reading.</strong>
					<br css={lineBreakCss} /> No more yellow banners
				</span>
			</li>
			<li>
				<SvgTickRound size="small" />
				<span>
					<strong>Supporter newsletter.</strong> Giving you editorial
					insight on the week's top stories
				</span>
			</li>
			<li css={unavailableBenefits}>
				<SvgCrossRound size="small" />
				<span>
					<strong>Unlimited app access.</strong>
					<br css={lineBreakCss} /> For the best mobile experience
				</span>
			</li>
			<li css={unavailableBenefits}>
				<SvgCrossRound size="small" />
				<span>
					<strong>Ad-free reading.</strong>
					<br css={lineBreakCss} /> On any device when signed in
				</span>
			</li>
		</ul>
	);
};
