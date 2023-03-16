import { css } from '@emotion/react';
import {
	neutral,
	palette,
	space,
	textSans,
} from '@guardian/source-foundations';
import {
	ChoiceCard,
	ChoiceCardGroup,
	InlineError,
	TextInput,
} from '@guardian/source-react-components';
import { capitalize } from 'lodash';
import { useEffect, useState } from 'react';
import type { PaidSubscriptionPlan } from '../../../../shared/productResponse';
import { augmentBillingPeriod } from '../../../../shared/productResponse';
import type { ProductType } from '../../../../shared/productTypes';
import { trackEvent } from '../../../utilities/analytics';
import type { ContributionInterval } from '../../../utilities/contributionsAmount';
import { contributionAmountsLookup } from '../../../utilities/contributionsAmount';
import { fetchWithDefaultParameters } from '../../../utilities/fetch';
import { AsyncLoader } from '../shared/AsyncLoader';
import { Button } from '../shared/Buttons';

type ContributionUpdateAmountFormMode = 'MANAGE' | 'CANCELLATION_SAVE';

interface ContributionUpdateAmountFormProps {
	subscriptionId: string;
	mainPlan: PaidSubscriptionPlan;
	productType: ProductType;
	// we use this over the value in mainPlan as that value isn't updated after the user submits this form
	currentAmount: number;
	nextPaymentDate: string | null;
	mode: ContributionUpdateAmountFormMode;
	onUpdateConfirmed: (updatedAmount: number) => void;
}

class UpdateAmountLoader extends AsyncLoader<string> {}

