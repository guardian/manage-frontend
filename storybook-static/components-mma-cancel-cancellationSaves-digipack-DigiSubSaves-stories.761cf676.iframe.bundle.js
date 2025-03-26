'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[374],
	{
		'./node_modules/@guardian/source-development-kitchen/dist/react-components/summary/ErrorSummary.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					X: () => ErrorSummary,
				});
				var emotion_react_jsx_runtime_browser_esm = __webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
					palette = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__deprecated__/colour/palette.js',
					),
					emotion_react_browser_esm = __webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
					visually_hidden = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/accessibility/visually-hidden.js',
					),
					_generated_size = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/size.js',
					);
				const Svg = ({ size, theme }) =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)('svg', {
							width: size ? _generated_size.EA[size] : void 0,
							height: void 0,
							viewBox: '-3 -3 30 30',
							xmlns: 'http://www.w3.org/2000/svg',
							focusable: !1,
							'aria-hidden': !0,
							children: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)('path', {
								fillRule: 'evenodd',
								clipRule: 'evenodd',
								d: 'M11.41 2 1 19.057l.668.943h20.664l.668-.943L12.59 2zm-.063 12.178h1.306l.621-6.917-.856-.728h-.835l-.857.728zM12 15.452c.7 0 1.274.573 1.274 1.274 0 .7-.573 1.274-1.274 1.274-.7 0-1.274-.573-1.274-1.274 0-.7.573-1.274 1.274-1.274',
								fill: theme?.fill,
							}),
						}),
					SvgAlertTriangle = ({
						size,
						theme,
						isAnnouncedByScreenReader = !1,
					}) =>
						(0, emotion_react_jsx_runtime_browser_esm.BX)(
							emotion_react_jsx_runtime_browser_esm.HY,
							{
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										Svg,
										{ size, theme },
									),
									isAnnouncedByScreenReader
										? (0,
										  emotion_react_jsx_runtime_browser_esm.tZ)(
												'span',
												{
													css: emotion_react_browser_esm.iv`
					${visually_hidden.j}
				`,
													children: 'Warning',
												},
										  )
										: '',
								],
							},
						);
				var styles = __webpack_require__(
					'./node_modules/@guardian/source-development-kitchen/dist/react-components/summary/styles.js',
				);
				const ErrorSummary = ({
					message,
					errorReportUrl,
					context,
					cssOverrides,
					...props
				}) =>
					(0, emotion_react_jsx_runtime_browser_esm.BX)('div', {
						css: [(0, styles.eZ)(palette.vU[400]), cssOverrides],
						...props,
						children: [
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								'div',
								{
									css: (0, styles.$b)(palette.vU[400]),
									children: (0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										SvgAlertTriangle,
										{},
									),
								},
							),
							(0, emotion_react_jsx_runtime_browser_esm.BX)(
								'div',
								{
									css: styles._h,
									children: [
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'div',
											{
												css: (0, styles.W_)(
													palette.vU[400],
												),
												children: message,
											},
										),
										errorReportUrl &&
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'a',
												{
													css: (0, styles.W_)(
														palette.vU[400],
														!1,
													),
													href: errorReportUrl,
													children:
														'Report this error',
												},
											),
										context &&
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'div',
												{
													css: styles.vl,
													children: context,
												},
											),
									],
								},
							),
						],
					});
			},
		'./node_modules/@guardian/source-development-kitchen/dist/react-components/summary/styles.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
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
		'./node_modules/@guardian/source/dist/foundations/utils/supports-queries.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					S: () => appearance,
				});
				const appearance =
					'(appearance: none) or (-webkit-appearance: none) or (-moz-appearance: none)';
			},
		'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgCalendar.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					c: () => SvgCalendar,
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
										fillRule: 'evenodd',
										clipRule: 'evenodd',
										d: 'M5.636 2h1.819v3.636H5.636zm10.91 0h1.818v3.636h-1.819zm4.051 1L22 4.422v16.165l-1.403 1.39L3.403 22 2 20.587V4.422L3.403 3h1.324v3.545h3.637V3h7.272v3.545h3.637V3zM3.818 9.273h16.364v10.909H3.818zm6.364 4.036 1.345-.173v4.773h1.482v-6.363h-.827l-2 .827z',
										fill: theme?.fill,
									},
								),
							},
						),
					SvgCalendar = ({
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
													children: 'Calendar',
												},
										  )
										: '',
								],
							},
						);
			},
		'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgEnvelope.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					j: () => SvgEnvelope,
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
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.BX)(
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
								children: [
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
										'path',
										{
											d: 'M2.571 4 1 5.699l9.952 7.926h2.096L23 5.699 21.429 4z',
											fill: theme?.fill,
										},
									),
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
										'path',
										{
											d: 'M1 17.625v-9.5l9.952 7h2.096l9.952-7v9.5l-1.571 1.5H2.57z',
											fill: theme?.fill,
										},
									),
								],
							},
						),
					SvgEnvelope = ({
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
													children: 'Email',
												},
										  )
										: '',
								],
							},
						);
			},
		'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgGift.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					s: () => SvgGift,
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
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.BX)(
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
								children: [
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
										'path',
										{
											d: 'M5.91 3.763 8.21 1l3.78 4.498L15.77 1l2.299 2.763-3.881 2.21H19.5l1 1.106v5.637h-7.4v-6.19h-2.2v6.19H3.5V7.079l1-1.105h5.291z',
											fill: theme?.fill,
										},
									),
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
										'path',
										{
											d: 'M10.9 15H4v5.804L5.192 22H10.9z',
											fill: theme?.fill,
										},
									),
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
										'path',
										{
											d: 'M20 15h-6.9v7h5.521L20 20.787z',
											fill: theme?.fill,
										},
									),
								],
							},
						),
					SvgGift = ({
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
													children: 'Gift',
												},
										  )
										: '',
								],
							},
						);
			},
		'./node_modules/@guardian/source/dist/react-components/radio/Radio.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, { Y: () => Radio });
				var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ =
						__webpack_require__(
							'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
						),
					react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
						'./node_modules/react/index.js',
					),
					_utils_themes_js__WEBPACK_IMPORTED_MODULE_1__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/react-components/utils/themes.js',
						),
					_styles_js__WEBPACK_IMPORTED_MODULE_4__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/react-components/radio/styles.js',
						),
					_theme_js__WEBPACK_IMPORTED_MODULE_2__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/react-components/radio/theme.js',
						);
				const Radio = ({
					id,
					label: labelContent,
					value,
					supporting,
					checked,
					defaultChecked,
					cssOverrides,
					theme,
					...props
				}) => {
					const defaultId = (0,
						react__WEBPACK_IMPORTED_MODULE_0__.useId)(),
						radioId = id ?? defaultId,
						mergedTheme = (providerTheme) =>
							(0,
							_utils_themes_js__WEBPACK_IMPORTED_MODULE_1__.I)(
								_theme_js__WEBPACK_IMPORTED_MODULE_2__.XK,
								theme,
								providerTheme.radio,
								_theme_js__WEBPACK_IMPORTED_MODULE_2__.wo,
							),
						LabelText = ({ children }) =>
							(0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
								'div',
								{
									css: (providerTheme) =>
										(0,
										_styles_js__WEBPACK_IMPORTED_MODULE_4__.ZP)(
											mergedTheme(providerTheme),
										),
									children,
								},
							),
						SupportingText = ({ children }) =>
							(0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
								'div',
								{
									css: (providerTheme) =>
										(0,
										_styles_js__WEBPACK_IMPORTED_MODULE_4__.ot)(
											mergedTheme(providerTheme),
										),
									children,
								},
							),
						radioControl = (0,
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
							'input',
							{
								id: radioId,
								type: 'radio',
								css: (providerTheme) => [
									(0,
									_styles_js__WEBPACK_IMPORTED_MODULE_4__.k0)(
										mergedTheme(providerTheme),
									),
									cssOverrides,
								],
								value,
								defaultChecked: defaultChecked ?? void 0,
								checked:
									null != checked
										? null != checked
											? checked
											: !!defaultChecked
										: void 0,
								...props,
							},
						),
						labelledRadioControl = (0,
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.BX)(
							'div',
							{
								css: (providerTheme) =>
									(0,
									_styles_js__WEBPACK_IMPORTED_MODULE_4__.Z8)(
										mergedTheme(providerTheme),
									),
								children: [
									radioControl,
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
										'label',
										{
											htmlFor: radioId,
											css: _styles_js__WEBPACK_IMPORTED_MODULE_4__.PS,
											children: supporting
												? (0,
												  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.BX)(
														'div',
														{
															children: [
																(0,
																_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
																	LabelText,
																	{
																		children:
																			labelContent,
																	},
																),
																(0,
																_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
																	SupportingText,
																	{
																		children:
																			supporting,
																	},
																),
															],
														},
												  )
												: (0,
												  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
														LabelText,
														{
															children:
																labelContent,
														},
												  ),
										},
									),
								],
							},
						),
						unlabelledRadioControl = (0,
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
							'div',
							{
								css: (providerTheme) =>
									(0,
									_styles_js__WEBPACK_IMPORTED_MODULE_4__.Z8)(
										mergedTheme(providerTheme),
									),
								children: radioControl,
							},
						);
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.HY,
						{
							children:
								labelContent ?? supporting
									? labelledRadioControl
									: unlabelledRadioControl,
						},
					);
				};
			},
		'./node_modules/@guardian/source/dist/react-components/radio/RadioGroup.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					E: () => RadioGroup,
				});
				var emotion_react_jsx_runtime_browser_esm = __webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
					react = __webpack_require__(
						'./node_modules/react/index.js',
					),
					emotion_react_browser_esm = __webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
					mq = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
					),
					space = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
					);
				const inline = emotion_react_browser_esm.iv`
	overflow: hidden;
`,
					inlineWrapper = emotion_react_browser_esm.iv`
	display: flex;
	flex-wrap: wrap;
`,
					inlineSpace = (number) => emotion_react_browser_esm.iv`
	margin: -${space.D[number] / 2}px;
	> * {
		margin: ${space.D[number] / 2}px;
	}
`;
				var isUndefined = __webpack_require__(
					'./node_modules/@guardian/source/dist/libs/dist/isUndefined/isUndefined.js',
				);
				const Inline = ({
					cssOverrides,
					children,
					space,
					collapseUntil,
					...props
				}) => {
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						'div',
						{
							css: inline,
							children: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)('div', {
								css: [
									inlineWrapper,
									(0, isUndefined.o)(space)
										? ''
										: inlineSpace(space),
									collapseUntil
										? ((breakpoint = collapseUntil),
										  emotion_react_browser_esm.iv`
	${mq.C4[breakpoint]} {
		flex-direction: column;
	}
`)
										: '',
									cssOverrides,
								],
								...props,
								children,
							}),
						},
					);
					var breakpoint;
				};
				var Legend = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/label/Legend.js',
					),
					Stack = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/stack/Stack.js',
					),
					InlineError = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/user-feedback/InlineError.js',
					),
					themes = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/utils/themes.js',
					),
					styles = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/radio/styles.js',
					),
					radio_theme = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/radio/theme.js',
					),
					description_id = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/accessibility/description-id.js',
					);
				const RadioGroup = ({
					id,
					name,
					label,
					hideLabel = !1,
					supporting,
					orientation = 'vertical',
					error,
					cssOverrides,
					children,
					theme,
					...props
				}) => {
					const defaultId = (0, react.useId)(),
						groupId = id ?? defaultId,
						legend = label
							? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
									Legend.D,
									{
										text: label,
										supporting,
										hideLabel,
										theme,
									},
							  )
							: '',
						message =
							error &&
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								InlineError.b,
								{
									id: (0, description_id.S)(groupId),
									theme,
									children: error,
								},
							),
						radioContainers = (0,
						emotion_react_jsx_runtime_browser_esm.tZ)(
							emotion_react_jsx_runtime_browser_esm.HY,
							{
								children: react.Children.map(
									children,
									(child) =>
										(0, react.cloneElement)(
											child,
											Object.assign(
												error
													? {
															'aria-describedby':
																(0,
																description_id.S)(
																	groupId,
																),
													  }
													: {},
												{ name },
											),
										),
								),
							},
						),
						mergedTheme = (providerTheme) =>
							(0, themes.I)(
								radio_theme.Be,
								theme,
								providerTheme.radio,
							);
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						'fieldset',
						{
							'aria-invalid': !!error,
							id: groupId,
							css: (providerTheme) => [
								(0, styles.oB)(mergedTheme(providerTheme)),
								cssOverrides,
							],
							...props,
							children: [
								legend,
								message,
								'vertical' === orientation
									? (0,
									  emotion_react_jsx_runtime_browser_esm.tZ)(
											Stack.K,
											{ children: radioContainers },
									  )
									: (0,
									  emotion_react_jsx_runtime_browser_esm.tZ)(
											Inline,
											{
												space: 5,
												children: radioContainers,
											},
									  ),
							],
						},
					);
				};
			},
		'./node_modules/@guardian/source/dist/react-components/radio/styles.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					PS: () => label,
					Z8: () => radioContainer,
					ZP: () => labelText,
					k0: () => radio,
					oB: () => fieldset,
					ot: () => supportingText,
				});
				var _emotion_react__WEBPACK_IMPORTED_MODULE_0__ =
						__webpack_require__(
							'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
						),
					_foundations_utils_resets_js__WEBPACK_IMPORTED_MODULE_1__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/utils/resets.js',
						),
					_foundations_generated_size_js__WEBPACK_IMPORTED_MODULE_2__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/__generated__/size.js',
						),
					_foundations_generated_space_js__WEBPACK_IMPORTED_MODULE_3__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
						),
					_foundations_animation_transitions_js__WEBPACK_IMPORTED_MODULE_4__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/animation/transitions.js',
						),
					_foundations_accessibility_focus_halo_js__WEBPACK_IMPORTED_MODULE_5__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/accessibility/focus-halo.js',
						),
					_foundations_utils_supports_queries_js__WEBPACK_IMPORTED_MODULE_6__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/utils/supports-queries.js',
						),
					_foundations_generated_typography_js__WEBPACK_IMPORTED_MODULE_7__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
						);
				const fieldset = (
						radio2,
					) => _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	${_foundations_utils_resets_js__WEBPACK_IMPORTED_MODULE_1__.i.fieldset};

	&[aria-invalid='true'] input {
		border: 2px solid ${radio2.borderError};

		&:not(:checked):hover,
		&:active {
			border: 2px solid ${radio2.borderHover};
		}
	}
