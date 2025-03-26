'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[4938],
	{
		'./client/components/mma/shared/ProductInfoTableV2.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				X: () => ProductInfoTableV2,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
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
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_5__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
				_shared_dates__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__('./shared/dates.ts'),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				valueBoxCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(
					'background-color:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.neutral[97],
					';padding:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[4],
					'px ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[6],
					'px;',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__.C4
						.tablet,
					'{padding:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[4],
					'px ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[4],
					'px;}',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__.Dp
						.tablet,
					'{display:flex;}border-radius:4px;',
					'',
				),
				tableEntryCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_5__.Kz0,
					';margin-right:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[2],
					'px;',
					'',
				),
				tableValueCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_5__.Kz0,
					';color:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.neutral[38],
					';',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__.Dp
						.tablet,
					'{padding-right:32px;}',
					'',
				),
				boxSpacingCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(
					'display:flex;',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__.C4
						.tablet,
					'{justify-content:space-between;}',
					'',
				),
				ProductInfoTableV2 = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.tZ)(
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.HY,
						{
							children: (0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.BX)(
								'div',
								{
									css: valueBoxCss,
									children: [
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.BX)(
											'div',
											{
												css: boxSpacingCss,
												children: [
													(0,
													_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.tZ)(
														'span',
														{
															css: tableEntryCss,
															children:
																'Subscription ID',
														},
													),
													(0,
													_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.tZ)(
														'span',
														{
															css: tableValueCss,
															children:
																props
																	.productDetail
																	.subscription
																	.subscriptionId,
														},
													),
												],
											},
										),
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.tZ)(
											'section',
											{
												css: (0,
												_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(
													_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
														.C4.tablet,
													'{border-top:1px solid ',
													_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
														.palette.neutral[86],
													';padding-top:',
													_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
														.D[3],
													'px;margin-top:',
													_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
														.D[3],
													'px;}',
													'',
												),
												children: (0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.BX)(
													'div',
													{
														css: boxSpacingCss,
														children: [
															(0,
															_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.tZ)(
																'span',
																{
																	css: tableEntryCss,
																	children:
																		'Start Date',
																},
															),
															(0,
															_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.tZ)(
																'span',
																{
																	css: tableValueCss,
																	children:
																		props
																			.productDetail
																			.subscription
																			.start
																			? (0,
																			  _shared_dates__WEBPACK_IMPORTED_MODULE_0__.sG)(
																					props
																						.productDetail
																						.subscription
																						.start,
																			  ).dateStr()
																			: '-',
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
						},
					);
			try {
				(ProductInfoTableV2.displayName = 'ProductInfoTableV2'),
					(ProductInfoTableV2.__docgenInfo = {
						description: '',
						displayName: 'ProductInfoTableV2',
						props: {
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
							'client/components/mma/shared/ProductInfoTableV2.tsx#ProductInfoTableV2'
						] = {
							docgenInfo: ProductInfoTableV2.__docgenInfo,
							name: 'ProductInfoTableV2',
							path: 'client/components/mma/shared/ProductInfoTableV2.tsx#ProductInfoTableV2',
						});
			} catch (__react_docgen_typescript_loader_error) {}
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
		'./client/components/mma/shared/ProductInfoTableV2.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					Default: () => Default,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => __WEBPACK_DEFAULT_EXPORT__,
				});
			var _client_components_mma_shared_ProductInfoTableV2__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./client/components/mma/shared/ProductInfoTableV2.tsx',
					),
				_client_fixtures_productBuilder_testProducts__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./client/fixtures/productBuilder/testProducts.ts',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			const __WEBPACK_DEFAULT_EXPORT__ = {
				title: 'Components/ProductInfoTableV2',
				component:
					_client_components_mma_shared_ProductInfoTableV2__WEBPACK_IMPORTED_MODULE_0__.X,
			};
			var Default = () =>
				(0, _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
					_client_components_mma_shared_ProductInfoTableV2__WEBPACK_IMPORTED_MODULE_0__.X,
					{
						productDetail: (0,
						_client_fixtures_productBuilder_testProducts__WEBPACK_IMPORTED_MODULE_1__.IB)(),
					},
				);
			Default.parameters = {
				...Default.parameters,
				docs: {
					...Default.parameters?.docs,
					source: {
						originalSource:
							'() => <ProductInfoTableV2 productDetail={digitalPackPaidByDirectDebit()} />',
						...Default.parameters?.docs?.source,
					},
				},
			};
			const __namedExportsOrder = ['Default'];
		},
	},
]);
