import CancellationReasonSelection from './CancellationReasonSelection';
import CancellationSwitchOffer from './CancellationSwitchOffer';
import { useLocation } from 'react-router-dom';
import {
	CancellationPageTitleContext,
	CancellationPageTitleInterface,
	CancellationRouterState,
	CancellationContext,
	CancellationContextInterface,
} from './CancellationContainer';
import { useContext } from 'react';

const CancellationSwitchEligibilityCheck = () => {
	const location = useLocation();
	const routerState = location.state as CancellationRouterState;
	const cancellationContext = useContext(
		CancellationContext,
	) as CancellationContextInterface;
	const pageTitleContext = useContext(
		CancellationPageTitleContext,
	) as CancellationPageTitleInterface;

	if (routerState?.dontShowOffer) {
		pageTitleContext.setPageTitle(
			`Cancel ${
				cancellationContext.productType.shortFriendlyName ||
				cancellationContext.productType.friendlyName
			}`,
		);
		return <CancellationReasonSelection />;
	}

	const isEligibleToSwitch: boolean = false;
	const inABTest: boolean = false;

	/*
	const tmp = async () => {
		await fetchWithDefaultParameters('/api/move-product', {
			method: 'POST',
			body: JSON.stringify({}),
			headers: { 'Content-Type': 'application/json' },
		});
	};
	tmp();
	 */

	return inABTest && isEligibleToSwitch ? (
		<CancellationSwitchOffer />
	) : (
		<CancellationReasonSelection />
	);
};

export default CancellationSwitchEligibilityCheck;
