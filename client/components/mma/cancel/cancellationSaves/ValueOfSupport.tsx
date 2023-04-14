import { Button } from '@guardian/source-react-components';

export const ValueOfSupport = () => {
	return (
		<>
			<div data-testid="progress-bar"></div>
			<h2 data-testid="thanks-heading">
				Thank you for supporting the Guardian since xxx. Your support
				has made such a difference.
			</h2>
			<p data-testid="thanks-copy">
				Here comes ... Before you go, please consider adapting your
				membership to a monthly support or a Monthly + Extra support.
			</p>
			<div data-testid="thanks-banner">Image placeholder</div>
			<div>
				<Button data-testid="back-button">Back</Button>
				<Button data-testid="continue-cancellation-button">
					Continue to cancellation
				</Button>
			</div>
		</>
	);
};
