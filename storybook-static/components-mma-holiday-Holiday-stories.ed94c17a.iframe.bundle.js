'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[274],
	{
		'./client/components/mma/holiday/Holiday.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					CreateGuardianWeekly: () => CreateGuardianWeekly,
					ManageGuardianWeekly: () => ManageGuardianWeekly,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => __WEBPACK_DEFAULT_EXPORT__,
				});
			var msw__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
					'./node_modules/msw/lib/core/http.mjs',
				),
				msw__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
					'./node_modules/msw/lib/core/HttpResponse.mjs',
				),
				_storybook_ReactRouterDecorator__WEBPACK_IMPORTED_MODULE_6__ =
					__webpack_require__(
						'./.storybook/ReactRouterDecorator.tsx',
					),
				_shared_productTypes__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__('./shared/productTypes.ts'),
				_fixtures_holidays__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__('./client/fixtures/holidays.ts'),
				_fixtures_mdapiResponse__WEBPACK_IMPORTED_MODULE_10__ =
					__webpack_require__('./client/fixtures/mdapiResponse.ts'),
				_fixtures_productBuilder_testProducts__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./client/fixtures/productBuilder/testProducts.ts',
					),
				_HolidayDateChooser__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./client/components/mma/holiday/HolidayDateChooser.tsx',
					),
				_HolidaysOverview__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./client/components/mma/holiday/HolidaysOverview.tsx',
					),
				_HolidayStopsContainer__WEBPACK_IMPORTED_MODULE_5__ =
					__webpack_require__(
						'./client/components/mma/holiday/HolidayStopsContainer.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ =
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
			var productTypeWithHolidayStops = _objectSpread(
				_objectSpread(
					{},
					_shared_productTypes__WEBPACK_IMPORTED_MODULE_0__.Pm
						.guardianweekly,
				),
				{},
				{ holidayStops: { issueKeyword: 'issue' } },
			);
			const __WEBPACK_DEFAULT_EXPORT__ = {
				component:
					_HolidayStopsContainer__WEBPACK_IMPORTED_MODULE_5__.u,
				title: 'Pages/HolidayStops',
				decorators: [
					_storybook_ReactRouterDecorator__WEBPACK_IMPORTED_MODULE_6__.R,
				],
				parameters: {
					reactRouter: {
						container: (0,
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.tZ)(
							_HolidayStopsContainer__WEBPACK_IMPORTED_MODULE_5__.u,
							{ productType: productTypeWithHolidayStops },
						),
					},
				},
			};
			var ManageGuardianWeekly = {
					render: () =>
						(0,
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.tZ)(
							_HolidaysOverview__WEBPACK_IMPORTED_MODULE_4__.m,
							{},
						),
					parameters: {
						msw: [
							msw__WEBPACK_IMPORTED_MODULE_8__.d.get(
								'/api/me/mma',
								() =>
									msw__WEBPACK_IMPORTED_MODULE_9__.Z.json(
										(0,
										_fixtures_mdapiResponse__WEBPACK_IMPORTED_MODULE_10__.F)(
											(0,
											_fixtures_productBuilder_testProducts__WEBPACK_IMPORTED_MODULE_2__.X8)(),
										),
									),
							),
							msw__WEBPACK_IMPORTED_MODULE_8__.d.get(
								'/api/holidays/*',
								() =>
									msw__WEBPACK_IMPORTED_MODULE_9__.Z.json(
										_fixtures_holidays__WEBPACK_IMPORTED_MODULE_1__.fD,
									),
							),
						],
					},
				},
				CreateGuardianWeekly = {
					render: () =>
						(0,
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.tZ)(
							_HolidayDateChooser__WEBPACK_IMPORTED_MODULE_3__.FD,
							{},
						),
					parameters: {
						msw: [
							msw__WEBPACK_IMPORTED_MODULE_8__.d.get(
								'/api/me/mma',
								() =>
									msw__WEBPACK_IMPORTED_MODULE_9__.Z.json(
										(0,
										_fixtures_mdapiResponse__WEBPACK_IMPORTED_MODULE_10__.F)(
											(0,
											_fixtures_productBuilder_testProducts__WEBPACK_IMPORTED_MODULE_2__.X8)(),
										),
									),
							),
							msw__WEBPACK_IMPORTED_MODULE_8__.d.get(
								'/api/holidays/*',
								() =>
									msw__WEBPACK_IMPORTED_MODULE_9__.Z.json(
										_fixtures_holidays__WEBPACK_IMPORTED_MODULE_1__.fD,
									),
							),
						],
					},
				};
			(ManageGuardianWeekly.parameters = {
				...ManageGuardianWeekly.parameters,
				docs: {
					...ManageGuardianWeekly.parameters?.docs,
					source: {
						originalSource:
							"{\n  render: () => {\n    return <HolidaysOverview />;\n  },\n  parameters: {\n    msw: [http.get('/api/me/mma', () => {\n      return HttpResponse.json(toMembersDataApiResponse(guardianWeeklyPaidByCard()));\n    }), http.get('/api/holidays/*', () => {\n      return HttpResponse.json(existingHolidays);\n    })]\n  }\n}",
						...ManageGuardianWeekly.parameters?.docs?.source,
					},
				},
			}),
				(CreateGuardianWeekly.parameters = {
					...CreateGuardianWeekly.parameters,
					docs: {
						...CreateGuardianWeekly.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: () => {\n    return <HolidayDateChooser />;\n  },\n  parameters: {\n    msw: [http.get('/api/me/mma', () => {\n      return HttpResponse.json(toMembersDataApiResponse(guardianWeeklyPaidByCard()));\n    }), http.get('/api/holidays/*', () => {\n      return HttpResponse.json(existingHolidays);\n    })]\n  }\n}",
							...CreateGuardianWeekly.parameters?.docs?.source,
						},
					},
				});
			const __namedExportsOrder = [
				'ManageGuardianWeekly',
				'CreateGuardianWeekly',
			];
		},
	},
]);
