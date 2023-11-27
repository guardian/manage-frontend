import { ProductDescriptionListTableV2 } from '@/client/components/mma/shared/ProductDescriptionListTableV2';
import { parseDate } from '@/shared/dates';
import type { ProductDetail } from '../../../../shared/productResponse';
import type { GroupedProductType } from '../../../../shared/productTypes';

export interface BasicProductInfoTableProps {
	groupedProductType: GroupedProductType;
	productDetail: ProductDetail;
}

export const ProductInfoTable = (props: BasicProductInfoTableProps) => {
	return (
		<ProductDescriptionListTableV2
			content={[
				{
					title: 'Subscription ID',
					value: props.productDetail.subscription.subscriptionId,
				},

				{
					title: 'Start date',
					value: props.productDetail.subscription.start
						? parseDate(
								props.productDetail.subscription.start,
						  ).dateStr()
						: '-',
				},
			]}
		/>
	);
};
