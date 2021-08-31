import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import { brand, neutral } from "@guardian/src-foundations/palette";
import { textSans } from "@guardian/src-foundations/typography";
import { maxWidth } from "../../styles/breakpoints";

export const liveChatCss = css`
  ${maxWidth.desktop} {
    .embeddedServiceSidebar.layout-docked .dockableContainer,
    .embeddedServiceSidebar.layout-float .dockableContainer {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      max-width: 100%;
      min-height: 100vh;
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
    .prechat--button-holder[c-prechatForm_prechatForm] {
      margin-top: auto;
    }
    .stateBody {
      overflow-y: scroll;
    }
  }
  .embeddedServiceSidebar.layout-docked .dockableContainer {
    border-radius: 0;
  }
  .waitingStateButtonContainer .waitingCancelChat {
    border-radius: 0;
    border: 1px solid ${brand["500"]};
    background-color: ${neutral["100"]};
    font-weight: bold;
  }
  .waitingStateButtonContainer .waitingCancelChat .label {
    color: ${brand["500"]};
  }
  .waitingStateButtonContainer .waitingCancelChat:focus {
    text-decoration: none;
  }
  .waitingStateContainer .waitingStateContent,
  .dialogState .dialogTextContainer {
    justify-content: normal;
  }
  .embeddedServiceSidebarButton {
    border-radius: 0;
  }
  .dialogButtonContainer button:not(:last-of-type) {
    background: ${brand["500"]};
  }
  .dialogButtonContainer button .label {
    font-weight: bold;
  }
  .dialogButtonContainer button:not(:last-of-type) .label {
    color: ${neutral["100"]};
  }
  .dialogButtonContainer button:not(:last-of-type):focus {
    text-decoration: none;
  }
  .dialogButtonContainer button:last-of-type {
    border: 1px solid ${brand["500"]};
    background: ${neutral["100"]};
  }
  .dialogButtonContainer button:last-of-type span {
    color: ${brand["500"]};
  }
  .embeddedServiceLiveAgentStateWaiting .embeddedServiceLoadingBalls {
    align-self: normal;
    justify-content: normal;
    padding-top: 0;
  }
  .waitingGreetingContent .waitingGreeting,
  .waitingGreetingContent .waitingMessage,
  .dialogTextContainer #dialogTextTitle,
  .dialogTextContainer #dialogTextBody {
    ${textSans.medium()};
    text-align: left;
    color: ${neutral["46"]};
    font-size: 14px;
    padding: 0;
  }
  .waitingStateContent .waitingGreetingContent,
  .dialogTextContainer {
    margin: 24px 0;
  }
  .dialogTextContainer #dialogTextBody {
    padding: 0;
  }
  .endChatContainer button {
    font-weight: bold;
  }
  .endChatContainer button + button {
    margin-top: ${space[3]}px;
  }
  .endChatContainer button:is(:last-of-type) .label {
    color: ${brand["500"]};
    text-decoration: underline;
  }
  .endChatContainer .endChatButton:focus {
    background: ${brand["500"]};
    text-decoration: none;
  }
  .dialogTextContainer h3#dialogTextTitle {
    font-weight: bold;
  }
`;
