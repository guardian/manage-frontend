import type { ProductDetail } from '@/shared/productResponse';

export const isSundayTheObserverSubscription = (
	productDetail: ProductDetail,
): boolean => {
	return (
		productDetail.tier === 'Newspaper Delivery - Observer' ||
		productDetail.tier === 'Newspaper Digital Voucher - Observer'
	);
};

export const isNotSundayTheObserverSubscription = (
	productDetail: ProductDetail,
): boolean => {
	return (
		productDetail.tier !== 'Newspaper Delivery - Observer' &&
		productDetail.tier !== 'Newspaper Digital Voucher - Observer'
	);
};
