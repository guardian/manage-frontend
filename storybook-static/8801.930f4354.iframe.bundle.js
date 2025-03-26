'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[8801],
	{
		'./client/components/mma/holiday/HolidayDateChooser.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				FD: () => HolidayDateChooser,
				kS: () => HolidayDateChooserStateContext,
				ZM: () => isSharedHolidayDateChooserState,
			});
			var emotion_react_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
				),
				space = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
				),
				typography = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
				),
				palette = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
				),
				mq = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
				),
				Button = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/button/Button.js',
				),
				InlineError = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/user-feedback/InlineError.js',
				),
				esm = __webpack_require__(
					'./node_modules/@sentry/minimal/esm/index.js',
				),
				lodash = __webpack_require__('./node_modules/lodash/lodash.js'),
				react = __webpack_require__('./node_modules/react/index.js'),
				react_router = __webpack_require__(
					'./node_modules/react-router/index.js',
				),
				react_router_dom = __webpack_require__(
					'./node_modules/react-router-dom/index.js',
				),
				dates = __webpack_require__('./shared/dates.ts'),
				productResponse = __webpack_require__(
					'./shared/productResponse.ts',
				),
				analytics = __webpack_require__(
					'./client/utilities/analytics.ts',
				),
				GenericErrorScreen = __webpack_require__(
					'./client/components/shared/GenericErrorScreen.tsx',
				),
				InfoIcon = __webpack_require__(
					'./client/components/mma/shared/assets/InfoIcon.tsx',
				),
				DatePicker = __webpack_require__(
					'./client/components/mma/shared/DatePicker.tsx',
				),
				ProgressIndicator = __webpack_require__(
					'./client/components/mma/shared/ProgressIndicator.tsx',
				),
				Modal = __webpack_require__(
					'./client/components/mma/holiday/Modal.tsx',
				),
				emotion_react_jsx_runtime_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				),
				HolidayAnniversaryDateExplainerModal = (props) =>
					(0, emotion_react_jsx_runtime_browser_esm.tZ)(Modal.u, {
						instigator: (0,
						emotion_react_jsx_runtime_browser_esm.tZ)('a', {
							css: (0, emotion_react_browser_esm.iv)(
								{
									textDecoration: 'underline',
									color: palette.palette.sport[400],
									cursor: 'pointer',
								},
								'',
								'',
							),
							children: 'What is this date?',
						}),
						title: 'What is this date?',
						children: (0, emotion_react_jsx_runtime_browser_esm.BX)(
							'p',
							{
								children: [
									props.dateElement,
									' is the anniversary of your subscription. The number of ',
									props.issueKeyword,
									's you can suspend per year is reset on this date.',
								],
							},
						),
					});
			try {
				(HolidayAnniversaryDateExplainerModal.displayName =
					'HolidayAnniversaryDateExplainerModal'),
					(HolidayAnniversaryDateExplainerModal.__docgenInfo = {
						description: '',
						displayName: 'HolidayAnniversaryDateExplainerModal',
						props: {
							dateElement: {
								defaultValue: null,
								description: '',
								name: 'dateElement',
								required: !0,
								type: { name: 'Element' },
							},
							issueKeyword: {
								defaultValue: null,
								description: '',
								name: 'issueKeyword',
								required: !0,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/holiday/HolidayAnniversaryDateExplainerModal.tsx#HolidayAnniversaryDateExplainerModal'
						] = {
							docgenInfo:
								HolidayAnniversaryDateExplainerModal.__docgenInfo,
							name: 'HolidayAnniversaryDateExplainerModal',
							path: 'client/components/mma/holiday/HolidayAnniversaryDateExplainerModal.tsx#HolidayAnniversaryDateExplainerModal',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var HolidayQuestionsModal = __webpack_require__(
					'./client/components/mma/holiday/HolidayQuestionsModal.tsx',
				),
				colour_palette = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__deprecated__/colour/palette.js',
				),
				Spinner = __webpack_require__(
					'./client/components/shared/Spinner.tsx',
				),
				HolidaySelectionInfo = (props) => {
					var _props$issuesImpacted,
						_props$issuesImpacted2,
						_props$issuesImpacted3,
						issuesRemainingThisYear = Math.max(
							0,
							props.annualIssueLimit -
								props.combinedIssuesImpactedPerYear
									.issuesThisYear.length -
								((null ===
									(_props$issuesImpacted =
										props.issuesImpactedPerYearBySelection) ||
								void 0 === _props$issuesImpacted
									? void 0
									: _props$issuesImpacted.issuesThisYear
											.length) || 0),
						),
						issuesRemainingNextYear = Math.max(
							0,
							props.annualIssueLimit -
								props.combinedIssuesImpactedPerYear
									.issuesNextYear.length -
								((null ===
									(_props$issuesImpacted2 =
										props.issuesImpactedPerYearBySelection) ||
								void 0 === _props$issuesImpacted2
									? void 0
									: _props$issuesImpacted2.issuesNextYear
											.length) || 0),
						);
					return props.validationErrorMessage
						? (0, emotion_react_jsx_runtime_browser_esm.tZ)('div', {
								css: (0, emotion_react_browser_esm.iv)(
									{
										color: colour_palette.vU[400],
										fontWeight: 'bold',
										marginTop: '10px',
									},
									'',
									'',
								),
								children: props.validationErrorMessage,
						  })
						: !props.selectedRange ||
						  props.issuesImpactedPerYearBySelection
						? (0, emotion_react_jsx_runtime_browser_esm.BX)(
								emotion_react_jsx_runtime_browser_esm.HY,
								{
									children: [
										(0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											'div',
											{
												css: (0,
												emotion_react_browser_esm.iv)(
													{
														marginTop: '10px',
														fontSize: '16px',
														[mq.C4.desktop]: {
															marginRight: '20px',
														},
													},
													'',
													'',
												),
												children: [
													'Suspending',
													' ',
													displayNumberOfIssuesAsText(
														props
															.publicationsImpacted
															.length,
														props.productType
															.holidayStops
															.issueKeyword,
													),
												],
											},
										),
										(0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											'div',
											{
												css: (0,
												emotion_react_browser_esm.iv)(
													{
														'@media(max-height: 600px)':
															{ display: 'none' },
														[mq.C4.desktop]: {
															marginTop: '10px',
														},
													},
													'',
													'',
												),
												children: [
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'hr',
														{
															css: (0,
															emotion_react_browser_esm.iv)(
																{
																	[mq.C4
																		.desktop]:
																		{
																			display:
																				'none',
																		},
																},
																'',
																'',
															),
														},
													),
													'Leaving you with',
													' ',
													displayNumberOfIssuesAsText(
														issuesRemainingThisYear,
														props.productType
															.holidayStops
															.issueKeyword,
													),
													' ',
													'available to suspend before',
													' ',
													anniversaryDateToElement(
														props.renewalDate,
													),
													!(
														null ===
															(_props$issuesImpacted3 =
																props.issuesImpactedPerYearBySelection) ||
														void 0 ===
															_props$issuesImpacted3 ||
														!_props$issuesImpacted3
															.issuesNextYear
															.length
													) &&
														(0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															emotion_react_jsx_runtime_browser_esm.HY,
															{
																children: [
																	' ',
																	'and',
																	' ',
																	displayNumberOfIssuesAsText(
																		issuesRemainingNextYear,
																		props
																			.productType
																			.holidayStops
																			.issueKeyword,
																	),
																	' ',
																	'available the following year',
																],
															},
														),
													' ',
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														HolidayAnniversaryDateExplainerModal,
														{
															dateElement:
																anniversaryDateToElement(
																	props.renewalDate,
																),
															issueKeyword:
																props
																	.productType
																	.holidayStops
																	.issueKeyword,
														},
													),
												],
											},
										),
									],
								},
						  )
						: (0, emotion_react_jsx_runtime_browser_esm.tZ)('div', {
								css: (0, emotion_react_browser_esm.iv)(
									{ [mq.C4.phablet]: { width: '100%' } },
									'',
									'',
								),
								children: (0,
								emotion_react_jsx_runtime_browser_esm.tZ)(
									Spinner.$,
									{},
								),
						  });
				},
				displayNumberOfIssuesAsText = (numberOfIssues, issueKeyword) =>
					(0, emotion_react_jsx_runtime_browser_esm.BX)('strong', {
						'data-cy': 'suspension-issue-count',
						children: [
							numberOfIssues,
							' ',
							issueKeyword,
							1 !== numberOfIssues ? 's' : '',
						],
					}),
				anniversaryDateToElement = (renewalDate) =>
					(0, emotion_react_jsx_runtime_browser_esm.BX)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: [
								(0, dates.ur)(renewalDate, dates.Bn),
								'*',
							],
						},
					);
			try {
				(HolidaySelectionInfo.displayName = 'HolidaySelectionInfo'),
					(HolidaySelectionInfo.__docgenInfo = {
						description: '',
						displayName: 'HolidaySelectionInfo',
						props: {
							productType: {
								defaultValue: null,
								description: '',
								name: 'productType',
								required: !0,
								type: {
									name: 'ProductTypeWithHolidayStopsFlow',
								},
							},
							renewalDate: {
								defaultValue: null,
								description: '',
								name: 'renewalDate',
								required: !0,
								type: { name: 'Date' },
							},
							combinedIssuesImpactedPerYear: {
								defaultValue: null,
								description: '',
								name: 'combinedIssuesImpactedPerYear',
								required: !0,
								type: { name: 'IssuesImpactedPerYear' },
							},
							annualIssueLimit: {
								defaultValue: null,
								description: '',
								name: 'annualIssueLimit',
								required: !0,
								type: { name: 'number' },
							},
							publicationsImpacted: {
								defaultValue: null,
								description: '',
								name: 'publicationsImpacted',
								required: !0,
								type: { name: 'HolidayStopDetail[]' },
							},
							issuesImpactedPerYearBySelection: {
								defaultValue: null,
								description: '',
								name: 'issuesImpactedPerYearBySelection',
								required: !1,
								type: { name: 'IssuesImpactedPerYear | null' },
							},
							validationErrorMessage: {
								defaultValue: null,
								description: '',
								name: 'validationErrorMessage',
								required: !1,
								type: { name: 'ReactNode' },
							},
							selectedRange: {
								defaultValue: null,
								description: '',
								name: 'selectedRange',
								required: !1,
								type: { name: 'DateRange' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/holiday/HolidaySelectionInfo.tsx#HolidaySelectionInfo'
						] = {
							docgenInfo: HolidaySelectionInfo.__docgenInfo,
							name: 'HolidaySelectionInfo',
							path: 'client/components/mma/holiday/HolidaySelectionInfo.tsx#HolidaySelectionInfo',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var HolidayStopApi = __webpack_require__(
					'./client/components/mma/holiday/HolidayStopApi.ts',
				),
				HolidayStopsContainer = __webpack_require__(
					'./client/components/mma/holiday/HolidayStopsContainer.tsx',
				);
			space.D[5], typography.Rcn, palette.palette.neutral[7];
			var buttonBarCss = {
					name: 'wfy4qg',
					styles: 'display:flex;align-items:center;margin-top:40px;flex-wrap:wrap',
				},
				oneAtATimeStyles = (0, emotion_react_browser_esm.iv)(
					typography.AjP,
					';margin-bottom:27px;',
					'',
				),
				fixedButtonFooterCss = (0, emotion_react_browser_esm.iv)(
					mq.C4.mobileLandscape,
					'{justify-content:space-between;}',
					mq.C4.phablet,
					'{position:fixed;z-index:998;bottom:0;left:0;right:0;background:',
					palette.palette.neutral[100],
					';padding:10px;box-shadow:0 0 5px ',
					palette.palette.neutral[60],
					';}',
					'',
				),
				extractMaybeLockedStartDate = (existingHolidayStopToAmend) =>
					existingHolidayStopToAmend &&
					existingHolidayStopToAmend.mutabilityFlags &&
					!existingHolidayStopToAmend.mutabilityFlags
						.isFullyMutable &&
					existingHolidayStopToAmend.mutabilityFlags.isEndDateEditable
						? existingHolidayStopToAmend.dateRange.start
						: null;
			function isSharedHolidayDateChooserState(state) {
				return (
					state.hasOwnProperty('selectedRange') &&
					state.hasOwnProperty('publicationsImpacted')
				);
			}
			var HolidayDateChooserStateContext = (0, react.createContext)({}),
				_ref = { name: '1f60if8', styles: 'justify-content:flex-end' },
				_ref2 = { name: '13ubd8d', styles: 'margin:10px' },
				HolidayDateChooser = (props) => {
					var {
							productDetail,
							productType,
							existingHolidayStopToAmend,
							selectedRange,
							setSelectedRange,
							publicationsImpacted,
							setPublicationsImpacted,
							holidayStopResponse,
						} = (0, react.useContext)(HolidayStopsContainer.q),
						[
							issuesImpactedPerYearBySelection,
							setIssuesImpactedPerYearBySelection,
						] = (0, react.useState)(null),
						[validationErrorMessage, setValidationErrorMessage] =
							(0, react.useState)(null),
						[showReviewWarning, setShowReviewWarning] = (0,
						react.useState)(!1),
						navigate = (0, react_router.s0)(),
						routerState = (0, react_router.TH)().state;
					(0, react.useEffect)(() => {
						if (
							(0, HolidayStopApi._B)(holidayStopResponse) &&
							existingHolidayStopToAmend
						) {
							var maybeLockedStartDate =
								extractMaybeLockedStartDate(
									existingHolidayStopToAmend,
								);
							setSelectedRange(
								existingHolidayStopToAmend.dateRange,
							),
								setValidationErrorMessage(
									'Please select your new '.concat(
										maybeLockedStartDate
											? 'end date (the start date is locked because it is within notice period) '
											: 'dates',
										'...',
									),
								);
						}
					}, [
						existingHolidayStopToAmend,
						holidayStopResponse,
						setSelectedRange,
					]);
					if ((0, HolidayStopApi._B)(holidayStopResponse)) {
						if ((0, productResponse.v_)(productDetail)) {
							var existingHolidayStopToAmendId =
									null == existingHolidayStopToAmend
										? void 0
										: existingHolidayStopToAmend.id,
								anniversaryDate = (0, dates.sG)(
									productDetail.subscription.anniversaryDate,
								).date,
								combinedIssuesImpactedPerYear = (0,
								HolidayStopApi.Uf)(
									holidayStopResponse.existing
										.filter(HolidayStopApi.DI)
										.filter(HolidayStopApi.E9)
										.filter(
											(_) =>
												_.id !==
												existingHolidayStopToAmendId,
										)
										.flatMap((_) => _.publicationsImpacted),
									anniversaryDate,
								),
								allIssuesImpactedPerYear = (0,
								HolidayStopApi.Uf)(
									holidayStopResponse.existing
										.filter(HolidayStopApi.DI)
										.filter(HolidayStopApi.E9)
										.flatMap((_) => _.publicationsImpacted),
									anniversaryDate,
								);
							return (0,
							emotion_react_jsx_runtime_browser_esm.BX)(
								emotion_react_jsx_runtime_browser_esm.HY,
								{
									children: [
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											ProgressIndicator.Y,
											{
												steps: [
													{
														title: 'Choose dates',
														isCurrentStep: !0,
													},
													{ title: 'Review' },
													{ title: 'Confirmation' },
												],
												additionalCSS: (0,
												emotion_react_browser_esm.iv)(
													'margin:',
													space.D[5],
													'px 0 ',
													space.D[12],
													'px;',
													'',
												),
											},
										),
										props.isAmendJourney &&
											!existingHolidayStopToAmend &&
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												react_router.Fg,
												{
													to: '..',
													state: routerState,
												},
											),
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'h1',
											{
												children:
													'Choose the dates you will be away',
											},
										),
										(0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											'p',
											{
												children: [
													'The first available date is',
													' ',
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'strong',
														{
															children: (0,
															dates.ur)(
																holidayStopResponse
																	.productSpecifics
																	.firstAvailableDate,
																'cccc d MMMM',
															),
														},
													),
													' ',
													'due to',
													' ',
													productType.holidayStops
														.alternateNoticeString
														? (0,
														  emotion_react_jsx_runtime_browser_esm.BX)(
																'strong',
																{
																	children: [
																		productType
																			.holidayStops
																			.alternateNoticeString,
																		' ',
																		'period',
																	],
																},
														  )
														: 'our printing and delivery schedule (notice period)',
													'.',
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'br',
														{},
													),
													(0,
													HolidayQuestionsModal.W)(
														productType.holidayStops
															.issueKeyword,
													),
												],
											},
										),
										(0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											'div',
											{
												css: oneAtATimeStyles,
												children: [
													(0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'div',
														{
															css: _ref2,
															children: [
																(0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	InfoIcon.s,
																	{},
																),
																'You can schedule one suspension at a time.',
															],
														},
													),
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'div',
														{
															css: (0,
															emotion_react_browser_esm.iv)(
																mq.Dp
																	.mobileLandscape,
																'{display:none;}',
																'',
															),
															children: (0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																HolidayQuestionsModal.q,
																{
																	annualIssueLimit:
																		holidayStopResponse.annualIssueLimit,
																	holidayStopFlowProperties:
																		productType.holidayStops,
																},
															),
														},
													),
												],
											},
										),
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											DatePicker.M,
											{
												firstAvailableDate:
													holidayStopResponse
														.productSpecifics
														.firstAvailableDate,
												issueDaysOfWeek:
													holidayStopResponse
														.productSpecifics
														.issueDaysOfWeek,
												issueKeyword: (0,
												lodash.startCase)(
													productType.holidayStops
														.issueKeyword,
												),
												existingDates:
													holidayStopResponse.existing
														.filter(
															HolidayStopApi.DI,
														)
														.filter(
															(
																holidayStopRequest,
															) =>
																holidayStopRequest.id !==
																existingHolidayStopToAmendId,
														)
														.map(
															(hsr) =>
																hsr.dateRange,
														),
												amendableDateRange:
													null ==
													existingHolidayStopToAmend
														? void 0
														: existingHolidayStopToAmend.dateRange,
												selectedRange,
												maybeLockedStartDate:
													extractMaybeLockedStartDate(
														existingHolidayStopToAmend,
													),
												selectionInfo: (0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													HolidaySelectionInfo,
													{
														productType,
														renewalDate:
															anniversaryDate,
														combinedIssuesImpactedPerYear,
														annualIssueLimit:
															holidayStopResponse.annualIssueLimit,
														publicationsImpacted,
														issuesImpactedPerYearBySelection,
														validationErrorMessage,
														selectedRange,
													},
												),
												onChange: (
													(
														renewalDate,
														subscriptionName,
														combinedIssuesImpactedPerYear,
														allIssuesImpactedPerYear,
														annualIssueLimit,
														isTestUser,
													) =>
													(_ref3) => {
														var {
																startDate,
																endDate,
															} = _ref3,
															newSelectedRange =
																(0, dates.fZ)(
																	startDate,
																	endDate,
																);
														setSelectedRange(
															newSelectedRange,
														),
															setIssuesImpactedPerYearBySelection(
																null,
															),
															setValidationErrorMessage(
																null,
															),
															(0,
															HolidayStopApi.OX)(
																subscriptionName,
																startDate,
																endDate,
																isTestUser,
															)()
																.then(
																	(
																		response,
																	) => {
																		var locationHeader =
																			response.headers.get(
																				'Location',
																			);
																		return 401 ===
																			response.status &&
																			locationHeader &&
																			void 0 !==
																				window
																			? (window.location.replace(
																					locationHeader,
																			  ),
																			  Promise.resolve(
																					[],
																			  ))
																			: response.ok
																			? response.json()
																			: Promise.reject(
																					new Error(
																						''.concat(
																							response.status,
																							' from holiday-stop-api',
																						),
																					),
																			  );
																	},
																)
																.then(
																	(_ref4) => {
																		var {
																				potentials,
																			} =
																				_ref4,
																			updatePublicationsImpacted =
																				potentials.map(
																					HolidayStopApi.HC,
																				),
																			updateIssuesImpactedPerYearBySelection =
																				(0,
																				HolidayStopApi.Uf)(
																					updatePublicationsImpacted,
																					renewalDate,
																				),
																			issuesRemainingThisYear =
																				Math.max(
																					annualIssueLimit,
																					allIssuesImpactedPerYear
																						.issuesThisYear
																						.length,
																				) -
																				combinedIssuesImpactedPerYear
																					.issuesThisYear
																					.length,
																			issuesRemainingNextYear =
																				Math.max(
																					annualIssueLimit,
																					allIssuesImpactedPerYear
																						.issuesNextYear
																						.length,
																				) -
																				combinedIssuesImpactedPerYear
																					.issuesNextYear
																					.length;
																		setPublicationsImpacted(
																			updatePublicationsImpacted,
																		),
																			setIssuesImpactedPerYearBySelection(
																				updateIssuesImpactedPerYearBySelection,
																			);
																		var newValidationErrorMessage =
																			((
																				renewalDate,
																				annualIssueLimit,
																				numPotentialIssuesThisYear,
																				issuesRemainingThisYear,
																				numPotentialIssuesNextYear,
																				issuesRemainingNextYear,
																				issueKeyword,
																			) => {
																				var dateElement =
																					(0,
																					emotion_react_jsx_runtime_browser_esm.BX)(
																						emotion_react_jsx_runtime_browser_esm.HY,
																						{
																							children:
																								[
																									(0,
																									dates.ur)(
																										renewalDate,
																										dates.Bn,
																									),
																									'*',
																								],
																						},
																					);
																				return numPotentialIssuesThisYear >
																					issuesRemainingThisYear
																					? (0,
																					  emotion_react_jsx_runtime_browser_esm.BX)(
																							emotion_react_jsx_runtime_browser_esm.HY,
																							{
																								children:
																									[
																										'Exceeded ',
																										issueKeyword,
																										' limit of ',
																										annualIssueLimit,
																										' before',
																										' ',
																										dateElement,
																										' ',
																										(0,
																										emotion_react_jsx_runtime_browser_esm.tZ)(
																											HolidayAnniversaryDateExplainerModal,
																											{
																												dateElement,
																												issueKeyword,
																											},
																										),
																										(0,
																										emotion_react_jsx_runtime_browser_esm.tZ)(
																											'br',
																											{},
																										),
																										'Please choose fewer/different days...',
																									],
																							},
																					  )
																					: numPotentialIssuesNextYear >
																					  issuesRemainingNextYear
																					? (0,
																					  emotion_react_jsx_runtime_browser_esm.BX)(
																							emotion_react_jsx_runtime_browser_esm.HY,
																							{
																								children:
																									[
																										'Exceeded ',
																										issueKeyword,
																										' limit of ',
																										annualIssueLimit,
																										' between',
																										' ',
																										dateElement,
																										' and',
																										' ',
																										(0,
																										dates.ur)(
																											(0,
																											dates.CF)(
																												renewalDate,
																												1,
																											),
																											dates.Bn,
																										),
																										'* ',
																										(0,
																										emotion_react_jsx_runtime_browser_esm.tZ)(
																											HolidayAnniversaryDateExplainerModal,
																											{
																												dateElement,
																												issueKeyword,
																											},
																										),
																										(0,
																										emotion_react_jsx_runtime_browser_esm.tZ)(
																											'br',
																											{},
																										),
																										'Please choose fewer/different days...',
																									],
																							},
																					  )
																					: numPotentialIssuesThisYear <
																							1 &&
																					  numPotentialIssuesNextYear <
																							1
																					? 'No '.concat(
																							issueKeyword,
																							's occur during selected period',
																					  )
																					: null;
																			})(
																				renewalDate,
																				annualIssueLimit,
																				updateIssuesImpactedPerYearBySelection
																					.issuesThisYear
																					.length,
																				issuesRemainingThisYear,
																				updateIssuesImpactedPerYearBySelection
																					.issuesNextYear
																					.length,
																				issuesRemainingNextYear,
																				productType
																					.holidayStops
																					.issueKeyword,
																			);
																		setValidationErrorMessage(
																			newValidationErrorMessage,
																		),
																			showReviewWarning &&
																				setShowReviewWarning(
																					!!newValidationErrorMessage ||
																						!newSelectedRange ||
																						!updateIssuesImpactedPerYearBySelection,
																				);
																	},
																)
																.catch(
																	(error) => {
																		setValidationErrorMessage(
																			'Failed to calculate '.concat(
																				productType
																					.holidayStops
																					.issueKeyword,
																				's impacted by selected dates. Please try again later...',
																			),
																		),
																			(0,
																			analytics.L9)(
																				{
																					eventCategory:
																						'holidayDateChooser',
																					eventAction:
																						'error',
																					eventLabel:
																						error
																							? error.toString()
																							: void 0,
																				},
																			),
																			esm.Tb(
																				error,
																			);
																	},
																);
													}
												)(
													anniversaryDate,
													productDetail.subscription
														.subscriptionId,
													combinedIssuesImpactedPerYear,
													allIssuesImpactedPerYear,
													holidayStopResponse.annualIssueLimit,
													productDetail.isTestUser,
												),
												dateToAsterisk: anniversaryDate,
											},
										),
										(0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											'div',
											{
												css: [
													buttonBarCss,
													_ref,
													fixedButtonFooterCss,
													'',
													'',
												],
												children: [
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'div',
														{
															css: (0,
															emotion_react_browser_esm.iv)(
																'margin-right:30px;',
																mq.C4
																	.mobileLandscape,
																'{display:none;}',
																'',
															),
															children: (0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																HolidayQuestionsModal.q,
																{
																	annualIssueLimit:
																		holidayStopResponse.annualIssueLimit,
																	holidayStopFlowProperties:
																		productType.holidayStops,
																},
															),
														},
													),
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														react_router_dom.rU,
														{
															css: (0,
															emotion_react_browser_esm.iv)(
																'margin-right:',
																space.D[5],
																'px;',
																typography.Rcn,
																';textdecoration:underline;color:',
																palette.palette
																	.neutral[20],
																';',
																'',
															),
															to: '..',
															state: routerState,
															children: 'Cancel',
														},
													),
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														'div',
														{
															children: (0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																Button.z,
																{
																	onClick:
																		() => {
																			!validationErrorMessage &&
																			selectedRange &&
																			issuesImpactedPerYearBySelection
																				? navigate(
																						'../review',
																						{
																							state: routerState,
																						},
																				  )
																				: setShowReviewWarning(
																						!0,
																				  );
																		},
																	children:
																		'Review details',
																},
															),
														},
													),
												],
											},
										),
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'div',
											{
												css: (0,
												emotion_react_browser_esm.iv)(
													'margin-top:',
													space.D[5],
													'px;display:flex;justify-content:flex-end;',
													'',
												),
												children:
													showReviewWarning &&
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														InlineError.b,
														{
															children:
																'Your request is incomplete. Please ensure your chosen dates are valid and that your remaining holiday balance has been calculated before trying again.',
														},
													),
											},
										),
									],
								},
							);
						}
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							react_router.Fg,
							{ to: '..', state: routerState },
						);
					}
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						GenericErrorScreen.c,
						{ loggingMessage: 'No holiday stop response' },
					);
				};
			try {
				(isSharedHolidayDateChooserState.displayName =
					'isSharedHolidayDateChooserState'),
					(isSharedHolidayDateChooserState.__docgenInfo = {
						description: '',
						displayName: 'isSharedHolidayDateChooserState',
						props: {
							selectedRange: {
								defaultValue: null,
								description: '',
								name: 'selectedRange',
								required: !0,
								type: { name: 'DateRange' },
							},
							publicationsImpacted: {
								defaultValue: null,
								description: '',
								name: 'publicationsImpacted',
								required: !0,
								type: { name: 'HolidayStopDetail[]' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/holiday/HolidayDateChooser.tsx#isSharedHolidayDateChooserState'
						] = {
							docgenInfo:
								isSharedHolidayDateChooserState.__docgenInfo,
							name: 'isSharedHolidayDateChooserState',
							path: 'client/components/mma/holiday/HolidayDateChooser.tsx#isSharedHolidayDateChooserState',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(HolidayDateChooser.displayName = 'HolidayDateChooser'),
					(HolidayDateChooser.__docgenInfo = {
						description: '',
						displayName: 'HolidayDateChooser',
						props: {
							isAmendJourney: {
								defaultValue: null,
								description: '',
								name: 'isAmendJourney',
								required: !1,
								type: { name: 'true' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/holiday/HolidayDateChooser.tsx#HolidayDateChooser'
						] = {
							docgenInfo: HolidayDateChooser.__docgenInfo,
							name: 'HolidayDateChooser',
							path: 'client/components/mma/holiday/HolidayDateChooser.tsx#HolidayDateChooser',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/holiday/HolidayQuestionsModal.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				W: () => creditExplainerSentence,
				q: () => HolidayQuestionsModal,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_5__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
					),
				_shared_CallCentreNumbers__WEBPACK_IMPORTED_MODULE_6__ =
					__webpack_require__(
						'./client/components/shared/CallCentreNumbers.tsx',
					),
				_shared_assets_InfoIcon__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./client/components/mma/shared/assets/InfoIcon.tsx',
					),
				_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
					'./client/components/mma/holiday/Modal.tsx',
				),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				creditExplainerSentence = (issueKeyword) =>
					'You will be credited for each suspended '
						.concat(issueKeyword, ' on your next bill after the ')
						.concat(issueKeyword, ' date.'),
				HolidayQuestionsModal = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.BX)(
						_Modal__WEBPACK_IMPORTED_MODULE_1__.u,
						{
							title: 'We are here to help',
							instigator: (0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.BX)(
								'a',
								{
									css: (0,
									_emotion_react__WEBPACK_IMPORTED_MODULE_3__.iv)(
										'cursor:pointer;',
										_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__.AjP,
										';textdecoration:underline;margin:10px;',
										'',
									),
									children: [
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
											_shared_assets_InfoIcon__WEBPACK_IMPORTED_MODULE_0__.s,
											{},
										),
										'Questions? Check here',
									],
								},
							),
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
									'h3',
									{ children: 'Things to remember' },
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.BX)(
									'ul',
									{
										children: [
											(0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.BX)(
												'li',
												{
													children: [
														'You can suspend up to ',
														props.annualIssueLimit,
														' ',
														props
															.holidayStopFlowProperties
															.issueKeyword,
														's in one year.',
													],
												},
											),
											(0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
												'li',
												{
													children:
														'A new suspension cannot begin from today as there is a notice period.',
												},
											),
											props.holidayStopFlowProperties
												.alternateNoticeString
												? (0,
												  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.BX)(
														'li',
														{
															children: [
																'Please provide',
																' ',
																(0,
																_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
																	'strong',
																	{
																		children:
																			props
																				.holidayStopFlowProperties
																				.alternateNoticeString,
																	},
																),
																'.',
															],
														},
												  )
												: (0,
												  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
														'li',
														{
															children:
																'Notice period is for our printing and delivery schedule.',
														},
												  ),
											(0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
												'li',
												{
													children:
														creditExplainerSentence(
															props
																.holidayStopFlowProperties
																.issueKeyword,
														),
												},
											),
										],
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
									'h3',
									{
										children:
											'You will need to contact us by phone or email if you...',
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.BX)(
									'ul',
									{
										children: [
											!props.holidayStopFlowProperties
												.hideDeliveryRedirectionHelpBullet &&
												(0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
													'li',
													{
														children:
															'You want to have your delivery redirected to a temporary address within the same country.',
													},
												),
											(0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.BX)(
												'li',
												{
													children: [
														'You want to suspend more than ',
														props.annualIssueLimit,
														' ',
														props
															.holidayStopFlowProperties
															.issueKeyword,
														's in one year.',
													],
												},
											),
										],
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
									'h3',
									{ children: 'How to contact us' },
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
									'div',
									{
										css: (0,
										_emotion_react__WEBPACK_IMPORTED_MODULE_3__.iv)(
											'margin-left:',
											_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_5__
												.D[5],
											'px;',
											'',
										),
										children: (0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
											_shared_CallCentreNumbers__WEBPACK_IMPORTED_MODULE_6__.H,
											{},
										),
									},
								),
							],
						},
					);
			try {
				(creditExplainerSentence.displayName =
					'creditExplainerSentence'),
					(creditExplainerSentence.__docgenInfo = {
						description: '',
						displayName: 'creditExplainerSentence',
						props: {},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/holiday/HolidayQuestionsModal.tsx#creditExplainerSentence'
						] = {
							docgenInfo: creditExplainerSentence.__docgenInfo,
							name: 'creditExplainerSentence',
							path: 'client/components/mma/holiday/HolidayQuestionsModal.tsx#creditExplainerSentence',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(HolidayQuestionsModal.displayName = 'HolidayQuestionsModal'),
					(HolidayQuestionsModal.__docgenInfo = {
						description: '',
						displayName: 'HolidayQuestionsModal',
						props: {
							annualIssueLimit: {
								defaultValue: null,
								description: '',
								name: 'annualIssueLimit',
								required: !0,
								type: { name: 'number' },
							},
							holidayStopFlowProperties: {
								defaultValue: null,
								description: '',
								name: 'holidayStopFlowProperties',
								required: !0,
								type: { name: 'HolidayStopFlowProperties' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/holiday/HolidayQuestionsModal.tsx#HolidayQuestionsModal'
						] = {
							docgenInfo: HolidayQuestionsModal.__docgenInfo,
							name: 'HolidayQuestionsModal',
							path: 'client/components/mma/holiday/HolidayQuestionsModal.tsx#HolidayQuestionsModal',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/holiday/HolidayStopApi.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				DI: () => isNotWithdrawn,
				E9: () => isNotBulkSuspension,
				En: () => PotentialHolidayStopsAsyncLoader,
				HC: () => convertRawPotentialHolidayStopDetail,
				M6: () => embellishExistingHolidayStops,
				OX: () => getPotentialHolidayStopsFetcher,
				Uf: () => calculateIssuesImpactedPerYear,
				_B: () => isHolidayStopsResponse,
			});
			var _shared_dates__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__('./shared/dates.ts'),
				_shared_productResponse__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__('./shared/productResponse.ts'),
				_shared_AsyncLoader__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./client/components/mma/shared/AsyncLoader.tsx',
					);
			function asyncGeneratorStep(
				gen,
				resolve,
				reject,
				_next,
				_throw,
				key,
				arg,
			) {
				try {
					var info = gen[key](arg),
						value = info.value;
				} catch (error) {
					return void reject(error);
				}
				info.done
					? resolve(value)
					: Promise.resolve(value).then(_next, _throw);
			}
			function ownKeys(e, r) {
				var t = Object.keys(e);
				if (Object.getOwnPropertySymbols) {
					var o = Object.getOwnPropertySymbols(e);
					r &&
						(o = o.filter(function (r) {
							return Object.getOwnPropertyDescriptor(
								e,
								r,
							).enumerable;
						})),
						t.push.apply(t, o);
				}
				return t;
			}
			function _objectSpread(e) {
				for (var r = 1; r < arguments.length; r++) {
					var t = null != arguments[r] ? arguments[r] : {};
					r % 2
						? ownKeys(Object(t), !0).forEach(function (r) {
								_defineProperty(e, r, t[r]);
						  })
						: Object.getOwnPropertyDescriptors
						? Object.defineProperties(
								e,
								Object.getOwnPropertyDescriptors(t),
						  )
						: ownKeys(Object(t)).forEach(function (r) {
								Object.defineProperty(
									e,
									r,
									Object.getOwnPropertyDescriptor(t, r),
								);
						  });
				}
				return e;
			}
			function _defineProperty(obj, key, value) {
				return (
					(key = (function _toPropertyKey(arg) {
						var key = (function _toPrimitive(input, hint) {
							if ('object' != typeof input || null === input)
								return input;
							var prim = input[Symbol.toPrimitive];
							if (void 0 !== prim) {
								var res = prim.call(input, hint || 'default');
								if ('object' != typeof res) return res;
								throw new TypeError(
									'@@toPrimitive must return a primitive value.',
								);
							}
							return ('string' === hint ? String : Number)(input);
						})(arg, 'string');
						return 'symbol' == typeof key ? key : String(key);
					})(key)) in obj
						? Object.defineProperty(obj, key, {
								value,
								enumerable: !0,
								configurable: !0,
								writable: !0,
						  })
						: (obj[key] = value),
					obj
				);
			}
			var convertRawPotentialHolidayStopDetail = (raw) => ({
				estimatedPrice: raw.credit,
				invoiceDate: raw.invoiceDate
					? (0, _shared_dates__WEBPACK_IMPORTED_MODULE_0__.sG)(
							raw.invoiceDate,
					  )
					: void 0,
				publicationDate: (0,
				_shared_dates__WEBPACK_IMPORTED_MODULE_0__.sG)(
					raw.publicationDate,
				),
			});
			class PotentialHolidayStopsAsyncLoader extends _shared_AsyncLoader__WEBPACK_IMPORTED_MODULE_2__.y {}
			var getPotentialHolidayStopsFetcher =
				(subscriptionName, startDate, endDate, isTestUser) => () =>
					fetch(
						'/api/holidays/'
							.concat(subscriptionName, '/potential?startDate=')
							.concat(
								(0,
								_shared_dates__WEBPACK_IMPORTED_MODULE_0__.ur)(
									startDate,
									_shared_dates__WEBPACK_IMPORTED_MODULE_0__.U5,
								),
								'&endDate=',
							)
							.concat(
								(0,
								_shared_dates__WEBPACK_IMPORTED_MODULE_0__.ur)(
									endDate,
									_shared_dates__WEBPACK_IMPORTED_MODULE_0__.U5,
								),
							),
						{
							headers: {
								[_shared_productResponse__WEBPACK_IMPORTED_MODULE_1__.l2]:
									''.concat(isTestUser),
							},
						},
					);
			function isHolidayStopsResponse(data) {
				return !!data && data.hasOwnProperty('existing');
			}
			var isNotWithdrawn = (holidayStopRequest) =>
					!holidayStopRequest.withdrawnDate,
				isNotBulkSuspension = (holidayStopRequest) =>
					!holidayStopRequest.bulkSuspensionReason,
				embellishRawHolidayStop = (rawHolidayStopRequest) =>
					_objectSpread(
						_objectSpread({}, rawHolidayStopRequest),
						{},
						{
							withdrawnDate: rawHolidayStopRequest.withdrawnTime
								? (0,
								  _shared_dates__WEBPACK_IMPORTED_MODULE_0__.sG)(
										rawHolidayStopRequest.withdrawnTime,
										"yyyy-MM-dd'T'kk:mm:ss.SSS'Z'",
								  )
								: void 0,
							dateRange: (0,
							_shared_dates__WEBPACK_IMPORTED_MODULE_0__.fZ)(
								rawHolidayStopRequest.startDate,
								rawHolidayStopRequest.endDate,
							),
							publicationsImpacted:
								rawHolidayStopRequest.publicationsImpacted.map(
									(raw) =>
										_objectSpread(
											_objectSpread({}, raw),
											{},
											{
												publicationDate: (0,
												_shared_dates__WEBPACK_IMPORTED_MODULE_0__.sG)(
													raw.publicationDate,
												),
												invoiceDate: raw.invoiceDate
													? (0,
													  _shared_dates__WEBPACK_IMPORTED_MODULE_0__.sG)(
															raw.invoiceDate,
													  )
													: void 0,
											},
										),
								),
						},
					),
				embellishExistingHolidayStops = (function () {
					var _ref = (function _asyncToGenerator(fn) {
						return function () {
							var self = this,
								args = arguments;
							return new Promise(function (resolve, reject) {
								var gen = fn.apply(self, args);
								function _next(value) {
									asyncGeneratorStep(
										gen,
										resolve,
										reject,
										_next,
										_throw,
										'next',
										value,
									);
								}
								function _throw(err) {
									asyncGeneratorStep(
										gen,
										resolve,
										reject,
										_next,
										_throw,
										'throw',
										err,
									);
								}
								_next(void 0);
							});
						};
					})(function* (response) {
						var raw = yield response.json();
						return _objectSpread(
							_objectSpread({}, raw),
							{},
							{
								productSpecifics: {
									firstAvailableDate: (0,
									_shared_dates__WEBPACK_IMPORTED_MODULE_0__.ym)(
										raw.issueSpecifics.map(
											(_) =>
												(0,
												_shared_dates__WEBPACK_IMPORTED_MODULE_0__.sG)(
													_.firstAvailableDate,
												).date,
										),
									),
									issueDaysOfWeek: raw.issueSpecifics.map(
										(_) => _.issueDayOfWeek,
									),
								},
								existing: raw.existing
									.map(embellishRawHolidayStop)
									.sort(
										(a, b) =>
											a.dateRange.start.valueOf() -
											b.dateRange.start.valueOf(),
									),
							},
						);
					});
					return function embellishExistingHolidayStops(_x) {
						return _ref.apply(this, arguments);
					};
				})(),
				calculateIssuesImpactedPerYear = (
					publicationsImpacted,
					anniversaryDate,
				) => ({
					issuesThisYear: publicationsImpacted.filter(
						(issue) =>
							issue.publicationDate.isBefore(anniversaryDate) &&
							issue.publicationDate.isSameOrAfter(
								(0,
								_shared_dates__WEBPACK_IMPORTED_MODULE_0__.CF)(
									anniversaryDate,
									-1,
								),
							),
					),
					issuesNextYear: publicationsImpacted.filter(
						(issue) =>
							issue.publicationDate.isSameOrAfter(
								anniversaryDate,
							) &&
							issue.publicationDate.isBefore(
								(0,
								_shared_dates__WEBPACK_IMPORTED_MODULE_0__.CF)(
									anniversaryDate,
									1,
								),
							),
					),
				});
		},
		'./client/components/mma/holiday/HolidayStopsContainer.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				u: () => HolidayStopsContainer,
				q: () => HolidayStopsContext,
			});
			var react = __webpack_require__('./node_modules/react/index.js'),
				react_router = __webpack_require__(
					'./node_modules/react-router/index.js',
				),
				productResponse = __webpack_require__(
					'./shared/productResponse.ts',
				),
				productUtils = __webpack_require__(
					'./client/utilities/productUtils.ts',
				),
				GenericErrorScreen = __webpack_require__(
					'./client/components/shared/GenericErrorScreen.tsx',
				),
				NavConfig = __webpack_require__(
					'./client/components/shared/nav/NavConfig.tsx',
				),
				Page = __webpack_require__('./client/components/mma/Page.tsx'),
				useAsyncLoader = __webpack_require__(
					'./client/utilities/hooks/useAsyncLoader.ts',
				),
				DefaultApiResponseHandler = __webpack_require__(
					'./client/components/mma/shared/asyncComponents/DefaultApiResponseHandler.tsx',
				),
				DefaultLoadingView = __webpack_require__(
					'./client/components/mma/shared/asyncComponents/DefaultLoadingView.tsx',
				),
				HolidayStopApi = __webpack_require__(
					'./client/components/mma/holiday/HolidayStopApi.ts',
				),
				emotion_react_jsx_runtime_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				),
				HolidayStopsResponseHandler = (response) =>
					(0, DefaultApiResponseHandler.Zo)(
						response,
						HolidayStopApi.M6,
					),
				HolidayStopsPage = (_ref) => {
					var {
							productType,
							productDetail,
							existingHolidayStopToAmend,
							setExistingHolidayStopToAmend,
							selectedRange,
							setSelectedRange,
							publicationsImpacted,
							setPublicationsImpacted,
							setShouldReload,
						} = _ref,
						{ data: holidayStopResponse, loadingState } = (0,
						useAsyncLoader.c)(
							() =>
								fetch(
									'/api/holidays/'.concat(
										productDetail.subscription
											.subscriptionId,
									),
									{
										headers: {
											[productResponse.l2]: ''.concat(
												productDetail.isTestUser,
											),
										},
									},
								),
							HolidayStopsResponseHandler,
						);
					return loadingState == useAsyncLoader.G.HasError
						? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
								GenericErrorScreen.c,
								{},
						  )
						: loadingState == useAsyncLoader.G.IsLoading
						? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
								DefaultLoadingView.I,
								{},
						  )
						: null === holidayStopResponse
						? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
								GenericErrorScreen.c,
								{},
						  )
						: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
								HolidayStopsContext.Provider,
								{
									value: {
										productType,
										productDetail,
										existingHolidayStopToAmend,
										setExistingHolidayStopToAmend,
										selectedRange,
										setSelectedRange,
										publicationsImpacted,
										setPublicationsImpacted,
										holidayStopResponse,
										setShouldReload,
									},
									children: (0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										react_router.j3,
										{},
									),
								},
						  );
				};
			try {
				(HolidayStopsPage.displayName = 'HolidayStopsPage'),
					(HolidayStopsPage.__docgenInfo = {
						description: '',
						displayName: 'HolidayStopsPage',
						props: {
							productDetail: {
								defaultValue: null,
								description: '',
								name: 'productDetail',
								required: !0,
								type: { name: 'ProductDetail' },
							},
							productType: {
								defaultValue: null,
								description: '',
								name: 'productType',
								required: !0,
								type: {
									name: 'ProductTypeWithHolidayStopsFlow',
								},
							},
							existingHolidayStopToAmend: {
								defaultValue: null,
								description: '',
								name: 'existingHolidayStopToAmend',
								required: !0,
								type: { name: 'HolidayStopRequest | null' },
							},
							setExistingHolidayStopToAmend: {
								defaultValue: null,
								description: '',
								name: 'setExistingHolidayStopToAmend',
								required: !0,
								type: {
									name: 'Dispatch<SetStateAction<HolidayStopRequest | null>>',
								},
							},
							selectedRange: {
								defaultValue: null,
								description: '',
								name: 'selectedRange',
								required: !0,
								type: { name: 'DateRange | undefined' },
							},
							setSelectedRange: {
								defaultValue: null,
								description: '',
								name: 'setSelectedRange',
								required: !0,
								type: {
									name: 'Dispatch<SetStateAction<DateRange | undefined>>',
								},
							},
							publicationsImpacted: {
								defaultValue: null,
								description: '',
								name: 'publicationsImpacted',
								required: !0,
								type: { name: 'HolidayStopDetail[]' },
							},
							setPublicationsImpacted: {
								defaultValue: null,
								description: '',
								name: 'setPublicationsImpacted',
								required: !0,
								type: {
									name: 'Dispatch<SetStateAction<HolidayStopDetail[]>>',
								},
							},
							setShouldReload: {
								defaultValue: null,
								description: '',
								name: 'setShouldReload',
								required: !0,
								type: {
									name: 'Dispatch<SetStateAction<boolean>>',
								},
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/holiday/HolidayStopsPage.tsx#HolidayStopsPage'
						] = {
							docgenInfo: HolidayStopsPage.__docgenInfo,
							name: 'HolidayStopsPage',
							path: 'client/components/mma/holiday/HolidayStopsPage.tsx#HolidayStopsPage',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var HolidayStopsContext = (0, react.createContext)({}),
				handleMembersDataResponse =
					(
						productType,
						existingHolidayStopToAmend,
						setExistingHolidayStopToAmend,
						selectedRange,
						setSelectedRange,
						publicationsImpacted,
						setPublicationsImpacted,
						setShouldReload,
					) =>
					(mdapiResponse) => {
						var filteredProductDetails =
							mdapiResponse.products.filter(productResponse.v_);
						if (1 === filteredProductDetails.length) {
							var productDetail = filteredProductDetails[0];
							return productDetail.subscription.start
								? (0, emotion_react_jsx_runtime_browser_esm.tZ)(
										HolidayStopsPage,
										{
											productDetail,
											productType,
											existingHolidayStopToAmend,
											setExistingHolidayStopToAmend,
											selectedRange,
											setSelectedRange,
											publicationsImpacted,
											setPublicationsImpacted,
											setShouldReload,
										},
								  )
								: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
										GenericErrorScreen.c,
										{
											loggingMessage:
												'Subscription had no start date',
										},
								  );
						}
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							react_router.Fg,
							{ to: '/' },
						);
					},
				HolidayStopsContainer = (props) => {
					var location = (0, react_router.TH)(),
						navigate = (0, react_router.s0)(),
						routerState = location.state,
						productDetail =
							null == routerState
								? void 0
								: routerState.productDetail,
						[
							existingHolidayStopToAmend,
							setExistingHolidayStopToAmend,
						] = (0, react.useState)(null),
						[selectedRange, setSelectedRange] = (0, react.useState)(
							void 0,
						),
						[publicationsImpacted, setPublicationsImpacted] = (0,
						react.useState)([]),
						[shouldReload, setShouldReload] = (0, react.useState)(
							!1,
						);
					return (
						shouldReload && navigate(0),
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(Page._, {
							selectedNavItem: NavConfig.qy.accountOverview,
							pageTitle: 'Manage suspensions',
							children: productDetail
								? productDetail.subscription.start
									? (0,
									  emotion_react_jsx_runtime_browser_esm.tZ)(
											HolidayStopsPage,
											{
												productDetail,
												productType: props.productType,
												existingHolidayStopToAmend,
												setExistingHolidayStopToAmend,
												selectedRange,
												setSelectedRange,
												publicationsImpacted,
												setPublicationsImpacted,
												setShouldReload,
											},
									  )
									: (0,
									  emotion_react_jsx_runtime_browser_esm.tZ)(
											GenericErrorScreen.c,
											{
												loggingMessage:
													'Subscription had no start date',
											},
									  )
								: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
										productResponse.wH,
										{
											fetch: (0, productUtils.w)(
												props.productType
													.allProductsProductTypeFilterString,
											),
											render: handleMembersDataResponse(
												props.productType,
												existingHolidayStopToAmend,
												setExistingHolidayStopToAmend,
												selectedRange,
												setSelectedRange,
												publicationsImpacted,
												setPublicationsImpacted,
												setShouldReload,
											),
											loadingMessage:
												'Retrieving details of your '.concat(
													props.productType
														.friendlyName,
													'...',
												),
										},
								  ),
						})
					);
				};
			try {
				(HolidayStopsContainer.displayName = 'HolidayStopsContainer'),
					(HolidayStopsContainer.__docgenInfo = {
						description: '',
						displayName: 'HolidayStopsContainer',
						props: {
							productType: {
								defaultValue: null,
								description: '',
								name: 'productType',
								required: !0,
								type: {
									name: 'ProductTypeWithHolidayStopsFlow',
								},
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/holiday/HolidayStopsContainer.tsx#HolidayStopsContainer'
						] = {
							docgenInfo: HolidayStopsContainer.__docgenInfo,
							name: 'HolidayStopsContainer',
							path: 'client/components/mma/holiday/HolidayStopsContainer.tsx#HolidayStopsContainer',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/holiday/Modal.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { u: () => Modal });
			var _emotion_react__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/button/Button.js',
					),
				react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./node_modules/react/index.js',
				),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			var _ref = { name: '1r5gb7q', styles: 'display:inline-block' },
				_ref2 = {
					name: '4y4kjm',
					styles: 'z-index:9999;position:fixed;transition:opacity 400ms ease-in;top:0;right:0;bottom:0;left:0;display:flex;align-items:center;justify-content:space-around;background:rgba(192,192,192,0.5)',
				},
				_ref3 = {
					name: '1cyajnd',
					styles: 'position:absolute;top:5px;right:5px;cursor:pointer',
				},
				_ref4 = {
					name: 'q4dfy7',
					styles: 'font-weight:900;margin-top:0',
				},
				_ref5 = { name: '2qga7i', styles: 'text-align:right' },
				Modal = (props) => {
					var [isDisplayed, setIsDisplayed] = (0,
						react__WEBPACK_IMPORTED_MODULE_0__.useState)(
							null == props.instigator,
						),
						hide = () => {
							setIsDisplayed(!1),
								props.extraOnHideFunctionality &&
									props.extraOnHideFunctionality();
						};
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.HY,
						{
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
									'div',
									{
										css: _ref,
										onClick: () => setIsDisplayed(!0),
										children: props.instigator,
									},
								),
								isDisplayed &&
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
										'div',
										{
											css: _ref2,
											onClick: hide,
											children: (0,
											_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
												'div',
												{
													css: (0,
													_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)(
														{
															background:
																_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
																	.palette
																	.neutral[100],
															padding: '15px',
															fontSize: '16px',
															maxWidth: '600px',
															maxHeight:
																'calc(100vh - 20px)',
															overflow: 'auto',
															margin: '10px',
															borderRadius: '5px',
															position:
																'relative',
															color: 'initial',
															fontWeight:
																'initial',
														},
														'',
														'',
													),
													onClick: (e) =>
														e.stopPropagation(),
													children: [
														(0,
														_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
															'span',
															{
																onClick: hide,
																css: _ref3,
																children: (0,
																_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
																	'svg',
																	{
																		width: '30',
																		height: '30',
																		children:
																			(0,
																			_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
																				'path',
																				{
																					d: 'M21 9.8l-.8-.8-5.2 4.8-5.2-4.8-.8.8 4.8 5.2-4.8 5.2.8.8 5.2-4.8 5.2 4.8.8-.8-4.8-5.2 4.8-5.2',
																				},
																			),
																	},
																),
															},
														),
														(0,
														_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
															'h2',
															{
																css: _ref4,
																children:
																	props.title,
															},
														),
														props.children,
														(0,
														_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
															'div',
															{
																css: _ref5,
																children: [
																	props.additionalButton &&
																		props.additionalButton(
																			hide,
																		),
																	(0,
																	_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
																		_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_4__.z,
																		{
																			onClick:
																				hide,
																			children:
																				props.alternateOkText ||
																				'Ok',
																		},
																	),
																],
															},
														),
													],
												},
											),
										},
									),
							],
						},
					);
				};
			try {
				(Modal.displayName = 'Modal'),
					(Modal.__docgenInfo = {
						description: '',
						displayName: 'Modal',
						props: {
							instigator: {
								defaultValue: null,
								description: '',
								name: 'instigator',
								required: !0,
								type: { name: 'ReactNode' },
							},
							title: {
								defaultValue: null,
								description: '',
								name: 'title',
								required: !0,
								type: { name: 'string' },
							},
							additionalButton: {
								defaultValue: null,
								description: '',
								name: 'additionalButton',
								required: !1,
								type: {
									name: '((hideFunction: HideFunction) => ReactElement<any, string | JSXElementConstructor<any>>)',
								},
							},
							alternateOkText: {
								defaultValue: null,
								description: '',
								name: 'alternateOkText',
								required: !1,
								type: { name: 'string' },
							},
							extraOnHideFunctionality: {
								defaultValue: null,
								description: '',
								name: 'extraOnHideFunctionality',
								required: !1,
								type: { name: '(() => void)' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/holiday/Modal.tsx#Modal'
						] = {
							docgenInfo: Modal.__docgenInfo,
							name: 'Modal',
							path: 'client/components/mma/holiday/Modal.tsx#Modal',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/shared/DatePicker.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { M: () => DatePicker });
			var emotion_react_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
				),
				palette = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
				),
				space = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
				),
				typography = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
				),
				mq = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
				),
				dates = __webpack_require__('./shared/dates.ts'),
				Button = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/button/Button.js',
				),
				emotion_react_jsx_runtime_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				),
				visually_hidden = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/accessibility/visually-hidden.js',
				),
				_generated_size = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/size.js',
				);
			const Svg = ({ size, theme }) =>
					(0, emotion_react_jsx_runtime_browser_esm.tZ)('svg', {
						width: size ? _generated_size.EA[size] : void 0,
						height: void 0,
						viewBox: '-3 -3 30 30',
						xmlns: 'http://www.w3.org/2000/svg',
						focusable: !1,
						'aria-hidden': !0,
						children: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							'path',
							{
								fillRule: 'evenodd',
								clipRule: 'evenodd',
								d: 'M23 11.045H4.726l7.167-8.576-.932-.932L1 11.522v.956l9.96 9.984.932-.931-7.166-8.575H23z',
								fill: theme?.fill,
							},
						),
					}),
				SvgArrowLeftStraight = ({
					size,
					theme,
					isAnnouncedByScreenReader = !1,
				}) =>
					(0, emotion_react_jsx_runtime_browser_esm.BX)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									Svg,
									{ size, theme },
								),
								isAnnouncedByScreenReader
									? (0,
									  emotion_react_jsx_runtime_browser_esm.tZ)(
											'span',
											{
												css: emotion_react_browser_esm.iv`
					${visually_hidden.j}
				`,
												children: 'Arrow left',
											},
									  )
									: '',
							],
						},
					);
			var SvgArrowRightStraight = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgArrowRightStraight.js',
				),
				react = __webpack_require__('./node_modules/react/index.js');
			var days = [
					{ day: 'Monday', abbr: 'Mon' },
					{ day: 'Tuesday', abbr: 'Tue' },
					{ day: 'Wednesday', abbr: 'Wed' },
					{ day: 'Thursday', abbr: 'Thu' },
					{ day: 'Friday', abbr: 'Fri' },
					{ day: 'Saturday', abbr: 'Sat' },
					{ day: 'Sunday', abbr: 'Sun' },
				],
				_ref = {
					name: 'w50tn5',
					styles: 'display:flex;flex-wrap:wrap;width:100%',
				},
				HolidayCalendarTable = (props) => {
					var holderCss = (0, emotion_react_browser_esm.iv)(
							'&+div{margin-top:',
							space.D[3],
							'px;}',
							mq.Dp.tablet,
							'{width:calc(50% - ',
							space.D[2],
							'px);display:',
							props.hideAtDesktop ? 'none' : 'block',
							';&+div{margin-top:0;}}',
							'',
						),
						tableHolderCss = _ref,
						monthTitleCss = (0, emotion_react_browser_esm.iv)(
							typography.Rcn,
							';line-height:35px;text-align:center;display:block;padding:',
							space.D[2],
							'px 0 5px;border:1px solid ',
							palette.palette.neutral[86],
							';border-bottom:0;',
							'',
						),
						thCss = (0, emotion_react_browser_esm.iv)(
							'flex-grow:1;width:14.2%;text-align:center;padding:0 0 ',
							space.D[3],
							'px;',
							typography.Rcn,
							';text-decoration:none;&:first-of-type{border-left:1px solid ',
							palette.palette.neutral[86],
							';}&:last-of-type{border-right:1px solid ',
							palette.palette.neutral[86],
							';}',
							'',
						),
						tdCss = (
							isActive,
							isDeliveryDay,
							isSelected,
							isExisting,
							dateIndex,
							finalDateIndex,
						) => {
							var cellRowNumber = dateIndex / 7,
								isCellAtBeginningOfRow =
									cellRowNumber === Math.round(cellRowNumber),
								isCellOnLastRow =
									Math.floor(finalDateIndex / 7) ===
									Math.floor(cellRowNumber),
								borderTopColor = isActive
									? palette.palette.neutral[86]
									: palette.palette.neutral[93],
								borderRightColor = isActive
									? palette.palette.neutral[86]
									: palette.palette.neutral[93],
								borderLeftColor = isActive
									? palette.palette.neutral[86]
									: palette.palette.neutral[93],
								borderBottomColor = isActive
									? palette.palette.neutral[86]
									: palette.palette.neutral[93];
							return (0, emotion_react_browser_esm.iv)(
								'flex-grow:1;width:14.2%;text-align:center;position:relative;border-top:1px solid ',
								borderTopColor,
								';border-right:1px solid ',
								borderRightColor,
								';border-left:1px solid ',
								isCellAtBeginningOfRow
									? borderLeftColor
									: 'none',
								';border-bottom:',
								isCellOnLastRow
									? '1px solid '.concat(borderBottomColor)
									: 'none',
								';padding:',
								space.D[3],
								'px 0;',
								typography.Kz0,
								';color:',
								palette.palette.neutral[7],
								';opacity:',
								isActive ? '1' : '0.5',
								';cursor:',
								isActive ? 'pointer' : 'default',
								';user-select:none;',
								isDeliveryDay
									? "\n        &:before {\n          content: '';\n          display: block;\n          width: 0;\n          height: 0;\n          border-left: 8px solid transparent;\n          border-right: 8px solid transparent;\n          border-bottom: 8px solid "
											.concat(
												palette.palette.brand[400],
												';\n          position: absolute;\n          top: 0;\n          left: -4px;\n          transform: rotate(-45deg);\n          opacity: ',
											)
											.concat(
												isActive ? '1' : '0.5',
												';\n        }\n      ',
											)
									: '',
								' ',
								isSelected || isExisting
									? '\n        &:after {\n          content: "";\n          position: absolute;\n          top: 0;\n          left: 0;\n          width: 100%;\n          height: 100%;\n          padding: 4px;\n          background-color: '.concat(
											isSelected
												? palette.palette.brandAlt[400]
												: palette.palette.labs[400],
											';\n          z-index: -1;\n        }\n      ',
									  )
									: '',
								' & sup{vertical-align:top;}&:hover{outline:2px solid ',
								palette.palette.brandAlt[400],
								';outline-offset:-8px;}',
								'',
							);
						},
						firstDayOfSelectedMonth = (0, dates.YV)(
							props.targetMonthStartDate,
						),
						firstDayOfSelectedMonthNum = days.findIndex(
							(day) => day.day === firstDayOfSelectedMonth,
						),
						totalDaysInSelectedMonth = (0, dates.el)(
							props.targetMonthStartDate,
						),
						prependDatesPadding = [
							...new Array(firstDayOfSelectedMonthNum),
						]
							.map((_, dateIndex) =>
								(0, dates.W4)(
									props.targetMonthStartDate,
									-(dateIndex + 1),
								),
							)
							.reverse(),
						selectedMonthDates = [
							...new Array(totalDaysInSelectedMonth),
						].map((_, dateIndex) =>
							(0, dates.W4)(
								props.targetMonthStartDate,
								dateIndex,
							),
						),
						lastDayOfSelectedMonth =
							selectedMonthDates[selectedMonthDates.length - 1],
						appendDatesPadding = [
							...new Array(
								firstDayOfSelectedMonthNum +
									totalDaysInSelectedMonth >
								35
									? 42 -
									  (firstDayOfSelectedMonthNum +
											totalDaysInSelectedMonth)
									: 35 -
									  (firstDayOfSelectedMonthNum +
											totalDaysInSelectedMonth),
							),
						].map((_, dateIndex) =>
							(0, dates.W4)(
								lastDayOfSelectedMonth,
								dateIndex + 1,
							),
						),
						calendarDates = [
							...prependDatesPadding,
							...selectedMonthDates,
							...appendDatesPadding,
						];
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						'div',
						{
							css: holderCss,
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'span',
									{
										css: monthTitleCss,
										children: [
											props.targetMonthStartDate.toLocaleString(
												'default',
												{ month: 'long' },
											),
											' ',
											props.targetMonthStartDate.getFullYear(),
										],
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'div',
									{
										'data-cy': 'date-picker',
										css: tableHolderCss,
										children: [
											days.map((day) =>
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'abbr',
													{
														title: day.day,
														css: thCss,
														children: day.abbr,
													},
													day.day,
												),
											),
											calendarDates.map(
												(date, dateIndex) => {
													var targetDate,
														matchingDate =
															props.holidayDates.find(
																(holidayDate) =>
																	holidayDate.date.valueOf() ===
																	date.valueOf(),
															);
													return (0,
													emotion_react_jsx_runtime_browser_esm.BX)(
														'div',
														{
															css: tdCss(
																((null ==
																matchingDate
																	? void 0
																	: matchingDate.isActive) &&
																	date.getMonth() ===
																		props.targetMonthStartDate.getMonth()) ||
																	!1,
																(null ==
																matchingDate
																	? void 0
																	: matchingDate.isDeliveryDay) ||
																	!1,
																(null ==
																matchingDate
																	? void 0
																	: matchingDate.isSelected) ||
																	!1,
																(null ==
																matchingDate
																	? void 0
																	: matchingDate.isExisting) ||
																	!1,
																dateIndex,
																calendarDates.length -
																	1,
															),
															onMouseDown:
																((targetDate =
																	date),
																() =>
																	props.handleDayMouseDown(
																		targetDate,
																	)),
															onMouseUp: (
																(targetDate) =>
																() =>
																	props.handleDayMouseUp(
																		targetDate,
																	)
															)(date),
															onTouchStart: (
																(targetDate) =>
																() =>
																	props.handleTouchStart(
																		targetDate,
																	)
															)(date),
															onMouseEnter: (
																(targetDate) =>
																() =>
																	props.handleDayMouseEnter(
																		targetDate,
																	)
															)(date),
															children: [
																date.getDate(),
																null !=
																	matchingDate &&
																matchingDate.showAsterisk
																	? (0,
																	  emotion_react_jsx_runtime_browser_esm.tZ)(
																			'sup',
																			{
																				children:
																					'*',
																			},
																	  )
																	: '',
															],
														},
														date.getTime(),
													);
												},
											),
										],
									},
								),
							],
						},
					);
				};
			try {
				(HolidayCalendarTable.displayName = 'HolidayCalendarTable'),
					(HolidayCalendarTable.__docgenInfo = {
						description: '',
						displayName: 'HolidayCalendarTable',
						props: {
							holidayDates: {
								defaultValue: null,
								description: '',
								name: 'holidayDates',
								required: !0,
								type: { name: 'CalendarTableDate[]' },
							},
							targetMonthStartDate: {
								defaultValue: null,
								description: '',
								name: 'targetMonthStartDate',
								required: !0,
								type: { name: 'Date' },
							},
							handleDayMouseDown: {
								defaultValue: null,
								description: '',
								name: 'handleDayMouseDown',
								required: !0,
								type: { name: '(day: Date) => void' },
							},
							handleDayMouseUp: {
								defaultValue: null,
								description: '',
								name: 'handleDayMouseUp',
								required: !0,
								type: { name: '(day: Date) => void' },
							},
							handleTouchStart: {
								defaultValue: null,
								description: '',
								name: 'handleTouchStart',
								required: !0,
								type: { name: '(day: Date) => void' },
							},
							handleDayMouseEnter: {
								defaultValue: null,
								description: '',
								name: 'handleDayMouseEnter',
								required: !0,
								type: { name: '(day: Date) => void' },
							},
							hideAtDesktop: {
								defaultValue: null,
								description: '',
								name: 'hideAtDesktop',
								required: !0,
								type: { name: 'boolean' },
							},
							daysOfWeekToIconify: {
								defaultValue: null,
								description: '',
								name: 'daysOfWeekToIconify',
								required: !1,
								type: { name: 'number[]' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/holiday/HolidayCalendarTable.tsx#HolidayCalendarTable'
						] = {
							docgenInfo: HolidayCalendarTable.__docgenInfo,
							name: 'HolidayCalendarTable',
							path: 'client/components/mma/holiday/HolidayCalendarTable.tsx#HolidayCalendarTable',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var HolidayDateChooser = __webpack_require__(
				'./client/components/mma/holiday/HolidayDateChooser.tsx',
			);
			function ownKeys(e, r) {
				var t = Object.keys(e);
				if (Object.getOwnPropertySymbols) {
					var o = Object.getOwnPropertySymbols(e);
					r &&
						(o = o.filter(function (r) {
							return Object.getOwnPropertyDescriptor(
								e,
								r,
							).enumerable;
						})),
						t.push.apply(t, o);
				}
				return t;
			}
			function _objectSpread(e) {
				for (var r = 1; r < arguments.length; r++) {
					var t = null != arguments[r] ? arguments[r] : {};
					r % 2
						? ownKeys(Object(t), !0).forEach(function (r) {
								_defineProperty(e, r, t[r]);
						  })
						: Object.getOwnPropertyDescriptors
						? Object.defineProperties(
								e,
								Object.getOwnPropertyDescriptors(t),
						  )
						: ownKeys(Object(t)).forEach(function (r) {
								Object.defineProperty(
									e,
									r,
									Object.getOwnPropertyDescriptor(t, r),
								);
						  });
				}
				return e;
			}
			function _defineProperty(obj, key, value) {
				return (
					(key = (function _toPropertyKey(arg) {
						var key = (function _toPrimitive(input, hint) {
							if ('object' != typeof input || null === input)
								return input;
							var prim = input[Symbol.toPrimitive];
							if (void 0 !== prim) {
								var res = prim.call(input, hint || 'default');
								if ('object' != typeof res) return res;
								throw new TypeError(
									'@@toPrimitive must return a primitive value.',
								);
							}
							return ('string' === hint ? String : Number)(input);
						})(arg, 'string');
						return 'symbol' == typeof key ? key : String(key);
					})(key)) in obj
						? Object.defineProperty(obj, key, {
								value,
								enumerable: !0,
								configurable: !0,
								writable: !0,
						  })
						: (obj[key] = value),
					obj
				);
			}
			var HolidayCalendarTables = (props) => {
				var calendarHoldersCss = (0, emotion_react_browser_esm.iv)(
						mq.Dp.tablet,
						'{display:flex;flex-wrap:wrap;justify-content:space-between;position:relative;}',
						'',
					),
					holidayDateChooserStateContext = (0, react.useContext)(
						HolidayDateChooser.kS,
					),
					returnHolidayDateState = (date) => {
						var _props$daysOfWeekToIc,
							_props$dateStates,
							_props$dateStates2,
							_props$dateToAsterisk;
						return {
							date,
							isActive:
								(0, dates.vh)(
									date,
									props.maybeLockedStartDate ||
										props.minimumDate,
								) && (0, dates.Ov)(date, props.maximumDate),
							isDeliveryDay: !(
								null ===
									(_props$daysOfWeekToIc =
										props.daysOfWeekToIconify) ||
								void 0 === _props$daysOfWeekToIc ||
								!_props$daysOfWeekToIc.some(
									(iconDay) =>
										iconDay === (date.getDay() || 7),
								)
							),
							isSelected:
								holidayDateChooserStateContext.selectedRange
									? date >=
											holidayDateChooserStateContext
												.selectedRange.start &&
									  date <=
											holidayDateChooserStateContext
												.selectedRange.end
									: null ===
											(_props$dateStates =
												props.dateStates) ||
									  void 0 === _props$dateStates
									? void 0
									: _props$dateStates.some(
											(dateState) =>
												date >= dateState.range.start &&
												date <= dateState.range.end &&
												'amend' === dateState.state,
									  ),
							isExisting:
								null ===
									(_props$dateStates2 = props.dateStates) ||
								void 0 === _props$dateStates2
									? void 0
									: _props$dateStates2.some(
											(dateState) =>
												date >= dateState.range.start &&
												date <= dateState.range.end &&
												'existing' === dateState.state,
									  ),
							showAsterisk:
								date.valueOf() ===
								(null ===
									(_props$dateToAsterisk =
										props.dateToAsterisk) ||
								void 0 === _props$dateToAsterisk
									? void 0
									: _props$dateToAsterisk.valueOf()),
						};
					},
					holidayDatesInitFill = [];
				if (props.maximumDate.valueOf() > props.minimumDate.valueOf())
					for (
						var holidayDate = new Date(props.minimumDate.valueOf());
						holidayDate <= props.maximumDate;

					)
						holidayDatesInitFill.push(
							returnHolidayDateState(holidayDate),
						),
							(holidayDate = (0, dates.W4)(holidayDate, 1));
				var [holidayDates, setHolidayDates] = (0, react.useState)(
						holidayDatesInitFill,
					),
					[inSelectionMode, setSelectionModeTo] = (0, react.useState)(
						!1,
					),
					[startOfSelectionDateIndex, setStartOfSelectionDateIndex] =
						(0, react.useState)(-1),
					[mouseDownStartDate, setMouseDownStartDate] = (0,
					react.useState)(null),
					[visableMonths, setVisableMonths] = (0, react.useState)([
						0, 1,
					]),
					startOfMonthOfMinDate = new Date(
						props.minimumDate.getFullYear(),
						props.minimumDate.getMonth(),
						1,
					),
					monthsBetweenMinAndMax =
						12 *
							(props.maximumDate.getFullYear() -
								props.minimumDate.getFullYear()) -
						props.minimumDate.getMonth() +
						props.maximumDate.getMonth() +
						1,
					calendarsMonthStartDate = Array.from(
						{ length: monthsBetweenMinAndMax },
						(_, i) => (0, dates.ZB)(startOfMonthOfMinDate, i),
					),
					dayMouseDown = (day) => {
						var targetStateDayIndex = holidayDates.findIndex(
							(holidayDate) =>
								holidayDate.date.valueOf() === day.valueOf(),
						);
						!inSelectionMode &&
						targetStateDayIndex > -1 &&
						holidayDates[targetStateDayIndex].isActive &&
						!holidayDates[targetStateDayIndex].isExisting
							? (setStartOfSelectionDateIndex(
									targetStateDayIndex,
							  ),
							  setHolidayDates(
									holidayDates.map(
										(holidayDate, holidayDateIndex) =>
											_objectSpread(
												_objectSpread({}, holidayDate),
												{},
												{
													isSelected:
														holidayDateIndex ===
														targetStateDayIndex,
												},
											),
									),
							  ),
							  setSelectionModeTo(!0))
							: inSelectionMode && setSelectionModeTo(!1),
							setMouseDownStartDate(day);
					},
					dayMouseEnter = (day) => {
						if (
							inSelectionMode &&
							(0, dates.vh)(
								day,
								props.maybeLockedStartDate || props.minimumDate,
							) &&
							(0, dates.Ov)(day, props.maximumDate)
						) {
							var targetStateDayIndex = holidayDates.findIndex(
								(holidayDate) =>
									holidayDate.date.valueOf() ===
									day.valueOf(),
							);
							if (
								targetStateDayIndex > -1 &&
								startOfSelectionDateIndex > -1
							) {
								var dateIndexesThatShouldBeSelected = ((
										allDates,
										selectionStartIndex,
										selectionEndIndex,
									) => {
										if (
											selectionStartIndex ===
											selectionEndIndex
										)
											return [selectionStartIndex];
										var lowestRangeNum = Math.min(
												selectionStartIndex,
												selectionEndIndex,
											),
											highestRangeNum = Math.max(
												selectionStartIndex,
												selectionEndIndex,
											),
											wholeRangeSlice = allDates
												.slice(
													lowestRangeNum,
													highestRangeNum + 1,
												)
												.map(
													(
														_,
														calendarTableDateIndex,
													) =>
														calendarTableDateIndex +
														lowestRangeNum,
												);
										selectionEndIndex <
											selectionStartIndex &&
											(wholeRangeSlice =
												wholeRangeSlice.reverse());
										var firstNonSelectableDate =
												wholeRangeSlice.findIndex(
													(calendarDateIndex) =>
														allDates[
															calendarDateIndex
														].isExisting,
												),
											onlySelectableDates =
												firstNonSelectableDate > -1
													? wholeRangeSlice.slice(
															0,
															firstNonSelectableDate,
													  )
													: [...wholeRangeSlice];
										return selectionEndIndex <
											selectionStartIndex
											? onlySelectableDates.reverse()
											: onlySelectableDates;
									})(
										holidayDates,
										startOfSelectionDateIndex,
										targetStateDayIndex,
									),
									updatedHolidayDates = holidayDates.map(
										(holidayDate, holidayDateIndex) =>
											_objectSpread(
												_objectSpread({}, holidayDate),
												{},
												{
													isSelected:
														dateIndexesThatShouldBeSelected.some(
															(selectedIndex) =>
																selectedIndex ===
																holidayDateIndex,
														),
												},
											),
									);
								setHolidayDates(updatedHolidayDates);
							}
						}
					},
					dayTouchStart = (day) => {
						dayMouseEnter(day);
					},
					dayMouseUp = (day) => {
						var inDraggingMode =
							!!mouseDownStartDate &&
							mouseDownStartDate.valueOf() !== day.valueOf();
						if (!inSelectionMode || inDraggingMode) {
							var selectedDatesRange = holidayDates.filter(
								(holidayDate) => holidayDate.isSelected,
							);
							if (selectedDatesRange.length > 0) {
								var selecteRangeStartDate =
										selectedDatesRange[0].date,
									selecteRangeEndDate =
										selectedDatesRange[
											selectedDatesRange.length - 1
										].date;
								props.handleRangeChoosen({
									startDate: selecteRangeStartDate,
									endDate: selecteRangeEndDate,
								});
							}
						}
						inDraggingMode &&
							(setSelectionModeTo(!1),
							setMouseDownStartDate(null));
					};
				return (0, emotion_react_jsx_runtime_browser_esm.BX)('div', {
					css: calendarHoldersCss,
					children: [
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							Button.z,
							{
								icon: (0,
								emotion_react_jsx_runtime_browser_esm.tZ)(
									SvgArrowLeftStraight,
									{},
								),
								hideLabel: !0,
								size: 'small',
								cssOverrides: (0, emotion_react_browser_esm.iv)(
									'position:absolute;top:',
									space.D[3],
									'px;left:',
									space.D[3],
									'px;z-index:2;overflow:hidden;',
									0 === visableMonths[0]
										? 'opacity: 0.4; pointer-events: none; cursor: not-allowed'
										: '',
									';',
									'',
								),
								onClick: () =>
									setVisableMonths(
										visableMonths.map(
											(visableMonthIndex) =>
												visableMonthIndex - 1,
										),
									),
								children: 'Go back a month',
							},
						),
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							Button.z,
							{
								icon: (0,
								emotion_react_jsx_runtime_browser_esm.tZ)(
									SvgArrowRightStraight.l,
									{},
								),
								hideLabel: !0,
								size: 'small',
								cssOverrides: (0, emotion_react_browser_esm.iv)(
									'position:absolute;top:',
									space.D[3],
									'px;right:',
									space.D[3],
									'px;z-index:2;overflow:hidden;',
									visableMonths[1] ===
										calendarsMonthStartDate.length - 1
										? 'opacity: 0.4; pointer-events: none; cursor: not-allowed'
										: '',
									';',
									'',
								),
								onClick: () =>
									setVisableMonths(
										visableMonths.map(
											(visableMonthIndex) =>
												visableMonthIndex + 1,
										),
									),
								children: 'Go forward a month',
							},
						),
						calendarsMonthStartDate.map(
							(monthStartDate, monthIndex) =>
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									HolidayCalendarTable,
									{
										holidayDates,
										targetMonthStartDate: monthStartDate,
										handleDayMouseDown: dayMouseDown,
										handleDayMouseUp: dayMouseUp,
										handleTouchStart: dayTouchStart,
										handleDayMouseEnter: dayMouseEnter,
										hideAtDesktop: !visableMonths.some(
											(visibleDesktopMonthIndex) =>
												visibleDesktopMonthIndex ===
												monthIndex,
										),
									},
									monthStartDate.valueOf(),
								),
						),
					],
				});
			};
			try {
				(HolidayCalendarTables.displayName = 'HolidayCalendarTables'),
					(HolidayCalendarTables.__docgenInfo = {
						description: '',
						displayName: 'HolidayCalendarTables',
						props: {
							minimumDate: {
								defaultValue: null,
								description: '',
								name: 'minimumDate',
								required: !0,
								type: { name: 'Date' },
							},
							maximumDate: {
								defaultValue: null,
								description: '',
								name: 'maximumDate',
								required: !0,
								type: { name: 'Date' },
							},
							maybeLockedStartDate: {
								defaultValue: null,
								description: '',
								name: 'maybeLockedStartDate',
								required: !0,
								type: { name: 'Date | null' },
							},
							dateStates: {
								defaultValue: null,
								description: '',
								name: 'dateStates',
								required: !0,
								type: { name: 'DateStates[]' },
							},
							handleRangeChoosen: {
								defaultValue: null,
								description: '',
								name: 'handleRangeChoosen',
								required: !0,
								type: {
									name: '(range: { startDate: Date; endDate: Date; }) => void',
								},
							},
							daysOfWeekToIconify: {
								defaultValue: null,
								description: '',
								name: 'daysOfWeekToIconify',
								required: !1,
								type: { name: 'number[]' },
							},
							dateToAsterisk: {
								defaultValue: null,
								description: '',
								name: 'dateToAsterisk',
								required: !1,
								type: { name: 'Date' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/holiday/HolidayCalendarTables.tsx#HolidayCalendarTables'
						] = {
							docgenInfo: HolidayCalendarTables.__docgenInfo,
							name: 'HolidayCalendarTables',
							path: 'client/components/mma/holiday/HolidayCalendarTables.tsx#HolidayCalendarTables',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var DateInput = __webpack_require__(
				'./client/components/mma/shared/DateInput.tsx',
			);
			function DatePicker_ownKeys(e, r) {
				var t = Object.keys(e);
				if (Object.getOwnPropertySymbols) {
					var o = Object.getOwnPropertySymbols(e);
					r &&
						(o = o.filter(function (r) {
							return Object.getOwnPropertyDescriptor(
								e,
								r,
							).enumerable;
						})),
						t.push.apply(t, o);
				}
				return t;
			}
			function DatePicker_defineProperty(obj, key, value) {
				return (
					(key = (function DatePicker_toPropertyKey(arg) {
						var key = (function DatePicker_toPrimitive(
							input,
							hint,
						) {
							if ('object' != typeof input || null === input)
								return input;
							var prim = input[Symbol.toPrimitive];
							if (void 0 !== prim) {
								var res = prim.call(input, hint || 'default');
								if ('object' != typeof res) return res;
								throw new TypeError(
									'@@toPrimitive must return a primitive value.',
								);
							}
							return ('string' === hint ? String : Number)(input);
						})(arg, 'string');
						return 'symbol' == typeof key ? key : String(key);
					})(key)) in obj
						? Object.defineProperty(obj, key, {
								value,
								enumerable: !0,
								configurable: !0,
								writable: !0,
						  })
						: (obj[key] = value),
					obj
				);
			}
			var stateDefinitions = {
					available: {
						selectable: !0,
						color: palette.palette.neutral[100],
						label: '',
					},
					existing: {
						selectable: !1,
						color: palette.palette.labs[400],
						label: 'Existing suspensions',
					},
					amend: {
						selectable: !0,
						color: palette.palette.brandAlt[400],
						label: "Suspension you're amending",
					},
				},
				mergeAdjacentDateRanges = (accumulator, currentValue) => {
					if (accumulator.length > 0) {
						var indexOfLast = accumulator.length - 1,
							allButTheLast = accumulator.slice(0, indexOfLast),
							last = accumulator[indexOfLast],
							lastEndDatePlus1Day = (0, dates.od)(last.end);
						return (
							lastEndDatePlus1Day.setDate(
								lastEndDatePlus1Day.getDate() + 1,
							),
							(0, dates.YX)(
								lastEndDatePlus1Day,
								currentValue.start,
							)
								? [
										...allButTheLast,
										(0, dates.fZ)(
											last.start,
											currentValue.end,
										),
								  ]
								: [...accumulator, currentValue]
						);
					}
					return [currentValue];
				},
				_ref3 = {
					name: '1wph0o3',
					styles: 'display:flex;align-items:center;margin-bottom:10px',
				},
				LegendItem = (props) =>
					(0, emotion_react_jsx_runtime_browser_esm.BX)('div', {
						css: _ref3,
						children: [
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								'div',
								{
									css: [
										{
											width: '24px',
											height: '24px',
											backgroundColor: props.color,
											display: 'inline-block',
											marginRight: '10px',
											border: '0 !important',
										},
										(0, emotion_react_browser_esm.iv)(
											props.extraCss,
											'',
											'',
										),
										'',
										'',
									],
									className: 'DateRangePicker__Date',
								},
							),
							(0, emotion_react_jsx_runtime_browser_esm.tZ)(
								'span',
								{
									css: (0, emotion_react_browser_esm.iv)(
										'margin-right:',
										space.D[5],
										'px;',
										typography.AjP,
										';',
										'',
									),
									children: props.label,
								},
							),
						],
					}),
				DatePicker_ref = { name: '1ff36h2', styles: 'flex-grow:1' },
				_ref2 = {
					name: '1o7d3sk',
					styles: 'display:flex;align-items:center;flex-wrap:wrap',
				},
				DatePicker = (props) => {
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'div',
									{
										css: _ref2,
										children: ((issueKeyword =
											props.issueKeyword),
										(includeExisting =
											props.existingDates.length > 0),
										(includeAmend =
											!!props.amendableDateRange),
										[
											{
												extraCss:
													'\n  ::after {\n    content: "";\n    display: block;\n    width: 0;\n    height: 0;\n    border-style: solid;\n    border-width: 0 14px 14px 14px;\n    border-color: transparent transparent '.concat(
														palette.palette
															.brand[400],
														' transparent;\n    transform: rotate(-45deg);\n  }\n  ',
													),
												label: ''.concat(
													issueKeyword,
													' day',
												),
											},
											...(includeExisting
												? [stateDefinitions.existing]
												: []),
											...(includeAmend
												? [stateDefinitions.amend]
												: []),
										]).map((itemProps) =>
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												LegendItem,
												(function DatePicker_objectSpread(
													e,
												) {
													for (
														var r = 1;
														r < arguments.length;
														r++
													) {
														var t =
															null != arguments[r]
																? arguments[r]
																: {};
														r % 2
															? DatePicker_ownKeys(
																	Object(t),
																	!0,
															  ).forEach(
																	function (
																		r,
																	) {
																		DatePicker_defineProperty(
																			e,
																			r,
																			t[
																				r
																			],
																		);
																	},
															  )
															: Object.getOwnPropertyDescriptors
															? Object.defineProperties(
																	e,
																	Object.getOwnPropertyDescriptors(
																		t,
																	),
															  )
															: DatePicker_ownKeys(
																	Object(t),
															  ).forEach(
																	function (
																		r,
																	) {
																		Object.defineProperty(
																			e,
																			r,
																			Object.getOwnPropertyDescriptor(
																				t,
																				r,
																			),
																		);
																	},
															  );
													}
													return e;
												})({}, itemProps),
												itemProps.label,
											),
										),
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'div',
									{
										css: (0, emotion_react_browser_esm.iv)(
											'display:flex;',
											mq.C4.desktop,
											'{flex-direction:column-reverse;}',
											'',
										),
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'div',
												{
													css: DatePicker_ref,
													children: (0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														HolidayCalendarTables,
														{
															minimumDate:
																props.firstAvailableDate,
															maximumDate: (0,
															dates.W4)(
																props.firstAvailableDate,
																(0, dates.m2)(
																	props.firstAvailableDate,
																)
																	? 366
																	: 365,
															),
															daysOfWeekToIconify:
																props.issueDaysOfWeek,
															dateToAsterisk:
																props.dateToAsterisk,
															maybeLockedStartDate:
																props.maybeLockedStartDate,
															dateStates: [
																...props.existingDates
																	.reduce(
																		mergeAdjacentDateRanges,
																		[],
																	)
																	.map(
																		(
																			range,
																		) => ({
																			state: 'existing',
																			range,
																		}),
																	),
																...(props.amendableDateRange
																	? [
																			{
																				state: 'amend',
																				range: props.amendableDateRange,
																			},
																	  ]
																	: []),
															].sort(
																(a, b) =>
																	a.range.start.valueOf() -
																	b.range.start.valueOf(),
															),
															handleRangeChoosen:
																props.onChange,
														},
													),
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'div',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														'margin-left:18px;width:136px;display:flex;flex-direction:column;',
														typography.AjP,
														';',
														mq.C4.desktop,
														'{position:sticky;zindex:998;top:0;left:0;right:0;width:100vw;flex-direction:row;flex-wrap:wrap;align-items:center;background:',
														palette.palette
															.neutral[100],
														';padding:10px;padding-top:0;margin-bottom:15px;margin-left:-20px;margin-right:-20px;box-shadow:0 3px 5px -3px ',
														palette.palette
															.neutral[60],
														';}',
														'',
													),
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															'div',
															{
																css: (0,
																emotion_react_browser_esm.iv)(
																	mq.C4
																		.desktop,
																	'{display:flex;align-items:center;margin-right:10px;margin-top:10px;}',
																	'',
																),
																children: [
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'div',
																		{
																			children:
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					DateInput.W,
																					{
																						date: props.selectedRange
																							? props
																									.selectedRange
																									.start
																							: props.firstAvailableDate,
																						labelText:
																							'From',
																						disabled:
																							!!props.maybeLockedStartDate,
																					},
																				),
																		},
																	),
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'span',
																		{
																			css: (0,
																			emotion_react_browser_esm.iv)(
																				'margin:0 5px;',
																				mq
																					.Dp
																					.desktop,
																				'{display:none;}',
																				'',
																			),
																			children:
																				'to',
																		},
																	),
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		'div',
																		{
																			css: (0,
																			emotion_react_browser_esm.iv)(
																				mq
																					.Dp
																					.desktop,
																				'{margin-top:',
																				space
																					.D[2],
																				'px;}',
																				'',
																			),
																			children:
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					DateInput.W,
																					{
																						date: props.selectedRange
																							? props
																									.selectedRange
																									.end
																							: props.firstAvailableDate,
																						labelText:
																							'To',
																					},
																				),
																		},
																	),
																],
															},
														),
														props.selectionInfo,
													],
												},
											),
										],
									},
								),
							],
						},
					);
					var issueKeyword, includeExisting, includeAmend;
				};
			try {
				(DatePicker.displayName = 'DatePicker'),
					(DatePicker.__docgenInfo = {
						description: '',
						displayName: 'DatePicker',
						props: {
							firstAvailableDate: {
								defaultValue: null,
								description: '',
								name: 'firstAvailableDate',
								required: !0,
								type: { name: 'Date' },
							},
							issueDaysOfWeek: {
								defaultValue: null,
								description: '',
								name: 'issueDaysOfWeek',
								required: !0,
								type: { name: 'number[]' },
							},
							issueKeyword: {
								defaultValue: null,
								description: '',
								name: 'issueKeyword',
								required: !0,
								type: { name: 'string' },
							},
							existingDates: {
								defaultValue: null,
								description: '',
								name: 'existingDates',
								required: !0,
								type: { name: 'DateRange[]' },
							},
							amendableDateRange: {
								defaultValue: null,
								description: '',
								name: 'amendableDateRange',
								required: !1,
								type: { name: 'DateRange' },
							},
							selectedRange: {
								defaultValue: null,
								description: '',
								name: 'selectedRange',
								required: !1,
								type: { name: 'DateRange' },
							},
							maybeLockedStartDate: {
								defaultValue: null,
								description: '',
								name: 'maybeLockedStartDate',
								required: !0,
								type: { name: 'Date | null' },
							},
							selectionInfo: {
								defaultValue: null,
								description: '',
								name: 'selectionInfo',
								required: !1,
								type: {
									name: 'ReactElement<any, string | JSXElementConstructor<any>>',
								},
							},
							onChange: {
								defaultValue: null,
								description: '',
								name: 'onChange',
								required: !0,
								type: {
									name: '(range: { startDate: Date; endDate: Date; }) => void',
								},
							},
							dateToAsterisk: {
								defaultValue: null,
								description: '',
								name: 'dateToAsterisk',
								required: !1,
								type: { name: 'Date' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/DatePicker.tsx#DatePicker'
						] = {
							docgenInfo: DatePicker.__docgenInfo,
							name: 'DatePicker',
							path: 'client/components/mma/shared/DatePicker.tsx#DatePicker',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/shared/assets/InfoIcon.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { s: () => InfoIcon });
			var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
				__webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				);
			var _ref = {
					name: '8f9s9l',
					styles: 'position:relative;top:2.5px;margin-right:5px',
				},
				InfoIcon = () =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
						'svg',
						{
							xmlns: 'http://www.w3.org/2000/svg',
							width: '16',
							height: '16',
							viewBox: '0 0 16 16',
							css: _ref,
							children: (0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.BX)(
								'g',
								{
									fill: 'none',
									fillRule: 'evenodd',
									transform: 'translate(1 1)',
									children: [
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
											'circle',
											{
												cx: '7',
												cy: '7',
												r: '7',
												stroke: '#121212',
												strokeLinecap: 'round',
												strokeLinejoin: 'round',
												strokeWidth: '1.4',
											},
										),
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
											'path',
											{
												stroke: '#121212',
												strokeLinecap: 'round',
												strokeLinejoin: 'round',
												strokeWidth: '1.4',
												d: 'M7 9.8V7',
											},
										),
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
											'circle',
											{
												cx: '7',
												cy: '4.2',
												r: '1',
												fill: '#121212',
											},
										),
									],
								},
							),
						},
					);
		},
	},
]);
//# sourceMappingURL=8801.930f4354.iframe.bundle.js.map
