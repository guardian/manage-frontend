import { SvgTickRound } from '@guardian/source-react-components';
import { benefitsCss, lineBreakCss } from './BenefitsStyles';

export const MembershipBenefitsSection = () => {
	return (
		<ul id="benefits" css={benefitsCss}>
			<li>
				<SvgTickRound size="small" />
				<span>
					<strong>Full access to our news app.</strong>
					<br css={lineBreakCss} /> Read our reporting on the go
				</span>
			</li>
			<li>
				<SvgTickRound size="small" />
				<span>
					<strong>Uninterrupted reading.</strong>
					<br css={lineBreakCss} /> See far fewer asks for support
				</span>
			</li>
			<li>
				<SvgTickRound size="small" />
				<span>
					<strong>A regular supporter newsletter.</strong> Get
					exclusive insight from our newsroom
				</span>
			</li>
		</ul>
	);
};
