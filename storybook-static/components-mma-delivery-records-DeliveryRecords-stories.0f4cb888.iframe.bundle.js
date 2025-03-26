'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[726],
	{
		'./client/components/mma/holiday/HolidayStopApi.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				DI: () => isNotWithdrawn,
				E9: () => isNotBulkSuspension,
				En: () => PotentialHolidayStopsAsyncLoader,
				HC: () => convertRawPotentialHolidayStopDetail,
				M6: () => embellishExistingHolidayStops,
				OX: () => getPotentialHolidayStopsFetcher,
				Uf: () => calculateIssuesImpactedPerYear,
				_B: () => isHolidayStopsResponse,
			});
			var _shared_dates__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__('./shared/dates.ts'),
				_shared_productResponse__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__('./shared/productResponse.ts'),
				_shared_AsyncLoader__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./client/components/mma/shared/AsyncLoader.tsx',
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
			var convertRawPotentialHolidayStopDetail = (raw) => ({
				estimatedPrice: raw.credit,
				invoiceDate: raw.invoiceDate
					? (0, _shared_dates__WEBPACK_IMPORTED_MODULE_0__.sG)(
							raw.invoiceDate,
					  )
					: void 0,
				publicationDate: (0,
				_shared_dates__WEBPACK_IMPORTED_MODULE_0__.sG)(
					raw.publicationDate,
				),
			});
			class PotentialHolidayStopsAsyncLoader extends _shared_AsyncLoader__WEBPACK_IMPORTED_MODULE_2__.y {}
			var getPotentialHolidayStopsFetcher =
				(subscriptionName, startDate, endDate, isTestUser) => () =>
					fetch(
						'/api/holidays/'
							.concat(subscriptionName, '/potential?startDate=')
							.concat(
								(0,
								_shared_dates__WEBPACK_IMPORTED_MODULE_0__.ur)(
									startDate,
									_shared_dates__WEBPACK_IMPORTED_MODULE_0__.U5,
								),
								'&endDate=',
							)
							.concat(
								(0,
								_shared_dates__WEBPACK_IMPORTED_MODULE_0__.ur)(
									endDate,
									_shared_dates__WEBPACK_IMPORTED_MODULE_0__.U5,
								),
							),
						{
							headers: {
								[_shared_productResponse__WEBPACK_IMPORTED_MODULE_1__.l2]:
									''.concat(isTestUser),
							},
						},
					);
			function isHolidayStopsResponse(data) {
				return !!data && data.hasOwnProperty('existing');
			}
			var isNotWithdrawn = (holidayStopRequest) =>
					!holidayStopRequest.withdrawnDate,
				isNotBulkSuspension = (holidayStopRequest) =>
					!holidayStopRequest.bulkSuspensionReason,
				embellishRawHolidayStop = (rawHolidayStopRequest) =>
					_objectSpread(
						_objectSpread({}, rawHolidayStopRequest),
						{},
						{
							withdrawnDate: rawHolidayStopRequest.withdrawnTime
								? (0,
								  _shared_dates__WEBPACK_IMPORTED_MODULE_0__.sG)(
										rawHolidayStopRequest.withdrawnTime,
										"yyyy-MM-dd'T'kk:mm:ss.SSS'Z'",
								  )
								: void 0,
							dateRange: (0,
							_shared_dates__WEBPACK_IMPORTED_MODULE_0__.fZ)(
								rawHolidayStopRequest.startDate,
								rawHolidayStopRequest.endDate,
							),
							publicationsImpacted:
								rawHolidayStopRequest.publicationsImpacted.map(
									(raw) =>
										_objectSpread(
											_objectSpread({}, raw),
											{},
											{
												publicationDate: (0,
												_shared_dates__WEBPACK_IMPORTED_MODULE_0__.sG)(
													raw.publicationDate,
												),
												invoiceDate: raw.invoiceDate
													? (0,
													  _shared_dates__WEBPACK_IMPORTED_MODULE_0__.sG)(
															raw.invoiceDate,
													  )
													: void 0,
											},
										),
								),
						},
					),
				embellishExistingHolidayStops = (function () {
					var _ref = (function _asyncToGenerator(fn) {
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
					})(function* (response) {
						var raw = yield response.json();
						return _objectSpread(
							_objectSpread({}, raw),
							{},
							{
								productSpecifics: {
									firstAvailableDate: (0,
									_shared_dates__WEBPACK_IMPORTED_MODULE_0__.ym)(
										raw.issueSpecifics.map(
											(_) =>
												(0,
												_shared_dates__WEBPACK_IMPORTED_MODULE_0__.sG)(
													_.firstAvailableDate,
												).date,
										),
									),
									issueDaysOfWeek: raw.issueSpecifics.map(
										(_) => _.issueDayOfWeek,
									),
								},
								existing: raw.existing
									.map(embellishRawHolidayStop)
									.sort(
										(a, b) =>
											a.dateRange.start.valueOf() -
											b.dateRange.start.valueOf(),
									),
							},
						);
					});
					return function embellishExistingHolidayStops(_x) {
						return _ref.apply(this, arguments);
					};
				})(),
				calculateIssuesImpactedPerYear = (
					publicationsImpacted,
					anniversaryDate,
				) => ({
					issuesThisYear: publicationsImpacted.filter(
						(issue) =>
							issue.publicationDate.isBefore(anniversaryDate) &&
							issue.publicationDate.isSameOrAfter(
								(0,
								_shared_dates__WEBPACK_IMPORTED_MODULE_0__.CF)(
									anniversaryDate,
									-1,
								),
							),
					),
					issuesNextYear: publicationsImpacted.filter(
						(issue) =>
							issue.publicationDate.isSameOrAfter(
								anniversaryDate,
							) &&
							issue.publicationDate.isBefore(
								(0,
								_shared_dates__WEBPACK_IMPORTED_MODULE_0__.CF)(
									anniversaryDate,
									1,
								),
							),
					),
				});
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
		'./client/components/shared/FormError.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { X: () => FormError });
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
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				_mma_shared_assets_ErrorIcon__WEBPACK_IMPORTED_MODULE_5__ =
					__webpack_require__(
						'./client/components/mma/shared/assets/ErrorIcon.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			var dlStyles = (0, _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'position:relative;padding:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[5],
					'px ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[5],
					'px ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[5],
					'px 50px;',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.Kz0,
					';border:4px solid ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.palette.error[400],
					';',
					'',
				),
				iStyles = (0, _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'position:absolute;top:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[5],
					'px;left:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[5],
					'px;',
					'',
				),
				dtStyles = { name: '1efi8gv', styles: 'font-weight:bold' },
				ddStyles = { name: 'ti75j2', styles: 'margin:0' },
				ulStyles = {
					name: 'z06qs',
					styles: 'list-style:none;margin:0;padding:0',
				},
				FormError = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.BX)(
						'dl',
						{
							css: dlStyles,
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
									'i',
									{
										css: iStyles,
										children: (0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
											_mma_shared_assets_ErrorIcon__WEBPACK_IMPORTED_MODULE_5__.P,
											{},
										),
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
									'dt',
									{ css: dtStyles, children: props.title },
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
									'dd',
									{
										css: ddStyles,
										children: (0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
											'ul',
											{
												css: ulStyles,
												children: props.messages.map(
													(msg, index) =>
														(0,
														_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.tZ)(
															'li',
															{ children: msg },
															'feli-'.concat(
																index,
															),
														),
												),
											},
										),
									},
								),
							],
						},
					);
			try {
				(FormError.displayName = 'FormError'),
					(FormError.__docgenInfo = {
						description: '',
						displayName: 'FormError',
						props: {
							title: {
								defaultValue: null,
								description: '',
								name: 'title',
								required: !1,
								type: { name: 'string' },
							},
							messages: {
								defaultValue: null,
								description: '',
								name: 'messages',
								required: !0,
								type: {
									name: '(string | ReactElement<any, string | JSXElementConstructor<any>>)[]',
								},
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/shared/FormError.tsx#FormError'
						] = {
							docgenInfo: FormError.__docgenInfo,
							name: 'FormError',
							path: 'client/components/shared/FormError.tsx#FormError',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/delivery/records/DeliveryRecords.stories.tsx':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.r(__webpack_exports__),
					__webpack_require__.d(__webpack_exports__, {
						Confirmation: () => Confirmation,
						DeliveryHistory: () => DeliveryHistory,
						Review: () => Review,
						__namedExportsOrder: () => __namedExportsOrder,
						default: () => DeliveryRecords_stories,
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
					productTypes = __webpack_require__(
						'./shared/productTypes.ts',
					),
					deliveryRecordsWithDelivery = {
						results: [
							{
								id: 'a339E000000KDOMQA4',
								deliveryDate: '2022-04-15',
								deliveryInstruction: null,
								deliveryAddress:
									'Kings Place, London, 90 York Way',
								addressLine1: 'Kings Place',
								addressLine2: null,
								addressLine3: null,
								addressTown: 'London',
								addressCountry: null,
								addressPostcode: '90 York Way',
								hasHolidayStop: !1,
								bulkSuspensionReason: null,
								problemCaseId: null,
								isChangedAddress: !1,
								isChangedDeliveryInstruction: null,
								credit: null,
							},
						],
						deliveryProblemMap: {},
						contactPhoneNumbers: {
							Id: '0039E00001Mw6DCQAZ',
							Phone: null,
							HomePhone: null,
							MobilePhone: null,
							OtherPhone: null,
						},
					},
					testProducts = __webpack_require__(
						'./client/fixtures/productBuilder/testProducts.ts',
					),
					emotion_react_browser_esm = __webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
					space = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
					),
					palette = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__deprecated__/colour/palette.js',
					),
					typography = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
					mq = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
					),
					_generated_palette = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
					Button = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/button/Button.js',
					),
					Stack = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/stack/Stack.js',
					),
					lodash = __webpack_require__(
						'./node_modules/lodash/lodash.js',
					),
					react = __webpack_require__(
						'./node_modules/react/index.js',
					),
					react_router = __webpack_require__(
						'./node_modules/react-router/index.js',
					),
					dates = __webpack_require__('./shared/dates.ts'),
					productResponse = __webpack_require__(
						'./shared/productResponse.ts',
					),
					analytics = __webpack_require__(
						'./client/utilities/analytics.ts',
					),
					CallCenterEmailAndNumbers = __webpack_require__(
						'./client/components/shared/CallCenterEmailAndNumbers.tsx',
					),
					FormError = __webpack_require__(
						'./client/components/shared/FormError.tsx',
					),
					InfoIconDark = __webpack_require__(
						'./client/components/mma/shared/assets/InfoIconDark.tsx',
					),
					ProgressIndicator = __webpack_require__(
						'./client/components/mma/shared/ProgressIndicator.tsx',
					),
					CheckboxGroup = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/checkbox/CheckboxGroup.js',
					),
					Checkbox = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/checkbox/Checkbox.js',
					),
					color = __webpack_require__(
						'./node_modules/color/index.js',
					),
					color_default = __webpack_require__.n(color),
					deliveryAddress = __webpack_require__(
						'./client/utilities/deliveryAddress.ts',
					),
					productUtils = __webpack_require__(
						'./client/utilities/productUtils.ts',
					),
					utils = __webpack_require__('./client/utilities/utils.ts'),
					Input = __webpack_require__(
						'./client/components/shared/Input.tsx',
					),
					models = __webpack_require__(
						'./client/components/mma/identity/models.ts',
					),
					AsyncLoader = __webpack_require__(
						'./client/components/mma/shared/AsyncLoader.tsx',
					),
					CallCentrePrompt = __webpack_require__(
						'./client/components/mma/shared/CallCentrePrompt.tsx',
					),
					InfoSection = __webpack_require__(
						'./client/components/mma/shared/InfoSection.tsx',
					),
					ProductDescriptionListTable = __webpack_require__(
						'./client/components/mma/shared/ProductDescriptionListTable.tsx',
					),
					deliveryAddressApi = __webpack_require__(
						'./client/components/mma/delivery/address/deliveryAddressApi.ts',
					),
					DeliveryAddressConfirmation = __webpack_require__(
						'./client/components/mma/delivery/address/DeliveryAddressConfirmation.tsx',
					),
					DeliveryAddressFormContext = __webpack_require__(
						'./client/components/mma/delivery/address/DeliveryAddressFormContext.tsx',
					),
					formValidation = __webpack_require__(
						'./client/components/mma/delivery/address/formValidation.tsx',
					),
					Select = __webpack_require__(
						'./client/components/mma/delivery/address/Select.tsx',
					),
					DeliveryRecordsAddressContext = (0, react.createContext)(
						{},
					),
					DeliveryRecordCreditContext = (0, react.createContext)(
						null,
					),
					DeliveryRecordsProblemPostPayloadContext = (0,
					react.createContext)({}),
					DeliveryAddressDisplay = __webpack_require__(
						'./client/components/mma/delivery/address/DeliveryAddressDisplay.tsx',
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
				var _ref = { name: 'xgv4ep', styles: 'display:table-row' },
					_ref2 = { name: 'xgv4ep', styles: 'display:table-row' },
					ReadOnlyAddressDisplay = (props) => {
						var dtCss = (ignoreMinWidthAtNonMobile) =>
								'\n\t'
									.concat(
										typography.Kz0,
										';\n    font-weight: bold;\n    display: table-cell;\n    vertical-align: top;\n    min-width: 10ch;\n    ',
									)
									.concat(
										mq.Dp.tablet,
										' {\n      margin-right: 16px;\n      ',
									)
									.concat(
										ignoreMinWidthAtNonMobile
											? 'min-width: 9ch;'
											: 'min-width: 12ch;',
										'\n    }\n',
									),
							ddCss = '\n\t'.concat(
								typography.Kz0,
								';\n    display: table-cell;\n    vertical-align: top;\n    margin-left: 0;\n',
							);
						return (0, emotion_react_jsx_runtime_browser_esm.BX)(
							'dl',
							{
								css: (0, emotion_react_browser_esm.iv)(
									'margin:0;padding:',
									space.D[3],
									'px;display:table;',
									mq.Dp.tablet,
									'{padding:',
									space.D[5],
									'px;}',
									'',
								),
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'div',
										{
											css: _ref2,
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'dt',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															dtCss(),
															';',
															'',
														),
														children: 'Address:',
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'dd',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															ddCss,
															';',
															'',
														),
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																DeliveryAddressDisplay.O,
																_objectSpread(
																	{},
																	props.address,
																),
															),
															!props.instructions &&
																props.showEditButton &&
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	Button.z,
																	{
																		onClick:
																			() => {
																				var _props$editButtonCall;
																				return null ===
																					(_props$editButtonCall =
																						props.editButtonCallback) ||
																					void 0 ===
																						_props$editButtonCall
																					? void 0
																					: _props$editButtonCall.call(
																							props,
																					  );
																			},
																		cssOverrides:
																			(0,
																			emotion_react_browser_esm.iv)(
																				'display:block;margin-top:',
																				space
																					.D[5],
																				'px;color:',
																				_generated_palette
																					.palette
																					.brand[400],
																				';background-color:',
																				_generated_palette
																					.palette
																					.brand[800],
																				';:hover{background-color:',
																				color_default()(
																					_generated_palette
																						.palette
																						.brand[800],
																					'hex',
																				)
																					.darken(
																						0.1,
																					)
																					.string(),
																				';}',
																				'',
																			),
																		children:
																			'Update',
																	},
																),
														],
													},
												),
											],
										},
									),
									props.instructions &&
										(0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											'div',
											{
												css: _ref,
												children: [
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'dt',
														{
															css: (0,
															emotion_react_browser_esm.iv)(
																dtCss(),
																';',
																'',
															),
															children:
																'Instructions:',
														},
													),
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'dd',
														{
															css: (0,
															emotion_react_browser_esm.iv)(
																ddCss,
																';',
																'',
															),
															children: [
																props.instructions,
																props.showEditButton &&
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		Button.z,
																		{
																			onClick:
																				() => {
																					var _props$editButtonCall2;
																					return null ===
																						(_props$editButtonCall2 =
																							props.editButtonCallback) ||
																						void 0 ===
																							_props$editButtonCall2
																						? void 0
																						: _props$editButtonCall2.call(
																								props,
																						  );
																				},
																			cssOverrides:
																				(0,
																				emotion_react_browser_esm.iv)(
																					'display:block;margin-top:',
																					space
																						.D[5],
																					'px;color:',
																					_generated_palette
																						.palette
																						.brand[400],
																					';background-color:',
																					_generated_palette
																						.palette
																						.brand[800],
																					';:hover{background-color:',
																					color_default()(
																						_generated_palette
																							.palette
																							.brand[800],
																						'hex',
																					)
																						.darken(
																							0.1,
																						)
																						.string(),
																					';}',
																					'',
																				),
																			children:
																				'Update',
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
					(ReadOnlyAddressDisplay.displayName =
						'ReadOnlyAddressDisplay'),
						(ReadOnlyAddressDisplay.__docgenInfo = {
							description: '',
							displayName: 'ReadOnlyAddressDisplay',
							props: {
								showEditButton: {
									defaultValue: null,
									description: '',
									name: 'showEditButton',
									required: !1,
									type: { name: 'boolean' },
								},
								editButtonCallback: {
									defaultValue: null,
									description: '',
									name: 'editButtonCallback',
									required: !1,
									type: { name: '(() => void)' },
								},
								address: {
									defaultValue: null,
									description: '',
									name: 'address',
									required: !0,
									type: { name: 'DeliveryAddress' },
								},
								instructions: {
									defaultValue: null,
									description: '',
									name: 'instructions',
									required: !1,
									type: { name: 'string' },
								},
							},
						}),
						'undefined' != typeof STORYBOOK_REACT_CLASSES &&
							(STORYBOOK_REACT_CLASSES[
								'client/components/mma/delivery/records/ReadOnlyAddressDisplay.tsx#ReadOnlyAddressDisplay'
							] = {
								docgenInfo: ReadOnlyAddressDisplay.__docgenInfo,
								name: 'ReadOnlyAddressDisplay',
								path: 'client/components/mma/delivery/records/ReadOnlyAddressDisplay.tsx#ReadOnlyAddressDisplay',
							});
				} catch (__react_docgen_typescript_loader_error) {}
				function DeliveryAddressStep_ownKeys(e, r) {
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
				function DeliveryAddressStep_objectSpread(e) {
					for (var r = 1; r < arguments.length; r++) {
						var t = null != arguments[r] ? arguments[r] : {};
						r % 2
							? DeliveryAddressStep_ownKeys(
									Object(t),
									!0,
							  ).forEach(function (r) {
									DeliveryAddressStep_defineProperty(
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
							: DeliveryAddressStep_ownKeys(Object(t)).forEach(
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
				function DeliveryAddressStep_defineProperty(obj, key, value) {
					return (
						(key = (function DeliveryAddressStep_toPropertyKey(
							arg,
						) {
							var key = (function DeliveryAddressStep_toPrimitive(
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
				var DeliveryAddressStep_ref = {
						name: '1ykowef',
						styles: 'margin-bottom:0',
					},
					DeliveryAddressStep_ref2 = {
						name: 'wjlr4v',
						styles: '*{display:inline-block;}',
					},
					_ref3 = {
						name: 'igbi3c',
						styles: 'display:inline-block;vertical-align:top;margin-top:4px;width:100%;max-width:30ch',
					},
					_ref4 = { name: '1fw72n4', styles: 'margin-top:14px' },
					DeliveryAddressStep = (props) => {
						var _newAddress$instructi,
							_deliveryAddressConte11,
							Status = (function (Status) {
								return (
									(Status[(Status.ReadOnly = 0)] =
										'ReadOnly'),
									(Status[(Status.Edit = 1)] = 'Edit'),
									(Status[(Status.ValidationError = 2)] =
										'ValidationError'),
									(Status[(Status.Pending = 3)] = 'Pending'),
									(Status[(Status.Confirmation = 4)] =
										'Confirmation'),
									(Status[(Status.Error = 5)] = 'Error'),
									Status
								);
							})({}),
							[status, setStatus] = (0, react.useState)(
								Status.ReadOnly,
							),
							deliveryAddressContext = (0, react.useContext)(
								DeliveryRecordsAddressContext,
							),
							newAddress =
								deliveryAddressContext.address ||
								props.productDetail.subscription
									.deliveryAddress,
							[
								instructionsRemainingCharacters,
								setInstructionsRemainingCharacters,
							] = (0, react.useState)(
								250 -
									((null ===
										(_newAddress$instructi =
											newAddress.instructions) ||
									void 0 === _newAddress$instructi
										? void 0
										: _newAddress$instructi.length) || 0),
							),
							[acknowledgementChecked, setAcknowledgementState] =
								(0, react.useState)(!1),
							[formErrors, setFormErrors] = (0, react.useState)({
								isValid: !1,
							}),
							isNationalDelivery =
								(0, productResponse.Xn)(
									props.productDetail.tier,
								) === productTypes.Pm.nationaldelivery,
							[
								showCallCentreNumbers,
								setCallCentreNumbersVisibility,
							] = (0, react.useState)(!1),
							[
								addressChangeInformation,
								setAddressChangeInformation,
							] = (0, react.useState)(''),
							handleFormSubmit =
								(
									subscriptionsNames,
									productsAffected,
									addressChangeAffectedInfoArray,
								) =>
								(e) => {
									var _deliveryAddressConte;
									e.preventDefault(),
										null ===
											(_deliveryAddressConte =
												deliveryAddressContext.setProductsAffected) ||
											void 0 === _deliveryAddressConte ||
											_deliveryAddressConte.call(
												deliveryAddressContext,
												productsAffected,
											),
										setStatus(Status.Pending);
									var isFormValidResponse = (0,
									formValidation._)(
										newAddress,
										subscriptionsNames,
									);
									setFormErrors({
										addressLine1:
											isFormValidResponse.addressLine1,
										town: isFormValidResponse.town,
										postcode: isFormValidResponse.postcode,
										country: isFormValidResponse.country,
									}),
										isFormValidResponse.isValid &&
										acknowledgementChecked
											? (props.setAddressValidationState(
													!0,
											  ),
											  setAddressChangeInformation(
													[
														...addressChangeAffectedInfoArray.map(
															(element) =>
																''
																	.concat(
																		element.friendlyProductName,
																		' subscription (',
																	)
																	.concat(
																		element.subscriptionId,
																		')',
																	)
																	.concat(
																		element.effectiveDate
																			? ' as of front cover dated '.concat(
																					(0,
																					dates.ur)(
																						element.effectiveDate,
																						'EEEE do MMMM yyyy',
																					),
																			  )
																			: '',
																	),
														),
														'',
														'(as displayed on confirmation page at '.concat(
															(0, dates.ur)(
																new Date(),
																"HH:mm:ss x 'on' do MMMM yyyy",
															),
															')',
														),
													].join('\n'),
											  ),
											  setStatus(Status.Confirmation))
											: setStatus(Status.ValidationError);
								};
						return status === Status.Edit ||
							status === Status.Pending ||
							status === Status.ValidationError
							? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'div',
									{
										css: (0, emotion_react_browser_esm.iv)(
											'padding:',
											space.D[3],
											'px;',
											mq.Dp.tablet,
											'{padding:',
											space.D[5],
											'px;}',
											'',
										),
										children: (0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											productResponse.wH,
											{
												render: (mdapiResponse) => {
													var _formErrors$addressLi,
														_formErrors$addressLi2,
														_formErrors$town,
														_formErrors$town2,
														_formErrors$postcode,
														_formErrors$postcode2,
														_COUNTRIES$find,
														_formErrors$country,
														_formErrors$country2,
														contactIdToArrayOfProductDetailAndProductType =
															(0,
															deliveryAddress.O)(
																mdapiResponse.products
																	.filter(
																		productResponse.v_,
																	)
																	.filter(
																		(
																			product,
																		) =>
																			'Gift' !==
																			product
																				.subscription
																				.readerType,
																	),
															),
														addressChangeAffectedInfoArray =
															(0,
															deliveryAddress.c)(
																contactIdToArrayOfProductDetailAndProductType,
															),
														productsAffected = (0,
														DeliveryAddressFormContext.lD)(
															addressChangeAffectedInfoArray,
														),
														subscriptionNames =
															Object.values(
																contactIdToArrayOfProductDetailAndProductType,
															)
																.flatMap(
																	utils.OG,
																)
																.map(
																	(_ref5) => {
																		var {
																				productDetail,
																			} =
																				_ref5,
																			friendlyProductName =
																				(0,
																				productResponse.Xn)(
																					productDetail.tier,
																				).friendlyName;
																		return ''.concat(
																			friendlyProductName,
																		);
																	},
																),
														hasNationalDelivery =
															Object.values(
																contactIdToArrayOfProductDetailAndProductType,
															)
																.flatMap(
																	utils.OG,
																)
																.some(
																	(_ref6) => {
																		var {
																			productType,
																		} = _ref6;
																		return (
																			'nationaldelivery' ===
																			productType.productType
																		);
																	},
																);
													return hasNationalDelivery
														? (0,
														  emotion_react_jsx_runtime_browser_esm.tZ)(
																'div',
																{
																	css: (0,
																	emotion_react_browser_esm.iv)(
																		'margin-top:',
																		space
																			.D[3],
																		'px;',
																		'',
																	),
																	children:
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			CallCentrePrompt.r,
																			{},
																		),
																},
														  )
														: (0,
														  emotion_react_jsx_runtime_browser_esm.BX)(
																emotion_react_jsx_runtime_browser_esm.HY,
																{
																	children: [
																		productsAffected.length >
																			1 &&
																			(0,
																			emotion_react_jsx_runtime_browser_esm.tZ)(
																				InfoSection.w,
																				{
																					children:
																						'Please note that changing your address here will update the delivery address for all of your subscriptions.',
																				},
																			),
																		(0,
																		emotion_react_jsx_runtime_browser_esm.BX)(
																			'form',
																			{
																				action: '#',
																				onSubmit:
																					handleFormSubmit(
																						subscriptionNames,
																						productsAffected,
																						addressChangeAffectedInfoArray,
																					),
																				children:
																					[
																						(0,
																						emotion_react_jsx_runtime_browser_esm.BX)(
																							'fieldset',
																							{
																								css: (0,
																								emotion_react_browser_esm.iv)(
																									'margin:0;padding:0;border:0;label{margin-top:',
																									space
																										.D[3],
																									'px;}',
																									'',
																								),
																								children:
																									[
																										(0,
																										emotion_react_jsx_runtime_browser_esm.tZ)(
																											Input.I,
																											{
																												label: 'Address line 1',
																												width: 30,
																												value: newAddress.addressLine1,
																												changeSetState:
																													(
																														value,
																													) => {
																														var _deliveryAddressConte2;
																														return null ===
																															(_deliveryAddressConte2 =
																																deliveryAddressContext.setAddress) ||
																															void 0 ===
																																_deliveryAddressConte2
																															? void 0
																															: _deliveryAddressConte2.call(
																																	deliveryAddressContext,
																																	DeliveryAddressStep_objectSpread(
																																		DeliveryAddressStep_objectSpread(
																																			{},
																																			newAddress,
																																		),
																																		{},
																																		{
																																			addressLine1:
																																				value,
																																		},
																																	),
																															  );
																													},
																												inErrorState:
																													status ===
																														Status.ValidationError &&
																													!(
																														null !==
																															(_formErrors$addressLi =
																																formErrors.addressLine1) &&
																														void 0 !==
																															_formErrors$addressLi &&
																														_formErrors$addressLi.isValid
																													),
																												errorMessage:
																													null ===
																														(_formErrors$addressLi2 =
																															formErrors.addressLine1) ||
																													void 0 ===
																														_formErrors$addressLi2
																														? void 0
																														: _formErrors$addressLi2.message,
																											},
																										),
																										(0,
																										emotion_react_jsx_runtime_browser_esm.tZ)(
																											Input.I,
																											{
																												label: 'Address line 2',
																												width: 30,
																												value:
																													newAddress.addressLine2 ||
																													'',
																												changeSetState:
																													(
																														value,
																													) => {
																														var _deliveryAddressConte3;
																														return null ===
																															(_deliveryAddressConte3 =
																																deliveryAddressContext.setAddress) ||
																															void 0 ===
																																_deliveryAddressConte3
																															? void 0
																															: _deliveryAddressConte3.call(
																																	deliveryAddressContext,
																																	DeliveryAddressStep_objectSpread(
																																		DeliveryAddressStep_objectSpread(
																																			{},
																																			newAddress,
																																		),
																																		{},
																																		{
																																			addressLine2:
																																				value,
																																		},
																																	),
																															  );
																													},
																												optional:
																													!0,
																											},
																										),
																										(0,
																										emotion_react_jsx_runtime_browser_esm.tZ)(
																											Input.I,
																											{
																												label: 'Town or City',
																												width: 30,
																												value:
																													newAddress.town ||
																													'',
																												changeSetState:
																													(
																														value,
																													) => {
																														var _deliveryAddressConte4;
																														return null ===
																															(_deliveryAddressConte4 =
																																deliveryAddressContext.setAddress) ||
																															void 0 ===
																																_deliveryAddressConte4
																															? void 0
																															: _deliveryAddressConte4.call(
																																	deliveryAddressContext,
																																	DeliveryAddressStep_objectSpread(
																																		DeliveryAddressStep_objectSpread(
																																			{},
																																			newAddress,
																																		),
																																		{},
																																		{
																																			town: value,
																																		},
																																	),
																															  );
																													},
																												inErrorState:
																													status ===
																														Status.ValidationError &&
																													!(
																														null !==
																															(_formErrors$town =
																																formErrors.town) &&
																														void 0 !==
																															_formErrors$town &&
																														_formErrors$town.isValid
																													),
																												errorMessage:
																													null ===
																														(_formErrors$town2 =
																															formErrors.town) ||
																													void 0 ===
																														_formErrors$town2
																														? void 0
																														: _formErrors$town2.message,
																											},
																										),
																										(0,
																										emotion_react_jsx_runtime_browser_esm.tZ)(
																											Input.I,
																											{
																												label: 'County or State',
																												width: 30,
																												value:
																													newAddress.region ||
																													'',
																												optional:
																													!0,
																												changeSetState:
																													(
																														value,
																													) => {
																														var _deliveryAddressConte5;
																														return null ===
																															(_deliveryAddressConte5 =
																																deliveryAddressContext.setAddress) ||
																															void 0 ===
																																_deliveryAddressConte5
																															? void 0
																															: _deliveryAddressConte5.call(
																																	deliveryAddressContext,
																																	DeliveryAddressStep_objectSpread(
																																		DeliveryAddressStep_objectSpread(
																																			{},
																																			newAddress,
																																		),
																																		{},
																																		{
																																			region: value,
																																		},
																																	),
																															  );
																													},
																											},
																										),
																										(0,
																										emotion_react_jsx_runtime_browser_esm.tZ)(
																											Input.I,
																											{
																												label: 'Postcode/Zipcode',
																												width: 11,
																												value: newAddress.postcode,
																												changeSetState:
																													(
																														value,
																													) => {
																														var _deliveryAddressConte6;
																														return null ===
																															(_deliveryAddressConte6 =
																																deliveryAddressContext.setAddress) ||
																															void 0 ===
																																_deliveryAddressConte6
																															? void 0
																															: _deliveryAddressConte6.call(
																																	deliveryAddressContext,
																																	DeliveryAddressStep_objectSpread(
																																		DeliveryAddressStep_objectSpread(
																																			{},
																																			newAddress,
																																		),
																																		{},
																																		{
																																			postcode:
																																				value,
																																		},
																																	),
																															  );
																													},
																												inErrorState:
																													status ===
																														Status.ValidationError &&
																													!(
																														null !==
																															(_formErrors$postcode =
																																formErrors.postcode) &&
																														void 0 !==
																															_formErrors$postcode &&
																														_formErrors$postcode.isValid
																													),
																												errorMessage:
																													null ===
																														(_formErrors$postcode2 =
																															formErrors.postcode) ||
																													void 0 ===
																														_formErrors$postcode2
																														? void 0
																														: _formErrors$postcode2.message,
																											},
																										),
																										(0,
																										emotion_react_jsx_runtime_browser_esm.tZ)(
																											Select.P,
																											{
																												label: 'Country',
																												options:
																													models.od.map(
																														(
																															country,
																														) => ({
																															name: country.name,
																															value: country.name,
																														}),
																													),
																												width: 30,
																												additionalCSS:
																													_ref4,
																												value:
																													(null ===
																														(_COUNTRIES$find =
																															models.od.find(
																																(
																																	country,
																																) =>
																																	newAddress.country ===
																																	country.iso,
																															)) ||
																													void 0 ===
																														_COUNTRIES$find
																														? void 0
																														: _COUNTRIES$find.name) ||
																													newAddress.country,
																												changeSetState:
																													(
																														value,
																													) => {
																														var _deliveryAddressConte7;
																														return null ===
																															(_deliveryAddressConte7 =
																																deliveryAddressContext.setAddress) ||
																															void 0 ===
																																_deliveryAddressConte7
																															? void 0
																															: _deliveryAddressConte7.call(
																																	deliveryAddressContext,
																																	DeliveryAddressStep_objectSpread(
																																		DeliveryAddressStep_objectSpread(
																																			{},
																																			newAddress,
																																		),
																																		{},
																																		{
																																			country:
																																				value,
																																		},
																																	),
																															  );
																													},
																												inErrorState:
																													status ===
																														Status.ValidationError &&
																													!(
																														null !==
																															(_formErrors$country =
																																formErrors.country) &&
																														void 0 !==
																															_formErrors$country &&
																														_formErrors$country.isValid
																													),
																												errorMessage:
																													null ===
																														(_formErrors$country2 =
																															formErrors.country) ||
																													void 0 ===
																														_formErrors$country2
																														? void 0
																														: _formErrors$country2.message,
																											},
																										),
																										props.enableDeliveryInstructions &&
																											(0,
																											emotion_react_jsx_runtime_browser_esm.BX)(
																												'label',
																												{
																													css: (0,
																													emotion_react_browser_esm.iv)(
																														'display:block;color:',
																														_generated_palette
																															.palette
																															.neutral[7],
																														';',
																														typography.Kz0,
																														';font-weight:bold;',
																														'',
																													),
																													children:
																														[
																															'Instructions',
																															(0,
																															emotion_react_jsx_runtime_browser_esm.BX)(
																																'div',
																																{
																																	children:
																																		[
																																			(0,
																																			emotion_react_jsx_runtime_browser_esm.BX)(
																																				'div',
																																				{
																																					css: _ref3,
																																					children:
																																						[
																																							(0,
																																							emotion_react_jsx_runtime_browser_esm.tZ)(
																																								'textarea',
																																								{
																																									id: 'delivery-instructions',
																																									name: 'instructions',
																																									rows: 2,
																																									maxLength: 250,
																																									value: newAddress.instructions,
																																									onChange:
																																										(
																																											e,
																																										) => {
																																											var _deliveryAddressConte8;
																																											null ===
																																												(_deliveryAddressConte8 =
																																													deliveryAddressContext.setAddress) ||
																																												void 0 ===
																																													_deliveryAddressConte8 ||
																																												_deliveryAddressConte8.call(
																																													deliveryAddressContext,
																																													DeliveryAddressStep_objectSpread(
																																														DeliveryAddressStep_objectSpread(
																																															{},
																																															newAddress,
																																														),
																																														{},
																																														{
																																															instructions:
																																																e
																																																	.target
																																																	.value,
																																														},
																																													),
																																												),
																																												setInstructionsRemainingCharacters(
																																													250 -
																																														e
																																															.target
																																															.value
																																															.length,
																																												);
																																										},
																																									css: (0,
																																									emotion_react_browser_esm.iv)(
																																										'width:100%;border:2px solid ',
																																										_generated_palette
																																											.palette
																																											.neutral[60],
																																										';padding:12px;resize:vertical;',
																																										typography.Kz0,
																																										';',
																																										'',
																																									),
																																								},
																																							),
																																							(0,
																																							emotion_react_jsx_runtime_browser_esm.BX)(
																																								'span',
																																								{
																																									css: (0,
																																									emotion_react_browser_esm.iv)(
																																										'display:block;text-align:right;',
																																										typography.VZD,
																																										';color:',
																																										_generated_palette
																																											.palette
																																											.neutral[46],
																																										';',
																																										'',
																																									),
																																									children:
																																										[
																																											instructionsRemainingCharacters,
																																											' ',
																																											'characters remaining',
																																										],
																																								},
																																							),
																																						],
																																				},
																																			),
																																			(0,
																																			emotion_react_jsx_runtime_browser_esm.BX)(
																																				'p',
																																				{
																																					css: (0,
																																					emotion_react_browser_esm.iv)(
																																						'display:block;',
																																						typography.Kz0,
																																						';border:4px solid ',
																																						_generated_palette
																																							.palette
																																							.brand[500],
																																						';padding:',
																																						space
																																							.D[5],
																																						'px ',
																																						space
																																							.D[5],
																																						'px ',
																																						space
																																							.D[5],
																																						'px 49px;margin:',
																																						space
																																							.D[3],
																																						'px 0;position:relative;',
																																						mq
																																							.Dp
																																							.tablet,
																																						'{display:inline-block;margin:2px 0 ',
																																						space
																																							.D[3],
																																						'px ',
																																						space
																																							.D[3],
																																						'px;width:calc(\n\t\t\t\t\t\t\t\t\t\t\t\t\t100% -\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t(\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t30ch + ',
																																						space
																																							.D[3],
																																						'px +\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t2px\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t\t\t\t\t);}',
																																						'',
																																					),
																																					children:
																																						[
																																							(0,
																																							emotion_react_jsx_runtime_browser_esm.tZ)(
																																								'i',
																																								{
																																									css: (0,
																																									emotion_react_browser_esm.iv)(
																																										'width:17px;height:17px;position:absolute;top:',
																																										space
																																											.D[5],
																																										'px;left:',
																																										space
																																											.D[5],
																																										'px;',
																																										'',
																																									),
																																									children:
																																										(0,
																																										emotion_react_jsx_runtime_browser_esm.tZ)(
																																											InfoIconDark.J,
																																											{
																																												fillColor:
																																													_generated_palette
																																														.palette
																																														.brand[500],
																																											},
																																										),
																																								},
																																							),
																																							'Delivery instructions are only applicable for newspaper deliveries. They do not apply to Guardian Weekly.',
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
																						(0,
																						emotion_react_jsx_runtime_browser_esm.tZ)(
																							CheckboxGroup.c,
																							{
																								cssOverrides:
																									(0,
																									emotion_react_browser_esm.iv)(
																										'margin-top:',
																										space
																											.D[5],
																										'px;',
																										'',
																									),
																								name: 'instructions-checkbox',
																								error:
																									status !==
																										Status.ValidationError ||
																									acknowledgementChecked
																										? void 0
																										: 'Please indicate that you understand which subscriptions this change will affect.',
																								children:
																									(0,
																									emotion_react_jsx_runtime_browser_esm.tZ)(
																										Checkbox.X,
																										{
																											value: 'acknowledged',
																											label: 'I understand that this address change will affect the following subscriptions',
																											checked:
																												acknowledgementChecked,
																											onChange:
																												(
																													e,
																												) => {
																													setAcknowledgementState(
																														e
																															.target
																															.checked,
																													);
																												},
																										},
																									),
																							},
																						),
																						productsAffected.length &&
																							(0,
																							emotion_react_jsx_runtime_browser_esm.tZ)(
																								ProductDescriptionListTable.M,
																								{
																									content:
																										productsAffected,
																									seperateEachRow:
																										!0,
																								},
																							),
																						(0,
																						emotion_react_jsx_runtime_browser_esm.BX)(
																							'div',
																							{
																								css: DeliveryAddressStep_ref2,
																								children:
																									[
																										(0,
																										emotion_react_jsx_runtime_browser_esm.tZ)(
																											Button.z,
																											{
																												type: 'submit',
																												cssOverrides:
																													(0,
																													emotion_react_browser_esm.iv)(
																														'color:',
																														_generated_palette
																															.palette
																															.brand[400],
																														';background-color:',
																														_generated_palette
																															.palette
																															.brand[800],
																														';:hover{background-color:',
																														color_default()(
																															_generated_palette
																																.palette
																																.brand[800],
																															'hex',
																														)
																															.darken(
																																0.1,
																															)
																															.string(),
																														';}',
																														'',
																													),
																												children:
																													'Save address',
																											},
																										),
																										(0,
																										emotion_react_jsx_runtime_browser_esm.tZ)(
																											Button.z,
																											{
																												onClick:
																													() => {
																														var _deliveryAddressConte9;
																														null ===
																															(_deliveryAddressConte9 =
																																deliveryAddressContext.setAddress) ||
																															void 0 ===
																																_deliveryAddressConte9 ||
																															_deliveryAddressConte9.call(
																																deliveryAddressContext,
																																props
																																	.productDetail
																																	.subscription
																																	.deliveryAddress,
																															),
																															props.setAddressValidationState(
																																!0,
																															),
																															setStatus(
																																Status.ReadOnly,
																															);
																													},
																												cssOverrides:
																													(0,
																													emotion_react_browser_esm.iv)(
																														'margin-top:',
																														space
																															.D[5],
																														'px;color:',
																														_generated_palette
																															.palette
																															.brand[400],
																														';background-color:transparent;:hover{background-color:transparent;}',
																														'',
																													),
																												children:
																													'Discard changes',
																											},
																										),
																									],
																							},
																						),
																					],
																			},
																		),
																		productsAffected.length >
																			1 &&
																			(0,
																			emotion_react_jsx_runtime_browser_esm.BX)(
																				'p',
																				{
																					css: (0,
																					emotion_react_browser_esm.iv)(
																						typography.Kz0,
																						';background-color:',
																						_generated_palette
																							.palette
																							.neutral[97],
																						';padding:',
																						space
																							.D[5],
																						'px ',
																						space
																							.D[5],
																						'px ',
																						space
																							.D[5],
																						'px 49px;margin:',
																						space
																							.D[5],
																						'px 0 ',
																						space
																							.D[3],
																						'px;position:relative;',
																						'',
																					),
																					children:
																						[
																							(0,
																							emotion_react_jsx_runtime_browser_esm.tZ)(
																								'i',
																								{
																									css: (0,
																									emotion_react_browser_esm.iv)(
																										'width:17px;height:17px;position:absolute;top:',
																										space
																											.D[5],
																										'px;left:',
																										space
																											.D[5],
																										'px;',
																										'',
																									),
																									children:
																										(0,
																										emotion_react_jsx_runtime_browser_esm.tZ)(
																											InfoIconDark.J,
																											{
																												fillColor:
																													_generated_palette
																														.palette
																														.brand[500],
																											},
																										),
																								},
																							),
																							'If you need seperate delivery addresses for each of your subscriptions, please',
																							' ',
																							(0,
																							emotion_react_jsx_runtime_browser_esm.tZ)(
																								'span',
																								{
																									css: (0,
																									emotion_react_browser_esm.iv)(
																										'cursor:pointer;color:',
																										_generated_palette
																											.palette
																											.brand[500],
																										';text-decoration:underline;',
																										'',
																									),
																									onClick:
																										() =>
																											setCallCentreNumbersVisibility(
																												!showCallCentreNumbers,
																											),
																									children:
																										'contact us',
																								},
																							),
																							'.',
																						],
																				},
																			),
																		showCallCentreNumbers &&
																			(0,
																			emotion_react_jsx_runtime_browser_esm.tZ)(
																				CallCenterEmailAndNumbers.K,
																				{},
																			),
																	],
																},
														  );
												},
												fetch: (0, productUtils.w)(
													productTypes.HP
														.subscriptions
														.allProductsProductTypeFilterString,
												),
												loadingMessage:
													'Loading delivery details...',
											},
										),
									},
							  )
							: status === Status.Confirmation &&
							  props.productDetail.subscription.contactId
							? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
									AsyncLoader.y,
									{
										render: () => {
											var _deliveryAddressConte10;
											return (0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												emotion_react_jsx_runtime_browser_esm.HY,
												{
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'div',
															{
																css: (0,
																emotion_react_browser_esm.iv)(
																	'padding:',
																	space.D[3],
																	'px;',
																	mq.Dp
																		.tablet,
																	'{padding:',
																	space.D[5],
																	'px;}',
																	'',
																),
																children: (0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	DeliveryAddressConfirmation.k,
																	{
																		additionalCss:
																			DeliveryAddressStep_ref,
																		message:
																			'We have successfully updated your delivery details for your subscription'.concat(
																				deliveryAddressContext.productsAffected &&
																					deliveryAddressContext
																						.productsAffected
																						.length >
																						1 &&
																					's',
																				'. You will shortly receive a confirmation email.',
																			),
																	},
																),
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															ReadOnlyAddressDisplay,
															{
																address:
																	newAddress,
																instructions:
																	(props.enableDeliveryInstructions &&
																		(null ===
																			(_deliveryAddressConte10 =
																				deliveryAddressContext.address) ||
																		void 0 ===
																			_deliveryAddressConte10
																			? void 0
																			: _deliveryAddressConte10.instructions)) ||
																	void 0,
															},
														),
													],
												},
											);
										},
										fetch: (0, deliveryAddressApi.o)(
											DeliveryAddressStep_objectSpread(
												DeliveryAddressStep_objectSpread(
													{},
													newAddress,
												),
												{},
												{ addressChangeInformation },
											),
											props.productDetail.subscription
												.contactId,
										),
										readerOnOK: (resp) => resp.text(),
										loadingMessage:
											'Updating delivery address details...',
									},
							  )
							: (0, emotion_react_jsx_runtime_browser_esm.BX)(
									emotion_react_jsx_runtime_browser_esm.HY,
									{
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												ReadOnlyAddressDisplay,
												{
													showEditButton:
														!isNationalDelivery,
													editButtonCallback: () => {
														props.setAddressValidationState(
															!1,
														),
															setStatus(
																Status.Edit,
															);
													},
													address: newAddress,
													instructions:
														(props.enableDeliveryInstructions &&
															(null ===
																(_deliveryAddressConte11 =
																	deliveryAddressContext.address) ||
															void 0 ===
																_deliveryAddressConte11
																? void 0
																: _deliveryAddressConte11.instructions)) ||
														void 0,
												},
											),
											isNationalDelivery &&
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'div',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															'padding:',
															space.D[2],
															'px;',
															'',
														),
														children: (0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															CallCentrePrompt.r,
															{},
														),
													},
												),
										],
									},
							  );
					};
				try {
					(DeliveryAddressStep.displayName = 'DeliveryAddressStep'),
						(DeliveryAddressStep.__docgenInfo = {
							description: '',
							displayName: 'DeliveryAddressStep',
							props: {
								productDetail: {
									defaultValue: null,
									description: '',
									name: 'productDetail',
									required: !0,
									type: { name: 'ProductDetail' },
								},
								enableDeliveryInstructions: {
									defaultValue: null,
									description: '',
									name: 'enableDeliveryInstructions',
									required: !0,
									type: { name: 'boolean' },
								},
								setAddressValidationState: {
									defaultValue: null,
									description: '',
									name: 'setAddressValidationState',
									required: !0,
									type: {
										name: 'Dispatch<SetStateAction<boolean>>',
									},
								},
							},
						}),
						'undefined' != typeof STORYBOOK_REACT_CLASSES &&
							(STORYBOOK_REACT_CLASSES[
								'client/components/mma/delivery/records/DeliveryAddressStep.tsx#DeliveryAddressStep'
							] = {
								docgenInfo: DeliveryAddressStep.__docgenInfo,
								name: 'DeliveryAddressStep',
								path: 'client/components/mma/delivery/records/DeliveryAddressStep.tsx#DeliveryAddressStep',
							});
				} catch (__react_docgen_typescript_loader_error) {}
				var DeliveryRecordInstructions = (props) => {
					var [showFullinstructions, setShowFullinstructions] = (0,
					react.useState)(!1);
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						'div',
						{
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'p',
									{
										css: (0, emotion_react_browser_esm.iv)(
											'margin:0;',
											mq.Dp.tablet,
											'{width:240px;}',
											'',
										),
										children:
											props.message.length > 33 &&
											!showFullinstructions
												? ''.concat(
														props.message.substring(
															0,
															33,
														),
														'...',
												  )
												: props.message,
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'span',
									{
										css: (0, emotion_react_browser_esm.iv)(
											'display:',
											props.message.length > 33
												? 'block'
												: 'none',
											';text-align:left;',
											typography.ggb,
											';color:',
											_generated_palette.palette
												.brand[500],
											';cursor:pointer;',
											'',
										),
										onClick: () => {
											setShowFullinstructions(
												!showFullinstructions,
											);
										},
										children: [
											'Read ',
											showFullinstructions
												? 'less'
												: 'more',
										],
									},
								),
							],
						},
					);
				};
				try {
					(DeliveryRecordInstructions.displayName =
						'DeliveryRecordInstructions'),
						(DeliveryRecordInstructions.__docgenInfo = {
							description: '',
							displayName: 'DeliveryRecordInstructions',
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
								'client/components/mma/delivery/records/DeliveryRecordInstructions.tsx#DeliveryRecordInstructions'
							] = {
								docgenInfo:
									DeliveryRecordInstructions.__docgenInfo,
								name: 'DeliveryRecordInstructions',
								path: 'client/components/mma/delivery/records/DeliveryRecordInstructions.tsx#DeliveryRecordInstructions',
							});
				} catch (__react_docgen_typescript_loader_error) {}
				var DeliveryRecordsAddress_ref = {
						name: '9o8mqh',
						styles: 'list-style-type:none;padding:0;margin:0;text-align:left',
					},
					RecordAddress = (props) => {
						var _COUNTRIES$find,
							[showAddress, setShowAddress] = (0, react.useState)(
								!1,
							);
						return (0, emotion_react_jsx_runtime_browser_esm.BX)(
							'div',
							{
								css: (0, emotion_react_browser_esm.iv)(
									mq.Dp.tablet,
									'{min-width:20ch;}',
									'',
								),
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'div',
										{
											css: (0,
											emotion_react_browser_esm.iv)(
												mq.Dp.tablet,
												'{display:flex;flex-direction:column-reverse;}',
												'',
											),
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'span',
													{
														children:
															props.postcode,
													},
												),
												showAddress &&
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'ul',
														{
															css: DeliveryRecordsAddress_ref,
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'li',
																	{
																		children:
																			props.addressLine1,
																	},
																),
																props.addressLine2 &&
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'li',
																		{
																			children:
																				props.addressLine2,
																		},
																	),
																props.town &&
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'li',
																		{
																			children:
																				props.town,
																		},
																	),
																props.region &&
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'li',
																		{
																			children:
																				props.region,
																		},
																	),
																props.country &&
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'li',
																		{
																			children:
																				(null ===
																					(_COUNTRIES$find =
																						models.od.find(
																							(
																								country,
																							) =>
																								props.country ===
																								country.iso,
																						)) ||
																				void 0 ===
																					_COUNTRIES$find
																					? void 0
																					: _COUNTRIES$find.name) ||
																				props.country,
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
										'span',
										{
											css: (0,
											emotion_react_browser_esm.iv)(
												'display:block;text-align:left;',
												typography.ggb,
												';color:',
												_generated_palette.palette
													.brand[500],
												';font-style:normal;text-decoration:underline;cursor:pointer;',
												'',
											),
											onClick: () => {
												setShowAddress(!showAddress);
											},
											children: [
												'Show ',
												showAddress ? 'less' : 'more',
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'i',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															'display:inline-block;width:6px;height:6px;margin-left:6px;margin-bottom:',
															showAddress
																? -1
																: 2,
															'px;border-top:1px solid ',
															_generated_palette
																.palette
																.brand[500],
															';border-right:1px solid ',
															_generated_palette
																.palette
																.brand[500],
															';transform:rotate(',
															showAddress
																? -45
																: 135,
															'deg);',
															'',
														),
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
					(RecordAddress.displayName = 'RecordAddress'),
						(RecordAddress.__docgenInfo = {
							description: '',
							displayName: 'RecordAddress',
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
								'client/components/mma/delivery/records/DeliveryRecordsAddress.tsx#RecordAddress'
							] = {
								docgenInfo: RecordAddress.__docgenInfo,
								name: 'RecordAddress',
								path: 'client/components/mma/delivery/records/DeliveryRecordsAddress.tsx#RecordAddress',
							});
				} catch (__react_docgen_typescript_loader_error) {}
				var ErrorIcon = __webpack_require__(
					'./client/components/mma/shared/assets/ErrorIcon.tsx',
				);
				var HolidayStopIcon_ref = {
						name: '1yq3syn',
						styles: 'vertical-align:baseline',
					},
					HolidayStopIcon = () =>
						(0, emotion_react_jsx_runtime_browser_esm.BX)('svg', {
							width: '18',
							height: '18',
							viewBox: '0 0 18 18',
							fill: 'none',
							css: HolidayStopIcon_ref,
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'path',
									{
										d: 'M13 9C13 11.2091 11.2091 13 9 13C6.79086 13 5 11.2091 5 9C5 6.79086 6.79086 5 9 5C11.2091 5 13 6.79086 13 9Z',
										fill: '#F3C100',
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'path',
									{
										fillRule: 'evenodd',
										clipRule: 'evenodd',
										d: 'M17.9442 10.0082L14.9626 9.67585C14.9872 9.45501 15 9.22956 15 9C15 8.77044 14.9872 8.54499 14.9626 8.32415L17.9442 7.9918C17.9811 8.32277 18 8.65917 18 9C18 9.34083 17.9811 9.67723 17.9442 10.0082ZM16.0368 3.38844L13.6925 5.26039C13.4114 4.90842 13.0916 4.58857 12.7396 4.30752L14.6116 1.96321C15.1381 2.38363 15.6164 2.86192 16.0368 3.38844ZM10.0082 0.0558396L9.67585 3.03737C9.45501 3.01276 9.22956 3 9 3C8.77044 3 8.54499 3.01276 8.32415 3.03737L7.9918 0.0558395C8.32277 0.018945 8.65917 0 9 0C9.34083 0 9.67723 0.0189451 10.0082 0.0558396ZM3.38844 1.96321L5.26039 4.30752C4.90842 4.58857 4.58857 4.90842 4.30752 5.26039L1.96321 3.38844C2.38363 2.86192 2.86192 2.38363 3.38844 1.96321ZM0.0558396 7.9918C0.0189451 8.32277 0 8.65917 0 9C0 9.34083 0.018945 9.67723 0.0558395 10.0082L3.03737 9.67585C3.01276 9.45501 3 9.22956 3 9C3 8.77044 3.01276 8.54499 3.03737 8.32415L0.0558396 7.9918ZM1.96321 14.6116L4.30752 12.7396C4.58857 13.0916 4.90842 13.4114 5.26039 13.6925L3.38844 16.0368C2.86192 15.6164 2.38363 15.1381 1.96321 14.6116ZM7.9918 17.9442L8.32415 14.9626C8.54499 14.9872 8.77044 15 9 15C9.22956 15 9.45501 14.9872 9.67585 14.9626L10.0082 17.9442C9.67723 17.9811 9.34083 18 9 18C8.65917 18 8.32277 17.9811 7.9918 17.9442ZM14.6116 16.0368L12.7396 13.6925C13.0916 13.4114 13.4114 13.0916 13.6925 12.7396L16.0368 14.6116C15.6164 15.1381 15.1381 15.6164 14.6116 16.0368Z',
										fill: '#F3C100',
									},
								),
							],
						}),
					TickInCircle = __webpack_require__(
						'./client/components/mma/shared/assets/TickInCircle.tsx',
					);
				var DeliveryRecordStatus_ref = {
						name: '14fvduy',
						styles: 'position:absolute;top:0;left:0',
					},
					DeliveryRecordStatus_ref2 = {
						name: '14fvduy',
						styles: 'position:absolute;top:0;left:0',
					},
					DeliveryRecordStatus_ref3 = {
						name: '14fvduy',
						styles: 'position:absolute;top:0;left:0',
					},
					DeliveryRecordStatus_ref4 = {
						name: '14fvduy',
						styles: 'position:absolute;top:0;left:0',
					},
					RecordStatus = (props) => {
						var changesMessage = ''.concat(
							props.isChangedAddress ? 'Delivery address' : '',
						);
						return (
							props.isChangedAddress &&
								!props.isChangedDeliveryInstruction &&
								(changesMessage = ''.concat(
									changesMessage,
									' changed',
								)),
							props.isChangedDeliveryInstruction &&
								(changesMessage = ''
									.concat(changesMessage, ' ')
									.concat(
										props.isChangedAddress ? ' and d' : 'D',
										'elivery instructions changed',
									)),
							(0, emotion_react_jsx_runtime_browser_esm.BX)(
								emotion_react_jsx_runtime_browser_esm.HY,
								{
									children: [
										props.deliveryProblem &&
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'span',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														'display:block;font-weight:bold;padding-left:30px;position:relative;margin-bottom:',
														space.D[2],
														'px;',
														'',
													),
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'i',
															{
																css: DeliveryRecordStatus_ref4,
																children: (0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	ErrorIcon.P,
																	{},
																),
															},
														),
														'Problem reported (',
														(0, lodash.capitalize)(
															props.deliveryProblem,
														),
														')',
													],
												},
											),
										!props.deliveryProblem &&
											props.isDispatched &&
											!props.isHolidayStop &&
											!props.bulkSuspensionReason &&
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'span',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														'display:block;font-weight:bold;padding-left:30px;position:relative;margin-bottom:',
														space.D[2],
														'px;',
														'',
													),
													'data-cy':
														'delivery-status',
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'i',
															{
																css: DeliveryRecordStatus_ref3,
																children: (0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	TickInCircle.G,
																	{},
																),
															},
														),
														props.isFutureRecord
															? 'Scheduled'
															: 'Dispatched',
													],
												},
											),
										props.isHolidayStop &&
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												emotion_react_jsx_runtime_browser_esm.HY,
												{
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															'span',
															{
																css: (0,
																emotion_react_browser_esm.iv)(
																	'display:block;font-weight:bold;padding-left:30px;position:relative;margin-bottom:',
																	space.D[2],
																	'px;',
																	'',
																),
																children: [
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'i',
																		{
																			css: DeliveryRecordStatus_ref2,
																			children:
																				props.bulkSuspensionReason
																					? (0,
																					  emotion_react_jsx_runtime_browser_esm.tZ)(
																							ErrorIcon.P,
																							{
																								downgradeToWarning:
																									!0,
																							},
																					  )
																					: (0,
																					  emotion_react_jsx_runtime_browser_esm.tZ)(
																							HolidayStopIcon,
																							{},
																					  ),
																		},
																	),
																	props.bulkSuspensionReason
																		? 'Imposed suspension ('.concat(
																				props.bulkSuspensionReason,
																				')',
																		  )
																		: 'Holiday stop',
																],
															},
														),
														props.bulkSuspensionReason &&
															props.productName &&
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'p',
																{
																	children: [
																		'Unfortunately due to ',
																		props.bulkSuspensionReason,
																		', we are unable to deliver your ',
																		props.productName,
																		'. You will be credited for this issue off the subsequent payment.',
																	],
																},
															),
													],
												},
											),
										!props.isHolidayStop &&
											changesMessage &&
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'span',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														'display:block;font-weight:bold;padding-left:30px;position:relative;margin-bottom:',
														space.D[2],
														'px;',
														'',
													),
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'i',
															{
																css: DeliveryRecordStatus_ref,
																children: (0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	InfoIconDark.J,
																	{
																		fillColor:
																			_generated_palette
																				.palette
																				.brand[500],
																		size: 22,
																	},
																),
															},
														),
														changesMessage,
													],
												},
											),
									],
								},
							)
						);
					};
				try {
					(RecordStatus.displayName = 'RecordStatus'),
						(RecordStatus.__docgenInfo = {
							description: '',
							displayName: 'RecordStatus',
							props: {
								isDispatched: {
									defaultValue: null,
									description: '',
									name: 'isDispatched',
									required: !0,
									type: { name: 'boolean' },
								},
								isHolidayStop: {
									defaultValue: null,
									description: '',
									name: 'isHolidayStop',
									required: !0,
									type: { name: 'boolean' },
								},
								bulkSuspensionReason: {
									defaultValue: null,
									description: '',
									name: 'bulkSuspensionReason',
									required: !1,
									type: { name: 'string' },
								},
								productName: {
									defaultValue: null,
									description: '',
									name: 'productName',
									required: !1,
									type: { name: 'string' },
								},
								isChangedAddress: {
									defaultValue: null,
									description: '',
									name: 'isChangedAddress',
									required: !0,
									type: { name: 'boolean' },
								},
								isChangedDeliveryInstruction: {
									defaultValue: null,
									description: '',
									name: 'isChangedDeliveryInstruction',
									required: !0,
									type: { name: 'boolean' },
								},
								isFutureRecord: {
									defaultValue: null,
									description: '',
									name: 'isFutureRecord',
									required: !0,
									type: { name: 'boolean' },
								},
								deliveryProblem: {
									defaultValue: null,
									description: '',
									name: 'deliveryProblem',
									required: !0,
									type: { name: 'string | null' },
								},
							},
						}),
						'undefined' != typeof STORYBOOK_REACT_CLASSES &&
							(STORYBOOK_REACT_CLASSES[
								'client/components/mma/delivery/records/DeliveryRecordStatus.tsx#RecordStatus'
							] = {
								docgenInfo: RecordStatus.__docgenInfo,
								name: 'RecordStatus',
								path: 'client/components/mma/delivery/records/DeliveryRecordStatus.tsx#RecordStatus',
							});
				} catch (__react_docgen_typescript_loader_error) {}
				var DeliveryRecordCard_ref = {
						name: '1wcfv52',
						styles: 'margin-right:0',
					},
					DeliveryRecordCard_ref2 = {
						name: 'ad8wir',
						styles: 'position:relative;top:50%;transform:translateY(-50%)',
					},
					DeliveryRecordCard = (props) => {
						var _props$deliveryProble,
							dtCss = (ignoreMinWidthAtNonMobile) =>
								'\n\t\t'
									.concat(
										typography.Kz0,
										';\n        font-weight: bold;\n        display: inline-block;\n        vertical-align: top;\n        min-width: 10ch;\n        ',
									)
									.concat(
										mq.Dp.tablet,
										' {\n          margin-right: 16px;\n          ',
									)
									.concat(
										ignoreMinWidthAtNonMobile
											? 'min-width: 9ch;'
											: 'min-width: 12ch;',
										'\n        }\n    ',
									),
							ddCss = '\n\t\t'.concat(
								typography.Kz0,
								';\n        display: inline-block;\n        vertical-align: top;\n        margin-left: 0;\n    ',
							),
							recordRowCss =
								'\n        margin-bottom: 10px;\n    ';
						return (0, emotion_react_jsx_runtime_browser_esm.BX)(
							'dl',
							{
								css: (0, emotion_react_browser_esm.iv)(
									'border:1px solid ',
									_generated_palette.palette.neutral[86],
									';margin:0;padding:',
									space.D[3],
									'px;',
									props.pageStatus ===
										PageStatus.ReportIssueStep2 &&
										'padding-left: '.concat(
											2 * space.D[3] + 40,
											'px;',
										),
									' width:100%;',
									props.listIndex > 0 && 'border-top: none;',
									' position:relative;opacity:',
									props.pageStatus ===
										PageStatus.ReportIssueStep1
										? '0.5'
										: '1',
									';',
									mq.Dp.tablet,
									'{padding:',
									space.D[5],
									'px;',
									props.pageStatus ===
										PageStatus.ReportIssueStep2 &&
										'padding-left: '.concat(
											2 * space.D[5] + 40,
											'px;',
										),
									';}',
									'',
								),
								children: [
									props.pageStatus ===
										PageStatus.ReportIssueStep2 &&
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'div',
											{
												css: (0,
												emotion_react_browser_esm.iv)(
													'position:absolute;top:0;left:0;height:100%;padding:0 ',
													space.D[3],
													'px;border-right:1px solid ',
													_generated_palette.palette
														.neutral[86],
													';',
													mq.Dp.tablet,
													'{padding:0 18px;}',
													'',
												),
												children: (0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													CheckboxGroup.c,
													{
														name: props
															.deliveryRecord.id,
														cssOverrides:
															DeliveryRecordCard_ref2,
														children: (0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															Checkbox.X,
															{
																value: props
																	.deliveryRecord
																	.id,
																checked:
																	props.isChecked,
																label: '',
																cssOverrides:
																	DeliveryRecordCard_ref,
																onChange: (
																	event,
																) => {
																	var _props$addRecordToDel,
																		_props$removeRecordFr;
																	event.target
																		.checked
																		? null ===
																				(_props$addRecordToDel =
																					props.addRecordToDeliveryProblem) ||
																		  void 0 ===
																				_props$addRecordToDel ||
																		  _props$addRecordToDel.call(
																				props,
																				props
																					.deliveryRecord
																					.id,
																		  )
																		: null ===
																				(_props$removeRecordFr =
																					props.removeRecordFromDeliveryProblem) ||
																		  void 0 ===
																				_props$removeRecordFr ||
																		  _props$removeRecordFr.call(
																				props,
																				props
																					.deliveryRecord
																					.id,
																		  );
																},
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
												recordRowCss,
												' ',
												mq.Dp.tablet,
												'{display:inline-block;width:50%;}',
												'',
											),
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'dt',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															dtCss(),
															';',
															'',
														),
														children: 'Issue date:',
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'dd',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															ddCss,
															';',
															'',
														),
														children: (0, dates.sG)(
															props.deliveryRecord
																.deliveryDate,
														).dateStr(),
													},
												),
											],
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'div',
										{
											css: (0,
											emotion_react_browser_esm.iv)(
												recordRowCss,
												' ',
												mq.Dp.tablet,
												'{display:inline-block;width:50%;}',
												'',
											),
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'dt',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															dtCss(!0),
															';',
															'',
														),
														children: 'Address:',
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'dd',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															ddCss,
															';',
															'',
														),
														'data-qm-masking':
															'blocklist',
														children:
															props.deliveryRecord
																.addressLine1 &&
															!props
																.deliveryRecord
																.hasHolidayStop
																? (0,
																  emotion_react_jsx_runtime_browser_esm.tZ)(
																		RecordAddress,
																		{
																			addressLine1:
																				props
																					.deliveryRecord
																					.addressLine1,
																			addressLine2:
																				props
																					.deliveryRecord
																					.addressLine2,
																			town: props
																				.deliveryRecord
																				.addressTown,
																			postcode:
																				props
																					.deliveryRecord
																					.addressPostcode,
																			country:
																				props
																					.deliveryRecord
																					.addressCountry,
																		},
																  )
																: '-',
													},
												),
											],
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'div',
										{
											css: (0,
											emotion_react_browser_esm.iv)(
												recordRowCss,
												';',
												'',
											),
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'dt',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															dtCss(),
															';',
															'',
														),
														children: 'Status:',
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'dd',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															ddCss,
															' width:calc(100% - 11ch);',
															mq.Dp.tablet,
															'{width:calc(100% - (13ch + 16px));}',
															'',
														),
														children: (0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															RecordStatus,
															{
																isDispatched:
																	!!props
																		.deliveryRecord
																		.addressLine1,
																isHolidayStop:
																	!!props
																		.deliveryRecord
																		.hasHolidayStop,
																bulkSuspensionReason:
																	props
																		.deliveryRecord
																		.bulkSuspensionReason,
																productName:
																	props.productName,
																isChangedAddress:
																	!!props
																		.deliveryRecord
																		.isChangedAddress,
																isChangedDeliveryInstruction:
																	!!props
																		.deliveryRecord
																		.isChangedDeliveryInstruction,
																isFutureRecord:
																	(0,
																	dates.Kn)(
																		(0,
																		dates.sG)(
																			props
																				.deliveryRecord
																				.deliveryDate,
																		).date,
																		new Date(
																			new Date().setHours(
																				23,
																				59,
																				59,
																				999,
																			),
																		),
																	),
																deliveryProblem:
																	(props
																		.deliveryRecord
																		.problemCaseId &&
																		(null ===
																			(_props$deliveryProble =
																				props
																					.deliveryProblemMap[
																					props
																						.deliveryRecord
																						.problemCaseId
																				]) ||
																		void 0 ===
																			_props$deliveryProble
																			? void 0
																			: _props$deliveryProble.problemType)) ||
																	null,
															},
														),
													},
												),
											],
										},
									),
									props.deliveryRecord.problemCaseId &&
										props.deliveryRecord.credit &&
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											emotion_react_jsx_runtime_browser_esm.HY,
											{
												children: (0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'div',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															recordRowCss,
															' margin-top:10px;',
															'',
														),
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'dt',
																{
																	css: (0,
																	emotion_react_browser_esm.iv)(
																		dtCss(),
																		';',
																		'',
																	),
																	children:
																		'Credit:',
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'dd',
																{
																	css: (0,
																	emotion_react_browser_esm.iv)(
																		ddCss,
																		' width:calc(100% - 11ch);',
																		mq.Dp
																			.tablet,
																		'{width:calc(100% - (13ch + 16px));}',
																		'',
																	),
																	children: [
																		''
																			.concat(
																				props.recordCurrency,
																			)
																			.concat(
																				Math.abs(
																					props
																						.deliveryRecord
																						.credit
																						.amount,
																				).toFixed(
																					2,
																				),
																				' ',
																			),
																		props
																			.deliveryRecord
																			.credit
																			.invoiceDate &&
																			(0,
																			emotion_react_jsx_runtime_browser_esm.tZ)(
																				'p',
																				{
																					css: (0,
																					emotion_react_browser_esm.iv)(
																						'color:',
																						_generated_palette
																							.palette
																							.neutral[60],
																						';margin:0;',
																						mq
																							.Dp
																							.tablet,
																						'{display:inline-block;}',
																						'',
																					),
																					children:
																						'off your '.concat(
																							(0,
																							dates.sG)(
																								props
																									.deliveryRecord
																									.credit
																									.invoiceDate,
																							).dateStr(),
																							' payment',
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
									props.showDeliveryInstructions &&
										(0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											'div',
											{
												css: (0,
												emotion_react_browser_esm.iv)(
													recordRowCss,
													';',
													'',
												),
												children: [
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'dt',
														{
															css: (0,
															emotion_react_browser_esm.iv)(
																dtCss(),
																';',
																'',
															),
															children:
																'Instructions:',
														},
													),
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'dd',
														{
															css: (0,
															emotion_react_browser_esm.iv)(
																ddCss,
																';',
																'',
															),
															children:
																props
																	.deliveryRecord
																	.deliveryInstruction &&
																!props
																	.deliveryRecord
																	.hasHolidayStop
																	? (0,
																	  emotion_react_jsx_runtime_browser_esm.tZ)(
																			DeliveryRecordInstructions,
																			{
																				message:
																					props
																						.deliveryRecord
																						.deliveryInstruction,
																			},
																	  )
																	: 'N/A',
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
					(DeliveryRecordCard.displayName = 'DeliveryRecordCard'),
						(DeliveryRecordCard.__docgenInfo = {
							description: '',
							displayName: 'DeliveryRecordCard',
							props: {
								deliveryRecord: {
									defaultValue: null,
									description: '',
									name: 'deliveryRecord',
									required: !0,
									type: { name: 'DeliveryRecordDetail' },
								},
								listIndex: {
									defaultValue: null,
									description: '',
									name: 'listIndex',
									required: !0,
									type: { name: 'number' },
								},
								pageStatus: {
									defaultValue: null,
									description: '',
									name: 'pageStatus',
									required: !0,
									type: {
										name: 'enum',
										value: [
											{ value: '0' },
											{ value: '1' },
											{ value: '2' },
											{ value: '3' },
											{ value: '4' },
											{ value: '5' },
										],
									},
								},
								deliveryProblemMap: {
									defaultValue: null,
									description: '',
									name: 'deliveryProblemMap',
									required: !0,
									type: { name: 'DeliveryProblemMap' },
								},
								productName: {
									defaultValue: null,
									description: '',
									name: 'productName',
									required: !1,
									type: { name: 'string' },
								},
								recordCurrency: {
									defaultValue: null,
									description: '',
									name: 'recordCurrency',
									required: !1,
									type: { name: 'string' },
								},
								isChecked: {
									defaultValue: null,
									description: '',
									name: 'isChecked',
									required: !1,
									type: { name: 'boolean' },
								},
								showDeliveryInstructions: {
									defaultValue: null,
									description: '',
									name: 'showDeliveryInstructions',
									required: !1,
									type: { name: 'boolean' },
								},
								addRecordToDeliveryProblem: {
									defaultValue: null,
									description: '',
									name: 'addRecordToDeliveryProblem',
									required: !1,
									type: { name: '((id: string) => void)' },
								},
								removeRecordFromDeliveryProblem: {
									defaultValue: null,
									description: '',
									name: 'removeRecordFromDeliveryProblem',
									required: !1,
									type: { name: '((id: string) => void)' },
								},
							},
						}),
						'undefined' != typeof STORYBOOK_REACT_CLASSES &&
							(STORYBOOK_REACT_CLASSES[
								'client/components/mma/delivery/records/DeliveryRecordCard.tsx#DeliveryRecordCard'
							] = {
								docgenInfo: DeliveryRecordCard.__docgenInfo,
								name: 'DeliveryRecordCard',
								path: 'client/components/mma/delivery/records/DeliveryRecordCard.tsx#DeliveryRecordCard',
							});
				} catch (__react_docgen_typescript_loader_error) {}
				var NavConfig = __webpack_require__(
						'./client/components/shared/nav/NavConfig.tsx',
					),
					Page = __webpack_require__(
						'./client/components/mma/Page.tsx',
					),
					utilities_fetch = __webpack_require__(
						'./client/utilities/fetch.ts',
					);
				class DeliveryRecordsApiAsyncLoader extends AsyncLoader.y {}
				var createDeliveryRecordsFetcher =
						(subscriptionId, isTestUser) => () =>
							(0, utilities_fetch.n4)(
								'/api/delivery-records/'.concat(subscriptionId),
								{
									headers: {
										[productResponse.l2]: ''.concat(
											isTestUser,
										),
									},
								},
							),
					createDeliveryRecordsProblemPost =
						(subscriptionId, isTestUser, payload) => () =>
							fetch(
								'/api/delivery-records/'.concat(subscriptionId),
								{
									credentials: 'include',
									method: 'POST',
									body: JSON.stringify(payload),
									headers: {
										'Content-Type': 'application/json',
										[productResponse.l2]: ''.concat(
											isTestUser,
										),
									},
								},
							),
					checkForExistingDeliveryProblem = (records) =>
						records.findIndex((deliveryRecord) => {
							var recordDateEpoch = (0, dates.sG)(
									deliveryRecord.deliveryDate,
								).date.valueOf(),
								startOfToday = new Date(
									new Date().setHours(0, 0, 0, 0),
								),
								fourteenDaysAgoEpoch = (0, dates.W4)(
									startOfToday,
									-14,
								).valueOf();
							return (
								deliveryRecord.problemCaseId &&
								recordDateEpoch >= fourteenDaysAgoEpoch
							);
						}) > -1,
					DeliveryRecordsContainer = (props) => {
						var routerState = (0, react_router.TH)().state,
							productDetail =
								null == routerState
									? void 0
									: routerState.productDetail;
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							Page._,
							{
								selectedNavItem: NavConfig.qy.accountOverview,
								pageTitle: 'Delivery history',
								children: productDetail
									? (0,
									  emotion_react_jsx_runtime_browser_esm.tZ)(
											DeliveryRecordsApiAsyncLoader,
											{
												render: renderContextAndOutletContainer(
													props.productType,
													productDetail,
												),
												fetch: createDeliveryRecordsFetcher(
													productDetail.subscription
														.subscriptionId,
													productDetail.isTestUser,
												),
												loadingMessage:
													'Loading delivery history...',
											},
									  )
									: (0,
									  emotion_react_jsx_runtime_browser_esm.tZ)(
											productResponse.wH,
											{
												fetch: (0, productUtils.w)(
													props.productType
														.allProductsProductTypeFilterString,
												),
												render: handleMembersDataResponse(
													props.productType,
												),
												loadingMessage:
													'Retrieving details of your '.concat(
														props.productType
															.friendlyName,
														'...',
													),
											},
									  ),
							},
						);
					},
					handleMembersDataResponse =
						(productType) => (mdapiResponse) => {
							var filteredProductDetails =
								mdapiResponse.products.filter(
									productResponse.v_,
								);
							if (1 === filteredProductDetails.length) {
								var productDetail = filteredProductDetails[0];
								return (0,
								emotion_react_jsx_runtime_browser_esm.tZ)(
									DeliveryRecordsApiAsyncLoader,
									{
										render: renderContextAndOutletContainer(
											productType,
											productDetail,
										),
										fetch: createDeliveryRecordsFetcher(
											productDetail.subscription
												.subscriptionId,
											productDetail.isTestUser,
										),
										loadingMessage:
											'Loading delivery history...',
									},
								);
							}
							return (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								react_router.Fg,
								{ to: '/' },
							);
						},
					DeliveryRecordsContext = (0, react.createContext)({}),
					renderContextAndOutletContainer =
						(productType, productDetail) => (data) =>
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								DeliveryRecordsContext.Provider,
								{
									value: { productType, productDetail, data },
									children: (0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										react_router.j3,
										{},
									),
								},
							);
				try {
					(checkForExistingDeliveryProblem.displayName =
						'checkForExistingDeliveryProblem'),
						(checkForExistingDeliveryProblem.__docgenInfo = {
							description: '',
							displayName: 'checkForExistingDeliveryProblem',
							props: {},
						}),
						'undefined' != typeof STORYBOOK_REACT_CLASSES &&
							(STORYBOOK_REACT_CLASSES[
								'client/components/mma/delivery/records/DeliveryRecordsContainer.tsx#checkForExistingDeliveryProblem'
							] = {
								docgenInfo:
									checkForExistingDeliveryProblem.__docgenInfo,
								name: 'checkForExistingDeliveryProblem',
								path: 'client/components/mma/delivery/records/DeliveryRecordsContainer.tsx#checkForExistingDeliveryProblem',
							});
				} catch (__react_docgen_typescript_loader_error) {}
				try {
					(DeliveryRecordsContainer.displayName =
						'DeliveryRecordsContainer'),
						(DeliveryRecordsContainer.__docgenInfo = {
							description: '',
							displayName: 'DeliveryRecordsContainer',
							props: {
								productType: {
									defaultValue: null,
									description: '',
									name: 'productType',
									required: !0,
									type: {
										name: 'ProductTypeWithDeliveryRecordsProperties',
									},
								},
							},
						}),
						'undefined' != typeof STORYBOOK_REACT_CLASSES &&
							(STORYBOOK_REACT_CLASSES[
								'client/components/mma/delivery/records/DeliveryRecordsContainer.tsx#DeliveryRecordsContainer'
							] = {
								docgenInfo:
									DeliveryRecordsContainer.__docgenInfo,
								name: 'DeliveryRecordsContainer',
								path: 'client/components/mma/delivery/records/DeliveryRecordsContainer.tsx#DeliveryRecordsContainer',
							});
				} catch (__react_docgen_typescript_loader_error) {}
				var DeliveryRecordsPaginationNav_ref = {
						name: 'dz9cv9',
						styles: 'position:absolute;top:4px;left:4px;width:calc(100% - 8px);height:calc(100% - 8px);background-color:#666;border-radius:50%;display:none',
					},
					DeliveryRecordsPaginationNav_ref2 = {
						name: 'vqbcaz',
						styles: 'text-align:center;list-style:none;padding:0;margin:30px 0;width:100%;li+li{margin-left:10px;}',
					},
					PaginationNav = (props) => {
						var totalNumberOfPages = Math.ceil(
							props.totalNumberOfResults / props.resultsPerPage,
						);
						return (0, emotion_react_jsx_runtime_browser_esm.BX)(
							emotion_react_jsx_runtime_browser_esm.HY,
							{
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'ul',
										{
											css: DeliveryRecordsPaginationNav_ref2,
											children: Array(totalNumberOfPages)
												.fill(null)
												.map((_, pagesArrIndex) =>
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'li',
														{
															css: (0,
															emotion_react_browser_esm.iv)(
																typography.Kz0,
																';text-align:center;display:inline-block;position:relative;height:22px;line-height:22px;border-bottom:1px solid #767676;padding:0 0 1px 0;cursor:pointer;',
																pagesArrIndex ===
																	props.currentPage &&
																	'\n              cursor: default;\n              width: 28px;\n              height: 28px;\n              line-height: 28px;\n              border-radius: 50%;\n              background-color: #007ABC;\n              color: #ffffff;\n            ',
																';',
																'',
															),
															onClick: () => {
																props.setCurrentPage(
																	pagesArrIndex,
																),
																	props.changeCallBack();
															},
															children: [
																pagesArrIndex +
																	1,
																pagesArrIndex ===
																	props.currentPage &&
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'div',
																		{
																			css: DeliveryRecordsPaginationNav_ref,
																		},
																	),
															],
														},
														'deliveryRecordsNavItem-'.concat(
															pagesArrIndex,
														),
													),
												),
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'span',
										{
											css: (0,
											emotion_react_browser_esm.iv)(
												typography.Kz0,
												';color:#767676;display:block;width:100%;margin-top:21px;text-align:center;',
												'',
											),
											children: 'Displaying '
												.concat(
													props.currentPage *
														props.resultsPerPage +
														1,
													' - ',
												)
												.concat(
													Math.min(
														props.currentPage *
															props.resultsPerPage +
															props.resultsPerPage,
														props.totalNumberOfResults,
													),
													' of ',
												)
												.concat(
													props.totalNumberOfResults,
													' deliveries',
												),
										},
									),
								],
							},
						);
					};
				try {
					(PaginationNav.displayName = 'PaginationNav'),
						(PaginationNav.__docgenInfo = {
							description: '',
							displayName: 'PaginationNav',
							props: {
								resultsPerPage: {
									defaultValue: null,
									description: '',
									name: 'resultsPerPage',
									required: !0,
									type: { name: 'number' },
								},
								totalNumberOfResults: {
									defaultValue: null,
									description: '',
									name: 'totalNumberOfResults',
									required: !0,
									type: { name: 'number' },
								},
								currentPage: {
									defaultValue: null,
									description: '',
									name: 'currentPage',
									required: !0,
									type: { name: 'number' },
								},
								setCurrentPage: {
									defaultValue: null,
									description: '',
									name: 'setCurrentPage',
									required: !0,
									type: {
										name: 'Dispatch<SetStateAction<number>>',
									},
								},
								changeCallBack: {
									defaultValue: null,
									description: '',
									name: 'changeCallBack',
									required: !0,
									type: { name: 'PaginationChangeCallBack' },
								},
							},
						}),
						'undefined' != typeof STORYBOOK_REACT_CLASSES &&
							(STORYBOOK_REACT_CLASSES[
								'client/components/mma/delivery/records/DeliveryRecordsPaginationNav.tsx#PaginationNav'
							] = {
								docgenInfo: PaginationNav.__docgenInfo,
								name: 'PaginationNav',
								path: 'client/components/mma/delivery/records/DeliveryRecordsPaginationNav.tsx#PaginationNav',
							});
				} catch (__react_docgen_typescript_loader_error) {}
				var RadioGroup = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/radio/RadioGroup.js',
					),
					Radio = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/radio/Radio.js',
					);
				function DeliveryRecordsProblemForm_ownKeys(e, r) {
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
				function DeliveryRecordsProblemForm_objectSpread(e) {
					for (var r = 1; r < arguments.length; r++) {
						var t = null != arguments[r] ? arguments[r] : {};
						r % 2
							? DeliveryRecordsProblemForm_ownKeys(
									Object(t),
									!0,
							  ).forEach(function (r) {
									DeliveryRecordsProblemForm_defineProperty(
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
							: DeliveryRecordsProblemForm_ownKeys(
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
				function DeliveryRecordsProblemForm_defineProperty(
					obj,
					key,
					value,
				) {
					return (
						(key =
							(function DeliveryRecordsProblemForm_toPropertyKey(
								arg,
							) {
								var key =
									(function DeliveryRecordsProblemForm_toPrimitive(
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
											if ('object' != typeof res)
												return res;
											throw new TypeError(
												'@@toPrimitive must return a primitive value.',
											);
										}
										return (
											'string' === hint ? String : Number
										)(input);
									})(arg, 'string');
								return 'symbol' == typeof key
									? key
									: String(key);
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
				var DeliveryRecordsProblemForm_ref = {
						name: 'qamjgr',
						styles: 'margin-right:4px',
					},
					DeliveryRecordsProblemForm_ref2 = {
						name: 'w2iqra',
						styles: 'vertical-align:top;text-transform:lowercase;:checked+div label:first-of-type{font-weight:bold;}',
					},
					DeliveryRecordsProblemForm_ref3 = {
						name: '4zleql',
						styles: 'display:block',
					},
					DeliveryRecordProblemForm = (props) => {
						var [
								selectedDeliveryProblem,
								setSelectedDeliveryProblem,
							] = (0, react.useState)(null),
							{ problemTypes, updateValidationStatusCallback } =
								props;
						return (
							(0, react.useEffect)(() => {
								var validateDetails = (() => {
									if (selectedDeliveryProblem) {
										var deliveryProblem = problemTypes.find(
												(issue) =>
													issue.label ===
													(null ==
													selectedDeliveryProblem
														? void 0
														: selectedDeliveryProblem.value),
											),
											_isValid = !(
												null != deliveryProblem &&
												deliveryProblem.messageIsMandatory &&
												(null ==
													selectedDeliveryProblem ||
													!selectedDeliveryProblem.message)
											);
										return DeliveryRecordsProblemForm_objectSpread(
											{ isValid: _isValid },
											!_isValid && {
												message:
													'Step 1: Please complete the required field.',
											},
										);
									}
									return {
										isValid: !1,
										message:
											'Please select the type of problem',
									};
								})();
								updateValidationStatusCallback(
									validateDetails.isValid,
									validateDetails.message,
								);
							}, [selectedDeliveryProblem]),
							(0, emotion_react_jsx_runtime_browser_esm.BX)(
								'form',
								{
									onSubmit: (event) => {
										var _props$onFormSubmit;
										event.preventDefault(),
											null ===
												(_props$onFormSubmit =
													props.onFormSubmit) ||
												void 0 ===
													_props$onFormSubmit ||
												_props$onFormSubmit.call(
													props,
													null ==
														selectedDeliveryProblem
														? void 0
														: selectedDeliveryProblem.value,
													null ==
														selectedDeliveryProblem
														? void 0
														: selectedDeliveryProblem.message,
												);
									},
									children: [
										(0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											'fieldset',
											{
												onChange: (event) => {
													var target = event.target;
													if (
														'radio' === target.type
													) {
														var deliveryProblemObj =
															{
																value: target.value,
															};
														setSelectedDeliveryProblem(
															deliveryProblemObj,
														),
															props.updateRadioSelectionCallback(
																target.value,
															);
													} else
														'textarea' ===
															target.type &&
															selectedDeliveryProblem &&
															setSelectedDeliveryProblem(
																DeliveryRecordsProblemForm_objectSpread(
																	DeliveryRecordsProblemForm_objectSpread(
																		{},
																		selectedDeliveryProblem,
																	),
																	{},
																	{
																		message:
																			target.value,
																	},
																),
															);
												},
												css: (0,
												emotion_react_browser_esm.iv)(
													'border:1px solid ',
													_generated_palette.palette
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
																space.D[3],
																'px;float:left;background-color:',
																_generated_palette
																	.palette
																	.neutral[97],
																';border-bottom:1px solid ',
																_generated_palette
																	.palette
																	.neutral[86],
																';',
																typography.Rcn,
																';',
																mq.Dp.tablet,
																'{padding:',
																space.D[3],
																'px ',
																space.D[5],
																'px;}',
																'',
															),
															children:
																'Step 1. What type of problem are you experiencing?',
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
																DeliveryRecordsProblemForm_ref3,
															children: (0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'ul',
																{
																	css: (0,
																	emotion_react_browser_esm.iv)(
																		'list-style:none;padding:',
																		space
																			.D[3],
																		'px;margin:0;clear:left;',
																		mq.Dp
																			.tablet,
																		'{padding:',
																		space
																			.D[5],
																		'px;}',
																		'',
																	),
																	children:
																		problemTypes.map(
																			(
																				deliveryProblemRadioOption,
																				index,
																			) =>
																				(0,
																				emotion_react_jsx_runtime_browser_esm.BX)(
																					'li',
																					{
																						css: (0,
																						emotion_react_browser_esm.iv)(
																							typography.Kz0,
																							';',
																							'',
																						),
																						children:
																							[
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									Radio.Y,
																									{
																										name: 'delivery-problem',
																										value: deliveryProblemRadioOption.label,
																										label: (0,
																										lodash.capitalize)(
																											deliveryProblemRadioOption.label,
																										),
																										cssOverrides:
																											DeliveryRecordsProblemForm_ref2,
																									},
																								),
																								(null ==
																								selectedDeliveryProblem
																									? void 0
																									: selectedDeliveryProblem.value) ===
																									deliveryProblemRadioOption.label &&
																									(0,
																									emotion_react_jsx_runtime_browser_esm.tZ)(
																										'div',
																										{
																											css: (0,
																											emotion_react_browser_esm.iv)(
																												'display:inline-block;margin-left:32px;width:calc(100% - 32px);',
																												mq
																													.Dp
																													.tablet,
																												'{width:auto;display:block;}',
																												'',
																											),
																											children:
																												(0,
																												emotion_react_jsx_runtime_browser_esm.BX)(
																													emotion_react_jsx_runtime_browser_esm.HY,
																													{
																														children:
																															[
																																(0,
																																emotion_react_jsx_runtime_browser_esm.BX)(
																																	'label',
																																	{
																																		htmlFor:
																																			'issue1Message',
																																		css: (0,
																																		emotion_react_browser_esm.iv)(
																																			'display:block;color:',
																																			_generated_palette
																																				.palette
																																				.neutral[46],
																																			';',
																																			'',
																																		),
																																		children:
																																			[
																																				'Please specify',
																																				(0,
																																				emotion_react_jsx_runtime_browser_esm.tZ)(
																																					'span',
																																					{
																																						css: (0,
																																						emotion_react_browser_esm.iv)(
																																							typography.ggb,
																																							';',
																																							'',
																																						),
																																						children:
																																							!deliveryProblemRadioOption.messageIsMandatory &&
																																							' (Optional)',
																																					},
																																				),
																																				props.inValidationState &&
																																					deliveryProblemRadioOption.messageIsMandatory &&
																																					!selectedDeliveryProblem.message &&
																																					(0,
																																					emotion_react_jsx_runtime_browser_esm.BX)(
																																						'span',
																																						{
																																							css: (0,
																																							emotion_react_browser_esm.iv)(
																																								'display:block;color:',
																																								_generated_palette
																																									.palette
																																									.error[400],
																																								';',
																																								'',
																																							),
																																							children:
																																								[
																																									(0,
																																									emotion_react_jsx_runtime_browser_esm.tZ)(
																																										'i',
																																										{
																																											css: DeliveryRecordsProblemForm_ref,
																																											children:
																																												(0,
																																												emotion_react_jsx_runtime_browser_esm.tZ)(
																																													ErrorIcon.P,
																																													{},
																																												),
																																										},
																																									),
																																									'This detail is required',
																																								],
																																						},
																																					),
																																			],
																																	},
																																),
																																(0,
																																emotion_react_jsx_runtime_browser_esm.tZ)(
																																	'textarea',
																																	{
																																		id: 'issue1Message',
																																		name: 'message',
																																		rows: 2,
																																		css: (0,
																																		emotion_react_browser_esm.iv)(
																																			'border:',
																																			props.inValidationState &&
																																				deliveryProblemRadioOption.messageIsMandatory &&
																																				!selectedDeliveryProblem.message
																																				? '4'
																																				: '2',
																																			'px solid ',
																																			props.inValidationState &&
																																				deliveryProblemRadioOption.messageIsMandatory &&
																																				!selectedDeliveryProblem.message
																																				? _generated_palette
																																						.palette
																																						.error[400]
																																				: _generated_palette
																																						.palette
																																						.neutral[60],
																																			';width:100%;padding:12px;',
																																			typography.Kz0,
																																			' ',
																																			mq
																																				.Dp
																																				.tablet,
																																			'{max-width:460px;}',
																																			'',
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
																					'deliveryProblemRadio-'.concat(
																						index,
																					),
																				),
																		),
																},
															),
														},
													),
												],
											},
										),
										props.inValidationState &&
											!selectedDeliveryProblem &&
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'span',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														'display:block;position:relative;padding:',
														space.D[5],
														'px ',
														space.D[5],
														'px ',
														space.D[5],
														'px 50px;border:4px solid ',
														_generated_palette
															.palette.error[400],
														';margin-bottom:',
														space.D[5],
														'px;',
														'',
													),
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'i',
															{
																css: (0,
																emotion_react_browser_esm.iv)(
																	'position:absolute;top:',
																	space.D[5],
																	'px;left:',
																	space.D[5],
																	'px;',
																	'',
																),
																children: (0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	ErrorIcon.P,
																	{},
																),
															},
														),
														'Please select the type of problem',
													],
												},
											),
										props.showNextStepButton &&
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												emotion_react_jsx_runtime_browser_esm.HY,
												{
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															Button.z,
															{
																type: 'submit',
																children:
																	'Continue to Step 2 & 3',
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															Button.z,
															{
																cssOverrides:
																	(0,
																	emotion_react_browser_esm.iv)(
																		typography.Kz0,
																		' background-color:transparent;font-weight:bold;margin-left:22px;padding:0;color:',
																		_generated_palette
																			.palette
																			.brand[400],
																		';:hover{background-color:transparent;}',
																		'',
																	),
																onClick: () => {
																	var _props$onResetDeliver;
																	null ===
																		(_props$onResetDeliver =
																			props.onResetDeliveryRecordsPage) ||
																		void 0 ===
																			_props$onResetDeliver ||
																		_props$onResetDeliver.call(
																			props,
																		);
																},
																children:
																	'Cancel',
															},
														),
													],
												},
											),
									],
								},
							)
						);
					};
				try {
					(DeliveryRecordProblemForm.displayName =
						'DeliveryRecordProblemForm'),
						(DeliveryRecordProblemForm.__docgenInfo = {
							description: '',
							displayName: 'DeliveryRecordProblemForm',
							props: {
								showNextStepButton: {
									defaultValue: null,
									description: '',
									name: 'showNextStepButton',
									required: !0,
									type: { name: 'boolean' },
								},
								onResetDeliveryRecordsPage: {
									defaultValue: null,
									description: '',
									name: 'onResetDeliveryRecordsPage',
									required: !1,
									type: { name: '(() => void)' },
								},
								onFormSubmit: {
									defaultValue: null,
									description: '',
									name: 'onFormSubmit',
									required: !1,
									type: {
										name: '((selectedValue?: string, selectedMessage?: string) => void) | undefined',
									},
								},
								inValidationState: {
									defaultValue: null,
									description: '',
									name: 'inValidationState',
									required: !0,
									type: { name: 'boolean' },
								},
								updateValidationStatusCallback: {
									defaultValue: null,
									description: '',
									name: 'updateValidationStatusCallback',
									required: !0,
									type: {
										name: '(isValid: boolean, message?: string | undefined) => void',
									},
								},
								updateRadioSelectionCallback: {
									defaultValue: null,
									description: '',
									name: 'updateRadioSelectionCallback',
									required: !0,
									type: { name: '(value: string) => void' },
								},
								problemTypes: {
									defaultValue: null,
									description: '',
									name: 'problemTypes',
									required: !0,
									type: { name: 'DeliveryProblemType[]' },
								},
							},
						}),
						'undefined' != typeof STORYBOOK_REACT_CLASSES &&
							(STORYBOOK_REACT_CLASSES[
								'client/components/mma/delivery/records/DeliveryRecordsProblemForm.tsx#DeliveryRecordProblemForm'
							] = {
								docgenInfo:
									DeliveryRecordProblemForm.__docgenInfo,
								name: 'DeliveryRecordProblemForm',
								path: 'client/components/mma/delivery/records/DeliveryRecordsProblemForm.tsx#DeliveryRecordProblemForm',
							});
				} catch (__react_docgen_typescript_loader_error) {}
				var GiftIcon = __webpack_require__(
					'./client/components/mma/shared/assets/GiftIcon.tsx',
				);
				var ProductDetailsTable_ref = {
						name: 'pgl86',
						styles: 'position:absolute;right:0;top:50%;transform:translateY(-50%)',
					},
					ProductDetailsTable = (props) => {
						var dlCss = (0, emotion_react_browser_esm.iv)(
							typography.Kz0,
							';padding:',
							space.D[3],
							'px;margin:0;',
							mq.Dp.tablet,
							'{padding:',
							space.D[5],
							'px;}& div{display:inline-flex;width:100%;',
							mq.Dp.tablet,
							'{width:50%;padding-right:',
							space.D[5],
							'px;}}& div+div{margin-top:',
							space.D[3],
							'px;',
							mq.Dp.tablet,
							'{margin-top:0;}}& dt{font-weight:bold;display:inline-block;vertical-align:top;width:12ch;',
							mq.Dp.tablet,
							'{width:auto;margin-right:',
							space.D[5],
							'px;}}& dd{display:inline-block;vertical-align:top;margin:0;}',
							'',
						);
						return (0, emotion_react_jsx_runtime_browser_esm.BX)(
							'div',
							{
								css: (0, emotion_react_browser_esm.iv)(
									'border:1px solid ',
									_generated_palette.palette.neutral[86],
									';',
									'',
								),
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'h2',
										{
											css: (0,
											emotion_react_browser_esm.iv)(
												'font-size:17px;font-weight:bold;padding:',
												space.D[3],
												'px;margin:0;background-color:',
												_generated_palette.palette
													.brand[400],
												';color:',
												_generated_palette.palette
													.neutral[100],
												';position:relative;',
												mq.Dp.tablet,
												'{font-size:20px;padding:',
												space.D[3],
												'px ',
												space.D[5],
												'px;}',
												'',
											),
											children: [
												'Subscription details',
												props.isGift &&
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'i',
														{
															css: ProductDetailsTable_ref,
															children: (0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																GiftIcon.O,
																{
																	alignArrowToThisSide:
																		'left',
																},
															),
														},
													),
											],
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'dl',
										{
											css: dlCss,
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'div',
													{
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'dt',
																{
																	children:
																		'Product:',
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'dd',
																{
																	children:
																		props.productName,
																},
															),
														],
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'div',
													{
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'dt',
																{
																	children:
																		'Subscription ID:',
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'dd',
																{
																	'data-qm-masking':
																		'blocklist',
																	children:
																		props.subscriptionId,
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
					(ProductDetailsTable.displayName = 'ProductDetailsTable'),
						(ProductDetailsTable.__docgenInfo = {
							description: '',
							displayName: 'ProductDetailsTable',
							props: {
								productName: {
									defaultValue: null,
									description: '',
									name: 'productName',
									required: !0,
									type: { name: 'string' },
								},
								subscriptionId: {
									defaultValue: null,
									description: '',
									name: 'subscriptionId',
									required: !0,
									type: { name: 'string' },
								},
								isGift: {
									defaultValue: null,
									description: '',
									name: 'isGift',
									required: !0,
									type: { name: 'boolean' },
								},
							},
						}),
						'undefined' != typeof STORYBOOK_REACT_CLASSES &&
							(STORYBOOK_REACT_CLASSES[
								'client/components/mma/delivery/records/ProductDetailsTable.tsx#ProductDetailsTable'
							] = {
								docgenInfo: ProductDetailsTable.__docgenInfo,
								name: 'ProductDetailsTable',
								path: 'client/components/mma/delivery/records/ProductDetailsTable.tsx#ProductDetailsTable',
							});
				} catch (__react_docgen_typescript_loader_error) {}
				var PageStatus = (function (PageStatus) {
						return (
							(PageStatus[(PageStatus.ReadOnly = 0)] =
								'ReadOnly'),
							(PageStatus[(PageStatus.ReportIssueStep1 = 1)] =
								'ReportIssueStep1'),
							(PageStatus[(PageStatus.ReportIssueStep2 = 2)] =
								'ReportIssueStep2'),
							(PageStatus[(PageStatus.ContinueToReview = 3)] =
								'ContinueToReview'),
							(PageStatus[
								(PageStatus.ReportIssueConfirmation = 4)
							] = 'ReportIssueConfirmation'),
							(PageStatus[(PageStatus.CannotReportProblem = 5)] =
								'CannotReportProblem'),
							PageStatus
						);
					})({}),
					DeliveryRecords = () => {
						var _productType$delivery,
							_productType$delivery2,
							navigate = (0, react_router.s0)(),
							{ productDetail, productType, data } = (0,
							react.useContext)(DeliveryRecordsContext),
							[pageStatus, setPageStatus] = (0, react.useState)(
								PageStatus.ReadOnly,
							),
							[currentPage, setCurrentPage] = (0, react.useState)(
								0,
							),
							[
								selectedProblemRecords,
								setSelectedProblemRecords,
							] = (0, react.useState)([]),
							[
								step1formValidationState,
								setStep1formValidationState,
							] = (0, react.useState)(!1),
							[
								step1FormValidationDetails,
								setStep1FormValidationDetails,
							] = (0, react.useState)({ isValid: !0 }),
							[
								step2formValidationState,
								setStep2formValidationState,
							] = (0, react.useState)(!1),
							[
								step2FormValidationDetails,
								setStep2FormValidationDetails,
							] = (0, react.useState)({ isValid: !0 }),
							[
								step3formValidationState,
								setStep3formValidationState,
							] = (0, react.useState)(!1),
							[
								step3FormValidationDetails,
								setStep3FormValidationDetails,
							] = (0, react.useState)({ isValid: !0 }),
							[addressInValidState, setAddressValidationState] =
								(0, react.useState)(!0),
							[deliveryProblem, setDeliveryProblem] = (0,
							react.useState)(),
							[
								showTopCallCentreNumbers,
								setTopCallCentreNumbersVisibility,
							] = (0, react.useState)(!1),
							[
								choosenDeliveryProblem,
								setChoosenDeliveryProblem,
							] = (0, react.useState)(),
							[
								showBottomCallCentreNumbers,
								setBottomCallCentreNumbersVisibility,
							] = (0, react.useState)(!1),
							[address, setAddress] = (0, react.useState)(
								productDetail.subscription.deliveryAddress,
							),
							[productsAffected, setProductsAffected] = (0,
							react.useState)([]),
							mainPlan = (0, productResponse.fr)(
								productDetail.subscription,
							);
						if (!(0, productResponse.q4)(mainPlan))
							throw new Error(
								'mainPlan is not a PaidSubscriptionPlan in deliveryRecords',
							);
						var subscriptionCurrency = mainPlan.currency,
							hasExistingDeliveryProblem =
								checkForExistingDeliveryProblem(data.results),
							isHolidayStopProblem =
								choosenDeliveryProblem ===
								productTypes.FO.label,
							isCancelledSubscription =
								productDetail.subscription.cancelledAt,
							subscriptionIsAutoRenewable =
								productDetail.subscription.autoRenew,
							hasReportedProblemAndShouldBeContacted =
								hasExistingDeliveryProblem &&
								(null ===
									(_productType$delivery =
										productType.delivery) ||
								void 0 === _productType$delivery ||
								null ===
									(_productType$delivery2 =
										_productType$delivery.records) ||
								void 0 === _productType$delivery2
									? void 0
									: _productType$delivery2.contactUserOnExistingProblemReport),
							showProblemCredit =
								!isHolidayStopProblem &&
								!isCancelledSubscription &&
								subscriptionIsAutoRenewable &&
								!hasReportedProblemAndShouldBeContacted;
						(0, react.useEffect)(() => {
							addressInValidState &&
								(setStep3FormValidationDetails({
									isValid: addressInValidState,
								}),
								setStep3formValidationState(
									!addressInValidState,
								));
						}, [addressInValidState]);
						var enableDeliveryInstructions =
								!!productType.delivery
									.enableDeliveryInstructionsUpdate,
							addRecordToDeliveryProblem = (id) =>
								setSelectedProblemRecords([
									...selectedProblemRecords,
									id,
								]),
							removeRecordFromDeliveryProblem = (id) =>
								setSelectedProblemRecords(
									selectedProblemRecords.filter(
										(existingId) => existingId !== id,
									),
								),
							totalPages = Math.ceil(data.results.length / 7),
							filterData = (overridePageStatusCheck) => {
								if (
									(pageStatus !== PageStatus.ReadOnly &&
										pageStatus !==
											PageStatus.CannotReportProblem) ||
									overridePageStatusCheck
								) {
									var numOfReportableRecords =
											productType.delivery.records
												.numberOfProblemRecordsToShow,
										startOfToday = new Date(
											new Date().setHours(0, 0, 0, 0),
										),
										isNotHolidayProblem =
											choosenDeliveryProblem !==
											productTypes.FO.label;
									return data.results
										.filter((_) => {
											var startOfDeliveryDateDay =
												new Date(
													(0, dates.sG)(
														_.deliveryDate,
													).date.setHours(0, 0, 0, 0),
												);
											return (0, dates.Ov)(
												startOfDeliveryDateDay,
												startOfToday,
											);
										})
										.slice(0, numOfReportableRecords)
										.filter(
											(_) =>
												isNotHolidayProblem ||
												_.hasHolidayStop,
										)
										.filter((_) => !_.problemCaseId);
								}
								return data.results.filter((_, index) =>
									isRecordInCurrentPage(
										index,
										7 * currentPage,
										7 * currentPage + 7 - 1,
									),
								);
							},
							isRecordInCurrentPage = (
								index,
								currentPageStartIndex,
								currentPageEndIndex,
							) =>
								index >= currentPageStartIndex &&
								index <= currentPageEndIndex,
							filteredData = filterData(),
							hasRecentHolidayStop =
								filteredData.findIndex(
									(record) => record.hasHolidayStop,
								) > -1,
							problemTypes = [
								...productType.delivery.records
									.availableProblemTypes,
								...(hasRecentHolidayStop
									? [productTypes.FO]
									: []),
							].sort((a, b) => a.label.localeCompare(b.label)),
							formErrorTitle =
								!step3FormValidationDetails.isValid &&
								step1FormValidationDetails.isValid &&
								step2FormValidationDetails.isValid
									? 'Unfinished changes'
									: 'Some information is missing',
							formErrorMessages = [
								step1FormValidationDetails,
								step2FormValidationDetails,
								step3FormValidationDetails,
							].reduce(
								(acc, validationDetails) =>
									!validationDetails.isValid &&
									validationDetails.message
										? [...acc, validationDetails.message]
										: acc,
								[],
							);
						return (0, emotion_react_jsx_runtime_browser_esm.BX)(
							DeliveryRecordsAddressContext.Provider,
							{
								value: {
									address,
									setAddress,
									productsAffected,
									setProductsAffected,
									enableDeliveryInstructions,
								},
								children: [
									pageStatus !== PageStatus.ReadOnly &&
										pageStatus !==
											PageStatus.CannotReportProblem &&
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											ProgressIndicator.Y,
											{
												steps: [
													{
														title: 'Update',
														isCurrentStep: !0,
													},
													{ title: 'Review' },
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
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'div',
										{
											css: (0,
											emotion_react_browser_esm.iv)(
												'margin:',
												space.D[6],
												'px 0 ',
												space.D[12],
												'px;',
												'',
											),
											children: (0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												ProductDetailsTable,
												{
													productName: (0,
													lodash.capitalize)(
														productType.friendlyName,
													),
													subscriptionId:
														productDetail
															.subscription
															.subscriptionId,
													isGift: (0,
													productResponse.XU)(
														productDetail.subscription,
													),
												},
											),
										},
									),
									data.results.find(
										(record) => !record.problemCaseId,
									) &&
										(0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											emotion_react_jsx_runtime_browser_esm.HY,
											{
												children: [
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'h2',
														{
															css: (0,
															emotion_react_browser_esm.iv)(
																'border-top:1px solid ',
																palette.n$[86],
																';',
																typography.Hu7,
																';',
																mq.C4.tablet,
																'{font-size:1.25rem;line-height:1.6;}',
																'',
															),
															children:
																'Report delivery problems',
														},
													),
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'div',
														{
															css: (0,
															emotion_react_browser_esm.iv)(
																'margin-bottom:',
																pageStatus !==
																	PageStatus.ReportIssueStep2
																	? space
																			.D[12]
																	: space
																			.D[5],
																'px;',
																typography.Kz0,
																';',
																'',
															),
															children: [
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
																			'Have you been experiencing problems with your delivery? Report it online and let us take care of it for you. Depending on the problem you’re having, you’ll either be automatically credited or escalated to customer service. It’s easy to use and only takes a couple of minutes.',
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
																		children:
																			[
																				'Please remember, you can also',
																				' ',
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					'span',
																					{
																						css: (0,
																						emotion_react_browser_esm.iv)(
																							'cursor:pointer;color:',
																							_generated_palette
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
																				' ',
																				'if you wish to speak to us in person.',
																			],
																	},
																),
																showTopCallCentreNumbers &&
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		CallCenterEmailAndNumbers.K,
																		{},
																	),
																pageStatus ===
																	PageStatus.CannotReportProblem &&
																	(0,
																	emotion_react_jsx_runtime_browser_esm.BX)(
																		'span',
																		{
																			css: (0,
																			emotion_react_browser_esm.iv)(
																				'position:relative;display:block;margin:',
																				space
																					.D[3],
																				'px 0;padding:',
																				space
																					.D[3],
																				'px ',
																				space
																					.D[3],
																				'px ',
																				space
																					.D[3],
																				'px ',
																				2 *
																					space
																						.D[3] +
																					17,
																				'px;background-color:',
																				palette
																					.n$[97],
																				';',
																				typography.VZD,
																				';',
																				mq
																					.Dp
																					.tablet,
																				'{margin:',
																				space
																					.D[5],
																				'px 0;}',
																				'',
																			),
																			children:
																				[
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						'i',
																						{
																							css: (0,
																							emotion_react_browser_esm.iv)(
																								'position:absolute;top:',
																								space
																									.D[3],
																								'px;left:',
																								space
																									.D[3],
																								'px;',
																								'',
																							),
																							children:
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									InfoIconDark.J,
																									{
																										fillColor:
																											_generated_palette
																												.palette
																												.brand[500],
																									},
																								),
																						},
																					),
																					"You don't have any available delivery history to report. Your deliveries may be too far in the past or have already been reported.",
																				],
																		},
																	),
																(pageStatus ===
																	PageStatus.ReadOnly ||
																	pageStatus ===
																		PageStatus.CannotReportProblem) &&
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		Button.z,
																		{
																			onClick:
																				() => {
																					var canReportProblem =
																						filterData(
																							!0,
																						)
																							.length >
																						0;
																					(0,
																					analytics.L9)(
																						{
																							eventCategory:
																								'delivery-problem',
																							eventAction:
																								'report_delivery_problem_button_click',
																							product:
																								{
																									productType,
																									productDetail,
																								},
																							eventLabel:
																								productType.urlPart,
																						},
																					),
																						canReportProblem
																							? (setSelectedProblemRecords(
																									[],
																							  ),
																							  setPageStatus(
																									PageStatus.ReportIssueStep1,
																							  ))
																							: setPageStatus(
																									PageStatus.CannotReportProblem,
																							  );
																				},
																			children:
																				'Report a problem',
																		},
																	),
																(pageStatus ===
																	PageStatus.ReportIssueStep1 ||
																	pageStatus ===
																		PageStatus.ReportIssueStep2) &&
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		DeliveryRecordProblemForm,
																		{
																			showNextStepButton:
																				pageStatus !==
																				PageStatus.ReportIssueStep2,
																			onResetDeliveryRecordsPage:
																				() =>
																					setPageStatus(
																						PageStatus.ReadOnly,
																					),
																			onFormSubmit:
																				(
																					selectedValue,
																					selectedMessage,
																				) => {
																					setDeliveryProblem(
																						{
																							category:
																								selectedValue,
																							message:
																								selectedMessage,
																						},
																					),
																						setStep1formValidationState(
																							!0,
																						),
																						step1FormValidationDetails.isValid &&
																							((0,
																							analytics.L9)(
																								{
																									eventCategory:
																										'delivery-problem',
																									eventAction:
																										'continue_to_step_2_button_click',
																									product:
																										{
																											productType,
																											productDetail,
																										},
																									eventLabel:
																										productType.urlPart,
																								},
																							),
																							setPageStatus(
																								PageStatus.ReportIssueStep2,
																							));
																				},
																			inValidationState:
																				step1formValidationState,
																			updateValidationStatusCallback:
																				(
																					isValid,
																					message,
																				) => {
																					setStep1formValidationState(
																						!1,
																					),
																						setStep1FormValidationDetails(
																							{
																								isValid,
																								message,
																							},
																						);
																				},
																			updateRadioSelectionCallback:
																				(
																					value,
																				) =>
																					setChoosenDeliveryProblem(
																						value,
																					),
																			problemTypes,
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
										'h2',
										{
											css: (0,
											emotion_react_browser_esm.iv)(
												'border-top:1px solid ',
												palette.n$[86],
												';',
												typography.Hu7,
												';opacity:',
												pageStatus ===
													PageStatus.ReportIssueStep1 &&
													filteredData.length > 0
													? '0.5'
													: '1',
												';',
												pageStatus ===
													PageStatus.ReportIssueStep2
													? '\n              background-color: '
															.concat(
																palette.n$[97],
																';\n              border-left: 1px solid ',
															)
															.concat(
																palette.n$[86],
																';\n              border-right: 1px solid ',
															)
															.concat(
																palette.n$[86],
																';\n              margin: 0;\n              padding: 14px 14px 14px;\n\t\t\t  ',
															)
															.concat(
																typography.Rcn,
																';\n            ',
															)
													: '',
												' ',
												mq.C4.tablet,
												'{',
												pageStatus ===
													PageStatus.ReportIssueStep2
													? ''
													: '\n              font-size: 1.25rem;\n              line-height: 1.6;\n              ',
												';}',
												'',
											),
											children:
												pageStatus ===
												PageStatus.ReportIssueStep2
													? 'Step 2. Select the date you have experienced the problem'
													: 'Deliveries',
										},
									),
									0 === filteredData.length &&
										pageStatus !==
											PageStatus.CannotReportProblem &&
										(0 === data.results.length
											? (0,
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
															"You haven't had a delivery for this subscription yet. In the future, details of your deliveries will appear here.",
													},
											  )
											: (0,
											  emotion_react_jsx_runtime_browser_esm.BX)(
													emotion_react_jsx_runtime_browser_esm.HY,
													{
														children: [
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
																		'You currently have no deliveries that you can report a problem on based on the problem type that you have selected.',
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
																		'If you are still having problems please',
																		' ',
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'span',
																			{
																				css: (0,
																				emotion_react_browser_esm.iv)(
																					'cursor:pointer;color:',
																					_generated_palette
																						.palette
																						.brand[500],
																					';text-decoration:underline;',
																					'',
																				),
																				onClick:
																					() =>
																						setBottomCallCentreNumbersVisibility(
																							!showBottomCallCentreNumbers,
																						),
																				children:
																					'Contact us',
																			},
																		),
																	],
																},
															),
														],
													},
											  )),
									filteredData.map(
										(deliveryRecord, listIndex) =>
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												DeliveryRecordCard,
												{
													deliveryRecord,
													listIndex,
													pageStatus,
													deliveryProblemMap:
														data.deliveryProblemMap,
													addRecordToDeliveryProblem,
													removeRecordFromDeliveryProblem,
													showDeliveryInstructions:
														productType.delivery
															.records
															.showDeliveryInstructions,
													recordCurrency:
														subscriptionCurrency,
													isChecked:
														selectedProblemRecords.includes(
															deliveryRecord.id,
														),
													productName: (0,
													lodash.capitalize)(
														productType.shortFriendlyName ||
															productType.friendlyName,
													),
												},
												deliveryRecord.id,
											),
									),
									totalPages > 1 &&
										(pageStatus === PageStatus.ReadOnly ||
											pageStatus ===
												PageStatus.CannotReportProblem) &&
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											PaginationNav,
											{
												resultsPerPage: 7,
												totalNumberOfResults:
													data.results.length,
												currentPage,
												setCurrentPage,
												changeCallBack: () =>
													window.scrollTo(0, 0),
											},
										),
									pageStatus ===
										PageStatus.ReportIssueStep2 &&
										(0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											emotion_react_jsx_runtime_browser_esm.HY,
											{
												children: [
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'section',
														{
															css: (0,
															emotion_react_browser_esm.iv)(
																'border:1px solid ',
																palette.n$[86],
																';margin:',
																space.D[5],
																'px 0 ',
																space.D[5],
																'px;padding:0;',
																'',
															),
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'h1',
																	{
																		css: (0,
																		emotion_react_browser_esm.iv)(
																			'margin:0;padding:',
																			space
																				.D[3],
																			'px;background-color:',
																			palette
																				.n$[97],
																			';border-bottom:1px solid ',
																			palette
																				.n$[86],
																			';',
																			typography.Rcn,
																			';',
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
																			[
																				'Step 3. Check your current delivery address',
																				enableDeliveryInstructions &&
																					' and instructions',
																			],
																	},
																),
																productDetail
																	.subscription
																	.deliveryAddress &&
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		DeliveryAddressStep,
																		{
																			productDetail,
																			enableDeliveryInstructions,
																			setAddressValidationState,
																		},
																	),
															],
														},
													),
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'div',
														{
															css: (0,
															emotion_react_browser_esm.iv)(
																'margin-top:',
																space.D[6],
																'px;',
																'',
															),
															children: [
																(step1formValidationState ||
																	step2formValidationState ||
																	step3formValidationState) &&
																	formErrorMessages.length >
																		0 &&
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		FormError.X,
																		{
																			title: formErrorTitle,
																			messages:
																				formErrorMessages,
																		},
																	),
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	Button.z,
																	{
																		onClick:
																			() => {
																				setStep1formValidationState(
																					!0,
																				);
																				var isStep2Valid =
																					!!selectedProblemRecords.length;
																				setStep2FormValidationDetails(
																					{
																						isValid:
																							isStep2Valid,
																						message:
																							'Step 2: Please select an affected delivery record.',
																					},
																				),
																					setStep2formValidationState(
																						!isStep2Valid,
																					);
																				var isStep3Valid =
																					addressInValidState;
																				setStep3FormValidationDetails(
																					{
																						isValid:
																							isStep3Valid,
																						message:
																							'Step 3: Please save or discard your delivery address changes.',
																					},
																				),
																					setStep3formValidationState(
																						!isStep3Valid,
																					),
																					step1FormValidationDetails.isValid &&
																						isStep2Valid &&
																						isStep3Valid &&
																						((0,
																						analytics.L9)(
																							{
																								eventCategory:
																									'delivery-problem',
																								eventAction:
																									'review_report_button_click',
																								product:
																									{
																										productType,
																										productDetail,
																									},
																								eventLabel:
																									productType.urlPart,
																							},
																						),
																						setPageStatus(
																							PageStatus.ContinueToReview,
																						),
																						navigate(
																							'review',
																							{
																								state: {
																									productDetail,
																									affectedRecords:
																										data.results.filter(
																											(
																												record,
																											) =>
																												selectedProblemRecords.includes(
																													record.id,
																												),
																										),
																									problemType:
																										deliveryProblem,
																									showProblemCredit,
																								},
																							},
																						));
																			},
																		children:
																			'Review your report',
																	},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	Button.z,
																	{
																		cssOverrides:
																			(0,
																			emotion_react_browser_esm.iv)(
																				typography.Kz0,
																				';background-color:transparent;font-weight:bold;margin-left:22px;padding:0;color:',
																				_generated_palette
																					.palette
																					.brand[400],
																				';:hover{background-color:transparent;}',
																				'',
																			),
																		onClick:
																			() => {
																				setPageStatus(
																					PageStatus.ReadOnly,
																				);
																			},
																		children:
																			'Cancel',
																	},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	Stack.K,
																	{
																		space: 5,
																		children:
																			[
																				(0,
																				emotion_react_jsx_runtime_browser_esm.BX)(
																					'p',
																					{
																						css: (0,
																						emotion_react_browser_esm.iv)(
																							typography.Kz0,
																							';color:',
																							palette
																								.n$[46],
																							';margin:',
																							space
																								.D[6],
																							'px 0 0;',
																							'',
																						),
																						children:
																							[
																								'If your delivery is not shown above, or you’d like to talk to someone,',
																								' ',
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									'span',
																									{
																										css: (0,
																										emotion_react_browser_esm.iv)(
																											'cursor:pointer;color:',
																											_generated_palette
																												.palette
																												.brand[500],
																											';text-decoration:underline;',
																											'',
																										),
																										onClick:
																											() =>
																												setBottomCallCentreNumbersVisibility(
																													!showBottomCallCentreNumbers,
																												),
																										children:
																											'contact us',
																									},
																								),
																								'.',
																							],
																					},
																				),
																				showBottomCallCentreNumbers &&
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						CallCenterEmailAndNumbers.K,
																						{},
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
						);
					},
					LinkButton = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/button/LinkButton.js',
					);
				var renderDeliveryRecordsConfirmation =
						(subscription) => (data) => {
							var mainPlan = (0, productResponse.fr)(
								subscription,
							);
							if (!mainPlan)
								throw new Error(
									'mainPlan does not exist in deliveryRecordsProblemReview',
								);
							return (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								DeliveryRecordsProblemConfirmationFC,
								{
									data,
									subscriptionId: subscription.subscriptionId,
									subscriptionCurrency: mainPlan.currency,
								},
							);
						},
					DeliveryRecordsProblemConfirmation_ref = {
						name: '1r5gb7q',
						styles: 'display:inline-block',
					},
					DeliveryRecordsProblemConfirmation_ref2 = {
						name: 'ymruey',
						styles: 'display:inline-block;font-weight:bold',
					},
					DeliveryRecordsProblemConfirmation_ref3 = {
						name: '1r5gb7q',
						styles: 'display:inline-block',
					},
					DeliveryRecordsProblemConfirmation_ref4 = {
						name: '1rx0n9a',
						styles: 'display:inline-block;min-width:9ch',
					},
					_ref5 = {
						name: 'ymruey',
						styles: 'display:inline-block;font-weight:bold',
					},
					_ref6 = { name: '1r5gb7q', styles: 'display:inline-block' },
					_ref7 = {
						name: 'aqczub',
						styles: 'margin:0;display:inline-block;vertical-align:top',
					},
					DeliveryRecordsProblemConfirmationFC = (props) => {
						var _filteredData$find,
							_props$data$deliveryP,
							_deliveryAddressConte,
							_deliveryAddressConte2,
							_deliveryAddressConte3,
							_deliveryIssuePostPay2,
							_deliveryAddressConte4,
							deliveryIssuePostPayload = (0, react.useContext)(
								DeliveryRecordsProblemPostPayloadContext,
							),
							deliveryProblemCredit = (0, react.useContext)(
								DeliveryRecordCreditContext,
							),
							deliveryAddressContext = (0, react.useContext)(
								DeliveryRecordsAddressContext,
							),
							filteredData = props.data.results.filter(
								(record) => {
									var _deliveryIssuePostPay;
									return (
										-1 !==
										(null == deliveryIssuePostPayload ||
										null ===
											(_deliveryIssuePostPay =
												deliveryIssuePostPayload.deliveryRecords) ||
										void 0 === _deliveryIssuePostPay
											? void 0
											: _deliveryIssuePostPay.findIndex(
													(affectedRecord) =>
														affectedRecord.id ===
														record.id,
											  ))
									);
								},
							),
							{ productType } = (0, react.useContext)(
								DeliveryRecordsContext,
							),
							problemCaseId =
								null ===
									(_filteredData$find = filteredData.find(
										(record) => record.problemCaseId,
									)) || void 0 === _filteredData$find
									? void 0
									: _filteredData$find.problemCaseId,
							problemReferenceId = problemCaseId
								? null ===
										(_props$data$deliveryP =
											props.data.deliveryProblemMap[
												problemCaseId
											]) ||
								  void 0 === _props$data$deliveryP
									? void 0
									: _props$data$deliveryP.ref
								: '-',
							dtCss = (0, emotion_react_browser_esm.iv)(
								'font-weight:bold;display:inline-block;vertical-align:top;min-width:12ch;',
								mq.Dp.tablet,
								'{min-width:16ch;}',
								'',
							),
							ddCss = _ref7;
						return (0, emotion_react_jsx_runtime_browser_esm.BX)(
							emotion_react_jsx_runtime_browser_esm.HY,
							{
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										ProgressIndicator.Y,
										{
											steps: [
												{ title: 'Update' },
												{ title: 'Review' },
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
												'px;',
												'',
											),
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'h2',
										{
											css: (0,
											emotion_react_browser_esm.iv)(
												'border-top:1px solid ',
												_generated_palette.palette
													.neutral[86],
												';',
												typography.Hu7,
												';',
												mq.C4.tablet,
												'{font-size:1.25rem;line-height:1.6;}',
												'',
											),
											children:
												'Delivery report confirmation',
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
												'Your delivery problem report has been successfully submitted.',
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'span',
										{
											css: (0,
											emotion_react_browser_esm.iv)(
												'position:relative;display:block;margin:',
												space.D[3],
												'px 0;padding:',
												space.D[3],
												'px ',
												space.D[3],
												'px ',
												space.D[3],
												'px ',
												2 * space.D[3] + 17,
												'px;background-color:',
												_generated_palette.palette
													.neutral[97],
												';',
												typography.VZD,
												';',
												mq.Dp.tablet,
												'{margin:',
												space.D[5],
												'px 0;}',
												'',
											),
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'i',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															'position:absolute;top:',
															space.D[3],
															'px;left:',
															space.D[3],
															'px;',
															'',
														),
														children: (0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															InfoIconDark.J,
															{
																fillColor:
																	_generated_palette
																		.palette
																		.brand[500],
															},
														),
													},
												),
												null != deliveryProblemCredit &&
												deliveryProblemCredit.showCredit
													? 'Thank you for reporting your delivery problem'.concat(
															deliveryAddressContext.address &&
																deliveryAddressContext.productsAffected &&
																(null ===
																	(_deliveryAddressConte =
																		deliveryAddressContext.productsAffected) ||
																void 0 ===
																	_deliveryAddressConte
																	? void 0
																	: _deliveryAddressConte.length) >
																	0
																? ' and updating your delivery details'
																: '',
															'. We will credit you for the affected issues and apologise for any inconvenience caused. We monitor these reports closely and use them to improve our service.',
													  )
													: 'Your case is high priority. Our customer service team will try their best to contact you as soon as possible to resolve the issue.'.concat(
															deliveryAddressContext.address &&
																deliveryAddressContext.productsAffected &&
																(null ===
																	(_deliveryAddressConte2 =
																		deliveryAddressContext.productsAffected) ||
																void 0 ===
																	_deliveryAddressConte2
																	? void 0
																	: _deliveryAddressConte2.length) >
																	0
																? ' Thank you for updating your delivery details.'
																: '',
													  ),
											],
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'section',
										{
											css: (0,
											emotion_react_browser_esm.iv)(
												'border:1px solid ',
												_generated_palette.palette
													.neutral[86],
												';margin-bottom:',
												deliveryAddressContext.address &&
													deliveryAddressContext.productsAffected &&
													(null ===
														(_deliveryAddressConte3 =
															deliveryAddressContext.productsAffected) ||
													void 0 ===
														_deliveryAddressConte3
														? void 0
														: _deliveryAddressConte3.length) >
														0
													? space.D[5]
													: space.D[9],
												'px;',
												'',
											),
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'h2',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															'margin:0;padding:14px ',
															space.D[3],
															'px;background-color:',
															_generated_palette
																.palette
																.neutral[97],
															';border-bottom:1px solid ',
															_generated_palette
																.palette
																.neutral[86],
															';',
															typography.Rcn,
															';',
															mq.Dp.tablet,
															'{padding:14px ',
															space.D[5],
															'px;}',
															'',
														),
														children:
															'Reported delivery problems',
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'dl',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															'padding:0 ',
															space.D[3],
															'px;',
															typography.Kz0,
															';display:flex;flex-wrap:wrap;flex-direction:column;justify-content:space-between;',
															mq.Dp.tablet,
															'{flex-direction:initial;padding:0 ',
															space.D[5],
															'px;}div{margin-top:16px;',
															mq.Dp.tablet,
															'{min-width:50%;}}',
															'',
														),
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'div',
																{
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'dt',
																			{
																				css: dtCss,
																				children:
																					'Reference:',
																			},
																		),
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'dd',
																			{
																				css: ddCss,
																				children:
																					problemReferenceId,
																			},
																		),
																	],
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'div',
																{
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'dt',
																			{
																				css: dtCss,
																				children:
																					'Date reported:',
																			},
																		),
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'dd',
																			{
																				css: ddCss,
																				children:
																					(0,
																					dates.ur)(
																						new Date(),
																						dates.rd,
																					),
																			},
																		),
																	],
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'div',
																{
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'dt',
																			{
																				css: dtCss,
																				children:
																					'Subscription ID:',
																			},
																		),
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'dd',
																			{
																				css: ddCss,
																				'data-qm-masking':
																					'blocklist',
																				children:
																					props.subscriptionId,
																			},
																		),
																	],
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'div',
																{
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'dt',
																			{
																				css: dtCss,
																				children:
																					'Product:',
																			},
																		),
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'dd',
																			{
																				css: ddCss,
																				children:
																					productType.shortFriendlyName ||
																					productType.friendlyName,
																			},
																		),
																	],
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'div',
																{
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'dt',
																			{
																				css: dtCss,
																				children:
																					'Contact number:',
																			},
																		),
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'dd',
																			{
																				css: ddCss,
																				children:
																					Object.entries(
																						props
																							.data
																							.contactPhoneNumbers,
																					)
																						.filter(
																							(
																								_ref8,
																							) => {
																								var [
																									phoneType,
																									phoneNumber,
																								] =
																									_ref8;
																								return (
																									'id' !==
																										phoneType.toLowerCase() &&
																									phoneNumber
																								);
																							},
																						)
																						.map(
																							(
																								_ref9,
																								index,
																							) => {
																								var [
																									_,
																									phoneNumber,
																								] =
																									_ref9;
																								return (0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									'span',
																									{
																										css: (0,
																										emotion_react_browser_esm.iv)(
																											'display:block;margin-bottom:',
																											space
																												.D[3],
																											';',
																											'',
																										),
																										children:
																											phoneNumber,
																									},
																									'phoneNo-'.concat(
																										index,
																									),
																								);
																							},
																						) ||
																					'-',
																			},
																		),
																	],
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'div',
																{
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'dt',
																			{
																				css: dtCss,
																				children:
																					'Selected Issue(s):',
																			},
																		),
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'dd',
																			{
																				css: ddCss,
																				children:
																					null ==
																						deliveryIssuePostPayload ||
																					null ===
																						(_deliveryIssuePostPay2 =
																							deliveryIssuePostPayload.deliveryRecords) ||
																					void 0 ===
																						_deliveryIssuePostPay2
																						? void 0
																						: _deliveryIssuePostPay2.length,
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
													'div',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															'padding:0 ',
															space.D[3],
															'px;margin-bottom:',
															space.D[5],
															'px;',
															mq.Dp.tablet,
															'{padding:0 ',
															space.D[5],
															'px;}',
															'',
														),
														children: props.data
															.results.length
															? filteredData.map(
																	(
																		deliveryRecord,
																		listIndex,
																	) => {
																		var _productType$delivery,
																			_productType$delivery2;
																		return (0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			DeliveryRecordCard,
																			{
																				deliveryRecord,
																				listIndex,
																				pageStatus:
																					PageStatus.ReportIssueConfirmation,
																				showDeliveryInstructions:
																					null ===
																						(_productType$delivery =
																							productType.delivery) ||
																					void 0 ===
																						_productType$delivery ||
																					null ===
																						(_productType$delivery2 =
																							_productType$delivery.records) ||
																					void 0 ===
																						_productType$delivery2
																						? void 0
																						: _productType$delivery2.showDeliveryInstructions,
																				deliveryProblemMap:
																					props
																						.data
																						.deliveryProblemMap,
																				recordCurrency:
																					props.subscriptionCurrency,
																			},
																			deliveryRecord.id,
																		);
																	},
															  )
															: (0,
															  emotion_react_jsx_runtime_browser_esm.tZ)(
																	'p',
																	{
																		children:
																			"There aren't any delivery records to show you yet",
																	},
															  ),
													},
												),
												(null == deliveryProblemCredit
													? void 0
													: deliveryProblemCredit.showCredit) &&
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'dl',
														{
															css: (0,
															emotion_react_browser_esm.iv)(
																typography.Kz0,
																';padding:',
																space.D[5],
																'px;margin:',
																space.D[5],
																'px;background-color:',
																_generated_palette
																	.palette
																	.neutral[97],
																';',
																'',
															),
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'div',
																	{
																		css: _ref6,
																		children:
																			[
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					'dt',
																					{
																						css: _ref5,
																						children:
																							'Credit amount:',
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					'dd',
																					{
																						css: DeliveryRecordsProblemConfirmation_ref4,
																						children:
																							deliveryProblemCredit.creditAmount,
																					},
																				),
																			],
																	},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'div',
																	{
																		css: DeliveryRecordsProblemConfirmation_ref3,
																		children:
																			[
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					'dt',
																					{
																						css: DeliveryRecordsProblemConfirmation_ref2,
																						children:
																							'Credit date:',
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					'dd',
																					{
																						css: DeliveryRecordsProblemConfirmation_ref,
																						children:
																							deliveryProblemCredit.creditDate,
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
									deliveryAddressContext.address &&
										deliveryAddressContext.productsAffected &&
										(null ===
											(_deliveryAddressConte4 =
												deliveryAddressContext.productsAffected) ||
										void 0 === _deliveryAddressConte4
											? void 0
											: _deliveryAddressConte4.length) >
											0 &&
										(0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											'section',
											{
												css: (0,
												emotion_react_browser_esm.iv)(
													'border:1px solid ',
													_generated_palette.palette
														.neutral[86],
													';margin-bottom:',
													space.D[9],
													'px;',
													'',
												),
												children: [
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'h2',
														{
															css: (0,
															emotion_react_browser_esm.iv)(
																'margin:0;padding:14px ',
																space.D[3],
																'px;background-color:',
																_generated_palette
																	.palette
																	.neutral[97],
																';border-bottom:1px solid ',
																_generated_palette
																	.palette
																	.neutral[86],
																';',
																typography.Rcn,
																';',
																mq.Dp.tablet,
																'{padding:14px ',
																space.D[5],
																'px;}',
																'',
															),
															children:
																'Delivery address changes',
														},
													),
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														ReadOnlyAddressDisplay,
														{
															address:
																deliveryAddressContext.address,
															instructions:
																(deliveryAddressContext.enableDeliveryInstructions &&
																	deliveryAddressContext
																		.address
																		.instructions) ||
																void 0,
														},
													),
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'div',
														{
															css: (0,
															emotion_react_browser_esm.iv)(
																'padding:0 ',
																space.D[3],
																'px;margin-top:',
																space.D[5],
																'px;',
																mq.Dp.tablet,
																'{padding:0 ',
																space.D[5],
																'px;}',
																'',
															),
															children: [
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
																			'Your change of address affects the following subscriptions:',
																	},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	ProductDescriptionListTable.M,
																	{
																		content:
																			deliveryAddressContext.productsAffected,
																		seperateEachRow:
																			!0,
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
											href: NavConfig.qy.accountOverview
												.link,
											children: 'Return to your account',
										},
									),
								],
							},
						);
					},
					DeliveryRecordsProblemConfirmation = () => {
						var routerState = (0, react_router.TH)().state;
						if (!routerState)
							return (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								react_router.Fg,
								{ to: '..' },
							);
						var { productDetail, deliveryIssuePostPayload } =
								routerState,
							subscription = productDetail.subscription,
							isTestUser = productDetail.isTestUser;
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							DeliveryRecordsApiAsyncLoader,
							{
								render: renderDeliveryRecordsConfirmation(
									subscription,
								),
								fetch: createDeliveryRecordsProblemPost(
									subscription.subscriptionId,
									isTestUser,
									deliveryIssuePostPayload,
								),
								loadingMessage: 'Reporting problem...',
							},
						);
					},
					HolidayStopApi = __webpack_require__(
						'./client/components/mma/holiday/HolidayStopApi.ts',
					),
					TextInput = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/text-input/TextInput.js',
					);
				function UserPhoneNumber_ownKeys(e, r) {
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
				function UserPhoneNumber_objectSpread(e) {
					for (var r = 1; r < arguments.length; r++) {
						var t = null != arguments[r] ? arguments[r] : {};
						r % 2
							? UserPhoneNumber_ownKeys(Object(t), !0).forEach(
									function (r) {
										UserPhoneNumber_defineProperty(
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
							: UserPhoneNumber_ownKeys(Object(t)).forEach(
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
				function UserPhoneNumber_defineProperty(obj, key, value) {
					return (
						(key = (function UserPhoneNumber_toPropertyKey(arg) {
							var key = (function UserPhoneNumber_toPrimitive(
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
				var UserPhoneNumber_ref = {
						name: '1qhvxu9',
						styles: 'position:absolute;top:2px;left:0',
					},
					UserPhoneNumber_ref2 = {
						name: '1fwgg71',
						styles: 'display:inline-block;min-width:15ch',
					},
					UserPhoneNumber_ref3 = {
						name: 'qhxz92',
						styles: 'max-width:100%',
					},
					UserPhoneNumber = (props) => {
						var [showPhoneInput, setShowPhoneInput] = (0,
							react.useState)(!1),
							[newPhoneNumber, setNewPhoneNumber] = (0,
							react.useState)(props.existingPhoneNumbers);
						var currentPhoneNumbers =
								props.existingPhoneNumbers &&
								Object.entries(
									props.existingPhoneNumbers,
								).filter(function isValidEntry(
									existingNumberEntry,
								) {
									var [phoneType, phoneNumber] =
										existingNumberEntry;
									return !(
										'id' === phoneType.toLowerCase() ||
										!phoneNumber
									);
								}),
							initNumbersEditState = {};
						Object.keys(props.existingPhoneNumbers || {}).map(
							(phoneType) =>
								Object.defineProperty(
									initNumbersEditState,
									phoneType,
									{ value: !1 },
								),
						);
						var [isPhoneInEditState, setPhoneEditState] = (0,
							react.useState)(initNumbersEditState),
							handleInputChange = (whichPhoneNumber) => (evt) => {
								if (newPhoneNumber) {
									var newState = UserPhoneNumber_objectSpread(
										UserPhoneNumber_objectSpread(
											{},
											newPhoneNumber,
										),
										{},
										{
											[whichPhoneNumber]:
												evt.target.value,
										},
									);
									setNewPhoneNumber(newState),
										props.callback(newState);
								}
							},
							putNumberInEditState = (phoneType) => () => {
								setPhoneEditState(
									UserPhoneNumber_objectSpread(
										UserPhoneNumber_objectSpread(
											{},
											isPhoneInEditState,
										),
										{},
										{ [phoneType]: !0 },
									),
								);
							},
							cancelNumberUpdate = (phoneType) => () => {
								if (newPhoneNumber) {
									var newState = UserPhoneNumber_objectSpread(
										UserPhoneNumber_objectSpread(
											{},
											newPhoneNumber,
										),
										{},
										{ [phoneType]: null },
									);
									setNewPhoneNumber(newState),
										props.callback(newState);
								}
								setPhoneEditState(
									UserPhoneNumber_objectSpread(
										UserPhoneNumber_objectSpread(
											{},
											isPhoneInEditState,
										),
										{},
										{ [phoneType]: !1 },
									),
								);
							},
							titleCopy =
								null != currentPhoneNumbers &&
								currentPhoneNumbers.length
									? 'Do we have the right number to contact you?'
									: "It looks like we don't have a phone number to contact you on.";
						return (
							showPhoneInput &&
								(titleCopy =
									'Please provide your current phone number.'),
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								'div',
								{
									css: (0, emotion_react_browser_esm.iv)(
										'background-color:',
										palette.n$[97],
										';padding:',
										space.D[3],
										'px;margin:',
										space.D[3],
										'px;',
										mq.Dp.tablet,
										'{padding:',
										space.D[5],
										'px;margin:',
										space.D[5],
										'px;}',
										'',
									),
									children: (0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										emotion_react_jsx_runtime_browser_esm.HY,
										{
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'p',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															typography.Kz0,
															';margin-bottom:',
															space.D[5],
															'px;',
															'',
														),
														children: ''.concat(
															titleCopy,
															' We will use this to get in touch with you about your subscription.',
														),
													},
												),
												null != currentPhoneNumbers &&
												currentPhoneNumbers.length
													? (0,
													  emotion_react_jsx_runtime_browser_esm.tZ)(
															'form',
															{
																css: (0,
																emotion_react_browser_esm.iv)(
																	'display:block;margin-bottom:',
																	space.D[5],
																	'px;',
																	'',
																),
																children:
																	currentPhoneNumbers.map(
																		(
																			_ref4,
																			index,
																		) => {
																			var [
																				phoneType,
																				phoneNumber,
																			] =
																				_ref4;
																			return (0,
																			emotion_react_jsx_runtime_browser_esm.tZ)(
																				react.Fragment,
																				{
																					children:
																						null !=
																							isPhoneInEditState &&
																						isPhoneInEditState[
																							phoneType
																						]
																							? (0,
																							  emotion_react_jsx_runtime_browser_esm.BX)(
																									'div',
																									{
																										css: (0,
																										emotion_react_browser_esm.iv)(
																											index >
																												0 &&
																												'margin-top: '.concat(
																													space
																														.D[3],
																													'px;',
																												),
																											';',
																											'',
																										),
																										children:
																											[
																												(0,
																												emotion_react_jsx_runtime_browser_esm.tZ)(
																													TextInput.o,
																													{
																														pattern:
																															'[0-9]{1,11}',
																														label: phoneType,
																														supporting:
																															'Enter your phone number',
																														width: 30,
																														cssOverrides:
																															UserPhoneNumber_ref3,
																														value:
																															(null ==
																															newPhoneNumber
																																? void 0
																																: newPhoneNumber[
																																		phoneType
																																  ]) ||
																															'',
																														onChange:
																															handleInputChange(
																																phoneType,
																															),
																													},
																													'phonenumberinput-'.concat(
																														index,
																													),
																												),
																												(0,
																												emotion_react_jsx_runtime_browser_esm.tZ)(
																													'span',
																													{
																														css: (0,
																														emotion_react_browser_esm.iv)(
																															typography.Kz0,
																															';text-decoration:underline;cursor:pointer;color:',
																															_generated_palette
																																.palette
																																.brand[500],
																															';margin-left:',
																															space
																																.D[3],
																															'px;',
																															'',
																														),
																														onClick:
																															cancelNumberUpdate(
																																phoneType,
																															),
																														children:
																															'Cancel',
																													},
																												),
																											],
																									},
																							  )
																							: (0,
																							  emotion_react_jsx_runtime_browser_esm.BX)(
																									'div',
																									{
																										css: (0,
																										emotion_react_browser_esm.iv)(
																											'display:block;',
																											typography.Kz0,
																											';',
																											index >
																												0 &&
																												'margin-top:'.concat(
																													space
																														.D[3],
																													'px;',
																												),
																											';',
																											'',
																										),
																										children:
																											[
																												(0,
																												emotion_react_jsx_runtime_browser_esm.BX)(
																													'span',
																													{
																														css: UserPhoneNumber_ref2,
																														children:
																															[
																																phoneType,
																																':',
																															],
																													},
																												),
																												(0,
																												emotion_react_jsx_runtime_browser_esm.tZ)(
																													'span',
																													{
																														css: (0,
																														emotion_react_browser_esm.iv)(
																															'color:',
																															palette
																																.n$[46],
																															';',
																															'',
																														),
																														children:
																															phoneNumber,
																													},
																												),
																												(0,
																												emotion_react_jsx_runtime_browser_esm.tZ)(
																													'span',
																													{
																														css: (0,
																														emotion_react_browser_esm.iv)(
																															'text-decoration:underline;cursor:pointer;color:',
																															_generated_palette
																																.palette
																																.brand[500],
																															';margin-left:',
																															space
																																.D[3],
																															'px;',
																															'',
																														),
																														onClick:
																															putNumberInEditState(
																																phoneType,
																															),
																														children:
																															'Update',
																													},
																												),
																											],
																									},
																							  ),
																				},
																				'phone-number-'.concat(
																					index,
																				),
																			);
																		},
																	),
															},
													  )
													: (0,
													  emotion_react_jsx_runtime_browser_esm.tZ)(
															emotion_react_jsx_runtime_browser_esm.HY,
															{
																children:
																	showPhoneInput
																		? (0,
																		  emotion_react_jsx_runtime_browser_esm.BX)(
																				emotion_react_jsx_runtime_browser_esm.HY,
																				{
																					children:
																						[
																							(0,
																							emotion_react_jsx_runtime_browser_esm.tZ)(
																								TextInput.o,
																								{
																									label: 'Phone number',
																									supporting:
																										'Enter your phone number',
																									width: 30,
																									cssOverrides:
																										(0,
																										emotion_react_browser_esm.iv)(
																											'max-width:100%;margin-bottom:',
																											space
																												.D[5],
																											'px;',
																											'',
																										),
																									value:
																										(null ==
																										newPhoneNumber
																											? void 0
																											: newPhoneNumber.Phone) ||
																										'',
																									onChange:
																										handleInputChange(
																											'Phone',
																										),
																								},
																							),
																							(0,
																							emotion_react_jsx_runtime_browser_esm.tZ)(
																								'span',
																								{
																									css: (0,
																									emotion_react_browser_esm.iv)(
																										typography.Kz0,
																										';text-decoration:underline;cursor:pointer;color:',
																										_generated_palette
																											.palette
																											.brand[500],
																										';margin-left:',
																										space
																											.D[3],
																										'px;',
																										'',
																									),
																									onClick:
																										() => {
																											var _props$existingPhoneN;
																											null !=
																												newPhoneNumber &&
																												newPhoneNumber.Phone &&
																												setNewPhoneNumber(
																													UserPhoneNumber_objectSpread(
																														UserPhoneNumber_objectSpread(
																															{},
																															newPhoneNumber,
																														),
																														{},
																														{
																															Phone:
																																null ===
																																	(_props$existingPhoneN =
																																		props.existingPhoneNumbers) ||
																																void 0 ===
																																	_props$existingPhoneN
																																	? void 0
																																	: _props$existingPhoneN.Phone,
																														},
																													),
																												);
																											setShowPhoneInput(
																												!1,
																											);
																										},
																									children:
																										'Cancel',
																								},
																							),
																						],
																				},
																		  )
																		: (0,
																		  emotion_react_jsx_runtime_browser_esm.tZ)(
																				Button.z,
																				{
																					priority:
																						'secondary',
																					onClick:
																						() => {
																							setShowPhoneInput(
																								!0,
																							);
																						},
																					children:
																						'Add phone number',
																				},
																		  ),
															},
													  ),
												(showPhoneInput ||
													(isPhoneInEditState &&
														Object.values(
															isPhoneInEditState,
														).some(
															(
																numberInEditState,
															) =>
																numberInEditState,
														))) &&
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'span',
														{
															css: (0,
															emotion_react_browser_esm.iv)(
																'position:relative;display:block;padding:0 ',
																space.D[5],
																'px 0 ',
																space.D[5] +
																	space.D[1],
																'px;',
																typography.VZD,
																';',
																'',
															),
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'i',
																	{
																		css: UserPhoneNumber_ref,
																		children:
																			(0,
																			emotion_react_jsx_runtime_browser_esm.tZ)(
																				InfoIconDark.J,
																				{
																					fillColor:
																						_generated_palette
																							.palette
																							.brand[500],
																				},
																			),
																	},
																),
																'Your number will be updated when you submit your report.',
															],
														},
													),
											],
										},
									),
								},
							)
						);
					};
				try {
					(UserPhoneNumber.displayName = 'UserPhoneNumber'),
						(UserPhoneNumber.__docgenInfo = {
							description: '',
							displayName: 'UserPhoneNumber',
							props: {
								existingPhoneNumbers: {
									defaultValue: null,
									description: '',
									name: 'existingPhoneNumbers',
									required: !1,
									type: { name: 'ContactPhoneNumbers' },
								},
								callback: {
									defaultValue: null,
									description: '',
									name: 'callback',
									required: !0,
									type: {
										name: '(phoneNumber: ContactPhoneNumbers) => void',
									},
								},
							},
						}),
						'undefined' != typeof STORYBOOK_REACT_CLASSES &&
							(STORYBOOK_REACT_CLASSES[
								'client/components/mma/delivery/records/UserPhoneNumber.tsx#UserPhoneNumber'
							] = {
								docgenInfo: UserPhoneNumber.__docgenInfo,
								name: 'UserPhoneNumber',
								path: 'client/components/mma/delivery/records/UserPhoneNumber.tsx#UserPhoneNumber',
							});
				} catch (__react_docgen_typescript_loader_error) {}
				function DeliveryRecordsProblemReview_ownKeys(e, r) {
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
				function DeliveryRecordsProblemReview_objectSpread(e) {
					for (var r = 1; r < arguments.length; r++) {
						var t = null != arguments[r] ? arguments[r] : {};
						r % 2
							? DeliveryRecordsProblemReview_ownKeys(
									Object(t),
									!0,
							  ).forEach(function (r) {
									DeliveryRecordsProblemReview_defineProperty(
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
							: DeliveryRecordsProblemReview_ownKeys(
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
				function DeliveryRecordsProblemReview_defineProperty(
					obj,
					key,
					value,
				) {
					return (
						(key =
							(function DeliveryRecordsProblemReview_toPropertyKey(
								arg,
							) {
								var key =
									(function DeliveryRecordsProblemReview_toPrimitive(
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
											if ('object' != typeof res)
												return res;
											throw new TypeError(
												'@@toPrimitive must return a primitive value.',
											);
										}
										return (
											'string' === hint ? String : Number
										)(input);
									})(arg, 'string');
								return 'symbol' == typeof key
									? key
									: String(key);
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
				var DeliveryRecordsProblemReview = () => {
						var routerState = (0, react_router.TH)().state,
							{ productDetail } = (0, react.useContext)(
								DeliveryRecordsContext,
							);
						if (!routerState)
							return (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								react_router.Fg,
								{ to: '..' },
							);
						var subscription = productDetail.subscription,
							isTestUser = productDetail.isTestUser,
							problemStartDate =
								routerState.affectedRecords[
									routerState.affectedRecords.length - 1
								].deliveryDate,
							problemEndDate =
								routerState.affectedRecords[0].deliveryDate;
						return routerState.showProblemCredit
							? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
									HolidayStopApi.En,
									{
										fetch: (0, HolidayStopApi.OX)(
											subscription.subscriptionId,
											(0, dates.sG)(problemStartDate)
												.date,
											(0, dates.sG)(problemEndDate).date,
											isTestUser,
										),
										render: (
											potentialHolidayStopsResponseWithCredits,
										) => {
											var totalCreditAmount =
												potentialHolidayStopsResponseWithCredits
													.potentials.length &&
												potentialHolidayStopsResponseWithCredits.potentials
													.flatMap((x) => [
														Math.abs(x.credit || 0),
													])
													.reduce(
														(
															accumulator,
															currentValue,
														) =>
															accumulator +
															currentValue,
													);
											return (0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												DeliveryRecordsProblemReviewFC,
												{
													showCredit: !0,
													creditDate:
														potentialHolidayStopsResponseWithCredits.nextInvoiceDateAfterToday,
													relatedPublications:
														potentialHolidayStopsResponseWithCredits.potentials,
													totalCreditAmount,
												},
											);
										},
										loadingMessage:
											'Generating your report',
									},
							  )
							: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
									DeliveryRecordsProblemReviewFC,
									{},
							  );
					},
					DeliveryRecordsProblemReview_ref = {
						name: '1xje3n0',
						styles: 'position:absolute;top:4px;left:0',
					},
					DeliveryRecordsProblemReview_ref2 = {
						name: '1r5gb7q',
						styles: 'display:inline-block',
					},
					DeliveryRecordsProblemReview_ref3 = {
						name: '1r5gb7q',
						styles: 'display:inline-block',
					},
					DeliveryRecordsProblemReview_ref4 = {
						name: '1xje3n0',
						styles: 'position:absolute;top:4px;left:0',
					},
					DeliveryRecordsProblemReview_ref5 = {
						name: 'ti75j2',
						styles: 'margin:0',
					},
					DeliveryRecordsProblemReview_ref6 = {
						name: '1ff36h2',
						styles: 'flex-grow:1',
					},
					DeliveryRecordsProblemReviewFC = (props) => {
						var _routerState$problemT,
							_routerState$problemT2,
							_routerState$problemT3,
							_routerState$problemT4,
							_routerState$affected,
							_routerState$affected2,
							routerState = (0, react_router.TH)().state,
							navigate = (0, react_router.s0)(),
							{ productType, productDetail, data } = (0,
							react.useContext)(DeliveryRecordsContext),
							mainPlan = (0, productResponse.fr)(
								productDetail.subscription,
							);
						if (!(0, productResponse.q4)(mainPlan))
							throw new Error(
								'mainPlan is not a PaidSubscriptionPlan in deliveryRecordsProblemReview',
							);
						var contactPhoneNumbers = data.contactPhoneNumbers,
							apiProductName =
								productType.delivery.records
									.productNameForProblemReport,
							repeatDeliveryProblem =
								checkForExistingDeliveryProblem(data.results),
							subscription = productDetail.subscription,
							productName = (0, lodash.capitalize)(
								productType.shortFriendlyName ||
									productType.friendlyName,
							),
							subscriptionCurrency = mainPlan.currency,
							deliveryProblemMap = data.deliveryProblemMap,
							[newPhoneNumbers, setPhoneNumbers] = (0,
							react.useState)(contactPhoneNumbers),
							[showCallCenterNumbers, setShowCallCenterNumbers] =
								(0, react.useState)(!1),
							dtCss =
								'\n    font-weight: bold;\n    display: inline-block;\n    vertical-align: top;\n    min-width: 12ch;\n    '.concat(
									mq.Dp.tablet,
									' {\n      min-width: 16ch;\n    }\n  ',
								),
							ddCss =
								'\n    margin: 0;\n    display: inline-block;\n    vertical-align: top;\n  ',
							deliveryIssuePostPayload =
								DeliveryRecordsProblemReview_objectSpread(
									{
										productName: apiProductName,
										description:
											null ===
												(_routerState$problemT =
													routerState.problemType) ||
											void 0 === _routerState$problemT
												? void 0
												: _routerState$problemT.message,
										problemType:
											null ===
												(_routerState$problemT2 =
													routerState.problemType) ||
											void 0 === _routerState$problemT2
												? void 0
												: _routerState$problemT2.category,
										repeatDeliveryProblem,
										deliveryRecords:
											props.showCredit &&
											props.relatedPublications
												? routerState.affectedRecords.map(
														(record) => {
															var _props$relatedPublica,
																matchingPublication =
																	null ===
																		(_props$relatedPublica =
																			props.relatedPublications) ||
																	void 0 ===
																		_props$relatedPublica
																		? void 0
																		: _props$relatedPublica.find(
																				(
																					x,
																				) =>
																					x.publicationDate ===
																					record.deliveryDate,
																		  );
															return {
																id: record.id,
																creditAmount:
																	null ==
																	matchingPublication
																		? void 0
																		: matchingPublication.credit,
																invoiceDate:
																	matchingPublication
																		? props.creditDate
																		: void 0,
															};
														},
												  )
												: routerState.affectedRecords.map(
														(record) => ({
															id: record.id,
														}),
												  ),
									},
									((null == newPhoneNumbers
										? void 0
										: newPhoneNumbers.Phone) ||
										(null == newPhoneNumbers
											? void 0
											: newPhoneNumbers.HomePhone) ||
										(null == newPhoneNumbers
											? void 0
											: newPhoneNumbers.MobilePhone) ||
										(null == newPhoneNumbers
											? void 0
											: newPhoneNumbers.OtherPhone)) && {
										newContactPhoneNumbers: newPhoneNumbers,
									},
								);
						return (0, emotion_react_jsx_runtime_browser_esm.BX)(
							DeliveryRecordCreditContext.Provider,
							{
								value: DeliveryRecordsProblemReview_objectSpread(
									DeliveryRecordsProblemReview_objectSpread(
										{
											showCredit:
												routerState.showProblemCredit,
										},
										props.totalCreditAmount && {
											creditAmount: ''
												.concat(subscriptionCurrency)
												.concat(
													props.totalCreditAmount.toFixed(
														2,
													),
												),
										},
									),
									props.creditDate && {
										creditDate:
											props.creditDate &&
											(0, dates.sG)(
												props.creditDate,
											).dateStr(),
									},
								),
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										ProgressIndicator.Y,
										{
											steps: [
												{ title: 'Update' },
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
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'h2',
										{
											css: (0,
											emotion_react_browser_esm.iv)(
												'border-top:1px solid ',
												_generated_palette.palette
													.neutral[86],
												';',
												typography.Hu7,
												';',
												mq.C4.tablet,
												'{font-size:1.25rem;line-height:1.6;}',
												'',
											),
											children: 'Delivery report review',
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'section',
										{
											css: (0,
											emotion_react_browser_esm.iv)(
												'border:1px solid ',
												_generated_palette.palette
													.neutral[86],
												';',
												'',
											),
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'h2',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															'margin:0;padding:',
															space.D[3],
															'px;background-color:',
															_generated_palette
																.palette
																.neutral[97],
															';border-bottom:1px solid ',
															_generated_palette
																.palette
																.neutral[86],
															';',
															typography.Rcn,
															';',
															mq.Dp.tablet,
															'{padding:',
															space.D[3],
															'px ',
															space.D[5],
															'px;}',
															'',
														),
														children:
															'Step 4. Please review your report details',
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'dl',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															'padding:0 ',
															space.D[3],
															'px;',
															typography.Kz0,
															';display:flex;flex-wrap:wrap;flex-direction:column;justify-content:space-between;',
															mq.Dp.tablet,
															'{flex-direction:initial;padding:0 ',
															space.D[5],
															'px;}',
															'',
														),
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'div',
																{
																	css: DeliveryRecordsProblemReview_ref6,
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'dt',
																			{
																				css: (0,
																				emotion_react_browser_esm.iv)(
																					dtCss,
																					';',
																					'',
																				),
																				children:
																					'Subscription ID:',
																			},
																		),
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'dd',
																			{
																				css: (0,
																				emotion_react_browser_esm.iv)(
																					ddCss,
																					';',
																					'',
																				),
																				'data-qm-masking':
																					'blocklist',
																				children:
																					subscription.subscriptionId,
																			},
																		),
																	],
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'div',
																{
																	css: (0,
																	emotion_react_browser_esm.iv)(
																		'flex-grow:1;margin-top:16px;',
																		mq.Dp
																			.tablet,
																		'{margin-top:0;}',
																		'',
																	),
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'dt',
																			{
																				css: (0,
																				emotion_react_browser_esm.iv)(
																					dtCss,
																					' ',
																					mq
																						.Dp
																						.tablet,
																					'{min-width:10ch;}',
																					'',
																				),
																				children:
																					'Product:',
																			},
																		),
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'dd',
																			{
																				css: (0,
																				emotion_react_browser_esm.iv)(
																					ddCss,
																					';',
																					'',
																				),
																				children:
																					productName,
																			},
																		),
																	],
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'div',
																{
																	css: (0,
																	emotion_react_browser_esm.iv)(
																		'margin-top:16px;width:100%;',
																		mq.Dp
																			.tablet,
																		'{margin-top:',
																		space
																			.D[5],
																		'px;}',
																		'',
																	),
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'dt',
																			{
																				css: (0,
																				emotion_react_browser_esm.iv)(
																					dtCss,
																					';',
																					'',
																				),
																				children:
																					'Type of problem:',
																			},
																		),
																		(0,
																		emotion_react_jsx_runtime_browser_esm.BX)(
																			'dd',
																			{
																				css: (0,
																				emotion_react_browser_esm.iv)(
																					ddCss,
																					' max-width:calc(100% - 12ch);',
																					mq
																						.Dp
																						.tablet,
																					'{max-width:calc(100% - 16ch);}',
																					'',
																				),
																				children:
																					[
																						(0,
																						emotion_react_jsx_runtime_browser_esm.tZ)(
																							'h4',
																							{
																								css: (0,
																								emotion_react_browser_esm.iv)(
																									typography.Rcn,
																									';margin:0;',
																									'',
																								),
																								children:
																									routerState.problemType &&
																									routerState
																										.problemType
																										.category,
																							},
																						),
																						(null ===
																							(_routerState$problemT3 =
																								routerState.problemType) ||
																						void 0 ===
																							_routerState$problemT3
																							? void 0
																							: _routerState$problemT3.message) &&
																							(0,
																							emotion_react_jsx_runtime_browser_esm.tZ)(
																								'p',
																								{
																									css: DeliveryRecordsProblemReview_ref5,
																									children:
																										null ===
																											(_routerState$problemT4 =
																												routerState.problemType) ||
																										void 0 ===
																											_routerState$problemT4
																											? void 0
																											: _routerState$problemT4.message,
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
																	css: (0,
																	emotion_react_browser_esm.iv)(
																		'margin-top:16px;width:100%;',
																		mq.Dp
																			.tablet,
																		'{margin-top:',
																		space
																			.D[5],
																		'px;}',
																		'',
																	),
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'dt',
																			{
																				css: (0,
																				emotion_react_browser_esm.iv)(
																					dtCss,
																					';',
																					'',
																				),
																				children:
																					'Selected Issue(s):',
																			},
																		),
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'dd',
																			{
																				css: (0,
																				emotion_react_browser_esm.iv)(
																					ddCss,
																					' max-width:calc(100% - 12ch);',
																					mq
																						.Dp
																						.tablet,
																					'{max-width:calc(100% - 16ch);}',
																					'',
																				),
																				children:
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						'h4',
																						{
																							css: (0,
																							emotion_react_browser_esm.iv)(
																								typography.Kz0,
																								';margin:0;',
																								'',
																							),
																							children:
																								null ===
																									(_routerState$affected =
																										routerState.affectedRecords) ||
																								void 0 ===
																									_routerState$affected
																									? void 0
																									: _routerState$affected.length,
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
												routerState &&
												null !==
													(_routerState$affected2 =
														routerState.affectedRecords) &&
												void 0 !==
													_routerState$affected2 &&
												_routerState$affected2.length
													? (0,
													  emotion_react_jsx_runtime_browser_esm.tZ)(
															'div',
															{
																css: (0,
																emotion_react_browser_esm.iv)(
																	'padding:0 ',
																	space.D[3],
																	'px;margin-bottom:',
																	space.D[3],
																	'px;',
																	mq.Dp
																		.tablet,
																	'{padding:0 ',
																	space.D[5],
																	'px;margin-bottom:',
																	space.D[5],
																	'px;}',
																	'',
																),
																children:
																	routerState.affectedRecords.map(
																		(
																			deliveryRecord,
																			listIndex,
																		) =>
																			(0,
																			emotion_react_jsx_runtime_browser_esm.tZ)(
																				DeliveryRecordCard,
																				{
																					deliveryRecord,
																					listIndex,
																					pageStatus:
																						PageStatus.ReadOnly,
																					showDeliveryInstructions:
																						productType
																							.delivery
																							.records
																							.showDeliveryInstructions,
																					deliveryProblemMap,
																				},
																				deliveryRecord.id,
																			),
																	),
															},
													  )
													: (0,
													  emotion_react_jsx_runtime_browser_esm.tZ)(
															'p',
															{
																children:
																	"There aren't any delivery records to show you yet",
															},
													  ),
												routerState.showProblemCredit &&
												props.totalCreditAmount
													? (0,
													  emotion_react_jsx_runtime_browser_esm.BX)(
															emotion_react_jsx_runtime_browser_esm.HY,
															{
																children: [
																	(0,
																	emotion_react_jsx_runtime_browser_esm.BX)(
																		'span',
																		{
																			css: (0,
																			emotion_react_browser_esm.iv)(
																				'position:relative;display:block;margin:',
																				space
																					.D[3],
																				'px;padding:0 ',
																				space
																					.D[3],
																				'px 0 ',
																				space
																					.D[5] +
																					space
																						.D[2],
																				'px;',
																				typography.Kz0,
																				';',
																				mq
																					.Dp
																					.tablet,
																				'{margin:',
																				space
																					.D[5],
																				'px;padding:0 ',
																				space
																					.D[5],
																				'px 0 ',
																				space
																					.D[5] +
																					space
																						.D[2],
																				'px;}',
																				'',
																			),
																			children:
																				[
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						'i',
																						{
																							css: DeliveryRecordsProblemReview_ref4,
																							children:
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									InfoIconDark.J,
																									{
																										fillColor:
																											_generated_palette
																												.palette
																												.brand[500],
																									},
																								),
																						},
																					),
																					'We apologise for any inconvenience caused and will credit you the amount shown below once you submit your report. We continually review these reports and use them to improve our service. If you’re not satisfied with this outcome please',
																					' ',
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						'span',
																						{
																							css: (0,
																							emotion_react_browser_esm.iv)(
																								'color:',
																								_generated_palette
																									.palette
																									.brand[500],
																								';text-decoration:underline;cursor:pointer;',
																								'',
																							),
																							onClick:
																								() =>
																									setShowCallCenterNumbers(
																										!showCallCenterNumbers,
																									),
																							children:
																								'contact us',
																						},
																					),
																					' ',
																					'instead of submitting your report.',
																				],
																		},
																	),
																	(0,
																	emotion_react_jsx_runtime_browser_esm.BX)(
																		'dl',
																		{
																			css: (0,
																			emotion_react_browser_esm.iv)(
																				typography.Kz0,
																				';padding:',
																				space
																					.D[3],
																				'px;margin:',
																				space
																					.D[3],
																				'px;background-color:',
																				_generated_palette
																					.palette
																					.neutral[97],
																				';',
																				mq
																					.Dp
																					.tablet,
																				'{padding:',
																				space
																					.D[5],
																				'px;margin:',
																				space
																					.D[5],
																				'px;}',
																				'',
																			),
																			children:
																				[
																					(0,
																					emotion_react_jsx_runtime_browser_esm.BX)(
																						'div',
																						{
																							css: DeliveryRecordsProblemReview_ref3,
																							children:
																								[
																									(0,
																									emotion_react_jsx_runtime_browser_esm.tZ)(
																										'dt',
																										{
																											css: (0,
																											emotion_react_browser_esm.iv)(
																												'display:inline-block;font-weight:bold;min-width:12ch;',
																												mq
																													.Dp
																													.tablet,
																												'{min-width:0;}',
																												'',
																											),
																											children:
																												'Credit amount:',
																										},
																									),
																									(0,
																									emotion_react_jsx_runtime_browser_esm.BX)(
																										'dd',
																										{
																											css: (0,
																											emotion_react_browser_esm.iv)(
																												'display:inline-block;margin-left:0;font-weight:bold;',
																												mq
																													.Dp
																													.tablet,
																												'{margin-left:',
																												space
																													.D[9],
																												'px;min-width:9ch;}',
																												'',
																											),
																											children:
																												[
																													subscriptionCurrency,
																													props.totalCreditAmount.toFixed(
																														2,
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
																							css: DeliveryRecordsProblemReview_ref2,
																							children:
																								[
																									(0,
																									emotion_react_jsx_runtime_browser_esm.tZ)(
																										'dt',
																										{
																											css: (0,
																											emotion_react_browser_esm.iv)(
																												'display:inline-block;font-weight:bold;min-width:12ch;',
																												mq
																													.Dp
																													.tablet,
																												'{min-width:0;}',
																												'',
																											),
																											children:
																												'Credit date:',
																										},
																									),
																									(0,
																									emotion_react_jsx_runtime_browser_esm.tZ)(
																										'dd',
																										{
																											css: (0,
																											emotion_react_browser_esm.iv)(
																												'display:inline-block;margin-left:0;',
																												mq
																													.Dp
																													.tablet,
																												'{margin-left:',
																												space
																													.D[9],
																												'px;}',
																												'',
																											),
																											children:
																												props.creditDate &&
																												(0,
																												dates.sG)(
																													props.creditDate,
																												).dateStr(),
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
													: (0,
													  emotion_react_jsx_runtime_browser_esm.BX)(
															emotion_react_jsx_runtime_browser_esm.HY,
															{
																children: [
																	(0,
																	emotion_react_jsx_runtime_browser_esm.BX)(
																		'span',
																		{
																			css: (0,
																			emotion_react_browser_esm.iv)(
																				'position:relative;display:block;margin:',
																				space
																					.D[3],
																				'px;padding:0 ',
																				space
																					.D[3],
																				'px 0 ',
																				space
																					.D[5] +
																					space
																						.D[2],
																				'px;',
																				typography.Kz0,
																				';',
																				mq
																					.Dp
																					.tablet,
																				'{margin:',
																				space
																					.D[5],
																				'px;padding:0 ',
																				space
																					.D[5],
																				'px 0 ',
																				space
																					.D[5] +
																					space
																						.D[2],
																				'px;}',
																				'',
																			),
																			children:
																				[
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						'i',
																						{
																							css: DeliveryRecordsProblemReview_ref,
																							children:
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									InfoIconDark.J,
																									{
																										fillColor:
																											_generated_palette
																												.palette
																												.brand[500],
																									},
																								),
																						},
																					),
																					'Once you submit your report, your case will be marked as high priority. Our customer service team will try their best to contact you as soon as possible to resolve the issue.',
																				],
																		},
																	),
																	newPhoneNumbers &&
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			UserPhoneNumber,
																			{
																				existingPhoneNumbers:
																					contactPhoneNumbers,
																				callback:
																					(
																						newNumbers,
																					) => {
																						setPhoneNumbers(
																							newNumbers,
																						);
																					},
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
											css: (0,
											emotion_react_browser_esm.iv)(
												'margin-top:',
												space.D[9],
												'px;',
												'',
											),
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													Button.z,
													{
														onClick: () => {
															navigate(
																'../confirmed',
																{
																	state: {
																		productDetail,
																		affectedRecords:
																			routerState.affectedRecords,
																		deliveryIssuePostPayload,
																	},
																},
															);
														},
														children:
															'Submit your report',
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													Button.z,
													{
														cssOverrides: (0,
														emotion_react_browser_esm.iv)(
															typography.Kz0,
															';background-color:transparent;font-weight:bold;margin-left:22px;padding:0;color:',
															_generated_palette
																.palette
																.brand[400],
															';:hover{background-color:transparent;}',
															'',
														),
														onClick: () => {
															navigate('..', {
																state: {
																	productDetail,
																},
															});
														},
														children: 'Cancel',
													},
												),
											],
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										Stack.K,
										{
											space: 5,
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'p',
													{
														css: (0,
														emotion_react_browser_esm.iv)(
															typography.Kz0,
															';margin:',
															space.D[6],
															'px 0 0;color:',
															_generated_palette
																.palette
																.neutral[46],
															';',
															'',
														),
														children: [
															'If your delivery is not shown above, or you’d like to talk to someone,',
															' ',
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'span',
																{
																	css: (0,
																	emotion_react_browser_esm.iv)(
																		'color:',
																		_generated_palette
																			.palette
																			.brand[500],
																		';text-decoration:underline;cursor:pointer;',
																		'',
																	),
																	onClick:
																		() =>
																			setShowCallCenterNumbers(
																				!showCallCenterNumbers,
																			),
																	children:
																		'contact us',
																},
															),
														],
													},
												),
												showCallCenterNumbers &&
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														CallCenterEmailAndNumbers.K,
														{},
													),
											],
										},
									),
								],
							},
						);
					};
				const DeliveryRecords_stories = {
					component: DeliveryRecordsContainer,
					title: 'Pages/DeliveryHistory',
					decorators: [ReactRouterDecorator.R],
					parameters: {
						reactRouter: {
							state: { productDetail: (0, testProducts.X8)() },
							container: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								DeliveryRecordsContainer,
								{ productType: productTypes.Pm.guardianweekly },
							),
						},
					},
				};
				var DeliveryHistory = {
						render: () =>
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								DeliveryRecords,
								{},
							),
						parameters: {
							msw: [
								http.d.get('/api/delivery-records/*', () =>
									HttpResponse.Z.json(
										deliveryRecordsWithDelivery,
									),
								),
							],
						},
					},
					Review = {
						render: () =>
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								DeliveryRecordsProblemReview,
								{},
							),
						parameters: {
							msw: [
								http.d.get('/api/delivery-records/*', () =>
									HttpResponse.Z.json(
										deliveryRecordsWithDelivery,
									),
								),
							],
							reactRouter: {
								state: {
									affectedRecords:
										deliveryRecordsWithDelivery.results,
								},
							},
						},
					},
					Confirmation = {
						render: () =>
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								DeliveryRecordsProblemConfirmation,
								{},
							),
						parameters: {
							msw: [
								http.d.get('/api/delivery-records/*', () =>
									HttpResponse.Z.json(
										deliveryRecordsWithDelivery,
									),
								),
								http.d.post('/api/delivery-records/*', () =>
									HttpResponse.Z.json(
										deliveryRecordsWithDelivery,
									),
								),
							],
						},
					};
				(DeliveryHistory.parameters = {
					...DeliveryHistory.parameters,
					docs: {
						...DeliveryHistory.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <DeliveryRecords />;\n  },\n  parameters: {\n    msw: [http.get('/api/delivery-records/*', () => {\n      return HttpResponse.json(deliveryRecordsWithDelivery);\n    })]\n  }\n}",
							...DeliveryHistory.parameters?.docs?.source,
						},
					},
				}),
					(Review.parameters = {
						...Review.parameters,
						docs: {
							...Review.parameters?.docs,
							source: {
								originalSource:
									"{\n  render: () => {\n    return <DeliveryRecordsProblemReview />;\n  },\n  parameters: {\n    msw: [http.get('/api/delivery-records/*', () => {\n      return HttpResponse.json(deliveryRecordsWithDelivery);\n    })],\n    reactRouter: {\n      state: {\n        affectedRecords: deliveryRecordsWithDelivery.results\n      }\n    }\n  }\n}",
								...Review.parameters?.docs?.source,
							},
						},
					}),
					(Confirmation.parameters = {
						...Confirmation.parameters,
						docs: {
							...Confirmation.parameters?.docs,
							source: {
								originalSource:
									"{\n  render: () => {\n    return <DeliveryRecordsProblemConfirmation />;\n  },\n  parameters: {\n    msw: [http.get('/api/delivery-records/*', () => {\n      return HttpResponse.json(deliveryRecordsWithDelivery);\n    }), http.post('/api/delivery-records/*', () => {\n      return HttpResponse.json(deliveryRecordsWithDelivery);\n    })]\n  }\n}",
								...Confirmation.parameters?.docs?.source,
							},
						},
					});
				const __namedExportsOrder = [
					'DeliveryHistory',
					'Review',
					'Confirmation',
				];
			},
	},
]);
