(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[1325],
	{
		'./.storybook/ReactRouterDecorator.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			'use strict';
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
		'./client/components/mma/identity/idapi/supportReminders.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			'use strict';
			__webpack_require__.d(__webpack_exports__, {
				EJ: () => sendReminderCancellation,
				Vx: () => update,
				ij: () => read,
			});
			var _sentry_browser__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@sentry/minimal/esm/index.js',
					),
				_client_utilities_fetch__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__('./client/utilities/fetch.ts'),
				_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
					'./client/components/mma/identity/models.ts',
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
			var recurringReminderCode = '',
				read = (function () {
					var _ref = _asyncToGenerator(function* () {
						var _reminderStatus$recur,
							isActive,
							response = yield (0,
							_client_utilities_fetch__WEBPACK_IMPORTED_MODULE_0__.n4)(
								'/api/reminders/status',
							),
							reminderStatus = yield response.json();
						return 'NotSet' === reminderStatus.recurringStatus
							? []
							: ((recurringReminderCode =
									null !==
										(_reminderStatus$recur =
											reminderStatus.recurringReminderCode) &&
									void 0 !== _reminderStatus$recur
										? _reminderStatus$recur
										: ''),
							  [
									((isActive =
										'Active' ===
										reminderStatus.recurringStatus),
									{
										id: 'support_reminder',
										description:
											'We will invite you to make a contribution in support of Guardian journalism, using the cadence you picked when you last signed up.',
										name: 'Contribution reminder emails',
										type: _models__WEBPACK_IMPORTED_MODULE_1__
											.uF.SUPPORT_REMINDER,
										subscribed: isActive,
									}),
							  ]);
					});
					return function read() {
						return _ref.apply(this, arguments);
					};
				})(),
				update = (function () {
					var _ref2 = _asyncToGenerator(function* (id) {
						recurringReminderCode
							? !(
									arguments.length > 1 &&
									void 0 !== arguments[1]
							  ) || arguments[1]
								? yield sendReminderReactivation(
										recurringReminderCode,
								  )
								: yield sendReminderCancellation(
										recurringReminderCode,
								  )
							: _sentry_browser__WEBPACK_IMPORTED_MODULE_2__.uT(
									'No recurringReminderCode to update consent: '.concat(
										id,
									),
							  );
					});
					return function update(_x) {
						return _ref2.apply(this, arguments);
					};
				})(),
				sendReminderCancellation = (reminderCode) =>
					fetch('/api/reminders/cancel', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ reminderCode }),
					}),
				sendReminderReactivation = (reminderCode) =>
					fetch('/api/reminders/reactivate', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ reminderCode }),
					});
		},
		'./client/components/mma/identity/models.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			'use strict';
			__webpack_require__.d(__webpack_exports__, {
				BN: () => RegistrationLocations,
				ErrorTypes: () => ErrorTypes,
				KT: () => Titles,
				lC: () => PHONE_CALLING_CODES,
				od: () => COUNTRIES,
				uF: () => ConsentOptionType,
				uu: () => NewsletterGroup,
			});
			var NewsletterGroup = (function (NewsletterGroup) {
					return (
						(NewsletterGroup.newsInDepth = 'news in depth'),
						(NewsletterGroup.newsInBrief = 'news in brief'),
						(NewsletterGroup.opinion = 'opinion'),
						(NewsletterGroup.features = 'features'),
						(NewsletterGroup.culture = 'culture'),
						(NewsletterGroup.lifestyle = 'lifestyle'),
						(NewsletterGroup.sport = 'sport'),
						(NewsletterGroup.work = 'work'),
						(NewsletterGroup.fromThePapers = 'from the papers'),
						NewsletterGroup
					);
				})({}),
				ErrorTypes = (function (ErrorTypes) {
					return (
						(ErrorTypes.GENERAL = 'GENERAL'),
						(ErrorTypes.NOT_FOUND = 'NOT_FOUND'),
						(ErrorTypes.VALIDATION = 'VALIDATION'),
						ErrorTypes
					);
				})({}),
				ConsentOptionType = (function (ConsentOptionType) {
					return (
						(ConsentOptionType.EMAIL = 'EMAIL'),
						(ConsentOptionType.NEWSLETTER = 'NEWSLETTER'),
						(ConsentOptionType.OPT_OUT = 'OPT_OUT'),
						(ConsentOptionType.SUPPORT_REMINDER =
							'SUPPORT_REMINDER'),
						ConsentOptionType
					);
				})({}),
				RegistrationLocations = (function (RegistrationLocations) {
					return (
						(RegistrationLocations.PREFER_NOT_TO_SAY =
							'Prefer not to say'),
						(RegistrationLocations.UNITED_KINGDOM =
							'United Kingdom'),
						(RegistrationLocations.EUROPE = 'Europe'),
						(RegistrationLocations.UNITED_STATES = 'United States'),
						(RegistrationLocations.CANADA = 'Canada'),
						(RegistrationLocations.AUSTRALIA = 'Australia'),
						(RegistrationLocations.NEW_ZEALAND = 'New Zealand'),
						(RegistrationLocations.OTHER = 'Other'),
						RegistrationLocations
					);
				})({}),
				Titles = (function (Titles) {
					return (
						(Titles.MR = 'Mr'),
						(Titles.MRS = 'Mrs'),
						(Titles.MS = 'Ms'),
						(Titles.MX = 'Mx'),
						(Titles.MISS = 'Miss'),
						(Titles.DR = 'Dr'),
						(Titles.PROF = 'Prof'),
						(Titles.REV = 'Rev'),
						Titles
					);
				})({}),
				PHONE_CALLING_CODES = [
					'1',
					'7',
					'20',
					'27',
					'30',
					'31',
					'32',
					'33',
					'34',
					'36',
					'39',
					'40',
					'41',
					'43',
					'44',
					'45',
					'46',
					'47',
					'48',
					'49',
					'51',
					'52',
					'53',
					'54',
					'55',
					'56',
					'57',
					'58',
					'60',
					'61',
					'62',
					'63',
					'64',
					'65',
					'66',
					'81',
					'82',
					'84',
					'86',
					'90',
					'91',
					'92',
					'93',
					'94',
					'95',
					'98',
					'211',
					'212',
					'213',
					'216',
					'218',
					'220',
					'221',
					'222',
					'223',
					'224',
					'225',
					'226',
					'227',
					'228',
					'229',
					'230',
					'231',
					'232',
					'233',
					'234',
					'235',
					'236',
					'237',
					'238',
					'239',
					'240',
					'241',
					'242',
					'243',
					'244',
					'245',
					'246',
					'247',
					'248',
					'249',
					'250',
					'251',
					'252',
					'253',
					'254',
					'255',
					'256',
					'257',
					'258',
					'260',
					'261',
					'262',
					'263',
					'264',
					'265',
					'266',
					'267',
					'268',
					'269',
					'290',
					'291',
					'297',
					'298',
					'299',
					'350',
					'351',
					'352',
					'353',
					'354',
					'355',
					'356',
					'357',
					'358',
					'359',
					'370',
					'371',
					'372',
					'373',
					'374',
					'375',
					'376',
					'377',
					'378',
					'380',
					'381',
					'382',
					'383',
					'385',
					'386',
					'387',
					'389',
					'420',
					'421',
					'423',
					'500',
					'501',
					'502',
					'503',
					'504',
					'505',
					'506',
					'507',
					'508',
					'509',
					'590',
					'591',
					'592',
					'593',
					'594',
					'595',
					'596',
					'597',
					'598',
					'599',
					'670',
					'672',
					'673',
					'674',
					'675',
					'676',
					'677',
					'678',
					'679',
					'680',
					'681',
					'682',
					'683',
					'685',
					'686',
					'687',
					'688',
					'689',
					'690',
					'691',
					'692',
					'800',
					'808',
					'850',
					'852',
					'853',
					'855',
					'856',
					'870',
					'878',
					'880',
					'881',
					'882',
					'883',
					'886',
					'888',
					'960',
					'961',
					'962',
					'963',
					'964',
					'965',
					'966',
					'967',
					'968',
					'970',
					'971',
					'972',
					'973',
					'974',
					'975',
					'976',
					'977',
					'979',
					'992',
					'993',
					'994',
					'995',
					'996',
					'998',
				],
				COUNTRIES = [
					{ iso: 'AF', name: 'Afghanistan' },
					{ iso: 'AL', name: 'Albania' },
					{ iso: 'DZ', name: 'Algeria' },
					{ iso: 'AS', name: 'American Samoa' },
					{ iso: 'AD', name: 'Andorra' },
					{ iso: 'AO', name: 'Angola' },
					{ iso: 'AI', name: 'Anguilla' },
					{ iso: 'AQ', name: 'Antarctica' },
					{ iso: 'AG', name: 'Antigua & Barbuda' },
					{ iso: 'AR', name: 'Argentina' },
					{ iso: 'AM', name: 'Armenia' },
					{ iso: 'AW', name: 'Aruba' },
					{ iso: 'AU', name: 'Australia' },
					{ iso: 'AT', name: 'Austria' },
					{ iso: 'AZ', name: 'Azerbaijan' },
					{ iso: 'BS', name: 'Bahamas' },
					{ iso: 'BH', name: 'Bahrain' },
					{ iso: 'BD', name: 'Bangladesh' },
					{ iso: 'BB', name: 'Barbados' },
					{ iso: 'BY', name: 'Belarus' },
					{ iso: 'BE', name: 'Belgium' },
					{ iso: 'BZ', name: 'Belize' },
					{ iso: 'BJ', name: 'Benin' },
					{ iso: 'BM', name: 'Bermuda' },
					{ iso: 'BT', name: 'Bhutan' },
					{ iso: 'BO', name: 'Bolivia' },
					{ iso: 'BQ', name: 'Bonaire, Saint Eustatius and Saba' },
					{ iso: 'BA', name: 'Bosnia-Herzegovina' },
					{ iso: 'BW', name: 'Botswana' },
					{ iso: 'BV', name: 'Bouvet Island' },
					{ iso: 'BR', name: 'Brazil' },
					{ iso: 'IO', name: 'British Indian Ocean Territory' },
					{ iso: 'VG', name: 'British Virgin Islands' },
					{ iso: 'BN', name: 'Brunei Darussalam' },
					{ iso: 'BG', name: 'Bulgaria' },
					{ iso: 'BF', name: 'Burkina Faso' },
					{ iso: 'BI', name: 'Burundi' },
					{ iso: 'KH', name: 'Cambodia' },
					{ iso: 'CM', name: 'Cameroon' },
					{ iso: 'CA', name: 'Canada' },
					{ iso: 'CV', name: 'Cape Verde Islands' },
					{ iso: 'KY', name: 'Cayman Islands' },
					{ iso: 'CF', name: 'Central African Republic' },
					{ iso: 'TD', name: 'Chad' },
					{ iso: 'CL', name: 'Chile' },
					{ iso: 'CN', name: 'China' },
					{ iso: 'CX', name: 'Christmas Island' },
					{ iso: 'CC', name: 'Cocos (Keeling) Islands' },
					{ iso: 'CO', name: 'Colombia' },
					{ iso: 'KM', name: 'Comoros' },
					{ iso: 'CG', name: 'Congo (Brazzaville)' },
					{ iso: 'CD', name: 'Congo (Kinshasa)' },
					{ iso: 'CK', name: 'Cook Islands' },
					{ iso: 'CR', name: 'Costa Rica' },
					{ iso: 'HR', name: 'Croatia' },
					{ iso: 'CU', name: 'Cuba' },
					{ iso: 'CW', name: 'Curaçao' },
					{ iso: 'CY', name: 'Cyprus' },
					{ iso: 'CZ', name: 'Czech Republic' },
					{ iso: 'DK', name: 'Denmark' },
					{ iso: 'DJ', name: 'Djibouti' },
					{ iso: 'DM', name: 'Dominica' },
					{ iso: 'DO', name: 'Dominican Republic' },
					{ iso: 'TL', name: 'East Timor' },
					{ iso: 'EC', name: 'Ecuador' },
					{ iso: 'EG', name: 'Egypt' },
					{ iso: 'SV', name: 'El Salvador' },
					{ iso: 'GQ', name: 'Equatorial Guinea' },
					{ iso: 'ER', name: 'Eritrea' },
					{ iso: 'EE', name: 'Estonia' },
					{ iso: 'ET', name: 'Ethiopia' },
					{ iso: 'FK', name: 'Falkland Islands' },
					{ iso: 'FO', name: 'Faroe Islands' },
					{ iso: 'FJ', name: 'Fiji' },
					{ iso: 'FI', name: 'Finland' },
					{ iso: 'FR', name: 'France' },
					{ iso: 'GF', name: 'French Guiana' },
					{ iso: 'PF', name: 'French Polynesia' },
					{ iso: 'TF', name: 'French Southern Territories' },
					{ iso: 'GA', name: 'Gabon' },
					{ iso: 'GM', name: 'Gambia' },
					{ iso: 'GE', name: 'Georgia' },
					{ iso: 'DE', name: 'Germany' },
					{ iso: 'GH', name: 'Ghana' },
					{ iso: 'GI', name: 'Gibraltar' },
					{ iso: 'GR', name: 'Greece' },
					{ iso: 'GL', name: 'Greenland' },
					{ iso: 'GD', name: 'Grenada' },
					{ iso: 'GP', name: 'Guadeloupe' },
					{ iso: 'GU', name: 'Guam' },
					{ iso: 'GT', name: 'Guatemala' },
					{ iso: 'GG', name: 'Guernsey' },
					{ iso: 'GN', name: 'Guinea' },
					{ iso: 'GW', name: 'Guinea-Bissau' },
					{ iso: 'GY', name: 'Guyana' },
					{ iso: 'HT', name: 'Haiti' },
					{ iso: 'HM', name: 'Heard Island and McDonald Islands' },
					{ iso: 'VA', name: 'Holy See' },
					{ iso: 'HN', name: 'Honduras' },
					{ iso: 'HK', name: 'Hong Kong' },
					{ iso: 'HU', name: 'Hungary' },
					{ iso: 'IS', name: 'Iceland' },
					{ iso: 'IN', name: 'India' },
					{ iso: 'ID', name: 'Indonesia' },
					{ iso: 'IR', name: 'Iran' },
					{ iso: 'IQ', name: 'Iraq' },
					{ iso: 'IE', name: 'Ireland' },
					{ iso: 'IM', name: 'Isle of Man' },
					{ iso: 'IL', name: 'Israel' },
					{ iso: 'IT', name: 'Italy' },
					{ iso: 'CI', name: 'Ivory Coast' },
					{ iso: 'JM', name: 'Jamaica' },
					{ iso: 'JP', name: 'Japan' },
					{ iso: 'JE', name: 'Jersey' },
					{ iso: 'JO', name: 'Jordan' },
					{ iso: 'KZ', name: 'Kazakhstan' },
					{ iso: 'KE', name: 'Kenya' },
					{ iso: 'KI', name: 'Kiribati' },
					{ iso: 'KW', name: 'Kuwait' },
					{ iso: 'KG', name: 'Kyrgyzstan' },
					{ iso: 'LA', name: 'Laos' },
					{ iso: 'LV', name: 'Latvia' },
					{ iso: 'LB', name: 'Lebanon' },
					{ iso: 'LS', name: 'Lesotho' },
					{ iso: 'LR', name: 'Liberia' },
					{ iso: 'LY', name: 'Libya' },
					{ iso: 'LI', name: 'Liechtenstein' },
					{ iso: 'LT', name: 'Lithuania' },
					{ iso: 'LU', name: 'Luxembourg' },
					{ iso: 'MO', name: 'Macau' },
					{ iso: 'MK', name: 'Macedonia' },
					{ iso: 'MG', name: 'Madagascar' },
					{ iso: 'MW', name: 'Malawi' },
					{ iso: 'MY', name: 'Malaysia' },
					{ iso: 'MV', name: 'Maldives' },
					{ iso: 'ML', name: 'Mali' },
					{ iso: 'MT', name: 'Malta' },
					{ iso: 'MH', name: 'Marshall Islands' },
					{ iso: 'MQ', name: 'Martinique' },
					{ iso: 'MR', name: 'Mauritania' },
					{ iso: 'MU', name: 'Mauritius' },
					{ iso: 'YT', name: 'Mayotte' },
					{ iso: 'MX', name: 'Mexico' },
					{ iso: 'FM', name: 'Micronesia' },
					{ iso: 'MD', name: 'Moldova' },
					{ iso: 'MC', name: 'Monaco' },
					{ iso: 'MN', name: 'Mongolia' },
					{ iso: 'ME', name: 'Montenegro' },
					{ iso: 'MS', name: 'Montserrat' },
					{ iso: 'MA', name: 'Morocco' },
					{ iso: 'MZ', name: 'Mozambique' },
					{ iso: 'MM', name: 'Myanmar' },
					{ iso: 'NA', name: 'Namibia' },
					{ iso: 'NR', name: 'Nauru' },
					{ iso: 'NP', name: 'Nepal' },
					{ iso: 'NL', name: 'Netherlands' },
					{ iso: 'NC', name: 'New Caledonia' },
					{ iso: 'NZ', name: 'New Zealand' },
					{ iso: 'NI', name: 'Nicaragua' },
					{ iso: 'NE', name: 'Niger' },
					{ iso: 'NG', name: 'Nigeria' },
					{ iso: 'NU', name: 'Niue' },
					{ iso: 'NF', name: 'Norfolk Island' },
					{ iso: 'KP', name: 'North Korea' },
					{ iso: 'MP', name: 'Northern Mariana Islands' },
					{ iso: 'NO', name: 'Norway' },
					{ iso: 'OM', name: 'Oman' },
					{ iso: 'PK', name: 'Pakistan' },
					{ iso: 'PW', name: 'Palau' },
					{ iso: 'PS', name: 'Palestinian Territories' },
					{ iso: 'PA', name: 'Panama' },
					{ iso: 'PG', name: 'Papua New Guinea' },
					{ iso: 'PY', name: 'Paraguay' },
					{ iso: 'PE', name: 'Peru' },
					{ iso: 'PH', name: 'Philippines' },
					{ iso: 'PN', name: 'Pitcairn Islands' },
					{ iso: 'PL', name: 'Poland' },
					{ iso: 'PT', name: 'Portugal' },
					{ iso: 'PR', name: 'Puerto Rico' },
					{ iso: 'QA', name: 'Qatar' },
					{ iso: 'RO', name: 'Romania' },
					{ iso: 'RU', name: 'Russia' },
					{ iso: 'RW', name: 'Rwanda' },
					{ iso: 'RE', name: 'Réunion' },
					{ iso: 'BL', name: 'Saint Barthélemy' },
					{ iso: 'KN', name: 'Saint Christopher & Nevis' },
					{ iso: 'SH', name: 'Saint Helena' },
					{ iso: 'LC', name: 'Saint Lucia' },
					{ iso: 'MF', name: 'Saint Martin' },
					{ iso: 'PM', name: 'Saint Pierre & Miquelon' },
					{ iso: 'VC', name: 'Saint Vincent & The Grenadines' },
					{ iso: 'WS', name: 'Samoa' },
					{ iso: 'SM', name: 'San Marino' },
					{ iso: 'ST', name: 'Sao Tome & Principe' },
					{ iso: 'SA', name: 'Saudi Arabia' },
					{ iso: 'SN', name: 'Senegal' },
					{ iso: 'RS', name: 'Serbia' },
					{ iso: 'SC', name: 'Seychelles' },
					{ iso: 'SL', name: 'Sierra Leone' },
					{ iso: 'SG', name: 'Singapore' },
					{ iso: 'SX', name: 'Sint Maarten' },
					{ iso: 'SK', name: 'Slovakia' },
					{ iso: 'SI', name: 'Slovenia' },
					{ iso: 'SB', name: 'Solomon Islands' },
					{ iso: 'SO', name: 'Somalia' },
					{ iso: 'ZA', name: 'South Africa' },
					{
						iso: 'GS',
						name: 'South Georgia & The South Sandwich Islands',
					},
					{ iso: 'KR', name: 'South Korea' },
					{ iso: 'SS', name: 'South Sudan' },
					{ iso: 'ES', name: 'Spain' },
					{ iso: 'LK', name: 'Sri Lanka' },
					{ iso: 'SD', name: 'Sudan' },
					{ iso: 'SR', name: 'Suriname' },
					{ iso: 'SJ', name: 'Svalbard and Jan Mayen' },
					{ iso: 'SZ', name: 'Swaziland' },
					{ iso: 'SE', name: 'Sweden' },
					{ iso: 'CH', name: 'Switzerland' },
					{ iso: 'SY', name: 'Syria' },
					{ iso: 'TW', name: 'Taiwan' },
					{ iso: 'TJ', name: 'Tajikistan' },
					{ iso: 'TZ', name: 'Tanzania' },
					{ iso: 'TH', name: 'Thailand' },
					{ iso: 'TG', name: 'Togo' },
					{ iso: 'TK', name: 'Tokelau' },
					{ iso: 'TO', name: 'Tonga' },
					{ iso: 'TT', name: 'Trinidad & Tobago' },
					{ iso: 'TN', name: 'Tunisia' },
					{ iso: 'TR', name: 'Turkey' },
					{ iso: 'TM', name: 'Turkmenistan' },
					{ iso: 'TC', name: 'Turks & Caicos Islands' },
					{ iso: 'TV', name: 'Tuvalu' },
					{ iso: 'UG', name: 'Uganda' },
					{ iso: 'UA', name: 'Ukraine' },
					{ iso: 'AE', name: 'United Arab Emirates' },
					{ iso: 'GB', name: 'United Kingdom' },
					{ iso: 'US', name: 'United States' },
					{ iso: 'UM', name: 'United States Minor Outlying Islands' },
					{ iso: 'VI', name: 'United States Virgin Islands' },
					{ iso: 'UY', name: 'Uruguay' },
					{ iso: 'UZ', name: 'Uzbekistan' },
					{ iso: 'VU', name: 'Vanuatu' },
					{ iso: 'VE', name: 'Venezuela' },
					{ iso: 'VN', name: 'Vietnam' },
					{ iso: 'WF', name: 'Wallis & Futuna' },
					{ iso: 'EH', name: 'Western Sahara' },
					{ iso: 'YE', name: 'Yemen' },
					{ iso: 'ZM', name: 'Zambia' },
					{ iso: 'ZW', name: 'Zimbabwe' },
					{ iso: 'AX', name: 'Åland Islands' },
				];
		},
		'./client/utilities/fetch.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			'use strict';
			__webpack_require__.d(__webpack_exports__, {
				H6: () => addCSRFToken,
				Jl: () => deleteRequest,
				n4: () => fetchWithDefaultParameters,
				Ll: () => patchRequest,
				j0: () => postRequest,
				GH: () => putRequest,
			});
			var js_cookie = __webpack_require__(
					'./node_modules/js-cookie/src/js.cookie.js',
				),
				js_cookie_default = __webpack_require__.n(js_cookie),
				csurf = __webpack_require__('./node_modules/csurf/index.js');
			__webpack_require__.n(csurf)()({
				cookie: {
					key: '_csrf',
					sameSite: !0,
					secure: !0,
					httpOnly: !0,
				},
			});
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
			var fetchDefaultParameters = {
					credentials: 'include',
					mode: 'same-origin',
				},
				getOptionsForMethod = (method) => (payload) => ({
					method,
					headers: { 'Content-Type': 'application/json' },
					body: payload ? JSON.stringify(payload) : void 0,
				}),
				addCSRFToken = (options) => {
					var token = js_cookie_default().get('XSRF-TOKEN');
					if (!token) return options;
					var headers = _objectSpread(
						_objectSpread({}, options.headers),
						{},
						{ 'csrf-token': token },
					);
					return _objectSpread(
						_objectSpread({}, options),
						{},
						{ headers },
					);
				},
				postRequest = getOptionsForMethod('POST'),
				patchRequest = getOptionsForMethod('PATCH'),
				deleteRequest = getOptionsForMethod('DELETE'),
				putRequest = getOptionsForMethod('PUT'),
				fetchWithDefaultParameters = (url, options) =>
					fetch(
						url,
						_objectSpread(
							_objectSpread({}, fetchDefaultParameters),
							options,
						),
					);
		},
		'./client/components/mma/cancelReminders/CancelReminders.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			'use strict';
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					Error: () => Error,
					Success: () => Success,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => CancelReminders_stories,
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
				esm = __webpack_require__(
					'./node_modules/@sentry/minimal/esm/index.js',
				),
				react = __webpack_require__('./node_modules/react/index.js'),
				react_router = __webpack_require__(
					'./node_modules/react-router/index.js',
				),
				supportReminders = __webpack_require__(
					'./client/components/mma/identity/idapi/supportReminders.ts',
				),
				emotion_react_jsx_runtime_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				);
			var containerStyle = {
					name: 't5uhxj',
					styles: 'width:100%;margin-left:20%;max-width:400px;display:flex;flex-direction:column;margin-bottom:80px',
				},
				headingStyle = {
					name: '1vd7c62',
					styles: 'border-bottom:1px solid #c4c4c4;font-size:28px;margin-bottom:0;margin-top:10px;padding-bottom:10px',
				},
				linkStyle = { name: 'iqoq9n', styles: 'margin-top:20px' },
				_ref = { name: '1wbll7q', styles: 'text-decoration:underline' },
				_ref2 = {
					name: '1wbll7q',
					styles: 'text-decoration:underline',
				},
				CancelReminders = () => {
					var { reminderCode } = (0, react_router.UO)(),
						[cancelStatus, setCancelStatus] = (0, react.useState)(
							'PENDING',
						);
					return (
						(0, react.useEffect)(() => {
							reminderCode
								? (0, supportReminders.EJ)(reminderCode).then(
										(response) => {
											response.ok
												? setCancelStatus('SUCCESS')
												: (setCancelStatus('FAILURE'),
												  esm.uT(
														'Failed to cancel reminders for code: '.concat(
															reminderCode,
														),
												  ));
										},
								  )
								: setCancelStatus('FAILURE');
						}, [reminderCode]),
						(0, emotion_react_jsx_runtime_browser_esm.BX)('div', {
							css: containerStyle,
							children: [
								'PENDING' === cancelStatus &&
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'h3',
										{
											css: headingStyle,
											children: 'Unsubscribing...',
										},
									),
								'SUCCESS' === cancelStatus &&
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										emotion_react_jsx_runtime_browser_esm.HY,
										{
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'h3',
													{
														css: headingStyle,
														children:
															"You've been unsubscribed",
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'div',
													{
														children:
															'We will no longer send you contribution reminder emails. Please note this may take 24/48 hours to take effect.',
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'div',
													{
														css: linkStyle,
														children: (0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'a',
															{
																css: _ref2,
																href: '/email-prefs',
																children:
																	'Manage your email preferences',
															},
														),
													},
												),
											],
										},
									),
								'FAILURE' === cancelStatus &&
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										emotion_react_jsx_runtime_browser_esm.HY,
										{
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'h3',
													{
														css: headingStyle,
														children:
															'Sorry, something went wrong',
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'div',
													{
														children: [
															"You're still subscribed to reminder emails.",
															' ',
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'a',
																{
																	css: _ref,
																	href: '/help-centre/contact-us/tech/s15',
																	children:
																		'Please report the issue',
																},
															),
															' ',
															"and we'll do our best to resolve it for you.",
														],
													},
												),
											],
										},
									),
							],
						})
					);
				};
			const CancelReminders_stories = {
				title: 'Pages/CancelReminders',
				component: CancelReminders,
				decorators: [ReactRouterDecorator.R],
				parameters: {
					layout: 'fullscreen',
					reactRouter: {
						location: '/cancel-reminders/test',
						path: 'cancel-reminders/:reminderCode',
					},
				},
			};
			var Error = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							CancelReminders,
							{},
						),
					parameters: {
						msw: [
							http.d.post(
								'/api/reminders/cancel',
								() => new HttpResponse.Z(null, { status: 500 }),
							),
						],
					},
				},
				Success = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							CancelReminders,
							{},
						),
					parameters: {
						msw: [
							http.d.post(
								'/api/reminders/cancel',
								() => new HttpResponse.Z(null, { status: 200 }),
							),
						],
					},
				};
			(Error.parameters = {
				...Error.parameters,
				docs: {
					...Error.parameters?.docs,
					source: {
						originalSource:
							"{\n  render: () => {\n    return <CancelReminders />;\n  },\n  parameters: {\n    msw: [http.post('/api/reminders/cancel', () => {\n      return new HttpResponse(null, {\n        status: 500\n      });\n    })]\n  }\n}",
						...Error.parameters?.docs?.source,
					},
				},
			}),
				(Success.parameters = {
					...Success.parameters,
					docs: {
						...Success.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <CancelReminders />;\n  },\n  parameters: {\n    msw: [http.post('/api/reminders/cancel', () => {\n      return new HttpResponse(null, {\n        status: 200\n      });\n    })]\n  }\n}",
							...Success.parameters?.docs?.source,
						},
					},
				});
			const __namedExportsOrder = ['Error', 'Success'];
		},
		'?1c38': () => {},
		'?e84b': () => {},
		'?eee3': () => {},
		'?596d': () => {},
	},
]);
