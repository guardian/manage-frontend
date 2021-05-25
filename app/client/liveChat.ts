// <style type='text/css'>
//     .embeddedServiceHelpButton .helpButton .uiButton {
//         background-color: #005290;
//         font-family: "Arial", sans-serif;
//     }
//     .embeddedServiceHelpButton .helpButton .uiButton:focus {
//         outline: 1px solid #005290;
//     }
// </style>

const initESW = (gslbBaseUrl: string | null, liveChatAPI: any) => {
  // tslint:disable-next-line:no-object-mutation
  liveChatAPI.settings.displayHelpButton = true; // Or false
  // tslint:disable-next-line:no-object-mutation
  liveChatAPI.settings.language = ""; // For example, enter 'en' or 'en-US'

  // liveChatAPI.settings.defaultMinimizedText = '...'; //(Defaults to Chat with an Expert)
  // liveChatAPI.settings.disabledMinimizedText = '...'; //(Defaults to Agent Offline)

  // liveChatAPI.settings.loadingText = ''; //(Defaults to Loading)
  // liveChatAPI.settings.storageDomain = 'yourdomain.com'; //(Sets the domain for your deployment so that visitors can navigate subdomains during a chat session)

  // Settings for Chat
  // liveChatAPI.settings.directToButtonRouting = function(prechatFormData) {
  // Dynamically changes the button ID based on what the visitor enters in the pre-chat form.
  // Returns a valid button ID.
  // };
  // liveChatAPI.settings.prepopulatedPrechatFields = {}; //Sets the auto-population of pre-chat form fields
  // liveChatAPI.settings.fallbackRouting = []; //An array of button IDs, user IDs, or userId_buttonId
  // liveChatAPI.settings.offlineSupportMinimizedText = '...'; //(Defaults to Contact Us)

  // tslint:disable-next-line:no-object-mutation
  liveChatAPI.settings.enabledFeatures = ["LiveAgent"];
  // tslint:disable-next-line:no-object-mutation
  liveChatAPI.settings.entryFeature = "LiveAgent";

  liveChatAPI.init(
    "https://gnmtouchpoint.my.salesforce.com",
    "https://guardiansurveys.secure.force.com",
    gslbBaseUrl,
    "00D20000000nq5g",
    "Chat_Team",
    {
      baseLiveAgentContentURL:
        "https://c.la2-c2-cdg.salesforceliveagent.com/content",
      deploymentId: "5725I0000004RYv",
      buttonId: "5735I0000004Rj7",
      baseLiveAgentURL: "https://d.la2-c2-cdg.salesforceliveagent.com/chat",
      eswLiveAgentDevName:
        "EmbeddedServiceLiveAgent_Parent04I5I0000004LLTUA2_1797a9534a2",
      isOfflineSupportEnabled: false
    }
  );
};

export const initLiveChat = () => {
  if (!window.embedded_svc) {
    const s = document.createElement("script");
    s.setAttribute(
      "src",
      "https://gnmtouchpoint.my.salesforce.com/embeddedservice/5.0/esw.min.js"
    );
    // tslint:disable-next-line:no-object-mutation
    s.onload = () => {
      initESW(null, window.embedded_svc);
    };
    document.body.appendChild(s);
  } else {
    initESW("https://service.force.com", window.embedded_svc);
  }
};
