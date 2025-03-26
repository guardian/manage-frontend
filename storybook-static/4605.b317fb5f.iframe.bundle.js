'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[4605],
	{
		'./client/components/mma/shared/DirectDebitDisplay.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				Se: () => cleanSortCode,
				Vq: () => sanitiseAccountNumber,
				rV: () => DirectDebitDisplay,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				_assets_DirectDebitLogo__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./client/components/mma/shared/assets/DirectDebitLogo.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			var cleanSortCode = (sortCode) => sortCode.replace(/[^0-9]/g, ''),
				dashifySortCode = (sortCode) => {
					if (!sortCode) return sortCode;
					var cleanedSortCode = cleanSortCode(sortCode);
					return 6 !== cleanedSortCode.length
						? cleanedSortCode
						: cleanedSortCode.substring(0, 2) +
								'-' +
								cleanedSortCode.substring(2, 4) +
								'-' +
								cleanedSortCode.substring(4, 6);
				},
				sanitiseAccountNumber = (accountNumber, shortVersion) =>
					accountNumber
						? accountNumber.length >= 3 &&
						  (0,
						  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
								'span',
								{
									css: (0,
									_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(
										_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
											.Dp.tablet,
										"{:before{display:inline;content:'",
										shortVersion ? '' : 'account ',
										"';}}",
										'',
									),
									children: 'ending '.concat(
										accountNumber.substr(
											accountNumber.length - 3,
										),
									),
								},
						  )
						: accountNumber,
				_ref = { name: '4zleql', styles: 'display:block' },
				_ref2 = { name: 'nkt64x', styles: 'margin-right:10px' },
				_ref3 = { name: '1yft4at', styles: 'margin:0 10px 0 0' },
				_ref4 = { name: 'u782qn', styles: 'margin-left:0.5ch' },
				_ref5 = {
					name: 's5xdrg',
					styles: 'display:flex;align-items:center',
				},
				_ref6 = { name: 'nkt64x', styles: 'margin-right:10px' },
				_ref7 = {
					name: '130d2ae',
					styles: 'margin:auto 10px auto 0;width:47px;height:16px',
				},
				_ref8 = { name: 'nkt64x', styles: 'margin-right:10px' },
				_ref9 = {
					name: 's5xdrg',
					styles: 'display:flex;align-items:center',
				},
				DirectDebitDisplay = (props) =>
					props.onlyAccountEnding
						? (0,
						  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.BX)(
								'div',
								{
									css: _ref9,
									children: [
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
											_assets_DirectDebitLogo__WEBPACK_IMPORTED_MODULE_3__.c,
											{
												fill: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
													.palette.brand[400],
												additionalCss: _ref8,
											},
										),
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
											'span',
											{
												children: sanitiseAccountNumber(
													props.accountNumber,
													!0,
												),
											},
										),
									],
								},
						  )
						: props.onlySortCode
						? (0,
						  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.BX)(
								'div',
								{
									css: (0,
									_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(
										'display:flex;justify-content:right;',
										_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
											.Dp.tablet,
										'{justify-content:left;}',
										'',
									),
									children: [
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
											_assets_DirectDebitLogo__WEBPACK_IMPORTED_MODULE_3__.c,
											{
												fill: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
													.palette.brand[400],
												additionalCss: _ref7,
											},
										),
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
											'span',
											{
												css: _ref6,
												children: dashifySortCode(
													props.sortCode,
												),
											},
										),
									],
								},
						  )
						: props.inline
						? (0,
						  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.BX)(
								'div',
								{
									css: _ref5,
									children: [
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
											_assets_DirectDebitLogo__WEBPACK_IMPORTED_MODULE_3__.c,
											{
												fill: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
													.palette.brand[400],
											},
										),
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.BX)(
											'span',
											{
												css: _ref4,
												children: [
													dashifySortCode(
														props.sortCode,
													),
													' ',
													sanitiseAccountNumber(
														props.accountNumber,
													),
												],
											},
										),
									],
								},
						  )
						: (0,
						  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.BX)(
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.HY,
								{
									children: [
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
											_assets_DirectDebitLogo__WEBPACK_IMPORTED_MODULE_3__.c,
											{
												fill: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
													.palette.brand[400],
												additionalCss: _ref3,
											},
										),
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.BX)(
											'div',
											{
												children: [
													(0,
													_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
														'span',
														{
															css: _ref2,
															children:
																dashifySortCode(
																	props.sortCode,
																),
														},
													),
													(0,
													_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
														'span',
														{
															css: _ref,
															children:
																sanitiseAccountNumber(
																	props.accountNumber,
																),
														},
													),
													props.showAccountName &&
													props.accountName
														? (0,
														  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
																'span',
																{
																	children:
																		props.accountName,
																},
														  )
														: void 0,
												],
											},
										),
									],
								},
						  );
			try {
				(cleanSortCode.displayName = 'cleanSortCode'),
					(cleanSortCode.__docgenInfo = {
						description: '',
						displayName: 'cleanSortCode',
						props: {},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/DirectDebitDisplay.tsx#cleanSortCode'
						] = {
							docgenInfo: cleanSortCode.__docgenInfo,
							name: 'cleanSortCode',
							path: 'client/components/mma/shared/DirectDebitDisplay.tsx#cleanSortCode',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(DirectDebitDisplay.displayName = 'DirectDebitDisplay'),
					(DirectDebitDisplay.__docgenInfo = {
						description: '',
						displayName: 'DirectDebitDisplay',
						props: {
							showAccountName: {
								defaultValue: null,
								description: '',
								name: 'showAccountName',
								required: !1,
								type: { name: 'true' },
							},
							inErrorState: {
								defaultValue: null,
								description: '',
								name: 'inErrorState',
								required: !1,
								type: { name: 'boolean' },
							},
							onlyAccountEnding: {
								defaultValue: null,
								description: '',
								name: 'onlyAccountEnding',
								required: !1,
								type: { name: 'true' },
							},
							onlySortCode: {
								defaultValue: null,
								description: '',
								name: 'onlySortCode',
								required: !1,
								type: { name: 'true' },
							},
							accountName: {
								defaultValue: null,
								description: '',
								name: 'accountName',
								required: !0,
								type: { name: 'string' },
							},
							accountNumber: {
								defaultValue: null,
								description: '',
								name: 'accountNumber',
								required: !0,
								type: { name: 'string' },
							},
							sortCode: {
								defaultValue: null,
								description: '',
								name: 'sortCode',
								required: !0,
								type: { name: 'string' },
							},
							inline: {
								defaultValue: null,
								description: '',
								name: 'inline',
								required: !1,
								type: { name: 'true' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/DirectDebitDisplay.tsx#DirectDebitDisplay'
						] = {
							docgenInfo: DirectDebitDisplay.__docgenInfo,
							name: 'DirectDebitDisplay',
							path: 'client/components/mma/shared/DirectDebitDisplay.tsx#DirectDebitDisplay',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
	},
]);
