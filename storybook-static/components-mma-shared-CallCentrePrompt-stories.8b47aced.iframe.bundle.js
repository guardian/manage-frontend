(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[3534],
	{
		'./node_modules/@guardian/source-development-kitchen/dist/react-components/summary/InfoSummary.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				'use strict';
				__webpack_require__.d(__webpack_exports__, {
					w: () => InfoSummary,
				});
				var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
						__webpack_require__(
							'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
						),
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/__deprecated__/colour/palette.js',
						),
					_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_3__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgInfoRound.js',
						),
					_styles_js__WEBPACK_IMPORTED_MODULE_1__ =
						__webpack_require__(
							'./node_modules/@guardian/source-development-kitchen/dist/react-components/summary/styles.js',
						);
				const InfoSummary = ({
					message,
					context,
					cssOverrides,
					...props
				}) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.BX)(
						'div',
						{
							css: [
								(0, _styles_js__WEBPACK_IMPORTED_MODULE_1__.eZ)(
									_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
										.UQ[500],
								),
								cssOverrides,
							],
							...props,
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
									'div',
									{
										css: (0,
										_styles_js__WEBPACK_IMPORTED_MODULE_1__.$b)(
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
												.UQ[500],
										),
										children: (0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
											_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_3__.r,
											{},
										),
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.BX)(
									'div',
									{
										css: _styles_js__WEBPACK_IMPORTED_MODULE_1__._h,
										children: [
											(0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
												'div',
												{
													css: (0,
													_styles_js__WEBPACK_IMPORTED_MODULE_1__.W_)(
														_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
															.fL.primary,
													),
													children: message,
												},
											),
											context &&
												(0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
													'div',
													{
														css: _styles_js__WEBPACK_IMPORTED_MODULE_1__.vl,
														children: context,
													},
												),
										],
									},
								),
							],
						},
					);
			},
		'./node_modules/@guardian/source-development-kitchen/dist/react-components/summary/styles.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				'use strict';
				__webpack_require__.d(__webpack_exports__, {
					$b: () => iconStyles,
					W_: () => messageStyles,
					_h: () => messageWrapperStyles,
					eZ: () => wrapperStyles,
					vl: () => contextStyles,
				});
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
							'./node_modules/@guardian/source/dist/foundations/__generated__/size.js',
						),
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
						);
				const wrapperStyles = (
						color,
					) => _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	border: 2px solid ${color};
	border-radius: 4px;
	padding: ${_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__.D[1]}px;
	display: flex;
`,
					iconStyles = (
						color,
					) => _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	display: flex;
	flex: 0 1 auto;
	margin-top: 1px;
	svg {
		fill: ${color};
		height: ${_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.dp.xsmall}px;
		width: ${_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.dp.xsmall}px;
	}
`,
					messageStyles = (
						color,
						isBold = !0,
					) => _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	${
		isBold
			? _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__.Rcn
			: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__.Kz0
	};
	line-height: 1.4;
	color: ${color};
`,
					messageWrapperStyles = _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	margin-left: ${_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__.D[1]}px;
`,
					contextStyles = _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	${_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__.Kz0};
