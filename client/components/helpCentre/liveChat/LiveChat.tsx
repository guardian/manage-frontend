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

		if (window.guardian.domain === 'theguardian.com') {
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
		} else {
			// Initialise live chat API for DEV1 test sandbox
			liveChatAPI.init(
				'https://gnmtouchpoint--dev1.sandbox.my.salesforce.com',
				'https://gnmtouchpoint--dev1.sandbox.my.salesforce-sites.com/liveagent',
				gslbBaseUrl,
				'00D9E0000004jvh',
				'Chat_Team',
				{
					baseLiveAgentContentURL:
						'https://c.la12s-core1.sfdc-cehfhs.salesforceliveagent.com/content',
					deploymentId: '5729E000000CbOY',
					buttonId: '5739E0000008QCo',
					baseLiveAgentURL:
						'https://d.la12s-core1.sfdc-cehfhs.salesforceliveagent.com/chat',
					eswLiveAgentDevName:
						'EmbeddedServiceLiveAgent_Parent04I9E0000008OxDUAU_1797a576c18',
					isOfflineSupportEnabled: false,
				},
			);
		}
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
};
