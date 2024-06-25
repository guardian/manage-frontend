import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	palette,
	textSansBold12,
	textSansBold14,
} from '@guardian/source/foundations';
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
	copyColor,
	withBorder,
}: {
	stepNumber: number;
	isCurrentStep?: boolean;
	backgroundColor: string;
	copyColor?: string;
	withBorder?: true;
}) => {
	return (
		<div
			css={[
				css`
					${textSansBold12};
					color: ${copyColor || palette.neutral[100]};
					width: 24px;
					height: 24px;
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
				!isCurrentStep &&
					withBorder &&
					css`
						border: 2px solid ${copyColor || palette.neutral[100]};
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
	const isFutureStep = index > currentStep;
	const futureStepProps: {
		copyColor?: string;
		withBorder?: true;
	} = {};
	if (isFutureStep) {
		futureStepProps.copyColor = palette.neutral[46];
		futureStepProps.withBorder = true;
	}
	return (
		<div
			css={css`
				${textSansBold12};
				z-index: 1;
				width: 24px;
				${index > 0
					? 'display: flex; flex-direction: column; align-items: center;'
					: ''}
			`}
		>
			{step.title && (
				<span
					css={css`
						${textSansBold14};
					`}
				>
					{step.title}
				</span>
			)}
			<div
				css={[
					!!step.title &&
						css`
							margin-top: 4px;
						`,
				]}
			>
				{index < currentStep || step.forceStepComplete ? (
					<TickInCircle
						fill={palette.brand[400]}
						additionalCss={css`
							width: 24px;
							height: 24px;
						`}
					/>
				) : (
					<NumberedBullet
						stepNumber={index + 1}
						isCurrentStep={index === currentStep}
						backgroundColor={
							isFutureStep
								? palette.neutral[100]
								: palette.brand[400]
						}
						{...futureStepProps}
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
	const completedStepsPercentage = (currentStep / (steps.length - 1)) * 100;
	const stepsHaveTitles = steps.some((step) => {
		return !!step.title;
	});
	return (
		<div
			css={[
				css`
					display: flex;
					justify-content: space-between;
					max-width: 519px;
					margin-top: 10px;
					position: relative;
					:before {
						content: '';
						position: absolute;
						top: 50%;
						left: 0;
						z-index: 0;
						transform: translateY(-50%);
						width: 100%;
						height: 2px;
						background: linear-gradient(
							to right,
							${palette.brand[400]} ${completedStepsPercentage}%,
							${palette.neutral[46]} ${completedStepsPercentage}%
						);
					}
					${additionalCSS};
				`,
				stepsHaveTitles &&
					css`
						:before {
							top: calc(50% + 0.5em + 4px);
						}
					`,
			]}
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
