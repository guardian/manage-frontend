import { css } from '@emotion/react';
import { palette } from '@guardian/source-foundations';

export const ProductInfoTableV2 = () => {
	return (
		<>
			<div
				css={css`
					background-color: ${palette.neutral[97]};
					display: flex;
					width: 803px;
					flex-wrap: wrap;
					padding: 16px 24px;
				`}
			>
				<div className="subscription-id">
					<span
						css={css`
							margin-right: 8px;
						`}
					>
						Subscription ID
					</span>
					<span
						css={css`
							margin-right: 32px;
							color: #606060;
						`}
					>
						test
					</span>
					<span
						css={css`
							margin-right: 8px;
						`}
					>
						Start Date
					</span>
					<span
						css={css`
							color: #606060;
						`}
					>
						test
					</span>
				</div>
			</div>
		</>
	);
};
