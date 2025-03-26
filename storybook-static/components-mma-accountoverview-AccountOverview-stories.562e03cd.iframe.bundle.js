'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[4386],
	{
		'./node_modules/@guardian/source-development-kitchen/dist/react-components/summary/InfoSummary.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
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
		'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgCrossRoundFilled.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					i: () => SvgCrossRoundFilled,
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
										d: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10m5.138-14.358-.782-.78-4.349 3.982-4.364-3.967-.782.78L10.85 12l-3.988 4.342.782.781 4.364-3.967 4.35 3.982.781-.78L13.165 12z',
										fill: theme?.fill,
									},
								),
							},
						),
					SvgCrossRoundFilled = ({
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
													children: 'Close',
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
		'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgInfoRound.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
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
		'./client/components/mma/shared/benefits/BenefitsToggle.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				r: () => BenefitsToggle,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_7__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_8__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
					),
				react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./node_modules/react/index.js',
				),
				_shared_productResponse__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__('./shared/productResponse.ts'),
				_shared_ExpanderButton__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./client/components/shared/ExpanderButton.tsx',
					),
				_BenefitsConfiguration__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./client/components/mma/shared/benefits/BenefitsConfiguration.ts',
					),
				_BenefitsSection__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./client/components/mma/shared/benefits/BenefitsSection.tsx',
					),
				_BenefitsStyles__WEBPACK_IMPORTED_MODULE_5__ =
					__webpack_require__(
						'./client/components/mma/shared/benefits/BenefitsStyles.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				BenefitsToggle = (_ref) => {
					var { productType, subscriptionPlan } = _ref,
						currencyIso = (0,
						_shared_productResponse__WEBPACK_IMPORTED_MODULE_1__.q4)(
							subscriptionPlan,
						)
							? subscriptionPlan.currencyISO
							: '',
						[showBenefits, setShowBenefits] = (0,
						react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),
						benefits =
							_BenefitsConfiguration__WEBPACK_IMPORTED_MODULE_3__.O7[
								productType
							].filter((benefit) =>
								(0,
								_BenefitsConfiguration__WEBPACK_IMPORTED_MODULE_3__.BQ)(
									benefit,
									currencyIso,
								),
							);
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.BX)(
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.HY,
						{
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.tZ)(
									'div',
									{
										css: (0,
										_emotion_react__WEBPACK_IMPORTED_MODULE_7__.iv)(
											'margin:',
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_8__
												.D[5],
											'px 0 ',
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_8__
												.D[4],
											'px 0;',
											'',
										),
										hidden: !showBenefits,
										children: (0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.tZ)(
											_BenefitsSection__WEBPACK_IMPORTED_MODULE_4__.c,
											{ benefits },
										),
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.BX)(
									'button',
									{
										css: [
											(0,
											_shared_ExpanderButton__WEBPACK_IMPORTED_MODULE_2__.S)()(
												showBenefits,
											),
											_BenefitsStyles__WEBPACK_IMPORTED_MODULE_5__.TY,
											'',
											'',
										],
										type: 'button',
										'aria-expanded': showBenefits,
										'aria-controls': 'benefits',
										onClick: () =>
											setShowBenefits(!showBenefits),
										children: [
											showBenefits ? 'hide' : 'view',
											' benefits',
										],
									},
								),
							],
						},
					);
				};
			try {
				(BenefitsToggle.displayName = 'BenefitsToggle'),
					(BenefitsToggle.__docgenInfo = {
						description: '',
						displayName: 'BenefitsToggle',
						props: {
							productType: {
								defaultValue: null,
								description: '',
								name: 'productType',
								required: !0,
								type: {
									name: 'enum',
									value: [
										{ value: '"membership"' },
										{ value: '"contributions"' },
										{ value: '"newspaper"' },
										{ value: '"homedelivery"' },
										{ value: '"nationaldelivery"' },
										{ value: '"voucher"' },
										{ value: '"digitalvoucher"' },
										{ value: '"guardianweekly"' },
										{ value: '"digipack"' },
										{ value: '"supporterplus"' },
										{ value: '"tierthree"' },
										{ value: '"guardianadlite"' },
										{ value: '"guardianpatron"' },
									],
								},
							},
							subscriptionPlan: {
								defaultValue: null,
								description: '',
								name: 'subscriptionPlan',
								required: !0,
								type: { name: 'SubscriptionPlan' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/benefits/BenefitsToggle.tsx#BenefitsToggle'
						] = {
							docgenInfo: BenefitsToggle.__docgenInfo,
							name: 'BenefitsToggle',
							path: 'client/components/mma/shared/benefits/BenefitsToggle.tsx#BenefitsToggle',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/fixtures/singleContribution.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				p: () => singleContributionsAPIResponse,
			});
			var singleContributionsAPIResponse = [
				{
					created: 16841411e5,
					currency: 'USD',
					price: 50,
					status: 'Paid',
				},
			];
		},
		'./client/components/mma/accountoverview/AccountOverview.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					NoSubscription: () => NoSubscription,
					WithAppSubscriptions: () => WithAppSubscriptions,
					WithCancelledSubscriptions: () =>
						WithCancelledSubscriptions,
					WithContributionAndSwitchNotPossible: () =>
						WithContributionAndSwitchNotPossible,
					WithContributionAndSwitchPossible: () =>
						WithContributionAndSwitchPossible,
					WithContributionInPaymentFailure: () =>
						WithContributionInPaymentFailure,
					WithGiftSubscriptions: () => WithGiftSubscriptions,
					WithGuardianAdLite: () => WithGuardianAdLite,
					WithSingleContribution: () => WithSingleContribution,
					WithSubscriptions: () => WithSubscriptions,
					WithSupporterPlusDuringOffer: () =>
						WithSupporterPlusDuringOffer,
					WithUSASubscription: () => WithUSASubscription,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => AccountOverview_stories,
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
				featureSwitches = __webpack_require__(
					'./shared/featureSwitches.ts',
				),
				cancelledContribution = {
					tier: 'Contributor',
					joinDate: '2022-01-05',
					subscription: {
						subscriptionId: 'A-S00000000',
						cancellationEffectiveDate: '2023-03-20',
						start: '2021-12-10',
						end: '2022-11-29',
						readerType: 'Direct',
						accountId: '00000000',
					},
				},
				cancelledGuardianWeekly = {
					tier: 'Guardian Weekly - Domestic',
					joinDate: '2022-01-05',
					subscription: {
						subscriptionId: 'A-S00000000',
						cancellationEffectiveDate: '2023-02-28',
						start: '2023-03-10',
						end: '2023-03-10',
						readerType: 'Direct',
						accountId: '00000000',
					},
				},
				cancelledGuardianAdLite = {
					tier: 'Guardian Ad-Lite',
					joinDate: '2022-01-05',
					subscription: {
						subscriptionId: 'A-S00000000',
						cancellationEffectiveDate: '2023-02-28',
						start: '2023-03-10',
						end: '2023-03-10',
						readerType: 'Direct',
						accountId: '00000000',
					},
				},
				inAppPurchase = __webpack_require__(
					'./client/fixtures/inAppPurchase.ts',
				),
				mdapiResponse = __webpack_require__(
					'./client/fixtures/mdapiResponse.ts',
				),
				testProducts = __webpack_require__(
					'./client/fixtures/productBuilder/testProducts.ts',
				),
				singleContribution = __webpack_require__(
					'./client/fixtures/singleContribution.ts',
				),
				user = __webpack_require__('./client/fixtures/user.ts'),
				emotion_react_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
				),
				space = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
				),
				palette = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
				),
				typography = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
				),
				mq = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
				),
				Stack = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/stack/Stack.js',
				),
				lodash = __webpack_require__('./node_modules/lodash/lodash.js'),
				react = __webpack_require__('./node_modules/react/index.js'),
				shared_mpapiResponse = __webpack_require__(
					'./shared/mpapiResponse.ts',
				),
				productResponse = __webpack_require__(
					'./shared/productResponse.ts',
				),
				productTypes = __webpack_require__('./shared/productTypes.ts'),
				fetch = __webpack_require__('./client/utilities/fetch.ts'),
				useAsyncLoader = __webpack_require__(
					'./client/utilities/hooks/useAsyncLoader.ts',
				),
				productUtils = __webpack_require__(
					'./client/utilities/productUtils.ts',
				),
				GenericErrorScreen = __webpack_require__(
					'./client/components/shared/GenericErrorScreen.tsx',
				),
				NavConfig = __webpack_require__(
					'./client/components/shared/nav/NavConfig.tsx',
				),
				SupportTheGuardianButton = __webpack_require__(
					'./client/components/shared/SupportTheGuardianButton.tsx',
				),
				CancellationSummary = __webpack_require__(
					'./client/components/mma/cancel/CancellationSummary.tsx',
				),
				Page = __webpack_require__('./client/components/mma/Page.tsx'),
				DefaultApiResponseHandler = __webpack_require__(
					'./client/components/mma/shared/asyncComponents/DefaultApiResponseHandler.tsx',
				),
				DefaultLoadingView = __webpack_require__(
					'./client/components/mma/shared/asyncComponents/DefaultLoadingView.tsx',
				),
				DownloadAppCtaVariation1 = __webpack_require__(
					'./client/components/mma/shared/DownloadAppCtaVariation1.tsx',
				),
				DownloadFeastAppCtaWithImage = __webpack_require__(
					'./client/components/mma/shared/DownloadFeastAppCtaWithImage.tsx',
				),
				NewspaperArchiveCta = __webpack_require__(
					'./client/components/mma/shared/NewspaperArchiveCta.tsx',
				),
				NonServiceableCountries = __webpack_require__(
					'./client/components/mma/shared/NonServiceableCountries.ts',
				),
				PaymentFailureAlertIfApplicable = __webpack_require__(
					'./client/components/mma/shared/PaymentFailureAlertIfApplicable.tsx',
				),
				LinkButton = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/button/LinkButton.js',
				),
				InfoSummary = __webpack_require__(
					'./node_modules/@guardian/source-development-kitchen/dist/react-components/summary/InfoSummary.js',
				),
				dates = __webpack_require__('./shared/dates.ts'),
				ButtonStyles = __webpack_require__(
					'./client/styles/ButtonStyles.ts',
				),
				analytics = __webpack_require__(
					'./client/utilities/analytics.ts',
				),
				Card = __webpack_require__(
					'./client/components/mma/shared/Card.tsx',
				),
				textColour = {
					light: palette.palette.neutral[100],
					dark: palette.palette.brand[300],
				},
				productColour = {
					inAppPurchase: palette.palette.brand[800],
					singleContribution: palette.palette.sport[600],
					supporterPlus: palette.palette.brand[500],
					membership: palette.palette.sport[300],
					recurringContribution: palette.palette.brand[400],
					newspaper: palette.palette.brand[400],
					digital: palette.palette.sport[100],
					guardianWeekly: '#cadbe8',
					puzzleApp: palette.palette.lifestyle[300],
				},
				productCardConfiguration = {
					contributions: {
						colour: productColour.recurringContribution,
					},
					supporterplus: {
						colour: productColour.supporterPlus,
						showBenefitsSection: !0,
					},
					guardianadlite: { colour: productColour.supporterPlus },
					tierthree: {
						colour: productColour.supporterPlus,
						showBenefitsSection: !0,
					},
					digipack: { colour: productColour.digital },
					digitalvoucher: { colour: productColour.newspaper },
					newspaper: { colour: productColour.newspaper },
					homedelivery: { colour: productColour.newspaper },
					nationaldelivery: { colour: productColour.newspaper },
					voucher: { colour: productColour.newspaper },
					guardianweekly: {
						colour: productColour.guardianWeekly,
						invertText: !0,
					},
					membership: {
						colour: productColour.membership,
						showBenefitsSection: !0,
					},
					guardianpatron: { colour: productColour.membership },
				},
				productCardTitleCss = (dark) =>
					(0, emotion_react_browser_esm.iv)(
						typography.fy7,
						';color:',
						dark ? textColour.dark : textColour.light,
						';margin-top:0;margin-bottom:',
						space.D[1],
						'px;max-width:calc(100% - 97px);',
						mq.Dp.tablet,
						'{',
						typography.Hu7,
						';}',
						'',
					),
				sectionHeadingCss = (0, emotion_react_browser_esm.iv)(
					typography.Rcn,
					';margin-top:0;margin-bottom:',
					space.D[2],
					'px;',
					'',
				),
				productDetailLayoutCss = (0, emotion_react_browser_esm.iv)(
					'>*+*{margin-top:',
					space.D[5],
					'px;}',
					mq.Dp.tablet,
					'{display:flex;flex-direction:row;>*+*{margin-top:0;margin-left:auto;padding-left:',
					space.D[4],
					'px;}}',
					'',
				),
				keyValueCss = (0, emotion_react_browser_esm.iv)(
					typography.Kz0,
					';margin:0;div+div{margin-top:',
					space.D[1],
					"px;}dt{display:inline-block;margin-right:0.5ch;:after{content:':';}}dd{display:inline-block;margin-left:0;}",
					'',
				),
				emotion_react_jsx_runtime_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				);
			var _ref = { name: 'f7ay7b', styles: 'justify-content:center' },
				CancelledProductCard = (_ref2) => {
					var { productDetail } = _ref2,
						specificProductType = (0, productResponse.Xn)(
							productDetail.tier,
						),
						groupedProductType =
							productTypes.HP[
								specificProductType.groupedProductType
							],
						cardConfig =
							productCardConfiguration[
								specificProductType.productType
							],
						showSubscribeAgainButton =
							'membership' !==
								specificProductType.groupedProductType &&
							'recurringSupport' !==
								specificProductType.groupedProductType &&
							'recurringSupportWithBenefits' !==
								specificProductType.groupedProductType;
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						Stack.K,
						{
							space: 4,
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									InfoSummary.w,
									{
										message: 'Your '.concat(
											groupedProductType.friendlyName,
											' has been cancelled',
										),
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									Card.Z,
									{
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												Card.Z.Header,
												{
													backgroundColor:
														cardConfig.colour,
													children: (0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'h3',
														{
															css: productCardTitleCss(
																cardConfig.invertText,
															),
															children:
																specificProductType.productTitle(),
														},
													),
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												Card.Z.Section,
												{
													children: (0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'div',
														{
															css: productDetailLayoutCss,
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'div',
																	{
																		children:
																			[
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					'h4',
																					{
																						css: sectionHeadingCss,
																						children:
																							'Billing and payment',
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.BX)(
																					'dl',
																					{
																						css: keyValueCss,
																						children:
																							[
																								(0,
																								emotion_react_jsx_runtime_browser_esm.BX)(
																									'div',
																									{
																										children:
																											[
																												(0,
																												emotion_react_jsx_runtime_browser_esm.tZ)(
																													'dt',
																													{
																														children:
																															groupedProductType.showSupporterId
																																? 'Supporter ID'
																																: 'Subscription ID',
																													},
																												),
																												(0,
																												emotion_react_jsx_runtime_browser_esm.tZ)(
																													'dd',
																													{
																														'data-qm-masking':
																															'blocklist',
																														children:
																															productDetail
																																.subscription
																																.subscriptionId,
																													},
																												),
																											],
																									},
																								),
																								groupedProductType.tierLabel &&
																									(0,
																									emotion_react_jsx_runtime_browser_esm.BX)(
																										'div',
																										{
																											children:
																												[
																													(0,
																													emotion_react_jsx_runtime_browser_esm.tZ)(
																														'dt',
																														{
																															children:
																																groupedProductType.tierLabel,
																														},
																													),
																													(0,
																													emotion_react_jsx_runtime_browser_esm.tZ)(
																														'dd',
																														{
																															children:
																																productDetail.tier,
																														},
																													),
																												],
																										},
																									),
																								productDetail
																									.subscription
																									.start &&
																									(0,
																									emotion_react_jsx_runtime_browser_esm.BX)(
																										'div',
																										{
																											children:
																												[
																													(0,
																													emotion_react_jsx_runtime_browser_esm.BX)(
																														'dt',
																														{
																															children:
																																[
																																	groupedProductType.shouldShowJoinDateNotStartDate
																																		? 'Join'
																																		: 'Start',
																																	' ',
																																	'date',
																																],
																														},
																													),
																													(0,
																													emotion_react_jsx_runtime_browser_esm.tZ)(
																														'dd',
																														{
																															children:
																																(0,
																																dates.sG)(
																																	productDetail
																																		.subscription
																																		.start,
																																).dateStr(),
																														},
																													),
																												],
																										},
																									),
																								(0,
																								emotion_react_jsx_runtime_browser_esm.BX)(
																									'div',
																									{
																										children:
																											[
																												(0,
																												emotion_react_jsx_runtime_browser_esm.tZ)(
																													'dt',
																													{
																														children:
																															'End date',
																													},
																												),
																												(0,
																												emotion_react_jsx_runtime_browser_esm.tZ)(
																													'dd',
																													{
																														children:
																															(0,
																															dates.sG)(
																																productDetail
																																	.subscription
																																	.end,
																															).dateStr(),
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
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'div',
																	{
																		css: ButtonStyles.N6,
																		children:
																			showSubscribeAgainButton &&
																			(0,
																			emotion_react_jsx_runtime_browser_esm.tZ)(
																				LinkButton.Q,
																				{
																					href: 'https://support.theguardian.com/uk/subscribe',
																					size: 'small',
																					cssOverrides:
																						_ref,
																					priority:
																						'primary',
																					onClick:
																						() => {
																							(0,
																							analytics.L9)(
																								{
																									eventCategory:
																										'href',
																									eventAction:
																										'click',
																									eventLabel:
																										'subscribe_again',
																								},
																							);
																						},
																					children:
																						'Subscribe again',
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
								),
							],
						},
					);
				};
			try {
				(CancelledProductCard.displayName = 'CancelledProductCard'),
					(CancelledProductCard.__docgenInfo = {
						description: '',
						displayName: 'CancelledProductCard',
						props: {
							productDetail: {
								defaultValue: null,
								description: '',
								name: 'productDetail',
								required: !0,
								type: { name: 'CancelledProductDetail' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/accountoverview/CancelledProductCard.tsx#CancelledProductCard'
						] = {
							docgenInfo: CancelledProductCard.__docgenInfo,
							name: 'CancelledProductCard',
							path: 'client/components/mma/accountoverview/CancelledProductCard.tsx#CancelledProductCard',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var EmptyAccountOverview = __webpack_require__(
					'./client/components/mma/accountoverview/EmptyAccountOverview.tsx',
				),
				Button = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/button/Button.js',
				),
				react_router = __webpack_require__(
					'./node_modules/react-router/index.js',
				);
			var summaryLinkCss = {
					name: '154it3g',
					styles: 'color:currentColor;text-decoration:underline',
				},
				InAppPurchaseCard = (_ref) => {
					var { subscription } = _ref,
						navigate = (0, react_router.s0)(),
						isPuzzleApp = (0, shared_mpapiResponse.Uh)(
							subscription,
						),
						puzzleOrNews = isPuzzleApp ? 'puzzle' : 'news',
						appStore = (0, shared_mpapiResponse.IM)(subscription);
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						Stack.K,
						{
							space: 4,
							children: [
								subscription.cancellationTimestamp &&
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										InfoSummary.w,
										{
											message:
												'Your app subscription was cancelled in '.concat(
													(0, dates.ur)(
														new Date(
															subscription.cancellationTimestamp,
														),
														'MMMM yyyy',
													),
													'.',
												),
											context: (0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												emotion_react_jsx_runtime_browser_esm.HY,
												{
													children: [
														'If you would like to fund Guardian journalism again, please',
														' ',
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'a',
															{
																css: summaryLinkCss,
																href: 'https://support.theguardian.com/',
																children:
																	'support us today',
															},
														),
													],
												},
											),
										},
									),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									Card.Z,
									{
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												Card.Z.Header,
												{
													backgroundColor: isPuzzleApp
														? productColour.puzzleApp
														: productColour.inAppPurchase,
													children: (0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'h3',
														{
															css: productCardTitleCss(
																!isPuzzleApp,
															),
															children: [
																(0,
																lodash.capitalize)(
																	puzzleOrNews,
																),
																' app',
															],
														},
													),
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												Card.Z.Section,
												{
													children: (0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'div',
														{
															css: [
																productDetailLayoutCss,
																(0,
																emotion_react_browser_esm.iv)(
																	'margin-top:-',
																	space.D[2],
																	'px;',
																	'',
																),
																'',
																'',
															],
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'div',
																	{
																		css: (0,
																		emotion_react_browser_esm.iv)(
																			typography.Kz0,
																			';',
																			'',
																		),
																		children:
																			[
																				'You have unlimited access to the Guardian',
																				' ',
																				appStore ===
																					shared_mpapiResponse
																						.dk
																						.ANDROID &&
																					'Android',
																				appStore ===
																					shared_mpapiResponse
																						.dk
																						.IOS &&
																					'iOS',
																				' ',
																				puzzleOrNews,
																				' ',
																				'app.',
																			],
																	},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'div',
																	{
																		css: (0,
																		emotion_react_browser_esm.iv)(
																			'margin-top:',
																			space
																				.D[9],
																			'px;',
																			'',
																		),
																		children:
																			(0,
																			emotion_react_jsx_runtime_browser_esm.tZ)(
																				Button.z,
																				{
																					size: 'small',
																					onClick:
																						() => {
																							navigate(
																								'/email-prefs',
																							);
																						},
																					children:
																						'Manage marketing preferences',
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
								),
							],
						},
					);
				};
			try {
				(InAppPurchaseCard.displayName = 'InAppPurchaseCard'),
					(InAppPurchaseCard.__docgenInfo = {
						description: '',
						displayName: 'InAppPurchaseCard',
						props: {
							subscription: {
								defaultValue: null,
								description: '',
								name: 'subscription',
								required: !0,
								type: { name: 'AppSubscription' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/accountoverview/InAppPurchaseCard.tsx#InAppPurchaseCard'
						] = {
							docgenInfo: InAppPurchaseCard.__docgenInfo,
							name: 'InAppPurchaseCard',
							path: 'client/components/mma/accountoverview/InAppPurchaseCard.tsx#InAppPurchaseCard',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var toDate = __webpack_require__(
					'./node_modules/date-fns/esm/toDate/index.js',
				),
				requiredArgs = __webpack_require__(
					'./node_modules/date-fns/esm/_lib/requiredArgs/index.js',
				);
			var PersonalisedHeader = (_ref) => {
				var _userDetails$firstNam,
					{ mdapiResponse, mpapiResponse } = _ref,
					userDetails = mdapiResponse.user;
				if (
					!userDetails ||
					(0 === mdapiResponse.products.length &&
						0 === mpapiResponse.subscriptions.length)
				)
					return null;
				var currentHour,
					oldestDate = (function min(dirtyDatesArray) {
						var datesArray, result;
						if (
							((0, requiredArgs.Z)(1, arguments),
							dirtyDatesArray &&
								'function' == typeof dirtyDatesArray.forEach)
						)
							datesArray = dirtyDatesArray;
						else {
							if (
								'object' != typeof dirtyDatesArray ||
								null === dirtyDatesArray
							)
								return new Date(NaN);
							datesArray =
								Array.prototype.slice.call(dirtyDatesArray);
						}
						return (
							datesArray.forEach(function (dirtyDate) {
								var currentDate = (0, toDate.Z)(dirtyDate);
								(void 0 === result ||
									result > currentDate ||
									isNaN(currentDate)) &&
									(result = currentDate);
							}),
							result || new Date(NaN)
						);
					})([
						...mdapiResponse.products
							.filter(productResponse.v_)
							.map((p) => new Date(p.joinDate)),
						...mpapiResponse.subscriptions.map(
							(s) => new Date(s.from),
						),
					]),
					supportStartYear = (0, dates.ur)(oldestDate, 'MMMM yyyy');
				return (0, emotion_react_jsx_runtime_browser_esm.BX)('hgroup', {
					css: (0, emotion_react_browser_esm.iv)(
						'margin-top:',
						space.D[6],
						'px;',
						mq.Dp.tablet,
						'{margin-top:',
						space.D[8],
						'px;}',
						'',
					),
					children: [
						(0, emotion_react_jsx_runtime_browser_esm.BX)('h2', {
							css: (0, emotion_react_browser_esm.iv)(
								typography.vD7,
								';',
								mq.Dp.tablet,
								'{',
								typography.t_M,
								';}margin-bottom:0;',
								'',
							),
							'data-qm-masking': 'blocklist',
							children: [
								((currentHour = new Date().getHours()),
								currentHour < 12
									? 'Good morning'
									: currentHour < 18
									? 'Good afternoon'
									: 'Good evening'),
								', ',
								null !==
									(_userDetails$firstNam =
										userDetails.firstName) &&
								void 0 !== _userDetails$firstNam
									? _userDetails$firstNam
									: 'supporter',
							],
						}),
						(0, emotion_react_jsx_runtime_browser_esm.BX)('p', {
							css: (0, emotion_react_browser_esm.iv)(
								typography.N_U,
								';',
								'',
							),
							children: [
								'Thank you for funding the Guardian since ',
								supportStartYear,
							],
						}),
					],
				});
			};
			try {
				(PersonalisedHeader.displayName = 'PersonalisedHeader'),
					(PersonalisedHeader.__docgenInfo = {
						description: '',
						displayName: 'PersonalisedHeader',
						props: {
							mdapiResponse: {
								defaultValue: null,
								description: '',
								name: 'mdapiResponse',
								required: !0,
								type: { name: 'MembersDataApiResponse' },
							},
							mpapiResponse: {
								defaultValue: null,
								description: '',
								name: 'mpapiResponse',
								required: !0,
								type: { name: 'MPAPIResponse' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/accountoverview/PersonalisedHeader.tsx#PersonalisedHeader'
						] = {
							docgenInfo: PersonalisedHeader.__docgenInfo,
							name: 'PersonalisedHeader',
							path: 'client/components/mma/accountoverview/PersonalisedHeader.tsx#PersonalisedHeader',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var SvgInfoRound = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgInfoRound.js',
				),
				SvgGift = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgGift.js',
				),
				theme_reader_revenue = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/button/theme-reader-revenue.js',
				),
				colour_palette = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__deprecated__/colour/palette.js',
				),
				SvgTickRound = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgTickRound.js',
				),
				styles = __webpack_require__(
					'./node_modules/@guardian/source-development-kitchen/dist/react-components/summary/styles.js',
				);
			const SuccessSummary = ({
				message,
				context,
				cssOverrides,
				...props
			}) =>
				(0, emotion_react_jsx_runtime_browser_esm.BX)('div', {
					css: [(0, styles.eZ)(colour_palette.Vp[400]), cssOverrides],
					...props,
					children: [
						(0, emotion_react_jsx_runtime_browser_esm.tZ)('div', {
							css: (0, styles.$b)(colour_palette.Vp[400]),
							children: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								SvgTickRound.X,
								{},
							),
						}),
						(0, emotion_react_jsx_runtime_browser_esm.BX)('div', {
							css: styles._h,
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'div',
									{
										css: (0, styles.W_)(
											colour_palette.Vp[400],
										),
										children: message,
									},
								),
								context &&
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'div',
										{ css: styles.vl, children: context },
									),
							],
						}),
					],
				});
			var react_router_dom = __webpack_require__(
					'./node_modules/react-router-dom/index.js',
				),
				Ribbon = __webpack_require__(
					'./client/components/shared/Ribbon.tsx',
				),
				ErrorIcon = __webpack_require__(
					'./client/components/mma/shared/assets/ErrorIcon.tsx',
				),
				BenefitsToggle = __webpack_require__(
					'./client/components/mma/shared/benefits/BenefitsToggle.tsx',
				),
				NextPaymentDetails = __webpack_require__(
					'./client/components/mma/shared/NextPaymentDetails.tsx',
				),
				PaymentMethodDisplay = __webpack_require__(
					'./client/components/mma/shared/PaymentMethodDisplay.tsx',
				);
			var NewPriceAlert = () => {
					var iconCss = (0, emotion_react_browser_esm.iv)(
						'svg{position:relative;top:7px;margin-left:-4px;fill:',
						palette.palette.brand[500],
						';}',
						'',
					);
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						'span',
						{
							css: iconCss,
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									SvgInfoRound.r,
									{ size: 'small' },
								),
								'New price |',
								' ',
							],
						},
					);
				},
				ProductCard_ref = {
					name: 'f7ay7b',
					styles: 'justify-content:center',
				},
				_ref2 = { name: 'lzq57f', styles: 'max-width:350px' },
				_ref3 = { name: 'f7ay7b', styles: 'justify-content:center' },
				_ref4 = { name: 'f7ay7b', styles: 'justify-content:center' },
				_ref5 = { name: 'f7ay7b', styles: 'justify-content:center' },
				_ref6 = {
					name: 's7nn3p',
					styles: 'position:absolute;top:50%;transform:translateY(-50%);right:0',
				},
				ProductCard = (_ref7) => {
					var { productDetail, isEligibleToSwitch, user } = _ref7,
						navigate = (0, react_router.s0)(),
						mainPlan = (0, productResponse.fr)(
							productDetail.subscription,
						);
					if (!mainPlan)
						throw new Error(
							'mainPlan does not exist in ProductCard',
						);
					var specificProductType = (0, productResponse.Xn)(
							productDetail.tier,
						),
						groupedProductType =
							productTypes.HP[
								specificProductType.groupedProductType
							],
						isPatron =
							'Patron' === productDetail.subscription.readerType,
						entitledToEvents =
							['Partner', 'Patron'].includes(
								productDetail.tier,
							) && mainPlan.features.includes('Events'),
						productTitle = ''
							.concat(specificProductType.productTitle(mainPlan))
							.concat(isPatron ? ' — Patron' : ''),
						isGifted = (0, productResponse.XU)(
							productDetail.subscription,
						),
						userIsGifter = isGifted && productDetail.isPaidTier,
						giftPurchaseDate =
							productDetail.subscription.lastPaymentDate,
						shouldShowJoinDateNotStartDate =
							groupedProductType.shouldShowJoinDateNotStartDate,
						shouldShowStartDate = !(
							shouldShowJoinDateNotStartDate || userIsGifter
						),
						subscriptionStartDate =
							productDetail.subscription.start,
						subscriptionEndDate = productDetail.subscription.end,
						hasCancellationPending =
							productDetail.subscription.cancelledAt,
						isSafeToUpdatePaymentMethod =
							productDetail.subscription
								.safeToUpdatePaymentMethod,
						hasPaymentFailure = !!productDetail.alertText,
						nextPaymentDetails = (0, NextPaymentDetails.p)(
							mainPlan,
							productDetail.subscription,
							null,
							hasPaymentFailure,
						),
						showSwitchButton =
							isEligibleToSwitch &&
							!hasCancellationPending &&
							'contributions' === specificProductType.productType,
						productBenefits =
							'supporterplus' === specificProductType.productType
								? 'supporter benefits'
								: groupedProductType.friendlyName,
						cardConfig =
							productCardConfiguration[
								specificProductType.productType
							],
						giftRibbonColour = cardConfig.invertText
							? palette.palette.brand[400]
							: palette.palette.brandAlt[400],
						giftRibbonCopyColour = cardConfig.invertText
							? palette.palette.brandAlt[400]
							: palette.palette.brand[400],
						giftRibbonCss = _ref6,
						benefitsTextCss = (0, emotion_react_browser_esm.iv)(
							typography.Kz0,
							';margin:0;max-width:35ch;',
							'',
						),
						canBeInOfferPeriod =
							'supporterplus' === specificProductType.productType,
						canBeInPausePeriod =
							'contributions' === specificProductType.productType,
						isInOfferOrPausePeriod =
							!hasCancellationPending &&
							productDetail.subscription.nextPaymentDate &&
							productDetail.subscription
								.potentialCancellationDate &&
							productDetail.subscription.nextPaymentDate !==
								productDetail.subscription
									.potentialCancellationDate;
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						Stack.K,
						{
							space: 4,
							children: [
								hasCancellationPending &&
									productDetail.subscription.end &&
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										InfoSummary.w,
										{
											message: 'Your '.concat(
												groupedProductType.friendlyName,
												' has been cancelled',
											),
											context: (0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												emotion_react_jsx_runtime_browser_esm.HY,
												{
													children: [
														'You are able to access your ',
														productBenefits,
														' until',
														' ',
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'strong',
															{
																children: (0,
																dates.e1)(
																	productDetail
																		.subscription
																		.cancellationEffectiveDate,
																	dates.Bn,
																),
															},
														),
													],
												},
											),
										},
									),
								canBeInOfferPeriod &&
									isInOfferOrPausePeriod &&
									(0, productResponse.q4)(mainPlan) &&
									'month' === mainPlan.billingPeriod &&
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										SuccessSummary,
										{
											message: 'Your offer is active',
											context: (0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												emotion_react_jsx_runtime_browser_esm.HY,
												{
													children: [
														'Your two months free is now active until',
														' ',
														null ==
														nextPaymentDetails
															? void 0
															: nextPaymentDetails.nextPaymentDateValue,
														'. If you have any questions, feel free to',
														' ',
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															react_router_dom.rU,
															{
																to: '/help-centre#contact-options',
																css: (0,
																emotion_react_browser_esm.iv)(
																	'text-decoration:underline;color:',
																	palette
																		.palette
																		.brand[500],
																	';',
																	'',
																),
																children:
																	'contact our support team',
															},
														),
														'.',
													],
												},
											),
										},
									),
								canBeInPausePeriod &&
									isInOfferOrPausePeriod &&
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										SuccessSummary,
										{
											message:
												'You have paused your support',
											context: (0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												emotion_react_jsx_runtime_browser_esm.HY,
												{
													children: [
														'Your support is now paused until',
														' ',
														null ==
														nextPaymentDetails
															? void 0
															: nextPaymentDetails.nextPaymentDateValue,
														'. If you have any questions, feel free to',
														' ',
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															react_router_dom.rU,
															{
																to: '/help-centre#contact-options',
																css: (0,
																emotion_react_browser_esm.iv)(
																	'text-decoration:underline;color:',
																	palette
																		.palette
																		.brand[500],
																	';',
																	'',
																),
																children:
																	'contact our support team',
															},
														),
														'.',
													],
												},
											),
										},
									),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									Card.Z,
									{
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												Card.Z.Header,
												{
													backgroundColor:
														cardConfig.colour,
													minHeightOverride: 'auto',
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'h3',
															{
																css: productCardTitleCss(
																	cardConfig.invertText,
																),
																children:
																	productTitle,
															},
														),
														isGifted &&
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																Ribbon.V,
																{
																	copy: 'Gift',
																	ribbonColour:
																		giftRibbonColour,
																	copyColour:
																		giftRibbonCopyColour,
																	icon: (0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		SvgGift.s,
																		{
																			isAnnouncedByScreenReader:
																				!0,
																			size: 'small',
																			theme: {
																				fill: giftRibbonCopyColour,
																			},
																		},
																	),
																	additionalCss:
																		giftRibbonCss,
																},
															),
													],
												},
											),
											cardConfig.showBenefitsSection &&
												nextPaymentDetails &&
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													Card.Z.Section,
													{
														backgroundColor:
															'#edf5fA',
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'p',
																{
																	css: benefitsTextCss,
																	children: [
																		'You’re supporting the Guardian with',
																		' ',
																		nextPaymentDetails.paymentValue,
																		' per',
																		' ',
																		nextPaymentDetails.paymentInterval,
																		', and have access to exclusive extras.',
																	],
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																BenefitsToggle.r,
																{
																	productType:
																		specificProductType.productType,
																	subscriptionPlan:
																		mainPlan,
																},
															),
														],
													},
												),
											'guardianadlite' ===
												specificProductType.productType &&
												nextPaymentDetails &&
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													Card.Z.Section,
													{
														backgroundColor:
															'#edf5fA',
														children: (0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															'p',
															{
																css: benefitsTextCss,
																children: [
																	'You’re subscribed to',
																	' ',
																	specificProductType.productTitle(),
																	' and pay',
																	' ',
																	nextPaymentDetails.paymentValueShort,
																	' a',
																	' ',
																	nextPaymentDetails.paymentInterval,
																	' for non-personalised advertising.',
																],
															},
														),
													},
												),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												Card.Z.Section,
												{
													children: (0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'div',
														{
															css: productDetailLayoutCss,
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'div',
																	{
																		children:
																			[
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					'h4',
																					{
																						css: sectionHeadingCss,
																						children:
																							'Billing and payment',
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.BX)(
																					'dl',
																					{
																						css: keyValueCss,
																						children:
																							[
																								(0,
																								emotion_react_jsx_runtime_browser_esm.BX)(
																									'div',
																									{
																										children:
																											[
																												(0,
																												emotion_react_jsx_runtime_browser_esm.tZ)(
																													'dt',
																													{
																														children:
																															groupedProductType.showSupporterId
																																? 'Supporter ID'
																																: 'Subscription ID',
																													},
																												),
																												(0,
																												emotion_react_jsx_runtime_browser_esm.tZ)(
																													'dd',
																													{
																														'data-qm-masking':
																															'blocklist',
																														children:
																															productDetail
																																.subscription
																																.subscriptionId,
																													},
																												),
																											],
																									},
																								),
																								groupedProductType.tierLabel &&
																									(0,
																									emotion_react_jsx_runtime_browser_esm.BX)(
																										'div',
																										{
																											children:
																												[
																													(0,
																													emotion_react_jsx_runtime_browser_esm.tZ)(
																														'dt',
																														{
																															children:
																																groupedProductType.tierLabel,
																														},
																													),
																													(0,
																													emotion_react_jsx_runtime_browser_esm.tZ)(
																														'dd',
																														{
																															children:
																																productDetail.tier,
																														},
																													),
																												],
																										},
																									),
																								subscriptionStartDate &&
																									shouldShowStartDate &&
																									(0,
																									emotion_react_jsx_runtime_browser_esm.BX)(
																										'div',
																										{
																											children:
																												[
																													(0,
																													emotion_react_jsx_runtime_browser_esm.tZ)(
																														'dt',
																														{
																															children:
																																'Start date',
																														},
																													),
																													(0,
																													emotion_react_jsx_runtime_browser_esm.tZ)(
																														'dd',
																														{
																															children:
																																(0,
																																dates.sG)(
																																	subscriptionStartDate,
																																).dateStr(),
																														},
																													),
																												],
																										},
																									),
																								shouldShowJoinDateNotStartDate &&
																									(0,
																									emotion_react_jsx_runtime_browser_esm.BX)(
																										'div',
																										{
																											children:
																												[
																													(0,
																													emotion_react_jsx_runtime_browser_esm.tZ)(
																														'dt',
																														{
																															children:
																																'Join date',
																														},
																													),
																													(0,
																													emotion_react_jsx_runtime_browser_esm.tZ)(
																														'dd',
																														{
																															children:
																																(0,
																																dates.sG)(
																																	productDetail.joinDate,
																																).dateStr(),
																														},
																													),
																												],
																										},
																									),
																								userIsGifter &&
																									giftPurchaseDate &&
																									(0,
																									emotion_react_jsx_runtime_browser_esm.BX)(
																										'div',
																										{
																											children:
																												[
																													(0,
																													emotion_react_jsx_runtime_browser_esm.tZ)(
																														'dt',
																														{
																															children:
																																'Purchase date',
																														},
																													),
																													(0,
																													emotion_react_jsx_runtime_browser_esm.tZ)(
																														'dd',
																														{
																															children:
																																(0,
																																dates.sG)(
																																	giftPurchaseDate,
																																).dateStr(),
																														},
																													),
																												],
																										},
																									),
																								isGifted &&
																									!userIsGifter &&
																									(0,
																									emotion_react_jsx_runtime_browser_esm.BX)(
																										'div',
																										{
																											children:
																												[
																													(0,
																													emotion_react_jsx_runtime_browser_esm.tZ)(
																														'dt',
																														{
																															children:
																																'End date',
																														},
																													),
																													(0,
																													emotion_react_jsx_runtime_browser_esm.tZ)(
																														'dd',
																														{
																															children:
																																(0,
																																dates.sG)(
																																	subscriptionEndDate,
																																).dateStr(),
																														},
																													),
																												],
																										},
																									),
																								specificProductType.showTrialRemainingIfApplicable &&
																									productDetail
																										.subscription
																										.trialLength >
																										0 &&
																									!isGifted &&
																									'Patron' !==
																										productDetail
																											.subscription
																											.readerType &&
																									(0,
																									emotion_react_jsx_runtime_browser_esm.BX)(
																										'div',
																										{
																											children:
																												[
																													(0,
																													emotion_react_jsx_runtime_browser_esm.tZ)(
																														'dt',
																														{
																															children:
																																'Trial remaining',
																														},
																													),
																													(0,
																													emotion_react_jsx_runtime_browser_esm.BX)(
																														'dd',
																														{
																															children:
																																[
																																	productDetail
																																		.subscription
																																		.trialLength,
																																	' ',
																																	1 !==
																																	productDetail
																																		.subscription
																																		.trialLength
																																		? 'days'
																																		: 'day',
																																],
																														},
																													),
																												],
																										},
																									),
																								nextPaymentDetails &&
																									productDetail
																										.subscription
																										.autoRenew &&
																									!hasCancellationPending &&
																									(0,
																									emotion_react_jsx_runtime_browser_esm.BX)(
																										'div',
																										{
																											children:
																												[
																													(0,
																													emotion_react_jsx_runtime_browser_esm.tZ)(
																														'dt',
																														{
																															children:
																																nextPaymentDetails.paymentKey,
																														},
																													),
																													(0,
																													emotion_react_jsx_runtime_browser_esm.BX)(
																														'dd',
																														{
																															children:
																																[
																																	nextPaymentDetails.isNewPaymentValue &&
																																		(0,
																																		emotion_react_jsx_runtime_browser_esm.tZ)(
																																			NewPriceAlert,
																																			{},
																																		),
																																	nextPaymentDetails.paymentValue,
																																	nextPaymentDetails.nextPaymentDateValue &&
																																		'Patron' !==
																																			productDetail
																																				.subscription
																																				.readerType &&
																																		' on '.concat(
																																			nextPaymentDetails.nextPaymentDateValue,
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
																			],
																	},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'div',
																	{
																		css: ButtonStyles.N6,
																		children:
																			[
																				!isGifted &&
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						Button.z,
																						{
																							'aria-label':
																								''
																									.concat(
																										specificProductType.productTitle(
																											mainPlan,
																										),
																										' : Manage ',
																									)
																									.concat(
																										groupedProductType.friendlyName,
																									),
																							'data-cy':
																								'Manage '.concat(
																									groupedProductType.friendlyName,
																								),
																							size: 'small',
																							cssOverrides:
																								_ref5,
																							onClick:
																								() => {
																									(0,
																									analytics.L9)(
																										{
																											eventCategory:
																												'account_overview',
																											eventAction:
																												'click',
																											eventLabel:
																												'manage_'.concat(
																													specificProductType.urlPart,
																												),
																										},
																									),
																										navigate(
																											'/'.concat(
																												specificProductType.urlPart,
																											),
																											{
																												state: {
																													productDetail,
																												},
																											},
																										);
																								},
																							children:
																								'Manage '.concat(
																									groupedProductType.friendlyName,
																								),
																						},
																					),
																				showSwitchButton &&
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						Button.z,
																						{
																							theme: theme_reader_revenue.gk,
																							size: 'small',
																							cssOverrides:
																								_ref4,
																							onClick:
																								() =>
																									navigate(
																										'/switch',
																										{
																											state: {
																												productDetail,
																												user,
																											},
																										},
																									),
																							children:
																								'Change to all-access digital',
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
											entitledToEvents &&
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													Card.Z.Section,
													{
														children: (0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															'div',
															{
																children: [
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'h4',
																		{
																			css: sectionHeadingCss,
																			children:
																				'Guardian Live - Ticket Tailor promo codes',
																		},
																	),
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'div',
																		{
																			children:
																				(0,
																				emotion_react_jsx_runtime_browser_esm.BX)(
																					'dl',
																					{
																						css: keyValueCss,
																						children:
																							[
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									'dt',
																									{
																										children:
																											window.atob(
																												'TFBQRlJFRTZHTFRY',
																											),
																									},
																								),
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									'dd',
																									{
																										children:
																											'gives you 6 free tickets each year (1 per event)',
																									},
																								),
																							],
																					},
																				),
																		},
																	),
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'div',
																		{
																			children:
																				(0,
																				emotion_react_jsx_runtime_browser_esm.BX)(
																					'dl',
																					{
																						css: keyValueCss,
																						children:
																							[
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									'dt',
																									{
																										children:
																											window.atob(
																												'TFBQMjAyR0xUWA==',
																											),
																									},
																								),
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									'dd',
																									{
																										children:
																											'gives you 20% off an extra 2 tickets per event',
																									},
																								),
																							],
																					},
																				),
																		},
																	),
																],
															},
														),
													},
												),
											productDetail.isPaidTier &&
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													Card.Z.Section,
													{
														children: (0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															'div',
															{
																css: productDetailLayoutCss,
																children: [
																	(0,
																	emotion_react_jsx_runtime_browser_esm.BX)(
																		'div',
																		{
																			children:
																				[
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						'h4',
																						{
																							css: sectionHeadingCss,
																							children:
																								'Payment method',
																						},
																					),
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						PaymentMethodDisplay.C,
																						{
																							subscription:
																								productDetail.subscription,
																							inPaymentFailure:
																								hasPaymentFailure,
																						},
																					),
																				],
																		},
																	),
																	!isGifted &&
																		isSafeToUpdatePaymentMethod &&
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'div',
																			{
																				css: ButtonStyles.N6,
																				children:
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						Button.z,
																						{
																							'aria-label':
																								''.concat(
																									specificProductType.productTitle(
																										mainPlan,
																									),
																									' : Update payment method',
																								),
																							size: 'small',
																							cssOverrides:
																								_ref3,
																							priority:
																								'primary',
																							icon: hasPaymentFailure
																								? (0,
																								  emotion_react_jsx_runtime_browser_esm.tZ)(
																										ErrorIcon.P,
																										{
																											fill: palette
																												.palette
																												.neutral[100],
																										},
																								  )
																								: void 0,
																							onClick:
																								() => {
																									(0,
																									analytics.L9)(
																										{
																											eventCategory:
																												'account_overview',
																											eventAction:
																												'click',
																											eventLabel:
																												'manage_payment_method',
																										},
																									),
																										navigate(
																											'/payment/'.concat(
																												specificProductType.urlPart,
																											),
																											{
																												state: {
																													productDetail,
																												},
																											},
																										);
																								},
																							children:
																								'Update payment method',
																						},
																					),
																			},
																		),
																],
															},
														),
													},
												),
											!productDetail.isPaidTier &&
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													Card.Z.Section,
													{
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'h4',
																{
																	css: sectionHeadingCss,
																	children:
																		'Payment',
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'p',
																{
																	css: (0,
																	emotion_react_browser_esm.iv)(
																		typography.Kz0,
																		';margin:0;',
																		'',
																	),
																	children:
																		isGifted
																			? 'Gift redemption'
																			: 'Free',
																},
															),
														],
													},
												),
											'United States' ===
												productDetail.billingCountry &&
												!hasCancellationPending &&
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													Card.Z.Section,
													{
														children: (0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															'div',
															{
																css: productDetailLayoutCss,
																children: [
																	(0,
																	emotion_react_jsx_runtime_browser_esm.BX)(
																		'div',
																		{
																			children:
																				[
																					(0,
																					emotion_react_jsx_runtime_browser_esm.BX)(
																						'h4',
																						{
																							css: sectionHeadingCss,
																							children:
																								[
																									'Cancel ',
																									groupedProductType.friendlyName,
																								],
																						},
																					),
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						'p',
																						{
																							css: _ref2,
																							children:
																								'Stop your recurring payment, at the end of current billing period.',
																						},
																					),
																				],
																		},
																	),
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'div',
																		{
																			css: ButtonStyles.N6,
																			children:
																				(0,
																				emotion_react_jsx_runtime_browser_esm.BX)(
																					Button.z,
																					{
																						'aria-label':
																							'Cancel '.concat(
																								specificProductType.productTitle(
																									mainPlan,
																								),
																							),
																						size: 'small',
																						cssOverrides:
																							ProductCard_ref,
																						priority:
																							'primary',
																						onClick:
																							() => {
																								(0,
																								analytics.L9)(
																									{
																										eventCategory:
																											'account_overview',
																										eventAction:
																											'click',
																										eventLabel:
																											'cancel_product',
																									},
																								),
																									navigate(
																										'/cancel/'.concat(
																											specificProductType.urlPart,
																										),
																										{
																											state: {
																												productDetail,
																											},
																										},
																									);
																							},
																						children:
																							[
																								'Cancel ',
																								groupedProductType.friendlyName,
																							],
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
								),
							],
						},
					);
				};
			try {
				(ProductCard.displayName = 'ProductCard'),
					(ProductCard.__docgenInfo = {
						description: '',
						displayName: 'ProductCard',
						props: {
							productDetail: {
								defaultValue: null,
								description: '',
								name: 'productDetail',
								required: !0,
								type: { name: 'ProductDetail' },
							},
							isEligibleToSwitch: {
								defaultValue: null,
								description: '',
								name: 'isEligibleToSwitch',
								required: !0,
								type: { name: 'boolean' },
							},
							user: {
								defaultValue: null,
								description: '',
								name: 'user',
								required: !1,
								type: { name: 'MembersDataApiUser' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/accountoverview/ProductCard.tsx#ProductCard'
						] = {
							docgenInfo: ProductCard.__docgenInfo,
							name: 'ProductCard',
							path: 'client/components/mma/accountoverview/ProductCard.tsx#ProductCard',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var currencyIso = __webpack_require__(
				'./client/utilities/currencyIso.ts',
			);
			function getAmountDisplay(contribution) {
				var currencySymbol = (0, currencyIso.vD)(contribution.currency);
				return currencySymbol
					? ''.concat(currencySymbol).concat(contribution.price)
					: ''
							.concat(contribution.price, ' ')
							.concat(contribution.currency);
			}
			var SingleContributionCard_ref = {
					name: 'f7ay7b',
					styles: 'justify-content:center',
				},
				SingleContributionCard = (_ref2) => {
					var { singleContributions } = _ref2,
						navigate = (0, react_router.s0)();
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						Stack.K,
						{
							space: 4,
							children: (0,
							emotion_react_jsx_runtime_browser_esm.BX)(Card.Z, {
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										Card.Z.Header,
										{
											backgroundColor:
												productColour.singleContribution,
											children: (0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'h3',
												{
													css: productCardTitleCss(
														!0,
													),
													children:
														'One-time Support',
												},
											),
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										Card.Z.Section,
										{
											children: (0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'div',
												{
													css: [
														productDetailLayoutCss,
														(0,
														emotion_react_browser_esm.iv)(
															'margin-top:-',
															space.D[2],
															'px;',
															'',
														),
														'',
														'',
													],
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'dl',
															{
																css: keyValueCss,
																children:
																	singleContributions.map(
																		(
																			contribution,
																		) =>
																			(0,
																			emotion_react_jsx_runtime_browser_esm.BX)(
																				'span',
																				{
																					children:
																						[
																							(0,
																							emotion_react_jsx_runtime_browser_esm.BX)(
																								'div',
																								{
																									css: (0,
																									emotion_react_browser_esm.iv)(
																										'padding-top:',
																										space
																											.D[3],
																										"px;dt{:after{content:'';}}",
																										'',
																									),
																									children:
																										[
																											(0,
																											emotion_react_jsx_runtime_browser_esm.tZ)(
																												'dt',
																												{
																													children:
																														'One-time contribution of',
																												},
																											),
																											(0,
																											emotion_react_jsx_runtime_browser_esm.tZ)(
																												'dd',
																												{
																													children:
																														getAmountDisplay(
																															contribution,
																														),
																												},
																											),
																										],
																								},
																							),
																							(0,
																							emotion_react_jsx_runtime_browser_esm.BX)(
																								'div',
																								{
																									children:
																										[
																											(0,
																											emotion_react_jsx_runtime_browser_esm.tZ)(
																												'dt',
																												{
																													children:
																														'Date of contribution',
																												},
																											),
																											(0,
																											emotion_react_jsx_runtime_browser_esm.tZ)(
																												'dd',
																												{
																													children:
																														(0,
																														dates.gg)(
																															contribution.created,
																														),
																												},
																											),
																										],
																								},
																							),
																						],
																				},
																				contribution.created,
																			),
																	),
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'div',
															{
																css: ButtonStyles.N6,
																children: (0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	Button.z,
																	{
																		cssOverrides:
																			SingleContributionCard_ref,
																		size: 'small',
																		onClick:
																			() => {
																				navigate(
																					'/email-prefs',
																				);
																			},
																		children:
																			'Manage marketing preferences',
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
							}),
						},
					);
				};
			try {
				(SingleContributionCard.displayName = 'SingleContributionCard'),
					(SingleContributionCard.__docgenInfo = {
						description: '',
						displayName: 'SingleContributionCard',
						props: {
							singleContributions: {
								defaultValue: null,
								description: '',
								name: 'singleContributions',
								required: !0,
								type: { name: 'SingleProductDetail[]' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/accountoverview/SingleContributionCard.tsx#SingleContributionCard'
						] = {
							docgenInfo: SingleContributionCard.__docgenInfo,
							name: 'SingleContributionCard',
							path: 'client/components/mma/accountoverview/SingleContributionCard.tsx#SingleContributionCard',
						});
			} catch (__react_docgen_typescript_loader_error) {}
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
			var subHeadingCss = (0, emotion_react_browser_esm.iv)(
					'margin:',
					space.D[6],
					'px 0 ',
					space.D[6],
					'px;border-top:1px solid ',
					palette.palette.neutral[86],
					';',
					typography.Hu7,
					';',
					mq.C4.tablet,
					'{font-size:1.25rem;line-height:1.6;}',
					mq.Dp.tablet,
					'{margin-top:',
					space.D[8],
					'px;}',
					'',
				),
				AccountOverviewPage = (_ref) => {
					var _allActiveProductDeta,
						{ isFromApp } = _ref,
						{ data: accountOverviewResponse, loadingState } = (0,
						useAsyncLoader.c)(
							accountOverviewFetcher,
							DefaultApiResponseHandler.xJ,
						);
					if (loadingState == useAsyncLoader.G.HasError)
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							GenericErrorScreen.c,
							{},
						);
					if (loadingState == useAsyncLoader.G.IsLoading)
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							DefaultLoadingView.I,
							{
								loadingMessage:
									'Loading your account details...',
							},
						);
					if (null === accountOverviewResponse)
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							GenericErrorScreen.c,
							{},
						);
					var [
							mdapiResponse,
							cancelledProductsResponse,
							mpapiResponse,
							singleContributions,
						] = accountOverviewResponse,
						allActiveProductDetails = mdapiResponse.products
							.filter(productResponse.v_)
							.sort(productResponse.e$),
						allCancelledProductDetails =
							cancelledProductsResponse.sort((a, b) =>
								b.subscription.start.localeCompare(
									a.subscription.start,
								),
							),
						allProductCategories = [
							...allActiveProductDetails,
							...allCancelledProductDetails,
						].map((product) => {
							var specificProductType = (0, productResponse.Xn)(
								product.tier,
							);
							return 'recurringSupportWithBenefits' ===
								specificProductType.groupedProductType
								? 'subscriptions'
								: specificProductType.groupedProductType;
						}),
						uniqueProductCategories = [
							...new Set(allProductCategories),
						],
						appSubscriptions = mpapiResponse.subscriptions.filter(
							shared_mpapiResponse.hb,
						);
					if (
						(featureSwitches.k.appSubscriptions &&
							appSubscriptions.length > 0 &&
							!uniqueProductCategories.includes(
								'subscriptions',
							) &&
							uniqueProductCategories.push('subscriptions'),
						singleContributions.length > 0 &&
							!uniqueProductCategories.includes(
								'subscriptions',
							) &&
							uniqueProductCategories.push('subscriptions'),
						0 === allActiveProductDetails.length &&
							0 === allCancelledProductDetails.length &&
							0 === appSubscriptions.length &&
							0 === singleContributions.length)
					)
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							EmptyAccountOverview.j,
							{},
						);
					var maybeFirstPaymentFailure = allActiveProductDetails.find(
							(product) => product.alertText,
						),
						hasDigiSubAndContribution =
							allActiveProductDetails.some((productDetail) =>
								(0, productResponse.lj)(
									productDetail,
									productTypes.Pm.contributions,
								),
							) &&
							allActiveProductDetails.some((productDetail) =>
								(0, productResponse.lj)(
									productDetail,
									productTypes.Pm.digipack,
								),
							),
						hasDigitalPlusPrint = allActiveProductDetails.some(
							(productDetail) =>
								(0, productResponse.lj)(
									productDetail,
									productTypes.Pm.tierthree,
								),
						),
						hasNonServiceableCountry =
							NonServiceableCountries.D.includes(
								null ===
									(_allActiveProductDeta =
										allActiveProductDetails.find(
											productResponse.v_,
										)) || void 0 === _allActiveProductDeta
									? void 0
									: _allActiveProductDeta.billingCountry,
							),
						isEligibleToSwitch =
							!maybeFirstPaymentFailure &&
							!hasDigiSubAndContribution &&
							!hasNonServiceableCountry,
						visualProductGroupingCategory = (product) => {
							var specificProductType = (0, productResponse.Xn)(
								product.tier,
							);
							return 'recurringSupportWithBenefits' ===
								specificProductType.groupedProductType
								? 'subscriptions'
								: specificProductType.groupedProductType;
						};
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									PersonalisedHeader,
									{ mdapiResponse, mpapiResponse },
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									PaymentFailureAlertIfApplicable.T,
									{
										productDetails: allActiveProductDetails,
										isFromApp,
									},
								),
								uniqueProductCategories.map((category) => {
									var groupedProductType =
											productTypes.HP[category],
										activeProductsInCategory =
											allActiveProductDetails.filter(
												(activeProduct) =>
													visualProductGroupingCategory(
														activeProduct,
													) === category,
											),
										cancelledProductsInCategory =
											allCancelledProductDetails.filter(
												(cancelledProduct) =>
													visualProductGroupingCategory(
														cancelledProduct,
													) === category,
											);
									return (0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										react.Fragment,
										{
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'h2',
													{
														css: subHeadingCss,
														children: (0,
														lodash.capitalize)(
															groupedProductType.groupFriendlyName,
														),
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													Stack.K,
													{
														space: 6,
														children: [
															activeProductsInCategory.map(
																(
																	productDetail,
																) =>
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		ProductCard,
																		{
																			productDetail,
																			isEligibleToSwitch,
																			user: mdapiResponse.user,
																		},
																		productDetail
																			.subscription
																			.subscriptionId,
																	),
															),
															cancelledProductsInCategory.map(
																(
																	cancelledProductDetail,
																) =>
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		CancelledProductCard,
																		{
																			productDetail:
																				cancelledProductDetail,
																		},
																		cancelledProductDetail
																			.subscription
																			.subscriptionId,
																	),
															),
															groupedProductType.supportTheGuardianSectionProps &&
																(cancelledProductsInCategory.length >
																	0 ||
																	activeProductsInCategory.some(
																		(
																			productDetail,
																		) =>
																			(0,
																			CancellationSummary.j)(
																				productDetail.subscription,
																			),
																	)) &&
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'div',
																	{
																		children:
																			[
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
																							groupedProductType
																								.supportTheGuardianSectionProps
																								.message,
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					SupportTheGuardianButton.o,
																					_objectSpread(
																						_objectSpread(
																							{},
																							groupedProductType.supportTheGuardianSectionProps,
																						),
																						{},
																						{
																							size: 'small',
																						},
																					),
																				),
																			],
																	},
																),
															featureSwitches.k
																.appSubscriptions &&
																appSubscriptions.length >
																	0 &&
																'subscriptions' ===
																	category &&
																appSubscriptions.map(
																	(
																		subscription,
																	) =>
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			InAppPurchaseCard,
																			{
																				subscription,
																			},
																			subscription.subscriptionId,
																		),
																),
															'subscriptions' ===
																category &&
																singleContributions.length >
																	0 &&
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	SingleContributionCard,
																	{
																		singleContributions,
																	},
																),
														],
													},
												),
											],
										},
										category,
									);
								}),
								hasDigitalPlusPrint &&
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										emotion_react_jsx_runtime_browser_esm.HY,
										{
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'h2',
													{
														css: subHeadingCss,
														children:
															'Get the most out of your benefits',
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													Stack.K,
													{
														space: 6,
														children: [
															featureSwitches.k
																.digitalArchiveCta &&
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	NewspaperArchiveCta.z,
																	{},
																),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																DownloadAppCtaVariation1.G,
																{},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																DownloadFeastAppCtaWithImage.I,
																{},
															),
														],
													},
												),
											],
										},
									),
							],
						},
					);
				},
				accountOverviewFetcher = () =>
					Promise.all([
						(0, productUtils.EV)(),
						(0, fetch.n4)('/api/cancelled/'),
						(0, fetch.n4)('/mpapi/user/mobile-subscriptions'),
						(0, productUtils.vD)(),
					]),
				AccountOverview = (_ref2) => {
					var { isFromApp } = _ref2;
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						Page._,
						{
							selectedNavItem: NavConfig.qy.accountOverview,
							pageTitle: 'Account overview',
							children: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								AccountOverviewPage,
								{ isFromApp },
							),
						},
					);
				};
			try {
				(AccountOverview.displayName = 'AccountOverview'),
					(AccountOverview.__docgenInfo = {
						description: '',
						displayName: 'AccountOverview',
						props: {
							isFromApp: {
								defaultValue: null,
								description: '',
								name: 'isFromApp',
								required: !1,
								type: { name: 'boolean' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/accountoverview/AccountOverview.tsx#AccountOverview'
						] = {
							docgenInfo: AccountOverview.__docgenInfo,
							name: 'AccountOverview',
							path: 'client/components/mma/accountoverview/AccountOverview.tsx#AccountOverview',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			function AccountOverview_stories_ownKeys(e, r) {
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
			function AccountOverview_stories_objectSpread(e) {
				for (var r = 1; r < arguments.length; r++) {
					var t = null != arguments[r] ? arguments[r] : {};
					r % 2
						? AccountOverview_stories_ownKeys(
								Object(t),
								!0,
						  ).forEach(function (r) {
								AccountOverview_stories_defineProperty(
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
						: AccountOverview_stories_ownKeys(Object(t)).forEach(
								function (r) {
									Object.defineProperty(
										e,
										r,
										Object.getOwnPropertyDescriptor(t, r),
									);
								},
						  );
				}
				return e;
			}
			function AccountOverview_stories_defineProperty(obj, key, value) {
				return (
					(key = (function AccountOverview_stories_toPropertyKey(
						arg,
					) {
						var key = (function AccountOverview_stories_toPrimitive(
							input,
							hint,
						) {
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
			featureSwitches.k.appSubscriptions = !0;
			const AccountOverview_stories = {
				title: 'Pages/AccountOverview',
				component: AccountOverview,
				decorators: [ReactRouterDecorator.R],
				parameters: { layout: 'fullscreen' },
			};
			var NoSubscription = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							AccountOverview,
							{},
						),
					parameters: {
						msw: [
							http.d.get('/api/cancelled/', () =>
								HttpResponse.Z.json([]),
							),
							http.d.get('/mpapi/user/mobile-subscriptions', () =>
								HttpResponse.Z.json({ subscriptions: [] }),
							),
							http.d.get('/api/me/mma', () =>
								HttpResponse.Z.json((0, mdapiResponse.F)()),
							),
							http.d.get('/idapi/user', () =>
								HttpResponse.Z.json(user.E),
							),
							http.d.get('/api/me/one-off-contributions', () =>
								HttpResponse.Z.json([]),
							),
						],
					},
				},
				WithSubscriptions = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							AccountOverview,
							{},
						),
					parameters: {
						msw: [
							http.d.get('/api/cancelled/', () =>
								HttpResponse.Z.json([]),
							),
							http.d.get('/mpapi/user/mobile-subscriptions', () =>
								HttpResponse.Z.json({ subscriptions: [] }),
							),
							http.d.get('/api/me/mma', () =>
								HttpResponse.Z.json(
									(0, mdapiResponse.F)(
										(0, testProducts.X8)(),
										(0, testProducts.IB)(),
										(0, testProducts.Y$)(),
										(0, testProducts.x2)(),
										(0, testProducts.Of)(),
										(0, testProducts.gx)(),
										(0, testProducts.uU)(),
										(0, testProducts.LE)(),
									),
								),
							),
							http.d.get('/api/me/one-off-contributions', () =>
								HttpResponse.Z.json([]),
							),
						],
					},
				},
				WithUSASubscription = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							AccountOverview,
							{},
						),
					parameters: {
						msw: [
							http.d.get('/api/cancelled/', () =>
								HttpResponse.Z.json([]),
							),
							http.d.get('/mpapi/user/mobile-subscriptions', () =>
								HttpResponse.Z.json({ subscriptions: [] }),
							),
							http.d.get('/api/me/mma', () =>
								HttpResponse.Z.json(
									(0, mdapiResponse.F)(
										(0, testProducts.gD)(),
									),
								),
							),
							http.d.get('/api/me/one-off-contributions', () =>
								HttpResponse.Z.json([]),
							),
						],
					},
				},
				WithContributionAndSwitchPossible = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							AccountOverview,
							{},
						),
					parameters: {
						msw: [
							http.d.get('/api/cancelled/', () =>
								HttpResponse.Z.json([]),
							),
							http.d.get('/mpapi/user/mobile-subscriptions', () =>
								HttpResponse.Z.json({ subscriptions: [] }),
							),
							http.d.get('/api/me/mma', () =>
								HttpResponse.Z.json(
									(0, mdapiResponse.F)(
										(0, testProducts.uH)(),
									),
								),
							),
							http.d.get('/api/me/one-off-contributions', () =>
								HttpResponse.Z.json([]),
							),
						],
					},
				},
				WithContributionInPaymentFailure = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							AccountOverview,
							{},
						),
					parameters: {
						msw: [
							http.d.get('/api/cancelled/', () =>
								HttpResponse.Z.json([]),
							),
							http.d.get('/mpapi/user/mobile-subscriptions', () =>
								HttpResponse.Z.json({ subscriptions: [] }),
							),
							http.d.get('/api/me/mma', () =>
								HttpResponse.Z.json(
									(0, mdapiResponse.F)(
										contributionPaymentFailure,
										(0, testProducts.gx)(),
									),
								),
							),
							http.d.get('/api/me/one-off-contributions', () =>
								HttpResponse.Z.json([]),
							),
						],
					},
				},
				contributionPaymentFailure =
					AccountOverview_stories_objectSpread(
						AccountOverview_stories_objectSpread(
							{},
							(0, testProducts.uH)(),
						),
						{},
						{ alertText: 'Your payment has failed.' },
					),
				WithContributionAndSwitchNotPossible = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							AccountOverview,
							{},
						),
					parameters: {
						msw: [
							http.d.get('/api/cancelled/', () =>
								HttpResponse.Z.json([]),
							),
							http.d.get('/mpapi/user/mobile-subscriptions', () =>
								HttpResponse.Z.json({ subscriptions: [] }),
							),
							http.d.get('/api/me/mma', () =>
								HttpResponse.Z.json(
									(0, mdapiResponse.F)(
										(0, testProducts.uH)(),
										(0, testProducts.IB)(),
									),
								),
							),
							http.d.get('/api/me/one-off-contributions', () =>
								HttpResponse.Z.json([]),
							),
						],
					},
				},
				WithCancelledSubscriptions = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							AccountOverview,
							{},
						),
					parameters: {
						msw: [
							http.d.get('/api/cancelled/', () =>
								HttpResponse.Z.json([
									cancelledContribution,
									cancelledGuardianWeekly,
									cancelledGuardianAdLite,
								]),
							),
							http.d.get('/mpapi/user/mobile-subscriptions', () =>
								HttpResponse.Z.json({ subscriptions: [] }),
							),
							http.d.get('/api/me/mma', () =>
								HttpResponse.Z.json(
									(0, mdapiResponse.F)(
										(0, testProducts.EM)(),
										(0, testProducts.SN)(),
										(0, testProducts.tv)(),
										(0, testProducts.pz)(),
										(0, testProducts.kj)(),
										(0, testProducts.uU)(),
									),
								),
							),
							http.d.get('/api/me/one-off-contributions', () =>
								HttpResponse.Z.json([]),
							),
						],
					},
				},
				WithGiftSubscriptions = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							AccountOverview,
							{},
						),
					parameters: {
						msw: [
							http.d.get('/api/cancelled/', () =>
								HttpResponse.Z.json([]),
							),
							http.d.get('/mpapi/user/mobile-subscriptions', () =>
								HttpResponse.Z.json({ subscriptions: [] }),
							),
							http.d.get('/api/me/mma', () =>
								HttpResponse.Z.json(
									(0, mdapiResponse.F)(
										(0, testProducts._8)(),
										(0, testProducts.uV)(),
									),
								),
							),
							http.d.get('/api/me/one-off-contributions', () =>
								HttpResponse.Z.json([]),
							),
						],
					},
				},
				WithAppSubscriptions = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							AccountOverview,
							{},
						),
					parameters: {
						msw: [
							http.d.get('/api/cancelled/', () =>
								HttpResponse.Z.json([]),
							),
							http.d.get('/mpapi/user/mobile-subscriptions', () =>
								HttpResponse.Z.json({
									subscriptions: [
										inAppPurchase.Id,
										inAppPurchase.$E,
										inAppPurchase.go,
										inAppPurchase.Dk,
									],
								}),
							),
							http.d.get('/api/me/mma', () =>
								HttpResponse.Z.json((0, mdapiResponse.F)()),
							),
							http.d.get('/api/me/one-off-contributions', () =>
								HttpResponse.Z.json([]),
							),
						],
					},
				},
				WithSingleContribution = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							AccountOverview,
							{},
						),
					parameters: {
						msw: [
							http.d.get('/api/cancelled/', () =>
								HttpResponse.Z.json([]),
							),
							http.d.get('/mpapi/user/mobile-subscriptions', () =>
								HttpResponse.Z.json({ subscriptions: [] }),
							),
							http.d.get('/api/me/mma', () =>
								HttpResponse.Z.json((0, mdapiResponse.F)()),
							),
							http.d.get('/api/me/one-off-contributions', () =>
								HttpResponse.Z.json(singleContribution.p),
							),
						],
					},
				},
				WithSupporterPlusDuringOffer = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							AccountOverview,
							{},
						),
					parameters: {
						msw: [
							http.d.get('/api/cancelled/', () =>
								HttpResponse.Z.json([]),
							),
							http.d.get('/mpapi/user/mobile-subscriptions', () =>
								HttpResponse.Z.json({ subscriptions: [] }),
							),
							http.d.get('/api/me/mma', () =>
								HttpResponse.Z.json(
									(0, mdapiResponse.F)(
										(0, testProducts.XU)(),
									),
								),
							),
							http.d.get('/api/me/one-off-contributions', () =>
								HttpResponse.Z.json([]),
							),
						],
					},
				},
				WithGuardianAdLite = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							AccountOverview,
							{},
						),
					parameters: {
						msw: [
							http.d.get('/api/cancelled/', () =>
								HttpResponse.Z.json([]),
							),
							http.d.get('/mpapi/user/mobile-subscriptions', () =>
								HttpResponse.Z.json({ subscriptions: [] }),
							),
							http.d.get('/api/me/mma', () =>
								HttpResponse.Z.json(
									(0, mdapiResponse.F)(
										(0, testProducts.av)(),
									),
								),
							),
							http.d.get('/api/me/one-off-contributions', () =>
								HttpResponse.Z.json([]),
							),
						],
					},
				};
			(NoSubscription.parameters = {
				...NoSubscription.parameters,
				docs: {
					...NoSubscription.parameters?.docs,
					source: {
						originalSource:
							"{\n  render: () => {\n    return <AccountOverview />;\n  },\n  parameters: {\n    msw: [http.get('/api/cancelled/', () => {\n      return HttpResponse.json([]);\n    }), http.get('/mpapi/user/mobile-subscriptions', () => {\n      return HttpResponse.json({\n        subscriptions: []\n      });\n    }), http.get('/api/me/mma', () => {\n      return HttpResponse.json(toMembersDataApiResponse());\n    }), http.get('/idapi/user', () => {\n      return HttpResponse.json(user);\n    }), http.get('/api/me/one-off-contributions', () => {\n      return HttpResponse.json([]);\n    })]\n  }\n}",
						...NoSubscription.parameters?.docs?.source,
					},
				},
			}),
				(WithSubscriptions.parameters = {
					...WithSubscriptions.parameters,
					docs: {
						...WithSubscriptions.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <AccountOverview />;\n  },\n  parameters: {\n    msw: [http.get('/api/cancelled/', () => {\n      return HttpResponse.json([]);\n    }), http.get('/mpapi/user/mobile-subscriptions', () => {\n      return HttpResponse.json({\n        subscriptions: []\n      });\n    }), http.get('/api/me/mma', () => {\n      return HttpResponse.json(toMembersDataApiResponse(guardianWeeklyPaidByCard(), digitalPackPaidByDirectDebit(), newspaperVoucherPaidByPaypal(), membershipSupporter(), patronMembership(), supporterPlus(), tierThree(), homeDeliverySunday()));\n    }), http.get('/api/me/one-off-contributions', () => {\n      return HttpResponse.json([]);\n    })]\n  }\n}",
							...WithSubscriptions.parameters?.docs?.source,
						},
					},
				}),
				(WithUSASubscription.parameters = {
					...WithUSASubscription.parameters,
					docs: {
						...WithUSASubscription.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <AccountOverview />;\n  },\n  parameters: {\n    msw: [http.get('/api/cancelled/', () => {\n      return HttpResponse.json([]);\n    }), http.get('/mpapi/user/mobile-subscriptions', () => {\n      return HttpResponse.json({\n        subscriptions: []\n      });\n    }), http.get('/api/me/mma', () => {\n      return HttpResponse.json(toMembersDataApiResponse(supporterPlusUSA()));\n    }), http.get('/api/me/one-off-contributions', () => {\n      return HttpResponse.json([]);\n    })]\n  }\n}",
							...WithUSASubscription.parameters?.docs?.source,
						},
					},
				}),
				(WithContributionAndSwitchPossible.parameters = {
					...WithContributionAndSwitchPossible.parameters,
					docs: {
						...WithContributionAndSwitchPossible.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <AccountOverview />;\n  },\n  parameters: {\n    msw: [http.get('/api/cancelled/', () => {\n      return HttpResponse.json([]);\n    }), http.get('/mpapi/user/mobile-subscriptions', () => {\n      return HttpResponse.json({\n        subscriptions: []\n      });\n    }), http.get('/api/me/mma', () => {\n      return HttpResponse.json(toMembersDataApiResponse(contributionPaidByPayPal()));\n    }), http.get('/api/me/one-off-contributions', () => {\n      return HttpResponse.json([]);\n    })]\n  }\n}",
							...WithContributionAndSwitchPossible.parameters
								?.docs?.source,
						},
					},
				}),
				(WithContributionInPaymentFailure.parameters = {
					...WithContributionInPaymentFailure.parameters,
					docs: {
						...WithContributionInPaymentFailure.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <AccountOverview />;\n  },\n  parameters: {\n    msw: [http.get('/api/cancelled/', () => {\n      return HttpResponse.json([]);\n    }), http.get('/mpapi/user/mobile-subscriptions', () => {\n      return HttpResponse.json({\n        subscriptions: []\n      });\n    }), http.get('/api/me/mma', () => {\n      return HttpResponse.json(toMembersDataApiResponse(contributionPaymentFailure, supporterPlus()));\n    }), http.get('/api/me/one-off-contributions', () => {\n      return HttpResponse.json([]);\n    })]\n  }\n}",
							...WithContributionInPaymentFailure.parameters?.docs
								?.source,
						},
					},
				}),
				(WithContributionAndSwitchNotPossible.parameters = {
					...WithContributionAndSwitchNotPossible.parameters,
					docs: {
						...WithContributionAndSwitchNotPossible.parameters
							?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <AccountOverview />;\n  },\n  parameters: {\n    msw: [http.get('/api/cancelled/', () => {\n      return HttpResponse.json([]);\n    }), http.get('/mpapi/user/mobile-subscriptions', () => {\n      return HttpResponse.json({\n        subscriptions: []\n      });\n    }), http.get('/api/me/mma', () => {\n      return HttpResponse.json(toMembersDataApiResponse(contributionPaidByPayPal(), digitalPackPaidByDirectDebit()));\n    }), http.get('/api/me/one-off-contributions', () => {\n      return HttpResponse.json([]);\n    })]\n  }\n}",
							...WithContributionAndSwitchNotPossible.parameters
								?.docs?.source,
						},
					},
				}),
				(WithCancelledSubscriptions.parameters = {
					...WithCancelledSubscriptions.parameters,
					docs: {
						...WithCancelledSubscriptions.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <AccountOverview />;\n  },\n  parameters: {\n    msw: [http.get('/api/cancelled/', () => {\n      return HttpResponse.json([cancelledContribution, cancelledGuardianWeekly, cancelledGuardianAdLite]);\n    }), http.get('/mpapi/user/mobile-subscriptions', () => {\n      return HttpResponse.json({\n        subscriptions: []\n      });\n    }), http.get('/api/me/mma', () => {\n      return HttpResponse.json(toMembersDataApiResponse(contributionCancelled(), guardianWeeklyCancelled(), supporterPlusCancelled(), supporterPlusAnnualCancelled(), guardianAdLiteCancelled(), tierThree()));\n    }), http.get('/api/me/one-off-contributions', () => {\n      return HttpResponse.json([]);\n    })]\n  }\n}",
							...WithCancelledSubscriptions.parameters?.docs
								?.source,
						},
					},
				}),
				(WithGiftSubscriptions.parameters = {
					...WithGiftSubscriptions.parameters,
					docs: {
						...WithGiftSubscriptions.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <AccountOverview />;\n  },\n  parameters: {\n    msw: [http.get('/api/cancelled/', () => {\n      return HttpResponse.json([]);\n    }), http.get('/mpapi/user/mobile-subscriptions', () => {\n      return HttpResponse.json({\n        subscriptions: []\n      });\n    }), http.get('/api/me/mma', () => {\n      return HttpResponse.json(toMembersDataApiResponse(guardianWeeklyGiftRecipient(), guardianWeeklyGiftPurchase()));\n    }), http.get('/api/me/one-off-contributions', () => {\n      return HttpResponse.json([]);\n    })]\n  }\n}",
							...WithGiftSubscriptions.parameters?.docs?.source,
						},
					},
				}),
				(WithAppSubscriptions.parameters = {
					...WithAppSubscriptions.parameters,
					docs: {
						...WithAppSubscriptions.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <AccountOverview />;\n  },\n  parameters: {\n    msw: [http.get('/api/cancelled/', () => {\n      return HttpResponse.json([]);\n    }), http.get('/mpapi/user/mobile-subscriptions', () => {\n      return HttpResponse.json({\n        subscriptions: [CancelledInAppPurchase, InAppPurchaseIos, PuzzleAppPurchaseAndroid, PuzzleAppPurchaseIos]\n      });\n    }), http.get('/api/me/mma', () => {\n      return HttpResponse.json(toMembersDataApiResponse());\n    }), http.get('/api/me/one-off-contributions', () => {\n      return HttpResponse.json([]);\n    })]\n  }\n}",
							...WithAppSubscriptions.parameters?.docs?.source,
						},
					},
				}),
				(WithSingleContribution.parameters = {
					...WithSingleContribution.parameters,
					docs: {
						...WithSingleContribution.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <AccountOverview />;\n  },\n  parameters: {\n    msw: [http.get('/api/cancelled/', () => {\n      return HttpResponse.json([]);\n    }), http.get('/mpapi/user/mobile-subscriptions', () => {\n      return HttpResponse.json({\n        subscriptions: []\n      });\n    }), http.get('/api/me/mma', () => {\n      return HttpResponse.json(toMembersDataApiResponse());\n    }), http.get('/api/me/one-off-contributions', () => {\n      return HttpResponse.json(singleContributionsAPIResponse);\n    })]\n  }\n}",
							...WithSingleContribution.parameters?.docs?.source,
						},
					},
				}),
				(WithSupporterPlusDuringOffer.parameters = {
					...WithSupporterPlusDuringOffer.parameters,
					docs: {
						...WithSupporterPlusDuringOffer.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <AccountOverview />;\n  },\n  parameters: {\n    msw: [http.get('/api/cancelled/', () => {\n      return HttpResponse.json([]);\n    }), http.get('/mpapi/user/mobile-subscriptions', () => {\n      return HttpResponse.json({\n        subscriptions: []\n      });\n    }), http.get('/api/me/mma', () => {\n      return HttpResponse.json(toMembersDataApiResponse(supporterPlusInOfferPeriod()));\n    }), http.get('/api/me/one-off-contributions', () => {\n      return HttpResponse.json([]);\n    })]\n  }\n}",
							...WithSupporterPlusDuringOffer.parameters?.docs
								?.source,
						},
					},
				}),
				(WithGuardianAdLite.parameters = {
					...WithGuardianAdLite.parameters,
					docs: {
						...WithGuardianAdLite.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <AccountOverview />;\n  },\n  parameters: {\n    msw: [http.get('/api/cancelled/', () => {\n      return HttpResponse.json([]);\n    }), http.get('/mpapi/user/mobile-subscriptions', () => {\n      return HttpResponse.json({\n        subscriptions: []\n      });\n    }), http.get('/api/me/mma', () => {\n      return HttpResponse.json(toMembersDataApiResponse(guardianAdLite()));\n    }), http.get('/api/me/one-off-contributions', () => {\n      return HttpResponse.json([]);\n    })]\n  }\n}",
							...WithGuardianAdLite.parameters?.docs?.source,
						},
					},
				});
			const __namedExportsOrder = [
				'NoSubscription',
				'WithSubscriptions',
				'WithUSASubscription',
				'WithContributionAndSwitchPossible',
				'WithContributionInPaymentFailure',
				'WithContributionAndSwitchNotPossible',
				'WithCancelledSubscriptions',
				'WithGiftSubscriptions',
				'WithAppSubscriptions',
				'WithSingleContribution',
				'WithSupporterPlusDuringOffer',
				'WithGuardianAdLite',
			];
		},
	},
]);
//# sourceMappingURL=components-mma-accountoverview-AccountOverview-stories.562e03cd.iframe.bundle.js.map
