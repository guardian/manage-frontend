import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { featureSwitches } from '@/shared/featureSwitches';
import {
	getSpecificProductTypeFromTier,
	isPaidSubscriptionPlan,
} from '@/shared/productResponse';
import type { ProductTypeKeys } from '@/shared/productTypes';
import { CancellationContext } from './CancellationContainer';
import type {
	CancellationContextInterface,
	CancellationRouterState,
} from './CancellationContainer';
import { CancellationReasonSelection } from './CancellationReasonSelection';

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

	const productType = getSpecificProductTypeFromTier(productDetail.tier);
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
		Object.hasOwn(productType, 'cancellation') &&
		!productType.cancellation?.reasons
	) {
		return <Navigate to="./confirm" state={{ ...routerState }} />;
	}

	return <CancellationReasonSelection />;
};
