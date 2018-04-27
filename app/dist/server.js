/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/server.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/colours.ts":
/*!***************************!*\
  !*** ./client/colours.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// colours from guui
var palette = {
  red: {
    light: "#ff4e36",
    medium: "#c70000",
    dark: "#ad0006"
  },
  orange: {
    light: "#f5be2c",
    medium: "#ff7f0f",
    dark: "#ed6300"
  },
  blue: {
    light: "#00b2ff",
    medium: "#0084c6",
    dark: "#005689"
  },
  gold: {
    light: "#eacca0",
    medium: "#ab8958",
    dark: "#6b5840"
  },
  pink: {
    light: "#ffabdb",
    medium: "#bb3b80",
    dark: "#7d0068"
  },
  yellow: {
    medium: "#ffe500",
    dark: "#edd600"
  },
  neutral: {
    header: "#e9eff1",
    "1": "#121212",
    "2": "#333333",
    "3": "#767676",
    "4": "#999999",
    "5": "#dcdcdc",
    "6": "#ececec",
    "7": "#f6f6f6"
  }
};
var _default = palette;
exports.default = _default;

/***/ }),

/***/ "./client/components/grid.tsx":
/*!************************************!*\
  !*** ./client/components/grid.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Container = void 0;

var _emotion = __webpack_require__(/*! emotion */ "emotion");

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _breakpoints = __webpack_require__(/*! ../styles/breakpoints */ "./client/styles/breakpoints.ts");

var _grid = __webpack_require__(/*! ../styles/grid */ "./client/styles/grid.ts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Container = function Container(_ref) {
  var children = _ref.children;
  return _react.default.createElement("div", {
    className: (0, _emotion.css)(_objectSpread({
      position: 'relative',
      margin: 'auto'
    }, (0, _grid.spanBreakpoints)({
      mobile: 1,
      wide: 10
    }, _breakpoints.minWidth), _grid.row, _defineProperty({}, '&>*', _grid.cell)), "\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC9jb21wb25lbnRzL2dyaWQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVEwRSIsImZpbGUiOiJjbGllbnQvY29tcG9uZW50cy9ncmlkLnRzeCIsInNvdXJjZVJvb3QiOiIvVXNlcnMvYWxleF93YXJlL2NvZGUvYWNjb3VudC1mcm9udGVuZC9hcHAiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgLCBjeH0gZnJvbSAnZW1vdGlvbidcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBtaW5XaWR0aCB9IGZyb20gJy4uL3N0eWxlcy9icmVha3BvaW50cyc7XG5pbXBvcnQgeyBjZWxsLCByb3csIHNwYW5CcmVha3BvaW50cyB9IGZyb20gJy4uL3N0eWxlcy9ncmlkJztcbiBleHBvcnQgaW50ZXJmYWNlIENvbnRhaW5lclByb3BzIHtcbiAgcmVhZG9ubHkgY2hpbGRyZW46IFJlYWRvbmx5QXJyYXk8SlNYLkVsZW1lbnQ+IHwgSlNYLkVsZW1lbnRcbn1cblxuZXhwb3J0IGNvbnN0IENvbnRhaW5lciA6IFJlYWN0LlNGQzxDb250YWluZXJQcm9wcz4gPSAoe2NoaWxkcmVufSkgPT4gPGRpdiBjc3M9e3tcbiAgICBwb3NpdGlvbjoncmVsYXRpdmUnLFxuICAgIG1hcmdpbjonYXV0bycsXG4gICAgLi4uc3BhbkJyZWFrcG9pbnRzKHttb2JpbGU6MSx3aWRlOjEwfSxtaW5XaWR0aCksXG4gICAgLi4ucm93LFxuICAgIFsnJj4qJ106Y2VsbFxuICB9fT5cbiAge2NoaWxkcmVufVxuICA8L2Rpdj5cbiJdfQ== */")
  }, children);
};

exports.Container = Container;

/***/ }),

/***/ "./client/components/main.tsx":
/*!************************************!*\
  !*** ./client/components/main.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Main = void 0;

var _emotion = __webpack_require__(/*! emotion */ "emotion");

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _colours = _interopRequireDefault(__webpack_require__(/*! ../colours */ "./client/colours.ts"));

