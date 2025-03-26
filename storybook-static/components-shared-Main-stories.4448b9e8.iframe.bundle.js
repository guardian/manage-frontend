'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[6284],
	{
		'./.storybook/ReactRouterDecorator.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				R: () => ReactRouterDecorator,
			});
			var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__('./node_modules/react-router/index.js'),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			function ownKeys(e, r) {
				var t = Object.keys(e);
				if (Object.getOwnPropertySymbols) {
					var o = Object.getOwnPropertySymbols(e);
					r &&
						(o = o.filter(function (r) {
							return Object.getOwnPropertyDescriptor(
								e,
								r,
							).enumerable;
						})),
						t.push.apply(t, o);
				}
				return t;
			}
			function _objectSpread(e) {
				for (var r = 1; r < arguments.length; r++) {
					var t = null != arguments[r] ? arguments[r] : {};
					r % 2
						? ownKeys(Object(t), !0).forEach(function (r) {
								_defineProperty(e, r, t[r]);
						  })
						: Object.getOwnPropertyDescriptors
						? Object.defineProperties(
								e,
								Object.getOwnPropertyDescriptors(t),
						  )
						: ownKeys(Object(t)).forEach(function (r) {
								Object.defineProperty(
									e,
									r,
									Object.getOwnPropertyDescriptor(t, r),
								);
						  });
				}
				return e;
			}
			function _defineProperty(obj, key, value) {
				return (
					(key = (function _toPropertyKey(arg) {
						var key = (function _toPrimitive(input, hint) {
							if ('object' != typeof input || null === input)
								return input;
							var prim = input[Symbol.toPrimitive];
							if (void 0 !== prim) {
								var res = prim.call(input, hint || 'default');
								if ('object' != typeof res) return res;
								throw new TypeError(
									'@@toPrimitive must return a primitive value.',
								);
							}
							return ('string' === hint ? String : Number)(input);
						})(arg, 'string');
						return 'symbol' == typeof key ? key : String(key);
					})(key)) in obj
						? Object.defineProperty(obj, key, {
								value,
								enumerable: !0,
								configurable: !0,
								writable: !0,
						  })
						: (obj[key] = value),
					obj
				);
			}
			var ReactRouterDecorator = (Story, context) => {
				var _context$parameters$r,
					_params$path,
					params =
						null !==
							(_context$parameters$r =
								context.parameters.reactRouter) &&
						void 0 !== _context$parameters$r
							? _context$parameters$r
							: {},
					path =
						null !== (_params$path = params.path) &&
						void 0 !== _params$path
							? _params$path
							: '*',
					location = _objectSpread(
						_objectSpread(
							{},
							params.location && { pathname: params.location },
						),
						params.state && { state: params.state },
					);
				return (0,
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
					react_router_dom__WEBPACK_IMPORTED_MODULE_1__.VA,
					{
						initialEntries: [location],
						children: (0,
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
							react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Z5,
							{
								children: params.container
									? (0,
									  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
											react_router_dom__WEBPACK_IMPORTED_MODULE_1__.AW,
											{
												path,
												element: params.container,
												children: (0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
													react_router_dom__WEBPACK_IMPORTED_MODULE_1__.AW,
													{
														index: !0,
														element: (0,
														_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
															Story,
															{},
														),
													},
												),
											},
									  )
									: (0,
									  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
											react_router_dom__WEBPACK_IMPORTED_MODULE_1__.AW,
											{
												path,
												element: (0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
													Story,
													{},
												),
											},
									  ),
							},
						),
					},
				);
			};
		},
		'./client/components/shared/Main.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					HelpCentreSignedIn: () => HelpCentreSignedIn,
					HelpCentreSignedOut: () => HelpCentreSignedOut,
					SignedIn: () => SignedIn,
					SignedOut: () => SignedOut,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => __WEBPACK_DEFAULT_EXPORT__,
				});
			var _storybook_ReactRouterDecorator__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./.storybook/ReactRouterDecorator.tsx',
					),
				_Main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./client/components/shared/Main.tsx',
				),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			function ownKeys(e, r) {
				var t = Object.keys(e);
				if (Object.getOwnPropertySymbols) {
					var o = Object.getOwnPropertySymbols(e);
					r &&
						(o = o.filter(function (r) {
							return Object.getOwnPropertyDescriptor(
								e,
								r,
							).enumerable;
						})),
						t.push.apply(t, o);
				}
				return t;
			}
			function _objectSpread(e) {
				for (var r = 1; r < arguments.length; r++) {
					var t = null != arguments[r] ? arguments[r] : {};
					r % 2
						? ownKeys(Object(t), !0).forEach(function (r) {
								_defineProperty(e, r, t[r]);
						  })
						: Object.getOwnPropertyDescriptors
						? Object.defineProperties(
								e,
								Object.getOwnPropertyDescriptors(t),
						  )
						: ownKeys(Object(t)).forEach(function (r) {
								Object.defineProperty(
									e,
									r,
									Object.getOwnPropertyDescriptor(t, r),
								);
						  });
				}
				return e;
			}
			function _defineProperty(obj, key, value) {
				return (
					(key = (function _toPropertyKey(arg) {
						var key = (function _toPrimitive(input, hint) {
							if ('object' != typeof input || null === input)
								return input;
							var prim = input[Symbol.toPrimitive];
							if (void 0 !== prim) {
								var res = prim.call(input, hint || 'default');
								if ('object' != typeof res) return res;
								throw new TypeError(
									'@@toPrimitive must return a primitive value.',
								);
							}
							return ('string' === hint ? String : Number)(input);
						})(arg, 'string');
						return 'symbol' == typeof key ? key : String(key);
					})(key)) in obj
						? Object.defineProperty(obj, key, {
								value,
								enumerable: !0,
								configurable: !0,
								writable: !0,
						  })
						: (obj[key] = value),
					obj
				);
			}
			const __WEBPACK_DEFAULT_EXPORT__ = {
				title: 'Layouts/Main',
				component: _Main__WEBPACK_IMPORTED_MODULE_0__.o,
				decorators: [
					_storybook_ReactRouterDecorator__WEBPACK_IMPORTED_MODULE_1__.R,
				],
				parameters: { layout: 'fullscreen' },
				args: {
					signInStatus: 'init',
					requiresSignIn: !1,
					helpCentrePage: !1,
				},
				argTypes: {
					signInStatus: {
						options: ['init', 'signedOut', 'signedIn'],
						control: { type: 'select' },
					},
				},
			};
			var Template = (args) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
						_Main__WEBPACK_IMPORTED_MODULE_0__.o,
						_objectSpread(
							_objectSpread({}, args),
							{},
							{
								children: (0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
									'h1',
									{ children: 'Main content' },
								),
							},
						),
					),
				SignedOut = {
					render: Template,
					args: { signInStatus: 'signedOut' },
				},
				SignedIn = {
					render: Template,
					args: { signInStatus: 'signedIn' },
				},
				HelpCentreSignedOut = {
					render: Template,
					args: { signInStatus: 'signedOut' },
				},
				HelpCentreSignedIn = {
					render: Template,
					args: { signInStatus: 'signedIn' },
				};
			(SignedOut.parameters = {
				...SignedOut.parameters,
				docs: {
					...SignedOut.parameters?.docs,
					source: {
						originalSource:
							"{\n  render: Template,\n  args: {\n    signInStatus: 'signedOut'\n  }\n}",
						...SignedOut.parameters?.docs?.source,
					},
				},
			}),
				(SignedIn.parameters = {
					...SignedIn.parameters,
					docs: {
						...SignedIn.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: Template,\n  args: {\n    signInStatus: 'signedIn'\n  }\n}",
							...SignedIn.parameters?.docs?.source,
						},
					},
				}),
				(HelpCentreSignedOut.parameters = {
					...HelpCentreSignedOut.parameters,
					docs: {
						...HelpCentreSignedOut.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: Template,\n  args: {\n    signInStatus: 'signedOut'\n  }\n}",
							...HelpCentreSignedOut.parameters?.docs?.source,
						},
					},
				}),
				(HelpCentreSignedIn.parameters = {
					...HelpCentreSignedIn.parameters,
					docs: {
						...HelpCentreSignedIn.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: Template,\n  args: {\n    signInStatus: 'signedIn'\n  }\n}",
							...HelpCentreSignedIn.parameters?.docs?.source,
						},
					},
				});
			const __namedExportsOrder = [
				'SignedOut',
				'SignedIn',
				'HelpCentreSignedOut',
				'HelpCentreSignedIn',
			];
		},
	},
]);
