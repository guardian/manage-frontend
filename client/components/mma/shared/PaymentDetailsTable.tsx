import { css } from '@emotion/react';
import type { ProductDetail } from '../../../../shared/productResponse';
import { PaypalLogo } from './assets/PaypalLogo';
import { CardDisplay } from './CardDisplay';
import { DirectDebitDisplay } from './DirectDebitDisplay';
import type { NextPaymentDetails } from './NextPaymentDetails';
import { NewPaymentPriceAlert } from './NextPaymentDetails';
import type { ProductDescriptionListKeyValue } from './ProductDescriptionListTable';
import { ProductDescriptionListTableV2 } from './ProductDescriptionListTableV2';
import { SepaDisplay } from './SepaDisplay';

interface PaymentDetailsTableProps {
	productDetail: ProductDetail;
	nextPaymentDetails: NextPaymentDetails | undefined;
	hasCancellationPending: boolean;
	tableHeading?: string;
}
export const PaymentDetailsTable = (props: PaymentDetailsTableProps) => {
	const content: ProductDescriptionListKeyValue[] = [
		...(props.nextPaymentDetails &&
		props.productDetail.subscription.autoRenew &&
		!props.hasCancellationPending
			? [
					{
						title: props.nextPaymentDetails.nextPaymentDateKey,
						...(props.productDetail.subscription
							.nextPaymentDate && {
							value: props.nextPaymentDetails
								.nextPaymentDateValue,
						}),
					},
					{
						title: props.nextPaymentDetails.paymentKey,
						value: (
							<span>
								{props.nextPaymentDetails.isNewPaymentValue && (
									<NewPaymentPriceAlert />
								)}
								{props.nextPaymentDetails.paymentValue}
							</span>
						),
					},
			  ]
			: []),
		{
			title: `Payment${props.productDetail.isPaidTier ? ' method' : ''}`,
			value: props.productDetail.isPaidTier ? (
				<>
					{props.productDetail.subscription.card && (
						<CardDisplay
							cssOverrides={css`
								margin: 0;
							`}
							inErrorState={!!props.productDetail.alertText}
							{...props.productDetail.subscription.card}
						/>
					)}
					{props.productDetail.subscription.payPalEmail && (
						<PaypalLogo />
					)}
					{props.productDetail.subscription.mandate && (
						<DirectDebitDisplay
							inErrorState={!!props.productDetail.alertText}
							{...props.productDetail.subscription.mandate}
						/>
					)}
					{props.productDetail.subscription.sepaMandate && (
						<SepaDisplay
							{...props.productDetail.subscription.sepaMandate}
						/>
					)}
					{props.productDetail.subscription
						.stripePublicKeyForCardAddition && (
						<span>No Payment Method</span>
					)}
				</>
			) : (
				<span>FREE</span>
			),
			spanTwoCols: props.productDetail.subscription.payPalEmail
				? true
				: undefined,
		},
		{
			title: 'Expiry date',
			...(props.productDetail.subscription.card?.expiry && {
				value: `${
					props.productDetail.subscription.card.expiry.month < 10
						? '0'
						: ''
				}${props.productDetail.subscription.card.expiry.month}
                    ${' / '}
                    ${props.productDetail.subscription.card.expiry.year}`,
			}),
		},
	];

	// Break content in groups of 2 entries
	const rows: ProductDescriptionListKeyValue[][] = [];
	for (let i = 0; i < content.length; i += 2) {
		rows.push(content.slice(i, i + 2));
	}

	return (
		<ProductDescriptionListTableV2
			rows={rows.map((row, _index) => ({
				tiles: row.map((item) => ({
					title: item.title,
					value: item.value,
				})),
				// actions:
				// 	index === 1
				// 		? [
				// 				{
				// 					text: 'Update method',
				// 				},
				// 		  ]
				// 		: undefined,
			}))}
			separateEachRow
		/>
	);
};
