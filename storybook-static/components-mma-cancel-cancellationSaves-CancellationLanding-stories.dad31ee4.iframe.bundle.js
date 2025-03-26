'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[4035],
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
		'./client/fixtures/mdapiResponse.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				F: () => toMembersDataApiResponse,
			});
			var toMembersDataApiResponse = function () {
				for (
					var _len = arguments.length,
						productDetails = new Array(_len),
						_key = 0;
					_key < _len;
					_key++
				)
					productDetails[_key] = arguments[_key];
				return {
					user: {
						firstName: 'test',
						lastName: 'name',
						email: 'test@test.com',
					},
					products: productDetails,
				};
			};
		},
		'./client/utilities/pricingConfig/membershipPriceRise.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				a: () => getOldMembershipPrice,
				b: () => getNewMembershipPrice,
			});
			var _guardian_libs__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@guardian/libs/dist/isOneOf/isOneOf.js',
					),
				MembershipCurrencyIsos = ['GBP', 'USD', 'AUD', 'EUR', 'CAD'],
				billingPeriods = ['month', 'year'],
				newSupporterMembershipByCountryGroup = {
					GBP: { month: 7, year: 75 },
					USD: { month: 9.99, year: 120 },
					EUR: { month: 9.99, year: 95 },
					AUD: { month: 14.99, year: 160 },
					CAD: { month: 12.99, year: 120 },
				},
				oldSupporterMembershipByCountryGroup = {
					GBP: { month: 5, year: 49 },
					USD: { month: 6.99, year: 69 },
					EUR: { month: 4.99, year: 49 },
					AUD: { month: 10, year: 100 },
					CAD: { month: 6.99, year: 69 },
				};
			function getMembershipPrice(_ref, pricePerCurrency) {
				var { currencyISO, billingPeriod } = _ref;
				if (
					!(0, _guardian_libs__WEBPACK_IMPORTED_MODULE_0__.g)(
						MembershipCurrencyIsos,
					)(currencyISO)
				)
					throw new Error('Unsupported membership currency');
				if (
					!(0, _guardian_libs__WEBPACK_IMPORTED_MODULE_0__.g)(
						billingPeriods,
					)(billingPeriod)
				)
					throw new Error('Unsupported membership billing period');
				return pricePerCurrency[currencyISO][billingPeriod];
			}
			function getNewMembershipPrice(plan) {
				return getMembershipPrice(
					plan,
					newSupporterMembershipByCountryGroup,
				);
			}
			function getOldMembershipPrice(plan) {
				return getMembershipPrice(
					plan,
					oldSupporterMembershipByCountryGroup,
				);
			}
		},
		'./client/components/mma/cancel/cancellationSaves/CancellationLanding.stories.tsx':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.r(__webpack_exports__),
					__webpack_require__.d(__webpack_exports__, {
						DigiPack: () => DigiPack,
						Membership: () => Membership,
						__namedExportsOrder: () => __namedExportsOrder,
						default: () => CancellationLanding_stories,
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
					mdapiResponse = __webpack_require__(
						'./client/fixtures/mdapiResponse.ts',
					),
					testProducts = __webpack_require__(
						'./client/fixtures/productBuilder/testProducts.ts',
					),
					productTypes = __webpack_require__(
						'./shared/productTypes.ts',
					),
					CancellationContainer = __webpack_require__(
						'./client/components/mma/cancel/CancellationContainer.tsx',
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
					Stack = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/stack/Stack.js',
					),
					Button = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/button/Button.js',
					),
					react = __webpack_require__(
						'./node_modules/react/index.js',
					),
					react_router = __webpack_require__(
						'./node_modules/react-router/index.js',
					),
					CallCentreAccordion = __webpack_require__(
						'./client/components/shared/CallCentreAccordion.tsx',
					),
					productResponse = __webpack_require__(
						'./shared/productResponse.ts',
					),
					GenericStyles = __webpack_require__(
						'./client/styles/GenericStyles.ts',
					),
					useAsyncLoader = __webpack_require__(
						'./client/utilities/hooks/useAsyncLoader.ts',
					),
					productUtils = __webpack_require__(
						'./client/utilities/productUtils.ts',
					),
					GenericErrorScreen = __webpack_require__(
						'./client/components/shared/GenericErrorScreen.tsx',
					),
					DefaultApiResponseHandler = __webpack_require__(
						'./client/components/mma/shared/asyncComponents/DefaultApiResponseHandler.tsx',
					),
					DefaultLoadingView = __webpack_require__(
						'./client/components/mma/shared/asyncComponents/DefaultLoadingView.tsx',
					),
					Heading = __webpack_require__(
						'./client/components/mma/shared/Heading.tsx',
					),
					membershipPriceRise = __webpack_require__(
						'./client/utilities/pricingConfig/membershipPriceRise.ts',
					);
				function ineligibleForSave(products, productToCancel) {
					return (
						'membership' ===
							(0, productResponse.Xn)(productToCancel.tier)
								.productType &&
						(function isMembershipIneligible(
							products,
							productToCancel,
						) {
							var inPaymentFailure = !!products.find(
									(product) => product.alertText,
								),
								hasOtherProduct = !!products.find(
									(product) =>
										'membership' !=
											(0, productResponse.Xn)(
												product.tier,
											).productType &&
										!product.subscription.cancelledAt,
								),
								membershipTierIsNotSupporter =
									'Supporter' !== productToCancel.tier,
								mainPlan = (0, productResponse.fr)(
									productToCancel.subscription,
								),
								hasBeenPriceRisen =
									(0, membershipPriceRise.b)(mainPlan) ===
									mainPlan.price / 100;
							return (
								inPaymentFailure ||
								hasOtherProduct ||
								membershipTierIsNotSupporter ||
								hasBeenPriceRisen
							);
						})(products, productToCancel)
					);
				}
				var emotion_react_jsx_runtime_browser_esm = __webpack_require__(
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
									var res = prim.call(
										input,
										hint || 'default',
									);
									if ('object' != typeof res) return res;
									throw new TypeError(
										'@@toPrimitive must return a primitive value.',
									);
								}
								return ('string' === hint ? String : Number)(
									input,
								);
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
				var CancellationLanding = () => {
					var routerState = (0, react_router.TH)().state,
						navigate = (0, react_router.s0)(),
						{ productDetail: productToCancel } = (0,
						react.useContext)(CancellationContainer.DW),
						{ data, loadingState } = (0, useAsyncLoader.c)(
							productUtils.EV,
							DefaultApiResponseHandler.xJ,
						);
					return productToCancel
						? loadingState == useAsyncLoader.G.HasError
							? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
									GenericErrorScreen.c,
									{},
							  )
							: loadingState == useAsyncLoader.G.IsLoading
							? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
									DefaultLoadingView.I,
									{
										loadingMessage:
											'Loading your products...',
									},
							  )
							: null === data
							? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
									GenericErrorScreen.c,
									{},
							  )
							: ineligibleForSave(data.products, productToCancel)
							? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
									react_router.Fg,
									{ to: '../', state: { dontShowOffer: !0 } },
							  )
							: (0, emotion_react_jsx_runtime_browser_esm.BX)(
									emotion_react_jsx_runtime_browser_esm.HY,
									{
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'section',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														'margin-top:',
														space.D[4],
														'px;',
														'',
													),
													children: (0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														Stack.K,
														{
															space: 1,
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'h2',
																	{
																		css: GenericStyles.Wn,
																		children:
																			"We're sorry to hear you're thinking of leaving",
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
																			'To cancel today, please choose from the following options.',
																	},
																),
															],
														},
													),
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'section',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														'margin-top:',
														space.D[6] + space.D[2],
														'px;',
														'',
													),
													children: (0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														Stack.K,
														{
															space: 4,
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'div',
																	{
																		children:
																			[
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					Heading.X,
																					{
																						borderless:
																							!0,
																						sansSerif:
																							!0,
																						level: '3',
																						children:
																							'Contact us',
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					'p',
																					{
																						css: (0,
																						emotion_react_browser_esm.iv)(
																							typography.Kz0,
																							';margin:0;',
																							'',
																						),
																						children:
																							'Speak to our customer service team.',
																					},
																				),
																			],
																	},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	CallCentreAccordion._,
																	{
																		phoneRegionFilterKeys:
																			productToCancel
																				.selfServiceCancellation
																				.phoneRegionsToDisplay,
																	},
																),
															],
														},
													),
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'section',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														'margin-top:',
														space.D[6] + space.D[2],
														'px;',
														'',
													),
													children: (0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														Stack.K,
														{
															space: 2,
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'span',
																	{
																		children:
																			[
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					Heading.X,
																					{
																						borderless:
																							!0,
																						sansSerif:
																							!0,
																						level: '3',
																						children:
																							'Cancel online',
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					'p',
																					{
																						css: (0,
																						emotion_react_browser_esm.iv)(
																							typography.Kz0,
																							';margin:0;',
																							'',
																						),
																						children:
																							'End your subscription with just a few clicks.',
																					},
																				),
																			],
																	},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'div',
																	{
																		children:
																			(0,
																			emotion_react_jsx_runtime_browser_esm.tZ)(
																				Button.z,
																				{
																					priority:
																						'subdued',
																					onClick:
																						() =>
																							navigate(
																								(function getNextRoute(
																									productToCancel,
																								) {
																									switch (
																										(0,
																										productResponse.Xn)(
																											productToCancel.tier,
																										)
																											.productType
																									) {
																										case 'membership':
																											return '../details';
																										case 'digipack':
																											return '../discount-offer';
																										default:
																											return '/';
																									}
																								})(
																									productToCancel,
																								),
																								{
																									state: _objectSpread(
																										_objectSpread(
																											{},
																											routerState,
																										),
																										{},
																										{
																											user: data.user,
																										},
																									),
																								},
																							),
																					children:
																						'Continue to cancel online',
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
								{ to: '/' },
						  );
				};
				const CancellationLanding_stories = {
					title: 'Pages/CancellationLanding',
					component: CancellationContainer.OY,
					decorators: [ReactRouterDecorator.R],
					parameters: { layout: 'fullscreen' },
				};
				var Membership = {
						render: () =>
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								CancellationLanding,
								{},
							),
						parameters: {
							reactRouter: {
								state: {
									productDetail: (0, testProducts.wG)(),
									user: { email: 'test@test.com' },
								},
								container: (0,
								emotion_react_jsx_runtime_browser_esm.tZ)(
									CancellationContainer.OY,
									{ productType: productTypes.Pm.membership },
								),
							},
							msw: [
								http.d.get('/api/me/mma', () =>
									HttpResponse.Z.json(
										(0, mdapiResponse.F)(
											(0, testProducts.wG)(),
										),
									),
								),
							],
						},
					},
					DigiPack = {
						render: () =>
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								CancellationLanding,
								{},
							),
						parameters: {
							reactRouter: {
								state: {
									productDetail: (0, testProducts.IB)(),
									user: { email: 'test@test.com' },
								},
								container: (0,
								emotion_react_jsx_runtime_browser_esm.tZ)(
									CancellationContainer.OY,
									{ productType: productTypes.Pm.digipack },
								),
							},
							msw: [
								http.d.get('/api/me/mma', () =>
									HttpResponse.Z.json(
										(0, mdapiResponse.F)(
											(0, testProducts.IB)(),
										),
									),
								),
							],
						},
					};
				(Membership.parameters = {
					...Membership.parameters,
					docs: {
						...Membership.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <CancellationLanding />;\n  },\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: membershipSupporterCurrencyUSD(),\n        user: {\n          email: 'test@test.com'\n        }\n      },\n      container: <CancellationContainer productType={PRODUCT_TYPES.membership} />\n    },\n    msw: [http.get('/api/me/mma', () => {\n      return HttpResponse.json(toMembersDataApiResponse(membershipSupporterCurrencyUSD()));\n    })]\n  }\n}",
							...Membership.parameters?.docs?.source,
						},
					},
				}),
					(DigiPack.parameters = {
						...DigiPack.parameters,
						docs: {
							...DigiPack.parameters?.docs,
							source: {
								originalSource:
									"{\n  render: () => {\n    return <CancellationLanding />;\n  },\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: digitalPackPaidByDirectDebit(),\n        user: {\n          email: 'test@test.com'\n        }\n      },\n      container: <CancellationContainer productType={PRODUCT_TYPES.digipack} />\n    },\n    msw: [http.get('/api/me/mma', () => {\n      return HttpResponse.json(toMembersDataApiResponse(digitalPackPaidByDirectDebit()));\n    })]\n  }\n}",
								...DigiPack.parameters?.docs?.source,
							},
						},
					});
				const __namedExportsOrder = ['Membership', 'DigiPack'];
			},
	},
]);
