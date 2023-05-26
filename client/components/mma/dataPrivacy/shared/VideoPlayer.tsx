import { createRef, useState } from 'react';
import {
	dataPrivacyFooter,
	dataPrivacyPlayButtonWrapper,
	dataPrivacyVideoCss,
	dataPrivacyVideoOverlay,
	dataPrivacyVideoOverlayContainer,
	dataPrivacyVideoTextHeadline,
} from '../DataPrivacy.styles';
import { PlayButton } from './PlayButton';

interface VideoPlayerProps {
	url: string;
	overlayText: string;
}

/**
 * This VideoPlayer displays an overlay with a
 *
 * @param {VideoPlayerProps} props
 * @return {*}
 */
export const VideoPlayer = (props: VideoPlayerProps) => {
	const [showOverlay, setShowOverlay] = useState<boolean>(true);
	const videoRef = createRef<HTMLVideoElement>();

	const hideOverlay = () => {
		videoRef.current?.play();
		setShowOverlay(false);
	};

	const overlay = (
		<div onClick={hideOverlay} css={dataPrivacyVideoOverlay}>
			<div css={dataPrivacyFooter}>
				<div css={dataPrivacyPlayButtonWrapper}>
					<PlayButton />
				</div>
				<h1 css={dataPrivacyVideoTextHeadline}>{props.overlayText}</h1>
				<span></span>
			</div>
		</div>
	);
	return (
		<div css={dataPrivacyVideoOverlayContainer}>
			{showOverlay ? overlay : null}
			<video
				ref={videoRef}
				controls={!showOverlay}
				css={dataPrivacyVideoCss}
				src={props.url}
				tabIndex={-1}
			/>
		</div>
	);
};
