declare module "stylis-pxtorem" {
  //Pull this out into the plugin.
  type StylisPlugin = (
    context: number,
    content: string,
    selectors: [string],
    parent: [string],
    line: number,
    column: number,
    length: number
  ) => string | void;

  function pxToRemPlugin(options: {
    rootValue?: number;
    unitPrecision?: number;
    propList?: [string];
    selectorBlackList?: [string];
    replace?: boolean;
    mediaQuery?: boolean;
    minPixelValue?: number;
  }): StylisPlugin;
  export = pxToRemPlugin;
}
