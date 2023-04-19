import { css } from '@emotion/react';
import { from, palette, space, textSans } from '@guardian/source-foundations';
import { SvgCrossRound, SvgTickRound } from '@guardian/source-react-components';

export const RecurringSupporterBenefitsSection = () => {
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
			<li>
				<SvgCrossRound size="small" />
				<span>
					<strong>Unlimited app access.</strong>
					<br css={lineBreakCss} />
					For the best mobile experience
				</span>
			</li>
			<li>
				<SvgCrossRound size="small" />
				<span>
					<strong>Ad-free reading.</strong>
					<br css={lineBreakCss} /> On any device when signed in
				</span>
			</li>
		</ul>
	);
};
