import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { palette, textSansBold14 } from '@guardian/source/foundations';
import { TickInCircle } from './assets/TickInCircle';

interface Step {
	title?: string;
	isCurrentStep?: boolean;
	forceStepComplete?: true;
}

export interface ProgressStepperProps {
	steps: Step[];
	selectedStep?: number;
	additionalCSS?: SerializedStyles;
}

const NumberedBullet = ({
	stepNumber,
	isCurrentStep,
	backgroundColor,
}: {
	stepNumber: number;
	isCurrentStep?: boolean;
	backgroundColor: string;
}) => {
	return (
		<div
			css={[
				css`
					${textSansBold14};
					color: ${palette.neutral[100]};
					width: 22px;
					height: 22px;
					background-color: ${backgroundColor};
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
				`,
				isCurrentStep &&
					css`
						outline: 2px solid ${palette.neutral[100]};
						box-shadow: 0 0 0 4px ${backgroundColor};
						z-index: 1;
					`,
			]}
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
				${textSansBold14};
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
				{step.title && <span>{step.title}</span>}
				{index < currentStep || step.forceStepComplete ? (
					<div>
						<TickInCircle fill={palette.brand[400]} />
					</div>
				) : (
					<NumberedBullet
						stepNumber={index + 1}
						isCurrentStep={index === currentStep}
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

export const ProgressStepper = ({
	steps,
	additionalCSS,
}: ProgressStepperProps) => {
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
					left: calc(50% + 11px);
					width: calc(100% - 22px);
					height: 2px;
					background-color: ${palette.neutral[60]};
					order: -1;
				}
				> :first-of-type:after {
					left: 22px;
					width: calc(200% - 33px);
				}
				> :nth-of-type(-n + ${currentStep}):after {
					background-color: ${palette.brand[400]};
				}
			`}
		>
			{steps.map((step, index) => (
				<Step
					key={`progressStep${index}`}
					step={step}
					currentStep={currentStep}
					index={index}
				/>
			))}
		</div>
	);
};
