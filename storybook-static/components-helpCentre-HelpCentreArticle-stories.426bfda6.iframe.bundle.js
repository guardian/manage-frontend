'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[3892],
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
		'./node_modules/@guardian/source/dist/react-components/button/Button.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, { z: () => Button });
				var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
						__webpack_require__(
							'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
						),
					_shared_js__WEBPACK_IMPORTED_MODULE_2__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/react-components/button/shared.js',
						),
					_styles_js__WEBPACK_IMPORTED_MODULE_1__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/react-components/button/styles.js',
						);
				const Button = ({
					priority,
					size,
					icon: iconSvg,
					iconSide,
					hideLabel,
					nudgeIcon,
					type = 'button',
					isLoading = !1,
					loadingAnnouncement = 'Loading',
					cssOverrides,
					children,
					theme,
					...props
				}) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
						'button',
						{
							css: (0, _styles_js__WEBPACK_IMPORTED_MODULE_1__.$)(
								{
									size,
									priority,
									icon: iconSvg,
									hideLabel,
									iconSide,
									nudgeIcon,
									cssOverrides,
									isLoading,
									theme,
								},
							),
							type,
							'aria-live': 'polite',
							'aria-label': isLoading
								? loadingAnnouncement
								: void 0,
							...props,
							children: (0,
							_shared_js__WEBPACK_IMPORTED_MODULE_2__._)({
								hideLabel,
								iconSvg,
								isLoading,
								children,
							}),
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
		'./client/components/helpCentre/HelpCentreArticle.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					Default: () => Default,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => HelpCentreArticle_stories,
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
				emotion_react_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
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
				mq = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
				),
				Button = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/button/Button.js',
				),
				esm = __webpack_require__(
					'./node_modules/@sentry/minimal/esm/index.js',
				),
				react = __webpack_require__('./node_modules/react/index.js'),
				react_router = __webpack_require__(
					'./node_modules/react-router/index.js',
				),
				analytics = __webpack_require__(
					'./client/utilities/analytics.ts',
				),
				addStructuredData = (article) => {
					var data = {
							'@context': 'https://schema.org/',
							'@type': 'Article',
							headline: article.title,
						},
						scriptElt = document.createElement('script');
					(scriptElt.id = 'seodata'),
						(scriptElt.type = 'application/ld+json'),
						(scriptElt.innerHTML = JSON.stringify(data)),
						document.head.appendChild(scriptElt);
				},
				colour_palette = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__deprecated__/colour/palette.js',
				),
				emotion_react_jsx_runtime_browser_esm = __webpack_require__(
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
			var ThumbsUpIcon = (props) =>
				(0, emotion_react_jsx_runtime_browser_esm.tZ)('svg', {
					width: '20',
					height: '24',
					viewBox: '0 0 20 24',
					fill: 'none',
					children: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						'g',
						_objectSpread(
							_objectSpread(
								{},
								props.invertIcon && {
									transform: 'rotate(175 10 12)',
								},
							),
							{},
							{
								children: (0,
								emotion_react_jsx_runtime_browser_esm.tZ)(
									'path',
									{
										d: 'M19.2261 13.3474L16.3955 22.7067L15.3096 23.4317L0 21.1823V8.70523L5.22193 7.68963L12.9156 0H14.0028L15.959 1.95889L12.9142 7.76327H12.9859L20 8.64029',
										fill:
											props.overrideFillColor ||
											colour_palette.n$[100],
									},
								),
							},
						),
					),
				});
			try {
				(ThumbsUpIcon.displayName = 'ThumbsUpIcon'),
					(ThumbsUpIcon.__docgenInfo = {
						description: '',
						displayName: 'ThumbsUpIcon',
						props: {
							overrideFillColor: {
								defaultValue: null,
								description: '',
								name: 'overrideFillColor',
								required: !1,
								type: { name: 'string' },
							},
							invertIcon: {
								defaultValue: null,
								description: '',
								name: 'invertIcon',
								required: !1,
								type: { name: 'boolean' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/assets/ThumbsUpIcon.tsx#ThumbsUpIcon'
						] = {
							docgenInfo: ThumbsUpIcon.__docgenInfo,
							name: 'ThumbsUpIcon',
							path: 'client/components/mma/shared/assets/ThumbsUpIcon.tsx#ThumbsUpIcon',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var CallCenterEmailAndNumbers = __webpack_require__(
					'./client/components/shared/CallCenterEmailAndNumbers.tsx',
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
				HelpCentreContactOptions = __webpack_require__(
					'./client/components/helpCentre/HelpCentreContactOptions.tsx',
				),
				HelpCentreStyles = __webpack_require__(
					'./client/components/helpCentre/HelpCentreStyles.tsx',
				),
				liveChatFeatureSwitch = __webpack_require__(
					'./client/components/helpCentre/liveChat/liveChatFeatureSwitch.ts',
				);
			var HelpCentreArticle = () => {
					var [article, setArticle] = (0, react.useState)(void 0),
						{ articleCode } = (0, react_router.UO)(),
						navigate = (0, react_router.s0)();
					(0, react.useEffect)(() => {
						setArticle(void 0),
							fetch(
								'/api/help-centre/article/'.concat(articleCode),
							)
								.then((response) => {
									if (response.ok) return response.json();
									(0, esm.uT)(
										'Fetching article '
											.concat(articleCode, ' returned ')
											.concat(response.status, '.'),
									),
										navigate('/help-centre');
								})
								.then((articleData) => setArticle(articleData))
								.catch((error) =>
									(0, esm.Tb)(
										'Failed to fetch article '
											.concat(articleCode, '. Error: ')
											.concat(error),
									),
								);
					}, [articleCode, navigate]);
					var setSelectedTopicId = react.useContext(SectionContent.q);
					(0, react.useEffect)(() => {
						setSelectedTopicId(
							null == article ? void 0 : article.topics[0].path,
						);
					}, [article, setSelectedTopicId]);
					var articleContainerCss = (0, emotion_react_browser_esm.iv)(
						'max-width:620px;color:',
						palette.palette.neutral[7],
						';',
						'',
					);
					return (
						(function () {
							var suffix =
								arguments.length > 0 && void 0 !== arguments[0]
									? arguments[0]
									: '';
							document.title =
								'Help Centre | The Guardian' +
								(suffix ? ' | ' + suffix : '');
						})(null == article ? void 0 : article.title),
						((article) => {
							var location = (0, react_router.TH)();
							(0, react.useEffect)(() => {
								if (document) {
									var scriptElt =
										document.getElementById('seodata');
									scriptElt && scriptElt.remove(),
										article && addStructuredData(article);
								}
							}, [location, article]);
						})(article),
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							emotion_react_jsx_runtime_browser_esm.HY,
							{
								children: (0,
								emotion_react_jsx_runtime_browser_esm.BX)(
									'div',
									{
										css: articleContainerCss,
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'h2',
												{
													css: HelpCentreStyles._h,
													children:
														null == article
															? void 0
															: article.title,
												},
											),
											article
												? (0,
												  emotion_react_jsx_runtime_browser_esm.BX)(
														emotion_react_jsx_runtime_browser_esm.HY,
														{
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	ArticleBody,
																	{
																		article,
																		articleCode:
																			null !=
																			articleCode
																				? articleCode
																				: '',
																	},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	ArticleFeedbackWidget,
																	{
																		articleCode:
																			null !=
																			articleCode
																				? articleCode
																				: '',
																	},
																),
																(0,
																liveChatFeatureSwitch.O)()
																	? (0,
																	  emotion_react_jsx_runtime_browser_esm.tZ)(
																			HelpCentreContactOptions.y,
																			{
																				compactLayout:
																					!0,
																				hideContactOptions:
																					!0,
																			},
																	  )
																	: (0,
																	  emotion_react_jsx_runtime_browser_esm.BX)(
																			emotion_react_jsx_runtime_browser_esm.HY,
																			{
																				children:
																					[
																						(0,
																						emotion_react_jsx_runtime_browser_esm.tZ)(
																							'h2',
																							{
																								css: HelpCentreStyles._h,
																								children:
																									'Still can’t find what you’re looking for?',
																							},
																						),
																						(0,
																						emotion_react_jsx_runtime_browser_esm.tZ)(
																							CallCenterEmailAndNumbers.K,
																							{},
																						),
																						(0,
																						emotion_react_jsx_runtime_browser_esm.tZ)(
																							'p',
																							{
																								children:
																									'Or use our contact form to get in touch and we’ll get back to you as soon as possible.',
																							},
																						),
																						(0,
																						emotion_react_jsx_runtime_browser_esm.tZ)(
																							Button.z,
																							{
																								priority:
																									'secondary',
																								onClick:
																									() => {
																										navigate(
																											'/help-centre/contact-us',
																										);
																									},
																								children:
																									'Contact us',
																							},
																						),
																					],
																			},
																	  ),
															],
														},
												  )
												: (0,
												  emotion_react_jsx_runtime_browser_esm.tZ)(
														Loading,
														{},
												  ),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												BackToHelpCentreLink.z,
												{},
											),
										],
									},
								),
							},
						)
					);
				},
				Loading = () =>
					(0, emotion_react_jsx_runtime_browser_esm.tZ)(
						WithStandardTopMargin.z,
						{
							children: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								Spinner.$,
								{ loadingMessage: 'Fetching article...' },
							),
						},
					),
				_ref3 = { name: '1408f10', styles: 'padding-left:0' },
				ArticleBody = (props) => {
					var aCss = (0, emotion_react_browser_esm.iv)(
							'color:',
							palette.palette.brand[500],
							';text-decoration:underline;',
							'',
						),
						ulCss = _ref3,
						liCss = (0, emotion_react_browser_esm.iv)(
							'list-style:none;padding-left:',
							space.D[3] + space.D[2],
							"px;position:relative;:before{content:'';position:absolute;top:8px;left:0;width:12px;height:12px;border-radius:50%;background-color:#c4c4c4;}",
							'',
						),
						articleBodyH2Css = (0, emotion_react_browser_esm.iv)(
							typography.fy7,
							';margin:',
							space.D[6],
							'px 0 ',
							space.D[2],
							'px;b{font-weight:700;}',
							'',
						),
						articleBodyPCss = (0, emotion_react_browser_esm.iv)(
							'margin:0 0 ',
							space.D[4],
							'px;font-size:17px;',
							'',
						),
						keyCounter = 0,
						parseBody = (body) => {
							if (Array.isArray(body)) return body.map(parseBody);
							var key = ''
								.concat(props.articleCode)
								.concat(keyCounter++);
							switch (body.element) {
								case 'text':
									return body.content;
								case 'h2':
									return (0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'h2',
										{
											css: articleBodyH2Css,
											children: parseBody(body.content),
										},
										key,
									);
								case 'p':
									return (0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'p',
										{
											css: articleBodyPCss,
											children: parseBody(body.content),
										},
										key,
									);
								case 'ol':
									return (0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'ol',
										{ children: parseBody(body.content) },
										key,
									);
								case 'ul':
									return (0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'ul',
										{
											css: ulCss,
											children: parseBody(body.content),
										},
										key,
									);
								case 'li':
									return (0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'li',
										{
											css: liCss,
											children: parseBody(body.content),
										},
										key,
									);
								case 'b':
									return (0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'b',
										{ children: parseBody(body.content) },
										key,
									);
								case 'i':
									return (0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'i',
										{ children: parseBody(body.content) },
										key,
									);
								case 'a':
									var node = body;
									return (0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'a',
										{
											href: node.href,
											css: aCss,
											children: parseBody(node.content),
										},
										key,
									);
								default:
									return (
										(0, esm.uT)(
											'Found unexpected element ('.concat(
												body.element,
												').',
											),
										),
										null
									);
							}
						};
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						'div',
						{ children: parseBody(props.article.body) },
					);
				},
				articleFeedbackWidgetCss = (0, emotion_react_browser_esm.iv)(
					'display:flex;flex-direction:column;border:1px solid ',
					palette.palette.neutral[86],
					';padding:',
					space.D[4],
					'px ',
					space.D[3],
					'px;margin:36px 0 48px;',
					mq.Dp.desktop,
					'{margin:54px 0 66px;}',
					mq.Dp.mobileLandscape,
					'{flex-direction:row;align-items:center;justify-content:space-between;}& p{margin:0;',
					typography.Rcn,
					';}& .buttonDiv{min-height:36px;display:flex;align-items:center;margin-top:',
					space.D[4],
					'px;',
					mq.Dp.mobileLandscape,
					'{margin-top:0;}&>*{margin-right:',
					space.D[2],
					'px;',
					mq.Dp.mobileLandscape,
					'{margin-right:',
					space.D[3],
					'px;}}& p{',
					typography.VZD,
					';}}',
					'',
				),
				_ref = { name: '7iica4', styles: 'svg{width:initial;}' },
				_ref2 = { name: '7iica4', styles: 'svg{width:initial;}' },
				ArticleFeedbackWidget = (props) => {
					var [feedBackButtonClicked, setFeedBackButtonClicked] = (0,
					react.useState)(!1);
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						'div',
						{
							css: articleFeedbackWidgetCss,
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'p',
									{
										children:
											'Did you find the information you need?',
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'div',
									{
										className: 'buttonDiv',
										children: feedBackButtonClicked
											? (0,
											  emotion_react_jsx_runtime_browser_esm.tZ)(
													'p',
													{ children: 'Thank you!' },
											  )
											: (0,
											  emotion_react_jsx_runtime_browser_esm.BX)(
													emotion_react_jsx_runtime_browser_esm.HY,
													{
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																Button.z,
																{
																	icon: (0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		ThumbsUpIcon,
																		{},
																	),
																	hideLabel:
																		!0,
																	size: 'small',
																	cssOverrides:
																		_ref2,
																	onClick:
																		() => {
																			setFeedBackButtonClicked(
																				!0,
																			),
																				(0,
																				analytics.L9)(
																					{
																						eventCategory:
																							'help-centre',
																						eventAction:
																							'article-feedback',
																						eventLabel:
																							props.articleCode,
																						eventValue: 1,
																					},
																				);
																		},
																	children:
																		'Yes',
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																Button.z,
																{
																	icon: (0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		ThumbsUpIcon,
																		{
																			invertIcon:
																				!0,
																		},
																	),
																	hideLabel:
																		!0,
																	size: 'small',
																	cssOverrides:
																		_ref,
																	onClick:
																		() => {
																			setFeedBackButtonClicked(
																				!0,
																			),
																				(0,
																				analytics.L9)(
																					{
																						eventCategory:
																							'help-centre',
																						eventAction:
																							'article-feedback',
																						eventLabel:
																							props.articleCode,
																						eventValue: 0,
																					},
																				);
																		},
																	children:
																		'No',
																},
															),
														],
													},
											  ),
									},
								),
							],
						},
					);
				};
			try {
				(ArticleFeedbackWidget.displayName = 'ArticleFeedbackWidget'),
					(ArticleFeedbackWidget.__docgenInfo = {
						description: '',
						displayName: 'ArticleFeedbackWidget',
						props: {
							articleCode: {
								defaultValue: null,
								description: '',
								name: 'articleCode',
								required: !0,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/helpCentre/HelpCentreArticle.tsx#ArticleFeedbackWidget'
						] = {
							docgenInfo: ArticleFeedbackWidget.__docgenInfo,
							name: 'ArticleFeedbackWidget',
							path: 'client/components/helpCentre/HelpCentreArticle.tsx#ArticleFeedbackWidget',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			const HelpCentreArticle_stories = {
				title: 'Pages/HelpCentreArticle',
				component: HelpCentreArticle,
				decorators: [ReactRouterDecorator.R],
				parameters: {
					layout: 'fullscreen',
					chromatic: { viewports: [320, 1300] },
				},
			};
			var articleContent = {
					title: 'I need to pause my delivery',
					body: [
						{
							element: 'p',
							content: [
								{
									element: 'text',
									content:
										'All our print subscribers can apply a holiday suspension to their subscription and get credited the cost for the suspended issues on their next bill date.',
								},
							],
						},
					],
					path: 'i-need-to-pause-my-delivery',
					topics: [{ path: 'delivery', title: 'Delivery' }],
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
												HelpCentreArticle,
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
							http.d.get(
								'/api/help-centre/article/i-need-to-pause-my-delivery',
								() => HttpResponse.Z.json(articleContent),
							),
						],
						reactRouter: {
							location: '/article/i-need-to-pause-my-delivery',
							path: '/article/:articleCode',
						},
					},
				};
			Default.parameters = {
				...Default.parameters,
				docs: {
					...Default.parameters?.docs,
					source: {
						originalSource:
							"{\n  render: () => {\n    return <>\n                <SectionHeader title=\"How can we help you?\" pageHasNav={true} />\n                <SectionContent hasNav={true}>\n                    <HelpCentreArticle />\n                </SectionContent>\n            </>;\n  },\n  parameters: {\n    msw: [http.get('/api/known-issues/', () => {\n      return HttpResponse.json([]);\n    }), http.get('/api/help-centre/article/i-need-to-pause-my-delivery', () => {\n      return HttpResponse.json(articleContent);\n    })],\n    reactRouter: {\n      location: '/article/i-need-to-pause-my-delivery',\n      path: '/article/:articleCode'\n    }\n  }\n}",
						...Default.parameters?.docs?.source,
					},
				},
			};
			const __namedExportsOrder = ['Default'];
		},
	},
]);
//# sourceMappingURL=components-helpCentre-HelpCentreArticle-stories.426bfda6.iframe.bundle.js.map
