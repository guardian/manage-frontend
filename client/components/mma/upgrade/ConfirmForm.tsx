import { css } from '@emotion/react';
import { from, palette, space, textSans } from '@guardian/source-foundations';
import {
	Button,
	Stack,
	SvgClock,
	SvgCreditCard,
	SvgReload,
} from '@guardian/source-react-components';
import type { Dispatch, SetStateAction } from 'react';
import { useContext, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import type { Subscription } from '../../../../shared/productResponse';
import type {
	PreviewResponse,
	ProductSwitchType,
} from '../../../../shared/productSwitchTypes';
import { contributionPaidByCard } from '../../../fixtures/productBuilder/testProducts';
import type { CurrencyIso } from '../../../utilities/currencyIso';
import { fetchWithDefaultParameters } from '../../../utilities/fetch';
import {
	LoadingState,
	useAsyncLoader,
} from '../../../utilities/hooks/useAsyncLoader';
import { getBenefitsThreshold } from '../../../utilities/supporterPlusPricing';
import { GenericErrorScreen } from '../../shared/GenericErrorScreen';
import { JsonResponseHandler } from '../shared/asyncComponents/DefaultApiResponseHandler';
import { DefaultLoadingView } from '../shared/asyncComponents/DefaultLoadingView';
import { Heading } from '../shared/Heading';
import { PaymentDetails } from '../shared/PaymentDetails';
import { SupporterPlusTsAndCs } from '../shared/SupporterPlusTsAndCs';
import type {
	UpgradeRouterState,
	UpgradeSupportInterface,
} from './UpgradeSupportContainer';
import { UpgradeSupportContext } from './UpgradeSupportContainer';

const iconListCss = css`
	${textSans.medium()};
	list-style: none;
	padding: 0;
	margin-bottom: 0;

	li + li {
		margin-top: ${space[2]}px;
		${from.tablet} {
			margin-top: ${space[3]}px;
		}
	}

	li {
		display: flex;
		margin-left: -4px;
		align-items: flex-start;

		> svg {
			flex-shrink: 0;
			margin-right: 8px;
			fill: currentColor;
		}
	}
`;

const listWithDividersCss = css`
	li + li {
		> svg {
			padding-top: ${space[2]}px;
			${from.tablet} {
				padding-top: ${space[3]}px;
			}
		}
		> span {
			flex-grow: 1;
			padding-top: ${space[2]}px;
			border-top: 1px solid ${palette.neutral[86]};
			min-width: 0;
			${from.tablet} {
				padding-top: ${space[3]}px;
			}
		}
	}
`;

const WhatHappensNext = ({
	contributionPriceDisplay,
	subscription,
}: {
	contributionPriceDisplay: string;
	subscription: Subscription;
}) => {
	return (
		<section>
			<Stack space={4}>
				<Heading sansSerif>What happens next?</Heading>
				<ul css={[iconListCss, listWithDividersCss]}>
					<li>
						<SvgClock size="medium" />
						<span>
							<strong>Price change will happen today</strong>
							<br />
							You can start enjoying your exclusive extras
							straight away
						</span>
					</li>
					<li>
						<SvgReload size="medium" />
						<span>
							<strong>
								Your first payment will be just{' '}
								{contributionPriceDisplay}
							</strong>
							<br />
							We will charge you...
						</span>
					</li>
					<li>
						<SvgCreditCard size="medium" />
						<span data-qm-masking="blocklist">
							<strong>Your payment method</strong>
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
}: {
	setChosenAmount: Dispatch<SetStateAction<number | null>>;
	thresholdAmount: number;
	chosenAmountPreRoundup: number;
}) => {
	const [hasRoundedUp, setHasRoundedUp] = useState<boolean>(false);

	return (
		<Stack space={2}>
			<p>Want to unlock all extras?</p>
			<section>
				<Button
					onClick={() => {
						const toggleRoundUp = !hasRoundedUp;
						setHasRoundedUp(toggleRoundUp);
						setChosenAmount(
							toggleRoundUp
								? thresholdAmount
								: chosenAmountPreRoundup,
						);
					}}
				>
					{hasRoundedUp ? 'Rounded up' : 'Round up'}
				</Button>
			</section>
		</Stack>
	);
};

const productMoveFetch = (
	subscriptionId: string,
	chosenAmount: number,
	preview: boolean,
	checkChargeAmountBeforeUpdate: boolean,
) =>
	fetch(`/api/product-move/${productSwitchType}/${subscriptionId}`, {
		method: 'POST',
		body: JSON.stringify({
			price: chosenAmount,
			preview,
			checkChargeAmountBeforeUpdate,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});

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

const productSwitchType: ProductSwitchType =
	'recurring-contribution-to-supporter-plus';

interface ConfirmFormProps {
	chosenAmount: number;
	setChosenAmount: Dispatch<SetStateAction<number | null>>;
	suggestedAmounts: number[];
}

export const ConfirmForm = ({
	chosenAmount,
	setChosenAmount,
	suggestedAmounts,
}: ConfirmFormProps) => {
	const { mainPlan, subscription } = useContext(
		UpgradeSupportContext,
	) as UpgradeSupportInterface;

	const navigate = useNavigate();
	const location = useLocation();
	const routerState = (location.state || {}) as UpgradeRouterState;
	routerState.chosenAmount = chosenAmount;

	const threshold = getBenefitsThreshold(
		mainPlan.currencyISO as CurrencyIso,
		mainPlan.billingPeriod as 'month' | 'year',
	);
	const aboveThreshold = chosenAmount >= threshold;

	const [shouldShowRoundUp] = useState<boolean>(
		!aboveThreshold && suggestedAmounts.includes(threshold),
	);

	const [chosenAmountPreRoundup] = useState<number>(chosenAmount);

	const [isConfirmationLoading, setIsConfirmationLoading] =
		useState<boolean>(false);

	const amountToPreview = aboveThreshold ? chosenAmount : threshold;

	const {
		data: previewResponse,
		loadingState,
	}: {
		data: PreviewResponse | null;
		loadingState: LoadingState;
	} = useAsyncLoader(
		() =>
			productMoveFetch(
				subscription.subscriptionId,
				amountToPreview,
				true,
				false,
			),
		JsonResponseHandler,
	);

	if (loadingState == LoadingState.HasError) {
		return <GenericErrorScreen />;
	}
	if (loadingState == LoadingState.IsLoading) {
		return <DefaultLoadingView />;
	}
	if (previewResponse === null) {
		return <Navigate to="/" />;
	}

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
				false,
				previewResponse.checkChargeAmountBeforeUpdate,
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
		<Stack space={2}>
			<Heading>2. Confirm change</Heading>
			{shouldShowRoundUp && (
				<RoundUp
					setChosenAmount={setChosenAmount}
					thresholdAmount={threshold}
					chosenAmountPreRoundup={chosenAmountPreRoundup}
				/>
			)}
			{aboveThreshold && (
				<WhatHappensNext
					contributionPriceDisplay={`${previewResponse.amountPayableToday}`}
					subscription={contributionPaidByCard().subscription}
				/>
			)}
			<section>
				<Button
					onClick={confirmOnClick}
					isLoading={isConfirmationLoading}
				>
					Confirm support change
				</Button>
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
