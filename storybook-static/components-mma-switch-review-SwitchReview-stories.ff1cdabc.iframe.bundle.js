'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[8255],
	{
		'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgClock.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					h: () => SvgClock,
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
										d: 'M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10m-8.909-.318-.659-7.864h-.886l-.682 8.523 1.159 1.159 6.34-.59V12z',
										fill: theme?.fill,
									},
								),
							},
						),
					SvgClock = ({
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
													children: 'Clock',
												},
										  )
										: '',
								],
							},
						);
			},
		'./client/components/mma/shared/benefits/BenefitsToggle.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				r: () => BenefitsToggle,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_7__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_8__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
					),
				react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./node_modules/react/index.js',
				),
				_shared_productResponse__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__('./shared/productResponse.ts'),
				_shared_ExpanderButton__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./client/components/shared/ExpanderButton.tsx',
					),
				_BenefitsConfiguration__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./client/components/mma/shared/benefits/BenefitsConfiguration.ts',
					),
				_BenefitsSection__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./client/components/mma/shared/benefits/BenefitsSection.tsx',
					),
				_BenefitsStyles__WEBPACK_IMPORTED_MODULE_5__ =
					__webpack_require__(
						'./client/components/mma/shared/benefits/BenefitsStyles.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				BenefitsToggle = (_ref) => {
					var { productType, subscriptionPlan } = _ref,
						currencyIso = (0,
						_shared_productResponse__WEBPACK_IMPORTED_MODULE_1__.q4)(
							subscriptionPlan,
						)
							? subscriptionPlan.currencyISO
							: '',
						[showBenefits, setShowBenefits] = (0,
						react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),
						benefits =
							_BenefitsConfiguration__WEBPACK_IMPORTED_MODULE_3__.O7[
								productType
							].filter((benefit) =>
								(0,
								_BenefitsConfiguration__WEBPACK_IMPORTED_MODULE_3__.BQ)(
									benefit,
									currencyIso,
								),
							);
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.BX)(
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.HY,
						{
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.tZ)(
									'div',
									{
										css: (0,
										_emotion_react__WEBPACK_IMPORTED_MODULE_7__.iv)(
											'margin:',
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_8__
												.D[5],
											'px 0 ',
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_8__
												.D[4],
											'px 0;',
											'',
										),
										hidden: !showBenefits,
										children: (0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.tZ)(
											_BenefitsSection__WEBPACK_IMPORTED_MODULE_4__.c,
											{ benefits },
										),
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.BX)(
									'button',
									{
										css: [
											(0,
											_shared_ExpanderButton__WEBPACK_IMPORTED_MODULE_2__.S)()(
												showBenefits,
											),
											_BenefitsStyles__WEBPACK_IMPORTED_MODULE_5__.TY,
											'',
											'',
										],
										type: 'button',
										'aria-expanded': showBenefits,
										'aria-controls': 'benefits',
										onClick: () =>
											setShowBenefits(!showBenefits),
										children: [
											showBenefits ? 'hide' : 'view',
											' benefits',
										],
									},
								),
							],
						},
					);
				};
			try {
				(BenefitsToggle.displayName = 'BenefitsToggle'),
					(BenefitsToggle.__docgenInfo = {
						description: '',
						displayName: 'BenefitsToggle',
						props: {
							productType: {
								defaultValue: null,
								description: '',
								name: 'productType',
								required: !0,
								type: {
									name: 'enum',
									value: [
										{ value: '"membership"' },
										{ value: '"contributions"' },
										{ value: '"newspaper"' },
										{ value: '"homedelivery"' },
										{ value: '"nationaldelivery"' },
										{ value: '"voucher"' },
										{ value: '"digitalvoucher"' },
										{ value: '"guardianweekly"' },
										{ value: '"digipack"' },
										{ value: '"supporterplus"' },
										{ value: '"tierthree"' },
										{ value: '"guardianadlite"' },
										{ value: '"guardianpatron"' },
									],
								},
							},
							subscriptionPlan: {
								defaultValue: null,
								description: '',
								name: 'subscriptionPlan',
								required: !0,
								type: { name: 'SubscriptionPlan' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/benefits/BenefitsToggle.tsx#BenefitsToggle'
						] = {
							docgenInfo: BenefitsToggle.__docgenInfo,
							name: 'BenefitsToggle',
							path: 'client/components/mma/shared/benefits/BenefitsToggle.tsx#BenefitsToggle',
						});
			} catch (__react_docgen_typescript_loader_error) {}
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
		'./client/components/mma/switch/review/SwitchReview.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					Default: () => Default,
					FromApp: () => FromApp,
					WithDirectDebitPayment: () => WithDirectDebitPayment,
					WithPayPalPayment: () => WithPayPalPayment,
					WithSEPAPayment: () => WithSEPAPayment,
					YearlyOtherCurrency: () => YearlyOtherCurrency,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => SwitchReview_stories,
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
				testProducts = __webpack_require__(
					'./client/fixtures/productBuilder/testProducts.ts',
				),
				productMove = __webpack_require__(
					'./client/fixtures/productMove.ts',
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
				space = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
				),
				palette = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
				),
				mq = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
				),
				Stack = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/stack/Stack.js',
				),
				SvgClock = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgClock.js',
				),
				SvgCreditCard = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgCreditCard.js',
				),
				Button = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/button/Button.js',
				),
				theme_reader_revenue = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/button/theme-reader-revenue.js',
				),
				react = __webpack_require__('./node_modules/react/index.js'),
				react_router = __webpack_require__(
					'./node_modules/react-router/index.js',
				),
				SwitchErrorSummary = __webpack_require__(
					'./client/components/shared/productSwitch/SwitchErrorSummary.tsx',
				),
				productUtils = __webpack_require__(
					'./client/utilities/productUtils.ts',
				),
				dates = __webpack_require__('./shared/dates.ts'),
				ButtonStyles = __webpack_require__(
					'./client/styles/ButtonStyles.ts',
				),
				GenericStyles = __webpack_require__(
					'./client/styles/GenericStyles.ts',
				),
				useAsyncLoader = __webpack_require__(
					'./client/utilities/hooks/useAsyncLoader.ts',
				),
				utils = __webpack_require__('./client/utilities/utils.ts'),
				GenericErrorScreen = __webpack_require__(
					'./client/components/shared/GenericErrorScreen.tsx',
				),
				SwitchPaymentInfo = __webpack_require__(
					'./client/components/shared/productSwitch/SwitchPaymentInfo.tsx',
				),
				_generated_size = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/size.js',
				),
				emotion_react_jsx_runtime_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				),
				SwitchOffsetPaymentIcon = (_ref) => {
					var { size } = _ref;
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						'svg',
						{
							width: size ? _generated_size.EA[size] : void 0,
							height: void 0,
							viewBox: '-3 -3 30 30',
							xmlns: 'http://www.w3.org/2000/svg',
							focusable: !1,
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'path',
									{
										d: 'M11.106 21.91c-3.445 0-6.5-1.745-8.292-4.387l.115-.62.804-.482.62.16c1.493 2.114 3.928 3.515 6.753 3.515 4.525 0 8.246-3.721 8.246-8.292 0-4.548-3.721-8.246-8.246-8.246-2.595 0-4.823 1.148-6.362 2.986l3.33.551v1.149h-5.88l-.436-.437V1.743h1.125l.575 3.469c1.837-2.136 4.547-3.469 7.648-3.469 5.582 0 10.106 4.502 10.106 10.06A10.092 10.092 0 0 1 11.106 21.91Z',
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'path',
									{
										d: 'M10.767 16.524c-.786-.085-1.418-.269-1.896-.55v-1.269c.299.145.62.265.96.359.351.094.718.162 1.103.205l.41-2.972-.436-.141a4.612 4.612 0 0 1-.871-.359 2.354 2.354 0 0 1-.615-.5 2.054 2.054 0 0 1-.372-.704 3.68 3.68 0 0 1-.115-.987c0-.375.064-.721.192-1.037a2.25 2.25 0 0 1 .564-.833c.256-.23.572-.41.948-.538a4.212 4.212 0 0 1 1.332-.192h.077l.167-1.192h.922l-.166 1.269c.299.042.555.102.768.18.214.067.406.144.577.23V8.76a4.834 4.834 0 0 0-.68-.23 5.65 5.65 0 0 0-.845-.18l-.371 2.729.192.05c.35.112.662.236.935.372.282.129.517.295.705.5.188.196.328.436.422.717.103.274.154.615.154 1.025 0 .854-.265 1.538-.794 2.05-.521.504-1.307.764-2.357.782l-.23 1.78h-.923l.243-1.832Zm2.498-2.639c0-.18-.017-.333-.051-.46a.889.889 0 0 0-.18-.36 1.18 1.18 0 0 0-.333-.269 2.645 2.645 0 0 0-.486-.217l-.359 2.677c.478-.051.833-.196 1.063-.436.23-.239.346-.55.346-.935Zm-2.831-4.407c0 .359.077.632.23.82.163.188.453.35.872.487l.013.013.333-2.498c-.47.017-.829.128-1.076.333-.248.205-.372.487-.372.845Z',
									},
								),
							],
						},
					);
				};
			try {
				(SwitchOffsetPaymentIcon.displayName =
					'SwitchOffsetPaymentIcon'),
					(SwitchOffsetPaymentIcon.__docgenInfo = {
						description: '',
						displayName: 'SwitchOffsetPaymentIcon',
						props: {},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/assets/SwitchOffsetPaymentIcon.tsx#SwitchOffsetPaymentIcon'
						] = {
							docgenInfo: SwitchOffsetPaymentIcon.__docgenInfo,
							name: 'SwitchOffsetPaymentIcon',
							path: 'client/components/mma/shared/assets/SwitchOffsetPaymentIcon.tsx#SwitchOffsetPaymentIcon',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var DefaultApiResponseHandler = __webpack_require__(
					'./client/components/mma/shared/asyncComponents/DefaultApiResponseHandler.tsx',
				),
				DefaultLoadingView = __webpack_require__(
					'./client/components/mma/shared/asyncComponents/DefaultLoadingView.tsx',
				),
				BenefitsToggle = __webpack_require__(
					'./client/components/mma/shared/benefits/BenefitsToggle.tsx',
				),
				Card = __webpack_require__(
					'./client/components/mma/shared/Card.tsx',
				),
				Heading = __webpack_require__(
					'./client/components/mma/shared/Heading.tsx',
				),
				PaymentDetails = __webpack_require__(
					'./client/components/mma/shared/PaymentDetails.tsx',
				),
				SupporterPlusTsAndCs = __webpack_require__(
					'./client/components/mma/shared/SupporterPlusTsAndCs.tsx',
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
			var newAmountCss = (0, emotion_react_browser_esm.iv)(
					typography.Rcn,
					';padding-top:',
					space.D[3],
					'px;margin-top:',
					space.D[4],
					'px;margin-bottom:0;border-top:1px solid ',
					palette.palette.neutral[86],
					';',
					'',
				),
				buttonLayoutCss = (0, emotion_react_browser_esm.iv)(
					'display:flex;flex-direction:column;margin-top:',
					space.D[5],
					'px;padding-top:32px;border-top:1px solid ',
					palette.palette.neutral[86],
					';>*+*{margin-top:',
					space.D[3],
					'px;}',
					mq.Dp.tablet,
					'{flex-direction:row;>*+*{margin-top:0;margin-left:',
					space.D[3],
					'px;}}',
					'',
				),
				scrollToErrorMessage = () => {
					var errorMessageElement = document.getElementById(
						'productSwitchErrorMessage',
					);
					null == errorMessageElement ||
						errorMessageElement.scrollIntoView();
				},
				SwitchReview = () => {
					var navigate = (0, react_router.s0)(),
						routerState = (0, react_router.TH)().state,
						[isSwitching, setIsSwitching] = (0, react.useState)(!1),
						[switchingError, setSwitchingError] = (0,
						react.useState)(!1),
						switchContext = (0, react.useContext)(
							SwitchContainer.w,
						),
						{
							contributionToSwitch,
							mainPlan,
							monthlyOrAnnual,
							supporterPlusTitle,
							thresholds,
						} = switchContext,
						inPaymentFailure = !!contributionToSwitch.alertText,
						{
							thresholdForBillingPeriod: threshold,
							isAboveThreshold,
						} = thresholds,
						newAmount = Math.max(threshold, mainPlan.price / 100),
						confirmSwitch = (function () {
							var _ref = (function _asyncToGenerator(fn) {
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
							})(function* (amount) {
								if (!isSwitching) {
									if (inPaymentFailure)
										return (
											setSwitchingError(!0),
											void scrollToErrorMessage()
										);
									try {
										setIsSwitching(!0);
										var response = yield (0,
										productUtils.iY)(
											contributionToSwitch.subscription
												.subscriptionId,
											newAmount,
											'recurring-contribution-to-supporter-plus',
											!1,
											contributionToSwitch.isTestUser,
										);
										null ===
										(yield (0,
										DefaultApiResponseHandler.xJ)(response))
											? (setIsSwitching(!1),
											  setSwitchingError(!0),
											  scrollToErrorMessage())
											: navigate('../complete', {
													state: _objectSpread(
														_objectSpread(
															{},
															routerState,
														),
														{},
														{
															amountPayableToday:
																amount,
															nextPaymentDate,
															switchHasCompleted:
																!0,
														},
													),
											  });
									} catch (_unused) {
										setIsSwitching(!1),
											setSwitchingError(!0),
											scrollToErrorMessage();
									}
								}
							});
							return function confirmSwitch(_x) {
								return _ref.apply(this, arguments);
							};
						})(),
						{ data: previewResponse, loadingState } = (0,
						useAsyncLoader.c)(
							() =>
								(0, productUtils.iY)(
									contributionToSwitch.subscription
										.subscriptionId,
									newAmount,
									'recurring-contribution-to-supporter-plus',
									!0,
									contributionToSwitch.isTestUser,
								),
							DefaultApiResponseHandler.xJ,
						);
					if (loadingState == useAsyncLoader.G.HasError)
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							GenericErrorScreen.c,
							{},
						);
					if (loadingState == useAsyncLoader.G.IsLoading)
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							DefaultLoadingView.I,
							{},
						);
					if (null === previewResponse)
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							react_router.Fg,
							{ to: '/' },
						);
					var nextPaymentDate = (0, dates.ur)(
						new Date(previewResponse.nextPaymentDate),
						'd MMMM',
					);
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
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
															sansSerif: !0,
															children:
																'Review change',
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
																isAboveThreshold
																	? "Please confirm your choice to get exclusive supporter extras. You'll still pay "
																			.concat(
																				mainPlan.currency,
																			)
																			.concat(
																				(0,
																				utils.dN)(
																					newAmount,
																				),
																				' per ',
																			)
																			.concat(
																				mainPlan.billingPeriod,
																				'.',
																			)
																	: 'Please confirm your choice to change your support to '.concat(
																			monthlyOrAnnual.toLowerCase(),
																			' + extras.',
																	  ),
														},
													),
												],
											},
										),
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
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
															sansSerif: !0,
															children:
																'Your new support',
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
																				.brand[500],
																		children:
																			(0,
																			emotion_react_jsx_runtime_browser_esm.tZ)(
																				'h3',
																				{
																					css: GenericStyles.Ai,
																					children:
																						supporterPlusTitle,
																				},
																			),
																	},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	Card.Z
																		.Section,
																	{
																		children:
																			[
																				(0,
																				emotion_react_jsx_runtime_browser_esm.BX)(
																					'p',
																					{
																						css: (0,
																						emotion_react_browser_esm.iv)(
																							typography.Kz0,
																							';margin:0;max-width:40ch;',
																							'',
																						),
																						children:
																							[
																								monthlyOrAnnual,
																								' support with exclusive extras, including full access to our app and ad-free reading',
																							],
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					BenefitsToggle.r,
																					{
																						productType:
																							'supporterplus',
																						subscriptionPlan:
																							mainPlan,
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.BX)(
																					'p',
																					{
																						css: newAmountCss,
																						children:
																							[
																								mainPlan.currency,
																								(0,
																								utils.dN)(
																									newAmount,
																								),
																								'/',
																								mainPlan.billingPeriod,
																							],
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
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'section',
									{
										css: GenericStyles.zC,
										children: (0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											Stack.K,
											{
												space: 4,
												children: [
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														Heading.X,
														{
															sansSerif: !0,
															children:
																'What happens next?',
														},
													),
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'ul',
														{
															css: [
																GenericStyles.Yd,
																GenericStyles.lA,
																'',
																'',
															],
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'li',
																	{
																		children:
																			[
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					SvgClock.h,
																					{
																						size: 'medium',
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.BX)(
																					'span',
																					{
																						children:
																							[
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									'strong',
																									{
																										children:
																											'This change will happen today',
																									},
																								),
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									'br',
																									{},
																								),
																								"In just a couple of steps, you'll be able to start enjoying your exclusive extras",
																								' ',
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
																		css: (0,
																		emotion_react_browser_esm.iv)(
																			'color:',
																			palette
																				.palette
																				.success[400],
																			';',
																			'',
																		),
																		children:
																			[
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					SwitchOffsetPaymentIcon,
																					{
																						size: 'medium',
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					'span',
																					{
																						children:
																							(0,
																							emotion_react_jsx_runtime_browser_esm.tZ)(
																								SwitchPaymentInfo.X,
																								{
																									amountPayableToday:
																										previewResponse.amountPayableToday,
																									alreadyPayingAboveThreshold:
																										isAboveThreshold,
																									currencySymbol:
																										mainPlan.currency,
																									supporterPlusPurchaseAmount:
																										previewResponse.supporterPlusPurchaseAmount,
																									billingPeriod:
																										mainPlan.billingPeriod,
																									nextPaymentDate,
																								},
																							),
																					},
																				),
																			],
																	},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'li',
																	{
																		children:
																			[
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					SvgCreditCard.n,
																					{
																						size: 'medium',
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.BX)(
																					'span',
																					{
																						children:
																							[
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									'strong',
																									{
																										children:
																											'Your payment method',
																									},
																								),
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									'br',
																									{},
																								),
																								'We will take payment as before, from',
																								' ',
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									PaymentDetails.g,
																									{
																										subscription:
																											contributionToSwitch.subscription,
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
												],
											},
										),
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'section',
									{
										css: buttonLayoutCss,
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												Button.z,
												{
													theme: theme_reader_revenue.gk,
													isLoading: isSwitching,
													cssOverrides:
														ButtonStyles._8,
													onClick: () =>
														confirmSwitch(
															previewResponse.amountPayableToday,
														),
													children: [
														'Confirm ',
														isAboveThreshold
															? 'change'
															: 'upgrade',
													],
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												Button.z,
												{
													priority: 'tertiary',
													cssOverrides: [
														ButtonStyles._8,
														ButtonStyles.zN,
													],
													onClick: () =>
														navigate('..', {
															state: routerState,
														}),
													children: 'Back',
												},
											),
										],
									},
								),
								switchingError &&
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'section',
										{
											css: GenericStyles.zC,
											id: 'productSwitchErrorMessage',
											children: (0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												SwitchErrorSummary.r,
												{ inPaymentFailure },
											),
										},
									),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'section',
									{
										css: GenericStyles.zC,
										children: (0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											SupporterPlusTsAndCs.I,
											{
												currencyISO:
													mainPlan.currencyISO,
												billingPeriod:
													mainPlan.billingPeriod,
											},
										),
									},
								),
							],
						},
					);
				};
			const SwitchReview_stories = {
				title: 'Pages/SwitchReview',
				component: SwitchContainer.x,
				decorators: [ReactRouterDecorator.R],
				parameters: {
					layout: 'fullscreen',
					reactRouter: {
						container: (0,
						emotion_react_jsx_runtime_browser_esm.tZ)(
							SwitchContainer.x,
							{},
						),
					},
					msw: [
						http.d.post('/api/product-move/*', () =>
							HttpResponse.Z.json(productMove.H),
						),
					],
				},
			};
			var Default = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							SwitchReview,
							{},
						),
					parameters: {
						reactRouter: {
							state: { productDetail: (0, testProducts.ZY)() },
						},
					},
				},
				WithPayPalPayment = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							SwitchReview,
							{},
						),
					parameters: {
						reactRouter: {
							state: { productDetail: (0, testProducts.uH)() },
						},
					},
				},
				WithDirectDebitPayment = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							SwitchReview,
							{},
						),
					parameters: {
						reactRouter: {
							state: { productDetail: (0, testProducts.az)() },
						},
					},
				},
				WithSEPAPayment = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							SwitchReview,
							{},
						),
					parameters: {
						reactRouter: {
							state: { productDetail: (0, testProducts.AD)() },
						},
					},
				},
				YearlyOtherCurrency = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							SwitchReview,
							{},
						),
					parameters: {
						reactRouter: {
							state: {
								productDetail: (0, testProducts.v_)('NZD'),
							},
						},
					},
				},
				FromApp = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							SwitchReview,
							{},
						),
					parameters: {
						reactRouter: {
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								SwitchContainer.x,
								{ isFromApp: !0 },
							),
							state: { productDetail: (0, testProducts.ZY)() },
						},
					},
				};
			(Default.parameters = {
				...Default.parameters,
				docs: {
					...Default.parameters?.docs,
					source: {
						originalSource:
							'{\n  render: () => <SwitchReview />,\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: contributionPaidByCard()\n      }\n    }\n  }\n}',
						...Default.parameters?.docs?.source,
					},
				},
			}),
				(WithPayPalPayment.parameters = {
					...WithPayPalPayment.parameters,
					docs: {
						...WithPayPalPayment.parameters?.docs,
						source: {
							originalSource:
								'{\n  render: () => <SwitchReview />,\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: contributionPaidByPayPal()\n      }\n    }\n  }\n}',
							...WithPayPalPayment.parameters?.docs?.source,
						},
					},
				}),
				(WithDirectDebitPayment.parameters = {
					...WithDirectDebitPayment.parameters,
					docs: {
						...WithDirectDebitPayment.parameters?.docs,
						source: {
							originalSource:
								'{\n  render: () => <SwitchReview />,\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: contributionPaidByDirectDebit()\n      }\n    }\n  }\n}',
							...WithDirectDebitPayment.parameters?.docs?.source,
						},
					},
				}),
				(WithSEPAPayment.parameters = {
					...WithSEPAPayment.parameters,
					docs: {
						...WithSEPAPayment.parameters?.docs,
						source: {
							originalSource:
								'{\n  render: () => <SwitchReview />,\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: contributionPaidBySepa()\n      }\n    }\n  }\n}',
							...WithSEPAPayment.parameters?.docs?.source,
						},
					},
				}),
				(YearlyOtherCurrency.parameters = {
					...YearlyOtherCurrency.parameters,
					docs: {
						...YearlyOtherCurrency.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => <SwitchReview />,\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: annualContributionPaidByCardWithCurrency('NZD')\n      }\n    }\n  }\n}",
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
								'{\n  render: () => <SwitchReview />,\n  parameters: {\n    reactRouter: {\n      container: <SwitchContainer isFromApp={true} />,\n      state: {\n        productDetail: contributionPaidByCard()\n      }\n    }\n  }\n}',
							...FromApp.parameters?.docs?.source,
						},
					},
				});
			const __namedExportsOrder = [
				'Default',
				'WithPayPalPayment',
				'WithDirectDebitPayment',
				'WithSEPAPayment',
				'YearlyOtherCurrency',
				'FromApp',
			];
		},
	},
]);
//# sourceMappingURL=components-mma-switch-review-SwitchReview-stories.ff1cdabc.iframe.bundle.js.map
