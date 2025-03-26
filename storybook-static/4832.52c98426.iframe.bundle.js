'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[4832],
	{
		'./client/components/mma/shared/ProductDescriptionListTable.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				M: () => ProductDescriptionListTable,
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
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				ProductDescriptionListTable = (props) => {
					var tableValueCss = (isTwoColWidth) =>
							(0, _emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
								'display:inline-block;vertical-align:top;margin:0;width:',
								isTwoColWidth
									? '100%'
									: 'calc(40% + '.concat(
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
												.D[3],
											'px)',
									  ),
								';',
								_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
									.Dp.tablet,
								'{width:auto;}',
								'',
							),
						tableHeadingCss = (0,
						_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
							'width:100%;',
							_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.fy7,
							';margin:0;padding:',
							_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
								.D[3],
							'px ',
							_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
								.D[5],
							'px;background-color:',
							_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
								.palette.neutral[97],
							';',
							_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
								.C4.tablet,
							'{font-size:1.0625rem;line-height:1.6;padding:',
							_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
								.D[3],
							'px;}',
							'',
						),
						filteredContent = props.content.filter(
							(tableEntry) => !!tableEntry.value,
						),
						isOddNumberOfEntries = filteredContent.length % 2 == 1,
						showAlternativeTableRowBgColours =
							props.alternateRowBgColors &&
							filteredContent.reduce(
								(cellCount, item) =>
									cellCount + (item.spanTwoCols ? 2 : 1),
								0,
							) > 2,
						contentRowMap = new Map();
					return (
						filteredContent.map((_, tableEntryIndex) => {
							var previousContentRowMapEntry = contentRowMap.get(
								tableEntryIndex - 1,
							);
							if (previousContentRowMapEntry) {
								var previousTableEntry =
										filteredContent[tableEntryIndex - 1],
									contentRowMapEntryTwoBack =
										contentRowMap.get(tableEntryIndex - 2),
									currentRow =
										previousTableEntry.spanTwoCols ||
										(contentRowMapEntryTwoBack &&
											previousContentRowMapEntry.row ===
												contentRowMapEntryTwoBack.row)
											? previousContentRowMapEntry.row + 1
											: previousContentRowMapEntry.row;
								contentRowMap.set(tableEntryIndex, {
									row: currentRow,
									isFirstCollum:
										previousTableEntry.spanTwoCols ||
										previousContentRowMapEntry.row !==
											currentRow,
								});
							} else
								contentRowMap.set(tableEntryIndex, {
									row: tableEntryIndex,
									isFirstCollum: !0,
								});
						}),
						(0,
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.BX)(
							'div',
							{
								css: (0,
								_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
									_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.Kz0,
									';border:1px solid ',
									props.borderColour ||
										_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
											.palette.neutral[20],
									';display:flex;flex-wrap:wrap;margin:',
									_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
										.D[5],
									'px 0;',
									'',
								),
								children: [
									props.tableHeading &&
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.tZ)(
											'h2',
											{
												css: tableHeadingCss,
												children: props.tableHeading,
											},
										),
									filteredContent.map(
										(tableEntry, tableEntryIndex) => {
											var isTwoColWidth,
												isFirstTableRow =
													tableEntryIndex < 2,
												isLastTableRow =
													tableEntryIndex ===
														props.content.length -
															1 ||
													(props.content.length % 2 ==
														0 &&
														!tableEntry.spanTwoCols &&
														tableEntryIndex ===
															props.content
																.length -
																2),
												isLastEntry =
													tableEntryIndex ===
													filteredContent.length - 1,
												{
													row: currentRow,
													isFirstCollum,
												} =
													contentRowMap.get(
														tableEntryIndex,
													);
											return (0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.BX)(
												'dl',
												{
													css: (0,
													_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
														'display:',
														tableEntry.spanTwoCols
															? 'block'
															: 'inline-flex',
														';width:100%;padding:',
														isFirstCollum
															? _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
																	.D[3]
															: 0.5 *
																	_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
																		.D[3],
														'px ',
														_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
															.D[3],
														'px ',
														tableEntry.spanTwoCols ||
															!isFirstCollum
															? _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
																	.D[3]
															: 0.5 *
																	_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
																		.D[3],
														'px;margin:0;background-color:',
														showAlternativeTableRowBgColours &&
															currentRow % 2 ==
																(props.tableHeading
																	? 1
																	: 0)
															? _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
																	.palette
																	.neutral[97]
															: 'transparent',
														';border-bottom:',
														isLastTableRow ||
															isFirstCollum
															? 'none;'
															: '1px solid '.concat(
																	props.borderColour ||
																		_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
																			.palette
																			.neutral[20],
																	';',
															  ),
														' ',
														_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
															.Dp.tablet,
														'{border-bottom:',
														isLastTableRow
															? 'none'
															: '1px solid '.concat(
																	props.borderColour ||
																		_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
																			.palette
																			.neutral[20],
															  ),
														';width:',
														tableEntry.spanTwoCols ||
															(isLastEntry &&
																isOddNumberOfEntries)
															? '100%'
															: '50%',
														';padding:',
														isFirstTableRow ||
															showAlternativeTableRowBgColours
															? _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
																	.D[5]
															: 0.5 *
																	_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
																		.D[5],
														'px ',
														isLastEntry &&
															isOddNumberOfEntries &&
															!tableEntry.spanTwoCols
															? '50%'
															: ''.concat(
																	_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
																		.D[5],
																	'px',
															  ),
														' ',
														isLastTableRow ||
															showAlternativeTableRowBgColours
															? _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
																	.D[5]
															: 0.5 *
																	_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
																		.D[5],
														'px ',
														_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
															.D[5],
														'px;}',
														'',
													),
													children: [
														(0,
														_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.tZ)(
															'dt',
															{
																css:
																	((isTwoColWidth =
																		!!tableEntry.spanTwoCols),
																	(0,
																	_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
																		'display:inline-block;vertical-align:top;width:',
																		isTwoColWidth
																			? '100%'
																			: 'calc(60% - '.concat(
																					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
																						.D[3],
																					'px)',
																			  ),
																		';padding-right:',
																		_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
																			.D[3],
																		'px;margin:',
																		isTwoColWidth
																			? '0 0 '.concat(
																					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
																						.D[3],
																					'px',
																			  )
																			: '0',
																		';',
																		_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.Rcn,
																		';',
																		_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
																			.Dp
																			.tablet,
																		'{padding-right:',
																		_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
																			.D[5],
																		'px;width:16ch;margin:0;}',
																		'',
																	)),
																children:
																	tableEntry.title,
															},
														),
														(0,
														_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.tZ)(
															'dd',
															{
																css: tableValueCss(
																	!!tableEntry.spanTwoCols,
																),
																'data-qm-masking':
																	'blocklist',
																children:
																	tableEntry.value,
															},
														),
													],
												},
												tableEntryIndex,
											);
										},
									),
								],
							},
						)
					);
				};
			try {
				(ProductDescriptionListTable.displayName =
					'ProductDescriptionListTable'),
					(ProductDescriptionListTable.__docgenInfo = {
						description: '',
						displayName: 'ProductDescriptionListTable',
						props: {
							borderColour: {
								defaultValue: null,
								description: '',
								name: 'borderColour',
								required: !1,
								type: { name: 'string' },
							},
							tableHeading: {
								defaultValue: null,
								description: '',
								name: 'tableHeading',
								required: !1,
								type: { name: 'string' },
							},
							alternateRowBgColors: {
								defaultValue: null,
								description: '',
								name: 'alternateRowBgColors',
								required: !1,
								type: { name: 'true' },
							},
							seperateEachRow: {
								defaultValue: null,
								description: '',
								name: 'seperateEachRow',
								required: !1,
								type: { name: 'true' },
							},
							content: {
								defaultValue: null,
								description: '',
								name: 'content',
								required: !0,
								type: {
									name: 'ProductDescriptionListKeyValue[]',
								},
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/ProductDescriptionListTable.tsx#ProductDescriptionListTable'
						] = {
							docgenInfo:
								ProductDescriptionListTable.__docgenInfo,
							name: 'ProductDescriptionListTable',
							path: 'client/components/mma/shared/ProductDescriptionListTable.tsx#ProductDescriptionListTable',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
	},
]);
