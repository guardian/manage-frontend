'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[8698],
	{
		'./client/components/mma/shared/NewspaperArchiveCta.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				z: () => NewspaperArchiveCta,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
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
						'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_9__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/breakpoints.js',
					),
				_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_7__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/button/LinkButton.js',
					),
				_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_8__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/__generated__/icons/SvgArrowRightStraight.js',
					),
				_client_utilities_analytics__WEBPACK_IMPORTED_MODULE_5__ =
					__webpack_require__('./client/utilities/analytics.ts'),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				containerCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'background-color:#1e3e72;color:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
						.palette.neutral[100],
					';h4{',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.Rcn,
					';margin:0 ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[5],
					'px 0 0;}p{',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.VZD,
					';margin:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[1],
					'px ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[5],
					'px 0 0;}',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__.Dp
						.tablet,
					'{padding:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[6],
					'px 0 0 ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[6],
					'px;h4{',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.Kie,
					';}p{',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__.Kz0,
					';}}',
					'',
				),
				inlineContentsCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'display:flex;flex-direction:column;column-gap:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[3],
					'px;',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__.Dp
						.tablet,
					'{flex-direction:row;}',
					'',
				),
				copyContainerCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'order:2;margin-top:',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[4],
					'px;padding:0 ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[3],
					'px ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[5],
					'px;',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__.Dp
						.tablet,
					'{order:1;margin:0 0 ',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
						.D[6],
					'px;padding:0;}',
					'',
				),
				heroImageContainerCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'background:linear-gradient(transparent, rgba(0, 0, 0, 0.1));display:flex;align-items:flex-end;justify-content:center;flex-grow:1;order:1;',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__.Dp
						.tablet,
					'{background:none;justify-content:flex-end;order:2;}',
					'',
				),
				heroImageCss = (0,
				_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
					'margin:0 auto;max-width:450px;',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__.C4
						.tablet,
					'{width:100%;}',
					_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__.Dp
						.tablet,
					'{max-width:340px;}',
					'',
				),
				NewspaperArchiveCta = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.tZ)(
						'div',
						{
							css: [containerCss, props.additionalCss, '', ''],
							children: (0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.BX)(
								'div',
								{
									css: inlineContentsCss,
									children: [
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.BX)(
											'div',
											{
												css: copyContainerCss,
												children: [
													(0,
													_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.tZ)(
														'h4',
														{
															children:
																'The Guardian Newspaper archive',
														},
													),
													(0,
													_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.tZ)(
														'p',
														{
															children:
																'Journey through more than 200 years of the Guardian and Observer and search through every page printed in our newspapers.',
														},
													),
													(0,
													_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.tZ)(
														_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_7__.Q,
														{
															href: '/newspaperArchive/auth',
															priority:
																'tertiary',
															theme: {
																backgroundTertiary:
																	_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
																		.palette
																		.neutral[100],
															},
															cssOverrides: (0,
															_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
																'margin-top:',
																_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_3__
																	.D[5],
																'px;',
																'',
															),
															icon: (0,
															_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.tZ)(
																_guardian_source_react_components__WEBPACK_IMPORTED_MODULE_8__.l,
																{},
															),
															iconSide: 'right',
															onClick: () =>
																(0,
																_client_utilities_analytics__WEBPACK_IMPORTED_MODULE_5__.L9)(
																	{
																		eventCategory:
																			'DigitalPlusPrintCta',
																		eventAction:
																			'digital_plus_print_cta_click',
																		eventLabel:
																			'newspaper_archive',
																	},
																),
															size: 'small',
															target: '_blank',
															rel: 'noopener noreferrer',
															children:
																'Explore the archive',
														},
													),
												],
											},
										),
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.tZ)(
											'div',
											{
												css: heroImageContainerCss,
												children: (0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.BX)(
													'picture',
													{
														children: [
															(0,
															_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.tZ)(
																'source',
																{
																	srcSet: 'https://i.guim.co.uk/img/media/f7dfa19a4902203e3bc0e61268c822c01a341b51/0_0_1357_740/1000.png?width=1000&quality=75&s=887d21d6bddd50218ce2c5746e4af519',
																	media: '(min-width: '.concat(
																		_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_9__
																			.A
																			.tablet,
																		'px)',
																	),
																},
															),
															(0,
															_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.tZ)(
																'img',
																{
																	css: heroImageCss,
																	src: 'https://i.guim.co.uk/img/media/f7dfa19a4902203e3bc0e61268c822c01a341b51/0_0_1357_740/1000.png?width=700&quality=75&s=bc4fb813a0d89c5e2e590b0569543985',
																},
															),
														],
													},
												),
											},
										),
									],
								},
							),
						},
					);
			try {
				(NewspaperArchiveCta.displayName = 'NewspaperArchiveCta'),
					(NewspaperArchiveCta.__docgenInfo = {
						description: '',
						displayName: 'NewspaperArchiveCta',
						props: {
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
							'client/components/mma/shared/NewspaperArchiveCta.tsx#NewspaperArchiveCta'
						] = {
							docgenInfo: NewspaperArchiveCta.__docgenInfo,
							name: 'NewspaperArchiveCta',
							path: 'client/components/mma/shared/NewspaperArchiveCta.tsx#NewspaperArchiveCta',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
	},
]);
