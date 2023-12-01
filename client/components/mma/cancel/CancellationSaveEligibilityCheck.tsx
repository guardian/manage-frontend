import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { CancellationContext } from './CancellationContainer';
import type {
	CancellationContextInterface,
	CancellationRouterState,
} from './CancellationContainer';
import { CancellationReasonSelection } from './CancellationReasonSelection';

export const CancellationSaveEligibilityCheck = () => {
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
		productDetail.mmaCategory === 'membership'
	) {
		return <Navigate to="./landing" />;
	}

	return <CancellationReasonSelection />;
};
