'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[2635],
	{
		'./client/components/shared/ExpanderButton.stories.tsx': (
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
			var _ExpanderButton__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./client/components/shared/ExpanderButton.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			const __WEBPACK_DEFAULT_EXPORT__ = {
				title: 'Components/ExpanderButton',
				component: _ExpanderButton__WEBPACK_IMPORTED_MODULE_0__.b,
			};
			var _ref = {
					name: 'pv1s1f',
					styles: 'margin:0;padding:0;list-style:none',
				},
				Default = () =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
						_ExpanderButton__WEBPACK_IMPORTED_MODULE_0__.b,
						{
							buttonLabel: '2 issues',
							children: (0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
								'ul',
								{
									css: _ref,
									children: [
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
											'li',
											{
												children:
													'18 March 2022 (£-2.89)',
											},
										),
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
											'li',
											{
												children:
													'18 March 2022 (£-2.89)',
											},
										),
									],
								},
							),
						},
					);
			Default.parameters = {
				...Default.parameters,
				docs: {
					...Default.parameters?.docs,
					source: {
						originalSource:
							'() => <ExpanderButton buttonLabel="2 issues">\n        <ul css={css`\n                margin: 0;\n                padding: 0;\n                list-style: none;\n            `}>\n            <li>18 March 2022 (£-2.89)</li>\n            <li>18 March 2022 (£-2.89)</li>\n        </ul>\n    </ExpanderButton>',
						...Default.parameters?.docs?.source,
					},
				},
			};
			const __namedExportsOrder = ['Default'];
		},
	},
]);
