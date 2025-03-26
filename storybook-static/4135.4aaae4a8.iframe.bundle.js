'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[4135],
	{
		'./client/components/mma/shared/Buttons.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				z: () => Button,
				Q: () => LinkButton,
			});
			var emotion_react_browser_esm = __webpack_require__(
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
				),
				color = __webpack_require__('./node_modules/color/index.js'),
				color_default = __webpack_require__.n(color),
				react_router_dom = __webpack_require__(
					'./node_modules/react-router-dom/index.js',
				),
				emotion_react_jsx_runtime_browser_esm = __webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				),
				ArrowIcon = (props) =>
					(0, emotion_react_jsx_runtime_browser_esm.tZ)('svg', {
						viewBox: '0 0 30 30',
						children: (0, emotion_react_jsx_runtime_browser_esm.tZ)(
							'path',
							{
								transform: props.pointingLeft
									? 'scale(-1, 1) translate(-30 0)'
									: void 0,
								d: 'M22.8 14.6L15.2 7l-.7.7 5.5 6.6H6v1.5h14l-5.5 6.6.7.7 7.6-7.6v-.9',
							},
						),
					});
			try {
				(ArrowIcon.displayName = 'ArrowIcon'),
					(ArrowIcon.__docgenInfo = {
						description: '',
						displayName: 'ArrowIcon',
						props: {
							pointingLeft: {
								defaultValue: null,
								description: '',
								name: 'pointingLeft',
								required: !1,
								type: { name: 'true' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/assets/ArrowIcon.tsx#ArrowIcon'
						] = {
							docgenInfo: ArrowIcon.__docgenInfo,
							name: 'ArrowIcon',
							path: 'client/components/mma/shared/assets/ArrowIcon.tsx#ArrowIcon',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			var ErrorIcon = __webpack_require__(
					'./client/components/mma/shared/assets/ErrorIcon.tsx',
				),
				TickIcon = __webpack_require__(
					'./client/components/mma/shared/assets/TickIcon.tsx',
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
			var applyIconStyleIfApplicable = (hover, left, right, leftTick) =>
					left
						? hover
							? styles.leftHover
							: styles.left
						: right
						? hover
							? styles.rightHover
							: styles.right
						: leftTick
						? { padding: '4px 21px 3px 16px' }
						: { padding: '1px 15px 0 15px' },
				calcTextColour = (disabled, textColour, primary, hollow) =>
					disabled
						? palette.n$[100]
						: primary || hollow
						? palette.n$[7]
						: textColour,
				defaultColour = palette.n$[20],
				buttonCss = (_ref) => {
					var {
							disabled,
							height,
							fontWeight,
							colour = defaultColour,
							textColour = palette.n$[100],
							left,
							right,
							primary,
							hollow,
							hide,
							forceCircle,
							hoverColour,
							leftTick,
						} = _ref,
						backgroundColour = ((
							disabled,
							colour,
							primary,
							hollow,
						) =>
							disabled
								? palette.n$[60]
								: primary
								? palette.A5[400]
								: hollow
								? palette.n$[100]
								: colour)(disabled, colour, primary, hollow);
					return (0, emotion_react_browser_esm.iv)(
						_objectSpread(
							_objectSpread(
								_objectSpread(
									_objectSpread({}, typography.SPg),
									{},
									{
										borderRadius: '1000px',
										alignItems: 'center',
										position: 'relative',
										':active': { outline: 'none' },
										minHeight: height || '36px',
										height: height || '36px',
										fontWeight,
										display: hide ? 'none' : 'inline-flex',
										background: backgroundColour,
										color: calcTextColour(
											disabled,
											textColour,
											primary,
											hollow,
										),
										border: hollow ? '1px solid' : 'none',
									},
									applyIconStyleIfApplicable(
										!1,
										left,
										right,
										leftTick,
									),
								),
								forceCircle
									? { padding: '1px 18px 0 18px' }
									: {},
							),
							{},
							{
								':hover': disabled
									? void 0
									: _objectSpread(
											{
												background:
													hoverColour ||
													color_default()(
														backgroundColour,
													)
														.darken(
															backgroundColour ===
																defaultColour
																? 0.3
																: 0.1,
														)
														.string(),
											},
											applyIconStyleIfApplicable(
												!0,
												left,
												right,
												leftTick,
											),
									  ),
								cursor: disabled ? 'not-allowed' : 'pointer',
								maxWidth: 'calc(100vw - 40px)',
							},
						),
						'',
						'',
					);
				},
				styles = {
					leftHover: {
						svg: {
							transform: 'translate(-3px, -50%) rotate(180deg)',
						},
					},
					left: {
						padding: '1px 18px 0 40px',
						svg: {
							fill: 'currentColor',
							height: '34px',
							position: 'absolute',
							left: '0px',
							top: '50%',
							transform: 'translate(0, -50%) rotate(180deg)',
							transition: 'transform .3s, background .3s',
							width: '36px',
						},
					},
					rightHover: { svg: { transform: 'translate(3px, -50%)' } },
					right: {
						padding: '1px 40px 0 18px',
						svg: {
							fill: 'currentColor',
							height: '34px',
							position: 'absolute',
							right: '0',
							top: '50%',
							transform: 'translate(0, -50%)',
							transition: 'transform .3s, background .3s',
							width: '36px',
						},
					},
				},
				LinkButton = (props) =>
					(0, emotion_react_jsx_runtime_browser_esm.BX)(
						react_router_dom.rU,
						{
							'aria-label': props.ariaLabelText,
							to: props.disabled ? '' : props.to,
							onClick: props.onClick,
							css: buttonCss(props),
							state: props.state,
							children: [
								props.alert &&
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										ErrorIcon.P,
										{
											fill: palette.n$[100],
											additionalCss: (0,
											emotion_react_browser_esm.iv)(
												'margin-right:',
												space.D[2],
												'px;',
												'',
											),
										},
									),
								props.text,
								(props.left || props.right) &&
									(0,
									emotion_react_jsx_runtime_browser_esm.tZ)(
										ArrowIcon,
										{},
									),
							],
						},
					),
				Button = (props) =>
					(0, emotion_react_jsx_runtime_browser_esm.BX)('button', {
						onClick: props.onClick,
						css: buttonCss(props),
						disabled: props.disabled,
						onMouseUp: (event) => event.target.blur(),
						type: props.type,
						children: [
							props.leftTick &&
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									TickIcon.Y,
									{},
								),
							props.text,
							(props.left || props.right) &&
								(0, emotion_react_jsx_runtime_browser_esm.tZ)(
									ArrowIcon,
									{},
								),
						],
					});
			try {
				(LinkButton.displayName = 'LinkButton'),
					(LinkButton.__docgenInfo = {
						description: '',
						displayName: 'LinkButton',
						props: {
							to: {
								defaultValue: null,
								description: '',
								name: 'to',
								required: !0,
								type: { name: 'string' },
							},
							state: {
								defaultValue: null,
								description: '',
								name: 'state',
								required: !1,
								type: {
									name: 'ProductDetail | LinkButtonState',
								},
							},
							ariaLabelText: {
								defaultValue: null,
								description: '',
								name: 'ariaLabelText',
								required: !1,
								type: { name: 'string' },
							},
							text: {
								defaultValue: null,
								description: '',
								name: 'text',
								required: !0,
								type: { name: 'string' },
							},
							onClick: {
								defaultValue: null,
								description: '',
								name: 'onClick',
								required: !1,
								type: { name: '(() => void)' },
							},
							height: {
								defaultValue: null,
								description: '',
								name: 'height',
								required: !1,
								type: { name: 'string' },
							},
							fontWeight: {
								defaultValue: null,
								description: '',
								name: 'fontWeight',
								required: !1,
								type: {
									name: 'enum',
									value: [{ value: '"bold"' }],
								},
							},
							left: {
								defaultValue: null,
								description: '',
								name: 'left',
								required: !1,
								type: { name: 'boolean' },
							},
							right: {
								defaultValue: null,
								description: '',
								name: 'right',
								required: !1,
								type: { name: 'boolean' },
							},
							disabled: {
								defaultValue: null,
								description: '',
								name: 'disabled',
								required: !1,
								type: { name: 'boolean' },
							},
							colour: {
								defaultValue: { value: 'neutral[20]' },
								description: '',
								name: 'colour',
								required: !1,
								type: { name: 'string' },
							},
							textColour: {
								defaultValue: { value: 'neutral[100]' },
								description: '',
								name: 'textColour',
								required: !1,
								type: { name: 'string' },
							},
							primary: {
								defaultValue: null,
								description: '',
								name: 'primary',
								required: !1,
								type: { name: 'true' },
							},
							hollow: {
								defaultValue: null,
								description: '',
								name: 'hollow',
								required: !1,
								type: { name: 'true' },
							},
							hide: {
								defaultValue: null,
								description: '',
								name: 'hide',
								required: !1,
								type: { name: 'boolean' },
							},
							forceCircle: {
								defaultValue: null,
								description: '',
								name: 'forceCircle',
								required: !1,
								type: { name: 'true' },
							},
							hoverColour: {
								defaultValue: null,
								description: '',
								name: 'hoverColour',
								required: !1,
								type: { name: 'string' },
							},
							leftTick: {
								defaultValue: null,
								description: '',
								name: 'leftTick',
								required: !1,
								type: { name: 'true' },
							},
							alert: {
								defaultValue: null,
								description: '',
								name: 'alert',
								required: !1,
								type: { name: 'boolean' },
							},
							type: {
								defaultValue: null,
								description: '',
								name: 'type',
								required: !1,
								type: {
									name: 'enum',
									value: [
										{ value: '"button"' },
										{ value: '"submit"' },
										{ value: '"reset"' },
									],
								},
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/Buttons.tsx#LinkButton'
						] = {
							docgenInfo: LinkButton.__docgenInfo,
							name: 'LinkButton',
							path: 'client/components/mma/shared/Buttons.tsx#LinkButton',
						});
			} catch (__react_docgen_typescript_loader_error) {}
			try {
				(Button.displayName = 'Button'),
					(Button.__docgenInfo = {
						description: '',
						displayName: 'Button',
						props: {
							text: {
								defaultValue: null,
								description: '',
								name: 'text',
								required: !0,
								type: { name: 'string' },
							},
							onClick: {
								defaultValue: null,
								description: '',
								name: 'onClick',
								required: !1,
								type: { name: '(() => void)' },
							},
							height: {
								defaultValue: null,
								description: '',
								name: 'height',
								required: !1,
								type: { name: 'string' },
							},
							fontWeight: {
								defaultValue: null,
								description: '',
								name: 'fontWeight',
								required: !1,
								type: {
									name: 'enum',
									value: [{ value: '"bold"' }],
								},
							},
							left: {
								defaultValue: null,
								description: '',
								name: 'left',
								required: !1,
								type: { name: 'boolean' },
							},
							right: {
								defaultValue: null,
								description: '',
								name: 'right',
								required: !1,
								type: { name: 'boolean' },
							},
							disabled: {
								defaultValue: null,
								description: '',
								name: 'disabled',
								required: !1,
								type: { name: 'boolean' },
							},
							colour: {
								defaultValue: { value: 'neutral[20]' },
								description: '',
								name: 'colour',
								required: !1,
								type: { name: 'string' },
							},
							textColour: {
								defaultValue: { value: 'neutral[100]' },
								description: '',
								name: 'textColour',
								required: !1,
								type: { name: 'string' },
							},
							primary: {
								defaultValue: null,
								description: '',
								name: 'primary',
								required: !1,
								type: { name: 'true' },
							},
							hollow: {
								defaultValue: null,
								description: '',
								name: 'hollow',
								required: !1,
								type: { name: 'true' },
							},
							hide: {
								defaultValue: null,
								description: '',
								name: 'hide',
								required: !1,
								type: { name: 'boolean' },
							},
							forceCircle: {
								defaultValue: null,
								description: '',
								name: 'forceCircle',
								required: !1,
								type: { name: 'true' },
							},
							hoverColour: {
								defaultValue: null,
								description: '',
								name: 'hoverColour',
								required: !1,
								type: { name: 'string' },
							},
							leftTick: {
								defaultValue: null,
								description: '',
								name: 'leftTick',
								required: !1,
								type: { name: 'true' },
							},
							alert: {
								defaultValue: null,
								description: '',
								name: 'alert',
								required: !1,
								type: { name: 'boolean' },
							},
							type: {
								defaultValue: null,
								description: '',
								name: 'type',
								required: !1,
								type: {
									name: 'enum',
									value: [
										{ value: '"button"' },
										{ value: '"submit"' },
										{ value: '"reset"' },
									],
								},
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/Buttons.tsx#Button'
						] = {
							docgenInfo: Button.__docgenInfo,
							name: 'Button',
							path: 'client/components/mma/shared/Buttons.tsx#Button',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/shared/assets/ErrorIcon.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { P: () => ErrorIcon });
			var _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@guardian/source/dist/foundations/__deprecated__/colour/palette.js',
					),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				ErrorIcon = (props) =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
						'svg',
						{
							width: '21',
							height: '17',
							viewBox: '0 0 21 17',
							fill: 'none',
							css: props.additionalCss,
							children: (0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
								'path',
								{
									fillRule: 'evenodd',
									clipRule: 'evenodd',
									d: 'M9.9375 0L0 16.1095L0.6375 17H20.3625L21 16.1095L11.0625 0H9.9375ZM9.87661 11.5012H11.1234L11.7162 4.96907L10.8986 4.28147H10.1015L9.28386 4.96907L9.87661 11.5012ZM10.5 12.7045C11.1689 12.7045 11.7162 13.246 11.7162 13.9078C11.7162 14.5696 11.1689 15.1111 10.5 15.1111C9.83114 15.1111 9.28386 14.5696 9.28386 13.9078C9.28386 13.246 9.83114 12.7045 10.5 12.7045Z',
									fill:
										props.fill ||
										(props.downgradeToWarning
											? _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
													.A5[300]
											: _guardian_source_foundations__WEBPACK_IMPORTED_MODULE_1__
													.r[400]),
								},
							),
						},
					);
			try {
				(ErrorIcon.displayName = 'ErrorIcon'),
					(ErrorIcon.__docgenInfo = {
						description: '',
						displayName: 'ErrorIcon',
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
							downgradeToWarning: {
								defaultValue: null,
								description: '',
								name: 'downgradeToWarning',
								required: !1,
								type: { name: 'true' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/assets/ErrorIcon.tsx#ErrorIcon'
						] = {
							docgenInfo: ErrorIcon.__docgenInfo,
							name: 'ErrorIcon',
							path: 'client/components/mma/shared/assets/ErrorIcon.tsx#ErrorIcon',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/shared/assets/TickIcon.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { Y: () => TickIcon });
			var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
				__webpack_require__(
					'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
				);
			var _ref = {
					name: '19k4x5w',
					styles: 'height:16px;width:21px;margin-right:10px',
				},
				TickIcon = () =>
					(0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
						'svg',
						{
							viewBox: '0 0 10.79 8.608',
							css: _ref,
							children: (0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.tZ)(
								'path',
								{
									d: 'M2.99 6.58L10.24 0l.55.53-7.8 8.08h-.26L0 4.79l.55-.55 2.44 2.33z',
								},
							),
						},
					);
		},
	},
]);
