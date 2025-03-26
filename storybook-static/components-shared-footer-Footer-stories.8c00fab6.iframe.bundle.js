'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[2651],
	{
		'./client/components/shared/footer/Footer.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					Default: () => Default,
					Minimal: () => Minimal,
					WithoutSupport: () => WithoutSupport,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => __WEBPACK_DEFAULT_EXPORT__,
				});
			var _Footer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./client/components/shared/footer/Footer.tsx',
				),
				_MinimalFooter__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./client/components/shared/footer/MinimalFooter.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			const __WEBPACK_DEFAULT_EXPORT__ = {
				title: 'Components/Footer',
				component: _Footer__WEBPACK_IMPORTED_MODULE_0__.$,
				parameters: {
					layout: 'fullscreen',
					chromatic: { viewports: [320, 740, 1300] },
				},
			};
			var Default = () =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
						_Footer__WEBPACK_IMPORTED_MODULE_0__.$,
						{},
					),
				WithoutSupport = () =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
						_Footer__WEBPACK_IMPORTED_MODULE_0__.$,
						{ hideSupport: !0 },
					),
				Minimal = () =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
						_MinimalFooter__WEBPACK_IMPORTED_MODULE_2__.n,
						{},
					);
			(Default.parameters = {
				...Default.parameters,
				docs: {
					...Default.parameters?.docs,
					source: {
						originalSource: '() => <Footer />',
						...Default.parameters?.docs?.source,
					},
				},
			}),
				(WithoutSupport.parameters = {
					...WithoutSupport.parameters,
					docs: {
						...WithoutSupport.parameters?.docs,
						source: {
							originalSource: '() => <Footer hideSupport />',
							...WithoutSupport.parameters?.docs?.source,
						},
					},
				}),
				(Minimal.parameters = {
					...Minimal.parameters,
					docs: {
						...Minimal.parameters?.docs,
						source: {
							originalSource: '() => <MinimalFooter />',
							...Minimal.parameters?.docs?.source,
						},
					},
				});
			const __namedExportsOrder = [
				'Default',
				'WithoutSupport',
				'Minimal',
			];
		},
	},
]);
