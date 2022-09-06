import * as Sentry from '@sentry/browser';
import { trackEvent } from '../services/analytics';
import { CallCentreNumbers } from './callCentreNumbers';
import { WithStandardTopMargin } from './WithStandardTopMargin';

interface GenericErrorScreenProps {
	loggingMessage: string | false;
}

export const GenericErrorScreen = ({
	loggingMessage,
}: GenericErrorScreenProps) => {
	if (loggingMessage) {
		Sentry.captureException(loggingMessage);
		trackEvent({
			eventCategory: 'genericErrorScreen',
			eventAction: 'error',
			eventLabel: loggingMessage,
		});
	}

	return (
		<WithStandardTopMargin>
			<h2>Oops!</h2>
			<p>
				Sorry, it seems as if our system has encountered an error.
				<br />
				Please try again in a few minutes.
			</p>
			<CallCentreNumbers prefixText="Alternatively, to contact us" />
		</WithStandardTopMargin>
	);
};
