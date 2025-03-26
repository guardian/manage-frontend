'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[9180],
	{
		'./client/components/mma/shared/ProgressIndicator.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					OldVersion: () => OldVersion,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => __WEBPACK_DEFAULT_EXPORT__,
				});
			var _ProgressIndicator__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./client/components/mma/shared/ProgressIndicator.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			const __WEBPACK_DEFAULT_EXPORT__ = {
				title: 'Components/ProgressIndicator',
				component: _ProgressIndicator__WEBPACK_IMPORTED_MODULE_0__.Y,
				parameters: { layout: 'fullscreen' },
			};
			var OldVersion = {
				render: () =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
						_ProgressIndicator__WEBPACK_IMPORTED_MODULE_0__.Y,
						{
							steps: [
								{ title: 'Reason' },
								{ title: 'Review', isCurrentStep: !0 },
								{ title: 'Confirmation' },
							],
						},
					),
			};
			OldVersion.parameters = {
				...OldVersion.parameters,
				docs: {
					...OldVersion.parameters?.docs,
					source: {
						originalSource:
							"{\n  render: () => {\n    return <ProgressIndicator steps={[{\n      title: 'Reason'\n    }, {\n      title: 'Review',\n      isCurrentStep: true\n    }, {\n      title: 'Confirmation'\n    }]} />;\n  }\n}",
						...OldVersion.parameters?.docs?.source,
					},
				},
			};
			const __namedExportsOrder = ['OldVersion'];
		},
	},
]);
