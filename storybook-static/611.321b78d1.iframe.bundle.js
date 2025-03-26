'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[611],
	{
		'./client/components/mma/identity/MarketingToggle.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				T: () => MarketingToggle,
			});
			var _guardian_source_development_kitchen_react_components__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@guardian/source-development-kitchen/dist/react-components/toggle-switch/ToggleSwitch.js',
					),
				_sharedStyles__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./client/components/mma/identity/sharedStyles.ts',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			var getDescription = (description) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
						'p',
						{
							css: [
								_sharedStyles__WEBPACK_IMPORTED_MODULE_0__.j$,
								_sharedStyles__WEBPACK_IMPORTED_MODULE_0__.WM,
								'',
								'',
							],
							children: description,
						},
					),
				_ref = {
					name: 'c7ns0x',
					styles: 'display:flex;button{align-self:flex-start;}',
				},
				_ref2 = {
					name: 'or31ah',
					styles: 'margin-top:12px;position:relative',
				},
				_ref3 = { name: '1ode3cm', styles: 'left:0' },
				MarketingToggle = (props) => {
					var _props$divCss,
						{ id, description, selected, title, onClick } = props;
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
						'div',
						{
							'data-cy': id,
							css: [
								_sharedStyles__WEBPACK_IMPORTED_MODULE_0__.j$,
								null !== (_props$divCss = props.divCss) &&
								void 0 !== _props$divCss
									? _props$divCss
									: _ref2,
								'',
								'',
							],
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
									'div',
									{
										css: _ref3,
										children: (0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
											_guardian_source_development_kitchen_react_components__WEBPACK_IMPORTED_MODULE_2__.Z,
											{
												cssOverrides: _ref,
												label: title,
												labelPosition: 'left',
												fontWeight: 'bold',
												id,
												checked: !!selected,
												onClick: () => {
													onClick(id);
												},
											},
										),
									},
								),
								description && getDescription(description),
							],
						},
						id,
					);
				};
			try {
				(MarketingToggle.displayName = 'MarketingToggle'),
					(MarketingToggle.__docgenInfo = {
						description: '',
						displayName: 'MarketingToggle',
						props: {
							id: {
								defaultValue: null,
								description: '',
								name: 'id',
								required: !0,
								type: { name: 'string' },
							},
							description: {
								defaultValue: null,
								description: '',
								name: 'description',
								required: !1,
								type: { name: 'string' },
							},
							title: {
								defaultValue: null,
								description: '',
								name: 'title',
								required: !1,
								type: { name: 'string' },
							},
							selected: {
								defaultValue: null,
								description: '',
								name: 'selected',
								required: !1,
								type: { name: 'boolean' },
							},
							divCss: {
								defaultValue: null,
								description: '',
								name: 'divCss',
								required: !1,
								type: { name: 'SerializedStyles' },
							},
							onClick: {
								defaultValue: null,
								description: '',
								name: 'onClick',
								required: !0,
								type: { name: '(id: string) => unknown' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/identity/MarketingToggle.tsx#MarketingToggle'
						] = {
							docgenInfo: MarketingToggle.__docgenInfo,
							name: 'MarketingToggle',
							path: 'client/components/mma/identity/MarketingToggle.tsx#MarketingToggle',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/identity/emailAndMarketing/OptOutSection.tsx':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					XJ: () => optOutFinder,
					ru: () => consentSubscribedValueInverter,
					xu: () => OptOutSection,
				});
				var _shared_WithStandardTopMargin__WEBPACK_IMPORTED_MODULE_0__ =
						__webpack_require__(
							'./client/components/shared/WithStandardTopMargin.tsx',
						),
					_Lines__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
						'./client/components/mma/identity/Lines.tsx',
					),
					_MarketingToggle__WEBPACK_IMPORTED_MODULE_1__ =
						__webpack_require__(
							'./client/components/mma/identity/MarketingToggle.tsx',
						),
					_PageSection__WEBPACK_IMPORTED_MODULE_2__ =
						__webpack_require__(
							'./client/components/mma/identity/PageSection.tsx',
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
				var consentSubscribedValueInverter = (consent) =>
						_objectSpread(
							_objectSpread({}, consent),
							{},
							{ subscribed: !consent.subscribed },
						),
					optOutFinder =
						(
							consents,
							clickHandler,
							customCSS,
							invertSubscribedValue,
						) =>
						(id) => {
							var consent = consents.find((c) => c.id === id);
							return (
								consent &&
									invertSubscribedValue &&
									(consent = invertSubscribedValue(consent)),
								consent &&
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
										_MarketingToggle__WEBPACK_IMPORTED_MODULE_1__.T,
										{
											id: consent.id,
											title: consent.name,
											description: consent.description,
											selected: consent.subscribed,
											onClick: clickHandler,
											divCss: customCSS,
										},
									)
							);
						},
					OptOutSection = (props) => {
						var { consents, clickHandler } = props,
							addInvertedMarketingToggle = optOutFinder(
								consents,
								clickHandler,
								void 0,
								consentSubscribedValueInverter,
							);
						return (0,
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.BX)(
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.HY,
							{
								children: [
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.BX)(
										_PageSection__WEBPACK_IMPORTED_MODULE_2__.N,
										{
											title: 'Other ways we may contact you about our products and services',
											description:
												'\n        From time to time, we’d love to be able to update you about our products\n        and services via telephone and post.\n      ',
											children: [
												addInvertedMarketingToggle(
													'post_optout',
												),
												addInvertedMarketingToggle(
													'phone_optout',
												),
												addInvertedMarketingToggle(
													'market_research_optout',
												),
											],
										},
									),
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
										_shared_WithStandardTopMargin__WEBPACK_IMPORTED_MODULE_0__.z,
										{
											children: (0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
												_Lines__WEBPACK_IMPORTED_MODULE_4__.x,
												{ n: 1 },
											),
										},
									),
								],
							},
						);
					};
				try {
					(consentSubscribedValueInverter.displayName =
						'consentSubscribedValueInverter'),
						(consentSubscribedValueInverter.__docgenInfo = {
							description:
								'NOTE:\nOnly use this method for an OPT OUT consent, eg. "post_optout"\nThe description of Opt Out consents have changed so for UX/UI purposes they are now opt INs\nThe backend model remains an opt OUT, so we invert the consented/subscribed value here.',
							displayName: 'consentSubscribedValueInverter',
							props: {
								id: {
									defaultValue: null,
									description: '',
									name: 'id',
									required: !0,
									type: { name: 'string' },
								},
								description: {
									defaultValue: null,
									description: '',
									name: 'description',
									required: !1,
									type: { name: 'string' },
								},
								frequency: {
									defaultValue: null,
									description: '',
									name: 'frequency',
									required: !1,
									type: { name: 'string' },
								},
								name: {
									defaultValue: null,
									description: '',
									name: 'name',
									required: !0,
									type: { name: 'string' },
								},
								theme: {
									defaultValue: null,
									description: '',
									name: 'theme',
									required: !1,
									type: { name: 'string' },
								},
								group: {
									defaultValue: null,
									description: '',
									name: 'group',
									required: !1,
									type: { name: 'string' },
								},
								type: {
									defaultValue: null,
									description: '',
									name: 'type',
									required: !0,
									type: {
										name: 'enum',
										value: [
											{ value: '"EMAIL"' },
											{ value: '"NEWSLETTER"' },
											{ value: '"OPT_OUT"' },
											{ value: '"SUPPORT_REMINDER"' },
										],
									},
								},
								subscribed: {
									defaultValue: null,
									description: '',
									name: 'subscribed',
									required: !0,
									type: { name: 'boolean' },
								},
								identityName: {
									defaultValue: null,
									description: '',
									name: 'identityName',
									required: !1,
									type: { name: 'string' },
								},
								isProduct: {
									defaultValue: null,
									description: '',
									name: 'isProduct',
									required: !1,
									type: { name: 'boolean' },
								},
								isChannel: {
									defaultValue: null,
									description: '',
									name: 'isChannel',
									required: !1,
									type: { name: 'boolean' },
								},
							},
						}),
						'undefined' != typeof STORYBOOK_REACT_CLASSES &&
							(STORYBOOK_REACT_CLASSES[
								'client/components/mma/identity/emailAndMarketing/OptOutSection.tsx#consentSubscribedValueInverter'
							] = {
								docgenInfo:
									consentSubscribedValueInverter.__docgenInfo,
								name: 'consentSubscribedValueInverter',
								path: 'client/components/mma/identity/emailAndMarketing/OptOutSection.tsx#consentSubscribedValueInverter',
							});
				} catch (__react_docgen_typescript_loader_error) {}
				try {
					(OptOutSection.displayName = 'OptOutSection'),
						(OptOutSection.__docgenInfo = {
							description: '',
							displayName: 'OptOutSection',
							props: {
								consents: {
									defaultValue: null,
									description: '',
									name: 'consents',
									required: !0,
									type: { name: 'ConsentOption[]' },
								},
								clickHandler: {
									defaultValue: null,
									description: '',
									name: 'clickHandler',
									required: !0,
									type: { name: 'ClickHandler' },
								},
							},
						}),
						'undefined' != typeof STORYBOOK_REACT_CLASSES &&
							(STORYBOOK_REACT_CLASSES[
								'client/components/mma/identity/emailAndMarketing/OptOutSection.tsx#OptOutSection'
							] = {
								docgenInfo: OptOutSection.__docgenInfo,
								name: 'OptOutSection',
								path: 'client/components/mma/identity/emailAndMarketing/OptOutSection.tsx#OptOutSection',
							});
				} catch (__react_docgen_typescript_loader_error) {}
			},
		'./client/components/mma/identity/useConsentOptions.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				Actions: () => Actions,
				M: () => useConsentOptions,
			});
			var _sentry_browser__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@sentry/minimal/esm/index.js',
					),
				react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./node_modules/react/index.js',
				),
				_utilities_analytics__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__('./client/utilities/analytics.ts'),
				_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
					'./client/components/mma/identity/models.ts',
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
			var ActionType = (function (ActionType) {
					return (
						(ActionType.ERROR = 'ERROR'),
						(ActionType.OPTIONS = 'OPTIONS'),
						(ActionType.SUBSCRIBE = 'SUBSCRIBE'),
						(ActionType.UNSUBSCRIBE = 'UNSUBSCRIBE'),
						(ActionType.UNSUBSCRIBE_ALL = 'UNSUBSCRIBE_ALL'),
						ActionType
					);
				})(ActionType || {}),
				initialState = { error: !1, options: [] },
				reducer = (state, action) => {
					var {
							ERROR,
							OPTIONS,
							SUBSCRIBE,
							UNSUBSCRIBE,
							UNSUBSCRIBE_ALL,
						} = ActionType,
						{ payload } = action;
					switch (action.type) {
						case ERROR:
							return (
								_sentry_browser__WEBPACK_IMPORTED_MODULE_2__.Tb(
									payload,
								),
								(0,
								_utilities_analytics__WEBPACK_IMPORTED_MODULE_3__.L9)(
									{
										eventCategory: 'emailPrefError',
										eventAction: 'error',
										eventLabel: payload.toString(),
									},
								),
								_objectSpread(
									_objectSpread({}, state),
									{},
									{ error: !0 },
								)
							);
						case OPTIONS:
							return _objectSpread(
								_objectSpread({}, state),
								{},
								{ options: payload },
							);
						case UNSUBSCRIBE_ALL:
							var options = state.options.map((option) =>
								_objectSpread(
									_objectSpread({}, option),
									{},
									{
										subscribed:
											option.type ===
											_models__WEBPACK_IMPORTED_MODULE_1__
												.uF.OPT_OUT,
									},
								),
							);
							return _objectSpread(
								_objectSpread({}, state),
								{},
								{ options },
							);
						case SUBSCRIBE:
							var _options = state.options.map((option) =>
								_objectSpread(
									_objectSpread({}, option),
									{},
									{
										subscribed:
											!!option.subscribed ||
											payload === option.id,
									},
								),
							);
							return _objectSpread(
								_objectSpread({}, state),
								{},
								{ options: _options },
							);
						case UNSUBSCRIBE:
							var _options2 = state.options.map((option) =>
								_objectSpread(
									_objectSpread({}, option),
									{},
									{
										subscribed:
											payload !== option.id &&
											option.subscribed,
									},
								),
							);
							return _objectSpread(
								_objectSpread({}, state),
								{},
								{ options: _options2 },
							);
					}
				},
				Actions = {
					error: (payload) => ({ type: ActionType.ERROR, payload }),
					options: (payload) => ({
						type: ActionType.OPTIONS,
						payload,
					}),
					subscribe: (payload) => ({
						type: ActionType.SUBSCRIBE,
						payload,
					}),
					unsubscribe: (payload) => ({
						type: ActionType.UNSUBSCRIBE,
						payload,
					}),
					unsubscribeAll: () => ({
						type: ActionType.UNSUBSCRIBE_ALL,
					}),
				},
				useConsentOptions = () =>
					(0, react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(
						reducer,
						initialState,
					);
		},
		'./client/fixtures/consents.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { X: () => consents });
			var consents = [
				{
					id: 'your_support_onboarding',
					isOptOut: !1,
					isChannel: !1,
					isProduct: !0,
					name: 'Your subscription/support',
					description:
						'Helpful information on how to access and make the most of your subscription.',
				},
				{
					id: 'sms',
					isOptOut: !1,
					isChannel: !0,
					isProduct: !1,
					name: 'SMS',
					description:
						"I would like to receive updates about the Guardian products and services I've selected above by SMS (text messages).",
				},
				{
					id: 'digital_subscriber_preview',
					isOptOut: !1,
					isChannel: !1,
					isProduct: !0,
					name: 'Digital subscriber preview',
					description:
						'Our highlights from this coming weekend to enjoy digitally across our apps and website, exclusively for subscribers.',
				},
				{
					id: 'offers',
					isOptOut: !1,
					isChannel: !1,
					isProduct: !1,
					name: 'Trusted Partners',
					description:
						"Offers and competitions from the Guardian's carefully selected and trusted partners that we think you might like, such as Glastonbury competitions and charity appeals.",
				},
				{
					id: 'supporter_newsletter',
					isOptOut: !1,
					isChannel: !1,
					isProduct: !0,
					name: 'Supporter newsletter',
					description:
						'Our regular newsletter written by the membership editor, exclusively for subscribers and supporters.',
				},
				{
					id: 'events',
					isOptOut: !1,
					isChannel: !1,
					isProduct: !1,
					name: 'Events & Masterclasses',
					description:
						'Receive weekly newsletters about our upcoming Live events and Masterclasses. Interact with leading minds and nourish your curiosity in our immersive online events, available worldwide.',
				},
				{
					id: 'similar_guardian_products',
					isOptOut: !1,
					isChannel: !1,
					isProduct: !1,
					name: 'Similar Guardian products',
					description:
						'Information on our products and ways to support and enjoy our independent journalism.',
				},
				{
					id: 'market_research_optout',
					isOptOut: !0,
					isChannel: !1,
					isProduct: !1,
					name: 'Allow the Guardian to contact me for market research purposes',
					description:
						'From time to time we may contact you for market research purposes inviting you to complete a survey, or take part in a group discussion. Normally, this invitation would be sent via email, but we may also contact you by phone.',
				},
				{
					id: 'post_optout',
					isOptOut: !0,
					isChannel: !1,
					isProduct: !1,
					name: 'Allow the Guardian to send communications by post',
				},
				{
					id: 'profiling_optout',
					isOptOut: !0,
					isChannel: !1,
					isProduct: !1,
					name: 'Allow the Guardian to analyse this data to improve marketing content',
				},
				{
					id: 'phone_optout',
					isOptOut: !0,
					isChannel: !0,
					isProduct: !1,
					name: 'Allow the Guardian to send communications by telephone',
				},
				{
					id: 'personalised_advertising',
					isOptOut: !1,
					isChannel: !1,
					isProduct: !1,
					name: 'Allow personalised advertising using this data - this supports the Guardian',
				},
				{
					id: 'supporter',
					isOptOut: !1,
					isChannel: !1,
					isProduct: !1,
					name: 'Supporting the Guardian',
					description:
						'Stay up-to-date with the latest offers and the aims of the organisation, as well as ways you can enjoy and support our independent journalism.',
				},
				{
					id: 'jobs',
					isOptOut: !1,
					isChannel: !1,
					isProduct: !1,
					name: 'Jobs',
					description:
						'Receive weekly newsletters with our latest jobs listings, as well as tips and advice from Guardian Jobs on taking your next career step.',
				},
				{
					id: 'guardian_weekly_newsletter',
					isOptOut: !1,
					isChannel: !1,
					isProduct: !0,
					name: 'Guardian Weekly newsletter',
					description:
						"Our weekly newsletter written by the editor including what's coming up in this week's Guardian Weekly, exclusively for subscribers.",
				},
				{
					id: 'subscriber_preview',
					isOptOut: !1,
					isChannel: !1,
					isProduct: !0,
					name: 'Subscriber preview',
					description:
						'Our highlights from this coming weekend to enjoy in your newspaper, exclusively for subscribers.',
				},
			];
		},
	},
]);
