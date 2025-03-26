'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[4669],
	{
		'./client/components/mma/shared/OverlayLoader.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				E: () => OverlayLoader,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
				_shared_Spinner__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./client/components/shared/Spinner.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			var overlay = (0, _emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(
					'z-index:10000;display:block;border:0 none transparent;overflow-x:hidden;overflow-y:auto;visibility:visible;margin:0;padding:0;-webkit-tap-highlight-color:transparent;position:fixed;left:0;top:0;width:100%;height:100%;text-align:center;',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.Kz0,
					';',
					'',
				),
				overlayDialog = {
					name: '1yrzk9v',
					styles: 'font-size:20px;line-height:28px;position:relative;display:inline-block;color:white;top:50%;transform:translateY(-50%)',
				},
				overlayMessage = {
					name: '1azakc',
					styles: 'text-align:center',
				},
				overlayMessageBackground = {
					name: '1huqgo6',
					styles: 'z-index:-1;position:absolute;top:0;bottom:0;left:0;right:0;background:rgba(0, 0, 0, 0.6)',
				};
			function OverlayLoader(props) {
				return (0,
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.BX)(
					'div',
					{
						css: overlay,
						children: [
							(0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.BX)(
								'div',
								{
									css: overlayDialog,
									children: [
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
											_shared_Spinner__WEBPACK_IMPORTED_MODULE_0__.$,
											{ alignCenter: !0 },
										),
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
											'div',
											{
												css: overlayMessage,
												children: props.message,
											},
										),
									],
								},
							),
							(0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
								'div',
								{ css: overlayMessageBackground },
							),
						],
					},
				);
			}
			try {
				(OverlayLoader.displayName = 'OverlayLoader'),
					(OverlayLoader.__docgenInfo = {
						description: '',
						displayName: 'OverlayLoader',
						props: {
							message: {
								defaultValue: null,
								description: '',
								name: 'message',
								required: !0,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/OverlayLoader.tsx#OverlayLoader'
						] = {
							docgenInfo: OverlayLoader.__docgenInfo,
							name: 'OverlayLoader',
							path: 'client/components/mma/shared/OverlayLoader.tsx#OverlayLoader',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/shared/Spinner.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { $: () => Spinner });
			var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			var scaledPx = function (original) {
					var scale =
						arguments.length > 1 && void 0 !== arguments[1]
							? arguments[1]
							: 1;
					return ''.concat(Math.ceil(original * scale), 'px');
				},
				_ref = {
					name: '1xncvma',
					styles: '@keyframes spin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}',
				},
				Spinner = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.BX)(
						'div',
						{
							css: (0,
							_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(
								{
									alignItems: 'center',
									display: props.inline
										? 'inline-flex'
										: 'flex',
									justifyContent: props.alignCenter
										? 'center'
										: '',
								},
								'',
								'',
							),
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
									_emotion_react__WEBPACK_IMPORTED_MODULE_1__.xB,
									{ styles: _ref },
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
									'div',
									{
										css: (0,
										_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(
											{
												border: ''.concat(
													scaledPx(6, props.scale),
													' solid #f3f3f3',
												),
												borderTop: ''.concat(
													scaledPx(6, props.scale),
													' solid #333',
												),
												borderRadius: '50%',
												width: scaledPx(
													40,
													props.scale,
												),
												height: scaledPx(
													40,
													props.scale,
												),
												animation:
													'spin 2s linear infinite',
												margin: scaledPx(
													10,
													props.scale,
												),
												flexShrink: 0,
											},
											'',
											'',
										),
									},
								),
								props.loadingMessage,
							],
						},
					);
			try {
				(Spinner.displayName = 'Spinner'),
					(Spinner.__docgenInfo = {
						description: '',
						displayName: 'Spinner',
						props: {
							loadingMessage: {
								defaultValue: null,
								description: '',
								name: 'loadingMessage',
								required: !1,
								type: { name: 'string' },
							},
							scale: {
								defaultValue: null,
								description: '',
								name: 'scale',
								required: !1,
								type: { name: 'number' },
							},
							inline: {
								defaultValue: null,
								description: '',
								name: 'inline',
								required: !1,
								type: { name: 'true' },
							},
							alignCenter: {
								defaultValue: null,
								description: '',
								name: 'alignCenter',
								required: !1,
								type: { name: 'true' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/shared/Spinner.tsx#Spinner'
						] = {
							docgenInfo: Spinner.__docgenInfo,
							name: 'Spinner',
							path: 'client/components/shared/Spinner.tsx#Spinner',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/shared/OverlayLoader.stories.tsx': (
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
			const __WEBPACK_DEFAULT_EXPORT__ = {
				title: 'Components/OverlayLoader',
				component: __webpack_require__(
					'./client/components/mma/shared/OverlayLoader.tsx',
				).E,
				parameters: { layout: 'fullscreen' },
				args: { message: 'Updating payment details...' },
			};
			var Default = {};
			Default.parameters = {
				...Default.parameters,
				docs: {
					...Default.parameters?.docs,
					source: {
						originalSource: '{}',
						...Default.parameters?.docs?.source,
					},
				},
			};
			const __namedExportsOrder = ['Default'];
		},
	},
]);
