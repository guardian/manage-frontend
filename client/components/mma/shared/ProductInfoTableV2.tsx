import { css } from '@emotion/react';
import { palette, space } from '@guardian/source-foundations';
import { parseDate } from '@/shared/dates';
import type { ProductDetail } from '@/shared/productResponse';

export interface ProductInfoTableProps {
	productDetail: ProductDetail;
}

export const ProductInfoTableV2 = (props: ProductInfoTableProps) => {
	return (
		<>
			<div
				css={css`
					background-color: ${palette.neutral[97]};
					display: flex;
					width: 803px;
					flex-wrap: wrap;
					padding: ${space[4]}px ${space[6]}px;
				`}
			>
				<div className="subscription-id">
					<span
						css={css`
							margin-right: ${space[2]}px;
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
						{props.productDetail.subscription.subscriptionId}
					</span>
					<span
						css={css`
							margin-right: ${space[2]}px;
						`}
					>
						Start Date
					</span>
					<span
						css={css`
							color: #606060;
						`}
					>
						{props.productDetail.subscription.start
							? parseDate(
									props.productDetail.subscription.start,
							  ).dateStr()
							: '-'}
					</span>
				</div>
			</div>
		</>
	);
};
