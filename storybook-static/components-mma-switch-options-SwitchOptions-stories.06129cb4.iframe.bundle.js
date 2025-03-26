'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[4707],
	{
		'./node_modules/@guardian/source-development-kitchen/dist/react-components/summary/ErrorSummary.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					X: () => ErrorSummary,
				});
				var emotion_react_jsx_runtime_browser_esm = __webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
					palette = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__deprecated__/colour/palette.js',
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
								d: 'M11.41 2 1 19.057l.668.943h20.664l.668-.943L12.59 2zm-.063 12.178h1.306l.621-6.917-.856-.728h-.835l-.857.728zM12 15.452c.7 0 1.274.573 1.274 1.274 0 .7-.573 1.274-1.274 1.274-.7 0-1.274-.573-1.274-1.274 0-.7.573-1.274 1.274-1.274',
								fill: theme?.fill,
							}),
						}),
					SvgAlertTriangle = ({
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
				var styles = __webpack_require__(
					'./node_modules/@guardian/source-development-kitchen/dist/react-components/summary/styles.js',
				);
				const ErrorSummary = ({
					message,
					errorReportUrl,
					context,
					cssOverrides,
					...props
				}) =>
					(0, emotion_react_jsx_runtime_browser_esm.BX)('div', {
						css: [(0, styles.eZ)(palette.vU[400]), cssOverrides],
						...props,
						children: [
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								'div',
								{
									css: (0, styles.$b)(palette.vU[400]),
									children: (0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										SvgAlertTriangle,
										{},
									),
								},
							),
							(0, emotion_react_jsx_runtime_browser_esm.BX)(
								'div',
								{
									css: styles._h,
									children: [
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'div',
											{
												css: (0, styles.W_)(
													palette.vU[400],
												),
												children: message,
											},
										),
										errorReportUrl &&
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'a',
												{
													css: (0, styles.W_)(
														palette.vU[400],
														!1,
													),
													href: errorReportUrl,
													children:
														'Report this error',
												},
											),
										context &&
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'div',
												{
													css: styles.vl,
													children: context,
												},
											),
									],
								},
							),
						],
					});
			},
		'./node_modules/@guardian/source-development-kitchen/dist/react-components/summary/styles.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					$b: () => iconStyles,
					W_: () => messageStyles,
					_h: () => messageWrapperStyles,
					eZ: () => wrapperStyles,
					vl: () => contextStyles,
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
							'./node_modules/@guardian/source/dist/foundations/__generated__/size.js',
						),
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
						);
				const wrapperStyles = (
						color,
					) => _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	border: 2px solid ${color};
	border-radius: 4px;
	padding: ${_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__.D[1]}px;
	display: flex;
`,
					iconStyles = (
						color,
					) => _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	display: flex;
	flex: 0 1 auto;
	margin-top: 1px;
	svg {
		fill: ${color};
		height: ${_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.dp.xsmall}px;
		width: ${_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.dp.xsmall}px;
	}
`,
					messageStyles = (
						color,
						isBold = !0,
					) => _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	${
		isBold
			? _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__.Rcn
			: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__.Kz0
	};
	line-height: 1.4;
	color: ${color};
