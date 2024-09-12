import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { featureSwitches } from '@/shared/featureSwitches';
import {
	getSpecificProductTypeFromTier,
	type ProductDetail,
} from '@/shared/productResponse';
import { CancellationContext } from './CancellationContainer';
import type {
	CancellationContextInterface,
	CancellationRouterState,
} from './CancellationContainer';
import { CancellationReasonSelection } from './CancellationReasonSelection';

function productHasEarlySaveJourney(productToCancel: ProductDetail): boolean {
	const specificProductTypeKey = getSpecificProductTypeFromTier(
		productToCancel.tier,
	).productType;

	return (
		specificProductTypeKey === 'membership' ||
		(featureSwitches.digisubSave && specificProductTypeKey === 'digipack')
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

	if (
		!routerState?.dontShowOffer &&
		productHasEarlySaveJourney(productDetail)
	) {
		return <Navigate to="./landing" state={{ ...routerState }} />;
	}

	return <CancellationReasonSelection />;
};
