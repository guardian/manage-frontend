import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	Button,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { conf } from '../../../../server/config';
import { trackEvent } from '../../../utilities/analytics';
import { LoadingCircleIcon } from '../../mma/shared/assets/LoadingCircleIcon';
import { avatarImg } from './liveChatBase64Images';
import { liveChatCss } from './liveChatCssOverrides';

let areAgentsAvailable = false;

// Enhanced Chat types
declare global {
	interface Window {
		embeddedservice_bootstrap?: {
			settings: {
				language: string;
			};
			init: (
				orgId: string,
				serviceName: string, // The API Name of your deployment
				siteUrl: string,
				options?: object,
			) => Promise<void>;
			utilAPI: {
				launchChat: () => void;
				hideChatButton: () => void;
			};
			userVerificationAPI?: {
				setIdentityToken: (token: object) => Promise<void>;
			};
		};
	}
}

// Configuration for Enhanced Chat environments
const MIAW_CONFIG = {
	PROD: {
		//not ready for production yet
		URL: 'https://example.com/ESWDeployment',
		ORG_ID: '00D200000001234',
		DEPLOYMENT_NAME: 'Example_Deployment_Name',
	},
	CODE: {
		URL: 'https://gnmtouchpoint--dev1.sandbox.my.site.com/ESWEnhancedLiveChat1765817908909',
		ORG_ID: '00D9E0000004jvh',
		DEPLOYMENT_NAME: 'Enhanced_Live_Chat',
	},
};

const getChatConfig = () => {
	return window.guardian.domain === 'theguardian.com'
		? MIAW_CONFIG.PROD
		: MIAW_CONFIG.CODE;
};

