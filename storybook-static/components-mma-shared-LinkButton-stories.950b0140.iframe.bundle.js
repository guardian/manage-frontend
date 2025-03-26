'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[6966],
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
		'./client/components/mma/shared/LinkButton.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					BoldWithBrandColours: () => BoldWithBrandColours,
					Default: () => Default,
					HollowWithLeftArrow: () => HollowWithLeftArrow,
					PrimaryWithRightArrow: () => PrimaryWithRightArrow,
					WithAlert: () => WithAlert,
					WithLeftArrow: () => WithLeftArrow,
					WithRightArrow: () => WithRightArrow,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => __WEBPACK_DEFAULT_EXPORT__,
				});
			var _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				_storybook_ReactRouterDecorator__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./.storybook/ReactRouterDecorator.tsx',
					);
			const __WEBPACK_DEFAULT_EXPORT__ = {
				title: 'Components/LinkButton',
				component: __webpack_require__(
					'./client/components/mma/shared/Buttons.tsx',
				).Q,
				decorators: [
					_storybook_ReactRouterDecorator__WEBPACK_IMPORTED_MODULE_1__.R,
				],
				args: {
					text: 'Link Button',
					to: '/example',
					height: void 0,
					fontWeight: void 0,
					left: !1,
					right: !1,
					disabled: !1,
					colour: void 0,
					textColour: void 0,
					primary: void 0,
					hollow: void 0,
					hide: !1,
					forceCircle: void 0,
					hoverColour: void 0,
					leftTick: void 0,
					alert: !1,
					type: 'button',
				},
				argTypes: {
					fontWeight: {
						options: ['bold', void 0],
						control: { type: 'inline-radio' },
					},
					primary: {
						options: [!0, void 0],
						control: { type: 'inline-radio' },
					},
					hollow: {
						options: [!0, void 0],
						control: { type: 'inline-radio' },
					},
					forceCircle: {
						options: [!0, void 0],
						control: { type: 'inline-radio' },
					},
					leftTick: {
						options: [!0, void 0],
						control: { type: 'inline-radio' },
					},
					colour: { control: { type: 'color' } },
					textColour: { control: { type: 'color' } },
					hoverColour: { control: { type: 'color' } },
					type: {
						options: ['button', 'submit', 'reset'],
						control: { type: 'inline-radio' },
					},
				},
			};
			var Default = {},
				BoldWithBrandColours = {
					args: {
						fontWeight: 'bold',
						colour: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
							.palette.brand[800],
						textColour:
							_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
								.palette.brand[400],
					},
				},
				WithAlert = {
					args: {
						alert: !0,
						fontWeight: 'bold',
						colour: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
							.palette.brand[400],
						textColour:
							_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
								.palette.neutral[100],
					},
				},
				WithRightArrow = { args: { right: !0 } },
				WithLeftArrow = { args: { left: !0 } },
				PrimaryWithRightArrow = { args: { primary: !0, right: !0 } },
				HollowWithLeftArrow = { args: { hollow: !0, left: !0 } };
			(Default.parameters = {
				...Default.parameters,
				docs: {
					...Default.parameters?.docs,
					source: {
						originalSource: '{}',
						...Default.parameters?.docs?.source,
					},
				},
			}),
				(BoldWithBrandColours.parameters = {
					...BoldWithBrandColours.parameters,
					docs: {
						...BoldWithBrandColours.parameters?.docs,
						source: {
							originalSource:
								"{\n  args: {\n    fontWeight: 'bold',\n    colour: palette.brand[800],\n    textColour: palette.brand[400]\n  }\n}",
							...BoldWithBrandColours.parameters?.docs?.source,
						},
					},
				}),
				(WithAlert.parameters = {
					...WithAlert.parameters,
					docs: {
						...WithAlert.parameters?.docs,
						source: {
							originalSource:
								"{\n  args: {\n    alert: true,\n    fontWeight: 'bold',\n    colour: palette.brand[400],\n    textColour: palette.neutral[100]\n  }\n}",
							...WithAlert.parameters?.docs?.source,
						},
					},
				}),
				(WithRightArrow.parameters = {
					...WithRightArrow.parameters,
					docs: {
						...WithRightArrow.parameters?.docs,
						source: {
							originalSource:
								'{\n  args: {\n    right: true\n  }\n}',
							...WithRightArrow.parameters?.docs?.source,
						},
					},
				}),
				(WithLeftArrow.parameters = {
					...WithLeftArrow.parameters,
					docs: {
						...WithLeftArrow.parameters?.docs,
						source: {
							originalSource:
								'{\n  args: {\n    left: true\n  }\n}',
							...WithLeftArrow.parameters?.docs?.source,
						},
					},
				}),
				(PrimaryWithRightArrow.parameters = {
					...PrimaryWithRightArrow.parameters,
					docs: {
						...PrimaryWithRightArrow.parameters?.docs,
						source: {
							originalSource:
								'{\n  args: {\n    primary: true,\n    right: true\n  }\n}',
							...PrimaryWithRightArrow.parameters?.docs?.source,
						},
					},
				}),
				(HollowWithLeftArrow.parameters = {
					...HollowWithLeftArrow.parameters,
					docs: {
						...HollowWithLeftArrow.parameters?.docs,
						source: {
							originalSource:
								'{\n  args: {\n    hollow: true,\n    left: true\n  }\n}',
							...HollowWithLeftArrow.parameters?.docs?.source,
						},
					},
				});
			const __namedExportsOrder = [
				'Default',
				'BoldWithBrandColours',
				'WithAlert',
				'WithRightArrow',
				'WithLeftArrow',
				'PrimaryWithRightArrow',
				'HollowWithLeftArrow',
			];
		},
	},
]);
