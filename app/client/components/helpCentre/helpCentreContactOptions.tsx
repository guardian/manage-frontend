import { css } from '@emotion/core';
import { Button } from '@guardian/src-button';
import { space } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { useState } from 'react';
import { minWidth } from '../../styles/breakpoints';
import { CallCentreEmailAndNumbers } from '../callCenterEmailAndNumbers';
import { isLiveChatFeatureEnabled } from '../liveChat/liveChatFeatureSwitch';
import {
	LiveChatPrivacyNotice,
	LiveChatPrivacyNoticeLink,
} from '../liveChat/liveChatPrivacyNotice';
import { HelpCentreEmailAndLiveChat } from './helpCentreEmailAndLiveChat';
import { HelpCentrePhoneNumbers } from './helpCentrePhoneNumbers';

interface HelpCentreContactOptionsProps {
	compactLayout?: boolean;
	hideContactOptions?: boolean;
}

const baseSubtitleStyles = css`
	border-top: 1px solid ${neutral['86']};
	margin-top: 30px;
	${headline.small({ fontWeight: 'bold' })};
`;

const subtitleStyles = css`
	${baseSubtitleStyles}
	margin-bottom: ${space[6]}px;
	${minWidth.tablet} {
		margin-bottom: ${space[6]}px;
		margin-top: 40px;
	}
`;

const liveChatSubtitleStyles = css`
	${baseSubtitleStyles}
	margin-bottom: ${space[1]}px;
	${minWidth.tablet} {
		margin-bottom: 0;
		margin-top: 40px;
	}
`;

const emailAndLiveChatSubheadingCss = css`
	${textSans.medium()};
	margin-bottom: ${space[1]}px;
	max-width: 320px;
	${minWidth.tablet} {
		max-width: none;
	}
`;

const emailAndLiveChatSubheadingWideCss = css`
	${minWidth.wide} {
		display: none;
	}
`;

const contactButtonCss = css`
	margin-top: ${space[4]}px;
	margin-bottom: ${space[9]}px;
	${minWidth.desktop} {
		margin-top: ${space[6]}px;
		margin-bottom: ${space[12]}px;
	}
`;

const HelpCentreContactOptions = (props: HelpCentreContactOptionsProps) => {
	const [contactOptionsHidden, setContactOptionsHidden] = useState(
		props.hideContactOptions,
	);

	return (
		<>
			<h2
				css={
					isLiveChatFeatureEnabled()
						? liveChatSubtitleStyles
						: subtitleStyles
				}
			>
				Still can’t find what you’re looking for?
			</h2>

			{isLiveChatFeatureEnabled() ? (
				<>
					<p
						css={[
							emailAndLiveChatSubheadingCss,
							!props.compactLayout &&
								emailAndLiveChatSubheadingWideCss,
						]}
					>
						Get in touch with one of our customer service agents.
					</p>

					<div aria-live="polite">
						{!contactOptionsHidden && (
							<>
								<LiveChatPrivacyNoticeLink />
								<HelpCentreEmailAndLiveChat
									compactLayout={props.compactLayout}
								/>
								<HelpCentrePhoneNumbers
									compactLayout={props.compactLayout}
								/>
								<LiveChatPrivacyNotice />
							</>
						)}

						{contactOptionsHidden && (
							<div css={contactButtonCss}>
								<Button
									priority="secondary"
									onClick={() =>
										setContactOptionsHidden(false)
									}
								>
									Contact us
								</Button>
							</div>
						)}
					</div>
				</>
			) : (
				<CallCentreEmailAndNumbers />
			)}
		</>
	);
};

export default HelpCentreContactOptions;
