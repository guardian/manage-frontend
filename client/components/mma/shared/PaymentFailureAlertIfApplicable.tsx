import { css } from '@emotion/react';
import type { ProductDetail } from '../../../../shared/productResponse';
import { GROUPED_PRODUCT_TYPES } from '../../../../shared/productTypes';
import { ProblemAlert } from './ProblemAlert';

interface PaymentFailureAlertIfApplicableProps {
	productDetails: ProductDetail[];
}

function findPaymentFailureProduct(allProductDetails: ProductDetail[]) {
	const hasPaymentFailure = (product: ProductDetail) => !!product.alertText;
	return allProductDetails.find(hasPaymentFailure);
}

export const PaymentFailureAlertIfApplicable = ({
	productDetails,
}: PaymentFailureAlertIfApplicableProps) => {
	const productDetail = findPaymentFailureProduct(productDetails);

	if (!productDetail || !productDetail.alertText) {
		return null;
	}

	return (
		<ProblemAlert
			title="A payment needs your attention"
			message={augmentPaymentFailureAlertText(productDetail.alertText)}
			button={{
				title: 'Update payment method',
				link: `/payment/${
					GROUPED_PRODUCT_TYPES[
						productDetail.mmaCategory
					].mapGroupedToSpecific(productDetail).urlPart
				}`,
				state: productDetail,
			}}
			additionalcss={css`
				margin-top: 30px;
			`}
		/>
	);
};

export const augmentPaymentFailureAlertText = (alertText: string) =>
	`${alertText} Please check that the payment details shown are up to date.`;
