"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const colours_1 = __importDefault(require("../colours"));
const grid_1 = require("./grid");
exports.Main = ({ children }) => {
    return react_1.default.createElement("div", { css: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            alignItems: 'stretch',
            width: '100%'
        } },
        react_1.default.createElement("header", { css: {
                backgroundColor: colours_1.default.neutral.header,
                height: '100px',
                color: colours_1.default.neutral["1"],
            } }, "this is the header"),
        react_1.default.createElement("main", { css: { flex: '1' } }, children),
        react_1.default.createElement("footer", { css: {
                backgroundColor: colours_1.default.neutral["1"],
                color: colours_1.default.neutral["7"],
            } },
            react_1.default.createElement(grid_1.Container, null,
                react_1.default.createElement("div", null,
                    react_1.default.createElement("h1", null, "this is the footer")),
                react_1.default.createElement("div", null,
                    react_1.default.createElement("h1", { css: {
                            color: colours_1.default.yellow.medium
                        } }, "this is the fake footer")))));
};
