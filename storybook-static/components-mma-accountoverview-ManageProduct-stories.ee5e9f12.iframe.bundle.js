'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[8045],
	{
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
		'./client/utilities/pricingConfig/suggestedAmounts.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				Q9: () => getContributionSuggestedAmounts,
				uq: () => getSupporterPlusSuggestedAmountsFromMainPlan,
			});
			var _guardian_libs__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@guardian/libs/dist/isOneOf/isOneOf.js',
					),
				_currencyIso__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./client/utilities/currencyIso.ts',
				),
				billingPeriods = ['month', 'year'];
			function getContributionSuggestedAmounts(mainPlan) {
				var currentAmount = mainPlan.price / 100,
					currencyISO = (0,
					_currencyIso__WEBPACK_IMPORTED_MODULE_0__.uN)(
						mainPlan.currencyISO,
					)
						? mainPlan.currencyISO
						: 'international';
				if (
					!(0, _guardian_libs__WEBPACK_IMPORTED_MODULE_1__.g)(
						billingPeriods,
					)(mainPlan.billingPeriod)
				)
					throw new Error(
						'Unexpected billing period: '.concat(
							mainPlan.billingPeriod,
						),
					);
				return suggestedAmountsLookup[currencyISO][
					mainPlan.billingPeriod
				](currentAmount);
			}
			var suggestedAmountsLookup = {
				GBP: {
					month: function getGbpMonthly(amount) {
						if (amount <= 3) return [5, 7, 12];
						if (amount <= 8) return [10, 12, 15];
						if (9 === amount) return [12, 15, 17];
						if (amount <= 13) return [15, 17, 20];
						if (amount <= 23) return [25, 27, 30];
						if (amount <= 23) return [25, 27, 30];
						if (amount <= 28) return [30, 32, 35];
						if (29 === amount) return [35, 37, 40];
						return amount <= 35
							? [40, 42, 45]
							: getSupporterPlusSuggestedAmountsMonthly(amount);
					},
					year: function getGbpAnnual(amount) {
						if (amount <= 11) return [20, 30, 120];
						if (amount <= 13) return [25, 40, 120];
						if (amount <= 16) return [30, 40, 120];
						if (amount <= 18) return [35, 40, 120];
						if (19 === amount) return [40, 50, 120];
						if (amount <= 50) return [60, 70, 120];
						if (amount <= 59) return [70, 80, 120];
						if (amount <= 59) return [70, 80, 120];
						if (amount <= 69) return [80, 90, 120];
						if (amount <= 89) return [95, 110, 120];
						if (amount <= 94) return [95, 130, 140];
						if (amount <= 100) return [120, 130, 140];
						if (amount <= 119) return [150, 160, 170];
						return amount <= 140
							? [240, 250, 260]
							: getSupporterPlusSuggestedAmountsAnnual(amount);
					},
				},
				USD: { month: getUsdMonthly, year: getUsdAnnual },
				EUR: {
					month: function getEuroMonthly(amount) {
						if (amount <= 4) return [6, 8, 12];
						if (amount <= 8) return [10, 12, 15];
						if (9 === amount) return [15, 17, 20];
						if (amount <= 18) return [20, 22, 25];
						if (amount <= 28) return [30, 32, 35];
						if (29 === amount) return [35, 37, 40];
						return amount <= 35
							? [40, 42, 45]
							: getSupporterPlusSuggestedAmountsMonthly(amount);
					},
					year: function getEuroAnnual(amount) {
						if (amount <= 11) return [20, 30, 95];
						if (amount <= 14) return [25, 30, 95];
						if (amount <= 19) return [30, 40, 95];
						if (amount <= 44) return [60, 70, 95];
						if (amount <= 49) return [75, 80, 95];
						if (amount <= 89) return [95, 110, 120];
						if (amount <= 99) return [120, 130, 140];
						if (amount <= 119) return [150, 160, 170];
						if (amount <= 149) return [240, 250, 260];
						return amount <= 150
							? [250, 260, 270]
							: getSupporterPlusSuggestedAmountsAnnual(amount);
					},
				},
				AUD: { month: getAusMonthly, year: getAusAnnual },
				NZD: { month: getAusMonthly, year: getAusAnnual },
				CAD: { month: getUsdMonthly, year: getUsdAnnual },
				international: { month: getUsdMonthly, year: getUsdAnnual },
			};
			function getUsdMonthly(amount) {
				return amount <= 4
					? [5, 7, 15]
					: amount <= 8
					? [10, 13, 15]
					: 9 === amount
					? [13, 15, 17]
					: amount <= 18
					? [20, 22, 25]
					: amount <= 23
					? [25, 27, 30]
					: amount <= 28
					? [30, 32, 35]
					: 29 === amount
					? [35, 37, 40]
					: amount <= 35
					? [40, 42, 45]
					: getSupporterPlusSuggestedAmountsMonthly(amount);
			}
			function getUsdAnnual(amount) {
				return amount <= 10
					? [20, 30, 150]
					: amount <= 20
					? [40, 50, 150]
					: amount <= 30
					? [50, 60, 150]
					: amount <= 39
					? [60, 70, 150]
					: amount <= 50
					? [75, 80, 150]
					: amount <= 55
					? [80, 90, 150]
					: amount <= 59
					? [90, 100, 150]
					: amount <= 70
					? [100, 110, 150]
					: amount <= 89
					? [120, 130, 150]
					: amount <= 99
					? [130, 140, 150]
					: amount <= 114
					? [150, 160, 170]
					: amount <= 119
					? [160, 170, 180]
					: amount <= 139
					? [180, 190, 200]
					: amount <= 150
					? [200, 210, 220]
					: getSupporterPlusSuggestedAmountsAnnual(amount);
			}
			function getAusMonthly(amount) {
				return amount <= 9
					? [15, 17, 20]
					: amount <= 18
					? [20, 22, 25]
					: amount <= 27
					? [30, 32, 35]
					: amount <= 29
					? [35, 37, 40]
					: amount <= 35
					? [40, 42, 45]
					: amount <= 39
					? [45, 47, 50]
					: amount <= 45
					? [50, 52, 55]
					: amount <= 50
					? [60, 62, 65]
					: getSupporterPlusSuggestedAmountsMonthly(amount);
			}
			function getAusAnnual(amount) {
				return amount <= 19
					? [40, 50, 200]
					: amount <= 29
					? [50, 60, 200]
					: amount <= 44
					? [60, 70, 200]
					: amount <= 49
					? [70, 80, 200]
					: amount <= 69
					? [80, 90, 200]
					: amount <= 79
					? [100, 110, 200]
					: amount <= 151
					? [160, 170, 200]
					: amount <= 169
					? [180, 190, 200]
					: amount <= 179
					? [200, 210, 220]
					: amount <= 190
					? [230, 240, 250]
					: amount <= 199
					? [250, 260, 270]
					: amount <= 250
					? [300, 310, 320]
					: getSupporterPlusSuggestedAmountsAnnual(amount);
			}
			function getSupporterPlusSuggestedAmountsFromMainPlan(mainPlan) {
				var currentAmount = mainPlan.price / 100;
				return 'month' === mainPlan.billingPeriod
					? getSupporterPlusSuggestedAmountsMonthly(currentAmount)
					: getSupporterPlusSuggestedAmountsAnnual(currentAmount);
			}
			function getSupporterPlusSuggestedAmountsMonthly(currentAmount) {
				var firstValue = currentAmount + 2,
					secondValue = 5 * Math.ceil((firstValue + 1) / 5);
				return [firstValue, secondValue, secondValue + 5];
			}
			function getSupporterPlusSuggestedAmountsAnnual(currentAmount) {
				return [1.1, 1.25, 1.5].map(
					(p) => 5 * Math.round((currentAmount * p) / 5),
				);
			}
		},
		'./client/utilities/pricingConfig/supporterPlusPricing.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				F: () => supporterPlusPriceConfigByCountryGroup,
				s: () => getBenefitsThreshold,
			});
			var supporterPlusPriceConfigByCountryGroup = {
				GBP: {
					month: { minAmount: 12, maxAmount: 166 },
					year: { minAmount: 120, maxAmount: 2e3 },
				},
				USD: {
					month: { minAmount: 15, maxAmount: 800 },
					year: { minAmount: 150, maxAmount: 1e4 },
				},
				EUR: {
					month: { minAmount: 12, maxAmount: 166 },
					year: { minAmount: 120, maxAmount: 2e3 },
				},
				AUD: {
					month: { minAmount: 20, maxAmount: 200 },
					year: { minAmount: 200, maxAmount: 2e3 },
				},
				NZD: {
					month: { minAmount: 20, maxAmount: 200 },
					year: { minAmount: 200, maxAmount: 2e3 },
				},
				CAD: {
					month: { minAmount: 15, maxAmount: 166 },
					year: { minAmount: 150, maxAmount: 2e3 },
				},
				international: {
					month: { minAmount: 15, maxAmount: 166 },
					year: { minAmount: 150, maxAmount: 2e3 },
				},
			};
			function getBenefitsThreshold(currency, billingPeriod) {
				var _supporterPlusPriceCo;
				return (
					null !==
						(_supporterPlusPriceCo =
							supporterPlusPriceConfigByCountryGroup[currency]) &&
					void 0 !== _supporterPlusPriceCo
						? _supporterPlusPriceCo
						: supporterPlusPriceConfigByCountryGroup.international
				)[billingPeriod].minAmount;
			}
		},
		'./client/components/mma/accountoverview/ManageProduct.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					Contribution: () => Contribution,
					DigitalSubscription: () => DigitalSubscription,
					GuardianAdLite: () => GuardianAdLite,
					GuardianWeekly: () => GuardianWeekly,
					NewspaperDeliverySunday: () => NewspaperDeliverySunday,
					NewspaperSubscriptionCard: () => NewspaperSubscriptionCard,
					SupporterPlus: () => SupporterPlus,
					SupporterPlusAllAccessDigital: () =>
						SupporterPlusAllAccessDigital,
					TierThree: () => TierThree,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => ManageProduct_stories,
				});
			var ReactRouterDecorator = __webpack_require__(
					'./.storybook/ReactRouterDecorator.tsx',
				),
				featureSwitches = __webpack_require__(
					'./shared/featureSwitches.ts',
				),
				productTypes = __webpack_require__('./shared/productTypes.ts'),
				testProducts = __webpack_require__(
					'./client/fixtures/productBuilder/testProducts.ts',
				),
				emotion_react_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
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
				space = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
				),
				react = __webpack_require__('./node_modules/react/index.js'),
				react_router_dom = __webpack_require__(
					'./node_modules/react-router-dom/index.js',
				),
				react_router = __webpack_require__(
					'./node_modules/react-router/index.js',
				),
				dates = __webpack_require__('./shared/dates.ts'),
				productResponse = __webpack_require__(
					'./shared/productResponse.ts',
				),
				useAsyncLoader = __webpack_require__(
					'./client/utilities/hooks/useAsyncLoader.ts',
				),
				productUtils = __webpack_require__(
					'./client/utilities/productUtils.ts',
				),
				CallCenterEmailAndNumbers = __webpack_require__(
					'./client/components/shared/CallCenterEmailAndNumbers.tsx',
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
				DeliveryAddressDisplay = __webpack_require__(
					'./client/components/mma/delivery/address/DeliveryAddressDisplay.tsx',
				),
				Page = __webpack_require__('./client/components/mma/Page.tsx'),
				ErrorIcon = __webpack_require__(
					'./client/components/mma/shared/assets/ErrorIcon.tsx',
				),
				GiftIcon = __webpack_require__(
					'./client/components/mma/shared/assets/GiftIcon.tsx',
				),
				DefaultApiResponseHandler = __webpack_require__(
					'./client/components/mma/shared/asyncComponents/DefaultApiResponseHandler.tsx',
				),
				DefaultLoadingView = __webpack_require__(
					'./client/components/mma/shared/asyncComponents/DefaultLoadingView.tsx',
				),
				BasicProductInfoTable = __webpack_require__(
					'./client/components/mma/shared/BasicProductInfoTable.tsx',
				),
				Buttons = __webpack_require__(
					'./client/components/mma/shared/Buttons.tsx',
				),
				NextPaymentDetails = __webpack_require__(
					'./client/components/mma/shared/NextPaymentDetails.tsx',
				),
				PaymentDetailsTable = __webpack_require__(
					'./client/components/mma/shared/PaymentDetailsTable.tsx',
				),
				PaymentFailureAlertIfApplicable = __webpack_require__(
					'./client/components/mma/shared/PaymentFailureAlertIfApplicable.tsx',
				),
				ProductDescriptionListTable = __webpack_require__(
					'./client/components/mma/shared/ProductDescriptionListTable.tsx',
				),
				Checkbox = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/checkbox/Checkbox.js',
				),
				Button = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/button/Button.js',
				),
				esm = __webpack_require__(
					'./node_modules/@sentry/minimal/esm/index.js',
				),
				analytics = __webpack_require__(
					'./client/utilities/analytics.ts',
				),
				DeliveryAddressConfirmation = __webpack_require__(
					'./client/components/mma/delivery/address/DeliveryAddressConfirmation.tsx',
				),
				idapi_newsletters = __webpack_require__(
					'./client/components/mma/identity/idapi/newsletters.ts',
				),
				newsletterSubscriptions = __webpack_require__(
					'./client/components/mma/identity/idapi/newsletterSubscriptions.ts',
				),
				identity = __webpack_require__(
					'./client/components/mma/identity/identity.ts',
				),
				emotion_react_jsx_runtime_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				),
				ClockIcon = (props) =>
					(0, emotion_react_jsx_runtime_browser_esm.tZ)('svg', {
						width: '13',
						height: '13',
						viewBox: '0 0 13 13',
						fill: 'none',
						css: props.additionalCss,
						children: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							'path',
							{
								d: 'M6.5 0C2.91015 0 0 2.91017 0 6.5C0 10.0898 2.91015 13 6.5 13C10.0899 13 13 10.0898 13 6.5C13 2.91017 10.0899 0 6.5 0ZM6.5 2.40741C6.76592 2.40741 6.98148 2.62297 6.98148 2.88889V6.22166L9.44907 7.65103C9.67934 7.78401 9.76259 8.07526 9.62963 8.30556C9.49667 8.53585 9.19791 8.61156 8.96759 8.4786C8.06612 7.95764 7.15701 7.43213 6.25926 6.91379C6.11556 6.83047 6.01852 6.67805 6.01852 6.5V2.88889C6.01852 2.62297 6.23408 2.40741 6.5 2.40741Z',
								fill: '#333333',
							},
						),
					});
			try {
				(ClockIcon.displayName = 'ClockIcon'),
					(ClockIcon.__docgenInfo = {
						description: '',
						displayName: 'ClockIcon',
						props: {
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
							'client/components/mma/shared/assets/ClockIcon.tsx#ClockIcon'
						] = {
							docgenInfo: ClockIcon.__docgenInfo,
							name: 'ClockIcon',
							path: 'client/components/mma/shared/assets/ClockIcon.tsx#ClockIcon',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var TickIcon = __webpack_require__(
					'./client/components/mma/shared/assets/TickIcon.tsx',
				),
				ProblemAlert = __webpack_require__(
					'./client/components/mma/shared/ProblemAlert.tsx',
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
			var _ref3 = { name: '1efi8gv', styles: 'font-weight:bold' },
				NewsletterOptinSection = (props) => {
					var [showUpdateMsg, setShowUpdateMsg] = (0, react.useState)(
							!1,
						),
						[newsletters, setNewsletters] = (0, react.useState)(),
						[focusedNewsletter, setFocusedNewsletter] = (0,
						react.useState)(),
						[
							newslettersPendingChange,
							setNewslettersPendingChange,
						] = (0, react.useState)([]);
					if (
						((0, react.useEffect)(() => {
							var makeRestrictedNewslettersAPICall =
								(function () {
									var _ref4 = (function _asyncToGenerator(
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
									})(function* () {
										try {
											var [
													restrictedNewsletters,
													subscribedNewsletters,
												] = yield Promise.all([
													idapi_newsletters.me(),
													newsletterSubscriptions.i(),
												]),
												mappedFilteredNewsletters =
													restrictedNewsletters
														.filter((newsletter) =>
															props.activeNewletterIDs.includes(
																newsletter.id,
															),
														)
														.map(
															(
																filteredRestrictedNewsletter,
															) =>
																_objectSpread(
																	_objectSpread(
																		{},
																		filteredRestrictedNewsletter,
																	),
																	{},
																	{
																		subscribed:
																			subscribedNewsletters.includes(
																				filteredRestrictedNewsletter.id,
																			),
																	},
																),
														);
											setNewsletters(
												mappedFilteredNewsletters,
											);
										} catch (_unused) {
											esm.Tb(
												'Failed to load either newsletters/restricted or users/me/newsletters or both',
											);
										}
									});
									return function makeRestrictedNewslettersAPICall() {
										return _ref4.apply(this, arguments);
									};
								})();
							props.activeNewletterIDs.length > 0 &&
								makeRestrictedNewslettersAPICall();
						}, [props.activeNewletterIDs]),
						null != newsletters && newsletters.length)
					) {
						var checkboxChangeHandler = (event) => {
								var targetNewsletter = newsletters.find(
									(newsletterSearch) =>
										newsletterSearch.id ===
										event.target.value,
								);
								targetNewsletter &&
									(setFocusedNewsletter(
										_objectSpread(
											_objectSpread({}, targetNewsletter),
											{},
											{
												subscribed:
													event.target.checked,
											},
										),
									),
									setNewsletters(
										newsletters.map((newsletterMap) =>
											newsletterMap.id ===
											targetNewsletter.id
												? _objectSpread(
														_objectSpread(
															{},
															targetNewsletter,
														),
														{},
														{
															subscribed:
																event.target
																	.checked,
														},
												  )
												: newsletterMap,
										),
									),
									setNewslettersPendingChange(
										newslettersPendingChange.includes(
											targetNewsletter.id,
										)
											? newslettersPendingChange
											: [
													...newslettersPendingChange,
													targetNewsletter.id,
											  ],
									)),
									setShowUpdateMsg(!1);
							},
							formSubmissionHandler = (event) => {
								(event.preventDefault(), focusedNewsletter) &&
									(focusedNewsletter.subscribed
										? identity.zZ.subscribe(
												focusedNewsletter,
										  )
										: identity.zZ.unsubscribe(
												focusedNewsletter,
										  )
									).then(
										() => {
											setShowUpdateMsg({
												isSuccessful: !0,
											}),
												setNewslettersPendingChange(
													newslettersPendingChange.filter(
														(
															newsletterPendingChange,
														) =>
															newsletterPendingChange !==
															focusedNewsletter.id,
													),
												),
												(0, analytics.L9)({
													eventCategory:
														'newsletter_preference_update',
													eventAction:
														'newsletter_preference_update_success',
													eventLabel:
														focusedNewsletter.subscribed
															? 'newsletter_optin_'.concat(
																	focusedNewsletter.id,
															  )
															: 'newsletter_optout_'.concat(
																	focusedNewsletter.id,
															  ),
												});
										},
										() => {
											setShowUpdateMsg({
												isSuccessful: !1,
											}),
												setNewsletters(
													newsletters.map(
														(newsletterMap) =>
															newsletterMap.id ===
															focusedNewsletter.id
																? _objectSpread(
																		_objectSpread(
																			{},
																			focusedNewsletter,
																		),
																		{},
																		{
																			subscribed:
																				!focusedNewsletter.subscribed,
																		},
																  )
																: newsletterMap,
													),
												),
												(0, analytics.L9)({
													eventCategory:
														'newsletter_preference_update',
													eventAction:
														'newsletter_preference_update_error',
													eventLabel:
														'newsletter_preference_update_error_'.concat(
															focusedNewsletter.id,
														),
												});
										},
									);
							};
						return (0, emotion_react_jsx_runtime_browser_esm.BX)(
							emotion_react_jsx_runtime_browser_esm.HY,
							{
								children: [
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
											children: 'Front Page Newsletter',
										},
									),
									newsletters.map((newsletter) =>
										(0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											react.Fragment,
											{
												children: [
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
																newsletter.description,
														},
													),
													showUpdateMsg &&
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															UpdateMessage,
															{
																updateStatus:
																	showUpdateMsg,
															},
														),
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'form',
														{
															onSubmit:
																formSubmissionHandler,
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'fieldset',
																	{
																		css: (0,
																		emotion_react_browser_esm.iv)(
																			'padding:',
																			space
																				.D[3],
																			'px ',
																			space
																				.D[5],
																			'px;border:1px solid ',
																			palette
																				.palette
																				.neutral[86],
																			';margin-bottom:',
																			space
																				.D[5],
																			'px;',
																			'',
																		),
																		children:
																			(0,
																			emotion_react_jsx_runtime_browser_esm.tZ)(
																				Checkbox.X,
																				{
																					value: newsletter.id,
																					label: (0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						CheckboxLabel,
																						{
																							title: newsletter.name,
																							frequency:
																								newsletter.frequency,
																						},
																					),
																					checked:
																						newsletter.subscribed,
																					cssOverrides:
																						_ref3,
																					onChange:
																						checkboxChangeHandler,
																				},
																			),
																	},
																),
																newslettersPendingChange.includes(
																	newsletter.id,
																) &&
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		Button.z,
																		{
																			icon: (0,
																			emotion_react_jsx_runtime_browser_esm.tZ)(
																				TickIcon.Y,
																				{},
																			),
																			type: 'submit',
																			children:
																				'Confirm preferences',
																		},
																	),
															],
														},
													),
												],
											},
											newsletter.id,
										),
									),
								],
							},
						);
					}
					return null;
				},
				UpdateMessage = (props) =>
					props.updateStatus.isSuccessful
						? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
								DeliveryAddressConfirmation.k,
								{
									additionalCss: (0,
									emotion_react_browser_esm.iv)(
										'margin-bottom:',
										space.D[5],
										'px;',
										'',
									),
									message:
										'Your newsletter preferences have been updated',
								},
						  )
						: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
								ProblemAlert.i,
								{
									title: 'Something went wrong',
									message:
										"We couldn't update your preferences. Please try again later",
									additionalcss: (0,
									emotion_react_browser_esm.iv)(
										'margin-bottom:',
										space.D[5],
										'px;',
										'',
									),
								},
						  ),
				_ref = { name: 'bpd7z7', styles: 'margin-bottom:2px' },
				_ref2 = {
					name: 's5xdrg',
					styles: 'display:flex;align-items:center',
				},
				CheckboxLabel = (props) =>
					(0, emotion_react_jsx_runtime_browser_esm.BX)('div', {
						css: _ref2,
						children: [
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								'strong',
								{
									css: (0, emotion_react_browser_esm.iv)(
										'margin-right:',
										space.D[9],
										'px;',
										'',
									),
									children: props.title,
								},
							),
							props.frequency &&
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									emotion_react_jsx_runtime_browser_esm.HY,
									{
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												ClockIcon,
												{ additionalCss: _ref },
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'span',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														'margin-left:',
														space.D[1],
														'px;',
														'',
													),
													children: props.frequency,
												},
											),
										],
									},
								),
						],
					});
			try {
				(NewsletterOptinSection.displayName = 'NewsletterOptinSection'),
					(NewsletterOptinSection.__docgenInfo = {
						description: '',
						displayName: 'NewsletterOptinSection',
						props: {
							activeNewletterIDs: {
								defaultValue: null,
								description: '',
								name: 'activeNewletterIDs',
								required: !0,
								type: { name: 'string[]' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/accountoverview/NewsletterOptinSection.tsx#NewsletterOptinSection'
						] = {
							docgenInfo: NewsletterOptinSection.__docgenInfo,
							name: 'NewsletterOptinSection',
							path: 'client/components/mma/accountoverview/NewsletterOptinSection.tsx#NewsletterOptinSection',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var SixForSixExplainer = __webpack_require__(
					'./client/components/mma/accountoverview/SixForSixExplainer.tsx',
				),
				lodash = __webpack_require__('./node_modules/lodash/lodash.js'),
				ContributionUpdateAmountForm = __webpack_require__(
					'./client/components/mma/accountoverview/updateAmount/ContributionUpdateAmountForm.tsx',
				),
				InlineError = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/user-feedback/InlineError.js',
				),
				ChoiceCardGroup = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/choice-card/ChoiceCardGroup.js',
				),
				ChoiceCard = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/choice-card/ChoiceCard.js',
				),
				TextInput = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/text-input/TextInput.js',
				),
				theme_reader_revenue = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/button/theme-reader-revenue.js',
				),
				SvgInfoRound = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgInfoRound.js',
				),
				Link = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/link/Link.js',
				),
				fetch = __webpack_require__('./client/utilities/fetch.ts'),
				suggestedAmounts = __webpack_require__(
					'./client/utilities/pricingConfig/suggestedAmounts.ts',
				),
				supporterPlusPricing = __webpack_require__(
					'./client/utilities/pricingConfig/supporterPlusPricing.ts',
				);
			function SupporterPlusUpdateAmountForm_asyncGeneratorStep(
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
			var smallPrintCss = (0, emotion_react_browser_esm.iv)(
					typography.AjP,
					';margin-top:0;margin-bottom:0;color:#606060;>a{color:inherit;text-decoration:underline;}&+&{margin-top:',
					space.D[1],
					'px;}',
					'',
				),
				buttonContainerCss = (0, emotion_react_browser_esm.iv)(
					mq.C4.tablet,
					'{display:flex;flex-direction:column;}',
					'',
				),
				buttonCentredCss = {
					name: 'f7ay7b',
					styles: 'justify-content:center',
				};
			function validateChoice(
				currentAmount,
				chosenAmount,
				minAmount,
				maxAmount,
				isOtherAmountSelected,
				mainPlan,
			) {
				var chosenOptionNum = Number(chosenAmount),
					monthlyOrAnnual = (0, productTypes.xm)(
						mainPlan.billingPeriod,
					).toLocaleLowerCase();
				return chosenAmount || isOtherAmountSelected
					? chosenOptionNum === currentAmount
						? 'You have selected the same amount as you currently pay'
						: !chosenAmount || isNaN(chosenOptionNum)
						? 'There is a problem with the amount you have selected, please make sure it is a valid amount'
						: !isNaN(chosenOptionNum) && chosenOptionNum < minAmount
						? ''
								.concat(mainPlan.currency)
								.concat(minAmount, ' per ')
								.concat(mainPlan.billingPeriod, ' is the ')
								.concat(
									currentAmount < minAmount ? 'new ' : '',
									'minimum payment to receive this subscription. Please call our customer service team to lower your ',
								)
								.concat(monthlyOrAnnual, ' amount below ')
								.concat(mainPlan.currency)
								.concat(minAmount, ' via the Help Centre')
						: !isNaN(chosenOptionNum) && chosenOptionNum > maxAmount
						? 'There is a maximum '
								.concat(mainPlan.billingPeriod, 'ly amount of ')
								.concat(mainPlan.currency)
								.concat(maxAmount, ' ')
								.concat(mainPlan.currencyISO)
						: null
					: 'Please make a selection';
			}
			var SupporterPlusUpdateAmountForm_ref = {
					name: 'vavmm1',
					styles: 'max-width:500px',
				},
				SupporterPlusUpdateAmountForm_ref2 = {
					name: 'fgqxph',
					styles: 'font-weight:bold;display:inline-block',
				},
				SupporterPlusUpdateAmountForm = (props) => {
					var priceConfig = (supporterPlusPricing.F[
							props.mainPlan.currencyISO
						] || supporterPlusPricing.F.international)[
							props.mainPlan.billingPeriod
						],
						currentAmountIsBelowNewMin =
							props.currentAmount < priceConfig.minAmount,
						minPriceDisplay = ''
							.concat(props.mainPlan.currency)
							.concat(priceConfig.minAmount),
						monthlyOrAnnual = (0, productTypes.xm)(
							props.mainPlan.billingPeriod,
						),
						defaultOtherAmount = priceConfig.minAmount,
						[otherAmount, setOtherAmount] = (0, react.useState)(
							defaultOtherAmount,
						),
						[isOtherAmountSelected, setIsOtherAmountSelected] = (0,
						react.useState)(!1),
						[
							hasInteractedWithOtherAmount,
							setHasInteractedWithOtherAmount,
						] = (0, react.useState)(!1),
						[selectedValue, setSelectedValue] = (0, react.useState)(
							null,
						),
						[errorMessage, setErrorMessage] = (0, react.useState)(
							null,
						),
						[hasSubmitted, setHasSubmitted] = (0, react.useState)(
							!1,
						),
						[showUpdateLoader, setShowUpdateLoader] = (0,
						react.useState)(!1),
						[updateFailed, setUpdateFailedStatus] = (0,
						react.useState)(!1),
						[confirmedAmount, setConfirmedAmount] = (0,
						react.useState)(null),
						chosenAmount = isOtherAmountSelected
							? otherAmount
							: selectedValue;
					(0, react.useEffect)(() => {
						otherAmount !== defaultOtherAmount &&
							setHasInteractedWithOtherAmount(!0);
					}, [otherAmount, defaultOtherAmount]),
						(0, react.useEffect)(() => {
							var newErrorMessage = validateChoice(
								props.currentAmount,
								chosenAmount,
								priceConfig.minAmount,
								priceConfig.maxAmount,
								isOtherAmountSelected,
								props.mainPlan,
							);
							setErrorMessage(newErrorMessage);
						}, [
							otherAmount,
							selectedValue,
							chosenAmount,
							isOtherAmountSelected,
							priceConfig.minAmount,
							priceConfig.maxAmount,
							props.currentAmount,
							props.mainPlan,
						]),
						(0, react.useEffect)(() => {
							confirmedAmount &&
								props.onUpdateConfirmed(confirmedAmount);
						}, [confirmedAmount, props]);
					var pendingAmount = Number(
							isOtherAmountSelected ? otherAmount : selectedValue,
						),
						amountLabel = (amount) =>
							''
								.concat(props.mainPlan.currency)
								.concat(amount, ' a ')
								.concat(props.mainPlan.billingPeriod),
						shouldShowSelectedAmountErrorMessage =
							!isOtherAmountSelected &&
							(selectedValue || hasSubmitted),
						shouldShowOtherAmountErrorMessage =
							hasInteractedWithOtherAmount || hasSubmitted,
						otherAmountLabel = 'Other amount ('.concat(
							props.mainPlan.currency,
							')',
						),
						changeAmountClick = (function () {
							var _ref3 =
								(function SupporterPlusUpdateAmountForm_asyncToGenerator(
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
												SupporterPlusUpdateAmountForm_asyncGeneratorStep(
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
												SupporterPlusUpdateAmountForm_asyncGeneratorStep(
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
									setHasSubmitted(!0);
									var newErrorMessage = validateChoice(
										props.currentAmount,
										chosenAmount,
										priceConfig.minAmount,
										priceConfig.maxAmount,
										isOtherAmountSelected,
										props.mainPlan,
									);
									if (newErrorMessage)
										setErrorMessage(newErrorMessage);
									else {
										setShowUpdateLoader(!0);
										var newAmount,
											subscriptionName,
											isTestUser,
											response = yield ((newAmount =
												pendingAmount),
											(subscriptionName =
												props.subscriptionId),
											(isTestUser = props.isTestUser),
											(0, fetch.n4)(
												'/api/update-supporter-plus-amount/'.concat(
													subscriptionName,
												),
												{
													method: 'POST',
													body: JSON.stringify({
														newPaymentAmount:
															newAmount,
													}),
													headers: {
														[productResponse.l2]:
															''.concat(
																isTestUser,
															),
													},
												},
											));
										try {
											null ===
												(yield (0,
												DefaultApiResponseHandler.xJ)(
													response,
												)) &&
												(setUpdateFailedStatus(!0),
												setShowUpdateLoader(!1)),
												setConfirmedAmount(
													pendingAmount,
												);
										} catch (_unused) {
											setUpdateFailedStatus(!0),
												setShowUpdateLoader(!1);
										}
									}
								});
							return function changeAmountClick() {
								return _ref3.apply(this, arguments);
							};
						})();
					return showUpdateLoader
						? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
								DefaultLoadingView.I,
								{ loadingMessage: 'Updating...' },
						  )
						: (0, emotion_react_jsx_runtime_browser_esm.BX)(
								emotion_react_jsx_runtime_browser_esm.HY,
								{
									children: [
										updateFailed &&
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												InlineError.b,
												{
													children:
														'Updating failed this time. Please try again later...',
												},
											),
										(0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											'div',
											{
												css: (0,
												emotion_react_browser_esm.iv)(
													'border:1px solid ',
													palette.palette.neutral[20],
													';margin-bottom:',
													space.D[5],
													'px;',
													'',
												),
												children: [
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'dl',
														{
															css: (0,
															emotion_react_browser_esm.iv)(
																'padding:',
																space.D[3],
																'px ',
																space.D[5],
																'px;margin:0;border-bottom:1px solid ',
																palette.palette
																	.neutral[20],
																';',
																typography.Kz0,
																';',
																'',
															),
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'dt',
																	{
																		css: SupporterPlusUpdateAmountForm_ref2,
																		children:
																			'Current amount',
																	},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'dd',
																	{
																		css: (0,
																		emotion_react_browser_esm.iv)(
																			'margin-left:',
																			space
																				.D[4],
																			'px;display:inline-block;',
																			'',
																		),
																		children:
																			''
																				.concat(
																					props
																						.mainPlan
																						.currency,
																				)
																				.concat(
																					props.currentAmount.toFixed(
																						2,
																					),
																					' ',
																				)
																				.concat(
																					props
																						.mainPlan
																						.currencyISO,
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
																typography.Kz0,
																';padding:',
																space.D[3],
																'px ',
																space.D[5],
																'px;',
																'',
															),
															children: [
																shouldShowSelectedAmountErrorMessage &&
																	errorMessage &&
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		InlineError.b,
																		{
																			children:
																				errorMessage,
																		},
																	),
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'div',
																	{
																		css: SupporterPlusUpdateAmountForm_ref,
																		children:
																			[
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					ChoiceCardGroup.Y,
																					{
																						name: 'amounts',
																						'data-cy':
																							'supporter-plus-amount-choices',
																						label: 'Choose your new amount',
																						columns: 2,
																						children:
																							(0,
																							emotion_react_jsx_runtime_browser_esm.BX)(
																								emotion_react_jsx_runtime_browser_esm.HY,
																								{
																									children:
																										[
																											(0,
																											suggestedAmounts.uq)(
																												props.mainPlan,
																											).map(
																												(
																													amount,
																													index,
																												) =>
																													(0,
																													emotion_react_jsx_runtime_browser_esm.tZ)(
																														ChoiceCard.f,
																														{
																															id: 'amount-'.concat(
																																amount,
																															),
																															value: amount.toString(),
																															label: amountLabel(
																																amount,
																															),
																															checked:
																																selectedValue ===
																																amount,
																															onChange:
																																() => {
																																	setSelectedValue(
																																		amount,
																																	),
																																		setIsOtherAmountSelected(
																																			!1,
																																		);
																																},
																														},
																														'sp-amount-'
																															.concat(
																																amount,
																																'-index-',
																															)
																															.concat(
																																index,
																															),
																													),
																											),
																											(0,
																											emotion_react_jsx_runtime_browser_esm.tZ)(
																												ChoiceCard.f,
																												{
																													id: 'amount-other',
																													value: 'Other',
																													label: 'Other',
																													checked:
																														isOtherAmountSelected,
																													onChange:
																														() => {
																															setIsOtherAmountSelected(
																																!0,
																															),
																																setSelectedValue(
																																	null,
																																);
																														},
																												},
																											),
																										],
																								},
																							),
																					},
																				),
																				isOtherAmountSelected &&
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						'div',
																						{
																							css: (0,
																							emotion_react_browser_esm.iv)(
																								'margin-top:',
																								space
																									.D[3],
																								'px;',
																								'',
																							),
																							children:
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									TextInput.o,
																									{
																										label: otherAmountLabel,
																										error:
																											(shouldShowOtherAmountErrorMessage &&
																												errorMessage) ||
																											void 0,
																										type: 'number',
																										value:
																											(null ==
																											otherAmount
																												? void 0
																												: otherAmount.toString()) ||
																											'',
																										onChange:
																											(
																												event,
																											) =>
																												setOtherAmount(
																													event
																														.target
																														.value
																														? Number(
																																event
																																	.target
																																	.value,
																														  )
																														: null,
																												),
																									},
																								),
																						},
																					),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					'section',
																					{
																						css: [
																							(0,
																							emotion_react_browser_esm.iv)(
																								'margin-top:',
																								space
																									.D[5],
																								'px;',
																								'',
																							),
																							buttonContainerCss,
																							'',
																							'',
																						],
																						children:
																							(0,
																							emotion_react_jsx_runtime_browser_esm.tZ)(
																								Button.z,
																								{
																									theme: theme_reader_revenue.gk,
																									cssOverrides:
																										buttonCentredCss,
																									onClick:
																										changeAmountClick,
																									size: 'small',
																									children:
																										'Change amount',
																								},
																							),
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.BX)(
																					'div',
																					{
																						css: (0,
																						emotion_react_browser_esm.iv)(
																							'margin-top:',
																							space
																								.D[3],
																							'px;display:flex;align-items:flex-start;>svg{flex-shrink:0;margin-right:8px;fill:',
																							palette
																								.palette
																								.brand[500],
																							';}',
																							'',
																						),
																						children:
																							[
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									SvgInfoRound.r,
																									{
																										isAnnouncedByScreenReader:
																											!0,
																										size: 'medium',
																									},
																								),
																								(0,
																								emotion_react_jsx_runtime_browser_esm.BX)(
																									'p',
																									{
																										children:
																											[
																												'If you would like to',
																												' ',
																												currentAmountIsBelowNewMin
																													? 'change'
																													: 'lower',
																												' ',
																												'your ',
																												monthlyOrAnnual.toLowerCase(),
																												' amount below ',
																												minPriceDisplay,
																												' please call us via the',
																												' ',
																												(0,
																												emotion_react_jsx_runtime_browser_esm.tZ)(
																													Link.r,
																													{
																														href: '/help-centre#call-us',
																														children:
																															'Help Centre',
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
																					'p',
																					{
																						css: smallPrintCss,
																						children:
																							[
																								minPriceDisplay,
																								' per ',
																								props
																									.mainPlan
																									.billingPeriod,
																								' ',
																								'is the ',
																								currentAmountIsBelowNewMin
																									? 'new '
																									: '',
																								'minimum payment to receive this subscription.',
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
									],
								},
						  );
				};
			try {
				(SupporterPlusUpdateAmountForm.displayName =
					'SupporterPlusUpdateAmountForm'),
					(SupporterPlusUpdateAmountForm.__docgenInfo = {
						description: '',
						displayName: 'SupporterPlusUpdateAmountForm',
						props: {
							subscriptionId: {
								defaultValue: null,
								description: '',
								name: 'subscriptionId',
								required: !0,
								type: { name: 'string' },
							},
							mainPlan: {
								defaultValue: null,
								description: '',
								name: 'mainPlan',
								required: !0,
								type: { name: 'PaidSubscriptionPlan' },
							},
							currentAmount: {
								defaultValue: null,
								description: '',
								name: 'currentAmount',
								required: !0,
								type: { name: 'number' },
							},
							nextPaymentDate: {
								defaultValue: null,
								description: '',
								name: 'nextPaymentDate',
								required: !0,
								type: { name: 'string | null' },
							},
							onUpdateConfirmed: {
								defaultValue: null,
								description: '',
								name: 'onUpdateConfirmed',
								required: !0,
								type: {
									name: '(updatedAmount: number) => void',
								},
							},
							isTestUser: {
								defaultValue: null,
								description: '',
								name: 'isTestUser',
								required: !0,
								type: { name: 'boolean' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/accountoverview/updateAmount/SupporterPlusUpdateAmountForm.tsx#SupporterPlusUpdateAmountForm'
						] = {
							docgenInfo:
								SupporterPlusUpdateAmountForm.__docgenInfo,
							name: 'SupporterPlusUpdateAmountForm',
							path: 'client/components/mma/accountoverview/updateAmount/SupporterPlusUpdateAmountForm.tsx#SupporterPlusUpdateAmountForm',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			function UpdateAmount_ownKeys(e, r) {
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
			function UpdateAmount_objectSpread(e) {
				for (var r = 1; r < arguments.length; r++) {
					var t = null != arguments[r] ? arguments[r] : {};
					r % 2
						? UpdateAmount_ownKeys(Object(t), !0).forEach(function (
								r,
						  ) {
								UpdateAmount_defineProperty(e, r, t[r]);
						  })
						: Object.getOwnPropertyDescriptors
						? Object.defineProperties(
								e,
								Object.getOwnPropertyDescriptors(t),
						  )
						: UpdateAmount_ownKeys(Object(t)).forEach(function (r) {
								Object.defineProperty(
									e,
									r,
									Object.getOwnPropertyDescriptor(t, r),
								);
						  });
				}
				return e;
			}
			function UpdateAmount_defineProperty(obj, key, value) {
				return (
					(key = (function UpdateAmount_toPropertyKey(arg) {
						var key = (function UpdateAmount_toPrimitive(
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
			var UpdateAmount = (props) => {
				var Status = (function (Status) {
						return (
							(Status[(Status.OVERVIEW = 0)] = 'OVERVIEW'),
							(Status[(Status.EDITING = 1)] = 'EDITING'),
							(Status[(Status.CONFIRMED = 2)] = 'CONFIRMED'),
							Status
						);
					})({}),
					[status, setStatus] = (0, react.useState)(Status.OVERVIEW),
					[confirmedAmount, setConfirmedAmount] = (0, react.useState)(
						null,
					),
					mainPlan = props.mainPlan,
					currentAmount = confirmedAmount || mainPlan.price / 100;
				return status === Status.EDITING
					? 'supporterplus' === props.productType.productType
						? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
								SupporterPlusUpdateAmountForm,
								UpdateAmount_objectSpread(
									UpdateAmount_objectSpread({}, props),
									{},
									{
										currentAmount,
										onUpdateConfirmed: (updatedAmount) => {
											setConfirmedAmount(updatedAmount),
												setStatus(Status.CONFIRMED);
										},
									},
								),
						  )
						: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
								ContributionUpdateAmountForm.k,
								UpdateAmount_objectSpread(
									UpdateAmount_objectSpread({}, props),
									{},
									{
										currentAmount,
										mode: 'MANAGE',
										onUpdateConfirmed: (updatedAmount) => {
											setConfirmedAmount(updatedAmount),
												setStatus(Status.CONFIRMED);
										},
									},
								),
						  )
					: (0, emotion_react_jsx_runtime_browser_esm.BX)(
							emotion_react_jsx_runtime_browser_esm.HY,
							{
								children: [
									status === Status.CONFIRMED &&
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											DeliveryAddressConfirmation.k,
											{
												message:
													'We have successfully updated the amount of your support. '.concat(
														props.nextPaymentDate &&
															'This amount will be taken on '.concat(
																(0, dates.sG)(
																	props.nextPaymentDate,
																).dateStr(),
																'. ',
															),
														'Thank you for supporting the Guardian.',
													),
												additionalCss: (0,
												emotion_react_browser_esm.iv)(
													'margin-bottom:',
													space.D[5],
													'px;',
													'',
												),
											},
										),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										ProductDescriptionListTable.M,
										{
											borderColour:
												palette.palette.neutral[86],
											content: [
												{
													title: 'Supporter ID',
													value: props.subscriptionId,
												},
												{
													title: ''.concat(
														(0, lodash.capitalize)(
															(0,
															productResponse.tq)(
																props.mainPlan
																	.billingPeriod,
															),
														),
														' amount',
													),
													value: ''
														.concat(
															props.mainPlan
																.currency,
														)
														.concat(
															currentAmount.toFixed(
																2,
															),
															' ',
														)
														.concat(
															props.mainPlan
																.currencyISO,
														),
												},
											],
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										Buttons.z,
										{
											colour: palette.palette.brand[800],
											textColour:
												palette.palette.brand[400],
											fontWeight: 'bold',
											text: 'Change amount',
											onClick: () => {
												setStatus(Status.EDITING);
											},
										},
									),
								],
							},
					  );
			};
			try {
				(UpdateAmount.displayName = 'UpdateAmount'),
					(UpdateAmount.__docgenInfo = {
						description: '',
						displayName: 'UpdateAmount',
						props: {
							subscriptionId: {
								defaultValue: null,
								description: '',
								name: 'subscriptionId',
								required: !0,
								type: { name: 'string' },
							},
							mainPlan: {
								defaultValue: null,
								description: '',
								name: 'mainPlan',
								required: !0,
								type: { name: 'PaidSubscriptionPlan' },
							},
							productType: {
								defaultValue: null,
								description: '',
								name: 'productType',
								required: !0,
								type: { name: 'ProductType' },
							},
							nextPaymentDate: {
								defaultValue: null,
								description: '',
								name: 'nextPaymentDate',
								required: !0,
								type: { name: 'string | null' },
							},
							amountUpdateStateChange: {
								defaultValue: null,
								description: '',
								name: 'amountUpdateStateChange',
								required: !0,
								type: {
									name: 'Dispatch<SetStateAction<number | null>>',
								},
							},
							isTestUser: {
								defaultValue: null,
								description: '',
								name: 'isTestUser',
								required: !0,
								type: { name: 'boolean' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/accountoverview/updateAmount/UpdateAmount.tsx#UpdateAmount'
						] = {
							docgenInfo: UpdateAmount.__docgenInfo,
							name: 'UpdateAmount',
							path: 'client/components/mma/accountoverview/updateAmount/UpdateAmount.tsx#UpdateAmount',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			function ManageProduct_ownKeys(e, r) {
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
			function ManageProduct_objectSpread(e) {
				for (var r = 1; r < arguments.length; r++) {
					var t = null != arguments[r] ? arguments[r] : {};
					r % 2
						? ManageProduct_ownKeys(Object(t), !0).forEach(
								function (r) {
									ManageProduct_defineProperty(e, r, t[r]);
								},
						  )
						: Object.getOwnPropertyDescriptors
						? Object.defineProperties(
								e,
								Object.getOwnPropertyDescriptors(t),
						  )
						: ManageProduct_ownKeys(Object(t)).forEach(function (
								r,
						  ) {
								Object.defineProperty(
									e,
									r,
									Object.getOwnPropertyDescriptor(t, r),
								);
						  });
				}
				return e;
			}
			function ManageProduct_defineProperty(obj, key, value) {
				return (
					(key = (function ManageProduct_toPropertyKey(arg) {
						var key = (function ManageProduct_toPrimitive(
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
			var subHeadingTitleCss = '\n\t'
					.concat(typography.Hu7, ';\n    ')
					.concat(
						mq.C4.tablet,
						' {\n      font-size: 1.25rem;\n      line-height: 1.6;\n    };\n  ',
					),
				subHeadingBorderTopCss = '\n    border-top: 1px solid '
					.concat(palette.palette.neutral[86], ';\n    margin: ')
					.concat(space.D[10], 'px 0 ')
					.concat(space.D[5], 'px;\n  '),
				subHeadingCss = '\n    '
					.concat(subHeadingBorderTopCss, '\n    ')
					.concat(subHeadingTitleCss, '\n  '),
				InnerContent = (_ref) => {
					var _specificProductType$,
						_specificProductType$2,
						_specificProductType$3,
						{ manageProductProps, productDetail } = _ref,
						mainPlan = (0, productResponse.fr)(
							productDetail.subscription,
						);
					if (!mainPlan)
						throw new Error(
							'mainPlan does not exist in manageProduct page',
						);
					var specificProductType = manageProductProps.productType,
						groupedProductType =
							productTypes.HP[
								specificProductType.groupedProductType
							],
						hasCancellationPending =
							productDetail.subscription.cancelledAt,
						cancelledCopy =
							specificProductType.cancelledCopy ||
							groupedProductType.cancelledCopy,
						[overiddenAmount, setOveriddenAmount] = (0,
						react.useState)(null),
						isAmountOveridable =
							specificProductType.updateAmountMdaEndpoint,
						nextPaymentDetails = (0, NextPaymentDetails.p)(
							mainPlan,
							productDetail.subscription,
							overiddenAmount,
							!!productDetail.alertText,
						),
						maybePatronSuffix =
							'Patron' === productDetail.subscription.readerType
								? ' - Patron'
								: '',
						showSupporterPlusUpdateAmount =
							'supporterplus' ===
								specificProductType.productType &&
							featureSwitches.k.supporterPlusUpdateAmount &&
							!hasCancellationPending;
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									PaymentFailureAlertIfApplicable.T,
									{ productDetails: [productDetail] },
								),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'div',
									{
										css: (0, emotion_react_browser_esm.iv)(
											subHeadingBorderTopCss,
											' display:flex;align-items:start;justify-content:space-between;',
											'',
										),
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'h2',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														subHeadingTitleCss,
														' margin:0;',
														'',
													),
													children: [
														specificProductType.productTitle(
															mainPlan,
														),
														maybePatronSuffix,
													],
												},
											),
											(0, productResponse.XU)(
												productDetail.subscription,
											) &&
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'i',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															'margin:4px 0 0 ',
															space.D[3],
															'px;',
															'',
														),
														children: (0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															GiftIcon.O,
															{
																alignArrowToThisSide:
																	'left',
															},
														),
													},
												),
										],
									},
								),
								hasCancellationPending &&
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'p',
										{
											css: (0,
											emotion_react_browser_esm.iv)(
												typography.Kz0,
												';',
												'',
											),
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													ErrorIcon.P,
													{
														fill: palette.palette
															.brandAlt[200],
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'span',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															'margin-left:',
															space.D[2],
															'px;',
															'',
														),
														children: [
															cancelledCopy,
															' ',
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'strong',
																{
																	children:
																		(0,
																		dates.e1)(
																			productDetail
																				.subscription
																				.cancellationEffectiveDate,
																		),
																},
															),
														],
													},
												),
												'.',
											],
										},
									),
								(isAmountOveridable ||
									showSupporterPlusUpdateAmount) &&
								!(0, productUtils.IV)(productDetail) &&
								(0, productResponse.q4)(mainPlan)
									? (0,
									  emotion_react_jsx_runtime_browser_esm.tZ)(
											UpdateAmount,
											{
												subscriptionId:
													productDetail.subscription
														.subscriptionId,
												mainPlan,
												productType:
													specificProductType,
												nextPaymentDate:
													productDetail.subscription
														.nextPaymentDate,
												amountUpdateStateChange:
													setOveriddenAmount,
												isTestUser:
													productDetail.isTestUser,
											},
									  )
									: (0,
									  emotion_react_jsx_runtime_browser_esm.tZ)(
											BasicProductInfoTable.I,
											{
												groupedProductType,
												productDetail,
											},
									  ),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'h2',
									{
										css: (0, emotion_react_browser_esm.iv)(
											subHeadingCss,
											';',
											'',
										),
										children: 'Payment',
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									SixForSixExplainer.l,
									{
										additionalCss: (0,
										emotion_react_browser_esm.iv)(
											typography.Kz0,
											';',
											'',
										),
										mainPlan,
										hasCancellationPending,
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									PaymentDetailsTable.s,
									{
										productDetail,
										nextPaymentDetails,
										hasCancellationPending,
									},
								),
								productDetail.isPaidTier &&
									productDetail.subscription
										.safeToUpdatePaymentMethod &&
									!productDetail.subscription.payPalEmail &&
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										Buttons.Q,
										{
											colour: productDetail.alertText
												? palette.palette.brand[400]
												: palette.palette.brand[800],
											textColour: productDetail.alertText
												? palette.palette.neutral[100]
												: palette.palette.brand[400],
											fontWeight: 'bold',
											alert: !!productDetail.alertText,
											text: 'Update payment method',
											to: '/payment/'.concat(
												specificProductType.urlPart,
											),
											state: { productDetail },
										},
									),
								(null ===
									(_specificProductType$ =
										specificProductType.delivery) ||
								void 0 === _specificProductType$ ||
								null ===
									(_specificProductType$2 =
										_specificProductType$.showAddress) ||
								void 0 === _specificProductType$2
									? void 0
									: _specificProductType$2.call(
											_specificProductType$,
											productDetail.subscription,
									  )) &&
									productDetail.subscription
										.deliveryAddress &&
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										emotion_react_jsx_runtime_browser_esm.HY,
										{
											children: [
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
															'Delivery address',
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													ProductDescriptionListTable.M,
													{
														alternateRowBgColors:
															!0,
														borderColour:
															palette.palette
																.neutral[86],
														content: [
															{
																title: 'Address',
																value: (0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	DeliveryAddressDisplay.O,
																	ManageProduct_objectSpread(
																		{},
																		productDetail
																			.subscription
																			.deliveryAddress,
																	),
																),
																spanTwoCols: !0,
															},
															...(null !==
																(_specificProductType$3 =
																	specificProductType.delivery) &&
															void 0 !==
																_specificProductType$3 &&
															_specificProductType$3.enableDeliveryInstructionsUpdate
																? [
																		{
																			title: 'Instructions',
																			value: productDetail
																				.subscription
																				.deliveryAddress
																				.instructions,
																			spanTwoCols:
																				!0,
																		},
																  ]
																: []),
														],
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													Buttons.Q,
													{
														colour: palette.palette
															.brand[800],
														textColour:
															palette.palette
																.brand[400],
														fontWeight: 'bold',
														text: 'Manage delivery address',
														to: '/delivery/'.concat(
															specificProductType.urlPart,
															'/address',
														),
														state: productDetail,
													},
												),
											],
										},
									),
								(0, productUtils.SS)(specificProductType) &&
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										emotion_react_jsx_runtime_browser_esm.HY,
										{
											children: [
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
															'Delivery history',
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
															'Check delivery history and report an issue.',
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													Buttons.Q,
													{
														colour: palette.palette
															.brand[800],
														textColour:
															palette.palette
																.brand[400],
														fontWeight: 'bold',
														text: 'Manage delivery history',
														to: '/delivery/'.concat(
															specificProductType.urlPart,
															'/records',
														),
														state: {
															productDetail,
														},
													},
												),
											],
										},
									),
								(0, productUtils.iC)(specificProductType) &&
									productDetail.subscription.autoRenew &&
									!hasCancellationPending &&
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										emotion_react_jsx_runtime_browser_esm.HY,
										{
											children: [
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
															'Going on holiday?',
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'p',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															typography.Kz0,
															';',
															'',
														),
														children: [
															'Don’t fret - you can manage your suspensions by clicking the button below. You will be credited for each suspended',
															' ',
															specificProductType
																.holidayStops
																.issueKeyword,
															' on the first bill after the suspension date.',
														],
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													Buttons.Q,
													{
														colour: palette.palette
															.brand[800],
														textColour:
															palette.palette
																.brand[400],
														fontWeight: 'bold',
														text: 'Manage suspensions',
														to: '/suspend/'.concat(
															specificProductType.urlPart,
														),
														state: {
															productDetail,
														},
													},
												),
											],
										},
									),
								!productDetail.subscription.autoRenew &&
									specificProductType.renewalMetadata &&
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										emotion_react_jsx_runtime_browser_esm.HY,
										{
											children: [
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
														children: 'Renewal',
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'p',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															typography.Kz0,
															';',
															'',
														),
														children: [
															'To renew this one-off',
															' ',
															specificProductType.friendlyName,
															', please contact us.',
														],
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													CallCenterEmailAndNumbers.K,
													{},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'p',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															typography.Kz0,
															';',
															'',
														),
														children: [
															'Alternatively, if you would prefer to start a recurring ',
															specificProductType.friendlyName,
															' you can explore payment options and subscribe online by clicking the button below.',
														],
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													SupportTheGuardianButton.o,
													ManageProduct_objectSpread(
														ManageProduct_objectSpread(
															{},
															specificProductType.renewalMetadata,
														),
														{},
														{ size: 'small' },
													),
												),
											],
										},
									),
								specificProductType.productPageNewsletterIDs &&
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										NewsletterOptinSection,
										{
											activeNewletterIDs:
												specificProductType.productPageNewsletterIDs,
										},
									),
								!hasCancellationPending &&
									'United States' !==
										productDetail.billingCountry &&
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										CancellationCTA,
										{
											productDetail,
											friendlyName:
												groupedProductType.friendlyName,
											specificProductType,
										},
									),
							],
						},
					);
				},
				CancellationCTA = (props) => {
					var shouldContactUsToCancel =
						!props.productDetail.selfServiceCancellation
							.isAllowed ||
						!props.specificProductType.cancellation;
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						'div',
						{
							css: (0, emotion_react_browser_esm.iv)(
								'margin:',
								space.D[24],
								'px 0 0 auto;',
								typography.Kz0,
								';color:',
								palette.palette.neutral[46],
								';',
								'',
							),
							children: [
								shouldContactUsToCancel &&
									'Would you like to cancel your '.concat(
										props.friendlyName,
										'? ',
									),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									react_router_dom.rU,
									{
										css: (0, emotion_react_browser_esm.iv)(
											'color:',
											palette.palette.brand[500],
											';',
											'',
										),
										to:
											'/cancel/' +
											props.specificProductType.urlPart,
										state: {
											productDetail: props.productDetail,
										},
										children: shouldContactUsToCancel
											? 'Contact us'
											: 'Cancel '.concat(
													props.friendlyName,
											  ),
									},
								),
							],
						},
					);
				},
				AsyncLoadedInnerContent = (props) => {
					var request = (0, productUtils.w)(
							props.productType
								.allProductsProductTypeFilterString,
						),
						{ data, loadingState } = (0, useAsyncLoader.c)(
							request,
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
							{ loadingMessage: 'Loading your product...' },
						);
					if (null == data || 0 == data.products.length)
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							react_router.Fg,
							{ to: '/' },
						);
					var productDetail = data.products.filter(
						productResponse.v_,
					)[0];
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						InnerContent,
						{ manageProductProps: props, productDetail },
					);
				},
				ManageProduct = (props) => {
					var routerState = (0, react_router.TH)().state,
						productDetail =
							null == routerState
								? void 0
								: routerState.productDetail;
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						Page._,
						{
							selectedNavItem: NavConfig.qy.accountOverview,
							pageTitle: 'Manage '.concat(
								productTypes.HP[
									props.productType.groupedProductType
								].shortFriendlyName ||
									productTypes.HP[
										props.productType.groupedProductType
									].friendlyName,
							),
							minimalFooter: !0,
							children: productDetail
								? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
										InnerContent,
										{
											manageProductProps: props,
											productDetail,
										},
								  )
								: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
										AsyncLoadedInnerContent,
										ManageProduct_objectSpread({}, props),
								  ),
						},
					);
				};
			try {
				(ManageProduct.displayName = 'ManageProduct'),
					(ManageProduct.__docgenInfo = {
						description: '',
						displayName: 'ManageProduct',
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
							'client/components/mma/accountoverview/ManageProduct.tsx#ManageProduct'
						] = {
							docgenInfo: ManageProduct.__docgenInfo,
							name: 'ManageProduct',
							path: 'client/components/mma/accountoverview/ManageProduct.tsx#ManageProduct',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			const ManageProduct_stories = {
				title: 'Pages/ManageProduct',
				component: ManageProduct,
				decorators: [ReactRouterDecorator.R],
				parameters: { layout: 'fullscreen' },
			};
			var GuardianWeekly = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							ManageProduct,
							{ productType: productTypes.Pm.guardianweekly },
						),
					parameters: {
						reactRouter: {
							state: { productDetail: (0, testProducts.X8)() },
						},
					},
				},
				TierThree = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							ManageProduct,
							{ productType: productTypes.Pm.tierthree },
						),
					parameters: {
						reactRouter: {
							state: { productDetail: (0, testProducts.uU)() },
						},
					},
				},
				DigitalSubscription = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							ManageProduct,
							{ productType: productTypes.Pm.digipack },
						),
					parameters: {
						reactRouter: {
							state: { productDetail: (0, testProducts.IB)() },
						},
					},
				},
				NewspaperSubscriptionCard = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							ManageProduct,
							{ productType: productTypes.Pm.digitalvoucher },
						),
					parameters: {
						reactRouter: {
							state: { productDetail: (0, testProducts.Y$)() },
						},
					},
				},
				Contribution = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							ManageProduct,
							{ productType: productTypes.Pm.contributions },
						),
					parameters: {
						reactRouter: {
							state: { productDetail: (0, testProducts.Nf)() },
						},
					},
				};
			featureSwitches.k.supporterPlusUpdateAmount = !0;
			var SupporterPlus = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							ManageProduct,
							{ productType: productTypes.Pm.supporterplus },
						),
					parameters: {
						reactRouter: {
							state: { productDetail: (0, testProducts.hc)() },
						},
					},
				},
				SupporterPlusAllAccessDigital = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							ManageProduct,
							{ productType: productTypes.Pm.supporterplus },
						),
					parameters: {
						reactRouter: {
							state: { productDetail: (0, testProducts.dd)() },
						},
					},
				},
				GuardianAdLite = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							ManageProduct,
							{ productType: productTypes.Pm.guardianadlite },
						),
					parameters: {
						reactRouter: {
							state: { productDetail: (0, testProducts.av)() },
						},
					},
				},
				NewspaperDeliverySunday = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							ManageProduct,
							{ productType: productTypes.Pm.homedelivery },
						),
					parameters: {
						reactRouter: {
							state: { productDetail: (0, testProducts.LE)() },
						},
					},
				};
			(GuardianWeekly.parameters = {
				...GuardianWeekly.parameters,
				docs: {
					...GuardianWeekly.parameters?.docs,
					source: {
						originalSource:
							'{\n  render: () => {\n    return <ManageProduct productType={PRODUCT_TYPES.guardianweekly} />;\n  },\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: guardianWeeklyPaidByCard()\n      }\n    }\n  }\n}',
						...GuardianWeekly.parameters?.docs?.source,
					},
				},
			}),
				(TierThree.parameters = {
					...TierThree.parameters,
					docs: {
						...TierThree.parameters?.docs,
						source: {
							originalSource:
								'{\n  render: () => {\n    return <ManageProduct productType={PRODUCT_TYPES.tierthree} />;\n  },\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: tierThree()\n      }\n    }\n  }\n}',
							...TierThree.parameters?.docs?.source,
						},
					},
				}),
				(DigitalSubscription.parameters = {
					...DigitalSubscription.parameters,
					docs: {
						...DigitalSubscription.parameters?.docs,
						source: {
							originalSource:
								'{\n  render: () => {\n    return <ManageProduct productType={PRODUCT_TYPES.digipack} />;\n  },\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: digitalPackPaidByDirectDebit()\n      }\n    }\n  }\n}',
							...DigitalSubscription.parameters?.docs?.source,
						},
					},
				}),
				(NewspaperSubscriptionCard.parameters = {
					...NewspaperSubscriptionCard.parameters,
					docs: {
						...NewspaperSubscriptionCard.parameters?.docs,
						source: {
							originalSource:
								'{\n  render: () => {\n    return <ManageProduct productType={PRODUCT_TYPES.digitalvoucher} />;\n  },\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: newspaperVoucherPaidByPaypal()\n      }\n    }\n  }\n}',
							...NewspaperSubscriptionCard.parameters?.docs
								?.source,
						},
					},
				}),
				(Contribution.parameters = {
					...Contribution.parameters,
					docs: {
						...Contribution.parameters?.docs,
						source: {
							originalSource:
								'{\n  render: () => {\n    return <ManageProduct productType={PRODUCT_TYPES.contributions} />;\n  },\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: monthlyContributionPaidByCard()\n      }\n    }\n  }\n}',
							...Contribution.parameters?.docs?.source,
						},
					},
				}),
				(SupporterPlus.parameters = {
					...SupporterPlus.parameters,
					docs: {
						...SupporterPlus.parameters?.docs,
						source: {
							originalSource:
								'{\n  render: () => {\n    return <ManageProduct productType={PRODUCT_TYPES.supporterplus} />;\n  },\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: supporterPlusAnnual()\n      }\n    }\n  }\n}',
							...SupporterPlus.parameters?.docs?.source,
						},
					},
				}),
				(SupporterPlusAllAccessDigital.parameters = {
					...SupporterPlusAllAccessDigital.parameters,
					docs: {
						...SupporterPlusAllAccessDigital.parameters?.docs,
						source: {
							originalSource:
								'{\n  render: () => {\n    return <ManageProduct productType={PRODUCT_TYPES.supporterplus} />;\n  },\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: supporterPlusMonthlyAllAccessDigital()\n      }\n    }\n  }\n}',
							...SupporterPlusAllAccessDigital.parameters?.docs
								?.source,
						},
					},
				}),
				(GuardianAdLite.parameters = {
					...GuardianAdLite.parameters,
					docs: {
						...GuardianAdLite.parameters?.docs,
						source: {
							originalSource:
								'{\n  render: () => {\n    return <ManageProduct productType={PRODUCT_TYPES.guardianadlite} />;\n  },\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: guardianAdLite()\n      }\n    }\n  }\n}',
							...GuardianAdLite.parameters?.docs?.source,
						},
					},
				}),
				(NewspaperDeliverySunday.parameters = {
					...NewspaperDeliverySunday.parameters,
					docs: {
						...NewspaperDeliverySunday.parameters?.docs,
						source: {
							originalSource:
								'{\n  render: () => {\n    return <ManageProduct productType={PRODUCT_TYPES.homedelivery} />;\n  },\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: homeDeliverySunday()\n      }\n    }\n  }\n}',
							...NewspaperDeliverySunday.parameters?.docs?.source,
						},
					},
				});
			const __namedExportsOrder = [
				'GuardianWeekly',
				'TierThree',
				'DigitalSubscription',
				'NewspaperSubscriptionCard',
				'Contribution',
				'SupporterPlus',
				'SupporterPlusAllAccessDigital',
				'GuardianAdLite',
				'NewspaperDeliverySunday',
			];
		},
	},
]);
//# sourceMappingURL=components-mma-accountoverview-ManageProduct-stories.ee5e9f12.iframe.bundle.js.map
