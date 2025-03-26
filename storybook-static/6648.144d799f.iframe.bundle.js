'use strict';
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[6648],
	{
		'./node_modules/@sentry/minimal/esm/index.js': (
			__unused_webpack_module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				Tb: () => captureException,
				uT: () => captureMessage,
			});
			var tslib_es6_assign = function () {
				return (
					(tslib_es6_assign =
						Object.assign ||
						function __assign(t) {
							for (var s, i = 1, n = arguments.length; i < n; i++)
								for (var p in (s = arguments[i]))
									Object.prototype.hasOwnProperty.call(
										s,
										p,
									) && (t[p] = s[p]);
							return t;
						}),
					tslib_es6_assign.apply(this, arguments)
				);
			};
			function __read(o, n) {
				var m = 'function' == typeof Symbol && o[Symbol.iterator];
				if (!m) return o;
				var r,
					e,
					i = m.call(o),
					ar = [];
				try {
					for (; (void 0 === n || n-- > 0) && !(r = i.next()).done; )
						ar.push(r.value);
				} catch (error) {
					e = { error };
				} finally {
					try {
						r && !r.done && (m = i.return) && m.call(i);
					} finally {
						if (e) throw e.error;
					}
				}
				return ar;
			}
			var tslib_tslib_es6_assign = function () {
				return (
					(tslib_tslib_es6_assign =
						Object.assign ||
						function __assign(t) {
							for (var s, i = 1, n = arguments.length; i < n; i++)
								for (var p in (s = arguments[i]))
									Object.prototype.hasOwnProperty.call(
										s,
										p,
									) && (t[p] = s[p]);
							return t;
						}),
					tslib_tslib_es6_assign.apply(this, arguments)
				);
			};
			function tslib_es6_read(o, n) {
				var m = 'function' == typeof Symbol && o[Symbol.iterator];
				if (!m) return o;
				var r,
					e,
					i = m.call(o),
					ar = [];
				try {
					for (; (void 0 === n || n-- > 0) && !(r = i.next()).done; )
						ar.push(r.value);
				} catch (error) {
					e = { error };
				} finally {
					try {
						r && !r.done && (m = i.return) && m.call(i);
					} finally {
						if (e) throw e.error;
					}
				}
				return ar;
			}
			function tslib_tslib_es6_spread() {
				for (var ar = [], i = 0; i < arguments.length; i++)
					ar = ar.concat(tslib_es6_read(arguments[i]));
				return ar;
			}
			var misc = __webpack_require__(
					'./node_modules/@sentry/utils/esm/misc.js',
				),
				global = (0, misc.Rf)(),
				PREFIX = 'Sentry Logger ',
				Logger = (function () {
					function Logger() {
						this._enabled = !1;
					}
					return (
						(Logger.prototype.disable = function () {
							this._enabled = !1;
						}),
						(Logger.prototype.enable = function () {
							this._enabled = !0;
						}),
						(Logger.prototype.log = function () {
							for (
								var args = [], _i = 0;
								_i < arguments.length;
								_i++
							)
								args[_i] = arguments[_i];
							this._enabled &&
								(0, misc.Cf)(function () {
									global.console.log(
										PREFIX + '[Log]: ' + args.join(' '),
									);
								});
						}),
						(Logger.prototype.warn = function () {
							for (
								var args = [], _i = 0;
								_i < arguments.length;
								_i++
							)
								args[_i] = arguments[_i];
							this._enabled &&
								(0, misc.Cf)(function () {
									global.console.warn(
										PREFIX + '[Warn]: ' + args.join(' '),
									);
								});
						}),
						(Logger.prototype.error = function () {
							for (
								var args = [], _i = 0;
								_i < arguments.length;
								_i++
							)
								args[_i] = arguments[_i];
							this._enabled &&
								(0, misc.Cf)(function () {
									global.console.error(
										PREFIX + '[Error]: ' + args.join(' '),
									);
								});
						}),
						Logger
					);
				})();
			global.__SENTRY__ = global.__SENTRY__ || {};
			var States,
				logger =
					global.__SENTRY__.logger ||
					(global.__SENTRY__.logger = new Logger());
			function isPlainObject(wat) {
				return (
					'[object Object]' === Object.prototype.toString.call(wat)
				);
			}
			function isThenable(wat) {
				return Boolean(
					wat && wat.then && 'function' == typeof wat.then,
				);
			}
			!(function (States) {
				(States.PENDING = 'PENDING'),
					(States.RESOLVED = 'RESOLVED'),
					(States.REJECTED = 'REJECTED');
			})(States || (States = {}));
			var SyncPromise = (function () {
					function SyncPromise(executor) {
						var _this = this;
						(this._state = States.PENDING),
							(this._handlers = []),
							(this._resolve = function (value) {
								_this._setResult(States.RESOLVED, value);
							}),
							(this._reject = function (reason) {
								_this._setResult(States.REJECTED, reason);
							}),
							(this._setResult = function (state, value) {
								_this._state === States.PENDING &&
									(isThenable(value)
										? value.then(
												_this._resolve,
												_this._reject,
										  )
										: ((_this._state = state),
										  (_this._value = value),
										  _this._executeHandlers()));
							}),
							(this._attachHandler = function (handler) {
								(_this._handlers =
									_this._handlers.concat(handler)),
									_this._executeHandlers();
							}),
							(this._executeHandlers = function () {
								if (_this._state !== States.PENDING) {
									var cachedHandlers =
										_this._handlers.slice();
									(_this._handlers = []),
										cachedHandlers.forEach(function (
											handler,
										) {
											handler.done ||
												(_this._state ===
													States.RESOLVED &&
													handler.onfulfilled &&
													handler.onfulfilled(
														_this._value,
													),
												_this._state ===
													States.REJECTED &&
													handler.onrejected &&
													handler.onrejected(
														_this._value,
													),
												(handler.done = !0));
										});
								}
							});
						try {
							executor(this._resolve, this._reject);
						} catch (e) {
							this._reject(e);
						}
					}
					return (
						(SyncPromise.resolve = function (value) {
							return new SyncPromise(function (resolve) {
								resolve(value);
							});
						}),
						(SyncPromise.reject = function (reason) {
							return new SyncPromise(function (_, reject) {
								reject(reason);
							});
						}),
						(SyncPromise.all = function (collection) {
							return new SyncPromise(function (resolve, reject) {
								if (Array.isArray(collection))
									if (0 !== collection.length) {
										var counter = collection.length,
											resolvedCollection = [];
										collection.forEach(function (
											item,
											index,
										) {
											SyncPromise.resolve(item)
												.then(function (value) {
													(resolvedCollection[index] =
														value),
														0 === (counter -= 1) &&
															resolve(
																resolvedCollection,
															);
												})
												.then(null, reject);
										});
									} else resolve([]);
								else
									reject(
										new TypeError(
											'Promise.all requires an array as input.',
										),
									);
							});
						}),
						(SyncPromise.prototype.then = function (
							onfulfilled,
							onrejected,
						) {
							var _this = this;
							return new SyncPromise(function (resolve, reject) {
								_this._attachHandler({
									done: !1,
									onfulfilled: function (result) {
										if (onfulfilled)
											try {
												return void resolve(
													onfulfilled(result),
												);
											} catch (e) {
												return void reject(e);
											}
										else resolve(result);
									},
									onrejected: function (reason) {
										if (onrejected)
											try {
												return void resolve(
													onrejected(reason),
												);
											} catch (e) {
												return void reject(e);
											}
										else reject(reason);
									},
								});
							});
						}),
						(SyncPromise.prototype.catch = function (onrejected) {
							return this.then(function (val) {
								return val;
							}, onrejected);
						}),
						(SyncPromise.prototype.finally = function (onfinally) {
							var _this = this;
							return new SyncPromise(function (resolve, reject) {
								var val, isRejected;
								return _this
									.then(
										function (value) {
											(isRejected = !1),
												(val = value),
												onfinally && onfinally();
										},
										function (reason) {
											(isRejected = !0),
												(val = reason),
												onfinally && onfinally();
										},
									)
									.then(function () {
										isRejected ? reject(val) : resolve(val);
									});
							});
						}),
						(SyncPromise.prototype.toString = function () {
							return '[object SyncPromise]';
						}),
						SyncPromise
					);
				})(),
				Scope = (function () {
					function Scope() {
						(this._notifyingListeners = !1),
							(this._scopeListeners = []),
							(this._eventProcessors = []),
							(this._breadcrumbs = []),
							(this._user = {}),
							(this._tags = {}),
							(this._extra = {}),
							(this._contexts = {});
					}
					return (
						(Scope.clone = function (scope) {
							var newScope = new Scope();
							return (
								scope &&
									((newScope._breadcrumbs =
										tslib_tslib_es6_spread(
											scope._breadcrumbs,
										)),
									(newScope._tags = tslib_tslib_es6_assign(
										{},
										scope._tags,
									)),
									(newScope._extra = tslib_tslib_es6_assign(
										{},
										scope._extra,
									)),
									(newScope._contexts =
										tslib_tslib_es6_assign(
											{},
											scope._contexts,
										)),
									(newScope._user = scope._user),
									(newScope._level = scope._level),
									(newScope._span = scope._span),
									(newScope._transactionName =
										scope._transactionName),
									(newScope._fingerprint =
										scope._fingerprint),
									(newScope._eventProcessors =
										tslib_tslib_es6_spread(
											scope._eventProcessors,
										))),
								newScope
							);
						}),
						(Scope.prototype.addScopeListener = function (
							callback,
						) {
							this._scopeListeners.push(callback);
						}),
						(Scope.prototype.addEventProcessor = function (
							callback,
						) {
							return this._eventProcessors.push(callback), this;
						}),
						(Scope.prototype.setUser = function (user) {
							return (
								(this._user = user || {}),
								this._notifyScopeListeners(),
								this
							);
						}),
						(Scope.prototype.setTags = function (tags) {
							return (
								(this._tags = tslib_tslib_es6_assign(
									tslib_tslib_es6_assign({}, this._tags),
									tags,
								)),
								this._notifyScopeListeners(),
								this
							);
						}),
						(Scope.prototype.setTag = function (key, value) {
							var _a;
							return (
								(this._tags = tslib_tslib_es6_assign(
									tslib_tslib_es6_assign({}, this._tags),
									(((_a = {})[key] = value), _a),
								)),
								this._notifyScopeListeners(),
								this
							);
						}),
						(Scope.prototype.setExtras = function (extras) {
							return (
								(this._extra = tslib_tslib_es6_assign(
									tslib_tslib_es6_assign({}, this._extra),
									extras,
								)),
								this._notifyScopeListeners(),
								this
							);
						}),
						(Scope.prototype.setExtra = function (key, extra) {
							var _a;
							return (
								(this._extra = tslib_tslib_es6_assign(
									tslib_tslib_es6_assign({}, this._extra),
									(((_a = {})[key] = extra), _a),
								)),
								this._notifyScopeListeners(),
								this
							);
						}),
						(Scope.prototype.setFingerprint = function (
							fingerprint,
						) {
							return (
								(this._fingerprint = fingerprint),
								this._notifyScopeListeners(),
								this
							);
						}),
						(Scope.prototype.setLevel = function (level) {
							return (
								(this._level = level),
								this._notifyScopeListeners(),
								this
							);
						}),
						(Scope.prototype.setTransactionName = function (name) {
							return (
								(this._transactionName = name),
								this._notifyScopeListeners(),
								this
							);
						}),
						(Scope.prototype.setTransaction = function (name) {
							return this.setTransactionName(name);
						}),
						(Scope.prototype.setContext = function (key, context) {
							var _a;
							return (
								(this._contexts = tslib_tslib_es6_assign(
									tslib_tslib_es6_assign({}, this._contexts),
									(((_a = {})[key] = context), _a),
								)),
								this._notifyScopeListeners(),
								this
							);
						}),
						(Scope.prototype.setSpan = function (span) {
							return (
								(this._span = span),
								this._notifyScopeListeners(),
								this
							);
						}),
						(Scope.prototype.getSpan = function () {
							return this._span;
						}),
						(Scope.prototype.getTransaction = function () {
							var span = this.getSpan();
							if (
								span &&
								span.spanRecorder &&
								span.spanRecorder.spans[0]
							)
								return span.spanRecorder.spans[0];
						}),
						(Scope.prototype.update = function (captureContext) {
							if (!captureContext) return this;
							if ('function' == typeof captureContext) {
								var updatedScope = captureContext(this);
								return updatedScope instanceof Scope
									? updatedScope
									: this;
							}
							return (
								captureContext instanceof Scope
									? ((this._tags = tslib_tslib_es6_assign(
											tslib_tslib_es6_assign(
												{},
												this._tags,
											),
											captureContext._tags,
									  )),
									  (this._extra = tslib_tslib_es6_assign(
											tslib_tslib_es6_assign(
												{},
												this._extra,
											),
											captureContext._extra,
									  )),
									  (this._contexts = tslib_tslib_es6_assign(
											tslib_tslib_es6_assign(
												{},
												this._contexts,
											),
											captureContext._contexts,
									  )),
									  captureContext._user &&
											(this._user = captureContext._user),
									  captureContext._level &&
											(this._level =
												captureContext._level),
									  captureContext._fingerprint &&
											(this._fingerprint =
												captureContext._fingerprint))
									: isPlainObject(captureContext) &&
									  ((this._tags = tslib_tslib_es6_assign(
											tslib_tslib_es6_assign(
												{},
												this._tags,
											),
											captureContext.tags,
									  )),
									  (this._extra = tslib_tslib_es6_assign(
											tslib_tslib_es6_assign(
												{},
												this._extra,
											),
											captureContext.extra,
									  )),
									  (this._contexts = tslib_tslib_es6_assign(
											tslib_tslib_es6_assign(
												{},
												this._contexts,
											),
											captureContext.contexts,
									  )),
									  captureContext.user &&
											(this._user = captureContext.user),
									  captureContext.level &&
											(this._level =
												captureContext.level),
									  captureContext.fingerprint &&
											(this._fingerprint =
												captureContext.fingerprint)),
								this
							);
						}),
						(Scope.prototype.clear = function () {
							return (
								(this._breadcrumbs = []),
								(this._tags = {}),
								(this._extra = {}),
								(this._user = {}),
								(this._contexts = {}),
								(this._level = void 0),
								(this._transactionName = void 0),
								(this._fingerprint = void 0),
								(this._span = void 0),
								this._notifyScopeListeners(),
								this
							);
						}),
						(Scope.prototype.addBreadcrumb = function (
							breadcrumb,
							maxBreadcrumbs,
						) {
							var mergedBreadcrumb = tslib_tslib_es6_assign(
								{ timestamp: (0, misc._I)() },
								breadcrumb,
							);
							return (
								(this._breadcrumbs =
									void 0 !== maxBreadcrumbs &&
									maxBreadcrumbs >= 0
										? tslib_tslib_es6_spread(
												this._breadcrumbs,
												[mergedBreadcrumb],
										  ).slice(-maxBreadcrumbs)
										: tslib_tslib_es6_spread(
												this._breadcrumbs,
												[mergedBreadcrumb],
										  )),
								this._notifyScopeListeners(),
								this
							);
						}),
						(Scope.prototype.clearBreadcrumbs = function () {
							return (
								(this._breadcrumbs = []),
								this._notifyScopeListeners(),
								this
							);
						}),
						(Scope.prototype.applyToEvent = function (event, hint) {
							return (
								this._extra &&
									Object.keys(this._extra).length &&
									(event.extra = tslib_tslib_es6_assign(
										tslib_tslib_es6_assign({}, this._extra),
										event.extra,
									)),
								this._tags &&
									Object.keys(this._tags).length &&
									(event.tags = tslib_tslib_es6_assign(
										tslib_tslib_es6_assign({}, this._tags),
										event.tags,
									)),
								this._user &&
									Object.keys(this._user).length &&
									(event.user = tslib_tslib_es6_assign(
										tslib_tslib_es6_assign({}, this._user),
										event.user,
									)),
								this._contexts &&
									Object.keys(this._contexts).length &&
									(event.contexts = tslib_tslib_es6_assign(
										tslib_tslib_es6_assign(
											{},
											this._contexts,
										),
										event.contexts,
									)),
								this._level && (event.level = this._level),
								this._transactionName &&
									(event.transaction = this._transactionName),
								this._span &&
									(event.contexts = tslib_tslib_es6_assign(
										{ trace: this._span.getTraceContext() },
										event.contexts,
									)),
								this._applyFingerprint(event),
								(event.breadcrumbs = tslib_tslib_es6_spread(
									event.breadcrumbs || [],
									this._breadcrumbs,
								)),
								(event.breadcrumbs =
									event.breadcrumbs.length > 0
										? event.breadcrumbs
										: void 0),
								this._notifyEventProcessors(
									tslib_tslib_es6_spread(
										getGlobalEventProcessors(),
										this._eventProcessors,
									),
									event,
									hint,
								)
							);
						}),
						(Scope.prototype._notifyEventProcessors = function (
							processors,
							event,
							hint,
							index,
						) {
							var _this = this;
							return (
								void 0 === index && (index = 0),
								new SyncPromise(function (resolve, reject) {
									var processor = processors[index];
									if (
										null === event ||
										'function' != typeof processor
									)
										resolve(event);
									else {
										var result = processor(
											tslib_tslib_es6_assign({}, event),
											hint,
										);
										isThenable(result)
											? result
													.then(function (final) {
														return _this
															._notifyEventProcessors(
																processors,
																final,
																hint,
																index + 1,
															)
															.then(resolve);
													})
													.then(null, reject)
											: _this
													._notifyEventProcessors(
														processors,
														result,
														hint,
														index + 1,
													)
													.then(resolve)
													.then(null, reject);
									}
								})
							);
						}),
						(Scope.prototype._notifyScopeListeners = function () {
							var _this = this;
							this._notifyingListeners ||
								((this._notifyingListeners = !0),
								setTimeout(function () {
									_this._scopeListeners.forEach(function (
										callback,
									) {
										callback(_this);
									}),
										(_this._notifyingListeners = !1);
								}));
						}),
						(Scope.prototype._applyFingerprint = function (event) {
							(event.fingerprint = event.fingerprint
								? Array.isArray(event.fingerprint)
									? event.fingerprint
									: [event.fingerprint]
								: []),
								this._fingerprint &&
									(event.fingerprint =
										event.fingerprint.concat(
											this._fingerprint,
										)),
								event.fingerprint &&
									!event.fingerprint.length &&
									delete event.fingerprint;
						}),
						Scope
					);
				})();
			function getGlobalEventProcessors() {
				var global = (0, misc.Rf)();
				return (
					(global.__SENTRY__ = global.__SENTRY__ || {}),
					(global.__SENTRY__.globalEventProcessors =
						global.__SENTRY__.globalEventProcessors || []),
					global.__SENTRY__.globalEventProcessors
				);
			}
			var API_VERSION = 3,
				Hub = (function () {
					function Hub(client, scope, _version) {
						void 0 === scope && (scope = new Scope()),
							void 0 === _version && (_version = API_VERSION),
							(this._version = _version),
							(this._stack = []),
							this._stack.push({ client, scope }),
							this.bindClient(client);
					}
					return (
						(Hub.prototype.isOlderThan = function (version) {
							return this._version < version;
						}),
						(Hub.prototype.bindClient = function (client) {
							(this.getStackTop().client = client),
								client &&
									client.setupIntegrations &&
									client.setupIntegrations();
						}),
						(Hub.prototype.pushScope = function () {
							var stack = this.getStack(),
								parentScope =
									stack.length > 0
										? stack[stack.length - 1].scope
										: void 0,
								scope = Scope.clone(parentScope);
							return (
								this.getStack().push({
									client: this.getClient(),
									scope,
								}),
								scope
							);
						}),
						(Hub.prototype.popScope = function () {
							return void 0 !== this.getStack().pop();
						}),
						(Hub.prototype.withScope = function (callback) {
							var scope = this.pushScope();
							try {
								callback(scope);
							} finally {
								this.popScope();
							}
						}),
						(Hub.prototype.getClient = function () {
							return this.getStackTop().client;
						}),
						(Hub.prototype.getScope = function () {
							return this.getStackTop().scope;
						}),
						(Hub.prototype.getStack = function () {
							return this._stack;
						}),
						(Hub.prototype.getStackTop = function () {
							return this._stack[this._stack.length - 1];
						}),
						(Hub.prototype.captureException = function (
							exception,
							hint,
						) {
							var eventId = (this._lastEventId = (0, misc.DM)()),
								finalHint = hint;
							if (!hint) {
								var syntheticException = void 0;
								try {
									throw new Error(
										'Sentry syntheticException',
									);
								} catch (exception) {
									syntheticException = exception;
								}
								finalHint = {
									originalException: exception,
									syntheticException,
								};
							}
							return (
								this._invokeClient(
									'captureException',
									exception,
									tslib_tslib_es6_assign(
										tslib_tslib_es6_assign({}, finalHint),
										{ event_id: eventId },
									),
								),
								eventId
							);
						}),
						(Hub.prototype.captureMessage = function (
							message,
							level,
							hint,
						) {
							var eventId = (this._lastEventId = (0, misc.DM)()),
								finalHint = hint;
							if (!hint) {
								var syntheticException = void 0;
								try {
									throw new Error(message);
								} catch (exception) {
									syntheticException = exception;
								}
								finalHint = {
									originalException: message,
									syntheticException,
								};
							}
							return (
								this._invokeClient(
									'captureMessage',
									message,
									level,
									tslib_tslib_es6_assign(
										tslib_tslib_es6_assign({}, finalHint),
										{ event_id: eventId },
									),
								),
								eventId
							);
						}),
						(Hub.prototype.captureEvent = function (event, hint) {
							var eventId = (this._lastEventId = (0, misc.DM)());
							return (
								this._invokeClient(
									'captureEvent',
									event,
									tslib_tslib_es6_assign(
										tslib_tslib_es6_assign({}, hint),
										{ event_id: eventId },
									),
								),
								eventId
							);
						}),
						(Hub.prototype.lastEventId = function () {
							return this._lastEventId;
						}),
						(Hub.prototype.addBreadcrumb = function (
							breadcrumb,
							hint,
						) {
							var top = this.getStackTop();
							if (top.scope && top.client) {
								var _a =
										(top.client.getOptions &&
											top.client.getOptions()) ||
										{},
									_b = _a.beforeBreadcrumb,
									beforeBreadcrumb =
										void 0 === _b ? null : _b,
									_c = _a.maxBreadcrumbs,
									maxBreadcrumbs = void 0 === _c ? 100 : _c;
								if (!(maxBreadcrumbs <= 0)) {
									var timestamp = (0, misc._I)(),
										mergedBreadcrumb =
											tslib_tslib_es6_assign(
												{ timestamp },
												breadcrumb,
											),
										finalBreadcrumb = beforeBreadcrumb
											? (0, misc.Cf)(function () {
													return beforeBreadcrumb(
														mergedBreadcrumb,
														hint,
													);
											  })
											: mergedBreadcrumb;
									null !== finalBreadcrumb &&
										top.scope.addBreadcrumb(
											finalBreadcrumb,
											Math.min(maxBreadcrumbs, 100),
										);
								}
							}
						}),
						(Hub.prototype.setUser = function (user) {
							var top = this.getStackTop();
							top.scope && top.scope.setUser(user);
						}),
						(Hub.prototype.setTags = function (tags) {
							var top = this.getStackTop();
							top.scope && top.scope.setTags(tags);
						}),
						(Hub.prototype.setExtras = function (extras) {
							var top = this.getStackTop();
							top.scope && top.scope.setExtras(extras);
						}),
						(Hub.prototype.setTag = function (key, value) {
							var top = this.getStackTop();
							top.scope && top.scope.setTag(key, value);
						}),
						(Hub.prototype.setExtra = function (key, extra) {
							var top = this.getStackTop();
							top.scope && top.scope.setExtra(key, extra);
						}),
						(Hub.prototype.setContext = function (name, context) {
							var top = this.getStackTop();
							top.scope && top.scope.setContext(name, context);
						}),
						(Hub.prototype.configureScope = function (callback) {
							var top = this.getStackTop();
							top.scope && top.client && callback(top.scope);
						}),
						(Hub.prototype.run = function (callback) {
							var oldHub = makeMain(this);
							try {
								callback(this);
							} finally {
								makeMain(oldHub);
							}
						}),
						(Hub.prototype.getIntegration = function (integration) {
							var client = this.getClient();
							if (!client) return null;
							try {
								return client.getIntegration(integration);
							} catch (_oO) {
								return (
									logger.warn(
										'Cannot retrieve integration ' +
											integration.id +
											' from the current Hub',
									),
									null
								);
							}
						}),
						(Hub.prototype.startSpan = function (context) {
							return this._callExtensionMethod(
								'startSpan',
								context,
							);
						}),
						(Hub.prototype.startTransaction = function (context) {
							return this._callExtensionMethod(
								'startTransaction',
								context,
							);
						}),
						(Hub.prototype.traceHeaders = function () {
							return this._callExtensionMethod('traceHeaders');
						}),
						(Hub.prototype._invokeClient = function (method) {
							for (
								var _a, args = [], _i = 1;
								_i < arguments.length;
								_i++
							)
								args[_i - 1] = arguments[_i];
							var top = this.getStackTop();
							top &&
								top.client &&
								top.client[method] &&
								(_a = top.client)[method].apply(
									_a,
									tslib_tslib_es6_spread(args, [top.scope]),
								);
						}),
						(Hub.prototype._callExtensionMethod = function (
							method,
						) {
							for (
								var args = [], _i = 1;
								_i < arguments.length;
								_i++
							)
								args[_i - 1] = arguments[_i];
							var sentry = getMainCarrier().__SENTRY__;
							if (
								sentry &&
								sentry.extensions &&
								'function' == typeof sentry.extensions[method]
							)
								return sentry.extensions[method].apply(
									this,
									args,
								);
							logger.warn(
								'Extension method ' +
									method +
									" couldn't be found, doing nothing.",
							);
						}),
						Hub
					);
				})();
			function getMainCarrier() {
				var carrier = (0, misc.Rf)();
				return (
					(carrier.__SENTRY__ = carrier.__SENTRY__ || {
						extensions: {},
						hub: void 0,
					}),
					carrier
				);
			}
			function makeMain(hub) {
				var registry = getMainCarrier(),
					oldHub = getHubFromCarrier(registry);
				return setHubOnCarrier(registry, hub), oldHub;
			}
			function getCurrentHub() {
				var registry = getMainCarrier();
				return (
					(hasHubOnCarrier(registry) &&
						!getHubFromCarrier(registry).isOlderThan(
							API_VERSION,
						)) ||
						setHubOnCarrier(registry, new Hub()),
					(0, misc.KV)()
						? (function getHubFromActiveDomain(registry) {
								try {
									var property = 'domain',
										sentry = getMainCarrier().__SENTRY__;
									if (
										!sentry ||
										!sentry.extensions ||
										!sentry.extensions[property]
									)
										return getHubFromCarrier(registry);
									var activeDomain =
										sentry.extensions[property].active;
									if (!activeDomain)
										return getHubFromCarrier(registry);
									if (
										!hasHubOnCarrier(activeDomain) ||
										getHubFromCarrier(
											activeDomain,
										).isOlderThan(API_VERSION)
									) {
										var registryHubTopStack =
											getHubFromCarrier(
												registry,
											).getStackTop();
										setHubOnCarrier(
											activeDomain,
											new Hub(
												registryHubTopStack.client,
												Scope.clone(
													registryHubTopStack.scope,
												),
											),
										);
									}
									return getHubFromCarrier(activeDomain);
								} catch (_Oo) {
									return getHubFromCarrier(registry);
								}
						  })(registry)
						: getHubFromCarrier(registry)
				);
			}
			function hasHubOnCarrier(carrier) {
				return !!(
					carrier &&
					carrier.__SENTRY__ &&
					carrier.__SENTRY__.hub
				);
			}
			function getHubFromCarrier(carrier) {
				return (
					(carrier && carrier.__SENTRY__ && carrier.__SENTRY__.hub) ||
						((carrier.__SENTRY__ = carrier.__SENTRY__ || {}),
						(carrier.__SENTRY__.hub = new Hub())),
					carrier.__SENTRY__.hub
				);
			}
			function setHubOnCarrier(carrier, hub) {
				return (
					!!carrier &&
					((carrier.__SENTRY__ = carrier.__SENTRY__ || {}),
					(carrier.__SENTRY__.hub = hub),
					!0)
				);
			}
			function callOnHub(method) {
				for (var args = [], _i = 1; _i < arguments.length; _i++)
					args[_i - 1] = arguments[_i];
				var hub = getCurrentHub();
				if (hub && hub[method])
					return hub[method].apply(
						hub,
						(function tslib_es6_spread() {
							for (var ar = [], i = 0; i < arguments.length; i++)
								ar = ar.concat(__read(arguments[i]));
							return ar;
						})(args),
					);
				throw new Error(
					'No hub defined or ' +
						method +
						' was not found on the hub, please open a bug report.',
				);
			}
			function captureException(exception, captureContext) {
				var syntheticException;
				try {
					throw new Error('Sentry syntheticException');
				} catch (exception) {
					syntheticException = exception;
				}
				return callOnHub('captureException', exception, {
					captureContext,
					originalException: exception,
					syntheticException,
				});
			}
			function captureMessage(message, captureContext) {
				var syntheticException;
				try {
					throw new Error(message);
				} catch (exception) {
					syntheticException = exception;
				}
				return callOnHub(
					'captureMessage',
					message,
					'string' == typeof captureContext ? captureContext : void 0,
					tslib_es6_assign(
						{ originalException: message, syntheticException },
						'string' != typeof captureContext
							? { captureContext }
							: void 0,
					),
				);
			}
		},
		'./node_modules/@sentry/utils/esm/misc.js': (
			module,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.d(__webpack_exports__, {
				Cf: () => consoleSandbox,
				DM: () => uuid4,
				KV: () => isNodeEnv,
				Rf: () => getGlobalObject,
				_I: () => timestampWithMs,
			}),
				(module = __webpack_require__.hmd(module));
			var process = __webpack_require__(
				'./node_modules/process/browser.js',
			);
			function isNodeEnv() {
				return (
					'[object process]' ===
					Object.prototype.toString.call(
						void 0 !== process ? process : 0,
					)
				);
			}
			var fallbackGlobalObject = {};
			function getGlobalObject() {
				return isNodeEnv()
					? __webpack_require__.g
					: 'undefined' != typeof window
					? window
					: 'undefined' != typeof self
					? self
					: fallbackGlobalObject;
			}
			function uuid4() {
				var global = getGlobalObject(),
					crypto = global.crypto || global.msCrypto;
				if (void 0 !== crypto && crypto.getRandomValues) {
					var arr = new Uint16Array(8);
					crypto.getRandomValues(arr),
						(arr[3] = (4095 & arr[3]) | 16384),
						(arr[4] = (16383 & arr[4]) | 32768);
					var pad = function (num) {
						for (var v = num.toString(16); v.length < 4; )
							v = '0' + v;
						return v;
					};
					return (
						pad(arr[0]) +
						pad(arr[1]) +
						pad(arr[2]) +
						pad(arr[3]) +
						pad(arr[4]) +
						pad(arr[5]) +
						pad(arr[6]) +
						pad(arr[7])
					);
				}
				return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(
					/[xy]/g,
					function (c) {
						var r = (16 * Math.random()) | 0;
						return ('x' === c ? r : (3 & r) | 8).toString(16);
					},
				);
			}
			function consoleSandbox(callback) {
				var global = getGlobalObject();
				if (!('console' in global)) return callback();
				var originalConsole = global.console,
					wrappedLevels = {};
				['debug', 'info', 'warn', 'error', 'log', 'assert'].forEach(
					function (level) {
						level in global.console &&
							originalConsole[level].__sentry_original__ &&
							((wrappedLevels[level] = originalConsole[level]),
							(originalConsole[level] =
								originalConsole[level].__sentry_original__));
					},
				);
				var result = callback();
				return (
					Object.keys(wrappedLevels).forEach(function (level) {
						originalConsole[level] = wrappedLevels[level];
					}),
					result
				);
			}
			var INITIAL_TIME = Date.now(),
				prevNow = 0,
				performanceFallback = {
					now: function () {
						var now = Date.now() - INITIAL_TIME;
						return (
							now < prevNow && (now = prevNow),
							(prevNow = now),
							now
						);
					},
					timeOrigin: INITIAL_TIME,
				},
				crossPlatformPerformance = (function () {
					if (isNodeEnv())
						try {
							return (function dynamicRequire(mod, request) {
								return mod.require(request);
							})(module, 'perf_hooks').performance;
						} catch (_) {
							return performanceFallback;
						}
					var performance = getGlobalObject().performance;
					return performance && performance.now
						? (void 0 === performance.timeOrigin &&
								(performance.timeOrigin =
									(performance.timing &&
										performance.timing.navigationStart) ||
									INITIAL_TIME),
						  performance)
						: performanceFallback;
				})();
			function timestampWithMs() {
				return (
					(crossPlatformPerformance.timeOrigin +
						crossPlatformPerformance.now()) /
					1e3
				);
			}
		},
	},
]);
