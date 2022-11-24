import type { ProductDetail } from '../../../shared/productResponse';
import { getMainPlan } from '../../../shared/productResponse';
import { GROUPED_PRODUCT_TYPES } from '../../../shared/productTypes';

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
		<div>
			<h3>{specificProductType.productTitle(mainPlan)}</h3>
		</div>
	);
};
