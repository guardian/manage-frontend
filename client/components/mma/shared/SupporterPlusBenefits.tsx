import { css } from '@emotion/react';
import { from, palette, space, textSans } from '@guardian/source-foundations';
import { SvgTickRound } from '@guardian/source-react-components';

export const SupporterPlusBenefitsSection = (props: {
	hidden?: boolean;
	withMargin?: boolean;
}) => {
	const benefitsCss = css`
		${textSans.medium()};
		list-style: none;
		margin: ${props.withMargin ? `${space[5]}px 0 ${space[4]}px -4px` : 0};
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
		<ul id="benefits" css={benefitsCss} hidden={props.hidden}>
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
