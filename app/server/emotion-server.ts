import createEmotionServer from "create-emotion-server";
import * as emotion from "../client/styles/emotion";

export const {
  extractCritical,
  renderStylesToString,
  renderStylesToNodeStream
} = createEmotionServer(emotion);
