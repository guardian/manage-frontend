declare module "create-emotion-server" {
  import {
    Interpolation,
    _Interpolation1,
    _Interpolation2,
    CreateStyles,
    StyleSheet
  } from "emotion";
  import { Readable, Writable } from "stream";

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

  export default function(
    emotion: Emotion
  ): {
    extractCritical: { html: string; ids: [string]; css: string };
    renderStylesToString: (_: string) => string;
    renderStylesToNodeStream: (_: Readable) => Writable;
  };
}

//TODO create a proper @types/create-emotion-server (for the benefit of the wider community)
