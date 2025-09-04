import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans15,
	textSans17,
	textSansBold17,
	textSansBold20,
	until,
} from '@guardian/source/foundations';
import {
	Button,
	Stack,
	SvgClock,
	SvgCreditCard,
	SvgReload,
	themeButtonReaderRevenueBrand,
} from '@guardian/source/react-components';
import { ToggleSwitch } from '@guardian/source-development-kitchen/react-components';
import type { Dispatch, SetStateAction } from 'react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { formatAmount } from '@/client/utilities/utils';
import { dateString } from '../../../../shared/dates';
import type {
	BillingPeriod,
	PaidSubscriptionPlan,
	Subscription,
} from '../../../../shared/productResponse';
import type { SwitchPreviewResponse } from '../../../../shared/productSwitchTypes';
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
import { calculateAmountPayableToday } from '../../../utilities/productMovePreview';
import { contribToSupporterPlusFetch } from '../../../utilities/productUtils';
import { GenericErrorScreen } from '../../shared/GenericErrorScreen';
import { SwitchErrorSummary } from '../../shared/productSwitch/SwitchErrorSummary';
import { SwitchPaymentInfo } from '../../shared/productSwitch/SwitchPaymentInfo';
import {
	JsonResponseHandler,
	TextResponseHandler,
} from '../shared/asyncComponents/DefaultApiResponseHandler';
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
				padding-bottom: ${space[5]}px;
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
							${textSansBold20};
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
							straight away.
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
	billingPeriod: BillingPeriod;
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
						${textSansBold17};
						padding-right: ${space[4]}px;
						color: ${hasRoundedUp
							? palette.neutral[0]
							: palette.neutral[20]};
					`}
				>
					Round up to unlock extras ({currencySymbol}
					{thresholdAmount}/{billingPeriod})
				</div>
				<div
					css={css`
						${until.tablet} {
							${textSans15};
						}
						${textSans17};
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
	previewResponse: SwitchPreviewResponse | null;
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
	const { mainPlan, subscription, inPaymentFailure, isTestUser } = useContext(
		UpgradeSupportContext,
	) as UpgradeSupportInterface;

	const navigate = useNavigate();

	const currencySymbol = mainPlan.currency;
	const aboveThreshold = chosenAmount >= threshold;
	const previousPrice = mainPlan.price / 100;

	const [shouldShowRoundUp] = useState<boolean>(
		!aboveThreshold && suggestedAmounts.includes(threshold),
	);

	const [chosenAmountPreRoundup] = useState<number>(chosenAmount);

	const [isConfirmationLoading, setIsConfirmationLoading] =
		useState<boolean>(false);
	const [confirmationError, setConfirmationError] = useState<boolean>(false);

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

	const confirmOnClick = async () => {
		if (isConfirmationLoading) {
			return;
		}

		if (inPaymentFailure) {
			setConfirmationError(true);
			return;
		}

		setIsConfirmationLoading(true);

		const routerState = {
			chosenAmount,
			amountPayableToday,
			nextPaymentDate,
			journeyCompleted: true,
		} as UpgradeRouterState;

		try {
			if (aboveThreshold) {
				const data = await contribToSupporterPlusFetch(
					subscription.subscriptionId,
					false,
					isTestUser,
					undefined,
					chosenAmount,
				).then((r) => JsonResponseHandler(r));

				if (data === null) {
					setIsConfirmationLoading(false);
					setConfirmationError(true);
				}

				setIsConfirmationLoading(false);
				navigate('switch-thank-you', {
					state: routerState,
				});
			} else {
				const data = await updateContributionAmountFetch(
					chosenAmount,
					subscription.subscriptionId,
				).then((r) => TextResponseHandler(r));

				if (data === null) {
					setIsConfirmationLoading(false);
					setConfirmationError(true);
				}

				setIsConfirmationLoading(false);
				navigate('thank-you', {
					state: routerState,
				});
			}
		} catch {
			setIsConfirmationLoading(false);
			setConfirmationError(true);
		}
	};

	const increaseText = chosenAmount > previousPrice ? 'increase' : 'change';

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
					2. Confirm support {increaseText}
				</Heading>
				<div
					css={css`
						${textSans17};
					`}
				>
					You've selected to support {currencySymbol}
					{formatAmount(chosenAmount)} per {mainPlan.billingPeriod}
					{aboveThreshold ? ', which unlocks all extras' : ''}.
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
					alreadyPayingAboveThreshold={previousPrice >= threshold}
				/>
			)}
			<section css={buttonContainerCss}>
				<Button
					theme={themeButtonReaderRevenueBrand}
					cssOverrides={buttonCentredCss}
					onClick={confirmOnClick}
					isLoading={isConfirmationLoading}
				>
					Confirm {increaseText} to {currencySymbol}
					{formatAmount(chosenAmount)}/{mainPlan.billingPeriod}
				</Button>
			</section>
			{confirmationError && (
				<section id="upgradeSupportErrorMessage">
					<SwitchErrorSummary inPaymentFailure={inPaymentFailure} />
				</section>
			)}
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
