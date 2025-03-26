'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[3890],
	{
		'./node_modules/@guardian/libs/dist/index.js': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__),
				__webpack_require__.d(__webpack_exports__, {
					ArticleDesign: () => ArticleDesign,
					ArticleDisplay: () => ArticleDisplay,
					ArticleElementRole: () => ArticleElementRole,
					ArticlePillar: () => ArticlePillar,
					ArticleSpecial: () => ArticleSpecial,
					Pillar: () => Pillar,
					cmp: () => consent_management_platform_cmp,
					countries: () => countries,
					debug: () => debug,
					getConsentFor: () =>
						consent_management_platform_getConsentFor,
					getCookie: () => getCookie,
					getCountryByCountryCode: () => getCountryByCountryCode,
					getLocale: () => getLocale,
					getMeasures: () => getMeasures,
					getSwitches: () => getSwitches,
					isBoolean: () => isBoolean,
					isNonNullable: () => isNonNullable,
					isObject: () => isObject,
					isOneOf: () => isOneOf.g,
					isString: () => isString,
					isUndefined: () => isUndefined,
					joinUrl: () => joinUrl,
					loadScript: () => loadScript,
					log: () => log,
					onConsent: () => consent_management_platform_onConsent,
					onConsentChange: () =>
						consent_management_platform_onConsentChange,
					removeCookie: () => removeCookie,
					setCookie: () => setCookie,
					setSessionCookie: () => setSessionCookie,
					startPerformanceMeasure: () => startPerformanceMeasure,
					storage: () => storage,
					timeAgo: () => timeAgo,
				});
			var Pillar = ((Pillar2) => (
				(Pillar2[(Pillar2.News = 0)] = 'News'),
				(Pillar2[(Pillar2.Opinion = 1)] = 'Opinion'),
				(Pillar2[(Pillar2.Sport = 2)] = 'Sport'),
				(Pillar2[(Pillar2.Culture = 3)] = 'Culture'),
				(Pillar2[(Pillar2.Lifestyle = 4)] = 'Lifestyle'),
				Pillar2
			))(Pillar || {});
			const ArticlePillar = Pillar;
			var ArticleElementRole = ((ArticleElementRole2) => (
				(ArticleElementRole2[(ArticleElementRole2.Standard = 0)] =
					'Standard'),
				(ArticleElementRole2[(ArticleElementRole2.Immersive = 1)] =
					'Immersive'),
				(ArticleElementRole2[(ArticleElementRole2.Supporting = 2)] =
					'Supporting'),
				(ArticleElementRole2[(ArticleElementRole2.Showcase = 3)] =
					'Showcase'),
				(ArticleElementRole2[(ArticleElementRole2.Inline = 4)] =
					'Inline'),
				(ArticleElementRole2[(ArticleElementRole2.Thumbnail = 5)] =
					'Thumbnail'),
				(ArticleElementRole2[(ArticleElementRole2.HalfWidth = 6)] =
					'HalfWidth'),
				ArticleElementRole2
			))(ArticleElementRole || {});
			const isString = (_) =>
					'[object String]' === Object.prototype.toString.call(_),
				isUndefined = (_) => void 0 === _,
				isObject = (value) => {
					if (
						'[object Object]' !==
						Object.prototype.toString.call(value)
					)
						return !1;
					const prototype = Object.getPrototypeOf(value);
					return null === prototype || prototype === Object.prototype;
				};
			var _storage,
				_local,
				_session,
				_a,
				__defProp = Object.defineProperty,
				__typeError = (msg) => {
					throw TypeError(msg);
				},
				__publicField = (obj, key, value) =>
					((obj, key, value) =>
						key in obj
							? __defProp(obj, key, {
									enumerable: !0,
									configurable: !0,
									writable: !0,
									value,
							  })
							: (obj[key] = value))(
						obj,
						'symbol' != typeof key ? key + '' : key,
						value,
					),
				__accessCheck = (obj, member, msg) =>
					member.has(obj) || __typeError('Cannot ' + msg),
				__privateGet = (obj, member, getter) => (
					__accessCheck(obj, member, 'read from private field'),
					getter ? getter.call(obj) : member.get(obj)
				),
				__privateAdd = (obj, member, value) =>
					member.has(obj)
						? __typeError(
								'Cannot add the same private member more than once',
						  )
						: member instanceof WeakSet
						? member.add(obj)
						: member.set(obj, value),
				__privateSet = (obj, member, value, setter) => (
					__accessCheck(obj, member, 'write to private field'),
					member.set(obj, value),
					value
				);
			class StorageFactory {
				constructor(storageHandler) {
					__privateAdd(this, _storage),
						__publicField(this, 'isAvailable', () =>
							Boolean(__privateGet(this, _storage)),
						),
						__publicField(this, 'get', (key) => {
							try {
								const data = JSON.parse(
									__privateGet(this, _storage)?.getItem(
										key,
									) ?? '',
								);
								if (!isObject(data)) return null;
								const { value, expires } = data;
								return (isString(expires) ||
									'number' == typeof expires) &&
									new Date() > new Date(expires)
									? (this.remove(key), null)
									: value;
							} catch (e) {
								return null;
							}
						}),
						__publicField(this, 'set', (key, value, expires) =>
							__privateGet(this, _storage)?.setItem(
								key,
								JSON.stringify({
									value,
									expires: expires
										? new Date(expires)
										: void 0,
								}),
							),
						),
						__publicField(this, 'remove', (key) =>
							__privateGet(this, _storage)?.removeItem(key),
						),
						__publicField(this, 'clear', () =>
							__privateGet(this, _storage)?.clear(),
						),
						__publicField(
							this,
							'getRaw',
							(key) =>
								__privateGet(this, _storage)?.getItem(key) ??
								null,
						),
						__publicField(this, 'setRaw', (key, value) =>
							__privateGet(this, _storage)?.setItem(key, value),
						),
						__publicField(
							this,
							'key',
							(index) =>
								__privateGet(this, _storage)?.key(index) ??
								null,
						),
						__publicField(
							this,
							'length',
							() => __privateGet(this, _storage)?.length ?? null,
						);
					try {
						const storage2 = window[storageHandler],
							uid = new Date().toString();
						storage2.setItem(uid, uid);
						const available = storage2.getItem(uid) == uid;
						storage2.removeItem(uid),
							available && __privateSet(this, _storage, storage2);
					} catch (e) {}
				}
			}
			_storage = new WeakMap();
			const storage = new ((_a = class {
					constructor() {
						__privateAdd(this, _local),
							__privateAdd(this, _session);
					}
					get local() {
						return (
							__privateGet(this, _local) ??
							__privateSet(
								this,
								_local,
								new StorageFactory('localStorage'),
							)
						);
					}
					get session() {
						return (
							__privateGet(this, _session) ??
							__privateSet(
								this,
								_session,
								new StorageFactory('sessionStorage'),
							)
						);
					}
				}),
				(_local = new WeakMap()),
				(_session = new WeakMap()),
				_a)(),
				subscriptionStyles = {
					commercial: { background: '#77EEAA', font: '#004400' },
					cmp: { background: '#FF6BB5', font: '#2F0404' },
					dotcom: { background: '#000000', font: '#ff7300' },
					design: { background: '#185E36', font: '#FFF4F2' },
					tx: { background: '#2F4F4F', font: '#FFFFFF' },
					supporterRevenue: {
						background: '#0F70B7',
						font: '#ffffff',
					},
					identity: { background: '#6F5F8F', font: '#ffffff' },
					openJournalism: { background: '#C74600', font: '#FEF9F5' },
					perf: { background: '#FFD700', font: '#000000' },
				},
				isSubscription = (subscription) =>
					Object.keys(subscriptionStyles).includes(subscription);
			var logger_a;
			let SUBSCRIPTIONS_CACHE;
			const getSubscriptions = () => {
					if (isUndefined(SUBSCRIPTIONS_CACHE)) {
						const storedSubscriptions =
							storage.local.get('gu.logger');
						SUBSCRIPTIONS_CACHE = isString(storedSubscriptions)
							? new Set(
									storedSubscriptions
										.split(',')
										.filter(isSubscription),
							  )
							: new Set();
					}
					return SUBSCRIPTIONS_CACHE;
				},
				subscribeTo = (subscription) => {
					const subscriptions = getSubscriptions();
					subscriptions.add(subscription),
						storage.local.set(
							'gu.logger',
							Array.from(subscriptions).join(','),
						),
						log(subscription, '🔔 Subscribed, hello!');
				},
				unsubscribeFrom = (subscription) => {
					const subscriptions = getSubscriptions();
					subscriptions.delete(subscription),
						storage.local.set(
							'gu.logger',
							Array.from(subscriptions).join(','),
						),
						log(subscription, '🔕 Unsubscribed, good-bye!');
				},
				isSubscribedTo = (subscription) =>
					getSubscriptions().has(subscription),
				logStyles = {
					...subscriptionStyles,
					common: { background: '#C1D8FC', font: '#052962' },
				},
				messageStyle = (subscriptionStyle) => {
					const { background, font } = logStyles[subscriptionStyle];
					return `background: ${background}; color: ${font}; padding: 2px 6px; border-radius:20px`;
				},
				log = (subscription, ...args) => {
					if (isSubscribedTo(subscription)) {
						const styles = [
							messageStyle('common'),
							'',
							messageStyle(subscription),
							'',
						];
						console.log(
							`%c@guardian%c %c${subscription}%c`,
							...styles,
							...args,
						);
					}
				};
			let currentFramework;
			'undefined' != typeof window &&
				(window.guardian ?? (window.guardian = {}),
				(logger_a = window.guardian).logger ??
					(logger_a.logger = {
						subscribeTo,
						unsubscribeFrom,
						teams: () => (
							console.warn(
								'guardian.logger.teams() is deprecated - use subscriptions()',
							),
							Object.keys(subscriptionStyles)
						),
						subscriptions: () => Object.keys(subscriptionStyles),
					}));
			const getCurrentFramework = () => currentFramework,
				isServerSide = 'undefined' == typeof window,
				serverSideWarn = () => {
					console.warn(
						'This is a server-side version of the @guardian/consent-management-platform',
						'No consent signals will be received.',
					);
				},
				serverSideWarnAndReturn = (arg) => () => (
					serverSideWarn(), arg
				),
				cmp = {
					__disable: serverSideWarn,
					__enable: serverSideWarnAndReturn(!1),
					__isDisabled: serverSideWarnAndReturn(!1),
					hasInitialised: serverSideWarnAndReturn(!1),
					init: serverSideWarn,
					showPrivacyManager: serverSideWarn,
					version: 'n/a',
					willShowPrivacyMessage: serverSideWarnAndReturn(
						Promise.resolve(!1),
					),
					willShowPrivacyMessageSync: serverSideWarnAndReturn(!1),
				};
			let isGuardian;
			const isGuardianDomain = () => (
					void 0 === isGuardian &&
						(isGuardian =
							!!isServerSide ||
							window.location.host.endsWith('.theguardian.com')),
					isGuardian
				),
				ENDPOINT = isGuardianDomain()
					? 'https://sourcepoint.theguardian.com'
					: 'https://cdn.privacy-mgmt.com',
				SourcePointChoiceTypes_AcceptAll = 11,
				SourcePointChoiceTypes_ManageCookies = 12,
				SourcePointChoiceTypes_RejectAll = 13,
				SourcePointChoiceTypes_Dismiss = 15,
				consentOrPayCountries = ['GB'];
			let _isConsentOrPay = !1;
			const getIsConsentOrPay = () => _isConsentOrPay,
				isConsentOrPayCountry = (countryCode) =>
					consentOrPayCountries.includes(countryCode),
				mark = (label) => {
					window.performance?.mark?.(label),
						log('cmp', '[event]', label);
				},
				sectionExclusionList = ['info', 'help'],
				isExcludedFromCMP = (pageSection) =>
					sectionExclusionList.some(
						(section) => section === pageSection,
					),
				getOphanRecordFunction = () => {
					const record = window.guardian?.ophan?.record;
					return (
						record ||
						(console.log(
							'window.guardian.ophan.record is not available',
						),
						() => {})
					);
				},
				constructBannerMessageId = (messageId) =>
					`${
						getIsConsentOrPay()
							? 'CONSENT_OR_PAY_BANNER'
							: 'ACCEPT_REJECT'
					}-${messageId}`,
				getCookieValues = (name) => {
					const nameEq = `${name}=`;
					return document.cookie.split(';').reduce((acc, cookie) => {
						const cookieTrimmed = cookie.trim();
						return (
							cookieTrimmed.startsWith(nameEq) &&
								acc.push(
									cookieTrimmed.substring(
										nameEq.length,
										cookieTrimmed.length,
									),
								),
							acc
						);
					}, []);
				},
				memoizedCookies = new Map(),
				getCookie = ({ name, shouldMemoize = !1 }) => {
					const memoizedCookie = memoizedCookies.get(name);
					if (memoizedCookie) return memoizedCookie;
					const [value] = getCookieValues(name);
					return value
						? (shouldMemoize && memoizedCookies.set(name, value),
						  value)
						: null;
				},
				purposeIdToNonAdvertisingPurposesMap = new Map([
					[1, '677e3387b265dc07332909da'],
					[2, '677e3386b265dc073328f686'],
					[3, '677e3386b265dc073328f96f'],
					[4, '677e3386b265dc073328fc01'],
					[5, '677e3386b265dc073328fe72'],
					[6, '677e3386b265dc073328ff70'],
					[7, '677e3386b265dc0733290050'],
					[8, '677e3386b265dc07332903c8'],
					[9, '677e3386b265dc0733290502'],
					[10, '677e3386b265dc073329071a'],
					[11, '677e3386b265dc07332909c2'],
				]),
				spBaseUrl =
					'https://cdn.privacy-mgmt.com/consent/tcfv2/consent/v3',
				getUserConsentForAdvertisingVendorList = async () => {
					const consentUUID = getCookie({ name: 'consentUUID' }),
						url = `${spBaseUrl}/history/7417?consentUUID=${consentUUID}`,
						getUserConsentOnAdvertisingListResponse = await fetch(
							url,
							{
								method: 'GET',
								headers: {
									Accept: 'application/json',
									'Content-Type': 'application/json',
								},
							},
						);
					return await getUserConsentOnAdvertisingListResponse.json();
				},
				getConsentedPurposesandVendorsStrings = (data) => {
					const vendorIds = data[0]?.vendors.map(
							(vendor) => vendor._id,
						),
						purposeIds = data[0]?.categories
							.map(
								(category) =>
									purposeIdToNonAdvertisingPurposesMap.get(
										category.iabPurposeRef.iabId,
									) ?? '',
							)
							.filter(isString),
						legitimateInterestPurposeIds = data[0]?.legIntCategories
							.map(
								(category) =>
									purposeIdToNonAdvertisingPurposesMap.get(
										category.iabPurposeRef.iabId,
									) ?? '',
							)
							.filter(isString);
					return vendorIds &&
						purposeIds &&
						legitimateInterestPurposeIds
						? {
								vendors: vendorIds,
								purposes: purposeIds,
								legitimateInterestPurposeIds,
						  }
						: void 0;
				},
				sendUserCustomConsentToNonAdvertisingVendorList = async (
					vendorIds,
					purposeIds,
					legitimateInterestPurposeIds,
				) => {
					const consentUUID = getCookie({ name: 'consentUUID' }),
						url = `${spBaseUrl}/custom/38161?hasCsp=true&consentUUID=${consentUUID}`;
					await makePOSTRequest(url, {
						vendors: vendorIds,
						categories: purposeIds,
						legIntCategories: legitimateInterestPurposeIds,
					});
				},
				sendUserConsentStringToNonAdvertisingVendorList = async () => {
					const consentUUID = getCookie({ name: 'consentUUID' }),
						url = `${spBaseUrl}/38161/tcstring?consentUUID=${consentUUID}`,
						spUserConsentString = localStorage.getItem(
							'_sp_user_consent_7417',
						),
						userConsent = JSON.parse(spUserConsentString ?? '{}');
					await makePOSTRequest(url, {
						euconsent: userConsent.gdpr?.euconsent,
					});
				},
				makePOSTRequest = async (url, body) => {
					await fetch(url, {
						method: 'POST',
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(body),
					});
				},
				getUSPData = () => {
					return (
						(command = 'getUSPData'),
						new Promise((resolve, reject) => {
							window.__uspapi
								? window.__uspapi(
										command,
										1,
										(result, success) =>
											success
												? resolve(result)
												: reject(
														new Error(
															`Unable to get ${command} data`,
														),
												  ),
								  )
								: reject(
										new Error(
											'No __uspapi found on window',
										),
								  );
						})
					);
					var command;
				},
				getConsentState = async () => ({
					personalisedAdvertising: !(
						'Y' === (await getUSPData()).uspString.charAt(2)
					),
				}),
				api_api = (
					command,
					vendorIds,
					purposeIds,
					legitimateInterestPurposeIds,
				) =>
					new Promise((resolve, reject) => {
						window.__tcfapi
							? window.__tcfapi(
									command,
									2,
									(result, success) =>
										success
											? resolve(result)
											: reject(
													new Error(
														`Unable to get ${command} data`,
													),
											  ),
									vendorIds,
									purposeIds,
									legitimateInterestPurposeIds,
							  )
							: reject(new Error('No __tcfapi found on window'));
					}),
				defaultConsents = {
					1: !1,
					2: !1,
					3: !1,
					4: !1,
					5: !1,
					6: !1,
					7: !1,
					8: !1,
					9: !1,
					10: !1,
					11: !1,
				},
				getConsentState_getConsentState = async () => {
					const [tcData, customVendors] = await Promise.all([
						api_api('addEventListener'),
						api_api('getCustomVendorConsents'),
					]);
					if (void 0 === tcData) {
						const currentFramework =
							getCurrentFramework() ?? 'undefined';
						throw new Error(
							`No TC Data found with current framework: ${currentFramework}`,
						);
					}
					const consents = {
							...defaultConsents,
							...tcData.purpose.consents,
						},
						{ eventStatus, gdprApplies, tcString, addtlConsent } =
							tcData,
						{ grants } = customVendors;
					return {
						consents,
						eventStatus,
						vendorConsents: Object.keys(grants)
							.sort()
							.reduce(
								(acc, cur) => ({
									...acc,
									[cur]: grants[cur]?.vendorGrant,
								}),
								{},
							),
						addtlConsent,
						gdprApplies,
						tcString,
					};
				},
				getGPPData = () => {
					return (
						(command = 'ping'),
						new Promise((resolve, reject) => {
							window.__gpp
								? window.__gpp(command, (result, success) =>
										success
											? resolve(result)
											: reject(
													new Error(
														`Unable to get ${command} data`,
													),
											  ),
								  )
								: reject(new Error('No __gpp found on window'));
						})
					);
					var command;
				},
				usnat_getConsentState_getConsentState = async () => {
					let doNotSell = !1;
					const gppData = await getGPPData(),
						applicableSection = gppData.applicableSections[0],
						supportedAPI = gppData.supportedAPIs.find((api) =>
							api.startsWith(`${String(applicableSection)}:`),
						),
						parsedSectionKey = supportedAPI
							? supportedAPI.split(':')[1]
							: void 0,
						parsedSection = parsedSectionKey
							? gppData.parsedSections[parsedSectionKey]
							: void 0;
					return (
						parsedSection &&
							(doNotSell =
								2 !== parsedSection.SaleOptOut ||
								parsedSection.Gpc),
						{ doNotSell, signalStatus: gppData.signalStatus }
					);
				},
				callBackQueue = [],
				finalCallbackQueue = [],
				awaitingUserInteractionInTCFv2 = (state) =>
					'cmpuishown' === state.tcfv2?.eventStatus,
				awaitingUserInteractionInUSNAT = (state) =>
					'not ready' === state.usnat?.signalStatus,
				invokeCallback = (callback, state) => {
					if (
						awaitingUserInteractionInTCFv2(state) ||
						awaitingUserInteractionInUSNAT(state)
					)
						return;
					const stateString = JSON.stringify(state);
					stateString !== callback.lastState &&
						(callback.fn(state),
						(callback.lastState = stateString));
				},
				enhanceConsentState = (consentState) => {
					const gpcSignal = isServerSide
						? void 0
						: navigator.globalPrivacyControl;
					if (consentState.tcfv2) {
						const consents = consentState.tcfv2.consents;
						return {
							...consentState,
							canTarget:
								Object.keys(consents).length > 0 &&
								Object.values(consents).every(Boolean),
							framework: 'tcfv2',
							gpcSignal,
						};
					}
					return consentState.usnat
						? {
								...consentState,
								canTarget: !consentState.usnat.doNotSell,
								framework: 'usnat',
								gpcSignal,
						  }
						: consentState.aus
						? {
								...consentState,
								canTarget:
									consentState.aus.personalisedAdvertising,
								framework: 'aus',
								gpcSignal,
						  }
						: {
								...consentState,
								canTarget: !1,
								framework: null,
								gpcSignal,
						  };
				},
				onConsentChange_getConsentState = async () => {
					switch (getCurrentFramework()) {
						case 'aus':
							return enhanceConsentState({
								aus: await getConsentState(),
							});
						case 'usnat':
							return enhanceConsentState({
								usnat: await usnat_getConsentState_getConsentState(),
							});
						case 'tcfv2':
							return enhanceConsentState({
								tcfv2: await getConsentState_getConsentState(),
							});
						default:
							throw new Error(
								'no IAB consent framework found on the page',
							);
					}
				},
				invokeCallbacks = () => {
					const callbacksToInvoke =
						callBackQueue.concat(finalCallbackQueue);
					0 !== callbacksToInvoke.length &&
						onConsentChange_getConsentState().then((state) => {
							awaitingUserInteractionInTCFv2(state) ||
								awaitingUserInteractionInUSNAT(state) ||
								callbacksToInvoke.forEach((callback) =>
									invokeCallback(callback, state),
								);
						});
				},
				onConsentChange_onConsentChange = (callBack, final = !1) => {
					const newCallback = { fn: callBack };
					final
						? finalCallbackQueue.push(newCallback)
						: callBackQueue.push(newCallback),
						onConsentChange_getConsentState()
							.then((consentState) => {
								invokeCallback(newCallback, consentState);
							})
							.catch(() => {});
				},
				stub_tcfv2 = () => {
					!(function (t) {
						var e = {};
						function n(r) {
							if (e[r]) return e[r].exports;
							var o = (e[r] = { i: r, l: !1, exports: {} });
							return (
								t[r].call(o.exports, o, o.exports, n),
								(o.l = !0),
								o.exports
							);
						}
						(n.m = t),
							(n.c = e),
							(n.d = function (t2, e2, r) {
								n.o(t2, e2) ||
									Object.defineProperty(t2, e2, {
										enumerable: !0,
										get: r,
									});
							}),
							(n.r = function (t2) {
								'undefined' != typeof Symbol &&
									Symbol.toStringTag &&
									Object.defineProperty(
										t2,
										Symbol.toStringTag,
										{ value: 'Module' },
									),
									Object.defineProperty(t2, '__esModule', {
										value: !0,
									});
							}),
							(n.t = function (t2, e2) {
								if ((1 & e2 && (t2 = n(t2)), 8 & e2)) return t2;
								if (
									4 & e2 &&
									'object' == typeof t2 &&
									t2 &&
									t2.__esModule
								)
									return t2;
								var r = Object.create(null);
								if (
									(n.r(r),
									Object.defineProperty(r, 'default', {
										enumerable: !0,
										value: t2,
									}),
									2 & e2 && 'string' != typeof t2)
								)
									for (var o in t2)
										n.d(
											r,
											o,
											function (e3) {
												return t2[e3];
											}.bind(null, o),
										);
								return r;
							}),
							(n.n = function (t2) {
								var e2 =
									t2 && t2.__esModule
										? function () {
												return t2.default;
										  }
										: function () {
												return t2;
										  };
								return n.d(e2, 'a', e2), e2;
							}),
							(n.o = function (t2, e2) {
								return Object.prototype.hasOwnProperty.call(
									t2,
									e2,
								);
							}),
							(n.p = ''),
							n((n.s = 3));
					})([
						function (t, e, n) {
							var r = n(2);
							t.exports = !r(function () {
								return (
									7 !=
									Object.defineProperty({}, 'a', {
										get: function () {
											return 7;
										},
									}).a
								);
							});
						},
						function (t, e) {
							t.exports = function (t2) {
								return 'object' == typeof t2
									? null !== t2
									: 'function' == typeof t2;
							};
						},
						function (t, e) {
							t.exports = function (t2) {
								try {
									return !!t2();
								} catch (t3) {
									return !0;
								}
							};
						},
						function (t, e, n) {
							n(4),
								(function () {
									if ('function' != typeof window.__tcfapi) {
										var t2,
											e2 = [],
											n2 = window,
											r = n2.document;
										!n2.__tcfapi &&
											(function t3() {
												var e3 =
													!!n2.frames.__tcfapiLocator;
												if (!e3)
													if (r.body) {
														var o =
															r.createElement(
																'iframe',
															);
														(o.style.cssText =
															'display:none'),
															(o.name =
																'__tcfapiLocator'),
															r.body.appendChild(
																o,
															);
													} else setTimeout(t3, 5);
												return !e3;
											})() &&
											((n2.__tcfapi = function () {
												for (
													var n3 = arguments.length,
														r2 = new Array(n3),
														o = 0;
													o < n3;
													o++
												)
													r2[o] = arguments[o];
												if (!r2.length) return e2;
												if ('setGdprApplies' === r2[0])
													r2.length > 3 &&
														2 ===
															parseInt(
																r2[1],
																10,
															) &&
														'boolean' ==
															typeof r2[3] &&
														((t2 = r2[3]),
														'function' ==
															typeof r2[2] &&
															r2[2]('set', !0));
												else if ('ping' === r2[0]) {
													var i = {
														gdprApplies: t2,
														cmpLoaded: !1,
														apiVersion: '2.0',
													};
													'function' ==
														typeof r2[2] &&
														r2[2](i, !0);
												} else e2.push(r2);
											}),
											n2.addEventListener(
												'message',
												function (t3) {
													var e3 =
															'string' ==
															typeof t3.data,
														r2 = {};
													try {
														r2 = e3
															? JSON.parse(
																	t3.data,
															  )
															: t3.data;
													} catch (t4) {}
													var o = r2.__tcfapiCall;
													o &&
														n2.__tcfapi(
															o.command,
															o.version,
															function (n3, r3) {
																var i = {
																	__tcfapiReturn:
																		{
																			returnValue:
																				n3,
																			success:
																				r3,
																			callId: o.callId,
																		},
																};
																e3 &&
																	(i =
																		JSON.stringify(
																			i,
																		)),
																	t3.source.postMessage(
																		i,
																		'*',
																	);
															},
															o.parameter,
														);
												},
												!1,
											));
									}
								})();
						},
						function (t, e, n) {
							var r = n(0),
								o = n(5).f,
								i = Function.prototype,
								c = i.toString,
								u = /^s*function ([^ (]*)/;
							r &&
								!('name' in i) &&
								o(i, 'name', {
									configurable: !0,
									get: function () {
										try {
											return c.call(this).match(u)[1];
										} catch (t2) {
											return '';
										}
									},
								});
						},
						function (t, e, n) {
							var r = n(0),
								o = n(6),
								i = n(10),
								c = n(11),
								u = Object.defineProperty;
							e.f = r
								? u
								: function (t2, e2, n2) {
										if ((i(t2), (e2 = c(e2, !0)), i(n2), o))
											try {
												return u(t2, e2, n2);
											} catch (t3) {}
										if ('get' in n2 || 'set' in n2)
											throw TypeError(
												'Accessors not supported',
											);
										return (
											'value' in n2 &&
												(t2[e2] = n2.value),
											t2
										);
								  };
						},
						function (t, e, n) {
							var r = n(0),
								o = n(2),
								i = n(7);
							t.exports =
								!r &&
								!o(function () {
									return (
										7 !=
										Object.defineProperty(i('div'), 'a', {
											get: function () {
												return 7;
											},
										}).a
									);
								});
						},
						function (t, e, n) {
							var r = n(8),
								o = n(1),
								i = r.document,
								c = o(i) && o(i.createElement);
							t.exports = function (t2) {
								return c ? i.createElement(t2) : {};
							};
						},
						function (t, e, n) {
							(function (e2) {
								var n2 = function (t2) {
									return t2 && t2.Math == Math && t2;
								};
								t.exports =
									n2(
										'object' == typeof globalThis &&
											globalThis,
									) ||
									n2('object' == typeof window && window) ||
									n2('object' == typeof self && self) ||
									n2('object' == typeof e2 && e2) ||
									Function('return this')();
							}.call(this, n(9)));
						},
						function (t, e) {
							var n;
							n = (function () {
								return this;
							})();
							try {
								n = n || new Function('return this')();
							} catch (t2) {
								'object' == typeof window && (n = window);
							}
							t.exports = n;
						},
						function (t, e, n) {
							var r = n(1);
							t.exports = function (t2) {
								if (!r(t2))
									throw TypeError(
										String(t2) + ' is not an object',
									);
								return t2;
							};
						},
						function (t, e, n) {
							var r = n(1);
							t.exports = function (t2, e2) {
								if (!r(t2)) return t2;
								var n2, o;
								if (
									e2 &&
									'function' == typeof (n2 = t2.toString) &&
									!r((o = n2.call(t2)))
								)
									return o;
								if (
									'function' == typeof (n2 = t2.valueOf) &&
									!r((o = n2.call(t2)))
								)
									return o;
								if (
									!e2 &&
									'function' == typeof (n2 = t2.toString) &&
									!r((o = n2.call(t2)))
								)
									return o;
								throw TypeError(
									"Can't convert object to primitive value",
								);
							};
						},
					]);
				},
				stub_uspapi_ccpa = () => {
					!(function () {
						var c = window,
							t = document;
						function l(t2) {
							var r2 = 'string' == typeof t2.data;
							try {
								var a = r2 ? JSON.parse(t2.data) : t2.data;
								if (a.__cmpCall) {
									var n = a.__cmpCall;
									c.__uspapi(
										n.command,
										n.parameter,
										function (a2, e2) {
											var c2 = {
												__cmpReturn: {
													returnValue: a2,
													success: e2,
													callId: n.callId,
												},
											};
											t2.source.postMessage(
												r2 ? JSON.stringify(c2) : c2,
												'*',
											);
										},
									);
								}
							} catch (a2) {}
						}
						!(function r() {
							if (!c.frames.__uspapiLocator)
								if (t.body) {
									var a = t.body,
										e2 = t.createElement('iframe');
									(e2.style.cssText = 'display:none'),
										(e2.name = '__uspapiLocator'),
										a.appendChild(e2);
								} else setTimeout(r, 5);
						})(),
							'function' != typeof __uspapi &&
								((c.__uspapi = function p() {
									var a = arguments;
									if (
										((__uspapi.a = __uspapi.a || []),
										!a.length)
									)
										return __uspapi.a;
									'ping' === a[0]
										? a[2](
												{
													gdprAppliesGlobally: !1,
													cmpLoaded: !1,
												},
												!0,
										  )
										: __uspapi.a.push([].slice.apply(a));
								}),
								(__uspapi.msgHandler = l),
								c.addEventListener('message', l, !1));
					})();
				},
				stub = (framework) => {
					switch (framework) {
						case 'tcfv2':
							stub_tcfv2();
							break;
						case 'usnat':
							(window.__gpp_addFrame = function (e) {
								if (!window.frames[e])
									if (document.body) {
										var t =
											document.createElement('iframe');
										(t.style.cssText = 'display:none'),
											(t.name = e),
											document.body.appendChild(t);
									} else
										window.setTimeout(
											window.__gpp_addFrame,
											10,
											e,
										);
							}),
								(window.__gpp_stub = function () {
									var e = arguments;
									if (
										((__gpp.queue = __gpp.queue || []),
										(__gpp.events = __gpp.events || []),
										!e.length ||
											(1 == e.length && 'queue' == e[0]))
									)
										return __gpp.queue;
									if (1 == e.length && 'events' == e[0])
										return __gpp.events;
									var t = e[0],
										p = e.length > 1 ? e[1] : null,
										s = e.length > 2 ? e[2] : null;
									if ('ping' === t)
										p(
											{
												gppVersion: '1.1',
												cmpStatus: 'stub',
												cmpDisplayStatus: 'hidden',
												signalStatus: 'not ready',
												supportedAPIs: [
													'2:tcfeuv2',
													'5:tcfcav1',
													'6:uspv1',
													'7:usnatv1',
													'8:uscav1',
													'9:usvav1',
													'10:uscov1',
													'11:usutv1',
													'12:usctv1',
												],
												cmpId: 0,
												sectionList: [],
												applicableSections: [],
												gppString: '',
												parsedSections: {},
											},
											!0,
										);
									else if ('addEventListener' === t) {
										'lastId' in __gpp || (__gpp.lastId = 0),
											__gpp.lastId++;
										var n = __gpp.lastId;
										__gpp.events.push({
											id: n,
											callback: p,
											parameter: s,
										}),
											p(
												{
													eventName:
														'listenerRegistered',
													listenerId: n,
													data: !0,
													pingData: {
														gppVersion: '1.1',
														cmpStatus: 'stub',
														cmpDisplayStatus:
															'hidden',
														signalStatus:
															'not ready',
														supportedAPIs: [
															'2:tcfeuv2',
															'5:tcfcav1',
															'6:uspv1',
															'7:usnatv1',
															'8:uscav1',
															'9:usvav1',
															'10:uscov1',
															'11:usutv1',
															'12:usctv1',
														],
														cmpId: 0,
														sectionList: [],
														applicableSections: [],
														gppString: '',
														parsedSections: {},
													},
												},
												!0,
											);
									} else if ('removeEventListener' === t) {
										for (
											var a = !1, i = 0;
											i < __gpp.events.length;
											i++
										)
											if (__gpp.events[i].id == s) {
												__gpp.events.splice(i, 1),
													(a = !0);
												break;
											}
										p(
											{
												eventName: 'listenerRemoved',
												listenerId: s,
												data: a,
												pingData: {
													gppVersion: '1.1',
													cmpStatus: 'stub',
													cmpDisplayStatus: 'hidden',
													signalStatus: 'not ready',
													supportedAPIs: [
														'2:tcfeuv2',
														'5:tcfcav1',
														'6:uspv1',
														'7:usnatv1',
														'8:uscav1',
														'9:usvav1',
														'10:uscov1',
														'11:usutv1',
														'12:usctv1',
													],
													cmpId: 0,
													sectionList: [],
													applicableSections: [],
													gppString: '',
													parsedSections: {},
												},
											},
											!0,
										);
									} else
										'hasSection' === t
											? p(!1, !0)
											: 'getSection' === t ||
											  'getField' === t
											? p(null, !0)
											: __gpp.queue.push(
													[].slice.apply(e),
											  );
								}),
								(window.__gpp_msghandler = function (e) {
									var t = 'string' == typeof e.data;
									try {
										var p = t ? JSON.parse(e.data) : e.data;
									} catch (e2) {
										p = null;
									}
									if (
										'object' == typeof p &&
										null !== p &&
										'__gppCall' in p
									) {
										var s = p.__gppCall;
										window.__gpp(
											s.command,
											function (p2, n) {
												var a = {
													__gppReturn: {
														returnValue: p2,
														success: n,
														callId: s.callId,
													},
												};
												e.source.postMessage(
													t ? JSON.stringify(a) : a,
													'*',
												);
											},
											'parameter' in s
												? s.parameter
												: null,
											'version' in s ? s.version : '1.1',
										);
									}
								}),
								('__gpp' in window &&
									'function' == typeof window.__gpp) ||
									((window.__gpp = window.__gpp_stub),
									window.addEventListener(
										'message',
										window.__gpp_msghandler,
										!1,
									),
									window.__gpp_addFrame('__gppLocator')),
								stub_uspapi_ccpa();
							break;
						case 'aus':
							stub_uspapi_ccpa();
					}
				};
			let resolveWillShowPrivacyMessage;
			const willShowPrivacyMessage = new Promise((resolve) => {
					resolveWillShowPrivacyMessage = resolve;
				}),
				getPropertyHref = (framework, useNonAdvertisedList) =>
					'aus' == framework
						? 'https://au.theguardian.com'
						: isGuardianDomain()
						? null
						: useNonAdvertisedList
						? 'http://subdomain.theguardian.com'
						: 'https://test.theguardian.com',
				getPropertyId = (framework, useNonAdvertisedList) =>
					'aus' == framework
						? 13348
						: 'usnat' == framework
						? 7417
						: useNonAdvertisedList
						? 38161
						: 7417,
				shouldMergeVendorList = (countryCode, useNonAdvertisedList) =>
					isConsentOrPayCountry(countryCode) &&
					useNonAdvertisedList &&
					!(() => {
						const spUserConsentString = localStorage.getItem(
								'_sp_user_consent_38161',
							),
							userConsent = JSON.parse(
								spUserConsentString ?? '{}',
							);
						return (
							userConsent.gdpr?.consentStatus.hasConsentData ?? !1
						);
					})(),
				init = (
					framework,
					countryCode,
					isUserSignedIn,
					useNonAdvertisedList,
					pubData = {},
				) => {
					if ((stub(framework), window._sp_))
						throw new Error(
							'Sourcepoint global (window._sp_) is already defined!',
						);
					((framework) => {
						log('cmp', `Framework set to ${framework}`),
							(currentFramework = framework);
					})(framework);
					const isCorpABTest =
						window.location.search.includes('CORP_FLAG');
					var isConsentOrPay;
					let frameworkMessageType, messageId;
					switch (
						((isCorpABTest && isConsentOrPayCountry(countryCode)) ||
							(useNonAdvertisedList = !1),
						(isConsentOrPay =
							isConsentOrPayCountry(countryCode) &&
							!useNonAdvertisedList &&
							isCorpABTest),
						(_isConsentOrPay = isConsentOrPay),
						invokeCallbacks(),
						framework)
					) {
						case 'usnat':
							frameworkMessageType = 'usnat';
							break;
						case 'aus':
							frameworkMessageType = 'ccpa';
							break;
						default:
							frameworkMessageType = 'gdpr';
					}
					const isInPropertyIdABTest =
						'variant' ===
						window.guardian?.config?.tests
							?.useSourcepointPropertyIdVariant;
					log('cmp', `framework: ${framework}`),
						log(
							'cmp',
							`frameworkMessageType: ${frameworkMessageType}`,
						);
					const pageSection = window.guardian?.config?.page?.section;
					switch (
						((window._sp_queue = []),
						(window._sp_ = {
							config: {
								baseEndpoint: ENDPOINT,
								accountId: 1257,
								propertyId: getPropertyId(
									framework,
									useNonAdvertisedList,
								),
								propertyHref: getPropertyHref(
									framework,
									useNonAdvertisedList,
								),
								isSPA: !0,
								targetingParams: {
									framework,
									excludePage: isExcludedFromCMP(pageSection),
								},
								pubData: {
									...pubData,
									cmpInitTimeUtc: new Date().getTime(),
								},
								events: {
									onConsentReady: (
										message_type,
										consentUUID,
										euconsent,
									) => {
										log(
											'cmp',
											`onConsentReady ${message_type}`,
										),
											message_type ==
												frameworkMessageType &&
												(log(
													'cmp',
													`consentUUID ${consentUUID}`,
												),
												log(
													'cmp',
													`euconsent ${euconsent}`,
												),
												mark('cmp-got-consent'),
												setTimeout(invokeCallbacks, 0));
									},
									onMessageReady: (message_type) => {
										log(
											'cmp',
											`onMessageReady ${message_type}`,
										),
											message_type ==
												frameworkMessageType &&
												mark('cmp-ui-displayed');
									},
									onMessageReceiveData: (
										message_type,
										data,
									) => {
										log(
											'cmp',
											`onMessageReceiveData ${message_type}`,
										),
											message_type ==
												frameworkMessageType &&
												(0 !== data.messageId &&
													((messageId =
														data.messageId),
													((messageId) => {
														const componentEvent = {
															component: {
																componentType:
																	'CONSENT',
																id: messageId,
															},
															action: 'VIEW',
														};
														getOphanRecordFunction()(
															{ componentEvent },
														);
													})(
														constructBannerMessageId(
															messageId.toString(),
														),
													)),
												log(
													'cmp',
													'onMessageReceiveData ',
													data,
												),
												resolveWillShowPrivacyMessage(
													0 !== data.messageId,
												));
									},
									onMessageChoiceSelect: (
										message_type,
										choice_id,
										choiceTypeID,
									) => {
										log(
											'cmp',
											`onMessageChoiceSelect message_type: ${message_type}`,
										),
											message_type ==
												frameworkMessageType &&
												(log(
													'cmp',
													`onMessageChoiceSelect choice_id: ${choice_id}`,
												),
												log(
													'cmp',
													`onMessageChoiceSelect choice_type_id: ${choiceTypeID}`,
												),
												((choiceType, messageId) => {
													let actionValue;
													switch (choiceType) {
														case SourcePointChoiceTypes_AcceptAll:
															actionValue =
																'accept';
															break;
														case SourcePointChoiceTypes_RejectAll:
															actionValue =
																'reject';
															break;
														case SourcePointChoiceTypes_Dismiss:
															actionValue =
																'dismiss';
															break;
														case SourcePointChoiceTypes_ManageCookies:
															actionValue =
																'manage-cookies';
													}
													const componentEvent = {
														component: {
															componentType:
																'CONSENT',
															id: messageId,
														},
														action: 'CLICK',
														value: actionValue,
													};
													getOphanRecordFunction()({
														componentEvent,
													});
												})(
													choiceTypeID,
													constructBannerMessageId(
														messageId.toString(),
													),
												),
												(choiceTypeID !==
													SourcePointChoiceTypes_AcceptAll &&
													choiceTypeID !==
														SourcePointChoiceTypes_RejectAll &&
													choiceTypeID !==
														SourcePointChoiceTypes_Dismiss) ||
													(setTimeout(
														invokeCallbacks,
														0,
													),
													choiceTypeID ===
														SourcePointChoiceTypes_RejectAll &&
														'gdpr' ===
															message_type &&
														isConsentOrPayCountry(
															countryCode,
														) &&
														!useNonAdvertisedList &&
														isCorpABTest &&
														(window.location.href =
															isGuardianDomain()
																? `https://support.theguardian.com/guardian-ad-lite?returnAddress=${window.location.href}`
																: `https://support.code.dev-theguardian.com/guardian-ad-lite?returnAddress=${window.location.href}`)));
									},
									onPrivacyManagerAction: function (
										message_type,
										pmData,
									) {
										log(
											'cmp',
											`onPrivacyManagerAction message_type: ${message_type}`,
										),
											message_type ==
												frameworkMessageType &&
												log(
													'cmp',
													`onPrivacyManagerAction ${pmData}`,
												);
									},
									onMessageChoiceError: function (
										message_type,
										err,
									) {
										log(
											'cmp',
											`onMessageChoiceError ${message_type}`,
										),
											message_type ==
												frameworkMessageType &&
												log(
													'cmp',
													`onMessageChoiceError ${err}`,
												);
									},
									onPMCancel: function (message_type) {
										log(
											'cmp',
											`onPMCancel ${message_type}`,
										);
									},
									onSPPMObjectReady: function () {
										log('cmp', 'onSPPMObjectReady');
									},
									onError: function (
										message_type,
										errorCode,
										errorObject,
										userReset,
									) {
										log(
											'cmp',
											`errorCode: ${message_type}`,
										),
											message_type ==
												frameworkMessageType &&
												(log(
													'cmp',
													`errorCode: ${errorCode}`,
												),
												log('cmp', errorObject),
												log(
													'cmp',
													`userReset: ${userReset}`,
												));
									},
								},
							},
						}),
						isInPropertyIdABTest &&
							(window._sp_.config.propertyId = getPropertyId(
								framework,
								useNonAdvertisedList,
							)),
						framework)
					) {
						case 'tcfv2':
							window._sp_.config.gdpr = {
								targetingParams: {
									framework,
									excludePage: isExcludedFromCMP(pageSection),
									isCorP: isConsentOrPayCountry(countryCode),
									isUserSignedIn,
									isCorpABTest,
								},
							};
							break;
						case 'usnat':
							window._sp_.config.usnat = {
								targetingParams: { framework },
								includeUspApi: !0,
								transitionCCPAAuth: !0,
							};
							break;
						case 'aus':
							window._sp_.config.ccpa = {
								targetingParams: { framework },
							};
					}
					const spLib = document.createElement('script');
					(spLib.id = 'sourcepoint-lib'),
						spLib.addEventListener('load', () => {
							shouldMergeVendorList(
								countryCode,
								useNonAdvertisedList,
							)
								? (async () => {
										const userConsent =
												await getUserConsentForAdvertisingVendorList(),
											purposesAndVendors =
												getConsentedPurposesandVendorsStrings(
													userConsent,
												);
										isUndefined(purposesAndVendors) ||
											(await sendUserCustomConsentToNonAdvertisingVendorList(
												purposesAndVendors.vendors,
												purposesAndVendors.purposes,
												purposesAndVendors.legitimateInterestPurposeIds,
											),
											await sendUserConsentStringToNonAdvertisingVendorList());
								  })()
										.then(() => {
											window._sp_?.executeMessaging?.();
										})
										.catch((error) => {
											log(
												'cmp',
												`'Failed to merge vendor list': ${error}`,
											);
										})
								: window._sp_?.executeMessaging?.();
						}),
						(spLib.src = `${ENDPOINT}/unified/wrapperMessagingWithoutDetection.js`),
						document.body.appendChild(spLib);
				};
			const CMP_init = (
					framework,
					countryCode,
					isUserSignedIn,
					useNonAdvertisedList,
					pubData,
				) => {
					mark('cmp-init'),
						init(
							framework,
							countryCode,
							isUserSignedIn,
							useNonAdvertisedList,
							pubData,
						);
				},
				CMP_willShowPrivacyMessage = () => willShowPrivacyMessage,
				CMP_showPrivacyManager = function showPrivacyManager() {
					switch (getCurrentFramework()) {
						case 'tcfv2':
							window._sp_?.gdpr?.loadPrivacyManagerModal?.(
								getIsConsentOrPay() ? 1251121 : 106842,
							);
							break;
						case 'usnat':
							window._sp_?.usnat?.loadPrivacyManagerModal?.(
								1068329,
							);
							break;
						case 'aus':
							window._sp_?.ccpa?.loadPrivacyManagerModal?.(
								1178486,
							);
					}
				},
				isDisabled = () =>
					new RegExp('gu-cmp-disabled=true(\\W+|$)').test(
						document.cookie,
					),
				VendorIDs = {
					a9: ['5f369a02b8e05c308701f829'],
					acast: ['5f203dcb1f0dea790562e20f'],
					braze: ['5ed8c49c4b8ce4571c7ad801'],
					comscore: ['5efefe25b8e05c06542b2a77'],
					criteo: ['5e98e7f1b8e05c111d01b462'],
					'google-mobile-ads': ['5f1aada6b8e05c306c0597d7'],
					'google-tag-manager': ['5e952f6107d9d20c88e7c975'],
					googletag: ['5f1aada6b8e05c306c0597d7'],
					ias: ['5e7ced57b8e05c485246ccf3'],
					inizio: ['5e37fc3e56a5e6615502f9c9'],
					ipsos: ['5fa51b29a228638b4a1980e4'],
					magnite: ['5e7ced57b8e05c485246cce5'],
					nielsen: ['5ef5c3a5b8e05c69980eaa5b'],
					ophan: ['5f203dbeeaaaa8768fd3226a'],
					permutive: ['5f369a02b8e05c2f2d546a40'],
					prebidCustom: ['5f22bfd82a6b6c1afd1181a9'],
					qm: ['5f295fa4b8e05c76a44c3149'],
					remarketing: ['5ed0eb688a76503f1016578f'],
					sentry: ['5f0f39014effda6e8bbd2006'],
					teads: ['5eab3d5ab8e05c2bbe33f399'],
					twitter: ['5e71760b69966540e4554f01'],
					'youtube-player': ['5e7ac3fae30e7d1bc1ebf5e8'],
					redplanet: ['not-tcfv2-vendor'],
					prebid: ['5f92a62aa22863685f4daa4c'],
				},
				getConsentFor_getConsentFor = (vendor, consent) => {
					const sourcepointIds = VendorIDs[vendor];
					if (
						void 0 === sourcepointIds ||
						0 === sourcepointIds.length
					)
						throw new Error(
							`Vendor '${vendor}' not found, or with no Sourcepoint ID. If it should be added, raise an issue at https://github.com/guardian/consent-management-platform/issues`,
						);
					if (consent.usnat) return !consent.usnat.doNotSell;
					if (consent.aus) return consent.aus.personalisedAdvertising;
					const foundSourcepointId = sourcepointIds.find(
						(id) => void 0 !== consent.tcfv2?.vendorConsents[id],
					);
					if (void 0 === foundSourcepointId)
						return (
							console.warn(
								`No consent returned from Sourcepoint for vendor: '${vendor}'`,
							),
							!1
						);
					const tcfv2Consent =
						consent.tcfv2?.vendorConsents[foundSourcepointId];
					return void 0 === tcfv2Consent
						? (console.warn(
								`No consent returned from Sourcepoint for vendor: '${vendor}'`,
						  ),
						  !1)
						: tcfv2Consent;
				},
				getShortDomain = ({ isCrossSubdomain = !1 } = {}) => {
					const domain = document.domain || '';
					return 'localhost' === domain ||
						window.guardian?.config?.page?.isPreview
						? domain
						: isCrossSubdomain
						? ['', ...domain.split('.').slice(-2)].join('.')
						: domain.replace(/^(www|m\.code|dev|m)\./, '.');
				},
				removeCookie = ({ name, currentDomainOnly = !1 }) => {
					const expires = 'expires=Thu, 01 Jan 1970 00:00:01 GMT;';
					(document.cookie = `${name}=;path=/;${expires}`),
						currentDomainOnly ||
							(document.cookie = `${name}=;path=/;${expires} domain=${getShortDomain()};`);
				},
				vendorStorageIds = {
					a9: {
						localStorage: [
							'apstagUserAgentClientHints',
							'apstagCxMEnabled',
						],
					},
					inizio: { localStorage: ['__bm_s', '__bm_m'] },
					criteo: {
						cookies: ['cto_bundle'],
						localStorage: [
							'criteo_fast_bid_expires',
							'cto_bundle',
							'criteo_fast_bid',
							'criteo_pt_cdb_mngr_metrics',
							'__ansync3rdp_criteo',
						],
					},
					comscore: { cookies: ['comScore', '_scor_uid'] },
					ipsos: {
						cookies: [
							'DM_SitId1073',
							'DM_SitId1073SecId5802',
							'DotMetrics.AmpCookie',
						],
						localStorage: [
							'DotmetricsSiteData',
							'DotMetricsTimeOnPage',
							'DotMetricsUserId',
							'DotMetricsDeviceGuidId',
						],
					},
					permutive: {
						cookies: ['permutive-id'],
						localStorage: [
							'permutive-data-queries',
							'_pubcid',
							'permutive-pvc',
							'permutive-data-enrichers',
							'permutive-session',
							'permutive-data-misc',
							'permutive-unprocessed-pba',
							'permutive-app',
							'permutive-data-models',
							'permutive-id',
							'permutive-consent',
							'permutive-events-cache',
							'permutive-data-queries',
							'permutive-events-for-page',
							'__permutiveConfigQueryParams',
						],
						sessionStorage: ['__permutiveConfigQueryParams'],
					},
					prebid: { localStorage: ['_psegs', '_pubcid_exp'] },
					googletag: { cookies: ['__gpi', '__gads'] },
				},
				deprecatedVendorStorageIds = {
					'google-analytics': { cookies: ['_gid', '_ga'] },
				},
				removeData = ({
					cookies = [],
					localStorage = [],
					sessionStorage = [],
				}) => {
					for (const name of cookies) removeCookie({ name });
					for (const name of localStorage) storage.local.remove(name);
					for (const name of sessionStorage)
						storage.session.remove(name);
				},
				removeUnconsentedData = (consent) => {
					Object.keys(vendorStorageIds).forEach((vendor) => {
						getConsentFor_getConsentFor(vendor, consent) ||
							removeData(vendorStorageIds[vendor]);
					}),
						Object.entries(deprecatedVendorStorageIds).forEach(
							([, vendorData]) => removeData(vendorData),
						);
				};
			var consent_management_platform_a, _b, _c, _d;
			let _willShowPrivacyMessage;
			isServerSide ||
				(void 0 === window.guCmpHotFix && (window.guCmpHotFix = {}));
			let resolveInitialised,
				initComplete = !1;
			const initialised = new Promise((resolve) => {
					resolveInitialised = resolve;
				}),
				consent_management_platform_cmp = isServerSide
					? cmp
					: (consent_management_platform_a = window.guCmpHotFix)
							.cmp ??
					  (consent_management_platform_a.cmp = {
							init: ({
								pubData,
								country,
								isUserSignedIn = !1,
								useNonAdvertisedList = !1,
							}) => {
								if (isDisabled() || isServerSide) return;
								if (window.guCmpHotFix.initialised)
									return void (
										'21.1.0' !==
											window.guCmpHotFix.cmp?.version &&
										console.warn(
											'Two different versions of the CMP are running:',
											[
												'21.1.0',
												window.guCmpHotFix.cmp?.version,
											],
										)
									);
								if (
									((window.guCmpHotFix.initialised = !0),
									void 0 === country)
								)
									throw new Error(
										'CMP initialised without `country` property. A 2-letter, ISO ISO_3166-1 country code is required.',
									);
								const framework = ((countryCode) => {
									let framework;
									switch (countryCode) {
										case 'US':
											framework = 'usnat';
											break;
										case 'AU':
											framework = 'aus';
											break;
										default:
											framework = 'tcfv2';
									}
									return framework;
								})(country);
								CMP_init(
									framework,
									country,
									isUserSignedIn,
									useNonAdvertisedList,
									pubData ?? {},
								),
									CMP_willShowPrivacyMessage().then(
										(willShowValue) => {
											(_willShowPrivacyMessage =
												willShowValue),
												(initComplete = !0),
												log('cmp', 'initComplete');
										},
									),
									resolveInitialised(),
									onConsentChange_onConsentChange(
										(consent) => {
											'requestIdleCallback' in window
												? requestIdleCallback(
														() => {
															removeUnconsentedData(
																consent,
															);
														},
														{ timeout: 2e3 },
												  )
												: removeUnconsentedData(
														consent,
												  );
										},
									);
							},
							willShowPrivacyMessage: () =>
								initialised.then(() =>
									CMP_willShowPrivacyMessage(),
								),
							willShowPrivacyMessageSync: () => {
								if (void 0 !== _willShowPrivacyMessage)
									return _willShowPrivacyMessage;
								throw new Error(
									'CMP has not been initialised. Use the async willShowPrivacyMessage() instead.',
								);
							},
							hasInitialised: () => initComplete,
							showPrivacyManager: () => {
								initialised.then(CMP_showPrivacyManager);
							},
							version: '21.1.0',
							__isDisabled: isDisabled,
							__enable: () => {
								document.cookie = 'gu-cmp-disabled=false';
							},
							__disable: () => {
								document.cookie = 'gu-cmp-disabled=true';
							},
					  }),
				consent_management_platform_onConsent = isServerSide
					? () => (
							serverSideWarn(),
							Promise.resolve({ canTarget: !1, framework: null })
					  )
					: (_b = window.guCmpHotFix).onConsent ??
					  (_b.onConsent = () =>
							new Promise((resolve, reject) => {
								onConsentChange_onConsentChange(
									(consentState) => {
										(consentState.tcfv2 ??
											consentState.usnat ??
											consentState.aus) &&
											resolve(consentState),
											reject('Unknown framework');
									},
								);
							})),
				consent_management_platform_onConsentChange = isServerSide
					? () => serverSideWarn()
					: (_c = window.guCmpHotFix).onConsentChange ??
					  (_c.onConsentChange = onConsentChange_onConsentChange),
				consent_management_platform_getConsentFor = isServerSide
					? (vendor, consent) => (
							console.log(
								`Server-side call for getConsentFor(${vendor}, ${JSON.stringify(
									consent,
								)})`,
								'getConsentFor will always return false server-side',
							),
							serverSideWarn(),
							!1
					  )
					: (_d = window.guCmpHotFix).getConsentFor ??
					  (_d.getConsentFor = getConsentFor_getConsentFor),
				ERR_INVALID_COOKIE =
					"Cookie must not contain invalid characters (space, tab and the following characters: '()<>@,;\"/[]?={}')",
				getDomainAttribute = ({ isCrossSubdomain = !1 } = {}) => {
					const shortDomain = getShortDomain({ isCrossSubdomain });
					return 'localhost' === shortDomain
						? ''
						: ` domain=${shortDomain};`;
				},
				COOKIE_REGEX = /[()<>@,;"\\/[\]?={} \t]/g,
				isValidCookieValue = (name) => !COOKIE_REGEX.test(name),
				isValidCookie = (name, value) =>
					isValidCookieValue(name) && isValidCookieValue(value),
				setCookie = ({
					name,
					value,
					daysToLive,
					isCrossSubdomain = !1,
				}) => {
					const expires = new Date();
					if (!isValidCookie(name, value))
						throw new Error(
							`${ERR_INVALID_COOKIE} ${name}=${value}`,
						);
					if (
						(daysToLive
							? expires.setUTCDate(
									expires.getUTCDate() + daysToLive,
							  )
							: (expires.setUTCMonth(expires.getUTCMonth() + 5),
							  expires.setUTCDate(1)),
						(document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()};${getDomainAttribute(
							{ isCrossSubdomain },
						)}`),
						memoizedCookies.has(name))
					) {
						const [value2] = getCookieValues(name);
						value2 && memoizedCookies.set(name, value2);
					}
				},
				setSessionCookie = ({ name, value }) => {
					if (!isValidCookie(name, value))
						throw new Error(
							`${ERR_INVALID_COOKIE} ${name}=${value}`,
						);
					if (
						((document.cookie = `${name}=${value}; path=/;${getDomainAttribute()}`),
						memoizedCookies.has(name))
					) {
						const [value2] = getCookieValues(name);
						value2 && memoizedCookies.set(name, value2);
					}
				},
				countries = {
					afghanistan: { countryCode: 'AF', name: 'Afghanistan' },
					åland_islands: { countryCode: 'AX', name: 'Åland Islands' },
					albania: { countryCode: 'AL', name: 'Albania' },
					algeria: { countryCode: 'DZ', name: 'Algeria' },
					american_samoa: {
						countryCode: 'AS',
						name: 'American Samoa',
					},
					andorra: { countryCode: 'AD', name: 'Andorra' },
					angola: { countryCode: 'AO', name: 'Angola' },
					anguilla: { countryCode: 'AI', name: 'Anguilla' },
					antarctica: { countryCode: 'AQ', name: 'Antarctica' },
					antigua_and_barbuda: {
						countryCode: 'AG',
						name: 'Antigua and Barbuda',
					},
					argentina: { countryCode: 'AR', name: 'Argentina' },
					armenia: { countryCode: 'AM', name: 'Armenia' },
					aruba: { countryCode: 'AW', name: 'Aruba' },
					australia: { countryCode: 'AU', name: 'Australia' },
					austria: { countryCode: 'AT', name: 'Austria' },
					azerbaijan: { countryCode: 'AZ', name: 'Azerbaijan' },
					bahamas: { countryCode: 'BS', name: 'Bahamas' },
					bahrain: { countryCode: 'BH', name: 'Bahrain' },
					bangladesh: { countryCode: 'BD', name: 'Bangladesh' },
					barbados: { countryCode: 'BB', name: 'Barbados' },
					belarus: { countryCode: 'BY', name: 'Belarus' },
					belgium: { countryCode: 'BE', name: 'Belgium' },
					belize: { countryCode: 'BZ', name: 'Belize' },
					benin: { countryCode: 'BJ', name: 'Benin' },
					bermuda: { countryCode: 'BM', name: 'Bermuda' },
					bhutan: { countryCode: 'BT', name: 'Bhutan' },
					bolivia: {
						countryCode: 'BO',
						name: 'Bolivia (Plurinational State of)',
					},
					bosnia_and_herzegovina: {
						countryCode: 'BA',
						name: 'Bosnia and Herzegovina',
					},
					botswana: { countryCode: 'BW', name: 'Botswana' },
					bouvet_island: { countryCode: 'BV', name: 'Bouvet Island' },
					brazil: { countryCode: 'BR', name: 'Brazil' },
					british_indian_ocean_territory: {
						countryCode: 'IO',
						name: 'British Indian Ocean Territory',
					},
					brunei_darussalam: {
						countryCode: 'BN',
						name: 'Brunei Darussalam',
					},
					bulgaria: { countryCode: 'BG', name: 'Bulgaria' },
					burkina_faso: { countryCode: 'BF', name: 'Burkina Faso' },
					burundi: { countryCode: 'BI', name: 'Burundi' },
					cabo_verde: { countryCode: 'CV', name: 'Cabo Verde' },
					cambodia: { countryCode: 'KH', name: 'Cambodia' },
					cameroon: { countryCode: 'CM', name: 'Cameroon' },
					canada: { countryCode: 'CA', name: 'Canada' },
					caribbean_netherlands: {
						countryCode: 'BQ',
						name: 'Bonaire, Sint Eustatius and Saba',
					},
					cayman_islands: {
						countryCode: 'KY',
						name: 'Cayman Islands',
					},
					central_african_republic: {
						countryCode: 'CF',
						name: 'Central African Republic',
					},
					chad: { countryCode: 'TD', name: 'Chad' },
					chile: { countryCode: 'CL', name: 'Chile' },
					china: { countryCode: 'CN', name: 'China' },
					christmas_island: {
						countryCode: 'CX',
						name: 'Christmas Island',
					},
					cocos_keeling_islands: {
						countryCode: 'CC',
						name: 'Cocos (Keeling) Islands',
					},
					colombia: { countryCode: 'CO', name: 'Colombia' },
					comoros: { countryCode: 'KM', name: 'Comoros' },
					congo: { countryCode: 'CG', name: 'Congo' },
					cook_islands: { countryCode: 'CK', name: 'Cook Islands' },
					costa_rica: { countryCode: 'CR', name: 'Costa Rica' },
					croatia: { countryCode: 'HR', name: 'Croatia' },
					cuba: { countryCode: 'CU', name: 'Cuba' },
					curaçao: { countryCode: 'CW', name: 'Curaçao' },
					cyprus: { countryCode: 'CY', name: 'Cyprus' },
					czechia: { countryCode: 'CZ', name: 'Czechia' },
					democratic_republic_of_the_congo: {
						countryCode: 'CD',
						name: 'Democratic Republic of the Congo',
					},
					denmark: { countryCode: 'DK', name: 'Denmark' },
					djibouti: { countryCode: 'DJ', name: 'Djibouti' },
					dominica: { countryCode: 'DM', name: 'Dominica' },
					dominican_republic: {
						countryCode: 'DO',
						name: 'Dominican Republic',
					},
					ecuador: { countryCode: 'EC', name: 'Ecuador' },
					egypt: { countryCode: 'EG', name: 'Egypt' },
					el_salvador: { countryCode: 'SV', name: 'El Salvador' },
					equatorial_guinea: {
						countryCode: 'GQ',
						name: 'Equatorial Guinea',
					},
					eritrea: { countryCode: 'ER', name: 'Eritrea' },
					estonia: { countryCode: 'EE', name: 'Estonia' },
					eswatini: { countryCode: 'SZ', name: 'Eswatini' },
					ethiopia: { countryCode: 'ET', name: 'Ethiopia' },
					falkland_islands: {
						countryCode: 'FK',
						name: 'Falkland Islands (Malvinas)',
					},
					faroe_islands: { countryCode: 'FO', name: 'Faroe Islands' },
					federated_states_of_micronesia: {
						countryCode: 'FM',
						name: 'Federated States of Micronesia',
					},
					fiji: { countryCode: 'FJ', name: 'Fiji' },
					finland: { countryCode: 'FI', name: 'Finland' },
					france: { countryCode: 'FR', name: 'France' },
					french_guiana: { countryCode: 'GF', name: 'French Guiana' },
					french_polynesia: {
						countryCode: 'PF',
						name: 'French Polynesia',
					},
					french_southern_territories: {
						countryCode: 'TF',
						name: 'French Southern Territories',
					},
					gabon: { countryCode: 'GA', name: 'Gabon' },
					gambia: { countryCode: 'GM', name: 'Gambia' },
					georgia: { countryCode: 'GE', name: 'Georgia' },
					germany: { countryCode: 'DE', name: 'Germany' },
					ghana: { countryCode: 'GH', name: 'Ghana' },
					gibraltar: { countryCode: 'GI', name: 'Gibraltar' },
					greece: { countryCode: 'GR', name: 'Greece' },
					greenland: { countryCode: 'GL', name: 'Greenland' },
					grenada: { countryCode: 'GD', name: 'Grenada' },
					guadeloupe: { countryCode: 'GP', name: 'Guadeloupe' },
					guam: { countryCode: 'GU', name: 'Guam' },
					guatemala: { countryCode: 'GT', name: 'Guatemala' },
					guernsey: { countryCode: 'GG', name: 'Guernsey' },
					guinea: { countryCode: 'GN', name: 'Guinea' },
					guinea_bissau: { countryCode: 'GW', name: 'Guinea-Bissau' },
					guyana: { countryCode: 'GY', name: 'Guyana' },
					haiti: { countryCode: 'HT', name: 'Haiti' },
					heard_island_and_mcdonald_islands: {
						countryCode: 'HM',
						name: 'Heard Island and McDonald Islands',
					},
					holy_see: { countryCode: 'VA', name: 'Holy See' },
					honduras: { countryCode: 'HN', name: 'Honduras' },
					hong_kong: { countryCode: 'HK', name: 'Hong Kong' },
					hungary: { countryCode: 'HU', name: 'Hungary' },
					iceland: { countryCode: 'IS', name: 'Iceland' },
					india: { countryCode: 'IN', name: 'India' },
					indonesia: { countryCode: 'ID', name: 'Indonesia' },
					iran: {
						countryCode: 'IR',
						name: 'Iran (Islamic Republic of)',
					},
					iraq: { countryCode: 'IQ', name: 'Iraq' },
					ireland: { countryCode: 'IE', name: 'Ireland' },
					isle_of_man: { countryCode: 'IM', name: 'Isle of Man' },
					israel: { countryCode: 'IL', name: 'Israel' },
					italy: { countryCode: 'IT', name: 'Italy' },
					ivory_coast: { countryCode: 'CI', name: "Côte d'Ivoire" },
					jamaica: { countryCode: 'JM', name: 'Jamaica' },
					japan: { countryCode: 'JP', name: 'Japan' },
					jersey: { countryCode: 'JE', name: 'Jersey' },
					jordan: { countryCode: 'JO', name: 'Jordan' },
					kazakhstan: { countryCode: 'KZ', name: 'Kazakhstan' },
					kenya: { countryCode: 'KE', name: 'Kenya' },
					kiribati: { countryCode: 'KI', name: 'Kiribati' },
					kuwait: { countryCode: 'KW', name: 'Kuwait' },
					kyrgyzstan: { countryCode: 'KG', name: 'Kyrgyzstan' },
					laos: {
						countryCode: 'LA',
						name: "Lao People's Democratic Republic",
					},
					latvia: { countryCode: 'LV', name: 'Latvia' },
					lebanon: { countryCode: 'LB', name: 'Lebanon' },
					lesotho: { countryCode: 'LS', name: 'Lesotho' },
					liberia: { countryCode: 'LR', name: 'Liberia' },
					libya: { countryCode: 'LY', name: 'Libya' },
					liechtenstein: { countryCode: 'LI', name: 'Liechtenstein' },
					lithuania: { countryCode: 'LT', name: 'Lithuania' },
					luxembourg: { countryCode: 'LU', name: 'Luxembourg' },
					macao: { countryCode: 'MO', name: 'Macao' },
					madagascar: { countryCode: 'MG', name: 'Madagascar' },
					malawi: { countryCode: 'MW', name: 'Malawi' },
					malaysia: { countryCode: 'MY', name: 'Malaysia' },
					maldives: { countryCode: 'MV', name: 'Maldives' },
					mali: { countryCode: 'ML', name: 'Mali' },
					malta: { countryCode: 'MT', name: 'Malta' },
					marshall_islands: {
						countryCode: 'MH',
						name: 'Marshall Islands',
					},
					martinique: { countryCode: 'MQ', name: 'Martinique' },
					mauritania: { countryCode: 'MR', name: 'Mauritania' },
					mauritius: { countryCode: 'MU', name: 'Mauritius' },
					mayotte: { countryCode: 'YT', name: 'Mayotte' },
					mexico: { countryCode: 'MX', name: 'Mexico' },
					moldova: { countryCode: 'MD', name: 'Republic of Moldova' },
					monaco: { countryCode: 'MC', name: 'Monaco' },
					mongolia: { countryCode: 'MN', name: 'Mongolia' },
					montenegro: { countryCode: 'ME', name: 'Montenegro' },
					montserrat: { countryCode: 'MS', name: 'Montserrat' },
					morocco: { countryCode: 'MA', name: 'Morocco' },
					mozambique: { countryCode: 'MZ', name: 'Mozambique' },
					myanmar: { countryCode: 'MM', name: 'Myanmar' },
					namibia: { countryCode: 'NA', name: 'Namibia' },
					nauru: { countryCode: 'NR', name: 'Nauru' },
					nepal: { countryCode: 'NP', name: 'Nepal' },
					netherlands: { countryCode: 'NL', name: 'Netherlands' },
					new_caledonia: { countryCode: 'NC', name: 'New Caledonia' },
					new_zealand: { countryCode: 'NZ', name: 'New Zealand' },
					nicaragua: { countryCode: 'NI', name: 'Nicaragua' },
					niger: { countryCode: 'NE', name: 'Niger' },
					nigeria: { countryCode: 'NG', name: 'Nigeria' },
					niue: { countryCode: 'NU', name: 'Niue' },
					norfolk_island: {
						countryCode: 'NF',
						name: 'Norfolk Island',
					},
					north_korea: {
						countryCode: 'KP',
						name: "Democratic People's Republic of Korea",
					},
					north_macedonia: {
						countryCode: 'MK',
						name: 'North Macedonia',
					},
					northern_mariana_islands: {
						countryCode: 'MP',
						name: 'Northern Mariana Islands',
					},
					norway: { countryCode: 'NO', name: 'Norway' },
					oman: { countryCode: 'OM', name: 'Oman' },
					pakistan: { countryCode: 'PK', name: 'Pakistan' },
					palau: { countryCode: 'PW', name: 'Palau' },
					panama: { countryCode: 'PA', name: 'Panama' },
					papua_new_guinea: {
						countryCode: 'PG',
						name: 'Papua New Guinea',
					},
					paraguay: { countryCode: 'PY', name: 'Paraguay' },
					peru: { countryCode: 'PE', name: 'Peru' },
					philippines: { countryCode: 'PH', name: 'Philippines' },
					pitcairn: { countryCode: 'PN', name: 'Pitcairn' },
					poland: { countryCode: 'PL', name: 'Poland' },
					portugal: { countryCode: 'PT', name: 'Portugal' },
					puerto_rico: { countryCode: 'PR', name: 'Puerto Rico' },
					qatar: { countryCode: 'QA', name: 'Qatar' },
					romania: { countryCode: 'RO', name: 'Romania' },
					russia: { countryCode: 'RU', name: 'Russian Federation' },
					rwanda: { countryCode: 'RW', name: 'Rwanda' },
					réunion: { countryCode: 'RE', name: 'Réunion' },
					saint_barthélemy: {
						countryCode: 'BL',
						name: 'Saint Barthélemy',
					},
					saint_helena_ascension_and_tristan_da_cunha: {
						countryCode: 'SH',
						name: 'Saint Helena, Ascension and Tristan da Cunha',
					},
					saint_kitts_and_nevis: {
						countryCode: 'KN',
						name: 'Saint Kitts and Nevis',
					},
					saint_lucia: { countryCode: 'LC', name: 'Saint Lucia' },
					saint_martin: {
						countryCode: 'MF',
						name: 'Saint Martin (French part)',
					},
					saint_pierre_and_miquelon: {
						countryCode: 'PM',
						name: 'Saint Pierre and Miquelon',
					},
					saint_vincent_and_the_grenadines: {
						countryCode: 'VC',
						name: 'Saint Vincent and the Grenadines',
					},
					samoa: { countryCode: 'WS', name: 'Samoa' },
					san_marino: { countryCode: 'SM', name: 'San Marino' },
					sao_tome_and_principe: {
						countryCode: 'ST',
						name: 'Sao Tome and Principe',
					},
					saudi_arabia: { countryCode: 'SA', name: 'Saudi Arabia' },
					senegal: { countryCode: 'SN', name: 'Senegal' },
					serbia: { countryCode: 'RS', name: 'Serbia' },
					seychelles: { countryCode: 'SC', name: 'Seychelles' },
					sierra_leone: { countryCode: 'SL', name: 'Sierra Leone' },
					singapore: { countryCode: 'SG', name: 'Singapore' },
					sint_maarten: {
						countryCode: 'SX',
						name: 'Sint Maarten (Dutch part)',
					},
					slovakia: { countryCode: 'SK', name: 'Slovakia' },
					slovenia: { countryCode: 'SI', name: 'Slovenia' },
					solomon_islands: {
						countryCode: 'SB',
						name: 'Solomon Islands',
					},
					somalia: { countryCode: 'SO', name: 'Somalia' },
					south_africa: { countryCode: 'ZA', name: 'South Africa' },
					south_georgia_and_the_south_sandwich_islands: {
						countryCode: 'GS',
						name: 'South Georgia and the South Sandwich Islands',
					},
					south_korea: {
						countryCode: 'KR',
						name: 'Republic of Korea',
					},
					south_sudan: { countryCode: 'SS', name: 'South Sudan' },
					spain: { countryCode: 'ES', name: 'Spain' },
					sri_lanka: { countryCode: 'LK', name: 'Sri Lanka' },
					state_of_palestine: {
						countryCode: 'PS',
						name: 'State of Palestine',
					},
					sudan: { countryCode: 'SD', name: 'Sudan' },
					suriname: { countryCode: 'SR', name: 'Suriname' },
					svalbard_and_jan_mayen: {
						countryCode: 'SJ',
						name: 'Svalbard and Jan Mayen',
					},
					sweden: { countryCode: 'SE', name: 'Sweden' },
					switzerland: { countryCode: 'CH', name: 'Switzerland' },
					syria: { countryCode: 'SY', name: 'Syrian Arab Republic' },
					taiwan: {
						countryCode: 'TW',
						name: 'Taiwan, Province of China',
					},
					tajikistan: { countryCode: 'TJ', name: 'Tajikistan' },
					tanzania: {
						countryCode: 'TZ',
						name: 'United Republic of Tanzania',
					},
					thailand: { countryCode: 'TH', name: 'Thailand' },
					timor_leste: { countryCode: 'TL', name: 'Timor-Leste' },
					togo: { countryCode: 'TG', name: 'Togo' },
					tokelau: { countryCode: 'TK', name: 'Tokelau' },
					tonga: { countryCode: 'TO', name: 'Tonga' },
					trinidad_and_tobago: {
						countryCode: 'TT',
						name: 'Trinidad and Tobago',
					},
					tunisia: { countryCode: 'TN', name: 'Tunisia' },
					turkey: { countryCode: 'TR', name: 'Turkey' },
					turkmenistan: { countryCode: 'TM', name: 'Turkmenistan' },
					turks_and_caicos_islands: {
						countryCode: 'TC',
						name: 'Turks and Caicos Islands',
					},
					tuvalu: { countryCode: 'TV', name: 'Tuvalu' },
					uganda: { countryCode: 'UG', name: 'Uganda' },
					ukraine: { countryCode: 'UA', name: 'Ukraine' },
					united_arab_emirates: {
						countryCode: 'AE',
						name: 'United Arab Emirates',
					},
					united_kingdom: {
						countryCode: 'GB',
						name: 'United Kingdom of Great Britain and Northern Ireland',
					},
					united_states_minor_outlying_islands: {
						countryCode: 'UM',
						name: 'United States Minor Outlying Islands',
					},
					united_states_of_america: {
						countryCode: 'US',
						name: 'United States of America',
					},
					uruguay: { countryCode: 'UY', name: 'Uruguay' },
					uzbekistan: { countryCode: 'UZ', name: 'Uzbekistan' },
					vanuatu: { countryCode: 'VU', name: 'Vanuatu' },
					venezuela: {
						countryCode: 'VE',
						name: 'Bolivarian Republic of Venezuela',
					},
					vietnam: { countryCode: 'VN', name: 'Viet Nam' },
					virgin_islands_british: {
						countryCode: 'VG',
						name: 'Virgin Islands (British)',
					},
					virgin_islands_us: {
						countryCode: 'VI',
						name: 'Virgin Islands (U.S.)',
					},
					wallis_and_futuna: {
						countryCode: 'WF',
						name: 'Wallis and Futuna',
					},
					western_sahara: {
						countryCode: 'EH',
						name: 'Western Sahara',
					},
					yemen: { countryCode: 'YE', name: 'Yemen' },
					zambia: { countryCode: 'ZM', name: 'Zambia' },
					zimbabwe: { countryCode: 'ZW', name: 'Zimbabwe' },
				},
				getCountryByCountryCodeCache = {},
				getCountryByCountryCode = (countryCode) =>
					getCountryByCountryCodeCache[countryCode] ??
					(getCountryByCountryCodeCache[countryCode] = Object.values(
						countries,
					).find((country) => country.countryCode === countryCode)),
				units_second = 1e3,
				units_minute = 6e4,
				units_hour = 36e5,
				units_day = 864e5,
				timeAgo = (epoch, options) => {
					const then = epoch,
						now = options?.now ?? Date.now(),
						verbose = options?.verbose ?? !1,
						{ length: rawLength, unit } = (({ then, now }) => {
							const difference = now - then;
							return difference < units_minute
								? {
										length: difference / units_second,
										unit: 'second',
								  }
								: difference < units_hour
								? {
										length: difference / units_minute,
										unit: 'minute',
								  }
								: difference < units_day
								? {
										length: difference / units_hour,
										unit: 'hour',
								  }
								: {
										length: difference / units_day,
										unit: 'day',
								  };
						})({ then, now }),
						length = Math.round(rawLength);
					if (length < 0) return !1;
					switch (unit) {
						case 'second':
							return length > 55
								? verbose
									? '1 minute ago'
									: '1m ago'
								: length < 15
								? 'now'
								: verbose
								? `${length} seconds ago`
								: `${length}s ago`;
						case 'minute':
							return length > 55
								? verbose
									? '1 hour ago'
									: '1h ago'
								: verbose
								? 1 == length
									? '1 minute ago'
									: `${length} minutes ago`
								: `${length}m ago`;
						case 'hour':
							return verbose
								? 1 == length
									? '1 hour ago'
									: `${length} hours ago`
								: `${length}h ago`;
						case 'day':
							return rawLength < (options?.daysUntilAbsolute ?? 7)
								? verbose
									? ((then, now) => {
											const today = new Date(now),
												yesterday = new Date(now);
											return (
												yesterday.setDate(
													today.getDate() - 1,
												),
												new Date(
													then,
												).toDateString() ===
													yesterday.toDateString()
											);
									  })(then, now)
										? 'Yesterday ' +
										  `${(date = new Date(
												then,
										  )).getHours()}.${date
												.getMinutes()
												.toString()
												.padStart(2, '0')}`
										: 1 == length
										? '1 day ago'
										: `${length} days ago`
									: `${length}d ago`
								: new Date(then).toLocaleString('en-GB', {
										day: 'numeric',
										month: verbose ? 'long' : 'short',
										year: 'numeric',
								  });
					}
					var date;
				};
			var ArticleDesign = ((ArticleDesign2) => (
					(ArticleDesign2[(ArticleDesign2.Standard = 0)] =
						'Standard'),
					(ArticleDesign2[(ArticleDesign2.Picture = 1)] = 'Picture'),
					(ArticleDesign2[(ArticleDesign2.Gallery = 2)] = 'Gallery'),
					(ArticleDesign2[(ArticleDesign2.Audio = 3)] = 'Audio'),
					(ArticleDesign2[(ArticleDesign2.Video = 4)] = 'Video'),
					(ArticleDesign2[(ArticleDesign2.Review = 5)] = 'Review'),
					(ArticleDesign2[(ArticleDesign2.Analysis = 6)] =
						'Analysis'),
					(ArticleDesign2[(ArticleDesign2.Explainer = 7)] =
						'Explainer'),
					(ArticleDesign2[(ArticleDesign2.Comment = 8)] = 'Comment'),
					(ArticleDesign2[(ArticleDesign2.Letter = 9)] = 'Letter'),
					(ArticleDesign2[(ArticleDesign2.Feature = 10)] = 'Feature'),
					(ArticleDesign2[(ArticleDesign2.LiveBlog = 11)] =
						'LiveBlog'),
					(ArticleDesign2[(ArticleDesign2.DeadBlog = 12)] =
						'DeadBlog'),
					(ArticleDesign2[(ArticleDesign2.Recipe = 13)] = 'Recipe'),
					(ArticleDesign2[(ArticleDesign2.MatchReport = 14)] =
						'MatchReport'),
					(ArticleDesign2[(ArticleDesign2.Interview = 15)] =
						'Interview'),
					(ArticleDesign2[(ArticleDesign2.Editorial = 16)] =
						'Editorial'),
					(ArticleDesign2[(ArticleDesign2.Quiz = 17)] = 'Quiz'),
					(ArticleDesign2[(ArticleDesign2.Interactive = 18)] =
						'Interactive'),
					(ArticleDesign2[(ArticleDesign2.PhotoEssay = 19)] =
						'PhotoEssay'),
					(ArticleDesign2[(ArticleDesign2.PrintShop = 20)] =
						'PrintShop'),
					(ArticleDesign2[(ArticleDesign2.Obituary = 21)] =
						'Obituary'),
					(ArticleDesign2[(ArticleDesign2.Correction = 22)] =
						'Correction'),
					(ArticleDesign2[(ArticleDesign2.FullPageInteractive = 23)] =
						'FullPageInteractive'),
					(ArticleDesign2[(ArticleDesign2.NewsletterSignup = 24)] =
						'NewsletterSignup'),
					(ArticleDesign2[(ArticleDesign2.Timeline = 25)] =
						'Timeline'),
					(ArticleDesign2[(ArticleDesign2.Profile = 26)] = 'Profile'),
					ArticleDesign2
				))(ArticleDesign || {}),
				ArticleDisplay = ((ArticleDisplay2) => (
					(ArticleDisplay2[(ArticleDisplay2.Standard = 0)] =
						'Standard'),
					(ArticleDisplay2[(ArticleDisplay2.Immersive = 1)] =
						'Immersive'),
					(ArticleDisplay2[(ArticleDisplay2.Showcase = 2)] =
						'Showcase'),
					(ArticleDisplay2[(ArticleDisplay2.NumberedList = 3)] =
						'NumberedList'),
					ArticleDisplay2
				))(ArticleDisplay || {}),
				ArticleSpecial = ((ArticleSpecial2) => (
					(ArticleSpecial2[(ArticleSpecial2.SpecialReport = 5)] =
						'SpecialReport'),
					(ArticleSpecial2[(ArticleSpecial2.Labs = 6)] = 'Labs'),
					(ArticleSpecial2[(ArticleSpecial2.SpecialReportAlt = 7)] =
						'SpecialReportAlt'),
					ArticleSpecial2
				))(ArticleSpecial || {});
			const isBoolean = (_) => 'boolean' == typeof _,
				isNonNullable = (_) => null != _;
			var isOneOf = __webpack_require__(
				'./node_modules/@guardian/libs/dist/isOneOf/isOneOf.js',
			);
			const multipleSlashesInRoute = /\b\/{2,}/g,
				joinUrl = (...args) =>
					args.join('/').replace(multipleSlashesInRoute, '/'),
				loadScript = (src, props) =>
					new Promise((resolve, reject) => {
						const script = document.createElement('script');
						if (
							((script.src = src),
							Array.from(document.scripts).some(
								({ src: src2 }) => script.src === src2,
							))
						)
							return resolve(void 0);
						Object.assign(script, props),
							(script.onload = resolve),
							(script.onerror = (
								event,
								source,
								lineno,
								colno,
								error,
							) => {
								if (error) reject(error);
								else if ('string' != typeof event)
									if (event instanceof Event) {
										const targetSrc =
											event.target.getAttribute('src') ??
											'';
										reject(
											new Error(
												`Error loading script: src: ${src} targetSrc: ${targetSrc}`,
											),
										);
									} else
										reject(
											new Error(
												`Error loading script: src: ${src}`,
											),
										);
								else
									reject(
										new Error(
											`Error loading script: src: ${src} event: ${event}`,
										),
									);
							});
						const ref = document.scripts[0];
						ref?.parentNode?.insertBefore(script, ref);
					}),
				COUNTRY_REGEX = /^[A-Z]{2}$/,
				isValidCountryCode = (country) =>
					isString(country) && COUNTRY_REGEX.test(country);
			let locale;
			const getLocale = async () => {
					if (locale) return locale;
					const geoOverride = storage.local.get('gu.geo.override');
					if (isValidCountryCode(geoOverride))
						return (locale = geoOverride);
					const stored = getCookie({ name: 'GU_geo_country' });
					if (stored && isValidCountryCode(stored))
						return (locale = stored);
					try {
						const { country } = await fetch(
							'https://api.nextgen.guardianapps.co.uk/geolocation',
						).then((response) => response.json());
						if (isValidCountryCode(country))
							return (
								setSessionCookie({
									name: 'GU_geo_country',
									value: country,
								}),
								(locale = country)
							);
					} catch (e) {}
					return null;
				},
				debug = (team, ...args) => {
					'https://www.theguardian.com' !== window.location.origin &&
						log(team, ...args);
				},
				startPerformanceMeasure = (subscription, name, action) => {
					try {
						const measureName = (({ subscription, name, action }) =>
								[subscription, name, action]
									.filter(isNonNullable)
									.join(':'))({ subscription, name, action }),
							markName = `${measureName}-${Math.trunc(
								1679615 * Math.random(),
							)
								.toString(36)
								.padStart(4, '0')}`,
							start = performance.now();
						performance.mark(markName);
						const endPerformanceMeasure = () => {
							try {
								const { duration } = window.performance.measure(
										measureName,
										markName,
									) ?? {
										duration: performance.now() - start,
									},
									formattedDuration = Math.ceil(duration);
								return (
									((measurement, duration) => {
										if (!isSubscribedTo('perf')) return;
										const styles = [
											messageStyle('common'),
											'',
											messageStyle('perf'),
											'',
											'font-weight: bold;',
										];
										console.log(
											`%c@guardian%c %c${measurement}%c %c${duration}ms`,
											...styles,
										);
									})(measureName, formattedDuration),
									formattedDuration
								);
							} catch (error) {
								return log(subscription, error), -1;
							}
						};
						return { endPerformanceMeasure };
					} catch (error) {
						return (
							log(subscription, error),
							{ endPerformanceMeasure: () => -1 }
						);
					}
				},
				getMeasures = (subscriptions) =>
					'getEntriesByType' in window.performance
						? window.performance
								.getEntriesByType('measure')
								.flatMap(
									({
										entryType,
										name,
										duration,
										startTime,
									}) => {
										const detail = ((id) => {
											const [subscription, name, action] =
												id.split(':');
											return isString(subscription) &&
												isSubscription(subscription) &&
												isString(name)
												? { subscription, name, action }
												: void 0;
										})(name);
										return 'measure' === entryType &&
											detail &&
											subscriptions.includes(
												detail.subscription,
											)
											? {
													name,
													detail,
													duration,
													entryType,
													startTime,
													toJson: () =>
														JSON.stringify(void 0),
											  }
											: [];
									},
								)
						: [],
				fetchSwitches = () =>
					fetch('https://www.theguardian.com/switches.json')
						.then((response) => response.json())
						.then((switches2) =>
							((switches2) =>
								isObject(switches2) &&
								Object.values(switches2).every(isBoolean))(
								switches2,
							)
								? switches2
								: Promise.reject(
										new Error(
											'Error getting remote switches – config is malformed',
										),
								  ),
						);
			let switches;
			const getSwitches = async () =>
				switches ??
				(switches =
					window.guardian?.config?.switches ??
					(await fetchSwitches()));
		},
		'./node_modules/@guardian/libs/dist/isOneOf/isOneOf.js': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, { g: () => isOneOf });
			const isOneOf = (literals) => (value) => literals.includes(value);
		},
	},
]);
