'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[9322],
	{
		'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgChevronLeftSingle.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					S: () => SvgChevronLeftSingle,
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
										d: 'M16.721 1 6.25 11.471v1.058L16.721 23l.982-.956L9.321 12l8.382-10.043z',
										fill: theme?.fill,
									},
								),
							},
						),
					SvgChevronLeftSingle = ({
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
													children: 'Chevron left',
												},
										  )
										: '',
								],
							},
						);
			},
		'./client/components/helpCentre/BackToHelpCentreLink.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				z: () => BackToHelpCentreLink,
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
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
				_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_6__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgChevronLeftSingle.js',
					),
				react_router_dom__WEBPACK_IMPORTED_MODULE_5__ =
					__webpack_require__(
						'./node_modules/react-router-dom/index.js',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			var dividerCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'margin-top:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[12],
					'px;padding-top:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[9],
					'px;border-top:1px solid ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.neutral[86],
					';',
					'',
				),
				linkCss = (0, _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'display:flex;align-items:center;',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__.Kz0,
					';color:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.brand[500],
					';&:hover,&:focus{text-decoration:underline;}',
					'',
				),
				linkIconCss = {
					name: '1bislre',
					styles: 'width:18px;height:18px;margin:0 4px 2px -4px;&>svg{stroke:currentColor;}',
				},
				BackToHelpCentreLink = () =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
						'div',
						{
							css: dividerCss,
							children: (0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.BX)(
								react_router_dom__WEBPACK_IMPORTED_MODULE_5__.rU,
								{
									to: '/help-centre',
									css: linkCss,
									children: [
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
											'span',
											{
												css: linkIconCss,
												children: (0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
													_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_6__.S,
													{},
												),
											},
										),
										'Back to Help Centre',
									],
								},
							),
						},
					);
		},
		'./client/components/shared/Spinner.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { $: () => Spinner });
			var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			var scaledPx = function (original) {
					var scale =
						arguments.length > 1 && void 0 !== arguments[1]
							? arguments[1]
							: 1;
					return ''.concat(Math.ceil(original * scale), 'px');
				},
				_ref = {
					name: '1xncvma',
					styles: '@keyframes spin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}',
				},
				Spinner = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.BX)(
						'div',
						{
							css: (0,
							_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(
								{
									alignItems: 'center',
									display: props.inline
										? 'inline-flex'
										: 'flex',
									justifyContent: props.alignCenter
										? 'center'
										: '',
								},
								'',
								'',
							),
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
									_emotion_react__WEBPACK_IMPORTED_MODULE_1__.xB,
									{ styles: _ref },
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
									'div',
									{
										css: (0,
										_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(
											{
												border: ''.concat(
													scaledPx(6, props.scale),
													' solid #f3f3f3',
												),
												borderTop: ''.concat(
													scaledPx(6, props.scale),
													' solid #333',
												),
												borderRadius: '50%',
												width: scaledPx(
													40,
													props.scale,
												),
												height: scaledPx(
													40,
													props.scale,
												),
												animation:
													'spin 2s linear infinite',
												margin: scaledPx(
													10,
													props.scale,
												),
												flexShrink: 0,
											},
											'',
											'',
										),
									},
								),
								props.loadingMessage,
							],
						},
					);
			try {
				(Spinner.displayName = 'Spinner'),
					(Spinner.__docgenInfo = {
						description: '',
						displayName: 'Spinner',
						props: {
							loadingMessage: {
								defaultValue: null,
								description: '',
								name: 'loadingMessage',
								required: !1,
								type: { name: 'string' },
							},
							scale: {
								defaultValue: null,
								description: '',
								name: 'scale',
								required: !1,
								type: { name: 'number' },
							},
							inline: {
								defaultValue: null,
								description: '',
								name: 'inline',
								required: !1,
								type: { name: 'true' },
							},
							alignCenter: {
								defaultValue: null,
								description: '',
								name: 'alignCenter',
								required: !1,
								type: { name: 'true' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/shared/Spinner.tsx#Spinner'
						] = {
							docgenInfo: Spinner.__docgenInfo,
							name: 'Spinner',
							path: 'client/components/shared/Spinner.tsx#Spinner',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/shared/WithStandardTopMargin.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				z: () => WithStandardTopMargin,
			});
			var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
				__webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				);
			var _ref = { name: 'kmzqzw', styles: 'margin-top:1.8125rem' },
				WithStandardTopMargin = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
						'div',
						{ css: _ref, children: props.children },
					);
			try {
				(WithStandardTopMargin.displayName = 'WithStandardTopMargin'),
					(WithStandardTopMargin.__docgenInfo = {
						description: '',
						displayName: 'WithStandardTopMargin',
						props: {},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/shared/WithStandardTopMargin.tsx#WithStandardTopMargin'
						] = {
							docgenInfo: WithStandardTopMargin.__docgenInfo,
							name: 'WithStandardTopMargin',
							path: 'client/components/shared/WithStandardTopMargin.tsx#WithStandardTopMargin',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/helpCentre/HelpCentreTopic.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					Default: () => Default,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => HelpCentreTopic_stories,
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
				esm = __webpack_require__(
					'./node_modules/@sentry/minimal/esm/index.js',
				),
				react = __webpack_require__('./node_modules/react/index.js'),
				react_router = __webpack_require__(
					'./node_modules/react-router/index.js',
				),
				Spinner = __webpack_require__(
					'./client/components/shared/Spinner.tsx',
				),
				WithStandardTopMargin = __webpack_require__(
					'./client/components/shared/WithStandardTopMargin.tsx',
				),
				BackToHelpCentreLink = __webpack_require__(
					'./client/components/helpCentre/BackToHelpCentreLink.tsx',
				),
				emotion_react_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
				),
				typography = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
				),
				space = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
				),
				mq = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
				),
				palette = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
				),
				react_router_dom = __webpack_require__(
					'./node_modules/react-router-dom/index.js',
				),
				analytics = __webpack_require__(
					'./client/utilities/analytics.ts',
				),
				HelpCentreStyles = __webpack_require__(
					'./client/components/helpCentre/HelpCentreStyles.tsx',
				),
				emotion_react_jsx_runtime_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				);
			var moreTopicsStyles = {
					name: '1uc73wg',
					styles: "margin-bottom:'10px';display:'flex';flex-wrap:'wrap';text-align:'left';font-weight:'normal'",
				},
				showHideCss = (0, emotion_react_browser_esm.iv)(
					typography.AjP,
					';margin-left:',
					space.D[3],
					'px;',
					mq.C4.mobileMedium,
					'{display:none;}',
					'',
				),
				HelpCentreMoreTopics = (props) => {
					var [openSection, setOpenSection] = (0, react.useState)(),
						moreTopicContainterCss = (0,
						emotion_react_browser_esm.iv)(
							'width:100%;border-top:1px solid ',
							palette.palette.neutral[86],
							';border-bottom:1px solid ',
							palette.palette.neutral[86],
							';',
							'',
						);
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'h2',
									{
										css: HelpCentreStyles._h,
										children: props.moreTopics.title,
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'div',
									{
										css: moreTopicsStyles,
										children: (0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'div',
											{
												css: moreTopicContainterCss,
												children:
													props.moreTopics.topics.map(
														(topic, topicIndex) => {
															var isOpen =
																	topicIndex ===
																	openSection,
																isNotFirstOption =
																	topicIndex >
																	0,
																moreTopicSectionTitleCss =
																	(0,
																	emotion_react_browser_esm.iv)(
																		(0,
																		HelpCentreStyles.MF)(
																			isOpen,
																			isNotFirstOption,
																		),
																		';padding-left:0;',
																		'',
																	);
															return (0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'div',
																{
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.BX)(
																			'h2',
																			{
																				css: moreTopicSectionTitleCss,
																				onClick:
																					() =>
																						setOpenSection(
																							openSection ===
																								topicIndex
																								? -1
																								: topicIndex,
																						),
																				children:
																					[
																						topic.title,
																						(0,
																						emotion_react_jsx_runtime_browser_esm.tZ)(
																							'span',
																							{
																								css: showHideCss,
																								children:
																									isOpen
																										? 'Hide'
																										: 'Show',
																							},
																						),
																					],
																			},
																		),
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'ul',
																			{
																				css: (0,
																				HelpCentreStyles.NR)(
																					isOpen,
																				),
																				children:
																					topic.articles.map(
																						(
																							article,
																							articleIndex,
																						) => {
																							return (0,
																							emotion_react_jsx_runtime_browser_esm.BX)(
																								'li',
																								{
																									css:
																										((index =
																											articleIndex),
																										(length =
																											topic
																												.articles
																												.length),
																										(0,
																										emotion_react_browser_esm.iv)(
																											HelpCentreStyles.P3,
																											';',
																											index <
																												length -
																													1 &&
																												'border-bottom: 1px solid '.concat(
																													palette
																														.palette
																														.neutral[86],
																												),
																											';',
																											'',
																										)),
																									children:
																										[
																											(0,
																											emotion_react_jsx_runtime_browser_esm.tZ)(
																												react_router_dom.rU,
																												{
																													css: HelpCentreStyles.BR,
																													to: '/help-centre/article/'.concat(
																														article.path,
																													),
																													replace:
																														!1,
																													onClick:
																														() => {
																															(0,
																															analytics.L9)(
																																{
																																	eventCategory:
																																		'help-centre',
																																	eventAction:
																																		'article-click',
																																	eventLabel:
																																		''
																																			.concat(
																																				topic.path,
																																				':',
																																			)
																																			.concat(
																																				article.path,
																																			),
																																},
																															);
																														},
																													children:
																														article.title,
																												},
																											),
																											(0,
																											emotion_react_jsx_runtime_browser_esm.tZ)(
																												'span',
																												{
																													css: HelpCentreStyles.BC,
																												},
																											),
																										],
																								},
																								article.path,
																							);
																							var index,
																								length;
																						},
																					),
																			},
																		),
																	],
																},
																topic.path,
															);
														},
													),
											},
										),
									},
								),
							],
						},
					);
				};
			try {
				(HelpCentreMoreTopics.displayName = 'HelpCentreMoreTopics'),
					(HelpCentreMoreTopics.__docgenInfo = {
						description: '',
						displayName: 'HelpCentreMoreTopics',
						props: {
							id: {
								defaultValue: null,
								description: '',
								name: 'id',
								required: !0,
								type: { name: 'string' },
							},
							moreTopics: {
								defaultValue: null,
								description: '',
								name: 'moreTopics',
								required: !0,
								type: { name: 'MoreTopics' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/helpCentre/HelpCentreMoreTopics.tsx#HelpCentreMoreTopics'
						] = {
							docgenInfo: HelpCentreMoreTopics.__docgenInfo,
							name: 'HelpCentreMoreTopics',
							path: 'client/components/helpCentre/HelpCentreMoreTopics.tsx#HelpCentreMoreTopics',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var ulCss = (0, emotion_react_browser_esm.iv)(
					HelpCentreStyles.gx,
					';margin:',
					space.D[9],
					'px 0 60px;',
					'',
				),
				HelpCentreSingleTopic = (props) =>
					(0, emotion_react_jsx_runtime_browser_esm.BX)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'h2',
									{
										css: HelpCentreStyles._h,
										children: props.topic.title,
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'ul',
									{
										css: ulCss,
										children: props.topic.articles.map(
											(article, articleIndex) => {
												return (0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'li',
													{
														css:
															((index =
																articleIndex),
															(0,
															emotion_react_browser_esm.iv)(
																HelpCentreStyles.Q,
																';padding:15px ',
																space.D[5],
																'px 15px 0;border-top:',
																0 === index
																	? '1px solid #DCDCDC'
																	: 'none',
																';',
																'',
															)),
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																react_router_dom.rU,
																{
																	css: HelpCentreStyles.BR,
																	to: '/help-centre/article/'.concat(
																		article.path,
																	),
																	replace: !1,
																	onClick:
																		() => {
																			(0,
																			analytics.L9)(
																				{
																					eventCategory:
																						'help-centre',
																					eventAction:
																						'article-click',
																					eventLabel:
																						''
																							.concat(
																								props.id,
																								':',
																							)
																							.concat(
																								article.path,
																							),
																				},
																			);
																		},
																	children:
																		article.title,
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'span',
																{
																	css: HelpCentreStyles.BC,
																},
															),
														],
													},
													''
														.concat(
															props.id,
															'Article-',
														)
														.concat(articleIndex),
												);
												var index;
											},
										),
									},
								),
							],
						},
					);
			try {
				(HelpCentreSingleTopic.displayName = 'HelpCentreSingleTopic'),
					(HelpCentreSingleTopic.__docgenInfo = {
						description: '',
						displayName: 'HelpCentreSingleTopic',
						props: {
							id: {
								defaultValue: null,
								description: '',
								name: 'id',
								required: !0,
								type: { name: 'string' },
							},
							topic: {
								defaultValue: null,
								description: '',
								name: 'topic',
								required: !0,
								type: { name: 'SingleTopic' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/helpCentre/HelpCentreSingleTopic.tsx#HelpCentreSingleTopic'
						] = {
							docgenInfo: HelpCentreSingleTopic.__docgenInfo,
							name: 'HelpCentreSingleTopic',
							path: 'client/components/helpCentre/HelpCentreSingleTopic.tsx#HelpCentreSingleTopic',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var HelpCentreTopic = () => {
					var [singleTopic, setSingleTopic] = (0, react.useState)(
							void 0,
						),
						[moreTopics, setMoreTopics] = (0, react.useState)(
							void 0,
						),
						setSelectedTopicObject = (0, react.useContext)(
							SectionContent.q,
						),
						navigate = (0, react_router.s0)(),
						{ topicCode } = (0, react_router.UO)();
					return (
						(0, react.useEffect)(() => {
							setSingleTopic(void 0),
								setMoreTopics(void 0),
								fetch(
									'/api/help-centre/topic/'.concat(topicCode),
								)
									.then((response) => {
										if (response.ok) return response.json();
										(0, esm.uT)(
											'Fetching topic '
												.concat(topicCode, ' returned ')
												.concat(response.status, '.'),
										),
											navigate('/help-centre');
									})
									.then((topicData) => {
										topicData.topics
											? setMoreTopics(topicData)
											: setSingleTopic(topicData);
									})
									.catch((error) =>
										(0, esm.Tb)(
											'Failed to fetch topic '
												.concat(topicCode, '. Error: ')
												.concat(error),
										),
									),
								setSelectedTopicObject(topicCode);
						}, [topicCode, navigate, setSelectedTopicObject]),
						(0, emotion_react_jsx_runtime_browser_esm.BX)(
							emotion_react_jsx_runtime_browser_esm.HY,
							{
								children: [
									getTopicComponent(
										topicCode,
										singleTopic,
										moreTopics,
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										BackToHelpCentreLink.z,
										{},
									),
								],
							},
						)
					);
				},
				getTopicComponent = (topicCode, singleTopic, moreTopics) =>
					singleTopic
						? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
								HelpCentreSingleTopic,
								{
									id: null != topicCode ? topicCode : '',
									topic: singleTopic,
								},
						  )
						: moreTopics
						? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
								HelpCentreMoreTopics,
								{
									id: null != topicCode ? topicCode : '',
									moreTopics,
								},
						  )
						: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
								WithStandardTopMargin.z,
								{
									children: (0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										Spinner.$,
										{ loadingMessage: 'Fetching topic...' },
									),
								},
						  );
			const HelpCentreTopic_stories = {
				title: 'Pages/HelpCentreTopic',
				component: HelpCentreTopic,
				decorators: [ReactRouterDecorator.R],
				parameters: { layout: 'fullscreen' },
			};
			var topicContent = {
					path: 'delivery',
					title: 'Delivery',
					articles: [
						{
							path: 'i-need-to-pause-my-delivery',
							title: 'I need to pause my delivery',
						},
						{
							path: 'my-delivery-is-late-or-missing',
							title: 'My delivery is late or missing',
						},
						{
							path: 'my-paper-is-missing-a-section',
							title: 'My paper is missing a section',
						},
					],
				},
				Default = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.BX)(
							emotion_react_jsx_runtime_browser_esm.HY,
							{
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										SectionHeader.M,
										{
											title: 'How can we help you?',
											pageHasNav: !0,
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										SectionContent.Z,
										{
											hasNav: !0,
											children: (0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												HelpCentreTopic,
												{},
											),
										},
									),
								],
							},
						),
					parameters: {
						msw: [
							http.d.get('/api/help-centre/topic/delivery', () =>
								HttpResponse.Z.json(topicContent),
							),
						],
						reactRouter: {
							location: '/topic/delivery',
							path: '/topic/:topicCode',
						},
					},
				};
			Default.parameters = {
				...Default.parameters,
				docs: {
					...Default.parameters?.docs,
					source: {
						originalSource:
							"{\n  render: () => {\n    return <>\n                <SectionHeader title=\"How can we help you?\" pageHasNav={true} />\n                <SectionContent hasNav={true}>\n                    <HelpCentreTopic />\n                </SectionContent>\n            </>;\n  },\n  parameters: {\n    msw: [http.get('/api/help-centre/topic/delivery', () => {\n      return HttpResponse.json(topicContent);\n    })],\n    reactRouter: {\n      location: '/topic/delivery',\n      path: '/topic/:topicCode'\n    }\n  }\n}",
						...Default.parameters?.docs?.source,
					},
				},
			};
			const __namedExportsOrder = ['Default'];
		},
	},
]);
//# sourceMappingURL=components-helpCentre-HelpCentreTopic-stories.cb407bd2.iframe.bundle.js.map
