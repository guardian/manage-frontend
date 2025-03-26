'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[8368],
	{
		'./client/components/shared/CallCenterEmailAndNumbers.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				K: () => CallCentreEmailAndNumbers,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_5__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_6__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
					),
				react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./node_modules/react/index.js',
				),
				_callCentreData__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./client/components/shared/callCentreData.ts',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			var contactUsStyles = { margin: '0 0 10px', paddingRight: '5px' },
				callCenterStyles = {
					name: 'qy7844',
					styles: 'display:flex;flex-wrap:wrap;text-align:left;font-weight:normal',
				},
				_ref = { name: '4zleql', styles: 'display:block' },
				_ref2 = { name: 'lugakg', styles: 'font-weight:normal' },
				_ref3 = {
					name: '1v4nz20',
					styles: 'display:none;user-select:none',
				},
				CallCentreEmailAndNumbers = (props) => {
					var filteredPhoneData =
							_callCentreData__WEBPACK_IMPORTED_MODULE_1__.n.filter(
								(phoneRegion) =>
									!props.phoneRegionFilterKeys ||
									props.phoneRegionFilterKeys.includes(
										phoneRegion.key,
									),
							),
						openPhoneRegionIndex = filteredPhoneData.findIndex(
							(region) => region.key === props.openPhoneRegion,
						),
						initialIndex = props.collapsed
							? -1
							: props.openPhoneRegion
							? openPhoneRegionIndex
							: 0,
						[indexOfOpenSection, setIndexOfOpenSection] = (0,
						react__WEBPACK_IMPORTED_MODULE_0__.useState)(
							initialIndex,
						),
						sectionTitleCss = (isOpen, isNotFirstOption) =>
							'\n\t'
								.concat(
									_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.Kz0,
									';\n    margin: 0;\n    padding: ',
								)
								.concat(
									_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
										.D[4],
									'px ',
								)
								.concat(
									2 *
										_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
											.D[4] +
										15,
									'px ',
								)
								.concat(
									_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
										.D[4],
									'px ',
								)
								.concat(
									_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
										.D[4],
									'px;\n    position: relative;\n    cursor: pointer;\n    ',
								)
								.concat(
									isOpen
										? '\n        font-weight: bold;\n        background-color: '
												.concat(
													_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
														.palette.neutral[97],
													';\n        border-bottom: 1px solid ',
												)
												.concat(
													_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
														.palette.neutral[86],
													';\n      ',
												)
										: '',
									'\n    :after {\n      content: "";\n      display: block;\n      width: 7px;\n      height: 7px;\n      border-top: 2px solid ',
								)
								.concat(
									_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
										.palette.neutral[7],
									';\n      border-right: 2px solid ',
								)
								.concat(
									_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
										.palette.neutral[7],
									';\n      position: absolute;\n      top: 50%;\n      transform: ',
								)
								.concat(
									isOpen
										? 'translateY(-1px) rotate(-45deg)'
										: 'translateY(-3.5px) rotate(135deg)',
									';\n      transition: transform 0.4s;\n      right: 17px;\n    }\n    ',
								)
								.concat(
									isNotFirstOption &&
										'\n      :before {\n        content: "";\n        display: block;\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 1px;\n        background-color: '.concat(
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
												.palette.neutral[86],
											'\n      }\n    ',
										),
									'\n  ',
								),
						showHideSpanCss = _ref3,
						showHideSpanWideCss = (0,
						_emotion_react__WEBPACK_IMPORTED_MODULE_5__.iv)(
							_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_6__
								.Dp.desktop,
							'{display:block;position:absolute;top:50%;transform:translateY(-50%);right:32px;font-weight:normal;font-size:0.75rem;}',
							'',
						),
						innerSectionCss = (isOpen) =>
							'\n    display: '
								.concat(
									isOpen ? 'block' : 'none',
									';\n    background-color: ',
								)
								.concat(
									_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
										.palette.neutral[97],
									';\n    padding: ',
								)
								.concat(
									_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
										.D[4],
									'px;\n  ',
								),
						innerSectionPCss = '\n\t'
							.concat(
								_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.Kz0,
								';\n    margin-bottom: 0;\n    & + p {\n      margin-top: ',
							)
							.concat(
								_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
									.D[4],
								'px;\n    }\n  ',
							),
						innerSectionTitleCss = '\n\t'.concat(
							_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.Kz0,
							';\n    margin: 6px 0 4px;\n  ',
						);
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.BX)(
						'div',
						{
							css: callCenterStyles,
							children: [
								props.prefixText &&
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.tZ)(
										'p',
										{
											css: contactUsStyles,
											children: props.prefixText,
										},
									),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.tZ)(
									'div',
									{
										css: (0,
										_emotion_react__WEBPACK_IMPORTED_MODULE_5__.iv)(
											'width:100%;border:1px solid ',
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
												.palette.neutral[86],
											';',
											'',
										),
										children: filteredPhoneData.map(
											(phoneRegion, index) => {
												var sectionNum,
													isOpen =
														index ===
														indexOfOpenSection,
													isNotFirstOption =
														index > 0;
												return (0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.BX)(
													'div',
													{
														children: [
															(0,
															_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.BX)(
																'h2',
																{
																	css: (0,
																	_emotion_react__WEBPACK_IMPORTED_MODULE_5__.iv)(
																		sectionTitleCss(
																			isOpen,
																			isNotFirstOption,
																		),
																		';',
																		'',
																	),
																	onClick:
																		((sectionNum =
																			index),
																		() => {
																			setIndexOfOpenSection(
																				indexOfOpenSection ===
																					sectionNum
																					? -1
																					: sectionNum,
																			);
																		}),
																	children: [
																		phoneRegion.title,
																		(0,
																		_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.tZ)(
																			'span',
																			{
																				css: [
																					showHideSpanCss,
																					!props.compactLayout &&
																						showHideSpanWideCss,
																					'',
																					'',
																				],
																				'aria-hidden':
																					'true',
																				children:
																					isOpen
																						? 'Hide'
																						: 'Show',
																			},
																		),
																	],
																},
															),
															(0,
															_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.BX)(
																'div',
																{
																	css: (0,
																	_emotion_react__WEBPACK_IMPORTED_MODULE_5__.iv)(
																		innerSectionCss(
																			isOpen,
																		),
																		';',
																		'',
																	),
																	children: [
																		!props.hideEmailAddress &&
																			(0,
																			_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.BX)(
																				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.HY,
																				{
																					children:
																						[
																							(0,
																							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.tZ)(
																								'h4',
																								{
																									css: (0,
																									_emotion_react__WEBPACK_IMPORTED_MODULE_5__.iv)(
																										innerSectionTitleCss,
																										';',
																										'',
																									),
																									children:
																										'Email:',
																								},
																							),
																							(0,
																							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.tZ)(
																								'span',
																								{
																									css: (0,
																									_emotion_react__WEBPACK_IMPORTED_MODULE_5__.iv)(
																										_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.Rcn,
																										';word-break:break-word;',
																										'',
																									),
																									children:
																										_callCentreData__WEBPACK_IMPORTED_MODULE_1__.Q,
																								},
																							),
																						],
																				},
																			),
																		!props.hideEmailAddress &&
																			(0,
																			_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.tZ)(
																				'h4',
																				{
																					css: (0,
																					_emotion_react__WEBPACK_IMPORTED_MODULE_5__.iv)(
																						innerSectionTitleCss,
																						';',
																						'',
																					),
																					children:
																						'Phone:',
																				},
																			),
																		(0,
																		_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.BX)(
																			'p',
																			{
																				css: (0,
																				_emotion_react__WEBPACK_IMPORTED_MODULE_5__.iv)(
																					innerSectionPCss,
																					';',
																					'',
																				),
																				children:
																					[
																						phoneRegion.phoneNumbers.map(
																							(
																								_ref4,
																							) => {
																								var {
																									phoneNumber,
																									suffix,
																								} =
																									_ref4;
																								return (0,
																								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.BX)(
																									'span',
																									{
																										css: (0,
																										_emotion_react__WEBPACK_IMPORTED_MODULE_5__.iv)(
																											'\n      display: block;\n      margin-bottom: 4px;\n      font-weight: bold;\n  ',
																											';',
																											'',
																										),
																										children:
																											[
																												phoneNumber,
																												suffix &&
																													(0,
																													_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.BX)(
																														'span',
																														{
																															css: _ref2,
																															children:
																																[
																																	' ',
																																	suffix,
																																],
																														},
																													),
																											],
																									},
																									phoneNumber,
																								);
																							},
																						),
																						phoneRegion.openingHours.map(
																							(
																								openingHourLine,
																								openingHoursLineKey,
																							) =>
																								(0,
																								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.tZ)(
																									'span',
																									{
																										css: _ref,
																										children:
																											openingHourLine,
																									},
																									openingHoursLineKey,
																								),
																						),
																					],
																			},
																		),
																		phoneRegion.additionalOpeningHoursInfo &&
																			(0,
																			_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.tZ)(
																				'p',
																				{
																					css: (0,
																					_emotion_react__WEBPACK_IMPORTED_MODULE_5__.iv)(
																						innerSectionPCss,
																						';',
																						'',
																					),
																					children:
																						phoneRegion.additionalOpeningHoursInfo,
																				},
																			),
																	],
																},
															),
														],
													},
													phoneRegion.key,
												);
											},
										),
									},
								),
							],
						},
					);
				};
			try {
				(CallCentreEmailAndNumbers.displayName =
					'CallCentreEmailAndNumbers'),
					(CallCentreEmailAndNumbers.__docgenInfo = {
						description: '',
						displayName: 'CallCentreEmailAndNumbers',
						props: {
							hideEmailAddress: {
								defaultValue: null,
								description: '',
								name: 'hideEmailAddress',
								required: !1,
								type: { name: 'boolean' },
							},
							phoneRegionFilterKeys: {
								defaultValue: null,
								description: '',
								name: 'phoneRegionFilterKeys',
								required: !1,
								type: { name: 'PhoneRegionKey[]' },
							},
							compactLayout: {
								defaultValue: null,
								description: '',
								name: 'compactLayout',
								required: !1,
								type: { name: 'boolean' },
							},
							collapsed: {
								defaultValue: null,
								description: '',
								name: 'collapsed',
								required: !1,
								type: { name: 'boolean' },
							},
							openPhoneRegion: {
								defaultValue: null,
								description: '',
								name: 'openPhoneRegion',
								required: !1,
								type: {
									name: 'enum',
									value: [
										{ value: '"US"' },
										{ value: '"AUS"' },
										{ value: '"UK & ROW"' },
									],
								},
							},
							prefixText: {
								defaultValue: null,
								description: '',
								name: 'prefixText',
								required: !1,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/shared/CallCenterEmailAndNumbers.tsx#CallCentreEmailAndNumbers'
						] = {
							docgenInfo: CallCentreEmailAndNumbers.__docgenInfo,
							name: 'CallCentreEmailAndNumbers',
							path: 'client/components/shared/CallCenterEmailAndNumbers.tsx#CallCentreEmailAndNumbers',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/shared/callCentreData.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				Q: () => customerHelpEmailAddress,
				n: () => phoneData,
			});
			var customerHelpEmailAddress = 'customer.help@theguardian.com',
				phoneData = [
					{
						key: 'UK & ROW',
						title: 'United Kingdom, Europe and rest of world',
						openingHours: [
							'8am - 6pm Monday - Friday (GMT/BST)',
							'9am - 6pm Saturday - Sunday (GMT/BST)',
						],
						phoneNumbers: [{ phoneNumber: '+44 (0) 330 333 6767' }],
					},
					{
						key: 'AUS',
						title: 'Australia, New Zealand, and Asia Pacific',
						openingHours: ['9am - 5pm Monday - Friday (AEDT)'],
						phoneNumbers: [
							{
								phoneNumber: '1800 773 766',
								suffix: '(within Australia)',
							},
							{
								phoneNumber: '+61 28076 8599',
								suffix: '(outside Australia)',
							},
						],
					},
					{
						key: 'US',
						title: 'Canada and USA',
						openingHours: ['9am - 5pm on weekdays (EST/EDT)'],
						phoneNumbers: [
							{
								phoneNumber: '1-844-632-2010',
								suffix: '(toll free USA)',
							},
							{
								phoneNumber: '+1 917-900-4663',
								suffix: '(outside USA)',
							},
						],
					},
				];
		},
	},
]);
