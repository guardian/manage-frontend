import { css, ThemeProvider } from '@emotion/react';
import { palette, space, textSans, until } from '@guardian/source-foundations';
import {
	Button,
	buttonThemeReaderRevenueBrand,
	ChoiceCard,
	ChoiceCardGroup,
	InlineError,
	Link,
	SvgInfoRound,
	TextInput,
} from '@guardian/source-react-components';
import { useEffect, useState } from 'react';
import type { PaidSubscriptionPlan } from '../../../../../shared/productResponse';
import { calculateMonthlyOrAnnualFromBillingPeriod } from '../../../../../shared/productTypes';
import type { CurrencyIso } from '../../../../utilities/currencyIso';
import { fetchWithDefaultParameters } from '../../../../utilities/fetch';
import {
	suggestedAmounts,
	supporterPlusPriceConfigByCountryGroup,
} from '../../../../utilities/supporterPlusPricing';
import { JsonResponseHandler } from '../../shared/asyncComponents/DefaultApiResponseHandler';
import { DefaultLoadingView } from '../../shared/asyncComponents/DefaultLoadingView';

const smallPrintCss = css`
	${textSans.xsmall()};
	margin-top: 0;
	margin-bottom: 0;
	color: #606060;
	> a {
		color: inherit;
		text-decoration: underline;
	}
	& + & {
		margin-top: ${space[1]}px;
	}
`;

const buttonContainerCss = css`
	${until.tablet} {
		display: flex;
		flex-direction: column;
	}
`;

const buttonCentredCss = css`
	justify-content: center;
`;

const getAmountUpdater = (newAmount: number, subscriptionName: string) =>
	fetchWithDefaultParameters(
		`/api/update-supporter-plus-amount/${subscriptionName}`,
		{
			method: 'POST',
			body: JSON.stringify({ newPaymentAmount: newAmount }),
		},
	);

function validateChoice(
	currentAmount: number,
	chosenAmount: number | null,
	minAmount: number,
	maxAmount: number,
	isOtherAmountSelected: boolean,
	mainPlan: PaidSubscriptionPlan,
): string | null {
	const chosenOptionNum = Number(chosenAmount);
	const monthlyOrAnnual = calculateMonthlyOrAnnualFromBillingPeriod(
		mainPlan.billingPeriod,
	).toLocaleLowerCase();

	if (!chosenAmount && !isOtherAmountSelected) {
		return 'Please make a selection';
	} else if (chosenOptionNum === currentAmount) {
		return 'You have selected the same amount as you currently pay';
	} else if (!chosenAmount || isNaN(chosenOptionNum)) {
		return 'There is a problem with the amount you have selected, please make sure it is a valid amount';
	} else if (!isNaN(chosenOptionNum) && chosenOptionNum < minAmount) {
		return `${mainPlan.currency}${minAmount} per ${mainPlan.billingPeriod} is the minimum payment to receive this subscription. Please call our customer service team to lower your ${monthlyOrAnnual} amount below ${mainPlan.currency}${minAmount}`;
	} else if (!isNaN(chosenOptionNum) && chosenOptionNum > maxAmount) {
		return `There is a maximum ${mainPlan.billingPeriod}ly amount of ${mainPlan.currency}${maxAmount} ${mainPlan.currencyISO}`;
	}
	return null;
}

interface SupporterPlusUpdateAmountFormProps {
	subscriptionId: string;
	mainPlan: PaidSubscriptionPlan;
	// we use this over the value in mainPlan as that value isn't updated after the user submits this form
	currentAmount: number;
	nextPaymentDate: string | null;
	onUpdateConfirmed: (updatedAmount: number) => void;
}

