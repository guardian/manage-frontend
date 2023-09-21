import { css, ThemeProvider } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import {
	Button,
	buttonThemeReaderRevenueBrand,
	ChoiceCard,
	ChoiceCardGroup,
	Stack,
	TextInput,
} from '@guardian/source-react-components';
import type { Dispatch, SetStateAction } from 'react';
import { useContext, useEffect, useState } from 'react';
import {
	buttonCentredCss,
	buttonContainerCss,
} from '../../../styles/ButtonStyles';
import { twoColumnChoiceCardMobile } from '../../../styles/GenericStyles';
import type { ContributionInterval } from '../../../utilities/supportPricing/contributionsAmount';
import { contributionAmountsLookup } from '../../../utilities/supportPricing/contributionsAmount';
import { formatAmount, waitForElement } from '../../../utilities/utils';
import { UpgradeBenefitsCard } from '../shared/benefits/BenefitsCard';
import { getUpgradeBenefits } from '../shared/benefits/BenefitsConfiguration';
import { Heading } from '../shared/Heading';
import type { UpgradeSupportInterface } from './UpgradeSupportContainer';
import { UpgradeSupportContext } from './UpgradeSupportContainer';

async function scrollToConfirmChange() {
	const confirmElement = await waitForElement('#confirm-change');
	confirmElement &&
		confirmElement.scrollIntoView({
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
	const chosenOptionNum = Number(chosenAmount);
	if (!chosenAmount && !isOtherAmountSelected) {
		return 'Please make a selection';
	} else if (chosenOptionNum === currentAmount) {
		return 'This is the same amount as your current support. Please enter a new amount.';
	} else if (
		!chosenAmount ||
		chosenOptionNum < minAmount ||
		chosenOptionNum > maxAmount
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
	chosenAmount: number | null;
	chosenAmountDisplay: string;
	threshold: number;
}) {
	if (!chosenAmount) {
		return null;
	}

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

	const [hasInteractedWithOtherAmount, setHasInteractedWithOtherAmount] =
		useState<boolean>(false);

	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		if (otherAmountSelected) {
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
		setErrorMessage(newErrorMessage);
	}, [otherAmountSelected, chosenAmount]);

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
								type="number"
								width={30}
								value={otherAmountSelected?.toString() || ''}
								onChange={(event) => {
									setChosenAmount(
										event.target.value
											? Number(event.target.value)
											: null,
									);
									setOtherAmountSelected(
										event.target.value
											? Number(event.target.value)
											: null,
									);
									setContinuedToConfirmation(false);
								}}
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
					{!continuedToConfirmation && chosenAmount && !errorMessage && (
						<section css={buttonContainerCss}>
							<ThemeProvider
								theme={buttonThemeReaderRevenueBrand}
							>
								<Button
									cssOverrides={buttonCentredCss}
									onClick={() => {
										setContinuedToConfirmation(
											chosenAmount ? true : false,
										);
										scrollToConfirmChange();
									}}
								>
									Continue with {currencySymbol}
									{formatAmount(chosenAmount)}/
									{mainPlan.billingPeriod}
								</Button>
							</ThemeProvider>
						</section>
					)}
				</Stack>
			</Stack>
		</>
	);
};
