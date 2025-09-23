import { css } from '@emotion/react';
import {
	palette,
	space,
	textSans14,
	textSans17,
	until,
} from '@guardian/source/foundations';
import {
	Button,
	ChoiceCard,
	ChoiceCardGroup,
	InlineError,
	Link,
	SvgInfoRound,
	TextInput,
	themeButtonReaderRevenueBrand,
} from '@guardian/source/react-components';
import { useEffect, useState } from 'react';
import type { PaidSubscriptionPlan } from '../../../../../shared/productResponse';
import { MDA_TEST_USER_HEADER } from '../../../../../shared/productResponse';
import { getBillingPeriodAdjective } from '../../../../../shared/productTypes';
import { fetchWithDefaultParameters } from '../../../../utilities/fetch';
import { getSupporterPlusSuggestedAmountsFromMainPlan } from '../../../../utilities/pricingConfig/suggestedAmounts';
import { supporterPlusPriceConfigByCountryGroup } from '../../../../utilities/pricingConfig/supporterPlusPricing';
import { JsonResponseHandler } from '../../shared/asyncComponents/DefaultApiResponseHandler';
import { DefaultLoadingView } from '../../shared/asyncComponents/DefaultLoadingView';

const smallPrintCss = css`
	${textSans14};
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

const getAmountUpdater = (
	newAmount: number,
	subscriptionName: string,
	isTestUser: boolean,
) =>
	fetchWithDefaultParameters(
		`/api/update-supporter-plus-amount/${subscriptionName}`,
		{
			method: 'POST',
			body: JSON.stringify({ newPaymentAmount: newAmount }),
			headers: {
				[MDA_TEST_USER_HEADER]: `${isTestUser}`,
			},
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
	const monthlyOrAnnual = getBillingPeriodAdjective(
		mainPlan.billingPeriod,
	).toLocaleLowerCase();

	if (!chosenAmount && !isOtherAmountSelected) {
		return 'Please make a selection';
	} else if (chosenOptionNum === currentAmount) {
		return 'You have selected the same amount as you currently pay';
	} else if (!chosenAmount || isNaN(chosenOptionNum)) {
		return 'There is a problem with the amount you have selected, please make sure it is a valid amount';
	} else if (!isNaN(chosenOptionNum) && chosenOptionNum < minAmount) {
		return `${mainPlan.currency}${minAmount} per ${
			mainPlan.billingPeriod
		} is the ${
			currentAmount < minAmount ? 'new ' : ''
		}minimum payment to receive this subscription. Please call our customer service team to lower your ${monthlyOrAnnual} amount below ${
			mainPlan.currency
		}${minAmount} via the Help Centre`;
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
	isTestUser: boolean;
}

export const SupporterPlusUpdateAmountForm = (
	props: SupporterPlusUpdateAmountFormProps,
) => {
	const priceConfig = (supporterPlusPriceConfigByCountryGroup[
		props.mainPlan.currencyISO
	] || supporterPlusPriceConfigByCountryGroup.international)[
		props.mainPlan.billingPeriod
	];
	const currentAmountIsBelowNewMin =
		props.currentAmount < priceConfig.minAmount;

	const minPriceDisplay = `${props.mainPlan.currency}${priceConfig.minAmount}`;
	const monthlyOrAnnual = getBillingPeriodAdjective(
		props.mainPlan.billingPeriod,
	);

	const defaultOtherAmount = priceConfig.minAmount;

	const [otherAmount, setOtherAmount] = useState<number | null>(
		defaultOtherAmount,
	);
	const [otherAmountInput, setOtherAmountInput] = useState<string>(
		defaultOtherAmount?.toString() ?? '',
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
	}, [otherAmount, defaultOtherAmount]);

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
	}, [
		otherAmount,
		selectedValue,
		chosenAmount,
		isOtherAmountSelected,
		priceConfig.minAmount,
		priceConfig.maxAmount,
		props.currentAmount,
		props.mainPlan,
	]);

	useEffect(() => {
		if (confirmedAmount) {
			props.onUpdateConfirmed(confirmedAmount);
		}
	}, [confirmedAmount, props]);

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
			props.isTestUser,
		);

		try {
			const data = await JsonResponseHandler(response);
			if (data === null) {
				setUpdateFailedStatus(true);
				setShowUpdateLoader(false);
			}
			setConfirmedAmount(pendingAmount);
		} catch {
			setUpdateFailedStatus(true);
			setShowUpdateLoader(false);
		}
	};

	const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const next = event.target.value.trim();

		if (next === '') {
			setOtherAmountInput('');
			setOtherAmount(null);
			return;
		}

		// Whole-string match: 1+ digits, optional '.' or ',', and 0–2 fractional digits (allows '2', '2.', '2,', '2.5', '2,50').
		if (/^\d+(?:[.,]\d{0,2})?$/.test(next)) {
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

		// Remove leading zeros
		if (processed !== '' && processed !== '0') {
			processed = processed.replace(/^0+(?=\d)/, '');
		}

		setOtherAmountInput(processed);
		setOtherAmount(processed === '' ? null : Number(processed));
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
						${textSans17};
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
						<ChoiceCardGroup
							name="amounts"
							data-cy="supporter-plus-amount-choices"
							label="Choose your new amount"
							columns={2}
						>
							<>
								{getSupporterPlusSuggestedAmountsFromMainPlan(
									props.mainPlan,
								).map((amount, index) => (
									<ChoiceCard
										id={`amount-${amount}`}
										key={`sp-amount-${amount}-index-${index}`}
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
									type="text"
									inputMode="decimal"
									value={otherAmountInput}
									onChange={onChangeHandler}
									onBlur={onBlurHandler}
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
							<Button
								theme={themeButtonReaderRevenueBrand}
								cssOverrides={buttonCentredCss}
								onClick={changeAmountClick}
								size="small"
							>
								Change amount
							</Button>
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
								If you would like to{' '}
								{currentAmountIsBelowNewMin
									? 'change'
									: 'lower'}{' '}
								your {monthlyOrAnnual.toLowerCase()} amount
								below {minPriceDisplay} please call us via the{' '}
								<Link href="/help-centre#call-us">
									Help Centre
								</Link>
							</p>
						</div>
						<p css={smallPrintCss}>
							{minPriceDisplay} per {props.mainPlan.billingPeriod}{' '}
							is the {currentAmountIsBelowNewMin ? 'new ' : ''}
							minimum payment to receive this subscription.
						</p>
					</div>
				</div>
			</div>
		</>
	);
};