`,
					messageWrapperStyles = _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	margin-left: ${_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__.D[1]}px;
`,
					contextStyles = _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv`
	${_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__.Kz0};
`;
			},
		'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgCrossRoundFilled.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					i: () => SvgCrossRoundFilled,
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
										d: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10m5.138-14.358-.782-.78-4.349 3.982-4.364-3.967-.782.78L10.85 12l-3.988 4.342.782.781 4.364-3.967 4.35 3.982.781-.78L13.165 12z',
										fill: theme?.fill,
									},
								),
							},
						),
					SvgCrossRoundFilled = ({
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
													children: 'Close',
												},
										  )
										: '',
								],
							},
						);
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
		'./client/styles/ErrorStyles.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				nZ: () => errorSummaryLinkCss,
				p: () => errorSummaryOverrideCss,
				qX: () => errorSummaryBlockLinkCss,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
					);
			var errorSummaryOverrideCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__.C4
						.tablet,
					'{border-radius:6px;}',
					'',
				),
				errorSummaryLinkCss = {
					name: '154it3g',
					styles: 'color:currentColor;text-decoration:underline',
				},
				errorSummaryBlockLinkCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'display:block;margin-top:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.D[3],
					'px;',
					'',
				);
		},
		'./client/utilities/pricingConfig/supporterPlusPricing.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				F: () => supporterPlusPriceConfigByCountryGroup,
				s: () => getBenefitsThreshold,
			});
			var supporterPlusPriceConfigByCountryGroup = {
				GBP: {
					month: { minAmount: 12, maxAmount: 166 },
					year: { minAmount: 120, maxAmount: 2e3 },
				},
				USD: {
					month: { minAmount: 15, maxAmount: 800 },
					year: { minAmount: 150, maxAmount: 1e4 },
				},
				EUR: {
					month: { minAmount: 12, maxAmount: 166 },
					year: { minAmount: 120, maxAmount: 2e3 },
				},
				AUD: {
					month: { minAmount: 20, maxAmount: 200 },
					year: { minAmount: 200, maxAmount: 2e3 },
				},
				NZD: {
					month: { minAmount: 20, maxAmount: 200 },
					year: { minAmount: 200, maxAmount: 2e3 },
				},
				CAD: {
					month: { minAmount: 15, maxAmount: 166 },
					year: { minAmount: 150, maxAmount: 2e3 },
				},
				international: {
					month: { minAmount: 15, maxAmount: 166 },
					year: { minAmount: 150, maxAmount: 2e3 },
				},
			};
			function getBenefitsThreshold(currency, billingPeriod) {
				var _supporterPlusPriceCo;
				return (
					null !==
						(_supporterPlusPriceCo =
							supporterPlusPriceConfigByCountryGroup[currency]) &&
					void 0 !== _supporterPlusPriceCo
						? _supporterPlusPriceCo
						: supporterPlusPriceConfigByCountryGroup.international
				)[billingPeriod].minAmount;
			}
		},
		'./client/components/mma/switch/options/SwitchOptions.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					AboveThreshold: () => AboveThreshold,
					BelowThreshold: () => BelowThreshold,
					FromApp: () => FromApp,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => SwitchOptions_stories,
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
				typography = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
				),
				palette = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
				),
				space = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
				),
				mq = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
				),
				Stack = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/stack/Stack.js',
				),
				Button = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/button/Button.js',
				),
				theme_reader_revenue = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/button/theme-reader-revenue.js',
				),
				ErrorSummary = __webpack_require__(
					'./node_modules/@guardian/source-development-kitchen/dist/react-components/summary/ErrorSummary.js',
				),
				react = __webpack_require__('./node_modules/react/index.js'),
				react_router = __webpack_require__(
					'./node_modules/react-router/index.js',
				),
				react_router_dom = __webpack_require__(
					'./node_modules/react-router-dom/index.js',
				),
				ButtonStyles = __webpack_require__(
					'./client/styles/ButtonStyles.ts',
				),
				ErrorStyles = __webpack_require__(
					'./client/styles/ErrorStyles.ts',
				),
				GenericStyles = __webpack_require__(
					'./client/styles/GenericStyles.ts',
				),
				utils = __webpack_require__('./client/utilities/utils.ts'),
				BenefitsConfiguration = __webpack_require__(
					'./client/components/mma/shared/benefits/BenefitsConfiguration.ts',
				),
				BenefitsSection = __webpack_require__(
					'./client/components/mma/shared/benefits/BenefitsSection.tsx',
				),
				Card = __webpack_require__(
					'./client/components/mma/shared/Card.tsx',
				),
				Heading = __webpack_require__(
					'./client/components/mma/shared/Heading.tsx',
				),
				emotion_react_jsx_runtime_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				);
			var cardHeaderDivCss = {
					name: '1laz9o6',
					styles: 'display:flex;justify-content:space-between;align-items:flex-end',
				},
				productSubtitleCss = (0, emotion_react_browser_esm.iv)(
					typography.Rcn,
					';color:',
					palette.palette.neutral[100],
					';margin:0;max-width:20ch;',
					'',
				),
				buttonContainerCss = (0, emotion_react_browser_esm.iv)(
					'margin-top:',
					space.D[1],
					'px;padding:',
					space.D[5],
					'px 0;',
					mq.C4.tablet,
					'{display:flex;flex-direction:column;position:sticky;bottom:0;margin-left:-',
					space.D[3],
					'px;margin-right:-',
					space.D[3],
					'px;padding-left:',
					space.D[3],
					'px;padding-right:',
					space.D[3],
					'px;}',
					'',
				),
				buttonStuckCss = (0, emotion_react_browser_esm.iv)(
					mq.C4.tablet,
					'{background-color:',
					palette.palette.neutral[100],
					';box-shadow:0px -1px 16px rgba(0, 0, 0, 0.1);}',
					'',
				),
				fromAppHeadingCss = (0, emotion_react_browser_esm.iv)(
					typography.Kie,
					';line-height:normal;color:',
					palette.palette.brand[500],
					';margin-bottom:0;',
					'',
				),
				SwitchOptions = () => {
					var switchContext = (0, react.useContext)(
							SwitchContainer.w,
						),
						routerState = (0, react_router.TH)().state,
						{
							contributionToSwitch,
							mainPlan,
							monthlyOrAnnual,
							supporterPlusTitle,
							thresholds,
						} = switchContext,
						{
							monthlyThreshold,
							annualThreshold,
							thresholdForBillingPeriod: threshold,
							isAboveThreshold,
						} = thresholds,
						currentAmount = mainPlan.price / 100,
						buttonContainerRef = (0, react.useRef)(null),
						[buttonIsStuck, setButtonIsStuck] = (0, react.useState)(
							!1,
						);
					(0, react.useEffect)(() => {
						var observer = new IntersectionObserver(
							(_ref) => {
								var [entry] = _ref;
								setButtonIsStuck(entry.intersectionRatio < 1);
							},
							{
								threshold: [1],
								rootMargin: '100px 0px -1px 0px',
							},
						);
						return (
							buttonContainerRef.current &&
								observer.observe(buttonContainerRef.current),
							() => {
								observer.disconnect();
							}
						);
					}, [buttonContainerRef]);
					var navigate = (0, react_router.s0)();
					return 'Supporter Plus' === contributionToSwitch.tier
						? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
								'section',
								{
									css: GenericStyles.zC,
									children: (0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										ErrorSummary.X,
										{
											cssOverrides: ErrorStyles.p,
											message:
												'There is a problem with your subscription type',
											context: (0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												emotion_react_jsx_runtime_browser_esm.HY,
												{
													children: [
														'Your subscription does not allow you to perform this switch.',
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															react_router_dom.rU,
															{
																css: [
																	ErrorStyles.nZ,
																	ErrorStyles.qX,
																	'',
																	'',
																],
																to: '/',
																children:
																	'Return to account overview',
															},
														),
													],
												},
											),
										},
									),
								},
						  )
						: (0, emotion_react_jsx_runtime_browser_esm.BX)(
								emotion_react_jsx_runtime_browser_esm.HY,
								{
									children: [
										contributionToSwitch.alertText &&
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'section',
												{
													css: GenericStyles.zC,
													children: (0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														ErrorSummary.X,
														{
															cssOverrides:
																ErrorStyles.p,
															message:
																'There is a problem with your payment method',
															context: (0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																emotion_react_jsx_runtime_browser_esm.HY,
																{
																	children: [
																		'Please update your payment details in order to change your support.',
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			react_router_dom.rU,
																			{
																				css: [
																					ErrorStyles.nZ,
																					ErrorStyles.qX,
																					'',
																					'',
																				],
																				to: '/payment/contributions',
																				children:
																					'Check your payment details',
																			},
																		),
																	],
																},
															),
														},
													),
												},
											),
										switchContext.isFromApp &&
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'section',
												{
													css: GenericStyles.zC,
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'h2',
															{
																css: fromAppHeadingCss,
																children:
																	isAboveThreshold
																		? 'Add extras to get full access to our news app today'
																		: 'Change your support to get full access to our news app today',
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															'p',
															{
																css: (0,
																emotion_react_browser_esm.iv)(
																	typography.Kz0,
																	';',
																	'',
																),
																children: [
																	isAboveThreshold
																		? 'Your current payment entitles you to exclusive supporter extras. It takes less than a minute to add them.'
																		: 'It takes less than a minute to change your support type.',
																	' ',
																	"If this doesn't suit you, no change is needed, but note you will have limited access to our app.",
																],
															},
														),
													],
												},
											),
										(0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											'section',
											{
												css: GenericStyles.zC,
												children: [
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														Heading.X,
														{
															sansSerif: !0,
															cssOverrides: (0,
															emotion_react_browser_esm.iv)(
																'margin-bottom:',
																space.D[3],
																'px;',
																'',
															),
															children:
																'Your current support',
														},
													),
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														Card.Z,
														{
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	Card.Z
																		.Header,
																	{
																		backgroundColor:
																			palette
																				.palette
																				.brand[600],
																		children:
																			(0,
																			emotion_react_jsx_runtime_browser_esm.BX)(
																				'div',
																				{
																					css: cardHeaderDivCss,
																					children:
																						[
																							(0,
																							emotion_react_jsx_runtime_browser_esm.tZ)(
																								'h3',
																								{
																									css: GenericStyles.Ai,
																									children:
																										monthlyOrAnnual,
																								},
																							),
																							(0,
																							emotion_react_jsx_runtime_browser_esm.BX)(
																								'p',
																								{
																									css: productSubtitleCss,
																									children:
																										[
																											mainPlan.currency,
																											(0,
																											utils.dN)(
																												currentAmount,
																											),
																											'/',
																											mainPlan.billingPeriod,
																										],
																								},
																							),
																						],
																				},
																			),
																	},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	Card.Z
																		.Section,
																	{
																		children:
																			(0,
																			emotion_react_jsx_runtime_browser_esm.BX)(
																				'div',
																				{
																					css: (0,
																					emotion_react_browser_esm.iv)(
																						typography.Kz0,
																						';',
																						'',
																					),
																					children:
																						[
																							'You pay ',
																							mainPlan.currency,
																							(0,
																							utils.dN)(
																								currentAmount,
																							),
																							' on a recurring basis every ',
																							mainPlan.billingPeriod,
																						],
																				},
																			),
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
											'section',
											{
												css: GenericStyles.zC,
												children: (0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													Stack.K,
													{
														space: 3,
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																Heading.X,
																{
																	sansSerif:
																		!0,
																	children:
																		isAboveThreshold
																			? 'Add extras'
																			: 'Change your support',
																},
															),
															isAboveThreshold &&
																!switchContext.isFromApp &&
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
																			'Your current payment entitles you to exclusive supporter extras. It takes less than a minute to change your support type and gain access.',
																	},
																),
															!isAboveThreshold &&
																!switchContext.isFromApp &&
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
																			'Unlock exclusive supporter extras when you pay a little more',
																	},
																),
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																Card.Z,
																{
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			Card
																				.Z
																				.Header,
																			{
																				backgroundColor:
																					palette
																						.palette
																						.brand[500],
																				children:
																					(0,
																					emotion_react_jsx_runtime_browser_esm.BX)(
																						'div',
																						{
																							css: cardHeaderDivCss,
																							children:
																								[
																									(0,
																									emotion_react_jsx_runtime_browser_esm.tZ)(
																										'h3',
																										{
																											css: GenericStyles.Ai,
																											children:
																												supporterPlusTitle,
																										},
																									),
																									!isAboveThreshold &&
																										(0,
																										emotion_react_jsx_runtime_browser_esm.BX)(
																											'p',
																											{
																												css: productSubtitleCss,
																												children:
																													[
																														mainPlan.currency,
																														(0,
																														utils.dN)(
																															threshold,
																														),
																														'/',
																														mainPlan.billingPeriod,
																													],
																											},
																										),
																								],
																						},
																					),
																			},
																		),
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			Card
																				.Z
																				.Section,
																			{
																				children:
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						BenefitsSection.c,
																						{
																							benefits:
																								BenefitsConfiguration.oM,
																						},
																					),
																			},
																		),
																	],
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
												css: [
													buttonContainerCss,
													buttonIsStuck &&
														buttonStuckCss,
													'',
													'',
												],
												ref: buttonContainerRef,
												children: (0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													Button.z,
													{
														theme: theme_reader_revenue.gk,
														size: 'small',
														cssOverrides:
															ButtonStyles._8,
														onClick: () =>
															navigate('review', {
																state: routerState,
															}),
														children:
															isAboveThreshold
																? 'Add extras'
																: 'Upgrade to '
																		.concat(
																			mainPlan.currency,
																		)
																		.concat(
																			threshold,
																			' per ',
																		)
																		.concat(
																			mainPlan.billingPeriod,
																		),
													},
												),
											},
										),
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'section',
											{
												children: (0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'p',
													{
														css: GenericStyles.wx,
														children: [
															'These extras are exclusively available for supporters who give a minimum of ',
															mainPlan.currency,
															(0, utils.dN)(
																monthlyThreshold,
															),
															' per month, or',
															' ',
															mainPlan.currency,
															(0, utils.dN)(
																annualThreshold,
															),
															' per year.',
														],
													},
												),
											},
										),
									],
								},
						  );
				};
			const SwitchOptions_stories = {
				title: 'Pages/SwitchOptions',
				component: SwitchContainer.x,
				decorators: [ReactRouterDecorator.R],
				parameters: {
					layout: 'fullscreen',
					reactRouter: {
						state: { productDetail: (0, testProducts.VO)() },
						container: (0,
						emotion_react_jsx_runtime_browser_esm.tZ)(
							SwitchContainer.x,
							{},
						),
					},
				},
			};
			var AboveThreshold = () =>
					(0, emotion_react_jsx_runtime_browser_esm.tZ)(
						SwitchOptions,
						{},
					),
				BelowThreshold = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							SwitchOptions,
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
							SwitchOptions,
							{},
						),
					parameters: {
						reactRouter: {
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								SwitchContainer.x,
								{ isFromApp: !0 },
							),
							state: { productDetail: (0, testProducts.uH)() },
						},
					},
				};
			(AboveThreshold.parameters = {
				...AboveThreshold.parameters,
				docs: {
					...AboveThreshold.parameters?.docs,
					source: {
						originalSource: '() => <SwitchOptions />',
						...AboveThreshold.parameters?.docs?.source,
					},
				},
			}),
				(BelowThreshold.parameters = {
					...BelowThreshold.parameters,
					docs: {
						...BelowThreshold.parameters?.docs,
						source: {
							originalSource:
								'{\n  render: () => <SwitchOptions />,\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: contributionPaidByPayPal()\n      }\n    }\n  }\n}',
							...BelowThreshold.parameters?.docs?.source,
						},
					},
				}),
				(FromApp.parameters = {
					...FromApp.parameters,
					docs: {
						...FromApp.parameters?.docs,
						source: {
							originalSource:
								'{\n  render: () => <SwitchOptions />,\n  parameters: {\n    reactRouter: {\n      container: <SwitchContainer isFromApp={true} />,\n      state: {\n        productDetail: contributionPaidByPayPal()\n      }\n    }\n  }\n}',
							...FromApp.parameters?.docs?.source,
						},
					},
				});
			const __namedExportsOrder = [
				'AboveThreshold',
				'BelowThreshold',
				'FromApp',
			];
		},
	},
]);
//# sourceMappingURL=components-mma-switch-options-SwitchOptions-stories.06129cb4.iframe.bundle.js.map
