'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[1976],
	{
		'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgChevronDownSingle.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					z: () => SvgChevronDownSingle,
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
										d: 'm1 7.224 10.498 10.498h1.004L23 7.224l-.98-.954L12 14.708 1.98 6.27z',
										fill: theme?.fill,
									},
								),
							},
						),
					SvgChevronDownSingle = ({
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
													children:
														'Expand to show more',
												},
										  )
										: '',
								],
							},
						);
			},
		'./client/components/shared/CallCentreAccordion.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				_: () => CallCentreAccordion,
			});
			var emotion_react_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
				),
				typography = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
				),
				emotion_react_jsx_runtime_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				),
				react = __webpack_require__('./node_modules/react/index.js'),
				themes = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/utils/themes.js',
				),
				space = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
				),
				transitions = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/animation/transitions.js',
				),
				mq = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
				),
				focus_halo = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/accessibility/focus-halo.js',
				),
				visually_hidden = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/accessibility/visually-hidden.js',
				);
			const accordionRow = (accordion2) => emotion_react_browser_esm.iv`
	border-top: 1px solid ${accordion2.border};
`,
				buttonStyles = emotion_react_browser_esm.iv`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: ${space.K[1]} 0 ${space.K[5]} 0;
	cursor: pointer;
`,
				labelText = emotion_react_browser_esm.iv`
	${typography.yLC};
	margin-right: ${space.K[4]};
`,
				expandedBodyStyles = (
					accordion2,
				) => emotion_react_browser_esm.iv`
	/*
	TODO:
	Hardcoded max-height because auto is invalid.
	If content is longer, we'll need to set overflow: auto
	but only after max-height has been reached.
	Otherwise, for short content we'll always see a flash
	of a scrollbar as the row height is transitioning
	*/
	color: ${accordion2.textBody};
	max-height: 500px;
	transition: max-height ${transitions.p.medium};
	overflow: hidden;
	height: auto;
	padding-bottom: ${space.K[5]};
`,
				collapsedBodyStyles = emotion_react_browser_esm.iv`
	max-height: 0;
	/*
	TODO:
	This transition is being ignored as the hidden
	attribute is applied immediately

	transition: max-height ${transitions.p.short};
	*/
	overflow: hidden;
`,
				collapsedBody = emotion_react_browser_esm.iv`
	${collapsedBodyStyles};
`,
				toggle = emotion_react_browser_esm.iv`
	width: auto;
	display: flex;
	align-items: center;
`,
				toggleLabel = (accordion2) => emotion_react_browser_esm.iv`
	${typography.fRL};
	color: ${accordion2.textLabel};
	${mq.C4.tablet} {
		${visually_hidden.j}
	}
`,
				chevronIcon = emotion_react_browser_esm.iv`
	svg {
		/* TODO: think about icon sizing */
		width: 18px;
		height: 18px;

		${mq.Dp.tablet} {
			width: 26px;
			height: 26px;
		}
		margin-left: ${space.K[1]};
		transition: ${transitions.p.short};
	}
`,
				chevronIconDown = emotion_react_browser_esm.iv`
	${chevronIcon};
	svg {
		transform: translate(0, 0);
		transition: transform ${transitions.p.short};
	}

	&:hover,
	&:focus {
		svg {
			transform: translate(0, ${space.D[1] / 2}px);
		}
	}
`,
				chevronIconUp = emotion_react_browser_esm.iv`
	${chevronIcon};
	svg {
		transform: rotate(180deg);
		transition: transform ${transitions.p.short};
	}
`,
				toggleIconWithLabel = emotion_react_browser_esm.iv`
	svg {
		width: 18px;
		height: 18px;
	}
`;
			var palette = __webpack_require__(
				'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
			);
			const themeAccordion = {
					textLabel: palette.palette.neutral[7],
					textBody: palette.palette.neutral[7],
					textCta: palette.palette.neutral[7],
					border: palette.palette.neutral[60],
					iconFill: palette.palette.neutral[7],
				},
				transformProviderTheme =
					(palette.palette.neutral[7],
					palette.palette.neutral[60],
					(providerTheme) => {
						const transformedTheme = {};
						return (
							providerTheme?.textPrimary &&
								((transformedTheme.textLabel =
									providerTheme.textPrimary),
								(transformedTheme.textBody =
									providerTheme.textPrimary),
								(transformedTheme.textCta =
									providerTheme.textPrimary)),
							providerTheme?.borderPrimary &&
								(transformedTheme.border =
									providerTheme.borderPrimary),
							transformedTheme
						);
					}),
				Accordion = ({
					hideToggleLabel = !1,
					children,
					cssOverrides,
					theme,
					...props
				}) => {
					const mergedTheme = (providerTheme) =>
						(0, themes.I)(
							themeAccordion,
							theme,
							providerTheme,
							transformProviderTheme,
						);
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						'div',
						{
							css: (providerTheme) => {
								return [
									((accordion2 = mergedTheme(
										providerTheme.accordion,
									)),
									emotion_react_browser_esm.iv`
	border-bottom: 1px solid ${accordion2.border};
`),
									cssOverrides,
								];
								var accordion2;
							},
							...props,
							children: react.Children.map(children, (child) =>
								(0, react.cloneElement)(child, {
									hideToggleLabel,
								}),
							),
						},
					);
				};
			var SvgChevronDownSingle = __webpack_require__(
				'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgChevronDownSingle.js',
			);
			const visuallyHidden = emotion_react_browser_esm.iv`
	${visually_hidden.j}
`,
				AccordionRowNoJS = ({
					label,
					hideToggleLabel = !1,
					children,
					cssOverrides,
					theme,
					...props
				}) => {
					const mergedTheme = (providerTheme) =>
						(0, themes.I)(
							themeAccordion,
							theme,
							providerTheme,
							transformProviderTheme,
						);
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						'div',
						{
							css: (providerTheme) => [
								accordionRow(
									mergedTheme(providerTheme.accordion),
								),
								cssOverrides,
							],
							...props,
							children: (0,
							emotion_react_jsx_runtime_browser_esm.BX)('label', {
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'input',
										{
											type: 'checkbox',
											css: (providerTheme) => {
												return (
													(accordion2 = mergedTheme(
														providerTheme.accordion,
													)),
													emotion_react_browser_esm.iv`
	${visually_hidden.j};

	&:focus + [data-target='label'] > [data-target='toggle'] {
		${focus_halo.y};
	}

	&:not(:checked) ~ [data-target='body'] {
		${collapsedBodyStyles};
		display: none;
	}

	&:checked ~ [data-target='body'] {
		${expandedBodyStyles(accordion2)};
	}

	&:not(:checked) + [data-target='label'] [data-target='toggle-label-hide'] {
		display: none;
	}

	&:checked + [data-target='label'] [data-target='toggle-label-show'] {
		display: none;
	}
`
												);
												var accordion2;
											},
											role: 'button',
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'div',
										{
											css: (providerTheme) => {
												return (
													(accordion2 = mergedTheme(
														providerTheme.accordion,
													)),
													emotion_react_browser_esm.iv`
	${buttonStyles};
	color: ${accordion2.textCta};
`
												);
												var accordion2;
											},
											'data-target': 'label',
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'strong',
													{
														css: labelText,
														children: label,
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'div',
													{
														'data-target': 'toggle',
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'div',
																{
																	css: [
																		toggle,
																		chevronIconDown,
																		hideToggleLabel
																			? ''
																			: toggleIconWithLabel,
																	],
																	'data-target':
																		'toggle-label-show',
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.BX)(
																			'span',
																			{
																				css: (
																					providerTheme,
																				) => [
																					toggleLabel(
																						mergedTheme(
																							providerTheme.accordion,
																						),
																					),
																					hideToggleLabel
																						? visuallyHidden
																						: '',
																				],
																				children:
																					[
																						'Show',
																						(0,
																						emotion_react_jsx_runtime_browser_esm.tZ)(
																							'span',
																							{
																								css: visuallyHidden,
																								children:
																									' more',
																							},
																						),
																					],
																			},
																		),
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			SvgChevronDownSingle.z,
																			{
																				theme: {
																					fill: theme?.iconFill,
																				},
																			},
																		),
																	],
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'div',
																{
																	css: [
																		toggle,
																		chevronIconUp,
																		hideToggleLabel
																			? ''
																			: toggleIconWithLabel,
																	],
																	'data-target':
																		'toggle-label-hide',
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'span',
																			{
																				css: (
																					providerTheme,
																				) => [
																					toggleLabel(
																						mergedTheme(
																							providerTheme.accordion,
																						),
																					),
																					hideToggleLabel
																						? visuallyHidden
																						: '',
																				],
																				children:
																					'Hide',
																			},
																		),
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			SvgChevronDownSingle.z,
																			{
																				theme: {
																					fill: theme?.iconFill,
																				},
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
											css: collapsedBody,
											'data-target': 'body',
											children: (0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'div',
												{ children },
											),
										},
									),
								],
							}),
						},
					);
				},
				AccordionRow_visuallyHidden = emotion_react_browser_esm.iv`
	${visually_hidden.j}
`,
				AccordionRow = ({
					label,
					hideToggleLabel = !1,
					children,
					cssOverrides,
					onClick = () => {},
					theme,
				}) => {
					const [expanded, setExpanded] = (0, react.useState)(!1),
						[isBrowser, setIsBrowser] = (0, react.useState)(!1),
						mergedTheme = (providerTheme) =>
							(0, themes.I)(
								themeAccordion,
								theme,
								providerTheme,
								transformProviderTheme,
							);
					return (
						(0, react.useEffect)(() => {
							setIsBrowser(!0);
						}, []),
						isBrowser
							? (0, emotion_react_jsx_runtime_browser_esm.BX)(
									'div',
									{
										css: (providerTheme) => [
											accordionRow(
												mergedTheme(
													providerTheme.accordion,
												),
											),
											cssOverrides,
										],
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'button',
												{
													type: 'button',
													'aria-expanded': expanded,
													onClick:
														function handleClick(
															event,
														) {
															setExpanded(
																!expanded,
															),
																onClick(event);
														},
													css: (providerTheme) => {
														return [
															((accordion2 =
																mergedTheme(
																	providerTheme.accordion,
																)),
															emotion_react_browser_esm.iv`
	${buttonStyles};
	color: ${accordion2.textCta};

	/* user agent overrides */
	background: none;
	outline: none;
	border: none;
	text-align: left;

	&:focus div {
		${focus_halo.y};
	}
`),
															expanded
																? chevronIconUp
																: chevronIconDown,
															hideToggleLabel
																? ''
																: toggleIconWithLabel,
														];
														var accordion2;
													},
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'strong',
															{
																css: labelText,
																children: label,
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															'div',
															{
																css: toggle,
																children: [
																	hideToggleLabel
																		? (0,
																		  emotion_react_jsx_runtime_browser_esm.tZ)(
																				'span',
																				{
																					css: AccordionRow_visuallyHidden,
																					children:
																						expanded
																							? 'Hide'
																							: 'Show more',
																				},
																		  )
																		: (0,
																		  emotion_react_jsx_runtime_browser_esm.tZ)(
																				'span',
																				{
																					css: (
																						providerTheme,
																					) =>
																						toggleLabel(
																							mergedTheme(
																								providerTheme.accordion,
																							),
																						),
																					children:
																						expanded
																							? 'Hide'
																							: (0,
																							  emotion_react_jsx_runtime_browser_esm.BX)(
																									emotion_react_jsx_runtime_browser_esm.HY,
																									{
																										children:
																											[
																												'Show',
																												(0,
																												emotion_react_jsx_runtime_browser_esm.tZ)(
																													'span',
																													{
																														css: AccordionRow_visuallyHidden,
																														children:
																															' more',
																													},
																												),
																											],
																									},
																							  ),
																				},
																		  ),
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		SvgChevronDownSingle.z,
																		{
																			theme: {
																				fill: theme?.iconFill,
																			},
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
													css: (providerTheme) => {
														return expanded
															? ((accordion2 =
																	mergedTheme(
																		providerTheme.accordion,
																	)),
															  emotion_react_browser_esm.iv`
	${expandedBodyStyles(accordion2)};
`)
															: collapsedBody;
														var accordion2;
													},
													children: (0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'div',
														{
															hidden: !expanded,
															children,
														},
													),
												},
											),
										],
									},
							  )
							: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
									AccordionRowNoJS,
									{
										label,
										hideToggleLabel,
										cssOverrides,
										children,
									},
							  )
					);
				};
			var Stack = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/stack/Stack.js',
				),
				callCentreData = __webpack_require__(
					'./client/components/shared/callCentreData.ts',
				),
				CallCentreAccordion = (_ref) => {
					var { showEmailAddress, phoneRegionFilterKeys } = _ref,
						filteredPhoneData = callCentreData.n.filter(
							(phoneRegion) =>
								!phoneRegionFilterKeys ||
								phoneRegionFilterKeys.includes(phoneRegion.key),
						);
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						Accordion,
						{
							children: filteredPhoneData.map((phoneRegion) =>
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									AccordionRow,
									{
										cssOverrides: (0,
										emotion_react_browser_esm.iv)(
											'>button{>strong{',
											typography.Kz0,
											';}}',
											'',
										),
										label: phoneRegion.title,
										children: (0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											Stack.K,
											{
												space: 2,
												cssOverrides: (0,
												emotion_react_browser_esm.iv)(
													typography.Kz0,
													';',
													'',
												),
												children: [
													showEmailAddress &&
														(0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															emotion_react_jsx_runtime_browser_esm.HY,
															{
																children: [
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'div',
																		{
																			children:
																				'Email:',
																		},
																	),
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'strong',
																		{
																			children:
																				callCentreData.Q,
																		},
																	),
																],
															},
														),
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'div',
														{ children: 'Phone:' },
													),
													phoneRegion.phoneNumbers.map(
														(_ref2) => {
															var {
																phoneNumber,
																suffix,
															} = _ref2;
															return (0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'div',
																{
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'strong',
																			{
																				children:
																					phoneNumber,
																			},
																		),
																		suffix &&
																			(0,
																			emotion_react_jsx_runtime_browser_esm.BX)(
																				'span',
																				{
																					children:
																						[
																							' ',
																							suffix,
																						],
																				},
																			),
																	],
																},
																phoneNumber,
															);
														},
													),
													phoneRegion.openingHours.map(
														(
															openingHourLine,
															openingHoursLineKey,
														) =>
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'div',
																{
																	children:
																		openingHourLine,
																},
																openingHoursLineKey,
															),
													),
													phoneRegion.additionalOpeningHoursInfo &&
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'div',
															{
																children:
																	phoneRegion.additionalOpeningHoursInfo,
															},
														),
												],
											},
										),
									},
									phoneRegion.key,
								),
							),
						},
					);
				};
			try {
				(CallCentreAccordion.displayName = 'CallCentreAccordion'),
					(CallCentreAccordion.__docgenInfo = {
						description: '',
						displayName: 'CallCentreAccordion',
						props: {
							showEmailAddress: {
								defaultValue: null,
								description: '',
								name: 'showEmailAddress',
								required: !1,
								type: { name: 'boolean' },
							},
							phoneRegionFilterKeys: {
								defaultValue: null,
								description: '',
								name: 'phoneRegionFilterKeys',
								required: !1,
								type: { name: 'PhoneRegionKey[]' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/shared/CallCentreAccordion.tsx#CallCentreAccordion'
						] = {
							docgenInfo: CallCentreAccordion.__docgenInfo,
							name: 'CallCentreAccordion',
							path: 'client/components/shared/CallCentreAccordion.tsx#CallCentreAccordion',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/shared/callCentreData.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				Q: () => customerHelpEmailAddress,
				n: () => phoneData,
			});
			var customerHelpEmailAddress = 'customer.help@theguardian.com',
				phoneData = [
					{
						key: 'UK & ROW',
						title: 'United Kingdom, Europe and rest of world',
						openingHours: [
							'8am - 6pm Monday - Friday (GMT/BST)',
							'9am - 6pm Saturday - Sunday (GMT/BST)',
						],
						phoneNumbers: [{ phoneNumber: '+44 (0) 330 333 6767' }],
					},
					{
						key: 'AUS',
						title: 'Australia, New Zealand, and Asia Pacific',
						openingHours: ['9am - 5pm Monday - Friday (AEDT)'],
						phoneNumbers: [
							{
								phoneNumber: '1800 773 766',
								suffix: '(within Australia)',
							},
							{
								phoneNumber: '+61 28076 8599',
								suffix: '(outside Australia)',
							},
						],
					},
					{
						key: 'US',
						title: 'Canada and USA',
						openingHours: ['9am - 5pm on weekdays (EST/EDT)'],
						phoneNumbers: [
							{
								phoneNumber: '1-844-632-2010',
								suffix: '(toll free USA)',
							},
							{
								phoneNumber: '+1 917-900-4663',
								suffix: '(outside USA)',
							},
						],
					},
				];
		},
	},
]);
//# sourceMappingURL=1976.d92f5edb.iframe.bundle.js.map
