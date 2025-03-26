'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[9157],
	{
		'./client/components/shared/SupportTheGuardianButton.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					Default: () => Default,
					WithAlternateButtonText: () => WithAlternateButtonText,
					WithBrandAltTheme: () => WithBrandAltTheme,
					WithBrandTheme: () => WithBrandTheme,
					WithSmallSize: () => WithSmallSize,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => __WEBPACK_DEFAULT_EXPORT__,
				});
			var _SupportTheGuardianButton__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./client/components/shared/SupportTheGuardianButton.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			const __WEBPACK_DEFAULT_EXPORT__ = {
				title: 'Components/SupportTheGuardianButton',
				component:
					_SupportTheGuardianButton__WEBPACK_IMPORTED_MODULE_0__.o,
			};
			var Default = () =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
						_SupportTheGuardianButton__WEBPACK_IMPORTED_MODULE_0__.o,
						{ supportReferer: 'storybook' },
					),
				WithSmallSize = () =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
						_SupportTheGuardianButton__WEBPACK_IMPORTED_MODULE_0__.o,
						{ supportReferer: 'storybook', size: 'small' },
					),
				WithBrandTheme = () =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
						_SupportTheGuardianButton__WEBPACK_IMPORTED_MODULE_0__.o,
						{ supportReferer: 'storybook', theme: 'brand' },
					),
				WithBrandAltTheme = () =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
						_SupportTheGuardianButton__WEBPACK_IMPORTED_MODULE_0__.o,
						{ supportReferer: 'storybook', theme: 'brandAlt' },
					),
				WithAlternateButtonText = () =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
						_SupportTheGuardianButton__WEBPACK_IMPORTED_MODULE_0__.o,
						{
							supportReferer: 'storybook',
							alternateButtonText:
								'Make a recurring contribution',
							theme: 'brandAlt',
						},
					);
			(Default.parameters = {
				...Default.parameters,
				docs: {
					...Default.parameters?.docs,
					source: {
						originalSource:
							'() => <SupportTheGuardianButton supportReferer="storybook" />',
						...Default.parameters?.docs?.source,
					},
				},
			}),
				(WithSmallSize.parameters = {
					...WithSmallSize.parameters,
					docs: {
						...WithSmallSize.parameters?.docs,
						source: {
							originalSource:
								'() => <SupportTheGuardianButton supportReferer="storybook" size="small" />',
							...WithSmallSize.parameters?.docs?.source,
						},
					},
				}),
				(WithBrandTheme.parameters = {
					...WithBrandTheme.parameters,
					docs: {
						...WithBrandTheme.parameters?.docs,
						source: {
							originalSource:
								'() => <SupportTheGuardianButton supportReferer="storybook" theme="brand" />',
							...WithBrandTheme.parameters?.docs?.source,
						},
					},
				}),
				(WithBrandAltTheme.parameters = {
					...WithBrandAltTheme.parameters,
					docs: {
						...WithBrandAltTheme.parameters?.docs,
						source: {
							originalSource:
								'() => <SupportTheGuardianButton supportReferer="storybook" theme="brandAlt" />',
							...WithBrandAltTheme.parameters?.docs?.source,
						},
					},
				}),
				(WithAlternateButtonText.parameters = {
					...WithAlternateButtonText.parameters,
					docs: {
						...WithAlternateButtonText.parameters?.docs,
						source: {
							originalSource:
								'() => <SupportTheGuardianButton supportReferer="storybook" alternateButtonText="Make a recurring contribution" theme="brandAlt" />',
							...WithAlternateButtonText.parameters?.docs?.source,
						},
					},
				});
			const __namedExportsOrder = [
				'Default',
				'WithSmallSize',
				'WithBrandTheme',
				'WithBrandAltTheme',
				'WithAlternateButtonText',
			];
		},
	},
]);
