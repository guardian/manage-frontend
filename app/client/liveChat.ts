// <style type='text/css'>
//     .embeddedServiceHelpButton .helpButton .uiButton {
//         background-color: #005290;
//         font-family: "Arial", sans-serif;
//     }
//     .embeddedServiceHelpButton .helpButton .uiButton:focus {
//         outline: 1px solid #005290;
//     }
// </style>

// tslint:disable:variable-name
// tslint:disable:no-object-mutation
const initESW = (gslbBaseUrl: string | null, embedded_svc: any) => {
  embedded_svc.settings.displayHelpButton = true; // Or false
  embedded_svc.settings.language = ""; // For example, enter 'en' or 'en-US'

  // embedded_svc.settings.defaultMinimizedText = '...'; //(Defaults to Chat with an Expert)
  // embedded_svc.settings.disabledMinimizedText = '...'; //(Defaults to Agent Offline)

  // embedded_svc.settings.loadingText = ''; //(Defaults to Loading)
  // embedded_svc.settings.storageDomain = 'yourdomain.com'; //(Sets the domain for your deployment so that visitors can navigate subdomains during a chat session)

  // Settings for Chat
  // embedded_svc.settings.directToButtonRouting = function(prechatFormData) {
  // Dynamically changes the button ID based on what the visitor enters in the pre-chat form.
  // Returns a valid button ID.
  // };
  // embedded_svc.settings.prepopulatedPrechatFields = {}; //Sets the auto-population of pre-chat form fields
  // embedded_svc.settings.fallbackRouting = []; //An array of button IDs, user IDs, or userId_buttonId
  // embedded_svc.settings.offlineSupportMinimizedText = '...'; //(Defaults to Contact Us)

  embedded_svc.settings.enabledFeatures = ["LiveAgent"];
  embedded_svc.settings.entryFeature = "LiveAgent";

  embedded_svc.init(
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
    s.onload = () => {
      initESW(null, window.embedded_svc);
    };
    document.body.appendChild(s);
  } else {
    initESW("https://service.force.com", window.embedded_svc);
  }
};
