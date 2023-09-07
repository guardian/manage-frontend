import { css, ThemeProvider } from '@emotion/react';
import { space, textSans } from '@guardian/source-foundations';
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
import type { PaidSubscriptionPlan } from '../../../../shared/productResponse';
import type { ContributionInterval } from '../../../utilities/contributionsAmount';
import { contributionAmountsLookup } from '../../../utilities/contributionsAmount';
import { UpgradeBenefitsCard } from '../shared/benefits/BenefitsCard';
import { getUpgradeBenefits } from '../shared/benefits/BenefitsConfiguration';
import type { UpgradeSupportInterface } from './UpgradeSupportContainer';
import { UpgradeSupportContext } from './UpgradeSupportContainer';

function validateChoice(
	currentAmount: number,
	chosenAmount: number | null,
	minAmount: number,
	maxAmount: number,
	isOtherAmountSelected: boolean,
	mainPlan: PaidSubscriptionPlan,
): string | null {
	const chosenOptionNum = Number(chosenAmount);
	if (!chosenAmount && !isOtherAmountSelected) {
		return 'Please make a selection';
	} else if (chosenOptionNum === currentAmount) {
		return 'You have selected the same amount as you currently contribute';
	} else if (!chosenAmount || isNaN(chosenOptionNum)) {
		return 'There is a problem with the amount you have selected, please make sure it is a valid amount';
	} else if (!isNaN(chosenOptionNum) && chosenOptionNum < minAmount) {
		return `There is a minimum ${
			mainPlan.billingPeriod
		}ly contribution amount of ${mainPlan.currency}${minAmount.toFixed(
			2,
		)} ${mainPlan.currencyISO}`;
	} else if (!isNaN(chosenOptionNum) && chosenOptionNum > maxAmount) {
		return `There is a maximum ${
			mainPlan.billingPeriod
		}ly contribution amount of ${mainPlan.currency}${maxAmount.toFixed(
			2,
		)} ${mainPlan.currencyISO}`;
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
	setContinuedToConfirmation: Dispatch<SetStateAction<boolean>>;
	continuedToConfirmation: boolean;
	suggestedAmounts: number[];
}

export const UpgradeSupportAmountForm = ({
	chosenAmount,
	setChosenAmount,
	setContinuedToConfirmation,
	continuedToConfirmation,
	suggestedAmounts,
}: UpgradeSupportAmountFormProps) => {
	const upgradeSupportContext = useContext(
		UpgradeSupportContext,
	) as UpgradeSupportInterface;

	const threshold = 10; // TODO
	const priceConfig = (contributionAmountsLookup[
		upgradeSupportContext.mainPlan.currencyISO
	] || contributionAmountsLookup.international)[
		upgradeSupportContext.mainPlan.billingPeriod as ContributionInterval
	];

	const amountLabel = (amount: number) => {
		return `${upgradeSupportContext.mainPlan.currency}${amount} per ${upgradeSupportContext.mainPlan.billingPeriod}`;
	};
	const currentAmount = upgradeSupportContext.mainPlan.price / 100;

	const mainPlan = upgradeSupportContext.mainPlan;

	const otherAmountLabel = `Choose an amount (${upgradeSupportContext.mainPlan.currency} per ${upgradeSupportContext.mainPlan.billingPeriod})`;

	const [isOtherAmountSelected, setIsOtherAmountSelected] =
		useState<boolean>(false);

	const defaultOtherAmount = priceConfig.minAmount;
	const [otherAmountSelected, setOtherAmountSelected] = useState<
		number | null
	>(defaultOtherAmount);

	const [hasInteractedWithOtherAmount, setHasInteractedWithOtherAmount] =
		useState<boolean>(false);

	const [hasSubmitted] = useState<boolean>(false);

	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const shouldShowOtherAmountErrorMessage =
		hasInteractedWithOtherAmount || hasSubmitted;

	useEffect(() => {
		if (otherAmountSelected !== defaultOtherAmount) {
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
			mainPlan,
		);
		setErrorMessage(newErrorMessage);
	}, [otherAmountSelected, chosenAmount]);

	return (
		<>
			<div>
				<h3
					css={css`
						${textSans.xlarge({ fontWeight: 'bold' })};
						margin: 0;
					`}
				>
					1. Choose your new amount
				</h3>
				<Stack space={4}>
					<ChoiceCardGroup
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
								supporting={
									'Support £10/month or more to unlock all extras'
								}
								error={
									(shouldShowOtherAmountErrorMessage &&
										errorMessage) ||
									undefined
								}
								type="number"
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
					<BenefitsDisplay
						chosenAmountDisplay={`${mainPlan.currency}${chosenAmount} per ${mainPlan.billingPeriod}`}
						chosenAmount={chosenAmount}
						threshold={threshold}
					/>
					{!continuedToConfirmation && (
						<section>
							<ThemeProvider
								theme={buttonThemeReaderRevenueBrand}
							>
								<Button
									onClick={() =>
										setContinuedToConfirmation(
											chosenAmount ? true : false,
										)
									}
								>
									Continue with {mainPlan.currency}
									{chosenAmount}/{mainPlan.billingPeriod}
								</Button>
							</ThemeProvider>
						</section>
					)}
				</Stack>
			</div>
		</>
	);
};
