import { css } from '@emotion/react'; // external lib (style) first
import { useEffect, useState } from 'react'; // external lib (react) second
import { convertCurrencyToSymbol } from '@/client/utilities/currencyIso';
import { changeSubscriptionBillingFrequencyFetch } from '@/client/utilities/productUtils'; // internal absolute value imports
import type { ProductType } from '@/shared/productTypes'; // internal absolute type imports
import type { ProductDetail } from '../../../../shared/productResponse'; // relative type imports (shared)
import { PaypalLogo } from './assets/PaypalLogo'; // relative value imports
import { CardDisplay } from './CardDisplay';
import { DirectDebitDisplay } from './DirectDebitDisplay';
import type { NextPaymentDetails } from './NextPaymentDetails'; // relative type imports (local)
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

	// Savings state (from changeSubscriptionBillingFrequencyFetch preview)
	const [annualSwitchSavings, setAnnualSwitchSavings] = useState<{
		amount: number;
		currency: string;
		period: 'year' | 'month';
	} | null>(null);
	// Store the FULL preview response so it can be passed via router state
	// to the switch-frequency page for richer UX (dynamic savings messaging, etc.)
	const [annualSwitchPreview, setAnnualSwitchPreview] =
		useState<unknown>(null);

	useEffect(() => {
		// Only fetch savings if it's a monthly subscription and we haven't fetched yet
		if (isMonthlySubscription() && annualSwitchSavings === null) {
			changeSubscriptionBillingFrequencyFetch(
				props.productDetail.isTestUser,
				props.productDetail.subscription.subscriptionId,
				true,
				'Annual',
			)
				.then((res) => res.json())
				.then((data) => {
					if (data?.savings?.amount && data?.savings?.currency) {
						setAnnualSwitchSavings(data.savings);
					}
					setAnnualSwitchPreview(data);
				})
				.catch(() => {
					/* swallow errors: non-critical UI enhancement */
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps -- we intentionally only depend on testUser + subscriptionId to avoid refetch loops; monthly status won't change during session
	}, [
		props.productDetail.isTestUser,
		props.productDetail.subscription.subscriptionId,
	]);

	const formatSavingsDisplay = (amount: number, currency: string) => {
		const symbol = convertCurrencyToSymbol(currency);
		// Amount from savings expected already in major units, display without trailing ISO for consistency with existing promo patterns
		return symbol ? `${symbol}${amount}` : `${amount} ${currency}`;
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
										state: {
											productDetail: props.productDetail,
											annualSwitchPreview:
												annualSwitchPreview ||
												undefined,
										},
										promo:
											annualSwitchSavings &&
											annualSwitchSavings.amount > 0
												? `Switch and save ${formatSavingsDisplay(
														annualSwitchSavings.amount,
														annualSwitchSavings.currency,
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
