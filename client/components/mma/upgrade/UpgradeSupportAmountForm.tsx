import { css } from '@emotion/react';
import { palette, space, textSans } from '@guardian/source-foundations';
import {
	Button,
	ChoiceCard,
	ChoiceCardGroup,
} from '@guardian/source-react-components';
import { InfoIconDark } from '../shared/assets/InfoIconDark';

export const UpgradeSupportAmountForm = () => {
	return (
		<>
			<div
				css={css`
					border: 1px solid ${palette.neutral[20]};
					margin-bottom: ${space[5]}px;
					padding: ${space[3]}px ${space[5]}px;
					${textSans.medium()};
				`}
			>
				<InfoIconDark />
				You're currently supporting XYZ.
				<dl />
				<ChoiceCardGroup
					name="amounts"
					data-cy="contribution-amount-choices"
					label="Choose your new amount"
					columns={2}
				>
					<>
						<ChoiceCard
							id={`amount-other`}
							value="£15"
							label="£15"
						/>
						<ChoiceCard
							id={`amount-other`}
							value="£12"
							label="£12"
						/>
						<ChoiceCard
							id={`amount-other`}
							value="£10"
							label="£10"
						/>
						<ChoiceCard
							id={`amount-other`}
							value="Choose your amount"
							label="Choose your amount"
						/>
					</>
				</ChoiceCardGroup>
				<div
					css={css`
						max-width: 500px;
					`}
				></div>
				<Button>Continue with XYZ</Button>
			</div>
		</>
	);
};