export const SupporterPlusUpdateAmountForm = (
	props: SupporterPlusUpdateAmountFormProps,
) => {
	const priceConfig = (supporterPlusPriceConfigByCountryGroup[
		props.mainPlan.currencyISO as CurrencyIso
	] || supporterPlusPriceConfigByCountryGroup.international)[
		calculateMonthlyOrAnnualFromBillingPeriod(props.mainPlan.billingPeriod)
	];

	const minPriceDisplay = `${props.mainPlan.currency}${priceConfig.minAmount}`;
	const monthlyOrAnnual = calculateMonthlyOrAnnualFromBillingPeriod(
		props.mainPlan.billingPeriod,
	);

	const defaultOtherAmount = priceConfig.minAmount;

	const [otherAmount, setOtherAmount] = useState<number | null>(
		defaultOtherAmount,
	);
	const [isOtherAmountSelected, setIsOtherAmountSelected] =
		useState<boolean>(false);
	const [hasInteractedWithOtherAmount, setHasInteractedWithOtherAmount] =
		useState<boolean>(false);

	const [selectedValue, setSelectedValue] = useState<number | null>(null);

	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

	const [showUpdateLoader, setShowUpdateLoader] = useState<boolean>(false);
	const [updateFailed, setUpdateFailedStatus] = useState<boolean>(false);
	const [confirmedAmount, setConfirmedAmount] = useState<number | null>(null);
	const chosenAmount = isOtherAmountSelected ? otherAmount : selectedValue;

	useEffect(() => {
		if (otherAmount !== defaultOtherAmount) {
			setHasInteractedWithOtherAmount(true);
		}
	}, [otherAmount]);

	useEffect(() => {
		const newErrorMessage = validateChoice(
			props.currentAmount,
			chosenAmount,
			priceConfig.minAmount,
			priceConfig.maxAmount,
			isOtherAmountSelected,
			props.mainPlan,
		);
		setErrorMessage(newErrorMessage);
	}, [otherAmount, selectedValue]);

	useEffect(() => {
		if (confirmedAmount) {
			props.onUpdateConfirmed(confirmedAmount);
		}
	}, [confirmedAmount]);

	const pendingAmount = Number(
		isOtherAmountSelected ? otherAmount : selectedValue,
	);

	const amountLabel = (amount: number) => {
		return `${props.mainPlan.currency}${amount} a ${props.mainPlan.billingPeriod}`;
	};

	const shouldShowSelectedAmountErrorMessage =
		!isOtherAmountSelected && (selectedValue || hasSubmitted);

	const shouldShowOtherAmountErrorMessage =
		hasInteractedWithOtherAmount || hasSubmitted;

	const otherAmountLabel = `Other amount (${props.mainPlan.currency})`;

	const changeAmountClick = async () => {
		setHasSubmitted(true);
		const newErrorMessage = validateChoice(
			props.currentAmount,
			chosenAmount,
			priceConfig.minAmount,
			priceConfig.maxAmount,
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
			props.subscriptionId,
		);

		try {
			const data = await JsonResponseHandler(response);
			if (data === null) {
				// trackEvent({
				// 	eventCategory: 'amount_change',
				// 	eventAction: 'contributions_amount_change_failed',
				// });
				setUpdateFailedStatus(true);
				setShowUpdateLoader(false);
			}
			// trackEvent({
			// 	eventCategory: 'amount_change',
			// 	eventAction: 'contributions_amount_change_success',
			// 	eventLabel: `by ${props.mainPlan.currency}${(
			// 		pendingAmount - props.currentAmount
			// 	).toFixed(2)}${props.mainPlan.currencyISO}`,
			// });
			setConfirmedAmount(pendingAmount);
		} catch {
			setUpdateFailedStatus(true);
			setShowUpdateLoader(false);
		}
	};

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
						${textSans.medium()};
					`}
				>
					<dt
						css={css`
							font-weight: bold;
							display: inline-block;
						`}
					>
						Current amount
					</dt>
					<dd
						css={css`
							margin-left: ${space[4]}px;
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
						<ChoiceCardGroup
							name="amounts"
							data-cy="supporter-plus-amount-choices"
							label="Choose your new amount"
							columns={2}
						>
							<>
								{suggestedAmounts(
									props.currentAmount,
									monthlyOrAnnual,
								).map((amount) => (
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
						<section
							css={[
								css`
									margin-top: ${space[5]}px;
								`,
								buttonContainerCss,
							]}
						>
							<ThemeProvider
								theme={buttonThemeReaderRevenueBrand}
							>
								<Button
									cssOverrides={buttonCentredCss}
									onClick={changeAmountClick}
									size="small"
								>
									Change amount
								</Button>
							</ThemeProvider>
						</section>
						<div
							css={css`
								margin-top: ${space[3]}px;
								display: flex;
								align-items: flex-start;
								> svg {
									flex-shrink: 0;
									margin-right: 8px;
									fill: ${palette.brand[500]};
								}
							`}
						>
							<SvgInfoRound
								isAnnouncedByScreenReader
								size="medium"
							/>
							<p>
								If you would like to lower your{' '}
								{monthlyOrAnnual.toLowerCase()} amount below{' '}
								{minPriceDisplay} please call us via the{' '}
								<Link href="/help-centre#call-us">
									Help Centre
								</Link>
							</p>
						</div>
						<p css={smallPrintCss}>
							{minPriceDisplay} per {props.mainPlan.billingPeriod}{' '}
							is the minimum payment to receive this subscription.
						</p>
					</div>
				</div>
			</div>
		</>
	);
};
