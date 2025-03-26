'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[2026],
	{
		'./client/components/helpCentre/HelpCentrePhoneNumbers.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					CompactLayout: () => CompactLayout,
					Default: () => Default,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => __WEBPACK_DEFAULT_EXPORT__,
				});
			const __WEBPACK_DEFAULT_EXPORT__ = {
				title: 'Components/Help Centre/Help Centre Phone Numbers',
				component: __webpack_require__(
					'./client/components/helpCentre/HelpCentrePhoneNumbers.tsx',
				).s,
				args: { compactLayout: !1 },
				parameters: { chromatic: { viewports: [320, 1300] } },
			};
			var Default = {},
				CompactLayout = { args: { compactLayout: !0 } };
			(Default.parameters = {
				...Default.parameters,
				docs: {
					...Default.parameters?.docs,
					source: {
						originalSource: '{}',
						...Default.parameters?.docs?.source,
					},
				},
			}),
				(CompactLayout.parameters = {
					...CompactLayout.parameters,
					docs: {
						...CompactLayout.parameters?.docs,
						source: {
							originalSource:
								'{\n  args: {\n    compactLayout: true\n  }\n}',
							...CompactLayout.parameters?.docs?.source,
						},
					},
				});
			const __namedExportsOrder = ['Default', 'CompactLayout'];
		},
	},
]);
