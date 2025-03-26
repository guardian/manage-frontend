'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[1748],
	{
		'./client/components/mma/identity/GenericErrorMessage.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				k: () => GenericErrorMessage,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
				react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./node_modules/react/index.js',
				),
				_sharedStyles__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./client/components/mma/identity/sharedStyles.ts',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
			var _ref = { name: 'pr10xp', styles: 'margin-bottom:10px' },
				_ref2 = { name: '1ykowef', styles: 'margin-bottom:0' },
				GenericErrorMessage = (0,
				react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((_, ref) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.BX)(
						'div',
						{
							ref,
							css: _sharedStyles__WEBPACK_IMPORTED_MODULE_1__.Ig,
							children: [
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
									'p',
									{
										css: _ref,
										children:
											'Sorry, something went wrong!',
									},
								),
								(0,
								_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
									'p',
									{
										css: _ref2,
										children: (0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
											'a',
											{
												css: (0,
												_emotion_react__WEBPACK_IMPORTED_MODULE_3__.iv)(
													{
														color: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_4__
															.palette.sport[300],
														cursor: 'pointer',
													},
													'',
													'',
												),
												onClick: () =>
													window.location.reload(),
												children: 'Refresh this page',
											},
										),
									},
								),
							],
						},
					),
				);
			try {
				(GenericErrorMessage.displayName = 'GenericErrorMessage'),
					(GenericErrorMessage.__docgenInfo = {
						description: '',
						displayName: 'GenericErrorMessage',
						props: {},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/identity/GenericErrorMessage.tsx#GenericErrorMessage'
						] = {
							docgenInfo: GenericErrorMessage.__docgenInfo,
							name: 'GenericErrorMessage',
							path: 'client/components/mma/identity/GenericErrorMessage.tsx#GenericErrorMessage',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/identity/IdentityLocations.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				e: () => IdentityLocations,
			});
			var domain,
				_server_config__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__('./server/config.ts'),
				url = (subdomain, domain, path) =>
					'https://'
						.concat(subdomain, '.')
						.concat(domain)
						.concat(path || ''),
				DOMAIN =
					'undefined' != typeof window && window.guardian
						? window.guardian.domain
						: _server_config__WEBPACK_IMPORTED_MODULE_0__.a.DOMAIN,
				IMAGE_DOMAIN =
					'theguardian.com' === DOMAIN
						? 'guim.co.uk'
						: 'guimcode.co.uk',
				IDAPI_URL =
					'thegulocal.com' === DOMAIN
						? '/idapicodeproxy'
						: url('idapi', DOMAIN),
				AVATAR_URL =
					'thegulocal.com' === DOMAIN
						? '/avatarcodeproxy'
						: url('avatar', DOMAIN),
				IdentityLocations = {
					COMMUNITY_FAQS: url(
						'www',
						(domain = DOMAIN),
						'/community-faqs',
					),
					CONTACT_AND_DELIVERY_HELP: url(
						'manage',
						'theguardian.com',
						'/help-centre/article/i-need-to-change-my-delivery-address',
					),
					CHANGE_EMAIL: url('profile', domain, '/account/edit'),
					RESET_PASSWORD: url('profile', domain, '/reset'),
					MANAGE_JOB_ALERTS: url(
						'jobs',
						domain,
						'/your-jobs/?ActiveSection=JbeList',
					),
					VERIFY_EMAIL: url('profile', domain, '/verify-email'),
					IDAPI: IDAPI_URL,
					AVATAR: AVATAR_URL,
					AVATAR_USER_IMAGES: url('avatar', IMAGE_DOMAIN, '/user'),
					DELETE_ACCOUNT: url('profile', domain, '/delete'),
				};
		},
		'./client/components/mma/identity/form/FormField.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				A5: () => FormSelectField,
				E$: () => FormEmailField,
				Kb: () => FormTelephoneField,
				Xn: () => FormTextField,
			});
			var formik__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
					'./node_modules/formik/dist/formik.esm.js',
				),
				react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					'./node_modules/react/index.js',
				),
				_sharedStyles__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./client/components/mma/identity/sharedStyles.ts',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				FormField = (props) => {
					var { name, label, formikProps, children } = props,
						error = ((name, _ref) => {
							var { errors, touched, status } = _ref,
								isTouched = touched[name],
								error = errors[name];
							return error && isTouched
								? error
								: status && isTouched
								? status[name]
								: void 0;
						})(name, formikProps),
						field = (0,
						react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(
							children,
							{ name },
						);
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.BX)(
						'label',
						{
							css: [
								_sharedStyles__WEBPACK_IMPORTED_MODULE_1__.pb,
								error &&
									_sharedStyles__WEBPACK_IMPORTED_MODULE_1__.ll,
								'',
								'',
							],
							children: [
								label,
								field,
								error
									? (0,
									  _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
											'p',
											{ children: error },
									  )
									: null,
							],
						},
					);
				},
				FormSelectField = (props) => {
					var {
							options,
							firstOptionLabel,
							firstOptionDisabled = !1,
							labelModifier,
						} = props,
						optionEls = options.map((o) => {
							var optionLabel = labelModifier
								? labelModifier(o)
								: o;
							return (0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
								'option',
								{ value: o, children: optionLabel },
								o,
							);
						});
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
						FormField,
						{
							name: props.name,
							label: props.label,
							formikProps: props.formikProps,
							children: (0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.BX)(
								formik__WEBPACK_IMPORTED_MODULE_3__.gN,
								{
									component: 'select',
									name,
									'data-qm-masking': 'blocklist',
									children: [
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
											'option',
											{
												disabled: firstOptionDisabled,
												value: '',
												children: firstOptionLabel,
											},
										),
										optionEls,
									],
								},
							),
						},
					);
				},
				getInputFieldOfType = (type) => (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
						FormField,
						{
							name: props.name,
							label: props.label,
							formikProps: props.formikProps,
							children: (0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.tZ)(
								formik__WEBPACK_IMPORTED_MODULE_3__.gN,
								{ type, 'data-qm-masking': 'blocklist' },
							),
						},
					),
				FormTextField = getInputFieldOfType('text'),
				FormNumberField = getInputFieldOfType('number'),
				FormEmailField = getInputFieldOfType('email'),
				FormTelephoneField = getInputFieldOfType('tel');
			try {
				(FormSelectField.displayName = 'FormSelectField'),
					(FormSelectField.__docgenInfo = {
						description: '',
						displayName: 'FormSelectField',
						props: {
							name: {
								defaultValue: null,
								description: '',
								name: 'name',
								required: !0,
								type: { name: 'string' },
							},
							label: {
								defaultValue: null,
								description: '',
								name: 'label',
								required: !0,
								type: { name: 'string' },
							},
							formikProps: {
								defaultValue: null,
								description: '',
								name: 'formikProps',
								required: !0,
								type: {
									name: 'FormikSharedConfig<{}> & FormikState<T> & FormikHelpers<T> & FormikHandlers & FormikComputedProps<T> & FormikRegistration & { ...; }',
								},
							},
							options: {
								defaultValue: null,
								description: '',
								name: 'options',
								required: !0,
								type: { name: 'string[]' },
							},
							labelModifier: {
								defaultValue: null,
								description: '',
								name: 'labelModifier',
								required: !1,
								type: { name: '((option: string) => string)' },
							},
							firstOptionDisabled: {
								defaultValue: null,
								description: '',
								name: 'firstOptionDisabled',
								required: !1,
								type: { name: 'boolean' },
							},
							firstOptionLabel: {
								defaultValue: null,
								description: '',
								name: 'firstOptionLabel',
								required: !1,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/identity/form/FormField.tsx#FormSelectField'
						] = {
							docgenInfo: FormSelectField.__docgenInfo,
							name: 'FormSelectField',
							path: 'client/components/mma/identity/form/FormField.tsx#FormSelectField',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(FormTextField.displayName = 'FormTextField'),
					(FormTextField.__docgenInfo = {
						description: '',
						displayName: 'FormTextField',
						props: {
							name: {
								defaultValue: null,
								description: '',
								name: 'name',
								required: !0,
								type: { name: 'string' },
							},
							label: {
								defaultValue: null,
								description: '',
								name: 'label',
								required: !0,
								type: { name: 'string' },
							},
							formikProps: {
								defaultValue: null,
								description: '',
								name: 'formikProps',
								required: !0,
								type: {
									name: 'FormikSharedConfig<{}> & FormikState<T> & FormikHelpers<T> & FormikHandlers & FormikComputedProps<T> & FormikRegistration & { ...; }',
								},
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/identity/form/FormField.tsx#FormTextField'
						] = {
							docgenInfo: FormTextField.__docgenInfo,
							name: 'FormTextField',
							path: 'client/components/mma/identity/form/FormField.tsx#FormTextField',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(FormNumberField.displayName = 'FormNumberField'),
					(FormNumberField.__docgenInfo = {
						description: '',
						displayName: 'FormNumberField',
						props: {
							name: {
								defaultValue: null,
								description: '',
								name: 'name',
								required: !0,
								type: { name: 'string' },
							},
							label: {
								defaultValue: null,
								description: '',
								name: 'label',
								required: !0,
								type: { name: 'string' },
							},
							formikProps: {
								defaultValue: null,
								description: '',
								name: 'formikProps',
								required: !0,
								type: {
									name: 'FormikSharedConfig<{}> & FormikState<T> & FormikHelpers<T> & FormikHandlers & FormikComputedProps<T> & FormikRegistration & { ...; }',
								},
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/identity/form/FormField.tsx#FormNumberField'
						] = {
							docgenInfo: FormNumberField.__docgenInfo,
							name: 'FormNumberField',
							path: 'client/components/mma/identity/form/FormField.tsx#FormNumberField',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(FormEmailField.displayName = 'FormEmailField'),
					(FormEmailField.__docgenInfo = {
						description: '',
						displayName: 'FormEmailField',
						props: {
							name: {
								defaultValue: null,
								description: '',
								name: 'name',
								required: !0,
								type: { name: 'string' },
							},
							label: {
								defaultValue: null,
								description: '',
								name: 'label',
								required: !0,
								type: { name: 'string' },
							},
							formikProps: {
								defaultValue: null,
								description: '',
								name: 'formikProps',
								required: !0,
								type: {
									name: 'FormikSharedConfig<{}> & FormikState<T> & FormikHelpers<T> & FormikHandlers & FormikComputedProps<T> & FormikRegistration & { ...; }',
								},
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/identity/form/FormField.tsx#FormEmailField'
						] = {
							docgenInfo: FormEmailField.__docgenInfo,
							name: 'FormEmailField',
							path: 'client/components/mma/identity/form/FormField.tsx#FormEmailField',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(FormTelephoneField.displayName = 'FormTelephoneField'),
					(FormTelephoneField.__docgenInfo = {
						description: '',
						displayName: 'FormTelephoneField',
						props: {
							name: {
								defaultValue: null,
								description: '',
								name: 'name',
								required: !0,
								type: { name: 'string' },
							},
							label: {
								defaultValue: null,
								description: '',
								name: 'label',
								required: !0,
								type: { name: 'string' },
							},
							formikProps: {
								defaultValue: null,
								description: '',
								name: 'formikProps',
								required: !0,
								type: {
									name: 'FormikSharedConfig<{}> & FormikState<T> & FormikHelpers<T> & FormikHandlers & FormikComputedProps<T> & FormikRegistration & { ...; }',
								},
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/identity/form/FormField.tsx#FormTelephoneField'
						] = {
							docgenInfo: FormTelephoneField.__docgenInfo,
							name: 'FormTelephoneField',
							path: 'client/components/mma/identity/form/FormField.tsx#FormTelephoneField',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./shared/fileUploadUtils.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				RM: () => MAX_FILE_ATTACHMENT_SIZE_KB,
				Tq: () => VALID_IMAGE_FILE_EXTENSIONS,
				Zt: () => VALID_IMAGE_FILE_MIME_TYPES,
				hu: () => base64FromFile,
			});
			__webpack_require__('./node_modules/buffer/index.js').lW;
			var base64FromFile = (file) =>
					new Promise((resolve, reject) => {
						var reader = new FileReader();
						reader.addEventListener(
							'load',
							() => {
								resolve(
									removeDataUrlDeclarationFromBase64(
										reader.result,
									),
								);
							},
							!1,
						),
							reader.addEventListener(
								'error',
								() => {
									reject(new Error('base64FromFile error'));
								},
								!1,
							),
							reader.readAsDataURL(file);
					}),
				MAX_FILE_ATTACHMENT_SIZE_KB = 5e3,
				VALID_IMAGE_FILE_MIME_TYPES = [
					'image/png',
					'image/jpeg',
					'image/jpg',
					'image/gif',
					'application/pdf',
				],
				VALID_IMAGE_FILE_EXTENSIONS = [
					'.png',
					'.jpeg',
					'.jpg',
					'.gif',
					'.pdf',
				],
				removeDataUrlDeclarationFromBase64 = (fileBase64) =>
					fileBase64.replace(/data:(.*)base64,/m, '');
		},
		'./client/components/mma/identity/publicProfile/PublicProfile.stories.tsx':
			(
				__unused_webpack_module,
				__webpack_exports__,
				__webpack_require__,
			) => {
				__webpack_require__.r(__webpack_exports__),
					__webpack_require__.d(__webpack_exports__, {
						Default: () => Default,
						__namedExportsOrder: () => __namedExportsOrder,
						default: () => PublicProfile_stories,
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
					user = __webpack_require__('./client/fixtures/user.ts'),
					esm = __webpack_require__(
						'./node_modules/@sentry/minimal/esm/index.js',
					),
					react = __webpack_require__(
						'./node_modules/react/index.js',
					),
					analytics = __webpack_require__(
						'./client/utilities/analytics.ts',
					),
					NavConfig = __webpack_require__(
						'./client/components/shared/nav/NavConfig.tsx',
					),
					Spinner = __webpack_require__(
						'./client/components/shared/Spinner.tsx',
					),
					WithStandardTopMargin = __webpack_require__(
						'./client/components/shared/WithStandardTopMargin.tsx',
					),
					Page = __webpack_require__(
						'./client/components/mma/Page.tsx',
					),
					GenericErrorMessage = __webpack_require__(
						'./client/components/mma/identity/GenericErrorMessage.tsx',
					),
					identity = __webpack_require__(
						'./client/components/mma/identity/identity.ts',
					),
					IdentityLocations = __webpack_require__(
						'./client/components/mma/identity/IdentityLocations.ts',
					),
					Lines = __webpack_require__(
						'./client/components/mma/identity/Lines.tsx',
					),
					PageSection = __webpack_require__(
						'./client/components/mma/identity/PageSection.tsx',
					),
					sharedStyles = __webpack_require__(
						'./client/components/mma/identity/sharedStyles.ts',
					),
					emotion_react_browser_esm = __webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
					typography = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/typography.js',
					),
					palette = __webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__generated__/palette.js',
					),
					Button = __webpack_require__(
						'./node_modules/@guardian/source/dist/react-components/button/Button.js',
					),
					formik_esm = __webpack_require__(
						'./node_modules/formik/dist/formik.esm.js',
					),
					utilities_fetch = __webpack_require__(
						'./client/utilities/fetch.ts',
					),
					fileUploadUtils = __webpack_require__(
						'./shared/fileUploadUtils.ts',
					),
					models = __webpack_require__(
						'./client/components/mma/identity/models.ts',
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
				function _asyncToGenerator(fn) {
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
				}
				var isAvatarAPIErrorResponse = (response) =>
						!(!response.message || !response.errors) &&
						response.errors.length > 0,
					toAvatarError = (e) => {
						var { NOT_FOUND, VALIDATION } = models.ErrorTypes;
						return {
							type:
								'Avatar not found' === e.message
									? NOT_FOUND
									: VALIDATION,
							error: e.errors,
						};
					},
					read = (function () {
						var _ref = _asyncToGenerator(function* () {
							var response = yield (0, utilities_fetch.n4)(
								'/aapi/avatar',
							).then((res) => res.json());
							if (isAvatarAPIErrorResponse(response)) {
								var avatarErrorObj = toAvatarError(response);
								throw new Error(
									'Error: '.concat(avatarErrorObj.type),
									{ cause: avatarErrorObj.error },
								);
							}
							return response;
						});
						return function read() {
							return _ref.apply(this, arguments);
						};
					})(),
					write = (function () {
						var _ref2 = _asyncToGenerator(function* (file) {
							var payload = {
									name: file.name,
									type: file.type,
									contents: yield (0, fileUploadUtils.hu)(
										file,
									),
								},
								response = yield fetch('/aapi/avatar', {
									method: 'POST',
									body: JSON.stringify(payload),
									headers: {
										'Content-Type':
											'text/plain;charset=UTF-8',
									},
								}).then((res) => res.json());
							if (isAvatarAPIErrorResponse(response)) {
								var avatarErrorObj = toAvatarError(response);
								throw new Error(
									'Error: '.concat(avatarErrorObj.type),
									{ cause: avatarErrorObj.error },
								);
							}
						});
						return function write(_x) {
							return _ref2.apply(this, arguments);
						};
					})();
				function useAsyncSource_asyncGeneratorStep(
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
				var ActionType = (function (ActionType) {
						return (
							(ActionType.ERROR = 'ERROR'),
							(ActionType.FETCH = 'FETCH'),
							(ActionType.SUCCESS = 'SUCCESS'),
							ActionType
						);
					})(ActionType || {}),
					FetchStatus = (function (FetchStatus) {
						return (
							(FetchStatus.ERROR = 'ERROR'),
							(FetchStatus.FETCHING = 'FETCHING'),
							(FetchStatus.INITIAL = 'INITIAL'),
							(FetchStatus.SUCCESS = 'SUCCESS'),
							FetchStatus
						);
					})(FetchStatus || {}),
					initialState = {
						data: null,
						error: null,
						status: FetchStatus.INITIAL,
					},
					reducer = (state, action) => {
						var { FETCH, ERROR, SUCCESS } = ActionType,
							{ payload } = action;
						switch (action.type) {
							case FETCH:
								return {
									data: null,
									error: null,
									status: FetchStatus.FETCHING,
								};
							case ERROR:
								return {
									data: null,
									error: action.payload,
									status: FetchStatus.ERROR,
								};
							case SUCCESS:
								return {
									data: payload,
									error: null,
									status: FetchStatus.SUCCESS,
								};
							default:
								return state;
						}
					},
					useAsyncSource = (getter, errorHandler) => {
						var [state, dispatch] = (0, react.useReducer)(
							reducer,
							initialState,
						);
						return [
							state,
							(function () {
								var _ref =
									(function useAsyncSource_asyncToGenerator(
										fn,
									) {
										return function () {
											var self = this,
												args = arguments;
											return new Promise(function (
												resolve,
												reject,
											) {
												var gen = fn.apply(self, args);
												function _next(value) {
													useAsyncSource_asyncGeneratorStep(
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
													useAsyncSource_asyncGeneratorStep(
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
									})(function* () {
										dispatch({ type: ActionType.FETCH });
										try {
											var response = yield getter(
												...arguments,
											);
											dispatch(
												((payload = response),
												{
													type: ActionType.SUCCESS,
													payload,
												}),
											);
										} catch (e) {
											dispatch(
												((error = e),
												{
													type: ActionType.ERROR,
													payload: error,
												}),
											),
												errorHandler && errorHandler(e);
										}
										var error, payload;
										return state;
									});
								return function doFetch() {
									return _ref.apply(this, arguments);
								};
							})(),
						];
					},
					isSuccessful = (state) =>
						state.status === FetchStatus.SUCCESS,
					emotion_react_jsx_runtime_browser_esm = __webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					);
				function AvatarSection_asyncGeneratorStep(
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
				var imgCss = {
						name: '66tyzv',
						styles: 'border:0;border-radius:50%;height:60px;width:60px',
					},
					errorHandler = (e) => {
						((e) =>
							e.type && e.type === models.ErrorTypes.NOT_FOUND)(
							e,
						) ||
							(esm.Tb(e),
							(0, analytics.L9)({
								eventCategory: 'publicProfileError',
								eventAction: 'error',
								eventLabel: e.toString(),
							}));
					},
					AvatarSection = (props) => {
						var { userId } = props,
							[avatarSaveState, saveAvatar] = useAsyncSource(
								write,
								errorHandler,
							),
							[avatarGetState, getAvatar] = useAsyncSource(
								read,
								errorHandler,
							);
						(0, react.useCallback)(() => {
							getAvatar();
						}, [getAvatar]);
						var error,
							message,
							state,
							avatarDisplay = () => {
								var state,
									url = isSuccessful(avatarGetState)
										? ((state = avatarGetState), state.data)
												.data.avatarUrl
										: ''
												.concat(
													IdentityLocations.e
														.AVATAR_USER_IMAGES,
													'/',
												)
												.concat(userId),
									loading = ((state) =>
										state.status === FetchStatus.FETCHING)(
										avatarGetState,
									);
								return (0,
								emotion_react_jsx_runtime_browser_esm.tZ)(
									emotion_react_jsx_runtime_browser_esm.HY,
									{
										children: loading
											? (0,
											  emotion_react_jsx_runtime_browser_esm.tZ)(
													Spinner.$,
													{},
											  )
											: (0,
											  emotion_react_jsx_runtime_browser_esm.tZ)(
													'img',
													{ css: imgCss, src: url },
											  ),
									},
								);
							};
						return (0, emotion_react_jsx_runtime_browser_esm.BX)(
							PageSection.N,
							{
								title: 'Profile image',
								description:
									'This image will appear next to your comments. Only .jpg, .png or .gif files of up to 1MB are accepted',
								children: [
									((state = avatarSaveState),
									state.status === FetchStatus.ERROR
										? ((error = avatarSaveState.error),
										  (message =
												error.type &&
												error.type ===
													models.ErrorTypes.VALIDATION
													? error.error
													: 'An error occured trying to upload your avatar. Please try again.'),
										  (0,
										  emotion_react_jsx_runtime_browser_esm.tZ)(
												'div',
												{
													css: sharedStyles.Ig,
													children: message,
												},
										  ))
										: null),
									isSuccessful(avatarSaveState)
										? (0,
										  emotion_react_jsx_runtime_browser_esm.tZ)(
												'div',
												{
													css: (0,
													emotion_react_browser_esm.iv)(
														typography.AjP,
														';line-height:18px;border-bottom:1px solid ',
														palette.palette
															.success[400],
														';border-top:1px solid ',
														palette.palette
															.success[400],
														';color:',
														palette.palette
															.success[400],
														';margin-top:6px;padding:7px 8px;',
														'',
													),
													children:
														'Thank you for uploading your avatar. It will be checked by Guardian moderators shortly.',
												},
										  )
										: (0,
										  emotion_react_jsx_runtime_browser_esm.tZ)(
												formik_esm.J9,
												{
													initialValues: {
														file: null,
													},
													onSubmit: (function () {
														var _ref =
															(function AvatarSection_asyncToGenerator(
																fn,
															) {
																return function () {
																	var self =
																			this,
																		args =
																			arguments;
																	return new Promise(
																		function (
																			resolve,
																			reject,
																		) {
																			var gen =
																				fn.apply(
																					self,
																					args,
																				);
																			function _next(
																				value,
																			) {
																				AvatarSection_asyncGeneratorStep(
																					gen,
																					resolve,
																					reject,
																					_next,
																					_throw,
																					'next',
																					value,
																				);
																			}
																			function _throw(
																				err,
																			) {
																				AvatarSection_asyncGeneratorStep(
																					gen,
																					resolve,
																					reject,
																					_next,
																					_throw,
																					'throw',
																					err,
																				);
																			}
																			_next(
																				void 0,
																			);
																		},
																	);
																};
															})(function* (
																values,
																formikBag,
															) {
																yield saveAvatar(
																	values.file,
																),
																	formikBag.setSubmitting(
																		!1,
																	);
															});
														return function (
															_x,
															_x2,
														) {
															return _ref.apply(
																this,
																arguments,
															);
														};
													})(),
													children: (formikBag) =>
														(0,
														emotion_react_jsx_runtime_browser_esm.BX)(
															formik_esm.l0,
															{
																children: [
																	(0,
																	emotion_react_jsx_runtime_browser_esm.BX)(
																		'label',
																		{
																			css: sharedStyles.pb,
																			children:
																				[
																					avatarDisplay(),
																					(0,
																					emotion_react_jsx_runtime_browser_esm.tZ)(
																						'input',
																						{
																							disabled:
																								formikBag.isSubmitting,
																							type: 'file',
																							name: 'file',
																							accept: 'image/gif, image/jpeg, image/png',
																							onChange:
																								(
																									e,
																								) => {
																									var target =
																										e.currentTarget;
																									target.files &&
																										formikBag.setFieldValue(
																											'file',
																											target
																												.files[0],
																										);
																								},
																						},
																					),
																				],
																		},
																	),
																	(0,
																	emotion_react_jsx_runtime_browser_esm.tZ)(
																		Button.z,
																		{
																			disabled:
																				formikBag.isSubmitting,
																			onClick:
																				() =>
																					formikBag.submitForm(),
																			children:
																				'Upload image',
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
					(AvatarSection.displayName = 'AvatarSection'),
						(AvatarSection.__docgenInfo = {
							description: '',
							displayName: 'AvatarSection',
							props: {
								userId: {
									defaultValue: null,
									description: '',
									name: 'userId',
									required: !0,
									type: { name: 'string' },
								},
							},
						}),
						'undefined' != typeof STORYBOOK_REACT_CLASSES &&
							(STORYBOOK_REACT_CLASSES[
								'client/components/mma/identity/publicProfile/AvatarSection.tsx#AvatarSection'
							] = {
								docgenInfo: AvatarSection.__docgenInfo,
								name: 'AvatarSection',
								path: 'client/components/mma/identity/publicProfile/AvatarSection.tsx#AvatarSection',
							});
				} catch (__react_docgen_typescript_loader_error) {}
				var es = __webpack_require__('./node_modules/yup/es/index.js'),
					FormField = __webpack_require__(
						'./client/components/mma/identity/form/FormField.tsx',
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
									var res = prim.call(
										input,
										hint || 'default',
									);
									if ('object' != typeof res) return res;
									throw new TypeError(
										'@@toPrimitive must return a primitive value.',
									);
								}
								return ('string' === hint ? String : Number)(
									input,
								);
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
				function ProfileFormSection_asyncGeneratorStep(
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
				var _ref,
					formValidationSchema = es.Ry().shape({
						username: es
							.Z_()
							.min(6, 'Must be 6 characters minimum')
							.max(20, 'Must be 20 characters or less'),
					}),
					fieldSetCss = {
						name: '1t1ytme',
						styles: 'border:0;margin:0;padding:0',
					},
					EnhancedProfileForm = (0, formik_esm.j0)({
						mapPropsToValues: (props) => props.user,
						handleSubmit:
							((_ref =
								(function ProfileFormSection_asyncToGenerator(
									fn,
								) {
									return function () {
										var self = this,
											args = arguments;
										return new Promise(function (
											resolve,
											reject,
										) {
											var gen = fn.apply(self, args);
											function _next(value) {
												ProfileFormSection_asyncGeneratorStep(
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
												ProfileFormSection_asyncGeneratorStep(
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
								})(function* (values, formikBag) {
									var { setSubmitting, setStatus } =
											formikBag,
										{ saveUser, onSuccess, onError } =
											formikBag.props;
									setStatus(void 0);
									try {
										yield saveUser(values),
											onSuccess(values);
									} catch (e) {
										e.type &&
										e.type === models.ErrorTypes.VALIDATION
											? setStatus(e.error)
											: onError(e);
									}
									setSubmitting(!1);
								})),
							function handleSubmit(_x, _x2) {
								return _ref.apply(this, arguments);
							}),
						validationSchema: formValidationSchema,
					})((props) => {
						return (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							formik_esm.l0,
							{
								children: (0,
								emotion_react_jsx_runtime_browser_esm.BX)(
									'fieldset',
									{
										css: fieldSetCss,
										disabled: props.isSubmitting,
										'data-qm-masking': 'blocklist',
										children: [
											((formikProps = props),
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												emotion_react_jsx_runtime_browser_esm.HY,
												{
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															FormField.Xn,
															{
																name: 'username',
																label: 'Username',
																formikProps,
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'p',
															{
																css: sharedStyles.kS,
																children:
																	'You need to set a username before you can comment. You can only set your username once. It must be 6-20 characters, letters and/or numbers.',
															},
														),
													],
												},
											)),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												Button.z,
												{
													onClick: () =>
														props.submitForm(),
													disabled:
														props.isSubmitting,
													children: 'Save changes',
												},
											),
										],
									},
								),
							},
						);
						var formikProps;
					}),
					ProfileFormSection = (props) =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							WithStandardTopMargin.z,
							{
								children: (0,
								emotion_react_jsx_runtime_browser_esm.tZ)(
									PageSection.N,
									{
										title: 'Profile',
										children: (0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											EnhancedProfileForm,
											_objectSpread({}, props),
										),
									},
								),
							},
						);
				try {
					(ProfileFormSection.displayName = 'ProfileFormSection'),
						(ProfileFormSection.__docgenInfo = {
							description: '',
							displayName: 'ProfileFormSection',
							props: {
								user: {
									defaultValue: null,
									description: '',
									name: 'user',
									required: !0,
									type: { name: 'User' },
								},
								saveUser: {
									defaultValue: null,
									description: '',
									name: 'saveUser',
									required: !0,
									type: {
										name: '(values: User) => Promise<User>',
									},
								},
								onError: {
									defaultValue: null,
									description: '',
									name: 'onError',
									required: !0,
									type: { name: '(error: any) => void' },
								},
								onSuccess: {
									defaultValue: null,
									description: '',
									name: 'onSuccess',
									required: !0,
									type: { name: '(user: User) => void' },
								},
							},
						}),
						'undefined' != typeof STORYBOOK_REACT_CLASSES &&
							(STORYBOOK_REACT_CLASSES[
								'client/components/mma/identity/publicProfile/ProfileFormSection.tsx#ProfileFormSection'
							] = {
								docgenInfo: ProfileFormSection.__docgenInfo,
								name: 'ProfileFormSection',
								path: 'client/components/mma/identity/publicProfile/ProfileFormSection.tsx#ProfileFormSection',
							});
				} catch (__react_docgen_typescript_loader_error) {}
				function PublicProfile_asyncGeneratorStep(
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
				var hasUsername = (user) => !!user.username,
					_ref2 = { name: 'mmdt3g', styles: 'font-size:14px' },
					PublicProfile = (_) => {
						var [user, setUser] = (0, react.useState)(),
							[error, setError] = (0, react.useState)(!1),
							errorRef = (0, react.createRef)(),
							handleGeneralError = (e) => {
								setError(!0),
									esm.Tb(e),
									(0, analytics.L9)({
										eventCategory: 'publicProfileError',
										eventAction: 'error',
										eventLabel: e.toString(),
									});
							};
						(0, react.useEffect)(() => {
							identity.Q.getCurrentUser()
								.then((u) => {
									setUser(u);
								})
								.catch(handleGeneralError);
						}, []);
						var setUsername = (function () {
							var _ref = (function PublicProfile_asyncToGenerator(
								fn,
							) {
								return function () {
									var self = this,
										args = arguments;
									return new Promise(function (
										resolve,
										reject,
									) {
										var gen = fn.apply(self, args);
										function _next(value) {
											PublicProfile_asyncGeneratorStep(
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
											PublicProfile_asyncGeneratorStep(
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
							})(function* (values) {
								return yield identity.Q.setUsername(values);
							});
							return function setUsername(_x) {
								return _ref.apply(this, arguments);
							};
						})();
						(0, react.useEffect)(() => {
							error &&
								errorRef.current &&
								window.scrollTo(
									0,
									errorRef.current.offsetTop - 20,
								);
						}, [error, errorRef]);
						var u,
							loader = (0,
							emotion_react_jsx_runtime_browser_esm.tZ)(
								WithStandardTopMargin.z,
								{
									children: (0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										Spinner.$,
										{
											loadingMessage:
												'Loading your profile ...',
										},
									),
								},
							),
							usernameDisplay = (u) =>
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									emotion_react_jsx_runtime_browser_esm.HY,
									{
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												WithStandardTopMargin.z,
												{
													children: (0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														PageSection.N,
														{
															title: 'Username',
															children: (0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'span',
																{
																	'data-cy':
																		'username-display',
																	children:
																		u.username,
																},
															),
														},
													),
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												WithStandardTopMargin.z,
												{
													children: (0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														Lines.x,
														{ n: 1 },
													),
												},
											),
										],
									},
								),
							usernameInputForm = (u) =>
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									emotion_react_jsx_runtime_browser_esm.HY,
									{
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												ProfileFormSection,
												{
													user: u,
													saveUser: (values) =>
														setUsername(values),
													onError: handleGeneralError,
													onSuccess: setUser,
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												WithStandardTopMargin.z,
												{
													children: (0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														Lines.x,
														{ n: 1 },
													),
												},
											),
										],
									},
								);
						return (0, emotion_react_jsx_runtime_browser_esm.BX)(
							Page._,
							{
								selectedNavItem: NavConfig.qy.profile,
								pageTitle: 'Edit your profile',
								children: [
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										WithStandardTopMargin.z,
										{
											children: error
												? (0,
												  emotion_react_jsx_runtime_browser_esm.tZ)(
														GenericErrorMessage.k,
														{ ref: errorRef },
												  )
												: null,
										},
									),
									user
										? ((u = user),
										  (0,
										  emotion_react_jsx_runtime_browser_esm.BX)(
												emotion_react_jsx_runtime_browser_esm.HY,
												{
													children: [
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															WithStandardTopMargin.z,
															{
																children: (0,
																emotion_react_jsx_runtime_browser_esm.BX)(
																	'p',
																	{
																		css: _ref2,
																		children:
																			[
																				'These details will be publicly visible to everyone who sees your profile in the',
																				' ',
																				(0,
																				emotion_react_jsx_runtime_browser_esm.tZ)(
																					'a',
																					{
																						css: sharedStyles.Fe,
																						href: IdentityLocations
																							.e
																							.COMMUNITY_FAQS,
																						children:
																							'commenting',
																					},
																				),
																				' ',
																				'section.',
																			],
																	},
																),
															},
														),
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															WithStandardTopMargin.z,
															{
																children: (0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	Lines.x,
																	{ n: 1 },
																),
															},
														),
														hasUsername(u)
															? usernameDisplay(u)
															: usernameInputForm(
																	u,
															  ),
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															WithStandardTopMargin.z,
															{
																children: (0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	AvatarSection,
																	{
																		userId: u.id,
																	},
																),
															},
														),
													],
												},
										  ))
										: loader,
								],
							},
						);
					};
				try {
					(PublicProfile.displayName = 'PublicProfile'),
						(PublicProfile.__docgenInfo = {
							description: '',
							displayName: 'PublicProfile',
							props: {
								path: {
									defaultValue: null,
									description: '',
									name: 'path',
									required: !1,
									type: { name: 'string' },
								},
							},
						}),
						'undefined' != typeof STORYBOOK_REACT_CLASSES &&
							(STORYBOOK_REACT_CLASSES[
								'client/components/mma/identity/publicProfile/PublicProfile.tsx#PublicProfile'
							] = {
								docgenInfo: PublicProfile.__docgenInfo,
								name: 'PublicProfile',
								path: 'client/components/mma/identity/publicProfile/PublicProfile.tsx#PublicProfile',
							});
				} catch (__react_docgen_typescript_loader_error) {}
				const PublicProfile_stories = {
					title: 'Pages/Profile',
					component: PublicProfile,
					decorators: [ReactRouterDecorator.R],
					parameters: { layout: 'fullscreen' },
				};
				var Default = {
					render: () =>
						(0, emotion_react_jsx_runtime_browser_esm.tZ)(
							PublicProfile,
							{},
						),
					parameters: {
						msw: [
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
								"{\n  render: () => {\n    return <PublicProfile />;\n  },\n  parameters: {\n    msw: [http.get('/idapi/user', () => {\n      return HttpResponse.json(user);\n    })]\n  }\n}",
							...Default.parameters?.docs?.source,
						},
					},
				};
				const __namedExportsOrder = ['Default'];
			},
	},
]);
