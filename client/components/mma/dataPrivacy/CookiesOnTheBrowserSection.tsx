import { Button } from '@guardian/source-react-components';
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
				necessary to help our website work properly and can’t be
				switched off, and some are optional but may support the Guardian
				and your experience in other ways.
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
