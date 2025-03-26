'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[635],
	{
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
		'./client/components/mma/help/Help.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					Default: () => Default,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => Help_stories,
				});
			var ReactRouterDecorator = __webpack_require__(
					'./.storybook/ReactRouterDecorator.tsx',
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
				palette = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
				),
				mq = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
				),
				LinkButton = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/button/LinkButton.js',
				),
				Stack = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/stack/Stack.js',
				),
				react = __webpack_require__('./node_modules/react/index.js'),
				analytics = __webpack_require__(
					'./client/utilities/analytics.ts',
				),
				CallCenterEmailAndNumbers = __webpack_require__(
					'./client/components/shared/CallCenterEmailAndNumbers.tsx',
				),
				NavConfig = __webpack_require__(
					'./client/components/shared/nav/NavConfig.tsx',
				),
				Page = __webpack_require__('./client/components/mma/Page.tsx'),
				emotion_react_jsx_runtime_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				);
			var highlightedQuestions = [
					{
						id: 'q1',
						title: "Can my delivery be suspended while I'm on holiday?",
						link: 'https://manage.theguardian.com/help-centre/article/i-need-to-pause-my-delivery',
					},
					{
						id: 'q2',
						title: 'How do I change my delivery address?',
						link: 'https://manage.theguardian.com/help-centre/article/i-need-to-change-my-delivery-address',
					},
					{
						id: 'q3',
						title: 'My delivery is late or missing',
						link: 'https://manage.theguardian.com/help-centre/article/my-delivery-is-late-or-missing',
					},
					{
						id: 'q4',
						title: 'Where can I use my Subscription Card or vouchers?',
						link: 'https://manage.theguardian.com/help-centre/article/im-a-print-subscriber-where-can-i-pick-up-my-papers',
					},
					{
						id: 'q5',
						title: 'How do I update my payment details?',
						link: 'https://manage.theguardian.com/help-centre/article/how-do-i-update-my-payment-details',
					},
					{
						id: 'q6',
						title: 'How do I reset my password?',
						link: 'https://manage.theguardian.com/help-centre/article/ive-forgotten-my-password',
					},
				],
				listStyle = {
					name: 'l9ibn0',
					styles: 'list-style:none;margin:0 0 20px;padding:0',
				},
				listItemStyle = (0, emotion_react_browser_esm.iv)(
					'display:block;&+li{margin-top:',
					space.D[5],
					'px;}',
					'',
				),
				listItemAnchorStyle = (0, emotion_react_browser_esm.iv)(
					typography.Kz0,
					';color:',
					palette.palette.neutral[20],
					';text-decoration:underline;',
					'',
				),
				h2Style = (0, emotion_react_browser_esm.iv)(
					'border-top:1px solid ',
					palette.palette.neutral[86],
					';margin-top:30px;',
					mq.Dp.tablet,
					'{margin-top:40px;}',
					typography.Hu7,
					';',
					'',
				),
				h3Style = (0, emotion_react_browser_esm.iv)(
					'margin-top:30px;',
					mq.Dp.tablet,
					'{margin-top:40px;}',
					typography.fy7,
					';',
					'',
				),
				pStyle = (0, emotion_react_browser_esm.iv)(
					typography.Kz0,
					';margin-top:30px;',
					mq.Dp.tablet,
					'{margin-top:40px;}',
					'',
				),
				Help = () => {
					var isOpen,
						[callCentreOpen, setCallCentreOpen] = (0,
						react.useState)(!1);
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						Page._,
						{
							selectedNavItem: NavConfig.qy.help,
							pageTitle: 'Help',
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'h2',
									{
										css: h2Style,
										children: 'How can we help?',
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'ul',
									{
										css: listStyle,
										children: highlightedQuestions.map(
											(question) =>
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'li',
													{
														css: listItemStyle,
														children: (0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'a',
															{
																href: question.link,
																css: listItemAnchorStyle,
																children:
																	question.title,
															},
														),
													},
													question.id,
												),
										),
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'h3',
									{
										css: h3Style,
										children:
											'Can’t find what you’re looking for?',
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'p',
									{
										css: (0, emotion_react_browser_esm.iv)(
											typography.Kz0,
											';',
											'',
										),
										children:
											'Visit our Help Centre to find more useful information',
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									LinkButton.Q,
									{
										href: '/help-centre#call-us',
										priority: 'secondary',
										onClick: () =>
											(0, analytics.L9)({
												eventCategory: 'help-page',
												eventAction:
													'help-centre-cta-click',
											}),
										children: 'Visit Help Centre',
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
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
														';margin:30px 0 0;',
														'',
													),
													children: [
														'If you still can’t find what you need and want to contact us, check',
														' ',
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'span',
															{
																css:
																	((isOpen =
																		callCentreOpen),
																	(0,
																	emotion_react_browser_esm.iv)(
																		'cursor:pointer;text-decoration:underline;color:',
																		palette
																			.palette
																			.brand[500],
																		";position:relative;:after{content:'';display:block;width:7px;height:7px;border-top:2px solid ",
																		palette
																			.palette
																			.brand[500],
																		';border-right:2px solid ',
																		palette
																			.palette
																			.brand[500],
																		';position:absolute;top:50%;transform:',
																		isOpen
																			? 'translateY(-5%) rotate(315deg)'
																			: 'translateY(-50%) rotate(135deg)',
																		';transition:transform 0.3s ease;right:-12px;}',
																		'',
																	)),
																onClick: () =>
																	setCallCentreOpen(
																		!callCentreOpen,
																	),
																children:
																	'here',
															},
														),
													],
												},
											),
											callCentreOpen &&
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													emotion_react_jsx_runtime_browser_esm.HY,
													{
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																CallCenterEmailAndNumbers.K,
																{},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'p',
																{
																	css: pStyle,
																	children:
																		'Or use our contact form to get in touch and we’ll get back to you as soon as possible.',
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																LinkButton.Q,
																{
																	href: '/help-centre/contact-us/',
																	priority:
																		'secondary',
																	onClick:
																		() =>
																			(0,
																			analytics.L9)(
																				{
																					eventCategory:
																						'help-page',
																					eventAction:
																						'contact-us-cta-click',
																				},
																			),
																	children:
																		'Take me to the form',
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
			const Help_stories = {
				title: 'Pages/Help',
				component: Help,
				decorators: [ReactRouterDecorator.R],
				parameters: {
					layout: 'fullscreen',
					chromatic: { viewports: [320, 1300] },
				},
			};
			var Default = () =>
				(0, emotion_react_jsx_runtime_browser_esm.tZ)(Help, {});
			Default.parameters = {
				...Default.parameters,
				docs: {
					...Default.parameters?.docs,
					source: {
						originalSource: '() => <Help />',
						...Default.parameters?.docs?.source,
					},
				},
			};
			const __namedExportsOrder = ['Default'];
		},
	},
]);
//# sourceMappingURL=components-mma-help-Help-stories.10fd8cd3.iframe.bundle.js.map
