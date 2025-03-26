'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[5996],
	{
		'./client/components/mma/shared/Button.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					Bold: () => Bold,
					Default: () => Default,
					Disabled: () => Disabled,
					DisabledWithRightArrow: () => DisabledWithRightArrow,
					HollowWithLeftArrow: () => HollowWithLeftArrow,
					PrimaryWithRightArrow: () => PrimaryWithRightArrow,
					WithBrandColours: () => WithBrandColours,
					WithRightArrow: () => WithRightArrow,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => __WEBPACK_DEFAULT_EXPORT__,
				});
			var _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__ =
				__webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
				);
			const __WEBPACK_DEFAULT_EXPORT__ = {
				title: 'Components/Button',
				component: __webpack_require__(
					'./client/components/mma/shared/Buttons.tsx',
				).z,
				args: {
					text: 'Button',
					height: void 0,
					fontWeight: void 0,
					left: !1,
					right: !1,
					disabled: !1,
					colour: void 0,
					textColour: void 0,
					primary: void 0,
					hollow: void 0,
					hide: !1,
					forceCircle: void 0,
					hoverColour: void 0,
					leftTick: void 0,
					alert: !1,
					type: 'button',
				},
				argTypes: {
					fontWeight: {
						options: ['bold', void 0],
						control: { type: 'inline-radio' },
					},
					primary: {
						options: [!0, void 0],
						control: { type: 'inline-radio' },
					},
					hollow: {
						options: [!0, void 0],
						control: { type: 'inline-radio' },
					},
					forceCircle: {
						options: [!0, void 0],
						control: { type: 'inline-radio' },
					},
					leftTick: {
						options: [!0, void 0],
						control: { type: 'inline-radio' },
					},
					colour: { control: { type: 'color' } },
					textColour: { control: { type: 'color' } },
					hoverColour: { control: { type: 'color' } },
					type: {
						options: ['button', 'submit', 'reset'],
						control: { type: 'inline-radio' },
					},
				},
			};
			var Default = {},
				Bold = { args: { fontWeight: 'bold' } },
				Disabled = { args: { disabled: !0 } },
				WithBrandColours = {
					args: {
						colour: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
							.palette.brand[800],
						textColour:
							_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
								.palette.brand[400],
					},
				},
				WithRightArrow = { args: { right: !0 } },
				DisabledWithRightArrow = { args: { disabled: !0, right: !0 } },
				PrimaryWithRightArrow = { args: { primary: !0, right: !0 } },
				HollowWithLeftArrow = { args: { hollow: !0, left: !0 } };
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
				(Bold.parameters = {
					...Bold.parameters,
					docs: {
						...Bold.parameters?.docs,
						source: {
							originalSource:
								"{\n  args: {\n    fontWeight: 'bold'\n  }\n}",
							...Bold.parameters?.docs?.source,
						},
					},
				}),
				(Disabled.parameters = {
					...Disabled.parameters,
					docs: {
						...Disabled.parameters?.docs,
						source: {
							originalSource:
								'{\n  args: {\n    disabled: true\n  }\n}',
							...Disabled.parameters?.docs?.source,
						},
					},
				}),
				(WithBrandColours.parameters = {
					...WithBrandColours.parameters,
					docs: {
						...WithBrandColours.parameters?.docs,
						source: {
							originalSource:
								'{\n  args: {\n    colour: palette.brand[800],\n    textColour: palette.brand[400]\n  }\n}',
							...WithBrandColours.parameters?.docs?.source,
						},
					},
				}),
				(WithRightArrow.parameters = {
					...WithRightArrow.parameters,
					docs: {
						...WithRightArrow.parameters?.docs,
						source: {
							originalSource:
								'{\n  args: {\n    right: true\n  }\n}',
							...WithRightArrow.parameters?.docs?.source,
						},
					},
				}),
				(DisabledWithRightArrow.parameters = {
					...DisabledWithRightArrow.parameters,
					docs: {
						...DisabledWithRightArrow.parameters?.docs,
						source: {
							originalSource:
								'{\n  args: {\n    disabled: true,\n    right: true\n  }\n}',
							...DisabledWithRightArrow.parameters?.docs?.source,
						},
					},
				}),
				(PrimaryWithRightArrow.parameters = {
					...PrimaryWithRightArrow.parameters,
					docs: {
						...PrimaryWithRightArrow.parameters?.docs,
						source: {
							originalSource:
								'{\n  args: {\n    primary: true,\n    right: true\n  }\n}',
							...PrimaryWithRightArrow.parameters?.docs?.source,
						},
					},
				}),
				(HollowWithLeftArrow.parameters = {
					...HollowWithLeftArrow.parameters,
					docs: {
						...HollowWithLeftArrow.parameters?.docs,
						source: {
							originalSource:
								'{\n  args: {\n    hollow: true,\n    left: true\n  }\n}',
							...HollowWithLeftArrow.parameters?.docs?.source,
						},
					},
				});
			const __namedExportsOrder = [
				'Default',
				'Bold',
				'Disabled',
				'WithBrandColours',
				'WithRightArrow',
				'DisabledWithRightArrow',
				'PrimaryWithRightArrow',
				'HollowWithLeftArrow',
			];
		},
	},
]);
