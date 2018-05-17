import createEmotion from "create-emotion";
import pxToRem from "stylis-pxtorem";
const context = typeof global !== "undefined" ? global : {};

import {
  _Interpolation1,
  _Interpolation2,
  CreateStyles,
  Interpolation,
  StyleSheet
} from "emotion";
export {
  _Interpolation1,
  _Interpolation2,
  CreateStyles,
  Interpolation,
  StyleSheet
} from "emotion";

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
