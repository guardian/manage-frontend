'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[9954],
	{
		'./client/components/mma/Page.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				_: () => PageContainer,
			});
			var emotion_react_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
				),
				palette = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
				),
				mq = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
				),
				space = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
				),
				breakpoints = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/breakpoints.js',
				),
				typography = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
				),
				react = __webpack_require__('./node_modules/react/index.js'),
				grid = __webpack_require__('./client/styles/grid.ts'),
				Main = __webpack_require__(
					'./client/components/shared/Main.tsx',
				),
				react_router_dom = __webpack_require__(
					'./node_modules/react-router-dom/index.js',
				),
				NavConfig = __webpack_require__(
					'./client/components/shared/nav/NavConfig.tsx',
				),
				emotion_react_jsx_runtime_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				);
			var leftNavCss = {
					name: '1szedoy',
					styles: 'width:100%;margin:0;padding:0;border-bottom:0;list-style-type:none;position:sticky;top:1rem',
				},
				leftNavLinkCss = (isSelected) =>
					(0, emotion_react_browser_esm.iv)(
						typography.hGi,
						';font-weight:',
						isSelected ? 'bold' : 'normal',
						';line-height:1.25rem;letter-spacing:-0.02rem;text-align:left;text-decoration:none;white-space:nowrap;text-overflow:ellipsis;display:block;box-sizing:border-box;padding:4px 0 0 5px;overflow:hidden;background:',
						palette.palette.neutral[100],
						';color:',
						palette.palette.brand[400],
						';',
						mq.Dp.desktop,
						'{border-left:',
						space.D[2],
						'px solid ',
						isSelected
							? palette.palette.brandAlt[400]
							: palette.palette.neutral[46],
						';box-shadow:',
						isSelected
							? palette.palette.brandAlt[400]
							: palette.palette.neutral[46],
						';min-height:0;padding:18px 0 18px 22px;position:relative;:after{content:"";position:absolute;bottom:0;right:0;height:1px;width:calc(100% - 22px);background-color:',
						palette.palette.neutral[86],
						';}:hover{background-color:isSelected ? ',
						palette.palette.neutral[100],
						' :',
						palette.palette.neutral[97],
						';}}',
						'',
					),
				leftNavIconCss = (0, emotion_react_browser_esm.iv)(
					{
						display: 'inline-block',
						verticalAlign: 'top',
						width: 'auto',
						height: '100%',
						maxWidth: ''.concat(space.D[5], 'px'),
						maxHeight: ''.concat(space.D[5], 'px'),
						marginRight: ''.concat(space.D[5], 'px'),
					},
					'',
					'',
				),
				LeftSideNav = (props) =>
					(0, emotion_react_jsx_runtime_browser_esm.tZ)('ul', {
						css: leftNavCss,
						children: Object.values(NavConfig.qy)
							.filter((navItem) => !navItem.isDropDownExclusive)
							.map((navItem) => {
								return (0,
								emotion_react_jsx_runtime_browser_esm.tZ)(
									'li',
									{
										css:
											((isSelected =
												props.selectedNavItem ===
												navItem),
											{
												margin: 0,
												background: isSelected
													? palette.palette
															.neutral[100]
													: palette.palette
															.neutral[86],
												display: 'block',
												width: '100%',
												[mq.Dp.tablet]: {
													minWidth: '155.5px',
												},
											}),
										children: navItem.local
											? (0,
											  emotion_react_jsx_runtime_browser_esm.BX)(
													react_router_dom.rU,
													{
														css: leftNavLinkCss(
															props.selectedNavItem ===
																navItem,
														),
														'aria-current':
															props.selectedNavItem ===
															navItem
																? 'page'
																: void 0,
														to: navItem.link,
														children: [
															navItem.icon &&
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'i',
																	{
																		css: leftNavIconCss,
																		children:
																			(0,
																			emotion_react_jsx_runtime_browser_esm.tZ)(
																				navItem.icon,
																				{},
																			),
																	},
																),
															navItem.title,
														],
													},
											  )
											: (0,
											  emotion_react_jsx_runtime_browser_esm.tZ)(
													'a',
													{
														css: leftNavLinkCss(
															props.selectedNavItem ===
																navItem,
														),
														href: ''
															.concat(
																NavConfig.Qt,
															)
															.concat(
																navItem.link,
															),
														children: navItem.title,
													},
											  ),
									},
									navItem.title,
								);
								var isSelected;
							}),
					});
			try {
				(LeftSideNav.displayName = 'LeftSideNav'),
					(LeftSideNav.__docgenInfo = {
						description: '',
						displayName: 'LeftSideNav',
						props: {
							selectedNavItem: {
								defaultValue: null,
								description: '',
								name: 'selectedNavItem',
								required: !1,
								type: { name: 'NavItem' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/shared/nav/LeftSideNav.tsx#LeftSideNav'
						] = {
							docgenInfo: LeftSideNav.__docgenInfo,
							name: 'LeftSideNav',
							path: 'client/components/shared/nav/LeftSideNav.tsx#LeftSideNav',
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
			var PageContainer = (props) => {
					var hasMinimalFooterContext = (0, react.useContext)(Main.e);
					return (
						(0, react.useEffect)(() => {
							var _props$minimalFooter;
							hasMinimalFooterContext.setHasMinimalFooter(
								null !==
									(_props$minimalFooter =
										props.minimalFooter) &&
									void 0 !== _props$minimalFooter &&
									_props$minimalFooter,
							);
						}),
						(0, emotion_react_jsx_runtime_browser_esm.BX)(
							emotion_react_jsx_runtime_browser_esm.HY,
							{
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										PageHeaderContainer,
										{
											selectedNavItem:
												props.selectedNavItem,
											title: props.pageTitle,
											compactTitle: props.compactTitle,
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										PageNavAndContentContainer,
										{
											selectedNavItem:
												props.selectedNavItem,
											children: props.children,
										},
									),
								],
							},
						)
					);
				},
				PageHeaderContainer = (props) => {
					var containerCss = (0, emotion_react_browser_esm.iv)(
							'margin-left:auto;margin-right:auto;background:',
							palette.palette.brand[300],
							';border-bottom:1px solid ',
							palette.palette.neutral[86],
							';',
							mq.Dp.desktop,
							'{padding-top:100px;}',
							'',
						),
						gridCss = (0, emotion_react_browser_esm.iv)(
							'display:grid;grid-template-columns:repeat(',
							grid.ft.default,
							', minmax(0, 1fr));grid-auto-columns:max-content;column-gap:',
							space.D[5],
							'px;margin:auto;padding-left:',
							space.D[3],
							'px;padding-right:',
							space.D[3],
							'px;max-width:calc(',
							breakpoints.A.wide,
							'px + 2.5rem);color:',
							palette.palette.neutral[100],
							';',
							mq.Dp.tablet,
							'{padding-left:',
							space.D[5],
							'px;padding-right:',
							space.D[5],
							'px;grid-template-columns:repeat(\n\t\t\t\t',
							grid.ft.tabletAndDesktop,
							',\n\t\t\t\tminmax(0, 1fr)\n\t\t\t);}',
							mq.Dp.wide,
							'{grid-template-columns:repeat(',
							grid.ft.wide,
							', minmax(0, 1fr));}',
							'',
						),
						titleCss = (0, emotion_react_browser_esm.iv)(
							typography.vD7,
							';font-size:1.4375rem;grid-column:1/-1;margin-top:28px;margin-bottom:',
							space.D[2],
							'px;color:',
							palette.palette.neutral[100],
							';',
							props.compactTitle &&
								'\n\t\t\t'
									.concat(
										typography.fRL,
										';\n\t\t\tmargin-top: ',
									)
									.concat(
										space.D[1],
										'px;\n\t\t\tmargin-bottom: ',
									)
									.concat(space.D[1], 'px;\n\t\t'),
							' ',
							mq.Dp.mobileMedium,
							'{',
							!props.compactTitle && 'font-size: 1.5rem',
							';}',
							mq.Dp.tablet,
							'{',
							props.compactTitle &&
								'\n\t\t\t\t'
									.concat(
										typography.vD7,
										';\n\t\t\t\tmargin-top: 28px;\n\t\t\t\tmargin-bottom: ',
									)
									.concat(space.D[2], 'px;\n\t\t\t'),
							';}',
							mq.Dp.desktop,
							'{',
							typography.IOq,
							';grid-column:5/span 8;margin:0;padding:',
							space.D[1],
							'px ',
							space.D[2],
							'px;border:1px solid ',
							palette.palette.brand[600],
							';border-bottom:0;}',
							mq.Dp.wide,
							'{grid-column:6/span 10;}',
							'',
						);
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						'div',
						{
							css: containerCss,
							children: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)('div', {
								css: gridCss,
								children: (0,
								emotion_react_jsx_runtime_browser_esm.tZ)(
									'h1',
									{ css: titleCss, children: props.title },
								),
							}),
						},
					);
				},
				PageNavAndContentContainer = (props) =>
					(0, emotion_react_jsx_runtime_browser_esm.BX)('div', {
						css: (0, emotion_react_browser_esm.iv)(
							_objectSpread(
								_objectSpread({}, grid.DH),
								{},
								{
									maxWidth: 'calc('.concat(
										breakpoints.A.wide,
										'px + 2.5rem)',
									),
									margin: '0 auto',
									paddingBottom: ''.concat(space.D[12], 'px'),
									[mq.Dp.desktop]: _objectSpread(
										_objectSpread(
											{},
											grid.DH[mq.Dp.desktop],
										),
										{},
										{
											paddingBottom: ''.concat(
												space.D[24],
												'px',
											),
										},
									),
								},
							),
							'',
							'',
						),
						children: [
							!props.withoutNav &&
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'nav',
									{
										css: (0, emotion_react_browser_esm.iv)(
											{
												marginTop: 'calc(-1 * ('
													.concat(space.D[5], 'px + ')
													.concat(space.D[9], 'px))'),
												display: 'none',
												[mq.Dp.desktop]: _objectSpread(
													_objectSpread(
														{},
														(0, grid.YW)(1, 4),
													),
													{},
													{
														display: 'block',
														paddingRight: '1.25rem',
													},
												),
												[mq.Dp.wide]: {
													paddingRight: '0',
												},
											},
											'',
											'',
										),
										children: (0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											LeftSideNav,
											_objectSpread({}, props),
										),
									},
								),
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								'section',
								{
									id: 'maincontent',
									css: (0, emotion_react_browser_esm.iv)(
										_objectSpread(
											_objectSpread(
												{},
												(0, grid.YW)(1, 4),
											),
											{},
											{
												[mq.Dp.tablet]: _objectSpread(
													{},
													(0, grid.YW)(1, 12),
												),
												[mq.Dp.desktop]: _objectSpread(
													{},
													(0, grid.YW)(5, 8),
												),
												[mq.Dp.wide]: _objectSpread(
													{},
													(0, grid.YW)(6, 10),
												),
											},
										),
										'',
										'',
									),
									children: props.children,
								},
							),
						],
					});
			try {
				(PageContainer.displayName = 'PageContainer'),
					(PageContainer.__docgenInfo = {
						description: '',
						displayName: 'PageContainer',
						props: {
							selectedNavItem: {
								defaultValue: null,
								description: '',
								name: 'selectedNavItem',
								required: !0,
								type: { name: 'NavItem' },
							},
							pageTitle: {
								defaultValue: null,
								description: '',
								name: 'pageTitle',
								required: !0,
								type: {
									name: 'string | ReactElement<any, string | JSXElementConstructor<any>>',
								},
							},
							compactTitle: {
								defaultValue: null,
								description: '',
								name: 'compactTitle',
								required: !1,
								type: { name: 'boolean' },
							},
							minimalFooter: {
								defaultValue: null,
								description: '',
								name: 'minimalFooter',
								required: !1,
								type: { name: 'boolean' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/Page.tsx#PageContainer'
						] = {
							docgenInfo: PageContainer.__docgenInfo,
							name: 'PageContainer',
							path: 'client/components/mma/Page.tsx#PageContainer',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
	},
]);
