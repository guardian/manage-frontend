"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const breakpoints_1 = require("../styles/breakpoints");
const grid_1 = require("../styles/grid");
exports.Container = ({ children }) => react_1.default.createElement("div", { css: {
        position: 'relative',
        margin: 'auto',
        ...grid_1.spanBreakpoints({ mobile: 1, wide: 10 }, breakpoints_1.minWidth),
        ...grid_1.row,
        ['&>*']: grid_1.cell
    } }, children);
