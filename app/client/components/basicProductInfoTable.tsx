import { parseDate } from '../../shared/dates';
import { ProductDetail } from '../../shared/productResponse';
import { GroupedProductType } from '../../shared/productTypes';
import { ProductDescriptionListTable } from './productDescriptionListTable';

interface BasicProductInfoTableProps {
	groupedProductType: GroupedProductType;
	productDetail: ProductDetail;
}

export const BasicProductInfoTable = (props: BasicProductInfoTableProps) => {
	return (
		<ProductDescriptionListTable
			content={[
				...(props.groupedProductType.shouldRevealSubscriptionId
					? [
							{
								title: 'Subscription ID',
								value: props.productDetail.subscription
									.subscriptionId,
							},
					  ]
					: []),
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
