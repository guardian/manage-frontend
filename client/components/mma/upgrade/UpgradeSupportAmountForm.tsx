import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import {
	Button,
	ChoiceCard,
	ChoiceCardGroup,
	Stack,
	TextInput,
	themeButtonReaderRevenueBrand,
} from '@guardian/source/react-components';
import type { Dispatch, SetStateAction } from 'react';
import { useContext, useEffect, useState } from 'react';
import {
	buttonCentredCss,
	buttonContainerCss,
} from '../../../styles/ButtonStyles';
import { twoColumnChoiceCardMobile } from '../../../styles/GenericStyles';
import type { ContributionInterval } from '../../../utilities/pricingConfig/contributionsAmount';
import { contributionAmountsLookup } from '../../../utilities/pricingConfig/contributionsAmount';
import {
	formatAmount,
	isValidDecimalInput,
	removeLeadingZeros,
	waitForElement,
} from '../../../utilities/utils';
import { UpgradeBenefitsCard } from '../shared/benefits/BenefitsCard';
import { getUpgradeBenefits } from '../shared/benefits/BenefitsConfiguration';
import { Heading } from '../shared/Heading';
import type { UpgradeSupportInterface } from './UpgradeSupportContainer';
import { UpgradeSupportContext } from './UpgradeSupportContainer';

async function scrollToConfirmChange() {
	const confirmElement = await waitForElement('#confirm-change');
	confirmElement?.scrollIntoView({
		behavior: 'smooth',
	});
	parent.location.hash = 'confirm-change';
}

function validateChoice(
	currentAmount: number,
	chosenAmount: number | null,
	minAmount: number,
	maxAmount: number,
	isOtherAmountSelected: boolean,
): string | null {
	if (!chosenAmount && !isOtherAmountSelected) {
		return 'Please make a selection';
	} else if (chosenAmount === currentAmount) {
		return 'This is the same amount as your current support. Please enter a new amount.';
	} else if (
		!chosenAmount ||
		chosenAmount < minAmount ||
		chosenAmount > maxAmount
	) {
		return `Enter a number between ${minAmount} and ${maxAmount}.`;
	}
	return null;
}

function BenefitsDisplay({
	chosenAmount,
	chosenAmountDisplay,
	threshold,
}: {
	chosenAmount: number;
	chosenAmountDisplay: string;
	threshold: number;
}) {
	const benefitsList =
		chosenAmount < threshold
			? getUpgradeBenefits('contributions')
			: getUpgradeBenefits('supporterplus');

	return (
		<UpgradeBenefitsCard
			chosenAmountDisplay={chosenAmountDisplay}
			benefits={benefitsList}
		/>
	);
}

interface UpgradeSupportAmountFormProps {
	chosenAmount: number | null;
	setChosenAmount: Dispatch<SetStateAction<number | null>>;
	threshold: number;
	setContinuedToConfirmation: Dispatch<SetStateAction<boolean>>;
	continuedToConfirmation: boolean;
	suggestedAmounts: number[];
}

