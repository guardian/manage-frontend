import { parseDate } from '../../../../shared/dates';
import type { ProductDetail } from '../../../../shared/productResponse';
import type { GroupedProductType } from '../../../../shared/productTypes';
import { ProductDescriptionListTable } from './ProductDescriptionListTable';

export interface BasicProductInfoTableProps {
	groupedProductType: GroupedProductType;
	productDetail: ProductDetail;
}

export const BasicProductInfoTable = (props: BasicProductInfoTableProps) => {
	return (
		<ProductDescriptionListTable
			content={[
				{
					title: props.groupedProductType.showSupporterId
						? 'Supporter ID'
						: 'Subscription ID',
					value: props.productDetail.subscription.subscriptionId,
				},
				...(props.groupedProductType.tierLabel
					? [
							{
								title: props.groupedProductType.tierLabel,
								value: props.productDetail.tier,
							},
					  ]
					: []),
				...(props.groupedProductType.shouldShowJoinDateNotStartDate
					? [
							{
								title: 'Join date',
								value: parseDate(
									props.productDetail.joinDate,
								).dateStr(),
							},
					  ]
					: [
							{
								title: 'Start date',
								value: props.productDetail.subscription.start
									? parseDate(
											props.productDetail.subscription
												.start,
									  ).dateStr()
									: '-',
							},
					  ]),
			]}
		/>
	);
};
