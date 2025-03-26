'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[1118],
	{
		'./client/components/helpCentre/HelpCentreContactOptions.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				y: () => HelpCentreContactOptions,
			});
			var emotion_react_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
				),
				palette = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
				),
				typography = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
				),
				space = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
				),
				mq = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
				),
				Button = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/button/Button.js',
				),
				react = __webpack_require__('./node_modules/react/index.js'),
				CallCenterEmailAndNumbers = __webpack_require__(
					'./client/components/shared/CallCenterEmailAndNumbers.tsx',
				),
				ErrorIcon = __webpack_require__(
					'./client/components/mma/shared/assets/ErrorIcon.tsx',
				),
				HelpSectionIcons = __webpack_require__(
					'./client/components/mma/shared/assets/HelpSectionIcons.tsx',
				),
				SvgArrowRightStraight = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgArrowRightStraight.js',
				),
				config = __webpack_require__('./server/config.ts'),
				analytics = __webpack_require__(
					'./client/utilities/analytics.ts',
				),
				LoadingCircleIcon = __webpack_require__(
					'./client/components/mma/shared/assets/LoadingCircleIcon.tsx',
				),
				emotion_react_jsx_runtime_browser_esm =
					(mq.C4.desktop,
					palette.palette.brand[500],
					palette.palette.neutral[100],
					palette.palette.brand[500],
					space.D[6],
					palette.palette.brand[500],
					palette.palette.brand[400],
					palette.palette.neutral[100],
					palette.palette.brand[500],
					palette.palette.neutral[100],
					palette.palette.neutral[100],
					palette.palette.brand[400],
					palette.palette.brand[500],
					palette.palette.brand[400],
					typography.AjP,
					palette.palette.neutral[46],
					palette.palette.brand[500],
					space.D[2],
					palette.palette.neutral[46],
					space.D[3],
					palette.palette.brand[500],
					palette.palette.brand[500],
					palette.palette.neutral[46],
					palette.palette.neutral[100],
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					));
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
			var areAgentsAvailable = !1,
				initESW = (
					gslbBaseUrl,
					liveChatAPI,
					targetElement,
					identityID,
					loginEmail,
				) =>
					new Promise((resolve, reject) => {
						var liveChatConfig = {
								displayHelpButton: !1,
								language: '',
								defaultMinimizedText: 'Live chat',
								disabledMinimizedText: 'Live chat',
								prepopulatedPrechatFields: {
									SuppliedEmail: loginEmail,
								},
								enabledFeatures: ['LiveAgent'],
								entryFeature: 'LiveAgent',
								avatarImgURL:
									'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzEiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMSAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNS41MDAxIDAuNTYzNDc3QzYuOTM5NzIgMC41NjM0NzcgMCA3LjUwMjkzIDAgMTYuMDYzNUMwIDI0LjYyMzkgNi45Mzk3MiAzMS41NjM1IDE1LjUwMDEgMzEuNTYzNUMyNC4wNjA1IDMxLjU2MzUgMzEgMjQuNjIzOSAzMSAxNi4wNjM1QzMxIDcuNTAyOTMgMjQuMDYwNSAwLjU2MzQ3NyAxNS41MDAxIDAuNTYzNDc3WiIgZmlsbD0iIzA1Mjk2MiIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTI0Ljg3MzcgMTYuOTExMUwyMy4yODI3IDE3LjYyMjRWMjQuOTU4N0MyMi4zODc3IDI1LjgxMTIgMjAuMTAwNiAyNy4xMzk4IDE3LjkxMyAyNy41OTY1VjI3LjA2MzVWMjYuMDYzM1YxNy40NjI0TDE2LjIyMjUgMTYuODY1MlYxNi40MjIxSDI0Ljg3MzdWMTYuOTExMVpNMTYuOTQyNSA0LjY5MTlDMTYuOTQyNSA0LjY5MTkgMTYuOTA5OCA0LjY5MTYgMTYuODkzNiA0LjY5MTZDMTMuMzA3MSA0LjY5MTYgMTEuMjU1MyA5LjUyNzQ5IDExLjM1ODcgMTYuMDUwNkMxMS4yNTUzIDIyLjU5NzMgMTMuMzA3MSAyNy40MzMxIDE2Ljg5MzYgMjcuNDMzMUMxNi45MDk4IDI3LjQzMzEgMTYuOTQyNSAyNy40MzI5IDE2Ljk0MjUgMjcuNDMyOVYyNy45MzU1QzExLjU2NTUgMjguMjk1IDQuMjIzODUgMjQuMjg5MiA0LjMyNzI1IDE2LjA3NDFDNC4yMjM4NSA3LjgzNTQ5IDExLjU2NTUgMy44Mjk2OSAxNi45NDI1IDQuMTg5MjFWNC42OTE5Wk0xOC4wMjMyIDQuMTY2OTlDMjAuMTI1OSA0LjQ4ODEzIDIyLjUyOSA1Ljg2OTEyIDIzLjQzMDIgNi44NDk1M1YxMS4zNzYzSDIyLjkxMjRMMTguMDIzMiA0LjY2NjU1VjQuMTY2OTlaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K',
								targetElement,
								extraPrechatFormDetails: [
									{
										label: 'Origin Channel',
										value: 'Live Chat',
									},
									{ label: 'Identity ID', value: identityID },
									{
										label: 'Contact Identity Id',
										value: identityID,
										transcriptFields: [
											'Contact_Identity_Id__c',
										],
									},
									{
										label: 'First Name',
										transcriptFields: [
											'Contact_First_Name__c',
										],
									},
									{
										label: 'Last Name',
										transcriptFields: [
											'Contact_Last_Name__c',
										],
									},
									{
										label: 'Web Email',
										transcriptFields: ['Contact_Email__c'],
									},
								],
								extraPrechatInfo: [
									{
										entityFieldMaps: [
											{
												doCreate: !1,
												doFind: !1,
												fieldName: 'LastName',
												isExactMatch: !0,
												label: 'Last Name',
											},
											{
												doCreate: !1,
												doFind: !1,
												fieldName: 'FirstName',
												isExactMatch: !0,
												label: 'First Name',
											},
											{
												doCreate: !1,
												doFind: !0,
												fieldName: 'IdentityID__c',
												isExactMatch: !0,
												label: 'Identity ID',
											},
										],
										entityName: 'Contact',
									},
									{
										entityFieldMaps: [
											{
												doCreate: !0,
												doFind: !1,
												fieldName: 'Origin_Channel__c',
												isExactMatch: !0,
												label: 'Origin Channel',
											},
										],
										entityName: 'Case',
									},
								],
							},
							timeoutTimer = setTimeout(() => {
								reject(new Error('Promise timed out.'));
							}, 15e3);
						liveChatAPI.addEventHandler(
							'onSettingsCallCompleted',
							(data) => {
								var domain =
									'undefined' != typeof window &&
									window.guardian
										? window.guardian.domain
										: config.a.DOMAIN;
								(areAgentsAvailable = data.isAgentAvailable),
									postMessage(
										'postAgentsAvailable:'.concat(
											data.isAgentAvailable,
										),
										'https://manage.'.concat(domain),
									);
								window.addEventListener(
									'message',
									(event) => {
										('https://manage.theguardian.com' !==
											event.origin &&
											'https://manage.code.dev-theguardian.com' !==
												event.origin &&
											'https://manage.thegulocal.com' !==
												event.origin) ||
											('requestAgentsAvailable' ===
												event.data &&
												postMessage(
													'postAgentsAvailable:'.concat(
														areAgentsAvailable,
													),
													'https://manage.'.concat(
														domain,
													),
												));
									},
									!1,
								),
									clearTimeout(timeoutTimer),
									resolve(!0);
							},
						),
							liveChatAPI.isIframeReady &&
								(clearTimeout(timeoutTimer), resolve(!0)),
							liveChatAPI.addEventHandler(
								'onAvailability',
								(data) => {
									areAgentsAvailable = data.isAgentAvailable;
								},
							),
							(liveChatAPI.settings = _objectSpread(
								_objectSpread({}, liveChatAPI.settings),
								liveChatConfig,
							)),
							'theguardian.com' === window.guardian.domain
								? liveChatAPI.init(
										'https://gnmtouchpoint.my.salesforce.com',
										'https://gnmtouchpoint.my.salesforce-sites.com/liveagent',
										gslbBaseUrl,
										'00D20000000nq5g',
										'Chat_Team',
										{
											baseLiveAgentContentURL:
												'https://c.la2-c2-cdg.salesforceliveagent.com/content',
											deploymentId: '5725I0000004RYv',
											buttonId: '5735I0000004Rj7',
											baseLiveAgentURL:
												'https://d.la2-c2-cdg.salesforceliveagent.com/chat',
											eswLiveAgentDevName:
												'EmbeddedServiceLiveAgent_Parent04I5I0000004LLTUA2_1797a9534a2',
											isOfflineSupportEnabled: !1,
										},
								  )
								: liveChatAPI.init(
										'https://gnmtouchpoint--dev1.sandbox.my.salesforce.com',
										'https://gnmtouchpoint--dev1.sandbox.my.salesforce-sites.com/liveagent',
										gslbBaseUrl,
										'00D9E0000004jvh',
										'Chat_Team',
										{
											baseLiveAgentContentURL:
												'https://c.la2-c1cs-fra.salesforceliveagent.com/content',
											deploymentId: '5729E000000CbOY',
											buttonId: '5739E0000008QCo',
											baseLiveAgentURL:
												'https://d.la2-c1cs-fra.salesforceliveagent.com/chat',
											eswLiveAgentDevName:
												'EmbeddedServiceLiveAgent_Parent04I9E0000008OxDUAU_1797a576c18',
											isOfflineSupportEnabled: !1,
										},
								  );
					}),
				_ref = { name: '1cwazio', styles: 'padding:3px' },
				StartLiveChatButton = (props) => {
					var [liveChatIsLoading, setLiveChatIsLoading] = (0,
						react.useState)(!1),
						bootstrapChat = (function () {
							var _ref3 = _asyncToGenerator(function* () {
								var _window$guardian$iden,
									_window$guardian,
									_window$guardian$iden2,
									_window$guardian2,
									_window$guardian3;
								setLiveChatIsLoading(!0);
								var targetElement,
									identityID,
									loginEmail,
									canLoadLiveChat = !0;
								if (
									(yield ((targetElement =
										document.getElementById(
											'liveChatContainerEl',
										)),
									(identityID =
										null !==
											(_window$guardian$iden =
												null ===
													(_window$guardian =
														window.guardian) ||
												void 0 === _window$guardian
													? void 0
													: _window$guardian
															.identityDetails
															.userId) &&
										void 0 !== _window$guardian$iden
											? _window$guardian$iden
											: ''),
									(loginEmail =
										null !==
											(_window$guardian$iden2 =
												null ===
													(_window$guardian2 =
														window.guardian) ||
												void 0 === _window$guardian2
													? void 0
													: _window$guardian2
															.identityDetails
															.email) &&
										void 0 !== _window$guardian$iden2
											? _window$guardian$iden2
											: ''),
									new Promise((resolve, reject) => {
										if (window.embedded_svc)
											resolve(
												initESW(
													null,
													window.embedded_svc,
													targetElement,
													identityID,
													loginEmail,
												),
											);
										else {
											var liveChatScript =
												document.createElement(
													'script',
												);
											liveChatScript.setAttribute(
												'id',
												'liveChatScript',
											),
												liveChatScript.setAttribute(
													'src',
													'https://gnmtouchpoint.my.salesforce.com/embeddedservice/5.0/esw.min.js',
												),
												(liveChatScript.onload =
													_asyncToGenerator(
														function* () {
															yield initESW(
																null,
																window.embedded_svc,
																targetElement,
																identityID,
																loginEmail,
															).catch(() =>
																reject(
																	new Error(
																		'livechat initESW function error',
																	),
																),
															),
																resolve(!0);
														},
													)),
												(liveChatScript.onerror =
													() => {
														reject(
															new Error(
																'liveChatScript error',
															),
														);
													}),
												document.body.appendChild(
													liveChatScript,
												);
										}
									})).catch(() => {
										props.setIsLiveChatAvailable(!1),
											(canLoadLiveChat = !1);
									}),
									canLoadLiveChat)
								) {
									yield window.embedded_svc.bootstrapEmbeddedService();
									var preChatEmailField =
										document.getElementById(
											'SuppliedEmail',
										);
									null !==
										(_window$guardian3 = window.guardian) &&
										void 0 !== _window$guardian3 &&
										_window$guardian3.identityDetails
											.email &&
										preChatEmailField &&
										((preChatEmailField.disabled = !0),
										preChatEmailField.classList.add(
											'disabledField',
										)),
										setLiveChatIsLoading(!1);
								}
							});
							return function bootstrapChat() {
								return _ref3.apply(this, arguments);
							};
						})();
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						Button.z,
						{
							priority: 'secondary',
							onClick: () => {
								(0, analytics.L9)({
									eventCategory: 'livechat',
									eventAction: 'click',
									eventLabel: 'start_live_chat',
								}),
									bootstrapChat();
							},
							cssOverrides: props.liveChatButtonCss,
							icon: liveChatIsLoading
								? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
										LoadingCircleIcon.U,
										{ additionalCss: _ref },
								  )
								: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
										SvgArrowRightStraight.l,
										{},
								  ),
							iconSide: 'right',
							children: 'Start live chat',
						},
					);
				};
			try {
				(StartLiveChatButton.displayName = 'StartLiveChatButton'),
					(StartLiveChatButton.__docgenInfo = {
						description: '',
						displayName: 'StartLiveChatButton',
						props: {
							liveChatButtonCss: {
								defaultValue: null,
								description: '',
								name: 'liveChatButtonCss',
								required: !0,
								type: { name: 'SerializedStyles' },
							},
							setIsLiveChatAvailable: {
								defaultValue: null,
								description: '',
								name: 'setIsLiveChatAvailable',
								required: !0,
								type: {
									name: 'Dispatch<SetStateAction<boolean>>',
								},
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/helpCentre/liveChat/LiveChat.tsx#StartLiveChatButton'
						] = {
							docgenInfo: StartLiveChatButton.__docgenInfo,
							name: 'StartLiveChatButton',
							path: 'client/components/helpCentre/liveChat/LiveChat.tsx#StartLiveChatButton',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var contactBoxContainerCss = (0, emotion_react_browser_esm.iv)(
					'display:flex;flex-direction:column;border:1px solid ',
					palette.palette.neutral[86],
					';',
					typography.Kz0,
					';',
					mq.Dp.phablet,
					'{width:calc(50% - ',
					space.D[5] / 2,
					'px);}',
					'',
				),
				contactBoxHeadingCss = (0, emotion_react_browser_esm.iv)(
					typography.Kie,
					';color:',
					palette.palette.neutral[20],
					';position:relative;margin:0;padding:18px 0 18px 60px;',
					'',
				),
				contactBoxHeadingWideCss = (0, emotion_react_browser_esm.iv)(
					mq.Dp.desktop,
					'{padding:22px 0 22px 64px;}',
					'',
				),
				contactBoxIconCss = (0, emotion_react_browser_esm.iv)(
					'position:absolute;top:',
					space.D[3],
					'px;left:',
					space.D[3],
					'px;',
					'',
				),
				contactBoxIconWideCss = (0, emotion_react_browser_esm.iv)(
					mq.Dp.desktop,
					'{top:',
					space.D[4],
					'px;left:',
					space.D[4],
					'px;}',
					'',
				),
				contactBoxSubtitleCss = (0, emotion_react_browser_esm.iv)(
					'display:none;margin:0 ',
					space.D[4],
					'px ',
					space.D[3],
					'px ',
					space.D[4],
					'px;',
					'',
				),
				contactBoxSubtitleWideCss = (0, emotion_react_browser_esm.iv)(
					mq.Dp.wide,
					'{display:block;}',
					'',
				),
				contactBoxSubtitleWarningCss = (0,
				emotion_react_browser_esm.iv)(
					'position:relative;color:',
					palette.palette.error[400],
					';font-weight:bold;margin:0 ',
					space.D[4],
					'px ',
					space.D[3],
					'px ',
					space.D[4],
					'px;padding-left:',
					space.D[5] + space.D[2],
					'px;',
					'',
				),
				contactBoxDetailsCss = function () {
					var includeTopBorder =
						!(arguments.length > 0 && void 0 !== arguments[0]) ||
						arguments[0];
					return (0, emotion_react_browser_esm.iv)(
						'border-top:',
						includeTopBorder
							? '1px solid '.concat(palette.palette.neutral[86])
							: '0',
						';padding:',
						space.D[3],
						'px;flex-grow:1;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-start;& p{margin-bottom:0;}',
						'',
					);
				},
				contactBoxDetailsWideCss = (0, emotion_react_browser_esm.iv)(
					mq.Dp.wide,
					'{padding:',
					space.D[3],
					'px 0 0;margin:0 ',
					space.D[4],
					'px ',
					space.D[4],
					'px;}',
					'',
				),
				HelpCentreEmailAndLiveChat_ref = {
					name: '14fvduy',
					styles: 'position:absolute;top:0;left:0',
				},
				HelpCentreContactBox = (props) =>
					(0, emotion_react_jsx_runtime_browser_esm.BX)('div', {
						css: contactBoxContainerCss,
						children: [
							(0, emotion_react_jsx_runtime_browser_esm.BX)(
								'div',
								{
									children: [
										(0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											'h2',
											{
												css: [
													contactBoxHeadingCss,
													!props.compactLayout &&
														contactBoxHeadingWideCss,
													'',
													'',
												],
												children: [
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'i',
														{
															css: [
																contactBoxIconCss,
																!props.compactLayout &&
																	contactBoxIconWideCss,
																'',
																'',
															],
															children: (0,
															HelpSectionIcons.W)(
																props.iconId,
															),
														},
													),
													props.title,
												],
											},
										),
										(0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											'p',
											{
												css: props.subTitleIsWarning
													? contactBoxSubtitleWarningCss
													: [
															contactBoxSubtitleCss,
															!props.compactLayout &&
																contactBoxSubtitleWideCss,
													  ],
												children: [
													props.subTitleIsWarning &&
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'i',
															{
																css: HelpCentreEmailAndLiveChat_ref,
																children: (0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	ErrorIcon.P,
																	{},
																),
															},
														),
													props.subtitle,
												],
											},
										),
									],
								},
							),
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								'div',
								{
									css: [
										contactBoxDetailsCss(
											!props.subTitleIsWarning,
										),
										!props.compactLayout &&
											contactBoxDetailsWideCss,
										'',
										'',
									],
									children: props.children,
								},
							),
						],
					}),
				emailAndLiveChatFlexContainerCss = (0,
				emotion_react_browser_esm.iv)(
					'display:flex;flex-direction:column;',
					mq.Dp.phablet,
					'{flex-direction:row-reverse;justify-content:space-between;}&>*{margin-bottom:',
					space.D[5],
					'px;}',
					'',
				),
				emailAndLiveChatPCss = (0, emotion_react_browser_esm.iv)(
					'font-weight:bold;margin-bottom:',
					space.D[9],
					'px!important;',
					'',
				),
				emailAndLiveChatButtonCss = (0, emotion_react_browser_esm.iv)(
					'margin-bottom:',
					space.D[5],
					'px;margin-top:',
					space.D[1],
					'px;',
					mq.Dp.tablet,
					'{margin-bottom:',
					space.D[9],
					'px;}',
					'',
				),
				HelpCentreEmailAndLiveChat = (props) => {
					var [isLiveChatAvailable, setIsLiveChatAvailable] = (0,
					react.useState)(!0);
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: (0,
							emotion_react_jsx_runtime_browser_esm.BX)('div', {
								css: emailAndLiveChatFlexContainerCss,
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										HelpCentreContactBox,
										{
											title: 'Chat with us',
											subtitle: isLiveChatAvailable
												? 'Chat with one of our customer service agents.'
												: 'Something went wrong. Please refresh or switch browsers.',
											subTitleIsWarning:
												!isLiveChatAvailable,
											iconId: 'chat-with-us',
											compactLayout: props.compactLayout,
											children:
												isLiveChatAvailable &&
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													StartLiveChatButton,
													{
														liveChatButtonCss:
															emailAndLiveChatButtonCss,
														setIsLiveChatAvailable,
													},
												),
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										HelpCentreContactBox,
										{
											iconId: 'email-us',
											title: 'Email us',
											subtitle:
												'Send a message to one of our customer service agents.',
											compactLayout: props.compactLayout,
											children: (0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'p',
												{
													css: emailAndLiveChatPCss,
													children:
														'customer.help@theguardian.com',
												},
											),
										},
									),
								],
							}),
						},
					);
				};
			try {
				(HelpCentreEmailAndLiveChat.displayName =
					'HelpCentreEmailAndLiveChat'),
					(HelpCentreEmailAndLiveChat.__docgenInfo = {
						description: '',
						displayName: 'HelpCentreEmailAndLiveChat',
						props: {
							compactLayout: {
								defaultValue: null,
								description: '',
								name: 'compactLayout',
								required: !1,
								type: { name: 'boolean' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/helpCentre/HelpCentreEmailAndLiveChat.tsx#HelpCentreEmailAndLiveChat'
						] = {
							docgenInfo: HelpCentreEmailAndLiveChat.__docgenInfo,
							name: 'HelpCentreEmailAndLiveChat',
							path: 'client/components/helpCentre/HelpCentreEmailAndLiveChat.tsx#HelpCentreEmailAndLiveChat',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var HelpCentrePhoneNumbers = __webpack_require__(
					'./client/components/helpCentre/HelpCentrePhoneNumbers.tsx',
				),
				liveChatFeatureSwitch = __webpack_require__(
					'./client/components/helpCentre/liveChat/liveChatFeatureSwitch.ts',
				),
				LiveChatPrivacyNotice = () => {
					var domain;
					domain =
						'undefined' != typeof window && window.guardian
							? window.guardian.domain
							: config.a.DOMAIN;
					var containerCss = (0, emotion_react_browser_esm.iv)(
							'margin-top:',
							space.D[9],
							'px;padding:',
							space.D[3],
							'px;',
							mq.Dp.desktop,
							'{padding:',
							space.D[6],
							'px;}background-color:#ecf3fe;',
							'',
						),
						titleCss = (0, emotion_react_browser_esm.iv)(
							'margin:0;',
							typography.fRL,
							';',
							'',
						),
						paragraphCss = (0, emotion_react_browser_esm.iv)(
							typography.VZD,
							';max-width:830px;margin:0;a{color:',
							palette.palette.brand[500],
							';text-decoration:underline;}',
							'',
						);
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						'div',
						{
							css: containerCss,
							id: 'livechatPrivacyNotice',
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'h2',
									{
										css: titleCss,
										children: 'Data privacy notice',
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'p',
									{
										css: paragraphCss,
										children: [
											'We use a type of cookie technology called an SDK (Software Development Kit) to ensure that our live chat services work correctly and meet your expectations. It cannot be switched off but it is removed at the end of the chat. If you do not wish for this cookie to be dropped on your device, please email or phone us instead. Live chats and phone calls will be recorded for monitoring and training purposes. Please do not disclose personal data of a sensitive nature in the live chat, such as health or financial information. A copy of the chat transcript will be emailed to you unless the chat contains payment card information, in which case no transcript will be sent. Click to find out more in our',
											' ',
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'a',
												{
													href: 'https://'.concat(
														domain,
														'/info/privacy',
													),
													children: 'privacy policy',
												},
											),
											' ',
											'and ',
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'a',
												{
													href: 'https://'.concat(
														domain,
														'/info/cookies',
													),
													children: 'cookie policy',
												},
											),
											'.',
										],
									},
								),
							],
						},
					);
				},
				LiveChatPrivacyNoticeLink = () => {
					var privacyNoticeLinkCss = (0,
					emotion_react_browser_esm.iv)(
						'margin-bottom:',
						space.D[2],
						'px;text-align:right;a{',
						typography.VZD,
						';color:',
						palette.palette.brand[500],
						';text-decoration:underline;}',
						'',
					);
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						'div',
						{
							css: privacyNoticeLinkCss,
							children: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)('a', {
								href: '#livechatPrivacyNotice',
								children: 'data privacy notice',
							}),
						},
					);
				},
				baseSubtitleStyles = (0, emotion_react_browser_esm.iv)(
					'border-top:1px solid ',
					palette.palette.neutral[86],
					';margin-top:30px;',
					typography.Hu7,
					';',
					'',
				),
				subtitleStyles = (0, emotion_react_browser_esm.iv)(
					baseSubtitleStyles,
					' margin-bottom:',
					space.D[6],
					'px;',
					mq.Dp.tablet,
					'{margin-bottom:',
					space.D[6],
					'px;margin-top:40px;}',
					'',
				),
				liveChatSubtitleStyles = (0, emotion_react_browser_esm.iv)(
					baseSubtitleStyles,
					' margin-bottom:',
					space.D[1],
					'px;',
					mq.Dp.tablet,
					'{margin-bottom:0;margin-top:40px;}',
					'',
				),
				emailAndLiveChatSubheadingCss = (0,
				emotion_react_browser_esm.iv)(
					typography.Kz0,
					';margin-bottom:',
					space.D[1],
					'px;max-width:320px;',
					mq.Dp.tablet,
					'{max-width:none;}',
					'',
				),
				emailAndLiveChatSubheadingWideCss = (0,
				emotion_react_browser_esm.iv)(
					mq.Dp.wide,
					'{display:none;}',
					'',
				),
				contactButtonCss = (0, emotion_react_browser_esm.iv)(
					'margin-top:',
					space.D[4],
					'px;margin-bottom:',
					space.D[9],
					'px;',
					mq.Dp.desktop,
					'{margin-top:',
					space.D[6],
					'px;margin-bottom:',
					space.D[12],
					'px;}',
					'',
				),
				HelpCentreContactOptions = (props) => {
					var [contactOptionsHidden, setContactOptionsHidden] = (0,
					react.useState)(props.hideContactOptions);
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'h2',
									{
										id: 'contact-options',
										css: (0, liveChatFeatureSwitch.o)()
											? liveChatSubtitleStyles
											: subtitleStyles,
										children:
											'Contact our Customer Services Team',
									},
								),
								(0, liveChatFeatureSwitch.o)()
									? (0,
									  emotion_react_jsx_runtime_browser_esm.BX)(
											emotion_react_jsx_runtime_browser_esm.HY,
											{
												children: [
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'p',
														{
															css: [
																emailAndLiveChatSubheadingCss,
																!props.compactLayout &&
																	emailAndLiveChatSubheadingWideCss,
																'',
																'',
															],
															children:
																'Get in touch with one of our customer service agents.',
														},
													),
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'div',
														{
															'aria-live':
																'polite',
															children: [
																!contactOptionsHidden &&
																	(0,
																	emotion_react_jsx_runtime_browser_esm.BX)(
																		emotion_react_jsx_runtime_browser_esm.HY,
																		{
																			children:
																				[
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						LiveChatPrivacyNoticeLink,
																						{},
																					),
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						HelpCentreEmailAndLiveChat,
																						{
																							compactLayout:
																								props.compactLayout,
																						},
																					),
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						HelpCentrePhoneNumbers.s,
																						{
																							compactLayout:
																								props.compactLayout,
																						},
																					),
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						LiveChatPrivacyNotice,
																						{},
																					),
																				],
																		},
																	),
																contactOptionsHidden &&
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'div',
																		{
																			css: contactButtonCss,
																			children:
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					Button.z,
																					{
																						priority:
																							'secondary',
																						onClick:
																							() =>
																								setContactOptionsHidden(
																									!1,
																								),
																						children:
																							'Contact us',
																					},
																				),
																		},
																	),
															],
														},
													),
												],
											},
									  )
									: (0,
									  emotion_react_jsx_runtime_browser_esm.tZ)(
											CallCenterEmailAndNumbers.K,
											{},
									  ),
							],
						},
					);
				};
			try {
				(HelpCentreContactOptions.displayName =
					'HelpCentreContactOptions'),
					(HelpCentreContactOptions.__docgenInfo = {
						description: '',
						displayName: 'HelpCentreContactOptions',
						props: {
							compactLayout: {
								defaultValue: null,
								description: '',
								name: 'compactLayout',
								required: !1,
								type: { name: 'boolean' },
							},
							hideContactOptions: {
								defaultValue: null,
								description: '',
								name: 'hideContactOptions',
								required: !1,
								type: { name: 'boolean' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/helpCentre/HelpCentreContactOptions.tsx#HelpCentreContactOptions'
						] = {
							docgenInfo: HelpCentreContactOptions.__docgenInfo,
							name: 'HelpCentreContactOptions',
							path: 'client/components/helpCentre/HelpCentreContactOptions.tsx#HelpCentreContactOptions',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/helpCentre/liveChat/liveChatFeatureSwitch.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				O: () => isArticleLiveChatFeatureEnabled,
				o: () => isLiveChatFeatureEnabled,
			});
			var isLiveChatFeatureEnabled = () => !0,
				isArticleLiveChatFeatureEnabled = () => !0;
		},
		'./client/components/mma/shared/assets/ErrorIcon.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { P: () => ErrorIcon });
			var _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__deprecated__/colour/palette.js',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				ErrorIcon = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
						'svg',
						{
							width: '21',
							height: '17',
							viewBox: '0 0 21 17',
							fill: 'none',
							css: props.additionalCss,
							children: (0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
								'path',
								{
									fillRule: 'evenodd',
									clipRule: 'evenodd',
									d: 'M9.9375 0L0 16.1095L0.6375 17H20.3625L21 16.1095L11.0625 0H9.9375ZM9.87661 11.5012H11.1234L11.7162 4.96907L10.8986 4.28147H10.1015L9.28386 4.96907L9.87661 11.5012ZM10.5 12.7045C11.1689 12.7045 11.7162 13.246 11.7162 13.9078C11.7162 14.5696 11.1689 15.1111 10.5 15.1111C9.83114 15.1111 9.28386 14.5696 9.28386 13.9078C9.28386 13.246 9.83114 12.7045 10.5 12.7045Z',
									fill:
										props.fill ||
										(props.downgradeToWarning
											? _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
													.A5[300]
											: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
													.r[400]),
								},
							),
						},
					);
			try {
				(ErrorIcon.displayName = 'ErrorIcon'),
					(ErrorIcon.__docgenInfo = {
						description: '',
						displayName: 'ErrorIcon',
						props: {
							fill: {
								defaultValue: null,
								description: '',
								name: 'fill',
								required: !1,
								type: { name: 'string' },
							},
							additionalCss: {
								defaultValue: null,
								description: '',
								name: 'additionalCss',
								required: !1,
								type: { name: 'SerializedStyles' },
							},
							downgradeToWarning: {
								defaultValue: null,
								description: '',
								name: 'downgradeToWarning',
								required: !1,
								type: { name: 'true' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/assets/ErrorIcon.tsx#ErrorIcon'
						] = {
							docgenInfo: ErrorIcon.__docgenInfo,
							name: 'ErrorIcon',
							path: 'client/components/mma/shared/assets/ErrorIcon.tsx#ErrorIcon',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/shared/assets/LoadingCircleIcon.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				U: () => LoadingCircleIcon,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				lightblueStyles = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'stroke:#a5c0e8;stroke-width:',
					50,
					';fill:transparent;',
					'',
				),
				darkblueStyles = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'stroke:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.palette.brand[400],
					';stroke-dasharray:820;stroke-dashoffset:820;stroke-width:',
					50,
					';fill:transparent;',
					'',
				),
				LoadingCircleIcon = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
						'svg',
						{
							width: '300',
							height: '300',
							viewBox: '0 0 300 300',
							css: props.additionalCss,
							children: (0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.BX)(
								'g',
								{
									children: [
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
											'animateTransform',
											{
												attributeName: 'transform',
												attributeType: 'XML',
												type: 'rotate',
												from: '0 150 150',
												to: '360 150 150',
												dur: '2.5s',
												repeatCount: 'indefinite',
											},
										),
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
											'circle',
											{
												cx: '150',
												cy: '150',
												r: '126',
												css: lightblueStyles,
											},
										),
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
											'path',
											{
												css: darkblueStyles,
												d: 'M150,150 m0,-126 a 126,126 0 0,1 0,252 a 126,126 0 0,1 0,-252',
												children: (0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
													'animate',
													{
														attributeName:
															'stroke-dashoffset',
														dur: '3.5s',
														to: '-820',
														repeatCount:
															'indefinite',
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
				(LoadingCircleIcon.displayName = 'LoadingCircleIcon'),
					(LoadingCircleIcon.__docgenInfo = {
						description: '',
						displayName: 'LoadingCircleIcon',
						props: {
							additionalCss: {
								defaultValue: null,
								description: '',
								name: 'additionalCss',
								required: !1,
								type: { name: 'SerializedStyles' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/assets/LoadingCircleIcon.tsx#LoadingCircleIcon'
						] = {
							docgenInfo: LoadingCircleIcon.__docgenInfo,
							name: 'LoadingCircleIcon',
							path: 'client/components/mma/shared/assets/LoadingCircleIcon.tsx#LoadingCircleIcon',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
	},
]);
