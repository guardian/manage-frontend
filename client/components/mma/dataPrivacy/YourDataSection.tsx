import type { ClickHandler } from '../identity/emailAndMarketing/OptOutSection';
import { optOutFinder } from '../identity/emailAndMarketing/OptOutSection';
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

export const YourDataSection = (props: YourDataSectionProps) => {
	const addMarketingToggleElement = optOutFinder(
		props.consents,
		props.toggleConsent,
		dataPrivacyMarketingToggleCss,
	);
	return (
		<>
			<h3 css={dataPrivacyHeadingCss}>Your Data</h3>
			<p css={dataPrivacyParagraphCss}>What we mean by your data</p>
			<ul css={dataPrivacyUnorderedListCss}>
				<li> Information you provide such as your email address</li>
				<li> Products or services you buy from us</li>
				<li>
					{' '}
					Pages you view on theguardian.com or other Guardian websites
					when signed in
				</li>
			</ul>
			<Lines n={1} />
			{addMarketingToggleElement('profiling_optout')}
			<Lines n={1} />
			{addMarketingToggleElement('personalised_advertising')}

			<p css={dataPrivacyParagraphCss}>
				Advertising is a crucial source of our funding. You won't see
				more ads, and your data won't be shared with third parties to
				use for their own advertising
			</p>
			<p css={dataPrivacyParagraphCss}>We do this by:</p>
			<ul css={dataPrivacyUnorderedListCss}>
				<li>
					{' '}
					analysing your information to predict what you might be
					interested in
				</li>
				<li>
					{' '}
					checking if you are already a customer of other trusted
					partners.
				</li>
			</ul>
		</>
	);
};
