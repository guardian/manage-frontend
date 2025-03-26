'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[666],
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
		'./node_modules/@guardian/source/dist/react-components/checkbox/Checkbox.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
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
		'./node_modules/@guardian/source/dist/react-components/checkbox/CheckboxGroup.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					c: () => CheckboxGroup,
				});
				var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ =
						__webpack_require__(
							'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
						),
					react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
						'./node_modules/react/index.js',
					),
					_label_Legend_js__WEBPACK_IMPORTED_MODULE_2__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/react-components/label/Legend.js',
						),
					_user_feedback_InlineError_js__WEBPACK_IMPORTED_MODULE_3__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/react-components/user-feedback/InlineError.js',
						),
					_styles_js__WEBPACK_IMPORTED_MODULE_5__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/react-components/checkbox/styles.js',
						),
					_foundations_accessibility_description_id_js__WEBPACK_IMPORTED_MODULE_4__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/accessibility/description-id.js',
						);
				const CheckboxGroup = ({
					id,
					name,
					label,
					hideLabel,
					optional = !1,
					supporting,
					error,
					cssOverrides,
					children,
					theme,
					...props
				}) => {
					const defaultId = (0,
						react__WEBPACK_IMPORTED_MODULE_0__.useId)(),
						groupId = id ?? defaultId,
						legend = label
							? (0,
							  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
									_label_Legend_js__WEBPACK_IMPORTED_MODULE_2__.D,
									{
										text: label,
										supporting,
										hideLabel,
										optional,
										theme,
									},
							  )
							: '',
						message =
							'string' == typeof error
								? (0,
								  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
										_user_feedback_InlineError_js__WEBPACK_IMPORTED_MODULE_3__.b,
										{
											theme,
											id: (0,
											_foundations_accessibility_description_id_js__WEBPACK_IMPORTED_MODULE_4__.S)(
												groupId,
											),
											children: error,
										},
								  )
								: '';
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
						'fieldset',
						{
							css: [
								_styles_js__WEBPACK_IMPORTED_MODULE_5__.oB,
								cssOverrides,
							],
							id: groupId,
							...props,
							children: [
								legend,
								message,
								react__WEBPACK_IMPORTED_MODULE_0__.Children.map(
									children,
									(child) =>
										(0,
										react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(
											child,
											Object.assign(
												error
													? {
															error: !0,
															'aria-describedby':
																(0,
																_foundations_accessibility_description_id_js__WEBPACK_IMPORTED_MODULE_4__.S)(
																	groupId,
																),
													  }
													: {},
												{ name },
											),
										),
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
		'./client/fixtures/mdapiResponse.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				F: () => toMembersDataApiResponse,
			});
			var toMembersDataApiResponse = function () {
				for (
					var _len = arguments.length,
						productDetails = new Array(_len),
						_key = 0;
					_key < _len;
					_key++
				)
					productDetails[_key] = arguments[_key];
				return {
					user: {
						firstName: 'test',
						lastName: 'name',
						email: 'test@test.com',
					},
					products: productDetails,
				};
			};
		},
		'./client/components/mma/delivery/address/DeliveryAddress.stories.tsx':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.r(__webpack_exports__),
					__webpack_require__.d(__webpack_exports__, {
						Confirmation: () => Confirmation,
						Review: () => Review,
						UpdateDeliveryAddress: () => UpdateDeliveryAddress,
						__namedExportsOrder: () => __namedExportsOrder,
						default: () => DeliveryAddress_stories,
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
					mdapiResponse = __webpack_require__(
						'./client/fixtures/mdapiResponse.ts',
					),
					testProducts = __webpack_require__(
						'./client/fixtures/productBuilder/testProducts.ts',
					),
					productTypes = __webpack_require__(
						'./shared/productTypes.ts',
					),
					emotion_react_browser_esm = __webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
					mq = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
					),
					react = __webpack_require__(
						'./node_modules/react/index.js',
					),
					react_router = __webpack_require__(
						'./node_modules/react-router/index.js',
					),
					productResponse = __webpack_require__(
						'./shared/productResponse.ts',
					),
					deliveryAddress = __webpack_require__(
						'./client/utilities/deliveryAddress.ts',
					),
					productUtils = __webpack_require__(
						'./client/utilities/productUtils.ts',
					),
					NavConfig = __webpack_require__(
						'./client/components/shared/nav/NavConfig.tsx',
					),
					models = __webpack_require__(
						'./client/components/mma/identity/models.ts',
					),
					Page = __webpack_require__(
						'./client/components/mma/Page.tsx',
					),
					DeliveryAddressFormContext = __webpack_require__(
						'./client/components/mma/delivery/address/DeliveryAddressFormContext.tsx',
					),
					emotion_react_jsx_runtime_browser_esm = __webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
				var ContextAndOutletContainer = (props) => {
						var _COUNTRIES$find,
							existingDeliveryAddress = Object.values(
								props.contactIdToArrayOfProductDetailAndProductType,
							)[0][0].productDetail.subscription.deliveryAddress,
							[addressLine1, setAddressLine1] = (0,
							react.useState)(
								(null == existingDeliveryAddress
									? void 0
									: existingDeliveryAddress.addressLine1) ||
									'',
							),
							[addressLine2, setAddressLine2] = (0,
							react.useState)(
								(null == existingDeliveryAddress
									? void 0
									: existingDeliveryAddress.addressLine2) ||
									'',
							),
							[town, setTown] = (0, react.useState)(
								(null == existingDeliveryAddress
									? void 0
									: existingDeliveryAddress.town) || '',
							),
							[region, setRegion] = (0, react.useState)(
								(null == existingDeliveryAddress
									? void 0
									: existingDeliveryAddress.region) || '',
							),
							[postcode, setPostcode] = (0, react.useState)(
								(null == existingDeliveryAddress
									? void 0
									: existingDeliveryAddress.postcode) || '',
							),
							[country, setCountry] = (0, react.useState)(
								null != existingDeliveryAddress &&
									existingDeliveryAddress.country
									? (null ===
											(_COUNTRIES$find = models.od.find(
												(countryObj) =>
													(null ==
													existingDeliveryAddress
														? void 0
														: existingDeliveryAddress.country) ===
													countryObj.iso,
											)) || void 0 === _COUNTRIES$find
											? void 0
											: _COUNTRIES$find.name) ||
											(null == existingDeliveryAddress
												? void 0
												: existingDeliveryAddress.country)
									: '',
							),
							[instructions, setInstructions] = (0,
							react.useState)(
								(null == existingDeliveryAddress
									? void 0
									: existingDeliveryAddress.instructions) ||
									'',
							),
							addressSetStateObject = {
								setAddressLine1,
								setAddressLine2,
								setTown,
								setRegion,
								setPostcode,
								setCountry,
								setInstructions,
							},
							addressStateObject = {
								addressLine1,
								addressLine2,
								town,
								region,
								postcode,
								country,
								instructions,
							};
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							DeliveryAddressFormContext.Ib.Provider,
							{
								value: {
									addressStateObject,
									addressSetStateObject,
								},
								children: (0,
								emotion_react_jsx_runtime_browser_esm.tZ)(
									DeliveryAddressFormContext.X4.Provider,
									{
										value: (0, deliveryAddress.c)(
											props.contactIdToArrayOfProductDetailAndProductType,
										),
										children: (0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											DeliveryAddressFormContext.hk
												.Provider,
											{
												value: props.contactIdToArrayOfProductDetailAndProductType,
												children: (0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													react_router.j3,
													{},
												),
											},
										),
									},
								),
							},
						);
					},
					_ref = {
						name: '2010ff',
						styles: '::first-letter{text-transform:capitalize;}',
					},
					DeliveryAddressChangeContainer = (props) => {
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							Page._,
							{
								selectedNavItem: NavConfig.qy.accountOverview,
								pageTitle: (0,
								emotion_react_jsx_runtime_browser_esm.BX)(
									'span',
									{
										css: _ref,
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'span',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														'display:none;',
														mq.Dp.tablet,
														'{display:inline;}',
														'',
													),
													children: ['Update', ' '],
												},
											),
											'delivery details',
										],
									},
								),
								children: (0,
								emotion_react_jsx_runtime_browser_esm.tZ)(
									productResponse.wH,
									{
										render:
											((productType = props.productType),
											(mdapiResponse) =>
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													ContextAndOutletContainer,
													{
														contactIdToArrayOfProductDetailAndProductType:
															(0,
															deliveryAddress.O)(
																mdapiResponse.products
																	.filter(
																		productResponse.v_,
																	)
																	.filter(
																		(_) =>
																			'Gift' !==
																			_
																				.subscription
																				.readerType,
																	),
															),
														productType,
													},
												)),
										fetch: (0, productUtils.w)(
											productTypes.HP.subscriptions
												.allProductsProductTypeFilterString,
										),
										loadingMessage:
											'Loading delivery details...',
									},
								),
							},
						);
						var productType;
					};
				try {
					(DeliveryAddressChangeContainer.displayName =
						'DeliveryAddressChangeContainer'),
						(DeliveryAddressChangeContainer.__docgenInfo = {
							description: '',
							displayName: 'DeliveryAddressChangeContainer',
							props: {
								productType: {
									defaultValue: null,
									description: '',
									name: 'productType',
									required: !0,
									type: { name: 'ProductType' },
								},
							},
						}),
						'undefined' != typeof STORYBOOK_REACT_CLASSES &&
							(STORYBOOK_REACT_CLASSES[
								'client/components/mma/delivery/address/DeliveryAddressChangeContainer.tsx#DeliveryAddressChangeContainer'
							] = {
								docgenInfo:
									DeliveryAddressChangeContainer.__docgenInfo,
								name: 'DeliveryAddressChangeContainer',
								path: 'client/components/mma/delivery/address/DeliveryAddressChangeContainer.tsx#DeliveryAddressChangeContainer',
							});
				} catch (__react_docgen_typescript_loader_error) {}
				var DeliveryAddressConfirmation = __webpack_require__(
						'./client/components/mma/delivery/address/DeliveryAddressConfirmation.tsx',
					),
					palette = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
					space = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
					),
					typography = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
					CheckboxGroup = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/checkbox/CheckboxGroup.js',
					),
					Checkbox = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/checkbox/Checkbox.js',
					),
					Button = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/button/Button.js',
					),
					Stack = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/stack/Stack.js',
					),
					react_router_dom = __webpack_require__(
						'./node_modules/react-router-dom/index.js',
					),
					utils = __webpack_require__('./client/utilities/utils.ts'),
					CallCenterEmailAndNumbers = __webpack_require__(
						'./client/components/shared/CallCenterEmailAndNumbers.tsx',
					),
					CallCentreNumbers = __webpack_require__(
						'./client/components/shared/CallCentreNumbers.tsx',
					),
					Input = __webpack_require__(
						'./client/components/shared/Input.tsx',
					),
					InfoIconDark = __webpack_require__(
						'./client/components/mma/shared/assets/InfoIconDark.tsx',
					),
					CallCentrePrompt = __webpack_require__(
						'./client/components/mma/shared/CallCentrePrompt.tsx',
					),
					InfoSection = __webpack_require__(
						'./client/components/mma/shared/InfoSection.tsx',
					),
					ProductDescriptionListTable = __webpack_require__(
						'./client/components/mma/shared/ProductDescriptionListTable.tsx',
					),
					ProgressIndicator = __webpack_require__(
						'./client/components/mma/shared/ProgressIndicator.tsx',
					),
					formValidation = __webpack_require__(
						'./client/components/mma/delivery/address/formValidation.tsx',
					),
					Select = __webpack_require__(
						'./client/components/mma/delivery/address/Select.tsx',
					);
				var formStates_INIT = 'init',
					formStates_PENDING = 'pending',
					formStates_VALIDATION_ERROR = 'validationError',
					DeliveryAddressForm_ref = {
						name: 'igbi3c',
						styles: 'display:inline-block;vertical-align:top;margin-top:4px;width:100%;max-width:30ch',
					},
					_ref2 = { name: '1fw72n4', styles: 'margin-top:14px' },
					Form = (props) => {
						var _addressStateObject$i,
							_props$productType$de,
							_props$formErrors$add,
							_props$formErrors$add2,
							_props$formErrors$tow,
							_props$formErrors$tow2,
							_props$formErrors$pos,
							_props$formErrors$pos2,
							_props$formErrors$cou,
							_props$formErrors$cou2,
							_props$productType$de2,
							location = (0, react_router.TH)(),
							navigate = (0, react_router.s0)(),
							addressStateContext = (0, react.useContext)(
								DeliveryAddressFormContext.Ib,
							),
							contactIdToArrayOfProductDetailAndProductType = (0,
							react.useContext)(DeliveryAddressFormContext.hk),
							addressStateObject =
								addressStateContext.addressStateObject,
							addressSetStateObject =
								addressStateContext.addressSetStateObject,
							[
								showTopCallCentreNumbers,
								setTopCallCentreNumbersVisibility,
							] = (0, react.useState)(!1),
							[
								instructionsRemainingCharacters,
								setInstructionsRemainingCharacters,
							] = (0, react.useState)(
								250 -
									((null ===
										(_addressStateObject$i =
											addressStateObject.instructions) ||
									void 0 === _addressStateObject$i
										? void 0
										: _addressStateObject$i.length) || 0),
							),
							[acknowledgementChecked, setAcknowledgementState] =
								(0, react.useState)(!1),
							subscriptionsNames = Object.values(
								contactIdToArrayOfProductDetailAndProductType,
							)
								.flatMap(utils.OG)
								.map((_ref3) => {
									var { productDetail } = _ref3,
										friendlyProductName = (0,
										productResponse.Xn)(
											productDetail.tier,
										).friendlyName;
									return ''.concat(friendlyProductName);
								});
						return (0, emotion_react_jsx_runtime_browser_esm.BX)(
							emotion_react_jsx_runtime_browser_esm.HY,
							{
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'form',
										{
											action: '#',
											onSubmit: (e) => {
												e.preventDefault(),
													props.setFormStatus(
														formStates_PENDING,
													);
												var formData = {
														addressLine1:
															addressStateObject.addressLine1,
														addressLine2:
															addressStateObject.addressLine2,
														town: addressStateObject.town,
														region: addressStateObject.region,
														postcode:
															addressStateObject.postcode,
														country:
															addressStateObject.country,
													},
													isFormValidResponse = (0,
													formValidation._)(
														formData,
														subscriptionsNames,
													);
												props.setFormErrors({
													addressLine1:
														isFormValidResponse.addressLine1,
													town: isFormValidResponse.town,
													postcode:
														isFormValidResponse.postcode,
													country:
														isFormValidResponse.country,
												}),
													isFormValidResponse.isValid &&
													acknowledgementChecked
														? navigate('review', {
																state: location.state,
														  })
														: props.setFormStatus(
																formStates_VALIDATION_ERROR,
														  );
											},
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'fieldset',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															{
																border: '1px solid '.concat(
																	palette
																		.palette
																		.neutral[86],
																),
																padding:
																	'48px 14px 14px',
																position:
																	'relative',
																marginBottom:
																	''.concat(
																		space
																			.D[5],
																		'px',
																	),
																label: {
																	marginTop:
																		''.concat(
																			space
																				.D[3],
																			'px',
																		),
																},
															},
															'',
															'',
														),
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'legend',
																{
																	css: (0,
																	emotion_react_browser_esm.iv)(
																		'width:100%;position:absolute;top:0;left:0;padding:0 14px;',
																		typography.Kz0,
																		';font-weight:bold;line-height:48px;background-color:',
																		palette
																			.palette
																			.neutral[97],
																		';border-bottom:1px solid ',
																		palette
																			.palette
																			.neutral[86],
																		';',
																		'',
																	),
																	children: [
																		'Delivery address',
																		(null ===
																			(_props$productType$de =
																				props
																					.productType
																					.delivery) ||
																		void 0 ===
																			_props$productType$de
																			? void 0
																			: _props$productType$de.enableDeliveryInstructionsUpdate) &&
																			' and instructions',
																	],
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																Input.I,
																{
																	label: 'Address line 1',
																	width: 30,
																	value: addressStateObject.addressLine1,
																	changeSetState:
																		addressSetStateObject.setAddressLine1,
																	inErrorState:
																		props.formStatus ===
																			formStates_VALIDATION_ERROR &&
																		!(
																			null !==
																				(_props$formErrors$add =
																					props
																						.formErrors
																						.addressLine1) &&
																			void 0 !==
																				_props$formErrors$add &&
																			_props$formErrors$add.isValid
																		),
																	errorMessage:
																		null ===
																			(_props$formErrors$add2 =
																				props
																					.formErrors
																					.addressLine1) ||
																		void 0 ===
																			_props$formErrors$add2
																			? void 0
																			: _props$formErrors$add2.message,
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																Input.I,
																{
																	label: 'Address line 2',
																	width: 30,
																	value:
																		addressStateObject.addressLine2 ||
																		'',
																	changeSetState:
																		addressSetStateObject.setAddressLine2,
																	optional:
																		!0,
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																Input.I,
																{
																	label: 'Town or City',
																	width: 30,
																	value:
																		addressStateObject.town ||
																		'',
																	changeSetState:
																		addressSetStateObject.setTown,
																	inErrorState:
																		props.formStatus ===
																			formStates_VALIDATION_ERROR &&
																		!(
																			null !==
																				(_props$formErrors$tow =
																					props
																						.formErrors
																						.town) &&
																			void 0 !==
																				_props$formErrors$tow &&
																			_props$formErrors$tow.isValid
																		),
																	errorMessage:
																		null ===
																			(_props$formErrors$tow2 =
																				props
																					.formErrors
																					.town) ||
																		void 0 ===
																			_props$formErrors$tow2
																			? void 0
																			: _props$formErrors$tow2.message,
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																Input.I,
																{
																	label: 'County or State',
																	width: 30,
																	value:
																		addressStateObject.region ||
																		'',
																	optional:
																		!0,
																	changeSetState:
																		addressSetStateObject.setRegion,
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																Input.I,
																{
																	label: 'Postcode/Zipcode',
																	width: 11,
																	value: addressStateObject.postcode,
																	changeSetState:
																		addressSetStateObject.setPostcode,
																	inErrorState:
																		props.formStatus ===
																			formStates_VALIDATION_ERROR &&
																		!(
																			null !==
																				(_props$formErrors$pos =
																					props
																						.formErrors
																						.postcode) &&
																			void 0 !==
																				_props$formErrors$pos &&
																			_props$formErrors$pos.isValid
																		),
																	errorMessage:
																		null ===
																			(_props$formErrors$pos2 =
																				props
																					.formErrors
																					.postcode) ||
																		void 0 ===
																			_props$formErrors$pos2
																			? void 0
																			: _props$formErrors$pos2.message,
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																Select.P,
																{
																	label: 'Country',
																	options:
																		models.od.map(
																			(
																				country,
																			) => ({
																				name: country.name,
																				value: country.name,
																			}),
																		),
																	width: 30,
																	additionalCSS:
																		_ref2,
																	value: addressStateObject.country,
																	changeSetState:
																		addressSetStateObject.setCountry,
																	inErrorState:
																		props.formStatus ===
																			formStates_VALIDATION_ERROR &&
																		!(
																			null !==
																				(_props$formErrors$cou =
																					props
																						.formErrors
																						.country) &&
																			void 0 !==
																				_props$formErrors$cou &&
																			_props$formErrors$cou.isValid
																		),
																	errorMessage:
																		null ===
																			(_props$formErrors$cou2 =
																				props
																					.formErrors
																					.country) ||
																		void 0 ===
																			_props$formErrors$cou2
																			? void 0
																			: _props$formErrors$cou2.message,
																},
															),
															(null ===
																(_props$productType$de2 =
																	props
																		.productType
																		.delivery) ||
															void 0 ===
																_props$productType$de2
																? void 0
																: _props$productType$de2.enableDeliveryInstructionsUpdate) &&
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'label',
																	{
																		css: (0,
																		emotion_react_browser_esm.iv)(
																			'display:block;color:',
																			palette
																				.palette
																				.neutral[7],
																			';',
																			typography.Kz0,
																			';font-weight:bold;',
																			'',
																		),
																		children:
																			[
																				'Instructions',
																				(0,
																				emotion_react_jsx_runtime_browser_esm.BX)(
																					'div',
																					{
																						children:
																							[
																								(0,
																								emotion_react_jsx_runtime_browser_esm.BX)(
																									'div',
																									{
																										css: DeliveryAddressForm_ref,
																										children:
																											[
																												(0,
																												emotion_react_jsx_runtime_browser_esm.tZ)(
																													'textarea',
																													{
																														id: 'delivery-instructions',
																														name: 'instructions',
																														rows: 2,
																														maxLength: 250,
																														value: addressStateObject.instructions,
																														onChange:
																															(
																																e,
																															) => {
																																addressSetStateObject.setInstructions(
																																	e
																																		.target
																																		.value,
																																),
																																	setInstructionsRemainingCharacters(
																																		250 -
																																			e
																																				.target
																																				.value
																																				.length,
																																	);
																															},
																														css: (0,
																														emotion_react_browser_esm.iv)(
																															'width:100%;border:2px solid ',
																															palette
																																.palette
																																.neutral[60],
																															';padding:12px;resize:vertical;',
																															typography.Kz0,
																															';',
																															'',
																														),
																													},
																												),
																												(0,
																												emotion_react_jsx_runtime_browser_esm.BX)(
																													'span',
																													{
																														css: (0,
																														emotion_react_browser_esm.iv)(
																															'display:block;text-align:right;',
																															typography.VZD,
																															';color:',
																															palette
																																.palette
																																.neutral[46],
																															';',
																															'',
																														),
																														children:
																															[
																																instructionsRemainingCharacters,
																																' ',
																																'characters remaining',
																															],
																													},
																												),
																											],
																									},
																								),
																								(0,
																								emotion_react_jsx_runtime_browser_esm.BX)(
																									'p',
																									{
																										css: (0,
																										emotion_react_browser_esm.iv)(
																											'display:block;',
																											typography.Kz0,
																											';border:4px solid ',
																											palette
																												.palette
																												.brand[500],
																											';padding:',
																											space
																												.D[5],
																											'px ',
																											space
																												.D[5],
																											'px ',
																											space
																												.D[5],
																											'px 49px;margin:',
																											space
																												.D[3],
																											'px 0;position:relative;',
																											mq
																												.Dp
																												.tablet,
																											'{display:inline-block;vertical-align:top;margin:2px 0 ',
																											space
																												.D[3],
																											'px ',
																											space
																												.D[3],
																											'px;width:calc(\n\t\t\t\t\t\t\t\t\t\t\t\t100% -\n\t\t\t\t\t\t\t\t\t\t\t\t\t(30ch + ',
																											space
																												.D[3],
																											'px + 2px)\n\t\t\t\t\t\t\t\t\t\t\t);}',
																											'',
																										),
																										children:
																											[
																												(0,
																												emotion_react_jsx_runtime_browser_esm.tZ)(
																													'i',
																													{
																														css: (0,
																														emotion_react_browser_esm.iv)(
																															'width:17px;height:17px;position:absolute;top:',
																															space
																																.D[5],
																															'px;left:',
																															space
																																.D[5],
																															'px;',
																															'',
																														),
																														children:
																															(0,
																															emotion_react_jsx_runtime_browser_esm.tZ)(
																																InfoIconDark.J,
																																{
																																	fillColor:
																																		palette
																																			.palette
																																			.brand[500],
																																},
																															),
																													},
																												),
																												'Delivery instructions are only applicable for newspaper deliveries. They do not apply to Guardian Weekly.',
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
												emotion_react_jsx_runtime_browser_esm.tZ)(
													CheckboxGroup.c,
													{
														name: 'instructions-checkbox',
														error:
															props.formStatus !==
																formStates_VALIDATION_ERROR ||
															acknowledgementChecked
																? void 0
																: 'Please indicate that you understand which subscriptions this change will affect.',
														children: (0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															Checkbox.X,
															{
																value: 'acknowledged',
																label: 'I understand that this address change will affect the following subscriptions',
																checked:
																	acknowledgementChecked,
																onChange: (
																	e,
																) => {
																	setAcknowledgementState(
																		e.target
																			.checked,
																	);
																},
															},
														),
													},
												),
												props.warning &&
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														ProductDescriptionListTable.M,
														{
															content:
																props.warning,
															seperateEachRow: !0,
														},
													),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'div',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															'margin-top:',
															space.D[5],
															'px;*{display:inline-block;}',
															mq.Dp.tablet,
															'{margin-top:',
															space.D[6],
															'px;}',
															'',
														),
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																Button.z,
																{
																	type: 'submit',
																	children:
																		'Review details',
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																react_router_dom.rU,
																{
																	to: NavConfig
																		.qy
																		.accountOverview
																		.link,
																	css: (0,
																	emotion_react_browser_esm.iv)(
																		typography.Rcn,
																		';margin-left:22px;color:',
																		palette
																			.palette
																			.brand[400],
																		';',
																		'',
																	),
																	children:
																		'Cancel',
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
										Stack.K,
										{
											space: 5,
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'p',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															typography.Kz0,
															';margin:',
															space.D[12],
															'px 0 0;color:',
															palette.palette
																.neutral[46],
															';',
															'',
														),
														children: [
															'If you need separate delivery addresses for each of your subscriptions, please',
															' ',
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'span',
																{
																	css: (0,
																	emotion_react_browser_esm.iv)(
																		'cursor:pointer;color:',
																		palette
																			.palette
																			.brand[500],
																		';text-decoration:underline;',
																		'',
																	),
																	onClick:
																		() =>
																			setTopCallCentreNumbersVisibility(
																				!showTopCallCentreNumbers,
																			),
																	children:
																		'contact us',
																},
															),
															'.',
														],
													},
												),
												showTopCallCentreNumbers &&
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														CallCenterEmailAndNumbers.K,
														{},
													),
											],
										},
									),
								],
							},
						);
					},
					DeliveryAddressUpdate = (props) => {
						var [formStatus, setFormStatus] = (0, react.useState)(
								formStates_INIT,
							),
							[formErrors, setFormErrors] = (0, react.useState)({
								isValid: !1,
							}),
							contactIdToArrayOfProductDetailAndProductType = (0,
							react.useContext)(DeliveryAddressFormContext.hk),
							subHeadingCss = '\n\t\tborder-top: 1px solid '
								.concat(palette.palette.neutral[86], ';\n\t\t')
								.concat(
									typography.Hu7,
									';\n\t\tmargin-top: 50px;\n\t\t',
								)
								.concat(
									mq.C4.tablet,
									' {\n\t\t\tfont-size: 1.25rem;\n\t\t\tline-height: 1.6;\n\t\t};\n\t',
								);
						return Object.values(
							contactIdToArrayOfProductDetailAndProductType,
						)
							.flatMap(utils.OG)
							.some((_ref4) => {
								var { productType } = _ref4;
								return (
									'nationaldelivery' ===
									productType.productType
								);
							})
							? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'div',
									{
										css: (0, emotion_react_browser_esm.iv)(
											'margin-top:',
											space.D[3],
											'px;',
											'',
										),
										children: (0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											CallCentrePrompt.r,
											{},
										),
									},
							  )
							: (0, emotion_react_jsx_runtime_browser_esm.BX)(
									emotion_react_jsx_runtime_browser_esm.HY,
									{
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												ProgressIndicator.Y,
												{
													steps: [
														{
															title: 'Update',
															isCurrentStep: !0,
														},
														{ title: 'Review' },
														{
															title: 'Confirmation',
														},
													],
													additionalCSS: (0,
													emotion_react_browser_esm.iv)(
														'margin-top:',
														space.D[5],
														'px;',
														'',
													),
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'h2',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														subHeadingCss,
														';',
														'',
													),
													children:
														'Update address details',
												},
											),
											0 ===
												Object.keys(
													contactIdToArrayOfProductDetailAndProductType,
												).length &&
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'div',
													{
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'p',
																{
																	children:
																		"No addresses available for update. If this doesn't seem right please contact us",
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																CallCentreNumbers.H,
																{},
															),
														],
													},
												),
											Object.keys(
												contactIdToArrayOfProductDetailAndProductType,
											).length > 1 &&
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'div',
													{
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'p',
																{
																	children:
																		'You will need to contact us to update your addresses',
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																CallCentreNumbers.H,
																{},
															),
														],
													},
												),
											1 ===
												Object.keys(
													contactIdToArrayOfProductDetailAndProductType,
												).length &&
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'div',
													{
														children: [
															Object.values(
																contactIdToArrayOfProductDetailAndProductType,
															).flatMap(utils.OG)
																.length > 1 &&
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	InfoSection.w,
																	{
																		children:
																			'Please note that changing your address here will update the delivery address for all of your subscriptions.',
																	},
																),
															(formStatus ===
																formStates_INIT ||
																formStatus ===
																	formStates_PENDING ||
																formStatus ===
																	formStates_VALIDATION_ERROR) &&
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	Form,
																	{
																		formStatus,
																		setFormStatus,
																		formErrors,
																		setFormErrors,
																		productType:
																			props.productType,
																		warning:
																			(0,
																			DeliveryAddressFormContext.lD)(
																				(0,
																				deliveryAddress.c)(
																					contactIdToArrayOfProductDetailAndProductType,
																				),
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
					(DeliveryAddressUpdate.displayName =
						'DeliveryAddressUpdate'),
						(DeliveryAddressUpdate.__docgenInfo = {
							description: '',
							displayName: 'DeliveryAddressUpdate',
							props: {
								productType: {
									defaultValue: null,
									description: '',
									name: 'productType',
									required: !0,
									type: { name: 'ProductType' },
								},
							},
						}),
						'undefined' != typeof STORYBOOK_REACT_CLASSES &&
							(STORYBOOK_REACT_CLASSES[
								'client/components/mma/delivery/address/DeliveryAddressForm.tsx#DeliveryAddressUpdate'
							] = {
								docgenInfo: DeliveryAddressUpdate.__docgenInfo,
								name: 'DeliveryAddressUpdate',
								path: 'client/components/mma/delivery/address/DeliveryAddressForm.tsx#DeliveryAddressUpdate',
							});
				} catch (__react_docgen_typescript_loader_error) {}
				var DeliveryAddressDisplay = __webpack_require__(
					'./client/components/mma/delivery/address/DeliveryAddressDisplay.tsx',
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
				var DeliveryAddressReview_ref = {
						name: '1ff36h2',
						styles: 'flex-grow:1',
					},
					DeliveryAddressReview = (props) => {
						var _newDeliveryAddressCo,
							_props$productType$de,
							_newDeliveryAddressCo2,
							newDeliveryAddressContext = (0, react.useContext)(
								DeliveryAddressFormContext.Ib,
							),
							addressChangedInformationContext = (0,
							react.useContext)(DeliveryAddressFormContext.X4),
							[
								showTopCallCentreNumbers,
								setTopCallCentreNumbersVisibility,
							] = (0, react.useState)(!1),
							navigate = (0, react_router.s0)(),
							location = (0, react_router.TH)();
						(null !==
							(_newDeliveryAddressCo =
								newDeliveryAddressContext.addressStateObject) &&
							void 0 !== _newDeliveryAddressCo &&
							_newDeliveryAddressCo.addressLine1) ||
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								react_router.Fg,
								{ to: '..', replace: !0 },
							);
						var subHeadingCss = '\n    border-top: 1px solid '
								.concat(palette.palette.neutral[86], ';\n\t')
								.concat(
									typography.Hu7,
									';\n    margin-top: 50px;\n    ',
								)
								.concat(
									mq.C4.tablet,
									' {\n      font-size: 1.25rem;\n      line-height: 1.6;\n    };\n  ',
								),
							dtCss =
								'\n    font-weight: bold;\n    display: inline-block;\n    vertical-align: top;\n    min-width: 12ch;\n  ',
							ddCss =
								'\n    margin: 0;\n    display: inline-block;\n    vertical-align: top;\n    min-width: 12ch;\n  ';
						return (0, emotion_react_jsx_runtime_browser_esm.BX)(
							emotion_react_jsx_runtime_browser_esm.HY,
							{
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										ProgressIndicator.Y,
										{
											steps: [
												{ title: 'Update' },
												{
													title: 'Review',
													isCurrentStep: !0,
												},
												{ title: 'Confirmation' },
											],
											additionalCSS: (0,
											emotion_react_browser_esm.iv)(
												'margin-top:',
												space.D[5],
												'px;',
												'',
											),
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'h2',
										{
											css: (0,
											emotion_react_browser_esm.iv)(
												subHeadingCss,
												';',
												'',
											),
											children: 'Review address details',
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'div',
										{
											children: [
												addressChangedInformationContext.length >
													1 &&
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														InfoSection.w,
														{
															children:
																'Please note that changing your address here will update the delivery address for all of your subscriptions.',
														},
													),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'section',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															'border:1px solid ',
															palette.palette
																.neutral[86],
															';margin-top:',
															space.D[5],
															'px;',
															'',
														),
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'h2',
																{
																	css: (0,
																	emotion_react_browser_esm.iv)(
																		'margin:0;padding:',
																		space
																			.D[3],
																		'px;background-color:',
																		palette
																			.palette
																			.neutral[97],
																		';border-bottom:1px solid ',
																		palette
																			.palette
																			.neutral[86],
																		';',
																		typography.Rcn,
																		';',
																		mq.Dp
																			.tablet,
																		'{padding:',
																		space
																			.D[3],
																		'px ',
																		space
																			.D[5],
																		'px;}',
																		'',
																	),
																	children: [
																		'Delivery address',
																		(null ===
																			(_props$productType$de =
																				props
																					.productType
																					.delivery) ||
																		void 0 ===
																			_props$productType$de
																			? void 0
																			: _props$productType$de.enableDeliveryInstructionsUpdate) &&
																			' and instructions',
																	],
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'dl',
																{
																	css: (0,
																	emotion_react_browser_esm.iv)(
																		'padding:0 ',
																		space
																			.D[3],
																		'px;',
																		typography.Kz0,
																		';display:flex;flex-wrap:wrap;flex-direction:column;justify-content:space-between;',
																		mq.Dp
																			.tablet,
																		'{padding:0 ',
																		space
																			.D[5],
																		'px;}',
																		'',
																	),
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.BX)(
																			'div',
																			{
																				css: DeliveryAddressReview_ref,
																				children:
																					[
																						(0,
																						emotion_react_jsx_runtime_browser_esm.tZ)(
																							'dt',
																							{
																								css: (0,
																								emotion_react_browser_esm.iv)(
																									dtCss,
																									';',
																									'',
																								),
																								children:
																									'Address',
																							},
																						),
																						(0,
																						emotion_react_jsx_runtime_browser_esm.tZ)(
																							'dd',
																							{
																								css: (0,
																								emotion_react_browser_esm.iv)(
																									ddCss,
																									';',
																									'',
																								),
																								children:
																									newDeliveryAddressContext.addressStateObject &&
																									(0,
																									emotion_react_jsx_runtime_browser_esm.tZ)(
																										DeliveryAddressDisplay.O,
																										_objectSpread(
																											{},
																											newDeliveryAddressContext.addressStateObject,
																										),
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
																				css: (0,
																				emotion_react_browser_esm.iv)(
																					'flex-grow:1;margin-top:16px;',
																					mq
																						.Dp
																						.tablet,
																					'{margin-top:0;}',
																					'',
																				),
																				children:
																					[
																						(0,
																						emotion_react_jsx_runtime_browser_esm.tZ)(
																							'dt',
																							{
																								css: (0,
																								emotion_react_browser_esm.iv)(
																									dtCss,
																									';',
																									'',
																								),
																								children:
																									'Instruction',
																							},
																						),
																						(0,
																						emotion_react_jsx_runtime_browser_esm.tZ)(
																							'dd',
																							{
																								css: (0,
																								emotion_react_browser_esm.iv)(
																									ddCss,
																									';',
																									'',
																								),
																								children:
																									(null ===
																										(_newDeliveryAddressCo2 =
																											newDeliveryAddressContext.addressStateObject) ||
																									void 0 ===
																										_newDeliveryAddressCo2
																										? void 0
																										: _newDeliveryAddressCo2.instructions) ||
																									'-',
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
													'p',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															typography.Kz0,
															';margin-top:',
															space.D[9],
															'px;',
															'',
														),
														children:
															'I understand that this address change will affect the following subscriptions',
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													ProductDescriptionListTable.M,
													{
														content: (0,
														DeliveryAddressFormContext.lD)(
															addressChangedInformationContext,
														),
														seperateEachRow: !0,
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'div',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															'margin-top:',
															space.D[5],
															'px;*{display:inline-block;}',
															mq.Dp.tablet,
															'{margin-top:',
															space.D[6],
															'px;}',
															'',
														),
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																Button.z,
																{
																	onClick:
																		() => {
																			navigate(
																				'../confirmed',
																				{
																					state: location.state,
																				},
																			);
																		},
																	children:
																		'Submit details',
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																react_router_dom.rU,
																{
																	to: '..',
																	css: (0,
																	emotion_react_browser_esm.iv)(
																		typography.Kz0,
																		';font-weight:bold;margin-left:22px;color:',
																		palette
																			.palette
																			.brand[400],
																		';',
																		'',
																	),
																	children:
																		'Go back',
																},
															),
														],
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													Stack.K,
													{
														space: 5,
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'p',
																{
																	css: (0,
																	emotion_react_browser_esm.iv)(
																		typography.Kz0,
																		';margin:',
																		space
																			.D[12],
																		'px 0 0;color:',
																		palette
																			.palette
																			.neutral[46],
																		';',
																		'',
																	),
																	children: [
																		'If you need separate delivery addresses for each of your subscriptions, please',
																		' ',
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'span',
																			{
																				css: (0,
																				emotion_react_browser_esm.iv)(
																					'cursor:pointer;color:',
																					palette
																						.palette
																						.brand[500],
																					';text-decoration:underline;',
																					'',
																				),
																				onClick:
																					() =>
																						setTopCallCentreNumbersVisibility(
																							!showTopCallCentreNumbers,
																						),
																				children:
																					'contact us',
																			},
																		),
																		'.',
																	],
																},
															),
															showTopCallCentreNumbers &&
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	CallCenterEmailAndNumbers.K,
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
					};
				try {
					(DeliveryAddressReview.displayName =
						'DeliveryAddressReview'),
						(DeliveryAddressReview.__docgenInfo = {
							description: '',
							displayName: 'DeliveryAddressReview',
							props: {
								productType: {
									defaultValue: null,
									description: '',
									name: 'productType',
									required: !0,
									type: { name: 'ProductType' },
								},
							},
						}),
						'undefined' != typeof STORYBOOK_REACT_CLASSES &&
							(STORYBOOK_REACT_CLASSES[
								'client/components/mma/delivery/address/DeliveryAddressReview.tsx#DeliveryAddressReview'
							] = {
								docgenInfo: DeliveryAddressReview.__docgenInfo,
								name: 'DeliveryAddressReview',
								path: 'client/components/mma/delivery/address/DeliveryAddressReview.tsx#DeliveryAddressReview',
							});
				} catch (__react_docgen_typescript_loader_error) {}
				const DeliveryAddress_stories = {
					component: DeliveryAddressChangeContainer,
					title: 'Pages/DeliveryAddress',
					decorators: [ReactRouterDecorator.R],
					parameters: {
						reactRouter: {
							state: (0, testProducts.X8)(),
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								DeliveryAddressChangeContainer,
								{ productType: productTypes.Pm.guardianweekly },
							),
						},
						msw: [
							http.d.get('/api/me/mma', () =>
								HttpResponse.Z.json(
									(0, mdapiResponse.F)(
										(0, testProducts.X8)(),
									),
								),
							),
						],
					},
				};
				var UpdateDeliveryAddress = () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							DeliveryAddressUpdate,
							{ productType: productTypes.Pm.guardianweekly },
						),
					Review = () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							DeliveryAddressReview,
							{ productType: productTypes.Pm.guardianweekly },
						),
					Confirmation = {
						render: () =>
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								DeliveryAddressConfirmation.l,
								{ productType: productTypes.Pm.guardianweekly },
							),
						parameters: {
							msw: [
								http.d.get('/api/me/mma', () =>
									HttpResponse.Z.json(
										(0, mdapiResponse.F)(
											(0, testProducts.X8)(),
										),
									),
								),
								http.d.put(
									'/api/delivery/address/update/*',
									() =>
										new HttpResponse.Z(null, {
											status: 200,
										}),
								),
							],
						},
					};
				(UpdateDeliveryAddress.parameters = {
					...UpdateDeliveryAddress.parameters,
					docs: {
						...UpdateDeliveryAddress.parameters?.docs,
						source: {
							originalSource:
								'() => {\n  return <DeliveryAddressUpdate productType={PRODUCT_TYPES.guardianweekly} />;\n}',
							...UpdateDeliveryAddress.parameters?.docs?.source,
						},
					},
				}),
					(Review.parameters = {
						...Review.parameters,
						docs: {
							...Review.parameters?.docs,
							source: {
								originalSource:
									'() => {\n  return <DeliveryAddressReview productType={PRODUCT_TYPES.guardianweekly} />;\n}',
								...Review.parameters?.docs?.source,
							},
						},
					}),
					(Confirmation.parameters = {
						...Confirmation.parameters,
						docs: {
							...Confirmation.parameters?.docs,
							source: {
								originalSource:
									"{\n  render: () => {\n    return <DeliveryAddressConfirmation productType={PRODUCT_TYPES.guardianweekly} />;\n  },\n  parameters: {\n    msw: [http.get('/api/me/mma', () => {\n      return HttpResponse.json(toMembersDataApiResponse(guardianWeeklyPaidByCard()));\n    }), http.put('/api/delivery/address/update/*', () => {\n      return new HttpResponse(null, {\n        status: 200\n      });\n    })]\n  }\n}",
								...Confirmation.parameters?.docs?.source,
							},
						},
					});
				const __namedExportsOrder = [
					'UpdateDeliveryAddress',
					'Review',
					'Confirmation',
				];
			},
	},
]);
//# sourceMappingURL=components-mma-delivery-address-DeliveryAddress-stories.f1f7ea94.iframe.bundle.js.map
