'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[8042],
	{
		'./client/components/helpCentre/HelpCentre.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					Default: () => Default,
					WithKnownIssue: () => WithKnownIssue,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => HelpCentre_stories,
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
				react_router = __webpack_require__(
					'./node_modules/react-router/index.js',
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
				emotion_react_jsx_runtime_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				),
				pathsWithNav = ['/help-centre/topic/', '/help-centre/article/'],
				HelpCenterContentWrapper = (props) => {
					var location = (0, react_router.TH)(),
						headerTitle = location.pathname.startsWith(
							'/help-centre/contact-us',
						)
							? 'Need to contact us?'
							: 'How can we help you?';
					return pathsWithNav.some((path) =>
						location.pathname.startsWith(path),
					)
						? (0, emotion_react_jsx_runtime_browser_esm.BX)(
								emotion_react_jsx_runtime_browser_esm.HY,
								{
									children: [
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											SectionHeader.M,
											{
												title: headerTitle,
												pageHasNav: !0,
											},
										),
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											SectionContent.Z,
											{
												hasNav: !0,
												children: props.children,
											},
										),
									],
								},
						  )
						: (0, emotion_react_jsx_runtime_browser_esm.BX)(
								emotion_react_jsx_runtime_browser_esm.HY,
								{
									children: [
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											SectionHeader.M,
											{ title: headerTitle },
										),
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											KnownIssues.B,
											{ issues: props.knownIssues },
										),
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											SectionContent.Z,
											{ children: props.children },
										),
									],
								},
						  );
				};
			try {
				(HelpCenterContentWrapper.displayName =
					'HelpCenterContentWrapper'),
					(HelpCenterContentWrapper.__docgenInfo = {
						description: '',
						displayName: 'HelpCenterContentWrapper',
						props: {
							knownIssues: {
								defaultValue: null,
								description: '',
								name: 'knownIssues',
								required: !0,
								type: { name: 'KnownIssueObj[]' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/helpCentre/HelpCenterContentWrapper.tsx#HelpCenterContentWrapper'
						] = {
							docgenInfo: HelpCenterContentWrapper.__docgenInfo,
							name: 'HelpCenterContentWrapper',
							path: 'client/components/helpCentre/HelpCenterContentWrapper.tsx#HelpCenterContentWrapper',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var emotion_react_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
				),
				space = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
				),
				typography = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
				),
				palette = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__deprecated__/colour/palette.js',
				),
				mq = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
				),
				HelpCentreConfig = __webpack_require__(
					'./client/components/helpCentre/HelpCentreConfig.ts',
				),
				HelpCentreContactOptions = __webpack_require__(
					'./client/components/helpCentre/HelpCentreContactOptions.tsx',
				),
				_generated_palette = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
				),
				react = __webpack_require__('./node_modules/react/index.js'),
				react_router_dom = __webpack_require__(
					'./node_modules/react-router-dom/index.js',
				),
				analytics = __webpack_require__(
					'./client/utilities/analytics.ts',
				),
				HelpCentreStyles = __webpack_require__(
					'./client/components/helpCentre/HelpCentreStyles.tsx',
				);
			var moreTopicsStyles = {
					name: '1jf6r7p',
					styles: 'margin-bottom:10px;display:flex;flex-wrap:wrap;text-align:left;font-weight:normal',
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
				HelpCentreLandingMoreTopics = () => {
					var [indexOfOpenSection, setIndexOfOpenSection] = (0,
					react.useState)();
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						'div',
						{
							css: moreTopicsStyles,
							children: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)('div', {
								css: HelpCentreStyles.Fg,
								children: HelpCentreConfig.pE.map(
									(topic, topicIndex) => {
										var sectionNum,
											isOpen =
												topicIndex ===
												indexOfOpenSection,
											isNotFirstOption = topicIndex > 0,
											titleCss = (0,
											emotion_react_browser_esm.iv)(
												(0, HelpCentreStyles.MF)(
													isOpen,
													isNotFirstOption,
												),
												';',
												mq.C4.desktop,
												'{padding-right:31px;:after{right:17px;}}',
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
															css: titleCss,
															onClick:
																((sectionNum =
																	topicIndex),
																() => {
																	setIndexOfOpenSection(
																		indexOfOpenSection ===
																			sectionNum
																			? -1
																			: sectionNum,
																	);
																}),
															children: [
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
																topic.links.map(
																	(
																		question,
																		questionIndex,
																	) => {
																		return (0,
																		emotion_react_jsx_runtime_browser_esm.BX)(
																			'li',
																			{
																				css:
																					((index =
																						questionIndex),
																					(length =
																						topic
																							.links
																							.length),
																					(0,
																					emotion_react_browser_esm.iv)(
																						HelpCentreStyles.P3,
																						';',
																						index <
																							length -
																								1 &&
																							'border-bottom: 1px solid '.concat(
																								_generated_palette
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
																								to: question.link,
																								css: HelpCentreStyles.BR,
																								onClick:
																									() => {
																										(0,
																										analytics.L9)(
																											{
																												eventCategory:
																													'help-centre',
																												eventAction:
																													'more-topics-q-click',
																												eventLabel:
																													''
																														.concat(
																															topic.id,
																															'-',
																														)
																														.concat(
																															question.id,
																														),
																											},
																										);
																									},
																								children:
																									question.title,
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
																					topic.id,
																					'Question-',
																				)
																				.concat(
																					questionIndex,
																				),
																		);
																		var index,
																			length;
																	},
																),
														},
													),
												],
											},
											topic.id,
										);
									},
								),
							}),
						},
					);
				},
				Button = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/button/Button.js',
				),
				HelpSectionIcons = __webpack_require__(
					'./client/components/mma/shared/assets/HelpSectionIcons.tsx',
				);
			var boxHolderStyle = (0, emotion_react_browser_esm.iv)(
					'border:1px solid ',
					_generated_palette.palette.neutral[86],
					';flex-basis:100%;display:flex;flex-direction:column;margin-bottom:',
					space.D[5],
					'px;',
					mq.Dp.tablet,
					'{flex-basis:48%;flex-basis:calc(50% - (',
					space.D[5],
					'px * 0.5));}',
					mq.Dp.desktop,
					'{flex-basis:30%;flex-basis:calc(33.3% - (',
					space.D[5],
					'px * 0.666));}',
					'',
				),
				boxTitleStyle = (0, emotion_react_browser_esm.iv)(
					typography.Rcn,
					';color:#333333;position:relative;margin:0;padding:18px 0 18px 60px;border-bottom:1px solid ',
					_generated_palette.palette.neutral[86],
					';width:100%;',
					'',
				),
				iconStyle = {
					name: 'rz9mdz',
					styles: 'position:absolute;top:11px;left:11px',
				},
				linksLisWithMargintStyle = (0, emotion_react_browser_esm.iv)(
					HelpCentreStyles.gx,
					';padding:0 ',
					space.D[3],
					'px;',
					'',
				),
				_ref = { name: 'syqvhr', styles: 'margin:auto 11px 20px 11px' },
				HelpTopicBox = (props) => {
					var navigate = (0, react_router.s0)();
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						'div',
						{
							css: boxHolderStyle,
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'h2',
									{
										css: boxTitleStyle,
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'i',
												{
													css: iconStyle,
													children: (0,
													HelpSectionIcons.W)(
														props.topic.id,
													),
												},
											),
											props.topic.title,
										],
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'ul',
									{
										css: linksLisWithMargintStyle,
										children: props.topic.links.map(
											(question, questionIndex) =>
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'li',
													{
														css: HelpCentreStyles.Q,
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																react_router_dom.rU,
																{
																	to: question.link,
																	css: HelpCentreStyles.BR,
																	onClick:
																		() => {
																			(0,
																			analytics.L9)(
																				{
																					eventCategory:
																						'help-centre',
																					eventAction:
																						'popular-topic-q-click',
																					eventLabel:
																						''
																							.concat(
																								props
																									.topic
																									.id,
																								'-',
																							)
																							.concat(
																								question.id,
																							),
																				},
																			);
																		},
																	children:
																		question.title,
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
															props.topic.id,
															'Question-',
														)
														.concat(questionIndex),
												),
										),
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'div',
									{
										css: _ref,
										children: (0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											Button.z,
											{
												priority: 'secondary',
												onClick: () => {
													(0, analytics.L9)({
														eventCategory:
															'help-centre',
														eventAction:
															'popular-topic-see-all-click',
														eventLabel:
															props.topic.id,
													}),
														navigate(
															props.topic
																.seeAllLink,
														);
												},
												children: 'See all',
											},
										),
									},
								),
							],
						},
					);
				};
			try {
				(HelpTopicBox.displayName = 'HelpTopicBox'),
					(HelpTopicBox.__docgenInfo = {
						description: '',
						displayName: 'HelpTopicBox',
						props: {
							topic: {
								defaultValue: null,
								description: '',
								name: 'topic',
								required: !0,
								type: { name: 'HelpCentreTopic' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/helpCentre/HelpTopicBox.tsx#HelpTopicBox'
						] = {
							docgenInfo: HelpTopicBox.__docgenInfo,
							name: 'HelpTopicBox',
							path: 'client/components/helpCentre/HelpTopicBox.tsx#HelpTopicBox',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var subtitleStyles = (0, emotion_react_browser_esm.iv)(
					'margin-top:30px;margin-bottom:',
					space.D[6],
					'px;',
					typography.Hu7,
					';border-top:1px solid ',
					palette.n$[86],
					';',
					mq.Dp.tablet,
					'{margin-bottom:',
					space.D[6],
					'px;margin-top:40px;}',
					'',
				),
				HelpCentre_ref = {
					name: '37i6da',
					styles: 'display:flex;flex-wrap:wrap;align-items:stretch;justify-content:space-between',
				},
				HelpCentre = () =>
					(0, emotion_react_jsx_runtime_browser_esm.tZ)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: (0,
							emotion_react_jsx_runtime_browser_esm.BX)('div', {
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'h2',
										{
											css: subtitleStyles,
											children: 'Most popular topics',
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'div',
										{
											css: HelpCentre_ref,
											children: HelpCentreConfig.Se.map(
												(topic) =>
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														HelpTopicBox,
														{ topic },
														topic.id,
													),
											),
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'h2',
										{
											css: subtitleStyles,
											children: 'More Topics',
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										HelpCentreLandingMoreTopics,
										{},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										HelpCentreContactOptions.y,
										{},
									),
								],
							}),
						},
					);
			const HelpCentre_stories = {
				title: 'Pages/HelpCentre',
				component: HelpCentre,
				decorators: [ReactRouterDecorator.R],
				parameters: { layout: 'fullscreen' },
			};
			var Default = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							HelpCenterContentWrapper,
							{
								knownIssues: [],
								children: (0,
								emotion_react_jsx_runtime_browser_esm.tZ)(
									HelpCentre,
									{},
								),
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
				WithKnownIssue = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							HelpCenterContentWrapper,
							{
								knownIssues: [
									{
										date: '20 Jan 2022 12:00',
										message:
											'Live Chat is currently unavailable.',
									},
								],
								children: (0,
								emotion_react_jsx_runtime_browser_esm.tZ)(
									HelpCentre,
									{},
								),
							},
						),
					parameters: { chromatic: { viewports: [320, 1300] } },
				};
			(Default.parameters = {
				...Default.parameters,
				docs: {
					...Default.parameters?.docs,
					source: {
						originalSource:
							"{\n  render: () => {\n    return <HelpCenterContentWrapper knownIssues={[]}>\n                <HelpCentre />\n            </HelpCenterContentWrapper>;\n  },\n  parameters: {\n    msw: [http.get('/api/known-issues/', () => {\n      return HttpResponse.json([]);\n    })]\n  }\n}",
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
								"{\n  render: () => {\n    const knownIssue = [{\n      date: '20 Jan 2022 12:00',\n      message: 'Live Chat is currently unavailable.'\n    }];\n    return <HelpCenterContentWrapper knownIssues={knownIssue}>\n                <HelpCentre />\n            </HelpCenterContentWrapper>;\n  },\n  parameters: {\n    chromatic: {\n      viewports: [320, 1300]\n    }\n  }\n}",
							...WithKnownIssue.parameters?.docs?.source,
						},
					},
				});
			const __namedExportsOrder = ['Default', 'WithKnownIssue'];
		},
	},
]);
