'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[5304],
	{
		'./client/components/mma/accountoverview/updateAmount/ContributionUpdateAmountForm.tsx':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					k: () => ContributionUpdateAmountForm,
				});
				var _emotion_react__WEBPACK_IMPORTED_MODULE_6__ =
						__webpack_require__(
							'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
						),
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_7__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
						),
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_8__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
						),
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_14__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
						),
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_15__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
						),
					_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_13__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/react-components/user-feedback/InlineError.js',
						),
					_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_16__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/react-components/choice-card/ChoiceCardGroup.js',
						),
					_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_17__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/react-components/choice-card/ChoiceCard.js',
						),
					_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_18__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/react-components/text-input/TextInput.js',
						),
					_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_19__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/react-components/button/Button.js',
						),
					_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_20__ =
						__webpack_require__(
							'./node_modules/@guardian/source/dist/react-components/button/LinkButton.js',
						),
					lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
						'./node_modules/lodash/lodash.js',
					),
					react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
						'./node_modules/react/index.js',
					),
					react_router__WEBPACK_IMPORTED_MODULE_9__ =
						__webpack_require__(
							'./node_modules/react-router/index.js',
						),
					_shared_productResponse__WEBPACK_IMPORTED_MODULE_2__ =
						__webpack_require__('./shared/productResponse.ts'),
					_utilities_analytics__WEBPACK_IMPORTED_MODULE_11__ =
						__webpack_require__('./client/utilities/analytics.ts'),
					_utilities_fetch__WEBPACK_IMPORTED_MODULE_3__ =
						__webpack_require__('./client/utilities/fetch.ts'),
					_utilities_pricingConfig_contributionsAmount__WEBPACK_IMPORTED_MODULE_4__ =
						__webpack_require__(
							'./client/utilities/pricingConfig/contributionsAmount.ts',
						),
					_shared_asyncComponents_DefaultApiResponseHandler__WEBPACK_IMPORTED_MODULE_10__ =
						__webpack_require__(
							'./client/components/mma/shared/asyncComponents/DefaultApiResponseHandler.tsx',
						),
					_shared_asyncComponents_DefaultLoadingView__WEBPACK_IMPORTED_MODULE_5__ =
						__webpack_require__(
							'./client/components/mma/shared/asyncComponents/DefaultLoadingView.tsx',
						),
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__ =
						__webpack_require__(
							'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
						);
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
				var buttonsCss = (0,
					_emotion_react__WEBPACK_IMPORTED_MODULE_6__.iv)(
						'display:flex;flex-direction:column;gap:',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_7__
							.D[5],
						'px;',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_8__
							.Dp.tablet,
						'{flex-direction:row;}',
						'',
					),
					buttonCss = {
						name: 'f7ay7b',
						styles: 'justify-content:center',
					};
				function weeklyBreakDown(
					chosenAmount,
					billingPeriod,
					currencySymbol,
				) {
					return chosenAmount
						? ((weeklyAmount =
								'month' === billingPeriod
									? (12 * chosenAmount) / 52
									: chosenAmount / 52),
						  'Contributing '
								.concat(currencySymbol)
								.concat(chosenAmount, ' works out as ')
								.concat(currencySymbol)
								.concat(weeklyAmount.toFixed(2), ' each week'))
						: null;
					var weeklyAmount;
				}
				function validateChoice(
					currentAmount,
					chosenAmount,
					minAmount,
					maxAmount,
					isOtherAmountSelected,
					mainPlan,
				) {
					var chosenOptionNum = Number(chosenAmount);
					return chosenAmount || isOtherAmountSelected
						? chosenOptionNum === currentAmount
							? 'You have selected the same amount as you currently contribute'
							: !chosenAmount || isNaN(chosenOptionNum)
							? 'There is a problem with the amount you have selected, please make sure it is a valid amount'
							: !isNaN(chosenOptionNum) &&
							  chosenOptionNum < minAmount
							? 'There is a minimum '
									.concat(
										mainPlan.billingPeriod,
										'ly contribution amount of ',
									)
									.concat(mainPlan.currency)
									.concat(minAmount.toFixed(2), ' ')
									.concat(mainPlan.currencyISO)
							: !isNaN(chosenOptionNum) &&
							  chosenOptionNum > maxAmount
							? 'There is a maximum '
									.concat(
										mainPlan.billingPeriod,
										'ly contribution amount of ',
									)
									.concat(mainPlan.currency)
									.concat(maxAmount.toFixed(2), ' ')
									.concat(mainPlan.currencyISO)
							: null
						: 'Please make a selection';
				}
				var _ref = { name: 'vavmm1', styles: 'max-width:500px' },
					_ref2 = { name: '1r5gb7q', styles: 'display:inline-block' },
					_ref3 = {
						name: 'fgqxph',
						styles: 'font-weight:bold;display:inline-block',
					},
					ContributionUpdateAmountForm = (props) => {
						var currentContributionOptions =
								(_utilities_pricingConfig_contributionsAmount__WEBPACK_IMPORTED_MODULE_4__
									.G[props.mainPlan.currencyISO] ||
									_utilities_pricingConfig_contributionsAmount__WEBPACK_IMPORTED_MODULE_4__
										.G.international)[
									props.mainPlan.billingPeriod
								],
							defaultOtherAmount =
								'MANAGE' === props.mode
									? currentContributionOptions.otherDefaultAmount
									: null,
							defaultIsOtherAmountSelected =
								'CANCELLATION_SAVE' === props.mode,
							[otherAmount, setOtherAmount] = (0,
							react__WEBPACK_IMPORTED_MODULE_1__.useState)(
								defaultOtherAmount,
							),
							[isOtherAmountSelected, setIsOtherAmountSelected] =
								(0,
								react__WEBPACK_IMPORTED_MODULE_1__.useState)(
									defaultIsOtherAmountSelected,
								),
							[
								hasInteractedWithOtherAmount,
								setHasInteractedWithOtherAmount,
							] = (0,
							react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
							[selectedValue, setSelectedValue] = (0,
							react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
							[errorMessage, setErrorMessage] = (0,
							react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
							[hasSubmitted, setHasSubmitted] = (0,
							react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
							[showUpdateLoader, setShowUpdateLoader] = (0,
							react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
							[updateFailed, setUpdateFailedStatus] = (0,
							react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
							[confirmedAmount, setConfirmedAmount] = (0,
							react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
							chosenAmount = isOtherAmountSelected
								? otherAmount
								: selectedValue,
							navigate = (0,
							react_router__WEBPACK_IMPORTED_MODULE_9__.s0)();
						(0,
						react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
							otherAmount !== defaultOtherAmount &&
								setHasInteractedWithOtherAmount(!0);
						}, [otherAmount, defaultOtherAmount]),
							(0,
							react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
								var newErrorMessage = validateChoice(
									props.currentAmount,
									chosenAmount,
									currentContributionOptions.minAmount,
									currentContributionOptions.maxAmount,
									isOtherAmountSelected,
									props.mainPlan,
								);
								setErrorMessage(newErrorMessage);
							}, [
								otherAmount,
								selectedValue,
								chosenAmount,
								isOtherAmountSelected,
								currentContributionOptions.minAmount,
								currentContributionOptions.maxAmount,
								props.currentAmount,
								props.mainPlan,
							]),
							(0,
							react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
								confirmedAmount &&
									props.onUpdateConfirmed(confirmedAmount);
							}, [confirmedAmount, props]);
						var changeAmountClick = (function () {
								var _ref4 = (function _asyncToGenerator(fn) {
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
								})(function* () {
									setHasSubmitted(!0);
									var newErrorMessage = validateChoice(
										props.currentAmount,
										chosenAmount,
										currentContributionOptions.minAmount,
										currentContributionOptions.maxAmount,
										isOtherAmountSelected,
										props.mainPlan,
									);
									if (newErrorMessage)
										setErrorMessage(newErrorMessage);
									else {
										setShowUpdateLoader(!0);
										var newAmount,
											productType,
											subscriptionName,
											response = yield ((newAmount =
												pendingAmount),
											(productType = props.productType),
											(subscriptionName =
												props.subscriptionId),
											(0,
											_utilities_fetch__WEBPACK_IMPORTED_MODULE_3__.n4)(
												'/api/update/amount/'
													.concat(
														productType.urlPart,
														'/',
													)
													.concat(subscriptionName),
												{
													method: 'POST',
													body: JSON.stringify({
														newPaymentAmount:
															newAmount,
													}),
												},
											));
										null ===
											(yield (0,
											_shared_asyncComponents_DefaultApiResponseHandler__WEBPACK_IMPORTED_MODULE_10__.cf)(
												response,
											)) &&
											((0,
											_utilities_analytics__WEBPACK_IMPORTED_MODULE_11__.L9)(
												{
													eventCategory:
														'amount_change',
													eventAction:
														'contributions_amount_change_failed',
												},
											),
											setUpdateFailedStatus(!0),
											setShowUpdateLoader(!1)),
											(0,
											_utilities_analytics__WEBPACK_IMPORTED_MODULE_11__.L9)(
												{
													eventCategory:
														'amount_change',
													eventAction:
														'contributions_amount_change_success',
													eventLabel: 'by '
														.concat(
															props.mainPlan
																.currency,
														)
														.concat(
															(
																pendingAmount -
																props.currentAmount
															).toFixed(2),
														)
														.concat(
															props.mainPlan
																.currencyISO,
														),
												},
											),
											setConfirmedAmount(pendingAmount);
									}
								});
								return function changeAmountClick() {
									return _ref4.apply(this, arguments);
								};
							})(),
							pendingAmount = Number(
								isOtherAmountSelected
									? otherAmount
									: selectedValue,
							),
							amountLabel = (amount) =>
								''
									.concat(props.mainPlan.currency, ' ')
									.concat(amount, ' per ')
									.concat(props.mainPlan.billingPeriod),
							shouldShowChoices = 'MANAGE' === props.mode,
							shouldShowSelectedAmountErrorMessage =
								!isOtherAmountSelected &&
								(selectedValue || hasSubmitted),
							shouldShowOtherAmountErrorMessage =
								hasInteractedWithOtherAmount || hasSubmitted,
							otherAmountLabel =
								'MANAGE' === props.mode
									? 'Other amount ('.concat(
											props.mainPlan.currency,
											')',
									  )
									: 'Amount ('.concat(
											props.mainPlan.currency,
											')',
									  );
						return showUpdateLoader
							? (0,
							  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.tZ)(
									_shared_asyncComponents_DefaultLoadingView__WEBPACK_IMPORTED_MODULE_5__.I,
									{ loadingMessage: 'Updating...' },
							  )
							: (0,
							  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.BX)(
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.HY,
									{
										children: [
											updateFailed &&
												(0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.tZ)(
													_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_13__.b,
													{
														children:
															'Updating failed this time. Please try again later...',
													},
												),
											(0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.BX)(
												'div',
												{
													css: (0,
													_emotion_react__WEBPACK_IMPORTED_MODULE_6__.iv)(
														'border:1px solid ',
														_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_14__
															.palette
															.neutral[20],
														';margin-bottom:',
														_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_7__
															.D[5],
														'px;',
														'',
													),
													children: [
														(0,
														_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.BX)(
															'dl',
															{
																css: (0,
																_emotion_react__WEBPACK_IMPORTED_MODULE_6__.iv)(
																	'padding:',
																	_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_7__
																		.D[3],
																	'px ',
																	_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_7__
																		.D[5],
																	'px;margin:0;border-bottom:1px solid ',
																	_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_14__
																		.palette
																		.neutral[20],
																	';',
																	_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_15__.Kz0,
																	';',
																	'',
																),
																children: [
																	(0,
																	_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.BX)(
																		'dt',
																		{
																			css: _ref3,
																			children:
																				[
																					(0,
																					lodash__WEBPACK_IMPORTED_MODULE_0__.capitalize)(
																						(0,
																						_shared_productResponse__WEBPACK_IMPORTED_MODULE_2__.tq)(
																							props
																								.mainPlan
																								.billingPeriod,
																						),
																					),
																					' ',
																					'amount',
																				],
																		},
																	),
																	(0,
																	_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.tZ)(
																		'dd',
																		{
																			css: _ref2,
																			children:
																				''
																					.concat(
																						props
																							.mainPlan
																							.currency,
																					)
																					.concat(
																						props.currentAmount.toFixed(
																							2,
																						),
																						' ',
																					)
																					.concat(
																						props
																							.mainPlan
																							.currencyISO,
																					),
																		},
																	),
																],
															},
														),
														(0,
														_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.BX)(
															'div',
															{
																css: (0,
																_emotion_react__WEBPACK_IMPORTED_MODULE_6__.iv)(
																	_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_15__.Kz0,
																	';padding:',
																	_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_7__
																		.D[3],
																	'px ',
																	_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_7__
																		.D[5],
																	'px;',
																	'',
																),
																children: [
																	shouldShowSelectedAmountErrorMessage &&
																		errorMessage &&
																		(0,
																		_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.tZ)(
																			_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_13__.b,
																			{
																				children:
																					errorMessage,
																			},
																		),
																	(0,
																	_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.BX)(
																		'div',
																		{
																			css: _ref,
																			children:
																				[
																					shouldShowChoices &&
																						(0,
																						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.tZ)(
																							_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_16__.Y,
																							{
																								name: 'amounts',
																								'data-cy':
																									'contribution-amount-choices',
																								label: 'Choose the amount to contribute',
																								columns: 2,
																								children:
																									(0,
																									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.BX)(
																										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.HY,
																										{
																											children:
																												[
																													currentContributionOptions.amounts.map(
																														(
																															amount,
																														) =>
																															(0,
																															_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.tZ)(
																																_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_17__.f,
																																{
																																	id: 'amount-'.concat(
																																		amount,
																																	),
																																	value: amount.toString(),
																																	label: amountLabel(
																																		amount,
																																	),
																																	checked:
																																		selectedValue ===
																																		amount,
																																	onChange:
																																		() => {
																																			setSelectedValue(
																																				amount,
																																			),
																																				setIsOtherAmountSelected(
																																					!1,
																																				);
																																		},
																																},
																																amount,
																															),
																													),
																													(0,
																													_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.tZ)(
																														_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_17__.f,
																														{
																															id: 'amount-other',
																															value: 'Other',
																															label: 'Other',
																															checked:
																																isOtherAmountSelected,
																															onChange:
																																() => {
																																	setIsOtherAmountSelected(
																																		!0,
																																	),
																																		setSelectedValue(
																																			null,
																																		);
																																},
																														},
																													),
																												],
																										},
																									),
																							},
																						),
																					isOtherAmountSelected &&
																						(0,
																						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.tZ)(
																							'div',
																							{
																								css: (0,
																								_emotion_react__WEBPACK_IMPORTED_MODULE_6__.iv)(
																									'margin-top:',
																									_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_7__
																										.D[3],
																									'px;',
																									'',
																								),
																								children:
																									(0,
																									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.tZ)(
																										_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_18__.o,
																										{
																											label: otherAmountLabel,
																											supporting:
																												'Sorry, we are only able to accept contributions of '
																													.concat(
																														props
																															.mainPlan
																															.currency,
																													)
																													.concat(
																														currentContributionOptions.minAmount,
																														' or over due to transaction fees',
																													),
																											error:
																												(shouldShowOtherAmountErrorMessage &&
																													errorMessage) ||
																												void 0,
																											type: 'number',
																											value:
																												(null ==
																												otherAmount
																													? void 0
																													: otherAmount.toString()) ||
																												'',
																											onChange:
																												(
																													event,
																												) =>
																													setOtherAmount(
																														event
																															.target
																															.value
																															? Number(
																																	event
																																		.target
																																		.value,
																															  )
																															: null,
																													),
																										},
																									),
																							},
																						),
																				],
																		},
																	),
																	(0,
																	_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.tZ)(
																		'div',
																		{
																			css: (0,
																			_emotion_react__WEBPACK_IMPORTED_MODULE_6__.iv)(
																				'margin-top:',
																				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_7__
																					.D[2],
																				'px;color:',
																				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_14__
																					.palette
																					.neutral[46],
																				';font-size:15px;',
																				'',
																			),
																			children:
																				(0,
																				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.tZ)(
																					'em',
																					{
																						children:
																							weeklyBreakDown(
																								chosenAmount,
																								props
																									.mainPlan
																									.billingPeriod,
																								props
																									.mainPlan
																									.currency,
																							),
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
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.BX)(
												'div',
												{
													css: buttonsCss,
													children: [
														(0,
														_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.tZ)(
															_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_19__.z,
															{
																onClick:
																	changeAmountClick,
																cssOverrides:
																	buttonCss,
																children:
																	'Change amount',
															},
														),
														props.withReturnToAccountOverviewButton &&
															(0,
															_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.tZ)(
																_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_20__.Q,
																{
																	href: '/',
																	onClick: (
																		event,
																	) => {
																		event.preventDefault(),
																			navigate(
																				'/',
																			);
																	},
																	priority:
																		'subdued',
																	cssOverrides:
																		buttonCss,
																	children:
																		'Return to your account',
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
					(ContributionUpdateAmountForm.displayName =
						'ContributionUpdateAmountForm'),
						(ContributionUpdateAmountForm.__docgenInfo = {
							description: '',
							displayName: 'ContributionUpdateAmountForm',
							props: {
								subscriptionId: {
									defaultValue: null,
									description: '',
									name: 'subscriptionId',
									required: !0,
									type: { name: 'string' },
								},
								mainPlan: {
									defaultValue: null,
									description: '',
									name: 'mainPlan',
									required: !0,
									type: { name: 'PaidSubscriptionPlan' },
								},
								productType: {
									defaultValue: null,
									description: '',
									name: 'productType',
									required: !0,
									type: { name: 'ProductType' },
								},
								currentAmount: {
									defaultValue: null,
									description: '',
									name: 'currentAmount',
									required: !0,
									type: { name: 'number' },
								},
								nextPaymentDate: {
									defaultValue: null,
									description: '',
									name: 'nextPaymentDate',
									required: !0,
									type: { name: 'string | null' },
								},
								mode: {
									defaultValue: null,
									description: '',
									name: 'mode',
									required: !0,
									type: {
										name: 'enum',
										value: [
											{ value: '"MANAGE"' },
											{ value: '"CANCELLATION_SAVE"' },
										],
									},
								},
								onUpdateConfirmed: {
									defaultValue: null,
									description: '',
									name: 'onUpdateConfirmed',
									required: !0,
									type: {
										name: '(updatedAmount: number) => void',
									},
								},
								withReturnToAccountOverviewButton: {
									defaultValue: null,
									description: '',
									name: 'withReturnToAccountOverviewButton',
									required: !1,
									type: { name: 'true' },
								},
							},
						}),
						'undefined' != typeof STORYBOOK_REACT_CLASSES &&
							(STORYBOOK_REACT_CLASSES[
								'client/components/mma/accountoverview/updateAmount/ContributionUpdateAmountForm.tsx#ContributionUpdateAmountForm'
							] = {
								docgenInfo:
									ContributionUpdateAmountForm.__docgenInfo,
								name: 'ContributionUpdateAmountForm',
								path: 'client/components/mma/accountoverview/updateAmount/ContributionUpdateAmountForm.tsx#ContributionUpdateAmountForm',
							});
				} catch (__react_docgen_typescript_loader_error) {}
			},
		'./client/components/mma/cancel/CancellationContainer.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				DW: () => CancellationContext,
				OY: () => CancellationContainer,
				mc: () => CancellationPageTitleContext,
			});
			var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./node_modules/react/index.js',
				),
				react_router_dom__WEBPACK_IMPORTED_MODULE_10__ =
					__webpack_require__('./node_modules/react-router/index.js'),
				_shared_productResponse__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__('./shared/productResponse.ts'),
				_shared_productTypes__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__('./shared/productTypes.ts'),
				_utilities_hooks_useAsyncLoader__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./client/utilities/hooks/useAsyncLoader.ts',
					),
				_utilities_productUtils__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__('./client/utilities/productUtils.ts'),
				_shared_GenericErrorScreen__WEBPACK_IMPORTED_MODULE_5__ =
					__webpack_require__(
						'./client/components/shared/GenericErrorScreen.tsx',
					),
				_shared_nav_NavConfig__WEBPACK_IMPORTED_MODULE_6__ =
					__webpack_require__(
						'./client/components/shared/nav/NavConfig.tsx',
					),
				_Page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
					'./client/components/mma/Page.tsx',
				),
				_shared_asyncComponents_DefaultApiResponseHandler__WEBPACK_IMPORTED_MODULE_11__ =
					__webpack_require__(
						'./client/components/mma/shared/asyncComponents/DefaultApiResponseHandler.tsx',
					),
				_shared_asyncComponents_DefaultLoadingView__WEBPACK_IMPORTED_MODULE_8__ =
					__webpack_require__(
						'./client/components/mma/shared/asyncComponents/DefaultLoadingView.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				AsyncLoadedCancellationContainer = (props) => {
					var productType,
						request = (0,
						_utilities_productUtils__WEBPACK_IMPORTED_MODULE_4__.w)(
							props.productType
								.allProductsProductTypeFilterString,
						),
						{ data, loadingState } = (0,
						_utilities_hooks_useAsyncLoader__WEBPACK_IMPORTED_MODULE_3__.c)(
							request,
							_shared_asyncComponents_DefaultApiResponseHandler__WEBPACK_IMPORTED_MODULE_11__.xJ,
						);
					return loadingState ==
						_utilities_hooks_useAsyncLoader__WEBPACK_IMPORTED_MODULE_3__
							.G.HasError
						? (0,
						  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
								_shared_GenericErrorScreen__WEBPACK_IMPORTED_MODULE_5__.c,
								{},
						  )
						: loadingState ==
						  _utilities_hooks_useAsyncLoader__WEBPACK_IMPORTED_MODULE_3__
								.G.IsLoading
						? (0,
						  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
								_shared_asyncComponents_DefaultLoadingView__WEBPACK_IMPORTED_MODULE_8__.I,
								{
									loadingMessage:
										'Checking the status of your '.concat(
											props.productType.friendlyName,
											'...',
										),
								},
						  )
						: null == data || 0 == data.products.length
						? (0,
						  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
								react_router_dom__WEBPACK_IMPORTED_MODULE_10__.Fg,
								{ to: '/' },
						  )
						: ((productType = props.productType),
						  (mdapiResponse) => {
								var filteredProductDetails =
									mdapiResponse.products
										.filter(
											_shared_productResponse__WEBPACK_IMPORTED_MODULE_1__.v_,
										)
										.filter(
											(productDetail) =>
												!productDetail.subscription
													.cancelledAt,
										);
								return 1 === filteredProductDetails.length
									? contextAndOutletContainer(
											filteredProductDetails[0],
											productType,
									  )
									: (0,
									  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
											react_router_dom__WEBPACK_IMPORTED_MODULE_10__.Fg,
											{ to: '/' },
									  );
						  })(data);
				},
				CancellationContext = (0,
				react__WEBPACK_IMPORTED_MODULE_0__.createContext)({}),
				contextAndOutletContainer = (productDetail, productType) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
						CancellationContext.Provider,
						{
							value: { productDetail, productType },
							children: (0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
								react_router_dom__WEBPACK_IMPORTED_MODULE_10__.j3,
								{},
							),
						},
					),
				CancellationPageTitleContext = (0,
				react__WEBPACK_IMPORTED_MODULE_0__.createContext)({}),
				CancellationContainer = (props) => {
					var routerState = (0,
						react_router_dom__WEBPACK_IMPORTED_MODULE_10__.TH)()
							.state,
						productDetail =
							null == routerState
								? void 0
								: routerState.productDetail,
						groupedProductType =
							_shared_productTypes__WEBPACK_IMPORTED_MODULE_2__
								.HP[props.productType.groupedProductType],
						[cancellationCompleted, setCancellationCompleted] = (0,
						react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1);
					!cancellationCompleted &&
						null != routerState &&
						routerState.journeyCompleted &&
						setCancellationCompleted(!0);
					var [pageTitle, setPageTitle] = (0,
					react__WEBPACK_IMPORTED_MODULE_0__.useState)(
						'Cancel '.concat(
							groupedProductType.shortFriendlyName ||
								groupedProductType.friendlyName,
						),
					);
					return userIsNavigatingBackFromCompletePage(
						cancellationCompleted,
					)
						? (0,
						  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
								react_router_dom__WEBPACK_IMPORTED_MODULE_10__.Fg,
								{ to: '/' },
						  )
						: (0,
						  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
								CancellationPageTitleContext.Provider,
								{
									value: { setPageTitle },
									children: (0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
										_Page__WEBPACK_IMPORTED_MODULE_7__._,
										{
											selectedNavItem:
												_shared_nav_NavConfig__WEBPACK_IMPORTED_MODULE_6__
													.qy.accountOverview,
											pageTitle,
											children: productDetail
												? contextAndOutletContainer(
														productDetail,
														props.productType,
												  )
												: (0,
												  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.tZ)(
														AsyncLoadedCancellationContainer,
														{
															productType:
																props.productType,
														},
												  ),
										},
									),
								},
						  );
				};
			function userIsNavigatingBackFromCompletePage(hasCompleted) {
				return (
					hasCompleted &&
					!location.pathname.includes('reasons') &&
					!location.pathname.includes('discount-confirmed') &&
					!location.pathname.includes('switch-thank-you')
				);
			}
			try {
				(CancellationContainer.displayName = 'CancellationContainer'),
					(CancellationContainer.__docgenInfo = {
						description: '',
						displayName: 'CancellationContainer',
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
							'client/components/mma/cancel/CancellationContainer.tsx#CancellationContainer'
						] = {
							docgenInfo: CancellationContainer.__docgenInfo,
							name: 'CancellationContainer',
							path: 'client/components/mma/cancel/CancellationContainer.tsx#CancellationContainer',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/cancel/GenericSaveBodyResponses.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				HK: () => BreakFromNewsWithAlternative,
				Q1: () => BreakFromNews,
				_5: () => BreakFromNewsWithGW,
				mX: () => PaymentIssue,
			});
			var _cancellationConstants__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./client/components/mma/cancel/cancellationConstants.ts',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				BreakFromNews = () =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.HY,
						{
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
									'p',
									{
										children:
											'Thank you for your ongoing support.',
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
									'p',
									{
										children: [
											'Your subscription has ensured that our quality journalism remains open for everyone to read and enjoy. You can',
											' ',
											(0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
												'a',
												{
													css: _cancellationConstants__WEBPACK_IMPORTED_MODULE_0__.SH,
													href: '/email-prefs',
													children:
														'update your email preferences here',
												},
											),
											' ',
											'if you’d like to reduce communication from us.',
										],
									},
								),
							],
						},
					),
				BreakFromNewsWithAlternative = () =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.HY,
						{
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
									'p',
									{
										children:
											'Thank you for your ongoing support.',
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
									'p',
									{
										children: [
											'Your subscription has ensured that our quality journalism remains open for everyone to read and enjoy. You can',
											' ',
											(0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
												'a',
												{
													css: _cancellationConstants__WEBPACK_IMPORTED_MODULE_0__.SH,
													href: '/email-prefs',
													children:
														'update your email preferences here',
												},
											),
											' ',
											'if you’d like to reduce communication from us.',
										],
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
									'p',
									{
										children:
											'Alternatively we’d love to know more about what we could do better to help provide inspiring and trustworthy news.',
									},
								),
							],
						},
					),
				BreakFromNewsWithGW = () =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.HY,
						{
							children: [
								'You can',
								' ',
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
									'a',
									{
										css: _cancellationConstants__WEBPACK_IMPORTED_MODULE_0__.SH,
										href: '/email-prefs',
										children:
											'click here to manage your communication preferences',
									},
								),
								'.',
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
									'br',
									{},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
									'br',
									{},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
									'span',
									{
										children:
											'If you would like some help with your communication preferences our customer services team would be happy to set this up for you.',
									},
								),
							],
						},
					),
				PaymentIssue = () =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.HY,
						{
							children: (0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
								'p',
								{
									children: [
										'Please leave feedback in the box below. Alternatively you can contact us directly to discuss resolving the issue, by emailing',
										' ',
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
											'a',
											{
												css: _cancellationConstants__WEBPACK_IMPORTED_MODULE_0__.SH,
												href: 'mailto:customer.help@theguardian.com',
												children:
													'customer.help@theguardian.com',
											},
										),
										'.',
									],
								},
							),
						},
					);
			try {
				(BreakFromNews.displayName = 'BreakFromNews'),
					(BreakFromNews.__docgenInfo = {
						description: '',
						displayName: 'BreakFromNews',
						props: {
							caseId: {
								defaultValue: null,
								description: '',
								name: 'caseId',
								required: !0,
								type: { name: 'string' },
							},
							holidayStops: {
								defaultValue: null,
								description: '',
								name: 'holidayStops',
								required: !1,
								type: { name: 'object[]' },
							},
							deliveryCredits: {
								defaultValue: null,
								description: '',
								name: 'deliveryCredits',
								required: !1,
								type: { name: 'DeliveryRecordDetail[]' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/cancel/GenericSaveBodyResponses.tsx#BreakFromNews'
						] = {
							docgenInfo: BreakFromNews.__docgenInfo,
							name: 'BreakFromNews',
							path: 'client/components/mma/cancel/GenericSaveBodyResponses.tsx#BreakFromNews',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(BreakFromNewsWithAlternative.displayName =
					'BreakFromNewsWithAlternative'),
					(BreakFromNewsWithAlternative.__docgenInfo = {
						description: '',
						displayName: 'BreakFromNewsWithAlternative',
						props: {
							caseId: {
								defaultValue: null,
								description: '',
								name: 'caseId',
								required: !0,
								type: { name: 'string' },
							},
							holidayStops: {
								defaultValue: null,
								description: '',
								name: 'holidayStops',
								required: !1,
								type: { name: 'object[]' },
							},
							deliveryCredits: {
								defaultValue: null,
								description: '',
								name: 'deliveryCredits',
								required: !1,
								type: { name: 'DeliveryRecordDetail[]' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/cancel/GenericSaveBodyResponses.tsx#BreakFromNewsWithAlternative'
						] = {
							docgenInfo:
								BreakFromNewsWithAlternative.__docgenInfo,
							name: 'BreakFromNewsWithAlternative',
							path: 'client/components/mma/cancel/GenericSaveBodyResponses.tsx#BreakFromNewsWithAlternative',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(BreakFromNewsWithGW.displayName = 'BreakFromNewsWithGW'),
					(BreakFromNewsWithGW.__docgenInfo = {
						description: '',
						displayName: 'BreakFromNewsWithGW',
						props: {
							caseId: {
								defaultValue: null,
								description: '',
								name: 'caseId',
								required: !0,
								type: { name: 'string' },
							},
							holidayStops: {
								defaultValue: null,
								description: '',
								name: 'holidayStops',
								required: !1,
								type: { name: 'object[]' },
							},
							deliveryCredits: {
								defaultValue: null,
								description: '',
								name: 'deliveryCredits',
								required: !1,
								type: { name: 'DeliveryRecordDetail[]' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/cancel/GenericSaveBodyResponses.tsx#BreakFromNewsWithGW'
						] = {
							docgenInfo: BreakFromNewsWithGW.__docgenInfo,
							name: 'BreakFromNewsWithGW',
							path: 'client/components/mma/cancel/GenericSaveBodyResponses.tsx#BreakFromNewsWithGW',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(PaymentIssue.displayName = 'PaymentIssue'),
					(PaymentIssue.__docgenInfo = {
						description: '',
						displayName: 'PaymentIssue',
						props: {
							caseId: {
								defaultValue: null,
								description: '',
								name: 'caseId',
								required: !0,
								type: { name: 'string' },
							},
							holidayStops: {
								defaultValue: null,
								description: '',
								name: 'holidayStops',
								required: !1,
								type: { name: 'object[]' },
							},
							deliveryCredits: {
								defaultValue: null,
								description: '',
								name: 'deliveryCredits',
								required: !1,
								type: { name: 'DeliveryRecordDetail[]' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/cancel/GenericSaveBodyResponses.tsx#PaymentIssue'
						] = {
							docgenInfo: PaymentIssue.__docgenInfo,
							name: 'PaymentIssue',
							path: 'client/components/mma/cancel/GenericSaveBodyResponses.tsx#PaymentIssue',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/cancel/cancellationConstants.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				SH: () => hrefStyle,
				Vc: () => standardAlternateFeedbackIntro,
				bt: () => inOrderToImproveSubs,
				mY: () => financialCircumstances,
			});
			var _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				standardAlternateFeedbackIntro =
					'Please share any further thoughts you have about cancelling — you can help us improve. Thank you.',
				inOrderToImproveSubs =
					'In order to improve our subscription and supporter model, we’d love to know more about why you are thinking of cancelling.',
				financialCircumstances = [
					'We understand that financial circumstances can change from time to time. Making a smaller contribution to the Guardian can be an inexpensive way of keeping journalism open for everyone to read and enjoy. Once you’ve completed your cancellation below, we hope you’ll consider supporting us in the future.',
				],
				hrefStyle = {
					textDecoration: 'underline',
					color: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_0__
						.palette.sport[300],
					':visited': {
						color: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_0__
							.palette.sport[300],
					},
				};
		},
		'./client/components/mma/cancel/cancellationContexts.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				Dd: () => CancellationPolicyContext,
				I6: () => cancellationEffectiveToday,
				xr: () => CancellationOutstandingCreditsContext,
				y_: () => CancellationReasonContext,
				zc: () => cancellationEffectiveEndOfLastInvoicePeriod,
			});
			var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./node_modules/react/index.js',
				),
				CancellationReasonContext =
					react__WEBPACK_IMPORTED_MODULE_0__.createContext(void 0),
				cancellationEffectiveToday = 'Today',
				cancellationEffectiveEndOfLastInvoicePeriod =
					'EndOfLastInvoicePeriod',
				CancellationPolicyContext =
					react__WEBPACK_IMPORTED_MODULE_0__.createContext(void 0),
				CancellationOutstandingCreditsContext =
					react__WEBPACK_IMPORTED_MODULE_0__.createContext(void 0);
		},
		'./client/components/mma/cancel/contributions/ContributionsCancellationReasons.tsx':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					R1: () => contributionsCancellationReasons,
					zx: () => shuffledContributionsCancellationReasons,
				});
				var utils = __webpack_require__('./client/utilities/utils.ts'),
					cancellationConstants = __webpack_require__(
						'./client/components/mma/cancel/cancellationConstants.ts',
					),
					esm = __webpack_require__(
						'./node_modules/@sentry/minimal/esm/index.js',
					),
					react = __webpack_require__(
						'./node_modules/react/index.js',
					),
					dates = __webpack_require__('./shared/dates.ts'),
					productResponse = __webpack_require__(
						'./shared/productResponse.ts',
					),
					GenericErrorMessage = __webpack_require__(
						'./client/components/mma/identity/GenericErrorMessage.tsx',
					),
					CancellationContainer = __webpack_require__(
						'./client/components/mma/cancel/CancellationContainer.tsx',
					),
					emotion_react_jsx_runtime_browser_esm = __webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
					ContributionsCancellationAmountUpdatedSaved = (_ref) => {
						var { amount } = _ref,
							{ productDetail } = (0, react.useContext)(
								CancellationContainer.DW,
							);
						if (!(0, productResponse.v_)(productDetail))
							return (
								esm.uT(
									'MembersDataApiItem is not a productDetail in ContributionsCancellationAmountUpdateSaved',
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									GenericErrorMessage.k,
									{},
								)
							);
						if (!productDetail.subscription.nextPaymentDate)
							return (
								esm.uT(
									'Subscription does not have a nextPaymentDate in ContributionsCancellationAmountUpdateSaved',
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									GenericErrorMessage.k,
									{},
								)
							);
						var mainPlan = (0, productResponse.fr)(
							productDetail.subscription,
						);
						return (0, productResponse.q4)(mainPlan)
							? (0, emotion_react_jsx_runtime_browser_esm.BX)(
									emotion_react_jsx_runtime_browser_esm.HY,
									{
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'h3',
												{
													children:
														'Thank you for updating your contribution',
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'p',
												{
													children: [
														'We have successfully updated the amount of your contribution. New amount, ',
														mainPlan.currency,
														amount.toFixed(2),
														', will be taken on',
														' ',
														(0, dates.sG)(
															productDetail
																.subscription
																.nextPaymentDate,
														).dateStr(),
														'. Thank you for supporting the Guardian.',
													],
												},
											),
										],
									},
							  )
							: (esm.uT(
									'mainPlan is not a PaidSubscriptionPlan in ContributionsCancellationAmountUpdateSaved',
							  ),
							  (0, emotion_react_jsx_runtime_browser_esm.tZ)(
									GenericErrorMessage.k,
									{},
							  ));
					};
				try {
					(ContributionsCancellationAmountUpdatedSaved.displayName =
						'ContributionsCancellationAmountUpdatedSaved'),
						(ContributionsCancellationAmountUpdatedSaved.__docgenInfo =
							{
								description: '',
								displayName:
									'ContributionsCancellationAmountUpdatedSaved',
								props: {
									amount: {
										defaultValue: null,
										description: '',
										name: 'amount',
										required: !0,
										type: { name: 'number' },
									},
								},
							}),
						'undefined' != typeof STORYBOOK_REACT_CLASSES &&
							(STORYBOOK_REACT_CLASSES[
								'client/components/mma/cancel/contributions/ContributionsCancellationAmountUpdatedSaved.tsx#ContributionsCancellationAmountUpdatedSaved'
							] = {
								docgenInfo:
									ContributionsCancellationAmountUpdatedSaved.__docgenInfo,
								name: 'ContributionsCancellationAmountUpdatedSaved',
								path: 'client/components/mma/cancel/contributions/ContributionsCancellationAmountUpdatedSaved.tsx#ContributionsCancellationAmountUpdatedSaved',
							});
				} catch (__react_docgen_typescript_loader_error) {}
				var emotion_react_browser_esm = __webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
					space = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
					),
					mq = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
					),
					Button = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/button/Button.js',
					),
					Spinner = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/spinner/Spinner.js',
					),
					LinkButton = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/button/LinkButton.js',
					),
					react_router = __webpack_require__(
						'./node_modules/react-router/index.js',
					),
					fetch = __webpack_require__('./client/utilities/fetch.ts'),
					cancellationUtilsAndTypes = __webpack_require__(
						'./shared/cancellationUtilsAndTypes.ts',
					),
					featureSwitches = __webpack_require__(
						'./shared/featureSwitches.ts',
					),
					productTypes = __webpack_require__(
						'./shared/productTypes.ts',
					),
					analytics = __webpack_require__(
						'./client/utilities/analytics.ts',
					),
					ContributionUpdateAmountForm = __webpack_require__(
						'./client/components/mma/accountoverview/updateAmount/ContributionUpdateAmountForm.tsx',
					),
					contributionsAmount = __webpack_require__(
						'./client/utilities/pricingConfig/contributionsAmount.ts',
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
				var container = (0, emotion_react_browser_esm.iv)(
						'&>*+*{margin-top:',
						space.D[6],
						'px;}',
						'',
					),
					buttonsCss = (0, emotion_react_browser_esm.iv)(
						'display:flex;flex-direction:column;gap:',
						space.D[5],
						'px;',
						mq.Dp.tablet,
						'{flex-direction:row;}',
						'',
					),
					buttonCss = (0, emotion_react_browser_esm.iv)(
						'justify-content:center;',
						mq.Dp.tablet,
						'{&:last-child{margin-left:auto;}}',
						'',
					),
					ContributionsCancellationFlowFinancialSaveAttempt = (
						_ref,
					) => {
						var { caseId, holidayStops, deliveryCredits } = _ref,
							[showAmountUpdateForm, setShowUpdateForm] = (0,
							react.useState)(!1),
							routerState = (0, react_router.TH)().state,
							navigate = (0, react_router.s0)(),
							{ productDetail, productType } = (0,
							react.useContext)(CancellationContainer.DW),
							isSupporterPlusAndFreePeriodOfferIsActive =
								featureSwitches.k
									.supporterplusCancellationOffer &&
								'supporterplus' === productType.productType,
							isContributionAndBreakFeatureIsActive =
								featureSwitches.k
									.contributionCancellationPause &&
								'contributions' === productType.productType,
							[
								showAlternativeBeforeCancelling,
								setShowAlternativeBeforeCancelling,
							] = (0, react.useState)(
								!(
									!isSupporterPlusAndFreePeriodOfferIsActive &&
									!isContributionAndBreakFeatureIsActive
								) && 'pending',
							),
							[
								discountPreviewDetails,
								setDiscountPreviewDetails,
							] = (0, react.useState)(null);
						if (
							((0, react.useEffect)(() => {
								(isSupporterPlusAndFreePeriodOfferIsActive ||
									isContributionAndBreakFeatureIsActive) &&
									(function _asyncToGenerator(fn) {
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
									})(function* () {
										try {
											var response = yield (0, fetch.n4)(
												'/api/discounts/preview-discount',
												{
													method: 'POST',
													body: JSON.stringify({
														subscriptionNumber:
															productDetail
																.subscription
																.subscriptionId,
													}),
												},
											);
											if (response.ok) {
												setShowAlternativeBeforeCancelling(
													!0,
												);
												var offerData =
													yield response.json();
												setDiscountPreviewDetails(
													offerData,
												);
											} else setShowAlternativeBeforeCancelling(!1);
										} catch (_unused) {
											setShowAlternativeBeforeCancelling(
												!1,
											);
										}
									})();
							}, [
								isContributionAndBreakFeatureIsActive,
								isSupporterPlusAndFreePeriodOfferIsActive,
								productDetail.subscription.subscriptionId,
							]),
							!productType ||
								!productDetail ||
								!routerState.selectedReasonId)
						)
							return (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								react_router.Fg,
								{ to: '../' },
							);
						var onCancelClicked = () => {
								if (showAlternativeBeforeCancelling) {
									var cancelAlternativeUrlPart =
										cancellationUtilsAndTypes.e[
											productType.productType
										] || '';
									navigate(
										'../'.concat(cancelAlternativeUrlPart),
										{
											state: _objectSpread(
												_objectSpread(
													_objectSpread(
														{},
														routerState,
													),
													discountPreviewDetails,
												),
												{},
												{
													caseId,
													holidayStops,
													deliveryCredits,
												},
											),
										},
									);
								} else
									(0, analytics.G2)({
										eventCategory:
											'cancellation_flow_financial_circumstances',
										eventAction: 'click',
										eventLabel: 'cancel',
									}),
										navigate('../confirmed', {
											state: _objectSpread(
												_objectSpread({}, routerState),
												{},
												{ caseId },
											),
										});
							},
							mainPlan = (0, productResponse.fr)(
								productDetail.subscription,
							);
						if (!(0, productResponse.q4)(mainPlan))
							return (
								esm.uT(
									'mainPlan is not a PaidSubscriptionPlan in ContributionsCancellationFlowFinancialSaveAttempt',
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									GenericErrorMessage.k,
									{},
								)
							);
						var isPayingMinAmount = ((mainPlan) => {
							var currentContributionOptions =
								(contributionsAmount.G[mainPlan.currencyISO] ||
									contributionsAmount.G.international)[
									mainPlan.billingPeriod
								];
							return (
								mainPlan.price / 100 <=
								currentContributionOptions.minAmount
							);
						})(mainPlan);
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							'div',
							{
								css: container,
								children: isPayingMinAmount
									? (0,
									  emotion_react_jsx_runtime_browser_esm.BX)(
											emotion_react_jsx_runtime_browser_esm.HY,
											{
												children: [
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'div',
														{
															children:
																'We understand that financial circumstances change, and your current contribution might not suit you right now.',
														},
													),
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														Button.z,
														{
															onClick:
																onCancelClicked,
															children:
																'Confirm cancellation',
														},
													),
												],
											},
									  )
									: (0,
									  emotion_react_jsx_runtime_browser_esm.BX)(
											emotion_react_jsx_runtime_browser_esm.HY,
											{
												children: [
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'div',
														{
															children:
																'We understand that financial circumstances change. If you can, we hope you’ll consider reducing the size of your contribution today rather than cancelling it. Simply pick a new amount and we’ll do the rest.',
														},
													),
													showAmountUpdateForm
														? (0,
														  emotion_react_jsx_runtime_browser_esm.tZ)(
																ContributionUpdateAmountForm.k,
																{
																	currentAmount:
																		mainPlan.price /
																		100,
																	subscriptionId:
																		productDetail
																			.subscription
																			.subscriptionId,
																	mainPlan,
																	productType:
																		productTypes
																			.Pm
																			.contributions,
																	nextPaymentDate:
																		productDetail
																			.subscription
																			.nextPaymentDate,
																	mode: 'CANCELLATION_SAVE',
																	onUpdateConfirmed:
																		(
																			updatedAmount,
																		) => {
																			(0,
																			analytics.G2)(
																				{
																					eventCategory:
																						'cancellation_flow_financial_circumstances',
																					eventAction:
																						'click',
																					eventLabel:
																						'change',
																				},
																			),
																				navigate(
																					'../saved',
																					{
																						state: _objectSpread(
																							_objectSpread(
																								{},
																								routerState,
																							),
																							{},
																							{
																								updatedContributionAmount:
																									updatedAmount,
																							},
																						),
																					},
																				);
																		},
																	withReturnToAccountOverviewButton:
																		!0,
																},
														  )
														: (0,
														  emotion_react_jsx_runtime_browser_esm.BX)(
																'div',
																{
																	css: buttonsCss,
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			Button.z,
																			{
																				onClick:
																					() => {
																						(0,
																						analytics.G2)(
																							{
																								eventCategory:
																									'cancellation_flow_financial_circumstances',
																								eventAction:
																									'click',
																								eventLabel:
																									'reduce',
																							},
																						),
																							setShowUpdateForm(
																								!0,
																							);
																					},
																				cssOverrides:
																					buttonCss,
																				children:
																					'Reduce amount',
																			},
																		),
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			Button.z,
																			{
																				icon:
																					'pending' ===
																					showAlternativeBeforeCancelling
																						? (0,
																						  emotion_react_jsx_runtime_browser_esm.tZ)(
																								Spinner.$,
																								{
																									size: 'xsmall',
																								},
																						  )
																						: void 0,
																				iconSide:
																					'right',
																				disabled:
																					'pending' ===
																					showAlternativeBeforeCancelling,
																				'aria-disabled':
																					'pending' ===
																					showAlternativeBeforeCancelling,
																				onClick:
																					onCancelClicked,
																				priority:
																					'tertiary',
																				cssOverrides:
																					buttonCss,
																				children:
																					'I still want to cancel',
																			},
																		),
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			LinkButton.Q,
																			{
																				href: '/',
																				onClick:
																					(
																						event,
																					) => {
																						event.preventDefault(),
																							navigate(
																								'/',
																							);
																					},
																				priority:
																					'subdued',
																				cssOverrides:
																					buttonCss,
																				children:
																					'Return to your account',
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
					};
				try {
					(ContributionsCancellationFlowFinancialSaveAttempt.displayName =
						'ContributionsCancellationFlowFinancialSaveAttempt'),
						(ContributionsCancellationFlowFinancialSaveAttempt.__docgenInfo =
							{
								description: '',
								displayName:
									'ContributionsCancellationFlowFinancialSaveAttempt',
								props: {
									caseId: {
										defaultValue: null,
										description: '',
										name: 'caseId',
										required: !0,
										type: { name: 'string' },
									},
									holidayStops: {
										defaultValue: null,
										description: '',
										name: 'holidayStops',
										required: !1,
										type: { name: 'object[]' },
									},
									deliveryCredits: {
										defaultValue: null,
										description: '',
										name: 'deliveryCredits',
										required: !1,
										type: {
											name: 'DeliveryRecordDetail[]',
										},
									},
								},
							}),
						'undefined' != typeof STORYBOOK_REACT_CLASSES &&
							(STORYBOOK_REACT_CLASSES[
								'client/components/mma/cancel/contributions/ContributionsCancellationFlowFinancialSaveAttempt.tsx#ContributionsCancellationFlowFinancialSaveAttempt'
							] = {
								docgenInfo:
									ContributionsCancellationFlowFinancialSaveAttempt.__docgenInfo,
								name: 'ContributionsCancellationFlowFinancialSaveAttempt',
								path: 'client/components/mma/cancel/contributions/ContributionsCancellationFlowFinancialSaveAttempt.tsx#ContributionsCancellationFlowFinancialSaveAttempt',
							});
				} catch (__react_docgen_typescript_loader_error) {}
				var contributionsCancellationReasons = [
						{
							reasonId: 'mma_editorial',
							linkLabel:
								'I am unhappy with some editorial decisions',
							alternateFeedbackIntro: cancellationConstants.Vc,
						},
						{
							reasonId: 'mma_financial_circumstances',
							linkLabel: 'I can no longer afford to support you',
							saveBody:
								ContributionsCancellationFlowFinancialSaveAttempt,
							savedBody:
								ContributionsCancellationAmountUpdatedSaved,
							alternateFeedbackIntro: cancellationConstants.Vc,
							hideSaveActions: !0,
							skipFeedback: !0,
							hideContactUs: !0,
						},
						{
							reasonId: 'mma_price_increase',
							linkLabel: 'The price has recently increased',
							saveBody:
								ContributionsCancellationFlowFinancialSaveAttempt,
							savedBody:
								ContributionsCancellationAmountUpdatedSaved,
							alternateFeedbackIntro: cancellationConstants.Vc,
							hideSaveActions: !0,
							skipFeedback: !0,
							hideContactUs: !0,
						},
						{
							reasonId: 'mma_benefits',
							linkLabel:
								'I’m not fully satisfied with the product features or benefits',
							alternateFeedbackIntro: cancellationConstants.Vc,
							saveBody: [
								'Thank you for your ongoing support. Once you’ve completed your cancellation below, you can set up a new product via our online checkouts.',
							],
						},
						{
							reasonId: 'mma_support_another_way',
							linkLabel: 'I want to support in a different way',
							saveBody:
								ContributionsCancellationFlowFinancialSaveAttempt,
							savedBody:
								ContributionsCancellationAmountUpdatedSaved,
							alternateFeedbackIntro: cancellationConstants.Vc,
							hideSaveActions: !0,
						},
						{
							reasonId: 'mma_values',
							linkLabel:
								'I don’t feel that the Guardian values my support',
							alternateFeedbackIntro: cancellationConstants.Vc,
						},
						{
							reasonId: 'mma_break_from_news',
							linkLabel: 'I’m taking a break from news',
							alternateFeedbackIntro: cancellationConstants.Vc,
						},
						{
							reasonId: 'mma_dont_read_enough',
							linkLabel:
								'I don’t have enough time to read regularly',
							alternateFeedbackIntro: cancellationConstants.Vc,
						},
						{
							reasonId: 'mma_issue',
							linkLabel: 'I’m having technical issues',
							alternateFeedbackIntro: cancellationConstants.Vc,
						},
						{
							reasonId: 'mma_health',
							linkLabel:
								'I’m dealing with personal or health matters',
							alternateFeedbackIntro: cancellationConstants.Vc,
						},
					],
					otherCancellationReason = [
						{
							reasonId: 'mma_other',
							linkLabel: 'Another reason (please specify)',
							alternateFeedbackIntro: cancellationConstants.Vc,
						},
					],
					shuffledContributionsCancellationReasons = [
						...(0, utils.Sy)(contributionsCancellationReasons),
						...otherCancellationReason,
					];
			},
		'./client/components/mma/cancel/gw/GwCancellationReasons.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				$x: () => shuffledGWCancellationReasons,
				P9: () => gwCancellationReasons,
			});
			var _client_utilities_utils__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__('./client/utilities/utils.ts'),
				_cancellationConstants__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./client/components/mma/cancel/cancellationConstants.ts',
					),
				_GenericSaveBodyResponses__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./client/components/mma/cancel/GenericSaveBodyResponses.tsx',
					),
				gwCancellationReasons = [
					{
						reasonId: 'mma_editorial',
						linkLabel: 'I am unhappy with Guardian journalism',
						saveBody: [
							'In order to improve our journalism, we’d love to know more about why you are thinking of cancelling.',
						],
						alternateFeedbackIntro:
							_cancellationConstants__WEBPACK_IMPORTED_MODULE_0__.Vc,
					},
					{
						reasonId: 'mma_financial_circumstances',
						linkLabel: 'A change in my financial circumstances',
						saveBody: [
							'We understand that financial circumstances can change from time to time.',
							'Making a smaller contribution to the Guardian can be an inexpensive way of keeping journalism open for everyone to read and enjoy. Once you’ve completed your cancellation below, we hope you’ll consider a small one off or recurring contribution in the future.',
						],
						skipFeedback: !0,
					},
					{
						reasonId: 'mma_support_another_way',
						linkLabel:
							'I am going to support The Guardian in another way, eg. by subscribing',
						saveBody: [
							'Thank you for your ongoing support.',
							'Once you’ve completed your cancellation below, you can set up a new product via our online checkouts.',
						],
						skipFeedback: !0,
					},
					{
						reasonId: 'mma_health',
						linkLabel: 'Ill-health',
						saveBody: [
							'Thank you for your ongoing support.',
							'Your subscription has ensured that our quality journalism remains open for everyone to read and enjoy.',
							'Please confirm your cancellation below.',
						],
						skipFeedback: !0,
					},
					{
						reasonId: 'mma_break_from_news',
						linkLabel: 'I am taking a break from news',
						saveBody:
							_GenericSaveBodyResponses__WEBPACK_IMPORTED_MODULE_1__.HK,
						escalationSaveBody: [
							'We’d love to know more about what we could do better to help provide inspiring and trustworthy news.',
						],
					},
					{
						reasonId: 'mma_values',
						linkLabel:
							'I don’t feel that The Guardian values my support',
						alternateFeedbackIntro:
							_cancellationConstants__WEBPACK_IMPORTED_MODULE_0__.bt,
					},
					{
						reasonId: 'mma_time',
						linkLabel: "I don't have time to use my subscription",
						alternateFeedbackIntro:
							_cancellationConstants__WEBPACK_IMPORTED_MODULE_0__.bt,
					},
					{
						reasonId: 'mma_better_offer',
						linkLabel:
							"I've found a better offer with another publisher",
						alternateFeedbackIntro:
							_cancellationConstants__WEBPACK_IMPORTED_MODULE_0__.bt,
					},
					{
						reasonId: 'mma_value_for_money',
						linkLabel: "I wasn't getting value for money",
						alternateFeedbackIntro:
							_cancellationConstants__WEBPACK_IMPORTED_MODULE_0__.bt,
					},
					{
						reasonId: 'mma_covid',
						linkLabel:
							'My subscription use is disrupted due to COVID-19',
						alternateFeedbackIntro:
							_cancellationConstants__WEBPACK_IMPORTED_MODULE_0__.bt,
					},
					{
						reasonId: 'mma_delivery_issue',
						linkLabel: 'I’ve had repeated delivery issues',
						alternateFeedbackIntro:
							_cancellationConstants__WEBPACK_IMPORTED_MODULE_0__.bt,
					},
					{
						reasonId: 'mma_autorenew',
						linkLabel: 'I don’t want an auto-renewing subscription',
						skipFeedback: !0,
					},
				],
				otherCancellationReason = [
					{
						reasonId: 'mma_other',
						linkLabel: 'None of the above',
						saveTitle: 'Other',
						alternateFeedbackIntro:
							_cancellationConstants__WEBPACK_IMPORTED_MODULE_0__.bt,
					},
				],
				shuffledGWCancellationReasons = [
					...(0,
					_client_utilities_utils__WEBPACK_IMPORTED_MODULE_2__.Sy)(
						gwCancellationReasons,
					),
					...otherCancellationReason,
				];
		},
		'./client/components/mma/cancel/supporterplus/SupporterplusCancellationReasons.tsx':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					KT: () => supporterplusCancellationReasons,
					MV: () => shuffledSupporterPlusCancellationReasons,
					i: () => otherCancellationReason,
				});
				var _cancellationConstants__WEBPACK_IMPORTED_MODULE_0__ =
						__webpack_require__(
							'./client/components/mma/cancel/cancellationConstants.ts',
						),
					supporterplusCancellationReasons = [
						{
							reasonId: 'mma_editorial',
							linkLabel:
								'I am unhappy with some editorial decisions',
							alternateFeedbackIntro:
								_cancellationConstants__WEBPACK_IMPORTED_MODULE_0__.Vc,
						},
						{
							reasonId: 'mma_financial_circumstances',
							linkLabel: 'I can no longer afford to support you',
							saveBody:
								_cancellationConstants__WEBPACK_IMPORTED_MODULE_0__.mY,
							alternateFeedbackIntro:
								_cancellationConstants__WEBPACK_IMPORTED_MODULE_0__.Vc,
						},
						{
							reasonId: 'mma_price_increase',
							linkLabel: 'The price has recently increased',
							saveBody:
								_cancellationConstants__WEBPACK_IMPORTED_MODULE_0__.mY,
							alternateFeedbackIntro:
								_cancellationConstants__WEBPACK_IMPORTED_MODULE_0__.Vc,
						},
						{
							reasonId: 'mma_support_another_way',
							linkLabel:
								'I’d like to support you, but at a lower amount',
							saveBody:
								_cancellationConstants__WEBPACK_IMPORTED_MODULE_0__.mY,
							alternateFeedbackIntro:
								_cancellationConstants__WEBPACK_IMPORTED_MODULE_0__.Vc,
						},
						{
							reasonId: 'mma_values',
							linkLabel:
								'I don’t feel that the Guardian values my support',
							alternateFeedbackIntro:
								_cancellationConstants__WEBPACK_IMPORTED_MODULE_0__.Vc,
						},
						{
							reasonId: 'mma_benefits',
							linkLabel:
								'I’m not fully satisfied with the product features or benefits',
							alternateFeedbackIntro:
								_cancellationConstants__WEBPACK_IMPORTED_MODULE_0__.Vc,
						},
						{
							reasonId: 'mma_break_from_news',
							linkLabel: 'I’m taking a break from news',
							alternateFeedbackIntro:
								_cancellationConstants__WEBPACK_IMPORTED_MODULE_0__.Vc,
						},
						{
							reasonId: 'mma_dont_read_enough',
							linkLabel:
								'I don’t have enough time to read regularly',
							alternateFeedbackIntro:
								_cancellationConstants__WEBPACK_IMPORTED_MODULE_0__.Vc,
						},
						{
							reasonId: 'mma_issue',
							linkLabel: 'I’m having technical issues',
							alternateFeedbackIntro:
								_cancellationConstants__WEBPACK_IMPORTED_MODULE_0__.Vc,
						},
						{
							reasonId: 'mma_health',
							linkLabel:
								'I’m dealing with personal or health matters',
							alternateFeedbackIntro:
								_cancellationConstants__WEBPACK_IMPORTED_MODULE_0__.Vc,
						},
					],
					otherCancellationReason = [
						{
							reasonId: 'mma_other',
							linkLabel: 'Another reason (please specify)',
							alternateFeedbackIntro:
								_cancellationConstants__WEBPACK_IMPORTED_MODULE_0__.Vc,
						},
					],
					shuffledSupporterPlusCancellationReasons = [
						...[...supporterplusCancellationReasons].sort(
							() => 0.5 - Math.random(),
						),
						...otherCancellationReason,
					];
			},
		'./client/components/mma/identity/GenericErrorMessage.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				k: () => GenericErrorMessage,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./node_modules/react/index.js',
				),
				_sharedStyles__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./client/components/mma/identity/sharedStyles.ts',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			var _ref = { name: 'pr10xp', styles: 'margin-bottom:10px' },
				_ref2 = { name: '1ykowef', styles: 'margin-bottom:0' },
				GenericErrorMessage = (0,
				react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((_, ref) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.BX)(
						'div',
						{
							ref,
							css: _sharedStyles__WEBPACK_IMPORTED_MODULE_1__.Ig,
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
									'p',
									{
										css: _ref,
										children:
											'Sorry, something went wrong!',
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
									'p',
									{
										css: _ref2,
										children: (0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
											'a',
											{
												css: (0,
												_emotion_react__WEBPACK_IMPORTED_MODULE_3__.iv)(
													{
														color: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
															.palette.sport[300],
														cursor: 'pointer',
													},
													'',
													'',
												),
												onClick: () =>
													window.location.reload(),
												children: 'Refresh this page',
											},
										),
									},
								),
							],
						},
					),
				);
			try {
				(GenericErrorMessage.displayName = 'GenericErrorMessage'),
					(GenericErrorMessage.__docgenInfo = {
						description: '',
						displayName: 'GenericErrorMessage',
						props: {},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/identity/GenericErrorMessage.tsx#GenericErrorMessage'
						] = {
							docgenInfo: GenericErrorMessage.__docgenInfo,
							name: 'GenericErrorMessage',
							path: 'client/components/mma/identity/GenericErrorMessage.tsx#GenericErrorMessage',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/shared/AsyncLoader.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				y: () => AsyncLoader,
			});
			var _sentry_browser__WEBPACK_IMPORTED_MODULE_6__ =
					__webpack_require__(
						'./node_modules/@sentry/minimal/esm/index.js',
					),
				react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./node_modules/react/index.js',
				),
				_utilities_analytics__WEBPACK_IMPORTED_MODULE_5__ =
					__webpack_require__('./client/utilities/analytics.ts'),
				_shared_GenericErrorScreen__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./client/components/shared/GenericErrorScreen.tsx',
					),
				_shared_Spinner__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./client/components/shared/Spinner.tsx',
					),
				_shared_WithStandardTopMargin__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./client/components/shared/WithStandardTopMargin.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
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
			var LoadingState = (function (LoadingState) {
				return (
					(LoadingState[(LoadingState.Loading = 0)] = 'Loading'),
					(LoadingState[(LoadingState.Loaded = 1)] = 'Loaded'),
					(LoadingState[(LoadingState.Error = 2)] = 'Error'),
					LoadingState
				);
			})(LoadingState || {});
			class AsyncLoader extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
				constructor() {
					super(...arguments),
						_defineProperty(this, 'state', {
							loadingState: LoadingState.Loading,
						}),
						_defineProperty(
							this,
							'readerOnOK',
							this.props.readerOnOK || ((resp) => resp.json()),
						),
						_defineProperty(
							this,
							'processResponse',
							(resp, _, allResponses) => {
								var locationHeader =
										resp.headers.get('Location'),
									allResponsesAreOK =
										0 ===
										(allResponses || [resp]).filter(
											(res) => !res.ok,
										).length;
								if (
									401 === resp.status &&
									locationHeader &&
									void 0 !== window
								)
									return (
										window.location.replace(locationHeader),
										Promise.resolve(null)
									);
								if (allResponsesAreOK)
									return this.readerOnOK(resp);
								throw new Error(
									''
										.concat(resp.status, ' (')
										.concat(resp.statusText, ')'),
								);
							},
						);
				}
				componentDidMount() {
					this.props
						.fetch()
						.then((resp) =>
							Array.isArray(resp)
								? Promise.all(resp.map(this.processResponse))
								: this.processResponse(resp),
						)
						.then((data) => {
							(this.props.shouldPreventRender &&
								this.props.shouldPreventRender(data)) ||
								null === data ||
								this.setState({
									data,
									loadingState: LoadingState.Loaded,
								});
						})
						.catch((exception) => this.handleError(exception));
				}
				render() {
					return this.state.loadingState === LoadingState.Loading
						? this.props.inline
							? (0,
							  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
									_shared_Spinner__WEBPACK_IMPORTED_MODULE_2__.$,
									{
										loadingMessage:
											this.props.loadingMessage,
										inline: this.props.inline,
										scale: this.props.spinnerScale,
									},
							  )
							: (0,
							  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
									_shared_WithStandardTopMargin__WEBPACK_IMPORTED_MODULE_3__.z,
									{
										children: (0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
											_shared_Spinner__WEBPACK_IMPORTED_MODULE_2__.$,
											{
												loadingMessage:
													this.props.loadingMessage,
											},
										),
									},
							  )
						: this.state.loadingState === LoadingState.Loaded &&
						  void 0 !== this.state.data
						? this.props.render(this.state.data, () =>
								this.setState(
									{ loadingState: LoadingState.Loading },
									this.componentDidMount,
								),
						  )
						: this.props.errorRender
						? this.props.errorRender()
						: (0,
						  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
								_shared_GenericErrorScreen__WEBPACK_IMPORTED_MODULE_1__.c,
								{},
						  );
				}
				handleError(error) {
					(this.props.shouldPreventErrorRender &&
						this.props.shouldPreventErrorRender()) ||
						this.setState({ loadingState: LoadingState.Error }),
						(0,
						_utilities_analytics__WEBPACK_IMPORTED_MODULE_5__.L9)({
							eventCategory: 'asyncLoader',
							eventAction: 'error',
							eventLabel: error ? error.toString() : void 0,
						}),
						_sentry_browser__WEBPACK_IMPORTED_MODULE_6__.Tb(error);
				}
			}
			try {
				(AsyncLoader.displayName = 'AsyncLoader'),
					(AsyncLoader.__docgenInfo = {
						description: '',
						displayName: 'AsyncLoader',
						props: {
							fetch: {
								defaultValue: null,
								description: '',
								name: 'fetch',
								required: !0,
								type: {
									name: '() => Promise<Response | Response[]>',
								},
							},
							readerOnOK: {
								defaultValue: null,
								description: '',
								name: 'readerOnOK',
								required: !1,
								type: { name: 'ReaderOnOK<T>' },
							},
							shouldPreventRender: {
								defaultValue: null,
								description: '',
								name: 'shouldPreventRender',
								required: !1,
								type: { name: '((data: T) => boolean)' },
							},
							render: {
								defaultValue: null,
								description: '',
								name: 'render',
								required: !0,
								type: {
									name: '(data: T, reFetch: ReFetch) => ReactNode',
								},
							},
							loadingMessage: {
								defaultValue: null,
								description: '',
								name: 'loadingMessage',
								required: !0,
								type: { name: 'string' },
							},
							shouldPreventErrorRender: {
								defaultValue: null,
								description: '',
								name: 'shouldPreventErrorRender',
								required: !1,
								type: { name: '(() => boolean)' },
							},
							errorRender: {
								defaultValue: null,
								description: '',
								name: 'errorRender',
								required: !1,
								type: { name: '(() => ReactNode)' },
							},
							inline: {
								defaultValue: null,
								description: '',
								name: 'inline',
								required: !1,
								type: { name: 'true' },
							},
							spinnerScale: {
								defaultValue: null,
								description: '',
								name: 'spinnerScale',
								required: !1,
								type: { name: 'number' },
							},
							scale: {
								defaultValue: null,
								description: '',
								name: 'scale',
								required: !1,
								type: { name: 'number' },
							},
							alignCenter: {
								defaultValue: null,
								description: '',
								name: 'alignCenter',
								required: !1,
								type: { name: 'true' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/AsyncLoader.tsx#AsyncLoader'
						] = {
							docgenInfo: AsyncLoader.__docgenInfo,
							name: 'AsyncLoader',
							path: 'client/components/mma/shared/AsyncLoader.tsx#AsyncLoader',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/shared/Heading.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { X: () => Heading });
			var _emotion_react__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				Heading = (props) => {
					var _props$level,
						dividerStyles = props.borderless
							? (0,
							  _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
									'',
									'',
							  )
							: (0,
							  _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
									'border-top:1px solid ',
									_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
										.palette.neutral[86],
									';',
									'',
							  ),
						headingStyles = (0,
						_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
							props.sansSerif
								? _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.Kie
								: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.vD7,
							';margin-top:0;margin-bottom:0;',
							_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
								.Dp.tablet,
							'{',
							props.sansSerif
								? _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.Rze
								: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.Hu7,
							';}',
							'',
						),
						HeadingElement = 'h'.concat(
							null !== (_props$level = props.level) &&
								void 0 !== _props$level
								? _props$level
								: 2,
						);
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
						'div',
						{
							css: dividerStyles,
							children: (0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
								HeadingElement,
								{
									css: [
										headingStyles,
										props.cssOverrides,
										'',
										'',
									],
									children: props.children,
								},
							),
						},
					);
				};
			try {
				(Heading.displayName = 'Heading'),
					(Heading.__docgenInfo = {
						description: '',
						displayName: 'Heading',
						props: {
							cssOverrides: {
								defaultValue: null,
								description: '',
								name: 'cssOverrides',
								required: !1,
								type: {
									name: 'SerializedStyles | SerializedStyles[]',
								},
							},
							level: {
								defaultValue: null,
								description: '',
								name: 'level',
								required: !1,
								type: {
									name: 'enum',
									value: [
										{ value: '"1"' },
										{ value: '"2"' },
										{ value: '"3"' },
										{ value: '"4"' },
									],
								},
							},
							sansSerif: {
								defaultValue: null,
								description: '',
								name: 'sansSerif',
								required: !1,
								type: { name: 'boolean' },
							},
							borderless: {
								defaultValue: null,
								description: '',
								name: 'borderless',
								required: !1,
								type: { name: 'boolean' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/Heading.tsx#Heading'
						] = {
							docgenInfo: Heading.__docgenInfo,
							name: 'Heading',
							path: 'client/components/mma/shared/Heading.tsx#Heading',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/shared/NonServiceableCountries.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				D: () => nonServiceableCountries,
			});
			var nonServiceableCountries = [
				'Afghanistan',
				'Aland Islands',
				'Albania',
				'Algeria',
				'American Samoa',
				'Andorra',
				'Angola',
				'Anguilla',
				'Antarctica',
				'Antigua And Barbuda',
				'Argentina',
				'Armenia',
				'Aruba',
				'Azerbaijan',
				'Bahamas',
				'Bahrain',
				'Bangladesh',
				'Barbados',
				'Belarus',
				'Belize',
				'Benin',
				'Bermuda',
				'Bhutan',
				'Bolivia',
				'Bonaire, Saint Eustatius and Saba',
				'Bosnia and Herzegovina',
				'Botswana',
				'Bouvet Island',
				'British Indian Ocean Territory',
				'Brunei Darussalam',
				'Burkina Faso',
				'Burundi',
				'Cambodia',
				'Cameroon',
				'Cape Verde',
				'Cayman Islands',
				'Central African Republic',
				'Chad',
				'Chile',
				'China',
				'Christmas Island',
				'Cocos (Keeling) Islands',
				'Colombia',
				'Comoros',
				'Congo',
				'Congo, the Democratic Republic of the',
				'Cook Islands',
				'Costa Rica',
				"Cote d'Ivoire",
				'Cuba',
				'Curacao',
				'Djibouti',
				'Dominica',
				'Dominican Republic',
				'Ecuador',
				'Egypt',
				'El Salvador',
				'Equatorial Guinea',
				'Eritrea',
				'Ethiopia',
				'Faroe Islands',
				'Fiji',
				'French Guiana',
				'French Polynesia',
				'French Southern Territories',
				'Gabon',
				'Gambia',
				'Georgia',
				'Ghana',
				'Greenland',
				'Grenada',
				'Guadeloupe',
				'Guam',
				'Guatemala',
				'Guinea',
				'Guinea-Bissau',
				'Guyana',
				'Haiti',
				'Heard Island and McDonald Islands',
				'Holy See (Vatican City State)',
				'Honduras',
				'Indonesia',
				'Iran, Islamic Republic of',
				'Iraq',
				'Jamaica',
				'Jordan',
				'Kazakhstan',
				'Kenya',
				'Kiribati',
				"Korea, Democratic People's Republic of",
				'Korea, Republic of',
				'Kuwait',
				'Kyrgyzstan',
				"Lao People's Democratic Republic",
				'Lebanon',
				'Lesotho',
				'Liberia',
				'Libyan Arab Jamahiriya',
				'Liechtenstein',
				'Macao',
				'Macedonia, the former Yugoslav Republic of',
				'Madagascar',
				'Malawi',
				'Maldives',
				'Mali',
				'Marshall Islands',
				'Martinique',
				'Mauritania',
				'Mauritius',
				'Mayotte',
				'Micronesia, Federated States of',
				'Moldova, Republic of',
				'Monaco',
				'Mongolia',
				'Montenegro',
				'Montserrat',
				'Morocco',
				'Mozambique',
				'Myanmar',
				'Namibia',
				'Nauru',
				'Nepal',
				'New Caledonia',
				'Nicaragua',
				'Niger',
				'Nigeria',
				'Niue',
				'Norfolk Island',
				'Northern Mariana Islands',
				'Oman',
				'Pakistan',
				'Palau',
				'Panama',
				'Papua New Guinea',
				'Paraguay',
				'Peru',
				'Philippines',
				'Pitcairn',
				'Puerto Rico',
				'Qatar',
				'Reunion',
				'Rwanda',
				'Saint Barthelemy',
				'Saint Helena',
				'Saint Kitts and Nevis',
				'Saint Lucia',
				'Saint Martin (French part)',
				'Saint Pierre and Miquelon',
				'Saint Vincent and the Grenadines',
				'Samoa',
				'San Marino',
				'Sao Tome and Principe',
				'Saudi Arabia',
				'Senegal',
				'Serbia',
				'Seychelles',
				'Sierra Leone',
				'Sint Maarten',
				'Solomon Islands',
				'Somalia',
				'South Georgia and the South Sandwich Islands',
				'South Sudan',
				'Sri Lanka',
				'Sudan',
				'Suriname',
				'Svalbard and Jan Mayen',
				'Swaziland',
				'Syrian Arab Republic',
				'Taiwan',
				'Tajikistan',
				'Tanzania, United Republic of',
				'Thailand',
				'Timor-Leste',
				'Togo',
				'Tokelau',
				'Tonga',
				'Trinidad and Tobago',
				'Tunisia',
				'Turkey',
				'Turkmenistan',
				'Turks and Caicos Islands',
				'Tuvalu',
				'Uganda',
				'Ukraine',
				'United States Minor Outlying Islands',
				'Uruguay',
				'Uzbekistan',
				'Vanuatu',
				'Venezuela',
				'Viet Nam',
				'Virgin Islands, British',
				'Virgin Islands, U.S.',
				'Wallis and Futuna',
				'Western Sahara',
				'Yemen',
				'Zambia',
				'Zimbabwe',
			];
		},
		'./client/components/mma/shared/asyncComponents/DefaultApiResponseHandler.tsx':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					Zo: () => handleResponses,
					cf: () => TextResponseHandler,
					xJ: () => JsonResponseHandler,
				});
				var JsonResponseHandler = (response) =>
						handleResponses(response, (r) => r.json()),
					TextResponseHandler = (response) =>
						handleResponses(response, (r) => r.text());
				function handleResponses(response, transformResponse) {
					if (
						(function hasBadResponse(responses) {
							if (Array.isArray(responses))
								return responses.some(
									(response) => !response.ok,
								);
							return !responses.ok;
						})(response)
					)
						throw new Error('Invalid API response');
					return Array.isArray(response)
						? Promise.all(
								response.map((r) =>
									handleSingleResponse(r, transformResponse),
								),
						  )
						: handleSingleResponse(response, transformResponse);
				}
				function handleSingleResponse(response, transformResponse) {
					var locationHeader = response.headers.get('Location');
					return 401 === response.status &&
						locationHeader &&
						void 0 !== window
						? (window.location.replace(locationHeader),
						  Promise.resolve(null))
						: transformResponse(response);
				}
				try {
					(JsonResponseHandler.displayName = 'JsonResponseHandler'),
						(JsonResponseHandler.__docgenInfo = {
							description: '',
							displayName: 'JsonResponseHandler',
							props: {},
						}),
						'undefined' != typeof STORYBOOK_REACT_CLASSES &&
							(STORYBOOK_REACT_CLASSES[
								'client/components/mma/shared/asyncComponents/DefaultApiResponseHandler.tsx#JsonResponseHandler'
							] = {
								docgenInfo: JsonResponseHandler.__docgenInfo,
								name: 'JsonResponseHandler',
								path: 'client/components/mma/shared/asyncComponents/DefaultApiResponseHandler.tsx#JsonResponseHandler',
							});
				} catch (__react_docgen_typescript_loader_error) {}
				try {
					(TextResponseHandler.displayName = 'TextResponseHandler'),
						(TextResponseHandler.__docgenInfo = {
							description: '',
							displayName: 'TextResponseHandler',
							props: {},
						}),
						'undefined' != typeof STORYBOOK_REACT_CLASSES &&
							(STORYBOOK_REACT_CLASSES[
								'client/components/mma/shared/asyncComponents/DefaultApiResponseHandler.tsx#TextResponseHandler'
							] = {
								docgenInfo: TextResponseHandler.__docgenInfo,
								name: 'TextResponseHandler',
								path: 'client/components/mma/shared/asyncComponents/DefaultApiResponseHandler.tsx#TextResponseHandler',
							});
				} catch (__react_docgen_typescript_loader_error) {}
			},
		'./client/components/mma/shared/asyncComponents/DefaultLoadingView.tsx':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					I: () => DefaultLoadingView,
				});
				var _shared_Spinner__WEBPACK_IMPORTED_MODULE_0__ =
						__webpack_require__(
							'./client/components/shared/Spinner.tsx',
						),
					_shared_WithStandardTopMargin__WEBPACK_IMPORTED_MODULE_1__ =
						__webpack_require__(
							'./client/components/shared/WithStandardTopMargin.tsx',
						),
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ =
						__webpack_require__(
							'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
						);
				function DefaultLoadingView(props) {
					var _props$loadingMessage;
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
						_shared_WithStandardTopMargin__WEBPACK_IMPORTED_MODULE_1__.z,
						{
							children: (0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
								_shared_Spinner__WEBPACK_IMPORTED_MODULE_0__.$,
								{
									loadingMessage:
										null !==
											(_props$loadingMessage =
												null == props
													? void 0
													: props.loadingMessage) &&
										void 0 !== _props$loadingMessage
											? _props$loadingMessage
											: 'Loading',
								},
							),
						},
					);
				}
				try {
					(DefaultLoadingView.displayName = 'DefaultLoadingView'),
						(DefaultLoadingView.__docgenInfo = {
							description: '',
							displayName: 'DefaultLoadingView',
							props: {
								loadingMessage: {
									defaultValue: null,
									description: '',
									name: 'loadingMessage',
									required: !1,
									type: { name: 'string' },
								},
							},
						}),
						'undefined' != typeof STORYBOOK_REACT_CLASSES &&
							(STORYBOOK_REACT_CLASSES[
								'client/components/mma/shared/asyncComponents/DefaultLoadingView.tsx#DefaultLoadingView'
							] = {
								docgenInfo: DefaultLoadingView.__docgenInfo,
								name: 'DefaultLoadingView',
								path: 'client/components/mma/shared/asyncComponents/DefaultLoadingView.tsx#DefaultLoadingView',
							});
				} catch (__react_docgen_typescript_loader_error) {}
			},
		'./client/components/shared/CallCentreNumbers.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				H: () => CallCentreNumbers,
				t: () => ukPhoneNumberWithoutPrefix,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				ukPhoneNumberWithoutPrefix = '0330 333 6790',
				CallCentreNumbers = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.BX)(
						'div',
						{
							children: [
								props.prefixText || 'To contact us',
								' directly, please email ',
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
									'a',
									{
										css: (0,
										_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(
											{
												textDecoration: 'underline',
												color: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
													.palette.sport[300],
												':visited': {
													color: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
														.palette.sport[300],
												},
											},
											'',
											'',
										),
										href: 'mailto:customer.help@theguardian.com',
										children:
											'customer.help@theguardian.com',
									},
								),
								'.',
							],
						},
					);
			try {
				(CallCentreNumbers.displayName = 'CallCentreNumbers'),
					(CallCentreNumbers.__docgenInfo = {
						description: '',
						displayName: 'CallCentreNumbers',
						props: {
							prefixText: {
								defaultValue: null,
								description: '',
								name: 'prefixText',
								required: !1,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/shared/CallCentreNumbers.tsx#CallCentreNumbers'
						] = {
							docgenInfo: CallCentreNumbers.__docgenInfo,
							name: 'CallCentreNumbers',
							path: 'client/components/shared/CallCentreNumbers.tsx#CallCentreNumbers',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/shared/GenericErrorScreen.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				c: () => GenericErrorScreen,
			});
			var _sentry_browser__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@sentry/minimal/esm/index.js',
					),
				_utilities_analytics__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__('./client/utilities/analytics.ts'),
				_CallCentreNumbers__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./client/components/shared/CallCentreNumbers.tsx',
					),
				_WithStandardTopMargin__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./client/components/shared/WithStandardTopMargin.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				GenericErrorScreen = (_ref) => {
					var { loggingMessage } = _ref;
					return (
						loggingMessage &&
							(_sentry_browser__WEBPACK_IMPORTED_MODULE_1__.Tb(
								loggingMessage,
							),
							(0,
							_utilities_analytics__WEBPACK_IMPORTED_MODULE_2__.L9)(
								{
									eventCategory: 'genericErrorScreen',
									eventAction: 'error',
									eventLabel: loggingMessage,
								},
							)),
						(0,
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.BX)(
							_WithStandardTopMargin__WEBPACK_IMPORTED_MODULE_0__.z,
							{
								children: [
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
										'h2',
										{ children: 'Oops!' },
									),
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.BX)(
										'p',
										{
											children: [
												'Sorry, it seems as if our system has encountered an error.',
												(0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
													'br',
													{},
												),
												'Please try again in a few minutes.',
											],
										},
									),
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
										_CallCentreNumbers__WEBPACK_IMPORTED_MODULE_4__.H,
										{
											prefixText:
												'Alternatively, to contact us',
										},
									),
								],
							},
						)
					);
				};
			try {
				(GenericErrorScreen.displayName = 'GenericErrorScreen'),
					(GenericErrorScreen.__docgenInfo = {
						description: '',
						displayName: 'GenericErrorScreen',
						props: {
							loggingMessage: {
								defaultValue: null,
								description: '',
								name: 'loggingMessage',
								required: !1,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/shared/GenericErrorScreen.tsx#GenericErrorScreen'
						] = {
							docgenInfo: GenericErrorScreen.__docgenInfo,
							name: 'GenericErrorScreen',
							path: 'client/components/shared/GenericErrorScreen.tsx#GenericErrorScreen',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/styles/typography.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { L: () => measure });
			var measure = {
				copy: { name: '6xzqfx', styles: 'max-width:60ch' },
				heading: { name: 'm6am5w', styles: 'max-width:30ch' },
			};
		},
		'./client/utilities/currencyIso.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				eu: () => convertCurrencyIsoToSymbol,
				uN: () => isCurrencyIso,
				vD: () => convertCurrencyToSymbol,
			});
			var _guardian_libs__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@guardian/libs/dist/isOneOf/isOneOf.js',
					),
				_sentry_browser__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@sentry/minimal/esm/index.js',
					),
				CurrencyIsos = ['GBP', 'USD', 'AUD', 'EUR', 'NZD', 'CAD'],
				currencySymbols = {
					GBP: '£',
					USD: '$',
					AUD: '$',
					EUR: '€',
					NZD: '$',
					CAD: '$',
				};
			function isCurrencyIso(currency) {
				return (0, _guardian_libs__WEBPACK_IMPORTED_MODULE_0__.g)(
					CurrencyIsos,
				)(currency);
			}
			function convertCurrencyToSymbol(currency) {
				if (isCurrencyIso(currency))
					return convertCurrencyIsoToSymbol(currency);
				_sentry_browser__WEBPACK_IMPORTED_MODULE_1__.Tb(
					'Unrecognized currency code: '.concat(currency),
				);
			}
			function convertCurrencyIsoToSymbol(currency) {
				return currencySymbols[currency];
			}
		},
		'./client/utilities/hooks/useAsyncLoader.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				G: () => LoadingState,
				c: () => useAsyncLoader,
			});
			var _sentry_browser__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@sentry/minimal/esm/index.js',
					),
				react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./node_modules/react/index.js',
				),
				_analytics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
					'./client/utilities/analytics.ts',
				),
				LoadingState = (function (LoadingState) {
					return (
						(LoadingState[(LoadingState.IsLoading = 0)] =
							'IsLoading'),
						(LoadingState[(LoadingState.HasLoaded = 1)] =
							'HasLoaded'),
						(LoadingState[(LoadingState.HasError = 2)] =
							'HasError'),
						LoadingState
					);
				})({});
			function useAsyncLoader(asyncFetch, responseProcessor) {
				var [data, setData] = (0,
					react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
					[error, setError] = (0,
					react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
					[loadingState, setLoadingState] = (0,
					react__WEBPACK_IMPORTED_MODULE_0__.useState)(
						LoadingState.IsLoading,
					);
				return (
					(0, react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
						loadingState == LoadingState.IsLoading &&
							asyncFetch()
								.then((response) => responseProcessor(response))
								.then((data) => {
									setData(data),
										setLoadingState(LoadingState.HasLoaded);
								})
								.catch((e) =>
									(function handleError(error) {
										setLoadingState(LoadingState.HasError),
											setError(error),
											(0,
											_analytics__WEBPACK_IMPORTED_MODULE_1__.L9)(
												{
													eventCategory:
														'asyncLoader',
													eventAction: 'error',
													eventLabel: error
														? error.toString()
														: void 0,
												},
											),
											_sentry_browser__WEBPACK_IMPORTED_MODULE_2__.Tb(
												error,
											);
									})(e),
								);
					}, [loadingState]),
					{ data, error, loadingState }
				);
			}
		},
		'./client/utilities/pricingConfig/contributionsAmount.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				G: () => contributionAmountsLookup,
			});
			var contributionAmountsLookup = {
				GBP: {
					month: {
						amounts: [3, 7, 12],
						otherDefaultAmount: 2,
						minAmount: 2,
						maxAmount: 166,
					},
					year: {
						amounts: [60, 120, 240, 480],
						otherDefaultAmount: 10,
						minAmount: 10,
						maxAmount: 2e3,
					},
				},
				USD: {
					month: {
						amounts: [5, 10, 20],
						otherDefaultAmount: 2,
						minAmount: 2,
						maxAmount: 800,
					},
					year: {
						amounts: [50, 100, 250, 500],
						otherDefaultAmount: 20,
						minAmount: 10,
						maxAmount: 1e4,
					},
				},
				EUR: {
					month: {
						amounts: [6, 10, 20],
						otherDefaultAmount: 2,
						minAmount: 2,
						maxAmount: 166,
					},
					year: {
						amounts: [50, 100, 250, 500],
						otherDefaultAmount: 10,
						minAmount: 10,
						maxAmount: 2e3,
					},
				},
				AUD: {
					month: {
						amounts: [10, 20, 40],
						otherDefaultAmount: 10,
						minAmount: 2,
						maxAmount: 200,
					},
					year: {
						amounts: [80, 250, 500, 750],
						otherDefaultAmount: 10,
						minAmount: 10,
						maxAmount: 2e3,
					},
				},
				NZD: {
					month: {
						amounts: [10, 20, 50],
						otherDefaultAmount: 10,
						minAmount: 2,
						maxAmount: 200,
					},
					year: {
						amounts: [50, 100, 250, 500],
						otherDefaultAmount: 10,
						minAmount: 10,
						maxAmount: 2e3,
					},
				},
				CAD: {
					month: {
						amounts: [5, 10, 20],
						otherDefaultAmount: 5,
						minAmount: 2,
						maxAmount: 166,
					},
					year: {
						amounts: [60, 100, 250, 500],
						otherDefaultAmount: 10,
						minAmount: 10,
						maxAmount: 2e3,
					},
				},
				international: {
					month: {
						amounts: [5, 10, 20],
						otherDefaultAmount: 5,
						minAmount: 2,
						maxAmount: 166,
					},
					year: {
						amounts: [60, 100, 250, 500],
						otherDefaultAmount: 10,
						minAmount: 10,
						maxAmount: 2e3,
					},
				},
			};
		},
		'./client/utilities/productUtils.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				EV: () => allRecurringProductsDetailFetcher,
				IV: () => isNonServiceableCountry,
				SS: () => hasDeliveryRecordsFlow,
				fi: () => createProductDetailFetch,
				iC: () => shouldHaveHolidayStopsFlow,
				iY: () => productMoveFetch,
				lj: () => hasCancellationFlow,
				vD: () => allSingleProductsDetailFetcher,
				w: () => createProductDetailFetcher,
			});
			var _shared_identity__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__('./shared/identity.ts'),
				_shared_productResponse__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__('./shared/productResponse.ts'),
				_components_mma_shared_NonServiceableCountries__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./client/components/mma/shared/NonServiceableCountries.ts',
					),
				_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
					'./client/utilities/fetch.ts',
				),
				shouldHaveHolidayStopsFlow = (productType) =>
					!!productType.holidayStops,
				productMoveFetch = (
					subscriptionId,
					price,
					productSwitchType,
					preview,
					isTestUser,
				) =>
					fetch(
						'/api/product-move/'
							.concat(productSwitchType, '/')
							.concat(subscriptionId),
						{
							method: 'POST',
							body: JSON.stringify({ preview, price }),
							headers: {
								'Content-Type': 'application/json',
								[_shared_productResponse__WEBPACK_IMPORTED_MODULE_0__.l2]:
									''.concat(isTestUser),
							},
						},
					),
				createProductDetailFetcher =
					(productTypeFilter, subscriptionName) => () => {
						var apiUrl =
							'/api/me/mma' +
							(subscriptionName
								? '/'.concat(subscriptionName)
								: '?productType='.concat(productTypeFilter));
						return (0, _fetch__WEBPACK_IMPORTED_MODULE_1__.n4)(
							apiUrl,
							{
								headers: {
									[_shared_identity__WEBPACK_IMPORTED_MODULE_2__.h]:
										(0,
										_shared_identity__WEBPACK_IMPORTED_MODULE_2__.V)(
											window.location.href,
										),
								},
							},
						);
					},
				createProductDetailFetch = (
					productTypeFilter,
					subscriptionName,
				) =>
					(0, _fetch__WEBPACK_IMPORTED_MODULE_1__.n4)(
						'/api/me/mma' +
							(subscriptionName
								? '/'.concat(subscriptionName)
								: '?productType='.concat(productTypeFilter)),
						{
							headers: {
								[_shared_identity__WEBPACK_IMPORTED_MODULE_2__.h]:
									(0,
									_shared_identity__WEBPACK_IMPORTED_MODULE_2__.V)(
										window.location.href,
									),
							},
						},
					).then((res) => res.json()),
				allRecurringProductsDetailFetcher = () =>
					(0, _fetch__WEBPACK_IMPORTED_MODULE_1__.n4)('/api/me/mma', {
						headers: {
							[_shared_identity__WEBPACK_IMPORTED_MODULE_2__.h]:
								(0,
								_shared_identity__WEBPACK_IMPORTED_MODULE_2__.V)(
									window.location.href,
								),
						},
					}),
				allSingleProductsDetailFetcher = () =>
					(0, _fetch__WEBPACK_IMPORTED_MODULE_1__.n4)(
						'/api/me/one-off-contributions',
					),
				hasCancellationFlow = (productType) =>
					void 0 !== productType.cancellation,
				hasDeliveryRecordsFlow = (productType) => {
					var _productType$delivery2;
					return !(
						null ===
							(_productType$delivery2 = productType.delivery) ||
						void 0 === _productType$delivery2 ||
						!_productType$delivery2.records
					);
				};
			function isNonServiceableCountry(productDetail) {
				var _productDetail$billin;
				return _components_mma_shared_NonServiceableCountries__WEBPACK_IMPORTED_MODULE_3__.D.includes(
					null !==
						(_productDetail$billin =
							productDetail.billingCountry) &&
						void 0 !== _productDetail$billin
						? _productDetail$billin
						: '',
				);
			}
		},
		'./client/utilities/utils.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				Ff: () => processResponse,
				OG: () => flattenEquivalent,
				Sy: () => shuffleArray,
				br: () => waitForElement,
				dN: () => formatAmount,
			});
			var _sentry_browser__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@sentry/minimal/esm/index.js',
					),
				_analytics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./client/utilities/analytics.ts',
				);
			function flattenEquivalent(x) {
				return x;
			}
			var shuffleArray = (array) => {
				for (var currentIndex = array.length; 0 != currentIndex; ) {
					var randomIndex = Math.floor(Math.random() * currentIndex);
					currentIndex--,
						([array[currentIndex], array[randomIndex]] = [
							array[randomIndex],
							array[currentIndex],
						]);
				}
				return array;
			};
			function formatAmount(amount) {
				return Number.isInteger(amount) ? amount : amount.toFixed(2);
			}
			var processResponse = (resp) => {
				var locationHeader = resp.headers.get('Location'),
					allResponsesAreOK =
						0 === [resp].filter((res) => !res.ok).length;
				if (401 === resp.status && locationHeader && void 0 !== window)
					return (
						window.location.replace(locationHeader),
						Promise.resolve(null)
					);
				if (allResponsesAreOK) return resp.json();
				var error = new Error(
					''.concat(resp.status, ' (').concat(resp.statusText, ')'),
				);
				throw (
					((0, _analytics__WEBPACK_IMPORTED_MODULE_0__.L9)({
						eventCategory: 'fetch',
						eventAction: 'error',
						eventLabel: error ? error.toString() : void 0,
					}),
					_sentry_browser__WEBPACK_IMPORTED_MODULE_1__.Tb(error),
					error)
				);
			};
			function waitForElement(selector) {
				return new Promise((resolve) => {
					if (document.querySelector(selector))
						return resolve(document.querySelector(selector));
					var observer = new MutationObserver((_) => {
						document.querySelector(selector) &&
							(observer.disconnect(),
							resolve(document.querySelector(selector)));
					});
					observer.observe(document.body, {
						childList: !0,
						subtree: !0,
					});
				});
			}
		},
		'./shared/cancellationUtilsAndTypes.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				e: () => cancelAlternativeUrlPartLookup,
			});
			var cancelAlternativeUrlPartLookup = (
				isPossibleOffer,
				isPossiblePause,
				isPossibleSwitch,
			) =>
				isPossibleOffer
					? 'offer'
					: isPossiblePause
					? 'pause'
					: isPossibleSwitch
					? 'switch'
					: '';
		},
		'./shared/dates.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				Bn: () => DATE_FNS_LONG_OUTPUT_FORMAT,
				CF: () => dateAddYears,
				Kn: () => dateIsAfter,
				Ov: () => dateIsSameOrBefore,
				U5: () => DATE_FNS_INPUT_FORMAT,
				W4: () => dateAddDays,
				YV: () => getWeekDay,
				YX: () => dateIsSame,
				ZB: () => dateAddMonths,
				e1: () => cancellationFormatDate,
				el: () => numberOfDaysInMonth,
				fZ: () => dateRange,
				gg: () => convertTimestampToDate,
				m2: () => dateIsLeapYear,
				mB: () => getAppropriateReadableTimePeriod,
				od: () => dateClone,
				rd: () => DATE_FNS_SHORT_OUTPUT_FORMAT,
				sG: () => parseDate,
				ur: () => dateString,
				vh: () => dateIsSameOrAfter,
				ym: () => getOldestDate,
			});
			var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
					'./node_modules/date-fns/esm/parse/index.js',
				),
				date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
					'./node_modules/date-fns/esm/format/index.js',
				),
				_generalTypes__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__('./shared/generalTypes.ts'),
				_numberUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./shared/numberUtils.ts',
				),
				DATE_FNS_INPUT_FORMAT = 'yyyy-MM-dd',
				DATE_FNS_LONG_OUTPUT_FORMAT = 'd MMMM yyyy',
				DATE_FNS_SHORT_OUTPUT_FORMAT = 'd MMM yyyy',
				cancellationFormatDate = function (cancellationEffectiveDate) {
					var outputFormat =
						arguments.length > 1 && void 0 !== arguments[1]
							? arguments[1]
							: DATE_FNS_SHORT_OUTPUT_FORMAT;
					return void 0 === cancellationEffectiveDate
						? 'today'
						: parseDate(cancellationEffectiveDate).dateStr(
								outputFormat,
						  );
				},
				parseDate = function (inputDateStr) {
					var dateInputFormat =
							arguments.length > 1 && void 0 !== arguments[1]
								? arguments[1]
								: DATE_FNS_INPUT_FORMAT,
						dateObject = inputDateStr
							? (0, date_fns__WEBPACK_IMPORTED_MODULE_1__.Z)(
									inputDateStr,
									dateInputFormat,
									new Date(),
							  )
							: new Date();
					return {
						date: dateObject,
						dateStr: function () {
							return dateString(
								dateObject,
								arguments.length > 0 && void 0 !== arguments[0]
									? arguments[0]
									: DATE_FNS_SHORT_OUTPUT_FORMAT,
							);
						},
						isBefore: (comparisonDate) =>
							dateIsBefore(dateObject, comparisonDate),
						isSameOrAfter: (comparisonDate) =>
							dateIsSameOrAfter(dateObject, comparisonDate),
						isSame: (comparisonDate) =>
							dateIsSame(dateObject, comparisonDate),
						isLeapYear: dateIsLeapYear(dateObject),
					};
				},
				dateString = function (inputDate) {
					var outputFormat =
						arguments.length > 1 && void 0 !== arguments[1]
							? arguments[1]
							: DATE_FNS_SHORT_OUTPUT_FORMAT;
					return (0, date_fns__WEBPACK_IMPORTED_MODULE_2__.Z)(
						inputDate,
						outputFormat,
					);
				},
				dateIsBefore = (inputDate, comparisonDate) =>
					inputDate.valueOf() < comparisonDate.valueOf(),
				dateIsSameOrBefore = (inputDate, comparisonDate) =>
					inputDate.valueOf() <= comparisonDate.valueOf(),
				dateIsAfter = (inputDate, comparisonDate) =>
					inputDate.valueOf() > comparisonDate.valueOf(),
				dateIsSameOrAfter = (inputDate, comparisonDate) =>
					inputDate.valueOf() >= comparisonDate.valueOf(),
				dateIsSame = (inputDate, comparisonDate) =>
					inputDate.valueOf() === comparisonDate.valueOf(),
				dateClone = (inputDate) => new Date(inputDate.valueOf()),
				dateIsLeapYear = (inputDate) => {
					var year = inputDate.getFullYear();
					return (
						(year % 4 == 0 && year % 100 != 0) || year % 400 == 0
					);
				},
				dateAddDays = (inputDate, daysModifier) => {
					var modifiedDate = new Date(inputDate.valueOf());
					return (
						modifiedDate.setDate(
							modifiedDate.getDate() + daysModifier,
						),
						modifiedDate
					);
				},
				dateAddMonths = (inputDate, monthsModifier) => {
					var modifiedDate = new Date(inputDate.valueOf());
					return (
						modifiedDate.setMonth(
							modifiedDate.getMonth() + monthsModifier,
						),
						modifiedDate
					);
				},
				dateAddYears = (inputDate, yearsModifier) => {
					var modifiedDate = new Date(inputDate.valueOf());
					return (
						modifiedDate.setFullYear(
							modifiedDate.getFullYear() + yearsModifier,
						),
						modifiedDate
					);
				},
				numberOfDaysInMonth = (inputDate) =>
					new Date(
						inputDate.getFullYear(),
						inputDate.getMonth() + 1,
						0,
					).getDate(),
				getWeekDay = (inputDate) =>
					new Intl.DateTimeFormat('en-US', {
						weekday: 'long',
					}).format(inputDate),
				dateRange = function (startDate, endDate) {
					var dateInputFormat =
						arguments.length > 2 && void 0 !== arguments[2]
							? arguments[2]
							: DATE_FNS_INPUT_FORMAT;
					return {
						start:
							startDate instanceof Date
								? startDate
								: (0, date_fns__WEBPACK_IMPORTED_MODULE_1__.Z)(
										startDate,
										dateInputFormat,
										new Date(),
								  ),
						end:
							endDate instanceof Date
								? endDate
								: (0, date_fns__WEBPACK_IMPORTED_MODULE_1__.Z)(
										endDate,
										dateInputFormat,
										new Date(),
								  ),
					};
				},
				getOldestDate = (dates) =>
					dates.reduce((dateA, dateB) =>
						dateA.valueOf() <= dateB.valueOf() ? dateA : dateB,
					);
			function convertTimestampToDate(timestamp) {
				return dateString(
					new Date(timestamp),
					DATE_FNS_LONG_OUTPUT_FORMAT,
				);
			}
			var getAppropriateReadableTimePeriod = (
					unit,
					periodType,
					additionalOptions,
				) => {
					var timePeriodsEquivalence = {
							year: { quarter: 4, month: 12, week: 52, day: 365 },
							quarter: { year: 0.25, month: 3 },
							month: {
								year: 0.08333333333333333,
								quarter: 0.3333333333333333,
							},
						},
						periodTypeSingularLowerCase =
							periodTypeToSingular(periodType).toLowerCase(),
						periodTypeInComparisonTimePeriods = [
							{ periodName: 'year' },
							{
								periodName: 'quarter',
								higherPeriod: 'year',
								unitsToSingularHigherPeriod: 4,
							},
							{
								periodName: 'month',
								higherPeriod: 'year',
								unitsToSingularHigherPeriod: 12,
							},
							{
								periodName: 'week',
								higherPeriod: 'month',
								unitsToSingularHigherPeriod: 4,
							},
							{
								periodName: 'day',
								higherPeriod: 'week',
								unitsToSingularHigherPeriod: 7,
							},
						].find(
							(element) =>
								element.periodName ===
								periodTypeSingularLowerCase,
						);
					if (!periodTypeInComparisonTimePeriods) {
						var numberOrWord =
							null != additionalOptions &&
							additionalOptions.preferNumberedOutput
								? unit
								: (0,
								  _numberUtils__WEBPACK_IMPORTED_MODULE_0__.f)(
										unit,
								  );
						return ''.concat(numberOrWord, ' ').concat(periodType);
					}
					if (
						null != additionalOptions &&
						additionalOptions.preferredPeriodType
					) {
						var _timePeriodsEquivalen,
							preferedPeriodTypeSingularLowerCase =
								periodTypeToSingular(
									additionalOptions.preferredPeriodType,
								).toLowerCase(),
							preferedPeriodUnitsMultiplier =
								null == timePeriodsEquivalence ||
								null ===
									(_timePeriodsEquivalen =
										timePeriodsEquivalence[
											periodTypeSingularLowerCase
										]) ||
								void 0 === _timePeriodsEquivalen
									? void 0
									: _timePeriodsEquivalen[
											preferedPeriodTypeSingularLowerCase
									  ];
						if (preferedPeriodUnitsMultiplier) {
							var preferedPeriodUnits =
								unit * preferedPeriodUnitsMultiplier;
							if (preferedPeriodUnits % 1 == 0) {
								var _numberOrWord =
									null != additionalOptions &&
									additionalOptions.preferNumberedOutput
										? preferedPeriodUnits
										: (0,
										  _numberUtils__WEBPACK_IMPORTED_MODULE_0__.f)(
												preferedPeriodUnits,
										  );
								return ''
									.concat(_numberOrWord, ' ')
									.concat(
										(0,
										_generalTypes__WEBPACK_IMPORTED_MODULE_3__.T)(
											additionalOptions.preferredPeriodType,
											preferedPeriodUnits,
										),
									);
							}
						}
					}
					if (
						periodTypeInComparisonTimePeriods.higherPeriod &&
						periodTypeInComparisonTimePeriods.unitsToSingularHigherPeriod &&
						unit %
							periodTypeInComparisonTimePeriods.unitsToSingularHigherPeriod ==
							0
					) {
						var numberOfHigherPeriods =
								unit /
								periodTypeInComparisonTimePeriods.unitsToSingularHigherPeriod,
							_numberOrWord2 =
								null != additionalOptions &&
								additionalOptions.preferNumberedOutput
									? numberOfHigherPeriods
									: (0,
									  _numberUtils__WEBPACK_IMPORTED_MODULE_0__.f)(
											numberOfHigherPeriods,
									  );
						return ''
							.concat(_numberOrWord2, ' ')
							.concat(
								(0,
								_generalTypes__WEBPACK_IMPORTED_MODULE_3__.T)(
									periodTypeInComparisonTimePeriods.higherPeriod,
									numberOfHigherPeriods,
								),
							);
					}
					var _numberOrWord3 =
						null != additionalOptions &&
						additionalOptions.preferNumberedOutput
							? unit
							: (0, _numberUtils__WEBPACK_IMPORTED_MODULE_0__.f)(
									unit,
							  );
					return ''.concat(_numberOrWord3, ' ').concat(periodType);
				},
				periodTypeToSingular = (periodType) =>
					periodType.endsWith('s')
						? periodType.substring(0, periodType.length - 1)
						: periodType;
		},
		'./shared/featureSwitches.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				k: () => featureSwitches,
			});
			var featureSwitches = {
				exampleFeature: !1,
				appSubscriptions: !0,
				supporterPlusUpdateAmount: !0,
				digisubSave: !0,
				supporterplusCancellationOffer: !0,
				contributionCancellationPause: !0,
				digitalArchiveCta: !1,
			};
		},
		'./shared/generalTypes.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				T: () => appendCorrectPluralisation,
			});
			var appendCorrectPluralisation = (inputUnitStr, amount) => {
				var lastChar = inputUnitStr.at(-1);
				return 1 === amount
					? 's' === lastChar
						? inputUnitStr.substring(0, inputUnitStr.length - 1)
						: inputUnitStr
					: 's' === lastChar
					? inputUnitStr
					: ''.concat(inputUnitStr, 's');
			};
		},
		'./shared/identity.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				V: () => getScopeFromRequestPathOrEmptyString,
				h: () => X_GU_ID_FORWARDED_SCOPE,
			});
			var X_GU_ID_FORWARDED_SCOPE = 'X-GU-ID-FORWARDED-SCOPE',
				getScopeFromRequestPathOrEmptyString = (requestPath) =>
					requestPath.includes('/payment/') ? 'payment-flow' : '';
		},
		'./shared/numberUtils.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				f: () => number2words,
			});
			var num =
					'zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen'.split(
						' ',
					),
				tens =
					'twenty thirty forty fifty sixty seventy eighty ninety'.split(
						' ',
					),
				number2words = (n) => {
					if (n < 20) return num[n];
					var digit = n % 10;
					return n < 100
						? tens[~~(n / 10) - 2] + (digit ? '-' + num[digit] : '')
						: n < 1e3
						? num[~~(n / 100)] +
						  ' hundred' +
						  (n % 100 == 0 ? '' : ' and ' + number2words(n % 100))
						: number2words(~~(n / 1e3)) +
						  ' thousand' +
						  (n % 1e3 != 0 ? ' ' + number2words(n % 1e3) : '');
				};
		},
		'./shared/productResponse.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				XU: () => isGift,
				Xn: () => getSpecificProductTypeFromTier,
				e$: () => sortByJoinDate,
				fi: () => isSixForSix,
				fr: () => getMainPlan,
				l2: () => MDA_TEST_USER_HEADER,
				lj: () => isSpecificProductType,
				q4: () => isPaidSubscriptionPlan,
				tq: () => augmentBillingPeriod,
				v_: () => isProduct,
				wH: () => MembersDataApiAsyncLoader,
			});
			var _sentry_browser__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@sentry/minimal/esm/index.js',
					),
				_client_components_mma_shared_AsyncLoader__WEBPACK_IMPORTED_MODULE_1__ =
					(__webpack_require__('./node_modules/react/index.js'),
					__webpack_require__(
						'./client/components/mma/shared/AsyncLoader.tsx',
					)),
				_productTypes__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__('./shared/productTypes.ts');
			class MembersDataApiAsyncLoader extends _client_components_mma_shared_AsyncLoader__WEBPACK_IMPORTED_MODULE_1__.y {}
			var MDA_TEST_USER_HEADER = 'X-Gu-Membership-Test-User',
				sortByJoinDate = (a, b) => b.joinDate.localeCompare(a.joinDate),
				productTiers = [
					'guardianpatron',
					'Tier Three',
					'Digital Pack',
					'Newspaper - National Delivery',
					'Supporter',
					'Supporter Plus',
					'Guardian Weekly - ROW',
					'Guardian Weekly - Domestic',
					'Newspaper Digital Voucher',
					'Contributor',
					'Guardian Weekly Zone A',
					'Guardian Weekly Zone B',
					'Guardian Weekly Zone C',
					'Newspaper Voucher',
					'Newspaper Delivery',
					'Patron',
					'Partner',
					'Guardian Ad-Lite',
				];
			function isProduct(data) {
				return productTiers.includes(null == data ? void 0 : data.tier);
			}
			var augmentBillingPeriod = (billingPeriod) =>
					'6 weeks' === billingPeriod
						? 'one-off'
						: ''.concat(billingPeriod, 'ly'),
				isSixForSix = (planName) =>
					!!planName && planName.includes('6 for 6');
			function isPaidSubscriptionPlan(subscriptionPlan) {
				return (
					!!subscriptionPlan &&
					(subscriptionPlan.hasOwnProperty('price') ||
						subscriptionPlan.hasOwnProperty('amount'))
				);
			}
			var isGift = (subscription) => 'Gift' === subscription.readerType,
				getMainPlan = (subscription) => {
					var _subscription$plan,
						_subscription$plan2,
						_subscription$plan3;
					return subscription.currentPlans.length > 0
						? (subscription.currentPlans.length > 1 &&
								_sentry_browser__WEBPACK_IMPORTED_MODULE_3__.Tb(
									"User with more than one 'current plan' for a given subscription",
								),
						  subscription.currentPlans[0])
						: subscription.futurePlans.length > 0
						? subscription.futurePlans[0]
						: {
								name: null,
								start: subscription.start,
								shouldBeVisible: !0,
								currency:
									null ===
										(_subscription$plan =
											subscription.plan) ||
									void 0 === _subscription$plan
										? void 0
										: _subscription$plan.currency,
								currencyISO:
									null ===
										(_subscription$plan2 =
											subscription.plan) ||
									void 0 === _subscription$plan2
										? void 0
										: _subscription$plan2.currencyISO,
								billingPeriod:
									null ===
										(_subscription$plan3 =
											subscription.plan) ||
									void 0 === _subscription$plan3
										? void 0
										: _subscription$plan3.billingPeriod,
						  };
				};
			function getSpecificProductTypeFromTier(productTier) {
				var productType = {};
				switch (productTier) {
					case 'Partner':
					case 'Patron':
					case 'Supporter':
						productType =
							_productTypes__WEBPACK_IMPORTED_MODULE_2__.Pm
								.membership;
						break;
					case 'Contributor':
						productType =
							_productTypes__WEBPACK_IMPORTED_MODULE_2__.Pm
								.contributions;
						break;
					case 'Tier Three':
						productType =
							_productTypes__WEBPACK_IMPORTED_MODULE_2__.Pm
								.tierthree;
						break;
					case 'Newspaper Voucher':
						productType =
							_productTypes__WEBPACK_IMPORTED_MODULE_2__.Pm
								.voucher;
						break;
					case 'Digital Pack':
						productType =
							_productTypes__WEBPACK_IMPORTED_MODULE_2__.Pm
								.digipack;
						break;
					case 'Newspaper Delivery':
						productType =
							_productTypes__WEBPACK_IMPORTED_MODULE_2__.Pm
								.homedelivery;
						break;
					case 'Supporter Plus':
						productType =
							_productTypes__WEBPACK_IMPORTED_MODULE_2__.Pm
								.supporterplus;
						break;
					case 'Newspaper Digital Voucher':
						productType =
							_productTypes__WEBPACK_IMPORTED_MODULE_2__.Pm
								.digitalvoucher;
						break;
					case 'Guardian Ad-Lite':
						productType =
							_productTypes__WEBPACK_IMPORTED_MODULE_2__.Pm
								.guardianadlite;
						break;
					case 'guardianpatron':
						productType =
							_productTypes__WEBPACK_IMPORTED_MODULE_2__.Pm
								.guardianpatron;
						break;
					case 'Guardian Weekly Zone A':
					case 'Guardian Weekly Zone B':
					case 'Guardian Weekly Zone C':
					case 'Guardian Weekly - ROW':
					case 'Guardian Weekly - Domestic':
						productType =
							_productTypes__WEBPACK_IMPORTED_MODULE_2__.Pm
								.guardianweekly;
						break;
					case 'Newspaper - National Delivery':
						productType =
							_productTypes__WEBPACK_IMPORTED_MODULE_2__.Pm
								.nationaldelivery;
				}
				return productType;
			}
			function isSpecificProductType(productDetail, targetProductType) {
				return (
					getSpecificProductTypeFromTier(productDetail.tier) ===
					targetProductType
				);
			}
		},
		'./shared/productTypes.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				HP: () => GROUPED_PRODUCT_TYPES,
				Pm: () => PRODUCT_TYPES,
				xm: () => getBillingPeriodAdjective,
				FO: () => holidaySuspensionDeliveryProblem,
			});
			var Stack = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/stack/Stack.js',
				),
				typography = __webpack_require__(
					'./client/styles/typography.ts',
				),
				analytics = __webpack_require__(
					'./client/utilities/analytics.ts',
				),
				Heading = __webpack_require__(
					'./client/components/mma/shared/Heading.tsx',
				),
				cancellationConstants = __webpack_require__(
					'./client/components/mma/cancel/cancellationConstants.ts',
				),
				emotion_react_jsx_runtime_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				),
				utils = __webpack_require__('./client/utilities/utils.ts'),
				GenericSaveBodyResponses = __webpack_require__(
					'./client/components/mma/cancel/GenericSaveBodyResponses.tsx',
				),
				tierThreeCancellationReasons = [
					{
						reasonId: 'mma_editorial',
						linkLabel: 'I am unhappy with Guardian journalism',
						saveBody: [
							'In order to improve our journalism, we’d love to know more about why you are thinking of cancelling.',
						],
						alternateFeedbackIntro: cancellationConstants.Vc,
					},
					{
						reasonId: 'mma_financial_circumstances',
						linkLabel: 'A change in my financial circumstances',
						saveBody: [
							'We understand that financial circumstances can change from time to time.',
							'Making a smaller contribution to the Guardian can be an inexpensive way of keeping journalism open for everyone to read and enjoy. Once you’ve completed your cancellation below, we hope you’ll consider a small one off or recurring contribution in the future.',
						],
						skipFeedback: !0,
					},
					{
						reasonId: 'mma_support_another_way',
						linkLabel:
							'I am going to support The Guardian in another way, eg. by subscribing',
						saveBody: [
							'Thank you for your ongoing support.',
							'Once you’ve completed your cancellation below, you can set up a new product via our online checkouts.',
						],
						skipFeedback: !0,
					},
					{
						reasonId: 'mma_health',
						linkLabel: 'Ill-health',
						saveBody: [
							'Thank you for your ongoing support.',
							'Your subscription has ensured that our quality journalism remains open for everyone to read and enjoy.',
							'Please confirm your cancellation below.',
						],
						skipFeedback: !0,
					},
					{
						reasonId: 'mma_break_from_news',
						linkLabel: 'I am taking a break from news',
						saveBody: GenericSaveBodyResponses.HK,
						escalationSaveBody: [
							'We’d love to know more about what we could do better to help provide inspiring and trustworthy news.',
						],
					},
					{
						reasonId: 'mma_values',
						linkLabel:
							'I don’t feel that The Guardian values my support',
						alternateFeedbackIntro: cancellationConstants.bt,
					},
					{
						reasonId: 'mma_time',
						linkLabel: "I don't have time to use my subscription",
						alternateFeedbackIntro: cancellationConstants.bt,
					},
					{
						reasonId: 'mma_better_offer',
						linkLabel:
							"I've found a better offer with another publisher",
						alternateFeedbackIntro: cancellationConstants.bt,
					},
					{
						reasonId: 'mma_value_for_money',
						linkLabel: "I wasn't getting value for money",
						alternateFeedbackIntro: cancellationConstants.bt,
					},
					{
						reasonId: 'mma_covid',
						linkLabel:
							'My subscription use is disrupted due to COVID-19',
						alternateFeedbackIntro: cancellationConstants.bt,
					},
					{
						reasonId: 'mma_delivery_issue',
						linkLabel: 'I’ve had repeated delivery issues',
						alternateFeedbackIntro: cancellationConstants.bt,
					},
					{
						reasonId: 'mma_autorenew',
						linkLabel: 'I don’t want an auto-renewing subscription',
						skipFeedback: !0,
					},
				],
				otherCancellationReason = [
					{
						reasonId: 'mma_other',
						linkLabel: 'None of the above',
						saveTitle: 'Other',
						alternateFeedbackIntro: cancellationConstants.bt,
					},
				],
				shuffledTierThreeCancellationReasons = [
					...(0, utils.Sy)(tierThreeCancellationReasons),
					...otherCancellationReason,
				],
				currencyIso = __webpack_require__(
					'./client/utilities/currencyIso.ts',
				),
				contributionsCancellationFlowStart = () =>
					(0, emotion_react_jsx_runtime_browser_esm.BX)(Stack.K, {
						space: 4,
						children: [
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								Heading.X,
								{
									cssOverrides: typography.L.heading,
									children: 'We’re sorry to see you go …',
								},
							),
							(0, emotion_react_jsx_runtime_browser_esm.BX)('p', {
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'strong',
										{
											children:
												'… please could you take a moment to tell us why you would like to cancel today?',
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'br',
										{},
									),
									'As a reader-funded organisation, we rely on the generous support from those who are in a position to pay for news. And, we welcome your feedback.',
								],
							}),
						],
					}),
				ContributionsCancellationReasons = __webpack_require__(
					'./client/components/mma/cancel/contributions/ContributionsCancellationReasons.tsx',
				),
				digipackCancellationReasons = [
					{
						reasonId: 'mma_editorial',
						linkLabel: 'I am unhappy with Guardian journalism',
						saveBody: [
							'In order to improve our journalism, we’d love to know more about why you are thinking of cancelling.',
						],
						alternateFeedbackIntro: cancellationConstants.Vc,
					},
					{
						reasonId: 'mma_financial_circumstances',
						linkLabel: 'A change in my financial circumstances',
						saveBody: [
							'We understand that financial circumstances can change from time to time.',
							'Making a smaller contribution to the Guardian can be an inexpensive way of keeping journalism open for everyone to read and enjoy. Once you’ve completed your cancellation below, we hope you’ll consider a small one off or recurring contribution in the future.',
						],
						skipFeedback: !0,
					},
					{
						reasonId: 'mma_support_another_way',
						linkLabel:
							'I am going to support The Guardian in another way, eg. by subscribing',
						saveBody: [
							'Thank you for your ongoing support.',
							'Once you’ve completed your cancellation below, you can set up a new product via our online checkouts.',
						],
						skipFeedback: !0,
					},
					{
						reasonId: 'mma_health',
						linkLabel: 'Ill-health',
						saveBody: [
							'Thank you for your ongoing support.',
							'Your subscription has ensured that our quality journalism remains open for everyone to read and enjoy.',
							'Please confirm your cancellation below.',
						],
						skipFeedback: !0,
					},
					{
						reasonId: 'mma_break_from_news',
						linkLabel: 'I am taking a break from news',
						saveBody: GenericSaveBodyResponses.Q1,
						alternateFeedbackIntro:
							'Alternatively we’d love to know more about what we could do better to help provide inspiring and trustworthy news.',
					},
					{
						reasonId: 'mma_values',
						linkLabel:
							'I don’t feel that The Guardian values my support',
						alternateFeedbackIntro: cancellationConstants.bt,
					},
					{
						reasonId: 'mma_benefits',
						linkLabel:
							'None of the subscription benefits are of interest to me',
						alternateFeedbackIntro: cancellationConstants.bt,
					},
					{
						reasonId: 'mma_time',
						linkLabel: "I don't have time to use my subscription",
						alternateFeedbackIntro: cancellationConstants.bt,
					},
					{
						reasonId: 'mma_better_offer',
						linkLabel:
							"I've found a better offer with another publisher",
						alternateFeedbackIntro: cancellationConstants.bt,
					},
					{
						reasonId: 'mma_value_for_money',
						linkLabel: "I wasn't getting value for money",
						alternateFeedbackIntro: cancellationConstants.bt,
					},
					{
						reasonId: 'mma_issue',
						linkLabel:
							'I’ve been experiencing technical or service problems',
						alternateFeedbackIntro: cancellationConstants.bt,
					},
				],
				DigipackCancellationReasons_otherCancellationReason = [
					{
						reasonId: 'mma_other',
						linkLabel: 'None of the above',
						saveTitle: 'Other',
						alternateFeedbackIntro: cancellationConstants.bt,
					},
				],
				shuffledDigipackCancellationReasons = [
					...(0, utils.Sy)(digipackCancellationReasons),
					...DigipackCancellationReasons_otherCancellationReason,
				],
				GwCancellationReasons = __webpack_require__(
					'./client/components/mma/cancel/gw/GwCancellationReasons.tsx',
				),
				emotion_react_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
				),
				palette = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
				),
				WithStandardTopMargin = __webpack_require__(
					'./client/components/shared/WithStandardTopMargin.tsx',
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
			var cssBullet = function () {
					var flexBasis =
						arguments.length > 0 && void 0 !== arguments[0]
							? arguments[0]
							: '50%';
					return (0, emotion_react_browser_esm.iv)(
						{
							flexBasis,
							flexGrow: 1,
							listStyle: 'none',
							listStylePosition: 'inside',
							textIndent: '-0.6em',
							paddingLeft: '20px',
							'&::before': {
								display: 'inline-block',
								content: "'●'",
								marginRight: '0.6em',
							},
						},
						'',
						'',
					);
				},
				benefitsCss = { name: '1xclg2i', styles: 'margin:0;padding:0' },
				clickHereToFindOutMoreAboutOurNewFeatures = (0,
				emotion_react_jsx_runtime_browser_esm.tZ)('a', {
					css: cancellationConstants.SH,
					href: 'https://www.theguardian.com/help/insideguardian/2018/may/15/introducing-live-and-discover-to-the-premium-tier-of-the-guardian-app',
					onClick: () => {
						(0, analytics.L9)({
							eventCategory: 'href',
							eventAction: 'premium_features',
						});
					},
					children:
						'click here to find out about our brand new features',
				}),
				_ref = {
					name: 'w4bq3t',
					styles: 'margin-top:0;margin-bottom:10px',
				},
				_ref2 = {
					name: '76andl',
					styles: 'font-size:1rem;font-weight:500',
				},
				membershipCancellationReasons = [
					{
						reasonId: 'mma_financial_circumstances',
						linkLabel: 'A change in my financial circumstances',
						saveTitle:
							'We understand that financial circumstances can change from time to time',
						saveBody: [
							'Making a smaller contribution to the Guardian can be an inexpensive way of keeping journalism open for everyone to read and enjoy. There are a number of flexible ways to support us and one of our customer service specialist would be happy to hear from you.',
						],
					},
					{
						reasonId: 'mma_payment_issue',
						linkLabel:
							"I didn't expect The Guardian to take another payment",
						saveTitle:
							'We are sorry that you have been charged again',
						saveBody: GenericSaveBodyResponses.mX,
						alternateFeedbackIntro: '',
					},
					{
						reasonId: 'mma_editorial',
						linkLabel: 'I am unhappy with Guardian journalism',
						saveTitle:
							'In order to improve our journalism, we’d love to know more about why you are thinking of cancelling',
						saveBody: [
							'If there’s anything we can do differently please take a moment to contact our customer services team we would be happy to hear from you.',
						],
					},
					{
						reasonId: 'mma_benefits',
						linkLabel:
							'None of the membership benefits are of interest to me',
						saveTitle:
							'In order to improve our membership programme, we’d love to know more about why you are thinking of cancelling',
						saveBody: [
							'If there’s anything we can do differently please take a moment to give us some feedback',
						],
					},
					{
						reasonId: 'mma_support_another_way',
						linkLabel:
							'I am going to support The Guardian in another way, eg. by subscribing',
						saveTitle: 'Thank you for your ongoing support.',
						saveBody: [
							'Please confirm your membership cancellation below.',
						],
						alternateCallUsPrefix:
							'If you’re not sure what’s best for you or would like help, to contact us',
						alternateFeedbackIntro:
							"Alternatively if you'd like to give us feedback, please enter in the box the below.",
					},
					{
						reasonId: 'mma_health',
						linkLabel: 'Ill-health',
						saveTitle: 'Thank you so much for your support.',
						saveBody: [
							'Your contribution has ensured that our quality journalism remains open for everyone to read and enjoy. Please confirm your cancellation below.',
						],
						skipFeedback: !0,
						hideContactUs: !0,
					},
					{
						reasonId: 'mma_break_from_news',
						linkLabel: 'I am taking a break from news',
						saveTitle:
							'We understand that sometimes the news cycle can feel a little overwhelming.',
						saveBody: GenericSaveBodyResponses._5,
					},
					{
						reasonId: 'mma_values',
						linkLabel:
							"I don't feel that the Guardian values my support",
						saveTitle:
							'In order to improve our membership programme, we’d love to know more about why you are thinking of cancelling',
						saveBody: [
							'If there’s anything we can do differently please take a moment to give us some feedback',
						],
					},
				],
				shuffledMembershipCancellationReasons = [
					...(0, utils.Sy)(membershipCancellationReasons),
					{
						reasonId: 'mma_other',
						linkLabel: 'Other',
						saveTitle:
							'In order to improve our membership programme, we’d love to know more about why you are thinking of cancelling',
						saveBody: [
							'If there’s anything we can do differently please take a moment to give us some feedback',
						],
					},
				],
				dates = __webpack_require__('./shared/dates.ts'),
				productResponse = __webpack_require__(
					'./shared/productResponse.ts',
				),
				AsyncLoader = __webpack_require__(
					'./client/components/mma/shared/AsyncLoader.tsx',
				),
				cancellationContexts = __webpack_require__(
					'./client/components/mma/cancel/cancellationContexts.tsx',
				);
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
			class OutstandingHolidayStopsAsyncLoader extends AsyncLoader.y {}
			var getOutstandingCreditsFetcher = (
					productDetail,
					productType,
					cancellationPolicy,
				) =>
					_asyncToGenerator(function* () {
						var _productType$delivery,
							effectiveCancellationDate =
								productDetail.subscription.chargedThroughDate &&
								cancellationPolicy !== cancellationContexts.I6
									? (0, dates.sG)(
											productDetail.subscription
												.chargedThroughDate,
									  )
									: (0, dates.sG)(),
							outstandingHolidayStopsPromise = fetch(
								'/api/holidays/'
									.concat(
										productDetail.subscription
											.subscriptionId,
										'/cancel?effectiveCancellationDate=',
									)
									.concat(
										effectiveCancellationDate.dateStr(
											dates.U5,
										),
									),
								{
									headers: {
										[productResponse.l2]: ''.concat(
											productDetail.isTestUser,
										),
									},
								},
							),
							optionalOutstandingDeliveryProblemCreditsPromise =
								(null ===
									(_productType$delivery =
										productType.delivery) ||
								void 0 === _productType$delivery
									? void 0
									: _productType$delivery.records) &&
								fetch(
									'/api/delivery-records/'
										.concat(
											productDetail.subscription
												.subscriptionId,
											'/cancel?effectiveCancellationDate=',
										)
										.concat(
											effectiveCancellationDate.dateStr(
												dates.U5,
											),
										),
									{
										headers: {
											[productResponse.l2]: ''.concat(
												productDetail.isTestUser,
											),
										},
									},
								);
						return Promise.all([
							outstandingHolidayStopsPromise,
							...(optionalOutstandingDeliveryProblemCreditsPromise
								? [
										optionalOutstandingDeliveryProblemCreditsPromise,
								  ]
								: []),
						]);
					}),
				getContextualRestOfFlowRenderer = (restOfFlow) => (_ref2) => {
					var [
						outstandingHolidayStops,
						outstandingDeliveryProblemCredits,
					] = _ref2;
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						cancellationContexts.xr.Provider,
						{
							value: {
								holidayStops:
									outstandingHolidayStops.publicationsToRefund,
								deliveryCredits:
									null == outstandingDeliveryProblemCredits
										? void 0
										: outstandingDeliveryProblemCredits.results,
							},
							children: restOfFlow,
						},
					);
				},
				physicalSubsCancellationFlowWrapper =
					(productDetail, productType) => (restOfFlow) =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							cancellationContexts.Dd.Consumer,
							{
								children: (cancellationPolicy) =>
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										OutstandingHolidayStopsAsyncLoader,
										{
											fetch: getOutstandingCreditsFetcher(
												productDetail,
												productType,
												cancellationPolicy,
											),
											render: getContextualRestOfFlowRenderer(
												restOfFlow,
											),
											loadingMessage:
												'Checking for outstanding credits owed to you...',
										},
									),
							},
						),
				SupporterplusCancellationReasons = __webpack_require__(
					'./client/components/mma/cancel/supporterplus/SupporterplusCancellationReasons.tsx',
				),
				VoucherCancellationFlowStart_trackCancellationClickEvent =
					(eventLabel) => () =>
						(0, analytics.L9)({
							eventCategory: 'cancellation',
							eventAction: 'click',
							eventLabel,
						}),
				voucherCancellationFlowStart = (_ref) => {
					var _mainPlan$name,
						{ subscription } = _ref,
						mainPlan = (0, productResponse.fr)(subscription);
					if (!mainPlan)
						throw new Error(
							'mainPlan does not exist in voucherCancellationFlowStart',
						);
					var isEligibleForFreeDigipackAccess =
						null === (_mainPlan$name = mainPlan.name) ||
						void 0 === _mainPlan$name
							? void 0
							: _mainPlan$name.includes('plus Digi');
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						Stack.K,
						{
							space: 4,
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									Heading.X,
									{
										cssOverrides: typography.L.heading,
										children:
											'We’re sorry to hear you’re thinking of cancelling your voucher subscription',
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'p',
									{
										children: [
											'You can also opt for home delivery. Sign up to a free trial with',
											' ',
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'a',
												{
													css: cancellationConstants.SH,
													href: 'http://www.delivermynewspaper.com',
													onClick:
														VoucherCancellationFlowStart_trackCancellationClickEvent(
															'delivery_my_newspaper',
														),
													children:
														'Deliver My Newspaper',
												},
											),
											' ',
											'and they will provide you with delivery vouchers, which you can use in combination with your newspaper vouchers to arrange a delivery service. You can also arrange delivery with your newsagent independently, if you wish.',
										],
									},
								),
								isEligibleForFreeDigipackAccess &&
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'p',
										{
											children: [
												'We have also made our digital subscription temporarily available to all readers that hold a voucher subscription. This means you can enjoy ad-free reading, and two innovative Guardian apps -',
												' ',
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'a',
													{
														css: cancellationConstants.SH,
														href: 'https://www.theguardian.com/membership/2019/dec/07/guardian-daily-app-launch-new-edition',
														onClick:
															VoucherCancellationFlowStart_trackCancellationClickEvent(
																'the_guardian_daily',
															),
														children:
															'The Guardian Daily',
													},
												),
												' ',
												'and premium access to',
												' ',
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'a',
													{
														css: cancellationConstants.SH,
														href: 'https://www.theguardian.com/technology/ng-interactive/2018/may/15/the-guardian-app',
														onClick:
															VoucherCancellationFlowStart_trackCancellationClickEvent(
																'the_guardian_live_app',
															),
														children:
															'The Guardian Live',
													},
												),
												'. Your access is already granted with the email you are subscribed with, all you need to do is download from the app store and sign in to enjoy.',
											],
										},
									),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'p',
									{
										children:
											'Please could you take a moment to tell us why you want to cancel?',
									},
								),
							],
						},
					);
				};
			try {
				(voucherCancellationFlowStart.displayName =
					'voucherCancellationFlowStart'),
					(voucherCancellationFlowStart.__docgenInfo = {
						description: '',
						displayName: 'voucherCancellationFlowStart',
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
							'client/components/mma/cancel/voucher/VoucherCancellationFlowStart.tsx#voucherCancellationFlowStart'
						] = {
							docgenInfo:
								voucherCancellationFlowStart.__docgenInfo,
							name: 'voucherCancellationFlowStart',
							path: 'client/components/mma/cancel/voucher/VoucherCancellationFlowStart.tsx#voucherCancellationFlowStart',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var voucherCancellationReasons = [
					{
						reasonId: 'mma_editorial',
						linkLabel: 'I am unhappy with Guardian journalism',
						saveBody: [
							'In order to improve our journalism, we’d love to know more about why you are thinking of cancelling.',
						],
						alternateFeedbackIntro: cancellationConstants.Vc,
					},
					{
						reasonId: 'mma_financial_circumstances',
						linkLabel: 'A change in my financial circumstances',
						saveBody: [
							'We understand that financial circumstances can change from time to time.',
							'Making a smaller contribution to the Guardian can be an inexpensive way of keeping journalism open for everyone to read and enjoy. Once you’ve completed your cancellation below, we hope you’ll consider a small one off or recurring contribution in the future.',
						],
						skipFeedback: !0,
					},
					{
						reasonId: 'mma_support_another_way',
						linkLabel:
							'I am going to support The Guardian in another way, eg. by subscribing',
						saveBody: [
							'Thank you for your ongoing support.',
							'Once you’ve completed your cancellation below, you can set up a new product via our online checkouts.',
						],
						skipFeedback: !0,
					},
					{
						reasonId: 'mma_health',
						linkLabel: 'Ill-health',
						saveBody: [
							'Thank you for your ongoing support.',
							'Your subscription has ensured that our quality journalism remains open for everyone to read and enjoy.',
							'Please confirm your cancellation below.',
						],
						skipFeedback: !0,
					},
					{
						reasonId: 'mma_break_from_news',
						linkLabel: 'I am taking a break from news',
						saveBody: GenericSaveBodyResponses.HK,
						escalationSaveBody: [
							'We’d love to know more about what we could do better to help provide inspiring and trustworthy news.',
						],
					},
					{
						reasonId: 'mma_values',
						linkLabel:
							'I don’t feel that The Guardian values my support',
						alternateFeedbackIntro: cancellationConstants.bt,
					},
					{
						reasonId: 'mma_time',
						linkLabel: "I don't have time to use my subscription",
						alternateFeedbackIntro: cancellationConstants.bt,
					},
					{
						reasonId: 'mma_better_offer',
						linkLabel:
							"I've found a better offer with another publisher",
						alternateFeedbackIntro: cancellationConstants.bt,
					},
					{
						reasonId: 'mma_value_for_money',
						linkLabel: "I wasn't getting value for money",
						alternateFeedbackIntro: cancellationConstants.bt,
					},
					{
						reasonId: 'mma_covid',
						linkLabel:
							'My subscription use is disrupted due to COVID-19',
						alternateFeedbackIntro: cancellationConstants.bt,
					},
					{
						reasonId: 'mma_delivery_issue',
						linkLabel: 'I’ve had repeated delivery issues',
						alternateFeedbackIntro: cancellationConstants.bt,
					},
					{
						reasonId: 'mma_redemption_issue',
						linkLabel: 'I’ve had problems redeeming my vouchers',
						alternateFeedbackIntro: cancellationConstants.bt,
					},
				],
				VoucherCancellationReasons_otherCancellationReason = [
					{
						reasonId: 'mma_other',
						linkLabel: 'None of the above',
						saveTitle: 'Other',
						alternateFeedbackIntro: cancellationConstants.bt,
					},
				],
				shuffledVoucherCancellationReasons = [
					...(0, utils.Sy)(voucherCancellationReasons),
					...VoucherCancellationReasons_otherCancellationReason,
				],
				softOptInIDs = __webpack_require__('./shared/softOptInIDs.ts');
			function productTypes_ownKeys(e, r) {
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
			function productTypes_objectSpread(e) {
				for (var r = 1; r < arguments.length; r++) {
					var t = null != arguments[r] ? arguments[r] : {};
					r % 2
						? productTypes_ownKeys(Object(t), !0).forEach(function (
								r,
						  ) {
								productTypes_defineProperty(e, r, t[r]);
						  })
						: Object.getOwnPropertyDescriptors
						? Object.defineProperties(
								e,
								Object.getOwnPropertyDescriptors(t),
						  )
						: productTypes_ownKeys(Object(t)).forEach(function (r) {
								Object.defineProperty(
									e,
									r,
									Object.getOwnPropertyDescriptor(t, r),
								);
						  });
				}
				return e;
			}
			function productTypes_defineProperty(obj, key, value) {
				return (
					(key = (function productTypes_toPropertyKey(arg) {
						var key = (function productTypes_toPrimitive(
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
			var holidaySuspensionDeliveryProblem = {
					label: 'Delivered despite suspension',
					messageIsMandatory: !1,
				},
				commonDeliveryProblemTypes = [
					{ label: 'Damaged Paper', messageIsMandatory: !0 },
					{ label: 'No Delivery', messageIsMandatory: !1 },
					{ label: 'Other', messageIsMandatory: !0 },
				],
				showDeliveryAddressCheck = (subscription) =>
					!(0, productResponse.XU)(subscription) &&
					!!subscription.deliveryAddress,
				calculateProductTitle = (baseProductTitle) => (mainPlan) =>
					baseProductTitle +
					(null != mainPlan && mainPlan.name
						? ' - '.concat(mainPlan.name)
						: '');
			function getBillingPeriodAdjective(billingPeriod) {
				if ('month' === billingPeriod) return 'Monthly';
				if ('year' === billingPeriod) return 'Annual';
				if ('quarter' === billingPeriod) return 'Quarterly';
				throw new Error('No billing period for subscription');
			}
			var PRODUCT_TYPES = {
					membership: {
						productTitle: () => 'Guardian Membership',
						friendlyName: 'Membership',
						productType: 'membership',
						groupedProductType: 'membership',
						allProductsProductTypeFilterString: 'Membership',
						urlPart: 'membership',
						getOphanProductType: (productDetail) => {
							switch (productDetail.tier) {
								case 'Supporter':
									return 'MEMBERSHIP_SUPPORTER';
								case 'Partner':
									return 'MEMBERSHIP_PARTNER';
								case 'Patron':
									return 'MEMBERSHIP_PATRON';
							}
						},
						cancellation: {
							reasons: shuffledMembershipCancellationReasons,
							sfCaseProduct: 'Membership',
							startPageBody: () =>
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									emotion_react_jsx_runtime_browser_esm.HY,
									{
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'div',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														{
															backgroundColor:
																palette.palette
																	.neutral[93],
															padding:
																'10px 20px',
															marginBottom:
																'40px',
														},
														'',
														'',
													),
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'h4',
															{
																css: _ref,
																children:
																	'If you cancel your Membership you will miss out on:',
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															'ul',
															{
																css: benefitsCss,
																children: [
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'li',
																		{
																			css: cssBullet(),
																			children:
																				'Access to events tickets',
																		},
																	),
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'li',
																		{
																			css: cssBullet(),
																			children:
																				'Exclusive emails from our membership editor',
																		},
																	),
																	(0,
																	emotion_react_jsx_runtime_browser_esm.BX)(
																		'li',
																		{
																			css: (0,
																			emotion_react_browser_esm.iv)(
																				_objectSpread(
																					_objectSpread(
																						{},
																						cssBullet(
																							'100%',
																						),
																					),
																					{},
																					{
																						paddingTop:
																							'5px',
																					},
																				),
																				'',
																				'',
																			),
																			children:
																				[
																					'Free access to the premium tier of the Guardian app -',
																					' ',
																					clickHereToFindOutMoreAboutOurNewFeatures,
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
												WithStandardTopMargin.z,
												{
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'p',
															{
																css: _ref2,
																children:
																	'Your support means we can remain independent, open to all readers and empowered to hold those in power to account.',
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															'p',
															{
																children: [
																	'Sorry to hear you are thinking of cancelling your membership.',
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'br',
																		{},
																	),
																	'Can you take a moment to tell us why?',
																],
															},
														),
													],
												},
											),
										],
									},
								),
							hideReasonTitlePrefix: !0,
							summaryReasonSpecificPara: () => {},
							onlyShowSupportSectionIfAlternateText: !1,
							alternateSupportButtonText: () => {},
							alternateSupportButtonUrlSuffix: () => {},
						},
						cancelledCopy:
							'Your membership has been cancelled. You will continue to receive the benefits of your membership until',
						tierLabel: 'Membership tier',
						shouldShowJoinDateNotStartDate: !0,
						softOptInIDs: [
							softOptInIDs.Y.SupportOnboarding,
							softOptInIDs.Y.SupporterNewsletter,
						],
					},
					contributions: {
						productTitle: (mainPlan) =>
							mainPlan
								? ''.concat(
										getBillingPeriodAdjective(
											mainPlan.billingPeriod,
										),
										' contribution',
								  )
								: 'Recurring contribution',
						friendlyName: 'recurring contribution',
						productType: 'contributions',
						groupedProductType: 'recurringSupport',
						allProductsProductTypeFilterString: 'Contribution',
						urlPart: 'contributions',
						getOphanProductType: () => 'RECURRING_CONTRIBUTION',
						updateAmountMdaEndpoint: 'contribution-update-amount',
						softOptInIDs: [
							softOptInIDs.Y.SupportOnboarding,
							softOptInIDs.Y.SupporterNewsletter,
						],
						cancellation: {
							alternateSummaryMainPara:
								'This is immediate and you will not be charged again.',
							reasons: ContributionsCancellationReasons.zx,
							sfCaseProduct: 'Recurring - Contributions',
							startPageBody: contributionsCancellationFlowStart,
							shouldHideSummaryMainPara: !0,
							summaryReasonSpecificPara: (reasonId) => {
								switch (reasonId) {
									case 'mma_financial_circumstances':
									case 'mma_value_for_money':
										return 'You can support The Guardian’s independent journalism with a One-time contribution, from as little as £1 – and it only takes a minute.';
									default:
										return;
								}
							},
							onlyShowSupportSectionIfAlternateText: !0,
							alternateSupportButtonText: (reasonId) => {
								switch (reasonId) {
									case 'mma_financial_circumstances':
									case 'mma_value_for_money':
										return 'Make a One-time contribution';
									default:
										return;
								}
							},
							alternateSupportButtonUrlSuffix: () => {},
							swapFeedbackAndContactUs: !0,
							shouldHideThrasher: !0,
							shouldShowReminder: !0,
						},
					},
					newspaper: {
						productTitle: calculateProductTitle(
							'Newspaper subscription',
						),
						friendlyName: 'newspaper subscription',
						productType: 'newspaper',
						groupedProductType: 'subscriptions',
						allProductsProductTypeFilterString: 'Paper',
						urlPart: 'paper',
						getOphanProductType: () => 'PRINT_SUBSCRIPTION',
						productPageNewsletterIDs: ['6009'],
						delivery: {
							showAddress: showDeliveryAddressCheck,
							enableDeliveryInstructionsUpdate: !0,
						},
						softOptInIDs: [
							softOptInIDs.Y.SupportOnboarding,
							softOptInIDs.Y.SubscriberPreview,
							softOptInIDs.Y.SupporterNewsletter,
						],
					},
					homedelivery: {
						productTitle:
							calculateProductTitle('Newspaper Delivery'),
						friendlyName: 'newspaper home delivery subscription',
						shortFriendlyName: 'newspaper home delivery',
						productType: 'homedelivery',
						groupedProductType: 'subscriptions',
						allProductsProductTypeFilterString: 'HomeDelivery',
						urlPart: 'homedelivery',
						getOphanProductType: () => 'PRINT_SUBSCRIPTION',
						productPageNewsletterIDs: ['6009'],
						softOptInIDs: [
							softOptInIDs.Y.SupportOnboarding,
							softOptInIDs.Y.SubscriberPreview,
							softOptInIDs.Y.SupporterNewsletter,
						],
						holidayStops: { issueKeyword: 'paper' },
						delivery: {
							showAddress: showDeliveryAddressCheck,
							enableDeliveryInstructionsUpdate: !0,
							records: {
								productNameForProblemReport: 'Home Delivery',
								showDeliveryInstructions: !0,
								numberOfProblemRecordsToShow: 14,
								contactUserOnExistingProblemReport: !0,
								availableProblemTypes: [
									{
										label: 'Instructions Not Followed',
										messageIsMandatory: !0,
									},
									...commonDeliveryProblemTypes,
								],
							},
						},
						fulfilmentDateCalculator: {
							productFilenamePart: 'Newspaper - Home Delivery',
						},
					},
					nationaldelivery: {
						productTitle:
							calculateProductTitle('Newspaper Delivery'),
						friendlyName: 'newspaper home delivery subscription',
						shortFriendlyName: 'newspaper home delivery',
						productType: 'nationaldelivery',
						groupedProductType: 'subscriptions',
						allProductsProductTypeFilterString: 'HomeDelivery',
						urlPart: 'nationaldelivery',
						getOphanProductType: () => 'PRINT_SUBSCRIPTION',
						productPageNewsletterIDs: ['6009'],
						softOptInIDs: [
							softOptInIDs.Y.SupportOnboarding,
							softOptInIDs.Y.SubscriberPreview,
							softOptInIDs.Y.SupporterNewsletter,
						],
						holidayStops: { issueKeyword: 'paper' },
						delivery: {
							showAddress: showDeliveryAddressCheck,
							enableDeliveryInstructionsUpdate: !0,
							records: {
								productNameForProblemReport:
									'National Delivery',
								showDeliveryInstructions: !0,
								numberOfProblemRecordsToShow: 14,
								contactUserOnExistingProblemReport: !0,
								availableProblemTypes: [
									{
										label: 'Instructions Not Followed',
										messageIsMandatory: !0,
									},
									...commonDeliveryProblemTypes,
								],
							},
						},
						fulfilmentDateCalculator: {
							productFilenamePart:
								'Newspaper - National Delivery',
						},
					},
					voucher: {
						productTitle:
							calculateProductTitle('Newspaper Voucher'),
						friendlyName: 'newspaper voucher subscription',
						shortFriendlyName: 'newspaper voucher booklet',
						productType: 'voucher',
						groupedProductType: 'subscriptions',
						allProductsProductTypeFilterString: 'Voucher',
						urlPart: 'voucher',
						getOphanProductType: () => 'PRINT_SUBSCRIPTION',
						productPageNewsletterIDs: ['6009'],
						softOptInIDs: [
							softOptInIDs.Y.SupportOnboarding,
							softOptInIDs.Y.SubscriberPreview,
							softOptInIDs.Y.SupporterNewsletter,
						],
						holidayStops: {
							issueKeyword: 'voucher',
							alternateNoticeString: "one day's notice",
							additionalHowAdvice:
								'Please discard suspended vouchers before the voucher dates. Please note that historical suspensions may not appear here.',
							hideDeliveryRedirectionHelpBullet: !0,
							explicitConfirmationRequired: {
								checkboxLabel:
									'I confirm that I will destroy suspended vouchers.',
								explainerModalTitle: 'Destroying your vouchers',
								explainerModalBody:
									'We monitor voucher usage and reserve the right to cancel credits where vouchers have been used during the suspension period.',
							},
						},
						delivery: {
							showAddress: showDeliveryAddressCheck,
							enableDeliveryInstructionsUpdate: !0,
						},
						cancellation: {
							reasons: shuffledVoucherCancellationReasons,
							sfCaseProduct: 'Voucher Subscriptions',
							checkForOutstandingCredits: !0,
							flowWrapper: physicalSubsCancellationFlowWrapper,
							startPageBody: voucherCancellationFlowStart,
							startPageOfferEffectiveDateOptions: !0,
							summaryReasonSpecificPara: () => {},
							onlyShowSupportSectionIfAlternateText: !1,
							alternateSupportButtonText: () => {},
							alternateSupportButtonUrlSuffix: () => {},
							swapFeedbackAndContactUs: !0,
						},
					},
					digitalvoucher: {
						productTitle: calculateProductTitle(
							'Newspaper Subscription Card',
						),
						friendlyName: 'newspaper subscription card',
						productType: 'digitalvoucher',
						groupedProductType: 'subscriptions',
						allProductsProductTypeFilterString: 'DigitalVoucher',
						urlPart: 'subscriptioncard',
						legacyUrlPart: 'digitalvoucher',
						getOphanProductType: () => 'PRINT_SUBSCRIPTION',
						productPageNewsletterIDs: ['6009'],
						softOptInIDs: [
							softOptInIDs.Y.SupportOnboarding,
							softOptInIDs.Y.SubscriberPreview,
							softOptInIDs.Y.SupporterNewsletter,
						],
						holidayStops: {
							issueKeyword: 'issue',
							alternateNoticeString: "one day's notice",
							additionalHowAdvice:
								'Please note you will not be able to redeem your paper on any days that you have a suspension in place.',
							hideDeliveryRedirectionHelpBullet: !0,
						},
						delivery: { showAddress: showDeliveryAddressCheck },
					},
					guardianweekly: {
						productTitle: () => 'Guardian Weekly',
						friendlyName: 'Guardian Weekly subscription',
						shortFriendlyName: 'Guardian Weekly',
						productType: 'guardianweekly',
						groupedProductType: 'subscriptions',
						allProductsProductTypeFilterString: 'Weekly',
						urlPart: 'guardianweekly',
						softOptInIDs: [
							softOptInIDs.Y.SupportOnboarding,
							softOptInIDs.Y.GuardianWeeklyNewsletter,
						],
						getOphanProductType: () => 'PRINT_SUBSCRIPTION',
						renewalMetadata: {
							alternateButtonText: 'Subscribe here',
							urlSuffix: 'subscribe/weekly',
							supportReferer: 'gw_renewal',
						},
						holidayStops: { issueKeyword: 'issue' },
						delivery: {
							showAddress: showDeliveryAddressCheck,
							enableDeliveryInstructionsUpdate: !1,
							records: {
								productNameForProblemReport: 'Guardian Weekly',
								numberOfProblemRecordsToShow: 4,
								contactUserOnExistingProblemReport: !1,
								availableProblemTypes:
									commonDeliveryProblemTypes,
							},
						},
						cancellation: {
							reasons: GwCancellationReasons.$x,
							sfCaseProduct: 'Guardian Weekly',
							checkForOutstandingCredits: !0,
							flowWrapper: physicalSubsCancellationFlowWrapper,
							startPageBody: () => {
								return (0,
								emotion_react_jsx_runtime_browser_esm.BX)(
									Stack.K,
									{
										space: 4,
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												Heading.X,
												{
													cssOverrides:
														typography.L.heading,
													children:
														'We’re sorry to hear you’re thinking of cancelling your Guardian Weekly subscription',
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'p',
												{
													children:
														'Your support means The Guardian can remain editorially independent, free from the influence of billionaire owners and politicians. This enables us to give a voice to the voiceless, challenge the powerful and hold them to account. The support from our readers helps us to keep our journalism free of a paywall, so it’s open and accessible to all.',
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'p',
												{
													children: [
														'If you’re looking to take a break, it’s possible to take a suspension from your subscription. You can suspend up to 6 issues per year. This pauses delivery and you will receive the money for any suspended issues off your next bill.',
														' ',
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'a',
															{
																css: cancellationConstants.SH,
																href: '/suspend/guardianweekly',
																onClick:
																	((eventLabel =
																		'gw_holiday_suspension'),
																	() =>
																		(0,
																		analytics.L9)(
																			{
																				eventCategory:
																					'cancellation',
																				eventAction:
																					'click',
																				eventLabel,
																			},
																		)),
																children:
																	'Suspend your subscription here',
															},
														),
														'.',
													],
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'p',
												{
													children:
														'Please could you take a moment to tell us why you want to cancel?',
												},
											),
										],
									},
								);
								var eventLabel;
							},
							startPageOfferEffectiveDateOptions: !0,
							summaryReasonSpecificPara: () => {},
							onlyShowSupportSectionIfAlternateText: !1,
							alternateSupportButtonText: () => {},
							alternateSupportButtonUrlSuffix: () => {},
							swapFeedbackAndContactUs: !0,
						},
						fulfilmentDateCalculator: {
							productFilenamePart: 'Guardian Weekly',
							explicitSingleDayOfWeek: 'Friday',
						},
					},
					tierthree: {
						productTitle: () => 'Digital + Print',
						friendlyName: 'digital + print subscription',
						productType: 'tierthree',
						groupedProductType: 'recurringSupportWithBenefits',
						allProductsProductTypeFilterString: 'TierThree',
						urlPart: 'digital+print',
						softOptInIDs: [
							softOptInIDs.Y.SupportOnboarding,
							softOptInIDs.Y.SupporterNewsletter,
							softOptInIDs.Y.DigitalSubscriberPreview,
							softOptInIDs.Y.GuardianWeeklyNewsletter,
						],
						getOphanProductType: () => 'PRINT_SUBSCRIPTION',
						holidayStops: { issueKeyword: 'issue' },
						delivery: {
							showAddress: showDeliveryAddressCheck,
							enableDeliveryInstructionsUpdate: !1,
							records: {
								productNameForProblemReport:
									'Tier Three Guardian Weekly',
								numberOfProblemRecordsToShow: 4,
								contactUserOnExistingProblemReport: !1,
								availableProblemTypes:
									commonDeliveryProblemTypes,
							},
						},
						cancellation: {
							reasons: shuffledTierThreeCancellationReasons,
							sfCaseProduct: 'Tier Three',
							checkForOutstandingCredits: !0,
							flowWrapper: physicalSubsCancellationFlowWrapper,
							startPageBody: () => {
								return (0,
								emotion_react_jsx_runtime_browser_esm.BX)(
									Stack.K,
									{
										space: 4,
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												Heading.X,
												{
													cssOverrides:
														typography.L.heading,
													children: [
														'We’re sorry to hear you’re thinking of cancelling your',
														' ',
														PRODUCT_TYPES.tierthree
															.friendlyName,
													],
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'p',
												{
													children:
														'With your vital support, the Guardian can remain editorially independent, free from the influence of billionaire owners and politicians. This enables us to challenge and hold the powerful to account, and to fearlessly pursue the truth. The support from our readers helps us keep our journalism without a paywall, open and accessible to all.',
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'p',
												{
													children: [
														'If you’re looking to take a break, it’s possible to suspend your subscription to the Guardian Weekly – reducing the cost of your total subscription. You can suspend up to six issues per year. This pauses delivery and you will receive the refund for any suspended issues off your next bill.',
														' ',
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'a',
															{
																css: cancellationConstants.SH,
																href: '/suspend/digital+print',
																onClick:
																	((eventLabel =
																		'tierThree_holiday_suspension'),
																	() =>
																		(0,
																		analytics.L9)(
																			{
																				eventCategory:
																					'cancellation',
																				eventAction:
																					'click',
																				eventLabel,
																			},
																		)),
																children:
																	'Suspend your subscription here',
															},
														),
														'.',
													],
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'p',
												{
													children:
														'Could you please take a moment to tell us why you want to cancel?',
												},
											),
										],
									},
								);
								var eventLabel;
							},
							startPageOfferEffectiveDateOptions: !0,
							summaryReasonSpecificPara: (_, currencyISO) => {
								var currencySymbol = (0, currencyIso.eu)(
									currencyISO || 'USD',
								);
								return 'Your support, no matter what amount, allows us to fund independent Guardian journalism. You can support us from as little as '.concat(
									currencySymbol,
									'1. It only takes a minute but makes a big difference.',
								);
							},
							onlyShowSupportSectionIfAlternateText: !1,
							alternateSupportButtonText: () => {},
							alternateSupportButtonUrlSuffix: () => {},
							swapFeedbackAndContactUs: !0,
						},
						fulfilmentDateCalculator: {
							productFilenamePart: 'Guardian Weekly',
							explicitSingleDayOfWeek: 'Friday',
						},
					},
					digipack: {
						productTitle: () => 'Digital Subscription',
						friendlyName: 'digital subscription',
						productType: 'digipack',
						groupedProductType: 'subscriptions',
						allProductsProductTypeFilterString: 'Digipack',
						urlPart: 'digital',
						legacyUrlPart: 'digitalpack',
						getOphanProductType: () => 'DIGITAL_SUBSCRIPTION',
						showTrialRemainingIfApplicable: !0,
						softOptInIDs: [
							softOptInIDs.Y.SupportOnboarding,
							softOptInIDs.Y.DigitalSubscriberPreview,
							softOptInIDs.Y.SupporterNewsletter,
						],
						cancellation: {
							reasons: shuffledDigipackCancellationReasons,
							sfCaseProduct: 'Digital Pack Subscriptions',
							startPageBody: () =>
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									Stack.K,
									{
										space: 4,
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												Heading.X,
												{
													cssOverrides:
														typography.L.heading,
													children:
														'We’re sorry to hear you’re thinking of cancelling your digital subscription',
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'p',
												{
													children:
														'Your support means The Guardian can remain editorially independent, free from the influence of billionaire owners and politicians. This enables us to give a voice to the voiceless, challenge the powerful and hold them to account. The support from our readers helps us to keep our journalism free of a paywall, so it’s open and accessible to all.',
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'p',
												{
													children:
														'Please could you take a moment to tell us why you want to cancel?',
												},
											),
										],
									},
								),
							summaryReasonSpecificPara: () => {},
							onlyShowSupportSectionIfAlternateText: !1,
							alternateSupportButtonText: () => {},
							alternateSupportButtonUrlSuffix: () => {},
							swapFeedbackAndContactUs: !0,
						},
					},
					supporterplus: {
						productTitle: () => 'All-access digital',
						friendlyName: 'all-access digital subscription',
						shortFriendlyName: 'all-access digital',
						productType: 'supporterplus',
						groupedProductType: 'recurringSupportWithBenefits',
						allProductsProductTypeFilterString: 'SupporterPlus',
						urlPart: 'support',
						getOphanProductType: () => 'SUPPORTER_PLUS',
						showTrialRemainingIfApplicable: !0,
						softOptInIDs: [
							softOptInIDs.Y.SupportOnboarding,
							softOptInIDs.Y.SupporterNewsletter,
							softOptInIDs.Y.DigitalSubscriberPreview,
						],
						cancelledCopy:
							'Your subscription has been cancelled. You are able to access your subscription until',
						cancellation: {
							alternateSummaryMainPara:
								"This is immediate and you will not be charged again. If you've cancelled within the first 14 days, we'll send you a full refund.",
							reasons: SupporterplusCancellationReasons.MV,
							sfCaseProduct: 'Supporter Plus',
							startPageBody: () =>
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									Stack.K,
									{
										space: 4,
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												Heading.X,
												{
													cssOverrides:
														typography.L.heading,
													children:
														'We’re sorry to see you go …',
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'p',
												{
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'strong',
															{
																children:
																	'… please could you take a moment to tell us why you would like to cancel today?',
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'br',
															{},
														),
														'As a reader-funded organisation, we rely on the generous support from those who are in a position to pay for news. And, we welcome your feedback.',
													],
												},
											),
										],
									},
								),
							summaryReasonSpecificPara: () => {},
							onlyShowSupportSectionIfAlternateText: !1,
							alternateSupportButtonText: () => {},
							alternateSupportButtonUrlSuffix: () => {},
							swapFeedbackAndContactUs: !0,
							shouldHideThrasher: !0,
						},
					},
					guardianpatron: {
						productTitle: () => 'Guardian Patron',
						friendlyName: 'guardian patron',
						productType: 'guardianpatron',
						groupedProductType: 'subscriptions',
						allProductsProductTypeFilterString: 'GuardianPatron',
						urlPart: 'guardianpatron',
						getOphanProductType: () => 'GUARDIAN_PATRON',
						showTrialRemainingIfApplicable: !0,
						softOptInIDs: [
							softOptInIDs.Y.SupportOnboarding,
							softOptInIDs.Y.DigitalSubscriberPreview,
							softOptInIDs.Y.SupporterNewsletter,
						],
					},
					guardianadlite: {
						productTitle: () => 'Guardian Ad-Lite',
						friendlyName: 'guardian ad-lite',
						productType: 'guardianadlite',
						groupedProductType: 'subscriptions',
						allProductsProductTypeFilterString: 'GuardianAdLite',
						urlPart: 'guardianadlite',
						getOphanProductType: () => 'GUARDIAN_AD_LITE',
						softOptInIDs: [softOptInIDs.Y.SupportOnboarding],
						cancellation: {
							sfCaseProduct: 'Guardian Ad-Lite',
							startPageBody: contributionsCancellationFlowStart,
							onlyShowSupportSectionIfAlternateText: !0,
							alternateSupportButtonUrlSuffix: () => {},
							swapFeedbackAndContactUs: !0,
							shouldHideThrasher: !0,
							alternateSummaryMainPara:
								"This is immediate and you will not be charged again. If you've cancelled within the first 14 days, your subscription will stop immediately and we will not take the first payment from you.",
						},
					},
				},
				GROUPED_PRODUCT_TYPES = {
					membership: productTypes_objectSpread(
						productTypes_objectSpread({}, PRODUCT_TYPES.membership),
						{},
						{
							groupFriendlyName: 'Membership',
							showSupporterId: !0,
							supportTheGuardianSectionProps: {
								supportReferer:
									'account_overview_membership_section',
								message:
									'We no longer have a Membership programme but you can still continue to support the Guardian.',
							},
						},
					),
					recurringSupport: {
						productTitle: () => 'Support',
						friendlyName: 'support',
						groupFriendlyName: 'support',
						allProductsProductTypeFilterString: 'Contribution',
						urlPart: 'recurringsupport',
						showSupporterId: !0,
					},
					recurringSupportWithBenefits: {
						productTitle: () => 'Subscription',
						friendlyName: 'subscription',
						groupFriendlyName: 'subscription',
						allProductsProductTypeFilterString: 'SupporterPlus',
						urlPart: 'recurringsupport',
						showSupporterId: !0,
					},
					subscriptions: {
						productTitle: () => 'Subscription',
						friendlyName: 'subscription',
						groupFriendlyName: 'subscriptions',
						allProductsProductTypeFilterString:
							'ContentSubscription',
						urlPart: 'subscriptions',
						cancelledCopy:
							'Your subscription has been cancelled. You are able to access your subscription until',
					},
				};
		},
		'./shared/softOptInIDs.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				Y: () => SoftOptInIDs,
			});
			var SoftOptInIDs = (function (SoftOptInIDs) {
				return (
					(SoftOptInIDs.SupportOnboarding =
						'your_support_onboarding'),
					(SoftOptInIDs.SupporterNewsletter = 'supporter_newsletter'),
					(SoftOptInIDs.SubscriberPreview = 'subscriber_preview'),
					(SoftOptInIDs.DigitalSubscriberPreview =
						'digital_subscriber_preview'),
					(SoftOptInIDs.GuardianWeeklyNewsletter =
						'guardian_weekly_newsletter'),
					SoftOptInIDs
				);
			})({});
		},
	},
]);
