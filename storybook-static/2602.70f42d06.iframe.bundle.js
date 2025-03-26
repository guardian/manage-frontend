'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[2602],
	{
		'./node_modules/@guardian/libs/dist/isOneOf/isOneOf.js': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { g: () => isOneOf });
			const isOneOf = (literals) => (value) => literals.includes(value);
		},
		'./node_modules/date-fns/esm/_lib/format/longFormatters/index.js': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			function dateLongFormatter(pattern, formatLong) {
				switch (pattern) {
					case 'P':
						return formatLong.date({ width: 'short' });
					case 'PP':
						return formatLong.date({ width: 'medium' });
					case 'PPP':
						return formatLong.date({ width: 'long' });
					default:
						return formatLong.date({ width: 'full' });
				}
			}
			function timeLongFormatter(pattern, formatLong) {
				switch (pattern) {
					case 'p':
						return formatLong.time({ width: 'short' });
					case 'pp':
						return formatLong.time({ width: 'medium' });
					case 'ppp':
						return formatLong.time({ width: 'long' });
					default:
						return formatLong.time({ width: 'full' });
				}
			}
			__webpack_require__.d(__webpack_exports__, {
				Z: () => __WEBPACK_DEFAULT_EXPORT__,
			});
			const __WEBPACK_DEFAULT_EXPORT__ = {
				p: timeLongFormatter,
				P: function dateTimeLongFormatter(pattern, formatLong) {
					var dateTimeFormat,
						matchResult = pattern.match(/(P+)(p+)?/),
						datePattern = matchResult[1],
						timePattern = matchResult[2];
					if (!timePattern)
						return dateLongFormatter(pattern, formatLong);
					switch (datePattern) {
						case 'P':
							dateTimeFormat = formatLong.dateTime({
								width: 'short',
							});
							break;
						case 'PP':
							dateTimeFormat = formatLong.dateTime({
								width: 'medium',
							});
							break;
						case 'PPP':
							dateTimeFormat = formatLong.dateTime({
								width: 'long',
							});
							break;
						default:
							dateTimeFormat = formatLong.dateTime({
								width: 'full',
							});
					}
					return dateTimeFormat
						.replace(
							'{{date}}',
							dateLongFormatter(datePattern, formatLong),
						)
						.replace(
							'{{time}}',
							timeLongFormatter(timePattern, formatLong),
						);
				},
			};
		},
		'./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => getTimezoneOffsetInMilliseconds,
				});
				var MILLISECONDS_IN_MINUTE = 6e4;
				function getDateMillisecondsPart(date) {
					return date.getTime() % MILLISECONDS_IN_MINUTE;
				}
				function getTimezoneOffsetInMilliseconds(dirtyDate) {
					var date = new Date(dirtyDate.getTime()),
						baseTimezoneOffset = Math.ceil(
							date.getTimezoneOffset(),
						);
					date.setSeconds(0, 0);
					var millisecondsPartOfTimezoneOffset =
						baseTimezoneOffset > 0
							? (MILLISECONDS_IN_MINUTE +
									getDateMillisecondsPart(date)) %
							  MILLISECONDS_IN_MINUTE
							: getDateMillisecondsPart(date);
					return (
						baseTimezoneOffset * MILLISECONDS_IN_MINUTE +
						millisecondsPartOfTimezoneOffset
					);
				}
			},
		'./node_modules/date-fns/esm/_lib/getUTCISOWeek/index.js': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				Z: () => getUTCISOWeek,
			});
			var toDate = __webpack_require__(
					'./node_modules/date-fns/esm/toDate/index.js',
				),
				startOfUTCISOWeek = __webpack_require__(
					'./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js',
				),
				getUTCISOWeekYear = __webpack_require__(
					'./node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js',
				),
				requiredArgs = __webpack_require__(
					'./node_modules/date-fns/esm/_lib/requiredArgs/index.js',
				);
			var MILLISECONDS_IN_WEEK = 6048e5;
			function getUTCISOWeek(dirtyDate) {
				(0, requiredArgs.Z)(1, arguments);
				var date = (0, toDate.Z)(dirtyDate),
					diff =
						(0, startOfUTCISOWeek.Z)(date).getTime() -
						(function startOfUTCISOWeekYear(dirtyDate) {
							(0, requiredArgs.Z)(1, arguments);
							var year = (0, getUTCISOWeekYear.Z)(dirtyDate),
								fourthOfJanuary = new Date(0);
							return (
								fourthOfJanuary.setUTCFullYear(year, 0, 4),
								fourthOfJanuary.setUTCHours(0, 0, 0, 0),
								(0, startOfUTCISOWeek.Z)(fourthOfJanuary)
							);
						})(date).getTime();
				return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
			}
		},
		'./node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				Z: () => getUTCISOWeekYear,
			});
			var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/date-fns/esm/toDate/index.js',
					),
				_startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js',
					),
				_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/date-fns/esm/_lib/requiredArgs/index.js',
					);
			function getUTCISOWeekYear(dirtyDate) {
				(0, _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.Z)(
					1,
					arguments,
				);
				var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__.Z)(
						dirtyDate,
					),
					year = date.getUTCFullYear(),
					fourthOfJanuaryOfNextYear = new Date(0);
				fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4),
					fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
				var startOfNextYear = (0,
					_startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__.Z)(
						fourthOfJanuaryOfNextYear,
					),
					fourthOfJanuaryOfThisYear = new Date(0);
				fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4),
					fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
				var startOfThisYear = (0,
				_startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__.Z)(
					fourthOfJanuaryOfThisYear,
				);
				return date.getTime() >= startOfNextYear.getTime()
					? year + 1
					: date.getTime() >= startOfThisYear.getTime()
					? year
					: year - 1;
			}
		},
		'./node_modules/date-fns/esm/_lib/getUTCWeek/index.js': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { Z: () => getUTCWeek });
			var toDate = __webpack_require__(
					'./node_modules/date-fns/esm/toDate/index.js',
				),
				startOfUTCWeek = __webpack_require__(
					'./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js',
				),
				toInteger = __webpack_require__(
					'./node_modules/date-fns/esm/_lib/toInteger/index.js',
				),
				getUTCWeekYear = __webpack_require__(
					'./node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js',
				),
				requiredArgs = __webpack_require__(
					'./node_modules/date-fns/esm/_lib/requiredArgs/index.js',
				);
			var MILLISECONDS_IN_WEEK = 6048e5;
			function getUTCWeek(dirtyDate, options) {
				(0, requiredArgs.Z)(1, arguments);
				var date = (0, toDate.Z)(dirtyDate),
					diff =
						(0, startOfUTCWeek.Z)(date, options).getTime() -
						(function startOfUTCWeekYear(dirtyDate, dirtyOptions) {
							(0, requiredArgs.Z)(1, arguments);
							var options = dirtyOptions || {},
								locale = options.locale,
								localeFirstWeekContainsDate =
									locale &&
									locale.options &&
									locale.options.firstWeekContainsDate,
								defaultFirstWeekContainsDate =
									null == localeFirstWeekContainsDate
										? 1
										: (0, toInteger.Z)(
												localeFirstWeekContainsDate,
										  ),
								firstWeekContainsDate =
									null == options.firstWeekContainsDate
										? defaultFirstWeekContainsDate
										: (0, toInteger.Z)(
												options.firstWeekContainsDate,
										  ),
								year = (0, getUTCWeekYear.Z)(
									dirtyDate,
									dirtyOptions,
								),
								firstWeek = new Date(0);
							return (
								firstWeek.setUTCFullYear(
									year,
									0,
									firstWeekContainsDate,
								),
								firstWeek.setUTCHours(0, 0, 0, 0),
								(0, startOfUTCWeek.Z)(firstWeek, dirtyOptions)
							);
						})(date, options).getTime();
				return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
			}
		},
		'./node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				Z: () => getUTCWeekYear,
			});
			var _toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/date-fns/esm/_lib/toInteger/index.js',
					),
				_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/date-fns/esm/toDate/index.js',
					),
				_startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js',
					),
				_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/date-fns/esm/_lib/requiredArgs/index.js',
					);
			function getUTCWeekYear(dirtyDate, dirtyOptions) {
				(0, _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.Z)(
					1,
					arguments,
				);
				var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__.Z)(
						dirtyDate,
						dirtyOptions,
					),
					year = date.getUTCFullYear(),
					options = dirtyOptions || {},
					locale = options.locale,
					localeFirstWeekContainsDate =
						locale &&
						locale.options &&
						locale.options.firstWeekContainsDate,
					defaultFirstWeekContainsDate =
						null == localeFirstWeekContainsDate
							? 1
							: (0,
							  _toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__.Z)(
									localeFirstWeekContainsDate,
							  ),
					firstWeekContainsDate =
						null == options.firstWeekContainsDate
							? defaultFirstWeekContainsDate
							: (0,
							  _toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__.Z)(
									options.firstWeekContainsDate,
							  );
				if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7))
					throw new RangeError(
						'firstWeekContainsDate must be between 1 and 7 inclusively',
					);
				var firstWeekOfNextYear = new Date(0);
				firstWeekOfNextYear.setUTCFullYear(
					year + 1,
					0,
					firstWeekContainsDate,
				),
					firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
				var startOfNextYear = (0,
					_startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_3__.Z)(
						firstWeekOfNextYear,
						dirtyOptions,
					),
					firstWeekOfThisYear = new Date(0);
				firstWeekOfThisYear.setUTCFullYear(
					year,
					0,
					firstWeekContainsDate,
				),
					firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
				var startOfThisYear = (0,
				_startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_3__.Z)(
					firstWeekOfThisYear,
					dirtyOptions,
				);
				return date.getTime() >= startOfNextYear.getTime()
					? year + 1
					: date.getTime() >= startOfThisYear.getTime()
					? year
					: year - 1;
			}
		},
		'./node_modules/date-fns/esm/_lib/protectedTokens/index.js': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				Do: () => isProtectedWeekYearToken,
				Iu: () => isProtectedDayOfYearToken,
				qp: () => throwProtectedError,
			});
			var protectedDayOfYearTokens = ['D', 'DD'],
				protectedWeekYearTokens = ['YY', 'YYYY'];
			function isProtectedDayOfYearToken(token) {
				return -1 !== protectedDayOfYearTokens.indexOf(token);
			}
			function isProtectedWeekYearToken(token) {
				return -1 !== protectedWeekYearTokens.indexOf(token);
			}
			function throwProtectedError(token, format, input) {
				if ('YYYY' === token)
					throw new RangeError(
						'Use `yyyy` instead of `YYYY` (in `'
							.concat(
								format,
								'`) for formatting years to the input `',
							)
							.concat(input, '`; see: https://git.io/fxCyr'),
					);
				if ('YY' === token)
					throw new RangeError(
						'Use `yy` instead of `YY` (in `'
							.concat(
								format,
								'`) for formatting years to the input `',
							)
							.concat(input, '`; see: https://git.io/fxCyr'),
					);
				if ('D' === token)
					throw new RangeError(
						'Use `d` instead of `D` (in `'
							.concat(
								format,
								'`) for formatting days of the month to the input `',
							)
							.concat(input, '`; see: https://git.io/fxCyr'),
					);
				if ('DD' === token)
					throw new RangeError(
						'Use `dd` instead of `DD` (in `'
							.concat(
								format,
								'`) for formatting days of the month to the input `',
							)
							.concat(input, '`; see: https://git.io/fxCyr'),
					);
			}
		},
		'./node_modules/date-fns/esm/_lib/requiredArgs/index.js': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			function requiredArgs(required, args) {
				if (args.length < required)
					throw new TypeError(
						required +
							' argument' +
							(required > 1 ? 's' : '') +
							' required, but only ' +
							args.length +
							' present',
					);
			}
			__webpack_require__.d(__webpack_exports__, {
				Z: () => requiredArgs,
			});
		},
		'./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				Z: () => startOfUTCISOWeek,
			});
			var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/date-fns/esm/toDate/index.js',
					),
				_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/date-fns/esm/_lib/requiredArgs/index.js',
					);
			function startOfUTCISOWeek(dirtyDate) {
				(0, _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.Z)(
					1,
					arguments,
				);
				var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__.Z)(
						dirtyDate,
					),
					day = date.getUTCDay(),
					diff = (day < 1 ? 7 : 0) + day - 1;
				return (
					date.setUTCDate(date.getUTCDate() - diff),
					date.setUTCHours(0, 0, 0, 0),
					date
				);
			}
		},
		'./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				Z: () => startOfUTCWeek,
			});
			var _toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/date-fns/esm/_lib/toInteger/index.js',
					),
				_toDate_index_js__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/date-fns/esm/toDate/index.js',
					),
				_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/date-fns/esm/_lib/requiredArgs/index.js',
					);
			function startOfUTCWeek(dirtyDate, dirtyOptions) {
				(0, _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.Z)(
					1,
					arguments,
				);
				var options = dirtyOptions || {},
					locale = options.locale,
					localeWeekStartsOn =
						locale && locale.options && locale.options.weekStartsOn,
					defaultWeekStartsOn =
						null == localeWeekStartsOn
							? 0
							: (0,
							  _toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__.Z)(
									localeWeekStartsOn,
							  ),
					weekStartsOn =
						null == options.weekStartsOn
							? defaultWeekStartsOn
							: (0,
							  _toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__.Z)(
									options.weekStartsOn,
							  );
				if (!(weekStartsOn >= 0 && weekStartsOn <= 6))
					throw new RangeError(
						'weekStartsOn must be between 0 and 6 inclusively',
					);
				var date = (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_2__.Z)(
						dirtyDate,
					),
					day = date.getUTCDay(),
					diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
				return (
					date.setUTCDate(date.getUTCDate() - diff),
					date.setUTCHours(0, 0, 0, 0),
					date
				);
			}
		},
		'./node_modules/date-fns/esm/_lib/toInteger/index.js': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			function toInteger(dirtyNumber) {
				if (
					null === dirtyNumber ||
					!0 === dirtyNumber ||
					!1 === dirtyNumber
				)
					return NaN;
				var number = Number(dirtyNumber);
				return isNaN(number)
					? number
					: number < 0
					? Math.ceil(number)
					: Math.floor(number);
			}
			__webpack_require__.d(__webpack_exports__, { Z: () => toInteger });
		},
		'./node_modules/date-fns/esm/format/index.js': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { Z: () => format });
			var toDate = __webpack_require__(
					'./node_modules/date-fns/esm/toDate/index.js',
				),
				requiredArgs = __webpack_require__(
					'./node_modules/date-fns/esm/_lib/requiredArgs/index.js',
				);
			var en_US = __webpack_require__(
					'./node_modules/date-fns/esm/locale/en-US/index.js',
				),
				subMilliseconds = __webpack_require__(
					'./node_modules/date-fns/esm/subMilliseconds/index.js',
				);
			function addLeadingZeros(number, targetLength) {
				for (
					var sign = number < 0 ? '-' : '',
						output = Math.abs(number).toString();
					output.length < targetLength;

				)
					output = '0' + output;
				return sign + output;
			}
			const lightFormatters = {
				y: function (date, token) {
					var signedYear = date.getUTCFullYear(),
						year = signedYear > 0 ? signedYear : 1 - signedYear;
					return addLeadingZeros(
						'yy' === token ? year % 100 : year,
						token.length,
					);
				},
				M: function (date, token) {
					var month = date.getUTCMonth();
					return 'M' === token
						? String(month + 1)
						: addLeadingZeros(month + 1, 2);
				},
				d: function (date, token) {
					return addLeadingZeros(date.getUTCDate(), token.length);
				},
				a: function (date, token) {
					var dayPeriodEnumValue =
						date.getUTCHours() / 12 >= 1 ? 'pm' : 'am';
					switch (token) {
						case 'a':
						case 'aa':
						case 'aaa':
							return dayPeriodEnumValue.toUpperCase();
						case 'aaaaa':
							return dayPeriodEnumValue[0];
						default:
							return 'am' === dayPeriodEnumValue
								? 'a.m.'
								: 'p.m.';
					}
				},
				h: function (date, token) {
					return addLeadingZeros(
						date.getUTCHours() % 12 || 12,
						token.length,
					);
				},
				H: function (date, token) {
					return addLeadingZeros(date.getUTCHours(), token.length);
				},
				m: function (date, token) {
					return addLeadingZeros(date.getUTCMinutes(), token.length);
				},
				s: function (date, token) {
					return addLeadingZeros(date.getUTCSeconds(), token.length);
				},
				S: function (date, token) {
					var numberOfDigits = token.length,
						milliseconds = date.getUTCMilliseconds();
					return addLeadingZeros(
						Math.floor(
							milliseconds * Math.pow(10, numberOfDigits - 3),
						),
						token.length,
					);
				},
			};
			var getUTCISOWeek = __webpack_require__(
					'./node_modules/date-fns/esm/_lib/getUTCISOWeek/index.js',
				),
				getUTCISOWeekYear = __webpack_require__(
					'./node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js',
				),
				getUTCWeek = __webpack_require__(
					'./node_modules/date-fns/esm/_lib/getUTCWeek/index.js',
				),
				getUTCWeekYear = __webpack_require__(
					'./node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js',
				),
				dayPeriodEnum_midnight = 'midnight',
				dayPeriodEnum_noon = 'noon',
				dayPeriodEnum_morning = 'morning',
				dayPeriodEnum_afternoon = 'afternoon',
				dayPeriodEnum_evening = 'evening',
				dayPeriodEnum_night = 'night';
			function formatTimezoneShort(offset, dirtyDelimiter) {
				var sign = offset > 0 ? '-' : '+',
					absOffset = Math.abs(offset),
					hours = Math.floor(absOffset / 60),
					minutes = absOffset % 60;
				if (0 === minutes) return sign + String(hours);
				var delimiter = dirtyDelimiter || '';
				return (
					sign +
					String(hours) +
					delimiter +
					addLeadingZeros(minutes, 2)
				);
			}
			function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
				return offset % 60 == 0
					? (offset > 0 ? '-' : '+') +
							addLeadingZeros(Math.abs(offset) / 60, 2)
					: formatTimezone(offset, dirtyDelimiter);
			}
			function formatTimezone(offset, dirtyDelimiter) {
				var delimiter = dirtyDelimiter || '',
					sign = offset > 0 ? '-' : '+',
					absOffset = Math.abs(offset);
				return (
					sign +
					addLeadingZeros(Math.floor(absOffset / 60), 2) +
					delimiter +
					addLeadingZeros(absOffset % 60, 2)
				);
			}
			const format_formatters = {
				G: function (date, token, localize) {
					var era = date.getUTCFullYear() > 0 ? 1 : 0;
					switch (token) {
						case 'G':
						case 'GG':
						case 'GGG':
							return localize.era(era, { width: 'abbreviated' });
						case 'GGGGG':
							return localize.era(era, { width: 'narrow' });
						default:
							return localize.era(era, { width: 'wide' });
					}
				},
				y: function (date, token, localize) {
					if ('yo' === token) {
						var signedYear = date.getUTCFullYear(),
							year = signedYear > 0 ? signedYear : 1 - signedYear;
						return localize.ordinalNumber(year, { unit: 'year' });
					}
					return lightFormatters.y(date, token);
				},
				Y: function (date, token, localize, options) {
					var signedWeekYear = (0, getUTCWeekYear.Z)(date, options),
						weekYear =
							signedWeekYear > 0
								? signedWeekYear
								: 1 - signedWeekYear;
					return 'YY' === token
						? addLeadingZeros(weekYear % 100, 2)
						: 'Yo' === token
						? localize.ordinalNumber(weekYear, { unit: 'year' })
						: addLeadingZeros(weekYear, token.length);
				},
				R: function (date, token) {
					return addLeadingZeros(
						(0, getUTCISOWeekYear.Z)(date),
						token.length,
					);
				},
				u: function (date, token) {
					return addLeadingZeros(date.getUTCFullYear(), token.length);
				},
				Q: function (date, token, localize) {
					var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
					switch (token) {
						case 'Q':
							return String(quarter);
						case 'QQ':
							return addLeadingZeros(quarter, 2);
						case 'Qo':
							return localize.ordinalNumber(quarter, {
								unit: 'quarter',
							});
						case 'QQQ':
							return localize.quarter(quarter, {
								width: 'abbreviated',
								context: 'formatting',
							});
						case 'QQQQQ':
							return localize.quarter(quarter, {
								width: 'narrow',
								context: 'formatting',
							});
						default:
							return localize.quarter(quarter, {
								width: 'wide',
								context: 'formatting',
							});
					}
				},
				q: function (date, token, localize) {
					var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
					switch (token) {
						case 'q':
							return String(quarter);
						case 'qq':
							return addLeadingZeros(quarter, 2);
						case 'qo':
							return localize.ordinalNumber(quarter, {
								unit: 'quarter',
							});
						case 'qqq':
							return localize.quarter(quarter, {
								width: 'abbreviated',
								context: 'standalone',
							});
						case 'qqqqq':
							return localize.quarter(quarter, {
								width: 'narrow',
								context: 'standalone',
							});
						default:
							return localize.quarter(quarter, {
								width: 'wide',
								context: 'standalone',
							});
					}
				},
				M: function (date, token, localize) {
					var month = date.getUTCMonth();
					switch (token) {
						case 'M':
						case 'MM':
							return lightFormatters.M(date, token);
						case 'Mo':
							return localize.ordinalNumber(month + 1, {
								unit: 'month',
							});
						case 'MMM':
							return localize.month(month, {
								width: 'abbreviated',
								context: 'formatting',
							});
						case 'MMMMM':
							return localize.month(month, {
								width: 'narrow',
								context: 'formatting',
							});
						default:
							return localize.month(month, {
								width: 'wide',
								context: 'formatting',
							});
					}
				},
				L: function (date, token, localize) {
					var month = date.getUTCMonth();
					switch (token) {
						case 'L':
							return String(month + 1);
						case 'LL':
							return addLeadingZeros(month + 1, 2);
						case 'Lo':
							return localize.ordinalNumber(month + 1, {
								unit: 'month',
							});
						case 'LLL':
							return localize.month(month, {
								width: 'abbreviated',
								context: 'standalone',
							});
						case 'LLLLL':
							return localize.month(month, {
								width: 'narrow',
								context: 'standalone',
							});
						default:
							return localize.month(month, {
								width: 'wide',
								context: 'standalone',
							});
					}
				},
				w: function (date, token, localize, options) {
					var week = (0, getUTCWeek.Z)(date, options);
					return 'wo' === token
						? localize.ordinalNumber(week, { unit: 'week' })
						: addLeadingZeros(week, token.length);
				},
				I: function (date, token, localize) {
					var isoWeek = (0, getUTCISOWeek.Z)(date);
					return 'Io' === token
						? localize.ordinalNumber(isoWeek, { unit: 'week' })
						: addLeadingZeros(isoWeek, token.length);
				},
				d: function (date, token, localize) {
					return 'do' === token
						? localize.ordinalNumber(date.getUTCDate(), {
								unit: 'date',
						  })
						: lightFormatters.d(date, token);
				},
				D: function (date, token, localize) {
					var dayOfYear = (function getUTCDayOfYear(dirtyDate) {
						(0, requiredArgs.Z)(1, arguments);
						var date = (0, toDate.Z)(dirtyDate),
							timestamp = date.getTime();
						date.setUTCMonth(0, 1), date.setUTCHours(0, 0, 0, 0);
						var difference = timestamp - date.getTime();
						return Math.floor(difference / 864e5) + 1;
					})(date);
					return 'Do' === token
						? localize.ordinalNumber(dayOfYear, {
								unit: 'dayOfYear',
						  })
						: addLeadingZeros(dayOfYear, token.length);
				},
				E: function (date, token, localize) {
					var dayOfWeek = date.getUTCDay();
					switch (token) {
						case 'E':
						case 'EE':
						case 'EEE':
							return localize.day(dayOfWeek, {
								width: 'abbreviated',
								context: 'formatting',
							});
						case 'EEEEE':
							return localize.day(dayOfWeek, {
								width: 'narrow',
								context: 'formatting',
							});
						case 'EEEEEE':
							return localize.day(dayOfWeek, {
								width: 'short',
								context: 'formatting',
							});
						default:
							return localize.day(dayOfWeek, {
								width: 'wide',
								context: 'formatting',
							});
					}
				},
				e: function (date, token, localize, options) {
					var dayOfWeek = date.getUTCDay(),
						localDayOfWeek =
							(dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
					switch (token) {
						case 'e':
							return String(localDayOfWeek);
						case 'ee':
							return addLeadingZeros(localDayOfWeek, 2);
						case 'eo':
							return localize.ordinalNumber(localDayOfWeek, {
								unit: 'day',
							});
						case 'eee':
							return localize.day(dayOfWeek, {
								width: 'abbreviated',
								context: 'formatting',
							});
						case 'eeeee':
							return localize.day(dayOfWeek, {
								width: 'narrow',
								context: 'formatting',
							});
						case 'eeeeee':
							return localize.day(dayOfWeek, {
								width: 'short',
								context: 'formatting',
							});
						default:
							return localize.day(dayOfWeek, {
								width: 'wide',
								context: 'formatting',
							});
					}
				},
				c: function (date, token, localize, options) {
					var dayOfWeek = date.getUTCDay(),
						localDayOfWeek =
							(dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
					switch (token) {
						case 'c':
							return String(localDayOfWeek);
						case 'cc':
							return addLeadingZeros(
								localDayOfWeek,
								token.length,
							);
						case 'co':
							return localize.ordinalNumber(localDayOfWeek, {
								unit: 'day',
							});
						case 'ccc':
							return localize.day(dayOfWeek, {
								width: 'abbreviated',
								context: 'standalone',
							});
						case 'ccccc':
							return localize.day(dayOfWeek, {
								width: 'narrow',
								context: 'standalone',
							});
						case 'cccccc':
							return localize.day(dayOfWeek, {
								width: 'short',
								context: 'standalone',
							});
						default:
							return localize.day(dayOfWeek, {
								width: 'wide',
								context: 'standalone',
							});
					}
				},
				i: function (date, token, localize) {
					var dayOfWeek = date.getUTCDay(),
						isoDayOfWeek = 0 === dayOfWeek ? 7 : dayOfWeek;
					switch (token) {
						case 'i':
							return String(isoDayOfWeek);
						case 'ii':
							return addLeadingZeros(isoDayOfWeek, token.length);
						case 'io':
							return localize.ordinalNumber(isoDayOfWeek, {
								unit: 'day',
							});
						case 'iii':
							return localize.day(dayOfWeek, {
								width: 'abbreviated',
								context: 'formatting',
							});
						case 'iiiii':
							return localize.day(dayOfWeek, {
								width: 'narrow',
								context: 'formatting',
							});
						case 'iiiiii':
							return localize.day(dayOfWeek, {
								width: 'short',
								context: 'formatting',
							});
						default:
							return localize.day(dayOfWeek, {
								width: 'wide',
								context: 'formatting',
							});
					}
				},
				a: function (date, token, localize) {
					var dayPeriodEnumValue =
						date.getUTCHours() / 12 >= 1 ? 'pm' : 'am';
					switch (token) {
						case 'a':
						case 'aa':
						case 'aaa':
							return localize.dayPeriod(dayPeriodEnumValue, {
								width: 'abbreviated',
								context: 'formatting',
							});
						case 'aaaaa':
							return localize.dayPeriod(dayPeriodEnumValue, {
								width: 'narrow',
								context: 'formatting',
							});
						default:
							return localize.dayPeriod(dayPeriodEnumValue, {
								width: 'wide',
								context: 'formatting',
							});
					}
				},
				b: function (date, token, localize) {
					var dayPeriodEnumValue,
						hours = date.getUTCHours();
					switch (
						((dayPeriodEnumValue =
							12 === hours
								? dayPeriodEnum_noon
								: 0 === hours
								? dayPeriodEnum_midnight
								: hours / 12 >= 1
								? 'pm'
								: 'am'),
						token)
					) {
						case 'b':
						case 'bb':
						case 'bbb':
							return localize.dayPeriod(dayPeriodEnumValue, {
								width: 'abbreviated',
								context: 'formatting',
							});
						case 'bbbbb':
							return localize.dayPeriod(dayPeriodEnumValue, {
								width: 'narrow',
								context: 'formatting',
							});
						default:
							return localize.dayPeriod(dayPeriodEnumValue, {
								width: 'wide',
								context: 'formatting',
							});
					}
				},
				B: function (date, token, localize) {
					var dayPeriodEnumValue,
						hours = date.getUTCHours();
					switch (
						((dayPeriodEnumValue =
							hours >= 17
								? dayPeriodEnum_evening
								: hours >= 12
								? dayPeriodEnum_afternoon
								: hours >= 4
								? dayPeriodEnum_morning
								: dayPeriodEnum_night),
						token)
					) {
						case 'B':
						case 'BB':
						case 'BBB':
							return localize.dayPeriod(dayPeriodEnumValue, {
								width: 'abbreviated',
								context: 'formatting',
							});
						case 'BBBBB':
							return localize.dayPeriod(dayPeriodEnumValue, {
								width: 'narrow',
								context: 'formatting',
							});
						default:
							return localize.dayPeriod(dayPeriodEnumValue, {
								width: 'wide',
								context: 'formatting',
							});
					}
				},
				h: function (date, token, localize) {
					if ('ho' === token) {
						var hours = date.getUTCHours() % 12;
						return (
							0 === hours && (hours = 12),
							localize.ordinalNumber(hours, { unit: 'hour' })
						);
					}
					return lightFormatters.h(date, token);
				},
				H: function (date, token, localize) {
					return 'Ho' === token
						? localize.ordinalNumber(date.getUTCHours(), {
								unit: 'hour',
						  })
						: lightFormatters.H(date, token);
				},
				K: function (date, token, localize) {
					var hours = date.getUTCHours() % 12;
					return 'Ko' === token
						? localize.ordinalNumber(hours, { unit: 'hour' })
						: addLeadingZeros(hours, token.length);
				},
				k: function (date, token, localize) {
					var hours = date.getUTCHours();
					return (
						0 === hours && (hours = 24),
						'ko' === token
							? localize.ordinalNumber(hours, { unit: 'hour' })
							: addLeadingZeros(hours, token.length)
					);
				},
				m: function (date, token, localize) {
					return 'mo' === token
						? localize.ordinalNumber(date.getUTCMinutes(), {
								unit: 'minute',
						  })
						: lightFormatters.m(date, token);
				},
				s: function (date, token, localize) {
					return 'so' === token
						? localize.ordinalNumber(date.getUTCSeconds(), {
								unit: 'second',
						  })
						: lightFormatters.s(date, token);
				},
				S: function (date, token) {
					return lightFormatters.S(date, token);
				},
				X: function (date, token, _localize, options) {
					var timezoneOffset = (
						options._originalDate || date
					).getTimezoneOffset();
					if (0 === timezoneOffset) return 'Z';
					switch (token) {
						case 'X':
							return formatTimezoneWithOptionalMinutes(
								timezoneOffset,
							);
						case 'XXXX':
						case 'XX':
							return formatTimezone(timezoneOffset);
						default:
							return formatTimezone(timezoneOffset, ':');
					}
				},
				x: function (date, token, _localize, options) {
					var timezoneOffset = (
						options._originalDate || date
					).getTimezoneOffset();
					switch (token) {
						case 'x':
							return formatTimezoneWithOptionalMinutes(
								timezoneOffset,
							);
						case 'xxxx':
						case 'xx':
							return formatTimezone(timezoneOffset);
						default:
							return formatTimezone(timezoneOffset, ':');
					}
				},
				O: function (date, token, _localize, options) {
					var timezoneOffset = (
						options._originalDate || date
					).getTimezoneOffset();
					switch (token) {
						case 'O':
						case 'OO':
						case 'OOO':
							return (
								'GMT' + formatTimezoneShort(timezoneOffset, ':')
							);
						default:
							return 'GMT' + formatTimezone(timezoneOffset, ':');
					}
				},
				z: function (date, token, _localize, options) {
					var timezoneOffset = (
						options._originalDate || date
					).getTimezoneOffset();
					switch (token) {
						case 'z':
						case 'zz':
						case 'zzz':
							return (
								'GMT' + formatTimezoneShort(timezoneOffset, ':')
							);
						default:
							return 'GMT' + formatTimezone(timezoneOffset, ':');
					}
				},
				t: function (date, token, _localize, options) {
					var originalDate = options._originalDate || date;
					return addLeadingZeros(
						Math.floor(originalDate.getTime() / 1e3),
						token.length,
					);
				},
				T: function (date, token, _localize, options) {
					return addLeadingZeros(
						(options._originalDate || date).getTime(),
						token.length,
					);
				},
			};
			var longFormatters = __webpack_require__(
					'./node_modules/date-fns/esm/_lib/format/longFormatters/index.js',
				),
				getTimezoneOffsetInMilliseconds = __webpack_require__(
					'./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js',
				),
				protectedTokens = __webpack_require__(
					'./node_modules/date-fns/esm/_lib/protectedTokens/index.js',
				),
				toInteger = __webpack_require__(
					'./node_modules/date-fns/esm/_lib/toInteger/index.js',
				),
				formattingTokensRegExp =
					/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
				longFormattingTokensRegExp =
					/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
				escapedStringRegExp = /^'([^]*?)'?$/,
				doubleQuoteRegExp = /''/g,
				unescapedLatinCharacterRegExp = /[a-zA-Z]/;
			function format(dirtyDate, dirtyFormatStr, dirtyOptions) {
				(0, requiredArgs.Z)(2, arguments);
				var formatStr = String(dirtyFormatStr),
					options = dirtyOptions || {},
					locale = options.locale || en_US.Z,
					localeFirstWeekContainsDate =
						locale.options && locale.options.firstWeekContainsDate,
					defaultFirstWeekContainsDate =
						null == localeFirstWeekContainsDate
							? 1
							: (0, toInteger.Z)(localeFirstWeekContainsDate),
					firstWeekContainsDate =
						null == options.firstWeekContainsDate
							? defaultFirstWeekContainsDate
							: (0, toInteger.Z)(options.firstWeekContainsDate);
				if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7))
					throw new RangeError(
						'firstWeekContainsDate must be between 1 and 7 inclusively',
					);
				var localeWeekStartsOn =
						locale.options && locale.options.weekStartsOn,
					defaultWeekStartsOn =
						null == localeWeekStartsOn
							? 0
							: (0, toInteger.Z)(localeWeekStartsOn),
					weekStartsOn =
						null == options.weekStartsOn
							? defaultWeekStartsOn
							: (0, toInteger.Z)(options.weekStartsOn);
				if (!(weekStartsOn >= 0 && weekStartsOn <= 6))
					throw new RangeError(
						'weekStartsOn must be between 0 and 6 inclusively',
					);
				if (!locale.localize)
					throw new RangeError(
						'locale must contain localize property',
					);
				if (!locale.formatLong)
					throw new RangeError(
						'locale must contain formatLong property',
					);
				var originalDate = (0, toDate.Z)(dirtyDate);
				if (
					!(function isValid(dirtyDate) {
						(0, requiredArgs.Z)(1, arguments);
						var date = (0, toDate.Z)(dirtyDate);
						return !isNaN(date);
					})(originalDate)
				)
					throw new RangeError('Invalid time value');
				var timezoneOffset = (0, getTimezoneOffsetInMilliseconds.Z)(
						originalDate,
					),
					utcDate = (0, subMilliseconds.Z)(
						originalDate,
						timezoneOffset,
					),
					formatterOptions = {
						firstWeekContainsDate,
						weekStartsOn,
						locale,
						_originalDate: originalDate,
					};
				return formatStr
					.match(longFormattingTokensRegExp)
					.map(function (substring) {
						var firstCharacter = substring[0];
						return 'p' === firstCharacter || 'P' === firstCharacter
							? (0, longFormatters.Z[firstCharacter])(
									substring,
									locale.formatLong,
									formatterOptions,
							  )
							: substring;
					})
					.join('')
					.match(formattingTokensRegExp)
					.map(function (substring) {
						if ("''" === substring) return "'";
						var firstCharacter = substring[0];
						if ("'" === firstCharacter)
							return (function cleanEscapedString(input) {
								return input
									.match(escapedStringRegExp)[1]
									.replace(doubleQuoteRegExp, "'");
							})(substring);
						var formatter = format_formatters[firstCharacter];
						if (formatter)
							return (
								!options.useAdditionalWeekYearTokens &&
									(0, protectedTokens.Do)(substring) &&
									(0, protectedTokens.qp)(
										substring,
										dirtyFormatStr,
										dirtyDate,
									),
								!options.useAdditionalDayOfYearTokens &&
									(0, protectedTokens.Iu)(substring) &&
									(0, protectedTokens.qp)(
										substring,
										dirtyFormatStr,
										dirtyDate,
									),
								formatter(
									utcDate,
									substring,
									locale.localize,
									formatterOptions,
								)
							);
						if (firstCharacter.match(unescapedLatinCharacterRegExp))
							throw new RangeError(
								'Format string contains an unescaped latin alphabet character `' +
									firstCharacter +
									'`',
							);
						return substring;
					})
					.join('');
			}
		},
		'./node_modules/date-fns/esm/locale/en-US/index.js': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { Z: () => en_US });
			var formatDistanceLocale = {
				lessThanXSeconds: {
					one: 'less than a second',
					other: 'less than {{count}} seconds',
				},
				xSeconds: { one: '1 second', other: '{{count}} seconds' },
				halfAMinute: 'half a minute',
				lessThanXMinutes: {
					one: 'less than a minute',
					other: 'less than {{count}} minutes',
				},
				xMinutes: { one: '1 minute', other: '{{count}} minutes' },
				aboutXHours: {
					one: 'about 1 hour',
					other: 'about {{count}} hours',
				},
				xHours: { one: '1 hour', other: '{{count}} hours' },
				xDays: { one: '1 day', other: '{{count}} days' },
				aboutXWeeks: {
					one: 'about 1 week',
					other: 'about {{count}} weeks',
				},
				xWeeks: { one: '1 week', other: '{{count}} weeks' },
				aboutXMonths: {
					one: 'about 1 month',
					other: 'about {{count}} months',
				},
				xMonths: { one: '1 month', other: '{{count}} months' },
				aboutXYears: {
					one: 'about 1 year',
					other: 'about {{count}} years',
				},
				xYears: { one: '1 year', other: '{{count}} years' },
				overXYears: {
					one: 'over 1 year',
					other: 'over {{count}} years',
				},
				almostXYears: {
					one: 'almost 1 year',
					other: 'almost {{count}} years',
				},
			};
			function buildFormatLongFn(args) {
				return function (dirtyOptions) {
					var options = dirtyOptions || {},
						width = options.width
							? String(options.width)
							: args.defaultWidth;
					return (
						args.formats[width] || args.formats[args.defaultWidth]
					);
				};
			}
			var formatLong = {
				date: buildFormatLongFn({
					formats: {
						full: 'EEEE, MMMM do, y',
						long: 'MMMM do, y',
						medium: 'MMM d, y',
						short: 'MM/dd/yyyy',
					},
					defaultWidth: 'full',
				}),
				time: buildFormatLongFn({
					formats: {
						full: 'h:mm:ss a zzzz',
						long: 'h:mm:ss a z',
						medium: 'h:mm:ss a',
						short: 'h:mm a',
					},
					defaultWidth: 'full',
				}),
				dateTime: buildFormatLongFn({
					formats: {
						full: "{{date}} 'at' {{time}}",
						long: "{{date}} 'at' {{time}}",
						medium: '{{date}}, {{time}}',
						short: '{{date}}, {{time}}',
					},
					defaultWidth: 'full',
				}),
			};
			var formatRelativeLocale = {
				lastWeek: "'last' eeee 'at' p",
				yesterday: "'yesterday at' p",
				today: "'today at' p",
				tomorrow: "'tomorrow at' p",
				nextWeek: "eeee 'at' p",
				other: 'P',
			};
			function buildLocalizeFn(args) {
				return function (dirtyIndex, dirtyOptions) {
					var valuesArray,
						options = dirtyOptions || {};
					if (
						'formatting' ===
							(options.context
								? String(options.context)
								: 'standalone') &&
						args.formattingValues
					) {
						var defaultWidth =
								args.defaultFormattingWidth ||
								args.defaultWidth,
							width = options.width
								? String(options.width)
								: defaultWidth;
						valuesArray =
							args.formattingValues[width] ||
							args.formattingValues[defaultWidth];
					} else {
						var _defaultWidth = args.defaultWidth,
							_width = options.width
								? String(options.width)
								: args.defaultWidth;
						valuesArray =
							args.values[_width] || args.values[_defaultWidth];
					}
					return valuesArray[
						args.argumentCallback
							? args.argumentCallback(dirtyIndex)
							: dirtyIndex
					];
				};
			}
			function buildMatchFn(args) {
				return function (dirtyString, dirtyOptions) {
					var string = String(dirtyString),
						options = dirtyOptions || {},
						width = options.width,
						matchPattern =
							(width && args.matchPatterns[width]) ||
							args.matchPatterns[args.defaultMatchWidth],
						matchResult = string.match(matchPattern);
					if (!matchResult) return null;
					var value,
						matchedString = matchResult[0],
						parsePatterns =
							(width && args.parsePatterns[width]) ||
							args.parsePatterns[args.defaultParseWidth];
					return (
						(value =
							'[object Array]' ===
							Object.prototype.toString.call(parsePatterns)
								? (function findIndex(array, predicate) {
										for (
											var key = 0;
											key < array.length;
											key++
										)
											if (predicate(array[key]))
												return key;
								  })(parsePatterns, function (pattern) {
										return pattern.test(matchedString);
								  })
								: (function findKey(object, predicate) {
										for (var key in object)
											if (
												object.hasOwnProperty(key) &&
												predicate(object[key])
											)
												return key;
								  })(parsePatterns, function (pattern) {
										return pattern.test(matchedString);
								  })),
						(value = args.valueCallback
							? args.valueCallback(value)
							: value),
						{
							value: (value = options.valueCallback
								? options.valueCallback(value)
								: value),
							rest: string.slice(matchedString.length),
						}
					);
				};
			}
			const en_US = {
				code: 'en-US',
				formatDistance: function formatDistance(token, count, options) {
					var result;
					return (
						(options = options || {}),
						(result =
							'string' == typeof formatDistanceLocale[token]
								? formatDistanceLocale[token]
								: 1 === count
								? formatDistanceLocale[token].one
								: formatDistanceLocale[token].other.replace(
										'{{count}}',
										count,
								  )),
						options.addSuffix
							? options.comparison > 0
								? 'in ' + result
								: result + ' ago'
							: result
					);
				},
				formatLong,
				formatRelative: function formatRelative(
					token,
					_date,
					_baseDate,
					_options,
				) {
					return formatRelativeLocale[token];
				},
				localize: {
					ordinalNumber: function ordinalNumber(
						dirtyNumber,
						_dirtyOptions,
					) {
						var number = Number(dirtyNumber),
							rem100 = number % 100;
						if (rem100 > 20 || rem100 < 10)
							switch (rem100 % 10) {
								case 1:
									return number + 'st';
								case 2:
									return number + 'nd';
								case 3:
									return number + 'rd';
							}
						return number + 'th';
					},
					era: buildLocalizeFn({
						values: {
							narrow: ['B', 'A'],
							abbreviated: ['BC', 'AD'],
							wide: ['Before Christ', 'Anno Domini'],
						},
						defaultWidth: 'wide',
					}),
					quarter: buildLocalizeFn({
						values: {
							narrow: ['1', '2', '3', '4'],
							abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
							wide: [
								'1st quarter',
								'2nd quarter',
								'3rd quarter',
								'4th quarter',
							],
						},
						defaultWidth: 'wide',
						argumentCallback: function (quarter) {
							return Number(quarter) - 1;
						},
					}),
					month: buildLocalizeFn({
						values: {
							narrow: [
								'J',
								'F',
								'M',
								'A',
								'M',
								'J',
								'J',
								'A',
								'S',
								'O',
								'N',
								'D',
							],
							abbreviated: [
								'Jan',
								'Feb',
								'Mar',
								'Apr',
								'May',
								'Jun',
								'Jul',
								'Aug',
								'Sep',
								'Oct',
								'Nov',
								'Dec',
							],
							wide: [
								'January',
								'February',
								'March',
								'April',
								'May',
								'June',
								'July',
								'August',
								'September',
								'October',
								'November',
								'December',
							],
						},
						defaultWidth: 'wide',
					}),
					day: buildLocalizeFn({
						values: {
							narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
							short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
							abbreviated: [
								'Sun',
								'Mon',
								'Tue',
								'Wed',
								'Thu',
								'Fri',
								'Sat',
							],
							wide: [
								'Sunday',
								'Monday',
								'Tuesday',
								'Wednesday',
								'Thursday',
								'Friday',
								'Saturday',
							],
						},
						defaultWidth: 'wide',
					}),
					dayPeriod: buildLocalizeFn({
						values: {
							narrow: {
								am: 'a',
								pm: 'p',
								midnight: 'mi',
								noon: 'n',
								morning: 'morning',
								afternoon: 'afternoon',
								evening: 'evening',
								night: 'night',
							},
							abbreviated: {
								am: 'AM',
								pm: 'PM',
								midnight: 'midnight',
								noon: 'noon',
								morning: 'morning',
								afternoon: 'afternoon',
								evening: 'evening',
								night: 'night',
							},
							wide: {
								am: 'a.m.',
								pm: 'p.m.',
								midnight: 'midnight',
								noon: 'noon',
								morning: 'morning',
								afternoon: 'afternoon',
								evening: 'evening',
								night: 'night',
							},
						},
						defaultWidth: 'wide',
						formattingValues: {
							narrow: {
								am: 'a',
								pm: 'p',
								midnight: 'mi',
								noon: 'n',
								morning: 'in the morning',
								afternoon: 'in the afternoon',
								evening: 'in the evening',
								night: 'at night',
							},
							abbreviated: {
								am: 'AM',
								pm: 'PM',
								midnight: 'midnight',
								noon: 'noon',
								morning: 'in the morning',
								afternoon: 'in the afternoon',
								evening: 'in the evening',
								night: 'at night',
							},
							wide: {
								am: 'a.m.',
								pm: 'p.m.',
								midnight: 'midnight',
								noon: 'noon',
								morning: 'in the morning',
								afternoon: 'in the afternoon',
								evening: 'in the evening',
								night: 'at night',
							},
						},
						defaultFormattingWidth: 'wide',
					}),
				},
				match: {
					ordinalNumber: (function buildMatchPatternFn(args) {
						return function (dirtyString, dirtyOptions) {
							var string = String(dirtyString),
								options = dirtyOptions || {},
								matchResult = string.match(args.matchPattern);
							if (!matchResult) return null;
							var matchedString = matchResult[0],
								parseResult = string.match(args.parsePattern);
							if (!parseResult) return null;
							var value = args.valueCallback
								? args.valueCallback(parseResult[0])
								: parseResult[0];
							return {
								value: (value = options.valueCallback
									? options.valueCallback(value)
									: value),
								rest: string.slice(matchedString.length),
							};
						};
					})({
						matchPattern: /^(\d+)(th|st|nd|rd)?/i,
						parsePattern: /\d+/i,
						valueCallback: function (value) {
							return parseInt(value, 10);
						},
					}),
					era: buildMatchFn({
						matchPatterns: {
							narrow: /^(b|a)/i,
							abbreviated:
								/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
							wide: /^(before christ|before common era|anno domini|common era)/i,
						},
						defaultMatchWidth: 'wide',
						parsePatterns: { any: [/^b/i, /^(a|c)/i] },
						defaultParseWidth: 'any',
					}),
					quarter: buildMatchFn({
						matchPatterns: {
							narrow: /^[1234]/i,
							abbreviated: /^q[1234]/i,
							wide: /^[1234](th|st|nd|rd)? quarter/i,
						},
						defaultMatchWidth: 'wide',
						parsePatterns: { any: [/1/i, /2/i, /3/i, /4/i] },
						defaultParseWidth: 'any',
						valueCallback: function (index) {
							return index + 1;
						},
					}),
					month: buildMatchFn({
						matchPatterns: {
							narrow: /^[jfmasond]/i,
							abbreviated:
								/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
							wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
						},
						defaultMatchWidth: 'wide',
						parsePatterns: {
							narrow: [
								/^j/i,
								/^f/i,
								/^m/i,
								/^a/i,
								/^m/i,
								/^j/i,
								/^j/i,
								/^a/i,
								/^s/i,
								/^o/i,
								/^n/i,
								/^d/i,
							],
							any: [
								/^ja/i,
								/^f/i,
								/^mar/i,
								/^ap/i,
								/^may/i,
								/^jun/i,
								/^jul/i,
								/^au/i,
								/^s/i,
								/^o/i,
								/^n/i,
								/^d/i,
							],
						},
						defaultParseWidth: 'any',
					}),
					day: buildMatchFn({
						matchPatterns: {
							narrow: /^[smtwf]/i,
							short: /^(su|mo|tu|we|th|fr|sa)/i,
							abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
							wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
						},
						defaultMatchWidth: 'wide',
						parsePatterns: {
							narrow: [
								/^s/i,
								/^m/i,
								/^t/i,
								/^w/i,
								/^t/i,
								/^f/i,
								/^s/i,
							],
							any: [
								/^su/i,
								/^m/i,
								/^tu/i,
								/^w/i,
								/^th/i,
								/^f/i,
								/^sa/i,
							],
						},
						defaultParseWidth: 'any',
					}),
					dayPeriod: buildMatchFn({
						matchPatterns: {
							narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
							any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
						},
						defaultMatchWidth: 'any',
						parsePatterns: {
							any: {
								am: /^a/i,
								pm: /^p/i,
								midnight: /^mi/i,
								noon: /^no/i,
								morning: /morning/i,
								afternoon: /afternoon/i,
								evening: /evening/i,
								night: /night/i,
							},
						},
						defaultParseWidth: 'any',
					}),
				},
				options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
			};
		},
		'./node_modules/date-fns/esm/parse/index.js': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { Z: () => parse });
			var en_US = __webpack_require__(
					'./node_modules/date-fns/esm/locale/en-US/index.js',
				),
				subMilliseconds = __webpack_require__(
					'./node_modules/date-fns/esm/subMilliseconds/index.js',
				),
				toDate = __webpack_require__(
					'./node_modules/date-fns/esm/toDate/index.js',
				);
			function assign_assign(target, dirtyObject) {
				if (null == target)
					throw new TypeError(
						'assign requires that input parameter not be null or undefined',
					);
				for (var property in (dirtyObject = dirtyObject || {}))
					dirtyObject.hasOwnProperty(property) &&
						(target[property] = dirtyObject[property]);
				return target;
			}
			var longFormatters = __webpack_require__(
					'./node_modules/date-fns/esm/_lib/format/longFormatters/index.js',
				),
				getTimezoneOffsetInMilliseconds = __webpack_require__(
					'./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js',
				),
				protectedTokens = __webpack_require__(
					'./node_modules/date-fns/esm/_lib/protectedTokens/index.js',
				),
				toInteger = __webpack_require__(
					'./node_modules/date-fns/esm/_lib/toInteger/index.js',
				),
				getUTCWeekYear = __webpack_require__(
					'./node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js',
				),
				requiredArgs = __webpack_require__(
					'./node_modules/date-fns/esm/_lib/requiredArgs/index.js',
				);
			function setUTCDay(dirtyDate, dirtyDay, dirtyOptions) {
				(0, requiredArgs.Z)(2, arguments);
				var options = dirtyOptions || {},
					locale = options.locale,
					localeWeekStartsOn =
						locale && locale.options && locale.options.weekStartsOn,
					defaultWeekStartsOn =
						null == localeWeekStartsOn
							? 0
							: (0, toInteger.Z)(localeWeekStartsOn),
					weekStartsOn =
						null == options.weekStartsOn
							? defaultWeekStartsOn
							: (0, toInteger.Z)(options.weekStartsOn);
				if (!(weekStartsOn >= 0 && weekStartsOn <= 6))
					throw new RangeError(
						'weekStartsOn must be between 0 and 6 inclusively',
					);
				var date = (0, toDate.Z)(dirtyDate),
					day = (0, toInteger.Z)(dirtyDay),
					diff =
						(((day % 7) + 7) % 7 < weekStartsOn ? 7 : 0) +
						day -
						date.getUTCDay();
				return date.setUTCDate(date.getUTCDate() + diff), date;
			}
			var getUTCISOWeek = __webpack_require__(
				'./node_modules/date-fns/esm/_lib/getUTCISOWeek/index.js',
			);
			var getUTCWeek = __webpack_require__(
				'./node_modules/date-fns/esm/_lib/getUTCWeek/index.js',
			);
			var startOfUTCISOWeek = __webpack_require__(
					'./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js',
				),
				startOfUTCWeek = __webpack_require__(
					'./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js',
				),
				numericPatterns_month = /^(1[0-2]|0?\d)/,
				numericPatterns_date = /^(3[0-1]|[0-2]?\d)/,
				numericPatterns_dayOfYear = /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
				numericPatterns_week = /^(5[0-3]|[0-4]?\d)/,
				numericPatterns_hour23h = /^(2[0-3]|[0-1]?\d)/,
				numericPatterns_hour24h = /^(2[0-4]|[0-1]?\d)/,
				numericPatterns_hour11h = /^(1[0-1]|0?\d)/,
				numericPatterns_hour12h = /^(1[0-2]|0?\d)/,
				numericPatterns_minute = /^[0-5]?\d/,
				numericPatterns_second = /^[0-5]?\d/,
				numericPatterns_singleDigit = /^\d/,
				numericPatterns_twoDigits = /^\d{1,2}/,
				numericPatterns_threeDigits = /^\d{1,3}/,
				numericPatterns_fourDigits = /^\d{1,4}/,
				numericPatterns_anyDigitsSigned = /^-?\d+/,
				numericPatterns_singleDigitSigned = /^-?\d/,
				numericPatterns_twoDigitsSigned = /^-?\d{1,2}/,
				numericPatterns_threeDigitsSigned = /^-?\d{1,3}/,
				numericPatterns_fourDigitsSigned = /^-?\d{1,4}/,
				timezonePatterns_basicOptionalMinutes =
					/^([+-])(\d{2})(\d{2})?|Z/,
				timezonePatterns_basic = /^([+-])(\d{2})(\d{2})|Z/,
				timezonePatterns_basicOptionalSeconds =
					/^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
				timezonePatterns_extended = /^([+-])(\d{2}):(\d{2})|Z/,
				timezonePatterns_extendedOptionalSeconds =
					/^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/;
			function parseNumericPattern(pattern, string, valueCallback) {
				var matchResult = string.match(pattern);
				if (!matchResult) return null;
				var value = parseInt(matchResult[0], 10);
				return {
					value: valueCallback ? valueCallback(value) : value,
					rest: string.slice(matchResult[0].length),
				};
			}
			function parseTimezonePattern(pattern, string) {
				var matchResult = string.match(pattern);
				return matchResult
					? 'Z' === matchResult[0]
						? { value: 0, rest: string.slice(1) }
						: {
								value:
									('+' === matchResult[1] ? 1 : -1) *
									(36e5 *
										(matchResult[2]
											? parseInt(matchResult[2], 10)
											: 0) +
										6e4 *
											(matchResult[3]
												? parseInt(matchResult[3], 10)
												: 0) +
										1e3 *
											(matchResult[5]
												? parseInt(matchResult[5], 10)
												: 0)),
								rest: string.slice(matchResult[0].length),
						  }
					: null;
			}
			function parseAnyDigitsSigned(string, valueCallback) {
				return parseNumericPattern(
					numericPatterns_anyDigitsSigned,
					string,
					valueCallback,
				);
			}
			function parseNDigits(n, string, valueCallback) {
				switch (n) {
					case 1:
						return parseNumericPattern(
							numericPatterns_singleDigit,
							string,
							valueCallback,
						);
					case 2:
						return parseNumericPattern(
							numericPatterns_twoDigits,
							string,
							valueCallback,
						);
					case 3:
						return parseNumericPattern(
							numericPatterns_threeDigits,
							string,
							valueCallback,
						);
					case 4:
						return parseNumericPattern(
							numericPatterns_fourDigits,
							string,
							valueCallback,
						);
					default:
						return parseNumericPattern(
							new RegExp('^\\d{1,' + n + '}'),
							string,
							valueCallback,
						);
				}
			}
			function parseNDigitsSigned(n, string, valueCallback) {
				switch (n) {
					case 1:
						return parseNumericPattern(
							numericPatterns_singleDigitSigned,
							string,
							valueCallback,
						);
					case 2:
						return parseNumericPattern(
							numericPatterns_twoDigitsSigned,
							string,
							valueCallback,
						);
					case 3:
						return parseNumericPattern(
							numericPatterns_threeDigitsSigned,
							string,
							valueCallback,
						);
					case 4:
						return parseNumericPattern(
							numericPatterns_fourDigitsSigned,
							string,
							valueCallback,
						);
					default:
						return parseNumericPattern(
							new RegExp('^-?\\d{1,' + n + '}'),
							string,
							valueCallback,
						);
				}
			}
			function dayPeriodEnumToHours(enumValue) {
				switch (enumValue) {
					case 'morning':
						return 4;
					case 'evening':
						return 17;
					case 'pm':
					case 'noon':
					case 'afternoon':
						return 12;
					default:
						return 0;
				}
			}
			function normalizeTwoDigitYear(twoDigitYear, currentYear) {
				var result,
					isCommonEra = currentYear > 0,
					absCurrentYear = isCommonEra
						? currentYear
						: 1 - currentYear;
				if (absCurrentYear <= 50) result = twoDigitYear || 100;
				else {
					var rangeEnd = absCurrentYear + 50;
					result =
						twoDigitYear +
						100 * Math.floor(rangeEnd / 100) -
						(twoDigitYear >= rangeEnd % 100 ? 100 : 0);
				}
				return isCommonEra ? result : 1 - result;
			}
			var DAYS_IN_MONTH = [
					31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
				],
				DAYS_IN_MONTH_LEAP_YEAR = [
					31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
				];
			function isLeapYearIndex(year) {
				return year % 400 == 0 || (year % 4 == 0 && year % 100 != 0);
			}
			const _lib_parsers = {
				G: {
					priority: 140,
					parse: function (string, token, match, _options) {
						switch (token) {
							case 'G':
							case 'GG':
							case 'GGG':
								return (
									match.era(string, {
										width: 'abbreviated',
									}) || match.era(string, { width: 'narrow' })
								);
							case 'GGGGG':
								return match.era(string, { width: 'narrow' });
							default:
								return (
									match.era(string, { width: 'wide' }) ||
									match.era(string, {
										width: 'abbreviated',
									}) ||
									match.era(string, { width: 'narrow' })
								);
						}
					},
					set: function (date, flags, value, _options) {
						return (
							(flags.era = value),
							date.setUTCFullYear(value, 0, 1),
							date.setUTCHours(0, 0, 0, 0),
							date
						);
					},
					incompatibleTokens: ['R', 'u', 't', 'T'],
				},
				y: {
					priority: 130,
					parse: function (string, token, match, _options) {
						var valueCallback = function (year) {
							return { year, isTwoDigitYear: 'yy' === token };
						};
						switch (token) {
							case 'y':
								return parseNDigits(4, string, valueCallback);
							case 'yo':
								return match.ordinalNumber(string, {
									unit: 'year',
									valueCallback,
								});
							default:
								return parseNDigits(
									token.length,
									string,
									valueCallback,
								);
						}
					},
					validate: function (_date, value, _options) {
						return value.isTwoDigitYear || value.year > 0;
					},
					set: function (date, flags, value, _options) {
						var currentYear = date.getUTCFullYear();
						if (value.isTwoDigitYear) {
							var normalizedTwoDigitYear = normalizeTwoDigitYear(
								value.year,
								currentYear,
							);
							return (
								date.setUTCFullYear(
									normalizedTwoDigitYear,
									0,
									1,
								),
								date.setUTCHours(0, 0, 0, 0),
								date
							);
						}
						var year =
							'era' in flags && 1 !== flags.era
								? 1 - value.year
								: value.year;
						return (
							date.setUTCFullYear(year, 0, 1),
							date.setUTCHours(0, 0, 0, 0),
							date
						);
					},
					incompatibleTokens: [
						'Y',
						'R',
						'u',
						'w',
						'I',
						'i',
						'e',
						'c',
						't',
						'T',
					],
				},
				Y: {
					priority: 130,
					parse: function (string, token, match, _options) {
						var valueCallback = function (year) {
							return { year, isTwoDigitYear: 'YY' === token };
						};
						switch (token) {
							case 'Y':
								return parseNDigits(4, string, valueCallback);
							case 'Yo':
								return match.ordinalNumber(string, {
									unit: 'year',
									valueCallback,
								});
							default:
								return parseNDigits(
									token.length,
									string,
									valueCallback,
								);
						}
					},
					validate: function (_date, value, _options) {
						return value.isTwoDigitYear || value.year > 0;
					},
					set: function (date, flags, value, options) {
						var currentYear = (0, getUTCWeekYear.Z)(date, options);
						if (value.isTwoDigitYear) {
							var normalizedTwoDigitYear = normalizeTwoDigitYear(
								value.year,
								currentYear,
							);
							return (
								date.setUTCFullYear(
									normalizedTwoDigitYear,
									0,
									options.firstWeekContainsDate,
								),
								date.setUTCHours(0, 0, 0, 0),
								(0, startOfUTCWeek.Z)(date, options)
							);
						}
						var year =
							'era' in flags && 1 !== flags.era
								? 1 - value.year
								: value.year;
						return (
							date.setUTCFullYear(
								year,
								0,
								options.firstWeekContainsDate,
							),
							date.setUTCHours(0, 0, 0, 0),
							(0, startOfUTCWeek.Z)(date, options)
						);
					},
					incompatibleTokens: [
						'y',
						'R',
						'u',
						'Q',
						'q',
						'M',
						'L',
						'I',
						'd',
						'D',
						'i',
						't',
						'T',
					],
				},
				R: {
					priority: 130,
					parse: function (string, token, _match, _options) {
						return parseNDigitsSigned(
							'R' === token ? 4 : token.length,
							string,
						);
					},
					set: function (_date, _flags, value, _options) {
						var firstWeekOfYear = new Date(0);
						return (
							firstWeekOfYear.setUTCFullYear(value, 0, 4),
							firstWeekOfYear.setUTCHours(0, 0, 0, 0),
							(0, startOfUTCISOWeek.Z)(firstWeekOfYear)
						);
					},
					incompatibleTokens: [
						'G',
						'y',
						'Y',
						'u',
						'Q',
						'q',
						'M',
						'L',
						'w',
						'd',
						'D',
						'e',
						'c',
						't',
						'T',
					],
				},
				u: {
					priority: 130,
					parse: function (string, token, _match, _options) {
						return parseNDigitsSigned(
							'u' === token ? 4 : token.length,
							string,
						);
					},
					set: function (date, _flags, value, _options) {
						return (
							date.setUTCFullYear(value, 0, 1),
							date.setUTCHours(0, 0, 0, 0),
							date
						);
					},
					incompatibleTokens: [
						'G',
						'y',
						'Y',
						'R',
						'w',
						'I',
						'i',
						'e',
						'c',
						't',
						'T',
					],
				},
				Q: {
					priority: 120,
					parse: function (string, token, match, _options) {
						switch (token) {
							case 'Q':
							case 'QQ':
								return parseNDigits(token.length, string);
							case 'Qo':
								return match.ordinalNumber(string, {
									unit: 'quarter',
								});
							case 'QQQ':
								return (
									match.quarter(string, {
										width: 'abbreviated',
										context: 'formatting',
									}) ||
									match.quarter(string, {
										width: 'narrow',
										context: 'formatting',
									})
								);
							case 'QQQQQ':
								return match.quarter(string, {
									width: 'narrow',
									context: 'formatting',
								});
							default:
								return (
									match.quarter(string, {
										width: 'wide',
										context: 'formatting',
									}) ||
									match.quarter(string, {
										width: 'abbreviated',
										context: 'formatting',
									}) ||
									match.quarter(string, {
										width: 'narrow',
										context: 'formatting',
									})
								);
						}
					},
					validate: function (_date, value, _options) {
						return value >= 1 && value <= 4;
					},
					set: function (date, _flags, value, _options) {
						return (
							date.setUTCMonth(3 * (value - 1), 1),
							date.setUTCHours(0, 0, 0, 0),
							date
						);
					},
					incompatibleTokens: [
						'Y',
						'R',
						'q',
						'M',
						'L',
						'w',
						'I',
						'd',
						'D',
						'i',
						'e',
						'c',
						't',
						'T',
					],
				},
				q: {
					priority: 120,
					parse: function (string, token, match, _options) {
						switch (token) {
							case 'q':
							case 'qq':
								return parseNDigits(token.length, string);
							case 'qo':
								return match.ordinalNumber(string, {
									unit: 'quarter',
								});
							case 'qqq':
								return (
									match.quarter(string, {
										width: 'abbreviated',
										context: 'standalone',
									}) ||
									match.quarter(string, {
										width: 'narrow',
										context: 'standalone',
									})
								);
							case 'qqqqq':
								return match.quarter(string, {
									width: 'narrow',
									context: 'standalone',
								});
							default:
								return (
									match.quarter(string, {
										width: 'wide',
										context: 'standalone',
									}) ||
									match.quarter(string, {
										width: 'abbreviated',
										context: 'standalone',
									}) ||
									match.quarter(string, {
										width: 'narrow',
										context: 'standalone',
									})
								);
						}
					},
					validate: function (_date, value, _options) {
						return value >= 1 && value <= 4;
					},
					set: function (date, _flags, value, _options) {
						return (
							date.setUTCMonth(3 * (value - 1), 1),
							date.setUTCHours(0, 0, 0, 0),
							date
						);
					},
					incompatibleTokens: [
						'Y',
						'R',
						'Q',
						'M',
						'L',
						'w',
						'I',
						'd',
						'D',
						'i',
						'e',
						'c',
						't',
						'T',
					],
				},
				M: {
					priority: 110,
					parse: function (string, token, match, _options) {
						var valueCallback = function (value) {
							return value - 1;
						};
						switch (token) {
							case 'M':
								return parseNumericPattern(
									numericPatterns_month,
									string,
									valueCallback,
								);
							case 'MM':
								return parseNDigits(2, string, valueCallback);
							case 'Mo':
								return match.ordinalNumber(string, {
									unit: 'month',
									valueCallback,
								});
							case 'MMM':
								return (
									match.month(string, {
										width: 'abbreviated',
										context: 'formatting',
									}) ||
									match.month(string, {
										width: 'narrow',
										context: 'formatting',
									})
								);
							case 'MMMMM':
								return match.month(string, {
									width: 'narrow',
									context: 'formatting',
								});
							default:
								return (
									match.month(string, {
										width: 'wide',
										context: 'formatting',
									}) ||
									match.month(string, {
										width: 'abbreviated',
										context: 'formatting',
									}) ||
									match.month(string, {
										width: 'narrow',
										context: 'formatting',
									})
								);
						}
					},
					validate: function (_date, value, _options) {
						return value >= 0 && value <= 11;
					},
					set: function (date, _flags, value, _options) {
						return (
							date.setUTCMonth(value, 1),
							date.setUTCHours(0, 0, 0, 0),
							date
						);
					},
					incompatibleTokens: [
						'Y',
						'R',
						'q',
						'Q',
						'L',
						'w',
						'I',
						'D',
						'i',
						'e',
						'c',
						't',
						'T',
					],
				},
				L: {
					priority: 110,
					parse: function (string, token, match, _options) {
						var valueCallback = function (value) {
							return value - 1;
						};
						switch (token) {
							case 'L':
								return parseNumericPattern(
									numericPatterns_month,
									string,
									valueCallback,
								);
							case 'LL':
								return parseNDigits(2, string, valueCallback);
							case 'Lo':
								return match.ordinalNumber(string, {
									unit: 'month',
									valueCallback,
								});
							case 'LLL':
								return (
									match.month(string, {
										width: 'abbreviated',
										context: 'standalone',
									}) ||
									match.month(string, {
										width: 'narrow',
										context: 'standalone',
									})
								);
							case 'LLLLL':
								return match.month(string, {
									width: 'narrow',
									context: 'standalone',
								});
							default:
								return (
									match.month(string, {
										width: 'wide',
										context: 'standalone',
									}) ||
									match.month(string, {
										width: 'abbreviated',
										context: 'standalone',
									}) ||
									match.month(string, {
										width: 'narrow',
										context: 'standalone',
									})
								);
						}
					},
					validate: function (_date, value, _options) {
						return value >= 0 && value <= 11;
					},
					set: function (date, _flags, value, _options) {
						return (
							date.setUTCMonth(value, 1),
							date.setUTCHours(0, 0, 0, 0),
							date
						);
					},
					incompatibleTokens: [
						'Y',
						'R',
						'q',
						'Q',
						'M',
						'w',
						'I',
						'D',
						'i',
						'e',
						'c',
						't',
						'T',
					],
				},
				w: {
					priority: 100,
					parse: function (string, token, match, _options) {
						switch (token) {
							case 'w':
								return parseNumericPattern(
									numericPatterns_week,
									string,
								);
							case 'wo':
								return match.ordinalNumber(string, {
									unit: 'week',
								});
							default:
								return parseNDigits(token.length, string);
						}
					},
					validate: function (_date, value, _options) {
						return value >= 1 && value <= 53;
					},
					set: function (date, _flags, value, options) {
						return (0, startOfUTCWeek.Z)(
							(function setUTCWeek(
								dirtyDate,
								dirtyWeek,
								options,
							) {
								(0, requiredArgs.Z)(2, arguments);
								var date = (0, toDate.Z)(dirtyDate),
									week = (0, toInteger.Z)(dirtyWeek),
									diff =
										(0, getUTCWeek.Z)(date, options) - week;
								return (
									date.setUTCDate(
										date.getUTCDate() - 7 * diff,
									),
									date
								);
							})(date, value, options),
							options,
						);
					},
					incompatibleTokens: [
						'y',
						'R',
						'u',
						'q',
						'Q',
						'M',
						'L',
						'I',
						'd',
						'D',
						'i',
						't',
						'T',
					],
				},
				I: {
					priority: 100,
					parse: function (string, token, match, _options) {
						switch (token) {
							case 'I':
								return parseNumericPattern(
									numericPatterns_week,
									string,
								);
							case 'Io':
								return match.ordinalNumber(string, {
									unit: 'week',
								});
							default:
								return parseNDigits(token.length, string);
						}
					},
					validate: function (_date, value, _options) {
						return value >= 1 && value <= 53;
					},
					set: function (date, _flags, value, options) {
						return (0, startOfUTCISOWeek.Z)(
							(function setUTCISOWeek(dirtyDate, dirtyISOWeek) {
								(0, requiredArgs.Z)(2, arguments);
								var date = (0, toDate.Z)(dirtyDate),
									isoWeek = (0, toInteger.Z)(dirtyISOWeek),
									diff = (0, getUTCISOWeek.Z)(date) - isoWeek;
								return (
									date.setUTCDate(
										date.getUTCDate() - 7 * diff,
									),
									date
								);
							})(date, value, options),
							options,
						);
					},
					incompatibleTokens: [
						'y',
						'Y',
						'u',
						'q',
						'Q',
						'M',
						'L',
						'w',
						'd',
						'D',
						'e',
						'c',
						't',
						'T',
					],
				},
				d: {
					priority: 90,
					subPriority: 1,
					parse: function (string, token, match, _options) {
						switch (token) {
							case 'd':
								return parseNumericPattern(
									numericPatterns_date,
									string,
								);
							case 'do':
								return match.ordinalNumber(string, {
									unit: 'date',
								});
							default:
								return parseNDigits(token.length, string);
						}
					},
					validate: function (date, value, _options) {
						var isLeapYear = isLeapYearIndex(date.getUTCFullYear()),
							month = date.getUTCMonth();
						return isLeapYear
							? value >= 1 &&
									value <= DAYS_IN_MONTH_LEAP_YEAR[month]
							: value >= 1 && value <= DAYS_IN_MONTH[month];
					},
					set: function (date, _flags, value, _options) {
						return (
							date.setUTCDate(value),
							date.setUTCHours(0, 0, 0, 0),
							date
						);
					},
					incompatibleTokens: [
						'Y',
						'R',
						'q',
						'Q',
						'w',
						'I',
						'D',
						'i',
						'e',
						'c',
						't',
						'T',
					],
				},
				D: {
					priority: 90,
					subPriority: 1,
					parse: function (string, token, match, _options) {
						switch (token) {
							case 'D':
							case 'DD':
								return parseNumericPattern(
									numericPatterns_dayOfYear,
									string,
								);
							case 'Do':
								return match.ordinalNumber(string, {
									unit: 'date',
								});
							default:
								return parseNDigits(token.length, string);
						}
					},
					validate: function (date, value, _options) {
						return isLeapYearIndex(date.getUTCFullYear())
							? value >= 1 && value <= 366
							: value >= 1 && value <= 365;
					},
					set: function (date, _flags, value, _options) {
						return (
							date.setUTCMonth(0, value),
							date.setUTCHours(0, 0, 0, 0),
							date
						);
					},
					incompatibleTokens: [
						'Y',
						'R',
						'q',
						'Q',
						'M',
						'L',
						'w',
						'I',
						'd',
						'E',
						'i',
						'e',
						'c',
						't',
						'T',
					],
				},
				E: {
					priority: 90,
					parse: function (string, token, match, _options) {
						switch (token) {
							case 'E':
							case 'EE':
							case 'EEE':
								return (
									match.day(string, {
										width: 'abbreviated',
										context: 'formatting',
									}) ||
									match.day(string, {
										width: 'short',
										context: 'formatting',
									}) ||
									match.day(string, {
										width: 'narrow',
										context: 'formatting',
									})
								);
							case 'EEEEE':
								return match.day(string, {
									width: 'narrow',
									context: 'formatting',
								});
							case 'EEEEEE':
								return (
									match.day(string, {
										width: 'short',
										context: 'formatting',
									}) ||
									match.day(string, {
										width: 'narrow',
										context: 'formatting',
									})
								);
							default:
								return (
									match.day(string, {
										width: 'wide',
										context: 'formatting',
									}) ||
									match.day(string, {
										width: 'abbreviated',
										context: 'formatting',
									}) ||
									match.day(string, {
										width: 'short',
										context: 'formatting',
									}) ||
									match.day(string, {
										width: 'narrow',
										context: 'formatting',
									})
								);
						}
					},
					validate: function (_date, value, _options) {
						return value >= 0 && value <= 6;
					},
					set: function (date, _flags, value, options) {
						return (
							(date = setUTCDay(
								date,
								value,
								options,
							)).setUTCHours(0, 0, 0, 0),
							date
						);
					},
					incompatibleTokens: ['D', 'i', 'e', 'c', 't', 'T'],
				},
				e: {
					priority: 90,
					parse: function (string, token, match, options) {
						var valueCallback = function (value) {
							var wholeWeekDays = 7 * Math.floor((value - 1) / 7);
							return (
								((value + options.weekStartsOn + 6) % 7) +
								wholeWeekDays
							);
						};
						switch (token) {
							case 'e':
							case 'ee':
								return parseNDigits(
									token.length,
									string,
									valueCallback,
								);
							case 'eo':
								return match.ordinalNumber(string, {
									unit: 'day',
									valueCallback,
								});
							case 'eee':
								return (
									match.day(string, {
										width: 'abbreviated',
										context: 'formatting',
									}) ||
									match.day(string, {
										width: 'short',
										context: 'formatting',
									}) ||
									match.day(string, {
										width: 'narrow',
										context: 'formatting',
									})
								);
							case 'eeeee':
								return match.day(string, {
									width: 'narrow',
									context: 'formatting',
								});
							case 'eeeeee':
								return (
									match.day(string, {
										width: 'short',
										context: 'formatting',
									}) ||
									match.day(string, {
										width: 'narrow',
										context: 'formatting',
									})
								);
							default:
								return (
									match.day(string, {
										width: 'wide',
										context: 'formatting',
									}) ||
									match.day(string, {
										width: 'abbreviated',
										context: 'formatting',
									}) ||
									match.day(string, {
										width: 'short',
										context: 'formatting',
									}) ||
									match.day(string, {
										width: 'narrow',
										context: 'formatting',
									})
								);
						}
					},
					validate: function (_date, value, _options) {
						return value >= 0 && value <= 6;
					},
					set: function (date, _flags, value, options) {
						return (
							(date = setUTCDay(
								date,
								value,
								options,
							)).setUTCHours(0, 0, 0, 0),
							date
						);
					},
					incompatibleTokens: [
						'y',
						'R',
						'u',
						'q',
						'Q',
						'M',
						'L',
						'I',
						'd',
						'D',
						'E',
						'i',
						'c',
						't',
						'T',
					],
				},
				c: {
					priority: 90,
					parse: function (string, token, match, options) {
						var valueCallback = function (value) {
							var wholeWeekDays = 7 * Math.floor((value - 1) / 7);
							return (
								((value + options.weekStartsOn + 6) % 7) +
								wholeWeekDays
							);
						};
						switch (token) {
							case 'c':
							case 'cc':
								return parseNDigits(
									token.length,
									string,
									valueCallback,
								);
							case 'co':
								return match.ordinalNumber(string, {
									unit: 'day',
									valueCallback,
								});
							case 'ccc':
								return (
									match.day(string, {
										width: 'abbreviated',
										context: 'standalone',
									}) ||
									match.day(string, {
										width: 'short',
										context: 'standalone',
									}) ||
									match.day(string, {
										width: 'narrow',
										context: 'standalone',
									})
								);
							case 'ccccc':
								return match.day(string, {
									width: 'narrow',
									context: 'standalone',
								});
							case 'cccccc':
								return (
									match.day(string, {
										width: 'short',
										context: 'standalone',
									}) ||
									match.day(string, {
										width: 'narrow',
										context: 'standalone',
									})
								);
							default:
								return (
									match.day(string, {
										width: 'wide',
										context: 'standalone',
									}) ||
									match.day(string, {
										width: 'abbreviated',
										context: 'standalone',
									}) ||
									match.day(string, {
										width: 'short',
										context: 'standalone',
									}) ||
									match.day(string, {
										width: 'narrow',
										context: 'standalone',
									})
								);
						}
					},
					validate: function (_date, value, _options) {
						return value >= 0 && value <= 6;
					},
					set: function (date, _flags, value, options) {
						return (
							(date = setUTCDay(
								date,
								value,
								options,
							)).setUTCHours(0, 0, 0, 0),
							date
						);
					},
					incompatibleTokens: [
						'y',
						'R',
						'u',
						'q',
						'Q',
						'M',
						'L',
						'I',
						'd',
						'D',
						'E',
						'i',
						'e',
						't',
						'T',
					],
				},
				i: {
					priority: 90,
					parse: function (string, token, match, _options) {
						var valueCallback = function (value) {
							return 0 === value ? 7 : value;
						};
						switch (token) {
							case 'i':
							case 'ii':
								return parseNDigits(token.length, string);
							case 'io':
								return match.ordinalNumber(string, {
									unit: 'day',
								});
							case 'iii':
								return (
									match.day(string, {
										width: 'abbreviated',
										context: 'formatting',
										valueCallback,
									}) ||
									match.day(string, {
										width: 'short',
										context: 'formatting',
										valueCallback,
									}) ||
									match.day(string, {
										width: 'narrow',
										context: 'formatting',
										valueCallback,
									})
								);
							case 'iiiii':
								return match.day(string, {
									width: 'narrow',
									context: 'formatting',
									valueCallback,
								});
							case 'iiiiii':
								return (
									match.day(string, {
										width: 'short',
										context: 'formatting',
										valueCallback,
									}) ||
									match.day(string, {
										width: 'narrow',
										context: 'formatting',
										valueCallback,
									})
								);
							default:
								return (
									match.day(string, {
										width: 'wide',
										context: 'formatting',
										valueCallback,
									}) ||
									match.day(string, {
										width: 'abbreviated',
										context: 'formatting',
										valueCallback,
									}) ||
									match.day(string, {
										width: 'short',
										context: 'formatting',
										valueCallback,
									}) ||
									match.day(string, {
										width: 'narrow',
										context: 'formatting',
										valueCallback,
									})
								);
						}
					},
					validate: function (_date, value, _options) {
						return value >= 1 && value <= 7;
					},
					set: function (date, _flags, value, options) {
						return (
							(date = (function setUTCISODay(
								dirtyDate,
								dirtyDay,
							) {
								(0, requiredArgs.Z)(2, arguments);
								var day = (0, toInteger.Z)(dirtyDay);
								day % 7 == 0 && (day -= 7);
								var date = (0, toDate.Z)(dirtyDate),
									diff =
										(((day % 7) + 7) % 7 < 1 ? 7 : 0) +
										day -
										date.getUTCDay();
								return (
									date.setUTCDate(date.getUTCDate() + diff),
									date
								);
							})(date, value, options)),
							date.setUTCHours(0, 0, 0, 0),
							date
						);
					},
					incompatibleTokens: [
						'y',
						'Y',
						'u',
						'q',
						'Q',
						'M',
						'L',
						'w',
						'd',
						'D',
						'E',
						'e',
						'c',
						't',
						'T',
					],
				},
				a: {
					priority: 80,
					parse: function (string, token, match, _options) {
						switch (token) {
							case 'a':
							case 'aa':
							case 'aaa':
								return (
									match.dayPeriod(string, {
										width: 'abbreviated',
										context: 'formatting',
									}) ||
									match.dayPeriod(string, {
										width: 'narrow',
										context: 'formatting',
									})
								);
							case 'aaaaa':
								return match.dayPeriod(string, {
									width: 'narrow',
									context: 'formatting',
								});
							default:
								return (
									match.dayPeriod(string, {
										width: 'wide',
										context: 'formatting',
									}) ||
									match.dayPeriod(string, {
										width: 'abbreviated',
										context: 'formatting',
									}) ||
									match.dayPeriod(string, {
										width: 'narrow',
										context: 'formatting',
									})
								);
						}
					},
					set: function (date, _flags, value, _options) {
						return (
							date.setUTCHours(
								dayPeriodEnumToHours(value),
								0,
								0,
								0,
							),
							date
						);
					},
					incompatibleTokens: ['b', 'B', 'H', 'K', 'k', 't', 'T'],
				},
				b: {
					priority: 80,
					parse: function (string, token, match, _options) {
						switch (token) {
							case 'b':
							case 'bb':
							case 'bbb':
								return (
									match.dayPeriod(string, {
										width: 'abbreviated',
										context: 'formatting',
									}) ||
									match.dayPeriod(string, {
										width: 'narrow',
										context: 'formatting',
									})
								);
							case 'bbbbb':
								return match.dayPeriod(string, {
									width: 'narrow',
									context: 'formatting',
								});
							default:
								return (
									match.dayPeriod(string, {
										width: 'wide',
										context: 'formatting',
									}) ||
									match.dayPeriod(string, {
										width: 'abbreviated',
										context: 'formatting',
									}) ||
									match.dayPeriod(string, {
										width: 'narrow',
										context: 'formatting',
									})
								);
						}
					},
					set: function (date, _flags, value, _options) {
						return (
							date.setUTCHours(
								dayPeriodEnumToHours(value),
								0,
								0,
								0,
							),
							date
						);
					},
					incompatibleTokens: ['a', 'B', 'H', 'K', 'k', 't', 'T'],
				},
				B: {
					priority: 80,
					parse: function (string, token, match, _options) {
						switch (token) {
							case 'B':
							case 'BB':
							case 'BBB':
								return (
									match.dayPeriod(string, {
										width: 'abbreviated',
										context: 'formatting',
									}) ||
									match.dayPeriod(string, {
										width: 'narrow',
										context: 'formatting',
									})
								);
							case 'BBBBB':
								return match.dayPeriod(string, {
									width: 'narrow',
									context: 'formatting',
								});
							default:
								return (
									match.dayPeriod(string, {
										width: 'wide',
										context: 'formatting',
									}) ||
									match.dayPeriod(string, {
										width: 'abbreviated',
										context: 'formatting',
									}) ||
									match.dayPeriod(string, {
										width: 'narrow',
										context: 'formatting',
									})
								);
						}
					},
					set: function (date, _flags, value, _options) {
						return (
							date.setUTCHours(
								dayPeriodEnumToHours(value),
								0,
								0,
								0,
							),
							date
						);
					},
					incompatibleTokens: ['a', 'b', 't', 'T'],
				},
				h: {
					priority: 70,
					parse: function (string, token, match, _options) {
						switch (token) {
							case 'h':
								return parseNumericPattern(
									numericPatterns_hour12h,
									string,
								);
							case 'ho':
								return match.ordinalNumber(string, {
									unit: 'hour',
								});
							default:
								return parseNDigits(token.length, string);
						}
					},
					validate: function (_date, value, _options) {
						return value >= 1 && value <= 12;
					},
					set: function (date, _flags, value, _options) {
						var isPM = date.getUTCHours() >= 12;
						return (
							isPM && value < 12
								? date.setUTCHours(value + 12, 0, 0, 0)
								: isPM || 12 !== value
								? date.setUTCHours(value, 0, 0, 0)
								: date.setUTCHours(0, 0, 0, 0),
							date
						);
					},
					incompatibleTokens: ['H', 'K', 'k', 't', 'T'],
				},
				H: {
					priority: 70,
					parse: function (string, token, match, _options) {
						switch (token) {
							case 'H':
								return parseNumericPattern(
									numericPatterns_hour23h,
									string,
								);
							case 'Ho':
								return match.ordinalNumber(string, {
									unit: 'hour',
								});
							default:
								return parseNDigits(token.length, string);
						}
					},
					validate: function (_date, value, _options) {
						return value >= 0 && value <= 23;
					},
					set: function (date, _flags, value, _options) {
						return date.setUTCHours(value, 0, 0, 0), date;
					},
					incompatibleTokens: ['a', 'b', 'h', 'K', 'k', 't', 'T'],
				},
				K: {
					priority: 70,
					parse: function (string, token, match, _options) {
						switch (token) {
							case 'K':
								return parseNumericPattern(
									numericPatterns_hour11h,
									string,
								);
							case 'Ko':
								return match.ordinalNumber(string, {
									unit: 'hour',
								});
							default:
								return parseNDigits(token.length, string);
						}
					},
					validate: function (_date, value, _options) {
						return value >= 0 && value <= 11;
					},
					set: function (date, _flags, value, _options) {
						return (
							date.getUTCHours() >= 12 && value < 12
								? date.setUTCHours(value + 12, 0, 0, 0)
								: date.setUTCHours(value, 0, 0, 0),
							date
						);
					},
					incompatibleTokens: ['a', 'b', 'h', 'H', 'k', 't', 'T'],
				},
				k: {
					priority: 70,
					parse: function (string, token, match, _options) {
						switch (token) {
							case 'k':
								return parseNumericPattern(
									numericPatterns_hour24h,
									string,
								);
							case 'ko':
								return match.ordinalNumber(string, {
									unit: 'hour',
								});
							default:
								return parseNDigits(token.length, string);
						}
					},
					validate: function (_date, value, _options) {
						return value >= 1 && value <= 24;
					},
					set: function (date, _flags, value, _options) {
						var hours = value <= 24 ? value % 24 : value;
						return date.setUTCHours(hours, 0, 0, 0), date;
					},
					incompatibleTokens: ['a', 'b', 'h', 'H', 'K', 't', 'T'],
				},
				m: {
					priority: 60,
					parse: function (string, token, match, _options) {
						switch (token) {
							case 'm':
								return parseNumericPattern(
									numericPatterns_minute,
									string,
								);
							case 'mo':
								return match.ordinalNumber(string, {
									unit: 'minute',
								});
							default:
								return parseNDigits(token.length, string);
						}
					},
					validate: function (_date, value, _options) {
						return value >= 0 && value <= 59;
					},
					set: function (date, _flags, value, _options) {
						return date.setUTCMinutes(value, 0, 0), date;
					},
					incompatibleTokens: ['t', 'T'],
				},
				s: {
					priority: 50,
					parse: function (string, token, match, _options) {
						switch (token) {
							case 's':
								return parseNumericPattern(
									numericPatterns_second,
									string,
								);
							case 'so':
								return match.ordinalNumber(string, {
									unit: 'second',
								});
							default:
								return parseNDigits(token.length, string);
						}
					},
					validate: function (_date, value, _options) {
						return value >= 0 && value <= 59;
					},
					set: function (date, _flags, value, _options) {
						return date.setUTCSeconds(value, 0), date;
					},
					incompatibleTokens: ['t', 'T'],
				},
				S: {
					priority: 30,
					parse: function (string, token, _match, _options) {
						return parseNDigits(
							token.length,
							string,
							function (value) {
								return Math.floor(
									value * Math.pow(10, 3 - token.length),
								);
							},
						);
					},
					set: function (date, _flags, value, _options) {
						return date.setUTCMilliseconds(value), date;
					},
					incompatibleTokens: ['t', 'T'],
				},
				X: {
					priority: 10,
					parse: function (string, token, _match, _options) {
						switch (token) {
							case 'X':
								return parseTimezonePattern(
									timezonePatterns_basicOptionalMinutes,
									string,
								);
							case 'XX':
								return parseTimezonePattern(
									timezonePatterns_basic,
									string,
								);
							case 'XXXX':
								return parseTimezonePattern(
									timezonePatterns_basicOptionalSeconds,
									string,
								);
							case 'XXXXX':
								return parseTimezonePattern(
									timezonePatterns_extendedOptionalSeconds,
									string,
								);
							default:
								return parseTimezonePattern(
									timezonePatterns_extended,
									string,
								);
						}
					},
					set: function (date, flags, value, _options) {
						return flags.timestampIsSet
							? date
							: new Date(date.getTime() - value);
					},
					incompatibleTokens: ['t', 'T', 'x'],
				},
				x: {
					priority: 10,
					parse: function (string, token, _match, _options) {
						switch (token) {
							case 'x':
								return parseTimezonePattern(
									timezonePatterns_basicOptionalMinutes,
									string,
								);
							case 'xx':
								return parseTimezonePattern(
									timezonePatterns_basic,
									string,
								);
							case 'xxxx':
								return parseTimezonePattern(
									timezonePatterns_basicOptionalSeconds,
									string,
								);
							case 'xxxxx':
								return parseTimezonePattern(
									timezonePatterns_extendedOptionalSeconds,
									string,
								);
							default:
								return parseTimezonePattern(
									timezonePatterns_extended,
									string,
								);
						}
					},
					set: function (date, flags, value, _options) {
						return flags.timestampIsSet
							? date
							: new Date(date.getTime() - value);
					},
					incompatibleTokens: ['t', 'T', 'X'],
				},
				t: {
					priority: 40,
					parse: function (string, _token, _match, _options) {
						return parseAnyDigitsSigned(string);
					},
					set: function (_date, _flags, value, _options) {
						return [new Date(1e3 * value), { timestampIsSet: !0 }];
					},
					incompatibleTokens: '*',
				},
				T: {
					priority: 20,
					parse: function (string, _token, _match, _options) {
						return parseAnyDigitsSigned(string);
					},
					set: function (_date, _flags, value, _options) {
						return [new Date(value), { timestampIsSet: !0 }];
					},
					incompatibleTokens: '*',
				},
			};
			var TIMEZONE_UNIT_PRIORITY = 10,
				formattingTokensRegExp =
					/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
				longFormattingTokensRegExp =
					/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
				escapedStringRegExp = /^'([^]*?)'?$/,
				doubleQuoteRegExp = /''/g,
				notWhitespaceRegExp = /\S/,
				unescapedLatinCharacterRegExp = /[a-zA-Z]/;
			function parse(
				dirtyDateString,
				dirtyFormatString,
				dirtyReferenceDate,
				dirtyOptions,
			) {
				(0, requiredArgs.Z)(3, arguments);
				var dateString = String(dirtyDateString),
					formatString = String(dirtyFormatString),
					options = dirtyOptions || {},
					locale = options.locale || en_US.Z;
				if (!locale.match)
					throw new RangeError('locale must contain match property');
				var localeFirstWeekContainsDate =
						locale.options && locale.options.firstWeekContainsDate,
					defaultFirstWeekContainsDate =
						null == localeFirstWeekContainsDate
							? 1
							: (0, toInteger.Z)(localeFirstWeekContainsDate),
					firstWeekContainsDate =
						null == options.firstWeekContainsDate
							? defaultFirstWeekContainsDate
							: (0, toInteger.Z)(options.firstWeekContainsDate);
				if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7))
					throw new RangeError(
						'firstWeekContainsDate must be between 1 and 7 inclusively',
					);
				var localeWeekStartsOn =
						locale.options && locale.options.weekStartsOn,
					defaultWeekStartsOn =
						null == localeWeekStartsOn
							? 0
							: (0, toInteger.Z)(localeWeekStartsOn),
					weekStartsOn =
						null == options.weekStartsOn
							? defaultWeekStartsOn
							: (0, toInteger.Z)(options.weekStartsOn);
				if (!(weekStartsOn >= 0 && weekStartsOn <= 6))
					throw new RangeError(
						'weekStartsOn must be between 0 and 6 inclusively',
					);
				if ('' === formatString)
					return '' === dateString
						? (0, toDate.Z)(dirtyReferenceDate)
						: new Date(NaN);
				var i,
					subFnOptions = {
						firstWeekContainsDate,
						weekStartsOn,
						locale,
					},
					setters = [
						{
							priority: TIMEZONE_UNIT_PRIORITY,
							subPriority: -1,
							set: dateToSystemTimezone,
							index: 0,
						},
					],
					tokens = formatString
						.match(longFormattingTokensRegExp)
						.map(function (substring) {
							var firstCharacter = substring[0];
							return 'p' === firstCharacter ||
								'P' === firstCharacter
								? (0, longFormatters.Z[firstCharacter])(
										substring,
										locale.formatLong,
										subFnOptions,
								  )
								: substring;
						})
						.join('')
						.match(formattingTokensRegExp),
					usedTokens = [];
				for (i = 0; i < tokens.length; i++) {
					var token = tokens[i];
					!options.useAdditionalWeekYearTokens &&
						(0, protectedTokens.Do)(token) &&
						(0, protectedTokens.qp)(
							token,
							formatString,
							dirtyDateString,
						),
						!options.useAdditionalDayOfYearTokens &&
							(0, protectedTokens.Iu)(token) &&
							(0, protectedTokens.qp)(
								token,
								formatString,
								dirtyDateString,
							);
					var firstCharacter = token[0],
						parser = _lib_parsers[firstCharacter];
					if (parser) {
						var incompatibleTokens = parser.incompatibleTokens;
						if (Array.isArray(incompatibleTokens)) {
							for (
								var incompatibleToken = void 0, _i = 0;
								_i < usedTokens.length;
								_i++
							) {
								var usedToken = usedTokens[_i].token;
								if (
									-1 !==
										incompatibleTokens.indexOf(usedToken) ||
									usedToken === firstCharacter
								) {
									incompatibleToken = usedTokens[_i];
									break;
								}
							}
							if (incompatibleToken)
								throw new RangeError(
									"The format string mustn't contain `"
										.concat(
											incompatibleToken.fullToken,
											'` and `',
										)
										.concat(token, '` at the same time'),
								);
						} else if (
							'*' === parser.incompatibleTokens &&
							usedTokens.length
						)
							throw new RangeError(
								"The format string mustn't contain `".concat(
									token,
									'` and any other token at the same time',
								),
							);
						usedTokens.push({
							token: firstCharacter,
							fullToken: token,
						});
						var parseResult = parser.parse(
							dateString,
							token,
							locale.match,
							subFnOptions,
						);
						if (!parseResult) return new Date(NaN);
						setters.push({
							priority: parser.priority,
							subPriority: parser.subPriority || 0,
							set: parser.set,
							validate: parser.validate,
							value: parseResult.value,
							index: setters.length,
						}),
							(dateString = parseResult.rest);
					} else {
						if (firstCharacter.match(unescapedLatinCharacterRegExp))
							throw new RangeError(
								'Format string contains an unescaped latin alphabet character `' +
									firstCharacter +
									'`',
							);
						if (
							("''" === token
								? (token = "'")
								: "'" === firstCharacter &&
								  (token = token
										.match(escapedStringRegExp)[1]
										.replace(doubleQuoteRegExp, "'")),
							0 !== dateString.indexOf(token))
						)
							return new Date(NaN);
						dateString = dateString.slice(token.length);
					}
				}
				if (
					dateString.length > 0 &&
					notWhitespaceRegExp.test(dateString)
				)
					return new Date(NaN);
				var uniquePrioritySetters = setters
						.map(function (setter) {
							return setter.priority;
						})
						.sort(function (a, b) {
							return b - a;
						})
						.filter(function (priority, index, array) {
							return array.indexOf(priority) === index;
						})
						.map(function (priority) {
							return setters
								.filter(function (setter) {
									return setter.priority === priority;
								})
								.sort(function (a, b) {
									return b.subPriority - a.subPriority;
								});
						})
						.map(function (setterArray) {
							return setterArray[0];
						}),
					date = (0, toDate.Z)(dirtyReferenceDate);
				if (isNaN(date)) return new Date(NaN);
				var utcDate = (0, subMilliseconds.Z)(
						date,
						(0, getTimezoneOffsetInMilliseconds.Z)(date),
					),
					flags = {};
				for (i = 0; i < uniquePrioritySetters.length; i++) {
					var setter = uniquePrioritySetters[i];
					if (
						setter.validate &&
						!setter.validate(utcDate, setter.value, subFnOptions)
					)
						return new Date(NaN);
					var result = setter.set(
						utcDate,
						flags,
						setter.value,
						subFnOptions,
					);
					result[0]
						? ((utcDate = result[0]),
						  assign_assign(flags, result[1]))
						: (utcDate = result);
				}
				return utcDate;
			}
			function dateToSystemTimezone(date, flags) {
				if (flags.timestampIsSet) return date;
				var convertedDate = new Date(0);
				return (
					convertedDate.setFullYear(
						date.getUTCFullYear(),
						date.getUTCMonth(),
						date.getUTCDate(),
					),
					convertedDate.setHours(
						date.getUTCHours(),
						date.getUTCMinutes(),
						date.getUTCSeconds(),
						date.getUTCMilliseconds(),
					),
					convertedDate
				);
			}
		},
		'./node_modules/date-fns/esm/subMilliseconds/index.js': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				Z: () => subMilliseconds,
			});
			var toInteger = __webpack_require__(
					'./node_modules/date-fns/esm/_lib/toInteger/index.js',
				),
				toDate = __webpack_require__(
					'./node_modules/date-fns/esm/toDate/index.js',
				),
				requiredArgs = __webpack_require__(
					'./node_modules/date-fns/esm/_lib/requiredArgs/index.js',
				);
			function subMilliseconds(dirtyDate, dirtyAmount) {
				return (
					(0, requiredArgs.Z)(2, arguments),
					(function addMilliseconds(dirtyDate, dirtyAmount) {
						(0, requiredArgs.Z)(2, arguments);
						var timestamp = (0, toDate.Z)(dirtyDate).getTime(),
							amount = (0, toInteger.Z)(dirtyAmount);
						return new Date(timestamp + amount);
					})(dirtyDate, -(0, toInteger.Z)(dirtyAmount))
				);
			}
		},
		'./node_modules/date-fns/esm/toDate/index.js': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { Z: () => toDate });
			var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
				__webpack_require__(
					'./node_modules/date-fns/esm/_lib/requiredArgs/index.js',
				);
			function toDate(argument) {
				(0, _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.Z)(
					1,
					arguments,
				);
				var argStr = Object.prototype.toString.call(argument);
				return argument instanceof Date ||
					('object' == typeof argument && '[object Date]' === argStr)
					? new Date(argument.getTime())
					: 'number' == typeof argument ||
					  '[object Number]' === argStr
					? new Date(argument)
					: (('string' != typeof argument &&
							'[object String]' !== argStr) ||
							'undefined' == typeof console ||
							(console.warn(
								"Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule",
							),
							console.warn(new Error().stack)),
					  new Date(NaN));
			}
		},
	},
]);
