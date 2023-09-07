import { css } from '@emotion/react';
import { headline } from '@guardian/source-foundations';
import { Stack } from '@guardian/source-react-components';
import { useContext, useState } from 'react';
import { sectionSpacing } from '../../../styles/GenericStyles';
import { getSuggestedAmountsFromMainPlan } from '../../../utilities/supporterPlusPricing';
import { ConfirmForm } from './ConfirmForm';
import { UpgradeSupportAmountForm } from './UpgradeSupportAmountForm';
import type { UpgradeSupportInterface } from './UpgradeSupportContainer';
import { UpgradeSupportContext } from './UpgradeSupportContainer';

export const UpgradeSupport = () => {
	const upgradeSupportContext = useContext(
		UpgradeSupportContext,
	) as UpgradeSupportInterface;

	const suggestedAmounts = getSuggestedAmountsFromMainPlan(
		upgradeSupportContext.mainPlan,
	);

	const [chosenAmount, setChosenAmount] = useState<number | null>(
		suggestedAmounts[0],
	);
	const [continuedToConfirmation, setContinuedToConfirmation] =
		useState<boolean>(false);

	return (
		<>
			<section css={sectionSpacing}>
				<Stack space={3}>
					<h2
						css={css`
							${headline.xsmall({ fontWeight: 'bold' })};
							margin-bottom: 0;
						`}
					>
						1. Increase your support
					</h2>
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
						/>
					)}
				</Stack>
			</section>
		</>
	);
};
