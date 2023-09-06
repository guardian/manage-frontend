import { css } from '@emotion/react';
import { headline, space, textSans, until } from '@guardian/source-foundations';
import { Stack } from '@guardian/source-react-components';
import { useContext, useState } from 'react';
import type { PreviewResponse } from '../../../../shared/productSwitchTypes';
import { useAsyncLoader } from '../../../utilities/hooks/useAsyncLoader';
import { productMoveFetch } from '../../../utilities/productUtils';
import { getSuggestedAmountsFromMainPlan } from '../../../utilities/supporterPlusPricing';
import { JsonResponseHandler } from '../shared/asyncComponents/DefaultApiResponseHandler';
import { ConfirmForm } from './ConfirmForm';
import { UpgradeSupportAmountForm } from './UpgradeSupportAmountForm';
import type { UpgradeSupportInterface } from './UpgradeSupportContainer';
import { UpgradeSupportContext } from './UpgradeSupportContainer';

export const UpgradeSupport = () => {
	const { mainPlan, subscription } = useContext(
		UpgradeSupportContext,
	) as UpgradeSupportInterface;

	const suggestedAmounts = getSuggestedAmountsFromMainPlan(mainPlan);

	const [chosenAmount, setChosenAmount] = useState<number | null>(
		suggestedAmounts[0],
	);
	const [continuedToConfirmation, setContinuedToConfirmation] =
		useState<boolean>(false);

	const currentAmount = mainPlan.price / 100;
	const { data: previewResponse } = useAsyncLoader<PreviewResponse>(
		() =>
			productMoveFetch(
				subscription.subscriptionId,
				10,
				'recurring-contribution-to-supporter-plus',
				false,
				true,
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
							{currentAmount} per {mainPlan.billingPeriod}.
						</div>
					</Stack>
					<UpgradeSupportAmountForm
						chosenAmount={chosenAmount}
						setChosenAmount={setChosenAmount}
						setContinuedToConfirmation={setContinuedToConfirmation}
						continuedToConfirmation={continuedToConfirmation}
						suggestedAmounts={suggestedAmounts}
					/>
					{continuedToConfirmation && chosenAmount && (
						<ConfirmForm
							chosenAmount={chosenAmount}
							setChosenAmount={setChosenAmount}
							suggestedAmounts={suggestedAmounts}
							previewResponse={previewResponse}
						/>
					)}
				</Stack>
			</section>
		</>
	);
};
