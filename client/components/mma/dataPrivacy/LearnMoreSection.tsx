import { aCss } from '../identity/sharedStyles';
import {
	dataPrivacyHeadingCss,
	dataPrivacyParagraphCss,
} from './DataPrivacy.styles';

export const LearnMoreSection = () => {
	return (
		<>
			<h3 css={dataPrivacyHeadingCss}>
				Learn more about our privacy policy
			</h3>

			<p css={dataPrivacyParagraphCss}>
				For more information about how we use your data, visit our&nbsp;
				<a
					css={aCss}
					target="_blank"
					href={'https://www.theguardian.com/info/privacy'}
					rel="noreferrer"
				>
					privacy policy
				</a>{' '}
			</p>
		</>
	);
};
