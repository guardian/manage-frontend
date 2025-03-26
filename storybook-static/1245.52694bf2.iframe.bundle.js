'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[1245],
	{
		'./client/components/mma/shared/NextPaymentDetails.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				W: () => NewPaymentPriceAlert,
				p: () => getNextPaymentDetails,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_5__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_6__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
					),
				_shared_dates__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__('./shared/dates.ts'),
				_shared_productResponse__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__('./shared/productResponse.ts'),
				_assets_InfoIconDark__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./client/components/mma/shared/assets/InfoIconDark.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			var getNextPaymentDetails = (
					mainPlan,
					subscription,
					overiddenAmount,
					hasPaymentFailure,
				) => {
					var paidFuturePlans = subscription.futurePlans.filter(
							_shared_productResponse__WEBPACK_IMPORTED_MODULE_1__.q4,
						),
						planAfterMainPlan =
							paidFuturePlans[0] === mainPlan
								? paidFuturePlans[1]
								: paidFuturePlans[0];
					if (
						(0,
						_shared_productResponse__WEBPACK_IMPORTED_MODULE_1__.q4)(
							mainPlan,
						)
					) {
						var paymentInterval =
								0 !== subscription.currentPlans.length &&
								(0,
								_shared_productResponse__WEBPACK_IMPORTED_MODULE_1__.fi)(
									mainPlan.name,
								) &&
								planAfterMainPlan
									? planAfterMainPlan.billingPeriod
									: mainPlan.billingPeriod,
							paymentKey = 'Next '.concat(
								(0,
								_shared_productResponse__WEBPACK_IMPORTED_MODULE_1__.tq)(
									paymentInterval,
								),
								' payment',
							),
							getPaymentValue = (shortVersion) => {
								var _subscription$nextPay;
								if ('Patron' === subscription.readerType)
									return 'not applicable';
								var amount =
									overiddenAmount ||
									(null !==
										(_subscription$nextPay =
											subscription.nextPaymentPrice) &&
									void 0 !== _subscription$nextPay
										? _subscription$nextPay
										: mainPlan.price) / 100;
								return 'short' === shortVersion
									? ''
											.concat(mainPlan.currency)
											.concat(
												Number.isInteger(amount)
													? amount
													: amount.toFixed(2),
											)
									: ''
											.concat(mainPlan.currency)
											.concat(amount.toFixed(2), ' ')
											.concat(mainPlan.currencyISO);
							},
							nextPaymentDateValue =
								'Patron' === subscription.readerType
									? 'not applicable'
									: !hasPaymentFailure &&
									  subscription.nextPaymentDate
									? (0,
									  _shared_dates__WEBPACK_IMPORTED_MODULE_0__.sG)(
											0 ===
												subscription.currentPlans.length
												? mainPlan.start
												: subscription.nextPaymentDate,
									  ).dateStr()
									: void 0,
							isNewPaymentValue =
								planAfterMainPlan &&
								mainPlan.price !== planAfterMainPlan.price &&
								!(0,
								_shared_productResponse__WEBPACK_IMPORTED_MODULE_1__.fi)(
									mainPlan.name,
								);
						return {
							paymentInterval,
							paymentKey,
							paymentValue: getPaymentValue(),
							paymentValueShort: getPaymentValue('short'),
							isNewPaymentValue,
							nextPaymentDateKey: 'Next payment date',
							nextPaymentDateValue,
						};
					}
				},
				_ref = {
					name: 'gurmh7',
					styles: 'display:flex;align-items:center;margin-bottom:4px',
				},
				_ref2 = {
					name: 's5xdrg',
					styles: 'display:flex;align-items:center',
				},
				NewPaymentPriceAlert = () =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.BX)(
						'span',
						{
							css: _ref2,
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
									'span',
									{
										css: _ref,
										children: (0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
											_assets_InfoIconDark__WEBPACK_IMPORTED_MODULE_2__.J,
											{
												fillColor:
													_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
														.palette.brand[500],
											},
										),
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
									'span',
									{
										css: (0,
										_emotion_react__WEBPACK_IMPORTED_MODULE_5__.iv)(
											'margin-left:',
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_6__
												.D[1],
											'px;',
											'',
										),
										children: 'New price',
									},
								),
							],
						},
					);
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
		'./client/components/mma/shared/assets/InfoIconDark.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				J: () => InfoIconDark,
			});
			var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
				__webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				);
			var _ref = { name: '40f4ru', styles: 'vertical-align:top' },
				InfoIconDark = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
						'svg',
						{
							width: props.size || '17',
							height: props.size || '17',
							viewBox: '0 0 17 17',
							fill: 'none',
							css: _ref,
							children: (0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
								'path',
								{
									d: 'M8.5 0C3.79667 0 0 3.79667 0 8.5C0 13.2033 3.79667 17 8.5 17C13.2033 17 17 13.2033 17 8.5C17 3.79667 13.2033 0 8.5 0ZM9.46333 11.8433V12.2589C9.36889 12.3344 9.23667 12.3911 9.10444 12.4667C8.97222 12.5233 8.82111 12.58 8.67 12.6367C8.51889 12.6933 8.36778 12.7311 8.21667 12.75C8.06556 12.7689 7.91444 12.7878 7.78222 12.7878C7.48 12.7878 7.29111 12.7311 7.17778 12.6178C7.04556 12.5044 6.98889 12.3722 6.98889 12.24C6.98889 12.0889 7.00778 11.9378 7.02667 11.7867C7.04556 11.6356 7.08333 11.4844 7.12111 11.2956L7.91444 7.68778L7.17778 7.51778V7.12111C7.29111 7.08333 7.44222 7.02667 7.65 6.97C7.83889 6.91333 8.04667 6.87556 8.27333 6.83778C8.5 6.8 8.70778 6.76222 8.91556 6.74333C9.12333 6.72444 9.31222 6.70556 9.48222 6.70556L9.69 6.83778L8.63222 11.8433H9.46333ZM9.82222 5.49667C9.65222 5.64778 9.40667 5.72333 9.12333 5.72333C8.85889 5.72333 8.63222 5.64778 8.44333 5.49667C8.27333 5.34556 8.17889 5.15667 8.17889 4.91111C8.17889 4.64667 8.27333 4.43889 8.44333 4.28778C8.61333 4.13667 8.84 4.06111 9.12333 4.06111C9.42556 4.06111 9.65222 4.13667 9.82222 4.28778C9.99222 4.43889 10.0867 4.64667 10.0867 4.91111C10.0678 5.15667 9.99222 5.34556 9.82222 5.49667Z',
									fill: props.fillColor || '#333333',
								},
							),
						},
					);
			try {
				(InfoIconDark.displayName = 'InfoIconDark'),
					(InfoIconDark.__docgenInfo = {
						description: '',
						displayName: 'InfoIconDark',
						props: {
							fillColor: {
								defaultValue: null,
								description: '',
								name: 'fillColor',
								required: !1,
								type: { name: 'string' },
							},
							size: {
								defaultValue: null,
								description: '',
								name: 'size',
								required: !1,
								type: { name: 'number' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/assets/InfoIconDark.tsx#InfoIconDark'
						] = {
							docgenInfo: InfoIconDark.__docgenInfo,
							name: 'InfoIconDark',
							path: 'client/components/mma/shared/assets/InfoIconDark.tsx#InfoIconDark',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
	},
]);
