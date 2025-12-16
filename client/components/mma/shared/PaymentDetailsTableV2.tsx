import { css } from '@emotion/react'; // external lib (style) first
import { convertCurrencyToSymbol } from '@/client/utilities/currencyIso';
import { hasSupporterPlusMonthlyRatePlan } from '@/client/utilities/productUtils'; // internal absolute value imports
import type { BillingFrequencySwitchPreview } from '@/shared/billingFrequencySwitchTypes';
import type { ProductType } from '@/shared/productTypes'; // internal absolute type imports
import type { ProductDetail } from '../../../../shared/productResponse'; // relative type imports (shared)
import { PaypalLogo } from './assets/PaypalLogo'; // relative value imports
import { CardDisplay } from './CardDisplay';
import { DirectDebitDisplay } from './DirectDebitDisplay';
import type { NextPaymentDetails } from './NextPaymentDetails'; // relative type imports (local)
import { NewPaymentPriceAlert } from './NextPaymentDetails';
import type { ProductDescriptionListRow } from './ProductDescriptionListTableV2';
import { ProductDescriptionListTableV2 } from './ProductDescriptionListTableV2';
import { SepaDisplay } from './SepaDisplay';

interface PaymentDetailsTableProps {
	productDetail: ProductDetail;
	nextPaymentDetails: NextPaymentDetails | undefined;
	hasCancellationPending: boolean;
	tableHeading?: string;
	specificProductType: ProductType;
	billingFrequencySwitchPreview?: BillingFrequencySwitchPreview;
}
export const PaymentDetailsTableV2 = (props: PaymentDetailsTableProps) => {
	const billingSwitchPreview = props.billingFrequencySwitchPreview ?? null;

	let savingsAmount = 0;
	if (billingSwitchPreview) {
		savingsAmount =
			billingSwitchPreview.savings.amount -
			billingSwitchPreview.currentDiscount.amount;
	}

	/**
	 * Validates whether to show the switch to annual plan button.
	 * Returns true only if:
	 * 1. The subscription is monthly
	 * 2. It has a valid SupporterPlus Monthly rate plan
	 * 3. The current contribution amount is 0
	 */
	const shouldShowSwitchToAnnualButton = (): boolean => {
		try {
			return (
				hasSupporterPlusMonthlyRatePlan(props.productDetail) &&
				(billingSwitchPreview?.currentContribution.amount ?? null) === 0
			);
		} catch (error) {
			// If validation fails, don't show the button
			if (
				error instanceof Error &&
				error.message === 'SupporterPlus Monthly rate plan not found'
			) {
				return false;
			}
			throw error;
		}
	};
	const formatSavingsDisplay = (amount: number, currency: string) => {
		const symbol = convertCurrencyToSymbol(currency);
		const formattedAmount = Number.isInteger(amount)
			? amount.toString()
			: amount.toFixed(2);
		return symbol
			? `${symbol}${formattedAmount}`
			: `${formattedAmount} ${currency}`;
	};

	const paymentDetailRows: ProductDescriptionListRow[] =
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
						actions: shouldShowSwitchToAnnualButton()
							? [
									{
										text: 'Switch to annual plan',
										linkTo: `/billing/${props.specificProductType.urlPart}/switch-frequency?subscriptionId=${props.productDetail.subscription.subscriptionId}`,
										state: {
											productDetail: props.productDetail,
											preview:
												billingSwitchPreview ??
												undefined,
										},
										promo:
											savingsAmount > 0 &&
											billingSwitchPreview
												? `Switch and save ${formatSavingsDisplay(
														savingsAmount,
														billingSwitchPreview.currency,
												  )}`
												: undefined,
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
										.payPalEmail && (
										<span
											aria-label={`Payment method: PayPal ${props.productDetail.subscription.payPalEmail}`}
										>
											<PaypalLogo />
										</span>
									)}
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
						...(props.productDetail.subscription.card?.expiry
							? [
									{
										title: 'Expiry date',
										value: `${
											props.productDetail.subscription
												.card.expiry.month < 10
												? '0'
												: ''
										}${
											props.productDetail.subscription
												.card.expiry.month
										}
										${' / '}
										${props.productDetail.subscription.card.expiry.year}`,
									},
							  ]
							: []),
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
