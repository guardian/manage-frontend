import type { ClickHandler } from '../identity/emailAndMarketing/OptOutSection';
import {
	consentSubscribedValueInverter,
	optOutFinder,
} from '../identity/emailAndMarketing/OptOutSection';
import { Lines } from '../identity/Lines';
import type { ConsentOption } from '../identity/models';
import {
	dataPrivacyHeadingCss,
	dataPrivacyMarketingToggleCss,
	dataPrivacyParagraphCss,
	dataPrivacyUnorderedListCss,
} from './DataPrivacy.styles';

interface YourDataSectionProps {
	consents: ConsentOption[];
	toggleConsent: ClickHandler;
}

// NOTE: The personalised advertising consent description is hard coded here and in
// Identity Gateway. They should be the same unless running A/B tests.

// NOTE: The Your Data description is hard coded here and in
// Identity Gateway. They should be the same unless running A/B tests.
export const YourDataSection = (props: YourDataSectionProps) => {
	const addMarketingToggleElement = optOutFinder(
		props.consents,
		props.toggleConsent,
		dataPrivacyMarketingToggleCss,
		consentSubscribedValueInverter,
	);
	return (
		<>
			<h3 css={dataPrivacyHeadingCss}>Your account data</h3>
			<p css={dataPrivacyParagraphCss}>
				What we mean by your account data
			</p>
			<ul css={dataPrivacyUnorderedListCss}>
				<li>
					Information you provide when you register with us e.g. email
					address
				</li>
				<li>
					Information about the products or services you buy from us
				</li>
				<li>
					Pages you view on theguardian.com or other Guardian websites
					when signed in and your region
				</li>
			</ul>

			<Lines n={1} />
			{addMarketingToggleElement('profiling_optout')}
			<Lines n={1} />
			{addMarketingToggleElement('personalised_advertising')}

			<p css={dataPrivacyParagraphCss}>We do this by:</p>
			<ul css={dataPrivacyUnorderedListCss}>
				<li>
					Analysing your account data to predict what you might be
					interested in
				</li>
				<li>
					Checking if you are already a customer of other trusted
					partners
				</li>
			</ul>

			<p css={dataPrivacyParagraphCss}>
				Advertising is a crucial source of our funding. You won't see
				more ads, but your advertising may be more relevant. We don’t
				share your email with third parties.
			</p>
		</>
	);
};
