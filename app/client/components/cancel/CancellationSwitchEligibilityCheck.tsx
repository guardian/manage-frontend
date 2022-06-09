import CancellationReasonSelection from './CancellationReasonSelection';
import CancellationSwitchOffer from './CancellationSwitchOffer';

const CancellationSwitchEligibilityCheck = () => {
	const isEligibleToSwitch: boolean = false;
	const inABTest: boolean = false;
	return inABTest && isEligibleToSwitch ? (
		<CancellationSwitchOffer />
	) : (
		<CancellationReasonSelection />
	);
};

export default CancellationSwitchEligibilityCheck;
