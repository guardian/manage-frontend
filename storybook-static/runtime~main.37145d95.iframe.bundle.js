(() => {
	'use strict';
	var deferred,
		leafPrototypes,
		getProto,
		inProgress,
		__webpack_modules__ = {},
		__webpack_module_cache__ = {};
	function __webpack_require__(moduleId) {
		var cachedModule = __webpack_module_cache__[moduleId];
		if (void 0 !== cachedModule) return cachedModule.exports;
		var module = (__webpack_module_cache__[moduleId] = {
			id: moduleId,
			loaded: !1,
			exports: {},
		});
		return (
			__webpack_modules__[moduleId].call(
				module.exports,
				module,
				module.exports,
				__webpack_require__,
			),
			(module.loaded = !0),
			module.exports
		);
	}
	(__webpack_require__.m = __webpack_modules__),
		(__webpack_require__.amdO = {}),
		(deferred = []),
		(__webpack_require__.O = (result, chunkIds, fn, priority) => {
			if (!chunkIds) {
				var notFulfilled = 1 / 0;
				for (i = 0; i < deferred.length; i++) {
					for (
						var [chunkIds, fn, priority] = deferred[i],
							fulfilled = !0,
							j = 0;
						j < chunkIds.length;
						j++
					)
						(!1 & priority || notFulfilled >= priority) &&
						Object.keys(__webpack_require__.O).every((key) =>
							__webpack_require__.O[key](chunkIds[j]),
						)
							? chunkIds.splice(j--, 1)
							: ((fulfilled = !1),
							  priority < notFulfilled &&
									(notFulfilled = priority));
					if (fulfilled) {
						deferred.splice(i--, 1);
						var r = fn();
						void 0 !== r && (result = r);
					}
				}
				return result;
			}
			priority = priority || 0;
			for (
				var i = deferred.length;
				i > 0 && deferred[i - 1][2] > priority;
				i--
			)
				deferred[i] = deferred[i - 1];
			deferred[i] = [chunkIds, fn, priority];
		}),
		(__webpack_require__.n = (module) => {
			var getter =
				module && module.__esModule
					? () => module.default
					: () => module;
			return __webpack_require__.d(getter, { a: getter }), getter;
		}),
		(getProto = Object.getPrototypeOf
			? (obj) => Object.getPrototypeOf(obj)
			: (obj) => obj.__proto__),
		(__webpack_require__.t = function (value, mode) {
			if ((1 & mode && (value = this(value)), 8 & mode)) return value;
			if ('object' == typeof value && value) {
				if (4 & mode && value.__esModule) return value;
				if (16 & mode && 'function' == typeof value.then) return value;
			}
			var ns = Object.create(null);
			__webpack_require__.r(ns);
			var def = {};
			leafPrototypes = leafPrototypes || [
				null,
				getProto({}),
				getProto([]),
				getProto(getProto),
			];
			for (
				var current = 2 & mode && value;
				'object' == typeof current && !~leafPrototypes.indexOf(current);
				current = getProto(current)
			)
				Object.getOwnPropertyNames(current).forEach(
					(key) => (def[key] = () => value[key]),
				);
			return (
				(def.default = () => value), __webpack_require__.d(ns, def), ns
			);
		}),
		(__webpack_require__.d = (exports, definition) => {
			for (var key in definition)
				__webpack_require__.o(definition, key) &&
					!__webpack_require__.o(exports, key) &&
					Object.defineProperty(exports, key, {
						enumerable: !0,
						get: definition[key],
					});
		}),
		(__webpack_require__.f = {}),
		(__webpack_require__.e = (chunkId) =>
			Promise.all(
				Object.keys(__webpack_require__.f).reduce(
					(promises, key) => (
						__webpack_require__.f[key](chunkId, promises), promises
					),
					[],
				),
			)),
		(__webpack_require__.u = (chunkId) =>
			(({
				152: 'components-mma-signInError-SignInError-stories',
				274: 'components-mma-holiday-Holiday-stories',
				374: 'components-mma-cancel-cancellationSaves-digipack-DigiSubSaves-stories',
				635: 'components-mma-help-Help-stories',
				666: 'components-mma-delivery-address-DeliveryAddress-stories',
				715: 'components-mma-shared-DateInput-stories',
				726: 'components-mma-delivery-records-DeliveryRecords-stories',
				908: 'components-shared-FormError-stories',
				941: 'components-mma-shared-DatePicker-stories',
				1314: 'components-mma-shared-ProgressStepper-stories',
				1325: 'components-mma-cancelReminders-CancelReminders-stories',
				1628: 'components-mma-identity-settings-Settings-stories',
				1748: 'components-mma-identity-publicProfile-PublicProfile-stories',
				1970: 'components-mma-paymentUpdate-UpdatePayment-stories',
				2026: 'components-helpCentre-HelpCentrePhoneNumbers-stories',
				2450: 'components-shared-WithStandardTopMargin-stories',
				2468: 'components-shared-Spinner-stories',
				2573: 'components-mma-cancel-cancellationSaves-membership-MembershipSaves-stories',
				2635: 'components-shared-ExpanderButton-stories',
				2651: 'components-shared-footer-Footer-stories',
				2762: 'components-mma-shared-DownloadFeastAppCtaWithImage-stories',
				3240: 'components-mma-upgrade-UpgradeSupport-stories',
				3336: 'components-mma-dataPrivacy-DataPrivacy-stories',
				3534: 'components-mma-shared-CallCentrePrompt-stories',
				3720: 'components-shared-CallCentreEmailAndNumbers-stories',
				3892: 'components-helpCentre-HelpCentreArticle-stories',
				3953: 'components-mma-shared-NewspaperArchiveCta-stories',
				4035: 'components-mma-cancel-cancellationSaves-CancellationLanding-stories',
				4088: 'components-mma-holiday-HolidayT3-stories',
				4386: 'components-mma-accountoverview-AccountOverview-stories',
				4438: 'components-mma-accountoverview-manageProducts-ManageProductV2-stories',
				4596: 'components-shared-CallCentreAccordion-stories',
				4669: 'components-mma-shared-OverlayLoader-stories',
				4681: 'components-mma-maintenance-Maintenance-stories',
				4707: 'components-mma-switch-options-SwitchOptions-stories',
				4796: 'components-mma-identity-emailAndMarketing-EmailAndMarketing-stories',
				4938: 'components-mma-shared-ProductInfoTableV2-stories',
				5014: 'components-mma-shared-DownloadAppCtaVariation1-stories',
				5286: 'components-mma-shared-BasicProductInfoTable-stories',
				5996: 'components-mma-shared-Button-stories',
				6052: 'components-mma-switch-complete-SwitchComplete-stories',
				6284: 'components-shared-Main-stories',
				6657: 'components-mma-cancel-Cancellation-stories',
				6956: 'components-mma-billing-Billing-stories',
				6966: 'components-mma-shared-LinkButton-stories',
				7297: 'components-shared-Header-stories',
				8042: 'components-helpCentre-HelpCentre-stories',
				8045: 'components-mma-accountoverview-ManageProduct-stories',
				8255: 'components-mma-switch-review-SwitchReview-stories',
				9157: 'components-shared-SupportTheGuardianButton-stories',
				9180: 'components-mma-shared-ProgressIndicator-stories',
				9322: 'components-helpCentre-HelpCentreTopic-stories',
				9505: 'components-helpCentre-contactUs-ContactUs-stories',
				9875: 'components-shared-CallCentreNumbers-stories',
			}[chunkId] || chunkId) +
			'.' +
			{
				42: '60b4089f',
				134: 'd872110f',
				152: '5e83b003',
				190: '3ee3e99a',
				223: 'b1ebe683',
				253: '7cc7e232',
				274: 'ed94c17a',
				374: '761cf676',
				571: '2957a802',
				611: '321b78d1',
				635: '10fd8cd3',
				666: 'f1f7ea94',
				672: '1d93e99b',
				715: '12b80667',
				726: '0f4cb888',
				740: 'c34bdbf1',
				745: '130ea464',
				759: '0260f9e8',
				908: 'f248975f',
				941: '617e44b8',
				982: 'be63e823',
				1118: '151d64ec',
				1245: '52694bf2',
				1314: '91325b30',
				1325: '2e5cb0bd',
				1482: '1e6f6eb2',
				1628: '5b0ffc9f',
				1678: '52cbb12f',
				1748: 'fd6877be',
				1931: 'd73f32c6',
				1970: '59b83c30',
				1976: 'd92f5edb',
				2001: 'd56f787b',
				2026: '4f5f5bd6',
				2450: 'bdd5c1b8',
				2468: 'f4a679db',
				2573: '8ca025eb',
				2602: '70f42d06',
				2635: '4df7f142',
				2651: '8c00fab6',
				2762: '161c99a9',
				2897: 'd7841c4a',
				2986: '05f6973a',
				3155: 'd3660d80',
				3240: '96acc8f5',
				3245: '010c0b48',
				3336: '5a2d0cb3',
				3448: 'ef68efda',
				3534: '8b47aced',
				3720: '430052a8',
				3890: 'df3f3596',
				3892: '426bfda6',
				3953: 'b7335ae3',
				4035: 'dad31ee4',
				4036: '5acb7ecd',
				4048: '42200fbe',
				4051: 'b22d636b',
				4088: 'f2d3a699',
				4093: 'e2ed5c78',
				4135: '4aaae4a8',
				4386: '562e03cd',
				4438: '22c3eddf',
				4596: 'ff878f7f',
				4605: 'b317fb5f',
				4669: '91f66e1c',
				4681: 'ca492658',
				4707: '06129cb4',
				4709: '64102412',
				4723: '636acf7b',
				4796: 'd6d4f6f5',
				4832: '52c98426',
				4938: '3a00bda3',
				5014: '9015862a',
				5286: '7fcbeeb9',
				5304: '41364471',
				5312: 'd2ed9220',
				5454: '2b29d9fd',
				5562: 'fd08c380',
				5699: '654c6c59',
				5996: '860137cf',
				6052: 'e66ce105',
				6256: '33f3b495',
				6284: '4448b9e8',
				6302: '60c2c378',
				6393: 'ec9fa45e',
				6648: '144d799f',
				6657: '573f47a4',
				6750: '19c9086c',
				6767: '9370bd77',
				6790: 'f17800ef',
				6881: '86af5650',
				6890: '45a71c73',
				6956: '750e952a',
				6966: '950b0140',
				7293: '08c00b68',
				7294: '68297aa9',
				7297: 'ab23a1cd',
				7304: 'adab82a4',
				7625: '83103286',
				7931: 'e2c55cf7',
				8042: '5809095c',
				8045: 'ee5e9f12',
				8255: 'ff1cdabc',
				8368: '4dc84886',
				8698: 'dc9344de',
				8764: '73395cfc',
				8801: '930f4354',
				9157: 'c6584ec2',
				9180: '3c14e438',
				9277: 'b043c87d',
				9322: 'cb407bd2',
				9433: '870a5e0e',
				9505: '9140aa09',
				9815: '630fa8d0',
				9875: '5b1657c2',
				9954: '2492c0e9',
				9959: 'baf45d07',
			}[chunkId] +
			'.iframe.bundle.js')),
		(__webpack_require__.g = (function () {
			if ('object' == typeof globalThis) return globalThis;
			try {
				return this || new Function('return this')();
			} catch (e) {
				if ('object' == typeof window) return window;
			}
		})()),
		(__webpack_require__.hmd = (module) => (
			(module = Object.create(module)).children || (module.children = []),
			Object.defineProperty(module, 'exports', {
				enumerable: !0,
				set: () => {
					throw new Error(
						'ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' +
							module.id,
					);
				},
			}),
			module
		)),
		(__webpack_require__.o = (obj, prop) =>
			Object.prototype.hasOwnProperty.call(obj, prop)),
		(inProgress = {}),
		(__webpack_require__.l = (url, done, key, chunkId) => {
			if (inProgress[url]) inProgress[url].push(done);
			else {
				var script, needAttach;
				if (void 0 !== key)
					for (
						var scripts = document.getElementsByTagName('script'),
							i = 0;
						i < scripts.length;
						i++
					) {
						var s = scripts[i];
						if (
							s.getAttribute('src') == url ||
							s.getAttribute('data-webpack') ==
								'manage-frontend:' + key
						) {
							script = s;
							break;
						}
					}
				script ||
					((needAttach = !0),
					((script = document.createElement('script')).charset =
						'utf-8'),
					(script.timeout = 120),
					__webpack_require__.nc &&
						script.setAttribute('nonce', __webpack_require__.nc),
					script.setAttribute(
						'data-webpack',
						'manage-frontend:' + key,
					),
					(script.src = url)),
					(inProgress[url] = [done]);
				var onScriptComplete = (prev, event) => {
						(script.onerror = script.onload = null),
							clearTimeout(timeout);
						var doneFns = inProgress[url];
						if (
							(delete inProgress[url],
							script.parentNode &&
								script.parentNode.removeChild(script),
							doneFns && doneFns.forEach((fn) => fn(event)),
							prev)
						)
							return prev(event);
					},
					timeout = setTimeout(
						onScriptComplete.bind(null, void 0, {
							type: 'timeout',
							target: script,
						}),
						12e4,
					);
				(script.onerror = onScriptComplete.bind(null, script.onerror)),
					(script.onload = onScriptComplete.bind(
						null,
						script.onload,
					)),
					needAttach && document.head.appendChild(script);
			}
		}),
		(__webpack_require__.r = (exports) => {
			'undefined' != typeof Symbol &&
				Symbol.toStringTag &&
				Object.defineProperty(exports, Symbol.toStringTag, {
					value: 'Module',
				}),
				Object.defineProperty(exports, '__esModule', { value: !0 });
		}),
		(__webpack_require__.nmd = (module) => (
			(module.paths = []),
			module.children || (module.children = []),
			module
		)),
		(__webpack_require__.p = ''),
		(() => {
			var installedChunks = { 1303: 0 };
			(__webpack_require__.f.j = (chunkId, promises) => {
				var installedChunkData = __webpack_require__.o(
					installedChunks,
					chunkId,
				)
					? installedChunks[chunkId]
					: void 0;
				if (0 !== installedChunkData)
					if (installedChunkData)
						promises.push(installedChunkData[2]);
					else if (1303 != chunkId) {
						var promise = new Promise(
							(resolve, reject) =>
								(installedChunkData = installedChunks[chunkId] =
									[resolve, reject]),
						);
						promises.push((installedChunkData[2] = promise));
						var url =
								__webpack_require__.p +
								__webpack_require__.u(chunkId),
							error = new Error();
						__webpack_require__.l(
							url,
							(event) => {
								if (
									__webpack_require__.o(
										installedChunks,
										chunkId,
									) &&
									(0 !==
										(installedChunkData =
											installedChunks[chunkId]) &&
										(installedChunks[chunkId] = void 0),
									installedChunkData)
								) {
									var errorType =
											event &&
											('load' === event.type
												? 'missing'
												: event.type),
										realSrc =
											event &&
											event.target &&
											event.target.src;
									(error.message =
										'Loading chunk ' +
										chunkId +
										' failed.\n(' +
										errorType +
										': ' +
										realSrc +
										')'),
										(error.name = 'ChunkLoadError'),
										(error.type = errorType),
										(error.request = realSrc),
										installedChunkData[1](error);
								}
							},
							'chunk-' + chunkId,
							chunkId,
						);
					} else installedChunks[chunkId] = 0;
			}),
				(__webpack_require__.O.j = (chunkId) =>
					0 === installedChunks[chunkId]);
			var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
					var moduleId,
						chunkId,
						[chunkIds, moreModules, runtime] = data,
						i = 0;
					if (chunkIds.some((id) => 0 !== installedChunks[id])) {
						for (moduleId in moreModules)
							__webpack_require__.o(moreModules, moduleId) &&
								(__webpack_require__.m[moduleId] =
									moreModules[moduleId]);
						if (runtime) var result = runtime(__webpack_require__);
					}
					for (
						parentChunkLoadingFunction &&
						parentChunkLoadingFunction(data);
						i < chunkIds.length;
						i++
					)
						(chunkId = chunkIds[i]),
							__webpack_require__.o(installedChunks, chunkId) &&
								installedChunks[chunkId] &&
								installedChunks[chunkId][0](),
							(installedChunks[chunkId] = 0);
					return __webpack_require__.O(result);
				},
				chunkLoadingGlobal = (self.webpackChunkmanage_frontend =
					self.webpackChunkmanage_frontend || []);
			chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0)),
				(chunkLoadingGlobal.push = webpackJsonpCallback.bind(
					null,
					chunkLoadingGlobal.push.bind(chunkLoadingGlobal),
				));
		})(),
		(__webpack_require__.nc = void 0);
})();
