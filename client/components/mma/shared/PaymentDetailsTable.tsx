import { css } from '@emotion/react';
import { neutral } from '@guardian/source/foundations';
import type { ProductDetail } from '../../../../shared/productResponse';
import { PaypalLogo } from './assets/PaypalLogo';
import { CardDisplay } from './CardDisplay';
import { DirectDebitDisplay } from './DirectDebitDisplay';
import type { NextPaymentDetails } from './NextPaymentDetails';
import { NewPaymentPriceAlert } from './NextPaymentDetails';
import { ProductDescriptionListTable } from './ProductDescriptionListTable';
import { SepaDisplay } from './SepaDisplay';

interface PaymentDetailsTableProps {
	productDetail: ProductDetail;
	nextPaymentDetails: NextPaymentDetails | undefined;
	hasCancellationPending: boolean;
	tableHeading?: string;
}
export const PaymentDetailsTable = (props: PaymentDetailsTableProps) => (
	<ProductDescriptionListTable
		borderColour={neutral[86]}
		alternateRowBgColors
		tableHeading={props.tableHeading}
		content={[
			...(props.nextPaymentDetails &&
			props.productDetail.subscription.autoRenew &&
			!props.hasCancellationPending
				? [
						{
							title: props.nextPaymentDetails.paymentKey,
							value: (
								<span>
									{props.nextPaymentDetails
										.isNewPaymentValue && (
										<NewPaymentPriceAlert />
									)}
									{props.nextPaymentDetails.paymentValue}
								</span>
							),
						},
						{
							title: props.nextPaymentDetails.nextPaymentDateKey,
							...(props.productDetail.subscription
								.nextPaymentDate && {
								value: props.nextPaymentDetails
									.nextPaymentDateValue,
							}),
						},
				  ]
				: []),
			{
				title: `Payment${
					props.productDetail.isPaidTier ? ' method' : ''
				}`,
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
								{...props.productDetail.subscription
									.sepaMandate}
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
		]}
	/>
);
