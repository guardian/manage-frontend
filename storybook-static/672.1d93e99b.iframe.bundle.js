'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[672],
	{
		'./node_modules/@guardian/source/dist/foundations/accessibility/description-id.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					S: () => descriptionId,
				});
				const descriptionId = (id) => `${id}_description`;
			},
		'./node_modules/@guardian/source/dist/foundations/utils/resets.js': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { i: () => resets });
			var _generated_palette_js__WEBPACK_IMPORTED_MODULE_0__ =
				__webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
				);
			const defaults = `\n\t*, *:before, *:after {\n        box-sizing: border-box;\n    }\n    html {\n        -moz-osx-font-smoothing: grayscale;\n        -webkit-font-smoothing: antialiased;\n        /* always show the vertical scroll bar to stop the page\n         * jumping about when navigating between pages where\n         * one has content shorter than the viewport */\n        overflow-y: scroll;\n    }\n    html, body {\n        text-rendering: optimizeLegibility;\n        font-feature-settings: 'kern';\n        font-kerning: normal; /* Safari 7+, Firefox 24+, Chrome 33(?)+, Opera 21 */\n        font-variant-ligatures: common-ligatures;\n    }\n    body {\n        background-color: ${_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__.palette.neutral[100]};\n        color: ${_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__.palette.neutral[7]};\n    }\n    em {\n        font-style: italic;\n    }\n`,
				resets = {
					legend: '\n\tpadding: 0;\n',
					fieldset: '\n\tborder: 0;\n\tpadding: 0;\n\tmargin: 0;\n',
					defaults,
					resetCSS: `\n\thtml, body, div, span, applet, object, iframe,\n\th1, h2, h3, h4, h5, h6, p, blockquote, pre,\n\ta, abbr, acronym, address, big, cite, code,\n\tdel, dfn, em, img, ins, kbd, q, s, samp,\n\tsmall, strike, strong, sub, sup, tt, var,\n\tb, u, i, center,\n\tdl, dt, dd, menu, ol, ul, li,\n\tfieldset, form, label, legend,\n\ttable, caption, tbody, tfoot, thead, tr, th, td,\n\tarticle, aside, canvas, details, embed,\n\tfigure, figcaption, footer, header, hgroup,\n\tmain, menu, nav, output, ruby, section, summary,\n\ttime, mark, audio, video {\n\t\tmargin: 0;\n\t\tpadding: 0;\n\t\tborder: 0;\n\t\tfont-size: 100%;\n\t\tfont: inherit;\n\t\tvertical-align: baseline;\n\t}\n\t/* HTML5 display-role reset for older browsers */\n\tarticle, aside, details, figcaption, figure,\n\tfooter, header, hgroup, main, menu, nav, section {\n\t\tdisplay: block;\n\t}\n\t/* HTML5 hidden-attribute fix for newer browsers */\n\t*[hidden] {\n\t\tdisplay: none;\n\t}\n\tbody {\n\t\tline-height: 1;\n\t}\n\tmenu, ol, ul {\n\t\tlist-style: none;\n\t}\n\tblockquote, q {\n\t\tquotes: none;\n\t}\n\tblockquote:before, blockquote:after,\n\tq:before, q:after {\n\t\tcontent: '';\n\t\tcontent: none;\n\t}\n\ttable {\n\t\tborder-collapse: collapse;\n\t\tborder-spacing: 0;\n\t}\n\n\t${defaults}\n`,
				};
		},
		'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgTickRound.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					X: () => SvgTickRound,
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
										d: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10m-1.773-7.853-2.27-2.17-.8.8 2.709 3.791h.454l7.455-7.716-.82-.8z',
										fill: theme?.fill,
									},
								),
							},
						),
					SvgTickRound = ({
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
													children: 'Ticked',
												},
										  )
										: '',
								],
							},
						);
			},
		'./node_modules/@guardian/source/dist/react-components/choice-card/ChoiceCard.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					f: () => ChoiceCard,
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
						'./node_modules/@guardian/source/dist/react-components/choice-card/styles.js',
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
				const themeChoiceCard = {
						textUnselected: palette.palette.neutral[46],
						textSelected: palette.palette.brand[400],
						textHover: palette.palette.brand[500],
						textError: palette.palette.error[400],
						borderUnselected: palette.palette.neutral[46],
						borderSelected: palette.palette.brand[500],
						borderHover: palette.palette.brand[500],
						borderError: palette.palette.error[400],
						backgroundUnselected: 'transparent',
						backgroundHover: 'transparent',
						backgroundSelected: '#E3F6FF',
						backgroundTick: palette.palette.brand[500],
					},
					transformProviderTheme =
						(theme.vy,
						palette.palette.neutral[46],
						palette.palette.neutral[46],
						palette.palette.neutral[7],
						palette.palette.neutral[46],
						palette.palette.neutral[46],
						palette.palette.brand[400],
						palette.palette.brand[500],
						palette.palette.brand[500],
						palette.palette.brand[500],
						palette.palette.brand[500],
						palette.palette.error[400],
						palette.palette.error[400],
						user_feedback_theme.Fj,
						(providerTheme) => {
							const transformedTheme = {};
							return (
								providerTheme?.textLabel &&
									(transformedTheme.textUnselected =
										providerTheme.textLabel),
								providerTheme?.textChecked &&
									(transformedTheme.textSelected =
										providerTheme.textChecked),
								providerTheme?.border &&
									(transformedTheme.borderUnselected =
										providerTheme.border),
								providerTheme?.borderChecked &&
									(transformedTheme.borderSelected =
										providerTheme.borderChecked),
								providerTheme?.backgroundChecked &&
									(transformedTheme.backgroundSelected =
										providerTheme.backgroundChecked),
								{ ...transformedTheme, ...providerTheme }
							);
						}),
					ChoiceCard = ({
						id,
						label: labelContent,
						value,
						icon: iconSvg,
						checked,
						defaultChecked,
						cssOverrides,
						error,
						onChange,
						theme = {},
						type = 'radio',
						...props
					}) => {
						const mergedTheme = (providerTheme) =>
								(0, themes.I)(
									themeChoiceCard,
									theme,
									providerTheme,
									transformProviderTheme,
								),
							[userChanged, setUserChanged] = (0, react.useState)(
								!1,
							);
						return (0, emotion_react_jsx_runtime_browser_esm.BX)(
							emotion_react_jsx_runtime_browser_esm.HY,
							{
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'input',
										{
											css: (providerTheme) => [
												(0, styles.qH)(
													mergedTheme(
														providerTheme.choiceCard,
													),
												),
												userChanged ? styles.Kc : '',
												cssOverrides,
											],
											id,
											value,
											'aria-invalid': !!error,
											defaultChecked:
												defaultChecked ?? void 0,
											checked:
												null != checked
													? null != checked
														? checked
														: !!defaultChecked
													: void 0,
											onChange: (event) => {
												onChange && onChange(event),
													setUserChanged(!0);
											},
											type,
											...props,
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'label',
										{
											css: (providerTheme) => [
												(0, styles.pj)(
													mergedTheme(
														providerTheme.choiceCard,
													),
												),
												error
													? (0, styles.P6)(
															mergedTheme(
																providerTheme.choiceCard,
															),
													  )
													: '',
											],
											htmlFor: id,
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'div',
													{
														css: [
															styles.Fh,
															iconSvg
																? ''
																: styles.SS,
														],
														children: [
															iconSvg || '',
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'div',
																{
																	children:
																		labelContent,
																},
															),
														],
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'span',
													{
														css: (
															providerTheme,
														) => [
															(0, styles.Ky)(
																mergedTheme(
																	providerTheme.choiceCard,
																),
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
			},
		'./node_modules/@guardian/source/dist/react-components/choice-card/ChoiceCardGroup.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					Y: () => ChoiceCardGroup,
				});
				var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ =
						__webpack_require__(
							'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
						),
					react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
						'./node_modules/react/index.js',
					),
					_label_Legend_js__WEBPACK_IMPORTED_MODULE_3__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/react-components/label/Legend.js',
						),
					_user_feedback_InlineError_js__WEBPACK_IMPORTED_MODULE_4__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/react-components/user-feedback/InlineError.js',
						),
					_styles_js__WEBPACK_IMPORTED_MODULE_1__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/react-components/choice-card/styles.js',
						),
					_foundations_accessibility_description_id_js__WEBPACK_IMPORTED_MODULE_5__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/accessibility/description-id.js',
						);
				const ChoiceCardGroup = ({
					id,
					name,
					label,
					hideLabel,
					supporting,
					multi,
					error,
					columns,
					cssOverrides,
					children,
					theme,
					...props
				}) => {
					const defaultId = (0,
						react__WEBPACK_IMPORTED_MODULE_0__.useId)(),
						groupId = id ?? defaultId,
						topMargin =
							(!(!label || hideLabel) || supporting) ?? error
								? _styles_js__WEBPACK_IMPORTED_MODULE_1__.lI
								: '';
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.BX)(
						'fieldset',
						{
							css: [
								_styles_js__WEBPACK_IMPORTED_MODULE_1__.oB,
								cssOverrides,
							],
							id: groupId,
							...props,
							children: [
								label
									? (0,
									  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
											_label_Legend_js__WEBPACK_IMPORTED_MODULE_3__.D,
											{
												text: label,
												supporting,
												hideLabel,
												theme,
											},
									  )
									: '',
								'string' == typeof error &&
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
										_user_feedback_InlineError_js__WEBPACK_IMPORTED_MODULE_4__.b,
										{
											id: (0,
											_foundations_accessibility_description_id_js__WEBPACK_IMPORTED_MODULE_5__.S)(
												groupId,
											),
											theme,
											children: error,
										},
									),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
									'div',
									{
										css: [
											columns
												? [
														_styles_js__WEBPACK_IMPORTED_MODULE_1__.Uj,
														_styles_js__WEBPACK_IMPORTED_MODULE_1__
															.ft[columns],
												  ]
												: _styles_js__WEBPACK_IMPORTED_MODULE_1__.ov,
											topMargin,
										],
										children:
											react__WEBPACK_IMPORTED_MODULE_0__.Children.map(
												children,
												(child) =>
													(0,
													react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(
														child,
														Object.assign(
															{
																type: multi
																	? 'checkbox'
																	: 'radio',
															},
															error
																? {
																		error: !0,
																		'aria-describedby':
																			(0,
																			_foundations_accessibility_description_id_js__WEBPACK_IMPORTED_MODULE_5__.S)(
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
							],
						},
					);
				};
			},
		'./node_modules/@guardian/source/dist/react-components/choice-card/styles.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					Fh: () => contentWrapper,
					Kc: () => tickAnimation,
					Ky: () => tick,
					P6: () => errorChoiceCard,
					SS: () => contentWrapperLabelOnly,
					Uj: () => gridContainer,
					ft: () => gridColumns,
					lI: () => containerTopMargin,
					oB: () => fieldset,
					ov: () => flexContainer,
					pj: () => choiceCard,
					qH: () => input,
				});
				var _emotion_react__WEBPACK_IMPORTED_MODULE_0__ =
						__webpack_require__(
							'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
						),
					_foundations_utils_resets_js__WEBPACK_IMPORTED_MODULE_1__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/utils/resets.js',
						),
					_foundations_mq_mq_js__WEBPACK_IMPORTED_MODULE_2__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
						),
					_foundations_generated_space_js__WEBPACK_IMPORTED_MODULE_3__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
						),
					_foundations_generated_size_js__WEBPACK_IMPORTED_MODULE_6__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/__generated__/size.js',
						),
					_foundations_accessibility_visually_hidden_js__WEBPACK_IMPORTED_MODULE_4__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/accessibility/visually-hidden.js',
						),
					_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_5__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
						),
					_foundations_animation_transitions_js__WEBPACK_IMPORTED_MODULE_8__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/animation/transitions.js',
						),
					_foundations_generated_typography_js__WEBPACK_IMPORTED_MODULE_7__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
						);
				const fieldset = _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	${_foundations_utils_resets_js__WEBPACK_IMPORTED_MODULE_1__.i.fieldset};
