'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[5699],
	{
		'./client/components/mma/cancel/cancellationSaves/SelectReason.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				M: () => SelectReason,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_8__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_9__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_10__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_11__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_15__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_13__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/stack/Stack.js',
					),
				_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_14__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/radio/RadioGroup.js',
					),
				_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_16__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/radio/Radio.js',
					),
				_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_19__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/user-feedback/InlineError.js',
					),
				_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_20__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/button/Button.js',
					),
				react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./node_modules/react/index.js',
				),
				react_router__WEBPACK_IMPORTED_MODULE_17__ =
					__webpack_require__('./node_modules/react-router/index.js'),
				_shared_dates__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__('./shared/dates.ts'),
				_shared_productResponse__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__('./shared/productResponse.ts'),
				_shared_productTypes__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__('./shared/productTypes.ts'),
				_styles_ButtonStyles__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__('./client/styles/ButtonStyles.ts'),
				_styles_GenericStyles__WEBPACK_IMPORTED_MODULE_5__ =
					__webpack_require__('./client/styles/GenericStyles.ts'),
				_shared_GenericErrorScreen__WEBPACK_IMPORTED_MODULE_6__ =
					__webpack_require__(
						'./client/components/shared/GenericErrorScreen.tsx',
					),
				_shared_asyncComponents_DefaultApiResponseHandler__WEBPACK_IMPORTED_MODULE_18__ =
					__webpack_require__(
						'./client/components/mma/shared/asyncComponents/DefaultApiResponseHandler.tsx',
					),
				_CancellationContainer__WEBPACK_IMPORTED_MODULE_7__ =
					__webpack_require__(
						'./client/components/mma/cancel/CancellationContainer.tsx',
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
			var paragraphListCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_8__.iv)(
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_9__.Kz0,
					';',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_10__
						.Dp.tablet,
					'{span{display:block;}}',
					'',
				),
				reasonLegendCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_8__.iv)(
					'display:block;width:100%;float:left;margin-top:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_11__
						.D[2],
					'px;',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_9__.Rcn,
					';',
					'',
				),
				_ref2 = { name: '9lqu21', styles: 'padding-inline-start:0' },
				CancellationInfo = (_ref3) => {
					var { userEmailAddress, benefitsEndDate } = _ref3;
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.tZ)(
						'ul',
						{
							css: _ref2,
							children: (0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.tZ)(
								_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_13__.K,
								{
									space: 1,
									children: (0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.BX)(
										'p',
										{
											css: paragraphListCss,
											'data-qm-masking': 'blocklist',
											children: [
												'We will send a confirmation email to you at ',
												userEmailAddress,
												'.',
												' ',
												(0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.BX)(
													'span',
													{
														children: [
															'You will have access to all of your benefits until',
															' ',
															benefitsEndDate,
														],
													},
												),
											],
										},
									),
								},
							),
						},
					);
				},
				_ref = {
					name: 'w2iqra',
					styles: 'vertical-align:top;text-transform:lowercase;:checked+div label:first-of-type{font-weight:bold;}',
				},
				ReasonSelection = (_ref4) => {
					var {
						groupedProductFriendlyName,
						cancellationReasons,
						setSelectedReasonId,
					} = _ref4;
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.BX)(
						'fieldset',
						{
							onChange: (event) => {
								var target = event.target;
								setSelectedReasonId(target.value);
							},
							css: (0,
							_emotion_react__WEBPACK_IMPORTED_MODULE_8__.iv)(
								'margin:0 0 ',
								_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_11__
									.D[5],
								'px;padding:0;border:0;',
								'',
							),
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.BX)(
									'legend',
									{
										css: reasonLegendCss,
										children: [
											'Why did you cancel your ',
											groupedProductFriendlyName,
											' today?',
										],
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.tZ)(
									_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_14__.E,
									{
										name: 'issue_type',
										orientation: 'vertical',
										cssOverrides: (0,
										_emotion_react__WEBPACK_IMPORTED_MODULE_8__.iv)(
											'display:block;padding-top:',
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_11__
												.D[4],
											'px;',
											'',
										),
										children: cancellationReasons.map(
											(reason) =>
												(0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.tZ)(
													'div',
													{
														css: (0,
														_emotion_react__WEBPACK_IMPORTED_MODULE_8__.iv)(
															'border:1px solid ',
															_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_15__
																.palette
																.neutral[86],
															';border-radius:4px;padding:',
															_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_11__
																.D[1],
															'px ',
															_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_11__
																.D[3],
															'px;margin-bottom:',
															_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_11__
																.D[3],
															'px;',
															'',
														),
														children: (0,
														_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.tZ)(
															_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_16__.Y,
															{
																name: 'cancellation-reason',
																value: reason.reasonId,
																label: reason.linkLabel,
																cssOverrides:
																	_ref,
															},
														),
													},
													reason.reasonId,
												),
										),
									},
								),
							],
						},
					);
				};
			function cancellationCaseFetch(
				selectedReasonId,
				productType,
				productDetail,
			) {
				return fetch('/api/case', {
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
						[_shared_productResponse__WEBPACK_IMPORTED_MODULE_2__.l2]:
							''.concat(productDetail.isTestUser),
					},
				});
			}
			function updateZuoraCancellationReason(
				selectedReasonId,
				productDetail,
			) {
				return fetch(
					'/api/update-cancellation-reason/' +
						productDetail.subscription.subscriptionId,
					{
						method: 'POST',
						body: JSON.stringify({ reason: selectedReasonId }),
						headers: {
							'Content-Type': 'application/json',
							[_shared_productResponse__WEBPACK_IMPORTED_MODULE_2__.l2]:
								''.concat(productDetail.isTestUser),
						},
					},
				);
			}
			var SelectReason = () => {
				var _routerState$user$ema,
					_routerState$user,
					_mainPlan$chargedThro,
					navigate = (0,
					react_router__WEBPACK_IMPORTED_MODULE_17__.s0)(),
					[isSubmitting, setIsSubmitting] = (0,
					react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),
					[loadingFailed, setLoadingFailed] = (0,
					react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),
					[selectedReasonId, setSelectedReasonId] = (0,
					react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
					[inValidationErrorState, setInValidationErrorState] = (0,
					react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),
					{ productDetail, productType } = (0,
					react__WEBPACK_IMPORTED_MODULE_0__.useContext)(
						_CancellationContainer__WEBPACK_IMPORTED_MODULE_7__.DW,
					),
					mainPlan = (0,
					_shared_productResponse__WEBPACK_IMPORTED_MODULE_2__.fr)(
						productDetail.subscription,
					),
					routerState = (0,
					react_router__WEBPACK_IMPORTED_MODULE_17__.TH)().state,
					userEmailAddress =
						null !==
							(_routerState$user$ema =
								null == routerState ||
								null ===
									(_routerState$user = routerState.user) ||
								void 0 === _routerState$user
									? void 0
									: _routerState$user.email) &&
						void 0 !== _routerState$user$ema
							? _routerState$user$ema
							: '',
					benefitsEndDate = (0,
					_shared_dates__WEBPACK_IMPORTED_MODULE_1__.sG)(
						null !==
							(_mainPlan$chargedThro = mainPlan.chargedThrough) &&
							void 0 !== _mainPlan$chargedThro
							? _mainPlan$chargedThro
							: void 0,
					).dateStr(_shared_dates__WEBPACK_IMPORTED_MODULE_1__.Bn),
					navigateToReminder =
						'membership' === productType.productType,
					submitReason = (function () {
						var _ref5 = _asyncToGenerator(function* () {
							var canContinue = !!selectedReasonId.length;
							canContinue &&
								(yield postReason(),
								navigate(
									navigateToReminder ? '../reminder' : '/',
									{ state: { selectedReasonId } },
								)),
								setInValidationErrorState(!canContinue);
						});
						return function submitReason() {
							return _ref5.apply(this, arguments);
						};
					})(),
					postReason = (function () {
						var _ref6 = _asyncToGenerator(function* () {
							if (!isSubmitting)
								try {
									setIsSubmitting(!0);
									var response = yield Promise.all([
										cancellationCaseFetch(
											selectedReasonId,
											productType,
											productDetail,
										),
										updateZuoraCancellationReason(
											selectedReasonId,
											productDetail,
										),
									]);
									null ===
										(yield (0,
										_shared_asyncComponents_DefaultApiResponseHandler__WEBPACK_IMPORTED_MODULE_18__.xJ)(
											response,
										)) &&
										(setIsSubmitting(!1),
										setLoadingFailed(!0));
								} catch (_unused) {
									setIsSubmitting(!1), setLoadingFailed(!0);
								}
						});
						return function postReason() {
							return _ref6.apply(this, arguments);
						};
					})();
				return loadingFailed
					? (0,
					  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.tZ)(
							_shared_GenericErrorScreen__WEBPACK_IMPORTED_MODULE_6__.c,
							{
								loggingMessage:
									'Cancel journey case id api call failed during the cancellation process',
							},
					  )
					: productType.cancellation.reasons
					? (0,
					  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.BX)(
							'section',
							{
								css: _styles_GenericStyles__WEBPACK_IMPORTED_MODULE_5__.zC,
								children: [
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.BX)(
										'h2',
										{
											css: _styles_GenericStyles__WEBPACK_IMPORTED_MODULE_5__.Wn,
											children: [
												'Your',
												' ',
												_shared_productTypes__WEBPACK_IMPORTED_MODULE_3__
													.HP[
													productType
														.groupedProductType
												].friendlyName,
												' ',
												'has been cancelled',
											],
										},
									),
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.tZ)(
										CancellationInfo,
										{ userEmailAddress, benefitsEndDate },
									),
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.BX)(
										'p',
										{
											css: (0,
											_emotion_react__WEBPACK_IMPORTED_MODULE_8__.iv)(
												paragraphListCss,
												';border-top:1px solid ',
												_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_15__
													.palette.neutral[86],
												';padding-top:',
												_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_11__
													.D[5],
												'px;',
												'',
											),
											children: [
												"We're always keen to improve, and welcome your feedback.",
												' ',
												(0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.tZ)(
													'span',
													{
														children:
															'Please take a moment to tell us more about your decision.',
													},
												),
											],
										},
									),
									!!productType.cancellation.reasons &&
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.tZ)(
											ReasonSelection,
											{
												groupedProductFriendlyName:
													_shared_productTypes__WEBPACK_IMPORTED_MODULE_3__
														.HP[
														productType
															.groupedProductType
													].friendlyName,
												cancellationReasons:
													productType.cancellation
														.reasons,
												setSelectedReasonId,
											},
										),
									inValidationErrorState &&
										!selectedReasonId.length &&
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.tZ)(
											_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_19__.b,
											{
												cssOverrides: (0,
												_emotion_react__WEBPACK_IMPORTED_MODULE_8__.iv)(
													'padding:',
													_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_11__
														.D[5],
													'px;margin-bottom:',
													_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_11__
														.D[4],
													'px;border:4px solid ',
													_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_15__
														.palette.error[400],
													';text-align:left;',
													'',
												),
												children:
													'Please select a reason',
											},
										),
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.BX)(
										'section',
										{
											css: _styles_ButtonStyles__WEBPACK_IMPORTED_MODULE_4__.SX,
											children: [
												(0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.tZ)(
													_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_20__.z,
													{
														isLoading: isSubmitting,
														onClick: () =>
															submitReason(),
														cssOverrides: [
															_styles_ButtonStyles__WEBPACK_IMPORTED_MODULE_4__._8,
															_styles_ButtonStyles__WEBPACK_IMPORTED_MODULE_4__.mb,
														],
														children: 'Submit',
													},
												),
												(0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.tZ)(
													_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_20__.z,
													{
														priority: 'tertiary',
														cssOverrides:
															_styles_ButtonStyles__WEBPACK_IMPORTED_MODULE_4__._8,
														onClick: () =>
															navigate('/'),
														children: 'Skip',
													},
												),
											],
										},
									),
								],
							},
					  )
					: (0,
					  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.tZ)(
							_shared_GenericErrorScreen__WEBPACK_IMPORTED_MODULE_6__.c,
							{
								loggingMessage:
									"Got to the cancellation /reasons page with a productType that doesn't have any cancellation reasons.",
							},
					  );
			};
		},
	},
]);
