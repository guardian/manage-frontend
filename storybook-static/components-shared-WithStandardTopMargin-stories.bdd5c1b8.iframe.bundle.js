'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[2450],
	{
		'./client/components/shared/WithStandardTopMargin.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				z: () => WithStandardTopMargin,
			});
			var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
				__webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				);
			var _ref = { name: 'kmzqzw', styles: 'margin-top:1.8125rem' },
				WithStandardTopMargin = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
						'div',
						{ css: _ref, children: props.children },
					);
			try {
				(WithStandardTopMargin.displayName = 'WithStandardTopMargin'),
					(WithStandardTopMargin.__docgenInfo = {
						description: '',
						displayName: 'WithStandardTopMargin',
						props: {},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/shared/WithStandardTopMargin.tsx#WithStandardTopMargin'
						] = {
							docgenInfo: WithStandardTopMargin.__docgenInfo,
							name: 'WithStandardTopMargin',
							path: 'client/components/shared/WithStandardTopMargin.tsx#WithStandardTopMargin',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/shared/WithStandardTopMargin.stories.tsx': (
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
			var _WithStandardTopMargin__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./client/components/shared/WithStandardTopMargin.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			const __WEBPACK_DEFAULT_EXPORT__ = {
				title: 'Components/WithStandardTopMargin',
				component:
					_WithStandardTopMargin__WEBPACK_IMPORTED_MODULE_0__.z,
			};
			var _ref = { name: '1ljntii', styles: 'outline:1px dotted green' },
				_ref2 = { name: '1ljntii', styles: 'outline:1px dotted green' },
				_ref3 = { name: 'yw1lie', styles: 'outline:1px dotted red' },
				Default = () =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
						'div',
						{
							css: _ref3,
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
									_WithStandardTopMargin__WEBPACK_IMPORTED_MODULE_0__.z,
									{
										children: (0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
											'div',
											{
												css: _ref2,
												children:
													'Content with standard top margin',
											},
										),
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
									_WithStandardTopMargin__WEBPACK_IMPORTED_MODULE_0__.z,
									{
										children: (0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
											'div',
											{
												css: _ref,
												children:
													'More content with standard top margin',
											},
										),
									},
								),
							],
						},
					);
			Default.parameters = {
				...Default.parameters,
				docs: {
					...Default.parameters?.docs,
					source: {
						originalSource:
							'() => <div css={css`\n            outline: 1px dotted red;\n        `}>\n        <WithStandardTopMargin>\n            <div css={css`\n                    outline: 1px dotted green;\n                `}>\n                Content with standard top margin\n            </div>\n        </WithStandardTopMargin>\n        <WithStandardTopMargin>\n            <div css={css`\n                    outline: 1px dotted green;\n                `}>\n                More content with standard top margin\n            </div>\n        </WithStandardTopMargin>\n    </div>',
						...Default.parameters?.docs?.source,
					},
				},
			};
			const __namedExportsOrder = ['Default'];
		},
	},
]);
