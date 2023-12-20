import { css } from '@emotion/react';
import { headline, space, textSans, until } from '@guardian/source-foundations';
import { Stack } from '@guardian/source-react-components';
import { useContext, useState } from 'react';
import { JsonResponseProcessor } from '@/client/utilities/responseHandlers';
import { formatAmount } from '@/client/utilities/utils';
import type { PreviewResponse } from '../../../../shared/productSwitchTypes';
import type { CurrencyIso } from '../../../utilities/currencyIso';
import type { LoadingState } from '../../../utilities/hooks/useAsyncLoader';
import { useAsyncLoader } from '../../../utilities/hooks/useAsyncLoader';
import { getContributionSuggestedAmounts } from '../../../utilities/pricingConfig/suggestedAmounts';
import { getBenefitsThreshold } from '../../../utilities/pricingConfig/supporterPlusPricing';
import { productMoveFetch } from '../../../utilities/productUtils';
import { ConfirmForm } from './ConfirmForm';
import { UpgradeSupportAmountForm } from './UpgradeSupportAmountForm';
import type { UpgradeSupportInterface } from './UpgradeSupportContainer';
import { UpgradeSupportContext } from './UpgradeSupportContainer';

export const UpgradeSupport = () => {
	const { mainPlan, subscription } = useContext(
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
		mainPlan.currencyISO as CurrencyIso,
		mainPlan.billingPeriod as 'month' | 'year',
	);

	const {
		data: previewResponse,
		loadingState: previewLoadingState,
	}: { data: PreviewResponse | null; loadingState: LoadingState } =
		useAsyncLoader<PreviewResponse>(
			() =>
				productMoveFetch(
					subscription.subscriptionId,
					threshold,
					'recurring-contribution-to-supporter-plus',
					false,
					true,
				),
			JsonResponseProcessor,
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
								${headline.medium({ fontWeight: 'bold' })};
								${until.tablet} {
									${headline.xsmall({ fontWeight: 'bold' })};
								}
							`}
						>
							Increase your support
						</h2>
						<div
							css={css`
								${textSans.medium()};
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
