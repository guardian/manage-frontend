"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const breakpoints_1 = require("./breakpoints");
const gutter = 20;
const baseline = 12;
const width = 60;
const rowHeight = 36;
exports.calculateWidth = (n) => n * width + (n - 1) * gutter;
exports.calculateHeight = (n) => n * rowHeight + (n - 1) * baseline;
exports.span = (n) => ({
    width: `${exports.calculateWidth(n)}px`
});
exports.spanBreakpoints = (bs, qs = breakpoints_1.minWidth) => {
    return Object.entries(bs).map(([k, v]) => {
        if (k in qs && v) {
            let q = qs[k];
            let w = exports.span(v);
            return ({ [q]: w });
        }
        return {};
    }).reduce((a, c) => ({ ...a, ...c }), {});
};
exports.cell = {
    flex: '1',
    display: 'flex',
    padding: `${gutter}px 0 0 ${gutter}px`
};
exports.row = {
    padding: `-${gutter}px 0 0 -${gutter}px`,
    display: 'flex',
    margin: 'auto'
};
