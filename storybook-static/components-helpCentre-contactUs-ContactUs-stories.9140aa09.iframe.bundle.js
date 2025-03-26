'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[9505],
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
		'./client/components/mma/shared/assets/ErrorIcon.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { P: () => ErrorIcon });
			var _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__deprecated__/colour/palette.js',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				ErrorIcon = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
						'svg',
						{
							width: '21',
							height: '17',
							viewBox: '0 0 21 17',
							fill: 'none',
							css: props.additionalCss,
							children: (0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
								'path',
								{
									fillRule: 'evenodd',
									clipRule: 'evenodd',
									d: 'M9.9375 0L0 16.1095L0.6375 17H20.3625L21 16.1095L11.0625 0H9.9375ZM9.87661 11.5012H11.1234L11.7162 4.96907L10.8986 4.28147H10.1015L9.28386 4.96907L9.87661 11.5012ZM10.5 12.7045C11.1689 12.7045 11.7162 13.246 11.7162 13.9078C11.7162 14.5696 11.1689 15.1111 10.5 15.1111C9.83114 15.1111 9.28386 14.5696 9.28386 13.9078C9.28386 13.246 9.83114 12.7045 10.5 12.7045Z',
									fill:
										props.fill ||
										(props.downgradeToWarning
											? _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
													.A5[300]
											: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
													.r[400]),
								},
							),
						},
					);
			try {
				(ErrorIcon.displayName = 'ErrorIcon'),
					(ErrorIcon.__docgenInfo = {
						description: '',
						displayName: 'ErrorIcon',
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
							downgradeToWarning: {
								defaultValue: null,
								description: '',
								name: 'downgradeToWarning',
								required: !1,
								type: { name: 'true' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/assets/ErrorIcon.tsx#ErrorIcon'
						] = {
							docgenInfo: ErrorIcon.__docgenInfo,
							name: 'ErrorIcon',
							path: 'client/components/mma/shared/assets/ErrorIcon.tsx#ErrorIcon',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/shared/FormError.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { X: () => FormError });
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
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				_mma_shared_assets_ErrorIcon__WEBPACK_IMPORTED_MODULE_5__ =
					__webpack_require__(
						'./client/components/mma/shared/assets/ErrorIcon.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			var dlStyles = (0, _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'position:relative;padding:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[5],
					'px ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[5],
					'px ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[5],
					'px 50px;',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.Kz0,
					';border:4px solid ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.palette.error[400],
					';',
					'',
				),
				iStyles = (0, _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'position:absolute;top:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[5],
					'px;left:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[5],
					'px;',
					'',
				),
				dtStyles = { name: '1efi8gv', styles: 'font-weight:bold' },
				ddStyles = { name: 'ti75j2', styles: 'margin:0' },
				ulStyles = {
					name: 'z06qs',
					styles: 'list-style:none;margin:0;padding:0',
				},
				FormError = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.BX)(
						'dl',
						{
							css: dlStyles,
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
									'i',
									{
										css: iStyles,
										children: (0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
											_mma_shared_assets_ErrorIcon__WEBPACK_IMPORTED_MODULE_5__.P,
											{},
										),
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
									'dt',
									{ css: dtStyles, children: props.title },
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
									'dd',
									{
										css: ddStyles,
										children: (0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
											'ul',
											{
												css: ulStyles,
												children: props.messages.map(
													(msg, index) =>
														(0,
														_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
															'li',
															{ children: msg },
															'feli-'.concat(
																index,
															),
														),
												),
											},
										),
									},
								),
							],
						},
					);
			try {
				(FormError.displayName = 'FormError'),
					(FormError.__docgenInfo = {
						description: '',
						displayName: 'FormError',
						props: {
							title: {
								defaultValue: null,
								description: '',
								name: 'title',
								required: !1,
								type: { name: 'string' },
							},
							messages: {
								defaultValue: null,
								description: '',
								name: 'messages',
								required: !0,
								type: {
									name: '(string | ReactElement<any, string | JSXElementConstructor<any>>)[]',
								},
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/shared/FormError.tsx#FormError'
						] = {
							docgenInfo: FormError.__docgenInfo,
							name: 'FormError',
							path: 'client/components/shared/FormError.tsx#FormError',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./shared/fileUploadUtils.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				RM: () => MAX_FILE_ATTACHMENT_SIZE_KB,
				Tq: () => VALID_IMAGE_FILE_EXTENSIONS,
				Zt: () => VALID_IMAGE_FILE_MIME_TYPES,
				hu: () => base64FromFile,
			});
			__webpack_require__('./node_modules/buffer/index.js').lW;
			var base64FromFile = (file) =>
					new Promise((resolve, reject) => {
						var reader = new FileReader();
						reader.addEventListener(
							'load',
							() => {
								resolve(
									removeDataUrlDeclarationFromBase64(
										reader.result,
									),
								);
							},
							!1,
						),
							reader.addEventListener(
								'error',
								() => {
									reject(new Error('base64FromFile error'));
								},
								!1,
							),
							reader.readAsDataURL(file);
					}),
				MAX_FILE_ATTACHMENT_SIZE_KB = 5e3,
				VALID_IMAGE_FILE_MIME_TYPES = [
					'image/png',
					'image/jpeg',
					'image/jpg',
					'image/gif',
					'application/pdf',
				],
				VALID_IMAGE_FILE_EXTENSIONS = [
					'.png',
					'.jpeg',
					'.jpg',
					'.gif',
					'.pdf',
				],
				removeDataUrlDeclarationFromBase64 = (fileBase64) =>
					fileBase64.replace(/data:(.*)base64,/m, '');
		},
		'./client/components/helpCentre/contactUs/ContactUs.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					Default: () => Default,
					TopicSelected: () => TopicSelected,
					WithKnownIssue: () => WithKnownIssue,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => ContactUs_stories,
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
				SectionContent = __webpack_require__(
					'./client/components/shared/SectionContent.tsx',
				),
				SectionHeader = __webpack_require__(
					'./client/components/shared/SectionHeader.tsx',
				),
				KnownIssues = __webpack_require__(
					'./client/components/helpCentre/KnownIssues.tsx',
				),
				emotion_react_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
				),
				typography = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
				),
				palette = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
				),
				mq = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
				),
				space = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
				),
				esm = __webpack_require__(
					'./node_modules/@sentry/minimal/esm/index.js',
				),
				react_router = __webpack_require__(
					'./node_modules/react-router/index.js',
				),
				contactUsConfig = [
					{
						id: 'delivery',
						name: 'Delivery',
						enquiryLabel: 'your delivery',
						subTopicsTitle:
							'Step 1: Help us understand what you need to talk about',
						subtopics: [
							{
								id: 's1',
								name: 'I’m going on holiday and need to pause deliveries',
								selfServiceBox: {
									text: [
										'Did you know you can suspend your subscription online by logging in below and selecting ‘Manage Subscription’? It’s easy to use and means you don’t have to wait for a response.',
									],
									linkText: 'Go to your account',
									href: '/',
								},
							},
							{
								id: 's2',
								name: 'I need to report a problem with my delivery',
								selfServiceBox: {
									text: [
										'Did you know you can report your delivery problem by logging in below and selecting ‘Manage Subscription’? It’s easy to do and means you don’t have to wait for a response.',
									],
									linkText: 'Go to your account',
									href: '/',
								},
							},
							{
								id: 's3',
								name: 'I need to update my delivery details',
								selfServiceBox: {
									text: [
										'Did you know you can update your details online by logging in below and selecting ‘Manage Subscription’? It’s easy to do and means you don’t have to wait for a response.',
									],
									linkText: 'Go to your account',
									href: '/',
								},
							},
							{
								id: 's4',
								name: 'Something else',
								editableSubject: !0,
							},
						],
					},
					{
						id: 'billing',
						name: 'My Billing',
						enquiryLabel: 'your billing query',
						subTopicsTitle:
							'Step 1: Help us understand what you need to talk about',
						subtopics: [
							{
								id: 's5',
								name: 'I want to update my payment details',
								selfServiceBox: {
									text: [
										'Did you know you can update your payment details online by logging in below’? It’s easy to use and means you don’t have to wait for a response.',
									],
									linkText: 'Go to your account',
									href: '/',
								},
							},
							{
								id: 's6',
								name: 'My payment has failed',
								selfServiceBox: {
									text: [
										'There might be something wrong with your payment details. Did you know you can check these online by logging in below’? It’s easy to use and means you don’t have to wait for a response.',
									],
									linkText: 'Go to your account',
									href: '/',
								},
							},
							{
								id: 's7',
								name: 'I would like to see my invoices and payments',
								selfServiceBox: {
									text: [
										'Did you know you can view your invoices below by logging in below and navigating to the billing tab? It’s easy to use and means you don’t have to wait for a response.',
									],
									linkText: 'Go to your account',
									href: '/',
								},
							},
							{
								id: 's8',
								name: 'I would like to cancel my payment',
								noForm: !0,
								selfServiceBox: {
									text: [
										'Did you know you can cancel by logging in below and selecting ‘Manage my subscription/membership/recurring contribution? It’s easy to use and means you don’t have to wait for a response.',
										'If you still want to contact us, please contact our Customer Service team. You can find the contact details for your region below.',
									],
									linkText: 'Go to your account',
									href: '/',
								},
							},
							{
								id: 's9',
								name: 'Something else',
								editableSubject: !0,
							},
						],
					},
					{
						id: 'vouchers',
						name: 'My Newspaper Vouchers',
						enquiryLabel: 'your newspaper vouchers',
						subTopicsTitle:
							'Step 1: Help us understand what you need to talk about',
						subtopics: [
							{ id: 's10', name: 'I’ve lost my vouchers' },
							{
								id: 's11',
								name: 'Something else',
								editableSubject: !0,
							},
						],
					},
					{
						id: 'account',
						name: 'My Account',
						enquiryLabel: 'your account',
						subTopicsTitle:
							'Step 1: What kind of account do you have with us?',
						subtopics: [
							{
								id: 's12',
								name: 'Guardian account',
								subsubTopicsTitle:
									'Step 2: Help us understand what you need to talk about',
								subsubtopics: [
									{
										id: 'ss1',
										name: 'I don’t remember what email I use to sign in with',
									},
									{
										id: 'ss2',
										name: 'I forgot my password',
										selfServiceBox: {
											text: [
												'Did you know you can update your password online using the button below? It’s easy to use and means you don’t have to wait for a response.',
											],
											linkText: 'Go to your account',
											href: '/',
										},
									},
									{
										id: 'ss3',
										name: 'I need to update my account details',
										selfServiceBox: {
											text: [
												'Did you know you can update your personal details online by logging in below’? It’s easy to use and means you don’t have to wait for a response.',
											],
											linkText: 'Go to your account',
											href: '/',
										},
									},
									{
										id: 'ss4',
										name: 'I want to delete my account',
										selfServiceBox: {
											text: [
												'Did you know you can delete your account by logging in below’? It’s easy to use and means you don’t have to wait for a response. Please note that if you have an active subscription or recurring contribution you will need to cancel that first.',
											],
											linkText: 'Go to your account',
											href: '/',
										},
									},
									{
										id: 'ss5',
										name: 'Something else',
										editableSubject: !0,
									},
								],
							},
							{
								id: 's13',
								name: 'Guardian Jobs account',
								subsubTopicsTitle:
									'Step 2: Help us understand what you need to talk about',
								subsubtopics: [
									{
										id: 'ss6',
										name: 'I haven’t been receiving job alerts',
									},
									{
										id: 'ss7',
										name: 'I don’t remember what email I use to sign in with',
									},
									{
										id: 'ss8',
										name: 'I forgot my password',
										selfServiceBox: {
											text: [
												'Did you know you can update your password online using the button below? It’s easy to use and means you don’t have to wait for a response.',
											],
											linkText: 'Go to your account',
											href: '/',
										},
									},
									{
										id: 'ss9',
										name: 'I need to update my account details',
										selfServiceBox: {
											text: [
												'Did you know you can update your personal details online by logging in below’? It’s easy to use and means you don’t have to wait for a response.',
											],
											linkText: 'Go to your account',
											href: '/',
										},
									},
									{
										id: 'ss10',
										name: 'I want to delete my account',
										selfServiceBox: {
											text: [
												'Did you know you can delete your account by logging in below’? It’s easy to use and means you don’t have to wait for a response. Please note that if you have an active subscription or recurring contribution you will need to cancel that first.',
											],
											linkText: 'Go to your account',
											href: '/',
										},
									},
									{
										id: 'ss11',
										name: 'Something else',
										editableSubject: !0,
									},
								],
							},
							{
								id: 's14',
								name: 'I have a problem with my newsletter email',
								subsubTopicsTitle:
									'Step 2: Help us understand what you need to talk about',
								subsubtopics: [
									{
										id: 'ss12',
										name: 'I’m not receiving my newsletter emails',
									},
									{
										id: 'ss13',
										name: 'I need to update my email address',
										selfServiceBox: {
											text: [
												'Did you know you can update your personal details online by logging in below’? It’s easy to use and means you don’t have to wait for a response.',
											],
											linkText: 'Go to your account',
											href: '/',
										},
									},
									{
										id: 'ss14',
										name: 'I would like to unsubscribe from your newsletter emails',
									},
									{
										id: 'ss15',
										name: 'Something else',
										editableSubject: !0,
									},
								],
							},
						],
					},
					{
						id: 'tech',
						name: 'Technical Issues',
						enquiryLabel: 'this issue',
						subTopicsTitle:
							'Step 1: Help us understand what you need to talk about',
						subtopics: [
							{
								id: 's15',
								name: 'I’d like to report a technical issue with your website',
							},
							{
								id: 's16',
								name: 'I’d like to report a technical issue with your app',
							},
							{
								id: 's17',
								name: 'I’d like to provide feedback on your website or app',
								subsubTopicsTitle:
									'Step 2: What would you like to provide feedback on?',
								subsubtopics: [
									{ id: 'ss16', name: 'Website' },
									{ id: 'ss17', name: 'Apps' },
								],
							},
							{
								id: 's19',
								name: 'I’d like to feedback about the advertisements you’re using',
							},
							{
								id: 's20',
								name: 'Something else',
								editableSubject: !0,
							},
						],
					},
					{
						id: 'journalism',
						name: 'Guardian Journalism',
						enquiryLabel: 'our journalism',
						subTopicsTitle:
							'Step 1: Help us understand what you need to talk about',
						subtopics: [
							{
								id: 's21',
								name: 'I’d like to report an error in your article',
							},
							{
								id: 's22',
								name: 'I’d like to make a complaint about your articles',
							},
							{
								id: 's23',
								name: 'I’d like to provide some feedback on your article',
							},
							{
								id: 's24',
								name: 'I’d like to report a broken link in your article',
							},
							{
								id: 's25',
								name: 'Something else',
								editableSubject: !0,
							},
						],
					},
					{
						id: 'comments',
						name: 'Commenting',
						enquiryLabel: 'commenting',
					},
					{
						id: 'other',
						name: 'Something else',
						enquiryLabel: 'your query',
						editableSubject: !0,
					},
				],
				analytics = __webpack_require__(
					'./client/utilities/analytics.ts',
				),
				Button = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/button/Button.js',
				),
				react = __webpack_require__('./node_modules/react/index.js'),
				fileUploadUtils = __webpack_require__(
					'./shared/fileUploadUtils.ts',
				),
				ErrorIcon = __webpack_require__(
					'./client/components/mma/shared/assets/ErrorIcon.tsx',
				),
				CallCenterEmailAndNumbers = __webpack_require__(
					'./client/components/shared/CallCenterEmailAndNumbers.tsx',
				),
				FormError = __webpack_require__(
					'./client/components/shared/FormError.tsx',
				),
				Input = __webpack_require__(
					'./client/components/shared/Input.tsx',
				),
				Spinner = __webpack_require__(
					'./client/components/shared/Spinner.tsx',
				),
				size = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/size.js',
				),
				transitions = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/animation/transitions.js',
				),
				focus_halo = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/accessibility/focus-halo.js',
				),
				color = __webpack_require__('./node_modules/color/index.js'),
				color_default = __webpack_require__.n(color),
				emotion_react_jsx_runtime_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				);
			var _ref = { name: 'eivff4', styles: 'display:none' },
				_ref2 = { name: 'qamjgr', styles: 'margin-right:4px' },
				UploadFileInput = (props) => {
					var [selectedFile, setSelectedFile] = (0, react.useState)();
					return (
						(0, react.useEffect)(() => {
							var _props$changeSetState;
							null ===
								(_props$changeSetState =
									props.changeSetState) ||
								void 0 === _props$changeSetState ||
								_props$changeSetState.call(props, selectedFile);
						}, [selectedFile, props]),
						(0, emotion_react_jsx_runtime_browser_esm.BX)('label', {
							css: (0, emotion_react_browser_esm.iv)(
								'display:block;color:',
								palette.palette.neutral[7],
								';',
								typography.Rcn,
								';',
								props.additionalCss,
								';',
								'',
							),
							children: [
								props.title,
								props.optional &&
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'span',
										{
											css: (0,
											emotion_react_browser_esm.iv)(
												'font-style:italic;font-weight:normal;color:',
												palette.palette.neutral[46],
												';',
												'',
											),
											children: [' ', 'optional'],
										},
									),
								props.description &&
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'span',
										{
											css: (0,
											emotion_react_browser_esm.iv)(
												'display:block;font-weight:normal;color:',
												palette.palette.neutral[46],
												';',
												'',
											),
											children: props.description,
										},
									),
								props.inErrorState &&
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'span',
										{
											css: (0,
											emotion_react_browser_esm.iv)(
												'display:block;font-weight:normal;color:',
												palette.palette.error[400],
												';',
												'',
											),
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													ErrorIcon.P,
													{ additionalCss: _ref2 },
												),
												props.errorMessage,
											],
										},
									),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'input',
									{
										type: 'file',
										name: 'imageAttachment',
										accept: props.allowedFileFormats.join(),
										multiple: !1,
										css: _ref,
										onChange: (e) => {
											var _e$target$files,
												file =
													null ===
														(_e$target$files =
															e.target.files) ||
													void 0 === _e$target$files
														? void 0
														: _e$target$files[0];
											file && setSelectedFile(file);
										},
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'div',
									{
										css: (0, emotion_react_browser_esm.iv)(
											'display:block;margin-top:',
											space.D[2],
											'px;',
											'',
										),
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'span',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														'height:',
														size.Cb.ctaMedium,
														'px;min-height:',
														size.Cb.ctaMedium,
														'px;padding:0 ',
														space.D[5],
														'px;border-radius:',
														size.Cb.ctaMedium,
														'px;display:inline-flex;justify-content:space-between;align-items:center;box-sizing:border-box;border:none;background-color:',
														palette.palette
															.brand[800],
														';color:',
														palette.palette
															.brand[400],
														';cursor:pointer;transition:',
														transitions.p.medium,
														';text-decoration:none;white-space:nowrap;&:focus{',
														focus_halo.y,
														';}&:hover{background-color:',
														color_default()(
															palette.palette
																.brand[800],
															'hex',
														)
															.darken(0.1)
															.string(),
														';}',
														'',
													),
													children: 'Choose file',
												},
											),
											selectedFile &&
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													Button.z,
													{
														priority: 'subdued',
														cssOverrides: (0,
														emotion_react_browser_esm.iv)(
															'margin-left:',
															space.D[3],
															'px;text-decoration:underline;',
															'',
														),
														onClick: (event) => {
															event.preventDefault(),
																setSelectedFile(
																	void 0,
																);
														},
														children: 'Cancel',
													},
												),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'span',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														'display:inline-flex;margin-left:',
														space.D[3],
														'px;font-weight:normal;color:',
														props.inErrorState
															? palette.palette
																	.error[400]
															: palette.palette
																	.neutral[46],
														';',
														'',
													),
													children:
														null == selectedFile
															? void 0
															: selectedFile.name,
												},
											),
										],
									},
								),
							],
						})
					);
				};
			try {
				(UploadFileInput.displayName = 'UploadFileInput'),
					(UploadFileInput.__docgenInfo = {
						description: '',
						displayName: 'UploadFileInput',
						props: {
							title: {
								defaultValue: null,
								description: '',
								name: 'title',
								required: !0,
								type: { name: 'string' },
							},
							allowedFileFormats: {
								defaultValue: null,
								description: '',
								name: 'allowedFileFormats',
								required: !0,
								type: { name: 'string[]' },
							},
							changeSetState: {
								defaultValue: null,
								description: '',
								name: 'changeSetState',
								required: !1,
								type: { name: '((value: File) => void)' },
							},
							description: {
								defaultValue: null,
								description: '',
								name: 'description',
								required: !1,
								type: { name: 'string' },
							},
							optional: {
								defaultValue: null,
								description: '',
								name: 'optional',
								required: !1,
								type: { name: 'true' },
							},
							inErrorState: {
								defaultValue: null,
								description: '',
								name: 'inErrorState',
								required: !1,
								type: { name: 'boolean' },
							},
							errorMessage: {
								defaultValue: null,
								description: '',
								name: 'errorMessage',
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
							'client/components/helpCentre/contactUs/UploadFileInput.tsx#UploadFileInput'
						] = {
							docgenInfo: UploadFileInput.__docgenInfo,
							name: 'UploadFileInput',
							path: 'client/components/helpCentre/contactUs/UploadFileInput.tsx#UploadFileInput',
						});
			} catch (__react_docgen_typescript_loader_error) {}
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
			var contactUsForm_ref = {
					name: 'qamjgr',
					styles: 'margin-right:4px',
				},
				contactUsForm_ref2 = {
					name: '1y92lw7',
					styles: 'font-weight:normal;text-decoration:underline',
				},
				_ref3 = { name: 'qamjgr', styles: 'margin-right:4px' },
				_ref4 = {
					name: 'qa9897',
					styles: 'display:block;font-weight:normal',
				},
				ContactUsForm = (props) => {
					var _window,
						_window$guardian,
						_window$guardian$iden,
						_window$guardian2,
						_window$guardian2$ide,
						[captchaToken, setCaptchaToken] = (0, react.useState)(
							'',
						),
						[subject, setSubject] = (0, react.useState)(
							props.subject,
						),
						[name, setName] = (0, react.useState)(
							('undefined' != typeof window &&
								(null === (_window = window) ||
								void 0 === _window ||
								null ===
									(_window$guardian = _window.guardian) ||
								void 0 === _window$guardian ||
								null ===
									(_window$guardian$iden =
										_window$guardian.identityDetails) ||
								void 0 === _window$guardian$iden
									? void 0
									: _window$guardian$iden.displayName)) ||
								'',
						),
						[email, setEmail] = (0, react.useState)(
							('undefined' != typeof window &&
								(null ===
									(_window$guardian2 = window.guardian) ||
								void 0 === _window$guardian2 ||
								null ===
									(_window$guardian2$ide =
										_window$guardian2.identityDetails) ||
								void 0 === _window$guardian2$ide
									? void 0
									: _window$guardian2$ide.email)) ||
								'',
						),
						[message, setMessage] = (0, react.useState)(''),
						[
							messageRemainingCharacters,
							setMessageRemainingCharacters,
						] = (0, react.useState)(2500),
						[fileAttachment, setFileAttachment] = (0,
						react.useState)(),
						[status, setStatus] = (0, react.useState)('form'),
						[showCustomerServiceInfo, setShowCustomerServiceInfo] =
							(0, react.useState)(!1),
						[formValidationState, setFormValidationState] = (0,
						react.useState)({
							inValidationMode: !1,
							name: {
								isValid: !0,
								errorMessage:
									'You cannot leave this field empty',
							},
							email: {
								isValid: !0,
								errorMessage:
									'Please insert a valid email address.',
							},
							subject: {
								isValid: !0,
								errorMessage:
									'You cannot leave this field empty',
							},
							message: {
								isValid: !0,
								errorMessage:
									'You cannot leave this field empty',
							},
							captcha: {
								isValid: !!captchaToken.length,
								errorMessage:
									'Please confirm you are not a robot',
							},
							fileAttachment: {
								isValid: !0,
								errorMessage:
									'There is a maximum file size limit of 5mb',
							},
						}),
						validateForm = () => {
							var isNameValid = !!name.length,
								isEmailValid = ((email) =>
									/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i.test(
										email,
									))(email),
								isSubjectValid = !!subject.length,
								isDetailsValid = !!message.length,
								isFileAttachmentValid =
									void 0 === fileAttachment ||
									fileAttachment.size / 1024 <=
										fileUploadUtils.RM,
								isFormInValidState =
									isNameValid &&
									isEmailValid &&
									isSubjectValid &&
									isDetailsValid &&
									!!captchaToken.length &&
									isFileAttachmentValid;
							return (
								setFormValidationState(
									_objectSpread(
										_objectSpread({}, formValidationState),
										{},
										{
											inValidationMode:
												!isFormInValidState,
											name: _objectSpread(
												_objectSpread(
													{},
													formValidationState.name,
												),
												{},
												{ isValid: isNameValid },
											),
											email: _objectSpread(
												_objectSpread(
													{},
													formValidationState.email,
												),
												{},
												{ isValid: isEmailValid },
											),
											subject: _objectSpread(
												_objectSpread(
													{},
													formValidationState.subject,
												),
												{},
												{ isValid: isSubjectValid },
											),
											message: _objectSpread(
												_objectSpread(
													{},
													formValidationState.message,
												),
												{},
												{ isValid: isDetailsValid },
											),
											fileAttachment: _objectSpread(
												_objectSpread(
													{},
													formValidationState.fileAttachment,
												),
												{},
												{
													isValid:
														isFileAttachmentValid,
												},
											),
											captcha: _objectSpread(
												_objectSpread(
													{},
													formValidationState.captcha,
												),
												{},
												{
													isValid:
														!!captchaToken.length,
												},
											),
										},
									),
								),
								isFormInValidState
							);
						};
					(0, react.useEffect)(() => {
						if (window.grecaptcha) renderReCaptcha();
						else {
							var script = document.createElement('script');
							script.setAttribute(
								'src',
								'https://www.google.com/recaptcha/api.js?onload=v2ReCaptchaOnLoadCallback&render=explicit',
							),
								(window.v2ReCaptchaOnLoadCallback =
									renderReCaptcha),
								document.head.appendChild(script);
						}
					}, []),
						(0, react.useEffect)(() => {
							formValidationState.fileAttachment.isValid ||
								validateForm();
						});
					var renderReCaptcha = () => {
						var _window$guardian3;
						window.grecaptcha.render('recaptcha', {
							sitekey:
								null ===
									(_window$guardian3 = window.guardian) ||
								void 0 === _window$guardian3
									? void 0
									: _window$guardian3.recaptchaPublicKey,
							callback: (token) => setCaptchaToken(token),
						});
					};
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						'form',
						{
							onSubmit: (function () {
								var _ref5 = (function _asyncToGenerator(fn) {
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
								})(function* (event) {
									event.preventDefault(),
										validateForm() &&
											(setStatus('submitting'),
											props
												.submitCallback({
													name,
													subject,
													email,
													message,
													captchaToken,
													attachment:
														fileAttachment && {
															name: fileAttachment.name,
															contents: yield (0,
															fileUploadUtils.hu)(
																fileAttachment,
															),
														},
												})
												.then((success) => {
													success ||
														setStatus('failure');
												}));
								});
								return function (_x) {
									return _ref5.apply(this, arguments);
								};
							})(),
							css: (0, emotion_react_browser_esm.iv)(
								'margin-top:',
								space.D[9],
								'px;',
								'',
							),
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'fieldset',
									{
										onChange: () => {
											formValidationState.inValidationMode &&
												validateForm(),
												'failure' === status &&
													setStatus('form');
										},
										css: (0, emotion_react_browser_esm.iv)(
											'border:1px solid ',
											palette.palette.neutral[86],
											';margin:0 0 ',
											space.D[5],
											'px;padding:0;',
											'',
										),
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'legend',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														'display:block;width:100%;margin:0;padding:',
														space.D[3],
														'px;float:left;background-color:',
														palette.palette
															.neutral[97],
														';border-bottom:1px solid ',
														palette.palette
															.neutral[86],
														';',
														typography.Rcn,
														';',
														mq.Dp.tablet,
														'{padding:',
														space.D[3],
														'px ',
														space.D[5],
														'px;}',
														'',
													),
													children: props.title,
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'p',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														typography.Kz0,
														';margin:',
														space.D[5],
														"px;:before{display:block;content:'';clear:both;padding-top:",
														space.D[5],
														'px;}',
														'',
													),
													children:
														'Let us know the details of what you’d like to discuss and we will aim to get back to you as soon as possible. Please note if you are contacting us regarding an account you hold with us you will need to use the email you registered with.',
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												Input.I,
												{
													label: 'Full Name',
													width: 50,
													changeSetState: (newName) =>
														setName(
															newName.substring(
																0,
																50,
															),
														),
													value: name,
													additionalCss: (0,
													emotion_react_browser_esm.iv)(
														'margin:',
														space.D[5],
														'px;',
														'',
													),
													inErrorState:
														formValidationState.inValidationMode &&
														!formValidationState
															.name.isValid,
													errorMessage:
														formValidationState.name
															.errorMessage,
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												Input.I,
												{
													label: 'Email address',
													secondaryLabel:
														'If you are contacting us regarding an account you hold with us you must use the email you registered with',
													width: 50,
													changeSetState: (
														newEmail,
													) =>
														setEmail(
															newEmail.substring(
																0,
																50,
															),
														),
													value: email,
													additionalCss: (0,
													emotion_react_browser_esm.iv)(
														'margin:',
														space.D[5],
														'px;',
														'',
													),
													inErrorState:
														formValidationState.inValidationMode &&
														!formValidationState
															.email.isValid,
													errorMessage:
														formValidationState
															.email.errorMessage,
												},
											),
											props.editableSubject
												? (0,
												  emotion_react_jsx_runtime_browser_esm.tZ)(
														Input.I,
														{
															label: 'Subject of enquiry',
															type: 'text',
															width: 50,
															changeSetState: (
																newSubject,
															) =>
																setSubject(
																	newSubject.substring(
																		0,
																		100,
																	),
																),
															value: subject,
															additionalCss: (0,
															emotion_react_browser_esm.iv)(
																'margin:',
																space.D[5],
																'px;',
																'',
															),
															inErrorState:
																formValidationState.inValidationMode &&
																!formValidationState
																	.subject
																	.isValid,
															errorMessage:
																formValidationState
																	.subject
																	.errorMessage,
														},
												  )
												: (0,
												  emotion_react_jsx_runtime_browser_esm.BX)(
														'label',
														{
															css: (0,
															emotion_react_browser_esm.iv)(
																'display:block;color:',
																palette.palette
																	.neutral[7],
																';',
																typography.Rcn,
																';max-width:50ch;margin:',
																space.D[5],
																'px;',
																'',
															),
															children: [
																'Subject of enquiry',
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'span',
																	{
																		css: _ref4,
																		children:
																			subject,
																	},
																),
															],
														},
												  ),
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'label',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														'display:block;color:',
														palette.palette
															.neutral[7],
														';',
														typography.Rcn,
														';max-width:50ch;margin:',
														space.D[5],
														'px;',
														'',
													),
													children: [
														'Problem details',
														formValidationState.inValidationMode &&
															!formValidationState
																.message
																.isValid &&
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'span',
																{
																	css: (0,
																	emotion_react_browser_esm.iv)(
																		'display:block;color:',
																		palette
																			.palette
																			.error[400],
																		';font-weight:normal;',
																		'',
																	),
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'i',
																			{
																				css: _ref3,
																				children:
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						ErrorIcon.P,
																						{},
																					),
																			},
																		),
																		formValidationState
																			.message
																			.errorMessage,
																	],
																},
															),
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'textarea',
															{
																id: 'contact-us-message',
																name: 'message',
																rows: 2,
																maxLength: 2500,
																value: message,
																onChange: (
																	e,
																) => {
																	setMessage(
																		e.target
																			.value,
																	),
																		setMessageRemainingCharacters(
																			2500 -
																				e
																					.target
																					.value
																					.length,
																		);
																},
																css: (0,
																emotion_react_browser_esm.iv)(
																	'width:100%;border:',
																	formValidationState.inValidationMode &&
																		!formValidationState
																			.message
																			.isValid
																		? '4px solid '.concat(
																				palette
																					.palette
																					.error[400],
																		  )
																		: '2px solid '.concat(
																				palette
																					.palette
																					.neutral[60],
																		  ),
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
																children: [
																	messageRemainingCharacters,
																	' characters remaining',
																],
															},
														),
													],
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												UploadFileInput,
												{
													title: 'Upload image',
													optional: !0,
													description:
														'File must be in '.concat(
															fileUploadUtils.Tq.join(
																', ',
															).replace(
																/,(?=[^,]*$)/,
																' or ',
															),
															' format and less than 5MB',
														),
													allowedFileFormats:
														fileUploadUtils.Zt,
													changeSetState:
														setFileAttachment,
													inErrorState:
														formValidationState.inValidationMode &&
														!formValidationState
															.fileAttachment
															.isValid,
													errorMessage:
														formValidationState
															.fileAttachment
															.errorMessage,
													additionalCss: (0,
													emotion_react_browser_esm.iv)(
														'margin:',
														space.D[5],
														'px;',
														'',
													),
												},
											),
										],
									},
								),
								'failure' === status &&
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										FormError.X,
										{
											title: 'Something went wrong when submitting your form',
											messages: [
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													emotion_react_jsx_runtime_browser_esm.HY,
													{
														children: [
															'Please try again or if the problem persists please contact',
															' ',
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																Button.z,
																{
																	priority:
																		'subdued',
																	cssOverrides:
																		contactUsForm_ref2,
																	onClick:
																		() =>
																			setShowCustomerServiceInfo(
																				!0,
																			),
																	children:
																		'Customer Service',
																},
															),
														],
													},
												),
											],
										},
									),
								showCustomerServiceInfo &&
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										CallCenterEmailAndNumbers.K,
										{},
									),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'div',
									{
										css: (0, emotion_react_browser_esm.iv)(
											'margin:',
											space.D[5],
											'px 0;',
											'',
										),
										children: [
											formValidationState.inValidationMode &&
												!formValidationState.captcha
													.isValid &&
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'span',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															'display:block;color:',
															palette.palette
																.error[400],
															';',
															typography.Kz0,
															';',
															'',
														),
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'i',
																{
																	css: contactUsForm_ref,
																	children:
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			ErrorIcon.P,
																			{},
																		),
																},
															),
															formValidationState
																.captcha
																.errorMessage,
														],
													},
												),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'div',
												{ id: 'recaptcha' },
											),
										],
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									Button.z,
									{
										type: 'submit',
										iconSide: 'right',
										icon:
											'submitting' === status
												? (0,
												  emotion_react_jsx_runtime_browser_esm.tZ)(
														Spinner.$,
														{ scale: 0.5 },
												  )
												: void 0,
										disabled: 'submitting' === status,
										children: 'Submit',
									},
								),
							],
						},
					);
				};
			try {
				(ContactUsForm.displayName = 'ContactUsForm'),
					(ContactUsForm.__docgenInfo = {
						description: '',
						displayName: 'ContactUsForm',
						props: {
							submitCallback: {
								defaultValue: null,
								description: '',
								name: 'submitCallback',
								required: !0,
								type: {
									name: '(payload: ContactUsFormPayload) => Promise<boolean>',
								},
							},
							title: {
								defaultValue: null,
								description: '',
								name: 'title',
								required: !0,
								type: { name: 'string' },
							},
							subject: {
								defaultValue: null,
								description: '',
								name: 'subject',
								required: !0,
								type: { name: 'string' },
							},
							editableSubject: {
								defaultValue: null,
								description: '',
								name: 'editableSubject',
								required: !1,
								type: { name: 'boolean' },
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
							'client/components/helpCentre/contactUs/contactUsForm.tsx#ContactUsForm'
						] = {
							docgenInfo: ContactUsForm.__docgenInfo,
							name: 'ContactUsForm',
							path: 'client/components/helpCentre/contactUs/contactUsForm.tsx#ContactUsForm',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var LinkButton = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/button/LinkButton.js',
				),
				InfoIconDark = __webpack_require__(
					'./client/components/mma/shared/assets/InfoIconDark.tsx',
				),
				SelfServicePrompt = (props) => {
					var divCss = (0, emotion_react_browser_esm.iv)(
							'display:block;',
							typography.Rcn,
							';border:4px solid ',
							palette.palette.brand[500],
							';padding:',
							space.D[5],
							'px ',
							space.D[5],
							'px ',
							space.D[5],
							'px 53px;margin:',
							space.D[3],
							'px 0;position:relative;word-break:break-word;',
							props.additionalCss,
							';',
							'',
						),
						pCss = (0, emotion_react_browser_esm.iv)(
							'padding:0;margin:0 0 ',
							space.D[5],
							'px 0;',
							'',
						),
						linkCss = (0, emotion_react_browser_esm.iv)(
							'margin-top:',
							space.D[5],
							'px;text-decoration:underline;font-weight:normal;color:',
							palette.palette.brand[500],
							';',
							'',
						),
						onServicelinkClick = () =>
							(0, analytics.L9)({
								eventCategory: 'ContactUs',
								eventAction: 'servicelink_click',
								eventLabel: props.topicReferer,
							});
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						'div',
						{
							css: divCss,
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'i',
									{
										css: (0, emotion_react_browser_esm.iv)(
											'width:21px;height:21px;position:absolute;top:',
											space.D[5],
											'px;left:',
											space.D[5],
											'px;',
											'',
										),
										children: (0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											InfoIconDark.J,
											{
												fillColor:
													palette.palette.brand[500],
											},
										),
									},
								),
								props.copy.map((paragraph, index) =>
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'p',
										{ css: pCss, children: paragraph },
										'ssb-'.concat(index),
									),
								),
								props.showContacts &&
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										CallCenterEmailAndNumbers.K,
										{},
									),
								props.linkAsButton
									? (0,
									  emotion_react_jsx_runtime_browser_esm.tZ)(
											LinkButton.Q,
											{
												href: props.linkHref,
												cssOverrides: (0,
												emotion_react_browser_esm.iv)(
													'margin-top:',
													space.D[5],
													'px;',
													'',
												),
												onClick: onServicelinkClick,
												children: props.linkCopy,
											},
									  )
									: (0,
									  emotion_react_jsx_runtime_browser_esm.BX)(
											'a',
											{
												href: props.linkHref,
												onClick: onServicelinkClick,
												css: linkCss,
												children: [
													props.linkCopy,
													' >',
												],
											},
									  ),
							],
						},
					);
				};
			try {
				(SelfServicePrompt.displayName = 'SelfServicePrompt'),
					(SelfServicePrompt.__docgenInfo = {
						description: '',
						displayName: 'SelfServicePrompt',
						props: {
							copy: {
								defaultValue: null,
								description: '',
								name: 'copy',
								required: !0,
								type: { name: 'string[]' },
							},
							linkCopy: {
								defaultValue: null,
								description: '',
								name: 'linkCopy',
								required: !0,
								type: { name: 'string' },
							},
							linkHref: {
								defaultValue: null,
								description: '',
								name: 'linkHref',
								required: !0,
								type: { name: 'string' },
							},
							topicReferer: {
								defaultValue: null,
								description: '',
								name: 'topicReferer',
								required: !0,
								type: { name: 'string' },
							},
							linkAsButton: {
								defaultValue: null,
								description: '',
								name: 'linkAsButton',
								required: !1,
								type: { name: 'boolean' },
							},
							showContacts: {
								defaultValue: null,
								description: '',
								name: 'showContacts',
								required: !1,
								type: { name: 'boolean' },
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
							'client/components/helpCentre/contactUs/SelfServicePrompt.tsx#SelfServicePrompt'
						] = {
							docgenInfo: SelfServicePrompt.__docgenInfo,
							name: 'SelfServicePrompt',
							path: 'client/components/helpCentre/contactUs/SelfServicePrompt.tsx#SelfServicePrompt',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var RadioGroup = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/radio/RadioGroup.js',
				),
				Radio = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/radio/Radio.js',
				);
			var SubTopicForm_ref = {
					name: 'w2iqra',
					styles: 'vertical-align:top;text-transform:lowercase;:checked+div label:first-of-type{font-weight:bold;}',
				},
				SubTopicForm_ref2 = { name: '4zleql', styles: 'display:block' },
				SubTopicForm = (props) => {
					var [selectedId, setSelectedId] = (0, react.useState)(
							props.preSelectedId || props.data[0].id,
						),
						[requiresSubmitButton, setRequiresSubmitButton] = (0,
						react.useState)(!props.preSelectedId);
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						'form',
						{
							onSubmit: (event) => {
								event.preventDefault(),
									setRequiresSubmitButton(!1),
									props.submitCallback(selectedId);
							},
							css: (0, emotion_react_browser_esm.iv)(
								'margin-top:',
								space.D[9],
								'px;',
								'',
							),
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'fieldset',
									{
										css: (0, emotion_react_browser_esm.iv)(
											'border:1px solid ',
											palette.palette.neutral[86],
											';margin:0 0 ',
											space.D[5],
											'px;padding:0;',
											'',
										),
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'legend',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														'display:block;width:100%;margin:0;padding:',
														space.D[3],
														'px;float:left;background-color:',
														palette.palette
															.neutral[97],
														';border-bottom:1px solid ',
														palette.palette
															.neutral[86],
														';',
														typography.Rcn,
														';',
														mq.Dp.tablet,
														'{padding:',
														space.D[3],
														'px ',
														space.D[5],
														'px;}',
														'',
													),
													children: props.title,
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												RadioGroup.E,
												{
													name: 'issue_type',
													orientation: 'vertical',
													cssOverrides:
														SubTopicForm_ref2,
													children: (0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'ul',
														{
															css: (0,
															emotion_react_browser_esm.iv)(
																'list-style:none;padding:',
																space.D[3],
																'px;margin:0;clear:left;',
																mq.Dp.tablet,
																'{padding:',
																space.D[5],
																'px;}',
																'',
															),
															children:
																props.data.map(
																	(
																		subTopic,
																	) =>
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'li',
																			{
																				css: (0,
																				emotion_react_browser_esm.iv)(
																					typography.Kz0,
																					';',
																					'',
																				),
																				children:
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						Radio.Y,
																						{
																							value: subTopic.id,
																							label: subTopic.name,
																							checked:
																								subTopic.id ===
																								selectedId,
																							cssOverrides:
																								SubTopicForm_ref,
																							onChange:
																								(
																									event,
																								) => {
																									setSelectedId(
																										event
																											.target
																											.value,
																									),
																										requiresSubmitButton ||
																											props.submitCallback(
																												event
																													.target
																													.value,
																											);
																								},
																						},
																					),
																			},
																			subTopic.id,
																		),
																),
														},
													),
												},
											),
										],
									},
								),
								requiresSubmitButton &&
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										Button.z,
										{
											type: 'submit',
											children: props.submitButonText,
										},
									),
							],
						},
					);
				};
			try {
				(SubTopicForm.displayName = 'SubTopicForm'),
					(SubTopicForm.__docgenInfo = {
						description: '',
						displayName: 'SubTopicForm',
						props: {
							title: {
								defaultValue: null,
								description: '',
								name: 'title',
								required: !0,
								type: { name: 'string' },
							},
							submitButonText: {
								defaultValue: null,
								description: '',
								name: 'submitButonText',
								required: !0,
								type: { name: 'string' },
							},
							data: {
								defaultValue: null,
								description: '',
								name: 'data',
								required: !0,
								type: { name: 'SubTopic[]' },
							},
							preSelectedId: {
								defaultValue: null,
								description: '',
								name: 'preSelectedId',
								required: !1,
								type: { name: 'string' },
							},
							submitCallback: {
								defaultValue: null,
								description: '',
								name: 'submitCallback',
								required: !0,
								type: { name: '(subTopicId: string) => void' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/helpCentre/contactUs/SubTopicForm.tsx#SubTopicForm'
						] = {
							docgenInfo: SubTopicForm.__docgenInfo,
							name: 'SubTopicForm',
							path: 'client/components/helpCentre/contactUs/SubTopicForm.tsx#SubTopicForm',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var colour_palette = __webpack_require__(
				'./node_modules/@guardian/source/dist/foundations/__deprecated__/colour/palette.js',
			);
			var CommentsIcon_ref = {
					name: '1soh0gv',
					styles: 'margin-top:4px',
				},
				CommentsIcon = (props) =>
					(0, emotion_react_jsx_runtime_browser_esm.tZ)('svg', {
						width: '18',
						height: '17',
						viewBox: '0 0 18 17',
						fill: 'none',
						css: CommentsIcon_ref,
						children: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							'path',
							{
								fillRule: 'evenodd',
								clipRule: 'evenodd',
								d: 'M17.9999 1.49999L16.4999 0H1.49999L0 1.49999V10.5L1.475 12H3.99999V16.9999H4.97498L7.99997 12H16.4999L17.9999 10.5V1.49999Z',
								fill:
									props.overrideFillColor ||
									palette.palette.brand[400],
							},
						),
					});
			try {
				(CommentsIcon.displayName = 'CommentsIcon'),
					(CommentsIcon.__docgenInfo = {
						description: '',
						displayName: 'CommentsIcon',
						props: {
							overrideFillColor: {
								defaultValue: null,
								description: '',
								name: 'overrideFillColor',
								required: !1,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/assets/CommentsIcon.tsx#CommentsIcon'
						] = {
							docgenInfo: CommentsIcon.__docgenInfo,
							name: 'CommentsIcon',
							path: 'client/components/mma/shared/assets/CommentsIcon.tsx#CommentsIcon',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var CreditCardIcon = __webpack_require__(
					'./client/components/mma/shared/assets/CreditCardIcon.tsx',
				),
				DeliveryIcon = (props) =>
					(0, emotion_react_jsx_runtime_browser_esm.tZ)('svg', {
						width: '20',
						height: '14',
						viewBox: '0 0 20 14',
						fill: 'none',
						children: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							'path',
							{
								fillRule: 'evenodd',
								clipRule: 'evenodd',
								d: 'M0.563965 2.36415L2.08198 0.84613H12.2293L13.6922 2.30898V4.94877H13.8718H15.4359C17.6451 4.94877 19.4359 6.73963 19.4359 8.94877V11.2674L18.4884 12.3334H16.9044C16.9498 12.4617 16.9745 12.5998 16.9745 12.7436C16.9745 13.4234 16.4234 13.9744 15.7437 13.9744C15.064 13.9744 14.5129 13.4234 14.5129 12.7436C14.5129 12.5998 14.5376 12.4617 14.5829 12.3334H13.8718H13.6923V12.3334H12.0512V12.3333H5.41703C5.4624 12.4616 5.48708 12.5997 5.48708 12.7436C5.48708 13.4234 4.93605 13.9744 4.25631 13.9744C3.57658 13.9744 3.02554 13.4234 3.02554 12.7436C3.02554 12.5997 3.05023 12.4616 3.09559 12.3333H1.99978L0.563965 10.8975V2.36415ZM13.8718 11.3334V5.94877H15.4359C17.0928 5.94877 18.4359 7.29191 18.4359 8.94877V10.8872L18.0393 11.3334H13.8718Z',
								fill:
									props.overrideFillColor ||
									palette.palette.brand[400],
							},
						),
					});
			try {
				(DeliveryIcon.displayName = 'DeliveryIcon'),
					(DeliveryIcon.__docgenInfo = {
						description: '',
						displayName: 'DeliveryIcon',
						props: {
							overrideFillColor: {
								defaultValue: null,
								description: '',
								name: 'overrideFillColor',
								required: !1,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/assets/DeliveryIcon.tsx#DeliveryIcon'
						] = {
							docgenInfo: DeliveryIcon.__docgenInfo,
							name: 'DeliveryIcon',
							path: 'client/components/mma/shared/assets/DeliveryIcon.tsx#DeliveryIcon',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var NewspaperIcon_ref = {
					name: 's079uh',
					styles: 'margin-top:2px',
				},
				NewspaperIcon = (props) =>
					(0, emotion_react_jsx_runtime_browser_esm.tZ)('svg', {
						width: '20',
						height: '16',
						viewBox: '0 0 20 16',
						fill: 'none',
						css: NewspaperIcon_ref,
						children: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							'path',
							{
								fillRule: 'evenodd',
								clipRule: 'evenodd',
								d: 'M9.99986 15.6154H10.218L18.536 13.7499L19.4358 12.685V1.08267L17.954 0.0256348L9.99986 2.03793L2.04575 0.0256348L0.563965 1.08267V12.685L1.46374 13.7499L9.78172 15.6154H9.99986ZM8.93189 4.43502C9.02168 4.10722 8.82796 3.77164 8.4992 3.68548L3.12565 2.27708C2.79688 2.19091 2.45758 2.38678 2.36779 2.71457C2.27799 3.04237 2.47172 3.37795 2.80048 3.46411L8.17403 4.87251C8.50279 4.95868 8.8421 4.76281 8.93189 4.43502ZM8.93189 7.12883C9.02168 6.80103 8.82796 6.46545 8.4992 6.37928L3.12565 4.97089C2.79688 4.88472 2.45758 5.08059 2.36779 5.40838C2.27799 5.73618 2.47172 6.07176 2.80048 6.15792L8.17403 7.56632C8.50279 7.65249 8.8421 7.45662 8.93189 7.12883ZM8.93189 9.82279C9.02168 9.495 8.82796 9.15941 8.4992 9.07325L3.12565 7.66485C2.79688 7.57868 2.45758 7.77455 2.36779 8.10234C2.27799 8.43014 2.47172 8.76572 2.80048 8.85188L8.17403 10.2603C8.50279 10.3465 8.8421 10.1506 8.93189 9.82279ZM8.93189 12.56C9.02168 12.2322 8.82796 11.8966 8.4992 11.8105L3.12565 10.4021C2.79688 10.3159 2.45758 10.5118 2.36779 10.8396C2.27799 11.1674 2.47172 11.5029 2.80048 11.5891L8.17403 12.9975C8.50279 13.0837 8.8421 12.8878 8.93189 12.56ZM11.0681 4.43502C10.9783 4.10722 11.172 3.77164 11.5007 3.68548L16.8743 2.27708C17.2031 2.19091 17.5424 2.38678 17.6322 2.71457C17.7219 3.04237 17.5282 3.37795 17.1995 3.46411L11.8259 4.87251C11.4972 4.95868 11.1578 4.76281 11.0681 4.43502ZM11.0681 7.12883C10.9783 6.80103 11.172 6.46545 11.5007 6.37928L16.8743 4.97089C17.2031 4.88472 17.5424 5.08059 17.6322 5.40838C17.7219 5.73618 17.5282 6.07176 17.1995 6.15792L11.8259 7.56632C11.4972 7.65249 11.1578 7.45662 11.0681 7.12883ZM11.0681 9.82279C10.9783 9.495 11.172 9.15941 11.5007 9.07325L16.8743 7.66485C17.2031 7.57868 17.5424 7.77455 17.6322 8.10234C17.7219 8.43014 17.5282 8.76572 17.1995 8.85188L11.8259 10.2603C11.4972 10.3465 11.1578 10.1506 11.0681 9.82279ZM11.0681 12.56C10.9783 12.2322 11.172 11.8966 11.5007 11.8105L11.9485 11.6931C12.2773 11.6069 12.6166 11.8028 12.7064 12.1306C12.7962 12.4584 12.6025 12.794 12.2737 12.8801L11.8259 12.9975C11.4972 13.0837 11.1578 12.8878 11.0681 12.56ZM13.307 11.9732C13.2172 11.6454 13.411 11.3098 13.7397 11.2236L14.6353 10.9889C14.9641 10.9027 15.3034 11.0986 15.3932 11.4264C15.483 11.7542 15.2892 12.0898 14.9605 12.1759L14.0649 12.4107C13.7361 12.4968 13.3968 12.301 13.307 11.9732ZM15.9938 11.269C15.904 10.9412 16.0977 10.6056 16.4265 10.5194L16.8743 10.4021C17.2031 10.3159 17.5424 10.5118 17.6322 10.8396C17.7219 11.1674 17.5282 11.5029 17.1995 11.5891L16.7517 11.7065C16.4229 11.7926 16.0836 11.5968 15.9938 11.269Z',
								fill:
									props.overrideFillColor ||
									palette.palette.brand[400],
							},
						),
					});
			try {
				(NewspaperIcon.displayName = 'NewspaperIcon'),
					(NewspaperIcon.__docgenInfo = {
						description: '',
						displayName: 'NewspaperIcon',
						props: {
							overrideFillColor: {
								defaultValue: null,
								description: '',
								name: 'overrideFillColor',
								required: !1,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/assets/NewspaperIcon.tsx#NewspaperIcon'
						] = {
							docgenInfo: NewspaperIcon.__docgenInfo,
							name: 'NewspaperIcon',
							path: 'client/components/mma/shared/assets/NewspaperIcon.tsx#NewspaperIcon',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var NewspaperVoucherIcon = (props) =>
				(0, emotion_react_jsx_runtime_browser_esm.BX)('svg', {
					width: '16',
					height: '18',
					viewBox: '0 0 15 18',
					fill: 'none',
					children: [
						(0, emotion_react_jsx_runtime_browser_esm.tZ)('path', {
							fillRule: 'evenodd',
							clipRule: 'evenodd',
							d: 'M15.1579 17.1L14.2342 18H0.947368L0 17.1V0.9L0.947368 0H11.3921L15.1579 3.6V17.1Z',
							fill:
								props.overrideFillColor ||
								palette.palette.brand[400],
						}),
						(0, emotion_react_jsx_runtime_browser_esm.tZ)('path', {
							fillRule: 'evenodd',
							clipRule: 'evenodd',
							d: 'M13.263 5.6842H1.89453V6.63157H13.263V5.6842Z',
							fill: '#052962',
						}),
						(0, emotion_react_jsx_runtime_browser_esm.tZ)('path', {
							fillRule: 'evenodd',
							clipRule: 'evenodd',
							d: 'M13.263 8.52631H1.89453V9.47367H13.263V8.52631Z',
							fill: '#052962',
						}),
						(0, emotion_react_jsx_runtime_browser_esm.tZ)('path', {
							fillRule: 'evenodd',
							clipRule: 'evenodd',
							d: 'M8.52611 11.3684H1.89453V12.3158H8.52611V11.3684Z',
							fill: '#052962',
						}),
					],
				});
			try {
				(NewspaperVoucherIcon.displayName = 'NewspaperVoucherIcon'),
					(NewspaperVoucherIcon.__docgenInfo = {
						description: '',
						displayName: 'NewspaperVoucherIcon',
						props: {
							overrideFillColor: {
								defaultValue: null,
								description: '',
								name: 'overrideFillColor',
								required: !1,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/assets/NewspaperVoucherIcon.tsx#NewspaperVoucherIcon'
						] = {
							docgenInfo: NewspaperVoucherIcon.__docgenInfo,
							name: 'NewspaperVoucherIcon',
							path: 'client/components/mma/shared/assets/NewspaperVoucherIcon.tsx#NewspaperVoucherIcon',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var OtherIcon = (props) =>
				(0, emotion_react_jsx_runtime_browser_esm.tZ)('svg', {
					width: '30',
					height: '30',
					viewBox: '0 0 30 30',
					fill: 'none',
					children: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						'path',
						{
							fillRule: 'evenodd',
							clipRule: 'evenodd',
							d: 'M9.99998 13.7L9.29999 13H5.7L5 13.7V17.3L5.7 18H9.29999L9.99998 17.3V13.7ZM17.4 13.7L16.7 13H13.1L12.4 13.7V17.3L13.1 18H16.7L17.4 17.3V13.7ZM24.7999 13.7L24.0999 13H20.4999L19.7999 13.7V17.3L20.4999 18H24.0999L24.7999 17.3V13.7Z',
							fill:
								props.overrideFillColor ||
								palette.palette.brand[400],
						},
					),
				});
			try {
				(OtherIcon.displayName = 'OtherIcon'),
					(OtherIcon.__docgenInfo = {
						description: '',
						displayName: 'OtherIcon',
						props: {
							overrideFillColor: {
								defaultValue: null,
								description: '',
								name: 'overrideFillColor',
								required: !1,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/assets/OtherIcon.tsx#OtherIcon'
						] = {
							docgenInfo: OtherIcon.__docgenInfo,
							name: 'OtherIcon',
							path: 'client/components/mma/shared/assets/OtherIcon.tsx#OtherIcon',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var ProfileIcon = __webpack_require__(
					'./client/components/mma/shared/assets/ProfileIcon.tsx',
				),
				TechIcon = (props) =>
					(0, emotion_react_jsx_runtime_browser_esm.tZ)('svg', {
						width: '20',
						height: '20',
						viewBox: '0 0 22 22',
						fill: 'none',
						children: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							'path',
							{
								fillRule: 'evenodd',
								clipRule: 'evenodd',
								d: 'M19.7499 13.225C19.5749 14.05 19.1999 14.8749 18.8249 15.5749L19.9999 17.4749C19.2999 18.3999 18.4249 19.2749 17.5249 19.9499L15.6249 18.7249C14.8499 19.1499 14.1 19.4749 13.275 19.7499L12.8 21.8749C12.225 21.9749 11.675 22.0499 11.05 22.0499C10.475 22.0499 9.82497 21.9749 9.29997 21.8749L8.82497 19.6999C7.99997 19.4749 7.17498 19.1499 6.47498 18.7249L4.57498 19.9499C3.64999 19.2499 2.77499 18.3999 2.09999 17.4749L3.32499 15.5499C2.89999 14.8749 2.57499 14.05 2.34999 13.225L0.174999 12.75C0.0749997 12.225 0 11.575 0 11C0 10.375 0.0749997 9.82497 0.174999 9.24997L2.34999 8.77497C2.57499 7.94997 2.89999 7.17498 3.32499 6.42498L2.09999 4.52498C2.77499 3.62499 3.64999 2.74999 4.57498 2.04999L6.47498 3.22499C7.17498 2.84999 7.99997 2.47499 8.82497 2.29999L9.29997 0.0749997C9.82497 0 10.475 0 11.05 0C11.625 0 12.225 0.0249999 12.8 0.0749997L13.275 2.29999C14.1 2.47499 14.8499 2.84999 15.6249 3.22499L17.5249 2.04999C18.4499 2.77499 19.2749 3.59999 19.9999 4.52498L18.8249 6.42498C19.1999 7.14998 19.5749 7.94997 19.7499 8.77497L21.9749 9.24997C22.0249 9.82497 22.0499 10.425 22.0499 11C22.0499 11.6 22.0249 12.175 21.9749 12.75L19.7499 13.225ZM11.05 18.0749C14.9499 18.0749 18.1249 14.8999 18.1249 11C18.1249 7.09998 14.9499 3.92499 11.05 3.92499C7.14998 3.92499 3.97499 7.09998 3.97499 11C3.97499 14.8999 7.14998 18.0749 11.05 18.0749Z',
								fill:
									props.overrideFillColor ||
									colour_palette.UQ[400],
							},
						),
					});
			try {
				(TechIcon.displayName = 'TechIcon'),
					(TechIcon.__docgenInfo = {
						description: '',
						displayName: 'TechIcon',
						props: {
							overrideFillColor: {
								defaultValue: null,
								description: '',
								name: 'overrideFillColor',
								required: !1,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/helpCentre/contactUs/TechIcon.tsx#TechIcon'
						] = {
							docgenInfo: TechIcon.__docgenInfo,
							name: 'TechIcon',
							path: 'client/components/helpCentre/contactUs/TechIcon.tsx#TechIcon',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var TopicIcon = (props) => {
				switch (props.id) {
					case 'delivery':
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							DeliveryIcon,
							{ overrideFillColor: colour_palette.n$[100] },
						);
					case 'billing':
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							CreditCardIcon.c,
							{ overrideFillColor: colour_palette.n$[100] },
						);
					case 'vouchers':
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							NewspaperVoucherIcon,
							{ overrideFillColor: colour_palette.n$[100] },
						);
					case 'account':
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							ProfileIcon.m,
							{ overrideFillColor: colour_palette.n$[100] },
						);
					case 'tech':
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							TechIcon,
							{ overrideFillColor: colour_palette.n$[100] },
						);
					case 'journalism':
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							NewspaperIcon,
							{ overrideFillColor: colour_palette.n$[100] },
						);
					case 'comments':
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							CommentsIcon,
							{ overrideFillColor: colour_palette.n$[100] },
						);
					case 'other':
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							OtherIcon,
							{ overrideFillColor: colour_palette.n$[100] },
						);
				}
				return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
					emotion_react_jsx_runtime_browser_esm.HY,
					{},
				);
			};
			try {
				(TopicIcon.displayName = 'TopicIcon'),
					(TopicIcon.__docgenInfo = {
						description: '',
						displayName: 'TopicIcon',
						props: {
							id: {
								defaultValue: null,
								description: '',
								name: 'id',
								required: !0,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/helpCentre/contactUs/TopicIcon.tsx#TopicIcon'
						] = {
							docgenInfo: TopicIcon.__docgenInfo,
							name: 'TopicIcon',
							path: 'client/components/helpCentre/contactUs/TopicIcon.tsx#TopicIcon',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var TopicButton = (props) =>
				(0, emotion_react_jsx_runtime_browser_esm.BX)('div', {
					onClick: () => {
						props.updateCallback(props.id);
					},
					css: (0, emotion_react_browser_esm.iv)(
						'flex:1 0 50%;max-width:calc(50% - ',
						space.D[3] / 2,
						'px);',
						mq.Dp.desktop,
						'{flex:1 0 25%;max-width:calc(25% - ',
						space.D[2],
						'px);}margin-bottom:',
						space.D[3],
						'px;border-radius:4px;background-color:',
						props.isSelected ? '#e3f6ff' : '#F6F6F6',
						';padding:',
						space.D[5],
						'px ',
						space.D[3],
						'px;',
						typography.Rcn,
						';color:#052962;text-align:center;cursor:',
						props.isSelected ? 'auto' : 'pointer',
						';transition:background-color 0.5s;box-shadow:',
						props.isSelected
							? 'inset 0px 0px 0px 3px #007ABC'
							: 'none',
						';:hover{background-color:#e3f6ff;}',
						'',
					),
					children: [
						(0, emotion_react_jsx_runtime_browser_esm.tZ)('div', {
							css: (0, emotion_react_browser_esm.iv)(
								'display:flex;align-items:center;justify-content:center;width:32px;height:32px;margin:0 auto ',
								space.D[2],
								'px;border-radius:50%;background-color:#052962;',
								'',
							),
							children: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								TopicIcon,
								{ id: props.id },
							),
						}),
						props.name,
					],
				});
			try {
				(TopicButton.displayName = 'TopicButton'),
					(TopicButton.__docgenInfo = {
						description: '',
						displayName: 'TopicButton',
						props: {
							id: {
								defaultValue: null,
								description: '',
								name: 'id',
								required: !0,
								type: { name: 'string' },
							},
							updateCallback: {
								defaultValue: null,
								description: '',
								name: 'updateCallback',
								required: !0,
								type: { name: '(topicId: string) => void' },
							},
							isSelected: {
								defaultValue: null,
								description: '',
								name: 'isSelected',
								required: !1,
								type: { name: 'boolean' },
							},
							enquiryLabel: {
								defaultValue: null,
								description: '',
								name: 'enquiryLabel',
								required: !0,
								type: { name: 'string' },
							},
							subtopics: {
								defaultValue: null,
								description: '',
								name: 'subtopics',
								required: !1,
								type: { name: 'SubTopic[]' },
							},
							subTopicsTitle: {
								defaultValue: null,
								description: '',
								name: 'subTopicsTitle',
								required: !1,
								type: { name: 'string' },
							},
							name: {
								defaultValue: null,
								description: '',
								name: 'name',
								required: !0,
								type: { name: 'string' },
							},
							selfServiceBox: {
								defaultValue: null,
								description: '',
								name: 'selfServiceBox',
								required: !1,
								type: { name: 'SelfServiceBox' },
							},
							editableSubject: {
								defaultValue: null,
								description: '',
								name: 'editableSubject',
								required: !1,
								type: { name: 'boolean' },
							},
							noForm: {
								defaultValue: null,
								description: '',
								name: 'noForm',
								required: !1,
								type: { name: 'boolean' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/helpCentre/contactUs/TopicButton.tsx#TopicButton'
						] = {
							docgenInfo: TopicButton.__docgenInfo,
							name: 'TopicButton',
							path: 'client/components/helpCentre/contactUs/TopicButton.tsx#TopicButton',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			function TopicForm_ownKeys(e, r) {
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
			function TopicForm_objectSpread(e) {
				for (var r = 1; r < arguments.length; r++) {
					var t = null != arguments[r] ? arguments[r] : {};
					r % 2
						? TopicForm_ownKeys(Object(t), !0).forEach(function (
								r,
						  ) {
								TopicForm_defineProperty(e, r, t[r]);
						  })
						: Object.getOwnPropertyDescriptors
						? Object.defineProperties(
								e,
								Object.getOwnPropertyDescriptors(t),
						  )
						: TopicForm_ownKeys(Object(t)).forEach(function (r) {
								Object.defineProperty(
									e,
									r,
									Object.getOwnPropertyDescriptor(t, r),
								);
						  });
				}
				return e;
			}
			function TopicForm_defineProperty(obj, key, value) {
				return (
					(key = (function TopicForm_toPropertyKey(arg) {
						var key = (function TopicForm_toPrimitive(input, hint) {
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
			var TopicForm_ref = {
					name: '37i6da',
					styles: 'display:flex;flex-wrap:wrap;align-items:stretch;justify-content:space-between',
				},
				TopicForm = (props) => {
					var [selectedId, setSelectedId] = (0, react.useState)(
							props.preSelectedId || props.data[0].id,
						),
						[requiresSubmitButton, setRequiresSubmitButton] = (0,
						react.useState)(!props.preSelectedId);
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'h2',
									{
										css: (0, emotion_react_browser_esm.iv)(
											typography.fy7,
											';border-top:1px solid ',
											palette.palette.neutral[86],
											';margin-top:',
											space.D[6],
											'px;padding:',
											space.D[1],
											'px 0;',
											mq.Dp.desktop,
											'{margin-top:',
											space.D[9],
											'px;}',
											'',
										),
										children:
											'Choose a topic you would like to discuss',
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'div',
									{
										css: TopicForm_ref,
										children: props.data.map((topic) =>
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												TopicButton,
												TopicForm_objectSpread(
													TopicForm_objectSpread(
														{},
														topic,
													),
													{},
													{
														id: topic.id,
														updateCallback: (
															newId,
														) => {
															setSelectedId(
																newId,
															),
																requiresSubmitButton ||
																	props.submitCallback(
																		newId,
																	);
														},
														isSelected:
															topic.id ===
															selectedId,
													},
												),
												topic.id,
											),
										),
									},
								),
								requiresSubmitButton &&
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										Button.z,
										{
											cssOverrides: (0,
											emotion_react_browser_esm.iv)(
												'margin-top:',
												space.D[6],
												'px;',
												'',
											),
											onClick: () => {
												setRequiresSubmitButton(!1),
													props.submitCallback(
														selectedId,
													);
											},
											children: 'Begin form',
										},
									),
							],
						},
					);
				};
			try {
				(TopicForm.displayName = 'TopicForm'),
					(TopicForm.__docgenInfo = {
						description: '',
						displayName: 'TopicForm',
						props: {
							submitCallback: {
								defaultValue: null,
								description: '',
								name: 'submitCallback',
								required: !0,
								type: { name: '(topicId: string) => void' },
							},
							data: {
								defaultValue: null,
								description: '',
								name: 'data',
								required: !0,
								type: { name: 'Topic[]' },
							},
							preSelectedId: {
								defaultValue: null,
								description: '',
								name: 'preSelectedId',
								required: !1,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/helpCentre/contactUs/TopicForm.tsx#TopicForm'
						] = {
							docgenInfo: TopicForm.__docgenInfo,
							name: 'TopicForm',
							path: 'client/components/helpCentre/contactUs/TopicForm.tsx#TopicForm',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			function ContactUs_ownKeys(e, r) {
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
			function ContactUs_objectSpread(e) {
				for (var r = 1; r < arguments.length; r++) {
					var t = null != arguments[r] ? arguments[r] : {};
					r % 2
						? ContactUs_ownKeys(Object(t), !0).forEach(function (
								r,
						  ) {
								ContactUs_defineProperty(e, r, t[r]);
						  })
						: Object.getOwnPropertyDescriptors
						? Object.defineProperties(
								e,
								Object.getOwnPropertyDescriptors(t),
						  )
						: ContactUs_ownKeys(Object(t)).forEach(function (r) {
								Object.defineProperty(
									e,
									r,
									Object.getOwnPropertyDescriptor(t, r),
								);
						  });
				}
				return e;
			}
			function ContactUs_defineProperty(obj, key, value) {
				return (
					(key = (function ContactUs_toPropertyKey(arg) {
						var key = (function ContactUs_toPrimitive(input, hint) {
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
			function ContactUs_asyncGeneratorStep(
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
			var ContactUs = () => {
				var {
						urlTopicId,
						urlSubTopicId,
						urlSubSubTopicId,
						urlSuccess,
					} = (0, react_router.UO)(),
					navigate = (0, react_router.s0)(),
					currentTopic = contactUsConfig.find(
						(topic) => topic.id === urlTopicId,
					),
					subTopics =
						null == currentTopic ? void 0 : currentTopic.subtopics,
					currentSubTopic =
						null == subTopics
							? void 0
							: subTopics.find(
									(subTopic) => subTopic.id === urlSubTopicId,
							  ),
					subSubTopics =
						null == currentSubTopic
							? void 0
							: currentSubTopic.subsubtopics,
					currentSubSubTopic =
						null == subSubTopics
							? void 0
							: subSubTopics.find(
									(subSubTopic) =>
										subSubTopic.id === urlSubSubTopicId,
							  ),
					success = '1' === urlSuccess,
					headerText = success
						? 'Thank you for contacting us'
						: 'We are here to help',
					containerText = success
						? 'Thank you for contacting us regarding '.concat(
								null == currentTopic
									? void 0
									: currentTopic.enquiryLabel,
								'. We will send a confirmation email detailing your request and aim to get back to you within 48 hours.',
						  )
						: 'Visit our help centre to view our commonly asked questions, or continue below to use our contact form. It only takes a few minutes.',
					subTopicsTitle =
						(null == currentTopic
							? void 0
							: currentTopic.subTopicsTitle) || '',
					subSubTopicsTitle =
						(null == currentSubTopic
							? void 0
							: currentSubTopic.subsubTopicsTitle) || '',
					selfServiceBox =
						(null == currentSubSubTopic
							? void 0
							: currentSubSubTopic.selfServiceBox) ||
						(null == currentSubTopic
							? void 0
							: currentSubTopic.selfServiceBox) ||
						(null == currentTopic
							? void 0
							: currentTopic.selfServiceBox),
					showForm =
						(currentSubSubTopic &&
							!(
								null != currentSubSubTopic &&
								currentSubSubTopic.noForm
							)) ||
						(currentSubTopic &&
							!(
								null != currentSubTopic &&
								currentSubTopic.noForm
							) &&
							!subSubTopics) ||
						(currentTopic &&
							!(null != currentTopic && currentTopic.noForm) &&
							!subTopics),
					subject = ''
						.concat(currentTopic ? currentTopic.name : '')
						.concat(
							currentSubSubTopic
								? ' - '.concat(currentSubSubTopic.name)
								: '',
						)
						.concat(
							!currentSubSubTopic && currentSubTopic
								? ' - '.concat(currentSubTopic.name)
								: '',
						),
					isSubjectEditable = !!(
						(null != currentSubSubTopic &&
							currentSubSubTopic.editableSubject) ||
						(null != currentSubTopic &&
							currentSubTopic.editableSubject) ||
						(null != currentTopic && currentTopic.editableSubject)
					),
					submitForm = (function () {
						var _ref = (function ContactUs_asyncToGenerator(fn) {
							return function () {
								var self = this,
									args = arguments;
								return new Promise(function (resolve, reject) {
									var gen = fn.apply(self, args);
									function _next(value) {
										ContactUs_asyncGeneratorStep(
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
										ContactUs_asyncGeneratorStep(
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
						})(function* (formData) {
							var body = JSON.stringify(
									ContactUs_objectSpread(
										ContactUs_objectSpread(
											ContactUs_objectSpread(
												ContactUs_objectSpread(
													{},
													(null == currentTopic
														? void 0
														: currentTopic.id) && {
														topic:
															null == currentTopic
																? void 0
																: currentTopic.id,
													},
												),
												(null == currentSubTopic
													? void 0
													: currentSubTopic.id) && {
													subtopic:
														null == currentSubTopic
															? void 0
															: currentSubTopic.id,
												},
											),
											(null == currentSubSubTopic
												? void 0
												: currentSubSubTopic.id) && {
												subsubtopic:
													null == currentSubSubTopic
														? void 0
														: currentSubSubTopic.id,
											},
										),
										formData,
									),
								),
								res = yield fetch('/api/contact-us/', {
									method: 'POST',
									body,
								});
							if (res.ok) {
								(0, analytics.L9)({
									eventCategory: 'ContactUs',
									eventAction: 'submission_success',
									eventLabel:
										''.concat(
											null == currentTopic
												? void 0
												: currentTopic.id,
											' - ',
										) +
										''.concat(
											(null == currentSubTopic
												? void 0
												: currentSubTopic.id) || 'N/A',
											' - ',
										) +
										''.concat(
											(null == currentSubSubTopic
												? void 0
												: currentSubSubTopic.id) ||
												'N/A',
										),
								});
								var urlSections = [
									'/help-centre/contact-us',
									null == currentTopic
										? void 0
										: currentTopic.id,
									(null == currentSubTopic
										? void 0
										: currentSubTopic.id) || '0',
									(null == currentSubSubTopic
										? void 0
										: currentSubSubTopic.id) || '0',
									'1',
								];
								return navigate(urlSections.join('/')), !0;
							}
							var errorMsg = 'Could not submit Contact Us form. '
								.concat(res.status, ' - ')
								.concat(res.statusText);
							return (
								(0, analytics.L9)({
									eventCategory: 'ContactUs',
									eventAction: 'submission_failure',
									eventLabel: errorMsg,
								}),
								(0, esm.Tb)(errorMsg),
								!1
							);
						});
						return function submitForm(_x) {
							return _ref.apply(this, arguments);
						};
					})();
				return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
					emotion_react_jsx_runtime_browser_esm.HY,
					{
						children: (0, emotion_react_jsx_runtime_browser_esm.BX)(
							'div',
							{
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'h1',
										{
											css: (0,
											emotion_react_browser_esm.iv)(
												typography.fy7,
												';margin:0;border-top:1px solid ',
												palette.palette.neutral[86],
												';',
												mq.Dp.desktop,
												'{font-size:1.75rem;border-top:0;}',
												'',
											),
											children: headerText,
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'p',
										{
											css: (0,
											emotion_react_browser_esm.iv)(
												'margin-top:',
												space.D[5],
												'px;',
												typography.Kz0,
												';max-width:620px;',
												'',
											),
											children: containerText,
										},
									),
									!success &&
										(0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											emotion_react_jsx_runtime_browser_esm.HY,
											{
												children: [
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														TopicForm,
														{
															data: contactUsConfig,
															preSelectedId:
																null ==
																currentTopic
																	? void 0
																	: currentTopic.id,
															submitCallback: (
																selectedTopic,
															) => {
																(0,
																analytics.L9)({
																	eventCategory:
																		'ContactUs',
																	eventAction:
																		'topic_click',
																	eventLabel:
																		selectedTopic,
																}),
																	navigate(
																		'/help-centre/contact-us/'.concat(
																			selectedTopic,
																		),
																		{
																			replace:
																				!0,
																		},
																	);
															},
														},
													),
													subTopics &&
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															SubTopicForm,
															{
																title: subTopicsTitle,
																submitButonText:
																	'Continue to step 2',
																data: subTopics,
																preSelectedId:
																	null ==
																	currentSubTopic
																		? void 0
																		: currentSubTopic.id,
																submitCallback:
																	(
																		selectedSubTopic,
																	) => {
																		(0,
																		analytics.L9)(
																			{
																				eventCategory:
																					'ContactUs',
																				eventAction:
																					'subtopic_click',
																				eventLabel:
																					selectedSubTopic,
																			},
																		),
																			navigate(
																				'/help-centre/contact-us/'
																					.concat(
																						null ==
																							currentTopic
																							? void 0
																							: currentTopic.id,
																						'/',
																					)
																					.concat(
																						selectedSubTopic,
																					),
																				{
																					replace:
																						!0,
																				},
																			);
																	},
															},
															'subtopic-'.concat(
																null ==
																	currentTopic
																	? void 0
																	: currentTopic.id,
															),
														),
													subSubTopics &&
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															SubTopicForm,
															{
																title: subSubTopicsTitle,
																submitButonText:
																	'Continue to step 3',
																data: subSubTopics,
																preSelectedId:
																	null ==
																	currentSubSubTopic
																		? void 0
																		: currentSubSubTopic.id,
																submitCallback:
																	(
																		selectedSubSubTopic,
																	) => {
																		(0,
																		analytics.L9)(
																			{
																				eventCategory:
																					'ContactUs',
																				eventAction:
																					'subsubtopic_click',
																				eventLabel:
																					selectedSubSubTopic,
																			},
																		),
																			navigate(
																				'/help-centre/contact-us/'
																					.concat(
																						null ==
																							currentTopic
																							? void 0
																							: currentTopic.id,
																						'/',
																					)
																					.concat(
																						null ==
																							currentSubTopic
																							? void 0
																							: currentSubTopic.id,
																						'/',
																					)
																					.concat(
																						selectedSubSubTopic,
																					),
																				{
																					replace:
																						!0,
																				},
																			);
																	},
															},
															'subsubtopic-'.concat(
																null ==
																	currentSubTopic
																	? void 0
																	: currentSubTopic.id,
															),
														),
													selfServiceBox &&
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															SelfServicePrompt,
															{
																copy: selfServiceBox.text,
																linkCopy:
																	selfServiceBox.linkText,
																linkHref:
																	selfServiceBox.href,
																linkAsButton:
																	!showForm,
																showContacts:
																	!showForm,
																topicReferer:
																	''.concat(
																		null ==
																			currentTopic
																			? void 0
																			: currentTopic.id,
																		' - ',
																	) +
																	''.concat(
																		(null ==
																		currentSubSubTopic
																			? void 0
																			: currentSubSubTopic.id) ||
																			'N/A',
																		' - ',
																	) +
																	''.concat(
																		(null ==
																		currentSubSubTopic
																			? void 0
																			: currentSubSubTopic.id) ||
																			'N/A',
																	),
																additionalCss:
																	(0,
																	emotion_react_browser_esm.iv)(
																		'margin:',
																		space
																			.D[9],
																		'px 0 ',
																		space
																			.D[6],
																		'px;',
																		'',
																	),
															},
														),
													showForm &&
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															ContactUsForm,
															{
																submitCallback:
																	submitForm,
																title: ''.concat(
																	subTopics ||
																		subSubTopics
																		? 'Step '.concat(
																				subSubTopics
																					? '3'
																					: '2',
																				':',
																		  )
																		: '',
																	' Tell us more',
																),
																subject,
																editableSubject:
																	isSubjectEditable,
															},
															''
																.concat(
																	null ==
																		currentTopic
																		? void 0
																		: currentTopic.id,
																	'-',
																)
																.concat(
																	null ==
																		currentSubTopic
																		? void 0
																		: currentSubTopic.id,
																	'-',
																)
																.concat(
																	null ==
																		currentSubSubTopic
																		? void 0
																		: currentSubSubTopic.id,
																),
														),
												],
											},
										),
								],
							},
						),
					},
				);
			};
			const ContactUs_stories = {
				title: 'Pages/ContactUs',
				component: ContactUs,
				decorators: [ReactRouterDecorator.R],
				parameters: { layout: 'fullscreen' },
			};
			var Default = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.BX)(
							emotion_react_jsx_runtime_browser_esm.HY,
							{
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										SectionHeader.M,
										{ title: 'Need to contact us?' },
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										KnownIssues.B,
										{ issues: [] },
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										SectionContent.Z,
										{
											children: (0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												ContactUs,
												{},
											),
										},
									),
								],
							},
						),
					parameters: {
						msw: [
							http.d.get('/api/known-issues/', () =>
								HttpResponse.Z.json([]),
							),
						],
					},
				},
				knownIssue = [
					{
						date: '20 Jan 2022 12:00',
						message: 'Live Chat is currently unavailable.',
					},
				],
				WithKnownIssue = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.BX)(
							emotion_react_jsx_runtime_browser_esm.HY,
							{
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										SectionHeader.M,
										{ title: 'Need to contact us?' },
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										KnownIssues.B,
										{ issues: knownIssue },
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										SectionContent.Z,
										{
											children: (0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												ContactUs,
												{},
											),
										},
									),
								],
							},
						),
					parameters: {
						msw: [
							http.d.get('/api/known-issues/', () =>
								HttpResponse.Z.json(knownIssue),
							),
						],
					},
				},
				TopicSelected = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.BX)(
							emotion_react_jsx_runtime_browser_esm.HY,
							{
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										SectionHeader.M,
										{ title: 'Need to contact us?' },
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										KnownIssues.B,
										{ issues: [] },
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										SectionContent.Z,
										{
											children: (0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												ContactUs,
												{},
											),
										},
									),
								],
							},
						),
					parameters: {
						reactRouter: {
							location: '/contact-us/billing',
							path: '/contact-us/:urlTopicId',
						},
					},
				};
			(Default.parameters = {
				...Default.parameters,
				docs: {
					...Default.parameters?.docs,
					source: {
						originalSource:
							'{\n  render: () => {\n    return <>\n                <SectionHeader title="Need to contact us?" />\n                <KnownIssues issues={[]} />\n                <SectionContent>\n                    <ContactUs />\n                </SectionContent>\n            </>;\n  },\n  parameters: {\n    msw: [http.get(\'/api/known-issues/\', () => {\n      return HttpResponse.json([]);\n    })]\n  }\n}',
						...Default.parameters?.docs?.source,
					},
				},
			}),
				(WithKnownIssue.parameters = {
					...WithKnownIssue.parameters,
					docs: {
						...WithKnownIssue.parameters?.docs,
						source: {
							originalSource:
								'{\n  render: () => {\n    return <>\n                <SectionHeader title="Need to contact us?" />\n                <KnownIssues issues={knownIssue} />\n                <SectionContent>\n                    <ContactUs />\n                </SectionContent>\n            </>;\n  },\n  parameters: {\n    msw: [http.get(\'/api/known-issues/\', () => {\n      return HttpResponse.json(knownIssue);\n    })]\n  }\n}',
							...WithKnownIssue.parameters?.docs?.source,
						},
					},
				}),
				(TopicSelected.parameters = {
					...TopicSelected.parameters,
					docs: {
						...TopicSelected.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => <>\n            <SectionHeader title=\"Need to contact us?\" />\n            <KnownIssues issues={[]} />\n            <SectionContent>\n                <ContactUs />\n            </SectionContent>\n        </>,\n  parameters: {\n    reactRouter: {\n      location: '/contact-us/billing',\n      path: '/contact-us/:urlTopicId'\n    }\n  }\n}",
							...TopicSelected.parameters?.docs?.source,
						},
					},
				});
			const __namedExportsOrder = [
				'Default',
				'WithKnownIssue',
				'TopicSelected',
			];
		},
	},
]);
//# sourceMappingURL=components-helpCentre-contactUs-ContactUs-stories.9140aa09.iframe.bundle.js.map
