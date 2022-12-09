/*
const liveChatParamName = "liveChat";

export const isLiveChatFeatureEnabled = () => {
  const queryString = window.location.search.slice(1);
  const liveChatRegex = new RegExp(`${liveChatParamName}=[0,1]`, "g");
  const match = queryString.match(liveChatRegex);

  if (match) {
    setLiveChatSessionStorage(match);
  }

  return window.sessionStorage.getItem(liveChatParamName) === "1";
};

const setLiveChatSessionStorage = (queryStringMatch: string[]) => {
  const liveChatParamValue = queryStringMatch[0].split("=")[1];
  window.sessionStorage.setItem(liveChatParamName, liveChatParamValue);
};
*/

export const isLiveChatFeatureEnabled = () => true;
export const isArticleLiveChatFeatureEnabled = () => true;
