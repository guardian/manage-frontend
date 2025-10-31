import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';

export const SwitchToAnnualBillingFrequencyAdBanner = () => {
	return (
		<aside
			aria-label="Switch to annual billing offer"
			css={css`
				border-radius: 12px;
				background: var(--Brand-brand-alt-brand-alt-400, #ffe500);
				padding: ${space[6]}px ${space[8]}px;
			`}
		>
			<span
				css={css`
					height: 24px;
					padding: 4px 8px;
					display: inline-flex;
					justify-content: center;
					align-items: center;
					gap: 2px;
					flex-shrink: 0;
					border-radius: 4px;
					background: var(--Pillar-sport-sport-400, #0077b6);
					margin: 0;
					color: var(
						--sport-sport-800,
						var(--Pillar-sport-sport-800, #f1f8fc)
					);
					text-align: center;
					font-family: GuardianTextSans;
					font-size: 15px;
					font-style: normal;
					font-weight: 700;
					line-height: 130%; /* 19.5px */
				`}
			>
				Offer
			</span>
			<div
				css={css`
					margin-top: ${space[1]}px;
					display: flex;
					align-items: flex-end;
				`}
			>
				<p
					css={css`
						color: var(
							--brand-brand-100,
							var(--Brand-brand-brand-100, #001536)
						);
						font-family: GuardianTextSans;
						font-size: 20px;
						font-style: normal;
						font-weight: 400;
						line-height: 130%;
						flex: 1;
						padding-right: ${space[8]}px;
						margin: 0;
					`}
				>
					Save £XX per year by switching from monthly to annual
					billing
				</p>
				<Button
					priority="primary"
					style={{
						height: '17px',
					}}
				>
					Switch to annual billing
				</Button>
			</div>
		</aside>
	);
};
