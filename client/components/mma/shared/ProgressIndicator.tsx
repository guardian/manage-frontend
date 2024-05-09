import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { from, palette, textSans17 } from '@guardian/source/foundations';
import { TickInCircle } from './assets/TickInCircle';

interface Step {
	title: string;
	isCurrentStep?: true;
}

interface ProgressIndicatorProps {
	steps: [Step, Step, ...Step[]];
	additionalCSS?: SerializedStyles;
}

export const ProgressIndicator = (props: ProgressIndicatorProps) => {
	const currentStep =
		props.steps.findIndex((step) => step.isCurrentStep) + 1 || 1;
	return (
		<div
			css={css`
				width: 100%;
				max-width: 345px;
				position: relative;
				:before {
					content: '';
					display: block;
					position: absolute;
					top: 9.5px;
					left: 4px;
					width: calc(${(currentStep - 1) * 50}% - 8px);
					height: 5px;
					background-color: ${palette.brand[500]};
					z-index: -1;
				}
				:after {
					content: '';
					display: block;
					position: absolute;
					top: 9.5px;
					left: calc(4px + ${(currentStep - 1) * 50}%);
					width: calc(${Math.abs(currentStep - 3) * 50}% - 8px);
					height: 2px;
					background-color: ${palette.neutral[60]};
					z-index: -1;
				}
				${props.additionalCSS}
			`}
		>
			<div>
				{currentStep > 1 ? (
					<TickInCircle fill={palette.brand[500]} />
				) : (
					<i
						css={css`
							display: block;
							width: 22px;
							height: 22px;
							background-color: ${palette.brand[500]};
							border-radius: 50%;
						`}
					/>
				)}
			</div>
			<div
				css={css`
					position: absolute;
					top: 0;
					left: 50%;
					transform: translateX(-50%);
				`}
			>
				{currentStep > 2 ? (
					<TickInCircle fill={palette.brand[500]} />
				) : (
					<i
						css={css`
							display: block;
							width: 22px;
							height: 22px;
							background-color: ${currentStep < 2
								? palette.neutral[100]
								: palette.brand[500]};
							${currentStep < 2
								? `border: 1px solid ${palette.neutral[60]};`
								: ''}
							border-radius: 50%;
						`}
					/>
				)}
			</div>
			<div
				css={css`
					position: absolute;
					top: 0;
					right: 0;
				`}
			>
				{currentStep > 2 ? (
					<TickInCircle fill={palette.brand[500]} />
				) : (
					<i
						css={css`
							display: block;
							width: 22px;
							height: 22px;
							background-color: ${palette.neutral[100]};
							border: 1px solid ${palette.neutral[60]};
							border-radius: 50%;
						`}
					/>
				)}
			</div>
			<div
				css={css`
					display: block;
					position: relative;
					${textSans17};
				`}
			>
				<span
					css={css`
						${currentStep === 1 ? 'font-weight: bold;' : ''}
					`}
				>
					{props.steps[0].title}
				</span>
				<span
					css={css`
						${currentStep === 2 ? 'font-weight: bold;' : ''}
						white-space: pre;
						position: absolute;
						top: 0;
						left: 50%;
						transform: translateX(-50%);
						${from.tablet} {
							transform: none;
							left: calc(50% - 11px);
						}
					`}
				>
					{props.steps[1].title}
				</span>
				<span
					css={css`
						${currentStep === 3 ? 'font-weight: bold;' : ''}
						white-space: pre;
						position: absolute;
						top: 0;
						right: 0;
						${from.tablet} {
							right: auto;
							left: calc(100% - 22px);
						}
					`}
				>
					{props.steps[2].title}
				</span>
			</div>
		</div>
	);
};
