/*! For license information please see 3155.d3660d80.iframe.bundle.js.LICENSE.txt */
(self.webpackChunkmanage_frontend =
	self.webpackChunkmanage_frontend || []).push([
	[3155],
	{
		'./node_modules/cookie-signature/index.js': (
			__unused_webpack_module,
			exports,
			__webpack_require__,
		) => {
			var crypto = __webpack_require__('?1c38');
			function sha1(str) {
				return crypto.createHash('sha1').update(str).digest('hex');
			}
			(exports.sign = function (val, secret) {
				if ('string' != typeof val)
					throw new TypeError(
						'Cookie value must be provided as a string.',
					);
				if ('string' != typeof secret)
					throw new TypeError('Secret string must be provided.');
				return (
					val +
					'.' +
					crypto
						.createHmac('sha256', secret)
						.update(val)
						.digest('base64')
						.replace(/\=+$/, '')
				);
			}),
				(exports.unsign = function (val, secret) {
					if ('string' != typeof val)
						throw new TypeError(
							'Signed cookie string must be provided.',
						);
					if ('string' != typeof secret)
						throw new TypeError('Secret string must be provided.');
					var str = val.slice(0, val.lastIndexOf('.'));
					return sha1(exports.sign(str, secret)) == sha1(val) && str;
				});
		},
		'./node_modules/csrf/index.js': (
			module,
			__unused_webpack_exports,
			__webpack_require__,
		) => {
			'use strict';
			var rndm = __webpack_require__('./node_modules/rndm/index.js'),
				uid = __webpack_require__('./node_modules/uid-safe/index.js'),
				compare = __webpack_require__(
					'./node_modules/tsscmp/lib/index.js',
				),
				crypto = __webpack_require__('?e84b'),
				EQUAL_GLOBAL_REGEXP = /=/g,
				PLUS_GLOBAL_REGEXP = /\+/g,
				SLASH_GLOBAL_REGEXP = /\//g;
			function Tokens(options) {
				if (!(this instanceof Tokens)) return new Tokens(options);
				var opts = options || {},
					saltLength =
						void 0 !== opts.saltLength ? opts.saltLength : 8;
				if (
					'number' != typeof saltLength ||
					!isFinite(saltLength) ||
					saltLength < 1
				)
					throw new TypeError(
						'option saltLength must be finite number > 1',
					);
				var secretLength =
					void 0 !== opts.secretLength ? opts.secretLength : 18;
				if (
					'number' != typeof secretLength ||
					!isFinite(secretLength) ||
					secretLength < 1
				)
					throw new TypeError(
						'option secretLength must be finite number > 1',
					);
				(this.saltLength = saltLength),
					(this.secretLength = secretLength);
			}
			(module.exports = Tokens),
				(Tokens.prototype.create = function create(secret) {
					if (!secret || 'string' != typeof secret)
						throw new TypeError('argument secret is required');
					return this._tokenize(secret, rndm(this.saltLength));
				}),
				(Tokens.prototype.secret = function secret(callback) {
					return uid(this.secretLength, callback);
				}),
				(Tokens.prototype.secretSync = function secretSync() {
					return uid.sync(this.secretLength);
				}),
				(Tokens.prototype._tokenize = function tokenize(secret, salt) {
					return (
						salt +
						'-' +
						(function hash(str) {
							return crypto
								.createHash('sha1')
								.update(str, 'ascii')
								.digest('base64')
								.replace(PLUS_GLOBAL_REGEXP, '-')
								.replace(SLASH_GLOBAL_REGEXP, '_')
								.replace(EQUAL_GLOBAL_REGEXP, '');
						})(salt + '-' + secret)
					);
				}),
				(Tokens.prototype.verify = function verify(secret, token) {
					if (!secret || 'string' != typeof secret) return !1;
					if (!token || 'string' != typeof token) return !1;
					var index = token.indexOf('-');
					if (-1 === index) return !1;
					var salt = token.substr(0, index),
						expected = this._tokenize(secret, salt);
					return compare(token, expected);
				});
		},
		'./node_modules/csurf/index.js': (
			module,
			__unused_webpack_exports,
			__webpack_require__,
		) => {
			'use strict';
			var Cookie = __webpack_require__(
					'./node_modules/csurf/node_modules/cookie/index.js',
				),
				createError = __webpack_require__(
					'./node_modules/csurf/node_modules/http-errors/index.js',
				),
				sign = __webpack_require__(
					'./node_modules/cookie-signature/index.js',
				).sign,
				Tokens = __webpack_require__('./node_modules/csrf/index.js');
			function defaultValue(req) {
				return (
					(req.body && req.body._csrf) ||
					(req.query && req.query._csrf) ||
					req.headers['csrf-token'] ||
					req.headers['xsrf-token'] ||
					req.headers['x-csrf-token'] ||
					req.headers['x-xsrf-token']
				);
			}
			function getSecret(req, sessionKey, cookie) {
				var bag = getSecretBag(req, sessionKey, cookie),
					key = cookie ? cookie.key : 'csrfSecret';
				if (!bag) throw new Error('misconfigured csrf');
				return bag[key];
			}
			function getSecretBag(req, sessionKey, cookie) {
				return cookie
					? req[cookie.signed ? 'signedCookies' : 'cookies']
					: req[sessionKey];
			}
			function setSecret(req, res, sessionKey, val, cookie) {
				if (cookie) {
					var value = val;
					cookie.signed && (value = 's:' + sign(val, req.secret)),
						(function setCookie(res, name, val, options) {
							var data = Cookie.serialize(name, val, options),
								prev = res.getHeader('set-cookie') || [],
								header = Array.isArray(prev)
									? prev.concat(data)
									: [prev, data];
							res.setHeader('set-cookie', header);
						})(res, cookie.key, value, cookie);
				} else req[sessionKey].csrfSecret = val;
			}
			module.exports = function csurf(options) {
				var opts = options || {},
					cookie = (function getCookieOptions(options) {
						if (!0 !== options && 'object' != typeof options)
							return;
						var opts = Object.create(null);
						if (
							((opts.key = '_csrf'),
							(opts.path = '/'),
							options && 'object' == typeof options)
						)
							for (var prop in options) {
								var val = options[prop];
								void 0 !== val && (opts[prop] = val);
							}
						return opts;
					})(opts.cookie),
					sessionKey = opts.sessionKey || 'session',
					value = opts.value || defaultValue,
					tokens = new Tokens(opts),
					ignoreMethods =
						void 0 === opts.ignoreMethods
							? ['GET', 'HEAD', 'OPTIONS']
							: opts.ignoreMethods;
				if (!Array.isArray(ignoreMethods))
					throw new TypeError(
						'option ignoreMethods must be an array',
					);
				var ignoreMethod = (function getIgnoredMethods(methods) {
					for (
						var obj = Object.create(null), i = 0;
						i < methods.length;
						i++
					) {
						obj[methods[i].toUpperCase()] = !0;
					}
					return obj;
				})(ignoreMethods);
				return function csrf(req, res, next) {
					if (
						!(function verifyConfiguration(
							req,
							sessionKey,
							cookie,
						) {
							if (!getSecretBag(req, sessionKey, cookie))
								return !1;
							if (cookie && cookie.signed && !req.secret)
								return !1;
							return !0;
						})(req, sessionKey, cookie)
					)
						return next(new Error('misconfigured csrf'));
					var token,
						secret = getSecret(req, sessionKey, cookie);
					if (
						((req.csrfToken = function csrfToken() {
							var sec = cookie
								? secret
								: getSecret(req, sessionKey, cookie);
							return token && sec === secret
								? token
								: (void 0 === sec &&
										((sec = tokens.secretSync()),
										setSecret(
											req,
											res,
											sessionKey,
											sec,
											cookie,
										)),
								  (secret = sec),
								  (token = tokens.create(secret)));
						}),
						secret ||
							((secret = tokens.secretSync()),
							setSecret(req, res, sessionKey, secret, cookie)),
						!ignoreMethod[req.method] &&
							!tokens.verify(secret, value(req)))
					)
						return next(
							createError(403, 'invalid csrf token', {
								code: 'EBADCSRFTOKEN',
							}),
						);
					next();
				};
			};
		},
		'./node_modules/csurf/node_modules/cookie/index.js': (
			__unused_webpack_module,
			exports,
		) => {
			'use strict';
			(exports.parse = function parse(str, options) {
				if ('string' != typeof str)
					throw new TypeError('argument str must be a string');
				for (
					var obj = {},
						opt = options || {},
						pairs = str.split(pairSplitRegExp),
						dec = opt.decode || decode,
						i = 0;
					i < pairs.length;
					i++
				) {
					var pair = pairs[i],
						eq_idx = pair.indexOf('=');
					if (!(eq_idx < 0)) {
						var key = pair.substr(0, eq_idx).trim(),
							val = pair.substr(++eq_idx, pair.length).trim();
						'"' == val[0] && (val = val.slice(1, -1)),
							null == obj[key] &&
								(obj[key] = tryDecode(val, dec));
					}
				}
				return obj;
			}),
				(exports.serialize = function serialize(name, val, options) {
					var opt = options || {},
						enc = opt.encode || encode;
					if ('function' != typeof enc)
						throw new TypeError('option encode is invalid');
					if (!fieldContentRegExp.test(name))
						throw new TypeError('argument name is invalid');
					var value = enc(val);
					if (value && !fieldContentRegExp.test(value))
						throw new TypeError('argument val is invalid');
					var str = name + '=' + value;
					if (null != opt.maxAge) {
						var maxAge = opt.maxAge - 0;
						if (isNaN(maxAge))
							throw new Error('maxAge should be a Number');
						str += '; Max-Age=' + Math.floor(maxAge);
					}
					if (opt.domain) {
						if (!fieldContentRegExp.test(opt.domain))
							throw new TypeError('option domain is invalid');
						str += '; Domain=' + opt.domain;
					}
					if (opt.path) {
						if (!fieldContentRegExp.test(opt.path))
							throw new TypeError('option path is invalid');
						str += '; Path=' + opt.path;
					}
					if (opt.expires) {
						if ('function' != typeof opt.expires.toUTCString)
							throw new TypeError('option expires is invalid');
						str += '; Expires=' + opt.expires.toUTCString();
					}
					opt.httpOnly && (str += '; HttpOnly');
					opt.secure && (str += '; Secure');
					if (opt.sameSite) {
						switch (
							'string' == typeof opt.sameSite
								? opt.sameSite.toLowerCase()
								: opt.sameSite
						) {
							case !0:
								str += '; SameSite=Strict';
								break;
							case 'lax':
								str += '; SameSite=Lax';
								break;
							case 'strict':
								str += '; SameSite=Strict';
								break;
							case 'none':
								str += '; SameSite=None';
								break;
							default:
								throw new TypeError(
									'option sameSite is invalid',
								);
						}
					}
					return str;
				});
			var decode = decodeURIComponent,
				encode = encodeURIComponent,
				pairSplitRegExp = /; */,
				fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
			function tryDecode(str, decode) {
				try {
					return decode(str);
				} catch (e) {
					return str;
				}
			}
		},
		'./node_modules/csurf/node_modules/depd/lib/browser/index.js': (
			module,
		) => {
			'use strict';
			function wrapfunction(fn, message) {
				if ('function' != typeof fn)
					throw new TypeError('argument fn must be a function');
				return fn;
			}
			function wrapproperty(obj, prop, message) {
				if (
					!obj ||
					('object' != typeof obj && 'function' != typeof obj)
				)
					throw new TypeError('argument obj must be object');
				var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
				if (!descriptor)
					throw new TypeError('must call property on owner object');
				if (!descriptor.configurable)
					throw new TypeError('property must be configurable');
			}
			module.exports = function depd(namespace) {
				if (!namespace)
					throw new TypeError('argument namespace is required');
				function deprecate(message) {}
				return (
					(deprecate._file = void 0),
					(deprecate._ignored = !0),
					(deprecate._namespace = namespace),
					(deprecate._traced = !1),
					(deprecate._warned = Object.create(null)),
					(deprecate.function = wrapfunction),
					(deprecate.property = wrapproperty),
					deprecate
				);
			};
		},
		'./node_modules/csurf/node_modules/http-errors/index.js': (
			module,
			__unused_webpack_exports,
			__webpack_require__,
		) => {
			'use strict';
			var deprecate = __webpack_require__(
					'./node_modules/csurf/node_modules/depd/lib/browser/index.js',
				)('http-errors'),
				setPrototypeOf = __webpack_require__(
					'./node_modules/csurf/node_modules/setprototypeof/index.js',
				),
				statuses = __webpack_require__(
					'./node_modules/csurf/node_modules/statuses/index.js',
				),
				inherits = __webpack_require__(
					'./node_modules/inherits/inherits_browser.js',
				),
				toIdentifier = __webpack_require__(
					'./node_modules/csurf/node_modules/toidentifier/index.js',
				);
			function codeClass(status) {
				return Number(String(status).charAt(0) + '00');
			}
			function nameFunc(func, name) {
				var desc = Object.getOwnPropertyDescriptor(func, 'name');
				desc &&
					desc.configurable &&
					((desc.value = name),
					Object.defineProperty(func, 'name', desc));
			}
			(module.exports = function createError() {
				for (
					var err, msg, status = 500, props = {}, i = 0;
					i < arguments.length;
					i++
				) {
					var arg = arguments[i];
					if (arg instanceof Error)
						status = (err = arg).status || err.statusCode || status;
					else
						switch (typeof arg) {
							case 'string':
								msg = arg;
								break;
							case 'number':
								(status = arg),
									0 !== i &&
										deprecate(
											'non-first-argument status code; replace with createError(' +
												arg +
												', ...)',
										);
								break;
							case 'object':
								props = arg;
						}
				}
				'number' == typeof status &&
					(status < 400 || status >= 600) &&
					deprecate(
						'non-error status code; use only 4xx or 5xx status codes',
					);
				('number' != typeof status ||
					(!statuses[status] && (status < 400 || status >= 600))) &&
					(status = 500);
				var HttpError =
					createError[status] || createError[codeClass(status)];
				err ||
					((err = HttpError
						? new HttpError(msg)
						: new Error(msg || statuses[status])),
					Error.captureStackTrace(err, createError));
				(HttpError &&
					err instanceof HttpError &&
					err.status === status) ||
					((err.expose = status < 500),
					(err.status = err.statusCode = status));
				for (var key in props)
					'status' !== key &&
						'statusCode' !== key &&
						(err[key] = props[key]);
				return err;
			}),
				(module.exports.HttpError =
					(function createHttpErrorConstructor() {
						function HttpError() {
							throw new TypeError(
								'cannot construct abstract class',
							);
						}
						return inherits(HttpError, Error), HttpError;
					})()),
				(function populateConstructorExports(
					exports,
					codes,
					HttpError,
				) {
					codes.forEach(function forEachCode(code) {
						var CodeError,
							name = toIdentifier(statuses[code]);
						switch (codeClass(code)) {
							case 400:
								CodeError =
									(function createClientErrorConstructor(
										HttpError,
										name,
										code,
									) {
										var className = name.match(/Error$/)
											? name
											: name + 'Error';
										function ClientError(message) {
											var msg =
													null != message
														? message
														: statuses[code],
												err = new Error(msg);
											return (
												Error.captureStackTrace(
													err,
													ClientError,
												),
												setPrototypeOf(
													err,
													ClientError.prototype,
												),
												Object.defineProperty(
													err,
													'message',
													{
														enumerable: !0,
														configurable: !0,
														value: msg,
														writable: !0,
													},
												),
												Object.defineProperty(
													err,
													'name',
													{
														enumerable: !1,
														configurable: !0,
														value: className,
														writable: !0,
													},
												),
												err
											);
										}
										return (
											inherits(ClientError, HttpError),
											nameFunc(ClientError, className),
											(ClientError.prototype.status =
												code),
											(ClientError.prototype.statusCode =
												code),
											(ClientError.prototype.expose = !0),
											ClientError
										);
									})(HttpError, name, code);
								break;
							case 500:
								CodeError =
									(function createServerErrorConstructor(
										HttpError,
										name,
										code,
									) {
										var className = name.match(/Error$/)
											? name
											: name + 'Error';
										function ServerError(message) {
											var msg =
													null != message
														? message
														: statuses[code],
												err = new Error(msg);
											return (
												Error.captureStackTrace(
													err,
													ServerError,
												),
												setPrototypeOf(
													err,
													ServerError.prototype,
												),
												Object.defineProperty(
													err,
													'message',
													{
														enumerable: !0,
														configurable: !0,
														value: msg,
														writable: !0,
													},
												),
												Object.defineProperty(
													err,
													'name',
													{
														enumerable: !1,
														configurable: !0,
														value: className,
														writable: !0,
													},
												),
												err
											);
										}
										return (
											inherits(ServerError, HttpError),
											nameFunc(ServerError, className),
											(ServerError.prototype.status =
												code),
											(ServerError.prototype.statusCode =
												code),
											(ServerError.prototype.expose = !1),
											ServerError
										);
									})(HttpError, name, code);
						}
						CodeError &&
							((exports[code] = CodeError),
							(exports[name] = CodeError));
					}),
						(exports["I'mateapot"] = deprecate.function(
							exports.ImATeapot,
							'"I\'mateapot"; use "ImATeapot" instead',
						));
				})(module.exports, statuses.codes, module.exports.HttpError);
		},
		'./node_modules/csurf/node_modules/setprototypeof/index.js': (
			module,
		) => {
			'use strict';
			module.exports =
				Object.setPrototypeOf ||
				({ __proto__: [] } instanceof Array
					? function setProtoOf(obj, proto) {
							return (obj.__proto__ = proto), obj;
					  }
					: function mixinProperties(obj, proto) {
							for (var prop in proto)
								obj.hasOwnProperty(prop) ||
									(obj[prop] = proto[prop]);
							return obj;
					  });
		},
		'./node_modules/csurf/node_modules/statuses/index.js': (
			module,
			__unused_webpack_exports,
			__webpack_require__,
		) => {
			'use strict';
			var codes = __webpack_require__(
				'./node_modules/csurf/node_modules/statuses/codes.json',
			);
			function status(code) {
				if ('number' == typeof code) {
					if (!status[code])
						throw new Error('invalid status code: ' + code);
					return code;
				}
				if ('string' != typeof code)
					throw new TypeError('code must be a number or string');
				var n = parseInt(code, 10);
				if (!isNaN(n)) {
					if (!status[n])
						throw new Error('invalid status code: ' + n);
					return n;
				}
				if (!(n = status[code.toLowerCase()]))
					throw new Error('invalid status message: "' + code + '"');
				return n;
			}
			(module.exports = status),
				(status.STATUS_CODES = codes),
				(status.codes = (function populateStatusesMap(statuses, codes) {
					var arr = [];
					return (
						Object.keys(codes).forEach(function forEachCode(code) {
							var message = codes[code],
								status = Number(code);
							(statuses[status] = message),
								(statuses[message] = status),
								(statuses[message.toLowerCase()] = status),
								arr.push(status);
						}),
						arr
					);
				})(status, codes)),
				(status.redirect = {
					300: !0,
					301: !0,
					302: !0,
					303: !0,
					305: !0,
					307: !0,
					308: !0,
				}),
				(status.empty = { 204: !0, 205: !0, 304: !0 }),
				(status.retry = { 502: !0, 503: !0, 504: !0 });
		},
		'./node_modules/csurf/node_modules/toidentifier/index.js': (module) => {
			module.exports = function toIdentifier(str) {
				return str
					.split(' ')
					.map(function (token) {
						return token.slice(0, 1).toUpperCase() + token.slice(1);
					})
					.join('')
					.replace(/[^ _0-9a-z]/gi, '');
			};
		},
		'./node_modules/js-cookie/src/js.cookie.js': (
			module,
			exports,
			__webpack_require__,
		) => {
			var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;
			!(function (factory) {
				if (
					(void 0 ===
						(__WEBPACK_AMD_DEFINE_RESULT__ =
							'function' ==
							typeof (__WEBPACK_AMD_DEFINE_FACTORY__ = factory)
								? __WEBPACK_AMD_DEFINE_FACTORY__.call(
										exports,
										__webpack_require__,
										exports,
										module,
								  )
								: __WEBPACK_AMD_DEFINE_FACTORY__) ||
						(module.exports = __WEBPACK_AMD_DEFINE_RESULT__),
					!0,
					(module.exports = factory()),
					!!0)
				) {
					var OldCookies = window.Cookies,
						api = (window.Cookies = factory());
					api.noConflict = function () {
						return (window.Cookies = OldCookies), api;
					};
				}
			})(function () {
				function extend() {
					for (var i = 0, result = {}; i < arguments.length; i++) {
						var attributes = arguments[i];
						for (var key in attributes)
							result[key] = attributes[key];
					}
					return result;
				}
				function decode(s) {
					return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
				}
				return (function init(converter) {
					function api() {}
					function set(key, value, attributes) {
						if ('undefined' != typeof document) {
							'number' ==
								typeof (attributes = extend(
									{ path: '/' },
									api.defaults,
									attributes,
								)).expires &&
								(attributes.expires = new Date(
									1 * new Date() + 864e5 * attributes.expires,
								)),
								(attributes.expires = attributes.expires
									? attributes.expires.toUTCString()
									: '');
							try {
								var result = JSON.stringify(value);
								/^[\{\[]/.test(result) && (value = result);
							} catch (e) {}
							(value = converter.write
								? converter.write(value, key)
								: encodeURIComponent(String(value)).replace(
										/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
										decodeURIComponent,
								  )),
								(key = encodeURIComponent(String(key))
									.replace(
										/%(23|24|26|2B|5E|60|7C)/g,
										decodeURIComponent,
									)
									.replace(/[\(\)]/g, escape));
							var stringifiedAttributes = '';
							for (var attributeName in attributes)
								attributes[attributeName] &&
									((stringifiedAttributes +=
										'; ' + attributeName),
									!0 !== attributes[attributeName] &&
										(stringifiedAttributes +=
											'=' +
											attributes[attributeName].split(
												';',
											)[0]));
							return (document.cookie =
								key + '=' + value + stringifiedAttributes);
						}
					}
					function get(key, json) {
						if ('undefined' != typeof document) {
							for (
								var jar = {},
									cookies = document.cookie
										? document.cookie.split('; ')
										: [],
									i = 0;
								i < cookies.length;
								i++
							) {
								var parts = cookies[i].split('='),
									cookie = parts.slice(1).join('=');
								json ||
									'"' !== cookie.charAt(0) ||
									(cookie = cookie.slice(1, -1));
								try {
									var name = decode(parts[0]);
									if (
										((cookie =
											(converter.read || converter)(
												cookie,
												name,
											) || decode(cookie)),
										json)
									)
										try {
											cookie = JSON.parse(cookie);
										} catch (e) {}
									if (((jar[name] = cookie), key === name))
										break;
								} catch (e) {}
							}
							return key ? jar[key] : jar;
						}
					}
					return (
						(api.set = set),
						(api.get = function (key) {
							return get(key, !1);
						}),
						(api.getJSON = function (key) {
							return get(key, !0);
						}),
						(api.remove = function (key, attributes) {
							set(key, '', extend(attributes, { expires: -1 }));
						}),
						(api.defaults = {}),
						(api.withConverter = init),
						api
					);
				})(function () {});
			});
		},
		'./node_modules/random-bytes/index.js': (
			module,
			__unused_webpack_exports,
			__webpack_require__,
		) => {
			'use strict';
			var crypto = __webpack_require__('?eee3'),
				generateAttempts =
					crypto.randomBytes === crypto.pseudoRandomBytes ? 1 : 3;
			function generateRandomBytes(size, attempts, callback) {
				crypto.randomBytes(size, function onRandomBytes(err, buf) {
					return err
						? --attempts
							? void setTimeout(
									generateRandomBytes.bind(
										null,
										size,
										attempts,
										callback,
									),
									10,
							  )
							: callback(err)
						: callback(null, buf);
				});
			}
			(module.exports = function randomBytes(size, callback) {
				if (void 0 !== callback && 'function' != typeof callback)
					throw new TypeError('argument callback must be a function');
				if (!callback && !__webpack_require__.g.Promise)
					throw new TypeError('argument callback is required');
				if (callback)
					return generateRandomBytes(
						size,
						generateAttempts,
						callback,
					);
				return new Promise(function executor(resolve, reject) {
					generateRandomBytes(
						size,
						generateAttempts,
						function onRandomBytes(err, str) {
							if (err) return reject(err);
							resolve(str);
						},
					);
				});
			}),
				(module.exports.sync = function randomBytesSync(size) {
					for (var err = null, i = 0; i < generateAttempts; i++)
						try {
							return crypto.randomBytes(size);
						} catch (e) {
							err = e;
						}
					throw err;
				});
		},
		'./node_modules/rndm/index.js': (
			module,
			exports,
			__webpack_require__,
		) => {
			var Buffer = __webpack_require__(
					'./node_modules/buffer/index.js',
				).lW,
				assert = __webpack_require__(
					'./node_modules/assert/build/assert.js',
				);
			function create(chars) {
				assert(
					'string' == typeof chars,
					'the list of characters must be a string!',
				);
				var length = Buffer.byteLength(chars);
				return function rndm(len) {
					assert(
						'number' == typeof (len = len || 10) && len >= 0,
						'the length of the random string must be a number!',
					);
					for (var salt = '', i = 0; i < len; i++)
						salt += chars[Math.floor(length * Math.random())];
					return salt;
				};
			}
			((exports = module.exports =
				create(
					'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
				)).base62 = exports),
				(exports.base36 = create(
					'abcdefghijklmnopqrstuvwxyz0123456789',
				)),
				(exports.base10 = create('0123456789')),
				(exports.create = create);
		},
		'./node_modules/tsscmp/lib/index.js': (
			module,
			__unused_webpack_exports,
			__webpack_require__,
		) => {
			'use strict';
			var crypto = __webpack_require__('?596d');
			module.exports = function timeSafeCompare(a, b) {
				var sa = String(a),
					sb = String(b),
					key = crypto.pseudoRandomBytes(32);
				return (
					(function bufferEqual(a, b) {
						if (a.length !== b.length) return !1;
						if (crypto.timingSafeEqual)
							return crypto.timingSafeEqual(a, b);
						for (var i = 0; i < a.length; i++)
							if (a[i] !== b[i]) return !1;
						return !0;
					})(
						crypto.createHmac('sha256', key).update(sa).digest(),
						crypto.createHmac('sha256', key).update(sb).digest(),
					) && a === b
				);
			};
		},
		'./node_modules/uid-safe/index.js': (
			module,
			__unused_webpack_exports,
			__webpack_require__,
		) => {
			'use strict';
			var randomBytes = __webpack_require__(
					'./node_modules/random-bytes/index.js',
				),
				EQUAL_END_REGEXP = /=+$/,
				PLUS_GLOBAL_REGEXP = /\+/g,
				SLASH_GLOBAL_REGEXP = /\//g;
			function generateUid(length, callback) {
				randomBytes(length, function (err, buf) {
					if (err) return callback(err);
					callback(null, toString(buf));
				});
			}
			function toString(buf) {
				return buf
					.toString('base64')
					.replace(EQUAL_END_REGEXP, '')
					.replace(PLUS_GLOBAL_REGEXP, '-')
					.replace(SLASH_GLOBAL_REGEXP, '_');
			}
			(module.exports = function uid(length, callback) {
				if (void 0 !== callback && 'function' != typeof callback)
					throw new TypeError('argument callback must be a function');
				if (!callback && !__webpack_require__.g.Promise)
					throw new TypeError('argument callback is required');
				if (callback) return generateUid(length, callback);
				return new Promise(function executor(resolve, reject) {
					generateUid(length, function onUid(err, str) {
						if (err) return reject(err);
						resolve(str);
					});
				});
			}),
				(module.exports.sync = function uidSync(length) {
					return toString(randomBytes.sync(length));
				});
		},
		'./node_modules/csurf/node_modules/statuses/codes.json': (module) => {
			'use strict';
			module.exports = JSON.parse(
				'{"100":"Continue","101":"Switching Protocols","102":"Processing","103":"Early Hints","200":"OK","201":"Created","202":"Accepted","203":"Non-Authoritative Information","204":"No Content","205":"Reset Content","206":"Partial Content","207":"Multi-Status","208":"Already Reported","226":"IM Used","300":"Multiple Choices","301":"Moved Permanently","302":"Found","303":"See Other","304":"Not Modified","305":"Use Proxy","306":"(Unused)","307":"Temporary Redirect","308":"Permanent Redirect","400":"Bad Request","401":"Unauthorized","402":"Payment Required","403":"Forbidden","404":"Not Found","405":"Method Not Allowed","406":"Not Acceptable","407":"Proxy Authentication Required","408":"Request Timeout","409":"Conflict","410":"Gone","411":"Length Required","412":"Precondition Failed","413":"Payload Too Large","414":"URI Too Long","415":"Unsupported Media Type","416":"Range Not Satisfiable","417":"Expectation Failed","418":"I\'m a teapot","421":"Misdirected Request","422":"Unprocessable Entity","423":"Locked","424":"Failed Dependency","425":"Unordered Collection","426":"Upgrade Required","428":"Precondition Required","429":"Too Many Requests","431":"Request Header Fields Too Large","451":"Unavailable For Legal Reasons","500":"Internal Server Error","501":"Not Implemented","502":"Bad Gateway","503":"Service Unavailable","504":"Gateway Timeout","505":"HTTP Version Not Supported","506":"Variant Also Negotiates","507":"Insufficient Storage","508":"Loop Detected","509":"Bandwidth Limit Exceeded","510":"Not Extended","511":"Network Authentication Required"}',
			);
		},
	},
]);
