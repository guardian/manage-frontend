'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[7304],
	{
		'./client/components/mma/delivery/address/DeliveryAddressConfirmation.tsx':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					k: () => SuccessMessage,
					l: () => DeliveryAddressConfirmation,
				});
				var _emotion_react__WEBPACK_IMPORTED_MODULE_14__ =
						__webpack_require__(
							'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
						),
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_11__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
						),
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_12__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
						),
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_13__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
						),
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_15__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
						),
					_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_18__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/react-components/stack/Stack.js',
						),
					react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
						'./node_modules/react/index.js',
					),
					react_router_dom__WEBPACK_IMPORTED_MODULE_10__ =
						__webpack_require__(
							'./node_modules/react-router/index.js',
						),
					_shared_dates__WEBPACK_IMPORTED_MODULE_1__ =
						__webpack_require__('./shared/dates.ts'),
					_utilities_analytics__WEBPACK_IMPORTED_MODULE_17__ =
						__webpack_require__('./client/utilities/analytics.ts'),
					_shared_CallCenterEmailAndNumbers__WEBPACK_IMPORTED_MODULE_2__ =
						__webpack_require__(
							'./client/components/shared/CallCenterEmailAndNumbers.tsx',
						),
					_shared_assets_TickInCircle__WEBPACK_IMPORTED_MODULE_3__ =
						__webpack_require__(
							'./client/components/mma/shared/assets/TickInCircle.tsx',
						),
					_shared_AsyncLoader__WEBPACK_IMPORTED_MODULE_4__ =
						__webpack_require__(
							'./client/components/mma/shared/AsyncLoader.tsx',
						),
					_shared_Buttons__WEBPACK_IMPORTED_MODULE_5__ =
						__webpack_require__(
							'./client/components/mma/shared/Buttons.tsx',
						),
					_shared_ProductDescriptionListTable__WEBPACK_IMPORTED_MODULE_16__ =
						__webpack_require__(
							'./client/components/mma/shared/ProductDescriptionListTable.tsx',
						),
					_shared_ProgressIndicator__WEBPACK_IMPORTED_MODULE_6__ =
						__webpack_require__(
							'./client/components/mma/shared/ProgressIndicator.tsx',
						),
					_deliveryAddressApi__WEBPACK_IMPORTED_MODULE_19__ =
						__webpack_require__(
							'./client/components/mma/delivery/address/deliveryAddressApi.ts',
						),
					_DeliveryAddressDisplay__WEBPACK_IMPORTED_MODULE_7__ =
						__webpack_require__(
							'./client/components/mma/delivery/address/DeliveryAddressDisplay.tsx',
						),
					_DeliveryAddressFormContext__WEBPACK_IMPORTED_MODULE_8__ =
						__webpack_require__(
							'./client/components/mma/delivery/address/DeliveryAddressFormContext.tsx',
						),
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ =
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
				var renderConfirmation = (props) => () =>
						(0,
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
							AddressConfirmation,
							_objectSpread({}, props),
						),
					_ref2 = { name: '1ff36h2', styles: 'flex-grow:1' },
					AddressConfirmation = (props) => {
						var _props$delivery,
							_addressContext$addre,
							productDetail = (0,
							react_router_dom__WEBPACK_IMPORTED_MODULE_10__.TH)()
								.state,
							addressContext = (0,
							react__WEBPACK_IMPORTED_MODULE_0__.useContext)(
								_DeliveryAddressFormContext__WEBPACK_IMPORTED_MODULE_8__.Ib,
							),
							addressChangedInformationContext = (0,
							react__WEBPACK_IMPORTED_MODULE_0__.useContext)(
								_DeliveryAddressFormContext__WEBPACK_IMPORTED_MODULE_8__.X4,
							),
							productName = props.friendlyName;
						(0,
						_DeliveryAddressFormContext__WEBPACK_IMPORTED_MODULE_8__.UJ)(
							addressContext.addressStateObject,
						) &&
							(productDetail.subscription.deliveryAddress =
								_objectSpread(
									_objectSpread(
										{},
										productDetail.subscription
											.deliveryAddress,
									),
									addressContext.addressStateObject,
								));
						var [
								showTopCallCentreNumbers,
								setTopCallCentreNumbersVisibility,
							] = (0,
							react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),
							subHeadingCss = '\n    border-top: 1px solid '
								.concat(
									_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_11__
										.palette.neutral[86],
									';\n\t',
								)
								.concat(
									_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_12__.Hu7,
									';\n    margin-top: 50px;\n    ',
								)
								.concat(
									_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_13__
										.C4.tablet,
									' {\n      font-size: 1.25rem;\n      line-height: 1.6;\n    };\n  ',
								),
							dtCss =
								'\n    font-weight: bold;\n    display: inline-block;\n    vertical-align: top;\n    min-width: 12ch;\n  ',
							ddCss =
								'\n    margin: 0;\n    display: inline-block;\n    vertical-align: top;\n    min-width: 12ch;\n  ';
						return (0,
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.HY,
							{
								children: (0,
								_DeliveryAddressFormContext__WEBPACK_IMPORTED_MODULE_8__.UJ)(
									addressContext.addressStateObject,
								)
									? (0,
									  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.BX)(
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.HY,
											{
												children: [
													(0,
													_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
														_shared_ProgressIndicator__WEBPACK_IMPORTED_MODULE_6__.Y,
														{
															steps: [
																{
																	title: 'Update',
																},
																{
																	title: 'Review',
																},
																{
																	title: 'Confirmation',
																	isCurrentStep:
																		!0,
																},
															],
															additionalCSS: (0,
															_emotion_react__WEBPACK_IMPORTED_MODULE_14__.iv)(
																'margin-top:',
																_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_15__
																	.D[5],
																'px;',
																'',
															),
														},
													),
													(0,
													_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
														'h2',
														{
															css: (0,
															_emotion_react__WEBPACK_IMPORTED_MODULE_14__.iv)(
																subHeadingCss,
																';',
																'',
															),
															children:
																'Confirmation',
														},
													),
													(0,
													_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
														SuccessMessage,
														{
															message:
																'We have successfully updated your delivery details for your '.concat(
																	productName,
																	'. You will shortly receive a confirmation email.',
																),
														},
													),
													(0,
													_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.BX)(
														'section',
														{
															css: (0,
															_emotion_react__WEBPACK_IMPORTED_MODULE_14__.iv)(
																'border:1px solid ',
																_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_11__
																	.palette
																	.neutral[86],
																';margin-top:',
																_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_15__
																	.D[5],
																'px;',
																'',
															),
															children: [
																(0,
																_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.BX)(
																	'h2',
																	{
																		css: (0,
																		_emotion_react__WEBPACK_IMPORTED_MODULE_14__.iv)(
																			'margin:0;padding:',
																			_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_15__
																				.D[3],
																			'px;background-color:',
																			_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_11__
																				.palette
																				.neutral[97],
																			';border-bottom:1px solid ',
																			_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_11__
																				.palette
																				.neutral[86],
																			';',
																			_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_12__.Rcn,
																			';',
																			_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_13__
																				.Dp
																				.tablet,
																			'{padding:',
																			_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_15__
																				.D[3],
																			'px ',
																			_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_15__
																				.D[5],
																			'px;}',
																			'',
																		),
																		children:
																			[
																				'Delivery address',
																				(null ===
																					(_props$delivery =
																						props.delivery) ||
																				void 0 ===
																					_props$delivery
																					? void 0
																					: _props$delivery.enableDeliveryInstructionsUpdate) &&
																					' and instructions',
																			],
																	},
																),
																(0,
																_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.BX)(
																	'dl',
																	{
																		css: (0,
																		_emotion_react__WEBPACK_IMPORTED_MODULE_14__.iv)(
																			'padding:0 ',
																			_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_15__
																				.D[3],
																			'px;',
																			_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_12__.Kz0,
																			';display:flex;flex-wrap:wrap;flex-direction:column;justify-content:space-between;',
																			_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_13__
																				.Dp
																				.tablet,
																			'{padding:0 ',
																			_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_15__
																				.D[5],
																			'px;}',
																			'',
																		),
																		children:
																			[
																				(0,
																				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.BX)(
																					'div',
																					{
																						css: _ref2,
																						children:
																							[
																								(0,
																								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
																									'dt',
																									{
																										css: (0,
																										_emotion_react__WEBPACK_IMPORTED_MODULE_14__.iv)(
																											dtCss,
																											';',
																											'',
																										),
																										children:
																											'Address',
																									},
																								),
																								(0,
																								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
																									'dd',
																									{
																										css: (0,
																										_emotion_react__WEBPACK_IMPORTED_MODULE_14__.iv)(
																											ddCss,
																											';',
																											'',
																										),
																										children:
																											addressContext.addressStateObject &&
																											(0,
																											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
																												_DeliveryAddressDisplay__WEBPACK_IMPORTED_MODULE_7__.O,
																												_objectSpread(
																													{},
																													addressContext.addressStateObject,
																												),
																											),
																									},
																								),
																							],
																					},
																				),
																				(0,
																				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.BX)(
																					'div',
																					{
																						css: (0,
																						_emotion_react__WEBPACK_IMPORTED_MODULE_14__.iv)(
																							'flex-grow:1;margin-top:16px;',
																							_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_13__
																								.Dp
																								.tablet,
																							'{margin-top:0;}',
																							'',
																						),
																						children:
																							[
																								(0,
																								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
																									'dt',
																									{
																										css: (0,
																										_emotion_react__WEBPACK_IMPORTED_MODULE_14__.iv)(
																											dtCss,
																											';',
																											'',
																										),
																										children:
																											'Instructions',
																									},
																								),
																								(0,
																								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
																									'dd',
																									{
																										css: (0,
																										_emotion_react__WEBPACK_IMPORTED_MODULE_14__.iv)(
																											ddCss,
																											';',
																											'',
																										),
																										children:
																											(null ===
																												(_addressContext$addre =
																													addressContext.addressStateObject) ||
																											void 0 ===
																												_addressContext$addre
																												? void 0
																												: _addressContext$addre.instructions) ||
																											'-',
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
													(0,
													_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
														'p',
														{
															css: (0,
															_emotion_react__WEBPACK_IMPORTED_MODULE_14__.iv)(
																_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_12__.Kz0,
																';margin-top:',
																_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_15__
																	.D[9],
																'px;',
																'',
															),
															children:
																'I understand that this address change will affect the following subscriptions',
														},
													),
													(0,
													_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
														_shared_ProductDescriptionListTable__WEBPACK_IMPORTED_MODULE_16__.M,
														{
															content: (0,
															_DeliveryAddressFormContext__WEBPACK_IMPORTED_MODULE_8__.lD)(
																addressChangedInformationContext,
															),
															seperateEachRow: !0,
														},
													),
													(0,
													_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
														'div',
														{
															css: (0,
															_emotion_react__WEBPACK_IMPORTED_MODULE_14__.iv)(
																'margin-top:',
																_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_15__
																	.D[3],
																'px;',
																_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_13__
																	.Dp.tablet,
																'{margin-top:',
																_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_15__
																	.D[5],
																'px;}',
																'',
															),
															children: (0,
															_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
																_shared_Buttons__WEBPACK_IMPORTED_MODULE_5__.Q,
																{
																	to: '/'.concat(
																		props.urlPart,
																	),
																	text: 'Return to subscription',
																	state: {
																		productDetail,
																	},
																	colour: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_11__
																		.palette
																		.brand[400],
																	textColour:
																		_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_11__
																			.palette
																			.neutral[100],
																	fontWeight:
																		'bold',
																	onClick:
																		() => {
																			(0,
																			_utilities_analytics__WEBPACK_IMPORTED_MODULE_17__.L9)(
																				{
																					eventCategory:
																						'delivery_address_update_confirmation',
																					eventAction:
																						'click',
																					eventLabel:
																						'manage_'.concat(
																							props.urlPart,
																						),
																				},
																			);
																		},
																},
															),
														},
													),
													(0,
													_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.BX)(
														_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_18__.K,
														{
															space: 5,
															children: [
																(0,
																_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.BX)(
																	'p',
																	{
																		css: (0,
																		_emotion_react__WEBPACK_IMPORTED_MODULE_14__.iv)(
																			_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_12__.Kz0,
																			';margin:',
																			_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_15__
																				.D[12],
																			'px 0 0;color:',
																			_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_11__
																				.palette
																				.neutral[46],
																			';',
																			'',
																		),
																		children:
																			[
																				'If you need separate delivery addresses for each of your subscriptions, please',
																				' ',
																				(0,
																				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
																					'span',
																					{
																						css: (0,
																						_emotion_react__WEBPACK_IMPORTED_MODULE_14__.iv)(
																							'cursor:pointer;color:',
																							_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_11__
																								.palette
																								.brand[500],
																							';text-decoration:underline;',
																							'',
																						),
																						onClick:
																							() =>
																								setTopCallCentreNumbersVisibility(
																									!showTopCallCentreNumbers,
																								),
																						children:
																							'contact us',
																					},
																				),
																				'.',
																			],
																	},
																),
																showTopCallCentreNumbers &&
																	(0,
																	_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
																		_shared_CallCenterEmailAndNumbers__WEBPACK_IMPORTED_MODULE_2__.K,
																		{},
																	),
															],
														},
													),
												],
											},
									  )
									: (0,
									  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
											react_router_dom__WEBPACK_IMPORTED_MODULE_10__.Fg,
											{ to: '..', replace: !0 },
									  ),
							},
						);
					},
					DeliveryAddressConfirmation = (props) => {
						var addressContext = (0,
							react__WEBPACK_IMPORTED_MODULE_0__.useContext)(
								_DeliveryAddressFormContext__WEBPACK_IMPORTED_MODULE_8__.Ib,
							),
							contactIdContext = (0,
							react__WEBPACK_IMPORTED_MODULE_0__.useContext)(
								_DeliveryAddressFormContext__WEBPACK_IMPORTED_MODULE_8__.hk,
							),
							addressChangedInformationContext = (0,
							react__WEBPACK_IMPORTED_MODULE_0__.useContext)(
								_DeliveryAddressFormContext__WEBPACK_IMPORTED_MODULE_8__.X4,
							),
							contactId = Object.keys(contactIdContext)[0],
							addressChangeInformationCopy = [
								...addressChangedInformationContext.map(
									(element) =>
										''
											.concat(
												element.friendlyProductName,
												' subscription (',
											)
											.concat(element.subscriptionId, ')')
											.concat(
												element.effectiveDate
													? ' as of front cover dated '.concat(
															(0,
															_shared_dates__WEBPACK_IMPORTED_MODULE_1__.ur)(
																element.effectiveDate,
																'iiii do MMMM yyyy',
															),
													  )
													: '',
											),
								),
								'',
								'(as displayed on confirmation page at '.concat(
									(0,
									_shared_dates__WEBPACK_IMPORTED_MODULE_1__.ur)(
										new Date(),
										"HH:mm:ss x 'on' do MMMM yyyy",
									),
									' )',
								),
							].join('\n');
						return addressContext.addressStateObject
							? (0,
							  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
									_shared_AsyncLoader__WEBPACK_IMPORTED_MODULE_4__.y,
									{
										render: renderConfirmation(
											props.productType,
										),
										fetch: (0,
										_deliveryAddressApi__WEBPACK_IMPORTED_MODULE_19__.o)(
											_objectSpread(
												_objectSpread(
													{},
													addressContext.addressStateObject,
												),
												{},
												{
													addressChangeInformation:
														addressChangeInformationCopy,
												},
											),
											contactId,
										),
										readerOnOK: (resp) => resp.text(),
										loadingMessage:
											'Updating delivery address details...',
									},
							  )
							: (0,
							  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
									react_router_dom__WEBPACK_IMPORTED_MODULE_10__.Fg,
									{ to: '..', replace: !0 },
							  );
					},
					_ref = {
						name: '18jyzik',
						styles: 'position:absolute;top:14px;left:14px',
					},
					SuccessMessage = (props) =>
						(0,
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.BX)(
							'div',
							{
								css: (0,
								_emotion_react__WEBPACK_IMPORTED_MODULE_14__.iv)(
									'position:relative;width:100%;text-align:left;border:4px solid ',
									_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_11__
										.palette.success[400],
									';box-sizing:border-box;padding:14px 14px 14px 50px;margin-bottom:50px;',
									_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_12__.Kz0,
									';font-weight:bold;',
									props.additionalCss,
									';',
									'',
								),
								children: [
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
										'i',
										{
											css: _ref,
											children: (0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
												_shared_assets_TickInCircle__WEBPACK_IMPORTED_MODULE_3__.G,
												{},
											),
										},
									),
									props.message,
								],
							},
						);
				try {
					(DeliveryAddressConfirmation.displayName =
						'DeliveryAddressConfirmation'),
						(DeliveryAddressConfirmation.__docgenInfo = {
							description: '',
							displayName: 'DeliveryAddressConfirmation',
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
								'client/components/mma/delivery/address/DeliveryAddressConfirmation.tsx#DeliveryAddressConfirmation'
							] = {
								docgenInfo:
									DeliveryAddressConfirmation.__docgenInfo,
								name: 'DeliveryAddressConfirmation',
								path: 'client/components/mma/delivery/address/DeliveryAddressConfirmation.tsx#DeliveryAddressConfirmation',
							});
				} catch (__react_docgen_typescript_loader_error) {}
				try {
					(SuccessMessage.displayName = 'SuccessMessage'),
						(SuccessMessage.__docgenInfo = {
							description: '',
							displayName: 'SuccessMessage',
							props: {
								message: {
									defaultValue: null,
									description: '',
									name: 'message',
									required: !0,
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
								'client/components/mma/delivery/address/DeliveryAddressConfirmation.tsx#SuccessMessage'
							] = {
								docgenInfo: SuccessMessage.__docgenInfo,
								name: 'SuccessMessage',
								path: 'client/components/mma/delivery/address/DeliveryAddressConfirmation.tsx#SuccessMessage',
							});
				} catch (__react_docgen_typescript_loader_error) {}
			},
		'./client/components/mma/delivery/address/DeliveryAddressDisplay.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				O: () => DeliveryAddressDisplay,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
				_identity_models__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./client/components/mma/identity/models.ts',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				DeliveryAddressDisplay = (props) => {
					var _COUNTRIES$find;
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
						'div',
						{
							css: (0,
							_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
								'span{display:block;& :last-of-type{margin-bottom:1rem;}}',
								_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__.Kz0,
								';',
								'',
							),
							'data-qm-masking': 'blocklist',
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
									'span',
									{ children: props.addressLine1 },
								),
								props.addressLine2 &&
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
										'span',
										{ children: props.addressLine2 },
									),
								props.town &&
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
										'span',
										{ children: props.town },
									),
								props.region &&
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
										'span',
										{ children: props.region },
									),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
									'span',
									{ children: props.postcode },
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
									'span',
									{
										children:
											(null ===
												(_COUNTRIES$find =
													_identity_models__WEBPACK_IMPORTED_MODULE_0__.od.find(
														(country) =>
															props.country ===
															country.iso,
													)) ||
											void 0 === _COUNTRIES$find
												? void 0
												: _COUNTRIES$find.name) ||
											props.country,
									},
								),
							],
						},
					);
				};
			try {
				(DeliveryAddressDisplay.displayName = 'DeliveryAddressDisplay'),
					(DeliveryAddressDisplay.__docgenInfo = {
						description: '',
						displayName: 'DeliveryAddressDisplay',
						props: {
							addressLine1: {
								defaultValue: null,
								description: '',
								name: 'addressLine1',
								required: !0,
								type: { name: 'string' },
							},
							addressLine2: {
								defaultValue: null,
								description: '',
								name: 'addressLine2',
								required: !1,
								type: { name: 'string' },
							},
							town: {
								defaultValue: null,
								description: '',
								name: 'town',
								required: !1,
								type: { name: 'string' },
							},
							region: {
								defaultValue: null,
								description: '',
								name: 'region',
								required: !1,
								type: { name: 'string' },
							},
							postcode: {
								defaultValue: null,
								description: '',
								name: 'postcode',
								required: !0,
								type: { name: 'string' },
							},
							country: {
								defaultValue: null,
								description: '',
								name: 'country',
								required: !0,
								type: { name: 'string' },
							},
							instructions: {
								defaultValue: null,
								description: '',
								name: 'instructions',
								required: !1,
								type: { name: 'string' },
							},
							addressChangeInformation: {
								defaultValue: null,
								description: '',
								name: 'addressChangeInformation',
								required: !1,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/delivery/address/DeliveryAddressDisplay.tsx#DeliveryAddressDisplay'
						] = {
							docgenInfo: DeliveryAddressDisplay.__docgenInfo,
							name: 'DeliveryAddressDisplay',
							path: 'client/components/mma/delivery/address/DeliveryAddressDisplay.tsx#DeliveryAddressDisplay',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/delivery/address/DeliveryAddressFormContext.tsx':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					Ib: () => NewDeliveryAddressContext,
					UJ: () => isAddress,
					X4: () => AddressChangedInformationContext,
					hk: () => ContactIdContext,
					lD: () => convertToDescriptionListData,
				});
				var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
						'./node_modules/react/index.js',
					),
					_shared_dates__WEBPACK_IMPORTED_MODULE_1__ =
						__webpack_require__('./shared/dates.ts'),
					_utilities_utils__WEBPACK_IMPORTED_MODULE_2__ =
						__webpack_require__('./client/utilities/utils.ts'),
					NewDeliveryAddressContext = (0,
					react__WEBPACK_IMPORTED_MODULE_0__.createContext)({}),
					AddressChangedInformationContext = (0,
					react__WEBPACK_IMPORTED_MODULE_0__.createContext)([]),
					ContactIdContext = (0,
					react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});
				function isAddress(maybeAddress) {
					return !(null == maybeAddress || !maybeAddress.postcode);
				}
				var convertToDescriptionListData = (
					addressChangeAffectedInfo,
				) =>
					addressChangeAffectedInfo
						.map((element) => [
							{
								title: element.friendlyProductName,
								value: element.subscriptionId,
							},
							{
								title: 'Front cover date',
								value: element.effectiveDate
									? (0,
									  _shared_dates__WEBPACK_IMPORTED_MODULE_1__.ur)(
											element.effectiveDate,
											_shared_dates__WEBPACK_IMPORTED_MODULE_1__.Bn,
									  )
									: '-',
							},
						])
						.flatMap(
							_utilities_utils__WEBPACK_IMPORTED_MODULE_2__.OG,
						);
				try {
					(isAddress.displayName = 'isAddress'),
						(isAddress.__docgenInfo = {
							description: '',
							displayName: 'isAddress',
							props: {
								addressLine1: {
									defaultValue: null,
									description: '',
									name: 'addressLine1',
									required: !0,
									type: { name: 'string' },
								},
								addressLine2: {
									defaultValue: null,
									description: '',
									name: 'addressLine2',
									required: !1,
									type: { name: 'string' },
								},
								town: {
									defaultValue: null,
									description: '',
									name: 'town',
									required: !1,
									type: { name: 'string' },
								},
								region: {
									defaultValue: null,
									description: '',
									name: 'region',
									required: !1,
									type: { name: 'string' },
								},
								postcode: {
									defaultValue: null,
									description: '',
									name: 'postcode',
									required: !0,
									type: { name: 'string' },
								},
								country: {
									defaultValue: null,
									description: '',
									name: 'country',
									required: !0,
									type: { name: 'string' },
								},
								instructions: {
									defaultValue: null,
									description: '',
									name: 'instructions',
									required: !1,
									type: { name: 'string' },
								},
								addressChangeInformation: {
									defaultValue: null,
									description: '',
									name: 'addressChangeInformation',
									required: !1,
									type: { name: 'string' },
								},
							},
						}),
						'undefined' != typeof STORYBOOK_REACT_CLASSES &&
							(STORYBOOK_REACT_CLASSES[
								'client/components/mma/delivery/address/DeliveryAddressFormContext.tsx#isAddress'
							] = {
								docgenInfo: isAddress.__docgenInfo,
								name: 'isAddress',
								path: 'client/components/mma/delivery/address/DeliveryAddressFormContext.tsx#isAddress',
							});
				} catch (__react_docgen_typescript_loader_error) {}
				try {
					(convertToDescriptionListData.displayName =
						'convertToDescriptionListData'),
						(convertToDescriptionListData.__docgenInfo = {
							description: '',
							displayName: 'convertToDescriptionListData',
							props: {},
						}),
						'undefined' != typeof STORYBOOK_REACT_CLASSES &&
							(STORYBOOK_REACT_CLASSES[
								'client/components/mma/delivery/address/DeliveryAddressFormContext.tsx#convertToDescriptionListData'
							] = {
								docgenInfo:
									convertToDescriptionListData.__docgenInfo,
								name: 'convertToDescriptionListData',
								path: 'client/components/mma/delivery/address/DeliveryAddressFormContext.tsx#convertToDescriptionListData',
							});
				} catch (__react_docgen_typescript_loader_error) {}
			},
		'./client/components/mma/delivery/address/deliveryAddressApi.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				o: () => updateAddressFetcher,
			});
			var updateAddressFetcher = (formData, contactId) => () =>
				fetch('/api/delivery/address/update/'.concat(contactId), {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(formData),
				});
		},
	},
]);
