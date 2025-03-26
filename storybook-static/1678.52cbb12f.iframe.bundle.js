'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[1678],
	{
		'./.storybook/ReactRouterDecorator.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				R: () => ReactRouterDecorator,
			});
			var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__('./node_modules/react-router/index.js'),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
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
			var ReactRouterDecorator = (Story, context) => {
				var _context$parameters$r,
					_params$path,
					params =
						null !==
							(_context$parameters$r =
								context.parameters.reactRouter) &&
						void 0 !== _context$parameters$r
							? _context$parameters$r
							: {},
					path =
						null !== (_params$path = params.path) &&
						void 0 !== _params$path
							? _params$path
							: '*',
					location = _objectSpread(
						_objectSpread(
							{},
							params.location && { pathname: params.location },
						),
						params.state && { state: params.state },
					);
				return (0,
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
					react_router_dom__WEBPACK_IMPORTED_MODULE_1__.VA,
					{
						initialEntries: [location],
						children: (0,
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
							react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Z5,
							{
								children: params.container
									? (0,
									  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
											react_router_dom__WEBPACK_IMPORTED_MODULE_1__.AW,
											{
												path,
												element: params.container,
												children: (0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
													react_router_dom__WEBPACK_IMPORTED_MODULE_1__.AW,
													{
														index: !0,
														element: (0,
														_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
															Story,
															{},
														),
													},
												),
											},
									  )
									: (0,
									  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
											react_router_dom__WEBPACK_IMPORTED_MODULE_1__.AW,
											{
												path,
												element: (0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
													Story,
													{},
												),
											},
									  ),
							},
						),
					},
				);
			};
		},
		'./client/components/mma/holiday/HolidaysOverview.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				m: () => HolidaysOverview,
			});
			var emotion_react_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
				),
				space = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
				),
				typography = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
				),
				mq = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
				),
				Button = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/button/Button.js',
				),
				react = __webpack_require__('./node_modules/react/index.js'),
				react_router = __webpack_require__(
					'./node_modules/react-router/index.js',
				),
				dates = __webpack_require__('./shared/dates.ts'),
				productResponse = __webpack_require__(
					'./shared/productResponse.ts',
				),
				InfoIcon = __webpack_require__(
					'./client/components/mma/shared/assets/InfoIcon.tsx',
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
			var reduceCreditCallback = (accumulator, currentValue) => {
					var credit =
						currentValue.actualPrice || currentValue.estimatedPrice;
					if (accumulator && currentValue.invoiceDate && credit) {
						var invoiceDateAsString =
							currentValue.invoiceDate.dateStr(dates.Bn);
						return _objectSpread(
							_objectSpread({}, accumulator),
							{},
							{
								[invoiceDateAsString]:
									credit +
									(accumulator[invoiceDateAsString] || 0),
							},
						);
					}
					return null;
				},
				CollatedCredits = (props) => {
					var collatedCreditsByInvoiceDate =
						props.publicationsImpacted.reduce(
							reduceCreditCallback,
							{},
						);
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						'div',
						{
							children: collatedCreditsByInvoiceDate
								? Object.keys(collatedCreditsByInvoiceDate).map(
										(invoiceDateString, index) =>
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'div',
												{
													children: [
														props.withBullet &&
															'- ',
														(0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															'strong',
															{
																children: [
																	props.currency,
																	Math.abs(
																		collatedCreditsByInvoiceDate[
																			invoiceDateString
																		],
																	).toFixed(
																		2,
																	),
																],
															},
														),
														' ',
														'off your ',
														invoiceDateString,
														' payment',
													],
												},
												'cc-'.concat(index),
											),
								  )
								: 'Unavailable at this time.',
						},
					);
				};
			try {
				(CollatedCredits.displayName = 'CollatedCredits'),
					(CollatedCredits.__docgenInfo = {
						description: '',
						displayName: 'CollatedCredits',
						props: {
							publicationsImpacted: {
								defaultValue: null,
								description: '',
								name: 'publicationsImpacted',
								required: !0,
								type: { name: 'HolidayStopDetail[]' },
							},
							currency: {
								defaultValue: null,
								description: '',
								name: 'currency',
								required: !1,
								type: { name: 'string' },
							},
							withBullet: {
								defaultValue: null,
								description: '',
								name: 'withBullet',
								required: !1,
								type: { name: 'true' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/holiday/CollatedCredits.tsx#CollatedCredits'
						] = {
							docgenInfo: CollatedCredits.__docgenInfo,
							name: 'CollatedCredits',
							path: 'client/components/mma/holiday/CollatedCredits.tsx#CollatedCredits',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var HolidayQuestionsModal = __webpack_require__(
					'./client/components/mma/holiday/HolidayQuestionsModal.tsx',
				),
				HolidayStopApi = __webpack_require__(
					'./client/components/mma/holiday/HolidayStopApi.ts',
				),
				HolidayStopsContainer = __webpack_require__(
					'./client/components/mma/holiday/HolidayStopsContainer.tsx',
				),
				palette = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
				),
				ExpanderButton = __webpack_require__(
					'./client/components/shared/ExpanderButton.tsx',
				),
				useAsyncLoader = __webpack_require__(
					'./client/utilities/hooks/useAsyncLoader.ts',
				),
				DefaultApiResponseHandler = __webpack_require__(
					'./client/components/mma/shared/asyncComponents/DefaultApiResponseHandler.tsx',
				),
				DefaultLoadingView = __webpack_require__(
					'./client/components/mma/shared/asyncComponents/DefaultLoadingView.tsx',
				),
				Modal = __webpack_require__(
					'./client/components/mma/holiday/Modal.tsx',
				);
			var DeleteHolidayStop = (props) => {
					var navigate = (0, react_router.s0)(),
						{ data, loadingState } = (0, useAsyncLoader.c)(
							() =>
								fetch(
									'/api/holidays/'
										.concat(props.subscriptionName, '/')
										.concat(props.id),
									{
										method: 'DELETE',
										headers: {
											[productResponse.l2]: ''.concat(
												props.isTestUser,
											),
										},
									},
								),
							DefaultApiResponseHandler.xJ,
						);
					return loadingState == useAsyncLoader.G.HasError
						? (0, emotion_react_jsx_runtime_browser_esm.BX)(
								Modal.u,
								{
									title: 'Sorry',
									instigator: null,
									extraOnHideFunctionality: () => {
										navigate(0);
									},
									children: [
										'Deleting your ',
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'strong',
											{
												children:
													props.friendlyDateRange,
											},
										),
										' ',
										'suspension failed, please try again later...',
									],
								},
						  )
						: loadingState == useAsyncLoader.G.IsLoading
						? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
								DefaultLoadingView.I,
								{},
						  )
						: null === data
						? (0, emotion_react_jsx_runtime_browser_esm.BX)(
								Modal.u,
								{
									title: 'Sorry',
									instigator: null,
									extraOnHideFunctionality: () => {
										navigate(0);
									},
									children: [
										'Deleting your ',
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'strong',
											{
												children:
													props.friendlyDateRange,
											},
										),
										' ',
										'suspension failed, please try again later...',
									],
								},
						  )
						: (navigate(0), null);
				},
				_ref = { name: '169dbas', styles: 'max-width:225px' },
				_ref2 = {
					name: '181c4f7',
					styles: 'display:inline-block;margin-top:10px;margin-right:10px',
				},
				_ref3 = {
					name: '1f8qzpi',
					styles: 'display:inline-block;margin:10px;margin-left:0',
				},
				ExistingHolidayStopActions = (props) => {
					var [isDeleting, setIsDeleting] = (0, react.useState)(!1),
						navigate = (0, react_router.s0)(),
						routerState = (0, react_router.TH)().state;
					if (props.withdrawnDate)
						return (0, emotion_react_jsx_runtime_browser_esm.BX)(
							'em',
							{
								children: [
									'Deleted',
									' ',
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'small',
										{
											children: [
												'on ',
												props.withdrawnDate.dateStr(
													dates.Bn,
												),
											],
										},
									),
								],
							},
						);
					if (props.bulkSuspensionReason)
						return (0, emotion_react_jsx_runtime_browser_esm.BX)(
							'span',
							{
								css: _ref,
								children: [
									'Imposed suspension (',
									props.bulkSuspensionReason,
									')',
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'br',
										{},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'small',
										{
											children:
												'This does not count towards your annual limit, but you will still receive credit.',
										},
									),
								],
							},
						);
					if (
						props.mutabilityFlags &&
						(props.mutabilityFlags.isFullyMutable ||
							props.mutabilityFlags.isEndDateEditable)
					) {
						var shouldShowAmendButton =
								props.mutabilityFlags.isEndDateEditable,
							shouldShowDeleteButton =
								props.mutabilityFlags.isFullyMutable,
							shouldBeOnlyAmendEndDate =
								props.mutabilityFlags.isEndDateEditable &&
								!props.mutabilityFlags.isFullyMutable,
							setExistingHolidayStopToAmend =
								props.setExistingHolidayStopToAmend,
							friendlyDateRange = formatDateRangeAsFriendly(
								props.dateRange,
							);
						return void 0 === props.subscriptionName ||
							void 0 === props.id
							? (navigate('/'), null)
							: isDeleting
							? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
									DeleteHolidayStop,
									{
										friendlyDateRange,
										subscriptionName:
											props.subscriptionName,
										id: props.id,
										isTestUser: props.isTestUser,
									},
							  )
							: (0, emotion_react_jsx_runtime_browser_esm.BX)(
									emotion_react_jsx_runtime_browser_esm.HY,
									{
										children: [
											shouldShowAmendButton &&
												setExistingHolidayStopToAmend &&
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'div',
													{
														css: _ref3,
														children: (0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															Button.z,
															{
																onClick: () => {
																	setExistingHolidayStopToAmend(
																		props,
																	),
																		navigate(
																			'amend',
																			{
																				state: routerState,
																			},
																		);
																},
																priority:
																	'secondary',
																children:
																	'Amend'.concat(
																		shouldBeOnlyAmendEndDate
																			? ' end date'
																			: '',
																	),
															},
														),
													},
												),
											shouldShowDeleteButton &&
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													Modal.u,
													{
														title: 'Are you sure?',
														alternateOkText: 'No',
														additionalButton: (
															hideFunction,
														) =>
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'div',
																{
																	css: _ref2,
																	children:
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			Button.z,
																			{
																				onClick:
																					() => {
																						setIsDeleting(
																							!0,
																						),
																							hideFunction();
																					},
																				children:
																					'Yes',
																			},
																		),
																},
															),
														instigator: (0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															Button.z,
															{
																priority:
																	'tertiary',
																children:
																	'Delete',
															},
														),
														children: [
															'Are you sure you want to delete your',
															' ',
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'strong',
																{
																	children:
																		friendlyDateRange,
																},
															),
															' suspension?',
														],
													},
												),
										],
									},
							  );
					}
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						'span',
						{ children: 'No longer amendable.' },
					);
				};
			try {
				(ExistingHolidayStopActions.displayName =
					'ExistingHolidayStopActions'),
					(ExistingHolidayStopActions.__docgenInfo = {
						description: '',
						displayName: 'ExistingHolidayStopActions',
						props: {
							isTestUser: {
								defaultValue: null,
								description: '',
								name: 'isTestUser',
								required: !0,
								type: { name: 'boolean' },
							},
							setExistingHolidayStopToAmend: {
								defaultValue: null,
								description: '',
								name: 'setExistingHolidayStopToAmend',
								required: !1,
								type: {
									name: '((newValue: HolidayStopRequest | null) => void)',
								},
							},
							id: {
								defaultValue: null,
								description: '',
								name: 'id',
								required: !1,
								type: { name: 'string' },
							},
							subscriptionName: {
								defaultValue: null,
								description: '',
								name: 'subscriptionName',
								required: !1,
								type: { name: 'string' },
							},
							publicationsImpacted: {
								defaultValue: null,
								description: '',
								name: 'publicationsImpacted',
								required: !0,
								type: { name: 'HolidayStopDetail[]' },
							},
							dateRange: {
								defaultValue: null,
								description: '',
								name: 'dateRange',
								required: !0,
								type: { name: 'DateRange' },
							},
							mutabilityFlags: {
								defaultValue: null,
								description: '',
								name: 'mutabilityFlags',
								required: !1,
								type: { name: 'MutabilityFlags' },
							},
							withdrawnDate: {
								defaultValue: null,
								description: '',
								name: 'withdrawnDate',
								required: !1,
								type: { name: 'ParsedDate' },
							},
							bulkSuspensionReason: {
								defaultValue: null,
								description: '',
								name: 'bulkSuspensionReason',
								required: !1,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/holiday/ExistingHolidayStopActions.tsx#ExistingHolidayStopActions'
						] = {
							docgenInfo: ExistingHolidayStopActions.__docgenInfo,
							name: 'ExistingHolidayStopActions',
							path: 'client/components/mma/holiday/ExistingHolidayStopActions.tsx#ExistingHolidayStopActions',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var HolidayDateChooser = __webpack_require__(
				'./client/components/mma/holiday/HolidayDateChooser.tsx',
			);
			function SummaryTable_ownKeys(e, r) {
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
			function SummaryTable_objectSpread(e) {
				for (var r = 1; r < arguments.length; r++) {
					var t = null != arguments[r] ? arguments[r] : {};
					r % 2
						? SummaryTable_ownKeys(Object(t), !0).forEach(function (
								r,
						  ) {
								SummaryTable_defineProperty(e, r, t[r]);
						  })
						: Object.getOwnPropertyDescriptors
						? Object.defineProperties(
								e,
								Object.getOwnPropertyDescriptors(t),
						  )
						: SummaryTable_ownKeys(Object(t)).forEach(function (r) {
								Object.defineProperty(
									e,
									r,
									Object.getOwnPropertyDescriptor(t, r),
								);
						  });
				}
				return e;
			}
			function SummaryTable_defineProperty(obj, key, value) {
				return (
					(key = (function SummaryTable_toPropertyKey(arg) {
						var key = (function SummaryTable_toPrimitive(
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
			var cellCss = (0, emotion_react_browser_esm.iv)(
					'padding:',
					space.D[2],
					'px ',
					space.D[4],
					'px;border:1px solid ',
					palette.palette.neutral[86],
					';',
					'',
				),
				formatDateRangeAsFriendly = (range) =>
					''
						.concat(
							(0, dates.ur)(
								range.start,
								range.start.getFullYear() !==
									range.end.getFullYear()
									? dates.Bn
									: 'd MMMM',
							),
							' - ',
						)
						.concat((0, dates.ur)(range.end, dates.Bn)),
				formattedCreditIfAvailable = (detail, currency) => {
					var rawAmount = detail.actualPrice || detail.estimatedPrice,
						amountTwoDecimalPlaces = rawAmount
							? rawAmount.toFixed(2)
							: void 0;
					return currency && rawAmount
						? ' ('
								.concat(currency)
								.concat(amountTwoDecimalPlaces, ')')
						: void 0;
				},
				SummaryTable_ref2 = { name: 'b6lfw4', styles: 'border-top:0' },
				SummaryTable_ref3 = {
					name: '1rcj98u',
					styles: 'text-decoration:line-through',
				},
				SummaryTableRow = (props) => {
					var dateRangeStr = formatDateRangeAsFriendly(
							props.dateRange,
						),
						detailPart = (0,
						emotion_react_jsx_runtime_browser_esm.tZ)(
							ExpanderButton.b,
							{
								buttonLabel: (0,
								emotion_react_jsx_runtime_browser_esm.BX)(
									'strong',
									{
										children: [
											props.publicationsImpacted.length,
											' ',
											props.issueKeyword,
											1 !==
											props.publicationsImpacted.length
												? 's'
												: '',
										],
									},
								),
								children: props.publicationsImpacted.map(
									(detail, index) =>
										(0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											'div',
											{
												children: [
													'-',
													' ',
													detail.publicationDate.dateStr(
														dates.Bn,
													),
													formattedCreditIfAvailable(
														detail,
														props.currency,
													),
												],
											},
											index,
										),
								),
							},
						),
						withdrawnRelatedCSS = SummaryTable_ref3;
					return props.asTD
						? (0, emotion_react_jsx_runtime_browser_esm.BX)('tr', {
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'td',
										{
											css:
												props.withdrawnDate &&
												withdrawnRelatedCSS,
											children: dateRangeStr,
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'td',
										{
											css:
												props.withdrawnDate &&
												withdrawnRelatedCSS,
											children: detailPart,
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'td',
										{
											children:
												props.isOperatingOnNewHolidayStop
													? (0,
													  emotion_react_jsx_runtime_browser_esm.tZ)(
															CollatedCredits,
															SummaryTable_objectSpread(
																{},
																props,
															),
													  )
													: (0,
													  emotion_react_jsx_runtime_browser_esm.tZ)(
															ExistingHolidayStopActions,
															SummaryTable_objectSpread(
																{},
																props,
															),
													  ),
										},
									),
								],
						  })
						: (0, emotion_react_jsx_runtime_browser_esm.BX)('div', {
								css: [
									(0, emotion_react_browser_esm.iv)(
										'margin-bottom:',
										space.D[5],
										'px;',
										'',
									),
									props.withdrawnDate && withdrawnRelatedCSS,
									'',
									'',
								],
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'div',
										{
											css: [
												cellCss,
												props.withdrawnDate &&
													withdrawnRelatedCSS,
												(0,
												emotion_react_browser_esm.iv)(
													'background-color:',
													palette.palette.neutral[97],
													';border-bottom:0;',
													'',
												),
												'',
												'',
											],
											children: dateRangeStr,
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'div',
										{
											css: [
												cellCss,
												props.withdrawnDate &&
													withdrawnRelatedCSS,
												'',
												'',
											],
											children: detailPart,
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'div',
										{
											css: [
												cellCss,
												SummaryTable_ref2,
												'',
												'',
											],
											children:
												props.isOperatingOnNewHolidayStop
													? (0,
													  emotion_react_jsx_runtime_browser_esm.BX)(
															emotion_react_jsx_runtime_browser_esm.HY,
															{
																children: [
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'strong',
																		{
																			children:
																				'Expected Credits',
																		},
																	),
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		CollatedCredits,
																		SummaryTable_objectSpread(
																			SummaryTable_objectSpread(
																				{},
																				props,
																			),
																			{},
																			{
																				withBullet:
																					!0,
																			},
																		),
																	),
																],
															},
													  )
													: (0,
													  emotion_react_jsx_runtime_browser_esm.tZ)(
															ExistingHolidayStopActions,
															SummaryTable_objectSpread(
																{},
																props,
															),
													  ),
										},
									),
								],
						  });
				},
				SummaryTable_ref = { name: '16tud4', styles: 'min-width:61%' },
				SummaryTable = (props) => {
					var holidayStopRequestsList = (0, HolidayDateChooser.ZM)(
							props.data,
						)
							? [
									{
										dateRange: props.data.selectedRange,
										publicationsImpacted:
											props.data.publicationsImpacted,
									},
							  ]
							: props.data,
						mainPlan = (0, productResponse.fr)(props.subscription),
						currency = (0, productResponse.q4)(mainPlan)
							? mainPlan.currency
							: void 0,
						isOperatingOnNewHolidayStop = (0,
						HolidayDateChooser.ZM)(props.data);
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						'div',
						{
							css: (0, emotion_react_browser_esm.iv)(
								typography.Kz0,
								';',
								'',
							),
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'table',
									{
										css: (0, emotion_react_browser_esm.iv)(
											'width:100%;border-collapse:collapse;tr{text-align:left;}th{',
											cellCss,
											';background-color:',
											palette.palette.neutral[97],
											';margin:0;}td{',
											cellCss,
											';}',
											mq.C4.tablet,
											'{display:none;}',
											'',
										),
										children: (0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											'tbody',
											{
												children: [
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'tr',
														{
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'th',
																	{
																		css: (0,
																		emotion_react_browser_esm.iv)(
																			'min-width:39%;',
																			mq
																				.Dp
																				.wide,
																			'{min-width:34%;}',
																			'',
																		),
																		children:
																			'Duration',
																	},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'th',
																	{
																		css: (0,
																		emotion_react_browser_esm.iv)(
																			'min-width:39%;',
																			mq
																				.Dp
																				.wide,
																			'{min-width:34%;}',
																			'',
																		),
																		children:
																			props.alternateSuspendedColumnHeading ||
																			'Suspended',
																	},
																),
																isOperatingOnNewHolidayStop
																	? (0,
																	  emotion_react_jsx_runtime_browser_esm.tZ)(
																			'th',
																			{
																				children:
																					'Expected Credits',
																			},
																	  )
																	: (0,
																	  emotion_react_jsx_runtime_browser_esm.tZ)(
																			'th',
																			{
																				css: SummaryTable_ref,
																				children:
																					'Actions',
																			},
																	  ),
															],
														},
													),
													holidayStopRequestsList.map(
														(
															holidayStopRequest,
															index,
														) =>
															(0,
															emotion_react_browser_esm.az)(
																SummaryTableRow,
																SummaryTable_objectSpread(
																	SummaryTable_objectSpread(
																		SummaryTable_objectSpread(
																			{},
																			props,
																		),
																		{},
																		{
																			key: index,
																			isOperatingOnNewHolidayStop,
																			currency,
																		},
																		holidayStopRequest,
																	),
																	{},
																	{
																		asTD: !0,
																	},
																),
															),
													),
												],
											},
										),
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'div',
									{
										css: (0, emotion_react_browser_esm.iv)(
											mq.Dp.tablet,
											'{display:none;}',
											'',
										),
										children: holidayStopRequestsList.map(
											(holidayStopRequest, index) =>
												(0,
												emotion_react_browser_esm.az)(
													SummaryTableRow,
													SummaryTable_objectSpread(
														SummaryTable_objectSpread(
															{},
															props,
														),
														{},
														{
															key: index,
															isOperatingOnNewHolidayStop,
															currency,
														},
														holidayStopRequest,
													),
												),
										),
									},
								),
							],
						},
					);
				};
			try {
				(formatDateRangeAsFriendly.displayName =
					'formatDateRangeAsFriendly'),
					(formatDateRangeAsFriendly.__docgenInfo = {
						description: '',
						displayName: 'formatDateRangeAsFriendly',
						props: {
							start: {
								defaultValue: null,
								description: '',
								name: 'start',
								required: !0,
								type: { name: 'Date' },
							},
							end: {
								defaultValue: null,
								description: '',
								name: 'end',
								required: !0,
								type: { name: 'Date' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/holiday/SummaryTable.tsx#formatDateRangeAsFriendly'
						] = {
							docgenInfo: formatDateRangeAsFriendly.__docgenInfo,
							name: 'formatDateRangeAsFriendly',
							path: 'client/components/mma/holiday/SummaryTable.tsx#formatDateRangeAsFriendly',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(SummaryTable.displayName = 'SummaryTable'),
					(SummaryTable.__docgenInfo = {
						description: '',
						displayName: 'SummaryTable',
						props: {
							data: {
								defaultValue: null,
								description: '',
								name: 'data',
								required: !0,
								type: {
									name: 'HolidayStopRequest[] | SharedHolidayDateChooserState',
								},
							},
							isTestUser: {
								defaultValue: null,
								description: '',
								name: 'isTestUser',
								required: !0,
								type: { name: 'boolean' },
							},
							subscription: {
								defaultValue: null,
								description: '',
								name: 'subscription',
								required: !0,
								type: { name: 'Subscription' },
							},
							issueKeyword: {
								defaultValue: null,
								description: '',
								name: 'issueKeyword',
								required: !0,
								type: { name: 'string' },
							},
							alternateSuspendedColumnHeading: {
								defaultValue: null,
								description: '',
								name: 'alternateSuspendedColumnHeading',
								required: !1,
								type: { name: 'string' },
							},
							setExistingHolidayStopToAmend: {
								defaultValue: null,
								description: '',
								name: 'setExistingHolidayStopToAmend',
								required: !1,
								type: {
									name: '((newValue: HolidayStopRequest | null) => void)',
								},
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/holiday/SummaryTable.tsx#SummaryTable'
						] = {
							docgenInfo: SummaryTable.__docgenInfo,
							name: 'SummaryTable',
							path: 'client/components/mma/holiday/SummaryTable.tsx#SummaryTable',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var HolidaysOverview_ref3 = {
					name: '1wdvun2',
					styles: 'flex:1 0 180px',
				},
				OverviewRow = (props) =>
					(0, emotion_react_jsx_runtime_browser_esm.BX)('div', {
						css: (0, emotion_react_browser_esm.iv)(
							'display:flex;flex-wrap:wrap;align-items:start;margin-bottom:',
							space.D[5],
							'px;',
							'',
						),
						children: [
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								'div',
								{
									css: HolidaysOverview_ref3,
									children: (0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'h3',
										{
											css: (0,
											emotion_react_browser_esm.iv)(
												typography.D35,
												';margin-top:0;padding-top:0;',
												'',
											),
											children: props.heading,
										},
									),
								},
							),
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								'div',
								{
									css: (0, emotion_react_browser_esm.iv)(
										'flex:0 1 ',
										props.fullWidth ? '100%' : '450px',
										';',
										'',
									),
									children: props.children,
								},
							),
						],
					}),
				HolidaysOverview_ref = {
					name: '1wpegnz',
					styles: 'margin-top:10px;align-self:flex-end',
				},
				HolidaysOverview_ref2 = {
					name: '3xnxkg',
					styles: 'margin-top:10px;align-self:flex-start',
				},
				HolidaysOverview = () => {
					var holidayStopsContext = (0, react.useContext)(
							HolidayStopsContainer.q,
						),
						{
							productType,
							productDetail,
							setExistingHolidayStopToAmend,
							holidayStopResponse,
							setSelectedRange,
						} = holidayStopsContext,
						navigate = (0, react_router.s0)(),
						routerState = (0, react_router.TH)().state,
						renewalDate = (0, dates.sG)(
							productDetail.subscription.renewalDate,
						).date,
						combinedIssuesImpactedPerYear = (0, HolidayStopApi.Uf)(
							holidayStopResponse.existing
								.filter(HolidayStopApi.DI)
								.filter(HolidayStopApi.E9)
								.flatMap(
									(existing) => existing.publicationsImpacted,
								),
							renewalDate,
						),
						mainPlan = (0, productResponse.fr)(
							productDetail.subscription,
						),
						currency = (0, productResponse.q4)(mainPlan)
							? mainPlan.currency
							: void 0,
						createSuspensionButton = (0,
						emotion_react_jsx_runtime_browser_esm.tZ)(Button.z, {
							onClick: () => {
								setExistingHolidayStopToAmend(null),
									setSelectedRange(void 0),
									navigate('create', { state: routerState });
							},
							children: 'Create suspension',
						});
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'h1',
									{
										children: [
											'Suspend ',
											productType.friendlyName,
										],
									},
								),
								productDetail.subscription.autoRenew
									? (0,
									  emotion_react_jsx_runtime_browser_esm.tZ)(
											OverviewRow,
											{
												heading: 'How',
												children: (0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													emotion_react_jsx_runtime_browser_esm.HY,
													{
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'div',
																{
																	children: [
																		'You can suspend up to',
																		' ',
																		(0,
																		emotion_react_jsx_runtime_browser_esm.BX)(
																			'strong',
																			{
																				children:
																					[
																						holidayStopResponse.annualIssueLimit,
																						' ',
																						productType
																							.holidayStops
																							.issueKeyword,
																						's',
																					],
																			},
																		),
																		' ',
																		'per year on your subscription. ',
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'br',
																			{},
																		),
																	],
																},
															),
															productType
																.holidayStops
																.alternateNoticeString &&
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'div',
																	{
																		children:
																			[
																				'Please provide',
																				' ',
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					'strong',
																					{
																						children:
																							productType
																								.holidayStops
																								.alternateNoticeString,
																					},
																				),
																				'.',
																			],
																	},
																),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'div',
																{
																	children:
																		(0,
																		HolidayQuestionsModal.W)(
																			productType
																				.holidayStops
																				.issueKeyword,
																		),
																},
															),
															productType
																.holidayStops
																.additionalHowAdvice &&
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'div',
																	{
																		children:
																			productType
																				.holidayStops
																				.additionalHowAdvice,
																	},
																),
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'div',
																{
																	css: (0,
																	emotion_react_browser_esm.iv)(
																		typography.AjP,
																		';margin:10px;display:flex;align-items:top;',
																		'',
																	),
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			InfoIcon.s,
																			{},
																		),
																		(0,
																		emotion_react_jsx_runtime_browser_esm.BX)(
																			'div',
																			{
																				children:
																					[
																						(0,
																						emotion_react_jsx_runtime_browser_esm.tZ)(
																							'strong',
																							{
																								children:
																									(0,
																									dates.ur)(
																										renewalDate,
																										dates.Bn,
																									),
																							},
																						),
																						' ',
																						'is the next anniversary of your subscription.',
																						(0,
																						emotion_react_jsx_runtime_browser_esm.tZ)(
																							'br',
																							{},
																						),
																						'The number of',
																						' ',
																						productType
																							.holidayStops
																							.issueKeyword,
																						's you can suspend per year is reset on this date.',
																					],
																			},
																		),
																	],
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																HolidayQuestionsModal.q,
																{
																	annualIssueLimit:
																		holidayStopResponse.annualIssueLimit,
																	holidayStopFlowProperties:
																		productType.holidayStops,
																},
															),
														],
													},
												),
											},
									  )
									: (0,
									  emotion_react_jsx_runtime_browser_esm.BX)(
											'h4',
											{
												children: [
													'This subscription does not automatically renew, so unfortunately you',
													' ',
													holidayStopResponse.existing
														.length > 0
														? 'can no longer'
														: 'cannot',
													' ',
													'create a holiday suspension for this subscription.',
												],
											},
									  ),
								(productDetail.subscription.autoRenew ||
									holidayStopResponse.existing.length > 0) &&
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										emotion_react_jsx_runtime_browser_esm.HY,
										{
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													OverviewRow,
													{
														heading: 'Summary',
														children: (0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															emotion_react_jsx_runtime_browser_esm.HY,
															{
																children: [
																	holidayStopResponse
																		.existing
																		.length >
																	0
																		? (0,
																		  emotion_react_jsx_runtime_browser_esm.tZ)(
																				emotion_react_jsx_runtime_browser_esm.HY,
																				{
																					children:
																						(0,
																						emotion_react_jsx_runtime_browser_esm.BX)(
																							'div',
																							{
																								children:
																									[
																										'You have suspended',
																										' ',
																										(0,
																										emotion_react_jsx_runtime_browser_esm.BX)(
																											'strong',
																											{
																												children:
																													[
																														combinedIssuesImpactedPerYear
																															.issuesThisYear
																															.length,
																														'/',
																														holidayStopResponse.annualIssueLimit,
																													],
																											},
																										),
																										' ',
																										productType
																											.holidayStops
																											.issueKeyword,
																										's until',
																										' ',
																										(0,
																										dates.ur)(
																											renewalDate,
																											dates.Bn,
																										),
																										combinedIssuesImpactedPerYear
																											.issuesNextYear
																											.length >
																											0 &&
																											(0,
																											emotion_react_jsx_runtime_browser_esm.BX)(
																												'span',
																												{
																													children:
																														[
																															' ',
																															'and',
																															' ',
																															(0,
																															emotion_react_jsx_runtime_browser_esm.BX)(
																																'strong',
																																{
																																	children:
																																		[
																																			combinedIssuesImpactedPerYear
																																				.issuesNextYear
																																				.length,
																																			'/',
																																			holidayStopResponse.annualIssueLimit,
																																		],
																																},
																															),
																															' ',
																															productType
																																.holidayStops
																																.issueKeyword,
																															's the following year',
																														],
																												},
																											),
																										'.',
																									],
																							},
																						),
																				},
																		  )
																		: (0,
																		  emotion_react_jsx_runtime_browser_esm.BX)(
																				'div',
																				{
																					children:
																						[
																							'You have',
																							' ',
																							(0,
																							emotion_react_jsx_runtime_browser_esm.tZ)(
																								'strong',
																								{
																									children:
																										holidayStopResponse.annualIssueLimit,
																								},
																							),
																							' ',
																							productType
																								.holidayStops
																								.issueKeyword,
																							's available to suspend until',
																							' ',
																							(0,
																							dates.ur)(
																								renewalDate,
																								dates.Bn,
																							),
																						],
																				},
																		  ),
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'div',
																		{
																			css: (0,
																			emotion_react_browser_esm.iv)(
																				'text-align:right;margin-top:10px;',
																				mq
																					.Dp
																					.phablet,
																				'{display:none;}',
																				'',
																			),
																			children:
																				productDetail
																					.subscription
																					.autoRenew &&
																				createSuspensionButton,
																		},
																	),
																],
															},
														),
													},
												),
												holidayStopResponse.existing
													.length > 0 &&
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														OverviewRow,
														{
															heading:
																'Expected Credits',
															children: (0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																CollatedCredits,
																{
																	publicationsImpacted:
																		holidayStopResponse.existing
																			.filter(
																				HolidayStopApi.DI,
																			)
																			.flatMap(
																				(
																					_,
																				) =>
																					_.publicationsImpacted,
																			),
																	currency,
																},
															),
														},
													),
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													OverviewRow,
													{
														heading: 'Details',
														fullWidth: !0,
														children:
															holidayStopResponse
																.existing
																.length > 0
																? (0,
																  emotion_react_jsx_runtime_browser_esm.tZ)(
																		SummaryTable,
																		{
																			data: holidayStopResponse.existing,
																			isTestUser:
																				productDetail.isTestUser,
																			subscription:
																				productDetail.subscription,
																			issueKeyword:
																				productType
																					.holidayStops
																					.issueKeyword,
																			setExistingHolidayStopToAmend,
																		},
																  )
																: "You currently don't have any scheduled suspensions.",
													},
												),
											],
										},
									),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'div',
									{
										css: (0, emotion_react_browser_esm.iv)(
											'display:flex;justify-content:space-between;align-items:center;margin-top:30px;',
											mq.C4.phablet,
											'{flex-direction:column-reverse;}',
											'',
										),
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'div',
												{
													css: HolidaysOverview_ref2,
													children: (0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														Button.z,
														{
															onClick: () => {
																navigate('/');
															},
															priority:
																'tertiary',
															children:
																'Return to your account',
														},
													),
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'div',
												{
													'data-cy':
														'create-suspension-cta',
													css: HolidaysOverview_ref,
													children:
														productDetail
															.subscription
															.autoRenew &&
														createSuspensionButton,
												},
											),
										],
									},
								),
							],
						},
					);
				};
		},
		'./client/fixtures/holidays.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				fD: () => existingHolidays,
			});
			var existingHolidays = {
				existing: [
					{
						id: 'a2k9E000005NnbrQAC',
						startDate: '2022-03-11',
						endDate: '2022-03-12',
						subscriptionName: 'A-S00293857',
						publicationsImpacted: [
							{
								publicationDate: '2022-03-11',
								estimatedPrice: -2.89,
								invoiceDate: '2022-03-24',
								isActioned: !1,
							},
						],
						mutabilityFlags: {
							isFullyMutable: !0,
							isEndDateEditable: !0,
						},
					},
				],
				issueSpecifics: [
					{ firstAvailableDate: '2022-02-05', issueDayOfWeek: 5 },
				],
				annualIssueLimit: 6,
				firstAvailableDate: '2022-02-05',
			};
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
