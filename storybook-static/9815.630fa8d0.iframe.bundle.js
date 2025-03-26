(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[9815],
	{
		'./client/components/mma/identity/sharedStyles.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			'use strict';
			__webpack_require__.d(__webpack_exports__, {
				Fe: () => aCss,
				Ig: () => errorMessageCss,
				WM: () => toggleDescriptionPadding,
				j$: () => standardSansText,
				kS: () => textSmall,
				ll: () => formFieldErrorCss,
				pb: () => labelCss,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
					);
			var textSmall = { name: 'mmdt3g', styles: 'font-size:14px' },
				standardSansText = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__.VZD,
					';line-height:1.333;',
					'',
				),
				toggleDescriptionPadding = {
					name: 'nvgfad',
					styles: 'margin:0;padding:2.88px 90px 0 0',
				},
				lightBorder = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'border:1px solid ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.neutral[86],
					';',
					'',
				),
				errorBorder = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'border:1px solid ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.error[400],
					';',
					'',
				),
				aCss = (0, _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'color:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.sport[300],
					';border-bottom:1px solid ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.neutral[86],
					';transition:border-color 0.15s ease-out;:hover{border-bottom:1px solid ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.sport[300],
					';}',
					'',
				),
				inputCss = (0, _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__.AjP,
					';box-shadow:none;box-sizing:border-box;color:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.neutral[7],
					';display:inline-block;padding:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[2],
					'px ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[2],
					'px 7px;line-height:1.4;outline:none;border-radius:0;width:100%;margin-top:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[1],
					'px;',
					'',
				),
				textareaCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'vertical-align:top;min-height:108px;overflow:auto;resize:vertical;margin-top:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[1],
					'px;',
					'',
				),
				selectCss = {
					name: 'r41ez8',
					styles: 'font:inherit;display:block;margin-top:4px',
				},
				labelCss = (0, _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					"margin:5px 0 24px 0;display:block;width:100%;& input:not([type='file']),& textarea{",
					[inputCss, lightBorder],
					";}& input[type='file']{",
					inputCss,
					';}& textarea{',
					textareaCss,
					';}& select{',
					selectCss,
					';}',
					'',
				),
				errorMessageCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'font-size:14px;line-height:18px;background-color:#ffe1e1;border-bottom:1px solid ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.error[400],
					';border-top:1px solid ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.error[400],
					';color:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.error[400],
					';margin-top:6px;padding:7px 8px;',
					'',
				),
				formFieldErrorCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					"input:not([type='file']),textarea,input{",
					errorBorder,
					';}p{',
					textSmall,
					';color:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.error[400],
					';margin-top:6px;}',
					'',
				);
		},
		'./client/components/shared/Spinner.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			'use strict';
			__webpack_require__.d(__webpack_exports__, { $: () => Spinner });
			var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			var scaledPx = function (original) {
					var scale =
						arguments.length > 1 && void 0 !== arguments[1]
							? arguments[1]
							: 1;
					return ''.concat(Math.ceil(original * scale), 'px');
				},
				_ref = {
					name: '1xncvma',
					styles: '@keyframes spin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}',
				},
				Spinner = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.BX)(
						'div',
						{
							css: (0,
							_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(
								{
									alignItems: 'center',
									display: props.inline
										? 'inline-flex'
										: 'flex',
									justifyContent: props.alignCenter
										? 'center'
										: '',
								},
								'',
								'',
							),
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
									_emotion_react__WEBPACK_IMPORTED_MODULE_1__.xB,
									{ styles: _ref },
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
									'div',
									{
										css: (0,
										_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(
											{
												border: ''.concat(
													scaledPx(6, props.scale),
													' solid #f3f3f3',
												),
												borderTop: ''.concat(
													scaledPx(6, props.scale),
													' solid #333',
												),
												borderRadius: '50%',
												width: scaledPx(
													40,
													props.scale,
												),
												height: scaledPx(
													40,
													props.scale,
												),
												animation:
													'spin 2s linear infinite',
												margin: scaledPx(
													10,
													props.scale,
												),
												flexShrink: 0,
											},
											'',
											'',
										),
									},
								),
								props.loadingMessage,
							],
						},
					);
			try {
				(Spinner.displayName = 'Spinner'),
					(Spinner.__docgenInfo = {
						description: '',
						displayName: 'Spinner',
						props: {
							loadingMessage: {
								defaultValue: null,
								description: '',
								name: 'loadingMessage',
								required: !1,
								type: { name: 'string' },
							},
							scale: {
								defaultValue: null,
								description: '',
								name: 'scale',
								required: !1,
								type: { name: 'number' },
							},
							inline: {
								defaultValue: null,
								description: '',
								name: 'inline',
								required: !1,
								type: { name: 'true' },
							},
							alignCenter: {
								defaultValue: null,
								description: '',
								name: 'alignCenter',
								required: !1,
								type: { name: 'true' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/shared/Spinner.tsx#Spinner'
						] = {
							docgenInfo: Spinner.__docgenInfo,
							name: 'Spinner',
							path: 'client/components/shared/Spinner.tsx#Spinner',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/shared/WithStandardTopMargin.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			'use strict';
			__webpack_require__.d(__webpack_exports__, {
				z: () => WithStandardTopMargin,
			});
			var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
				__webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				);
			var _ref = { name: 'kmzqzw', styles: 'margin-top:1.8125rem' },
				WithStandardTopMargin = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
						'div',
						{ css: _ref, children: props.children },
					);
			try {
				(WithStandardTopMargin.displayName = 'WithStandardTopMargin'),
					(WithStandardTopMargin.__docgenInfo = {
						description: '',
						displayName: 'WithStandardTopMargin',
						props: {},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/shared/WithStandardTopMargin.tsx#WithStandardTopMargin'
						] = {
							docgenInfo: WithStandardTopMargin.__docgenInfo,
							name: 'WithStandardTopMargin',
							path: 'client/components/shared/WithStandardTopMargin.tsx#WithStandardTopMargin',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/utilities/fetch.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			'use strict';
			__webpack_require__.d(__webpack_exports__, {
				H6: () => addCSRFToken,
				Jl: () => deleteRequest,
				n4: () => fetchWithDefaultParameters,
				Ll: () => patchRequest,
				j0: () => postRequest,
				GH: () => putRequest,
			});
			var js_cookie = __webpack_require__(
					'./node_modules/js-cookie/src/js.cookie.js',
				),
				js_cookie_default = __webpack_require__.n(js_cookie),
				csurf = __webpack_require__('./node_modules/csurf/index.js');
			__webpack_require__.n(csurf)()({
				cookie: {
					key: '_csrf',
					sameSite: !0,
					secure: !0,
					httpOnly: !0,
				},
			});
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
			var fetchDefaultParameters = {
					credentials: 'include',
					mode: 'same-origin',
				},
				getOptionsForMethod = (method) => (payload) => ({
					method,
					headers: { 'Content-Type': 'application/json' },
					body: payload ? JSON.stringify(payload) : void 0,
				}),
				addCSRFToken = (options) => {
					var token = js_cookie_default().get('XSRF-TOKEN');
					if (!token) return options;
					var headers = _objectSpread(
						_objectSpread({}, options.headers),
						{},
						{ 'csrf-token': token },
					);
					return _objectSpread(
						_objectSpread({}, options),
						{},
						{ headers },
					);
				},
				postRequest = getOptionsForMethod('POST'),
				patchRequest = getOptionsForMethod('PATCH'),
				deleteRequest = getOptionsForMethod('DELETE'),
				putRequest = getOptionsForMethod('PUT'),
				fetchWithDefaultParameters = (url, options) =>
					fetch(
						url,
						_objectSpread(
							_objectSpread({}, fetchDefaultParameters),
							options,
						),
					);
		},
		'?1c38': () => {},
		'?e84b': () => {},
		'?eee3': () => {},
		'?596d': () => {},
	},
]);
