'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[5454],
	{
		'./client/components/helpCentre/KnownIssues.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				B: () => KnownIssues,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_5__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/breakpoints.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_6__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_7__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_8__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_9__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
				react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./node_modules/react/index.js',
				),
				_shared_productResponse__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__('./shared/productResponse.ts'),
				_styles_grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
					'./client/styles/grid.ts',
				),
				_utilities_productUtils__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__('./client/utilities/productUtils.ts'),
				_mma_shared_assets_ErrorIcon__WEBPACK_IMPORTED_MODULE_11__ =
					__webpack_require__(
						'./client/components/mma/shared/assets/ErrorIcon.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ =
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
			var KnownIssues = (props) => {
				var [issuesData, setIssuesData] = (0,
				react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
				(0, react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
					!(function _asyncToGenerator(fn) {
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
					})(function* () {
						var _window$guardian,
							_window$guardian$iden,
							unfilteredDateSortedIssues = props.issues.sort(
								(a, b) =>
									Date.parse(a.date) - Date.parse(b.date),
							),
							responseContainsProductIssues = props.issues.some(
								(issue) => {
									var _issue$affectedProduc;
									return !(
										null ===
											(_issue$affectedProduc =
												issue.affectedProducts) ||
										void 0 === _issue$affectedProduc ||
										!_issue$affectedProduc.length
									);
								},
							),
							globalIssues = unfilteredDateSortedIssues.filter(
								(issue) => !issue.affectedProducts,
							);
						if (
							(setIssuesData(globalIssues),
							responseContainsProductIssues &&
								'undefined' != typeof window) &&
							'signedInRecently' ===
								((null ===
									(_window$guardian = window.guardian) ||
								void 0 === _window$guardian ||
								null ===
									(_window$guardian$iden =
										_window$guardian.identityDetails) ||
								void 0 === _window$guardian$iden
									? void 0
									: _window$guardian$iden.signInStatus) || '')
						) {
							var productDetailsResponse = yield (0,
								_utilities_productUtils__WEBPACK_IMPORTED_MODULE_3__.EV)(),
								userProductNames =
									(yield productDetailsResponse.json()).products
										.filter(
											_shared_productResponse__WEBPACK_IMPORTED_MODULE_1__.v_,
										)
										.map(
											(productDetail) =>
												productDetail.tier,
										),
								productIssues =
									unfilteredDateSortedIssues.filter(
										(issue) => {
											var _issue$affectedProduc2;
											return null ===
												(_issue$affectedProduc2 =
													issue.affectedProducts) ||
												void 0 ===
													_issue$affectedProduc2
												? void 0
												: _issue$affectedProduc2.some(
														(product) =>
															userProductNames.includes(
																product,
															),
												  );
										},
									);
							setIssuesData(globalIssues.concat(productIssues));
						}
					})();
				}, [props.issues]);
				var containerCss = (0,
					_emotion_react__WEBPACK_IMPORTED_MODULE_4__.iv)(
						'border-left:1px solid #dcdcdc;border-right:1px solid #dcdcdc;max-width:',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_5__
							.A.wide,
						'px;margin:0 auto;padding-top:',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_6__
							.D[4],
						'px;',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_7__
							.Dp.tablet,
						'{padding-top:',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_6__
							.D[5],
						'px;}',
						'',
					),
					issuesContainerCss = (0,
					_emotion_react__WEBPACK_IMPORTED_MODULE_4__.iv)(
						'padding-top:',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_6__
							.D[3],
						'px;',
						_objectSpread(
							{},
							_styles_grid__WEBPACK_IMPORTED_MODULE_2__.DH,
						),
						';',
						'',
					),
					divCss = (0,
					_emotion_react__WEBPACK_IMPORTED_MODULE_4__.iv)(
						'border:4px solid ',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_8__
							.palette.error[400],
						';padding:',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_6__
							.D[3],
						'px ',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_6__
							.D[3],
						'px ',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_6__
							.D[3],
						'px 42px;position:relative;',
						_objectSpread(
							{},
							(0, _styles_grid__WEBPACK_IMPORTED_MODULE_2__.YW)(
								1,
								4,
							),
						),
						' ',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_7__
							.Dp.tablet,
						'{',
						_objectSpread(
							{},
							(0, _styles_grid__WEBPACK_IMPORTED_MODULE_2__.YW)(
								1,
								12,
							),
						),
						';}',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_7__
							.Dp.desktop,
						'{',
						_objectSpread(
							{},
							(0, _styles_grid__WEBPACK_IMPORTED_MODULE_2__.YW)(
								3,
								9,
							),
						),
						';}',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_7__
							.Dp.wide,
						'{',
						_objectSpread(
							{},
							(0, _styles_grid__WEBPACK_IMPORTED_MODULE_2__.YW)(
								3,
								12,
							),
						),
						';}',
						'',
					),
					iconCss = (0,
					_emotion_react__WEBPACK_IMPORTED_MODULE_4__.iv)(
						'position:absolute;top:',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_6__
							.D[4],
						'px;left:',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_6__
							.D[3],
						'px;',
						'',
					),
					h4Css = (0, _emotion_react__WEBPACK_IMPORTED_MODULE_4__.iv)(
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_9__.Rcn,
						';color:',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_8__
							.palette.error[400],
						';margin:0;',
						'',
					),
					aCss = (0, _emotion_react__WEBPACK_IMPORTED_MODULE_4__.iv)(
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_9__.Kz0,
						';text-decoration:underline;color:',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_8__
							.palette.neutral[0],
						';',
						'',
					);
				return (0,
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.tZ)(
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.HY,
					{
						children:
							!!issuesData.length &&
							(0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.tZ)(
								'div',
								{
									css: containerCss,
									children: issuesData.map((issue, index) =>
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.tZ)(
											'div',
											{
												css: issuesContainerCss,
												children: (0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.BX)(
													'div',
													{
														css: divCss,
														children: [
															(0,
															_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.tZ)(
																'i',
																{
																	css: iconCss,
																	children:
																		(0,
																		_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.tZ)(
																			_mma_shared_assets_ErrorIcon__WEBPACK_IMPORTED_MODULE_11__.P,
																			{},
																		),
																},
															),
															(0,
															_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.tZ)(
																'h4',
																{
																	css: h4Css,
																	children:
																		issue.message,
																},
															),
															issue.link &&
																(0,
																_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.tZ)(
																	'a',
																	{
																		css: aCss,
																		href: issue.link,
																		rel: 'noreferrer',
																		target: '_blank',
																		children:
																			'Click here for more information',
																	},
																),
														],
													},
												),
											},
											'issue'.concat(index),
										),
									),
								},
							),
					},
				);
			};
			try {
				(KnownIssues.displayName = 'KnownIssues'),
					(KnownIssues.__docgenInfo = {
						description: '',
						displayName: 'KnownIssues',
						props: {
							issues: {
								defaultValue: null,
								description: '',
								name: 'issues',
								required: !0,
								type: { name: 'KnownIssueObj[]' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/helpCentre/KnownIssues.tsx#KnownIssues'
						] = {
							docgenInfo: KnownIssues.__docgenInfo,
							name: 'KnownIssues',
							path: 'client/components/helpCentre/KnownIssues.tsx#KnownIssues',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
	},
]);
