import { css } from '@emotion/core';
import React from 'react';
import { ProductDetail } from '../../../shared/productResponse';
import { GROUPED_PRODUCT_TYPES } from '../../../shared/productTypes';
import { ProblemAlert } from '../ProblemAlert';

interface PaymentFailureAlertIfApplicableProps {
	productDetail: ProductDetail | undefined;
}

export const PaymentFailureAlertIfApplicable = ({
	productDetail,
}: PaymentFailureAlertIfApplicableProps) =>
	productDetail?.alertText ? (
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
	) : null;

export const augmentPaymentFailureAlertText = (alertText: string) =>
	`${alertText} Please check that the payment details shown are up to date.`;
