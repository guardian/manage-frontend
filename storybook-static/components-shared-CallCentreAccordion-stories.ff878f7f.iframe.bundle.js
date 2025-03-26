(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[4596],
	{
		'./client/components/shared/CallCentreAccordion.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			'use strict';
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					Closed: () => Closed,
					Open: () => Open,
					OpenHideEmail: () => OpenHideEmail,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => __WEBPACK_DEFAULT_EXPORT__,
				});
			var _storybook_test__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@storybook/test/dist/index.mjs',
					),
				_CallCentreAccordion__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./client/components/shared/CallCentreAccordion.tsx',
					);
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
			var sleep = (ms) => new Promise((r) => setTimeout(r, ms));
			const __WEBPACK_DEFAULT_EXPORT__ = {
				title: 'Components/CallCentreAccordion',
				component: _CallCentreAccordion__WEBPACK_IMPORTED_MODULE_1__._,
			};
			var _ref2,
				_ref4,
				Closed = {},
				Open = {
					args: { showEmailAddress: !0 },
					play:
						((_ref2 = _asyncToGenerator(function* (_ref) {
							var { canvasElement } = _ref;
							yield sleep(1);
							var button = (0,
							_storybook_test__WEBPACK_IMPORTED_MODULE_0__.uh)(
								canvasElement,
							).getAllByText('Show')[0];
							yield _storybook_test__WEBPACK_IMPORTED_MODULE_0__.mV.click(
								button,
							);
						})),
						function play(_x) {
							return _ref2.apply(this, arguments);
						}),
				},
				OpenHideEmail = {
					play:
						((_ref4 = _asyncToGenerator(function* (_ref3) {
							var { canvasElement } = _ref3;
							yield sleep(1);
							var button = (0,
							_storybook_test__WEBPACK_IMPORTED_MODULE_0__.uh)(
								canvasElement,
							).getAllByText('Show')[0];
							yield _storybook_test__WEBPACK_IMPORTED_MODULE_0__.mV.click(
								button,
							);
						})),
						function play(_x2) {
							return _ref4.apply(this, arguments);
						}),
				};
			(Closed.parameters = {
				...Closed.parameters,
				docs: {
					...Closed.parameters?.docs,
					source: {
						originalSource: '{}',
						...Closed.parameters?.docs?.source,
					},
				},
			}),
				(Open.parameters = {
					...Open.parameters,
					docs: {
						...Open.parameters?.docs,
						source: {
							originalSource:
								"{\n  args: {\n    showEmailAddress: true\n  },\n  play: async ({\n    canvasElement\n  }: {\n    canvasElement: HTMLElement;\n  }) => {\n    // There is a useEffect within AccordionRow that sets 'isBrowser' and renders a NoJS version first\n    // Due to a bug the useEffect isn't being run in Storybook/Chromatic before we try to find the button\n    // We use sleep(1) to ensure the useEffect runs, if  this works without the sleep, please remove it\n    await sleep(1);\n    const canvas = within(canvasElement);\n    const button = canvas.getAllByText('Show')[0];\n    await userEvent.click(button);\n  }\n}",
							...Open.parameters?.docs?.source,
						},
					},
				}),
				(OpenHideEmail.parameters = {
					...OpenHideEmail.parameters,
					docs: {
						...OpenHideEmail.parameters?.docs,
						source: {
							originalSource:
								"{\n  play: async ({\n    canvasElement\n  }: {\n    canvasElement: HTMLElement;\n  }) => {\n    await sleep(1);\n    const canvas = within(canvasElement);\n    const button = canvas.getAllByText('Show')[0];\n    await userEvent.click(button);\n  }\n}",
							...OpenHideEmail.parameters?.docs?.source,
						},
					},
				});
			const __namedExportsOrder = ['Closed', 'Open', 'OpenHideEmail'];
		},
		'./node_modules/@storybook/instrumenter/dist sync recursive': (
			module,
		) => {
			function webpackEmptyContext(req) {
				var e = new Error("Cannot find module '" + req + "'");
				throw ((e.code = 'MODULE_NOT_FOUND'), e);
			}
			(webpackEmptyContext.keys = () => []),
				(webpackEmptyContext.resolve = webpackEmptyContext),
				(webpackEmptyContext.id =
					'./node_modules/@storybook/instrumenter/dist sync recursive'),
				(module.exports = webpackEmptyContext);
		},
		'./node_modules/@storybook/test/dist sync recursive': (module) => {
			function webpackEmptyContext(req) {
				var e = new Error("Cannot find module '" + req + "'");
				throw ((e.code = 'MODULE_NOT_FOUND'), e);
			}
			(webpackEmptyContext.keys = () => []),
				(webpackEmptyContext.resolve = webpackEmptyContext),
				(webpackEmptyContext.id =
					'./node_modules/@storybook/test/dist sync recursive'),
				(module.exports = webpackEmptyContext);
		},
	},
]);
