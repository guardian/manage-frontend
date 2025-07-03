import { css } from '@emotion/react';
import type { ProductDetail } from '../../../../shared/productResponse';
import { getSpecificProductTypeFromTier } from '../../../../shared/productResponse';
import type { IsFromAppProps } from './IsFromAppProps';
import { ProblemAlert } from './ProblemAlert';

interface PaymentFailureAlertIfApplicableProps extends IsFromAppProps {
	productDetails: ProductDetail[];
}

function findPaymentFailureProduct(allProductDetails: ProductDetail[]) {
	const hasPaymentFailure = (product: ProductDetail) => !!product.alertText;
	return allProductDetails.find(hasPaymentFailure);
}

export const PaymentFailureAlertIfApplicable = ({
	isFromApp,
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
					getSpecificProductTypeFromTier(productDetail.tier).urlPart
				}`,
				state: { productDetail, isFromApp },
			}}
			additionalcss={css`
				margin-top: 30px;
			`}
		/>
	);
};

export const augmentPaymentFailureAlertText = (alertText: string) =>
	`${alertText} Please check that the payment details shown are up to date.`;
