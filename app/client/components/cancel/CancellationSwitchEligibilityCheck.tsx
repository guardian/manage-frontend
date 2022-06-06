import CancellationReasonSelection from './CancellationReasonSelection';
import CancellationSwitchOffer from './CancellationSwitchOffer';

const CancellationSwitchEligibilityCheck = () => {
	const inABTest: boolean = false;
	const isEligibleToSwitch: boolean = false;
	return inABTest && isEligibleToSwitch ? (
		<CancellationSwitchOffer />
	) : (
		<CancellationReasonSelection />
	);
};

export default CancellationSwitchEligibilityCheck;
