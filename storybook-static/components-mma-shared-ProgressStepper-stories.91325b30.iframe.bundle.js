'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[1314],
	{
		'./client/components/mma/shared/assets/TickInCircle.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				G: () => TickInCircle,
			});
			var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
				__webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				);
			var _ref = { name: '40f4ru', styles: 'vertical-align:top' },
				TickInCircle = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.BX)(
						'svg',
						{
							width: '22',
							height: '22',
							viewBox: '0 0 22 22',
							fill: 'none',
							css: [_ref, props.additionalCss, '', ''],
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
									'circle',
									{
										cx: '11',
										cy: '11',
										r: '11',
										fill: props.fill || '#22874D',
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
									'path',
									{
										d: 'M6.59203 10.8413L6.50369 10.757L6.4173 10.8433L5.91161 11.349L5.83674 11.4239L5.89828 11.5101L8.42673 15.0499L8.46412 15.1022H8.52844H8.76865H8.82169L8.85854 15.0641L16.0899 7.5799L16.1764 7.49042L16.0873 7.40355L15.5816 6.9105L15.4975 6.82848L15.4104 6.90737L8.7709 12.9228L6.59203 10.8413Z',
										fill: 'white',
										stroke: 'white',
										strokeWidth: '0.25',
									},
								),
							],
						},
					);
			try {
				(TickInCircle.displayName = 'TickInCircle'),
					(TickInCircle.__docgenInfo = {
						description: '',
						displayName: 'TickInCircle',
						props: {
							fill: {
								defaultValue: null,
								description: '',
								name: 'fill',
								required: !1,
								type: { name: 'string' },
							},
							additionalCss: {
								defaultValue: null,
								description: '',
								name: 'additionalCss',
								required: !1,
								type: { name: 'SerializedStyles' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/assets/TickInCircle.tsx#TickInCircle'
						] = {
							docgenInfo: TickInCircle.__docgenInfo,
							name: 'TickInCircle',
							path: 'client/components/mma/shared/assets/TickInCircle.tsx#TickInCircle',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/shared/ProgressStepper.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					WithTitleWithCurrentStep: () => WithTitleWithCurrentStep,
					WithoutTitleWithCurrentStep: () =>
						WithoutTitleWithCurrentStep,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => __WEBPACK_DEFAULT_EXPORT__,
				});
			var _ProgressStepper__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./client/components/mma/shared/ProgressStepper.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			const __WEBPACK_DEFAULT_EXPORT__ = {
				title: 'Components/ProgressStepper',
				component: _ProgressStepper__WEBPACK_IMPORTED_MODULE_0__.S,
				parameters: { layout: 'fullscreen' },
			};
			var WithTitleWithCurrentStep = {
					render: () =>
						(0,
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
							_ProgressStepper__WEBPACK_IMPORTED_MODULE_0__.S,
							{
								steps: [
									{ title: 'Reason' },
									{ title: 'Review', isCurrentStep: !0 },
									{ title: 'Confirmation' },
								],
							},
						),
				},
				WithoutTitleWithCurrentStep = {
					render: () =>
						(0,
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
							_ProgressStepper__WEBPACK_IMPORTED_MODULE_0__.S,
							{ steps: [{}, { isCurrentStep: !0 }, {}] },
						),
				};
			(WithTitleWithCurrentStep.parameters = {
				...WithTitleWithCurrentStep.parameters,
				docs: {
					...WithTitleWithCurrentStep.parameters?.docs,
					source: {
						originalSource:
							"{\n  render: () => {\n    return <ProgressStepper steps={[{\n      title: 'Reason'\n    }, {\n      title: 'Review',\n      isCurrentStep: true\n    }, {\n      title: 'Confirmation'\n    }]} />;\n  }\n}",
						...WithTitleWithCurrentStep.parameters?.docs?.source,
					},
				},
			}),
				(WithoutTitleWithCurrentStep.parameters = {
					...WithoutTitleWithCurrentStep.parameters,
					docs: {
						...WithoutTitleWithCurrentStep.parameters?.docs,
						source: {
							originalSource:
								'{\n  render: () => {\n    return <ProgressStepper steps={[{}, {\n      isCurrentStep: true\n    }, {}]} />;\n  }\n}',
							...WithoutTitleWithCurrentStep.parameters?.docs
								?.source,
						},
					},
				});
			const __namedExportsOrder = [
				'WithTitleWithCurrentStep',
				'WithoutTitleWithCurrentStep',
			];
		},
	},
]);