export const UpgradeSupportAmountForm = ({
	chosenAmount,
	setChosenAmount,
	threshold,
	setContinuedToConfirmation,
	continuedToConfirmation,
	suggestedAmounts,
}: UpgradeSupportAmountFormProps) => {
	const { mainPlan } = useContext(
		UpgradeSupportContext,
	) as UpgradeSupportInterface;

	const priceConfig = (contributionAmountsLookup[mainPlan.currencyISO] ||
		contributionAmountsLookup.international)[
		mainPlan.billingPeriod as ContributionInterval
	];

	const currencySymbol = mainPlan.currency;

	const amountLabel = (amount: number) => {
		return `${currencySymbol}${formatAmount(amount)} per ${
			mainPlan.billingPeriod
		}`;
	};
	const currentAmount = mainPlan.price / 100;

	const otherAmountLabel = `Enter an amount (${currencySymbol} per ${mainPlan.billingPeriod})`;

	const [isOtherAmountSelected, setIsOtherAmountSelected] =
		useState<boolean>(false);

	const [otherAmountSelected, setOtherAmountSelected] = useState<
		number | null
	>(null);
	const [otherAmountInput, setOtherAmountInput] = useState<string>('');

	const [hasInteractedWithOtherAmount, setHasInteractedWithOtherAmount] =
		useState<boolean>(false);

	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		if (otherAmountSelected !== null) {
			setHasInteractedWithOtherAmount(true);
		}
	}, [otherAmountSelected]);

	useEffect(() => {
		const newErrorMessage = validateChoice(
			currentAmount,
			chosenAmount,
			priceConfig.minAmount,
			priceConfig.maxAmount,
			isOtherAmountSelected,
		);

		setIsOtherAmountSelected(chosenAmount === otherAmountSelected);

		setErrorMessage(newErrorMessage);
	}, [
		otherAmountSelected,
		chosenAmount,
		currentAmount,
		isOtherAmountSelected,
		priceConfig.maxAmount,
		priceConfig.minAmount,
	]);

	const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const next = event.target.value.trim();

		if (next === '') {
			setOtherAmountInput('');
			setOtherAmountSelected(null);
			setChosenAmount(null);
			return;
		}

		if (isValidDecimalInput(next)) {
			const normalizedValue = next.replace(',', '.');

			setOtherAmountInput(normalizedValue);
			setOtherAmountSelected(Number(normalizedValue));
			setChosenAmount(Number(normalizedValue));
		}

		setContinuedToConfirmation(false);
	};

	const onBlurHandler = () => {
		let processed = otherAmountInput;

		if (processed.endsWith('.')) {
			processed = processed.slice(0, -1);
		}

		processed = removeLeadingZeros(processed);

		setOtherAmountInput(processed);
		setOtherAmountSelected(processed === '' ? null : Number(processed));
		setChosenAmount(processed === '' ? null : Number(processed));
	};

	return (
		<>
			<Stack space={3}>
				<Heading sansSerif level="3" borderless>
					1. Choose your new amount
				</Heading>
				<Stack space={4}>
					<ChoiceCardGroup
						cssOverrides={twoColumnChoiceCardMobile}
						name="amounts"
						data-cy="contribution-amount-choices"
					>
						<>
							{suggestedAmounts.map((amount) => (
								<ChoiceCard
									id={`amount-${amount}`}
									key={amount}
									value={amount.toString()}
									label={amountLabel(amount)}
									checked={
										chosenAmount === amount &&
										!isOtherAmountSelected
									}
									onChange={() => {
										setChosenAmount(amount);
										setIsOtherAmountSelected(false);
										setContinuedToConfirmation(false);
									}}
								/>
							))}
							<ChoiceCard
								id={`amount-other`}
								value="Other"
								label="Other"
								checked={isOtherAmountSelected}
								onChange={() => {
									setIsOtherAmountSelected(true);
									setChosenAmount(otherAmountSelected);
									setContinuedToConfirmation(false);
								}}
							/>
						</>
					</ChoiceCardGroup>
					{isOtherAmountSelected && (
						<div
							css={css`
								margin-top: ${space[3]}px;
							`}
						>
							<TextInput
								label={otherAmountLabel}
								supporting={`Support ${currencySymbol}${threshold}/${mainPlan.billingPeriod} or more to unlock extras.`}
								error={
									(hasInteractedWithOtherAmount &&
										errorMessage) ||
									undefined
								}
								type="text"
								inputMode="decimal"
								width={30}
								value={otherAmountInput}
								onChange={onChangeHandler}
								onBlur={onBlurHandler}
								onWheel={(event) => event.currentTarget.blur()}
							/>
						</div>
					)}
					{!errorMessage && !!chosenAmount && (
						<BenefitsDisplay
							chosenAmountDisplay={`${currencySymbol}${formatAmount(
								chosenAmount,
							)} per ${mainPlan.billingPeriod}`}
							chosenAmount={chosenAmount}
							threshold={threshold}
						/>
					)}
					{!continuedToConfirmation &&
						!errorMessage &&
						!!chosenAmount && (
							<section css={buttonContainerCss}>
								<Button
									theme={themeButtonReaderRevenueBrand}
									cssOverrides={buttonCentredCss}
									onClick={() => {
										setContinuedToConfirmation(true);
										scrollToConfirmChange();
									}}
								>
									Continue with {currencySymbol}
									{formatAmount(chosenAmount)}/
									{mainPlan.billingPeriod}
								</Button>
							</section>
						)}
				</Stack>
			</Stack>
		</>
	);
};
