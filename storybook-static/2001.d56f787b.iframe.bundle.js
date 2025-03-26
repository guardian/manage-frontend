'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[2001],
	{
		'./client/components/mma/shared/Card.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { Z: () => Card });
			var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				Card = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
						'div',
						{ children: props.children },
					);
			(Card.Header = (props) => {
				var _props$minHeightOverr,
					_props$backgroundColo,
					headerCss = (0,
					_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(
						'position:relative;padding:',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
							.D[3],
						'px ',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
							.D[4],
						'px;min-height:',
						null !==
							(_props$minHeightOverr = props.minHeightOverride) &&
							void 0 !== _props$minHeightOverr
							? _props$minHeightOverr
							: '64px',
						';background-color:',
						null !==
							(_props$backgroundColo = props.backgroundColor) &&
							void 0 !== _props$backgroundColo
							? _props$backgroundColo
							: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
									.palette.neutral[97],
						';border-top-left-radius:8px;border-top-right-radius:8px;',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
							.Dp.tablet,
						'{border-radius:0;min-height:auto;}',
						'',
					);
				return (0,
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
					'header',
					{ css: headerCss, children: props.children },
				);
			}),
				(Card.Section = (props) => {
					var sectionCss = (0,
					_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(
						'padding:',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
							.D[5],
						'px ',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
							.D[4],
						'px;border:1px solid ',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
							.palette.neutral[86],
						';border-top:none;:last-of-type{border-bottom-left-radius:8px;border-bottom-right-radius:8px;',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
							.Dp.tablet,
						'{border-radius:0;}}',
						props.backgroundColor &&
							'\n\t\t\tbackground-color: '.concat(
								props.backgroundColor,
								';\n\t\t',
							),
						';',
						'',
					);
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
						'div',
						{ css: sectionCss, children: props.children },
					);
				});
			try {
				(Card.displayName = 'Card'),
					(Card.__docgenInfo = {
						description: '',
						displayName: 'Card',
						props: {},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/Card.tsx#Card'
						] = {
							docgenInfo: Card.__docgenInfo,
							name: 'Card',
							path: 'client/components/mma/shared/Card.tsx#Card',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(Header.displayName = 'Card.Header'),
					(Header.__docgenInfo = {
						description: '',
						displayName: 'Card.Header',
						props: {
							backgroundColor: {
								defaultValue: null,
								description: '',
								name: 'backgroundColor',
								required: !1,
								type: { name: 'string' },
							},
							minHeightOverride: {
								defaultValue: null,
								description: '',
								name: 'minHeightOverride',
								required: !1,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/Card.tsx#Card.Header'
						] = {
							docgenInfo: Card.Header.__docgenInfo,
							name: 'Card.Header',
							path: 'client/components/mma/shared/Card.tsx#Card.Header',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(Section.displayName = 'Card.Section'),
					(Section.__docgenInfo = {
						description: '',
						displayName: 'Card.Section',
						props: {
							backgroundColor: {
								defaultValue: null,
								description: '',
								name: 'backgroundColor',
								required: !1,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/Card.tsx#Card.Section'
						] = {
							docgenInfo: Card.Section.__docgenInfo,
							name: 'Card.Section',
							path: 'client/components/mma/shared/Card.tsx#Card.Section',
						});
			} catch (__react_docgen_typescript_loader_error) {}
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
	},
]);
