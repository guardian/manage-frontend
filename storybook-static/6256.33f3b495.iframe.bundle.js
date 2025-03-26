'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[6256],
	{
		'./client/components/mma/shared/DateInput.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { W: () => DateInput });
			var _emotion_react__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			var inputBoxCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__.Kz0,
					';border:0;width:50px;appearance:textfield;text-align:center;padding:0;margin:0;',
					'',
				),
				dayMonthCss = { name: '1qqgwnj', styles: 'width:25px' },
				dividerCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__.Kz0,
					';display:inline-block;padding:0;margin:0;',
					'',
				),
				DateInput = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.BX)(
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.HY,
						{
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.BX)(
									'div',
									{
										css: (0,
										_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__.AjP,
											';',
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
												.C4.desktop,
											'{display:none;}',
											'',
										),
										children: [
											props.labelText,
											(0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
												'br',
												{},
											),
										],
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.BX)(
									'fieldset',
									{
										css: (0,
										_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
											'border:1px solid ',
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
												.palette.neutral[86],
											';padding:5px;white-space:nowrap;margin:0;',
											'',
										),
										'aria-describedby':
											'validation-message',
										disabled: props.disabled,
										children: [
											(0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
												'input',
												{
													css: (0,
													_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
														inputBoxCss,
														';',
														dayMonthCss,
														';',
														'',
													),
													'aria-label': 'day',
													value: props.date.getDate(),
													readOnly: !0,
												},
											),
											(0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
												'div',
												{
													css: dividerCss,
													children: '/',
												},
											),
											(0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
												'input',
												{
													css: (0,
													_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
														inputBoxCss,
														';',
														dayMonthCss,
														';',
														'',
													),
													'aria-label': 'month',
													value:
														props.date.getMonth() +
														1,
													readOnly: !0,
												},
											),
											(0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
												'div',
												{
													css: dividerCss,
													children: '/',
												},
											),
											(0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
												'input',
												{
													css: inputBoxCss,
													'aria-label': 'year',
													value: props.date.getFullYear(),
													readOnly: !0,
												},
											),
										],
									},
								),
							],
						},
					);
			try {
				(DateInput.displayName = 'DateInput'),
					(DateInput.__docgenInfo = {
						description: '',
						displayName: 'DateInput',
						props: {
							date: {
								defaultValue: null,
								description: '',
								name: 'date',
								required: !0,
								type: { name: 'Date' },
							},
							labelText: {
								defaultValue: null,
								description: '',
								name: 'labelText',
								required: !0,
								type: { name: 'string' },
							},
							disabled: {
								defaultValue: null,
								description: '',
								name: 'disabled',
								required: !1,
								type: { name: 'boolean' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/DateInput.tsx#DateInput'
						] = {
							docgenInfo: DateInput.__docgenInfo,
							name: 'DateInput',
							path: 'client/components/mma/shared/DateInput.tsx#DateInput',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
	},
]);
