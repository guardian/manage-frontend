import { Button } from '@guardian/source-react-components';
import { useNavigate } from 'react-router';

export const ValueOfSupport = () => {
	const navigate = useNavigate();

	return (
		<>
			<div></div>
			<h2>
				Thank you for supporting the Guardian since xxx. Your support
				has made such a difference.
			</h2>
			<p>
				Here comes ... Before you go, please consider adapting your
				membership to a monthly support or a Monthly + Extra support.
			</p>
			<div>Image placeholder</div>
			<div>
				<Button priority="tertiary" onClick={() => navigate('/')}>
					Back
				</Button>
				<Button>Continue to cancellation</Button>
			</div>
		</>
	);
};
