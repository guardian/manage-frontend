'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[3245],
	{
		'./client/components/mma/shared/ProgressStepper.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				S: () => ProgressStepper,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				_assets_TickInCircle__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./client/components/mma/shared/assets/TickInCircle.tsx',
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
			var NumberedBullet = (_ref4) => {
					var {
						stepNumber,
						isCurrentStep,
						backgroundColor,
						copyColor,
						withBorder,
					} = _ref4;
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
						'div',
						{
							css: [
								(0,
								_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
									_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__.U8s,
									';color:',
									copyColor ||
										_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
											.palette.neutral[100],
									';width:24px;height:24px;background-color:',
									backgroundColor,
									';border-radius:50%;display:flex;justify-content:center;align-items:center;',
									'',
								),
								isCurrentStep &&
									(0,
									_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
										'outline:2px solid ',
										_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
											.palette.neutral[100],
										';box-shadow:0 0 0 4px ',
										backgroundColor,
										';z-index:1;',
										'',
									),
								!isCurrentStep &&
									withBorder &&
									(0,
									_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
										'border:2px solid ',
										copyColor ||
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
												.palette.neutral[100],
										';',
										'',
									),
								'',
								'',
							],
							children: stepNumber,
						},
					);
				},
				_ref2 = { name: 'rrel8y', styles: 'width:24px;height:24px' },
				_ref3 = { name: '1soh0gv', styles: 'margin-top:4px' },
				Step = (_ref5) => {
					var { step, currentStep, index } = _ref5,
						isFutureStep = index > currentStep,
						futureStepProps = {};
					return (
						isFutureStep &&
							((futureStepProps.copyColor =
								_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__.palette.neutral[46]),
							(futureStepProps.withBorder = !0)),
						(0,
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
							'div',
							{
								css: (0,
								_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
									_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__.U8s,
									';z-index:1;width:24px;',
									index > 0
										? 'display: flex; flex-direction: column; align-items: center;'
										: '',
									';',
									'',
								),
								children: [
									step.title &&
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
											'span',
											{
												css: (0,
												_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
													_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__.zlp,
													';',
													'',
												),
												children: step.title,
											},
										),
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
										'div',
										{
											css: [
												!!step.title && _ref3,
												'',
												'',
											],
											children:
												index < currentStep ||
												step.forceStepComplete
													? (0,
													  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
															_assets_TickInCircle__WEBPACK_IMPORTED_MODULE_0__.G,
															{
																fill: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
																	.palette
																	.brand[400],
																additionalCss:
																	_ref2,
															},
													  )
													: (0,
													  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
															NumberedBullet,
															_objectSpread(
																{
																	stepNumber:
																		index +
																		1,
																	isCurrentStep:
																		index ===
																		currentStep,
																	backgroundColor:
																		isFutureStep
																			? _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
																					.palette
																					.neutral[100]
																			: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
																					.palette
																					.brand[400],
																},
																futureStepProps,
															),
													  ),
										},
									),
								],
							},
						)
					);
				},
				_ref = {
					name: '1ubtxge',
					styles: ':before{top:calc(50% + 0.5em + 4px);}',
				},
				ProgressStepper = (_ref6) => {
					var { steps, additionalCSS } = _ref6,
						currentStep =
							steps.findIndex((step) => step.isCurrentStep) || 0,
						completedStepsPercentage =
							(currentStep / (steps.length - 1)) * 100,
						stepsHaveTitles = steps.some((step) => !!step.title);
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
						'div',
						{
							css: [
								(0,
								_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
									"display:flex;justify-content:space-between;max-width:519px;margin-top:10px;position:relative;:before{content:'';position:absolute;top:50%;left:0;z-index:0;transform:translateY(-50%);width:100%;height:2px;background:linear-gradient(\n\t\t\t\t\t\t\tto right,\n\t\t\t\t\t\t\t",
									_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
										.palette.brand[400],
									' ',
									completedStepsPercentage,
									'%,\n\t\t\t\t\t\t\t',
									_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
										.palette.neutral[46],
									' ',
									completedStepsPercentage,
									'%\n\t\t\t\t\t\t);}',
									additionalCSS,
									';',
									'',
								),
								stepsHaveTitles && _ref,
								'',
								'',
							],
							children: steps.map((step, index) =>
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
									Step,
									{ step, currentStep, index },
									'progressStep'.concat(index),
								),
							),
						},
					);
				};
			try {
				(ProgressStepper.displayName = 'ProgressStepper'),
					(ProgressStepper.__docgenInfo = {
						description: '',
						displayName: 'ProgressStepper',
						props: {
							steps: {
								defaultValue: null,
								description: '',
								name: 'steps',
								required: !0,
								type: { name: 'Step[]' },
							},
							selectedStep: {
								defaultValue: null,
								description: '',
								name: 'selectedStep',
								required: !1,
								type: { name: 'number' },
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
							'client/components/mma/shared/ProgressStepper.tsx#ProgressStepper'
						] = {
							docgenInfo: ProgressStepper.__docgenInfo,
							name: 'ProgressStepper',
							path: 'client/components/mma/shared/ProgressStepper.tsx#ProgressStepper',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
	},
]);
