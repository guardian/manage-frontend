import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { palette, space, textSans } from '@guardian/source-foundations';
import { TickInCircle } from './assets/TickInCircle';

interface Step {
	title: string;
	isCurrentStep?: true;
}

export interface ProgressIndicatorProps {
	steps: Step[];
	additionalCSS?: SerializedStyles;
}

const NumberedBullet = ({
	stepNumber,
	backgroundColor,
}: {
	stepNumber: number;
	backgroundColor: string;
}) => {
	return (
		<div
			css={css`
				${textSans.xsmall({ fontWeight: 'bold' })};
				color: ${palette.neutral[100]};
				width: 22px;
				height: 22px;
				background-color: ${backgroundColor};
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
			`}
		>
			{stepNumber}
		</div>
	);
};

const Step = ({
	step,
	currentStep,
	index,
}: {
	step: Step;
	currentStep: number;
	index: number;
}) => {
	return (
		<div
			css={css`
				${textSans.xsmall({ fontWeight: 'bold' })};
				color: ${index > currentStep
					? palette.neutral[46]
					: palette.brand[400]};
				flex: ${index > 0 ? '1' : '0.5'};
			`}
		>
			<div
				css={css`
					${index > 0
						? 'display: flex; flex-direction: column; align-items: center;'
						: ''}
				`}
			>
				<span>{step.title}</span>
				{index < currentStep ? (
					<div>
						<TickInCircle fill={palette.brand[400]} />
					</div>
				) : (
					<NumberedBullet
						stepNumber={index + 1}
						backgroundColor={
							index > currentStep
								? palette.neutral[60]
								: palette.brand[400]
						}
					/>
				)}
			</div>
		</div>
	);
};

export const ProgressIndicatorV2 = ({
	steps,
	additionalCSS,
}: ProgressIndicatorProps) => {
	const currentStep = steps.findIndex((step) => step.isCurrentStep) || 0;
	return (
		<div
			css={css`
				margin-top: 10px;
				display: flex;
				${additionalCSS};
				> :not(:last-child):after {
					content: '';
					position: relative;
					display: block;
					top: -0.75rem;
					left: calc(50% + 11px + ${space[2]}px);
					width: calc(100% - 22px - 2 * ${space[2]}px);
					height: 2px;
					background-color: ${palette.neutral[60]};
					order: -1;
				}
				> :first-of-type:after {
					left: calc(22px + ${space[2]}px);
					width: calc(200% - 33px - 2 * ${space[2]}px);
				}
				> :nth-of-type(-n + ${currentStep}):after {
					background-color: ${palette.brand[400]};
				}
			`}
		>
			{steps.map((step, index) => (
				<Step
					key={step.title}
					step={step}
					currentStep={currentStep}
					index={index}
				/>
			))}
		</div>
	);
};
