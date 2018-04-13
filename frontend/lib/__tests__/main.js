"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_testing_library_1 = require("react-testing-library");
// this add custom expect matchers from dom-testing-library
require("dom-testing-library/extend-expect");
const main_1 = require("../components/main");
test('Main renders something', () => {
    let rendered = react_testing_library_1.render(react_1.default.createElement(main_1.Main, null,
        react_1.default.createElement("p", null, "hi")));
    expect(rendered.container.firstChild).toMatchSnapshot();
});
