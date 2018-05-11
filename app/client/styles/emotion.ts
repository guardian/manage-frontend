import createEmotion from "create-emotion";
import pxToRem from "stylis-pxtorem";
const context = typeof global !== "undefined" ? global : {};

export const {
  flush,
  hydrate,
  cx,
  merge,
  getRegisteredStyles,
  injectGlobal,
  keyframes,
  css,
  sheet,
  caches
} = createEmotion(context, {
  stylisPlugins: pxToRem({
    propList: ["*"]
  })
});
