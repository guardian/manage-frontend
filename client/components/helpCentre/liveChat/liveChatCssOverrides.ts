import { css } from '@emotion/react';
import {
	brand,
	neutral,
	space,
	textSans,
	until,
} from '@guardian/source/foundations';

export const liveChatCss = css`
	.embeddedServiceSidebar.layout-docked .dockableContainer,
	.embeddedServiceSidebar.layout-float .dockableContainer {
		max-height: 524px;
	}
	${until.desktop} {
		.embeddedServiceSidebar.layout-docked .dockableContainer,
		.embeddedServiceSidebar.layout-float .dockableContainer {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			max-width: 100%;
			min-height: 100%;
			margin-top: 0;
		}
		.embeddedServiceLiveAgentSidebarFeature
			.embeddedServiceSidebarState
			[c-prechatform_prechatform-host]
			> div:not(.prechat--hide) {
			display: flex;
			flex-direction: column;
			min-height: 100%;
		}
		.stateBody {
			overflow-y: scroll;
		}
	}
	.prechat--container {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.prechat--button-holder[c-prechatForm_prechatForm] {
		margin-top: auto;
	}
	.prechat--fieldset[c-prechatForm_prechatForm] {
		padding-top: 8px;
		padding-bottom: 0;
	}
	.embeddedServiceSidebar.layout-docked .dockableContainer {
		border-radius: 0;
		margin-top: auto;
	}
	.waitingStateButtonContainer .waitingCancelChat {
		border-radius: 0;
		border: 1px solid ${brand['500']};
		background-color: ${neutral['100']};
		font-weight: bold;
	}
	.waitingStateButtonContainer .waitingCancelChat .label {
		color: ${brand['500']};
	}
	.waitingStateButtonContainer .waitingCancelChat:focus {
		text-decoration: none;
	}
	.waitingStateContainer .waitingStateContent,
	.dialogState .dialogTextContainer {
		justify-content: normal;
	}
	.waitingStateContainer .queuePositionContent .queuePositionChatIcon .icon {
		display: none;
	}
	.embeddedServiceLiveAgentQueuePosition
		.queuePositionChatIcon
		.embeddedServiceLoadingBalls {
		left: 0;
		transform: translate(0, -50%);
	}
	.waitingStateContainer .queuePositionContent {
		justify-content: start;
		align-self: start;
	}
	.embeddedServiceLiveAgentQueuePosition.queuePositionWaiting
		.queuePositionNumber,
	.embeddedServiceLiveAgentQueuePosition.queuePositionWaiting
		.youAreNextMessage {
		color: #767676;
		text-align: left;
		font-size: 20px;
		font-weight: 700;
	}
	.embeddedServiceLiveAgentQueuePosition .queuePositionMessage p {
		color: #767676;
		text-align: left;
	}
	.embeddedServiceLiveAgentStateWaiting
		.waitingStateContent
		.reconnectingContent {
		margin-top: ${space[6]}px;
	}
	.embeddedServiceSidebarButton {
		border-radius: 0;
	}
	.dialogButtonContainer button:nth-of-type(odd) {
		background: ${brand['500']};
	}
	.dialogButtonContainer button:nth-of-type(odd):hover {
		background: ${brand['400']};
	}
	.dialogButtonContainer button .label {
		font-weight: bold;
	}
	.dialogButtonContainer button:nth-of-type(odd) .label {
		color: ${neutral['100']};
	}
	.dialogButtonContainer button:nth-of-type(odd):focus {
		text-decoration: none;
	}
	.dialogButtonContainer button:nth-of-type(even) {
		border: 1px solid ${brand['500']};
		background: ${neutral['100']};
	}
	.embeddedServiceSidebarButton.uiButton--inverse:not(:disabled):focus,
	.embeddedServiceSidebarButton.uiButton--inverse:not(:disabled):hover {
		background: ${neutral['100']};
	}
	.dialogButtonContainer button:nth-of-type(even):hover {
		border: 1px solid ${brand['400']};
	}
	.dialogButtonContainer button:nth-of-type(even) span {
		color: ${brand['500']};
	}
	.dialogButtonContainer button:nth-of-type(even):hover span {
		color: ${brand['400']};
	}
	.embeddedServiceLiveAgentStateWaiting .embeddedServiceLoadingBalls {
		align-self: normal;
		justify-content: normal;
		padding-top: 0;
	}
	.waitingGreetingContent .waitingGreeting,
	.waitingGreetingContent .waitingMessage,
	.waitingGreetingContent .queuePositionMessage,
	.dialogTextContainer #dialogTextTitle,
	.dialogTextContainer #dialogTextBody,
	.prechat--no-agents-msg-holder p {
		${textSans.medium()};
		text-align: left;
		color: ${neutral['46']};
		font-size: 14px;
		padding: 0;
	}
	.prechat--no-agents-msg-holder p a {
		color: ${brand['500']};
	}
	.waitingStateContent .waitingGreetingContent,
	.dialogTextContainer {
		margin: 24px 0;
	}
	.queuePositionCounter {
		display: none;
	}
	.waitingStateContent .waitingGreetingContent,
	.waitingStateContent .queuePositionChatIcon {
		margin-bottom: ${space[2]}px;
	}
	.dialogTextContainer #dialogTextBody {
		padding: 0;
	}
	.reconnectingText {
		text-align: left;
		margin-left: 0;
		margin-right: 0;
		color: ${neutral['46']};
	}
	.endChatContainer button {
		font-weight: bold;
	}
	.endChatContainer button + button {
		margin-top: ${space[3]}px;
	}
	.endChatContainer button:nth-of-type(even) .label {
		color: ${brand['500']};
		text-decoration: underline;
	}
	.endChatContainer .endChatButton:focus {
		background: ${brand['500']};
		text-decoration: none;
	}
	.embeddedServiceLiveAgentStateChatEventMessage .eventMessage,
	.messageArea .chatSessionStartTime {
		font-size: 13px;
		color: ${neutral['46']};
	}

	.chatContent .chat-content.agent a {
		color: ${neutral['100']};
		text-decoration: underline;
	}
`;
