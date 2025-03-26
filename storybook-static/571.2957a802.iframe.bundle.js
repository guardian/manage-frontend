'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[571],
	{
		'./client/components/mma/cancel/CancellationSummary.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				M: () => getCancellationSummary,
				j: () => isCancelled,
			});
			var emotion_react_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
				),
				space = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
				),
				palette = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
				),
				typography = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
				),
				react_router_dom = __webpack_require__(
					'./node_modules/react-router-dom/index.js',
				),
				dates = __webpack_require__('./shared/dates.ts'),
				productResponse = __webpack_require__(
					'./shared/productResponse.ts',
				),
				styles_typography = __webpack_require__(
					'./client/styles/typography.ts',
				),
				productUtils = __webpack_require__(
					'./client/utilities/productUtils.ts',
				),
				GenericErrorScreen = __webpack_require__(
					'./client/components/shared/GenericErrorScreen.tsx',
				),
				SupportTheGuardianButton = __webpack_require__(
					'./client/components/shared/SupportTheGuardianButton.tsx',
				),
				WithStandardTopMargin = __webpack_require__(
					'./client/components/shared/WithStandardTopMargin.tsx',
				),
				Heading = __webpack_require__(
					'./client/components/mma/shared/Heading.tsx',
				),
				cancellationConstants = __webpack_require__(
					'./client/components/mma/cancel/cancellationConstants.ts',
				),
				RadioGroup = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/radio/RadioGroup.js',
				),
				Radio = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/radio/Radio.js',
				),
				Button = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/button/Button.js',
				),
				react = __webpack_require__('./node_modules/react/index.js'),
				react_router = __webpack_require__(
					'./node_modules/react-router/index.js',
				),
				ButtonStyles = __webpack_require__(
					'./client/styles/ButtonStyles.ts',
				),
				analytics = __webpack_require__(
					'./client/utilities/analytics.ts',
				),
				geolocation = __webpack_require__(
					'./client/utilities/geolocation.ts',
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
			var containerStyles = (0, emotion_react_browser_esm.iv)(
					'padding-bottom:',
					space.D[24],
					'px;',
					'',
				),
				setReminderContainerStyles = (0, emotion_react_browser_esm.iv)(
					'&>*+*{margin-top:',
					space.D[5],
					'px;}',
					'',
				),
				formContainerStyles = (0, emotion_react_browser_esm.iv)(
					'&>*+*{margin-top:',
					space.D[6],
					'px;}',
					'',
				),
				getReminderPeriod = (date) => {
					var year = date.getFullYear(),
						paddedMonth = (date.getMonth() + 1)
							.toString()
							.padStart(2, '0');
					return ''.concat(year, '-').concat(paddedMonth, '-01');
				},
				getReminderOption = (monthsUntilDate) =>
					''.concat(monthsUntilDate, '-months'),
				getDefaultLabel = (date, monthsUntilDate, now) => {
					var month = date.toLocaleDateString('default', {
							month: 'long',
						}),
						year =
							now.getFullYear() === date.getFullYear()
								? ''
								: ' '.concat(date.getFullYear());
					return 'in '
						.concat(monthsUntilDate, ' months (')
						.concat(month)
						.concat(year, ')');
				},
				getDefaultThankYouMessage = (date) =>
					date.toLocaleDateString('default', { month: 'long' }),
				getDefaultReminderChoice = (monthsUntilDate) => {
					var now = new Date(),
						date = new Date(
							now.getFullYear(),
							now.getMonth() + monthsUntilDate,
						);
					return {
						label: getDefaultLabel(date, monthsUntilDate, now),
						thankYouMessage: getDefaultThankYouMessage(date),
						signup: {
							reminderPeriod: getReminderPeriod(date),
							reminderOption: getReminderOption(monthsUntilDate),
						},
					};
				},
				CancellationContributionReminder = () => {
					var [selectedChoiceIndex, setSelectedChoiceIndex] = (0,
						react.useState)(0),
						[hasSetReminder, setHasSetReminder] = (0,
						react.useState)(!1),
						navigate = (0, react_router.s0)(),
						email = window.guardian.identityDetails.email,
						reminderChoices = [
							getDefaultReminderChoice(3),
							getDefaultReminderChoice(6),
							getDefaultReminderChoice(9),
						],
						selectedChoice = reminderChoices[selectedChoiceIndex];
					return (
						(0, react.useEffect)(() => {
							(0, analytics.G2)({
								eventCategory: 'cancellation_flow',
								eventAction: 'view',
								eventLabel: 'set_reminder',
							});
						}, []),
						(0, emotion_react_jsx_runtime_browser_esm.tZ)('div', {
							css: containerStyles,
							children: hasSetReminder
								? (0, emotion_react_jsx_runtime_browser_esm.BX)(
										'p',
										{
											children: [
												'Thank you for setting up support reminder. We will be in touch in ',
												selectedChoice.thankYouMessage,
												', so look out for a message from the Guardian in your inbox.',
											],
										},
								  )
								: (0, emotion_react_jsx_runtime_browser_esm.BX)(
										'div',
										{
											css: setReminderContainerStyles,
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'p',
													{
														children:
															'We can invite you to support our journalism again at a later date, when it might suit you better. This will be no more than two emails, with no obligation to give.',
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'div',
													{
														css: formContainerStyles,
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																RadioGroup.E,
																{
																	name: 'reminder',
																	label: "I'd like to be reminded in:",
																	children:
																		reminderChoices.map(
																			(
																				choice,
																				index,
																			) =>
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					Radio.Y,
																					{
																						value: ''.concat(
																							index,
																						),
																						label: choice.label,
																						checked:
																							selectedChoiceIndex ===
																							index,
																						onChange:
																							() =>
																								setSelectedChoiceIndex(
																									index,
																								),
																					},
																					'reminderRadio'.concat(
																						index,
																					),
																				),
																		),
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
																					() => {
																						(0,
																						analytics.G2)(
																							{
																								eventCategory:
																									'cancellation_flow',
																								eventAction:
																									'click',
																								eventLabel:
																									'set_reminder__'.concat(
																										selectedChoice
																											.signup
																											.reminderOption,
																									),
																							},
																						),
																							fetch(
																								'/api/reminders/create',
																								{
																									method: 'POST',
																									headers:
																										{
																											'Content-Type':
																												'application/json',
																										},
																									body: JSON.stringify(
																										_objectSpread(
																											{
																												email,
																												country:
																													(0,
																													geolocation.x)(),
																												reminderPlatform:
																													'MMA',
																												reminderComponent:
																													'CANCELLATION',
																												reminderStage:
																													'WINBACK',
																											},
																											selectedChoice.signup,
																										),
																									),
																								},
																							),
																							setHasSetReminder(
																								!0,
																							);
																					},
																				cssOverrides:
																					ButtonStyles._8,
																				children:
																					'Set my reminder',
																			},
																		),
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			Button.z,
																			{
																				priority:
																					'tertiary',
																				onClick:
																					() =>
																						navigate(
																							'/',
																						),
																				cssOverrides:
																					ButtonStyles._8,
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
											],
										},
								  ),
						})
					);
				};
			try {
				(CancellationContributionReminder.displayName =
					'CancellationContributionReminder'),
					(CancellationContributionReminder.__docgenInfo = {
						description: '',
						displayName: 'CancellationContributionReminder',
						props: {},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/cancel/cancellationContributionReminder.tsx#CancellationContributionReminder'
						] = {
							docgenInfo:
								CancellationContributionReminder.__docgenInfo,
							name: 'CancellationContributionReminder',
							path: 'client/components/mma/cancel/cancellationContributionReminder.tsx#CancellationContributionReminder',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var mq = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
				),
				identity = __webpack_require__('./shared/identity.ts'),
				utilities_fetch = __webpack_require__(
					'./client/utilities/fetch.ts',
				),
				AsyncLoader = __webpack_require__(
					'./client/components/mma/shared/AsyncLoader.tsx',
				);
			var fetchExistingPaymentOptions = () =>
				(0, utilities_fetch.n4)('/api/existing-payment-options', {
					headers: {
						[identity.h]: (0, identity.V)(window.location.href),
					},
				});
			class ExistingPaymentOptionsAsyncLoader extends AsyncLoader.y {}
			var _ref = { name: '319yun', styles: 'font-weight:bold;margin:0' },
				ResubscribeThrasher = (props) => {
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						ExistingPaymentOptionsAsyncLoader,
						{
							fetch: fetchExistingPaymentOptions,
							render:
								((args = props),
								(existingPaymentOptions) =>
									(existingPaymentOptions.find(
										(option) =>
											!!option.subscriptions.find(
												(sub) =>
													sub.isActive &&
													sub.name.includes(
														'Contribution',
													),
											),
									)
										? []
										: existingPaymentOptions
									).length
										? ((0, analytics.L9)({
												eventCategory: 'impression',
												eventAction:
													'resubscribe_thrasher',
												eventLabel: args.usageContext,
										  }),
										  (0,
										  emotion_react_jsx_runtime_browser_esm.tZ)(
												'div',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														{
															backgroundColor:
																palette.palette
																	.brandAlt[400],
															padding:
																'10px 15px 15px',
															margin: '30px 0',
														},
														'',
														'',
													),
													children: (0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'div',
														{
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'h2',
																	{
																		css: _ref,
																		children:
																			'Support us another way?',
																	},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'p',
																	{
																		css: (0,
																		emotion_react_browser_esm.iv)(
																			{
																				br: {
																					display:
																						'none',
																					[mq
																						.Dp
																						.tablet]:
																						{
																							display:
																								'inline',
																						},
																				},
																			},
																			'',
																			'',
																		),
																		children:
																			'From just $1, or a little more on a regular basis, you can fund independent Guardian journalism. No need to update your payment details. It only takes a minute but makes a big difference.',
																	},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	SupportTheGuardianButton.o,
																	{
																		supportReferer:
																			'resubscribe_thrasher_'.concat(
																				args.usageContext,
																			),
																		theme: 'brandAlt',
																	},
																),
															],
														},
													),
												},
										  ))
										: args.children),
							loadingMessage: 'Loading...',
						},
					);
					var args;
				};
			try {
				(ResubscribeThrasher.displayName = 'ResubscribeThrasher'),
					(ResubscribeThrasher.__docgenInfo = {
						description: '',
						displayName: 'ResubscribeThrasher',
						props: {
							usageContext: {
								defaultValue: null,
								description: '',
								name: 'usageContext',
								required: !0,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/cancel/ResubscribeThrasher.tsx#ResubscribeThrasher'
						] = {
							docgenInfo: ResubscribeThrasher.__docgenInfo,
							name: 'ResubscribeThrasher',
							path: 'client/components/mma/cancel/ResubscribeThrasher.tsx#ResubscribeThrasher',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var CancellationSummary_ref = {
					name: 'g46w8s',
					styles: 'margin-bottom:30px',
				},
				isCancelled = (subscription) =>
					0 === Object.keys(subscription).length ||
					subscription.cancelledAt,
				getCancellationSummary = (
					productType,
					productDetail,
					productDetailBeforeCancelling,
					eligableForOffer,
					eligibleForPause,
					cancellationReasonId,
				) =>
					isCancelled(productDetail.subscription)
						? ((
								productType,
								productDetail,
								productDetailBeforeCancelling,
								eligableForOffer,
								eligibleForPause,
								cancellationReasonId,
						  ) => {
								var _productType$cancella,
									_productType$cancella2,
									_productType$cancella3,
									_productType$cancella4,
									_productType$cancella5,
									_productType$cancella6,
									_productType$cancella7,
									isSupportPlus =
										'supporterplus' ===
										productType.productType,
									isContribution =
										'contributions' ===
										productType.productType,
									isGuardianAdLite =
										'guardianadlite' ===
										productType.productType,
									showReminder = !(
										null ===
											(_productType$cancella =
												productType.cancellation) ||
										void 0 === _productType$cancella ||
										!_productType$cancella.shouldShowReminder
									);
								isSupportPlus &&
									eligableForOffer &&
									(showReminder = !1);
								var currencySymbol,
									deliveryRecordsLink = '/delivery/'.concat(
										productType.urlPart,
										'/records',
									),
									contributionheadingCopy = '';
								if (
									productDetailBeforeCancelling &&
									Object.keys(
										productDetailBeforeCancelling.subscription,
									).length
								) {
									var mainPlan = (0, productResponse.fr)(
										productDetailBeforeCancelling.subscription,
									);
									(currencySymbol = mainPlan.currencyISO),
										isContribution &&
											(contributionheadingCopy =
												'Your '.concat(
													mainPlan
														? ''.concat(
																mainPlan.billingPeriod,
																'ly ',
														  )
														: '',
													'support has been cancelled',
												));
								}
								return (0,
								emotion_react_jsx_runtime_browser_esm.BX)(
									emotion_react_jsx_runtime_browser_esm.HY,
									{
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												WithStandardTopMargin.z,
												{
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															Heading.X,
															{
																borderless: !0,
																cssOverrides: [
																	styles_typography
																		.L
																		.heading,
																	(0,
																	emotion_react_browser_esm.iv)(
																		'margin-bottom:',
																		space
																			.D[6],
																		'px;',
																		'',
																	),
																],
																children: [
																	(isSupportPlus ||
																		isGuardianAdLite) &&
																		'Your subscription has been cancelled',
																	isContribution &&
																		contributionheadingCopy,
																	!isSupportPlus &&
																		!isContribution &&
																		!isGuardianAdLite &&
																		'Your '.concat(
																			productType.friendlyName,
																			' is cancelled',
																		),
																],
															},
														),
														productType.cancellation &&
															!productType
																.cancellation
																.shouldHideSummaryMainPara &&
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'p',
																{
																	children:
																		(null ===
																			(_productType$cancella2 =
																				productType.cancellation) ||
																		void 0 ===
																			_productType$cancella2
																			? void 0
																			: _productType$cancella2.alternateSummaryMainPara) ||
																		(productDetail
																			.subscription
																			.end
																			? (0,
																			  emotion_react_jsx_runtime_browser_esm.BX)(
																					emotion_react_jsx_runtime_browser_esm.HY,
																					{
																						children:
																							[
																								'You will continue to receive the benefits of your',
																								' ',
																								productType.friendlyName,
																								' until',
																								' ',
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									'b',
																									{
																										children:
																											(0,
																											dates.e1)(
																												productDetail
																													.subscription
																													.cancellationEffectiveDate,
																											),
																									},
																								),
																								'. You will not be charged again. If you think you’re owed a refund, please contact us at',
																								' ',
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									'a',
																									{
																										css: cancellationConstants.SH,
																										href: 'mailto:customer.help@theguardian.com',
																										children:
																											'customer.help@theguardian.com',
																									},
																								),
																								'.',
																							],
																					},
																			  )
																			: 'Your cancellation is effective immediately.'),
																},
															),
														isContribution &&
															eligibleForPause &&
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'p',
																{
																	children:
																		'This is immediate and you will not be charged again.',
																},
															),
													],
												},
											),
											showReminder &&
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													CancellationContributionReminder,
													{},
												),
											!(
												null !==
													(_productType$cancella3 =
														productType.cancellation) &&
												void 0 !==
													_productType$cancella3 &&
												_productType$cancella3.shouldHideThrasher
											) &&
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													ResubscribeThrasher,
													{
														usageContext: ''.concat(
															productType.urlPart,
															'_cancellation_summary',
														),
														children: (0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															WithStandardTopMargin.z,
															{
																children: [
																	(0,
																	productUtils.SS)(
																		productType,
																	) &&
																		(0,
																		emotion_react_jsx_runtime_browser_esm.BX)(
																			'p',
																			{
																				children:
																					[
																						'You can still',
																						' ',
																						(0,
																						emotion_react_jsx_runtime_browser_esm.tZ)(
																							react_router_dom.rU,
																							{
																								css: (0,
																								emotion_react_browser_esm.iv)(
																									'color:',
																									palette
																										.palette
																										.brand[500],
																									';text-decoration:underline;:visited{color:',
																									palette
																										.palette
																										.brand[500],
																									';}',
																									'',
																								),
																								to: deliveryRecordsLink,
																								state: {
																									productDetail,
																								},
																								children:
																									'view your previous deliveries',
																							},
																						),
																						' ',
																						'and',
																						' ',
																						(0,
																						emotion_react_jsx_runtime_browser_esm.tZ)(
																							react_router_dom.rU,
																							{
																								css: (0,
																								emotion_react_browser_esm.iv)(
																									'color:',
																									palette
																										.palette
																										.brand[500],
																									';text-decoration:underline;:visited{color:',
																									palette
																										.palette
																										.brand[500],
																									';}',
																									'',
																								),
																								to: deliveryRecordsLink,
																								state: {
																									productDetail,
																								},
																								children:
																									'report a delivery problem',
																							},
																						),
																						'.',
																					],
																			},
																		),
																	(!productType.cancellation ||
																		!productType
																			.cancellation
																			.onlyShowSupportSectionIfAlternateText ||
																		(null ===
																			(_productType$cancella4 =
																				(_productType$cancella5 =
																					productType.cancellation)
																					.summaryReasonSpecificPara) ||
																		void 0 ===
																			_productType$cancella4
																			? void 0
																			: _productType$cancella4.call(
																					_productType$cancella5,
																					cancellationReasonId,
																			  ))) &&
																		(0,
																		emotion_react_jsx_runtime_browser_esm.BX)(
																			emotion_react_jsx_runtime_browser_esm.HY,
																			{
																				children:
																					[
																						(0,
																						emotion_react_jsx_runtime_browser_esm.tZ)(
																							'h4',
																							{
																								css: (0,
																								emotion_react_browser_esm.iv)(
																									typography.D35,
																									';margin-bottom:',
																									space
																										.D[3],
																									'px;',
																									'',
																								),
																								children:
																									'Support us another way',
																							},
																						),
																						(0,
																						emotion_react_jsx_runtime_browser_esm.tZ)(
																							'p',
																							{
																								children:
																									(null ==
																										productType ||
																									null ===
																										(_productType$cancella6 =
																											productType.cancellation) ||
																									void 0 ===
																										_productType$cancella6 ||
																									null ===
																										(_productType$cancella7 =
																											_productType$cancella6.summaryReasonSpecificPara) ||
																									void 0 ===
																										_productType$cancella7
																										? void 0
																										: _productType$cancella7.call(
																												_productType$cancella6,
																												cancellationReasonId,
																												currencySymbol,
																										  )) ||
																									'If you are interested in supporting our journalism in other ways, please consider either a contribution or a subscription.',
																							},
																						),
																						(0,
																						emotion_react_jsx_runtime_browser_esm.tZ)(
																							'div',
																							{
																								css: CancellationSummary_ref,
																								children:
																									(0,
																									emotion_react_jsx_runtime_browser_esm.tZ)(
																										SupportTheGuardianButton.o,
																										{
																											urlSuffix:
																												productType.cancellation &&
																												productType
																													.cancellation
																													.alternateSupportButtonUrlSuffix &&
																												productType.cancellation.alternateSupportButtonUrlSuffix(
																													cancellationReasonId,
																												),
																											alternateButtonText:
																												productType.cancellation &&
																												productType
																													.cancellation
																													.alternateSupportButtonText &&
																												productType.cancellation.alternateSupportButtonText(
																													cancellationReasonId,
																												),
																											supportReferer:
																												productType.urlPart +
																												'_cancellation_summary',
																											theme: 'brand',
																											size: 'small',
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
										],
									},
								);
						  })(
								productType,
								productDetail,
								productDetailBeforeCancelling,
								eligableForOffer,
								eligibleForPause,
								cancellationReasonId,
						  )
						: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
								GenericErrorScreen.c,
								{
									loggingMessage: ''.concat(
										productType.friendlyName,
										" cancellation call succeeded but subsequent product detail doesn't show as cancelled",
									),
								},
						  );
			try {
				(isCancelled.displayName = 'isCancelled'),
					(isCancelled.__docgenInfo = {
						description: '',
						displayName: 'isCancelled',
						props: {
							accountId: {
								defaultValue: null,
								description: '',
								name: 'accountId',
								required: !1,
								type: { name: 'string' },
							},
							subscriptionId: {
								defaultValue: null,
								description: '',
								name: 'subscriptionId',
								required: !0,
								type: { name: 'string' },
							},
							start: {
								defaultValue: null,
								description: '',
								name: 'start',
								required: !1,
								type: { name: 'string' },
							},
							end: {
								defaultValue: null,
								description: '',
								name: 'end',
								required: !0,
								type: { name: 'string' },
							},
							renewalDate: {
								defaultValue: null,
								description: '',
								name: 'renewalDate',
								required: !0,
								type: { name: 'string' },
							},
							anniversaryDate: {
								defaultValue: null,
								description: '',
								name: 'anniversaryDate',
								required: !0,
								type: { name: 'string' },
							},
							cancelledAt: {
								defaultValue: null,
								description: '',
								name: 'cancelledAt',
								required: !0,
								type: { name: 'boolean' },
							},
							nextPaymentDate: {
								defaultValue: null,
								description: '',
								name: 'nextPaymentDate',
								required: !0,
								type: { name: 'string | null' },
							},
							lastPaymentDate: {
								defaultValue: null,
								description: '',
								name: 'lastPaymentDate',
								required: !0,
								type: { name: 'string | null' },
							},
							potentialCancellationDate: {
								defaultValue: null,
								description: '',
								name: 'potentialCancellationDate',
								required: !0,
								type: { name: 'string | null' },
							},
							chargedThroughDate: {
								defaultValue: null,
								description: '',
								name: 'chargedThroughDate',
								required: !0,
								type: { name: 'string | null' },
							},
							nextPaymentPrice: {
								defaultValue: null,
								description: '',
								name: 'nextPaymentPrice',
								required: !0,
								type: { name: 'number | null' },
							},
							paymentMethod: {
								defaultValue: null,
								description: '',
								name: 'paymentMethod',
								required: !1,
								type: { name: 'string' },
							},
							stripePublicKeyForCardAddition: {
								defaultValue: null,
								description: '',
								name: 'stripePublicKeyForCardAddition',
								required: !1,
								type: { name: 'string' },
							},
							safeToUpdatePaymentMethod: {
								defaultValue: null,
								description: '',
								name: 'safeToUpdatePaymentMethod',
								required: !0,
								type: { name: 'boolean' },
							},
							card: {
								defaultValue: null,
								description: '',
								name: 'card',
								required: !1,
								type: { name: 'Card' },
							},
							payPalEmail: {
								defaultValue: null,
								description: '',
								name: 'payPalEmail',
								required: !1,
								type: { name: 'string' },
							},
							mandate: {
								defaultValue: null,
								description: '',
								name: 'mandate',
								required: !1,
								type: { name: 'DirectDebitDetails' },
							},
							sepaMandate: {
								defaultValue: null,
								description: '',
								name: 'sepaMandate',
								required: !1,
								type: { name: 'SepaDetails' },
							},
							autoRenew: {
								defaultValue: null,
								description: '',
								name: 'autoRenew',
								required: !0,
								type: { name: 'boolean' },
							},
							currentPlans: {
								defaultValue: null,
								description: '',
								name: 'currentPlans',
								required: !0,
								type: {
									name: '(SubscriptionPlan | PaidSubscriptionPlan)[]',
								},
							},
							futurePlans: {
								defaultValue: null,
								description: '',
								name: 'futurePlans',
								required: !0,
								type: {
									name: '(SubscriptionPlan | PaidSubscriptionPlan)[]',
								},
							},
							plan: {
								defaultValue: null,
								description: '',
								name: 'plan',
								required: !1,
								type: { name: 'PaidSubscriptionPlan' },
							},
							trialLength: {
								defaultValue: null,
								description: '',
								name: 'trialLength',
								required: !0,
								type: { name: 'number' },
							},
							readerType: {
								defaultValue: null,
								description: '',
								name: 'readerType',
								required: !0,
								type: {
									name: 'enum',
									value: [
										{ value: '"Patron"' },
										{ value: '"Gift"' },
										{ value: '"Direct"' },
										{ value: '"Agent"' },
										{ value: '"Complementary"' },
									],
								},
							},
							deliveryAddress: {
								defaultValue: null,
								description: '',
								name: 'deliveryAddress',
								required: !1,
								type: { name: 'DeliveryAddress' },
							},
							contactId: {
								defaultValue: null,
								description: '',
								name: 'contactId',
								required: !1,
								type: { name: 'string' },
							},
							account: {
								defaultValue: null,
								description: '',
								name: 'account',
								required: !1,
								type: { name: '{ accountName: string; }' },
							},
							deliveryAddressChangeEffectiveDate: {
								defaultValue: null,
								description: '',
								name: 'deliveryAddressChangeEffectiveDate',
								required: !1,
								type: { name: 'string' },
							},
							cancellationEffectiveDate: {
								defaultValue: null,
								description: '',
								name: 'cancellationEffectiveDate',
								required: !1,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/cancel/CancellationSummary.tsx#isCancelled'
						] = {
							docgenInfo: isCancelled.__docgenInfo,
							name: 'isCancelled',
							path: 'client/components/mma/cancel/CancellationSummary.tsx#isCancelled',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/shared/PaymentMethodDisplay.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				C: () => PaymentMethoDisplay,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_5__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
				_CardDisplay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./client/components/mma/shared/CardDisplay.tsx',
				),
				_DirectDebitDisplay__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./client/components/mma/shared/DirectDebitDisplay.tsx',
					),
				_PaypalDisplay__WEBPACK_IMPORTED_MODULE_6__ =
					__webpack_require__(
						'./client/components/mma/shared/PaypalDisplay.tsx',
					),
				_SepaDisplay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
					'./client/components/mma/shared/SepaDisplay.tsx',
				),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ =
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
				PaymentMethoDisplay = (_ref2) => {
					var { subscription, inPaymentFailure } = _ref2;
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.BX)(
						'div',
						{
							css: (0,
							_emotion_react__WEBPACK_IMPORTED_MODULE_4__.iv)(
								_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_5__.Kz0,
								';',
								'',
							),
							'data-qm-masking': 'blocklist',
							children: [
								subscription.card &&
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
										_CardDisplay__WEBPACK_IMPORTED_MODULE_0__.V,
										_objectSpread(
											{
												inErrorState: inPaymentFailure,
												cssOverrides: _ref,
											},
											subscription.card,
										),
									),
								subscription.payPalEmail &&
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
										_PaypalDisplay__WEBPACK_IMPORTED_MODULE_6__.O,
										{
											inline: !0,
											payPalId: subscription.payPalEmail,
										},
									),
								subscription.sepaMandate &&
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
										_SepaDisplay__WEBPACK_IMPORTED_MODULE_2__.t,
										{
											inline: !0,
											accountName:
												subscription.sepaMandate
													.accountName,
											iban: subscription.sepaMandate.iban,
										},
									),
								subscription.mandate &&
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
										_DirectDebitDisplay__WEBPACK_IMPORTED_MODULE_1__.rV,
										_objectSpread(
											{ inline: !0 },
											subscription.mandate,
										),
									),
								subscription.stripePublicKeyForCardAddition &&
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
										'span',
										{ children: 'No Payment Method' },
									),
							],
						},
					);
				};
			try {
				(PaymentMethoDisplay.displayName = 'PaymentMethoDisplay'),
					(PaymentMethoDisplay.__docgenInfo = {
						description: '',
						displayName: 'PaymentMethoDisplay',
						props: {
							subscription: {
								defaultValue: null,
								description: '',
								name: 'subscription',
								required: !0,
								type: { name: 'Subscription' },
							},
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
							'client/components/mma/shared/PaymentMethodDisplay.tsx#PaymentMethoDisplay'
						] = {
							docgenInfo: PaymentMethoDisplay.__docgenInfo,
							name: 'PaymentMethoDisplay',
							path: 'client/components/mma/shared/PaymentMethodDisplay.tsx#PaymentMethoDisplay',
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
		'./client/components/shared/Ribbon.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { V: () => Ribbon });
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
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			var ribbonTailCss = {
					name: '14t3ska',
					styles: 'clip-path:polygon(100vw 0, 0 0, var(--r) 50%, 0 100%, 100vw 100%);border-image:conic-gradient(var(--ribbonColour) 0 0) fill 0',
				},
				ribbonIconLeft = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'padding-left:calc(var(--r) + ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[5],
					'px);',
					'',
				),
				ribbonShapeCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'display:inline-flex;',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.Rcn,
					';color:var(--copyColour);background-color:var(--ribbonColour);--r:0.8em;padding-left:calc(var(--r) + ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[2],
					'px);padding-right:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[5],
					'px;line-height:1.8;width:fit-content;',
					'',
				),
				smallOverrideCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.fRL,
					';line-height:1.8;',
					'',
				),
				ribbonRoundedCornersLeftCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'border-top-left-radius:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[1],
					'px;border-bottom-left-radius:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[1],
					'px;',
					'',
				),
				ribbonRoundedCornersRightCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'border-top-right-radius:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[1],
					'px;border-bottom-right-radius:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[1],
					'px;',
					'',
				),
				Ribbon = (_ref) => {
					var {
						copy,
						ribbonColour,
						copyColour,
						icon,
						iconSide,
						withoutTail,
						small,
						roundedCornersLeft,
						roundedCornersRight,
						additionalCss,
					} = _ref;
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.BX)(
						'div',
						{
							css: [
								ribbonShapeCss,
								roundedCornersLeft &&
									ribbonRoundedCornersLeftCss,
								roundedCornersRight &&
									ribbonRoundedCornersRightCss,
								icon && 'left' === iconSide && ribbonIconLeft,
								!withoutTail && ribbonTailCss,
								small && smallOverrideCss,
								additionalCss,
								'',
								'',
							],
							style: {
								'--ribbonColour':
									ribbonColour ||
									_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
										.palette.neutral[10],
								'--copyColour':
									copyColour ||
									_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
										.palette.neutral[100],
							},
							children: [
								'right' !== iconSide && icon,
								copy,
								'right' === iconSide && icon,
							],
						},
					);
				};
			try {
				(Ribbon.displayName = 'Ribbon'),
					(Ribbon.__docgenInfo = {
						description: '',
						displayName: 'Ribbon',
						props: {
							copy: {
								defaultValue: null,
								description: '',
								name: 'copy',
								required: !0,
								type: { name: 'string' },
							},
							ribbonColour: {
								defaultValue: null,
								description: '',
								name: 'ribbonColour',
								required: !1,
								type: { name: 'string' },
							},
							copyColour: {
								defaultValue: null,
								description: '',
								name: 'copyColour',
								required: !1,
								type: { name: 'string' },
							},
							icon: {
								defaultValue: null,
								description: '',
								name: 'icon',
								required: !1,
								type: {
									name: 'ReactElement<any, string | JSXElementConstructor<any>>',
								},
							},
							iconSide: {
								defaultValue: null,
								description: '',
								name: 'iconSide',
								required: !1,
								type: {
									name: 'enum',
									value: [
										{ value: '"left"' },
										{ value: '"right"' },
									],
								},
							},
							withoutTail: {
								defaultValue: null,
								description: '',
								name: 'withoutTail',
								required: !1,
								type: { name: 'true' },
							},
							small: {
								defaultValue: null,
								description: '',
								name: 'small',
								required: !1,
								type: { name: 'true' },
							},
							roundedCornersLeft: {
								defaultValue: null,
								description: '',
								name: 'roundedCornersLeft',
								required: !1,
								type: { name: 'true' },
							},
							roundedCornersRight: {
								defaultValue: null,
								description: '',
								name: 'roundedCornersRight',
								required: !1,
								type: { name: 'true' },
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
							'client/components/shared/Ribbon.tsx#Ribbon'
						] = {
							docgenInfo: Ribbon.__docgenInfo,
							name: 'Ribbon',
							path: 'client/components/shared/Ribbon.tsx#Ribbon',
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
	},
]);
