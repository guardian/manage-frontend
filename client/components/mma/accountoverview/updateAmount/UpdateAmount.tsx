import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { capitalize } from 'lodash';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { parseDate } from '../../../../../shared/dates';
import type {
	PaidSubscriptionPlan,
	SubscriptionPlan,
} from '../../../../../shared/productResponse';
import { augmentBillingPeriod } from '../../../../../shared/productResponse';
import type { ProductType } from '../../../../../shared/productTypes';
import { SuccessMessage } from '../../delivery/address/DeliveryAddressConfirmation';
import { ProductDescriptionListTableV2 } from '../../shared/ProductDescriptionListTableV2';
import { ContributionUpdateAmountForm } from './ContributionUpdateAmountForm';
import { SupporterPlusUpdateAmountForm } from './SupporterPlusUpdateAmountForm';

interface UpdateAmountProps {
	subscriptionId: string;
	mainPlan: PaidSubscriptionPlan;
	productType: ProductType;
	nextPaymentDate: string | null;
	amountUpdateStateChange: Dispatch<SetStateAction<number | null>>;
	isTestUser: boolean;
	futurePlan?: SubscriptionPlan | PaidSubscriptionPlan;
}

export const UpdateAmount = (props: UpdateAmountProps) => {
	enum Status {
		OVERVIEW,
		EDITING,
		CONFIRMED,
	}

	const [status, setStatus] = useState<Status>(Status.OVERVIEW);
	const [confirmedAmount, setConfirmedAmount] = useState<number | null>(null);

	const mainPlan = props.mainPlan;
	const currentAmount = confirmedAmount || mainPlan.price / 100;

	if (status === Status.EDITING) {
		return props.productType.productType === 'supporterplus' ? (
			<SupporterPlusUpdateAmountForm
				{...props}
				currentAmount={currentAmount}
				onUpdateConfirmed={(updatedAmount) => {
					setConfirmedAmount(updatedAmount);
					props.amountUpdateStateChange(updatedAmount);
					setStatus(Status.CONFIRMED);
				}}
			/>
		) : (
			<ContributionUpdateAmountForm
				{...props}
				currentAmount={currentAmount}
				mode="MANAGE"
				onUpdateConfirmed={(updatedAmount) => {
					setConfirmedAmount(updatedAmount);
					props.amountUpdateStateChange(updatedAmount);
					setStatus(Status.CONFIRMED);
				}}
			/>
		);
	}

	const isBillingFrequencySwitch =
		props.futurePlan &&
		'billingPeriod' in props.futurePlan &&
		mainPlan.billingPeriod !== props.futurePlan.billingPeriod;

	return (
		<>
			{status === Status.CONFIRMED && (
				<SuccessMessage
					message={`We have successfully updated the amount of your support. ${
						props.nextPaymentDate &&
						`This amount will be taken on ${parseDate(
							props.nextPaymentDate,
						).dateStr()}. `
					}Thank you for supporting the Guardian.`}
					additionalCss={css`
						margin-bottom: ${space[5]}px;
					`}
				/>
			)}
			<ProductDescriptionListTableV2
				rows={[
					{
						tiles: [
							{
								title: 'Supporter ID',
								value: props.subscriptionId,
							},
							{
								title: `${capitalize(
									augmentBillingPeriod(
										props.mainPlan.billingPeriod,
									),
								)} amount`,
								value: `${
									props.mainPlan.currency
								}${currentAmount.toFixed(2)} ${
									props.mainPlan.currencyISO
								}`,
							},
						],
						actions: !isBillingFrequencySwitch
							? [
									{
										text: 'Change amount',
										onClick: () => {
											setStatus(Status.EDITING);
										},
									},
							  ]
							: [],
					},
				]}
				separateEachRow
			/>
		</>
	);
};