var _grid = __webpack_require__(/*! ./grid */ "./client/components/grid.tsx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Main = function Main(_ref) {
  var children = _ref.children;
  return _react.default.createElement("div", {
    className: (0, _emotion.css)({
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      alignItems: 'stretch',
      width: '100%'
    }, "\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC9jb21wb25lbnRzL21haW4udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVdjIiwiZmlsZSI6ImNsaWVudC9jb21wb25lbnRzL21haW4udHN4Iiwic291cmNlUm9vdCI6Ii9Vc2Vycy9hbGV4X3dhcmUvY29kZS9hY2NvdW50LWZyb250ZW5kL2FwcCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gJ2Vtb3Rpb24nXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHBhbGV0dGUgZnJvbSAnLi4vY29sb3VycydcbmltcG9ydCB7IGNlbGwgfSBmcm9tICcuLi9zdHlsZXMvZ3JpZCc7XG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICcuL2dyaWQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1haW5Qcm9wcyB7XG4gIHJlYWRvbmx5IGNoaWxkcmVuOiBSZWFkb25seUFycmF5PEpTWC5FbGVtZW50PiB8IEpTWC5FbGVtZW50XG59XG5cbmV4cG9ydCBjb25zdCBNYWluOiBSZWFjdC5TRkM8TWFpblByb3BzPiA9ICh7IGNoaWxkcmVuIH0pID0+IHtcbiAgcmV0dXJuIDxkaXYgY3NzPXt7XG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgIG1pbkhlaWdodDogJzEwMHZoJyxcbiAgICBhbGlnbkl0ZW1zOiAnc3RyZXRjaCcsXG4gICAgd2lkdGg6ICcxMDAlJ1xuICB9fT5cbiAgICA8aGVhZGVyIGNzcz17e1xuICAgICAgYmFja2dyb3VuZENvbG9yOiBwYWxldHRlLm5ldXRyYWwuaGVhZGVyLFxuICAgICAgaGVpZ2h0OiAnMTAwcHgnLFxuICAgICAgY29sb3I6IHBhbGV0dGUubmV1dHJhbFtcIjFcIl0sXG4gICAgfX0+dGhpcyBpcyB0aGUgaGVhZGVyPC9oZWFkZXI+XG4gICAgPG1haW4gY3NzPXt7IGZsZXg6ICcxJyB9fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L21haW4+XG4gICAgPGZvb3RlciBjc3M9e3tcbiAgICAgIGJhY2tncm91bmRDb2xvcjogIHBhbGV0dGUubmV1dHJhbFtcIjFcIl0sXG4gICAgICBjb2xvcjogIHBhbGV0dGUubmV1dHJhbFtcIjdcIl0sXG4gICAgfX0+PENvbnRhaW5lcj5cbiAgICAgIDxkaXY+PGgxPnRoaXMgaXMgdGhlIGZvb3RlcjwvaDE+PC9kaXY+XG4gICAgICA8ZGl2PjxoMSBjc3M9e3tcbiAgICAgICAgY29sb3I6IHBhbGV0dGUueWVsbG93Lm1lZGl1bVxuICAgICAgfX0+dGhpcyBpcyB0aGUgZmFrZSBmb290ZXI8L2gxPjwvZGl2PlxuICAgICAgPC9Db250YWluZXI+PC9mb290ZXI+XG4gIDwvZGl2PlxufVxuIl19 */")
  }, _react.default.createElement("header", {
    className: (0, _emotion.css)({
      backgroundColor: _colours.default.neutral.header,
      height: '100px',
      color: _colours.default.neutral["1"]
    }, "\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC9jb21wb25lbnRzL21haW4udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtCWSIsImZpbGUiOiJjbGllbnQvY29tcG9uZW50cy9tYWluLnRzeCIsInNvdXJjZVJvb3QiOiIvVXNlcnMvYWxleF93YXJlL2NvZGUvYWNjb3VudC1mcm9udGVuZC9hcHAiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tICdlbW90aW9uJ1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBwYWxldHRlIGZyb20gJy4uL2NvbG91cnMnXG5pbXBvcnQgeyBjZWxsIH0gZnJvbSAnLi4vc3R5bGVzL2dyaWQnO1xuaW1wb3J0IHsgQ29udGFpbmVyIH0gZnJvbSAnLi9ncmlkJztcblxuZXhwb3J0IGludGVyZmFjZSBNYWluUHJvcHMge1xuICByZWFkb25seSBjaGlsZHJlbjogUmVhZG9ubHlBcnJheTxKU1guRWxlbWVudD4gfCBKU1guRWxlbWVudFxufVxuXG5leHBvcnQgY29uc3QgTWFpbjogUmVhY3QuU0ZDPE1haW5Qcm9wcz4gPSAoeyBjaGlsZHJlbiB9KSA9PiB7XG4gIHJldHVybiA8ZGl2IGNzcz17e1xuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICBtaW5IZWlnaHQ6ICcxMDB2aCcsXG4gICAgYWxpZ25JdGVtczogJ3N0cmV0Y2gnLFxuICAgIHdpZHRoOiAnMTAwJSdcbiAgfX0+XG4gICAgPGhlYWRlciBjc3M9e3tcbiAgICAgIGJhY2tncm91bmRDb2xvcjogcGFsZXR0ZS5uZXV0cmFsLmhlYWRlcixcbiAgICAgIGhlaWdodDogJzEwMHB4JyxcbiAgICAgIGNvbG9yOiBwYWxldHRlLm5ldXRyYWxbXCIxXCJdLFxuICAgIH19PnRoaXMgaXMgdGhlIGhlYWRlcjwvaGVhZGVyPlxuICAgIDxtYWluIGNzcz17eyBmbGV4OiAnMScgfX0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9tYWluPlxuICAgIDxmb290ZXIgY3NzPXt7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICBwYWxldHRlLm5ldXRyYWxbXCIxXCJdLFxuICAgICAgY29sb3I6ICBwYWxldHRlLm5ldXRyYWxbXCI3XCJdLFxuICAgIH19PjxDb250YWluZXI+XG4gICAgICA8ZGl2PjxoMT50aGlzIGlzIHRoZSBmb290ZXI8L2gxPjwvZGl2PlxuICAgICAgPGRpdj48aDEgY3NzPXt7XG4gICAgICAgIGNvbG9yOiBwYWxldHRlLnllbGxvdy5tZWRpdW1cbiAgICAgIH19PnRoaXMgaXMgdGhlIGZha2UgZm9vdGVyPC9oMT48L2Rpdj5cbiAgICAgIDwvQ29udGFpbmVyPjwvZm9vdGVyPlxuICA8L2Rpdj5cbn1cbiJdfQ== */")
  }, "this is the header"), _react.default.createElement("main", {
    className: (0, _emotion.css)({
      flex: '1'
    }, "\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC9jb21wb25lbnRzL21haW4udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVCVSIsImZpbGUiOiJjbGllbnQvY29tcG9uZW50cy9tYWluLnRzeCIsInNvdXJjZVJvb3QiOiIvVXNlcnMvYWxleF93YXJlL2NvZGUvYWNjb3VudC1mcm9udGVuZC9hcHAiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tICdlbW90aW9uJ1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBwYWxldHRlIGZyb20gJy4uL2NvbG91cnMnXG5pbXBvcnQgeyBjZWxsIH0gZnJvbSAnLi4vc3R5bGVzL2dyaWQnO1xuaW1wb3J0IHsgQ29udGFpbmVyIH0gZnJvbSAnLi9ncmlkJztcblxuZXhwb3J0IGludGVyZmFjZSBNYWluUHJvcHMge1xuICByZWFkb25seSBjaGlsZHJlbjogUmVhZG9ubHlBcnJheTxKU1guRWxlbWVudD4gfCBKU1guRWxlbWVudFxufVxuXG5leHBvcnQgY29uc3QgTWFpbjogUmVhY3QuU0ZDPE1haW5Qcm9wcz4gPSAoeyBjaGlsZHJlbiB9KSA9PiB7XG4gIHJldHVybiA8ZGl2IGNzcz17e1xuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICBtaW5IZWlnaHQ6ICcxMDB2aCcsXG4gICAgYWxpZ25JdGVtczogJ3N0cmV0Y2gnLFxuICAgIHdpZHRoOiAnMTAwJSdcbiAgfX0+XG4gICAgPGhlYWRlciBjc3M9e3tcbiAgICAgIGJhY2tncm91bmRDb2xvcjogcGFsZXR0ZS5uZXV0cmFsLmhlYWRlcixcbiAgICAgIGhlaWdodDogJzEwMHB4JyxcbiAgICAgIGNvbG9yOiBwYWxldHRlLm5ldXRyYWxbXCIxXCJdLFxuICAgIH19PnRoaXMgaXMgdGhlIGhlYWRlcjwvaGVhZGVyPlxuICAgIDxtYWluIGNzcz17eyBmbGV4OiAnMScgfX0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9tYWluPlxuICAgIDxmb290ZXIgY3NzPXt7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICBwYWxldHRlLm5ldXRyYWxbXCIxXCJdLFxuICAgICAgY29sb3I6ICBwYWxldHRlLm5ldXRyYWxbXCI3XCJdLFxuICAgIH19PjxDb250YWluZXI+XG4gICAgICA8ZGl2PjxoMT50aGlzIGlzIHRoZSBmb290ZXI8L2gxPjwvZGl2PlxuICAgICAgPGRpdj48aDEgY3NzPXt7XG4gICAgICAgIGNvbG9yOiBwYWxldHRlLnllbGxvdy5tZWRpdW1cbiAgICAgIH19PnRoaXMgaXMgdGhlIGZha2UgZm9vdGVyPC9oMT48L2Rpdj5cbiAgICAgIDwvQ29udGFpbmVyPjwvZm9vdGVyPlxuICA8L2Rpdj5cbn1cbiJdfQ== */")
  }, children), _react.default.createElement("footer", {
    className: (0, _emotion.css)({
      backgroundColor: _colours.default.neutral["1"],
      color: _colours.default.neutral["7"]
    }, "\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC9jb21wb25lbnRzL21haW4udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTBCWSIsImZpbGUiOiJjbGllbnQvY29tcG9uZW50cy9tYWluLnRzeCIsInNvdXJjZVJvb3QiOiIvVXNlcnMvYWxleF93YXJlL2NvZGUvYWNjb3VudC1mcm9udGVuZC9hcHAiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tICdlbW90aW9uJ1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBwYWxldHRlIGZyb20gJy4uL2NvbG91cnMnXG5pbXBvcnQgeyBjZWxsIH0gZnJvbSAnLi4vc3R5bGVzL2dyaWQnO1xuaW1wb3J0IHsgQ29udGFpbmVyIH0gZnJvbSAnLi9ncmlkJztcblxuZXhwb3J0IGludGVyZmFjZSBNYWluUHJvcHMge1xuICByZWFkb25seSBjaGlsZHJlbjogUmVhZG9ubHlBcnJheTxKU1guRWxlbWVudD4gfCBKU1guRWxlbWVudFxufVxuXG5leHBvcnQgY29uc3QgTWFpbjogUmVhY3QuU0ZDPE1haW5Qcm9wcz4gPSAoeyBjaGlsZHJlbiB9KSA9PiB7XG4gIHJldHVybiA8ZGl2IGNzcz17e1xuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICBtaW5IZWlnaHQ6ICcxMDB2aCcsXG4gICAgYWxpZ25JdGVtczogJ3N0cmV0Y2gnLFxuICAgIHdpZHRoOiAnMTAwJSdcbiAgfX0+XG4gICAgPGhlYWRlciBjc3M9e3tcbiAgICAgIGJhY2tncm91bmRDb2xvcjogcGFsZXR0ZS5uZXV0cmFsLmhlYWRlcixcbiAgICAgIGhlaWdodDogJzEwMHB4JyxcbiAgICAgIGNvbG9yOiBwYWxldHRlLm5ldXRyYWxbXCIxXCJdLFxuICAgIH19PnRoaXMgaXMgdGhlIGhlYWRlcjwvaGVhZGVyPlxuICAgIDxtYWluIGNzcz17eyBmbGV4OiAnMScgfX0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9tYWluPlxuICAgIDxmb290ZXIgY3NzPXt7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICBwYWxldHRlLm5ldXRyYWxbXCIxXCJdLFxuICAgICAgY29sb3I6ICBwYWxldHRlLm5ldXRyYWxbXCI3XCJdLFxuICAgIH19PjxDb250YWluZXI+XG4gICAgICA8ZGl2PjxoMT50aGlzIGlzIHRoZSBmb290ZXI8L2gxPjwvZGl2PlxuICAgICAgPGRpdj48aDEgY3NzPXt7XG4gICAgICAgIGNvbG9yOiBwYWxldHRlLnllbGxvdy5tZWRpdW1cbiAgICAgIH19PnRoaXMgaXMgdGhlIGZha2UgZm9vdGVyPC9oMT48L2Rpdj5cbiAgICAgIDwvQ29udGFpbmVyPjwvZm9vdGVyPlxuICA8L2Rpdj5cbn1cbiJdfQ== */")
  }, _react.default.createElement(_grid.Container, null, _react.default.createElement("div", null, _react.default.createElement("h1", null, "this is the footer")), _react.default.createElement("div", null, _react.default.createElement("h1", {
    className: (0, _emotion.css)({
      color: _colours.default.yellow.medium
    }, "\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC9jb21wb25lbnRzL21haW4udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQStCZSIsImZpbGUiOiJjbGllbnQvY29tcG9uZW50cy9tYWluLnRzeCIsInNvdXJjZVJvb3QiOiIvVXNlcnMvYWxleF93YXJlL2NvZGUvYWNjb3VudC1mcm9udGVuZC9hcHAiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tICdlbW90aW9uJ1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBwYWxldHRlIGZyb20gJy4uL2NvbG91cnMnXG5pbXBvcnQgeyBjZWxsIH0gZnJvbSAnLi4vc3R5bGVzL2dyaWQnO1xuaW1wb3J0IHsgQ29udGFpbmVyIH0gZnJvbSAnLi9ncmlkJztcblxuZXhwb3J0IGludGVyZmFjZSBNYWluUHJvcHMge1xuICByZWFkb25seSBjaGlsZHJlbjogUmVhZG9ubHlBcnJheTxKU1guRWxlbWVudD4gfCBKU1guRWxlbWVudFxufVxuXG5leHBvcnQgY29uc3QgTWFpbjogUmVhY3QuU0ZDPE1haW5Qcm9wcz4gPSAoeyBjaGlsZHJlbiB9KSA9PiB7XG4gIHJldHVybiA8ZGl2IGNzcz17e1xuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICBtaW5IZWlnaHQ6ICcxMDB2aCcsXG4gICAgYWxpZ25JdGVtczogJ3N0cmV0Y2gnLFxuICAgIHdpZHRoOiAnMTAwJSdcbiAgfX0+XG4gICAgPGhlYWRlciBjc3M9e3tcbiAgICAgIGJhY2tncm91bmRDb2xvcjogcGFsZXR0ZS5uZXV0cmFsLmhlYWRlcixcbiAgICAgIGhlaWdodDogJzEwMHB4JyxcbiAgICAgIGNvbG9yOiBwYWxldHRlLm5ldXRyYWxbXCIxXCJdLFxuICAgIH19PnRoaXMgaXMgdGhlIGhlYWRlcjwvaGVhZGVyPlxuICAgIDxtYWluIGNzcz17eyBmbGV4OiAnMScgfX0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9tYWluPlxuICAgIDxmb290ZXIgY3NzPXt7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICBwYWxldHRlLm5ldXRyYWxbXCIxXCJdLFxuICAgICAgY29sb3I6ICBwYWxldHRlLm5ldXRyYWxbXCI3XCJdLFxuICAgIH19PjxDb250YWluZXI+XG4gICAgICA8ZGl2PjxoMT50aGlzIGlzIHRoZSBmb290ZXI8L2gxPjwvZGl2PlxuICAgICAgPGRpdj48aDEgY3NzPXt7XG4gICAgICAgIGNvbG9yOiBwYWxldHRlLnllbGxvdy5tZWRpdW1cbiAgICAgIH19PnRoaXMgaXMgdGhlIGZha2UgZm9vdGVyPC9oMT48L2Rpdj5cbiAgICAgIDwvQ29udGFpbmVyPjwvZm9vdGVyPlxuICA8L2Rpdj5cbn1cbiJdfQ== */")
  }, "this is the fake footer")))));
};

