'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[941],
	{
		'./client/components/mma/shared/DatePicker.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					Default: () => Default,
					WithAmendment: () => WithAmendment,
					WithExistingDates: () => WithExistingDates,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => __WEBPACK_DEFAULT_EXPORT__,
				});
			var _DatePicker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./client/components/mma/shared/DatePicker.tsx',
				),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ =
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
			const __WEBPACK_DEFAULT_EXPORT__ = {
				title: 'Components/DatePicker',
				component: _DatePicker__WEBPACK_IMPORTED_MODULE_0__.M,
				parameters: { chromatic: { viewports: [320, 740, 1300] } },
				args: {
					firstAvailableDate: new Date('2022-01-10'),
					issueDaysOfWeek: [1, 2, 3, 4, 5],
					issueKeyword: 'Issue',
					existingDates: [],
				},
			};
			var Template = (args) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
						_DatePicker__WEBPACK_IMPORTED_MODULE_0__.M,
						(function _objectSpread(e) {
							for (var r = 1; r < arguments.length; r++) {
								var t =
									null != arguments[r] ? arguments[r] : {};
								r % 2
									? ownKeys(Object(t), !0).forEach(function (
											r,
									  ) {
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
												Object.getOwnPropertyDescriptor(
													t,
													r,
												),
											);
									  });
							}
							return e;
						})({}, args),
					),
				Default = { render: Template },
				WithExistingDates = {
					render: Template,
					args: {
						existingDates: [
							{
								start: new Date('2022-01-24'),
								end: new Date('2022-01-26'),
							},
							{
								start: new Date('2022-02-14'),
								end: new Date('2022-02-18'),
							},
						],
					},
				},
				WithAmendment = {
					render: Template,
					args: {
						amendableDateRange: {
							start: new Date('2022-02-21'),
							end: new Date('2022-02-23'),
						},
					},
				};
			(Default.parameters = {
				...Default.parameters,
				docs: {
					...Default.parameters?.docs,
					source: {
						originalSource: '{\n  render: Template\n}',
						...Default.parameters?.docs?.source,
					},
				},
			}),
				(WithExistingDates.parameters = {
					...WithExistingDates.parameters,
					docs: {
						...WithExistingDates.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: Template,\n  args: {\n    existingDates: [{\n      start: new Date('2022-01-24'),\n      end: new Date('2022-01-26')\n    }, {\n      start: new Date('2022-02-14'),\n      end: new Date('2022-02-18')\n    }]\n  }\n}",
							...WithExistingDates.parameters?.docs?.source,
						},
					},
				}),
				(WithAmendment.parameters = {
					...WithAmendment.parameters,
					docs: {
						...WithAmendment.parameters?.docs,
						source: {
							originalSource:
								"{\n  render: Template,\n  args: {\n    amendableDateRange: {\n      start: new Date('2022-02-21'),\n      end: new Date('2022-02-23')\n    }\n  }\n}",
							...WithAmendment.parameters?.docs?.source,
						},
					},
				});
			const __namedExportsOrder = [
				'Default',
				'WithExistingDates',
				'WithAmendment',
			];
		},
	},
]);
