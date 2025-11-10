import { css } from '@emotion/react';
import type { ProductType } from '@/shared/productTypes';
import type { ProductDetail } from '../../../../shared/productResponse';
import { PaypalLogo } from './assets/PaypalLogo';
import { CardDisplay } from './CardDisplay';
import { DirectDebitDisplay } from './DirectDebitDisplay';
import type { NextPaymentDetails } from './NextPaymentDetails';
import { NewPaymentPriceAlert } from './NextPaymentDetails';
import { ProductDescriptionListTableV2 } from './ProductDescriptionListTableV2';
import { SepaDisplay } from './SepaDisplay';

interface PaymentDetailsTableProps {
	productDetail: ProductDetail;
	nextPaymentDetails: NextPaymentDetails | undefined;
	hasCancellationPending: boolean;
	tableHeading?: string;
	specificProductType: ProductType;
}
export const PaymentDetailsTableV2 = (props: PaymentDetailsTableProps) => {
	// Evaluate if the current product/subscription is a monthly subscription
	const isMonthlySubscription = () => {
		const mainPlan = props.productDetail.subscription.currentPlans?.[0];
		if (mainPlan && 'billingPeriod' in mainPlan) {
			return mainPlan.billingPeriod === 'month';
		}
		return false;
	};

	const paymentDetailRows =
		props.nextPaymentDetails &&
		props.productDetail.subscription.autoRenew &&
		!props.hasCancellationPending
			? [
					{
						tiles: [
							{
								title: props.nextPaymentDetails
									.nextPaymentDateKey,
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
										{props.nextPaymentDetails
											.isNewPaymentValue && (
											<NewPaymentPriceAlert />
										)}
										{props.nextPaymentDetails.paymentValue}
									</span>
								),
							},
						],
						actions: isMonthlySubscription()
							? [
									{
										text: 'Switch to annual plan',
										linkTo: `/billing/${props.specificProductType.urlPart}/switch-frequency?subscriptionId=${props.productDetail.subscription.subscriptionId}`,
									},
							  ]
							: [],
					},
			  ]
			: [];

	return (
		<ProductDescriptionListTableV2
			rows={[
				...paymentDetailRows,
				{
					tiles: [
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
											inErrorState={
												!!props.productDetail.alertText
											}
											{...props.productDetail.subscription
												.card}
										/>
									)}
									{props.productDetail.subscription
										.payPalEmail && <PaypalLogo />}
									{props.productDetail.subscription
										.mandate && (
										<DirectDebitDisplay
											inErrorState={
												!!props.productDetail.alertText
											}
											{...props.productDetail.subscription
												.mandate}
										/>
									)}
									{props.productDetail.subscription
										.sepaMandate && (
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
							spanTwoCols: props.productDetail.subscription
								.payPalEmail
								? true
								: undefined,
						},
						{
							title: 'Expiry date',
							...(props.productDetail.subscription.card
								?.expiry && {
								value: `${
									props.productDetail.subscription.card.expiry
										.month < 10
										? '0'
										: ''
								}${
									props.productDetail.subscription.card.expiry
										.month
								}
								${' / '}
								${props.productDetail.subscription.card.expiry.year}`,
							}),
						},
					],
					actions:
						props.productDetail.isPaidTier &&
						props.productDetail.subscription
							.safeToUpdatePaymentMethod &&
						!props.productDetail.subscription.payPalEmail
							? [
									{
										text: 'Update method',
										linkTo: `/payment/${props.specificProductType.urlPart}`,
										alert: !!props.productDetail.alertText,
										state: {
											productDetail: props.productDetail,
										},
									},
							  ]
							: [],
				},
			]}
			separateEachRow
		/>
	);
};
