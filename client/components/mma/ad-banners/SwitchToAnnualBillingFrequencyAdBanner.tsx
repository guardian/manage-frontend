import { css } from '@emotion/react';
import {
	palette,
	space,
	textSans20,
	textSansBold15,
} from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import { standardSansText } from '../identity/sharedStyles';

const containerStyles = css`
	border-radius: ${space[3]}px;
	background: ${palette.brandAlt[400]};
	padding: ${space[6]}px ${space[8]}px;
`;

const offerBadgeStyles = css`
	${standardSansText};
	${textSansBold15};
	display: inline-flex;
	align-items: center;
	gap: ${space[0]}px;
	border-radius: ${space[1]}px;
	background: ${palette.sport[400]};
	color: ${palette.sport[800]};
	padding: ${space[1]}px ${space[2]}px;
	margin: 0;
`;

const contentWrapperStyles = css`
	margin-top: ${space[1]}px;
	display: flex;
	align-items: flex-end;
`;

const textStyles = css`
	${standardSansText};
	${textSans20};
	flex: 1;
	padding-right: ${space[8]}px;
	margin: 0;
	color: ${palette.brand[100]};
`;

export const SwitchToAnnualBillingFrequencyAdBanner = () => {
	return (
		<aside
			aria-label="Switch to annual billing offer"
			css={containerStyles}
		>
			<span css={offerBadgeStyles}>Offer</span>
			<div css={contentWrapperStyles}>
				<p css={textStyles}>
					Save £XX per year by switching from monthly to annual
					billing
				</p>
				<Button
					priority="primary"
					size="small"
					onClick={() => {
						// changeSubscriptionBillingFrequencyFetch(
						// 	true,
						// 	'A-S01024113',
						// 	true,
						// 	'Month',
						// );
					}}
				>
					Switch to annual billing
				</Button>
			</div>
		</aside>
	);
};
