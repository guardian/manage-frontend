'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[9875],
	{
		'./client/components/shared/CallCentreNumbers.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				H: () => CallCentreNumbers,
				t: () => ukPhoneNumberWithoutPrefix,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				ukPhoneNumberWithoutPrefix = '0330 333 6790',
				CallCentreNumbers = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.BX)(
						'div',
						{
							children: [
								props.prefixText || 'To contact us',
								' directly, please email ',
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
									'a',
									{
										css: (0,
										_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(
											{
												textDecoration: 'underline',
												color: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
													.palette.sport[300],
												':visited': {
													color: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
														.palette.sport[300],
												},
											},
											'',
											'',
										),
										href: 'mailto:customer.help@theguardian.com',
										children:
											'customer.help@theguardian.com',
									},
								),
								'.',
							],
						},
					);
			try {
				(CallCentreNumbers.displayName = 'CallCentreNumbers'),
					(CallCentreNumbers.__docgenInfo = {
						description: '',
						displayName: 'CallCentreNumbers',
						props: {
							prefixText: {
								defaultValue: null,
								description: '',
								name: 'prefixText',
								required: !1,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/shared/CallCentreNumbers.tsx#CallCentreNumbers'
						] = {
							docgenInfo: CallCentreNumbers.__docgenInfo,
							name: 'CallCentreNumbers',
							path: 'client/components/shared/CallCentreNumbers.tsx#CallCentreNumbers',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/shared/CallCentreNumbers.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					Default: () => Default,
					WithCustomPrefix: () => WithCustomPrefix,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => __WEBPACK_DEFAULT_EXPORT__,
				});
			var _CallCentreNumbers__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./client/components/shared/CallCentreNumbers.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ =
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
				title: 'Components/CallCentreNumbers',
				component: _CallCentreNumbers__WEBPACK_IMPORTED_MODULE_0__.H,
				args: { prefixText: '' },
			};
			var Template = (args) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
						_CallCentreNumbers__WEBPACK_IMPORTED_MODULE_0__.H,
						(function _objectSpread(e) {
							for (var r = 1; r < arguments.length; r++) {
								var t =
									null != arguments[r] ? arguments[r] : {};
								r % 2
									? ownKeys(Object(t), !0).forEach(function (
											r,
									  ) {
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
												Object.getOwnPropertyDescriptor(
													t,
													r,
												),
											);
									  });
							}
							return e;
						})({}, args),
					),
				Default = { render: Template },
				WithCustomPrefix = {
					render: Template,
					args: {
						prefixText:
							'If you’re not sure what’s best for you or would like help, to contact us',
					},
				};
			(Default.parameters = {
				...Default.parameters,
				docs: {
					...Default.parameters?.docs,
					source: {
						originalSource: '{\n  render: Template\n}',
						...Default.parameters?.docs?.source,
					},
				},
			}),
				(WithCustomPrefix.parameters = {
					...WithCustomPrefix.parameters,
					docs: {
						...WithCustomPrefix.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: Template,\n  args: {\n    prefixText: 'If you’re not sure what’s best for you or would like help, to contact us'\n  }\n}",
							...WithCustomPrefix.parameters?.docs?.source,
						},
					},
				});
			const __namedExportsOrder = ['Default', 'WithCustomPrefix'];
		},
	},
]);
