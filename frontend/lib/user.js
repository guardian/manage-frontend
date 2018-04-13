"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const main_1 = require("./components/main");
const element = react_1.default.createElement(main_1.Main, null,
    react_1.default.createElement("div", { css: { color: 'hotpink' } }, "Hello world!"));
// tslint:disable-next-line:no-expression-statement
react_dom_1.default.render(element, document.getElementById('root'));
