'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[3240],
	{
		'./node_modules/@guardian/source-development-kitchen/dist/react-components/toggle-switch/ToggleSwitch.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => ToggleSwitch,
				});
				var emotion_react_jsx_runtime_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				);
				let sourceIdIndex = 0;
				var description_id = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/accessibility/description-id.js',
					),
					react = __webpack_require__(
						'./node_modules/react/index.js',
					),
					emotion_react_browser_esm = __webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
					palette = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__deprecated__/colour/palette.js',
					),
					typography = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
					space = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
					);
				const buttonStyles = emotion_react_browser_esm.iv`
	flex: none;
	border: none;
	margin: 0;
	padding: 0;
	display: inline-block;
	text-align: center;
	position: relative;
	transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	cursor: pointer;

	&:after {
		content: '';
		position: absolute;
		border-radius: 50%;
		background: ${palette.n$[100]};
		will-change: left;
		transition: left 0.15s ease-in-out;
	}

	:focus + .tooltiptext {
		opacity: 1;
		visibility: visible;
	}
`,
					buttonStylesMargin = (labelPosition) => {
						switch (labelPosition) {
							case 'left':
								return emotion_react_browser_esm.iv`
				margin-left: 8px;
			`;
							case 'right':
								return emotion_react_browser_esm.iv`
				margin-right: 8px;
			`;
						}
					},
					toggleStyles = (format) => emotion_react_browser_esm.iv`
		width: 44px;
		height: 22px;
		border-radius: 16px;
		box-sizing: unset;

		/* this will go away when resets have been standardised */
		&:before,
		&:after {
			box-sizing: border-box;
		}

		&:before {
			content: '';
			position: absolute;
			top: 5px;
			height: 11px;
			width: 6px;
			right: 8px;
			opacity: 0;
			border-bottom: 2px solid ${palette.Vp[400]};
			border-right: 2px solid ${palette.Vp[400]};
			transform: rotate(45deg);
			transition-property: opacity;
			transition-duration: 0.2s;
		}

		&:after {
			height: 18px;
			width: 18px;
			top: 2px;
			left: 2px;
		}

		&[aria-checked='false'] {
			background-color: ${format ? 'rgba(255, 255, 255, 0.4)' : palette.n$[46]};
			border: 1px solid ${format ? 'rgba(255, 255, 255, 0.6)' : palette.n$[46]};
		}

		&[aria-checked='false']:before {
			transition-delay: 0;
		}

		&[aria-checked='true'] {
			background-color: ${palette.Vp[400]};
			border: 1px solid ${format ? '#A7CFB8' : palette.Vp[400]};
		}

		&[aria-checked='true']:before {
			opacity: 1;
			z-index: 1;
			transition-delay: 0.2s;
		}

		&[aria-checked='true']:after {
			left: 24px;
			background: ${palette.n$[100]};
		}

		&:focus {
			outline: 0;
			html:not(.src-focus-disabled) & {
				outline: 5px solid ${format ? palette.n$[100] : palette.UQ[500]};
				outline-offset: 3px;
			}
		}
	`,
					labelStyles = (
						fontSize,
						fontWeight,
						format,
					) => emotion_react_browser_esm.iv`
	${
		'small' === fontSize &&
		('regular' === fontWeight ? typography.VZD : typography.fRL)
	};
	${
		'medium' === fontSize &&
		('regular' === fontWeight ? typography.Kz0 : typography.Rcn)
	};
	color: ${format ? palette.n$[100] : palette.n$[7]};
	display: inline-flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
	user-select: none;
	position: relative;
`,
					labelBorderStyles = (
						format,
					) => emotion_react_browser_esm.iv`
	border-top: 1px solid ${format ? palette.n$[100] : palette.n$[46]};
	padding-top: ${space.D[1]}px;
	width: 100%;
`,
					tooltipStyles = emotion_react_browser_esm.iv`
	position: absolute;
	visibility: hidden;
	width: 248px;
	top: 40px;
	background-color: ${palette.n$[100]};
	border: 1px solid rgba(18, 18, 18, 0.25);
	border-radius: 3px;
	padding: ${space.D[2]};
	z-index: 1;
	opacity: 0;
	transition: 0.7s opacity;
`,
					ToggleSwitch = ({
						checked,
						id,
						fontWeight = 'regular',
						fontSize = 'small',
						format,
						label,
						labelBorder = !1,
						labelPosition = 'right',
						defaultChecked,
						cssOverrides,
						onClick,
						...props
					}) => {
						const buttonId =
								id ?? 'src-component-' + sourceIdIndex++,
							labelId = (0, description_id.S)(buttonId),
							[isBrowser, setIsBrowser] = (0, react.useState)(!1);
						let tooltiptext = '';
						return (
							(0, react.useEffect)(() => {
								setIsBrowser(!0);
							}, []),
							isBrowser || (tooltiptext = 'tooltiptext'),
							(0, emotion_react_jsx_runtime_browser_esm.BX)(
								'label',
								{
									id: labelId,
									css: [
										labelStyles(
											fontSize,
											fontWeight,
											format,
										),
										labelBorder &&
											labelBorderStyles(format),
										cssOverrides,
									],
									...props,
									children: [
										'left' === labelPosition && label,
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'button',
											{
												id: buttonId,
												css: [
													buttonStyles,
													buttonStylesMargin(
														labelPosition,
													),
													toggleStyles(format),
												],
												role: 'switch',
												'aria-checked':
													null != checked
														? checked
														: !!defaultChecked,
												'aria-labelledby': labelId,
												onClick,
											},
										),
										'right' === labelPosition && label,
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'div',
											{
												className: tooltiptext,
												css: tooltipStyles,
												children: (0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'span',
													{
														children:
															'Please turn on JavaScript to use this feature',
													},
												),
											},
										),
									],
								},
							)
						);
					};
			},
		'./client/components/mma/shared/benefits/BenefitsConfiguration.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				BQ: () => filterBenefitByRegion,
				E4: () => getUpgradeBenefits,
				O7: () => benefitsConfiguration,
				oM: () => supporterPlusSwitchBenefits,
			});
			var _client_utilities_currencyIso__WEBPACK_IMPORTED_MODULE_0__ =
				__webpack_require__('./client/utilities/currencyIso.ts');
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
			var supporterNewsletter = {
					name: 'A regular supporter newsletter.',
					description: 'Get exclusive insight from our newsroom',
				},
				uninterruptedReading = {
					name: 'Uninterrupted reading.',
					description: 'See far fewer asks for support',
				},
				newsApp = {
					name: 'Full access to our news app.',
					description: 'Read our reporting on the go',
				},
				feastApp = {
					name: 'Unlimited access to the Guardian Feast App',
					description:
						'Make a feast out of anything with the Guardian’s recipe app',
				},
				adFree = {
					name: 'Ad-free reading.',
					description: 'Avoid ads on all your devices',
				},
				partnerOffers = {
					name: 'Exclusive partner offers.',
					description:
						'Opportunities to access to discounts and tickets',
					specificToRegions: ['AUD'],
				};
			function filterBenefitByRegion(benefit, currencyIso) {
				return (0,
				_client_utilities_currencyIso__WEBPACK_IMPORTED_MODULE_0__.uN)(
					currencyIso,
				)
					? void 0 === benefit.specificToRegions ||
							benefit.specificToRegions.includes(currencyIso)
					: void 0 === benefit.specificToRegions;
			}
			var supporterPlusSwitchBenefits = [newsApp, feastApp, adFree],
				benefitsConfiguration = {
					contributions: [
						supporterNewsletter,
						uninterruptedReading,
						_objectSpread(
							_objectSpread({}, newsApp),
							{},
							{ isUnavailable: !0 },
						),
					],
					supporterplus: [
						supporterNewsletter,
						uninterruptedReading,
						newsApp,
						feastApp,
						adFree,
						partnerOffers,
					],
					tierthree: [
						{
							name: 'Guardian Weekly.',
							description:
								'Print magazine delivered to your door every week',
						},
						supporterNewsletter,
						uninterruptedReading,
						newsApp,
						feastApp,
						adFree,
						partnerOffers,
					],
					membership: [
						newsApp,
						uninterruptedReading,
						supporterNewsletter,
					],
					digipack: [],
					digitalvoucher: [],
					newspaper: [],
					homedelivery: [],
					nationaldelivery: [],
					voucher: [],
					guardianweekly: [],
					guardianadlite: [],
					guardianpatron: [],
				};
			function getUpgradeBenefits(supportProduct) {
				var isUnavailable = 'contributions' === supportProduct;
				return [
					{ name: 'More impactful funding of journalism' },
					{ name: 'A regular supporter newsletter' },
					{ name: 'Unlimited access in our app ', isUnavailable },
					{ name: 'Ad-free reading', isUnavailable },
					{ name: 'Offline reading', isUnavailable },
				];
			}
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
		'./client/components/mma/upgrade/UpgradeSupportStyles.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { T: () => linkCss });
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
						'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
					),
				linkCss = (0, _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__.Kz0,
					';a{color:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.brand[400],
					';}color:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.brand[400],
					';font-weight:700;text-decoration-line:underline;margin-top:10px;display:flex;justify-content:center;',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__.Dp
						.tablet,
					'{margin-left:20px;}',
					'',
				);
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
		'./client/utilities/pricingConfig/suggestedAmounts.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				Q9: () => getContributionSuggestedAmounts,
				uq: () => getSupporterPlusSuggestedAmountsFromMainPlan,
			});
			var _guardian_libs__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@guardian/libs/dist/isOneOf/isOneOf.js',
					),
				_currencyIso__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./client/utilities/currencyIso.ts',
				),
				billingPeriods = ['month', 'year'];
			function getContributionSuggestedAmounts(mainPlan) {
				var currentAmount = mainPlan.price / 100,
					currencyISO = (0,
					_currencyIso__WEBPACK_IMPORTED_MODULE_0__.uN)(
						mainPlan.currencyISO,
					)
						? mainPlan.currencyISO
						: 'international';
				if (
					!(0, _guardian_libs__WEBPACK_IMPORTED_MODULE_1__.g)(
						billingPeriods,
					)(mainPlan.billingPeriod)
				)
					throw new Error(
						'Unexpected billing period: '.concat(
							mainPlan.billingPeriod,
						),
					);
				return suggestedAmountsLookup[currencyISO][
					mainPlan.billingPeriod
				](currentAmount);
			}
			var suggestedAmountsLookup = {
				GBP: {
					month: function getGbpMonthly(amount) {
						if (amount <= 3) return [5, 7, 12];
						if (amount <= 8) return [10, 12, 15];
						if (9 === amount) return [12, 15, 17];
						if (amount <= 13) return [15, 17, 20];
						if (amount <= 23) return [25, 27, 30];
						if (amount <= 23) return [25, 27, 30];
						if (amount <= 28) return [30, 32, 35];
						if (29 === amount) return [35, 37, 40];
						return amount <= 35
							? [40, 42, 45]
							: getSupporterPlusSuggestedAmountsMonthly(amount);
					},
					year: function getGbpAnnual(amount) {
						if (amount <= 11) return [20, 30, 120];
						if (amount <= 13) return [25, 40, 120];
						if (amount <= 16) return [30, 40, 120];
						if (amount <= 18) return [35, 40, 120];
						if (19 === amount) return [40, 50, 120];
						if (amount <= 50) return [60, 70, 120];
						if (amount <= 59) return [70, 80, 120];
						if (amount <= 59) return [70, 80, 120];
						if (amount <= 69) return [80, 90, 120];
						if (amount <= 89) return [95, 110, 120];
						if (amount <= 94) return [95, 130, 140];
						if (amount <= 100) return [120, 130, 140];
						if (amount <= 119) return [150, 160, 170];
						return amount <= 140
							? [240, 250, 260]
							: getSupporterPlusSuggestedAmountsAnnual(amount);
					},
				},
				USD: { month: getUsdMonthly, year: getUsdAnnual },
				EUR: {
					month: function getEuroMonthly(amount) {
						if (amount <= 4) return [6, 8, 12];
						if (amount <= 8) return [10, 12, 15];
						if (9 === amount) return [15, 17, 20];
						if (amount <= 18) return [20, 22, 25];
						if (amount <= 28) return [30, 32, 35];
						if (29 === amount) return [35, 37, 40];
						return amount <= 35
							? [40, 42, 45]
							: getSupporterPlusSuggestedAmountsMonthly(amount);
					},
					year: function getEuroAnnual(amount) {
						if (amount <= 11) return [20, 30, 95];
						if (amount <= 14) return [25, 30, 95];
						if (amount <= 19) return [30, 40, 95];
						if (amount <= 44) return [60, 70, 95];
						if (amount <= 49) return [75, 80, 95];
						if (amount <= 89) return [95, 110, 120];
						if (amount <= 99) return [120, 130, 140];
						if (amount <= 119) return [150, 160, 170];
						if (amount <= 149) return [240, 250, 260];
						return amount <= 150
							? [250, 260, 270]
							: getSupporterPlusSuggestedAmountsAnnual(amount);
					},
				},
				AUD: { month: getAusMonthly, year: getAusAnnual },
				NZD: { month: getAusMonthly, year: getAusAnnual },
				CAD: { month: getUsdMonthly, year: getUsdAnnual },
				international: { month: getUsdMonthly, year: getUsdAnnual },
			};
			function getUsdMonthly(amount) {
				return amount <= 4
					? [5, 7, 15]
					: amount <= 8
					? [10, 13, 15]
					: 9 === amount
					? [13, 15, 17]
					: amount <= 18
					? [20, 22, 25]
					: amount <= 23
					? [25, 27, 30]
					: amount <= 28
					? [30, 32, 35]
					: 29 === amount
					? [35, 37, 40]
					: amount <= 35
					? [40, 42, 45]
					: getSupporterPlusSuggestedAmountsMonthly(amount);
			}
			function getUsdAnnual(amount) {
				return amount <= 10
					? [20, 30, 150]
					: amount <= 20
					? [40, 50, 150]
					: amount <= 30
					? [50, 60, 150]
					: amount <= 39
					? [60, 70, 150]
					: amount <= 50
					? [75, 80, 150]
					: amount <= 55
					? [80, 90, 150]
					: amount <= 59
					? [90, 100, 150]
					: amount <= 70
					? [100, 110, 150]
					: amount <= 89
					? [120, 130, 150]
					: amount <= 99
					? [130, 140, 150]
					: amount <= 114
					? [150, 160, 170]
					: amount <= 119
					? [160, 170, 180]
					: amount <= 139
					? [180, 190, 200]
					: amount <= 150
					? [200, 210, 220]
					: getSupporterPlusSuggestedAmountsAnnual(amount);
			}
			function getAusMonthly(amount) {
				return amount <= 9
					? [15, 17, 20]
					: amount <= 18
					? [20, 22, 25]
					: amount <= 27
					? [30, 32, 35]
					: amount <= 29
					? [35, 37, 40]
					: amount <= 35
					? [40, 42, 45]
					: amount <= 39
					? [45, 47, 50]
					: amount <= 45
					? [50, 52, 55]
					: amount <= 50
					? [60, 62, 65]
					: getSupporterPlusSuggestedAmountsMonthly(amount);
			}
			function getAusAnnual(amount) {
				return amount <= 19
					? [40, 50, 200]
					: amount <= 29
					? [50, 60, 200]
					: amount <= 44
					? [60, 70, 200]
					: amount <= 49
					? [70, 80, 200]
					: amount <= 69
					? [80, 90, 200]
					: amount <= 79
					? [100, 110, 200]
					: amount <= 151
					? [160, 170, 200]
					: amount <= 169
					? [180, 190, 200]
					: amount <= 179
					? [200, 210, 220]
					: amount <= 190
					? [230, 240, 250]
					: amount <= 199
					? [250, 260, 270]
					: amount <= 250
					? [300, 310, 320]
					: getSupporterPlusSuggestedAmountsAnnual(amount);
			}
			function getSupporterPlusSuggestedAmountsFromMainPlan(mainPlan) {
				var currentAmount = mainPlan.price / 100;
				return 'month' === mainPlan.billingPeriod
					? getSupporterPlusSuggestedAmountsMonthly(currentAmount)
					: getSupporterPlusSuggestedAmountsAnnual(currentAmount);
			}
			function getSupporterPlusSuggestedAmountsMonthly(currentAmount) {
				var firstValue = currentAmount + 2,
					secondValue = 5 * Math.ceil((firstValue + 1) / 5);
				return [firstValue, secondValue, secondValue + 5];
			}
			function getSupporterPlusSuggestedAmountsAnnual(currentAmount) {
				return [1.1, 1.25, 1.5].map(
					(p) => 5 * Math.round((currentAmount * p) / 5),
				);
			}
		},
		'./client/components/mma/upgrade/UpgradeSupport.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					UpgradeSupportSwitchThankYouPage: () =>
						UpgradeSupportSwitchThankYouPage,
					UpgradeSupportThankYouPage: () =>
						UpgradeSupportThankYouPage,
					UpgradeSupportValue: () => UpgradeSupportValue,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => UpgradeSupport_stories,
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
				testProducts = __webpack_require__(
					'./client/fixtures/productBuilder/testProducts.ts',
				),
				productMove = __webpack_require__(
					'./client/fixtures/productMove.ts',
				),
				emotion_react_browser_esm = __webpack_require__(
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
				Stack = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/stack/Stack.js',
				),
				react = __webpack_require__('./node_modules/react/index.js'),
				utils = __webpack_require__('./client/utilities/utils.ts'),
				useAsyncLoader = __webpack_require__(
					'./client/utilities/hooks/useAsyncLoader.ts',
				),
				pricingConfig_suggestedAmounts = __webpack_require__(
					'./client/utilities/pricingConfig/suggestedAmounts.ts',
				),
				supporterPlusPricing = __webpack_require__(
					'./client/utilities/pricingConfig/supporterPlusPricing.ts',
				),
				productUtils = __webpack_require__(
					'./client/utilities/productUtils.ts',
				),
				DefaultApiResponseHandler = __webpack_require__(
					'./client/components/mma/shared/asyncComponents/DefaultApiResponseHandler.tsx',
				),
				palette = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
				),
				SvgClock = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgClock.js',
				),
				emotion_react_jsx_runtime_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				),
				visually_hidden = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/accessibility/visually-hidden.js',
				),
				_generated_size = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/size.js',
				);
			const Svg = ({ size, theme }) =>
					(0, emotion_react_jsx_runtime_browser_esm.tZ)('svg', {
						width: size ? _generated_size.EA[size] : void 0,
						height: void 0,
						viewBox: '-3 -3 30 30',
						xmlns: 'http://www.w3.org/2000/svg',
						focusable: !1,
						'aria-hidden': !0,
						children: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							'path',
							{
								fillRule: 'evenodd',
								clipRule: 'evenodd',
								d: 'M12.019 22a9.94 9.94 0 0 0 8.223-4.35l-.114-.616-.797-.478-.615.16c-1.48 2.095-3.895 3.485-6.697 3.485-4.487 0-8.178-3.69-8.178-8.224 0-4.51 3.69-8.177 8.178-8.177 2.574 0 4.784 1.139 6.31 2.96l-3.303.548v1.138h5.831l.433-.432V2h-1.116l-.57 3.44C17.782 3.32 15.094 2 12.02 2 6.484 2 1.996 6.465 1.996 11.977A10.01 10.01 0 0 0 12.02 22',
								fill: theme?.fill,
							},
						),
					}),
				SvgReload = ({ size, theme, isAnnouncedByScreenReader = !1 }) =>
					(0, emotion_react_jsx_runtime_browser_esm.BX)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									Svg,
									{ size, theme },
								),
								isAnnouncedByScreenReader
									? (0,
									  emotion_react_jsx_runtime_browser_esm.tZ)(
											'span',
											{
												css: emotion_react_browser_esm.iv`
					${visually_hidden.j}
				`,
												children: 'Reload',
											},
									  )
									: '',
							],
						},
					);
			var SvgCreditCard = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgCreditCard.js',
				),
				Button = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/button/Button.js',
				),
				theme_reader_revenue = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/button/theme-reader-revenue.js',
				),
				ToggleSwitch = __webpack_require__(
					'./node_modules/@guardian/source-development-kitchen/dist/react-components/toggle-switch/ToggleSwitch.js',
				),
				react_router = __webpack_require__(
					'./node_modules/react-router/index.js',
				),
				dates = __webpack_require__('./shared/dates.ts'),
				ButtonStyles = __webpack_require__(
					'./client/styles/ButtonStyles.ts',
				),
				GenericStyles = __webpack_require__(
					'./client/styles/GenericStyles.ts',
				),
				fetch = __webpack_require__('./client/utilities/fetch.ts');
			var GenericErrorScreen = __webpack_require__(
					'./client/components/shared/GenericErrorScreen.tsx',
				),
				SwitchErrorSummary = __webpack_require__(
					'./client/components/shared/productSwitch/SwitchErrorSummary.tsx',
				),
				SwitchPaymentInfo = __webpack_require__(
					'./client/components/shared/productSwitch/SwitchPaymentInfo.tsx',
				),
				DefaultLoadingView = __webpack_require__(
					'./client/components/mma/shared/asyncComponents/DefaultLoadingView.tsx',
				),
				Heading = __webpack_require__(
					'./client/components/mma/shared/Heading.tsx',
				),
				PaymentDetails = __webpack_require__(
					'./client/components/mma/shared/PaymentDetails.tsx',
				),
				SupporterPlusTsAndCs = __webpack_require__(
					'./client/components/mma/shared/SupporterPlusTsAndCs.tsx',
				),
				productResponse = __webpack_require__(
					'./shared/productResponse.ts',
				),
				productTypes = __webpack_require__('./shared/productTypes.ts'),
				NavConfig = __webpack_require__(
					'./client/components/shared/nav/NavConfig.tsx',
				),
				Page = __webpack_require__('./client/components/mma/Page.tsx'),
				UpgradeSupportContext = (0, react.createContext)({}),
				UpgradeSupportPageContainer = (_ref) => {
					var { pageTitle, children } = _ref;
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						Page._,
						{
							compactTitle: !0,
							minimalFooter: !0,
							selectedNavItem: NavConfig.qy.accountOverview,
							pageTitle:
								null != pageTitle ? pageTitle : 'Your support',
							children,
						},
					);
				};
			function userIsNavigatingBackFromThankYouPage(hasCompleted) {
				return (
					hasCompleted &&
					!location.pathname.includes('thank-you') &&
					!location.pathname.includes('switch-thank-you')
				);
			}
			var UpgradeSupportContainer = () => {
				var request = (0, productUtils.w)(
						productTypes.Pm.contributions
							.allProductsProductTypeFilterString,
					),
					routerState = (0, react_router.TH)().state,
					[journeyCompleted, setJourneyCompleted] = (0,
					react.useState)(!1),
					{ data, loadingState } = (0, useAsyncLoader.c)(
						request,
						DefaultApiResponseHandler.xJ,
					);
				if (loadingState == useAsyncLoader.G.HasError)
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						UpgradeSupportPageContainer,
						{
							children: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								GenericErrorScreen.c,
								{},
							),
						},
					);
				if (loadingState == useAsyncLoader.G.IsLoading)
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						UpgradeSupportPageContainer,
						{
							children: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								DefaultLoadingView.I,
								{
									loadingMessage:
										'Loading your contribution details...',
								},
							),
						},
					);
				if (null == data || 0 == data.products.length)
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						react_router.Fg,
						{ to: '/' },
					);
				if (
					(!journeyCompleted &&
						null != routerState &&
						routerState.journeyCompleted &&
						setJourneyCompleted(!0),
					userIsNavigatingBackFromThankYouPage(journeyCompleted))
				)
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						react_router.Fg,
						{ to: '/' },
					);
				var contribution = data.products.filter(productResponse.v_)[0],
					mainPlan = (0, productResponse.fr)(
						contribution.subscription,
					),
					monthlyOrAnnual = (0, productTypes.xm)(
						mainPlan.billingPeriod,
					),
					inPaymentFailure = !!contribution.alertText,
					pageTitle = 'Your '.concat(
						monthlyOrAnnual.toLowerCase(),
						' support',
					);
				return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
					UpgradeSupportPageContainer,
					{
						pageTitle,
						children: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							UpgradeSupportContext.Provider,
							{
								value: {
									mainPlan,
									subscription: contribution.subscription,
									inPaymentFailure,
									user: data.user,
									isTestUser: contribution.isTestUser,
								},
								children: (0,
								emotion_react_jsx_runtime_browser_esm.tZ)(
									react_router.j3,
									{},
								),
							},
						),
					},
				);
			};
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
			var WhatHappensNext = (_ref) => {
					var {
						amountPayableToday,
						mainPlan,
						subscription,
						nextPaymentDate,
						chosenAmount,
						alreadyPayingAboveThreshold,
					} = _ref;
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						'section',
						{
							css: (0, emotion_react_browser_esm.iv)(
								'border-bottom:1px solid ',
								palette.palette.neutral[86],
								';padding-bottom:',
								space.D[5],
								'px;',
								'',
							),
							children: (0,
							emotion_react_jsx_runtime_browser_esm.BX)(Stack.K, {
								space: 4,
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'div',
										{
											css: (0,
											emotion_react_browser_esm.iv)(
												'border-top:1px solid ',
												palette.palette.neutral[86],
												';padding-bottom:',
												space.D[1],
												'px;',
												'',
											),
											children: (0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'h3',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														typography.Kie,
														';padding-top:',
														space.D[1],
														'px;margin:0;',
														'',
													),
													children:
														'What happens next?',
												},
											),
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'ul',
										{
											css: [
												GenericStyles.Yd,
												GenericStyles.lA,
												GenericStyles.rt,
												'',
												'',
											],
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'li',
													{
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																SvgClock.h,
																{
																	size: 'medium',
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'span',
																{
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'strong',
																			{
																				css: (0,
																				emotion_react_browser_esm.iv)(
																					'padding-bottom:',
																					space
																						.D[1],
																					'px;',
																					'',
																				),
																				children:
																					'Price change will happen today',
																			},
																		),
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'br',
																			{},
																		),
																		'You can start enjoying your exclusive extras straight away.',
																	],
																},
															),
														],
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'li',
													{
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																SvgReload,
																{
																	size: 'medium',
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'span',
																{
																	children:
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			SwitchPaymentInfo.X,
																			{
																				amountPayableToday,
																				alreadyPayingAboveThreshold,
																				currencySymbol:
																					mainPlan.currency,
																				supporterPlusPurchaseAmount:
																					chosenAmount,
																				billingPeriod:
																					mainPlan.billingPeriod,
																				nextPaymentDate,
																			},
																		),
																},
															),
														],
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'li',
													{
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																SvgCreditCard.n,
																{
																	size: 'medium',
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'span',
																{
																	'data-qm-masking':
																		'blocklist',
																	children: [
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'strong',
																			{
																				css: (0,
																				emotion_react_browser_esm.iv)(
																					'padding-bottom:',
																					space
																						.D[1],
																					'px;',
																					'',
																				),
																				children:
																					'Your payment method',
																			},
																		),
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			'br',
																			{},
																		),
																		'The payment will be taken from',
																		' ',
																		(0,
																		emotion_react_jsx_runtime_browser_esm.tZ)(
																			PaymentDetails.g,
																			{
																				subscription,
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
								],
							}),
						},
					);
				},
				RoundUp = (_ref2) => {
					var {
							setChosenAmount,
							thresholdAmount,
							chosenAmountPreRoundup,
							currencySymbol,
							billingPeriod,
						} = _ref2,
						[hasRoundedUp, setHasRoundedUp] = (0, react.useState)(
							!1,
						);
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						'section',
						{
							css: (0, emotion_react_browser_esm.iv)(
								'display:flex;justify-content:space-between;',
								mq.C4.tablet,
								'{padding:',
								space.D[3],
								'px ',
								space.D[1],
								'px ',
								space.D[3],
								'px ',
								space.D[3],
								'px;}padding:',
								space.D[3],
								'px ',
								space.D[2],
								'px ',
								space.D[3],
								'px ',
								space.D[4],
								'px;border-radius:4px;border:1px solid ',
								palette.palette.neutral[86],
								';background:',
								hasRoundedUp
									? palette.palette.neutral[97]
									: palette.palette.neutral[100],
								';',
								'',
							),
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'div',
									{
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'div',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														typography.Rcn,
														';padding-right:',
														space.D[4],
														'px;color:',
														hasRoundedUp
															? palette.palette
																	.neutral[0]
															: palette.palette
																	.neutral[20],
														';',
														'',
													),
													children: [
														'Round up to unlock extras (',
														currencySymbol,
														thresholdAmount,
														'/',
														billingPeriod,
														')',
													],
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'div',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														mq.C4.tablet,
														'{',
														typography.VZD,
														';}',
														typography.Kz0,
														';color:',
														palette.palette
															.neutral[46],
														';',
														'',
													),
													children:
														'Get unlimited app access, ad-free reading, and more.',
												},
											),
										],
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									ToggleSwitch.Z,
									{
										checked: hasRoundedUp,
										onClick: () => {
											var toggleRoundUp = !hasRoundedUp;
											setHasRoundedUp(toggleRoundUp),
												setChosenAmount(
													toggleRoundUp
														? thresholdAmount
														: chosenAmountPreRoundup,
												);
										},
									},
								),
							],
						},
					);
				},
				ConfirmForm = (_ref3) => {
					var {
							chosenAmount,
							setChosenAmount,
							threshold,
							suggestedAmounts,
							previewResponse,
							previewLoadingState,
						} = _ref3,
						{
							mainPlan,
							subscription,
							inPaymentFailure,
							isTestUser,
						} = (0, react.useContext)(UpgradeSupportContext),
						navigate = (0, react_router.s0)(),
						currencySymbol = mainPlan.currency,
						aboveThreshold = chosenAmount >= threshold,
						previousPrice = mainPlan.price / 100,
						[shouldShowRoundUp] = (0, react.useState)(
							!aboveThreshold &&
								suggestedAmounts.includes(threshold),
						),
						[chosenAmountPreRoundup] = (0, react.useState)(
							chosenAmount,
						),
						[isConfirmationLoading, setIsConfirmationLoading] = (0,
						react.useState)(!1),
						[confirmationError, setConfirmationError] = (0,
						react.useState)(!1);
					if (previewLoadingState === useAsyncLoader.G.IsLoading)
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							DefaultLoadingView.I,
							{
								loadingMessage:
									'Loading your payment details...',
							},
						);
					if (
						previewLoadingState === useAsyncLoader.G.HasError ||
						null === previewResponse
					)
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							GenericErrorScreen.c,
							{},
						);
					var amountPayableToday =
							(function calculateAmountPayableToday(
								userChosenAmount,
								contributionRefundAmount,
							) {
								return (
									userChosenAmount -
									Math.abs(contributionRefundAmount)
								);
							})(
								chosenAmount,
								previewResponse.contributionRefundAmount,
							),
						nextPaymentDate = (0, dates.ur)(
							new Date(previewResponse.nextPaymentDate),
							'd MMMM',
						),
						confirmOnClick = (function () {
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
								if (!isConfirmationLoading)
									if (inPaymentFailure)
										setConfirmationError(!0);
									else {
										setIsConfirmationLoading(!0);
										var newAmount,
											subscriptionId,
											routerState = {
												chosenAmount,
												amountPayableToday,
												nextPaymentDate,
												journeyCompleted: !0,
											};
										try {
											if (aboveThreshold)
												null ===
													(yield (0, productUtils.iY)(
														subscription.subscriptionId,
														chosenAmount,
														'recurring-contribution-to-supporter-plus',
														!1,
														isTestUser,
													).then((r) =>
														(0,
														DefaultApiResponseHandler.xJ)(
															r,
														),
													)) &&
													(setIsConfirmationLoading(
														!1,
													),
													setConfirmationError(!0)),
													setIsConfirmationLoading(
														!1,
													),
													navigate(
														'switch-thank-you',
														{ state: routerState },
													);
											else
												null ===
													(yield ((newAmount =
														chosenAmount),
													(subscriptionId =
														subscription.subscriptionId),
													(0, fetch.n4)(
														'/api/update/amount/contributions/'.concat(
															subscriptionId,
														),
														{
															method: 'POST',
															body: JSON.stringify(
																{
																	newPaymentAmount:
																		newAmount,
																},
															),
														},
													)).then((r) =>
														(0,
														DefaultApiResponseHandler.cf)(
															r,
														),
													)) &&
													(setIsConfirmationLoading(
														!1,
													),
													setConfirmationError(!0)),
													setIsConfirmationLoading(
														!1,
													),
													navigate('thank-you', {
														state: routerState,
													});
										} catch (_unused) {
											setIsConfirmationLoading(!1),
												setConfirmationError(!0);
										}
									}
							});
							return function confirmOnClick() {
								return _ref4.apply(this, arguments);
							};
						})(),
						increaseText =
							chosenAmount > previousPrice
								? 'increase'
								: 'change';
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						Stack.K,
						{
							space: 4,
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'section',
									{
										id: 'confirm-change',
										css: (0, emotion_react_browser_esm.iv)(
											mq.Dp.tablet,
											'{padding-bottom:',
											space.D[2],
											'px;}',
											'',
										),
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												Heading.X,
												{
													sansSerif: !0,
													level: '3',
													borderless: !0,
													children: [
														'2. Confirm support ',
														increaseText,
													],
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'div',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														typography.Kz0,
														';',
														'',
													),
													children: [
														"You've selected to support ",
														currencySymbol,
														(0, utils.dN)(
															chosenAmount,
														),
														' per ',
														mainPlan.billingPeriod,
														aboveThreshold
															? ', which unlocks all extras'
															: '',
														'.',
													],
												},
											),
										],
									},
								),
								shouldShowRoundUp &&
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										RoundUp,
										{
											setChosenAmount,
											thresholdAmount: threshold,
											chosenAmountPreRoundup,
											currencySymbol,
											billingPeriod:
												mainPlan.billingPeriod,
										},
									),
								aboveThreshold &&
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										WhatHappensNext,
										{
											amountPayableToday,
											mainPlan,
											subscription,
											nextPaymentDate,
											chosenAmount,
											alreadyPayingAboveThreshold:
												previousPrice >= threshold,
										},
									),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'section',
									{
										css: ButtonStyles.A3,
										children: (0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											Button.z,
											{
												theme: theme_reader_revenue.gk,
												cssOverrides: ButtonStyles._8,
												onClick: confirmOnClick,
												isLoading:
													isConfirmationLoading,
												children: [
													'Confirm ',
													increaseText,
													' to ',
													currencySymbol,
													(0, utils.dN)(chosenAmount),
													'/',
													mainPlan.billingPeriod,
												],
											},
										),
									},
								),
								confirmationError &&
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'section',
										{
											id: 'upgradeSupportErrorMessage',
											children: (0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												SwitchErrorSummary.r,
												{ inPaymentFailure },
											),
										},
									),
								aboveThreshold &&
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'section',
										{
											children: (0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												SupporterPlusTsAndCs.I,
												{
													currencyISO:
														mainPlan.currencyISO,
													billingPeriod:
														mainPlan.billingPeriod,
												},
											),
										},
									),
							],
						},
					);
				};
			try {
				(ConfirmForm.displayName = 'ConfirmForm'),
					(ConfirmForm.__docgenInfo = {
						description: '',
						displayName: 'ConfirmForm',
						props: {
							chosenAmount: {
								defaultValue: null,
								description: '',
								name: 'chosenAmount',
								required: !0,
								type: { name: 'number' },
							},
							setChosenAmount: {
								defaultValue: null,
								description: '',
								name: 'setChosenAmount',
								required: !0,
								type: {
									name: 'Dispatch<SetStateAction<number | null>>',
								},
							},
							threshold: {
								defaultValue: null,
								description: '',
								name: 'threshold',
								required: !0,
								type: { name: 'number' },
							},
							suggestedAmounts: {
								defaultValue: null,
								description: '',
								name: 'suggestedAmounts',
								required: !0,
								type: { name: 'number[]' },
							},
							previewResponse: {
								defaultValue: null,
								description: '',
								name: 'previewResponse',
								required: !0,
								type: { name: 'SwitchPreviewResponse | null' },
							},
							previewLoadingState: {
								defaultValue: null,
								description: '',
								name: 'previewLoadingState',
								required: !0,
								type: {
									name: 'enum',
									value: [
										{ value: '0' },
										{ value: '1' },
										{ value: '2' },
									],
								},
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/upgrade/ConfirmForm.tsx#ConfirmForm'
						] = {
							docgenInfo: ConfirmForm.__docgenInfo,
							name: 'ConfirmForm',
							path: 'client/components/mma/upgrade/ConfirmForm.tsx#ConfirmForm',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var ChoiceCardGroup = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/choice-card/ChoiceCardGroup.js',
				),
				ChoiceCard = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/choice-card/ChoiceCard.js',
				),
				TextInput = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/text-input/TextInput.js',
				),
				contributionsAmount = __webpack_require__(
					'./client/utilities/pricingConfig/contributionsAmount.ts',
				),
				SvgCrossRoundFilled = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgCrossRoundFilled.js',
				),
				SvgTickRound = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgTickRound.js',
				),
				BenefitsStyles = __webpack_require__(
					'./client/components/mma/shared/benefits/BenefitsStyles.tsx',
				),
				UpgradeBenefit = (_ref) => {
					var { benefit } = _ref;
					return (0, emotion_react_jsx_runtime_browser_esm.BX)('li', {
						css: benefit.isUnavailable ? BenefitsStyles.WH : '',
						children: [
							benefit.isUnavailable
								? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
										SvgCrossRoundFilled.i,
										{
											isAnnouncedByScreenReader: !0,
											size: 'medium',
										},
								  )
								: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
										SvgTickRound.X,
										{
											isAnnouncedByScreenReader: !0,
											size: 'medium',
										},
								  ),
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								'span',
								{
									css: (0, emotion_react_browser_esm.iv)(
										'padding-top:',
										space.D[1],
										'px;',
										'',
									),
									children: benefit.name,
								},
							),
						],
					});
				},
				UpgradeBenefitsCard = (_ref2) => {
					var { chosenAmountDisplay: amountChosenMessage, benefits } =
						_ref2;
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						'div',
						{
							css: (0, emotion_react_browser_esm.iv)(
								'background-color:#f3f7fe;border-radius:4px;padding:',
								space.D[4],
								'px;',
								'',
							),
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'div',
									{
										css: (0, emotion_react_browser_esm.iv)(
											typography.Rcn,
											';margin-bottom:',
											space.D[2],
											'px;',
											'',
										),
										children: [
											amountChosenMessage,
											' unlocks:',
										],
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'ul',
									{
										css: BenefitsStyles.fZ,
										children: benefits.map((benefit) =>
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												UpgradeBenefit,
												{ benefit },
												benefit.name,
											),
										),
									},
								),
							],
						},
					);
				};
			try {
				(UpgradeBenefitsCard.displayName = 'UpgradeBenefitsCard'),
					(UpgradeBenefitsCard.__docgenInfo = {
						description: '',
						displayName: 'UpgradeBenefitsCard',
						props: {
							chosenAmountDisplay: {
								defaultValue: null,
								description: '',
								name: 'chosenAmountDisplay',
								required: !0,
								type: { name: 'string' },
							},
							benefits: {
								defaultValue: null,
								description: '',
								name: 'benefits',
								required: !0,
								type: { name: 'ProductBenefit[]' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/benefits/BenefitsCard.tsx#UpgradeBenefitsCard'
						] = {
							docgenInfo: UpgradeBenefitsCard.__docgenInfo,
							name: 'UpgradeBenefitsCard',
							path: 'client/components/mma/shared/benefits/BenefitsCard.tsx#UpgradeBenefitsCard',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var BenefitsConfiguration = __webpack_require__(
				'./client/components/mma/shared/benefits/BenefitsConfiguration.ts',
			);
			function UpgradeSupportAmountForm_asyncGeneratorStep(
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
			function _scrollToConfirmChange() {
				return (
					(_scrollToConfirmChange =
						(function UpgradeSupportAmountForm_asyncToGenerator(
							fn,
						) {
							return function () {
								var self = this,
									args = arguments;
								return new Promise(function (resolve, reject) {
									var gen = fn.apply(self, args);
									function _next(value) {
										UpgradeSupportAmountForm_asyncGeneratorStep(
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
										UpgradeSupportAmountForm_asyncGeneratorStep(
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
							var confirmElement = yield (0, utils.br)(
								'#confirm-change',
							);
							null == confirmElement ||
								confirmElement.scrollIntoView({
									behavior: 'smooth',
								}),
								(parent.location.hash = 'confirm-change');
						})),
					_scrollToConfirmChange.apply(this, arguments)
				);
			}
			function BenefitsDisplay(_ref) {
				var { chosenAmount, chosenAmountDisplay, threshold } = _ref,
					benefitsList =
						chosenAmount < threshold
							? (0, BenefitsConfiguration.E4)('contributions')
							: (0, BenefitsConfiguration.E4)('supporterplus');
				return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
					UpgradeBenefitsCard,
					{ chosenAmountDisplay, benefits: benefitsList },
				);
			}
			var UpgradeSupportAmountForm = (_ref2) => {
				var {
						chosenAmount,
						setChosenAmount,
						threshold,
						setContinuedToConfirmation,
						continuedToConfirmation,
						suggestedAmounts,
					} = _ref2,
					{ mainPlan } = (0, react.useContext)(UpgradeSupportContext),
					priceConfig = (contributionsAmount.G[
						mainPlan.currencyISO
					] || contributionsAmount.G.international)[
						mainPlan.billingPeriod
					],
					currencySymbol = mainPlan.currency,
					amountLabel = (amount) =>
						''
							.concat(currencySymbol)
							.concat((0, utils.dN)(amount), ' per ')
							.concat(mainPlan.billingPeriod),
					currentAmount = mainPlan.price / 100,
					otherAmountLabel = 'Enter an amount ('
						.concat(currencySymbol, ' per ')
						.concat(mainPlan.billingPeriod, ')'),
					[isOtherAmountSelected, setIsOtherAmountSelected] = (0,
					react.useState)(!1),
					[otherAmountSelected, setOtherAmountSelected] = (0,
					react.useState)(null),
					[
						hasInteractedWithOtherAmount,
						setHasInteractedWithOtherAmount,
					] = (0, react.useState)(!1),
					[errorMessage, setErrorMessage] = (0, react.useState)(null);
				return (
					(0, react.useEffect)(() => {
						null !== otherAmountSelected &&
							setHasInteractedWithOtherAmount(!0);
					}, [otherAmountSelected]),
					(0, react.useEffect)(() => {
						var newErrorMessage = (function validateChoice(
							currentAmount,
							chosenAmount,
							minAmount,
							maxAmount,
							isOtherAmountSelected,
						) {
							return chosenAmount || isOtherAmountSelected
								? chosenAmount === currentAmount
									? 'This is the same amount as your current support. Please enter a new amount.'
									: !chosenAmount ||
									  chosenAmount < minAmount ||
									  chosenAmount > maxAmount
									? 'Enter a number between '
											.concat(minAmount, ' and ')
											.concat(maxAmount, '.')
									: null
								: 'Please make a selection';
						})(
							currentAmount,
							chosenAmount,
							priceConfig.minAmount,
							priceConfig.maxAmount,
							isOtherAmountSelected,
						);
						setIsOtherAmountSelected(
							chosenAmount === otherAmountSelected,
						),
							setErrorMessage(newErrorMessage);
					}, [
						otherAmountSelected,
						chosenAmount,
						currentAmount,
						isOtherAmountSelected,
						priceConfig.maxAmount,
						priceConfig.minAmount,
					]),
					(0, emotion_react_jsx_runtime_browser_esm.tZ)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: (0,
							emotion_react_jsx_runtime_browser_esm.BX)(Stack.K, {
								space: 3,
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										Heading.X,
										{
											sansSerif: !0,
											level: '3',
											borderless: !0,
											children:
												'1. Choose your new amount',
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										Stack.K,
										{
											space: 4,
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													ChoiceCardGroup.Y,
													{
														cssOverrides:
															GenericStyles.aR,
														name: 'amounts',
														'data-cy':
															'contribution-amount-choices',
														children: (0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															emotion_react_jsx_runtime_browser_esm.HY,
															{
																children: [
																	suggestedAmounts.map(
																		(
																			amount,
																		) =>
																			(0,
																			emotion_react_jsx_runtime_browser_esm.tZ)(
																				ChoiceCard.f,
																				{
																					id: 'amount-'.concat(
																						amount,
																					),
																					value: amount.toString(),
																					label: amountLabel(
																						amount,
																					),
																					checked:
																						chosenAmount ===
																							amount &&
																						!isOtherAmountSelected,
																					onChange:
																						() => {
																							setChosenAmount(
																								amount,
																							),
																								setIsOtherAmountSelected(
																									!1,
																								),
																								setContinuedToConfirmation(
																									!1,
																								);
																						},
																				},
																				amount,
																			),
																	),
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		ChoiceCard.f,
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
																						setChosenAmount(
																							otherAmountSelected,
																						),
																						setContinuedToConfirmation(
																							!1,
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
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'div',
														{
															css: (0,
															emotion_react_browser_esm.iv)(
																'margin-top:',
																space.D[3],
																'px;',
																'',
															),
															children: (0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																TextInput.o,
																{
																	label: otherAmountLabel,
																	supporting:
																		'Support '
																			.concat(
																				currencySymbol,
																			)
																			.concat(
																				threshold,
																				'/',
																			)
																			.concat(
																				mainPlan.billingPeriod,
																				' or more to unlock extras.',
																			),
																	error:
																		(hasInteractedWithOtherAmount &&
																			errorMessage) ||
																		void 0,
																	type: 'number',
																	width: 30,
																	value:
																		(null ==
																		otherAmountSelected
																			? void 0
																			: otherAmountSelected.toString()) ||
																		'',
																	onWheel: (
																		event,
																	) =>
																		event.currentTarget.blur(),
																	onChange: (
																		event,
																	) => {
																		setChosenAmount(
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
																			setOtherAmountSelected(
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
																			setContinuedToConfirmation(
																				!1,
																			);
																	},
																},
															),
														},
													),
												!errorMessage &&
													!!chosenAmount &&
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														BenefitsDisplay,
														{
															chosenAmountDisplay:
																''
																	.concat(
																		currencySymbol,
																	)
																	.concat(
																		(0,
																		utils.dN)(
																			chosenAmount,
																		),
																		' per ',
																	)
																	.concat(
																		mainPlan.billingPeriod,
																	),
															chosenAmount,
															threshold,
														},
													),
												!continuedToConfirmation &&
													!errorMessage &&
													!!chosenAmount &&
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'section',
														{
															css: ButtonStyles.A3,
															children: (0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																Button.z,
																{
																	theme: theme_reader_revenue.gk,
																	cssOverrides:
																		ButtonStyles._8,
																	onClick:
																		() => {
																			setContinuedToConfirmation(
																				!0,
																			),
																				(function scrollToConfirmChange() {
																					return _scrollToConfirmChange.apply(
																						this,
																						arguments,
																					);
																				})();
																		},
																	children: [
																		'Continue with ',
																		currencySymbol,
																		(0,
																		utils.dN)(
																			chosenAmount,
																		),
																		'/',
																		mainPlan.billingPeriod,
																	],
																},
															),
														},
													),
											],
										},
									),
								],
							}),
						},
					)
				);
			};
			try {
				(UpgradeSupportAmountForm.displayName =
					'UpgradeSupportAmountForm'),
					(UpgradeSupportAmountForm.__docgenInfo = {
						description: '',
						displayName: 'UpgradeSupportAmountForm',
						props: {
							chosenAmount: {
								defaultValue: null,
								description: '',
								name: 'chosenAmount',
								required: !0,
								type: { name: 'number | null' },
							},
							setChosenAmount: {
								defaultValue: null,
								description: '',
								name: 'setChosenAmount',
								required: !0,
								type: {
									name: 'Dispatch<SetStateAction<number | null>>',
								},
							},
							threshold: {
								defaultValue: null,
								description: '',
								name: 'threshold',
								required: !0,
								type: { name: 'number' },
							},
							setContinuedToConfirmation: {
								defaultValue: null,
								description: '',
								name: 'setContinuedToConfirmation',
								required: !0,
								type: {
									name: 'Dispatch<SetStateAction<boolean>>',
								},
							},
							continuedToConfirmation: {
								defaultValue: null,
								description: '',
								name: 'continuedToConfirmation',
								required: !0,
								type: { name: 'boolean' },
							},
							suggestedAmounts: {
								defaultValue: null,
								description: '',
								name: 'suggestedAmounts',
								required: !0,
								type: { name: 'number[]' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/upgrade/UpgradeSupportAmountForm.tsx#UpgradeSupportAmountForm'
						] = {
							docgenInfo: UpgradeSupportAmountForm.__docgenInfo,
							name: 'UpgradeSupportAmountForm',
							path: 'client/components/mma/upgrade/UpgradeSupportAmountForm.tsx#UpgradeSupportAmountForm',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var UpgradeSupport = () => {
					var { mainPlan, subscription, isTestUser } = (0,
						react.useContext)(UpgradeSupportContext),
						suggestedAmounts = (0,
						pricingConfig_suggestedAmounts.Q9)(mainPlan),
						[chosenAmount, setChosenAmount] = (0, react.useState)(
							suggestedAmounts[0],
						),
						[continuedToConfirmation, setContinuedToConfirmation] =
							(0, react.useState)(!1),
						currentAmount = mainPlan.price / 100,
						threshold = (0, supporterPlusPricing.s)(
							mainPlan.currencyISO,
							mainPlan.billingPeriod,
						),
						{
							data: previewResponse,
							loadingState: previewLoadingState,
						} = (0, useAsyncLoader.c)(
							() =>
								(0, productUtils.iY)(
									subscription.subscriptionId,
									threshold,
									'recurring-contribution-to-supporter-plus',
									!0,
									isTestUser,
								),
							DefaultApiResponseHandler.xJ,
						);
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								'section',
								{
									css: (0, emotion_react_browser_esm.iv)(
										'margin-top:',
										space.D[4],
										'px;',
										'',
									),
									children: (0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										Stack.K,
										{
											space: 6,
											children: [
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													Stack.K,
													{
														space: 1,
														children: [
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'h2',
																{
																	css: (0,
																	emotion_react_browser_esm.iv)(
																		'margin:0;',
																		typography.t_M,
																		';',
																		mq.C4
																			.tablet,
																		'{',
																		typography.vD7,
																		';}',
																		'',
																	),
																	children:
																		'Increase your support',
																},
															),
															(0,
															emotion_react_jsx_runtime_browser_esm.BX)(
																'div',
																{
																	css: (0,
																	emotion_react_browser_esm.iv)(
																		typography.Kz0,
																		';padding-bottom:',
																		space
																			.D[2],
																		'px;',
																		mq.C4
																			.tablet,
																		'{padding-bottom:',
																		space
																			.D[4],
																		'px;}',
																		'',
																	),
																	children: [
																		"You're currently supporting ",
																		mainPlan.currency,
																		(0,
																		utils.dN)(
																			currentAmount,
																		),
																		' per',
																		' ',
																		mainPlan.billingPeriod,
																		'.',
																	],
																},
															),
														],
													},
												),
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													UpgradeSupportAmountForm,
													{
														chosenAmount,
														setChosenAmount,
														threshold,
														setContinuedToConfirmation,
														continuedToConfirmation,
														suggestedAmounts,
													},
												),
												continuedToConfirmation &&
													chosenAmount &&
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														ConfirmForm,
														{
															chosenAmount,
															setChosenAmount,
															threshold,
															suggestedAmounts,
															previewResponse,
															previewLoadingState,
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
				SvgEnvelope = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgEnvelope.js',
				),
				SvgCalendar = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgCalendar.js',
				),
				LinkButton = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/button/LinkButton.js',
				),
				signInCss = (0, emotion_react_browser_esm.iv)(
					'display:grid;overflow:hidden;background-color:',
					palette.palette.brand[500],
					';border-radius:8px;>*{grid-area:1/1;}>svg{place-self:end;height:0;min-height:100%;}',
					mq.Dp.tablet,
					'{border-radius:0;}',
					'',
				),
				signInHeadingCss = (0, emotion_react_browser_esm.iv)(
					typography.Rcn,
					';margin:0;',
					'',
				),
				signInParaCss = (0, emotion_react_browser_esm.iv)(
					typography.Kz0,
					';margin:0;max-width:64%;',
					'',
				),
				signInContentContainerCss = (0, emotion_react_browser_esm.iv)(
					'padding:',
					space.D[3],
					'px;color:',
					palette.palette.neutral[100],
					';',
					'',
				),
				SwitchSignInImage = __webpack_require__(
					'./client/components/mma/switch/complete/SwitchSignInImage.tsx',
				),
				UpgradeSupportStyles = __webpack_require__(
					'./client/components/mma/upgrade/UpgradeSupportStyles.ts',
				),
				UpgradeSupportSwitchThankYou = () => {
					var _upgradeSupportContex,
						_upgradeSupportContex2,
						upgradeSupportContext = (0, react.useContext)(
							UpgradeSupportContext,
						),
						routerState = (0, react_router.TH)().state,
						amountPayableToday =
							null == routerState
								? void 0
								: routerState.amountPayableToday,
						chosenAmount =
							null == routerState
								? void 0
								: routerState.chosenAmount,
						nextPaymentDate =
							null == routerState
								? void 0
								: routerState.nextPaymentDate,
						currency = upgradeSupportContext.mainPlan.currency,
						previousPrice =
							upgradeSupportContext.mainPlan.price / 100,
						billingPeriod =
							upgradeSupportContext.mainPlan.billingPeriod,
						userEmail =
							null !==
								(_upgradeSupportContex =
									null ===
										(_upgradeSupportContex2 =
											upgradeSupportContext.user) ||
									void 0 === _upgradeSupportContex2
										? void 0
										: _upgradeSupportContex2.email) &&
							void 0 !== _upgradeSupportContex
								? _upgradeSupportContex
								: '',
						increasedText =
							chosenAmount > previousPrice
								? 'increased'
								: 'changed';
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'section',
									{
										css: (0, emotion_react_browser_esm.iv)(
											'margin-top:',
											space.D[4],
											'px;',
											'',
										),
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												Stack.K,
												{
													space: 4,
													children: (0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'h2',
														{
															css: (0,
															emotion_react_browser_esm.iv)(
																'margin:0;',
																typography.t_M,
																';',
																mq.C4.tablet,
																'{',
																typography.vD7,
																';}',
																'',
															),
															children:
																'Thank you for your continued support.',
														},
													),
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												Stack.K,
												{
													space: 4,
													children: (0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'div',
														{
															css: (0,
															emotion_react_browser_esm.iv)(
																typography.Kz0,
																';margin-bottom:32px;',
																'',
															),
															children: [
																'You’ve ',
																increasedText,
																' your support from ',
																currency,
																(0, utils.dN)(
																	previousPrice,
																),
																' to ',
																currency,
																(0, utils.dN)(
																	chosenAmount,
																),
																' per ',
																billingPeriod,
																'.',
															],
														},
													),
												},
											),
										],
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'section',
									{
										css: (0, emotion_react_browser_esm.iv)(
											'border-bottom:1px solid ',
											palette.palette.neutral[86],
											';padding-bottom:',
											space.D[5],
											'px;',
											'',
										),
										children: (0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											Stack.K,
											{
												space: 4,
												children: [
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'div',
														{
															css: (0,
															emotion_react_browser_esm.iv)(
																'border-top:1px solid ',
																palette.palette
																	.neutral[86],
																';padding-bottom:',
																space.D[1],
																'px;',
																'',
															),
															children: (0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'h3',
																{
																	css: (0,
																	emotion_react_browser_esm.iv)(
																		typography.Kie,
																		';padding-top:',
																		space
																			.D[1],
																		'px;margin:0;',
																		'',
																	),
																	children:
																		'What happens next?',
																},
															),
														},
													),
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'ul',
														{
															css: [
																GenericStyles.Yd,
																GenericStyles.lA,
																GenericStyles.rt,
																'',
																'',
															],
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'li',
																	{
																		children:
																			[
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					SvgEnvelope.j,
																					{
																						size: 'medium',
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.BX)(
																					'span',
																					{
																						'data-qm-masking':
																							'blocklist',
																						children:
																							[
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									'strong',
																									{
																										css: (0,
																										emotion_react_browser_esm.iv)(
																											'padding-bottom:',
																											space
																												.D[1],
																											'px;',
																											'',
																										),
																										children:
																											'Check your email',
																									},
																								),
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									'br',
																									{},
																								),
																								'You will receive a confirmation email to',
																								' ',
																								userEmail,
																							],
																					},
																				),
																			],
																	},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'li',
																	{
																		children:
																			[
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					SvgCalendar.c,
																					{
																						size: 'medium',
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.BX)(
																					'span',
																					{
																						children:
																							[
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									'strong',
																									{
																										css: (0,
																										emotion_react_browser_esm.iv)(
																											'padding-bottom:',
																											space
																												.D[1],
																											'px;',
																											'',
																										),
																										children:
																											'Your billing date has changed',
																									},
																								),
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									'br',
																									{},
																								),
																								'Your first billing date is today and you will be charged ',
																								currency,
																								(0,
																								utils.dN)(
																									amountPayableToday,
																								),
																								'. From',
																								' ',
																								nextPaymentDate,
																								', your ongoing',
																								' ',
																								(0,
																								productTypes.xm)(
																									billingPeriod,
																								).toLowerCase(),
																								' ',
																								'payment will be ',
																								currency,
																								(0,
																								utils.dN)(
																									chosenAmount,
																								),
																								'.',
																							],
																					},
																				),
																			],
																	},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'li',
																	{
																		children:
																			[
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					SvgClock.h,
																					{
																						size: 'medium',
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.BX)(
																					'span',
																					{
																						children:
																							[
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									'strong',
																									{
																										css: (0,
																										emotion_react_browser_esm.iv)(
																											'padding-bottom:',
																											space
																												.D[1],
																											'px;',
																											'',
																										),
																										children:
																											'Enjoy your new extras',
																									},
																								),
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									'br',
																									{},
																								),
																								'Your new support plan starts today. It may take up to an hour for your full app access to become available.',
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
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'section',
									{
										children: (0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											'div',
											{
												css: signInCss,
												children: [
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														SwitchSignInImage.V,
														{},
													),
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'div',
														{
															css: signInContentContainerCss,
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'h2',
																	{
																		css: signInHeadingCss,
																		children:
																			'Sign in on all your devices',
																	},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'p',
																	{
																		css: signInParaCss,
																		children:
																			'To access your extras on all your digital devices, please sign in. It takes less than a minute.',
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
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'section',
									{
										css: GenericStyles.zC,
										children: (0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											'div',
											{
												css: ButtonStyles.SX,
												children: [
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														LinkButton.Q,
														{
															href: 'https://theguardian.com',
															cssOverrides:
																ButtonStyles._8,
															children:
																'Continue to the Guardian',
														},
													),
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'div',
														{
															css: UpgradeSupportStyles.T,
															children: (0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'a',
																{
																	href: '/',
																	children:
																		'Back to account overview ',
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
					);
				},
				UpgradeSupportThankYou = () => {
					var _upgradeSupportContex,
						_upgradeSupportContex2,
						_upgradeSupportContex3,
						upgradeSupportContext = (0, react.useContext)(
							UpgradeSupportContext,
						),
						routerState = (0, react_router.TH)().state,
						chosenAmount =
							null == routerState
								? void 0
								: routerState.chosenAmount,
						currency = upgradeSupportContext.mainPlan.currency,
						previousPrice =
							upgradeSupportContext.mainPlan.price / 100,
						billingPeriod =
							upgradeSupportContext.mainPlan.billingPeriod,
						userEmail =
							null !==
								(_upgradeSupportContex =
									null ===
										(_upgradeSupportContex2 =
											upgradeSupportContext.user) ||
									void 0 === _upgradeSupportContex2
										? void 0
										: _upgradeSupportContex2.email) &&
							void 0 !== _upgradeSupportContex
								? _upgradeSupportContex
								: '',
						nextBillingDate = (0, dates.sG)(
							null !==
								(_upgradeSupportContex3 =
									upgradeSupportContext.mainPlan
										.chargedThrough) &&
								void 0 !== _upgradeSupportContex3
								? _upgradeSupportContex3
								: void 0,
						).dateStr(dates.Bn),
						increasedText =
							chosenAmount > previousPrice
								? 'increased'
								: 'changed';
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'section',
									{
										css: (0, emotion_react_browser_esm.iv)(
											'margin-top:',
											space.D[4],
											'px;',
											'',
										),
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												Stack.K,
												{
													space: 4,
													children: (0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'h2',
														{
															css: (0,
															emotion_react_browser_esm.iv)(
																'margin:0;',
																typography.t_M,
																';',
																mq.C4.tablet,
																'{',
																typography.vD7,
																';}',
																'',
															),
															children:
																'Thank you for your continued support.',
														},
													),
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												Stack.K,
												{
													space: 4,
													children: (0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'div',
														{
															css: (0,
															emotion_react_browser_esm.iv)(
																typography.Kz0,
																';margin-bottom:32px;',
																'',
															),
															children: [
																'You’ve ',
																increasedText,
																' your support from ',
																currency,
																(0, utils.dN)(
																	previousPrice,
																),
																' to ',
																currency,
																(0, utils.dN)(
																	chosenAmount,
																),
																' per ',
																billingPeriod,
																'.',
															],
														},
													),
												},
											),
										],
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'section',
									{
										css: (0, emotion_react_browser_esm.iv)(
											'border-bottom:1px solid ',
											palette.palette.neutral[86],
											';padding-bottom:',
											space.D[5],
											'px;',
											'',
										),
										children: (0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											Stack.K,
											{
												space: 4,
												children: [
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'div',
														{
															css: (0,
															emotion_react_browser_esm.iv)(
																'border-top:1px solid ',
																palette.palette
																	.neutral[86],
																';padding-bottom:',
																space.D[1],
																'px;',
																'',
															),
															children: (0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'h3',
																{
																	css: (0,
																	emotion_react_browser_esm.iv)(
																		typography.Kie,
																		';padding-top:',
																		space
																			.D[1],
																		'px;margin:0;',
																		'',
																	),
																	children:
																		'What happens next?',
																},
															),
														},
													),
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'ul',
														{
															css: [
																GenericStyles.Yd,
																GenericStyles.lA,
																GenericStyles.rt,
																'',
																'',
															],
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'li',
																	{
																		children:
																			[
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					SvgEnvelope.j,
																					{
																						size: 'medium',
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.BX)(
																					'span',
																					{
																						'data-qm-masking':
																							'blocklist',
																						children:
																							[
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									'strong',
																									{
																										css: (0,
																										emotion_react_browser_esm.iv)(
																											'padding-bottom:',
																											space
																												.D[1],
																											'px;',
																											'',
																										),
																										children:
																											'Check your email',
																									},
																								),
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									'br',
																									{},
																								),
																								'You will receive a confirmation email to',
																								' ',
																								userEmail,
																							],
																					},
																				),
																			],
																	},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'li',
																	{
																		children:
																			[
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					SvgCalendar.c,
																					{
																						size: 'medium',
																					},
																				),
																				(0,
																				emotion_react_jsx_runtime_browser_esm.BX)(
																					'span',
																					{
																						children:
																							[
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									'strong',
																									{
																										css: (0,
																										emotion_react_browser_esm.iv)(
																											'padding-bottom:',
																											space
																												.D[1],
																											'px;',
																											'',
																										),
																										children:
																											'Your billing date',
																									},
																								),
																								(0,
																								emotion_react_jsx_runtime_browser_esm.tZ)(
																									'br',
																									{},
																								),
																								'From ',
																								nextBillingDate,
																								', your ongoing',
																								' ',
																								(0,
																								productTypes.xm)(
																									billingPeriod,
																								).toLowerCase(),
																								' ',
																								'payment will be ',
																								currency,
																								(0,
																								utils.dN)(
																									chosenAmount,
																								),
																								'.',
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
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'section',
									{
										children: (0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											'div',
											{
												css: signInCss,
												children: [
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														SwitchSignInImage.V,
														{},
													),
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'div',
														{
															css: signInContentContainerCss,
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'h2',
																	{
																		css: signInHeadingCss,
																		children:
																			'Sign in on all your devices',
																	},
																),
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'p',
																	{
																		css: signInParaCss,
																		children:
																			'For the best experience, please sign in on the app and web. It takes less than a minute.',
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
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'div',
									{
										css: ButtonStyles.SX,
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												LinkButton.Q,
												{
													href: 'https://theguardian.com',
													cssOverrides:
														ButtonStyles._8,
													children:
														'Continue to the Guardian',
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'div',
												{
													css: UpgradeSupportStyles.T,
													children: (0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'a',
														{
															href: '/',
															children:
																'Back to account overview ',
														},
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
			const UpgradeSupport_stories = {
				title: 'Pages/UpgradeSupport',
				component: UpgradeSupportContainer,
				decorators: [ReactRouterDecorator.R],
				parameters: {
					layout: 'fullscreen',
					reactRouter: {
						state: {
							amountPayableToday: 5.9,
							chosenAmount: 9,
							nextPaymentDate: '20 March',
						},
						container: (0,
						emotion_react_jsx_runtime_browser_esm.tZ)(
							UpgradeSupportContainer,
							{},
						),
					},
					msw: [
						http.d.get('/api/me/mma', () =>
							HttpResponse.Z.json(
								(0, mdapiResponse.F)((0, testProducts.ZY)()),
							),
						),
						http.d.post('/api/product-move/*', () =>
							HttpResponse.Z.json(productMove.H),
						),
					],
				},
			};
			var UpgradeSupportValue = () =>
					(0, emotion_react_jsx_runtime_browser_esm.tZ)(
						UpgradeSupport,
						{},
					),
				UpgradeSupportSwitchThankYouPage = () =>
					(0, emotion_react_jsx_runtime_browser_esm.tZ)(
						UpgradeSupportSwitchThankYou,
						{},
					),
				UpgradeSupportThankYouPage = () =>
					(0, emotion_react_jsx_runtime_browser_esm.tZ)(
						UpgradeSupportThankYou,
						{},
					);
			(UpgradeSupportValue.parameters = {
				...UpgradeSupportValue.parameters,
				docs: {
					...UpgradeSupportValue.parameters?.docs,
					source: {
						originalSource:
							'() => {\n  return <UpgradeSupport />;\n}',
						...UpgradeSupportValue.parameters?.docs?.source,
					},
				},
			}),
				(UpgradeSupportSwitchThankYouPage.parameters = {
					...UpgradeSupportSwitchThankYouPage.parameters,
					docs: {
						...UpgradeSupportSwitchThankYouPage.parameters?.docs,
						source: {
							originalSource:
								'() => {\n  return <UpgradeSupportSwitchThankYou />;\n}',
							...UpgradeSupportSwitchThankYouPage.parameters?.docs
								?.source,
						},
					},
				}),
				(UpgradeSupportThankYouPage.parameters = {
					...UpgradeSupportThankYouPage.parameters,
					docs: {
						...UpgradeSupportThankYouPage.parameters?.docs,
						source: {
							originalSource:
								'() => {\n  return <UpgradeSupportThankYou />;\n}',
							...UpgradeSupportThankYouPage.parameters?.docs
								?.source,
						},
					},
				});
			const __namedExportsOrder = [
				'UpgradeSupportValue',
				'UpgradeSupportSwitchThankYouPage',
				'UpgradeSupportThankYouPage',
			];
		},
	},
]);
//# sourceMappingURL=components-mma-upgrade-UpgradeSupport-stories.96acc8f5.iframe.bundle.js.map
