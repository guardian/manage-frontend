import { css, ThemeProvider } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import {
	Button,
	buttonThemeReaderRevenueBrand,
	Stack,
	SvgClock,
	SvgCreditCard,
	SvgReload,
} from '@guardian/source-react-components';
import { ToggleSwitch } from '@guardian/source-react-components-development-kitchen';
import type { Dispatch, SetStateAction } from 'react';
import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { dateString } from '../../../../shared/dates';
import type {
	PaidSubscriptionPlan,
	Subscription,
} from '../../../../shared/productResponse';
import type { PreviewResponse } from '../../../../shared/productSwitchTypes';
import {
	buttonCentredCss,
	buttonContainerCss,
} from '../../../styles/ButtonStyles';
import {
	iconListCss,
	listWithDividersCss,
	whatHappensNextIconCss,
} from '../../../styles/GenericStyles';
import { fetchWithDefaultParameters } from '../../../utilities/fetch';
import { LoadingState } from '../../../utilities/hooks/useAsyncLoader';
import {
	calculateAmountPayableToday,
	calculateCheckChargeAmountBeforeUpdate,
} from '../../../utilities/productMovePreview';
import { productMoveFetch } from '../../../utilities/productUtils';
import { GenericErrorScreen } from '../../shared/GenericErrorScreen';
import { SwitchPaymentInfo } from '../../shared/productSwitch/SwitchPaymentInfo';
import { DefaultLoadingView } from '../shared/asyncComponents/DefaultLoadingView';
import { Heading } from '../shared/Heading';
import { PaymentDetails } from '../shared/PaymentDetails';
import { SupporterPlusTsAndCs } from '../shared/SupporterPlusTsAndCs';
import type {
	UpgradeRouterState,
	UpgradeSupportInterface,
} from './UpgradeSupportContainer';
import { UpgradeSupportContext } from './UpgradeSupportContainer';

const WhatHappensNext = ({
	amountPayableToday,
	mainPlan,
	subscription,
	nextPaymentDate,
	chosenAmount,
	alreadyPayingAboveThreshold,
}: {
	amountPayableToday: number;
	mainPlan: PaidSubscriptionPlan;
	subscription: Subscription;
	nextPaymentDate: string;
	chosenAmount: number;
	alreadyPayingAboveThreshold: boolean;
}) => {
	return (
		<section
			css={css`
				border-bottom: 1px solid ${palette.neutral[86]};
				padding-bottom: ${space[4] + space[1]}px;
			`}
		>
			<Stack space={4}>
				<div
					css={css`
						border-top: 1px solid ${palette.neutral[86]};
						padding-bottom: ${space[1]}px;
					`}
				>
					<h3
						css={css`
							${textSans.large({ fontWeight: 'bold' })};
							padding-top: ${space[1]}px;
							margin: 0;
						`}
					>
						What happens next?
					</h3>
				</div>
				<ul
					css={[
						iconListCss,
						listWithDividersCss,
						whatHappensNextIconCss,
					]}
				>
					<li>
						<SvgClock size="medium" />
						<span>
							<strong
								css={css`
									padding-bottom: ${space[1]}px;
								`}
							>
								Price change will happen today
							</strong>
							<br />
							You can start enjoying your exclusive extras
							straight away
						</span>
					</li>
					<li>
						<SvgReload size="medium" />
						<span>
							<SwitchPaymentInfo
								amountPayableToday={amountPayableToday}
								alreadyPayingAboveThreshold={
									alreadyPayingAboveThreshold
								}
								currencySymbol={mainPlan.currency}
								supporterPlusPurchaseAmount={chosenAmount}
								billingPeriod={mainPlan.billingPeriod}
								nextPaymentDate={nextPaymentDate}
							/>
						</span>
					</li>
					<li>
						<SvgCreditCard size="medium" />
						<span data-qm-masking="blocklist">
							<strong
								css={css`
									padding-bottom: ${space[1]}px;
								`}
							>
								Your payment method
							</strong>
							<br />
							The payment will be taken from{' '}
							<PaymentDetails subscription={subscription} />
						</span>
					</li>
				</ul>
			</Stack>
		</section>
	);
};

const RoundUp = ({
	setChosenAmount,
	thresholdAmount,
	chosenAmountPreRoundup,
	currencySymbol,
	billingPeriod,
}: {
	setChosenAmount: Dispatch<SetStateAction<number | null>>;
	thresholdAmount: number;
	chosenAmountPreRoundup: number;
	currencySymbol: string;
	billingPeriod: string;
}) => {
	const [hasRoundedUp, setHasRoundedUp] = useState<boolean>(false);

	return (
		<section
			css={css`
				display: flex;
				justify-content: space-between;
				${until.tablet} {
					padding: ${space[3]}px ${space[1]}px ${space[3]}px
						${space[3]}px;
				}
				padding: ${space[3]}px ${space[2]}px ${space[3]}px ${space[4]}px;
				border-radius: 4px;
				border: 1px solid ${palette.neutral[86]};
				background: ${hasRoundedUp
					? palette.neutral[97]
					: palette.neutral[100]};
			`}
		>
			<div>
				<div
					css={css`
						${textSans.medium({ fontWeight: 'bold' })};
						padding-right: ${space[4]}px;
						color: ${hasRoundedUp
							? palette.neutral[0]
							: palette.neutral[20]};
					`}
				>
					Round up to unlock all benefits ({currencySymbol}
					{thresholdAmount}/{billingPeriod})
				</div>
				<div
					css={css`
						${until.tablet} {
							${textSans.small()};
						}
						${textSans.medium()};
						color: ${palette.neutral[46]};
					`}
				>
					Get unlimited app access, ad-free reading, and more.
				</div>
			</div>
			<ToggleSwitch
				checked={hasRoundedUp}
				onClick={() => {
					const toggleRoundUp = !hasRoundedUp;
					setHasRoundedUp(toggleRoundUp);
					setChosenAmount(
						toggleRoundUp
							? thresholdAmount
							: chosenAmountPreRoundup,
					);
				}}
			/>
		</section>
	);
};

