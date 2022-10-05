import { capitalize } from 'lodash';
import { parseDate } from '../../shared/dates';
import { ProductDetail, Subscription } from '../../shared/productResponse';
import { GROUPED_PRODUCT_TYPES, ProductType } from '../../shared/productTypes';
import { SubscriptionEffectiveData } from '../components/delivery/address/deliveryAddressFormContext';
import { flattenEquivalent } from '../utils';

interface ProductDetailAndProductType {
	productDetail: ProductDetail;
	productType: ProductType;
}

export type ContactIdToArrayOfProductDetailAndProductType = Record<
	string,
	ProductDetailAndProductType[]
>;

interface ProductDetailWithContactId extends ProductDetail {
	subscription: Subscription & {
		contactId: string;
	};
}

const hasContactId = (
	productDetail: ProductDetail,
): productDetail is ProductDetailWithContactId => {
	return !!productDetail.subscription.contactId;
};

export const getValidDeliveryAddressChangeEffectiveDates = (
	allProductDetail: ProductDetail[],
) =>
	allProductDetail
		.filter(hasContactId)
		.map((productDetail) => ({
			productDetail,
			productType:
				GROUPED_PRODUCT_TYPES.subscriptions.mapGroupedToSpecific(
					productDetail,
				),
		}))
		.filter((_) => _.productType.delivery?.showAddress)
		.reduce(
			(accumulator, { productDetail, productType }) => ({
				...accumulator,
				[productDetail.subscription.contactId]: [
					...(accumulator[productDetail.subscription.contactId] ||
						[]),
					{ productDetail, productType },
				],
			}),
			{} as ContactIdToArrayOfProductDetailAndProductType,
		);

export const addressChangeAffectedInfo = (
	contactIdToArrayOfProductDetailAndProductType: ContactIdToArrayOfProductDetailAndProductType,
): SubscriptionEffectiveData[] =>
	Object.values(contactIdToArrayOfProductDetailAndProductType)
		.flatMap<ProductDetailAndProductType>(flattenEquivalent)
		.map(({ productDetail, productType }) => {
			const friendlyProductName = capitalize(
				productType.shortFriendlyName || productType.friendlyName,
			).trim();
			const effectiveDate = productDetail.subscription
				.deliveryAddressChangeEffectiveDate
				? parseDate(
						productDetail.subscription
							.deliveryAddressChangeEffectiveDate,
				  ).date
				: undefined;
			return {
				friendlyProductName,
				subscriptionId: productDetail.subscription.subscriptionId,
				effectiveDate,
			};
		});
