"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.namedBreakpoints = {
    mobile: 320,
    mobileMedium: 360,
    mobileLandscape: 480,
    phablet: 660,
    tablet: 740,
    desktop: 980,
    leftCol: 1140,
    wide: 1300,
};
exports.queries = {
    minWidth: (from) => `@media (min-width: ${`${from}px`})`,
    maxWidth: (until) => `@media (max-width: ${`${until - 1}px`})`,
    minWidthMaxWidth: (from, until) => `@media (min-width: ${`${from}px`}) and (max-width: ${`${until - 1}px`})`
};
const mapBreakpointValues = (bs, f) => ({
    mobile: f(bs.mobile),
    mobileMedium: f(bs.mobileMedium),
    mobileLandscape: f(bs.mobileLandscape),
    phablet: f(bs.phablet),
    tablet: f(bs.tablet),
    desktop: f(bs.desktop),
    leftCol: f(bs.leftCol),
    wide: f(bs.wide)
});
exports.minWidth = mapBreakpointValues(exports.namedBreakpoints, exports.queries.minWidth);
exports.maxWidth = mapBreakpointValues(exports.namedBreakpoints, exports.queries.maxWidth);