`,
					flexContainer = _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	width: 100%;

	${_foundations_mq_mq_js__WEBPACK_IMPORTED_MODULE_2__.Dp.mobileLandscape} {
		display: flex;
		justify-content: flex-start;
	}
`,
					containerTopMargin = _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	margin-top: ${_foundations_generated_space_js__WEBPACK_IMPORTED_MODULE_3__.D[2]}px;
`,
					gridContainer = _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	width: 100%;
	${_foundations_mq_mq_js__WEBPACK_IMPORTED_MODULE_2__.Dp.mobileLandscape} {
		@supports (display: grid) {
			display: grid;
			row-gap: ${_foundations_generated_space_js__WEBPACK_IMPORTED_MODULE_3__.D[2]}px;
			column-gap: ${_foundations_generated_space_js__WEBPACK_IMPORTED_MODULE_3__.D[2]}px;
			& > label {
				margin: 0;
			}
		}
	}
`,
					gridColumnsStyle = (
						columns,
					) => _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	${_foundations_mq_mq_js__WEBPACK_IMPORTED_MODULE_2__.Dp.mobileLandscape} {
		grid-template-columns: repeat(${columns}, 1fr);
	}
`,
					gridColumns = {
						2: gridColumnsStyle(2),
						3: gridColumnsStyle(3),
						4: gridColumnsStyle(4),
						5: gridColumnsStyle(5),
					},
					input = (
						theme,
					) => _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	${_foundations_accessibility_visually_hidden_js__WEBPACK_IMPORTED_MODULE_4__.j};

	&:focus + label {
		html:not(.src-focus-disabled) & {
			outline: 3px solid ${_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_5__.palette.focus[400]};
		}
	}

	&:checked + label {
		box-shadow: inset 0 0 0 2px ${theme.borderSelected};
		background-color: ${theme.backgroundSelected};

		& > * {
			color: ${theme.textSelected};

			/* last child is the tick */
			&:last-child {
				&:before {
					right: 0;
				}
				&:after {
					top: 0;
				}
			}
		}
	}
`,
					tickAnimation = _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	@keyframes labelFadeOutIn {
		0% {
			opacity: 1;
		}
		1%,
		80% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	@keyframes tickFadeInOut {
		0% {
			opacity: 0;
		}
		10%,
		40% {
			opacity: 1;
		}
		70% {
			opacity: 0;
		}
	}

	&:checked + label {
		& > * {
			animation-duration: 1s;
			animation-name: labelFadeOutIn;

			/* last child is the tick */
			&:last-child {
				animation-name: tickFadeInOut;
			}
		}
	}
`,
					choiceCard = (
						theme,
					) => _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	flex: 1;
	display: flex;
	justify-content: center;
	min-height: ${_foundations_generated_size_js__WEBPACK_IMPORTED_MODULE_6__.Cb.inputMedium}px;
	margin: 0 0 ${_foundations_generated_space_js__WEBPACK_IMPORTED_MODULE_3__.D[2]}px 0;
	box-shadow: inset 0 0 0 1px ${theme.borderUnselected};
	border-radius: 4px;
	position: relative;
	cursor: pointer;
	background-color: ${theme.backgroundUnselected};
	color: ${theme.textUnselected};

	${_foundations_mq_mq_js__WEBPACK_IMPORTED_MODULE_2__.Dp.mobileLandscape} {
		margin: 0 ${_foundations_generated_space_js__WEBPACK_IMPORTED_MODULE_3__.D[2]}px 0 0;
		&:last-child {
			margin: 0;
		}
	}

	&:hover {
		box-shadow: inset 0 0 0 2px ${theme.borderHover};
		background-color: ${theme.backgroundHover};
		color: ${theme.textHover};
	}
`,
					contentWrapper = _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	flex: 0 1 auto;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	position: relative;
	box-sizing: border-box;

	${_foundations_mq_mq_js__WEBPACK_IMPORTED_MODULE_2__.Dp.mobileLandscape} {
		flex-direction: column;
		padding: ${_foundations_generated_space_js__WEBPACK_IMPORTED_MODULE_3__.D[2]}px ${_foundations_generated_space_js__WEBPACK_IMPORTED_MODULE_3__.D[6]}px;
	}

	& > * {
		${_foundations_generated_typography_js__WEBPACK_IMPORTED_MODULE_7__.Rcn};
		text-align: center;
	}

	& svg {
		width: ${_foundations_generated_size_js__WEBPACK_IMPORTED_MODULE_6__.bf.iconMedium}px;
		max-height: ${_foundations_generated_size_js__WEBPACK_IMPORTED_MODULE_6__.Cb.iconMedium}px;
		fill: currentColor;
		margin-right: ${_foundations_generated_space_js__WEBPACK_IMPORTED_MODULE_3__.D[1]}px;

		${_foundations_mq_mq_js__WEBPACK_IMPORTED_MODULE_2__.Dp.mobileLandscape} {
			margin-bottom: -${_foundations_generated_space_js__WEBPACK_IMPORTED_MODULE_3__.D[1]}px;
			margin-right: 0;
		}
	}
`,
					contentWrapperLabelOnly = _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	width: 100%;
	${_foundations_mq_mq_js__WEBPACK_IMPORTED_MODULE_2__.Dp.mobileLandscape} {
		& > div {
			width: 100%;
		}
	}
`,
					tick = (
						theme,
					) => _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	/* overall positional properties */
	position: absolute;
	top: 50%;
	left: 50%;
	width: 7px;
	height: 20px;
	transform: rotate(45deg) translateX(-100%) translateY(-35%);
	opacity: 0;

	/* the checkmark ✓ */
	&:after,
	&:before {
		position: absolute;
		display: block;
		background-color: ${theme.backgroundTick};
		transition: all ${_foundations_animation_transitions_js__WEBPACK_IMPORTED_MODULE_8__.p.short} ease-in-out;
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
`,
					errorChoiceCard = (
						theme,
					) => _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	box-shadow: inset 0 0 0 2px ${theme.borderError};

	& > * {
		color: ${theme.textError};
	}
`;
			},
		'./node_modules/@guardian/source/dist/react-components/label/Legend.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, { D: () => Legend });
				var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
						__webpack_require__(
							'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
						),
					_styles_js__WEBPACK_IMPORTED_MODULE_1__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/react-components/label/styles.js',
						),
					_SupportingText_js__WEBPACK_IMPORTED_MODULE_3__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/react-components/label/SupportingText.js',
						),
					_Text_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/label/Text.js',
					);
				const Legend = ({
					text,
					supporting,
					optional = !1,
					hideLabel = !1,
					cssOverrides,
					theme,
					...props
				}) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.BX)(
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.HY,
						{
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
									'legend',
									{
										css: [
											_styles_js__WEBPACK_IMPORTED_MODULE_1__.j3,
											cssOverrides,
										],
										...props,
										children: (0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
											_Text_js__WEBPACK_IMPORTED_MODULE_2__.x,
											{
												text,
												optional,
												hideLabel,
												theme,
											},
										),
									},
								),
								supporting
									? (0,
									  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
											_SupportingText_js__WEBPACK_IMPORTED_MODULE_3__.x,
											{
												hideLabel,
												theme,
												children: supporting,
											},
									  )
									: '',
							],
						},
					);
			},
		'./node_modules/@guardian/source/dist/react-components/label/SupportingText.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					x: () => SupportingText,
				});
				var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ =
						__webpack_require__(
							'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
						),
					_emotion_react__WEBPACK_IMPORTED_MODULE_0__ =
						__webpack_require__(
							'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
						),
					_shared_js__WEBPACK_IMPORTED_MODULE_4__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/react-components/label/shared.js',
						),
					_styles_js__WEBPACK_IMPORTED_MODULE_3__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/react-components/label/styles.js',
						),
					_foundations_accessibility_visually_hidden_js__WEBPACK_IMPORTED_MODULE_1__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/accessibility/visually-hidden.js',
						);
				const visuallyHidden = _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	${_foundations_accessibility_visually_hidden_js__WEBPACK_IMPORTED_MODULE_1__.j}
