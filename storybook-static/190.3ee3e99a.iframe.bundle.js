'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[190],
	{
		'./client/components/mma/shared/assets/AndroidPlayStoreButton.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				A: () => AndroidPlayStoreButton,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_client_utilities_analytics__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__('./client/utilities/analytics.ts'),
				_shared_externalLinks__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__('./shared/externalLinks.ts'),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				AndroidPlayStoreButton = (props) => {
					var defaultStyles = (0,
						_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
							'height:',
							props.overrideButtonHeight || '40px',
							';width:auto;',
							'',
						),
						linkStyles = (0,
						_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)('', '');
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
						'a',
						{
							href: _shared_externalLinks__WEBPACK_IMPORTED_MODULE_2__.vW,
							target: 'blank',
							onClick: () => {
								(0,
								_client_utilities_analytics__WEBPACK_IMPORTED_MODULE_3__.L9)(
									{
										eventCategory:
											'cancellation_offer_confirmation',
										eventAction: 'click',
										eventLabel: 'android_app_cta_click',
									},
								);
							},
							css: linkStyles,
							'aria-label': 'Download on the Play Store',
							children: (0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
								'svg',
								{
									xmlns: 'http://www.w3.org/2000/svg',
									width: '180',
									height: '53.33',
									viewBox: '0 0 180 53.33',
									css: [
										defaultStyles,
										props.additionalCss,
										'',
										'',
									],
									children: [
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
											'path',
											{
												fill: '#100f0d',
												d: 'M173.33 53.33H6.67C3 53.33 0 50.33 0 46.67v-40C0 3 3 0 6.67 0h166.66C177 0 180 3 180 6.67v40c0 3.66-3 6.66-6.67 6.66',
											},
										),
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
											'path',
											{
												fill: '#a2a2a1',
												d: 'M173.33 0H6.67C3 0 0 3 0 6.67v40c0 3.66 3 6.66 6.67 6.66h166.66c3.67 0 6.67-3 6.67-6.66v-40C180 3 177 0 173.33 0zm0 1.07a5.6 5.6 0 0 1 5.6 5.6v40a5.6 5.6 0 0 1-5.6 5.6H6.67a5.6 5.6 0 0 1-5.6-5.6v-40a5.6 5.6 0 0 1 5.6-5.6h166.66',
											},
										),
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
											'path',
											{
												fill: '#fff',
												d: 'M142.58 40h2.49V23.33h-2.49zm22.4-10.66-2.84 7.22h-.09l-2.96-7.22h-2.68l4.44 10.1-2.53 5.61h2.6l6.84-15.71zm-14.1 8.77c-.81 0-1.95-.41-1.95-1.42 0-1.29 1.41-1.78 2.64-1.78 1.09 0 1.6.24 2.27.56a3.02 3.02 0 0 1-2.96 2.64zm.3-9.14c-1.8 0-3.67.8-4.44 2.55l2.21.93c.47-.93 1.35-1.23 2.27-1.23 1.29 0 2.6.77 2.62 2.15v.17a5.5 5.5 0 0 0-2.6-.64c-2.38 0-4.8 1.3-4.8 3.75 0 2.23 1.95 3.67 4.14 3.67a3.5 3.5 0 0 0 3.17-1.63h.09v1.28h2.4v-6.39c0-2.96-2.2-4.6-5.06-4.6zm-15.38 2.4h-3.53v-5.72h3.53a2.89 2.89 0 0 1 2.92 2.86 2.9 2.9 0 0 1-2.92 2.86zm-.06-8.04h-5.96V40h2.49v-6.31h3.47c2.76 0 5.47-2 5.47-5.18 0-3.18-2.71-5.18-5.47-5.18zm-32.5 14.78c-1.73 0-3.16-1.44-3.16-3.42 0-2 1.43-3.45 3.15-3.45 1.7 0 3.03 1.46 3.03 3.45 0 1.98-1.33 3.42-3.03 3.42zm2.85-7.84H106a3.93 3.93 0 0 0-2.98-1.27 5.64 5.64 0 0 0-5.44 5.7c0 3.17 2.6 5.64 5.44 5.64 1.35 0 2.43-.6 2.98-1.29h.09v.82c0 2.17-1.16 3.33-3.03 3.33a3.14 3.14 0 0 1-2.86-2.02l-2.16.9a5.4 5.4 0 0 0 5.02 3.35c2.92 0 5.4-1.71 5.4-5.9V29.35h-2.37zm4.08 9.73h2.5V23.33h-2.5zm6.17-5.5a3.11 3.11 0 0 1 2.96-3.3c.99 0 1.83.49 2.1 1.2zm7.73-1.89c-.47-1.27-1.91-3.6-4.86-3.6-2.92 0-5.34 2.29-5.34 5.66 0 3.18 2.4 5.67 5.62 5.67 2.6 0 4.1-1.59 4.73-2.51l-1.93-1.29a3.24 3.24 0 0 1-2.8 1.57 2.88 2.88 0 0 1-2.74-1.72l7.58-3.14zm-60.41-1.87v2.4h5.76a5.02 5.02 0 0 1-1.31 3.04 5.9 5.9 0 0 1-4.45 1.76c-3.54 0-6.32-2.86-6.32-6.4A6.32 6.32 0 0 1 68 26.85l1.7-1.7a8.4 8.4 0 0 0-6.04-2.42 8.93 8.93 0 0 0-8.94 8.8c0 4.86 4.08 8.81 8.94 8.81 2.62 0 4.6-.86 6.14-2.47 1.6-1.59 2.09-3.82 2.09-5.62 0-.56-.05-1.08-.13-1.5zm14.77 7.37c-1.72 0-3.2-1.42-3.2-3.44 0-2.04 1.48-3.43 3.2-3.43 1.72 0 3.2 1.4 3.2 3.43 0 2.02-1.48 3.44-3.2 3.44zm0-9.1a5.59 5.59 0 0 0-5.7 5.66 5.6 5.6 0 0 0 5.7 5.67 5.6 5.6 0 0 0 5.7-5.67 5.59 5.59 0 0 0-5.7-5.67zm12.42 9.1c-1.72 0-3.2-1.42-3.2-3.44 0-2.04 1.48-3.43 3.2-3.43 1.72 0 3.2 1.4 3.2 3.43 0 2.02-1.48 3.44-3.2 3.44zm0-9.1a5.59 5.59 0 0 0-5.7 5.66 5.6 5.6 0 0 0 5.7 5.67 5.6 5.6 0 0 0 5.7-5.67 5.59 5.59 0 0 0-5.7-5.67',
											},
										),
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
											'path',
											{
												fill: '#eb3131',
												d: 'm27.62 25.9-14.2 15.07h.01a3.83 3.83 0 0 0 5.65 2.32l.04-.03 15.98-9.22-7.48-8.14',
											},
										),
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
											'path',
											{
												fill: '#f6b60b',
												d: 'M41.98 23.33h-.01l-6.9-4-7.77 6.91 7.8 7.8 6.86-3.96a3.84 3.84 0 0 0 .02-6.75',
											},
										),
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
											'path',
											{
												fill: '#5778c5',
												d: 'M13.43 12.37c-.09.31-.13.64-.13.99v26.62c0 .34.04.67.13.99L28.1 26.28 13.43 12.37',
											},
										),
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
											'path',
											{
												fill: '#3bad49',
												d: 'm27.73 26.67 7.34-7.35-15.96-9.25a3.84 3.84 0 0 0-5.68 2.3l14.3 14.3',
											},
										),
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
											'path',
											{
												fill: '#fff',
												stroke: '#fff',
												strokeMiterlimit: '10',
												strokeWidth: '.27',
												d: 'M63.2 13.04h-3.9V14h2.92c-.08.79-.4 1.4-.92 1.85-.53.45-1.2.68-2 .68-.87 0-1.6-.3-2.22-.91-.59-.62-.9-1.38-.9-2.3 0-.92.31-1.68.9-2.3.61-.6 1.35-.9 2.22-.9.45 0 .88.07 1.27.24.4.17.7.4.95.7l.74-.73a3.33 3.33 0 0 0-1.29-.89 4.4 4.4 0 0 0-1.67-.31c-1.16 0-2.15.4-2.95 1.21-.81.8-1.22 1.8-1.22 2.98s.4 2.18 1.22 2.98c.8.8 1.79 1.21 2.95 1.21 1.23 0 2.2-.39 2.95-1.18a3.95 3.95 0 0 0 .94-3.28zm1.5-3.73v8.02h4.68v-.98h-3.65V13.8h3.3v-.96h-3.3V10.3h3.65v-1zm11.25.99v-1h-5.51v1h2.24v7.03h1.03V10.3zm5-1h-1.03v8.03h1.03zm6.8 1v-1h-5.51v1h2.24v7.03h1.03V10.3zm10.41.05a3.92 3.92 0 0 0-2.94-1.22c-1.16 0-2.14.4-2.93 1.21-.8.8-1.19 1.8-1.19 2.98s.4 2.19 1.19 2.98c.8.8 1.77 1.21 2.93 1.21a4.05 4.05 0 0 0 4.12-4.2c0-1.17-.38-2.16-1.18-2.96zm-5.13.67c.59-.6 1.32-.9 2.2-.9.87 0 1.6.3 2.18.9.6.6.89 1.37.89 2.3 0 .93-.3 1.7-.89 2.3-.58.6-1.31.9-2.19.9-.87 0-1.6-.3-2.2-.9a3.18 3.18 0 0 1-.87-2.3c0-.93.3-1.69.88-2.3zm8.77 1.32-.05-1.55h.05l4.08 6.54h1.07V9.31h-1.03V14l.05 1.54h-.05l-3.9-6.24h-1.25v8.02h1.03z',
											},
										),
									],
								},
							),
						},
					);
				};
			try {
				(AndroidPlayStoreButton.displayName = 'AndroidPlayStoreButton'),
					(AndroidPlayStoreButton.__docgenInfo = {
						description: '',
						displayName: 'AndroidPlayStoreButton',
						props: {
							link: {
								defaultValue: null,
								description: '',
								name: 'link',
								required: !0,
								type: { name: 'string' },
							},
							additionalCss: {
								defaultValue: null,
								description: '',
								name: 'additionalCss',
								required: !1,
								type: { name: 'SerializedStyles' },
							},
							overrideButtonHeight: {
								defaultValue: null,
								description: '',
								name: 'overrideButtonHeight',
								required: !1,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/assets/AndroidPlayStoreButton.tsx#AndroidPlayStoreButton'
						] = {
							docgenInfo: AndroidPlayStoreButton.__docgenInfo,
							name: 'AndroidPlayStoreButton',
							path: 'client/components/mma/shared/assets/AndroidPlayStoreButton.tsx#AndroidPlayStoreButton',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./client/components/mma/shared/assets/AppleAppStoreButton.tsx': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				G: () => AppleAppStoreButton,
			});
			var _emotion_react__WEBPACK_IMPORTED_MODULE_0__ =
					__webpack_require__(
						'./node_modules/@emotion/react/dist/emotion-react.browser.esm.js',
					),
				_client_utilities_analytics__WEBPACK_IMPORTED_MODULE_3__ =
					__webpack_require__('./client/utilities/analytics.ts'),
				_shared_externalLinks__WEBPACK_IMPORTED_MODULE_2__ =
					__webpack_require__('./shared/externalLinks.ts'),
				_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ =
					__webpack_require__(
						'./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
					),
				AppleAppStoreButton = (props) => {
					var defaultBtnStyles = (0,
						_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)(
							'height:',
							props.overrideButtonHeight || '40px',
							';width:auto;',
							'',
						),
						linkStyles = (0,
						_emotion_react__WEBPACK_IMPORTED_MODULE_0__.iv)('', '');
					return (0,
					_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
						'a',
						{
							href: _shared_externalLinks__WEBPACK_IMPORTED_MODULE_2__.pt,
							target: 'blank',
							onClick: () => {
								(0,
								_client_utilities_analytics__WEBPACK_IMPORTED_MODULE_3__.L9)(
									{
										eventCategory:
											'cancellation_offer_confirmation',
										eventAction: 'click',
										eventLabel: 'ios_app_cta_click',
									},
								);
							},
							css: linkStyles,
							'aria-label': 'Download on the Apple App Store',
							children: (0,
							_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.BX)(
								'svg',
								{
									xmlns: 'http://www.w3.org/2000/svg',
									width: '119.66',
									height: '40',
									viewBox: '0 0 119.66 40',
									css: [
										defaultBtnStyles,
										props.additionalCss,
										'',
										'',
									],
									children: [
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
											'path',
											{
												fill: '#a6a6a6',
												d: 'M110.13 0H8.44l-.92.01a13.21 13.21 0 0 0-2 .18 6.67 6.67 0 0 0-1.9.63A6.44 6.44 0 0 0 2 2 6.26 6.26 0 0 0 .82 3.62a6.6 6.6 0 0 0-.63 1.9 13 13 0 0 0-.17 2L0 8.44v23.12c0 .3 0 .61.02.92a13 13 0 0 0 .17 2 6.59 6.59 0 0 0 .63 1.9A6.2 6.2 0 0 0 2 38a6.27 6.27 0 0 0 1.62 1.18 6.7 6.7 0 0 0 1.9.63 13.46 13.46 0 0 0 2 .18h.92l1.1.01H111.21l.92-.01a13.28 13.28 0 0 0 2-.18 6.8 6.8 0 0 0 1.9-.63 6.28 6.28 0 0 0 1.63-1.18 6.4 6.4 0 0 0 1.18-1.61 6.6 6.6 0 0 0 .62-1.9 13.5 13.5 0 0 0 .18-2.01v-.92l.01-1.1V7.52a13.5 13.5 0 0 0-.2-2 6.62 6.62 0 0 0-.61-1.9 6.47 6.47 0 0 0-2.8-2.8 6.77 6.77 0 0 0-1.9-.63 13.04 13.04 0 0 0-2-.18h-.93L110.13 0Z',
											},
										),
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
											'path',
											{
												d: 'M8.44 39.13c-.3 0-.6 0-.9-.02a12.69 12.69 0 0 1-1.87-.16 5.88 5.88 0 0 1-1.66-.55 5.4 5.4 0 0 1-1.4-1.01 5.32 5.32 0 0 1-1.01-1.4 5.72 5.72 0 0 1-.55-1.66 12.41 12.41 0 0 1-.16-1.87l-.02-.92V8.44l.02-.89a12.37 12.37 0 0 1 .16-1.87 5.76 5.76 0 0 1 .55-1.66 5.37 5.37 0 0 1 1.01-1.4 5.57 5.57 0 0 1 1.4-1.02 5.82 5.82 0 0 1 1.66-.55A12.59 12.59 0 0 1 7.54.9l.9-.02h102.77l.92.02a12.38 12.38 0 0 1 1.86.16 5.94 5.94 0 0 1 1.67.55 5.6 5.6 0 0 1 2.41 2.42 5.76 5.76 0 0 1 .54 1.65 13 13 0 0 1 .17 1.88v.9l.01 1.09v22l-.01.93a12.73 12.73 0 0 1-.17 1.85 5.74 5.74 0 0 1-.54 1.67 5.48 5.48 0 0 1-1.02 1.39 5.41 5.41 0 0 1-1.4 1.02 5.86 5.86 0 0 1-1.66.55 12.54 12.54 0 0 1-1.87.16l-.9.01h-1.09Z',
											},
										),
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
											'path',
											{
												fill: '#fff',
												d: 'M24.77 20.3a4.95 4.95 0 0 1 2.36-4.15 5.07 5.07 0 0 0-4-2.16c-1.67-.18-3.3 1-4.16 1-.87 0-2.19-.98-3.6-.95a5.32 5.32 0 0 0-4.48 2.73c-1.93 3.34-.5 8.26 1.36 10.97.93 1.33 2.01 2.8 3.43 2.75 1.39-.05 1.9-.88 3.58-.88 1.66 0 2.14.88 3.59.85 1.49-.02 2.43-1.33 3.32-2.67a10.96 10.96 0 0 0 1.52-3.09 4.78 4.78 0 0 1-2.92-4.4ZM22.04 12.21a4.87 4.87 0 0 0 1.11-3.49 4.96 4.96 0 0 0-3.2 1.66 4.64 4.64 0 0 0-1.15 3.36 4.1 4.1 0 0 0 3.24-1.53Z',
												'data-name': '<Path>',
											},
										),
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
											'path',
											{
												fill: '#fff',
												d: 'M42.3 27.14h-4.73l-1.14 3.36h-2l4.48-12.42H41l4.49 12.42h-2.04Zm-4.24-1.55h3.75l-1.85-5.45h-.05ZM55.16 25.97c0 2.81-1.5 4.62-3.78 4.62a3.07 3.07 0 0 1-2.85-1.58h-.04v4.48h-1.86V21.44h1.8v1.5h.03a3.21 3.21 0 0 1 2.89-1.6c2.3 0 3.81 1.82 3.81 4.63Zm-1.91 0c0-1.83-.95-3.04-2.4-3.04-1.41 0-2.37 1.23-2.37 3.04 0 1.82.96 3.05 2.38 3.05 1.44 0 2.39-1.2 2.39-3.05ZM65.12 25.97c0 2.81-1.5 4.62-3.77 4.62a3.07 3.07 0 0 1-2.85-1.58h-.05v4.48H56.6V21.44h1.8v1.5h.03a3.21 3.21 0 0 1 2.88-1.6c2.3 0 3.81 1.82 3.81 4.63Zm-1.9 0c0-1.83-.95-3.04-2.4-3.04-1.42 0-2.37 1.23-2.37 3.04 0 1.82.95 3.05 2.37 3.05 1.45 0 2.4-1.2 2.4-3.05ZM71.71 27.04c.14 1.23 1.33 2.04 2.97 2.04 1.57 0 2.7-.81 2.7-1.92 0-.97-.69-1.54-2.3-1.94l-1.6-.39c-2.29-.55-3.34-1.61-3.34-3.34 0-2.15 1.86-3.62 4.51-3.62 2.63 0 4.43 1.47 4.49 3.62h-1.88c-.11-1.24-1.14-2-2.63-2s-2.52.76-2.52 1.87c0 .87.65 1.4 2.25 1.79l1.37.33c2.55.6 3.6 1.63 3.6 3.44 0 2.33-1.85 3.78-4.79 3.78-2.75 0-4.61-1.42-4.73-3.66ZM83.35 19.3v2.14h1.72v1.47h-1.72v5c0 .77.34 1.13 1.1 1.13a5.8 5.8 0 0 0 .6-.04v1.46a5.1 5.1 0 0 1-1.02.09c-1.84 0-2.55-.7-2.55-2.45v-5.19h-1.32v-1.47h1.32V19.3ZM86.06 25.97c0-2.85 1.68-4.64 4.3-4.64s4.3 1.8 4.3 4.64c0 2.86-1.67 4.64-4.3 4.64s-4.3-1.78-4.3-4.64Zm6.7 0c0-1.95-.9-3.1-2.4-3.1s-2.4 1.15-2.4 3.1c0 1.96.9 3.1 2.4 3.1s2.4-1.14 2.4-3.1ZM96.19 21.44h1.77v1.54H98a2.16 2.16 0 0 1 2.18-1.63 2.87 2.87 0 0 1 .64.07v1.74a2.6 2.6 0 0 0-.84-.12 1.87 1.87 0 0 0-1.94 2.09v5.37H96.2ZM109.38 27.84c-.25 1.64-1.85 2.77-3.9 2.77-2.63 0-4.26-1.77-4.26-4.6 0-2.84 1.64-4.68 4.19-4.68 2.5 0 4.08 1.72 4.08 4.47v.63h-6.4v.12a2.36 2.36 0 0 0 2.44 2.56 2.05 2.05 0 0 0 2.09-1.27Zm-6.28-2.7h4.53a2.18 2.18 0 0 0-2.22-2.3 2.3 2.3 0 0 0-2.3 2.3Z',
											},
										),
										(0,
										_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.tZ)(
											'path',
											{
												fill: '#fff',
												d: 'M37.83 8.73a2.64 2.64 0 0 1 2.8 2.97c0 1.9-1.03 3-2.8 3h-2.16V8.73Zm-1.23 5.12h1.12a1.88 1.88 0 0 0 1.97-2.14 1.88 1.88 0 0 0-1.97-2.14H36.6ZM41.68 12.44a2.13 2.13 0 1 1 4.25 0 2.13 2.13 0 1 1-4.25 0Zm3.33 0c0-.97-.43-1.54-1.2-1.54-.78 0-1.21.57-1.21 1.54 0 .99.43 1.55 1.2 1.55.78 0 1.21-.57 1.21-1.55ZM51.57 14.7h-.92l-.93-3.32h-.07l-.93 3.32h-.9l-1.25-4.5h.9l.8 3.43h.07l.93-3.44h.85l.93 3.44h.07l.8-3.44h.89ZM53.85 10.2h.86v.71h.07a1.35 1.35 0 0 1 1.34-.8 1.46 1.46 0 0 1 1.56 1.67v2.92h-.9V12c0-.72-.3-1.08-.96-1.08a1.03 1.03 0 0 0-1.08 1.14v2.64h-.89ZM59.1 8.44h.88v6.26h-.89ZM61.22 12.44a2.13 2.13 0 1 1 4.25 0 2.13 2.13 0 1 1-4.25 0Zm3.33 0c0-.97-.44-1.54-1.2-1.54-.78 0-1.21.57-1.21 1.54 0 .99.43 1.55 1.2 1.55s1.21-.57 1.21-1.55ZM66.4 13.42c0-.8.6-1.27 1.68-1.34l1.22-.07v-.39c0-.47-.32-.74-.93-.74-.5 0-.84.18-.93.5h-.87c.1-.78.82-1.27 1.84-1.27 1.13 0 1.77.56 1.77 1.51v3.08h-.86v-.64h-.07a1.51 1.51 0 0 1-1.35.71 1.36 1.36 0 0 1-1.5-1.35Zm2.9-.38v-.38l-1.1.07c-.62.04-.9.26-.9.65 0 .4.35.64.83.64a1.06 1.06 0 0 0 1.17-.98ZM71.35 12.44c0-1.42.73-2.32 1.87-2.32a1.48 1.48 0 0 1 1.38.79h.06V8.44h.9v6.26h-.86v-.71h-.07a1.56 1.56 0 0 1-1.41.78c-1.15 0-1.87-.9-1.87-2.33Zm.92 0c0 .96.45 1.53 1.2 1.53s1.21-.58 1.21-1.52c0-.94-.47-1.53-1.21-1.53-.75 0-1.2.58-1.2 1.52ZM79.23 12.44a2.13 2.13 0 1 1 4.25 0 2.13 2.13 0 1 1-4.25 0Zm3.33 0c0-.97-.44-1.54-1.2-1.54-.78 0-1.21.57-1.21 1.54 0 .99.43 1.55 1.2 1.55s1.21-.57 1.21-1.55ZM84.67 10.2h.85v.71h.07a1.35 1.35 0 0 1 1.35-.8 1.46 1.46 0 0 1 1.55 1.67v2.92h-.88V12c0-.72-.32-1.08-.98-1.08a1.03 1.03 0 0 0-1.07 1.14v2.64h-.9ZM93.52 9.07v1.15h.97v.74h-.97v2.32c0 .47.19.68.63.68a2.97 2.97 0 0 0 .34-.02v.74a2.92 2.92 0 0 1-.48.04c-1 0-1.38-.35-1.38-1.21v-2.55h-.72v-.74h.72V9.07ZM95.7 8.44h.89v2.48h.07a1.39 1.39 0 0 1 1.37-.8 1.48 1.48 0 0 1 1.55 1.67v2.9h-.89v-2.68c0-.72-.34-1.08-.96-1.08a1.05 1.05 0 0 0-1.14 1.14v2.63h-.89ZM104.76 13.48a1.83 1.83 0 0 1-1.95 1.3 2.05 2.05 0 0 1-2.08-2.32 2.08 2.08 0 0 1 2.08-2.35c1.25 0 2 .85 2 2.27v.3h-3.17v.06a1.19 1.19 0 0 0 1.2 1.29 1.08 1.08 0 0 0 1.07-.55Zm-3.12-1.45h2.27a1.09 1.09 0 0 0-1.1-1.17 1.15 1.15 0 0 0-1.17 1.17Z',
											},
										),
									],
								},
							),
						},
					);
				};
			try {
				(AppleAppStoreButton.displayName = 'AppleAppStoreButton'),
					(AppleAppStoreButton.__docgenInfo = {
						description: '',
						displayName: 'AppleAppStoreButton',
						props: {
							link: {
								defaultValue: null,
								description: '',
								name: 'link',
								required: !0,
								type: { name: 'string' },
							},
							additionalCss: {
								defaultValue: null,
								description: '',
								name: 'additionalCss',
								required: !1,
								type: { name: 'SerializedStyles' },
							},
							overrideButtonHeight: {
								defaultValue: null,
								description: '',
								name: 'overrideButtonHeight',
								required: !1,
								type: { name: 'string' },
							},
						},
					}),
					'undefined' != typeof STORYBOOK_REACT_CLASSES &&
						(STORYBOOK_REACT_CLASSES[
							'client/components/mma/shared/assets/AppleAppStoreButton.tsx#AppleAppStoreButton'
						] = {
							docgenInfo: AppleAppStoreButton.__docgenInfo,
							name: 'AppleAppStoreButton',
							path: 'client/components/mma/shared/assets/AppleAppStoreButton.tsx#AppleAppStoreButton',
						});
			} catch (__react_docgen_typescript_loader_error) {}
		},
		'./shared/externalLinks.ts': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				Xj: () => iosFeastAppUrl,
				_e: () => androidFeastAppUrl,
				pt: () => iosAppUrl,
				vW: () => androidAppUrl,
			});
			var iosAppUrl =
					'https://apps.apple.com/app/the-guardian-live-world-news/id409128287',
				androidAppUrl =
					'https://play.google.com/store/apps/details?id=com.guardian',
				iosFeastAppUrl =
					'https://apps.apple.com/us/app/guardian-feast/id6468674686',
				androidFeastAppUrl =
					'https://play.google.com/store/apps/details?id=uk.co.guardian.feast';
		},
	},
]);