exports.Main = Main;

/***/ }),

/***/ "./client/components/user.tsx":
/*!************************************!*\
  !*** ./client/components/user.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _emotion = __webpack_require__(/*! emotion */ "emotion");

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _main = __webpack_require__(/*! ./main */ "./client/components/main.tsx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _react.default.createElement(_main.Main, null, _react.default.createElement("div", {
  className: (0, _emotion.css)({
    color: "hotpink"
  }, "\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC9jb21wb25lbnRzL3VzZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1TIiwiZmlsZSI6ImNsaWVudC9jb21wb25lbnRzL3VzZXIudHN4Iiwic291cmNlUm9vdCI6Ii9Vc2Vycy9hbGV4X3dhcmUvY29kZS9hY2NvdW50LWZyb250ZW5kL2FwcCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gXCJlbW90aW9uXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBNYWluIH0gZnJvbSBcIi4vbWFpblwiO1xuXG5jb25zdCBVc2VyID0gKFxuICA8TWFpbj5cbiAgICA8ZGl2IGNzcz17eyBjb2xvcjogXCJob3RwaW5rXCIgfX0+SGVsbG8gd29ybGQhPC9kaXY+XG4gIDwvTWFpbj5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IFVzZXI7XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1leHByZXNzaW9uLXN0YXRlbWVudFxuLy8gUmVhY3RET00ucmVuZGVyKGVsZW1lbnQsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykpO1xuIl19 */")
}, "Hello world!"));

