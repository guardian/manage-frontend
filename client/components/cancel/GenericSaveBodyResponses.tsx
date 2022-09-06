import { hrefStyle } from './cancellationConstants';
import { SaveBodyProps } from './cancellationReason';

export const BreakFromNews: React.FC<SaveBodyProps> = () => (
	<>
		<p>Thank you for your ongoing support.</p>
		<p>
			Your subscription has ensured that our quality journalism remains
			open for everyone to read and enjoy. You can{' '}
			<a css={hrefStyle} href="/email-prefs">
				update your email preferences here
			</a>{' '}
			if you’d like to reduce communication from us.
		</p>
	</>
);

export const BreakFromNewsWithAlternative: React.FC<SaveBodyProps> = () => (
	<>
		<p>Thank you for your ongoing support.</p>
		<p>
			Your subscription has ensured that our quality journalism remains
			open for everyone to read and enjoy. You can{' '}
			<a css={hrefStyle} href="/email-prefs">
				update your email preferences here
			</a>{' '}
			if you’d like to reduce communication from us.
		</p>
		<p>
			Alternatively we’d love to know more about what we could do better
			to help provide inspiring and trustworthy news.
		</p>
	</>
);

export const BreakFromNewsWithGW: React.FC<SaveBodyProps> = () => (
	<>
		You can{' '}
		<a css={hrefStyle} href="/email-prefs">
			click here to manage your communication preferences
		</a>
		.
		<br />
		<br />
		<span>
			If you would like some help with your communication preferences our
			customer services team would be happy to set this up for you.
		</span>
	</>
);

export const PaymentIssue: React.FC<SaveBodyProps> = () => (
	<>
		<p>
			Please leave feedback in the box below. Alternatively you can
			contact us directly to discuss resolving the issue, by emailing{' '}
			<a css={hrefStyle} href="mailto:customer.help@theguardian.com">
				customer.help@theguardian.com
			</a>
			.
		</p>
	</>
);
