'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[6052],
	{
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
		'./client/components/mma/switch/SwitchContainer.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				w: () => SwitchContext,
				x: () => SwitchContainer,
			});
			var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./node_modules/react/index.js',
				),
				react_router__WEBPACK_IMPORTED_MODULE_10__ =
					__webpack_require__('./node_modules/react-router/index.js'),
				_shared_productResponse__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__('./shared/productResponse.ts'),
				_shared_productTypes__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__('./shared/productTypes.ts'),
				_utilities_hooks_useAsyncLoader__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./client/utilities/hooks/useAsyncLoader.ts',
					),
				_utilities_pricingConfig_supporterPlusPricing__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./client/utilities/pricingConfig/supporterPlusPricing.ts',
					),
				_utilities_productUtils__WEBPACK_IMPORTED_MODULE_5__ =
					__webpack_require__('./client/utilities/productUtils.ts'),
				_shared_GenericErrorScreen__WEBPACK_IMPORTED_MODULE_6__ =
					__webpack_require__(
						'./client/components/shared/GenericErrorScreen.tsx',
					),
				_shared_nav_NavConfig__WEBPACK_IMPORTED_MODULE_7__ =
					__webpack_require__(
						'./client/components/shared/nav/NavConfig.tsx',
					),
				_Page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
					'./client/components/mma/Page.tsx',
				),
				_shared_asyncComponents_DefaultApiResponseHandler__WEBPACK_IMPORTED_MODULE_12__ =
					__webpack_require__(
						'./client/components/mma/shared/asyncComponents/DefaultApiResponseHandler.tsx',
					),
				_shared_asyncComponents_DefaultLoadingView__WEBPACK_IMPORTED_MODULE_9__ =
					__webpack_require__(
						'./client/components/mma/shared/asyncComponents/DefaultLoadingView.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				SwitchContext = (0,
				react__WEBPACK_IMPORTED_MODULE_0__.createContext)({}),
				SwitchContainer = (props) => {
					var routerState = (0,
						react_router__WEBPACK_IMPORTED_MODULE_10__.TH)().state,
						contributionToSwitch =
							null == routerState
								? void 0
								: routerState.productDetail,
						user = null == routerState ? void 0 : routerState.user,
						[switchHasCompleted, setSwitchHasCompleted] = (0,
						react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1);
					return (
						!switchHasCompleted &&
							null != routerState &&
							routerState.switchHasCompleted &&
							setSwitchHasCompleted(!0),
						userIsNavigatingBackFromCompletePage(switchHasCompleted)
							? (0,
							  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.tZ)(
									react_router__WEBPACK_IMPORTED_MODULE_10__.Fg,
									{ to: '/' },
							  )
							: contributionToSwitch
							? (0,
							  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.tZ)(
									RenderedPage,
									{
										contributionToSwitch,
										user,
										isFromApp: props.isFromApp,
									},
							  )
							: (0,
							  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.tZ)(
									AsyncLoadedSwitchContainer,
									{ isFromApp: props.isFromApp },
							  )
					);
				},
				SwitchPageContainer = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.tZ)(
						_Page__WEBPACK_IMPORTED_MODULE_8__._,
						{
							selectedNavItem:
								_shared_nav_NavConfig__WEBPACK_IMPORTED_MODULE_7__
									.qy.accountOverview,
							pageTitle: 'Change your support',
							compactTitle: !0,
							minimalFooter: !0,
							children: props.children,
						},
					),
				AsyncLoadedSwitchContainer = (props) => {
					var request = (0,
						_utilities_productUtils__WEBPACK_IMPORTED_MODULE_5__.w)(
							_shared_productTypes__WEBPACK_IMPORTED_MODULE_2__.Pm
								.contributions
								.allProductsProductTypeFilterString,
						),
						{ data, loadingState } = (0,
						_utilities_hooks_useAsyncLoader__WEBPACK_IMPORTED_MODULE_3__.c)(
							request,
							_shared_asyncComponents_DefaultApiResponseHandler__WEBPACK_IMPORTED_MODULE_12__.xJ,
						);
					if (
						loadingState ==
						_utilities_hooks_useAsyncLoader__WEBPACK_IMPORTED_MODULE_3__
							.G.HasError
					)
						return (0,
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.tZ)(
							SwitchPageContainer,
							{
								children: (0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.tZ)(
									_shared_GenericErrorScreen__WEBPACK_IMPORTED_MODULE_6__.c,
									{},
								),
							},
						);
					if (
						loadingState ==
						_utilities_hooks_useAsyncLoader__WEBPACK_IMPORTED_MODULE_3__
							.G.IsLoading
					)
						return (0,
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.tZ)(
							SwitchPageContainer,
							{
								children: (0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.tZ)(
									_shared_asyncComponents_DefaultLoadingView__WEBPACK_IMPORTED_MODULE_9__.I,
									{},
								),
							},
						);
					if (null == data || 0 == data.products.length)
						return (0,
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.tZ)(
							react_router__WEBPACK_IMPORTED_MODULE_10__.Fg,
							{ to: '/' },
						);
					var contributionToSwitch = data.products.filter(
						_shared_productResponse__WEBPACK_IMPORTED_MODULE_1__.v_,
					)[0];
					return (0,
					_utilities_productUtils__WEBPACK_IMPORTED_MODULE_5__.IV)(
						contributionToSwitch,
					)
						? (0,
						  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.tZ)(
								react_router__WEBPACK_IMPORTED_MODULE_10__.Fg,
								{ to: '/' },
						  )
						: (0,
						  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.tZ)(
								RenderedPage,
								{
									contributionToSwitch,
									user: data.user,
									isFromApp: props.isFromApp,
								},
						  );
				},
				RenderedPage = (props) => {
					var mainPlan = (0,
						_shared_productResponse__WEBPACK_IMPORTED_MODULE_1__.fr)(
							props.contributionToSwitch.subscription,
						),
						monthlyOrAnnual = (0,
						_shared_productTypes__WEBPACK_IMPORTED_MODULE_2__.xm)(
							mainPlan.billingPeriod,
						);
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.tZ)(
						SwitchPageContainer,
						{
							children: (0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.tZ)(
								SwitchContext.Provider,
								{
									value: {
										contributionToSwitch:
											props.contributionToSwitch,
										isFromApp: props.isFromApp,
										user: props.user,
										mainPlan,
										monthlyOrAnnual,
										supporterPlusTitle:
											_shared_productTypes__WEBPACK_IMPORTED_MODULE_2__.Pm.supporterplus.productTitle(),
										thresholds: getThresholds(
											mainPlan,
											'Monthly' == monthlyOrAnnual,
										),
									},
									children: (0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.tZ)(
										react_router__WEBPACK_IMPORTED_MODULE_10__.j3,
										{},
									),
								},
							),
						},
					);
				};
			function userIsNavigatingBackFromCompletePage(hasCompleted) {
				return hasCompleted && !location.pathname.includes('complete');
			}
			function getThresholds(mainPlan, monthly) {
				var monthlyThreshold = (0,
					_utilities_pricingConfig_supporterPlusPricing__WEBPACK_IMPORTED_MODULE_4__.s)(
						mainPlan.currencyISO,
						'month',
					),
					annualThreshold = (0,
					_utilities_pricingConfig_supporterPlusPricing__WEBPACK_IMPORTED_MODULE_4__.s)(
						mainPlan.currencyISO,
						'year',
					),
					thresholdForBillingPeriod = monthly
						? monthlyThreshold
						: annualThreshold;
				return {
					monthlyThreshold,
					annualThreshold,
					thresholdForBillingPeriod,
					isAboveThreshold:
						mainPlan.price >= 100 * thresholdForBillingPeriod,
				};
			}
			try {
				(SwitchContainer.displayName = 'SwitchContainer'),
					(SwitchContainer.__docgenInfo = {
						description: '',
						displayName: 'SwitchContainer',
						props: {
							isFromApp: {
								defaultValue: null,
								description: '',
								name: 'isFromApp',
								required: !1,
								type: { name: 'boolean' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/switch/SwitchContainer.tsx#SwitchContainer'
						] = {
							docgenInfo: SwitchContainer.__docgenInfo,
							name: 'SwitchContainer',
							path: 'client/components/mma/switch/SwitchContainer.tsx#SwitchContainer',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/switch/complete/SwitchComplete.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					Default: () => Default,
					FromApp: () => FromApp,
					YearlyOtherCurrency: () => YearlyOtherCurrency,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => SwitchComplete_stories,
				});
			var ReactRouterDecorator = __webpack_require__(
					'./.storybook/ReactRouterDecorator.tsx',
				),
				testProducts = __webpack_require__(
					'./client/fixtures/productBuilder/testProducts.ts',
				),
				SwitchContainer = __webpack_require__(
					'./client/components/mma/switch/SwitchContainer.tsx',
				),
				emotion_react_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
				),
				space = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
				),
				palette = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
				),
				mq = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
				),
				typography = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
				),
				Stack = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/stack/Stack.js',
				),
				LinkButton = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/button/LinkButton.js',
				),
				theme_reader_revenue = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/button/theme-reader-revenue.js',
				),
				SvgEnvelope = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgEnvelope.js',
				),
				SvgCalendar = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgCalendar.js',
				),
				SvgClock = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgClock.js',
				),
				react = __webpack_require__('./node_modules/react/index.js'),
				react_router = __webpack_require__(
					'./node_modules/react-router/index.js',
				),
				ButtonStyles = __webpack_require__(
					'./client/styles/ButtonStyles.ts',
				),
				GenericStyles = __webpack_require__(
					'./client/styles/GenericStyles.ts',
				),
				utils = __webpack_require__('./client/utilities/utils.ts'),
				Heading = __webpack_require__(
					'./client/components/mma/shared/Heading.tsx',
				),
				SwitchSignInImage = __webpack_require__(
					'./client/components/mma/switch/complete/SwitchSignInImage.tsx',
				),
				emotion_react_jsx_runtime_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				),
				SwitchComplete = () => {
					var _switchContext$user$e,
						_switchContext$user,
						switchContext = (0, react.useContext)(
							SwitchContainer.w,
						),
						{
							mainPlan,
							monthlyOrAnnual,
							supporterPlusTitle,
							thresholds,
						} = switchContext,
						{
							thresholdForBillingPeriod: threshold,
							isAboveThreshold,
						} = thresholds,
						newAmount = Math.max(threshold, mainPlan.price / 100),
						newAmountAndCurrency = ''
							.concat(mainPlan.currency)
							.concat((0, utils.dN)(newAmount)),
						routerState = (0, react_router.TH)().state,
						amountPayableToday =
							null == routerState
								? void 0
								: routerState.amountPayableToday,
						nextPaymentDate =
							null == routerState
								? void 0
								: routerState.nextPaymentDate;
					return void 0 !== amountPayableToday && nextPaymentDate
						? (0, emotion_react_jsx_runtime_browser_esm.BX)(
								emotion_react_jsx_runtime_browser_esm.HY,
								{
									children: [
										switchContext.isFromApp
											? (0,
											  emotion_react_jsx_runtime_browser_esm.tZ)(
													AppThankYouBanner,
													{
														newAmount:
															newAmountAndCurrency,
														newProduct:
															supporterPlusTitle.toLowerCase(),
														aboveThreshold:
															isAboveThreshold,
													},
											  )
											: (0,
											  emotion_react_jsx_runtime_browser_esm.tZ)(
													'section',
													{
														css: GenericStyles.zC,
														children: (0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															ThankYouMessaging,
															{
																mainPlan,
																newAmount,
																aboveThreshold:
																	isAboveThreshold,
															},
														),
													},
											  ),
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'section',
											{
												css: GenericStyles.zC,
												children: (0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													WhatHappensNext,
													{
														currency:
															mainPlan.currency,
														amountPayableToday,
														nextPaymentAmount:
															newAmount,
														billingPeriod:
															monthlyOrAnnual.toLowerCase(),
														email:
															null !==
																(_switchContext$user$e =
																	null ===
																		(_switchContext$user =
																			switchContext.user) ||
																	void 0 ===
																		_switchContext$user
																		? void 0
																		: _switchContext$user.email) &&
															void 0 !==
																_switchContext$user$e
																? _switchContext$user$e
																: '',
														isFromApp:
															switchContext.isFromApp,
														nextPaymentDate,
													},
												),
											},
										),
										!switchContext.isFromApp &&
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'section',
												{
													css: GenericStyles.zC,
													children: (0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														Stack.K,
														{
															space: 6,
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	SignInBanner,
																	{},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'div',
																	{
																		children:
																			(0,
																			emotion_react_jsx_runtime_browser_esm.tZ)(
																				LinkButton.Q,
																				{
																					href: 'https://www.theguardian.com/',
																					children:
																						'Continue reading the Guardian',
																				},
																			),
																	},
																),
															],
														},
													),
												},
											),
									],
								},
						  )
						: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
								react_router.Fg,
								{ to: '..' },
						  );
				},
				thankYouBannerCss = (0, emotion_react_browser_esm.iv)(
					'margin-top:-1px;margin-left:-',
					space.D[3],
					'px;margin-right:-',
					space.D[3],
					'px;padding:',
					space.D[6],
					'px ',
					space.D[3],
					'px;color:',
					palette.palette.neutral[100],
					';background-color:',
					palette.palette.brand[500],
					';',
					mq.Dp.tablet,
					'{margin-left:-',
					space.D[5],
					'px;margin-right:-',
					space.D[5],
					'px;}',
					mq.Dp.desktop,
					'{margin-top:',
					space.D[9],
					'px;margin-left:0;margin-right:0;padding:',
					space.D[4],
					'px ',
					space.D[4],
					'px;}',
					'',
				),
				thankYouBannerHeadingCss = (0, emotion_react_browser_esm.iv)(
					typography.vD7,
					';margin-top:0;margin-bottom:',
					space.D[5],
					'px;max-width:30ch;',
					'',
				),
				thankYouBannerSubheadingCss = (0, emotion_react_browser_esm.iv)(
					typography.Kie,
					';margin:0;border-top:1px solid rgba(255, 255, 255, 0.6);',
					'',
				),
				thankYouBannerCopyCss = (0, emotion_react_browser_esm.iv)(
					typography.Kz0,
					';margin:0;max-width:45ch;',
					'',
				),
				thankYouBannerButtonCss = (0, emotion_react_browser_esm.iv)(
					'margin-top:',
					space.D[6],
					'px;margin-bottom:',
					space.D[5],
					'px;',
					mq.C4.tablet,
					'{display:flex;flex-direction:column;}',
					'',
				),
				AppThankYouBanner = (props) =>
					(0, emotion_react_jsx_runtime_browser_esm.BX)('section', {
						css: thankYouBannerCss,
						children: [
							(0, emotion_react_jsx_runtime_browser_esm.BX)(
								'h2',
								{
									css: thankYouBannerHeadingCss,
									children: [
										'Thank you for ',
										props.aboveThreshold
											? 'changing'
											: 'upgrading',
										' ',
										'to ',
										props.newAmount,
										' ',
										props.newProduct,
									],
								},
							),
							(0, emotion_react_jsx_runtime_browser_esm.tZ)('p', {
								css: thankYouBannerSubheadingCss,
								children: 'One last step ...',
							}),
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								'div',
								{
									css: thankYouBannerButtonCss,
									children: (0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										LinkButton.Q,
										{
											theme: theme_reader_revenue.gk,
											href: 'x-gu://mma/success',
											cssOverrides: ButtonStyles._8,
											children:
												'Activate full app access now',
										},
									),
								},
							),
							(0, emotion_react_jsx_runtime_browser_esm.tZ)('p', {
								css: thankYouBannerCopyCss,
								children:
									'If you don’t complete this step, you may be unable to access the app in full for up to one hour',
							}),
						],
					}),
				WhatHappensNext = (props) =>
					(0, emotion_react_jsx_runtime_browser_esm.BX)(Stack.K, {
						space: 4,
						children: [
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								Heading.X,
								{
									sansSerif: !0,
									children: 'What happens next?',
								},
							),
							(0, emotion_react_jsx_runtime_browser_esm.BX)(
								'ul',
								{
									css: [
										GenericStyles.Yd,
										GenericStyles.rt,
										'',
										'',
									],
									children: [
										(0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											'li',
											{
												children: [
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														SvgEnvelope.j,
														{ size: 'medium' },
													),
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'span',
														{
															'data-qm-masking':
																'blocklist',
															children: [
																'You will receive a confirmation email to ',
																props.email,
															],
														},
													),
												],
											},
										),
										(0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											'li',
											{
												children: [
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														SvgCalendar.c,
														{ size: 'medium' },
													),
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'span',
														{
															children: [
																'Your first billing date is today and you will be charged',
																' ',
																props.currency,
																(0, utils.dN)(
																	props.amountPayableToday,
																),
																'. From',
																' ',
																props.nextPaymentDate,
																', your ongoing',
																' ',
																props.billingPeriod,
																' payment will be ',
																props.currency,
																(0, utils.dN)(
																	props.nextPaymentAmount,
																),
															],
														},
													),
												],
											},
										),
										!props.isFromApp &&
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'li',
												{
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															SvgClock.h,
															{ size: 'medium' },
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'span',
															{
																children:
																	'Your new support will start today. It can take up to an hour for your support to be activated',
															},
														),
													],
												},
											),
									],
								},
							),
						],
					}),
				thankYouCss = (0, emotion_react_browser_esm.iv)(
					typography.vD7,
					';margin-top:0;margin-bottom:0;',
					mq.Dp.tablet,
					'{',
					typography.Hu7,
					';span{display:block;color:',
					palette.palette.brand[500],
					';}}',
					'',
				),
				ThankYouMessaging = (props) =>
					(0, emotion_react_jsx_runtime_browser_esm.BX)('h2', {
						css: thankYouCss,
						children: [
							props.aboveThreshold
								? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
										emotion_react_jsx_runtime_browser_esm.HY,
										{
											children:
												'Thank you for changing your support type.',
										},
								  )
								: (0, emotion_react_jsx_runtime_browser_esm.BX)(
										emotion_react_jsx_runtime_browser_esm.HY,
										{
											children: [
												'Thank you for upgrading to ',
												props.mainPlan.currency,
												(0, utils.dN)(props.newAmount),
												' per',
												' ',
												props.mainPlan.billingPeriod,
												'.',
											],
										},
								  ),
							' ',
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								'span',
								{ children: 'Enjoy your exclusive extras' },
							),
						],
					}),
				signInCss = (0, emotion_react_browser_esm.iv)(
					'display:grid;overflow:hidden;background-color:',
					palette.palette.brand[500],
					';border-radius:8px;>*{grid-area:1/1;}>svg{place-self:end;height:0;min-height:100%;}',
					mq.Dp.tablet,
					'{border-radius:0;}',
					'',
				),
				signInContentContainerCss = (0, emotion_react_browser_esm.iv)(
					'padding:',
					space.D[3],
					'px;color:',
					palette.palette.neutral[100],
					';',
					'',
				),
				signInHeadingCss = (0, emotion_react_browser_esm.iv)(
					typography.Rcn,
					';margin:0;',
					'',
				),
				signInParaCss = (0, emotion_react_browser_esm.iv)(
					typography.Kz0,
					';margin:0;max-width:64%;',
					'',
				),
				SignInBanner = () =>
					(0, emotion_react_jsx_runtime_browser_esm.BX)('div', {
						css: signInCss,
						children: [
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								SwitchSignInImage.V,
								{},
							),
							(0, emotion_react_jsx_runtime_browser_esm.BX)(
								'div',
								{
									css: signInContentContainerCss,
									children: [
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'h2',
											{
												css: signInHeadingCss,
												children:
													'Sign in on all your devices',
											},
										),
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'p',
											{
												css: signInParaCss,
												children:
													'To access your exclusive extras on our website and app, please sign in. It takes less than a minute.',
											},
										),
									],
								},
							),
						],
					});
			const SwitchComplete_stories = {
				title: 'Pages/SwitchComplete',
				component: SwitchContainer.x,
				decorators: [ReactRouterDecorator.R],
				parameters: {
					layout: 'fullscreen',
					reactRouter: {
						state: {
							productDetail: (0, testProducts.VO)(),
							user: { email: 'test@theguardian.com' },
							amountPayableToday: 5.9,
							nextPaymentDate: '20 March',
						},
						container: (0,
						emotion_react_jsx_runtime_browser_esm.tZ)(
							SwitchContainer.x,
							{},
						),
					},
				},
			};
			var Default = () =>
					(0, emotion_react_jsx_runtime_browser_esm.tZ)(
						SwitchComplete,
						{},
					),
				YearlyOtherCurrency = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							SwitchComplete,
							{},
						),
					parameters: {
						reactRouter: {
							state: { productDetail: (0, testProducts.uH)() },
						},
					},
				},
				FromApp = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							SwitchComplete,
							{},
						),
					parameters: {
						reactRouter: {
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								SwitchContainer.x,
								{ isFromApp: !0 },
							),
						},
					},
				};
			(Default.parameters = {
				...Default.parameters,
				docs: {
					...Default.parameters?.docs,
					source: {
						originalSource: '() => <SwitchComplete />',
						...Default.parameters?.docs?.source,
					},
				},
			}),
				(YearlyOtherCurrency.parameters = {
					...YearlyOtherCurrency.parameters,
					docs: {
						...YearlyOtherCurrency.parameters?.docs,
						source: {
							originalSource:
								'{\n  render: () => <SwitchComplete />,\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: contributionPaidByPayPal()\n      }\n    }\n  }\n}',
							...YearlyOtherCurrency.parameters?.docs?.source,
						},
					},
				}),
				(FromApp.parameters = {
					...FromApp.parameters,
					docs: {
						...FromApp.parameters?.docs,
						source: {
							originalSource:
								'{\n  render: () => <SwitchComplete />,\n  parameters: {\n    reactRouter: {\n      container: <SwitchContainer isFromApp={true} />\n    }\n  }\n}',
							...FromApp.parameters?.docs?.source,
						},
					},
				});
			const __namedExportsOrder = [
				'Default',
				'YearlyOtherCurrency',
				'FromApp',
			];
		},
	},
]);
