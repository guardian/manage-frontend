'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[4093],
	{
		'./client/components/mma/shared/assets/InfoIconDark.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				J: () => InfoIconDark,
			});
			var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
				__webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				);
			var _ref = { name: '40f4ru', styles: 'vertical-align:top' },
				InfoIconDark = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
						'svg',
						{
							width: props.size || '17',
							height: props.size || '17',
							viewBox: '0 0 17 17',
							fill: 'none',
							css: _ref,
							children: (0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
								'path',
								{
									d: 'M8.5 0C3.79667 0 0 3.79667 0 8.5C0 13.2033 3.79667 17 8.5 17C13.2033 17 17 13.2033 17 8.5C17 3.79667 13.2033 0 8.5 0ZM9.46333 11.8433V12.2589C9.36889 12.3344 9.23667 12.3911 9.10444 12.4667C8.97222 12.5233 8.82111 12.58 8.67 12.6367C8.51889 12.6933 8.36778 12.7311 8.21667 12.75C8.06556 12.7689 7.91444 12.7878 7.78222 12.7878C7.48 12.7878 7.29111 12.7311 7.17778 12.6178C7.04556 12.5044 6.98889 12.3722 6.98889 12.24C6.98889 12.0889 7.00778 11.9378 7.02667 11.7867C7.04556 11.6356 7.08333 11.4844 7.12111 11.2956L7.91444 7.68778L7.17778 7.51778V7.12111C7.29111 7.08333 7.44222 7.02667 7.65 6.97C7.83889 6.91333 8.04667 6.87556 8.27333 6.83778C8.5 6.8 8.70778 6.76222 8.91556 6.74333C9.12333 6.72444 9.31222 6.70556 9.48222 6.70556L9.69 6.83778L8.63222 11.8433H9.46333ZM9.82222 5.49667C9.65222 5.64778 9.40667 5.72333 9.12333 5.72333C8.85889 5.72333 8.63222 5.64778 8.44333 5.49667C8.27333 5.34556 8.17889 5.15667 8.17889 4.91111C8.17889 4.64667 8.27333 4.43889 8.44333 4.28778C8.61333 4.13667 8.84 4.06111 9.12333 4.06111C9.42556 4.06111 9.65222 4.13667 9.82222 4.28778C9.99222 4.43889 10.0867 4.64667 10.0867 4.91111C10.0678 5.15667 9.99222 5.34556 9.82222 5.49667Z',
									fill: props.fillColor || '#333333',
								},
							),
						},
					);
			try {
				(InfoIconDark.displayName = 'InfoIconDark'),
					(InfoIconDark.__docgenInfo = {
						description: '',
						displayName: 'InfoIconDark',
						props: {
							fillColor: {
								defaultValue: null,
								description: '',
								name: 'fillColor',
								required: !1,
								type: { name: 'string' },
							},
							size: {
								defaultValue: null,
								description: '',
								name: 'size',
								required: !1,
								type: { name: 'number' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/assets/InfoIconDark.tsx#InfoIconDark'
						] = {
							docgenInfo: InfoIconDark.__docgenInfo,
							name: 'InfoIconDark',
							path: 'client/components/mma/shared/assets/InfoIconDark.tsx#InfoIconDark',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/shared/Input.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { I: () => Input });
			var _emotion_react__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_6__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/accessibility/focus-halo.js',
					),
				react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./node_modules/react/index.js',
				),
				_mma_shared_assets_ErrorIcon__WEBPACK_IMPORTED_MODULE_5__ =
					__webpack_require__(
						'./client/components/mma/shared/assets/ErrorIcon.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			var _ref = { name: 'qamjgr', styles: 'margin-right:4px' },
				Input = (props) => {
					var inputEl = (0,
					react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
					return (
						(0,
						react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
							var _inputEl$current;
							props.setFocus &&
								(null ===
									(_inputEl$current = inputEl.current) ||
									void 0 === _inputEl$current ||
									_inputEl$current.focus());
						}, [props.setFocus]),
						(0,
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
							'label',
							{
								css: (0,
								_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
									'display:block;color:',
									_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
										.palette.neutral[7],
									';',
									_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__.Kz0,
									';font-weight:bold;',
									props.additionalCss,
									';',
									'',
								),
								'data-qm-masking': 'blocklist',
								children: [
									props.label,
									props.optional &&
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
											'span',
											{
												css: (0,
												_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
													'font-style:italic;font-weight:normal;color:',
													_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
														.palette.neutral[46],
													';',
													'',
												),
												children: [' ', 'optional'],
											},
										),
									props.secondaryLabel &&
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
											'span',
											{
												css: (0,
												_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
													'display:block;font-weight:normal;color:',
													_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
														.palette.neutral[46],
													';max-width:',
													props.width,
													'ch;',
													'',
												),
												children: props.secondaryLabel,
											},
										),
									props.inErrorState &&
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
											'span',
											{
												css: (0,
												_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
													'display:block;font-weight:normal;color:',
													_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
														.palette.error[400],
													';',
													'',
												),
												children: [
													(0,
													_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
														_mma_shared_assets_ErrorIcon__WEBPACK_IMPORTED_MODULE_5__.P,
														{ additionalCss: _ref },
													),
													props.errorMessage,
												],
											},
										),
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
										'div',
										{
											children: [
												props.prefixValue &&
													(0,
													_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
														'span',
														{
															css: (0,
															_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
																_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__.Kz0,
																';position:relative;z-index:2;left:1ch;',
																'',
															),
															children:
																props.prefixValue,
														},
													),
												(0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
													'input',
													{
														type:
															props.type ||
															'text',
														name: props.name,
														id: props.id,
														step: props.step,
														min: props.min,
														value: props.value,
														ref: inputEl,
														onChange: (e) =>
															props.changeSetState &&
															props.changeSetState(
																''.concat(
																	'number' ===
																		props.type
																		? e
																				.target
																				.valueAsNumber
																		: e
																				.target
																				.value,
																),
															),
														onFocus: (e) =>
															props.onFocus &&
															props.onFocus(e),
														css: (0,
														_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
															'width:',
															props.prefixValue
																? 'calc(100% - 4px)'
																: '100%',
															';max-width:',
															props.width,
															'ch;height:44px;',
															_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__.Kz0,
															';color:',
															_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
																.palette
																.neutral[7],
															';margin-top:4px;padding:0 8px;background-color:',
															_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
																.palette
																.neutral[100],
															';border:',
															props.inErrorState
																? 4
																: 2,
															'px solid ',
															props.inErrorState
																? _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
																		.palette
																		.error[400]
																: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
																		.palette
																		.neutral[60],
															';',
															props.prefixValue &&
																'\n            margin-left: calc(-'
																	.concat(
																		props
																			.prefixValue
																			.length,
																		'ch + 4px);\n            box-sizing: border-box;\n            padding-left: calc(',
																	)
																	.concat(
																		props
																			.prefixValue
																			.length,
																		'ch + 10px);\n          ',
																	),
															' &:focus{',
															_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_6__.y,
															';}',
															'',
														),
													},
												),
											],
										},
									),
								],
							},
						)
					);
				};
			try {
				(Input.displayName = 'Input'),
					(Input.__docgenInfo = {
						description: '',
						displayName: 'Input',
						props: {
							type: {
								defaultValue: null,
								description: '',
								name: 'type',
								required: !1,
								type: { name: 'string' },
							},
							step: {
								defaultValue: null,
								description: '',
								name: 'step',
								required: !1,
								type: { name: 'string' },
							},
							min: {
								defaultValue: null,
								description: '',
								name: 'min',
								required: !1,
								type: { name: 'string' },
							},
							label: {
								defaultValue: null,
								description: '',
								name: 'label',
								required: !0,
								type: { name: 'string' },
							},
							secondaryLabel: {
								defaultValue: null,
								description: '',
								name: 'secondaryLabel',
								required: !1,
								type: { name: 'string' },
							},
							width: {
								defaultValue: null,
								description: '',
								name: 'width',
								required: !0,
								type: { name: 'number' },
							},
							value: {
								defaultValue: null,
								description: '',
								name: 'value',
								required: !0,
								type: { name: 'string | number' },
							},
							optional: {
								defaultValue: null,
								description: '',
								name: 'optional',
								required: !1,
								type: { name: 'boolean' },
							},
							name: {
								defaultValue: null,
								description: '',
								name: 'name',
								required: !1,
								type: { name: 'string' },
							},
							id: {
								defaultValue: null,
								description: '',
								name: 'id',
								required: !1,
								type: { name: 'string' },
							},
							changeSetState: {
								defaultValue: null,
								description: '',
								name: 'changeSetState',
								required: !1,
								type: { name: 'SetStateFunc' },
							},
							onFocus: {
								defaultValue: null,
								description: '',
								name: 'onFocus',
								required: !1,
								type: {
									name: '((e: FocusEvent<HTMLInputElement, Element>) => void)',
								},
							},
							setFocus: {
								defaultValue: null,
								description: '',
								name: 'setFocus',
								required: !1,
								type: { name: 'boolean' },
							},
							inErrorState: {
								defaultValue: null,
								description: '',
								name: 'inErrorState',
								required: !1,
								type: { name: 'boolean' },
							},
							errorMessage: {
								defaultValue: null,
								description: '',
								name: 'errorMessage',
								required: !1,
								type: { name: 'string' },
							},
							prefixValue: {
								defaultValue: null,
								description: '',
								name: 'prefixValue',
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
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/shared/Input.tsx#Input'
						] = {
							docgenInfo: Input.__docgenInfo,
							name: 'Input',
							path: 'client/components/shared/Input.tsx#Input',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
	},
]);
