import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import { parseDate } from '@/shared/dates';
import type { ProductDetail } from '@/shared/productResponse';

export interface ProductInfoTableProps {
	productDetail: ProductDetail;
}

const valueBoxCss = css`
	background-color: ${palette.neutral[97]};
	padding: ${space[4]}px ${space[6]}px;
	${until.tablet} {
		padding: ${space[4]}px ${space[4]}px;
	}
	${from.tablet} {
		display: flex;
	}
	border-radius: 4px;
`;

const tableEntryCss = css`
	${textSans.medium()};
	margin-right: ${space[2]}px;
`;

const tableValueCss = css`
	color: #606060;
	${from.tablet} {
		padding-right: 32px;
	}
`;

const boxSpacingCss = css`
	display: flex;
	${until.tablet} {
		justify-content: space-between;
	}
`;

export const ProductInfoTableV2 = (props: ProductInfoTableProps) => {
	return (
		<>
			<div css={valueBoxCss}>
				<div css={boxSpacingCss}>
					<span css={tableEntryCss}>Subscription ID</span>
					<span css={tableValueCss}>
						{props.productDetail.subscription.subscriptionId}
					</span>
				</div>
				<section
					css={css`
						${until.tablet} {
							border-top: 1px solid ${palette.neutral[86]};
							padding-top: ${space[3]}px;
							margin-top: ${space[3]}px;
						}
					`}
				>
					<div css={boxSpacingCss}>
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
