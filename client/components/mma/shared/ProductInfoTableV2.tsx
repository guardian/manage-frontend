import { css } from '@emotion/react';
import { palette, space, textSans, until } from '@guardian/source-foundations';
import { parseDate } from '@/shared/dates';
import type { ProductDetail } from '@/shared/productResponse';

export interface ProductInfoTableProps {
	productDetail: ProductDetail;
}

export const ProductInfoTableV2 = (props: ProductInfoTableProps) => {
	const valueBoxCss = () => {
		return css`
			background-color: ${palette.neutral[97]};
			display: flex;
			width: 803px;
			${until.tablet} {
				width: auto;
			}
			flex-wrap: wrap;
			padding: ${space[4]}px ${space[6]}px;
		`;
	};

	const tableEntryCss = () => {
		return css`
			${textSans.medium()};
			margin-right: ${space[2]}px;
		`;
	};

	const tableValueCss = () => {
		return css`
			color: #606060;
			padding-right: 32px;
			width: 100%;
		`;
	};

	return (
		<>
			<div css={valueBoxCss}>
				<div className="subscription-id">
					<span css={tableEntryCss}>Subscription ID</span>
					<span css={tableValueCss}>
						{props.productDetail.subscription.subscriptionId}
					</span>
				</div>
				<section
					css={css`
						${until.tablet} {
							width: 319px;
							border-top: 1px solid ${palette.neutral[86]};
							padding-top: ${space[3]}px;
							margin-top: ${space[3]}px;
						}
					`}
				>
					<div>
						<span css={tableEntryCss}>Start Date</span>
						<span css={tableValueCss}>
							{props.productDetail.subscription.start
								? parseDate(
										props.productDetail.subscription.start,
								  ).dateStr()
								: '-'}
						</span>
					</div>
				</section>
			</div>
		</>
	);
};
