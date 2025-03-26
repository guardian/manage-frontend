'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[6750],
	{
		'./client/components/mma/shared/ProgressIndicator.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				Y: () => ProgressIndicator,
			});
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
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_5__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
					),
				_assets_TickInCircle__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./client/components/mma/shared/assets/TickInCircle.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			var _ref = {
					name: '1lby940',
					styles: 'position:absolute;top:0;right:0',
				},
				_ref2 = {
					name: '41ubps',
					styles: 'position:absolute;top:0;left:50%;transform:translateX(-50%)',
				},
				ProgressIndicator = (props) => {
					var currentStep =
						props.steps.findIndex((step) => step.isCurrentStep) +
							1 || 1;
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
						'div',
						{
							css: (0,
							_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
								"width:100%;max-width:345px;position:relative;:before{content:'';display:block;position:absolute;top:9.5px;left:4px;width:calc(",
								50 * (currentStep - 1),
								'% - 8px);height:5px;background-color:',
								_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
									.palette.brand[500],
								";z-index:-1;}:after{content:'';display:block;position:absolute;top:9.5px;left:calc(4px + ",
								50 * (currentStep - 1),
								'%);width:calc(',
								50 * Math.abs(currentStep - 3),
								'% - 8px);height:2px;background-color:',
								_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
									.palette.neutral[60],
								';z-index:-1;}',
								props.additionalCSS,
								';',
								'',
							),
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
									'div',
									{
										children:
											currentStep > 1
												? (0,
												  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
														_assets_TickInCircle__WEBPACK_IMPORTED_MODULE_0__.G,
														{
															fill: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
																.palette
																.brand[500],
														},
												  )
												: (0,
												  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
														'i',
														{
															css: (0,
															_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
																'display:block;width:22px;height:22px;background-color:',
																_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
																	.palette
																	.brand[500],
																';border-radius:50%;',
																'',
															),
														},
												  ),
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
									'div',
									{
										css: _ref2,
										children:
											currentStep > 2
												? (0,
												  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
														_assets_TickInCircle__WEBPACK_IMPORTED_MODULE_0__.G,
														{
															fill: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
																.palette
																.brand[500],
														},
												  )
												: (0,
												  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
														'i',
														{
															css: (0,
															_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
																'display:block;width:22px;height:22px;background-color:',
																currentStep < 2
																	? _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
																			.palette
																			.neutral[100]
																	: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
																			.palette
																			.brand[500],
																';',
																currentStep < 2
																	? 'border: 1px solid '.concat(
																			_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
																				.palette
																				.neutral[60],
																			';',
																	  )
																	: '',
																' border-radius:50%;',
																'',
															),
														},
												  ),
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
									'div',
									{
										css: _ref,
										children:
											currentStep > 2
												? (0,
												  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
														_assets_TickInCircle__WEBPACK_IMPORTED_MODULE_0__.G,
														{
															fill: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
																.palette
																.brand[500],
														},
												  )
												: (0,
												  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
														'i',
														{
															css: (0,
															_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
																'display:block;width:22px;height:22px;background-color:',
																_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
																	.palette
																	.neutral[100],
																';border:1px solid ',
																_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
																	.palette
																	.neutral[60],
																';border-radius:50%;',
																'',
															),
														},
												  ),
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
									'div',
									{
										css: (0,
										_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
											'display:block;position:relative;',
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__.Kz0,
											';',
											'',
										),
										children: [
											(0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
												'span',
												{
													css: (0,
													_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
														1 === currentStep
															? 'font-weight: bold;'
															: '',
														';',
														'',
													),
													children:
														props.steps[0].title,
												},
											),
											(0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
												'span',
												{
													css: (0,
													_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
														2 === currentStep
															? 'font-weight: bold;'
															: '',
														' white-space:pre;position:absolute;top:0;left:50%;transform:translateX(-50%);',
														_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_5__
															.Dp.tablet,
														'{transform:none;left:calc(50% - 11px);}',
														'',
													),
													children:
														props.steps[1].title,
												},
											),
											(0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
												'span',
												{
													css: (0,
													_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
														3 === currentStep
															? 'font-weight: bold;'
															: '',
														' white-space:pre;position:absolute;top:0;right:0;',
														_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_5__
															.Dp.tablet,
														'{right:auto;left:calc(100% - 22px);}',
														'',
													),
													children:
														props.steps[2].title,
												},
											),
										],
									},
								),
							],
						},
					);
				};
			try {
				(ProgressIndicator.displayName = 'ProgressIndicator'),
					(ProgressIndicator.__docgenInfo = {
						description: '',
						displayName: 'ProgressIndicator',
						props: {
							steps: {
								defaultValue: null,
								description: '',
								name: 'steps',
								required: !0,
								type: { name: '[Step, Step, ...Step[]]' },
							},
							additionalCSS: {
								defaultValue: null,
								description: '',
								name: 'additionalCSS',
								required: !1,
								type: { name: 'SerializedStyles' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/ProgressIndicator.tsx#ProgressIndicator'
						] = {
							docgenInfo: ProgressIndicator.__docgenInfo,
							name: 'ProgressIndicator',
							path: 'client/components/mma/shared/ProgressIndicator.tsx#ProgressIndicator',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/shared/assets/TickInCircle.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				G: () => TickInCircle,
			});
			var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
				__webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				);
			var _ref = { name: '40f4ru', styles: 'vertical-align:top' },
				TickInCircle = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.BX)(
						'svg',
						{
							width: '22',
							height: '22',
							viewBox: '0 0 22 22',
							fill: 'none',
							css: [_ref, props.additionalCss, '', ''],
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
									'circle',
									{
										cx: '11',
										cy: '11',
										r: '11',
										fill: props.fill || '#22874D',
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
									'path',
									{
										d: 'M6.59203 10.8413L6.50369 10.757L6.4173 10.8433L5.91161 11.349L5.83674 11.4239L5.89828 11.5101L8.42673 15.0499L8.46412 15.1022H8.52844H8.76865H8.82169L8.85854 15.0641L16.0899 7.5799L16.1764 7.49042L16.0873 7.40355L15.5816 6.9105L15.4975 6.82848L15.4104 6.90737L8.7709 12.9228L6.59203 10.8413Z',
										fill: 'white',
										stroke: 'white',
										strokeWidth: '0.25',
									},
								),
							],
						},
					);
			try {
				(TickInCircle.displayName = 'TickInCircle'),
					(TickInCircle.__docgenInfo = {
						description: '',
						displayName: 'TickInCircle',
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
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/assets/TickInCircle.tsx#TickInCircle'
						] = {
							docgenInfo: TickInCircle.__docgenInfo,
							name: 'TickInCircle',
							path: 'client/components/mma/shared/assets/TickInCircle.tsx#TickInCircle',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
	},
]);