`;
			},
		'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgInfoRound.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				'use strict';
				__webpack_require__.d(__webpack_exports__, {
					r: () => SvgInfoRound,
				});
				var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
						__webpack_require__(
							'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
						),
					_emotion_react__WEBPACK_IMPORTED_MODULE_2__ =
						__webpack_require__(
							'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
						),
					_foundations_accessibility_visually_hidden_js__WEBPACK_IMPORTED_MODULE_3__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/accessibility/visually-hidden.js',
						),
					_foundations_generated_size_js__WEBPACK_IMPORTED_MODULE_1__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/__generated__/size.js',
						);
				const Svg = ({ size, theme }) =>
						(0,
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
							'svg',
							{
								width: size
									? _foundations_generated_size_js__WEBPACK_IMPORTED_MODULE_1__
											.EA[size]
									: void 0,
								height: void 0,
								viewBox: '-3 -3 30 30',
								xmlns: 'http://www.w3.org/2000/svg',
								focusable: !1,
								'aria-hidden': !0,
								children: (0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
									'path',
									{
										d: 'M12 2C6.467 2 2 6.467 2 12s4.467 10 10 10 10-4.467 10-10S17.533 2 12 2m1.133 13.933v.49c-.11.088-.266.155-.422.244a13 13 0 0 1-.511.2 2.4 2.4 0 0 1-.533.133 4 4 0 0 1-.511.044c-.356 0-.578-.066-.712-.2a.58.58 0 0 1-.222-.444c0-.178.022-.356.045-.533.022-.178.066-.356.11-.578l.934-4.245-.867-.2v-.466c.134-.045.312-.111.556-.178.222-.067.467-.111.733-.156.267-.044.511-.088.756-.11.244-.023.467-.045.667-.045l.244.155-1.244 5.89zm.423-7.466c-.2.177-.49.266-.823.266q-.465 0-.8-.266a.88.88 0 0 1-.31-.69c0-.31.11-.555.31-.733q.3-.266.8-.266c.356 0 .623.089.823.266s.31.423.31.734c-.022.289-.11.51-.31.689',
										fill: theme?.fill,
									},
								),
							},
						),
					SvgInfoRound = ({
						size,
						theme,
						isAnnouncedByScreenReader = !1,
					}) =>
						(0,
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.BX)(
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.HY,
							{
								children: [
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
										Svg,
										{ size, theme },
									),
									isAnnouncedByScreenReader
										? (0,
										  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
												'span',
												{
													css: _emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv`
					${_foundations_accessibility_visually_hidden_js__WEBPACK_IMPORTED_MODULE_3__.j}
				`,
													children: 'Information',
												},
										  )
										: '',
								],
							},
						);
			},
		'./client/components/mma/shared/CallCentrePrompt.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			'use strict';
			__webpack_require__.d(__webpack_exports__, {
				r: () => CallCentrePrompt,
			});
			var _guardian_source_react_components__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/stack/Stack.js',
					),
				_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_5__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/link/ButtonLink.js',
					),
				_guardian_source_development_kitchen_react_components__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./node_modules/@guardian/source-development-kitchen/dist/react-components/summary/InfoSummary.js',
					),
				react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./node_modules/react/index.js',
				),
				_client_components_shared_CallCenterEmailAndNumbers__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./client/components/shared/CallCenterEmailAndNumbers.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				CallCentrePrompt = () => {
					var [
						showCallCentreNumbers,
						setCallCentreNumbersVisibility,
					] = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1);
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.BX)(
						_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_3__.K,
						{
							space: 3,
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
									_guardian_source_development_kitchen_react_components__WEBPACK_IMPORTED_MODULE_4__.w,
									{
										message: 'Changed address?',
										context: (0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.BX)(
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.HY,
											{
												children: [
													'Please',
													' ',
													(0,
													_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
														_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_5__.Z,
														{
															onClick: () =>
																setCallCentreNumbersVisibility(
																	!showCallCentreNumbers,
																),
															children:
																'call our customer support team',
														},
													),
													' ',
													'to update your delivery details.',
												],
											},
										),
									},
								),
								showCallCentreNumbers &&
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
										_client_components_shared_CallCenterEmailAndNumbers__WEBPACK_IMPORTED_MODULE_1__.K,
										{},
									),
							],
						},
					);
				};
		},
		'./client/components/mma/shared/CallCentrePrompt.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			'use strict';
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					Default: () => Default,
					Expanded: () => Expanded,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => __WEBPACK_DEFAULT_EXPORT__,
				});
			var _storybook_test__WEBPACK_IMPORTED_MODULE_0__ =
				__webpack_require__(
					'./node_modules/@storybook/test/dist/index.mjs',
				);
			function asyncGeneratorStep(
				gen,
				resolve,
				reject,
				_next,
				_throw,
				key,
				arg,
			) {
				try {
					var info = gen[key](arg),
						value = info.value;
				} catch (error) {
					return void reject(error);
				}
				info.done
					? resolve(value)
					: Promise.resolve(value).then(_next, _throw);
			}
			const __WEBPACK_DEFAULT_EXPORT__ = {
				component: __webpack_require__(
					'./client/components/mma/shared/CallCentrePrompt.tsx',
				).r,
				title: 'Components/CallCentrePrompt',
			};
			var _ref2,
				Default = {},
				Expanded = {
					play:
						((_ref2 = (function _asyncToGenerator(fn) {
							return function () {
								var self = this,
									args = arguments;
								return new Promise(function (resolve, reject) {
									var gen = fn.apply(self, args);
									function _next(value) {
										asyncGeneratorStep(
											gen,
											resolve,
											reject,
											_next,
											_throw,
											'next',
											value,
										);
									}
									function _throw(err) {
										asyncGeneratorStep(
											gen,
											resolve,
											reject,
											_next,
											_throw,
											'throw',
											err,
										);
									}
									_next(void 0);
								});
							};
						})(function* (_ref) {
							var { canvasElement } = _ref,
								buttonLink = (0,
								_storybook_test__WEBPACK_IMPORTED_MODULE_0__.uh)(
									canvasElement,
								).getByText('call our customer support team');
							yield _storybook_test__WEBPACK_IMPORTED_MODULE_0__.mV.click(
								buttonLink,
							);
						})),
						function play(_x) {
							return _ref2.apply(this, arguments);
						}),
				};
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
				(Expanded.parameters = {
					...Expanded.parameters,
					docs: {
						...Expanded.parameters?.docs,
						source: {
							originalSource:
								"{\n  play: async ({\n    canvasElement\n  }: {\n    canvasElement: HTMLElement;\n  }) => {\n    const canvas = within(canvasElement);\n    const buttonLink = canvas.getByText('call our customer support team');\n    await userEvent.click(buttonLink);\n  }\n}",
							...Expanded.parameters?.docs?.source,
						},
					},
				});
			const __namedExportsOrder = ['Default', 'Expanded'];
		},
		'./node_modules/@storybook/instrumenter/dist sync recursive': (
			module,
		) => {
			function webpackEmptyContext(req) {
				var e = new Error("Cannot find module '" + req + "'");
				throw ((e.code = 'MODULE_NOT_FOUND'), e);
			}
			(webpackEmptyContext.keys = () => []),
				(webpackEmptyContext.resolve = webpackEmptyContext),
				(webpackEmptyContext.id =
					'./node_modules/@storybook/instrumenter/dist sync recursive'),
				(module.exports = webpackEmptyContext);
		},
		'./node_modules/@storybook/test/dist sync recursive': (module) => {
			function webpackEmptyContext(req) {
				var e = new Error("Cannot find module '" + req + "'");
				throw ((e.code = 'MODULE_NOT_FOUND'), e);
			}
			(webpackEmptyContext.keys = () => []),
				(webpackEmptyContext.resolve = webpackEmptyContext),
				(webpackEmptyContext.id =
					'./node_modules/@storybook/test/dist sync recursive'),
				(module.exports = webpackEmptyContext);
		},
	},
]);
//# sourceMappingURL=components-mma-shared-CallCentrePrompt-stories.8b47aced.iframe.bundle.js.map
