'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[3336],
	{
		'./node_modules/@guardian/source-development-kitchen/dist/react-components/toggle-switch/ToggleSwitch.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					Z: () => ToggleSwitch,
				});
				var emotion_react_jsx_runtime_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				);
				let sourceIdIndex = 0;
				var description_id = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/accessibility/description-id.js',
					),
					react = __webpack_require__(
						'./node_modules/react/index.js',
					),
					emotion_react_browser_esm = __webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
					palette = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__deprecated__/colour/palette.js',
					),
					typography = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
					space = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
					);
				const buttonStyles = emotion_react_browser_esm.iv`
	flex: none;
	border: none;
	margin: 0;
	padding: 0;
	display: inline-block;
	text-align: center;
	position: relative;
	transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	cursor: pointer;

	&:after {
		content: '';
		position: absolute;
		border-radius: 50%;
		background: ${palette.n$[100]};
		will-change: left;
		transition: left 0.15s ease-in-out;
	}

	:focus + .tooltiptext {
		opacity: 1;
		visibility: visible;
	}
`,
					buttonStylesMargin = (labelPosition) => {
						switch (labelPosition) {
							case 'left':
								return emotion_react_browser_esm.iv`
				margin-left: 8px;
			`;
							case 'right':
								return emotion_react_browser_esm.iv`
				margin-right: 8px;
			`;
						}
					},
					toggleStyles = (format) => emotion_react_browser_esm.iv`
		width: 44px;
		height: 22px;
		border-radius: 16px;
		box-sizing: unset;

		/* this will go away when resets have been standardised */
		&:before,
		&:after {
			box-sizing: border-box;
		}

		&:before {
			content: '';
			position: absolute;
			top: 5px;
			height: 11px;
			width: 6px;
			right: 8px;
			opacity: 0;
			border-bottom: 2px solid ${palette.Vp[400]};
			border-right: 2px solid ${palette.Vp[400]};
			transform: rotate(45deg);
			transition-property: opacity;
			transition-duration: 0.2s;
		}

		&:after {
			height: 18px;
			width: 18px;
			top: 2px;
			left: 2px;
		}

		&[aria-checked='false'] {
			background-color: ${format ? 'rgba(255, 255, 255, 0.4)' : palette.n$[46]};
			border: 1px solid ${format ? 'rgba(255, 255, 255, 0.6)' : palette.n$[46]};
		}

		&[aria-checked='false']:before {
			transition-delay: 0;
		}

		&[aria-checked='true'] {
			background-color: ${palette.Vp[400]};
			border: 1px solid ${format ? '#A7CFB8' : palette.Vp[400]};
		}

		&[aria-checked='true']:before {
			opacity: 1;
			z-index: 1;
			transition-delay: 0.2s;
		}

		&[aria-checked='true']:after {
			left: 24px;
			background: ${palette.n$[100]};
		}

		&:focus {
			outline: 0;
			html:not(.src-focus-disabled) & {
				outline: 5px solid ${format ? palette.n$[100] : palette.UQ[500]};
				outline-offset: 3px;
			}
		}
	`,
					labelStyles = (
						fontSize,
						fontWeight,
						format,
					) => emotion_react_browser_esm.iv`
	${
		'small' === fontSize &&
		('regular' === fontWeight ? typography.VZD : typography.fRL)
	};
	${
		'medium' === fontSize &&
		('regular' === fontWeight ? typography.Kz0 : typography.Rcn)
	};
	color: ${format ? palette.n$[100] : palette.n$[7]};
	display: inline-flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
	user-select: none;
	position: relative;
`,
					labelBorderStyles = (
						format,
					) => emotion_react_browser_esm.iv`
	border-top: 1px solid ${format ? palette.n$[100] : palette.n$[46]};
	padding-top: ${space.D[1]}px;
	width: 100%;
`,
					tooltipStyles = emotion_react_browser_esm.iv`
	position: absolute;
	visibility: hidden;
	width: 248px;
	top: 40px;
	background-color: ${palette.n$[100]};
	border: 1px solid rgba(18, 18, 18, 0.25);
	border-radius: 3px;
	padding: ${space.D[2]};
	z-index: 1;
	opacity: 0;
	transition: 0.7s opacity;
`,
					ToggleSwitch = ({
						checked,
						id,
						fontWeight = 'regular',
						fontSize = 'small',
						format,
						label,
						labelBorder = !1,
						labelPosition = 'right',
						defaultChecked,
						cssOverrides,
						onClick,
						...props
					}) => {
						const buttonId =
								id ?? 'src-component-' + sourceIdIndex++,
							labelId = (0, description_id.S)(buttonId),
							[isBrowser, setIsBrowser] = (0, react.useState)(!1);
						let tooltiptext = '';
						return (
							(0, react.useEffect)(() => {
								setIsBrowser(!0);
							}, []),
							isBrowser || (tooltiptext = 'tooltiptext'),
							(0, emotion_react_jsx_runtime_browser_esm.BX)(
								'label',
								{
									id: labelId,
									css: [
										labelStyles(
											fontSize,
											fontWeight,
											format,
										),
										labelBorder &&
											labelBorderStyles(format),
										cssOverrides,
									],
									...props,
									children: [
										'left' === labelPosition && label,
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'button',
											{
												id: buttonId,
												css: [
													buttonStyles,
													buttonStylesMargin(
														labelPosition,
													),
													toggleStyles(format),
												],
												role: 'switch',
												'aria-checked':
													null != checked
														? checked
														: !!defaultChecked,
												'aria-labelledby': labelId,
												onClick,
											},
										),
										'right' === labelPosition && label,
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'div',
											{
												className: tooltiptext,
												css: tooltipStyles,
												children: (0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'span',
													{
														children:
															'Please turn on JavaScript to use this feature',
													},
												),
											},
										),
									],
								},
							)
						);
					};
			},
		'./node_modules/@guardian/source/dist/foundations/accessibility/description-id.js':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					S: () => descriptionId,
				});
				const descriptionId = (id) => `${id}_description`;
			},
		'./client/components/mma/shared/asyncComponents/DefaultApiResponseHandler.tsx':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					Zo: () => handleResponses,
					cf: () => TextResponseHandler,
					xJ: () => JsonResponseHandler,
				});
				var JsonResponseHandler = (response) =>
						handleResponses(response, (r) => r.json()),
					TextResponseHandler = (response) =>
						handleResponses(response, (r) => r.text());
				function handleResponses(response, transformResponse) {
					if (
						(function hasBadResponse(responses) {
							if (Array.isArray(responses))
								return responses.some(
									(response) => !response.ok,
								);
							return !responses.ok;
						})(response)
					)
						throw new Error('Invalid API response');
					return Array.isArray(response)
						? Promise.all(
								response.map((r) =>
									handleSingleResponse(r, transformResponse),
								),
						  )
						: handleSingleResponse(response, transformResponse);
				}
				function handleSingleResponse(response, transformResponse) {
					var locationHeader = response.headers.get('Location');
					return 401 === response.status &&
						locationHeader &&
						void 0 !== window
						? (window.location.replace(locationHeader),
						  Promise.resolve(null))
						: transformResponse(response);
				}
				try {
					(JsonResponseHandler.displayName = 'JsonResponseHandler'),
						(JsonResponseHandler.__docgenInfo = {
							description: '',
							displayName: 'JsonResponseHandler',
							props: {},
						}),
						'undefined' != typeof STORYBOOK_REACT_CLASSES &&
							(STORYBOOK_REACT_CLASSES[
								'client/components/mma/shared/asyncComponents/DefaultApiResponseHandler.tsx#JsonResponseHandler'
							] = {
								docgenInfo: JsonResponseHandler.__docgenInfo,
								name: 'JsonResponseHandler',
								path: 'client/components/mma/shared/asyncComponents/DefaultApiResponseHandler.tsx#JsonResponseHandler',
							});
				} catch (__react_docgen_typescript_loader_error) {}
				try {
					(TextResponseHandler.displayName = 'TextResponseHandler'),
						(TextResponseHandler.__docgenInfo = {
							description: '',
							displayName: 'TextResponseHandler',
							props: {},
						}),
						'undefined' != typeof STORYBOOK_REACT_CLASSES &&
							(STORYBOOK_REACT_CLASSES[
								'client/components/mma/shared/asyncComponents/DefaultApiResponseHandler.tsx#TextResponseHandler'
							] = {
								docgenInfo: TextResponseHandler.__docgenInfo,
								name: 'TextResponseHandler',
								path: 'client/components/mma/shared/asyncComponents/DefaultApiResponseHandler.tsx#TextResponseHandler',
							});
				} catch (__react_docgen_typescript_loader_error) {}
			},
		'./client/components/mma/shared/asyncComponents/DefaultLoadingView.tsx':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.d(__webpack_exports__, {
					I: () => DefaultLoadingView,
				});
				var _shared_Spinner__WEBPACK_IMPORTED_MODULE_0__ =
						__webpack_require__(
							'./client/components/shared/Spinner.tsx',
						),
					_shared_WithStandardTopMargin__WEBPACK_IMPORTED_MODULE_1__ =
						__webpack_require__(
							'./client/components/shared/WithStandardTopMargin.tsx',
						),
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ =
						__webpack_require__(
							'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
						);
				function DefaultLoadingView(props) {
					var _props$loadingMessage;
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
						_shared_WithStandardTopMargin__WEBPACK_IMPORTED_MODULE_1__.z,
						{
							children: (0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
								_shared_Spinner__WEBPACK_IMPORTED_MODULE_0__.$,
								{
									loadingMessage:
										null !==
											(_props$loadingMessage =
												null == props
													? void 0
													: props.loadingMessage) &&
										void 0 !== _props$loadingMessage
											? _props$loadingMessage
											: 'Loading',
								},
							),
						},
					);
				}
				try {
					(DefaultLoadingView.displayName = 'DefaultLoadingView'),
						(DefaultLoadingView.__docgenInfo = {
							description: '',
							displayName: 'DefaultLoadingView',
							props: {
								loadingMessage: {
									defaultValue: null,
									description: '',
									name: 'loadingMessage',
									required: !1,
									type: { name: 'string' },
								},
							},
						}),
						'undefined' != typeof STORYBOOK_REACT_CLASSES &&
							(STORYBOOK_REACT_CLASSES[
								'client/components/mma/shared/asyncComponents/DefaultLoadingView.tsx#DefaultLoadingView'
							] = {
								docgenInfo: DefaultLoadingView.__docgenInfo,
								name: 'DefaultLoadingView',
								path: 'client/components/mma/shared/asyncComponents/DefaultLoadingView.tsx#DefaultLoadingView',
							});
				} catch (__react_docgen_typescript_loader_error) {}
			},
		'./client/components/shared/CallCentreNumbers.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				H: () => CallCentreNumbers,
				t: () => ukPhoneNumberWithoutPrefix,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				ukPhoneNumberWithoutPrefix = '0330 333 6790',
				CallCentreNumbers = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.BX)(
						'div',
						{
							children: [
								props.prefixText || 'To contact us',
								' directly, please email ',
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
									'a',
									{
										css: (0,
										_emotion_react__WEBPACK_IMPORTED_MODULE_1__.iv)(
											{
												textDecoration: 'underline',
												color: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
													.palette.sport[300],
												':visited': {
													color: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_2__
														.palette.sport[300],
												},
											},
											'',
											'',
										),
										href: 'mailto:customer.help@theguardian.com',
										children:
											'customer.help@theguardian.com',
									},
								),
								'.',
							],
						},
					);
			try {
				(CallCentreNumbers.displayName = 'CallCentreNumbers'),
					(CallCentreNumbers.__docgenInfo = {
						description: '',
						displayName: 'CallCentreNumbers',
						props: {
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
							'client/components/shared/CallCentreNumbers.tsx#CallCentreNumbers'
						] = {
							docgenInfo: CallCentreNumbers.__docgenInfo,
							name: 'CallCentreNumbers',
							path: 'client/components/shared/CallCentreNumbers.tsx#CallCentreNumbers',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/shared/GenericErrorScreen.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				c: () => GenericErrorScreen,
			});
			var _sentry_browser__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@sentry/minimal/esm/index.js',
					),
				_utilities_analytics__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__('./client/utilities/analytics.ts'),
				_CallCentreNumbers__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./client/components/shared/CallCentreNumbers.tsx',
					),
				_WithStandardTopMargin__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./client/components/shared/WithStandardTopMargin.tsx',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				GenericErrorScreen = (_ref) => {
					var { loggingMessage } = _ref;
					return (
						loggingMessage &&
							(_sentry_browser__WEBPACK_IMPORTED_MODULE_1__.Tb(
								loggingMessage,
							),
							(0,
							_utilities_analytics__WEBPACK_IMPORTED_MODULE_2__.L9)(
								{
									eventCategory: 'genericErrorScreen',
									eventAction: 'error',
									eventLabel: loggingMessage,
								},
							)),
						(0,
						_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.BX)(
							_WithStandardTopMargin__WEBPACK_IMPORTED_MODULE_0__.z,
							{
								children: [
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
										'h2',
										{ children: 'Oops!' },
									),
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.BX)(
										'p',
										{
											children: [
												'Sorry, it seems as if our system has encountered an error.',
												(0,
												_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
													'br',
													{},
												),
												'Please try again in a few minutes.',
											],
										},
									),
									(0,
									_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.tZ)(
										_CallCentreNumbers__WEBPACK_IMPORTED_MODULE_4__.H,
										{
											prefixText:
												'Alternatively, to contact us',
										},
									),
								],
							},
						)
					);
				};
			try {
				(GenericErrorScreen.displayName = 'GenericErrorScreen'),
					(GenericErrorScreen.__docgenInfo = {
						description: '',
						displayName: 'GenericErrorScreen',
						props: {
							loggingMessage: {
								defaultValue: null,
								description: '',
								name: 'loggingMessage',
								required: !1,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/shared/GenericErrorScreen.tsx#GenericErrorScreen'
						] = {
							docgenInfo: GenericErrorScreen.__docgenInfo,
							name: 'GenericErrorScreen',
							path: 'client/components/shared/GenericErrorScreen.tsx#GenericErrorScreen',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/utilities/hooks/useAsyncLoader.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				G: () => LoadingState,
				c: () => useAsyncLoader,
			});
			var _sentry_browser__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@sentry/minimal/esm/index.js',
					),
				react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./node_modules/react/index.js',
				),
				_analytics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
					'./client/utilities/analytics.ts',
				),
				LoadingState = (function (LoadingState) {
					return (
						(LoadingState[(LoadingState.IsLoading = 0)] =
							'IsLoading'),
						(LoadingState[(LoadingState.HasLoaded = 1)] =
							'HasLoaded'),
						(LoadingState[(LoadingState.HasError = 2)] =
							'HasError'),
						LoadingState
					);
				})({});
			function useAsyncLoader(asyncFetch, responseProcessor) {
				var [data, setData] = (0,
					react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
					[error, setError] = (0,
					react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
					[loadingState, setLoadingState] = (0,
					react__WEBPACK_IMPORTED_MODULE_0__.useState)(
						LoadingState.IsLoading,
					);
				return (
					(0, react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
						loadingState == LoadingState.IsLoading &&
							asyncFetch()
								.then((response) => responseProcessor(response))
								.then((data) => {
									setData(data),
										setLoadingState(LoadingState.HasLoaded);
								})
								.catch((e) =>
									(function handleError(error) {
										setLoadingState(LoadingState.HasError),
											setError(error),
											(0,
											_analytics__WEBPACK_IMPORTED_MODULE_1__.L9)(
												{
													eventCategory:
														'asyncLoader',
													eventAction: 'error',
													eventLabel: error
														? error.toString()
														: void 0,
												},
											),
											_sentry_browser__WEBPACK_IMPORTED_MODULE_2__.Tb(
												error,
											);
									})(e),
								);
					}, [loadingState]),
					{ data, error, loadingState }
				);
			}
		},
		'./client/components/mma/dataPrivacy/DataPrivacy.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					Default: () => Default,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => DataPrivacy_stories,
				});
			var http = __webpack_require__(
					'./node_modules/msw/lib/core/http.mjs',
				),
				HttpResponse = __webpack_require__(
					'./node_modules/msw/lib/core/HttpResponse.mjs',
				),
				ReactRouterDecorator = __webpack_require__(
					'./.storybook/ReactRouterDecorator.tsx',
				),
				consents = __webpack_require__('./client/fixtures/consents.ts'),
				user = __webpack_require__('./client/fixtures/user.ts'),
				NavConfig = __webpack_require__(
					'./client/components/shared/nav/NavConfig.tsx',
				),
				Page = __webpack_require__('./client/components/mma/Page.tsx'),
				emotion_react_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
				),
				mq = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/mq/mq.js',
				),
				react = __webpack_require__('./node_modules/react/index.js'),
				grid = __webpack_require__('./client/styles/grid.ts'),
				fetch = __webpack_require__('./client/utilities/fetch.ts'),
				useAsyncLoader = __webpack_require__(
					'./client/utilities/hooks/useAsyncLoader.ts',
				),
				GenericErrorScreen = __webpack_require__(
					'./client/components/shared/GenericErrorScreen.tsx',
				),
				WithStandardTopMargin = __webpack_require__(
					'./client/components/shared/WithStandardTopMargin.tsx',
				),
				idapi_user = __webpack_require__(
					'./client/components/mma/identity/idapi/user.ts',
				),
				identity = __webpack_require__(
					'./client/components/mma/identity/identity.ts',
				),
				Lines = __webpack_require__(
					'./client/components/mma/identity/Lines.tsx',
				),
				useConsentOptions = __webpack_require__(
					'./client/components/mma/identity/useConsentOptions.ts',
				),
				DefaultApiResponseHandler = __webpack_require__(
					'./client/components/mma/shared/asyncComponents/DefaultApiResponseHandler.tsx',
				),
				DefaultLoadingView = __webpack_require__(
					'./client/components/mma/shared/asyncComponents/DefaultLoadingView.tsx',
				),
				Button = __webpack_require__(
					'./node_modules/@guardian/source/dist/react-components/button/Button.js',
				),
				typography = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
				),
				palette = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
				),
				space = __webpack_require__(
					'./node_modules/@guardian/source/dist/foundations/__generated__/space.js',
				);
			var dataPrivacyHeadingCss = (0, emotion_react_browser_esm.iv)(
					'margin:0;margin-bottom:0.5rem;',
					typography.fy7,
					';color:',
					palette.palette.neutral[7],
					';',
					'',
				),
				dataPrivacyParagraphCss = (0, emotion_react_browser_esm.iv)(
					'margin-bottom:0.5rem;margin-top:0.5rem;',
					typography.VZD,
					';color:',
					palette.palette.neutral[7],
					';',
					'',
				),
				dataPrivacyUnorderedListCss = (0, emotion_react_browser_esm.iv)(
					'margin:0;padding-left:20px;',
					typography.VZD,
					';color:',
					palette.palette.neutral[7],
					";li{list-style:none;}li::before{display:inline-block;content:'';border-radius:50%;height:13px;width:13px;background-color:",
					palette.palette.neutral[86],
					';margin-left:-20px;margin-right:7px;}',
					'',
				),
				dataPrivacyMarketingToggleCss =
					(typography.t_M,
					mq.C4.mobileLandscape,
					{
						name: '89cdby',
						styles: 'margin-top:0;position:relative',
					}),
				dataPrivacyWrapper = (0, emotion_react_browser_esm.iv)(
					'*:focus{outline-offset:2px;outline-width:3px;outline-color:',
					palette.palette.focus[400],
					';}display:grid;grid-template-columns:repeat(',
					grid.ft.default,
					', minmax(0, 1fr));column-gap:',
					space.D[5],
					'px;',
					mq.Dp.tablet,
					'{grid-template-columns:repeat(\n\t\t\t',
					grid.ft.tabletAndDesktop,
					',\n\t\t\tminmax(0, 1fr)\n\t\t);}',
					mq.Dp.wide,
					'{grid-template-columns:repeat(',
					grid.ft.wide,
					', minmax(0, 1fr));}',
					'',
				),
				emotion_react_jsx_runtime_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				),
				CookiesOnThisBrowserSection = (props) =>
					(0, emotion_react_jsx_runtime_browser_esm.BX)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'h3',
									{
										css: dataPrivacyHeadingCss,
										children: 'Cookies on this browser',
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'p',
									{
										css: dataPrivacyParagraphCss,
										children: [
											' ',
											'When we make the Guardian available for you online, we use cookies and similar technologies to help us to do this. Some are necessary to help our website work properly and can’t be switched off, and some are optional but may support the Guardian and your experience in other ways.',
										],
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									Button.z,
									{
										disabled: !1,
										type: 'button',
										onClick: () => props.onClick(),
										children:
											'Manage cookies on this browser',
									},
								),
							],
						},
					);
			try {
				(CookiesOnThisBrowserSection.displayName =
					'CookiesOnThisBrowserSection'),
					(CookiesOnThisBrowserSection.__docgenInfo = {
						description: '',
						displayName: 'CookiesOnThisBrowserSection',
						props: {
							onClick: {
								defaultValue: null,
								description: '',
								name: 'onClick',
								required: !0,
								type: { name: '() => unknown' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/dataPrivacy/CookiesOnTheBrowserSection.tsx#CookiesOnThisBrowserSection'
						] = {
							docgenInfo:
								CookiesOnThisBrowserSection.__docgenInfo,
							name: 'CookiesOnThisBrowserSection',
							path: 'client/components/mma/dataPrivacy/CookiesOnTheBrowserSection.tsx#CookiesOnThisBrowserSection',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var sharedStyles = __webpack_require__(
					'./client/components/mma/identity/sharedStyles.ts',
				),
				LearnMoreSection = () =>
					(0, emotion_react_jsx_runtime_browser_esm.BX)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'h3',
									{
										css: dataPrivacyHeadingCss,
										children:
											'Learn more about our privacy policy',
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'p',
									{
										css: dataPrivacyParagraphCss,
										children: [
											'For more information about how we use your data, visit our ',
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'a',
												{
													css: sharedStyles.Fe,
													target: '_blank',
													href: 'https://www.theguardian.com/info/privacy',
													rel: 'noreferrer',
													children: 'privacy policy',
												},
											),
											' ',
										],
									},
								),
							],
						},
					),
				OptOutSection = __webpack_require__(
					'./client/components/mma/identity/emailAndMarketing/OptOutSection.tsx',
				),
				YourDataSection = (props) => {
					var addMarketingToggleElement = (0, OptOutSection.XJ)(
							props.consents,
							props.toggleConsent,
							dataPrivacyMarketingToggleCss,
						),
						addInvertedMarketingToggleElement = (0,
						OptOutSection.XJ)(
							props.consents,
							props.toggleConsent,
							dataPrivacyMarketingToggleCss,
							OptOutSection.ru,
						);
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: [
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'h3',
									{
										css: dataPrivacyHeadingCss,
										children: 'Your account data',
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'p',
									{
										css: dataPrivacyParagraphCss,
										children:
											'What we mean by your account data is information you provide when you create an account:',
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'ul',
									{
										css: dataPrivacyUnorderedListCss,
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'li',
												{
													children:
														'First name and last name',
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'li',
												{ children: 'Email address' },
											),
										],
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									Lines.x,
									{ n: 1 },
								),
								addInvertedMarketingToggleElement(
									'profiling_optout',
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									Lines.x,
									{ n: 1 },
								),
								addMarketingToggleElement(
									'personalised_advertising',
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'p',
									{
										css: dataPrivacyParagraphCss,
										children: 'We do this by:',
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									'ul',
									{
										css: dataPrivacyUnorderedListCss,
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'li',
												{
													children:
														'Analysing your account data to predict what you might be interested in',
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												'li',
												{
													children:
														'Checking if you are already a customer of other trusted partners',
												},
											),
										],
									},
								),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'p',
									{
										css: dataPrivacyParagraphCss,
										children:
											"Advertising is a crucial source of our funding. You won't see more ads, but your advertising may be more relevant. We don’t share your email with third parties.",
									},
								),
							],
						},
					);
				};
			try {
				(YourDataSection.displayName = 'YourDataSection'),
					(YourDataSection.__docgenInfo = {
						description: '',
						displayName: 'YourDataSection',
						props: {
							consents: {
								defaultValue: null,
								description: '',
								name: 'consents',
								required: !0,
								type: { name: 'ConsentOption[]' },
							},
							toggleConsent: {
								defaultValue: null,
								description: '',
								name: 'toggleConsent',
								required: !0,
								type: { name: 'ClickHandler' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/dataPrivacy/YourDataSection.tsx#YourDataSection'
						] = {
							docgenInfo: YourDataSection.__docgenInfo,
							name: 'YourDataSection',
							path: 'client/components/mma/dataPrivacy/YourDataSection.tsx#YourDataSection',
						});
			} catch (__react_docgen_typescript_loader_error) {}
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
			var dataPrivacyFetcher = () =>
					Promise.all([
						(0, fetch.n4)('/idapi/consents'),
						(0, fetch.n4)('/idapi/user'),
					]),
				DataPrivacyPage = () => {
					var { options, error, subscribe, unsubscribe } =
							useConsentOptions.Actions,
						[state, dispatch] = (0, useConsentOptions.M)(),
						[importedCmp, setImportedCmp] = (0, react.useState)(
							null,
						),
						{ data: dataPrivacyResponse, loadingState } = (0,
						useAsyncLoader.c)(
							dataPrivacyFetcher,
							DefaultApiResponseHandler.xJ,
						),
						consents = identity.zZ.consents(state.options);
					if (
						((0, react.useEffect)(() => {
							if (dataPrivacyResponse) {
								var [consentOptions, userResponse] =
										dataPrivacyResponse,
									user = idapi_user.ZW(userResponse),
									consentOpt = (0, identity.P4)(
										user.consents,
										consentOptions,
									);
								dispatch(options(consentOpt));
							}
							__webpack_require__
								.e(3890)
								.then(
									__webpack_require__.bind(
										__webpack_require__,
										'./node_modules/@guardian/libs/dist/index.js',
									),
								)
								.then((_ref) => {
									var { cmp } = _ref;
									setImportedCmp(cmp);
								});
						}, [dataPrivacyResponse, dispatch, options]),
						loadingState == useAsyncLoader.G.HasError)
					)
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							GenericErrorScreen.c,
							{},
						);
					if (loadingState == useAsyncLoader.G.IsLoading)
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							DefaultLoadingView.I,
							{ loadingMessage: 'Loading your privacy details.' },
						);
					if (null === dataPrivacyResponse)
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							GenericErrorScreen.c,
							{},
						);
					var toggleConsentSubscription = (function () {
							var _ref2 = (function _asyncToGenerator(fn) {
								return function () {
									var self = this,
										args = arguments;
									return new Promise(function (
										resolve,
										reject,
									) {
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
							})(function* (id) {
								var option = identity.zZ.findById(
									state.options,
									id,
								);
								try {
									if (void 0 === option)
										throw Error('Id not found');
									option.subscribed
										? (yield identity.zZ.unsubscribe(
												option,
										  ),
										  dispatch(unsubscribe(id)))
										: (yield identity.zZ.subscribe(option),
										  dispatch(subscribe(id)));
								} catch (e) {
									dispatch(error(e));
								}
							});
							return function toggleConsentSubscription(_x) {
								return _ref2.apply(this, arguments);
							};
						})(),
						openManageCookies = () => {
							null == importedCmp ||
								importedCmp.showPrivacyManager();
						};
					return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
						emotion_react_jsx_runtime_browser_esm.HY,
						{
							children: (0,
							emotion_react_jsx_runtime_browser_esm.tZ)('div', {
								css: dataPrivacyWrapper,
								children: (0,
								emotion_react_jsx_runtime_browser_esm.tZ)(
									'div',
									{
										css: (0, emotion_react_browser_esm.iv)(
											_objectSpread(
												_objectSpread(
													{},
													(0, grid.YW)(1, 12),
												),
												{},
												{
													[mq.Dp.tablet]:
														_objectSpread(
															{},
															(0, grid.YW)(1, 12),
														),
													[mq.Dp.desktop]:
														_objectSpread(
															{},
															(0, grid.YW)(1, 10),
														),
													[mq.Dp.wide]: _objectSpread(
														{},
														(0, grid.YW)(1, 14),
													),
												},
											),
											'',
											'',
										),
										children: (0,
										emotion_react_jsx_runtime_browser_esm.BX)(
											WithStandardTopMargin.z,
											{
												children: [
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														YourDataSection,
														{
															consents,
															toggleConsent:
																toggleConsentSubscription,
														},
													),
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														Lines.x,
														{ n: 1 },
													),
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														CookiesOnThisBrowserSection,
														{
															onClick:
																openManageCookies,
														},
													),
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														Lines.x,
														{ n: 1 },
													),
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														LearnMoreSection,
														{},
													),
												],
											},
										),
									},
								),
							}),
						},
					);
				},
				DataPrivacy = () =>
					(0, emotion_react_jsx_runtime_browser_esm.tZ)(Page._, {
						selectedNavItem: NavConfig.qy.dataPrivacy,
						pageTitle: 'Data privacy',
						children: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							DataPrivacyPage,
							{},
						),
					});
			const DataPrivacy_stories = {
				title: 'Pages/DataPrivacy',
				component: DataPrivacy,
				decorators: [ReactRouterDecorator.R],
				parameters: { layout: 'fullscreen' },
			};
			var Default = {
				render: () =>
					(0, emotion_react_jsx_runtime_browser_esm.tZ)(
						DataPrivacy,
						{},
					),
				parameters: {
					msw: [
						http.d.get('/idapi/consents', () =>
							HttpResponse.Z.json(consents.X),
						),
						http.d.get('/idapi/user', () =>
							HttpResponse.Z.json(user.E),
						),
					],
				},
			};
			Default.parameters = {
				...Default.parameters,
				docs: {
					...Default.parameters?.docs,
					source: {
						originalSource:
							"{\n  render: () => {\n    return <DataPrivacy />;\n  },\n  parameters: {\n    msw: [http.get('/idapi/consents', () => {\n      return HttpResponse.json(consents);\n    }), http.get('/idapi/user', () => {\n      return HttpResponse.json(user);\n    })]\n  }\n}",
						...Default.parameters?.docs?.source,
					},
				},
			};
			const __namedExportsOrder = ['Default'];
		},
	},
]);
//# sourceMappingURL=components-mma-dataPrivacy-DataPrivacy-stories.5a2d0cb3.iframe.bundle.js.map
