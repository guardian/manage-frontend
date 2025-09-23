import { css } from '@emotion/react';
import { from, palette, space, textSans17 } from '@guardian/source/foundations';
import {
	Button,
	ChoiceCard,
	ChoiceCardGroup,
	InlineError,
	LinkButton,
	TextInput,
} from '@guardian/source/react-components';
import { capitalize } from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import type { PaidSubscriptionPlan } from '../../../../../shared/productResponse';
import { augmentBillingPeriod } from '../../../../../shared/productResponse';
import type { ProductType } from '../../../../../shared/productTypes';
import { trackEvent } from '../../../../utilities/analytics';
import { fetchWithDefaultParameters } from '../../../../utilities/fetch';
import type { ContributionInterval } from '../../../../utilities/pricingConfig/contributionsAmount';
import { contributionAmountsLookup } from '../../../../utilities/pricingConfig/contributionsAmount';
import {
	isValidDecimalInput,
	removeLeadingZeros,
} from '../../../../utilities/utils';
import { TextResponseHandler } from '../../shared/asyncComponents/DefaultApiResponseHandler';
import { DefaultLoadingView } from '../../shared/asyncComponents/DefaultLoadingView';

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
	withReturnToAccountOverviewButton?: true;
}

const buttonsCss = css`
	display: flex;
	flex-direction: column;
	gap: ${space[5]}px;
	${from.tablet} {
		flex-direction: row;
	}
`;

const buttonCss = css`
	justify-content: center;
`;

const getAmountUpdater = (
	newAmount: number,
	productType: ProductType,
	subscriptionName: string,
) =>
	fetchWithDefaultParameters(
		`/api/update/amount/${productType.urlPart}/${subscriptionName}`,
		{
			method: 'POST',
			body: JSON.stringify({ newPaymentAmount: newAmount }),
		},
	);

function weeklyBreakDown(
	chosenAmount: number | null,
	billingPeriod: string,
	currencySymbol: string,
): string | null {
	if (!chosenAmount) {
		return null;
	}

	let weeklyAmount: number;
	if (billingPeriod === 'month') {
		weeklyAmount = (chosenAmount * 12) / 52;
	} else {
		weeklyAmount = chosenAmount / 52;
	}

	return `Contributing ${currencySymbol}${chosenAmount} works out as ${currencySymbol}${weeklyAmount.toFixed(
		2,
	)} each week`;
}

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

