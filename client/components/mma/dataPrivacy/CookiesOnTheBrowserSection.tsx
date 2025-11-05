import { Button } from '@guardian/source/react-components';
import {
	dataPrivacyHeadingCss,
	dataPrivacyParagraphCss,
} from './DataPrivacy.styles';

interface CookiesOnThisBrowserSectionProps {
	onClick: () => unknown;
}

export const CookiesOnThisBrowserSection = (
	props: CookiesOnThisBrowserSectionProps,
) => {
	return (
		<>
			<h3 css={dataPrivacyHeadingCss}>Cookies on this browser</h3>
			<p css={dataPrivacyParagraphCss}>
				{' '}
				When we make the Guardian available for you online, we use
				cookies and similar technologies to help us to do this. Some are
				necessary to help our website work properly and can’t be
				switched off, and some are optional but may support your
				experience in other ways or help support the Guardian, including
				through personalised advertising.
			</p>
			<p css={dataPrivacyParagraphCss}>
				If you read the Guardian ad-free or subscribe to Guardian
				Ad-Lite, you can manage the use of cookies on our site for
				personalised advertising, and disable the sharing of data with
				partners for personalised advertising purposes by clicking below
				or on the "Privacy settings" link in the footer of every page of
				our site.
			</p>
			<Button
				disabled={false}
				type="button"
				onClick={() => props.onClick()}
			>
				Manage cookies on this browser
			</Button>
		</>
	);
};