const updateContributionAmountFetch = (
	newAmount: number,
	subscriptionId: string,
) =>
	fetchWithDefaultParameters(
		`/api/update/amount/contributions/${subscriptionId}`,
		{
			method: 'POST',
			body: JSON.stringify({ newPaymentAmount: newAmount }),
		},
	);

interface ConfirmFormProps {
	chosenAmount: number;
	setChosenAmount: Dispatch<SetStateAction<number | null>>;
	threshold: number;
	suggestedAmounts: number[];
	previewResponse: PreviewResponse | null;
	previewLoadingState: LoadingState;
}

export const ConfirmForm = ({
	chosenAmount,
	setChosenAmount,
	threshold,
	suggestedAmounts,
	previewResponse,
	previewLoadingState,
}: ConfirmFormProps) => {
	const { mainPlan, subscription } = useContext(
		UpgradeSupportContext,
	) as UpgradeSupportInterface;

	const navigate = useNavigate();
	const location = useLocation();
	const routerState = (location.state || {}) as UpgradeRouterState;
	routerState.chosenAmount = chosenAmount;

	const currencySymbol = mainPlan.currency;
	const aboveThreshold = chosenAmount >= threshold;

	const [shouldShowRoundUp] = useState<boolean>(
		!aboveThreshold && suggestedAmounts.includes(threshold),
	);

	const [chosenAmountPreRoundup] = useState<number>(chosenAmount);

	const [isConfirmationLoading, setIsConfirmationLoading] =
		useState<boolean>(false);

	if (previewLoadingState === LoadingState.IsLoading) {
		return (
			<DefaultLoadingView loadingMessage="Loading your payment details..." />
		);
	}

	if (
		previewLoadingState === LoadingState.HasError ||
		previewResponse === null
	) {
		return <GenericErrorScreen />;
	}

	const amountPayableToday = calculateAmountPayableToday(
		chosenAmount,
		previewResponse.contributionRefundAmount,
	);

	const nextPaymentDate = dateString(
		new Date(previewResponse.nextPaymentDate),
		'd MMMM',
	);

	const checkChargeAmount =
		calculateCheckChargeAmountBeforeUpdate(amountPayableToday);

	routerState.amountPayableToday = previewResponse.amountPayableToday;

	const confirmOnClick = async () => {
		if (isConfirmationLoading) {
			return;
		}

		setIsConfirmationLoading(true);

		// ToDo: handle error responses
		if (aboveThreshold) {
			await productMoveFetch(
				subscription.subscriptionId,
				chosenAmount,
				'recurring-contribution-to-supporter-plus',
				checkChargeAmount,
				false,
			);
			setIsConfirmationLoading(false);
			navigate('../switch-thank-you');
		} else {
			await updateContributionAmountFetch(
				chosenAmount,
				subscription.subscriptionId,
			);
			setIsConfirmationLoading(false);
			navigate('thank-you', { state: routerState });
		}
	};

	return (
		<Stack space={4}>
			<section
				id="confirm-change"
				css={css`
					${from.tablet} {
						padding-bottom: ${space[2]}px;
					}
				`}
			>
				<Heading sansSerif level="3" borderless>
					2. Confirm support increase
				</Heading>
				<div
					css={css`
						${textSans.medium()}
					`}
				>
					You've selected to support {currencySymbol}
					{chosenAmount} per {mainPlan.billingPeriod}
					{aboveThreshold ? ', which unlocks all benefits' : ''}.
				</div>
			</section>
			{shouldShowRoundUp && (
				<RoundUp
					setChosenAmount={setChosenAmount}
					thresholdAmount={threshold}
					chosenAmountPreRoundup={chosenAmountPreRoundup}
					currencySymbol={currencySymbol}
					billingPeriod={mainPlan.billingPeriod}
				/>
			)}
			{aboveThreshold && (
				<WhatHappensNext
					amountPayableToday={amountPayableToday}
					mainPlan={mainPlan}
					subscription={subscription}
					nextPaymentDate={nextPaymentDate}
					chosenAmount={chosenAmount}
					alreadyPayingAboveThreshold={mainPlan.price >= threshold}
				/>
			)}
			<section css={buttonContainerCss}>
				<ThemeProvider theme={buttonThemeReaderRevenueBrand}>
					<Button
						cssOverrides={buttonCentredCss}
						onClick={confirmOnClick}
						isLoading={isConfirmationLoading}
					>
						Confirm increase to {currencySymbol}
						{chosenAmount}/{mainPlan.billingPeriod}
					</Button>
				</ThemeProvider>
			</section>
			{aboveThreshold && (
				<section>
					<SupporterPlusTsAndCs
						currencyISO={mainPlan.currencyISO}
						billingPeriod={mainPlan.billingPeriod}
					/>
				</section>
			)}
		</Stack>
	);
};
