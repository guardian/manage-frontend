import { ErrorSummary } from '@guardian/source-react-components-development-kitchen';
import { Link } from 'react-router-dom';
import {
	errorSummaryBlockLinkCss,
	errorSummaryLinkCss,
	errorSummaryOverrideCss,
} from '@/client/styles/ErrorStyles';

const SwitchErrorContext = ({
	inPaymentFailure,
}: {
	inPaymentFailure: boolean;
}) =>
	inPaymentFailure ? (
		<>
			Please update your payment details in order to change your support.
			<Link
				css={[errorSummaryLinkCss, errorSummaryBlockLinkCss]}
				to="/payment/contributions"
			>
				Check your payment details
			</Link>
		</>
	) : (
		<>
			Please ensure your payment details are correct. If the problem
			persists get in touch at{' '}
			<a
				css={errorSummaryLinkCss}
				href="mailto:customer.help@theguardian.com"
			>
				customer.help@theguardian.com
			</a>
			.
		</>
	);

export const SwitchErrorSummary = ({
	inPaymentFailure,
}: {
	inPaymentFailure: boolean;
}) => (
	<ErrorSummary
		message={
			inPaymentFailure
				? 'There is a problem with your payment method'
				: 'We were unable to change your support'
		}
		context={<SwitchErrorContext inPaymentFailure={inPaymentFailure} />}
		cssOverrides={errorSummaryOverrideCss}
	/>
);
