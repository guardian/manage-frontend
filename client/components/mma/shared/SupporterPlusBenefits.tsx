import { css } from '@emotion/react';
import { from, palette, space, textSans } from '@guardian/source-foundations';
import { SvgTickRound } from '@guardian/source-react-components';
import { useState } from 'react';
import { expanderButtonCss } from '../../shared/ExpanderButton';

const benefitsButtonCss = css`
	${textSans.small()}
	margin-top: ${space[1]}px;
	padding: 0;
	color: ${palette.brand[500]};
	border-bottom: 1px solid ${palette.brand[500]};
`;

export const SupporterPlusBenefitsSection = () => {
	const benefitsCss = css`
		${textSans.medium()};
		list-style: none;
		margin: 0 0 0 -4px;
		padding: 0;

		li + li {
			margin-top: ${space[2]}px;
		}

		li {
			display: flex;
			align-items: flex-start;
		}

		svg {
			flex-shrink: 0;
			margin-right: ${space[2]}px;
			fill: ${palette.brand[500]};
		}
	`;

	const lineBreakCss = css`
		${from.tablet} {
			display: none;
		}
	`;

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
					<strong>A regular supporter newsletter.</strong> Get
					exclusive insight from our newsroom
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
					<strong>Ad-free reading.</strong>
					<br css={lineBreakCss} /> Avoid ads on all your devices
				</span>
			</li>
		</ul>
	);
};

export const SupporterPlusBenefitsToggle = () => {
	const [showBenefits, setShowBenefits] = useState<boolean>(false);

	return (
		<>
			<div
				css={css`
					margin: ${space[5]}px 0 ${space[4]}px 0;
				`}
				hidden={!showBenefits}
			>
				<SupporterPlusBenefitsSection />
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