`,
					SupportingText = ({ hideLabel, children, theme }) =>
						(0,
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
							'p',
							{
								css: (providerTheme) => [
									(0,
									_styles_js__WEBPACK_IMPORTED_MODULE_3__.ot)(
										(0,
										_shared_js__WEBPACK_IMPORTED_MODULE_4__.$)(
											providerTheme.label,
											theme,
										),
									),
									hideLabel ? visuallyHidden : '',
								],
								children,
							},
						);
			},
		'./node_modules/@guardian/source/dist/react-components/label/Text.js': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { x: () => Text });
			var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_shared_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/label/shared.js',
				),
				_styles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/label/styles.js',
				),
				_foundations_accessibility_visually_hidden_js__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/accessibility/visually-hidden.js',
					);
			const visuallyHidden = _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	${_foundations_accessibility_visually_hidden_js__WEBPACK_IMPORTED_MODULE_1__.j}
`,
				Text = ({
					text,
					optional,
					hideLabel,
					size = 'medium',
					theme,
				}) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.BX)(
						'div',
						{
							css: (providerTheme) => [
								(0, _styles_js__WEBPACK_IMPORTED_MODULE_3__.ZP)(
									(0,
									_shared_js__WEBPACK_IMPORTED_MODULE_4__.$)(
										providerTheme.label,
										theme,
									),
									size,
								),
								hideLabel ? visuallyHidden : '',
							],
							children: [
								text,
								' ',
								optional
									? (0,
									  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
											'span',
											{
												css: (providerTheme) =>
													(0,
													_styles_js__WEBPACK_IMPORTED_MODULE_3__.wZ)(
														(0,
														_shared_js__WEBPACK_IMPORTED_MODULE_4__.$)(
															providerTheme.label,
															theme,
														),
													),
												children: 'Optional',
											},
									  )
									: '',
							],
						},
					);
		},
		'./node_modules/@guardian/source/dist/react-components/label/shared.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					$: () => mergedTheme,
				});
				var _utils_themes_js__WEBPACK_IMPORTED_MODULE_0__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/react-components/utils/themes.js',
						),
					_theme_js__WEBPACK_IMPORTED_MODULE_1__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/react-components/label/theme.js',
						);
				const mergedTheme = (providerTheme, themeProp) =>
					(0, _utils_themes_js__WEBPACK_IMPORTED_MODULE_0__.I)(
						_theme_js__WEBPACK_IMPORTED_MODULE_1__.vy,
						themeProp,
						providerTheme,
					);
			},
		'./node_modules/@guardian/source/dist/react-components/label/styles.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					ZP: () => labelText,
					j3: () => legend,
					ot: () => supportingText,
					wZ: () => optionalText,
				});
				var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ =
						__webpack_require__(
							'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
						),
					_foundations_utils_resets_js__WEBPACK_IMPORTED_MODULE_2__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/utils/resets.js',
						),
					_foundations_generated_typography_js__WEBPACK_IMPORTED_MODULE_0__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
						);
				const textSize = {
						medium: _foundations_generated_typography_js__WEBPACK_IMPORTED_MODULE_0__.Rcn,
						small: _foundations_generated_typography_js__WEBPACK_IMPORTED_MODULE_0__.zlp,
					},
					legend = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv`
	${_foundations_utils_resets_js__WEBPACK_IMPORTED_MODULE_2__.i.legend};
`,
					labelText = (
						label,
						size,
					) => _emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv`
	${textSize[size]};
	color: ${label.textLabel};
`,
					optionalText = (
						label,
					) => _emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv`
	${_foundations_generated_typography_js__WEBPACK_IMPORTED_MODULE_0__.AjP};
	color: ${label.textOptional};
	font-style: italic;
`,
					supportingText = (
						label,
					) => _emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv`
	${_foundations_generated_typography_js__WEBPACK_IMPORTED_MODULE_0__.AjP};
	color: ${label.textSupporting};
	margin: 2px 0 0;
`;
			},
		'./node_modules/@guardian/source/dist/react-components/label/theme.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					$Q: () => themeLabelBrand,
					Sz: () => labelThemeBrand,
					gn: () => labelThemeDefault,
					vy: () => themeLabel,
				});
				var _foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					);
				const labelThemeDefault = {
						label: {
							textLabel:
								_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
									.palette.neutral[7],
							textOptional:
								_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
									.palette.neutral[46],
							textSupporting:
								_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
									.palette.neutral[46],
							textError:
								_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
									.palette.error[400],
							textSuccess:
								_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
									.palette.success[400],
						},
					},
					labelThemeBrand = {
						label: {
							textLabel:
								_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
									.palette.neutral[100],
							textOptional:
								_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
									.palette.brand[800],
							textSupporting:
								_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
									.palette.brand[800],
							textError:
								_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
									.palette.error[500],
							textSuccess:
								_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
									.palette.success[500],
						},
					},
					themeLabel = {
						textLabel:
							_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
								.palette.neutral[7],
						textOptional:
							_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
								.palette.neutral[46],
						textSupporting:
							_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
								.palette.neutral[46],
						textError:
							_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
								.palette.error[400],
						textSuccess:
							_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
								.palette.success[400],
					},
					themeLabelBrand = {
						textLabel:
							_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
								.palette.neutral[100],
						textOptional:
							_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
								.palette.brand[800],
						textSupporting:
							_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
								.palette.brand[800],
						textError:
							_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
								.palette.error[500],
						textSuccess:
							_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
								.palette.success[500],
					};
			},
		'./node_modules/@guardian/source/dist/react-components/stack/Stack.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, { K: () => Stack });
				var emotion_react_jsx_runtime_browser_esm = __webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
					emotion_react_browser_esm = __webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
					space = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
					);
				const stack = emotion_react_browser_esm.iv`
	& > * {
		width: 100%;
	}
`,
					stackSpace = (number) => emotion_react_browser_esm.iv`
	& > * + * {
		margin-top: ${space.D[number]}px;
	}
`;
				var isUndefined = __webpack_require__(
					'./node_modules/@guardian/source/dist/libs/dist/isUndefined/isUndefined.js',
				);
				const Stack = ({ cssOverrides, children, space, ...props }) =>
					(0, emotion_react_jsx_runtime_browser_esm.tZ)('div', {
						css: [
							stack,
							(0, isUndefined.o)(space) ? '' : stackSpace(space),
							cssOverrides,
						],
						...props,
						children,
					});
			},
		'./node_modules/@guardian/source/dist/react-components/text-input/TextInput.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					o: () => TextInput,
				});
				var emotion_react_jsx_runtime_browser_esm = __webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
					react = __webpack_require__(
						'./node_modules/react/index.js',
					),
					SupportingText = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/label/SupportingText.js',
					),
					Text = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/label/Text.js',
					);
				const Label = ({
					text,
					supporting,
					optional = !1,
					hideLabel = !1,
					size,
					cssOverrides,
					children,
					theme,
					...props
				}) =>
					(0, emotion_react_jsx_runtime_browser_esm.BX)('label', {
						css: cssOverrides,
						...props,
						children: [
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								Text.x,
								{ hideLabel, text, optional, size, theme },
							),
							supporting
								? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
										SupportingText.x,
										{
											hideLabel,
											theme,
											children: supporting,
										},
								  )
								: '',
							children,
						],
					});
				var InlineError = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/user-feedback/InlineError.js',
					),
					SvgTickRound = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgTickRound.js',
					),
					shared = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/user-feedback/shared.js',
					),
					styles = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/user-feedback/styles.js',
					);
				const InlineSuccess = ({
					children,
					size = 'medium',
					cssOverrides,
					theme,
					...props
				}) =>
					(0, emotion_react_jsx_runtime_browser_esm.BX)('span', {
						css: (providerTheme) => [
							(0, styles.k)(
								(0, shared.$)(
									providerTheme.userFeedback,
									theme,
								),
								size,
							),
							cssOverrides,
						],
						role: 'alert',
						...props,
						children: [
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								SvgTickRound.X,
								{},
							),
							children,
						],
					});
				var themes = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/utils/themes.js',
					),
					emotion_react_browser_esm = __webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
					size = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/size.js',
					),
					space = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
					),
					focus_halo = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/accessibility/focus-halo.js',
					),
					typography = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					);
				const inputSize = {
						medium: emotion_react_browser_esm.iv`
	${typography.Kz0};
	height: ${size.dp.medium}px;
`,
						small: emotion_react_browser_esm.iv`
	${typography.AjP};
	height: ${size.dp.small}px;
`,
					},
					errorInput = (textInput2) => emotion_react_browser_esm.iv`
	border: 2px solid ${textInput2.borderError};
	border-radius: 4px;
	color: ${textInput2.textError};
	margin-top: 0;
`,
					successInput = (textInput2) => emotion_react_browser_esm.iv`
	border: 2px solid ${textInput2.borderSuccess};
	border-radius: 4px;
	color: ${textInput2.textSuccess};
	margin-top: 0;
`,
					labelMargin = emotion_react_browser_esm.iv`
	margin-top: ${space.D[1]}px;
`,
					supportingTextMargin = emotion_react_browser_esm.iv`
	margin-top: 6px;
`,
					inlineMessageMargin = emotion_react_browser_esm.iv`
	margin-top: 2px;
`,
					widthFluid = emotion_react_browser_esm.iv`
	width: 100%;
`,
					width30 = emotion_react_browser_esm.iv`
	width: 40ex;
	max-width: 100%; /* prevent overflow on narrow viewports */
`,
					width10 = emotion_react_browser_esm.iv`
	width: 18ex;
`,
					width4 = emotion_react_browser_esm.iv`
	width: 9ex;
`;
				var theme = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/user-feedback/theme.js',
					),
					palette = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					);
				const themeTextInput = {
					textUserInput: palette.palette.neutral[7],
					textLabel: palette.palette.neutral[7],
					textOptional: palette.palette.neutral[46],
					textSupporting: palette.palette.neutral[46],
					textError: palette.palette.neutral[7],
					textSuccess: palette.palette.success[400],
					backgroundInput: palette.palette.neutral[100],
					border: palette.palette.neutral[46],
					borderError: palette.palette.error[400],
					borderSuccess: palette.palette.success[400],
				};
				palette.palette.neutral[7],
					palette.palette.neutral[7],
					palette.palette.neutral[46],
					palette.palette.neutral[46],
					palette.palette.neutral[7],
					palette.palette.success[400],
					palette.palette.neutral[100],
					palette.palette.neutral[46],
					palette.palette.focus[400],
					palette.palette.error[400],
					palette.palette.success[400],
					theme.Fj;
				var description_id = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/accessibility/description-id.js',
				);
				const widths = { 30: width30, 10: width10, 4: width4 },
					TextInput = ({
						id,
						label: labelText,
						optional = !1,
						hideLabel = !1,
						supporting,
						size = 'medium',
						width,
						error,
						success,
						theme,
						cssOverrides,
						...props
					}) => {
						const defaultId = (0, react.useId)(),
							textInputId = id ?? defaultId,
							mergedTheme = (providerTheme) =>
								(0, themes.I)(
									themeTextInput,
									theme,
									providerTheme.textInput,
								);
						return (0, emotion_react_jsx_runtime_browser_esm.BX)(
							emotion_react_jsx_runtime_browser_esm.HY,
							{
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										Label,
										{
											text: labelText,
											optional: !!optional,
											hideLabel,
											supporting,
											theme,
											size,
											htmlFor: textInputId,
											children: [
												error &&
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'div',
														{
															css: inlineMessageMargin,
															children: (0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																InlineError.b,
																{
																	id: (0,
																	description_id.S)(
																		textInputId,
																	),
																	theme,
																	size,
																	children:
																		error,
																},
															),
														},
													),
												!error &&
													success &&
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'div',
														{
															css: inlineMessageMargin,
															children: (0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																InlineSuccess,
																{
																	id: (0,
																	description_id.S)(
																		textInputId,
																	),
																	theme,
																	size,
																	children:
																		success,
																},
															),
														},
													),
											],
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'input',
										{
											css: (providerTheme) => {
												return [
													width
														? widths[width]
														: widthFluid,
													((textInput2 =
														mergedTheme(
															providerTheme,
														)),
													(size2 = size),
													emotion_react_browser_esm.iv`
	box-sizing: border-box;
	${inputSize[size2]};
	color: ${textInput2.textUserInput};
	background-color: ${textInput2.backgroundInput};
	border: 1px solid ${textInput2.border};
	border-radius: 4px;
	padding: 0 ${space.D[2]}px;

	&:focus {
		${focus_halo.y}
	}

	&:invalid {
		/* Remove styling of invalid input elements that gets applied in Firefox */
		box-shadow: none;

		/*
			We automatically apply error styling to fields in an invalid state,
			but stop short of applying it to empty required fields.
			*/
		&[value]:not([value='']) {
			${errorInput(textInput2)};
		}
	}
`),
													supporting
														? supportingTextMargin
														: labelMargin,
													error
														? errorInput(
																mergedTheme(
																	providerTheme,
																),
														  )
														: '',
													!error && success
														? successInput(
																mergedTheme(
																	providerTheme,
																),
														  )
														: '',
													cssOverrides,
												];
												var textInput2, size2;
											},
											type: 'text',
											id: textInputId,
											'aria-required': !optional,
											'aria-invalid': !!error,
											'aria-describedby':
												error ?? success
													? (0, description_id.S)(
															textInputId,
													  )
													: '',
											required: !optional,
											...props,
										},
									),
								],
							},
						);
					};
			},
		'./node_modules/@guardian/source/dist/react-components/user-feedback/InlineError.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					b: () => InlineError,
				});
				var emotion_react_jsx_runtime_browser_esm = __webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
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
								d: 'M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10m-10.704 1.818h1.386l.659-8.636-.91-.91h-.885l-.91.91zm2.068 3.637c0-.75-.614-1.364-1.364-1.364s-1.364.614-1.364 1.364.614 1.363 1.364 1.363 1.364-.613 1.364-1.363',
								fill: theme?.fill,
							}),
						}),
					SvgAlertRound = ({
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
				var shared = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/user-feedback/shared.js',
					),
					styles = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/user-feedback/styles.js',
					);
				const InlineError = ({
					children,
					size = 'medium',
					cssOverrides,
					theme,
					...props
				}) =>
					(0, emotion_react_jsx_runtime_browser_esm.BX)('span', {
						css: (providerTheme) => [
							(0, styles.x)(
								(0, shared.$)(
									providerTheme.userFeedback,
									theme,
								),
								size,
							),
							cssOverrides,
						],
						role: 'alert',
						...props,
						children: [
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								SvgAlertRound,
								{},
							),
							children,
						],
					});
			},
		'./node_modules/@guardian/source/dist/react-components/user-feedback/shared.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					$: () => mergedTheme,
				});
				var _utils_themes_js__WEBPACK_IMPORTED_MODULE_0__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/react-components/utils/themes.js',
						),
					_theme_js__WEBPACK_IMPORTED_MODULE_1__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/react-components/user-feedback/theme.js',
						);
				const mergedTheme = (providerTheme, themeProp) =>
					(0, _utils_themes_js__WEBPACK_IMPORTED_MODULE_0__.I)(
						_theme_js__WEBPACK_IMPORTED_MODULE_1__.Pr,
						themeProp,
						providerTheme,
					);
			},
		'./node_modules/@guardian/source/dist/react-components/user-feedback/styles.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					k: () => inlineSuccess,
					x: () => inlineError,
				});
				var _emotion_react__WEBPACK_IMPORTED_MODULE_0__ =
						__webpack_require__(
							'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
						),
					_foundations_generated_size_js__WEBPACK_IMPORTED_MODULE_2__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/__generated__/size.js',
						),
					_foundations_generated_typography_js__WEBPACK_IMPORTED_MODULE_1__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
						);
				const inlineMessage = _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	display: flex;
	align-items: flex-start;

	svg {
		fill: currentColor;
		/* we don't want the SVG to change size depending on available space */
		flex: none;

		/*
		a visual kick to vertically align the icon with the top row of text
		and horizontally pull it to the beginning of the row
		 */
		transform: translate(-4px, -4px);
	}