export const ContributionUpdateAmountForm = (
	props: ContributionUpdateAmountFormProps,
) => {
	const currentContributionOptions = (contributionAmountsLookup[
		props.mainPlan.currencyISO
	] || contributionAmountsLookup.international)[
		props.mainPlan.billingPeriod as ContributionInterval
	];

	const getDefaultOtherAmount = (): number | null =>
		props.mode === 'MANAGE'
			? currentContributionOptions.otherDefaultAmount
			: null;

	const getDefaultIsOtherAmountSelected = (): boolean =>
		props.mode === 'CANCELLATION_SAVE';

	const [otherAmount, setOtherAmount] = useState<number | null>(
		getDefaultOtherAmount(),
	);
	const [isOtherAmountSelected, setIsOtherAmountSelected] = useState<boolean>(
		getDefaultIsOtherAmountSelected(),
	);
	const [hasInteractedWithOtherAmount, setHasInteractedWithOtherAmount] =
		useState<boolean>(false);

	const [selectedValue, setSelectedValue] = useState<number | null>(null);

	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

	const [showUpdateLoader, setShowUpdateLoader] = useState<boolean>(false);
	const [updateFailed, setUpdateFailedStatus] = useState<boolean>(false);
	const [confirmedAmount, setConfirmedAmount] = useState<number | null>(null);

	useEffect(() => {
		if (otherAmount !== getDefaultOtherAmount()) {
			setHasInteractedWithOtherAmount(true);
		}
	}, [otherAmount]);

	useEffect(() => {
		const newErrorMessage = validateChoice();
		setErrorMessage(newErrorMessage);
	}, [otherAmount, selectedValue]);

	useEffect(() => {
		if (confirmedAmount) {
			props.onUpdateConfirmed(confirmedAmount);
		}
	}, [confirmedAmount]);

	const getAmountUpdater =
		(
			newAmount: number,
			productType: ProductType,
			subscriptionName: string,
		) =>
		async () =>
			await fetchWithDefaultParameters(
				`/api/update/amount/${productType.urlPart}/${subscriptionName}`,
				{
					method: 'POST',
					body: JSON.stringify({ newPaymentAmount: newAmount }),
				},
			);

	const validateChoice = (): string | null => {
		const chosenOption = isOtherAmountSelected
			? otherAmount
			: selectedValue;

		const chosenOptionNum = Number(chosenOption);
		if (!chosenOption && !isOtherAmountSelected) {
			return 'Please make a selection';
		} else if (chosenOptionNum === props.currentAmount) {
			return 'You have selected the same amount as you currently contribute';
		} else if (!chosenOption || isNaN(chosenOptionNum)) {
			return 'There is a problem with the amount you have selected, please make sure it is a valid amount';
		} else if (
			!isNaN(chosenOptionNum) &&
			chosenOptionNum < currentContributionOptions.minAmount
		) {
			return `There is a minimum ${
				props.mainPlan.billingPeriod
			}ly contribution amount of ${
				props.mainPlan.currency
			}${currentContributionOptions.minAmount.toFixed(2)} ${
				props.mainPlan.currencyISO
			}`;
		} else if (
			!isNaN(chosenOptionNum) &&
			chosenOptionNum > currentContributionOptions.maxAmount
		) {
			return `There is a maximum ${
				props.mainPlan.billingPeriod
			}ly contribution amount of ${
				props.mainPlan.currency
			}${currentContributionOptions.maxAmount.toFixed(2)} ${
				props.mainPlan.currencyISO
			}`;
		}
		return null;
	};

	const pendingAmount = Number(
		isOtherAmountSelected ? otherAmount : selectedValue,
	);

	const amountLabel = (amount: number) => {
		return `${props.mainPlan.currency} ${amount} per ${props.mainPlan.billingPeriod}`;
	};

	const shouldShowChoices = props.mode === 'MANAGE';

	const shouldShowSelectedAmountErrorMessage =
		!isOtherAmountSelected && (selectedValue || hasSubmitted);

	const shouldShowOtherAmountErrorMessage =
		hasInteractedWithOtherAmount || hasSubmitted;

	const otherAmountLabel =
		props.mode === 'MANAGE'
			? `Other amount (${props.mainPlan.currency})`
			: `Amount (${props.mainPlan.currency})`;

	const weeklyBreakDown = (): string | null => {
		const chosenAmount = isOtherAmountSelected
			? otherAmount
			: selectedValue;
		if (!chosenAmount) {
			return null;
		}

		let weeklyAmount: number;
		if (props.mainPlan.billingPeriod === 'month') {
			weeklyAmount = (chosenAmount * 12) / 52;
		} else {
			weeklyAmount = chosenAmount / 52;
		}

		return `Contributing ${
			props.mainPlan.currency
		}${chosenAmount} works out as ${
			props.mainPlan.currency
		}${weeklyAmount.toFixed(2)} each week`;
	};

	if (showUpdateLoader) {
		return (
			<UpdateAmountLoader
				fetch={getAmountUpdater(
					pendingAmount,
					props.productType,
					props.subscriptionId,
				)}
				readerOnOK={(resp: Response) => resp.text()}
				render={() => {
					trackEvent({
						eventCategory: 'amount_change',
						eventAction: 'contributions_amount_change_success',
						eventLabel: `by ${props.mainPlan.currency}${(
							pendingAmount - props.currentAmount
						).toFixed(2)}${props.mainPlan.currencyISO}`,
					});
					setConfirmedAmount(pendingAmount);
					return null;
				}}
				loadingMessage={'Updating...'}
				errorRender={() => {
					trackEvent({
						eventCategory: 'amount_change',
						eventAction: 'contributions_amount_change_failed',
					});
					setUpdateFailedStatus(true);
					setShowUpdateLoader(false);
					return null;
				}}
				spinnerScale={0.7}
				inline
			/>
		);
	}

	return (
		<>
			{updateFailed && (
				<InlineError>
					Updating failed this time. Please try again later...
				</InlineError>
			)}
			<div
				css={css`
					border: 1px solid ${palette.neutral[20]};
					margin-bottom: ${space[5]}px;
				`}
			>
				<dl
					css={css`
						padding: ${space[3]}px ${space[5]}px;
						margin: 0;
						border-bottom: 1px solid ${palette.neutral[20]};
						${textSans.medium()};
					`}
				>
					<dt
						css={css`
							font-weight: bold;
							display: inline-block;
						`}
					>
						{capitalize(
							augmentBillingPeriod(props.mainPlan.billingPeriod),
						)}{' '}
						amount
					</dt>
					<dd
						css={css`
							display: inline-block;
						`}
					>{`${props.mainPlan.currency}${props.currentAmount.toFixed(
						2,
					)} ${props.mainPlan.currencyISO}`}</dd>
				</dl>
				<div
					css={css`
						${textSans.medium()};
						padding: ${space[3]}px ${space[5]}px;
					`}
				>
					{shouldShowSelectedAmountErrorMessage && errorMessage && (
						<InlineError>{errorMessage}</InlineError>
					)}

					<div
						css={css`
							max-width: 500px;
						`}
					>
						{shouldShowChoices && (
							<ChoiceCardGroup
								name="amounts"
								data-cy="contribution-amount-choices"
								label="Choose the amount to contribute"
								columns={2}
							>
								<>
									{currentContributionOptions.amounts.map(
										(amount) => (
											<ChoiceCard
												id={`amount-${amount}`}
												key={amount}
												value={amount.toString()}
												label={amountLabel(amount)}
												checked={
													selectedValue === amount
												}
												onChange={() => {
													setSelectedValue(amount);
													setIsOtherAmountSelected(
														false,
													);
												}}
											/>
										),
									)}

									<ChoiceCard
										id={`amount-other`}
										value="Other"
										label="Other"
										checked={isOtherAmountSelected}
										onChange={() => {
											setIsOtherAmountSelected(true);
											setSelectedValue(null);
										}}
									/>
								</>
							</ChoiceCardGroup>
						)}

						{isOtherAmountSelected && (
							<div
								css={css`
									margin-top: ${space[3]}px;
								`}
							>
								<TextInput
									label={otherAmountLabel}
									supporting={`Sorry, we are only able to accept contributions of ${props.mainPlan.currency}${currentContributionOptions.minAmount} or over due to transaction fees`}
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
					</div>

					<div
						css={css`
							margin-top: ${space[2]}px;
							color: ${neutral[46]};
							font-size: 15px;
						`}
					>
						<em>{weeklyBreakDown()}</em>
					</div>
				</div>
			</div>
			<Button
				colour={palette.brand[800]}
				textColour={palette.brand[400]}
				fontWeight="bold"
				text="Change amount"
				onClick={() => {
					setHasSubmitted(true);
					const newErrorMessage = validateChoice();
					if (newErrorMessage) {
						setErrorMessage(newErrorMessage);
						return;
					}
					setShowUpdateLoader(true);
				}}
			/>
		</>
	);
};
