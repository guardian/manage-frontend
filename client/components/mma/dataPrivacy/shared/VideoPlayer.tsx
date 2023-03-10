import { brand } from '@guardian/source-foundations';
import { createRef, useState } from 'react';
import { Button } from '../../shared/Buttons';
import {
	dataPrivacyFooter,
	dataPrivacyVideoCss,
	dataPrivacyVideoOverlay,
	dataPrivacyVideoOverlayContainer,
} from '../DataPrivacy.styles';

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
				<Button
					disabled={false}
					text="PLAY"
					type="button"
					colour={brand[400]}
					onClick={() => hideOverlay()}
					fontWeight="bold"
				/>
				<h1>{props.overlayText}</h1>
			</div>
		</div>
	);
	return (
		<div css={dataPrivacyVideoOverlayContainer}>
			{showOverlay ? overlay : null}
			<video
				ref={videoRef}
				controls
				css={dataPrivacyVideoCss}
				src={props.url}
			/>
		</div>
	);
};
