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
	/** @type {*}
	 *
	 * This function is used for consents that are opt in
	 */
	const addMarketingToggleElement = optOutFinder(
		props.consents,
		props.toggleConsent,
		dataPrivacyMarketingToggleCss,
	);

	/** @type {*}
	 *
	 * This function is used for consents that are opt out.
	 * The consents have the `_optout` as id (i.e. profiling_optout)
	 *
	 */
	const addInvertedMarketingToggleElement = optOutFinder(
		props.consents,
		props.toggleConsent,
		dataPrivacyMarketingToggleCss,
		consentSubscribedValueInverter,
	);
	return (
		<>
			<h3 css={dataPrivacyHeadingCss}>Your account data</h3>
			<p css={dataPrivacyParagraphCss}>
				What we mean by your account data is information you provide
				when you register with us:
			</p>
			<ul css={dataPrivacyUnorderedListCss}>
				<li>First name and last name</li>
				<li>Email address</li>
			</ul>

			<Lines n={1} />
			{addInvertedMarketingToggleElement('profiling_optout')}
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
