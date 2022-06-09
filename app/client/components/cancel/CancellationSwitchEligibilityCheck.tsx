import CancellationReasonSelection from './CancellationReasonSelection';
import CancellationSwitchOffer from './CancellationSwitchOffer';

const CancellationSwitchEligibilityCheck = () => {
	const isEligibleToSwitch: boolean = true;
	const inABTest: boolean = true;
	return inABTest && isEligibleToSwitch ? (
		<CancellationSwitchOffer />
	) : (
		<CancellationReasonSelection />
	);
};

export default CancellationSwitchEligibilityCheck;
