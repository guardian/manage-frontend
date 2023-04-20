import { SvgTickRound } from '@guardian/source-react-components';
import { benefitsCss, lineBreakCss } from './BenefitsStyles';

export const MembershipBenefitsSection = () => {
	return (
		<ul id="benefits" css={benefitsCss}>
			<li>
				<SvgTickRound size="small" />
				<span>
					<strong>Unlimited app access.</strong>
					<br css={lineBreakCss} /> For the best mobile experience
				</span>
			</li>
			<li>
				<SvgTickRound size="small" />
				<span>
					<strong>Ad-free reading.</strong>
					<br css={lineBreakCss} /> On any device when signed in
				</span>
			</li>
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
		</ul>
	);
};
