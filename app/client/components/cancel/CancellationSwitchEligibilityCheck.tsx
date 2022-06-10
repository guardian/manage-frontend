import CancellationReasonSelection from './CancellationReasonSelection';
import CancellationSwitchOffer from './CancellationSwitchOffer';
import { useLocation } from 'react-router-dom';
import { CancellationRouterState } from './CancellationContainer';

const CancellationSwitchEligibilityCheck = () => {
	const location = useLocation();
	const routerState = location.state as CancellationRouterState;

	if (routerState.dontShowOffer) {
		return <CancellationReasonSelection />;
	}

	const isEligibleToSwitch: boolean = false;
	const inABTest: boolean = false;
	return inABTest && isEligibleToSwitch ? (
		<CancellationSwitchOffer />
	) : (
		<CancellationReasonSelection />
	);
};

export default CancellationSwitchEligibilityCheck;
