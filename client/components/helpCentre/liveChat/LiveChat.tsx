import type { SerializedStyles } from '@emotion/react';
import {
	Button,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { LoadingCircleIcon } from '../../mma/shared/assets/LoadingCircleIcon';
import { liveChatCss } from './liveChatCssOverrides';

// Enhanced Chat types
declare global {
	interface Window {
		embeddedservice_bootstrap?: {
			settings: {
				language: string;
			};
			init: (
				orgId: string,
				serviceName: string,
				siteUrl: string,
				options?: object,
			) => Promise<void>;
			utilAPI: {
				launchChat: () => void;
				hideChatButton: () => void;
			};
			prechatAPI: {
				setHiddenPrechatFields: (
					fields: Record<string, string>,
				) => void;
				setVisiblePrechatFields: (
					fields: Record<string, object>,
				) => void;
			};
			userVerificationAPI?: {
				setIdentityToken: (token: object) => Promise<void>;
			};
		};
	}
}

// Configuration for Enhanced Chat environments
const CHAT_CONFIG = {
	PROD: {
		URL: 'https://gnmtouchpoint.my.site.com/ESWEnhancedChat1769622373142',
		ORG_ID: '00D20000000nq5g',
		DEPLOYMENT_NAME: 'Enhanced_Chat',
		SCRT2URL: 'https://gnmtouchpoint.my.salesforce-scrt.com',
	},
	CODE: {
		URL: 'https://gnmtouchpoint--dev1.sandbox.my.site.com/ESWEnhancedLiveChat1765817908909',
		ORG_ID: '00D9E0000004jvh',
		DEPLOYMENT_NAME: 'Enhanced_Live_Chat',
		SCRT2URL: 'https://gnmtouchpoint--dev1.sandbox.my.salesforce-scrt.com',
	},
};

const getChatConfig = () => {
	return window.guardian.domain === 'theguardian.com'
		? CHAT_CONFIG.PROD
		: CHAT_CONFIG.CODE;
};

// Initialize function
const initEnhancedChat = () => {
	return new Promise((resolve, reject) => {
		const config = getChatConfig();

		// If API is already fully ready, return immediately
		if (window.embeddedservice_bootstrap?.utilAPI) {
			resolve(true);
			return;
		}

		// Setup the "Ready" Listener
		// This event fires when the chat is fully loaded and APIs are usable.
		const onReadyHandler = () => {
			resolve(true);

			window.removeEventListener(
				'onEmbeddedMessagingReady',
				onReadyHandler,
			);
		};
		window.addEventListener('onEmbeddedMessagingReady', onReadyHandler);

		// Load Script if missing
		if (!window.embeddedservice_bootstrap) {
			const script = document.createElement('script');
			script.src = `${config.URL}/assets/js/bootstrap.min.js`;
			script.onload = async () => {
				try {
					if (!window.embeddedservice_bootstrap) {
						throw new Error(
							'Embedded Service Bootstrap failed to load.',
						);
					}

					// Ensure settings exist
					window.embeddedservice_bootstrap.settings =
						window.embeddedservice_bootstrap.settings || {};
					window.embeddedservice_bootstrap.settings.language =
						'en_US';

					await window.embeddedservice_bootstrap.init(
						config.ORG_ID,
						config.DEPLOYMENT_NAME,
						config.URL,
						{
							scrt2URL: config.SCRT2URL,
						},
					);
				} catch (error) {
					console.error('Chat Init Error', error);
					reject(new Error(JSON.stringify(error)));
				}
			};
			script.onerror = reject;
			document.body.appendChild(script);
		} else {
			// If script exists but API wasn't ready in step 1, we just wait for the event.
			// It might have already fired before we added the listener, so we add a fallback check:
			setTimeout(() => {
				if (window.embeddedservice_bootstrap?.utilAPI) {
					resolve(true);
				}
			}, 2000);
		}
	});
};

// Component:
export const StartEnhancedChatButton = (props: StartLiveChatButtonProps) => {
	const [isLoading, setIsLoading] = useState(false);

	const bootstrapChat = async () => {
		setIsLoading(true);
		try {
			// Init the library
			await initEnhancedChat();

			// Launch the Chat
			window.embeddedservice_bootstrap?.utilAPI.launchChat();
		} catch (error) {
			console.error('StartEnhancedChatButton Init Error', error);
			props.setIsLiveChatAvailable(false);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button
			priority="secondary"
			onClick={bootstrapChat}
			cssOverrides={props.liveChatButtonCss}
			icon={isLoading ? <LoadingCircleIcon /> : <SvgArrowRightStraight />}
			iconSide="right"
		>
			Start live chat
		</Button>
	);
};

export const LiveChat = () => (
	<div id="liveChatContainerEl" css={liveChatCss} />
);

interface StartLiveChatButtonProps {
	liveChatButtonCss: SerializedStyles;
	setIsLiveChatAvailable: Dispatch<SetStateAction<boolean>>;
}

export const StartLiveChatButton = (props: StartLiveChatButtonProps) => {
	const [liveChatIsLoading, setLiveChatIsLoading] = useState<boolean>(false);

	const bootstrapChat = async () => {
		setLiveChatIsLoading(true);
		try {
			// Init the library
			await initEnhancedChat();

			// Ensure the API exists
			if (window.embeddedservice_bootstrap?.utilAPI) {
				// Launch the Chat with a slight safety delay
				// Sometimes the iframe needs a split second to register the message listener after init resolves

				const email = window.guardian?.identityDetails.email || '';
				const identityId =
					window.guardian?.identityDetails.userId || '';

				setTimeout(() => {
					window.embeddedservice_bootstrap?.prechatAPI.setHiddenPrechatFields(
						{
							Identity_ID: identityId,
						},
					);

					if (email) {
						window.embeddedservice_bootstrap?.prechatAPI.setVisiblePrechatFields(
							{
								_email: {
									value: email,
									isEditableByEndUser: false,
								},
							},
						);
					}

					window.embeddedservice_bootstrap?.utilAPI.launchChat();
				}, 100);
			} else {
				throw new Error('Embedded Service Bootstrap API not found.');
			}
		} catch (error) {
			console.error('StartLiveChatButton init failure:', error);
			props.setIsLiveChatAvailable(false);
		} finally {
			setLiveChatIsLoading(false);
		}
	};

	return (
		<Button
			priority="secondary"
			onClick={bootstrapChat}
			cssOverrides={props.liveChatButtonCss}
			icon={
				liveChatIsLoading ? (
					<LoadingCircleIcon />
				) : (
					<SvgArrowRightStraight />
				)
			}
			iconSide="right"
		>
			Start live chat
		</Button>
	);
};
