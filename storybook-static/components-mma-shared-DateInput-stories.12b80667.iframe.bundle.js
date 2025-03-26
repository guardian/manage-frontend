'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[715],
	{
		'./client/components/mma/shared/DateInput.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					Default: () => Default,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => __WEBPACK_DEFAULT_EXPORT__,
				});
			var _DateInput__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./client/components/mma/shared/DateInput.tsx',
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
				title: 'Components/Date Input',
				component: _DateInput__WEBPACK_IMPORTED_MODULE_0__.W,
				args: {
					date: new Date('2022-01-25'),
					labelText: 'From',
					disabled: !1,
				},
				argTypes: { date: { control: { type: 'date' } } },
			};
			var Default = {
				render: (args) => (
					(args.date = new Date(args.date)),
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
						_DateInput__WEBPACK_IMPORTED_MODULE_0__.W,
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
					)
				),
			};
			Default.parameters = {
				...Default.parameters,
				docs: {
					...Default.parameters?.docs,
					source: {
						originalSource: '{\n  render: Template\n}',
						...Default.parameters?.docs?.source,
					},
				},
			};
			const __namedExportsOrder = ['Default'];
		},
	},
]);
