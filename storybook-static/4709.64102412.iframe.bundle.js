'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[4709],
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
		'./client/components/helpCentre/HelpCentreConfig.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				Se: () => helpCentreConfig,
				pE: () => helpCentreMoreQuestionsConfig,
				y_: () => helpCentreNavConfig,
			});
			var helpCentreConfig = [
					{
						id: 'delivery',
						title: 'Delivery',
						links: [
							{
								id: 'q1',
								title: 'I need to pause my delivery',
								link: '/help-centre/article/i-need-to-pause-my-delivery',
							},
							{
								id: 'q2',
								title: 'My delivery is late or missing',
								link: '/help-centre/article/my-delivery-is-late-or-missing',
							},
							{
								id: 'q3',
								title: 'I need to change my delivery address',
								link: '/help-centre/article/i-need-to-change-my-delivery-address',
							},
							{
								id: 'q4',
								title: 'I need to redirect my delivery',
								link: '/help-centre/article/how-can-i-redirect-my-delivery',
							},
							{
								id: 'q5',
								title: 'My paper is missing a section',
								link: '/help-centre/article/my-paper-is-missing-a-section',
							},
						],
						seeAllLink: '/help-centre/topic/delivery',
					},
					{
						id: 'billing',
						title: 'Billing',
						links: [
							{
								id: 'q1',
								title: 'How do I update my payment details?',
								link: '/help-centre/article/how-do-i-update-my-payment-details',
							},
							{
								id: 'q2',
								title: 'Where can I see my payments?',
								link: '/help-centre/article/where-can-i-see-my-payments',
							},
							{
								id: 'q3',
								title: 'I want to cancel my regular payments to you',
								link: '/help-centre/article/i-want-to-cancel-my-regular-payments-to-you',
							},
							{
								id: 'q4',
								title: 'What payment methods do you accept?',
								link: '/help-centre/article/what-payment-methods-do-you-accept',
							},
							{
								id: 'q5',
								title: 'Changing the amount of my payments',
								link: '/help-centre/article/changing-my-contribution-amount',
							},
						],
						seeAllLink: '/help-centre/topic/billing',
					},
					{
						id: 'accounts-and-sign-in',
						title: 'Accounts & Sign in',
						links: [
							{
								id: 'q1',
								title: 'I need help signing in',
								link: '/help-centre/article/i-need-help-signing-in',
							},
							{
								id: 'q2',
								title: 'How to stay signed in',
								link: '/help-centre/article/how-to-stay-signed-in',
							},
							{
								id: 'q3',
								title: 'I need to change my contact details',
								link: '/help-centre/article/i-need-to-change-my-contact-details',
							},
							{
								id: 'q4',
								title: 'I want to delete my account',
								link: '/help-centre/article/i-want-to-delete-my-account',
							},
							{
								id: 'q5',
								title: 'Signing in on multiple devices',
								link: '/help-centre/article/signing-in-on-multiple-devices',
							},
						],
						seeAllLink: '/help-centre/topic/accounts',
					},
					{
						id: 'website',
						title: 'The Guardian Website',
						links: [
							{
								id: 'q1',
								title: 'Why am I still seeing ads/banners?',
								link: '/help-centre/article/why-am-i-still-seeing-adsbanners',
							},
							{
								id: 'q2',
								title: 'I need to report a bug with your app/website',
								link: '/help-centre/article/ive-found-a-bug-how-can-i-report-it',
							},
							{
								id: 'q3',
								title: "I'm unable to comment and need help",
								link: '/help-centre/article/im-unable-to-comment-and-need-help',
							},
							{
								id: 'q4',
								title: "I'd like to complain about an advertisement",
								link: '/help-centre/article/id-like-to-make-a-complaint-about-an-advertisement',
							},
							{
								id: 'q5',
								title: 'Can I read your paper/magazines online?',
								link: '/help-centre/article/can-i-read-your-papermagazines-online',
							},
						],
						seeAllLink: '/help-centre/topic/website',
					},
					{
						id: 'journalism',
						title: 'Journalism',
						links: [
							{
								id: 'q1',
								title: 'I need to submit a correction or report a broken link',
								link: '/help-centre/article/i-need-to-submit-a-correction-or-report-a-broken-link',
							},
							{
								id: 'q2',
								title: 'How to make a complaint about Guardian or Observer content',
								link: '/help-centre/article/how-to-make-a-complaint-about-guardian-or-observer',
							},
							{
								id: 'q3',
								title: 'Using our journalism as a source',
								link: '/help-centre/article/using-our-journalism-as-a-souce',
							},
							{
								id: 'q4',
								title: 'Submit an idea for a story',
								link: '/help-centre/article/submit-an-idea-for-a-story',
							},
							{
								id: 'q5',
								title: 'Contact a journalist or editorial desk',
								link: '/help-centre/article/contact-a-journalist-or-editorial-desk',
							},
						],
						seeAllLink: '/help-centre/topic/journalism',
					},
					{
						id: 'subscriptions',
						title: 'Print Subscriptions',
						links: [
							{
								id: 'q1',
								title: 'When we deliver and where',
								link: '/help-centre/article/when-we-deliver-and-where',
							},
							{
								id: 'q2',
								title: 'Where can I pick up my papers?',
								link: '/help-centre/article/im-a-print-subscriber-where-can-i-pick-up-my-papers',
							},
							{
								id: 'q3',
								title: "I'm having trouble redeeming my paper",
								link: '/help-centre/article/what-to-do-if-youre-having-trouble-redeeming',
							},
							{
								id: 'q4',
								title: "I've lost my vouchers",
								link: '/help-centre/article/ive-lost-my-vouchers',
							},
							{
								id: 'q5',
								title: 'I want to cancel my subscription',
								link: '/help-centre/article/i-want-to-cancel-my-subscription',
							},
						],
						seeAllLink: '/help-centre/topic/subscriptions',
					},
				],
				helpCentreMoreQuestionsConfig = [
					{
						id: 'the-guardian-apps',
						title: 'The Guardian apps',
						links: [
							{
								id: 'q1',
								title: 'Apple/Google subscriptions',
								link: '/help-centre/article/i-have-a-googleitunes-subscription-that-i-need-help-with',
							},
							{
								id: 'q2',
								title: 'Personalising your apps',
								link: '/help-centre/article/making-your-app-more-personal',
							},
							{
								id: 'q3',
								title: 'Device compatibility',
								link: '/help-centre/article/what-devices-are-compatible-with-your-apps',
							},
						],
					},
					{
						id: 'newsletters-and-emails',
						title: 'Newsletters and emails',
						links: [
							{
								id: 'q1',
								title: "I'm not receiving any emails from you but think I should be",
								link: '/help-centre/article/im-not-receiving-emails-from-you-but-think-i-should-be',
							},
							{
								id: 'q2',
								title: 'Manage your email preferences',
								link: '/help-centre/article/i-need-to-update-my-email-preferences',
							},
							{
								id: 'q3',
								title: 'Subscribe to our newsletters',
								link: '/help-centre/article/subscribe-to-our-newsletters-and-emails',
							},
							{
								id: 'q4',
								title: 'How to identify legitimate emails from the Guardian',
								link: '/help-centre/article/how-to-identify-legitimate-emails-from-the-guardian',
							},
						],
					},
					{
						id: 'events',
						title: 'Events',
						links: [
							{
								id: 'q1',
								title: 'I can no longer attend the live online event, can I have a refund?',
								link: '/help-centre/article/i-can-no-longer-attend-the-live-online-event-can-i-have-a-refund',
							},
							{
								id: 'q2',
								title: 'I can’t find my original confirmation email, can you resend me the event link?',
								link: '/help-centre/article/i-cant-find-my-original-confirmation-email-can-you-resend-me-the-event-link',
							},
							{
								id: 'q3',
								title: 'Once I have purchased a ticket, how will I attend the online event?',
								link: '/help-centre/article/once-i-have-purchased-a-ticket-how-will-i-attend-the-online-event',
							},
							{
								id: 'q4',
								title: 'I purchased a book with my ticket, when will I receive this?',
								link: '/help-centre/article/i-purchased-a-book-with-my-ticket-when-will-i-receive-this',
							},
						],
					},
					{
						id: 'gifting',
						title: 'Gifting',
						links: [
							{
								id: 'q1',
								title: 'Gifting the Guardian Weekly',
								link: '/help-centre/article/gifting-the-guardian-weekly',
							},
							{
								id: 'q2',
								title: "My gift recipient hasn't recieved their gift",
								link: '/help-centre/article/my-gift-recipient-hasnt-received-their-gift',
							},
							{
								id: 'q3',
								title: "I've accidentally entered the wrong details when gifting",
								link: '/help-centre/article/ive-accidentally-entered-the-wrong-details',
							},
							{
								id: 'q4',
								title: 'The person I bought a gift for already has a subscription, can I get a refund?',
								link: '/help-centre/article/the-person-i-bought-a-gift-for-already-has-a-subscription-can-i-get-a-refund',
							},
						],
					},
					{
						id: 'back-issues-and-archives',
						title: 'Back issues and archives',
						links: [
							{
								id: 'q1',
								title: 'Finding articles from the past in digital format',
								link: '/help-centre/article/finding-articles-from-the-past-in-digital-format',
							},
							{
								id: 'q2',
								title: 'Old newspapers in physical format',
								link: '/help-centre/article/old-newspapers-in-physical-format',
							},
						],
					},
				],
				helpCentreNavConfig = [
					{ id: 'delivery', title: 'Delivery' },
					{ id: 'billing', title: 'Billing' },
					{ id: 'accounts', title: 'Accounts & Sign in' },
					{ id: 'website', title: 'The Guardian Website' },
					{ id: 'journalism', title: 'Journalism' },
					{ id: 'subscriptions', title: 'Print Subscriptions' },
					{ id: 'apps', title: 'The Guardian Apps' },
					{ id: 'more-topics', title: 'More Topics' },
				];
		},
		'./client/components/helpCentre/HelpCentreStyles.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				BC: () => linkArrowStyle,
				BR: () => linkAnchorStyle,
				Fg: () => containterCss,
				MF: () => sectionTitleCss,
				NR: () => innerSectionCss,
				P3: () => innerSectionDivCss,
				Q: () => linkListItemStyle,
				_h: () => h2Css,
				gx: () => linksListStyle,
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
				linkAnchorStyle = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'display:inline-block;width:100%;',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__.Kz0,
					';color:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.neutral[7],
					';:visited{color:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.neutral[7],
					';}',
					'',
				),
				linkArrowStyle = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'display:block;width:7px;height:7px;border-top:2px solid ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.neutral[7],
					';border-right:2px solid ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.neutral[7],
					';position:absolute;top:50%;transform:translateY(-50%) rotate(45deg);right:7px;',
					'',
				),
				linksListStyle = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'list-style:none;margin:0 0 ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[5],
					'px 0;padding:0;',
					'',
				),
				linkListItemStyle = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'padding:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[3],
					'px ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[5],
					'px ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[3],
					'px 0;border-bottom:1px solid ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.neutral[86],
					';position:relative;',
					'',
				),
				containterCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'width:100%;border:1px solid ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.neutral[86],
					';',
					'',
				),
				sectionTitleCss = (isOpen, isNotFirstOption) =>
					(0, _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
						'display:flex;justify-content:space-between;align-items:center;color:',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
							.palette.neutral[7],
						';',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__.Kz0,
						';margin:0;padding:',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
							.D[4],
						'px 14px ',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
							.D[4],
						'px ',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
							.D[3],
						'px;',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
							.Dp.desktop,
						'{padding:',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
							.D[4],
						'px 31px ',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
							.D[4],
						'px ',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
							.D[3],
						"px;}position:relative;cursor:pointer;:after{content:'';display:block;width:7px;height:7px;border-top:2px solid ",
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
							.palette.neutral[7],
						';border-right:2px solid ',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
							.palette.neutral[7],
						';position:absolute;top:50%;transform:translateY(',
						isOpen ? '-10%' : '-50%',
						') ',
						isOpen ? 'rotate(-45deg)' : 'rotate(135deg)',
						';transition:transform 0.4s;right:',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
							.D[3],
						'px;',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
							.Dp.desktop,
						'{right:17px;}}',
						isNotFirstOption &&
							'\n    :before {\n      content: "";\n      display: block;\n      position: absolute;\n      top: 0;\n      left: 0px;\n      width: 100%;\n      height: 1px;\n      background-color: '.concat(
								_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
									.palette.neutral[86],
								'\n    }\n  ',
							),
						';',
						'',
					),
				innerSectionDivCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__.Kz0,
					';margin-bottom:0;padding:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[4],
					'px ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[5],
					'px ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[4],
					'px 0;margin:0 ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[3],
					'px;position:relative;',
					'',
				),
				innerSectionCss = (isOpen) =>
					(0, _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
						'display:',
						isOpen ? 'block' : 'none',
						';margin:0;padding:0;list-style:none;background-color:rgba(193, 216, 252, 0.3);border-top:1px solid ',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
							.palette.neutral[86],
						';',
						'',
					),
				h2Css = (0, _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'margin-top:0;margin-bottom:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[6],
					'px;padding-top:2px;border-top:1px solid ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
						.palette.neutral[86],
					';',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__.Hu7,
					';',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__.Dp
						.desktop,
					'{font-size:32px;}',
					'',
				);
			try {
				(innerSectionCss.displayName = 'innerSectionCss'),
					(innerSectionCss.__docgenInfo = {
						description: '',
						displayName: 'innerSectionCss',
						props: {},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/helpCentre/HelpCentreStyles.tsx#innerSectionCss'
						] = {
							docgenInfo: innerSectionCss.__docgenInfo,
							name: 'innerSectionCss',
							path: 'client/components/helpCentre/HelpCentreStyles.tsx#innerSectionCss',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/shared/SectionContent.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				Z: () => SectionContent,
				q: () => SelectedTopicObjectContext,
			});
			var emotion_react_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
				),
				mq = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
				),
				palette = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
				),
				breakpoints = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/breakpoints.js',
				),
				space = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
				),
				react = __webpack_require__('./node_modules/react/index.js'),
				grid = __webpack_require__('./client/styles/grid.ts'),
				typography = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
				),
				react_router_dom = __webpack_require__(
					'./node_modules/react-router-dom/index.js',
				),
				HelpCentreConfig = __webpack_require__(
					'./client/components/helpCentre/HelpCentreConfig.ts',
				),
				HelpCentreStyles = __webpack_require__(
					'./client/components/helpCentre/HelpCentreStyles.tsx',
				),
				emotion_react_jsx_runtime_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				),
				desktopUlCss = (0, emotion_react_browser_esm.iv)(
					'list-style:none;margin:0 0 ',
					space.D[6],
					'px 0;padding:0;position:sticky;top:1rem;',
					mq.C4.desktop,
					'{display:none;}',
					'',
				),
				mobileLiCss = (topicIndex) =>
					(0, emotion_react_browser_esm.iv)(
						HelpCentreStyles.P3,
						';border-bottom:',
						topicIndex < HelpCentreConfig.y_.length - 1
							? '1px solid #dcdcdc'
							: '',
						';cursor:pointer;',
						mq.Dp.tablet,
						'{padding-left:',
						space.D[3],
						'px;}',
						'',
					),
				divCss = (0, emotion_react_browser_esm.iv)(
					'width:100%;border:1px solid ',
					palette.palette.neutral[86],
					';',
					mq.Dp.desktop,
					'{display:none;}margin-bottom:',
					space.D[6],
					'px;',
					'',
				),
				pCss = (0, emotion_react_browser_esm.iv)(
					'padding:',
					space.D[4],
					'px ',
					space.D[3],
					'px;margin:0;',
					'',
				),
				HelpCentreNav = (props) => {
					var [open, setOpen] = (0, react.useState)(!1),
						h2Css = (0, emotion_react_browser_esm.iv)(
							(0, HelpCentreStyles.MF)(open, !1),
							';',
							typography.Kie,
							';',
							mq.Dp.tablet,
							'{padding:',
							space.D[3],
							'px ',
							2 * space.D[3] + 15,
							'px ',
							space.D[3],
							'px ',
							space.D[5],
							'px;}',
							'',
						);
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'ul',
									{
										css: desktopUlCss,
										children: HelpCentreConfig.y_.map(
											(topic, topicIndex) => {
												return (0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													react_router_dom.rU,
													{
														to: '/help-centre/topic/'.concat(
															topic.id,
														),
														children: (0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'li',
															{
																css:
																	((isSelectedTopic =
																		props.selectedTopicId ===
																		topic.id),
																	(isFirstTopic =
																		0 ===
																		topicIndex),
																	(0,
																	emotion_react_browser_esm.iv)(
																		typography.Kz0,
																		';color:',
																		palette
																			.palette
																			.neutral[7],
																		';border-left:',
																		''.concat(
																			space
																				.D[2],
																			isSelectedTopic
																				? 'px solid #121212'
																				: 'px solid #dcdcdc',
																		),
																		';font-weight:',
																		isSelectedTopic
																			? '700'
																			: 'normal',
																		';cursor:pointer;:hover{background-color:',
																		isSelectedTopic
																			? 'transparent'
																			: palette
																					.palette
																					.neutral[93],
																		";}::after{content:'';display:block;border-bottom:1px solid ",
																		palette
																			.palette
																			.neutral[86],
																		";}::before{content:'';display:",
																		isFirstTopic
																			? 'block'
																			: 'none',
																		';border-top:1px solid ',
																		palette
																			.palette
																			.neutral[86],
																		';}',
																		'',
																	)),
																children: (0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'p',
																	{
																		css: pCss,
																		children:
																			topic.title,
																	},
																),
															},
														),
													},
													topic.id,
												);
												var isSelectedTopic,
													isFirstTopic;
											},
										),
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'div',
									{
										css: divCss,
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'h2',
												{
													css: h2Css,
													onClick: () => {
														setOpen(!open);
													},
													children: 'Topics',
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'ul',
												{
													css: (0,
													HelpCentreStyles.NR)(open),
													children:
														HelpCentreConfig.y_.map(
															(
																topic,
																topicIndex,
															) => {
																return (0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	react_router_dom.rU,
																	{
																		to: '/help-centre/topic/'.concat(
																			topic.id,
																		),
																		onClick:
																			() =>
																				setOpen(
																					!1,
																				),
																		children:
																			(0,
																			emotion_react_jsx_runtime_browser_esm.BX)(
																				'li',
																				{
																					css: mobileLiCss(
																						topicIndex,
																					),
																					children:
																						[
																							(0,
																							emotion_react_jsx_runtime_browser_esm.tZ)(
																								'span',
																								{
																									css:
																										((topicId =
																											topic.id),
																										(0,
																										emotion_react_browser_esm.iv)(
																											HelpCentreStyles.BR,
																											';font-weight:',
																											topicId ===
																												props.selectedTopicId
																												? 'bold'
																												: 'normal',
																											';',
																											'',
																										)),
																									children:
																										topic.title,
																								},
																							),
																							(0,
																							emotion_react_jsx_runtime_browser_esm.tZ)(
																								'span',
																								{
																									css: HelpCentreStyles.BC,
																								},
																							),
																						],
																				},
																				topic.id,
																			),
																	},
																	topic.id,
																);
																var topicId;
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
			try {
				(HelpCentreNav.displayName = 'HelpCentreNav'),
					(HelpCentreNav.__docgenInfo = {
						description: '',
						displayName: 'HelpCentreNav',
						props: {
							selectedTopicId: {
								defaultValue: null,
								description: '',
								name: 'selectedTopicId',
								required: !1,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/helpCentre/HelpCentreNav.tsx#HelpCentreNav'
						] = {
							docgenInfo: HelpCentreNav.__docgenInfo,
							name: 'HelpCentreNav',
							path: 'client/components/helpCentre/HelpCentreNav.tsx#HelpCentreNav',
						});
			} catch (__react_docgen_typescript_loader_error) {}
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
			var sectionCss = (hasNav, isNavSection, isStickyOnMobile) =>
					_objectSpread(
						_objectSpread(
							_objectSpread({}, (0, grid.YW)(1, 4)),
							isNavSection && {
								marginRight: '-13px',
								marginLeft: '-13px',
							},
						),
						{},
						{
							[mq.Dp.tablet]: _objectSpread(
								_objectSpread({}, (0, grid.YW)(1, 12)),
								isNavSection && {
									marginRight: '-21px',
									marginLeft: '-21px',
								},
							),
							[mq.Dp.desktop]: _objectSpread(
								_objectSpread(
									{},
									isNavSection
										? (0, grid.YW)(1, 3)
										: hasNav
										? (0, grid.YW)(5, 11)
										: (0, grid.YW)(3, 9),
								),
								isNavSection && {
									marginRight: '-21px',
									marginLeft: '-21px',
								},
							),
							[mq.Dp.wide]: _objectSpread(
								{},
								isNavSection
									? (0, grid.YW)(1, 3)
									: hasNav
									? (0, grid.YW)(5, 9)
									: (0, grid.YW)(3, 12),
							),
						},
						isStickyOnMobile && {
							[mq.C4.tablet]: {
								position: 'sticky',
								top: 0,
								backgroundColor: palette.palette.neutral[100],
								zIndex: 2,
							},
						},
					),
				containerCss = (0, emotion_react_browser_esm.iv)(
					'max-width:',
					breakpoints.A.wide,
					'px;margin:0 auto;padding-top:',
					space.D[12],
					'px;border-left:1px solid ',
					palette.palette.neutral[86],
					';border-right:1px solid ',
					palette.palette.neutral[86],
					';height:100%;',
					mq.C4.desktop,
					'{padding-top:0;}',
					'',
				),
				SelectedTopicObjectContext = (0, react.createContext)(void 0),
				SectionContent = (props) => {
					var hasNav,
						[selectedTopicId, setSelectedTopicId] = (0,
						react.useState)(void 0);
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						'div',
						{
							css: containerCss,
							children: (0,
							emotion_react_jsx_runtime_browser_esm.BX)('div', {
								css:
									((hasNav = props.hasNav),
									(0, emotion_react_browser_esm.iv)(
										_objectSpread({}, grid.DH),
										';margin-bottom:',
										space.D[12],
										'px;padding-bottom:1rem;',
										mq.Dp.desktop,
										'{',
										_objectSpread(
											{},
											grid.DH[mq.Dp.desktop],
										),
										';margin-bottom:',
										space.D[24],
										'px;padding-bottom:0;border-top:',
										hasNav
											? 'none'
											: '1px solid '.concat(
													palette.palette.neutral[86],
											  ),
										';}',
										mq.Dp.wide,
										'{',
										_objectSpread({}, grid.DH[mq.Dp.wide]),
										';}',
										'',
									)),
								children: [
									props.hasNav &&
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'section',
											{
												css: sectionCss(
													props.hasNav || !1,
													!0,
													!0,
												),
												children: (0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													HelpCentreNav,
													{ selectedTopicId },
												),
											},
										),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										SelectedTopicObjectContext.Provider,
										{
											value: setSelectedTopicId,
											children: (0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'section',
												{
													css: sectionCss(
														props.hasNav || !1,
														!1,
													),
													children: props.children,
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
				(SectionContent.displayName = 'SectionContent'),
					(SectionContent.__docgenInfo = {
						description: '',
						displayName: 'SectionContent',
						props: {
							hasNav: {
								defaultValue: null,
								description: '',
								name: 'hasNav',
								required: !1,
								type: { name: 'boolean' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/shared/SectionContent.tsx#SectionContent'
						] = {
							docgenInfo: SectionContent.__docgenInfo,
							name: 'SectionContent',
							path: 'client/components/shared/SectionContent.tsx#SectionContent',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/shared/SectionHeader.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				M: () => SectionHeader,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_5__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/breakpoints.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_6__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_7__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
				color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./node_modules/color/index.js',
				),
				color__WEBPACK_IMPORTED_MODULE_0___default =
					__webpack_require__.n(color__WEBPACK_IMPORTED_MODULE_0__),
				react_router_dom__WEBPACK_IMPORTED_MODULE_9__ =
					__webpack_require__(
						'./node_modules/react-router-dom/index.js',
					),
				_styles_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
					'./client/styles/grid.ts',
				),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ =
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
			var chevronCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
					'width:7px;height:7px;border-top:2px solid ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.palette.neutral[7],
					';border-right:2px solid ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.palette.neutral[7],
					';position:absolute;top:50%;transform:translateY(-50%) rotate(-135deg);left:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
						.D[1],
					'px;',
					'',
				),
				headerCss = (0, _emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
					'background-color:',
					color__WEBPACK_IMPORTED_MODULE_0___default()(
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
							.palette.brand[800],
					)
						.alpha(0.3)
						.string(),
					';',
					'',
				),
				containerCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
					_objectSpread(
						{},
						_styles_grid__WEBPACK_IMPORTED_MODULE_1__.DH,
					),
					';max-width:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_5__.A
						.wide,
					'px;margin:0 auto;border-left:1px solid ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.palette.neutral[86],
					';border-right:1px solid ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.palette.neutral[86],
					';',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_6__.Dp
						.desktop,
					'{',
					_objectSpread(
						{},
						_styles_grid__WEBPACK_IMPORTED_MODULE_1__.DH[
							_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_6__
								.Dp.desktop
						],
					),
					';}',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_6__.Dp
						.wide,
					'{',
					_objectSpread(
						{},
						_styles_grid__WEBPACK_IMPORTED_MODULE_1__.DH[
							_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_6__
								.Dp.wide
						],
					),
					';}',
					'',
				),
				divCss = (0, _emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
					'margin-top:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
						.D[3],
					'px;',
					_objectSpread(
						{},
						(0, _styles_grid__WEBPACK_IMPORTED_MODULE_1__.YW)(
							1,
							12,
						),
					),
					';',
					'',
				),
				linkCss = (0, _emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_7__.Kz0,
					';color:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.palette.neutral[0],
					';position:relative;',
					'',
				),
				spanCss = (0, _emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_7__.Rcn,
					';color:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.palette.neutral[0],
					';',
					'',
				),
				_ref = { name: '1mys3sh', styles: 'margin-left:1rem' },
				SectionHeader = (props) => {
					var pageHasNav,
						gridPlacementDesktop = props.pageHasNav
							? (0, _styles_grid__WEBPACK_IMPORTED_MODULE_1__.YW)(
									5,
									9,
							  )
							: (0, _styles_grid__WEBPACK_IMPORTED_MODULE_1__.YW)(
									3,
									10,
							  ),
						gridPlacementWide = props.pageHasNav
							? (0, _styles_grid__WEBPACK_IMPORTED_MODULE_1__.YW)(
									5,
									16,
							  )
							: (0, _styles_grid__WEBPACK_IMPORTED_MODULE_1__.YW)(
									3,
									14,
							  ),
						isLandingPage =
							'/help-centre' === window.location.pathname ||
							'/help-centre/' === window.location.pathname;
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.tZ)(
						'header',
						{
							css: headerCss,
							children: (0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.BX)(
								'div',
								{
									css: containerCss,
									children: [
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.tZ)(
											'div',
											{
												css: divCss,
												children: (0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.tZ)(
													react_router_dom__WEBPACK_IMPORTED_MODULE_9__.rU,
													{
														to: '/help-centre',
														css: linkCss,
														children: isLandingPage
															? (0,
															  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.tZ)(
																	'span',
																	{
																		css: spanCss,
																		children:
																			'Help Centre',
																	},
															  )
															: (0,
															  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.BX)(
																	'span',
																	{
																		css: _ref,
																		children:
																			[
																				(0,
																				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.tZ)(
																					'span',
																					{
																						css: chevronCss,
																					},
																				),
																				'Back to Help Centre',
																			],
																	},
															  ),
													},
												),
											},
										),
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.tZ)(
											'h1',
											{
												css:
													((pageHasNav =
														props.pageHasNav),
													(0,
													_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
														_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_7__._H,
														';font-size:2rem;',
														_objectSpread(
															{},
															(0,
															_styles_grid__WEBPACK_IMPORTED_MODULE_1__.YW)(
																1,
																12,
															),
														),
														';margin:',
														_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
															.D[9],
														'px 0 0 0;padding:',
														_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
															.D[3],
														'px 0;',
														_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_6__
															.Dp.tablet,
														'{',
														_objectSpread(
															{},
															(0,
															_styles_grid__WEBPACK_IMPORTED_MODULE_1__.YW)(
																1,
																12,
															),
														),
														';}',
														_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_6__
															.Dp.desktop,
														'{',
														_objectSpread(
															{},
															gridPlacementDesktop,
														),
														';font-size:2.625rem;padding-left:',
														_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
															.D[5],
														'px;margin-top:',
														_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
															.D[24],
														'px;margin-left:-',
														_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
															.D[5],
														'px;border-left:1px solid ',
														_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
															.palette
															.neutral[86],
														';border-top:1px solid ',
														_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
															.palette
															.neutral[86],
														';}',
														_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_6__
															.Dp.wide,
														'{',
														_objectSpread(
															{},
															gridPlacementWide,
														),
														';margin-left:',
														pageHasNav
															? '0px'
															: '-'.concat(
																	_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
																		.D[5],
																	'px',
															  ),
														';}',
														'',
													)),
												children: props.title,
											},
										),
									],
								},
							),
						},
					);
				};
			try {
				(SectionHeader.displayName = 'SectionHeader'),
					(SectionHeader.__docgenInfo = {
						description: '',
						displayName: 'SectionHeader',
						props: {
							title: {
								defaultValue: null,
								description: '',
								name: 'title',
								required: !0,
								type: { name: 'string | Element' },
							},
							pageHasNav: {
								defaultValue: null,
								description: '',
								name: 'pageHasNav',
								required: !1,
								type: { name: 'boolean' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/shared/SectionHeader.tsx#SectionHeader'
						] = {
							docgenInfo: SectionHeader.__docgenInfo,
							name: 'SectionHeader',
							path: 'client/components/shared/SectionHeader.tsx#SectionHeader',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
	},
]);
