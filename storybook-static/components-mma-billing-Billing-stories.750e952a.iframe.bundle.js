'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[6956],
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
		'./client/components/mma/shared/PaypalDisplay.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				N: () => getObfuscatedPayPalId,
				O: () => PaypalDisplay,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_assets_PaypalLogo__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./client/components/mma/shared/assets/PaypalLogo.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				SPLIT_PAYPAL_ID_REGEX = /^(.)(.*?)(.?|.?@.+)$/,
				getObfuscatedPayPalId = (rawId) =>
					rawId.replace(
						SPLIT_PAYPAL_ID_REGEX,
						(_, firstChar, remainingChars, lastChar) =>
							''
								.concat(firstChar)
								.concat(remainingChars.replace(/./g, '*'))
								.concat(lastChar),
					),
				PaypalDisplay = (props) => {
					var layoutCss = (0,
					_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
						props.inline &&
							'\n\t\t\tdisplay: flex;\n\t\t\talign-items: center;\n\t\t\tsvg {\n\t\t\t\tflex-shrink: 0;\n\t\t\t\tmargin-right: 0.5ch;\n\t\t\t}\n\t\t',
						' p{overflow:hidden;text-overflow:ellipsis;margin:0;}',
						'',
					);
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
						'div',
						{
							css: layoutCss,
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
									_assets_PaypalLogo__WEBPACK_IMPORTED_MODULE_2__.D,
									{},
								),
								props.payPalId &&
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
										'p',
										{
											children: [
												props.shouldIncludePrefixCopy &&
													(0,
													_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
														_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.HY,
														{
															children: [
																'To update your payment details, please login to your PayPal account.',
																(0,
																_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
																	'br',
																	{},
																),
																'Your PayPal ID is ',
															],
														},
													),
												getObfuscatedPayPalId(
													props.payPalId,
												),
											],
										},
									),
							],
						},
					);
				};
			try {
				(getObfuscatedPayPalId.displayName = 'getObfuscatedPayPalId'),
					(getObfuscatedPayPalId.__docgenInfo = {
						description: '',
						displayName: 'getObfuscatedPayPalId',
						props: {},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/PaypalDisplay.tsx#getObfuscatedPayPalId'
						] = {
							docgenInfo: getObfuscatedPayPalId.__docgenInfo,
							name: 'getObfuscatedPayPalId',
							path: 'client/components/mma/shared/PaypalDisplay.tsx#getObfuscatedPayPalId',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(PaypalDisplay.displayName = 'PaypalDisplay'),
					(PaypalDisplay.__docgenInfo = {
						description: '',
						displayName: 'PaypalDisplay',
						props: {
							payPalId: {
								defaultValue: null,
								description: '',
								name: 'payPalId',
								required: !1,
								type: { name: 'string' },
							},
							shouldIncludePrefixCopy: {
								defaultValue: null,
								description: '',
								name: 'shouldIncludePrefixCopy',
								required: !1,
								type: { name: 'true' },
							},
							inline: {
								defaultValue: null,
								description: '',
								name: 'inline',
								required: !1,
								type: { name: 'true' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/PaypalDisplay.tsx#PaypalDisplay'
						] = {
							docgenInfo: PaypalDisplay.__docgenInfo,
							name: 'PaypalDisplay',
							path: 'client/components/mma/shared/PaypalDisplay.tsx#PaypalDisplay',
						});
			} catch (__react_docgen_typescript_loader_error) {}
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
		'./client/components/mma/billing/Billing.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					NoSubscription: () => NoSubscription,
					WithSubscriptions: () => WithSubscriptions,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => Billing_stories,
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
				featureSwitches = __webpack_require__(
					'./shared/featureSwitches.ts',
				),
				inAppPurchase = __webpack_require__(
					'./client/fixtures/inAppPurchase.ts',
				),
				testProducts = __webpack_require__(
					'./client/fixtures/productBuilder/testProducts.ts',
				),
				guardianWeeklyCardInvoice = {
					invoiceId: '',
					subscriptionName: (0, testProducts.X8)().subscription
						.subscriptionId,
					date: '2021-12-10',
					pdfPath: '',
					price: 135,
					paymentMethod: 'Card',
					last4: '4242',
					hasMultipleSubs: !1,
				},
				mdapiResponse = __webpack_require__(
					'./client/fixtures/mdapiResponse.ts',
				),
				user = __webpack_require__('./client/fixtures/user.ts'),
				emotion_react_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
				),
				typography = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
				),
				mq = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
				),
				palette = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
				),
				space = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
				),
				lodash = __webpack_require__('./node_modules/lodash/lodash.js'),
				react = __webpack_require__('./node_modules/react/index.js'),
				dates = __webpack_require__('./shared/dates.ts'),
				shared_mpapiResponse = __webpack_require__(
					'./shared/mpapiResponse.ts',
				),
				productResponse = __webpack_require__(
					'./shared/productResponse.ts',
				),
				productTypes = __webpack_require__('./shared/productTypes.ts'),
				fetch = __webpack_require__('./client/utilities/fetch.ts'),
				useAsyncLoader = __webpack_require__(
					'./client/utilities/hooks/useAsyncLoader.ts',
				),
				productUtils = __webpack_require__(
					'./client/utilities/productUtils.ts',
				),
				GenericErrorScreen = __webpack_require__(
					'./client/components/shared/GenericErrorScreen.tsx',
				),
				NavConfig = __webpack_require__(
					'./client/components/shared/nav/NavConfig.tsx',
				),
				EmptyAccountOverview = __webpack_require__(
					'./client/components/mma/accountoverview/EmptyAccountOverview.tsx',
				),
				SixForSixExplainer = __webpack_require__(
					'./client/components/mma/accountoverview/SixForSixExplainer.tsx',
				),
				Page = __webpack_require__('./client/components/mma/Page.tsx'),
				ErrorIcon = __webpack_require__(
					'./client/components/mma/shared/assets/ErrorIcon.tsx',
				),
				GiftIcon = __webpack_require__(
					'./client/components/mma/shared/assets/GiftIcon.tsx',
				),
				DefaultApiResponseHandler = __webpack_require__(
					'./client/components/mma/shared/asyncComponents/DefaultApiResponseHandler.tsx',
				),
				DefaultLoadingView = __webpack_require__(
					'./client/components/mma/shared/asyncComponents/DefaultLoadingView.tsx',
				),
				BasicProductInfoTable = __webpack_require__(
					'./client/components/mma/shared/BasicProductInfoTable.tsx',
				),
				Buttons = __webpack_require__(
					'./client/components/mma/shared/Buttons.tsx',
				),
				NextPaymentDetails = __webpack_require__(
					'./client/components/mma/shared/NextPaymentDetails.tsx',
				),
				PaymentDetailsTable = __webpack_require__(
					'./client/components/mma/shared/PaymentDetailsTable.tsx',
				),
				PaymentFailureAlertIfApplicable = __webpack_require__(
					'./client/components/mma/shared/PaymentFailureAlertIfApplicable.tsx',
				),
				analytics = __webpack_require__(
					'./client/utilities/analytics.ts',
				),
				emotion_react_jsx_runtime_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				),
				DownloadIcon = () =>
					(0, emotion_react_jsx_runtime_browser_esm.tZ)('svg', {
						viewBox: '0 0 22 20',
						width: '22',
						height: '20',
						fill: 'none',
						children: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							'path',
							{
								fillRule: 'evenodd',
								clipRule: 'evenodd',
								d: 'M15.5749 5.99998L16.4749 6.87498L11.35 12H10.65L5.54998 6.87498L6.42498 5.99998L9.99997 8.72497V0H12V8.72497L15.5749 5.99998ZM19.9999 9.99997L20.9999 8.99997H21.9999V18.9749L20.9749 19.9999H0.974997L0 18.9749V8.99997H0.999997L1.99999 9.99997V17.9999H19.9999V9.99997Z',
								fill: '#052962',
							},
						),
					}),
				CardDisplay = __webpack_require__(
					'./client/components/mma/shared/CardDisplay.tsx',
				),
				DirectDebitDisplay = __webpack_require__(
					'./client/components/mma/shared/DirectDebitDisplay.tsx',
				),
				colour_palette = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__deprecated__/colour/palette.js',
				),
				SvgChevronLeftSingle = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgChevronLeftSingle.js',
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
						children: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							'path',
							{
								fillRule: 'evenodd',
								clipRule: 'evenodd',
								d: 'm7.232 1-.982.957L14.632 12 6.25 22.044l.982.956 10.471-10.471V11.47z',
								fill: theme?.fill,
							},
						),
					}),
				SvgChevronRightSingle = ({
					size,
					theme,
					isAnnouncedByScreenReader = !1,
				}) =>
					(0, emotion_react_jsx_runtime_browser_esm.BX)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
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
												children: 'Chevron right',
											},
									  )
									: '',
							],
						},
					);
			var PaginationContext = (0, react.createContext)({
					currentPageNumber: 1,
					setCurrentPageNumber: () => {},
					onDirectUpdate: () => {},
				}),
				_ref = {
					name: 'nncnni',
					styles: 'width:18px;height:18px;margin-bottom:2px',
				},
				_ref2 = {
					name: '1uoamx5',
					styles: 'display:flex;align-items:center;cursor:pointer',
				},
				_ref3 = {
					name: 'nncnni',
					styles: 'width:18px;height:18px;margin-bottom:2px',
				},
				_ref4 = {
					name: '1uoamx5',
					styles: 'display:flex;align-items:center;cursor:pointer',
				},
				_ref5 = {
					name: '1pf6vuu',
					styles: 'text-align:center;width:26px',
				},
				Pagination = (props) => {
					var numberOfPages = Math.ceil(
							props.numberOfResults / props.resultsPerPage,
						),
						numberOfResultsToShowBeforeEllipsis =
							props.numberOfResultsToShowBeforeEllipsis || 3,
						[currentResults, setCurrentResults] = (0,
						react.useState)(
							[
								...Array(
									Math.min(
										numberOfPages,
										numberOfResultsToShowBeforeEllipsis - 1,
									) + 2,
								).keys(),
							].slice(1),
						);
					(0, react.useEffect)(() => {
						var rangeTotal =
								props.currentPage <=
									numberOfResultsToShowBeforeEllipsis ||
								props.currentPage >
									numberOfPages -
										numberOfResultsToShowBeforeEllipsis
									? numberOfResultsToShowBeforeEllipsis - 1
									: numberOfResultsToShowBeforeEllipsis - 2,
							rangeStartNumber =
								props.currentPage <=
								numberOfResultsToShowBeforeEllipsis
									? numberOfResultsToShowBeforeEllipsis - 1
									: Math.min(
											props.currentPage,
											numberOfPages -
												(numberOfResultsToShowBeforeEllipsis -
													1),
									  );
						setCurrentResults(
							[...Array(rangeTotal).keys()]
								.map(
									(pageNumber) =>
										pageNumber + rangeStartNumber,
								)
								.filter((pageNum) => pageNum <= numberOfPages),
						);
					}, [
						props.currentPage,
						numberOfPages,
						numberOfResultsToShowBeforeEllipsis,
					]);
					var shouldShowPrev = props.currentPage > 1,
						shouldShowLeftSideEllipsis =
							props.currentPage >
							numberOfResultsToShowBeforeEllipsis,
						shouldShowRightSideEllipsis =
							props.currentPage <=
							numberOfPages - numberOfResultsToShowBeforeEllipsis,
						shouldShowLastPageNumber =
							numberOfPages > numberOfResultsToShowBeforeEllipsis,
						shouldShowNext = props.currentPage < numberOfPages,
						ellipsisCss = _ref5;
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						PaginationContext.Provider,
						{
							value: {
								currentPageNumber: props.currentPage,
								setCurrentPageNumber: props.setCurrentPage,
								onDirectUpdate: props.onDirectUpdate,
							},
							children: (0,
							emotion_react_jsx_runtime_browser_esm.BX)('div', {
								css: (0, emotion_react_browser_esm.iv)(
									'display:flex;',
									typography.Kz0,
									';color:',
									colour_palette.n$[46],
									';>span{margin-right:',
									space.D[3],
									'px;}',
									props.additionalCSS,
									';',
									'',
								),
								children: [
									shouldShowPrev &&
										(0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											'span',
											{
												css: _ref4,
												onClick: (event) => {
													event.preventDefault();
													var newPageNumber =
														props.currentPage - 1;
													props.onDirectUpdate(
														newPageNumber,
													),
														props.setCurrentPage(
															newPageNumber,
														);
												},
												children: [
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'span',
														{
															css: _ref3,
															children: (0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																SvgChevronLeftSingle.S,
																{},
															),
														},
													),
													'Prev',
												],
											},
										),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										emotion_react_jsx_runtime_browser_esm.HY,
										{
											children: (0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												PaginationNumberItem,
												{ paginationNumber: 1 },
											),
										},
									),
									shouldShowLeftSideEllipsis &&
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'span',
											{
												css: ellipsisCss,
												children: '...',
											},
										),
									currentResults.map((resultPage) =>
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											PaginationNumberItem,
											{ paginationNumber: resultPage },
											resultPage,
										),
									),
									shouldShowRightSideEllipsis &&
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'span',
											{
												css: ellipsisCss,
												children: '...',
											},
										),
									shouldShowLastPageNumber &&
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											PaginationNumberItem,
											{ paginationNumber: numberOfPages },
										),
									shouldShowNext &&
										(0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											'span',
											{
												css: _ref2,
												onClick: (event) => {
													event.preventDefault();
													var newPageNumber =
														props.currentPage + 1;
													props.onDirectUpdate(
														newPageNumber,
													),
														props.setCurrentPage(
															newPageNumber,
														);
												},
												children: [
													'Next',
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'span',
														{
															css: _ref,
															children: (0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																SvgChevronRightSingle,
																{},
															),
														},
													),
												],
											},
										),
								],
							}),
						},
					);
				},
				PaginationNumberItem = (props) => {
					var {
							currentPageNumber,
							setCurrentPageNumber,
							onDirectUpdate,
						} = (0, react.useContext)(PaginationContext),
						isSelectedPage =
							currentPageNumber === props.paginationNumber,
						paginationNumberCss = (0, emotion_react_browser_esm.iv)(
							'width:26px;height:26px;line-height:26px;text-align:center;border-radius:50%;cursor:pointer;border:1px solid transparent;transition:border-color 0.2s,background-color 0.2s;:hover{border-color:',
							colour_palette.n$[46],
							';}background-color:',
							isSelectedPage
								? colour_palette.n$[46]
								: 'transparent',
							';color:',
							isSelectedPage
								? colour_palette.n$[100]
								: colour_palette.n$[46],
							';',
							'',
						);
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						'span',
						{
							css: paginationNumberCss,
							onClick: (event) => {
								event.preventDefault(),
									onDirectUpdate(props.paginationNumber),
									setCurrentPageNumber(
										props.paginationNumber,
									);
							},
							children: props.paginationNumber,
						},
					);
				};
			try {
				(Pagination.displayName = 'Pagination'),
					(Pagination.__docgenInfo = {
						description: '',
						displayName: 'Pagination',
						props: {
							numberOfResults: {
								defaultValue: null,
								description: '',
								name: 'numberOfResults',
								required: !0,
								type: { name: 'number' },
							},
							resultsPerPage: {
								defaultValue: null,
								description: '',
								name: 'resultsPerPage',
								required: !0,
								type: { name: 'number' },
							},
							currentPage: {
								defaultValue: null,
								description: '',
								name: 'currentPage',
								required: !0,
								type: { name: 'number' },
							},
							setCurrentPage: {
								defaultValue: null,
								description: '',
								name: 'setCurrentPage',
								required: !0,
								type: {
									name: 'Dispatch<SetStateAction<number>>',
								},
							},
							onDirectUpdate: {
								defaultValue: null,
								description: '',
								name: 'onDirectUpdate',
								required: !0,
								type: {
									name: '(newPageNumber: number) => void',
								},
							},
							numberOfResultsToShowBeforeEllipsis: {
								defaultValue: null,
								description: '',
								name: 'numberOfResultsToShowBeforeEllipsis',
								required: !1,
								type: { name: 'number' },
							},
							additionalCSS: {
								defaultValue: null,
								description: '',
								name: 'additionalCSS',
								required: !1,
								type: { name: 'SerializedStyles' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/Pagination.tsx#Pagination'
						] = {
							docgenInfo: Pagination.__docgenInfo,
							name: 'Pagination',
							path: 'client/components/mma/shared/Pagination.tsx#Pagination',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var PaypalDisplay = __webpack_require__(
					'./client/components/mma/shared/PaypalDisplay.tsx',
				),
				SepaDisplay = __webpack_require__(
					'./client/components/mma/shared/SepaDisplay.tsx',
				),
				SvgChevronDownSingle = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgChevronDownSingle.js',
				);
			var InvoiceTableYearSelect_ref = {
					name: '14j3nip',
					styles: 'pointer-events:none;position:absolute;right:0;top:50%;transform:translateY(-50%);width:18px;height:18px',
				},
				InvoiceTableYearSelect_ref2 = {
					name: 'j5hq9j',
					styles: 'padding:8px 0;line-height:30px',
				},
				InvoiceTableYearSelect = (props) => {
					var selectCss = (0, emotion_react_browser_esm.iv)(
						typography.fy7,
						';color:',
						palette.palette.neutral[7],
						';display:block;padding:0 ',
						space.D[5],
						'px 0 10px;margin:0;box-sizing:border-box;border:none;-moz-appearance:none;-webkit-appearance:none;appearance:none;background-color:transparent;',
						mq.C4.tablet,
						'{font-size:1.0625rem;line-height:1.6;}::-ms-expand{display:none;}',
						'',
					);
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						'div',
						{
							css: (0, emotion_react_browser_esm.iv)(
								'position:relative;display:inline-block;border-left:1px solid ',
								palette.palette.neutral[86],
								';',
								'',
							),
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'select',
									{
										css: selectCss,
										onChange: (event) => {
											if (
												event.target.value !==
												props.selectedYear
											) {
												var _newYear =
													event.target.value;
												props.setSelectedYear(_newYear),
													props.onDirectUpdate(
														_newYear,
													),
													(0, analytics.L9)({
														eventCategory:
															'invoice',
														eventAction: 'click',
														eventLabel:
															'invoice_year_select',
													});
											}
										},
										value: props.selectedYear,
										children: props.years.map((year) =>
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'option',
												{
													value: year,
													css: InvoiceTableYearSelect_ref2,
													children: year,
												},
												'year-'.concat(year),
											),
										),
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'div',
									{
										css: InvoiceTableYearSelect_ref,
										children: (0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											SvgChevronDownSingle.z,
											{},
										),
									},
								),
							],
						},
					);
				};
			try {
				(InvoiceTableYearSelect.displayName = 'InvoiceTableYearSelect'),
					(InvoiceTableYearSelect.__docgenInfo = {
						description: '',
						displayName: 'InvoiceTableYearSelect',
						props: {
							years: {
								defaultValue: null,
								description: '',
								name: 'years',
								required: !0,
								type: { name: 'string[]' },
							},
							selectedYear: {
								defaultValue: null,
								description: '',
								name: 'selectedYear',
								required: !0,
								type: { name: 'string' },
							},
							setSelectedYear: {
								defaultValue: null,
								description: '',
								name: 'setSelectedYear',
								required: !0,
								type: {
									name: 'Dispatch<SetStateAction<string>>',
								},
							},
							onDirectUpdate: {
								defaultValue: null,
								description: '',
								name: 'onDirectUpdate',
								required: !0,
								type: { name: '(newYear: string) => void' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/billing/InvoiceTableYearSelect.tsx#InvoiceTableYearSelect'
						] = {
							docgenInfo: InvoiceTableYearSelect.__docgenInfo,
							name: 'InvoiceTableYearSelect',
							path: 'client/components/mma/billing/InvoiceTableYearSelect.tsx#InvoiceTableYearSelect',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var invoicePaymentMethods_CARD = 'card',
				invoicePaymentMethods_DIRECT_DEBIT = 'directdebit',
				invoicePaymentMethods_PAYPAL = 'paypal',
				invoicePaymentMethods_SEPA = 'sepa',
				InvoicesTable_ref = { name: 'ti75j2', styles: 'margin:0' },
				InvoicesTable = (props) => {
					var [
							trackingPaginationInteractionCount,
							setTrackingPaginationInteractionCount,
						] = (0, react.useState)(1),
						[currentPage, setCurrentPage] = (0, react.useState)(1),
						tableHeadings = ['Date', 'Payment method', 'Price', ''],
						invoiceYears = [
							...new Set(
								[...props.invoiceData].map((invoice) =>
									''.concat(
										(0, dates.sG)(
											invoice.date,
										).date.getFullYear(),
									),
								),
							),
						],
						[currentInvoiceYear, setCurrentInvoiceYear] = (0,
						react.useState)(invoiceYears[0]),
						[currentPaginationPage, setCurrentPaginationPage] = (0,
						react.useState)(1),
						tableCss2 = (0, emotion_react_browser_esm.iv)(
							'display:block;width:100%;border:1px solid ',
							palette.palette.neutral[86],
							';',
							mq.Dp.tablet,
							'{display:table;}',
							'',
						),
						tableHeaderCss2 = (0, emotion_react_browser_esm.iv)(
							'display:block;',
							mq.Dp.tablet,
							'{display:table-header-group;}',
							'',
						),
						tableBodyCss2 = (0, emotion_react_browser_esm.iv)(
							'display:block;',
							mq.Dp.tablet,
							'{display:table-row-group;}',
							'',
						),
						invoiceYearSelectCss = (0,
						emotion_react_browser_esm.iv)(
							'display:none;padding:',
							space.D[3],
							'px;background-color:',
							palette.palette.neutral[97],
							';border-bottom:1px solid ',
							palette.palette.neutral[86],
							';',
							mq.Dp.tablet,
							'{display:table-cell;padding:',
							space.D[5],
							'px ',
							space.D[5],
							'px ',
							space.D[5],
							'px 0;}',
							'',
						),
						tableTitleCss2 = (0, emotion_react_browser_esm.iv)(
							'display:table-cell;',
							typography.fy7,
							';padding:',
							space.D[5],
							'px;background-color:',
							palette.palette.neutral[97],
							';border-bottom:1px solid ',
							palette.palette.neutral[86],
							';',
							mq.C4.tablet,
							'{margin:0;padding:',
							space.D[3],
							'px;font-size:1.0625rem;line-height:1.6;border-bottom:0;display:block;}',
							'',
						),
						thCss2 = (0, emotion_react_browser_esm.iv)(
							'display:table-cell;text-align:left;',
							typography.Rcn,
							';padding:',
							space.D[5],
							'px;',
							mq.C4.tablet,
							'{padding:',
							space.D[3],
							'px;}',
							'',
						),
						tableHeadingsRowCss2 = (0,
						emotion_react_browser_esm.iv)(
							'display:none;',
							mq.Dp.tablet,
							'{display:table-row;}',
							'',
						),
						tableRowCss2 = (0, emotion_react_browser_esm.iv)(
							'display:block;',
							mq.Dp.tablet,
							'{display:table-row;}',
							'',
						),
						tdCss2 = (rowIndex, title) =>
							(0, emotion_react_browser_esm.iv)(
								'display:block;',
								typography.Kz0,
								';padding:',
								space.D[3],
								'px ',
								space.D[3],
								'px 0;:last-of-type{padding:',
								space.D[3],
								'px;',
								mq.C4.tablet,
								'{border-bottom:1px solid ',
								palette.palette.neutral[86],
								';}}:before{display:',
								title ? 'inline-block' : 'none',
								';width:calc(60% - ',
								space.D[3],
								'px);padding-right:',
								space.D[3],
								'px;',
								typography.Rcn,
								";content:'",
								title,
								"';}",
								mq.Dp.tablet,
								'{display:table-cell;width:auto;padding:',
								space.D[5],
								'px;margin:0;border-top:1px solid ',
								palette.palette.neutral[86],
								';background-color:',
								rowIndex % 2 == 0
									? palette.palette.neutral[97]
									: 'transparent',
								";:before{display:none;content:'';}}",
								'',
							),
						paymentDetailsHolderCss = (0,
						emotion_react_browser_esm.iv)(
							'display:inline-block;width:calc(40% + ',
							space.D[3],
							'px);',
							mq.Dp.tablet,
							'{width:auto;min-width:15ch;}',
							'',
						),
						invoiceLinkCss = (0, emotion_react_browser_esm.iv)(
							'color:',
							palette.palette.brand[400],
							';font-weight:bold;',
							'',
						),
						invoiceDownloadLinkCss = (0,
						emotion_react_browser_esm.iv)(
							'display:inline-block;width:22px;margin-left:',
							space.D[6],
							'px;',
							'',
						);
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'div',
									{
										css: tableCss2,
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'header',
												{
													css: tableHeaderCss2,
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															'div',
															{
																css: tableRowCss2,
																children: [
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'h2',
																		{
																			css: tableTitleCss2,
																			children:
																				'Invoices',
																		},
																	),
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'div',
																		{
																			css: (0,
																			emotion_react_browser_esm.iv)(
																				'display:none;background-color:',
																				palette
																					.palette
																					.neutral[97],
																				';border-bottom:1px solid ',
																				palette
																					.palette
																					.neutral[86],
																				';',
																				mq
																					.Dp
																					.tablet,
																				'{display:table-cell;}',
																				'',
																			),
																		},
																	),
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'div',
																		{
																			css: (0,
																			emotion_react_browser_esm.iv)(
																				'display:none;background-color:',
																				palette
																					.palette
																					.neutral[97],
																				';border-bottom:1px solid ',
																				palette
																					.palette
																					.neutral[86],
																				';',
																				mq
																					.Dp
																					.tablet,
																				'{display:table-cell;}',
																				'',
																			),
																		},
																	),
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'div',
																		{
																			css: invoiceYearSelectCss,
																			children:
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					InvoiceTableYearSelect,
																					{
																						years: invoiceYears,
																						selectedYear:
																							currentInvoiceYear,
																						setSelectedYear:
																							setCurrentInvoiceYear,
																						onDirectUpdate:
																							(
																								newYear,
																							) => {
																								var invoiceIndex =
																										props.invoiceData.findIndex(
																											(
																												invoice,
																											) =>
																												''.concat(
																													(0,
																													dates.sG)(
																														invoice.date,
																													).date.getFullYear(),
																												) ===
																												newYear,
																										),
																									targetPage =
																										Math.ceil(
																											(invoiceIndex +
																												1) /
																												props.resultsPerPage,
																										);
																								setCurrentPaginationPage(
																									targetPage,
																								),
																									setCurrentPage(
																										targetPage,
																									);
																							},
																					},
																				),
																		},
																	),
																],
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'div',
															{
																css: tableHeadingsRowCss2,
																children:
																	tableHeadings.map(
																		(
																			tableHeading,
																			index,
																		) =>
																			(0,
																			emotion_react_jsx_runtime_browser_esm.tZ)(
																				'div',
																				{
																					css: thCss2,
																					children:
																						tableHeading,
																				},
																				'invoiceTH-'.concat(
																					index,
																				),
																			),
																	),
															},
														),
													],
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'div',
												{
													css: tableBodyCss2,
													children: props.invoiceData
														.filter(
															(_, index) =>
																index >=
																	(currentPage -
																		1) *
																		props.resultsPerPage &&
																index <
																	(currentPage -
																		1) *
																		props.resultsPerPage +
																		props.resultsPerPage,
														)
														.map(
															(
																tableRow,
																index,
															) => {
																var paymentMethodLowercase =
																	tableRow.paymentMethod.toLowerCase();
																return (0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'div',
																	{
																		css: tableRowCss2,
																		children:
																			[
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					'div',
																					{
																						css: tdCss2(
																							index,
																							tableHeadings[0],
																						),
																						children:
																							(0,
																							dates.sG)(
																								tableRow.date,
																							).dateStr(),
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					'div',
																					{
																						css: tdCss2(
																							index,
																							tableHeadings[1],
																						),
																						children:
																							(0,
																							emotion_react_jsx_runtime_browser_esm.BX)(
																								'div',
																								{
																									css: paymentDetailsHolderCss,
																									'data-qm-masking':
																										'blocklist',
																									children:
																										[
																											tableRow.cardType &&
																												tableRow.last4 &&
																												(0,
																												emotion_react_jsx_runtime_browser_esm.tZ)(
																													CardDisplay.V,
																													{
																														cssOverrides:
																															InvoicesTable_ref,
																														last4: tableRow.last4,
																														type: tableRow.cardType,
																													},
																												),
																											paymentMethodLowercase ===
																												invoicePaymentMethods_PAYPAL &&
																												(0,
																												emotion_react_jsx_runtime_browser_esm.tZ)(
																													PaypalDisplay.O,
																													{},
																												),
																											paymentMethodLowercase ===
																												invoicePaymentMethods_DIRECT_DEBIT &&
																												tableRow.last4 &&
																												(0,
																												emotion_react_jsx_runtime_browser_esm.tZ)(
																													DirectDebitDisplay.rV,
																													{
																														accountNumber:
																															tableRow.last4,
																														accountName:
																															'',
																														sortCode:
																															'',
																														onlyAccountEnding:
																															!0,
																													},
																												),
																											paymentMethodLowercase ===
																												invoicePaymentMethods_SEPA &&
																												tableRow.last4 &&
																												(0,
																												emotion_react_jsx_runtime_browser_esm.tZ)(
																													SepaDisplay.t,
																													{
																														accountName:
																															'',
																														iban: tableRow.last4,
																													},
																												),
																											paymentMethodLowercase !==
																												invoicePaymentMethods_CARD &&
																												paymentMethodLowercase !==
																													invoicePaymentMethods_PAYPAL &&
																												paymentMethodLowercase !==
																													invoicePaymentMethods_DIRECT_DEBIT &&
																												paymentMethodLowercase !==
																													invoicePaymentMethods_SEPA &&
																												(0,
																												emotion_react_jsx_runtime_browser_esm.tZ)(
																													'span',
																													{
																														children:
																															'No Payment Method',
																													},
																												),
																										],
																								},
																							),
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					'div',
																					{
																						css: tdCss2(
																							index,
																							tableHeadings[2],
																						),
																						children:
																							tableRow.hasMultipleSubs
																								? 'Multiple prices'
																								: ''
																										.concat(
																											tableRow.currency,
																										)
																										.concat(
																											Number(
																												tableRow.price,
																											).toFixed(
																												2,
																											),
																											' ',
																										)
																										.concat(
																											tableRow.currencyISO,
																										),
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.BX)(
																					'div',
																					{
																						css: tdCss2(
																							index,
																						),
																						children:
																							[
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									'a',
																									{
																										css: invoiceLinkCss,
																										href: tableRow.pdfPath,
																										onClick:
																											() =>
																												(0,
																												analytics.L9)(
																													{
																														eventCategory:
																															'invoice',
																														eventAction:
																															'click',
																														eventLabel:
																															'view_'.concat(
																																tableRow.productUrlPart,
																																'_pdf_invoice',
																															),
																													},
																												),
																										children:
																											'View invoice (PDF)',
																									},
																								),
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									'a',
																									{
																										css: invoiceDownloadLinkCss,
																										download:
																											'invoice_'
																												.concat(
																													tableRow.subscriptionName,
																													'_',
																												)
																												.concat(
																													(0,
																													dates.sG)(
																														tableRow.date,
																													).dateStr(
																														'yyyy-MM-dd',
																													),
																													'.pdf',
																												),
																										href: tableRow.pdfPath,
																										onClick:
																											() =>
																												(0,
																												analytics.L9)(
																													{
																														eventCategory:
																															'invoice',
																														eventAction:
																															'click',
																														eventLabel:
																															'download_'.concat(
																																tableRow.productUrlPart,
																																'_pdf_invoice',
																															),
																													},
																												),
																										children:
																											(0,
																											emotion_react_jsx_runtime_browser_esm.tZ)(
																												DownloadIcon,
																												{},
																											),
																									},
																								),
																							],
																					},
																				),
																			],
																	},
																	tableRow.invoiceId,
																);
															},
														),
												},
											),
										],
									},
								),
								props.resultsPerPage <
									props.invoiceData.length &&
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										Pagination,
										{
											currentPage: currentPaginationPage,
											setCurrentPage:
												setCurrentPaginationPage,
											onDirectUpdate: (newPageNumber) => {
												var targetInvoiceYear =
													''.concat(
														(0, dates.sG)(
															props.invoiceData[
																(newPageNumber -
																	1) *
																	props.resultsPerPage
															].date,
														).date.getFullYear(),
													);
												setCurrentInvoiceYear(
													targetInvoiceYear,
												),
													setCurrentPage(
														newPageNumber,
													),
													(0, analytics.L9)({
														eventCategory:
															'invoice',
														eventAction: 'click',
														eventLabel:
															'invoice_pagination_select',
														eventValue:
															trackingPaginationInteractionCount,
													}),
													setTrackingPaginationInteractionCount(
														trackingPaginationInteractionCount +
															1,
													);
											},
											numberOfResults:
												props.invoiceData.length,
											resultsPerPage:
												props.resultsPerPage,
											additionalCSS: (0,
											emotion_react_browser_esm.iv)(
												'margin-top:',
												space.D[5],
												'px;',
												'',
											),
										},
									),
							],
						},
					);
				};
			try {
				(InvoicesTable.displayName = 'InvoicesTable'),
					(InvoicesTable.__docgenInfo = {
						description: '',
						displayName: 'InvoicesTable',
						props: {
							resultsPerPage: {
								defaultValue: null,
								description: '',
								name: 'resultsPerPage',
								required: !0,
								type: { name: 'number' },
							},
							invoiceData: {
								defaultValue: null,
								description: '',
								name: 'invoiceData',
								required: !0,
								type: { name: 'InvoiceInfo[]' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/billing/InvoicesTable.tsx#InvoicesTable'
						] = {
							docgenInfo: InvoicesTable.__docgenInfo,
							name: 'InvoicesTable',
							path: 'client/components/mma/billing/InvoicesTable.tsx#InvoicesTable',
						});
			} catch (__react_docgen_typescript_loader_error) {}
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
			var subHeadingTitleCss = '\n'
					.concat(typography.Hu7, ';\n')
					.concat(
						mq.C4.tablet,
						' {\n  font-size: 1.25rem;\n  line-height: 1.6;\n};\n',
					),
				subHeadingBorderTopCss = (0, emotion_react_browser_esm.iv)(
					'border-top:1px solid ',
					palette.palette.neutral[86],
					';margin:',
					space.D[12],
					'px 0 ',
					space.D[5],
					'px;',
					'',
				);
			function decorateProductDetailWithInvoices(productDetail) {
				return _objectSpread(
					_objectSpread({}, productDetail),
					{},
					{ invoices: [] },
				);
			}
			function joinInvoicesWithProductsInCategories(
				mdapiResponse,
				invoicesResponse,
			) {
				var allProductDetails = mdapiResponse.products
					.filter(productResponse.v_)
					.sort(productResponse.e$)
					.map(decorateProductDetailWithInvoices);
				invoicesResponse.invoices
					.sort((a, b) => b.date.localeCompare(a.date))
					.forEach((invoice) => {
						var matchingProduct = allProductDetails.find(
							(product) =>
								product.subscription.subscriptionId ===
								invoice.subscriptionName,
						);
						matchingProduct &&
							matchingProduct.invoices.push(invoice);
					});
				var productGroupingToProductDetails =
					(function organiseProductsIntoCategory(allProductDetails) {
						return allProductDetails.reduce(
							(accumulator, productDetail) => {
								var specificProductType = (0,
								productResponse.Xn)(productDetail.tier);
								return _objectSpread(
									_objectSpread({}, accumulator),
									{},
									{
										[specificProductType.groupedProductType]:
											[
												...(accumulator[
													specificProductType
														.groupedProductType
												] || []),
												productDetail,
											],
									},
								);
							},
							{},
						);
					})(allProductDetails);
				return { allProductDetails, productGroupingToProductDetails };
			}
			function renderProductBillingInfo(_ref) {
				var [productGrouping, productDetails] = _ref;
				return (
					productDetails.length > 0 &&
					(0, emotion_react_jsx_runtime_browser_esm.tZ)(
						react.Fragment,
						{
							children: productDetails.map((productDetail) => {
								var _paidPlan$billingPeri,
									mainPlan = (0, productResponse.fr)(
										productDetail.subscription,
									);
								if (!mainPlan)
									throw new Error(
										'mainPlan does not exist for product in billing page',
									);
								var specificProductType = (0,
									productResponse.Xn)(productDetail.tier),
									groupedProductType =
										productTypes.HP[
											specificProductType
												.groupedProductType
										],
									hasCancellationPending =
										productDetail.subscription.cancelledAt,
									cancelledCopy =
										specificProductType.cancelledCopy ||
										groupedProductType.cancelledCopy,
									nextPaymentDetails = (0,
									NextPaymentDetails.p)(
										mainPlan,
										productDetail.subscription,
										null,
										!!productDetail.alertText,
									),
									paidPlan = (0, productResponse.fr)(
										productDetail.subscription,
									),
									maybePatronSuffix =
										'Patron' ===
										productDetail.subscription.readerType
											? ' - Patron'
											: '',
									productInvoiceData =
										productDetail.invoices.map((invoice) =>
											_objectSpread(
												_objectSpread({}, invoice),
												{},
												{
													pdfPath: '/api/'.concat(
														invoice.pdfPath,
													),
													currency: paidPlan.currency,
													currencyISO:
														paidPlan.currencyISO,
													productUrlPart:
														specificProductType.urlPart,
												},
											),
										),
									resultsPerPage =
										null !==
											(_paidPlan$billingPeri =
												paidPlan.billingPeriod) &&
										void 0 !== _paidPlan$billingPeri &&
										_paidPlan$billingPeri.includes('year')
											? productInvoiceData.length
											: 6;
								return (0,
								emotion_react_jsx_runtime_browser_esm.BX)(
									react.Fragment,
									{
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'div',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														subHeadingBorderTopCss,
														' display:flex;align-items:start;justify-content:space-between;',
														'',
													),
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															'h2',
															{
																css: (0,
																emotion_react_browser_esm.iv)(
																	subHeadingTitleCss,
																	' margin:0;',
																	'',
																),
																children: [
																	specificProductType.productTitle(
																		mainPlan,
																	),
																	maybePatronSuffix,
																],
															},
														),
														(0, productResponse.XU)(
															productDetail.subscription,
														) &&
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'i',
																{
																	css: (0,
																	emotion_react_browser_esm.iv)(
																		'margin:4px 0 0 ',
																		space
																			.D[3],
																		'px;',
																		'',
																	),
																	children:
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			GiftIcon.O,
																			{
																				alignArrowToThisSide:
																					'left',
																			},
																		),
																},
															),
													],
												},
											),
											hasCancellationPending &&
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
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																ErrorIcon.P,
																{
																	fill: palette
																		.palette
																		.brandAlt[200],
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'span',
																{
																	css: (0,
																	emotion_react_browser_esm.iv)(
																		'margin-left:',
																		space
																			.D[2],
																		'px;',
																		'',
																	),
																	children: [
																		cancelledCopy,
																		' ',
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'strong',
																			{
																				children:
																					(0,
																					dates.sG)(
																						productDetail
																							.subscription
																							.end,
																					).dateStr(),
																			},
																		),
																	],
																},
															),
															'.',
														],
													},
												),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												BasicProductInfoTable.I,
												{
													groupedProductType,
													productDetail,
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												SixForSixExplainer.l,
												{
													additionalCss: (0,
													emotion_react_browser_esm.iv)(
														typography.Kz0,
														';',
														'',
													),
													mainPlan,
													hasCancellationPending,
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												PaymentDetailsTable.s,
												{
													productDetail,
													nextPaymentDetails,
													hasCancellationPending,
													tableHeading: 'Payment',
												},
											),
											productDetail.isPaidTier &&
												productDetail.subscription
													.safeToUpdatePaymentMethod &&
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													Buttons.Q,
													{
														colour: productDetail.alertText
															? palette.palette
																	.brand[400]
															: palette.palette
																	.brand[800],
														textColour:
															productDetail.alertText
																? palette
																		.palette
																		.neutral[100]
																: palette
																		.palette
																		.brand[400],
														fontWeight: 'bold',
														alert: !!productDetail.alertText,
														text: 'Update payment method',
														ariaLabelText:
															''.concat(
																specificProductType.productTitle(
																	mainPlan,
																),
																' : Update payment method',
															),
														to: '/payment/'.concat(
															specificProductType.urlPart,
														),
														state: {
															productDetail,
															flowReferrer: {
																title: NavConfig
																	.qy.billing
																	.title,
																link: NavConfig
																	.qy.billing
																	.link,
															},
														},
													},
												),
											productInvoiceData.length > 0 &&
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'div',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															'margin-top:',
															space.D[12],
															'px;margin-bottom:',
															space.D[3],
															'px;',
															'',
														),
														children: (0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															InvoicesTable,
															{
																resultsPerPage,
																invoiceData:
																	productInvoiceData,
															},
														),
													},
												),
										],
									},
									productDetail.subscription.subscriptionId,
								);
							}),
						},
						productGrouping,
					)
				);
			}
			function getAppStoreMessage(subscription) {
				switch ((0, shared_mpapiResponse.IM)(subscription)) {
					case shared_mpapiResponse.dk.IOS:
						return 'Apple (for iOS)';
					case shared_mpapiResponse.dk.ANDROID:
						return 'Google (for Android)';
					default:
						return ''
							.concat('Apple (for iOS)', ', or ')
							.concat('Google (for Android)');
				}
			}
			function renderInAppPurchase(subscription) {
				var tableHeadingCss = (0, emotion_react_browser_esm.iv)(
						'width:100%;',
						typography.fy7,
						';margin:0;padding:',
						space.D[3],
						'px ',
						space.D[5],
						'px;background-color:',
						palette.palette.neutral[97],
						';',
						mq.C4.tablet,
						'{font-size:1.0625rem;line-height:1.6;padding:',
						space.D[3],
						'px;}',
						'',
					),
					puzzleOrNews = (0, shared_mpapiResponse.Uh)(subscription)
						? 'puzzle'
						: 'news';
				return (0, emotion_react_jsx_runtime_browser_esm.BX)(
					'div',
					{
						css: subHeadingBorderTopCss,
						children: [
							(0, emotion_react_jsx_runtime_browser_esm.BX)(
								'h2',
								{
									css: (0, emotion_react_browser_esm.iv)(
										subHeadingTitleCss,
										' margin:0;',
										'',
									),
									children: [
										(0, lodash.capitalize)(puzzleOrNews),
										' app',
									],
								},
							),
							(0, emotion_react_jsx_runtime_browser_esm.BX)(
								'div',
								{
									css: (0, emotion_react_browser_esm.iv)(
										typography.Kz0,
										';border:1px solid ',
										palette.palette.neutral[86],
										';display:flex;flex-wrap:wrap;margin:',
										space.D[5],
										'px 0;',
										'',
									),
									children: [
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'h2',
											{
												css: tableHeadingCss,
												children: 'Payment',
											},
										),
										(0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											'div',
											{
												css: (0,
												emotion_react_browser_esm.iv)(
													'padding:',
													space.D[3],
													'px;',
													'',
												),
												children: [
													'To change your payment setup, please contact',
													' ',
													getAppStoreMessage(
														subscription,
													),
													'.',
												],
											},
										),
									],
								},
							),
						],
					},
					subscription.subscriptionId,
				);
			}
			function BillingDetailsComponent(props) {
				return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
					emotion_react_jsx_runtime_browser_esm.HY,
					{
						children: Object.entries(
							props.productGroupingToProductDetails,
						).map(renderProductBillingInfo),
					},
				);
			}
			var BillingPage = () => {
					var { data: billingResponse, loadingState } = (0,
					useAsyncLoader.c)(
						billingFetcher,
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
							{
								loadingMessage:
									'Loading your billing details...',
							},
						);
					if (null === billingResponse)
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							GenericErrorScreen.c,
							{},
						);
					var [mdapiResponse, invoicesResponse, mpapiResponse] =
							billingResponse,
						appSubscriptions = mpapiResponse.subscriptions.filter(
							shared_mpapiResponse.hb,
						),
						{ allProductDetails, productGroupingToProductDetails } =
							joinInvoicesWithProductsInCategories(
								mdapiResponse,
								invoicesResponse,
							);
					return (0 === allProductDetails.length &&
						0 === appSubscriptions.length) ||
						(0 === allProductDetails.length &&
							!featureSwitches.k.appSubscriptions)
						? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
								EmptyAccountOverview.j,
								{},
						  )
						: (0, emotion_react_jsx_runtime_browser_esm.BX)(
								emotion_react_jsx_runtime_browser_esm.HY,
								{
									children: [
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											PaymentFailureAlertIfApplicable.T,
											{
												productDetails:
													allProductDetails,
											},
										),
										featureSwitches.k.appSubscriptions &&
											appSubscriptions.map(
												renderInAppPurchase,
											),
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											BillingDetailsComponent,
											{ productGroupingToProductDetails },
										),
									],
								},
						  );
				},
				billingFetcher = () =>
					Promise.all([
						(0, productUtils.EV)(),
						(0, fetch.n4)('/api/invoices'),
						(0, fetch.n4)('/mpapi/user/mobile-subscriptions'),
					]),
				Billing = () =>
					(0, emotion_react_jsx_runtime_browser_esm.tZ)(Page._, {
						selectedNavItem: NavConfig.qy.billing,
						pageTitle: 'Billing',
						children: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							BillingPage,
							{},
						),
					});
			const Billing_stories = {
				title: 'Pages/Billing',
				component: Billing,
				decorators: [ReactRouterDecorator.R],
				parameters: { layout: 'fullscreen' },
			};
			var NoSubscription = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							Billing,
							{},
						),
					parameters: {
						msw: [
							http.d.get('/api/me/mma', () =>
								HttpResponse.Z.json((0, mdapiResponse.F)()),
							),
							http.d.get('/mpapi/user/mobile-subscriptions', () =>
								HttpResponse.Z.json({ subscriptions: [] }),
							),
							http.d.get('/api/invoices', () =>
								HttpResponse.Z.json({ invoices: [] }),
							),
							http.d.get('/idapi/user', () =>
								HttpResponse.Z.json(user.E),
							),
						],
					},
				},
				WithSubscriptions = {
					render: () => (
						(featureSwitches.k.appSubscriptions = !0),
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							Billing,
							{},
						)
					),
					parameters: {
						msw: [
							http.d.get('/api/me/mma', () =>
								HttpResponse.Z.json(
									(0, mdapiResponse.F)(
										(0, testProducts.X8)(),
										(0, testProducts.IB)(),
										(0, testProducts.Y$)(),
										(0, testProducts.uU)(),
										(0, testProducts.av)(),
										(0, testProducts.kj)(),
									),
								),
							),
							http.d.get('/mpapi/user/mobile-subscriptions', () =>
								HttpResponse.Z.json({
									subscriptions: [
										inAppPurchase.IH,
										inAppPurchase.$E,
										inAppPurchase.SD,
										inAppPurchase.go,
									],
								}),
							),
							http.d.get('/api/invoices', () =>
								HttpResponse.Z.json({
									invoices: [guardianWeeklyCardInvoice],
								}),
							),
						],
					},
				};
			(NoSubscription.parameters = {
				...NoSubscription.parameters,
				docs: {
					...NoSubscription.parameters?.docs,
					source: {
						originalSource:
							"{\n  render: () => {\n    return <Billing />;\n  },\n  parameters: {\n    msw: [http.get('/api/me/mma', () => {\n      return HttpResponse.json(toMembersDataApiResponse());\n    }), http.get('/mpapi/user/mobile-subscriptions', () => {\n      return HttpResponse.json({\n        subscriptions: []\n      });\n    }), http.get('/api/invoices', () => {\n      return HttpResponse.json({\n        invoices: []\n      });\n    }), http.get('/idapi/user', () => {\n      return HttpResponse.json(user);\n    })]\n  }\n}",
						...NoSubscription.parameters?.docs?.source,
					},
				},
			}),
				(WithSubscriptions.parameters = {
					...WithSubscriptions.parameters,
					docs: {
						...WithSubscriptions.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    featureSwitches['appSubscriptions'] = true;\n    return <Billing />;\n  },\n  parameters: {\n    msw: [http.get('/api/me/mma', () => {\n      return HttpResponse.json(toMembersDataApiResponse(guardianWeeklyPaidByCard(), digitalPackPaidByDirectDebit(), newspaperVoucherPaidByPaypal(), tierThree(), guardianAdLite(), guardianAdLiteCancelled()));\n    }), http.get('/mpapi/user/mobile-subscriptions', () => {\n      return HttpResponse.json({\n        subscriptions: [InAppPurchase, InAppPurchaseIos, InAppPurchaseAndroid, PuzzleAppPurchaseAndroid]\n      });\n    }), http.get('/api/invoices', () => {\n      return HttpResponse.json({\n        invoices: [guardianWeeklyCardInvoice]\n      });\n    })]\n  }\n}",
							...WithSubscriptions.parameters?.docs?.source,
						},
					},
				});
			const __namedExportsOrder = ['NoSubscription', 'WithSubscriptions'];
		},
	},
]);
//# sourceMappingURL=components-mma-billing-Billing-stories.750e952a.iframe.bundle.js.map
