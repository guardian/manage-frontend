import { Lines } from '../identity/Lines';
import { aCss } from '../identity/sharedStyles';
import {
	dataPrivacyHeadingCss,
	dataPrivacyParagraphCss,
} from './DataPrivacy.styles';
import { VideoPlayer } from './shared/VideoPlayer';

export const LearnMoreSection = () => {
	return (
		<>
			<h3 css={dataPrivacyHeadingCss}>
				Learn more about our privacy policy
			</h3>
			<VideoPlayer
				overlayText={"The Guardian's privacy policy"}
				url={
					'https://uploads.guim.co.uk/2019%2F30%2F26%2FThe+Guardian%27s+privacy+policy+%E2%80%93+video--7d3a7f3f-bc23-4e9d-9566-ea1f8ada5954-1.mp4'
				}
			/>

			<Lines n={1} />

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
				guide
			</p>
		</>
	);
};
