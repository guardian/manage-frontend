import { css } from '@emotion/react';
import { headline } from '@guardian/source-foundations';
import { Stack } from '@guardian/source-react-components';
import { useState } from 'react';
import { sectionSpacing } from '../switch/SwitchStyles';
import { ConfirmForm } from './ConfirmForm';
import { UpgradeSupportAmountForm } from './UpgradeSupportAmountForm';

export const UpgradeSupport = () => {
	const [chosenAmount, setChosenAmount] = useState<number>(0);

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
					<UpgradeSupportAmountForm />
					<ConfirmForm
						chosenAmount={chosenAmount}
						setChosenAmount={setChosenAmount}
						threshold={10}
					/>
				</Stack>
			</section>
		</>
	);
};
