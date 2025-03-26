'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[7294],
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
		'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgCreditCard.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					n: () => SvgCreditCard,
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
										d: 'm23 6.57-1.833-1.81H2.833L1 6.57v1.664h22zm0 3.69H1v7.164l1.803 1.81h18.364L23 17.424zm-17.368 5.5h2.29v-1.158h-2.29zm5.772 0h-2.29v-1.158h2.29zm1.192 0h2.29v-1.158h-2.29zm5.772 0h-2.29v-1.158h2.29z',
										fill: theme?.fill,
									},
								),
							},
						),
					SvgCreditCard = ({
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
													children: 'Credit card',
												},
										  )
										: '',
								],
							},
						);
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
		'./client/components/mma/shared/PaymentDetails.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				g: () => PaymentDetails,
			});
			var _assets_DirectDebitLogo__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./client/components/mma/shared/assets/DirectDebitLogo.tsx',
					),
				_assets_PaypalLogo__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./client/components/mma/shared/assets/PaypalLogo.tsx',
					),
				_CardDisplay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./client/components/mma/shared/CardDisplay.tsx',
				),
				_PaypalDisplay__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./client/components/mma/shared/PaypalDisplay.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			var _ref = {
					name: '1ulgzxb',
					styles: 'flex:0 1 auto;overflow:hidden;text-overflow:ellipsis',
				},
				_ref2 = {
					name: '9uinkp',
					styles: 'display:inline-flex;align-items:center;font-weight:700;max-width:100%;>svg{flex:0 0 auto;margin-left:0.5ch;}',
				},
				PaymentDetails = (props) => {
					var type,
						subscription = props.subscription,
						containerCss = _ref2,
						truncateCss = _ref;
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
						'span',
						{
							css: containerCss,
							'data-qm-masking': 'blocklist',
							children: [
								subscription.card &&
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.HY,
										{
											children: [
												((type =
													subscription.card.type),
												'MasterCard' !== type
													? ''.concat(type, ' card')
													: type),
												' ending',
												' ',
												subscription.card.last4,
												(0,
												_CardDisplay__WEBPACK_IMPORTED_MODULE_0__.z)(
													subscription.card.type,
												),
											],
										},
									),
								subscription.payPalEmail &&
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.HY,
										{
											children: [
												(0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
													'span',
													{
														css: truncateCss,
														children: (0,
														_PaypalDisplay__WEBPACK_IMPORTED_MODULE_2__.N)(
															subscription.payPalEmail,
														),
													},
												),
												(0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
													_assets_PaypalLogo__WEBPACK_IMPORTED_MODULE_3__.D,
													{},
												),
											],
										},
									),
								subscription.mandate &&
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.HY,
										{
											children: [
												'account ending',
												' ',
												subscription.mandate.accountNumber.slice(
													-3,
												),
												(0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
													_assets_DirectDebitLogo__WEBPACK_IMPORTED_MODULE_4__.c,
													{},
												),
											],
										},
									),
								subscription.sepaMandate &&
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.HY,
										{
											children: [
												'SEPA ',
												subscription.sepaMandate
													.accountName,
												' ',
												subscription.sepaMandate.iban,
											],
										},
									),
							],
						},
					);
				};
			try {
				(PaymentDetails.displayName = 'PaymentDetails'),
					(PaymentDetails.__docgenInfo = {
						description: '',
						displayName: 'PaymentDetails',
						props: {
							subscription: {
								defaultValue: null,
								description: '',
								name: 'subscription',
								required: !0,
								type: { name: 'Subscription' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/PaymentDetails.tsx#PaymentDetails'
						] = {
							docgenInfo: PaymentDetails.__docgenInfo,
							name: 'PaymentDetails',
							path: 'client/components/mma/shared/PaymentDetails.tsx#PaymentDetails',
						});
			} catch (__react_docgen_typescript_loader_error) {}
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
		'./client/components/mma/shared/SupporterPlusTsAndCs.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				I: () => SupporterPlusTsAndCs,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_5__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
					),
				_sentry_browser__WEBPACK_IMPORTED_MODULE_6__ =
					__webpack_require__(
						'./node_modules/@sentry/minimal/esm/index.js',
					),
				react_router_dom__WEBPACK_IMPORTED_MODULE_9__ =
					__webpack_require__(
						'./node_modules/react-router-dom/index.js',
					),
				_shared_productTypes__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__('./shared/productTypes.ts'),
				_utilities_currencyIso__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__('./client/utilities/currencyIso.ts'),
				_utilities_pricingConfig_supporterPlusPricing__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./client/utilities/pricingConfig/supporterPlusPricing.ts',
					),
				_utilities_utils__WEBPACK_IMPORTED_MODULE_8__ =
					__webpack_require__('./client/utilities/utils.ts'),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				smallPrintCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_3__.iv)(
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__.Hi4,
					';margin-top:0;margin-bottom:0;color:#606060;>a{color:inherit;text-decoration:underline;}&+&{margin-top:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_5__
						.D[1],
					'px;}',
					'',
				),
				SupporterPlusTsAndCs = (_ref) => {
					var { currencyISO, billingPeriod } = _ref;
					if (
						!(0,
						_utilities_currencyIso__WEBPACK_IMPORTED_MODULE_1__.uN)(
							currencyISO,
						)
					)
						throw (
							(_sentry_browser__WEBPACK_IMPORTED_MODULE_6__.Tb(
								'Invalid currency: '.concat(currencyISO),
							),
							new Error('Invalid currency'))
						);
					var currencySymbol = (0,
						_utilities_currencyIso__WEBPACK_IMPORTED_MODULE_1__.vD)(
							currencyISO,
						),
						monthlyOrAnnual = (0,
						_shared_productTypes__WEBPACK_IMPORTED_MODULE_0__.xm)(
							billingPeriod,
						),
						monthlyThreshold = (0,
						_utilities_pricingConfig_supporterPlusPricing__WEBPACK_IMPORTED_MODULE_2__.s)(
							currencyISO,
							'month',
						),
						annualThreshold = (0,
						_utilities_pricingConfig_supporterPlusPricing__WEBPACK_IMPORTED_MODULE_2__.s)(
							currencyISO,
							'year',
						);
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.BX)(
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.HY,
						{
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.BX)(
									'p',
									{
										css: smallPrintCss,
										children: [
											'If you pay at least ',
											currencySymbol,
											(0,
											_utilities_utils__WEBPACK_IMPORTED_MODULE_8__.dN)(
												monthlyThreshold,
											),
											' per month or ',
											currencySymbol,
											(0,
											_utilities_utils__WEBPACK_IMPORTED_MODULE_8__.dN)(
												annualThreshold,
											),
											' per year, you will receive the Supporter Plus benefits on a subscription basis. If you pay more than ',
											currencySymbol,
											(0,
											_utilities_utils__WEBPACK_IMPORTED_MODULE_8__.dN)(
												'Annual' === monthlyOrAnnual
													? annualThreshold
													: monthlyThreshold,
											),
											' ',
											'per ',
											billingPeriod,
											', these additional amounts will be separate',
											' ',
											monthlyOrAnnual.toLowerCase(),
											' voluntary financial contributions to the Guardian. The Supporter Plus subscription and any contributions will auto-renew each ',
											billingPeriod,
											'. You will be charged the subscription and contribution amounts using your chosen payment method at each renewal unless you cancel. You can cancel your subscription or change your contributions at any time before your next renewal date. If you cancel within 14 days of taking out a Supporter Plus subscription, you’ll receive a full refund (including of any contributions) and your subscription and any contribution will stop immediately. Cancellation of your subscription (which will also cancel any contribution) or cancellation of your contribution made after 14 days will take effect at the end of your current',
											' ',
											monthlyOrAnnual.toLowerCase(),
											' payment period. To cancel,',
											' ',
											(0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.tZ)(
												react_router_dom__WEBPACK_IMPORTED_MODULE_9__.rU,
												{
													to: '/recurringsupport',
													children:
														'go to Manage My Account',
												},
											),
											' or',
											' ',
											(0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.tZ)(
												'a',
												{
													href: 'https://www.theguardian.com/info/2022/oct/28/the-guardian-supporter-plus-terms-and-conditions',
													children: 'see our Terms',
												},
											),
											'.',
										],
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.BX)(
									'p',
									{
										css: smallPrintCss,
										children: [
											'By proceeding, you are agreeing to our',
											' ',
											(0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.tZ)(
												'a',
												{
													href: 'https://www.theguardian.com/info/2022/oct/28/the-guardian-supporter-plus-terms-and-conditions',
													children:
														'Terms and Conditions',
												},
											),
											'.',
										],
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.BX)(
									'p',
									{
										css: smallPrintCss,
										children: [
											'To find out what personal data we collect and how we use it, please visit our',
											' ',
											(0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.tZ)(
												'a',
												{
													href: 'https://www.theguardian.com/help/privacy-policy',
													children: 'Privacy Policy',
												},
											),
											'.',
										],
									},
								),
							],
						},
					);
				};
			try {
				(SupporterPlusTsAndCs.displayName = 'SupporterPlusTsAndCs'),
					(SupporterPlusTsAndCs.__docgenInfo = {
						description: '',
						displayName: 'SupporterPlusTsAndCs',
						props: {
							currencyISO: {
								defaultValue: null,
								description: '',
								name: 'currencyISO',
								required: !0,
								type: { name: 'string' },
							},
							billingPeriod: {
								defaultValue: null,
								description: '',
								name: 'billingPeriod',
								required: !0,
								type: {
									name: 'enum',
									value: [
										{ value: '"month"' },
										{ value: '"6 weeks"' },
										{ value: '"quarter"' },
										{ value: '"year"' },
									],
								},
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/SupporterPlusTsAndCs.tsx#SupporterPlusTsAndCs'
						] = {
							docgenInfo: SupporterPlusTsAndCs.__docgenInfo,
							name: 'SupporterPlusTsAndCs',
							path: 'client/components/mma/shared/SupporterPlusTsAndCs.tsx#SupporterPlusTsAndCs',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/shared/productSwitch/SwitchErrorSummary.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				r: () => SwitchErrorSummary,
			});
			var _guardian_source_development_kitchen_react_components__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@guardian/source-development-kitchen/dist/react-components/summary/ErrorSummary.js',
					),
				react_router_dom__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/react-router-dom/index.js',
					),
				_client_styles_ErrorStyles__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__('./client/styles/ErrorStyles.ts'),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				SwitchErrorContext = (_ref) => {
					var { inPaymentFailure } = _ref;
					return inPaymentFailure
						? (0,
						  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.HY,
								{
									children: [
										'Please update your payment details in order to change your support.',
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
											react_router_dom__WEBPACK_IMPORTED_MODULE_2__.rU,
											{
												css: [
													_client_styles_ErrorStyles__WEBPACK_IMPORTED_MODULE_0__.nZ,
													_client_styles_ErrorStyles__WEBPACK_IMPORTED_MODULE_0__.qX,
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
						  )
						: (0,
						  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.HY,
								{
									children: [
										'Please ensure your payment details are correct. If the problem persists get in touch at',
										' ',
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
											'a',
											{
												css: _client_styles_ErrorStyles__WEBPACK_IMPORTED_MODULE_0__.nZ,
												href: 'mailto:customer.help@theguardian.com',
												children:
													'customer.help@theguardian.com',
											},
										),
										'.',
									],
								},
						  );
				},
				SwitchErrorSummary = (_ref2) => {
					var { inPaymentFailure } = _ref2;
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
						_guardian_source_development_kitchen_react_components__WEBPACK_IMPORTED_MODULE_3__.X,
						{
							message: inPaymentFailure
								? 'There is a problem with your payment method'
								: 'We were unable to change your support',
							context: (0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
								SwitchErrorContext,
								{ inPaymentFailure },
							),
							cssOverrides:
								_client_styles_ErrorStyles__WEBPACK_IMPORTED_MODULE_0__.p,
						},
					);
				};
			try {
				(SwitchErrorSummary.displayName = 'SwitchErrorSummary'),
					(SwitchErrorSummary.__docgenInfo = {
						description: '',
						displayName: 'SwitchErrorSummary',
						props: {
							inPaymentFailure: {
								defaultValue: null,
								description: '',
								name: 'inPaymentFailure',
								required: !0,
								type: { name: 'boolean' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/shared/productSwitch/SwitchErrorSummary.tsx#SwitchErrorSummary'
						] = {
							docgenInfo: SwitchErrorSummary.__docgenInfo,
							name: 'SwitchErrorSummary',
							path: 'client/components/shared/productSwitch/SwitchErrorSummary.tsx#SwitchErrorSummary',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/shared/productSwitch/SwitchPaymentInfo.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				X: () => SwitchPaymentInfo,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
					),
				_shared_productTypes__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__('./shared/productTypes.ts'),
				_utilities_utils__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__('./client/utilities/utils.ts'),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				SwitchPaymentInfo = (_ref) => {
					var {
							amountPayableToday,
							alreadyPayingAboveThreshold,
							currencySymbol,
							supporterPlusPurchaseAmount,
							billingPeriod,
							nextPaymentDate,
						} = _ref,
						monthlyOrAnnual = (0,
						_shared_productTypes__WEBPACK_IMPORTED_MODULE_0__.xm)(
							billingPeriod,
						).toLowerCase();
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.HY,
						{
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
									'strong',
									{
										css: (0,
										_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
											'padding-bottom:',
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
												.D[1],
											'px;',
											'',
										),
										children: [
											amountPayableToday > 0 &&
												'Your first payment will be\n\t\t\t\t\t\t\t\t\t'
													.concat(
														alreadyPayingAboveThreshold
															? 'just'
															: '',
														'\n\t\t\t\t\t\t\t\t\t',
													)
													.concat(currencySymbol)
													.concat(
														(0,
														_utilities_utils__WEBPACK_IMPORTED_MODULE_4__.dN)(
															amountPayableToday,
														),
													),
											0 == amountPayableToday &&
												"There's nothing extra to pay today",
										],
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
									'br',
									{},
								),
								amountPayableToday > 0 &&
									"We will charge you a smaller amount today, to\n\t\t\t\t\t\t\t\toffset the payment you've already given us for\n\t\t\t\t\t\t\t\tthe rest of the ".concat(
										billingPeriod,
										'.',
									),
								0 == amountPayableToday &&
									"We won't charge you today, as your current payment covers you for the rest of the ".concat(
										billingPeriod,
										'.',
									),
								' ',
								'After this, from ',
								nextPaymentDate,
								', your new ',
								monthlyOrAnnual,
								' ',
								'payment will be ',
								currencySymbol,
								(0,
								_utilities_utils__WEBPACK_IMPORTED_MODULE_4__.dN)(
									supporterPlusPurchaseAmount,
								),
								'.',
							],
						},
					);
				};
			try {
				(SwitchPaymentInfo.displayName = 'SwitchPaymentInfo'),
					(SwitchPaymentInfo.__docgenInfo = {
						description: '',
						displayName: 'SwitchPaymentInfo',
						props: {
							amountPayableToday: {
								defaultValue: null,
								description: '',
								name: 'amountPayableToday',
								required: !0,
								type: { name: 'number' },
							},
							alreadyPayingAboveThreshold: {
								defaultValue: null,
								description: '',
								name: 'alreadyPayingAboveThreshold',
								required: !0,
								type: { name: 'boolean' },
							},
							currencySymbol: {
								defaultValue: null,
								description: '',
								name: 'currencySymbol',
								required: !0,
								type: { name: 'string' },
							},
							supporterPlusPurchaseAmount: {
								defaultValue: null,
								description: '',
								name: 'supporterPlusPurchaseAmount',
								required: !0,
								type: { name: 'number' },
							},
							billingPeriod: {
								defaultValue: null,
								description: '',
								name: 'billingPeriod',
								required: !0,
								type: {
									name: 'enum',
									value: [
										{ value: '"month"' },
										{ value: '"6 weeks"' },
										{ value: '"quarter"' },
										{ value: '"year"' },
									],
								},
							},
							nextPaymentDate: {
								defaultValue: null,
								description: '',
								name: 'nextPaymentDate',
								required: !0,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/shared/productSwitch/SwitchPaymentInfo.tsx#SwitchPaymentInfo'
						] = {
							docgenInfo: SwitchPaymentInfo.__docgenInfo,
							name: 'SwitchPaymentInfo',
							path: 'client/components/shared/productSwitch/SwitchPaymentInfo.tsx#SwitchPaymentInfo',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/fixtures/productMove.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				H: () => productMovePreviewResponse,
			});
			var productMovePreviewResponse = {
				amountPayableToday: 5,
				supporterPlusPurchaseAmount: 12,
				contributionRefundAmount: -5,
				nextPaymentDate: '2023-03-20',
			};
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
	},
]);
//# sourceMappingURL=7294.68297aa9.iframe.bundle.js.map
