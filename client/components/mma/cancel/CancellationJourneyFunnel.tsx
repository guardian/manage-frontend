import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { hasCancellationFlow } from '@/client/utilities/productUtils';
import { featureSwitches } from '@/shared/featureSwitches';
import {
	getSpecificProductTypeFromProductKey,
	isPaidSubscriptionPlan,
} from '@/shared/productResponse';
import type { ProductTypeKeys } from '@/shared/productTypes';
import { GROUPED_PRODUCT_TYPES } from '@/shared/productTypes';
import { CancellationContext } from './CancellationContainer';
import type {
	CancellationContextInterface,
	CancellationRouterState,
} from './CancellationContainer';
import { CancellationReasonSelection } from './CancellationReasonSelection';
import { ContactUsToCancel } from './ContactUsToCancel';

function productHasEarlySaveJourney(productTypeKey: ProductTypeKeys): boolean {
	return (
		productTypeKey === 'membership' ||
		(featureSwitches.digisubSave && productTypeKey === 'digipack')
	);
}

export const CancellationJourneyFunnel = () => {
	const location = useLocation();
	const routerState = location.state as CancellationRouterState;

	const cancellationContext = useContext(
		CancellationContext,
	) as CancellationContextInterface;

	const productDetail = cancellationContext.productDetail;
	if (!productDetail) {
		return <Navigate to="/" />;
	}

	const productType = getSpecificProductTypeFromProductKey(
		productDetail.mmaProductKey,
	);
	const productTypeKey = productType.productType;

	const possiblePaidPlan = productDetail.subscription.currentPlans[0];
	const qmEventId = 184;
	const qmIsConversionEvent = 0;
	const qmEvent = [
		'cancellation start',
		productType.friendlyName,
		isPaidSubscriptionPlan(possiblePaidPlan) &&
			`billing period: ${possiblePaidPlan.billingPeriod}`,
	].filter(Boolean);
	window.QuantumMetricAPI?.sendEvent(
		qmEventId,
		qmIsConversionEvent,
		qmEvent.join(' | '),
	);

	if (
		!routerState?.dontShowOffer &&
		productHasEarlySaveJourney(productTypeKey)
	) {
		return <Navigate to="./landing" state={{ ...routerState }} />;
	}

	if (
		!productDetail.selfServiceCancellation.isAllowed ||
		!hasCancellationFlow(productType)
	) {
		return (
			<ContactUsToCancel
				selfServiceCancellation={productDetail.selfServiceCancellation}
				subscriptionId={productDetail.subscription.subscriptionId}
				groupedProductType={
					GROUPED_PRODUCT_TYPES[productType.groupedProductType]
				}
			/>
		);
	}

	if (
		hasCancellationFlow(productType) &&
		!productType.cancellation?.reasons
	) {
		return <Navigate to="./confirm" state={{ ...routerState }} />;
	}

	return <CancellationReasonSelection />;
};
