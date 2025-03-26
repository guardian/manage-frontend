'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[2468],
	{
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
		'./client/components/shared/Spinner.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					Default: () => Default,
					Scaled: () => Scaled,
					WithLoadingMessage: () => WithLoadingMessage,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => __WEBPACK_DEFAULT_EXPORT__,
				});
			const __WEBPACK_DEFAULT_EXPORT__ = {
				title: 'Components/Spinner',
				component: __webpack_require__(
					'./client/components/shared/Spinner.tsx',
				).$,
				args: {
					loadingMessage: '',
					scale: 1,
					inline: void 0,
					alignCenter: void 0,
				},
				argTypes: {
					inline: {
						options: [!0, void 0],
						control: { type: 'inline-radio' },
					},
					alignCenter: {
						options: [!0, void 0],
						control: { type: 'inline-radio' },
					},
				},
			};
			var Default = {},
				Scaled = { args: { scale: 2 } },
				WithLoadingMessage = {
					args: { loadingMessage: 'Loading your account details...' },
				};
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
				(Scaled.parameters = {
					...Scaled.parameters,
					docs: {
						...Scaled.parameters?.docs,
						source: {
							originalSource:
								'{\n  args: {\n    scale: 2\n  }\n}',
							...Scaled.parameters?.docs?.source,
						},
					},
				}),
				(WithLoadingMessage.parameters = {
					...WithLoadingMessage.parameters,
					docs: {
						...WithLoadingMessage.parameters?.docs,
						source: {
							originalSource:
								"{\n  args: {\n    loadingMessage: 'Loading your account details...'\n  }\n}",
							...WithLoadingMessage.parameters?.docs?.source,
						},
					},
				});
			const __namedExportsOrder = [
				'Default',
				'Scaled',
				'WithLoadingMessage',
			];
		},
	},
]);