`,
					inlineMessageSize = {
						small: _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	${_foundations_generated_typography_js__WEBPACK_IMPORTED_MODULE_1__.AjP};
	svg {
		width: ${_foundations_generated_size_js__WEBPACK_IMPORTED_MODULE_2__.jA.iconSmall};
		height: ${_foundations_generated_size_js__WEBPACK_IMPORTED_MODULE_2__.T6.iconSmall};
	}
`,
						medium: _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	${_foundations_generated_typography_js__WEBPACK_IMPORTED_MODULE_1__.Kz0};
	svg {
		width: ${_foundations_generated_size_js__WEBPACK_IMPORTED_MODULE_2__.jA.iconMedium};
		height: ${_foundations_generated_size_js__WEBPACK_IMPORTED_MODULE_2__.T6.iconMedium};
	}
`,
					},
					inlineError = (
						userFeedback,
						size,
					) => _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	${inlineMessage};
	${inlineMessageSize[size]};
	color: ${userFeedback.textError};
`,
					inlineSuccess = (
						userFeedback,
						size,
					) => _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	${inlineMessage};
	${inlineMessageSize[size]};
	color: ${userFeedback.textSuccess};
`;
			},
		'./node_modules/@guardian/source/dist/react-components/user-feedback/theme.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					Fj: () => userFeedbackThemeDefault,
					Pr: () => themeUserFeedback,
					W4: () => userFeedbackThemeBrand,
				});
				var _foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					);
				const userFeedbackThemeDefault = {
						userFeedback: {
							textSuccess:
								_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
									.palette.success[400],
							textError:
								_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
									.palette.error[400],
						},
					},
					userFeedbackThemeBrand = {
						userFeedback: {
							textSuccess:
								_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
									.palette.success[500],
							textError:
								_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
									.palette.error[500],
						},
					},
					themeUserFeedback = {
						textSuccess:
							_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
								.palette.success[400],
						textError:
							_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
								.palette.error[400],
					};
				_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
					.palette.success[500],
					_foundations_generated_palette_js__WEBPACK_IMPORTED_MODULE_0__
						.palette.error[500];
			},
	},
]);
//# sourceMappingURL=672.1d93e99b.iframe.bundle.js.map
