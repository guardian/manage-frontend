import { css } from "@emotion/core";
import { Button } from "@guardian/src-button";
import React, { useEffect, useRef } from "react";
import { avatarImg, prechatBackgroundImg } from "./liveChatBase64Images";

const liveChatParamName = "liveChat";

const liveChatCss = css`
  /* Container */
  .embeddedServiceSidebar.layout-docked .dockableContainer {
    border-radius: 0;
  }
`;

const initESW = (
  gslbBaseUrl: string | null,
  liveChatAPI: any,
  targetElement: HTMLElement,
  identityID: string,
  loginEmail: string
) => {
  const liveChatConfig = {
    displayHelpButton: false,
    language: "",
    defaultMinimizedText: "Live chat",
    disabledMinimizedText: "Live chat",
    prepopulatedPrechatFields: {
      SuppliedEmail: loginEmail
    },
    enabledFeatures: ["LiveAgent"],
    entryFeature: "LiveAgent",
    avatarImgURL: avatarImg,
    prechatBackgroundImgURL: prechatBackgroundImg,
    targetElement,
    extraPrechatFormDetails: [
      {
        label: "Origin Channel",
        value: "Live Chat"
      },
      {
        label: "Identity ID",
        value: identityID
      },
      {
        label: "Contact Identity Id",
        value: identityID,
        transcriptFields: ["Contact_Identity_Id__c"]
      },
      {
        label: "First Name",
        transcriptFields: ["Contact_First_Name__c"]
      },
      {
        label: "Last Name",
        transcriptFields: ["Contact_Last_Name__c"]
      },
      {
        label: "Web Email",
        transcriptFields: ["Contact_Email__c"]
      }
    ],
    extraPrechatInfo: [
      {
        entityFieldMaps: [
          {
            doCreate: false,
            doFind: false,
            fieldName: "LastName",
            isExactMatch: true,
            label: "Last Name"
          },
          {
            doCreate: false,
            doFind: false,
            fieldName: "FirstName",
            isExactMatch: true,
            label: "First Name"
          },
          {
            doCreate: false,
            doFind: true,
            fieldName: "IdentityID__c",
            isExactMatch: true,
            label: "Identity ID"
          }
        ],
        entityName: "Contact"
      },
      {
        entityFieldMaps: [
          {
            doCreate: true,
            doFind: false,
            fieldName: "Origin_Channel__c",
            isExactMatch: true,
            label: "Origin Channel"
          }
        ],
        entityName: "Case"
      }
    ]
  };

  // tslint:disable-next-line:no-object-mutation
  liveChatAPI.settings = { ...liveChatAPI.settings, ...liveChatConfig };

  // Initialise live chat API in production
  //   liveChatAPI.init(
  //     "https://gnmtouchpoint.my.salesforce.com",
  //     "https://guardiansurveys.secure.force.com",
  //     gslbBaseUrl,
  //     "00D20000000nq5g",
  //     "Chat_Team",
  //     {
  //       baseLiveAgentContentURL:
  //         "https://c.la2-c2-cdg.salesforceliveagent.com/content",
  //       deploymentId: "5725I0000004RYv",
  //       buttonId: "5735I0000004Rj7",
  //       baseLiveAgentURL: "https://d.la2-c2-cdg.salesforceliveagent.com/chat",
  //       eswLiveAgentDevName:
  //         "EmbeddedServiceLiveAgent_Parent04I5I0000004LLTUA2_1797a9534a2",
  //       isOfflineSupportEnabled: false,
  //       myCustomClassname: "greenChat",
  //     }
  //   );

  // Initialise live chat API for DEV1 test sandbox
  liveChatAPI.init(
    "https://gnmtouchpoint--dev1.my.salesforce.com",
    "https://dev1-guardiansurveys.cs88.force.com",
    gslbBaseUrl,
    "00D9E0000004jvh",
    "Chat_Team",
    {
      baseLiveAgentContentURL:
        "https://c.la2-c1cs-fra.salesforceliveagent.com/content",
      deploymentId: "5729E000000CbOY",
      buttonId: "5739E0000008QCo",
      baseLiveAgentURL: "https://d.la2-c1cs-fra.salesforceliveagent.com/chat",
      eswLiveAgentDevName:
        "EmbeddedServiceLiveAgent_Parent04I9E0000008OxDUAU_1797a576c18",
      isOfflineSupportEnabled: false
    }
  );
};

const initLiveChat = (
  targetElement: HTMLElement,
  identityID: string,
  loginEmail: string
) => {
  if (!window.embedded_svc) {
    const liveChatScript = document.createElement("script");

    liveChatScript.setAttribute(
      "src",
      "https://gnmtouchpoint.my.salesforce.com/embeddedservice/5.0/esw.min.js"
    );

    // tslint:disable-next-line:no-object-mutation
    liveChatScript.onload = () => {
      initESW(null, window.embedded_svc, targetElement, identityID, loginEmail);
    };

    // tslint:disable-next-line:no-object-mutation
    liveChatScript.onerror = () => {
      // Perhaps the user is in an incognito session and the script loading has been blocked
    };

    document.body.appendChild(liveChatScript);
  } else {
    initESW(
      "https://service.force.com",
      window.embedded_svc,
      targetElement,
      identityID,
      loginEmail
    );
  }
};

export const LiveChat = () => {
  const liveChatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const queryString = window.location.search.slice(1);

    const liveChatRegex = new RegExp(`${liveChatParamName}.+?(?=\&|$)`, "g");
    const match = queryString.match(liveChatRegex);

    if (match) {
      const liveChatParamValue = match[0].split("=")[1];
      window.sessionStorage.setItem(liveChatParamName, liveChatParamValue);
    }

    if (
      window.sessionStorage.getItem(liveChatParamName) === "1" &&
      liveChatContainerRef.current
    ) {
      initLiveChat(
        liveChatContainerRef.current,
        window.guardian?.identityDetails.userId ?? "",
        window.guardian?.identityDetails.email ?? ""
      );
    }
  }, []);

  return <div ref={liveChatContainerRef} css={liveChatCss} />;
};

export const StartLiveChatButton = () => (
  <Button
    priority="secondary"
    onClick={() => window.embedded_svc.bootstrapEmbeddedService()}
  >
    Start live chat
  </Button>
);
