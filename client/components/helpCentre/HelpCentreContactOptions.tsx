import { css } from '@emotion/react';
import {
	from,
	headlineBold28,
	palette,
	space,
	textSans17,
} from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import { useState } from 'react';
import { CallCentreEmailAndNumbers } from '../shared/CallCenterEmailAndNumbers';
import { HelpCentreEmailAndLiveChat } from './HelpCentreEmailAndLiveChat';
import { HelpCentrePhoneNumbers } from './HelpCentrePhoneNumbers';
import { isLiveChatFeatureEnabled } from './liveChat/liveChatFeatureSwitch';
import {
	LiveChatPrivacyNotice,
	LiveChatPrivacyNoticeLink,
} from './liveChat/LiveChatPrivacyNotice';

interface HelpCentreContactOptionsProps {
	compactLayout?: boolean;
	hideContactOptions?: boolean;
}

const baseSubtitleStyles = css`
	border-top: 1px solid ${palette.neutral['86']};
	margin-top: 30px;
	${headlineBold28};
`;

const subtitleStyles = css`
	${baseSubtitleStyles}
	margin-bottom: ${space[6]}px;
	${from.tablet} {
		margin-bottom: ${space[6]}px;
		margin-top: 40px;
	}
`;

const liveChatSubtitleStyles = css`
	${baseSubtitleStyles}
	margin-bottom: ${space[1]}px;
	${from.tablet} {
		margin-bottom: 0;
		margin-top: 40px;
	}
`;

const emailAndLiveChatSubheadingCss = css`
	${textSans17};
	margin-bottom: ${space[1]}px;
	max-width: 320px;
	${from.tablet} {
		max-width: none;
	}
`;

const emailAndLiveChatSubheadingWideCss = css`
	${from.wide} {
		display: none;
	}
`;

const contactButtonCss = css`
	margin-top: ${space[4]}px;
	margin-bottom: ${space[9]}px;
	${from.desktop} {
		margin-top: ${space[6]}px;
		margin-bottom: ${space[12]}px;
	}
`;

export const HelpCentreContactOptions = (
	props: HelpCentreContactOptionsProps,
) => {
	const [contactOptionsHidden, setContactOptionsHidden] = useState(
		props.hideContactOptions,
	);

	return (
		<>
			<h2
				id="contact-options"
				css={
					isLiveChatFeatureEnabled()
						? liveChatSubtitleStyles
						: subtitleStyles
				}
			>
				Contact our Customer Services Team
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
