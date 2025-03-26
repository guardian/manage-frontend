'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[134],
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
		'./client/components/mma/identity/Lines.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { x: () => Lines });
			var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				Lines = (props) => {
					var { n, margin } = props,
						height = 4 * n;
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.HY,
						{
							children: (0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
								'hr',
								{
									css: (0,
									_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(
										{
											backgroundImage:
												'repeating-linear-gradient(to bottom, #dcdcdc, #dcdcdc '
													.concat(
														1,
														'px, transparent ',
													)
													.concat(
														1,
														'px, transparent ',
													)
													.concat(4, 'px)'),
											backgroundRepeat: 'repeat',
											backgroundPosition: 'top',
											height: ''.concat(height, 'px'),
											border: 0,
											margin: margin || '12px auto 6px',
										},
										'',
										'',
									),
								},
							),
						},
					);
				};
			try {
				(Lines.displayName = 'Lines'),
					(Lines.__docgenInfo = {
						description: '',
						displayName: 'Lines',
						props: {
							n: {
								defaultValue: null,
								description: '',
								name: 'n',
								required: !0,
								type: { name: 'number' },
							},
							margin: {
								defaultValue: null,
								description: '',
								name: 'margin',
								required: !1,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/identity/Lines.tsx#Lines'
						] = {
							docgenInfo: Lines.__docgenInfo,
							name: 'Lines',
							path: 'client/components/mma/identity/Lines.tsx#Lines',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/identity/PageSection.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				N: () => PageSection,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_5__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			var _ref = {
					name: '1i0hnkp',
					styles: 'font-size:17px;line-height:24px;font-weight:bold;margin:0 0 6px 0',
				},
				getTitle = (title) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
						'h2',
						{ css: _ref, children: title },
					),
				getDescription = (description) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
						'div',
						{
							css: (0,
							_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(
								_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.AjP,
								';margin-bottom:',
								_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
									.D[2],
								'px;',
								'',
							),
							children: description,
						},
					),
				getSubtext = (subtext) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
						'p',
						{
							css: (0,
							_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(
								_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.AjP,
								';line-height:18px;color:',
								_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
									.palette.neutral[46],
								';margin-bottom:',
								_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
									.D[3],
								'px;margin-top:0;',
								'',
							),
							children: subtext,
						},
					),
				PageSection = (props) => {
					var { children, description, title, subtext } = props;
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.BX)(
						'div',
						{
							css: (0,
							_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(
								_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_5__
									.Dp.desktop,
								'{display:flex;}',
								'',
							),
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.BX)(
									'div',
									{
										css: (0,
										_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_5__
												.Dp.desktop,
											'{padding-right:100px;box-sizing:content-box;flex-basis:220px;min-width:220px;}',
											'',
										),
										children: [
											title && getTitle(title),
											description &&
												getDescription(description),
											subtext && getSubtext(subtext),
										],
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
									'div',
									{
										css: (0,
										_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_5__
												.Dp.desktop,
											'{max-width:460px;flex-grow:1;}',
											'',
										),
										children,
									},
								),
							],
						},
					);
				};
			try {
				(PageSection.displayName = 'PageSection'),
					(PageSection.__docgenInfo = {
						description: '',
						displayName: 'PageSection',
						props: {
							title: {
								defaultValue: null,
								description: '',
								name: 'title',
								required: !1,
								type: { name: 'string' },
							},
							description: {
								defaultValue: null,
								description: '',
								name: 'description',
								required: !1,
								type: { name: 'ReactNode' },
							},
							subtext: {
								defaultValue: null,
								description: '',
								name: 'subtext',
								required: !1,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/identity/PageSection.tsx#PageSection'
						] = {
							docgenInfo: PageSection.__docgenInfo,
							name: 'PageSection',
							path: 'client/components/mma/identity/PageSection.tsx#PageSection',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/fixtures/user.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { E: () => user });
			var user = {
				status: 'ok',
				user: {
					primaryEmailAddress: 'test.user@example.com',
					id: '106690155',
					publicFields: { displayName: 'user' },
					privateFields: {
						puzzleUuid:
							'c59a25ab22941af1a9062b75c3b153115a6a08a410e5721adcf514ed90c23b68',
						googleTagId:
							'805ddf6e391ba0bd592ec1648f25946ca2f6e2e8629a38a6b226f787301b6881',
						firstName: 'Test',
						secondName: 'User',
						registrationLocation: 'Other',
						legacyPackages: 'CRE,RCO',
						legacyProducts: 'CRE,RCO',
					},
					statusFields: { userEmailValidated: !0 },
					dates: { accountCreatedDate: '2021-11-23T22:43:25Z' },
					userGroups: [
						{
							path: '/sys/policies/basic-identity',
							packageCode: 'CRE',
						},
						{
							path: '/sys/policies/basic-community',
							packageCode: 'RCO',
						},
					],
					adData: {},
					consents: [
						{
							actor: 'user',
							id: 'your_support_onboarding',
							version: 0,
							consented: !1,
							timestamp: '2021-11-23T22:43:25Z',
							privacyPolicyVersion: 1,
						},
						{
							actor: 'user',
							id: 'sms',
							version: 0,
							consented: !1,
							timestamp: '2021-11-23T22:43:25Z',
							privacyPolicyVersion: 1,
						},
						{
							actor: 'user',
							id: 'digital_subscriber_preview',
							version: 0,
							consented: !1,
							timestamp: '2021-11-23T22:43:25Z',
							privacyPolicyVersion: 1,
						},
						{
							actor: 'user',
							id: 'offers',
							version: 0,
							consented: !1,
							timestamp: '2021-11-23T22:43:25Z',
							privacyPolicyVersion: 1,
						},
						{
							actor: 'user',
							id: 'supporter_newsletter',
							version: 0,
							consented: !1,
							timestamp: '2021-11-23T22:43:25Z',
							privacyPolicyVersion: 1,
						},
						{
							actor: 'user',
							id: 'events',
							version: 0,
							consented: !1,
							timestamp: '2021-11-23T22:43:25Z',
							privacyPolicyVersion: 1,
						},
						{
							actor: 'user',
							id: 'similar_guardian_products',
							version: 0,
							consented: !1,
							timestamp: '2021-11-23T22:43:25Z',
							privacyPolicyVersion: 1,
						},
						{
							actor: 'user',
							id: 'holidays',
							version: 0,
							consented: !1,
							timestamp: '2021-11-23T22:43:25Z',
							privacyPolicyVersion: 1,
						},
						{
							actor: 'user',
							id: 'post_optout',
							version: 0,
							consented: !1,
							timestamp: '2021-11-23T22:43:25Z',
							privacyPolicyVersion: 1,
						},
						{
							actor: 'user',
							id: 'phone_optout',
							version: 0,
							consented: !1,
							timestamp: '2021-11-23T22:43:25Z',
							privacyPolicyVersion: 1,
						},
						{
							actor: 'user',
							id: 'jobs',
							version: 0,
							consented: !1,
							timestamp: '2021-11-23T22:43:25Z',
							privacyPolicyVersion: 1,
						},
						{
							actor: 'user',
							id: 'guardian_weekly_newsletter',
							version: 0,
							consented: !1,
							timestamp: '2021-11-23T22:43:25Z',
							privacyPolicyVersion: 1,
						},
						{
							actor: 'user',
							id: 'subscriber_preview',
							version: 0,
							consented: !1,
							timestamp: '2021-11-23T22:43:25Z',
							privacyPolicyVersion: 1,
						},
						{
							actor: 'user',
							id: 'market_research_optout',
							version: 0,
							consented: !0,
							timestamp: '2021-11-23T22:47:12Z',
							privacyPolicyVersion: 1,
						},
						{
							actor: 'user',
							id: 'supporter',
							version: 0,
							consented: !1,
							timestamp: '2021-11-23T22:47:12Z',
							privacyPolicyVersion: 1,
						},
						{
							actor: 'user',
							id: 'profiling_optout',
							version: 0,
							consented: !1,
							timestamp: '2021-11-23T22:47:21Z',
							privacyPolicyVersion: 1,
						},
					],
					hasPassword: !0,
				},
			};
		},
	},
]);
