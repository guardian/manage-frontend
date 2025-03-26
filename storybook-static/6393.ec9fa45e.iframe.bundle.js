(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[6393],
	{
		'./node_modules/@guardian/source-development-kitchen/dist/react-components/toggle-switch/ToggleSwitch.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				'use strict';
				__webpack_require__.d(__webpack_exports__, {
					Z: () => ToggleSwitch,
				});
				var emotion_react_jsx_runtime_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				);
				let sourceIdIndex = 0;
				var description_id = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/accessibility/description-id.js',
					),
					react = __webpack_require__(
						'./node_modules/react/index.js',
					),
					emotion_react_browser_esm = __webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
					palette = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__deprecated__/colour/palette.js',
					),
					typography = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
					space = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
					);
				const buttonStyles = emotion_react_browser_esm.iv`
	flex: none;
	border: none;
	margin: 0;
	padding: 0;
	display: inline-block;
	text-align: center;
	position: relative;
	transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	cursor: pointer;

	&:after {
		content: '';
		position: absolute;
		border-radius: 50%;
		background: ${palette.n$[100]};
		will-change: left;
		transition: left 0.15s ease-in-out;
	}

	:focus + .tooltiptext {
		opacity: 1;
		visibility: visible;
	}
`,
					buttonStylesMargin = (labelPosition) => {
						switch (labelPosition) {
							case 'left':
								return emotion_react_browser_esm.iv`
				margin-left: 8px;
			`;
							case 'right':
								return emotion_react_browser_esm.iv`
				margin-right: 8px;
			`;
						}
					},
					toggleStyles = (format) => emotion_react_browser_esm.iv`
		width: 44px;
		height: 22px;
		border-radius: 16px;
		box-sizing: unset;

		/* this will go away when resets have been standardised */
		&:before,
		&:after {
			box-sizing: border-box;
		}

		&:before {
			content: '';
			position: absolute;
			top: 5px;
			height: 11px;
			width: 6px;
			right: 8px;
			opacity: 0;
			border-bottom: 2px solid ${palette.Vp[400]};
			border-right: 2px solid ${palette.Vp[400]};
			transform: rotate(45deg);
			transition-property: opacity;
			transition-duration: 0.2s;
		}

		&:after {
			height: 18px;
			width: 18px;
			top: 2px;
			left: 2px;
		}

		&[aria-checked='false'] {
			background-color: ${format ? 'rgba(255, 255, 255, 0.4)' : palette.n$[46]};
			border: 1px solid ${format ? 'rgba(255, 255, 255, 0.6)' : palette.n$[46]};
		}

		&[aria-checked='false']:before {
			transition-delay: 0;
		}

		&[aria-checked='true'] {
			background-color: ${palette.Vp[400]};
			border: 1px solid ${format ? '#A7CFB8' : palette.Vp[400]};
		}

		&[aria-checked='true']:before {
			opacity: 1;
			z-index: 1;
			transition-delay: 0.2s;
		}

		&[aria-checked='true']:after {
			left: 24px;
			background: ${palette.n$[100]};
		}

		&:focus {
			outline: 0;
			html:not(.src-focus-disabled) & {
				outline: 5px solid ${format ? palette.n$[100] : palette.UQ[500]};
				outline-offset: 3px;
			}
		}
	`,
					labelStyles = (
						fontSize,
						fontWeight,
						format,
					) => emotion_react_browser_esm.iv`
	${
		'small' === fontSize &&
		('regular' === fontWeight ? typography.VZD : typography.fRL)
	};
	${
		'medium' === fontSize &&
		('regular' === fontWeight ? typography.Kz0 : typography.Rcn)
	};
	color: ${format ? palette.n$[100] : palette.n$[7]};
	display: inline-flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
	user-select: none;
	position: relative;
`,
					labelBorderStyles = (
						format,
					) => emotion_react_browser_esm.iv`
	border-top: 1px solid ${format ? palette.n$[100] : palette.n$[46]};
	padding-top: ${space.D[1]}px;
	width: 100%;
`,
					tooltipStyles = emotion_react_browser_esm.iv`
	position: absolute;
	visibility: hidden;
	width: 248px;
	top: 40px;
	background-color: ${palette.n$[100]};
	border: 1px solid rgba(18, 18, 18, 0.25);
	border-radius: 3px;
	padding: ${space.D[2]};
	z-index: 1;
	opacity: 0;
	transition: 0.7s opacity;
`,
					ToggleSwitch = ({
						checked,
						id,
						fontWeight = 'regular',
						fontSize = 'small',
						format,
						label,
						labelBorder = !1,
						labelPosition = 'right',
						defaultChecked,
						cssOverrides,
						onClick,
						...props
					}) => {
						const buttonId =
								id ?? 'src-component-' + sourceIdIndex++,
							labelId = (0, description_id.S)(buttonId),
							[isBrowser, setIsBrowser] = (0, react.useState)(!1);
						let tooltiptext = '';
						return (
							(0, react.useEffect)(() => {
								setIsBrowser(!0);
							}, []),
							isBrowser || (tooltiptext = 'tooltiptext'),
							(0, emotion_react_jsx_runtime_browser_esm.BX)(
								'label',
								{
									id: labelId,
									css: [
										labelStyles(
											fontSize,
											fontWeight,
											format,
										),
										labelBorder &&
											labelBorderStyles(format),
										cssOverrides,
									],
									...props,
									children: [
										'left' === labelPosition && label,
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'button',
											{
												id: buttonId,
												css: [
													buttonStyles,
													buttonStylesMargin(
														labelPosition,
													),
													toggleStyles(format),
												],
												role: 'switch',
												'aria-checked':
													null != checked
														? checked
														: !!defaultChecked,
												'aria-labelledby': labelId,
												onClick,
											},
										),
										'right' === labelPosition && label,
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'div',
											{
												className: tooltiptext,
												css: tooltipStyles,
												children: (0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'span',
													{
														children:
															'Please turn on JavaScript to use this feature',
													},
												),
											},
										),
									],
								},
							)
						);
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
		'./node_modules/lodash/_arrayIncludes.js': (
			module,
			__unused_webpack_exports,
			__webpack_require__,
		) => {
			var baseIndexOf = __webpack_require__(
				'./node_modules/lodash/_baseIndexOf.js',
			);
			module.exports = function arrayIncludes(array, value) {
				return (
					!!(null == array ? 0 : array.length) &&
					baseIndexOf(array, value, 0) > -1
				);
			};
		},
		'./node_modules/lodash/_arrayIncludesWith.js': (module) => {
			module.exports = function arrayIncludesWith(
				array,
				value,
				comparator,
			) {
				for (
					var index = -1, length = null == array ? 0 : array.length;
					++index < length;

				)
					if (comparator(value, array[index])) return !0;
				return !1;
			};
		},
		'./node_modules/lodash/_baseFindIndex.js': (module) => {
			module.exports = function baseFindIndex(
				array,
				predicate,
				fromIndex,
				fromRight,
			) {
				for (
					var length = array.length,
						index = fromIndex + (fromRight ? 1 : -1);
					fromRight ? index-- : ++index < length;

				)
					if (predicate(array[index], index, array)) return index;
				return -1;
			};
		},
		'./node_modules/lodash/_baseIndexOf.js': (
			module,
			__unused_webpack_exports,
			__webpack_require__,
		) => {
			var baseFindIndex = __webpack_require__(
					'./node_modules/lodash/_baseFindIndex.js',
				),
				baseIsNaN = __webpack_require__(
					'./node_modules/lodash/_baseIsNaN.js',
				),
				strictIndexOf = __webpack_require__(
					'./node_modules/lodash/_strictIndexOf.js',
				);
			module.exports = function baseIndexOf(array, value, fromIndex) {
				return value == value
					? strictIndexOf(array, value, fromIndex)
					: baseFindIndex(array, baseIsNaN, fromIndex);
			};
		},
		'./node_modules/lodash/_baseIsNaN.js': (module) => {
			module.exports = function baseIsNaN(value) {
				return value != value;
			};
		},
		'./node_modules/lodash/_baseUniq.js': (
			module,
			__unused_webpack_exports,
			__webpack_require__,
		) => {
			var SetCache = __webpack_require__(
					'./node_modules/lodash/_SetCache.js',
				),
				arrayIncludes = __webpack_require__(
					'./node_modules/lodash/_arrayIncludes.js',
				),
				arrayIncludesWith = __webpack_require__(
					'./node_modules/lodash/_arrayIncludesWith.js',
				),
				cacheHas = __webpack_require__(
					'./node_modules/lodash/_cacheHas.js',
				),
				createSet = __webpack_require__(
					'./node_modules/lodash/_createSet.js',
				),
				setToArray = __webpack_require__(
					'./node_modules/lodash/_setToArray.js',
				);
			module.exports = function baseUniq(array, iteratee, comparator) {
				var index = -1,
					includes = arrayIncludes,
					length = array.length,
					isCommon = !0,
					result = [],
					seen = result;
				if (comparator) (isCommon = !1), (includes = arrayIncludesWith);
				else if (length >= 200) {
					var set = iteratee ? null : createSet(array);
					if (set) return setToArray(set);
					(isCommon = !1),
						(includes = cacheHas),
						(seen = new SetCache());
				} else seen = iteratee ? [] : result;
				outer: for (; ++index < length; ) {
					var value = array[index],
						computed = iteratee ? iteratee(value) : value;
					if (
						((value = comparator || 0 !== value ? value : 0),
						isCommon && computed == computed)
					) {
						for (var seenIndex = seen.length; seenIndex--; )
							if (seen[seenIndex] === computed) continue outer;
						iteratee && seen.push(computed), result.push(value);
					} else
						includes(seen, computed, comparator) ||
							(seen !== result && seen.push(computed),
							result.push(value));
				}
				return result;
			};
		},
		'./node_modules/lodash/_createSet.js': (
			module,
			__unused_webpack_exports,
			__webpack_require__,
		) => {
			var Set = __webpack_require__('./node_modules/lodash/_Set.js'),
				noop = __webpack_require__('./node_modules/lodash/noop.js'),
				setToArray = __webpack_require__(
					'./node_modules/lodash/_setToArray.js',
				),
				createSet =
					Set && 1 / setToArray(new Set([, -0]))[1] == 1 / 0
						? function (values) {
								return new Set(values);
						  }
						: noop;
			module.exports = createSet;
		},
		'./node_modules/lodash/_strictIndexOf.js': (module) => {
			module.exports = function strictIndexOf(array, value, fromIndex) {
				for (
					var index = fromIndex - 1, length = array.length;
					++index < length;

				)
					if (array[index] === value) return index;
				return -1;
			};
		},
		'./node_modules/lodash/noop.js': (module) => {
			module.exports = function noop() {};
		},
		'./node_modules/lodash/uniq.js': (
			module,
			__unused_webpack_exports,
			__webpack_require__,
		) => {
			var baseUniq = __webpack_require__(
				'./node_modules/lodash/_baseUniq.js',
			);
			module.exports = function uniq(array) {
				return array && array.length ? baseUniq(array) : [];
			};
		},
	},
]);
//# sourceMappingURL=6393.ec9fa45e.iframe.bundle.js.map
