import { css } from '@emotion/react';
import { from, palette, space, textSans } from '@guardian/source-foundations';
import { parseDate } from '@/shared/dates';
import type { ProductDetail } from '@/shared/productResponse';

export interface ProductInfoTableProps {
	productDetail: ProductDetail;
}

export const ProductInfoTableV2 = (props: ProductInfoTableProps) => {
	const tableEntryCss = () => {
		return css`
			display: inline-block;
			vertical-align: top;
			${textSans.medium()};
			margin-right: ${space[2]}px;
		`;
	};

	const tableValueCss = () => {
		return css`
			color: #606060;
			display: inline-block;
			vertical-align: top;
			padding-right: 32px;
			width: 100%;
			${from.tablet} {
				width: auto;
			}
		`;
	};

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
					<span css={tableEntryCss}>Subscription ID</span>
					<span css={tableValueCss}>
						{props.productDetail.subscription.subscriptionId}
					</span>
					<span css={tableEntryCss}>Start Date</span>
					<span css={tableValueCss}>
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
