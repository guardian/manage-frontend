'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[4681],
	{
		'./client/components/mma/maintenance/Maintenance.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					Default: () => Default,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => Maintenance_stories,
				});
			var emotion_react_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
				),
				breakpoints = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/breakpoints.js',
				),
				space = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
				),
				palette = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
				),
				mq = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
				),
				typography = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
				),
				emotion_react_jsx_runtime_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				),
				containerStyle = (0, emotion_react_browser_esm.iv)(
					'max-width:',
					breakpoints.A.wide,
					'px;margin:0 auto;padding:',
					space.D[12],
					'px 0;border-left:1px solid ',
					palette.palette.neutral[86],
					';border-right:1px solid ',
					palette.palette.neutral[86],
					';height:100%;',
					'',
				),
				wrapperStyle = (0, emotion_react_browser_esm.iv)(
					'margin:0 10px;max-width:',
					breakpoints.A.mobileLandscape,
					'px;',
					mq.Dp.tablet,
					'{margin:0 20px;}',
					'',
				),
				headingStyle = (0, emotion_react_browser_esm.iv)(
					typography.t_M,
					';margin:0;padding-bottom:',
					space.D[4],
					'px;border-bottom:1px solid ',
					palette.palette.neutral[86],
					';',
					'',
				),
				grafStyle = (0, emotion_react_browser_esm.iv)(
					typography.Kz0,
					';margin-top:0;margin-bottom:',
					space.D[4],
					'px;',
					'',
				),
				Maintenance = () =>
					(0, emotion_react_jsx_runtime_browser_esm.tZ)('div', {
						css: containerStyle,
						children: (0, emotion_react_jsx_runtime_browser_esm.BX)(
							'section',
							{
								css: wrapperStyle,
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'h1',
										{
											css: headingStyle,
											children: "We'll be back soon",
										},
									),
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										'p',
										{
											css: grafStyle,
											children:
												'Sorry for the inconvenience. We are currently performing some essential maintenance. Please try again later.',
										},
									),
								],
							},
						),
					});
			const Maintenance_stories = {
				title: 'Pages/Maintenance',
				component: Maintenance,
				parameters: { layout: 'fullscreen' },
			};
			var Default = () =>
				(0, emotion_react_jsx_runtime_browser_esm.tZ)(Maintenance, {});
			Default.parameters = {
				...Default.parameters,
				docs: {
					...Default.parameters?.docs,
					source: {
						originalSource: '() => <Maintenance />',
						...Default.parameters?.docs?.source,
					},
				},
			};
			const __namedExportsOrder = ['Default'];
		},
	},
]);
