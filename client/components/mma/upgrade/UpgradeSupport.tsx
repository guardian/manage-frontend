import { css } from '@emotion/react';
import {
	headlineBold24,
	headlineBold34,
	space,
	textSans17,
	until,
} from '@guardian/source/foundations';
import { Stack } from '@guardian/source/react-components';
import { useContext, useState } from 'react';
import { formatAmount } from '@/client/utilities/utils';
import type { SwitchPreviewResponse } from '../../../../shared/productSwitchTypes';
import { useAsyncLoader } from '../../../utilities/hooks/useAsyncLoader';
import { getContributionSuggestedAmounts } from '../../../utilities/pricingConfig/suggestedAmounts';
import { getBenefitsThreshold } from '../../../utilities/pricingConfig/supporterPlusPricing';
import { productMoveFetch } from '../../../utilities/productUtils';
import { JsonResponseHandler } from '../shared/asyncComponents/DefaultApiResponseHandler';
import { ConfirmForm } from './ConfirmForm';
import { UpgradeSupportAmountForm } from './UpgradeSupportAmountForm';
import type { UpgradeSupportInterface } from './UpgradeSupportContainer';
import { UpgradeSupportContext } from './UpgradeSupportContainer';

export const UpgradeSupport = () => {
	const { mainPlan, subscription, isTestUser } = useContext(
		UpgradeSupportContext,
	) as UpgradeSupportInterface;

	const suggestedAmounts = getContributionSuggestedAmounts(mainPlan);

	const [chosenAmount, setChosenAmount] = useState<number | null>(
		suggestedAmounts[0],
	);
	const [continuedToConfirmation, setContinuedToConfirmation] =
		useState<boolean>(false);

	const currentAmount = mainPlan.price / 100;
	const threshold = getBenefitsThreshold(
		mainPlan.currencyISO,
		mainPlan.billingPeriod as 'month' | 'year',
	);

	const { data: previewResponse, loadingState: previewLoadingState } =
		useAsyncLoader<SwitchPreviewResponse>(
			() =>
				productMoveFetch(
					subscription.subscriptionId,
					threshold,
					'recurring-contribution-to-supporter-plus',
					true,
					isTestUser,
				),
			JsonResponseHandler,
		);

	return (
		<>
			<section
				css={css`
					margin-top: ${space[4]}px;
				`}
			>
				<Stack space={6}>
					<Stack space={1}>
						<h2
							css={css`
								margin: 0;
								${headlineBold34};
								${until.tablet} {
									${headlineBold24};
								}
							`}
						>
							Increase your support
						</h2>
						<div
							css={css`
								${textSans17};
								padding-bottom: ${space[2]}px;
								${until.tablet} {
									padding-bottom: ${space[4]}px;
								}
							`}
						>
							You're currently supporting {mainPlan.currency}
							{formatAmount(currentAmount)} per{' '}
							{mainPlan.billingPeriod}.
						</div>
					</Stack>
					<UpgradeSupportAmountForm
						chosenAmount={chosenAmount}
						setChosenAmount={setChosenAmount}
						threshold={threshold}
						setContinuedToConfirmation={setContinuedToConfirmation}
						continuedToConfirmation={continuedToConfirmation}
						suggestedAmounts={suggestedAmounts}
					/>
					{continuedToConfirmation && chosenAmount && (
						<ConfirmForm
							chosenAmount={chosenAmount}
							setChosenAmount={setChosenAmount}
							threshold={threshold}
							suggestedAmounts={suggestedAmounts}
							previewResponse={previewResponse}
							previewLoadingState={previewLoadingState}
						/>
					)}
				</Stack>
			</section>
		</>
	);
};
