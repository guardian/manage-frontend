import { brand } from '@guardian/source-foundations';
import { Button } from '../shared/Buttons';
import {
	dataPrivacyHeadingCss,
	dataPrivacyParagraphCss,
} from './DataPrivacy.styles';

interface CookiesOnThisBrowserSectionProps {
	onClick: Function;
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
				necessary to help our website work properly and can’s be
				switched off, and some are optional but support the Guardian and
				your experience in other ways.
			</p>
			<Button
				disabled={false}
				text="Manage cookies on this browser"
				type="button"
				colour={brand[400]}
				onClick={() => props.onClick()}
				fontWeight="bold"
			/>
		</>
	);
};
