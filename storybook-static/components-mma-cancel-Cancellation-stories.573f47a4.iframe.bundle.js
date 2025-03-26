'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[6657],
	{
		'./client/components/mma/shared/benefits/BenefitsSection.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				c: () => BenefitsSection,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_5__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_6__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
				_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgCrossRoundFilled.js',
					),
				_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgTickRound.js',
					),
				_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/hide/Hide.js',
					),
				_BenefitsStyles__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./client/components/mma/shared/benefits/BenefitsStyles.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				Benefit = (_ref) => {
					var { benefit, small } = _ref;
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
						'li',
						{
							css: benefit.isUnavailable
								? _BenefitsStyles__WEBPACK_IMPORTED_MODULE_0__.WH
								: '',
							children: [
								benefit.isUnavailable
									? (0,
									  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
											_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_2__.i,
											{
												isAnnouncedByScreenReader: !0,
												size: small
													? 'xsmall'
													: 'small',
											},
									  )
									: (0,
									  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
											_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_3__.X,
											{
												isAnnouncedByScreenReader: !0,
												size: small
													? 'xsmall'
													: 'small',
											},
									  ),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
									'span',
									{
										children: [
											benefit.name &&
												(0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
													_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.HY,
													{
														children: [
															(0,
															_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
																'strong',
																{
																	children:
																		benefit.name,
																},
															),
															(0,
															_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
																_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_4__.c,
																{
																	from: 'tablet',
																	children:
																		(0,
																		_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
																			'br',
																			{},
																		),
																},
															),
															' ',
														],
													},
												),
											benefit.description,
										],
									},
								),
							],
						},
					);
				},
				BenefitsSection = (_ref2) => {
					var { benefits, small } = _ref2;
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
						'ul',
						{
							id: 'benefits',
							css: [
								_BenefitsStyles__WEBPACK_IMPORTED_MODULE_0__.fZ,
								small &&
									(0,
									_emotion_react__WEBPACK_IMPORTED_MODULE_5__.iv)(
										_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_6__.VZD,
										';',
										'',
									),
								'',
								'',
							],
							children: benefits.map((benefit, benefitIndex) =>
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
									Benefit,
									{ benefit, small: !!small },
									'benefit-'.concat(benefitIndex),
								),
							),
						},
					);
				};
			try {
				(BenefitsSection.displayName = 'BenefitsSection'),
					(BenefitsSection.__docgenInfo = {
						description: '',
						displayName: 'BenefitsSection',
						props: {
							benefits: {
								defaultValue: null,
								description: '',
								name: 'benefits',
								required: !0,
								type: { name: 'ProductBenefit[]' },
							},
							small: {
								defaultValue: null,
								description: '',
								name: 'small',
								required: !1,
								type: { name: 'true' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/benefits/BenefitsSection.tsx#BenefitsSection'
						] = {
							docgenInfo: BenefitsSection.__docgenInfo,
							name: 'BenefitsSection',
							path: 'client/components/mma/shared/benefits/BenefitsSection.tsx#BenefitsSection',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/shared/benefits/BenefitsStyles.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				TY: () => benefitsButtonCss,
				WH: () => unavailableBenefitsCss,
				fZ: () => benefitsCss,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
					),
				benefitsCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__.Kz0,
					';color:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.neutral[7],
					';list-style:none;margin:0 0 0 -4px;padding:0;li+li{margin-top:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[2],
					'px;}li{display:flex;align-items:flex-start;}svg{flex-shrink:0;margin-right:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[2],
					'px;fill:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.brand[500],
					';}',
					'',
				),
				benefitsButtonCss =
					(_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
						.Dp.tablet,
					(0, _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__.VZD,
						';margin-top:',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
							.D[1],
						'px;padding:0;color:',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
							.palette.brand[500],
						';border-bottom:1px solid ',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
							.palette.brand[500],
						';',
						'',
					)),
				unavailableBenefitsCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'color:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.neutral[46],
					';svg{fill:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.neutral[46],
					';}',
					'',
				);
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
		'./client/components/mma/cancel/Cancellation.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					ConfirmationContribution: () => ConfirmationContribution,
					ConfirmationContributionWithPause: () =>
						ConfirmationContributionWithPause,
					ConfirmationGuardianAdLite: () =>
						ConfirmationGuardianAdLite,
					ConfirmationSupporterPlusWithOffer: () =>
						ConfirmationSupporterPlusWithOffer,
					ContactCustomerService: () => ContactCustomerService,
					OfferConfirmedMonthly: () => OfferConfirmedMonthly,
					OfferConfirmedYearly: () => OfferConfirmedYearly,
					OfferMonthly: () => OfferMonthly,
					OfferReviewMonthly: () => OfferReviewMonthly,
					OfferReviewYearly: () => OfferReviewYearly,
					OfferYearly: () => OfferYearly,
					Pause: () => Pause,
					PauseConfirmed: () => PauseConfirmed,
					PauseReview: () => PauseReview,
					Review: () => Review,
					ReviewGuardianAdLite: () => ReviewGuardianAdLite,
					ReviewGuardianAdLiteInTrialPeriod: () =>
						ReviewGuardianAdLiteInTrialPeriod,
					ReviewWithReduceAmount: () => ReviewWithReduceAmount,
					SelectReason: () => SelectReason,
					SupportplusCancelConfirm: () => SupportplusCancelConfirm,
					SwitchReviewYearly: () => SwitchReviewYearly,
					SwitchYearly: () => SwitchYearly,
					SwitchYearlyConfirmed: () => SwitchYearlyConfirmed,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => Cancellation_stories,
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
				mdapiResponse = __webpack_require__(
					'./client/fixtures/mdapiResponse.ts',
				),
				productTypes = __webpack_require__('./shared/productTypes.ts'),
				testProducts = __webpack_require__(
					'./client/fixtures/productBuilder/testProducts.ts',
				),
				CancellationContainer = __webpack_require__(
					'./client/components/mma/cancel/CancellationContainer.tsx',
				),
				react = __webpack_require__('./node_modules/react/index.js'),
				react_router = __webpack_require__(
					'./node_modules/react-router/index.js',
				),
				productUtils = __webpack_require__(
					'./client/utilities/productUtils.ts',
				),
				featureSwitches = __webpack_require__(
					'./shared/featureSwitches.ts',
				),
				productResponse = __webpack_require__(
					'./shared/productResponse.ts',
				),
				emotion_react_browser_esm = __webpack_require__(
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
				mq = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
				),
				RadioGroup = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/radio/RadioGroup.js',
				),
				Radio = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/radio/Radio.js',
				),
				InlineError = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/user-feedback/InlineError.js',
				),
				Button = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/button/Button.js',
				),
				SvgArrowRightStraight = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgArrowRightStraight.js',
				),
				dates = __webpack_require__('./shared/dates.ts'),
				useAsyncLoader = __webpack_require__(
					'./client/utilities/hooks/useAsyncLoader.ts',
				),
				GenericErrorScreen = __webpack_require__(
					'./client/components/shared/GenericErrorScreen.tsx',
				),
				WithStandardTopMargin = __webpack_require__(
					'./client/components/shared/WithStandardTopMargin.tsx',
				),
				DefaultApiResponseHandler = __webpack_require__(
					'./client/components/mma/shared/asyncComponents/DefaultApiResponseHandler.tsx',
				),
				DefaultLoadingView = __webpack_require__(
					'./client/components/mma/shared/asyncComponents/DefaultLoadingView.tsx',
				),
				ProgressIndicator = __webpack_require__(
					'./client/components/mma/shared/ProgressIndicator.tsx',
				),
				ProgressStepper = __webpack_require__(
					'./client/components/mma/shared/ProgressStepper.tsx',
				),
				cancellationContexts = __webpack_require__(
					'./client/components/mma/cancel/cancellationContexts.tsx',
				),
				identity = __webpack_require__('./shared/identity.ts'),
				utilities_fetch = __webpack_require__(
					'./client/utilities/fetch.ts',
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
			var _ref = {
					name: 'w2iqra',
					styles: 'vertical-align:top;text-transform:lowercase;:checked+div label:first-of-type{font-weight:bold;}',
				},
				_ref3 = {
					name: '1l7xcuz',
					styles: 'text-align:right;margin-bottom:10px',
				},
				ReasonPicker = (_ref2) => {
					var { productType, productDetail, chargedThroughDateStr } =
							_ref2,
						[selectedReasonId, setSelectedReasonId] = (0,
						react.useState)(''),
						[cancellationPolicy, setCancellationPolicy] = (0,
						react.useState)(''),
						[inValidationErrorState, setInValidationErrorState] =
							(0, react.useState)(!1),
						navigate = (0, react_router.s0)(),
						routerState = (0, react_router.TH)().state,
						shouldUseProgressStepper =
							(featureSwitches.k.supporterplusCancellationOffer &&
								'supporterplus' === productType.productType) ||
							(featureSwitches.k.contributionCancellationPause &&
								'contributions' === productType.productType);
					return productType.cancellation.reasons
						? (0, emotion_react_jsx_runtime_browser_esm.BX)(
								emotion_react_jsx_runtime_browser_esm.HY,
								{
									children: [
										shouldUseProgressStepper
											? (0,
											  emotion_react_jsx_runtime_browser_esm.tZ)(
													ProgressStepper.S,
													{
														steps: [
															{
																isCurrentStep:
																	!0,
															},
															{},
															{},
															{},
														],
														additionalCSS: (0,
														emotion_react_browser_esm.iv)(
															'margin:',
															space.D[5],
															'px 0 ',
															space.D[12],
															'px;',
															'',
														),
													},
											  )
											: (0,
											  emotion_react_jsx_runtime_browser_esm.tZ)(
													ProgressIndicator.Y,
													{
														steps: [
															{
																title: 'Reason',
																isCurrentStep:
																	!0,
															},
															{ title: 'Review' },
															{
																title: 'Confirmation',
															},
														],
														additionalCSS: (0,
														emotion_react_browser_esm.iv)(
															'margin:',
															space.D[5],
															'px 0 ',
															space.D[12],
															'px;',
															'',
														),
													},
											  ),
										productType.cancellation.startPageBody(
											productDetail,
										),
										(0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											WithStandardTopMargin.z,
											{
												children: [
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'fieldset',
														{
															onChange: (
																event,
															) => {
																var target =
																	event.target;
																setSelectedReasonId(
																	target.value,
																);
															},
															css: (0,
															emotion_react_browser_esm.iv)(
																'border:1px solid ',
																palette.palette
																	.neutral[86],
																';margin:0 0 ',
																space.D[5],
																'px;padding:0;',
																'',
															),
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'legend',
																	{
																		css: (0,
																		emotion_react_browser_esm.iv)(
																			'display:block;width:100%;margin:0;padding:',
																			space
																				.D[3],
																			'px;float:left;background-color:',
																			palette
																				.palette
																				.neutral[97],
																			';border-bottom:1px solid ',
																			palette
																				.palette
																				.neutral[86],
																			';',
																			typography.Rcn,
																			' ',
																			mq
																				.Dp
																				.tablet,
																			'{padding:',
																			space
																				.D[3],
																			'px ',
																			space
																				.D[5],
																			'px;}',
																			'',
																		),
																		children:
																			'Please select a reason',
																	},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	RadioGroup.E,
																	{
																		name: 'issue_type',
																		orientation:
																			'vertical',
																		cssOverrides:
																			(0,
																			emotion_react_browser_esm.iv)(
																				'display:block;padding:',
																				space
																					.D[5],
																				'px;',
																				'',
																			),
																		children:
																			productType.cancellation.reasons.map(
																				(
																					reason,
																				) =>
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						Radio.Y,
																						{
																							name: 'cancellation-reason',
																							value: reason.reasonId,
																							label: reason.linkLabel,
																							cssOverrides:
																								_ref,
																						},
																						reason.reasonId,
																					),
																			),
																	},
																),
															],
														},
													),
													inValidationErrorState &&
														!selectedReasonId.length &&
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															InlineError.b,
															{
																cssOverrides:
																	(0,
																	emotion_react_browser_esm.iv)(
																		'padding:',
																		space
																			.D[5],
																		'px;margin-bottom:',
																		space
																			.D[4],
																		'px;border:4px solid ',
																		palette
																			.palette
																			.error[400],
																		';text-align:left;',
																		'',
																	),
																children:
																	'Please select a reason',
															},
														),
													chargedThroughDateStr &&
														(0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															emotion_react_jsx_runtime_browser_esm.HY,
															{
																children: [
																	(0,
																	emotion_react_jsx_runtime_browser_esm.BX)(
																		'fieldset',
																		{
																			onChange:
																				(
																					event,
																				) => {
																					'EndOfLastInvoicePeriod' ===
																					event
																						.target
																						.value
																						? setCancellationPolicy(
																								cancellationContexts.zc,
																						  )
																						: setCancellationPolicy(
																								cancellationContexts.I6,
																						  );
																				},
																			css: (0,
																			emotion_react_browser_esm.iv)(
																				'border:1px solid ',
																				palette
																					.palette
																					.neutral[86],
																				';margin:0 0 ',
																				space
																					.D[5],
																				'px;padding:0;',
																				'',
																			),
																			children:
																				[
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						'legend',
																						{
																							css: (0,
																							emotion_react_browser_esm.iv)(
																								'display:block;width:100%;margin:0;padding:',
																								space
																									.D[3],
																								'px;float:left;background-color:',
																								palette
																									.palette
																									.neutral[97],
																								';border-bottom:1px solid ',
																								palette
																									.palette
																									.neutral[86],
																								';',
																								typography.Rcn,
																								' ',
																								mq
																									.Dp
																									.tablet,
																								'{padding:',
																								space
																									.D[3],
																								'px ',
																								space
																									.D[5],
																								'px;}',
																								'',
																							),
																							children:
																								'When would you like your cancellation to become effective?',
																						},
																					),
																					(0,
																					emotion_react_jsx_runtime_browser_esm.BX)(
																						RadioGroup.E,
																						{
																							name: 'issue_type',
																							orientation:
																								'vertical',
																							cssOverrides:
																								(0,
																								emotion_react_browser_esm.iv)(
																									'display:block;padding:',
																									space
																										.D[5],
																									'px;',
																									'',
																								),
																							children:
																								[
																									(0,
																									emotion_react_jsx_runtime_browser_esm.tZ)(
																										Radio.Y,
																										{
																											name: 'effective-date',
																											value: 'EndOfLastInvoicePeriod',
																											label: 'On '.concat(
																												chargedThroughDateStr,
																												', which is the end of your current billing period (you should not be charged again)',
																											),
																										},
																									),
																									(0,
																									emotion_react_jsx_runtime_browser_esm.tZ)(
																										Radio.Y,
																										{
																											name: 'effective-date',
																											value: 'Today',
																											label: 'Today',
																										},
																									),
																								],
																						},
																					),
																				],
																		},
																	),
																	inValidationErrorState &&
																		!cancellationPolicy.length &&
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			InlineError.b,
																			{
																				cssOverrides:
																					(0,
																					emotion_react_browser_esm.iv)(
																						'padding:',
																						space
																							.D[5],
																						'px;margin-bottom:',
																						space
																							.D[4],
																						'px;border:4px solid ',
																						palette
																							.palette
																							.error[400],
																						';text-align:left;',
																						'',
																					),
																				children:
																					'Please select When would you like your cancellation to become effective?',
																			},
																		),
																],
															},
														),
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'div',
														{
															'data-cy':
																'cta_container',
															css: (0,
															emotion_react_browser_esm.iv)(
																{
																	display:
																		'flex',
																	justifyContent:
																		'space-between',
																	flexDirection:
																		'row-reverse',
																	[mq.C4
																		.mobileLandscape]:
																		{
																			flexDirection:
																				'column',
																		},
																},
																'',
																'',
															),
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'div',
																	{
																		css: _ref3,
																		children:
																			(0,
																			emotion_react_jsx_runtime_browser_esm.tZ)(
																				Button.z,
																				{
																					icon: (0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						SvgArrowRightStraight.l,
																						{},
																					),
																					iconSide:
																						'right',
																					onClick:
																						() => {
																							var canContinue =
																								!(
																									!selectedReasonId.length ||
																									(chargedThroughDateStr &&
																										!cancellationPolicy.length)
																								);
																							canContinue &&
																								navigate(
																									'review',
																									{
																										state: _objectSpread(
																											_objectSpread(
																												{},
																												routerState,
																											),
																											{},
																											{
																												selectedReasonId,
																												cancellationPolicy,
																											},
																										),
																									},
																								),
																								setInValidationErrorState(
																									!canContinue,
																								);
																						},
																					children:
																						'Continue',
																				},
																			),
																	},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'div',
																	{
																		children:
																			(0,
																			emotion_react_jsx_runtime_browser_esm.tZ)(
																				Button.z,
																				{
																					priority:
																						'tertiary',
																					onClick:
																						() => {
																							navigate(
																								'/',
																							);
																						},
																					children:
																						'Return to your account',
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
						  )
						: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
								GenericErrorScreen.c,
								{
									loggingMessage:
										"Got to the cancellation reasons selection page with a productType that doesn't have any cancellation reasons.",
								},
						  );
				};
			var ReasonPickerWithCancellationDate = (_ref4) => {
					var subscriptionName,
						{ productType, productDetail } = _ref4,
						{ data: cancellationDateResponse, loadingState } = (0,
						useAsyncLoader.c)(
							((subscriptionName =
								productDetail.subscription.subscriptionId),
							() =>
								(0, utilities_fetch.n4)(
									'/api/cancellation-date/' +
										subscriptionName,
									{
										headers: {
											[identity.h]: (0, identity.V)(
												window.location.href,
											),
										},
									},
								)),
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
								loadingMessage: 'Checking your '.concat(
									productType.shortFriendlyName ||
										productType.friendlyName,
									' details...',
								),
							},
						);
					if (null === cancellationDateResponse)
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							GenericErrorScreen.c,
							{},
						);
					var chargedThroughDateStr =
						(function getChargedThroughDateStr(
							cancellationDateResponse,
						) {
							if (
								'now' !==
									cancellationDateResponse.cancellationEffectiveDate &&
								void 0 !==
									cancellationDateResponse.cancellationEffectiveDate &&
								null !==
									cancellationDateResponse.cancellationEffectiveDate
							)
								return (0, dates.sG)(
									cancellationDateResponse.cancellationEffectiveDate,
								).dateStr(dates.Bn);
						})(cancellationDateResponse);
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						ReasonPicker,
						{ productType, productDetail, chargedThroughDateStr },
					);
				},
				CancellationReasonSelection = () => {
					var { productDetail, productType } = (0, react.useContext)(
						CancellationContainer.DW,
					);
					return productType.cancellation
						.startPageOfferEffectiveDateOptions
						? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
								ReasonPickerWithCancellationDate,
								{ productType, productDetail },
						  )
						: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
								ReasonPicker,
								{ productType, productDetail },
						  );
				},
				LinkButton = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/button/LinkButton.js',
				),
				CallCenterEmailAndNumbers = __webpack_require__(
					'./client/components/shared/CallCenterEmailAndNumbers.tsx',
				),
				NavConfig = __webpack_require__(
					'./client/components/shared/nav/NavConfig.tsx',
				),
				ProductDescriptionListTable = __webpack_require__(
					'./client/components/mma/shared/ProductDescriptionListTable.tsx',
				),
				ContactUsToCancel = (props) => {
					var subHeadingTitleCss = '\n\t\t'
							.concat(typography.Hu7, ';\n\t\t')
							.concat(
								mq.C4.tablet,
								' {\n\t\t\tfont-size: 1.25rem;\n\t\t\tline-height: 1.6;\n\t\t};\n\t',
							),
						subHeadingBorderTopCss = '\n\t\tborder-top: 1px solid '
							.concat(
								palette.palette.neutral[86],
								';\n\t\tmargin: 50px 0 ',
							)
							.concat(space.D[5], 'px;\n\t'),
						subHeadingCss = '\n\t\t'
							.concat(subHeadingBorderTopCss, '\n\t\t')
							.concat(subHeadingTitleCss, '\n\t');
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'h2',
									{
										css: (0, emotion_react_browser_esm.iv)(
											subHeadingCss,
											';',
											'',
										),
										children: 'Contact us to cancel',
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									ProductDescriptionListTable.M,
									{
										content: [
											{
												title: props.groupedProductType
													.showSupporterId
													? 'Supporter ID'
													: 'Subscription ID',
												value: props.subscriptionId,
											},
										],
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'p',
									{
										css: (0, emotion_react_browser_esm.iv)(
											typography.Kz0,
											';',
											'',
										),
										children:
											'Please contact our Customer Service team. You can find the contact details for your region below.',
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									CallCenterEmailAndNumbers.K,
									{
										hideEmailAddress:
											!props.selfServiceCancellation
												.shouldDisplayEmail,
										phoneRegionFilterKeys:
											props.selfServiceCancellation
												.phoneRegionsToDisplay,
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									LinkButton.Q,
									{
										cssOverrides: (0,
										emotion_react_browser_esm.iv)(
											'margin-top:',
											space.D[3],
											'px;',
											mq.Dp.tablet,
											'{margin-top:',
											space.D[5],
											'px;}',
											'',
										),
										href: NavConfig.qy.accountOverview.link,
										children: 'Return to your account',
									},
								),
							],
						},
					);
				};
			try {
				(ContactUsToCancel.displayName = 'ContactUsToCancel'),
					(ContactUsToCancel.__docgenInfo = {
						description: '',
						displayName: 'ContactUsToCancel',
						props: {
							selfServiceCancellation: {
								defaultValue: null,
								description: '',
								name: 'selfServiceCancellation',
								required: !0,
								type: { name: 'SelfServiceCancellation' },
							},
							subscriptionId: {
								defaultValue: null,
								description: '',
								name: 'subscriptionId',
								required: !0,
								type: { name: 'string' },
							},
							groupedProductType: {
								defaultValue: null,
								description: '',
								name: 'groupedProductType',
								required: !0,
								type: { name: 'GroupedProductType' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/cancel/ContactUsToCancel.tsx#ContactUsToCancel'
						] = {
							docgenInfo: ContactUsToCancel.__docgenInfo,
							name: 'ContactUsToCancel',
							path: 'client/components/mma/cancel/ContactUsToCancel.tsx#ContactUsToCancel',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			function CancellationJourneyFunnel_ownKeys(e, r) {
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
			function CancellationJourneyFunnel_objectSpread(e) {
				for (var r = 1; r < arguments.length; r++) {
					var t = null != arguments[r] ? arguments[r] : {};
					r % 2
						? CancellationJourneyFunnel_ownKeys(
								Object(t),
								!0,
						  ).forEach(function (r) {
								CancellationJourneyFunnel_defineProperty(
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
						: CancellationJourneyFunnel_ownKeys(Object(t)).forEach(
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
			function CancellationJourneyFunnel_defineProperty(obj, key, value) {
				return (
					(key = (function CancellationJourneyFunnel_toPropertyKey(
						arg,
					) {
						var key =
							(function CancellationJourneyFunnel_toPrimitive(
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
			var CancellationJourneyFunnel = () => {
					var _window$QuantumMetric,
						_productType$cancella,
						routerState = (0, react_router.TH)().state,
						productDetail = (0, react.useContext)(
							CancellationContainer.DW,
						).productDetail;
					if (!productDetail)
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							react_router.Fg,
							{ to: '/' },
						);
					var productType = (0, productResponse.Xn)(
							productDetail.tier,
						),
						productTypeKey = productType.productType,
						possiblePaidPlan =
							productDetail.subscription.currentPlans[0],
						qmEvent = [
							'cancellation start',
							productType.friendlyName,
							(0, productResponse.q4)(possiblePaidPlan) &&
								'billing period: '.concat(
									possiblePaidPlan.billingPeriod,
								),
						].filter(Boolean);
					return (
						null ===
							(_window$QuantumMetric = window.QuantumMetricAPI) ||
							void 0 === _window$QuantumMetric ||
							_window$QuantumMetric.sendEvent(
								184,
								0,
								qmEvent.join(' | '),
							),
						(null != routerState && routerState.dontShowOffer) ||
						!(function productHasEarlySaveJourney(productTypeKey) {
							return (
								'membership' === productTypeKey ||
								(featureSwitches.k.digisubSave &&
									'digipack' === productTypeKey)
							);
						})(productTypeKey)
							? productDetail.selfServiceCancellation.isAllowed &&
							  (0, productUtils.lj)(productType)
								? !(0, productUtils.lj)(productType) ||
								  (null !==
										(_productType$cancella =
											productType.cancellation) &&
										void 0 !== _productType$cancella &&
										_productType$cancella.reasons)
									? (0,
									  emotion_react_jsx_runtime_browser_esm.tZ)(
											CancellationReasonSelection,
											{},
									  )
									: (0,
									  emotion_react_jsx_runtime_browser_esm.tZ)(
											react_router.Fg,
											{
												to: './confirm',
												state: CancellationJourneyFunnel_objectSpread(
													{},
													routerState,
												),
											},
									  )
								: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
										ContactUsToCancel,
										{
											selfServiceCancellation:
												productDetail.selfServiceCancellation,
											subscriptionId:
												productDetail.subscription
													.subscriptionId,
											groupedProductType:
												productTypes.HP[
													productType
														.groupedProductType
												],
										},
								  )
							: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
									react_router.Fg,
									{
										to: './landing',
										state: CancellationJourneyFunnel_objectSpread(
											{},
											routerState,
										),
									},
							  )
					);
				},
				Spinner = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/spinner/Spinner.js',
				),
				react_router_dom = __webpack_require__(
					'./node_modules/react-router-dom/index.js',
				),
				supporterPlusPricing = __webpack_require__(
					'./client/utilities/pricingConfig/supporterPlusPricing.ts',
				),
				cancellationUtilsAndTypes = __webpack_require__(
					'./shared/cancellationUtilsAndTypes.ts',
				),
				generalTypes = __webpack_require__('./shared/generalTypes.ts'),
				styles_typography = __webpack_require__(
					'./client/styles/typography.ts',
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
			function useFetch_ownKeys(e, r) {
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
			function useFetch_objectSpread(e) {
				for (var r = 1; r < arguments.length; r++) {
					var t = null != arguments[r] ? arguments[r] : {};
					r % 2
						? useFetch_ownKeys(Object(t), !0).forEach(function (r) {
								useFetch_defineProperty(e, r, t[r]);
						  })
						: Object.getOwnPropertyDescriptors
						? Object.defineProperties(
								e,
								Object.getOwnPropertyDescriptors(t),
						  )
						: useFetch_ownKeys(Object(t)).forEach(function (r) {
								Object.defineProperty(
									e,
									r,
									Object.getOwnPropertyDescriptor(t, r),
								);
						  });
				}
				return e;
			}
			function useFetch_defineProperty(obj, key, value) {
				return (
					(key = (function useFetch_toPropertyKey(arg) {
						var key = (function useFetch_toPrimitive(input, hint) {
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
			function useFetch(url, options) {
				var cache = (0, react.useRef)({}),
					cancelRequest = (0, react.useRef)(!1),
					initialState = { error: void 0, data: void 0 },
					[state, dispatch] = (0, react.useReducer)(
						(state, action) => {
							switch (action.type) {
								case 'loading':
									return useFetch_objectSpread(
										{},
										initialState,
									);
								case 'fetched':
									return useFetch_objectSpread(
										useFetch_objectSpread({}, initialState),
										{},
										{ data: action.payload },
									);
								case 'error':
									return useFetch_objectSpread(
										useFetch_objectSpread({}, initialState),
										{},
										{ error: action.payload },
									);
								default:
									return state;
							}
						},
						initialState,
					);
				return (
					(0, react.useEffect)(() => {
						if (url) {
							var fetchData = (function () {
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
								})(function* () {
									if (
										(dispatch({ type: 'loading' }),
										cache.current[url])
									)
										dispatch({
											type: 'fetched',
											payload: cache.current[url],
										});
									else
										try {
											var response = yield fetch(
												url,
												options,
											);
											if (!response.ok)
												throw new Error(
													response.statusText,
												);
											var data = yield response.json();
											if (
												((cache.current[url] = data),
												cancelRequest.current)
											)
												return;
											dispatch({
												type: 'fetched',
												payload: data,
											});
										} catch (error) {
											if (cancelRequest.current) return;
											dispatch({
												type: 'error',
												payload: error,
											});
										}
								});
								return function fetchData() {
									return _ref.apply(this, arguments);
								};
							})();
							return (
								fetchData(),
								() => {
									cancelRequest.current = !0;
								}
							);
						}
					}, [url]),
					state
				);
			}
			var shared_Spinner = __webpack_require__(
					'./client/components/shared/Spinner.tsx',
				),
				Heading = __webpack_require__(
					'./client/components/mma/shared/Heading.tsx',
				),
				generateEscalationCausesList = (_) => [
					...(_.isEffectiveToday
						? ['Requested Effective Today']
						: []),
					...(_.hasOutstandingHolidayStops
						? ['Outstanding Holiday Stop Credits']
						: []),
					...(_.hasOutstandingDeliveryProblemCredits
						? ['Outstanding Delivery Problem Credits']
						: []),
				];
			try {
				(generateEscalationCausesList.displayName =
					'generateEscalationCausesList'),
					(generateEscalationCausesList.__docgenInfo = {
						description: '',
						displayName: 'generateEscalationCausesList',
						props: {
							isEffectiveToday: {
								defaultValue: null,
								description: '',
								name: 'isEffectiveToday',
								required: !0,
								type: { name: 'boolean' },
							},
							hasOutstandingHolidayStops: {
								defaultValue: null,
								description: '',
								name: 'hasOutstandingHolidayStops',
								required: !0,
								type: { name: 'boolean' },
							},
							hasOutstandingDeliveryProblemCredits: {
								defaultValue: null,
								description: '',
								name: 'hasOutstandingDeliveryProblemCredits',
								required: !0,
								type: { name: 'boolean' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/cancel/cancellationFlowEscalationCheck.tsx#generateEscalationCausesList'
						] = {
							docgenInfo:
								generateEscalationCausesList.__docgenInfo,
							name: 'generateEscalationCausesList',
							path: 'client/components/mma/cancel/cancellationFlowEscalationCheck.tsx#generateEscalationCausesList',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var AsyncLoader = __webpack_require__(
				'./client/components/mma/shared/AsyncLoader.tsx',
			);
			class CaseUpdateAsyncLoader extends AsyncLoader.y {}
			var getUpdateCasePromise = (
				isTestUser,
				loggingCodeSuffix,
				caseId,
				body,
			) =>
				(0, utilities_fetch.n4)('/api/case/' + caseId, {
					method: 'PATCH',
					body: JSON.stringify(body),
					headers: {
						'Content-Type': 'application/json',
						'x-logging-code-suffix': loggingCodeSuffix,
						[productResponse.l2]: ''.concat(isTestUser),
					},
				});
			try {
				(CaseUpdateAsyncLoader.displayName = 'CaseUpdateAsyncLoader'),
					(CaseUpdateAsyncLoader.__docgenInfo = {
						description: '',
						displayName: 'CaseUpdateAsyncLoader',
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
								type: {
									name: 'ReaderOnOK<CaseUpdateResponse>',
								},
							},
							shouldPreventRender: {
								defaultValue: null,
								description: '',
								name: 'shouldPreventRender',
								required: !1,
								type: {
									name: '((data: CaseUpdateResponse) => boolean)',
								},
							},
							render: {
								defaultValue: null,
								description: '',
								name: 'render',
								required: !0,
								type: {
									name: '(data: CaseUpdateResponse, reFetch: ReFetch) => ReactNode',
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
							'client/components/mma/cancel/caseUpdate.tsx#CaseUpdateAsyncLoader'
						] = {
							docgenInfo: CaseUpdateAsyncLoader.__docgenInfo,
							name: 'CaseUpdateAsyncLoader',
							path: 'client/components/mma/cancel/caseUpdate.tsx#CaseUpdateAsyncLoader',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			function CancellationReasonReview_ownKeys(e, r) {
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
			function CancellationReasonReview_objectSpread(e) {
				for (var r = 1; r < arguments.length; r++) {
					var t = null != arguments[r] ? arguments[r] : {};
					r % 2
						? CancellationReasonReview_ownKeys(
								Object(t),
								!0,
						  ).forEach(function (r) {
								CancellationReasonReview_defineProperty(
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
						: CancellationReasonReview_ownKeys(Object(t)).forEach(
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
			function CancellationReasonReview_defineProperty(obj, key, value) {
				return (
					(key = (function CancellationReasonReview_toPropertyKey(
						arg,
					) {
						var key =
							(function CancellationReasonReview_toPrimitive(
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
			function CancellationReasonReview_asyncGeneratorStep(
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
			function CancellationReasonReview_asyncToGenerator(fn) {
				return function () {
					var self = this,
						args = arguments;
					return new Promise(function (resolve, reject) {
						var gen = fn.apply(self, args);
						function _next(value) {
							CancellationReasonReview_asyncGeneratorStep(
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
							CancellationReasonReview_asyncGeneratorStep(
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
			var getPatchUpdateCaseFunc = (isTestUser, caseId, feedback) =>
					CancellationReasonReview_asyncToGenerator(function* () {
						return yield getUpdateCasePromise(
							isTestUser,
							'_FEEDBACK',
							caseId,
							{
								Description: feedback,
								Subject: 'Online Cancellation Query',
							},
						);
					}),
				CancellationReasonReview_ref = {
					name: 'ti75j2',
					styles: 'margin:0',
				},
				ContactUs = (reason) =>
					reason.hideContactUs
						? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
								emotion_react_jsx_runtime_browser_esm.HY,
								{},
						  )
						: (0, emotion_react_jsx_runtime_browser_esm.BX)('p', {
								css: CancellationReasonReview_ref,
								children: [
									'If you have any questions, feel free to',
									' ',
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										react_router_dom.rU,
										{
											to: '/help-centre#contact-options',
											css: (0,
											emotion_react_browser_esm.iv)(
												'text-decoration:underline;color:',
												palette.palette.brand[500],
												';',
												'',
											),
											children:
												'contact our support team',
										},
									),
									'.',
								],
						  }),
				CancellationReasonReview_ref3 = {
					name: '76andl',
					styles: 'font-size:1rem;font-weight:500',
				},
				_ref4 = { name: 'rhxkjj', styles: 'height:20px' },
				_ref5 = {
					name: 'vggpmy',
					styles: 'width:100%;font-size:inherit;font-family:inherit;border:1px black solid',
				},
				_ref6 = { name: '2qga7i', styles: 'text-align:right' },
				_ref7 = { name: 'iqoq9n', styles: 'margin-top:20px' },
				FeedbackFormAndContactUs = (props) => {
					var reason,
						[feedback, setFeedback] = (0, react.useState)(''),
						[hasHitSubmit, setHasHitSubmit] = (0, react.useState)(
							!1,
						),
						[
							inFeedbackValidationErrorState,
							setFeedbackValidationErrorState,
						] = (0, react.useState)(!1);
					return hasHitSubmit
						? (0, emotion_react_jsx_runtime_browser_esm.BX)(
								emotion_react_jsx_runtime_browser_esm.HY,
								{
									children: [
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											CaseUpdateAsyncLoader,
											{
												loadingMessage:
													'Storing your feedback...',
												fetch: getPatchUpdateCaseFunc(
													props.isTestUser,
													props.caseId,
													feedback,
												),
												render:
													((reason = props.reason),
													() =>
														(0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															'div',
															{
																css: (0,
																emotion_react_browser_esm.iv)(
																	{
																		marginLeft:
																			'15px',
																		marginTop:
																			'30px',
																		paddingLeft:
																			'15px',
																		borderLeft:
																			'1px solid ' +
																			palette
																				.palette
																				.neutral[60],
																	},
																	'',
																	'',
																),
																children: [
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'p',
																		{
																			css: CancellationReasonReview_ref3,
																			children:
																				reason.alternateFeedbackThankYouTitle ||
																				'Thank you for your feedback.',
																		},
																	),
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'span',
																		{
																			children:
																				reason.alternateFeedbackThankYouBody ||
																				'The Guardian is dedicated to keeping our independent, investigative journalism open to all. We report on the facts, challenging the powerful and holding them to account. Support from our readers makes what we do possible and we appreciate hearing from you to help improve our service.',
																		},
																	),
																],
															},
														)),
											},
										),
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'div',
											{ css: _ref4 },
										),
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											ConfirmCancellationAndReturnRow,
											{
												hide: !!props.reason
													.hideSaveActions,
												reasonId: props.reason.reasonId,
												productType: props.productType,
												caseId: props.caseId,
												holidayStops:
													props.holidayStops,
												deliveryCredits:
													props.deliveryCredits,
											},
										),
									],
								},
						  )
						: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
								emotion_react_jsx_runtime_browser_esm.HY,
								{
									children: (0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'div',
										{
											children: [
												!props.reason.hideContactUs &&
													!props.productType
														.cancellation
														.swapFeedbackAndContactUs &&
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														ContactUs,
														CancellationReasonReview_objectSpread(
															{},
															props.reason,
														),
													),
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'p',
													{
														children:
															props.reason
																.alternateFeedbackIntro ||
															'Alternatively provide feedback in the box below',
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'textarea',
													{
														rows: 5,
														maxLength:
															props.characterLimit,
														css: _ref5,
														onChange: (event) => {
															setFeedback(
																event.target
																	.value,
															),
																setFeedbackValidationErrorState(
																	!1,
																);
														},
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'div',
													{
														css: _ref6,
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'div',
																{
																	css: (0,
																	emotion_react_browser_esm.iv)(
																		typography.AjP,
																		';color:',
																		palette
																			.palette
																			.neutral[46],
																		';padding-bottom:10px;',
																		'',
																	),
																	children: [
																		'You have ',
																		props.characterLimit -
																			feedback.length,
																		' ',
																		'characters remaining',
																	],
																},
															),
															inFeedbackValidationErrorState &&
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	InlineError.b,
																	{
																		cssOverrides:
																			(0,
																			emotion_react_browser_esm.iv)(
																				'padding:',
																				space
																					.D[5],
																				'px;margin-bottom:',
																				space
																					.D[4],
																				'px;border:4px solid ',
																				palette
																					.palette
																					.error[400],
																				';text-align:left;',
																				'',
																			),
																		children:
																			'Please insert your feedback into the textbox before submitting. Otherwise select ‘Confirm cancellation’ to continue',
																	},
																),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																Button.z,
																{
																	priority:
																		'secondary',
																	onClick:
																		() => {
																			feedback.length &&
																				setHasHitSubmit(
																					!0,
																				),
																				setFeedbackValidationErrorState(
																					!feedback.length,
																				);
																		},
																	children:
																		'Submit feedback',
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																ConfirmCancellationAndReturnRow,
																{
																	hide: !!props
																		.reason
																		.hideSaveActions,
																	reasonId:
																		props
																			.reason
																			.reasonId,
																	productType:
																		props.productType,
																	caseId: props.caseId,
																	holidayStops:
																		props.holidayStops,
																	deliveryCredits:
																		props.deliveryCredits,
																	onClick:
																		() => {
																			feedback.length >
																				0 &&
																				getPatchUpdateCaseFunc(
																					props.isTestUser,
																					props.caseId,
																					feedback,
																				)();
																		},
																},
															),
															!props.reason
																.hideContactUs &&
																props
																	.productType
																	.cancellation
																	.swapFeedbackAndContactUs &&
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'div',
																	{
																		css: _ref7,
																		children:
																			(0,
																			emotion_react_jsx_runtime_browser_esm.tZ)(
																				ContactUs,
																				CancellationReasonReview_objectSpread(
																					{},
																					props.reason,
																				),
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
						  );
				},
				_ref10 = {
					name: 'refyz8',
					styles: 'text-align:right;margin-bottom:30px',
				},
				ConfirmCancellationAndReturnRow = (props) => {
					var routerState = (0, react_router.TH)().state,
						navigate = (0, react_router.s0)(),
						{ productDetail, productType } = (0, react.useContext)(
							CancellationContainer.DW,
						),
						isSupporterPlusAndFreePeriodOfferIsActive =
							featureSwitches.k.supporterplusCancellationOffer &&
							'supporterplus' === productType.productType,
						mainPlan = (0, productResponse.fr)(
							productDetail.subscription,
						),
						isAnnualBilling =
							(0, productResponse.q4)(mainPlan) &&
							'year' === mainPlan.billingPeriod,
						isAnnualContributionAndDiscountIsActive =
							'contributions' === productType.productType &&
							isAnnualBilling,
						isContributionAndBreakFeatureIsActive =
							!isAnnualContributionAndDiscountIsActive &&
							featureSwitches.k.contributionCancellationPause &&
							'contributions' === productType.productType,
						[
							showAlternativeBeforeCancelling,
							setShowAlternativeBeforeCancelling,
						] = (0, react.useState)(
							!!(
								isSupporterPlusAndFreePeriodOfferIsActive ||
								isAnnualContributionAndDiscountIsActive ||
								isContributionAndBreakFeatureIsActive
							) && 'pending',
						),
						[discountPreviewDetails, setDiscountPreviewDetails] =
							(0, react.useState)(null),
						[
							switchDiscountPreviewDetails,
							setSwitchDiscountPreviewDetails,
						] = (0, react.useState)(null),
						productHasAlternativeRecommendation =
							'supporterplus' === productType.productType ||
							'contributions' === productType.productType;
					return (
						(0, react.useEffect)(() => {
							if (
								isSupporterPlusAndFreePeriodOfferIsActive ||
								isContributionAndBreakFeatureIsActive
							)
								CancellationReasonReview_asyncToGenerator(
									function* () {
										try {
											var response = yield (0,
											utilities_fetch.n4)(
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
												var sanitizedOfferData = ((
													offerData,
												) =>
													offerData.upToPeriodsType
														? CancellationReasonReview_objectSpread(
																CancellationReasonReview_objectSpread(
																	{},
																	offerData,
																),
																{},
																{
																	upToPeriodsType:
																		(0,
																		generalTypes.T)(
																			offerData.upToPeriodsType,
																			offerData.upToPeriods,
																		),
																},
														  )
														: offerData)(
													yield response.json(),
												);
												setDiscountPreviewDetails(
													sanitizedOfferData,
												);
											} else
												setShowAlternativeBeforeCancelling(
													!1,
												);
										} catch (_unused) {
											setShowAlternativeBeforeCancelling(
												!1,
											);
										}
									},
								)();
							else if (isAnnualContributionAndDiscountIsActive) {
								var supporterplusThreshold = (0,
								supporterPlusPricing.s)(
									mainPlan.currencyISO,
									mainPlan.billingPeriod,
								);
								CancellationReasonReview_asyncToGenerator(
									function* () {
										try {
											var response = yield (0,
											productUtils.iY)(
												productDetail.subscription
													.subscriptionId,
												supporterplusThreshold,
												'recurring-contribution-to-supporter-plus',
												!0,
												productDetail.isTestUser,
											);
											if (response.ok) {
												setShowAlternativeBeforeCancelling(
													!0,
												);
												var offerData =
													yield response.json();
												setSwitchDiscountPreviewDetails(
													offerData,
												);
											} else
												setShowAlternativeBeforeCancelling(
													!1,
												);
										} catch (_unused2) {
											setShowAlternativeBeforeCancelling(
												!1,
											);
										}
									},
								)();
							}
						}, [
							isContributionAndBreakFeatureIsActive,
							isSupporterPlusAndFreePeriodOfferIsActive,
							isAnnualContributionAndDiscountIsActive,
							productDetail.subscription.subscriptionId,
							mainPlan,
							productDetail.isTestUser,
						]),
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							emotion_react_jsx_runtime_browser_esm.HY,
							{
								children:
									!props.hide &&
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'div',
										{
											css: (0,
											emotion_react_browser_esm.iv)(
												{
													display: 'flex',
													justifyContent:
														'space-between',
													flexDirection:
														'row-reverse',
													marginTop: '10px',
													textAlign: 'left',
													[mq.C4.mobileLandscape]: {
														flexDirection: 'column',
													},
												},
												'',
												'',
											),
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'div',
													{
														css: _ref10,
														children: (0,
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
																		: (0,
																		  emotion_react_jsx_runtime_browser_esm.tZ)(
																				SvgArrowRightStraight.l,
																				{},
																		  ),
																iconSide:
																	'right',
																disabled:
																	'pending' ===
																	showAlternativeBeforeCancelling,
																'aria-disabled':
																	'pending' ===
																	showAlternativeBeforeCancelling,
																onClick: () => {
																	if (
																		(props.onClick &&
																			props.onClick(),
																		showAlternativeBeforeCancelling)
																	) {
																		var cancelAlternativeUrlPart =
																			(0,
																			cancellationUtilsAndTypes.e)(
																				isSupporterPlusAndFreePeriodOfferIsActive,
																				isContributionAndBreakFeatureIsActive,
																				isAnnualContributionAndDiscountIsActive,
																			);
																		navigate(
																			'../'.concat(
																				cancelAlternativeUrlPart,
																			),
																			{
																				state: CancellationReasonReview_objectSpread(
																					CancellationReasonReview_objectSpread(
																						CancellationReasonReview_objectSpread(
																							{},
																							routerState,
																						),
																						isAnnualContributionAndDiscountIsActive
																							? switchDiscountPreviewDetails
																							: discountPreviewDetails,
																					),
																					{},
																					{
																						caseId: props.caseId,
																						holidayStops:
																							props.holidayStops,
																						deliveryCredits:
																							props.deliveryCredits,
																					},
																				),
																			},
																		);
																	} else
																		navigate(
																			productHasAlternativeRecommendation
																				? '../confirm'
																				: '../confirmed',
																			{
																				state: CancellationReasonReview_objectSpread(
																					CancellationReasonReview_objectSpread(
																						{},
																						routerState,
																					),
																					{},
																					{
																						eligibleForFreePeriodOffer:
																							!1,
																						caseId: props.caseId,
																						holidayStops:
																							props.holidayStops,
																						deliveryCredits:
																							props.deliveryCredits,
																					},
																				),
																			},
																		);
																},
																children:
																	productHasAlternativeRecommendation
																		? 'Continue to cancellation'
																		: 'Confirm cancellation',
															},
														),
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'div',
													{
														children: (0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															Button.z,
															{
																priority:
																	'tertiary',
																onClick: () =>
																	navigate(
																		'/',
																	),
																children:
																	'Return to your account',
															},
														),
													},
												),
											],
										},
									),
							},
						)
					);
				},
				CancellationReasonReview = () => {
					var routerState = (0, react_router.TH)().state,
						{ productDetail, productType } = (0, react.useContext)(
							CancellationContainer.DW,
						);
					return null != routerState &&
						routerState.selectedReasonId &&
						null != productType &&
						productType.cancellation.reasons
						? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
								ValidatedCancellationReasonReview,
								{ productDetail, productType },
						  )
						: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
								react_router.Fg,
								{ to: '..' },
						  );
				},
				ValidatedCancellationReasonReview = (_ref11) => {
					var _productDetail$subscr,
						_cancellationCaseFetc,
						_holidayStopCreditFet,
						_deliveryProblemCredi,
						_holidayStopCreditFet2,
						_deliveryProblemCredi2,
						_holidayStopCreditFet3,
						_deliveryProblemCredi3,
						_holidayStopCreditFet4,
						_deliveryProblemCredi4,
						_holidayStopCreditFet5,
						_deliveryProblemCredi5,
						{ productDetail, productType } = _ref11,
						routerState = (0, react_router.TH)().state,
						{ selectedReasonId, cancellationPolicy } = routerState,
						reason = productType.cancellation.reasons.find(
							(reason) => reason.reasonId === selectedReasonId,
						),
						effectiveCancellationDate =
							null !==
								(_productDetail$subscr =
									productDetail.subscription) &&
							void 0 !== _productDetail$subscr &&
							_productDetail$subscr.chargedThroughDate &&
							cancellationPolicy !== cancellationContexts.I6
								? (0, dates.sG)(
										productDetail.subscription
											.chargedThroughDate,
								  )
								: (0, dates.sG)(),
						holidayStopCreditApiUrl =
							productType.cancellation
								.checkForOutstandingCredits &&
							'/api/holidays/'
								.concat(
									productDetail.subscription.subscriptionId,
									'/cancel?effectiveCancellationDate=',
								)
								.concat(
									effectiveCancellationDate.dateStr(dates.U5),
								),
						deliveryProblemCreditApiUrl =
							productType.cancellation
								.checkForOutstandingCredits &&
							'/api/delivery-records/'
								.concat(
									productDetail.subscription.subscriptionId,
									'/cancel?effectiveCancellationDate=',
								)
								.concat(
									effectiveCancellationDate.dateStr(dates.U5),
								),
						holidayStopCreditFetch = useFetch(
							holidayStopCreditApiUrl,
							{
								headers: {
									[productResponse.l2]: ''.concat(
										productDetail.isTestUser,
									),
								},
							},
						),
						deliveryProblemCreditFetch = useFetch(
							deliveryProblemCreditApiUrl,
							{
								headers: {
									[productResponse.l2]: ''.concat(
										productDetail.isTestUser,
									),
								},
							},
						),
						cancellationCaseFetch = useFetch('/api/case', {
							method: 'POST',
							body: JSON.stringify({
								reason: selectedReasonId,
								product: productType.cancellation.sfCaseProduct,
								subscriptionName:
									productDetail.subscription.subscriptionId,
								gaData: '',
							}),
							headers: {
								'Content-Type': 'application/json',
								[productResponse.l2]: ''.concat(
									productDetail.isTestUser,
								),
							},
						}),
						caseId =
							(null ===
								(_cancellationCaseFetc =
									cancellationCaseFetch.data) ||
							void 0 === _cancellationCaseFetc
								? void 0
								: _cancellationCaseFetc.id) || '',
						loadingHasFailed =
							(productType.cancellation
								.checkForOutstandingCredits &&
								holidayStopCreditFetch.error) ||
							deliveryProblemCreditFetch.error ||
							cancellationCaseFetch.error,
						needsCancellationEscalation = ((
							holidayStops,
							deliveryCredits,
							cancellationPolicy,
						) =>
							generateEscalationCausesList({
								isEffectiveToday:
									cancellationPolicy ===
									cancellationContexts.I6,
								hasOutstandingHolidayStops:
									!!holidayStops && holidayStops.length > 0,
								hasOutstandingDeliveryProblemCredits:
									!!deliveryCredits &&
									deliveryCredits.length > 0,
							}).length > 0)(
							null ===
								(_holidayStopCreditFet =
									holidayStopCreditFetch.data) ||
								void 0 === _holidayStopCreditFet
								? void 0
								: _holidayStopCreditFet.publicationsToRefund,
							null ===
								(_deliveryProblemCredi =
									deliveryProblemCreditFetch.data) ||
								void 0 === _deliveryProblemCredi
								? void 0
								: _deliveryProblemCredi.results,
							routerState.cancellationPolicy,
						),
						renderSaveBody = (
							saveBody,
							caseId,
							holidayStops,
							deliveryCredits,
						) => {
							if (saveBody.length && 'object' == typeof saveBody)
								return (
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										emotion_react_jsx_runtime_browser_esm.HY,
										{
											children: saveBody.map(
												(saveBodyParagraph, index) =>
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'p',
														{
															children:
																saveBodyParagraph,
														},
														'save_body_'.concat(
															index,
														),
													),
											),
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'p',
										{ id: 'save_body', children: saveBody },
									)
								);
							var SaveBody = saveBody;
							return (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								SaveBody,
								{ caseId, holidayStops, deliveryCredits },
							);
						},
						shouldUseProgressStepper =
							(featureSwitches.k.supporterplusCancellationOffer &&
								'supporterplus' === productType.productType) ||
							(featureSwitches.k.contributionCancellationPause &&
								'contributions' === productType.productType);
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: [
								shouldUseProgressStepper
									? (0,
									  emotion_react_jsx_runtime_browser_esm.tZ)(
											ProgressStepper.S,
											{
												steps: [
													{},
													{ isCurrentStep: !0 },
													{},
													{},
												],
												additionalCSS: (0,
												emotion_react_browser_esm.iv)(
													'margin:',
													space.D[5],
													'px 0 ',
													space.D[12],
													'px;',
													'',
												),
											},
									  )
									: (0,
									  emotion_react_jsx_runtime_browser_esm.tZ)(
											ProgressIndicator.Y,
											{
												steps: [
													{ title: 'Reason' },
													{
														title: 'Review',
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
													'px;',
													'',
												),
											},
									  ),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									WithStandardTopMargin.z,
									{
										children: [
											(!productType.cancellation
												.checkForOutstandingCredits ||
												(holidayStopCreditFetch.data &&
													deliveryProblemCreditFetch.data)) &&
											cancellationCaseFetch.data
												? (0,
												  emotion_react_jsx_runtime_browser_esm.BX)(
														emotion_react_jsx_runtime_browser_esm.HY,
														{
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	Heading.X,
																	{
																		cssOverrides:
																			[
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
																		children:
																			[
																				productType
																					.cancellation
																					.hideReasonTitlePrefix
																					? ''
																					: 'Reason: ',
																				reason.saveTitle ||
																					reason.linkLabel,
																			],
																	},
																),
																needsCancellationEscalation &&
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'p',
																		{
																			children:
																				'Once you submit your cancellation request our customer service team will try their best to contact you as soon as possible to confirm the cancellation and refund any credit you are owed.',
																		},
																	),
																reason.saveBody &&
																	renderSaveBody(
																		reason.saveBody,
																		caseId,
																		null ===
																			(_holidayStopCreditFet2 =
																				holidayStopCreditFetch.data) ||
																			void 0 ===
																				_holidayStopCreditFet2
																			? void 0
																			: _holidayStopCreditFet2.publicationsToRefund,
																		null ===
																			(_deliveryProblemCredi2 =
																				deliveryProblemCreditFetch.data) ||
																			void 0 ===
																				_deliveryProblemCredi2
																			? void 0
																			: _deliveryProblemCredi2.results,
																	),
																needsCancellationEscalation &&
																	reason.escalationSaveBody &&
																	renderSaveBody(
																		reason.escalationSaveBody,
																		caseId,
																		null ===
																			(_holidayStopCreditFet3 =
																				holidayStopCreditFetch.data) ||
																			void 0 ===
																				_holidayStopCreditFet3
																			? void 0
																			: _holidayStopCreditFet3.publicationsToRefund,
																		null ===
																			(_deliveryProblemCredi3 =
																				deliveryProblemCreditFetch.data) ||
																			void 0 ===
																				_deliveryProblemCredi3
																			? void 0
																			: _deliveryProblemCredi3.results,
																	),
																caseId &&
																!reason.skipFeedback
																	? (0,
																	  emotion_react_jsx_runtime_browser_esm.tZ)(
																			FeedbackFormAndContactUs,
																			{
																				characterLimit: 2500,
																				caseId,
																				holidayStops:
																					null ===
																						(_holidayStopCreditFet4 =
																							holidayStopCreditFetch.data) ||
																					void 0 ===
																						_holidayStopCreditFet4
																						? void 0
																						: _holidayStopCreditFet4.publicationsToRefund,
																				deliveryCredits:
																					null ===
																						(_deliveryProblemCredi4 =
																							deliveryProblemCreditFetch.data) ||
																					void 0 ===
																						_deliveryProblemCredi4
																						? void 0
																						: _deliveryProblemCredi4.results,
																				reason,
																				productType,
																				isTestUser:
																					productDetail.isTestUser,
																			},
																	  )
																	: (0,
																	  emotion_react_jsx_runtime_browser_esm.BX)(
																			'div',
																			{
																				css: (0,
																				emotion_react_browser_esm.iv)(
																					{
																						display:
																							'flex',
																						flexDirection:
																							productType
																								.cancellation
																								.swapFeedbackAndContactUs &&
																							caseId
																								? 'column-reverse'
																								: 'column',
																					},
																					'',
																					'',
																				),
																				children:
																					[
																						(0,
																						emotion_react_jsx_runtime_browser_esm.tZ)(
																							ContactUs,
																							CancellationReasonReview_objectSpread(
																								{},
																								reason,
																							),
																						),
																						(0,
																						emotion_react_jsx_runtime_browser_esm.tZ)(
																							ConfirmCancellationAndReturnRow,
																							{
																								hide: !!reason.hideSaveActions,
																								reasonId:
																									reason.reasonId,
																								productType,
																								caseId,
																								holidayStops:
																									null ===
																										(_holidayStopCreditFet5 =
																											holidayStopCreditFetch.data) ||
																									void 0 ===
																										_holidayStopCreditFet5
																										? void 0
																										: _holidayStopCreditFet5.publicationsToRefund,
																								deliveryCredits:
																									null ===
																										(_deliveryProblemCredi5 =
																											deliveryProblemCreditFetch.data) ||
																									void 0 ===
																										_deliveryProblemCredi5
																										? void 0
																										: _deliveryProblemCredi5.results,
																							},
																						),
																					],
																			},
																	  ),
															],
														},
												  )
												: !loadingHasFailed &&
												  (0,
												  emotion_react_jsx_runtime_browser_esm.tZ)(
														shared_Spinner.$,
														{
															loadingMessage:
																'Checking details',
														},
												  ),
											loadingHasFailed &&
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													GenericErrorScreen.c,
													{
														loggingMessage:
															'Cancel journey case id, holiday stop credits or delivery problem credits api call failed during the cancellation process',
													},
												),
										],
									},
								),
							],
						},
					);
				},
				SvgInfoRound = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgInfoRound.js',
				),
				getMaxNonDiscountedPrice = (
					nonDiscountedPayments,
					asHumanReadable,
				) => {
					var allNonDiscountedAmounts = nonDiscountedPayments.map(
							(p) => p.amount,
						),
						maxNonDiscountedPrice = Math.max(
							...allNonDiscountedAmounts,
						);
					return asHumanReadable
						? Number.isInteger(maxNonDiscountedPrice)
							? maxNonDiscountedPrice
							: maxNonDiscountedPrice.toFixed(2)
						: maxNonDiscountedPrice;
				},
				BenefitsSection = __webpack_require__(
					'./client/components/mma/shared/benefits/BenefitsSection.tsx',
				),
				SvgRoundelBrand = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/brand/SvgRoundelBrand.js',
				),
				externalLinks = __webpack_require__(
					'./shared/externalLinks.ts',
				),
				AndroidPlayStoreButton = __webpack_require__(
					'./client/components/mma/shared/assets/AndroidPlayStoreButton.tsx',
				),
				AppleAppStoreButton = __webpack_require__(
					'./client/components/mma/shared/assets/AppleAppStoreButton.tsx',
				),
				appAdCss = (0, emotion_react_browser_esm.iv)(
					'background-color:',
					palette.palette.sport[800],
					';padding:',
					space.D[3],
					'px ',
					space.D[3],
					'px ',
					space.D[5],
					'px;h4{',
					typography.Rcn,
					';margin:0 ',
					space.D[5],
					'px 0 0;}p{margin:',
					space.D[1],
					'px ',
					space.D[5],
					'px 0 0;}',
					mq.Dp.tablet,
					'{padding:',
					space.D[6],
					'px ',
					space.D[12],
					'px ',
					space.D[6],
					'px ',
					space.D[6],
					'px;}',
					'',
				),
				inlineContentsCss = (0, emotion_react_browser_esm.iv)(
					'display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:',
					space.D[4],
					'px;',
					'',
				),
				appIconContainerCss = (0, emotion_react_browser_esm.iv)(
					'width:55px;min-width:55px;height:55px;border-radius:10px;background-color:',
					palette.palette.brand[400],
					';',
					mq.Dp.tablet,
					'{width:70px;min-width:70px;height:70px;}',
					'',
				),
				DownloadAppCta = (props) =>
					(0, emotion_react_jsx_runtime_browser_esm.BX)('div', {
						css: [appAdCss, props.additionalCss, '', ''],
						children: [
							(0, emotion_react_jsx_runtime_browser_esm.BX)(
								'div',
								{
									css: inlineContentsCss,
									children: [
										(0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											'div',
											{
												children: [
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'h4',
														{
															children:
																"If you haven't already, download the Guardian App",
														},
													),
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'p',
														{
															children:
																'Unlock limitless Guardian journalism in our quality news app today.',
														},
													),
												],
											},
										),
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'i',
											{
												css: appIconContainerCss,
												children: (0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													SvgRoundelBrand.T,
													{},
												),
											},
										),
									],
								},
							),
							(0, emotion_react_jsx_runtime_browser_esm.BX)(
								'div',
								{
									children: [
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											AppleAppStoreButton.G,
											{
												link: externalLinks.pt,
												overrideButtonHeight: '36px',
												additionalCss: (0,
												emotion_react_browser_esm.iv)(
													'margin-right:',
													space.D[3],
													'px;',
													'',
												),
											},
										),
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											AndroidPlayStoreButton.A,
											{
												link: externalLinks.vW,
												overrideButtonHeight: '36px',
											},
										),
									],
								},
							),
						],
					});
			try {
				(DownloadAppCta.displayName = 'DownloadAppCta'),
					(DownloadAppCta.__docgenInfo = {
						description: '',
						displayName: 'DownloadAppCta',
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
							'client/components/mma/shared/DownloadAppCta.tsx#DownloadAppCta'
						] = {
							docgenInfo: DownloadAppCta.__docgenInfo,
							name: 'DownloadAppCta',
							path: 'client/components/mma/shared/DownloadAppCta.tsx#DownloadAppCta',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var FeastAppIcon = (props) =>
				(0, emotion_react_jsx_runtime_browser_esm.BX)('svg', {
					viewBox: '0 0 300 300',
					fill: 'none',
					css: props.additionalCss,
					children: [
						(0, emotion_react_jsx_runtime_browser_esm.BX)('g', {
							clipPath: 'url(#a)',
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'mask',
									{
										id: 'b',
										width: '300',
										height: '300',
										x: '0',
										y: '0',
										maskUnits: 'userSpaceOnUse',
										children: (0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'path',
											{
												fill: '#fff',
												d: 'M260 0H40A40 40 0 0 0 0 40v220a40 40 0 0 0 40 40h220a40 40 0 0 0 40-40V40a40 40 0 0 0-40-40Z',
											},
										),
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'g',
									{
										mask: 'url(#b)',
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'path',
												{
													fill: '#F2F2E9',
													d: 'M300 0H0v300h300V0Z',
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'mask',
												{
													id: 'c',
													width: '215',
													height: '307',
													x: '42',
													y: '-35',
													maskUnits: 'userSpaceOnUse',
													children: (0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'path',
														{
															fill: '#fff',
															d: 'M257-34.8H42v306.09h215v-306.1Z',
														},
													),
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'g',
												{
													mask: 'url(#c)',
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'path',
															{
																fill: '#5FA7BE',
																d: 'M183.95 200.2c.94-3.22 1.68-6.67 2.72-9.51 1.03-2.81 2.4-5.44 4-7.93.19-3.86.35-7.72.54-11.53.53-11.42.97-23 .98-34.48.03-21.56.78-49.82 1.61-70.44-2.26-1.62-5.58 1.05-5.72-1.85-.08-1.84 3.28-.82 4.97-1.98.83-3.4 1.66-8.07 1.31-11.63-1.12-.62-3.36.73-5.03.2-3.59-1.13-4.72-9.18-4.43-14.07.18-2.98 1.25-7.65 2.22-11.08 3.07-10.84 9.21-21.19 8.34-36.26-.4-6.83-2.7-12.77-6.3-16.38-4.63-4.62-19.6-9.93-25.02-1.96a97.26 97.26 0 0 0-1.02 19.05c.5 12.5.06 25.36.66 38.27.59 12.68-1.2 25.56.33 37.7 1.23 9.8.79 20.89.67 31.44-.1 9.73.09 19.54 0 29.1-.2 18.63-1.3 37.35-1.85 55.43 5.87 14.83 9.28 31.16 3.58 48.63a82.86 82.86 0 0 1-4.42 11.19c0 7.49.15 14.93.21 22.33 4.96-1.24 6.84-4.72 9.46-8.4 3.26-4.6 6.09-10.17 8.4-15.62.09-9.33-.11-19.4 1.42-29.7.5-3.4 1.4-7.17 2.37-10.52Zm-16.9-134.6c-.24-.24-.34-.64-.34-1.17 1.72-.32 4.59.03 6.83.03 4.41 0 9.21-1.15 12.21.99-5.59 1.3-13.2.17-18.7.16Z',
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'path',
															{
																fill: '#5FA7BE',
																d: 'M162.48 224.65c-.2 4-.3 8-.35 11.98a52.3 52.3 0 0 0 4.06-16.75c.8-10.4.03-22.3-3.4-32.22-.18 12.48.31 24.79-.31 36.99Z',
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'path',
															{
																fill: '#BB3B80',
																d: 'M256.65 215.13c.36-17.94-3.61-30.72-11.9-39.75-4.3-4.7-10.72-8.63-13.93-14.26-2.13-3.77-2.64-9.74-3.06-15.29-1.46-19.56.11-42.1.67-61.14.42-.3 3.43.37 4.41-.35a14.55 14.55 0 0 0 2.26-4.86c-.47-7.6-.2-15.24.36-22.89-.17-2.67-.3-5.24-.25-7.58.3-14.72 1.55-30.4 2.45-45.27.05-1.88.09-3.76.1-5.64-.18-4.04-.37-8.08-.52-12.15a128.6 128.6 0 0 1-.09-6.52 30.83 30.83 0 0 1-5.33-4.1c-6.9-2.4-16.47-1.88-23.32.34-.14 4.7-.06 9.43-.58 14.05-.04 3.24-.2 6.51-.23 9.7-.3 23.97-.81 45.67-1.69 66.59-.24 5.9-1.47 11.53-.67 16.98 1.97 1.82 4.55 2.23 6.8 3.06 1.74 26.17 1.62 55.9-6.1 78.8-4.74 5.06-10.9 10.89-15.36 17.9-.93 18.4-2.46 36.99-8.72 53.28-.55 1.44-1.15 2.9-1.78 4.38-.04 5.23-.17 10.24-.74 14.92-.58 4.74 2.87 5.52 4.97 8.63 4.74 7.08 15 3.73 25.37 4.6 6.1-.96 6.35-.89 19.5-.4 2.05.08 6.47-.34 8.38-.72 19.28-3.74 19.3-13.26 19.35-31.85.02-6.72-.48-13.77-.34-20.46Zm-56.6 34.66c-.4.06-.61-.07-.69-.33-2.58-9.12-1.56-19.72.34-28.88 2.03 2.44 2 6.75 2.04 9.85a99.67 99.67 0 0 1-1.7 19.37Zm6.1-41.44c-3.82-6.38-.75-15.42.67-22.08 3.53 5.57.9 17.2-.67 22.08Zm8.84 38.38c-.38 4.14-1.17 7.81-2.72 10.88-.27-.18-.55-.36-1.02-.34-4.72-11.34-.72-28.09 2.37-38.73 1.97 6.95 2.22 18.94 1.36 28.2Zm4.4-37.36c-4.28-6.02-2.38-18.21.34-24.8 2.57 6.3 2.72 18.65-.34 24.8Zm6.13 46.88h-.68c-1.85-1.57-2.44-5.08-2.72-7.48-1.15-10.03 1.41-21.6 4.07-29.89 1.64 2.83 1.64 6.85 1.7 10.53.14 9.17-.63 19.5-2.37 26.84Zm7.8-48.59c-4.9-6.16-2.07-17.88-.69-25.47 3.23 6.83 1.87 17.88.7 25.47Zm4.09 42.8c-.4.06-.61-.07-.69-.33a52.23 52.23 0 0 1-1.36-14.95c.4-6.58.95-13.96 4.07-18.34.74 12.75 1.16 22.05-2.02 33.62Z',
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'path',
															{
																fill: '#462861',
																d: 'M190.66 182.76a40.4 40.4 0 0 0-3.99 7.93c-1.04 2.84-1.78 6.3-2.71 9.5a82.5 82.5 0 0 0-2.38 10.54c-1.53 10.3-1.33 20.36-1.4 29.7.62-1.49 1.22-2.96 1.77-4.4 6.26-16.28 7.8-34.87 8.72-53.28v.01Z',
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'path',
															{
																fill: '#BED01E',
																d: 'M130.08 264.11c-1.37-1.88-5.41-1.14-6.77-3.04.39-1 1.19.48 2.97.45 5.34-.06 12.56-6.74 15.4-10.89 10.25-14.96 14.26-36.18 9.08-58.94-1-4.38-2.5-7.6-3.69-13.2-4.45-20.89-12.6-41.23-12.58-59.17 2.53 21.56 13.5 36.13 21.13 53.3 1.75 3.92 4.16 7.67 5.84 11.52.49 1.14.93 2.3 1.34 3.5.03-1.43.05-2.86.1-4.3l.03-1.05c-4.05-10.24-9.28-19.75-13.5-28.43-7.13-14.68-12.31-29.4-13.54-47.27.59-.68 3.2.74 4.25-.39.04-3.08.57-7.7-.3-11.47 1.01-2.27 2.63-4.15 1.76-7.2 17.4-33.48 13.2-90-2.18-121.92-5.66.1-14.1-2.17-17.45 2.8-1.53 2.28-1.42 6.47-2.64 9.74-.6 1.62-1.77 2.93-2.16 4.23-7.6 24.94-7.84 58.22-5.55 87.02.3 3.77.78 8.18 1.6 11.48.94 3.83 3.2 7.16 3.28 11.08.1 4.63-2.02 9.86-2.26 13.56 1.35 2.1 4.03-1.26 5.1.9-1.95 18.44-9.26 34.67-16.64 49.1a36.95 36.95 0 0 1-3.16 4.99c.79.5 1.56 1.02 2.32 1.53a42 42 0 0 0 3.38-5.2c1.69-3.22 2.94-7.19 4.78-10.58 5.39-9.97 9.12-24.23 11.4-36.41-.73 19.97-5.77 39.87-11.57 58.7a35 35 0 0 1 2.12 2.38c5.93-19.68 11.7-40.52 12.45-64.03.11-2.49-2.48-.43-2.52-2.15.07-1.78 3.26-.39 4.68-.8-.76 11.08-3.35 21.88-4.58 33.51-.7 6.52-.15 13.84-.64 21.23-.53 8.13-1.87 16.47-3.17 24.83a55.52 55.52 0 0 1 1.6 12.52c.27-2.39.55-4.78.85-7.2 3.5-28.27 3.1-57.27 7.61-82.31 1.05-1.11-1.08-2.79 1.3-2.54 2.22.65 1.56 6.91-.07 7.64-1.9 16.87-3.8 32.63-3.04 49.24.5 11.16 3.43 22.03 4.77 32.75 1.38 11.05 2.6 21.95 2.23 32.72-.4 11.61-5.12 23.1-9.67 33.04-.35-.09-.42-.43-.85-.43-.38-8.42-3.06-16.54-4-25.1-.63-5.67-.79-11.45-.63-17.34l-.25 1.7a99.35 99.35 0 0 1-2.14 10.33c.72 10 1.82 20.06 4.5 27.83.22.34.43.7.4 1.28l-.84-.01c-4.12-.09-6.36-4.44-8.42-7.31-.8-1.1-1.69-2.27-2.57-3.46l-.26.51c-.44.84-.84 1.7-1.23 2.57a70.82 70.82 0 0 0 8.63 10.19c1.5.77 4.44.13 5.94.9-1.16.97-2.96 1.27-3.85 2.52-6.83.68-12.57-.58-17.24-3.05-.67.77-1.38 1.55-2.12 2.31a22.36 22.36 0 0 0 8.3 3.18c5.46.9 9.89-.6 16.15-1.11 3.62-.3 4.65.82 8.49.5 12.21-.97 24.98-13.99 29.52-21.79.27-.46.54-.96.81-1.5 0-1.82.01-3.65.03-5.47-5.95 13.8-17.7 23.55-32.04 27.47l-.02.01Zm.6-146.1c3.27 22.63 7.7 45.1 14.63 66.41 1.8 5.52 4.38 10.1 5.36 16.62.6 3.97-.86 9.46-.56 14 .37 5.7.37 11.66-1.88 17.83a55.14 55.14 0 0 1-20.65 26.98c-.37.07-.4-.17-.42-.43 22.83-38.5-6.18-92.8 3.53-141.4h-.01Z',
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'path',
															{
																fill: '#438629',
																d: 'm162.93 182.3-.04 1.06c-.04 1.43-.06 2.86-.09 4.3 3.42 9.92 4.2 21.82 3.4 32.21a52.42 52.42 0 0 1-4.07 16.76l-.03 5.48a82.8 82.8 0 0 0 4.41-11.2c5.7-17.46 2.3-33.8-3.58-48.61Z',
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'path',
															{
																fill: '#F59100',
																d: 'M119.8 196.04a244.5 244.5 0 0 0-1.52 20.47c.98-6.74 1.69-13.77 1.52-20.47ZM100.9 208.19c-1.44 10.5-.2 24.91 4.35 33.17a50.16 50.16 0 0 0 3.71 5.52 90.3 90.3 0 0 0 6.93-18.34c-.24-3.38-.44-6.74-.64-10.01-.7-11.27 1.08-23.15 2.94-35.01a33.53 33.53 0 0 0-3.65-8.94 31.48 31.48 0 0 0-2.57-3.65c-1.2 4-2.41 7.94-3.6 11.85-2.58 8.6-6.35 17.27-7.46 25.4v.01Z',
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'path',
															{
																fill: '#F59100',
																d: 'M91.82 182.19c-3.95 9.3-7.34 19.05-8.37 30.5-1.46 16.2 2.36 33.8 10.62 42.57a26.5 26.5 0 0 0 6.89 5.26 53.4 53.4 0 0 0 3.6-4.6c1.01-1.49 1.9-3.7 2.92-5.96-6.87-9.93-11.21-22.26-10.43-37.99.48-9.52 4.07-16.41 6.61-24.14 2.06-6.27 4.17-12.7 6.2-19.27a51.44 51.44 0 0 0-8-6.5c-1.5 2.07-3.08 4.06-4.37 6.18-2.6 4.23-3.66 9.25-5.66 13.96l-.01-.01Z',
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'path',
															{
																fill: '#F59100',
																d: 'M87.73 251.38c-1.5-2.15-3.42-4.25-4.18-6.84-4.9-16.85-3.56-33.75.05-48 1.36-5.32 3.35-9.83 5.25-14.8 1.94-5.09 2.92-10.19 5.66-14.39 1.54-2.36 3.35-4.52 5.03-6.82-1.17-.76-2.38-1.51-3.6-2.27-4.78-6.7-5.49-14.63-5.38-25.1.21-18.2-.18-37.33.92-55.19.63-.92 3.35.13 4.01-.77-.37-1.71 1.92-3.79 2.21-5.44.5-2.83-.53-7.6-.62-11.09-.1-3.72.1-7.37.06-10.76-.19-15.67-1.6-41.8-.2-58.53.9-10.7 1.95-21.27-5.3-23.07-6.21-1.55-11.22.17-15.8.75-2.26.29-4.58-.26-6.03.83-1.23 24.7-.78 55.08 1.75 79.67-1.52 8.39-.29 19.28 1.07 27.9 1.53.8 3.63 1 5.42 1.54 1.13 22.75 3.07 58.23-7.07 76.88-8.18 4.13-14.53 7.26-19.49 13.97a47.39 47.39 0 0 0-9.41 25.8c-.67 12.54 2.54 28.44 6.46 41.21 3.08 10.06 7.4 20.92 12.46 26.59 5.18 5.78 16.77 9.58 26.76 7.03 3.61-.92 7.66-4.15 11.05-7.64-4.5-2.82-8.02-7.03-11.09-11.46h.01Z',
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'path',
															{
																fill: '#AF6D08',
																d: 'M97.04 211.97c-.78 15.73 3.56 28.06 10.43 37.99.4-.86.8-1.73 1.23-2.56l.25-.52a50.77 50.77 0 0 1-3.7-5.52c-4.56-8.26-5.8-22.67-4.35-33.17 1.12-8.14 4.89-16.81 7.47-25.41 1.17-3.9 2.39-7.85 3.6-11.84a35 35 0 0 0-2.13-2.38c-2.02 6.56-4.13 13-6.19 19.27-2.53 7.72-6.14 14.62-6.61 24.14Z',
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'path',
															{
																fill: '#AF6D08',
																d: 'M94.07 255.26c-8.26-8.78-12.08-26.36-10.62-42.58 1.03-11.44 4.42-21.18 8.37-30.5 2-4.7 3.08-9.72 5.66-13.95 1.3-2.11 2.86-4.1 4.38-6.18-.75-.52-1.53-1.02-2.32-1.53-1.68 2.3-3.49 4.46-5.03 6.82-2.74 4.21-3.72 9.3-5.66 14.38-1.9 4.98-3.9 9.49-5.25 14.82-3.61 14.25-4.95 31.14-.05 48 .75 2.58 2.69 4.68 4.19 6.83 3.06 4.43 6.58 8.64 11.09 11.46.74-.77 1.45-1.55 2.12-2.31a26.48 26.48 0 0 1-6.88-5.26ZM115.25 218.53c.2 3.27.4 6.64.64 10.02a100.95 100.95 0 0 0 2.4-12.04c.16-6.69.74-13.51 1.5-20.47-.1-4.36-.6-8.59-1.6-12.51-1.86 11.86-3.65 23.73-2.94 35Z',
															},
														),
													],
												},
											),
										],
									},
								),
							],
						}),
						(0, emotion_react_jsx_runtime_browser_esm.tZ)('defs', {
							children: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								'clipPath',
								{
									id: 'a',
									children: (0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'path',
										{ fill: '#fff', d: 'M0 0h300v300H0z' },
									),
								},
							),
						}),
					],
				});
			try {
				(FeastAppIcon.displayName = 'FeastAppIcon'),
					(FeastAppIcon.__docgenInfo = {
						description: '',
						displayName: 'FeastAppIcon',
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
							'client/components/mma/shared/assets/FeastAppIcon.tsx#FeastAppIcon'
						] = {
							docgenInfo: FeastAppIcon.__docgenInfo,
							name: 'FeastAppIcon',
							path: 'client/components/mma/shared/assets/FeastAppIcon.tsx#FeastAppIcon',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var DownloadFeastAppCtaWithIcon_appAdCss = (0,
				emotion_react_browser_esm.iv)(
					'background-color:#e1e5d5;padding:',
					space.D[3],
					'px ',
					space.D[3],
					'px ',
					space.D[5],
					'px;h4{',
					typography.Rcn,
					';margin:0 ',
					space.D[5],
					'px 0 0;}p{margin:',
					space.D[1],
					'px ',
					space.D[5],
					'px 0 0;}',
					mq.Dp.tablet,
					'{padding:',
					space.D[6],
					'px ',
					space.D[12],
					'px ',
					space.D[6],
					'px ',
					space.D[6],
					'px;}',
					'',
				),
				DownloadFeastAppCtaWithIcon_inlineContentsCss = (0,
				emotion_react_browser_esm.iv)(
					'display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:',
					space.D[4],
					'px;',
					'',
				),
				DownloadFeastAppCtaWithIcon_appIconContainerCss = (0,
				emotion_react_browser_esm.iv)(
					'width:55px;min-width:55px;height:55px;border-radius:10px;',
					mq.Dp.tablet,
					'{width:70px;min-width:70px;height:70px;}',
					'',
				),
				DownloadFeastAppCtaWithIcon = (props) =>
					(0, emotion_react_jsx_runtime_browser_esm.BX)('div', {
						css: [
							DownloadFeastAppCtaWithIcon_appAdCss,
							props.additionalCss,
							'',
							'',
						],
						children: [
							(0, emotion_react_jsx_runtime_browser_esm.BX)(
								'div',
								{
									css: DownloadFeastAppCtaWithIcon_inlineContentsCss,
									children: [
										(0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											'div',
											{
												children: [
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'h4',
														{
															children:
																"If you haven't already, download the Feast App",
														},
													),
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'p',
														{
															children:
																"Make a feast out of anything with the Guardian's new recipe app - Feast.",
														},
													),
												],
											},
										),
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'i',
											{
												css: DownloadFeastAppCtaWithIcon_appIconContainerCss,
												children: (0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													FeastAppIcon,
													{},
												),
											},
										),
									],
								},
							),
							(0, emotion_react_jsx_runtime_browser_esm.BX)(
								'div',
								{
									children: [
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											AppleAppStoreButton.G,
											{
												link: externalLinks.Xj,
												overrideButtonHeight: '36px',
												additionalCss: (0,
												emotion_react_browser_esm.iv)(
													'margin-right:',
													space.D[3],
													'px;',
													'',
												),
											},
										),
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											AndroidPlayStoreButton.A,
											{
												link: externalLinks._e,
												overrideButtonHeight: '36px',
											},
										),
									],
								},
							),
						],
					});
			try {
				(DownloadFeastAppCtaWithIcon.displayName =
					'DownloadFeastAppCtaWithIcon'),
					(DownloadFeastAppCtaWithIcon.__docgenInfo = {
						description: '',
						displayName: 'DownloadFeastAppCtaWithIcon',
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
							'client/components/mma/shared/DownloadFeastAppCtaWithIcon.tsx#DownloadFeastAppCtaWithIcon'
						] = {
							docgenInfo:
								DownloadFeastAppCtaWithIcon.__docgenInfo,
							name: 'DownloadFeastAppCtaWithIcon',
							path: 'client/components/mma/shared/DownloadFeastAppCtaWithIcon.tsx#DownloadFeastAppCtaWithIcon',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			function CancelAlternativeConfirmed_asyncGeneratorStep(
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
			var standfirstCss = (0, emotion_react_browser_esm.iv)(
					typography.Ff7,
					';color:',
					palette.palette.neutral[7],
					';margin-top:0;',
					'',
				),
				nextStepsCss = (0, emotion_react_browser_esm.iv)(
					'margin:',
					space.D[4],
					'px 0 ',
					space.D[8],
					'px;h4{',
					typography.D35,
					';margin:0;}ul{',
					typography.Ff7,
					';padding:0;padding-inline-start:14px;margin:',
					space.D[3],
					'px 0 0;line-height:1.8rem;}',
					mq.Dp.desktop,
					'{margin:',
					space.D[6],
					'px 0 ',
					space.D[8],
					'px;}',
					'',
				),
				nextStepsWithSuffixText = (0, emotion_react_browser_esm.iv)(
					'padding-bottom:',
					space.D[6],
					'px;margin-bottom:',
					space.D[6],
					'px;',
					mq.Dp.desktop,
					'{padding-bottom:',
					space.D[6],
					'px;margin-bottom:',
					space.D[6],
					'px;}',
					'',
				),
				benefitsCss = (0, emotion_react_browser_esm.iv)(
					'display:flex;flex-direction:column;background-color:',
					palette.palette.culture[800],
					';padding:',
					space.D[1],
					'px ',
					space.D[3],
					'px ',
					space.D[3],
					'px;h4{',
					typography.Rcn,
					';margin:0;}ul{margin-top:',
					space.D[4],
					'px;}',
					mq.Dp.desktop,
					'{flex-direction:row;justify-content:space-between;padding:0;picture{order:2;}}',
					'',
				),
				pictureAlignmentCss = (0, emotion_react_browser_esm.iv)(
					'display:flex;justify-content:center;align-items:flex-end;',
					mq.vX.desktop.and.leftCol,
					'{align-items:center;}',
					mq.Dp.leftCol,
					'{max-width:361px;}',
					'',
				),
				benefitsLeftSideCss = (0, emotion_react_browser_esm.iv)(
					mq.Dp.desktop,
					'{padding:',
					space.D[6],
					'px;}',
					'',
				),
				mobileHeroHRCss = (0, emotion_react_browser_esm.iv)(
					'height:1px;width:calc(100% - 40px);background-color:',
					palette.palette.neutral[60],
					';margin:0 auto ',
					space.D[3],
					'px;',
					mq.Dp.desktop,
					'{display:none;}',
					'',
				),
				CancelAlternativeConfirmed_appAdCss = (0,
				emotion_react_browser_esm.iv)(
					'margin-top:',
					space.D[5],
					'px;',
					mq.Dp.desktop,
					'{margin-top:',
					space.D[6],
					'px;}',
					'',
				),
				dontForgetCss = (0, emotion_react_browser_esm.iv)(
					'display:flex;gap:',
					space.D[2],
					'px;margin-top:',
					space.D[6],
					'px;border:1px solid ',
					palette.palette.neutral[86],
					';padding:',
					space.D[4],
					'px ',
					space.D[4],
					'px ',
					space.D[4],
					'px ',
					space.D[3],
					'px;svg{flex-shrink:0;}p{margin:0;}',
					mq.Dp.desktop,
					'{padding:',
					space.D[4],
					'px ',
					space.D[4],
					'px ',
					space.D[4],
					'px ',
					space.D[5],
					'px;}',
					'',
				),
				onwardJourneyBtnsContainerCss = (0,
				emotion_react_browser_esm.iv)(
					'display:flex;flex-direction:column;gap:',
					space.D[5],
					'px;margin-top:',
					space.D[12],
					'px;',
					mq.Dp.phablet,
					'{flex-direction:row;gap:',
					space.D[4],
					'px;}',
					'',
				),
				buttonCentredCss = (0, emotion_react_browser_esm.iv)(
					'width:100%;justify-content:center;margin:0;',
					mq.Dp.desktop,
					'{width:fit-content;}',
					'',
				),
				updateSalesforceCase = (function () {
					var _ref =
						(function CancelAlternativeConfirmed_asyncToGenerator(
							fn,
						) {
							return function () {
								var self = this,
									args = arguments;
								return new Promise(function (resolve, reject) {
									var gen = fn.apply(self, args);
									function _next(value) {
										CancelAlternativeConfirmed_asyncGeneratorStep(
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
										CancelAlternativeConfirmed_asyncGeneratorStep(
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
						})(function* (
							isTestUser,
							caseId,
							loggingCodeSuffix,
							description,
							subject,
						) {
							yield getUpdateCasePromise(
								isTestUser,
								loggingCodeSuffix,
								caseId,
								{ Description: description, Subject: subject },
							);
						});
					return function updateSalesforceCase(
						_x,
						_x2,
						_x3,
						_x4,
						_x5,
					) {
						return _ref.apply(this, arguments);
					};
				})(),
				CancelAlternativeConfirmed = () => {
					var routerState = (0, react_router.TH)().state,
						navigate = (0, react_router.s0)(),
						pageTitleContext = (0, react.useContext)(
							CancellationContainer.mc,
						),
						cancellationContext = (0, react.useContext)(
							CancellationContainer.DW,
						),
						productDetail = cancellationContext.productDetail,
						productType = cancellationContext.productType,
						mainPlan = (0, productResponse.fr)(
							productDetail.subscription,
						),
						nextNonDiscountedPaymentDate = (0, dates.sG)(
							routerState.nextNonDiscountedPaymentDate,
							'yyyy-MM-dd',
						).dateStr(dates.Bn),
						firstDiscountedPaymentDate = (0, dates.sG)(
							routerState.firstDiscountedPaymentDate,
							'yyyy-MM-dd',
						).dateStr(dates.Bn),
						humanReadableNextNonDiscountedPrice =
							getMaxNonDiscountedPrice(
								routerState.nonDiscountedPayments,
								!0,
							),
						offerPeriodType = routerState.upToPeriodsType,
						alternativeIsOffer =
							'supporterplus' === productType.productType,
						alternativeIsPause =
							'contributions' === productType.productType,
						offerIsPercentageOrFree =
							alternativeIsOffer &&
							(routerState.discountPercentage < 100
								? 'percentage'
								: 'free'),
						sfCaseDebugSuffix = '_'
							.concat(alternativeIsOffer ? 'OFFER' : '')
							.concat(alternativeIsPause ? 'PAUSE' : ''),
						sfCaseDescription = 'User '
							.concat(alternativeIsOffer ? 'took offer' : '')
							.concat(
								alternativeIsPause ? 'paused' : '',
								' instead of cancelling',
							),
						sfCaseSubject = 'Online Cancellation Save Discount - '
							.concat(alternativeIsOffer ? 'Free' : '')
							.concat(alternativeIsPause ? 'Pause' : '', ' for ')
							.concat(routerState.upToPeriods, ' ')
							.concat(offerPeriodType);
					return (
						(0, react.useEffect)(() => {
							pageTitleContext.setPageTitle('Confirmation'),
								updateSalesforceCase(
									productDetail.isTestUser,
									routerState.caseId,
									sfCaseDebugSuffix,
									sfCaseDescription,
									sfCaseSubject,
								);
						}, [
							pageTitleContext,
							productDetail.isTestUser,
							routerState.caseId,
							sfCaseDebugSuffix,
							sfCaseDescription,
							sfCaseSubject,
						]),
						(0, emotion_react_jsx_runtime_browser_esm.BX)(
							emotion_react_jsx_runtime_browser_esm.HY,
							{
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										Heading.X,
										{
											borderless: !0,
											cssOverrides: [
												styles_typography.L.heading,
												(0,
												emotion_react_browser_esm.iv)(
													'margin:',
													space.D[8],
													'px 0 ',
													space.D[2],
													'px;',
													'',
												),
											],
											children:
												'Thank you for choosing to stay with us',
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'h3',
										{
											css: standfirstCss,
											children:
												'Your valued support powers independent journalism.',
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'div',
										{
											css: [
												nextStepsCss,
												alternativeIsPause &&
													nextStepsWithSuffixText,
												'',
												'',
											],
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'h4',
													{
														children:
															'What happens next?',
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'ul',
													{
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'li',
																{
																	children: [
																		'You will receive an email confirming',
																		alternativeIsOffer
																			? ' the details of your offer'
																			: '',
																		alternativeIsPause
																			? " you've paused your support"
																			: '',
																	],
																},
															),
															alternativeIsOffer &&
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'li',
																	{
																		children:
																			[
																				'You will continue enjoying all the benefits of your All-access digital subscription',
																				'free' ===
																					offerIsPercentageOrFree &&
																					' – for free',
																			],
																	},
																),
															alternativeIsOffer &&
																'percentage' ===
																	offerIsPercentageOrFree &&
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'li',
																	{
																		children:
																			[
																				'You will be billed at the discounted rate on',
																				' ',
																				firstDiscountedPaymentDate,
																			],
																	},
																),
															((alternativeIsOffer &&
																'free' ===
																	offerIsPercentageOrFree) ||
																alternativeIsPause) &&
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'li',
																	{
																		children:
																			[
																				'You will not be billed until',
																				' ',
																				nextNonDiscountedPaymentDate,
																				' after which you will pay ',
																				mainPlan.currency,
																				humanReadableNextNonDiscountedPrice,
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
									alternativeIsOffer &&
										(0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											emotion_react_jsx_runtime_browser_esm.HY,
											{
												children: [
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'div',
														{
															css: benefitsCss,
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'picture',
																	{
																		css: pictureAlignmentCss,
																		children:
																			[
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					'source',
																					{
																						srcSet: 'https://media.guim.co.uk/4642d75e4282cf62980b6aa60eb5f710a6795e82/0_0_1444_872/1000.png',
																						media: '(min-width: 1140px)',
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					'source',
																					{
																						srcSet: 'https://media.guim.co.uk/7a20e5ce7fd500ec7bac3ec372d7d1e041f5bfe5/0_0_1252_1100/500.png',
																						media: '(min-width: 980px) and (max-width: 1139px)',
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					'img',
																					{
																						src: 'https://media.guim.co.uk/63d17ee19313703129fbbeacceaafcd6d1cc1014/0_0_1404_716/500.png',
																					},
																				),
																			],
																	},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'div',
																	{
																		css: mobileHeroHRCss,
																	},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'div',
																	{
																		css: benefitsLeftSideCss,
																		children:
																			[
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					'h4',
																					{
																						children:
																							'With your offer, you will continue to enjoy:',
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					BenefitsSection.c,
																					{
																						small: !0,
																						benefits:
																							[
																								{
																									description:
																										'Unlimited access to the Guardian app',
																								},
																								{
																									description:
																										'Ad-free reading across all your devices',
																								},
																								{
																									description:
																										'Exclusive supporter newsletter',
																								},
																								{
																									description:
																										"Far fewer asks for support when you're signed in",
																								},
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
													emotion_react_jsx_runtime_browser_esm.tZ)(
														DownloadAppCta,
														{
															additionalCss:
																CancelAlternativeConfirmed_appAdCss,
														},
													),
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														DownloadFeastAppCtaWithIcon,
														{
															additionalCss:
																CancelAlternativeConfirmed_appAdCss,
														},
													),
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'div',
														{
															css: dontForgetCss,
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	SvgInfoRound.r,
																	{
																		size: 'small',
																		theme: {
																			fill: palette
																				.palette
																				.brand[400],
																		},
																	},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'p',
																	{
																		children:
																			"Don't forget to sign in on all your devices to enjoy your benefits.",
																	},
																),
															],
														},
													),
												],
											},
										),
									alternativeIsPause &&
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'p',
											{
												css: dontForgetCss,
												children:
													"Don't forget to sign in on all your devices to get the best experience",
											},
										),
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'div',
										{
											css: onwardJourneyBtnsContainerCss,
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													LinkButton.Q,
													{
														href: 'https://theguardian.com',
														priority: 'primary',
														cssOverrides:
															buttonCentredCss,
														children:
															'Continue reading the Guardian',
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													Button.z,
													{
														cssOverrides:
															buttonCentredCss,
														priority: 'tertiary',
														onClick: () =>
															navigate('/'),
														children:
															'Return to your account',
													},
												),
											],
										},
									),
								],
							},
						)
					);
				},
				colour_palette = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__deprecated__/colour/palette.js',
				),
				lodash = __webpack_require__('./node_modules/lodash/lodash.js'),
				containerCss = (0, emotion_react_browser_esm.iv)(
					'display:block;margin:0;padding:',
					space.D[0],
					'px ',
					space.D[2],
					'px;',
					typography.fRL,
					';',
					'',
				),
				Pill = (_ref) => {
					var {
							copy,
							colour,
							copyColour,
							additionalCss,
							sharpLeftSide,
							sharpRightSide,
							sharpLeftSideMobileOnly,
							sharpRightSideMobileOnly,
						} = _ref,
						brLeftMobile =
							sharpLeftSide || sharpLeftSideMobileOnly
								? 0
								: space.D[1],
						brRightMobile =
							sharpRightSide || sharpRightSideMobileOnly
								? 0
								: space.D[1],
						brLeft = sharpLeftSide ? 0 : space.D[1],
						brRight = sharpRightSide ? 0 : space.D[1];
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						'span',
						{
							css: [
								containerCss,
								(0, emotion_react_browser_esm.iv)(
									'border-radius:',
									brLeftMobile,
									'px ',
									brRightMobile,
									'px ',
									brRightMobile,
									'px ',
									brLeftMobile,
									'px;background-color:',
									colour || palette.palette.neutral[0],
									';color:',
									copyColour || palette.palette.neutral[100],
									';',
									mq.Dp.tablet,
									'{border-radius:',
									brLeft,
									'px ',
									brRight,
									'px;}',
									'',
								),
								additionalCss,
								'',
								'',
							],
							children: copy,
						},
					);
				};
			try {
				(Pill.displayName = 'Pill'),
					(Pill.__docgenInfo = {
						description: '',
						displayName: 'Pill',
						props: {
							copy: {
								defaultValue: null,
								description: '',
								name: 'copy',
								required: !0,
								type: { name: 'string' },
							},
							colour: {
								defaultValue: null,
								description: '',
								name: 'colour',
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
							sharpLeftSide: {
								defaultValue: null,
								description: '',
								name: 'sharpLeftSide',
								required: !1,
								type: { name: 'boolean' },
							},
							sharpRightSide: {
								defaultValue: null,
								description: '',
								name: 'sharpRightSide',
								required: !1,
								type: { name: 'boolean' },
							},
							sharpLeftSideMobileOnly: {
								defaultValue: null,
								description: '',
								name: 'sharpLeftSideMobileOnly',
								required: !1,
								type: { name: 'boolean' },
							},
							sharpRightSideMobileOnly: {
								defaultValue: null,
								description: '',
								name: 'sharpRightSideMobileOnly',
								required: !1,
								type: { name: 'boolean' },
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
							'client/components/shared/Pill.tsx#Pill'
						] = {
							docgenInfo: Pill.__docgenInfo,
							name: 'Pill',
							path: 'client/components/shared/Pill.tsx#Pill',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var numberUtils = __webpack_require__('./shared/numberUtils.ts');
			function CancelAlternativeOffer_ownKeys(e, r) {
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
			function CancelAlternativeOffer_objectSpread(e) {
				for (var r = 1; r < arguments.length; r++) {
					var t = null != arguments[r] ? arguments[r] : {};
					r % 2
						? CancelAlternativeOffer_ownKeys(Object(t), !0).forEach(
								function (r) {
									CancelAlternativeOffer_defineProperty(
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
						: CancelAlternativeOffer_ownKeys(Object(t)).forEach(
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
			function CancelAlternativeOffer_defineProperty(obj, key, value) {
				return (
					(key = (function CancelAlternativeOffer_toPropertyKey(arg) {
						var key = (function CancelAlternativeOffer_toPrimitive(
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
			var CancelAlternativeOffer_standfirstCss = (0,
				emotion_react_browser_esm.iv)(
					typography.Ff7,
					';color:',
					colour_palette.n$[7],
					';margin:0 0 ',
					space.D[8],
					'px;',
					'',
				),
				availableOfferBoxCss = (0, emotion_react_browser_esm.iv)(
					typography.Kz0,
					';border:1px solid ',
					palette.palette.neutral[86],
					';display:flex;flex-wrap:wrap;margin:',
					space.D[5],
					'px 0 ',
					space.D[8],
					'px;width:100%;position:relative;',
					mq.Dp.tablet,
					'{border:none;}',
					'',
				),
				offerBoxWithoutImageCss = (0, emotion_react_browser_esm.iv)(
					mq.Dp.tablet,
					'{border:1px solid ',
					palette.palette.neutral[93],
					';}',
					'',
				),
				availableOfferBoxInnerCss = (0, emotion_react_browser_esm.iv)(
					'padding:0 ',
					space.D[4],
					'px ',
					space.D[5],
					'px;width:100%;',
					mq.Dp.tablet,
					'{background-color:',
					palette.palette.neutral[100],
					';width:363px;padding:var(--offerBoxTopPadding) ',
					space.D[6],
					'px ',
					space.D[5],
					'px;margin:',
					space.D[6],
					'px;}',
					'',
				),
				offerBoxInnerWithoutImageCss = (0,
				emotion_react_browser_esm.iv)(
					'padding:',
					space.D[4],
					'px;',
					mq.Dp.tablet,
					'{width:410px;padding:',
					space.D[6],
					'px;margin:0;}',
					'',
				),
				headerImageCss = (0, emotion_react_browser_esm.iv)(
					'display:flex;justify-content:center;width:100%;height:auto;background-color:',
					palette.palette.culture[800],
					';',
					mq.Dp.tablet,
					'{position:absolute;z-index:-1;height:100%;overflow:hidden;justify-content:flex-start;img{height:100%;margin-left:389px;}}',
					'',
				),
				pillCss = (0, emotion_react_browser_esm.iv)(
					'transform:translateY(-50%);margin-left:',
					space.D[4],
					'px;',
					mq.Dp.tablet,
					'{margin-left:0;position:absolute;top:',
					space.D[6],
					'px;left:',
					space.D[12],
					'px;}',
					'',
				),
				strikethroughPriceCss = (0, emotion_react_browser_esm.iv)(
					typography.Kz0,
					';color:',
					colour_palette.n$[46],
					';margin:0;',
					'',
				),
				discountedPriceSpan = (0, emotion_react_browser_esm.iv)(
					typography.Kie,
					';color:',
					colour_palette.n$[0],
					';',
					'',
				),
				offerBoxTitleCss = (0, emotion_react_browser_esm.iv)(
					'color:',
					colour_palette.n$[7],
					';margin:0;',
					'',
				),
				billingResumptionDateCss = (0, emotion_react_browser_esm.iv)(
					typography.Hi4,
					';color:',
					colour_palette.n$[38],
					';margin:0;',
					'',
				),
				billingResumptionDatePercentageOfferCss = (0,
				emotion_react_browser_esm.iv)(
					'margin-bottom:',
					space.D[6],
					'px;',
					mq.Dp.tablet,
					'{margin-bottom:',
					space.D[5],
					'px;}',
					'',
				),
				offerButtonCss = (0, emotion_react_browser_esm.iv)(
					'margin:',
					space.D[5],
					'px 0 ',
					space.D[6],
					'px;width:100%;justify-content:center;',
					mq.Dp.tablet,
					'{margin-bottom:',
					space.D[5],
					'px;}',
					'',
				),
				offerButtonSmallBottomMargin = (0,
				emotion_react_browser_esm.iv)(
					'margin-bottom:',
					space.D[2],
					'px;',
					mq.Dp.tablet,
					'{margin-bottom:',
					space.D[2],
					'px;}',
					'',
				),
				benefitsSubTitleCss = (0, emotion_react_browser_esm.iv)(
					'margin:0 0 ',
					space.D[3],
					'px;',
					typography.fRL,
					';',
					mq.Dp.tablet,
					'{border-top:1px solid ',
					palette.palette.neutral[86],
					';padding-top:',
					space.D[3],
					'px;margin-bottom:',
					space.D[4],
					'px;}',
					'',
				),
				cancelBtnHolderCss = (0, emotion_react_browser_esm.iv)(
					mq.Dp.phablet,
					'{display:flex;justify-content:space-between;}',
					'',
				),
				cancelButtonCss = (0, emotion_react_browser_esm.iv)(
					'margin:0 0 ',
					space.D[3],
					'px;width:100%;justify-content:center;',
					mq.Dp.tablet,
					'{width:fit-content;}',
					'',
				),
				termsCss = (0, emotion_react_browser_esm.iv)(
					typography.Hi4,
					';color:',
					palette.palette.neutral[46],
					';margin-top:',
					space.D[3],
					'px;',
					'',
				),
				CancelAlternativeOffer_ref = {
					name: 'e946zq',
					styles: 'max-width:290px',
				},
				CancelAlternativeOffer = () => {
					var routerState = (0, react_router.TH)().state,
						navigate = (0, react_router.s0)(),
						cancellationContext = (0, react.useContext)(
							CancellationContainer.DW,
						),
						productDetail = cancellationContext.productDetail,
						productType = cancellationContext.productType,
						mainPlan = (0, productResponse.fr)(
							productDetail.subscription,
						),
						offerPeriodWord = (0, numberUtils.f)(
							routerState.upToPeriods,
						),
						offerPeriodType = routerState.upToPeriodsType,
						nextNonDiscountedPaymentDate = (0, dates.sG)(
							routerState.nextNonDiscountedPaymentDate,
							'yyyy-MM-dd',
						).dateStr(dates.Bn),
						humanReadableStrikethroughPrice =
							getMaxNonDiscountedPrice(
								routerState.nonDiscountedPayments,
								!0,
							),
						alternativeIsOffer =
							'supporterplus' === productType.productType,
						alternativeIsPause =
							'contributions' === productType.productType,
						offerIsPercentageOrFree =
							alternativeIsOffer &&
							(routerState.discountPercentage < 100
								? 'percentage'
								: 'free'),
						standfirstCopy = {
							supporterplus:
								'percentage' === offerIsPercentageOrFree
									? 'Instead of cancelling, take '.concat(
											routerState.discountPercentage,
											'% off and keep enjoying all your existing benefits.',
									  )
									: 'Instead of cancelling, enjoy '
											.concat(offerPeriodWord, ' ')
											.concat(
												offerPeriodType,
												' with all your existing benefits',
											)
											.concat(
												'free' ===
													offerIsPercentageOrFree
													? ' — for free'
													: '',
												'.',
											),
							contributions:
								'Instead of cancelling, you can pause your recurring payment for '
									.concat(offerPeriodWord, ' ')
									.concat(offerPeriodType, '.'),
						},
						heroImageSrc = {
							mobile: alternativeIsOffer
								? 'https://media.guim.co.uk/63d17ee19313703129fbbeacceaafcd6d1cc1014/0_0_1404_716/500.png'
								: '',
							desktop: alternativeIsOffer
								? 'https://i.guim.co.uk/img/media/02c17de8ea17126fbd87f6567ce5cd80f128546d/0_0_2212_1869/2000.png?width=1000&quality=75&s=492edad637979aa4e57e957cb12cd4f1'
								: '',
						},
						withHeroImage =
							Boolean(heroImageSrc.mobile) &&
							Boolean(heroImageSrc.desktop);
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									ProgressStepper.S,
									{
										steps: [
											{},
											{},
											{ isCurrentStep: !0 },
											{},
										],
										additionalCSS: (0,
										emotion_react_browser_esm.iv)(
											'margin:',
											space.D[8],
											'px 0 ',
											space.D[9],
											'px;',
											'',
										),
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									Heading.X,
									{
										borderless: !0,
										cssOverrides: [
											styles_typography.L.heading,
											(0, emotion_react_browser_esm.iv)(
												'margin-bottom:',
												space.D[2],
												'px;',
												'',
											),
										],
										children:
											"This doesn't have to be goodbye",
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'h3',
									{
										css: CancelAlternativeOffer_standfirstCss,
										children:
											standfirstCopy[
												productType.productType
											],
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'div',
									{
										css: [
											availableOfferBoxCss,
											!withHeroImage &&
												offerBoxWithoutImageCss,
											'',
											'',
										],
										children: [
											withHeroImage &&
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'picture',
													{
														css: headerImageCss,
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'source',
																{
																	srcSet: heroImageSrc.desktop,
																	media: '(min-width: 740px)',
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'img',
																{
																	src: heroImageSrc.mobile,
																},
															),
														],
													},
												),
											alternativeIsOffer &&
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													Pill,
													{
														copy: 'Your one-time offer',
														colour:
															'percentage' ===
															offerIsPercentageOrFree
																? palette
																		.palette
																		.news[400]
																: palette
																		.palette
																		.brand[500],
														additionalCss: pillCss,
													},
												),
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'div',
												{
													css: [
														availableOfferBoxInnerCss,
														!withHeroImage &&
															offerBoxInnerWithoutImageCss,
														'',
														'',
													],
													style: {
														'--offerBoxTopPadding':
															''.concat(
																alternativeIsOffer
																	? space.D[8]
																	: space
																			.D[4],
																'px',
															),
													},
													children: [
														'percentage' ===
															offerIsPercentageOrFree &&
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'h4',
																{
																	css: [
																		offerBoxTitleCss,
																		(0,
																		emotion_react_browser_esm.iv)(
																			typography.Rze,
																			';',
																			'',
																		),
																		'',
																		'',
																	],
																	children: [
																		routerState.discountPercentage,
																		'% off for',
																		' ',
																		(0,
																		dates.mB)(
																			routerState.upToPeriods,
																			offerPeriodType,
																		),
																	],
																},
															),
														alternativeIsOffer &&
															(0,
															productResponse.q4)(
																mainPlan,
															) &&
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'p',
																{
																	css: strikethroughPriceCss,
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.BX)(
																			's',
																			{
																				children:
																					[
																						mainPlan.currency,
																						humanReadableStrikethroughPrice,
																						'/',
																						mainPlan.billingPeriod,
																					],
																			},
																		),
																		'percentage' ===
																			offerIsPercentageOrFree &&
																			(0,
																			emotion_react_jsx_runtime_browser_esm.BX)(
																				'span',
																				{
																					css: discountedPriceSpan,
																					children:
																						[
																							' ',
																							mainPlan.currency,
																							routerState.discountedPrice,
																							'/',
																							mainPlan.billingPeriod,
																						],
																				},
																			),
																	],
																},
															),
														alternativeIsPause &&
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																emotion_react_jsx_runtime_browser_esm.HY,
																{
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.BX)(
																			'h4',
																			{
																				css: [
																					offerBoxTitleCss,
																					(0,
																					emotion_react_browser_esm.iv)(
																						typography.Kie,
																						';',
																						'',
																					),
																					'',
																					'',
																				],
																				children:
																					[
																						'Would you like to pause your support to the Guardian for ',
																						offerPeriodWord,
																						' ',
																						offerPeriodType,
																						'?',
																					],
																			},
																		),
																		(0,
																		emotion_react_jsx_runtime_browser_esm.BX)(
																			'p',
																			{
																				css: billingResumptionDateCss,
																				children:
																					[
																						'Billing resumes on',
																						' ',
																						nextNonDiscountedPaymentDate,
																					],
																			},
																		),
																	],
																},
															),
														'free' ===
															offerIsPercentageOrFree &&
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'h4',
																{
																	css: [
																		offerBoxTitleCss,
																		(0,
																		emotion_react_browser_esm.iv)(
																			typography.JX9,
																			';',
																			'',
																		),
																		'',
																		'',
																	],
																	children: [
																		(0,
																		lodash.capitalize)(
																			offerPeriodWord,
																		),
																		' ',
																		offerPeriodType,
																		' free',
																	],
																},
															),
														'free' ===
															offerIsPercentageOrFree &&
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'p',
																{
																	css: billingResumptionDateCss,
																	children: [
																		'Billing resumes on ',
																		nextNonDiscountedPaymentDate,
																	],
																},
															),
														(0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															Button.z,
															{
																onClick: () => {
																	var reviewUrlPart =
																		'../'
																			.concat(
																				alternativeIsOffer
																					? 'offer-review'
																					: '',
																			)
																			.concat(
																				alternativeIsPause
																					? 'pause-review'
																					: '',
																			);
																	navigate(
																		reviewUrlPart,
																		{
																			state: routerState,
																		},
																	);
																},
																cssOverrides: [
																	offerButtonCss,
																	(0,
																	emotion_react_browser_esm.iv)(
																		'percentage' ===
																			offerIsPercentageOrFree
																			? offerButtonSmallBottomMargin
																			: '',
																		';',
																		'',
																	),
																],
																children: [
																	alternativeIsOffer &&
																		'Redeem your offer',
																	alternativeIsPause &&
																		'Yes, pause my support',
																],
															},
														),
														'percentage' ===
															offerIsPercentageOrFree &&
															(0,
															productResponse.q4)(
																mainPlan,
															) &&
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'p',
																{
																	css: [
																		billingResumptionDateCss,
																		billingResumptionDatePercentageOfferCss,
																		'',
																		'',
																	],
																	children: [
																		'You will pay ',
																		mainPlan.currency,
																		routerState.discountedPrice,
																		' for the next',
																		' ',
																		routerState.upToPeriods,
																		' ',
																		offerPeriodType,
																		' then',
																		' ',
																		mainPlan.currency,
																		getMaxNonDiscountedPrice(
																			routerState.nonDiscountedPayments,
																			!0,
																		),
																		'/',
																		mainPlan.billingPeriod,
																	],
																},
															),
														alternativeIsOffer &&
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																emotion_react_jsx_runtime_browser_esm.HY,
																{
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'p',
																			{
																				css: benefitsSubTitleCss,
																				children:
																					'Keep your existing benefits:',
																			},
																		),
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'div',
																			{
																				css: CancelAlternativeOffer_ref,
																				children:
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						BenefitsSection.c,
																						{
																							small: !0,
																							benefits:
																								[
																									{
																										description:
																											'Unlimited access to the Guardian app',
																									},
																									{
																										description:
																											'Unlimited access to the Guardian Feast App',
																									},
																									{
																										description:
																											'Ad-free reading across all your devices',
																									},
																									{
																										description:
																											'Exclusive supporter newsletter',
																									},
																									{
																										description:
																											"Far fewer asks for support when you're signed in",
																									},
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
										],
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'div',
									{
										css: cancelBtnHolderCss,
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												Button.z,
												{
													priority: 'tertiary',
													cssOverrides:
														cancelButtonCss,
													onClick: () => {
														navigate('../confirm', {
															state: CancelAlternativeOffer_objectSpread(
																CancelAlternativeOffer_objectSpread(
																	{},
																	routerState,
																),
																{},
																{
																	eligibleForFreePeriodOffer:
																		alternativeIsOffer,
																	eligibleForPause:
																		alternativeIsPause,
																},
															),
														});
													},
													children:
														'No thanks, continue to cancel',
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												Button.z,
												{
													priority: 'subdued',
													cssOverrides:
														cancelButtonCss,
													onClick: () => {
														navigate('/');
													},
													children:
														'Return to your account',
												},
											),
										],
									},
								),
								(0, productResponse.q4)(mainPlan) &&
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'p',
										{
											css: termsCss,
											children: [
												'Your ',
												mainPlan.billingPeriod,
												'ly payments of',
												' ',
												mainPlan.currency,
												humanReadableStrikethroughPrice,
												' will automatically resume on ',
												nextNonDiscountedPaymentDate,
												' unless you cancel.',
												alternativeIsOffer &&
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														emotion_react_jsx_runtime_browser_esm.HY,
														{
															children: [
																' ',
																'Cannot be used together with any other subscription offer you may currently have.',
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
				ErrorSummary = __webpack_require__(
					'./node_modules/@guardian/source-development-kitchen/dist/react-components/summary/ErrorSummary.js',
				),
				Ribbon = __webpack_require__(
					'./client/components/shared/Ribbon.tsx',
				);
			function CancelAlternativeReview_ownKeys(e, r) {
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
			function CancelAlternativeReview_objectSpread(e) {
				for (var r = 1; r < arguments.length; r++) {
					var t = null != arguments[r] ? arguments[r] : {};
					r % 2
						? CancelAlternativeReview_ownKeys(
								Object(t),
								!0,
						  ).forEach(function (r) {
								CancelAlternativeReview_defineProperty(
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
						: CancelAlternativeReview_ownKeys(Object(t)).forEach(
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
			function CancelAlternativeReview_defineProperty(obj, key, value) {
				return (
					(key = (function CancelAlternativeReview_toPropertyKey(
						arg,
					) {
						var key = (function CancelAlternativeReview_toPrimitive(
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
			function CancelAlternativeReview_asyncGeneratorStep(
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
			var yourOfferBoxCss = (0, emotion_react_browser_esm.iv)(
					'background-color:#fbf6ef;padding:',
					space.D[4],
					'px ',
					space.D[6],
					'px;position:relative;h4{',
					typography.Rcn,
					';margin:0;}p{margin:0;}',
					'',
				),
				ribbonCss = (0, emotion_react_browser_esm.iv)(
					'position:absolute;top:0;left:',
					space.D[3],
					'px;transform:translateY(-50%);',
					'',
				),
				yourOfferBoxFlexCss = (0, emotion_react_browser_esm.iv)(
					'display:flex;flex-direction:column;',
					mq.Dp.desktop,
					'{flex-direction:row;gap:1ch;}',
					'',
				),
				CancelAlternativeReview_strikethroughPriceCss = (0,
				emotion_react_browser_esm.iv)(
					typography.Kz0,
					';color:',
					colour_palette.n$[46],
					';margin:0;',
					'',
				),
				percentageOfferSubText = (0, emotion_react_browser_esm.iv)(
					typography.Hi4,
					';color:',
					colour_palette.n$[38],
					';margin-top:',
					space.D[2],
					'px;',
					'',
				),
				whatsNextTitleCss = (0, emotion_react_browser_esm.iv)(
					typography.D35,
					';margin-top:',
					space.D[6],
					'px;',
					mq.Dp.desktop,
					'{margin-top:',
					space.D[8],
					'px;}',
					'',
				),
				whatsNextListCss = (0, emotion_react_browser_esm.iv)(
					typography.Ff7,
					';padding:0;padding-inline-start:14px;li+li{margin-top:',
					space.D[3],
					'px;}',
					'',
				),
				buttonsCtaHolder = (0, emotion_react_browser_esm.iv)(
					'margin:',
					space.D[8],
					'px 0 ',
					space.D[6],
					'px;display:flex;flex-direction:column;gap:',
					space.D[2],
					'px;',
					mq.Dp.phablet,
					'{flex-direction:row;gap:',
					space.D[6],
					'px;margin-top:',
					space.D[9],
					'px;}',
					'',
				),
				ctaBtnCss = (0, emotion_react_browser_esm.iv)(
					'width:100%;justify-content:center;',
					mq.Dp.desktop,
					'{width:fit-content;}',
					'',
				),
				CancelAlternativeReview_termsCss = (0,
				emotion_react_browser_esm.iv)(
					typography.Hi4,
					';color:',
					palette.palette.neutral[46],
					';margin-top:',
					space.D[3],
					'px;',
					'',
				),
				CancelAlternativeReview_ref = {
					name: 'e9cnmi',
					styles: 'gap:1ch;flex-direction:row',
				},
				CancelAlternativeReview = () => {
					var routerState = (0, react_router.TH)().state,
						navigate = (0, react_router.s0)(),
						cancellationContext = (0, react.useContext)(
							CancellationContainer.DW,
						),
						productDetail = cancellationContext.productDetail,
						productType = cancellationContext.productType,
						mainPlan = (0, productResponse.fr)(
							productDetail.subscription,
						),
						offerPeriodWord = (0, numberUtils.f)(
							routerState.upToPeriods,
						),
						offerPeriodType = routerState.upToPeriodsType,
						firstDiscountedPaymentDate = (0, dates.sG)(
							routerState.firstDiscountedPaymentDate,
							'yyyy-MM-dd',
						).dateStr(dates.Bn),
						nextNonDiscountedPaymentDate = (0, dates.sG)(
							routerState.nextNonDiscountedPaymentDate,
							'yyyy-MM-dd',
						).dateStr(dates.Bn),
						humanReadableStrikethroughPrice =
							getMaxNonDiscountedPrice(
								routerState.nonDiscountedPayments,
								!0,
							),
						[
							performingDiscountStatus,
							setPerformingDiscountStatus,
						] = (0, react.useState)('NOT_READY'),
						confirmBtnIconProps = {};
					'PENDING' === performingDiscountStatus &&
						((confirmBtnIconProps.icon = (0,
						emotion_react_jsx_runtime_browser_esm.tZ)(Spinner.$, {
							size: 'xsmall',
						})),
						(confirmBtnIconProps.iconSide = 'right'),
						(confirmBtnIconProps.disabled = !0),
						(confirmBtnIconProps['aria-disabled'] = !0));
					var alternativeIsOffer =
							'supporterplus' === productType.productType,
						alternativeIsPause =
							'contributions' === productType.productType,
						offerIsPercentageOrFree =
							alternativeIsOffer &&
							(routerState.discountPercentage < 100
								? 'percentage'
								: 'free'),
						handleConfirmClick = (function () {
							var _ref2 =
								(function CancelAlternativeReview_asyncToGenerator(
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
												CancelAlternativeReview_asyncGeneratorStep(
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
												CancelAlternativeReview_asyncGeneratorStep(
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
									setPerformingDiscountStatus('PENDING');
									try {
										if (
											(yield (0, utilities_fetch.n4)(
												'/api/discounts/apply-discount',
												{
													method: 'POST',
													body: JSON.stringify({
														subscriptionNumber:
															productDetail
																.subscription
																.subscriptionId,
													}),
												},
											)).ok
										) {
											var confirmedUrlPart = '../'
												.concat(
													alternativeIsOffer
														? 'offer-confirmed'
														: '',
												)
												.concat(
													alternativeIsPause
														? 'pause-confirmed'
														: '',
												);
											navigate(confirmedUrlPart, {
												state: routerState,
											});
										} else setPerformingDiscountStatus('FAILED');
									} catch (_unused) {
										setPerformingDiscountStatus('FAILED');
									}
								});
							return function handleConfirmClick() {
								return _ref2.apply(this, arguments);
							};
						})();
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									ProgressStepper.S,
									{
										steps: [
											{},
											{},
											{},
											{ isCurrentStep: !0 },
										],
										additionalCSS: (0,
										emotion_react_browser_esm.iv)(
											'margin:',
											space.D[8],
											'px 0 ',
											space.D[9],
											'px;',
											'',
										),
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									Heading.X,
									{
										borderless: !0,
										cssOverrides: [
											styles_typography.L.heading,
											(0, emotion_react_browser_esm.iv)(
												'margin-bottom:',
												space.D[6],
												'px;',
												'',
											),
										],
										children: [
											alternativeIsOffer && 'Your offer',
											alternativeIsPause &&
												"Let's confirm the details",
										],
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'div',
									{
										css: [
											yourOfferBoxCss,
											'percentage' ===
												offerIsPercentageOrFree &&
												(0,
												emotion_react_browser_esm.iv)(
													'padding-top:',
													space.D[6],
													'px;',
													'',
												),
											'',
											'',
										],
										children: [
											'percentage' ===
												offerIsPercentageOrFree &&
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													Ribbon.V,
													{
														copy: ''.concat(
															routerState.discountPercentage,
															'% off',
														),
														ribbonColour:
															palette.palette
																.news[400],
														copyColour:
															palette.palette
																.neutral[100],
														roundedCornersLeft: !0,
														roundedCornersRight: !0,
														withoutTail: !0,
														small: !0,
														additionalCss:
															ribbonCss,
													},
												),
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'div',
												{
													css: [
														yourOfferBoxFlexCss,
														'percentage' ===
															offerIsPercentageOrFree &&
															CancelAlternativeReview_ref,
														'',
														'',
													],
													children: [
														alternativeIsOffer &&
															(0,
															productResponse.q4)(
																mainPlan,
															) &&
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'p',
																{
																	css: CancelAlternativeReview_strikethroughPriceCss,
																	children:
																		(0,
																		emotion_react_jsx_runtime_browser_esm.BX)(
																			's',
																			{
																				children:
																					[
																						mainPlan.currency,
																						humanReadableStrikethroughPrice,
																						'/',
																						mainPlan.billingPeriod,
																					],
																			},
																		),
																},
															),
														(0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															'h4',
															{
																children: [
																	alternativeIsOffer &&
																		'free' ===
																			offerIsPercentageOrFree &&
																		''
																			.concat(
																				(0,
																				lodash.capitalize)(
																					offerPeriodWord,
																				),
																				' ',
																			)
																			.concat(
																				offerPeriodType,
																				' of free access to your digital subscription',
																			),
																	alternativeIsOffer &&
																		(0,
																		productResponse.q4)(
																			mainPlan,
																		) &&
																		'percentage' ===
																			offerIsPercentageOrFree &&
																		(0,
																		emotion_react_jsx_runtime_browser_esm.BX)(
																			emotion_react_jsx_runtime_browser_esm.HY,
																			{
																				children:
																					[
																						mainPlan.currency,
																						routerState.discountedPrice,
																						'/',
																						mainPlan.billingPeriod,
																					],
																			},
																		),
																	alternativeIsPause &&
																		"You'd like to pause your recurring support for "
																			.concat(
																				offerPeriodWord,
																				' ',
																			)
																			.concat(
																				offerPeriodType,
																			),
																],
															},
														),
													],
												},
											),
											alternativeIsOffer &&
												(0, productResponse.q4)(
													mainPlan,
												) &&
												'percentage' ===
													offerIsPercentageOrFree &&
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'p',
													{
														children: [
															'For your ',
															(0,
															lodash.capitalize)(
																productType.friendlyName,
															),
														],
													},
												),
										],
									},
								),
								'percentage' === offerIsPercentageOrFree &&
									(0, productResponse.q4)(mainPlan) &&
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'p',
										{
											css: percentageOfferSubText,
											children: [
												'You will pay ',
												mainPlan.currency,
												routerState.discountedPrice,
												' for the next',
												' ',
												routerState.upToPeriods,
												' ',
												offerPeriodType,
												' then',
												' ',
												mainPlan.currency,
												getMaxNonDiscountedPrice(
													routerState.nonDiscountedPayments,
													!0,
												),
												'/',
												mainPlan.billingPeriod,
											],
										},
									),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'h3',
									{
										css: whatsNextTitleCss,
										children: [
											alternativeIsOffer &&
												'If you choose to stay with us:',
											alternativeIsPause && 'This means:',
										],
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'ul',
									{
										css: whatsNextListCss,
										children: [
											alternativeIsOffer &&
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													emotion_react_jsx_runtime_browser_esm.HY,
													{
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'li',
																{
																	children: [
																		'free' ===
																			offerIsPercentageOrFree &&
																			'Your '
																				.concat(
																					offerPeriodWord,
																					' ',
																				)
																				.concat(
																					offerPeriodType,
																					' of free access will begin on ',
																				)
																				.concat(
																					firstDiscountedPaymentDate,
																					' (when your next payment would usually be due)',
																				),
																		'percentage' ===
																			offerIsPercentageOrFree &&
																			(0,
																			productResponse.q4)(
																				mainPlan,
																			) &&
																			'You will benefit from the discounted rate, and will be charged '
																				.concat(
																					mainPlan.currency,
																				)
																				.concat(
																					routerState.discountedPrice,
																					' on your next payment date',
																				),
																	],
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'li',
																{
																	children: [
																		'free' ===
																			offerIsPercentageOrFree &&
																			'Unless you cancel before, your payment will resume on '.concat(
																				nextNonDiscountedPaymentDate,
																			),
																		'percentage' ===
																			offerIsPercentageOrFree &&
																			(0,
																			productResponse.q4)(
																				mainPlan,
																			) &&
																			'Unless you cancel before then, your '
																				.concat(
																					mainPlan.currency,
																				)
																				.concat(
																					getMaxNonDiscountedPrice(
																						routerState.nonDiscountedPayments,
																						!0,
																					),
																					'/',
																				)
																				.concat(
																					mainPlan.billingPeriod,
																					' payment will automatically resume on ',
																				)
																				.concat(
																					nextNonDiscountedPaymentDate,
																				),
																	],
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'li',
																{
																	children:
																		'You may cancel your subscription at any time',
																},
															),
														],
													},
												),
											alternativeIsPause &&
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													emotion_react_jsx_runtime_browser_esm.HY,
													{
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'li',
																{
																	children: [
																		'Unless you cancel before, your monthly support will resume on ',
																		nextNonDiscountedPaymentDate,
																	],
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'li',
																{
																	children:
																		"You'll continue to receive our monthly support newsletter (unless you've opted out)",
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'li',
																{
																	children:
																		'You may return to cancel at any time.',
																},
															),
														],
													},
												),
										],
									},
								),
								'FAILED' === performingDiscountStatus &&
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
											message:
												'Unable to complete request',
											context: (0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												emotion_react_jsx_runtime_browser_esm.HY,
												{
													children: [
														"We're sorry, but we couldn't complete your request at this time.",
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'br',
															{},
														),
														'Please try again later. If the problem persists, contact our support team for assistance.',
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'br',
															{},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															react_router_dom.rU,
															{
																to: '/',
																children:
																	'Return to your account',
															},
														),
													],
												},
											),
										},
									),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'div',
									{
										css: buttonsCtaHolder,
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												Button.z,
												CancelAlternativeReview_objectSpread(
													CancelAlternativeReview_objectSpread(
														{
															cssOverrides:
																ctaBtnCss,
														},
														confirmBtnIconProps,
													),
													{},
													{
														onClick:
															handleConfirmClick,
														children: [
															alternativeIsOffer
																? 'Confirm your offer'
																: '',
															alternativeIsPause
																? 'Confirm pausing your support'
																: '',
														],
													},
												),
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												Button.z,
												{
													priority: 'subdued',
													cssOverrides: ctaBtnCss,
													onClick: () => {
														var backUrl = '../'
															.concat(
																alternativeIsOffer
																	? 'offer'
																	: '',
															)
															.concat(
																alternativeIsPause
																	? 'pause'
																	: '',
															);
														navigate(backUrl, {
															state: routerState,
														});
													},
													children: 'Go back',
												},
											),
										],
									},
								),
								(0, productResponse.q4)(mainPlan) &&
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										emotion_react_jsx_runtime_browser_esm.HY,
										{
											children: [
												alternativeIsOffer &&
													'free' ===
														offerIsPercentageOrFree &&
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'p',
														{
															css: CancelAlternativeReview_termsCss,
															children: [
																'If you cancel during the free period, you will lose access to your benefits on the day we usually take payment. If you cancel after the free period, your subscription will end at the end of your current ',
																mainPlan.billingPeriod,
																'ly payment period.',
															],
														},
													),
												alternativeIsOffer &&
													'percentage' ===
														offerIsPercentageOrFree &&
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'p',
														{
															css: CancelAlternativeReview_termsCss,
															children: [
																'If you take up the',
																' ',
																routerState.discountPercentage,
																'% off offer and cancel during that ',
																mainPlan.billingPeriod,
																', you will lose access to your benefits at the end of the ',
																mainPlan.billingPeriod,
																'. If you cancel after the offer, when your ',
																mainPlan.currency,
																getMaxNonDiscountedPrice(
																	routerState.nonDiscountedPayments,
																	!0,
																),
																'/',
																mainPlan.billingPeriod,
																' payment automatically resumes, your subscription will end at the end of your current ',
																mainPlan.billingPeriod,
																'ly payment period',
															],
														},
													),
												alternativeIsPause &&
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'p',
														{
															css: CancelAlternativeReview_termsCss,
															children: [
																'If you cancel during the paused period, your',
																' ',
																mainPlan.billingPeriod,
																'ly payments will not automatically resume. If you cancel after the paused period, cancellation will take effect immediately and you will not be charged again.',
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
			function CancelAlternativeSwitch_ownKeys(e, r) {
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
			function CancelAlternativeSwitch_objectSpread(e) {
				for (var r = 1; r < arguments.length; r++) {
					var t = null != arguments[r] ? arguments[r] : {};
					r % 2
						? CancelAlternativeSwitch_ownKeys(
								Object(t),
								!0,
						  ).forEach(function (r) {
								CancelAlternativeSwitch_defineProperty(
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
						: CancelAlternativeSwitch_ownKeys(Object(t)).forEach(
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
			function CancelAlternativeSwitch_defineProperty(obj, key, value) {
				return (
					(key = (function CancelAlternativeSwitch_toPropertyKey(
						arg,
					) {
						var key = (function CancelAlternativeSwitch_toPrimitive(
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
			var CancelAlternativeSwitch_standfirstCss = (0,
				emotion_react_browser_esm.iv)(
					typography.Ff7,
					';color:',
					colour_palette.n$[7],
					';margin:0 0 ',
					space.D[8],
					'px;',
					'',
				),
				CancelAlternativeSwitch_availableOfferBoxCss = (0,
				emotion_react_browser_esm.iv)(
					typography.Kz0,
					';border:1px solid ',
					palette.palette.neutral[86],
					';position:relative;display:flex;flex-wrap:wrap;margin:',
					space.D[5],
					'px 0 ',
					space.D[8],
					'px;width:100%;',
					mq.Dp.tablet,
					'{border:none;}',
					'',
				),
				CancelAlternativeSwitch_offerBoxWithoutImageCss = (0,
				emotion_react_browser_esm.iv)(
					mq.Dp.tablet,
					'{border:1px solid ',
					palette.palette.neutral[93],
					';}',
					'',
				),
				CancelAlternativeSwitch_availableOfferBoxInnerCss = (0,
				emotion_react_browser_esm.iv)(
					'padding:',
					space.D[5],
					'px ',
					space.D[4],
					'px ',
					space.D[5],
					'px;width:100%;position:relative;',
					mq.Dp.tablet,
					'{background-color:',
					palette.palette.neutral[100],
					';width:366px;padding:',
					space.D[5],
					'px ',
					space.D[6],
					'px ',
					space.D[5],
					'px;margin:',
					space.D[6],
					'px;}',
					'',
				),
				CancelAlternativeSwitch_offerBoxInnerWithoutImageCss = (0,
				emotion_react_browser_esm.iv)(
					'padding:',
					space.D[4],
					'px;',
					mq.Dp.tablet,
					'{width:410px;padding:',
					space.D[6],
					'px;margin:0;}',
					'',
				),
				CancelAlternativeSwitch_headerImageCss = (0,
				emotion_react_browser_esm.iv)(
					'display:flex;justify-content:center;width:100%;height:auto;background-color:',
					palette.palette.culture[800],
					';',
					mq.Dp.tablet,
					'{position:absolute;z-index:-1;height:100%;overflow:hidden;justify-content:flex-start;img{height:100%;margin-left:389px;}}',
					'',
				),
				CancelAlternativeSwitch_pillCss = {
					name: '1g3kad8',
					styles: 'transform:translate(-50%, -50%);display:inline-block;position:absolute;top:0;left:50%',
				},
				offerBoxHeaderCss = (0, emotion_react_browser_esm.iv)(
					typography.Kie,
					';text-align:center;color:',
					colour_palette.n$[7],
					';margin:0;',
					'',
				),
				offerHeaderPriceCss = (0, emotion_react_browser_esm.iv)(
					typography.JX9,
					';color:',
					colour_palette.n$[7],
					';margin:0;',
					'',
				),
				CancelAlternativeSwitch_strikethroughPriceCss = (0,
				emotion_react_browser_esm.iv)(
					typography.Kz0,
					';color:',
					colour_palette.n$[46],
					';margin:0;',
					'',
				),
				CancelAlternativeSwitch_offerButtonCss = (0,
				emotion_react_browser_esm.iv)(
					'margin:',
					space.D[5],
					'px 0 0;width:100%;justify-content:center;',
					'',
				),
				CancelAlternativeSwitch_benefitsSubTitleCss = (0,
				emotion_react_browser_esm.iv)(
					'margin:0 0 ',
					space.D[3],
					'px;',
					typography.fRL,
					';',
					mq.Dp.tablet,
					'{border-top:1px solid ',
					palette.palette.neutral[86],
					';padding-top:',
					space.D[3],
					'px;margin-bottom:',
					space.D[4],
					'px;}',
					'',
				),
				CancelAlternativeSwitch_cancelBtnHolderCss = (0,
				emotion_react_browser_esm.iv)(
					mq.Dp.phablet,
					'{display:flex;justify-content:space-between;}',
					'',
				),
				CancelAlternativeSwitch_cancelButtonCss = (0,
				emotion_react_browser_esm.iv)(
					'margin:0 0 ',
					space.D[3],
					'px;width:100%;justify-content:center;',
					mq.Dp.tablet,
					'{width:fit-content;}',
					'',
				),
				CancelAlternativeSwitch_termsCss = (0,
				emotion_react_browser_esm.iv)(
					typography.Hi4,
					';color:',
					palette.palette.neutral[46],
					';margin-top:',
					space.D[3],
					'px;',
					'',
				),
				CancelAlternativeSwitch_ref = {
					name: 'e946zq',
					styles: 'max-width:290px',
				},
				CancelAlternativeSwitch = () => {
					var routerState = (0, react_router.TH)().state,
						navigate = (0, react_router.s0)(),
						productDetail = (0, react.useContext)(
							CancellationContainer.DW,
						).productDetail,
						mainPlan = (0, productResponse.fr)(
							productDetail.subscription,
						),
						heroImageSrc_mobile =
							'https://media.guim.co.uk/63d17ee19313703129fbbeacceaafcd6d1cc1014/0_0_1404_716/500.png',
						heroImageSrc_desktop =
							'https://i.guim.co.uk/img/media/02c17de8ea17126fbd87f6567ce5cd80f128546d/0_0_2212_1869/2000.png?width=1000&quality=75&s=492edad637979aa4e57e957cb12cd4f1',
						withHeroImage =
							Boolean(heroImageSrc_mobile) &&
							Boolean(heroImageSrc_desktop);
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									ProgressStepper.S,
									{
										steps: [
											{},
											{},
											{ isCurrentStep: !0 },
											{},
										],
										additionalCSS: (0,
										emotion_react_browser_esm.iv)(
											'margin:',
											space.D[8],
											'px 0 ',
											space.D[9],
											'px;',
											'',
										),
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									Heading.X,
									{
										borderless: !0,
										cssOverrides: [
											styles_typography.L.heading,
											(0, emotion_react_browser_esm.iv)(
												'margin-bottom:',
												space.D[2],
												'px;',
												'',
											),
										],
										children: 'Before you go...',
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'h3',
									{
										css: CancelAlternativeSwitch_standfirstCss,
										children:
											'Consider staying a Guardian supporter and continue making great impact in support of open, independent journalism.',
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'div',
									{
										css: [
											CancelAlternativeSwitch_availableOfferBoxCss,
											!withHeroImage &&
												CancelAlternativeSwitch_offerBoxWithoutImageCss,
											'',
											'',
										],
										children: [
											withHeroImage &&
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'picture',
													{
														css: CancelAlternativeSwitch_headerImageCss,
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'source',
																{
																	srcSet: heroImageSrc_desktop,
																	media: '(min-width: 740px)',
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'img',
																{
																	src: heroImageSrc_mobile,
																},
															),
														],
													},
												),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'div',
												{
													css: [
														CancelAlternativeSwitch_availableOfferBoxInnerCss,
														!withHeroImage &&
															CancelAlternativeSwitch_offerBoxInnerWithoutImageCss,
														'',
														'',
													],
													children:
														(0, productResponse.q4)(
															mainPlan,
														) &&
														(0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															emotion_react_jsx_runtime_browser_esm.HY,
															{
																children: [
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		Pill,
																		{
																			copy: 'Your one-time offer',
																			colour: palette
																				.palette
																				.news[400],
																			additionalCss:
																				CancelAlternativeSwitch_pillCss,
																		},
																	),
																	(0,
																	emotion_react_jsx_runtime_browser_esm.BX)(
																		'h4',
																		{
																			css: offerBoxHeaderCss,
																			children:
																				[
																					'Unlock All-access digital for',
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						'br',
																						{},
																					),
																					(0,
																					emotion_react_jsx_runtime_browser_esm.BX)(
																						'span',
																						{
																							css: offerHeaderPriceCss,
																							children:
																								[
																									mainPlan.currency,
																									Math.ceil(
																										routerState.amountPayableToday,
																									),
																								],
																						},
																					),
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						'span',
																						{
																							children:
																								'/year ',
																						},
																					),
																					(0,
																					emotion_react_jsx_runtime_browser_esm.BX)(
																						's',
																						{
																							css: CancelAlternativeSwitch_strikethroughPriceCss,
																							children:
																								[
																									mainPlan.currency,
																									routerState.supporterPlusPurchaseAmount,
																									'/',
																									mainPlan.billingPeriod,
																								],
																						},
																					),
																				],
																		},
																	),
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		Button.z,
																		{
																			onClick:
																				() => {
																					navigate(
																						'../switch-review',
																						{
																							state: routerState,
																						},
																					);
																				},
																			cssOverrides:
																				[
																					CancelAlternativeSwitch_offerButtonCss,
																				],
																			children:
																				'Redeem the offer',
																		},
																	),
																	(0,
																	emotion_react_jsx_runtime_browser_esm.BX)(
																		'p',
																		{
																			css: CancelAlternativeSwitch_termsCss,
																			children:
																				[
																					'You will pay ',
																					mainPlan.currency,
																					routerState.amountPayableToday,
																					' for the next 12 months then ',
																					mainPlan.currency,
																					routerState.supporterPlusPurchaseAmount,
																					'/year.',
																				],
																		},
																	),
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'p',
																		{
																			css: CancelAlternativeSwitch_benefitsSubTitleCss,
																			children:
																				'Access exclusive benefits:',
																		},
																	),
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'div',
																		{
																			css: CancelAlternativeSwitch_ref,
																			children:
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					BenefitsSection.c,
																					{
																						small: !0,
																						benefits:
																							[
																								{
																									description:
																										'Unlimited access to the Guardian app',
																								},
																								{
																									description:
																										'Unlimited access to the Guardian Feast App',
																								},
																								{
																									description:
																										'Ad-free reading across all your devices',
																								},
																								{
																									description:
																										'Exclusive supporter newsletter',
																								},
																								{
																									description:
																										"Far fewer asks for support when you're signed in",
																								},
																							],
																					},
																				),
																		},
																	),
																],
															},
														),
												},
											),
										],
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'div',
									{
										css: CancelAlternativeSwitch_cancelBtnHolderCss,
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												Button.z,
												{
													priority: 'tertiary',
													cssOverrides:
														CancelAlternativeSwitch_cancelButtonCss,
													onClick: () => {
														navigate('../confirm', {
															state: CancelAlternativeSwitch_objectSpread(
																CancelAlternativeSwitch_objectSpread(
																	{},
																	routerState,
																),
																{},
																{
																	eligibleForFreePeriodOffer:
																		!1,
																	eligibleForPause:
																		!1,
																},
															),
														});
													},
													children:
														'No thanks, continue to cancel',
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												Button.z,
												{
													priority: 'subdued',
													cssOverrides:
														CancelAlternativeSwitch_cancelButtonCss,
													onClick: () => {
														navigate('/');
													},
													children:
														'Return to your account',
												},
											),
										],
									},
								),
								(0, productResponse.q4)(mainPlan) &&
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'p',
										{
											css: CancelAlternativeSwitch_termsCss,
											children:
												'Ollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu',
										},
									),
							],
						},
					);
				},
				SvgClock = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgClock.js',
				),
				SvgHouseCross = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgHouseCross.js',
				),
				SvgCreditCard = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgCreditCard.js',
				),
				PaymentMethodDisplay = __webpack_require__(
					'./client/components/mma/shared/PaymentMethodDisplay.tsx',
				);
			function CancelAlternativeSwitchReview_ownKeys(e, r) {
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
			function CancelAlternativeSwitchReview_objectSpread(e) {
				for (var r = 1; r < arguments.length; r++) {
					var t = null != arguments[r] ? arguments[r] : {};
					r % 2
						? CancelAlternativeSwitchReview_ownKeys(
								Object(t),
								!0,
						  ).forEach(function (r) {
								CancelAlternativeSwitchReview_defineProperty(
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
						: CancelAlternativeSwitchReview_ownKeys(
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
			function CancelAlternativeSwitchReview_defineProperty(
				obj,
				key,
				value,
			) {
				return (
					(key =
						(function CancelAlternativeSwitchReview_toPropertyKey(
							arg,
						) {
							var key =
								(function CancelAlternativeSwitchReview_toPrimitive(
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
			function CancelAlternativeSwitchReview_asyncGeneratorStep(
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
			var CancelAlternativeSwitchReview_yourOfferBoxCss = (0,
				emotion_react_browser_esm.iv)(
					'background-color:#fbf6ef;padding:',
					space.D[4],
					'px ',
					space.D[6],
					'px;position:relative;h4{',
					typography.Rcn,
					';margin:0;}p{margin:0;}',
					'',
				),
				CancelAlternativeSwitchReview_yourOfferBoxFlexCss = {
					name: '1fttcpj',
					styles: 'display:flex;flex-direction:column',
				},
				yourOfferBoxHeaderCss = (0, emotion_react_browser_esm.iv)(
					typography.Rze,
					';color:',
					colour_palette.n$[7],
					';margin:0;',
					'',
				),
				yourOfferBoxSubHeaderCss = (0, emotion_react_browser_esm.iv)(
					typography.Rcn,
					';color:',
					colour_palette.n$[7],
					';',
					'',
				),
				CancelAlternativeSwitchReview_strikethroughPriceCss = (0,
				emotion_react_browser_esm.iv)(
					typography.Kz0,
					';color:',
					colour_palette.n$[46],
					';',
					'',
				),
				CancelAlternativeSwitchReview_percentageOfferSubText = (0,
				emotion_react_browser_esm.iv)(
					typography.Hi4,
					';color:',
					colour_palette.n$[38],
					';margin-top:',
					space.D[2],
					'px;',
					'',
				),
				pricingDetailsCss = (0, emotion_react_browser_esm.iv)(
					'margin-top:',
					space.D[4],
					'px;& summary{color:',
					palette.palette.brand[500],
					';text-decoration:underline;list-style:none;& :marker{display:none;}}&[open]{& summary{color:green;}}',
					'',
				),
				pricingDetailsTable = (0, emotion_react_browser_esm.iv)(
					'margin-top:',
					space.D[2],
					'px;border-collapse:collapse;',
					typography.VZD,
					';& tbody{border-top:1px solid ',
					colour_palette.n$[86],
					';}& tbody tr:first-of-type td{padding-top:',
					space.D[1],
					'px;}& tbody tr:last-of-type td{padding-bottom:',
					space.D[1],
					'px;}& td{padding:0;}& td:nth-child(even){text-align:right;}& tfoot{border-top:1px solid ',
					colour_palette.n$[86],
					';& th,td{',
					typography.fRL,
					';text-align:left;padding-top:',
					space.D[1],
					'px;}}',
					'',
				),
				subduedCopy = (0, emotion_react_browser_esm.iv)(
					'color:',
					colour_palette.n$[38],
					';',
					'',
				),
				CancelAlternativeSwitchReview_whatsNextTitleCss = (0,
				emotion_react_browser_esm.iv)(
					typography.D35,
					';margin-top:',
					space.D[6],
					'px;',
					mq.Dp.desktop,
					'{margin-top:',
					space.D[8],
					'px;}',
					'',
				),
				CancelAlternativeSwitchReview_whatsNextListCss = (0,
				emotion_react_browser_esm.iv)(
					typography.Ff7,
					';padding:0;color:',
					colour_palette.n$[7],
					';dt{',
					typography.Rcn,
					';display:flex;gap:',
					space.D[2],
					'px;}dd{',
					typography.Kz0,
					';margin:0 0 ',
					space.D[5],
					'px;padding-left:',
					space.D[9],
					'px;}dd+dt{padding-top:',
					space.D[2],
					"px;& span{flex-grow:1;position:relative;&::before{content:'';position:absolute;top:-",
					space.D[2],
					'px;width:100%;height:1px;background-color:',
					colour_palette.n$[86],
					';}}}',
					'',
				),
				paymentMethodParaCss = {
					name: 'bpd7z7',
					styles: 'margin-bottom:2px',
				},
				CancelAlternativeSwitchReview_buttonsCtaHolder = (0,
				emotion_react_browser_esm.iv)(
					'margin:',
					space.D[8],
					'px 0 ',
					space.D[6],
					'px;display:flex;flex-direction:column;gap:',
					space.D[2],
					'px;',
					mq.Dp.phablet,
					'{flex-direction:row;gap:',
					space.D[6],
					'px;margin-top:',
					space.D[9],
					'px;}',
					'',
				),
				CancelAlternativeSwitchReview_ctaBtnCss = (0,
				emotion_react_browser_esm.iv)(
					'width:100%;justify-content:center;',
					mq.Dp.desktop,
					'{width:fit-content;}',
					'',
				),
				CancelAlternativeSwitchReview_termsCss = (0,
				emotion_react_browser_esm.iv)(
					typography.Hi4,
					';color:',
					palette.palette.neutral[46],
					';margin-top:',
					space.D[3],
					'px;',
					'',
				),
				CancelAlternativeSwitchReview = () => {
					var routerState = (0, react_router.TH)().state,
						navigate = (0, react_router.s0)(),
						cancellationContext = (0, react.useContext)(
							CancellationContainer.DW,
						),
						productDetail = cancellationContext.productDetail,
						productType = cancellationContext.productType,
						mainPlan = (0, productResponse.fr)(
							productDetail.subscription,
						),
						offerPeriodType = (0, generalTypes.T)(
							routerState.discount.upToPeriodsType,
							1,
						).toLowerCase(),
						offsetPrice =
							routerState.discount.discountedPrice -
							routerState.amountPayableToday,
						[
							performingDiscountStatus,
							setPerformingDiscountStatus,
						] = (0, react.useState)('NOT_READY'),
						confirmBtnIconProps = {};
					'PENDING' === performingDiscountStatus &&
						((confirmBtnIconProps.icon = (0,
						emotion_react_jsx_runtime_browser_esm.tZ)(Spinner.$, {
							size: 'xsmall',
						})),
						(confirmBtnIconProps.iconSide = 'right'),
						(confirmBtnIconProps.disabled = !0),
						(confirmBtnIconProps['aria-disabled'] = !0));
					var alternativeIsOffer =
							'supporterplus' === productType.productType,
						alternativeIsPause =
							'contributions' === productType.productType,
						handleConfirmClick = (function () {
							var _ref =
								(function CancelAlternativeSwitchReview_asyncToGenerator(
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
												CancelAlternativeSwitchReview_asyncGeneratorStep(
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
												CancelAlternativeSwitchReview_asyncGeneratorStep(
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
									setPerformingDiscountStatus('PENDING');
									try {
										if (
											(yield (0, utilities_fetch.n4)(
												'/api/discounts/apply-discount',
												{
													method: 'POST',
													body: JSON.stringify({
														subscriptionNumber:
															productDetail
																.subscription
																.subscriptionId,
													}),
												},
											)).ok
										) {
											navigate('../switch-confirmed', {
												state: routerState,
											});
										} else setPerformingDiscountStatus('FAILED');
									} catch (_unused) {
										setPerformingDiscountStatus('FAILED');
									}
								});
							return function handleConfirmClick() {
								return _ref.apply(this, arguments);
							};
						})();
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									ProgressStepper.S,
									{
										steps: [
											{},
											{},
											{},
											{ isCurrentStep: !0 },
										],
										additionalCSS: (0,
										emotion_react_browser_esm.iv)(
											'margin:',
											space.D[8],
											'px 0 ',
											space.D[9],
											'px;',
											'',
										),
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									Heading.X,
									{
										borderless: !0,
										cssOverrides: [
											styles_typography.L.heading,
											(0, emotion_react_browser_esm.iv)(
												'margin-bottom:',
												space.D[6],
												'px;',
												'',
											),
										],
										children: 'Your offer',
									},
								),
								(0, productResponse.q4)(mainPlan) &&
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										emotion_react_jsx_runtime_browser_esm.HY,
										{
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'div',
													{
														css: [
															CancelAlternativeSwitchReview_yourOfferBoxCss,
															'',
															'',
														],
														children: (0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															'div',
															{
																css: [
																	CancelAlternativeSwitchReview_yourOfferBoxFlexCss,
																	'',
																	'',
																],
																children: [
																	(0,
																	emotion_react_jsx_runtime_browser_esm.BX)(
																		'h3',
																		{
																			css: yourOfferBoxHeaderCss,
																			children:
																				[
																					mainPlan.currency,
																					routerState.amountPayableToday,
																					'/',
																					offerPeriodType,
																					' ',
																					(0,
																					emotion_react_jsx_runtime_browser_esm.BX)(
																						's',
																						{
																							css: CancelAlternativeSwitchReview_strikethroughPriceCss,
																							children:
																								[
																									mainPlan.currency,
																									routerState.supporterPlusPurchaseAmount,
																									'/',
																									mainPlan.billingPeriod,
																								],
																						},
																					),
																				],
																		},
																	),
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'h4',
																		{
																			css: yourOfferBoxSubHeaderCss,
																			children:
																				'For your All-access digital subscription',
																		},
																	),
																	(0,
																	productResponse.q4)(
																		mainPlan,
																	) &&
																		(0,
																		emotion_react_jsx_runtime_browser_esm.BX)(
																			'p',
																			{
																				css: CancelAlternativeSwitchReview_percentageOfferSubText,
																				children:
																					[
																						'You will pay ',
																						mainPlan.currency,
																						routerState.amountPayableToday,
																						' for the next',
																						' ',
																						(0,
																						dates.mB)(
																							routerState
																								.discount
																								.upToPeriods,
																							offerPeriodType,
																							{
																								preferredPeriodType:
																									'month',
																								maxPreferenceValue: 12,
																								preferNumberedOutput:
																									!0,
																							},
																						),
																						' ',
																						'then ',
																						mainPlan.currency,
																						routerState.supporterPlusPurchaseAmount,
																						'/',
																						mainPlan.billingPeriod,
																					],
																			},
																		),
																	(0,
																	emotion_react_jsx_runtime_browser_esm.BX)(
																		'details',
																		{
																			css: pricingDetailsCss,
																			children:
																				[
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						'summary',
																						{
																							children:
																								'Pricing details',
																						},
																					),
																					(0,
																					emotion_react_jsx_runtime_browser_esm.BX)(
																						'table',
																						{
																							css: pricingDetailsTable,
																							children:
																								[
																									(0,
																									emotion_react_jsx_runtime_browser_esm.BX)(
																										'tbody',
																										{
																											children:
																												[
																													(0,
																													emotion_react_jsx_runtime_browser_esm.BX)(
																														'tr',
																														{
																															children:
																																[
																																	(0,
																																	emotion_react_jsx_runtime_browser_esm.BX)(
																																		'td',
																																		{
																																			children:
																																				[
																																					'All-access digital |',
																																					' ',
																																					routerState
																																						.discount
																																						.discountPercentage,
																																					'% off',
																																				],
																																		},
																																	),
																																	(0,
																																	emotion_react_jsx_runtime_browser_esm.BX)(
																																		'td',
																																		{
																																			children:
																																				[
																																					(0,
																																					emotion_react_jsx_runtime_browser_esm.BX)(
																																						's',
																																						{
																																							css: subduedCopy,
																																							children:
																																								[
																																									mainPlan.currency,
																																									routerState.supporterPlusPurchaseAmount,
																																								],
																																						},
																																					),
																																					' ',
																																					mainPlan.currency,
																																					routerState
																																						.discount
																																						.discountedPrice,
																																				],
																																		},
																																	),
																																],
																														},
																													),
																													offsetPrice >
																														0 &&
																														(0,
																														emotion_react_jsx_runtime_browser_esm.BX)(
																															'tr',
																															{
																																children:
																																	[
																																		(0,
																																		emotion_react_jsx_runtime_browser_esm.tZ)(
																																			'td',
																																			{
																																				children:
																																					'Amount offset from Recurring annual support',
																																			},
																																		),
																																		(0,
																																		emotion_react_jsx_runtime_browser_esm.BX)(
																																			'td',
																																			{
																																				children:
																																					[
																																						'-',
																																						mainPlan.currency,
																																						offsetPrice.toFixed(
																																							2,
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
																									emotion_react_jsx_runtime_browser_esm.tZ)(
																										'tfoot',
																										{
																											children:
																												(0,
																												emotion_react_jsx_runtime_browser_esm.BX)(
																													'tr',
																													{
																														children:
																															[
																																(0,
																																emotion_react_jsx_runtime_browser_esm.tZ)(
																																	'th',
																																	{
																																		children:
																																			'Total',
																																	},
																																),
																																(0,
																																emotion_react_jsx_runtime_browser_esm.BX)(
																																	'td',
																																	{
																																		children:
																																			[
																																				mainPlan.currency,
																																				routerState.amountPayableToday,
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
													'h3',
													{
														css: CancelAlternativeSwitchReview_whatsNextTitleCss,
														children:
															'What happens next?',
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'dl',
													{
														css: CancelAlternativeSwitchReview_whatsNextListCss,
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'dt',
																{
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			SvgClock.h,
																			{
																				size: 'small',
																				'aria-hidden':
																					'true',
																			},
																		),
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'span',
																			{
																				children:
																					'This change will happen today',
																			},
																		),
																	],
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'dd',
																{
																	children:
																		'Dive in and start enjoying your exclusive extras straight away',
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'dt',
																{
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			SvgHouseCross.c,
																			{
																				size: 'small',
																				'aria-hidden':
																					'true',
																			},
																		),
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'span',
																			{
																				children:
																					'This will cancel your existing support',
																			},
																		),
																	],
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'dd',
																{
																	children: [
																		'Your existing annual support of ',
																		mainPlan.currency,
																		mainPlan.price /
																			100,
																		' will be canceled and replaced with a 12 month All-access digital subscription. You will pay ',
																		mainPlan.currency,
																		routerState.amountPayableToday,
																		' for the next 12 months then ',
																		mainPlan.currency,
																		routerState.supporterPlusPurchaseAmount,
																		'/year. Auto renews every year until you cancel.',
																	],
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'dt',
																{
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			SvgCreditCard.n,
																			{
																				size: 'small',
																				'aria-hidden':
																					'true',
																			},
																		),
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'span',
																			{
																				children:
																					'Your payment method',
																			},
																		),
																	],
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'dd',
																{
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'p',
																			{
																				css: paymentMethodParaCss,
																				children:
																					'We will take payment as before, from',
																			},
																		),
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			PaymentMethodDisplay.C,
																			{
																				subscription:
																					productDetail.subscription,
																				inPaymentFailure:
																					!1,
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
								'FAILED' === performingDiscountStatus &&
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
											message:
												'Unable to complete request',
											context: (0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												emotion_react_jsx_runtime_browser_esm.HY,
												{
													children: [
														"We're sorry, but we couldn't complete your request at this time.",
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'br',
															{},
														),
														'Please try again later. If the problem persists, contact our support team for assistance.',
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'br',
															{},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															react_router_dom.rU,
															{
																to: '/',
																children:
																	'Return to your account',
															},
														),
													],
												},
											),
										},
									),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'div',
									{
										css: CancelAlternativeSwitchReview_buttonsCtaHolder,
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												Button.z,
												CancelAlternativeSwitchReview_objectSpread(
													CancelAlternativeSwitchReview_objectSpread(
														{
															cssOverrides:
																CancelAlternativeSwitchReview_ctaBtnCss,
														},
														confirmBtnIconProps,
													),
													{},
													{
														onClick:
															handleConfirmClick,
														children:
															'Confirm your offer',
													},
												),
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												Button.z,
												{
													priority: 'subdued',
													cssOverrides:
														CancelAlternativeSwitchReview_ctaBtnCss,
													onClick: () => {
														var backUrl = '../'
															.concat(
																alternativeIsOffer
																	? 'offer'
																	: '',
															)
															.concat(
																alternativeIsPause
																	? 'pause'
																	: '',
															);
														navigate(backUrl, {
															state: routerState,
														});
													},
													children: 'Go back',
												},
											),
										],
									},
								),
								(0, productResponse.q4)(mainPlan) &&
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										emotion_react_jsx_runtime_browser_esm.HY,
										{
											children: (0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'p',
												{
													css: CancelAlternativeSwitchReview_termsCss,
													children:
														'Ollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu',
												},
											),
										},
									),
							],
						},
					);
				},
				ContributionsCancellationReasons = __webpack_require__(
					'./client/components/mma/cancel/contributions/ContributionsCancellationReasons.tsx',
				),
				GwCancellationReasons = __webpack_require__(
					'./client/components/mma/cancel/gw/GwCancellationReasons.tsx',
				),
				headingWithContentAbove = (0, emotion_react_browser_esm.iv)(
					'margin-bottom:',
					space.D[6],
					'px;',
					'',
				),
				headingWithoutContentAbove = (0, emotion_react_browser_esm.iv)(
					'margin:',
					space.D[9],
					'px 0 ',
					space.D[6],
					'px;',
					'',
				),
				copyCss = (0, emotion_react_browser_esm.iv)(
					typography.Ff7,
					';',
					'',
				),
				youllLoseList = (0, emotion_react_browser_esm.iv)(
					'padding:0;padding-inline-start:14px;li+li{margin-top:',
					space.D[3],
					'px;}',
					'',
				),
				loseDateCss = (0, emotion_react_browser_esm.iv)(
					":before{content:'';display:block;width:100%;max-width:580px;height:1px;background-color:",
					palette.palette.neutral[86],
					';margin:',
					space.D[6],
					'px 0;}margin:0;',
					'',
				),
				ConfirmCancellation_buttonsCtaHolder = (0,
				emotion_react_browser_esm.iv)(
					'margin-top:',
					space.D[8],
					'px;display:flex;flex-direction:column;gap:',
					space.D[2],
					'px;',
					mq.Dp.phablet,
					'{flex-direction:row;gap:',
					space.D[6],
					'px;margin-top:',
					space.D[9],
					'px;}',
					'',
				),
				ConfirmCancellation_ctaBtnCss = (0,
				emotion_react_browser_esm.iv)(
					'width:100%;justify-content:center;',
					mq.Dp.phablet,
					'{width:fit-content;}',
					'',
				),
				ConfirmCancellation = () => {
					var _productType$cancella,
						_productType$cancella2,
						routerState = (0, react_router.TH)().state,
						navigate = (0, react_router.s0)(),
						cancellationContext = (0, react.useContext)(
							CancellationContainer.DW,
						),
						productDetail = cancellationContext.productDetail,
						productType = cancellationContext.productType,
						groupedProductType =
							productTypes.HP[productType.groupedProductType],
						pageTitleContext = (0, react.useContext)(
							CancellationContainer.mc,
						),
						subscription = productDetail.subscription,
						productIsSubscription =
							'supporterplus' === productType.productType,
						productIsContribution =
							'contributions' === productType.productType,
						productIsGuardianAdLite =
							'guardianadlite' === productType.productType,
						isInTrialPeriod = subscription.trialLength > 0,
						progressStepperArray = [
							{},
							{},
							{
								isCurrentStep:
									!routerState.eligibleForFreePeriodOffer,
							},
							{
								isCurrentStep:
									routerState.eligibleForFreePeriodOffer,
							},
						];
					return (
						(0, react.useEffect)(() => {
							pageTitleContext.setPageTitle(
								'Cancel '.concat(
									groupedProductType.friendlyName,
								),
							);
						}, [groupedProductType.friendlyName, pageTitleContext]),
						(0, emotion_react_jsx_runtime_browser_esm.BX)(
							emotion_react_jsx_runtime_browser_esm.HY,
							{
								children: [
									(null ===
										(_productType$cancella =
											productType.cancellation) ||
									void 0 === _productType$cancella
										? void 0
										: _productType$cancella.reasons) &&
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											ProgressStepper.S,
											{
												steps: progressStepperArray,
												additionalCSS: (0,
												emotion_react_browser_esm.iv)(
													'margin:',
													space.D[8],
													'px 0 ',
													space.D[9],
													'px;',
													'',
												),
											},
										),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										Heading.X,
										{
											borderless: !0,
											cssOverrides: [
												styles_typography.L.heading,
												null !==
													(_productType$cancella2 =
														productType.cancellation) &&
												void 0 !==
													_productType$cancella2 &&
												_productType$cancella2.reasons
													? headingWithContentAbove
													: headingWithoutContentAbove,
											],
											children: productIsGuardianAdLite
												? 'Cancel your '.concat(
														productType.productTitle(),
														' subscription',
												  )
												: 'Is this really goodbye?',
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'div',
										{
											css: copyCss,
											children: [
												(productIsSubscription &&
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														emotion_react_jsx_runtime_browser_esm.HY,
														{
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'p',
																	{
																		children:
																			'If you confirm your cancellation, you will lose the following benefits:',
																	},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'ul',
																	{
																		css: youllLoseList,
																		children:
																			[
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					'li',
																					{
																						children:
																							'Unlimited access to the Guardian app',
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					'li',
																					{
																						children:
																							'Ad-free reading across all your devices',
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					'li',
																					{
																						children:
																							'Exclusive supporter newsletter',
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					'li',
																					{
																						children:
																							"Far fewer asks for support when you're signed in",
																					},
																				),
																			],
																	},
																),
																subscription.potentialCancellationDate &&
																	(0,
																	emotion_react_jsx_runtime_browser_esm.BX)(
																		'p',
																		{
																			css: loseDateCss,
																			children:
																				[
																					'You will no longer have access to these benefits from',
																					' ',
																					(0,
																					dates.sG)(
																						subscription.potentialCancellationDate,
																						'yyyy-MM-dd',
																					).dateStr(
																						dates.Bn,
																					),
																					'.',
																				],
																		},
																	),
															],
														},
													)) ||
													(productIsContribution &&
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'p',
															{
																children:
																	"If you confirm your cancellation, you will no longer be supporting the Guardian's reader-funded journalism.",
															},
														)) ||
													(productIsGuardianAdLite &&
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															emotion_react_jsx_runtime_browser_esm.HY,
															{
																children: (0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'p',
																	{
																		children:
																			[
																				'If you confirm your cancellation you will start to see personalised advertising on the Guardian website across your devices from',
																				' ',
																				!isInTrialPeriod &&
																				subscription.potentialCancellationDate
																					? (0,
																					  dates.sG)(
																							subscription.potentialCancellationDate,
																							'yyyy-MM-dd',
																					  ).dateStr(
																							dates.Bn,
																					  )
																					: 'now on',
																				'.',
																			],
																	},
																),
															},
														)),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'div',
													{
														css: ConfirmCancellation_buttonsCtaHolder,
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																Button.z,
																{
																	cssOverrides:
																		ConfirmCancellation_ctaBtnCss,
																	onClick:
																		() => {
																			navigate(
																				'../confirmed',
																				{
																					state: routerState,
																				},
																			);
																		},
																	children:
																		'Confirm cancellation',
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																Button.z,
																{
																	cssOverrides:
																		ConfirmCancellation_ctaBtnCss,
																	priority:
																		'tertiary',
																	onClick:
																		() => {
																			navigate(
																				'/',
																			);
																		},
																	children:
																		productIsSubscription ||
																		productIsGuardianAdLite
																			? 'Keep my subscription'
																			: 'Keep supporting',
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
						)
					);
				},
				CancellationSummary = __webpack_require__(
					'./client/components/mma/cancel/CancellationSummary.tsx',
				);
			function ExecuteCancellation_asyncGeneratorStep(
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
			function ExecuteCancellation_asyncToGenerator(fn) {
				return function () {
					var self = this,
						args = arguments;
					return new Promise(function (resolve, reject) {
						var gen = fn.apply(self, args);
						function _next(value) {
							ExecuteCancellation_asyncGeneratorStep(
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
							ExecuteCancellation_asyncGeneratorStep(
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
			class PerformCancelAsyncLoader extends AsyncLoader.y {}
			var getCancelFunc = (
					subscriptionName,
					productType,
					reason,
					withSubscriptionResponseFetcher,
				) =>
					ExecuteCancellation_asyncToGenerator(function* () {
						var cancellationApi =
							'SupporterPlus' ===
							productType.allProductsProductTypeFilterString
								? '/api/supporter-plus-cancel/'
								: '/api/cancel/';
						return (
							yield (0, utilities_fetch.n4)(
								''
									.concat(cancellationApi)
									.concat(subscriptionName),
								{
									method: 'POST',
									body: JSON.stringify({ reason }),
									headers: {
										'Content-Type': 'application/json',
									},
								},
							),
							yield withSubscriptionResponseFetcher()
						);
					}),
				getCaseUpdateWithCancelOutcomeFunc =
					(caseId, productDetail) => () =>
						getUpdateCasePromise(
							productDetail.isTestUser,
							(0, CancellationSummary.j)(
								productDetail.subscription,
							)
								? '_CANCELLED'
								: '_ERROR',
							caseId,
							(0, CancellationSummary.j)(
								productDetail.subscription,
							)
								? {
										Journey__c: 'SV - Cancellation - MB',
										Subject:
											'Online Cancellation Completed',
								  }
								: {
										Subject: 'Online Cancellation Error',
										Status: 'New',
										Priority: 'High',
								  },
						),
				getCaseUpdateFuncForEscalation =
					(caseId, escalationCauses, isTestUser) => () =>
						getUpdateCasePromise(isTestUser, '_ESCALATED', caseId, {
							Journey__c: 'SV - Cancellation - MB',
							Subject:
								'Online Cancellation MANUAL INTERVENTION REQUIRED - '.concat(
									escalationCauses.join(' & '),
								),
							Status: 'New',
							Priority: 'High',
						}),
				ReturnToAccountButton = () => {
					var navigate = (0, react_router.s0)();
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						Button.z,
						{
							cssOverrides: (0, emotion_react_browser_esm.iv)(
								'margin-top:',
								space.D[5],
								'px;',
								'',
							),
							priority: 'tertiary',
							onClick: () => navigate('/'),
							children: 'Return to your account',
						},
					);
				},
				getCancellationSummaryWithReturnButton =
					(body, excludeReturnButton) => () =>
						(0, emotion_react_jsx_runtime_browser_esm.BX)('div', {
							children: [
								body,
								!excludeReturnButton &&
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										ReturnToAccountButton,
										{},
									),
							],
						}),
				getCaseUpdatingCancellationSummary =
					(
						productType,
						productDetailBeforeCancelling,
						eligableForOffer,
						eligibleForPause,
						cancellationReasonId,
						caseId,
					) =>
					(mdapiResponse) => {
						var _productType$cancella,
							productDetail = mdapiResponse.products[0] || {
								subscription: {},
							},
							render = getCancellationSummaryWithReturnButton(
								(0, CancellationSummary.M)(
									productType,
									productDetail,
									productDetailBeforeCancelling,
									eligableForOffer,
									eligibleForPause,
									cancellationReasonId,
								),
								!(
									null ===
										(_productType$cancella =
											productType.cancellation) ||
									void 0 === _productType$cancella ||
									!_productType$cancella.shouldShowReminder
								) || eligibleForPause,
							);
						return caseId
							? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
									CaseUpdateAsyncLoader,
									{
										fetch: getCaseUpdateWithCancelOutcomeFunc(
											caseId,
											productDetail,
										),
										render,
										loadingMessage:
											'Finalising your cancellation...',
									},
							  )
							: render();
					},
				escalatedConfirmationBody = (0,
				emotion_react_jsx_runtime_browser_esm.tZ)('p', {
					children:
						'Your cancellation request has been successfully submitted. Our customer service team will try their best to contact you as soon as possible to confirm the cancellation and refund any credit you are owed.',
				}),
				ExecuteCancellation = () => {
					var _productType$cancella2,
						routerState = (0, react_router.TH)().state,
						{ productDetail, productType } = (0, react.useContext)(
							CancellationContainer.DW,
						),
						cancellationReasonId = (0, react.useContext)(
							cancellationContexts.y_,
						);
					if (
						!(
							null ===
								(_productType$cancella2 =
									productType.cancellation.reasons) ||
							void 0 === _productType$cancella2 ||
							!_productType$cancella2.length
						) &&
						(null == routerState ||
							!routerState.selectedReasonId ||
							null == routerState ||
							!routerState.caseId)
					)
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							react_router.Fg,
							{ to: '../' },
						);
					var caseId = routerState.caseId,
						alternativeIsOffer =
							'supporterplus' === productType.productType,
						alternativeIsPause =
							'contributions' === productType.productType,
						escalationCauses = generateEscalationCausesList({
							isEffectiveToday:
								routerState.cancellationPolicy ===
								cancellationContexts.I6,
							hasOutstandingHolidayStops:
								!!routerState.holidayStops &&
								routerState.holidayStops.length > 0,
							hasOutstandingDeliveryProblemCredits:
								!!routerState.deliveryCredits &&
								routerState.deliveryCredits.length > 0,
						}),
						useProgressStepper =
							(featureSwitches.k.supporterplusCancellationOffer &&
								'supporterplus' === productType.productType) ||
							(featureSwitches.k.contributionCancellationPause &&
								'contributions' === productType.productType);
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: [
								(alternativeIsOffer &&
									!routerState.eligibleForFreePeriodOffer) ||
									(alternativeIsPause &&
										!routerState.eligibleForPause &&
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											emotion_react_jsx_runtime_browser_esm.HY,
											{
												children: useProgressStepper
													? (0,
													  emotion_react_jsx_runtime_browser_esm.tZ)(
															ProgressStepper.S,
															{
																steps: [
																	{},
																	{},
																	{},
																	{
																		isCurrentStep:
																			!0,
																	},
																],
																additionalCSS:
																	(0,
																	emotion_react_browser_esm.iv)(
																		'margin:',
																		space
																			.D[5],
																		'px 0 ',
																		space
																			.D[12],
																		'px;',
																		'',
																	),
															},
													  )
													: (0,
													  emotion_react_jsx_runtime_browser_esm.tZ)(
															ProgressIndicator.Y,
															{
																steps: [
																	{
																		title: 'Reason',
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
																additionalCSS:
																	(0,
																	emotion_react_browser_esm.iv)(
																		'margin:',
																		space
																			.D[5],
																		'px 0 ',
																		space
																			.D[12],
																		'px;',
																		'',
																	),
															},
													  ),
											},
										)),
								(0, productResponse.v_)(productDetail)
									? escalationCauses.length > 0 && caseId
										? (0,
										  emotion_react_jsx_runtime_browser_esm.tZ)(
												CaseUpdateAsyncLoader,
												{
													fetch: getCaseUpdateFuncForEscalation(
														caseId,
														escalationCauses,
														productDetail.isTestUser,
													),
													render: getCancellationSummaryWithReturnButton(
														escalatedConfirmationBody,
													),
													loadingMessage:
														'Requesting your cancellation...',
												},
										  )
										: (0,
										  emotion_react_jsx_runtime_browser_esm.tZ)(
												PerformCancelAsyncLoader,
												{
													fetch: getCancelFunc(
														productDetail
															.subscription
															.subscriptionId,
														productType,
														routerState.selectedReasonId,
														(0, productUtils.w)(
															productType.allProductsProductTypeFilterString,
															productDetail
																.subscription
																.subscriptionId,
														),
													),
													render: getCaseUpdatingCancellationSummary(
														productType,
														productDetail,
														routerState.eligibleForFreePeriodOffer,
														routerState.eligibleForPause,
														cancellationReasonId,
														caseId,
													),
													loadingMessage:
														'Performing your cancellation...',
												},
										  )
									: (0,
									  emotion_react_jsx_runtime_browser_esm.tZ)(
											GenericErrorScreen.c,
											{
												loggingMessage:
													'invalid product detail to cancel',
											},
									  ),
							],
						},
					);
				},
				SupporterplusCancellationReasons = __webpack_require__(
					'./client/components/mma/cancel/supporterplus/SupporterplusCancellationReasons.tsx',
				);
			function CancelSwitchConfirmed_asyncGeneratorStep(
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
			var CancelSwitchConfirmed_standfirstCss = (0,
				emotion_react_browser_esm.iv)(
					typography.Ff7,
					';color:',
					palette.palette.neutral[7],
					';margin-top:0;',
					'',
				),
				CancelSwitchConfirmed_nextStepsCss = (0,
				emotion_react_browser_esm.iv)(
					'margin:',
					space.D[4],
					'px 0 ',
					space.D[8],
					'px;h4{',
					typography.D35,
					';margin:0;}ul{',
					typography.Ff7,
					';padding:0;padding-inline-start:14px;margin:',
					space.D[3],
					'px 0 0;line-height:1.8rem;}',
					mq.Dp.desktop,
					'{margin:',
					space.D[6],
					'px 0 ',
					space.D[8],
					'px;}',
					'',
				),
				CancelSwitchConfirmed_benefitsCss = (0,
				emotion_react_browser_esm.iv)(
					'display:flex;flex-direction:column;background-color:',
					palette.palette.culture[800],
					';border:1px solid ',
					colour_palette.n$[86],
					';h4{',
					typography.Rcn,
					';margin:0;}ul{margin-top:',
					space.D[4],
					'px;}',
					mq.Dp.desktop,
					'{flex-direction:row;justify-content:space-between;border:none;picture{order:2;}}',
					'',
				),
				CancelSwitchConfirmed_pictureAlignmentCss = (0,
				emotion_react_browser_esm.iv)(
					'display:flex;justify-content:center;align-items:flex-end;',
					mq.C4.desktop,
					'{border-bottom:1px solid ',
					colour_palette.n$[86],
					';}',
					mq.vX.desktop.and.leftCol,
					'{align-items:center;}',
					mq.Dp.leftCol,
					'{max-width:361px;}',
					'',
				),
				CancelSwitchConfirmed_benefitsLeftSideCss = (0,
				emotion_react_browser_esm.iv)(
					mq.Dp.desktop,
					'{padding:',
					space.D[6],
					'px;}',
					'',
				),
				benefitsWhiteContainerCss = (0, emotion_react_browser_esm.iv)(
					'background-color:',
					colour_palette.n$[100],
					';padding:',
					space.D[5],
					'px ',
					space.D[6],
					'px;',
					mq.Dp.desktop,
					'{border-radius:',
					space.D[2],
					'px;max-width:360px;}',
					'',
				),
				CancelSwitchConfirmed_appAdCss = (0,
				emotion_react_browser_esm.iv)(
					'margin-top:',
					space.D[5],
					'px;',
					mq.Dp.desktop,
					'{margin-top:',
					space.D[6],
					'px;}',
					'',
				),
				CancelSwitchConfirmed_dontForgetCss = (0,
				emotion_react_browser_esm.iv)(
					typography.Ff7,
					';padding-top:',
					space.D[5],
					'px;margin-top:',
					space.D[6],
					'px;border-top:1px solid ',
					palette.palette.neutral[86],
					';',
					'',
				),
				CancelSwitchConfirmed_onwardJourneyBtnsContainerCss = (0,
				emotion_react_browser_esm.iv)(
					'display:flex;flex-direction:column;gap:',
					space.D[5],
					'px;margin-top:',
					space.D[9],
					'px;dontForgetCss',
					mq.Dp.phablet,
					'{flex-direction:row;gap:',
					space.D[4],
					'px;}',
					'',
				),
				CancelSwitchConfirmed_buttonCentredCss = (0,
				emotion_react_browser_esm.iv)(
					'width:100%;justify-content:center;margin:0;',
					mq.Dp.desktop,
					'{width:fit-content;}',
					'',
				),
				CancelSwitchConfirmed_updateSalesforceCase = (function () {
					var _ref = (function CancelSwitchConfirmed_asyncToGenerator(
						fn,
					) {
						return function () {
							var self = this,
								args = arguments;
							return new Promise(function (resolve, reject) {
								var gen = fn.apply(self, args);
								function _next(value) {
									CancelSwitchConfirmed_asyncGeneratorStep(
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
									CancelSwitchConfirmed_asyncGeneratorStep(
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
					})(function* (
						isTestUser,
						caseId,
						loggingCodeSuffix,
						description,
						subject,
					) {
						yield getUpdateCasePromise(
							isTestUser,
							loggingCodeSuffix,
							caseId,
							{ Description: description, Subject: subject },
						);
					});
					return function updateSalesforceCase(
						_x,
						_x2,
						_x3,
						_x4,
						_x5,
					) {
						return _ref.apply(this, arguments);
					};
				})(),
				CancelSwitchConfirmed = () => {
					var _routerState$discount,
						_routerState$discount2,
						routerState = (0, react_router.TH)().state,
						navigate = (0, react_router.s0)(),
						pageTitleContext = (0, react.useContext)(
							CancellationContainer.mc,
						),
						productDetail = (0, react.useContext)(
							CancellationContainer.DW,
						).productDetail,
						sfCaseSubject =
							'Online Cancellation Save Switch Discount - '
								.concat(
									null ===
										(_routerState$discount =
											routerState.discount) ||
										void 0 === _routerState$discount
										? void 0
										: _routerState$discount.upToPeriods,
									' ',
								)
								.concat(
									null ===
										(_routerState$discount2 =
											routerState.discount) ||
										void 0 === _routerState$discount2
										? void 0
										: _routerState$discount2.upToPeriodsType,
								);
					return (
						(0, react.useEffect)(() => {
							pageTitleContext.setPageTitle('Confirmation'),
								CancelSwitchConfirmed_updateSalesforceCase(
									productDetail.isTestUser,
									routerState.caseId,
									'_SWITCH_OFFER',
									'User took switch discount instead of cancelling',
									sfCaseSubject,
								);
						}, [
							pageTitleContext,
							productDetail.isTestUser,
							routerState.caseId,
							'_SWITCH_OFFER',
							'User took switch discount instead of cancelling',
							sfCaseSubject,
						]),
						(0, emotion_react_jsx_runtime_browser_esm.BX)(
							emotion_react_jsx_runtime_browser_esm.HY,
							{
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										Heading.X,
										{
											borderless: !0,
											cssOverrides: [
												styles_typography.L.heading,
												(0,
												emotion_react_browser_esm.iv)(
													'margin:',
													space.D[8],
													'px 0 ',
													space.D[2],
													'px;',
													'',
												),
											],
											children:
												'Thank you for choosing to stay with us',
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'h3',
										{
											css: CancelSwitchConfirmed_standfirstCss,
											children:
												'Your valued support powers independent journalism.',
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'div',
										{
											css: CancelSwitchConfirmed_nextStepsCss,
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'h4',
													{
														children:
															'What happens next?',
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'ul',
													{
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'li',
																{
																	children:
																		'You will receive an email confirming the details of your offer',
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'li',
																{
																	children:
																		'Your existing support has been cancelled and you’re now a digital subscriber',
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'li',
																{
																	children:
																		'You will start enjoying all the benefits of your All-access digital subscription',
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
											css: CancelSwitchConfirmed_benefitsCss,
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'picture',
													{
														css: CancelSwitchConfirmed_pictureAlignmentCss,
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'source',
																{
																	srcSet: 'https://i.guim.co.uk/img/media/02c17de8ea17126fbd87f6567ce5cd80f128546d/0_0_2212_1869/2000.png?width=1000&quality=75&s=492edad637979aa4e57e957cb12cd4f1',
																	media: '(min-width: 740px)',
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'img',
																{
																	src: 'https://media.guim.co.uk/63d17ee19313703129fbbeacceaafcd6d1cc1014/0_0_1404_716/500.png',
																},
															),
														],
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'div',
													{
														css: CancelSwitchConfirmed_benefitsLeftSideCss,
														children: (0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															'div',
															{
																css: benefitsWhiteContainerCss,
																children: [
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'h4',
																		{
																			children:
																				'Enjoy your exclusive benefits:',
																		},
																	),
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		BenefitsSection.c,
																		{
																			small: !0,
																			benefits:
																				[
																					{
																						description:
																							'Unlimited access to the Guardian app',
																					},
																					{
																						description:
																							'Unlimited access to the Guardian Feast App',
																					},
																					{
																						description:
																							'Ad-free reading across all your devices',
																					},
																					{
																						description:
																							'Exclusive supporter newsletter',
																					},
																					{
																						description:
																							"Far fewer asks for support when you're signed in",
																					},
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
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										DownloadAppCta,
										{
											additionalCss:
												CancelSwitchConfirmed_appAdCss,
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'p',
										{
											css: CancelSwitchConfirmed_dontForgetCss,
											children:
												"Don't forget to sign in on all your devices to enjoy your benefits.",
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'div',
										{
											css: CancelSwitchConfirmed_onwardJourneyBtnsContainerCss,
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													LinkButton.Q,
													{
														href: 'https://theguardian.com',
														priority: 'primary',
														cssOverrides:
															CancelSwitchConfirmed_buttonCentredCss,
														children:
															'Continue reading the Guardian',
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													Button.z,
													{
														cssOverrides:
															CancelSwitchConfirmed_buttonCentredCss,
														priority: 'tertiary',
														onClick: () =>
															navigate('/'),
														children:
															'Return to your account',
													},
												),
											],
										},
									),
								],
							},
						)
					);
				},
				contributions = productTypes.Pm.contributions;
			contributions.cancellation.reasons =
				ContributionsCancellationReasons.R1.concat(
					SupporterplusCancellationReasons.i,
				);
			var guardianweekly = productTypes.Pm.guardianweekly;
			guardianweekly.cancellation.reasons =
				GwCancellationReasons.P9.concat(
					SupporterplusCancellationReasons.i,
				);
			var supporterplus = productTypes.Pm.supporterplus;
			supporterplus.cancellation.reasons =
				SupporterplusCancellationReasons.KT.concat(
					SupporterplusCancellationReasons.i,
				);
			const Cancellation_stories = {
				title: 'Pages/Cancellation',
				component: CancellationContainer.OY,
				decorators: [ReactRouterDecorator.R],
				parameters: { layout: 'fullscreen' },
			};
			var SelectReason = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							CancellationReasonSelection,
							{},
						),
					parameters: {
						reactRouter: {
							state: { productDetail: (0, testProducts.uH)() },
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								CancellationContainer.OY,
								{ productType: productTypes.Pm.contributions },
							),
						},
					},
				},
				ContactCustomerService = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							CancellationJourneyFunnel,
							{},
						),
					parameters: {
						reactRouter: {
							state: { productDetail: (0, testProducts.X8)() },
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								CancellationContainer.OY,
								{ productType: guardianweekly },
							),
						},
					},
				},
				Review = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							CancellationReasonReview,
							{},
						),
					parameters: {
						msw: [
							http.d.post('/api/case', () =>
								HttpResponse.Z.json({ id: 'caseId' }),
							),
						],
						reactRouter: {
							state: {
								productDetail: (0, testProducts.uH)(),
								selectedReasonId: 'mma_editorial',
								cancellationPolicy: 'Today',
							},
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								CancellationContainer.OY,
								{ productType: productTypes.Pm.contributions },
							),
						},
					},
				},
				ReviewWithReduceAmount = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							CancellationReasonReview,
							{},
						),
					parameters: {
						msw: [
							http.d.post('/api/case', () =>
								HttpResponse.Z.json({ id: 'caseId' }),
							),
						],
						reactRouter: {
							state: {
								productDetail: (0, testProducts.uH)(),
								selectedReasonId: 'mma_financial_circumstances',
							},
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								CancellationContainer.OY,
								{ productType: productTypes.Pm.contributions },
							),
						},
					},
				},
				ReviewGuardianAdLiteInTrialPeriod = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							ConfirmCancellation,
							{},
						),
					parameters: {
						reactRouter: {
							state: { productDetail: (0, testProducts.kk)() },
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								CancellationContainer.OY,
								{ productType: productTypes.Pm.guardianadlite },
							),
						},
					},
				},
				ReviewGuardianAdLite = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							ConfirmCancellation,
							{},
						),
					parameters: {
						reactRouter: {
							state: { productDetail: (0, testProducts.av)() },
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								CancellationContainer.OY,
								{ productType: productTypes.Pm.guardianadlite },
							),
						},
					},
				},
				ConfirmationGuardianAdLite = {
					render: () => (
						(window.guardian = {
							identityDetails: { email: 'test' },
						}),
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							ExecuteCancellation,
							{},
						)
					),
					parameters: {
						msw: [
							http.d.patch('/api/case/**', () =>
								HttpResponse.Z.json({ id: 'caseId' }),
							),
							http.d.get('/api/me/mma/**', () =>
								HttpResponse.Z.json(
									(0, mdapiResponse.F)(
										(0, testProducts.kj)(),
									),
								),
							),
							http.d.post(
								'/api/cancel/**',
								() => new HttpResponse.Z(null, { status: 201 }),
							),
						],
						reactRouter: {
							state: {
								productDetail: (0, testProducts.av)(),
								selectedReasonId: '1',
								caseId: 'caseId',
							},
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								CancellationContainer.OY,
								{ productType: productTypes.Pm.guardianadlite },
							),
						},
					},
				},
				OfferMonthly = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							CancelAlternativeOffer,
							{},
						),
					parameters: {
						msw: [
							http.d.post('/api/case', () =>
								HttpResponse.Z.json({ id: 'caseId' }),
							),
						],
						reactRouter: {
							state: {
								productDetail: (0, testProducts.dd)(),
								discountedPrice: 0,
								discountPercentage: 100,
								upToPeriods: 2,
								upToPeriodsType: 'months',
								firstDiscountedPaymentDate: '2024-05-30',
								nextNonDiscountedPaymentDate: '2024-07-30',
								nonDiscountedPayments: [
									{ date: '2024-07-30', amount: 14.99 },
								],
							},
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								CancellationContainer.OY,
								{ productType: supporterplus },
							),
						},
					},
				},
				OfferYearly = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							CancelAlternativeOffer,
							{},
						),
					parameters: {
						msw: [
							http.d.post('/api/case', () =>
								HttpResponse.Z.json({ id: 'caseId' }),
							),
						],
						reactRouter: {
							state: {
								productDetail: (0, testProducts.hc)(),
								discountedPrice: 90,
								discountPercentage: 25,
								upToPeriods: 12,
								upToPeriodsType: 'months',
								firstDiscountedPaymentDate: '2024-05-30',
								nextNonDiscountedPaymentDate: '2025-05-30',
								nonDiscountedPayments: [
									{ date: '2025-05-30', amount: 120 },
								],
							},
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								CancellationContainer.OY,
								{ productType: supporterplus },
							),
						},
					},
				},
				SwitchYearly = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							CancelAlternativeSwitch,
							{},
						),
					parameters: {
						msw: [
							http.d.post('/api/case', () =>
								HttpResponse.Z.json({ id: 'caseId' }),
							),
						],
						reactRouter: {
							state: {
								productDetail: (0, testProducts.v_)('GBP', 600),
								supporterPlusPurchaseAmount: 120,
								nextPaymentDate: '2025-05-30',
								amountPayableToday: 58.39,
								contributionRefundAmount: -1.61,
								discount: {
									discountedPrice: 60,
									discountPercentage: 50,
									upToPeriods: 1,
									upToPeriodsType: 'Years',
								},
							},
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								CancellationContainer.OY,
								{ productType: contributions },
							),
						},
					},
				},
				OfferReviewMonthly = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							CancelAlternativeReview,
							{},
						),
					parameters: {
						reactRouter: {
							state: {
								productDetail: (0, testProducts.dd)(),
								discountedPrice: 0,
								discountPercentage: 100,
								upToPeriods: 2,
								upToPeriodsType: 'months',
								firstDiscountedPaymentDate: '2024-05-30',
								nextNonDiscountedPaymentDate: '2024-07-30',
								nonDiscountedPayments: [
									{ date: '2024-07-30', amount: 14.99 },
								],
							},
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								CancellationContainer.OY,
								{ productType: supporterplus },
							),
						},
						msw: [
							http.d.post(
								'/api/discounts/apply-discount',
								() => new HttpResponse.Z(null, { status: 201 }),
							),
						],
					},
				},
				OfferReviewYearly = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							CancelAlternativeReview,
							{},
						),
					parameters: {
						reactRouter: {
							state: {
								productDetail: (0, testProducts.hc)(),
								discountedPrice: 90,
								discountPercentage: 25,
								upToPeriods: 12,
								upToPeriodsType: 'months',
								firstDiscountedPaymentDate: '2024-05-30',
								nextNonDiscountedPaymentDate: '2025-05-30',
								nonDiscountedPayments: [
									{ date: '2025-05-30', amount: 120 },
								],
							},
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								CancellationContainer.OY,
								{ productType: supporterplus },
							),
						},
						msw: [
							http.d.post(
								'/api/discounts/apply-discount',
								() => new HttpResponse.Z(null, { status: 201 }),
							),
						],
					},
				},
				SwitchReviewYearly = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							CancelAlternativeSwitchReview,
							{},
						),
					parameters: {
						reactRouter: {
							state: {
								productDetail: (0, testProducts.v_)('GBP', 6e3),
								supporterPlusPurchaseAmount: 120,
								nextPaymentDate: '2025-05-30',
								amountPayableToday: 58.39,
								contributionRefundAmount: -1.61,
								discount: {
									discountedPrice: 60,
									discountPercentage: 50,
									upToPeriods: 1,
									upToPeriodsType: 'Years',
								},
							},
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								CancellationContainer.OY,
								{ productType: contributions },
							),
						},
						msw: [
							http.d.post(
								'/api/discounts/apply-discount',
								() => new HttpResponse.Z(null, { status: 201 }),
							),
						],
					},
				},
				OfferConfirmedMonthly = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							CancelAlternativeConfirmed,
							{},
						),
					parameters: {
						reactRouter: {
							state: {
								productDetail: (0, testProducts.uH)(),
								upToPeriods: 2,
								upToPeriodsType: 'months',
								nextNonDiscountedPaymentDate: '2024-07-30',
								nonDiscountedPayments: [
									{ date: '2024-07-30', amount: 14.99 },
								],
							},
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								CancellationContainer.OY,
								{ productType: supporterplus },
							),
						},
					},
				},
				OfferConfirmedYearly = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							CancelAlternativeConfirmed,
							{},
						),
					parameters: {
						reactRouter: {
							state: {
								productDetail: (0, testProducts.hc)(),
								upToPeriods: 12,
								upToPeriodsType: 'months',
								discountPercentage: 25,
								discountedPrice: 90,
								firstDiscountedPaymentDate: '2024-05-30',
								nextNonDiscountedPaymentDate: '2025-05-30',
								nonDiscountedPayments: [
									{ date: '2025-05-30', amount: 120 },
								],
							},
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								CancellationContainer.OY,
								{ productType: supporterplus },
							),
						},
					},
				},
				Pause = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							CancelAlternativeOffer,
							{},
						),
					parameters: {
						msw: [
							http.d.post('/api/case', () =>
								HttpResponse.Z.json({ id: 'caseId' }),
							),
						],
						reactRouter: {
							state: {
								productDetail: (0, testProducts.uH)(),
								discountedPrice: 0,
								discountPercentage: 100,
								upToPeriods: 2,
								upToPeriodsType: 'months',
								firstDiscountedPaymentDate: '2024-05-30',
								nextNonDiscountedPaymentDate: '2024-07-30',
								nonDiscountedPayments: [
									{ date: '2024-07-30', amount: 14.99 },
								],
							},
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								CancellationContainer.OY,
								{ productType: contributions },
							),
						},
					},
				},
				PauseReview = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							CancelAlternativeReview,
							{},
						),
					parameters: {
						reactRouter: {
							state: {
								discountedPrice: 0,
								discountPercentage: 100,
								upToPeriods: 2,
								upToPeriodsType: 'months',
								firstDiscountedPaymentDate: '2024-05-30',
								nextNonDiscountedPaymentDate: '2024-07-30',
								nonDiscountedPayments: [
									{ date: '2024-07-30', amount: 14.99 },
								],
							},
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								CancellationContainer.OY,
								{ productType: contributions },
							),
						},
						msw: [
							http.d.post(
								'/api/discounts/apply-discount',
								() => new HttpResponse.Z(null, { status: 201 }),
							),
						],
					},
				},
				PauseConfirmed = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							CancelAlternativeConfirmed,
							{},
						),
					parameters: {
						reactRouter: {
							state: {
								upToPeriods: 2,
								upToPeriodsType: 'months',
								nextNonDiscountedPaymentDate: '2024-07-30',
								nonDiscountedPayments: [
									{ date: '2024-07-30', amount: 14.99 },
								],
							},
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								CancellationContainer.OY,
								{ productType: contributions },
							),
						},
					},
				},
				SupportplusCancelConfirm = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							ConfirmCancellation,
							{},
						),
					parameters: {
						reactRouter: {
							state: {
								productDetail: (0, testProducts.dd)(),
								eligibleForFreePeriodOffer: !0,
								discountedPrice: 0,
								upToPeriods: 2,
								upToPeriodsType: 'months',
								firstDiscountedPaymentDate: '2024-05-30',
								nextNonDiscountedPaymentDate: '2024-07-30',
								nonDiscountedPayments: [
									{ date: '2024-07-30', amount: 14.99 },
								],
							},
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								CancellationContainer.OY,
								{ productType: productTypes.Pm.supporterplus },
							),
						},
					},
				},
				SwitchYearlyConfirmed = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							CancelSwitchConfirmed,
							{},
						),
					parameters: {
						reactRouter: {
							state: {
								productDetail: (0, testProducts.v_)('GBP', 600),
								supporterPlusPurchaseAmount: 120,
								nextPaymentDate: '2025-05-30',
								amountPayableToday: 58.39,
								contributionRefundAmount: -1.61,
								discount: {
									discountedPrice: 60,
									discountPercentage: 50,
									upToPeriods: 1,
									upToPeriodsType: 'Years',
								},
							},
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								CancellationContainer.OY,
								{ productType: contributions },
							),
						},
					},
				},
				ConfirmationContribution = {
					render: () => (
						(window.guardian = {
							identityDetails: { email: 'test' },
						}),
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							ExecuteCancellation,
							{},
						)
					),
					parameters: {
						msw: [
							http.d.patch('/api/case/**', () =>
								HttpResponse.Z.json({ id: 'caseId' }),
							),
							http.d.get('/api/me/mma/**', () =>
								HttpResponse.Z.json(
									(0, mdapiResponse.F)(
										(0, testProducts.EM)(),
									),
								),
							),
							http.d.post(
								'/api/cancel/**',
								() => new HttpResponse.Z(null, { status: 201 }),
							),
						],
						reactRouter: {
							state: {
								productDetail: (0, testProducts.ZY)(),
								selectedReasonId: '1',
								caseId: 'caseId',
							},
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								CancellationContainer.OY,
								{ productType: productTypes.Pm.contributions },
							),
						},
					},
				},
				ConfirmationContributionWithPause = {
					render: () => (
						(window.guardian = {
							identityDetails: { email: 'test' },
						}),
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							ExecuteCancellation,
							{},
						)
					),
					parameters: {
						msw: [
							http.d.patch('/api/case/**', () =>
								HttpResponse.Z.json({ id: 'caseId' }),
							),
							http.d.get('/api/me/mma/**', () =>
								HttpResponse.Z.json(
									(0, mdapiResponse.F)(
										(0, testProducts.EM)(),
									),
								),
							),
							http.d.post(
								'/api/cancel/**',
								() => new HttpResponse.Z(null, { status: 201 }),
							),
						],
						reactRouter: {
							state: {
								productDetail: (0, testProducts.ZY)(),
								eligibleForPause: !0,
								selectedReasonId: '1',
								caseId: 'caseId',
							},
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								CancellationContainer.OY,
								{ productType: productTypes.Pm.contributions },
							),
						},
					},
				},
				ConfirmationSupporterPlusWithOffer = {
					render: () => (
						(window.guardian = {
							identityDetails: { email: 'test' },
						}),
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							ExecuteCancellation,
							{},
						)
					),
					parameters: {
						msw: [
							http.d.patch('/api/case/**', () =>
								HttpResponse.Z.json({ id: 'caseId' }),
							),
							http.d.get('/api/me/mma/**', () =>
								HttpResponse.Z.json(
									(0, mdapiResponse.F)(
										(0, testProducts.tv)(),
									),
								),
							),
							http.d.post(
								'/api/cancel/**',
								() => new HttpResponse.Z(null, { status: 201 }),
							),
						],
						reactRouter: {
							state: {
								productDetail: (0, testProducts.gx)(),
								eligibleForOffer: !0,
								selectedReasonId: '1',
								caseId: 'caseId',
							},
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								CancellationContainer.OY,
								{ productType: productTypes.Pm.supporterplus },
							),
						},
					},
				};
			(SelectReason.parameters = {
				...SelectReason.parameters,
				docs: {
					...SelectReason.parameters?.docs,
					source: {
						originalSource:
							'{\n  render: () => <CancellationReasonSelection />,\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: contributionPaidByPayPal()\n      },\n      container: <CancellationContainer productType={PRODUCT_TYPES.contributions} />\n    }\n  }\n}',
						...SelectReason.parameters?.docs?.source,
					},
				},
			}),
				(ContactCustomerService.parameters = {
					...ContactCustomerService.parameters,
					docs: {
						...ContactCustomerService.parameters?.docs,
						source: {
							originalSource:
								'{\n  render: () => <CancellationJourneyFunnel />,\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: guardianWeeklyPaidByCard()\n      },\n      container: <CancellationContainer productType={guardianweekly} />\n    }\n  }\n}',
							...ContactCustomerService.parameters?.docs?.source,
						},
					},
				}),
				(Review.parameters = {
					...Review.parameters,
					docs: {
						...Review.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <CancellationReasonReview />;\n  },\n  parameters: {\n    msw: [http.post('/api/case', () => {\n      return HttpResponse.json({\n        id: 'caseId'\n      });\n    })],\n    reactRouter: {\n      state: {\n        productDetail: contributionPaidByPayPal(),\n        selectedReasonId: 'mma_editorial',\n        cancellationPolicy: 'Today'\n      },\n      container: <CancellationContainer productType={PRODUCT_TYPES.contributions} />\n    }\n  }\n}",
							...Review.parameters?.docs?.source,
						},
					},
				}),
				(ReviewWithReduceAmount.parameters = {
					...ReviewWithReduceAmount.parameters,
					docs: {
						...ReviewWithReduceAmount.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <CancellationReasonReview />;\n  },\n  parameters: {\n    msw: [http.post('/api/case', () => {\n      return HttpResponse.json({\n        id: 'caseId'\n      });\n    })],\n    reactRouter: {\n      state: {\n        productDetail: contributionPaidByPayPal(),\n        selectedReasonId: 'mma_financial_circumstances'\n      },\n      container: <CancellationContainer productType={PRODUCT_TYPES.contributions} />\n    }\n  }\n}",
							...ReviewWithReduceAmount.parameters?.docs?.source,
						},
					},
				}),
				(ReviewGuardianAdLiteInTrialPeriod.parameters = {
					...ReviewGuardianAdLiteInTrialPeriod.parameters,
					docs: {
						...ReviewGuardianAdLiteInTrialPeriod.parameters?.docs,
						source: {
							originalSource:
								'{\n  render: () => {\n    return <ConfirmCancellation />;\n  },\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: guardianAdLiteInTrialPeriod()\n      },\n      container: <CancellationContainer productType={PRODUCT_TYPES.guardianadlite} />\n    }\n  }\n}',
							...ReviewGuardianAdLiteInTrialPeriod.parameters
								?.docs?.source,
						},
					},
				}),
				(ReviewGuardianAdLite.parameters = {
					...ReviewGuardianAdLite.parameters,
					docs: {
						...ReviewGuardianAdLite.parameters?.docs,
						source: {
							originalSource:
								'{\n  render: () => {\n    return <ConfirmCancellation />;\n  },\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: guardianAdLite()\n      },\n      container: <CancellationContainer productType={PRODUCT_TYPES.guardianadlite} />\n    }\n  }\n}',
							...ReviewGuardianAdLite.parameters?.docs?.source,
						},
					},
				}),
				(ConfirmationGuardianAdLite.parameters = {
					...ConfirmationGuardianAdLite.parameters,
					docs: {
						...ConfirmationGuardianAdLite.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    // @ts-expect-error set identity details email in the window\n    window.guardian = {\n      identityDetails: {\n        email: 'test'\n      }\n    };\n    return <ExecuteCancellation />;\n  },\n  parameters: {\n    msw: [http.patch('/api/case/**', () => {\n      return HttpResponse.json({\n        id: 'caseId'\n      });\n    }), http.get('/api/me/mma/**', () => {\n      return HttpResponse.json(toMembersDataApiResponse(guardianAdLiteCancelled()));\n    }), http.post('/api/cancel/**', () => {\n      return new HttpResponse(null, {\n        status: 201\n      });\n    })],\n    reactRouter: {\n      state: {\n        productDetail: guardianAdLite(),\n        selectedReasonId: '1',\n        caseId: 'caseId'\n      },\n      container: <CancellationContainer productType={PRODUCT_TYPES.guardianadlite} />\n    }\n  }\n}",
							...ConfirmationGuardianAdLite.parameters?.docs
								?.source,
						},
					},
				}),
				(OfferMonthly.parameters = {
					...OfferMonthly.parameters,
					docs: {
						...OfferMonthly.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <CancelAlternativeOffer />;\n  },\n  parameters: {\n    msw: [http.post('/api/case', () => {\n      return HttpResponse.json({\n        id: 'caseId'\n      });\n    })],\n    reactRouter: {\n      state: {\n        productDetail: supporterPlusMonthlyAllAccessDigital(),\n        discountedPrice: 0,\n        discountPercentage: 100,\n        upToPeriods: 2,\n        upToPeriodsType: 'months',\n        firstDiscountedPaymentDate: '2024-05-30',\n        nextNonDiscountedPaymentDate: '2024-07-30',\n        nonDiscountedPayments: [{\n          date: '2024-07-30',\n          amount: 14.99\n        }]\n      },\n      container: <CancellationContainer productType={supporterplus} />\n    }\n  }\n}",
							...OfferMonthly.parameters?.docs?.source,
						},
					},
				}),
				(OfferYearly.parameters = {
					...OfferYearly.parameters,
					docs: {
						...OfferYearly.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <CancelAlternativeOffer />;\n  },\n  parameters: {\n    msw: [http.post('/api/case', () => {\n      return HttpResponse.json({\n        id: 'caseId'\n      });\n    })],\n    reactRouter: {\n      state: {\n        productDetail: supporterPlusAnnual(),\n        discountedPrice: 90,\n        discountPercentage: 25,\n        upToPeriods: 12,\n        upToPeriodsType: 'months',\n        firstDiscountedPaymentDate: '2024-05-30',\n        nextNonDiscountedPaymentDate: '2025-05-30',\n        nonDiscountedPayments: [{\n          date: '2025-05-30',\n          amount: 120\n        }]\n      },\n      container: <CancellationContainer productType={supporterplus} />\n    }\n  }\n}",
							...OfferYearly.parameters?.docs?.source,
						},
					},
				}),
				(SwitchYearly.parameters = {
					...SwitchYearly.parameters,
					docs: {
						...SwitchYearly.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <CancelAlternativeSwitch />;\n  },\n  parameters: {\n    msw: [http.post('/api/case', () => {\n      return HttpResponse.json({\n        id: 'caseId'\n      });\n    })],\n    reactRouter: {\n      state: {\n        productDetail: annualContributionPaidByCardWithCurrency('GBP', 600),\n        supporterPlusPurchaseAmount: 120,\n        nextPaymentDate: '2025-05-30',\n        amountPayableToday: 58.39,\n        contributionRefundAmount: -1.61,\n        discount: {\n          discountedPrice: 60,\n          discountPercentage: 50,\n          upToPeriods: 1,\n          upToPeriodsType: 'Years'\n        }\n      },\n      container: <CancellationContainer productType={contributions} />\n    }\n  }\n}",
							...SwitchYearly.parameters?.docs?.source,
						},
					},
				}),
				(OfferReviewMonthly.parameters = {
					...OfferReviewMonthly.parameters,
					docs: {
						...OfferReviewMonthly.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <CancelAlternativeReview />;\n  },\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: supporterPlusMonthlyAllAccessDigital(),\n        discountedPrice: 0,\n        discountPercentage: 100,\n        upToPeriods: 2,\n        upToPeriodsType: 'months',\n        firstDiscountedPaymentDate: '2024-05-30',\n        nextNonDiscountedPaymentDate: '2024-07-30',\n        nonDiscountedPayments: [{\n          date: '2024-07-30',\n          amount: 14.99\n        }]\n      },\n      container: <CancellationContainer productType={supporterplus} />\n    },\n    msw: [http.post('/api/discounts/apply-discount', () => {\n      return new HttpResponse(null, {\n        status: 201\n      });\n    })]\n  }\n}",
							...OfferReviewMonthly.parameters?.docs?.source,
						},
					},
				}),
				(OfferReviewYearly.parameters = {
					...OfferReviewYearly.parameters,
					docs: {
						...OfferReviewYearly.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <CancelAlternativeReview />;\n  },\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: supporterPlusAnnual(),\n        discountedPrice: 90,\n        discountPercentage: 25,\n        upToPeriods: 12,\n        upToPeriodsType: 'months',\n        firstDiscountedPaymentDate: '2024-05-30',\n        nextNonDiscountedPaymentDate: '2025-05-30',\n        nonDiscountedPayments: [{\n          date: '2025-05-30',\n          amount: 120\n        }]\n      },\n      container: <CancellationContainer productType={supporterplus} />\n    },\n    msw: [http.post('/api/discounts/apply-discount', () => {\n      return new HttpResponse(null, {\n        status: 201\n      });\n    })]\n  }\n}",
							...OfferReviewYearly.parameters?.docs?.source,
						},
					},
				}),
				(SwitchReviewYearly.parameters = {
					...SwitchReviewYearly.parameters,
					docs: {
						...SwitchReviewYearly.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <CancelAlternativeSwitchReview />;\n  },\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: annualContributionPaidByCardWithCurrency('GBP', 6000),\n        supporterPlusPurchaseAmount: 120,\n        nextPaymentDate: '2025-05-30',\n        amountPayableToday: 58.39,\n        contributionRefundAmount: -1.61,\n        discount: {\n          discountedPrice: 60,\n          discountPercentage: 50,\n          upToPeriods: 1,\n          upToPeriodsType: 'Years'\n        }\n      },\n      container: <CancellationContainer productType={contributions} />\n    },\n    msw: [http.post('/api/discounts/apply-discount', () => {\n      return new HttpResponse(null, {\n        status: 201\n      });\n    })]\n  }\n}",
							...SwitchReviewYearly.parameters?.docs?.source,
						},
					},
				}),
				(OfferConfirmedMonthly.parameters = {
					...OfferConfirmedMonthly.parameters,
					docs: {
						...OfferConfirmedMonthly.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <CancelAlternativeConfirmed />;\n  },\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: contributionPaidByPayPal(),\n        upToPeriods: 2,\n        upToPeriodsType: 'months',\n        nextNonDiscountedPaymentDate: '2024-07-30',\n        nonDiscountedPayments: [{\n          date: '2024-07-30',\n          amount: 14.99\n        }]\n      },\n      container: <CancellationContainer productType={supporterplus} />\n    }\n  }\n}",
							...OfferConfirmedMonthly.parameters?.docs?.source,
						},
					},
				}),
				(OfferConfirmedYearly.parameters = {
					...OfferConfirmedYearly.parameters,
					docs: {
						...OfferConfirmedYearly.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <CancelAlternativeConfirmed />;\n  },\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: supporterPlusAnnual(),\n        upToPeriods: 12,\n        upToPeriodsType: 'months',\n        discountPercentage: 25,\n        discountedPrice: 90,\n        firstDiscountedPaymentDate: '2024-05-30',\n        nextNonDiscountedPaymentDate: '2025-05-30',\n        nonDiscountedPayments: [{\n          date: '2025-05-30',\n          amount: 120\n        }]\n      },\n      container: <CancellationContainer productType={supporterplus} />\n    }\n  }\n}",
							...OfferConfirmedYearly.parameters?.docs?.source,
						},
					},
				}),
				(Pause.parameters = {
					...Pause.parameters,
					docs: {
						...Pause.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <CancelAlternativeOffer />;\n  },\n  parameters: {\n    msw: [http.post('/api/case', () => {\n      return HttpResponse.json({\n        id: 'caseId'\n      });\n    })],\n    reactRouter: {\n      state: {\n        productDetail: contributionPaidByPayPal(),\n        discountedPrice: 0,\n        discountPercentage: 100,\n        upToPeriods: 2,\n        upToPeriodsType: 'months',\n        firstDiscountedPaymentDate: '2024-05-30',\n        nextNonDiscountedPaymentDate: '2024-07-30',\n        nonDiscountedPayments: [{\n          date: '2024-07-30',\n          amount: 14.99\n        }]\n      },\n      container: <CancellationContainer productType={contributions} />\n    }\n  }\n}",
							...Pause.parameters?.docs?.source,
						},
					},
				}),
				(PauseReview.parameters = {
					...PauseReview.parameters,
					docs: {
						...PauseReview.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <CancelAlternativeReview />;\n  },\n  parameters: {\n    reactRouter: {\n      state: {\n        discountedPrice: 0,\n        discountPercentage: 100,\n        upToPeriods: 2,\n        upToPeriodsType: 'months',\n        firstDiscountedPaymentDate: '2024-05-30',\n        nextNonDiscountedPaymentDate: '2024-07-30',\n        nonDiscountedPayments: [{\n          date: '2024-07-30',\n          amount: 14.99\n        }]\n      },\n      container: <CancellationContainer productType={contributions} />\n    },\n    msw: [http.post('/api/discounts/apply-discount', () => {\n      return new HttpResponse(null, {\n        status: 201\n      });\n    })]\n  }\n}",
							...PauseReview.parameters?.docs?.source,
						},
					},
				}),
				(PauseConfirmed.parameters = {
					...PauseConfirmed.parameters,
					docs: {
						...PauseConfirmed.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <CancelAlternativeConfirmed />;\n  },\n  parameters: {\n    reactRouter: {\n      state: {\n        upToPeriods: 2,\n        upToPeriodsType: 'months',\n        nextNonDiscountedPaymentDate: '2024-07-30',\n        nonDiscountedPayments: [{\n          date: '2024-07-30',\n          amount: 14.99\n        }]\n      },\n      container: <CancellationContainer productType={contributions} />\n    }\n  }\n}",
							...PauseConfirmed.parameters?.docs?.source,
						},
					},
				}),
				(SupportplusCancelConfirm.parameters = {
					...SupportplusCancelConfirm.parameters,
					docs: {
						...SupportplusCancelConfirm.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <ConfirmCancellation />;\n  },\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: supporterPlusMonthlyAllAccessDigital(),\n        eligibleForFreePeriodOffer: true,\n        discountedPrice: 0,\n        upToPeriods: 2,\n        upToPeriodsType: 'months',\n        firstDiscountedPaymentDate: '2024-05-30',\n        nextNonDiscountedPaymentDate: '2024-07-30',\n        nonDiscountedPayments: [{\n          date: '2024-07-30',\n          amount: 14.99\n        }]\n      },\n      container: <CancellationContainer productType={PRODUCT_TYPES.supporterplus} />\n    }\n  }\n}",
							...SupportplusCancelConfirm.parameters?.docs
								?.source,
						},
					},
				}),
				(SwitchYearlyConfirmed.parameters = {
					...SwitchYearlyConfirmed.parameters,
					docs: {
						...SwitchYearlyConfirmed.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <CancelSwitchConfirmed />;\n  },\n  parameters: {\n    reactRouter: {\n      state: {\n        productDetail: annualContributionPaidByCardWithCurrency('GBP', 600),\n        supporterPlusPurchaseAmount: 120,\n        nextPaymentDate: '2025-05-30',\n        amountPayableToday: 58.39,\n        contributionRefundAmount: -1.61,\n        discount: {\n          discountedPrice: 60,\n          discountPercentage: 50,\n          upToPeriods: 1,\n          upToPeriodsType: 'Years'\n        }\n      },\n      container: <CancellationContainer productType={contributions} />\n    }\n  }\n}",
							...SwitchYearlyConfirmed.parameters?.docs?.source,
						},
					},
				}),
				(ConfirmationContribution.parameters = {
					...ConfirmationContribution.parameters,
					docs: {
						...ConfirmationContribution.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    // @ts-expect-error set identity details email in the window\n    window.guardian = {\n      identityDetails: {\n        email: 'test'\n      }\n    };\n    return <ExecuteCancellation />;\n  },\n  parameters: {\n    msw: [http.patch('/api/case/**', () => {\n      return HttpResponse.json({\n        id: 'caseId'\n      });\n    }), http.get('/api/me/mma/**', () => {\n      return HttpResponse.json(toMembersDataApiResponse(contributionCancelled()));\n    }), http.post('/api/cancel/**', () => {\n      return new HttpResponse(null, {\n        status: 201\n      });\n    })],\n    reactRouter: {\n      state: {\n        productDetail: contributionPaidByCard(),\n        selectedReasonId: '1',\n        caseId: 'caseId'\n      },\n      container: <CancellationContainer productType={PRODUCT_TYPES.contributions} />\n    }\n  }\n}",
							...ConfirmationContribution.parameters?.docs
								?.source,
						},
					},
				}),
				(ConfirmationContributionWithPause.parameters = {
					...ConfirmationContributionWithPause.parameters,
					docs: {
						...ConfirmationContributionWithPause.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    // @ts-expect-error set identity details email in the window\n    window.guardian = {\n      identityDetails: {\n        email: 'test'\n      }\n    };\n    return <ExecuteCancellation />;\n  },\n  parameters: {\n    msw: [http.patch('/api/case/**', () => {\n      return HttpResponse.json({\n        id: 'caseId'\n      });\n    }), http.get('/api/me/mma/**', () => {\n      return HttpResponse.json(toMembersDataApiResponse(contributionCancelled()));\n    }), http.post('/api/cancel/**', () => {\n      return new HttpResponse(null, {\n        status: 201\n      });\n    })],\n    reactRouter: {\n      state: {\n        productDetail: contributionPaidByCard(),\n        eligibleForPause: true,\n        selectedReasonId: '1',\n        caseId: 'caseId'\n      },\n      container: <CancellationContainer productType={PRODUCT_TYPES.contributions} />\n    }\n  }\n}",
							...ConfirmationContributionWithPause.parameters
								?.docs?.source,
						},
					},
				}),
				(ConfirmationSupporterPlusWithOffer.parameters = {
					...ConfirmationSupporterPlusWithOffer.parameters,
					docs: {
						...ConfirmationSupporterPlusWithOffer.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    // @ts-expect-error set identity details email in the window\n    window.guardian = {\n      identityDetails: {\n        email: 'test'\n      }\n    };\n    return <ExecuteCancellation />;\n  },\n  parameters: {\n    msw: [http.patch('/api/case/**', () => {\n      return HttpResponse.json({\n        id: 'caseId'\n      });\n    }), http.get('/api/me/mma/**', () => {\n      return HttpResponse.json(toMembersDataApiResponse(supporterPlusCancelled()));\n    }), http.post('/api/cancel/**', () => {\n      return new HttpResponse(null, {\n        status: 201\n      });\n    })],\n    reactRouter: {\n      state: {\n        productDetail: supporterPlus(),\n        eligibleForOffer: true,\n        selectedReasonId: '1',\n        caseId: 'caseId'\n      },\n      container: <CancellationContainer productType={PRODUCT_TYPES.supporterplus} />\n    }\n  }\n}",
							...ConfirmationSupporterPlusWithOffer.parameters
								?.docs?.source,
						},
					},
				});
			const __namedExportsOrder = [
				'SelectReason',
				'ContactCustomerService',
				'Review',
				'ReviewWithReduceAmount',
				'ReviewGuardianAdLiteInTrialPeriod',
				'ReviewGuardianAdLite',
				'ConfirmationGuardianAdLite',
				'OfferMonthly',
				'OfferYearly',
				'SwitchYearly',
				'OfferReviewMonthly',
				'OfferReviewYearly',
				'SwitchReviewYearly',
				'OfferConfirmedMonthly',
				'OfferConfirmedYearly',
				'Pause',
				'PauseReview',
				'PauseConfirmed',
				'SupportplusCancelConfirm',
				'SwitchYearlyConfirmed',
				'ConfirmationContribution',
				'ConfirmationContributionWithPause',
				'ConfirmationSupporterPlusWithOffer',
			];
		},
	},
]);
