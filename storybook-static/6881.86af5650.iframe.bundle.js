'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[6881],
	{
		'./client/components/mma/accountoverview/EmptyAccountOverview.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				j: () => EmptyAccountOverview,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_6__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_7__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_8__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_9__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_10__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
					),
				react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./node_modules/react/index.js',
				),
				_shared_CallCenterEmailAndNumbers__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./client/components/shared/CallCenterEmailAndNumbers.tsx',
					),
				_shared_SupportTheGuardianButton__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./client/components/shared/SupportTheGuardianButton.tsx',
					),
				_identity_identity__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./client/components/mma/identity/identity.ts',
					),
				_shared_assets_InfoIconDark__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./client/components/mma/shared/assets/InfoIconDark.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			var _ref = {
					name: '1qhvxu9',
					styles: 'position:absolute;top:2px;left:0',
				},
				_ref2 = {
					name: 'kyk0ow',
					styles: 'margin:0;padding:0;display:inline-block;overflow-wrap:anywhere',
				},
				_ref3 = {
					name: '9dj39e',
					styles: 'font-weight:bold;margin:0;padding:0;display:inline-block;min-width:13ch',
				},
				EmptyAccountOverview = () => {
					var [userEmailAddress, setUserEmailAddress] = (0,
					react__WEBPACK_IMPORTED_MODULE_0__.useState)('-');
					_identity_identity__WEBPACK_IMPORTED_MODULE_3__.Q.getCurrentUser().then(
						(info) => setUserEmailAddress(info.primaryEmailAddress),
					);
					var [
						showTopCallCentreNumbers,
						setTopCallCentreNumbersVisibility,
					] = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1);
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.BX)(
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.HY,
						{
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.tZ)(
									'h2',
									{
										css: (0,
										_emotion_react__WEBPACK_IMPORTED_MODULE_6__.iv)(
											'margin-top:50px;border-top:1px solid ',
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_7__
												.palette.neutral[86],
											';',
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_8__.Hu7,
											';',
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_9__
												.C4.tablet,
											'{font-size:1.25rem;line-height:1.6;}',
											'',
										),
										children:
											'Welcome to your Guardian account',
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.tZ)(
									'p',
									{
										css: (0,
										_emotion_react__WEBPACK_IMPORTED_MODULE_6__.iv)(
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_8__.Kz0,
											';',
											'',
										),
										children:
											'When you subscribe or contribute, you’ll be able to see your support information here. There’s currently no active subscription, membership or recurring contribution linked to this email address.',
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.BX)(
									'dl',
									{
										css: (0,
										_emotion_react__WEBPACK_IMPORTED_MODULE_6__.iv)(
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_8__.Kz0,
											';background-color:',
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_7__
												.palette.neutral[97],
											';border:1px solid ',
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_7__
												.palette.neutral[86],
											';margin:30px 0 0 0;padding:',
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_10__
												.D[5],
											'px;',
											'',
										),
										children: [
											(0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.tZ)(
												'dt',
												{
													css: _ref3,
													children: 'Email address',
												},
											),
											(0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.tZ)(
												'dd',
												{
													css: _ref2,
													'data-qm-masking':
														'blocklist',
													children: userEmailAddress,
												},
											),
										],
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.tZ)(
									'p',
									{
										css: (0,
										_emotion_react__WEBPACK_IMPORTED_MODULE_6__.iv)(
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_8__.Kz0,
											';margin:',
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_10__
												.D[6],
											'px 0 30px 0;',
											'',
										),
										children:
											'Please consider supporting our journalism via a new subscription or contribution.',
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.tZ)(
									_shared_SupportTheGuardianButton__WEBPACK_IMPORTED_MODULE_2__.o,
									{
										supportReferer:
											'account_overview_no_product',
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.BX)(
									'div',
									{
										css: (0,
										_emotion_react__WEBPACK_IMPORTED_MODULE_6__.iv)(
											'margin:',
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_10__
												.D[6],
											'px 0 0 0;padding:0 0 0 ',
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_10__
												.D[6],
											'px;position:relative;',
											'',
										),
										children: [
											(0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.tZ)(
												'i',
												{
													css: _ref,
													children: (0,
													_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.tZ)(
														_shared_assets_InfoIconDark__WEBPACK_IMPORTED_MODULE_4__.J,
														{
															fillColor:
																_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_7__
																	.palette
																	.brand[500],
														},
													),
												},
											),
											(0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.BX)(
												'p',
												{
													css: (0,
													_emotion_react__WEBPACK_IMPORTED_MODULE_6__.iv)(
														'margin:0;padding:0;',
														_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_8__.Kz0,
														';',
														'',
													),
													children: [
														'If you are already supporting the Guardian, it may be linked to a different email address. Please check that you are logged in using the correct account or contact our customer service team for help.',
														' ',
														(0,
														_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.tZ)(
															'span',
															{
																css: (0,
																_emotion_react__WEBPACK_IMPORTED_MODULE_6__.iv)(
																	'cursor:pointer;color:',
																	_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_7__
																		.palette
																		.brand[500],
																	';text-decoration:underline;',
																	'',
																),
																onClick: () =>
																	setTopCallCentreNumbersVisibility(
																		!showTopCallCentreNumbers,
																	),
																children:
																	'Contact us',
															},
														),
														'.',
													],
												},
											),
											showTopCallCentreNumbers &&
												(0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.tZ)(
													'div',
													{
														css: (0,
														_emotion_react__WEBPACK_IMPORTED_MODULE_6__.iv)(
															'margin-top:',
															_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_10__
																.D[5],
															'px;',
															'',
														),
														children: (0,
														_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.tZ)(
															_shared_CallCenterEmailAndNumbers__WEBPACK_IMPORTED_MODULE_1__.K,
															{},
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
		},
		'./client/fixtures/inAppPurchase.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				$E: () => InAppPurchaseIos,
				Dk: () => PuzzleAppPurchaseIos,
				IH: () => InAppPurchase,
				Id: () => CancelledInAppPurchase,
				SD: () => InAppPurchaseAndroid,
				go: () => PuzzleAppPurchaseAndroid,
			});
			var InAppPurchase = {
					subscriptionId: '1',
					valid: !0,
					from: '2023-01-11T11:05:20.000Z',
					productId: '',
				},
				CancelledInAppPurchase = {
					cancellationTimestamp: '2023-01-11T11:05:20.000Z',
					subscriptionId: '2',
					valid: !0,
					from: '2023-01-11T11:05:20.000Z',
					productId: '',
				},
				InAppPurchaseIos = {
					subscriptionId: '3',
					valid: !0,
					from: '2023-01-11T11:05:20.000Z',
					productId: 'uk.co.guardian.gia.1month',
				},
				InAppPurchaseAndroid = {
					subscriptionId: '4',
					valid: !0,
					from: '2023-01-11T11:05:20.000Z',
					productId: 'com.guardian.subscription.annual.metered',
				},
				PuzzleAppPurchaseAndroid = {
					subscriptionId: '5',
					valid: !0,
					from: '2023-01-11T11:05:20.000Z',
					productId: 'uk.co.guardian.puzzles.annual_sub',
				},
				PuzzleAppPurchaseIos = {
					subscriptionId: '6',
					valid: !0,
					from: '2023-01-11T11:05:20.000Z',
					productId: 'uk.co.guardian.puzzles.monthlySub',
				};
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
		'./shared/mpapiResponse.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				IM: () => determineAppStore,
				Uh: () => isPuzzle,
				Wh: () => AppSubscriptionSoftOptInIds,
				dk: () => AppStore,
				hb: () => isValidAppSubscription,
				mM: () => SingleContributionSoftOptInIds,
			});
			var _softOptInIDs__WEBPACK_IMPORTED_MODULE_0__ =
				__webpack_require__('./shared/softOptInIDs.ts');
			function isValidAppSubscription(subscription) {
				return subscription.valid;
			}
			var AppSubscriptionSoftOptInIds = [
					_softOptInIDs__WEBPACK_IMPORTED_MODULE_0__.Y
						.SupportOnboarding,
					_softOptInIDs__WEBPACK_IMPORTED_MODULE_0__.Y
						.SupporterNewsletter,
				],
				SingleContributionSoftOptInIds = [
					_softOptInIDs__WEBPACK_IMPORTED_MODULE_0__.Y
						.SupportOnboarding,
					_softOptInIDs__WEBPACK_IMPORTED_MODULE_0__.Y
						.SupporterNewsletter,
				],
				AppStore = (function (AppStore) {
					return (
						(AppStore[(AppStore.IOS = 0)] = 'IOS'),
						(AppStore[(AppStore.ANDROID = 1)] = 'ANDROID'),
						(AppStore[(AppStore.UNKNOWN = 2)] = 'UNKNOWN'),
						AppStore
					);
				})({});
			function determineAppStore(subscription) {
				return subscription.productId.includes(
					'guardian.subscription',
				) ||
					subscription.productId.includes('puzzles.annual_sub') ||
					subscription.productId.includes('puzzles.monthly_sub')
					? AppStore.ANDROID
					: subscription.productId.includes('guardian.gia') ||
					  subscription.productId.includes('guardian.gla') ||
					  subscription.productId.includes('puzzles.annualSub') ||
					  subscription.productId.includes('puzzles.monthlySub')
					? AppStore.IOS
					: AppStore.UNKNOWN;
			}
			function isPuzzle(subscription) {
				return subscription.productId.includes('puzzles');
			}
		},
	},
]);
