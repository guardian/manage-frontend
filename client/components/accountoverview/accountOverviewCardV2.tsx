import { css } from '@emotion/react';
import { headline, palette, space } from '@guardian/source-foundations';
import type { ReactNode } from 'react';
import type { ProductDetail } from '../../../shared/productResponse';
import { getMainPlan } from '../../../shared/productResponse';
import { GROUPED_PRODUCT_TYPES } from '../../../shared/productTypes';

interface CardProps {
	heading: string;
	children: ReactNode;
}

const Card = (props: CardProps) => {
	const containerCss = css`
		width: 100%;
		border: 1px solid ${palette.neutral[86]};
	`;

	const headingContainerCss = css`
		padding: ${space[3]}px ${space[4]}px;
		min-height: 128px;
		color: ${palette.neutral[100]};
		background-color: ${palette.brand[500]};
	`;

	const headingCss = css`
		${headline.small({ fontWeight: 'bold' })};
		margin: 0;
	`;

	return (
		<div css={containerCss}>
			<div css={headingContainerCss}>
				<h3 css={headingCss}>{props.heading}</h3>
			</div>
			{props.children}
		</div>
	);
};

export const AccountOverviewCardV2 = ({
	productDetail,
}: {
	productDetail: ProductDetail;
}) => {
	const mainPlan = getMainPlan(productDetail.subscription);

	if (!mainPlan) {
		throw new Error('mainPlan does not exist in accountOverviewCard');
	}

	const groupedProductType = GROUPED_PRODUCT_TYPES[productDetail.mmaCategory];
	const specificProductType =
		groupedProductType.mapGroupedToSpecific(productDetail);

	return (
		<Card heading={specificProductType.productTitle(mainPlan)}>
			<p>Product details go here…</p>
		</Card>
	);
};
