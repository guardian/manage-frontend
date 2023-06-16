import { css, ThemeProvider } from '@emotion/react';
import { palette, space, textSans } from '@guardian/source-foundations';
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
import { capitalize } from 'lodash';
import { useEffect, useState } from 'react';
import type { PaidSubscriptionPlan } from '../../../../../shared/productResponse';
import { augmentBillingPeriod } from '../../../../../shared/productResponse';
import type { ProductType } from '../../../../../shared/productTypes';
import { calculateMonthlyOrAnnualFromBillingPeriod } from '../../../../../shared/productTypes';
import type { CurrencyIso } from '../../../../utilities/currencyIso';
import { fetchWithDefaultParameters } from '../../../../utilities/fetch';
import {
	suggestedAmounts,
	supporterPlusPriceConfigByCountryGroup,
} from '../../../../utilities/supporterPlusPricing';
import { TextResponseHandler } from '../../shared/asyncComponents/DefaultApiResponseHandler';
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

interface SupporterPlusUpdateAmountFormProps {
	subscriptionId: string;
	mainPlan: PaidSubscriptionPlan;
	productType: ProductType;
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
	).toLocaleLowerCase();

	const getDefaultOtherAmount = priceConfig.minAmount;

	const [otherAmount, setOtherAmount] = useState<number | null>(
		getDefaultOtherAmount,
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

	useEffect(() => {
		if (otherAmount !== getDefaultOtherAmount) {
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

	const validateChoice = () => {
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
			chosenOptionNum < priceConfig.minAmount
		) {
			return `${minPriceDisplay} a ${props.mainPlan.billingPeriod} is the minimum payment to receive this subscription. Please call our customer service team to lower your ${monthlyOrAnnual} amount below ${minPriceDisplay} via the Help Centre`;
		} else if (
			!isNaN(chosenOptionNum) &&
			chosenOptionNum > priceConfig.maxAmount
		) {
			return `There is a maximum ${
				props.mainPlan.billingPeriod
			}ly contribution amount of ${
				props.mainPlan.currency
			}${priceConfig.maxAmount.toFixed(2)} ${props.mainPlan.currencyISO}`;
		}
		return null;
	};

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
		const newErrorMessage = validateChoice();
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
						<ChoiceCardGroup
							name="amounts"
							data-cy="contribution-amount-choices"
							label="Choose the amount to contribute"
							columns={2}
						>
							<>
								{suggestedAmounts(props.currentAmount).map(
									(amount) => (
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
						<section
							css={css`
								margin-top: ${space[3]}px;
							`}
						>
							<ThemeProvider
								theme={buttonThemeReaderRevenueBrand}
							>
								<Button
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
								{monthlyOrAnnual} amount below {minPriceDisplay}{' '}
								please call us via the{' '}
								<Link href="/help-centre">Help Centre</Link>
							</p>
						</div>
						<p css={smallPrintCss}>
							{minPriceDisplay} per {props.mainPlan.billingPeriod}{' '}
							is the minimum payment to receive this subscription.
						</p>
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
					</div>
				</div>
			</div>
		</>
	);
};
