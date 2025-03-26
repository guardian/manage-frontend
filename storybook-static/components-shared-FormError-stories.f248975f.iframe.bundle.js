'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[908],
	{
		'./client/components/mma/shared/assets/ErrorIcon.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { P: () => ErrorIcon });
			var _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__deprecated__/colour/palette.js',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				ErrorIcon = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
						'svg',
						{
							width: '21',
							height: '17',
							viewBox: '0 0 21 17',
							fill: 'none',
							css: props.additionalCss,
							children: (0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
								'path',
								{
									fillRule: 'evenodd',
									clipRule: 'evenodd',
									d: 'M9.9375 0L0 16.1095L0.6375 17H20.3625L21 16.1095L11.0625 0H9.9375ZM9.87661 11.5012H11.1234L11.7162 4.96907L10.8986 4.28147H10.1015L9.28386 4.96907L9.87661 11.5012ZM10.5 12.7045C11.1689 12.7045 11.7162 13.246 11.7162 13.9078C11.7162 14.5696 11.1689 15.1111 10.5 15.1111C9.83114 15.1111 9.28386 14.5696 9.28386 13.9078C9.28386 13.246 9.83114 12.7045 10.5 12.7045Z',
									fill:
										props.fill ||
										(props.downgradeToWarning
											? _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
													.A5[300]
											: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
													.r[400]),
								},
							),
						},
					);
			try {
				(ErrorIcon.displayName = 'ErrorIcon'),
					(ErrorIcon.__docgenInfo = {
						description: '',
						displayName: 'ErrorIcon',
						props: {
							fill: {
								defaultValue: null,
								description: '',
								name: 'fill',
								required: !1,
								type: { name: 'string' },
							},
							additionalCss: {
								defaultValue: null,
								description: '',
								name: 'additionalCss',
								required: !1,
								type: { name: 'SerializedStyles' },
							},
							downgradeToWarning: {
								defaultValue: null,
								description: '',
								name: 'downgradeToWarning',
								required: !1,
								type: { name: 'true' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/assets/ErrorIcon.tsx#ErrorIcon'
						] = {
							docgenInfo: ErrorIcon.__docgenInfo,
							name: 'ErrorIcon',
							path: 'client/components/mma/shared/assets/ErrorIcon.tsx#ErrorIcon',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/shared/FormError.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { X: () => FormError });
			var _emotion_react__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				_mma_shared_assets_ErrorIcon__WEBPACK_IMPORTED_MODULE_5__ =
					__webpack_require__(
						'./client/components/mma/shared/assets/ErrorIcon.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			var dlStyles = (0, _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'position:relative;padding:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[5],
					'px ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[5],
					'px ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[5],
					'px 50px;',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.Kz0,
					';border:4px solid ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.palette.error[400],
					';',
					'',
				),
				iStyles = (0, _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'position:absolute;top:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[5],
					'px;left:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[5],
					'px;',
					'',
				),
				dtStyles = { name: '1efi8gv', styles: 'font-weight:bold' },
				ddStyles = { name: 'ti75j2', styles: 'margin:0' },
				ulStyles = {
					name: 'z06qs',
					styles: 'list-style:none;margin:0;padding:0',
				},
				FormError = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.BX)(
						'dl',
						{
							css: dlStyles,
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
									'i',
									{
										css: iStyles,
										children: (0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
											_mma_shared_assets_ErrorIcon__WEBPACK_IMPORTED_MODULE_5__.P,
											{},
										),
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
									'dt',
									{ css: dtStyles, children: props.title },
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
									'dd',
									{
										css: ddStyles,
										children: (0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
											'ul',
											{
												css: ulStyles,
												children: props.messages.map(
													(msg, index) =>
														(0,
														_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
															'li',
															{ children: msg },
															'feli-'.concat(
																index,
															),
														),
												),
											},
										),
									},
								),
							],
						},
					);
			try {
				(FormError.displayName = 'FormError'),
					(FormError.__docgenInfo = {
						description: '',
						displayName: 'FormError',
						props: {
							title: {
								defaultValue: null,
								description: '',
								name: 'title',
								required: !1,
								type: { name: 'string' },
							},
							messages: {
								defaultValue: null,
								description: '',
								name: 'messages',
								required: !0,
								type: {
									name: '(string | ReactElement<any, string | JSXElementConstructor<any>>)[]',
								},
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/shared/FormError.tsx#FormError'
						] = {
							docgenInfo: FormError.__docgenInfo,
							name: 'FormError',
							path: 'client/components/shared/FormError.tsx#FormError',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/shared/FormError.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					Default: () => Default,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => __WEBPACK_DEFAULT_EXPORT__,
				});
			var _FormError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./client/components/shared/FormError.tsx',
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
				title: 'Components/FormError',
				component: _FormError__WEBPACK_IMPORTED_MODULE_0__.X,
				args: {
					title: 'Something went wrong when submitting your form',
					messages: [
						'Please try again or if the problem persists please contact Customer Service',
					],
				},
			};
			var Default = {
				render: (args) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
						_FormError__WEBPACK_IMPORTED_MODULE_0__.X,
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
			};
			Default.parameters = {
				...Default.parameters,
				docs: {
					...Default.parameters?.docs,
					source: {
						originalSource: '{\n  render: Template\n}',
						...Default.parameters?.docs?.source,
					},
				},
			};
			const __namedExportsOrder = ['Default'];
		},
	},
]);
