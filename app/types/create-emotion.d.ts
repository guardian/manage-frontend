declare module "create-emotion" {
  import {
    Interpolation,
    _Interpolation1,
    _Interpolation2,
    CreateStyles,
    StyleSheet
  } from "emotion";
  type StylisPlugin = (
    context: number,
    content: string,
    selectors: [string],
    parent: [string],
    line: number,
    column: number,
    length: number
  ) => string | void;
  export type Emotion = {
    flush: void;
    hydrate: (ids: string[]) => void;
    cx: (...interpolations: Interpolation[]) => string;
    merge: (className: string, sourceMap: string | null) => string;
    getRegisteredStyles: (
      registeredStyles: string[],
      classNames: string
    ) => string;
    injectGlobal: CreateStyles<void>;
    keyframes: CreateStyles<string>;
    css: CreateStyles<string>;
    sheet: StyleSheet;
    caches: {
      registered: { [key: string]: string };
      inserted: { [key: string]: string | true };
      nonce?: string;
      key: string;
    };
  };

  function create(
    context: {},
    options: {
      nonce?: string;
      stylisPlugins?: StylisPlugin | [StylisPlugin];
      prefix?:
        | boolean
        | ((key: string, value: string, context: 1 | 2 | 3) => boolean);
      key?: string;
      container?: HTMLElement;
    }
  ): Emotion;

  export default create;
}
