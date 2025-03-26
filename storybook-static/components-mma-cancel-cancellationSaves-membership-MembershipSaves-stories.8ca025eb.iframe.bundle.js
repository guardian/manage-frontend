'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[2573],
	{
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
		'./client/components/mma/shared/assets/TickInCircle.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				G: () => TickInCircle,
			});
			var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
				__webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				);
			var _ref = { name: '40f4ru', styles: 'vertical-align:top' },
				TickInCircle = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.BX)(
						'svg',
						{
							width: '22',
							height: '22',
							viewBox: '0 0 22 22',
							fill: 'none',
							css: [_ref, props.additionalCss, '', ''],
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
									'circle',
									{
										cx: '11',
										cy: '11',
										r: '11',
										fill: props.fill || '#22874D',
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
									'path',
									{
										d: 'M6.59203 10.8413L6.50369 10.757L6.4173 10.8433L5.91161 11.349L5.83674 11.4239L5.89828 11.5101L8.42673 15.0499L8.46412 15.1022H8.52844H8.76865H8.82169L8.85854 15.0641L16.0899 7.5799L16.1764 7.49042L16.0873 7.40355L15.5816 6.9105L15.4975 6.82848L15.4104 6.90737L8.7709 12.9228L6.59203 10.8413Z',
										fill: 'white',
										stroke: 'white',
										strokeWidth: '0.25',
									},
								),
							],
						},
					);
			try {
				(TickInCircle.displayName = 'TickInCircle'),
					(TickInCircle.__docgenInfo = {
						description: '',
						displayName: 'TickInCircle',
						props: {
							fill: {
								defaultValue: null,
								description: '',
								name: 'fill',
								required: !1,
								type: { name: 'string' },
							},
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
							'client/components/mma/shared/assets/TickInCircle.tsx#TickInCircle'
						] = {
							docgenInfo: TickInCircle.__docgenInfo,
							name: 'TickInCircle',
							path: 'client/components/mma/shared/assets/TickInCircle.tsx#TickInCircle',
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
		'./client/components/mma/cancel/cancellationSaves/membership/MembershipSaves.stories.tsx':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.r(__webpack_exports__),
					__webpack_require__.d(__webpack_exports__, {
						ConfirmCancellation: () => ConfirmCancellation,
						ContinueMembership: () => ContinueMembership,
						Reasons: () => Reasons,
						SwitchCompleteThankYou: () => SwitchCompleteThankYou,
						SwitchOptions: () => SwitchOptions,
						SwitchReview: () => SwitchReview,
						ValueOfSupportPage: () => ValueOfSupportPage,
						__namedExportsOrder: () => __namedExportsOrder,
						default: () => MembershipSaves_stories,
					});
				var ReactRouterDecorator = __webpack_require__(
						'./.storybook/ReactRouterDecorator.tsx',
					),
					productTypes = __webpack_require__(
						'./shared/productTypes.ts',
					),
					testProducts = __webpack_require__(
						'./client/fixtures/productBuilder/testProducts.ts',
					),
					CancellationContainer = __webpack_require__(
						'./client/components/mma/cancel/CancellationContainer.tsx',
					),
					SelectReason = __webpack_require__(
						'./client/components/mma/cancel/cancellationSaves/SelectReason.tsx',
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
					palette = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
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
					productResponse = __webpack_require__(
						'./shared/productResponse.ts',
					),
					ButtonStyles = __webpack_require__(
						'./client/styles/ButtonStyles.ts',
					),
					utilities_fetch = __webpack_require__(
						'./client/utilities/fetch.ts',
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
					Heading = __webpack_require__(
						'./client/components/mma/shared/Heading.tsx',
					),
					ProgressStepper = __webpack_require__(
						'./client/components/mma/shared/ProgressStepper.tsx',
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
				var _ref = { name: 'f7ay7b', styles: 'justify-content:center' },
					ConfirmMembershipCancellation = () => {
						var navigate = (0, react_router.s0)(),
							{ productDetail, productType } = (0,
							react.useContext)(CancellationContainer.DW),
							[isSubmitting, setIsSubmitting] = (0,
							react.useState)(!1),
							[loadingFailed, setLoadingFailed] = (0,
							react.useState)(!1),
							routerState = (0, react_router.TH)().state,
							reason = 'mma_membership_cancellation_default',
							cancelMembership = (function () {
								var _ref2 = _asyncToGenerator(function* (
									subscriptionId,
									withSubscriptionResponseFetcher,
								) {
									return (
										yield (0, utilities_fetch.n4)(
											'/api/cancel/'.concat(
												subscriptionId,
											),
											{
												method: 'POST',
												body: JSON.stringify({
													reason,
												}),
												headers: {
													'Content-Type':
														'application/json',
												},
											},
										),
										withSubscriptionResponseFetcher()
									);
								});
								return function cancelMembership(_x, _x2) {
									return _ref2.apply(this, arguments);
								};
							})(),
							postCancellation = (function () {
								var _ref3 = _asyncToGenerator(function* () {
									if (!isSubmitting)
										try {
											setIsSubmitting(!0);
											var caseResponse = yield ((
												selectedReasonId,
												productType,
												productDetail,
											) =>
												fetch('/api/case', {
													method: 'POST',
													body: JSON.stringify({
														reason: selectedReasonId,
														product:
															productType
																.cancellation
																.sfCaseProduct,
														subscriptionName:
															productDetail
																.subscription
																.subscriptionId,
														gaData: '',
													}),
													headers: {
														'Content-Type':
															'application/json',
														[productResponse.l2]:
															''.concat(
																productDetail.isTestUser,
															),
													},
												}))(
												reason,
												productType,
												productDetail,
											);
											if (
												null ===
												(yield (0,
												DefaultApiResponseHandler.xJ)(
													caseResponse,
												))
											)
												return (
													setIsSubmitting(!1),
													void setLoadingFailed(!0)
												);
											var cancelResponse =
													yield cancelMembership(
														productDetail
															.subscription
															.subscriptionId,
														(0, productUtils.w)(
															productType.allProductsProductTypeFilterString,
															productDetail
																.subscription
																.subscriptionId,
														),
													),
												cancelData = yield (0,
												DefaultApiResponseHandler.xJ)(
													cancelResponse,
												);
											if (null === cancelData)
												return (
													setIsSubmitting(!1),
													void setLoadingFailed(!0)
												);
											var membership = cancelData
												.products[0] || {
												subscription: {},
											};
											0 ===
												Object.keys(
													membership.subscription,
												).length ||
											membership.subscription.cancelledAt
												? navigate('../reasons', {
														state: _objectSpread(
															_objectSpread(
																{},
																routerState,
															),
															{},
															{
																journeyCompleted:
																	!0,
															},
														),
												  })
												: (setIsSubmitting(!1),
												  setLoadingFailed(!0));
										} catch (_unused) {
											setIsSubmitting(!1),
												setLoadingFailed(!0);
										}
								});
								return function postCancellation() {
									return _ref3.apply(this, arguments);
								};
							})();
						return loadingFailed
							? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
									GenericErrorScreen.c,
									{
										loggingMessage:
											'Cancel journey case id api call failed during the cancellation process',
									},
							  )
							: (0, emotion_react_jsx_runtime_browser_esm.BX)(
									emotion_react_jsx_runtime_browser_esm.HY,
									{
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												ProgressStepper.S,
												{
													steps: [
														{ title: 'Details' },
														{ title: 'Options' },
														{
															title: 'Confirmation',
															isCurrentStep: !0,
														},
													],
													additionalCSS: (0,
													emotion_react_browser_esm.iv)(
														'margin:',
														space.D[5],
														'px 0 ',
														space.D[12],
														'px;max-width:350px;',
														'',
													),
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												Stack.K,
												{
													space: 4,
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															Heading.X,
															{
																children:
																	'Are you sure you want to cancel your Membership?',
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
																	'Please keep in mind that you will be losing access to your supporter benefits.',
																	' ',
																],
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
																	'If you cancel you will not be able to rejoin the Guardian Members scheme, as it’s now closed to new members.',
															},
														),
													],
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'div',
												{
													css: ButtonStyles.SX,
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															Button.z,
															{
																onClick:
																	postCancellation,
																isLoading:
																	isSubmitting,
																cssOverrides:
																	(0,
																	emotion_react_browser_esm.iv)(
																		'background-color:',
																		palette
																			.palette
																			.news[400],
																		';justify-content:center;:hover{background-color:',
																		palette
																			.palette
																			.news[200],
																		';}',
																		'',
																	),
																children:
																	'Confirm Cancellation',
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															Button.z,
															{
																priority:
																	'tertiary',
																onClick: () =>
																	navigate(
																		'../offers',
																		{
																			state: _objectSpread(
																				{},
																				routerState,
																			),
																		},
																	),
																cssOverrides:
																	_ref,
																children:
																	'Back to options',
															},
														),
													],
												},
											),
										],
									},
							  );
					},
					mq = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
					),
					LinkButton = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/button/LinkButton.js',
					),
					dates = __webpack_require__('./shared/dates.ts'),
					GenericStyles = __webpack_require__(
						'./client/styles/GenericStyles.ts',
					),
					membershipPriceRise = __webpack_require__(
						'./client/utilities/pricingConfig/membershipPriceRise.ts',
					),
					ContinueMembershipConfirmation = () => {
						var _mainPlan$chargedThro,
							navigate = (0, react_router.s0)(),
							membership = (0, react.useContext)(
								CancellationContainer.DW,
							).productDetail,
							mainPlan = (0, productResponse.fr)(
								membership.subscription,
							),
							newMembershipPriceDisplay = ''
								.concat(mainPlan.currency)
								.concat((0, membershipPriceRise.b)(mainPlan));
						return (0, emotion_react_jsx_runtime_browser_esm.BX)(
							emotion_react_jsx_runtime_browser_esm.HY,
							{
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										ProgressStepper.S,
										{
											steps: [
												{ title: 'Details' },
												{ title: 'Options' },
												{
													title: 'Confirmation',
													isCurrentStep: !0,
												},
											],
											additionalCSS: (0,
											emotion_react_browser_esm.iv)(
												'margin:',
												space.D[5],
												'px 0 ',
												space.D[12],
												'px;max-width:350px;',
												'',
											),
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										Stack.K,
										{
											space: 4,
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'h2',
													{
														css: GenericStyles.Wn,
														children:
															'Thank you for keeping your Membership',
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
															mq.Dp.tablet,
															'{span{display:block;}}',
															'',
														),
														children: [
															'The price of your Membership is ',
															newMembershipPriceDisplay,
															'/',
															mainPlan.billingPeriod,
															'.',
															' ',
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'span',
																{
																	children: [
																		'Your first billing date will be',
																		' ',
																		(0,
																		dates.e1)(
																			null !==
																				(_mainPlan$chargedThro =
																					mainPlan.chargedThrough) &&
																				void 0 !==
																					_mainPlan$chargedThro
																				? _mainPlan$chargedThro
																				: void 0,
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
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'div',
										{
											css: ButtonStyles.UD,
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													Button.z,
													{
														priority: 'tertiary',
														onClick: () =>
															navigate('/'),
														cssOverrides:
															ButtonStyles._8,
														children:
															'Back to my account',
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													LinkButton.Q,
													{
														href: 'https://theguardian.com',
														cssOverrides:
															ButtonStyles._8,
														children:
															'Continue to the Guardian',
													},
												),
											],
										},
									),
								],
							},
						);
					},
					SvgClock = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgClock.js',
					),
					SvgCreditCard = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgCreditCard.js',
					),
					theme_reader_revenue = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/button/theme-reader-revenue.js',
					),
					ErrorSummary = __webpack_require__(
						'./node_modules/@guardian/source-development-kitchen/dist/react-components/summary/ErrorSummary.js',
					),
					ErrorStyles = __webpack_require__(
						'./client/styles/ErrorStyles.ts',
					),
					Card = __webpack_require__(
						'./client/components/mma/shared/Card.tsx',
					),
					PaymentDetails = __webpack_require__(
						'./client/components/mma/shared/PaymentDetails.tsx',
					);
				var cardSectionCss = (0, emotion_react_browser_esm.iv)(
						'margin-top:',
						space.D[5],
						'px;',
						mq.Dp.tablet,
						'{padding-top:',
						space.D[5],
						'px;border-top:1px solid ',
						palette.palette.neutral[86],
						';}',
						'',
					),
					newAmountCss = (0, emotion_react_browser_esm.iv)(
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
					productSubtitleCss = (0, emotion_react_browser_esm.iv)(
						typography.Kie,
						';color:',
						palette.palette.neutral[100],
						';margin:0;max-width:20ch;',
						'',
					),
					cardHeaderDivCss = {
						name: '1laz9o6',
						styles: 'display:flex;justify-content:space-between;align-items:flex-end',
					};
				mq.C4.tablet;
				function MembershipSwitch_ownKeys(e, r) {
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
				function MembershipSwitch_objectSpread(e) {
					for (var r = 1; r < arguments.length; r++) {
						var t = null != arguments[r] ? arguments[r] : {};
						r % 2
							? MembershipSwitch_ownKeys(Object(t), !0).forEach(
									function (r) {
										MembershipSwitch_defineProperty(
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
							: MembershipSwitch_ownKeys(Object(t)).forEach(
									function (r) {
										Object.defineProperty(
											e,
											r,
											Object.getOwnPropertyDescriptor(
												t,
												r,
											),
										);
									},
							  );
					}
					return e;
				}
				function MembershipSwitch_defineProperty(obj, key, value) {
					return (
						(key = (function MembershipSwitch_toPropertyKey(arg) {
							var key = (function MembershipSwitch_toPrimitive(
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
				function MembershipSwitch_asyncGeneratorStep(
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
				var YourNewSupport = (_ref) => {
						var {
							contributionPriceDisplay,
							billingPeriod,
							monthlyOrAnnual,
						} = _ref;
						return (0, emotion_react_jsx_runtime_browser_esm.BX)(
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
											children: 'Your new support',
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										Card.Z,
										{
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													Card.Z.Header,
													{
														backgroundColor:
															palette.palette
																.brand[400],
														children: (0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'h3',
															{
																css: GenericStyles.Ai,
																children:
																	monthlyOrAnnual,
															},
														),
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													Card.Z.Section,
													{
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'p',
																{
																	css: (0,
																	emotion_react_browser_esm.iv)(
																		typography.Kz0,
																		';margin:0;',
																		'',
																	),
																	children: [
																		monthlyOrAnnual,
																		' support with fewer funding asks and an exclusive email from the newsroom',
																	],
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'p',
																{
																	css: newAmountCss,
																	children: [
																		contributionPriceDisplay,
																		'/',
																		billingPeriod,
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
						);
					},
					WhatHappensNext = (props) => {
						var _props$subscription$n,
							nextPaymentDate = (0, dates.ur)(
								(0, dates.sG)(
									null !==
										(_props$subscription$n =
											props.subscription
												.nextPaymentDate) &&
										void 0 !== _props$subscription$n
										? _props$subscription$n
										: '',
								).date,
								'd MMMM',
							);
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
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
																children: [
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
																								'Your new support will start at the end of your billing period',
																						},
																					),
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						'br',
																						{},
																					),
																					'You will be charged ',
																					props.contributionPriceDisplay,
																					' ',
																					'from the ',
																					nextPaymentDate,
																					'. From that date, you will continue to receive the supporter newsletter and see fewer support asks but you will lose access to premium features in the App and ad-free reading.',
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
																		SvgCreditCard.n,
																		{
																			size: 'medium',
																		},
																	),
																	(0,
																	emotion_react_jsx_runtime_browser_esm.BX)(
																		'span',
																		{
																			'data-qm-masking':
																				'blocklist',
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
																					'The payment will be taken from',
																					' ',
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						PaymentDetails.g,
																						{
																							subscription:
																								props.subscription,
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
						);
					},
					TsAndCs = (_ref2) => {
						var {
							contributionPriceDisplay,
							paymentDay,
							paymentMonth,
						} = _ref2;
						return (0, emotion_react_jsx_runtime_browser_esm.BX)(
							'section',
							{
								css: GenericStyles.zC,
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'p',
										{
											css: GenericStyles.wx,
											children: [
												'We will attempt to take payment of ',
												contributionPriceDisplay,
												', on the ',
												paymentDay,
												' day of ',
												paymentMonth,
												', from now until you cancel your payment. Payments may take up to 6 days to be recorded in your bank account. You can change how much you give or cancel your payment at any time.',
											],
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'p',
										{
											css: GenericStyles.wx,
											children: [
												'By proceeding, you are agreeing to our',
												' ',
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'a',
													{
														href: 'https://www.theguardian.com/info/2016/apr/04/contribution-terms-and-conditions',
														children:
															'Terms and Conditions',
													},
												),
												'.',
											],
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'p',
										{
											css: GenericStyles.wx,
											children: [
												'To find out what personal data we collect and how we use it, please visit our',
												' ',
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'a',
													{
														href: 'https://www.theguardian.com/help/privacy-policy',
														children:
															'Privacy Policy',
													},
												),
												'.',
											],
										},
									),
								],
							},
						);
					},
					MembershipSwitch = () => {
						var _mainPlan$chargedThro,
							_mainPlan$chargedThro2,
							navigate = (0, react_router.s0)(),
							routerState = (0, react_router.TH)().state,
							membership = (0, react.useContext)(
								CancellationContainer.DW,
							).productDetail,
							[isSwitching, setIsSwitching] = (0, react.useState)(
								!1,
							),
							[switchingError, setSwitchingError] = (0,
							react.useState)(!1),
							pageTitleContext = (0, react.useContext)(
								CancellationContainer.mc,
							);
						if (
							((0, react.useEffect)(() => {
								pageTitleContext.setPageTitle(
									'Change your support',
								);
							}, [pageTitleContext]),
							!membership)
						)
							return (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								react_router.Fg,
								{ to: '/' },
							);
						var mainPlan = (0, productResponse.fr)(
								membership.subscription,
							),
							contributionPriceDisplay = ''
								.concat(mainPlan.currency)
								.concat((0, membershipPriceRise.a)(mainPlan)),
							billingPeriod = mainPlan.billingPeriod,
							monthlyOrAnnual = (0, productTypes.xm)(
								billingPeriod,
							),
							indefiniteArticle =
								'Monthly' === monthlyOrAnnual ? 'a' : 'an',
							paymentDay = (0, dates.sG)(
								null !==
									(_mainPlan$chargedThro =
										mainPlan.chargedThrough) &&
									void 0 !== _mainPlan$chargedThro
									? _mainPlan$chargedThro
									: void 0,
							).dateStr('do'),
							paymentMonth =
								'Monthly' === monthlyOrAnnual
									? 'every month'
									: (0, dates.sG)(
											null !==
												(_mainPlan$chargedThro2 =
													mainPlan.chargedThrough) &&
												void 0 !==
													_mainPlan$chargedThro2
												? _mainPlan$chargedThro2
												: void 0,
									  ).dateStr('MMMM'),
							confirmSwitch = (function () {
								var _ref3 =
									(function MembershipSwitch_asyncToGenerator(
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
													MembershipSwitch_asyncGeneratorStep(
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
													MembershipSwitch_asyncGeneratorStep(
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
									})(function* () {
										if (!isSwitching)
											try {
												setIsSwitching(!0);
												var response = yield fetch(
													'/api/product-move/'
														.concat(
															'to-recurring-contribution',
															'/',
														)
														.concat(
															membership
																.subscription
																.subscriptionId,
														),
													{
														method: 'POST',
														body: JSON.stringify({
															price: (0,
															membershipPriceRise.a)(
																mainPlan,
															),
															preview: !1,
															checkChargeAmountBeforeUpdate:
																!1,
														}),
														headers: {
															'Content-Type':
																'application/json',
															[productResponse.l2]:
																''.concat(
																	membership.isTestUser,
																),
														},
													},
												);
												null ===
												(yield (0,
												DefaultApiResponseHandler.xJ)(
													response,
												))
													? (setIsSwitching(!1),
													  setSwitchingError(!0))
													: navigate(
															'../switch-thank-you',
															{
																state: MembershipSwitch_objectSpread(
																	MembershipSwitch_objectSpread(
																		{},
																		routerState,
																	),
																	{},
																	{
																		journeyCompleted:
																			!0,
																	},
																),
															},
													  );
											} catch (_unused) {
												setIsSwitching(!1),
													setSwitchingError(!0);
											}
									});
								return function confirmSwitch() {
									return _ref3.apply(this, arguments);
								};
							})();
						return (0, emotion_react_jsx_runtime_browser_esm.BX)(
							emotion_react_jsx_runtime_browser_esm.HY,
							{
								children: [
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
														children:
															'Review and confirm change',
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'p',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															typography.Kz0,
															';margin:0;',
															'',
														),
														children: [
															'Please confirm that you’re changing support type from a Membership to ',
															indefiniteArticle,
															' ',
															monthlyOrAnnual,
															' ',
															'contribution.',
														],
													},
												),
											],
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										YourNewSupport,
										{
											contributionPriceDisplay,
											billingPeriod,
											monthlyOrAnnual,
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										WhatHappensNext,
										{
											contributionPriceDisplay,
											subscription:
												membership.subscription,
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'section',
										{
											css: GenericStyles.zC,
											children: (0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'p',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														typography.Kz0,
														';border-top:1px solid ',
														palette.palette
															.neutral[86],
														';padding-top:',
														space.D[5],
														'px;',
														'',
													),
													children:
														'Please note if you confirm the change you will not be able to rejoin the Guardian Members scheme, as it’s now closed to new members.',
												},
											),
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
													ErrorSummary.X,
													{
														message:
															'We were unable to change your support',
														context: (0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															SwitchErrorContext,
															{},
														),
														cssOverrides:
															ErrorStyles.p,
													},
												),
											},
										),
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'section',
										{
											css: [
												GenericStyles.zC,
												ButtonStyles.SX,
												'',
												'',
											],
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													Button.z,
													{
														theme: theme_reader_revenue.gk,
														cssOverrides: [
															ButtonStyles._8,
															ButtonStyles.mb,
														],
														isLoading: isSwitching,
														onClick: confirmSwitch,
														children:
															'Confirm change',
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
															navigate(
																'../offers',
																{
																	state: MembershipSwitch_objectSpread(
																		{},
																		routerState,
																	),
																},
															),
														children: 'Back',
													},
												),
											],
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										TsAndCs,
										{
											contributionPriceDisplay,
											paymentDay,
											paymentMonth,
										},
									),
								],
							},
						);
					};
				function SwitchErrorContext() {
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: [
								'Please ensure your payment details are correct. If the problem persists get in touch at',
								' ',
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'a',
									{
										css: ErrorStyles.nZ,
										href: 'mailto:customer.help@guardian.com',
										children: 'customer.help@guardian.com',
									},
								),
								'.',
							],
						},
					);
				}
				var BenefitsConfiguration = __webpack_require__(
						'./client/components/mma/shared/benefits/BenefitsConfiguration.ts',
					),
					BenefitsSection = __webpack_require__(
						'./client/components/mma/shared/benefits/BenefitsSection.tsx',
					);
				function SaveOptions_ownKeys(e, r) {
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
				function SaveOptions_objectSpread(e) {
					for (var r = 1; r < arguments.length; r++) {
						var t = null != arguments[r] ? arguments[r] : {};
						r % 2
							? SaveOptions_ownKeys(Object(t), !0).forEach(
									function (r) {
										SaveOptions_defineProperty(e, r, t[r]);
									},
							  )
							: Object.getOwnPropertyDescriptors
							? Object.defineProperties(
									e,
									Object.getOwnPropertyDescriptors(t),
							  )
							: SaveOptions_ownKeys(Object(t)).forEach(function (
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
				function SaveOptions_defineProperty(obj, key, value) {
					return (
						(key = (function SaveOptions_toPropertyKey(arg) {
							var key = (function SaveOptions_toPrimitive(
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
				var NewPriceIcon = () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)('div', {
							css: (0, emotion_react_browser_esm.iv)(
								typography.zlp,
								';color:',
								palette.palette.sport[300],
								';background-color:',
								palette.palette.neutral[100],
								';border:1px solid ',
								palette.palette.sport[300],
								';border-radius:19px;padding:0 ',
								space.D[2],
								'px;margin-left:',
								space.D[3],
								'px;',
								mq.Dp.tablet,
								'{position:absolute;top:-10px;}',
								'',
							),
							children: 'New price',
						}),
					SaveOptions = () => {
						var navigate = (0, react_router.s0)(),
							routerState = (0, react_router.TH)().state,
							membership = (0, react.useContext)(
								CancellationContainer.DW,
							).productDetail;
						if (!membership)
							return (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								react_router.Fg,
								{ to: '/' },
							);
						var mainPlan = (0, productResponse.fr)(
								membership.subscription,
							),
							billingPeriod = mainPlan.billingPeriod,
							monthlyOrAnnual = (0, productTypes.xm)(
								billingPeriod,
							),
							oldPriceDisplay = ''
								.concat(mainPlan.currency)
								.concat((0, membershipPriceRise.a)(mainPlan)),
							newPriceDisplay = ''
								.concat(mainPlan.currency)
								.concat((0, membershipPriceRise.b)(mainPlan));
						return (0, emotion_react_jsx_runtime_browser_esm.BX)(
							emotion_react_jsx_runtime_browser_esm.HY,
							{
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										ProgressStepper.S,
										{
											steps: [
												{ title: 'Details' },
												{
													title: 'Options',
													isCurrentStep: !0,
												},
												{ title: 'Confirmation' },
											],
											additionalCSS: (0,
											emotion_react_browser_esm.iv)(
												'margin:',
												space.D[5],
												'px 0 ',
												space.D[12],
												'px;max-width:350px;',
												'',
											),
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										Stack.K,
										{
											space: 4,
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'section',
													{
														css: GenericStyles.zC,
														children: (0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'h2',
															{
																css: GenericStyles.Wn,
																children:
																	'Are you sure you want to lose your exclusive benefits?',
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
															Heading.X,
															{
																sansSerif: !0,
																children:
																	'Keep your Membership',
															},
														),
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
															'Enjoy all of your exclusive benefits. The new price has increased from ',
															oldPriceDisplay,
															'/',
															billingPeriod,
															' to',
															' ',
															newPriceDisplay,
															'/',
															billingPeriod,
															'.',
														],
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													Card.Z,
													{
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																Card.Z.Header,
																{
																	backgroundColor:
																		palette
																			.palette
																			.sport[300],
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
																									'Membership',
																							},
																						),
																						(0,
																						emotion_react_jsx_runtime_browser_esm.BX)(
																							'div',
																							{
																								css: (0,
																								emotion_react_browser_esm.iv)(
																									mq
																										.C4
																										.tablet,
																									'{display:flex;flex-direction:column-reverse;}',
																									'',
																								),
																								children:
																									[
																										(0,
																										emotion_react_jsx_runtime_browser_esm.tZ)(
																											NewPriceIcon,
																											{},
																										),
																										(0,
																										emotion_react_jsx_runtime_browser_esm.BX)(
																											'p',
																											{
																												css: productSubtitleCss,
																												children:
																													[
																														newPriceDisplay,
																														'/',
																														billingPeriod,
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
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																Card.Z.Section,
																{
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			BenefitsSection.c,
																			{
																				benefits:
																					BenefitsConfiguration.O7.membership.filter(
																						(
																							benefit,
																						) =>
																							(0,
																							BenefitsConfiguration.BQ)(
																								benefit,
																								mainPlan.currencyISO,
																							),
																					),
																			},
																		),
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'section',
																			{
																				css: [
																					cardSectionCss,
																					ButtonStyles.A3,
																					'',
																					'',
																				],
																				children:
																					(0,
																					emotion_react_jsx_runtime_browser_esm.BX)(
																						Button.z,
																						{
																							theme: theme_reader_revenue.gk,
																							cssOverrides:
																								ButtonStyles._8,
																							size: 'small',
																							onClick:
																								() =>
																									navigate(
																										'../thank-you',
																									),
																							children:
																								[
																									'Keep my Membership for ',
																									newPriceDisplay,
																									'/',
																									billingPeriod,
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
														emotion_react_jsx_runtime_browser_esm.tZ)(
															Heading.X,
															{
																sansSerif: !0,
																children:
																	'Stay a supporter at no extra cost',
															},
														),
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
															'You will lose access to some of your benefits, but will keep funding Guardian journalism.',
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													Card.Z,
													{
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																Card.Z.Header,
																{
																	backgroundColor:
																		palette
																			.palette
																			.brand[400],
																	children:
																		(0,
																		emotion_react_jsx_runtime_browser_esm.BX)(
																			'div',
																			{
																				css: cardHeaderDivCss,
																				children:
																					[
																						(0,
																						emotion_react_jsx_runtime_browser_esm.BX)(
																							'h3',
																							{
																								css: GenericStyles.Ai,
																								children:
																									[
																										monthlyOrAnnual,
																										' contribution',
																									],
																							},
																						),
																						(0,
																						emotion_react_jsx_runtime_browser_esm.BX)(
																							'p',
																							{
																								css: productSubtitleCss,
																								children:
																									[
																										oldPriceDisplay,
																										'/',
																										billingPeriod,
																									],
																							},
																						),
																					],
																			},
																		),
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																Card.Z.Section,
																{
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			BenefitsSection.c,
																			{
																				benefits:
																					BenefitsConfiguration.O7.contributions.filter(
																						(
																							benefit,
																						) =>
																							(0,
																							BenefitsConfiguration.BQ)(
																								benefit,
																								mainPlan.currencyISO,
																							),
																					),
																			},
																		),
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'section',
																			{
																				css: [
																					cardSectionCss,
																					ButtonStyles.A3,
																					'',
																					'',
																				],
																				children:
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						Button.z,
																						{
																							theme: theme_reader_revenue.gk,
																							cssOverrides:
																								ButtonStyles._8,
																							size: 'small',
																							onClick:
																								() =>
																									navigate(
																										'../switch-offer',
																										{
																											state: SaveOptions_objectSpread(
																												{},
																												routerState,
																											),
																										},
																									),
																							children:
																								'Become a recurring contributor',
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
												emotion_react_jsx_runtime_browser_esm.BX)(
													'section',
													{
														css: GenericStyles.zC,
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																Heading.X,
																{
																	sansSerif:
																		!0,
																	children:
																		'Cancel your Membership',
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
																		'Please note if you cancel you will not be able to rejoin the Guardian Members scheme, as it’s now closed to new Members',
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'div',
																{
																	css: ButtonStyles.A3,
																	children:
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			Button.z,
																			{
																				cssOverrides:
																					ButtonStyles._8,
																				priority:
																					'tertiary',
																				size: 'small',
																				onClick:
																					() =>
																						navigate(
																							'../confirm',
																							{
																								state: SaveOptions_objectSpread(
																									{},
																									routerState,
																								),
																							},
																						),
																				children:
																					'Cancel Membership',
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
								],
							},
						);
					},
					SvgEnvelope = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgEnvelope.js',
					),
					SvgCalendar = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgCalendar.js',
					),
					SwitchThankYou = () => {
						var _routerState$user,
							_mainPlan$chargedThro,
							navigate = (0, react_router.s0)(),
							routerState = (0, react_router.TH)().state,
							pageTitleContext = (0, react.useContext)(
								CancellationContainer.mc,
							),
							membership = (0, react.useContext)(
								CancellationContainer.DW,
							).productDetail,
							userEmailAddress =
								null == routerState ||
								null ===
									(_routerState$user = routerState.user) ||
								void 0 === _routerState$user
									? void 0
									: _routerState$user.email;
						if (
							((0, react.useEffect)(() => {
								pageTitleContext.setPageTitle(
									'Change your support',
								);
							}, [pageTitleContext]),
							!membership)
						)
							return (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								react_router.Fg,
								{ to: '/' },
							);
						var mainPlan = (0, productResponse.fr)(
								membership.subscription,
							),
							contributionPriceDisplay = ''
								.concat(mainPlan.currency)
								.concat((0, membershipPriceRise.a)(mainPlan)),
							billingPeriod = mainPlan.billingPeriod,
							nextBillingDate = (0, dates.sG)(
								null !==
									(_mainPlan$chargedThro =
										mainPlan.chargedThrough) &&
									void 0 !== _mainPlan$chargedThro
									? _mainPlan$chargedThro
									: void 0,
							).dateStr(dates.Bn);
						return (0, emotion_react_jsx_runtime_browser_esm.BX)(
							emotion_react_jsx_runtime_browser_esm.HY,
							{
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'section',
										{
											css: GenericStyles.zC,
											children: (0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												Stack.K,
												{
													space: 4,
													children: (0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'h2',
														{
															css: GenericStyles.Wn,
															children: [
																'Thank you for supporting us with',
																' ',
																contributionPriceDisplay,
																'/',
																billingPeriod,
															],
														},
													),
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
																	GenericStyles.rt,
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
																						SvgEnvelope.j,
																						{
																							size: 'medium',
																						},
																					),
																					(0,
																					emotion_react_jsx_runtime_browser_esm.BX)(
																						'span',
																						{
																							'data-qm-masking':
																								'blocklist',
																							children:
																								[
																									'We will send a confirmation email to you at',
																									' ',
																									userEmailAddress,
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
																			children:
																				[
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						SvgCalendar.c,
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
																									'This change will happen on your next billing date of ',
																									nextBillingDate,
																									'.',
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
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'section',
										{
											css: GenericStyles.zC,
											children: (0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'div',
												{
													css: ButtonStyles.SX,
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															LinkButton.Q,
															{
																href: 'https://theguardian.com',
																cssOverrides:
																	ButtonStyles._8,
																children:
																	'Continue to the Guardian',
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															Button.z,
															{
																priority:
																	'tertiary',
																cssOverrides:
																	ButtonStyles._8,
																onClick: () =>
																	navigate(
																		'/',
																	),
																children:
																	'Back to my account',
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
				function ValueOfSupport_ownKeys(e, r) {
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
				function ValueOfSupport_objectSpread(e) {
					for (var r = 1; r < arguments.length; r++) {
						var t = null != arguments[r] ? arguments[r] : {};
						r % 2
							? ValueOfSupport_ownKeys(Object(t), !0).forEach(
									function (r) {
										ValueOfSupport_defineProperty(
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
							: ValueOfSupport_ownKeys(Object(t)).forEach(
									function (r) {
										Object.defineProperty(
											e,
											r,
											Object.getOwnPropertyDescriptor(
												t,
												r,
											),
										);
									},
							  );
					}
					return e;
				}
				function ValueOfSupport_defineProperty(obj, key, value) {
					return (
						(key = (function ValueOfSupport_toPropertyKey(arg) {
							var key = (function ValueOfSupport_toPrimitive(
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
				var ValueOfSupport = () => {
					var navigate = (0, react_router.s0)(),
						productDetail = (0, react.useContext)(
							CancellationContainer.DW,
						).productDetail,
						routerState = (0, react_router.TH)().state;
					if (!productDetail)
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							react_router.Fg,
							{ to: '/' },
						);
					var supportStartYear = (0, dates.ur)(
						new Date(productDetail.joinDate),
						'yyyy',
					);
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									ProgressStepper.S,
									{
										steps: [
											{
												title: 'Details',
												isCurrentStep: !0,
											},
											{ title: 'Options' },
											{ title: 'Confirmation' },
										],
										additionalCSS: (0,
										emotion_react_browser_esm.iv)(
											'margin:',
											space.D[5],
											'px 0 ',
											space.D[12],
											'px;max-width:350px;',
											'',
										),
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									Stack.K,
									{
										space: 4,
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'h2',
												{
													css: GenericStyles.Wn,
													children: [
														'Thank you for supporting the Guardian since',
														' ',
														supportStartYear,
														'.',
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'span',
															{
																children:
																	'Your funding has played a vital role in our progress',
															},
														),
													],
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
														"Since you first joined as a Guardian Member, we've lived through some of the most important news events of our times. Without you, our fearless, independent journalism wouldn't have reached millions around the world. We're so grateful.",
												},
											),
										],
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'div',
									{
										css: ButtonStyles.fT,
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												Button.z,
												{
													priority: 'tertiary',
													cssOverrides:
														ButtonStyles._8,
													onClick: () =>
														navigate('/'),
													children:
														'Back to my account',
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												Button.z,
												{
													iconSide: 'right',
													cssOverrides:
														ButtonStyles._8,
													onClick: () =>
														navigate('../offers', {
															state: ValueOfSupport_objectSpread(
																{},
																routerState,
															),
														}),
													children:
														'Continue to cancellation',
												},
											),
										],
									},
								),
							],
						},
					);
				};
				const MembershipSaves_stories = {
					title: 'Pages/MembershipSave',
					component: CancellationContainer.OY,
					decorators: [ReactRouterDecorator.R],
					parameters: {
						layout: 'fullscreen',
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
					},
				};
				var ValueOfSupportPage = () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							ValueOfSupport,
							{},
						),
					SwitchReview = () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							MembershipSwitch,
							{},
						),
					SwitchOptions = () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							SaveOptions,
							{},
						),
					Reasons = () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							SelectReason.M,
							{},
						),
					ContinueMembership = () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							ContinueMembershipConfirmation,
							{},
						),
					ConfirmCancellation = () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							ConfirmMembershipCancellation,
							{},
						),
					SwitchCompleteThankYou = () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							SwitchThankYou,
							{},
						);
				(ValueOfSupportPage.parameters = {
					...ValueOfSupportPage.parameters,
					docs: {
						...ValueOfSupportPage.parameters?.docs,
						source: {
							originalSource:
								'() => {\n  return <ValueOfSupport />;\n}',
							...ValueOfSupportPage.parameters?.docs?.source,
						},
					},
				}),
					(SwitchReview.parameters = {
						...SwitchReview.parameters,
						docs: {
							...SwitchReview.parameters?.docs,
							source: {
								originalSource:
									'() => {\n  return <MembershipSwitch />;\n}',
								...SwitchReview.parameters?.docs?.source,
							},
						},
					}),
					(SwitchOptions.parameters = {
						...SwitchOptions.parameters,
						docs: {
							...SwitchOptions.parameters?.docs,
							source: {
								originalSource:
									'() => {\n  return <SaveOptions />;\n}',
								...SwitchOptions.parameters?.docs?.source,
							},
						},
					}),
					(Reasons.parameters = {
						...Reasons.parameters,
						docs: {
							...Reasons.parameters?.docs,
							source: {
								originalSource:
									'() => {\n  return <SelectReason />;\n}',
								...Reasons.parameters?.docs?.source,
							},
						},
					}),
					(ContinueMembership.parameters = {
						...ContinueMembership.parameters,
						docs: {
							...ContinueMembership.parameters?.docs,
							source: {
								originalSource:
									'() => {\n  return <ContinueMembershipConfirmation />;\n}',
								...ContinueMembership.parameters?.docs?.source,
							},
						},
					}),
					(ConfirmCancellation.parameters = {
						...ConfirmCancellation.parameters,
						docs: {
							...ConfirmCancellation.parameters?.docs,
							source: {
								originalSource:
									'() => {\n  return <ConfirmMembershipCancellation />;\n}',
								...ConfirmCancellation.parameters?.docs?.source,
							},
						},
					}),
					(SwitchCompleteThankYou.parameters = {
						...SwitchCompleteThankYou.parameters,
						docs: {
							...SwitchCompleteThankYou.parameters?.docs,
							source: {
								originalSource:
									'() => {\n  return <SwitchThankYou />;\n}',
								...SwitchCompleteThankYou.parameters?.docs
									?.source,
							},
						},
					});
				const __namedExportsOrder = [
					'ValueOfSupportPage',
					'SwitchReview',
					'SwitchOptions',
					'Reasons',
					'ContinueMembership',
					'ConfirmCancellation',
					'SwitchCompleteThankYou',
				];
			},
	},
]);
