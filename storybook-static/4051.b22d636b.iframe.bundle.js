'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[4051],
	{
		'./client/styles/ButtonStyles.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				A3: () => buttonContainerCss,
				N6: () => wideButtonLayoutCss,
				SX: () => stackedButtonLayoutCss,
				UD: () => stackedButtonLeftLayoutCss,
				_8: () => buttonCentredCss,
				fT: () => reverseStackedButtonLayoutCss,
				mb: () => wideButtonCss,
				zN: () => buttonMutedCss,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
					);
			var buttonCentredCss = {
					name: 'f7ay7b',
					styles: 'justify-content:center',
				},
				stackedButtonLayoutCss =
					(_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[3],
					(0, _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
						'display:flex;flex-direction:column;margin-top:',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
							.D[5],
						'px;>*+*{margin-top:',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
							.D[3],
						'px;}',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
							.Dp.tablet,
						'{flex-direction:row;>*+*{margin-top:0;margin-left:',
						_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
							.D[3],
						'px;}}',
						'',
					)),
				reverseStackedButtonLayoutCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'display:flex;flex-direction:column-reverse;margin-top:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[5],
					'px;padding-top:32px;>*+*{margin-bottom:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[3],
					'px;}',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.Dp
						.tablet,
					'{flex-direction:row;justify-content:flex-end;>*+*{margin-top:0;margin-left:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[3],
					'px;}}',
					'',
				),
				stackedButtonLeftLayoutCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'display:flex;flex-direction:column-reverse;margin-top:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[5],
					'px;padding-top:32px;>*+*{margin-bottom:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[3],
					'px;}',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.Dp
						.tablet,
					'{flex-direction:row;>*+*{margin-top:0;margin-left:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[3],
					'px;}}',
					'',
				),
				buttonContainerCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.C4
						.tablet,
					'{display:flex;flex-direction:column;}',
					'',
				),
				buttonMutedCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.C4
						.tablet,
					'{border:none;}',
					'',
				),
				wideButtonCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.Dp
						.tablet,
					'{flex-grow:1;max-width:300px;}',
					'',
				),
				wideButtonLayoutCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'display:flex;flex-direction:column;justify-content:flex-start;>*+*{margin-top:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.D[3],
					'px;}',
					'',
				);
		},
	},
]);
