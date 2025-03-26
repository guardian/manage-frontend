'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[1970],
	{
		'./client/components/mma/shared/OverlayLoader.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				E: () => OverlayLoader,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
				_shared_Spinner__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./client/components/shared/Spinner.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			var overlay = (0, _emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(
					'z-index:10000;display:block;border:0 none transparent;overflow-x:hidden;overflow-y:auto;visibility:visible;margin:0;padding:0;-webkit-tap-highlight-color:transparent;position:fixed;left:0;top:0;width:100%;height:100%;text-align:center;',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.Kz0,
					';',
					'',
				),
				overlayDialog = {
					name: '1yrzk9v',
					styles: 'font-size:20px;line-height:28px;position:relative;display:inline-block;color:white;top:50%;transform:translateY(-50%)',
				},
				overlayMessage = {
					name: '1azakc',
					styles: 'text-align:center',
				},
				overlayMessageBackground = {
					name: '1huqgo6',
					styles: 'z-index:-1;position:absolute;top:0;bottom:0;left:0;right:0;background:rgba(0, 0, 0, 0.6)',
				};
			function OverlayLoader(props) {
				return (0,
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.BX)(
					'div',
					{
						css: overlay,
						children: [
							(0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.BX)(
								'div',
								{
									css: overlayDialog,
									children: [
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
											_shared_Spinner__WEBPACK_IMPORTED_MODULE_0__.$,
											{ alignCenter: !0 },
										),
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
											'div',
											{
												css: overlayMessage,
												children: props.message,
											},
										),
									],
								},
							),
							(0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
								'div',
								{ css: overlayMessageBackground },
							),
						],
					},
				);
			}
			try {
				(OverlayLoader.displayName = 'OverlayLoader'),
					(OverlayLoader.__docgenInfo = {
						description: '',
						displayName: 'OverlayLoader',
						props: {
							message: {
								defaultValue: null,
								description: '',
								name: 'message',
								required: !0,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/OverlayLoader.tsx#OverlayLoader'
						] = {
							docgenInfo: OverlayLoader.__docgenInfo,
							name: 'OverlayLoader',
							path: 'client/components/mma/shared/OverlayLoader.tsx#OverlayLoader',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/shared/PaymentFailureAlertIfApplicable.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				T: () => PaymentFailureAlertIfApplicable,
				v: () => augmentPaymentFailureAlertText,
			});
			var _shared_productResponse__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__('./shared/productResponse.ts'),
				_ProblemAlert__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./client/components/mma/shared/ProblemAlert.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			var _ref = { name: '1bkpu5b', styles: 'margin-top:30px' },
				PaymentFailureAlertIfApplicable = (_ref2) => {
					var { isFromApp, productDetails } = _ref2,
						productDetail = (function findPaymentFailureProduct(
							allProductDetails,
						) {
							return allProductDetails.find(
								(product) => !!product.alertText,
							);
						})(productDetails);
					return productDetail && productDetail.alertText
						? (0,
						  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
								_ProblemAlert__WEBPACK_IMPORTED_MODULE_1__.i,
								{
									title: 'A payment needs your attention',
									message: augmentPaymentFailureAlertText(
										productDetail.alertText,
									),
									button: {
										title: 'Update payment method',
										link: '/payment/'.concat(
											(0,
											_shared_productResponse__WEBPACK_IMPORTED_MODULE_0__.Xn)(
												productDetail.tier,
											).urlPart,
										),
										state: { productDetail, isFromApp },
									},
									additionalcss: _ref,
								},
						  )
						: null;
				},
				augmentPaymentFailureAlertText = (alertText) =>
					''.concat(
						alertText,
						' Please check that the payment details shown are up to date.',
					);
			try {
				(PaymentFailureAlertIfApplicable.displayName =
					'PaymentFailureAlertIfApplicable'),
					(PaymentFailureAlertIfApplicable.__docgenInfo = {
						description: '',
						displayName: 'PaymentFailureAlertIfApplicable',
						props: {
							productDetails: {
								defaultValue: null,
								description: '',
								name: 'productDetails',
								required: !0,
								type: { name: 'ProductDetail[]' },
							},
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
							'client/components/mma/shared/PaymentFailureAlertIfApplicable.tsx#PaymentFailureAlertIfApplicable'
						] = {
							docgenInfo:
								PaymentFailureAlertIfApplicable.__docgenInfo,
							name: 'PaymentFailureAlertIfApplicable',
							path: 'client/components/mma/shared/PaymentFailureAlertIfApplicable.tsx#PaymentFailureAlertIfApplicable',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(augmentPaymentFailureAlertText.displayName =
					'augmentPaymentFailureAlertText'),
					(augmentPaymentFailureAlertText.__docgenInfo = {
						description: '',
						displayName: 'augmentPaymentFailureAlertText',
						props: {},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/PaymentFailureAlertIfApplicable.tsx#augmentPaymentFailureAlertText'
						] = {
							docgenInfo:
								augmentPaymentFailureAlertText.__docgenInfo,
							name: 'augmentPaymentFailureAlertText',
							path: 'client/components/mma/shared/PaymentFailureAlertIfApplicable.tsx#augmentPaymentFailureAlertText',
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
		'./client/components/mma/shared/ProblemAlert.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				i: () => ProblemAlert,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_6__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_7__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__deprecated__/colour/palette.js',
					),
				_assets_ErrorIcon__WEBPACK_IMPORTED_MODULE_5__ =
					__webpack_require__(
						'./client/components/mma/shared/assets/ErrorIcon.tsx',
					),
				_Buttons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./client/components/mma/shared/Buttons.tsx',
				),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				ProblemAlert = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
						'div',
						{
							id: 'errorMessage',
							css: (0,
							_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
								'border:4px solid ',
								_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
									.palette.error[400],
								';padding:',
								_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
									.D[5],
								'px ',
								_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
									.D[5],
								'px ',
								_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
									.D[5],
								'px 50px;position:relative;',
								props.additionalcss && props.additionalcss,
								';',
								'',
							),
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
									'i',
									{
										css: (0,
										_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
											'position:absolute;top:',
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
												.D[5],
											'px;left:',
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
												.D[5],
											'px;',
											'',
										),
										children: (0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
											_assets_ErrorIcon__WEBPACK_IMPORTED_MODULE_5__.P,
											{},
										),
									},
								),
								props.title &&
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
										'h4',
										{
											css: (0,
											_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
												_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_6__.Rcn,
												';margin:0;',
												'',
											),
											children: props.title,
										},
									),
								'string' == typeof props.message
									? (0,
									  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
											'p',
											{
												css: (0,
												_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
													'margin:',
													_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
														.D[2],
													'px 0 ',
													props.button
														? ''.concat(
																_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
																	.D[3],
																'px',
														  )
														: '0',
													' 0;',
													_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_6__.Kz0,
													';',
													'',
												),
												children: props.message,
											},
									  )
									: props.message,
								props.button &&
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
										_Buttons__WEBPACK_IMPORTED_MODULE_0__.Q,
										{
											to: props.button.link,
											state: props.button.state,
											text: props.button.title,
											fontWeight: 'bold',
											colour: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
												.palette.brand[400],
											textColour:
												_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_7__
													.n$[100],
										},
									),
							],
						},
					);
			try {
				(ProblemAlert.displayName = 'ProblemAlert'),
					(ProblemAlert.__docgenInfo = {
						description: '',
						displayName: 'ProblemAlert',
						props: {
							title: {
								defaultValue: null,
								description: '',
								name: 'title',
								required: !1,
								type: { name: 'string' },
							},
							message: {
								defaultValue: null,
								description: '',
								name: 'message',
								required: !0,
								type: {
									name: 'string | ReactElement<any, string | JSXElementConstructor<any>>',
								},
							},
							button: {
								defaultValue: null,
								description: '',
								name: 'button',
								required: !1,
								type: { name: 'AlertButtonProps' },
							},
							additionalcss: {
								defaultValue: null,
								description: '',
								name: 'additionalcss',
								required: !1,
								type: { name: 'SerializedStyles' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/ProblemAlert.tsx#ProblemAlert'
						] = {
							docgenInfo: ProblemAlert.__docgenInfo,
							name: 'ProblemAlert',
							path: 'client/components/mma/shared/ProblemAlert.tsx#ProblemAlert',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/shared/assets/LoadingCircleIcon.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				U: () => LoadingCircleIcon,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				lightblueStyles = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'stroke:#a5c0e8;stroke-width:',
					50,
					';fill:transparent;',
					'',
				),
				darkblueStyles = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'stroke:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.palette.brand[400],
					';stroke-dasharray:820;stroke-dashoffset:820;stroke-width:',
					50,
					';fill:transparent;',
					'',
				),
				LoadingCircleIcon = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
						'svg',
						{
							width: '300',
							height: '300',
							viewBox: '0 0 300 300',
							css: props.additionalCss,
							children: (0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.BX)(
								'g',
								{
									children: [
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
											'animateTransform',
											{
												attributeName: 'transform',
												attributeType: 'XML',
												type: 'rotate',
												from: '0 150 150',
												to: '360 150 150',
												dur: '2.5s',
												repeatCount: 'indefinite',
											},
										),
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
											'circle',
											{
												cx: '150',
												cy: '150',
												r: '126',
												css: lightblueStyles,
											},
										),
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
											'path',
											{
												css: darkblueStyles,
												d: 'M150,150 m0,-126 a 126,126 0 0,1 0,252 a 126,126 0 0,1 0,-252',
												children: (0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
													'animate',
													{
														attributeName:
															'stroke-dashoffset',
														dur: '3.5s',
														to: '-820',
														repeatCount:
															'indefinite',
													},
												),
											},
										),
									],
								},
							),
						},
					);
			try {
				(LoadingCircleIcon.displayName = 'LoadingCircleIcon'),
					(LoadingCircleIcon.__docgenInfo = {
						description: '',
						displayName: 'LoadingCircleIcon',
						props: {
							additionalCss: {
								defaultValue: null,
								description: '',
								name: 'additionalCss',
								required: !1,
								type: { name: 'SerializedStyles' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/assets/LoadingCircleIcon.tsx#LoadingCircleIcon'
						] = {
							docgenInfo: LoadingCircleIcon.__docgenInfo,
							name: 'LoadingCircleIcon',
							path: 'client/components/mma/shared/assets/LoadingCircleIcon.tsx#LoadingCircleIcon',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/paymentUpdate/UpdatePayment.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					GuardianWeeklyCard: () => GuardianWeeklyCard,
					GuardianWeeklyExpiredCard: () => GuardianWeeklyExpiredCard,
					NewspaperVoucherPaypal: () => NewspaperVoucherPaypal,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => UpdatePayment_stories,
				});
			var ReactRouterDecorator = __webpack_require__(
					'./.storybook/ReactRouterDecorator.tsx',
				),
				productTypes = __webpack_require__('./shared/productTypes.ts'),
				testProducts = __webpack_require__(
					'./client/fixtures/productBuilder/testProducts.ts',
				),
				emotion_react_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
				),
				palette = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
				),
				typography = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
				),
				mq = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
				),
				space = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
				),
				Radio = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/radio/Radio.js',
				),
				RadioGroup = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/radio/RadioGroup.js',
				),
				Button = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/button/Button.js',
				),
				SvgArrowRightStraight = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgArrowRightStraight.js',
				),
				ErrorSummary = __webpack_require__(
					'./node_modules/@guardian/source-development-kitchen/dist/react-components/summary/ErrorSummary.js',
				),
				esm = __webpack_require__(
					'./node_modules/@sentry/minimal/esm/index.js',
				),
				react = __webpack_require__('./node_modules/react/index.js'),
				react_router = __webpack_require__(
					'./node_modules/react-router/index.js',
				),
				identity = __webpack_require__('./shared/identity.ts'),
				productResponse = __webpack_require__(
					'./shared/productResponse.ts',
				),
				analytics = __webpack_require__(
					'./client/utilities/analytics.ts',
				),
				productUtils = __webpack_require__(
					'./client/utilities/productUtils.ts',
				),
				pure = __webpack_require__(
					'./node_modules/@stripe/stripe-js/pure.js',
				);
			var useStripeSDK = (stripeKey) => {
					var [stripeObjects, setStripeObjects] = (0, react.useState)(
						null,
					);
					return (
						(0, react.useEffect)(() => {
							null === stripeObjects &&
								(document.querySelector(
									"script[src^='https://js.stripe.com']",
								) ||
									pure.loadStripe.setLoadParameters({
										advancedFraudSignals: !1,
									}),
								(0, pure.loadStripe)(stripeKey).then(
									(newStripe) => {
										setStripeObjects(newStripe);
									},
								));
						}, [stripeKey, stripeObjects]),
						stripeObjects
					);
				},
				utils = __webpack_require__('./client/utilities/utils.ts'),
				GenericErrorScreen = __webpack_require__(
					'./client/components/shared/GenericErrorScreen.tsx',
				),
				SupportTheGuardianButton = __webpack_require__(
					'./client/components/shared/SupportTheGuardianButton.tsx',
				),
				DirectDebitLogo = __webpack_require__(
					'./client/components/mma/shared/assets/DirectDebitLogo.tsx',
				),
				CardDisplay = __webpack_require__(
					'./client/components/mma/shared/CardDisplay.tsx',
				),
				OverlayLoader = __webpack_require__(
					'./client/components/mma/shared/OverlayLoader.tsx',
				),
				PaymentFailureAlertIfApplicable = __webpack_require__(
					'./client/components/mma/shared/PaymentFailureAlertIfApplicable.tsx',
				),
				react_stripe_umd = __webpack_require__(
					'./node_modules/@stripe/react-stripe-js/dist/react-stripe.umd.js',
				),
				LoadingCircleIcon = __webpack_require__(
					'./client/components/mma/shared/assets/LoadingCircleIcon.tsx',
				),
				focus_style_manager = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/accessibility/focus-style-manager.js',
				),
				colour_palette = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__deprecated__/colour/palette.js',
				),
				focus_halo = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/accessibility/focus-halo.js',
				),
				InlineError = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/user-feedback/InlineError.js',
				),
				emotion_react_jsx_runtime_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				);
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
			focus_style_manager.$.onlyShowFocusOnTabs();
			var _ref = {
					name: '1awpud7',
					styles: 'margin-bottom:-5px;margin-top:3px',
				},
				_ref2 = {
					name: 'nihrud',
					styles: 'display:flex;justify-content:space-between;align-items:end',
				};
			class FieldWrapper extends react.Component {
				constructor(props) {
					super(props),
						_defineProperty(
							this,
							'validateField',
							(otherOnChange) => (field) => {
								var _field$error;
								otherOnChange && otherOnChange(field),
									this.setState({
										error:
											null !==
												(_field$error = field.error) &&
											void 0 !== _field$error &&
											_field$error.message
												? field.error
												: {},
									});
							},
						),
						_defineProperty(this, 'toggleFocus', () => {
							this.setState({ focus: !this.state.focus });
						}),
						(this.state = { error: {}, focus: !1 });
				}
				render() {
					var _this$state$error,
						_this$state$error2,
						borderCss,
						hydratedChildren = react.Children.map(
							this.props.children,
							(child) =>
								react.cloneElement(child, {
									onChange: this.validateField(
										this.props.onChange,
									),
									onFocus: this.toggleFocus,
									onBlur: this.toggleFocus,
								}),
						);
					return (
						(borderCss =
							null !== (_this$state$error = this.state.error) &&
							void 0 !== _this$state$error &&
							_this$state$error.message
								? '4px solid ' + colour_palette.vU[400]
								: '2px solid ' + palette.palette.neutral[60]),
						(0, emotion_react_jsx_runtime_browser_esm.BX)('div', {
							css: (0, emotion_react_browser_esm.iv)(
								{
									width: this.props.width,
									maxWidth: '100%',
									marginBottom: '10px',
									textAlign: 'left',
									':not(:first-of-type)': {
										marginLeft: '20px',
									},
								},
								'',
								'',
							),
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'div',
									{
										css: this.props.cornerHint ? _ref2 : '',
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'div',
												{
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'label',
															{
																css: (0,
																emotion_react_browser_esm.iv)(
																	typography.Rcn,
																	';color:',
																	palette
																		.palette
																		.neutral[7],
																	';',
																	'',
																),
																children:
																	this.props
																		.label,
															},
														),
														(null ===
															(_this$state$error2 =
																this.state
																	.error) ||
														void 0 ===
															_this$state$error2
															? void 0
															: _this$state$error2.message) &&
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																InlineError.b,
																{
																	cssOverrides:
																		_ref,
																	children:
																		this
																			.state
																			.error
																			.message,
																},
															),
													],
												},
											),
											this.props.cornerHint &&
												this.props.cornerHint,
										],
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'div',
									{
										css: (0, emotion_react_browser_esm.iv)(
											'border:',
											borderCss,
											';display:block;font-weight:400;margin-top:3px;line-height:20px;padding:10px;width:100%;transition:all 0.2s ease-in-out;',
											this.state.focus && focus_halo.y,
											';',
											'',
										),
										children: hydratedChildren,
									},
								),
							],
						})
					);
				}
			}
			try {
				(FieldWrapper.displayName = 'FieldWrapper'),
					(FieldWrapper.__docgenInfo = {
						description: '',
						displayName: 'FieldWrapper',
						props: {
							label: {
								defaultValue: null,
								description: '',
								name: 'label',
								required: !0,
								type: { name: 'string' },
							},
							width: {
								defaultValue: null,
								description: '',
								name: 'width',
								required: !0,
								type: { name: 'string' },
							},
							cornerHint: {
								defaultValue: null,
								description: '',
								name: 'cornerHint',
								required: !1,
								type: { name: 'Element' },
							},
							onChange: {
								defaultValue: null,
								description: '',
								name: 'onChange',
								required: !1,
								type: {
									name: '((event: FieldChangeEvent) => void)',
								},
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/paymentUpdate/FieldWrapper.tsx#FieldWrapper'
						] = {
							docgenInfo: FieldWrapper.__docgenInfo,
							name: 'FieldWrapper',
							path: 'client/components/mma/paymentUpdate/FieldWrapper.tsx#FieldWrapper',
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
								FlexCardElement_defineProperty(e, r, t[r]);
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
			function FlexCardElement_defineProperty(obj, key, value) {
				return (
					(key = (function FlexCardElement_toPropertyKey(arg) {
						var key = (function FlexCardElement_toPrimitive(
							input,
							hint,
						) {
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
			var baseStyle = {
					base: _objectSpread(
						_objectSpread({}, { textSans17Object: typography.SPg }),
						{},
						{
							'::placeholder': { color: '#c4c4c4' },
							':-ms-input-placeholder': { color: '#c4c4c4' },
						},
					),
				},
				FlexCardElement_ref = { name: 'zjik7', styles: 'display:flex' },
				FlexCardElement = (props) =>
					(0, emotion_react_jsx_runtime_browser_esm.tZ)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: (0,
							emotion_react_jsx_runtime_browser_esm.BX)('div', {
								css: (0, emotion_react_browser_esm.iv)(
									'margin-top:',
									space.D[9],
									'px;margin-bottom:',
									space.D[9],
									'px;textalign:left;',
									'',
								),
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										FieldWrapper,
										{
											width: '100%',
											label: 'Card Number',
											cornerHint: (0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'div',
												{
													css: FlexCardElement_ref,
													children: getLogos(
														PaymentMethod.Card,
													),
												},
											),
											children: (0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'span',
												{
													'data-qm-masking':
														'blocklist',
													children: (0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														react_stripe_umd.CardNumberElement,
														{
															options: {
																style: baseStyle,
																placeholder:
																	'•••• •••• •••• ••••',
															},
															onReady:
																props.setCardNumberElement,
														},
													),
												},
											),
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'div',
										{
											css: (0,
											emotion_react_browser_esm.iv)(
												'display:flex;justify-content:flex-start;',
												mq.Dp.tablet,
												'{margin-top:',
												space.D[4],
												'px;}',
												'',
											),
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													FieldWrapper,
													{
														width: '50%',
														label: 'Expiry Date',
														children: (0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'span',
															{
																'data-qm-masking':
																	'blocklist',
																children: (0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	react_stripe_umd.CardExpiryElement,
																	{
																		options:
																			{
																				style: baseStyle,
																				placeholder:
																					'MM/YY',
																			},
																		onReady:
																			props.setCardExpiryElement,
																	},
																),
															},
														),
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													FieldWrapper,
													{
														width: '50%',
														label: 'CVC',
														children: (0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'span',
															{
																'data-qm-masking':
																	'blocklist',
																children: (0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	react_stripe_umd.CardCvcElement,
																	{
																		options:
																			{
																				style: baseStyle,
																				placeholder:
																					'123',
																			},
																		onReady:
																			props.setCardCVCElement,
																	},
																),
															},
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
			try {
				(FlexCardElement.displayName = 'FlexCardElement'),
					(FlexCardElement.__docgenInfo = {
						description: '',
						displayName: 'FlexCardElement',
						props: {
							disabled: {
								defaultValue: null,
								description: '',
								name: 'disabled',
								required: !1,
								type: { name: 'boolean' },
							},
							setCardNumberElement: {
								defaultValue: null,
								description: '',
								name: 'setCardNumberElement',
								required: !0,
								type: {
									name: 'Dispatch<SetStateAction<StripeElementBase | undefined>>',
								},
							},
							setCardExpiryElement: {
								defaultValue: null,
								description: '',
								name: 'setCardExpiryElement',
								required: !0,
								type: {
									name: 'Dispatch<SetStateAction<StripeElementBase | undefined>>',
								},
							},
							setCardCVCElement: {
								defaultValue: null,
								description: '',
								name: 'setCardCVCElement',
								required: !0,
								type: {
									name: 'Dispatch<SetStateAction<StripeElementBase | undefined>>',
								},
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/paymentUpdate/card/FlexCardElement.tsx#FlexCardElement'
						] = {
							docgenInfo: FlexCardElement.__docgenInfo,
							name: 'FlexCardElement',
							path: 'client/components/mma/paymentUpdate/card/FlexCardElement.tsx#FlexCardElement',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			function NewCardPaymentMethodDetail_defineProperty(
				obj,
				key,
				value,
			) {
				return (
					(key = (function NewCardPaymentMethodDetail_toPropertyKey(
						arg,
					) {
						var key =
							(function NewCardPaymentMethodDetail_toPrimitive(
								input,
								hint,
							) {
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
			function isSubscriptionWithCard(subscription) {
				return void 0 !== subscription && void 0 !== subscription.card;
			}
			class NewCardPaymentMethodDetail {
				constructor(stripePaymentMethod, stripePublicKeyForUpdate) {
					NewCardPaymentMethodDetail_defineProperty(
						this,
						'apiUrlPart',
						'card',
					),
						NewCardPaymentMethodDetail_defineProperty(
							this,
							'name',
							'card',
						),
						NewCardPaymentMethodDetail_defineProperty(
							this,
							'friendlyName',
							'payment card',
						),
						NewCardPaymentMethodDetail_defineProperty(
							this,
							'paymentFailureRecoveryMessage',
							'We will take the outstanding payment within 24 hours, using your new card details.',
						),
						NewCardPaymentMethodDetail_defineProperty(
							this,
							'subHasExpectedPaymentType',
							isSubscriptionWithCard,
						),
						NewCardPaymentMethodDetail_defineProperty(
							this,
							'detailToPayloadObject',
							() => ({
								stripePaymentMethodID:
									this.stripePaymentMethod.id,
								stripePublicKey: this.stripePublicKeyForUpdate,
							}),
						),
						NewCardPaymentMethodDetail_defineProperty(
							this,
							'matchesResponse',
							(response) =>
								response.last4 ===
								this.stripePaymentMethod.card.last4,
						),
						NewCardPaymentMethodDetail_defineProperty(
							this,
							'render',
							(subscription) =>
								isSubscriptionWithCard(subscription)
									? (0,
									  emotion_react_jsx_runtime_browser_esm.tZ)(
											CardDisplay.V,
											{
												last4: subscription.card.last4,
												type: subscription.card.type,
											},
									  )
									: (0,
									  emotion_react_jsx_runtime_browser_esm.tZ)(
											CardDisplay.V,
											{
												last4: this.stripePaymentMethod
													.card.last4,
												type: this.stripePaymentMethod
													.card.brand,
											},
									  ),
						),
						NewCardPaymentMethodDetail_defineProperty(
							this,
							'confirmButtonWrapper',
							(confirmButton) => confirmButton,
						),
						(this.stripePaymentMethod = stripePaymentMethod),
						(this.stripePublicKeyForUpdate =
							stripePublicKeyForUpdate);
				}
			}
			var hrefStyle = {
					textDecoration: 'underline',
					color: 'inherit',
					':visited': { color: 'inherit' },
				},
				Recaptcha_ref2 = { name: '1soh0gv', styles: 'margin-top:4px' };
			function Recaptcha(_ref) {
				var { setStripeSetupIntent, setRecaptchaToken } = _ref;
				return (
					(0, react.useEffect)(() => {
						var renderReCaptcha = () => {
								var _window$guardian;
								window.grecaptcha.render('recaptcha', {
									sitekey:
										null ===
											(_window$guardian =
												window.guardian) ||
										void 0 === _window$guardian
											? void 0
											: _window$guardian.recaptchaPublicKey,
									callback: (recaptchaToken) =>
										setRecaptchaToken(recaptchaToken),
									'expired-callback': resetRecaptcha,
								});
							},
							resetRecaptcha = () => {
								setStripeSetupIntent(null),
									setRecaptchaToken(void 0);
							};
						if (window.grecaptcha) renderReCaptcha();
						else {
							var script = document.createElement('script');
							script.setAttribute(
								'src',
								'https://www.google.com/recaptcha/api.js?onload=v2ReCaptchaOnLoadCallback&render=explicit',
							),
								(window.v2ReCaptchaOnLoadCallback =
									renderReCaptcha),
								document.head.appendChild(script);
						}
					}, [setRecaptchaToken, setStripeSetupIntent]),
					(0, emotion_react_jsx_runtime_browser_esm.BX)('div', {
						css: (0, emotion_react_browser_esm.iv)(
							{ marginBottom: ''.concat(space.D[9], 'px') },
							'',
							'',
						),
						children: [
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								'span',
								{
									css: (0, emotion_react_browser_esm.iv)(
										typography.Rcn,
										';',
										'',
									),
									children: 'Security check',
								},
							),
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								'div',
								{ css: Recaptcha_ref2, id: 'recaptcha' },
							),
							(0, emotion_react_jsx_runtime_browser_esm.BX)('p', {
								css: (0, emotion_react_browser_esm.iv)(
									'width:300px;margin-top:',
									space.D[3],
									'px;',
									typography.AjP,
									';',
									'',
								),
								children: [
									'By ticking this box, you agree to let Google perform a security check to confirm you are a human. Please refer to their',
									' ',
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'a',
										{
											href: 'https://policies.google.com/terms',
											rel: 'noreferrer',
											target: '_blank',
											css: hrefStyle,
											children: 'terms',
										},
									),
									' ',
									'and',
									' ',
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'a',
										{
											href: 'https://policies.google.com/privacy',
											rel: 'noreferrer',
											target: '_blank',
											css: hrefStyle,
											children: 'privacy',
										},
									),
									' ',
									'policies.',
								],
							}),
						],
					})
				);
			}
			try {
				(Recaptcha.displayName = 'Recaptcha'),
					(Recaptcha.__docgenInfo = {
						description: '',
						displayName: 'Recaptcha',
						props: {
							setStripeSetupIntent: {
								defaultValue: null,
								description: '',
								name: 'setStripeSetupIntent',
								required: !0,
								type: { name: '(_: null) => void' },
							},
							setRecaptchaToken: {
								defaultValue: null,
								description: '',
								name: 'setRecaptchaToken',
								required: !0,
								type: {
									name: '(_: string | undefined) => void',
								},
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/paymentUpdate/card/Recaptcha.tsx#Recaptcha'
						] = {
							docgenInfo: Recaptcha.__docgenInfo,
							name: 'Recaptcha',
							path: 'client/components/mma/paymentUpdate/card/Recaptcha.tsx#Recaptcha',
						});
			} catch (__react_docgen_typescript_loader_error) {}
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
			function _asyncToGenerator(fn) {
				return function () {
					var self = this,
						args = arguments;
					return new Promise(function (resolve, reject) {
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
			}
			var stripeCardInputForm_ref = {
					name: '1cwazio',
					styles: 'padding:3px',
				},
				_ref3 = {
					name: '1f3egm3',
					styles: 'display:flex;flex-wrap:wrap;justify-content:space-between',
				},
				StripeCardInputForm = (props) => {
					var [isValidating, setIsValidating] = (0, react.useState)(
							!1,
						),
						[stripeSetupIntent, setStripeSetupIntent] = (0,
						react.useState)(),
						[stripeSetupIntentError, setStripeSetupIntentError] =
							(0, react.useState)(),
						[cardNumberElement, setCardNumberElement] = (0,
						react.useState)(),
						[cardExpiryElement, setCardExpiryElement] = (0,
						react.useState)(),
						[cardCVCElement, setCardCVCElement] = (0,
						react.useState)(),
						[error, setError] = (0, react.useState)({}),
						elements = (0, react_stripe_umd.useElements)(),
						stripe = (0, react_stripe_umd.useStripe)(),
						[recaptchaToken, setRecaptchaToken] = (0,
						react.useState)(void 0),
						loadSetupIntent = () =>
							fetch('/api/payment/card', {
								method: 'POST',
								credentials: 'include',
								headers: {
									'X-Gu-Stripe-Public-Key':
										props.stripeApiKey,
								},
								body: recaptchaToken,
							})
								.then(
									(function () {
										var _ref2 = _asyncToGenerator(
											function* (response) {
												if (response.ok)
													return yield response.json();
												var locationHeaderValue =
													response.headers.get(
														'Location',
													);
												if (
													401 === response.status &&
													locationHeaderValue
												)
													return (
														window.location.replace(
															locationHeaderValue,
														),
														null
													);
												throw new Error(
													'Failed to load SetupIntent : '
														.concat(
															response.status,
															' ',
														)
														.concat(
															response.statusText,
															' : ',
														)
														.concat(
															yield response.text(),
														),
												);
											},
										);
										return function (_x) {
											return _ref2.apply(this, arguments);
										};
									})(),
								)
								.then((setupIntent) => setupIntent)
								.catch(
									(error) => (
										esm.Tb(error),
										setStripeSetupIntentError(error),
										null
									),
								);
					function _startCardUpdate() {
						return (_startCardUpdate = _asyncToGenerator(
							function* () {
								setIsValidating(!0);
								var setupIntent,
									cardElement =
										null == elements
											? void 0
											: elements.getElement(
													react_stripe_umd.CardNumberElement,
											  );
								if (!cardElement)
									return (
										esm.Tb('StripeElements returning null'),
										setError({
											message:
												'Something went wrong, please check the details and try again.',
										}),
										void setIsValidating(!1)
									);
								if (!recaptchaToken)
									return (
										setIsValidating(!1),
										void setError({
											message:
												'Recaptcha has not been completed',
										})
									);
								if (
									(stripeSetupIntent
										? (setupIntent = stripeSetupIntent)
										: ((setupIntent =
												yield loadSetupIntent()),
										  setStripeSetupIntent(setupIntent)),
									stripe && setupIntent)
								) {
									var createPaymentMethodResult =
										yield stripe.createPaymentMethod({
											type: 'card',
											card: cardElement,
											billing_details: {
												name: props.userEmail,
												email: props.userEmail,
											},
										});
									if (
										!(
											createPaymentMethodResult &&
											createPaymentMethodResult.paymentMethod &&
											createPaymentMethodResult
												.paymentMethod.id &&
											createPaymentMethodResult
												.paymentMethod.card &&
											createPaymentMethodResult
												.paymentMethod.card.brand &&
											createPaymentMethodResult
												.paymentMethod.card.last4
										)
									)
										return (
											esm.Tb(
												createPaymentMethodResult.error ||
													'something missing from the createPaymentMethod response',
											),
											setError(
												createPaymentMethodResult.error || {
													message:
														'Something went wrong, please check the details and try again.',
												},
											),
											void setIsValidating(!1)
										);
									var intentResult =
										yield stripe.confirmCardSetup(
											setupIntent.client_secret,
											{
												payment_method:
													createPaymentMethodResult
														.paymentMethod.id,
											},
										);
									if (
										intentResult.setupIntent &&
										intentResult.setupIntent.status &&
										'succeeded' ===
											intentResult.setupIntent.status
									) {
										setIsValidating(!1);
										var newPaymentMethodDetail =
											new NewCardPaymentMethodDetail(
												createPaymentMethodResult.paymentMethod,
												props.stripeApiKey,
											);
										props.newPaymentMethodDetailUpdater(
											newPaymentMethodDetail,
										),
											props.executePaymentUpdate(
												newPaymentMethodDetail,
											);
									} else
										esm.Tb(
											intentResult.error ||
												'something missing from the SetupIntent response',
										),
											setError(
												intentResult.error || {
													message:
														'Something went wrong, please check the details and try again.',
												},
											),
											setIsValidating(!1);
								}
							},
						)).apply(this, arguments);
					}
					return stripeSetupIntentError
						? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
								GenericErrorScreen.c,
								{ loggingMessage: 'error loading SetupIntent' },
						  )
						: (0, emotion_react_jsx_runtime_browser_esm.BX)(
								emotion_react_jsx_runtime_browser_esm.HY,
								{
									children: [
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											FlexCardElement,
											{
												setCardNumberElement,
												setCardExpiryElement,
												setCardCVCElement,
											},
										),
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											Recaptcha,
											{
												setRecaptchaToken,
												setStripeSetupIntent,
											},
										),
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'div',
											{
												css: (0,
												emotion_react_browser_esm.iv)(
													{
														marginBottom: ''.concat(
															space.D[12],
															'px',
														),
														width: '500px',
														maxWidth: '100%',
													},
													'',
													'',
												),
												children: (0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'div',
													{
														css: _ref3,
														children: (0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'div',
															{
																css: (0,
																emotion_react_browser_esm.iv)(
																	{
																		[mq.C4
																			.mobileLandscape]:
																			{
																				width: '100%',
																			},
																	},
																	'',
																	'',
																),
																children: (0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	Button.z,
																	{
																		disabled:
																			isValidating ||
																			!(() =>
																				stripe &&
																				cardNumberElement &&
																				cardExpiryElement &&
																				cardCVCElement),
																		priority:
																			'primary',
																		onClick:
																			function startCardUpdate() {
																				return _startCardUpdate.apply(
																					this,
																					arguments,
																				);
																			},
																		icon: isValidating
																			? (0,
																			  emotion_react_jsx_runtime_browser_esm.tZ)(
																					LoadingCircleIcon.U,
																					{
																						additionalCss:
																							stripeCardInputForm_ref,
																					},
																			  )
																			: (0,
																			  emotion_react_jsx_runtime_browser_esm.tZ)(
																					SvgArrowRightStraight.l,
																					{},
																			  ),
																		iconSide:
																			'right',
																		children:
																			'Update payment method',
																	},
																),
															},
														),
													},
												),
											},
										),
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'div',
											{
												css: (0,
												emotion_react_browser_esm.iv)(
													'margin-top:',
													space.D[9],
													'px;margin-bottom:',
													space.D[9],
													'px;',
													'',
												),
												children:
													error && error.message
														? error.message
																.split('.')
																.filter(
																	(_) =>
																		_.trim()
																			.length,
																)
																.map(
																	(
																		sentence,
																		index,
																	) => {
																		var sentenceEnd =
																			sentence.includes(
																				'.',
																			)
																				? ''
																				: '.';
																		return (0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'div',
																			{
																				css: (0,
																				emotion_react_browser_esm.iv)(
																					'margin-top:',
																					space
																						.D[4],
																					'px;:first-of-type{margin-top:0;}',
																					'',
																				),
																				children:
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						ErrorSummary.X,
																						{
																							message:
																								sentence +
																								sentenceEnd,
																						},
																					),
																			},
																			index,
																		);
																	},
																)
														: null,
											},
										),
									],
								},
						  );
				};
			try {
				(StripeCardInputForm.displayName = 'StripeCardInputForm'),
					(StripeCardInputForm.__docgenInfo = {
						description: '',
						displayName: 'StripeCardInputForm',
						props: {
							stripeApiKey: {
								defaultValue: null,
								description: '',
								name: 'stripeApiKey',
								required: !0,
								type: { name: 'string' },
							},
							userEmail: {
								defaultValue: null,
								description: '',
								name: 'userEmail',
								required: !1,
								type: { name: 'string' },
							},
							newPaymentMethodDetailUpdater: {
								defaultValue: null,
								description: '',
								name: 'newPaymentMethodDetailUpdater',
								required: !0,
								type: {
									name: '(newPaymentMethodDetail: NewPaymentMethodDetail) => void',
								},
							},
							executePaymentUpdate: {
								defaultValue: null,
								description: '',
								name: 'executePaymentUpdate',
								required: !0,
								type: {
									name: '(newPaymentMethodDetail: NewPaymentMethodDetail) => Promise<unknown>',
								},
							},
							stripeSetupIntent: {
								defaultValue: null,
								description: '',
								name: 'stripeSetupIntent',
								required: !1,
								type: { name: 'StripeSetupIntent' },
							},
							stripeSetupIntentError: {
								defaultValue: null,
								description: '',
								name: 'stripeSetupIntentError',
								required: !1,
								type: { name: 'Error' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/paymentUpdate/card/stripeCardInputForm.tsx#StripeCardInputForm'
						] = {
							docgenInfo: StripeCardInputForm.__docgenInfo,
							name: 'StripeCardInputForm',
							path: 'client/components/mma/paymentUpdate/card/stripeCardInputForm.tsx#StripeCardInputForm',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			function CardInputForm_ownKeys(e, r) {
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
			function CardInputForm_objectSpread(e) {
				for (var r = 1; r < arguments.length; r++) {
					var t = null != arguments[r] ? arguments[r] : {};
					r % 2
						? CardInputForm_ownKeys(Object(t), !0).forEach(
								function (r) {
									CardInputForm_defineProperty(e, r, t[r]);
								},
						  )
						: Object.getOwnPropertyDescriptors
						? Object.defineProperties(
								e,
								Object.getOwnPropertyDescriptors(t),
						  )
						: CardInputForm_ownKeys(Object(t)).forEach(function (
								r,
						  ) {
								Object.defineProperty(
									e,
									r,
									Object.getOwnPropertyDescriptor(t, r),
								);
						  });
				}
				return e;
			}
			function CardInputForm_defineProperty(obj, key, value) {
				return (
					(key = (function CardInputForm_toPropertyKey(arg) {
						var key = (function CardInputForm_toPrimitive(
							input,
							hint,
						) {
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
			var CardInputForm = (props) => {
				var stripePromise = useStripeSDK(props.stripeApiKey);
				return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
					emotion_react_jsx_runtime_browser_esm.HY,
					{
						children: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							react_stripe_umd.Elements,
							{
								stripe: stripePromise,
								options: {
									fonts: [
										{
											src: 'url(https://interactive.guim.co.uk/fonts/guss-webfonts/GuardianTextSansWeb/GuardianTextSansWeb-Regular.woff2)',
											family: 'Guardian Text Sans Web',
											style: 'normal',
										},
									],
								},
								children: (0,
								emotion_react_jsx_runtime_browser_esm.tZ)(
									StripeCardInputForm,
									CardInputForm_objectSpread({}, props),
								),
							},
						),
					},
				);
			};
			try {
				(CardInputForm.displayName = 'CardInputForm'),
					(CardInputForm.__docgenInfo = {
						description: '',
						displayName: 'CardInputForm',
						props: {
							stripeApiKey: {
								defaultValue: null,
								description: '',
								name: 'stripeApiKey',
								required: !0,
								type: { name: 'string' },
							},
							userEmail: {
								defaultValue: null,
								description: '',
								name: 'userEmail',
								required: !1,
								type: { name: 'string' },
							},
							newPaymentMethodDetailUpdater: {
								defaultValue: null,
								description: '',
								name: 'newPaymentMethodDetailUpdater',
								required: !0,
								type: {
									name: '(newPaymentMethodDetail: NewPaymentMethodDetail) => void',
								},
							},
							executePaymentUpdate: {
								defaultValue: null,
								description: '',
								name: 'executePaymentUpdate',
								required: !0,
								type: {
									name: '(newPaymentMethodDetail: NewPaymentMethodDetail) => Promise<unknown>',
								},
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/paymentUpdate/card/CardInputForm.tsx#CardInputForm'
						] = {
							docgenInfo: CardInputForm.__docgenInfo,
							name: 'CardInputForm',
							path: 'client/components/mma/paymentUpdate/card/CardInputForm.tsx#CardInputForm',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var privacyNoticeLinkCss = (0, emotion_react_browser_esm.iv)(
					'color:',
					palette.palette.brand[500],
					';text-decoration:underline;',
					'',
				),
				ContactUs_ref = {
					name: 'com11v',
					styles: 'width:16px;height:16px;transform:translate(-14.5px, 2.5px)',
				},
				ContactUs = () =>
					(0, emotion_react_jsx_runtime_browser_esm.BX)('p', {
						css: (0, emotion_react_browser_esm.iv)(
							'width:100%;border-top:1px solid ',
							palette.palette.neutral[86],
							';',
							typography.Kz0,
							';color:',
							palette.palette.neutral[46],
							';margin:0;padding-top:',
							space.D[4],
							'px;',
							mq.Dp.tablet,
							'{padding-top:',
							space.D[9],
							'px;}',
							'',
						),
						children: [
							'Are you experiencing difficulties switching your payment method?',
							' ',
							(0, emotion_react_jsx_runtime_browser_esm.BX)('a', {
								css: privacyNoticeLinkCss,
								href: '/help-centre',
								children: [
									'Contact Us    ',
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'svg',
										{
											css: ContactUs_ref,
											viewBox: '0 0 30 30',
											xmlns: 'http://www.w3.org/2000/svg',
											children: (0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'path',
												{
													fill: '#007ABC',
													fillRule: 'evenodd',
													clipRule: 'evenodd',
													d: 'M9.975 4L9 4.95L17.325 14.925L9 24.8999L9.975 25.8499L20.375 15.45V14.4L9.975 4Z',
												},
											),
										},
									),
								],
							}),
						],
					}),
				PaypalLogo = __webpack_require__(
					'./client/components/mma/shared/assets/PaypalLogo.tsx',
				),
				DirectDebitDisplay = __webpack_require__(
					'./client/components/mma/shared/DirectDebitDisplay.tsx',
				),
				PaypalDisplay = __webpack_require__(
					'./client/components/mma/shared/PaypalDisplay.tsx',
				);
			function CurrentPaymentDetail_ownKeys(e, r) {
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
			function CurrentPaymentDetail_objectSpread(e) {
				for (var r = 1; r < arguments.length; r++) {
					var t = null != arguments[r] ? arguments[r] : {};
					r % 2
						? CurrentPaymentDetail_ownKeys(Object(t), !0).forEach(
								function (r) {
									CurrentPaymentDetail_defineProperty(
										e,
										r,
										t[r],
									);
								},
						  )
						: Object.getOwnPropertyDescriptors
						? Object.defineProperties(
								e,
								Object.getOwnPropertyDescriptors(t),
						  )
						: CurrentPaymentDetail_ownKeys(Object(t)).forEach(
								function (r) {
									Object.defineProperty(
										e,
										r,
										Object.getOwnPropertyDescriptor(t, r),
									);
								},
						  );
				}
				return e;
			}
			function CurrentPaymentDetail_defineProperty(obj, key, value) {
				return (
					(key = (function CurrentPaymentDetail_toPropertyKey(arg) {
						var key = (function CurrentPaymentDetail_toPrimitive(
							input,
							hint,
						) {
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
			var CurrentPaymentDetail_ref = {
					name: 'z06qs',
					styles: 'list-style:none;margin:0;padding:0',
				},
				CurrentPaymentDetails = (productDetail) => {
					var year,
						month,
						{ subscription } = productDetail,
						mainPlan = (0, productResponse.fr)(subscription),
						hasCancellationPending = subscription.cancelledAt,
						specificProductType = (0, productResponse.Xn)(
							productDetail.tier,
						),
						keyValuePairCss = CurrentPaymentDetail_ref,
						keyCss = (0, emotion_react_browser_esm.iv)(
							typography.Rcn,
							';padding:0 ',
							space.D[2],
							'px 0 0;display:inline-block;vertical-align:top;width:14ch;',
							'',
						),
						valueCss = (0, emotion_react_browser_esm.iv)(
							typography.Kz0,
							';padding:0;display:inline-block;vertical-align:top;width:calc(100% - 15ch);text-align:right;',
							mq.Dp.tablet,
							'{text-align:left;}',
							'',
						),
						hasPaymentFailure = !!productDetail.alertText;
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						'div',
						{
							css: (0, emotion_react_browser_esm.iv)(
								'border:1px solid ',
								palette.palette.neutral[86],
								';margin-bottom:',
								space.D[4],
								'px;',
								'',
							),
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'div',
									{
										css: (0, emotion_react_browser_esm.iv)(
											'display:flex;justify-content:space-between;align-items:start;background-color:',
											hasCancellationPending
												? palette.palette.neutral[97]
												: palette.palette.brand[400],
											';',
											mq.Dp.mobileLandscape,
											'{align-items:center;}',
											'',
										),
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'h2',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														'font-size:17px;font-weight:bold;margin:0;padding:',
														space.D[3],
														'px;color:',
														hasCancellationPending
															? palette.palette
																	.neutral[7]
															: palette.palette
																	.neutral[100],
														';',
														mq.C4.mobileLandscape,
														'{padding:',
														space.D[3],
														'px;}',
														mq.Dp.tablet,
														'{font-size:20px;padding:',
														space.D[3],
														'px ',
														space.D[5],
														'px;}',
														'',
													),
													children:
														specificProductType.productTitle(
															mainPlan,
														),
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'div',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														'display:flex;align-items:center;padding:',
														space.D[3],
														'px 0;',
														mq.C4.mobileLandscape,
														'{flex-direction:column;align-items:end;}',
														'',
													),
												},
											),
										],
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'div',
									{
										css: (0, emotion_react_browser_esm.iv)(
											'padding:',
											space.D[5],
											'px ',
											space.D[3],
											'px;',
											mq.Dp.tablet,
											'{padding:',
											space.D[5],
											'px;display:flex;}',
											'',
										),
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'div',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														'padding-bottom:',
														space.D[3],
														'px;',
														mq.Dp.tablet,
														'{flex:1;display:flex;flex-flow:column nowrap;padding:0;margin:0;}',
														'',
													),
													children:
														productDetail.isPaidTier &&
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															emotion_react_jsx_runtime_browser_esm.HY,
															{
																children: (0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'ul',
																	{
																		css: keyValuePairCss,
																		children:
																			[
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					'li',
																					{
																						css: keyCss,
																						children:
																							'Payment method',
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.BX)(
																					'li',
																					{
																						css: valueCss,
																						'data-qm-masking':
																							'blocklist',
																						children:
																							[
																								subscription.card &&
																									(0,
																									emotion_react_jsx_runtime_browser_esm.tZ)(
																										CardDisplay.V,
																										CurrentPaymentDetail_objectSpread(
																											{
																												inErrorState:
																													hasPaymentFailure,
																												cssOverrides:
																													(0,
																													emotion_react_browser_esm.iv)(
																														'margin:0;justify-content:flex-end;',
																														mq
																															.Dp
																															.tablet,
																														'{justify-content:left;}',
																														'',
																													),
																											},
																											subscription.card,
																										),
																									),
																								subscription.payPalEmail &&
																									(0,
																									emotion_react_jsx_runtime_browser_esm.tZ)(
																										PaypalLogo.D,
																										{},
																									),
																								subscription.sepaMandate &&
																									(0,
																									emotion_react_jsx_runtime_browser_esm.tZ)(
																										'div',
																										{
																											children:
																												'SEPA',
																										},
																									),
																								subscription.mandate &&
																									(0,
																									emotion_react_jsx_runtime_browser_esm.tZ)(
																										'span',
																										{
																											css: (0,
																											emotion_react_browser_esm.iv)(
																												'text-align:right;',
																												mq
																													.Dp
																													.tablet,
																												'{text-align:left;}',
																												'',
																											),
																											children:
																												(0,
																												DirectDebitDisplay.Vq)(
																													subscription
																														.mandate
																														.accountNumber,
																													!1,
																												),
																										},
																									),
																								subscription.stripePublicKeyForCardAddition &&
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
																			],
																	},
																),
															},
														),
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
														'px 0 0 0;border-top:1px solid ',
														palette.palette
															.neutral[86],
														';',
														subscription.mandate
															? 'text-align: right;'
															: '',
														' ',
														mq.Dp.tablet,
														'{flex:1;display:inline-block;flex-flow:column nowrap;padding:0 0 0 ',
														space.D[5],
														'px;margin:0;text-align:center;border-top:none;}ul:last-of-type{margin-bottom:',
														space.D[5],
														'px;}',
														'',
													),
													children: [
														subscription.card &&
															subscription.card
																.expiry &&
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																emotion_react_jsx_runtime_browser_esm.HY,
																{
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'span',
																			{
																				css: (0,
																				emotion_react_browser_esm.iv)(
																					keyCss,
																					';',
																					mq
																						.Dp
																						.tablet,
																					'{text-align:right;}',
																					'',
																				),
																				children:
																					((year =
																						subscription
																							.card
																							.expiry
																							.year),
																					(month =
																						subscription
																							.card
																							.expiry
																							.month),
																					new Date(
																						year,
																						month,
																					) <
																					new Date()
																						? (0,
																						  emotion_react_jsx_runtime_browser_esm.tZ)(
																								InlineError.b,
																								{
																									children:
																										'Expired',
																								},
																						  )
																						: (0,
																						  emotion_react_jsx_runtime_browser_esm.tZ)(
																								emotion_react_jsx_runtime_browser_esm.HY,
																								{
																									children:
																										'Expiry',
																								},
																						  )),
																			},
																		),
																		(0,
																		emotion_react_jsx_runtime_browser_esm.BX)(
																			'span',
																			{
																				'data-qm-masking':
																					'blocklist',
																				css: (0,
																				emotion_react_browser_esm.iv)(
																					valueCss,
																					';color:',
																					hasPaymentFailure
																						? palette
																								.palette
																								.error[400]
																						: palette
																								.palette
																								.neutral[7],
																					';',
																					'',
																				),
																				children:
																					[
																						subscription
																							.card
																							.expiry
																							.month,
																						' /',
																						' ',
																						subscription
																							.card
																							.expiry
																							.year,
																					],
																			},
																		),
																	],
																},
															),
														subscription.sepaMandate &&
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'span',
																{
																	css: (0,
																	emotion_react_browser_esm.iv)(
																		valueCss,
																		';',
																		'',
																	),
																	children:
																		(0,
																		emotion_react_jsx_runtime_browser_esm.BX)(
																			'div',
																			{
																				children:
																					[
																						subscription
																							.sepaMandate
																							.accountName,
																						(0,
																						emotion_react_jsx_runtime_browser_esm.tZ)(
																							'br',
																							{},
																						),
																						subscription
																							.sepaMandate
																							.iban,
																					],
																			},
																		),
																},
															),
														subscription.mandate &&
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'span',
																{
																	css: (0,
																	emotion_react_browser_esm.iv)(
																		valueCss,
																		';color:',
																		hasPaymentFailure
																			? palette
																					.palette
																					.error[400]
																			: palette
																					.palette
																					.neutral[7],
																		';',
																		'',
																	),
																	children:
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			DirectDebitDisplay.rV,
																			CurrentPaymentDetail_objectSpread(
																				CurrentPaymentDetail_objectSpread(
																					{},
																					subscription.mandate,
																				),
																				{},
																				{
																					onlySortCode:
																						!0,
																				},
																			),
																		),
																},
															),
														subscription.payPalEmail &&
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'span',
																{
																	css: (0,
																	emotion_react_browser_esm.iv)(
																		valueCss,
																		';',
																		'',
																	),
																	children:
																		(0,
																		PaypalDisplay.N)(
																			subscription.payPalEmail,
																		),
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
			try {
				(CurrentPaymentDetails.displayName = 'CurrentPaymentDetails'),
					(CurrentPaymentDetails.__docgenInfo = {
						description: '',
						displayName: 'CurrentPaymentDetails',
						props: {
							isTestUser: {
								defaultValue: null,
								description: '',
								name: 'isTestUser',
								required: !0,
								type: { name: 'boolean' },
							},
							isPaidTier: {
								defaultValue: null,
								description: '',
								name: 'isPaidTier',
								required: !0,
								type: { name: 'boolean' },
							},
							regNumber: {
								defaultValue: null,
								description: '',
								name: 'regNumber',
								required: !1,
								type: { name: 'string' },
							},
							optIn: {
								defaultValue: null,
								description: '',
								name: 'optIn',
								required: !1,
								type: { name: 'boolean' },
							},
							key: {
								defaultValue: null,
								description: '',
								name: 'key',
								required: !1,
								type: { name: 'string' },
							},
							tier: {
								defaultValue: null,
								description: '',
								name: 'tier',
								required: !0,
								type: { name: 'string' },
							},
							joinDate: {
								defaultValue: null,
								description: '',
								name: 'joinDate',
								required: !0,
								type: { name: 'string' },
							},
							alertText: {
								defaultValue: null,
								description: '',
								name: 'alertText',
								required: !1,
								type: { name: 'string' },
							},
							selfServiceCancellation: {
								defaultValue: null,
								description: '',
								name: 'selfServiceCancellation',
								required: !0,
								type: { name: 'SelfServiceCancellation' },
							},
							billingCountry: {
								defaultValue: null,
								description: '',
								name: 'billingCountry',
								required: !1,
								type: { name: 'string' },
							},
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
							'client/components/mma/paymentUpdate/CurrentPaymentDetail.tsx#CurrentPaymentDetails'
						] = {
							docgenInfo: CurrentPaymentDetails.__docgenInfo,
							name: 'CurrentPaymentDetails',
							path: 'client/components/mma/paymentUpdate/CurrentPaymentDetail.tsx#CurrentPaymentDetails',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var Checkbox = __webpack_require__(
				'./node_modules/@guardian/source/dist/react-components/checkbox/Checkbox.js',
			);
			function DirectDebitLegal_defineProperty(obj, key, value) {
				return (
					(key = (function DirectDebitLegal_toPropertyKey(arg) {
						var key = (function DirectDebitLegal_toPrimitive(
							input,
							hint,
						) {
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
			var DirectDebitLegal_hrefStyle = (0, emotion_react_browser_esm.iv)(
					'color:',
					palette.palette.neutral[46],
					';text-decoration:underline;cursor:pointer;',
					'',
				),
				DirectDebitLegal_baseStyle = (0, emotion_react_browser_esm.iv)(
					'color:',
					palette.palette.neutral[46],
					';',
					typography.Hi4,
					';flex-grow:1;margin-top:10px;',
					'',
				);
			class GoCardlessGuarantee extends react.Component {
				constructor() {
					super(...arguments),
						DirectDebitLegal_defineProperty(this, 'state', {
							expanded: !1,
						}),
						DirectDebitLegal_defineProperty(
							this,
							'toggleGuaranteeDisplay',
							() =>
								this.setState({
									expanded: !this.state.expanded,
								}),
						);
				}
				render() {
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						'div',
						{
							css: (0, emotion_react_browser_esm.iv)(
								this.props.inner
									? 'padding-top: 5px;'
									: DirectDebitLegal_baseStyle,
								';',
								'',
							),
							children: [
								'Your payments are protected by the',
								' ',
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'a',
									{
										css: DirectDebitLegal_hrefStyle,
										onClick: this.toggleGuaranteeDisplay,
										onKeyPress: this.toggleGuaranteeDisplay,
										tabIndex: 0,
										children: 'Direct Debit guarantee.',
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'ul',
									{
										css: (0, emotion_react_browser_esm.iv)(
											'display:',
											this.state.expanded
												? 'block'
												: 'none',
											';padding-left:30px;',
											'',
										),
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'li',
												{
													children:
														'The Guarantee is offered by all banks and building societies that accept instructions to pay Direct Debits',
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'li',
												{
													children:
														'If there are any changes to the amount, date or frequency of your Direct Debit Guardian News & Media Ltd will notify you at least three working days in advance of your account being debited or as otherwise agreed.',
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'li',
												{
													children:
														'If you ask Guardian News & Media Ltd to collect a payment, confirmation of the amount and date will be given to you at the time of the request.',
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'li',
												{
													children:
														'If an error is made in the payment of your Direct Debit by Guardian News & Media Ltd or your bank or building society, you are entitled to a full and immediate refund of the amount paid from your bank or building society.',
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'li',
												{
													children:
														'If you receive a refund you are not entitled to, you must pay it back when Guardian News & Media Ltd asks you to.',
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'li',
												{
													children:
														'You can cancel a Direct Debit at any time by contacting your bank or building society. Written confirmation may be required. Please also notify us.',
												},
											),
										],
									},
								),
							],
						},
					);
				}
			}
			var DirectDebitLegal = (props) =>
				(0, emotion_react_jsx_runtime_browser_esm.BX)('div', {
					css: (0, emotion_react_browser_esm.iv)(
						DirectDebitLegal_baseStyle,
						';max-width:590px;',
						'',
					),
					children: [
						(0, emotion_react_jsx_runtime_browser_esm.BX)('p', {
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'strong',
									{ children: 'Payments by GoCardless ' },
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'br',
									{},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'a',
									{
										href: 'https://gocardless.com/legal/privacy',
										rel: 'noreferrer',
										css: DirectDebitLegal_hrefStyle,
										target: '_blank',
										children:
											'Read the GoCardless privacy notice.',
									},
								),
							],
						}),
						(0, emotion_react_jsx_runtime_browser_esm.BX)('p', {
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'strong',
									{ children: 'Advance notice' },
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'br',
									{},
								),
								props.newDirectDebit
									? 'The details of your Direct Debit instruction including payment schedule, due date, frequency and amount will be sent to you within three working days. '
									: void 0,
								'All the normal Direct Debit safeguards and guarantees apply.',
							],
						}),
						(0, emotion_react_jsx_runtime_browser_esm.BX)('p', {
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'strong',
									{ children: 'Direct Debit' },
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'br',
									{},
								),
								'The Guardian, Unit 16, Coalfield Way, Ashby Park, Ashby-De-La-Zouch, LE65 1JT United Kingdom.',
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'br',
									{},
								),
								'Tel: 0330 333 6767 (within UK). Lines are open 8am-8pm on weekdays, 8am-6pm at weekends (GMT/BST)',
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'br',
									{},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'a',
									{
										css: DirectDebitLegal_hrefStyle,
										href: 'mailto:contribution.support@theguardian.com',
										children:
											'contribution.support@theguardian.com',
									},
								),
							],
						}),
					],
				});
			try {
				(GoCardlessGuarantee.displayName = 'GoCardlessGuarantee'),
					(GoCardlessGuarantee.__docgenInfo = {
						description: '',
						displayName: 'GoCardlessGuarantee',
						props: {
							inner: {
								defaultValue: null,
								description: '',
								name: 'inner',
								required: !1,
								type: { name: 'true' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/paymentUpdate/dd/DirectDebitLegal.tsx#GoCardlessGuarantee'
						] = {
							docgenInfo: GoCardlessGuarantee.__docgenInfo,
							name: 'GoCardlessGuarantee',
							path: 'client/components/mma/paymentUpdate/dd/DirectDebitLegal.tsx#GoCardlessGuarantee',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(DirectDebitLegal.displayName = 'DirectDebitLegal'),
					(DirectDebitLegal.__docgenInfo = {
						description: '',
						displayName: 'DirectDebitLegal',
						props: {
							newDirectDebit: {
								defaultValue: null,
								description: '',
								name: 'newDirectDebit',
								required: !1,
								type: { name: 'true' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/paymentUpdate/dd/DirectDebitLegal.tsx#DirectDebitLegal'
						] = {
							docgenInfo: DirectDebitLegal.__docgenInfo,
							name: 'DirectDebitLegal',
							path: 'client/components/mma/paymentUpdate/dd/DirectDebitLegal.tsx#DirectDebitLegal',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			function NewDirectDebitPaymentMethodDetail_ownKeys(e, r) {
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
			function NewDirectDebitPaymentMethodDetail_objectSpread(e) {
				for (var r = 1; r < arguments.length; r++) {
					var t = null != arguments[r] ? arguments[r] : {};
					r % 2
						? NewDirectDebitPaymentMethodDetail_ownKeys(
								Object(t),
								!0,
						  ).forEach(function (r) {
								NewDirectDebitPaymentMethodDetail_defineProperty(
									e,
									r,
									t[r],
								);
						  })
						: Object.getOwnPropertyDescriptors
						? Object.defineProperties(
								e,
								Object.getOwnPropertyDescriptors(t),
						  )
						: NewDirectDebitPaymentMethodDetail_ownKeys(
								Object(t),
						  ).forEach(function (r) {
								Object.defineProperty(
									e,
									r,
									Object.getOwnPropertyDescriptor(t, r),
								);
						  });
				}
				return e;
			}
			function NewDirectDebitPaymentMethodDetail_defineProperty(
				obj,
				key,
				value,
			) {
				return (
					(key =
						(function NewDirectDebitPaymentMethodDetail_toPropertyKey(
							arg,
						) {
							var key =
								(function NewDirectDebitPaymentMethodDetail_toPrimitive(
									input,
									hint,
								) {
									if (
										'object' != typeof input ||
										null === input
									)
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
									return (
										'string' === hint ? String : Number
									)(input);
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
			function isSubscriptionWithMandate(subscription) {
				return (
					void 0 !== subscription && void 0 !== subscription.mandate
				);
			}
			class NewDirectDebitPaymentMethodDetail {
				constructor(ddDetail) {
					NewDirectDebitPaymentMethodDetail_defineProperty(
						this,
						'apiUrlPart',
						'dd',
					),
						NewDirectDebitPaymentMethodDetail_defineProperty(
							this,
							'name',
							'direct_debit',
						),
						NewDirectDebitPaymentMethodDetail_defineProperty(
							this,
							'friendlyName',
							'direct debit',
						),
						NewDirectDebitPaymentMethodDetail_defineProperty(
							this,
							'subHasExpectedPaymentType',
							isSubscriptionWithMandate,
						),
						NewDirectDebitPaymentMethodDetail_defineProperty(
							this,
							'updatedSuccessExtras',
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								GoCardlessGuarantee,
								{},
							),
						),
						NewDirectDebitPaymentMethodDetail_defineProperty(
							this,
							'detailToPayloadObject',
							() => this.ddDetail,
						),
						NewDirectDebitPaymentMethodDetail_defineProperty(
							this,
							'matchesResponse',
							(response) =>
								response.accountNumber.length > 3 &&
								this.ddDetail.accountNumber.endsWith(
									response.accountNumber.substring(
										response.accountNumber.length - 3,
									),
								) &&
								response.accountName ===
									this.ddDetail.accountName &&
								response.sortCode ===
									(0, DirectDebitDisplay.Se)(
										this.ddDetail.sortCode,
									),
						),
						NewDirectDebitPaymentMethodDetail_defineProperty(
							this,
							'render',
							(subscription) =>
								isSubscriptionWithMandate(subscription)
									? (0,
									  emotion_react_jsx_runtime_browser_esm.tZ)(
											DirectDebitDisplay.rV,
											NewDirectDebitPaymentMethodDetail_objectSpread(
												{},
												subscription.mandate,
											),
									  )
									: (0,
									  emotion_react_jsx_runtime_browser_esm.tZ)(
											DirectDebitDisplay.rV,
											NewDirectDebitPaymentMethodDetail_objectSpread(
												NewDirectDebitPaymentMethodDetail_objectSpread(
													{},
													this.ddDetail,
												),
												{},
												{ showAccountName: !0 },
											),
									  ),
						),
						NewDirectDebitPaymentMethodDetail_defineProperty(
							this,
							'confirmButtonWrapper',
							(confirmButton) =>
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'div',
									{
										css: (0, emotion_react_browser_esm.iv)(
											{
												display: 'flex',
												flexDirection: 'row',
												textAlign: 'left',
												[mq.C4.desktop]: {
													flexDirection: 'column',
												},
											},
											'',
											'',
										),
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'div',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														{
															[mq.Dp.desktop]: {
																marginRight:
																	'20px',
															},
														},
														'',
														'',
													),
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'h3',
															{
																children:
																	'Declaration',
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'p',
															{
																children:
																	'I have confirmed that I am the account holder and that I am solely able to authorise debit from the account.',
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															'p',
															{
																children: [
																	"If the details above are correct press '",
																	'Complete payment update',
																	"' to set up your direct debit, otherwise press 'Back' to make changes.",
																],
															},
														),
														confirmButton,
													],
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												DirectDebitLegal,
												{},
											),
										],
									},
								),
						),
						(this.ddDetail = ddDetail);
				}
			}
			function DirectDebitInputForm_asyncGeneratorStep(
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
			function DirectDebitInputForm_asyncToGenerator(fn) {
				return function () {
					var self = this,
						args = arguments;
					return new Promise(function (resolve, reject) {
						var gen = fn.apply(self, args);
						function _next(value) {
							DirectDebitInputForm_asyncGeneratorStep(
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
							DirectDebitInputForm_asyncGeneratorStep(
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
			}
			var inputBoxBaseStyle = (0, emotion_react_browser_esm.iv)(
					'width:100%;height:100%;',
					typography.Kz0,
					';border:none;outline:none;::placeholder:{color:#c4c4c4;}:-ms-input-placeholder:{color:#c4c4c4;}',
					'',
				),
				bulletsStyling = {
					name: 'bhuqoi',
					styles: '::placeholder{font-size:14px;}:-ms-input-placeholder{font-size:14px;}',
				},
				DirectDebitInputForm_ref = {
					name: '1t1vdlm',
					styles: '&+span{top:calc(50% - 8px);}',
				},
				DirectDebitInputForm = (props) => {
					var [isValidating, setIsValidating] = (0, react.useState)(
							!1,
						),
						[
							soleAccountHolderConfirmed,
							setSoleAccountHolderConfirmed,
						] = (0, react.useState)(!1),
						[accountName, setAccountName] = (0, react.useState)(''),
						[accountNumber, setAccountNumber] = (0, react.useState)(
							'',
						),
						[sortCode, setSortCode] = (0, react.useState)(''),
						[error, setError] = (0, react.useState)();
					function _validateDirectDebitDetails() {
						return (_validateDirectDebitDetails =
							DirectDebitInputForm_asyncToGenerator(function* (
								newPaymentMethod,
							) {
								try {
									var validateDirectDebitDetailsFetch =
											yield fetch(
												'/api/validate/payment/dd?mode='.concat(
													props.testUser
														? 'test'
														: 'live',
												),
												{
													credentials: 'include',
													method: 'POST',
													body: JSON.stringify({
														accountNumber,
														sortCode: (0,
														DirectDebitDisplay.Se)(
															sortCode,
														),
													}),
													headers: {
														'Content-Type':
															'application/json',
													},
												},
											),
										response = yield (0, utils.Ff)(
											validateDirectDebitDetailsFetch,
										);
									response && response.data.accountValid
										? (setIsValidating(!1),
										  props.executePaymentUpdate(
												newPaymentMethod,
										  ))
										: response &&
										  429 ===
												response.data
													.goCardlessStatusCode
										? (setIsValidating(!1),
										  setError(
												'We cannot currently validate your bank details. Please try again later.',
										  ))
										: (setIsValidating(!1),
										  setError(
												'Your bank details are invalid. Please check them and try again.',
										  ));
								} catch (_unused) {
									setIsValidating(!1),
										setError(
											'Could not validate your bank details, please check them and try again.',
										);
								}
							})).apply(this, arguments);
					}
					var startDirectDebitUpdate = (function () {
						var _ref2 = DirectDebitInputForm_asyncToGenerator(
							function* () {
								var newPaymentMethod =
									new NewDirectDebitPaymentMethodDetail({
										accountName,
										accountNumber,
										sortCode,
									});
								props.newPaymentMethodDetailUpdater(
									newPaymentMethod,
								),
									setError(void 0),
									accountName.length < 3
										? setError(
												'Please enter a valid account name',
										  )
										: soleAccountHolderConfirmed
										? (setIsValidating(!0),
										  (function validateDirectDebitDetails(
												_x,
										  ) {
												return _validateDirectDebitDetails.apply(
													this,
													arguments,
												);
										  })(newPaymentMethod))
										: setError(
												'You need to confirm that you are the account holder',
										  );
							},
						);
						return function startDirectDebitUpdate() {
							return _ref2.apply(this, arguments);
						};
					})();
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						'div',
						{
							css: (0, emotion_react_browser_esm.iv)(
								'margin-top:',
								space.D[9],
								'px;margin-bottom:',
								space.D[9],
								'px;',
								'',
							),
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									FieldWrapper,
									{
										width: '100%',
										label: 'Account holder name',
										onChange: (event) =>
											setAccountName(event.target.value),
										children: (0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'input',
											{
												'data-qm-masking': 'blocklist',
												type: 'text',
												css: inputBoxBaseStyle,
												placeholder:
													'First Name Surname',
												name: 'Account holder name',
												pattern: '[A-Za-z\\s]{3,}',
												title: 'The name of the account holder must have at least 3 letters.',
												required: !0,
											},
										),
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'div',
									{
										css: (0, emotion_react_browser_esm.iv)(
											'display:flex;justify-content:flex-start;',
											mq.Dp.tablet,
											'{margin-top:',
											space.D[4],
											'px;}',
											'',
										),
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												FieldWrapper,
												{
													width: '220px',
													label: 'Sort Code',
													onChange: (event) =>
														setSortCode(
															(0,
															DirectDebitDisplay.Se)(
																event.target
																	.value,
															),
														),
													children: (0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'input',
														{
															'data-qm-masking':
																'blocklist',
															type: 'text',
															pattern:
																'[0-9]{2}[\\-\\s]?[0-9]{2}[\\-\\s]?[0-9]{2}',
															title: 'Sort Code must contain 6 numbers (optionally separated by a - or space)',
															css: (0,
															emotion_react_browser_esm.iv)(
																bulletsStyling,
																';',
																inputBoxBaseStyle,
																';',
																'',
															),
															placeholder:
																'•• •• ••',
															name: 'Sort Code',
															required: !0,
														},
													),
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												FieldWrapper,
												{
													width: '100%',
													label: 'Account Number',
													onChange: (event) =>
														setAccountNumber(
															event.target.value,
														),
													children: (0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'input',
														{
															'data-qm-masking':
																'blocklist',
															type: 'text',
															pattern:
																'[0-9]{7,}',
															css: (0,
															emotion_react_browser_esm.iv)(
																bulletsStyling,
																';',
																inputBoxBaseStyle,
																';',
																'',
															),
															placeholder:
																'•••• ••••',
															name: 'Account Number',
															title: 'Account Number should typically be 8 digits',
															required: !0,
														},
													),
												},
											),
											' ',
										],
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'div',
									{
										css: (0, emotion_react_browser_esm.iv)(
											'margin:14px 0;',
											mq.Dp.tablet,
											'{margin:4px 0;}',
											'',
										),
										children: (0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											Checkbox.X,
											{
												onChange: (e) =>
													setSoleAccountHolderConfirmed(
														e.target.checked,
													),
												checked:
													soleAccountHolderConfirmed,
												label: 'I confirm that I am the account holder and I am solely able to authorise debit from the account',
												required: !0,
												name: 'accountHolderConfirmation',
												value: 'I confirm that I am the account holder and I am solely able to authorise debit from the account',
												cssOverrides:
													DirectDebitInputForm_ref,
											},
										),
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									DirectDebitLegal,
									{},
								),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'div',
									{
										css: (0, emotion_react_browser_esm.iv)(
											'margin-top:',
											space.D[9],
											'px;margin-bottom:',
											space.D[9],
											'px;',
											mq.C4.desktop,
											'{width:100%;}',
											'',
										),
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												Button.z,
												{
													disabled: isValidating,
													priority: 'primary',
													onClick:
														startDirectDebitUpdate,
													icon: (0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														SvgArrowRightStraight.l,
														{},
													),
													iconSide: 'right',
													children:
														'Update payment method',
												},
											),
											error
												? (0,
												  emotion_react_jsx_runtime_browser_esm.tZ)(
														'div',
														{
															css: (0,
															emotion_react_browser_esm.iv)(
																'margin-top:',
																space.D[9],
																'px;margin-bottom:',
																space.D[9],
																'px;',
																'',
															),
															children: (0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																ErrorSummary.X,
																{
																	message:
																		error,
																},
															),
														},
												  )
												: void 0,
										],
									},
								),
							],
						},
					);
				};
			try {
				(DirectDebitInputForm.displayName = 'DirectDebitInputForm'),
					(DirectDebitInputForm.__docgenInfo = {
						description: '',
						displayName: 'DirectDebitInputForm',
						props: {
							newPaymentMethodDetailUpdater: {
								defaultValue: null,
								description: '',
								name: 'newPaymentMethodDetailUpdater',
								required: !0,
								type: {
									name: '(ddDetails: NewPaymentMethodDetail) => void',
								},
							},
							testUser: {
								defaultValue: null,
								description: '',
								name: 'testUser',
								required: !0,
								type: { name: 'boolean' },
							},
							executePaymentUpdate: {
								defaultValue: null,
								description: '',
								name: 'executePaymentUpdate',
								required: !0,
								type: {
									name: '(newPaymentMethodDetail: NewPaymentMethodDetail) => Promise<unknown>',
								},
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/paymentUpdate/dd/DirectDebitInputForm.tsx#DirectDebitInputForm'
						] = {
							docgenInfo: DirectDebitInputForm.__docgenInfo,
							name: 'DirectDebitInputForm',
							path: 'client/components/mma/paymentUpdate/dd/DirectDebitInputForm.tsx#DirectDebitInputForm',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var NavConfig = __webpack_require__(
					'./client/components/shared/nav/NavConfig.tsx',
				),
				Page = __webpack_require__('./client/components/mma/Page.tsx'),
				renderContextAndOutletContainer =
					(isFromApp) => (mdapiResponse) => {
						var filteredProductDetails = mdapiResponse.products
							.filter(productResponse.v_)
							.filter(
								(productDetail) =>
									!productDetail.subscription.cancelledAt &&
									'Gift' !==
										productDetail.subscription.readerType,
							);
						return 1 === filteredProductDetails.length
							? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
									PaymentUpdateContext.Provider,
									{
										value: {
											productDetail:
												filteredProductDetails[0],
											isFromApp,
										},
										children: (0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											react_router.j3,
											{},
										),
									},
							  )
							: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
									react_router.Fg,
									{ to: '/' },
							  );
					},
				PaymentUpdateContext = (0, react.createContext)(null),
				PaymentDetailUpdateContainer = (props) => {
					var _routerState$flowRefe,
						routerState = (0, react_router.TH)().state,
						productDetail =
							null == routerState
								? void 0
								: routerState.productDetail,
						isFromApp =
							null == routerState
								? void 0
								: routerState.isFromApp,
						navItemReferrer = (0, NavConfig.p8)(
							null == routerState ||
								null ===
									(_routerState$flowRefe =
										routerState.flowReferrer) ||
								void 0 === _routerState$flowRefe
								? void 0
								: _routerState$flowRefe.title,
						);
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						Page._,
						{
							selectedNavItem: navItemReferrer,
							pageTitle: 'Manage payment method',
							children: productDetail
								? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
										PaymentUpdateContext.Provider,
										{
											value: { productDetail, isFromApp },
											children: (0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												react_router.j3,
												{},
											),
										},
								  )
								: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
										productResponse.wH,
										{
											fetch: (0, productUtils.w)(
												props.productType
													.allProductsProductTypeFilterString,
											),
											render: renderContextAndOutletContainer(
												isFromApp,
											),
											loadingMessage:
												'Retrieving current payment details for your '.concat(
													props.productType
														.friendlyName,
													'...',
												),
										},
								  ),
						},
					);
				};
			try {
				(PaymentDetailUpdateContainer.displayName =
					'PaymentDetailUpdateContainer'),
					(PaymentDetailUpdateContainer.__docgenInfo = {
						description: '',
						displayName: 'PaymentDetailUpdateContainer',
						props: {
							productType: {
								defaultValue: null,
								description: '',
								name: 'productType',
								required: !0,
								type: { name: 'ProductType' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/paymentUpdate/PaymentDetailUpdateContainer.tsx#PaymentDetailUpdateContainer'
						] = {
							docgenInfo:
								PaymentDetailUpdateContainer.__docgenInfo,
							name: 'PaymentDetailUpdateContainer',
							path: 'client/components/mma/paymentUpdate/PaymentDetailUpdateContainer.tsx#PaymentDetailUpdateContainer',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			function PaymentDetailUpdate_asyncGeneratorStep(
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
			function PaymentDetailUpdate_ownKeys(e, r) {
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
			function PaymentDetailUpdate_objectSpread(e) {
				for (var r = 1; r < arguments.length; r++) {
					var t = null != arguments[r] ? arguments[r] : {};
					r % 2
						? PaymentDetailUpdate_ownKeys(Object(t), !0).forEach(
								function (r) {
									PaymentDetailUpdate_defineProperty(
										e,
										r,
										t[r],
									);
								},
						  )
						: Object.getOwnPropertyDescriptors
						? Object.defineProperties(
								e,
								Object.getOwnPropertyDescriptors(t),
						  )
						: PaymentDetailUpdate_ownKeys(Object(t)).forEach(
								function (r) {
									Object.defineProperty(
										e,
										r,
										Object.getOwnPropertyDescriptor(t, r),
									);
								},
						  );
				}
				return e;
			}
			function PaymentDetailUpdate_defineProperty(obj, key, value) {
				return (
					(key = (function PaymentDetailUpdate_toPropertyKey(arg) {
						var key = (function PaymentDetailUpdate_toPrimitive(
							input,
							hint,
						) {
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
			var PaymentMethod = (function (PaymentMethod) {
					return (
						(PaymentMethod.Card = 'Credit card / debit card'),
						(PaymentMethod.PayPal = 'PayPal'),
						(PaymentMethod.DirectDebit = 'Direct debit'),
						(PaymentMethod.ResetRequired = 'ResetRequired'),
						(PaymentMethod.Free = 'FREE'),
						(PaymentMethod.Unknown = 'Unknown'),
						PaymentMethod
					);
				})({}),
				subHeadingCss = (0, emotion_react_browser_esm.iv)(
					'border-top:1px solid ',
					palette.palette.neutral[86],
					';',
					typography.Hu7,
					';margin-top:50px;',
					mq.C4.tablet,
					'{font-size:1.25rem;line-height:1.6;}',
					'',
				),
				PaymentDetailUpdate_ref = {
					name: 'w2c8zk',
					styles: 'width:47px;height:16px',
				};
			function getLogos(paymentMethod) {
				return paymentMethod === PaymentMethod.Card
					? (0, emotion_react_jsx_runtime_browser_esm.BX)(
							emotion_react_jsx_runtime_browser_esm.HY,
							{
								children: [
									(0, CardDisplay.z)('visa'),
									(0, CardDisplay.z)('mastercard'),
									(0, CardDisplay.z)('americanexpress'),
								],
							},
					  )
					: paymentMethod === PaymentMethod.DirectDebit
					? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							DirectDebitLogo.c,
							{
								fill: palette.palette.brand[400],
								additionalCss: PaymentDetailUpdate_ref,
							},
					  )
					: void 0;
			}
			var PaymentMethodRadioButton = (props) => {
					var isChecked = props.value === props.paymentMethod,
						defaultRadioStyles = (0, emotion_react_browser_esm.iv)(
							'display:flex;align-items:center;padding:',
							space.D[4],
							'px;margin-bottom:',
							space.D[4],
							'px;',
							typography.Kz0,
							';line-height:normal;font-weight:bold;color:',
							palette.palette.neutral[46],
							';border-radius:4px;box-shadow:inset 0px 0px 0px 2px ',
							palette.palette.neutral[46],
							';cursor:pointer;&:hover{box-shadow:inset 0px 0px 0px 4px ',
							palette.palette.brand[500],
							';}',
							'',
						),
						checkedRadioStyles = (0, emotion_react_browser_esm.iv)(
							'box-shadow:inset 0px 0px 0px 4px ',
							palette.palette.brand[500],
							';background-color:#e3f6ff;color:',
							palette.palette.brand[400],
							';',
							'',
						);
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						'label',
						{
							'data-cy': props.paymentMethod,
							css: (0, emotion_react_browser_esm.iv)(
								defaultRadioStyles,
								' ',
								isChecked && checkedRadioStyles,
								';',
								'',
							),
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									Radio.Y,
									{
										checked: isChecked,
										onChange: (changeEvent) =>
											props.updatePaymentMethod(
												changeEvent.target.value,
											),
										value: props.paymentMethod,
									},
								),
								props.paymentMethod,
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'div',
									{
										css: (0, emotion_react_browser_esm.iv)(
											'display:none;margin-left:auto;',
											mq.Dp.mobileMedium,
											'{display:flex;}',
											'',
										),
										children: getLogos(props.paymentMethod),
									},
								),
							],
						},
					);
				},
				SelectPaymentMethod = (props) =>
					(0, emotion_react_jsx_runtime_browser_esm.tZ)('form', {
						children: (0, emotion_react_jsx_runtime_browser_esm.BX)(
							RadioGroup.E,
							{
								label: 'Select payment method',
								hideLabel: !0,
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										PaymentMethodRadioButton,
										PaymentDetailUpdate_objectSpread(
											{
												paymentMethod:
													PaymentMethod.Card,
											},
											props,
										),
									),
									props.directDebitIsAllowed
										? (0,
										  emotion_react_jsx_runtime_browser_esm.tZ)(
												PaymentMethodRadioButton,
												PaymentDetailUpdate_objectSpread(
													{
														paymentMethod:
															PaymentMethod.DirectDebit,
													},
													props,
												),
										  )
										: (0,
										  emotion_react_jsx_runtime_browser_esm.tZ)(
												emotion_react_jsx_runtime_browser_esm.HY,
												{},
										  ),
								],
							},
						),
					}),
				PaymentDetailUpdate_ref3 = {
					name: 'l0rwn2',
					styles: 'min-width:260px',
				},
				PaymentDetailUpdate = (props) => {
					var _productDetail$subscr,
						{ productDetail, isFromApp } = (0, react.useContext)(
							PaymentUpdateContext,
						),
						currentPaymentMethod = ((productDetail) =>
							productDetail.subscription.safeToUpdatePaymentMethod
								? 'Card' ===
										productDetail.subscription
											.paymentMethod &&
								  productDetail.subscription.card
									? PaymentMethod.Card
									: 'PayPal' ===
											productDetail.subscription
												.paymentMethod &&
									  productDetail.subscription.payPalEmail
									? PaymentMethod.PayPal
									: 'DirectDebit' ===
											productDetail.subscription
												.paymentMethod &&
									  productDetail.subscription.mandate
									? PaymentMethod.DirectDebit
									: 'ResetRequired' ===
									  productDetail.subscription.paymentMethod
									? PaymentMethod.ResetRequired
									: productDetail.isPaidTier
									? PaymentMethod.Unknown
									: PaymentMethod.Free
								: PaymentMethod.Unknown)(productDetail),
						mainPlan = (0, productResponse.fr)(
							productDetail.subscription,
						),
						directDebitIsAllowed =
							currentPaymentMethod ===
								PaymentMethod.DirectDebit ||
							((0, productResponse.q4)(mainPlan) &&
								'GBP' === mainPlan.currencyISO &&
								(!productDetail.subscription.deliveryAddress ||
									!(
										null !==
											(_productDetail$subscr =
												productDetail.subscription
													.deliveryAddress) &&
										void 0 !== _productDetail$subscr &&
										_productDetail$subscr.country
									) ||
									'United Kingdom' ===
										productDetail.subscription
											.deliveryAddress.country)),
						[paymentUpdateState, setPaymentUpdateState] = (0,
						react.useState)({
							newPaymentMethodDetail: void 0,
							newSubscriptionData: void 0,
						}),
						[executingPaymentUpdate, setExecutingPaymentUpdate] =
							(0, react.useState)(!1),
						[selectedPaymentMethod, setSelectedPaymentMethod] = (0,
						react.useState)(
							currentPaymentMethod === PaymentMethod.DirectDebit
								? PaymentMethod.Unknown
								: PaymentMethod.Card,
						),
						navigate = (0, react_router.s0)(),
						executePaymentUpdate = (function () {
							var _ref2 =
								(function PaymentDetailUpdate_asyncToGenerator(
									fn,
								) {
									return function () {
										var self = this,
											args = arguments;
										return new Promise(function (
											resolve,
											reject,
										) {
											var gen = fn.apply(self, args);
											function _next(value) {
												PaymentDetailUpdate_asyncGeneratorStep(
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
												PaymentDetailUpdate_asyncGeneratorStep(
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
								})(function* (newPaymentMethodDetail) {
									setExecutingPaymentUpdate(!0);
									try {
										var paymentUpdateFetch = yield fetch(
												'/api/payment/'
													.concat(
														newPaymentMethodDetail.apiUrlPart,
														'/',
													)
													.concat(
														productDetail
															.subscription
															.subscriptionId,
													),
												{
													credentials: 'include',
													method: 'POST',
													body: JSON.stringify(
														newPaymentMethodDetail.detailToPayloadObject(),
													),
													headers: {
														'Content-Type':
															'application/json',
														[identity.h]: (0,
														identity.V)(
															window.location
																.href,
														),
													},
												},
											),
											response = yield (0, utils.Ff)(
												paymentUpdateFetch,
											);
										if (
											newPaymentMethodDetail.matchesResponse(
												response,
											)
										) {
											var paymentMethodChangeType =
												productDetail.subscription
													.paymentMethod ===
												PaymentMethod.ResetRequired
													? 'reset'
													: 'update';
											(0, analytics.L9)({
												eventCategory: 'payment',
												eventAction: ''
													.concat(
														newPaymentMethodDetail.name,
														'_',
													)
													.concat(
														paymentMethodChangeType,
														'_success',
													),
												product: {
													productType:
														props.productType,
													productDetail,
												},
												eventLabel:
													props.productType.urlPart,
											});
											var newSubscriptionData = (yield (0,
											productUtils.fi)(
												props.productType
													.allProductsProductTypeFilterString,
												productDetail.subscription
													.subscriptionId,
											)).products.filter(
												productResponse.v_,
											);
											navigate('updated', {
												state: {
													paymentFailureRecoveryMessage:
														newPaymentMethodDetail.paymentFailureRecoveryMessage,
													subHasExpectedPaymentType:
														newPaymentMethodDetail.subHasExpectedPaymentType(
															newSubscriptionData[0]
																.subscription,
														),
													newSubscriptionData,
													isFromApp,
												},
											});
										}
									} catch (_unused) {
										navigate('failed', {
											state: {
												newPaymentMethodDetailFriendlyName:
													newPaymentMethodDetail.friendlyName,
											},
										});
									}
								});
							return function executePaymentUpdate(_x) {
								return _ref2.apply(this, arguments);
							};
						})(),
						newPaymentMethodDetailUpdater = (
							newPaymentMethodDetail,
						) =>
							setPaymentUpdateState(
								PaymentDetailUpdate_objectSpread(
									PaymentDetailUpdate_objectSpread(
										{},
										paymentUpdateState,
									),
									{},
									{ newPaymentMethodDetail },
								),
							);
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: [
								executingPaymentUpdate &&
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										OverlayLoader.E,
										{
											message:
												'Updating payment details...',
										},
									),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'div',
									{
										css: PaymentDetailUpdate_ref3,
										children: [
											productDetail.alertText &&
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													ErrorSummary.X,
													{
														cssOverrides: (0,
														emotion_react_browser_esm.iv)(
															'margin-top:',
															space.D[9],
															'px;',
															'',
														),
														message: (0,
														PaymentFailureAlertIfApplicable.v)(
															productDetail.alertText,
														),
													},
												),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'h3',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														subHeadingCss,
														' margin-top:',
														space.D[9],
														'px;',
														'',
													),
													children:
														'Your current payment method',
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												CurrentPaymentDetails,
												PaymentDetailUpdate_objectSpread(
													{},
													productDetail,
												),
											),
											productDetail.subscription
												.payPalEmail &&
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
															'To update your payment details, please login to your PayPal account. Alternatively, you can switch to a card based payment method below.',
													},
												),
										],
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'h3',
									{
										css: (0, emotion_react_browser_esm.iv)(
											subHeadingCss,
											' ',
											productDetail.subscription
												.payPalEmail &&
												'margin-top: 36px',
											';',
											'',
										),
										children:
											selectedPaymentMethod ===
											PaymentMethod.Unknown
												? 'Choose your payment method'
												: 'Update your payment method',
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									SelectPaymentMethod,
									{
										updatePaymentMethod: (
											newPaymentMethod,
										) =>
											setSelectedPaymentMethod(
												newPaymentMethod,
											),
										value: selectedPaymentMethod,
										currentPaymentMethod,
										directDebitIsAllowed,
									},
								),
								((subscription, isTestUser) => {
									var _subscription$card,
										_subscription$card2,
										stripePublicKey,
										_subscription$deliver;
									subscription.card
										? (stripePublicKey =
												subscription.card
													.stripePublicKeyForUpdate)
										: (stripePublicKey =
												(function getStripeKey(
													country,
													isTestUser,
												) {
													var _window$guardian,
														_window$guardian$stri,
														_window$guardian2,
														_window$guardian2$str,
														_window$guardian3,
														_window$guardian3$str,
														_window$guardian4,
														_window$guardian4$str;
													return 'Australia' ===
														country
														? isTestUser
															? null ===
																	(_window$guardian =
																		window.guardian) ||
															  void 0 ===
																	_window$guardian ||
															  null ===
																	(_window$guardian$stri =
																		_window$guardian.stripeKeyAustralia) ||
															  void 0 ===
																	_window$guardian$stri
																? void 0
																: _window$guardian$stri.test
															: null ===
																	(_window$guardian2 =
																		window.guardian) ||
															  void 0 ===
																	_window$guardian2 ||
															  null ===
																	(_window$guardian2$str =
																		_window$guardian2.stripeKeyAustralia) ||
															  void 0 ===
																	_window$guardian2$str
															? void 0
															: _window$guardian2$str.default
														: isTestUser
														? null ===
																(_window$guardian3 =
																	window.guardian) ||
														  void 0 ===
																_window$guardian3 ||
														  null ===
																(_window$guardian3$str =
																	_window$guardian3.stripeKeyDefaultCurrencies) ||
														  void 0 ===
																_window$guardian3$str
															? void 0
															: _window$guardian3$str.test
														: null ===
																(_window$guardian4 =
																	window.guardian) ||
														  void 0 ===
																_window$guardian4 ||
														  null ===
																(_window$guardian4$str =
																	_window$guardian4.stripeKeyDefaultCurrencies) ||
														  void 0 ===
																_window$guardian4$str
														? void 0
														: _window$guardian4$str.default;
												})(
													productDetail.billingCountry ||
														(null ===
															(_subscription$deliver =
																subscription.deliveryAddress) ||
														void 0 ===
															_subscription$deliver
															? void 0
															: _subscription$deliver.country),
													isTestUser,
												));
									switch (selectedPaymentMethod) {
										case PaymentMethod.ResetRequired:
											return stripePublicKey
												? (0,
												  emotion_react_jsx_runtime_browser_esm.tZ)(
														CardInputForm,
														{
															stripeApiKey:
																stripePublicKey,
															newPaymentMethodDetailUpdater,
															userEmail:
																(null ===
																	(_subscription$card =
																		subscription.card) ||
																void 0 ===
																	_subscription$card
																	? void 0
																	: _subscription$card.email) ||
																window.guardian
																	.identityDetails
																	.email,
															executePaymentUpdate,
														},
												  )
												: (0,
												  emotion_react_jsx_runtime_browser_esm.tZ)(
														GenericErrorScreen.c,
														{
															loggingMessage:
																'No Stripe key provided to enable adding a payment method',
														},
												  );
										case PaymentMethod.Card:
											return stripePublicKey
												? (0,
												  emotion_react_jsx_runtime_browser_esm.tZ)(
														CardInputForm,
														{
															stripeApiKey:
																stripePublicKey,
															newPaymentMethodDetailUpdater,
															userEmail:
																(null ===
																	(_subscription$card2 =
																		subscription.card) ||
																void 0 ===
																	_subscription$card2
																	? void 0
																	: _subscription$card2.email) ||
																window.guardian
																	.identityDetails
																	.email,
															executePaymentUpdate,
														},
												  )
												: (0,
												  emotion_react_jsx_runtime_browser_esm.tZ)(
														GenericErrorScreen.c,
														{
															loggingMessage:
																'No existing card information to update from',
														},
												  );
										case PaymentMethod.Free:
											return (0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'div',
												{
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'p',
															{
																children:
																	'If you are interested in supporting our journalism in other ways, please consider either a contribution or a subscription.',
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															SupportTheGuardianButton.o,
															{
																supportReferer:
																	'payment_flow',
																theme: 'brand',
																size: 'small',
															},
														),
													],
												},
											);
										case PaymentMethod.PayPal:
											return (0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'p',
												{
													children:
														'Updating your PayPal payment details is not possible here. Please login to PayPal to change your payment details.',
												},
											);
										case PaymentMethod.DirectDebit:
											return (0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												DirectDebitInputForm,
												{
													newPaymentMethodDetailUpdater,
													testUser: isTestUser,
													executePaymentUpdate,
												},
											);
										case PaymentMethod.Unknown:
											return null;
										default:
											return (
												esm.Tb(
													'user cannot update their payment online',
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'span',
													{
														children:
															'It is not currently possible to update your payment method online.',
													},
												)
											);
									}
								})(
									productDetail.subscription,
									productDetail.isTestUser,
								),
								selectedPaymentMethod === PaymentMethod.Unknown
									? (0,
									  emotion_react_jsx_runtime_browser_esm.tZ)(
											'div',
											{
												css: (0,
												emotion_react_browser_esm.iv)(
													'margin-top:',
													space.D[9],
													'px;margin-bottom:',
													space.D[9],
													'px;',
													'',
												),
												children: (0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													Button.z,
													{
														disabled: !0,
														priority: 'secondary',
														icon: (0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															SvgArrowRightStraight.l,
															{},
														),
														iconSide: 'right',
														cssOverrides: (0,
														emotion_react_browser_esm.iv)(
															'background-color:',
															palette.palette
																.neutral[86],
															';color:',
															palette.palette
																.neutral[46],
															';:hover{background-color:',
															palette.palette
																.neutral[86],
															';color:',
															palette.palette
																.neutral[46],
															';}cursor:not-allowed;',
															'',
														),
														children:
															'Update payment method',
													},
												),
											},
									  )
									: null,
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									ContactUs,
									{},
								),
							],
						},
					);
				};
			try {
				(getLogos.displayName = 'getLogos'),
					(getLogos.__docgenInfo = {
						description: '',
						displayName: 'getLogos',
						props: {},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/paymentUpdate/PaymentDetailUpdate.tsx#getLogos'
						] = {
							docgenInfo: getLogos.__docgenInfo,
							name: 'getLogos',
							path: 'client/components/mma/paymentUpdate/PaymentDetailUpdate.tsx#getLogos',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(SelectPaymentMethod.displayName = 'SelectPaymentMethod'),
					(SelectPaymentMethod.__docgenInfo = {
						description: '',
						displayName: 'SelectPaymentMethod',
						props: {
							value: {
								defaultValue: null,
								description: '',
								name: 'value',
								required: !0,
								type: {
									name: 'enum',
									value: [
										{ value: '"Credit card / debit card"' },
										{ value: '"PayPal"' },
										{ value: '"Direct debit"' },
										{ value: '"ResetRequired"' },
										{ value: '"FREE"' },
										{ value: '"Unknown"' },
									],
								},
							},
							updatePaymentMethod: {
								defaultValue: null,
								description: '',
								name: 'updatePaymentMethod',
								required: !0,
								type: {
									name: '(newPaymentMethod: PaymentMethod) => void',
								},
							},
							directDebitIsAllowed: {
								defaultValue: null,
								description: '',
								name: 'directDebitIsAllowed',
								required: !0,
								type: { name: 'boolean' },
							},
							currentPaymentMethod: {
								defaultValue: null,
								description: '',
								name: 'currentPaymentMethod',
								required: !0,
								type: { name: 'string | undefined' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/paymentUpdate/PaymentDetailUpdate.tsx#SelectPaymentMethod'
						] = {
							docgenInfo: SelectPaymentMethod.__docgenInfo,
							name: 'SelectPaymentMethod',
							path: 'client/components/mma/paymentUpdate/PaymentDetailUpdate.tsx#SelectPaymentMethod',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(PaymentDetailUpdate.displayName = 'PaymentDetailUpdate'),
					(PaymentDetailUpdate.__docgenInfo = {
						description: '',
						displayName: 'PaymentDetailUpdate',
						props: {
							productType: {
								defaultValue: null,
								description: '',
								name: 'productType',
								required: !0,
								type: { name: 'ProductType' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/paymentUpdate/PaymentDetailUpdate.tsx#PaymentDetailUpdate'
						] = {
							docgenInfo: PaymentDetailUpdate.__docgenInfo,
							name: 'PaymentDetailUpdate',
							path: 'client/components/mma/paymentUpdate/PaymentDetailUpdate.tsx#PaymentDetailUpdate',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			const UpdatePayment_stories = {
				component: PaymentDetailUpdateContainer,
				title: 'Pages/UpdatePayment',
				decorators: [ReactRouterDecorator.R],
			};
			var setSiteKey = () => {
					window.guardian = {
						recaptchaPublicKey:
							'6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
					};
				},
				GuardianWeeklyCard = {
					render: () => (
						setSiteKey(),
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							PaymentDetailUpdate,
							{ productType: productTypes.Pm.guardianweekly },
						)
					),
					parameters: {
						reactRouter: {
							state: { productDetail: (0, testProducts.X8)() },
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								PaymentDetailUpdateContainer,
								{ productType: productTypes.Pm.guardianweekly },
							),
						},
					},
				},
				NewspaperVoucherPaypal = {
					render: () => (
						setSiteKey(),
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							PaymentDetailUpdate,
							{ productType: productTypes.Pm.voucher },
						)
					),
					parameters: {
						reactRouter: {
							state: { productDetail: (0, testProducts.Y$)() },
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								PaymentDetailUpdateContainer,
								{ productType: productTypes.Pm.voucher },
							),
						},
					},
				},
				GuardianWeeklyExpiredCard = {
					render: () => (
						setSiteKey(),
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							PaymentDetailUpdate,
							{ productType: productTypes.Pm.guardianweekly },
						)
					),
					parameters: {
						reactRouter: {
							state: { productDetail: (0, testProducts.Pl)() },
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								PaymentDetailUpdateContainer,
								{ productType: productTypes.Pm.guardianweekly },
							),
						},
					},
				};
			(GuardianWeeklyCard.parameters = {
				...GuardianWeeklyCard.parameters,
				docs: {
					...GuardianWeeklyCard.parameters?.docs,
					source: {
						originalSource:
							'{\n  render: () => {\n    setSiteKey();\n    return <PaymentDetailUpdate productType={PRODUCT_TYPES.guardianweekly} />;\n  },\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: guardianWeeklyPaidByCard()\n      },\n      container: <PaymentDetailUpdateContainer productType={PRODUCT_TYPES.guardianweekly} />\n    }\n  }\n}',
						...GuardianWeeklyCard.parameters?.docs?.source,
					},
				},
			}),
				(NewspaperVoucherPaypal.parameters = {
					...NewspaperVoucherPaypal.parameters,
					docs: {
						...NewspaperVoucherPaypal.parameters?.docs,
						source: {
							originalSource:
								'{\n  render: () => {\n    setSiteKey();\n    return <PaymentDetailUpdate productType={PRODUCT_TYPES.voucher} />;\n  },\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: newspaperVoucherPaidByPaypal()\n      },\n      container: <PaymentDetailUpdateContainer productType={PRODUCT_TYPES.voucher} />\n    }\n  }\n}',
							...NewspaperVoucherPaypal.parameters?.docs?.source,
						},
					},
				}),
				(GuardianWeeklyExpiredCard.parameters = {
					...GuardianWeeklyExpiredCard.parameters,
					docs: {
						...GuardianWeeklyExpiredCard.parameters?.docs,
						source: {
							originalSource:
								'{\n  render: () => {\n    setSiteKey();\n    return <PaymentDetailUpdate productType={PRODUCT_TYPES.guardianweekly} />;\n  },\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: guardianWeeklyExpiredCard()\n      },\n      container: <PaymentDetailUpdateContainer productType={PRODUCT_TYPES.guardianweekly} />\n    }\n  }\n}',
							...GuardianWeeklyExpiredCard.parameters?.docs
								?.source,
						},
					},
				});
			const __namedExportsOrder = [
				'GuardianWeeklyCard',
				'NewspaperVoucherPaypal',
				'GuardianWeeklyExpiredCard',
			];
		},
	},
]);