export const ContributionUpdateAmountForm = (
	props: ContributionUpdateAmountFormProps,
) => {
	const currentContributionOptions = (contributionAmountsLookup[
		props.mainPlan.currencyISO
	] || contributionAmountsLookup.international)[
		props.mainPlan.billingPeriod as ContributionInterval
	];

	const defaultOtherAmount =
		props.mode === 'MANAGE'
			? currentContributionOptions.otherDefaultAmount
			: null;

	const defaultIsOtherAmountSelected = props.mode === 'CANCELLATION_SAVE';

	const [otherAmount, setOtherAmount] = useState<number | null>(
		defaultOtherAmount,
	);
	const [otherAmountInput, setOtherAmountInput] = useState<string>(
		defaultOtherAmount?.toString() ?? '',
	);
	const [isOtherAmountSelected, setIsOtherAmountSelected] = useState<boolean>(
		defaultIsOtherAmountSelected,
	);
	const [hasInteractedWithOtherAmount, setHasInteractedWithOtherAmount] =
		useState<boolean>(false);

	const [selectedValue, setSelectedValue] = useState<number | null>(null);

	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

	const [showUpdateLoader, setShowUpdateLoader] = useState<boolean>(false);
	const [updateFailed, setUpdateFailedStatus] = useState<boolean>(false);
	const [confirmedAmount, setConfirmedAmount] = useState<number | null>(null);
	const chosenAmount = isOtherAmountSelected ? otherAmount : selectedValue;

	const navigate = useNavigate();

	const onReturnClicked = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		navigate('/');
	};

	const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const next = event.target.value.trim();

		if (next === '') {
			setOtherAmountInput('');
			setOtherAmount(null);
			return;
		}

		if (isValidDecimalInput(next)) {
			const normalizedValue = next.replace(',', '.');

			setOtherAmountInput(normalizedValue);
			setOtherAmount(Number(normalizedValue));
		}
	};

	const onBlurHandler = () => {
		let processed = otherAmountInput;

		if (processed.endsWith('.')) {
			processed = processed.slice(0, -1);
		}

		processed = removeLeadingZeros(processed);

		setOtherAmountInput(processed);
		setOtherAmount(processed === '' ? null : Number(processed));
	};

	useEffect(() => {
		if (otherAmount !== defaultOtherAmount) {
			setHasInteractedWithOtherAmount(true);
		}
	}, [otherAmount, defaultOtherAmount]);

	useEffect(() => {
		const newErrorMessage = validateChoice(
			props.currentAmount,
			chosenAmount,
			currentContributionOptions.minAmount,
			currentContributionOptions.maxAmount,
			isOtherAmountSelected,
			props.mainPlan,
		);
		setErrorMessage(newErrorMessage);
	}, [
		otherAmount,
		selectedValue,
		chosenAmount,
		isOtherAmountSelected,
		currentContributionOptions.minAmount,
		currentContributionOptions.maxAmount,
		props.currentAmount,
		props.mainPlan,
	]);

	useEffect(() => {
		if (confirmedAmount) {
			props.onUpdateConfirmed(confirmedAmount);
		}
	}, [confirmedAmount, props]);

	const changeAmountClick = async () => {
		setHasSubmitted(true);
		const newErrorMessage = validateChoice(
			props.currentAmount,
			chosenAmount,
			currentContributionOptions.minAmount,
			currentContributionOptions.maxAmount,
			isOtherAmountSelected,
			props.mainPlan,
		);
		if (newErrorMessage) {
			setErrorMessage(newErrorMessage);
			return;
		}
		setShowUpdateLoader(true);
		const response = await getAmountUpdater(
			pendingAmount,
			props.productType,
			props.subscriptionId,
		);

		const data = await TextResponseHandler(response);
		if (data === null) {
			trackEvent({
				eventCategory: 'amount_change',
				eventAction: 'contributions_amount_change_failed',
			});
			setUpdateFailedStatus(true);
			setShowUpdateLoader(false);
		}
		trackEvent({
			eventCategory: 'amount_change',
			eventAction: 'contributions_amount_change_success',
			eventLabel: `by ${props.mainPlan.currency}${(
				pendingAmount - props.currentAmount
			).toFixed(2)}${props.mainPlan.currencyISO}`,
		});
		setConfirmedAmount(pendingAmount);
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

	if (showUpdateLoader) {
		return <DefaultLoadingView loadingMessage="Updating..." />;
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
						${textSans17};
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
						${textSans17};
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
									type="text"
									inputMode="decimal"
									value={otherAmountInput}
									onChange={onChangeHandler}
									onBlur={onBlurHandler}
								/>
							</div>
						)}
					</div>

					<div
						css={css`
							margin-top: ${space[2]}px;
							color: ${palette.neutral[46]};
							font-size: 15px;
						`}
					>
						<em>
							{weeklyBreakDown(
								chosenAmount,
								props.mainPlan.billingPeriod,
								props.mainPlan.currency,
							)}
						</em>
					</div>
				</div>
			</div>
			<div css={buttonsCss}>
				<Button onClick={changeAmountClick} cssOverrides={buttonCss}>
					Change amount
				</Button>
				{props.withReturnToAccountOverviewButton && (
					<LinkButton
						href="/"
						onClick={onReturnClicked}
						priority="subdued"
						cssOverrides={buttonCss}
					>
						Return to your account
					</LinkButton>
				)}
			</div>
		</>
	);
};