var _default = User; // tslint:disable-next-line:no-expression-statement
// ReactDOM.render(element, document.getElementById('root'));

exports.default = _default;

/***/ }),

/***/ "./client/styles/breakpoints.ts":
/*!**************************************!*\
  !*** ./client/styles/breakpoints.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maxWidth = exports.minWidth = exports.queries = exports.namedBreakpoints = void 0;
var namedBreakpoints = {
  mobile: 320,
  mobileMedium: 360,
  mobileLandscape: 480,
  phablet: 660,
  tablet: 740,
  desktop: 980,
  leftCol: 1140,
  wide: 1300
};
exports.namedBreakpoints = namedBreakpoints;
var queries = {
  minWidth: function minWidth(from) {
    return "@media (min-width: ".concat("".concat(from, "px"), ")");
  },
  maxWidth: function maxWidth(until) {
    return "@media (max-width: ".concat("".concat(until - 1, "px"), ")");
  },
  minWidthMaxWidth: function minWidthMaxWidth(from, until) {
    return "@media (min-width: ".concat("".concat(from, "px"), ") and (max-width: ", "".concat(until - 1, "px"), ")");
  }
};
exports.queries = queries;

var mapBreakpointValues = function mapBreakpointValues(bs, f) {
  return {
    mobile: f(bs.mobile),
    mobileMedium: f(bs.mobileMedium),
    mobileLandscape: f(bs.mobileLandscape),
    phablet: f(bs.phablet),
    tablet: f(bs.tablet),
    desktop: f(bs.desktop),
    leftCol: f(bs.leftCol),
    wide: f(bs.wide)
  };
};

var minWidth = mapBreakpointValues(namedBreakpoints, queries.minWidth);
exports.minWidth = minWidth;
var maxWidth = mapBreakpointValues(namedBreakpoints, queries.maxWidth);
exports.maxWidth = maxWidth;

/***/ }),

/***/ "./client/styles/grid.ts":
/*!*******************************!*\
  !*** ./client/styles/grid.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.row = exports.cell = exports.spanBreakpoints = exports.span = exports.calculateHeight = exports.calculateWidth = void 0;

var _breakpoints = __webpack_require__(/*! ./breakpoints */ "./client/styles/breakpoints.ts");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var gutter = 20;
var baseline = 12;
var width = 60;
var rowHeight = 36;

var calculateWidth = function calculateWidth(n) {
  return n * width + (n - 1) * gutter;
};

exports.calculateWidth = calculateWidth;

var calculateHeight = function calculateHeight(n) {
  return n * rowHeight + (n - 1) * baseline;
};

exports.calculateHeight = calculateHeight;

var span = function span(n) {
  return {
    width: "".concat(calculateWidth(n), "px")
  };
};

exports.span = span;

var spanBreakpoints = function spanBreakpoints(breakpoints) {
  var mqs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _breakpoints.minWidth;
  var bs = breakpoints;
  var qs = mqs;
  return Object.entries(bs).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    return k in qs && v ? _defineProperty({}, qs[k], span(v)) : {};
  }).reduce(function (a, c) {
    return _objectSpread({}, a, c);
  }, {});
};

exports.spanBreakpoints = spanBreakpoints;
var cell = {
  flex: '1',
  display: 'flex',
  padding: "".concat(gutter, "px 0 0 ").concat(gutter, "px")
};
exports.cell = cell;
var row = {
  padding: "-".concat(gutter, "px 0 0 -").concat(gutter, "px"),
  display: 'flex',
  margin: 'auto'
};
exports.row = row;

/***/ }),

/***/ "./server/html.ts":
/*!************************!*\
  !*** ./server/html.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * https://medium.com/styled-components/the-simple-guide-to-server-side-rendering-react-with-styled-components-d31c6b2b8fbf
 * Html
 * This Html.js file acts as a template that we insert all our generated
 * application code into before sending it to the client as regular HTML.
 * Note we're returning a template string from this function.
 */
var html = function html(_ref) {
  var body = _ref.body,
      title = _ref.title,
      src = _ref.src;
  return "\n  <!DOCTYPE html>\n  <html>\n    <head>\n      <title>".concat(title, "</title>\n    </head>\n    <body style=\"margin:0\">\n      <div id=\"app\">").concat(body, "</div>\n      <script src=\"").concat(src, "\"></script>\n    </body>\n  </html>\n");
};

var _default = html;
exports.default = _default;

/***/ }),

/***/ "./server/server.ts":
/*!**************************!*\
  !*** ./server/server.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = _interopRequireDefault(__webpack_require__(/*! express */ "express"));

