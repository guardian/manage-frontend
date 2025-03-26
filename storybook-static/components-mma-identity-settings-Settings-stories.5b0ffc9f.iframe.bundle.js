'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[1628],
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
		'./client/components/mma/identity/settings/Settings.stories.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					Default: () => Default,
					__namedExportsOrder: () => __namedExportsOrder,
					default: () => Settings_stories,
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
				react = __webpack_require__('./node_modules/react/index.js'),
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
				Page = __webpack_require__('./client/components/mma/Page.tsx'),
				GenericErrorMessage = __webpack_require__(
					'./client/components/mma/identity/GenericErrorMessage.tsx',
				),
				identity = __webpack_require__(
					'./client/components/mma/identity/identity.ts',
				),
				sharedStyles = __webpack_require__(
					'./client/components/mma/identity/sharedStyles.ts',
				),
				emotion_react_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
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
				formik_esm = __webpack_require__(
					'./node_modules/formik/dist/formik.esm.js',
				),
				FormField = __webpack_require__(
					'./client/components/mma/identity/form/FormField.tsx',
				),
				fetch = __webpack_require__('./client/utilities/fetch.ts');
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
			var remove = (function () {
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
					})(function* () {
						return yield (0,
						fetch.n4)('/idapi/user/telephone-number', (0, fetch.H6)((0, fetch.Jl)()));
					});
					return function remove() {
						return _ref.apply(this, arguments);
					};
				})(),
				IdentityLocations = __webpack_require__(
					'./client/components/mma/identity/IdentityLocations.ts',
				),
				Lines = __webpack_require__(
					'./client/components/mma/identity/Lines.tsx',
				),
				models = __webpack_require__(
					'./client/components/mma/identity/models.ts',
				),
				PageSection = __webpack_require__(
					'./client/components/mma/identity/PageSection.tsx',
				),
				emotion_react_jsx_runtime_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
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
			function SettingsFormSection_asyncGeneratorStep(
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
			function SettingsFormSection_asyncToGenerator(fn) {
				return function () {
					var self = this,
						args = arguments;
					return new Promise(function (resolve, reject) {
						var gen = fn.apply(self, args);
						function _next(value) {
							SettingsFormSection_asyncGeneratorStep(
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
							SettingsFormSection_asyncGeneratorStep(
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
			var _ref4,
				lines = () =>
					(0, emotion_react_jsx_runtime_browser_esm.tZ)(Lines.x, {
						n: 1,
						margin: '32px auto 16px',
					}),
				titles = Object.values(models.KT),
				registrationLocations = Object.values(models.BN),
				registrationLocationLabelModifier = (location) => {
					switch (location) {
						case 'Europe':
							return ''.concat(location, ' (non UK)');
						case 'Prefer not to say':
							return 'I prefer not to say';
						default:
							return location;
					}
				},
				deletePhoneNumber = (function () {
					var _ref2 = SettingsFormSection_asyncToGenerator(
						function* () {
							return (
								yield remove(),
								yield identity.Q.getCurrentUser()
							);
						},
					);
					return function deletePhoneNumber() {
						return _ref2.apply(this, arguments);
					};
				})(),
				_ref = {
					name: '1nawoxc',
					styles: 'list-style:none;margin:0;padding:0;li+li{margin-top:4px;}',
				},
				FormikForm = (0, formik_esm.j0)({
					mapPropsToValues: (props) => props.user,
					handleSubmit:
						((_ref4 = SettingsFormSection_asyncToGenerator(
							function* (values, formikBag) {
								var { resetForm, setSubmitting, setStatus } =
										formikBag,
									{ saveUser, onSuccess, onError, onDone } =
										formikBag.props;
								setStatus(void 0);
								try {
									var _response = yield saveUser(values);
									resetForm({ values: _response }),
										onSuccess(values, _response);
								} catch (e) {
									e.type &&
									e.type === models.ErrorTypes.VALIDATION
										? setStatus(e.error)
										: onError(e);
								}
								onDone(), setSubmitting(!1);
							},
						)),
						function handleSubmit(_x, _x2) {
							return _ref4.apply(this, arguments);
						}),
				})((props) => {
					var email,
						status,
						errors,
						correpondenceDescription = (0,
						emotion_react_jsx_runtime_browser_esm.BX)('span', {
							children: [
								'If you wish to change the delivery address for your paper subscription vouchers, home delivery, or Guardian Weekly please see',
								' ',
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'a',
									{
										css: sharedStyles.Fe,
										href: IdentityLocations.e
											.CONTACT_AND_DELIVERY_HELP,
										children:
											'Help with updating your contact or delivery details.',
									},
								),
							],
						}),
						locationDescription = (0,
						emotion_react_jsx_runtime_browser_esm.BX)('span', {
							children: [
								'We work out your location using cookies, so your experience is more relevant to you. You can make sure this is accurate when you are signed in by selecting your location. If you don’t want to share this information, please select',
								' ',
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									'span',
									{
										css: (0, emotion_react_browser_esm.iv)(
											{
												[mq.Dp.desktop]: {
													display: 'block',
												},
											},
											'',
											'',
										),
										children: '“I prefer not to say”.',
									},
								),
							],
						}),
						deletePhoneNumberButton = (0,
						emotion_react_jsx_runtime_browser_esm.tZ)(Button.z, {
							onClick: SettingsFormSection_asyncToGenerator(
								function* () {
									var response = yield deletePhoneNumber();
									props.resetForm({ values: response });
								},
							),
							children: 'Delete Phone Number',
						});
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						formik_esm.l0,
						{
							children: [
								!props.status ||
									((status = props.status),
									(errors = Object.entries(status).map((s) =>
										(0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'li',
											{ children: s[1] },
											s[0],
										),
									)),
									(0,
									emotion_react_jsx_runtime_browser_esm.BX)(
										'div',
										{
											css: [
												{
													color: palette.palette
														.error[400],
													backgroundColor: '#ffe1e1',
													padding: '20px 15px',
												},
												sharedStyles.kS,
												'',
												'',
											],
											children: [
												'There were some problems submitting your form. Your information has not been saved. Please resolve the following:',
												(0,
												emotion_react_jsx_runtime_browser_esm.tZ)(
													'ul',
													{ children: errors },
												),
											],
										},
									)),
								lines(),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									PageSection.N,
									{
										title: 'Email & Password',
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												FormField.E$,
												{
													name: 'primaryEmailAddress',
													label: 'Email',
													formikProps: props,
												},
											),
											!props.emailMessage ||
												((email = props.emailMessage),
												(0,
												emotion_react_jsx_runtime_browser_esm.BX)(
													'p',
													{
														css: [
															sharedStyles.kS,
															{
																padding:
																	'6px 14px',
																backgroundColor:
																	palette
																		.palette
																		.neutral[97],
															},
															'',
															'',
														],
														children: [
															'To verify your new email address ',
															(0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'strong',
																{
																	children:
																		email,
																},
															),
															' please check your inbox - the confirmation email is on its way. In the meantime you should keep using your old credentials to sign in.',
														],
													},
												)),
											(0,
											emotion_react_jsx_runtime_browser_esm.BX)(
												'label',
												{
													children: [
														'Password',
														(0,
														emotion_react_jsx_runtime_browser_esm.tZ)(
															'ul',
															{
																css: _ref,
																children: (0,
																emotion_react_jsx_runtime_browser_esm.tZ)(
																	'li',
																	{
																		children:
																			(0,
																			emotion_react_jsx_runtime_browser_esm.tZ)(
																				'a',
																				{
																					css: sharedStyles.Fe,
																					href: IdentityLocations
																						.e
																						.RESET_PASSWORD,
																					children:
																						'Change password',
																				},
																			),
																	},
																),
															},
														),
													],
												},
											),
										],
									},
								),
								lines(),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									PageSection.N,
									{
										title: 'Phone',
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												FormField.A5,
												{
													name: 'countryCode',
													label: 'Country code',
													options: models.lC,
													formikProps: props,
													labelModifier: (o) =>
														'+'.concat(o),
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												FormField.Kb,
												{
													name: 'localNumber',
													label: 'Local Number',
													formikProps: props,
												},
											),
											deletePhoneNumberButton,
										],
									},
								),
								lines(),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									PageSection.N,
									{
										title: 'Personal Information',
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												FormField.A5,
												{
													name: 'title',
													label: 'Title',
													options: titles,
													formikProps: props,
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												FormField.Xn,
												{
													name: 'firstName',
													label: 'First Name',
													formikProps: props,
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												FormField.Xn,
												{
													name: 'secondName',
													label: 'Last Name',
													formikProps: props,
												},
											),
										],
									},
								),
								lines(),
								(0, emotion_react_jsx_runtime_browser_esm.BX)(
									PageSection.N,
									{
										title: 'Correspondence address',
										description: correpondenceDescription,
										children: [
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												FormField.Xn,
												{
													name: 'address1',
													label: 'Address line 1',
													formikProps: props,
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												FormField.Xn,
												{
													name: 'address2',
													label: 'Address line 2',
													formikProps: props,
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												FormField.Xn,
												{
													name: 'address3',
													label: 'Town',
													formikProps: props,
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												FormField.Xn,
												{
													name: 'address4',
													label: 'County or State',
													formikProps: props,
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												FormField.Xn,
												{
													name: 'postcode',
													label: 'Postcode/Zipcode',
													formikProps: props,
												},
											),
											(0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												FormField.A5,
												{
													name: 'country',
													label: 'Country',
													options: models.od.flatMap(
														(country) =>
															country.name,
													),
													formikProps: props,
												},
											),
										],
									},
								),
								lines(),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									PageSection.N,
									{
										title: 'Location',
										description: locationDescription,
										children: (0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											FormField.A5,
											{
												name: 'registrationLocation',
												label: 'Location',
												labelModifier:
													registrationLocationLabelModifier,
												options: registrationLocations,
												firstOptionLabel: 'Unknown',
												firstOptionDisabled: !0,
												formikProps: props,
											},
										),
									},
								),
								lines(),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									PageSection.N,
									{
										title: 'Delete account',
										children: (0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											'a',
											{
												css: sharedStyles.Fe,
												href: IdentityLocations.e
													.DELETE_ACCOUNT,
												children: 'Delete your account',
											},
										),
									},
								),
								lines(),
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									PageSection.N,
									{
										children: (0,
										emotion_react_jsx_runtime_browser_esm.tZ)(
											Button.z,
											{
												disabled: props.isSubmitting,
												onClick: () =>
													props.submitForm(),
												children: 'Save changes',
											},
										),
									},
								),
							],
						},
					);
				}),
				SettingsFormSection = (props) =>
					(0, emotion_react_jsx_runtime_browser_esm.tZ)(
						FormikForm,
						(function _objectSpread(e) {
							for (var r = 1; r < arguments.length; r++) {
								var t =
									null != arguments[r] ? arguments[r] : {};
								r % 2
									? ownKeys(Object(t), !0).forEach(function (
											r,
									  ) {
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
												Object.getOwnPropertyDescriptor(
													t,
													r,
												),
											);
									  });
							}
							return e;
						})({}, props),
					);
			try {
				(SettingsFormSection.displayName = 'SettingsFormSection'),
					(SettingsFormSection.__docgenInfo = {
						description: '',
						displayName: 'SettingsFormSection',
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
								type: {
									name: '(input: User, response: User) => void',
								},
							},
							onDone: {
								defaultValue: null,
								description: '',
								name: 'onDone',
								required: !0,
								type: { name: '() => void' },
							},
							emailMessage: {
								defaultValue: null,
								description: '',
								name: 'emailMessage',
								required: !0,
								type: { name: 'string | null' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/identity/settings/SettingsFormSection.tsx#SettingsFormSection'
						] = {
							docgenInfo: SettingsFormSection.__docgenInfo,
							name: 'SettingsFormSection',
							path: 'client/components/mma/identity/settings/SettingsFormSection.tsx#SettingsFormSection',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			function Settings_ownKeys(e, r) {
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
			function Settings_objectSpread(e) {
				for (var r = 1; r < arguments.length; r++) {
					var t = null != arguments[r] ? arguments[r] : {};
					r % 2
						? Settings_ownKeys(Object(t), !0).forEach(function (r) {
								Settings_defineProperty(e, r, t[r]);
						  })
						: Object.getOwnPropertyDescriptors
						? Object.defineProperties(
								e,
								Object.getOwnPropertyDescriptors(t),
						  )
						: Settings_ownKeys(Object(t)).forEach(function (r) {
								Object.defineProperty(
									e,
									r,
									Object.getOwnPropertyDescriptor(t, r),
								);
						  });
				}
				return e;
			}
			function Settings_defineProperty(obj, key, value) {
				return (
					(key = (function Settings_toPropertyKey(arg) {
						var key = (function Settings_toPrimitive(input, hint) {
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
			function Settings_asyncGeneratorStep(
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
			var errorRef = (0, react.createRef)(),
				pageTopRef = (0, react.createRef)(),
				loader = (0, emotion_react_jsx_runtime_browser_esm.tZ)(
					WithStandardTopMargin.z,
					{
						children: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							Spinner.$,
							{ loadingMessage: 'Loading your profile ...' },
						),
					},
				),
				_ref2 = { name: 'eivff4', styles: 'display:none' },
				Settings = (_) => {
					var [user, setUser] = (0, react.useState)(),
						[error, setError] = (0, react.useState)(!1),
						[emailMessage, setEmailMessage] = (0, react.useState)(
							null,
						);
					(0, react.useEffect)(() => {
						error &&
							errorRef.current &&
							window.scrollTo(0, errorRef.current.offsetTop - 20);
					}, [error]);
					var handleGeneralError = (e) => {
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
					var u,
						saveUser = (function () {
							var _ref = (function Settings_asyncToGenerator(fn) {
								return function () {
									var self = this,
										args = arguments;
									return new Promise(function (
										resolve,
										reject,
									) {
										var gen = fn.apply(self, args);
										function _next(value) {
											Settings_asyncGeneratorStep(
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
											Settings_asyncGeneratorStep(
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
							})(function* (originalUser, values) {
								var changedUser = Settings_objectSpread(
									Settings_objectSpread({}, originalUser),
									values,
								);
								return yield identity.Q.saveChanges(
									originalUser,
									changedUser,
								);
							});
							return function saveUser(_x, _x2) {
								return _ref.apply(this, arguments);
							};
						})(),
						scrollToTop = () => {
							pageTopRef.current &&
								window.scrollTo(
									0,
									pageTopRef.current.offsetTop - 20,
								);
						},
						updateValues = (input, response) => {
							var changedFields = identity.Q.getChangedFields(
								response,
								input,
							);
							changedFields.primaryEmailAddress &&
								setEmailMessage(
									changedFields.primaryEmailAddress,
								),
								setUser(response);
						};
					return (0, emotion_react_jsx_runtime_browser_esm.BX)(
						Page._,
						{
							selectedNavItem: NavConfig.qy.settings,
							pageTitle: 'Settings',
							children: [
								!error ||
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										WithStandardTopMargin.z,
										{
											children: (0,
											emotion_react_jsx_runtime_browser_esm.tZ)(
												GenericErrorMessage.k,
												{ ref: errorRef },
											),
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
														'div',
														{
															ref: pageTopRef,
															css: _ref2,
														},
													),
													(0,
													emotion_react_jsx_runtime_browser_esm.tZ)(
														WithStandardTopMargin.z,
														{
															children: (0,
															emotion_react_jsx_runtime_browser_esm.tZ)(
																'span',
																{
																	css: sharedStyles.kS,
																	children:
																		'These details will only be visible to you and the Guardian.',
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
																SettingsFormSection,
																{
																	user: u,
																	saveUser: (
																		values,
																	) =>
																		saveUser(
																			u,
																			values,
																		),
																	onError:
																		handleGeneralError,
																	onSuccess:
																		updateValues,
																	onDone: scrollToTop,
																	emailMessage,
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
				(Settings.displayName = 'Settings'),
					(Settings.__docgenInfo = {
						description: '',
						displayName: 'Settings',
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
							'client/components/mma/identity/settings/Settings.tsx#Settings'
						] = {
							docgenInfo: Settings.__docgenInfo,
							name: 'Settings',
							path: 'client/components/mma/identity/settings/Settings.tsx#Settings',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			const Settings_stories = {
				title: 'Pages/Settings',
				component: Settings,
				decorators: [ReactRouterDecorator.R],
				parameters: { layout: 'fullscreen' },
			};
			var Default = {
				render: () =>
					(0, emotion_react_jsx_runtime_browser_esm.tZ)(Settings, {}),
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
							"{\n  render: () => {\n    return <Settings />;\n  },\n  parameters: {\n    msw: [http.get('/idapi/user', () => {\n      return HttpResponse.json(user);\n    })]\n  }\n}",
						...Default.parameters?.docs?.source,
					},
				},
			};
			const __namedExportsOrder = ['Default'];
		},
	},
]);
