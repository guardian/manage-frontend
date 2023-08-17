import { css } from '@emotion/react';
import { palette, space, textSans } from '@guardian/source-foundations';
import {
	Button,
	ChoiceCard,
	ChoiceCardGroup,
	TextInput,
} from '@guardian/source-react-components';
import { useContext, useEffect, useState } from 'react';
import type { PaidSubscriptionPlan } from '../../../../shared/productResponse';
import { calculateMonthlyOrAnnualFromBillingPeriod } from '../../../../shared/productTypes';
import type { CurrencyIso } from '../../../utilities/currencyIso';
import {
	suggestedAmounts,
	supporterPlusPriceConfigByCountryGroup,
} from '../../../utilities/supporterPlusPricing';
import { InfoIconDark } from '../shared/assets/InfoIconDark';
import { benefitsConfiguration } from '../shared/benefits/BenefitsConfiguration';
import { BenefitsSection } from '../shared/benefits/BenefitsSection';
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

export const UpgradeSupportAmountForm = () => {
	const upgradeSupportContext = useContext(
		UpgradeSupportContext,
	) as UpgradeSupportInterface;

	const priceConfig = (supporterPlusPriceConfigByCountryGroup[
		upgradeSupportContext.mainPlan.currencyISO as CurrencyIso
	] || supporterPlusPriceConfigByCountryGroup.international)[
		calculateMonthlyOrAnnualFromBillingPeriod(
			upgradeSupportContext.mainPlan.billingPeriod,
		)
	];

	const amountLabel = (amount: number) => {
		return `${upgradeSupportContext.mainPlan.currency}${amount} a ${upgradeSupportContext.mainPlan.billingPeriod}`;
	};
	const currentAmount = upgradeSupportContext.mainPlan.price / 100;
	const mainPlan = upgradeSupportContext.mainPlan;

	const otherAmountLabel = `Choose an amount (${upgradeSupportContext.mainPlan.currency} per ${upgradeSupportContext.mainPlan.billingPeriod})`;

	const [selectedValue, setSelectedValue] = useState<number | null>(null);

	const [isOtherAmountSelected, setIsOtherAmountSelected] =
		useState<boolean>(false);

	const [hasInteractedWithOtherAmount, setHasInteractedWithOtherAmount] =
		useState<boolean>(false);

	const [hasSubmitted] = useState<boolean>(false);

	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const defaultOtherAmount = priceConfig.minAmount;

	const [otherAmount, setOtherAmount] = useState<number | null>(
		defaultOtherAmount,
	);
	const chosenAmount = isOtherAmountSelected ? otherAmount : selectedValue;

	const shouldShowOtherAmountErrorMessage =
		hasInteractedWithOtherAmount || hasSubmitted;

	useEffect(() => {
		if (otherAmount !== defaultOtherAmount) {
			setHasInteractedWithOtherAmount(true);
		}
	}, [otherAmount]);

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
	}, [otherAmount, selectedValue]);

	return (
		<>
			<div
				css={css`
					border: 1px solid ${palette.neutral[20]};
					margin-bottom: ${space[5]}px;
					padding: ${space[3]}px ${space[5]}px;
					${textSans.medium()};
				`}
			>
				<InfoIconDark /> You're currently supporting{' '}
				{upgradeSupportContext.mainPlan.currency}
				{currentAmount} per{' '}
				{upgradeSupportContext.mainPlan.billingPeriod}.
				<dl />
				<ChoiceCardGroup
					name="amounts"
					data-cy="contribution-amount-choices"
					label="Choose your new amount"
					columns={2}
				>
					<>
						{suggestedAmounts(currentAmount).map((amount) => (
							<ChoiceCard
								id={`amount-${amount}`}
								key={amount}
								value={amount.toString()}
								label={amountLabel(amount)}
								checked={selectedValue === amount}
								onChange={() => {
									setSelectedValue(amount);
									setIsOtherAmountSelected(false);
								}}
							/>
						))}

						<ChoiceCard
							id={`amount-other`}
							value="Choose your amount"
							label="Choose your amount"
							checked={isOtherAmountSelected}
							onChange={() => {
								setIsOtherAmountSelected(true);
								setSelectedValue(null);
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
							error={
								(shouldShowOtherAmountErrorMessage &&
									errorMessage) ||
								undefined
							}
							type="number"
							value={otherAmount?.toString() || ''}
							onChange={(event) =>
								setOtherAmount(
									event.target.value
										? Number(event.target.value)
										: null,
								)
							}
						/>
					</div>
				)}
				<div
					css={css`
						margin-bottom: ${space[5]}px;
						padding: ${space[3]}px ${space[5]}px;
						${textSans.medium()};
					`}
				>
					<BenefitsSection
						benefits={benefitsConfiguration['contributions']}
					/>
				</div>
				<Button>Continue XYZ</Button>
			</div>
		</>
	);
};