var _server = __webpack_require__(/*! react-dom/server */ "react-dom/server");

var _user = _interopRequireDefault(__webpack_require__(/*! ../client/components/user */ "./client/components/user.tsx"));

var _html = _interopRequireDefault(__webpack_require__(/*! ./html */ "./server/html.ts"));

var _emotionServer = __webpack_require__(/*! emotion-server */ "emotion-server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = 9233;
var server = (0, _express.default)();
server.use("/static", _express.default.static("dist/static"));
server.get("/", function (req, res) {
  /**
   * renderToString() will take our React app and turn it into a string
   * to be inserted into our Html template function.
   */
  var body = (0, _emotionServer.renderStylesToString)((0, _server.renderToString)(_user.default));
  var title = "Server side Rendering with Styled Components";
  var src = "static/user.js";
  res.send((0, _html.default)({
    body: body,
    title: title,
    src: src
  }));
});
server.listen(port);
console.log("Serving at http://localhost:".concat(port));

/***/ }),

/***/ "emotion":
/*!**************************!*\
  !*** external "emotion" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("emotion");

/***/ }),

/***/ "emotion-server":
/*!*********************************!*\
  !*** external "emotion-server" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("emotion-server");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbG91cnMudHMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvZ3JpZC50c3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvbWFpbi50c3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvdXNlci50c3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3N0eWxlcy9icmVha3BvaW50cy50cyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3R5bGVzL2dyaWQudHMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2h0bWwudHMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3NlcnZlci50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbW90aW9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZW1vdGlvbi1zZXJ2ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1kb20vc2VydmVyXCIiXSwibmFtZXMiOlsicGFsZXR0ZSIsInJlZCIsImxpZ2h0IiwibWVkaXVtIiwiZGFyayIsIm9yYW5nZSIsImJsdWUiLCJnb2xkIiwicGluayIsInllbGxvdyIsIm5ldXRyYWwiLCJoZWFkZXIiLCJDb250YWluZXIiLCJjaGlsZHJlbiIsInBvc2l0aW9uIiwibWFyZ2luIiwibW9iaWxlIiwid2lkZSIsIm1pbldpZHRoIiwicm93IiwiY2VsbCIsIk1haW4iLCJkaXNwbGF5IiwiZmxleERpcmVjdGlvbiIsIm1pbkhlaWdodCIsImFsaWduSXRlbXMiLCJ3aWR0aCIsImJhY2tncm91bmRDb2xvciIsImhlaWdodCIsImNvbG9yIiwiZmxleCIsIlVzZXIiLCJuYW1lZEJyZWFrcG9pbnRzIiwibW9iaWxlTWVkaXVtIiwibW9iaWxlTGFuZHNjYXBlIiwicGhhYmxldCIsInRhYmxldCIsImRlc2t0b3AiLCJsZWZ0Q29sIiwicXVlcmllcyIsImZyb20iLCJtYXhXaWR0aCIsInVudGlsIiwibWluV2lkdGhNYXhXaWR0aCIsIm1hcEJyZWFrcG9pbnRWYWx1ZXMiLCJicyIsImYiLCJndXR0ZXIiLCJiYXNlbGluZSIsInJvd0hlaWdodCIsImNhbGN1bGF0ZVdpZHRoIiwibiIsImNhbGN1bGF0ZUhlaWdodCIsInNwYW4iLCJzcGFuQnJlYWtwb2ludHMiLCJicmVha3BvaW50cyIsIm1xcyIsInFzIiwiT2JqZWN0IiwiZW50cmllcyIsIm1hcCIsImsiLCJ2IiwicmVkdWNlIiwiYSIsImMiLCJwYWRkaW5nIiwiaHRtbCIsImJvZHkiLCJ0aXRsZSIsInNyYyIsInBvcnQiLCJzZXJ2ZXIiLCJ1c2UiLCJleHByZXNzIiwic3RhdGljIiwiZ2V0IiwicmVxIiwicmVzIiwic2VuZCIsImxpc3RlbiIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pFQTtBQUNBLElBQU1BLFVBQVU7QUFDZEMsT0FBSztBQUNIQyxXQUFPLFNBREo7QUFFSEMsWUFBUSxTQUZMO0FBR0hDLFVBQU07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Ozs7OztBQVFBLElBQU1vRCxPQU1RLFNBTlJBLElBTVE7QUFBQSxNQUFHQyxJQUFILFFBQUdBLElBQUg7QUFBQSxNQUFTQyxLQUFULFFBQVNBLEtBQVQ7QUFBQSxNQUFnQkMsR0FBaEIsUUFBZ0JBLEdBQWhCO0FBQUEsMkVBSUNELEtBSkQseUZBT1FELElBUFIseUNBUU9FLEdBUlA7QUFBQSxDQU5kOztlQW1CZUgsSTs7Ozs7Ozs7Ozs7Ozs7O0FDM0JmOztBQUVBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBTUksT0FBTyxJQUFiO0FBRUEsSUFBTUMsU0FBUyx1QkFBZjtBQUNBQSxPQUFPQyxHQUFQLENBQVcsU0FBWCxFQUFzQkMsaUJBQVFDLE1BQVIsQ0FBZSxhQUFmLENBQXRCO0FBRUFILE9BQU9JLEdBQVAsQ0FBVyxHQUFYLEVBQWdCLFVBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQzVCOzs7O0FBSUEsTUFBTVYsT0FBTyx5Q0FBcUIsNEJBQWVyQyxhQUFmLENBQXJCLENBQWI7QUFDQSxNQUFNc0MsUUFBUSw4Q0FBZDtBQUNBLE1BQU1DLE1BQUssZ0JBQVg7QUFFQVEsTUFBSUMsSUFBSixDQUNFLG1CQUFLO0FBQ0hYLGNBREc7QUFFSEMsZ0JBRkc7QUFHSEM7QUFIRyxHQUFMLENBREY7QUFPRCxDQWhCRDtBQWtCQUUsT0FBT1EsTUFBUCxDQUFjVCxJQUFkO0FBQ0FVLFFBQVFDLEdBQVIsdUNBQTJDWCxJQUEzQyxHOzs7Ozs7Ozs7OztBQy9CQSxvQzs7Ozs7Ozs7Ozs7QUNBQSwyQzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSw2QyIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIHdhc20gbW9kdWxlc1xuIFx0dmFyIGluc3RhbGxlZFdhc21Nb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gb2JqZWN0IHdpdGggYWxsIGNvbXBpbGVkIFdlYkFzc2VtYmx5Lk1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18udyA9IHt9O1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NlcnZlci9zZXJ2ZXIudHNcIik7XG4iLCIvLyBjb2xvdXJzIGZyb20gZ3V1aVxuY29uc3QgcGFsZXR0ZSA9IHtcbiAgcmVkOiB7XG4gICAgbGlnaHQ6IFwiI2ZmNGUzNlwiLFxuICAgIG1lZGl1bTogXCIjYzcwMDAwXCIsXG4gICAgZGFyazogXCIjYWQwMDA2XCJcbiAgfSxcbiAgb3JhbmdlOiB7XG4gICAgbGlnaHQ6IFwiI2Y1YmUyY1wiLFxuICAgIG1lZGl1bTogXCIjZmY3ZjBmXCIsXG4gICAgZGFyazogXCIjZWQ2MzAwXCJcbiAgfSxcbiAgYmx1ZToge1xuICAgIGxpZ2h0OiBcIiMwMGIyZmZcIixcbiAgICBtZWRpdW06IFwiIzAwODRjNlwiLFxuICAgIGRhcms6IFwiIzAwNTY4OVwiXG4gIH0sXG4gIGdvbGQ6IHtcbiAgICBsaWdodDogXCIjZWFjY2EwXCIsXG4gICAgbWVkaXVtOiBcIiNhYjg5NThcIixcbiAgICBkYXJrOiBcIiM2YjU4NDBcIlxuICB9LFxuICBwaW5rOiB7XG4gICAgbGlnaHQ6IFwiI2ZmYWJkYlwiLFxuICAgIG1lZGl1bTogXCIjYmIzYjgwXCIsXG4gICAgZGFyazogXCIjN2QwMDY4XCJcbiAgfSxcbiAgeWVsbG93OiB7XG4gICAgbWVkaXVtOiBcIiNmZmU1MDBcIixcbiAgICBkYXJrOiBcIiNlZGQ2MDBcIlxuICB9LFxuICBuZXV0cmFsOiB7XG4gICAgaGVhZGVyOiBcIiNlOWVmZjFcIixcbiAgICBcIjFcIjogXCIjMTIxMjEyXCIsXG4gICAgXCIyXCI6IFwiIzMzMzMzM1wiLFxuICAgIFwiM1wiOiBcIiM3Njc2NzZcIixcbiAgICBcIjRcIjogXCIjOTk5OTk5XCIsXG4gICAgXCI1XCI6IFwiI2RjZGNkY1wiLFxuICAgIFwiNlwiOiBcIiNlY2VjZWNcIixcbiAgICBcIjdcIjogXCIjZjZmNmY2XCJcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGFsZXR0ZTtcbiIsImltcG9ydCB7IGNzcyAsIGN4fSBmcm9tICdlbW90aW9uJ1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IG1pbldpZHRoIH0gZnJvbSAnLi4vc3R5bGVzL2JyZWFrcG9pbnRzJztcbmltcG9ydCB7IGNlbGwsIHJvdywgc3BhbkJyZWFrcG9pbnRzIH0gZnJvbSAnLi4vc3R5bGVzL2dyaWQnO1xuIGV4cG9ydCBpbnRlcmZhY2UgQ29udGFpbmVyUHJvcHMge1xuICByZWFkb25seSBjaGlsZHJlbjogUmVhZG9ubHlBcnJheTxKU1guRWxlbWVudD4gfCBKU1guRWxlbWVudFxufVxuXG5leHBvcnQgY29uc3QgQ29udGFpbmVyIDogUmVhY3QuU0ZDPENvbnRhaW5lclByb3BzPiA9ICh7Y2hpbGRyZW59KSA9PiA8ZGl2IGNzcz17e1xuICAgIHBvc2l0aW9uOidyZWxhdGl2ZScsXG4gICAgbWFyZ2luOidhdXRvJyxcbiAgICAuLi5zcGFuQnJlYWtwb2ludHMoe21vYmlsZToxLHdpZGU6MTB9LG1pbldpZHRoKSxcbiAgICAuLi5yb3csXG4gICAgWycmPionXTpjZWxsXG4gIH19PlxuICB7Y2hpbGRyZW59XG4gIDwvZGl2PlxuIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZW1vdGlvbidcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgcGFsZXR0ZSBmcm9tICcuLi9jb2xvdXJzJ1xuaW1wb3J0IHsgY2VsbCB9IGZyb20gJy4uL3N0eWxlcy9ncmlkJztcbmltcG9ydCB7IENvbnRhaW5lciB9IGZyb20gJy4vZ3JpZCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWFpblByb3BzIHtcbiAgcmVhZG9ubHkgY2hpbGRyZW46IFJlYWRvbmx5QXJyYXk8SlNYLkVsZW1lbnQ+IHwgSlNYLkVsZW1lbnRcbn1cblxuZXhwb3J0IGNvbnN0IE1haW46IFJlYWN0LlNGQzxNYWluUHJvcHM+ID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICByZXR1cm4gPGRpdiBjc3M9e3tcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgbWluSGVpZ2h0OiAnMTAwdmgnLFxuICAgIGFsaWduSXRlbXM6ICdzdHJldGNoJyxcbiAgICB3aWR0aDogJzEwMCUnXG4gIH19PlxuICAgIDxoZWFkZXIgY3NzPXt7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IHBhbGV0dGUubmV1dHJhbC5oZWFkZXIsXG4gICAgICBoZWlnaHQ6ICcxMDBweCcsXG4gICAgICBjb2xvcjogcGFsZXR0ZS5uZXV0cmFsW1wiMVwiXSxcbiAgICB9fT50aGlzIGlzIHRoZSBoZWFkZXI8L2hlYWRlcj5cbiAgICA8bWFpbiBjc3M9e3sgZmxleDogJzEnIH19PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvbWFpbj5cbiAgICA8Zm9vdGVyIGNzcz17e1xuICAgICAgYmFja2dyb3VuZENvbG9yOiAgcGFsZXR0ZS5uZXV0cmFsW1wiMVwiXSxcbiAgICAgIGNvbG9yOiAgcGFsZXR0ZS5uZXV0cmFsW1wiN1wiXSxcbiAgICB9fT48Q29udGFpbmVyPlxuICAgICAgPGRpdj48aDE+dGhpcyBpcyB0aGUgZm9vdGVyPC9oMT48L2Rpdj5cbiAgICAgIDxkaXY+PGgxIGNzcz17e1xuICAgICAgICBjb2xvcjogcGFsZXR0ZS55ZWxsb3cubWVkaXVtXG4gICAgICB9fT50aGlzIGlzIHRoZSBmYWtlIGZvb3RlcjwvaDE+PC9kaXY+XG4gICAgICA8L0NvbnRhaW5lcj48L2Zvb3Rlcj5cbiAgPC9kaXY+XG59XG4iLCJpbXBvcnQgeyBjc3MgfSBmcm9tIFwiZW1vdGlvblwiO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgTWFpbiB9IGZyb20gXCIuL21haW5cIjtcblxuY29uc3QgVXNlciA9IChcbiAgPE1haW4+XG4gICAgPGRpdiBjc3M9e3sgY29sb3I6IFwiaG90cGlua1wiIH19PkhlbGxvIHdvcmxkITwvZGl2PlxuICA8L01haW4+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBVc2VyO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZXhwcmVzc2lvbi1zdGF0ZW1lbnRcbi8vIFJlYWN0RE9NLnJlbmRlcihlbGVtZW50LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKTtcbiIsImV4cG9ydCBpbnRlcmZhY2UgQnJlYWtwb2ludHMge1xuICByZWFkb25seSBtb2JpbGU6IG51bWJlcixcbiAgcmVhZG9ubHkgbW9iaWxlTWVkaXVtOiBudW1iZXIsXG4gIHJlYWRvbmx5IG1vYmlsZUxhbmRzY2FwZTogbnVtYmVyLFxuICByZWFkb25seSBwaGFibGV0OiBudW1iZXIsXG4gIHJlYWRvbmx5IHRhYmxldDogbnVtYmVyLFxuICByZWFkb25seSBkZXNrdG9wOiBudW1iZXIsXG4gIHJlYWRvbmx5IGxlZnRDb2w6IG51bWJlcixcbiAgcmVhZG9ubHkgd2lkZTogbnVtYmVyLFxufVxuXG5leHBvcnQgdHlwZSBTb21lQnJlYWtQb2ludHMgPSB7XG4gIFtfIGluIGtleW9mIEJyZWFrcG9pbnRzXT86IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBCcmVha3BvaW50UXVlcmllcyAgPSB7XG4gIFtfIGluIGtleW9mIEJyZWFrcG9pbnRzXTogc3RyaW5nIFxufVxuXG5leHBvcnQgY29uc3QgbmFtZWRCcmVha3BvaW50czogQnJlYWtwb2ludHMgPSB7XG4gIG1vYmlsZTogMzIwLFxuICBtb2JpbGVNZWRpdW06IDM2MCxcbiAgbW9iaWxlTGFuZHNjYXBlOiA0ODAsXG4gIHBoYWJsZXQ6IDY2MCxcbiAgdGFibGV0OiA3NDAsXG4gIGRlc2t0b3A6IDk4MCxcbiAgbGVmdENvbDogMTE0MCxcbiAgd2lkZTogMTMwMCxcbn1cblxuZXhwb3J0IGNvbnN0IHF1ZXJpZXMgPVxuICB7XG4gICAgbWluV2lkdGg6IChmcm9tOiBudW1iZXIpOiBzdHJpbmcgPT4gYEBtZWRpYSAobWluLXdpZHRoOiAke2Ake2Zyb219cHhgfSlgLFxuICAgIG1heFdpZHRoOiAodW50aWw6IG51bWJlcik6IHN0cmluZyA9PiBgQG1lZGlhIChtYXgtd2lkdGg6ICR7YCR7dW50aWwgLSAxfXB4YH0pYCxcbiAgICBtaW5XaWR0aE1heFdpZHRoOiAoZnJvbTogbnVtYmVyLCB1bnRpbDogbnVtYmVyKTogc3RyaW5nID0+IGBAbWVkaWEgKG1pbi13aWR0aDogJHtgJHtmcm9tfXB4YH0pIGFuZCAobWF4LXdpZHRoOiAke2Ake3VudGlsIC0gMX1weGB9KWBcbiAgfVxuXG5cbiAgY29uc3QgbWFwQnJlYWtwb2ludFZhbHVlczogKGJzOiBCcmVha3BvaW50cywgZjogKHg6IG51bWJlcikgPT4gc3RyaW5nICkgPT4gQnJlYWtwb2ludFF1ZXJpZXMgPSAoYnMsIGYpID0+ICh7XG4gICAgbW9iaWxlOiBmKGJzLm1vYmlsZSksXG4gICAgbW9iaWxlTWVkaXVtOiBmKGJzLm1vYmlsZU1lZGl1bSksXG4gICAgbW9iaWxlTGFuZHNjYXBlOiBmKGJzLm1vYmlsZUxhbmRzY2FwZSksXG4gICAgcGhhYmxldDogZihicy5waGFibGV0KSxcbiAgICB0YWJsZXQ6IGYoYnMudGFibGV0KSxcbiAgICBkZXNrdG9wOiBmKGJzLmRlc2t0b3ApLFxuICAgIGxlZnRDb2w6IGYoYnMubGVmdENvbCksXG4gICAgd2lkZTogZihicy53aWRlKVxuICB9KSBcbiAgXG4gIGV4cG9ydCBjb25zdCBtaW5XaWR0aCA9IG1hcEJyZWFrcG9pbnRWYWx1ZXMobmFtZWRCcmVha3BvaW50cyxxdWVyaWVzLm1pbldpZHRoKVxuICBleHBvcnQgY29uc3QgbWF4V2lkdGggPSBtYXBCcmVha3BvaW50VmFsdWVzKG5hbWVkQnJlYWtwb2ludHMscXVlcmllcy5tYXhXaWR0aCkiLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdlbW90aW9uJ1xuaW1wb3J0IHsgQnJlYWtwb2ludFF1ZXJpZXMsIG1pbldpZHRoLCBTb21lQnJlYWtQb2ludHMgfSBmcm9tICcuL2JyZWFrcG9pbnRzJztcblxuXG5jb25zdCBndXR0ZXIgPSAyMFxuY29uc3QgYmFzZWxpbmUgPSAxMlxuY29uc3Qgd2lkdGggPSA2MFxuY29uc3Qgcm93SGVpZ2h0ID0gMzZcblxuZXhwb3J0IGNvbnN0IGNhbGN1bGF0ZVdpZHRoID0gKG46IG51bWJlcikgPT4gbiAqIHdpZHRoICsgKG4gLSAxKSAqIGd1dHRlclxuZXhwb3J0IGNvbnN0IGNhbGN1bGF0ZUhlaWdodCA9IChuOiBudW1iZXIpID0+IG4gKiByb3dIZWlnaHQgKyAobiAtIDEpICogYmFzZWxpbmVcblxuZXhwb3J0IGNvbnN0IHNwYW4gPSAobjogbnVtYmVyKSA9PiAoe1xuICB3aWR0aDogYCR7Y2FsY3VsYXRlV2lkdGgobil9cHhgXG59KVxuXG5leHBvcnQgaW50ZXJmYWNlIEJyZWFrcG9pbnRDU1Mge1xuICAgIHJlYWRvbmx5IFtrZXk6c3RyaW5nXToge1xuICAgICAgcmVhZG9ubHkgd2lkdGg6IHN0cmluZ1xuICAgIH0sXG59XG5cbmV4cG9ydCBjb25zdCBzcGFuQnJlYWtwb2ludHM6IChiczpTb21lQnJlYWtQb2ludHMscXM6IEJyZWFrcG9pbnRRdWVyaWVzKT0+IEJyZWFrcG9pbnRDU1MgPSAoYnJlYWtwb2ludHMsIG1xcyA9IG1pbldpZHRoICkgPT4ge1xuICBjb25zdCBicyA9IGJyZWFrcG9pbnRzIGFzICB7cmVhZG9ubHkgW2tleTpzdHJpbmddOiBudW1iZXJ9XG4gIGNvbnN0IHFzID0gbXFzIGFzIHtyZWFkb25seSBba2V5OnN0cmluZ106IHN0cmluZ31cbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXMoYnMgYXMgIHtyZWFkb25seSBba2V5OnN0cmluZ106IG51bWJlcn0pLm1hcCgoW2ssIHZdKSA9PiBcbiAgICAgICAoayBpbiBxcyAmJiB2KT8oeyBbcXNba11dOiBzcGFuKHYpIH0pOnt9XG4gICkucmVkdWNlKChhICxjKSA9Pih7Li4uYSwuLi5jfSkse30pXG59XG5cbmV4cG9ydCBjb25zdCBjZWxsID0ge1xuICBmbGV4OiAnMScsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgcGFkZGluZzogYCR7Z3V0dGVyfXB4IDAgMCAke2d1dHRlcn1weGBcbn1cblxuZXhwb3J0IGNvbnN0IHJvdyA9IHtcbiAgcGFkZGluZzogYC0ke2d1dHRlcn1weCAwIDAgLSR7Z3V0dGVyfXB4YCxcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICBtYXJnaW46ICdhdXRvJ1xufSIsIi8qKlxuICogaHR0cHM6Ly9tZWRpdW0uY29tL3N0eWxlZC1jb21wb25lbnRzL3RoZS1zaW1wbGUtZ3VpZGUtdG8tc2VydmVyLXNpZGUtcmVuZGVyaW5nLXJlYWN0LXdpdGgtc3R5bGVkLWNvbXBvbmVudHMtZDMxYzZiMmI4ZmJmXG4gKiBIdG1sXG4gKiBUaGlzIEh0bWwuanMgZmlsZSBhY3RzIGFzIGEgdGVtcGxhdGUgdGhhdCB3ZSBpbnNlcnQgYWxsIG91ciBnZW5lcmF0ZWRcbiAqIGFwcGxpY2F0aW9uIGNvZGUgaW50byBiZWZvcmUgc2VuZGluZyBpdCB0byB0aGUgY2xpZW50IGFzIHJlZ3VsYXIgSFRNTC5cbiAqIE5vdGUgd2UncmUgcmV0dXJuaW5nIGEgdGVtcGxhdGUgc3RyaW5nIGZyb20gdGhpcyBmdW5jdGlvbi5cbiAqL1xuXG5jb25zdCBodG1sOiAoXG4gIF86IHtcbiAgICByZWFkb25seSBib2R5OiBzdHJpbmc7XG4gICAgcmVhZG9ubHkgdGl0bGU6IHN0cmluZztcbiAgICByZWFkb25seSBzcmM6IHN0cmluZztcbiAgfVxuKSA9PiBzdHJpbmcgPSAoeyBib2R5LCB0aXRsZSwgc3JjIH0pID0+IGBcbiAgPCFET0NUWVBFIGh0bWw+XG4gIDxodG1sPlxuICAgIDxoZWFkPlxuICAgICAgPHRpdGxlPiR7dGl0bGV9PC90aXRsZT5cbiAgICA8L2hlYWQ+XG4gICAgPGJvZHkgc3R5bGU9XCJtYXJnaW46MFwiPlxuICAgICAgPGRpdiBpZD1cImFwcFwiPiR7Ym9keX08L2Rpdj5cbiAgICAgIDxzY3JpcHQgc3JjPVwiJHtzcmN9XCI+PC9zY3JpcHQ+XG4gICAgPC9ib2R5PlxuICA8L2h0bWw+XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBodG1sO1xuIiwiaW1wb3J0IGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHJlbmRlclRvU3RyaW5nIH0gZnJvbSBcInJlYWN0LWRvbS9zZXJ2ZXJcIjtcbmltcG9ydCBVc2VyIGZyb20gXCIuLi9jbGllbnQvY29tcG9uZW50cy91c2VyXCI7XG5pbXBvcnQgaHRtbCBmcm9tIFwiLi9odG1sXCI7XG5pbXBvcnQgeyByZW5kZXJTdHlsZXNUb1N0cmluZyB9IGZyb20gXCJlbW90aW9uLXNlcnZlclwiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIlxuY29uc3QgcG9ydCA9IDkyMzM7XG5cbmNvbnN0IHNlcnZlciA9IGV4cHJlc3MoKTtcbnNlcnZlci51c2UoXCIvc3RhdGljXCIsIGV4cHJlc3Muc3RhdGljKFwiZGlzdC9zdGF0aWNcIikpO1xuXG5zZXJ2ZXIuZ2V0KFwiL1wiLCAocmVxLCByZXMpID0+IHtcbiAgLyoqXG4gICAqIHJlbmRlclRvU3RyaW5nKCkgd2lsbCB0YWtlIG91ciBSZWFjdCBhcHAgYW5kIHR1cm4gaXQgaW50byBhIHN0cmluZ1xuICAgKiB0byBiZSBpbnNlcnRlZCBpbnRvIG91ciBIdG1sIHRlbXBsYXRlIGZ1bmN0aW9uLlxuICAgKi9cbiAgY29uc3QgYm9keSA9IHJlbmRlclN0eWxlc1RvU3RyaW5nKHJlbmRlclRvU3RyaW5nKFVzZXIpKTtcbiAgY29uc3QgdGl0bGUgPSBcIlNlcnZlciBzaWRlIFJlbmRlcmluZyB3aXRoIFN0eWxlZCBDb21wb25lbnRzXCI7XG4gIGNvbnN0IHNyYz0gXCJzdGF0aWMvdXNlci5qc1wiXG5cbiAgcmVzLnNlbmQoXG4gICAgaHRtbCh7XG4gICAgICBib2R5LFxuICAgICAgdGl0bGUsXG4gICAgICBzcmNcbiAgICB9KVxuICApO1xufSk7XG5cbnNlcnZlci5saXN0ZW4ocG9ydCk7XG5jb25zb2xlLmxvZyhgU2VydmluZyBhdCBodHRwOi8vbG9jYWxob3N0OiR7cG9ydH1gKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVtb3Rpb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZW1vdGlvbi1zZXJ2ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1kb20vc2VydmVyXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=