import { css } from '@emotion/react';
import { palette, space } from '@guardian/source-foundations';
import { capitalize } from 'lodash';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { parseDate } from '../../../../../shared/dates';
import type { PaidSubscriptionPlan } from '../../../../../shared/productResponse';
import { augmentBillingPeriod } from '../../../../../shared/productResponse';
import type { ProductType } from '../../../../../shared/productTypes';
import { SuccessMessage } from '../../delivery/address/DeliveryAddressConfirmation';
import { Button } from '../../shared/Buttons';
import { ProductDescriptionListTable } from '../../shared/ProductDescriptionListTable';
import { ContributionUpdateAmountForm } from './ContributionUpdateAmountForm';

interface ContributionUpdateAmountProps {
	subscriptionId: string;
	mainPlan: PaidSubscriptionPlan;
	productType: ProductType;
	nextPaymentDate: string | null;
	amountUpdateStateChange: Dispatch<SetStateAction<number | null>>;
}

export const ContributionUpdateAmount = (
	props: ContributionUpdateAmountProps,
) => {
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
		return (
			<ContributionUpdateAmountForm
				{...props}
				currentAmount={currentAmount}
				mode="MANAGE"
				onUpdateConfirmed={(updatedAmount) => {
					setConfirmedAmount(updatedAmount);
					setStatus(Status.CONFIRMED);
				}}
			/>
		);
	}

	return (
		<>
			{status === Status.CONFIRMED && (
				<SuccessMessage
					message={`We have successfully updated the amount of your contribution. ${
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
			<ProductDescriptionListTable
				borderColour={palette.neutral[86]}
				content={[
					{
						title: 'Supporter ID',
						value: props.subscriptionId,
					},
					{
						title: `${capitalize(
							augmentBillingPeriod(props.mainPlan.billingPeriod),
						)} amount`,
						value: `${
							props.mainPlan.currency
						}${currentAmount.toFixed(2)} ${
							props.mainPlan.currencyISO
						}`,
					},
				]}
			/>
			<Button
				colour={palette.brand[800]}
				textColour={palette.brand[400]}
				fontWeight="bold"
				text="Change amount"
				onClick={() => {
					setStatus(Status.EDITING);
				}}
			/>
		</>
	);
};
