'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[7293],
	{
		'./client/components/mma/accountoverview/SixForSixExplainer.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				l: () => SixForSixExplainerIfApplicable,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_shared_productResponse__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__('./shared/productResponse.ts'),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				SixForSixExplainerIfApplicable = (props) =>
					(0,
					_shared_productResponse__WEBPACK_IMPORTED_MODULE_0__.fi)(
						props.mainPlan.name,
					) &&
					(0,
					_shared_productResponse__WEBPACK_IMPORTED_MODULE_0__.q4)(
						props.mainPlan,
					) &&
					!props.hasCancellationPending
						? (0,
						  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
								'p',
								{
									css: (0,
									_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
										props.additionalCss,
										';',
										'',
									),
									children: [
										"This subscription is still in the initial '6 issues for",
										' ',
										props.mainPlan.currency,
										"6' promotional period.",
									],
								},
						  )
						: null;
			try {
				(SixForSixExplainerIfApplicable.displayName =
					'SixForSixExplainerIfApplicable'),
					(SixForSixExplainerIfApplicable.__docgenInfo = {
						description: '',
						displayName: 'SixForSixExplainerIfApplicable',
						props: {
							additionalCss: {
								defaultValue: null,
								description: '',
								name: 'additionalCss',
								required: !0,
								type: { name: 'SerializedStyles' },
							},
							mainPlan: {
								defaultValue: null,
								description: '',
								name: 'mainPlan',
								required: !0,
								type: { name: 'SubscriptionPlan' },
							},
							hasCancellationPending: {
								defaultValue: null,
								description: '',
								name: 'hasCancellationPending',
								required: !0,
								type: { name: 'boolean' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/accountoverview/SixForSixExplainer.tsx#SixForSixExplainerIfApplicable'
						] = {
							docgenInfo:
								SixForSixExplainerIfApplicable.__docgenInfo,
							name: 'SixForSixExplainerIfApplicable',
							path: 'client/components/mma/accountoverview/SixForSixExplainer.tsx#SixForSixExplainerIfApplicable',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/shared/BasicProductInfoTable.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				I: () => BasicProductInfoTable,
			});
			var _shared_dates__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__('./shared/dates.ts'),
				_ProductDescriptionListTable__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./client/components/mma/shared/ProductDescriptionListTable.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				BasicProductInfoTable = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
						_ProductDescriptionListTable__WEBPACK_IMPORTED_MODULE_2__.M,
						{
							content: [
								{
									title: props.groupedProductType
										.showSupporterId
										? 'Supporter ID'
										: 'Subscription ID',
									value: props.productDetail.subscription
										.subscriptionId,
								},
								...(props.groupedProductType.tierLabel
									? [
											{
												title: props.groupedProductType
													.tierLabel,
												value: props.productDetail.tier,
											},
									  ]
									: []),
								...(props.groupedProductType
									.shouldShowJoinDateNotStartDate
									? [
											{
												title: 'Join date',
												value: (0,
												_shared_dates__WEBPACK_IMPORTED_MODULE_0__.sG)(
													props.productDetail
														.joinDate,
												).dateStr(),
											},
									  ]
									: [
											{
												title: 'Start date',
												value: props.productDetail
													.subscription.start
													? (0,
													  _shared_dates__WEBPACK_IMPORTED_MODULE_0__.sG)(
															props.productDetail
																.subscription
																.start,
													  ).dateStr()
													: '-',
											},
									  ]),
							],
						},
					);
			try {
				(BasicProductInfoTable.displayName = 'BasicProductInfoTable'),
					(BasicProductInfoTable.__docgenInfo = {
						description: '',
						displayName: 'BasicProductInfoTable',
						props: {
							groupedProductType: {
								defaultValue: null,
								description: '',
								name: 'groupedProductType',
								required: !0,
								type: { name: 'GroupedProductType' },
							},
							productDetail: {
								defaultValue: null,
								description: '',
								name: 'productDetail',
								required: !0,
								type: { name: 'ProductDetail' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/BasicProductInfoTable.tsx#BasicProductInfoTable'
						] = {
							docgenInfo: BasicProductInfoTable.__docgenInfo,
							name: 'BasicProductInfoTable',
							path: 'client/components/mma/shared/BasicProductInfoTable.tsx#BasicProductInfoTable',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/shared/PaymentDetailsTable.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				s: () => PaymentDetailsTable,
			});
			var _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_6__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__deprecated__/colour/palette.js',
					),
				_assets_PaypalLogo__WEBPACK_IMPORTED_MODULE_7__ =
					__webpack_require__(
						'./client/components/mma/shared/assets/PaypalLogo.tsx',
					),
				_CardDisplay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./client/components/mma/shared/CardDisplay.tsx',
				),
				_DirectDebitDisplay__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./client/components/mma/shared/DirectDebitDisplay.tsx',
					),
				_NextPaymentDetails__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./client/components/mma/shared/NextPaymentDetails.tsx',
					),
				_ProductDescriptionListTable__WEBPACK_IMPORTED_MODULE_5__ =
					__webpack_require__(
						'./client/components/mma/shared/ProductDescriptionListTable.tsx',
					),
				_SepaDisplay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
					'./client/components/mma/shared/SepaDisplay.tsx',
				),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ =
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
			var _ref = { name: 'ti75j2', styles: 'margin:0' },
				PaymentDetailsTable = (props) => {
					var _props$productDetail$;
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
						_ProductDescriptionListTable__WEBPACK_IMPORTED_MODULE_5__.M,
						{
							borderColour:
								_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_6__
									.n$[86],
							alternateRowBgColors: !0,
							tableHeading: props.tableHeading,
							content: [
								...(props.nextPaymentDetails &&
								props.productDetail.subscription.autoRenew &&
								!props.hasCancellationPending
									? [
											{
												title: props.nextPaymentDetails
													.paymentKey,
												value: (0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.BX)(
													'span',
													{
														children: [
															props
																.nextPaymentDetails
																.isNewPaymentValue &&
																(0,
																_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
																	_NextPaymentDetails__WEBPACK_IMPORTED_MODULE_2__.W,
																	{},
																),
															props
																.nextPaymentDetails
																.paymentValue,
														],
													},
												),
											},
											_objectSpread(
												{
													title: props
														.nextPaymentDetails
														.nextPaymentDateKey,
												},
												props.productDetail.subscription
													.nextPaymentDate && {
													value: props
														.nextPaymentDetails
														.nextPaymentDateValue,
												},
											),
									  ]
									: []),
								{
									title: 'Payment'.concat(
										props.productDetail.isPaidTier
											? ' method'
											: '',
									),
									value: props.productDetail.isPaidTier
										? (0,
										  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.BX)(
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.HY,
												{
													children: [
														props.productDetail
															.subscription
															.card &&
															(0,
															_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
																_CardDisplay__WEBPACK_IMPORTED_MODULE_0__.V,
																_objectSpread(
																	{
																		cssOverrides:
																			_ref,
																		inErrorState:
																			!!props
																				.productDetail
																				.alertText,
																	},
																	props
																		.productDetail
																		.subscription
																		.card,
																),
															),
														props.productDetail
															.subscription
															.payPalEmail &&
															(0,
															_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
																_assets_PaypalLogo__WEBPACK_IMPORTED_MODULE_7__.D,
																{},
															),
														props.productDetail
															.subscription
															.mandate &&
															(0,
															_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
																_DirectDebitDisplay__WEBPACK_IMPORTED_MODULE_1__.rV,
																_objectSpread(
																	{
																		inErrorState:
																			!!props
																				.productDetail
																				.alertText,
																	},
																	props
																		.productDetail
																		.subscription
																		.mandate,
																),
															),
														props.productDetail
															.subscription
															.sepaMandate &&
															(0,
															_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
																_SepaDisplay__WEBPACK_IMPORTED_MODULE_3__.t,
																_objectSpread(
																	{},
																	props
																		.productDetail
																		.subscription
																		.sepaMandate,
																),
															),
														props.productDetail
															.subscription
															.stripePublicKeyForCardAddition &&
															(0,
															_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
																'span',
																{
																	children:
																		'No Payment Method',
																},
															),
													],
												},
										  )
										: (0,
										  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
												'span',
												{ children: 'FREE' },
										  ),
									spanTwoCols:
										!!props.productDetail.subscription
											.payPalEmail || void 0,
								},
								_objectSpread(
									{ title: 'Expiry date' },
									(null ===
										(_props$productDetail$ =
											props.productDetail.subscription
												.card) ||
									void 0 === _props$productDetail$
										? void 0
										: _props$productDetail$.expiry) && {
										value: ''
											.concat(
												props.productDetail.subscription
													.card.expiry.month < 10
													? '0'
													: '',
											)
											.concat(
												props.productDetail.subscription
													.card.expiry.month,
												'\n                    ',
												' / ',
												'\n                    ',
											)
											.concat(
												props.productDetail.subscription
													.card.expiry.year,
											),
									},
								),
							],
						},
					);
				};
			try {
				(PaymentDetailsTable.displayName = 'PaymentDetailsTable'),
					(PaymentDetailsTable.__docgenInfo = {
						description: '',
						displayName: 'PaymentDetailsTable',
						props: {
							productDetail: {
								defaultValue: null,
								description: '',
								name: 'productDetail',
								required: !0,
								type: { name: 'ProductDetail' },
							},
							nextPaymentDetails: {
								defaultValue: null,
								description: '',
								name: 'nextPaymentDetails',
								required: !0,
								type: {
									name: 'NextPaymentDetails | undefined',
								},
							},
							hasCancellationPending: {
								defaultValue: null,
								description: '',
								name: 'hasCancellationPending',
								required: !0,
								type: { name: 'boolean' },
							},
							tableHeading: {
								defaultValue: null,
								description: '',
								name: 'tableHeading',
								required: !1,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/PaymentDetailsTable.tsx#PaymentDetailsTable'
						] = {
							docgenInfo: PaymentDetailsTable.__docgenInfo,
							name: 'PaymentDetailsTable',
							path: 'client/components/mma/shared/PaymentDetailsTable.tsx#PaymentDetailsTable',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/shared/SepaDisplay.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				t: () => SepaDisplay,
			});
			var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
				__webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				);
			var _ref = { name: 'ti75j2', styles: 'margin:0' },
				SepaDisplay = (_ref2) => {
					var { accountName, iban, inline } = _ref2;
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
						'p',
						{
							css: _ref,
							children: inline
								? 'SEPA '.concat(accountName, ' ').concat(iban)
								: (0,
								  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.BX)(
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.HY,
										{
											children: [
												'SEPA',
												(0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
													'br',
													{},
												),
												accountName,
												(0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
													'br',
													{},
												),
												iban,
											],
										},
								  ),
						},
					);
				};
			try {
				(SepaDisplay.displayName = 'SepaDisplay'),
					(SepaDisplay.__docgenInfo = {
						description: '',
						displayName: 'SepaDisplay',
						props: {
							accountName: {
								defaultValue: null,
								description: '',
								name: 'accountName',
								required: !0,
								type: { name: 'string' },
							},
							iban: {
								defaultValue: null,
								description: '',
								name: 'iban',
								required: !0,
								type: { name: 'string' },
							},
							inline: {
								defaultValue: null,
								description: '',
								name: 'inline',
								required: !1,
								type: { name: 'boolean' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/SepaDisplay.tsx#SepaDisplay'
						] = {
							docgenInfo: SepaDisplay.__docgenInfo,
							name: 'SepaDisplay',
							path: 'client/components/mma/shared/SepaDisplay.tsx#SepaDisplay',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/shared/assets/GiftIcon.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { O: () => GiftIcon });
			var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			var _ref = {
					name: '69zfkf',
					styles: 'margin-top:3px;vertical-align:top',
				},
				GiftIcon = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.BX)(
						'i',
						{
							css: (0,
							_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(
								'padding:',
								'left' === props.alignArrowToThisSide
									? '0 25px 0 35px'
									: '0 30px 0 15px',
								';background-color:#eacca0;display:inline-block;clip-path:',
								'left' === props.alignArrowToThisSide
									? 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 10px 50%)'
									: 'polygon(0 0, 100% 0, calc(100% - 10px) 50%, 100% 100%, 0 100%)',
								';height:28px;',
								'',
							),
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.BX)(
									'svg',
									{
										width: '15',
										height: '19',
										viewBox: '0 0 15 19',
										fill: 'none',
										css: _ref,
										children: [
											(0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
												'path',
												{
													d: 'M4.84301 0L3.52393 1.2713L6.7703 4.13171H7.69784H8.62537L11.8717 1.27129L10.5527 0L7.69784 3.36282L4.84301 0Z',
													fill: '#333333',
												},
											),
											(0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
												'path',
												{
													fillRule: 'evenodd',
													clipRule: 'evenodd',
													d: 'M13.3172 4.13232L15.0003 5.93995V16.7856L13.3172 18.5933H8.60876V12.3958H15V10.3299H8.60876V4.13232H13.3172ZM6.78267 10.3299L6.78267 4.13232H2.07462L0.391602 5.93995V10.3299H6.78267ZM6.78267 12.3958H0.391602V16.7856L2.04657 18.5933H6.78267L6.78267 12.3958Z',
													fill: '#333333',
												},
											),
										],
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
									'span',
									{
										css: (0,
										_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.VZD,
											';font-size:17px;font-weight:bold;font-style:normal;color:#333;display:inline-block;vertical-align:top;line-height:26px;margin:2px 0 0 5px;',
											'',
										),
										children: 'Gift',
									},
								),
							],
						},
					);
			try {
				(GiftIcon.displayName = 'GiftIcon'),
					(GiftIcon.__docgenInfo = {
						description: '',
						displayName: 'GiftIcon',
						props: {
							alignArrowToThisSide: {
								defaultValue: null,
								description: '',
								name: 'alignArrowToThisSide',
								required: !0,
								type: {
									name: 'enum',
									value: [
										{ value: '"left"' },
										{ value: '"right"' },
									],
								},
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/assets/GiftIcon.tsx#GiftIcon'
						] = {
							docgenInfo: GiftIcon.__docgenInfo,
							name: 'GiftIcon',
							path: 'client/components/mma/shared/assets/GiftIcon.tsx#GiftIcon',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
	},
]);