// Initialize function
const initEnhancedChat = (identityID: string, email: string) => {
	return new Promise((resolve, reject) => {
		const config = getChatConfig();

		console.log(
			'Starting init function, identityID: ' +
				identityID +
				', email: ' +
				email,
		);

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
						//TODO: Is this the correct way to work around "'window.embeddedservice_bootstrap' is possibly 'undefined'" ?
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
							scrt2URL: `https://gnmtouchpoint--dev1.sandbox.my.salesforce-scrt.com`,
						},
					);
				} catch (error) {
					console.error('MIAW Init Error', error);
					reject(new Error(JSON.stringify(error))); //TO DO: fix prefer-promise-reject-errors properly
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
			await initEnhancedChat(
				window.guardian?.identityDetails.userId ?? '',
				window.guardian?.identityDetails.email ?? '',
			);

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

// Original init function
const initESW = (
	gslbBaseUrl: string | null,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Salesforce provides this object
	liveChatAPI: any,
	targetElement: HTMLElement,
	identityID: string,
	loginEmail: string,
) => {
	return new Promise((resolve, reject) => {
		const liveChatConfig = {
			displayHelpButton: false,
			language: '',
			defaultMinimizedText: 'Live chat',
			disabledMinimizedText: 'Live chat',
			prepopulatedPrechatFields: {
				SuppliedEmail: loginEmail,
			},
			enabledFeatures: ['LiveAgent'],
			entryFeature: 'LiveAgent',
			avatarImgURL: avatarImg,
			targetElement,
			extraPrechatFormDetails: [
				{
					label: 'Origin Channel',
					value: 'Live Chat',
				},
				{
					label: 'Identity ID',
					value: identityID,
				},
				{
					label: 'Contact Identity Id',
					value: identityID,
					transcriptFields: ['Contact_Identity_Id__c'],
				},
				{
					label: 'First Name',
					transcriptFields: ['Contact_First_Name__c'],
				},
				{
					label: 'Last Name',
					transcriptFields: ['Contact_Last_Name__c'],
				},
				{
					label: 'Web Email',
					transcriptFields: ['Contact_Email__c'],
				},
			],
			extraPrechatInfo: [
				{
					entityFieldMaps: [
						{
							doCreate: false,
							doFind: false,
							fieldName: 'LastName',
							isExactMatch: true,
							label: 'Last Name',
						},
						{
							doCreate: false,
							doFind: false,
							fieldName: 'FirstName',
							isExactMatch: true,
							label: 'First Name',
						},
						{
							doCreate: false,
							doFind: true,
							fieldName: 'IdentityID__c',
							isExactMatch: true,
							label: 'Identity ID',
						},
					],
					entityName: 'Contact',
				},
				{
					entityFieldMaps: [
						{
							doCreate: true,
							doFind: false,
							fieldName: 'Origin_Channel__c',
							isExactMatch: true,
							label: 'Origin Channel',
						},
					],
					entityName: 'Case',
				},
			],
		};

		const timeoutTimer = setTimeout(() => {
			reject(new Error('Promise timed out.'));
		}, 15000);

		liveChatAPI.addEventHandler(
			'onSettingsCallCompleted',
			(data: { isAgentAvailable: boolean }) => {
				const domain =
					typeof window !== 'undefined' && window.guardian
						? window.guardian.domain
						: conf.DOMAIN;
				areAgentsAvailable = data.isAgentAvailable;
				postMessage(
					`postAgentsAvailable:${data.isAgentAvailable}`,
					`https://manage.${domain}`,
				);

				const postMessageListener = (event: MessageEvent) => {
					if (
						event.origin !== 'https://manage.theguardian.com' &&
						event.origin !==
							'https://manage.code.dev-theguardian.com' &&
						event.origin !== 'https://manage.thegulocal.com'
					) {
						return;
					}

					if (event.data === 'requestAgentsAvailable') {
						postMessage(
							`postAgentsAvailable:${areAgentsAvailable}`,
							`https://manage.${domain}`,
						);
					}
				};

				window.addEventListener('message', postMessageListener, false);

				clearTimeout(timeoutTimer);
				resolve(true);
			},
		);

		if (liveChatAPI.isIframeReady) {
			clearTimeout(timeoutTimer);
			resolve(true);
		}

		liveChatAPI.addEventHandler(
			'onAvailability',
			(data: { isAgentAvailable: boolean }) => {
				areAgentsAvailable = data.isAgentAvailable;
			},
		);

		// tslint:disable-next-line:no-object-mutation
		liveChatAPI.settings = { ...liveChatAPI.settings, ...liveChatConfig };

		liveChatAPI.init(
			'https://gnmtouchpoint.my.salesforce.com',
			'https://gnmtouchpoint.my.salesforce-sites.com/liveagent',
			gslbBaseUrl,
			'00D20000000nq5g',
			'Chat_Team',
			{
				baseLiveAgentContentURL:
					'https://c.la2-c2-cdg.salesforceliveagent.com/content',
				deploymentId: '5725I0000004RYv',
				buttonId: '5735I0000004Rj7',
				baseLiveAgentURL:
					'https://d.la2-c2-cdg.salesforceliveagent.com/chat',
				eswLiveAgentDevName:
					'EmbeddedServiceLiveAgent_Parent04I5I0000004LLTUA2_1797a9534a2',
				isOfflineSupportEnabled: false,
			},
		);
	});
};

const initLiveChat = (
	targetElement: HTMLElement,
	identityID: string,
	loginEmail: string,
) => {
	return new Promise((resolve, reject) => {
		if (!window.embedded_svc) {
			const liveChatScript = document.createElement('script');
			liveChatScript.setAttribute('id', 'liveChatScript');
			if (window.guardian.domain === 'theguardian.com') {
				liveChatScript.setAttribute(
					'src',
					'https://gnmtouchpoint.my.salesforce.com/embeddedservice/5.0/esw.min.js',
				);

				// tslint:disable-next-line:no-object-mutation
				liveChatScript.onload = async () => {
					await initESW(
						null,
						window.embedded_svc,
						targetElement,
						identityID,
						loginEmail,
					).catch(() =>
						reject(new Error('livechat initESW function error')),
					);
					resolve(true);
				};
			} else {
				console.error(
					'in CODE environment, Legacy Live Chat not available',
				);
			}

			// tslint:disable-next-line:no-object-mutation
			liveChatScript.onerror = () => {
				reject(new Error('liveChatScript error'));
			};

			document.body.appendChild(liveChatScript);
		} else {
			resolve(
				initESW(
					null,
					window.embedded_svc,
					targetElement,
					identityID,
					loginEmail,
				),
			);
		}
	});
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

	if (window.guardian.domain === 'theguardian.com') {
		const bootstrapChat = async () => {
			setLiveChatIsLoading(true);
			let canLoadLiveChat = true;
			await initLiveChat(
				document.getElementById('liveChatContainerEl') as HTMLElement,
				window.guardian?.identityDetails.userId ?? '',
				window.guardian?.identityDetails.email ?? '',
			).catch(() => {
				props.setIsLiveChatAvailable(false);
				canLoadLiveChat = false;
			});
			if (!canLoadLiveChat) {
				return;
			}
			await window.embedded_svc.bootstrapEmbeddedService();

			const preChatEmailField = document.getElementById(
				'SuppliedEmail',
			) as HTMLInputElement;
			if (window.guardian?.identityDetails.email && preChatEmailField) {
				// tslint:disable-next-line:no-object-mutation
				preChatEmailField.disabled = true;
				preChatEmailField.classList.add('disabledField');
			}

			setLiveChatIsLoading(false);
		};

		return (
			<Button
				priority="secondary"
				onClick={() => {
					trackEvent({
						eventCategory: 'livechat',
						eventAction: 'click',
						eventLabel: 'start_live_chat',
					});
					bootstrapChat();
				}}
				cssOverrides={props.liveChatButtonCss}
				icon={
					liveChatIsLoading ? (
						<LoadingCircleIcon
							additionalCss={css`
								padding: 3px;
							`}
						/>
					) : (
						<SvgArrowRightStraight />
					)
				}
				iconSide="right"
			>
				Start live chat
			</Button>
		);
	} else {
		//Live Chat button for CODE environment using Enhanced Chat
		const bootstrapChat = async () => {
			setLiveChatIsLoading(true);
			try {
				console.log('Initializing Enhanced Chat...');

				// Init the library
				await initEnhancedChat(
					window.guardian?.identityDetails.userId ?? '',
					window.guardian?.identityDetails.email ?? '',
				);

				// Safety Check: Ensure the API exists
				if (window.embeddedservice_bootstrap?.utilAPI) {
					// Launch the Chat with a slight safety delay
					// Sometimes the iframe needs a split second to register the message listener after init resolves
					setTimeout(() => {
						try {
							window.embeddedservice_bootstrap?.utilAPI.launchChat();
						} catch (launchError) {
							console.error(
								'Error specifically during launchChat:',
								launchError,
							);
						}
					}, 100);
				} else {
					throw new Error(
						'Embedded Service Bootstrap API not found.',
					);
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
	}
};
