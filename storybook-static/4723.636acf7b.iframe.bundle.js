(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[4723],
	{
		'./node_modules/@guardian/source-development-kitchen/dist/react-components/summary/ErrorSummary.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				'use strict';
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
		'./node_modules/@guardian/source/dist/foundations/accessibility/focus-style-manager.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				'use strict';
				__webpack_require__.d(__webpack_exports__, {
					$: () => FocusStyleManager,
				});
				var __defProp = Object.defineProperty,
					__publicField = (obj, key, value) =>
						((obj, key, value) =>
							key in obj
								? __defProp(obj, key, {
										enumerable: !0,
										configurable: !0,
										writable: !0,
										value,
								  })
								: (obj[key] = value))(
							obj,
							'symbol' != typeof key ? key + '' : key,
							value,
						);
				class InteractionModeEngine {
					constructor(container, className) {
						(this.container = container),
							(this.className = className),
							__publicField(this, 'isRunning', !1),
							__publicField(this, 'handleKeyDown', (e) => {
								9 === e.which &&
									(this.reset(),
									this.container.addEventListener(
										'mousedown',
										this.handleMouseDown,
									));
							}),
							__publicField(this, 'handleMouseDown', () => {
								this.reset(),
									this.container.classList.add(
										this.className,
									),
									this.container.addEventListener(
										'keydown',
										this.handleKeyDown,
									);
							});
					}
					isActive() {
						return this.isRunning;
					}
					start() {
						this.container.addEventListener(
							'mousedown',
							this.handleMouseDown,
						),
							(this.isRunning = !0);
					}
					stop() {
						this.reset(), (this.isRunning = !1);
					}
					reset() {
						this.container.classList.remove(this.className),
							this.container.removeEventListener(
								'keydown',
								this.handleKeyDown,
							),
							this.container.removeEventListener(
								'mousedown',
								this.handleMouseDown,
							);
					}
				}
				let _focusEngine;
				const focusEngine = () => (
						_focusEngine ||
							(_focusEngine = new InteractionModeEngine(
								document.documentElement,
								'src-focus-disabled',
							)),
						_focusEngine
					),
					FocusStyleManager = {
						alwaysShowFocus: () => focusEngine().stop(),
						isActive: () => focusEngine().isActive(),
						onlyShowFocusOnTabs: () => focusEngine().start(),
					};
			},
		'./node_modules/@guardian/source/dist/foundations/utils/supports-queries.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				'use strict';
				__webpack_require__.d(__webpack_exports__, {
					S: () => appearance,
				});
				const appearance =
					'(appearance: none) or (-webkit-appearance: none) or (-moz-appearance: none)';
			},
		'./node_modules/@guardian/source/dist/react-components/checkbox/Checkbox.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				'use strict';
				__webpack_require__.d(__webpack_exports__, {
					X: () => Checkbox,
				});
				var emotion_react_jsx_runtime_browser_esm = __webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
					react = __webpack_require__(
						'./node_modules/react/index.js',
					),
					themes = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/utils/themes.js',
					),
					styles = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/checkbox/styles.js',
					),
					theme = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/label/theme.js',
					),
					user_feedback_theme = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/user-feedback/theme.js',
					),
					palette = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					);
				const themeCheckbox = {
						borderUnselected: palette.palette.neutral[46],
						borderHover: palette.palette.brand[500],
						borderSelected: palette.palette.brand[500],
						borderError: palette.palette.error[400],
						fillSelected: palette.palette.brand[500],
						fillUnselected: 'transparent',
						textLabel: palette.palette.neutral[7],
						textSupporting: palette.palette.neutral[46],
						textIndeterminate: palette.palette.neutral[46],
					},
					transformProviderTheme =
						(theme.vy,
						palette.palette.brand[800],
						palette.palette.neutral[100],
						palette.palette.neutral[100],
						palette.palette.error[500],
						palette.palette.neutral[100],
						palette.palette.neutral[100],
						palette.palette.brand[800],
						palette.palette.brand[800],
						theme.$Q,
						palette.palette.neutral[46],
						palette.palette.brand[500],
						palette.palette.brand[500],
						palette.palette.error[400],
						palette.palette.brand[500],
						palette.palette.neutral[7],
						palette.palette.neutral[46],
						palette.palette.neutral[46],
						user_feedback_theme.Fj,
						theme.gn,
						palette.palette.brand[800],
						palette.palette.neutral[100],
						palette.palette.neutral[100],
						palette.palette.error[500],
						palette.palette.neutral[100],
						palette.palette.neutral[100],
						palette.palette.brand[800],
						palette.palette.brand[800],
						user_feedback_theme.W4,
						theme.Sz,
						(providerTheme) => {
							const transformedTheme = {};
							return (
								providerTheme?.backgroundChecked &&
									(transformedTheme.fillSelected =
										providerTheme.backgroundChecked),
								providerTheme?.borderChecked &&
									(transformedTheme.borderSelected =
										providerTheme.borderChecked),
								providerTheme?.border &&
									(transformedTheme.borderUnselected =
										providerTheme.border),
								providerTheme?.textLabelSupporting &&
									(transformedTheme.textSupporting =
										providerTheme.textLabelSupporting),
								{ ...transformedTheme, ...providerTheme }
							);
						}),
					Checkbox = ({
						id,
						label: labelContent,
						checked,
						supporting,
						defaultChecked,
						error,
						indeterminate,
						cssOverrides,
						theme,
						...props
					}) => {
						const defaultId = (0, react.useId)(),
							checkboxId = id ?? defaultId,
							mergedTheme = (providerTheme) =>
								(0, themes.I)(
									themeCheckbox,
									theme,
									providerTheme,
									transformProviderTheme,
								),
							SupportingText = ({ children }) =>
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'div',
									{
										css: (providerTheme) =>
											(0, styles.ot)(
												mergedTheme(
													providerTheme.checkbox,
												),
											),
										children,
									},
								),
							LabelText = ({ children }) =>
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'div',
									{
										css: (providerTheme) =>
											(0, styles.ZP)(
												mergedTheme(
													providerTheme.checkbox,
												),
											),
										children,
									},
								);
						return (0, emotion_react_jsx_runtime_browser_esm.BX)(
							'div',
							{
								css: (providerTheme) =>
									(0, styles.Ti)(
										mergedTheme(providerTheme.checkbox),
										error,
									),
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'input',
										{
											id: checkboxId,
											type: 'checkbox',
											css: (providerTheme) => [
												(0, styles.MJ)(
													mergedTheme(
														providerTheme.checkbox,
													),
													error,
												),
												error
													? (0, styles.Pb)(
															mergedTheme(
																providerTheme.checkbox,
															),
													  )
													: '',
												cssOverrides,
											],
											'aria-invalid': !!error,
											ref: (el) => {
												el &&
													(el.indeterminate =
														!!indeterminate);
											},
											defaultChecked:
												defaultChecked ?? void 0,
											checked:
												null != checked
													? null != checked
														? checked
														: !!defaultChecked
													: void 0,
											...props,
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'span',
										{
											css: (providerTheme) =>
												(0, styles.Ky)(
													mergedTheme(
														providerTheme.checkbox,
													),
												),
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'label',
										{
											htmlFor: checkboxId,
											css: styles.PS,
											children: supporting
												? (0,
												  emotion_react_jsx_runtime_browser_esm.BX)(
														'div',
														{
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	LabelText,
																	{
																		children:
																			labelContent,
																	},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
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
												  emotion_react_jsx_runtime_browser_esm.tZ)(
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
						);
					};
			},
		'./node_modules/@guardian/source/dist/react-components/checkbox/styles.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				'use strict';
				__webpack_require__.d(__webpack_exports__, {
					Ky: () => tick,
					MJ: () => checkbox,
					PS: () => label,
					Pb: () => errorCheckbox,
					Ti: () => checkboxContainer,
					ZP: () => labelText,
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
				const fieldset = _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	${_foundations_utils_resets_js__WEBPACK_IMPORTED_MODULE_1__.i.fieldset};
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
`,
					checkboxContainer = (
						checkbox2,
						error = !1,
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
			border: ${
				error
					? `2px solid ${checkbox2.borderError}`
					: `2px solid ${checkbox2.borderHover}`
			};
			/*
				In the indeterminate state, we increase the border width by 1px on
				hover. This causes the position of the indeterminate dash to shift as it
				is absolutely positioned. This negative margin accounts for the extra
				border width and prevents the shift. We need to locate this css here as
				the hover sits on the container, rather than the input element.
			*/
			&:indeterminate {
				&:after {
					margin: -1px;
				}
			}
		}
	}
	&:active {
		input {
			border-color: ${checkbox2.borderHover};
		}
	}
`,
					label = _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	cursor: pointer;
`,
					checkbox = (
						checkbox2,
						error = !1,
					) => _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	flex: 0 0 auto;
	box-sizing: border-box;
	display: inline-block;
	cursor: pointer;
	width: ${
		_foundations_generated_size_js__WEBPACK_IMPORTED_MODULE_2__.bf
			.inputXsmall
	}px;
	height: ${
		_foundations_generated_size_js__WEBPACK_IMPORTED_MODULE_2__.Cb
			.inputXsmall
	}px;
	margin: 0 ${
		_foundations_generated_space_js__WEBPACK_IMPORTED_MODULE_3__.D[2]
	}px 0 0;

	border: 1px solid currentColor;
	background: ${checkbox2.fillUnselected};
	border-radius: 4px;
	position: relative;
	transition: box-shadow ${
		_foundations_animation_transitions_js__WEBPACK_IMPORTED_MODULE_4__.p
			.short
	};
	transition-delay: 0.08s;
	color: ${checkbox2.borderUnselected};

	&:focus {
		${_foundations_accessibility_focus_halo_js__WEBPACK_IMPORTED_MODULE_5__.y};
	}

	@supports (${
		_foundations_utils_supports_queries_js__WEBPACK_IMPORTED_MODULE_6__.S
	}) {
		appearance: none;
		&:checked {
			border: ${
				error
					? `2px solid ${checkbox2.borderError}`
					: `2px solid ${checkbox2.borderSelected}`
			};
			& ~ span:before {
				right: 0;
			}
			& ~ span:after {
				top: 0;
			}
		}

		&:indeterminate {
			&:after {
				${_foundations_generated_typography_js__WEBPACK_IMPORTED_MODULE_7__.yQm};
				color: ${checkbox2.textIndeterminate};
				content: '-';
				position: absolute;
				top: -7px;
				left: 6px;
				z-index: 5;
			}
		}
	}
`,
					labelText = (
						checkbox2,
					) => _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	${_foundations_generated_typography_js__WEBPACK_IMPORTED_MODULE_7__.Kz0};
	color: ${checkbox2.textLabel};
	width: 100%;
	margin-top: 1px;
	/* If label text is empty, add additional spacing to align supporting text */
	&:empty {
		margin-top: 2px;
	}
`,
					supportingText = (
						checkbox2,
					) => _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	${_foundations_generated_typography_js__WEBPACK_IMPORTED_MODULE_7__.VZD};
	color: ${checkbox2.textSupporting};
`,
					tick = (
						checkbox2,
					) => _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	@supports (
		(appearance: none) or (-webkit-appearance: none) or (-moz-appearance: none)
	) {
		/* overall positional properties */
		position: absolute;
		width: 6px;
		height: 12px;
		transform: rotate(45deg);
		top: 15px;
		left: 9px;
		/**
		 * This prevents simulated click events to the checkbox (eg. from Selenium
		 * tests) being intercepted by the tick
		 */
		pointer-events: none;

		/* the checkmark ✓ */
		&:after,
		&:before {
			position: absolute;
			display: block;
			background-color: ${checkbox2.fillSelected};
			transition: all ${_foundations_animation_transitions_js__WEBPACK_IMPORTED_MODULE_4__.p.short} ease-in-out;
			content: '';
		}

		/* the short side */
		&:before {
			height: 2px;
			bottom: 0;
			left: 0;
			right: 100%;
			transition-delay: 0.05s;
		}

		/* the long side */
		&:after {
			bottom: 0;
			right: 0;
			top: 100%;
			width: 2px;
			transition-delay: 0.1s;
		}
	}
`,
					errorCheckbox = (
						checkbox2,
					) => _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	border: 2px solid ${checkbox2.borderError};
	border-radius: 4px;
	&:not(:checked):hover,
	&:active {
		border: 2px solid ${checkbox2.borderHover};
	}
`;
			},
		'./node_modules/@guardian/source/dist/react-components/radio/Radio.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				'use strict';
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
				'use strict';
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
				'use strict';
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
				'use strict';
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
		'./node_modules/@stripe/react-stripe-js/dist/react-stripe.umd.js':
			function (__unused_webpack_module, exports, __webpack_require__) {
				!(function (exports, React) {
					'use strict';
					function ownKeys(object, enumerableOnly) {
						var keys = Object.keys(object);
						if (Object.getOwnPropertySymbols) {
							var symbols = Object.getOwnPropertySymbols(object);
							enumerableOnly &&
								(symbols = symbols.filter(function (sym) {
									return Object.getOwnPropertyDescriptor(
										object,
										sym,
									).enumerable;
								})),
								keys.push.apply(keys, symbols);
						}
						return keys;
					}
					function _objectSpread2(target) {
						for (var i = 1; i < arguments.length; i++) {
							var source =
								null != arguments[i] ? arguments[i] : {};
							i % 2
								? ownKeys(Object(source), !0).forEach(function (
										key,
								  ) {
										_defineProperty(
											target,
											key,
											source[key],
										);
								  })
								: Object.getOwnPropertyDescriptors
								? Object.defineProperties(
										target,
										Object.getOwnPropertyDescriptors(
											source,
										),
								  )
								: ownKeys(Object(source)).forEach(function (
										key,
								  ) {
										Object.defineProperty(
											target,
											key,
											Object.getOwnPropertyDescriptor(
												source,
												key,
											),
										);
								  });
						}
						return target;
					}
					function _typeof(obj) {
						return (
							(_typeof =
								'function' == typeof Symbol &&
								'symbol' == typeof Symbol.iterator
									? function (obj) {
											return typeof obj;
									  }
									: function (obj) {
											return obj &&
												'function' == typeof Symbol &&
												obj.constructor === Symbol &&
												obj !== Symbol.prototype
												? 'symbol'
												: typeof obj;
									  }),
							_typeof(obj)
						);
					}
					function _defineProperty(obj, key, value) {
						return (
							key in obj
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
					function _slicedToArray(arr, i) {
						return (
							_arrayWithHoles(arr) ||
							_iterableToArrayLimit(arr, i) ||
							_unsupportedIterableToArray(arr, i) ||
							_nonIterableRest()
						);
					}
					function _arrayWithHoles(arr) {
						if (Array.isArray(arr)) return arr;
					}
					function _iterableToArrayLimit(arr, i) {
						var _i =
							arr &&
							(('undefined' != typeof Symbol &&
								arr[Symbol.iterator]) ||
								arr['@@iterator']);
						if (null != _i) {
							var _s,
								_e,
								_arr = [],
								_n = !0,
								_d = !1;
							try {
								for (
									_i = _i.call(arr);
									!(_n = (_s = _i.next()).done) &&
									(_arr.push(_s.value),
									!i || _arr.length !== i);
									_n = !0
								);
							} catch (err) {
								(_d = !0), (_e = err);
							} finally {
								try {
									_n || null == _i.return || _i.return();
								} finally {
									if (_d) throw _e;
								}
							}
							return _arr;
						}
					}
					function _unsupportedIterableToArray(o, minLen) {
						if (o) {
							if ('string' == typeof o)
								return _arrayLikeToArray(o, minLen);
							var n = Object.prototype.toString
								.call(o)
								.slice(8, -1);
							return (
								'Object' === n &&
									o.constructor &&
									(n = o.constructor.name),
								'Map' === n || 'Set' === n
									? Array.from(o)
									: 'Arguments' === n ||
									  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
											n,
									  )
									? _arrayLikeToArray(o, minLen)
									: void 0
							);
						}
					}
					function _arrayLikeToArray(arr, len) {
						(null == len || len > arr.length) && (len = arr.length);
						for (var i = 0, arr2 = new Array(len); i < len; i++)
							arr2[i] = arr[i];
						return arr2;
					}
					function _nonIterableRest() {
						throw new TypeError(
							'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
						);
					}
					function createCommonjsModule(fn, module) {
						return (
							fn((module = { exports: {} }), module.exports),
							module.exports
						);
					}
					React =
						React &&
						Object.prototype.hasOwnProperty.call(React, 'default')
							? React.default
							: React;
					var ReactPropTypesSecret_1 =
						'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
					function emptyFunction() {}
					function emptyFunctionWithReset() {}
					emptyFunctionWithReset.resetWarningCache = emptyFunction;
					var factoryWithThrowingShims = function () {
							function shim(
								props,
								propName,
								componentName,
								location,
								propFullName,
								secret,
							) {
								if (secret !== ReactPropTypesSecret_1) {
									var err = new Error(
										'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types',
									);
									throw (
										((err.name = 'Invariant Violation'),
										err)
									);
								}
							}
							function getShim() {
								return shim;
							}
							shim.isRequired = shim;
							var ReactPropTypes = {
								array: shim,
								bool: shim,
								func: shim,
								number: shim,
								object: shim,
								string: shim,
								symbol: shim,
								any: shim,
								arrayOf: getShim,
								element: shim,
								elementType: shim,
								instanceOf: getShim,
								node: shim,
								objectOf: getShim,
								oneOf: getShim,
								oneOfType: getShim,
								shape: getShim,
								exact: getShim,
								checkPropTypes: emptyFunctionWithReset,
								resetWarningCache: emptyFunction,
							};
							return (
								(ReactPropTypes.PropTypes = ReactPropTypes),
								ReactPropTypes
							);
						},
						propTypes = createCommonjsModule(function (module) {
							module.exports = factoryWithThrowingShims();
						}),
						usePrevious = function usePrevious(value) {
							var ref = React.useRef(value);
							return (
								React.useEffect(
									function () {
										ref.current = value;
									},
									[value],
								),
								ref.current
							);
						},
						isUnknownObject = function isUnknownObject(raw) {
							return null !== raw && 'object' === _typeof(raw);
						},
						isPromise = function isPromise(raw) {
							return (
								isUnknownObject(raw) &&
								'function' == typeof raw.then
							);
						},
						isStripe = function isStripe(raw) {
							return (
								isUnknownObject(raw) &&
								'function' == typeof raw.elements &&
								'function' == typeof raw.createToken &&
								'function' == typeof raw.createPaymentMethod &&
								'function' == typeof raw.confirmCardPayment
							);
						},
						PLAIN_OBJECT_STR = '[object Object]',
						isEqual = function isEqual(left, right) {
							if (
								!isUnknownObject(left) ||
								!isUnknownObject(right)
							)
								return left === right;
							var leftArray = Array.isArray(left);
							if (leftArray !== Array.isArray(right)) return !1;
							var leftPlainObject =
								Object.prototype.toString.call(left) ===
								PLAIN_OBJECT_STR;
							if (
								leftPlainObject !==
								(Object.prototype.toString.call(right) ===
									PLAIN_OBJECT_STR)
							)
								return !1;
							if (!leftPlainObject && !leftArray)
								return left === right;
							var leftKeys = Object.keys(left),
								rightKeys = Object.keys(right);
							if (leftKeys.length !== rightKeys.length) return !1;
							for (
								var keySet = {}, i = 0;
								i < leftKeys.length;
								i += 1
							)
								keySet[leftKeys[i]] = !0;
							for (var _i = 0; _i < rightKeys.length; _i += 1)
								keySet[rightKeys[_i]] = !0;
							var allKeys = Object.keys(keySet);
							if (allKeys.length !== leftKeys.length) return !1;
							var l = left,
								r = right,
								pred = function pred(key) {
									return isEqual(l[key], r[key]);
								};
							return allKeys.every(pred);
						},
						extractAllowedOptionsUpdates =
							function extractAllowedOptionsUpdates(
								options,
								prevOptions,
								immutableKeys,
							) {
								return isUnknownObject(options)
									? Object.keys(options).reduce(function (
											newOptions,
											key,
									  ) {
											var isUpdated =
												!isUnknownObject(prevOptions) ||
												!isEqual(
													options[key],
													prevOptions[key],
												);
											return immutableKeys.includes(key)
												? (isUpdated &&
														console.warn(
															'Unsupported prop change: options.'.concat(
																key,
																' is not a mutable property.',
															),
														),
												  newOptions)
												: isUpdated
												? _objectSpread2(
														_objectSpread2(
															{},
															newOptions || {},
														),
														{},
														_defineProperty(
															{},
															key,
															options[key],
														),
												  )
												: newOptions;
									  },
									  null)
									: null;
							},
						INVALID_STRIPE_ERROR =
							'Invalid prop `stripe` supplied to `Elements`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.',
						validateStripe = function validateStripe(maybeStripe) {
							if (null === maybeStripe || isStripe(maybeStripe))
								return maybeStripe;
							throw new Error(INVALID_STRIPE_ERROR);
						},
						parseStripeProp = function parseStripeProp(raw) {
							if (isPromise(raw))
								return {
									tag: 'async',
									stripePromise:
										Promise.resolve(raw).then(
											validateStripe,
										),
								};
							var stripe = validateStripe(raw);
							return null === stripe
								? { tag: 'empty' }
								: { tag: 'sync', stripe };
						},
						ElementsContext = React.createContext(null);
					ElementsContext.displayName = 'ElementsContext';
					var parseElementsContext = function parseElementsContext(
							ctx,
							useCase,
						) {
							if (!ctx)
								throw new Error(
									'Could not find Elements context; You need to wrap the part of your app that '.concat(
										useCase,
										' in an <Elements> provider.',
									),
								);
							return ctx;
						},
						CartElementContext = React.createContext(null);
					CartElementContext.displayName = 'CartElementContext';
					var parseCartElementContext =
							function parseCartElementContext(ctx, useCase) {
								if (!ctx)
									throw new Error(
										'Could not find Elements context; You need to wrap the part of your app that '.concat(
											useCase,
											' in an <Elements> provider.',
										),
									);
								return ctx;
							},
						Elements = function Elements(_ref) {
							var rawStripeProp = _ref.stripe,
								options = _ref.options,
								children = _ref.children,
								parsed = React.useMemo(
									function () {
										return parseStripeProp(rawStripeProp);
									},
									[rawStripeProp],
								),
								_React$useState2 = _slicedToArray(
									React.useState(null),
									2,
								),
								cart = _React$useState2[0],
								setCart = _React$useState2[1],
								_React$useState4 = _slicedToArray(
									React.useState(null),
									2,
								),
								cartState = _React$useState4[0],
								setCartState = _React$useState4[1],
								_React$useState6 = _slicedToArray(
									React.useState(function () {
										return {
											stripe:
												'sync' === parsed.tag
													? parsed.stripe
													: null,
											elements:
												'sync' === parsed.tag
													? parsed.stripe.elements(
															options,
													  )
													: null,
										};
									}),
									2,
								),
								ctx = _React$useState6[0],
								setContext = _React$useState6[1];
							React.useEffect(
								function () {
									var isMounted = !0,
										safeSetContext =
											function safeSetContext(stripe) {
												setContext(function (ctx) {
													return ctx.stripe
														? ctx
														: {
																stripe,
																elements:
																	stripe.elements(
																		options,
																	),
														  };
												});
											};
									return (
										'async' !== parsed.tag || ctx.stripe
											? 'sync' !== parsed.tag ||
											  ctx.stripe ||
											  safeSetContext(parsed.stripe)
											: parsed.stripePromise.then(
													function (stripe) {
														stripe &&
															isMounted &&
															safeSetContext(
																stripe,
															);
													},
											  ),
										function () {
											isMounted = !1;
										}
									);
								},
								[parsed, ctx, options],
							);
							var prevStripe = usePrevious(rawStripeProp);
							React.useEffect(
								function () {
									null !== prevStripe &&
										prevStripe !== rawStripeProp &&
										console.warn(
											'Unsupported prop change on Elements: You cannot change the `stripe` prop after setting it.',
										);
								},
								[prevStripe, rawStripeProp],
							);
							var prevOptions = usePrevious(options);
							return (
								React.useEffect(
									function () {
										if (ctx.elements) {
											var updates =
												extractAllowedOptionsUpdates(
													options,
													prevOptions,
													['clientSecret', 'fonts'],
												);
											updates &&
												ctx.elements.update(updates);
										}
									},
									[options, prevOptions, ctx.elements],
								),
								React.useEffect(
									function () {
										var anyStripe = ctx.stripe;
										anyStripe &&
											anyStripe._registerWrapper &&
											anyStripe.registerAppInfo &&
											(anyStripe._registerWrapper({
												name: 'react-stripe-js',
												version: '1.16.5',
											}),
											anyStripe.registerAppInfo({
												name: 'react-stripe-js',
												version: '1.16.5',
												url: 'https://stripe.com/docs/stripe-js/react',
											}));
									},
									[ctx.stripe],
								),
								React.createElement(
									ElementsContext.Provider,
									{ value: ctx },
									React.createElement(
										CartElementContext.Provider,
										{
											value: {
												cart,
												setCart,
												cartState,
												setCartState,
											},
										},
										children,
									),
								)
							);
						};
					Elements.propTypes = {
						stripe: propTypes.any,
						options: propTypes.object,
					};
					var useElementsContextWithUseCase =
							function useElementsContextWithUseCase(
								useCaseMessage,
							) {
								var ctx = React.useContext(ElementsContext);
								return parseElementsContext(
									ctx,
									useCaseMessage,
								);
							},
						useCartElementContextWithUseCase =
							function useCartElementContextWithUseCase(
								useCaseMessage,
							) {
								var ctx = React.useContext(CartElementContext);
								return parseCartElementContext(
									ctx,
									useCaseMessage,
								);
							},
						useElements = function useElements() {
							return useElementsContextWithUseCase(
								'calls useElements()',
							).elements;
						},
						useStripe = function useStripe() {
							return useElementsContextWithUseCase(
								'calls useStripe()',
							).stripe;
						},
						useCartElement = function useCartElement() {
							return useCartElementContextWithUseCase(
								'calls useCartElement()',
							).cart;
						},
						useCartElementState = function useCartElementState() {
							return useCartElementContextWithUseCase(
								'calls useCartElementState()',
							).cartState;
						},
						ElementsConsumer = function ElementsConsumer(_ref2) {
							return (0, _ref2.children)(
								useElementsContextWithUseCase(
									'mounts <ElementsConsumer>',
								),
							);
						};
					ElementsConsumer.propTypes = {
						children: propTypes.func.isRequired,
					};
					var useAttachEvent = function useAttachEvent(
							element,
							event,
							cb,
						) {
							var cbDefined = !!cb,
								cbRef = React.useRef(cb);
							React.useEffect(
								function () {
									cbRef.current = cb;
								},
								[cb],
							),
								React.useEffect(
									function () {
										if (!cbDefined || !element)
											return function () {};
										var decoratedCb =
											function decoratedCb() {
												cbRef.current &&
													cbRef.current.apply(
														cbRef,
														arguments,
													);
											};
										return (
											element.on(event, decoratedCb),
											function () {
												element.off(event, decoratedCb);
											}
										);
									},
									[cbDefined, event, element, cbRef],
								);
						},
						capitalized = function capitalized(str) {
							return str.charAt(0).toUpperCase() + str.slice(1);
						},
						createElementComponent =
							function createElementComponent(type, isServer) {
								var displayName = ''.concat(
										capitalized(type),
										'Element',
									),
									Element = isServer
										? function ServerElement(props) {
												useElementsContextWithUseCase(
													'mounts <'.concat(
														displayName,
														'>',
													),
												),
													useCartElementContextWithUseCase(
														'mounts <'.concat(
															displayName,
															'>',
														),
													);
												var id = props.id,
													className = props.className;
												return React.createElement(
													'div',
													{ id, className },
												);
										  }
										: function ClientElement(_ref) {
												var readyCallback,
													id = _ref.id,
													className = _ref.className,
													_ref$options = _ref.options,
													options =
														void 0 === _ref$options
															? {}
															: _ref$options,
													onBlur = _ref.onBlur,
													onFocus = _ref.onFocus,
													onReady = _ref.onReady,
													onChange = _ref.onChange,
													onEscape = _ref.onEscape,
													onClick = _ref.onClick,
													onLoadError =
														_ref.onLoadError,
													onLoaderStart =
														_ref.onLoaderStart,
													onNetworksChange =
														_ref.onNetworksChange,
													onCheckout =
														_ref.onCheckout,
													onLineItemClick =
														_ref.onLineItemClick,
													onConfirm = _ref.onConfirm,
													onCancel = _ref.onCancel,
													onShippingAddressChange =
														_ref.onShippingAddressChange,
													onShippingRateChange =
														_ref.onShippingRateChange,
													elements =
														useElementsContextWithUseCase(
															'mounts <'.concat(
																displayName,
																'>',
															),
														).elements,
													_React$useState2 =
														_slicedToArray(
															React.useState(
																null,
															),
															2,
														),
													element =
														_React$useState2[0],
													setElement =
														_React$useState2[1],
													elementRef =
														React.useRef(null),
													domNode =
														React.useRef(null),
													_useCartElementContex =
														useCartElementContextWithUseCase(
															'mounts <'.concat(
																displayName,
																'>',
															),
														),
													setCart =
														_useCartElementContex.setCart,
													setCartState =
														_useCartElementContex.setCartState;
												useAttachEvent(
													element,
													'blur',
													onBlur,
												),
													useAttachEvent(
														element,
														'focus',
														onFocus,
													),
													useAttachEvent(
														element,
														'escape',
														onEscape,
													),
													useAttachEvent(
														element,
														'click',
														onClick,
													),
													useAttachEvent(
														element,
														'loaderror',
														onLoadError,
													),
													useAttachEvent(
														element,
														'loaderstart',
														onLoaderStart,
													),
													useAttachEvent(
														element,
														'networkschange',
														onNetworksChange,
													),
													useAttachEvent(
														element,
														'lineitemclick',
														onLineItemClick,
													),
													useAttachEvent(
														element,
														'confirm',
														onConfirm,
													),
													useAttachEvent(
														element,
														'cancel',
														onCancel,
													),
													useAttachEvent(
														element,
														'shippingaddresschange',
														onShippingAddressChange,
													),
													useAttachEvent(
														element,
														'shippingratechange',
														onShippingRateChange,
													),
													'cart' === type
														? (readyCallback =
																function readyCallback(
																	event,
																) {
																	setCartState(
																		event,
																	),
																		onReady &&
																			onReady(
																				event,
																			);
																})
														: onReady &&
														  (readyCallback =
																'payButton' ===
																type
																	? onReady
																	: function readyCallback() {
																			onReady(
																				element,
																			);
																	  }),
													useAttachEvent(
														element,
														'ready',
														readyCallback,
													),
													useAttachEvent(
														element,
														'change',
														'cart' === type
															? function (event) {
																	setCartState(
																		event,
																	),
																		onChange &&
																			onChange(
																				event,
																			);
															  }
															: onChange,
													),
													useAttachEvent(
														element,
														'checkout',
														'cart' === type
															? function (event) {
																	setCartState(
																		event,
																	),
																		onCheckout &&
																			onCheckout(
																				event,
																			);
															  }
															: onCheckout,
													),
													React.useLayoutEffect(
														function () {
															if (
																null ===
																	elementRef.current &&
																elements &&
																null !==
																	domNode.current
															) {
																var newElement =
																	elements.create(
																		type,
																		options,
																	);
																'cart' ===
																	type &&
																	setCart &&
																	setCart(
																		newElement,
																	),
																	(elementRef.current =
																		newElement),
																	setElement(
																		newElement,
																	),
																	newElement.mount(
																		domNode.current,
																	);
															}
														},
														[
															elements,
															options,
															setCart,
														],
													);
												var prevOptions =
													usePrevious(options);
												return (
													React.useEffect(
														function () {
															if (
																elementRef.current
															) {
																var updates =
																	extractAllowedOptionsUpdates(
																		options,
																		prevOptions,
																		[
																			'paymentRequest',
																		],
																	);
																updates &&
																	elementRef.current.update(
																		updates,
																	);
															}
														},
														[options, prevOptions],
													),
													React.useLayoutEffect(
														function () {
															return function () {
																elementRef.current &&
																	(elementRef.current.destroy(),
																	(elementRef.current =
																		null));
															};
														},
														[],
													),
													React.createElement('div', {
														id,
														className,
														ref: domNode,
													})
												);
										  };
								return (
									(Element.propTypes = {
										id: propTypes.string,
										className: propTypes.string,
										onChange: propTypes.func,
										onBlur: propTypes.func,
										onFocus: propTypes.func,
										onReady: propTypes.func,
										onEscape: propTypes.func,
										onClick: propTypes.func,
										onLoadError: propTypes.func,
										onLoaderStart: propTypes.func,
										onNetworksChange: propTypes.func,
										onCheckout: propTypes.func,
										onLineItemClick: propTypes.func,
										onConfirm: propTypes.func,
										onCancel: propTypes.func,
										onShippingAddressChange: propTypes.func,
										onShippingRateChange: propTypes.func,
										options: propTypes.object,
									}),
									(Element.displayName = displayName),
									(Element.__elementType = type),
									Element
								);
							},
						isServer = 'undefined' == typeof window,
						AuBankAccountElement = createElementComponent(
							'auBankAccount',
							isServer,
						),
						CardElement = createElementComponent('card', isServer),
						CardNumberElement = createElementComponent(
							'cardNumber',
							isServer,
						),
						CardExpiryElement = createElementComponent(
							'cardExpiry',
							isServer,
						),
						CardCvcElement = createElementComponent(
							'cardCvc',
							isServer,
						),
						FpxBankElement = createElementComponent(
							'fpxBank',
							isServer,
						),
						IbanElement = createElementComponent('iban', isServer),
						IdealBankElement = createElementComponent(
							'idealBank',
							isServer,
						),
						P24BankElement = createElementComponent(
							'p24Bank',
							isServer,
						),
						EpsBankElement = createElementComponent(
							'epsBank',
							isServer,
						),
						PaymentElement = createElementComponent(
							'payment',
							isServer,
						),
						PayButtonElement = createElementComponent(
							'payButton',
							isServer,
						),
						PaymentRequestButtonElement = createElementComponent(
							'paymentRequestButton',
							isServer,
						),
						LinkAuthenticationElement = createElementComponent(
							'linkAuthentication',
							isServer,
						),
						AddressElement = createElementComponent(
							'address',
							isServer,
						),
						ShippingAddressElement = createElementComponent(
							'shippingAddress',
							isServer,
						),
						CartElement = createElementComponent('cart', isServer),
						PaymentMethodMessagingElement = createElementComponent(
							'paymentMethodMessaging',
							isServer,
						),
						AffirmMessageElement = createElementComponent(
							'affirmMessage',
							isServer,
						),
						AfterpayClearpayMessageElement = createElementComponent(
							'afterpayClearpayMessage',
							isServer,
						);
					(exports.AddressElement = AddressElement),
						(exports.AffirmMessageElement = AffirmMessageElement),
						(exports.AfterpayClearpayMessageElement =
							AfterpayClearpayMessageElement),
						(exports.AuBankAccountElement = AuBankAccountElement),
						(exports.CardCvcElement = CardCvcElement),
						(exports.CardElement = CardElement),
						(exports.CardExpiryElement = CardExpiryElement),
						(exports.CardNumberElement = CardNumberElement),
						(exports.CartElement = CartElement),
						(exports.Elements = Elements),
						(exports.ElementsConsumer = ElementsConsumer),
						(exports.EpsBankElement = EpsBankElement),
						(exports.FpxBankElement = FpxBankElement),
						(exports.IbanElement = IbanElement),
						(exports.IdealBankElement = IdealBankElement),
						(exports.LinkAuthenticationElement =
							LinkAuthenticationElement),
						(exports.P24BankElement = P24BankElement),
						(exports.PayButtonElement = PayButtonElement),
						(exports.PaymentElement = PaymentElement),
						(exports.PaymentMethodMessagingElement =
							PaymentMethodMessagingElement),
						(exports.PaymentRequestButtonElement =
							PaymentRequestButtonElement),
						(exports.ShippingAddressElement =
							ShippingAddressElement),
						(exports.useCartElement = useCartElement),
						(exports.useCartElementState = useCartElementState),
						(exports.useElements = useElements),
						(exports.useStripe = useStripe),
						Object.defineProperty(exports, '__esModule', {
							value: !0,
						});
				})(
					exports,
					__webpack_require__('./node_modules/react/index.js'),
				);
			},
		'./node_modules/@stripe/stripe-js/dist/pure.js': (
			__unused_webpack_module,
			exports,
		) => {
			'use strict';
			function _typeof(obj) {
				return (
					(_typeof =
						'function' == typeof Symbol &&
						'symbol' == typeof Symbol.iterator
							? function (obj) {
									return typeof obj;
							  }
							: function (obj) {
									return obj &&
										'function' == typeof Symbol &&
										obj.constructor === Symbol &&
										obj !== Symbol.prototype
										? 'symbol'
										: typeof obj;
							  }),
					_typeof(obj)
				);
			}
			var loadParams,
				V3_URL = 'https://js.stripe.com/v3',
				V3_URL_REGEX = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,
				EXISTING_SCRIPT_MESSAGE =
					'loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used',
				stripePromise = null,
				loadScript = function loadScript(params) {
					return (
						null !== stripePromise ||
							(stripePromise = new Promise(function (
								resolve,
								reject,
							) {
								if (
									'undefined' != typeof window &&
									'undefined' != typeof document
								)
									if (
										(window.Stripe &&
											params &&
											console.warn(
												EXISTING_SCRIPT_MESSAGE,
											),
										window.Stripe)
									)
										resolve(window.Stripe);
									else
										try {
											var script =
												(function findScript() {
													for (
														var scripts =
																document.querySelectorAll(
																	'script[src^="'.concat(
																		V3_URL,
																		'"]',
																	),
																),
															i = 0;
														i < scripts.length;
														i++
													) {
														var script = scripts[i];
														if (
															V3_URL_REGEX.test(
																script.src,
															)
														)
															return script;
													}
													return null;
												})();
											script && params
												? console.warn(
														EXISTING_SCRIPT_MESSAGE,
												  )
												: script ||
												  (script =
														(function injectScript(
															params,
														) {
															var queryString =
																	params &&
																	!params.advancedFraudSignals
																		? '?advancedFraudSignals=false'
																		: '',
																script =
																	document.createElement(
																		'script',
																	);
															script.src = ''
																.concat(V3_URL)
																.concat(
																	queryString,
																);
															var headOrBody =
																document.head ||
																document.body;
															if (!headOrBody)
																throw new Error(
																	'Expected document.body not to be null. Stripe.js requires a <body> element.',
																);
															return (
																headOrBody.appendChild(
																	script,
																),
																script
															);
														})(params)),
												script.addEventListener(
													'load',
													function () {
														window.Stripe
															? resolve(
																	window.Stripe,
															  )
															: reject(
																	new Error(
																		'Stripe.js not available',
																	),
															  );
													},
												),
												script.addEventListener(
													'error',
													function () {
														reject(
															new Error(
																'Failed to load Stripe.js',
															),
														);
													},
												);
										} catch (error) {
											return void reject(error);
										}
								else resolve(null);
							})),
						stripePromise
					);
				},
				validateLoadParams = function validateLoadParams(params) {
					var errorMessage =
						'invalid load parameters; expected object of shape\n\n    {advancedFraudSignals: boolean}\n\nbut received\n\n    '.concat(
							JSON.stringify(params),
							'\n',
						);
					if (null === params || 'object' !== _typeof(params))
						throw new Error(errorMessage);
					if (
						1 === Object.keys(params).length &&
						'boolean' == typeof params.advancedFraudSignals
					)
						return params;
					throw new Error(errorMessage);
				},
				loadStripeCalled = !1,
				loadStripe = function loadStripe() {
					for (
						var _len = arguments.length,
							args = new Array(_len),
							_key = 0;
						_key < _len;
						_key++
					)
						args[_key] = arguments[_key];
					loadStripeCalled = !0;
					var startTime = Date.now();
					return loadScript(loadParams).then(function (maybeStripe) {
						return (function initStripe(
							maybeStripe,
							args,
							startTime,
						) {
							if (null === maybeStripe) return null;
							var stripe = maybeStripe.apply(void 0, args);
							return (
								(function registerWrapper(stripe, startTime) {
									stripe &&
										stripe._registerWrapper &&
										stripe._registerWrapper({
											name: 'stripe-js',
											version: '1.52.1',
											startTime,
										});
								})(stripe, startTime),
								stripe
							);
						})(maybeStripe, args, startTime);
					});
				};
			(loadStripe.setLoadParameters = function (params) {
				if (loadStripeCalled && loadParams) {
					var validatedParams = validateLoadParams(params);
					if (
						Object.keys(validatedParams).reduce(function (
							previousValue,
							currentValue,
						) {
							var _loadParams;
							return (
								previousValue &&
								params[currentValue] ===
									(null === (_loadParams = loadParams) ||
									void 0 === _loadParams
										? void 0
										: _loadParams[currentValue])
							);
						},
						!0)
					)
						return;
				}
				if (loadStripeCalled)
					throw new Error(
						'You cannot change load parameters after calling loadStripe',
					);
				loadParams = validateLoadParams(params);
			}),
				(exports.loadStripe = loadStripe);
		},
		'./node_modules/@stripe/stripe-js/pure.js': (
			module,
			__unused_webpack_exports,
			__webpack_require__,
		) => {
			module.exports = __webpack_require__(
				'./node_modules/@stripe/stripe-js/dist/pure.js',
			);
		},
	},
]);
//# sourceMappingURL=4723.636acf7b.iframe.bundle.js.map