`,
					radioContainer = (
						radio2,
					) => _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	position: relative;
	display: flex;
	align-items: flex-start;
	/**
	 * Ensure minimum height of 44px by applying 10px padding to top and bottom
	 * of container. This ensures consistent spacing when supporting text present.
	 */
	padding: ${
		(_foundations_generated_size_js__WEBPACK_IMPORTED_MODULE_2__.Cb
			.inputMedium -
			_foundations_generated_size_js__WEBPACK_IMPORTED_MODULE_2__.Cb
				.inputXsmall) /
		2
	}px 0;
	cursor: pointer;

	&:hover {
		input {
			border: 2px solid ${radio2.borderHover};
		}
	}
`,
					label = _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	cursor: pointer;
`,
					radio = (
						radio2,
					) => _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	flex: 0 0 auto;
	cursor: pointer;
	box-sizing: border-box;
	display: inline-block;
	width: ${_foundations_generated_size_js__WEBPACK_IMPORTED_MODULE_2__.bf.inputXsmall}px;
	height: ${_foundations_generated_size_js__WEBPACK_IMPORTED_MODULE_2__.Cb.inputXsmall}px;
	margin: 0 ${_foundations_generated_space_js__WEBPACK_IMPORTED_MODULE_3__.D[2]}px 0 0;

	border: 1px solid currentColor;
	border-radius: 50%;
	position: relative;
	transition: box-shadow ${_foundations_animation_transitions_js__WEBPACK_IMPORTED_MODULE_4__.p.short};
	transition-delay: 0.08s;

	color: ${radio2.borderUnselected};

	&:checked {
		border: 2px solid ${radio2.borderSelected};
		color: ${radio2.fillSelected};
	}

	&:focus {
		${_foundations_accessibility_focus_halo_js__WEBPACK_IMPORTED_MODULE_5__.y};
	}

	/*
	Take care: Emotion extracts @supports blocks and moves them below
	all other <style> elements, making these values hard to override.
	I have chosen to keep these styles in the @supports block as
	moving them out makes radio buttons look horrible on older browsers
	*/
	@supports (${_foundations_utils_supports_queries_js__WEBPACK_IMPORTED_MODULE_6__.S}) {
		appearance: none;
		background-color: ${radio2.fillUnselected};

		&:after {
			background: currentColor;
			position: absolute;
			content: '';
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			border-radius: 50%;
			transform: scale(0);
			transform-origin: center;
			transition: transform ${_foundations_animation_transitions_js__WEBPACK_IMPORTED_MODULE_4__.p.short};
		}

		&:checked {
			&:after {
				transform: scale(0.6);
			}
		}
	}
`,
					labelText = (
						radio2,
					) => _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	${_foundations_generated_typography_js__WEBPACK_IMPORTED_MODULE_7__.Kz0};
	color: ${radio2.textLabel};
	width: 100%;
	margin-top: 1px;
	/* If label text is empty, add additional spacing to align supporting text */
	&:empty {
		margin-top: 2px;
	}
