import * as Sentry from '@sentry/browser';
import * as React from 'react';
import { useContext } from 'react';
import { parseDate } from '../../../../shared/dates';
import { isPaidSubscriptionPlan } from '../../../../shared/productResponse';
import { getMainPlan, isProduct } from '../../../../shared/productResponse';
import { GenericErrorMessage } from '../../identity/GenericErrorMessage';
import {
	CancellationContext,
	CancellationContextInterface,
} from '../CancellationContainer';
import { SavedBodyProps } from '../stages/savedCancellation';

const ContributionsCancellationAmountUpdatedSaved: React.FC<SavedBodyProps> = ({
	amount,
}: SavedBodyProps) => {
	const { productDetail } = useContext(
		CancellationContext,
	) as CancellationContextInterface;
	if (!isProduct(productDetail)) {
		Sentry.captureMessage(
			'MembersDataApiItem is not a productDetail in ContributionsCancellationAmountUpdateSaved',
		);
		return <GenericErrorMessage />;
	}

	if (!productDetail.subscription.nextPaymentDate) {
		Sentry.captureMessage(
			'Subscription does not have a nextPaymentDate in ContributionsCancellationAmountUpdateSaved',
		);
		return <GenericErrorMessage />;
	}

	const mainPlan = getMainPlan(productDetail.subscription);

	if (!isPaidSubscriptionPlan(mainPlan)) {
		Sentry.captureMessage(
			'mainPlan is not a PaidSubscriptionPlan in ContributionsCancellationAmountUpdateSaved',
		);
		return <GenericErrorMessage />;
	}

	return (
		<>
			<h3>Thank you for updating your contribution</h3>
			<p>
				We have successfully updated the amount of your contribution.
				New amount, {mainPlan.currency}
				{amount.toFixed(2)}, will be taken on{' '}
				{parseDate(
					productDetail.subscription.nextPaymentDate,
				).dateStr()}
				. Thank you for supporting the Guardian.
			</p>
		</>
	);
};

export default ContributionsCancellationAmountUpdatedSaved;
