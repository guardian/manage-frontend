'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[2897],
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
		'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgClock.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					h: () => SvgClock,
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
										d: 'M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10m-8.909-.318-.659-7.864h-.886l-.682 8.523 1.159 1.159 6.34-.59V12z',
										fill: theme?.fill,
									},
								),
							},
						),
					SvgClock = ({
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
													children: 'Clock',
												},
										  )
										: '',
								],
							},
						);
			},
		'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgCreditCard.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					n: () => SvgCreditCard,
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
										d: 'm23 6.57-1.833-1.81H2.833L1 6.57v1.664h22zm0 3.69H1v7.164l1.803 1.81h18.364L23 17.424zm-17.368 5.5h2.29v-1.158h-2.29zm5.772 0h-2.29v-1.158h2.29zm1.192 0h2.29v-1.158h-2.29zm5.772 0h-2.29v-1.158h2.29z',
										fill: theme?.fill,
									},
								),
							},
						),
					SvgCreditCard = ({
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
													children: 'Credit card',
												},
										  )
										: '',
								],
							},
						);
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
	},
]);
//# sourceMappingURL=2897.d7841c4a.iframe.bundle.js.map