`,
					supportingText = (
						radio2,
					) => _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	${_foundations_generated_typography_js__WEBPACK_IMPORTED_MODULE_7__.VZD};
	color: ${radio2.textSupporting};
`;
			},
		'./node_modules/@guardian/source/dist/react-components/radio/theme.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					Be: () => themeRadioGroup,
					XK: () => themeRadio,
					wo: () => transformProviderTheme,
				});
				var _label_theme_js__WEBPACK_IMPORTED_MODULE_1__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/react-components/label/theme.js',
						),
					_user_feedback_theme_js__WEBPACK_IMPORTED_MODULE_2__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/react-components/user-feedback/theme.js',
						),
					_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
						);
				const themeRadio = {
						borderSelected:
							_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
								.palette.brand[500],
						borderUnselected:
							_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
								.palette.neutral[46],
						borderHover:
							_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
								.palette.brand[500],
						borderError:
							_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
								.palette.error[400],
						fillSelected:
							_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
								.palette.brand[500],
						fillUnselected: 'transparent',
						textLabel:
							_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
								.palette.neutral[7],
						textSupporting:
							_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
								.palette.neutral[46],
					},
					themeRadioGroup = {
						borderHover:
							_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
								.palette.brand[500],
						borderError:
							_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
								.palette.error[400],
						..._label_theme_js__WEBPACK_IMPORTED_MODULE_1__.vy,
					},
					transformProviderTheme =
						(_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
							.palette.neutral[100],
						_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
							.palette.brand[800],
						_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
							.palette.neutral[100],
						_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
							.palette.error[500],
						_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
							.palette.neutral[100],
						_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
							.palette.neutral[100],
						_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
							.palette.brand[800],
						_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
							.palette.neutral[100],
						_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
							.palette.error[500],
						_label_theme_js__WEBPACK_IMPORTED_MODULE_1__.$Q,
						(providerTheme) => {
							const transformedTheme = {};
							return (
								providerTheme?.backgroundChecked &&
									((transformedTheme.fillSelected =
										providerTheme.backgroundChecked),
									(transformedTheme.borderSelected =
										providerTheme.backgroundChecked)),
								providerTheme?.border &&
									(transformedTheme.borderUnselected =
										providerTheme.border),
								providerTheme?.textLabelSupporting &&
									(transformedTheme.textLabel =
										providerTheme.textLabelSupporting),
								{ ...transformedTheme, ...providerTheme }
							);
						});
				_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
					.palette.focus[400],
					_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
						.palette.neutral[60],
					_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
						.palette.focus[400],
					_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
						.palette.neutral[7],
					_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
						.palette.neutral[46],
					_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
						.palette.error[400],
					_label_theme_js__WEBPACK_IMPORTED_MODULE_1__.gn,
					_user_feedback_theme_js__WEBPACK_IMPORTED_MODULE_2__.Fj,
					_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
						.palette.neutral[100],
					_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
						.palette.brand[800],
					_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
						.palette.neutral[100],
					_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
						.palette.neutral[100],
					_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
						.palette.brand[800],
					_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
						.palette.error[500],
					_label_theme_js__WEBPACK_IMPORTED_MODULE_1__.Sz,
					_user_feedback_theme_js__WEBPACK_IMPORTED_MODULE_2__.W4;
			},
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
		'./client/components/mma/shared/benefits/BenefitsStyles.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				TY: () => benefitsButtonCss,
				WH: () => unavailableBenefitsCss,
				fZ: () => benefitsCss,
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
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
					),
				benefitsCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__.Kz0,
					';color:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.neutral[7],
					';list-style:none;margin:0 0 0 -4px;padding:0;li+li{margin-top:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[2],
					'px;}li{display:flex;align-items:flex-start;}svg{flex-shrink:0;margin-right:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[2],
					'px;fill:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.brand[500],
					';}',
					'',
				),
				benefitsButtonCss =
					(_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
						.Dp.tablet,
					(0, _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__.VZD,
						';margin-top:',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
							.D[1],
						'px;padding:0;color:',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
							.palette.brand[500],
						';border-bottom:1px solid ',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
							.palette.brand[500],
						';',
						'',
					)),
				unavailableBenefitsCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'color:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.neutral[46],
					';svg{fill:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.neutral[46],
					';}',
					'',
				);
		},
		'./client/components/mma/upgrade/UpgradeSupportStyles.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { T: () => linkCss });
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
						'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
					),
				linkCss = (0, _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__.Kz0,
					';a{color:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.brand[400],
					';}color:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.brand[400],
					';font-weight:700;text-decoration-line:underline;margin-top:10px;display:flex;justify-content:center;',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__.Dp
						.tablet,
					'{margin-left:20px;}',
					'',
				);
		},
		'./client/components/mma/cancel/cancellationSaves/digipack/DigiSubSaves.stories.tsx':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.r(__webpack_exports__),
					__webpack_require__.d(__webpack_exports__, {
						ConfirmCancellation: () => ConfirmCancellation,
						DigiSubCancellationReason: () =>
							DigiSubCancellationReason,
						DiscountConfirmed: () => DiscountConfirmed,
						EligibleForDiscount: () => EligibleForDiscount,
						IneligibleForDiscount: () => IneligibleForDiscount,
						__namedExportsOrder: () => __namedExportsOrder,
						default: () => DigiSubSaves_stories,
					});
				var http = __webpack_require__(
						'./node_modules/msw/lib/core/http.mjs',
					),
					HttpResponse = __webpack_require__(
						'./node_modules/msw/lib/core/HttpResponse.mjs',
					),
					ReactRouterDecorator = __webpack_require__(
						'./.storybook/ReactRouterDecorator.tsx',
					),
					CancellationContainer = __webpack_require__(
						'./client/components/mma/cancel/CancellationContainer.tsx',
					),
					emotion_react_browser_esm = __webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
					space = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
					),
					typography = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
					mq = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
					),
					palette = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
					Stack = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/stack/Stack.js',
					),
					Button = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/button/Button.js',
					),
					react = __webpack_require__(
						'./node_modules/react/index.js',
					),
					react_router = __webpack_require__(
						'./node_modules/react-router/index.js',
					),
					DefaultApiResponseHandler = __webpack_require__(
						'./client/components/mma/shared/asyncComponents/DefaultApiResponseHandler.tsx',
					),
					BenefitsStyles = __webpack_require__(
						'./client/components/mma/shared/benefits/BenefitsStyles.tsx',
					),
					GenericErrorScreen = __webpack_require__(
						'./client/components/shared/GenericErrorScreen.tsx',
					),
					ButtonStyles = __webpack_require__(
						'./client/styles/ButtonStyles.ts',
					),
					utilities_fetch = __webpack_require__(
						'./client/utilities/fetch.ts',
					),
					productUtils = __webpack_require__(
						'./client/utilities/productUtils.ts',
					),
					productResponse = __webpack_require__(
						'./shared/productResponse.ts',
					),
					emotion_react_jsx_runtime_browser_esm = __webpack_require__(
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
									var res = prim.call(
										input,
										hint || 'default',
									);
									if ('object' != typeof res) return res;
									throw new TypeError(
										'@@toPrimitive must return a primitive value.',
									);
								}
								return ('string' === hint ? String : Number)(
									input,
								);
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
				function _asyncToGenerator(fn) {
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
				}
				var _ref2 = { name: '1x0d6yz', styles: 'padding-top:5px' };
				function GreyBulletpoint() {
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						'svg',
						{
							xmlns: 'http://www.w3.org/2000/svg',
							width: '16',
							height: '17',
							viewBox: '0 0 16 17',
							fill: 'none',
							css: _ref2,
							children: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								'circle',
								{
									cx: '8',
									cy: '8.13672',
									r: '8',
									fill: '#DCDCDC',
								},
							),
						},
					);
				}
				var BenefitsNotAvailable = () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(Stack.K, {
							space: 4,
							cssOverrides: (0, emotion_react_browser_esm.iv)(
								'background-color:#f3f7fe;border-radius:4px;padding:',
								space.D[4],
								'px;',
								'',
							),
							children: (0,
							emotion_react_jsx_runtime_browser_esm.BX)('div', {
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'div',
										{
											css: (0,
											emotion_react_browser_esm.iv)(
												typography.Kie,
												';margin-bottom:',
												space.D[2],
												'px;',
												'',
											),
											children: "Extras you'll lose:",
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'ul',
										{
											css: BenefitsStyles.fZ,
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'li',
													{
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																GreyBulletpoint,
																{},
															),
															'Funding independent journalism',
														],
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'li',
													{
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																GreyBulletpoint,
																{},
															),
															'A regular supporter newsletter',
														],
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'li',
													{
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																GreyBulletpoint,
																{},
															),
															'Unlimited access in our app',
														],
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'li',
													{
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																GreyBulletpoint,
																{},
															),
															'Ad-free reading',
														],
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'li',
													{
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																GreyBulletpoint,
																{},
															),
															'Offline reading',
														],
													},
												),
											],
										},
									),
								],
							}),
						}),
					_ref = {
						name: 'bjk51n',
						styles: 'margin-top:32px;margin-bottom:32px',
					},
					ConfirmDigiSubCancellation = () => {
						var navigate = (0, react_router.s0)(),
							{ productDetail, productType } = (0,
							react.useContext)(CancellationContainer.DW),
							[isSubmitting, setIsSubmitting] = (0,
							react.useState)(!1),
							[loadingFailed, setLoadingFailed] = (0,
							react.useState)(!1),
							routerState = (0, react_router.TH)().state,
							eligibleForDiscount =
								null == routerState
									? void 0
									: routerState.eligibleForDiscount,
							reason = 'mma_cancellation_default',
							cancelDigiSub = (function () {
								var _ref3 = _asyncToGenerator(function* (
									subscriptionId,
									withSubscriptionResponseFetcher,
								) {
									return (
										yield (0, utilities_fetch.n4)(
											'/api/cancel/'.concat(
												subscriptionId,
											),
											{
												method: 'POST',
												body: JSON.stringify({
													reason,
												}),
												headers: {
													'Content-Type':
														'application/json',
												},
											},
										),
										withSubscriptionResponseFetcher()
									);
								});
								return function cancelDigiSub(_x, _x2) {
									return _ref3.apply(this, arguments);
								};
							})(),
							postCancellation = (function () {
								var _ref4 = _asyncToGenerator(function* () {
									if (!isSubmitting)
										try {
											setIsSubmitting(!0);
											var caseResponse = yield ((
												selectedReasonId,
												productType,
												productDetail,
											) =>
												fetch('/api/case', {
													method: 'POST',
													body: JSON.stringify({
														reason: selectedReasonId,
														product:
															productType
																.cancellation
																.sfCaseProduct,
														subscriptionName:
															productDetail
																.subscription
																.subscriptionId,
														gaData: '',
													}),
													headers: {
														'Content-Type':
															'application/json',
														[productResponse.l2]:
															''.concat(
																productDetail.isTestUser,
															),
													},
												}))(
												reason,
												productType,
												productDetail,
											);
											if (
												null ===
												(yield (0,
												DefaultApiResponseHandler.xJ)(
													caseResponse,
												))
											)
												return (
													setIsSubmitting(!1),
													void setLoadingFailed(!0)
												);
											var cancelResponse =
													yield cancelDigiSub(
														productDetail
															.subscription
															.subscriptionId,
														(0, productUtils.w)(
															productType.allProductsProductTypeFilterString,
															productDetail
																.subscription
																.subscriptionId,
														),
													),
												cancelData = yield (0,
												DefaultApiResponseHandler.xJ)(
													cancelResponse,
												);
											if (null === cancelData)
												return (
													setIsSubmitting(!1),
													void setLoadingFailed(!0)
												);
											var digisub = cancelData
												.products[0] || {
												subscription: {},
											};
											0 ===
												Object.keys(
													digisub.subscription,
												).length ||
											digisub.subscription.cancelledAt
												? navigate('../reasons', {
														state: _objectSpread(
															_objectSpread(
																{},
																routerState,
															),
															{},
															{
																journeyCompleted:
																	!0,
															},
														),
												  })
												: (setIsSubmitting(!1),
												  setLoadingFailed(!0));
										} catch (_unused) {
											setIsSubmitting(!1),
												setLoadingFailed(!0);
										}
								});
								return function postCancellation() {
									return _ref4.apply(this, arguments);
								};
							})();
						return loadingFailed
							? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
									GenericErrorScreen.c,
									{
										loggingMessage:
											'Cancel journey case id api call failed during the cancellation process',
									},
							  )
							: (0, emotion_react_jsx_runtime_browser_esm.BX)(
									'section',
									{
										css: (0, emotion_react_browser_esm.iv)(
											'margin-top:',
											space.D[4],
											'px;',
											'',
										),
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												Stack.K,
												{
													space: 1,
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'h1',
															{
																css: (0,
																emotion_react_browser_esm.iv)(
																	typography.vD7,
																	';margin-top:0;margin-bottom:0;',
																	mq.Dp
																		.tablet,
																	'{',
																	typography.t_M,
																	';}',
																	'',
																),
																children:
																	'Losing your supporter extras',
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'div',
															{
																css: (0,
																emotion_react_browser_esm.iv)(
																	typography.Kz0,
																	';',
																	'',
																),
																children:
																	'Please keep in mind that you will be losing access to your supporter extras if you cancel today.',
															},
														),
													],
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'section',
												{
													css: _ref,
													children: (0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														BenefitsNotAvailable,
														{},
													),
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'div',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														typography.Kie,
														';margin-bottom:',
														space.D[4],
														'px;',
														'',
													),
													children:
														'Please confirm to cancel your digital subscription',
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'div',
												{
													css: ButtonStyles.SX,
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															Button.z,
															{
																onClick:
																	postCancellation,
																isLoading:
																	isSubmitting,
																cssOverrides:
																	(0,
																	emotion_react_browser_esm.iv)(
																		'background-color:',
																		palette
																			.palette
																			.news[400],
																		';justify-content:center;:hover{background-color:',
																		palette
																			.palette
																			.news[200],
																		';}',
																		'',
																	),
																children:
																	'Cancel subscription',
															},
														),
														eligibleForDiscount &&
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																Button.z,
																{
																	onClick:
																		() =>
																			navigate(
																				'../discount-offer',
																				{
																					state: _objectSpread(
																						{},
																						routerState,
																					),
																				},
																			),
																	cssOverrides:
																		(0,
																		emotion_react_browser_esm.iv)(
																			'display:flex;margin-left:',
																			space
																				.D[5],
																			'px;justify-content:center;',
																			'',
																		),
																	priority:
																		'subdued',
																	children:
																		'Go back to discount',
																},
															),
													],
												},
											),
										],
									},
							  );
					},
					SvgEnvelope = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgEnvelope.js',
					),
					SvgGift = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgGift.js',
					),
					SvgCalendar = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgCalendar.js',
					),
					LinkButton = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/button/LinkButton.js',
					),
					esm = __webpack_require__(
						'./node_modules/@sentry/minimal/esm/index.js',
					),
					UpgradeSupportStyles = __webpack_require__(
						'./client/components/mma/upgrade/UpgradeSupportStyles.ts',
					),
					utils = __webpack_require__('./client/utilities/utils.ts'),
					dates = __webpack_require__('./shared/dates.ts'),
					GenericStyles = __webpack_require__(
						'./client/styles/GenericStyles.ts',
					);
				var DigiSubDiscountConfirmed_ref = {
						name: '3hgi0y',
						styles: 'margin-top:32px',
					},
					DigiSubDiscountConfirmed = () => {
						var _digiSub$subscription,
							_digiSub$subscription2,
							_routerState$user,
							pageTitleContext = (0, react.useContext)(
								CancellationContainer.mc,
							),
							cancellationContext = (0, react.useContext)(
								CancellationContainer.DW,
							),
							routerState = (0, react_router.TH)().state,
							digiSub = cancellationContext.productDetail,
							mainPlan = (0, productResponse.fr)(
								digiSub.subscription,
							),
							currencySymbol = mainPlan.currency,
							discountPeriod = routerState.discountPeriod,
							discountedPrice = routerState.discountedPrice,
							newPrice =
								(null !==
									(_digiSub$subscription =
										digiSub.subscription
											.nextPaymentPrice) &&
								void 0 !== _digiSub$subscription
									? _digiSub$subscription
									: mainPlan.price) / 100,
							nextBillingDate = (0, dates.sG)(
								null !==
									(_digiSub$subscription2 =
										digiSub.subscription.nextPaymentDate) &&
									void 0 !== _digiSub$subscription2
									? _digiSub$subscription2
									: void 0,
							).dateStr(dates.Bn),
							userEmailAddress =
								null == routerState ||
								null ===
									(_routerState$user = routerState.user) ||
								void 0 === _routerState$user
									? void 0
									: _routerState$user.email;
						if (
							((0, react.useEffect)(() => {
								pageTitleContext.setPageTitle(
									'Your subscription',
								);
							}, [pageTitleContext]),
							!discountedPrice)
						) {
							var message =
								'No discounted price found in router state';
							return (
								(0, esm.Tb)(message),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									GenericErrorScreen.c,
									{ loggingMessage: message },
								)
							);
						}
						return (0, emotion_react_jsx_runtime_browser_esm.BX)(
							emotion_react_jsx_runtime_browser_esm.HY,
							{
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'section',
										{
											css: (0,
											emotion_react_browser_esm.iv)(
												'padding-top:',
												space.D[4],
												'px;margin-bottom:32px;',
												typography.Kz0,
												';',
												'',
											),
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'h2',
													{
														css: GenericStyles.Wn,
														children:
															'Discount confirmed',
													},
												),
												'Thank you for continuing to fund our journalism.',
											],
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'section',
										{
											css: (0,
											emotion_react_browser_esm.iv)(
												'margin-top:20px;border-bottom:1px solid ',
												palette.palette.neutral[86],
												';border-top:1px solid ',
												palette.palette.neutral[86],
												';padding-bottom:',
												space.D[5],
												'px;',
												'',
											),
											children: (0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												Stack.K,
												{
													space: 5,
													children: (0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'ul',
														{
															css: [
																GenericStyles.Yd,
																GenericStyles.lA,
																GenericStyles.rt,
																'',
																'',
															],
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'li',
																	{
																		children:
																			[
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					SvgEnvelope.j,
																					{
																						size: 'medium',
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.BX)(
																					'span',
																					{
																						children:
																							[
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									'strong',
																									{
																										css: (0,
																										emotion_react_browser_esm.iv)(
																											'padding-bottom:',
																											space
																												.D[1],
																											'px;',
																											'',
																										),
																										children:
																											'Check your email',
																									},
																								),
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									'br',
																									{},
																								),
																								'We have sent you a discount confirmation to',
																								' ',
																								userEmailAddress,
																							],
																					},
																				),
																			],
																	},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'li',
																	{
																		children:
																			[
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					SvgGift.s,
																					{
																						size: 'medium',
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.BX)(
																					'span',
																					{
																						children:
																							[
																								(0,
																								emotion_react_jsx_runtime_browser_esm.BX)(
																									'strong',
																									{
																										css: (0,
																										emotion_react_browser_esm.iv)(
																											'padding-bottom:',
																											space
																												.D[1],
																											'px;',
																											'',
																										),
																										children:
																											[
																												'25% discount for ',
																												discountPeriod,
																											],
																									},
																								),
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									'br',
																									{},
																								),
																								'You’ll pay ',
																								currencySymbol,
																								(0,
																								utils.dN)(
																									discountedPrice,
																								),
																								' per',
																								' ',
																								mainPlan.billingPeriod,
																								' for ',
																								discountPeriod,
																								', then ',
																								currencySymbol,
																								(0,
																								utils.dN)(
																									newPrice,
																								),
																								' per',
																								' ',
																								mainPlan.billingPeriod,
																							],
																					},
																				),
																			],
																	},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'li',
																	{
																		children:
																			[
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					SvgCalendar.c,
																					{
																						size: 'medium',
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.BX)(
																					'span',
																					{
																						'data-qm-masking':
																							'blocklist',
																						children:
																							[
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									'strong',
																									{
																										css: (0,
																										emotion_react_browser_esm.iv)(
																											'padding-bottom:',
																											space
																												.D[1],
																											'px;',
																											'',
																										),
																										children:
																											'Your billing date',
																									},
																								),
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									'br',
																									{},
																								),
																								nextBillingDate,
																							],
																					},
																				),
																			],
																	},
																),
															],
														},
													),
												},
											),
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'section',
										{
											css: DigiSubDiscountConfirmed_ref,
											children: (0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'div',
												{
													css: ButtonStyles.SX,
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															LinkButton.Q,
															{
																href: 'https://theguardian.com',
																cssOverrides:
																	ButtonStyles._8,
																children:
																	'Go to Guardian homepage',
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'div',
															{
																css: UpgradeSupportStyles.T,
																children: (0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'a',
																	{
																		href: '/',
																		children:
																			'Back to account overview ',
																	},
																),
															},
														),
													],
												},
											),
										},
									),
								],
							},
						);
					},
					SvgTickRound = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgTickRound.js',
					),
					theme_reader_revenue = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/button/theme-reader-revenue.js',
					),
					ErrorSummary = __webpack_require__(
						'./node_modules/@guardian/source-development-kitchen/dist/react-components/summary/ErrorSummary.js',
					),
					generalTypes = __webpack_require__(
						'./shared/generalTypes.ts',
					),
					DefaultLoadingView = __webpack_require__(
						'./client/components/mma/shared/asyncComponents/DefaultLoadingView.tsx',
					),
					Heading = __webpack_require__(
						'./client/components/mma/shared/Heading.tsx',
					);
				function DigiSubThankYouOffer_asyncGeneratorStep(
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
				function DigiSubThankYouOffer_ownKeys(e, r) {
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
				function DigiSubThankYouOffer_objectSpread(e) {
					for (var r = 1; r < arguments.length; r++) {
						var t = null != arguments[r] ? arguments[r] : {};
						r % 2
							? DigiSubThankYouOffer_ownKeys(
									Object(t),
									!0,
							  ).forEach(function (r) {
									DigiSubThankYouOffer_defineProperty(
										e,
										r,
										t[r],
									);
							  })
							: Object.getOwnPropertyDescriptors
							? Object.defineProperties(
									e,
									Object.getOwnPropertyDescriptors(t),
							  )
							: DigiSubThankYouOffer_ownKeys(Object(t)).forEach(
									function (r) {
										Object.defineProperty(
											e,
											r,
											Object.getOwnPropertyDescriptor(
												t,
												r,
											),
										);
									},
							  );
					}
					return e;
				}
				function DigiSubThankYouOffer_defineProperty(obj, key, value) {
					return (
						(key = (function DigiSubThankYouOffer_toPropertyKey(
							arg,
						) {
							var key =
								(function DigiSubThankYouOffer_toPrimitive(
									input,
									hint,
								) {
									if (
										'object' != typeof input ||
										null === input
									)
										return input;
									var prim = input[Symbol.toPrimitive];
									if (void 0 !== prim) {
										var res = prim.call(
											input,
											hint || 'default',
										);
										if ('object' != typeof res) return res;
										throw new TypeError(
											'@@toPrimitive must return a primitive value.',
										);
									}
									return (
										'string' === hint ? String : Number
									)(input);
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
				var DiscountOffer = (_ref) => {
					var {
						currencySymbol,
						discountPeriod,
						discountedPrice,
						isApplyDiscountLoading: isDiscountLoading,
						hasDiscountFailed,
						handleDiscountOfferClick,
						newPrice,
					} = _ref;
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						Stack.K,
						{
							space: 4,
							cssOverrides: (0, emotion_react_browser_esm.iv)(
								'background-color:#f3f7fe;border-radius:4px;padding:',
								space.D[4],
								'px;',
								'',
							),
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'div',
									{
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'div',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														typography.Kie,
														';margin-bottom:',
														space.D[2],
														'px;',
														'',
													),
													children:
														'A subscription offer just for you',
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'ul',
												{
													css: BenefitsStyles.fZ,
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															'li',
															{
																children: [
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		SvgTickRound.X,
																		{
																			isAnnouncedByScreenReader:
																				!0,
																			size: 'medium',
																		},
																	),
																	(0,
																	emotion_react_jsx_runtime_browser_esm.BX)(
																		'span',
																		{
																			css: (0,
																			emotion_react_browser_esm.iv)(
																				'padding-top:',
																				space
																					.D[1],
																				'px;',
																				'',
																			),
																			children:
																				[
																					'Get a 25% discount for ',
																					discountPeriod,
																					' (',
																					currencySymbol,
																					(0,
																					utils.dN)(
																						discountedPrice,
																					),
																					', then ',
																					currencySymbol,
																					newPrice,
																					')',
																				],
																		},
																	),
																],
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															'li',
															{
																children: [
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		SvgTickRound.X,
																		{
																			isAnnouncedByScreenReader:
																				!0,
																			size: 'medium',
																		},
																	),
																	' ',
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'span',
																		{
																			css: (0,
																			emotion_react_browser_esm.iv)(
																				'padding-top:',
																				space
																					.D[1],
																				'px;',
																				'',
																			),
																			children:
																				'Keep all your supporter extras, including unlimited, ad-free reading',
																		},
																	),
																],
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															'li',
															{
																children: [
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		SvgTickRound.X,
																		{
																			isAnnouncedByScreenReader:
																				!0,
																			size: 'medium',
																		},
																	),
																	' ',
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'span',
																		{
																			css: (0,
																			emotion_react_browser_esm.iv)(
																				'padding-top:',
																				space
																					.D[1],
																				'px;',
																				'',
																			),
																			children:
																				'Exclusive access to the Editions app (our daily digital newspaper)',
																		},
																	),
																],
															},
														),
													],
												},
											),
										],
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'div',
									{
										css: ButtonStyles.A3,
										children: (0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											Button.z,
											{
												theme: theme_reader_revenue.gk,
												cssOverrides: ButtonStyles._8,
												onClick:
													handleDiscountOfferClick,
												isLoading: isDiscountLoading,
												children:
													'Keep support with discount',
											},
										),
									},
								),
								hasDiscountFailed &&
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										ErrorSummary.X,
										{
											message:
												'We were unable to apply your discount. Please try again',
										},
									),
							],
						},
					);
				};
				function getDiscountPeriod(discountPreview) {
					return ''
						.concat(discountPreview.upToPeriods, ' ')
						.concat(
							(0, generalTypes.T)(
								discountPreview.upToPeriodsType,
								discountPreview.upToPeriods,
							),
						);
				}
				var DigiSubThankYouOffer = () => {
						var _productDetail$subscr,
							navigate = (0, react_router.s0)(),
							productDetail = (0, react.useContext)(
								CancellationContainer.DW,
							).productDetail,
							routerState = (0, react_router.TH)().state,
							[
								isApplyDiscountLoading,
								setIsApplyDiscountLoading,
							] = (0, react.useState)(!1),
							[hasDiscountFailed, setHasDiscountFailed] = (0,
							react.useState)(!1),
							[
								isPreviewDiscountLoading,
								setIsPreviewDiscountLoading,
							] = (0, react.useState)(!1),
							[discountPreview, setDiscountPreview] = (0,
							react.useState)(null);
						if (
							((0, react.useEffect)(() => {
								setIsPreviewDiscountLoading(!0),
									(0, utilities_fetch.n4)(
										'/api/discounts/preview-discount',
										{
											method: 'POST',
											body: JSON.stringify({
												subscriptionNumber:
													productDetail.subscription
														.subscriptionId,
											}),
										},
									).then((response) => {
										response.ok &&
											response.json().then((data) => {
												setDiscountPreview(data);
											}),
											setIsPreviewDiscountLoading(!1);
									});
							}, [productDetail.subscription.subscriptionId]),
							isPreviewDiscountLoading)
						)
							return (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								DefaultLoadingView.I,
								{ loadingMessage: 'Loading...' },
							);
						if (!productDetail) return navigate('/'), null;
						var supportStartYear = (0, dates.ur)(
								new Date(productDetail.joinDate),
								'yyyy',
							),
							mainPlan = (0, productResponse.fr)(
								productDetail.subscription,
							),
							newPrice =
								(null !==
									(_productDetail$subscr =
										productDetail.subscription
											.nextPaymentPrice) &&
								void 0 !== _productDetail$subscr
									? _productDetail$subscr
									: mainPlan.price) / 100,
							newRouterState = DigiSubThankYouOffer_objectSpread(
								DigiSubThankYouOffer_objectSpread(
									{},
									routerState,
								),
								{},
								{
									discountedPrice:
										null == discountPreview
											? void 0
											: discountPreview.discountedPrice,
									eligibleForDiscount:
										null !== discountPreview,
									discountPeriod: discountPreview
										? getDiscountPeriod(discountPreview)
										: void 0,
								},
							),
							handleDiscountOfferClick = (function () {
								var _ref2 =
									(function DigiSubThankYouOffer_asyncToGenerator(
										fn,
									) {
										return function () {
											var self = this,
												args = arguments;
											return new Promise(function (
												resolve,
												reject,
											) {
												var gen = fn.apply(self, args);
												function _next(value) {
													DigiSubThankYouOffer_asyncGeneratorStep(
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
													DigiSubThankYouOffer_asyncGeneratorStep(
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
									})(function* () {
										if (!isApplyDiscountLoading)
											try {
												setIsApplyDiscountLoading(!0),
													(yield (0,
													utilities_fetch.n4)(
														'/api/discounts/apply-discount',
														{
															method: 'POST',
															body: JSON.stringify(
																{
																	subscriptionNumber:
																		productDetail
																			.subscription
																			.subscriptionId,
																},
															),
														},
													)).ok
														? (setIsApplyDiscountLoading(
																!1,
														  ),
														  navigate(
																'../discount-confirmed',
																{
																	state: DigiSubThankYouOffer_objectSpread(
																		DigiSubThankYouOffer_objectSpread(
																			{},
																			newRouterState,
																		),
																		{},
																		{
																			journeyCompleted:
																				!0,
																		},
																	),
																},
														  ))
														: (setIsApplyDiscountLoading(
																!1,
														  ),
														  setHasDiscountFailed(
																!0,
														  ));
											} catch (_unused) {
												setIsApplyDiscountLoading(!1),
													setHasDiscountFailed(!0);
											}
									});
								return function handleDiscountOfferClick() {
									return _ref2.apply(this, arguments);
								};
							})();
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							'section',
							{
								css: (0, emotion_react_browser_esm.iv)(
									'margin-top:',
									space.D[4],
									'px;',
									'',
								),
								children: (0,
								emotion_react_jsx_runtime_browser_esm.BX)(
									Stack.K,
									{
										space: 6,
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'h2',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														typography.vD7,
														';margin-top:0;margin-bottom:0;',
														mq.Dp.tablet,
														'{',
														typography.t_M,
														';}',
														'',
													),
													children: [
														'Thank you for supporting the Guardian since',
														' ',
														supportStartYear,
													],
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												Stack.K,
												{
													space: 1,
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															Heading.X,
															{
																sansSerif: !0,
																borderless: !0,
																level: '3',
																children:
																	'Your funding has played a vital role in our progress',
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'p',
															{
																css: (0,
																emotion_react_browser_esm.iv)(
																	typography.Kz0,
																	';',
																	'',
																),
																children:
																	"Since you first joined as a Guardian supporter, we've lived through some of the most important news events of our times. Without you, our fearless, independent journalism wouldn't have reached millions around the world. We're so grateful.",
															},
														),
													],
												},
											),
											discountPreview &&
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													DiscountOffer,
													{
														currencySymbol:
															mainPlan.currency,
														discountPeriod:
															getDiscountPeriod(
																discountPreview,
															),
														discountedPrice:
															discountPreview.discountedPrice,
														isApplyDiscountLoading,
														hasDiscountFailed,
														handleDiscountOfferClick,
														newPrice,
													},
												),
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'div',
												{
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'h3',
															{
																css: (0,
																emotion_react_browser_esm.iv)(
																	typography.Kie,
																	';margin:0;',
																	'',
																),
																children:
																	'Still want to cancel?',
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															Button.z,
															{
																priority:
																	'subdued',
																onClick: () =>
																	navigate(
																		'../confirm-cancel',
																		{
																			state: DigiSubThankYouOffer_objectSpread(
																				{},
																				newRouterState,
																			),
																		},
																	),
																children:
																	'Continue to cancel',
															},
														),
													],
												},
											),
										],
									},
								),
							},
						);
					},
					testProducts = __webpack_require__(
						'./client/fixtures/productBuilder/testProducts.ts',
					),
					productTypes = __webpack_require__(
						'./shared/productTypes.ts',
					),
					SelectReason = __webpack_require__(
						'./client/components/mma/cancel/cancellationSaves/SelectReason.tsx',
					);
				const DigiSubSaves_stories = {
					title: 'Pages/DigiSubSaves',
					component: CancellationContainer.OY,
					decorators: [ReactRouterDecorator.R],
					parameters: {
						layout: 'fullscreen',
						reactRouter: {
							state: {
								productDetail: (0, testProducts.IB)(),
								user: { email: 'test@test.com' },
							},
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								CancellationContainer.OY,
								{ productType: productTypes.Pm.digipack },
							),
						},
					},
				};
				var DiscountConfirmed = {
						render: () =>
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								DigiSubDiscountConfirmed,
								{},
							),
						parameters: {
							reactRouter: {
								state: {
									productDetail: (0, testProducts.IB)(),
									user: { email: 'test@test.com' },
									eligibleForDiscount: !0,
									discountedPrice: 111.75,
									discountPeriod: '12 months',
								},
							},
						},
					},
					EligibleForDiscount = {
						render: () =>
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								DigiSubThankYouOffer,
								{},
							),
						parameters: {
							msw: [
								http.d.post(
									'/api/discounts/preview-discount',
									() =>
										HttpResponse.Z.json({
											discountedPrice: 111.75,
											upToPeriods: '12',
											upToPeriodsType: 'month',
											firstDiscountedPaymentDate:
												'2024-05-30',
											nextNonDiscountedPaymentDate:
												'2024-07-30',
										}),
								),
							],
						},
					},
					IneligibleForDiscount = {
						render: () =>
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								DigiSubThankYouOffer,
								{},
							),
						parameters: {
							reactRouter: {
								state: {
									productDetail: (0, testProducts.Z6)(),
									user: { email: 'test@test.com' },
								},
							},
							msw: [
								http.d.post(
									'/api/discounts/preview-discount',
									() =>
										new HttpResponse.Z(null, {
											status: 400,
										}),
								),
							],
						},
					},
					ConfirmCancellation = {
						render: () =>
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								ConfirmDigiSubCancellation,
								{},
							),
						parameters: {
							reactRouter: {
								state: {
									productDetail: (0, testProducts.Z6)(),
									user: { email: 'test@test.com' },
									eligibleForDiscount: !0,
								},
							},
						},
					},
					DigiSubCancellationReason = () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							SelectReason.M,
							{},
						);
				(DiscountConfirmed.parameters = {
					...DiscountConfirmed.parameters,
					docs: {
						...DiscountConfirmed.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <DigiSubDiscountConfirmed />;\n  },\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: digitalPackPaidByDirectDebit(),\n        user: {\n          email: 'test@test.com'\n        },\n        eligibleForDiscount: true,\n        discountedPrice: 111.75,\n        discountPeriod: '12 months'\n      }\n    }\n  }\n}",
							...DiscountConfirmed.parameters?.docs?.source,
						},
					},
				}),
					(EligibleForDiscount.parameters = {
						...EligibleForDiscount.parameters,
						docs: {
							...EligibleForDiscount.parameters?.docs,
							source: {
								originalSource:
									"{\n  render: () => {\n    return <DigiSubThankYouOffer />;\n  },\n  parameters: {\n    msw: [http.post('/api/discounts/preview-discount', () => {\n      return HttpResponse.json({\n        discountedPrice: 111.75,\n        upToPeriods: '12',\n        upToPeriodsType: 'month',\n        firstDiscountedPaymentDate: '2024-05-30',\n        nextNonDiscountedPaymentDate: '2024-07-30'\n      });\n    })]\n  }\n}",
								...EligibleForDiscount.parameters?.docs?.source,
							},
						},
					}),
					(IneligibleForDiscount.parameters = {
						...IneligibleForDiscount.parameters,
						docs: {
							...IneligibleForDiscount.parameters?.docs,
							source: {
								originalSource:
									"{\n  render: () => {\n    return <DigiSubThankYouOffer />;\n  },\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: digitalPackWithPaymentFailure(),\n        user: {\n          email: 'test@test.com'\n        }\n      }\n    },\n    msw: [http.post('/api/discounts/preview-discount', () => {\n      return new HttpResponse(null, {\n        status: 400\n      });\n    })]\n  }\n}",
								...IneligibleForDiscount.parameters?.docs
									?.source,
							},
						},
					}),
					(ConfirmCancellation.parameters = {
						...ConfirmCancellation.parameters,
						docs: {
							...ConfirmCancellation.parameters?.docs,
							source: {
								originalSource:
									"{\n  render: () => {\n    return <ConfirmDigiSubCancellation />;\n  },\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: digitalPackWithPaymentFailure(),\n        user: {\n          email: 'test@test.com'\n        },\n        eligibleForDiscount: true\n      }\n    }\n  }\n}",
								...ConfirmCancellation.parameters?.docs?.source,
							},
						},
					}),
					(DigiSubCancellationReason.parameters = {
						...DigiSubCancellationReason.parameters,
						docs: {
							...DigiSubCancellationReason.parameters?.docs,
							source: {
								originalSource:
									'() => {\n  return <SelectReason />;\n}',
								...DigiSubCancellationReason.parameters?.docs
									?.source,
							},
						},
					});
				const __namedExportsOrder = [
					'DiscountConfirmed',
					'EligibleForDiscount',
					'IneligibleForDiscount',
					'ConfirmCancellation',
					'DigiSubCancellationReason',
				];
			},
	},
]);
//# sourceMappingURL=components-mma-cancel-cancellationSaves-digipack-DigiSubSaves-stories.761cf676.iframe.bundle.js.map
