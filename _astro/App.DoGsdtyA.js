import { a as __toCommonJS, i as __exportAll, n as __commonJSMin, o as __toESM, r as __esmMin, t as require_react } from "./react.DzQG-moF.js";
//#region node_modules/react/cjs/react-jsx-runtime.production.js
/**
* @license React
* react-jsx-runtime.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_jsx_runtime_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
	var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
		var key = null;
		void 0 !== maybeKey && (key = "" + maybeKey);
		void 0 !== config.key && (key = "" + config.key);
		if ("key" in config) {
			maybeKey = {};
			for (var propName in config) "key" !== propName && (maybeKey[propName] = config[propName]);
		} else maybeKey = config;
		config = maybeKey.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== config ? config : null,
			props: maybeKey
		};
	}
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.jsx = jsxProd;
	exports.jsxs = jsxProd;
}));
//#endregion
//#region node_modules/react/jsx-runtime.js
var require_jsx_runtime = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_jsx_runtime_production();
}));
//#endregion
//#region src/components/FontezziBanner.tsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FontezziBanner() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			background: "linear-gradient(135deg, #f88028, #dc3e78)",
			color: "#fff",
			padding: "10px 20px",
			textAlign: "center",
			fontSize: "14px",
			lineHeight: "1.4",
			fontFamily: "system-ui, -apple-system, sans-serif",
			width: "100%",
			boxSizing: "border-box",
			order: -1
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: { marginRight: "6px" },
				children: "✨"
			}),
			"This tool has evolved into",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "https://fontezzi.com/editor?ref=oss",
				target: "_blank",
				rel: "noopener noreferrer",
				style: {
					color: "#fff",
					fontWeight: 700,
					textDecoration: "underline",
					textUnderlineOffset: "2px"
				},
				children: "Fontezzi"
			}),
			" ",
			"— everything here is free there too, plus shadows, layers, effects & more.",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "https://fontezzi.com/editor?ref=oss",
				target: "_blank",
				rel: "noopener noreferrer",
				style: {
					display: "inline-block",
					marginLeft: "8px",
					background: "#fff",
					color: "#dc3e78",
					fontWeight: 700,
					padding: "4px 14px",
					borderRadius: "6px",
					textDecoration: "none",
					fontSize: "14px"
				},
				children: "Try Fontezzi free →"
			})
		]
	});
}
//#endregion
//#region node_modules/clone/clone.js
var require_clone = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var clone = (function() {
		"use strict";
		/**
		* Clones (copies) an Object using deep copying.
		*
		* This function supports circular references by default, but if you are certain
		* there are no circular references in your object, you can save some CPU time
		* by calling clone(obj, false).
		*
		* Caution: if `circular` is false and `parent` contains circular references,
		* your program may enter an infinite loop and crash.
		*
		* @param `parent` - the object to be cloned
		* @param `circular` - set to true if the object to be cloned may contain
		*    circular references. (optional - true by default)
		* @param `depth` - set to a number if the object is only to be cloned to
		*    a particular depth. (optional - defaults to Infinity)
		* @param `prototype` - sets the prototype to be used when cloning an object.
		*    (optional - defaults to parent prototype).
		*/
		function clone(parent, circular, depth, prototype) {
			if (typeof circular === "object") {
				depth = circular.depth;
				prototype = circular.prototype;
				circular.filter;
				circular = circular.circular;
			}
			var allParents = [];
			var allChildren = [];
			var useBuffer = typeof Buffer != "undefined";
			if (typeof circular == "undefined") circular = true;
			if (typeof depth == "undefined") depth = Infinity;
			function _clone(parent, depth) {
				if (parent === null) return null;
				if (depth == 0) return parent;
				var child;
				var proto;
				if (typeof parent != "object") return parent;
				if (clone.__isArray(parent)) child = [];
				else if (clone.__isRegExp(parent)) {
					child = new RegExp(parent.source, __getRegExpFlags(parent));
					if (parent.lastIndex) child.lastIndex = parent.lastIndex;
				} else if (clone.__isDate(parent)) child = new Date(parent.getTime());
				else if (useBuffer && Buffer.isBuffer(parent)) {
					if (Buffer.allocUnsafe) child = Buffer.allocUnsafe(parent.length);
					else child = new Buffer(parent.length);
					parent.copy(child);
					return child;
				} else if (typeof prototype == "undefined") {
					proto = Object.getPrototypeOf(parent);
					child = Object.create(proto);
				} else {
					child = Object.create(prototype);
					proto = prototype;
				}
				if (circular) {
					var index = allParents.indexOf(parent);
					if (index != -1) return allChildren[index];
					allParents.push(parent);
					allChildren.push(child);
				}
				for (var i in parent) {
					var attrs;
					if (proto) attrs = Object.getOwnPropertyDescriptor(proto, i);
					if (attrs && attrs.set == null) continue;
					child[i] = _clone(parent[i], depth - 1);
				}
				return child;
			}
			return _clone(parent, depth);
		}
		/**
		* Simple flat clone using prototype, accepts only objects, usefull for property
		* override on FLAT configuration object (no nested props).
		*
		* USE WITH CAUTION! This may not behave as you wish if you do not know how this
		* works.
		*/
		clone.clonePrototype = function clonePrototype(parent) {
			if (parent === null) return null;
			var c = function() {};
			c.prototype = parent;
			return new c();
		};
		function __objToStr(o) {
			return Object.prototype.toString.call(o);
		}
		clone.__objToStr = __objToStr;
		function __isDate(o) {
			return typeof o === "object" && __objToStr(o) === "[object Date]";
		}
		clone.__isDate = __isDate;
		function __isArray(o) {
			return typeof o === "object" && __objToStr(o) === "[object Array]";
		}
		clone.__isArray = __isArray;
		function __isRegExp(o) {
			return typeof o === "object" && __objToStr(o) === "[object RegExp]";
		}
		clone.__isRegExp = __isRegExp;
		function __getRegExpFlags(re) {
			var flags = "";
			if (re.global) flags += "g";
			if (re.ignoreCase) flags += "i";
			if (re.multiline) flags += "m";
			return flags;
		}
		clone.__getRegExpFlags = __getRegExpFlags;
		return clone;
	})();
	if (typeof module === "object" && module.exports) module.exports = clone;
}));
//#endregion
//#region node_modules/kdbush/src/sort.js
function sortKD(ids, coords, nodeSize, left, right, depth) {
	if (right - left <= nodeSize) return;
	var m = Math.floor((left + right) / 2);
	select(ids, coords, m, left, right, depth % 2);
	sortKD(ids, coords, nodeSize, left, m - 1, depth + 1);
	sortKD(ids, coords, nodeSize, m + 1, right, depth + 1);
}
function select(ids, coords, k, left, right, inc) {
	while (right > left) {
		if (right - left > 600) {
			var n = right - left + 1;
			var m = k - left + 1;
			var z = Math.log(n);
			var s = .5 * Math.exp(2 * z / 3);
			var sd = .5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
			select(ids, coords, k, Math.max(left, Math.floor(k - m * s / n + sd)), Math.min(right, Math.floor(k + (n - m) * s / n + sd)), inc);
		}
		var t = coords[2 * k + inc];
		var i = left;
		var j = right;
		swapItem(ids, coords, left, k);
		if (coords[2 * right + inc] > t) swapItem(ids, coords, left, right);
		while (i < j) {
			swapItem(ids, coords, i, j);
			i++;
			j--;
			while (coords[2 * i + inc] < t) i++;
			while (coords[2 * j + inc] > t) j--;
		}
		if (coords[2 * left + inc] === t) swapItem(ids, coords, left, j);
		else {
			j++;
			swapItem(ids, coords, j, right);
		}
		if (j <= k) left = j + 1;
		if (k <= j) right = j - 1;
	}
}
function swapItem(ids, coords, i, j) {
	swap(ids, i, j);
	swap(coords, 2 * i, 2 * j);
	swap(coords, 2 * i + 1, 2 * j + 1);
}
function swap(arr, i, j) {
	var tmp = arr[i];
	arr[i] = arr[j];
	arr[j] = tmp;
}
var init_sort = __esmMin((() => {}));
//#endregion
//#region node_modules/kdbush/src/range.js
function range(ids, coords, minX, minY, maxX, maxY, nodeSize) {
	var stack = [
		0,
		ids.length - 1,
		0
	];
	var result = [];
	var x, y;
	while (stack.length) {
		var axis = stack.pop();
		var right = stack.pop();
		var left = stack.pop();
		if (right - left <= nodeSize) {
			for (var i = left; i <= right; i++) {
				x = coords[2 * i];
				y = coords[2 * i + 1];
				if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[i]);
			}
			continue;
		}
		var m = Math.floor((left + right) / 2);
		x = coords[2 * m];
		y = coords[2 * m + 1];
		if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[m]);
		var nextAxis = (axis + 1) % 2;
		if (axis === 0 ? minX <= x : minY <= y) {
			stack.push(left);
			stack.push(m - 1);
			stack.push(nextAxis);
		}
		if (axis === 0 ? maxX >= x : maxY >= y) {
			stack.push(m + 1);
			stack.push(right);
			stack.push(nextAxis);
		}
	}
	return result;
}
var init_range = __esmMin((() => {}));
//#endregion
//#region node_modules/kdbush/src/within.js
function within(ids, coords, qx, qy, r, nodeSize) {
	var stack = [
		0,
		ids.length - 1,
		0
	];
	var result = [];
	var r2 = r * r;
	while (stack.length) {
		var axis = stack.pop();
		var right = stack.pop();
		var left = stack.pop();
		if (right - left <= nodeSize) {
			for (var i = left; i <= right; i++) if (sqDist(coords[2 * i], coords[2 * i + 1], qx, qy) <= r2) result.push(ids[i]);
			continue;
		}
		var m = Math.floor((left + right) / 2);
		var x = coords[2 * m];
		var y = coords[2 * m + 1];
		if (sqDist(x, y, qx, qy) <= r2) result.push(ids[m]);
		var nextAxis = (axis + 1) % 2;
		if (axis === 0 ? qx - r <= x : qy - r <= y) {
			stack.push(left);
			stack.push(m - 1);
			stack.push(nextAxis);
		}
		if (axis === 0 ? qx + r >= x : qy + r >= y) {
			stack.push(m + 1);
			stack.push(right);
			stack.push(nextAxis);
		}
	}
	return result;
}
function sqDist(ax, ay, bx, by) {
	var dx = ax - bx;
	var dy = ay - by;
	return dx * dx + dy * dy;
}
var init_within = __esmMin((() => {}));
//#endregion
//#region node_modules/kdbush/src/index.js
var src_exports = /* @__PURE__ */ __exportAll({ default: () => kdbush });
function kdbush(points, getX, getY, nodeSize, ArrayType) {
	return new KDBush(points, getX, getY, nodeSize, ArrayType);
}
function KDBush(points, getX, getY, nodeSize, ArrayType) {
	getX = getX || defaultGetX;
	getY = getY || defaultGetY;
	ArrayType = ArrayType || Array;
	this.nodeSize = nodeSize || 64;
	this.points = points;
	this.ids = new ArrayType(points.length);
	this.coords = new ArrayType(points.length * 2);
	for (var i = 0; i < points.length; i++) {
		this.ids[i] = i;
		this.coords[2 * i] = getX(points[i]);
		this.coords[2 * i + 1] = getY(points[i]);
	}
	sortKD(this.ids, this.coords, this.nodeSize, 0, this.ids.length - 1, 0);
}
function defaultGetX(p) {
	return p[0];
}
function defaultGetY(p) {
	return p[1];
}
var init_src = __esmMin((() => {
	init_sort();
	init_range();
	init_within();
	KDBush.prototype = {
		range: function(minX, minY, maxX, maxY) {
			return range(this.ids, this.coords, minX, minY, maxX, maxY, this.nodeSize);
		},
		within: function(x, y, r) {
			return within(this.ids, this.coords, x, y, r, this.nodeSize);
		}
	};
}));
//#endregion
//#region node_modules/graham_scan/graham_scan.min.js
var require_graham_scan_min = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Graham's Scan Convex Hull Algorithm
	* @desc An implementation of the Graham's Scan Convex Hull algorithm in JavaScript.
	* @author Brian Barnett, brian@3kb.co.uk, http://brianbar.net/ || http://3kb.co.uk/
	* @version 1.0.4
	*/
	function ConvexHullGrahamScan() {
		this.anchorPoint = void 0, this.reverse = !1, this.points = [];
	}
	ConvexHullGrahamScan.prototype = {
		constructor: ConvexHullGrahamScan,
		Point: function(n, t) {
			this.x = n, this.y = t;
		},
		_findPolarAngle: function(n, t) {
			var i, o, h = 57.295779513082;
			if (!n || !t) return 0;
			if (i = t.x - n.x, o = t.y - n.y, 0 == i && 0 == o) return 0;
			var r = Math.atan2(o, i) * h;
			return this.reverse ? 0 >= r && (r += 360) : r >= 0 && (r += 360), r;
		},
		addPoint: function(n, t) {
			void 0 === this.anchorPoint ? this.anchorPoint = new this.Point(n, t) : this.anchorPoint.y > t && this.anchorPoint.x > n || this.anchorPoint.y === t && this.anchorPoint.x > n || this.anchorPoint.y > t && this.anchorPoint.x === n ? (this.points.push(new this.Point(this.anchorPoint.x, this.anchorPoint.y)), this.anchorPoint = new this.Point(n, t)) : this.points.push(new this.Point(n, t));
		},
		_sortPoints: function() {
			var n = this;
			return this.points.sort(function(t, i) {
				var o = n._findPolarAngle(n.anchorPoint, t), h = n._findPolarAngle(n.anchorPoint, i);
				return h > o ? -1 : o > h ? 1 : 0;
			});
		},
		_checkPoints: function(n, t, i) {
			var o, h = this._findPolarAngle(n, t), r = this._findPolarAngle(n, i);
			return h > r ? (o = h - r, !(o > 180)) : r > h ? (o = r - h, o > 180) : !0;
		},
		getHull: function() {
			var n, t, i = [];
			if (this.reverse = this.points.every(function(n) {
				return n.x < 0 && n.y < 0;
			}), n = this._sortPoints(), t = n.length, 3 > t) return n.unshift(this.anchorPoint), n;
			for (i.push(n.shift(), n.shift());;) {
				var o, h, r;
				if (i.push(n.shift()), o = i[i.length - 3], h = i[i.length - 2], r = i[i.length - 1], this._checkPoints(o, h, r) && i.splice(i.length - 2, 1), 0 == n.length) {
					if (t == i.length) {
						var e = this.anchorPoint;
						return i = i.filter(function(n) {
							return !!n;
						}), i.some(function(n) {
							return n.x == e.x && n.y == e.y;
						}) || i.unshift(this.anchorPoint), i;
					}
					n = i, t = n.length, i = [], i.push(n.shift(), n.shift());
				}
			}
		}
	}, "function" == typeof define && define.amd && define(function() {
		return ConvexHullGrahamScan;
	}), "undefined" != typeof module && (module.exports = ConvexHullGrahamScan);
}));
//#endregion
//#region node_modules/bezier-js/lib/utils.js
var require_utils = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		"use strict";
		var abs = Math.abs, cos = Math.cos, sin = Math.sin, acos = Math.acos, atan2 = Math.atan2, sqrt = Math.sqrt, pow = Math.pow, crt = function(v) {
			return v < 0 ? -pow(-v, 1 / 3) : pow(v, 1 / 3);
		}, pi = Math.PI, tau = 2 * pi, quart = pi / 2, epsilon = 1e-6, nMax = Number.MAX_SAFE_INTEGER || 9007199254740991, nMin = Number.MIN_SAFE_INTEGER || -9007199254740991, ZERO = {
			x: 0,
			y: 0,
			z: 0
		};
		var utils = {
			Tvalues: [
				-.06405689286260563,
				.06405689286260563,
				-.1911188674736163,
				.1911188674736163,
				-.3150426796961634,
				.3150426796961634,
				-.4337935076260451,
				.4337935076260451,
				-.5454214713888396,
				.5454214713888396,
				-.6480936519369755,
				.6480936519369755,
				-.7401241915785544,
				.7401241915785544,
				-.820001985973903,
				.820001985973903,
				-.8864155270044011,
				.8864155270044011,
				-.9382745520027328,
				.9382745520027328,
				-.9747285559713095,
				.9747285559713095,
				-.9951872199970213,
				.9951872199970213
			],
			Cvalues: [
				.12793819534675216,
				.12793819534675216,
				.1258374563468283,
				.1258374563468283,
				.12167047292780339,
				.12167047292780339,
				.1155056680537256,
				.1155056680537256,
				.10744427011596563,
				.10744427011596563,
				.09761865210411388,
				.09761865210411388,
				.08619016153195327,
				.08619016153195327,
				.0733464814110803,
				.0733464814110803,
				.05929858491543678,
				.05929858491543678,
				.04427743881741981,
				.04427743881741981,
				.028531388628933663,
				.028531388628933663,
				.0123412297999872,
				.0123412297999872
			],
			arcfn: function(t, derivativeFn) {
				var d = derivativeFn(t);
				var l = d.x * d.x + d.y * d.y;
				if (typeof d.z !== "undefined") l += d.z * d.z;
				return sqrt(l);
			},
			compute: function(t, points, _3d) {
				if (t === 0) return points[0];
				var order = points.length - 1;
				if (t === 1) return points[order];
				var p = points;
				var mt = 1 - t;
				if (order === 0) return points[0];
				if (order === 1) {
					ret = {
						x: mt * p[0].x + t * p[1].x,
						y: mt * p[0].y + t * p[1].y
					};
					if (_3d) ret.z = mt * p[0].z + t * p[1].z;
					return ret;
				}
				if (order < 4) {
					var mt2 = mt * mt, t2 = t * t, a, b, c, d = 0;
					if (order === 2) {
						p = [
							p[0],
							p[1],
							p[2],
							ZERO
						];
						a = mt2;
						b = mt * t * 2;
						c = t2;
					} else if (order === 3) {
						a = mt2 * mt;
						b = mt2 * t * 3;
						c = mt * t2 * 3;
						d = t * t2;
					}
					var ret = {
						x: a * p[0].x + b * p[1].x + c * p[2].x + d * p[3].x,
						y: a * p[0].y + b * p[1].y + c * p[2].y + d * p[3].y
					};
					if (_3d) ret.z = a * p[0].z + b * p[1].z + c * p[2].z + d * p[3].z;
					return ret;
				}
				var dCpts = JSON.parse(JSON.stringify(points));
				while (dCpts.length > 1) {
					for (var i = 0; i < dCpts.length - 1; i++) {
						dCpts[i] = {
							x: dCpts[i].x + (dCpts[i + 1].x - dCpts[i].x) * t,
							y: dCpts[i].y + (dCpts[i + 1].y - dCpts[i].y) * t
						};
						if (typeof dCpts[i].z !== "undefined") dCpts[i] = dCpts[i].z + (dCpts[i + 1].z - dCpts[i].z) * t;
					}
					dCpts.splice(dCpts.length - 1, 1);
				}
				return dCpts[0];
			},
			computeWithRatios: function(t, points, ratios, _3d) {
				var mt = 1 - t, r = ratios, p = points, d;
				var f1 = r[0], f2 = r[1], f3 = r[2], f4 = r[3];
				f1 *= mt;
				f2 *= t;
				if (p.length === 2) {
					d = f1 + f2;
					return {
						x: (f1 * p[0].x + f2 * p[1].x) / d,
						y: (f1 * p[0].y + f2 * p[1].y) / d,
						z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z) / d
					};
				}
				f1 *= mt;
				f2 *= 2 * mt;
				f3 *= t * t;
				if (p.length === 3) {
					d = f1 + f2 + f3;
					return {
						x: (f1 * p[0].x + f2 * p[1].x + f3 * p[2].x) / d,
						y: (f1 * p[0].y + f2 * p[1].y + f3 * p[2].y) / d,
						z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z + f3 * p[2].z) / d
					};
				}
				f1 *= mt;
				f2 *= 1.5 * mt;
				f3 *= 3 * mt;
				f4 *= t * t * t;
				if (p.length === 4) {
					d = f1 + f2 + f3 + f4;
					return {
						x: (f1 * p[0].x + f2 * p[1].x + f3 * p[2].x + f4 * p[3].x) / d,
						y: (f1 * p[0].y + f2 * p[1].y + f3 * p[2].y + f4 * p[3].y) / d,
						z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z + f3 * p[2].z + f4 * p[3].z) / d
					};
				}
			},
			derive: function(points, _3d) {
				var dpoints = [];
				for (var p = points, d = p.length, c = d - 1; d > 1; d--, c--) {
					var list = [];
					for (var j = 0, dpt; j < c; j++) {
						dpt = {
							x: c * (p[j + 1].x - p[j].x),
							y: c * (p[j + 1].y - p[j].y)
						};
						if (_3d) dpt.z = c * (p[j + 1].z - p[j].z);
						list.push(dpt);
					}
					dpoints.push(list);
					p = list;
				}
				return dpoints;
			},
			between: function(v, m, M) {
				return m <= v && v <= M || utils.approximately(v, m) || utils.approximately(v, M);
			},
			approximately: function(a, b, precision) {
				return abs(a - b) <= (precision || epsilon);
			},
			length: function(derivativeFn) {
				var z = .5, sum = 0, len = utils.Tvalues.length, i, t;
				for (i = 0; i < len; i++) {
					t = z * utils.Tvalues[i] + z;
					sum += utils.Cvalues[i] * utils.arcfn(t, derivativeFn);
				}
				return z * sum;
			},
			map: function(v, ds, de, ts, te) {
				var d1 = de - ds;
				return ts + (te - ts) * ((v - ds) / d1);
			},
			lerp: function(r, v1, v2) {
				var ret = {
					x: v1.x + r * (v2.x - v1.x),
					y: v1.y + r * (v2.y - v1.y)
				};
				if (!!v1.z && !!v2.z) ret.z = v1.z + r * (v2.z - v1.z);
				return ret;
			},
			pointToString: function(p) {
				var s = p.x + "/" + p.y;
				if (typeof p.z !== "undefined") s += "/" + p.z;
				return s;
			},
			pointsToString: function(points) {
				return "[" + points.map(utils.pointToString).join(", ") + "]";
			},
			copy: function(obj) {
				return JSON.parse(JSON.stringify(obj));
			},
			angle: function(o, v1, v2) {
				var dx1 = v1.x - o.x, dy1 = v1.y - o.y, dx2 = v2.x - o.x, dy2 = v2.y - o.y;
				return atan2(dx1 * dy2 - dy1 * dx2, dx1 * dx2 + dy1 * dy2);
			},
			round: function(v, d) {
				var s = "" + v;
				var pos = s.indexOf(".");
				return parseFloat(s.substring(0, pos + 1 + d));
			},
			dist: function(p1, p2) {
				var dx = p1.x - p2.x, dy = p1.y - p2.y;
				return sqrt(dx * dx + dy * dy);
			},
			closest: function(LUT, point) {
				var mdist = pow(2, 63), mpos, d;
				LUT.forEach(function(p, idx) {
					d = utils.dist(point, p);
					if (d < mdist) {
						mdist = d;
						mpos = idx;
					}
				});
				return {
					mdist,
					mpos
				};
			},
			abcratio: function(t, n) {
				if (n !== 2 && n !== 3) return false;
				if (typeof t === "undefined") t = .5;
				else if (t === 0 || t === 1) return t;
				var bottom = pow(t, n) + pow(1 - t, n);
				return abs((bottom - 1) / bottom);
			},
			projectionratio: function(t, n) {
				if (n !== 2 && n !== 3) return false;
				if (typeof t === "undefined") t = .5;
				else if (t === 0 || t === 1) return t;
				var top = pow(1 - t, n);
				return top / (pow(t, n) + top);
			},
			lli8: function(x1, y1, x2, y2, x3, y3, x4, y4) {
				var nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4), ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4), d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
				if (d == 0) return false;
				return {
					x: nx / d,
					y: ny / d
				};
			},
			lli4: function(p1, p2, p3, p4) {
				var x1 = p1.x, y1 = p1.y, x2 = p2.x, y2 = p2.y, x3 = p3.x, y3 = p3.y, x4 = p4.x, y4 = p4.y;
				return utils.lli8(x1, y1, x2, y2, x3, y3, x4, y4);
			},
			lli: function(v1, v2) {
				return utils.lli4(v1, v1.c, v2, v2.c);
			},
			makeline: function(p1, p2) {
				var Bezier = require_bezier();
				var x1 = p1.x, y1 = p1.y, x2 = p2.x, y2 = p2.y, dx = (x2 - x1) / 3, dy = (y2 - y1) / 3;
				return new Bezier(x1, y1, x1 + dx, y1 + dy, x1 + 2 * dx, y1 + 2 * dy, x2, y2);
			},
			findbbox: function(sections) {
				var mx = nMax, my = nMax, MX = nMin, MY = nMin;
				sections.forEach(function(s) {
					var bbox = s.bbox();
					if (mx > bbox.x.min) mx = bbox.x.min;
					if (my > bbox.y.min) my = bbox.y.min;
					if (MX < bbox.x.max) MX = bbox.x.max;
					if (MY < bbox.y.max) MY = bbox.y.max;
				});
				return {
					x: {
						min: mx,
						mid: (mx + MX) / 2,
						max: MX,
						size: MX - mx
					},
					y: {
						min: my,
						mid: (my + MY) / 2,
						max: MY,
						size: MY - my
					}
				};
			},
			shapeintersections: function(s1, bbox1, s2, bbox2, curveIntersectionThreshold) {
				if (!utils.bboxoverlap(bbox1, bbox2)) return [];
				var intersections = [];
				var a1 = [
					s1.startcap,
					s1.forward,
					s1.back,
					s1.endcap
				];
				var a2 = [
					s2.startcap,
					s2.forward,
					s2.back,
					s2.endcap
				];
				a1.forEach(function(l1) {
					if (l1.virtual) return;
					a2.forEach(function(l2) {
						if (l2.virtual) return;
						var iss = l1.intersects(l2, curveIntersectionThreshold);
						if (iss.length > 0) {
							iss.c1 = l1;
							iss.c2 = l2;
							iss.s1 = s1;
							iss.s2 = s2;
							intersections.push(iss);
						}
					});
				});
				return intersections;
			},
			makeshape: function(forward, back, curveIntersectionThreshold) {
				var bpl = back.points.length;
				var fpl = forward.points.length;
				var start = utils.makeline(back.points[bpl - 1], forward.points[0]);
				var end = utils.makeline(forward.points[fpl - 1], back.points[0]);
				var shape = {
					startcap: start,
					forward,
					back,
					endcap: end,
					bbox: utils.findbbox([
						start,
						forward,
						back,
						end
					])
				};
				var self = utils;
				shape.intersections = function(s2) {
					return self.shapeintersections(shape, shape.bbox, s2, s2.bbox, curveIntersectionThreshold);
				};
				return shape;
			},
			getminmax: function(curve, d, list) {
				if (!list) return {
					min: 0,
					max: 0
				};
				var min = nMax, max = nMin, t, c;
				if (list.indexOf(0) === -1) list = [0].concat(list);
				if (list.indexOf(1) === -1) list.push(1);
				for (var i = 0, len = list.length; i < len; i++) {
					t = list[i];
					c = curve.get(t);
					if (c[d] < min) min = c[d];
					if (c[d] > max) max = c[d];
				}
				return {
					min,
					mid: (min + max) / 2,
					max,
					size: max - min
				};
			},
			align: function(points, line) {
				var tx = line.p1.x, ty = line.p1.y, a = -atan2(line.p2.y - ty, line.p2.x - tx), d = function(v) {
					return {
						x: (v.x - tx) * cos(a) - (v.y - ty) * sin(a),
						y: (v.x - tx) * sin(a) + (v.y - ty) * cos(a)
					};
				};
				return points.map(d);
			},
			roots: function(points, line) {
				line = line || {
					p1: {
						x: 0,
						y: 0
					},
					p2: {
						x: 1,
						y: 0
					}
				};
				var order = points.length - 1;
				var p = utils.align(points, line);
				var reduce = function(t) {
					return 0 <= t && t <= 1;
				};
				if (order === 2) {
					var a = p[0].y, b = p[1].y, c = p[2].y, d = a - 2 * b + c;
					if (d !== 0) {
						var m1 = -sqrt(b * b - a * c), m2 = -a + b, v1 = -(m1 + m2) / d, v2 = -(-m1 + m2) / d;
						return [v1, v2].filter(reduce);
					} else if (b !== c && d === 0) return [(2 * b - c) / (2 * b - 2 * c)].filter(reduce);
					return [];
				}
				var pa = p[0].y, pb = p[1].y, pc = p[2].y, pd = p[3].y, d = -pa + 3 * pb - 3 * pc + pd, a = 3 * pa - 6 * pb + 3 * pc, b = -3 * pa + 3 * pb, c = pa;
				if (utils.approximately(d, 0)) {
					if (utils.approximately(a, 0)) {
						if (utils.approximately(b, 0)) return [];
						return [-c / b].filter(reduce);
					}
					var q = sqrt(b * b - 4 * a * c), a2 = 2 * a;
					return [(q - b) / a2, (-b - q) / a2].filter(reduce);
				}
				a /= d;
				b /= d;
				c /= d;
				var p = (3 * b - a * a) / 3, p3 = p / 3, q = (2 * a * a * a - 9 * a * b + 27 * c) / 27, q2 = q / 2, discriminant = q2 * q2 + p3 * p3 * p3, u1, v1, x1, x2, x3;
				if (discriminant < 0) {
					var mp3 = -p / 3, r = sqrt(mp3 * mp3 * mp3), t = -q / (2 * r), phi = acos(t < -1 ? -1 : t > 1 ? 1 : t), t1 = 2 * crt(r);
					x1 = t1 * cos(phi / 3) - a / 3;
					x2 = t1 * cos((phi + tau) / 3) - a / 3;
					x3 = t1 * cos((phi + 2 * tau) / 3) - a / 3;
					return [
						x1,
						x2,
						x3
					].filter(reduce);
				} else if (discriminant === 0) {
					u1 = q2 < 0 ? crt(-q2) : -crt(q2);
					x1 = 2 * u1 - a / 3;
					x2 = -u1 - a / 3;
					return [x1, x2].filter(reduce);
				} else {
					var sd = sqrt(discriminant);
					u1 = crt(-q2 + sd);
					v1 = crt(q2 + sd);
					return [u1 - v1 - a / 3].filter(reduce);
				}
			},
			droots: function(p) {
				if (p.length === 3) {
					var a = p[0], b = p[1], c = p[2], d = a - 2 * b + c;
					if (d !== 0) {
						var m1 = -sqrt(b * b - a * c), m2 = -a + b;
						return [-(m1 + m2) / d, -(-m1 + m2) / d];
					} else if (b !== c && d === 0) return [(2 * b - c) / (2 * (b - c))];
					return [];
				}
				if (p.length === 2) {
					var a = p[0], b = p[1];
					if (a !== b) return [a / (a - b)];
					return [];
				}
			},
			curvature: function(t, points, _3d, kOnly) {
				var dpoints = utils.derive(points);
				var d1 = dpoints[0];
				var d2 = dpoints[1];
				var num, dnm, adk, dk, k = 0, r = 0;
				var d = utils.compute(t, d1);
				var dd = utils.compute(t, d2);
				var qdsum = d.x * d.x + d.y * d.y;
				if (_3d) {
					num = sqrt(pow(d.y * dd.z - dd.y * d.z, 2) + pow(d.z * dd.x - dd.z * d.x, 2) + pow(d.x * dd.y - dd.x * d.y, 2));
					dnm = pow(qdsum + d.z * d.z, 3 / 2);
				} else {
					num = d.x * dd.y - d.y * dd.x;
					dnm = pow(qdsum, 3 / 2);
				}
				if (num === 0 || dnm === 0) return {
					k: 0,
					r: 0
				};
				k = num / dnm;
				r = dnm / num;
				if (!kOnly) {
					var pk = utils.curvature(t - .001, points, _3d, true).k;
					var nk = utils.curvature(t + .001, points, _3d, true).k;
					dk = (nk - k + (k - pk)) / 2;
					adk = (abs(nk - k) + abs(k - pk)) / 2;
				}
				return {
					k,
					r,
					dk,
					adk
				};
			},
			inflections: function(points) {
				if (points.length < 4) return [];
				var p = utils.align(points, {
					p1: points[0],
					p2: points.slice(-1)[0]
				}), a = p[2].x * p[1].y, b = p[3].x * p[1].y, c = p[1].x * p[2].y, d = p[3].x * p[2].y, v1 = 18 * (-3 * a + 2 * b + 3 * c - d), v2 = 18 * (3 * a - b - 3 * c), v3 = 18 * (c - a);
				if (utils.approximately(v1, 0)) {
					if (!utils.approximately(v2, 0)) {
						var t = -v3 / v2;
						if (0 <= t && t <= 1) return [t];
					}
					return [];
				}
				var trm = v2 * v2 - 4 * v1 * v3, sq = Math.sqrt(trm), d = 2 * v1;
				if (utils.approximately(d, 0)) return [];
				return [(sq - v2) / d, -(v2 + sq) / d].filter(function(r) {
					return 0 <= r && r <= 1;
				});
			},
			bboxoverlap: function(b1, b2) {
				var dims = ["x", "y"], len = dims.length, i, dim, l, t, d;
				for (i = 0; i < len; i++) {
					dim = dims[i];
					l = b1[dim].mid;
					t = b2[dim].mid;
					d = (b1[dim].size + b2[dim].size) / 2;
					if (abs(l - t) >= d) return false;
				}
				return true;
			},
			expandbox: function(bbox, _bbox) {
				if (_bbox.x.min < bbox.x.min) bbox.x.min = _bbox.x.min;
				if (_bbox.y.min < bbox.y.min) bbox.y.min = _bbox.y.min;
				if (_bbox.z && _bbox.z.min < bbox.z.min) bbox.z.min = _bbox.z.min;
				if (_bbox.x.max > bbox.x.max) bbox.x.max = _bbox.x.max;
				if (_bbox.y.max > bbox.y.max) bbox.y.max = _bbox.y.max;
				if (_bbox.z && _bbox.z.max > bbox.z.max) bbox.z.max = _bbox.z.max;
				bbox.x.mid = (bbox.x.min + bbox.x.max) / 2;
				bbox.y.mid = (bbox.y.min + bbox.y.max) / 2;
				if (bbox.z) bbox.z.mid = (bbox.z.min + bbox.z.max) / 2;
				bbox.x.size = bbox.x.max - bbox.x.min;
				bbox.y.size = bbox.y.max - bbox.y.min;
				if (bbox.z) bbox.z.size = bbox.z.max - bbox.z.min;
			},
			pairiteration: function(c1, c2, curveIntersectionThreshold) {
				var c1b = c1.bbox(), c2b = c2.bbox(), r = 1e5, threshold = curveIntersectionThreshold || .5;
				if (c1b.x.size + c1b.y.size < threshold && c2b.x.size + c2b.y.size < threshold) return [(r * (c1._t1 + c1._t2) / 2 | 0) / r + "/" + (r * (c2._t1 + c2._t2) / 2 | 0) / r];
				var cc1 = c1.split(.5), cc2 = c2.split(.5), pairs = [
					{
						left: cc1.left,
						right: cc2.left
					},
					{
						left: cc1.left,
						right: cc2.right
					},
					{
						left: cc1.right,
						right: cc2.right
					},
					{
						left: cc1.right,
						right: cc2.left
					}
				];
				pairs = pairs.filter(function(pair) {
					return utils.bboxoverlap(pair.left.bbox(), pair.right.bbox());
				});
				var results = [];
				if (pairs.length === 0) return results;
				pairs.forEach(function(pair) {
					results = results.concat(utils.pairiteration(pair.left, pair.right, threshold));
				});
				results = results.filter(function(v, i) {
					return results.indexOf(v) === i;
				});
				return results;
			},
			getccenter: function(p1, p2, p3) {
				var dx1 = p2.x - p1.x, dy1 = p2.y - p1.y, dx2 = p3.x - p2.x, dy2 = p3.y - p2.y;
				var dx1p = dx1 * cos(quart) - dy1 * sin(quart), dy1p = dx1 * sin(quart) + dy1 * cos(quart), dx2p = dx2 * cos(quart) - dy2 * sin(quart), dy2p = dx2 * sin(quart) + dy2 * cos(quart);
				var mx1 = (p1.x + p2.x) / 2, my1 = (p1.y + p2.y) / 2, mx2 = (p2.x + p3.x) / 2, my2 = (p2.y + p3.y) / 2;
				var mx1n = mx1 + dx1p, my1n = my1 + dy1p, mx2n = mx2 + dx2p, my2n = my2 + dy2p;
				var arc = utils.lli8(mx1, my1, mx1n, my1n, mx2, my2, mx2n, my2n), r = utils.dist(arc, p1), s = atan2(p1.y - arc.y, p1.x - arc.x), m = atan2(p2.y - arc.y, p2.x - arc.x), e = atan2(p3.y - arc.y, p3.x - arc.x), _;
				if (s < e) {
					if (s > m || m > e) s += tau;
					if (s > e) {
						_ = e;
						e = s;
						s = _;
					}
				} else if (e < m && m < s) {
					_ = e;
					e = s;
					s = _;
				} else e += tau;
				arc.s = s;
				arc.e = e;
				arc.r = r;
				return arc;
			},
			numberSort: function(a, b) {
				return a - b;
			}
		};
		module.exports = utils;
	})();
}));
//#endregion
//#region node_modules/bezier-js/lib/poly-bezier.js
var require_poly_bezier = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		"use strict";
		var utils = require_utils();
		/**
		* Poly Bezier
		* @param {[type]} curves [description]
		*/
		var PolyBezier = function(curves) {
			this.curves = [];
			this._3d = false;
			if (!!curves) {
				this.curves = curves;
				this._3d = this.curves[0]._3d;
			}
		};
		PolyBezier.prototype = {
			valueOf: function() {
				return this.toString();
			},
			toString: function() {
				return "[" + this.curves.map(function(curve) {
					return utils.pointsToString(curve.points);
				}).join(", ") + "]";
			},
			addCurve: function(curve) {
				this.curves.push(curve);
				this._3d = this._3d || curve._3d;
			},
			length: function() {
				return this.curves.map(function(v) {
					return v.length();
				}).reduce(function(a, b) {
					return a + b;
				});
			},
			curve: function(idx) {
				return this.curves[idx];
			},
			bbox: function() {
				var c = this.curves;
				var bbox = c[0].bbox();
				for (var i = 1; i < c.length; i++) utils.expandbox(bbox, c[i].bbox());
				return bbox;
			},
			offset: function(d) {
				var offset = [];
				this.curves.forEach(function(v) {
					offset = offset.concat(v.offset(d));
				});
				return new PolyBezier(offset);
			}
		};
		module.exports = PolyBezier;
	})();
}));
//#endregion
//#region node_modules/bezier-js/lib/normalise-svg.js
var require_normalise_svg = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Normalise an SVG path to absolute coordinates
	* and full commands, rather than relative coordinates
	* and/or shortcut commands.
	*/
	function normalizePath(d) {
		d = d.replace(/,/g, " ").replace(/-/g, " - ").replace(/-\s+/g, "-").replace(/([a-zA-Z])/g, " $1 ");
		var instructions = d.replace(/([a-zA-Z])\s?/g, "|$1").split("|"), instructionLength = instructions.length, i, instruction, op, lop, args = [], alen, a, sx = 0, sy = 0, x = 0, y = 0, cx = 0, cy = 0, cx2 = 0, cy2 = 0, normalized = "";
		for (i = 1; i < instructionLength; i++) {
			instruction = instructions[i];
			op = instruction.substring(0, 1);
			lop = op.toLowerCase();
			args = instruction.replace(op, "").trim().split(" ");
			args = args.filter(function(v) {
				return v !== "";
			}).map(parseFloat);
			alen = args.length;
			if (lop === "m") {
				normalized += "M ";
				if (op === "m") {
					x += args[0];
					y += args[1];
				} else {
					x = args[0];
					y = args[1];
				}
				sx = x;
				sy = y;
				normalized += x + " " + y + " ";
				if (alen > 2) for (a = 0; a < alen; a += 2) {
					if (op === "m") {
						x += args[a];
						y += args[a + 1];
					} else {
						x = args[a];
						y = args[a + 1];
					}
					normalized += [
						"L",
						x,
						y,
						""
					].join(" ");
				}
			} else if (lop === "l") for (a = 0; a < alen; a += 2) {
				if (op === "l") {
					x += args[a];
					y += args[a + 1];
				} else {
					x = args[a];
					y = args[a + 1];
				}
				normalized += [
					"L",
					x,
					y,
					""
				].join(" ");
			}
			else if (lop === "h") for (a = 0; a < alen; a++) {
				if (op === "h") x += args[a];
				else x = args[a];
				normalized += [
					"L",
					x,
					y,
					""
				].join(" ");
			}
			else if (lop === "v") for (a = 0; a < alen; a++) {
				if (op === "v") y += args[a];
				else y = args[a];
				normalized += [
					"L",
					x,
					y,
					""
				].join(" ");
			}
			else if (lop === "q") for (a = 0; a < alen; a += 4) {
				if (op === "q") {
					cx = x + args[a];
					cy = y + args[a + 1];
					x += args[a + 2];
					y += args[a + 3];
				} else {
					cx = args[a];
					cy = args[a + 1];
					x = args[a + 2];
					y = args[a + 3];
				}
				normalized += [
					"Q",
					cx,
					cy,
					x,
					y,
					""
				].join(" ");
			}
			else if (lop === "t") for (a = 0; a < alen; a += 2) {
				cx = x + (x - cx);
				cy = y + (y - cy);
				if (op === "t") {
					x += args[a];
					y += args[a + 1];
				} else {
					x = args[a];
					y = args[a + 1];
				}
				normalized += [
					"Q",
					cx,
					cy,
					x,
					y,
					""
				].join(" ");
			}
			else if (lop === "c") for (a = 0; a < alen; a += 6) {
				if (op === "c") {
					cx = x + args[a];
					cy = y + args[a + 1];
					cx2 = x + args[a + 2];
					cy2 = y + args[a + 3];
					x += args[a + 4];
					y += args[a + 5];
				} else {
					cx = args[a];
					cy = args[a + 1];
					cx2 = args[a + 2];
					cy2 = args[a + 3];
					x = args[a + 4];
					y = args[a + 5];
				}
				normalized += [
					"C",
					cx,
					cy,
					cx2,
					cy2,
					x,
					y,
					""
				].join(" ");
			}
			else if (lop === "s") for (a = 0; a < alen; a += 4) {
				cx = x + (x - cx2);
				cy = y + (y - cy2);
				if (op === "s") {
					cx2 = x + args[a];
					cy2 = y + args[a + 1];
					x += args[a + 2];
					y += args[a + 3];
				} else {
					cx2 = args[a];
					cy2 = args[a + 1];
					x = args[a + 2];
					y = args[a + 3];
				}
				normalized += [
					"C",
					cx,
					cy,
					cx2,
					cy2,
					x,
					y,
					""
				].join(" ");
			}
			else if (lop === "z") {
				normalized += "Z ";
				x = sx;
				y = sy;
			}
		}
		return normalized.trim();
	}
	module.exports = normalizePath;
}));
//#endregion
//#region node_modules/bezier-js/lib/svg-to-beziers.js
var require_svg_to_beziers = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var normalise = require_normalise_svg();
	var M = {
		x: false,
		y: false
	};
	function makeBezier(Bezier, term, values) {
		if (term === "Z") return;
		if (term === "M") {
			M = {
				x: values[0],
				y: values[1]
			};
			return;
		}
		var cvalues = [
			false,
			M.x,
			M.y
		].concat(values);
		var curve = new (Bezier.bind.apply(Bezier, cvalues))();
		var last = values.slice(-2);
		M = {
			x: last[0],
			y: last[1]
		};
		return curve;
	}
	function convertPath(Bezier, d) {
		var terms = normalise(d).split(" "), term, matcher = /* @__PURE__ */ new RegExp("[MLCQZ]", ""), segment, values, segments = [], ARGS = {
			"C": 6,
			"Q": 4,
			"L": 2,
			"M": 2
		};
		while (terms.length) {
			term = terms.splice(0, 1)[0];
			if (matcher.test(term)) {
				values = terms.splice(0, ARGS[term]).map(parseFloat);
				segment = makeBezier(Bezier, term, values);
				if (segment) segments.push(segment);
			}
		}
		return new Bezier.PolyBezier(segments);
	}
	module.exports = convertPath;
}));
//#endregion
//#region node_modules/bezier-js/lib/bezier.js
var require_bezier = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	A javascript Bezier curve library by Pomax.
	
	Based on http://pomax.github.io/bezierinfo
	
	This code is MIT licensed.
	**/
	(function() {
		"use strict";
		var abs = Math.abs, min = Math.min, max = Math.max, cos = Math.cos, sin = Math.sin, acos = Math.acos, sqrt = Math.sqrt, pi = Math.PI, ZERO = {
			x: 0,
			y: 0,
			z: 0
		};
		var utils = require_utils();
		var PolyBezier = require_poly_bezier();
		/**
		* Bezier curve constructor. The constructor argument can be one of three things:
		*
		* 1. array/4 of {x:..., y:..., z:...}, z optional
		* 2. numerical array/8 ordered x1,y1,x2,y2,x3,y3,x4,y4
		* 3. numerical array/12 ordered x1,y1,z1,x2,y2,z2,x3,y3,z3,x4,y4,z4
		*
		*/
		var Bezier = function(coords) {
			var args = coords && coords.forEach ? coords : [].slice.call(arguments);
			var coordlen = false;
			if (typeof args[0] === "object") {
				coordlen = args.length;
				var newargs = [];
				args.forEach(function(point) {
					[
						"x",
						"y",
						"z"
					].forEach(function(d) {
						if (typeof point[d] !== "undefined") newargs.push(point[d]);
					});
				});
				args = newargs;
			}
			var higher = false;
			var len = args.length;
			if (coordlen) {
				if (coordlen > 4) {
					if (arguments.length !== 1) throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");
					higher = true;
				}
			} else if (len !== 6 && len !== 8 && len !== 9 && len !== 12) {
				if (arguments.length !== 1) throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");
			}
			var _3d = !higher && (len === 9 || len === 12) || coords && coords[0] && typeof coords[0].z !== "undefined";
			this._3d = _3d;
			var points = [];
			for (var idx = 0, step = _3d ? 3 : 2; idx < len; idx += step) {
				var point = {
					x: args[idx],
					y: args[idx + 1]
				};
				if (_3d) point.z = args[idx + 2];
				points.push(point);
			}
			this.order = points.length - 1;
			this.points = points;
			var dims = ["x", "y"];
			if (_3d) dims.push("z");
			this.dims = dims;
			this.dimlen = dims.length;
			(function(curve) {
				var order = curve.order;
				var points = curve.points;
				var a = utils.align(points, {
					p1: points[0],
					p2: points[order]
				});
				for (var i = 0; i < a.length; i++) if (abs(a[i].y) > 1e-4) {
					curve._linear = false;
					return;
				}
				curve._linear = true;
			})(this);
			this._t1 = 0;
			this._t2 = 1;
			this.update();
		};
		var svgToBeziers = require_svg_to_beziers();
		/**
		* turn an svg <path> d attribute into a sequence of Bezier segments.
		*/
		Bezier.SVGtoBeziers = function(d) {
			return svgToBeziers(Bezier, d);
		};
		function getABC(n, S, B, E, t) {
			if (typeof t === "undefined") t = .5;
			var u = utils.projectionratio(t, n), um = 1 - u, C = {
				x: u * S.x + um * E.x,
				y: u * S.y + um * E.y
			}, s = utils.abcratio(t, n);
			return {
				A: {
					x: B.x + (B.x - C.x) / s,
					y: B.y + (B.y - C.y) / s
				},
				B,
				C
			};
		}
		Bezier.quadraticFromPoints = function(p1, p2, p3, t) {
			if (typeof t === "undefined") t = .5;
			if (t === 0) return new Bezier(p2, p2, p3);
			if (t === 1) return new Bezier(p1, p2, p2);
			return new Bezier(p1, getABC(2, p1, p2, p3, t).A, p3);
		};
		Bezier.cubicFromPoints = function(S, B, E, t, d1) {
			if (typeof t === "undefined") t = .5;
			var abc = getABC(3, S, B, E, t);
			if (typeof d1 === "undefined") d1 = utils.dist(B, abc.C);
			var d2 = d1 * (1 - t) / t;
			var selen = utils.dist(S, E), lx = (E.x - S.x) / selen, ly = (E.y - S.y) / selen, bx1 = d1 * lx, by1 = d1 * ly, bx2 = d2 * lx, by2 = d2 * ly;
			var e1 = {
				x: B.x - bx1,
				y: B.y - by1
			}, e2 = {
				x: B.x + bx2,
				y: B.y + by2
			}, A = abc.A, v1 = {
				x: A.x + (e1.x - A.x) / (1 - t),
				y: A.y + (e1.y - A.y) / (1 - t)
			}, v2 = {
				x: A.x + (e2.x - A.x) / t,
				y: A.y + (e2.y - A.y) / t
			};
			return new Bezier(S, {
				x: S.x + (v1.x - S.x) / t,
				y: S.y + (v1.y - S.y) / t
			}, {
				x: E.x + (v2.x - E.x) / (1 - t),
				y: E.y + (v2.y - E.y) / (1 - t)
			}, E);
		};
		var getUtils = function() {
			return utils;
		};
		Bezier.getUtils = getUtils;
		Bezier.PolyBezier = PolyBezier;
		Bezier.prototype = {
			getUtils,
			valueOf: function() {
				return this.toString();
			},
			toString: function() {
				return utils.pointsToString(this.points);
			},
			toSVG: function(relative) {
				if (this._3d) return false;
				var p = this.points, s = [
					"M",
					p[0].x,
					p[0].y,
					this.order === 2 ? "Q" : "C"
				];
				for (var i = 1, last = p.length; i < last; i++) {
					s.push(p[i].x);
					s.push(p[i].y);
				}
				return s.join(" ");
			},
			setRatios: function(ratios) {
				if (ratios.length !== this.points.length) throw new Error("incorrect number of ratio values");
				this.ratios = ratios;
				this._lut = [];
			},
			verify: function() {
				var print = this.coordDigest();
				if (print !== this._print) {
					this._print = print;
					this.update();
				}
			},
			coordDigest: function() {
				return this.points.map(function(c, pos) {
					return "" + pos + c.x + c.y + (c.z ? c.z : 0);
				}).join("");
			},
			update: function(newprint) {
				this._lut = [];
				this.dpoints = utils.derive(this.points, this._3d);
				this.computedirection();
			},
			computedirection: function() {
				var points = this.points;
				var angle = utils.angle(points[0], points[this.order], points[1]);
				this.clockwise = angle > 0;
			},
			length: function() {
				return utils.length(this.derivative.bind(this));
			},
			_lut: [],
			getLUT: function(steps) {
				this.verify();
				steps = steps || 100;
				if (this._lut.length === steps) return this._lut;
				this._lut = [];
				steps--;
				for (var t = 0; t <= steps; t++) this._lut.push(this.compute(t / steps));
				return this._lut;
			},
			on: function(point, error) {
				error = error || 5;
				var lut = this.getLUT(), hits = [], c, t = 0;
				for (var i = 0; i < lut.length; i++) {
					c = lut[i];
					if (utils.dist(c, point) < error) {
						hits.push(c);
						t += i / lut.length;
					}
				}
				if (!hits.length) return false;
				return t /= hits.length;
			},
			project: function(point) {
				var LUT = this.getLUT(), l = LUT.length - 1, closest = utils.closest(LUT, point), mdist = closest.mdist, mpos = closest.mpos;
				var ft, t, p, d, t1 = (mpos - 1) / l, t2 = (mpos + 1) / l, step = .1 / l;
				mdist += 1;
				for (t = t1, ft = t; t < t2 + step; t += step) {
					p = this.compute(t);
					d = utils.dist(point, p);
					if (d < mdist) {
						mdist = d;
						ft = t;
					}
				}
				p = this.compute(ft);
				p.t = ft;
				p.d = mdist;
				return p;
			},
			get: function(t) {
				return this.compute(t);
			},
			point: function(idx) {
				return this.points[idx];
			},
			compute: function(t) {
				if (this.ratios) return utils.computeWithRatios(t, this.points, this.ratios, this._3d);
				return utils.compute(t, this.points, this._3d, this.ratios);
			},
			raise: function() {
				var p = this.points, np = [p[0]], i, k = p.length, pi, pim;
				for (var i = 1; i < k; i++) {
					pi = p[i];
					pim = p[i - 1];
					np[i] = {
						x: (k - i) / k * pi.x + i / k * pim.x,
						y: (k - i) / k * pi.y + i / k * pim.y
					};
				}
				np[k] = p[k - 1];
				return new Bezier(np);
			},
			derivative: function(t) {
				var mt = 1 - t, a, b, c = 0, p = this.dpoints[0];
				if (this.order === 2) {
					p = [
						p[0],
						p[1],
						ZERO
					];
					a = mt;
					b = t;
				}
				if (this.order === 3) {
					a = mt * mt;
					b = mt * t * 2;
					c = t * t;
				}
				var ret = {
					x: a * p[0].x + b * p[1].x + c * p[2].x,
					y: a * p[0].y + b * p[1].y + c * p[2].y
				};
				if (this._3d) ret.z = a * p[0].z + b * p[1].z + c * p[2].z;
				return ret;
			},
			curvature: function(t) {
				return utils.curvature(t, this.points, this._3d);
			},
			inflections: function() {
				return utils.inflections(this.points);
			},
			normal: function(t) {
				return this._3d ? this.__normal3(t) : this.__normal2(t);
			},
			__normal2: function(t) {
				var d = this.derivative(t);
				var q = sqrt(d.x * d.x + d.y * d.y);
				return {
					x: -d.y / q,
					y: d.x / q
				};
			},
			__normal3: function(t) {
				var r1 = this.derivative(t), r2 = this.derivative(t + .01), q1 = sqrt(r1.x * r1.x + r1.y * r1.y + r1.z * r1.z), q2 = sqrt(r2.x * r2.x + r2.y * r2.y + r2.z * r2.z);
				r1.x /= q1;
				r1.y /= q1;
				r1.z /= q1;
				r2.x /= q2;
				r2.y /= q2;
				r2.z /= q2;
				var c = {
					x: r2.y * r1.z - r2.z * r1.y,
					y: r2.z * r1.x - r2.x * r1.z,
					z: r2.x * r1.y - r2.y * r1.x
				};
				var m = sqrt(c.x * c.x + c.y * c.y + c.z * c.z);
				c.x /= m;
				c.y /= m;
				c.z /= m;
				var R = [
					c.x * c.x,
					c.x * c.y - c.z,
					c.x * c.z + c.y,
					c.x * c.y + c.z,
					c.y * c.y,
					c.y * c.z - c.x,
					c.x * c.z - c.y,
					c.y * c.z + c.x,
					c.z * c.z
				];
				return {
					x: R[0] * r1.x + R[1] * r1.y + R[2] * r1.z,
					y: R[3] * r1.x + R[4] * r1.y + R[5] * r1.z,
					z: R[6] * r1.x + R[7] * r1.y + R[8] * r1.z
				};
			},
			hull: function(t) {
				var p = this.points, _p = [], pt, q = [], idx = 0, i = 0, l = 0;
				q[idx++] = p[0];
				q[idx++] = p[1];
				q[idx++] = p[2];
				if (this.order === 3) q[idx++] = p[3];
				while (p.length > 1) {
					_p = [];
					for (i = 0, l = p.length - 1; i < l; i++) {
						pt = utils.lerp(t, p[i], p[i + 1]);
						q[idx++] = pt;
						_p.push(pt);
					}
					p = _p;
				}
				return q;
			},
			split: function(t1, t2) {
				if (t1 === 0 && !!t2) return this.split(t2).left;
				if (t2 === 1) return this.split(t1).right;
				var q = this.hull(t1);
				var result = {
					left: this.order === 2 ? new Bezier([
						q[0],
						q[3],
						q[5]
					]) : new Bezier([
						q[0],
						q[4],
						q[7],
						q[9]
					]),
					right: this.order === 2 ? new Bezier([
						q[5],
						q[4],
						q[2]
					]) : new Bezier([
						q[9],
						q[8],
						q[6],
						q[3]
					]),
					span: q
				};
				result.left._t1 = utils.map(0, 0, 1, this._t1, this._t2);
				result.left._t2 = utils.map(t1, 0, 1, this._t1, this._t2);
				result.right._t1 = utils.map(t1, 0, 1, this._t1, this._t2);
				result.right._t2 = utils.map(1, 0, 1, this._t1, this._t2);
				if (!t2) return result;
				t2 = utils.map(t2, t1, 1, 0, 1);
				return result.right.split(t2).left;
			},
			extrema: function() {
				var dims = this.dims, result = {}, roots = [], p, mfn;
				dims.forEach(function(dim) {
					mfn = function(v) {
						return v[dim];
					};
					p = this.dpoints[0].map(mfn);
					result[dim] = utils.droots(p);
					if (this.order === 3) {
						p = this.dpoints[1].map(mfn);
						result[dim] = result[dim].concat(utils.droots(p));
					}
					result[dim] = result[dim].filter(function(t) {
						return t >= 0 && t <= 1;
					});
					roots = roots.concat(result[dim].sort(utils.numberSort));
				}.bind(this));
				roots = roots.sort(utils.numberSort).filter(function(v, idx) {
					return roots.indexOf(v) === idx;
				});
				result.values = roots;
				return result;
			},
			bbox: function() {
				var extrema = this.extrema(), result = {};
				this.dims.forEach(function(d) {
					result[d] = utils.getminmax(this, d, extrema[d]);
				}.bind(this));
				return result;
			},
			overlaps: function(curve) {
				var lbbox = this.bbox(), tbbox = curve.bbox();
				return utils.bboxoverlap(lbbox, tbbox);
			},
			offset: function(t, d) {
				if (typeof d !== "undefined") {
					var c = this.get(t);
					var n = this.normal(t);
					var ret = {
						c,
						n,
						x: c.x + n.x * d,
						y: c.y + n.y * d
					};
					if (this._3d) ret.z = c.z + n.z * d;
					return ret;
				}
				if (this._linear) {
					var nv = this.normal(0);
					return [new Bezier(this.points.map(function(p) {
						var ret = {
							x: p.x + t * nv.x,
							y: p.y + t * nv.y
						};
						if (p.z && n.z) ret.z = p.z + t * nv.z;
						return ret;
					}))];
				}
				return this.reduce().map(function(s) {
					if (s._linear) return s.offset(t)[0];
					return s.scale(t);
				});
			},
			simple: function() {
				if (this.order === 3) {
					var a1 = utils.angle(this.points[0], this.points[3], this.points[1]);
					var a2 = utils.angle(this.points[0], this.points[3], this.points[2]);
					if (a1 > 0 && a2 < 0 || a1 < 0 && a2 > 0) return false;
				}
				var n1 = this.normal(0);
				var n2 = this.normal(1);
				var s = n1.x * n2.x + n1.y * n2.y;
				if (this._3d) s += n1.z * n2.z;
				return abs(acos(s)) < pi / 3;
			},
			reduce: function() {
				var i, t1 = 0, t2 = 0, step = .01, segment, pass1 = [], pass2 = [];
				var extrema = this.extrema().values;
				if (extrema.indexOf(0) === -1) extrema = [0].concat(extrema);
				if (extrema.indexOf(1) === -1) extrema.push(1);
				for (t1 = extrema[0], i = 1; i < extrema.length; i++) {
					t2 = extrema[i];
					segment = this.split(t1, t2);
					segment._t1 = t1;
					segment._t2 = t2;
					pass1.push(segment);
					t1 = t2;
				}
				pass1.forEach(function(p1) {
					t1 = 0;
					t2 = 0;
					while (t2 <= 1) for (t2 = t1 + step; t2 <= 1.01; t2 += step) {
						segment = p1.split(t1, t2);
						if (!segment.simple()) {
							t2 -= step;
							if (abs(t1 - t2) < step) return [];
							segment = p1.split(t1, t2);
							segment._t1 = utils.map(t1, 0, 1, p1._t1, p1._t2);
							segment._t2 = utils.map(t2, 0, 1, p1._t1, p1._t2);
							pass2.push(segment);
							t1 = t2;
							break;
						}
					}
					if (t1 < 1) {
						segment = p1.split(t1, 1);
						segment._t1 = utils.map(t1, 0, 1, p1._t1, p1._t2);
						segment._t2 = p1._t2;
						pass2.push(segment);
					}
				});
				return pass2;
			},
			scale: function(d) {
				var order = this.order;
				var distanceFn = false;
				if (typeof d === "function") distanceFn = d;
				if (distanceFn && order === 2) return this.raise().scale(distanceFn);
				var clockwise = this.clockwise;
				var r1 = distanceFn ? distanceFn(0) : d;
				var r2 = distanceFn ? distanceFn(1) : d;
				var v = [this.offset(0, 10), this.offset(1, 10)];
				var o = utils.lli4(v[0], v[0].c, v[1], v[1].c);
				if (!o) throw new Error("cannot scale this curve. Try reducing it first.");
				var points = this.points, np = [];
				[0, 1].forEach(function(t) {
					var p = np[t * order] = utils.copy(points[t * order]);
					p.x += (t ? r2 : r1) * v[t].n.x;
					p.y += (t ? r2 : r1) * v[t].n.y;
				}.bind(this));
				if (!distanceFn) {
					[0, 1].forEach(function(t) {
						if (this.order === 2 && !!t) return;
						var p = np[t * order];
						var d = this.derivative(t);
						var p2 = {
							x: p.x + d.x,
							y: p.y + d.y
						};
						np[t + 1] = utils.lli4(p, p2, o, points[t + 1]);
					}.bind(this));
					return new Bezier(np);
				}
				[0, 1].forEach(function(t) {
					if (this.order === 2 && !!t) return;
					var p = points[t + 1];
					var ov = {
						x: p.x - o.x,
						y: p.y - o.y
					};
					var rc = distanceFn ? distanceFn((t + 1) / order) : d;
					if (distanceFn && !clockwise) rc = -rc;
					var m = sqrt(ov.x * ov.x + ov.y * ov.y);
					ov.x /= m;
					ov.y /= m;
					np[t + 1] = {
						x: p.x + rc * ov.x,
						y: p.y + rc * ov.y
					};
				}.bind(this));
				return new Bezier(np);
			},
			outline: function(d1, d2, d3, d4) {
				d2 = typeof d2 === "undefined" ? d1 : d2;
				var reduced = this.reduce(), len = reduced.length, fcurves = [], bcurves = [], p, alen = 0, tlen = this.length();
				var graduated = typeof d3 !== "undefined" && typeof d4 !== "undefined";
				function linearDistanceFunction(s, e, tlen, alen, slen) {
					return function(v) {
						var f1 = alen / tlen, f2 = (alen + slen) / tlen, d = e - s;
						return utils.map(v, 0, 1, s + f1 * d, s + f2 * d);
					};
				}
				reduced.forEach(function(segment) {
					slen = segment.length();
					if (graduated) {
						fcurves.push(segment.scale(linearDistanceFunction(d1, d3, tlen, alen, slen)));
						bcurves.push(segment.scale(linearDistanceFunction(-d2, -d4, tlen, alen, slen)));
					} else {
						fcurves.push(segment.scale(d1));
						bcurves.push(segment.scale(-d2));
					}
					alen += slen;
				});
				bcurves = bcurves.map(function(s) {
					p = s.points;
					if (p[3]) s.points = [
						p[3],
						p[2],
						p[1],
						p[0]
					];
					else s.points = [
						p[2],
						p[1],
						p[0]
					];
					return s;
				}).reverse();
				var fs = fcurves[0].points[0], fe = fcurves[len - 1].points[fcurves[len - 1].points.length - 1], bs = bcurves[len - 1].points[bcurves[len - 1].points.length - 1], be = bcurves[0].points[0], ls = utils.makeline(bs, fs), le = utils.makeline(fe, be), segments = [ls].concat(fcurves).concat([le]).concat(bcurves), slen = segments.length;
				return new PolyBezier(segments);
			},
			outlineshapes: function(d1, d2, curveIntersectionThreshold) {
				d2 = d2 || d1;
				var outline = this.outline(d1, d2).curves;
				var shapes = [];
				for (var i = 1, len = outline.length; i < len / 2; i++) {
					var shape = utils.makeshape(outline[i], outline[len - i], curveIntersectionThreshold);
					shape.startcap.virtual = i > 1;
					shape.endcap.virtual = i < len / 2 - 1;
					shapes.push(shape);
				}
				return shapes;
			},
			intersects: function(curve, curveIntersectionThreshold) {
				if (!curve) return this.selfintersects(curveIntersectionThreshold);
				if (curve.p1 && curve.p2) return this.lineIntersects(curve);
				if (curve instanceof Bezier) curve = curve.reduce();
				return this.curveintersects(this.reduce(), curve, curveIntersectionThreshold);
			},
			lineIntersects: function(line) {
				var mx = min(line.p1.x, line.p2.x), my = min(line.p1.y, line.p2.y), MX = max(line.p1.x, line.p2.x), MY = max(line.p1.y, line.p2.y), self = this;
				return utils.roots(this.points, line).filter(function(t) {
					var p = self.get(t);
					return utils.between(p.x, mx, MX) && utils.between(p.y, my, MY);
				});
			},
			selfintersects: function(curveIntersectionThreshold) {
				var reduced = this.reduce();
				var i, len = reduced.length - 2, results = [], result, left, right;
				for (i = 0; i < len; i++) {
					left = reduced.slice(i, i + 1);
					right = reduced.slice(i + 2);
					result = this.curveintersects(left, right, curveIntersectionThreshold);
					results = results.concat(result);
				}
				return results;
			},
			curveintersects: function(c1, c2, curveIntersectionThreshold) {
				var pairs = [];
				c1.forEach(function(l) {
					c2.forEach(function(r) {
						if (l.overlaps(r)) pairs.push({
							left: l,
							right: r
						});
					});
				});
				var intersections = [];
				pairs.forEach(function(pair) {
					var result = utils.pairiteration(pair.left, pair.right, curveIntersectionThreshold);
					if (result.length > 0) intersections = intersections.concat(result);
				});
				return intersections;
			},
			arcs: function(errorThreshold) {
				errorThreshold = errorThreshold || .5;
				return this._iterate(errorThreshold, []);
			},
			_error: function(pc, np1, s, e) {
				var q = (e - s) / 4, c1 = this.get(s + q), c2 = this.get(e - q), ref = utils.dist(pc, np1), d1 = utils.dist(pc, c1), d2 = utils.dist(pc, c2);
				return abs(d1 - ref) + abs(d2 - ref);
			},
			_iterate: function(errorThreshold, circles) {
				var t_s = 0, t_e = 1, safety;
				do {
					safety = 0;
					t_e = 1;
					var np1 = this.get(t_s), np2, np3, arc, prev_arc;
					var curr_good = false, prev_good = false, done;
					var t_m = t_e, prev_e = 1, step = 0;
					do {
						prev_good = curr_good;
						prev_arc = arc;
						t_m = (t_s + t_e) / 2;
						step++;
						np2 = this.get(t_m);
						np3 = this.get(t_e);
						arc = utils.getccenter(np1, np2, np3);
						arc.interval = {
							start: t_s,
							end: t_e
						};
						curr_good = this._error(arc, np1, t_s, t_e) <= errorThreshold;
						done = prev_good && !curr_good;
						if (!done) prev_e = t_e;
						if (curr_good) {
							if (t_e >= 1) {
								arc.interval.end = prev_e = 1;
								prev_arc = arc;
								if (t_e > 1) {
									var d = {
										x: arc.x + arc.r * cos(arc.e),
										y: arc.y + arc.r * sin(arc.e)
									};
									arc.e += utils.angle({
										x: arc.x,
										y: arc.y
									}, d, this.get(1));
								}
								break;
							}
							t_e = t_e + (t_e - t_s) / 2;
						} else t_e = t_m;
					} while (!done && safety++ < 100);
					if (safety >= 100) break;
					prev_arc = prev_arc ? prev_arc : arc;
					circles.push(prev_arc);
					t_s = prev_e;
				} while (t_e < 1);
				return circles;
			}
		};
		module.exports = Bezier;
	})();
}));
//#endregion
//#region node_modules/bezier-js/index.js
var require_bezier_js = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_bezier();
}));
//#endregion
//#region node_modules/makerjs/dist/index.js
var require_dist = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Root module for Maker.js.
	*
	* Example: get a reference to Maker.js
	* ```
	* var makerjs = require('makerjs');
	* ```
	*
	*/
	var MakerJs;
	(function(MakerJs) {
		/**
		* Version info
		*/
		MakerJs.version = "debug";
		/**
		* Enumeration of environment types.
		*/
		MakerJs.environmentTypes = {
			BrowserUI: "browser",
			NodeJs: "node",
			WebWorker: "worker",
			Unknown: "unknown"
		};
		/**
		* @private
		*/
		var EPSILON = Number.EPSILON || Math.pow(2, -52);
		/**
		* @private
		*/
		function detectEnvironment() {
			var getGlobal = function() {
				if (typeof self !== "undefined") return self;
				if (typeof global !== "undefined") return global;
				return this || {};
			};
			var globalObj = getGlobal();
			if (globalObj["self"] && globalObj["WorkerGlobalScope"] && !globalObj["window"]) return MakerJs.environmentTypes.WebWorker;
			if (globalObj["window"] && globalObj["document"]) return MakerJs.environmentTypes.BrowserUI;
			if (globalObj["global"] && globalObj["process"]) return MakerJs.environmentTypes.NodeJs;
			return MakerJs.environmentTypes.Unknown;
		}
		/**
		* Current execution environment type, should be one of environmentTypes.
		*/
		MakerJs.environment = detectEnvironment();
		/**
		* String-based enumeration of unit types: imperial, metric or otherwise.
		* A model may specify the unit system it is using, if any. When importing a model, it may have different units.
		* Unit conversion function is makerjs.units.conversionScale().
		* Important: If you add to this, you must also add a corresponding conversion ratio in the unit.ts file!
		*/
		MakerJs.unitType = {
			Centimeter: "cm",
			Foot: "foot",
			Inch: "inch",
			Meter: "m",
			Millimeter: "mm"
		};
		/**
		* @private
		*/
		function split(s, char) {
			var p = s.indexOf(char);
			if (p < 0) return [s];
			else if (p > 0) return [s.substr(0, p), s.substr(p + 1)];
			else return ["", s];
		}
		/**
		* Split a decimal into its whole and fractional parts as strings.
		*
		* Example: get whole and fractional parts of 42.056
		* ```
		* makerjs.splitDecimal(42.056); //returns ["42", "056"]
		* ```
		*
		* @param n The number to split.
		* @returns Array of 2 strings when n contains a decimal point, or an array of one string when n is an integer.
		*/
		function splitDecimal(n) {
			var s = n.toString();
			if (s.indexOf("e") > 0) s = n.toFixed(20).match(/.*[^(0+$)]/)[0];
			return split(s, ".");
		}
		MakerJs.splitDecimal = splitDecimal;
		/**
		* Numeric rounding
		*
		* Example: round to 3 decimal places
		* ```
		* makerjs.round(3.14159, .001); //returns 3.142
		* ```
		*
		* @param n The number to round off.
		* @param accuracy Optional exemplar of number of decimal places.
		* @returns Rounded number.
		*/
		function round(n, accuracy) {
			if (accuracy === void 0) accuracy = 1e-7;
			if (n % 1 === 0) return n;
			var temp = 1 / accuracy;
			return Math.round((n + EPSILON) * temp) / temp;
		}
		MakerJs.round = round;
		/**
		* Create a string representation of a route array.
		*
		* @param route Array of strings which are segments of a route.
		* @returns String of the flattened array.
		*/
		function createRouteKey(route) {
			var converted = [];
			for (var i = 0; i < route.length; i++) {
				var element = route[i];
				var newElement;
				if (i % 2 === 0) newElement = (i > 0 ? "." : "") + element;
				else newElement = JSON.stringify([element]);
				converted.push(newElement);
			}
			return converted.join("");
		}
		MakerJs.createRouteKey = createRouteKey;
		/**
		* Travel along a route inside of a model to extract a specific node in its tree.
		*
		* @param modelContext Model to travel within.
		* @param route String of a flattened route, or a string array of route segments.
		* @returns Model or Path object within the modelContext tree.
		*/
		function travel(modelContext, route) {
			if (!modelContext || !route) return null;
			var routeArray;
			if (Array.isArray(route)) routeArray = route;
			else routeArray = JSON.parse(route);
			var props = routeArray.slice();
			var ref = modelContext;
			var origin = modelContext.origin || [0, 0];
			while (props.length) {
				var prop = props.shift();
				ref = ref[prop];
				if (!ref) return null;
				if (ref.origin && props.length) origin = MakerJs.point.add(origin, ref.origin);
			}
			return {
				result: ref,
				offset: origin
			};
		}
		MakerJs.travel = travel;
		/**
		* @private
		*/
		var clone = require_clone();
		/**
		* Clone an object.
		*
		* @param objectToClone The object to clone.
		* @returns A new clone of the original object.
		*/
		function cloneObject(objectToClone) {
			return clone(objectToClone);
		}
		MakerJs.cloneObject = cloneObject;
		/**
		* Copy the properties from one object to another object.
		*
		* Example:
		* ```
		* makerjs.extendObject({ abc: 123 }, { xyz: 789 }); //returns { abc: 123, xyz: 789 }
		* ```
		*
		* @param target The object to extend. It will receive the new properties.
		* @param other An object containing properties to merge in.
		* @returns The original object after merging.
		*/
		function extendObject(target, other) {
			if (target && other) {
				for (var key in other) if (other.hasOwnProperty(key) && typeof other[key] !== "undefined") {
					if (key === "__proto__" || key === "constructor" || key === "prototype") continue;
					target[key] = other[key];
				}
			}
			return target;
		}
		MakerJs.extendObject = extendObject;
		/**
		* Test to see if a variable is a function.
		*
		* @param value The object to test.
		* @returns True if the object is a function type.
		*/
		function isFunction(value) {
			return typeof value === "function";
		}
		MakerJs.isFunction = isFunction;
		/**
		* Test to see if a variable is a number.
		*
		* @param value The object to test.
		* @returns True if the object is a number type.
		*/
		function isNumber(value) {
			return typeof value === "number";
		}
		MakerJs.isNumber = isNumber;
		/**
		* Test to see if a variable is an object.
		*
		* @param value The object to test.
		* @returns True if the object is an object type.
		*/
		function isObject(value) {
			return typeof value === "object";
		}
		MakerJs.isObject = isObject;
		/**
		* Test to see if an object implements the required properties of a point.
		*
		* @param item The item to test.
		*/
		function isPoint(item) {
			return item && Array.isArray(item) && item.length == 2 && isNumber(item[0]) && isNumber(item[1]);
		}
		MakerJs.isPoint = isPoint;
		/**
		* Test to see if an object implements the required properties of a path.
		*
		* @param item The item to test.
		*/
		function isPath(item) {
			return item && item.type && isPoint(item.origin);
		}
		MakerJs.isPath = isPath;
		/**
		* Test to see if an object implements the required properties of a line.
		*
		* @param item The item to test.
		*/
		function isPathLine(item) {
			return isPath(item) && item.type == MakerJs.pathType.Line && isPoint(item.end);
		}
		MakerJs.isPathLine = isPathLine;
		/**
		* Test to see if an object implements the required properties of a circle.
		*
		* @param item The item to test.
		*/
		function isPathCircle(item) {
			return isPath(item) && item.type == MakerJs.pathType.Circle && isNumber(item.radius);
		}
		MakerJs.isPathCircle = isPathCircle;
		/**
		* Test to see if an object implements the required properties of an arc.
		*
		* @param item The item to test.
		*/
		function isPathArc(item) {
			return isPath(item) && item.type == MakerJs.pathType.Arc && isNumber(item.radius) && isNumber(item.startAngle) && isNumber(item.endAngle);
		}
		MakerJs.isPathArc = isPathArc;
		/**
		* Test to see if an object implements the required properties of an arc in a bezier curve.
		*
		* @param item The item to test.
		*/
		function isPathArcInBezierCurve(item) {
			return isPathArc(item) && isObject(item.bezierData) && isNumber(item.bezierData.startT) && isNumber(item.bezierData.endT);
		}
		MakerJs.isPathArcInBezierCurve = isPathArcInBezierCurve;
		/**
		* String-based enumeration of all paths types.
		*
		* Examples: use pathType instead of string literal when creating a circle.
		* ```
		* var circle: IPathCircle = { type: pathType.Circle, origin: [0, 0], radius: 7 };   //typescript
		* var circle = { type: pathType.Circle, origin: [0, 0], radius: 7 };   //javascript
		* ```
		*/
		MakerJs.pathType = {
			Line: "line",
			Circle: "circle",
			Arc: "arc",
			BezierSeed: "bezier-seed"
		};
		/**
		* Test to see if an object implements the required properties of a model.
		*/
		function isModel(item) {
			return item && (item.paths || item.models);
		}
		MakerJs.isModel = isModel;
		/**
		* Test to see if an object implements the required properties of a chain.
		*
		* @param item The item to test.
		*/
		function isChain(item) {
			var x = item;
			return x && x.links && Array.isArray(x.links) && isNumber(x.pathLength);
		}
		MakerJs.isChain = isChain;
		/**
		* @private
		*/
		var Cascade = function() {
			function Cascade(_module, $initial) {
				this._module = _module;
				this.$initial = $initial;
				for (var methodName in this._module) this._shadow(methodName);
				this.$result = $initial;
			}
			Cascade.prototype._shadow = function(methodName) {
				var _this = this;
				this[methodName] = function() {
					return _this._apply(_this._module[methodName], arguments);
				};
			};
			Cascade.prototype._apply = function(fn, carriedArguments) {
				var args = [].slice.call(carriedArguments);
				args.unshift(this.$result);
				this.$result = fn.apply(void 0, args);
				return this;
			};
			Cascade.prototype.$reset = function() {
				this.$result = this.$initial;
				return this;
			};
			return Cascade;
		}();
		function $(context) {
			if (isModel(context)) return new Cascade(MakerJs.model, context);
			else if (isPath(context)) return new Cascade(MakerJs.path, context);
			else if (isPoint(context)) return new Cascade(MakerJs.point, context);
		}
		MakerJs.$ = $;
	})(MakerJs || (MakerJs = {}));
	module.exports = MakerJs;
	var MakerJs;
	(function(MakerJs) {
		(function(angle) {
			/**
			* @private
			*/
			function getFractionalPart(n) {
				return MakerJs.splitDecimal(n)[1];
			}
			/**
			* @private
			*/
			function setFractionalPart(n, fractionalPart) {
				if (fractionalPart) return +(MakerJs.splitDecimal(n)[0] + "." + fractionalPart);
				else return n;
			}
			/**
			* @private
			*/
			function copyFractionalPart(src, dest) {
				if (src < 0 && dest < 0 || src > 0 && dest > 0) return setFractionalPart(dest, getFractionalPart(src));
				return dest;
			}
			/**
			* Ensures an angle is not greater than 360
			*
			* @param angleInDegrees Angle in degrees.
			* @returns Same polar angle but not greater than 360 degrees.
			*/
			function noRevolutions(angleInDegrees) {
				var revolutions = Math.floor(angleInDegrees / 360);
				if (revolutions === 0) return angleInDegrees;
				return copyFractionalPart(angleInDegrees, angleInDegrees - 360 * revolutions);
			}
			angle.noRevolutions = noRevolutions;
			/**
			* Convert an angle from degrees to radians.
			*
			* @param angleInDegrees Angle in degrees.
			* @returns Angle in radians.
			*/
			function toRadians(angleInDegrees) {
				return noRevolutions(angleInDegrees) * Math.PI / 180;
			}
			angle.toRadians = toRadians;
			/**
			* Convert an angle from radians to degrees.
			*
			* @param angleInRadians Angle in radians.
			* @returns Angle in degrees.
			*/
			function toDegrees(angleInRadians) {
				return angleInRadians * 180 / Math.PI;
			}
			angle.toDegrees = toDegrees;
			/**
			* Get an arc's end angle, ensured to be greater than its start angle.
			*
			* @param arc An arc path object.
			* @returns End angle of arc.
			*/
			function ofArcEnd(arc) {
				if (arc.endAngle < arc.startAngle) {
					var a = Math.ceil((arc.startAngle - arc.endAngle) / 360) * 360 + arc.endAngle;
					return copyFractionalPart(arc.endAngle, a);
				}
				return arc.endAngle;
			}
			angle.ofArcEnd = ofArcEnd;
			/**
			* Get the angle in the middle of an arc's start and end angles.
			*
			* @param arc An arc path object.
			* @param ratio Optional number between 0 and 1 specifying percentage between start and end angles. Default is .5
			* @returns Middle angle of arc.
			*/
			function ofArcMiddle(arc, ratio) {
				if (ratio === void 0) ratio = .5;
				return arc.startAngle + ofArcSpan(arc) * ratio;
			}
			angle.ofArcMiddle = ofArcMiddle;
			/**
			* Total angle of an arc between its start and end angles.
			*
			* @param arc The arc to measure.
			* @returns Angle of arc.
			*/
			function ofArcSpan(arc) {
				var a = angle.ofArcEnd(arc) - arc.startAngle;
				if (MakerJs.round(a) > 360) return noRevolutions(a);
				else return a;
			}
			angle.ofArcSpan = ofArcSpan;
			/**
			* Angle of a line path.
			*
			* @param line The line path to find the angle of.
			* @returns Angle of the line path, in degrees.
			*/
			function ofLineInDegrees(line) {
				return noRevolutions(toDegrees(ofPointInRadians(line.origin, line.end)));
			}
			angle.ofLineInDegrees = ofLineInDegrees;
			/**
			* Angle of a line through a point, in degrees.
			*
			* @param pointToFindAngle The point to find the angle.
			* @param origin Point of origin of the angle.
			* @returns Angle of the line throught the point, in degrees.
			*/
			function ofPointInDegrees(origin, pointToFindAngle) {
				return toDegrees(ofPointInRadians(origin, pointToFindAngle));
			}
			angle.ofPointInDegrees = ofPointInDegrees;
			/**
			* Angle of a line through a point, in radians.
			*
			* @param pointToFindAngle The point to find the angle.
			* @param origin Point of origin of the angle.
			* @returns Angle of the line throught the point, in radians.
			*/
			function ofPointInRadians(origin, pointToFindAngle) {
				var d = MakerJs.point.subtract(pointToFindAngle, origin);
				var x = d[0];
				var y = d[1];
				return Math.atan2(-y, -x) + Math.PI;
			}
			angle.ofPointInRadians = ofPointInRadians;
			/**
			* Mirror an angle on either or both x and y axes.
			*
			* @param angleInDegrees The angle to mirror.
			* @param mirrorX Boolean to mirror on the x axis.
			* @param mirrorY Boolean to mirror on the y axis.
			* @returns Mirrored angle.
			*/
			function mirror(angleInDegrees, mirrorX, mirrorY) {
				if (mirrorY) angleInDegrees = 360 - angleInDegrees;
				if (mirrorX) angleInDegrees = (angleInDegrees < 180 ? 180 : 540) - angleInDegrees;
				return angleInDegrees;
			}
			angle.mirror = mirror;
			/**
			* @private
			*/
			var linkLineMap = {};
			linkLineMap[MakerJs.pathType.Arc] = function(arc, first, reversed) {
				var fromEnd = first != reversed;
				var angleToRotate = fromEnd ? arc.endAngle - 90 : arc.startAngle + 90;
				var origin = MakerJs.point.fromArc(arc)[fromEnd ? 1 : 0];
				var end = MakerJs.point.rotate(MakerJs.point.add(origin, [arc.radius, 0]), angleToRotate, origin);
				return new MakerJs.paths.Line(first ? [end, origin] : [origin, end]);
			};
			linkLineMap[MakerJs.pathType.Line] = function(line, first, reversed) {
				return reversed ? new MakerJs.paths.Line(line.end, line.origin) : line;
			};
			/**
			* @private
			*/
			function getLinkLine(chainLink, first) {
				if (chainLink) {
					var p = chainLink.walkedPath.pathContext;
					var fn = linkLineMap[p.type];
					if (fn) return fn(p, first, chainLink.reversed);
				}
			}
			/**
			* Get the angle of a joint between 2 chain links.
			*
			* @param linkA First chain link.
			* @param linkB Second chain link.
			* @returns Angle between chain links.
			*/
			function ofChainLinkJoint(linkA, linkB) {
				if (arguments.length < 2) return null;
				var linkLines = [linkA, linkB].map(function(link, i) {
					return getLinkLine(link, i === 0);
				});
				var result = noRevolutions(ofLineInDegrees(linkLines[1]) - ofLineInDegrees(linkLines[0]));
				if (result > 180) result -= 360;
				return result;
			}
			angle.ofChainLinkJoint = ofChainLinkJoint;
		})(MakerJs.angle || (MakerJs.angle = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(point) {
			/**
			* Add two points together and return the result as a new point object.
			*
			* @param a First point.
			* @param b Second point.
			* @param subtract Optional boolean to subtract instead of add.
			* @returns A new point object.
			*/
			function add(a, b, subtract) {
				var newPoint = clone(a);
				if (!b) return newPoint;
				for (var i = 2; i--;) if (subtract) newPoint[i] -= b[i];
				else newPoint[i] += b[i];
				return newPoint;
			}
			point.add = add;
			/**
			* Get the average of two points.
			*
			* @param a First point.
			* @param b Second point.
			* @returns New point object which is the average of a and b.
			*/
			function average(a, b) {
				function avg(i) {
					return (a[i] + b[i]) / 2;
				}
				return [avg(0), avg(1)];
			}
			point.average = average;
			/**
			* Clone a point into a new point.
			*
			* @param pointToClone The point to clone.
			* @returns A new point with same values as the original.
			*/
			function clone(pointToClone) {
				if (!pointToClone) return point.zero();
				return [pointToClone[0], pointToClone[1]];
			}
			point.clone = clone;
			/**
			* From an array of points, find the closest point to a given reference point.
			*
			* @param referencePoint The reference point.
			* @param pointOptions Array of points to choose from.
			* @returns The first closest point from the pointOptions.
			*/
			function closest(referencePoint, pointOptions) {
				var smallest = {
					index: 0,
					distance: -1
				};
				for (var i = 0; i < pointOptions.length; i++) {
					var distance = MakerJs.measure.pointDistance(referencePoint, pointOptions[i]);
					if (smallest.distance == -1 || distance < smallest.distance) {
						smallest.distance = distance;
						smallest.index = i;
					}
				}
				return pointOptions[smallest.index];
			}
			point.closest = closest;
			/**
			* @private
			*/
			var zero_cos = {};
			zero_cos[Math.PI / 2] = true;
			zero_cos[3 * Math.PI / 2] = true;
			/**
			* @private
			*/
			var zero_sin = {};
			zero_sin[Math.PI] = true;
			zero_sin[2 * Math.PI] = true;
			/**
			* Get a point from its polar coordinates.
			*
			* @param angleInRadians The angle of the polar coordinate, in radians.
			* @param radius The radius of the polar coordinate.
			* @returns A new point object.
			*/
			function fromPolar(angleInRadians, radius) {
				return [angleInRadians in zero_cos ? 0 : MakerJs.round(radius * Math.cos(angleInRadians)), angleInRadians in zero_sin ? 0 : MakerJs.round(radius * Math.sin(angleInRadians))];
			}
			point.fromPolar = fromPolar;
			/**
			* Get a point on a circle or arc path, at a given angle.
			* @param angleInDegrees The angle at which you want to find the point, in degrees.
			* @param circle A circle or arc.
			* @returns A new point object.
			*/
			function fromAngleOnCircle(angleInDegrees, circle) {
				return add(circle.origin, fromPolar(MakerJs.angle.toRadians(angleInDegrees), circle.radius));
			}
			point.fromAngleOnCircle = fromAngleOnCircle;
			/**
			* Get the two end points of an arc path.
			*
			* @param arc The arc path object.
			* @returns Array with 2 elements: [0] is the point object corresponding to the start angle, [1] is the point object corresponding to the end angle.
			*/
			function fromArc(arc) {
				return [fromAngleOnCircle(arc.startAngle, arc), fromAngleOnCircle(arc.endAngle, arc)];
			}
			point.fromArc = fromArc;
			/**
			* @private
			*/
			var pathEndsMap = {};
			pathEndsMap[MakerJs.pathType.Arc] = function(arc) {
				return point.fromArc(arc);
			};
			pathEndsMap[MakerJs.pathType.Line] = function(line) {
				return [line.origin, line.end];
			};
			pathEndsMap[MakerJs.pathType.BezierSeed] = pathEndsMap[MakerJs.pathType.Line];
			/**
			* Get the two end points of a path.
			*
			* @param pathContext The path object.
			* @returns Array with 2 elements: [0] is the point object corresponding to the origin, [1] is the point object corresponding to the end.
			*/
			function fromPathEnds(pathContext, pathOffset) {
				var result = null;
				var fn = pathEndsMap[pathContext.type];
				if (fn) {
					result = fn(pathContext);
					if (pathOffset) result = result.map(function(p) {
						return add(p, pathOffset);
					});
				}
				return result;
			}
			point.fromPathEnds = fromPathEnds;
			/**
			* @private
			*/
			function verticalIntersectionPoint(verticalLine, nonVerticalSlope) {
				var x = verticalLine.origin[0];
				return [x, nonVerticalSlope.slope * x + nonVerticalSlope.yIntercept];
			}
			/**
			* Calculates the intersection of slopes of two lines.
			*
			* @param lineA First line to use for slope.
			* @param lineB Second line to use for slope.
			* @param options Optional IPathIntersectionOptions.
			* @returns point of intersection of the two slopes, or null if the slopes did not intersect.
			*/
			function fromSlopeIntersection(lineA, lineB, options) {
				if (options === void 0) options = {};
				var slopeA = MakerJs.measure.lineSlope(lineA);
				var slopeB = MakerJs.measure.lineSlope(lineB);
				if (MakerJs.measure.isSlopeParallel(slopeA, slopeB)) {
					if (MakerJs.measure.isSlopeEqual(slopeA, slopeB)) options.out_AreOverlapped = MakerJs.measure.isLineOverlapping(lineA, lineB, options.excludeTangents);
					return null;
				}
				var pointOfIntersection;
				if (!slopeA.hasSlope) pointOfIntersection = verticalIntersectionPoint(lineA, slopeB);
				else if (!slopeB.hasSlope) pointOfIntersection = verticalIntersectionPoint(lineB, slopeA);
				else {
					var x = (slopeB.yIntercept - slopeA.yIntercept) / (slopeA.slope - slopeB.slope);
					pointOfIntersection = [x, slopeA.slope * x + slopeA.yIntercept];
				}
				return pointOfIntersection;
			}
			point.fromSlopeIntersection = fromSlopeIntersection;
			/**
			* @private
			*/
			function midCircle(circle, midAngle) {
				return point.add(circle.origin, point.fromPolar(MakerJs.angle.toRadians(midAngle), circle.radius));
			}
			/**
			* @private
			*/
			var middleMap = {};
			middleMap[MakerJs.pathType.Arc] = function(arc, ratio) {
				return midCircle(arc, MakerJs.angle.ofArcMiddle(arc, ratio));
			};
			middleMap[MakerJs.pathType.Circle] = function(circle, ratio) {
				return midCircle(circle, 360 * ratio);
			};
			middleMap[MakerJs.pathType.Line] = function(line, ratio) {
				function ration(a, b) {
					return a + (b - a) * ratio;
				}
				return [ration(line.origin[0], line.end[0]), ration(line.origin[1], line.end[1])];
			};
			middleMap[MakerJs.pathType.BezierSeed] = function(seed, ratio) {
				return MakerJs.models.BezierCurve.computePoint(seed, ratio);
			};
			/**
			* Get the middle point of a path.
			*
			* @param pathContext The path object.
			* @param ratio Optional ratio (between 0 and 1) of point along the path. Default is .5 for middle.
			* @returns Point on the path, in the middle of the path.
			*/
			function middle(pathContext, ratio) {
				if (ratio === void 0) ratio = .5;
				var midPoint = null;
				var fn = middleMap[pathContext.type];
				if (fn) midPoint = fn(pathContext, ratio);
				return midPoint;
			}
			point.middle = middle;
			/**
			* Create a clone of a point, mirrored on either or both x and y axes.
			*
			* @param pointToMirror The point to mirror.
			* @param mirrorX Boolean to mirror on the x axis.
			* @param mirrorY Boolean to mirror on the y axis.
			* @returns Mirrored point.
			*/
			function mirror(pointToMirror, mirrorX, mirrorY) {
				var p = clone(pointToMirror);
				if (mirrorX) p[0] = -p[0];
				if (mirrorY) p[1] = -p[1];
				return p;
			}
			point.mirror = mirror;
			/**
			* Round the values of a point.
			*
			* @param pointContext The point to serialize.
			* @param accuracy Optional exemplar number of decimal places.
			* @returns A new point with the values rounded.
			*/
			function rounded(pointContext, accuracy) {
				return [MakerJs.round(pointContext[0], accuracy), MakerJs.round(pointContext[1], accuracy)];
			}
			point.rounded = rounded;
			/**
			* Rotate a point.
			*
			* @param pointToRotate The point to rotate.
			* @param angleInDegrees The amount of rotation, in degrees.
			* @param rotationOrigin The center point of rotation.
			* @returns A new point.
			*/
			function rotate(pointToRotate, angleInDegrees, rotationOrigin) {
				if (rotationOrigin === void 0) rotationOrigin = [0, 0];
				var pointAngleInRadians = MakerJs.angle.ofPointInRadians(rotationOrigin, pointToRotate);
				var d = MakerJs.measure.pointDistance(rotationOrigin, pointToRotate);
				var rotatedPoint = fromPolar(pointAngleInRadians + MakerJs.angle.toRadians(angleInDegrees), d);
				return add(rotationOrigin, rotatedPoint);
			}
			point.rotate = rotate;
			/**
			* Scale a point's coordinates.
			*
			* @param pointToScale The point to scale.
			* @param scaleValue The amount of scaling.
			* @returns A new point.
			*/
			function scale(pointToScale, scaleValue) {
				var p = clone(pointToScale);
				for (var i = 2; i--;) p[i] *= scaleValue;
				return p;
			}
			point.scale = scale;
			/**
			* Distort a point's coordinates.
			*
			* @param pointToDistort The point to distort.
			* @param scaleX The amount of x scaling.
			* @param scaleY The amount of y scaling.
			* @returns A new point.
			*/
			function distort(pointToDistort, scaleX, scaleY) {
				return [pointToDistort[0] * scaleX, pointToDistort[1] * scaleY];
			}
			point.distort = distort;
			/**
			* Subtract a point from another point, and return the result as a new point. Shortcut to Add(a, b, subtract = true).
			*
			* @param a First point.
			* @param b Second point.
			* @returns A new point object.
			*/
			function subtract(a, b) {
				return add(a, b, true);
			}
			point.subtract = subtract;
			/**
			* A point at 0,0 coordinates.
			* NOTE: It is important to call this as a method, with the empty parentheses.
			*
			* @returns A new point.
			*/
			function zero() {
				return [0, 0];
			}
			point.zero = zero;
		})(MakerJs.point || (MakerJs.point = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(path) {
			/**
			* Add a path to a model. This is basically equivalent to:
			* ```
			* parentModel.paths[pathId] = childPath;
			* ```
			* with additional checks to make it safe for cascading.
			*
			* @param childPath The path to add.
			* @param parentModel The model to add to.
			* @param pathId The id of the path.
			* @param overwrite Optional flag to overwrite any path referenced by pathId. Default is false, which will create an id similar to pathId.
			* @returns The original path (for cascading).
			*/
			function addTo(childPath, parentModel, pathId, overwrite) {
				if (overwrite === void 0) overwrite = false;
				MakerJs.model.addPath(parentModel, childPath, pathId, overwrite);
				return childPath;
			}
			path.addTo = addTo;
			/**
			* @private
			*/
			function copyLayer(pathA, pathB) {
				if (pathA && pathB && typeof pathA.layer !== "undefined") pathB.layer = pathA.layer;
				if (pathA && pathB && "bezierData" in pathA) pathB.bezierData = pathA.bezierData;
			}
			/**
			* @private
			*/
			var copyPropsMap = {};
			copyPropsMap[MakerJs.pathType.Circle] = function(srcCircle, destCircle, offset) {
				destCircle.radius = srcCircle.radius;
			};
			copyPropsMap[MakerJs.pathType.Arc] = function(srcArc, destArc, offset) {
				copyPropsMap[MakerJs.pathType.Circle](srcArc, destArc, offset);
				destArc.startAngle = srcArc.startAngle;
				destArc.endAngle = srcArc.endAngle;
			};
			copyPropsMap[MakerJs.pathType.Line] = function(srcLine, destLine, offset) {
				destLine.end = MakerJs.point.add(srcLine.end, offset);
			};
			copyPropsMap[MakerJs.pathType.BezierSeed] = function(srcSeed, destSeed, offset) {
				copyPropsMap[MakerJs.pathType.Line](srcSeed, destSeed, offset);
				destSeed.controls = srcSeed.controls.map(function(p) {
					return MakerJs.point.add(p, offset);
				});
			};
			/**
			* Create a clone of a path. This is faster than cloneObject.
			*
			* @param pathToClone The path to clone.
			* @param offset Optional point to move path a relative distance.
			* @returns Cloned path.
			*/
			function clone(pathToClone, offset) {
				var result = {
					type: pathToClone.type,
					origin: MakerJs.point.add(pathToClone.origin, offset)
				};
				var fn = copyPropsMap[pathToClone.type];
				if (fn) fn(pathToClone, result, offset);
				copyLayer(pathToClone, result);
				return result;
			}
			path.clone = clone;
			/**
			* Copy the schema properties of one path to another.
			*
			* @param srcPath The source path to copy property values from.
			* @param destPath The destination path to copy property values to.
			* @returns The source path.
			*/
			function copyProps(srcPath, destPath) {
				var fn = copyPropsMap[srcPath.type];
				if (fn) {
					destPath.origin = MakerJs.point.clone(srcPath.origin);
					fn(srcPath, destPath);
				}
				copyLayer(srcPath, destPath);
				return srcPath;
			}
			path.copyProps = copyProps;
			/**
			* @private
			*/
			var mirrorMap = {};
			mirrorMap[MakerJs.pathType.Line] = function(line, origin, mirrorX, mirrorY) {
				return new MakerJs.paths.Line(origin, MakerJs.point.mirror(line.end, mirrorX, mirrorY));
			};
			mirrorMap[MakerJs.pathType.Circle] = function(circle, origin, mirrorX, mirrorY) {
				return new MakerJs.paths.Circle(origin, circle.radius);
			};
			mirrorMap[MakerJs.pathType.Arc] = function(arc, origin, mirrorX, mirrorY) {
				var startAngle = MakerJs.angle.mirror(arc.startAngle, mirrorX, mirrorY);
				var endAngle = MakerJs.angle.mirror(MakerJs.angle.ofArcEnd(arc), mirrorX, mirrorY);
				var xor = mirrorX != mirrorY;
				return new MakerJs.paths.Arc(origin, arc.radius, xor ? endAngle : startAngle, xor ? startAngle : endAngle);
			};
			mirrorMap[MakerJs.pathType.BezierSeed] = function(seed, origin, mirrorX, mirrorY) {
				var mirrored = mirrorMap[MakerJs.pathType.Line](seed, origin, mirrorX, mirrorY);
				mirrored.type = MakerJs.pathType.BezierSeed;
				mirrored.controls = seed.controls.map(function(c) {
					return MakerJs.point.mirror(c, mirrorX, mirrorY);
				});
				return mirrored;
			};
			/**
			* Set the layer of a path. This is equivalent to:
			* ```
			* pathContext.layer = layer;
			* ```
			*
			* @param pathContext The path to set the layer.
			* @param layer The layer name.
			* @returns The original path (for cascading).
			*/
			function layer(pathContext, layer) {
				pathContext.layer = layer;
				return pathContext;
			}
			path.layer = layer;
			/**
			* Create a clone of a path, mirrored on either or both x and y axes.
			*
			* @param pathToMirror The path to mirror.
			* @param mirrorX Boolean to mirror on the x axis.
			* @param mirrorY Boolean to mirror on the y axis.
			* @returns Mirrored path.
			*/
			function mirror(pathToMirror, mirrorX, mirrorY) {
				var newPath = null;
				if (pathToMirror) {
					var origin = MakerJs.point.mirror(pathToMirror.origin, mirrorX, mirrorY);
					var fn = mirrorMap[pathToMirror.type];
					if (fn) newPath = fn(pathToMirror, origin, mirrorX, mirrorY);
				}
				copyLayer(pathToMirror, newPath);
				return newPath;
			}
			path.mirror = mirror;
			/**
			* @private
			*/
			var moveMap = {};
			moveMap[MakerJs.pathType.Line] = function(line, origin) {
				var delta = MakerJs.point.subtract(line.end, line.origin);
				line.end = MakerJs.point.add(origin, delta);
			};
			/**
			* Move a path to an absolute point.
			*
			* @param pathToMove The path to move.
			* @param origin The new origin for the path.
			* @returns The original path (for cascading).
			*/
			function move(pathToMove, origin) {
				if (pathToMove) {
					var fn = moveMap[pathToMove.type];
					if (fn) fn(pathToMove, origin);
					pathToMove.origin = origin;
				}
				return pathToMove;
			}
			path.move = move;
			/**
			* @private
			*/
			var moveRelativeMap = {};
			moveRelativeMap[MakerJs.pathType.Line] = function(line, delta, subtract) {
				line.end = MakerJs.point.add(line.end, delta, subtract);
			};
			moveRelativeMap[MakerJs.pathType.BezierSeed] = function(seed, delta, subtract) {
				moveRelativeMap[MakerJs.pathType.Line](seed, delta, subtract);
				seed.controls = seed.controls.map(function(c) {
					return MakerJs.point.add(c, delta, subtract);
				});
			};
			/**
			* Move a path's origin by a relative amount.
			*
			* @param pathToMove The path to move.
			* @param delta The x & y adjustments as a point object.
			* @param subtract Optional boolean to subtract instead of add.
			* @returns The original path (for cascading).
			*/
			function moveRelative(pathToMove, delta, subtract) {
				if (pathToMove && delta) {
					pathToMove.origin = MakerJs.point.add(pathToMove.origin, delta, subtract);
					var fn = moveRelativeMap[pathToMove.type];
					if (fn) fn(pathToMove, delta, subtract);
				}
				return pathToMove;
			}
			path.moveRelative = moveRelative;
			/**
			* Move some paths relatively during a task execution, then unmove them.
			*
			* @param pathsToMove The paths to move.
			* @param deltas The x & y adjustments as a point object array.
			* @param task The function to call while the paths are temporarily moved.
			*/
			function moveTemporary(pathsToMove, deltas, task) {
				var subtract = false;
				function move(pathToOffset, i) {
					if (deltas[i]) moveRelative(pathToOffset, deltas[i], subtract);
				}
				pathsToMove.map(move);
				task();
				subtract = true;
				pathsToMove.map(move);
			}
			path.moveTemporary = moveTemporary;
			/**
			* @private
			*/
			var rotateMap = {};
			rotateMap[MakerJs.pathType.Line] = function(line, angleInDegrees, rotationOrigin) {
				line.end = MakerJs.point.rotate(line.end, angleInDegrees, rotationOrigin);
			};
			rotateMap[MakerJs.pathType.Arc] = function(arc, angleInDegrees, rotationOrigin) {
				arc.startAngle = MakerJs.angle.noRevolutions(arc.startAngle + angleInDegrees);
				arc.endAngle = MakerJs.angle.noRevolutions(arc.endAngle + angleInDegrees);
			};
			rotateMap[MakerJs.pathType.BezierSeed] = function(seed, angleInDegrees, rotationOrigin) {
				rotateMap[MakerJs.pathType.Line](seed, angleInDegrees, rotationOrigin);
				seed.controls = seed.controls.map(function(c) {
					return MakerJs.point.rotate(c, angleInDegrees, rotationOrigin);
				});
			};
			/**
			* Rotate a path.
			*
			* @param pathToRotate The path to rotate.
			* @param angleInDegrees The amount of rotation, in degrees.
			* @param rotationOrigin The center point of rotation.
			* @returns The original path (for cascading).
			*/
			function rotate(pathToRotate, angleInDegrees, rotationOrigin) {
				if (rotationOrigin === void 0) rotationOrigin = [0, 0];
				if (!pathToRotate || !angleInDegrees) return pathToRotate;
				pathToRotate.origin = MakerJs.point.rotate(pathToRotate.origin, angleInDegrees, rotationOrigin);
				var fn = rotateMap[pathToRotate.type];
				if (fn) fn(pathToRotate, angleInDegrees, rotationOrigin);
				return pathToRotate;
			}
			path.rotate = rotate;
			/**
			* @private
			*/
			var scaleMap = {};
			scaleMap[MakerJs.pathType.Line] = function(line, scaleValue) {
				line.end = MakerJs.point.scale(line.end, scaleValue);
			};
			scaleMap[MakerJs.pathType.BezierSeed] = function(seed, scaleValue) {
				scaleMap[MakerJs.pathType.Line](seed, scaleValue);
				seed.controls = seed.controls.map(function(c) {
					return MakerJs.point.scale(c, scaleValue);
				});
			};
			scaleMap[MakerJs.pathType.Circle] = function(circle, scaleValue) {
				circle.radius *= scaleValue;
			};
			scaleMap[MakerJs.pathType.Arc] = scaleMap[MakerJs.pathType.Circle];
			/**
			* Scale a path.
			*
			* @param pathToScale The path to scale.
			* @param scaleValue The amount of scaling.
			* @returns The original path (for cascading).
			*/
			function scale(pathToScale, scaleValue) {
				if (!pathToScale || scaleValue === 1 || !scaleValue) return pathToScale;
				pathToScale.origin = MakerJs.point.scale(pathToScale.origin, scaleValue);
				var fn = scaleMap[pathToScale.type];
				if (fn) fn(pathToScale, scaleValue);
				return pathToScale;
			}
			path.scale = scale;
			/**
			* @private
			*/
			var distortMap = {};
			distortMap[MakerJs.pathType.Arc] = function(arc, scaleX, scaleY) {
				return new MakerJs.models.EllipticArc(arc, scaleX, scaleY);
			};
			distortMap[MakerJs.pathType.Circle] = function(circle, scaleX, scaleY) {
				var ellipse = new MakerJs.models.Ellipse(circle.radius * scaleX, circle.radius * scaleY);
				ellipse.origin = MakerJs.point.distort(circle.origin, scaleX, scaleY);
				return ellipse;
			};
			distortMap[MakerJs.pathType.Line] = function(line, scaleX, scaleY) {
				return new MakerJs.paths.Line([line.origin, line.end].map(function(p) {
					return MakerJs.point.distort(p, scaleX, scaleY);
				}));
			};
			distortMap[MakerJs.pathType.BezierSeed] = function(seed, scaleX, scaleY) {
				var d = MakerJs.point.distort;
				return {
					type: MakerJs.pathType.BezierSeed,
					origin: d(seed.origin, scaleX, scaleY),
					controls: seed.controls.map(function(c) {
						return d(c, scaleX, scaleY);
					}),
					end: d(seed.end, scaleX, scaleY)
				};
			};
			/**
			* Distort a path - scale x and y individually.
			*
			* @param pathToDistort The path to distort.
			* @param scaleX The amount of x scaling.
			* @param scaleY The amount of y scaling.
			* @returns A new IModel (for circles and arcs) or IPath (for lines and bezier seeds).
			*/
			function distort(pathToDistort, scaleX, scaleY) {
				if (!pathToDistort || !scaleX || !scaleY) return null;
				var fn = distortMap[pathToDistort.type];
				if (fn) {
					var distorted = fn(pathToDistort, scaleX, scaleY);
					if (typeof pathToDistort.layer !== "undefined") distorted.layer = pathToDistort.layer;
					return distorted;
				}
				return null;
			}
			path.distort = distort;
			/**
			* Connect 2 lines at their slope intersection point.
			*
			* @param lineA First line to converge.
			* @param lineB Second line to converge.
			* @param useOriginA Optional flag to converge the origin point of lineA instead of the end point.
			* @param useOriginB Optional flag to converge the origin point of lineB instead of the end point.
			* @returns point of convergence.
			*/
			function converge(lineA, lineB, useOriginA, useOriginB) {
				var p = MakerJs.point.fromSlopeIntersection(lineA, lineB);
				if (p) {
					var lines = [lineA, lineB];
					var useOrigin = [useOriginA, useOriginB];
					if (arguments.length === 2) lines.forEach(function(line, i) {
						useOrigin[i] = MakerJs.point.closest(p, [line.origin, line.end]) === line.origin;
					});
					function setPoint(line, useOrigin) {
						var setP;
						if (useOrigin) setP = line.origin;
						else setP = line.end;
						setP[0] = p[0];
						setP[1] = p[1];
					}
					lines.forEach(function(line, i) {
						setPoint(line, useOrigin[i]);
					});
				}
				return p;
			}
			path.converge = converge;
			/**
			* @private
			*/
			var alterMap = {};
			alterMap[MakerJs.pathType.Arc] = function(arc, pathLength, distance, useOrigin) {
				var span = MakerJs.angle.ofArcSpan(arc);
				var delta = (pathLength + distance) * span / pathLength - span;
				if (useOrigin) arc.startAngle -= delta;
				else arc.endAngle += delta;
			};
			alterMap[MakerJs.pathType.Circle] = function(circle, pathLength, distance, useOrigin) {
				circle.radius *= (pathLength + distance) / pathLength;
			};
			alterMap[MakerJs.pathType.Line] = function(line, pathLength, distance, useOrigin) {
				var delta = MakerJs.point.scale(MakerJs.point.subtract(line.end, line.origin), distance / pathLength);
				if (useOrigin) line.origin = MakerJs.point.subtract(line.origin, delta);
				else line.end = MakerJs.point.add(line.end, delta);
			};
			/**
			* Alter a path by lengthening or shortening it.
			*
			* @param pathToAlter Path to alter.
			* @param distance Numeric amount of length to add or remove from the path. Use a positive number to lengthen, negative to shorten. When shortening: this function will not alter the path and will return null if the resulting path length is less than or equal to zero.
			* @param useOrigin Optional flag to alter from the origin instead of the end of the path.
			* @returns The original path (for cascading), or null if the path could not be altered.
			*/
			function alterLength(pathToAlter, distance, useOrigin) {
				if (useOrigin === void 0) useOrigin = false;
				if (!pathToAlter || !distance) return null;
				var fn = alterMap[pathToAlter.type];
				if (fn) {
					var pathLength = MakerJs.measure.pathLength(pathToAlter);
					if (!pathLength || -distance >= pathLength) return null;
					fn(pathToAlter, pathLength, distance, useOrigin);
					return pathToAlter;
				}
				return null;
			}
			path.alterLength = alterLength;
			/**
			* Get points along a path.
			*
			* @param pathContext Path to get points from.
			* @param numberOfPoints Number of points to divide the path.
			* @returns Array of points which are on the path spread at a uniform interval.
			*/
			function toPoints(pathContext, numberOfPoints) {
				if (numberOfPoints == 1) return [MakerJs.point.middle(pathContext)];
				var points = [];
				var base = numberOfPoints;
				if (pathContext.type != MakerJs.pathType.Circle) base--;
				for (var i = 0; i < numberOfPoints; i++) points.push(MakerJs.point.middle(pathContext, i / base));
				return points;
			}
			path.toPoints = toPoints;
			/**
			* @private
			*/
			var numberOfKeyPointsMap = {};
			numberOfKeyPointsMap[MakerJs.pathType.Line] = function(line) {
				return 2;
			};
			numberOfKeyPointsMap[MakerJs.pathType.Circle] = function(circle, maxPointDistance) {
				var len = MakerJs.measure.pathLength(circle);
				if (!len) return 0;
				maxPointDistance = maxPointDistance || len;
				return Math.max(8, Math.ceil(len / (maxPointDistance || len)));
			};
			numberOfKeyPointsMap[MakerJs.pathType.Arc] = function(arc, maxPointDistance) {
				var len = MakerJs.measure.pathLength(arc);
				if (!len) return 0;
				var minPoints = Math.ceil(MakerJs.angle.ofArcSpan(arc) / 45) + 1;
				return Math.max(minPoints, Math.ceil(len / (maxPointDistance || len)));
			};
			/**
			* Get key points (a minimal a number of points) along a path.
			*
			* @param pathContext Path to get points from.
			* @param maxArcFacet Optional maximum length between points on an arc or circle.
			* @returns Array of points which are on the path.
			*/
			function toKeyPoints(pathContext, maxArcFacet) {
				if (pathContext.type == MakerJs.pathType.BezierSeed) {
					var curve = new MakerJs.models.BezierCurve(pathContext);
					var curveKeyPoints;
					MakerJs.model.findChains(curve, function(chains, loose, layer) {
						if (chains.length == 1) {
							var c = chains[0];
							switch (c.links[0].walkedPath.pathId) {
								case "arc_0":
								case "line_0": break;
								default: MakerJs.chain.reverse(c);
							}
							curveKeyPoints = MakerJs.chain.toKeyPoints(c);
						} else if (loose.length === 1) curveKeyPoints = toKeyPoints(loose[0].pathContext);
					});
					return curveKeyPoints;
				} else {
					var fn = numberOfKeyPointsMap[pathContext.type];
					if (fn) {
						var numberOfKeyPoints = fn(pathContext, maxArcFacet);
						if (numberOfKeyPoints) return toPoints(pathContext, numberOfKeyPoints);
					}
				}
				return [];
			}
			path.toKeyPoints = toKeyPoints;
			/**
			* Center a path at [0, 0].
			*
			* @param pathToCenter The path to center.
			* @returns The original path (for cascading).
			*/
			function center(pathToCenter) {
				var m = MakerJs.measure.pathExtents(pathToCenter);
				var c = MakerJs.point.average(m.high, m.low);
				move(pathToCenter, MakerJs.point.subtract(pathToCenter.origin || [0, 0], c));
				return pathToCenter;
			}
			path.center = center;
			/**
			* Move a path so its bounding box begins at [0, 0].
			*
			* @param pathToZero The path to zero.
			* @returns The original path (for cascading).
			*/
			function zero(pathToZero) {
				var m = MakerJs.measure.pathExtents(pathToZero);
				move(pathToZero, MakerJs.point.subtract(pathToZero.origin || [0, 0], m.low));
				return pathToZero;
			}
			path.zero = zero;
		})(MakerJs.path || (MakerJs.path = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(path_1) {
			/**
			* @private
			*/
			var breakPathFunctionMap = {};
			breakPathFunctionMap[MakerJs.pathType.Arc] = function(arc, pointOfBreak) {
				var angleAtBreakPoint = MakerJs.angle.ofPointInDegrees(arc.origin, pointOfBreak);
				if (MakerJs.measure.isAngleEqual(angleAtBreakPoint, arc.startAngle) || MakerJs.measure.isAngleEqual(angleAtBreakPoint, arc.endAngle)) return null;
				function getAngleStrictlyBetweenArcAngles() {
					var startAngle = MakerJs.angle.noRevolutions(arc.startAngle);
					var endAngle = startAngle + MakerJs.angle.ofArcEnd(arc) - arc.startAngle;
					var tries = [
						0,
						1,
						-1
					];
					for (var i = 0; i < tries.length; i++) {
						var add = 360 * tries[i];
						if (MakerJs.measure.isBetween(angleAtBreakPoint + add, startAngle, endAngle, true)) return arc.startAngle + angleAtBreakPoint + add - startAngle;
					}
					return null;
				}
				var angleAtBreakPointBetween = getAngleStrictlyBetweenArcAngles();
				if (angleAtBreakPointBetween == null) return null;
				var savedEndAngle = arc.endAngle;
				arc.endAngle = angleAtBreakPointBetween;
				var copy = MakerJs.cloneObject(arc);
				copy.startAngle = angleAtBreakPointBetween;
				copy.endAngle = savedEndAngle;
				return copy;
			};
			breakPathFunctionMap[MakerJs.pathType.Circle] = function(circle, pointOfBreak) {
				circle.type = MakerJs.pathType.Arc;
				var arc = circle;
				var angleAtBreakPoint = MakerJs.angle.ofPointInDegrees(circle.origin, pointOfBreak);
				arc.startAngle = angleAtBreakPoint;
				arc.endAngle = angleAtBreakPoint + 360;
				return null;
			};
			breakPathFunctionMap[MakerJs.pathType.Line] = function(line, pointOfBreak) {
				if (!MakerJs.measure.isBetweenPoints(pointOfBreak, line, true)) return null;
				var savedEndPoint = line.end;
				line.end = pointOfBreak;
				var copy = MakerJs.cloneObject(line);
				copy.origin = pointOfBreak;
				copy.end = savedEndPoint;
				return copy;
			};
			/**
			* Breaks a path in two. The supplied path will end at the supplied pointOfBreak,
			* a new path is returned which begins at the pointOfBreak and ends at the supplied path's initial end point.
			* For Circle, the original path will be converted in place to an Arc, and null is returned.
			*
			* @param pathToBreak The path to break.
			* @param pointOfBreak The point at which to break the path.
			* @returns A new path of the same type, when path type is line or arc. Returns null for circle.
			*/
			function breakAtPoint(pathToBreak, pointOfBreak) {
				if (pathToBreak && pointOfBreak) {
					var fn = breakPathFunctionMap[pathToBreak.type];
					if (fn) {
						var result = fn(pathToBreak, pointOfBreak);
						if (result && "layer" in pathToBreak) result.layer = pathToBreak.layer;
						return result;
					}
				}
				return null;
			}
			path_1.breakAtPoint = breakAtPoint;
		})(MakerJs.path || (MakerJs.path = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(paths) {
			paths.Arc = function() {
				function Arc() {
					var args = [];
					for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
					var _a, _b;
					function getSpan(origin) {
						var startAngle = MakerJs.angle.ofPointInDegrees(origin, args[clockwise ? 1 : 0]);
						var endAngle = MakerJs.angle.ofPointInDegrees(origin, args[clockwise ? 0 : 1]);
						if (endAngle < startAngle) endAngle += 360;
						return {
							origin,
							startAngle,
							endAngle,
							size: endAngle - startAngle
						};
					}
					switch (args.length) {
						case 5:
							var pointA = args[0];
							var pointB = args[1];
							this.radius = args[2];
							var largeArc = args[3];
							var clockwise = args[4];
							var span;
							var smallestRadius = MakerJs.measure.pointDistance(pointA, pointB) / 2;
							if (MakerJs.round(this.radius - smallestRadius) <= 0) {
								this.radius = smallestRadius;
								span = getSpan(MakerJs.point.average(pointA, pointB));
							} else {
								var intersectionPoints = (_b = (_a = MakerJs.path.intersection(new Circle(pointA, this.radius), new Circle(pointB, this.radius))) === null || _a === void 0 ? void 0 : _a.intersectionPoints) !== null && _b !== void 0 ? _b : [pointA, pointB];
								var spans = [];
								for (var i = intersectionPoints.length; i--;) {
									span = getSpan(intersectionPoints[i]);
									if (spans.length == 0 || span.size > spans[0].size) spans.push(span);
									else spans.unshift(span);
								}
								span = spans[largeArc ? 1 : 0];
							}
							this.origin = span.origin;
							this.startAngle = span.startAngle;
							this.endAngle = span.endAngle;
							break;
						case 4:
							this.origin = args[0];
							this.radius = args[1];
							this.startAngle = args[2];
							this.endAngle = args[3];
							break;
						case 3: if (MakerJs.isPoint(args[2])) {
							Circle.apply(this, args);
							var angles = [];
							for (var i_1 = 0; i_1 < 3; i_1++) angles.push(MakerJs.angle.ofPointInDegrees(this.origin, args[i_1]));
							this.startAngle = angles[0];
							this.endAngle = angles[2];
							if (!MakerJs.measure.isBetweenArcAngles(angles[1], this, false)) {
								this.startAngle = angles[2];
								this.endAngle = angles[0];
							}
							break;
						}
						case 2:
							var clockwise = args[2];
							Circle.call(this, args[0], args[1]);
							this.startAngle = MakerJs.angle.ofPointInDegrees(this.origin, args[clockwise ? 1 : 0]);
							this.endAngle = MakerJs.angle.ofPointInDegrees(this.origin, args[clockwise ? 0 : 1]);
							break;
					}
					this.type = MakerJs.pathType.Arc;
				}
				return Arc;
			}();
			/**
			* Class for circle path.
			*/
			var Circle = function() {
				function Circle() {
					var args = [];
					for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
					this.type = MakerJs.pathType.Circle;
					switch (args.length) {
						case 1:
							this.origin = [0, 0];
							this.radius = args[0];
							break;
						case 2:
							if (MakerJs.isNumber(args[1])) {
								this.origin = args[0];
								this.radius = args[1];
							} else {
								this.origin = MakerJs.point.average(args[0], args[1]);
								this.radius = MakerJs.measure.pointDistance(this.origin, args[0]);
							}
							break;
						default:
							var lines = [new Line(args[0], args[1]), new Line(args[1], args[2])];
							var perpendiculars = [];
							for (var i = 2; i--;) {
								var midpoint = MakerJs.point.middle(lines[i]);
								perpendiculars.push(MakerJs.path.rotate(lines[i], 90, midpoint));
							}
							var origin = MakerJs.point.fromSlopeIntersection(perpendiculars[0], perpendiculars[1]);
							if (origin) {
								this.origin = origin;
								this.radius = MakerJs.measure.pointDistance(this.origin, args[0]);
							} else throw "invalid parameters - attempted to construct a circle from 3 points on a line: " + JSON.stringify(args);
							break;
					}
				}
				return Circle;
			}();
			paths.Circle = Circle;
			/**
			* Class for line path.
			*/
			var Line = function() {
				function Line() {
					var args = [];
					for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
					this.type = MakerJs.pathType.Line;
					switch (args.length) {
						case 1:
							var points = args[0];
							this.origin = points[0];
							this.end = points[1];
							break;
						case 2:
							this.origin = args[0];
							this.end = args[1];
							break;
					}
				}
				return Line;
			}();
			paths.Line = Line;
			paths.Chord = function() {
				function Chord(arc) {
					var arcPoints = MakerJs.point.fromArc(arc);
					this.type = MakerJs.pathType.Line;
					this.origin = arcPoints[0];
					this.end = arcPoints[1];
				}
				return Chord;
			}();
			paths.Parallel = function() {
				function Parallel(toLine, distance, nearPoint) {
					this.type = MakerJs.pathType.Line;
					this.origin = MakerJs.point.clone(toLine.origin);
					this.end = MakerJs.point.clone(toLine.end);
					var angleOfLine = MakerJs.angle.ofLineInDegrees(this);
					function getNewOrigin(offsetAngle) {
						var origin = MakerJs.point.add(toLine.origin, MakerJs.point.fromPolar(MakerJs.angle.toRadians(angleOfLine + offsetAngle), distance));
						return {
							origin,
							nearness: MakerJs.measure.pointDistance(origin, nearPoint)
						};
					}
					var newOrigins = [getNewOrigin(-90), getNewOrigin(90)];
					var newOrigin = newOrigins[0].nearness < newOrigins[1].nearness ? newOrigins[0].origin : newOrigins[1].origin;
					MakerJs.path.move(this, newOrigin);
				}
				return Parallel;
			}();
		})(MakerJs.paths || (MakerJs.paths = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(model) {
			/**
			* Add a Caption object to a model.
			* @param modelContext The model to add to.
			* @param text Text to add.
			* @param leftAnchorPoint Optional Point on left side middle of text.
			* @param rightAnchorPoint Optional Point on right side middle of text.
			* @returns The original model (for cascading).
			*/
			function addCaption(modelContext, text, leftAnchorPoint, rightAnchorPoint) {
				if (!leftAnchorPoint) leftAnchorPoint = MakerJs.point.zero();
				if (!rightAnchorPoint) rightAnchorPoint = MakerJs.point.clone(leftAnchorPoint);
				modelContext.caption = {
					text,
					anchor: new MakerJs.paths.Line(leftAnchorPoint, rightAnchorPoint)
				};
				return modelContext;
			}
			model.addCaption = addCaption;
			/**
			* Add a path as a child. This is basically equivalent to:
			* ```
			* parentModel.paths[childPathId] = childPath;
			* ```
			* with additional checks to make it safe for cascading.
			*
			* @param modelContext The model to add to.
			* @param pathContext The path to add.
			* @param pathId The id of the path.
			* @param overWrite Optional flag to overwrite any path referenced by pathId. Default is false, which will create an id similar to pathId.
			* @returns The original model (for cascading).
			*/
			function addPath(modelContext, pathContext, pathId, overWrite) {
				if (overWrite === void 0) overWrite = false;
				var id = overWrite ? pathId : getSimilarPathId(modelContext, pathId);
				modelContext.paths = modelContext.paths || {};
				modelContext.paths[id] = pathContext;
				return modelContext;
			}
			model.addPath = addPath;
			/**
			* Add a model as a child. This is basically equivalent to:
			* ```
			* parentModel.models[childModelId] = childModel;
			* ```
			* with additional checks to make it safe for cascading.
			*
			* @param parentModel The model to add to.
			* @param childModel The model to add.
			* @param childModelId The id of the child model.
			* @param overWrite Optional flag to overwrite any model referenced by childModelId. Default is false, which will create an id similar to childModelId.
			* @returns The original model (for cascading).
			*/
			function addModel(parentModel, childModel, childModelId, overWrite) {
				if (overWrite === void 0) overWrite = false;
				var id = overWrite ? childModelId : getSimilarModelId(parentModel, childModelId);
				parentModel.models = parentModel.models || {};
				parentModel.models[id] = childModel;
				return parentModel;
			}
			model.addModel = addModel;
			/**
			* Add a model as a child of another model. This is basically equivalent to:
			* ```
			* parentModel.models[childModelId] = childModel;
			* ```
			* with additional checks to make it safe for cascading.
			*
			* @param childModel The model to add.
			* @param parentModel The model to add to.
			* @param childModelId The id of the child model.
			* @param overWrite Optional flag to overwrite any model referenced by childModelId. Default is false, which will create an id similar to childModelId.
			* @returns The original model (for cascading).
			*/
			function addTo(childModel, parentModel, childModelId, overWrite) {
				if (overWrite === void 0) overWrite = false;
				addModel(parentModel, childModel, childModelId, overWrite);
				return childModel;
			}
			model.addTo = addTo;
			/**
			* Clone a model. Alias of makerjs.cloneObject(modelToClone)
			*
			* @param modelToClone The model to clone.
			* @returns A clone of the model you passed.
			*/
			function clone(modelToClone) {
				return MakerJs.cloneObject(modelToClone);
			}
			model.clone = clone;
			/**
			* Count the number of child models within a given model.
			*
			* @param modelContext The model containing other models.
			* @returns Number of child models.
			*/
			function countChildModels(modelContext) {
				var count = 0;
				if (modelContext.models) for (var id in modelContext.models) count++;
				return count;
			}
			model.countChildModels = countChildModels;
			/**
			* Gets all Caption objects, in absolute position, in this model and its children.
			* @param modelContext The model to search for Caption objects.
			* @returns Array of Caption objects.
			*/
			function getAllCaptionsOffset(modelContext) {
				var captions = [];
				function tryAddCaption(m, offset, layer) {
					if (m.caption) captions.push({
						text: m.caption.text,
						anchor: MakerJs.path.clone(m.caption.anchor, MakerJs.point.add(m.origin, offset)),
						layer: m.caption.anchor.layer || layer
					});
				}
				tryAddCaption(modelContext, modelContext.origin, modelContext.layer);
				model.walk(modelContext, { afterChildWalk: function(wm) {
					return tryAddCaption(wm.childModel, wm.offset, wm.layer);
				} });
				return captions;
			}
			model.getAllCaptionsOffset = getAllCaptionsOffset;
			/**
			* @private
			*/
			function getSimilarId(map, id) {
				if (!map) return id;
				var i = 0;
				var newId = id;
				while (newId in map) {
					i++;
					newId = [id, i].join("_");
				}
				return newId;
			}
			/**
			* Get an unused id in the models map with the same prefix.
			*
			* @param modelContext The model containing the models map.
			* @param modelId The id to use directly (if unused), or as a prefix.
			*/
			function getSimilarModelId(modelContext, modelId) {
				return getSimilarId(modelContext.models, modelId);
			}
			model.getSimilarModelId = getSimilarModelId;
			/**
			* Get an unused id in the paths map with the same prefix.
			*
			* @param modelContext The model containing the paths map.
			* @param pathId The id to use directly (if unused), or as a prefix.
			*/
			function getSimilarPathId(modelContext, pathId) {
				return getSimilarId(modelContext.paths, pathId);
			}
			model.getSimilarPathId = getSimilarPathId;
			/**
			* Set the layer of a model. This is equivalent to:
			* ```
			* modelContext.layer = layer;
			* ```
			*
			* @param modelContext The model to set the layer.
			* @param layer The layer name.
			* @returns The original model (for cascading).
			*/
			function layer(modelContext, layer) {
				modelContext.layer = layer;
				return modelContext;
			}
			model.layer = layer;
			/**
			* Moves all of a model's children (models and paths, recursively) in reference to a single common origin. Useful when points between children need to connect to each other.
			*
			* @param modelToOriginate The model to originate.
			* @param origin Optional offset reference point.
			* @returns The original model (for cascading).
			*/
			function originate(modelToOriginate, origin) {
				function innerOriginate(m, o) {
					if (!m) return;
					var newOrigin = MakerJs.point.add(m.origin, o);
					if (m.type === MakerJs.models.BezierCurve.typeName) MakerJs.path.moveRelative(m.seed, newOrigin);
					if (m.paths) for (var id in m.paths) MakerJs.path.moveRelative(m.paths[id], newOrigin);
					if (m.models) for (var id in m.models) innerOriginate(m.models[id], newOrigin);
					if (m.caption) MakerJs.path.moveRelative(m.caption.anchor, newOrigin);
					m.origin = MakerJs.point.zero();
				}
				innerOriginate(modelToOriginate, origin ? MakerJs.point.subtract([0, 0], origin) : [0, 0]);
				if (origin) modelToOriginate.origin = origin;
				return modelToOriginate;
			}
			model.originate = originate;
			/**
			* Center a model at [0, 0].
			*
			* @param modelToCenter The model to center.
			* @param centerX Boolean to center on the x axis. Default is true.
			* @param centerY Boolean to center on the y axis. Default is true.
			* @returns The original model (for cascading).
			*/
			function center(modelToCenter, centerX, centerY) {
				if (centerX === void 0) centerX = true;
				if (centerY === void 0) centerY = true;
				var m = MakerJs.measure.modelExtents(modelToCenter);
				var o = modelToCenter.origin || [0, 0];
				if (centerX) o[0] -= m.center[0];
				if (centerY) o[1] -= m.center[1];
				modelToCenter.origin = o;
				return modelToCenter;
			}
			model.center = center;
			/**
			* Create a clone of a model, mirrored on either or both x and y axes.
			*
			* @param modelToMirror The model to mirror.
			* @param mirrorX Boolean to mirror on the x axis.
			* @param mirrorY Boolean to mirror on the y axis.
			* @returns Mirrored model.
			*/
			function mirror(modelToMirror, mirrorX, mirrorY) {
				var newModel = {};
				if (!modelToMirror) return null;
				if (modelToMirror.origin) newModel.origin = MakerJs.point.mirror(modelToMirror.origin, mirrorX, mirrorY);
				if (modelToMirror.type) newModel.type = modelToMirror.type;
				if ("layer" in modelToMirror) newModel.layer = modelToMirror.layer;
				if (modelToMirror.units) newModel.units = modelToMirror.units;
				if (modelToMirror.type === MakerJs.models.BezierCurve.typeName) {
					newModel.type = MakerJs.models.BezierCurve.typeName;
					newModel.seed = MakerJs.path.mirror(modelToMirror.seed, mirrorX, mirrorY);
				}
				if (modelToMirror.paths) {
					newModel.paths = {};
					for (var id in modelToMirror.paths) {
						var pathToMirror = modelToMirror.paths[id];
						if (!pathToMirror) continue;
						var pathMirrored = MakerJs.path.mirror(pathToMirror, mirrorX, mirrorY);
						if (!pathMirrored) continue;
						newModel.paths[id] = pathMirrored;
					}
				}
				if (modelToMirror.models) {
					newModel.models = {};
					for (var id in modelToMirror.models) {
						var childModelToMirror = modelToMirror.models[id];
						if (!childModelToMirror) continue;
						var childModelMirrored = mirror(childModelToMirror, mirrorX, mirrorY);
						if (!childModelMirrored) continue;
						newModel.models[id] = childModelMirrored;
					}
				}
				if (modelToMirror.caption) {
					newModel.caption = MakerJs.cloneObject(modelToMirror.caption);
					newModel.caption.anchor = MakerJs.path.mirror(modelToMirror.caption.anchor, mirrorX, mirrorY);
				}
				return newModel;
			}
			model.mirror = mirror;
			/**
			* Move a model to an absolute point. Note that this is also accomplished by directly setting the origin property. This function exists for cascading.
			*
			* @param modelToMove The model to move.
			* @param origin The new position of the model.
			* @returns The original model (for cascading).
			*/
			function move(modelToMove, origin) {
				modelToMove.origin = MakerJs.point.clone(origin);
				return modelToMove;
			}
			model.move = move;
			/**
			* Move a model's origin by a relative amount.
			*
			* @param modelToMove The model to move.
			* @param delta The x & y adjustments as a point object.
			* @returns The original model (for cascading).
			*/
			function moveRelative(modelToMove, delta) {
				if (modelToMove) modelToMove.origin = MakerJs.point.add(modelToMove.origin || MakerJs.point.zero(), delta);
				return modelToMove;
			}
			model.moveRelative = moveRelative;
			/**
			* Prefix the ids of paths in a model.
			*
			* @param modelToPrefix The model to prefix.
			* @param prefix The prefix to prepend on paths ids.
			* @returns The original model (for cascading).
			*/
			function prefixPathIds(modelToPrefix, prefix) {
				var walkedPaths = [];
				walk(modelToPrefix, { onPath: function(walkedPath) {
					walkedPaths.push(walkedPath);
				} });
				for (var i = 0; i < walkedPaths.length; i++) {
					var walkedPath = walkedPaths[i];
					delete walkedPath.modelContext.paths[walkedPath.pathId];
					walkedPath.modelContext.paths[prefix + walkedPath.pathId] = walkedPath.pathContext;
				}
				return modelToPrefix;
			}
			model.prefixPathIds = prefixPathIds;
			/**
			* Rotate a model.
			*
			* @param modelToRotate The model to rotate.
			* @param angleInDegrees The amount of rotation, in degrees.
			* @param rotationOrigin The center point of rotation.
			* @returns The original model (for cascading).
			*/
			function rotate(modelToRotate, angleInDegrees, rotationOrigin) {
				if (rotationOrigin === void 0) rotationOrigin = [0, 0];
				if (!modelToRotate || !angleInDegrees) return modelToRotate;
				var offsetOrigin = MakerJs.point.subtract(rotationOrigin, modelToRotate.origin);
				if (modelToRotate.type === MakerJs.models.BezierCurve.typeName) MakerJs.path.rotate(modelToRotate.seed, angleInDegrees, offsetOrigin);
				if (modelToRotate.paths) for (var id in modelToRotate.paths) MakerJs.path.rotate(modelToRotate.paths[id], angleInDegrees, offsetOrigin);
				if (modelToRotate.models) for (var id in modelToRotate.models) rotate(modelToRotate.models[id], angleInDegrees, offsetOrigin);
				if (modelToRotate.caption) MakerJs.path.rotate(modelToRotate.caption.anchor, angleInDegrees, offsetOrigin);
				return modelToRotate;
			}
			model.rotate = rotate;
			/**
			* Scale a model.
			*
			* @param modelToScale The model to scale.
			* @param scaleValue The amount of scaling.
			* @param scaleOrigin Optional boolean to scale the origin point. Typically false for the root model.
			* @returns The original model (for cascading).
			*/
			function scale(modelToScale, scaleValue, scaleOrigin) {
				if (scaleOrigin === void 0) scaleOrigin = false;
				if (scaleOrigin && modelToScale.origin) modelToScale.origin = MakerJs.point.scale(modelToScale.origin, scaleValue);
				if (modelToScale.type === MakerJs.models.BezierCurve.typeName) MakerJs.path.scale(modelToScale.seed, scaleValue);
				if (modelToScale.paths) for (var id in modelToScale.paths) MakerJs.path.scale(modelToScale.paths[id], scaleValue);
				if (modelToScale.models) for (var id in modelToScale.models) scale(modelToScale.models[id], scaleValue, true);
				if (modelToScale.caption) MakerJs.path.scale(modelToScale.caption.anchor, scaleValue);
				return modelToScale;
			}
			model.scale = scale;
			/**
			* @private
			*/
			function addDistortedPath(parentModel, pathToDistort, pathId, layer, scaleX, scaleY, bezierAccuracy) {
				var distortedPath = MakerJs.path.distort(pathToDistort, scaleX, scaleY);
				layer = layer || pathToDistort.layer;
				if (layer) distortedPath.layer = layer;
				if (MakerJs.isPath(distortedPath)) if (distortedPath.type === MakerJs.pathType.BezierSeed) addModel(parentModel, new MakerJs.models.BezierCurve(distortedPath, bezierAccuracy), pathId);
				else addPath(parentModel, distortedPath, pathId);
				else addModel(parentModel, distortedPath, pathId);
			}
			/**
			* Create a distorted copy of a model - scale x and y individually.
			*
			* @param modelToDistort The model to distort.
			* @param scaleX The amount of x scaling.
			* @param scaleY The amount of y scaling.
			* @param scaleOrigin Optional boolean to scale the origin point. Typically false for the root model.
			* @param bezierAccuracy Optional accuracy of Bezier curves.
			* @returns New model (for cascading).
			*/
			function distort(modelToDistort, scaleX, scaleY, scaleOrigin, bezierAccuracy) {
				if (scaleOrigin === void 0) scaleOrigin = false;
				var distorted = {};
				if (modelToDistort.layer) distorted.layer = modelToDistort.layer;
				if (scaleOrigin && modelToDistort.origin) distorted.origin = MakerJs.point.distort(modelToDistort.origin, scaleX, scaleY);
				if (modelToDistort.type === MakerJs.models.BezierCurve.typeName) {
					var b = modelToDistort;
					var bezierPartsByLayer = MakerJs.models.BezierCurve.getBezierSeeds(b, {
						byLayers: true,
						pointMatchingDistance: bezierAccuracy
					});
					var _loop_1 = function(layer_1) {
						bezierPartsByLayer[layer_1].forEach(function(p, i) {
							addDistortedPath(distorted, p, i.toString(), layer_1, scaleX, scaleY, bezierAccuracy);
						});
					};
					for (var layer_1 in bezierPartsByLayer) _loop_1(layer_1);
				} else if (modelToDistort.paths) for (var pathId in modelToDistort.paths) {
					var pathToDistort = modelToDistort.paths[pathId];
					addDistortedPath(distorted, pathToDistort, pathId, null, scaleX, scaleY, bezierAccuracy);
				}
				if (modelToDistort.models) for (var childId in modelToDistort.models) {
					var childModel = modelToDistort.models[childId];
					addModel(distorted, distort(childModel, scaleX, scaleY, true, bezierAccuracy), childId);
				}
				if (modelToDistort.caption) {
					distorted.caption = MakerJs.cloneObject(modelToDistort.caption);
					distorted.caption.anchor = MakerJs.path.distort(modelToDistort.caption.anchor, scaleX, scaleY);
				}
				return distorted;
			}
			model.distort = distort;
			/**
			* Convert a model to match a different unit system.
			*
			* @param modeltoConvert The model to convert.
			* @param destUnitType The unit system.
			* @returns The scaled model (for cascading).
			*/
			function convertUnits(modeltoConvert, destUnitType) {
				if (modeltoConvert.units && MakerJs.units.isValidUnit(modeltoConvert.units) && MakerJs.units.isValidUnit(destUnitType)) {
					var ratio = MakerJs.units.conversionScale(modeltoConvert.units, destUnitType);
					if (ratio != 1) {
						scale(modeltoConvert, ratio);
						modeltoConvert.units = destUnitType;
					}
				}
				return modeltoConvert;
			}
			model.convertUnits = convertUnits;
			/**
			* DEPRECATED - use model.walk instead.
			* Recursively walk through all paths for a given model.
			*
			* @param modelContext The model to walk.
			* @param callback Callback for each path.
			*/
			function walkPaths(modelContext, callback) {
				if (modelContext.paths) for (var pathId in modelContext.paths) {
					if (!modelContext.paths[pathId]) continue;
					callback(modelContext, pathId, modelContext.paths[pathId]);
				}
				if (modelContext.models) for (var id in modelContext.models) {
					if (!modelContext.models[id]) continue;
					walkPaths(modelContext.models[id], callback);
				}
			}
			model.walkPaths = walkPaths;
			/**
			* Recursively walk through all child models and paths for a given model.
			*
			* @param modelContext The model to walk.
			* @param options Object containing callbacks.
			* @returns The original model (for cascading).
			*/
			function walk(modelContext, options) {
				if (!modelContext) return;
				function walkRecursive(modelContext, layer, offset, route, routeKey) {
					var newOffset = MakerJs.point.add(modelContext.origin, offset);
					layer = layer != void 0 ? layer : "";
					if (modelContext.paths) for (var pathId in modelContext.paths) {
						var pathContext = modelContext.paths[pathId];
						if (!pathContext) continue;
						var walkedPath = {
							modelContext,
							layer: pathContext.layer != void 0 ? pathContext.layer : layer,
							offset: newOffset,
							pathContext,
							pathId,
							route: route.concat(["paths", pathId]),
							routeKey: routeKey + (routeKey ? "." : "") + "paths" + JSON.stringify([pathId])
						};
						if (options.onPath) options.onPath(walkedPath);
					}
					if (modelContext.models) for (var modelId in modelContext.models) {
						var childModel = modelContext.models[modelId];
						if (!childModel) continue;
						var walkedModel = {
							parentModel: modelContext,
							layer: childModel.layer != void 0 ? childModel.layer : layer,
							offset: newOffset,
							route: route.concat(["models", modelId]),
							routeKey: routeKey + (routeKey ? "." : "") + "models" + JSON.stringify([modelId]),
							childId: modelId,
							childModel
						};
						if (options.beforeChildWalk) {
							if (!options.beforeChildWalk(walkedModel)) continue;
						}
						walkRecursive(walkedModel.childModel, walkedModel.layer, newOffset, walkedModel.route, walkedModel.routeKey);
						if (options.afterChildWalk) options.afterChildWalk(walkedModel);
					}
				}
				walkRecursive(modelContext, modelContext.layer, [0, 0], [], "");
				return modelContext;
			}
			model.walk = walk;
			/**
			* Move a model so its bounding box begins at [0, 0].
			*
			* @param modelToZero The model to zero.
			* @param zeroX Boolean to zero on the x axis. Default is true.
			* @param zeroY Boolean to zero on the y axis. Default is true.
			* @returns The original model (for cascading).
			*/
			function zero(modelToZero, zeroX, zeroY) {
				if (zeroX === void 0) zeroX = true;
				if (zeroY === void 0) zeroY = true;
				var m = MakerJs.measure.modelExtents(modelToZero);
				var z = modelToZero.origin || [0, 0];
				if (zeroX) z[0] -= m.low[0];
				if (zeroY) z[1] -= m.low[1];
				modelToZero.origin = z;
				return modelToZero;
			}
			model.zero = zero;
		})(MakerJs.model || (MakerJs.model = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(model) {
			/**
			* @private
			*/
			function getNonZeroSegments(pathToSegment, breakPoint) {
				var segment1 = MakerJs.cloneObject(pathToSegment);
				if (!segment1) return null;
				var segment2 = MakerJs.path.breakAtPoint(segment1, breakPoint);
				if (segment2) {
					var segments = [segment1, segment2];
					for (var i = 2; i--;) if (MakerJs.round(MakerJs.measure.pathLength(segments[i]), 1e-4) == 0) return null;
					return segments;
				} else if (pathToSegment.type == MakerJs.pathType.Circle) return [segment1];
				return null;
			}
			/**
			* @private
			*/
			function getPointsOnPath(points, onPath, popOptions) {
				var endpointsOnPath = [];
				points.forEach(function(p) {
					if (MakerJs.measure.isPointOnPath(p, onPath, 1e-5, null, popOptions)) endpointsOnPath.push(p);
				});
				return endpointsOnPath;
			}
			/**
			* @private
			*/
			function breakAlongForeignPath(crossedPath, overlappedSegments, foreignWalkedPath) {
				var foreignPath = foreignWalkedPath.pathContext;
				var segments = crossedPath.segments;
				if (MakerJs.measure.isPathEqual(segments[0].absolutePath, foreignPath, 1e-4, null, foreignWalkedPath.offset)) {
					segments[0].overlapped = true;
					segments[0].duplicate = true;
					overlappedSegments.push(segments[0]);
					return;
				}
				var popOptions = {};
				var options = {
					path1Offset: crossedPath.offset,
					path2Offset: foreignWalkedPath.offset
				};
				var foreignIntersection = MakerJs.path.intersection(crossedPath.pathContext, foreignPath, options);
				var intersectionPoints = foreignIntersection ? foreignIntersection.intersectionPoints : null;
				var foreignPathEndPoints = MakerJs.point.fromPathEnds(foreignPath, foreignWalkedPath.offset) || [];
				for (var i = 0; i < segments.length; i++) {
					var pointsToCheck = getPointsOnPath(intersectionPoints ? foreignPathEndPoints.concat(intersectionPoints) : foreignPathEndPoints, segments[i].absolutePath, popOptions);
					if (options.out_AreOverlapped) {
						segments[i].overlapped = true;
						overlappedSegments.push(segments[i]);
					}
					if (pointsToCheck.length > 0) {
						var subSegments = null;
						var p = 0;
						while (!subSegments && p < pointsToCheck.length) {
							subSegments = getNonZeroSegments(segments[i].absolutePath, pointsToCheck[p]);
							p++;
						}
						if (subSegments) {
							crossedPath.broken = true;
							segments[i].absolutePath = subSegments[0];
							if (subSegments[1]) {
								var newSegment = {
									absolutePath: subSegments[1],
									pathId: segments[0].pathId,
									overlapped: segments[i].overlapped,
									uniqueForeignIntersectionPoints: []
								};
								if (segments[i].overlapped) overlappedSegments.push(newSegment);
								segments.push(newSegment);
							}
							i--;
						}
					}
				}
			}
			/**
			* DEPRECATED - use measure.isPointInsideModel instead.
			* Check to see if a path is inside of a model.
			*
			* @param pathContext The path to check.
			* @param modelContext The model to check against.
			* @param farPoint Optional point of reference which is outside the bounds of the modelContext.
			* @returns Boolean true if the path is inside of the modelContext.
			*/
			function isPathInsideModel(pathContext, modelContext, pathOffset, farPoint, measureAtlas) {
				var options = {
					farPoint,
					measureAtlas
				};
				var p = MakerJs.point.add(MakerJs.point.middle(pathContext), pathOffset);
				return MakerJs.measure.isPointInsideModel(p, modelContext, options);
			}
			model.isPathInsideModel = isPathInsideModel;
			/**
			* DEPRECATED
			* Break a model's paths everywhere they intersect with another path.
			*
			* @param modelToBreak The model containing paths to be broken.
			* @param modelToIntersect Optional model containing paths to look for intersection, or else the modelToBreak will be used.
			* @returns The original model (for cascading).
			*/
			function breakPathsAtIntersections(modelToBreak, modelToIntersect) {
				var modelToBreakAtlas = new MakerJs.measure.Atlas(modelToBreak);
				modelToBreakAtlas.measureModels();
				var modelToIntersectAtlas;
				if (!modelToIntersect) {
					modelToIntersect = modelToBreak;
					modelToIntersectAtlas = modelToBreakAtlas;
				} else {
					modelToIntersectAtlas = new MakerJs.measure.Atlas(modelToIntersect);
					modelToIntersectAtlas.measureModels();
				}
				breakAllPathsAtIntersections(modelToBreak, modelToIntersect || modelToBreak, false, modelToBreakAtlas, modelToIntersectAtlas);
				return modelToBreak;
			}
			model.breakPathsAtIntersections = breakPathsAtIntersections;
			/**
			* @private
			*/
			function breakAllPathsAtIntersections(modelToBreak, modelToIntersect, checkIsInside, modelToBreakAtlas, modelToIntersectAtlas, farPoint) {
				var crossedPaths = [];
				var overlappedSegments = [];
				model.walk(modelToBreak, { onPath: function(outerWalkedPath) {
					var segment = {
						absolutePath: MakerJs.path.clone(outerWalkedPath.pathContext, outerWalkedPath.offset),
						pathId: outerWalkedPath.pathId,
						overlapped: false,
						uniqueForeignIntersectionPoints: []
					};
					var thisPath = outerWalkedPath;
					thisPath.broken = false;
					thisPath.segments = [segment];
					model.walk(modelToIntersect, {
						onPath: function(innerWalkedPath) {
							if (outerWalkedPath.pathContext !== innerWalkedPath.pathContext && MakerJs.measure.isMeasurementOverlapping(modelToBreakAtlas.pathMap[outerWalkedPath.routeKey], modelToIntersectAtlas.pathMap[innerWalkedPath.routeKey])) breakAlongForeignPath(thisPath, overlappedSegments, innerWalkedPath);
						},
						beforeChildWalk: function(innerWalkedModel) {
							var innerModelMeasurement = modelToIntersectAtlas.modelMap[innerWalkedModel.routeKey];
							return innerModelMeasurement && MakerJs.measure.isMeasurementOverlapping(modelToBreakAtlas.pathMap[outerWalkedPath.routeKey], innerModelMeasurement);
						}
					});
					if (checkIsInside) for (var i = 0; i < thisPath.segments.length; i++) {
						var p = MakerJs.point.middle(thisPath.segments[i].absolutePath);
						var pointInsideOptions = {
							measureAtlas: modelToIntersectAtlas,
							farPoint
						};
						thisPath.segments[i].isInside = MakerJs.measure.isPointInsideModel(p, modelToIntersect, pointInsideOptions);
						thisPath.segments[i].uniqueForeignIntersectionPoints = pointInsideOptions.out_intersectionPoints;
					}
					crossedPaths.push(thisPath);
				} });
				return {
					crossedPaths,
					overlappedSegments
				};
			}
			/**
			* @private
			*/
			function checkForEqualOverlaps(crossedPathsA, crossedPathsB, pointMatchingDistance) {
				function compareSegments(segment1, segment2) {
					if (MakerJs.measure.isPathEqual(segment1.absolutePath, segment2.absolutePath, pointMatchingDistance)) segment1.duplicate = segment2.duplicate = true;
				}
				function compareAll(segment) {
					for (var i = 0; i < crossedPathsB.length; i++) compareSegments(crossedPathsB[i], segment);
				}
				for (var i = 0; i < crossedPathsA.length; i++) compareAll(crossedPathsA[i]);
			}
			/**
			* @private
			*/
			function addOrDeleteSegments(crossedPath, includeInside, includeOutside, keepDuplicates, atlas, trackDeleted) {
				function addSegment(modelContext, pathIdBase, segment) {
					var id = model.getSimilarPathId(modelContext, pathIdBase);
					var newRouteKey = id == pathIdBase ? crossedPath.routeKey : MakerJs.createRouteKey(crossedPath.route.slice(0, -1).concat([id]));
					segment.addedPath = MakerJs.cloneObject(crossedPath.pathContext);
					segment.addedPath.type = segment.absolutePath.type;
					MakerJs.path.copyProps(segment.absolutePath, segment.addedPath);
					MakerJs.path.moveRelative(segment.addedPath, crossedPath.offset, true);
					modelContext.paths[id] = segment.addedPath;
					if (crossedPath.broken) {
						var measurement = MakerJs.measure.pathExtents(segment.absolutePath);
						atlas.pathMap[newRouteKey] = measurement;
						atlas.modelsMeasured = false;
					} else atlas.pathMap[newRouteKey] = savedMeasurement;
				}
				function checkAddSegment(modelContext, pathIdBase, segment) {
					if (segment.isInside && includeInside || !segment.isInside && includeOutside) addSegment(modelContext, pathIdBase, segment);
					else {
						atlas.modelsMeasured = false;
						trackDeleted(segment.absolutePath, crossedPath.routeKey, "segment is " + (segment.isInside ? "inside" : "outside") + " intersectionPoints=" + JSON.stringify(segment.uniqueForeignIntersectionPoints));
					}
				}
				var savedMeasurement = atlas.pathMap[crossedPath.routeKey];
				delete crossedPath.modelContext.paths[crossedPath.pathId];
				delete atlas.pathMap[crossedPath.routeKey];
				for (var i = 0; i < crossedPath.segments.length; i++) if (crossedPath.segments[i].duplicate) if (keepDuplicates) addSegment(crossedPath.modelContext, crossedPath.pathId, crossedPath.segments[i]);
				else trackDeleted(crossedPath.segments[i].absolutePath, crossedPath.routeKey, "segment is duplicate");
				else checkAddSegment(crossedPath.modelContext, crossedPath.pathId, crossedPath.segments[i]);
			}
			/**
			* Combine 2 models. Each model will be modified accordingly.
			*
			* @param modelA First model to combine.
			* @param modelB Second model to combine.
			* @param includeAInsideB Flag to include paths from modelA which are inside of modelB.
			* @param includeAOutsideB Flag to include paths from modelA which are outside of modelB.
			* @param includeBInsideA Flag to include paths from modelB which are inside of modelA.
			* @param includeBOutsideA Flag to include paths from modelB which are outside of modelA.
			* @param options Optional ICombineOptions object.
			* @returns A new model containing both of the input models as "a" and "b".
			*/
			function combine(modelA, modelB, includeAInsideB, includeAOutsideB, includeBInsideA, includeBOutsideA, options) {
				if (includeAInsideB === void 0) includeAInsideB = false;
				if (includeAOutsideB === void 0) includeAOutsideB = true;
				if (includeBInsideA === void 0) includeBInsideA = false;
				if (includeBOutsideA === void 0) includeBOutsideA = true;
				var opts = {
					trimDeadEnds: true,
					pointMatchingDistance: .005,
					out_deleted: [{ paths: {} }, { paths: {} }]
				};
				MakerJs.extendObject(opts, options);
				opts.measureA = opts.measureA || new MakerJs.measure.Atlas(modelA);
				opts.measureB = opts.measureB || new MakerJs.measure.Atlas(modelB);
				opts.measureA.measureModels();
				opts.measureB.measureModels();
				if (!opts.farPoint) {
					var measureBoth = MakerJs.measure.increase(MakerJs.measure.increase({
						high: [null, null],
						low: [null, null]
					}, opts.measureA.modelMap[""]), opts.measureB.modelMap[""]);
					opts.farPoint = MakerJs.point.add(measureBoth.high, [1, 1]);
				}
				var pathsA = breakAllPathsAtIntersections(modelA, modelB, true, opts.measureA, opts.measureB, opts.farPoint);
				var pathsB = breakAllPathsAtIntersections(modelB, modelA, true, opts.measureB, opts.measureA, opts.farPoint);
				checkForEqualOverlaps(pathsA.overlappedSegments, pathsB.overlappedSegments, opts.pointMatchingDistance);
				function trackDeleted(which, deletedPath, routeKey, reason) {
					model.addPath(opts.out_deleted[which], deletedPath, "deleted");
					var p = deletedPath;
					p.reason = reason;
					p.routeKey = routeKey;
				}
				for (var i = 0; i < pathsA.crossedPaths.length; i++) addOrDeleteSegments(pathsA.crossedPaths[i], includeAInsideB, includeAOutsideB, true, opts.measureA, function(p, id, reason) {
					return trackDeleted(0, p, id, reason);
				});
				for (var i = 0; i < pathsB.crossedPaths.length; i++) addOrDeleteSegments(pathsB.crossedPaths[i], includeBInsideA, includeBOutsideA, false, opts.measureB, function(p, id, reason) {
					return trackDeleted(1, p, id, reason);
				});
				var result = { models: {
					a: modelA,
					b: modelB
				} };
				if (opts.trimDeadEnds) {
					var shouldKeep;
					if (!includeAInsideB && !includeBInsideA) shouldKeep = function(walkedPath) {
						for (var i = 0; i < pathsA.overlappedSegments.length; i++) if (pathsA.overlappedSegments[i].duplicate && walkedPath.pathContext === pathsA.overlappedSegments[i].addedPath) return false;
						return true;
					};
					model.removeDeadEnds(result, null, shouldKeep, function(wp, reason) {
						trackDeleted(wp.route[1] === "a" ? 0 : 1, wp.pathContext, wp.routeKey, reason);
					});
				}
				MakerJs.extendObject(options, opts);
				return result;
			}
			model.combine = combine;
			/**
			* Combine 2 models, resulting in a intersection. Each model will be modified accordingly.
			*
			* @param modelA First model to combine.
			* @param modelB Second model to combine.
			* @returns A new model containing both of the input models as "a" and "b".
			*/
			function combineIntersection(modelA, modelB) {
				return combine(modelA, modelB, true, false, true, false);
			}
			model.combineIntersection = combineIntersection;
			/**
			* Combine 2 models, resulting in a subtraction of B from A. Each model will be modified accordingly.
			*
			* @param modelA First model to combine.
			* @param modelB Second model to combine.
			* @returns A new model containing both of the input models as "a" and "b".
			*/
			function combineSubtraction(modelA, modelB) {
				return combine(modelA, modelB, false, true, true, false);
			}
			model.combineSubtraction = combineSubtraction;
			/**
			* Combine 2 models, resulting in a union. Each model will be modified accordingly.
			*
			* @param modelA First model to combine.
			* @param modelB Second model to combine.
			* @returns A new model containing both of the input models as "a" and "b".
			*/
			function combineUnion(modelA, modelB) {
				return combine(modelA, modelB, false, true, false, true);
			}
			model.combineUnion = combineUnion;
		})(MakerJs.model || (MakerJs.model = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		MakerJs.Collector = function() {
			function Collector(comparer) {
				this.comparer = comparer;
				this.collections = [];
			}
			Collector.prototype.addItemToCollection = function(key, item) {
				var found = this.findCollection(key);
				if (found) found.push(item);
				else {
					var collection = {
						key,
						items: [item]
					};
					this.collections.push(collection);
				}
			};
			Collector.prototype.findCollection = function(key, action) {
				for (var i = 0; i < this.collections.length; i++) {
					var collection = this.collections[i];
					if (this.comparer(key, collection.key)) {
						if (action) action(i);
						return collection.items;
					}
				}
				return null;
			};
			Collector.prototype.removeCollection = function(key) {
				var _this = this;
				if (this.findCollection(key, function(index) {
					_this.collections.splice(index, 1);
				})) return true;
				return false;
			};
			Collector.prototype.removeItemFromCollection = function(key, item) {
				var collection = this.findCollection(key);
				if (!collection) return;
				for (var i = 0; i < collection.length; i++) if (collection[i] === item) {
					collection.splice(i, 1);
					return true;
				}
				return false;
			};
			Collector.prototype.getCollectionsOfMultiple = function(cb) {
				for (var i = 0; i < this.collections.length; i++) {
					var collection = this.collections[i];
					if (collection.items.length > 1) cb(collection.key, collection.items);
				}
			};
			return Collector;
		}();
		/**
		* @private
		*/
		var _kdbush = (init_src(), __toCommonJS(src_exports));
		/**
		* @private
		*/
		var kdbush = _kdbush["default"] || _kdbush;
		MakerJs.PointGraph = function() {
			function PointGraph() {
				this.reset();
			}
			/**
			* Reset the stored points, graphs, lists, to initial state.
			*/
			PointGraph.prototype.reset = function() {
				this.insertedCount = 0;
				this.graph = {};
				this.index = {};
				this.merged = {};
				this.values = [];
			};
			/**
			* Insert a value.
			* @param value Value associated with this point.
			* @returns valueId of the inserted value.
			*/
			PointGraph.prototype.insertValue = function(value) {
				this.values.push(value);
				return this.values.length - 1;
			};
			/**
			* Insert a value at a point.
			* @param p Point.
			* @param value Value associated with this point.
			*/
			PointGraph.prototype.insertValueIdAtPoint = function(valueId, p) {
				var x = p[0], y = p[1];
				if (!this.graph[x]) this.graph[x] = {};
				var pgx = this.graph[x];
				var existed = y in pgx;
				var el;
				var pointId;
				if (!existed) {
					pgx[y] = pointId = this.insertedCount++;
					el = {
						pointId,
						point: p,
						valueIds: [valueId]
					};
					this.index[pointId] = el;
				} else {
					pointId = pgx[y];
					if (pointId in this.merged) pointId = this.merged[pointId];
					el = this.index[pointId];
					el.valueIds.push(valueId);
				}
				return {
					existed,
					pointId
				};
			};
			/**
			* Merge points within a given distance from each other. Call this after inserting values.
			* @param withinDistance Distance to consider points equal.
			*/
			PointGraph.prototype.mergePoints = function(withinDistance) {
				var _this = this;
				var points = [];
				var kEls = [];
				for (var pointId in this.index) {
					var el = this.index[pointId];
					var p = el.point;
					el.kdId = points.length;
					points.push(p);
					kEls.push(el);
				}
				this.kdbush = kdbush(points);
				var _loop_2 = function(pointId) {
					if (pointId in this_1.merged) return "continue";
					var el = this_1.index[pointId];
					this_1.kdbush.within(el.point[0], el.point[1], withinDistance).forEach(function(kdId) {
						if (kdId === el.kdId) return;
						_this.mergeIndexElements(el, kEls[kdId]);
					});
				};
				var this_1 = this;
				for (var pointId in this.index) _loop_2(pointId);
			};
			/**
			* Finds all points which have only one value associated. Then, merge to the nearest other point within this set.
			* Call this after inserting values.
			* @param withinDistance Distance to consider points equal.
			*/
			PointGraph.prototype.mergeNearestSinglePoints = function(withinDistance) {
				var _this = this;
				var singles = [];
				for (var pointId in this.index) {
					var el = this.index[pointId];
					if (el.valueIds.length === 1) singles.push(el);
				}
				this.kdbush = kdbush(singles.map(function(el) {
					return el.point;
				}));
				singles.forEach(function(el) {
					if (el.pointId in _this.merged) return;
					var mergeIds = _this.kdbush.within(el.point[0], el.point[1], withinDistance);
					var byDistance = [];
					mergeIds.forEach(function(i) {
						var other = singles[i];
						if (other.pointId === el.pointId) return;
						byDistance.push({
							el: other,
							distance: MakerJs.measure.pointDistance(other.point, el.point)
						});
					});
					byDistance.sort(function(a, b) {
						return a.distance - b.distance;
					});
					for (var i = 0; i < byDistance.length; i++) {
						var other = byDistance[i].el;
						if (other.pointId in _this.merged) continue;
						if (other.merged && other.merged.length > 0) _this.mergeIndexElements(other, el);
						else _this.mergeIndexElements(el, other);
						return;
					}
				});
			};
			PointGraph.prototype.mergeIndexElements = function(keep, remove) {
				keep.merged = keep.merged || [];
				keep.merged.push(remove.pointId);
				this.merged[remove.pointId] = keep.pointId;
				keep.valueIds.push.apply(keep.valueIds, remove.valueIds);
				delete this.index[remove.pointId];
				return keep.pointId;
			};
			/**
			* Iterate over points in the index.
			* @param cb Callback for each point in the index.
			*/
			PointGraph.prototype.forEachPoint = function(cb) {
				var _this = this;
				for (var pointId = 0; pointId < this.insertedCount; pointId++) {
					var el = this.index[pointId];
					if (!el) continue;
					if (el.valueIds.length > 0) cb(el.point, el.valueIds.map(function(i) {
						return _this.values[i];
					}), pointId, el);
				}
			};
			/**
			* Gets the id of a point, after merging.
			* @param p Point to look up id.
			*/
			PointGraph.prototype.getIdOfPoint = function(p) {
				var px = this.graph[p[0]];
				if (px) {
					var pointId = px[p[1]];
					if (pointId >= 0) if (pointId in this.merged) return this.merged[pointId];
					else return pointId;
				}
			};
			/**
			* Get the index element of a point, after merging.
			* @param p Point to look up index element.
			*/
			PointGraph.prototype.getElementAtPoint = function(p) {
				var pointId = this.getIdOfPoint(p);
				if (pointId >= 0) return this.index[pointId];
			};
			return PointGraph;
		}();
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(model) {
			/**
			* @private
			*/
			function checkForOverlaps(refPaths, isOverlapping, overlapUnion) {
				var currIndex = 0;
				do {
					var root = refPaths[currIndex];
					do {
						var overlaps = false;
						for (var i = currIndex + 1; i < refPaths.length; i++) {
							var arcRef = refPaths[i];
							overlaps = isOverlapping(root.pathContext, arcRef.pathContext, false);
							if (overlaps) {
								overlapUnion(root.pathContext, arcRef.pathContext);
								delete arcRef.modelContext.paths[arcRef.pathId];
								refPaths.splice(i, 1);
								break;
							}
						}
					} while (overlaps);
					currIndex++;
				} while (currIndex < refPaths.length);
			}
			/**
			* Simplify a model's paths by reducing redundancy: combine multiple overlapping paths into a single path. The model must be originated.
			*
			* @param modelContext The originated model to search for similar paths.
			* @param options Optional options object.
			* @returns The simplified model (for cascading).
			*/
			function simplify(modelToSimplify, options) {
				function compareCircles(circleA, circleB) {
					if (Math.abs(circleA.radius - circleB.radius) <= opts.scalarMatchingDistance) return MakerJs.measure.pointDistance(circleA.origin, circleB.origin) <= opts.pointMatchingDistance;
					return false;
				}
				var similarArcs = new MakerJs.Collector(compareCircles);
				var similarCircles = new MakerJs.Collector(compareCircles);
				var similarLines = new MakerJs.Collector(MakerJs.measure.isSlopeEqual);
				var map = {};
				map[MakerJs.pathType.Arc] = function(arcRef) {
					similarArcs.addItemToCollection(arcRef.pathContext, arcRef);
				};
				map[MakerJs.pathType.Circle] = function(circleRef) {
					similarCircles.addItemToCollection(circleRef.pathContext, circleRef);
				};
				map[MakerJs.pathType.Line] = function(lineRef) {
					var slope = MakerJs.measure.lineSlope(lineRef.pathContext);
					similarLines.addItemToCollection(slope, lineRef);
				};
				var opts = {
					scalarMatchingDistance: .001,
					pointMatchingDistance: .005
				};
				MakerJs.extendObject(opts, options);
				model.walk(modelToSimplify, { onPath: function(walkedPath) {
					var fn = map[walkedPath.pathContext.type];
					if (fn) fn(walkedPath);
				} });
				similarArcs.getCollectionsOfMultiple(function(key, arcRefs) {
					checkForOverlaps(arcRefs, MakerJs.measure.isArcOverlapping, function(arcA, arcB) {
						var aEndsInB = MakerJs.measure.isBetweenArcAngles(arcA.endAngle, arcB, false);
						var bEndsInA = MakerJs.measure.isBetweenArcAngles(arcB.endAngle, arcA, false);
						if (aEndsInB && bEndsInA) {
							arcA.endAngle = arcA.startAngle + 360;
							return;
						}
						var ordered = aEndsInB ? [arcA, arcB] : [arcB, arcA];
						arcA.startAngle = MakerJs.angle.noRevolutions(ordered[0].startAngle);
						arcA.endAngle = ordered[1].endAngle;
					});
				});
				similarCircles.getCollectionsOfMultiple(function(key, circleRefs) {
					for (var i = 1; i < circleRefs.length; i++) {
						var circleRef = circleRefs[i];
						delete circleRef.modelContext.paths[circleRef.pathId];
					}
				});
				similarLines.getCollectionsOfMultiple(function(slope, arcRefs) {
					checkForOverlaps(arcRefs, MakerJs.measure.isLineOverlapping, function(lineA, lineB) {
						var box = { paths: {
							lineA,
							lineB
						} };
						var m = MakerJs.measure.modelExtents(box);
						if (!slope.hasSlope) {
							lineA.origin[1] = m.low[1];
							lineA.end[1] = m.high[1];
						} else if (slope.slope < 0) {
							lineA.origin = [m.low[0], m.high[1]];
							lineA.end = [m.high[0], m.low[1]];
						} else if (slope.slope > 0) {
							lineA.origin = m.low;
							lineA.end = m.high;
						} else {
							lineA.origin[0] = m.low[0];
							lineA.end[0] = m.high[0];
						}
					});
				});
				return modelToSimplify;
			}
			model.simplify = simplify;
		})(MakerJs.model || (MakerJs.model = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(path) {
			/**
			* @private
			*/
			var map = {};
			map[MakerJs.pathType.Arc] = function(arc, expansion, isolateCaps) {
				return new MakerJs.models.OvalArc(arc.startAngle, arc.endAngle, arc.radius, expansion, false, isolateCaps);
			};
			map[MakerJs.pathType.Circle] = function(circle, expansion, isolateCaps) {
				return new MakerJs.models.Ring(circle.radius + expansion, circle.radius - expansion);
			};
			map[MakerJs.pathType.Line] = function(line, expansion, isolateCaps) {
				return new MakerJs.models.Slot(line.origin, line.end, expansion, isolateCaps);
			};
			/**
			* Expand path by creating a model which surrounds it.
			*
			* @param pathToExpand Path to expand.
			* @param expansion Distance to expand.
			* @param isolateCaps Optional flag to put the end caps into a separate model named "caps".
			* @returns Model which surrounds the path.
			*/
			function expand(pathToExpand, expansion, isolateCaps) {
				if (!pathToExpand) return null;
				var result = null;
				var fn = map[pathToExpand.type];
				if (fn) {
					result = fn(pathToExpand, expansion, isolateCaps);
					result.origin = pathToExpand.origin;
				}
				return result;
			}
			path.expand = expand;
			/**
			* Represent an arc using straight lines.
			*
			* @param arc Arc to straighten.
			* @param bevel Optional flag to bevel the angle to prevent it from being too sharp.
			* @param prefix Optional string prefix to apply to path ids.
			* @param close Optional flag to make a closed geometry by connecting the endpoints.
			* @returns Model of straight lines with same endpoints as the arc.
			*/
			function straighten(arc, bevel, prefix, close) {
				var arcSpan = MakerJs.angle.ofArcSpan(arc);
				var joints = 1;
				if (arcSpan >= 270) joints = 4;
				else if (arcSpan > 180) joints = 3;
				else if (arcSpan > 150 || bevel) joints = 2;
				var jointAngleInRadians = MakerJs.angle.toRadians(arcSpan / joints);
				var circumscribedRadius = MakerJs.models.Polygon.circumscribedRadius(arc.radius, jointAngleInRadians);
				var ends = MakerJs.point.fromArc(arc);
				var points = [MakerJs.point.subtract(ends[0], arc.origin)];
				var a = MakerJs.angle.toRadians(arc.startAngle) + jointAngleInRadians / 2;
				for (var i = 0; i < joints; i++) {
					points.push(MakerJs.point.fromPolar(a, circumscribedRadius));
					a += jointAngleInRadians;
				}
				points.push(MakerJs.point.subtract(ends[1], arc.origin));
				var result = new MakerJs.models.ConnectTheDots(close, points);
				result.origin = arc.origin;
				if (typeof prefix === "string" && prefix.length) MakerJs.model.prefixPathIds(result, prefix);
				return result;
			}
			path.straighten = straighten;
		})(MakerJs.path || (MakerJs.path = {}));
	})(MakerJs || (MakerJs = {}));
	(function(MakerJs) {
		(function(model) {
			/**
			* Expand all paths in a model, then combine the resulting expansions.
			*
			* @param modelToExpand Model to expand.
			* @param distance Distance to expand.
			* @param joints Number of points at a joint between paths. Use 0 for round joints, 1 for pointed joints, 2 for beveled joints.
			* @param combineOptions Optional object containing combine options.
			* @returns Model which surrounds the paths of the original model.
			*/
			function expandPaths(modelToExpand, distance, joints, combineOptions) {
				if (joints === void 0) joints = 0;
				if (combineOptions === void 0) combineOptions = {};
				if (distance <= 0) return null;
				var result = { models: {
					expansions: { models: {} },
					caps: { models: {} }
				} };
				var first = true;
				var lastFarPoint = combineOptions.farPoint;
				model.walk(modelToExpand, { onPath: function(walkedPath) {
					if (combineOptions.pointMatchingDistance && MakerJs.measure.pathLength(walkedPath.pathContext) < combineOptions.pointMatchingDistance) return;
					var expandedPathModel = MakerJs.path.expand(walkedPath.pathContext, distance, true);
					if (expandedPathModel) {
						model.moveRelative(expandedPathModel, walkedPath.offset);
						var newId = model.getSimilarModelId(result.models["expansions"], walkedPath.pathId);
						model.prefixPathIds(expandedPathModel, walkedPath.pathId + "_");
						model.originate(expandedPathModel);
						if (!first) {
							model.combine(result, expandedPathModel, false, true, false, true, combineOptions);
							combineOptions.measureA.modelsMeasured = false;
							lastFarPoint = combineOptions.farPoint;
							delete combineOptions.farPoint;
							delete combineOptions.measureB;
						}
						result.models["expansions"].models[newId] = expandedPathModel;
						if (expandedPathModel.models) {
							var caps = expandedPathModel.models["Caps"];
							if (caps) {
								delete expandedPathModel.models["Caps"];
								result.models["caps"].models[newId] = caps;
							}
						}
						first = false;
					}
				} });
				if (joints) {
					var roundCaps = result.models["caps"];
					var straightCaps = { models: {} };
					result.models["straightcaps"] = straightCaps;
					model.simplify(roundCaps);
					for (var id in roundCaps.models) {
						straightCaps.models[id] = { models: {} };
						model.walk(roundCaps.models[id], { onPath: function(walkedPath) {
							var arc = walkedPath.pathContext;
							var straightened = MakerJs.path.straighten(arc, joints == 2, walkedPath.pathId + "_", true);
							model.combine(result, straightened, false, true, false, true, combineOptions);
							combineOptions.measureA.modelsMeasured = false;
							lastFarPoint = combineOptions.farPoint;
							delete combineOptions.farPoint;
							delete combineOptions.measureB;
							straightCaps.models[id].models[walkedPath.pathId] = straightened;
							delete walkedPath.modelContext.paths[walkedPath.pathId];
						} });
					}
					delete result.models["caps"];
				}
				combineOptions.farPoint = lastFarPoint;
				return result;
			}
			model.expandPaths = expandPaths;
			/**
			* @private
			*/
			function getEndlessChains(modelContext) {
				var endlessChains = [];
				model.findChains(modelContext, function(chains, loose, layer) {
					endlessChains = chains.filter(function(chain) {
						return chain.endless;
					});
				});
				return endlessChains;
			}
			/**
			* @private
			*/
			function getClosedGeometries(modelContext) {
				var endlessChains = getEndlessChains(modelContext);
				if (endlessChains.length == 0) return null;
				var closed = { models: {} };
				endlessChains.forEach(function(c, i) {
					closed.models[i] = MakerJs.chain.toNewModel(c);
				});
				return closed;
			}
			/**
			* Outline a model by a specified distance. Useful for accommodating for kerf.
			*
			* @param modelToOutline Model to outline.
			* @param distance Distance to outline.
			* @param joints Number of points at a joint between paths. Use 0 for round joints, 1 for pointed joints, 2 for beveled joints.
			* @param inside Optional boolean to draw lines inside the model instead of outside.
			* @param options Options to send to combine() function.
			* @returns Model which surrounds the paths outside of the original model.
			*/
			function outline(modelToOutline, distance, joints, inside, options) {
				if (joints === void 0) joints = 0;
				if (inside === void 0) inside = false;
				if (options === void 0) options = {};
				var expanded = expandPaths(modelToOutline, distance, joints, options);
				if (!expanded) return null;
				var closed = getClosedGeometries(modelToOutline);
				if (closed) {
					var childCount = 0;
					var result = { models: {} };
					getEndlessChains(expanded).forEach(function(c) {
						var wp = c.links[0].walkedPath;
						var isInside = MakerJs.measure.isPointInsideModel(MakerJs.point.middle(wp.pathContext), closed, wp.offset);
						if (inside && isInside || !inside && !isInside) result.models[childCount++] = MakerJs.chain.toNewModel(c);
					});
					return result;
				} else return expanded;
			}
			model.outline = outline;
		})(MakerJs.model || (MakerJs.model = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(units) {
			/**
			* The base type is arbitrary. Other conversions are then based off of this.
			* @private
			*/
			var base = MakerJs.unitType.Millimeter;
			/**
			* Initialize all known conversions here.
			* @private
			*/
			function init() {
				addBaseConversion(MakerJs.unitType.Centimeter, 10);
				addBaseConversion(MakerJs.unitType.Meter, 1e3);
				addBaseConversion(MakerJs.unitType.Inch, 25.4);
				addBaseConversion(MakerJs.unitType.Foot, 25.4 * 12);
			}
			/**
			* Table of conversions. Lazy load upon first conversion.
			* @private
			*/
			var table;
			/**
			* Add a conversion, and its inversion.
			* @private
			*/
			function addConversion(srcUnitType, destUnitType, value) {
				function row(unitType) {
					if (!table[unitType]) table[unitType] = {};
					return table[unitType];
				}
				row(srcUnitType)[destUnitType] = value;
				row(destUnitType)[srcUnitType] = 1 / value;
			}
			/**
			* Add a conversion of the base unit.
			* @private
			*/
			function addBaseConversion(destUnitType, value) {
				addConversion(destUnitType, base, value);
			}
			/**
			* Get a conversion ratio between a source unit and a destination unit.
			*
			* @param srcUnitType unitType converting from.
			* @param destUnitType unitType converting to.
			* @returns Numeric ratio of the conversion.
			*/
			function conversionScale(srcUnitType, destUnitType) {
				if (srcUnitType == destUnitType) return 1;
				if (!table) {
					table = {};
					init();
				}
				if (!table[srcUnitType][destUnitType]) addConversion(srcUnitType, destUnitType, table[srcUnitType][base] * table[base][destUnitType]);
				return table[srcUnitType] && table[srcUnitType][destUnitType];
			}
			units.conversionScale = conversionScale;
			/**
			* Check to see if unit type is a valid Maker.js unit.
			*
			* @param tryUnit unit type to check.
			* @returns Boolean true if unit type is valid.
			*/
			function isValidUnit(tryUnit) {
				for (var id in MakerJs.unitType) if (MakerJs.unitType[id] == tryUnit) return true;
				return false;
			}
			units.isValidUnit = isValidUnit;
		})(MakerJs.units || (MakerJs.units = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(measure) {
			/**
			* Find out if two angles are equal.
			*
			* @param angleA First angle.
			* @param angleB Second angle.
			* @returns true if angles are the same, false if they are not
			*/
			function isAngleEqual(angleA, angleB, accuracy) {
				if (accuracy === void 0) accuracy = 1e-4;
				var a = MakerJs.angle.noRevolutions(angleA);
				var b = MakerJs.angle.noRevolutions(angleB);
				return MakerJs.angle.noRevolutions(MakerJs.round(b - a, accuracy)) == 0;
			}
			measure.isAngleEqual = isAngleEqual;
			/**
			* @private
			*/
			var pathAreEqualMap = {};
			pathAreEqualMap[MakerJs.pathType.Line] = function(lineA, lineB, withinPointDistance) {
				return isPointEqual(lineA.origin, lineB.origin, withinPointDistance) && isPointEqual(lineA.end, lineB.end, withinPointDistance) || isPointEqual(lineA.origin, lineB.end, withinPointDistance) && isPointEqual(lineA.end, lineB.origin, withinPointDistance);
			};
			pathAreEqualMap[MakerJs.pathType.Circle] = function(circleA, circleB, withinPointDistance) {
				return isPointEqual(circleA.origin, circleB.origin, withinPointDistance) && circleA.radius == circleB.radius;
			};
			pathAreEqualMap[MakerJs.pathType.Arc] = function(arcA, arcB, withinPointDistance) {
				return pathAreEqualMap[MakerJs.pathType.Circle](arcA, arcB, withinPointDistance) && isAngleEqual(arcA.startAngle, arcB.startAngle) && isAngleEqual(arcA.endAngle, arcB.endAngle);
			};
			/**
			* Find out if two paths are equal.
			*
			* @param pathA First path.
			* @param pathB Second path.
			* @returns true if paths are the same, false if they are not
			*/
			function isPathEqual(pathA, pathB, withinPointDistance, pathAOffset, pathBOffset) {
				var result = false;
				if (pathA.type == pathB.type) {
					var fn = pathAreEqualMap[pathA.type];
					if (fn) {
						function getResult() {
							result = fn(pathA, pathB, withinPointDistance);
						}
						if (pathAOffset || pathBOffset) MakerJs.path.moveTemporary([pathA, pathB], [pathAOffset, pathBOffset], getResult);
						else getResult();
					}
				}
				return result;
			}
			measure.isPathEqual = isPathEqual;
			/**
			* Find out if two points are equal.
			*
			* @param a First point.
			* @param b Second point.
			* @param withinDistance Optional distance to consider points equal.
			* @returns true if points are the same, false if they are not
			*/
			function isPointEqual(a, b, withinDistance) {
				if (!withinDistance) return MakerJs.round(a[0] - b[0]) == 0 && MakerJs.round(a[1] - b[1]) == 0;
				else {
					if (!a || !b) return false;
					return measure.pointDistance(a, b) <= withinDistance;
				}
			}
			measure.isPointEqual = isPointEqual;
			/**
			* Find out if a point is distinct among an array of points.
			*
			* @param pointToCheck point to check.
			* @param pointArray array of points.
			* @param withinDistance Optional distance to consider points equal.
			* @returns false if point is equal to any point in the array.
			*/
			function isPointDistinct(pointToCheck, pointArray, withinDistance) {
				for (var i = 0; i < pointArray.length; i++) if (isPointEqual(pointArray[i], pointToCheck, withinDistance)) return false;
				return true;
			}
			measure.isPointDistinct = isPointDistinct;
			/**
			* Find out if point is on a slope.
			*
			* @param p Point to check.
			* @param b Slope.
			* @param withinDistance Optional distance of tolerance.
			* @returns true if point is on the slope
			*/
			function isPointOnSlope(p, slope, withinDistance) {
				if (withinDistance === void 0) withinDistance = 0;
				if (slope.hasSlope) return Math.abs(p[1] - (slope.slope * p[0] + slope.yIntercept)) <= withinDistance;
				else return Math.abs(p[0] - slope.line.origin[0]) <= withinDistance;
			}
			measure.isPointOnSlope = isPointOnSlope;
			/**
			* Find out if point is on a circle.
			*
			* @param p Point to check.
			* @param circle Circle.
			* @param withinDistance Optional distance of tolerance.
			* @returns true if point is on the circle
			*/
			function isPointOnCircle(p, circle, withinDistance) {
				if (withinDistance === void 0) withinDistance = 0;
				return Math.abs(measure.pointDistance(p, circle.origin) - circle.radius) <= withinDistance;
			}
			measure.isPointOnCircle = isPointOnCircle;
			/**
			* @private
			*/
			var onPathMap = {};
			onPathMap[MakerJs.pathType.Circle] = function(p, circle, withinDistance) {
				return isPointOnCircle(p, circle, withinDistance);
			};
			onPathMap[MakerJs.pathType.Arc] = function(p, arc, withinDistance) {
				if (onPathMap[MakerJs.pathType.Circle](p, arc, withinDistance)) {
					var a = MakerJs.angle.ofPointInDegrees(arc.origin, p);
					return measure.isBetweenArcAngles(a, arc, false);
				}
				return false;
			};
			onPathMap[MakerJs.pathType.Line] = function(p, line, withinDistance, options) {
				var slope = options && options.cachedLineSlope || measure.lineSlope(line);
				if (options && !options.cachedLineSlope) options.cachedLineSlope = slope;
				return isPointOnSlope(p, slope, withinDistance) && measure.isBetweenPoints(p, line, false);
			};
			/**
			* Find out if a point lies on a path.
			* @param pointToCheck point to check.
			* @param onPath path to check against.
			* @param withinDistance Optional distance to consider point on the path.
			* @param pathOffset Optional offset of path from [0, 0].
			* @param options Optional IIsPointOnPathOptions to cache computation.
			*/
			function isPointOnPath(pointToCheck, onPath, withinDistance, pathOffset, options) {
				if (withinDistance === void 0) withinDistance = 0;
				var fn = onPathMap[onPath.type];
				if (fn) return fn(pointToCheck, pathOffset ? MakerJs.path.clone(onPath, pathOffset) : onPath, withinDistance, options);
				return false;
			}
			measure.isPointOnPath = isPointOnPath;
			/**
			* Check for slope equality.
			*
			* @param slopeA The ISlope to test.
			* @param slopeB The ISlope to check for equality.
			* @returns Boolean true if slopes are equal.
			*/
			function isSlopeEqual(slopeA, slopeB) {
				if (!isSlopeParallel(slopeA, slopeB)) return false;
				if (!slopeA.hasSlope && !slopeB.hasSlope) return MakerJs.round(slopeA.line.origin[0] - slopeB.line.origin[0]) == 0;
				var slopes = [slopeA, slopeB];
				var angles = slopes.map(function(s) {
					return MakerJs.angle.toDegrees(Math.atan(s.slope));
				});
				var lines = slopes.map(function(s) {
					return MakerJs.path.clone(s.line);
				});
				var origin = lines[0].origin;
				lines.forEach(function(l, i) {
					return MakerJs.path.rotate(l, -angles[i], origin);
				});
				var averageYs = lines.map(function(l) {
					return (l.origin[1] + l.end[1]) / 2;
				});
				return MakerJs.round(averageYs[0] - averageYs[1], 1e-5) == 0;
			}
			measure.isSlopeEqual = isSlopeEqual;
			/**
			* Check for parallel slopes.
			*
			* @param slopeA The ISlope to test.
			* @param slopeB The ISlope to check for parallel.
			* @returns Boolean true if slopes are parallel.
			*/
			function isSlopeParallel(slopeA, slopeB) {
				if (!slopeA.hasSlope && !slopeB.hasSlope) return true;
				if (slopeA.hasSlope && slopeB.hasSlope && MakerJs.round(slopeA.slope - slopeB.slope, 1e-5) == 0) return true;
				return false;
			}
			measure.isSlopeParallel = isSlopeParallel;
		})(MakerJs.measure || (MakerJs.measure = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(measure) {
			/**
			* Increase a measurement by an additional measurement.
			*
			* @param baseMeasure The measurement to increase.
			* @param addMeasure The additional measurement.
			* @param augmentBaseMeasure Optional flag to call measure.augment on the measurement.
			* @returns The increased original measurement (for cascading).
			*/
			function increase(baseMeasure, addMeasure, augmentBaseMeasure) {
				function getExtreme(basePoint, newPoint, fn) {
					if (!newPoint) return;
					for (var i = 2; i--;) {
						if (newPoint[i] == null) continue;
						if (basePoint[i] == null) basePoint[i] = newPoint[i];
						else basePoint[i] = fn(basePoint[i], newPoint[i]);
					}
				}
				if (addMeasure) {
					getExtreme(baseMeasure.low, addMeasure.low, Math.min);
					getExtreme(baseMeasure.high, addMeasure.high, Math.max);
				}
				if (augmentBaseMeasure) augment(baseMeasure);
				return baseMeasure;
			}
			measure.increase = increase;
			/**
			* Check for arc being concave or convex towards a given point.
			*
			* @param arc The arc to test.
			* @param towardsPoint The point to test.
			* @returns Boolean true if arc is concave towards point.
			*/
			function isArcConcaveTowardsPoint(arc, towardsPoint) {
				if (pointDistance(arc.origin, towardsPoint) <= arc.radius) return true;
				var midPointToNearPoint = new MakerJs.paths.Line(MakerJs.point.middle(arc), towardsPoint);
				var options = {};
				if (MakerJs.path.intersection(midPointToNearPoint, new MakerJs.paths.Chord(arc), options) || options.out_AreOverlapped) return true;
				return false;
			}
			measure.isArcConcaveTowardsPoint = isArcConcaveTowardsPoint;
			/**
			* DEPRECATED - use isArcSpanOverlapping() instead.
			*/
			function isArcOverlapping(arcA, arcB, excludeTangents) {
				return isArcSpanOverlapping(arcA, arcB, excludeTangents);
			}
			measure.isArcOverlapping = isArcOverlapping;
			/**
			* Check for arc overlapping another arc.
			*
			* @param arcA The arc to test.
			* @param arcB The arc to check for overlap.
			* @param excludeTangents Boolean to exclude exact endpoints and only look for deep overlaps.
			* @returns Boolean true if arcA is overlapped with arcB.
			*/
			function isArcSpanOverlapping(arcA, arcB, excludeTangents) {
				function checkAngles(a, b) {
					function checkAngle(n) {
						return isBetweenArcAngles(n, a, excludeTangents);
					}
					return checkAngle(b.startAngle) || checkAngle(b.endAngle);
				}
				return checkAngles(arcA, arcB) || checkAngles(arcB, arcA) || arcA.startAngle == arcB.startAngle && arcA.endAngle == arcB.endAngle;
			}
			measure.isArcSpanOverlapping = isArcSpanOverlapping;
			/**
			* Check if a given number is between two given limits.
			*
			* @param valueInQuestion The number to test.
			* @param limitA First limit.
			* @param limitB Second limit.
			* @param exclusive Flag to exclude equaling the limits.
			* @returns Boolean true if value is between (or equal to) the limits.
			*/
			function isBetween(valueInQuestion, limitA, limitB, exclusive) {
				if (exclusive) return Math.min(limitA, limitB) < valueInQuestion && valueInQuestion < Math.max(limitA, limitB);
				else return Math.min(limitA, limitB) <= valueInQuestion && valueInQuestion <= Math.max(limitA, limitB);
			}
			measure.isBetween = isBetween;
			/**
			* Check if a given angle is between an arc's start and end angles.
			*
			* @param angleInQuestion The angle to test.
			* @param arc Arc to test against.
			* @param exclusive Flag to exclude equaling the start or end angles.
			* @returns Boolean true if angle is between (or equal to) the arc's start and end angles.
			*/
			function isBetweenArcAngles(angleInQuestion, arc, exclusive) {
				var startAngle = MakerJs.angle.noRevolutions(arc.startAngle);
				var endAngle = startAngle + MakerJs.angle.ofArcSpan(arc);
				angleInQuestion = MakerJs.angle.noRevolutions(angleInQuestion);
				return isBetween(angleInQuestion, startAngle, endAngle, exclusive) || isBetween(angleInQuestion, startAngle + 360, endAngle + 360, exclusive) || isBetween(angleInQuestion, startAngle - 360, endAngle - 360, exclusive);
			}
			measure.isBetweenArcAngles = isBetweenArcAngles;
			/**
			* Check if a given point is between a line's end points.
			*
			* @param pointInQuestion The point to test.
			* @param line Line to test against.
			* @param exclusive Flag to exclude equaling the origin or end points.
			* @returns Boolean true if point is between (or equal to) the line's origin and end points.
			*/
			function isBetweenPoints(pointInQuestion, line, exclusive) {
				var oneDimension = false;
				for (var i = 2; i--;) {
					if (MakerJs.round(line.origin[i] - line.end[i], 1e-6) == 0) {
						if (oneDimension) return false;
						oneDimension = true;
						continue;
					}
					var origin_value = MakerJs.round(line.origin[i]);
					var end_value = MakerJs.round(line.end[i]);
					if (!isBetween(MakerJs.round(pointInQuestion[i]), origin_value, end_value, exclusive)) return false;
				}
				return true;
			}
			measure.isBetweenPoints = isBetweenPoints;
			/**
			* Check if a given bezier seed has all points on the same slope.
			*
			* @param seed The bezier seed to test.
			* @param exclusive Optional boolean to test only within the boundary of the endpoints.
			* @returns Boolean true if bezier seed has control points on the line slope and between the line endpoints.
			*/
			function isBezierSeedLinear(seed, exclusive) {
				var slope = lineSlope(seed);
				for (var i = 0; i < seed.controls.length; i++) if (!measure.isPointOnSlope(seed.controls[i], slope)) {
					if (!exclusive) return false;
					if (isBetweenPoints(seed.controls[i], seed, false)) return false;
				}
				return true;
			}
			measure.isBezierSeedLinear = isBezierSeedLinear;
			/**
			* @private
			*/
			var graham_scan = require_graham_scan_min();
			/**
			* @private
			*/
			function serializePoint(p) {
				return p.join(",");
			}
			/**
			* Check for flow of paths in a chain being clockwise or not.
			*
			* @param chainContext The chain to test.
			* @param out_result Optional output object, if provided, will be populated with convex hull results.
			* @returns Boolean true if paths in the chain flow clockwise.
			*/
			function isChainClockwise(chainContext, out_result) {
				if (!chainContext.endless || chainContext.links.length === 1) return null;
				return isPointArrayClockwise(MakerJs.chain.toKeyPoints(chainContext), out_result);
			}
			measure.isChainClockwise = isChainClockwise;
			/**
			* Check for array of points being clockwise or not.
			*
			* @param points The array of points to test.
			* @param out_result Optional output object, if provided, will be populated with convex hull results.
			* @returns Boolean true if points flow clockwise.
			*/
			function isPointArrayClockwise(points, out_result) {
				var convexHull = new graham_scan();
				var pointsInOrder = [];
				function add(endPoint) {
					convexHull.addPoint(endPoint[0], endPoint[1]);
					pointsInOrder.push(serializePoint(endPoint));
				}
				points.forEach(add);
				var hull = convexHull.getHull();
				var hullPoints = hull.slice(0, 3).map(function(p) {
					return serializePoint([p.x, p.y]);
				});
				var ordered = [];
				pointsInOrder.forEach(function(p) {
					if (~hullPoints.indexOf(p)) ordered.push(p);
				});
				switch (ordered.indexOf(hullPoints[1])) {
					case 0:
						ordered.unshift(ordered.pop());
						break;
					case 2:
						ordered.push(ordered.shift());
						break;
				}
				if (out_result) {
					out_result.hullPoints = hull.map(function(p) {
						return [p.x, p.y];
					});
					out_result.keyPoints = points;
				}
				return hullPoints[0] != ordered[0];
			}
			measure.isPointArrayClockwise = isPointArrayClockwise;
			/**
			* Check for line overlapping another line.
			*
			* @param lineA The line to test.
			* @param lineB The line to check for overlap.
			* @param excludeTangents Boolean to exclude exact endpoints and only look for deep overlaps.
			* @returns Boolean true if lineA is overlapped with lineB.
			*/
			function isLineOverlapping(lineA, lineB, excludeTangents) {
				function checkPoints(index, a, b) {
					function checkPoint(p) {
						return isBetweenPoints(p, a, excludeTangents);
					}
					return checkPoint(b.origin) || checkPoint(b.end);
				}
				return checkPoints(0, lineA, lineB) || checkPoints(1, lineB, lineA);
			}
			measure.isLineOverlapping = isLineOverlapping;
			/**
			* Check for measurement overlapping another measurement.
			*
			* @param measureA The measurement to test.
			* @param measureB The measurement to check for overlap.
			* @returns Boolean true if measureA is overlapped with measureB.
			*/
			function isMeasurementOverlapping(measureA, measureB) {
				for (var i = 2; i--;) if (!(MakerJs.round(measureA.low[i] - measureB.high[i]) <= 0 && MakerJs.round(measureA.high[i] - measureB.low[i]) >= 0)) return false;
				return true;
			}
			measure.isMeasurementOverlapping = isMeasurementOverlapping;
			/**
			* Gets the slope of a line.
			*/
			function lineSlope(line) {
				var dx = line.end[0] - line.origin[0];
				if (MakerJs.round(dx, 1e-6) == 0) return {
					line,
					hasSlope: false
				};
				var slope = (line.end[1] - line.origin[1]) / dx;
				return {
					line,
					hasSlope: true,
					slope,
					yIntercept: line.origin[1] - slope * line.origin[0]
				};
			}
			measure.lineSlope = lineSlope;
			/**
			* Calculates the distance between two points.
			*
			* @param a First point.
			* @param b Second point.
			* @returns Distance between points.
			*/
			function pointDistance(a, b) {
				var dx = b[0] - a[0];
				var dy = b[1] - a[1];
				return Math.sqrt(dx * dx + dy * dy);
			}
			measure.pointDistance = pointDistance;
			/**
			* @private
			*/
			function getExtremePoint(a, b, fn) {
				return [fn(a[0], b[0]), fn(a[1], b[1])];
			}
			/**
			* @private
			*/
			var pathExtentsMap = {};
			pathExtentsMap[MakerJs.pathType.Line] = function(line) {
				return {
					low: getExtremePoint(line.origin, line.end, Math.min),
					high: getExtremePoint(line.origin, line.end, Math.max)
				};
			};
			pathExtentsMap[MakerJs.pathType.Circle] = function(circle) {
				var r = circle.radius;
				return {
					low: MakerJs.point.add(circle.origin, [-r, -r]),
					high: MakerJs.point.add(circle.origin, [r, r])
				};
			};
			pathExtentsMap[MakerJs.pathType.Arc] = function(arc) {
				var r = arc.radius;
				var arcPoints = MakerJs.point.fromArc(arc);
				function extremeAngle(xyAngle, value, fn) {
					var extremePoint = getExtremePoint(arcPoints[0], arcPoints[1], fn);
					for (var i = 2; i--;) if (isBetweenArcAngles(xyAngle[i], arc, false)) extremePoint[i] = value + arc.origin[i];
					return extremePoint;
				}
				return {
					low: extremeAngle([180, 270], -r, Math.min),
					high: extremeAngle([360, 90], r, Math.max)
				};
			};
			/**
			* Calculates the smallest rectangle which contains a path.
			*
			* @param pathToMeasure The path to measure.
			* @returns object with low and high points.
			*/
			function pathExtents(pathToMeasure, addOffset) {
				if (pathToMeasure) {
					var fn = pathExtentsMap[pathToMeasure.type];
					if (fn) {
						var m = fn(pathToMeasure);
						if (addOffset) {
							m.high = MakerJs.point.add(m.high, addOffset);
							m.low = MakerJs.point.add(m.low, addOffset);
						}
						return m;
					}
				}
				return {
					low: null,
					high: null
				};
			}
			measure.pathExtents = pathExtents;
			/**
			* @private
			*/
			var pathLengthMap = {};
			pathLengthMap[MakerJs.pathType.Line] = function(line) {
				return pointDistance(line.origin, line.end);
			};
			pathLengthMap[MakerJs.pathType.Circle] = function(circle) {
				return 2 * Math.PI * circle.radius;
			};
			pathLengthMap[MakerJs.pathType.Arc] = function(arc) {
				var value = pathLengthMap[MakerJs.pathType.Circle](arc);
				var pct = MakerJs.angle.ofArcSpan(arc) / 360;
				value *= pct;
				return value;
			};
			pathLengthMap[MakerJs.pathType.BezierSeed] = function(seed) {
				return MakerJs.models.BezierCurve.computeLength(seed);
			};
			/**
			* Measures the length of a path.
			*
			* @param pathToMeasure The path to measure.
			* @returns Length of the path.
			*/
			function pathLength(pathToMeasure) {
				if (pathToMeasure) {
					var fn = pathLengthMap[pathToMeasure.type];
					if (fn) return fn(pathToMeasure);
				}
				return 0;
			}
			measure.pathLength = pathLength;
			/**
			* Measures the length of all paths in a model.
			*
			* @param modelToMeasure The model containing paths to measure.
			* @returns Length of all paths in the model.
			*/
			function modelPathLength(modelToMeasure) {
				var total = 0;
				MakerJs.model.walk(modelToMeasure, { onPath: function(walkedPath) {
					total += pathLength(walkedPath.pathContext);
				} });
				return total;
			}
			measure.modelPathLength = modelPathLength;
			/**
			* @private
			*/
			function cloneMeasure(measureToclone) {
				return {
					high: MakerJs.point.clone(measureToclone.high),
					low: MakerJs.point.clone(measureToclone.low)
				};
			}
			/**
			* Measures the smallest rectangle which contains a model.
			*
			* @param modelToMeasure The model to measure.
			* @param atlas Optional atlas to save measurements.
			* @returns object with low and high points.
			*/
			function modelExtents(modelToMeasure, atlas) {
				function increaseParentModel(childRoute, childMeasurement) {
					if (!childMeasurement) return;
					var parentRoute = childRoute.slice(0, -2);
					var parentRouteKey = MakerJs.createRouteKey(parentRoute);
					if (!(parentRouteKey in atlas.modelMap)) atlas.modelMap[parentRouteKey] = cloneMeasure(childMeasurement);
					else increase(atlas.modelMap[parentRouteKey], childMeasurement);
				}
				if (!atlas) atlas = new Atlas(modelToMeasure);
				MakerJs.model.walk(modelToMeasure, {
					onPath: function(walkedPath) {
						if (!(walkedPath.routeKey in atlas.pathMap)) atlas.pathMap[walkedPath.routeKey] = pathExtents(walkedPath.pathContext, walkedPath.offset);
						increaseParentModel(walkedPath.route, atlas.pathMap[walkedPath.routeKey]);
					},
					afterChildWalk: function(walkedModel) {
						increaseParentModel(walkedModel.route, atlas.modelMap[walkedModel.routeKey]);
					}
				});
				atlas.modelsMeasured = true;
				var m = atlas.modelMap[""];
				if (m) return augment(m);
				return null;
			}
			measure.modelExtents = modelExtents;
			/**
			* Augment a measurement - add more properties such as center point, height and width.
			*
			* @param measureToAugment The measurement to augment.
			* @returns Measurement object with augmented properties.
			*/
			function augment(measureToAugment) {
				var m = measureToAugment;
				m.center = MakerJs.point.average(m.high, m.low);
				m.width = m.high[0] - m.low[0];
				m.height = m.high[1] - m.low[1];
				return m;
			}
			measure.augment = augment;
			/**
			* A list of maps of measurements.
			*
			* @param modelToMeasure The model to measure.
			* @param atlas Optional atlas to save measurements.
			* @returns object with low and high points.
			*/
			var Atlas = function() {
				/**
				* Constructor.
				* @param modelContext The model to measure.
				*/
				function Atlas(modelContext) {
					this.modelContext = modelContext;
					/**
					* Flag that models have been measured.
					*/
					this.modelsMeasured = false;
					/**
					* Map of model measurements, mapped by routeKey.
					*/
					this.modelMap = {};
					/**
					* Map of path measurements, mapped by routeKey.
					*/
					this.pathMap = {};
				}
				Atlas.prototype.measureModels = function() {
					if (!this.modelsMeasured) modelExtents(this.modelContext, this);
				};
				return Atlas;
			}();
			measure.Atlas = Atlas;
			/**
			* @private
			*/
			function loopIndex(base, i) {
				if (i >= base) return i - base;
				if (i < 0) return i + base;
				return i;
			}
			/**
			* @private
			*/
			function yAtX(slope, x) {
				return slope.slope * x + slope.yIntercept;
			}
			/**
			* @private
			*/
			function pointOnSlopeAtX(line, x) {
				return [x, yAtX(lineSlope(line), x)];
			}
			/**
			* @private
			*/
			function isCircular(bounds) {
				for (var i = 1; i < 3; i++) if (!measure.isPointEqual(bounds[0].center, bounds[i].center, 1e-6) || !(MakerJs.round(bounds[0].width - bounds[i].width) === 0)) return false;
				return true;
			}
			/**
			* @private
			*/
			function getAngledBounds(index, modelToMeasure, rotateModel, rotatePaths) {
				MakerJs.model.rotate(modelToMeasure, rotateModel);
				var m = modelExtents(modelToMeasure);
				var result = {
					index,
					rotation: rotatePaths,
					center: MakerJs.point.rotate(m.center, rotatePaths),
					width: m.height,
					height: m.width,
					bottom: new MakerJs.paths.Line(m.low, [m.high[0], m.low[1]]),
					middle: new MakerJs.paths.Line([m.low[0], m.center[1]], [m.high[0], m.center[1]]),
					top: new MakerJs.paths.Line(m.high, [m.low[0], m.high[1]])
				};
				[
					result.top,
					result.middle,
					result.bottom
				].forEach(function(line) {
					return MakerJs.path.rotate(line, rotatePaths);
				});
				return result;
			}
			/**
			* @private
			*/
			function hexSolution(lines, bounds) {
				var tip = lines[1].origin;
				var tipX = tip[0];
				var left = lines[3].origin[0];
				var right = lines[0].origin[0];
				var altRight = tipX - right;
				if (right - left > 2 * altRight) return null;
				var altLeft = (tipX - left) / 3;
				if (altRight < altLeft) return null;
				var altitudeViaSide = Math.min(altLeft, altRight);
				var radiusViaSide = MakerJs.solvers.equilateralSide(altitudeViaSide);
				var peakRadii = [MakerJs.point.fromSlopeIntersection(lines[1], lines[2]), MakerJs.point.fromSlopeIntersection(lines[4], lines[5])].map(function(p) {
					return Math.abs(p[1] - tip[1]);
				});
				var peakNum = peakRadii[0] > peakRadii[1] ? 0 : 1;
				var radiusViaPeak = peakRadii[peakNum];
				if (radiusViaPeak > radiusViaSide) {
					var altitudeViaPeak = MakerJs.solvers.equilateralAltitude(radiusViaPeak);
					var peakX = tipX - 2 * altitudeViaPeak;
					if (right > peakX + altitudeViaPeak) return null;
					if (left < peakX - altitudeViaPeak) return null;
					var leftGap = left - peakX + altitudeViaPeak;
					var peakGap = 2 * altitudeViaPeak - bounds[peakNum + 1].width;
					var minHalfGap = Math.min(leftGap, peakGap) / 2;
					return {
						origin: pointOnSlopeAtX(bounds[2 - peakNum].middle, peakX + minHalfGap),
						radius: radiusViaPeak,
						type: "peak " + peakNum
					};
				} else return {
					origin: [tipX - 2 * altitudeViaSide, tip[1]],
					radius: radiusViaSide,
					type: "side"
				};
			}
			/**
			* Measures the minimum bounding hexagon surrounding a model. The hexagon is oriented such that the right and left sides are vertical, and the top and bottom are pointed.
			*
			* @param modelToMeasure The model to measure.
			* @returns IBoundingHex object which is a hexagon model, with an additional radius property.
			*/
			function boundingHexagon(modelToMeasure) {
				var clone = MakerJs.cloneObject(modelToMeasure);
				MakerJs.model.originate(clone);
				var originalMeasure = modelExtents(clone);
				var bounds = [];
				var scratch = { paths: {} };
				MakerJs.model.center(clone);
				function result(radius, origin, notes) {
					return {
						radius,
						paths: new MakerJs.models.Polygon(6, radius, 30).paths,
						origin: MakerJs.point.add(origin, originalMeasure.center),
						notes
					};
				}
				var boundRotations = [
					[90, -90],
					[-60, -30],
					[-60, 30]
				];
				while (boundRotations.length) {
					var rotation = boundRotations.shift();
					var bound = getAngledBounds(bounds.length, clone, rotation[0], rotation[1]);
					var side = MakerJs.solvers.equilateralSide(bound.width / 2);
					if (side >= bound.height) return result(side, bound.center, "solved by bound " + bounds.length);
					bounds.push(bound);
				}
				if (isCircular(bounds)) return result(MakerJs.solvers.equilateralSide(bounds[0].width / 2), bounds[0].center, "solved as circular");
				var perimeters = bounds.map(function(b) {
					return b.top;
				}).concat(bounds.map(function(b) {
					return b.bottom;
				}));
				perimeters.forEach(function(p, i) {
					scratch.paths[i] = p;
					MakerJs.path.converge(perimeters[loopIndex(6, i + 2)], p, true);
				});
				bounds.forEach(function(b, i) {
					scratch.paths["m" + i] = b.middle;
				});
				var boundCopy = bounds.slice();
				var solution;
				for (var i = 0; i < 6; i++) {
					if (i > 0) {
						perimeters.push(perimeters.shift());
						boundCopy.push(boundCopy.shift());
						MakerJs.model.rotate(scratch, -60);
					}
					var s = hexSolution(perimeters, boundCopy);
					if (s) {
						if (!solution || s.radius < solution.radius) {
							solution = s;
							solution.index = i;
						}
					}
				}
				var p = MakerJs.point.rotate(solution.origin, solution.index * 60);
				return result(solution.radius, p, "solved by " + solution.index + " as " + solution.type);
			}
			measure.boundingHexagon = boundingHexagon;
			/**
			* @private
			*/
			function addUniquePoints(pointArray, pointsToAdd) {
				var added = 0;
				pointsToAdd.forEach(function(p) {
					if (!measure.isPointDistinct(p, pointArray, 1e-8)) return;
					pointArray.push(p);
					added++;
				});
				return added;
			}
			/**
			* @private
			*/
			function getFarPoint(modelContext, farPoint, measureAtlas) {
				if (farPoint) return farPoint;
				var high = modelExtents(modelContext).high;
				if (high) return MakerJs.point.add(high, [1, 1]);
				return [7654321, 1234567];
			}
			/**
			* Check to see if a point is inside of a model.
			*
			* @param pointToCheck The point to check.
			* @param modelContext The model to check against.
			* @param options Optional IMeasurePointInsideOptions object.
			* @returns Boolean true if the path is inside of the modelContext.
			*/
			function isPointInsideModel(pointToCheck, modelContext, options) {
				if (options === void 0) options = {};
				if (!options.farPoint) options.farPoint = getFarPoint(modelContext, options.farPoint, options.measureAtlas);
				options.out_intersectionPoints = [];
				var isInside;
				var lineToFarPoint = new MakerJs.paths.Line(pointToCheck, options.farPoint);
				var measureFarPoint = pathExtents(lineToFarPoint);
				MakerJs.model.walk(modelContext, {
					onPath: function(walkedPath) {
						if (options.measureAtlas && !isMeasurementOverlapping(measureFarPoint, options.measureAtlas.pathMap[walkedPath.routeKey])) return;
						var intersectOptions = { path2Offset: walkedPath.offset };
						var farInt = MakerJs.path.intersection(lineToFarPoint, walkedPath.pathContext, intersectOptions);
						if (farInt) {
							if (addUniquePoints(options.out_intersectionPoints, farInt.intersectionPoints) % 2 == 1) isInside = !!!isInside;
						}
					},
					beforeChildWalk: function(innerWalkedModel) {
						if (!options.measureAtlas) return true;
						var innerModelMeasurement = options.measureAtlas.modelMap[innerWalkedModel.routeKey];
						return innerModelMeasurement && isMeasurementOverlapping(measureFarPoint, innerModelMeasurement);
					}
				});
				return !!isInside;
			}
			measure.isPointInsideModel = isPointInsideModel;
		})(MakerJs.measure || (MakerJs.measure = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(exporter) {
			/**
			* Renders an item in JSON.
			*
			* @param itemToExport Item to render: may be a path, an array of paths, or a model object.
			* @param options Rendering options object.
			* @param options.accuracy Optional exemplar of number of decimal places.
			* @param options.indentation Optional number of characters to indent after a newline.
			* @returns String of DXF content.
			*/
			function toJson(itemToExport, options) {
				if (options === void 0) options = {};
				function replacer(key, value) {
					if (MakerJs.isNumber(value)) return MakerJs.round(value, options.accuracy);
					if (MakerJs.isPoint(value)) return MakerJs.point.rounded(value, options.accuracy);
					return value;
				}
				return JSON.stringify(itemToExport, options.accuracy && replacer, options.indentation);
			}
			exporter.toJson = toJson;
			/**
			* Try to get the unit system from a model
			* @private
			*/
			function tryGetModelUnits(itemToExport) {
				if (MakerJs.isModel(itemToExport)) return itemToExport.units;
			}
			exporter.tryGetModelUnits = tryGetModelUnits;
			/**
			* Named colors, safe for CSS and DXF
			* 17 colors from https://www.w3.org/TR/CSS21/syndata.html#value-def-color mapped to DXF equivalent AutoDesk Color Index
			*/
			exporter.colors = {
				black: 0,
				red: 1,
				yellow: 2,
				lime: 3,
				aqua: 4,
				blue: 5,
				fuchsia: 6,
				white: 7,
				gray: 9,
				maroon: 14,
				orange: 30,
				olive: 58,
				green: 94,
				teal: 134,
				navy: 174,
				purple: 214,
				silver: 254
			};
		})(MakerJs.exporter || (MakerJs.exporter = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(importer) {
			/**
			* Create a numeric array from a string of numbers. The numbers may be delimited by anything non-numeric.
			*
			* Example:
			* ```
			* var n = makerjs.importer.parseNumericList('5, 10, 15.20 25-30-35 4e1 .5');
			* ```
			*
			* @param s The string of numbers.
			* @returns Array of numbers.
			*/
			function parseNumericList(s) {
				var result = [];
				var re = /-?(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
				var matches;
				while ((matches = re.exec(s)) !== null) {
					if (matches.index === re.lastIndex) re.lastIndex++;
					if (matches[0] !== "") result.push(parseFloat(matches[0]));
				}
				return result;
			}
			importer.parseNumericList = parseNumericList;
		})(MakerJs.importer || (MakerJs.importer = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(exporter) {
			/**
			* Renders an item in AutoDesk DFX file format.
			*
			* @param itemToExport Item to render: may be a path, an array of paths, or a model object.
			* @param options Rendering options object.
			* @param options.units String of the unit system. May be omitted. See makerjs.unitType for possible values.
			* @returns String of DXF content.
			*/
			function toDXF(itemToExport, options) {
				if (options === void 0) options = {};
				var opts = { fontSize: 9 };
				var layerIds = [];
				var doc = {
					entities: [],
					header: {},
					tables: {}
				};
				MakerJs.extendObject(opts, options);
				if (MakerJs.isModel(itemToExport)) {
					var modelToExport = itemToExport;
					if (modelToExport.exporterOptions) MakerJs.extendObject(opts, modelToExport.exporterOptions["toDXF"]);
				}
				function colorLayerOptions(layer) {
					if (opts.layerOptions && opts.layerOptions[layer]) return opts.layerOptions[layer];
					if (layer in exporter.colors) return { color: exporter.colors[layer] };
				}
				function lineTypeLayerOptions(layer) {
					if (opts.layerOptions && opts.layerOptions[layer] && opts.layerOptions[layer].lineType) return opts.layerOptions[layer].lineType;
					return "CONTINUOUS";
				}
				function defaultLayer(pathContext, parentLayer) {
					var layerId = pathContext && pathContext.layer || parentLayer || "0";
					if (layerIds.indexOf(layerId) < 0) layerIds.push(layerId);
					return layerId;
				}
				var map = {};
				map[MakerJs.pathType.Line] = function(line, offset, layer) {
					var layerId = defaultLayer(line, layer);
					var lineEntity = {
						type: "LINE",
						layer: layerId,
						vertices: [{
							x: MakerJs.round(line.origin[0] + offset[0], opts.accuracy),
							y: MakerJs.round(line.origin[1] + offset[1], opts.accuracy)
						}, {
							x: MakerJs.round(line.end[0] + offset[0], opts.accuracy),
							y: MakerJs.round(line.end[1] + offset[1], opts.accuracy)
						}]
					};
					lineEntity.lineType = lineTypeLayerOptions(layerId);
					return lineEntity;
				};
				map[MakerJs.pathType.Circle] = function(circle, offset, layer) {
					var layerId = defaultLayer(circle, layer);
					var circleEntity = {
						type: "CIRCLE",
						layer: layerId,
						center: {
							x: MakerJs.round(circle.origin[0] + offset[0], opts.accuracy),
							y: MakerJs.round(circle.origin[1] + offset[1], opts.accuracy)
						},
						radius: MakerJs.round(circle.radius, opts.accuracy)
					};
					circleEntity.lineType = lineTypeLayerOptions(layerId);
					return circleEntity;
				};
				map[MakerJs.pathType.Arc] = function(arc, offset, layer) {
					var layerId = defaultLayer(arc, layer);
					var arcEntity = {
						type: "ARC",
						layer: layerId,
						center: {
							x: MakerJs.round(arc.origin[0] + offset[0], opts.accuracy),
							y: MakerJs.round(arc.origin[1] + offset[1], opts.accuracy)
						},
						radius: MakerJs.round(arc.radius, opts.accuracy),
						startAngle: MakerJs.round(arc.startAngle, opts.accuracy),
						endAngle: MakerJs.round(arc.endAngle, opts.accuracy)
					};
					arcEntity.lineType = lineTypeLayerOptions(layerId);
					return arcEntity;
				};
				function appendVertex(v, layer, bulge) {
					return {
						type: "VERTEX",
						layer: defaultLayer(null, layer),
						x: MakerJs.round(v[0], opts.accuracy),
						y: MakerJs.round(v[1], opts.accuracy),
						bulge
					};
				}
				function polyline(c) {
					var polylineEntity = {
						type: "POLYLINE",
						layer: defaultLayer(null, c.layer),
						shape: c.chain.endless,
						vertices: []
					};
					polylineEntity.lineType = lineTypeLayerOptions(polylineEntity.layer);
					c.chain.links.forEach(function(link, i) {
						var bulge;
						if (link.walkedPath.pathContext.type === MakerJs.pathType.Arc) {
							var arc = link.walkedPath.pathContext;
							bulge = MakerJs.round(Math.tan(MakerJs.angle.toRadians(MakerJs.angle.ofArcSpan(arc)) / 4), opts.accuracy);
							if (link.reversed) bulge *= -1;
						}
						var vertex = link.endPoints[link.reversed ? 1 : 0];
						polylineEntity.vertices.push(appendVertex(vertex, c.layer, bulge));
					});
					if (!c.chain.endless) {
						var lastLink = c.chain.links[c.chain.links.length - 1];
						var endPoint = lastLink.endPoints[lastLink.reversed ? 0 : 1];
						polylineEntity.vertices.push(appendVertex(endPoint, c.layer));
					}
					return polylineEntity;
				}
				function text(caption) {
					var layerId = defaultLayer(null, caption.layer);
					var layerOptions = colorLayerOptions(layerId);
					var center = MakerJs.point.middle(caption.anchor);
					return {
						type: "TEXT",
						startPoint: appendVertex(center, null),
						endPoint: appendVertex(center, null),
						layer: layerId,
						textHeight: layerOptions && layerOptions.fontSize || opts.fontSize,
						text: caption.text,
						halign: 4,
						valign: 0,
						rotation: MakerJs.angle.ofPointInDegrees(caption.anchor.origin, caption.anchor.end)
					};
				}
				function layerOut(layerId, layerColor) {
					var layerEntity = {
						name: layerId,
						color: layerColor
					};
					layerEntity.lineType = lineTypeLayerOptions(layerId);
					return layerEntity;
				}
				function lineTypesOut() {
					var lineStyleTable = { lineTypes: {
						"CONTINUOUS": {
							name: "CONTINUOUS",
							description: "______",
							patternLength: 0,
							elements: []
						},
						"DASHED": {
							name: "DASHED",
							description: "_ _ _ ",
							elements: [5, -2.5],
							patternLength: 7.5
						},
						"DOTTED": {
							name: "DOTTED",
							description: ". . . ",
							elements: [.5, -1],
							patternLength: 1.5
						}
					} };
					var tableName = "lineType";
					doc.tables[tableName] = lineStyleTable;
				}
				function layersOut() {
					var layerTable = { layers: {} };
					layerIds.forEach(function(layerId) {
						var layerOptions = colorLayerOptions(layerId);
						if (layerOptions) layerTable.layers[layerId] = layerOut(layerId, layerOptions.color);
					});
					var tableName = "layer";
					doc.tables[tableName] = layerTable;
				}
				function header() {
					if (opts.units) {
						var units = dxfUnit[opts.units];
						doc.header["$INSUNITS"] = units;
					}
				}
				function entities(walkedPaths, chains, captions) {
					var entityArray = doc.entities;
					entityArray.push.apply(entityArray, chains.map(polyline));
					walkedPaths.forEach(function(walkedPath) {
						var fn = map[walkedPath.pathContext.type];
						if (fn) {
							var entity = fn(walkedPath.pathContext, walkedPath.offset, walkedPath.layer);
							entityArray.push(entity);
						}
					});
					entityArray.push.apply(entityArray, captions.map(text));
				}
				if (!opts.units) {
					var units = exporter.tryGetModelUnits(itemToExport);
					if (units) opts.units = units;
				}
				MakerJs.extendObject(options, opts);
				var chainsOnLayers = [];
				var walkedPaths = [];
				if (opts.usePOLYLINE) {
					var cb = function(chains, loose, layer) {
						chains.forEach(function(c) {
							if (c.endless && c.links.length === 1 && c.links[0].walkedPath.pathContext.type === MakerJs.pathType.Circle) {
								walkedPaths.push(c.links[0].walkedPath);
								return;
							}
							var chainOnLayer = {
								chain: c,
								layer
							};
							chainsOnLayers.push(chainOnLayer);
						});
						walkedPaths.push.apply(walkedPaths, loose);
					};
					MakerJs.model.findChains(modelToExport, cb, {
						byLayers: true,
						pointMatchingDistance: opts.pointMatchingDistance
					});
				} else MakerJs.model.walk(modelToExport, { onPath: function(walkedPath) {
					walkedPaths.push(walkedPath);
				} });
				entities(walkedPaths, chainsOnLayers, MakerJs.model.getAllCaptionsOffset(modelToExport));
				header();
				lineTypesOut();
				layersOut();
				return outputDocument(doc);
			}
			exporter.toDXF = toDXF;
			/**
			* @private
			*/
			function outputDocument(doc) {
				var dxf = [];
				function append() {
					var values = [];
					for (var _i = 0; _i < arguments.length; _i++) values[_i] = arguments[_i];
					dxf.push.apply(dxf, values);
				}
				function appendLineType(entity) {
					var lt = entity.lineType;
					if (lt) append("6", lt);
				}
				var map = {};
				map["LINE"] = function(line) {
					append("0", "LINE", "8", line.layer);
					appendLineType(line);
					append("10", line.vertices[0].x, "20", line.vertices[0].y, "11", line.vertices[1].x, "21", line.vertices[1].y);
				};
				map["CIRCLE"] = function(circle) {
					append("0", "CIRCLE", "8", circle.layer);
					appendLineType(circle);
					append("10", circle.center.x, "20", circle.center.y, "40", circle.radius);
				};
				map["ARC"] = function(arc) {
					append("0", "ARC", "8", arc.layer);
					appendLineType(arc);
					append("10", arc.center.x, "20", arc.center.y, "40", arc.radius, "50", arc.startAngle, "51", arc.endAngle);
				};
				map["VERTEX"] = function(vertex) {
					append("0", "VERTEX", "8", vertex.layer, "10", vertex.x, "20", vertex.y);
					if (vertex.bulge !== void 0) append("42", vertex.bulge);
				};
				map["POLYLINE"] = function(polyline) {
					append("0", "POLYLINE", "8", polyline.layer);
					appendLineType(polyline);
					append("66", 1, "70", polyline.shape ? 1 : 0);
					polyline.vertices.forEach(function(vertex) {
						return map["VERTEX"](vertex);
					});
					append("0", "SEQEND");
				};
				map["TEXT"] = function(text) {
					append("0", "TEXT", "10", text.startPoint.x, "20", text.startPoint.y, "11", text.endPoint.x, "21", text.endPoint.y, "40", text.textHeight, "1", text.text, "50", text.rotation, "8", text.layer, "72", text.halign, "73", text.valign);
				};
				function section(sectionFn) {
					append("0", "SECTION");
					sectionFn();
					append("0", "ENDSEC");
				}
				function table(fn) {
					append("0", "TABLE");
					fn();
					append("0", "ENDTAB");
				}
				function tables() {
					append("2", "TABLES");
					table(lineTypesOut);
					table(layersOut);
				}
				function layerOut(layer) {
					var lt = layer.lineType || "CONTINUOUS";
					append("0", "LAYER", "2", layer.name, "70", "0", "62", layer.color, "6", lt);
				}
				function lineTypeOut(lineType) {
					var elements = lineType.elements || [];
					append("0", "LTYPE", "72", "65", "70", "0", "2", lineType.name, "3", lineType.description, "73", elements.length, "40", lineType.patternLength);
					elements.forEach(function(e) {
						return append("49", e);
					});
				}
				function lineTypesOut() {
					var lineTypeTable = doc.tables["lineType"];
					append("2", "LTYPE");
					for (var lineTypeId in lineTypeTable.lineTypes) {
						var lineType = lineTypeTable.lineTypes[lineTypeId];
						lineTypeOut(lineType);
					}
				}
				function layersOut() {
					var layerTable = doc.tables["layer"];
					append("2", "LAYER");
					for (var layerId in layerTable.layers) {
						var layer = layerTable.layers[layerId];
						layerOut(layer);
					}
				}
				function header() {
					append("2", "HEADER");
					for (var key in doc.header) {
						var value = doc.header[key];
						append("9", key, "70", value);
					}
				}
				function entities(entityArray) {
					append("2", "ENTITIES");
					entityArray.forEach(function(entity) {
						var fn = map[entity.type];
						if (fn) fn(entity);
					});
				}
				section(header);
				section(tables);
				section(function() {
					return entities(doc.entities);
				});
				append("0", "EOF");
				return dxf.join("\n");
			}
			/**
			* @private
			*/
			var dxfUnit = {};
			dxfUnit[""] = 0;
			dxfUnit[MakerJs.unitType.Inch] = 1;
			dxfUnit[MakerJs.unitType.Foot] = 2;
			dxfUnit[MakerJs.unitType.Millimeter] = 4;
			dxfUnit[MakerJs.unitType.Centimeter] = 5;
			dxfUnit[MakerJs.unitType.Meter] = 6;
		})(MakerJs.exporter || (MakerJs.exporter = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(solvers) {
			/**
			* @private
			*/
			var equilateral = Math.sqrt(3) / 2;
			/**
			* Solves for the altitude of an equilateral triangle when you know its side length.
			*
			* @param sideLength Length of a side of the equilateral triangle (all 3 sides are equal).
			* @returns Altitude of the equilateral triangle.
			*/
			function equilateralAltitude(sideLength) {
				return sideLength * equilateral;
			}
			solvers.equilateralAltitude = equilateralAltitude;
			/**
			* Solves for the side length of an equilateral triangle when you know its altitude.
			*
			* @param altitude Altitude of the equilateral triangle.
			* @returns Length of the side of the equilateral triangle (all 3 sides are equal).
			*/
			function equilateralSide(altitude) {
				return altitude / equilateral;
			}
			solvers.equilateralSide = equilateralSide;
			/**
			* Solves for the angle of a triangle when you know lengths of 3 sides.
			*
			* @param lengthA Length of side of triangle, opposite of the angle you are trying to find.
			* @param lengthB Length of any other side of the triangle.
			* @param lengthC Length of the remaining side of the triangle.
			* @returns Angle opposite of the side represented by the first parameter.
			*/
			function solveTriangleSSS(lengthA, lengthB, lengthC) {
				return MakerJs.angle.toDegrees(Math.acos((lengthB * lengthB + lengthC * lengthC - lengthA * lengthA) / (2 * lengthB * lengthC)));
			}
			solvers.solveTriangleSSS = solveTriangleSSS;
			/**
			* Solves for the length of a side of a triangle when you know length of one side and 2 angles.
			*
			* @param oppositeAngleInDegrees Angle which is opposite of the side you are trying to find.
			* @param lengthOfSideBetweenAngles Length of one side of the triangle which is between the provided angles.
			* @param otherAngleInDegrees An other angle of the triangle.
			* @returns Length of the side of the triangle which is opposite of the first angle parameter.
			*/
			function solveTriangleASA(oppositeAngleInDegrees, lengthOfSideBetweenAngles, otherAngleInDegrees) {
				var angleOppositeSide = 180 - oppositeAngleInDegrees - otherAngleInDegrees;
				return lengthOfSideBetweenAngles * Math.sin(MakerJs.angle.toRadians(oppositeAngleInDegrees)) / Math.sin(MakerJs.angle.toRadians(angleOppositeSide));
			}
			solvers.solveTriangleASA = solveTriangleASA;
			/**
			* Solves for the angles of the tangent lines between 2 circles.
			*
			* @param a First circle.
			* @param b Second circle.
			* @param inner Boolean to use inner tangents instead of outer tangents.
			* @returns Array of angles in degrees where 2 lines between the circles will be tangent to both circles.
			*/
			function circleTangentAngles(a, b, inner) {
				if (inner === void 0) inner = false;
				var connect = new MakerJs.paths.Line(a.origin, b.origin);
				var distance = MakerJs.measure.pointDistance(a.origin, b.origin);
				if (a.radius >= distance + b.radius || b.radius >= distance + a.radius) return null;
				if (inner && a.radius + b.radius >= distance) return null;
				var tangentAngles;
				if (!inner && MakerJs.round(a.radius - b.radius) == 0) tangentAngles = [90, 270];
				else {
					var d2 = distance / 2;
					var between = new MakerJs.paths.Circle([d2, 0], d2);
					var diff = new MakerJs.paths.Circle(a.radius > b.radius ? [0, 0] : [distance, 0], inner ? a.radius + b.radius : Math.abs(a.radius - b.radius));
					var int = MakerJs.path.intersection(diff, between);
					if (!int || !int.path1Angles) return null;
					tangentAngles = int.path1Angles;
				}
				var connectAngle = MakerJs.angle.ofLineInDegrees(connect);
				return tangentAngles.map(function(a) {
					return MakerJs.angle.noRevolutions(a + connectAngle);
				});
			}
			solvers.circleTangentAngles = circleTangentAngles;
		})(MakerJs.solvers || (MakerJs.solvers = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(path) {
			/**
			* @private
			*/
			var map = {};
			map[MakerJs.pathType.Arc] = {};
			map[MakerJs.pathType.Circle] = {};
			map[MakerJs.pathType.Line] = {};
			map[MakerJs.pathType.Arc][MakerJs.pathType.Arc] = function(arc1, arc2, options, swapOffsets) {
				var result = null;
				moveTemp([arc1, arc2], options, swapOffsets, function() {
					var angles = circleToCircle(arc1, arc2, options);
					if (angles) {
						var arc1Angles = getAnglesWithinArc(angles[0], arc1, options);
						var arc2Angles = getAnglesWithinArc(angles[1], arc2, options);
						if (arc1Angles && arc2Angles) if (arc1Angles.length === 1 || arc2Angles.length === 1) for (var i1 = 0; i1 < arc1Angles.length; i1++) for (var i2 = 0; i2 < arc2Angles.length; i2++) {
							var p1 = MakerJs.point.fromAngleOnCircle(arc1Angles[i1], arc1);
							var p2 = MakerJs.point.fromAngleOnCircle(arc2Angles[i2], arc2);
							if (MakerJs.measure.isPointEqual(p1, p2, 1e-4)) {
								result = {
									intersectionPoints: [p1],
									path1Angles: [arc1Angles[i1]],
									path2Angles: [arc2Angles[i2]]
								};
								return;
							}
						}
						else result = {
							intersectionPoints: pointsFromAnglesOnCircle(arc1Angles, arc1),
							path1Angles: arc1Angles,
							path2Angles: arc2Angles
						};
					} else if (options.out_AreOverlapped) options.out_AreOverlapped = MakerJs.measure.isArcOverlapping(arc1, arc2, options.excludeTangents);
				});
				return result;
			};
			map[MakerJs.pathType.Arc][MakerJs.pathType.Circle] = function(arc, circle, options, swapOffsets) {
				var result = null;
				moveTemp([arc, circle], options, swapOffsets, function() {
					var angles = circleToCircle(arc, circle, options);
					if (angles) {
						var arcAngles = getAnglesWithinArc(angles[0], arc, options);
						if (arcAngles) {
							var circleAngles;
							if (arcAngles.length == 2) circleAngles = angles[1];
							else {
								var index = findCorrespondingAngleIndex(angles[0], arcAngles[0]);
								circleAngles = [angles[1][index]];
							}
							result = {
								intersectionPoints: pointsFromAnglesOnCircle(arcAngles, arc),
								path1Angles: arcAngles,
								path2Angles: circleAngles
							};
						}
					}
				});
				return result;
			};
			map[MakerJs.pathType.Arc][MakerJs.pathType.Line] = function(arc, line, options, swapOffsets) {
				var result = null;
				moveTemp([arc, line], options, swapOffsets, function() {
					var angles = lineToCircle(line, arc, options);
					if (angles) {
						var arcAngles = getAnglesWithinArc(angles, arc, options);
						if (arcAngles) result = {
							intersectionPoints: pointsFromAnglesOnCircle(arcAngles, arc),
							path1Angles: arcAngles
						};
					}
				});
				return result;
			};
			map[MakerJs.pathType.Circle][MakerJs.pathType.Arc] = function(circle, arc, options) {
				var result = map[MakerJs.pathType.Arc][MakerJs.pathType.Circle](arc, circle, options, true);
				if (result) return swapAngles(result);
				return null;
			};
			map[MakerJs.pathType.Circle][MakerJs.pathType.Circle] = function(circle1, circle2, options, swapOffsets) {
				var result = null;
				moveTemp([circle1, circle2], options, swapOffsets, function() {
					var angles = circleToCircle(circle1, circle2, options);
					if (angles) result = {
						intersectionPoints: pointsFromAnglesOnCircle(angles[0], circle1),
						path1Angles: angles[0],
						path2Angles: angles[1]
					};
				});
				return result;
			};
			map[MakerJs.pathType.Circle][MakerJs.pathType.Line] = function(circle, line, options, swapOffsets) {
				var result = null;
				moveTemp([circle, line], options, swapOffsets, function() {
					var angles = lineToCircle(line, circle, options);
					if (angles) result = {
						intersectionPoints: pointsFromAnglesOnCircle(angles, circle),
						path1Angles: angles
					};
				});
				return result;
			};
			map[MakerJs.pathType.Line][MakerJs.pathType.Arc] = function(line, arc, options) {
				var result = map[MakerJs.pathType.Arc][MakerJs.pathType.Line](arc, line, options, true);
				if (result) return swapAngles(result);
				return null;
			};
			map[MakerJs.pathType.Line][MakerJs.pathType.Circle] = function(line, circle, options) {
				var result = map[MakerJs.pathType.Circle][MakerJs.pathType.Line](circle, line, options, true);
				if (result) return swapAngles(result);
				return null;
			};
			map[MakerJs.pathType.Line][MakerJs.pathType.Line] = function(line1, line2, options, swapOffsets) {
				var result = null;
				moveTemp([line1, line2], options, swapOffsets, function() {
					var intersectionPoint = MakerJs.point.fromSlopeIntersection(line1, line2, options);
					if (intersectionPoint) {
						if (MakerJs.measure.isBetweenPoints(intersectionPoint, line1, options.excludeTangents) && MakerJs.measure.isBetweenPoints(intersectionPoint, line2, options.excludeTangents)) result = { intersectionPoints: [intersectionPoint] };
					}
				});
				return result;
			};
			/**
			* @private
			*/
			function moveTemp(pathsToOffset, options, swapOffsets, task) {
				var offsets = swapOffsets ? [options.path2Offset, options.path1Offset] : [options.path1Offset, options.path2Offset];
				path.moveTemporary(pathsToOffset, offsets, task);
			}
			/**
			* @private
			*/
			function swapAngles(result) {
				var temp = result.path1Angles;
				if (result.path2Angles) result.path1Angles = result.path2Angles;
				else delete result.path1Angles;
				if (temp) result.path2Angles = temp;
				return result;
			}
			/**
			* Find the point(s) where 2 paths intersect.
			*
			* @param path1 First path to find intersection.
			* @param path2 Second path to find intersection.
			* @param options Optional IPathIntersectionOptions.
			* @returns IPathIntersection object, with points(s) of intersection (and angles, when a path is an arc or circle); or null if the paths did not intersect.
			*/
			function intersection(path1, path2, options) {
				if (options === void 0) options = {};
				if (path1 && path2) {
					var fn = map[path1.type][path2.type];
					if (fn) return fn(path1, path2, options);
				}
				return null;
			}
			path.intersection = intersection;
			/**
			* @private
			*/
			function findCorrespondingAngleIndex(circleAngles, arcAngle) {
				for (var i = 2; i--;) if (circleAngles[i] === arcAngle) return i;
			}
			/**
			* @private
			*/
			function pointsFromAnglesOnCircle(anglesInDegrees, circle) {
				var result = [];
				for (var i = 0; i < anglesInDegrees.length; i++) result.push(MakerJs.point.fromAngleOnCircle(anglesInDegrees[i], circle));
				return result;
			}
			/**
			* @private
			*/
			function getAnglesWithinArc(angles, arc, options) {
				if (!angles) return null;
				var anglesWithinArc = [];
				for (var i = 0; i < angles.length; i++) if (MakerJs.measure.isBetweenArcAngles(angles[i], arc, options.excludeTangents)) anglesWithinArc.push(angles[i]);
				if (anglesWithinArc.length == 0) return null;
				return anglesWithinArc;
			}
			/**
			* @private
			*/
			function lineToCircle(line, circle, options) {
				var radius = MakerJs.round(circle.radius);
				if (circle.radius <= 0) return null;
				var clonedLine = new MakerJs.paths.Line(MakerJs.point.subtract(line.origin, circle.origin), MakerJs.point.subtract(line.end, circle.origin));
				var lineAngleNormal = MakerJs.angle.ofLineInDegrees(line);
				var lineAngle = lineAngleNormal >= 180 ? lineAngleNormal - 360 : lineAngleNormal;
				path.rotate(clonedLine, -lineAngle, MakerJs.point.zero());
				function unRotate(resultAngle) {
					var unrotated = resultAngle + lineAngle;
					return MakerJs.round(MakerJs.angle.noRevolutions(unrotated));
				}
				var lineY = MakerJs.round(clonedLine.origin[1]);
				var lineYabs = Math.abs(lineY);
				if (lineYabs > radius) return null;
				var anglesOfIntersection = [];
				if (lineYabs == radius) {
					if (options.excludeTangents) return null;
					anglesOfIntersection.push(unRotate(lineY > 0 ? 90 : 270));
				} else {
					function intersectionBetweenEndpoints(x, angleOfX) {
						if (MakerJs.measure.isBetween(MakerJs.round(x), MakerJs.round(clonedLine.origin[0]), MakerJs.round(clonedLine.end[0]), options.excludeTangents)) anglesOfIntersection.push(unRotate(angleOfX));
					}
					var intersectRadians = Math.asin(lineY / radius);
					var intersectDegrees = MakerJs.angle.toDegrees(intersectRadians);
					var intersectX = Math.cos(intersectRadians) * radius;
					intersectionBetweenEndpoints(-intersectX, 180 - intersectDegrees);
					intersectionBetweenEndpoints(intersectX, intersectDegrees);
				}
				if (anglesOfIntersection.length > 0) return anglesOfIntersection;
				return null;
			}
			/**
			* @private
			*/
			function circleToCircle(circle1, circle2, options) {
				if (circle1.radius <= 0 || circle2.radius <= 0) return null;
				if (circle1.radius == circle2.radius && MakerJs.measure.isPointEqual(circle1.origin, circle2.origin, 1e-4)) {
					options.out_AreOverlapped = true;
					return null;
				}
				MakerJs.point.subtract(MakerJs.point.zero(), circle1.origin);
				var c1 = new MakerJs.paths.Circle(MakerJs.point.zero(), circle1.radius);
				var c2 = new MakerJs.paths.Circle(MakerJs.point.subtract(circle2.origin, circle1.origin), circle2.radius);
				var c2Angle = MakerJs.angle.ofPointInDegrees(MakerJs.point.zero(), c2.origin);
				path.rotate(c2, -c2Angle, MakerJs.point.zero());
				function unRotate(resultAngle) {
					var unrotated = resultAngle + c2Angle;
					return MakerJs.angle.noRevolutions(unrotated);
				}
				var x = c2.origin[0];
				if (MakerJs.round(c2.radius - x - c1.radius) == 0) {
					if (options.excludeTangents) return null;
					return [[unRotate(180)], [unRotate(180)]];
				}
				if (MakerJs.round(c2.radius + x - c1.radius) == 0) {
					if (options.excludeTangents) return null;
					return [[unRotate(0)], [unRotate(0)]];
				}
				if (MakerJs.round(x - c2.radius - c1.radius) == 0) {
					if (options.excludeTangents) return null;
					return [[unRotate(0)], [unRotate(180)]];
				}
				if (MakerJs.round(x - c2.radius) > c1.radius) return null;
				if (MakerJs.round(x + c2.radius) < c1.radius) return null;
				if (MakerJs.round(x - c2.radius) < -c1.radius) return null;
				function bothAngles(oneAngle) {
					return [unRotate(oneAngle), unRotate(MakerJs.angle.mirror(oneAngle, false, true))];
				}
				var c1IntersectionAngle = MakerJs.solvers.solveTriangleSSS(c2.radius, c1.radius, x);
				var c2IntersectionAngle = MakerJs.solvers.solveTriangleSSS(c1.radius, x, c2.radius);
				return [bothAngles(c1IntersectionAngle), bothAngles(180 - c2IntersectionAngle)];
			}
		})(MakerJs.path || (MakerJs.path = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(path) {
			/**
			* @private
			*/
			var propertyNamesMap = {};
			propertyNamesMap[MakerJs.pathType.Arc] = function(arc) {
				return ["startAngle", "endAngle"];
			};
			propertyNamesMap[MakerJs.pathType.Line] = function(line) {
				return ["origin", "end"];
			};
			/**
			* @private
			*/
			function getPointProperties(pathToInspect) {
				var points = MakerJs.point.fromPathEnds(pathToInspect);
				if (points) {
					function pointProperty(index) {
						return {
							point: points[index],
							propertyName: propertyNames[index]
						};
					}
					var propertyNames = null;
					var fn = propertyNamesMap[pathToInspect.type];
					if (fn) {
						propertyNames = fn(pathToInspect);
						return [pointProperty(0), pointProperty(1)];
					}
				}
				return null;
			}
			/**
			* @private
			*/
			function getMatchingPointProperties(pathA, pathB, options) {
				var pathAProperties = getPointProperties(pathA);
				var pathBProperties = getPointProperties(pathB);
				var result = null;
				function makeMatch(pathContext, pointProperties, index) {
					return {
						path: pathContext,
						isStart: index == 0,
						propertyName: pointProperties[index].propertyName,
						point: pointProperties[index].point,
						oppositePoint: pointProperties[1 - index].point
					};
				}
				function check(iA, iB) {
					if (MakerJs.measure.isPointEqual(pathAProperties[iA].point, pathBProperties[iB].point, 1e-4)) {
						result = [makeMatch(pathA, pathAProperties, iA), makeMatch(pathB, pathBProperties, iB)];
						return true;
					}
					return false;
				}
				check(0, 0) || check(0, 1) || check(1, 0) || check(1, 1);
				return result;
			}
			/**
			* @private
			*/
			function populateShardPointsFromReferenceCircle(filletRadius, center, properties, options) {
				var referenceCircle = new MakerJs.paths.Circle(center, filletRadius);
				for (var i = 0; i < 2; i++) {
					var circleIntersection = path.intersection(referenceCircle, properties[i].path);
					if (!circleIntersection) return false;
					properties[i].shardPoint = circleIntersection.intersectionPoints[0];
					if (MakerJs.measure.isPointEqual(properties[i].point, circleIntersection.intersectionPoints[0], 1e-4)) if (circleIntersection.intersectionPoints.length > 1) properties[i].shardPoint = circleIntersection.intersectionPoints[1];
					else return false;
				}
				return true;
			}
			/**
			* @private
			*/
			function cloneAndBreakPath(pathToShard, shardPoint) {
				var shardStart = path.clone(pathToShard);
				return [shardStart, path.breakAtPoint(shardStart, shardPoint)];
			}
			/**
			* @private
			*/
			var guidePathMap = {};
			guidePathMap[MakerJs.pathType.Arc] = function(arc, filletRadius, nearPoint, shardPoint, isStart) {
				var guideRadius = arc.radius;
				var guideArcShard = cloneAndBreakPath(arc, shardPoint)[isStart ? 0 : 1];
				if (guideArcShard) {
					if (MakerJs.measure.isArcConcaveTowardsPoint(guideArcShard, nearPoint)) guideRadius -= filletRadius;
					else guideRadius += filletRadius;
					if (MakerJs.round(guideRadius) <= 0) return null;
					return new MakerJs.paths.Arc(arc.origin, guideRadius, arc.startAngle, arc.endAngle);
				}
				return null;
			};
			guidePathMap[MakerJs.pathType.Line] = function(line, filletRadius, nearPoint, shardPoint, isStart) {
				return new MakerJs.paths.Parallel(line, filletRadius, nearPoint);
			};
			/**
			* @private
			*/
			function getGuidePath(context, filletRadius, nearPoint) {
				var result = null;
				var fn = guidePathMap[context.path.type];
				if (fn) result = fn(context.path, filletRadius, nearPoint, context.shardPoint, context.isStart);
				return result;
			}
			/**
			* @private
			*/
			var filletResultMap = {};
			filletResultMap[MakerJs.pathType.Arc] = function(arc, propertyName, filletRadius, filletCenter) {
				var guideLine = new MakerJs.paths.Line(arc.origin, filletCenter);
				var guideLineAngle = MakerJs.angle.ofLineInDegrees(guideLine);
				var filletAngle = guideLineAngle;
				if (!MakerJs.measure.isArcConcaveTowardsPoint(arc, filletCenter)) filletAngle += 180;
				return {
					filletAngle: MakerJs.angle.noRevolutions(filletAngle),
					clipPath: function() {
						arc[propertyName] = guideLineAngle;
					}
				};
			};
			filletResultMap[MakerJs.pathType.Line] = function(line, propertyName, filletRadius, filletCenter) {
				var guideLine = new MakerJs.paths.Line([0, 0], [0, 1]);
				var lineAngle = MakerJs.angle.ofLineInDegrees(line);
				path.rotate(guideLine, lineAngle, [0, 0]);
				path.moveRelative(guideLine, filletCenter);
				var intersectionPoint = MakerJs.point.fromSlopeIntersection(line, guideLine);
				if (intersectionPoint) return {
					filletAngle: MakerJs.angle.ofPointInDegrees(filletCenter, intersectionPoint),
					clipPath: function() {
						line[propertyName] = intersectionPoint;
					}
				};
				return null;
			};
			/**
			* @private
			*/
			function getFilletResult(context, filletRadius, filletCenter) {
				var result = null;
				var fn = filletResultMap[context.path.type];
				if (fn) result = fn(context.path, context.propertyName, filletRadius, filletCenter);
				if (!testFilletResult(context, result)) result = null;
				return result;
			}
			/**
			* @private
			*/
			function getDogboneResult(context, filletCenter) {
				var result = {
					filletAngle: MakerJs.angle.ofPointInDegrees(filletCenter, context.shardPoint),
					clipPath: function() {
						context.path[context.propertyName] = context.shardPoint;
					}
				};
				if (!testFilletResult(context, result)) result = null;
				return result;
			}
			/**
			* @private
			*/
			function testFilletResult(context, result) {
				var test = false;
				if (result) {
					var originalValue = context.path[context.propertyName];
					result.clipPath();
					if (MakerJs.measure.pathLength(context.path) > 0) test = true;
					context.path[context.propertyName] = originalValue;
				}
				return test;
			}
			/**
			* @private
			*/
			function getLineRatio(lines) {
				var totalLength = 0;
				var lengths = [];
				for (var i = 0; i < lines.length; i++) {
					var length = MakerJs.measure.pathLength(lines[i]);
					lengths.push(length);
					totalLength += length;
				}
				return lengths[0] / totalLength;
			}
			/**
			* Adds a round corner to the outside angle between 2 lines. The lines must meet at one point.
			*
			* @param lineA First line to fillet, which will be modified to fit the fillet.
			* @param lineB Second line to fillet, which will be modified to fit the fillet.
			* @returns Arc path object of the new fillet.
			*/
			function dogbone(lineA, lineB, filletRadius, options) {
				if (MakerJs.isPathLine(lineA) && MakerJs.isPathLine(lineB) && filletRadius && filletRadius > 0) {
					var opts = { pointMatchingDistance: .005 };
					MakerJs.extendObject(opts, options);
					var commonProperty = getMatchingPointProperties(lineA, lineB, options);
					if (commonProperty) {
						var ratio = getLineRatio([lineA, lineB]);
						var span = new MakerJs.paths.Line(commonProperty[0].oppositePoint, commonProperty[1].oppositePoint);
						var midRatioPoint = MakerJs.point.middle(span, ratio);
						var bisectionAngle = MakerJs.angle.ofPointInDegrees(commonProperty[0].point, midRatioPoint);
						var center = MakerJs.point.add(commonProperty[0].point, MakerJs.point.fromPolar(MakerJs.angle.toRadians(bisectionAngle), filletRadius));
						if (!populateShardPointsFromReferenceCircle(filletRadius, center, commonProperty, opts)) return null;
						var results = [];
						for (var i = 0; i < 2; i++) {
							var result = getDogboneResult(commonProperty[i], center);
							if (!result) return null;
							results.push(result);
						}
						var filletArc = new MakerJs.paths.Arc(center, filletRadius, results[0].filletAngle, results[1].filletAngle);
						if (MakerJs.round(MakerJs.angle.noRevolutions(MakerJs.angle.ofArcMiddle(filletArc))) == MakerJs.round(bisectionAngle)) {
							filletArc.startAngle = results[1].filletAngle;
							filletArc.endAngle = results[0].filletAngle;
						}
						results[0].clipPath();
						results[1].clipPath();
						return filletArc;
					}
				}
				return null;
			}
			path.dogbone = dogbone;
			/**
			* Adds a round corner to the inside angle between 2 paths. The paths must meet at one point.
			*
			* @param pathA First path to fillet, which will be modified to fit the fillet.
			* @param pathB Second path to fillet, which will be modified to fit the fillet.
			* @param filletRadius Radius of the fillet.
			* @param options Optional IPointMatchOptions object to specify pointMatchingDistance.
			* @returns Arc path object of the new fillet.
			*/
			function fillet(pathA, pathB, filletRadius, options) {
				if (pathA && pathB && filletRadius && filletRadius > 0) {
					var opts = { pointMatchingDistance: .005 };
					MakerJs.extendObject(opts, options);
					var commonProperty = getMatchingPointProperties(pathA, pathB, options);
					if (commonProperty) {
						if (!populateShardPointsFromReferenceCircle(filletRadius, commonProperty[0].point, commonProperty, opts)) return null;
						var guidePaths = [];
						for (var i = 0; i < 2; i++) {
							var otherPathShardPoint = commonProperty[1 - i].shardPoint;
							if (!otherPathShardPoint) return null;
							var guidePath = getGuidePath(commonProperty[i], filletRadius, otherPathShardPoint);
							guidePaths.push(guidePath);
						}
						var intersectionPoint = path.intersection(guidePaths[0], guidePaths[1]);
						if (intersectionPoint) {
							var center;
							if (intersectionPoint.intersectionPoints.length == 1) center = intersectionPoint.intersectionPoints[0];
							else center = MakerJs.point.closest(commonProperty[0].point, intersectionPoint.intersectionPoints);
							var results = [];
							for (var i = 0; i < 2; i++) {
								var result = getFilletResult(commonProperty[i], filletRadius, center);
								if (!result) return null;
								results.push(result);
							}
							if (MakerJs.round(results[0].filletAngle - results[1].filletAngle) == 0) return null;
							var filletArc = new MakerJs.paths.Arc(center, filletRadius, results[0].filletAngle, results[1].filletAngle);
							var filletSpan = MakerJs.angle.ofArcSpan(filletArc);
							if (filletSpan == 180) return null;
							if (filletSpan > 180) {
								filletArc.startAngle = results[1].filletAngle;
								filletArc.endAngle = results[0].filletAngle;
							}
							results[0].clipPath();
							results[1].clipPath();
							return filletArc;
						}
					}
				}
				return null;
			}
			path.fillet = fillet;
		})(MakerJs.path || (MakerJs.path = {}));
	})(MakerJs || (MakerJs = {}));
	(function(MakerJs) {
		(function(chain) {
			function dogbone(chainToFillet, filletSpec) {
				return chainFillet(false, chainToFillet, filletSpec);
			}
			chain.dogbone = dogbone;
			function fillet(chainToFillet, filletSpec) {
				return chainFillet(true, chainToFillet, filletSpec);
			}
			chain.fillet = fillet;
			function chainFillet(traditional, chainToFillet, filletSpec) {
				var result = { paths: {} };
				var added = 0;
				var links = chainToFillet.links;
				function add(i1, i2) {
					var p1 = links[i1].walkedPath, p2 = links[i2].walkedPath;
					if (p1.modelContext === p2.modelContext && p1.modelContext.type == MakerJs.models.BezierCurve.typeName) return;
					MakerJs.path.moveTemporary([p1.pathContext, p2.pathContext], [p1.offset, p2.offset], function() {
						var filletRadius;
						if (MakerJs.isObject(filletSpec)) {
							var a = MakerJs.angle.ofChainLinkJoint(links[i1], links[i2]);
							if (MakerJs.round(a) === 0) return;
							filletRadius = a > 0 ? filletSpec.left : filletSpec.right;
						} else filletRadius = filletSpec;
						if (!filletRadius || filletRadius < 0) return;
						var filletArc;
						if (traditional) filletArc = MakerJs.path.fillet(p1.pathContext, p2.pathContext, filletRadius);
						else filletArc = MakerJs.path.dogbone(p1.pathContext, p2.pathContext, filletRadius);
						if (filletArc) {
							result.paths["fillet" + added] = filletArc;
							added++;
						}
					});
				}
				for (var i = 1; i < links.length; i++) add(i - 1, i);
				if (chainToFillet.endless) add(i - 1, 0);
				if (!added) return null;
				return result;
			}
		})(MakerJs.chain || (MakerJs.chain = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(kit) {
			/**
			* Helper function to use the JavaScript "apply" function in conjunction with the "new" keyword.
			*
			* @param ctor The constructor for the class which is an IKit.
			* @param args The array of parameters passed to the constructor.
			* @returns A new instance of the class, which implements the IModel interface.
			*/
			function construct(ctor, args) {
				function F() {
					return ctor.apply(this, args);
				}
				F.prototype = ctor.prototype;
				return new F();
			}
			kit.construct = construct;
			/**
			* Extract just the initial sample values from a kit.
			*
			* @param ctor The constructor for the class which is an IKit.
			* @returns Array of the inital sample values provided in the metaParameters array.
			*/
			function getParameterValues(ctor) {
				var parameters = [];
				var metaParams = ctor.metaParameters;
				if (metaParams) for (var i = 0; i < metaParams.length; i++) {
					var value = metaParams[i].value;
					if (Array.isArray(value)) value = value[0];
					parameters.push(value);
				}
				return parameters;
			}
			kit.getParameterValues = getParameterValues;
		})(MakerJs.kit || (MakerJs.kit = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(model) {
			/**
			* @private
			*/
			function getOpposedLink(linkedPaths, pathContext) {
				if (linkedPaths[0].walkedPath.pathContext === pathContext) return linkedPaths[1];
				return linkedPaths[0];
			}
			/**
			* @private
			*/
			function followLinks(pointGraph, chainFound, chainNotFound) {
				function followLink(currLink, chain, firstLink) {
					while (currLink) {
						chain.links.push(currLink);
						chain.pathLength += currLink.pathLength;
						var next = currLink.reversed ? 0 : 1;
						var nextPoint = currLink.endPoints[next];
						var nextEl = pointGraph.getElementAtPoint(nextPoint);
						if (!nextEl || nextEl.valueIds.length === 0) break;
						var nextLink = getOpposedLink(nextEl.valueIds.map(function(valueIndex) {
							return pointGraph.values[valueIndex];
						}), currLink.walkedPath.pathContext);
						nextEl.valueIds.splice(0, 2);
						if (!nextLink) break;
						if (nextLink.walkedPath.pathContext === firstLink.walkedPath.pathContext) {
							if (chain.links.length > 1) chain.endless = true;
							break;
						}
						currLink = nextLink;
					}
				}
				pointGraph.forEachPoint(function(p, values, pointId, el) {
					if (el.valueIds.length > 0) {
						var chain = {
							links: [],
							pathLength: 0
						};
						followLink(values[0], chain, values[0]);
						if (chain.endless) chainFound(chain, false);
						else {
							chain.links.reverse();
							var firstLink = chain.links[0];
							chain.links.map(function(link) {
								link.reversed = !link.reversed;
							});
							chain.pathLength -= chain.links[chain.links.length - 1].pathLength;
							followLink(chain.links.pop(), chain, firstLink);
							if (chain.links.length > 1) chainFound(chain, true);
							else chainNotFound(chain.links[0].walkedPath);
						}
					}
				});
			}
			/**
			* Find a single chain within a model, across all layers. Shorthand of findChains; useful when you know there is only one chain to find in your model.
			*
			* @param modelContext The model to search for a chain.
			* @returns A chain object or null if chains were not found.
			*/
			function findSingleChain(modelContext) {
				var singleChain = null;
				findChains(modelContext, function(chains, loose, layer) {
					singleChain = chains[0];
				}, { byLayers: false });
				return singleChain;
			}
			model.findSingleChain = findSingleChain;
			/**
			* @private
			*/
			function linkEndpoint(link, beginning) {
				var index = beginning === link.reversed ? 1 : 0;
				return link.endPoints[index];
			}
			function findChains(modelContext) {
				var args = [];
				for (var _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
				var options;
				var callback;
				switch (args.length) {
					case 1:
						if (typeof args[0] === "function") callback = args[0];
						else options = args[0];
						break;
					case 2:
						callback = args[0];
						options = args[1];
						break;
				}
				var opts = { pointMatchingDistance: .005 };
				MakerJs.extendObject(opts, options);
				var pointGraphsByLayer = {};
				var chainsByLayer = {};
				var ignored = {};
				var walkOptions = { onPath: function(walkedPath) {
					var layer = opts.byLayers ? walkedPath.layer : "";
					if (!pointGraphsByLayer[layer]) pointGraphsByLayer[layer] = new MakerJs.PointGraph();
					var pointGraph = pointGraphsByLayer[layer];
					var pathLength = MakerJs.measure.pathLength(walkedPath.pathContext);
					if (walkedPath.pathContext.type === MakerJs.pathType.Circle || walkedPath.pathContext.type === MakerJs.pathType.Arc && MakerJs.round(MakerJs.angle.ofArcSpan(walkedPath.pathContext) - 360) === 0 || walkedPath.pathContext.type === MakerJs.pathType.BezierSeed && MakerJs.measure.isPointEqual(walkedPath.pathContext.origin, walkedPath.pathContext.end, opts.pointMatchingDistance)) {
						var chain = {
							links: [{
								walkedPath,
								reversed: null,
								endPoints: null,
								pathLength
							}],
							endless: true,
							pathLength
						};
						if (!chainsByLayer[layer]) chainsByLayer[layer] = [];
						chainsByLayer[layer].push(chain);
					} else {
						if (pathLength < opts.pointMatchingDistance / 5) {
							if (!ignored[layer]) ignored[layer] = [];
							ignored[layer].push(walkedPath);
							return;
						}
						var endPoints = MakerJs.point.fromPathEnds(walkedPath.pathContext, walkedPath.offset);
						for (var i = 0; i < 2; i++) {
							var link = {
								walkedPath,
								endPoints,
								reversed: i != 0,
								pathLength
							};
							var valueId = pointGraph.insertValue(link);
							pointGraph.insertValueIdAtPoint(valueId, endPoints[i]);
						}
					}
				} };
				if (opts.shallow) walkOptions.beforeChildWalk = function() {
					return false;
				};
				var beziers;
				if (opts.unifyBeziers) {
					beziers = getBezierModels(modelContext);
					swapBezierPathsWithSeeds(beziers, true, opts.pointMatchingDistance);
				}
				model.walk(modelContext, walkOptions);
				var _loop_3 = function(layer_2) {
					var pointGraph = pointGraphsByLayer[layer_2];
					pointGraph.mergeNearestSinglePoints(opts.pointMatchingDistance);
					loose = [];
					if (!chainsByLayer[layer_2]) chainsByLayer[layer_2] = [];
					followLinks(pointGraph, function(chain, checkEndless) {
						if (checkEndless) chain.endless = MakerJs.measure.isPointEqual(linkEndpoint(chain.links[0], true), linkEndpoint(chain.links[chain.links.length - 1], false), opts.pointMatchingDistance);
						else chain.endless = !!chain.endless;
						chainsByLayer[layer_2].push(chain);
					}, function(walkedPath) {
						loose.push(walkedPath);
					});
					chainsByLayer[layer_2].sort(function(a, b) {
						return b.pathLength - a.pathLength;
					});
					if (opts.contain) {
						containChainsOptions = MakerJs.isObject(opts.contain) ? opts.contain : { alternateDirection: false };
						containedChains = getContainment(chainsByLayer[layer_2], containChainsOptions);
						chainsByLayer[layer_2] = containedChains;
					}
					if (callback) callback(chainsByLayer[layer_2], loose, layer_2, ignored[layer_2]);
				};
				var loose, containChainsOptions, containedChains;
				for (var layer_2 in pointGraphsByLayer) _loop_3(layer_2);
				if (beziers) swapBezierPathsWithSeeds(beziers, false, opts.pointMatchingDistance);
				if (opts.byLayers) return chainsByLayer;
				else return chainsByLayer[""];
			}
			model.findChains = findChains;
			/**
			* @private
			*/
			function getContainment(allChains, opts) {
				var chainsAsModels = allChains.map(function(c) {
					return MakerJs.chain.toNewModel(c);
				});
				var parents = [];
				allChains.forEach(function(chainContext, i1) {
					if (!chainContext.endless) return;
					var wp = chainContext.links[0].walkedPath;
					var firstPath = MakerJs.path.clone(wp.pathContext, wp.offset);
					allChains.forEach(function(otherChain, i2) {
						if (chainContext === otherChain) return;
						if (!otherChain.endless) return;
						if (MakerJs.measure.isPointInsideModel(MakerJs.point.middle(firstPath), chainsAsModels[i2])) parents[i1] = otherChain;
					});
				});
				var result = [];
				allChains.forEach(function(chainContext, i) {
					var parent = parents[i];
					if (!parent) result.push(chainContext);
					else {
						if (!parent.contains) parent.contains = [];
						parent.contains.push(chainContext);
					}
				});
				if (opts.alternateDirection) {
					function alternate(chains, shouldBeClockwise) {
						chains.forEach(function(chainContext, i) {
							var isClockwise = MakerJs.measure.isChainClockwise(chainContext);
							if (isClockwise !== null) {
								if (!isClockwise && shouldBeClockwise || isClockwise && !shouldBeClockwise) MakerJs.chain.reverse(chainContext);
							}
							if (chainContext.contains) alternate(chainContext.contains, !shouldBeClockwise);
						});
					}
					alternate(result, true);
				}
				return result;
			}
			/**
			* @private
			*/
			function getBezierModels(modelContext) {
				var beziers = [];
				function checkIsBezier(wm) {
					if (wm.childModel.type === MakerJs.models.BezierCurve.typeName) beziers.push(wm);
				}
				var options = { beforeChildWalk: function(walkedModel) {
					checkIsBezier(walkedModel);
					return true;
				} };
				checkIsBezier({
					childId: "",
					childModel: modelContext,
					layer: modelContext.layer,
					offset: modelContext.origin,
					parentModel: null,
					route: [],
					routeKey: ""
				});
				model.walk(modelContext, options);
				return beziers;
			}
			/**
			* @private
			*/
			function swapBezierPathsWithSeeds(beziers, swap, pointMatchingDistance) {
				var tempKey = "tempPaths";
				var tempLayerKey = "tempLayer";
				beziers.forEach(function(wm) {
					var b = wm.childModel;
					if (swap) {
						if (wm.layer != void 0 && wm.layer !== "") {
							b[tempLayerKey] = b.layer;
							b.layer = wm.layer;
						}
						var bezierPartsByLayer = MakerJs.models.BezierCurve.getBezierSeeds(b, {
							byLayers: true,
							pointMatchingDistance
						});
						for (var layer in bezierPartsByLayer) {
							var bezierSeeds = bezierPartsByLayer[layer];
							if (bezierSeeds.length > 0) {
								b[tempKey] = b.paths;
								var newPaths = {};
								bezierSeeds.forEach(function(seed, i) {
									seed.layer = layer;
									newPaths["seed_" + i] = seed;
								});
								b.paths = newPaths;
							}
						}
					} else {
						if (tempKey in b) {
							b.paths = b[tempKey];
							delete b[tempKey];
						}
						if (tempLayerKey in b) {
							if (b[tempLayerKey] == void 0) delete b.layer;
							else b.layer = b[tempLayerKey];
							delete b[tempLayerKey];
						}
					}
				});
			}
		})(MakerJs.model || (MakerJs.model = {}));
	})(MakerJs || (MakerJs = {}));
	(function(MakerJs) {
		(function(chain) {
			/**
			* Shift the links of an endless chain.
			*
			* @param chainContext Chain to cycle through. Must be endless.
			* @param amount Optional number of links to shift. May be negative to cycle backwards.
			* @returns The chainContext for cascading.
			*/
			function cycle(chainContext, amount) {
				if (amount === void 0) amount = 1;
				if (!chainContext.endless) return;
				var n = Math.abs(amount);
				for (var i = 0; i < n; i++) if (amount < 0) chainContext.links.push(chainContext.links.shift());
				else chainContext.links.unshift(chainContext.links.pop());
				return chainContext;
			}
			chain.cycle = cycle;
			/**
			* Reverse the links of a chain.
			*
			* @param chainContext Chain to reverse.
			* @returns The chainContext for cascading.
			*/
			function reverse(chainContext) {
				chainContext.links.reverse();
				chainContext.links.forEach(function(link) {
					return link.reversed = !link.reversed;
				});
				return chainContext;
			}
			chain.reverse = reverse;
			/**
			* Set the beginning of an endless chain to a known routeKey of a path.
			*
			* @param chainContext Chain to cycle through. Must be endless.
			* @param routeKey RouteKey of the desired path to start the chain with.
			* @returns The chainContext for cascading.
			*/
			function startAt(chainContext, routeKey) {
				if (!chainContext.endless) return;
				var index = -1;
				for (var i = 0; i < chainContext.links.length; i++) if (chainContext.links[i].walkedPath.routeKey == routeKey) {
					index = i;
					break;
				}
				if (index > 0) cycle(chainContext, index);
				return chainContext;
			}
			chain.startAt = startAt;
			/**
			* Convert a chain to a new model, independent of any model from where the chain was found.
			*
			* @param chainContext Chain to convert to a model.
			* @param detachFromOldModel Flag to remove the chain's paths from their current parent model. If false, each path will be cloned. If true, the original path will be re-parented into the resulting new model. Default is false.
			* @returns A new model containing paths from the chain.
			*/
			function toNewModel(chainContext, detachFromOldModel) {
				if (detachFromOldModel === void 0) detachFromOldModel = false;
				var result = { paths: {} };
				for (var i = 0; i < chainContext.links.length; i++) {
					var wp = chainContext.links[i].walkedPath;
					if (wp.pathContext.type === MakerJs.pathType.BezierSeed) {
						if (detachFromOldModel) delete wp.modelContext.paths[wp.pathId];
						if (!result.models) result.models = {};
						var modelId = MakerJs.model.getSimilarModelId(result, wp.pathId);
						result.models[modelId] = MakerJs.model.moveRelative(new MakerJs.models.BezierCurve(wp.pathContext), wp.offset);
					} else {
						var newPath;
						if (detachFromOldModel) {
							newPath = wp.pathContext;
							delete wp.modelContext.paths[wp.pathId];
						} else newPath = MakerJs.path.clone(wp.pathContext);
						var pathId = MakerJs.model.getSimilarPathId(result, wp.pathId);
						result.paths[pathId] = MakerJs.path.moveRelative(newPath, wp.offset);
					}
				}
				return result;
			}
			chain.toNewModel = toNewModel;
			/**
			* @private
			*/
			function removeDuplicateEnds(endless, points) {
				if (!endless || points.length < 2) return;
				if (MakerJs.measure.isPointEqual(points[0], points[points.length - 1], 1e-5)) points.pop();
			}
			/**
			* Get points along a chain of paths.
			*
			* @param chainContext Chain of paths to get points from.
			* @param distance Numeric distance along the chain between points, or numeric array of distances along the chain between each point.
			* @param maxPoints Maximum number of points to retrieve.
			* @returns Array of points which are on the chain spread at a uniform interval.
			*/
			function toPoints(chainContext, distanceOrDistances, maxPoints) {
				var result = [];
				var di = 0;
				var t = 0;
				var distanceArray;
				if (Array.isArray(distanceOrDistances)) distanceArray = distanceOrDistances;
				for (var i = 0; i < chainContext.links.length; i++) {
					var link = chainContext.links[i];
					var wp = link.walkedPath;
					var len = link.pathLength;
					while (MakerJs.round(len - t) > 0) {
						var r = t / len;
						if (link.reversed) r = 1 - r;
						result.push(MakerJs.point.add(MakerJs.point.middle(wp.pathContext, r), wp.offset));
						if (maxPoints && result.length >= maxPoints) return result;
						var distance;
						if (distanceArray) {
							distance = distanceArray[di];
							di++;
							if (di > distanceArray.length) return result;
						} else distance = distanceOrDistances;
						t += distance;
					}
					t -= len;
				}
				removeDuplicateEnds(chainContext.endless, result);
				return result;
			}
			chain.toPoints = toPoints;
			/**
			* Get key points (a minimal a number of points) along a chain of paths.
			*
			* @param chainContext Chain of paths to get points from.
			* @param maxArcFacet The maximum length between points on an arc or circle.
			* @returns Array of points which are on the chain.
			*/
			function toKeyPoints(chainContext, maxArcFacet) {
				var result = [];
				for (var i = 0; i < chainContext.links.length; i++) {
					var link = chainContext.links[i];
					var wp = link.walkedPath;
					var keyPoints = MakerJs.path.toKeyPoints(wp.pathContext, maxArcFacet);
					if (keyPoints.length > 0) {
						if (link.reversed) keyPoints.reverse();
						if (i > 0) keyPoints.shift();
						var offsetPathPoints = keyPoints.map(function(p) {
							return MakerJs.point.add(p, wp.offset);
						});
						result.push.apply(result, offsetPathPoints);
					}
				}
				removeDuplicateEnds(chainContext.endless, result);
				return result;
			}
			chain.toKeyPoints = toKeyPoints;
		})(MakerJs.chain || (MakerJs.chain = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(model) {
			/**
			* @private
			*/
			var DeadEndFinder = function() {
				function DeadEndFinder(modelContext, options) {
					this.modelContext = modelContext;
					this.options = options;
					this.pointMap = new MakerJs.PointGraph();
					this.list = [];
					this.removed = [];
					this.ordinals = {};
					this.load();
				}
				DeadEndFinder.prototype.load = function() {
					var _this = this;
					model.walk(this.modelContext, { onPath: function(walkedPath) {
						var endPoints = MakerJs.point.fromPathEnds(walkedPath.pathContext, walkedPath.offset);
						if (!endPoints) return;
						var pathRef = walkedPath;
						pathRef.endPoints = endPoints;
						var valueId = _this.pointMap.insertValue(pathRef);
						for (var i = 2; i--;) _this.pointMap.insertValueIdAtPoint(valueId, endPoints[i]);
					} });
					if (this.options.pointMatchingDistance) this.pointMap.mergePoints(this.options.pointMatchingDistance);
				};
				DeadEndFinder.prototype.findDeadEnds = function() {
					var _this = this;
					var i = 0;
					this.pointMap.forEachPoint(function(p, values, pointId, el) {
						_this.ordinals[pointId] = i++;
						_this.list.push(el);
					});
					i = 0;
					var _loop_4 = function() {
						var el = this_2.list[i];
						if (el.valueIds.length === 1) this_2.removePath(el, el.valueIds[0], i);
						else if (this_2.options.keep && el.valueIds.length % 2) el.valueIds.forEach(function(valueId) {
							var value = _this.pointMap.values[valueId];
							if (!_this.options.keep(value)) _this.removePath(el, valueId, i);
						});
						i++;
					};
					var this_2 = this;
					while (i < this.list.length) _loop_4();
					return this.removed;
				};
				DeadEndFinder.prototype.removePath = function(el, valueId, current) {
					var value = this.pointMap.values[valueId];
					var otherPointId = this.getOtherPointId(value.endPoints, el.pointId);
					var otherElement = this.pointMap.index[otherPointId];
					this.removed.push(value);
					this.removeValue(el, valueId);
					this.removeValue(otherElement, valueId);
					if (otherElement.valueIds.length > 0) this.appendQueue(otherElement, current);
				};
				DeadEndFinder.prototype.removeValue = function(el, valueId) {
					var pos = el.valueIds.indexOf(valueId);
					if (pos >= 0) el.valueIds.splice(pos, 1);
				};
				DeadEndFinder.prototype.appendQueue = function(el, current) {
					var otherOrdinal = this.ordinals[el.pointId];
					if (otherOrdinal < current) {
						this.list[otherOrdinal] = null;
						this.list.push(el);
						this.ordinals[el.pointId] = this.list.length;
					}
				};
				DeadEndFinder.prototype.getOtherPointId = function(endPoints, pointId) {
					for (var i = 0; i < endPoints.length; i++) {
						var id = this.pointMap.getIdOfPoint(endPoints[i]);
						if (pointId !== id) return id;
					}
				};
				return DeadEndFinder;
			}();
			/**
			* Remove paths from a model which have endpoints that do not connect to other paths.
			*
			* @param modelContext The model to search for dead ends.
			* @param pointMatchingDistance Optional max distance to consider two points as the same.
			* @param keep Optional callback function (which should return a boolean) to decide if a dead end path should be kept instead.
			* @param trackDeleted Optional callback function which will log discarded paths and the reason they were discarded.
			* @returns The input model (for cascading).
			*/
			function removeDeadEnds(modelContext, pointMatchingDistance, keep, trackDeleted) {
				var deadEndFinder = new DeadEndFinder(modelContext, {
					pointMatchingDistance: pointMatchingDistance || .005,
					keep
				});
				var removed = deadEndFinder.findDeadEnds();
				if (removed.length < deadEndFinder.pointMap.values.length) removed.forEach(function(wp) {
					trackDeleted(wp, "dead end");
					delete wp.modelContext.paths[wp.pathId];
				});
				return modelContext;
			}
			model.removeDeadEnds = removeDeadEnds;
		})(MakerJs.model || (MakerJs.model = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(exporter) {
			exporter.XmlTag = function() {
				/**
				* @param name Name of the XML tag.
				* @param attrs Optional attributes for the tag.
				*/
				function XmlTag(name, attrs) {
					this.name = name;
					this.attrs = attrs;
					/**
					* Text between the opening and closing tags.
					*/
					this.innerText = "";
				}
				/**
				* Escapes certain characters within a string so that it can appear in a tag or its attribute.
				*
				* @returns Escaped string.
				*/
				XmlTag.escapeString = function(value) {
					var escape = {
						"&": "&amp;",
						"<": "&lt;",
						">": "&gt;",
						"\"": "&quot;"
					};
					for (var code in escape) value = value.split(code).join(escape[code]);
					return value;
				};
				/**
				* Get the opening tag.
				*
				* @param selfClose Flag to determine if opening tag should be self closing.
				*/
				XmlTag.prototype.getOpeningTag = function(selfClose) {
					var attrs = "";
					function outputAttr(attrName, attrValue) {
						if (attrValue == null || typeof attrValue === "undefined") return;
						if (Array.isArray(attrValue) || typeof attrValue === "object") attrValue = JSON.stringify(attrValue);
						if (typeof attrValue === "string") attrValue = XmlTag.escapeString(attrValue);
						attrs += " " + attrName + "=\"" + attrValue + "\"";
					}
					for (var name in this.attrs) outputAttr(name, this.attrs[name]);
					return "<" + this.name + attrs + (selfClose ? "/" : "") + ">";
				};
				/**
				* Get the inner text.
				*/
				XmlTag.prototype.getInnerText = function() {
					if (this.innerTextEscaped) return this.innerText;
					else return XmlTag.escapeString(this.innerText);
				};
				/**
				* Get the closing tag.
				*/
				XmlTag.prototype.getClosingTag = function() {
					return "</" + this.name + ">";
				};
				/**
				* Output the entire tag as a string.
				*/
				XmlTag.prototype.toString = function() {
					if (!this.innerText && !this.closingTags) return this.getOpeningTag(true);
					else return this.getOpeningTag(false) + this.getInnerText() + this.getClosingTag();
				};
				return XmlTag;
			}();
		})(MakerJs.exporter || (MakerJs.exporter = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(exporter) {
			/**
			* @private
			*/
			function wrap(prefix, content, condition) {
				if (condition) return prefix + "(" + content + ")";
				else return content;
			}
			/**
			* @private
			*/
			function facetSizeToResolution(arcOrCircle, facetSize) {
				if (!facetSize) return;
				var circle = new MakerJs.paths.Circle([0, 0], arcOrCircle.radius);
				var length = MakerJs.measure.pathLength(circle);
				if (!length) return;
				return Math.ceil(length / facetSize);
			}
			/**
			* @private
			*/
			function chainToJscadScript(chainContext, facetSize, accuracy) {
				var head = "";
				var tail = "";
				var first = true;
				var exit = false;
				var reverseTail = false;
				var beginMap = {};
				beginMap[MakerJs.pathType.Circle] = function(circle, link) {
					var circleOptions = {
						center: MakerJs.point.rounded(MakerJs.point.add(circle.origin, link.walkedPath.offset), accuracy),
						radius: MakerJs.round(circle.radius, accuracy),
						resolution: facetSizeToResolution(circle, facetSize)
					};
					head = wrap("CAG.circle", JSON.stringify(circleOptions), true);
					exit = true;
				};
				beginMap[MakerJs.pathType.Line] = function(line, link) {
					var points = link.endPoints.map(function(p) {
						return MakerJs.point.rounded(p, accuracy);
					});
					if (link.reversed) points.reverse();
					head = wrap("new CSG.Path2D", JSON.stringify(points), true);
				};
				beginMap[MakerJs.pathType.Arc] = function(arc, link) {
					var endAngle = MakerJs.angle.ofArcEnd(arc);
					if (link.reversed) reverseTail = true;
					var arcOptions = {
						center: MakerJs.point.rounded(MakerJs.point.add(arc.origin, link.walkedPath.offset), accuracy),
						radius: MakerJs.round(arc.radius, accuracy),
						startangle: MakerJs.round(arc.startAngle, accuracy),
						endangle: MakerJs.round(endAngle, accuracy),
						resolution: facetSizeToResolution(arc, facetSize)
					};
					head = wrap("new CSG.Path2D.arc", JSON.stringify(arcOptions), true);
				};
				var appendMap = {};
				appendMap[MakerJs.pathType.Line] = function(line, link) {
					var reverse = reverseTail != link.reversed;
					var endPoint = MakerJs.point.rounded(link.endPoints[reverse ? 0 : 1], accuracy);
					append(wrap(".appendPoint", JSON.stringify(endPoint), true));
				};
				appendMap[MakerJs.pathType.Arc] = function(arc, link) {
					var reverse = reverseTail != link.reversed;
					var endAngle = MakerJs.angle.ofArcEnd(arc);
					var arcOptions = {
						radius: MakerJs.round(arc.radius, accuracy),
						clockwise: reverse,
						large: Math.abs(endAngle - arc.startAngle) > 180,
						resolution: facetSizeToResolution(arc, facetSize)
					};
					var endPoint = MakerJs.point.rounded(link.endPoints[reverse ? 0 : 1], accuracy);
					append(wrap(".appendArc", JSON.stringify(endPoint) + "," + JSON.stringify(arcOptions), true));
				};
				function append(s) {
					if (reverseTail) tail = s + tail;
					else tail += s;
				}
				for (var i = 0; i < chainContext.links.length; i++) {
					var link = chainContext.links[i];
					var pathContext = link.walkedPath.pathContext;
					var fn = first ? beginMap[pathContext.type] : appendMap[pathContext.type];
					if (fn) fn(pathContext, link);
					if (exit) return head;
					first = false;
				}
				return head + tail + ".close().innerToCAG()";
			}
			/**
			* @private
			*/
			function makePhasedCallback(originalCb, phaseStart, phaseSpan) {
				return function statusCallback(status) {
					originalCb && originalCb({ progress: phaseStart + status.progress * phaseSpan / 100 });
				};
			}
			/**
			* Converts a model to a @jscad/csg CAG object - 2D to 2D. See https://en.wikibooks.org/wiki/OpenJSCAD_User_Guide#2D_Paths
			*
			* Example:
			* ```
			* //First, use npm install @jscad/csg from the command line in your jscad project
			* //Create a CAG instance from a model.
			* var { CAG } = require('@jscad/csg');
			* var model = new makerjs.models.Ellipse(70, 40);
			* var cag = makerjs.exporter.toJscadCAG(CAG, model, {maxArcFacet: 1});
			* ```
			*
			* @param jscadCAG @jscad/csg CAG engine, see https://www.npmjs.com/package/@jscad/csg
			* @param modelToExport Model object to export.
			* @param options Optional options object.
			* @param options.byLayers Optional flag to separate chains by layers.
			* @param options.pointMatchingDistance Optional max distance to consider two points as the same.
			* @param options.maxArcFacet The maximum length between points on an arc or circle.
			* @param options.statusCallback Optional callback function to get the percentage complete.
			* @returns jscad CAG object in 2D, or a map (keyed by layer id) of jscad CAG objects - if options.byLayers is true.
			*/
			function toJscadCAG(jscadCAG, modelToExport, jsCadCagOptions) {
				function chainToJscadCag(c, maxArcFacet) {
					var keyPoints = MakerJs.chain.toKeyPoints(c, maxArcFacet);
					keyPoints.push(keyPoints[0]);
					return jscadCAG.fromPoints(keyPoints);
				}
				function jscadCagUnion(augend, addend) {
					return augend.union(addend);
				}
				function jscadCagSubtraction(minuend, subtrahend) {
					return minuend.subtract(subtrahend);
				}
				return convertChainsTo2D(chainToJscadCag, jscadCagUnion, jscadCagSubtraction, modelToExport, jsCadCagOptions);
			}
			exporter.toJscadCAG = toJscadCAG;
			/**
			* @private
			*/
			function convertChainsTo2D(convertToT, union, subtraction, modelToExport, jsCadCagOptions) {
				if (jsCadCagOptions === void 0) jsCadCagOptions = {};
				var adds = {};
				var status = {
					total: 0,
					complete: 0
				};
				function unionize(phaseStart, phaseSpan, arr) {
					var result = arr.shift();
					arr.forEach(function(el) {
						return result = union(result, el);
					});
					status.complete++;
					jsCadCagOptions.statusCallback && jsCadCagOptions.statusCallback({ progress: phaseStart + phaseSpan * status.complete / status.total });
					return result;
				}
				function subtractChains(layerId, cs) {
					var subtracts = [];
					cs.forEach(function(c) {
						if (!c.endless) return;
						if (c.contains) addChains(layerId, c.contains);
						status.total++;
						subtracts.unshift(convertToT(c, jsCadCagOptions.maxArcFacet));
					});
					return subtracts;
				}
				function addChains(layerId, cs) {
					cs.forEach(function(c) {
						if (!c.endless) return;
						var add = {
							cag: convertToT(c, jsCadCagOptions.maxArcFacet),
							subtracts: []
						};
						if (c.contains) {
							var subtracts = subtractChains(layerId, c.contains);
							if (subtracts.length > 0) add.subtracts.push(subtracts);
						}
						status.total++;
						if (!(layerId in adds)) adds[layerId] = [];
						adds[layerId].unshift(add);
					});
				}
				var options = {
					pointMatchingDistance: jsCadCagOptions.pointMatchingDistance,
					byLayers: jsCadCagOptions.byLayers,
					contain: true
				};
				jsCadCagOptions.statusCallback && jsCadCagOptions.statusCallback({ progress: 25 });
				var chainsResult = MakerJs.model.findChains(modelToExport, options);
				if (Array.isArray(chainsResult)) addChains("", chainsResult);
				else for (var layerId in chainsResult) addChains(layerId, chainsResult[layerId]);
				jsCadCagOptions.statusCallback && jsCadCagOptions.statusCallback({ progress: 50 });
				var closedCount = 0;
				for (var layerId in adds) closedCount += adds[layerId].length;
				if (closedCount === 0) {
					jsCadCagOptions.statusCallback && jsCadCagOptions.statusCallback({ progress: 100 });
					throw "No closed geometries found.";
				}
				var resultMap = {};
				for (var layerId in adds) resultMap[layerId] = unionize(50, 50, adds[layerId].map(function(add) {
					var result = add.cag;
					add.subtracts.forEach(function(subtract) {
						var union = unionize(50, 50, subtract);
						result = subtraction(result, union);
					});
					return result;
				}));
				jsCadCagOptions.statusCallback && jsCadCagOptions.statusCallback({ progress: 100 });
				return options.byLayers ? resultMap : resultMap[""];
			}
			/**
			* Converts a model to a @jscad/csg CSG object - 2D to 3D.
			*
			* Example:
			* ```
			* //First, use npm install @jscad/csg from the command line in your jscad project
			* //Create a CSG instance from a model.
			* var { CAG } = require('@jscad/csg');
			* var model = new makerjs.models.Ellipse(70, 40);
			* var csg = makerjs.exporter.toJscadCSG(CAG, model, {maxArcFacet: 1, extrude: 10});
			* ```
			*
			* @param jscadCAG @jscad/csg CAG engine, see https://www.npmjs.com/package/@jscad/csg
			* @param modelToExport Model object to export.
			* @param options Optional options object.
			* @param options.byLayers Optional flag to separate chains by layers.
			* @param options.pointMatchingDistance Optional max distance to consider two points as the same.
			* @param options.maxArcFacet The maximum length between points on an arc or circle.
			* @param options.statusCallback Optional callback function to get the percentage complete.
			* @param options.extrude Optional default extrusion distance.
			* @param options.layerOptions Optional object map of options per layer, keyed by layer name. Each value for a key is an object with 'extrude' and 'z' properties.
			* @returns jscad CAG object in 2D, or a map (keyed by layer id) of jscad CAG objects - if options.byLayers is true.
			*/
			function toJscadCSG(jscadCAG, modelToExport, options) {
				function to2D(opts) {
					return toJscadCAG(jscadCAG, modelToExport, opts);
				}
				function to3D(cag, extrude, z) {
					var csg = cag.extrude({ offset: [
						0,
						0,
						extrude
					] });
					if (z) csg = csg.translate([
						0,
						0,
						z
					]);
					return csg;
				}
				function union3D(augend, addend) {
					return augend.union(addend);
				}
				return convert2Dto3D(to2D, to3D, union3D, modelToExport, options);
			}
			exporter.toJscadCSG = toJscadCSG;
			/**
			* @private
			*/
			function convert2Dto3D(to2D, to3D, union3D, modelToExport, options) {
				if (options === void 0) options = {};
				var originalCb = options.statusCallback;
				function getDefinedNumber(a, b) {
					if (MakerJs.isNumber(a)) return a;
					return b;
				}
				if (modelToExport.exporterOptions) MakerJs.extendObject(options, modelToExport.exporterOptions["toJscadCSG"]);
				options.byLayers = options.byLayers || options.layerOptions && true;
				options.statusCallback = makePhasedCallback(originalCb, 0, 50);
				var result2D = to2D(options);
				var csgs = [];
				if (options.byLayers) for (var layerId in result2D) {
					var layerOptions = options.layerOptions[layerId];
					var csg = to3D(result2D[layerId], layerOptions.extrude || options.extrude, getDefinedNumber(layerOptions.z, options.z));
					csgs.push(csg);
				}
				else {
					var csg = to3D(result2D, options.extrude, options.z);
					csgs.push(csg);
				}
				options.statusCallback = makePhasedCallback(originalCb, 50, 100);
				var status = {
					total: csgs.length - 1,
					complete: 0
				};
				var result = csgs.shift();
				csgs.forEach(function(el, i) {
					result = union3D(result, el);
					status.complete++;
					options.statusCallback({ progress: status.complete / status.total });
				});
				return result;
			}
			/**
			* Creates a string of JavaScript code for execution with a Jscad environment.
			*
			* @param modelToExport Model object to export.
			* @param options Export options object.
			* @param options.byLayers Optional flag to separate chains by layers.
			* @param options.pointMatchingDistance Optional max distance to consider two points as the same.
			* @param options.maxArcFacet The maximum length between points on an arc or circle.
			* @param options.statusCallback Optional callback function to get the percentage complete.
			* @param options.extrude Optional default extrusion distance.
			* @param options.layerOptions Optional object map of options per layer, keyed by layer name. Each value for a key is an object with 'extrude' and 'z' properties.
			* @returns String of JavaScript containing a main() function for Jscad.
			*/
			function toJscadScript(modelToExport, options) {
				if (options === void 0) options = {};
				function _chainToJscadScript(c, maxArcFacet) {
					return wrap(chainToJscadScript(c, maxArcFacet, options.accuracy));
				}
				function scriptUnion(augend, addend) {
					return augend + ".union(".concat(addend, ")");
				}
				function scriptSubtraction(minuend, subtrahend) {
					return minuend + ".subtract(".concat(subtrahend, ")");
				}
				function to2D(opts) {
					return convertChainsTo2D(_chainToJscadScript, scriptUnion, scriptSubtraction, modelToExport, options);
				}
				function to3D(cag, extrude, z) {
					var csg = cag + ".extrude({ offset: [0, 0, ".concat(extrude, "] })");
					if (z) csg = csg + ".translate([0, 0, ".concat(z, "])");
					return csg;
				}
				function wrap(s) {
					return "".concat(nl).concat(indent).concat(s).concat(nl);
				}
				var indent = new Array((options.indent || 0) + 1).join(" ");
				var nl = options.indent ? "\n" : "";
				var result = convert2Dto3D(to2D, to3D, scriptUnion, modelToExport, options).trim();
				return "function ".concat(options.functionName || "main", "(){").concat(wrap("return ".concat(result, ";")), "}").concat(nl);
			}
			exporter.toJscadScript = toJscadScript;
			/**
			* Exports a model in STL format - 2D to 3D.
			*
			* @param jscadCAG @jscad/csg CAG engine, see https://www.npmjs.com/package/@jscad/csg
			* @param stlSerializer @jscad/stl-serializer, see https://www.npmjs.com/package/@jscad/stl-serializer
			* @param modelToExport Model object to export.
			* @param options Optional options object.
			* @param options.byLayers Optional flag to separate chains by layers.
			* @param options.pointMatchingDistance Optional max distance to consider two points as the same.
			* @param options.maxArcFacet The maximum length between points on an arc or circle.
			* @param options.statusCallback Optional callback function to get the percentage complete.
			* @param options.extrude Optional default extrusion distance.
			* @param options.layerOptions Optional object map of options per layer, keyed by layer name. Each value for a key is an object with 'extrude' and 'z' properties.
			* @returns String in STL ASCII format.
			*/
			function toJscadSTL(CAG, stlSerializer, modelToExport, options) {
				var originalCb = options.statusCallback;
				options.statusCallback = makePhasedCallback(originalCb, 0, 50);
				var csg = toJscadCSG(CAG, modelToExport, options);
				return stlSerializer.serialize(csg, {
					binary: false,
					statusCallback: makePhasedCallback(originalCb, 50, 50)
				});
			}
			exporter.toJscadSTL = toJscadSTL;
		})(MakerJs.exporter || (MakerJs.exporter = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(exporter) {
			/**
			* Injects drawing into a PDFKit document.
			*
			* @param doc PDFKit.PDFDocument object. See https://pdfkit.org/
			* @param modelToExport Model object to export.
			* @param options Export options object.
			* @returns String of PDF file contents.
			*/
			function toPDF(doc, modelToExport, options) {
				if (!modelToExport) return;
				var opts = {
					fontName: "Courier",
					fontSize: 9,
					origin: [0, 0],
					stroke: "#000"
				};
				MakerJs.extendObject(opts, options);
				var scale = 1;
				var exportUnits = opts.units || modelToExport.units;
				if (exportUnits) scale = MakerJs.units.conversionScale(exportUnits, MakerJs.unitType.Inch);
				else scale = 1 / 100;
				scale *= 72;
				var scaledModel = MakerJs.model.scale(MakerJs.cloneObject(modelToExport), scale);
				var size = MakerJs.measure.modelExtents(scaledModel);
				var offset = [-size.low[0], size.high[1]];
				offset = MakerJs.point.add(offset, opts.origin);
				MakerJs.model.findChains(scaledModel, function(chains, loose, layer) {
					function single(walkedPath) {
						var pathData = exporter.pathToSVGPathData(walkedPath.pathContext, walkedPath.offset, offset);
						doc.path(pathData).stroke(opts.stroke);
					}
					chains.map(function(chain) {
						if (chain.links.length > 1) {
							var pathData = exporter.chainToSVGPathData(chain, offset);
							doc.path(pathData).stroke(opts.stroke);
						} else {
							var walkedPath = chain.links[0].walkedPath;
							if (walkedPath.pathContext.type === MakerJs.pathType.Circle) {
								var fixedPath;
								MakerJs.path.moveTemporary([walkedPath.pathContext], [walkedPath.offset], function() {
									fixedPath = MakerJs.path.mirror(walkedPath.pathContext, false, true);
								});
								MakerJs.path.moveRelative(fixedPath, offset);
								doc.circle(fixedPath.origin[0], fixedPath.origin[1], walkedPath.pathContext.radius).stroke(opts.stroke);
							} else single(walkedPath);
						}
					});
					loose.map(single);
				}, { byLayers: false });
				doc.font(opts.fontName).fontSize(opts.fontSize);
				MakerJs.model.getAllCaptionsOffset(scaledModel).forEach(function(caption) {
					var a = MakerJs.angle.ofLineInDegrees(caption.anchor);
					var anchor = MakerJs.path.mirror(caption.anchor, false, true);
					MakerJs.path.moveRelative(anchor, offset);
					var text = caption.text;
					var textCenter = [doc.widthOfString(text) / 2, doc.heightOfString(text) / 2];
					var center = MakerJs.point.middle(anchor);
					var textOffset = MakerJs.point.subtract(center, textCenter);
					doc.rotate(-a, { origin: center });
					doc.text(text, textOffset[0], textOffset[1]);
					doc.rotate(a, { origin: center });
				});
			}
			exporter.toPDF = toPDF;
		})(MakerJs.exporter || (MakerJs.exporter = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(exporter) {
			/**
			* @private
			*/
			var chainLinkToPathDataMap = {};
			chainLinkToPathDataMap[MakerJs.pathType.Arc] = function(arc, endPoint, reversed, d, accuracy) {
				d.push("A");
				svgArcData(d, arc.radius, endPoint, accuracy, MakerJs.angle.ofArcSpan(arc) > 180, reversed ? arc.startAngle > arc.endAngle : arc.startAngle < arc.endAngle);
			};
			chainLinkToPathDataMap[MakerJs.pathType.Line] = function(line, endPoint, reversed, d, accuracy) {
				d.push("L", MakerJs.round(endPoint[0], accuracy), MakerJs.round(endPoint[1], accuracy));
			};
			chainLinkToPathDataMap[MakerJs.pathType.BezierSeed] = function(seed, endPoint, reversed, d, accuracy) {
				svgBezierData(d, seed, accuracy, reversed);
			};
			/**
			* @private
			*/
			function svgCoords(p) {
				return MakerJs.point.mirror(p, false, true);
			}
			/**
			* @private
			*/
			function correctArc(arc) {
				var arcSpan = MakerJs.angle.ofArcSpan(arc);
				arc.startAngle = MakerJs.angle.noRevolutions(arc.startAngle);
				arc.endAngle = arc.startAngle + arcSpan;
			}
			/**
			* Convert a chain to SVG path data.
			*
			* @param c Chain to convert.
			* @param offset IPoint relative offset point.
			* @param accuracy Optional accuracy of SVG path data.
			* @param clockwise Optional flag to specify desired winding direction for nonzero fill rule.
			* @returns String of SVG path data.
			*/
			function chainToSVGPathData(c, offset, accuracy, clockwise) {
				function offsetPoint(p) {
					return MakerJs.point.add(p, offset);
				}
				if (clockwise !== void 0) {
					var isClockwise = MakerJs.measure.isChainClockwise(c);
					if (isClockwise !== null && isClockwise !== clockwise) {
						c = MakerJs.cloneObject(c);
						MakerJs.chain.reverse(c);
					}
				}
				var first = c.links[0];
				var firstPoint = offsetPoint(svgCoords(first.endPoints[first.reversed ? 1 : 0]));
				var d = [
					"M",
					MakerJs.round(firstPoint[0], accuracy),
					MakerJs.round(firstPoint[1], accuracy)
				];
				for (var i = 0; i < c.links.length; i++) {
					var link = c.links[i];
					var pathContext = link.walkedPath.pathContext;
					var fn = chainLinkToPathDataMap[pathContext.type];
					if (fn) {
						var fixedPath;
						MakerJs.path.moveTemporary([pathContext], [link.walkedPath.offset], function() {
							fixedPath = MakerJs.path.mirror(pathContext, false, true);
						});
						MakerJs.path.moveRelative(fixedPath, offset);
						fn(fixedPath, offsetPoint(svgCoords(link.endPoints[link.reversed ? 0 : 1])), link.reversed, d, accuracy);
					}
				}
				if (c.endless) d.push("Z");
				return d.join(" ");
			}
			exporter.chainToSVGPathData = chainToSVGPathData;
			/**
			* @private
			*/
			function startSvgPathData(start, d, accuracy) {
				return [
					"M",
					MakerJs.round(start[0], accuracy),
					MakerJs.round(start[1], accuracy)
				].concat(d);
			}
			/**
			* @private
			*/
			var svgPathDataMap = {};
			svgPathDataMap[MakerJs.pathType.Line] = function(line, accuracy) {
				return startSvgPathData(line.origin, MakerJs.point.rounded(line.end, accuracy), accuracy);
			};
			svgPathDataMap[MakerJs.pathType.Circle] = function(circle, accuracy, clockwiseCircle) {
				return startSvgPathData(circle.origin, svgCircleData(circle.radius, accuracy, clockwiseCircle), accuracy);
			};
			svgPathDataMap[MakerJs.pathType.Arc] = function(arc, accuracy) {
				correctArc(arc);
				var arcPoints = MakerJs.point.fromArc(arc);
				if (MakerJs.measure.isPointEqual(arcPoints[0], arcPoints[1])) return svgPathDataMap[MakerJs.pathType.Circle](arc, accuracy);
				else {
					var d = ["A"];
					svgArcData(d, arc.radius, arcPoints[1], accuracy, MakerJs.angle.ofArcSpan(arc) > 180, arc.startAngle > arc.endAngle);
					return startSvgPathData(arcPoints[0], d, accuracy);
				}
			};
			svgPathDataMap[MakerJs.pathType.BezierSeed] = function(seed, accuracy) {
				var d = [];
				svgBezierData(d, seed, accuracy);
				return startSvgPathData(seed.origin, d, accuracy);
			};
			/**
			* Export a path to SVG path data.
			*
			* @param pathToExport IPath to export.
			* @param pathOffset IPoint relative offset of the path object.
			* @param exportOffset IPoint relative offset point of the export.
			* @param accuracy Optional accuracy of SVG path data.
			* @param clockwiseCircle Optional flag to use clockwise winding for circles.
			* @returns String of SVG path data.
			*/
			function pathToSVGPathData(pathToExport, pathOffset, exportOffset, accuracy, clockwiseCircle) {
				var fn = svgPathDataMap[pathToExport.type];
				if (fn) {
					var fixedPath;
					MakerJs.path.moveTemporary([pathToExport], [pathOffset], function() {
						fixedPath = MakerJs.path.mirror(pathToExport, false, true);
					});
					MakerJs.path.moveRelative(fixedPath, exportOffset);
					return fn(fixedPath, accuracy, clockwiseCircle).join(" ");
				}
				return "";
			}
			exporter.pathToSVGPathData = pathToSVGPathData;
			/**
			* @private
			*/
			function getPathDataByLayer(modelToExport, offset, options, accuracy) {
				var pathDataByLayer = {};
				options.unifyBeziers = true;
				MakerJs.model.findChains(modelToExport, function(chains, loose, layer) {
					function single(walkedPath, clockwise) {
						var pathData = pathToSVGPathData(walkedPath.pathContext, walkedPath.offset, offset, accuracy, clockwise);
						pathDataByLayer[layer].push(pathData);
					}
					pathDataByLayer[layer] = [];
					function doChains(cs, clockwise) {
						cs.forEach(function(c) {
							if (c.links.length > 1) {
								var pathData = chainToSVGPathData(c, offset, accuracy, clockwise);
								pathDataByLayer[layer].push(pathData);
							} else single(c.links[0].walkedPath, clockwise);
							if (c.contains) doChains(c.contains, !clockwise);
						});
					}
					doChains(chains, true);
					loose.forEach(function(wp) {
						return single(wp);
					});
				}, options);
				return pathDataByLayer;
			}
			function toSVGPathData(modelToExport) {
				var args = [];
				for (var _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
				var options = { fillRule: "evenodd" };
				if (typeof args[0] === "boolean") {
					options.byLayers = args[0];
					options.origin = args[1];
					options.accuracy = args[2];
				} else if (MakerJs.isObject(args[0])) MakerJs.extendObject(options, args[0]);
				var findChainsOptions = {
					byLayers: options.byLayers,
					contain: false
				};
				if (options.fillRule === "nonzero") findChainsOptions.contain = { alternateDirection: true };
				var size = MakerJs.measure.modelExtents(modelToExport);
				if (!options.origin) options.origin = [-size.low[0], size.high[1]];
				var pathDataArrayByLayer = getPathDataByLayer(modelToExport, options.origin, findChainsOptions, options.accuracy);
				var pathDataStringByLayer = {};
				for (var layer in pathDataArrayByLayer) pathDataStringByLayer[layer] = pathDataArrayByLayer[layer].join(" ");
				return findChainsOptions.byLayers ? pathDataStringByLayer : pathDataStringByLayer[""];
			}
			exporter.toSVGPathData = toSVGPathData;
			/**
			* Renders an item in SVG markup.
			*
			* @param itemToExport Item to render: may be a path, an array of paths, or a model object.
			* @param options Rendering options object.
			* @param options.annotate Boolean to indicate that the id's of paths should be rendered as SVG text elements.
			* @param options.origin point object for the rendered reference origin.
			* @param options.scale Number to scale the SVG rendering.
			* @param options.stroke String color of the rendered paths.
			* @param options.strokeWidth String numeric width and optional units of the rendered paths.
			* @param options.units String of the unit system. May be omitted. See makerjs.unitType for possible values.
			* @param options.useSvgPathOnly Boolean to use SVG path elements instead of line, circle etc.
			* @returns String of XML / SVG content.
			*/
			function toSVG(itemToExport, options) {
				function append(value, layer, forcePush) {
					if (forcePush === void 0) forcePush = false;
					if (!forcePush && typeof layer == "string" && layer.length > 0) {
						if (!(layer in layers)) layers[layer] = [];
						layers[layer].push(value);
					} else elements.push(value);
				}
				function cssStyle(elOpts) {
					var a = [];
					function push(name, val) {
						if (val === void 0) return;
						a.push(name + ":" + val);
					}
					push("stroke", elOpts.stroke);
					push("stroke-width", elOpts.strokeWidth);
					push("fill", elOpts.fill);
					return a.join(";");
				}
				function addSvgAttrs(attrs, elOpts) {
					if (!elOpts) return;
					MakerJs.extendObject(attrs, {
						"stroke": elOpts.stroke,
						"stroke-width": elOpts.strokeWidth,
						"fill": elOpts.fill,
						"style": elOpts.cssStyle || cssStyle(elOpts),
						"class": elOpts.className
					});
				}
				function colorLayerOptions(layer) {
					if (opts.layerOptions && opts.layerOptions[layer]) return opts.layerOptions[layer];
					if (layer in exporter.colors) return { stroke: layer };
				}
				function createElement(tagname, attrs, layer, innerText, forcePush) {
					if (innerText === void 0) innerText = null;
					if (forcePush === void 0) forcePush = false;
					if (tagname !== "text") addSvgAttrs(attrs, colorLayerOptions(layer));
					if (!opts.scalingStroke) attrs["vector-effect"] = "non-scaling-stroke";
					var tag = new exporter.XmlTag(tagname, attrs);
					tag.closingTags = opts.closingTags;
					if (innerText) tag.innerText = innerText;
					append(tag.toString(), layer, forcePush);
				}
				function fixPoint(pointToFix) {
					var pointMirroredY = svgCoords(pointToFix);
					return MakerJs.point.scale(pointMirroredY, opts.scale);
				}
				function fixPath(pathToFix, origin) {
					var mirrorY = MakerJs.path.mirror(pathToFix, false, true);
					return MakerJs.path.moveRelative(MakerJs.path.scale(mirrorY, opts.scale), origin);
				}
				var opts = {
					accuracy: .001,
					annotate: false,
					origin: null,
					scale: 1,
					stroke: "#000",
					strokeLineCap: "round",
					strokeWidth: "0.25mm",
					fill: "none",
					fillRule: "evenodd",
					fontSize: "9pt",
					useSvgPathOnly: true,
					viewBox: true
				};
				MakerJs.extendObject(opts, options);
				var modelToExport;
				var itemToExportIsModel = MakerJs.isModel(itemToExport);
				if (itemToExportIsModel) {
					modelToExport = itemToExport;
					if (modelToExport.exporterOptions) MakerJs.extendObject(opts, modelToExport.exporterOptions["toSVG"]);
				}
				var elements = [];
				var layers = {};
				if (itemToExportIsModel) modelToExport = itemToExport;
				else if (Array.isArray(itemToExport)) {
					var pathMap = {};
					itemToExport.forEach(function(p, i) {
						pathMap[i] = p;
					});
					modelToExport = { paths: pathMap };
				} else if (MakerJs.isPath(itemToExport)) modelToExport = { paths: { modelToMeasure: itemToExport } };
				var size = MakerJs.measure.modelExtents(modelToExport);
				var captions = MakerJs.model.getAllCaptionsOffset(modelToExport);
				captions.forEach(function(caption) {
					MakerJs.measure.increase(size, MakerJs.measure.pathExtents(caption.anchor), true);
				});
				if (!opts.units) {
					var unitSystem = exporter.tryGetModelUnits(itemToExport);
					if (unitSystem) opts.units = unitSystem;
				}
				var useSvgUnit = exporter.svgUnit[opts.units];
				if (useSvgUnit && opts.viewBox) opts.scale *= useSvgUnit.scaleConversion;
				if (size && !opts.origin) opts.origin = [-size.low[0] * opts.scale, size.high[1] * opts.scale];
				MakerJs.extendObject(options, opts);
				var svgAttrs = {};
				if (size && opts.viewBox) {
					var width = MakerJs.round(size.width * opts.scale, opts.accuracy);
					var height = MakerJs.round(size.height * opts.scale, opts.accuracy);
					var viewBox = [
						0,
						0,
						width,
						height
					];
					var unit = useSvgUnit ? useSvgUnit.svgUnitType : "";
					svgAttrs = {
						width: width + unit,
						height: height + unit,
						viewBox: viewBox.join(" ")
					};
				}
				svgAttrs["xmlns"] = "http://www.w3.org/2000/svg";
				var svgTag = new exporter.XmlTag("svg", MakerJs.extendObject(svgAttrs, opts.svgAttrs));
				append(svgTag.getOpeningTag(false));
				var groupAttrs = {
					id: "svgGroup",
					"stroke-linecap": opts.strokeLineCap,
					"fill-rule": opts.fillRule,
					"font-size": opts.fontSize
				};
				addSvgAttrs(groupAttrs, opts);
				var svgGroup = new exporter.XmlTag("g", groupAttrs);
				append(svgGroup.getOpeningTag(false));
				if (opts.useSvgPathOnly) {
					var findChainsOptions = { byLayers: true };
					if (opts.fillRule === "nonzero") findChainsOptions.contain = { alternateDirection: true };
					var pathDataByLayer = getPathDataByLayer(modelToExport, opts.origin, findChainsOptions, opts.accuracy);
					for (var layerId1 in pathDataByLayer) {
						var attrs = { "d": pathDataByLayer[layerId1].join(" ") };
						if (layerId1.length > 0) attrs["id"] = layerId1;
						createElement("path", attrs, layerId1, null, true);
					}
				} else {
					function drawText(id, textPoint, layer) {
						createElement("text", {
							"id": id + "_text",
							"x": MakerJs.round(textPoint[0], opts.accuracy),
							"y": MakerJs.round(textPoint[1], opts.accuracy)
						}, layer, id);
					}
					function drawPath(id, x, y, d, layer, route, textPoint, annotate, flow) {
						createElement("path", {
							"id": id,
							"data-route": route,
							"d": [
								"M",
								MakerJs.round(x, opts.accuracy),
								MakerJs.round(y, opts.accuracy)
							].concat(d).join(" ")
						}, layer);
						if (annotate) drawText(id, textPoint, layer);
					}
					function circleInPaths(id, center, radius, layer, route, annotate, flow) {
						var d = svgCircleData(radius, opts.accuracy);
						drawPath(id, center[0], center[1], d, layer, route, center, annotate, flow);
					}
					var map = {};
					map[MakerJs.pathType.Line] = function(id, line, layer, className, route, annotate, flow) {
						var start = line.origin;
						var end = line.end;
						createElement("line", {
							"id": id,
							"class": className,
							"data-route": route,
							"x1": MakerJs.round(start[0], opts.accuracy),
							"y1": MakerJs.round(start[1], opts.accuracy),
							"x2": MakerJs.round(end[0], opts.accuracy),
							"y2": MakerJs.round(end[1], opts.accuracy)
						}, layer);
						if (annotate) drawText(id, MakerJs.point.middle(line), layer);
						if (flow) addFlowMarks(flow, layer, line.origin, line.end, MakerJs.angle.ofLineInDegrees(line));
					};
					map[MakerJs.pathType.Circle] = function(id, circle, layer, className, route, annotate, flow) {
						var center = circle.origin;
						createElement("circle", {
							"id": id,
							"class": className,
							"data-route": route,
							"r": circle.radius,
							"cx": MakerJs.round(center[0], opts.accuracy),
							"cy": MakerJs.round(center[1], opts.accuracy)
						}, layer);
						if (annotate) drawText(id, center, layer);
					};
					map[MakerJs.pathType.Arc] = function(id, arc, layer, className, route, annotate, flow) {
						correctArc(arc);
						var arcPoints = MakerJs.point.fromArc(arc);
						if (MakerJs.measure.isPointEqual(arcPoints[0], arcPoints[1])) circleInPaths(id, arc.origin, arc.radius, layer, route, annotate, flow);
						else {
							var d = ["A"];
							svgArcData(d, arc.radius, arcPoints[1], opts.accuracy, MakerJs.angle.ofArcSpan(arc) > 180, arc.startAngle > arc.endAngle);
							drawPath(id, arcPoints[0][0], arcPoints[0][1], d, layer, route, MakerJs.point.middle(arc), annotate, flow);
							if (flow) addFlowMarks(flow, layer, arcPoints[1], arcPoints[0], MakerJs.angle.noRevolutions(arc.startAngle - 90));
						}
					};
					map[MakerJs.pathType.BezierSeed] = function(id, seed, layer, className, route, annotate, flow) {
						var d = [];
						svgBezierData(d, seed, opts.accuracy);
						drawPath(id, seed.origin[0], seed.origin[1], d, layer, route, MakerJs.point.middle(seed), annotate, flow);
					};
					function addFlowMarks(flow, layer, origin, end, endAngle) {
						var className = "flow";
						map[MakerJs.pathType.Circle]("", new MakerJs.paths.Circle(origin, flow.size / 2), layer, className, null, false, null);
						var arrowEnd = [-1 * flow.size, flow.size / 2];
						[arrowEnd, MakerJs.point.mirror(arrowEnd, false, true)].map(function(p) {
							return new MakerJs.paths.Line(MakerJs.point.add(MakerJs.point.rotate(p, endAngle), end), end);
						}).forEach(function(a) {
							return map[MakerJs.pathType.Line]("", a, layer, className, null, false, null);
						});
					}
					function beginModel(id, modelContext) {
						modelGroup.attrs = { id };
						append(modelGroup.getOpeningTag(false), modelContext.layer);
					}
					function endModel(modelContext) {
						append(modelGroup.getClosingTag(), modelContext.layer);
					}
					var modelGroup = new exporter.XmlTag("g");
					var walkOptions = {
						beforeChildWalk: function(walkedModel) {
							beginModel(walkedModel.childId, walkedModel.childModel);
							return true;
						},
						onPath: function(walkedPath) {
							var fn = map[walkedPath.pathContext.type];
							if (fn) {
								var offset = MakerJs.point.add(fixPoint(walkedPath.offset), opts.origin);
								fn(walkedPath.pathId, fixPath(walkedPath.pathContext, offset), walkedPath.layer, null, walkedPath.route, opts.annotate, opts.flow);
							}
						},
						afterChildWalk: function(walkedModel) {
							endModel(walkedModel.childModel);
						}
					};
					beginModel("0", modelToExport);
					MakerJs.model.walk(modelToExport, walkOptions);
					for (var layerId2 in layers) {
						var layerGroup = new exporter.XmlTag("g", { id: layerId2 });
						addSvgAttrs(layerGroup.attrs, colorLayerOptions(layerId2));
						for (var i = 0; i < layers[layerId2].length; i++) layerGroup.innerText += layers[layerId2][i];
						layerGroup.innerTextEscaped = true;
						append(layerGroup.toString());
					}
					endModel(modelToExport);
				}
				var captionTags = captions.map(function(caption) {
					var anchor = fixPath(caption.anchor, opts.origin);
					var center = MakerJs.point.rounded(MakerJs.point.middle(anchor), opts.accuracy);
					var tag = new exporter.XmlTag("text", {
						"alignment-baseline": "middle",
						"text-anchor": "middle",
						"transform": "rotate(".concat(MakerJs.angle.ofLineInDegrees(anchor), ",").concat(center[0], ",").concat(center[1], ")"),
						"x": center[0],
						"y": center[1]
					});
					addSvgAttrs(tag.attrs, colorLayerOptions(caption.layer));
					tag.innerText = caption.text;
					return tag.toString();
				});
				if (captionTags.length) {
					var captionGroup = new exporter.XmlTag("g", { "id": "captions" });
					addSvgAttrs(captionGroup.attrs, colorLayerOptions(captionGroup.attrs.id));
					captionGroup.innerText = captionTags.join("");
					captionGroup.innerTextEscaped = true;
					append(captionGroup.toString());
				}
				append(svgGroup.getClosingTag());
				append(svgTag.getClosingTag());
				return elements.join("");
			}
			exporter.toSVG = toSVG;
			/**
			* @private
			*/
			function svgCircleData(radius, accuracy, clockwiseCircle) {
				var r = MakerJs.round(radius, accuracy);
				var d = [
					"m",
					-r,
					0
				];
				function halfCircle(sign) {
					d.push("a");
					svgArcData(d, r, [2 * r * sign, 0], accuracy, false, !clockwiseCircle);
				}
				halfCircle(1);
				halfCircle(-1);
				d.push("z");
				return d;
			}
			/**
			* @private
			*/
			function svgBezierData(d, seed, accuracy, reversed) {
				if (seed.controls.length === 1) d.push("Q", MakerJs.round(seed.controls[0][0], accuracy), MakerJs.round(seed.controls[0][1], accuracy));
				else {
					var controls = reversed ? [seed.controls[1], seed.controls[0]] : seed.controls;
					d.push("C", MakerJs.round(controls[0][0], accuracy), MakerJs.round(controls[0][1], accuracy), MakerJs.round(controls[1][0], accuracy), MakerJs.round(controls[1][1], accuracy));
				}
				var final = reversed ? seed.origin : seed.end;
				d.push(MakerJs.round(final[0], accuracy), MakerJs.round(final[1], accuracy));
			}
			/**
			* @private
			*/
			function svgArcData(d, radius, endPoint, accuracy, largeArc, increasing) {
				var r = MakerJs.round(radius, accuracy);
				var end = endPoint;
				d.push(r, r);
				d.push(0);
				d.push(largeArc ? 1 : 0);
				d.push(increasing ? 0 : 1);
				d.push(MakerJs.round(end[0], accuracy), MakerJs.round(end[1], accuracy));
			}
			/**
			* Map of MakerJs unit system to SVG unit system
			*/
			exporter.svgUnit = {};
			exporter.svgUnit[MakerJs.unitType.Inch] = {
				svgUnitType: "in",
				scaleConversion: 1
			};
			exporter.svgUnit[MakerJs.unitType.Millimeter] = {
				svgUnitType: "mm",
				scaleConversion: 1
			};
			exporter.svgUnit[MakerJs.unitType.Centimeter] = {
				svgUnitType: "cm",
				scaleConversion: 1
			};
			exporter.svgUnit[MakerJs.unitType.Foot] = {
				svgUnitType: "in",
				scaleConversion: 12
			};
			exporter.svgUnit[MakerJs.unitType.Meter] = {
				svgUnitType: "cm",
				scaleConversion: 100
			};
		})(MakerJs.exporter || (MakerJs.exporter = {}));
	})(MakerJs || (MakerJs = {}));
	(function(MakerJs) {
		(function(importer) {
			/**
			* Create a model from SVG path data.
			*
			* @param pathData SVG path data.
			* @param options ISVGImportOptions object.
			* @param options.bezierAccuracy Optional accuracy of Bezier curves.
			* @returns An IModel object.
			*/
			function fromSVGPathData(pathData, options) {
				if (options === void 0) options = {};
				var result = {};
				function addPath(p) {
					if (!result.paths) result.paths = {};
					result.paths["p_" + ++pathCount] = p;
				}
				function addModel(m) {
					if (!result.models) result.models = {};
					result.models["p_" + ++pathCount] = m;
				}
				function getPoint(cmd, offset, from) {
					if (offset === void 0) offset = 0;
					if (from === void 0) from = cmd.from;
					if (offset < 0) offset = offset + cmd.data.length;
					var p = MakerJs.point.mirror([cmd.data[0 + offset], cmd.data[1 + offset]], false, true);
					if (cmd.absolute) return p;
					else return MakerJs.point.add(p, from);
				}
				function lineTo(cmd, end) {
					if (!MakerJs.measure.isPointEqual(cmd.from, end)) addPath(new MakerJs.paths.Line(cmd.from, end));
					return end;
				}
				var map = {};
				map["M"] = function(cmd) {
					firstPoint = getPoint(cmd);
					if (cmd.data.length > 2) {
						cmd.from = firstPoint;
						for (var a = 2; a < cmd.data.length; a = a + 2) cmd.from = lineTo(cmd, getPoint(cmd, a));
						return cmd.from;
					} else return firstPoint;
				};
				map["Z"] = function(cmd) {
					return lineTo(cmd, firstPoint);
				};
				map["H"] = function(cmd) {
					var end = MakerJs.point.clone(cmd.from);
					if (cmd.absolute) end[0] = cmd.data[0];
					else end[0] += cmd.data[0];
					return lineTo(cmd, end);
				};
				map["V"] = function(cmd) {
					var end = MakerJs.point.clone(cmd.from);
					if (cmd.absolute) end[1] = -cmd.data[0];
					else end[1] -= cmd.data[0];
					return lineTo(cmd, end);
				};
				map["L"] = function(cmd) {
					var end;
					for (var a = 0; a < cmd.data.length; a = a + 2) {
						end = getPoint(cmd, a);
						cmd.from = lineTo(cmd, end);
					}
					return cmd.from;
				};
				map["A"] = function(cmd) {
					var rx;
					var ry;
					var rotation;
					var large;
					var decreasing;
					var end;
					var elliptic;
					var xAxis;
					var arc;
					var scaleUp;
					var e;
					for (var a = 0; a < cmd.data.length; a = a + 7) {
						rx = cmd.data[0 + a];
						ry = cmd.data[1 + a];
						rotation = cmd.data[2 + a];
						large = cmd.data[3 + a] === 1;
						decreasing = cmd.data[4 + a] === 1;
						end = getPoint(cmd, 5 + a);
						elliptic = rx !== ry;
						xAxis = new MakerJs.paths.Line(cmd.from, MakerJs.point.rotate(end, rotation, cmd.from));
						if (elliptic) xAxis = MakerJs.path.distort(xAxis, 1, rx / ry);
						arc = new MakerJs.paths.Arc(xAxis.origin, xAxis.end, rx, large, decreasing);
						if (elliptic) {
							if (rx < arc.radius) {
								scaleUp = arc.radius / rx;
								rx *= scaleUp;
								ry *= scaleUp;
							}
							e = new MakerJs.models.EllipticArc(arc, 1, ry / rx, options.bezierAccuracy);
							MakerJs.model.rotate(e, -rotation, cmd.from);
							addModel(e);
						} else {
							MakerJs.path.rotate(arc, -rotation, cmd.from);
							addPath(arc);
						}
						cmd.from = end;
					}
					return end;
				};
				map["C"] = function(cmd) {
					var control1;
					var control2;
					var start = cmd.from;
					var end;
					for (var a = 0; a < cmd.data.length; a = a + 6) {
						cmd.from = start;
						control1 = getPoint(cmd, 0 + a, start);
						control2 = getPoint(cmd, 2 + a, start);
						end = getPoint(cmd, 4 + a, start);
						addModel(new MakerJs.models.BezierCurve(start, control1, control2, end, options.bezierAccuracy));
						start = end;
					}
					return end;
				};
				map["S"] = function(cmd) {
					var control1;
					var prevControl2;
					var control2;
					var start = cmd.from;
					var end;
					if (cmd.prev.command === "C" || cmd.prev.command === "S") prevControl2 = getPoint(cmd.prev, -4);
					else prevControl2 = cmd.from;
					for (var a = 0; a < cmd.data.length; a = a + 4) {
						cmd.from = start;
						control1 = MakerJs.point.rotate(prevControl2, 180, start);
						control2 = getPoint(cmd, 0 + a);
						end = getPoint(cmd, 2 + a);
						addModel(new MakerJs.models.BezierCurve(start, control1, control2, end, options.bezierAccuracy));
						start = end;
						prevControl2 = control2;
					}
					return end;
				};
				map["Q"] = function(cmd) {
					var control;
					var start = cmd.from;
					var end;
					for (var a = 0; a < cmd.data.length; a = a + 4) {
						cmd.from = start;
						control = getPoint(cmd, 0 + a);
						end = getPoint(cmd, 2 + a);
						addModel(new MakerJs.models.BezierCurve(start, control, end, options.bezierAccuracy));
						start = end;
					}
					return end;
				};
				map["T"] = function(cmd) {
					var control;
					var prevControl;
					var end;
					if (cmd.prev.command === "Q") {
						prevControl = getPoint(cmd.prev, -4);
						control = MakerJs.point.rotate(prevControl, 180, cmd.from);
					} else if (cmd.prev.command === "T") {
						cmd.prev.absolute = true;
						control = getPoint(cmd.prev, -2);
					} else control = cmd.from;
					for (var a = 0; a < cmd.data.length; a = a + 2) {
						end = getPoint(cmd, 0 + a);
						addModel(new MakerJs.models.BezierCurve(cmd.from, control, end, options.bezierAccuracy));
						cmd.from = end;
						control = MakerJs.point.rotate(control, 180, cmd.from);
					}
					var p = MakerJs.point.mirror(control, false, true);
					cmd.data.push.apply(cmd.data, p);
					return end;
				};
				var firstPoint = [0, 0];
				var currPoint = [0, 0];
				var pathCount = 0;
				var prevCommand;
				var regexpCommands = /([achlmqstvz])([0-9e\.,\+-\s]*)/gi;
				var commandMatches;
				while ((commandMatches = regexpCommands.exec(pathData)) !== null) {
					if (commandMatches.index === regexpCommands.lastIndex) regexpCommands.lastIndex++;
					var command = commandMatches[1];
					var dataString = commandMatches[2];
					var currCmd = {
						command: command.toUpperCase(),
						data: [],
						from: currPoint,
						prev: prevCommand
					};
					if (command === currCmd.command) currCmd.absolute = true;
					currCmd.data = importer.parseNumericList(dataString);
					var fn = map[currCmd.command];
					if (fn) currPoint = fn(currCmd);
					prevCommand = currCmd;
				}
				return result;
			}
			importer.fromSVGPathData = fromSVGPathData;
		})(MakerJs.importer || (MakerJs.importer = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(layout) {
			/**
			* @private
			*/
			function getChildPlacement(parentModel, baseline) {
				var atlas = new MakerJs.measure.Atlas(parentModel);
				var measureParent = MakerJs.measure.modelExtents(parentModel, atlas);
				var parentTop = measureParent.high[1];
				var cpa = [];
				var xMap = {};
				MakerJs.model.walk(parentModel, { beforeChildWalk: function(context) {
					var child = context.childModel;
					var m = atlas.modelMap[context.routeKey];
					if (!m) return;
					var childMeasure = MakerJs.measure.augment(m);
					MakerJs.model.originate(child, [childMeasure.center[0], parentTop * baseline]);
					var x = child.origin[0] - measureParent.low[0];
					xMap[context.childId] = x;
					var xRatio = x / measureParent.width;
					cpa.push({
						childId: context.childId,
						xRatio
					});
					return false;
				} });
				cpa.sort(function(a, b) {
					return a.xRatio - b.xRatio;
				});
				var first = cpa[0];
				var last = cpa[cpa.length - 1];
				if (cpa.length > 1) {
					var min = first.xRatio;
					var span = last.xRatio - min;
					cpa.forEach(function(cp) {
						return cp.xRatio = (cp.xRatio - min) / span;
					});
				}
				return {
					cpa,
					firstX: xMap[first.childId],
					lastX: measureParent.width - xMap[last.childId]
				};
			}
			/**
			* @private
			*/
			function moveAndRotate(parentModel, cpa, rotate) {
				cpa.forEach(function(cp) {
					var child = parentModel.models[cp.childId];
					child.origin = cp.origin;
					if (rotate) MakerJs.model.rotate(child, cp.angle, cp.origin);
				});
			}
			/**
			* @private
			*/
			var onPathMap = {};
			onPathMap[MakerJs.pathType.Arc] = function(arc, reversed, cpa) {
				var arcSpan = MakerJs.angle.ofArcSpan(arc);
				cpa.forEach(function(p) {
					return p.angle = reversed ? arc.endAngle - p.xRatio * arcSpan - 90 : arc.startAngle + p.xRatio * arcSpan + 90;
				});
			};
			onPathMap[MakerJs.pathType.Line] = function(line, reversed, cpa) {
				var lineAngle = MakerJs.angle.ofLineInDegrees(line);
				cpa.forEach(function(p) {
					return p.angle = lineAngle;
				});
			};
			/**
			* Layout the children of a model along a path.
			* The x-position of each child will be projected onto the path so that the proportion between children is maintained.
			* Each child will be rotated such that it will be perpendicular to the path at the child's x-center.
			*
			* @param parentModel The model containing children to lay out.
			* @param onPath The path on which to lay out.
			* @param baseline Numeric percentage value of vertical displacement from the path. Default is zero.
			* @param reversed Flag to travel along the path in reverse. Default is false.
			* @param contain Flag to contain the children layout within the length of the path. Default is false.
			* @param rotate Flag to rotate the child to perpendicular. Default is true.
			* @returns The parentModel, for cascading.
			*/
			function childrenOnPath(parentModel, onPath, baseline, reversed, contain, rotate) {
				if (baseline === void 0) baseline = 0;
				if (reversed === void 0) reversed = false;
				if (contain === void 0) contain = false;
				if (rotate === void 0) rotate = true;
				var result = getChildPlacement(parentModel, baseline);
				var cpa = result.cpa;
				var chosenPath = onPath;
				if (contain && cpa.length > 1) {
					var onPathLength = MakerJs.measure.pathLength(onPath);
					if (result.firstX + result.lastX < onPathLength) {
						chosenPath = MakerJs.path.clone(onPath);
						MakerJs.path.alterLength(chosenPath, -result.firstX, true);
						MakerJs.path.alterLength(chosenPath, -result.lastX);
					}
				}
				cpa.forEach(function(p) {
					return p.origin = MakerJs.point.middle(chosenPath, reversed ? 1 - p.xRatio : p.xRatio);
				});
				var fn = onPathMap[chosenPath.type];
				if (fn) fn(chosenPath, reversed, cpa);
				moveAndRotate(parentModel, cpa, rotate);
				return parentModel;
			}
			layout.childrenOnPath = childrenOnPath;
			/**
			* @private
			*/
			function miterAngles(points, offsetAngle) {
				var arc = new MakerJs.paths.Arc([0, 0], 0, 0, 0);
				return points.map(function(p, i) {
					var a;
					if (i === 0) a = MakerJs.angle.ofPointInDegrees(p, points[i + 1]) + 90;
					else if (i === points.length - 1) a = MakerJs.angle.ofPointInDegrees(points[i - 1], p) + 90;
					else {
						arc.origin = p;
						arc.startAngle = MakerJs.angle.ofPointInDegrees(p, points[i + 1]);
						arc.endAngle = MakerJs.angle.ofPointInDegrees(p, points[i - 1]);
						a = MakerJs.angle.ofArcMiddle(arc);
					}
					return a + offsetAngle;
				});
			}
			/**
			* Layout the children of a model along a chain.
			* The x-position of each child will be projected onto the chain so that the proportion between children is maintained.
			* The projected positions of the children will become an array of points that approximate the chain.
			* Each child will be rotated such that it will be mitered according to the vertex angles formed by this series of points.
			*
			* @param parentModel The model containing children to lay out.
			* @param onChain The chain on which to lay out.
			* @param baseline Numeric percentage value of vertical displacement from the chain. Default is zero.
			* @param reversed Flag to travel along the chain in reverse. Default is false.
			* @param contain Flag to contain the children layout within the length of the chain. Default is false.
			* @param rotate Flag to rotate the child to mitered angle. Default is true.
			* @returns The parentModel, for cascading.
			*/
			function childrenOnChain(parentModel, onChain, baseline, reversed, contain, rotated) {
				if (baseline === void 0) baseline = 0;
				if (reversed === void 0) reversed = false;
				if (contain === void 0) contain = false;
				if (rotated === void 0) rotated = true;
				var result = getChildPlacement(parentModel, baseline);
				var cpa = result.cpa;
				var chainLength = onChain.pathLength;
				var points;
				if (cpa.length > 1) {
					if (contain) chainLength -= result.firstX + result.lastX;
					var absolutes = cpa.map(function(cp) {
						return (reversed ? 1 - cp.xRatio : cp.xRatio) * chainLength;
					});
					var relatives;
					if (reversed) absolutes.reverse();
					relatives = absolutes.map(function(ab, i) {
						return Math.abs(ab - (i == 0 ? 0 : absolutes[i - 1]));
					});
					if (contain) relatives[0] += reversed ? result.lastX : result.firstX;
					else relatives.shift();
					points = MakerJs.chain.toPoints(onChain, relatives);
					if (points.length < cpa.length) {
						var endLink = onChain.links[onChain.links.length - 1];
						points.push(endLink.endPoints[endLink.reversed ? 0 : 1]);
					}
					if (contain) points.shift();
				} else {
					points = MakerJs.chain.toPoints(onChain, .5 * chainLength);
					points.length = 2;
					points.push(onChain.links[onChain.links.length - 1].endPoints[onChain.links[onChain.links.length - 1].reversed ? 0 : 1]);
				}
				if (reversed) points.reverse();
				var angles = miterAngles(points, -90);
				if (cpa.length > 1) cpa.forEach(function(cp, i) {
					cp.angle = angles[i];
					cp.origin = points[i];
				});
				else {
					cpa[0].angle = angles[1];
					cpa[0].origin = points[1];
				}
				moveAndRotate(parentModel, cpa, rotated);
				return parentModel;
			}
			layout.childrenOnChain = childrenOnChain;
			/**
			* Layout clones in a radial format.
			*
			* Example:
			* ```
			* //daisy petals
			* var makerjs = require('makerjs');
			*
			* var belt = new makerjs.models.Belt(5, 50, 20);
			*
			* makerjs.model.move(belt, [25, 0]);
			*
			* var petals = makerjs.layout.cloneToRadial(belt, 8, 45);
			*
			* document.write(makerjs.exporter.toSVG(petals));
			* ```
			*
			* @param itemToClone: Either a model or a path object.
			* @param count Number of clones in the radial result.
			* @param angleInDegrees angle of rotation between clones..
			* @returns A new model with clones in a radial format.
			*/
			function cloneToRadial(itemToClone, count, angleInDegrees, rotationOrigin) {
				var result = {};
				var add;
				var rotateFn;
				if (MakerJs.isModel(itemToClone)) {
					add = result.models = {};
					rotateFn = MakerJs.model.rotate;
				} else {
					add = result.paths = {};
					rotateFn = MakerJs.path.rotate;
				}
				for (var i = 0; i < count; i++) add[i] = rotateFn(MakerJs.cloneObject(itemToClone), i * angleInDegrees, rotationOrigin);
				return result;
			}
			layout.cloneToRadial = cloneToRadial;
			/**
			* @private
			*/
			function cloneTo(dimension, itemToClone, count, margin) {
				var result = {};
				var add;
				var measureFn;
				var moveFn;
				if (MakerJs.isModel(itemToClone)) {
					measureFn = MakerJs.measure.modelExtents;
					add = result.models = {};
					moveFn = MakerJs.model.move;
				} else {
					measureFn = MakerJs.measure.pathExtents;
					add = result.paths = {};
					moveFn = MakerJs.path.move;
				}
				var m = measureFn(itemToClone);
				var size = m.high[dimension] - m.low[dimension];
				for (var i = 0; i < count; i++) {
					var origin = [0, 0];
					origin[dimension] = i * (size + margin);
					add[i] = moveFn(MakerJs.cloneObject(itemToClone), origin);
				}
				return result;
			}
			/**
			* Layout clones in a column format.
			*
			* Example:
			* ```
			* //Grooves for a finger joint
			* var m = require('makerjs');
			*
			* var dogbone = new m.models.Dogbone(50, 20, 2, -1, false);
			*
			* var grooves = m.layout.cloneToColumn(dogbone, 5, 20);
			*
			* document.write(m.exporter.toSVG(grooves));
			* ```
			*
			* @param itemToClone: Either a model or a path object.
			* @param count Number of clones in the column.
			* @param margin Optional distance between each clone.
			* @returns A new model with clones in a column.
			*/
			function cloneToColumn(itemToClone, count, margin) {
				if (margin === void 0) margin = 0;
				return cloneTo(1, itemToClone, count, margin);
			}
			layout.cloneToColumn = cloneToColumn;
			/**
			* Layout clones in a row format.
			*
			* Example:
			* ```
			* //Tongue and grooves for a box joint
			* var m = require('makerjs');
			* var tongueWidth = 60;
			* var grooveWidth = 50;
			* var grooveDepth = 30;
			* var groove = new m.models.Dogbone(grooveWidth, grooveDepth, 5, 0, true);
			*
			* groove.paths['leftTongue'] = new m.paths.Line([-tongueWidth / 2, 0], [0, 0]);
			* groove.paths['rightTongue'] = new m.paths.Line([grooveWidth, 0], [grooveWidth + tongueWidth / 2, 0]);
			*
			* var tongueAndGrooves = m.layout.cloneToRow(groove, 3);
			*
			* document.write(m.exporter.toSVG(tongueAndGrooves));
			* ```
			*
			* @param itemToClone: Either a model or a path object.
			* @param count Number of clones in the row.
			* @param margin Optional distance between each clone.
			* @returns A new model with clones in a row.
			*/
			function cloneToRow(itemToClone, count, margin) {
				if (margin === void 0) margin = 0;
				return cloneTo(0, itemToClone, count, margin);
			}
			layout.cloneToRow = cloneToRow;
			/**
			* Layout clones in a grid format.
			*
			* Example:
			* ```
			* //Grid of squares
			* var m = require('makerjs');
			* var square = new m.models.Square(43);
			* var grid = m.layout.cloneToGrid(square, 5, 5, 7);
			* document.write(m.exporter.toSVG(grid));
			* ```
			*
			* @param itemToClone: Either a model or a path object.
			* @param xCount Number of columns in the grid.
			* @param yCount Number of rows in the grid.
			* @param margin Optional numeric distance between each clone. Can also be a 2 dimensional array of numbers, to specify distances in x and y dimensions.
			* @returns A new model with clones in a grid layout.
			*/
			function cloneToGrid(itemToClone, xCount, yCount, margin) {
				var margins = getMargins(margin);
				return cloneToColumn(cloneToRow(itemToClone, xCount, margins[0]), yCount, margins[1]);
			}
			layout.cloneToGrid = cloneToGrid;
			/**
			* @private
			*/
			function getMargins(margin) {
				if (Array.isArray(margin)) return margin;
				else return [margin, margin];
			}
			/**
			* @private
			*/
			function cloneToAlternatingRows(itemToClone, xCount, yCount, spacingFn) {
				var modelToMeasure;
				if (MakerJs.isModel(itemToClone)) modelToMeasure = itemToClone;
				else modelToMeasure = { paths: { "0": itemToClone } };
				var spacing = spacingFn(modelToMeasure);
				var result = { models: {} };
				for (var i = 0; i < yCount; i++) {
					var i2 = i % 2;
					result.models[i] = MakerJs.model.move(cloneToRow(itemToClone, xCount + i2, spacing.xMargin), [i2 * spacing.x, i * spacing.y]);
				}
				return result;
			}
			/**
			* Layout clones in a brick format. Alternating rows will have an additional item in each row.
			*
			* Examples:
			* ```
			* //Brick wall
			* var m = require('makerjs');
			* var brick = new m.models.RoundRectangle(50, 30, 4);
			* var wall = m.layout.cloneToBrick(brick, 8, 6, 3);
			* document.write(m.exporter.toSVG(wall));
			* ```
			*
			* ```
			* //Fish scales
			* var m = require('makerjs');
			* var arc = new m.paths.Arc([0, 0], 50, 20, 160);
			* var scales = m.layout.cloneToBrick(arc, 8, 20);
			* document.write(m.exporter.toSVG(scales));
			* ```
			*
			* @param itemToClone: Either a model or a path object.
			* @param xCount Number of columns in the brick grid.
			* @param yCount Number of rows in the brick grid.
			* @param margin Optional numeric distance between each clone. Can also be a 2 dimensional array of numbers, to specify distances in x and y dimensions.
			* @returns A new model with clones in a brick layout.
			*/
			function cloneToBrick(itemToClone, xCount, yCount, margin) {
				var margins = getMargins(margin);
				function spacing(modelToMeasure) {
					var m = MakerJs.measure.modelExtents(modelToMeasure);
					var xMargin = margins[0] || 0;
					var yMargin = margins[1] || 0;
					return {
						x: (m.width + xMargin) / -2,
						y: m.height + yMargin,
						xMargin
					};
				}
				return cloneToAlternatingRows(itemToClone, xCount, yCount, spacing);
			}
			layout.cloneToBrick = cloneToBrick;
			/**
			* Layout clones in a honeycomb format. Alternating rows will have an additional item in each row.
			*
			* Examples:
			* ```
			* //Honeycomb
			* var m = require('makerjs');
			* var hex = new m.models.Polygon(6, 50, 30);
			* var pattern = m.layout.cloneToHoneycomb(hex, 8, 9, 10);
			* document.write(m.exporter.toSVG(pattern));
			* ```
			*
			* @param itemToClone: Either a model or a path object.
			* @param xCount Number of columns in the honeycomb grid.
			* @param yCount Number of rows in the honeycomb grid.
			* @param margin Optional distance between each clone.
			* @returns A new model with clones in a honeycomb layout.
			*/
			function cloneToHoneycomb(itemToClone, xCount, yCount, margin) {
				if (margin === void 0) margin = 0;
				function spacing(modelToMeasure) {
					var hex = MakerJs.measure.boundingHexagon(modelToMeasure);
					var s = 2 * MakerJs.solvers.equilateralAltitude(hex.radius) + margin;
					return {
						x: s / -2,
						y: MakerJs.solvers.equilateralAltitude(s),
						xMargin: margin
					};
				}
				return cloneToAlternatingRows(itemToClone, xCount, yCount, spacing);
			}
			layout.cloneToHoneycomb = cloneToHoneycomb;
		})(MakerJs.layout || (MakerJs.layout = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(models) {
			/**
			* @private
			*/
			var hasLib = false;
			/**
			* @private
			*/
			function ensureBezierLib() {
				if (hasLib) return;
				try {
					Bezier.prototype;
					hasLib = true;
				} catch (e) {
					throw "Bezier library not found. If you are using Node, try running 'npm install' or if you are in the browser, download http://pomax.github.io/bezierjs/bezier.js to your website and add a script tag.";
				}
			}
			/**
			* @private
			*/
			var scratch;
			/**
			* @private
			*/
			function getScratch(seed) {
				var points = [seed.origin];
				points.push.apply(points, seed.controls);
				points.push(seed.end);
				var bezierJsPoints = points.map(function(p) {
					return {
						x: p[0],
						y: p[1]
					};
				});
				if (!scratch) {
					ensureBezierLib();
					scratch = new Bezier(bezierJsPoints);
				} else Bezier.apply(scratch, bezierJsPoints);
				return scratch;
			}
			/**
			* @private
			*/
			function BezierToSeed(b, range) {
				var seed = new BezierSeed(b.points.map(getIPoint));
				if (range) seed.parentRange = range;
				return seed;
			}
			/**
			* @private
			*/
			function seedToBezier(seed) {
				var coords = [];
				coords.push.apply(coords, seed.origin);
				coords.push.apply(coords, seed.controls[0]);
				if (seed.controls.length > 1) coords.push.apply(coords, seed.controls[1]);
				coords.push.apply(coords, seed.end);
				ensureBezierLib();
				return new Bezier(coords);
			}
			/**
			* @private
			*/
			function getExtrema(b) {
				var extrema = b.extrema().values.map(function(m) {
					return MakerJs.round(m);
				}).filter(function(value, index, self) {
					return self.indexOf(value) === index;
				}).sort();
				if (extrema.length === 0) return [0, 1];
				if (extrema[0] !== 0) extrema.unshift(0);
				if (extrema[extrema.length - 1] !== 1) extrema.push(1);
				return extrema;
			}
			/**
			* @private
			*/
			function getIPoint(p) {
				return [p.x, p.y];
			}
			/**
			* @private
			*/
			var TPoint = function() {
				function TPoint(b, t, offset) {
					this.t = t;
					this.point = MakerJs.point.add(getIPoint(b.get(t)), offset);
				}
				return TPoint;
			}();
			/**
			* @private
			*/
			function getError(b, startT, endT, arc, arcReversed) {
				var tSpan = endT - startT;
				function m(ratio) {
					var t = startT + tSpan * ratio;
					var bp = getIPoint(b.get(t));
					var ap = MakerJs.point.middle(arc, arcReversed ? 1 - ratio : ratio);
					return MakerJs.measure.pointDistance(ap, bp);
				}
				return m(.25) + m(.75);
			}
			/**
			* @private
			*/
			function getLargestArc(b, startT, endT, accuracy) {
				var arc, lastGoodArc;
				var start = new TPoint(b, startT);
				var upper = new TPoint(b, endT);
				var lower = start;
				var count = 0;
				var test = upper;
				var reversed;
				while (count < 100) {
					var middle = getIPoint(b.get((start.t + test.t) / 2));
					try {
						arc = new MakerJs.paths.Arc(start.point, middle, test.point);
					} catch (e) {
						if (lastGoodArc) return lastGoodArc;
						else break;
					}
					if (reversed === void 0) reversed = MakerJs.measure.isPointEqual(start.point, MakerJs.point.fromAngleOnCircle(arc.endAngle, arc));
					if (getError(b, startT, test.t, arc, reversed) <= accuracy) {
						arc.bezierData = {
							startT,
							endT: test.t
						};
						lower = test;
						lastGoodArc = arc;
					} else upper = test;
					if (lower.t === upper.t || lastGoodArc && lastGoodArc !== arc && MakerJs.angle.ofArcSpan(arc) - MakerJs.angle.ofArcSpan(lastGoodArc) < .5) return lastGoodArc;
					count++;
					test = new TPoint(b, (lower.t + upper.t) / 2);
				}
				var line = new MakerJs.paths.Line(start.point, test.point);
				line.bezierData = {
					startT,
					endT: test.t
				};
				return line;
			}
			/**
			* @private
			*/
			function getArcs(bc, b, accuracy, startT, endT, base) {
				var added = 0;
				var arc;
				while (startT < endT) {
					arc = getLargestArc(b, startT, endT, accuracy);
					startT = arc.bezierData.endT;
					if (MakerJs.measure.pathLength(arc) < 1e-4) continue;
					bc.paths[arc.type + "_" + (base + added)] = arc;
					added++;
				}
				return added;
			}
			/**
			* @private
			*/
			function getActualBezierRange(curve, arc, endpoints, offset, pointMatchingDistance) {
				var b = getScratch(curve.seed);
				var tPoints = [arc.bezierData.startT, arc.bezierData.endT].map(function(t) {
					return new TPoint(b, t, offset);
				});
				var ends = endpoints.slice();
				var endpointDistancetoStart = ends.map(function(e) {
					return MakerJs.measure.pointDistance(e, tPoints[0].point);
				});
				if (endpointDistancetoStart[0] > endpointDistancetoStart[1]) ends.reverse();
				for (var i = 2; i--;) if (!MakerJs.measure.isPointEqual(ends[i], tPoints[i].point, pointMatchingDistance)) return null;
				return arc.bezierData;
			}
			/**
			* @private
			*/
			function getChainBezierRange(curve, c, layer, addToLayer, pointMatchingDistance) {
				var endLinks = [c.links[0], c.links[c.links.length - 1]];
				if (endLinks[0].walkedPath.pathContext.bezierData.startT > endLinks[1].walkedPath.pathContext.bezierData.startT) {
					MakerJs.chain.reverse(c);
					endLinks.reverse();
				}
				var actualBezierRanges = endLinks.map(function(endLink) {
					return getActualBezierRange(curve, endLink.walkedPath.pathContext, endLink.endPoints, endLink.walkedPath.offset, pointMatchingDistance);
				});
				var result = {
					startT: actualBezierRanges[0] ? actualBezierRanges[0].startT : null,
					endT: actualBezierRanges[1] ? actualBezierRanges[1].endT : null
				};
				if (result.startT !== null && result.endT !== null) return result;
				else if (c.links.length > 2) {
					if (result.startT === null) {
						addToLayer(c.links[0].walkedPath.pathContext, layer, true);
						result.startT = c.links[1].walkedPath.pathContext.bezierData.startT;
					}
					if (result.endT === null) {
						addToLayer(c.links[c.links.length - 1].walkedPath.pathContext, layer, true);
						result.endT = c.links[c.links.length - 2].walkedPath.pathContext.bezierData.endT;
					}
					return result;
				}
				return null;
			}
			/**
			* @private
			* Class for bezier seed.
			*/
			var BezierSeed = function() {
				function BezierSeed() {
					var args = [];
					for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
					this.type = MakerJs.pathType.BezierSeed;
					switch (args.length) {
						case 1:
							var points = args[0];
							this.origin = points[0];
							if (points.length === 3) {
								this.controls = [points[1]];
								this.end = points[2];
							} else if (points.length === 4) {
								this.controls = [points[1], points[2]];
								this.end = points[3];
							} else this.end = points[1];
							break;
						case 3:
							if (Array.isArray(args[1])) this.controls = args[1];
							else this.controls = [args[1]];
							this.end = args[2];
							break;
						case 4:
							this.controls = [args[1], args[2]];
							this.end = args[3];
							break;
					}
				}
				return BezierSeed;
			}();
			var BezierCurve = function() {
				function BezierCurve() {
					var args = [];
					for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
					this.type = BezierCurve.typeName;
					var isArrayArg0 = Array.isArray(args[0]);
					switch (args.length) {
						case 2: if (isArrayArg0) this.accuracy = args[1];
						else {
							this.seed = args[0];
							this.accuracy = args[1];
							break;
						}
						case 1:
							if (isArrayArg0) {
								var points = args[0];
								this.seed = new BezierSeed(points);
							} else this.seed = args[0];
							break;
						default:
							switch (args.length) {
								case 4: if (MakerJs.isPoint(args[3])) {
									this.seed = new BezierSeed(args);
									break;
								} else this.accuracy = args[3];
								case 3:
									if (isArrayArg0) this.seed = new BezierSeed(args.slice(0, 3));
									break;
								case 5:
									this.accuracy = args[4];
									this.seed = new BezierSeed(args.slice(0, 4));
									break;
							}
							break;
					}
					this.paths = {};
					if (MakerJs.measure.isBezierSeedLinear(this.seed)) {
						var line = new MakerJs.paths.Line(MakerJs.point.clone(this.seed.origin), MakerJs.point.clone(this.seed.end));
						line.bezierData = {
							startT: 0,
							endT: 1
						};
						this.paths = { "0": line };
						return;
					}
					var b = seedToBezier(this.seed);
					var extrema = getExtrema(b);
					this.paths = {};
					if (!this.accuracy) {
						var len = b.length();
						this.accuracy = len / 100;
					}
					var count = 0;
					for (var i = 1; i < extrema.length; i++) {
						var extremaSpan = extrema[i] - extrema[i - 1];
						count += getArcs(this, b, this.accuracy * extremaSpan, extrema[i - 1], extrema[i], count);
					}
				}
				BezierCurve.getBezierSeeds = function(curve, options) {
					if (options === void 0) options = {};
					options.shallow = true;
					options.unifyBeziers = false;
					var seedsByLayer = {};
					var addToLayer = function(pathToAdd, layer, clone) {
						if (clone === void 0) clone = false;
						if (!seedsByLayer[layer]) seedsByLayer[layer] = [];
						seedsByLayer[layer].push(clone ? MakerJs.path.clone(pathToAdd) : pathToAdd);
					};
					MakerJs.model.findChains(curve, function(chains, loose, layer) {
						chains.forEach(function(c) {
							var range = getChainBezierRange(curve, c, layer, addToLayer, options.pointMatchingDistance);
							if (range) addToLayer(BezierToSeed(getScratch(curve.seed).split(range.startT, range.endT)), layer);
							else c.links.forEach(function(link) {
								return addToLayer(link.walkedPath.pathContext, layer, true);
							});
						});
						loose.forEach(function(wp) {
							if (wp.pathContext.type === MakerJs.pathType.Line) return addToLayer(wp.pathContext, layer, true);
							var range = getActualBezierRange(curve, wp.pathContext, MakerJs.point.fromPathEnds(wp.pathContext), wp.offset, options.pointMatchingDistance);
							if (range) addToLayer(BezierToSeed(getScratch(curve.seed).split(range.startT, range.endT)), layer);
							else addToLayer(wp.pathContext, layer, true);
						});
					}, options);
					if (options.byLayers) return seedsByLayer;
					else return seedsByLayer[""];
				};
				BezierCurve.computeLength = function(seed) {
					return seedToBezier(seed).length();
				};
				BezierCurve.computePoint = function(seed, t) {
					return getIPoint(getScratch(seed).compute(t));
				};
				BezierCurve.typeName = "BezierCurve";
				return BezierCurve;
			}();
			models.BezierCurve = BezierCurve;
			BezierCurve.metaParameters = [{
				title: "points",
				type: "select",
				value: [
					[
						[100, 0],
						[-80, -60],
						[100, 220],
						[100, 60]
					],
					[
						[0, 0],
						[100, 0],
						[100, 100]
					],
					[
						[0, 0],
						[20, 0],
						[80, 100],
						[100, 100]
					]
				]
			}];
		})(MakerJs.models || (MakerJs.models = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(models) {
			/**
			* @private
			* Our maximum circular arc span for accurate representation by a cubic curve.
			*/
			var maxBezierArcspan = 45;
			/**
			* @private
			*/
			function controlYForCircularCubic(arcSpanInRadians) {
				return 4 * (Math.tan(arcSpanInRadians / 4) / 3);
			}
			/**
			* @private
			*/
			function controlPointsForCircularCubic(arc) {
				var arcSpan = MakerJs.angle.ofArcSpan(arc);
				var y = controlYForCircularCubic(MakerJs.angle.toRadians(arcSpan));
				var c1 = [arc.radius, arc.radius * y];
				return [c1, MakerJs.point.rotate(MakerJs.point.mirror(c1, false, true), arcSpan, [0, 0])].map(function(p) {
					return MakerJs.point.add(arc.origin, MakerJs.point.rotate(p, arc.startAngle, [0, 0]));
				});
			}
			/**
			* @private
			*/
			function bezierSeedFromArc(arc) {
				if (MakerJs.angle.ofArcSpan(arc) <= 90) {
					var endPoints = MakerJs.point.fromPathEnds(arc);
					var controls = controlPointsForCircularCubic(arc);
					return {
						type: MakerJs.pathType.BezierSeed,
						origin: endPoints[0],
						controls,
						end: endPoints[1]
					};
				}
				return null;
			}
			var Ellipse = function() {
				function Ellipse() {
					var args = [];
					for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
					var _this = this;
					this.models = {};
					var n = 360 / maxBezierArcspan;
					var accuracy;
					var isPointArgs0 = MakerJs.isPoint(args[0]);
					var realArgs = function(numArgs) {
						switch (numArgs) {
							case 2:
								if (isPointArgs0) _this.origin = args[0];
								break;
							case 3:
								_this.origin = args[0];
								break;
							case 4:
								_this.origin = [args[0], args[1]];
								break;
						}
						var a = 360 / n;
						var arc = new MakerJs.paths.Arc([0, 0], 1, 0, a);
						for (var i = 0; i < n; i++) {
							var seed = bezierSeedFromArc(arc);
							switch (numArgs) {
								case 1:
									seed = MakerJs.path.scale(seed, args[0]);
									break;
								case 2:
									if (isPointArgs0) seed = MakerJs.path.scale(seed, args[1]);
									else seed = MakerJs.path.distort(seed, args[0], args[1]);
									break;
								case 3:
									seed = MakerJs.path.distort(seed, args[1], args[2]);
									break;
								case 4:
									seed = MakerJs.path.distort(seed, args[2], args[3]);
									break;
							}
							_this.models["Curve_" + (1 + i)] = new models.BezierCurve(seed, accuracy);
							arc.startAngle += a;
							arc.endAngle += a;
						}
					};
					switch (args.length) {
						case 2:
							realArgs(2);
							break;
						case 3:
							if (isPointArgs0) realArgs(3);
							else {
								accuracy = args[2];
								realArgs(2);
							}
							break;
						case 4:
							if (isPointArgs0) {
								accuracy = args[3];
								realArgs(3);
							} else realArgs(4);
							break;
						case 5:
							accuracy = args[4];
							realArgs(4);
							break;
					}
				}
				return Ellipse;
			}();
			models.Ellipse = Ellipse;
			Ellipse.metaParameters = [{
				title: "radiusX",
				type: "range",
				min: 1,
				max: 50,
				value: 50
			}, {
				title: "radiusY",
				type: "range",
				min: 1,
				max: 50,
				value: 25
			}];
			var EllipticArc = function() {
				function EllipticArc() {
					var args = [];
					for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
					this.models = {};
					var arc;
					var accuracy;
					var distortX;
					var distortY;
					if (MakerJs.isPathArc(args[0])) {
						arc = args[0];
						distortX = args[1];
						distortY = args[2];
						accuracy = args[3];
					} else {
						arc = new MakerJs.paths.Arc([0, 0], 1, args[0], args[1]);
						distortX = args[2];
						distortY = args[3];
						accuracy = args[4];
					}
					var span = MakerJs.angle.ofArcSpan(arc);
					var count = Math.ceil(span / maxBezierArcspan);
					var subSpan = span / count;
					var subArc = MakerJs.path.clone(arc);
					for (var i = 0; i < count; i++) {
						subArc.startAngle = arc.startAngle + i * subSpan;
						subArc.endAngle = subArc.startAngle + subSpan;
						var seed = bezierSeedFromArc(subArc);
						seed = MakerJs.path.distort(seed, distortX, distortY);
						this.models["Curve_" + (1 + i)] = new models.BezierCurve(seed, accuracy);
					}
				}
				return EllipticArc;
			}();
			models.EllipticArc = EllipticArc;
			EllipticArc.metaParameters = [
				{
					title: "startAngle",
					type: "range",
					min: 0,
					max: 90,
					value: 0
				},
				{
					title: "endAngle",
					type: "range",
					min: 90,
					max: 360,
					value: 180
				},
				{
					title: "radiusX",
					type: "range",
					min: 1,
					max: 50,
					value: 50
				},
				{
					title: "radiusY",
					type: "range",
					min: 1,
					max: 50,
					value: 25
				}
			];
		})(MakerJs.models || (MakerJs.models = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(models) {
			/**
			* @private
			*/
			function getPoints(arg) {
				var coords;
				if (Array.isArray(arg)) {
					if (MakerJs.isPoint(arg[0])) return arg;
					coords = arg;
				} else coords = MakerJs.importer.parseNumericList(arg);
				var points = [];
				for (var i = 0; i < coords.length; i += 2) points.push([coords[i], coords[i + 1]]);
				return points;
			}
			var ConnectTheDots = function() {
				function ConnectTheDots() {
					var args = [];
					for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
					var _this = this;
					this.paths = {};
					var isClosed;
					var points;
					switch (args.length) {
						case 1:
							isClosed = true;
							points = getPoints(args[0]);
							break;
						case 2:
							isClosed = args[0];
							points = getPoints(args[1]);
							break;
					}
					var connect = function(a, b, skipZeroDistance) {
						if (skipZeroDistance === void 0) skipZeroDistance = false;
						if (skipZeroDistance && MakerJs.measure.pointDistance(points[a], points[b]) == 0) return;
						_this.paths["ShapeLine" + i] = new MakerJs.paths.Line(points[a], points[b]);
					};
					for (var i = 1; i < points.length; i++) connect(i - 1, i);
					if (isClosed && points.length > 2) connect(points.length - 1, 0, true);
				}
				return ConnectTheDots;
			}();
			models.ConnectTheDots = ConnectTheDots;
			ConnectTheDots.metaParameters = [{
				title: "closed",
				type: "bool",
				value: true
			}, {
				title: "points",
				type: "select",
				value: [
					[
						[0, 0],
						[40, 40],
						[60, 20],
						[100, 100],
						[60, 60],
						[40, 80]
					],
					[
						[0, 0],
						[100, 0],
						[50, 87]
					],
					[
						-10,
						0,
						10,
						0,
						0,
						20
					],
					"-10 0 10 0 0 20"
				]
			}];
		})(MakerJs.models || (MakerJs.models = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(models) {
			var Polygon = function() {
				function Polygon(numberOfSides, radius, firstCornerAngleInDegrees, circumscribed) {
					this.paths = {};
					this.paths = new models.ConnectTheDots(true, Polygon.getPoints(numberOfSides, radius, firstCornerAngleInDegrees, circumscribed)).paths;
				}
				Polygon.circumscribedRadius = function(radius, angleInRadians) {
					return radius / Math.cos(angleInRadians / 2);
				};
				Polygon.getPoints = function(numberOfSides, radius, firstCornerAngleInDegrees, circumscribed) {
					if (firstCornerAngleInDegrees === void 0) firstCornerAngleInDegrees = 0;
					if (circumscribed === void 0) circumscribed = false;
					var points = [];
					var a1 = MakerJs.angle.toRadians(firstCornerAngleInDegrees);
					var a = 2 * Math.PI / numberOfSides;
					if (circumscribed) radius = Polygon.circumscribedRadius(radius, a);
					for (var i = 0; i < numberOfSides; i++) points.push(MakerJs.point.fromPolar(a * i + a1, radius));
					return points;
				};
				return Polygon;
			}();
			models.Polygon = Polygon;
			Polygon.metaParameters = [
				{
					title: "number of sides",
					type: "range",
					min: 3,
					max: 24,
					value: 6
				},
				{
					title: "radius",
					type: "range",
					min: 1,
					max: 100,
					value: 50
				},
				{
					title: "offset angle",
					type: "range",
					min: 0,
					max: 180,
					value: 0
				},
				{
					title: "radius on flats (vs radius on vertexes)",
					type: "bool",
					value: false
				}
			];
		})(MakerJs.models || (MakerJs.models = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(models) {
			var Holes = function() {
				/**
				* Create an array of circles of the same radius from an array of center points.
				*
				* Example:
				* ```
				* //Create some holes from an array of points
				* var makerjs = require('makerjs');
				* var model = new makerjs.models.Holes(10, [[0, 0],[50, 0],[25, 40]]);
				* var svg = makerjs.exporter.toSVG(model);
				* document.write(svg);
				* ```
				*
				* @param holeRadius Hole radius.
				* @param points Array of points for origin of each hole.
				* @param ids Optional array of corresponding path ids for the holes.
				*/
				function Holes(holeRadius, points, ids) {
					this.paths = {};
					for (var i = 0; i < points.length; i++) {
						var id = ids ? ids[i] : i.toString();
						this.paths[id] = new MakerJs.paths.Circle(points[i], holeRadius);
					}
				}
				return Holes;
			}();
			models.Holes = Holes;
			Holes.metaParameters = [{
				title: "holeRadius",
				type: "range",
				min: .1,
				max: 10,
				step: .1,
				value: 1
			}, {
				title: "points",
				type: "select",
				value: [[
					[0, 0],
					[10, 10],
					[20, 20],
					[30, 30],
					[40, 40],
					[50, 50],
					[60, 60],
					[70, 70],
					[80, 80]
				], [
					[0, 0],
					[0, 25],
					[0, 50],
					[0, 75],
					[0, 100],
					[25, 50],
					[50, 50],
					[75, 50],
					[100, 100],
					[100, 75],
					[100, 50],
					[100, 25],
					[100, 0]
				]]
			}];
		})(MakerJs.models || (MakerJs.models = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(models) {
			var BoltCircle = function() {
				function BoltCircle(boltRadius, holeRadius, boltCount, firstBoltAngleInDegrees) {
					if (firstBoltAngleInDegrees === void 0) firstBoltAngleInDegrees = 0;
					this.paths = {};
					var points = models.Polygon.getPoints(boltCount, boltRadius, firstBoltAngleInDegrees);
					var ids = points.map(function(p, i) {
						return "bolt " + i;
					});
					this.paths = new models.Holes(holeRadius, points, ids).paths;
				}
				return BoltCircle;
			}();
			models.BoltCircle = BoltCircle;
			BoltCircle.metaParameters = [
				{
					title: "bolt circle radius",
					type: "range",
					min: 1,
					max: 100,
					value: 50
				},
				{
					title: "hole radius",
					type: "range",
					min: 1,
					max: 50,
					value: 5
				},
				{
					title: "bolt count",
					type: "range",
					min: 3,
					max: 24,
					value: 12
				},
				{
					title: "offset angle",
					type: "range",
					min: 0,
					max: 180,
					value: 0
				}
			];
		})(MakerJs.models || (MakerJs.models = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(models) {
			var BoltRectangle = function() {
				function BoltRectangle(width, height, holeRadius) {
					this.paths = {};
					var points = [
						[0, 0],
						[width, 0],
						[width, height],
						[0, height]
					];
					var ids = [
						"BottomLeft_bolt",
						"BottomRight_bolt",
						"TopRight_bolt",
						"TopLeft_bolt"
					];
					this.paths = new models.Holes(holeRadius, points, ids).paths;
				}
				return BoltRectangle;
			}();
			models.BoltRectangle = BoltRectangle;
			BoltRectangle.metaParameters = [
				{
					title: "width",
					type: "range",
					min: 1,
					max: 100,
					value: 100
				},
				{
					title: "height",
					type: "range",
					min: 1,
					max: 100,
					value: 50
				},
				{
					title: "hole radius",
					type: "range",
					min: 1,
					max: 50,
					value: 5
				}
			];
		})(MakerJs.models || (MakerJs.models = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(models) {
			var Dogbone = function() {
				/**
				* Create a dogbone from width, height, corner radius, style, and bottomless flag.
				*
				* Example:
				* ```
				* var d = new makerjs.models.Dogbone(50, 100, 5);
				* ```
				*
				* @param width Width of the rectangle.
				* @param height Height of the rectangle.
				* @param radius Corner radius.
				* @param style Optional corner style: 0 (default) for dogbone, 1 for vertical, -1 for horizontal.
				* @param bottomless Optional flag to omit the bottom line and bottom corners (default false).
				*/
				function Dogbone(width, height, radius, style, bottomless) {
					if (style === void 0) style = 0;
					if (bottomless === void 0) bottomless = false;
					this.paths = {};
					var maxSide = Math.min(height, width) / 2;
					var maxRadius;
					switch (style) {
						case -1:
						case 1:
							maxRadius = maxSide / 2;
							break;
						default:
							maxRadius = maxSide * Math.SQRT2 / 2;
							break;
					}
					radius = Math.min(radius, maxRadius);
					var ax;
					var ay;
					var lx;
					var ly;
					var apexes;
					switch (style) {
						case -1:
							ax = 0;
							ay = radius;
							lx = 0;
							ly = radius * 2;
							apexes = [
								180,
								0,
								0,
								180
							];
							break;
						case 1:
							ax = radius;
							ay = 0;
							lx = radius * 2;
							ly = 0;
							apexes = [
								270,
								270,
								90,
								90
							];
							break;
						default:
							ax = ay = radius / Math.SQRT2;
							lx = ly = ax * 2;
							apexes = [
								225,
								315,
								45,
								135
							];
							break;
					}
					if (bottomless) {
						this.paths["Left"] = new MakerJs.paths.Line([0, 0], [0, height - ly]);
						this.paths["Right"] = new MakerJs.paths.Line([width, 0], [width, height - ly]);
					} else {
						this.paths["Left"] = new MakerJs.paths.Line([0, ly], [0, height - ly]);
						this.paths["Right"] = new MakerJs.paths.Line([width, ly], [width, height - ly]);
						this.paths["Bottom"] = new MakerJs.paths.Line([lx, 0], [width - lx, 0]);
						this.paths["BottomLeft"] = new MakerJs.paths.Arc([ax, ay], radius, apexes[0] - 90, apexes[0] + 90);
						this.paths["BottomRight"] = new MakerJs.paths.Arc([width - ax, ay], radius, apexes[1] - 90, apexes[1] + 90);
					}
					this.paths["TopRight"] = new MakerJs.paths.Arc([width - ax, height - ay], radius, apexes[2] - 90, apexes[2] + 90);
					this.paths["TopLeft"] = new MakerJs.paths.Arc([ax, height - ay], radius, apexes[3] - 90, apexes[3] + 90);
					this.paths["Top"] = new MakerJs.paths.Line([lx, height], [width - lx, height]);
				}
				return Dogbone;
			}();
			models.Dogbone = Dogbone;
			Dogbone.metaParameters = [
				{
					title: "width",
					type: "range",
					min: 1,
					max: 100,
					value: 50
				},
				{
					title: "height",
					type: "range",
					min: 1,
					max: 100,
					value: 100
				},
				{
					title: "radius",
					type: "range",
					min: 0,
					max: 50,
					value: 5
				},
				{
					title: "style",
					type: "select",
					value: [
						0,
						1,
						-1
					]
				},
				{
					title: "bottomless",
					type: "bool",
					value: false
				}
			];
		})(MakerJs.models || (MakerJs.models = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(models) {
			var Dome = function() {
				function Dome(width, height, radius, bottomless) {
					this.paths = {};
					var w2 = width / 2;
					if (radius < 0) radius = 0;
					if (radius === void 0) radius = w2;
					radius = Math.min(radius, w2);
					radius = Math.min(radius, height);
					var wt = Math.max(w2 - radius, 0);
					var hr = Math.max(height - radius, 0);
					if (!bottomless) this.paths["Bottom"] = new MakerJs.paths.Line([-w2, 0], [w2, 0]);
					if (hr) {
						this.paths["Left"] = new MakerJs.paths.Line([-w2, 0], [-w2, hr]);
						this.paths["Right"] = new MakerJs.paths.Line([w2, 0], [w2, hr]);
					}
					if (radius > 0) {
						this.paths["TopLeft"] = new MakerJs.paths.Arc([-wt, hr], radius, 90, 180);
						this.paths["TopRight"] = new MakerJs.paths.Arc([wt, hr], radius, 0, 90);
					}
					if (wt) this.paths["Top"] = new MakerJs.paths.Line([-wt, height], [wt, height]);
				}
				return Dome;
			}();
			models.Dome = Dome;
			Dome.metaParameters = [
				{
					title: "width",
					type: "range",
					min: 1,
					max: 100,
					value: 50
				},
				{
					title: "height",
					type: "range",
					min: 1,
					max: 100,
					value: 100
				},
				{
					title: "radius",
					type: "range",
					min: 0,
					max: 50,
					value: 25
				},
				{
					title: "bottomless",
					type: "bool",
					value: false
				}
			];
		})(MakerJs.models || (MakerJs.models = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(models) {
			var RoundRectangle = function() {
				function RoundRectangle() {
					var args = [];
					for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
					this.paths = {};
					var width;
					var height;
					var radius = 0;
					switch (args.length) {
						case 3:
							width = args[0];
							height = args[1];
							radius = args[2];
							break;
						case 2: radius = args[1];
						case 1:
							var m = MakerJs.measure.modelExtents(args[0]);
							this.origin = MakerJs.point.subtract(m.low, [radius, radius]);
							width = m.high[0] - m.low[0] + 2 * radius;
							height = m.high[1] - m.low[1] + 2 * radius;
							break;
					}
					var maxRadius = Math.min(height, width) / 2;
					radius = Math.min(radius, maxRadius);
					var wr = width - radius;
					var hr = height - radius;
					if (radius > 0) {
						this.paths["BottomLeft"] = new MakerJs.paths.Arc([radius, radius], radius, 180, 270);
						this.paths["BottomRight"] = new MakerJs.paths.Arc([wr, radius], radius, 270, 0);
						this.paths["TopRight"] = new MakerJs.paths.Arc([wr, hr], radius, 0, 90);
						this.paths["TopLeft"] = new MakerJs.paths.Arc([radius, hr], radius, 90, 180);
					}
					if (wr - radius > 0) {
						this.paths["Bottom"] = new MakerJs.paths.Line([radius, 0], [wr, 0]);
						this.paths["Top"] = new MakerJs.paths.Line([wr, height], [radius, height]);
					}
					if (hr - radius > 0) {
						this.paths["Right"] = new MakerJs.paths.Line([width, radius], [width, hr]);
						this.paths["Left"] = new MakerJs.paths.Line([0, hr], [0, radius]);
					}
				}
				return RoundRectangle;
			}();
			models.RoundRectangle = RoundRectangle;
			RoundRectangle.metaParameters = [
				{
					title: "width",
					type: "range",
					min: 1,
					max: 100,
					value: 50
				},
				{
					title: "height",
					type: "range",
					min: 1,
					max: 100,
					value: 100
				},
				{
					title: "radius",
					type: "range",
					min: 0,
					max: 50,
					value: 11
				}
			];
		})(MakerJs.models || (MakerJs.models = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(models) {
			var Oval = function() {
				function Oval(width, height) {
					this.paths = {};
					this.paths = new models.RoundRectangle(width, height, Math.min(height / 2, width / 2)).paths;
				}
				return Oval;
			}();
			models.Oval = Oval;
			Oval.metaParameters = [{
				title: "width",
				type: "range",
				min: 1,
				max: 100,
				value: 50
			}, {
				title: "height",
				type: "range",
				min: 1,
				max: 100,
				value: 100
			}];
		})(MakerJs.models || (MakerJs.models = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(models) {
			var OvalArc = function() {
				function OvalArc(startAngle, endAngle, sweepRadius, slotRadius, selfIntersect, isolateCaps) {
					if (selfIntersect === void 0) selfIntersect = false;
					if (isolateCaps === void 0) isolateCaps = false;
					var _this = this;
					this.paths = {};
					var capRoot;
					if (isolateCaps) {
						capRoot = { models: {} };
						this.models = { "Caps": capRoot };
					}
					if (slotRadius <= 0 || sweepRadius <= 0) return;
					startAngle = MakerJs.angle.noRevolutions(startAngle);
					endAngle = MakerJs.angle.noRevolutions(endAngle);
					if (MakerJs.round(startAngle - endAngle) == 0) return;
					if (endAngle < startAngle) endAngle += 360;
					var addCap = function(id, tiltAngle, offsetStartAngle, offsetEndAngle) {
						var capModel;
						if (isolateCaps) {
							capModel = { paths: {} };
							capRoot.models[id] = capModel;
						} else capModel = _this;
						return capModel.paths[id] = new MakerJs.paths.Arc(MakerJs.point.fromPolar(MakerJs.angle.toRadians(tiltAngle), sweepRadius), slotRadius, tiltAngle + offsetStartAngle, tiltAngle + offsetEndAngle);
					};
					var addSweep = function(id, offsetRadius) {
						return _this.paths[id] = new MakerJs.paths.Arc([0, 0], sweepRadius + offsetRadius, startAngle, endAngle);
					};
					addSweep("Outer", slotRadius);
					var hasInner = sweepRadius - slotRadius > 0;
					if (hasInner) addSweep("Inner", -slotRadius);
					var caps = [];
					caps.push(addCap("StartCap", startAngle, 180, 0));
					caps.push(addCap("EndCap", endAngle, 0, 180));
					if (MakerJs.measure.pointDistance(caps[0].origin, caps[1].origin) / 2 < slotRadius) {
						var int = MakerJs.path.intersection(caps[0], caps[1]);
						if (int) {
							if (!hasInner || !selfIntersect) {
								caps[0].startAngle = int.path1Angles[0];
								caps[1].endAngle = int.path2Angles[0];
							}
							if (!selfIntersect && hasInner && int.intersectionPoints.length == 2) {
								addCap("StartCap2", startAngle, 180, 0).endAngle = int.path1Angles[1];
								addCap("EndCap2", endAngle, 0, 180).startAngle = int.path2Angles[1] + 360;
							}
						}
					}
				}
				return OvalArc;
			}();
			models.OvalArc = OvalArc;
			OvalArc.metaParameters = [
				{
					title: "start angle",
					type: "range",
					min: -360,
					max: 360,
					step: 1,
					value: 180
				},
				{
					title: "end angle",
					type: "range",
					min: -360,
					max: 360,
					step: 1,
					value: 0
				},
				{
					title: "sweep",
					type: "range",
					min: 0,
					max: 100,
					step: 1,
					value: 50
				},
				{
					title: "radius",
					type: "range",
					min: 0,
					max: 100,
					step: 1,
					value: 15
				},
				{
					title: "self intersect",
					type: "bool",
					value: false
				}
			];
		})(MakerJs.models || (MakerJs.models = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(models) {
			var Rectangle = function() {
				function Rectangle() {
					var args = [];
					for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
					this.paths = {};
					var width;
					var height;
					if (args.length === 2 && !MakerJs.isObject(args[0])) {
						width = args[0];
						height = args[1];
					} else {
						var margin = 0;
						var m;
						if (MakerJs.isModel(args[0])) {
							m = MakerJs.measure.modelExtents(args[0]);
							if (args.length === 2) margin = args[1];
						} else m = args[0];
						this.origin = MakerJs.point.subtract(m.low, [margin, margin]);
						width = m.high[0] - m.low[0] + 2 * margin;
						height = m.high[1] - m.low[1] + 2 * margin;
					}
					this.paths = new models.ConnectTheDots(true, [
						[0, 0],
						[width, 0],
						[width, height],
						[0, height]
					]).paths;
				}
				return Rectangle;
			}();
			models.Rectangle = Rectangle;
			Rectangle.metaParameters = [{
				title: "width",
				type: "range",
				min: 1,
				max: 100,
				value: 50
			}, {
				title: "height",
				type: "range",
				min: 1,
				max: 100,
				value: 100
			}];
		})(MakerJs.models || (MakerJs.models = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(models) {
			var Ring = function() {
				function Ring(outerRadius, innerRadius) {
					this.paths = {};
					var radii = {
						"Ring_outer": outerRadius,
						"Ring_inner": innerRadius
					};
					for (var id in radii) {
						var r = radii[id];
						if (r === void 0 || r <= 0) continue;
						this.paths[id] = new MakerJs.paths.Circle(MakerJs.point.zero(), r);
					}
				}
				return Ring;
			}();
			models.Ring = Ring;
			Ring.metaParameters = [{
				title: "outer radius",
				type: "range",
				min: 0,
				max: 100,
				step: 1,
				value: 50
			}, {
				title: "inner radius",
				type: "range",
				min: 0,
				max: 100,
				step: 1,
				value: 20
			}];
		})(MakerJs.models || (MakerJs.models = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(models) {
			var Belt = function() {
				function Belt(leftRadius, distance, rightRadius) {
					this.paths = {};
					var left = new MakerJs.paths.Arc([0, 0], leftRadius, 0, 360);
					var right = new MakerJs.paths.Arc([distance, 0], rightRadius, 0, 360);
					var angles = MakerJs.solvers.circleTangentAngles(left, right);
					if (!angles) this.paths["Belt"] = new MakerJs.paths.Circle(Math.max(leftRadius, rightRadius));
					else {
						angles = angles.sort(function(a, b) {
							return a - b;
						});
						left.startAngle = angles[0];
						left.endAngle = angles[1];
						right.startAngle = angles[1];
						right.endAngle = angles[0];
						this.paths["Left"] = left;
						this.paths["Right"] = right;
						this.paths["Top"] = new MakerJs.paths.Line(MakerJs.point.fromAngleOnCircle(angles[0], left), MakerJs.point.fromAngleOnCircle(angles[0], right));
						this.paths["Bottom"] = new MakerJs.paths.Line(MakerJs.point.fromAngleOnCircle(angles[1], left), MakerJs.point.fromAngleOnCircle(angles[1], right));
					}
				}
				return Belt;
			}();
			models.Belt = Belt;
			Belt.metaParameters = [
				{
					title: "left radius",
					type: "range",
					min: 0,
					max: 100,
					value: 30
				},
				{
					title: "distance between centers",
					type: "range",
					min: 0,
					max: 100,
					value: 50
				},
				{
					title: "right radius",
					type: "range",
					min: 0,
					max: 100,
					value: 15
				}
			];
		})(MakerJs.models || (MakerJs.models = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(models) {
			var SCurve = function() {
				function SCurve(width, height) {
					this.paths = {};
					function findRadius(x, y) {
						return x + (y * y - x * x) / (2 * x);
					}
					var h2 = height / 2;
					var w2 = width / 2;
					var radius;
					var startAngle;
					var endAngle;
					var arcOrigin;
					if (width > height) {
						radius = findRadius(h2, w2);
						startAngle = 270;
						endAngle = 360 - MakerJs.angle.toDegrees(Math.acos(w2 / radius));
						arcOrigin = [0, radius];
					} else {
						radius = findRadius(w2, h2);
						startAngle = 180 - MakerJs.angle.toDegrees(Math.asin(h2 / radius));
						endAngle = 180;
						arcOrigin = [radius, 0];
					}
					var curve = new MakerJs.paths.Arc(arcOrigin, radius, startAngle, endAngle);
					this.paths["curve_start"] = curve;
					this.paths["curve_end"] = MakerJs.path.moveRelative(MakerJs.path.mirror(curve, true, true), [width, height]);
				}
				return SCurve;
			}();
			models.SCurve = SCurve;
			SCurve.metaParameters = [{
				title: "width",
				type: "range",
				min: 1,
				max: 100,
				value: 50
			}, {
				title: "height",
				type: "range",
				min: 1,
				max: 100,
				value: 100
			}];
		})(MakerJs.models || (MakerJs.models = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(models) {
			var Slot = function() {
				function Slot(origin, endPoint, radius, isolateCaps) {
					if (isolateCaps === void 0) isolateCaps = false;
					var _this = this;
					this.paths = {};
					var capRoot;
					if (isolateCaps) {
						capRoot = { models: {} };
						this.models = { "Caps": capRoot };
					}
					var addCap = function(id, capPath) {
						var capModel;
						if (isolateCaps) {
							capModel = { paths: {} };
							capRoot.models[id] = capModel;
						} else capModel = _this;
						capModel.paths[id] = capPath;
					};
					var a = MakerJs.angle.ofPointInDegrees(origin, endPoint);
					var len = MakerJs.measure.pointDistance(origin, endPoint);
					this.paths["Top"] = new MakerJs.paths.Line([0, radius], [len, radius]);
					this.paths["Bottom"] = new MakerJs.paths.Line([0, -radius], [len, -radius]);
					addCap("StartCap", new MakerJs.paths.Arc([0, 0], radius, 90, 270));
					addCap("EndCap", new MakerJs.paths.Arc([len, 0], radius, 270, 90));
					MakerJs.model.rotate(this, a, [0, 0]);
					this.origin = origin;
				}
				return Slot;
			}();
			models.Slot = Slot;
			Slot.metaParameters = [
				{
					title: "origin",
					type: "select",
					value: [
						[0, 0],
						[10, 0],
						[10, 10]
					]
				},
				{
					title: "end",
					type: "select",
					value: [
						[80, 0],
						[0, 30],
						[10, 30]
					]
				},
				{
					title: "radius",
					type: "range",
					min: 1,
					max: 50,
					value: 10
				}
			];
		})(MakerJs.models || (MakerJs.models = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(models) {
			var Square = function() {
				function Square(side) {
					this.paths = {};
					this.paths = new models.Rectangle(side, side).paths;
				}
				return Square;
			}();
			models.Square = Square;
			Square.metaParameters = [{
				title: "side",
				type: "range",
				min: 1,
				max: 100,
				value: 100
			}];
		})(MakerJs.models || (MakerJs.models = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(models) {
			var Star = function() {
				function Star(numberOfPoints, outerRadius, innerRadius, skipPoints) {
					if (skipPoints === void 0) skipPoints = 2;
					this.paths = {};
					if (!innerRadius) innerRadius = outerRadius * Star.InnerRadiusRatio(numberOfPoints, skipPoints);
					var outerPoints = models.Polygon.getPoints(numberOfPoints, outerRadius);
					var innerPoints = models.Polygon.getPoints(numberOfPoints, innerRadius, 180 / numberOfPoints);
					var allPoints = [];
					for (var i = 0; i < numberOfPoints; i++) {
						allPoints.push(outerPoints[i]);
						allPoints.push(innerPoints[i]);
					}
					var model = new models.ConnectTheDots(true, allPoints);
					this.paths = model.paths;
					delete model.paths;
				}
				Star.InnerRadiusRatio = function(numberOfPoints, skipPoints) {
					if (numberOfPoints > 0 && skipPoints > 1 && skipPoints < numberOfPoints / 2) return Math.cos(Math.PI * skipPoints / numberOfPoints) / Math.cos(Math.PI * (skipPoints - 1) / numberOfPoints);
					return 0;
				};
				return Star;
			}();
			models.Star = Star;
			Star.metaParameters = [
				{
					title: "number of sides",
					type: "range",
					min: 3,
					max: 24,
					value: 8
				},
				{
					title: "outer radius",
					type: "range",
					min: 1,
					max: 100,
					value: 50
				},
				{
					title: "inner radius",
					type: "range",
					min: 0,
					max: 100,
					value: 15
				},
				{
					title: "skip points (when inner radius is zero)",
					type: "range",
					min: 0,
					max: 12,
					value: 2
				}
			];
		})(MakerJs.models || (MakerJs.models = {}));
	})(MakerJs || (MakerJs = {}));
	var MakerJs;
	(function(MakerJs) {
		(function(models) {
			var Text = function() {
				/**
				* Renders text in a given font to a model.
				* @param font OpenType.Font object or fontkit font object.
				* @param text String of text to render.
				* @param fontSize Font size.
				* @param combine Flag (default false) to perform a combineUnion upon each character with characters to the left and right.
				* @param centerCharacterOrigin Flag (default false) to move the x origin of each character to the center. Useful for rotating text characters.
				* @param bezierAccuracy Optional accuracy of Bezier curves.
				* @param opentypeOptions Optional opentype.RenderOptions object or fontkit layout options.
				* @returns Model of the text.
				*/
				function Text(font, text, fontSize, combine, centerCharacterOrigin, bezierAccuracy, opentypeOptions) {
					if (combine === void 0) combine = false;
					if (centerCharacterOrigin === void 0) centerCharacterOrigin = false;
					var _this = this;
					this.models = {};
					var charIndex = 0;
					var prevDeleted;
					var prevChar;
					var cb = function(glyph, x, y, _fontSize, options) {
						var charModel = Text.glyphToModel(glyph, _fontSize, bezierAccuracy, font);
						charModel.origin = [x, 0];
						if (centerCharacterOrigin && (charModel.paths || charModel.models)) {
							var m = MakerJs.measure.modelExtents(charModel);
							if (m) {
								var w = m.high[0] - m.low[0];
								MakerJs.model.originate(charModel, [m.low[0] + w / 2, 0]);
							}
						}
						if (combine && charIndex > 0) {
							var combineOptions = {};
							var prev;
							if (prevDeleted) prev = { models: {
								deleted: prevDeleted,
								char: prevChar
							} };
							else prev = prevChar;
							MakerJs.model.combine(prev, charModel, false, true, false, true, combineOptions);
							prevDeleted = combineOptions.out_deleted[1];
						}
						_this.models[charIndex] = charModel;
						charIndex++;
						prevChar = charModel;
					};
					if (font.layout && typeof font.layout === "function") {
						var fontkitFont = font;
						var layoutOpts = opentypeOptions;
						var run = fontkitFont.layout(text, layoutOpts === null || layoutOpts === void 0 ? void 0 : layoutOpts.features, layoutOpts === null || layoutOpts === void 0 ? void 0 : layoutOpts.script, layoutOpts === null || layoutOpts === void 0 ? void 0 : layoutOpts.language, layoutOpts === null || layoutOpts === void 0 ? void 0 : layoutOpts.direction);
						var scale = fontSize / fontkitFont.unitsPerEm;
						var currentX = 0;
						for (var i = 0; i < run.glyphs.length; i++) {
							var glyph = run.glyphs[i];
							var position = run.positions[i];
							cb(glyph, currentX + (position.xOffset || 0) * scale, (position.yOffset || 0) * scale, fontSize, opentypeOptions);
							currentX += (position.xAdvance || 0) * scale;
						}
					} else font.forEachGlyph(text, 0, 0, fontSize, opentypeOptions, cb);
				}
				/**
				* Convert an opentype glyph or fontkit glyph to a model.
				* @param glyph Opentype.Glyph object or fontkit glyph.
				* @param fontSize Font size.
				* @param bezierAccuracy Optional accuracy of Bezier curves.
				* @param font Optional font object (needed for fontkit to get scale).
				* @returns Model of the glyph.
				*/
				Text.glyphToModel = function(glyph, fontSize, bezierAccuracy, font) {
					var charModel = {};
					var firstPoint;
					var currPoint;
					var pathCount = 0;
					function addPath(p, layer) {
						if (!charModel.paths) charModel.paths = {};
						if (layer) {
							if (!charModel.layer) charModel.layer = layer;
						}
						charModel.paths["p_" + ++pathCount] = p;
					}
					function addModel(m, layer) {
						if (!charModel.models) charModel.models = {};
						if (layer) {
							if (!charModel.layer) charModel.layer = layer;
						}
						charModel.models["p_" + ++pathCount] = m;
					}
					var isFontkitGlyph = glyph.path && !glyph.getPath;
					var p;
					if (isFontkitGlyph && font) {
						var scale_1 = fontSize / font.unitsPerEm;
						p = glyph.path;
						if (glyph.layers && glyph.layers.length > 0) {
							glyph.layers.forEach(function(layer, layerIndex) {
								var layerPath = font.getGlyph(layer.glyph).path;
								if (layerPath && layerPath.commands) {
									var layerColor = void 0;
									if (font["COLR"] && font["CPAL"] && layer.color !== void 0) {
										var cpal = font["CPAL"];
										var colorPalettes = cpal.colorPalettes || cpal.colorRecords;
										if (colorPalettes && colorPalettes.length > 0) {
											var palette = colorPalettes[0];
											if (palette && palette.length > layer.color) {
												var color = palette[layer.color];
												if (color) {
													var red = color.red !== void 0 ? color.red : color.r || 0;
													var green = color.green !== void 0 ? color.green : color.g || 0;
													var blue = color.blue !== void 0 ? color.blue : color.b || 0;
													layerColor = "color_".concat(red.toString(16).padStart(2, "0")).concat(green.toString(16).padStart(2, "0")).concat(blue.toString(16).padStart(2, "0"));
												}
											}
										}
									}
									var layerFirstPoint = void 0;
									var layerCurrPoint = void 0;
									for (var _i = 0, _a = layerPath.commands; _i < _a.length; _i++) {
										var cmd = _a[_i];
										var points = Text.convertFontkitCommand(cmd, scale_1);
										switch (cmd.command) {
											case "moveTo":
												layerFirstPoint = points[0];
												layerCurrPoint = points[0];
												break;
											case "closePath": points[0] = layerFirstPoint;
											case "lineTo":
												if (layerCurrPoint && !MakerJs.measure.isPointEqual(layerCurrPoint, points[0])) addPath(new MakerJs.paths.Line(layerCurrPoint, points[0]), layerColor);
												layerCurrPoint = points[0];
												break;
											case "bezierCurveTo":
												if (layerCurrPoint) addModel(new models.BezierCurve(layerCurrPoint, points[0], points[1], points[2], bezierAccuracy), layerColor);
												layerCurrPoint = points[2];
												break;
											case "quadraticCurveTo":
												if (layerCurrPoint) addModel(new models.BezierCurve(layerCurrPoint, points[0], points[1], bezierAccuracy), layerColor);
												layerCurrPoint = points[1];
												break;
										}
									}
								}
							});
							return charModel;
						}
						if (!p || !p.commands) return charModel;
						for (var _i = 0, _a = p.commands; _i < _a.length; _i++) {
							var cmd = _a[_i];
							var points = Text.convertFontkitCommand(cmd, scale_1);
							switch (cmd.command) {
								case "moveTo":
									firstPoint = points[0];
									currPoint = points[0];
									break;
								case "closePath": points[0] = firstPoint;
								case "lineTo":
									if (!MakerJs.measure.isPointEqual(currPoint, points[0])) addPath(new MakerJs.paths.Line(currPoint, points[0]));
									currPoint = points[0];
									break;
								case "bezierCurveTo":
									addModel(new models.BezierCurve(currPoint, points[0], points[1], points[2], bezierAccuracy));
									currPoint = points[2];
									break;
								case "quadraticCurveTo":
									addModel(new models.BezierCurve(currPoint, points[0], points[1], bezierAccuracy));
									currPoint = points[1];
									break;
							}
						}
					} else {
						p = glyph.getPath(0, 0, fontSize);
						p.commands.map(function(command, i) {
							var points = [
								[command.x, command.y],
								[command.x1, command.y1],
								[command.x2, command.y2]
							].map(function(p) {
								if (p[0] !== void 0) return MakerJs.point.mirror(p, false, true);
							});
							switch (command.type) {
								case "M":
									firstPoint = points[0];
									break;
								case "Z": points[0] = firstPoint;
								case "L":
									if (!MakerJs.measure.isPointEqual(currPoint, points[0])) addPath(new MakerJs.paths.Line(currPoint, points[0]));
									break;
								case "C":
									addModel(new models.BezierCurve(currPoint, points[1], points[2], points[0], bezierAccuracy));
									break;
								case "Q":
									addModel(new models.BezierCurve(currPoint, points[1], points[0], bezierAccuracy));
									break;
							}
							currPoint = points[0];
						});
					}
					return charModel;
				};
				/**
				* Convert fontkit path command to points array
				* @param cmd Fontkit path command
				* @param scale Scale factor
				* @returns Array of points
				*/
				Text.convertFontkitCommand = function(cmd, scale) {
					var points = [];
					switch (cmd.command) {
						case "moveTo":
						case "lineTo":
							points.push([cmd.args[0] * scale, cmd.args[1] * scale]);
							break;
						case "quadraticCurveTo":
							points.push([cmd.args[0] * scale, cmd.args[1] * scale]);
							points.push([cmd.args[2] * scale, cmd.args[3] * scale]);
							break;
						case "bezierCurveTo":
							points.push([cmd.args[0] * scale, cmd.args[1] * scale]);
							points.push([cmd.args[2] * scale, cmd.args[3] * scale]);
							points.push([cmd.args[4] * scale, cmd.args[5] * scale]);
							break;
					}
					return points;
				};
				return Text;
			}();
			models.Text = Text;
			Text.metaParameters = [
				{
					title: "font",
					type: "font",
					value: "*"
				},
				{
					title: "text",
					type: "text",
					value: "Hello"
				},
				{
					title: "font size",
					type: "range",
					min: 10,
					max: 200,
					value: 72
				},
				{
					title: "combine",
					type: "bool",
					value: false
				},
				{
					title: "center character origin",
					type: "bool",
					value: false
				}
			];
		})(MakerJs.models || (MakerJs.models = {}));
	})(MakerJs || (MakerJs = {}));
	MakerJs.version = "0.19.2";
	var Bezier = require_bezier_js();
}));
//#endregion
//#region node_modules/tiny-inflate/index.js
var require_tiny_inflate = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var TINF_OK = 0;
	var TINF_DATA_ERROR = -3;
	function Tree() {
		this.table = /* @__PURE__ */ new Uint16Array(16);
		this.trans = /* @__PURE__ */ new Uint16Array(288);
	}
	function Data(source, dest) {
		this.source = source;
		this.sourceIndex = 0;
		this.tag = 0;
		this.bitcount = 0;
		this.dest = dest;
		this.destLen = 0;
		this.ltree = new Tree();
		this.dtree = new Tree();
	}
	var sltree = new Tree();
	var sdtree = new Tree();
	var length_bits = /* @__PURE__ */ new Uint8Array(30);
	var length_base = /* @__PURE__ */ new Uint16Array(30);
	var dist_bits = /* @__PURE__ */ new Uint8Array(30);
	var dist_base = /* @__PURE__ */ new Uint16Array(30);
	var clcidx = new Uint8Array([
		16,
		17,
		18,
		0,
		8,
		7,
		9,
		6,
		10,
		5,
		11,
		4,
		12,
		3,
		13,
		2,
		14,
		1,
		15
	]);
	var code_tree = new Tree();
	var lengths = /* @__PURE__ */ new Uint8Array(320);
	function tinf_build_bits_base(bits, base, delta, first) {
		var i, sum;
		for (i = 0; i < delta; ++i) bits[i] = 0;
		for (i = 0; i < 30 - delta; ++i) bits[i + delta] = i / delta | 0;
		for (sum = first, i = 0; i < 30; ++i) {
			base[i] = sum;
			sum += 1 << bits[i];
		}
	}
	function tinf_build_fixed_trees(lt, dt) {
		var i;
		for (i = 0; i < 7; ++i) lt.table[i] = 0;
		lt.table[7] = 24;
		lt.table[8] = 152;
		lt.table[9] = 112;
		for (i = 0; i < 24; ++i) lt.trans[i] = 256 + i;
		for (i = 0; i < 144; ++i) lt.trans[24 + i] = i;
		for (i = 0; i < 8; ++i) lt.trans[168 + i] = 280 + i;
		for (i = 0; i < 112; ++i) lt.trans[176 + i] = 144 + i;
		for (i = 0; i < 5; ++i) dt.table[i] = 0;
		dt.table[5] = 32;
		for (i = 0; i < 32; ++i) dt.trans[i] = i;
	}
	var offs = /* @__PURE__ */ new Uint16Array(16);
	function tinf_build_tree(t, lengths, off, num) {
		var i, sum;
		for (i = 0; i < 16; ++i) t.table[i] = 0;
		for (i = 0; i < num; ++i) t.table[lengths[off + i]]++;
		t.table[0] = 0;
		for (sum = 0, i = 0; i < 16; ++i) {
			offs[i] = sum;
			sum += t.table[i];
		}
		for (i = 0; i < num; ++i) if (lengths[off + i]) t.trans[offs[lengths[off + i]]++] = i;
	}
	function tinf_getbit(d) {
		if (!d.bitcount--) {
			d.tag = d.source[d.sourceIndex++];
			d.bitcount = 7;
		}
		var bit = d.tag & 1;
		d.tag >>>= 1;
		return bit;
	}
	function tinf_read_bits(d, num, base) {
		if (!num) return base;
		while (d.bitcount < 24) {
			d.tag |= d.source[d.sourceIndex++] << d.bitcount;
			d.bitcount += 8;
		}
		var val = d.tag & 65535 >>> 16 - num;
		d.tag >>>= num;
		d.bitcount -= num;
		return val + base;
	}
	function tinf_decode_symbol(d, t) {
		while (d.bitcount < 24) {
			d.tag |= d.source[d.sourceIndex++] << d.bitcount;
			d.bitcount += 8;
		}
		var sum = 0, cur = 0, len = 0;
		var tag = d.tag;
		do {
			cur = 2 * cur + (tag & 1);
			tag >>>= 1;
			++len;
			sum += t.table[len];
			cur -= t.table[len];
		} while (cur >= 0);
		d.tag = tag;
		d.bitcount -= len;
		return t.trans[sum + cur];
	}
	function tinf_decode_trees(d, lt, dt) {
		var hlit, hdist, hclen;
		var i, num, length;
		hlit = tinf_read_bits(d, 5, 257);
		hdist = tinf_read_bits(d, 5, 1);
		hclen = tinf_read_bits(d, 4, 4);
		for (i = 0; i < 19; ++i) lengths[i] = 0;
		for (i = 0; i < hclen; ++i) {
			var clen = tinf_read_bits(d, 3, 0);
			lengths[clcidx[i]] = clen;
		}
		tinf_build_tree(code_tree, lengths, 0, 19);
		for (num = 0; num < hlit + hdist;) {
			var sym = tinf_decode_symbol(d, code_tree);
			switch (sym) {
				case 16:
					var prev = lengths[num - 1];
					for (length = tinf_read_bits(d, 2, 3); length; --length) lengths[num++] = prev;
					break;
				case 17:
					for (length = tinf_read_bits(d, 3, 3); length; --length) lengths[num++] = 0;
					break;
				case 18:
					for (length = tinf_read_bits(d, 7, 11); length; --length) lengths[num++] = 0;
					break;
				default:
					lengths[num++] = sym;
					break;
			}
		}
		tinf_build_tree(lt, lengths, 0, hlit);
		tinf_build_tree(dt, lengths, hlit, hdist);
	}
	function tinf_inflate_block_data(d, lt, dt) {
		while (1) {
			var sym = tinf_decode_symbol(d, lt);
			if (sym === 256) return TINF_OK;
			if (sym < 256) d.dest[d.destLen++] = sym;
			else {
				var length, dist, offs;
				var i;
				sym -= 257;
				length = tinf_read_bits(d, length_bits[sym], length_base[sym]);
				dist = tinf_decode_symbol(d, dt);
				offs = d.destLen - tinf_read_bits(d, dist_bits[dist], dist_base[dist]);
				for (i = offs; i < offs + length; ++i) d.dest[d.destLen++] = d.dest[i];
			}
		}
	}
	function tinf_inflate_uncompressed_block(d) {
		var length, invlength;
		var i;
		while (d.bitcount > 8) {
			d.sourceIndex--;
			d.bitcount -= 8;
		}
		length = d.source[d.sourceIndex + 1];
		length = 256 * length + d.source[d.sourceIndex];
		invlength = d.source[d.sourceIndex + 3];
		invlength = 256 * invlength + d.source[d.sourceIndex + 2];
		if (length !== (~invlength & 65535)) return TINF_DATA_ERROR;
		d.sourceIndex += 4;
		for (i = length; i; --i) d.dest[d.destLen++] = d.source[d.sourceIndex++];
		d.bitcount = 0;
		return TINF_OK;
	}
	function tinf_uncompress(source, dest) {
		var d = new Data(source, dest);
		var bfinal, btype, res;
		do {
			bfinal = tinf_getbit(d);
			btype = tinf_read_bits(d, 2, 0);
			switch (btype) {
				case 0:
					res = tinf_inflate_uncompressed_block(d);
					break;
				case 1:
					res = tinf_inflate_block_data(d, sltree, sdtree);
					break;
				case 2:
					tinf_decode_trees(d, d.ltree, d.dtree);
					res = tinf_inflate_block_data(d, d.ltree, d.dtree);
					break;
				default: res = TINF_DATA_ERROR;
			}
			if (res !== TINF_OK) throw new Error("Data error");
		} while (!bfinal);
		if (d.destLen < d.dest.length) if (typeof d.dest.slice === "function") return d.dest.slice(0, d.destLen);
		else return d.dest.subarray(0, d.destLen);
		return d.dest;
	}
	tinf_build_fixed_trees(sltree, sdtree);
	tinf_build_bits_base(length_bits, length_base, 4, 3);
	tinf_build_bits_base(dist_bits, dist_base, 2, 1);
	length_bits[28] = 0;
	length_base[28] = 258;
	module.exports = tinf_uncompress;
}));
//#endregion
//#region node_modules/opentype.js/src/bbox.js
var import_dist = /* @__PURE__ */ __toESM(require_dist());
var import_tiny_inflate = /* @__PURE__ */ __toESM(require_tiny_inflate());
function derive(v0, v1, v2, v3, t) {
	return Math.pow(1 - t, 3) * v0 + 3 * Math.pow(1 - t, 2) * t * v1 + 3 * (1 - t) * Math.pow(t, 2) * v2 + Math.pow(t, 3) * v3;
}
/**
* A bounding box is an enclosing box that describes the smallest measure within which all the points lie.
* It is used to calculate the bounding box of a glyph or text path.
*
* On initialization, x1/y1/x2/y2 will be NaN. Check if the bounding box is empty using `isEmpty()`.
*
* @exports opentype.BoundingBox
* @class
* @constructor
*/
function BoundingBox() {
	this.x1 = NaN;
	this.y1 = NaN;
	this.x2 = NaN;
	this.y2 = NaN;
}
/**
* Returns true if the bounding box is empty, that is, no points have been added to the box yet.
*/
BoundingBox.prototype.isEmpty = function() {
	return isNaN(this.x1) || isNaN(this.y1) || isNaN(this.x2) || isNaN(this.y2);
};
/**
* Add the point to the bounding box.
* The x1/y1/x2/y2 coordinates of the bounding box will now encompass the given point.
* @param {number} x - The X coordinate of the point.
* @param {number} y - The Y coordinate of the point.
*/
BoundingBox.prototype.addPoint = function(x, y) {
	if (typeof x === "number") {
		if (isNaN(this.x1) || isNaN(this.x2)) {
			this.x1 = x;
			this.x2 = x;
		}
		if (x < this.x1) this.x1 = x;
		if (x > this.x2) this.x2 = x;
	}
	if (typeof y === "number") {
		if (isNaN(this.y1) || isNaN(this.y2)) {
			this.y1 = y;
			this.y2 = y;
		}
		if (y < this.y1) this.y1 = y;
		if (y > this.y2) this.y2 = y;
	}
};
/**
* Add a X coordinate to the bounding box.
* This extends the bounding box to include the X coordinate.
* This function is used internally inside of addBezier.
* @param {number} x - The X coordinate of the point.
*/
BoundingBox.prototype.addX = function(x) {
	this.addPoint(x, null);
};
/**
* Add a Y coordinate to the bounding box.
* This extends the bounding box to include the Y coordinate.
* This function is used internally inside of addBezier.
* @param {number} y - The Y coordinate of the point.
*/
BoundingBox.prototype.addY = function(y) {
	this.addPoint(null, y);
};
/**
* Add a Bézier curve to the bounding box.
* This extends the bounding box to include the entire Bézier.
* @param {number} x0 - The starting X coordinate.
* @param {number} y0 - The starting Y coordinate.
* @param {number} x1 - The X coordinate of the first control point.
* @param {number} y1 - The Y coordinate of the first control point.
* @param {number} x2 - The X coordinate of the second control point.
* @param {number} y2 - The Y coordinate of the second control point.
* @param {number} x - The ending X coordinate.
* @param {number} y - The ending Y coordinate.
*/
BoundingBox.prototype.addBezier = function(x0, y0, x1, y1, x2, y2, x, y) {
	const p0 = [x0, y0];
	const p1 = [x1, y1];
	const p2 = [x2, y2];
	const p3 = [x, y];
	this.addPoint(x0, y0);
	this.addPoint(x, y);
	for (let i = 0; i <= 1; i++) {
		const b = 6 * p0[i] - 12 * p1[i] + 6 * p2[i];
		const a = -3 * p0[i] + 9 * p1[i] - 9 * p2[i] + 3 * p3[i];
		const c = 3 * p1[i] - 3 * p0[i];
		if (a === 0) {
			if (b === 0) continue;
			const t = -c / b;
			if (0 < t && t < 1) {
				if (i === 0) this.addX(derive(p0[i], p1[i], p2[i], p3[i], t));
				if (i === 1) this.addY(derive(p0[i], p1[i], p2[i], p3[i], t));
			}
			continue;
		}
		const b2ac = Math.pow(b, 2) - 4 * c * a;
		if (b2ac < 0) continue;
		const t1 = (-b + Math.sqrt(b2ac)) / (2 * a);
		if (0 < t1 && t1 < 1) {
			if (i === 0) this.addX(derive(p0[i], p1[i], p2[i], p3[i], t1));
			if (i === 1) this.addY(derive(p0[i], p1[i], p2[i], p3[i], t1));
		}
		const t2 = (-b - Math.sqrt(b2ac)) / (2 * a);
		if (0 < t2 && t2 < 1) {
			if (i === 0) this.addX(derive(p0[i], p1[i], p2[i], p3[i], t2));
			if (i === 1) this.addY(derive(p0[i], p1[i], p2[i], p3[i], t2));
		}
	}
};
/**
* Add a quadratic curve to the bounding box.
* This extends the bounding box to include the entire quadratic curve.
* @param {number} x0 - The starting X coordinate.
* @param {number} y0 - The starting Y coordinate.
* @param {number} x1 - The X coordinate of the control point.
* @param {number} y1 - The Y coordinate of the control point.
* @param {number} x - The ending X coordinate.
* @param {number} y - The ending Y coordinate.
*/
BoundingBox.prototype.addQuad = function(x0, y0, x1, y1, x, y) {
	const cp1x = x0 + 2 / 3 * (x1 - x0);
	const cp1y = y0 + 2 / 3 * (y1 - y0);
	const cp2x = cp1x + 1 / 3 * (x - x0);
	const cp2y = cp1y + 1 / 3 * (y - y0);
	this.addBezier(x0, y0, cp1x, cp1y, cp2x, cp2y, x, y);
};
//#endregion
//#region node_modules/opentype.js/src/path.js
/**
* A bézier path containing a set of path commands similar to a SVG path.
* Paths can be drawn on a context using `draw`.
* @exports opentype.Path
* @class
* @constructor
*/
function Path() {
	this.commands = [];
	this.fill = "black";
	this.stroke = null;
	this.strokeWidth = 1;
}
/**
* @param  {number} x
* @param  {number} y
*/
Path.prototype.moveTo = function(x, y) {
	this.commands.push({
		type: "M",
		x,
		y
	});
};
/**
* @param  {number} x
* @param  {number} y
*/
Path.prototype.lineTo = function(x, y) {
	this.commands.push({
		type: "L",
		x,
		y
	});
};
/**
* Draws cubic curve
* @function
* curveTo
* @memberof opentype.Path.prototype
* @param  {number} x1 - x of control 1
* @param  {number} y1 - y of control 1
* @param  {number} x2 - x of control 2
* @param  {number} y2 - y of control 2
* @param  {number} x - x of path point
* @param  {number} y - y of path point
*/
/**
* Draws cubic curve
* @function
* bezierCurveTo
* @memberof opentype.Path.prototype
* @param  {number} x1 - x of control 1
* @param  {number} y1 - y of control 1
* @param  {number} x2 - x of control 2
* @param  {number} y2 - y of control 2
* @param  {number} x - x of path point
* @param  {number} y - y of path point
* @see curveTo
*/
Path.prototype.curveTo = Path.prototype.bezierCurveTo = function(x1, y1, x2, y2, x, y) {
	this.commands.push({
		type: "C",
		x1,
		y1,
		x2,
		y2,
		x,
		y
	});
};
/**
* Draws quadratic curve
* @function
* quadraticCurveTo
* @memberof opentype.Path.prototype
* @param  {number} x1 - x of control
* @param  {number} y1 - y of control
* @param  {number} x - x of path point
* @param  {number} y - y of path point
*/
/**
* Draws quadratic curve
* @function
* quadTo
* @memberof opentype.Path.prototype
* @param  {number} x1 - x of control
* @param  {number} y1 - y of control
* @param  {number} x - x of path point
* @param  {number} y - y of path point
*/
Path.prototype.quadTo = Path.prototype.quadraticCurveTo = function(x1, y1, x, y) {
	this.commands.push({
		type: "Q",
		x1,
		y1,
		x,
		y
	});
};
/**
* Closes the path
* @function closePath
* @memberof opentype.Path.prototype
*/
/**
* Close the path
* @function close
* @memberof opentype.Path.prototype
*/
Path.prototype.close = Path.prototype.closePath = function() {
	this.commands.push({ type: "Z" });
};
/**
* Add the given path or list of commands to the commands of this path.
* @param  {Array} pathOrCommands - another opentype.Path, an opentype.BoundingBox, or an array of commands.
*/
Path.prototype.extend = function(pathOrCommands) {
	if (pathOrCommands.commands) pathOrCommands = pathOrCommands.commands;
	else if (pathOrCommands instanceof BoundingBox) {
		const box = pathOrCommands;
		this.moveTo(box.x1, box.y1);
		this.lineTo(box.x2, box.y1);
		this.lineTo(box.x2, box.y2);
		this.lineTo(box.x1, box.y2);
		this.close();
		return;
	}
	Array.prototype.push.apply(this.commands, pathOrCommands);
};
/**
* Calculate the bounding box of the path.
* @returns {opentype.BoundingBox}
*/
Path.prototype.getBoundingBox = function() {
	const box = new BoundingBox();
	let startX = 0;
	let startY = 0;
	let prevX = 0;
	let prevY = 0;
	for (let i = 0; i < this.commands.length; i++) {
		const cmd = this.commands[i];
		switch (cmd.type) {
			case "M":
				box.addPoint(cmd.x, cmd.y);
				startX = prevX = cmd.x;
				startY = prevY = cmd.y;
				break;
			case "L":
				box.addPoint(cmd.x, cmd.y);
				prevX = cmd.x;
				prevY = cmd.y;
				break;
			case "Q":
				box.addQuad(prevX, prevY, cmd.x1, cmd.y1, cmd.x, cmd.y);
				prevX = cmd.x;
				prevY = cmd.y;
				break;
			case "C":
				box.addBezier(prevX, prevY, cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
				prevX = cmd.x;
				prevY = cmd.y;
				break;
			case "Z":
				prevX = startX;
				prevY = startY;
				break;
			default: throw new Error("Unexpected path command " + cmd.type);
		}
	}
	if (box.isEmpty()) box.addPoint(0, 0);
	return box;
};
/**
* Draw the path to a 2D context.
* @param {CanvasRenderingContext2D} ctx - A 2D drawing context.
*/
Path.prototype.draw = function(ctx) {
	ctx.beginPath();
	for (let i = 0; i < this.commands.length; i += 1) {
		const cmd = this.commands[i];
		if (cmd.type === "M") ctx.moveTo(cmd.x, cmd.y);
		else if (cmd.type === "L") ctx.lineTo(cmd.x, cmd.y);
		else if (cmd.type === "C") ctx.bezierCurveTo(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
		else if (cmd.type === "Q") ctx.quadraticCurveTo(cmd.x1, cmd.y1, cmd.x, cmd.y);
		else if (cmd.type === "Z") ctx.closePath();
	}
	if (this.fill) {
		ctx.fillStyle = this.fill;
		ctx.fill();
	}
	if (this.stroke) {
		ctx.strokeStyle = this.stroke;
		ctx.lineWidth = this.strokeWidth;
		ctx.stroke();
	}
};
/**
* Convert the Path to a string of path data instructions
* See http://www.w3.org/TR/SVG/paths.html#PathData
* @param  {number} [decimalPlaces=2] - The amount of decimal places for floating-point values
* @return {string}
*/
Path.prototype.toPathData = function(decimalPlaces) {
	decimalPlaces = decimalPlaces !== void 0 ? decimalPlaces : 2;
	function floatToString(v) {
		if (Math.round(v) === v) return "" + Math.round(v);
		else return v.toFixed(decimalPlaces);
	}
	function packValues() {
		let s = "";
		for (let i = 0; i < arguments.length; i += 1) {
			const v = arguments[i];
			if (v >= 0 && i > 0) s += " ";
			s += floatToString(v);
		}
		return s;
	}
	let d = "";
	for (let i = 0; i < this.commands.length; i += 1) {
		const cmd = this.commands[i];
		if (cmd.type === "M") d += "M" + packValues(cmd.x, cmd.y);
		else if (cmd.type === "L") d += "L" + packValues(cmd.x, cmd.y);
		else if (cmd.type === "C") d += "C" + packValues(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
		else if (cmd.type === "Q") d += "Q" + packValues(cmd.x1, cmd.y1, cmd.x, cmd.y);
		else if (cmd.type === "Z") d += "Z";
	}
	return d;
};
/**
* Convert the path to an SVG <path> element, as a string.
* @param  {number} [decimalPlaces=2] - The amount of decimal places for floating-point values
* @return {string}
*/
Path.prototype.toSVG = function(decimalPlaces) {
	let svg = "<path d=\"";
	svg += this.toPathData(decimalPlaces);
	svg += "\"";
	if (this.fill && this.fill !== "black") if (this.fill === null) svg += " fill=\"none\"";
	else svg += " fill=\"" + this.fill + "\"";
	if (this.stroke) svg += " stroke=\"" + this.stroke + "\" stroke-width=\"" + this.strokeWidth + "\"";
	svg += "/>";
	return svg;
};
/**
* Convert the path to a DOM element.
* @param  {number} [decimalPlaces=2] - The amount of decimal places for floating-point values
* @return {SVGPathElement}
*/
Path.prototype.toDOMElement = function(decimalPlaces) {
	const temporaryPath = this.toPathData(decimalPlaces);
	const newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
	newPath.setAttribute("d", temporaryPath);
	return newPath;
};
//#endregion
//#region node_modules/opentype.js/src/check.js
function fail(message) {
	throw new Error(message);
}
function argument(predicate, message) {
	if (!predicate) fail(message);
}
var check_default = {
	fail,
	argument,
	assert: argument
};
//#endregion
//#region node_modules/opentype.js/src/types.js
var LIMIT16 = 32768;
var LIMIT32 = 2147483648;
/**
* @exports opentype.decode
* @class
*/
var decode = {};
/**
* @exports opentype.encode
* @class
*/
var encode = {};
/**
* @exports opentype.sizeOf
* @class
*/
var sizeOf = {};
function constant(v) {
	return function() {
		return v;
	};
}
/**
* Convert an 8-bit unsigned integer to a list of 1 byte.
* @param {number}
* @returns {Array}
*/
encode.BYTE = function(v) {
	check_default.argument(v >= 0 && v <= 255, "Byte value should be between 0 and 255.");
	return [v];
};
/**
* @constant
* @type {number}
*/
sizeOf.BYTE = constant(1);
/**
* Convert a 8-bit signed integer to a list of 1 byte.
* @param {string}
* @returns {Array}
*/
encode.CHAR = function(v) {
	return [v.charCodeAt(0)];
};
/**
* @constant
* @type {number}
*/
sizeOf.CHAR = constant(1);
/**
* Convert an ASCII string to a list of bytes.
* @param {string}
* @returns {Array}
*/
encode.CHARARRAY = function(v) {
	const b = [];
	for (let i = 0; i < v.length; i += 1) b[i] = v.charCodeAt(i);
	return b;
};
/**
* @param {Array}
* @returns {number}
*/
sizeOf.CHARARRAY = function(v) {
	return v.length;
};
/**
* Convert a 16-bit unsigned integer to a list of 2 bytes.
* @param {number}
* @returns {Array}
*/
encode.USHORT = function(v) {
	return [v >> 8 & 255, v & 255];
};
/**
* @constant
* @type {number}
*/
sizeOf.USHORT = constant(2);
/**
* Convert a 16-bit signed integer to a list of 2 bytes.
* @param {number}
* @returns {Array}
*/
encode.SHORT = function(v) {
	if (v >= LIMIT16) v = -(2 * LIMIT16 - v);
	return [v >> 8 & 255, v & 255];
};
/**
* @constant
* @type {number}
*/
sizeOf.SHORT = constant(2);
/**
* Convert a 24-bit unsigned integer to a list of 3 bytes.
* @param {number}
* @returns {Array}
*/
encode.UINT24 = function(v) {
	return [
		v >> 16 & 255,
		v >> 8 & 255,
		v & 255
	];
};
/**
* @constant
* @type {number}
*/
sizeOf.UINT24 = constant(3);
/**
* Convert a 32-bit unsigned integer to a list of 4 bytes.
* @param {number}
* @returns {Array}
*/
encode.ULONG = function(v) {
	return [
		v >> 24 & 255,
		v >> 16 & 255,
		v >> 8 & 255,
		v & 255
	];
};
/**
* @constant
* @type {number}
*/
sizeOf.ULONG = constant(4);
/**
* Convert a 32-bit unsigned integer to a list of 4 bytes.
* @param {number}
* @returns {Array}
*/
encode.LONG = function(v) {
	if (v >= LIMIT32) v = -(2 * LIMIT32 - v);
	return [
		v >> 24 & 255,
		v >> 16 & 255,
		v >> 8 & 255,
		v & 255
	];
};
/**
* @constant
* @type {number}
*/
sizeOf.LONG = constant(4);
encode.FIXED = encode.ULONG;
sizeOf.FIXED = sizeOf.ULONG;
encode.FWORD = encode.SHORT;
sizeOf.FWORD = sizeOf.SHORT;
encode.UFWORD = encode.USHORT;
sizeOf.UFWORD = sizeOf.USHORT;
/**
* Convert a 32-bit Apple Mac timestamp integer to a list of 8 bytes, 64-bit timestamp.
* @param {number}
* @returns {Array}
*/
encode.LONGDATETIME = function(v) {
	return [
		0,
		0,
		0,
		0,
		v >> 24 & 255,
		v >> 16 & 255,
		v >> 8 & 255,
		v & 255
	];
};
/**
* @constant
* @type {number}
*/
sizeOf.LONGDATETIME = constant(8);
/**
* Convert a 4-char tag to a list of 4 bytes.
* @param {string}
* @returns {Array}
*/
encode.TAG = function(v) {
	check_default.argument(v.length === 4, "Tag should be exactly 4 ASCII characters.");
	return [
		v.charCodeAt(0),
		v.charCodeAt(1),
		v.charCodeAt(2),
		v.charCodeAt(3)
	];
};
/**
* @constant
* @type {number}
*/
sizeOf.TAG = constant(4);
encode.Card8 = encode.BYTE;
sizeOf.Card8 = sizeOf.BYTE;
encode.Card16 = encode.USHORT;
sizeOf.Card16 = sizeOf.USHORT;
encode.OffSize = encode.BYTE;
sizeOf.OffSize = sizeOf.BYTE;
encode.SID = encode.USHORT;
sizeOf.SID = sizeOf.USHORT;
/**
* Convert a numeric operand or charstring number to a variable-size list of bytes.
* @param {number}
* @returns {Array}
*/
encode.NUMBER = function(v) {
	if (v >= -107 && v <= 107) return [v + 139];
	else if (v >= 108 && v <= 1131) {
		v = v - 108;
		return [(v >> 8) + 247, v & 255];
	} else if (v >= -1131 && v <= -108) {
		v = -v - 108;
		return [(v >> 8) + 251, v & 255];
	} else if (v >= -32768 && v <= 32767) return encode.NUMBER16(v);
	else return encode.NUMBER32(v);
};
/**
* @param {number}
* @returns {number}
*/
sizeOf.NUMBER = function(v) {
	return encode.NUMBER(v).length;
};
/**
* Convert a signed number between -32768 and +32767 to a three-byte value.
* This ensures we always use three bytes, but is not the most compact format.
* @param {number}
* @returns {Array}
*/
encode.NUMBER16 = function(v) {
	return [
		28,
		v >> 8 & 255,
		v & 255
	];
};
/**
* @constant
* @type {number}
*/
sizeOf.NUMBER16 = constant(3);
/**
* Convert a signed number between -(2^31) and +(2^31-1) to a five-byte value.
* This is useful if you want to be sure you always use four bytes,
* at the expense of wasting a few bytes for smaller numbers.
* @param {number}
* @returns {Array}
*/
encode.NUMBER32 = function(v) {
	return [
		29,
		v >> 24 & 255,
		v >> 16 & 255,
		v >> 8 & 255,
		v & 255
	];
};
/**
* @constant
* @type {number}
*/
sizeOf.NUMBER32 = constant(5);
/**
* @param {number}
* @returns {Array}
*/
encode.REAL = function(v) {
	let value = v.toString();
	const m = /\.(\d*?)(?:9{5,20}|0{5,20})\d{0,2}(?:e(.+)|$)/.exec(value);
	if (m) {
		const epsilon = parseFloat("1e" + ((m[2] ? +m[2] : 0) + m[1].length));
		value = (Math.round(v * epsilon) / epsilon).toString();
	}
	let nibbles = "";
	for (let i = 0, ii = value.length; i < ii; i += 1) {
		const c = value[i];
		if (c === "e") nibbles += value[++i] === "-" ? "c" : "b";
		else if (c === ".") nibbles += "a";
		else if (c === "-") nibbles += "e";
		else nibbles += c;
	}
	nibbles += nibbles.length & 1 ? "f" : "ff";
	const out = [30];
	for (let i = 0, ii = nibbles.length; i < ii; i += 2) out.push(parseInt(nibbles.substr(i, 2), 16));
	return out;
};
/**
* @param {number}
* @returns {number}
*/
sizeOf.REAL = function(v) {
	return encode.REAL(v).length;
};
encode.NAME = encode.CHARARRAY;
sizeOf.NAME = sizeOf.CHARARRAY;
encode.STRING = encode.CHARARRAY;
sizeOf.STRING = sizeOf.CHARARRAY;
/**
* @param {DataView} data
* @param {number} offset
* @param {number} numBytes
* @returns {string}
*/
decode.UTF8 = function(data, offset, numBytes) {
	const codePoints = [];
	const numChars = numBytes;
	for (let j = 0; j < numChars; j++, offset += 1) codePoints[j] = data.getUint8(offset);
	return String.fromCharCode.apply(null, codePoints);
};
/**
* @param {DataView} data
* @param {number} offset
* @param {number} numBytes
* @returns {string}
*/
decode.UTF16 = function(data, offset, numBytes) {
	const codePoints = [];
	const numChars = numBytes / 2;
	for (let j = 0; j < numChars; j++, offset += 2) codePoints[j] = data.getUint16(offset);
	return String.fromCharCode.apply(null, codePoints);
};
/**
* Convert a JavaScript string to UTF16-BE.
* @param {string}
* @returns {Array}
*/
encode.UTF16 = function(v) {
	const b = [];
	for (let i = 0; i < v.length; i += 1) {
		const codepoint = v.charCodeAt(i);
		b[b.length] = codepoint >> 8 & 255;
		b[b.length] = codepoint & 255;
	}
	return b;
};
/**
* @param {string}
* @returns {number}
*/
sizeOf.UTF16 = function(v) {
	return v.length * 2;
};
/**
* @private
*/
var eightBitMacEncodings = {
	"x-mac-croatian": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®Š™´¨≠ŽØ∞±≤≥∆µ∂∑∏š∫ªºΩžø¿¡¬√ƒ≈Ć«Č…\xA0ÀÃÕŒœĐ—“”‘’÷◊©⁄€‹›Æ»–·‚„‰ÂćÁčÈÍÎÏÌÓÔđÒÚÛÙıˆ˜¯πË˚¸Êæˇ",
	"x-mac-cyrillic": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°Ґ£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµґЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»…\xA0ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю",
	"x-mac-gaelic": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØḂ±≤≥ḃĊċḊḋḞḟĠġṀæøṁṖṗɼƒſṠ«»…\xA0ÀÃÕŒœ–—“”‘’ṡẛÿŸṪ€‹›Ŷŷṫ·Ỳỳ⁊ÂÊÁËÈÍÎÏÌÓÔ♣ÒÚÛÙıÝýŴŵẄẅẀẁẂẃ",
	"x-mac-greek": "Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦€ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩάΝ¬ΟΡ≈Τ«»…\xA0ΥΧΆΈœ–―“”‘’÷ΉΊΌΎέήίόΏύαβψδεφγηιξκλμνοπώρστθωςχυζϊϋΐΰ­",
	"x-mac-icelandic": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»…\xA0ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ",
	"x-mac-inuit": "ᐃᐄᐅᐆᐊᐋᐱᐲᐳᐴᐸᐹᑉᑎᑏᑐᑑᑕᑖᑦᑭᑮᑯᑰᑲᑳᒃᒋᒌᒍᒎᒐᒑ°ᒡᒥᒦ•¶ᒧ®©™ᒨᒪᒫᒻᓂᓃᓄᓅᓇᓈᓐᓯᓰᓱᓲᓴᓵᔅᓕᓖᓗᓘᓚᓛᓪᔨᔩᔪᔫᔭ…\xA0ᔮᔾᕕᕖᕗ–—“”‘’ᕘᕙᕚᕝᕆᕇᕈᕉᕋᕌᕐᕿᖀᖁᖂᖃᖄᖅᖏᖐᖑᖒᖓᖔᖕᙱᙲᙳᙴᙵᙶᖖᖠᖡᖢᖣᖤᖥᖦᕼŁł",
	"x-mac-ce": "ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅņŃ¬√ńŇ∆«»…\xA0ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ",
	macintosh: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»…\xA0ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ",
	"x-mac-romanian": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ĂȘ∞±≤≥¥µ∂∑∏π∫ªºΩăș¿¡¬√ƒ≈∆«»…\xA0ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›Țț‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ",
	"x-mac-turkish": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»…\xA0ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙˆ˜¯˘˙˚¸˝˛ˇ"
};
/**
* Decodes an old-style Macintosh string. Returns either a Unicode JavaScript
* string, or 'undefined' if the encoding is unsupported. For example, we do
* not support Chinese, Japanese or Korean because these would need large
* mapping tables.
* @param {DataView} dataView
* @param {number} offset
* @param {number} dataLength
* @param {string} encoding
* @returns {string}
*/
decode.MACSTRING = function(dataView, offset, dataLength, encoding) {
	const table = eightBitMacEncodings[encoding];
	if (table === void 0) return;
	let result = "";
	for (let i = 0; i < dataLength; i++) {
		const c = dataView.getUint8(offset + i);
		if (c <= 127) result += String.fromCharCode(c);
		else result += table[c & 127];
	}
	return result;
};
var macEncodingTableCache = typeof WeakMap === "function" && /* @__PURE__ */ new WeakMap();
var macEncodingCacheKeys;
var getMacEncodingTable = function(encoding) {
	if (!macEncodingCacheKeys) {
		macEncodingCacheKeys = {};
		for (let e in eightBitMacEncodings) macEncodingCacheKeys[e] = new String(e);
	}
	const cacheKey = macEncodingCacheKeys[encoding];
	if (cacheKey === void 0) return;
	if (macEncodingTableCache) {
		const cachedTable = macEncodingTableCache.get(cacheKey);
		if (cachedTable !== void 0) return cachedTable;
	}
	const decodingTable = eightBitMacEncodings[encoding];
	if (decodingTable === void 0) return;
	const encodingTable = {};
	for (let i = 0; i < decodingTable.length; i++) encodingTable[decodingTable.charCodeAt(i)] = i + 128;
	if (macEncodingTableCache) macEncodingTableCache.set(cacheKey, encodingTable);
	return encodingTable;
};
/**
* Encodes an old-style Macintosh string. Returns a byte array upon success.
* If the requested encoding is unsupported, or if the input string contains
* a character that cannot be expressed in the encoding, the function returns
* 'undefined'.
* @param {string} str
* @param {string} encoding
* @returns {Array}
*/
encode.MACSTRING = function(str, encoding) {
	const table = getMacEncodingTable(encoding);
	if (table === void 0) return;
	const result = [];
	for (let i = 0; i < str.length; i++) {
		let c = str.charCodeAt(i);
		if (c >= 128) {
			c = table[c];
			if (c === void 0) return;
		}
		result[i] = c;
	}
	return result;
};
/**
* @param {string} str
* @param {string} encoding
* @returns {number}
*/
sizeOf.MACSTRING = function(str, encoding) {
	const b = encode.MACSTRING(str, encoding);
	if (b !== void 0) return b.length;
	else return 0;
};
function isByteEncodable(value) {
	return value >= -128 && value <= 127;
}
function encodeVarDeltaRunAsZeroes(deltas, pos, result) {
	let runLength = 0;
	const numDeltas = deltas.length;
	while (pos < numDeltas && runLength < 64 && deltas[pos] === 0) {
		++pos;
		++runLength;
	}
	result.push(128 | runLength - 1);
	return pos;
}
function encodeVarDeltaRunAsBytes(deltas, offset, result) {
	let runLength = 0;
	const numDeltas = deltas.length;
	let pos = offset;
	while (pos < numDeltas && runLength < 64) {
		const value = deltas[pos];
		if (!isByteEncodable(value)) break;
		if (value === 0 && pos + 1 < numDeltas && deltas[pos + 1] === 0) break;
		++pos;
		++runLength;
	}
	result.push(runLength - 1);
	for (let i = offset; i < pos; ++i) result.push(deltas[i] + 256 & 255);
	return pos;
}
function encodeVarDeltaRunAsWords(deltas, offset, result) {
	let runLength = 0;
	const numDeltas = deltas.length;
	let pos = offset;
	while (pos < numDeltas && runLength < 64) {
		const value = deltas[pos];
		if (value === 0) break;
		if (isByteEncodable(value) && pos + 1 < numDeltas && isByteEncodable(deltas[pos + 1])) break;
		++pos;
		++runLength;
	}
	result.push(64 | runLength - 1);
	for (let i = offset; i < pos; ++i) {
		const val = deltas[i];
		result.push(val + 65536 >> 8 & 255, val + 256 & 255);
	}
	return pos;
}
/**
* Encode a list of variation adjustment deltas.
*
* Variation adjustment deltas are used in ‘gvar’ and ‘cvar’ tables.
* They indicate how points (in ‘gvar’) or values (in ‘cvar’) get adjusted
* when generating instances of variation fonts.
*
* @see https://www.microsoft.com/typography/otspec/gvar.htm
* @see https://developer.apple.com/fonts/TrueType-Reference-Manual/RM06/Chap6gvar.html
* @param {Array}
* @return {Array}
*/
encode.VARDELTAS = function(deltas) {
	let pos = 0;
	const result = [];
	while (pos < deltas.length) {
		const value = deltas[pos];
		if (value === 0) pos = encodeVarDeltaRunAsZeroes(deltas, pos, result);
		else if (value >= -128 && value <= 127) pos = encodeVarDeltaRunAsBytes(deltas, pos, result);
		else pos = encodeVarDeltaRunAsWords(deltas, pos, result);
	}
	return result;
};
/**
* @param {Array} l
* @returns {Array}
*/
encode.INDEX = function(l) {
	let offset = 1;
	const offsets = [offset];
	const data = [];
	for (let i = 0; i < l.length; i += 1) {
		const v = encode.OBJECT(l[i]);
		Array.prototype.push.apply(data, v);
		offset += v.length;
		offsets.push(offset);
	}
	if (data.length === 0) return [0, 0];
	const encodedOffsets = [];
	const offSize = 1 + Math.floor(Math.log(offset) / Math.log(2)) / 8 | 0;
	const offsetEncoder = [
		void 0,
		encode.BYTE,
		encode.USHORT,
		encode.UINT24,
		encode.ULONG
	][offSize];
	for (let i = 0; i < offsets.length; i += 1) {
		const encodedOffset = offsetEncoder(offsets[i]);
		Array.prototype.push.apply(encodedOffsets, encodedOffset);
	}
	return Array.prototype.concat(encode.Card16(l.length), encode.OffSize(offSize), encodedOffsets, data);
};
/**
* @param {Array}
* @returns {number}
*/
sizeOf.INDEX = function(v) {
	return encode.INDEX(v).length;
};
/**
* Convert an object to a CFF DICT structure.
* The keys should be numeric.
* The values should be objects containing name / type / value.
* @param {Object} m
* @returns {Array}
*/
encode.DICT = function(m) {
	let d = [];
	const keys = Object.keys(m);
	const length = keys.length;
	for (let i = 0; i < length; i += 1) {
		const k = parseInt(keys[i], 0);
		const v = m[k];
		d = d.concat(encode.OPERAND(v.value, v.type));
		d = d.concat(encode.OPERATOR(k));
	}
	return d;
};
/**
* @param {Object}
* @returns {number}
*/
sizeOf.DICT = function(m) {
	return encode.DICT(m).length;
};
/**
* @param {number}
* @returns {Array}
*/
encode.OPERATOR = function(v) {
	if (v < 1200) return [v];
	else return [12, v - 1200];
};
/**
* @param {Array} v
* @param {string}
* @returns {Array}
*/
encode.OPERAND = function(v, type) {
	let d = [];
	if (Array.isArray(type)) for (let i = 0; i < type.length; i += 1) {
		check_default.argument(v.length === type.length, "Not enough arguments given for type" + type);
		d = d.concat(encode.OPERAND(v[i], type[i]));
	}
	else if (type === "SID") d = d.concat(encode.NUMBER(v));
	else if (type === "offset") d = d.concat(encode.NUMBER32(v));
	else if (type === "number") d = d.concat(encode.NUMBER(v));
	else if (type === "real") d = d.concat(encode.REAL(v));
	else throw new Error("Unknown operand type " + type);
	return d;
};
encode.OP = encode.BYTE;
sizeOf.OP = sizeOf.BYTE;
var wmm = typeof WeakMap === "function" && /* @__PURE__ */ new WeakMap();
/**
* Convert a list of CharString operations to bytes.
* @param {Array}
* @returns {Array}
*/
encode.CHARSTRING = function(ops) {
	if (wmm) {
		const cachedValue = wmm.get(ops);
		if (cachedValue !== void 0) return cachedValue;
	}
	let d = [];
	const length = ops.length;
	for (let i = 0; i < length; i += 1) {
		const op = ops[i];
		d = d.concat(encode[op.type](op.value));
	}
	if (wmm) wmm.set(ops, d);
	return d;
};
/**
* @param {Array}
* @returns {number}
*/
sizeOf.CHARSTRING = function(ops) {
	return encode.CHARSTRING(ops).length;
};
/**
* Convert an object containing name / type / value to bytes.
* @param {Object}
* @returns {Array}
*/
encode.OBJECT = function(v) {
	const encodingFunction = encode[v.type];
	check_default.argument(encodingFunction !== void 0, "No encoding function for type " + v.type);
	return encodingFunction(v.value);
};
/**
* @param {Object}
* @returns {number}
*/
sizeOf.OBJECT = function(v) {
	const sizeOfFunction = sizeOf[v.type];
	check_default.argument(sizeOfFunction !== void 0, "No sizeOf function for type " + v.type);
	return sizeOfFunction(v.value);
};
/**
* Convert a table object to bytes.
* A table contains a list of fields containing the metadata (name, type and default value).
* The table itself has the field values set as attributes.
* @param {opentype.Table}
* @returns {Array}
*/
encode.TABLE = function(table) {
	let d = [];
	const length = table.fields.length;
	const subtables = [];
	const subtableOffsets = [];
	for (let i = 0; i < length; i += 1) {
		const field = table.fields[i];
		const encodingFunction = encode[field.type];
		check_default.argument(encodingFunction !== void 0, "No encoding function for field type " + field.type + " (" + field.name + ")");
		let value = table[field.name];
		if (value === void 0) value = field.value;
		const bytes = encodingFunction(value);
		if (field.type === "TABLE") {
			subtableOffsets.push(d.length);
			d = d.concat([0, 0]);
			subtables.push(bytes);
		} else d = d.concat(bytes);
	}
	for (let i = 0; i < subtables.length; i += 1) {
		const o = subtableOffsets[i];
		const offset = d.length;
		check_default.argument(offset < 65536, "Table " + table.tableName + " too big.");
		d[o] = offset >> 8;
		d[o + 1] = offset & 255;
		d = d.concat(subtables[i]);
	}
	return d;
};
/**
* @param {opentype.Table}
* @returns {number}
*/
sizeOf.TABLE = function(table) {
	let numBytes = 0;
	const length = table.fields.length;
	for (let i = 0; i < length; i += 1) {
		const field = table.fields[i];
		const sizeOfFunction = sizeOf[field.type];
		check_default.argument(sizeOfFunction !== void 0, "No sizeOf function for field type " + field.type + " (" + field.name + ")");
		let value = table[field.name];
		if (value === void 0) value = field.value;
		numBytes += sizeOfFunction(value);
		if (field.type === "TABLE") numBytes += 2;
	}
	return numBytes;
};
encode.RECORD = encode.TABLE;
sizeOf.RECORD = sizeOf.TABLE;
encode.LITERAL = function(v) {
	return v;
};
sizeOf.LITERAL = function(v) {
	return v.length;
};
//#endregion
//#region node_modules/opentype.js/src/table.js
/**
* @exports opentype.Table
* @class
* @param {string} tableName
* @param {Array} fields
* @param {Object} options
* @constructor
*/
function Table(tableName, fields, options) {
	for (let i = 0; i < fields.length; i += 1) {
		const field = fields[i];
		this[field.name] = field.value;
	}
	this.tableName = tableName;
	this.fields = fields;
	if (options) {
		const optionKeys = Object.keys(options);
		for (let i = 0; i < optionKeys.length; i += 1) {
			const k = optionKeys[i];
			const v = options[k];
			if (this[k] !== void 0) this[k] = v;
		}
	}
}
/**
* Encodes the table and returns an array of bytes
* @return {Array}
*/
Table.prototype.encode = function() {
	return encode.TABLE(this);
};
/**
* Get the size of the table.
* @return {number}
*/
Table.prototype.sizeOf = function() {
	return sizeOf.TABLE(this);
};
/**
* @private
*/
function ushortList(itemName, list, count) {
	if (count === void 0) count = list.length;
	const fields = new Array(list.length + 1);
	fields[0] = {
		name: itemName + "Count",
		type: "USHORT",
		value: count
	};
	for (let i = 0; i < list.length; i++) fields[i + 1] = {
		name: itemName + i,
		type: "USHORT",
		value: list[i]
	};
	return fields;
}
/**
* @private
*/
function tableList(itemName, records, itemCallback) {
	const count = records.length;
	const fields = new Array(count + 1);
	fields[0] = {
		name: itemName + "Count",
		type: "USHORT",
		value: count
	};
	for (let i = 0; i < count; i++) fields[i + 1] = {
		name: itemName + i,
		type: "TABLE",
		value: itemCallback(records[i], i)
	};
	return fields;
}
/**
* @private
*/
function recordList(itemName, records, itemCallback) {
	const count = records.length;
	let fields = [];
	fields[0] = {
		name: itemName + "Count",
		type: "USHORT",
		value: count
	};
	for (let i = 0; i < count; i++) fields = fields.concat(itemCallback(records[i], i));
	return fields;
}
/**
* @exports opentype.Coverage
* @class
* @param {opentype.Table}
* @constructor
* @extends opentype.Table
*/
function Coverage(coverageTable) {
	if (coverageTable.format === 1) Table.call(this, "coverageTable", [{
		name: "coverageFormat",
		type: "USHORT",
		value: 1
	}].concat(ushortList("glyph", coverageTable.glyphs)));
	else check_default.assert(false, "Can't create coverage table format 2 yet.");
}
Coverage.prototype = Object.create(Table.prototype);
Coverage.prototype.constructor = Coverage;
function ScriptList(scriptListTable) {
	Table.call(this, "scriptListTable", recordList("scriptRecord", scriptListTable, function(scriptRecord, i) {
		const script = scriptRecord.script;
		let defaultLangSys = script.defaultLangSys;
		check_default.assert(!!defaultLangSys, "Unable to write GSUB: script " + scriptRecord.tag + " has no default language system.");
		return [{
			name: "scriptTag" + i,
			type: "TAG",
			value: scriptRecord.tag
		}, {
			name: "script" + i,
			type: "TABLE",
			value: new Table("scriptTable", [{
				name: "defaultLangSys",
				type: "TABLE",
				value: new Table("defaultLangSys", [{
					name: "lookupOrder",
					type: "USHORT",
					value: 0
				}, {
					name: "reqFeatureIndex",
					type: "USHORT",
					value: defaultLangSys.reqFeatureIndex
				}].concat(ushortList("featureIndex", defaultLangSys.featureIndexes)))
			}].concat(recordList("langSys", script.langSysRecords, function(langSysRecord, i) {
				const langSys = langSysRecord.langSys;
				return [{
					name: "langSysTag" + i,
					type: "TAG",
					value: langSysRecord.tag
				}, {
					name: "langSys" + i,
					type: "TABLE",
					value: new Table("langSys", [{
						name: "lookupOrder",
						type: "USHORT",
						value: 0
					}, {
						name: "reqFeatureIndex",
						type: "USHORT",
						value: langSys.reqFeatureIndex
					}].concat(ushortList("featureIndex", langSys.featureIndexes)))
				}];
			})))
		}];
	}));
}
ScriptList.prototype = Object.create(Table.prototype);
ScriptList.prototype.constructor = ScriptList;
/**
* @exports opentype.FeatureList
* @class
* @param {opentype.Table}
* @constructor
* @extends opentype.Table
*/
function FeatureList(featureListTable) {
	Table.call(this, "featureListTable", recordList("featureRecord", featureListTable, function(featureRecord, i) {
		const feature = featureRecord.feature;
		return [{
			name: "featureTag" + i,
			type: "TAG",
			value: featureRecord.tag
		}, {
			name: "feature" + i,
			type: "TABLE",
			value: new Table("featureTable", [{
				name: "featureParams",
				type: "USHORT",
				value: feature.featureParams
			}].concat(ushortList("lookupListIndex", feature.lookupListIndexes)))
		}];
	}));
}
FeatureList.prototype = Object.create(Table.prototype);
FeatureList.prototype.constructor = FeatureList;
/**
* @exports opentype.LookupList
* @class
* @param {opentype.Table}
* @param {Object}
* @constructor
* @extends opentype.Table
*/
function LookupList(lookupListTable, subtableMakers) {
	Table.call(this, "lookupListTable", tableList("lookup", lookupListTable, function(lookupTable) {
		let subtableCallback = subtableMakers[lookupTable.lookupType];
		check_default.assert(!!subtableCallback, "Unable to write GSUB lookup type " + lookupTable.lookupType + " tables.");
		return new Table("lookupTable", [{
			name: "lookupType",
			type: "USHORT",
			value: lookupTable.lookupType
		}, {
			name: "lookupFlag",
			type: "USHORT",
			value: lookupTable.lookupFlag
		}].concat(tableList("subtable", lookupTable.subtables, subtableCallback)));
	}));
}
LookupList.prototype = Object.create(Table.prototype);
LookupList.prototype.constructor = LookupList;
var table_default = {
	Table,
	Record: Table,
	Coverage,
	ScriptList,
	FeatureList,
	LookupList,
	ushortList,
	tableList,
	recordList
};
//#endregion
//#region node_modules/opentype.js/src/parse.js
function getByte(dataView, offset) {
	return dataView.getUint8(offset);
}
function getUShort(dataView, offset) {
	return dataView.getUint16(offset, false);
}
function getShort(dataView, offset) {
	return dataView.getInt16(offset, false);
}
function getULong(dataView, offset) {
	return dataView.getUint32(offset, false);
}
function getFixed(dataView, offset) {
	return dataView.getInt16(offset, false) + dataView.getUint16(offset + 2, false) / 65535;
}
function getTag(dataView, offset) {
	let tag = "";
	for (let i = offset; i < offset + 4; i += 1) tag += String.fromCharCode(dataView.getInt8(i));
	return tag;
}
function getOffset(dataView, offset, offSize) {
	let v = 0;
	for (let i = 0; i < offSize; i += 1) {
		v <<= 8;
		v += dataView.getUint8(offset + i);
	}
	return v;
}
function getBytes(dataView, startOffset, endOffset) {
	const bytes = [];
	for (let i = startOffset; i < endOffset; i += 1) bytes.push(dataView.getUint8(i));
	return bytes;
}
function bytesToString(bytes) {
	let s = "";
	for (let i = 0; i < bytes.length; i += 1) s += String.fromCharCode(bytes[i]);
	return s;
}
var typeOffsets = {
	byte: 1,
	uShort: 2,
	short: 2,
	uLong: 4,
	fixed: 4,
	longDateTime: 8,
	tag: 4
};
function Parser(data, offset) {
	this.data = data;
	this.offset = offset;
	this.relativeOffset = 0;
}
Parser.prototype.parseByte = function() {
	const v = this.data.getUint8(this.offset + this.relativeOffset);
	this.relativeOffset += 1;
	return v;
};
Parser.prototype.parseChar = function() {
	const v = this.data.getInt8(this.offset + this.relativeOffset);
	this.relativeOffset += 1;
	return v;
};
Parser.prototype.parseCard8 = Parser.prototype.parseByte;
Parser.prototype.parseUShort = function() {
	const v = this.data.getUint16(this.offset + this.relativeOffset);
	this.relativeOffset += 2;
	return v;
};
Parser.prototype.parseCard16 = Parser.prototype.parseUShort;
Parser.prototype.parseSID = Parser.prototype.parseUShort;
Parser.prototype.parseOffset16 = Parser.prototype.parseUShort;
Parser.prototype.parseShort = function() {
	const v = this.data.getInt16(this.offset + this.relativeOffset);
	this.relativeOffset += 2;
	return v;
};
Parser.prototype.parseF2Dot14 = function() {
	const v = this.data.getInt16(this.offset + this.relativeOffset) / 16384;
	this.relativeOffset += 2;
	return v;
};
Parser.prototype.parseULong = function() {
	const v = getULong(this.data, this.offset + this.relativeOffset);
	this.relativeOffset += 4;
	return v;
};
Parser.prototype.parseFixed = function() {
	const v = getFixed(this.data, this.offset + this.relativeOffset);
	this.relativeOffset += 4;
	return v;
};
Parser.prototype.parseString = function(length) {
	const dataView = this.data;
	const offset = this.offset + this.relativeOffset;
	let string = "";
	this.relativeOffset += length;
	for (let i = 0; i < length; i++) string += String.fromCharCode(dataView.getUint8(offset + i));
	return string;
};
Parser.prototype.parseTag = function() {
	return this.parseString(4);
};
Parser.prototype.parseLongDateTime = function() {
	let v = getULong(this.data, this.offset + this.relativeOffset + 4);
	v -= 2082844800;
	this.relativeOffset += 8;
	return v;
};
Parser.prototype.parseVersion = function() {
	const major = getUShort(this.data, this.offset + this.relativeOffset);
	const minor = getUShort(this.data, this.offset + this.relativeOffset + 2);
	this.relativeOffset += 4;
	return major + minor / 4096 / 10;
};
Parser.prototype.skip = function(type, amount) {
	if (amount === void 0) amount = 1;
	this.relativeOffset += typeOffsets[type] * amount;
};
Parser.prototype.parseOffset16List = Parser.prototype.parseUShortList = function(count) {
	if (count === void 0) count = this.parseUShort();
	const offsets = new Array(count);
	const dataView = this.data;
	let offset = this.offset + this.relativeOffset;
	for (let i = 0; i < count; i++) {
		offsets[i] = dataView.getUint16(offset);
		offset += 2;
	}
	this.relativeOffset += count * 2;
	return offsets;
};
Parser.prototype.parseShortList = function(count) {
	const list = new Array(count);
	const dataView = this.data;
	let offset = this.offset + this.relativeOffset;
	for (let i = 0; i < count; i++) {
		list[i] = dataView.getInt16(offset);
		offset += 2;
	}
	this.relativeOffset += count * 2;
	return list;
};
Parser.prototype.parseByteList = function(count) {
	const list = new Array(count);
	const dataView = this.data;
	let offset = this.offset + this.relativeOffset;
	for (let i = 0; i < count; i++) list[i] = dataView.getUint8(offset++);
	this.relativeOffset += count;
	return list;
};
/**
* Parse a list of items.
* Record count is optional, if omitted it is read from the stream.
* itemCallback is one of the Parser methods.
*/
Parser.prototype.parseList = function(count, itemCallback) {
	if (!itemCallback) {
		itemCallback = count;
		count = this.parseUShort();
	}
	const list = new Array(count);
	for (let i = 0; i < count; i++) list[i] = itemCallback.call(this);
	return list;
};
/**
* Parse a list of records.
* Record count is optional, if omitted it is read from the stream.
* Example of recordDescription: { sequenceIndex: Parser.uShort, lookupListIndex: Parser.uShort }
*/
Parser.prototype.parseRecordList = function(count, recordDescription) {
	if (!recordDescription) {
		recordDescription = count;
		count = this.parseUShort();
	}
	const records = new Array(count);
	const fields = Object.keys(recordDescription);
	for (let i = 0; i < count; i++) {
		const rec = {};
		for (let j = 0; j < fields.length; j++) {
			const fieldName = fields[j];
			rec[fieldName] = recordDescription[fieldName].call(this);
		}
		records[i] = rec;
	}
	return records;
};
Parser.prototype.parseStruct = function(description) {
	if (typeof description === "function") return description.call(this);
	else {
		const fields = Object.keys(description);
		const struct = {};
		for (let j = 0; j < fields.length; j++) {
			const fieldName = fields[j];
			struct[fieldName] = description[fieldName].call(this);
		}
		return struct;
	}
};
Parser.prototype.parsePointer = function(description) {
	const structOffset = this.parseOffset16();
	if (structOffset > 0) return new Parser(this.data, this.offset + structOffset).parseStruct(description);
};
/**
* Parse a list of offsets to lists of 16-bit integers,
* or a list of offsets to lists of offsets to any kind of items.
* If itemCallback is not provided, a list of list of UShort is assumed.
* If provided, itemCallback is called on each item and must parse the item.
* See examples in tables/gsub.js
*/
Parser.prototype.parseListOfLists = function(itemCallback) {
	const offsets = this.parseOffset16List();
	const count = offsets.length;
	const relativeOffset = this.relativeOffset;
	const list = new Array(count);
	for (let i = 0; i < count; i++) {
		const start = offsets[i];
		if (start === 0) {
			list[i] = void 0;
			continue;
		}
		this.relativeOffset = start;
		if (itemCallback) {
			const subOffsets = this.parseOffset16List();
			const subList = new Array(subOffsets.length);
			for (let j = 0; j < subOffsets.length; j++) {
				this.relativeOffset = start + subOffsets[j];
				subList[j] = itemCallback.call(this);
			}
			list[i] = subList;
		} else list[i] = this.parseUShortList();
	}
	this.relativeOffset = relativeOffset;
	return list;
};
Parser.prototype.parseCoverage = function() {
	const startOffset = this.offset + this.relativeOffset;
	const format = this.parseUShort();
	const count = this.parseUShort();
	if (format === 1) return {
		format: 1,
		glyphs: this.parseUShortList(count)
	};
	else if (format === 2) {
		const ranges = new Array(count);
		for (let i = 0; i < count; i++) ranges[i] = {
			start: this.parseUShort(),
			end: this.parseUShort(),
			index: this.parseUShort()
		};
		return {
			format: 2,
			ranges
		};
	}
	throw new Error("0x" + startOffset.toString(16) + ": Coverage format must be 1 or 2.");
};
Parser.prototype.parseClassDef = function() {
	const startOffset = this.offset + this.relativeOffset;
	const format = this.parseUShort();
	if (format === 1) return {
		format: 1,
		startGlyph: this.parseUShort(),
		classes: this.parseUShortList()
	};
	else if (format === 2) return {
		format: 2,
		ranges: this.parseRecordList({
			start: Parser.uShort,
			end: Parser.uShort,
			classId: Parser.uShort
		})
	};
	throw new Error("0x" + startOffset.toString(16) + ": ClassDef format must be 1 or 2.");
};
Parser.list = function(count, itemCallback) {
	return function() {
		return this.parseList(count, itemCallback);
	};
};
Parser.recordList = function(count, recordDescription) {
	return function() {
		return this.parseRecordList(count, recordDescription);
	};
};
Parser.pointer = function(description) {
	return function() {
		return this.parsePointer(description);
	};
};
Parser.tag = Parser.prototype.parseTag;
Parser.byte = Parser.prototype.parseByte;
Parser.uShort = Parser.offset16 = Parser.prototype.parseUShort;
Parser.uShortList = Parser.prototype.parseUShortList;
Parser.struct = Parser.prototype.parseStruct;
Parser.coverage = Parser.prototype.parseCoverage;
Parser.classDef = Parser.prototype.parseClassDef;
var langSysTable = {
	reserved: Parser.uShort,
	reqFeatureIndex: Parser.uShort,
	featureIndexes: Parser.uShortList
};
Parser.prototype.parseScriptList = function() {
	return this.parsePointer(Parser.recordList({
		tag: Parser.tag,
		script: Parser.pointer({
			defaultLangSys: Parser.pointer(langSysTable),
			langSysRecords: Parser.recordList({
				tag: Parser.tag,
				langSys: Parser.pointer(langSysTable)
			})
		})
	}));
};
Parser.prototype.parseFeatureList = function() {
	return this.parsePointer(Parser.recordList({
		tag: Parser.tag,
		feature: Parser.pointer({
			featureParams: Parser.offset16,
			lookupListIndexes: Parser.uShortList
		})
	}));
};
Parser.prototype.parseLookupList = function(lookupTableParsers) {
	return this.parsePointer(Parser.list(Parser.pointer(function() {
		const lookupType = this.parseUShort();
		check_default.argument(1 <= lookupType && lookupType <= 8, "GSUB lookup type " + lookupType + " unknown.");
		const lookupFlag = this.parseUShort();
		const useMarkFilteringSet = lookupFlag & 16;
		return {
			lookupType,
			lookupFlag,
			subtables: this.parseList(Parser.pointer(lookupTableParsers[lookupType])),
			markFilteringSet: useMarkFilteringSet ? this.parseUShort() : void 0
		};
	})));
};
var parse_default = {
	getByte,
	getCard8: getByte,
	getUShort,
	getCard16: getUShort,
	getShort,
	getULong,
	getFixed,
	getTag,
	getOffset,
	getBytes,
	bytesToString,
	Parser
};
//#endregion
//#region node_modules/opentype.js/src/tables/cmap.js
function parseCmapTableFormat12(cmap, p) {
	p.parseUShort();
	cmap.length = p.parseULong();
	cmap.language = p.parseULong();
	let groupCount;
	cmap.groupCount = groupCount = p.parseULong();
	cmap.glyphIndexMap = {};
	for (let i = 0; i < groupCount; i += 1) {
		const startCharCode = p.parseULong();
		const endCharCode = p.parseULong();
		let startGlyphId = p.parseULong();
		for (let c = startCharCode; c <= endCharCode; c += 1) {
			cmap.glyphIndexMap[c] = startGlyphId;
			startGlyphId++;
		}
	}
}
function parseCmapTableFormat4(cmap, p, data, start, offset) {
	cmap.length = p.parseUShort();
	cmap.language = p.parseUShort();
	let segCount;
	cmap.segCount = segCount = p.parseUShort() >> 1;
	p.skip("uShort", 3);
	cmap.glyphIndexMap = {};
	const endCountParser = new parse_default.Parser(data, start + offset + 14);
	const startCountParser = new parse_default.Parser(data, start + offset + 16 + segCount * 2);
	const idDeltaParser = new parse_default.Parser(data, start + offset + 16 + segCount * 4);
	const idRangeOffsetParser = new parse_default.Parser(data, start + offset + 16 + segCount * 6);
	let glyphIndexOffset = start + offset + 16 + segCount * 8;
	for (let i = 0; i < segCount - 1; i += 1) {
		let glyphIndex;
		const endCount = endCountParser.parseUShort();
		const startCount = startCountParser.parseUShort();
		const idDelta = idDeltaParser.parseShort();
		const idRangeOffset = idRangeOffsetParser.parseUShort();
		for (let c = startCount; c <= endCount; c += 1) {
			if (idRangeOffset !== 0) {
				glyphIndexOffset = idRangeOffsetParser.offset + idRangeOffsetParser.relativeOffset - 2;
				glyphIndexOffset += idRangeOffset;
				glyphIndexOffset += (c - startCount) * 2;
				glyphIndex = parse_default.getUShort(data, glyphIndexOffset);
				if (glyphIndex !== 0) glyphIndex = glyphIndex + idDelta & 65535;
			} else glyphIndex = c + idDelta & 65535;
			cmap.glyphIndexMap[c] = glyphIndex;
		}
	}
}
function parseCmapTable(data, start) {
	const cmap = {};
	cmap.version = parse_default.getUShort(data, start);
	check_default.argument(cmap.version === 0, "cmap table version should be 0.");
	cmap.numTables = parse_default.getUShort(data, start + 2);
	let offset = -1;
	for (let i = cmap.numTables - 1; i >= 0; i -= 1) {
		const platformId = parse_default.getUShort(data, start + 4 + i * 8);
		const encodingId = parse_default.getUShort(data, start + 4 + i * 8 + 2);
		if (platformId === 3 && (encodingId === 0 || encodingId === 1 || encodingId === 10)) {
			offset = parse_default.getULong(data, start + 4 + i * 8 + 4);
			break;
		}
	}
	if (offset === -1) throw new Error("No valid cmap sub-tables found.");
	const p = new parse_default.Parser(data, start + offset);
	cmap.format = p.parseUShort();
	if (cmap.format === 12) parseCmapTableFormat12(cmap, p);
	else if (cmap.format === 4) parseCmapTableFormat4(cmap, p, data, start, offset);
	else throw new Error("Only format 4 and 12 cmap tables are supported (found format " + cmap.format + ").");
	return cmap;
}
function addSegment(t, code, glyphIndex) {
	t.segments.push({
		end: code,
		start: code,
		delta: -(code - glyphIndex),
		offset: 0
	});
}
function addTerminatorSegment(t) {
	t.segments.push({
		end: 65535,
		start: 65535,
		delta: 1,
		offset: 0
	});
}
function makeCmapTable(glyphs) {
	const t = new table_default.Table("cmap", [
		{
			name: "version",
			type: "USHORT",
			value: 0
		},
		{
			name: "numTables",
			type: "USHORT",
			value: 1
		},
		{
			name: "platformID",
			type: "USHORT",
			value: 3
		},
		{
			name: "encodingID",
			type: "USHORT",
			value: 1
		},
		{
			name: "offset",
			type: "ULONG",
			value: 12
		},
		{
			name: "format",
			type: "USHORT",
			value: 4
		},
		{
			name: "length",
			type: "USHORT",
			value: 0
		},
		{
			name: "language",
			type: "USHORT",
			value: 0
		},
		{
			name: "segCountX2",
			type: "USHORT",
			value: 0
		},
		{
			name: "searchRange",
			type: "USHORT",
			value: 0
		},
		{
			name: "entrySelector",
			type: "USHORT",
			value: 0
		},
		{
			name: "rangeShift",
			type: "USHORT",
			value: 0
		}
	]);
	t.segments = [];
	for (let i = 0; i < glyphs.length; i += 1) {
		const glyph = glyphs.get(i);
		for (let j = 0; j < glyph.unicodes.length; j += 1) addSegment(t, glyph.unicodes[j], i);
		t.segments = t.segments.sort(function(a, b) {
			return a.start - b.start;
		});
	}
	addTerminatorSegment(t);
	let segCount;
	segCount = t.segments.length;
	t.segCountX2 = segCount * 2;
	t.searchRange = Math.pow(2, Math.floor(Math.log(segCount) / Math.log(2))) * 2;
	t.entrySelector = Math.log(t.searchRange / 2) / Math.log(2);
	t.rangeShift = t.segCountX2 - t.searchRange;
	let endCounts = [];
	let startCounts = [];
	let idDeltas = [];
	let idRangeOffsets = [];
	let glyphIds = [];
	for (let i = 0; i < segCount; i += 1) {
		const segment = t.segments[i];
		endCounts = endCounts.concat({
			name: "end_" + i,
			type: "USHORT",
			value: segment.end
		});
		startCounts = startCounts.concat({
			name: "start_" + i,
			type: "USHORT",
			value: segment.start
		});
		idDeltas = idDeltas.concat({
			name: "idDelta_" + i,
			type: "SHORT",
			value: segment.delta
		});
		idRangeOffsets = idRangeOffsets.concat({
			name: "idRangeOffset_" + i,
			type: "USHORT",
			value: segment.offset
		});
		if (segment.glyphId !== void 0) glyphIds = glyphIds.concat({
			name: "glyph_" + i,
			type: "USHORT",
			value: segment.glyphId
		});
	}
	t.fields = t.fields.concat(endCounts);
	t.fields.push({
		name: "reservedPad",
		type: "USHORT",
		value: 0
	});
	t.fields = t.fields.concat(startCounts);
	t.fields = t.fields.concat(idDeltas);
	t.fields = t.fields.concat(idRangeOffsets);
	t.fields = t.fields.concat(glyphIds);
	t.length = 14 + endCounts.length * 2 + 2 + startCounts.length * 2 + idDeltas.length * 2 + idRangeOffsets.length * 2 + glyphIds.length * 2;
	return t;
}
var cmap_default = {
	parse: parseCmapTable,
	make: makeCmapTable
};
//#endregion
//#region node_modules/opentype.js/src/encoding.js
var cffStandardStrings = [
	".notdef",
	"space",
	"exclam",
	"quotedbl",
	"numbersign",
	"dollar",
	"percent",
	"ampersand",
	"quoteright",
	"parenleft",
	"parenright",
	"asterisk",
	"plus",
	"comma",
	"hyphen",
	"period",
	"slash",
	"zero",
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
	"colon",
	"semicolon",
	"less",
	"equal",
	"greater",
	"question",
	"at",
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
	"bracketleft",
	"backslash",
	"bracketright",
	"asciicircum",
	"underscore",
	"quoteleft",
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
	"braceleft",
	"bar",
	"braceright",
	"asciitilde",
	"exclamdown",
	"cent",
	"sterling",
	"fraction",
	"yen",
	"florin",
	"section",
	"currency",
	"quotesingle",
	"quotedblleft",
	"guillemotleft",
	"guilsinglleft",
	"guilsinglright",
	"fi",
	"fl",
	"endash",
	"dagger",
	"daggerdbl",
	"periodcentered",
	"paragraph",
	"bullet",
	"quotesinglbase",
	"quotedblbase",
	"quotedblright",
	"guillemotright",
	"ellipsis",
	"perthousand",
	"questiondown",
	"grave",
	"acute",
	"circumflex",
	"tilde",
	"macron",
	"breve",
	"dotaccent",
	"dieresis",
	"ring",
	"cedilla",
	"hungarumlaut",
	"ogonek",
	"caron",
	"emdash",
	"AE",
	"ordfeminine",
	"Lslash",
	"Oslash",
	"OE",
	"ordmasculine",
	"ae",
	"dotlessi",
	"lslash",
	"oslash",
	"oe",
	"germandbls",
	"onesuperior",
	"logicalnot",
	"mu",
	"trademark",
	"Eth",
	"onehalf",
	"plusminus",
	"Thorn",
	"onequarter",
	"divide",
	"brokenbar",
	"degree",
	"thorn",
	"threequarters",
	"twosuperior",
	"registered",
	"minus",
	"eth",
	"multiply",
	"threesuperior",
	"copyright",
	"Aacute",
	"Acircumflex",
	"Adieresis",
	"Agrave",
	"Aring",
	"Atilde",
	"Ccedilla",
	"Eacute",
	"Ecircumflex",
	"Edieresis",
	"Egrave",
	"Iacute",
	"Icircumflex",
	"Idieresis",
	"Igrave",
	"Ntilde",
	"Oacute",
	"Ocircumflex",
	"Odieresis",
	"Ograve",
	"Otilde",
	"Scaron",
	"Uacute",
	"Ucircumflex",
	"Udieresis",
	"Ugrave",
	"Yacute",
	"Ydieresis",
	"Zcaron",
	"aacute",
	"acircumflex",
	"adieresis",
	"agrave",
	"aring",
	"atilde",
	"ccedilla",
	"eacute",
	"ecircumflex",
	"edieresis",
	"egrave",
	"iacute",
	"icircumflex",
	"idieresis",
	"igrave",
	"ntilde",
	"oacute",
	"ocircumflex",
	"odieresis",
	"ograve",
	"otilde",
	"scaron",
	"uacute",
	"ucircumflex",
	"udieresis",
	"ugrave",
	"yacute",
	"ydieresis",
	"zcaron",
	"exclamsmall",
	"Hungarumlautsmall",
	"dollaroldstyle",
	"dollarsuperior",
	"ampersandsmall",
	"Acutesmall",
	"parenleftsuperior",
	"parenrightsuperior",
	"266 ff",
	"onedotenleader",
	"zerooldstyle",
	"oneoldstyle",
	"twooldstyle",
	"threeoldstyle",
	"fouroldstyle",
	"fiveoldstyle",
	"sixoldstyle",
	"sevenoldstyle",
	"eightoldstyle",
	"nineoldstyle",
	"commasuperior",
	"threequartersemdash",
	"periodsuperior",
	"questionsmall",
	"asuperior",
	"bsuperior",
	"centsuperior",
	"dsuperior",
	"esuperior",
	"isuperior",
	"lsuperior",
	"msuperior",
	"nsuperior",
	"osuperior",
	"rsuperior",
	"ssuperior",
	"tsuperior",
	"ff",
	"ffi",
	"ffl",
	"parenleftinferior",
	"parenrightinferior",
	"Circumflexsmall",
	"hyphensuperior",
	"Gravesmall",
	"Asmall",
	"Bsmall",
	"Csmall",
	"Dsmall",
	"Esmall",
	"Fsmall",
	"Gsmall",
	"Hsmall",
	"Ismall",
	"Jsmall",
	"Ksmall",
	"Lsmall",
	"Msmall",
	"Nsmall",
	"Osmall",
	"Psmall",
	"Qsmall",
	"Rsmall",
	"Ssmall",
	"Tsmall",
	"Usmall",
	"Vsmall",
	"Wsmall",
	"Xsmall",
	"Ysmall",
	"Zsmall",
	"colonmonetary",
	"onefitted",
	"rupiah",
	"Tildesmall",
	"exclamdownsmall",
	"centoldstyle",
	"Lslashsmall",
	"Scaronsmall",
	"Zcaronsmall",
	"Dieresissmall",
	"Brevesmall",
	"Caronsmall",
	"Dotaccentsmall",
	"Macronsmall",
	"figuredash",
	"hypheninferior",
	"Ogoneksmall",
	"Ringsmall",
	"Cedillasmall",
	"questiondownsmall",
	"oneeighth",
	"threeeighths",
	"fiveeighths",
	"seveneighths",
	"onethird",
	"twothirds",
	"zerosuperior",
	"foursuperior",
	"fivesuperior",
	"sixsuperior",
	"sevensuperior",
	"eightsuperior",
	"ninesuperior",
	"zeroinferior",
	"oneinferior",
	"twoinferior",
	"threeinferior",
	"fourinferior",
	"fiveinferior",
	"sixinferior",
	"seveninferior",
	"eightinferior",
	"nineinferior",
	"centinferior",
	"dollarinferior",
	"periodinferior",
	"commainferior",
	"Agravesmall",
	"Aacutesmall",
	"Acircumflexsmall",
	"Atildesmall",
	"Adieresissmall",
	"Aringsmall",
	"AEsmall",
	"Ccedillasmall",
	"Egravesmall",
	"Eacutesmall",
	"Ecircumflexsmall",
	"Edieresissmall",
	"Igravesmall",
	"Iacutesmall",
	"Icircumflexsmall",
	"Idieresissmall",
	"Ethsmall",
	"Ntildesmall",
	"Ogravesmall",
	"Oacutesmall",
	"Ocircumflexsmall",
	"Otildesmall",
	"Odieresissmall",
	"OEsmall",
	"Oslashsmall",
	"Ugravesmall",
	"Uacutesmall",
	"Ucircumflexsmall",
	"Udieresissmall",
	"Yacutesmall",
	"Thornsmall",
	"Ydieresissmall",
	"001.000",
	"001.001",
	"001.002",
	"001.003",
	"Black",
	"Bold",
	"Book",
	"Light",
	"Medium",
	"Regular",
	"Roman",
	"Semibold"
];
var cffStandardEncoding = [
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"space",
	"exclam",
	"quotedbl",
	"numbersign",
	"dollar",
	"percent",
	"ampersand",
	"quoteright",
	"parenleft",
	"parenright",
	"asterisk",
	"plus",
	"comma",
	"hyphen",
	"period",
	"slash",
	"zero",
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
	"colon",
	"semicolon",
	"less",
	"equal",
	"greater",
	"question",
	"at",
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
	"bracketleft",
	"backslash",
	"bracketright",
	"asciicircum",
	"underscore",
	"quoteleft",
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
	"braceleft",
	"bar",
	"braceright",
	"asciitilde",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"exclamdown",
	"cent",
	"sterling",
	"fraction",
	"yen",
	"florin",
	"section",
	"currency",
	"quotesingle",
	"quotedblleft",
	"guillemotleft",
	"guilsinglleft",
	"guilsinglright",
	"fi",
	"fl",
	"",
	"endash",
	"dagger",
	"daggerdbl",
	"periodcentered",
	"",
	"paragraph",
	"bullet",
	"quotesinglbase",
	"quotedblbase",
	"quotedblright",
	"guillemotright",
	"ellipsis",
	"perthousand",
	"",
	"questiondown",
	"",
	"grave",
	"acute",
	"circumflex",
	"tilde",
	"macron",
	"breve",
	"dotaccent",
	"dieresis",
	"",
	"ring",
	"cedilla",
	"",
	"hungarumlaut",
	"ogonek",
	"caron",
	"emdash",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"AE",
	"",
	"ordfeminine",
	"",
	"",
	"",
	"",
	"Lslash",
	"Oslash",
	"OE",
	"ordmasculine",
	"",
	"",
	"",
	"",
	"",
	"ae",
	"",
	"",
	"",
	"dotlessi",
	"",
	"",
	"lslash",
	"oslash",
	"oe",
	"germandbls"
];
var cffExpertEncoding = [
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"space",
	"exclamsmall",
	"Hungarumlautsmall",
	"",
	"dollaroldstyle",
	"dollarsuperior",
	"ampersandsmall",
	"Acutesmall",
	"parenleftsuperior",
	"parenrightsuperior",
	"twodotenleader",
	"onedotenleader",
	"comma",
	"hyphen",
	"period",
	"fraction",
	"zerooldstyle",
	"oneoldstyle",
	"twooldstyle",
	"threeoldstyle",
	"fouroldstyle",
	"fiveoldstyle",
	"sixoldstyle",
	"sevenoldstyle",
	"eightoldstyle",
	"nineoldstyle",
	"colon",
	"semicolon",
	"commasuperior",
	"threequartersemdash",
	"periodsuperior",
	"questionsmall",
	"",
	"asuperior",
	"bsuperior",
	"centsuperior",
	"dsuperior",
	"esuperior",
	"",
	"",
	"isuperior",
	"",
	"",
	"lsuperior",
	"msuperior",
	"nsuperior",
	"osuperior",
	"",
	"",
	"rsuperior",
	"ssuperior",
	"tsuperior",
	"",
	"ff",
	"fi",
	"fl",
	"ffi",
	"ffl",
	"parenleftinferior",
	"",
	"parenrightinferior",
	"Circumflexsmall",
	"hyphensuperior",
	"Gravesmall",
	"Asmall",
	"Bsmall",
	"Csmall",
	"Dsmall",
	"Esmall",
	"Fsmall",
	"Gsmall",
	"Hsmall",
	"Ismall",
	"Jsmall",
	"Ksmall",
	"Lsmall",
	"Msmall",
	"Nsmall",
	"Osmall",
	"Psmall",
	"Qsmall",
	"Rsmall",
	"Ssmall",
	"Tsmall",
	"Usmall",
	"Vsmall",
	"Wsmall",
	"Xsmall",
	"Ysmall",
	"Zsmall",
	"colonmonetary",
	"onefitted",
	"rupiah",
	"Tildesmall",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"exclamdownsmall",
	"centoldstyle",
	"Lslashsmall",
	"",
	"",
	"Scaronsmall",
	"Zcaronsmall",
	"Dieresissmall",
	"Brevesmall",
	"Caronsmall",
	"",
	"Dotaccentsmall",
	"",
	"",
	"Macronsmall",
	"",
	"",
	"figuredash",
	"hypheninferior",
	"",
	"",
	"Ogoneksmall",
	"Ringsmall",
	"Cedillasmall",
	"",
	"",
	"",
	"onequarter",
	"onehalf",
	"threequarters",
	"questiondownsmall",
	"oneeighth",
	"threeeighths",
	"fiveeighths",
	"seveneighths",
	"onethird",
	"twothirds",
	"",
	"",
	"zerosuperior",
	"onesuperior",
	"twosuperior",
	"threesuperior",
	"foursuperior",
	"fivesuperior",
	"sixsuperior",
	"sevensuperior",
	"eightsuperior",
	"ninesuperior",
	"zeroinferior",
	"oneinferior",
	"twoinferior",
	"threeinferior",
	"fourinferior",
	"fiveinferior",
	"sixinferior",
	"seveninferior",
	"eightinferior",
	"nineinferior",
	"centinferior",
	"dollarinferior",
	"periodinferior",
	"commainferior",
	"Agravesmall",
	"Aacutesmall",
	"Acircumflexsmall",
	"Atildesmall",
	"Adieresissmall",
	"Aringsmall",
	"AEsmall",
	"Ccedillasmall",
	"Egravesmall",
	"Eacutesmall",
	"Ecircumflexsmall",
	"Edieresissmall",
	"Igravesmall",
	"Iacutesmall",
	"Icircumflexsmall",
	"Idieresissmall",
	"Ethsmall",
	"Ntildesmall",
	"Ogravesmall",
	"Oacutesmall",
	"Ocircumflexsmall",
	"Otildesmall",
	"Odieresissmall",
	"OEsmall",
	"Oslashsmall",
	"Ugravesmall",
	"Uacutesmall",
	"Ucircumflexsmall",
	"Udieresissmall",
	"Yacutesmall",
	"Thornsmall",
	"Ydieresissmall"
];
var standardNames = [
	".notdef",
	".null",
	"nonmarkingreturn",
	"space",
	"exclam",
	"quotedbl",
	"numbersign",
	"dollar",
	"percent",
	"ampersand",
	"quotesingle",
	"parenleft",
	"parenright",
	"asterisk",
	"plus",
	"comma",
	"hyphen",
	"period",
	"slash",
	"zero",
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
	"colon",
	"semicolon",
	"less",
	"equal",
	"greater",
	"question",
	"at",
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
	"bracketleft",
	"backslash",
	"bracketright",
	"asciicircum",
	"underscore",
	"grave",
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
	"braceleft",
	"bar",
	"braceright",
	"asciitilde",
	"Adieresis",
	"Aring",
	"Ccedilla",
	"Eacute",
	"Ntilde",
	"Odieresis",
	"Udieresis",
	"aacute",
	"agrave",
	"acircumflex",
	"adieresis",
	"atilde",
	"aring",
	"ccedilla",
	"eacute",
	"egrave",
	"ecircumflex",
	"edieresis",
	"iacute",
	"igrave",
	"icircumflex",
	"idieresis",
	"ntilde",
	"oacute",
	"ograve",
	"ocircumflex",
	"odieresis",
	"otilde",
	"uacute",
	"ugrave",
	"ucircumflex",
	"udieresis",
	"dagger",
	"degree",
	"cent",
	"sterling",
	"section",
	"bullet",
	"paragraph",
	"germandbls",
	"registered",
	"copyright",
	"trademark",
	"acute",
	"dieresis",
	"notequal",
	"AE",
	"Oslash",
	"infinity",
	"plusminus",
	"lessequal",
	"greaterequal",
	"yen",
	"mu",
	"partialdiff",
	"summation",
	"product",
	"pi",
	"integral",
	"ordfeminine",
	"ordmasculine",
	"Omega",
	"ae",
	"oslash",
	"questiondown",
	"exclamdown",
	"logicalnot",
	"radical",
	"florin",
	"approxequal",
	"Delta",
	"guillemotleft",
	"guillemotright",
	"ellipsis",
	"nonbreakingspace",
	"Agrave",
	"Atilde",
	"Otilde",
	"OE",
	"oe",
	"endash",
	"emdash",
	"quotedblleft",
	"quotedblright",
	"quoteleft",
	"quoteright",
	"divide",
	"lozenge",
	"ydieresis",
	"Ydieresis",
	"fraction",
	"currency",
	"guilsinglleft",
	"guilsinglright",
	"fi",
	"fl",
	"daggerdbl",
	"periodcentered",
	"quotesinglbase",
	"quotedblbase",
	"perthousand",
	"Acircumflex",
	"Ecircumflex",
	"Aacute",
	"Edieresis",
	"Egrave",
	"Iacute",
	"Icircumflex",
	"Idieresis",
	"Igrave",
	"Oacute",
	"Ocircumflex",
	"apple",
	"Ograve",
	"Uacute",
	"Ucircumflex",
	"Ugrave",
	"dotlessi",
	"circumflex",
	"tilde",
	"macron",
	"breve",
	"dotaccent",
	"ring",
	"cedilla",
	"hungarumlaut",
	"ogonek",
	"caron",
	"Lslash",
	"lslash",
	"Scaron",
	"scaron",
	"Zcaron",
	"zcaron",
	"brokenbar",
	"Eth",
	"eth",
	"Yacute",
	"yacute",
	"Thorn",
	"thorn",
	"minus",
	"multiply",
	"onesuperior",
	"twosuperior",
	"threesuperior",
	"onehalf",
	"onequarter",
	"threequarters",
	"franc",
	"Gbreve",
	"gbreve",
	"Idotaccent",
	"Scedilla",
	"scedilla",
	"Cacute",
	"cacute",
	"Ccaron",
	"ccaron",
	"dcroat"
];
/**
* This is the encoding used for fonts created from scratch.
* It loops through all glyphs and finds the appropriate unicode value.
* Since it's linear time, other encodings will be faster.
* @exports opentype.DefaultEncoding
* @class
* @constructor
* @param {opentype.Font}
*/
function DefaultEncoding(font) {
	this.font = font;
}
DefaultEncoding.prototype.charToGlyphIndex = function(c) {
	const code = c.charCodeAt(0);
	const glyphs = this.font.glyphs;
	if (glyphs) for (let i = 0; i < glyphs.length; i += 1) {
		const glyph = glyphs.get(i);
		for (let j = 0; j < glyph.unicodes.length; j += 1) if (glyph.unicodes[j] === code) return i;
	}
	return null;
};
/**
* @exports opentype.CmapEncoding
* @class
* @constructor
* @param {Object} cmap - a object with the cmap encoded data
*/
function CmapEncoding(cmap) {
	this.cmap = cmap;
}
/**
* @param  {string} c - the character
* @return {number} The glyph index.
*/
CmapEncoding.prototype.charToGlyphIndex = function(c) {
	return this.cmap.glyphIndexMap[c.charCodeAt(0)] || 0;
};
/**
* @exports opentype.CffEncoding
* @class
* @constructor
* @param {string} encoding - The encoding
* @param {Array} charset - The character set.
*/
function CffEncoding(encoding, charset) {
	this.encoding = encoding;
	this.charset = charset;
}
/**
* @param  {string} s - The character
* @return {number} The index.
*/
CffEncoding.prototype.charToGlyphIndex = function(s) {
	const code = s.charCodeAt(0);
	const charName = this.encoding[code];
	return this.charset.indexOf(charName);
};
/**
* @exports opentype.GlyphNames
* @class
* @constructor
* @param {Object} post
*/
function GlyphNames(post) {
	switch (post.version) {
		case 1:
			this.names = standardNames.slice();
			break;
		case 2:
			this.names = new Array(post.numberOfGlyphs);
			for (let i = 0; i < post.numberOfGlyphs; i++) if (post.glyphNameIndex[i] < standardNames.length) this.names[i] = standardNames[post.glyphNameIndex[i]];
			else this.names[i] = post.names[post.glyphNameIndex[i] - standardNames.length];
			break;
		case 2.5:
			this.names = new Array(post.numberOfGlyphs);
			for (let i = 0; i < post.numberOfGlyphs; i++) this.names[i] = standardNames[i + post.glyphNameIndex[i]];
			break;
		case 3:
			this.names = [];
			break;
		default:
			this.names = [];
			break;
	}
}
/**
* Gets the index of a glyph by name.
* @param  {string} name - The glyph name
* @return {number} The index
*/
GlyphNames.prototype.nameToGlyphIndex = function(name) {
	return this.names.indexOf(name);
};
/**
* @param  {number} gid
* @return {string}
*/
GlyphNames.prototype.glyphIndexToName = function(gid) {
	return this.names[gid];
};
/**
* @alias opentype.addGlyphNames
* @param {opentype.Font}
*/
function addGlyphNames(font) {
	let glyph;
	const glyphIndexMap = font.tables.cmap.glyphIndexMap;
	const charCodes = Object.keys(glyphIndexMap);
	for (let i = 0; i < charCodes.length; i += 1) {
		const c = charCodes[i];
		const glyphIndex = glyphIndexMap[c];
		glyph = font.glyphs.get(glyphIndex);
		glyph.addUnicode(parseInt(c));
	}
	for (let i = 0; i < font.glyphs.length; i += 1) {
		glyph = font.glyphs.get(i);
		if (font.cffEncoding) if (font.isCIDFont) glyph.name = "gid" + i;
		else glyph.name = font.cffEncoding.charset[i];
		else if (font.glyphNames.names) glyph.name = font.glyphNames.glyphIndexToName(i);
	}
}
//#endregion
//#region node_modules/opentype.js/src/draw.js
function line(ctx, x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}
var draw_default = { line };
//#endregion
//#region node_modules/opentype.js/src/tables/glyf.js
function parseGlyphCoordinate(p, flag, previousValue, shortVectorBitMask, sameBitMask) {
	let v;
	if ((flag & shortVectorBitMask) > 0) {
		v = p.parseByte();
		if ((flag & sameBitMask) === 0) v = -v;
		v = previousValue + v;
	} else if ((flag & sameBitMask) > 0) v = previousValue;
	else v = previousValue + p.parseShort();
	return v;
}
function parseGlyph(glyph, data, start) {
	const p = new parse_default.Parser(data, start);
	glyph.numberOfContours = p.parseShort();
	glyph._xMin = p.parseShort();
	glyph._yMin = p.parseShort();
	glyph._xMax = p.parseShort();
	glyph._yMax = p.parseShort();
	let flags;
	let flag;
	if (glyph.numberOfContours > 0) {
		const endPointIndices = glyph.endPointIndices = [];
		for (let i = 0; i < glyph.numberOfContours; i += 1) endPointIndices.push(p.parseUShort());
		glyph.instructionLength = p.parseUShort();
		glyph.instructions = [];
		for (let i = 0; i < glyph.instructionLength; i += 1) glyph.instructions.push(p.parseByte());
		const numberOfCoordinates = endPointIndices[endPointIndices.length - 1] + 1;
		flags = [];
		for (let i = 0; i < numberOfCoordinates; i += 1) {
			flag = p.parseByte();
			flags.push(flag);
			if ((flag & 8) > 0) {
				const repeatCount = p.parseByte();
				for (let j = 0; j < repeatCount; j += 1) {
					flags.push(flag);
					i += 1;
				}
			}
		}
		check_default.argument(flags.length === numberOfCoordinates, "Bad flags.");
		if (endPointIndices.length > 0) {
			const points = [];
			let point;
			if (numberOfCoordinates > 0) {
				for (let i = 0; i < numberOfCoordinates; i += 1) {
					flag = flags[i];
					point = {};
					point.onCurve = !!(flag & 1);
					point.lastPointOfContour = endPointIndices.indexOf(i) >= 0;
					points.push(point);
				}
				let px = 0;
				for (let i = 0; i < numberOfCoordinates; i += 1) {
					flag = flags[i];
					point = points[i];
					point.x = parseGlyphCoordinate(p, flag, px, 2, 16);
					px = point.x;
				}
				let py = 0;
				for (let i = 0; i < numberOfCoordinates; i += 1) {
					flag = flags[i];
					point = points[i];
					point.y = parseGlyphCoordinate(p, flag, py, 4, 32);
					py = point.y;
				}
			}
			glyph.points = points;
		} else glyph.points = [];
	} else if (glyph.numberOfContours === 0) glyph.points = [];
	else {
		glyph.isComposite = true;
		glyph.points = [];
		glyph.components = [];
		let moreComponents = true;
		while (moreComponents) {
			flags = p.parseUShort();
			const component = {
				glyphIndex: p.parseUShort(),
				xScale: 1,
				scale01: 0,
				scale10: 0,
				yScale: 1,
				dx: 0,
				dy: 0
			};
			if ((flags & 1) > 0) if ((flags & 2) > 0) {
				component.dx = p.parseShort();
				component.dy = p.parseShort();
			} else component.matchedPoints = [p.parseUShort(), p.parseUShort()];
			else if ((flags & 2) > 0) {
				component.dx = p.parseChar();
				component.dy = p.parseChar();
			} else component.matchedPoints = [p.parseByte(), p.parseByte()];
			if ((flags & 8) > 0) component.xScale = component.yScale = p.parseF2Dot14();
			else if ((flags & 64) > 0) {
				component.xScale = p.parseF2Dot14();
				component.yScale = p.parseF2Dot14();
			} else if ((flags & 128) > 0) {
				component.xScale = p.parseF2Dot14();
				component.scale01 = p.parseF2Dot14();
				component.scale10 = p.parseF2Dot14();
				component.yScale = p.parseF2Dot14();
			}
			glyph.components.push(component);
			moreComponents = !!(flags & 32);
		}
		if (flags & 256) {
			glyph.instructionLength = p.parseUShort();
			glyph.instructions = [];
			for (let i = 0; i < glyph.instructionLength; i += 1) glyph.instructions.push(p.parseByte());
		}
	}
}
function transformPoints(points, transform) {
	const newPoints = [];
	for (let i = 0; i < points.length; i += 1) {
		const pt = points[i];
		const newPt = {
			x: transform.xScale * pt.x + transform.scale01 * pt.y + transform.dx,
			y: transform.scale10 * pt.x + transform.yScale * pt.y + transform.dy,
			onCurve: pt.onCurve,
			lastPointOfContour: pt.lastPointOfContour
		};
		newPoints.push(newPt);
	}
	return newPoints;
}
function getContours(points) {
	const contours = [];
	let currentContour = [];
	for (let i = 0; i < points.length; i += 1) {
		const pt = points[i];
		currentContour.push(pt);
		if (pt.lastPointOfContour) {
			contours.push(currentContour);
			currentContour = [];
		}
	}
	check_default.argument(currentContour.length === 0, "There are still points left in the current contour.");
	return contours;
}
function getPath(points) {
	const p = new Path();
	if (!points) return p;
	const contours = getContours(points);
	for (let contourIndex = 0; contourIndex < contours.length; ++contourIndex) {
		const contour = contours[contourIndex];
		let prev = null;
		let curr = contour[contour.length - 1];
		let next = contour[0];
		if (curr.onCurve) p.moveTo(curr.x, curr.y);
		else if (next.onCurve) p.moveTo(next.x, next.y);
		else {
			const start = {
				x: (curr.x + next.x) * .5,
				y: (curr.y + next.y) * .5
			};
			p.moveTo(start.x, start.y);
		}
		for (let i = 0; i < contour.length; ++i) {
			prev = curr;
			curr = next;
			next = contour[(i + 1) % contour.length];
			if (curr.onCurve) p.lineTo(curr.x, curr.y);
			else {
				let prev2 = prev;
				let next2 = next;
				if (!prev.onCurve) {
					prev2 = {
						x: (curr.x + prev.x) * .5,
						y: (curr.y + prev.y) * .5
					};
					p.lineTo(prev2.x, prev2.y);
				}
				if (!next.onCurve) next2 = {
					x: (curr.x + next.x) * .5,
					y: (curr.y + next.y) * .5
				};
				p.lineTo(prev2.x, prev2.y);
				p.quadraticCurveTo(curr.x, curr.y, next2.x, next2.y);
			}
		}
		p.closePath();
	}
	return p;
}
function buildPath(glyphs, glyph) {
	if (glyph.isComposite) for (let j = 0; j < glyph.components.length; j += 1) {
		const component = glyph.components[j];
		const componentGlyph = glyphs.get(component.glyphIndex);
		componentGlyph.getPath();
		if (componentGlyph.points) {
			let transformedPoints;
			if (component.matchedPoints === void 0) transformedPoints = transformPoints(componentGlyph.points, component);
			else {
				if (component.matchedPoints[0] > glyph.points.length - 1 || component.matchedPoints[1] > componentGlyph.points.length - 1) throw Error("Matched points out of range in " + glyph.name);
				const firstPt = glyph.points[component.matchedPoints[0]];
				let secondPt = componentGlyph.points[component.matchedPoints[1]];
				const transform = {
					xScale: component.xScale,
					scale01: component.scale01,
					scale10: component.scale10,
					yScale: component.yScale,
					dx: 0,
					dy: 0
				};
				secondPt = transformPoints([secondPt], transform)[0];
				transform.dx = firstPt.x - secondPt.x;
				transform.dy = firstPt.y - secondPt.y;
				transformedPoints = transformPoints(componentGlyph.points, transform);
			}
			glyph.points = glyph.points.concat(transformedPoints);
		}
	}
	return getPath(glyph.points);
}
function parseGlyfTable(data, start, loca, font) {
	const glyphs = new glyphset_default.GlyphSet(font);
	for (let i = 0; i < loca.length - 1; i += 1) {
		const offset = loca[i];
		if (offset !== loca[i + 1]) glyphs.push(i, glyphset_default.ttfGlyphLoader(font, i, parseGlyph, data, start + offset, buildPath));
		else glyphs.push(i, glyphset_default.glyphLoader(font, i));
	}
	return glyphs;
}
var glyf_default = {
	getPath,
	parse: parseGlyfTable
};
//#endregion
//#region node_modules/opentype.js/src/glyph.js
function getPathDefinition(glyph, path) {
	let _path = path || { commands: [] };
	return {
		configurable: true,
		get: function() {
			if (typeof _path === "function") _path = _path();
			return _path;
		},
		set: function(p) {
			_path = p;
		}
	};
}
/**
* @typedef GlyphOptions
* @type Object
* @property {string} [name] - The glyph name
* @property {number} [unicode]
* @property {Array} [unicodes]
* @property {number} [xMin]
* @property {number} [yMin]
* @property {number} [xMax]
* @property {number} [yMax]
* @property {number} [advanceWidth]
*/
/**
* @exports opentype.Glyph
* @class
* @param {GlyphOptions}
* @constructor
*/
function Glyph(options) {
	this.bindConstructorValues(options);
}
/**
* @param  {GlyphOptions}
*/
Glyph.prototype.bindConstructorValues = function(options) {
	this.index = options.index || 0;
	this.name = options.name || null;
	this.unicode = options.unicode || void 0;
	this.unicodes = options.unicodes || options.unicode !== void 0 ? [options.unicode] : [];
	if (options.xMin) this.xMin = options.xMin;
	if (options.yMin) this.yMin = options.yMin;
	if (options.xMax) this.xMax = options.xMax;
	if (options.yMax) this.yMax = options.yMax;
	if (options.advanceWidth) this.advanceWidth = options.advanceWidth;
	Object.defineProperty(this, "path", getPathDefinition(this, options.path));
};
/**
* @param {number}
*/
Glyph.prototype.addUnicode = function(unicode) {
	if (this.unicodes.length === 0) this.unicode = unicode;
	this.unicodes.push(unicode);
};
/**
* Calculate the minimum bounding box for this glyph.
* @return {opentype.BoundingBox}
*/
Glyph.prototype.getBoundingBox = function() {
	return this.path.getBoundingBox();
};
/**
* Convert the glyph to a Path we can draw on a drawing context.
* @param  {number} [x=0] - Horizontal position of the beginning of the text.
* @param  {number} [y=0] - Vertical position of the *baseline* of the text.
* @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
* @param  {Object=} options - xScale, yScale to stretch the glyph.
* @param  {opentype.Font} if hinting is to be used, the font
* @return {opentype.Path}
*/
Glyph.prototype.getPath = function(x, y, fontSize, options, font) {
	x = x !== void 0 ? x : 0;
	y = y !== void 0 ? y : 0;
	fontSize = fontSize !== void 0 ? fontSize : 72;
	let commands;
	let hPoints;
	if (!options) options = {};
	let xScale = options.xScale;
	let yScale = options.yScale;
	if (options.hinting && font && font.hinting) hPoints = this.path && font.hinting.exec(this, fontSize);
	if (hPoints) {
		commands = glyf_default.getPath(hPoints).commands;
		x = Math.round(x);
		y = Math.round(y);
		xScale = yScale = 1;
	} else {
		commands = this.path.commands;
		const scale = 1 / this.path.unitsPerEm * fontSize;
		if (xScale === void 0) xScale = scale;
		if (yScale === void 0) yScale = scale;
	}
	const p = new Path();
	for (let i = 0; i < commands.length; i += 1) {
		const cmd = commands[i];
		if (cmd.type === "M") p.moveTo(x + cmd.x * xScale, y + -cmd.y * yScale);
		else if (cmd.type === "L") p.lineTo(x + cmd.x * xScale, y + -cmd.y * yScale);
		else if (cmd.type === "Q") p.quadraticCurveTo(x + cmd.x1 * xScale, y + -cmd.y1 * yScale, x + cmd.x * xScale, y + -cmd.y * yScale);
		else if (cmd.type === "C") p.curveTo(x + cmd.x1 * xScale, y + -cmd.y1 * yScale, x + cmd.x2 * xScale, y + -cmd.y2 * yScale, x + cmd.x * xScale, y + -cmd.y * yScale);
		else if (cmd.type === "Z") p.closePath();
	}
	return p;
};
/**
* Split the glyph into contours.
* This function is here for backwards compatibility, and to
* provide raw access to the TrueType glyph outlines.
* @return {Array}
*/
Glyph.prototype.getContours = function() {
	if (this.points === void 0) return [];
	const contours = [];
	let currentContour = [];
	for (let i = 0; i < this.points.length; i += 1) {
		const pt = this.points[i];
		currentContour.push(pt);
		if (pt.lastPointOfContour) {
			contours.push(currentContour);
			currentContour = [];
		}
	}
	check_default.argument(currentContour.length === 0, "There are still points left in the current contour.");
	return contours;
};
/**
* Calculate the xMin/yMin/xMax/yMax/lsb/rsb for a Glyph.
* @return {Object}
*/
Glyph.prototype.getMetrics = function() {
	const commands = this.path.commands;
	const xCoords = [];
	const yCoords = [];
	for (let i = 0; i < commands.length; i += 1) {
		const cmd = commands[i];
		if (cmd.type !== "Z") {
			xCoords.push(cmd.x);
			yCoords.push(cmd.y);
		}
		if (cmd.type === "Q" || cmd.type === "C") {
			xCoords.push(cmd.x1);
			yCoords.push(cmd.y1);
		}
		if (cmd.type === "C") {
			xCoords.push(cmd.x2);
			yCoords.push(cmd.y2);
		}
	}
	const metrics = {
		xMin: Math.min.apply(null, xCoords),
		yMin: Math.min.apply(null, yCoords),
		xMax: Math.max.apply(null, xCoords),
		yMax: Math.max.apply(null, yCoords),
		leftSideBearing: this.leftSideBearing
	};
	if (!isFinite(metrics.xMin)) metrics.xMin = 0;
	if (!isFinite(metrics.xMax)) metrics.xMax = this.advanceWidth;
	if (!isFinite(metrics.yMin)) metrics.yMin = 0;
	if (!isFinite(metrics.yMax)) metrics.yMax = 0;
	metrics.rightSideBearing = this.advanceWidth - metrics.leftSideBearing - (metrics.xMax - metrics.xMin);
	return metrics;
};
/**
* Draw the glyph on the given context.
* @param  {CanvasRenderingContext2D} ctx - A 2D drawing context, like Canvas.
* @param  {number} [x=0] - Horizontal position of the beginning of the text.
* @param  {number} [y=0] - Vertical position of the *baseline* of the text.
* @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
* @param  {Object=} options - xScale, yScale to stretch the glyph.
*/
Glyph.prototype.draw = function(ctx, x, y, fontSize, options) {
	this.getPath(x, y, fontSize, options).draw(ctx);
};
/**
* Draw the points of the glyph.
* On-curve points will be drawn in blue, off-curve points will be drawn in red.
* @param  {CanvasRenderingContext2D} ctx - A 2D drawing context, like Canvas.
* @param  {number} [x=0] - Horizontal position of the beginning of the text.
* @param  {number} [y=0] - Vertical position of the *baseline* of the text.
* @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
*/
Glyph.prototype.drawPoints = function(ctx, x, y, fontSize) {
	function drawCircles(l, x, y, scale) {
		const PI_SQ = Math.PI * 2;
		ctx.beginPath();
		for (let j = 0; j < l.length; j += 1) {
			ctx.moveTo(x + l[j].x * scale, y + l[j].y * scale);
			ctx.arc(x + l[j].x * scale, y + l[j].y * scale, 2, 0, PI_SQ, false);
		}
		ctx.closePath();
		ctx.fill();
	}
	x = x !== void 0 ? x : 0;
	y = y !== void 0 ? y : 0;
	fontSize = fontSize !== void 0 ? fontSize : 24;
	const scale = 1 / this.path.unitsPerEm * fontSize;
	const blueCircles = [];
	const redCircles = [];
	const path = this.path;
	for (let i = 0; i < path.commands.length; i += 1) {
		const cmd = path.commands[i];
		if (cmd.x !== void 0) blueCircles.push({
			x: cmd.x,
			y: -cmd.y
		});
		if (cmd.x1 !== void 0) redCircles.push({
			x: cmd.x1,
			y: -cmd.y1
		});
		if (cmd.x2 !== void 0) redCircles.push({
			x: cmd.x2,
			y: -cmd.y2
		});
	}
	ctx.fillStyle = "blue";
	drawCircles(blueCircles, x, y, scale);
	ctx.fillStyle = "red";
	drawCircles(redCircles, x, y, scale);
};
/**
* Draw lines indicating important font measurements.
* Black lines indicate the origin of the coordinate system (point 0,0).
* Blue lines indicate the glyph bounding box.
* Green line indicates the advance width of the glyph.
* @param  {CanvasRenderingContext2D} ctx - A 2D drawing context, like Canvas.
* @param  {number} [x=0] - Horizontal position of the beginning of the text.
* @param  {number} [y=0] - Vertical position of the *baseline* of the text.
* @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
*/
Glyph.prototype.drawMetrics = function(ctx, x, y, fontSize) {
	let scale;
	x = x !== void 0 ? x : 0;
	y = y !== void 0 ? y : 0;
	fontSize = fontSize !== void 0 ? fontSize : 24;
	scale = 1 / this.path.unitsPerEm * fontSize;
	ctx.lineWidth = 1;
	ctx.strokeStyle = "black";
	draw_default.line(ctx, x, -1e4, x, 1e4);
	draw_default.line(ctx, -1e4, y, 1e4, y);
	const xMin = this.xMin || 0;
	let yMin = this.yMin || 0;
	const xMax = this.xMax || 0;
	let yMax = this.yMax || 0;
	const advanceWidth = this.advanceWidth || 0;
	ctx.strokeStyle = "blue";
	draw_default.line(ctx, x + xMin * scale, -1e4, x + xMin * scale, 1e4);
	draw_default.line(ctx, x + xMax * scale, -1e4, x + xMax * scale, 1e4);
	draw_default.line(ctx, -1e4, y + -yMin * scale, 1e4, y + -yMin * scale);
	draw_default.line(ctx, -1e4, y + -yMax * scale, 1e4, y + -yMax * scale);
	ctx.strokeStyle = "green";
	draw_default.line(ctx, x + advanceWidth * scale, -1e4, x + advanceWidth * scale, 1e4);
};
//#endregion
//#region node_modules/opentype.js/src/glyphset.js
function defineDependentProperty(glyph, externalName, internalName) {
	Object.defineProperty(glyph, externalName, {
		get: function() {
			glyph.path;
			return glyph[internalName];
		},
		set: function(newValue) {
			glyph[internalName] = newValue;
		},
		enumerable: true,
		configurable: true
	});
}
/**
* A GlyphSet represents all glyphs available in the font, but modelled using
* a deferred glyph loader, for retrieving glyphs only once they are absolutely
* necessary, to keep the memory footprint down.
* @exports opentype.GlyphSet
* @class
* @param {opentype.Font}
* @param {Array}
*/
function GlyphSet(font, glyphs) {
	this.font = font;
	this.glyphs = {};
	if (Array.isArray(glyphs)) for (let i = 0; i < glyphs.length; i++) this.glyphs[i] = glyphs[i];
	this.length = glyphs && glyphs.length || 0;
}
/**
* @param  {number} index
* @return {opentype.Glyph}
*/
GlyphSet.prototype.get = function(index) {
	if (typeof this.glyphs[index] === "function") this.glyphs[index] = this.glyphs[index]();
	return this.glyphs[index];
};
/**
* @param  {number} index
* @param  {Object}
*/
GlyphSet.prototype.push = function(index, loader) {
	this.glyphs[index] = loader;
	this.length++;
};
/**
* @alias opentype.glyphLoader
* @param  {opentype.Font} font
* @param  {number} index
* @return {opentype.Glyph}
*/
function glyphLoader(font, index) {
	return new Glyph({
		index,
		font
	});
}
/**
* Generate a stub glyph that can be filled with all metadata *except*
* the "points" and "path" properties, which must be loaded only once
* the glyph's path is actually requested for text shaping.
* @alias opentype.ttfGlyphLoader
* @param  {opentype.Font} font
* @param  {number} index
* @param  {Function} parseGlyph
* @param  {Object} data
* @param  {number} position
* @param  {Function} buildPath
* @return {opentype.Glyph}
*/
function ttfGlyphLoader(font, index, parseGlyph, data, position, buildPath) {
	return function() {
		const glyph = new Glyph({
			index,
			font
		});
		glyph.path = function() {
			parseGlyph(glyph, data, position);
			const path = buildPath(font.glyphs, glyph);
			path.unitsPerEm = font.unitsPerEm;
			return path;
		};
		defineDependentProperty(glyph, "xMin", "_xMin");
		defineDependentProperty(glyph, "xMax", "_xMax");
		defineDependentProperty(glyph, "yMin", "_yMin");
		defineDependentProperty(glyph, "yMax", "_yMax");
		return glyph;
	};
}
/**
* @alias opentype.cffGlyphLoader
* @param  {opentype.Font} font
* @param  {number} index
* @param  {Function} parseCFFCharstring
* @param  {string} charstring
* @return {opentype.Glyph}
*/
function cffGlyphLoader(font, index, parseCFFCharstring, charstring) {
	return function() {
		const glyph = new Glyph({
			index,
			font
		});
		glyph.path = function() {
			const path = parseCFFCharstring(font, glyph, charstring);
			path.unitsPerEm = font.unitsPerEm;
			return path;
		};
		return glyph;
	};
}
var glyphset_default = {
	GlyphSet,
	glyphLoader,
	ttfGlyphLoader,
	cffGlyphLoader
};
//#endregion
//#region node_modules/opentype.js/src/tables/cff.js
function equals(a, b) {
	if (a === b) return true;
	else if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return false;
		for (let i = 0; i < a.length; i += 1) if (!equals(a[i], b[i])) return false;
		return true;
	} else return false;
}
function calcCFFSubroutineBias(subrs) {
	let bias;
	if (subrs.length < 1240) bias = 107;
	else if (subrs.length < 33900) bias = 1131;
	else bias = 32768;
	return bias;
}
function parseCFFIndex(data, start, conversionFn) {
	const offsets = [];
	const objects = [];
	const count = parse_default.getCard16(data, start);
	let objectOffset;
	let endOffset;
	if (count !== 0) {
		const offsetSize = parse_default.getByte(data, start + 2);
		objectOffset = start + (count + 1) * offsetSize + 2;
		let pos = start + 3;
		for (let i = 0; i < count + 1; i += 1) {
			offsets.push(parse_default.getOffset(data, pos, offsetSize));
			pos += offsetSize;
		}
		endOffset = objectOffset + offsets[count];
	} else endOffset = start + 2;
	for (let i = 0; i < offsets.length - 1; i += 1) {
		let value = parse_default.getBytes(data, objectOffset + offsets[i], objectOffset + offsets[i + 1]);
		if (conversionFn) value = conversionFn(value);
		objects.push(value);
	}
	return {
		objects,
		startOffset: start,
		endOffset
	};
}
function parseFloatOperand(parser) {
	let s = "";
	const eof = 15;
	const lookup = [
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		".",
		"E",
		"E-",
		null,
		"-"
	];
	while (true) {
		const b = parser.parseByte();
		const n1 = b >> 4;
		const n2 = b & 15;
		if (n1 === eof) break;
		s += lookup[n1];
		if (n2 === eof) break;
		s += lookup[n2];
	}
	return parseFloat(s);
}
function parseOperand(parser, b0) {
	let b1;
	let b2;
	let b3;
	let b4;
	if (b0 === 28) {
		b1 = parser.parseByte();
		b2 = parser.parseByte();
		return b1 << 8 | b2;
	}
	if (b0 === 29) {
		b1 = parser.parseByte();
		b2 = parser.parseByte();
		b3 = parser.parseByte();
		b4 = parser.parseByte();
		return b1 << 24 | b2 << 16 | b3 << 8 | b4;
	}
	if (b0 === 30) return parseFloatOperand(parser);
	if (b0 >= 32 && b0 <= 246) return b0 - 139;
	if (b0 >= 247 && b0 <= 250) {
		b1 = parser.parseByte();
		return (b0 - 247) * 256 + b1 + 108;
	}
	if (b0 >= 251 && b0 <= 254) {
		b1 = parser.parseByte();
		return -(b0 - 251) * 256 - b1 - 108;
	}
	throw new Error("Invalid b0 " + b0);
}
function entriesToObject(entries) {
	const o = {};
	for (let i = 0; i < entries.length; i += 1) {
		const key = entries[i][0];
		const values = entries[i][1];
		let value;
		if (values.length === 1) value = values[0];
		else value = values;
		if (o.hasOwnProperty(key) && !isNaN(o[key])) throw new Error("Object " + o + " already has key " + key);
		o[key] = value;
	}
	return o;
}
function parseCFFDict(data, start, size) {
	start = start !== void 0 ? start : 0;
	const parser = new parse_default.Parser(data, start);
	const entries = [];
	let operands = [];
	size = size !== void 0 ? size : data.length;
	while (parser.relativeOffset < size) {
		let op = parser.parseByte();
		if (op <= 21) {
			if (op === 12) op = 1200 + parser.parseByte();
			entries.push([op, operands]);
			operands = [];
		} else operands.push(parseOperand(parser, op));
	}
	return entriesToObject(entries);
}
function getCFFString(strings, index) {
	if (index <= 390) index = cffStandardStrings[index];
	else index = strings[index - 391];
	return index;
}
function interpretDict(dict, meta, strings) {
	const newDict = {};
	let value;
	for (let i = 0; i < meta.length; i += 1) {
		const m = meta[i];
		if (Array.isArray(m.type)) {
			const values = [];
			values.length = m.type.length;
			for (let j = 0; j < m.type.length; j++) {
				value = dict[m.op] !== void 0 ? dict[m.op][j] : void 0;
				if (value === void 0) value = m.value !== void 0 && m.value[j] !== void 0 ? m.value[j] : null;
				if (m.type[j] === "SID") value = getCFFString(strings, value);
				values[j] = value;
			}
			newDict[m.name] = values;
		} else {
			value = dict[m.op];
			if (value === void 0) value = m.value !== void 0 ? m.value : null;
			if (m.type === "SID") value = getCFFString(strings, value);
			newDict[m.name] = value;
		}
	}
	return newDict;
}
function parseCFFHeader(data, start) {
	const header = {};
	header.formatMajor = parse_default.getCard8(data, start);
	header.formatMinor = parse_default.getCard8(data, start + 1);
	header.size = parse_default.getCard8(data, start + 2);
	header.offsetSize = parse_default.getCard8(data, start + 3);
	header.startOffset = start;
	header.endOffset = start + 4;
	return header;
}
var TOP_DICT_META = [
	{
		name: "version",
		op: 0,
		type: "SID"
	},
	{
		name: "notice",
		op: 1,
		type: "SID"
	},
	{
		name: "copyright",
		op: 1200,
		type: "SID"
	},
	{
		name: "fullName",
		op: 2,
		type: "SID"
	},
	{
		name: "familyName",
		op: 3,
		type: "SID"
	},
	{
		name: "weight",
		op: 4,
		type: "SID"
	},
	{
		name: "isFixedPitch",
		op: 1201,
		type: "number",
		value: 0
	},
	{
		name: "italicAngle",
		op: 1202,
		type: "number",
		value: 0
	},
	{
		name: "underlinePosition",
		op: 1203,
		type: "number",
		value: -100
	},
	{
		name: "underlineThickness",
		op: 1204,
		type: "number",
		value: 50
	},
	{
		name: "paintType",
		op: 1205,
		type: "number",
		value: 0
	},
	{
		name: "charstringType",
		op: 1206,
		type: "number",
		value: 2
	},
	{
		name: "fontMatrix",
		op: 1207,
		type: [
			"real",
			"real",
			"real",
			"real",
			"real",
			"real"
		],
		value: [
			.001,
			0,
			0,
			.001,
			0,
			0
		]
	},
	{
		name: "uniqueId",
		op: 13,
		type: "number"
	},
	{
		name: "fontBBox",
		op: 5,
		type: [
			"number",
			"number",
			"number",
			"number"
		],
		value: [
			0,
			0,
			0,
			0
		]
	},
	{
		name: "strokeWidth",
		op: 1208,
		type: "number",
		value: 0
	},
	{
		name: "xuid",
		op: 14,
		type: [],
		value: null
	},
	{
		name: "charset",
		op: 15,
		type: "offset",
		value: 0
	},
	{
		name: "encoding",
		op: 16,
		type: "offset",
		value: 0
	},
	{
		name: "charStrings",
		op: 17,
		type: "offset",
		value: 0
	},
	{
		name: "private",
		op: 18,
		type: ["number", "offset"],
		value: [0, 0]
	},
	{
		name: "ros",
		op: 1230,
		type: [
			"SID",
			"SID",
			"number"
		]
	},
	{
		name: "cidFontVersion",
		op: 1231,
		type: "number",
		value: 0
	},
	{
		name: "cidFontRevision",
		op: 1232,
		type: "number",
		value: 0
	},
	{
		name: "cidFontType",
		op: 1233,
		type: "number",
		value: 0
	},
	{
		name: "cidCount",
		op: 1234,
		type: "number",
		value: 8720
	},
	{
		name: "uidBase",
		op: 1235,
		type: "number"
	},
	{
		name: "fdArray",
		op: 1236,
		type: "offset"
	},
	{
		name: "fdSelect",
		op: 1237,
		type: "offset"
	},
	{
		name: "fontName",
		op: 1238,
		type: "SID"
	}
];
var PRIVATE_DICT_META = [
	{
		name: "subrs",
		op: 19,
		type: "offset",
		value: 0
	},
	{
		name: "defaultWidthX",
		op: 20,
		type: "number",
		value: 0
	},
	{
		name: "nominalWidthX",
		op: 21,
		type: "number",
		value: 0
	}
];
function parseCFFTopDict(data, strings) {
	return interpretDict(parseCFFDict(data, 0, data.byteLength), TOP_DICT_META, strings);
}
function parseCFFPrivateDict(data, start, size, strings) {
	return interpretDict(parseCFFDict(data, start, size), PRIVATE_DICT_META, strings);
}
function gatherCFFTopDicts(data, start, cffIndex, strings) {
	const topDictArray = [];
	for (let iTopDict = 0; iTopDict < cffIndex.length; iTopDict += 1) {
		const topDict = parseCFFTopDict(new DataView(new Uint8Array(cffIndex[iTopDict]).buffer), strings);
		topDict._subrs = [];
		topDict._subrsBias = 0;
		const privateSize = topDict.private[0];
		const privateOffset = topDict.private[1];
		if (privateSize !== 0 && privateOffset !== 0) {
			const privateDict = parseCFFPrivateDict(data, privateOffset + start, privateSize, strings);
			topDict._defaultWidthX = privateDict.defaultWidthX;
			topDict._nominalWidthX = privateDict.nominalWidthX;
			if (privateDict.subrs !== 0) {
				topDict._subrs = parseCFFIndex(data, privateOffset + privateDict.subrs + start).objects;
				topDict._subrsBias = calcCFFSubroutineBias(topDict._subrs);
			}
			topDict._privateDict = privateDict;
		}
		topDictArray.push(topDict);
	}
	return topDictArray;
}
function parseCFFCharset(data, start, nGlyphs, strings) {
	let sid;
	let count;
	const parser = new parse_default.Parser(data, start);
	nGlyphs -= 1;
	const charset = [".notdef"];
	const format = parser.parseCard8();
	if (format === 0) for (let i = 0; i < nGlyphs; i += 1) {
		sid = parser.parseSID();
		charset.push(getCFFString(strings, sid));
	}
	else if (format === 1) while (charset.length <= nGlyphs) {
		sid = parser.parseSID();
		count = parser.parseCard8();
		for (let i = 0; i <= count; i += 1) {
			charset.push(getCFFString(strings, sid));
			sid += 1;
		}
	}
	else if (format === 2) while (charset.length <= nGlyphs) {
		sid = parser.parseSID();
		count = parser.parseCard16();
		for (let i = 0; i <= count; i += 1) {
			charset.push(getCFFString(strings, sid));
			sid += 1;
		}
	}
	else throw new Error("Unknown charset format " + format);
	return charset;
}
function parseCFFEncoding(data, start, charset) {
	let code;
	const enc = {};
	const parser = new parse_default.Parser(data, start);
	const format = parser.parseCard8();
	if (format === 0) {
		const nCodes = parser.parseCard8();
		for (let i = 0; i < nCodes; i += 1) {
			code = parser.parseCard8();
			enc[code] = i;
		}
	} else if (format === 1) {
		const nRanges = parser.parseCard8();
		code = 1;
		for (let i = 0; i < nRanges; i += 1) {
			const first = parser.parseCard8();
			const nLeft = parser.parseCard8();
			for (let j = first; j <= first + nLeft; j += 1) {
				enc[j] = code;
				code += 1;
			}
		}
	} else throw new Error("Unknown encoding format " + format);
	return new CffEncoding(enc, charset);
}
function parseCFFCharstring(font, glyph, code) {
	let c1x;
	let c1y;
	let c2x;
	let c2y;
	const p = new Path();
	const stack = [];
	let nStems = 0;
	let haveWidth = false;
	let open = false;
	let x = 0;
	let y = 0;
	let subrs;
	let subrsBias;
	let defaultWidthX;
	let nominalWidthX;
	if (font.isCIDFont) {
		const fdIndex = font.tables.cff.topDict._fdSelect[glyph.index];
		const fdDict = font.tables.cff.topDict._fdArray[fdIndex];
		subrs = fdDict._subrs;
		subrsBias = fdDict._subrsBias;
		defaultWidthX = fdDict._defaultWidthX;
		nominalWidthX = fdDict._nominalWidthX;
	} else {
		subrs = font.tables.cff.topDict._subrs;
		subrsBias = font.tables.cff.topDict._subrsBias;
		defaultWidthX = font.tables.cff.topDict._defaultWidthX;
		nominalWidthX = font.tables.cff.topDict._nominalWidthX;
	}
	let width = defaultWidthX;
	function newContour(x, y) {
		if (open) p.closePath();
		p.moveTo(x, y);
		open = true;
	}
	function parseStems() {
		let hasWidthArg;
		hasWidthArg = stack.length % 2 !== 0;
		if (hasWidthArg && !haveWidth) width = stack.shift() + nominalWidthX;
		nStems += stack.length >> 1;
		stack.length = 0;
		haveWidth = true;
	}
	function parse(code) {
		let b1;
		let b2;
		let b3;
		let b4;
		let codeIndex;
		let subrCode;
		let jpx;
		let jpy;
		let c3x;
		let c3y;
		let c4x;
		let c4y;
		let i = 0;
		while (i < code.length) {
			let v = code[i];
			i += 1;
			switch (v) {
				case 1:
					parseStems();
					break;
				case 3:
					parseStems();
					break;
				case 4:
					if (stack.length > 1 && !haveWidth) {
						width = stack.shift() + nominalWidthX;
						haveWidth = true;
					}
					y += stack.pop();
					newContour(x, y);
					break;
				case 5:
					while (stack.length > 0) {
						x += stack.shift();
						y += stack.shift();
						p.lineTo(x, y);
					}
					break;
				case 6:
					while (stack.length > 0) {
						x += stack.shift();
						p.lineTo(x, y);
						if (stack.length === 0) break;
						y += stack.shift();
						p.lineTo(x, y);
					}
					break;
				case 7:
					while (stack.length > 0) {
						y += stack.shift();
						p.lineTo(x, y);
						if (stack.length === 0) break;
						x += stack.shift();
						p.lineTo(x, y);
					}
					break;
				case 8:
					while (stack.length > 0) {
						c1x = x + stack.shift();
						c1y = y + stack.shift();
						c2x = c1x + stack.shift();
						c2y = c1y + stack.shift();
						x = c2x + stack.shift();
						y = c2y + stack.shift();
						p.curveTo(c1x, c1y, c2x, c2y, x, y);
					}
					break;
				case 10:
					codeIndex = stack.pop() + subrsBias;
					subrCode = subrs[codeIndex];
					if (subrCode) parse(subrCode);
					break;
				case 11: return;
				case 12:
					v = code[i];
					i += 1;
					switch (v) {
						case 35:
							c1x = x + stack.shift();
							c1y = y + stack.shift();
							c2x = c1x + stack.shift();
							c2y = c1y + stack.shift();
							jpx = c2x + stack.shift();
							jpy = c2y + stack.shift();
							c3x = jpx + stack.shift();
							c3y = jpy + stack.shift();
							c4x = c3x + stack.shift();
							c4y = c3y + stack.shift();
							x = c4x + stack.shift();
							y = c4y + stack.shift();
							stack.shift();
							p.curveTo(c1x, c1y, c2x, c2y, jpx, jpy);
							p.curveTo(c3x, c3y, c4x, c4y, x, y);
							break;
						case 34:
							c1x = x + stack.shift();
							c1y = y;
							c2x = c1x + stack.shift();
							c2y = c1y + stack.shift();
							jpx = c2x + stack.shift();
							jpy = c2y;
							c3x = jpx + stack.shift();
							c3y = c2y;
							c4x = c3x + stack.shift();
							c4y = y;
							x = c4x + stack.shift();
							p.curveTo(c1x, c1y, c2x, c2y, jpx, jpy);
							p.curveTo(c3x, c3y, c4x, c4y, x, y);
							break;
						case 36:
							c1x = x + stack.shift();
							c1y = y + stack.shift();
							c2x = c1x + stack.shift();
							c2y = c1y + stack.shift();
							jpx = c2x + stack.shift();
							jpy = c2y;
							c3x = jpx + stack.shift();
							c3y = c2y;
							c4x = c3x + stack.shift();
							c4y = c3y + stack.shift();
							x = c4x + stack.shift();
							p.curveTo(c1x, c1y, c2x, c2y, jpx, jpy);
							p.curveTo(c3x, c3y, c4x, c4y, x, y);
							break;
						case 37:
							c1x = x + stack.shift();
							c1y = y + stack.shift();
							c2x = c1x + stack.shift();
							c2y = c1y + stack.shift();
							jpx = c2x + stack.shift();
							jpy = c2y + stack.shift();
							c3x = jpx + stack.shift();
							c3y = jpy + stack.shift();
							c4x = c3x + stack.shift();
							c4y = c3y + stack.shift();
							if (Math.abs(c4x - x) > Math.abs(c4y - y)) x = c4x + stack.shift();
							else y = c4y + stack.shift();
							p.curveTo(c1x, c1y, c2x, c2y, jpx, jpy);
							p.curveTo(c3x, c3y, c4x, c4y, x, y);
							break;
						default:
							console.log("Glyph " + glyph.index + ": unknown operator 1200" + v);
							stack.length = 0;
					}
					break;
				case 14:
					if (stack.length > 0 && !haveWidth) {
						width = stack.shift() + nominalWidthX;
						haveWidth = true;
					}
					if (open) {
						p.closePath();
						open = false;
					}
					break;
				case 18:
					parseStems();
					break;
				case 19:
				case 20:
					parseStems();
					i += nStems + 7 >> 3;
					break;
				case 21:
					if (stack.length > 2 && !haveWidth) {
						width = stack.shift() + nominalWidthX;
						haveWidth = true;
					}
					y += stack.pop();
					x += stack.pop();
					newContour(x, y);
					break;
				case 22:
					if (stack.length > 1 && !haveWidth) {
						width = stack.shift() + nominalWidthX;
						haveWidth = true;
					}
					x += stack.pop();
					newContour(x, y);
					break;
				case 23:
					parseStems();
					break;
				case 24:
					while (stack.length > 2) {
						c1x = x + stack.shift();
						c1y = y + stack.shift();
						c2x = c1x + stack.shift();
						c2y = c1y + stack.shift();
						x = c2x + stack.shift();
						y = c2y + stack.shift();
						p.curveTo(c1x, c1y, c2x, c2y, x, y);
					}
					x += stack.shift();
					y += stack.shift();
					p.lineTo(x, y);
					break;
				case 25:
					while (stack.length > 6) {
						x += stack.shift();
						y += stack.shift();
						p.lineTo(x, y);
					}
					c1x = x + stack.shift();
					c1y = y + stack.shift();
					c2x = c1x + stack.shift();
					c2y = c1y + stack.shift();
					x = c2x + stack.shift();
					y = c2y + stack.shift();
					p.curveTo(c1x, c1y, c2x, c2y, x, y);
					break;
				case 26:
					if (stack.length % 2) x += stack.shift();
					while (stack.length > 0) {
						c1x = x;
						c1y = y + stack.shift();
						c2x = c1x + stack.shift();
						c2y = c1y + stack.shift();
						x = c2x;
						y = c2y + stack.shift();
						p.curveTo(c1x, c1y, c2x, c2y, x, y);
					}
					break;
				case 27:
					if (stack.length % 2) y += stack.shift();
					while (stack.length > 0) {
						c1x = x + stack.shift();
						c1y = y;
						c2x = c1x + stack.shift();
						c2y = c1y + stack.shift();
						x = c2x + stack.shift();
						y = c2y;
						p.curveTo(c1x, c1y, c2x, c2y, x, y);
					}
					break;
				case 28:
					b1 = code[i];
					b2 = code[i + 1];
					stack.push((b1 << 24 | b2 << 16) >> 16);
					i += 2;
					break;
				case 29:
					codeIndex = stack.pop() + font.gsubrsBias;
					subrCode = font.gsubrs[codeIndex];
					if (subrCode) parse(subrCode);
					break;
				case 30:
					while (stack.length > 0) {
						c1x = x;
						c1y = y + stack.shift();
						c2x = c1x + stack.shift();
						c2y = c1y + stack.shift();
						x = c2x + stack.shift();
						y = c2y + (stack.length === 1 ? stack.shift() : 0);
						p.curveTo(c1x, c1y, c2x, c2y, x, y);
						if (stack.length === 0) break;
						c1x = x + stack.shift();
						c1y = y;
						c2x = c1x + stack.shift();
						c2y = c1y + stack.shift();
						y = c2y + stack.shift();
						x = c2x + (stack.length === 1 ? stack.shift() : 0);
						p.curveTo(c1x, c1y, c2x, c2y, x, y);
					}
					break;
				case 31:
					while (stack.length > 0) {
						c1x = x + stack.shift();
						c1y = y;
						c2x = c1x + stack.shift();
						c2y = c1y + stack.shift();
						y = c2y + stack.shift();
						x = c2x + (stack.length === 1 ? stack.shift() : 0);
						p.curveTo(c1x, c1y, c2x, c2y, x, y);
						if (stack.length === 0) break;
						c1x = x;
						c1y = y + stack.shift();
						c2x = c1x + stack.shift();
						c2y = c1y + stack.shift();
						x = c2x + stack.shift();
						y = c2y + (stack.length === 1 ? stack.shift() : 0);
						p.curveTo(c1x, c1y, c2x, c2y, x, y);
					}
					break;
				default: if (v < 32) console.log("Glyph " + glyph.index + ": unknown operator " + v);
				else if (v < 247) stack.push(v - 139);
				else if (v < 251) {
					b1 = code[i];
					i += 1;
					stack.push((v - 247) * 256 + b1 + 108);
				} else if (v < 255) {
					b1 = code[i];
					i += 1;
					stack.push(-(v - 251) * 256 - b1 - 108);
				} else {
					b1 = code[i];
					b2 = code[i + 1];
					b3 = code[i + 2];
					b4 = code[i + 3];
					i += 4;
					stack.push((b1 << 24 | b2 << 16 | b3 << 8 | b4) / 65536);
				}
			}
		}
	}
	parse(code);
	glyph.advanceWidth = width;
	return p;
}
function parseCFFFDSelect(data, start, nGlyphs, fdArrayCount) {
	const fdSelect = [];
	let fdIndex;
	const parser = new parse_default.Parser(data, start);
	const format = parser.parseCard8();
	if (format === 0) for (let iGid = 0; iGid < nGlyphs; iGid++) {
		fdIndex = parser.parseCard8();
		if (fdIndex >= fdArrayCount) throw new Error("CFF table CID Font FDSelect has bad FD index value " + fdIndex + " (FD count " + fdArrayCount + ")");
		fdSelect.push(fdIndex);
	}
	else if (format === 3) {
		const nRanges = parser.parseCard16();
		let first = parser.parseCard16();
		if (first !== 0) throw new Error("CFF Table CID Font FDSelect format 3 range has bad initial GID " + first);
		let next;
		for (let iRange = 0; iRange < nRanges; iRange++) {
			fdIndex = parser.parseCard8();
			next = parser.parseCard16();
			if (fdIndex >= fdArrayCount) throw new Error("CFF table CID Font FDSelect has bad FD index value " + fdIndex + " (FD count " + fdArrayCount + ")");
			if (next > nGlyphs) throw new Error("CFF Table CID Font FDSelect format 3 range has bad GID " + next);
			for (; first < next; first++) fdSelect.push(fdIndex);
			first = next;
		}
		if (next !== nGlyphs) throw new Error("CFF Table CID Font FDSelect format 3 range has bad final GID " + next);
	} else throw new Error("CFF Table CID Font FDSelect table has unsupported format " + format);
	return fdSelect;
}
function parseCFFTable(data, start, font) {
	font.tables.cff = {};
	const topDictIndex = parseCFFIndex(data, parseCFFIndex(data, parseCFFHeader(data, start).endOffset, parse_default.bytesToString).endOffset);
	const stringIndex = parseCFFIndex(data, topDictIndex.endOffset, parse_default.bytesToString);
	font.gsubrs = parseCFFIndex(data, stringIndex.endOffset).objects;
	font.gsubrsBias = calcCFFSubroutineBias(font.gsubrs);
	const topDictArray = gatherCFFTopDicts(data, start, topDictIndex.objects, stringIndex.objects);
	if (topDictArray.length !== 1) throw new Error("CFF table has too many fonts in 'FontSet' - count of fonts NameIndex.length = " + topDictArray.length);
	const topDict = topDictArray[0];
	font.tables.cff.topDict = topDict;
	if (topDict._privateDict) {
		font.defaultWidthX = topDict._privateDict.defaultWidthX;
		font.nominalWidthX = topDict._privateDict.nominalWidthX;
	}
	if (topDict.ros[0] !== void 0 && topDict.ros[1] !== void 0) font.isCIDFont = true;
	if (font.isCIDFont) {
		let fdArrayOffset = topDict.fdArray;
		let fdSelectOffset = topDict.fdSelect;
		if (fdArrayOffset === 0 || fdSelectOffset === 0) throw new Error("Font is marked as a CID font, but FDArray and/or FDSelect information is missing");
		fdArrayOffset += start;
		const fdArray = gatherCFFTopDicts(data, start, parseCFFIndex(data, fdArrayOffset).objects, stringIndex.objects);
		topDict._fdArray = fdArray;
		fdSelectOffset += start;
		topDict._fdSelect = parseCFFFDSelect(data, fdSelectOffset, font.numGlyphs, fdArray.length);
	}
	const privateDictOffset = start + topDict.private[1];
	const privateDict = parseCFFPrivateDict(data, privateDictOffset, topDict.private[0], stringIndex.objects);
	font.defaultWidthX = privateDict.defaultWidthX;
	font.nominalWidthX = privateDict.nominalWidthX;
	if (privateDict.subrs !== 0) {
		font.subrs = parseCFFIndex(data, privateDictOffset + privateDict.subrs).objects;
		font.subrsBias = calcCFFSubroutineBias(font.subrs);
	} else {
		font.subrs = [];
		font.subrsBias = 0;
	}
	const charStringsIndex = parseCFFIndex(data, start + topDict.charStrings);
	font.nGlyphs = charStringsIndex.objects.length;
	const charset = parseCFFCharset(data, start + topDict.charset, font.nGlyphs, stringIndex.objects);
	if (topDict.encoding === 0) font.cffEncoding = new CffEncoding(cffStandardEncoding, charset);
	else if (topDict.encoding === 1) font.cffEncoding = new CffEncoding(cffExpertEncoding, charset);
	else font.cffEncoding = parseCFFEncoding(data, start + topDict.encoding, charset);
	font.encoding = font.encoding || font.cffEncoding;
	font.glyphs = new glyphset_default.GlyphSet(font);
	for (let i = 0; i < font.nGlyphs; i += 1) {
		const charString = charStringsIndex.objects[i];
		font.glyphs.push(i, glyphset_default.cffGlyphLoader(font, i, parseCFFCharstring, charString));
	}
}
function encodeString(s, strings) {
	let sid;
	let i = cffStandardStrings.indexOf(s);
	if (i >= 0) sid = i;
	i = strings.indexOf(s);
	if (i >= 0) sid = i + cffStandardStrings.length;
	else {
		sid = cffStandardStrings.length + strings.length;
		strings.push(s);
	}
	return sid;
}
function makeHeader() {
	return new table_default.Record("Header", [
		{
			name: "major",
			type: "Card8",
			value: 1
		},
		{
			name: "minor",
			type: "Card8",
			value: 0
		},
		{
			name: "hdrSize",
			type: "Card8",
			value: 4
		},
		{
			name: "major",
			type: "Card8",
			value: 1
		}
	]);
}
function makeNameIndex(fontNames) {
	const t = new table_default.Record("Name INDEX", [{
		name: "names",
		type: "INDEX",
		value: []
	}]);
	t.names = [];
	for (let i = 0; i < fontNames.length; i += 1) t.names.push({
		name: "name_" + i,
		type: "NAME",
		value: fontNames[i]
	});
	return t;
}
function makeDict(meta, attrs, strings) {
	const m = {};
	for (let i = 0; i < meta.length; i += 1) {
		const entry = meta[i];
		let value = attrs[entry.name];
		if (value !== void 0 && !equals(value, entry.value)) {
			if (entry.type === "SID") value = encodeString(value, strings);
			m[entry.op] = {
				name: entry.name,
				type: entry.type,
				value
			};
		}
	}
	return m;
}
function makeTopDict(attrs, strings) {
	const t = new table_default.Record("Top DICT", [{
		name: "dict",
		type: "DICT",
		value: {}
	}]);
	t.dict = makeDict(TOP_DICT_META, attrs, strings);
	return t;
}
function makeTopDictIndex(topDict) {
	const t = new table_default.Record("Top DICT INDEX", [{
		name: "topDicts",
		type: "INDEX",
		value: []
	}]);
	t.topDicts = [{
		name: "topDict_0",
		type: "TABLE",
		value: topDict
	}];
	return t;
}
function makeStringIndex(strings) {
	const t = new table_default.Record("String INDEX", [{
		name: "strings",
		type: "INDEX",
		value: []
	}]);
	t.strings = [];
	for (let i = 0; i < strings.length; i += 1) t.strings.push({
		name: "string_" + i,
		type: "STRING",
		value: strings[i]
	});
	return t;
}
function makeGlobalSubrIndex() {
	return new table_default.Record("Global Subr INDEX", [{
		name: "subrs",
		type: "INDEX",
		value: []
	}]);
}
function makeCharsets(glyphNames, strings) {
	const t = new table_default.Record("Charsets", [{
		name: "format",
		type: "Card8",
		value: 0
	}]);
	for (let i = 0; i < glyphNames.length; i += 1) {
		const glyphName = glyphNames[i];
		const glyphSID = encodeString(glyphName, strings);
		t.fields.push({
			name: "glyph_" + i,
			type: "SID",
			value: glyphSID
		});
	}
	return t;
}
function glyphToOps(glyph) {
	const ops = [];
	const path = glyph.path;
	ops.push({
		name: "width",
		type: "NUMBER",
		value: glyph.advanceWidth
	});
	let x = 0;
	let y = 0;
	for (let i = 0; i < path.commands.length; i += 1) {
		let dx;
		let dy;
		let cmd = path.commands[i];
		if (cmd.type === "Q") {
			const _13 = 1 / 3;
			const _23 = 2 / 3;
			cmd = {
				type: "C",
				x: cmd.x,
				y: cmd.y,
				x1: _13 * x + _23 * cmd.x1,
				y1: _13 * y + _23 * cmd.y1,
				x2: _13 * cmd.x + _23 * cmd.x1,
				y2: _13 * cmd.y + _23 * cmd.y1
			};
		}
		if (cmd.type === "M") {
			dx = Math.round(cmd.x - x);
			dy = Math.round(cmd.y - y);
			ops.push({
				name: "dx",
				type: "NUMBER",
				value: dx
			});
			ops.push({
				name: "dy",
				type: "NUMBER",
				value: dy
			});
			ops.push({
				name: "rmoveto",
				type: "OP",
				value: 21
			});
			x = Math.round(cmd.x);
			y = Math.round(cmd.y);
		} else if (cmd.type === "L") {
			dx = Math.round(cmd.x - x);
			dy = Math.round(cmd.y - y);
			ops.push({
				name: "dx",
				type: "NUMBER",
				value: dx
			});
			ops.push({
				name: "dy",
				type: "NUMBER",
				value: dy
			});
			ops.push({
				name: "rlineto",
				type: "OP",
				value: 5
			});
			x = Math.round(cmd.x);
			y = Math.round(cmd.y);
		} else if (cmd.type === "C") {
			const dx1 = Math.round(cmd.x1 - x);
			const dy1 = Math.round(cmd.y1 - y);
			const dx2 = Math.round(cmd.x2 - cmd.x1);
			const dy2 = Math.round(cmd.y2 - cmd.y1);
			dx = Math.round(cmd.x - cmd.x2);
			dy = Math.round(cmd.y - cmd.y2);
			ops.push({
				name: "dx1",
				type: "NUMBER",
				value: dx1
			});
			ops.push({
				name: "dy1",
				type: "NUMBER",
				value: dy1
			});
			ops.push({
				name: "dx2",
				type: "NUMBER",
				value: dx2
			});
			ops.push({
				name: "dy2",
				type: "NUMBER",
				value: dy2
			});
			ops.push({
				name: "dx",
				type: "NUMBER",
				value: dx
			});
			ops.push({
				name: "dy",
				type: "NUMBER",
				value: dy
			});
			ops.push({
				name: "rrcurveto",
				type: "OP",
				value: 8
			});
			x = Math.round(cmd.x);
			y = Math.round(cmd.y);
		}
	}
	ops.push({
		name: "endchar",
		type: "OP",
		value: 14
	});
	return ops;
}
function makeCharStringsIndex(glyphs) {
	const t = new table_default.Record("CharStrings INDEX", [{
		name: "charStrings",
		type: "INDEX",
		value: []
	}]);
	for (let i = 0; i < glyphs.length; i += 1) {
		const glyph = glyphs.get(i);
		const ops = glyphToOps(glyph);
		t.charStrings.push({
			name: glyph.name,
			type: "CHARSTRING",
			value: ops
		});
	}
	return t;
}
function makePrivateDict(attrs, strings) {
	const t = new table_default.Record("Private DICT", [{
		name: "dict",
		type: "DICT",
		value: {}
	}]);
	t.dict = makeDict(PRIVATE_DICT_META, attrs, strings);
	return t;
}
function makeCFFTable(glyphs, options) {
	const t = new table_default.Table("CFF ", [
		{
			name: "header",
			type: "RECORD"
		},
		{
			name: "nameIndex",
			type: "RECORD"
		},
		{
			name: "topDictIndex",
			type: "RECORD"
		},
		{
			name: "stringIndex",
			type: "RECORD"
		},
		{
			name: "globalSubrIndex",
			type: "RECORD"
		},
		{
			name: "charsets",
			type: "RECORD"
		},
		{
			name: "charStringsIndex",
			type: "RECORD"
		},
		{
			name: "privateDict",
			type: "RECORD"
		}
	]);
	const fontScale = 1 / options.unitsPerEm;
	const attrs = {
		version: options.version,
		fullName: options.fullName,
		familyName: options.familyName,
		weight: options.weightName,
		fontBBox: options.fontBBox || [
			0,
			0,
			0,
			0
		],
		fontMatrix: [
			fontScale,
			0,
			0,
			fontScale,
			0,
			0
		],
		charset: 999,
		encoding: 0,
		charStrings: 999,
		private: [0, 999]
	};
	const privateAttrs = {};
	const glyphNames = [];
	let glyph;
	for (let i = 1; i < glyphs.length; i += 1) {
		glyph = glyphs.get(i);
		glyphNames.push(glyph.name);
	}
	const strings = [];
	t.header = makeHeader();
	t.nameIndex = makeNameIndex([options.postScriptName]);
	let topDict = makeTopDict(attrs, strings);
	t.topDictIndex = makeTopDictIndex(topDict);
	t.globalSubrIndex = makeGlobalSubrIndex();
	t.charsets = makeCharsets(glyphNames, strings);
	t.charStringsIndex = makeCharStringsIndex(glyphs);
	t.privateDict = makePrivateDict(privateAttrs, strings);
	t.stringIndex = makeStringIndex(strings);
	attrs.charset = t.header.sizeOf() + t.nameIndex.sizeOf() + t.topDictIndex.sizeOf() + t.stringIndex.sizeOf() + t.globalSubrIndex.sizeOf();
	attrs.encoding = 0;
	attrs.charStrings = attrs.charset + t.charsets.sizeOf();
	attrs.private[1] = attrs.charStrings + t.charStringsIndex.sizeOf();
	topDict = makeTopDict(attrs, strings);
	t.topDictIndex = makeTopDictIndex(topDict);
	return t;
}
var cff_default = {
	parse: parseCFFTable,
	make: makeCFFTable
};
//#endregion
//#region node_modules/opentype.js/src/tables/head.js
function parseHeadTable(data, start) {
	const head = {};
	const p = new parse_default.Parser(data, start);
	head.version = p.parseVersion();
	head.fontRevision = Math.round(p.parseFixed() * 1e3) / 1e3;
	head.checkSumAdjustment = p.parseULong();
	head.magicNumber = p.parseULong();
	check_default.argument(head.magicNumber === 1594834165, "Font header has wrong magic number.");
	head.flags = p.parseUShort();
	head.unitsPerEm = p.parseUShort();
	head.created = p.parseLongDateTime();
	head.modified = p.parseLongDateTime();
	head.xMin = p.parseShort();
	head.yMin = p.parseShort();
	head.xMax = p.parseShort();
	head.yMax = p.parseShort();
	head.macStyle = p.parseUShort();
	head.lowestRecPPEM = p.parseUShort();
	head.fontDirectionHint = p.parseShort();
	head.indexToLocFormat = p.parseShort();
	head.glyphDataFormat = p.parseShort();
	return head;
}
function makeHeadTable(options) {
	const timestamp = Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3) + 2082844800;
	let createdTimestamp = timestamp;
	if (options.createdTimestamp) createdTimestamp = options.createdTimestamp + 2082844800;
	return new table_default.Table("head", [
		{
			name: "version",
			type: "FIXED",
			value: 65536
		},
		{
			name: "fontRevision",
			type: "FIXED",
			value: 65536
		},
		{
			name: "checkSumAdjustment",
			type: "ULONG",
			value: 0
		},
		{
			name: "magicNumber",
			type: "ULONG",
			value: 1594834165
		},
		{
			name: "flags",
			type: "USHORT",
			value: 0
		},
		{
			name: "unitsPerEm",
			type: "USHORT",
			value: 1e3
		},
		{
			name: "created",
			type: "LONGDATETIME",
			value: createdTimestamp
		},
		{
			name: "modified",
			type: "LONGDATETIME",
			value: timestamp
		},
		{
			name: "xMin",
			type: "SHORT",
			value: 0
		},
		{
			name: "yMin",
			type: "SHORT",
			value: 0
		},
		{
			name: "xMax",
			type: "SHORT",
			value: 0
		},
		{
			name: "yMax",
			type: "SHORT",
			value: 0
		},
		{
			name: "macStyle",
			type: "USHORT",
			value: 0
		},
		{
			name: "lowestRecPPEM",
			type: "USHORT",
			value: 0
		},
		{
			name: "fontDirectionHint",
			type: "SHORT",
			value: 2
		},
		{
			name: "indexToLocFormat",
			type: "SHORT",
			value: 0
		},
		{
			name: "glyphDataFormat",
			type: "SHORT",
			value: 0
		}
	], options);
}
var head_default = {
	parse: parseHeadTable,
	make: makeHeadTable
};
//#endregion
//#region node_modules/opentype.js/src/tables/hhea.js
function parseHheaTable(data, start) {
	const hhea = {};
	const p = new parse_default.Parser(data, start);
	hhea.version = p.parseVersion();
	hhea.ascender = p.parseShort();
	hhea.descender = p.parseShort();
	hhea.lineGap = p.parseShort();
	hhea.advanceWidthMax = p.parseUShort();
	hhea.minLeftSideBearing = p.parseShort();
	hhea.minRightSideBearing = p.parseShort();
	hhea.xMaxExtent = p.parseShort();
	hhea.caretSlopeRise = p.parseShort();
	hhea.caretSlopeRun = p.parseShort();
	hhea.caretOffset = p.parseShort();
	p.relativeOffset += 8;
	hhea.metricDataFormat = p.parseShort();
	hhea.numberOfHMetrics = p.parseUShort();
	return hhea;
}
function makeHheaTable(options) {
	return new table_default.Table("hhea", [
		{
			name: "version",
			type: "FIXED",
			value: 65536
		},
		{
			name: "ascender",
			type: "FWORD",
			value: 0
		},
		{
			name: "descender",
			type: "FWORD",
			value: 0
		},
		{
			name: "lineGap",
			type: "FWORD",
			value: 0
		},
		{
			name: "advanceWidthMax",
			type: "UFWORD",
			value: 0
		},
		{
			name: "minLeftSideBearing",
			type: "FWORD",
			value: 0
		},
		{
			name: "minRightSideBearing",
			type: "FWORD",
			value: 0
		},
		{
			name: "xMaxExtent",
			type: "FWORD",
			value: 0
		},
		{
			name: "caretSlopeRise",
			type: "SHORT",
			value: 1
		},
		{
			name: "caretSlopeRun",
			type: "SHORT",
			value: 0
		},
		{
			name: "caretOffset",
			type: "SHORT",
			value: 0
		},
		{
			name: "reserved1",
			type: "SHORT",
			value: 0
		},
		{
			name: "reserved2",
			type: "SHORT",
			value: 0
		},
		{
			name: "reserved3",
			type: "SHORT",
			value: 0
		},
		{
			name: "reserved4",
			type: "SHORT",
			value: 0
		},
		{
			name: "metricDataFormat",
			type: "SHORT",
			value: 0
		},
		{
			name: "numberOfHMetrics",
			type: "USHORT",
			value: 0
		}
	], options);
}
var hhea_default = {
	parse: parseHheaTable,
	make: makeHheaTable
};
//#endregion
//#region node_modules/opentype.js/src/tables/hmtx.js
function parseHmtxTable(data, start, numMetrics, numGlyphs, glyphs) {
	let advanceWidth;
	let leftSideBearing;
	const p = new parse_default.Parser(data, start);
	for (let i = 0; i < numGlyphs; i += 1) {
		if (i < numMetrics) {
			advanceWidth = p.parseUShort();
			leftSideBearing = p.parseShort();
		}
		const glyph = glyphs.get(i);
		glyph.advanceWidth = advanceWidth;
		glyph.leftSideBearing = leftSideBearing;
	}
}
function makeHmtxTable(glyphs) {
	const t = new table_default.Table("hmtx", []);
	for (let i = 0; i < glyphs.length; i += 1) {
		const glyph = glyphs.get(i);
		const advanceWidth = glyph.advanceWidth || 0;
		const leftSideBearing = glyph.leftSideBearing || 0;
		t.fields.push({
			name: "advanceWidth_" + i,
			type: "USHORT",
			value: advanceWidth
		});
		t.fields.push({
			name: "leftSideBearing_" + i,
			type: "SHORT",
			value: leftSideBearing
		});
	}
	return t;
}
var hmtx_default = {
	parse: parseHmtxTable,
	make: makeHmtxTable
};
//#endregion
//#region node_modules/opentype.js/src/tables/ltag.js
function makeLtagTable(tags) {
	const result = new table_default.Table("ltag", [
		{
			name: "version",
			type: "ULONG",
			value: 1
		},
		{
			name: "flags",
			type: "ULONG",
			value: 0
		},
		{
			name: "numTags",
			type: "ULONG",
			value: tags.length
		}
	]);
	let stringPool = "";
	const stringPoolOffset = 12 + tags.length * 4;
	for (let i = 0; i < tags.length; ++i) {
		let pos = stringPool.indexOf(tags[i]);
		if (pos < 0) {
			pos = stringPool.length;
			stringPool += tags[i];
		}
		result.fields.push({
			name: "offset " + i,
			type: "USHORT",
			value: stringPoolOffset + pos
		});
		result.fields.push({
			name: "length " + i,
			type: "USHORT",
			value: tags[i].length
		});
	}
	result.fields.push({
		name: "stringPool",
		type: "CHARARRAY",
		value: stringPool
	});
	return result;
}
function parseLtagTable(data, start) {
	const p = new parse_default.Parser(data, start);
	const tableVersion = p.parseULong();
	check_default.argument(tableVersion === 1, "Unsupported ltag table version.");
	p.skip("uLong", 1);
	const numTags = p.parseULong();
	const tags = [];
	for (let i = 0; i < numTags; i++) {
		let tag = "";
		const offset = start + p.parseUShort();
		const length = p.parseUShort();
		for (let j = offset; j < offset + length; ++j) tag += String.fromCharCode(data.getInt8(j));
		tags.push(tag);
	}
	return tags;
}
var ltag_default = {
	make: makeLtagTable,
	parse: parseLtagTable
};
//#endregion
//#region node_modules/opentype.js/src/tables/maxp.js
function parseMaxpTable(data, start) {
	const maxp = {};
	const p = new parse_default.Parser(data, start);
	maxp.version = p.parseVersion();
	maxp.numGlyphs = p.parseUShort();
	if (maxp.version === 1) {
		maxp.maxPoints = p.parseUShort();
		maxp.maxContours = p.parseUShort();
		maxp.maxCompositePoints = p.parseUShort();
		maxp.maxCompositeContours = p.parseUShort();
		maxp.maxZones = p.parseUShort();
		maxp.maxTwilightPoints = p.parseUShort();
		maxp.maxStorage = p.parseUShort();
		maxp.maxFunctionDefs = p.parseUShort();
		maxp.maxInstructionDefs = p.parseUShort();
		maxp.maxStackElements = p.parseUShort();
		maxp.maxSizeOfInstructions = p.parseUShort();
		maxp.maxComponentElements = p.parseUShort();
		maxp.maxComponentDepth = p.parseUShort();
	}
	return maxp;
}
function makeMaxpTable(numGlyphs) {
	return new table_default.Table("maxp", [{
		name: "version",
		type: "FIXED",
		value: 20480
	}, {
		name: "numGlyphs",
		type: "USHORT",
		value: numGlyphs
	}]);
}
var maxp_default = {
	parse: parseMaxpTable,
	make: makeMaxpTable
};
//#endregion
//#region node_modules/opentype.js/src/tables/name.js
var nameTableNames = [
	"copyright",
	"fontFamily",
	"fontSubfamily",
	"uniqueID",
	"fullName",
	"version",
	"postScriptName",
	"trademark",
	"manufacturer",
	"designer",
	"description",
	"manufacturerURL",
	"designerURL",
	"license",
	"licenseURL",
	"reserved",
	"preferredFamily",
	"preferredSubfamily",
	"compatibleFullName",
	"sampleText",
	"postScriptFindFontName",
	"wwsFamily",
	"wwsSubfamily"
];
var macLanguages = {
	0: "en",
	1: "fr",
	2: "de",
	3: "it",
	4: "nl",
	5: "sv",
	6: "es",
	7: "da",
	8: "pt",
	9: "no",
	10: "he",
	11: "ja",
	12: "ar",
	13: "fi",
	14: "el",
	15: "is",
	16: "mt",
	17: "tr",
	18: "hr",
	19: "zh-Hant",
	20: "ur",
	21: "hi",
	22: "th",
	23: "ko",
	24: "lt",
	25: "pl",
	26: "hu",
	27: "es",
	28: "lv",
	29: "se",
	30: "fo",
	31: "fa",
	32: "ru",
	33: "zh",
	34: "nl-BE",
	35: "ga",
	36: "sq",
	37: "ro",
	38: "cz",
	39: "sk",
	40: "si",
	41: "yi",
	42: "sr",
	43: "mk",
	44: "bg",
	45: "uk",
	46: "be",
	47: "uz",
	48: "kk",
	49: "az-Cyrl",
	50: "az-Arab",
	51: "hy",
	52: "ka",
	53: "mo",
	54: "ky",
	55: "tg",
	56: "tk",
	57: "mn-CN",
	58: "mn",
	59: "ps",
	60: "ks",
	61: "ku",
	62: "sd",
	63: "bo",
	64: "ne",
	65: "sa",
	66: "mr",
	67: "bn",
	68: "as",
	69: "gu",
	70: "pa",
	71: "or",
	72: "ml",
	73: "kn",
	74: "ta",
	75: "te",
	76: "si",
	77: "my",
	78: "km",
	79: "lo",
	80: "vi",
	81: "id",
	82: "tl",
	83: "ms",
	84: "ms-Arab",
	85: "am",
	86: "ti",
	87: "om",
	88: "so",
	89: "sw",
	90: "rw",
	91: "rn",
	92: "ny",
	93: "mg",
	94: "eo",
	128: "cy",
	129: "eu",
	130: "ca",
	131: "la",
	132: "qu",
	133: "gn",
	134: "ay",
	135: "tt",
	136: "ug",
	137: "dz",
	138: "jv",
	139: "su",
	140: "gl",
	141: "af",
	142: "br",
	143: "iu",
	144: "gd",
	145: "gv",
	146: "ga",
	147: "to",
	148: "el-polyton",
	149: "kl",
	150: "az",
	151: "nn"
};
var macLanguageToScript = {
	0: 0,
	1: 0,
	2: 0,
	3: 0,
	4: 0,
	5: 0,
	6: 0,
	7: 0,
	8: 0,
	9: 0,
	10: 5,
	11: 1,
	12: 4,
	13: 0,
	14: 6,
	15: 0,
	16: 0,
	17: 0,
	18: 0,
	19: 2,
	20: 4,
	21: 9,
	22: 21,
	23: 3,
	24: 29,
	25: 29,
	26: 29,
	27: 29,
	28: 29,
	29: 0,
	30: 0,
	31: 4,
	32: 7,
	33: 25,
	34: 0,
	35: 0,
	36: 0,
	37: 0,
	38: 29,
	39: 29,
	40: 0,
	41: 5,
	42: 7,
	43: 7,
	44: 7,
	45: 7,
	46: 7,
	47: 7,
	48: 7,
	49: 7,
	50: 4,
	51: 24,
	52: 23,
	53: 7,
	54: 7,
	55: 7,
	56: 7,
	57: 27,
	58: 7,
	59: 4,
	60: 4,
	61: 4,
	62: 4,
	63: 26,
	64: 9,
	65: 9,
	66: 9,
	67: 13,
	68: 13,
	69: 11,
	70: 10,
	71: 12,
	72: 17,
	73: 16,
	74: 14,
	75: 15,
	76: 18,
	77: 19,
	78: 20,
	79: 22,
	80: 30,
	81: 0,
	82: 0,
	83: 0,
	84: 4,
	85: 28,
	86: 28,
	87: 28,
	88: 0,
	89: 0,
	90: 0,
	91: 0,
	92: 0,
	93: 0,
	94: 0,
	128: 0,
	129: 0,
	130: 0,
	131: 0,
	132: 0,
	133: 0,
	134: 0,
	135: 7,
	136: 4,
	137: 26,
	138: 0,
	139: 0,
	140: 0,
	141: 0,
	142: 0,
	143: 28,
	144: 0,
	145: 0,
	146: 0,
	147: 0,
	148: 6,
	149: 0,
	150: 0,
	151: 0
};
var windowsLanguages = {
	1078: "af",
	1052: "sq",
	1156: "gsw",
	1118: "am",
	5121: "ar-DZ",
	15361: "ar-BH",
	3073: "ar",
	2049: "ar-IQ",
	11265: "ar-JO",
	13313: "ar-KW",
	12289: "ar-LB",
	4097: "ar-LY",
	6145: "ary",
	8193: "ar-OM",
	16385: "ar-QA",
	1025: "ar-SA",
	10241: "ar-SY",
	7169: "aeb",
	14337: "ar-AE",
	9217: "ar-YE",
	1067: "hy",
	1101: "as",
	2092: "az-Cyrl",
	1068: "az",
	1133: "ba",
	1069: "eu",
	1059: "be",
	2117: "bn",
	1093: "bn-IN",
	8218: "bs-Cyrl",
	5146: "bs",
	1150: "br",
	1026: "bg",
	1027: "ca",
	3076: "zh-HK",
	5124: "zh-MO",
	2052: "zh",
	4100: "zh-SG",
	1028: "zh-TW",
	1155: "co",
	1050: "hr",
	4122: "hr-BA",
	1029: "cs",
	1030: "da",
	1164: "prs",
	1125: "dv",
	2067: "nl-BE",
	1043: "nl",
	3081: "en-AU",
	10249: "en-BZ",
	4105: "en-CA",
	9225: "en-029",
	16393: "en-IN",
	6153: "en-IE",
	8201: "en-JM",
	17417: "en-MY",
	5129: "en-NZ",
	13321: "en-PH",
	18441: "en-SG",
	7177: "en-ZA",
	11273: "en-TT",
	2057: "en-GB",
	1033: "en",
	12297: "en-ZW",
	1061: "et",
	1080: "fo",
	1124: "fil",
	1035: "fi",
	2060: "fr-BE",
	3084: "fr-CA",
	1036: "fr",
	5132: "fr-LU",
	6156: "fr-MC",
	4108: "fr-CH",
	1122: "fy",
	1110: "gl",
	1079: "ka",
	3079: "de-AT",
	1031: "de",
	5127: "de-LI",
	4103: "de-LU",
	2055: "de-CH",
	1032: "el",
	1135: "kl",
	1095: "gu",
	1128: "ha",
	1037: "he",
	1081: "hi",
	1038: "hu",
	1039: "is",
	1136: "ig",
	1057: "id",
	1117: "iu",
	2141: "iu-Latn",
	2108: "ga",
	1076: "xh",
	1077: "zu",
	1040: "it",
	2064: "it-CH",
	1041: "ja",
	1099: "kn",
	1087: "kk",
	1107: "km",
	1158: "quc",
	1159: "rw",
	1089: "sw",
	1111: "kok",
	1042: "ko",
	1088: "ky",
	1108: "lo",
	1062: "lv",
	1063: "lt",
	2094: "dsb",
	1134: "lb",
	1071: "mk",
	2110: "ms-BN",
	1086: "ms",
	1100: "ml",
	1082: "mt",
	1153: "mi",
	1146: "arn",
	1102: "mr",
	1148: "moh",
	1104: "mn",
	2128: "mn-CN",
	1121: "ne",
	1044: "nb",
	2068: "nn",
	1154: "oc",
	1096: "or",
	1123: "ps",
	1045: "pl",
	1046: "pt",
	2070: "pt-PT",
	1094: "pa",
	1131: "qu-BO",
	2155: "qu-EC",
	3179: "qu",
	1048: "ro",
	1047: "rm",
	1049: "ru",
	9275: "smn",
	4155: "smj-NO",
	5179: "smj",
	3131: "se-FI",
	1083: "se",
	2107: "se-SE",
	8251: "sms",
	6203: "sma-NO",
	7227: "sms",
	1103: "sa",
	7194: "sr-Cyrl-BA",
	3098: "sr",
	6170: "sr-Latn-BA",
	2074: "sr-Latn",
	1132: "nso",
	1074: "tn",
	1115: "si",
	1051: "sk",
	1060: "sl",
	11274: "es-AR",
	16394: "es-BO",
	13322: "es-CL",
	9226: "es-CO",
	5130: "es-CR",
	7178: "es-DO",
	12298: "es-EC",
	17418: "es-SV",
	4106: "es-GT",
	18442: "es-HN",
	2058: "es-MX",
	19466: "es-NI",
	6154: "es-PA",
	15370: "es-PY",
	10250: "es-PE",
	20490: "es-PR",
	3082: "es",
	1034: "es",
	21514: "es-US",
	14346: "es-UY",
	8202: "es-VE",
	2077: "sv-FI",
	1053: "sv",
	1114: "syr",
	1064: "tg",
	2143: "tzm",
	1097: "ta",
	1092: "tt",
	1098: "te",
	1054: "th",
	1105: "bo",
	1055: "tr",
	1090: "tk",
	1152: "ug",
	1058: "uk",
	1070: "hsb",
	1056: "ur",
	2115: "uz-Cyrl",
	1091: "uz",
	1066: "vi",
	1106: "cy",
	1160: "wo",
	1157: "sah",
	1144: "ii",
	1130: "yo"
};
function getLanguageCode(platformID, languageID, ltag) {
	switch (platformID) {
		case 0:
			if (languageID === 65535) return "und";
			else if (ltag) return ltag[languageID];
			break;
		case 1: return macLanguages[languageID];
		case 3: return windowsLanguages[languageID];
	}
}
var utf16 = "utf-16";
var macScriptEncodings = {
	0: "macintosh",
	1: "x-mac-japanese",
	2: "x-mac-chinesetrad",
	3: "x-mac-korean",
	6: "x-mac-greek",
	7: "x-mac-cyrillic",
	9: "x-mac-devanagai",
	10: "x-mac-gurmukhi",
	11: "x-mac-gujarati",
	12: "x-mac-oriya",
	13: "x-mac-bengali",
	14: "x-mac-tamil",
	15: "x-mac-telugu",
	16: "x-mac-kannada",
	17: "x-mac-malayalam",
	18: "x-mac-sinhalese",
	19: "x-mac-burmese",
	20: "x-mac-khmer",
	21: "x-mac-thai",
	22: "x-mac-lao",
	23: "x-mac-georgian",
	24: "x-mac-armenian",
	25: "x-mac-chinesesimp",
	26: "x-mac-tibetan",
	27: "x-mac-mongolian",
	28: "x-mac-ethiopic",
	29: "x-mac-ce",
	30: "x-mac-vietnamese",
	31: "x-mac-extarabic"
};
var macLanguageEncodings = {
	15: "x-mac-icelandic",
	17: "x-mac-turkish",
	18: "x-mac-croatian",
	24: "x-mac-ce",
	25: "x-mac-ce",
	26: "x-mac-ce",
	27: "x-mac-ce",
	28: "x-mac-ce",
	30: "x-mac-icelandic",
	37: "x-mac-romanian",
	38: "x-mac-ce",
	39: "x-mac-ce",
	40: "x-mac-ce",
	143: "x-mac-inuit",
	146: "x-mac-gaelic"
};
function getEncoding(platformID, encodingID, languageID) {
	switch (platformID) {
		case 0: return utf16;
		case 1: return macLanguageEncodings[languageID] || macScriptEncodings[encodingID];
		case 3:
			if (encodingID === 1 || encodingID === 10) return utf16;
			break;
	}
}
function parseNameTable(data, start, ltag) {
	const name = {};
	const p = new parse_default.Parser(data, start);
	const format = p.parseUShort();
	const count = p.parseUShort();
	const stringOffset = p.offset + p.parseUShort();
	for (let i = 0; i < count; i++) {
		const platformID = p.parseUShort();
		const encodingID = p.parseUShort();
		const languageID = p.parseUShort();
		const nameID = p.parseUShort();
		const property = nameTableNames[nameID] || nameID;
		const byteLength = p.parseUShort();
		const offset = p.parseUShort();
		const language = getLanguageCode(platformID, languageID, ltag);
		const encoding = getEncoding(platformID, encodingID, languageID);
		if (encoding !== void 0 && language !== void 0) {
			let text;
			if (encoding === utf16) text = decode.UTF16(data, stringOffset + offset, byteLength);
			else text = decode.MACSTRING(data, stringOffset + offset, byteLength, encoding);
			if (text) {
				let translations = name[property];
				if (translations === void 0) translations = name[property] = {};
				translations[language] = text;
			}
		}
	}
	if (format === 1) p.parseUShort();
	return name;
}
function reverseDict(dict) {
	const result = {};
	for (let key in dict) result[dict[key]] = parseInt(key);
	return result;
}
function makeNameRecord(platformID, encodingID, languageID, nameID, length, offset) {
	return new table_default.Record("NameRecord", [
		{
			name: "platformID",
			type: "USHORT",
			value: platformID
		},
		{
			name: "encodingID",
			type: "USHORT",
			value: encodingID
		},
		{
			name: "languageID",
			type: "USHORT",
			value: languageID
		},
		{
			name: "nameID",
			type: "USHORT",
			value: nameID
		},
		{
			name: "length",
			type: "USHORT",
			value: length
		},
		{
			name: "offset",
			type: "USHORT",
			value: offset
		}
	]);
}
function findSubArray(needle, haystack) {
	const needleLength = needle.length;
	const limit = haystack.length - needleLength + 1;
	loop: for (let pos = 0; pos < limit; pos++) for (; pos < limit; pos++) {
		for (let k = 0; k < needleLength; k++) if (haystack[pos + k] !== needle[k]) continue loop;
		return pos;
	}
	return -1;
}
function addStringToPool(s, pool) {
	let offset = findSubArray(s, pool);
	if (offset < 0) {
		offset = pool.length;
		let i = 0;
		const len = s.length;
		for (; i < len; ++i) pool.push(s[i]);
	}
	return offset;
}
function makeNameTable(names, ltag) {
	let nameID;
	const nameIDs = [];
	const namesWithNumericKeys = {};
	const nameTableIds = reverseDict(nameTableNames);
	for (let key in names) {
		let id = nameTableIds[key];
		if (id === void 0) id = key;
		nameID = parseInt(id);
		if (isNaN(nameID)) throw new Error("Name table entry \"" + key + "\" does not exist, see nameTableNames for complete list.");
		namesWithNumericKeys[nameID] = names[key];
		nameIDs.push(nameID);
	}
	const macLanguageIds = reverseDict(macLanguages);
	const windowsLanguageIds = reverseDict(windowsLanguages);
	const nameRecords = [];
	const stringPool = [];
	for (let i = 0; i < nameIDs.length; i++) {
		nameID = nameIDs[i];
		const translations = namesWithNumericKeys[nameID];
		for (let lang in translations) {
			const text = translations[lang];
			let macPlatform = 1;
			let macLanguage = macLanguageIds[lang];
			let macScript = macLanguageToScript[macLanguage];
			const macEncoding = getEncoding(macPlatform, macScript, macLanguage);
			let macName = encode.MACSTRING(text, macEncoding);
			if (macName === void 0) {
				macPlatform = 0;
				macLanguage = ltag.indexOf(lang);
				if (macLanguage < 0) {
					macLanguage = ltag.length;
					ltag.push(lang);
				}
				macScript = 4;
				macName = encode.UTF16(text);
			}
			const macNameOffset = addStringToPool(macName, stringPool);
			nameRecords.push(makeNameRecord(macPlatform, macScript, macLanguage, nameID, macName.length, macNameOffset));
			const winLanguage = windowsLanguageIds[lang];
			if (winLanguage !== void 0) {
				const winName = encode.UTF16(text);
				const winNameOffset = addStringToPool(winName, stringPool);
				nameRecords.push(makeNameRecord(3, 1, winLanguage, nameID, winName.length, winNameOffset));
			}
		}
	}
	nameRecords.sort(function(a, b) {
		return a.platformID - b.platformID || a.encodingID - b.encodingID || a.languageID - b.languageID || a.nameID - b.nameID;
	});
	const t = new table_default.Table("name", [
		{
			name: "format",
			type: "USHORT",
			value: 0
		},
		{
			name: "count",
			type: "USHORT",
			value: nameRecords.length
		},
		{
			name: "stringOffset",
			type: "USHORT",
			value: 6 + nameRecords.length * 12
		}
	]);
	for (let r = 0; r < nameRecords.length; r++) t.fields.push({
		name: "record_" + r,
		type: "RECORD",
		value: nameRecords[r]
	});
	t.fields.push({
		name: "strings",
		type: "LITERAL",
		value: stringPool
	});
	return t;
}
var name_default = {
	parse: parseNameTable,
	make: makeNameTable
};
//#endregion
//#region node_modules/opentype.js/src/tables/os2.js
var unicodeRanges = [
	{
		begin: 0,
		end: 127
	},
	{
		begin: 128,
		end: 255
	},
	{
		begin: 256,
		end: 383
	},
	{
		begin: 384,
		end: 591
	},
	{
		begin: 592,
		end: 687
	},
	{
		begin: 688,
		end: 767
	},
	{
		begin: 768,
		end: 879
	},
	{
		begin: 880,
		end: 1023
	},
	{
		begin: 11392,
		end: 11519
	},
	{
		begin: 1024,
		end: 1279
	},
	{
		begin: 1328,
		end: 1423
	},
	{
		begin: 1424,
		end: 1535
	},
	{
		begin: 42240,
		end: 42559
	},
	{
		begin: 1536,
		end: 1791
	},
	{
		begin: 1984,
		end: 2047
	},
	{
		begin: 2304,
		end: 2431
	},
	{
		begin: 2432,
		end: 2559
	},
	{
		begin: 2560,
		end: 2687
	},
	{
		begin: 2688,
		end: 2815
	},
	{
		begin: 2816,
		end: 2943
	},
	{
		begin: 2944,
		end: 3071
	},
	{
		begin: 3072,
		end: 3199
	},
	{
		begin: 3200,
		end: 3327
	},
	{
		begin: 3328,
		end: 3455
	},
	{
		begin: 3584,
		end: 3711
	},
	{
		begin: 3712,
		end: 3839
	},
	{
		begin: 4256,
		end: 4351
	},
	{
		begin: 6912,
		end: 7039
	},
	{
		begin: 4352,
		end: 4607
	},
	{
		begin: 7680,
		end: 7935
	},
	{
		begin: 7936,
		end: 8191
	},
	{
		begin: 8192,
		end: 8303
	},
	{
		begin: 8304,
		end: 8351
	},
	{
		begin: 8352,
		end: 8399
	},
	{
		begin: 8400,
		end: 8447
	},
	{
		begin: 8448,
		end: 8527
	},
	{
		begin: 8528,
		end: 8591
	},
	{
		begin: 8592,
		end: 8703
	},
	{
		begin: 8704,
		end: 8959
	},
	{
		begin: 8960,
		end: 9215
	},
	{
		begin: 9216,
		end: 9279
	},
	{
		begin: 9280,
		end: 9311
	},
	{
		begin: 9312,
		end: 9471
	},
	{
		begin: 9472,
		end: 9599
	},
	{
		begin: 9600,
		end: 9631
	},
	{
		begin: 9632,
		end: 9727
	},
	{
		begin: 9728,
		end: 9983
	},
	{
		begin: 9984,
		end: 10175
	},
	{
		begin: 12288,
		end: 12351
	},
	{
		begin: 12352,
		end: 12447
	},
	{
		begin: 12448,
		end: 12543
	},
	{
		begin: 12544,
		end: 12591
	},
	{
		begin: 12592,
		end: 12687
	},
	{
		begin: 43072,
		end: 43135
	},
	{
		begin: 12800,
		end: 13055
	},
	{
		begin: 13056,
		end: 13311
	},
	{
		begin: 44032,
		end: 55215
	},
	{
		begin: 55296,
		end: 57343
	},
	{
		begin: 67840,
		end: 67871
	},
	{
		begin: 19968,
		end: 40959
	},
	{
		begin: 57344,
		end: 63743
	},
	{
		begin: 12736,
		end: 12783
	},
	{
		begin: 64256,
		end: 64335
	},
	{
		begin: 64336,
		end: 65023
	},
	{
		begin: 65056,
		end: 65071
	},
	{
		begin: 65040,
		end: 65055
	},
	{
		begin: 65104,
		end: 65135
	},
	{
		begin: 65136,
		end: 65279
	},
	{
		begin: 65280,
		end: 65519
	},
	{
		begin: 65520,
		end: 65535
	},
	{
		begin: 3840,
		end: 4095
	},
	{
		begin: 1792,
		end: 1871
	},
	{
		begin: 1920,
		end: 1983
	},
	{
		begin: 3456,
		end: 3583
	},
	{
		begin: 4096,
		end: 4255
	},
	{
		begin: 4608,
		end: 4991
	},
	{
		begin: 5024,
		end: 5119
	},
	{
		begin: 5120,
		end: 5759
	},
	{
		begin: 5760,
		end: 5791
	},
	{
		begin: 5792,
		end: 5887
	},
	{
		begin: 6016,
		end: 6143
	},
	{
		begin: 6144,
		end: 6319
	},
	{
		begin: 10240,
		end: 10495
	},
	{
		begin: 40960,
		end: 42127
	},
	{
		begin: 5888,
		end: 5919
	},
	{
		begin: 66304,
		end: 66351
	},
	{
		begin: 66352,
		end: 66383
	},
	{
		begin: 66560,
		end: 66639
	},
	{
		begin: 118784,
		end: 119039
	},
	{
		begin: 119808,
		end: 120831
	},
	{
		begin: 1044480,
		end: 1048573
	},
	{
		begin: 65024,
		end: 65039
	},
	{
		begin: 917504,
		end: 917631
	},
	{
		begin: 6400,
		end: 6479
	},
	{
		begin: 6480,
		end: 6527
	},
	{
		begin: 6528,
		end: 6623
	},
	{
		begin: 6656,
		end: 6687
	},
	{
		begin: 11264,
		end: 11359
	},
	{
		begin: 11568,
		end: 11647
	},
	{
		begin: 19904,
		end: 19967
	},
	{
		begin: 43008,
		end: 43055
	},
	{
		begin: 65536,
		end: 65663
	},
	{
		begin: 65856,
		end: 65935
	},
	{
		begin: 66432,
		end: 66463
	},
	{
		begin: 66464,
		end: 66527
	},
	{
		begin: 66640,
		end: 66687
	},
	{
		begin: 66688,
		end: 66735
	},
	{
		begin: 67584,
		end: 67647
	},
	{
		begin: 68096,
		end: 68191
	},
	{
		begin: 119552,
		end: 119647
	},
	{
		begin: 73728,
		end: 74751
	},
	{
		begin: 119648,
		end: 119679
	},
	{
		begin: 7040,
		end: 7103
	},
	{
		begin: 7168,
		end: 7247
	},
	{
		begin: 7248,
		end: 7295
	},
	{
		begin: 43136,
		end: 43231
	},
	{
		begin: 43264,
		end: 43311
	},
	{
		begin: 43312,
		end: 43359
	},
	{
		begin: 43520,
		end: 43615
	},
	{
		begin: 65936,
		end: 65999
	},
	{
		begin: 66e3,
		end: 66047
	},
	{
		begin: 66208,
		end: 66271
	},
	{
		begin: 127024,
		end: 127135
	}
];
function getUnicodeRange(unicode) {
	for (let i = 0; i < unicodeRanges.length; i += 1) {
		const range = unicodeRanges[i];
		if (unicode >= range.begin && unicode < range.end) return i;
	}
	return -1;
}
function parseOS2Table(data, start) {
	const os2 = {};
	const p = new parse_default.Parser(data, start);
	os2.version = p.parseUShort();
	os2.xAvgCharWidth = p.parseShort();
	os2.usWeightClass = p.parseUShort();
	os2.usWidthClass = p.parseUShort();
	os2.fsType = p.parseUShort();
	os2.ySubscriptXSize = p.parseShort();
	os2.ySubscriptYSize = p.parseShort();
	os2.ySubscriptXOffset = p.parseShort();
	os2.ySubscriptYOffset = p.parseShort();
	os2.ySuperscriptXSize = p.parseShort();
	os2.ySuperscriptYSize = p.parseShort();
	os2.ySuperscriptXOffset = p.parseShort();
	os2.ySuperscriptYOffset = p.parseShort();
	os2.yStrikeoutSize = p.parseShort();
	os2.yStrikeoutPosition = p.parseShort();
	os2.sFamilyClass = p.parseShort();
	os2.panose = [];
	for (let i = 0; i < 10; i++) os2.panose[i] = p.parseByte();
	os2.ulUnicodeRange1 = p.parseULong();
	os2.ulUnicodeRange2 = p.parseULong();
	os2.ulUnicodeRange3 = p.parseULong();
	os2.ulUnicodeRange4 = p.parseULong();
	os2.achVendID = String.fromCharCode(p.parseByte(), p.parseByte(), p.parseByte(), p.parseByte());
	os2.fsSelection = p.parseUShort();
	os2.usFirstCharIndex = p.parseUShort();
	os2.usLastCharIndex = p.parseUShort();
	os2.sTypoAscender = p.parseShort();
	os2.sTypoDescender = p.parseShort();
	os2.sTypoLineGap = p.parseShort();
	os2.usWinAscent = p.parseUShort();
	os2.usWinDescent = p.parseUShort();
	if (os2.version >= 1) {
		os2.ulCodePageRange1 = p.parseULong();
		os2.ulCodePageRange2 = p.parseULong();
	}
	if (os2.version >= 2) {
		os2.sxHeight = p.parseShort();
		os2.sCapHeight = p.parseShort();
		os2.usDefaultChar = p.parseUShort();
		os2.usBreakChar = p.parseUShort();
		os2.usMaxContent = p.parseUShort();
	}
	return os2;
}
function makeOS2Table(options) {
	return new table_default.Table("OS/2", [
		{
			name: "version",
			type: "USHORT",
			value: 3
		},
		{
			name: "xAvgCharWidth",
			type: "SHORT",
			value: 0
		},
		{
			name: "usWeightClass",
			type: "USHORT",
			value: 0
		},
		{
			name: "usWidthClass",
			type: "USHORT",
			value: 0
		},
		{
			name: "fsType",
			type: "USHORT",
			value: 0
		},
		{
			name: "ySubscriptXSize",
			type: "SHORT",
			value: 650
		},
		{
			name: "ySubscriptYSize",
			type: "SHORT",
			value: 699
		},
		{
			name: "ySubscriptXOffset",
			type: "SHORT",
			value: 0
		},
		{
			name: "ySubscriptYOffset",
			type: "SHORT",
			value: 140
		},
		{
			name: "ySuperscriptXSize",
			type: "SHORT",
			value: 650
		},
		{
			name: "ySuperscriptYSize",
			type: "SHORT",
			value: 699
		},
		{
			name: "ySuperscriptXOffset",
			type: "SHORT",
			value: 0
		},
		{
			name: "ySuperscriptYOffset",
			type: "SHORT",
			value: 479
		},
		{
			name: "yStrikeoutSize",
			type: "SHORT",
			value: 49
		},
		{
			name: "yStrikeoutPosition",
			type: "SHORT",
			value: 258
		},
		{
			name: "sFamilyClass",
			type: "SHORT",
			value: 0
		},
		{
			name: "bFamilyType",
			type: "BYTE",
			value: 0
		},
		{
			name: "bSerifStyle",
			type: "BYTE",
			value: 0
		},
		{
			name: "bWeight",
			type: "BYTE",
			value: 0
		},
		{
			name: "bProportion",
			type: "BYTE",
			value: 0
		},
		{
			name: "bContrast",
			type: "BYTE",
			value: 0
		},
		{
			name: "bStrokeVariation",
			type: "BYTE",
			value: 0
		},
		{
			name: "bArmStyle",
			type: "BYTE",
			value: 0
		},
		{
			name: "bLetterform",
			type: "BYTE",
			value: 0
		},
		{
			name: "bMidline",
			type: "BYTE",
			value: 0
		},
		{
			name: "bXHeight",
			type: "BYTE",
			value: 0
		},
		{
			name: "ulUnicodeRange1",
			type: "ULONG",
			value: 0
		},
		{
			name: "ulUnicodeRange2",
			type: "ULONG",
			value: 0
		},
		{
			name: "ulUnicodeRange3",
			type: "ULONG",
			value: 0
		},
		{
			name: "ulUnicodeRange4",
			type: "ULONG",
			value: 0
		},
		{
			name: "achVendID",
			type: "CHARARRAY",
			value: "XXXX"
		},
		{
			name: "fsSelection",
			type: "USHORT",
			value: 0
		},
		{
			name: "usFirstCharIndex",
			type: "USHORT",
			value: 0
		},
		{
			name: "usLastCharIndex",
			type: "USHORT",
			value: 0
		},
		{
			name: "sTypoAscender",
			type: "SHORT",
			value: 0
		},
		{
			name: "sTypoDescender",
			type: "SHORT",
			value: 0
		},
		{
			name: "sTypoLineGap",
			type: "SHORT",
			value: 0
		},
		{
			name: "usWinAscent",
			type: "USHORT",
			value: 0
		},
		{
			name: "usWinDescent",
			type: "USHORT",
			value: 0
		},
		{
			name: "ulCodePageRange1",
			type: "ULONG",
			value: 0
		},
		{
			name: "ulCodePageRange2",
			type: "ULONG",
			value: 0
		},
		{
			name: "sxHeight",
			type: "SHORT",
			value: 0
		},
		{
			name: "sCapHeight",
			type: "SHORT",
			value: 0
		},
		{
			name: "usDefaultChar",
			type: "USHORT",
			value: 0
		},
		{
			name: "usBreakChar",
			type: "USHORT",
			value: 0
		},
		{
			name: "usMaxContext",
			type: "USHORT",
			value: 0
		}
	], options);
}
var os2_default = {
	parse: parseOS2Table,
	make: makeOS2Table,
	unicodeRanges,
	getUnicodeRange
};
//#endregion
//#region node_modules/opentype.js/src/tables/post.js
function parsePostTable(data, start) {
	const post = {};
	const p = new parse_default.Parser(data, start);
	post.version = p.parseVersion();
	post.italicAngle = p.parseFixed();
	post.underlinePosition = p.parseShort();
	post.underlineThickness = p.parseShort();
	post.isFixedPitch = p.parseULong();
	post.minMemType42 = p.parseULong();
	post.maxMemType42 = p.parseULong();
	post.minMemType1 = p.parseULong();
	post.maxMemType1 = p.parseULong();
	switch (post.version) {
		case 1:
			post.names = standardNames.slice();
			break;
		case 2:
			post.numberOfGlyphs = p.parseUShort();
			post.glyphNameIndex = new Array(post.numberOfGlyphs);
			for (let i = 0; i < post.numberOfGlyphs; i++) post.glyphNameIndex[i] = p.parseUShort();
			post.names = [];
			for (let i = 0; i < post.numberOfGlyphs; i++) if (post.glyphNameIndex[i] >= standardNames.length) {
				const nameLength = p.parseChar();
				post.names.push(p.parseString(nameLength));
			}
			break;
		case 2.5:
			post.numberOfGlyphs = p.parseUShort();
			post.offset = new Array(post.numberOfGlyphs);
			for (let i = 0; i < post.numberOfGlyphs; i++) post.offset[i] = p.parseChar();
			break;
	}
	return post;
}
function makePostTable() {
	return new table_default.Table("post", [
		{
			name: "version",
			type: "FIXED",
			value: 196608
		},
		{
			name: "italicAngle",
			type: "FIXED",
			value: 0
		},
		{
			name: "underlinePosition",
			type: "FWORD",
			value: 0
		},
		{
			name: "underlineThickness",
			type: "FWORD",
			value: 0
		},
		{
			name: "isFixedPitch",
			type: "ULONG",
			value: 0
		},
		{
			name: "minMemType42",
			type: "ULONG",
			value: 0
		},
		{
			name: "maxMemType42",
			type: "ULONG",
			value: 0
		},
		{
			name: "minMemType1",
			type: "ULONG",
			value: 0
		},
		{
			name: "maxMemType1",
			type: "ULONG",
			value: 0
		}
	]);
}
var post_default = {
	parse: parsePostTable,
	make: makePostTable
};
//#endregion
//#region node_modules/opentype.js/src/tables/gsub.js
var subtableParsers = new Array(9);
subtableParsers[1] = function parseLookup1() {
	const start = this.offset + this.relativeOffset;
	const substFormat = this.parseUShort();
	if (substFormat === 1) return {
		substFormat: 1,
		coverage: this.parsePointer(Parser.coverage),
		deltaGlyphId: this.parseUShort()
	};
	else if (substFormat === 2) return {
		substFormat: 2,
		coverage: this.parsePointer(Parser.coverage),
		substitute: this.parseOffset16List()
	};
	check_default.assert(false, "0x" + start.toString(16) + ": lookup type 1 format must be 1 or 2.");
};
subtableParsers[2] = function parseLookup2() {
	const substFormat = this.parseUShort();
	check_default.argument(substFormat === 1, "GSUB Multiple Substitution Subtable identifier-format must be 1");
	return {
		substFormat,
		coverage: this.parsePointer(Parser.coverage),
		sequences: this.parseListOfLists()
	};
};
subtableParsers[3] = function parseLookup3() {
	const substFormat = this.parseUShort();
	check_default.argument(substFormat === 1, "GSUB Alternate Substitution Subtable identifier-format must be 1");
	return {
		substFormat,
		coverage: this.parsePointer(Parser.coverage),
		alternateSets: this.parseListOfLists()
	};
};
subtableParsers[4] = function parseLookup4() {
	const substFormat = this.parseUShort();
	check_default.argument(substFormat === 1, "GSUB ligature table identifier-format must be 1");
	return {
		substFormat,
		coverage: this.parsePointer(Parser.coverage),
		ligatureSets: this.parseListOfLists(function() {
			return {
				ligGlyph: this.parseUShort(),
				components: this.parseUShortList(this.parseUShort() - 1)
			};
		})
	};
};
var lookupRecordDesc = {
	sequenceIndex: Parser.uShort,
	lookupListIndex: Parser.uShort
};
subtableParsers[5] = function parseLookup5() {
	const start = this.offset + this.relativeOffset;
	const substFormat = this.parseUShort();
	if (substFormat === 1) return {
		substFormat,
		coverage: this.parsePointer(Parser.coverage),
		ruleSets: this.parseListOfLists(function() {
			const glyphCount = this.parseUShort();
			const substCount = this.parseUShort();
			return {
				input: this.parseUShortList(glyphCount - 1),
				lookupRecords: this.parseRecordList(substCount, lookupRecordDesc)
			};
		})
	};
	else if (substFormat === 2) return {
		substFormat,
		coverage: this.parsePointer(Parser.coverage),
		classDef: this.parsePointer(Parser.classDef),
		classSets: this.parseListOfLists(function() {
			const glyphCount = this.parseUShort();
			const substCount = this.parseUShort();
			return {
				classes: this.parseUShortList(glyphCount - 1),
				lookupRecords: this.parseRecordList(substCount, lookupRecordDesc)
			};
		})
	};
	else if (substFormat === 3) {
		const glyphCount = this.parseUShort();
		const substCount = this.parseUShort();
		return {
			substFormat,
			coverages: this.parseList(glyphCount, Parser.pointer(Parser.coverage)),
			lookupRecords: this.parseRecordList(substCount, lookupRecordDesc)
		};
	}
	check_default.assert(false, "0x" + start.toString(16) + ": lookup type 5 format must be 1, 2 or 3.");
};
subtableParsers[6] = function parseLookup6() {
	const start = this.offset + this.relativeOffset;
	const substFormat = this.parseUShort();
	if (substFormat === 1) return {
		substFormat: 1,
		coverage: this.parsePointer(Parser.coverage),
		chainRuleSets: this.parseListOfLists(function() {
			return {
				backtrack: this.parseUShortList(),
				input: this.parseUShortList(this.parseShort() - 1),
				lookahead: this.parseUShortList(),
				lookupRecords: this.parseRecordList(lookupRecordDesc)
			};
		})
	};
	else if (substFormat === 2) return {
		substFormat: 2,
		coverage: this.parsePointer(Parser.coverage),
		backtrackClassDef: this.parsePointer(Parser.classDef),
		inputClassDef: this.parsePointer(Parser.classDef),
		lookaheadClassDef: this.parsePointer(Parser.classDef),
		chainClassSet: this.parseListOfLists(function() {
			return {
				backtrack: this.parseUShortList(),
				input: this.parseUShortList(this.parseShort() - 1),
				lookahead: this.parseUShortList(),
				lookupRecords: this.parseRecordList(lookupRecordDesc)
			};
		})
	};
	else if (substFormat === 3) return {
		substFormat: 3,
		backtrackCoverage: this.parseList(Parser.pointer(Parser.coverage)),
		inputCoverage: this.parseList(Parser.pointer(Parser.coverage)),
		lookaheadCoverage: this.parseList(Parser.pointer(Parser.coverage)),
		lookupRecords: this.parseRecordList(lookupRecordDesc)
	};
	check_default.assert(false, "0x" + start.toString(16) + ": lookup type 6 format must be 1, 2 or 3.");
};
subtableParsers[7] = function parseLookup7() {
	const substFormat = this.parseUShort();
	check_default.argument(substFormat === 1, "GSUB Extension Substitution subtable identifier-format must be 1");
	const extensionLookupType = this.parseUShort();
	const extensionParser = new Parser(this.data, this.offset + this.parseULong());
	return {
		substFormat: 1,
		lookupType: extensionLookupType,
		extension: subtableParsers[extensionLookupType].call(extensionParser)
	};
};
subtableParsers[8] = function parseLookup8() {
	const substFormat = this.parseUShort();
	check_default.argument(substFormat === 1, "GSUB Reverse Chaining Contextual Single Substitution Subtable identifier-format must be 1");
	return {
		substFormat,
		coverage: this.parsePointer(Parser.coverage),
		backtrackCoverage: this.parseList(Parser.pointer(Parser.coverage)),
		lookaheadCoverage: this.parseList(Parser.pointer(Parser.coverage)),
		substitutes: this.parseUShortList()
	};
};
function parseGsubTable(data, start) {
	start = start || 0;
	const p = new Parser(data, start);
	const tableVersion = p.parseVersion();
	check_default.argument(tableVersion === 1, "Unsupported GSUB table version.");
	return {
		version: tableVersion,
		scripts: p.parseScriptList(),
		features: p.parseFeatureList(),
		lookups: p.parseLookupList(subtableParsers)
	};
}
var subtableMakers = new Array(9);
subtableMakers[1] = function makeLookup1(subtable) {
	if (subtable.substFormat === 1) return new table_default.Table("substitutionTable", [
		{
			name: "substFormat",
			type: "USHORT",
			value: 1
		},
		{
			name: "coverage",
			type: "TABLE",
			value: new table_default.Coverage(subtable.coverage)
		},
		{
			name: "deltaGlyphID",
			type: "USHORT",
			value: subtable.deltaGlyphId
		}
	]);
	else return new table_default.Table("substitutionTable", [{
		name: "substFormat",
		type: "USHORT",
		value: 2
	}, {
		name: "coverage",
		type: "TABLE",
		value: new table_default.Coverage(subtable.coverage)
	}].concat(table_default.ushortList("substitute", subtable.substitute)));
	check_default.fail("Lookup type 1 substFormat must be 1 or 2.");
};
subtableMakers[3] = function makeLookup3(subtable) {
	check_default.assert(subtable.substFormat === 1, "Lookup type 3 substFormat must be 1.");
	return new table_default.Table("substitutionTable", [{
		name: "substFormat",
		type: "USHORT",
		value: 1
	}, {
		name: "coverage",
		type: "TABLE",
		value: new table_default.Coverage(subtable.coverage)
	}].concat(table_default.tableList("altSet", subtable.alternateSets, function(alternateSet) {
		return new table_default.Table("alternateSetTable", table_default.ushortList("alternate", alternateSet));
	})));
};
subtableMakers[4] = function makeLookup4(subtable) {
	check_default.assert(subtable.substFormat === 1, "Lookup type 4 substFormat must be 1.");
	return new table_default.Table("substitutionTable", [{
		name: "substFormat",
		type: "USHORT",
		value: 1
	}, {
		name: "coverage",
		type: "TABLE",
		value: new table_default.Coverage(subtable.coverage)
	}].concat(table_default.tableList("ligSet", subtable.ligatureSets, function(ligatureSet) {
		return new table_default.Table("ligatureSetTable", table_default.tableList("ligature", ligatureSet, function(ligature) {
			return new table_default.Table("ligatureTable", [{
				name: "ligGlyph",
				type: "USHORT",
				value: ligature.ligGlyph
			}].concat(table_default.ushortList("component", ligature.components, ligature.components.length + 1)));
		}));
	})));
};
function makeGsubTable(gsub) {
	return new table_default.Table("GSUB", [
		{
			name: "version",
			type: "ULONG",
			value: 65536
		},
		{
			name: "scripts",
			type: "TABLE",
			value: new table_default.ScriptList(gsub.scripts)
		},
		{
			name: "features",
			type: "TABLE",
			value: new table_default.FeatureList(gsub.features)
		},
		{
			name: "lookups",
			type: "TABLE",
			value: new table_default.LookupList(gsub.lookups, subtableMakers)
		}
	]);
}
var gsub_default = {
	parse: parseGsubTable,
	make: makeGsubTable
};
//#endregion
//#region node_modules/opentype.js/src/tables/meta.js
function parseMetaTable(data, start) {
	const p = new parse_default.Parser(data, start);
	const tableVersion = p.parseULong();
	check_default.argument(tableVersion === 1, "Unsupported META table version.");
	p.parseULong();
	p.parseULong();
	const numDataMaps = p.parseULong();
	const tags = {};
	for (let i = 0; i < numDataMaps; i++) {
		const tag = p.parseTag();
		const dataOffset = p.parseULong();
		const dataLength = p.parseULong();
		tags[tag] = decode.UTF8(data, start + dataOffset, dataLength);
	}
	return tags;
}
function makeMetaTable(tags) {
	const numTags = Object.keys(tags).length;
	let stringPool = "";
	const stringPoolOffset = 16 + numTags * 12;
	const result = new table_default.Table("meta", [
		{
			name: "version",
			type: "ULONG",
			value: 1
		},
		{
			name: "flags",
			type: "ULONG",
			value: 0
		},
		{
			name: "offset",
			type: "ULONG",
			value: stringPoolOffset
		},
		{
			name: "numTags",
			type: "ULONG",
			value: numTags
		}
	]);
	for (let tag in tags) {
		const pos = stringPool.length;
		stringPool += tags[tag];
		result.fields.push({
			name: "tag " + tag,
			type: "TAG",
			value: tag
		});
		result.fields.push({
			name: "offset " + tag,
			type: "ULONG",
			value: stringPoolOffset + pos
		});
		result.fields.push({
			name: "length " + tag,
			type: "ULONG",
			value: tags[tag].length
		});
	}
	result.fields.push({
		name: "stringPool",
		type: "CHARARRAY",
		value: stringPool
	});
	return result;
}
var meta_default = {
	parse: parseMetaTable,
	make: makeMetaTable
};
//#endregion
//#region node_modules/opentype.js/src/tables/sfnt.js
function log2(v) {
	return Math.log(v) / Math.log(2) | 0;
}
function computeCheckSum(bytes) {
	while (bytes.length % 4 !== 0) bytes.push(0);
	let sum = 0;
	for (let i = 0; i < bytes.length; i += 4) sum += (bytes[i] << 24) + (bytes[i + 1] << 16) + (bytes[i + 2] << 8) + bytes[i + 3];
	sum %= Math.pow(2, 32);
	return sum;
}
function makeTableRecord(tag, checkSum, offset, length) {
	return new table_default.Record("Table Record", [
		{
			name: "tag",
			type: "TAG",
			value: tag !== void 0 ? tag : ""
		},
		{
			name: "checkSum",
			type: "ULONG",
			value: checkSum !== void 0 ? checkSum : 0
		},
		{
			name: "offset",
			type: "ULONG",
			value: offset !== void 0 ? offset : 0
		},
		{
			name: "length",
			type: "ULONG",
			value: length !== void 0 ? length : 0
		}
	]);
}
function makeSfntTable(tables) {
	const sfnt = new table_default.Table("sfnt", [
		{
			name: "version",
			type: "TAG",
			value: "OTTO"
		},
		{
			name: "numTables",
			type: "USHORT",
			value: 0
		},
		{
			name: "searchRange",
			type: "USHORT",
			value: 0
		},
		{
			name: "entrySelector",
			type: "USHORT",
			value: 0
		},
		{
			name: "rangeShift",
			type: "USHORT",
			value: 0
		}
	]);
	sfnt.tables = tables;
	sfnt.numTables = tables.length;
	const highestPowerOf2 = Math.pow(2, log2(sfnt.numTables));
	sfnt.searchRange = 16 * highestPowerOf2;
	sfnt.entrySelector = log2(highestPowerOf2);
	sfnt.rangeShift = sfnt.numTables * 16 - sfnt.searchRange;
	const recordFields = [];
	const tableFields = [];
	let offset = sfnt.sizeOf() + makeTableRecord().sizeOf() * sfnt.numTables;
	while (offset % 4 !== 0) {
		offset += 1;
		tableFields.push({
			name: "padding",
			type: "BYTE",
			value: 0
		});
	}
	for (let i = 0; i < tables.length; i += 1) {
		const t = tables[i];
		check_default.argument(t.tableName.length === 4, "Table name" + t.tableName + " is invalid.");
		const tableLength = t.sizeOf();
		const tableRecord = makeTableRecord(t.tableName, computeCheckSum(t.encode()), offset, tableLength);
		recordFields.push({
			name: tableRecord.tag + " Table Record",
			type: "RECORD",
			value: tableRecord
		});
		tableFields.push({
			name: t.tableName + " table",
			type: "RECORD",
			value: t
		});
		offset += tableLength;
		check_default.argument(!isNaN(offset), "Something went wrong calculating the offset.");
		while (offset % 4 !== 0) {
			offset += 1;
			tableFields.push({
				name: "padding",
				type: "BYTE",
				value: 0
			});
		}
	}
	recordFields.sort(function(r1, r2) {
		if (r1.value.tag > r2.value.tag) return 1;
		else return -1;
	});
	sfnt.fields = sfnt.fields.concat(recordFields);
	sfnt.fields = sfnt.fields.concat(tableFields);
	return sfnt;
}
function metricsForChar(font, chars, notFoundMetrics) {
	for (let i = 0; i < chars.length; i += 1) {
		const glyphIndex = font.charToGlyphIndex(chars[i]);
		if (glyphIndex > 0) return font.glyphs.get(glyphIndex).getMetrics();
	}
	return notFoundMetrics;
}
function average(vs) {
	let sum = 0;
	for (let i = 0; i < vs.length; i += 1) sum += vs[i];
	return sum / vs.length;
}
function fontToSfntTable(font) {
	const xMins = [];
	const yMins = [];
	const xMaxs = [];
	const yMaxs = [];
	const advanceWidths = [];
	const leftSideBearings = [];
	const rightSideBearings = [];
	let firstCharIndex;
	let lastCharIndex = 0;
	let ulUnicodeRange1 = 0;
	let ulUnicodeRange2 = 0;
	let ulUnicodeRange3 = 0;
	let ulUnicodeRange4 = 0;
	for (let i = 0; i < font.glyphs.length; i += 1) {
		const glyph = font.glyphs.get(i);
		const unicode = glyph.unicode | 0;
		if (isNaN(glyph.advanceWidth)) throw new Error("Glyph " + glyph.name + " (" + i + "): advanceWidth is not a number.");
		if (firstCharIndex > unicode || firstCharIndex === void 0) {
			if (unicode > 0) firstCharIndex = unicode;
		}
		if (lastCharIndex < unicode) lastCharIndex = unicode;
		const position = os2_default.getUnicodeRange(unicode);
		if (position < 32) ulUnicodeRange1 |= 1 << position;
		else if (position < 64) ulUnicodeRange2 |= 1 << position - 32;
		else if (position < 96) ulUnicodeRange3 |= 1 << position - 64;
		else if (position < 123) ulUnicodeRange4 |= 1 << position - 96;
		else throw new Error("Unicode ranges bits > 123 are reserved for internal usage");
		if (glyph.name === ".notdef") continue;
		const metrics = glyph.getMetrics();
		xMins.push(metrics.xMin);
		yMins.push(metrics.yMin);
		xMaxs.push(metrics.xMax);
		yMaxs.push(metrics.yMax);
		leftSideBearings.push(metrics.leftSideBearing);
		rightSideBearings.push(metrics.rightSideBearing);
		advanceWidths.push(glyph.advanceWidth);
	}
	const globals = {
		xMin: Math.min.apply(null, xMins),
		yMin: Math.min.apply(null, yMins),
		xMax: Math.max.apply(null, xMaxs),
		yMax: Math.max.apply(null, yMaxs),
		advanceWidthMax: Math.max.apply(null, advanceWidths),
		advanceWidthAvg: average(advanceWidths),
		minLeftSideBearing: Math.min.apply(null, leftSideBearings),
		maxLeftSideBearing: Math.max.apply(null, leftSideBearings),
		minRightSideBearing: Math.min.apply(null, rightSideBearings)
	};
	globals.ascender = font.ascender;
	globals.descender = font.descender;
	const headTable = head_default.make({
		flags: 3,
		unitsPerEm: font.unitsPerEm,
		xMin: globals.xMin,
		yMin: globals.yMin,
		xMax: globals.xMax,
		yMax: globals.yMax,
		lowestRecPPEM: 3,
		createdTimestamp: font.createdTimestamp
	});
	const hheaTable = hhea_default.make({
		ascender: globals.ascender,
		descender: globals.descender,
		advanceWidthMax: globals.advanceWidthMax,
		minLeftSideBearing: globals.minLeftSideBearing,
		minRightSideBearing: globals.minRightSideBearing,
		xMaxExtent: globals.maxLeftSideBearing + (globals.xMax - globals.xMin),
		numberOfHMetrics: font.glyphs.length
	});
	const maxpTable = maxp_default.make(font.glyphs.length);
	const os2Table = os2_default.make({
		xAvgCharWidth: Math.round(globals.advanceWidthAvg),
		usWeightClass: font.tables.os2.usWeightClass,
		usWidthClass: font.tables.os2.usWidthClass,
		usFirstCharIndex: firstCharIndex,
		usLastCharIndex: lastCharIndex,
		ulUnicodeRange1,
		ulUnicodeRange2,
		ulUnicodeRange3,
		ulUnicodeRange4,
		fsSelection: font.tables.os2.fsSelection,
		sTypoAscender: globals.ascender,
		sTypoDescender: globals.descender,
		sTypoLineGap: 0,
		usWinAscent: globals.yMax,
		usWinDescent: Math.abs(globals.yMin),
		ulCodePageRange1: 1,
		sxHeight: metricsForChar(font, "xyvw", { yMax: Math.round(globals.ascender / 2) }).yMax,
		sCapHeight: metricsForChar(font, "HIKLEFJMNTZBDPRAGOQSUVWXY", globals).yMax,
		usDefaultChar: font.hasChar(" ") ? 32 : 0,
		usBreakChar: font.hasChar(" ") ? 32 : 0
	});
	const hmtxTable = hmtx_default.make(font.glyphs);
	const cmapTable = cmap_default.make(font.glyphs);
	const englishFamilyName = font.getEnglishName("fontFamily");
	const englishStyleName = font.getEnglishName("fontSubfamily");
	const englishFullName = englishFamilyName + " " + englishStyleName;
	let postScriptName = font.getEnglishName("postScriptName");
	if (!postScriptName) postScriptName = englishFamilyName.replace(/\s/g, "") + "-" + englishStyleName;
	const names = {};
	for (let n in font.names) names[n] = font.names[n];
	if (!names.uniqueID) names.uniqueID = { en: font.getEnglishName("manufacturer") + ":" + englishFullName };
	if (!names.postScriptName) names.postScriptName = { en: postScriptName };
	if (!names.preferredFamily) names.preferredFamily = font.names.fontFamily;
	if (!names.preferredSubfamily) names.preferredSubfamily = font.names.fontSubfamily;
	const languageTags = [];
	const nameTable = name_default.make(names, languageTags);
	const ltagTable = languageTags.length > 0 ? ltag_default.make(languageTags) : void 0;
	const postTable = post_default.make();
	const cffTable = cff_default.make(font.glyphs, {
		version: font.getEnglishName("version"),
		fullName: englishFullName,
		familyName: englishFamilyName,
		weightName: englishStyleName,
		postScriptName,
		unitsPerEm: font.unitsPerEm,
		fontBBox: [
			0,
			globals.yMin,
			globals.ascender,
			globals.advanceWidthMax
		]
	});
	const metaTable = font.metas && Object.keys(font.metas).length > 0 ? meta_default.make(font.metas) : void 0;
	const tables = [
		headTable,
		hheaTable,
		maxpTable,
		os2Table,
		nameTable,
		cmapTable,
		postTable,
		cffTable,
		hmtxTable
	];
	if (ltagTable) tables.push(ltagTable);
	if (font.tables.gsub) tables.push(gsub_default.make(font.tables.gsub));
	if (metaTable) tables.push(metaTable);
	const sfntTable = makeSfntTable(tables);
	const checkSum = computeCheckSum(sfntTable.encode());
	const tableFields = sfntTable.fields;
	let checkSumAdjusted = false;
	for (let i = 0; i < tableFields.length; i += 1) if (tableFields[i].name === "head table") {
		tableFields[i].value.checkSumAdjustment = 2981146554 - checkSum;
		checkSumAdjusted = true;
		break;
	}
	if (!checkSumAdjusted) throw new Error("Could not find head table with checkSum to adjust.");
	return sfntTable;
}
var sfnt_default = {
	make: makeSfntTable,
	fontToTable: fontToSfntTable,
	computeCheckSum
};
//#endregion
//#region node_modules/opentype.js/src/layout.js
function searchTag(arr, tag) {
	let imin = 0;
	let imax = arr.length - 1;
	while (imin <= imax) {
		const imid = imin + imax >>> 1;
		const val = arr[imid].tag;
		if (val === tag) return imid;
		else if (val < tag) imin = imid + 1;
		else imax = imid - 1;
	}
	return -imin - 1;
}
function binSearch(arr, value) {
	let imin = 0;
	let imax = arr.length - 1;
	while (imin <= imax) {
		const imid = imin + imax >>> 1;
		const val = arr[imid];
		if (val === value) return imid;
		else if (val < value) imin = imid + 1;
		else imax = imid - 1;
	}
	return -imin - 1;
}
/**
* @exports opentype.Layout
* @class
*/
function Layout(font, tableName) {
	this.font = font;
	this.tableName = tableName;
}
Layout.prototype = {
	/**
	* Binary search an object by "tag" property
	* @instance
	* @function searchTag
	* @memberof opentype.Layout
	* @param  {Array} arr
	* @param  {string} tag
	* @return {number}
	*/
	searchTag,
	/**
	* Binary search in a list of numbers
	* @instance
	* @function binSearch
	* @memberof opentype.Layout
	* @param  {Array} arr
	* @param  {number} value
	* @return {number}
	*/
	binSearch,
	/**
	* Get or create the Layout table (GSUB, GPOS etc).
	* @param  {boolean} create - Whether to create a new one.
	* @return {Object} The GSUB or GPOS table.
	*/
	getTable: function(create) {
		let layout = this.font.tables[this.tableName];
		if (!layout && create) layout = this.font.tables[this.tableName] = this.createDefaultTable();
		return layout;
	},
	/**
	* Returns all scripts in the substitution table.
	* @instance
	* @return {Array}
	*/
	getScriptNames: function() {
		let layout = this.getTable();
		if (!layout) return [];
		return layout.scripts.map(function(script) {
			return script.tag;
		});
	},
	/**
	* Returns the best bet for a script name.
	* Returns 'DFLT' if it exists.
	* If not, returns 'latn' if it exists.
	* If neither exist, returns undefined.
	*/
	getDefaultScriptName: function() {
		let layout = this.getTable();
		if (!layout) return;
		let hasLatn = false;
		for (let i = 0; i < layout.scripts.length; i++) {
			const name = layout.scripts[i].tag;
			if (name === "DFLT") return name;
			if (name === "latn") hasLatn = true;
		}
		if (hasLatn) return "latn";
	},
	/**
	* Returns all LangSysRecords in the given script.
	* @instance
	* @param {string} [script='DFLT']
	* @param {boolean} create - forces the creation of this script table if it doesn't exist.
	* @return {Object} An object with tag and script properties.
	*/
	getScriptTable: function(script, create) {
		const layout = this.getTable(create);
		if (layout) {
			script = script || "DFLT";
			const scripts = layout.scripts;
			const pos = searchTag(layout.scripts, script);
			if (pos >= 0) return scripts[pos].script;
			else if (create) {
				const scr = {
					tag: script,
					script: {
						defaultLangSys: {
							reserved: 0,
							reqFeatureIndex: 65535,
							featureIndexes: []
						},
						langSysRecords: []
					}
				};
				scripts.splice(-1 - pos, 0, scr);
				return scr.script;
			}
		}
	},
	/**
	* Returns a language system table
	* @instance
	* @param {string} [script='DFLT']
	* @param {string} [language='dlft']
	* @param {boolean} create - forces the creation of this langSysTable if it doesn't exist.
	* @return {Object}
	*/
	getLangSysTable: function(script, language, create) {
		const scriptTable = this.getScriptTable(script, create);
		if (scriptTable) {
			if (!language || language === "dflt" || language === "DFLT") return scriptTable.defaultLangSys;
			const pos = searchTag(scriptTable.langSysRecords, language);
			if (pos >= 0) return scriptTable.langSysRecords[pos].langSys;
			else if (create) {
				const langSysRecord = {
					tag: language,
					langSys: {
						reserved: 0,
						reqFeatureIndex: 65535,
						featureIndexes: []
					}
				};
				scriptTable.langSysRecords.splice(-1 - pos, 0, langSysRecord);
				return langSysRecord.langSys;
			}
		}
	},
	/**
	* Get a specific feature table.
	* @instance
	* @param {string} [script='DFLT']
	* @param {string} [language='dlft']
	* @param {string} feature - One of the codes listed at https://www.microsoft.com/typography/OTSPEC/featurelist.htm
	* @param {boolean} create - forces the creation of the feature table if it doesn't exist.
	* @return {Object}
	*/
	getFeatureTable: function(script, language, feature, create) {
		const langSysTable = this.getLangSysTable(script, language, create);
		if (langSysTable) {
			let featureRecord;
			const featIndexes = langSysTable.featureIndexes;
			const allFeatures = this.font.tables[this.tableName].features;
			for (let i = 0; i < featIndexes.length; i++) {
				featureRecord = allFeatures[featIndexes[i]];
				if (featureRecord.tag === feature) return featureRecord.feature;
			}
			if (create) {
				const index = allFeatures.length;
				check_default.assert(index === 0 || feature >= allFeatures[index - 1].tag, "Features must be added in alphabetical order.");
				featureRecord = {
					tag: feature,
					feature: {
						params: 0,
						lookupListIndexes: []
					}
				};
				allFeatures.push(featureRecord);
				featIndexes.push(index);
				return featureRecord.feature;
			}
		}
	},
	/**
	* Get the lookup tables of a given type for a script/language/feature.
	* @instance
	* @param {string} [script='DFLT']
	* @param {string} [language='dlft']
	* @param {string} feature - 4-letter feature code
	* @param {number} lookupType - 1 to 8
	* @param {boolean} create - forces the creation of the lookup table if it doesn't exist, with no subtables.
	* @return {Object[]}
	*/
	getLookupTables: function(script, language, feature, lookupType, create) {
		const featureTable = this.getFeatureTable(script, language, feature, create);
		const tables = [];
		if (featureTable) {
			let lookupTable;
			const lookupListIndexes = featureTable.lookupListIndexes;
			const allLookups = this.font.tables[this.tableName].lookups;
			for (let i = 0; i < lookupListIndexes.length; i++) {
				lookupTable = allLookups[lookupListIndexes[i]];
				if (lookupTable.lookupType === lookupType) tables.push(lookupTable);
			}
			if (tables.length === 0 && create) {
				lookupTable = {
					lookupType,
					lookupFlag: 0,
					subtables: [],
					markFilteringSet: void 0
				};
				const index = allLookups.length;
				allLookups.push(lookupTable);
				lookupListIndexes.push(index);
				return [lookupTable];
			}
		}
		return tables;
	},
	/**
	* Returns the list of glyph indexes of a coverage table.
	* Format 1: the list is stored raw
	* Format 2: compact list as range records.
	* @instance
	* @param  {Object} coverageTable
	* @return {Array}
	*/
	expandCoverage: function(coverageTable) {
		if (coverageTable.format === 1) return coverageTable.glyphs;
		else {
			const glyphs = [];
			const ranges = coverageTable.ranges;
			for (let i = 0; i < ranges.length; i++) {
				const range = ranges[i];
				const start = range.start;
				const end = range.end;
				for (let j = start; j <= end; j++) glyphs.push(j);
			}
			return glyphs;
		}
	}
};
//#endregion
//#region node_modules/opentype.js/src/substitution.js
/**
* @exports opentype.Substitution
* @class
* @extends opentype.Layout
* @param {opentype.Font}
* @constructor
*/
function Substitution(font) {
	Layout.call(this, font, "gsub");
}
function arraysEqual(ar1, ar2) {
	const n = ar1.length;
	if (n !== ar2.length) return false;
	for (let i = 0; i < n; i++) if (ar1[i] !== ar2[i]) return false;
	return true;
}
function getSubstFormat(lookupTable, format, defaultSubtable) {
	const subtables = lookupTable.subtables;
	for (let i = 0; i < subtables.length; i++) {
		const subtable = subtables[i];
		if (subtable.substFormat === format) return subtable;
	}
	if (defaultSubtable) {
		subtables.push(defaultSubtable);
		return defaultSubtable;
	}
}
Substitution.prototype = Layout.prototype;
/**
* Create a default GSUB table.
* @return {Object} gsub - The GSUB table.
*/
Substitution.prototype.createDefaultTable = function() {
	return {
		version: 1,
		scripts: [{
			tag: "DFLT",
			script: {
				defaultLangSys: {
					reserved: 0,
					reqFeatureIndex: 65535,
					featureIndexes: []
				},
				langSysRecords: []
			}
		}],
		features: [],
		lookups: []
	};
};
/**
* List all single substitutions (lookup type 1) for a given script, language, and feature.
* @param {string} [script='DFLT']
* @param {string} [language='dflt']
* @param {string} feature - 4-character feature name ('aalt', 'salt', 'ss01'...)
* @return {Array} substitutions - The list of substitutions.
*/
Substitution.prototype.getSingle = function(feature, script, language) {
	const substitutions = [];
	const lookupTables = this.getLookupTables(script, language, feature, 1);
	for (let idx = 0; idx < lookupTables.length; idx++) {
		const subtables = lookupTables[idx].subtables;
		for (let i = 0; i < subtables.length; i++) {
			const subtable = subtables[i];
			const glyphs = this.expandCoverage(subtable.coverage);
			let j;
			if (subtable.substFormat === 1) {
				const delta = subtable.deltaGlyphId;
				for (j = 0; j < glyphs.length; j++) {
					const glyph = glyphs[j];
					substitutions.push({
						sub: glyph,
						by: glyph + delta
					});
				}
			} else {
				const substitute = subtable.substitute;
				for (j = 0; j < glyphs.length; j++) substitutions.push({
					sub: glyphs[j],
					by: substitute[j]
				});
			}
		}
	}
	return substitutions;
};
/**
* List all alternates (lookup type 3) for a given script, language, and feature.
* @param {string} [script='DFLT']
* @param {string} [language='dflt']
* @param {string} feature - 4-character feature name ('aalt', 'salt'...)
* @return {Array} alternates - The list of alternates
*/
Substitution.prototype.getAlternates = function(feature, script, language) {
	const alternates = [];
	const lookupTables = this.getLookupTables(script, language, feature, 3);
	for (let idx = 0; idx < lookupTables.length; idx++) {
		const subtables = lookupTables[idx].subtables;
		for (let i = 0; i < subtables.length; i++) {
			const subtable = subtables[i];
			const glyphs = this.expandCoverage(subtable.coverage);
			const alternateSets = subtable.alternateSets;
			for (let j = 0; j < glyphs.length; j++) alternates.push({
				sub: glyphs[j],
				by: alternateSets[j]
			});
		}
	}
	return alternates;
};
/**
* List all ligatures (lookup type 4) for a given script, language, and feature.
* The result is an array of ligature objects like { sub: [ids], by: id }
* @param {string} feature - 4-letter feature name ('liga', 'rlig', 'dlig'...)
* @param {string} [script='DFLT']
* @param {string} [language='dflt']
* @return {Array} ligatures - The list of ligatures.
*/
Substitution.prototype.getLigatures = function(feature, script, language) {
	const ligatures = [];
	const lookupTables = this.getLookupTables(script, language, feature, 4);
	for (let idx = 0; idx < lookupTables.length; idx++) {
		const subtables = lookupTables[idx].subtables;
		for (let i = 0; i < subtables.length; i++) {
			const subtable = subtables[i];
			const glyphs = this.expandCoverage(subtable.coverage);
			const ligatureSets = subtable.ligatureSets;
			for (let j = 0; j < glyphs.length; j++) {
				const startGlyph = glyphs[j];
				const ligSet = ligatureSets[j];
				for (let k = 0; k < ligSet.length; k++) {
					const lig = ligSet[k];
					ligatures.push({
						sub: [startGlyph].concat(lig.components),
						by: lig.ligGlyph
					});
				}
			}
		}
	}
	return ligatures;
};
/**
* Add or modify a single substitution (lookup type 1)
* Format 2, more flexible, is always used.
* @param {string} feature - 4-letter feature name ('liga', 'rlig', 'dlig'...)
* @param {Object} substitution - { sub: id, delta: number } for format 1 or { sub: id, by: id } for format 2.
* @param {string} [script='DFLT']
* @param {string} [language='dflt']
*/
Substitution.prototype.addSingle = function(feature, substitution, script, language) {
	const lookupTable = this.getLookupTables(script, language, feature, 1, true)[0];
	const subtable = getSubstFormat(lookupTable, 2, {
		substFormat: 2,
		coverage: {
			format: 1,
			glyphs: []
		},
		substitute: []
	});
	check_default.assert(subtable.coverage.format === 1, "Ligature: unable to modify coverage table format " + subtable.coverage.format);
	const coverageGlyph = substitution.sub;
	let pos = this.binSearch(subtable.coverage.glyphs, coverageGlyph);
	if (pos < 0) {
		pos = -1 - pos;
		subtable.coverage.glyphs.splice(pos, 0, coverageGlyph);
		subtable.substitute.splice(pos, 0, 0);
	}
	subtable.substitute[pos] = substitution.by;
};
/**
* Add or modify an alternate substitution (lookup type 1)
* @param {string} feature - 4-letter feature name ('liga', 'rlig', 'dlig'...)
* @param {Object} substitution - { sub: id, by: [ids] }
* @param {string} [script='DFLT']
* @param {string} [language='dflt']
*/
Substitution.prototype.addAlternate = function(feature, substitution, script, language) {
	const lookupTable = this.getLookupTables(script, language, feature, 3, true)[0];
	const subtable = getSubstFormat(lookupTable, 1, {
		substFormat: 1,
		coverage: {
			format: 1,
			glyphs: []
		},
		alternateSets: []
	});
	check_default.assert(subtable.coverage.format === 1, "Ligature: unable to modify coverage table format " + subtable.coverage.format);
	const coverageGlyph = substitution.sub;
	let pos = this.binSearch(subtable.coverage.glyphs, coverageGlyph);
	if (pos < 0) {
		pos = -1 - pos;
		subtable.coverage.glyphs.splice(pos, 0, coverageGlyph);
		subtable.alternateSets.splice(pos, 0, 0);
	}
	subtable.alternateSets[pos] = substitution.by;
};
/**
* Add a ligature (lookup type 4)
* Ligatures with more components must be stored ahead of those with fewer components in order to be found
* @param {string} feature - 4-letter feature name ('liga', 'rlig', 'dlig'...)
* @param {Object} ligature - { sub: [ids], by: id }
* @param {string} [script='DFLT']
* @param {string} [language='dflt']
*/
Substitution.prototype.addLigature = function(feature, ligature, script, language) {
	const lookupTable = this.getLookupTables(script, language, feature, 4, true)[0];
	let subtable = lookupTable.subtables[0];
	if (!subtable) {
		subtable = {
			substFormat: 1,
			coverage: {
				format: 1,
				glyphs: []
			},
			ligatureSets: []
		};
		lookupTable.subtables[0] = subtable;
	}
	check_default.assert(subtable.coverage.format === 1, "Ligature: unable to modify coverage table format " + subtable.coverage.format);
	const coverageGlyph = ligature.sub[0];
	const ligComponents = ligature.sub.slice(1);
	const ligatureTable = {
		ligGlyph: ligature.by,
		components: ligComponents
	};
	let pos = this.binSearch(subtable.coverage.glyphs, coverageGlyph);
	if (pos >= 0) {
		const ligatureSet = subtable.ligatureSets[pos];
		for (let i = 0; i < ligatureSet.length; i++) if (arraysEqual(ligatureSet[i].components, ligComponents)) return;
		ligatureSet.push(ligatureTable);
	} else {
		pos = -1 - pos;
		subtable.coverage.glyphs.splice(pos, 0, coverageGlyph);
		subtable.ligatureSets.splice(pos, 0, [ligatureTable]);
	}
};
/**
* List all feature data for a given script and language.
* @param {string} feature - 4-letter feature name
* @param {string} [script='DFLT']
* @param {string} [language='dflt']
* @return {Array} substitutions - The list of substitutions.
*/
Substitution.prototype.getFeature = function(feature, script, language) {
	if (/ss\d\d/.test(feature)) return this.getSingle(feature, script, language);
	switch (feature) {
		case "aalt":
		case "salt": return this.getSingle(feature, script, language).concat(this.getAlternates(feature, script, language));
		case "dlig":
		case "liga":
		case "rlig": return this.getLigatures(feature, script, language);
	}
};
/**
* Add a substitution to a feature for a given script and language.
* @param {string} feature - 4-letter feature name
* @param {Object} sub - the substitution to add (an object like { sub: id or [ids], by: id or [ids] })
* @param {string} [script='DFLT']
* @param {string} [language='dflt']
*/
Substitution.prototype.add = function(feature, sub, script, language) {
	if (/ss\d\d/.test(feature)) return this.addSingle(feature, sub, script, language);
	switch (feature) {
		case "aalt":
		case "salt":
			if (typeof sub.by === "number") return this.addSingle(feature, sub, script, language);
			return this.addAlternate(feature, sub, script, language);
		case "dlig":
		case "liga":
		case "rlig": return this.addLigature(feature, sub, script, language);
	}
};
//#endregion
//#region node_modules/opentype.js/src/util.js
function isBrowser() {
	return typeof window !== "undefined";
}
function nodeBufferToArrayBuffer(buffer) {
	const ab = new ArrayBuffer(buffer.length);
	const view = new Uint8Array(ab);
	for (let i = 0; i < buffer.length; ++i) view[i] = buffer[i];
	return ab;
}
function arrayBufferToNodeBuffer(ab) {
	const buffer = new Buffer(ab.byteLength);
	const view = new Uint8Array(ab);
	for (let i = 0; i < buffer.length; ++i) buffer[i] = view[i];
	return buffer;
}
function checkArgument(expression, message) {
	if (!expression) throw message;
}
//#endregion
//#region node_modules/opentype.js/src/hintingtt.js
var instructionTable;
var exec;
var execGlyph;
var execComponent;
function Hinting(font) {
	this.font = font;
	this._fpgmState = this._prepState = void 0;
	this._errorState = 0;
}
function roundOff(v) {
	return v;
}
function roundToGrid(v) {
	return Math.sign(v) * Math.round(Math.abs(v));
}
function roundToDoubleGrid(v) {
	return Math.sign(v) * Math.round(Math.abs(v * 2)) / 2;
}
function roundToHalfGrid(v) {
	return Math.sign(v) * (Math.round(Math.abs(v) + .5) - .5);
}
function roundUpToGrid(v) {
	return Math.sign(v) * Math.ceil(Math.abs(v));
}
function roundDownToGrid(v) {
	return Math.sign(v) * Math.floor(Math.abs(v));
}
var roundSuper = function(v) {
	const period = this.srPeriod;
	let phase = this.srPhase;
	const threshold = this.srThreshold;
	let sign = 1;
	if (v < 0) {
		v = -v;
		sign = -1;
	}
	v += threshold - phase;
	v = Math.trunc(v / period) * period;
	v += phase;
	if (sign > 0 && v < 0) return phase;
	if (sign < 0 && v > 0) return -phase;
	return v * sign;
};
var xUnitVector = {
	x: 1,
	y: 0,
	axis: "x",
	distance: function(p1, p2, o1, o2) {
		return (o1 ? p1.xo : p1.x) - (o2 ? p2.xo : p2.x);
	},
	interpolate: function(p, rp1, rp2, pv) {
		let do1;
		let do2;
		let doa1;
		let doa2;
		let dm1;
		let dm2;
		let dt;
		if (!pv || pv === this) {
			do1 = p.xo - rp1.xo;
			do2 = p.xo - rp2.xo;
			dm1 = rp1.x - rp1.xo;
			dm2 = rp2.x - rp2.xo;
			doa1 = Math.abs(do1);
			doa2 = Math.abs(do2);
			dt = doa1 + doa2;
			if (dt === 0) {
				p.x = p.xo + (dm1 + dm2) / 2;
				return;
			}
			p.x = p.xo + (dm1 * doa2 + dm2 * doa1) / dt;
			return;
		}
		do1 = pv.distance(p, rp1, true, true);
		do2 = pv.distance(p, rp2, true, true);
		dm1 = pv.distance(rp1, rp1, false, true);
		dm2 = pv.distance(rp2, rp2, false, true);
		doa1 = Math.abs(do1);
		doa2 = Math.abs(do2);
		dt = doa1 + doa2;
		if (dt === 0) {
			xUnitVector.setRelative(p, p, (dm1 + dm2) / 2, pv, true);
			return;
		}
		xUnitVector.setRelative(p, p, (dm1 * doa2 + dm2 * doa1) / dt, pv, true);
	},
	normalSlope: Number.NEGATIVE_INFINITY,
	setRelative: function(p, rp, d, pv, org) {
		if (!pv || pv === this) {
			p.x = (org ? rp.xo : rp.x) + d;
			return;
		}
		const rpx = org ? rp.xo : rp.x;
		const rpy = org ? rp.yo : rp.y;
		const rpdx = rpx + d * pv.x;
		const rpdy = rpy + d * pv.y;
		p.x = rpdx + (p.y - rpdy) / pv.normalSlope;
	},
	slope: 0,
	touch: function(p) {
		p.xTouched = true;
	},
	touched: function(p) {
		return p.xTouched;
	},
	untouch: function(p) {
		p.xTouched = false;
	}
};
var yUnitVector = {
	x: 0,
	y: 1,
	axis: "y",
	distance: function(p1, p2, o1, o2) {
		return (o1 ? p1.yo : p1.y) - (o2 ? p2.yo : p2.y);
	},
	interpolate: function(p, rp1, rp2, pv) {
		let do1;
		let do2;
		let doa1;
		let doa2;
		let dm1;
		let dm2;
		let dt;
		if (!pv || pv === this) {
			do1 = p.yo - rp1.yo;
			do2 = p.yo - rp2.yo;
			dm1 = rp1.y - rp1.yo;
			dm2 = rp2.y - rp2.yo;
			doa1 = Math.abs(do1);
			doa2 = Math.abs(do2);
			dt = doa1 + doa2;
			if (dt === 0) {
				p.y = p.yo + (dm1 + dm2) / 2;
				return;
			}
			p.y = p.yo + (dm1 * doa2 + dm2 * doa1) / dt;
			return;
		}
		do1 = pv.distance(p, rp1, true, true);
		do2 = pv.distance(p, rp2, true, true);
		dm1 = pv.distance(rp1, rp1, false, true);
		dm2 = pv.distance(rp2, rp2, false, true);
		doa1 = Math.abs(do1);
		doa2 = Math.abs(do2);
		dt = doa1 + doa2;
		if (dt === 0) {
			yUnitVector.setRelative(p, p, (dm1 + dm2) / 2, pv, true);
			return;
		}
		yUnitVector.setRelative(p, p, (dm1 * doa2 + dm2 * doa1) / dt, pv, true);
	},
	normalSlope: 0,
	setRelative: function(p, rp, d, pv, org) {
		if (!pv || pv === this) {
			p.y = (org ? rp.yo : rp.y) + d;
			return;
		}
		const rpx = org ? rp.xo : rp.x;
		const rpy = org ? rp.yo : rp.y;
		const rpdx = rpx + d * pv.x;
		p.y = rpy + d * pv.y + pv.normalSlope * (p.x - rpdx);
	},
	slope: Number.POSITIVE_INFINITY,
	touch: function(p) {
		p.yTouched = true;
	},
	touched: function(p) {
		return p.yTouched;
	},
	untouch: function(p) {
		p.yTouched = false;
	}
};
Object.freeze(xUnitVector);
Object.freeze(yUnitVector);
function UnitVector(x, y) {
	this.x = x;
	this.y = y;
	this.axis = void 0;
	this.slope = y / x;
	this.normalSlope = -x / y;
	Object.freeze(this);
}
UnitVector.prototype.distance = function(p1, p2, o1, o2) {
	return this.x * xUnitVector.distance(p1, p2, o1, o2) + this.y * yUnitVector.distance(p1, p2, o1, o2);
};
UnitVector.prototype.interpolate = function(p, rp1, rp2, pv) {
	let dm1;
	let dm2;
	let do1;
	let do2;
	let doa1;
	let doa2;
	let dt;
	do1 = pv.distance(p, rp1, true, true);
	do2 = pv.distance(p, rp2, true, true);
	dm1 = pv.distance(rp1, rp1, false, true);
	dm2 = pv.distance(rp2, rp2, false, true);
	doa1 = Math.abs(do1);
	doa2 = Math.abs(do2);
	dt = doa1 + doa2;
	if (dt === 0) {
		this.setRelative(p, p, (dm1 + dm2) / 2, pv, true);
		return;
	}
	this.setRelative(p, p, (dm1 * doa2 + dm2 * doa1) / dt, pv, true);
};
UnitVector.prototype.setRelative = function(p, rp, d, pv, org) {
	pv = pv || this;
	const rpx = org ? rp.xo : rp.x;
	const rpy = org ? rp.yo : rp.y;
	const rpdx = rpx + d * pv.x;
	const rpdy = rpy + d * pv.y;
	const pvns = pv.normalSlope;
	const fvs = this.slope;
	const px = p.x;
	const py = p.y;
	p.x = (fvs * px - pvns * rpdx + rpdy - py) / (fvs - pvns);
	p.y = fvs * (p.x - px) + py;
};
UnitVector.prototype.touch = function(p) {
	p.xTouched = true;
	p.yTouched = true;
};
function getUnitVector(x, y) {
	const d = Math.sqrt(x * x + y * y);
	x /= d;
	y /= d;
	if (x === 1 && y === 0) return xUnitVector;
	else if (x === 0 && y === 1) return yUnitVector;
	else return new UnitVector(x, y);
}
function HPoint(x, y, lastPointOfContour, onCurve) {
	this.x = this.xo = Math.round(x * 64) / 64;
	this.y = this.yo = Math.round(y * 64) / 64;
	this.lastPointOfContour = lastPointOfContour;
	this.onCurve = onCurve;
	this.prevPointOnContour = void 0;
	this.nextPointOnContour = void 0;
	this.xTouched = false;
	this.yTouched = false;
	Object.preventExtensions(this);
}
HPoint.prototype.nextTouched = function(v) {
	let p = this.nextPointOnContour;
	while (!v.touched(p) && p !== this) p = p.nextPointOnContour;
	return p;
};
HPoint.prototype.prevTouched = function(v) {
	let p = this.prevPointOnContour;
	while (!v.touched(p) && p !== this) p = p.prevPointOnContour;
	return p;
};
var HPZero = Object.freeze(new HPoint(0, 0));
var defaultState$1 = {
	cvCutIn: 17 / 16,
	deltaBase: 9,
	deltaShift: .125,
	loop: 1,
	minDis: 1,
	autoFlip: true
};
function State(env, prog) {
	this.env = env;
	this.stack = [];
	this.prog = prog;
	switch (env) {
		case "glyf":
			this.zp0 = this.zp1 = this.zp2 = 1;
			this.rp0 = this.rp1 = this.rp2 = 0;
		case "prep":
			this.fv = this.pv = this.dpv = xUnitVector;
			this.round = roundToGrid;
	}
}
Hinting.prototype.exec = function(glyph, ppem) {
	if (typeof ppem !== "number") throw new Error("Point size is not a number!");
	if (this._errorState > 2) return;
	const font = this.font;
	let prepState = this._prepState;
	if (!prepState || prepState.ppem !== ppem) {
		let fpgmState = this._fpgmState;
		if (!fpgmState) {
			State.prototype = defaultState$1;
			fpgmState = this._fpgmState = new State("fpgm", font.tables.fpgm);
			fpgmState.funcs = [];
			fpgmState.font = font;
			if (exports.DEBUG) {
				console.log("---EXEC FPGM---");
				fpgmState.step = -1;
			}
			try {
				exec(fpgmState);
			} catch (e) {
				console.log("Hinting error in FPGM:" + e);
				this._errorState = 3;
				return;
			}
		}
		State.prototype = fpgmState;
		prepState = this._prepState = new State("prep", font.tables.prep);
		prepState.ppem = ppem;
		const oCvt = font.tables.cvt;
		if (oCvt) {
			const cvt = prepState.cvt = new Array(oCvt.length);
			const scale = ppem / font.unitsPerEm;
			for (let c = 0; c < oCvt.length; c++) cvt[c] = oCvt[c] * scale;
		} else prepState.cvt = [];
		if (exports.DEBUG) {
			console.log("---EXEC PREP---");
			prepState.step = -1;
		}
		try {
			exec(prepState);
		} catch (e) {
			if (this._errorState < 2) console.log("Hinting error in PREP:" + e);
			this._errorState = 2;
		}
	}
	if (this._errorState > 1) return;
	try {
		return execGlyph(glyph, prepState);
	} catch (e) {
		if (this._errorState < 1) {
			console.log("Hinting error:" + e);
			console.log("Note: further hinting errors are silenced");
		}
		this._errorState = 1;
		return;
	}
};
execGlyph = function(glyph, prepState) {
	const xScale = prepState.ppem / prepState.font.unitsPerEm;
	const yScale = xScale;
	let components = glyph.components;
	let contours;
	let gZone;
	let state;
	State.prototype = prepState;
	if (!components) {
		state = new State("glyf", glyph.instructions);
		if (exports.DEBUG) {
			console.log("---EXEC GLYPH---");
			state.step = -1;
		}
		execComponent(glyph, state, xScale, yScale);
		gZone = state.gZone;
	} else {
		const font = prepState.font;
		gZone = [];
		contours = [];
		for (let i = 0; i < components.length; i++) {
			const c = components[i];
			const cg = font.glyphs.get(c.glyphIndex);
			state = new State("glyf", cg.instructions);
			if (exports.DEBUG) {
				console.log("---EXEC COMP " + i + "---");
				state.step = -1;
			}
			execComponent(cg, state, xScale, yScale);
			const dx = Math.round(c.dx * xScale);
			const dy = Math.round(c.dy * yScale);
			const gz = state.gZone;
			const cc = state.contours;
			for (let pi = 0; pi < gz.length; pi++) {
				const p = gz[pi];
				p.xTouched = p.yTouched = false;
				p.xo = p.x = p.x + dx;
				p.yo = p.y = p.y + dy;
			}
			const gLen = gZone.length;
			gZone.push.apply(gZone, gz);
			for (let j = 0; j < cc.length; j++) contours.push(cc[j] + gLen);
		}
		if (glyph.instructions && !state.inhibitGridFit) {
			state = new State("glyf", glyph.instructions);
			state.gZone = state.z0 = state.z1 = state.z2 = gZone;
			state.contours = contours;
			gZone.push(new HPoint(0, 0), new HPoint(Math.round(glyph.advanceWidth * xScale), 0));
			if (exports.DEBUG) {
				console.log("---EXEC COMPOSITE---");
				state.step = -1;
			}
			exec(state);
			gZone.length -= 2;
		}
	}
	return gZone;
};
execComponent = function(glyph, state, xScale, yScale) {
	const points = glyph.points || [];
	const pLen = points.length;
	const gZone = state.gZone = state.z0 = state.z1 = state.z2 = [];
	const contours = state.contours = [];
	let cp;
	for (let i = 0; i < pLen; i++) {
		cp = points[i];
		gZone[i] = new HPoint(cp.x * xScale, cp.y * yScale, cp.lastPointOfContour, cp.onCurve);
	}
	let sp;
	let np;
	for (let i = 0; i < pLen; i++) {
		cp = gZone[i];
		if (!sp) {
			sp = cp;
			contours.push(i);
		}
		if (cp.lastPointOfContour) {
			cp.nextPointOnContour = sp;
			sp.prevPointOnContour = cp;
			sp = void 0;
		} else {
			np = gZone[i + 1];
			cp.nextPointOnContour = np;
			np.prevPointOnContour = cp;
		}
	}
	if (state.inhibitGridFit) return;
	gZone.push(new HPoint(0, 0), new HPoint(Math.round(glyph.advanceWidth * xScale), 0));
	exec(state);
	gZone.length -= 2;
	if (exports.DEBUG) {
		console.log("FINISHED GLYPH", state.stack);
		for (let i = 0; i < pLen; i++) console.log(i, gZone[i].x, gZone[i].y);
	}
};
exec = function(state) {
	let prog = state.prog;
	if (!prog) return;
	const pLen = prog.length;
	let ins;
	for (state.ip = 0; state.ip < pLen; state.ip++) {
		if (exports.DEBUG) state.step++;
		ins = instructionTable[prog[state.ip]];
		if (!ins) throw new Error("unknown instruction: 0x" + Number(prog[state.ip]).toString(16));
		ins(state);
	}
};
function initTZone(state) {
	const tZone = state.tZone = new Array(state.gZone.length);
	for (let i = 0; i < tZone.length; i++) tZone[i] = new HPoint(0, 0);
}
function skip(state, handleElse) {
	const prog = state.prog;
	let ip = state.ip;
	let nesting = 1;
	let ins;
	do {
		ins = prog[++ip];
		if (ins === 88) nesting++;
		else if (ins === 89) nesting--;
		else if (ins === 64) ip += prog[ip + 1] + 1;
		else if (ins === 65) ip += 2 * prog[ip + 1] + 1;
		else if (ins >= 176 && ins <= 183) ip += ins - 176 + 1;
		else if (ins >= 184 && ins <= 191) ip += (ins - 184 + 1) * 2;
		else if (handleElse && nesting === 1 && ins === 27) break;
	} while (nesting > 0);
	state.ip = ip;
}
function SVTCA(v, state) {
	if (exports.DEBUG) console.log(state.step, "SVTCA[" + v.axis + "]");
	state.fv = state.pv = state.dpv = v;
}
function SPVTCA(v, state) {
	if (exports.DEBUG) console.log(state.step, "SPVTCA[" + v.axis + "]");
	state.pv = state.dpv = v;
}
function SFVTCA(v, state) {
	if (exports.DEBUG) console.log(state.step, "SFVTCA[" + v.axis + "]");
	state.fv = v;
}
function SPVTL(a, state) {
	const stack = state.stack;
	const p2i = stack.pop();
	const p1i = stack.pop();
	const p2 = state.z2[p2i];
	const p1 = state.z1[p1i];
	if (exports.DEBUG) console.log("SPVTL[" + a + "]", p2i, p1i);
	let dx;
	let dy;
	if (!a) {
		dx = p1.x - p2.x;
		dy = p1.y - p2.y;
	} else {
		dx = p2.y - p1.y;
		dy = p1.x - p2.x;
	}
	state.pv = state.dpv = getUnitVector(dx, dy);
}
function SFVTL(a, state) {
	const stack = state.stack;
	const p2i = stack.pop();
	const p1i = stack.pop();
	const p2 = state.z2[p2i];
	const p1 = state.z1[p1i];
	if (exports.DEBUG) console.log("SFVTL[" + a + "]", p2i, p1i);
	let dx;
	let dy;
	if (!a) {
		dx = p1.x - p2.x;
		dy = p1.y - p2.y;
	} else {
		dx = p2.y - p1.y;
		dy = p1.x - p2.x;
	}
	state.fv = getUnitVector(dx, dy);
}
function SPVFS(state) {
	const stack = state.stack;
	const y = stack.pop();
	const x = stack.pop();
	if (exports.DEBUG) console.log(state.step, "SPVFS[]", y, x);
	state.pv = state.dpv = getUnitVector(x, y);
}
function SFVFS(state) {
	const stack = state.stack;
	const y = stack.pop();
	const x = stack.pop();
	if (exports.DEBUG) console.log(state.step, "SPVFS[]", y, x);
	state.fv = getUnitVector(x, y);
}
function GPV(state) {
	const stack = state.stack;
	const pv = state.pv;
	if (exports.DEBUG) console.log(state.step, "GPV[]");
	stack.push(pv.x * 16384);
	stack.push(pv.y * 16384);
}
function GFV(state) {
	const stack = state.stack;
	const fv = state.fv;
	if (exports.DEBUG) console.log(state.step, "GFV[]");
	stack.push(fv.x * 16384);
	stack.push(fv.y * 16384);
}
function SFVTPV(state) {
	state.fv = state.pv;
	if (exports.DEBUG) console.log(state.step, "SFVTPV[]");
}
function ISECT(state) {
	const stack = state.stack;
	const pa0i = stack.pop();
	const pa1i = stack.pop();
	const pb0i = stack.pop();
	const pb1i = stack.pop();
	const pi = stack.pop();
	const z0 = state.z0;
	const z1 = state.z1;
	const pa0 = z0[pa0i];
	const pa1 = z0[pa1i];
	const pb0 = z1[pb0i];
	const pb1 = z1[pb1i];
	const p = state.z2[pi];
	if (exports.DEBUG) console.log("ISECT[], ", pa0i, pa1i, pb0i, pb1i, pi);
	const x1 = pa0.x;
	const y1 = pa0.y;
	const x2 = pa1.x;
	const y2 = pa1.y;
	const x3 = pb0.x;
	const y3 = pb0.y;
	const x4 = pb1.x;
	const y4 = pb1.y;
	const div = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
	const f1 = x1 * y2 - y1 * x2;
	const f2 = x3 * y4 - y3 * x4;
	p.x = (f1 * (x3 - x4) - f2 * (x1 - x2)) / div;
	p.y = (f1 * (y3 - y4) - f2 * (y1 - y2)) / div;
}
function SRP0(state) {
	state.rp0 = state.stack.pop();
	if (exports.DEBUG) console.log(state.step, "SRP0[]", state.rp0);
}
function SRP1(state) {
	state.rp1 = state.stack.pop();
	if (exports.DEBUG) console.log(state.step, "SRP1[]", state.rp1);
}
function SRP2(state) {
	state.rp2 = state.stack.pop();
	if (exports.DEBUG) console.log(state.step, "SRP2[]", state.rp2);
}
function SZP0(state) {
	const n = state.stack.pop();
	if (exports.DEBUG) console.log(state.step, "SZP0[]", n);
	state.zp0 = n;
	switch (n) {
		case 0:
			if (!state.tZone) initTZone(state);
			state.z0 = state.tZone;
			break;
		case 1:
			state.z0 = state.gZone;
			break;
		default: throw new Error("Invalid zone pointer");
	}
}
function SZP1(state) {
	const n = state.stack.pop();
	if (exports.DEBUG) console.log(state.step, "SZP1[]", n);
	state.zp1 = n;
	switch (n) {
		case 0:
			if (!state.tZone) initTZone(state);
			state.z1 = state.tZone;
			break;
		case 1:
			state.z1 = state.gZone;
			break;
		default: throw new Error("Invalid zone pointer");
	}
}
function SZP2(state) {
	const n = state.stack.pop();
	if (exports.DEBUG) console.log(state.step, "SZP2[]", n);
	state.zp2 = n;
	switch (n) {
		case 0:
			if (!state.tZone) initTZone(state);
			state.z2 = state.tZone;
			break;
		case 1:
			state.z2 = state.gZone;
			break;
		default: throw new Error("Invalid zone pointer");
	}
}
function SZPS(state) {
	const n = state.stack.pop();
	if (exports.DEBUG) console.log(state.step, "SZPS[]", n);
	state.zp0 = state.zp1 = state.zp2 = n;
	switch (n) {
		case 0:
			if (!state.tZone) initTZone(state);
			state.z0 = state.z1 = state.z2 = state.tZone;
			break;
		case 1:
			state.z0 = state.z1 = state.z2 = state.gZone;
			break;
		default: throw new Error("Invalid zone pointer");
	}
}
function SLOOP(state) {
	state.loop = state.stack.pop();
	if (exports.DEBUG) console.log(state.step, "SLOOP[]", state.loop);
}
function RTG(state) {
	if (exports.DEBUG) console.log(state.step, "RTG[]");
	state.round = roundToGrid;
}
function RTHG(state) {
	if (exports.DEBUG) console.log(state.step, "RTHG[]");
	state.round = roundToHalfGrid;
}
function SMD(state) {
	const d = state.stack.pop();
	if (exports.DEBUG) console.log(state.step, "SMD[]", d);
	state.minDis = d / 64;
}
function ELSE(state) {
	if (exports.DEBUG) console.log(state.step, "ELSE[]");
	skip(state, false);
}
function JMPR(state) {
	const o = state.stack.pop();
	if (exports.DEBUG) console.log(state.step, "JMPR[]", o);
	state.ip += o - 1;
}
function SCVTCI(state) {
	const n = state.stack.pop();
	if (exports.DEBUG) console.log(state.step, "SCVTCI[]", n);
	state.cvCutIn = n / 64;
}
function DUP(state) {
	const stack = state.stack;
	if (exports.DEBUG) console.log(state.step, "DUP[]");
	stack.push(stack[stack.length - 1]);
}
function POP(state) {
	if (exports.DEBUG) console.log(state.step, "POP[]");
	state.stack.pop();
}
function CLEAR(state) {
	if (exports.DEBUG) console.log(state.step, "CLEAR[]");
	state.stack.length = 0;
}
function SWAP(state) {
	const stack = state.stack;
	const a = stack.pop();
	const b = stack.pop();
	if (exports.DEBUG) console.log(state.step, "SWAP[]");
	stack.push(a);
	stack.push(b);
}
function DEPTH(state) {
	const stack = state.stack;
	if (exports.DEBUG) console.log(state.step, "DEPTH[]");
	stack.push(stack.length);
}
function LOOPCALL(state) {
	const stack = state.stack;
	const fn = stack.pop();
	const c = stack.pop();
	if (exports.DEBUG) console.log(state.step, "LOOPCALL[]", fn, c);
	const cip = state.ip;
	const cprog = state.prog;
	state.prog = state.funcs[fn];
	for (let i = 0; i < c; i++) {
		exec(state);
		if (exports.DEBUG) console.log(++state.step, i + 1 < c ? "next loopcall" : "done loopcall", i);
	}
	state.ip = cip;
	state.prog = cprog;
}
function CALL(state) {
	const fn = state.stack.pop();
	if (exports.DEBUG) console.log(state.step, "CALL[]", fn);
	const cip = state.ip;
	const cprog = state.prog;
	state.prog = state.funcs[fn];
	exec(state);
	state.ip = cip;
	state.prog = cprog;
	if (exports.DEBUG) console.log(++state.step, "returning from", fn);
}
function CINDEX(state) {
	const stack = state.stack;
	const k = stack.pop();
	if (exports.DEBUG) console.log(state.step, "CINDEX[]", k);
	stack.push(stack[stack.length - k]);
}
function MINDEX(state) {
	const stack = state.stack;
	const k = stack.pop();
	if (exports.DEBUG) console.log(state.step, "MINDEX[]", k);
	stack.push(stack.splice(stack.length - k, 1)[0]);
}
function FDEF(state) {
	if (state.env !== "fpgm") throw new Error("FDEF not allowed here");
	const stack = state.stack;
	const prog = state.prog;
	let ip = state.ip;
	const fn = stack.pop();
	const ipBegin = ip;
	if (exports.DEBUG) console.log(state.step, "FDEF[]", fn);
	while (prog[++ip] !== 45);
	state.ip = ip;
	state.funcs[fn] = prog.slice(ipBegin + 1, ip);
}
function MDAP(round, state) {
	const pi = state.stack.pop();
	const p = state.z0[pi];
	const fv = state.fv;
	const pv = state.pv;
	if (exports.DEBUG) console.log(state.step, "MDAP[" + round + "]", pi);
	let d = pv.distance(p, HPZero);
	if (round) d = state.round(d);
	fv.setRelative(p, HPZero, d, pv);
	fv.touch(p);
	state.rp0 = state.rp1 = pi;
}
function IUP(v, state) {
	const z2 = state.z2;
	const pLen = z2.length - 2;
	let cp;
	let pp;
	let np;
	if (exports.DEBUG) console.log(state.step, "IUP[" + v.axis + "]");
	for (let i = 0; i < pLen; i++) {
		cp = z2[i];
		if (v.touched(cp)) continue;
		pp = cp.prevTouched(v);
		if (pp === cp) continue;
		np = cp.nextTouched(v);
		if (pp === np) v.setRelative(cp, cp, v.distance(pp, pp, false, true), v, true);
		v.interpolate(cp, pp, np, v);
	}
}
function SHP(a, state) {
	const stack = state.stack;
	const rpi = a ? state.rp1 : state.rp2;
	const rp = (a ? state.z0 : state.z1)[rpi];
	const fv = state.fv;
	const pv = state.pv;
	let loop = state.loop;
	const z2 = state.z2;
	while (loop--) {
		const pi = stack.pop();
		const p = z2[pi];
		const d = pv.distance(rp, rp, false, true);
		fv.setRelative(p, p, d, pv);
		fv.touch(p);
		if (exports.DEBUG) console.log(state.step, (state.loop > 1 ? "loop " + (state.loop - loop) + ": " : "") + "SHP[" + (a ? "rp1" : "rp2") + "]", pi);
	}
	state.loop = 1;
}
function SHC(a, state) {
	const stack = state.stack;
	const rpi = a ? state.rp1 : state.rp2;
	const rp = (a ? state.z0 : state.z1)[rpi];
	const fv = state.fv;
	const pv = state.pv;
	const ci = stack.pop();
	const sp = state.z2[state.contours[ci]];
	let p = sp;
	if (exports.DEBUG) console.log(state.step, "SHC[" + a + "]", ci);
	const d = pv.distance(rp, rp, false, true);
	do {
		if (p !== rp) fv.setRelative(p, p, d, pv);
		p = p.nextPointOnContour;
	} while (p !== sp);
}
function SHZ(a, state) {
	const stack = state.stack;
	const rpi = a ? state.rp1 : state.rp2;
	const rp = (a ? state.z0 : state.z1)[rpi];
	const fv = state.fv;
	const pv = state.pv;
	const e = stack.pop();
	if (exports.DEBUG) console.log(state.step, "SHZ[" + a + "]", e);
	let z;
	switch (e) {
		case 0:
			z = state.tZone;
			break;
		case 1:
			z = state.gZone;
			break;
		default: throw new Error("Invalid zone");
	}
	let p;
	const d = pv.distance(rp, rp, false, true);
	const pLen = z.length - 2;
	for (let i = 0; i < pLen; i++) {
		p = z[i];
		if (p !== rp) fv.setRelative(p, p, d, pv);
	}
}
function SHPIX(state) {
	const stack = state.stack;
	let loop = state.loop;
	const fv = state.fv;
	const d = stack.pop() / 64;
	const z2 = state.z2;
	while (loop--) {
		const pi = stack.pop();
		const p = z2[pi];
		if (exports.DEBUG) console.log(state.step, (state.loop > 1 ? "loop " + (state.loop - loop) + ": " : "") + "SHPIX[]", pi, d);
		fv.setRelative(p, p, d);
		fv.touch(p);
	}
	state.loop = 1;
}
function IP(state) {
	const stack = state.stack;
	const rp1i = state.rp1;
	const rp2i = state.rp2;
	let loop = state.loop;
	const rp1 = state.z0[rp1i];
	const rp2 = state.z1[rp2i];
	const fv = state.fv;
	const pv = state.dpv;
	const z2 = state.z2;
	while (loop--) {
		const pi = stack.pop();
		const p = z2[pi];
		if (exports.DEBUG) console.log(state.step, (state.loop > 1 ? "loop " + (state.loop - loop) + ": " : "") + "IP[]", pi, rp1i, "<->", rp2i);
		fv.interpolate(p, rp1, rp2, pv);
		fv.touch(p);
	}
	state.loop = 1;
}
function MSIRP(a, state) {
	const stack = state.stack;
	const d = stack.pop() / 64;
	const pi = stack.pop();
	const p = state.z1[pi];
	const rp0 = state.z0[state.rp0];
	const fv = state.fv;
	const pv = state.pv;
	fv.setRelative(p, rp0, d, pv);
	fv.touch(p);
	if (exports.DEBUG) console.log(state.step, "MSIRP[" + a + "]", d, pi);
	state.rp1 = state.rp0;
	state.rp2 = pi;
	if (a) state.rp0 = pi;
}
function ALIGNRP(state) {
	const stack = state.stack;
	const rp0i = state.rp0;
	const rp0 = state.z0[rp0i];
	let loop = state.loop;
	const fv = state.fv;
	const pv = state.pv;
	const z1 = state.z1;
	while (loop--) {
		const pi = stack.pop();
		const p = z1[pi];
		if (exports.DEBUG) console.log(state.step, (state.loop > 1 ? "loop " + (state.loop - loop) + ": " : "") + "ALIGNRP[]", pi);
		fv.setRelative(p, rp0, 0, pv);
		fv.touch(p);
	}
	state.loop = 1;
}
function RTDG(state) {
	if (exports.DEBUG) console.log(state.step, "RTDG[]");
	state.round = roundToDoubleGrid;
}
function MIAP(round, state) {
	const stack = state.stack;
	const n = stack.pop();
	const pi = stack.pop();
	const p = state.z0[pi];
	const fv = state.fv;
	const pv = state.pv;
	let cv = state.cvt[n];
	if (round) cv = state.round(cv);
	if (exports.DEBUG) console.log(state.step, "MIAP[" + round + "]", n, "(", cv, ")", pi);
	fv.setRelative(p, HPZero, cv, pv);
	if (state.zp0 === 0) {
		p.xo = p.x;
		p.yo = p.y;
	}
	fv.touch(p);
	state.rp0 = state.rp1 = pi;
}
function NPUSHB(state) {
	const prog = state.prog;
	let ip = state.ip;
	const stack = state.stack;
	const n = prog[++ip];
	if (exports.DEBUG) console.log(state.step, "NPUSHB[]", n);
	for (let i = 0; i < n; i++) stack.push(prog[++ip]);
	state.ip = ip;
}
function NPUSHW(state) {
	let ip = state.ip;
	const prog = state.prog;
	const stack = state.stack;
	const n = prog[++ip];
	if (exports.DEBUG) console.log(state.step, "NPUSHW[]", n);
	for (let i = 0; i < n; i++) {
		let w = prog[++ip] << 8 | prog[++ip];
		if (w & 32768) w = -((w ^ 65535) + 1);
		stack.push(w);
	}
	state.ip = ip;
}
function WS(state) {
	const stack = state.stack;
	let store = state.store;
	if (!store) store = state.store = [];
	const v = stack.pop();
	const l = stack.pop();
	if (exports.DEBUG) console.log(state.step, "WS", v, l);
	store[l] = v;
}
function RS(state) {
	const stack = state.stack;
	const store = state.store;
	const l = stack.pop();
	if (exports.DEBUG) console.log(state.step, "RS", l);
	const v = store && store[l] || 0;
	stack.push(v);
}
function WCVTP(state) {
	const stack = state.stack;
	const v = stack.pop();
	const l = stack.pop();
	if (exports.DEBUG) console.log(state.step, "WCVTP", v, l);
	state.cvt[l] = v / 64;
}
function RCVT(state) {
	const stack = state.stack;
	const cvte = stack.pop();
	if (exports.DEBUG) console.log(state.step, "RCVT", cvte);
	stack.push(state.cvt[cvte] * 64);
}
function GC(a, state) {
	const stack = state.stack;
	const pi = stack.pop();
	const p = state.z2[pi];
	if (exports.DEBUG) console.log(state.step, "GC[" + a + "]", pi);
	stack.push(state.dpv.distance(p, HPZero, a, false) * 64);
}
function MD(a, state) {
	const stack = state.stack;
	const pi2 = stack.pop();
	const pi1 = stack.pop();
	const p2 = state.z1[pi2];
	const p1 = state.z0[pi1];
	const d = state.dpv.distance(p1, p2, a, a);
	if (exports.DEBUG) console.log(state.step, "MD[" + a + "]", pi2, pi1, "->", d);
	state.stack.push(Math.round(d * 64));
}
function MPPEM(state) {
	if (exports.DEBUG) console.log(state.step, "MPPEM[]");
	state.stack.push(state.ppem);
}
function FLIPON(state) {
	if (exports.DEBUG) console.log(state.step, "FLIPON[]");
	state.autoFlip = true;
}
function LT(state) {
	const stack = state.stack;
	const e2 = stack.pop();
	const e1 = stack.pop();
	if (exports.DEBUG) console.log(state.step, "LT[]", e2, e1);
	stack.push(e1 < e2 ? 1 : 0);
}
function LTEQ(state) {
	const stack = state.stack;
	const e2 = stack.pop();
	const e1 = stack.pop();
	if (exports.DEBUG) console.log(state.step, "LTEQ[]", e2, e1);
	stack.push(e1 <= e2 ? 1 : 0);
}
function GT(state) {
	const stack = state.stack;
	const e2 = stack.pop();
	const e1 = stack.pop();
	if (exports.DEBUG) console.log(state.step, "GT[]", e2, e1);
	stack.push(e1 > e2 ? 1 : 0);
}
function GTEQ(state) {
	const stack = state.stack;
	const e2 = stack.pop();
	const e1 = stack.pop();
	if (exports.DEBUG) console.log(state.step, "GTEQ[]", e2, e1);
	stack.push(e1 >= e2 ? 1 : 0);
}
function EQ(state) {
	const stack = state.stack;
	const e2 = stack.pop();
	const e1 = stack.pop();
	if (exports.DEBUG) console.log(state.step, "EQ[]", e2, e1);
	stack.push(e2 === e1 ? 1 : 0);
}
function NEQ(state) {
	const stack = state.stack;
	const e2 = stack.pop();
	const e1 = stack.pop();
	if (exports.DEBUG) console.log(state.step, "NEQ[]", e2, e1);
	stack.push(e2 !== e1 ? 1 : 0);
}
function ODD(state) {
	const stack = state.stack;
	const n = stack.pop();
	if (exports.DEBUG) console.log(state.step, "ODD[]", n);
	stack.push(Math.trunc(n) % 2 ? 1 : 0);
}
function EVEN(state) {
	const stack = state.stack;
	const n = stack.pop();
	if (exports.DEBUG) console.log(state.step, "EVEN[]", n);
	stack.push(Math.trunc(n) % 2 ? 0 : 1);
}
function IF(state) {
	let test = state.stack.pop();
	if (exports.DEBUG) console.log(state.step, "IF[]", test);
	if (!test) {
		skip(state, true);
		if (exports.DEBUG) console.log(state.step, "EIF[]");
	}
}
function EIF(state) {
	if (exports.DEBUG) console.log(state.step, "EIF[]");
}
function AND(state) {
	const stack = state.stack;
	const e2 = stack.pop();
	const e1 = stack.pop();
	if (exports.DEBUG) console.log(state.step, "AND[]", e2, e1);
	stack.push(e2 && e1 ? 1 : 0);
}
function OR(state) {
	const stack = state.stack;
	const e2 = stack.pop();
	const e1 = stack.pop();
	if (exports.DEBUG) console.log(state.step, "OR[]", e2, e1);
	stack.push(e2 || e1 ? 1 : 0);
}
function NOT(state) {
	const stack = state.stack;
	const e = stack.pop();
	if (exports.DEBUG) console.log(state.step, "NOT[]", e);
	stack.push(e ? 0 : 1);
}
function DELTAP123(b, state) {
	const stack = state.stack;
	const n = stack.pop();
	const fv = state.fv;
	const pv = state.pv;
	const ppem = state.ppem;
	const base = state.deltaBase + (b - 1) * 16;
	const ds = state.deltaShift;
	const z0 = state.z0;
	if (exports.DEBUG) console.log(state.step, "DELTAP[" + b + "]", n, stack);
	for (let i = 0; i < n; i++) {
		const pi = stack.pop();
		const arg = stack.pop();
		if (base + ((arg & 240) >> 4) !== ppem) continue;
		let mag = (arg & 15) - 8;
		if (mag >= 0) mag++;
		if (exports.DEBUG) console.log(state.step, "DELTAPFIX", pi, "by", mag * ds);
		const p = z0[pi];
		fv.setRelative(p, p, mag * ds, pv);
	}
}
function SDB(state) {
	const n = state.stack.pop();
	if (exports.DEBUG) console.log(state.step, "SDB[]", n);
	state.deltaBase = n;
}
function SDS(state) {
	const n = state.stack.pop();
	if (exports.DEBUG) console.log(state.step, "SDS[]", n);
	state.deltaShift = Math.pow(.5, n);
}
function ADD(state) {
	const stack = state.stack;
	const n2 = stack.pop();
	const n1 = stack.pop();
	if (exports.DEBUG) console.log(state.step, "ADD[]", n2, n1);
	stack.push(n1 + n2);
}
function SUB(state) {
	const stack = state.stack;
	const n2 = stack.pop();
	const n1 = stack.pop();
	if (exports.DEBUG) console.log(state.step, "SUB[]", n2, n1);
	stack.push(n1 - n2);
}
function DIV(state) {
	const stack = state.stack;
	const n2 = stack.pop();
	const n1 = stack.pop();
	if (exports.DEBUG) console.log(state.step, "DIV[]", n2, n1);
	stack.push(n1 * 64 / n2);
}
function MUL(state) {
	const stack = state.stack;
	const n2 = stack.pop();
	const n1 = stack.pop();
	if (exports.DEBUG) console.log(state.step, "MUL[]", n2, n1);
	stack.push(n1 * n2 / 64);
}
function ABS(state) {
	const stack = state.stack;
	const n = stack.pop();
	if (exports.DEBUG) console.log(state.step, "ABS[]", n);
	stack.push(Math.abs(n));
}
function NEG(state) {
	const stack = state.stack;
	let n = stack.pop();
	if (exports.DEBUG) console.log(state.step, "NEG[]", n);
	stack.push(-n);
}
function FLOOR(state) {
	const stack = state.stack;
	const n = stack.pop();
	if (exports.DEBUG) console.log(state.step, "FLOOR[]", n);
	stack.push(Math.floor(n / 64) * 64);
}
function CEILING(state) {
	const stack = state.stack;
	const n = stack.pop();
	if (exports.DEBUG) console.log(state.step, "CEILING[]", n);
	stack.push(Math.ceil(n / 64) * 64);
}
function ROUND(dt, state) {
	const stack = state.stack;
	const n = stack.pop();
	if (exports.DEBUG) console.log(state.step, "ROUND[]");
	stack.push(state.round(n / 64) * 64);
}
function WCVTF(state) {
	const stack = state.stack;
	const v = stack.pop();
	const l = stack.pop();
	if (exports.DEBUG) console.log(state.step, "WCVTF[]", v, l);
	state.cvt[l] = v * state.ppem / state.font.unitsPerEm;
}
function DELTAC123(b, state) {
	const stack = state.stack;
	const n = stack.pop();
	const ppem = state.ppem;
	const base = state.deltaBase + (b - 1) * 16;
	const ds = state.deltaShift;
	if (exports.DEBUG) console.log(state.step, "DELTAC[" + b + "]", n, stack);
	for (let i = 0; i < n; i++) {
		const c = stack.pop();
		const arg = stack.pop();
		if (base + ((arg & 240) >> 4) !== ppem) continue;
		let mag = (arg & 15) - 8;
		if (mag >= 0) mag++;
		const delta = mag * ds;
		if (exports.DEBUG) console.log(state.step, "DELTACFIX", c, "by", delta);
		state.cvt[c] += delta;
	}
}
function SROUND(state) {
	let n = state.stack.pop();
	if (exports.DEBUG) console.log(state.step, "SROUND[]", n);
	state.round = roundSuper;
	let period;
	switch (n & 192) {
		case 0:
			period = .5;
			break;
		case 64:
			period = 1;
			break;
		case 128:
			period = 2;
			break;
		default: throw new Error("invalid SROUND value");
	}
	state.srPeriod = period;
	switch (n & 48) {
		case 0:
			state.srPhase = 0;
			break;
		case 16:
			state.srPhase = .25 * period;
			break;
		case 32:
			state.srPhase = .5 * period;
			break;
		case 48:
			state.srPhase = .75 * period;
			break;
		default: throw new Error("invalid SROUND value");
	}
	n &= 15;
	if (n === 0) state.srThreshold = 0;
	else state.srThreshold = (n / 8 - .5) * period;
}
function S45ROUND(state) {
	let n = state.stack.pop();
	if (exports.DEBUG) console.log(state.step, "S45ROUND[]", n);
	state.round = roundSuper;
	let period;
	switch (n & 192) {
		case 0:
			period = Math.sqrt(2) / 2;
			break;
		case 64:
			period = Math.sqrt(2);
			break;
		case 128:
			period = 2 * Math.sqrt(2);
			break;
		default: throw new Error("invalid S45ROUND value");
	}
	state.srPeriod = period;
	switch (n & 48) {
		case 0:
			state.srPhase = 0;
			break;
		case 16:
			state.srPhase = .25 * period;
			break;
		case 32:
			state.srPhase = .5 * period;
			break;
		case 48:
			state.srPhase = .75 * period;
			break;
		default: throw new Error("invalid S45ROUND value");
	}
	n &= 15;
	if (n === 0) state.srThreshold = 0;
	else state.srThreshold = (n / 8 - .5) * period;
}
function ROFF(state) {
	if (exports.DEBUG) console.log(state.step, "ROFF[]");
	state.round = roundOff;
}
function RUTG(state) {
	if (exports.DEBUG) console.log(state.step, "RUTG[]");
	state.round = roundUpToGrid;
}
function RDTG(state) {
	if (exports.DEBUG) console.log(state.step, "RDTG[]");
	state.round = roundDownToGrid;
}
function SCANCTRL(state) {
	const n = state.stack.pop();
	if (exports.DEBUG) console.log(state.step, "SCANCTRL[]", n);
}
function SDPVTL(a, state) {
	const stack = state.stack;
	const p2i = stack.pop();
	const p1i = stack.pop();
	const p2 = state.z2[p2i];
	const p1 = state.z1[p1i];
	if (exports.DEBUG) console.log("SDPVTL[" + a + "]", p2i, p1i);
	let dx;
	let dy;
	if (!a) {
		dx = p1.x - p2.x;
		dy = p1.y - p2.y;
	} else {
		dx = p2.y - p1.y;
		dy = p1.x - p2.x;
	}
	state.dpv = getUnitVector(dx, dy);
}
function GETINFO(state) {
	const stack = state.stack;
	const sel = stack.pop();
	let r = 0;
	if (exports.DEBUG) console.log(state.step, "GETINFO[]", sel);
	if (sel & 1) r = 35;
	if (sel & 32) r |= 4096;
	stack.push(r);
}
function ROLL(state) {
	const stack = state.stack;
	const a = stack.pop();
	const b = stack.pop();
	const c = stack.pop();
	if (exports.DEBUG) console.log(state.step, "ROLL[]");
	stack.push(b);
	stack.push(a);
	stack.push(c);
}
function MAX(state) {
	const stack = state.stack;
	const e2 = stack.pop();
	const e1 = stack.pop();
	if (exports.DEBUG) console.log(state.step, "MAX[]", e2, e1);
	stack.push(Math.max(e1, e2));
}
function MIN(state) {
	const stack = state.stack;
	const e2 = stack.pop();
	const e1 = stack.pop();
	if (exports.DEBUG) console.log(state.step, "MIN[]", e2, e1);
	stack.push(Math.min(e1, e2));
}
function SCANTYPE(state) {
	const n = state.stack.pop();
	if (exports.DEBUG) console.log(state.step, "SCANTYPE[]", n);
}
function INSTCTRL(state) {
	const s = state.stack.pop();
	let v = state.stack.pop();
	if (exports.DEBUG) console.log(state.step, "INSTCTRL[]", s, v);
	switch (s) {
		case 1:
			state.inhibitGridFit = !!v;
			return;
		case 2:
			state.ignoreCvt = !!v;
			return;
		default: throw new Error("invalid INSTCTRL[] selector");
	}
}
function PUSHB(n, state) {
	const stack = state.stack;
	const prog = state.prog;
	let ip = state.ip;
	if (exports.DEBUG) console.log(state.step, "PUSHB[" + n + "]");
	for (let i = 0; i < n; i++) stack.push(prog[++ip]);
	state.ip = ip;
}
function PUSHW(n, state) {
	let ip = state.ip;
	const prog = state.prog;
	const stack = state.stack;
	if (exports.DEBUG) console.log(state.ip, "PUSHW[" + n + "]");
	for (let i = 0; i < n; i++) {
		let w = prog[++ip] << 8 | prog[++ip];
		if (w & 32768) w = -((w ^ 65535) + 1);
		stack.push(w);
	}
	state.ip = ip;
}
function MDRP_MIRP(indirect, setRp0, keepD, ro, dt, state) {
	const stack = state.stack;
	const cvte = indirect && stack.pop();
	const pi = stack.pop();
	const rp0i = state.rp0;
	const rp = state.z0[rp0i];
	const p = state.z1[pi];
	const md = state.minDis;
	const fv = state.fv;
	const pv = state.dpv;
	let od;
	let d;
	let sign;
	let cv;
	d = od = pv.distance(p, rp, true, true);
	sign = d >= 0 ? 1 : -1;
	d = Math.abs(d);
	if (indirect) {
		cv = state.cvt[cvte];
		if (ro && Math.abs(d - cv) < state.cvCutIn) d = cv;
	}
	if (keepD && d < md) d = md;
	if (ro) d = state.round(d);
	fv.setRelative(p, rp, sign * d, pv);
	fv.touch(p);
	if (exports.DEBUG) console.log(state.step, (indirect ? "MIRP[" : "MDRP[") + (setRp0 ? "M" : "m") + (keepD ? ">" : "_") + (ro ? "R" : "_") + (dt === 0 ? "Gr" : dt === 1 ? "Bl" : dt === 2 ? "Wh" : "") + "]", indirect ? cvte + "(" + state.cvt[cvte] + "," + cv + ")" : "", pi, "(d =", od, "->", sign * d, ")");
	state.rp1 = state.rp0;
	state.rp2 = pi;
	if (setRp0) state.rp0 = pi;
}
instructionTable = [
	SVTCA.bind(void 0, yUnitVector),
	SVTCA.bind(void 0, xUnitVector),
	SPVTCA.bind(void 0, yUnitVector),
	SPVTCA.bind(void 0, xUnitVector),
	SFVTCA.bind(void 0, yUnitVector),
	SFVTCA.bind(void 0, xUnitVector),
	SPVTL.bind(void 0, 0),
	SPVTL.bind(void 0, 1),
	SFVTL.bind(void 0, 0),
	SFVTL.bind(void 0, 1),
	SPVFS,
	SFVFS,
	GPV,
	GFV,
	SFVTPV,
	ISECT,
	SRP0,
	SRP1,
	SRP2,
	SZP0,
	SZP1,
	SZP2,
	SZPS,
	SLOOP,
	RTG,
	RTHG,
	SMD,
	ELSE,
	JMPR,
	SCVTCI,
	void 0,
	void 0,
	DUP,
	POP,
	CLEAR,
	SWAP,
	DEPTH,
	CINDEX,
	MINDEX,
	void 0,
	void 0,
	void 0,
	LOOPCALL,
	CALL,
	FDEF,
	void 0,
	MDAP.bind(void 0, 0),
	MDAP.bind(void 0, 1),
	IUP.bind(void 0, yUnitVector),
	IUP.bind(void 0, xUnitVector),
	SHP.bind(void 0, 0),
	SHP.bind(void 0, 1),
	SHC.bind(void 0, 0),
	SHC.bind(void 0, 1),
	SHZ.bind(void 0, 0),
	SHZ.bind(void 0, 1),
	SHPIX,
	IP,
	MSIRP.bind(void 0, 0),
	MSIRP.bind(void 0, 1),
	ALIGNRP,
	RTDG,
	MIAP.bind(void 0, 0),
	MIAP.bind(void 0, 1),
	NPUSHB,
	NPUSHW,
	WS,
	RS,
	WCVTP,
	RCVT,
	GC.bind(void 0, 0),
	GC.bind(void 0, 1),
	void 0,
	MD.bind(void 0, 0),
	MD.bind(void 0, 1),
	MPPEM,
	void 0,
	FLIPON,
	void 0,
	void 0,
	LT,
	LTEQ,
	GT,
	GTEQ,
	EQ,
	NEQ,
	ODD,
	EVEN,
	IF,
	EIF,
	AND,
	OR,
	NOT,
	DELTAP123.bind(void 0, 1),
	SDB,
	SDS,
	ADD,
	SUB,
	DIV,
	MUL,
	ABS,
	NEG,
	FLOOR,
	CEILING,
	ROUND.bind(void 0, 0),
	ROUND.bind(void 0, 1),
	ROUND.bind(void 0, 2),
	ROUND.bind(void 0, 3),
	void 0,
	void 0,
	void 0,
	void 0,
	WCVTF,
	DELTAP123.bind(void 0, 2),
	DELTAP123.bind(void 0, 3),
	DELTAC123.bind(void 0, 1),
	DELTAC123.bind(void 0, 2),
	DELTAC123.bind(void 0, 3),
	SROUND,
	S45ROUND,
	void 0,
	void 0,
	ROFF,
	void 0,
	RUTG,
	RDTG,
	POP,
	POP,
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
	SCANCTRL,
	SDPVTL.bind(void 0, 0),
	SDPVTL.bind(void 0, 1),
	GETINFO,
	void 0,
	ROLL,
	MAX,
	MIN,
	SCANTYPE,
	INSTCTRL,
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
	void 0,
	PUSHB.bind(void 0, 1),
	PUSHB.bind(void 0, 2),
	PUSHB.bind(void 0, 3),
	PUSHB.bind(void 0, 4),
	PUSHB.bind(void 0, 5),
	PUSHB.bind(void 0, 6),
	PUSHB.bind(void 0, 7),
	PUSHB.bind(void 0, 8),
	PUSHW.bind(void 0, 1),
	PUSHW.bind(void 0, 2),
	PUSHW.bind(void 0, 3),
	PUSHW.bind(void 0, 4),
	PUSHW.bind(void 0, 5),
	PUSHW.bind(void 0, 6),
	PUSHW.bind(void 0, 7),
	PUSHW.bind(void 0, 8),
	MDRP_MIRP.bind(void 0, 0, 0, 0, 0, 0),
	MDRP_MIRP.bind(void 0, 0, 0, 0, 0, 1),
	MDRP_MIRP.bind(void 0, 0, 0, 0, 0, 2),
	MDRP_MIRP.bind(void 0, 0, 0, 0, 0, 3),
	MDRP_MIRP.bind(void 0, 0, 0, 0, 1, 0),
	MDRP_MIRP.bind(void 0, 0, 0, 0, 1, 1),
	MDRP_MIRP.bind(void 0, 0, 0, 0, 1, 2),
	MDRP_MIRP.bind(void 0, 0, 0, 0, 1, 3),
	MDRP_MIRP.bind(void 0, 0, 0, 1, 0, 0),
	MDRP_MIRP.bind(void 0, 0, 0, 1, 0, 1),
	MDRP_MIRP.bind(void 0, 0, 0, 1, 0, 2),
	MDRP_MIRP.bind(void 0, 0, 0, 1, 0, 3),
	MDRP_MIRP.bind(void 0, 0, 0, 1, 1, 0),
	MDRP_MIRP.bind(void 0, 0, 0, 1, 1, 1),
	MDRP_MIRP.bind(void 0, 0, 0, 1, 1, 2),
	MDRP_MIRP.bind(void 0, 0, 0, 1, 1, 3),
	MDRP_MIRP.bind(void 0, 0, 1, 0, 0, 0),
	MDRP_MIRP.bind(void 0, 0, 1, 0, 0, 1),
	MDRP_MIRP.bind(void 0, 0, 1, 0, 0, 2),
	MDRP_MIRP.bind(void 0, 0, 1, 0, 0, 3),
	MDRP_MIRP.bind(void 0, 0, 1, 0, 1, 0),
	MDRP_MIRP.bind(void 0, 0, 1, 0, 1, 1),
	MDRP_MIRP.bind(void 0, 0, 1, 0, 1, 2),
	MDRP_MIRP.bind(void 0, 0, 1, 0, 1, 3),
	MDRP_MIRP.bind(void 0, 0, 1, 1, 0, 0),
	MDRP_MIRP.bind(void 0, 0, 1, 1, 0, 1),
	MDRP_MIRP.bind(void 0, 0, 1, 1, 0, 2),
	MDRP_MIRP.bind(void 0, 0, 1, 1, 0, 3),
	MDRP_MIRP.bind(void 0, 0, 1, 1, 1, 0),
	MDRP_MIRP.bind(void 0, 0, 1, 1, 1, 1),
	MDRP_MIRP.bind(void 0, 0, 1, 1, 1, 2),
	MDRP_MIRP.bind(void 0, 0, 1, 1, 1, 3),
	MDRP_MIRP.bind(void 0, 1, 0, 0, 0, 0),
	MDRP_MIRP.bind(void 0, 1, 0, 0, 0, 1),
	MDRP_MIRP.bind(void 0, 1, 0, 0, 0, 2),
	MDRP_MIRP.bind(void 0, 1, 0, 0, 0, 3),
	MDRP_MIRP.bind(void 0, 1, 0, 0, 1, 0),
	MDRP_MIRP.bind(void 0, 1, 0, 0, 1, 1),
	MDRP_MIRP.bind(void 0, 1, 0, 0, 1, 2),
	MDRP_MIRP.bind(void 0, 1, 0, 0, 1, 3),
	MDRP_MIRP.bind(void 0, 1, 0, 1, 0, 0),
	MDRP_MIRP.bind(void 0, 1, 0, 1, 0, 1),
	MDRP_MIRP.bind(void 0, 1, 0, 1, 0, 2),
	MDRP_MIRP.bind(void 0, 1, 0, 1, 0, 3),
	MDRP_MIRP.bind(void 0, 1, 0, 1, 1, 0),
	MDRP_MIRP.bind(void 0, 1, 0, 1, 1, 1),
	MDRP_MIRP.bind(void 0, 1, 0, 1, 1, 2),
	MDRP_MIRP.bind(void 0, 1, 0, 1, 1, 3),
	MDRP_MIRP.bind(void 0, 1, 1, 0, 0, 0),
	MDRP_MIRP.bind(void 0, 1, 1, 0, 0, 1),
	MDRP_MIRP.bind(void 0, 1, 1, 0, 0, 2),
	MDRP_MIRP.bind(void 0, 1, 1, 0, 0, 3),
	MDRP_MIRP.bind(void 0, 1, 1, 0, 1, 0),
	MDRP_MIRP.bind(void 0, 1, 1, 0, 1, 1),
	MDRP_MIRP.bind(void 0, 1, 1, 0, 1, 2),
	MDRP_MIRP.bind(void 0, 1, 1, 0, 1, 3),
	MDRP_MIRP.bind(void 0, 1, 1, 1, 0, 0),
	MDRP_MIRP.bind(void 0, 1, 1, 1, 0, 1),
	MDRP_MIRP.bind(void 0, 1, 1, 1, 0, 2),
	MDRP_MIRP.bind(void 0, 1, 1, 1, 0, 3),
	MDRP_MIRP.bind(void 0, 1, 1, 1, 1, 0),
	MDRP_MIRP.bind(void 0, 1, 1, 1, 1, 1),
	MDRP_MIRP.bind(void 0, 1, 1, 1, 1, 2),
	MDRP_MIRP.bind(void 0, 1, 1, 1, 1, 3)
];
/*****************************
Mathematical Considerations
******************************

fv ... refers to freedom vector
pv ... refers to projection vector
rp ... refers to reference point
p  ... refers to to point being operated on
d  ... refers to distance

SETRELATIVE:
============

case freedom vector == x-axis:
------------------------------

(pv)
.-'
rpd .-'
.-*
d .-'90°'
.-'       '
.-'           '
*-'               ' b
rp                  '
'
'
p *----------*-------------- (fv)
pm

rpdx = rpx + d * pv.x
rpdy = rpy + d * pv.y

equation of line b

y - rpdy = pvns * (x- rpdx)

y = p.y

x = rpdx + ( p.y - rpdy ) / pvns


case freedom vector == y-axis:
------------------------------

* pm
|\
| \
|  \
|   \
|    \
|     \
|      \
|       \
|        \
|         \ b
|          \
|           \
|            \    .-' (pv)
|         90° \.-'
|           .-'* rpd
|        .-'
*     *-'  d
p     rp

rpdx = rpx + d * pv.x
rpdy = rpy + d * pv.y

equation of line b:
pvns ... normal slope to pv

y - rpdy = pvns * (x - rpdx)

x = p.x

y = rpdy +  pvns * (p.x - rpdx)



generic case:
-------------


.'(fv)
.'
.* pm
.' !
.'    .
.'      !
.'         . b
.'           !
*              .
p               !
90°   .    ... (pv)
...-*-'''
...---'''    rpd
...---'''   d
*--'''
rp

rpdx = rpx + d * pv.x
rpdy = rpy + d * pv.y

equation of line b:
pvns... normal slope to pv

y - rpdy = pvns * (x - rpdx)

equation of freedom vector line:
fvs ... slope of freedom vector (=fy/fx)

y - py = fvs * (x - px)


on pm both equations are true for same x/y

y - rpdy = pvns * (x - rpdx)

y - py = fvs * (x - px)

form to y and set equal:

pvns * (x - rpdx) + rpdy = fvs * (x - px) + py

expand:

pvns * x - pvns * rpdx + rpdy = fvs * x - fvs * px + py

switch:

fvs * x - fvs * px + py = pvns * x - pvns * rpdx + rpdy

solve for x:

fvs * x - pvns * x = fvs * px - pvns * rpdx - py + rpdy



fvs * px - pvns * rpdx + rpdy - py
x =  -----------------------------------
fvs - pvns

and:

y = fvs * (x - px) + py



INTERPOLATE:
============

Examples of point interpolation.

The weight of the movement of the reference point gets bigger
the further the other reference point is away, thus the safest
option (that is avoiding 0/0 divisions) is to weight the
original distance of the other point by the sum of both distances.

If the sum of both distances is 0, then move the point by the
arithmetic average of the movement of both reference points.




(+6)
rp1o *---->*rp1
.     .                          (+12)
.     .                  rp2o *---------->* rp2
.     .                       .           .
.     .                       .           .
.    10          20           .           .
|.........|...................|           .
.   .                               .
.   . (+8)                          .
po *------>*p                      .
.           .                       .
.    12     .          24           .
|...........|.......................|
36


-------



(+10)
rp1o *-------->*rp1
.         .                      (-10)
.         .              rp2 *<---------* rpo2
.         .                   .         .
.         .                   .         .
.    10   .          30       .         .
|.........|.............................|
.                   .
. (+5)              .
po *--->* p            .
.    .              .
.    .   20         .
|....|..............|
5        15


-------


(+10)
rp1o *-------->*rp1
.         .
.         .
rp2o *-------->*rp2


(+10)
po *-------->* p

-------


(+10)
rp1o *-------->*rp1
.         .
.         .(+30)
rp2o *---------------------------->*rp2


(+25)
po *----------------------->* p



vim: set ts=4 sw=4 expandtab:
*****/
//#endregion
//#region __vite-browser-external
var require___vite_browser_external = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {};
}));
//#endregion
//#region node_modules/opentype.js/src/font.js
/**
* @typedef FontOptions
* @type Object
* @property {Boolean} empty - whether to create a new empty font
* @property {string} familyName
* @property {string} styleName
* @property {string=} fullName
* @property {string=} postScriptName
* @property {string=} designer
* @property {string=} designerURL
* @property {string=} manufacturer
* @property {string=} manufacturerURL
* @property {string=} license
* @property {string=} licenseURL
* @property {string=} version
* @property {string=} description
* @property {string=} copyright
* @property {string=} trademark
* @property {Number} unitsPerEm
* @property {Number} ascender
* @property {Number} descender
* @property {Number} createdTimestamp
* @property {string=} weightClass
* @property {string=} widthClass
* @property {string=} fsSelection
*/
/**
* A Font represents a loaded OpenType font file.
* It contains a set of glyphs and methods to draw text on a drawing context,
* or to get a path representing the text.
* @exports opentype.Font
* @class
* @param {FontOptions}
* @constructor
*/
function Font(options) {
	options = options || {};
	if (!options.empty) {
		checkArgument(options.familyName, "When creating a new Font object, familyName is required.");
		checkArgument(options.styleName, "When creating a new Font object, styleName is required.");
		checkArgument(options.unitsPerEm, "When creating a new Font object, unitsPerEm is required.");
		checkArgument(options.ascender, "When creating a new Font object, ascender is required.");
		checkArgument(options.descender, "When creating a new Font object, descender is required.");
		checkArgument(options.descender < 0, "Descender should be negative (e.g. -512).");
		this.names = {
			fontFamily: { en: options.familyName || " " },
			fontSubfamily: { en: options.styleName || " " },
			fullName: { en: options.fullName || options.familyName + " " + options.styleName },
			postScriptName: { en: options.postScriptName || options.familyName + options.styleName },
			designer: { en: options.designer || " " },
			designerURL: { en: options.designerURL || " " },
			manufacturer: { en: options.manufacturer || " " },
			manufacturerURL: { en: options.manufacturerURL || " " },
			license: { en: options.license || " " },
			licenseURL: { en: options.licenseURL || " " },
			version: { en: options.version || "Version 0.1" },
			description: { en: options.description || " " },
			copyright: { en: options.copyright || " " },
			trademark: { en: options.trademark || " " }
		};
		this.unitsPerEm = options.unitsPerEm || 1e3;
		this.ascender = options.ascender;
		this.descender = options.descender;
		this.createdTimestamp = options.createdTimestamp;
		this.tables = { os2: {
			usWeightClass: options.weightClass || this.usWeightClasses.MEDIUM,
			usWidthClass: options.widthClass || this.usWidthClasses.MEDIUM,
			fsSelection: options.fsSelection || this.fsSelectionValues.REGULAR
		} };
	}
	this.supported = true;
	this.glyphs = new glyphset_default.GlyphSet(this, options.glyphs || []);
	this.encoding = new DefaultEncoding(this);
	this.substitution = new Substitution(this);
	this.tables = this.tables || {};
	Object.defineProperty(this, "hinting", { get: function() {
		if (this._hinting) return this._hinting;
		if (this.outlinesFormat === "truetype") return this._hinting = new Hinting(this);
	} });
}
/**
* Check if the font has a glyph for the given character.
* @param  {string}
* @return {Boolean}
*/
Font.prototype.hasChar = function(c) {
	return this.encoding.charToGlyphIndex(c) !== null;
};
/**
* Convert the given character to a single glyph index.
* Note that this function assumes that there is a one-to-one mapping between
* the given character and a glyph; for complex scripts this might not be the case.
* @param  {string}
* @return {Number}
*/
Font.prototype.charToGlyphIndex = function(s) {
	return this.encoding.charToGlyphIndex(s);
};
/**
* Convert the given character to a single Glyph object.
* Note that this function assumes that there is a one-to-one mapping between
* the given character and a glyph; for complex scripts this might not be the case.
* @param  {string}
* @return {opentype.Glyph}
*/
Font.prototype.charToGlyph = function(c) {
	const glyphIndex = this.charToGlyphIndex(c);
	let glyph = this.glyphs.get(glyphIndex);
	if (!glyph) glyph = this.glyphs.get(0);
	return glyph;
};
/**
* Convert the given text to a list of Glyph objects.
* Note that there is no strict one-to-one mapping between characters and
* glyphs, so the list of returned glyphs can be larger or smaller than the
* length of the given string.
* @param  {string}
* @param  {GlyphRenderOptions} [options]
* @return {opentype.Glyph[]}
*/
Font.prototype.stringToGlyphs = function(s, options) {
	options = options || this.defaultRenderOptions;
	const indexes = [];
	for (let i = 0; i < s.length; i += 1) {
		const c = s[i];
		indexes.push(this.charToGlyphIndex(c));
	}
	let length = indexes.length;
	if (options.features) {
		const script = options.script || this.substitution.getDefaultScriptName();
		let manyToOne = [];
		if (options.features.liga) manyToOne = manyToOne.concat(this.substitution.getFeature("liga", script, options.language));
		if (options.features.rlig) manyToOne = manyToOne.concat(this.substitution.getFeature("rlig", script, options.language));
		for (let i = 0; i < length; i += 1) for (let j = 0; j < manyToOne.length; j++) {
			const ligature = manyToOne[j];
			const components = ligature.sub;
			const compCount = components.length;
			let k = 0;
			while (k < compCount && components[k] === indexes[i + k]) k++;
			if (k === compCount) {
				indexes.splice(i, compCount, ligature.by);
				length = length - compCount + 1;
			}
		}
	}
	const glyphs = new Array(length);
	const notdef = this.glyphs.get(0);
	for (let i = 0; i < length; i += 1) glyphs[i] = this.glyphs.get(indexes[i]) || notdef;
	return glyphs;
};
/**
* @param  {string}
* @return {Number}
*/
Font.prototype.nameToGlyphIndex = function(name) {
	return this.glyphNames.nameToGlyphIndex(name);
};
/**
* @param  {string}
* @return {opentype.Glyph}
*/
Font.prototype.nameToGlyph = function(name) {
	const glyphIndex = this.nameToGlyphIndex(name);
	let glyph = this.glyphs.get(glyphIndex);
	if (!glyph) glyph = this.glyphs.get(0);
	return glyph;
};
/**
* @param  {Number}
* @return {String}
*/
Font.prototype.glyphIndexToName = function(gid) {
	if (!this.glyphNames.glyphIndexToName) return "";
	return this.glyphNames.glyphIndexToName(gid);
};
/**
* Retrieve the value of the kerning pair between the left glyph (or its index)
* and the right glyph (or its index). If no kerning pair is found, return 0.
* The kerning value gets added to the advance width when calculating the spacing
* between glyphs.
* @param  {opentype.Glyph} leftGlyph
* @param  {opentype.Glyph} rightGlyph
* @return {Number}
*/
Font.prototype.getKerningValue = function(leftGlyph, rightGlyph) {
	leftGlyph = leftGlyph.index || leftGlyph;
	rightGlyph = rightGlyph.index || rightGlyph;
	const gposKerning = this.getGposKerningValue;
	return gposKerning ? gposKerning(leftGlyph, rightGlyph) : this.kerningPairs[leftGlyph + "," + rightGlyph] || 0;
};
/**
* @typedef GlyphRenderOptions
* @type Object
* @property {string} [script] - script used to determine which features to apply. By default, 'DFLT' or 'latn' is used.
*                               See https://www.microsoft.com/typography/otspec/scripttags.htm
* @property {string} [language='dflt'] - language system used to determine which features to apply.
*                                        See https://www.microsoft.com/typography/developers/opentype/languagetags.aspx
* @property {boolean} [kerning=true] - whether to include kerning values
* @property {object} [features] - OpenType Layout feature tags. Used to enable or disable the features of the given script/language system.
*                                 See https://www.microsoft.com/typography/otspec/featuretags.htm
*/
Font.prototype.defaultRenderOptions = {
	kerning: true,
	features: {
		liga: true,
		rlig: true
	}
};
/**
* Helper function that invokes the given callback for each glyph in the given text.
* The callback gets `(glyph, x, y, fontSize, options)`.* @param  {string} text
* @param {string} text - The text to apply.
* @param  {number} [x=0] - Horizontal position of the beginning of the text.
* @param  {number} [y=0] - Vertical position of the *baseline* of the text.
* @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
* @param  {GlyphRenderOptions=} options
* @param  {Function} callback
*/
Font.prototype.forEachGlyph = function(text, x, y, fontSize, options, callback) {
	x = x !== void 0 ? x : 0;
	y = y !== void 0 ? y : 0;
	fontSize = fontSize !== void 0 ? fontSize : 72;
	options = options || this.defaultRenderOptions;
	const fontScale = 1 / this.unitsPerEm * fontSize;
	const glyphs = this.stringToGlyphs(text, options);
	for (let i = 0; i < glyphs.length; i += 1) {
		const glyph = glyphs[i];
		callback.call(this, glyph, x, y, fontSize, options);
		if (glyph.advanceWidth) x += glyph.advanceWidth * fontScale;
		if (options.kerning && i < glyphs.length - 1) {
			const kerningValue = this.getKerningValue(glyph, glyphs[i + 1]);
			x += kerningValue * fontScale;
		}
		if (options.letterSpacing) x += options.letterSpacing * fontSize;
		else if (options.tracking) x += options.tracking / 1e3 * fontSize;
	}
	return x;
};
/**
* Create a Path object that represents the given text.
* @param  {string} text - The text to create.
* @param  {number} [x=0] - Horizontal position of the beginning of the text.
* @param  {number} [y=0] - Vertical position of the *baseline* of the text.
* @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
* @param  {GlyphRenderOptions=} options
* @return {opentype.Path}
*/
Font.prototype.getPath = function(text, x, y, fontSize, options) {
	const fullPath = new Path();
	this.forEachGlyph(text, x, y, fontSize, options, function(glyph, gX, gY, gFontSize) {
		const glyphPath = glyph.getPath(gX, gY, gFontSize, options, this);
		fullPath.extend(glyphPath);
	});
	return fullPath;
};
/**
* Create an array of Path objects that represent the glyphs of a given text.
* @param  {string} text - The text to create.
* @param  {number} [x=0] - Horizontal position of the beginning of the text.
* @param  {number} [y=0] - Vertical position of the *baseline* of the text.
* @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
* @param  {GlyphRenderOptions=} options
* @return {opentype.Path[]}
*/
Font.prototype.getPaths = function(text, x, y, fontSize, options) {
	const glyphPaths = [];
	this.forEachGlyph(text, x, y, fontSize, options, function(glyph, gX, gY, gFontSize) {
		const glyphPath = glyph.getPath(gX, gY, gFontSize, options, this);
		glyphPaths.push(glyphPath);
	});
	return glyphPaths;
};
/**
* Returns the advance width of a text.
*
* This is something different than Path.getBoundingBox() as for example a
* suffixed whitespace increases the advanceWidth but not the bounding box
* or an overhanging letter like a calligraphic 'f' might have a quite larger
* bounding box than its advance width.
*
* This corresponds to canvas2dContext.measureText(text).width
*
* @param  {string} text - The text to create.
* @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
* @param  {GlyphRenderOptions=} options
* @return advance width
*/
Font.prototype.getAdvanceWidth = function(text, fontSize, options) {
	return this.forEachGlyph(text, 0, 0, fontSize, options, function() {});
};
/**
* Draw the text on the given drawing context.
* @param  {CanvasRenderingContext2D} ctx - A 2D drawing context, like Canvas.
* @param  {string} text - The text to create.
* @param  {number} [x=0] - Horizontal position of the beginning of the text.
* @param  {number} [y=0] - Vertical position of the *baseline* of the text.
* @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
* @param  {GlyphRenderOptions=} options
*/
Font.prototype.draw = function(ctx, text, x, y, fontSize, options) {
	this.getPath(text, x, y, fontSize, options).draw(ctx);
};
/**
* Draw the points of all glyphs in the text.
* On-curve points will be drawn in blue, off-curve points will be drawn in red.
* @param {CanvasRenderingContext2D} ctx - A 2D drawing context, like Canvas.
* @param {string} text - The text to create.
* @param {number} [x=0] - Horizontal position of the beginning of the text.
* @param {number} [y=0] - Vertical position of the *baseline* of the text.
* @param {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
* @param {GlyphRenderOptions=} options
*/
Font.prototype.drawPoints = function(ctx, text, x, y, fontSize, options) {
	this.forEachGlyph(text, x, y, fontSize, options, function(glyph, gX, gY, gFontSize) {
		glyph.drawPoints(ctx, gX, gY, gFontSize);
	});
};
/**
* Draw lines indicating important font measurements for all glyphs in the text.
* Black lines indicate the origin of the coordinate system (point 0,0).
* Blue lines indicate the glyph bounding box.
* Green line indicates the advance width of the glyph.
* @param {CanvasRenderingContext2D} ctx - A 2D drawing context, like Canvas.
* @param {string} text - The text to create.
* @param {number} [x=0] - Horizontal position of the beginning of the text.
* @param {number} [y=0] - Vertical position of the *baseline* of the text.
* @param {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
* @param {GlyphRenderOptions=} options
*/
Font.prototype.drawMetrics = function(ctx, text, x, y, fontSize, options) {
	this.forEachGlyph(text, x, y, fontSize, options, function(glyph, gX, gY, gFontSize) {
		glyph.drawMetrics(ctx, gX, gY, gFontSize);
	});
};
/**
* @param  {string}
* @return {string}
*/
Font.prototype.getEnglishName = function(name) {
	const translations = this.names[name];
	if (translations) return translations.en;
};
/**
* Validate
*/
Font.prototype.validate = function() {
	const warnings = [];
	const _this = this;
	function assert(predicate, message) {
		if (!predicate) warnings.push(message);
	}
	function assertNamePresent(name) {
		const englishName = _this.getEnglishName(name);
		assert(englishName && englishName.trim().length > 0, "No English " + name + " specified.");
	}
	assertNamePresent("fontFamily");
	assertNamePresent("weightName");
	assertNamePresent("manufacturer");
	assertNamePresent("copyright");
	assertNamePresent("version");
	assert(this.unitsPerEm > 0, "No unitsPerEm specified.");
};
/**
* Convert the font object to a SFNT data structure.
* This structure contains all the necessary tables and metadata to create a binary OTF file.
* @return {opentype.Table}
*/
Font.prototype.toTables = function() {
	return sfnt_default.fontToTable(this);
};
/**
* @deprecated Font.toBuffer is deprecated. Use Font.toArrayBuffer instead.
*/
Font.prototype.toBuffer = function() {
	console.warn("Font.toBuffer is deprecated. Use Font.toArrayBuffer instead.");
	return this.toArrayBuffer();
};
/**
* Converts a `opentype.Font` into an `ArrayBuffer`
* @return {ArrayBuffer}
*/
Font.prototype.toArrayBuffer = function() {
	const bytes = this.toTables().encode();
	const buffer = new ArrayBuffer(bytes.length);
	const intArray = new Uint8Array(buffer);
	for (let i = 0; i < bytes.length; i++) intArray[i] = bytes[i];
	return buffer;
};
/**
* Initiate a download of the OpenType font.
*/
Font.prototype.download = function(fileName) {
	const familyName = this.getEnglishName("fontFamily");
	const styleName = this.getEnglishName("fontSubfamily");
	fileName = fileName || familyName.replace(/\s/g, "") + "-" + styleName + ".otf";
	const arrayBuffer = this.toArrayBuffer();
	if (isBrowser()) {
		window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
		window.requestFileSystem(window.TEMPORARY, arrayBuffer.byteLength, function(fs) {
			fs.root.getFile(fileName, { create: true }, function(fileEntry) {
				fileEntry.createWriter(function(writer) {
					const dataView = new DataView(arrayBuffer);
					const blob = new Blob([dataView], { type: "font/opentype" });
					writer.write(blob);
					writer.addEventListener("writeend", function() {
						location.href = fileEntry.toURL();
					}, false);
				});
			});
		}, function(err) {
			throw new Error(err.name + ": " + err.message);
		});
	} else {
		const fs = require___vite_browser_external();
		const buffer = arrayBufferToNodeBuffer(arrayBuffer);
		fs.writeFileSync(fileName, buffer);
	}
};
/**
* @private
*/
Font.prototype.fsSelectionValues = {
	ITALIC: 1,
	UNDERSCORE: 2,
	NEGATIVE: 4,
	OUTLINED: 8,
	STRIKEOUT: 16,
	BOLD: 32,
	REGULAR: 64,
	USER_TYPO_METRICS: 128,
	WWS: 256,
	OBLIQUE: 512
};
/**
* @private
*/
Font.prototype.usWidthClasses = {
	ULTRA_CONDENSED: 1,
	EXTRA_CONDENSED: 2,
	CONDENSED: 3,
	SEMI_CONDENSED: 4,
	MEDIUM: 5,
	SEMI_EXPANDED: 6,
	EXPANDED: 7,
	EXTRA_EXPANDED: 8,
	ULTRA_EXPANDED: 9
};
/**
* @private
*/
Font.prototype.usWeightClasses = {
	THIN: 100,
	EXTRA_LIGHT: 200,
	LIGHT: 300,
	NORMAL: 400,
	MEDIUM: 500,
	SEMI_BOLD: 600,
	BOLD: 700,
	EXTRA_BOLD: 800,
	BLACK: 900
};
//#endregion
//#region node_modules/opentype.js/src/tables/fvar.js
function addName(name, names) {
	const nameString = JSON.stringify(name);
	let nameID = 256;
	for (let nameKey in names) {
		let n = parseInt(nameKey);
		if (!n || n < 256) continue;
		if (JSON.stringify(names[nameKey]) === nameString) return n;
		if (nameID <= n) nameID = n + 1;
	}
	names[nameID] = name;
	return nameID;
}
function makeFvarAxis(n, axis, names) {
	const nameID = addName(axis.name, names);
	return [
		{
			name: "tag_" + n,
			type: "TAG",
			value: axis.tag
		},
		{
			name: "minValue_" + n,
			type: "FIXED",
			value: axis.minValue << 16
		},
		{
			name: "defaultValue_" + n,
			type: "FIXED",
			value: axis.defaultValue << 16
		},
		{
			name: "maxValue_" + n,
			type: "FIXED",
			value: axis.maxValue << 16
		},
		{
			name: "flags_" + n,
			type: "USHORT",
			value: 0
		},
		{
			name: "nameID_" + n,
			type: "USHORT",
			value: nameID
		}
	];
}
function parseFvarAxis(data, start, names) {
	const axis = {};
	const p = new parse_default.Parser(data, start);
	axis.tag = p.parseTag();
	axis.minValue = p.parseFixed();
	axis.defaultValue = p.parseFixed();
	axis.maxValue = p.parseFixed();
	p.skip("uShort", 1);
	axis.name = names[p.parseUShort()] || {};
	return axis;
}
function makeFvarInstance(n, inst, axes, names) {
	const nameID = addName(inst.name, names);
	const fields = [{
		name: "nameID_" + n,
		type: "USHORT",
		value: nameID
	}, {
		name: "flags_" + n,
		type: "USHORT",
		value: 0
	}];
	for (let i = 0; i < axes.length; ++i) {
		const axisTag = axes[i].tag;
		fields.push({
			name: "axis_" + n + " " + axisTag,
			type: "FIXED",
			value: inst.coordinates[axisTag] << 16
		});
	}
	return fields;
}
function parseFvarInstance(data, start, axes, names) {
	const inst = {};
	const p = new parse_default.Parser(data, start);
	inst.name = names[p.parseUShort()] || {};
	p.skip("uShort", 1);
	inst.coordinates = {};
	for (let i = 0; i < axes.length; ++i) inst.coordinates[axes[i].tag] = p.parseFixed();
	return inst;
}
function makeFvarTable(fvar, names) {
	const result = new table_default.Table("fvar", [
		{
			name: "version",
			type: "ULONG",
			value: 65536
		},
		{
			name: "offsetToData",
			type: "USHORT",
			value: 0
		},
		{
			name: "countSizePairs",
			type: "USHORT",
			value: 2
		},
		{
			name: "axisCount",
			type: "USHORT",
			value: fvar.axes.length
		},
		{
			name: "axisSize",
			type: "USHORT",
			value: 20
		},
		{
			name: "instanceCount",
			type: "USHORT",
			value: fvar.instances.length
		},
		{
			name: "instanceSize",
			type: "USHORT",
			value: 4 + fvar.axes.length * 4
		}
	]);
	result.offsetToData = result.sizeOf();
	for (let i = 0; i < fvar.axes.length; i++) result.fields = result.fields.concat(makeFvarAxis(i, fvar.axes[i], names));
	for (let j = 0; j < fvar.instances.length; j++) result.fields = result.fields.concat(makeFvarInstance(j, fvar.instances[j], fvar.axes, names));
	return result;
}
function parseFvarTable(data, start, names) {
	const p = new parse_default.Parser(data, start);
	const tableVersion = p.parseULong();
	check_default.argument(tableVersion === 65536, "Unsupported fvar table version.");
	const offsetToData = p.parseOffset16();
	p.skip("uShort", 1);
	const axisCount = p.parseUShort();
	const axisSize = p.parseUShort();
	const instanceCount = p.parseUShort();
	const instanceSize = p.parseUShort();
	const axes = [];
	for (let i = 0; i < axisCount; i++) axes.push(parseFvarAxis(data, start + offsetToData + i * axisSize, names));
	const instances = [];
	const instanceStart = start + offsetToData + axisCount * axisSize;
	for (let j = 0; j < instanceCount; j++) instances.push(parseFvarInstance(data, instanceStart + j * instanceSize, axes, names));
	return {
		axes,
		instances
	};
}
var fvar_default = {
	make: makeFvarTable,
	parse: parseFvarTable
};
//#endregion
//#region node_modules/opentype.js/src/tables/gpos.js
function parseTaggedListTable(data, start) {
	const p = new parse_default.Parser(data, start);
	const n = p.parseUShort();
	const list = [];
	for (let i = 0; i < n; i++) list[p.parseTag()] = { offset: p.parseUShort() };
	return list;
}
function parseCoverageTable(data, start) {
	const p = new parse_default.Parser(data, start);
	const format = p.parseUShort();
	let count = p.parseUShort();
	if (format === 1) return p.parseUShortList(count);
	else if (format === 2) {
		const coverage = [];
		for (; count--;) {
			const begin = p.parseUShort();
			const end = p.parseUShort();
			let index = p.parseUShort();
			for (let i = begin; i <= end; i++) coverage[index++] = i;
		}
		return coverage;
	}
}
function parseClassDefTable(data, start) {
	const p = new parse_default.Parser(data, start);
	const format = p.parseUShort();
	if (format === 1) {
		const startGlyph = p.parseUShort();
		const glyphCount = p.parseUShort();
		const classes = p.parseUShortList(glyphCount);
		return function(glyphID) {
			return classes[glyphID - startGlyph] || 0;
		};
	} else if (format === 2) {
		const rangeCount = p.parseUShort();
		const startGlyphs = [];
		const endGlyphs = [];
		const classValues = [];
		for (let i = 0; i < rangeCount; i++) {
			startGlyphs[i] = p.parseUShort();
			endGlyphs[i] = p.parseUShort();
			classValues[i] = p.parseUShort();
		}
		return function(glyphID) {
			let l = 0;
			let r = startGlyphs.length - 1;
			while (l < r) {
				const c = l + r + 1 >> 1;
				if (glyphID < startGlyphs[c]) r = c - 1;
				else l = c;
			}
			if (startGlyphs[l] <= glyphID && glyphID <= endGlyphs[l]) return classValues[l] || 0;
			return 0;
		};
	}
}
function parsePairPosSubTable(data, start) {
	const p = new parse_default.Parser(data, start);
	const format = p.parseUShort();
	const coverage = parseCoverageTable(data, start + p.parseUShort());
	const valueFormat1 = p.parseUShort();
	const valueFormat2 = p.parseUShort();
	let value1;
	if (valueFormat1 !== 4 || valueFormat2 !== 0) return;
	const sharedPairSets = {};
	if (format === 1) {
		const pairSetCount = p.parseUShort();
		const pairSet = [];
		const pairSetOffsets = p.parseOffset16List(pairSetCount);
		for (let firstGlyph = 0; firstGlyph < pairSetCount; firstGlyph++) {
			const pairSetOffset = pairSetOffsets[firstGlyph];
			let sharedPairSet = sharedPairSets[pairSetOffset];
			if (!sharedPairSet) {
				sharedPairSet = {};
				p.relativeOffset = pairSetOffset;
				let pairValueCount = p.parseUShort();
				for (; pairValueCount--;) {
					const secondGlyph = p.parseUShort();
					if (valueFormat1) value1 = p.parseShort();
					if (valueFormat2) p.parseShort();
					sharedPairSet[secondGlyph] = value1;
				}
			}
			pairSet[coverage[firstGlyph]] = sharedPairSet;
		}
		return function(leftGlyph, rightGlyph) {
			const pairs = pairSet[leftGlyph];
			if (pairs) return pairs[rightGlyph];
		};
	} else if (format === 2) {
		const classDef1Offset = p.parseUShort();
		const classDef2Offset = p.parseUShort();
		const class1Count = p.parseUShort();
		const class2Count = p.parseUShort();
		const getClass1 = parseClassDefTable(data, start + classDef1Offset);
		const getClass2 = parseClassDefTable(data, start + classDef2Offset);
		const kerningMatrix = [];
		for (let i = 0; i < class1Count; i++) {
			const kerningRow = kerningMatrix[i] = [];
			for (let j = 0; j < class2Count; j++) {
				if (valueFormat1) value1 = p.parseShort();
				if (valueFormat2) p.parseShort();
				kerningRow[j] = value1;
			}
		}
		const covered = {};
		for (let i = 0; i < coverage.length; i++) covered[coverage[i]] = 1;
		return function(leftGlyph, rightGlyph) {
			if (!covered[leftGlyph]) return;
			const class1 = getClass1(leftGlyph);
			const class2 = getClass2(rightGlyph);
			const kerningRow = kerningMatrix[class1];
			if (kerningRow) return kerningRow[class2];
		};
	}
}
function parseLookupTable(data, start) {
	const p = new parse_default.Parser(data, start);
	const lookupType = p.parseUShort();
	const lookupFlag = p.parseUShort();
	const useMarkFilteringSet = lookupFlag & 16;
	const subTableCount = p.parseUShort();
	const subTableOffsets = p.parseOffset16List(subTableCount);
	const table = {
		lookupType,
		lookupFlag,
		markFilteringSet: useMarkFilteringSet ? p.parseUShort() : -1
	};
	if (lookupType === 2) {
		const subtables = [];
		for (let i = 0; i < subTableCount; i++) {
			const pairPosSubTable = parsePairPosSubTable(data, start + subTableOffsets[i]);
			if (pairPosSubTable) subtables.push(pairPosSubTable);
		}
		table.getKerningValue = function(leftGlyph, rightGlyph) {
			for (let i = subtables.length; i--;) {
				const value = subtables[i](leftGlyph, rightGlyph);
				if (value !== void 0) return value;
			}
			return 0;
		};
	}
	return table;
}
function parseGposTable(data, start, font) {
	const p = new parse_default.Parser(data, start);
	const tableVersion = p.parseFixed();
	check_default.argument(tableVersion === 1, "Unsupported GPOS table version.");
	parseTaggedListTable(data, start + p.parseUShort());
	parseTaggedListTable(data, start + p.parseUShort());
	const lookupListOffset = p.parseUShort();
	p.relativeOffset = lookupListOffset;
	const lookupCount = p.parseUShort();
	const lookupTableOffsets = p.parseOffset16List(lookupCount);
	const lookupListAbsoluteOffset = start + lookupListOffset;
	for (let i = 0; i < lookupCount; i++) {
		const table = parseLookupTable(data, lookupListAbsoluteOffset + lookupTableOffsets[i]);
		if (table.lookupType === 2 && !font.getGposKerningValue) font.getGposKerningValue = table.getKerningValue;
	}
}
var gpos_default = { parse: parseGposTable };
//#endregion
//#region node_modules/opentype.js/src/tables/kern.js
function parseWindowsKernTable(p) {
	const pairs = {};
	p.skip("uShort");
	const subtableVersion = p.parseUShort();
	check_default.argument(subtableVersion === 0, "Unsupported kern sub-table version.");
	p.skip("uShort", 2);
	const nPairs = p.parseUShort();
	p.skip("uShort", 3);
	for (let i = 0; i < nPairs; i += 1) {
		const leftIndex = p.parseUShort();
		const rightIndex = p.parseUShort();
		const value = p.parseShort();
		pairs[leftIndex + "," + rightIndex] = value;
	}
	return pairs;
}
function parseMacKernTable(p) {
	const pairs = {};
	p.skip("uShort");
	if (p.parseULong() > 1) console.warn("Only the first kern subtable is supported.");
	p.skip("uLong");
	const subtableVersion = p.parseUShort() & 255;
	p.skip("uShort");
	if (subtableVersion === 0) {
		const nPairs = p.parseUShort();
		p.skip("uShort", 3);
		for (let i = 0; i < nPairs; i += 1) {
			const leftIndex = p.parseUShort();
			const rightIndex = p.parseUShort();
			const value = p.parseShort();
			pairs[leftIndex + "," + rightIndex] = value;
		}
	}
	return pairs;
}
function parseKernTable(data, start) {
	const p = new parse_default.Parser(data, start);
	const tableVersion = p.parseUShort();
	if (tableVersion === 0) return parseWindowsKernTable(p);
	else if (tableVersion === 1) return parseMacKernTable(p);
	else throw new Error("Unsupported kern table version (" + tableVersion + ").");
}
var kern_default = { parse: parseKernTable };
//#endregion
//#region node_modules/opentype.js/src/tables/loca.js
function parseLocaTable(data, start, numGlyphs, shortVersion) {
	const p = new parse_default.Parser(data, start);
	const parseFn = shortVersion ? p.parseUShort : p.parseULong;
	const glyphOffsets = [];
	for (let i = 0; i < numGlyphs + 1; i += 1) {
		let glyphOffset = parseFn.call(p);
		if (shortVersion) glyphOffset *= 2;
		glyphOffsets.push(glyphOffset);
	}
	return glyphOffsets;
}
var loca_default = { parse: parseLocaTable };
//#endregion
//#region node_modules/opentype.js/src/opentype.js
/**
* The opentype library.
* @namespace opentype
*/
/**
* Loads a font from a file. The callback throws an error message as the first parameter if it fails
* and the font as an ArrayBuffer in the second parameter if it succeeds.
* @param  {string} path - The path of the file
* @param  {Function} callback - The function to call when the font load completes
*/
function loadFromFile(path, callback) {
	require___vite_browser_external().readFile(path, function(err, buffer) {
		if (err) return callback(err.message);
		callback(null, nodeBufferToArrayBuffer(buffer));
	});
}
/**
* Loads a font from a URL. The callback throws an error message as the first parameter if it fails
* and the font as an ArrayBuffer in the second parameter if it succeeds.
* @param  {string} url - The URL of the font file.
* @param  {Function} callback - The function to call when the font load completes
*/
function loadFromUrl(url, callback) {
	const request = new XMLHttpRequest();
	request.open("get", url, true);
	request.responseType = "arraybuffer";
	request.onload = function() {
		if (request.status !== 200) return callback("Font could not be loaded: " + request.statusText);
		return callback(null, request.response);
	};
	request.onerror = function() {
		callback("Font could not be loaded");
	};
	request.send();
}
/**
* Parses OpenType table entries.
* @param  {DataView}
* @param  {Number}
* @return {Object[]}
*/
function parseOpenTypeTableEntries(data, numTables) {
	const tableEntries = [];
	let p = 12;
	for (let i = 0; i < numTables; i += 1) {
		const tag = parse_default.getTag(data, p);
		const checksum = parse_default.getULong(data, p + 4);
		const offset = parse_default.getULong(data, p + 8);
		const length = parse_default.getULong(data, p + 12);
		tableEntries.push({
			tag,
			checksum,
			offset,
			length,
			compression: false
		});
		p += 16;
	}
	return tableEntries;
}
/**
* Parses WOFF table entries.
* @param  {DataView}
* @param  {Number}
* @return {Object[]}
*/
function parseWOFFTableEntries(data, numTables) {
	const tableEntries = [];
	let p = 44;
	for (let i = 0; i < numTables; i += 1) {
		const tag = parse_default.getTag(data, p);
		const offset = parse_default.getULong(data, p + 4);
		const compLength = parse_default.getULong(data, p + 8);
		const origLength = parse_default.getULong(data, p + 12);
		let compression;
		if (compLength < origLength) compression = "WOFF";
		else compression = false;
		tableEntries.push({
			tag,
			offset,
			compression,
			compressedLength: compLength,
			length: origLength
		});
		p += 20;
	}
	return tableEntries;
}
/**
* @typedef TableData
* @type Object
* @property {DataView} data - The DataView
* @property {number} offset - The data offset.
*/
/**
* @param  {DataView}
* @param  {Object}
* @return {TableData}
*/
function uncompressTable(data, tableEntry) {
	if (tableEntry.compression === "WOFF") {
		const inBuffer = new Uint8Array(data.buffer, tableEntry.offset + 2, tableEntry.compressedLength - 2);
		const outBuffer = new Uint8Array(tableEntry.length);
		(0, import_tiny_inflate.default)(inBuffer, outBuffer);
		if (outBuffer.byteLength !== tableEntry.length) throw new Error("Decompression error: " + tableEntry.tag + " decompressed length doesn't match recorded length");
		return {
			data: new DataView(outBuffer.buffer, 0),
			offset: 0
		};
	} else return {
		data,
		offset: tableEntry.offset
	};
}
/**
* Parse the OpenType file data (as an ArrayBuffer) and return a Font object.
* Throws an error if the font could not be parsed.
* @param  {ArrayBuffer}
* @return {opentype.Font}
*/
function parseBuffer(buffer) {
	let indexToLocFormat;
	let ltagTable;
	const font = new Font({ empty: true });
	const data = new DataView(buffer, 0);
	let numTables;
	let tableEntries = [];
	const signature = parse_default.getTag(data, 0);
	if (signature === String.fromCharCode(0, 1, 0, 0) || signature === "true" || signature === "typ1") {
		font.outlinesFormat = "truetype";
		numTables = parse_default.getUShort(data, 4);
		tableEntries = parseOpenTypeTableEntries(data, numTables);
	} else if (signature === "OTTO") {
		font.outlinesFormat = "cff";
		numTables = parse_default.getUShort(data, 4);
		tableEntries = parseOpenTypeTableEntries(data, numTables);
	} else if (signature === "wOFF") {
		const flavor = parse_default.getTag(data, 4);
		if (flavor === String.fromCharCode(0, 1, 0, 0)) font.outlinesFormat = "truetype";
		else if (flavor === "OTTO") font.outlinesFormat = "cff";
		else throw new Error("Unsupported OpenType flavor " + signature);
		numTables = parse_default.getUShort(data, 12);
		tableEntries = parseWOFFTableEntries(data, numTables);
	} else throw new Error("Unsupported OpenType signature " + signature);
	let cffTableEntry;
	let fvarTableEntry;
	let glyfTableEntry;
	let gposTableEntry;
	let gsubTableEntry;
	let hmtxTableEntry;
	let kernTableEntry;
	let locaTableEntry;
	let nameTableEntry;
	let metaTableEntry;
	let p;
	for (let i = 0; i < numTables; i += 1) {
		const tableEntry = tableEntries[i];
		let table;
		switch (tableEntry.tag) {
			case "cmap":
				table = uncompressTable(data, tableEntry);
				font.tables.cmap = cmap_default.parse(table.data, table.offset);
				font.encoding = new CmapEncoding(font.tables.cmap);
				break;
			case "cvt ":
				table = uncompressTable(data, tableEntry);
				p = new parse_default.Parser(table.data, table.offset);
				font.tables.cvt = p.parseShortList(tableEntry.length / 2);
				break;
			case "fvar":
				fvarTableEntry = tableEntry;
				break;
			case "fpgm":
				table = uncompressTable(data, tableEntry);
				p = new parse_default.Parser(table.data, table.offset);
				font.tables.fpgm = p.parseByteList(tableEntry.length);
				break;
			case "head":
				table = uncompressTable(data, tableEntry);
				font.tables.head = head_default.parse(table.data, table.offset);
				font.unitsPerEm = font.tables.head.unitsPerEm;
				indexToLocFormat = font.tables.head.indexToLocFormat;
				break;
			case "hhea":
				table = uncompressTable(data, tableEntry);
				font.tables.hhea = hhea_default.parse(table.data, table.offset);
				font.ascender = font.tables.hhea.ascender;
				font.descender = font.tables.hhea.descender;
				font.numberOfHMetrics = font.tables.hhea.numberOfHMetrics;
				break;
			case "hmtx":
				hmtxTableEntry = tableEntry;
				break;
			case "ltag":
				table = uncompressTable(data, tableEntry);
				ltagTable = ltag_default.parse(table.data, table.offset);
				break;
			case "maxp":
				table = uncompressTable(data, tableEntry);
				font.tables.maxp = maxp_default.parse(table.data, table.offset);
				font.numGlyphs = font.tables.maxp.numGlyphs;
				break;
			case "name":
				nameTableEntry = tableEntry;
				break;
			case "OS/2":
				table = uncompressTable(data, tableEntry);
				font.tables.os2 = os2_default.parse(table.data, table.offset);
				break;
			case "post":
				table = uncompressTable(data, tableEntry);
				font.tables.post = post_default.parse(table.data, table.offset);
				font.glyphNames = new GlyphNames(font.tables.post);
				break;
			case "prep":
				table = uncompressTable(data, tableEntry);
				p = new parse_default.Parser(table.data, table.offset);
				font.tables.prep = p.parseByteList(tableEntry.length);
				break;
			case "glyf":
				glyfTableEntry = tableEntry;
				break;
			case "loca":
				locaTableEntry = tableEntry;
				break;
			case "CFF ":
				cffTableEntry = tableEntry;
				break;
			case "kern":
				kernTableEntry = tableEntry;
				break;
			case "GPOS":
				gposTableEntry = tableEntry;
				break;
			case "GSUB":
				gsubTableEntry = tableEntry;
				break;
			case "meta":
				metaTableEntry = tableEntry;
				break;
		}
	}
	const nameTable = uncompressTable(data, nameTableEntry);
	font.tables.name = name_default.parse(nameTable.data, nameTable.offset, ltagTable);
	font.names = font.tables.name;
	if (glyfTableEntry && locaTableEntry) {
		const shortVersion = indexToLocFormat === 0;
		const locaTable = uncompressTable(data, locaTableEntry);
		const locaOffsets = loca_default.parse(locaTable.data, locaTable.offset, font.numGlyphs, shortVersion);
		const glyfTable = uncompressTable(data, glyfTableEntry);
		font.glyphs = glyf_default.parse(glyfTable.data, glyfTable.offset, locaOffsets, font);
	} else if (cffTableEntry) {
		const cffTable = uncompressTable(data, cffTableEntry);
		cff_default.parse(cffTable.data, cffTable.offset, font);
	} else throw new Error("Font doesn't contain TrueType or CFF outlines.");
	const hmtxTable = uncompressTable(data, hmtxTableEntry);
	hmtx_default.parse(hmtxTable.data, hmtxTable.offset, font.numberOfHMetrics, font.numGlyphs, font.glyphs);
	addGlyphNames(font);
	if (kernTableEntry) {
		const kernTable = uncompressTable(data, kernTableEntry);
		font.kerningPairs = kern_default.parse(kernTable.data, kernTable.offset);
	} else font.kerningPairs = {};
	if (gposTableEntry) {
		const gposTable = uncompressTable(data, gposTableEntry);
		gpos_default.parse(gposTable.data, gposTable.offset, font);
	}
	if (gsubTableEntry) {
		const gsubTable = uncompressTable(data, gsubTableEntry);
		font.tables.gsub = gsub_default.parse(gsubTable.data, gsubTable.offset);
	}
	if (fvarTableEntry) {
		const fvarTable = uncompressTable(data, fvarTableEntry);
		font.tables.fvar = fvar_default.parse(fvarTable.data, fvarTable.offset, font.names);
	}
	if (metaTableEntry) {
		const metaTable = uncompressTable(data, metaTableEntry);
		font.tables.meta = meta_default.parse(metaTable.data, metaTable.offset);
		font.metas = font.tables.meta;
	}
	return font;
}
/**
* Asynchronously load the font from a URL or a filesystem. When done, call the callback
* with two arguments `(err, font)`. The `err` will be null on success,
* the `font` is a Font object.
* We use the node.js callback convention so that
* opentype.js can integrate with frameworks like async.js.
* @alias opentype.load
* @param  {string} url - The URL of the font to load.
* @param  {Function} callback - The callback.
*/
function load(url, callback) {
	(typeof window === "undefined" ? loadFromFile : loadFromUrl)(url, function(err, arrayBuffer) {
		if (err) return callback(err);
		let font;
		try {
			font = parseBuffer(arrayBuffer);
		} catch (e) {
			return callback(e, null);
		}
		return callback(null, font);
	});
}
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils.js
/**
* @license lucide-react v0.562.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
var toCamelCase = (string) => string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());
var toPascalCase = (string) => {
	const camelCase = toCamelCase(string);
	return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
	return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
var hasA11yProp = (props) => {
	for (const prop in props) if (prop.startsWith("aria-") || prop === "role" || prop === "title") return true;
};
//#endregion
//#region node_modules/lucide-react/dist/esm/defaultAttributes.js
/**
* @license lucide-react v0.562.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var defaultAttributes = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
};
//#endregion
//#region node_modules/lucide-react/dist/esm/Icon.js
/**
* @license lucide-react v0.562.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Icon = (0, import_react.forwardRef)(({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref) => (0, import_react.createElement)("svg", {
	ref,
	...defaultAttributes,
	width: size,
	height: size,
	stroke: color,
	strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
	className: mergeClasses("lucide", className),
	...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
	...rest
}, [...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)), ...Array.isArray(children) ? children : [children]]));
//#endregion
//#region node_modules/lucide-react/dist/esm/createLucideIcon.js
/**
* @license lucide-react v0.562.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var createLucideIcon = (iconName, iconNode) => {
	const Component = (0, import_react.forwardRef)(({ className, ...props }, ref) => (0, import_react.createElement)(Icon, {
		ref,
		iconNode,
		className: mergeClasses(`lucide-${toKebabCase(toPascalCase(iconName))}`, `lucide-${iconName}`, className),
		...props
	}));
	Component.displayName = toPascalCase(iconName);
	return Component;
};
/**
* @license lucide-react v0.562.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ExternalLink = createLucideIcon("external-link", [
	["path", {
		d: "M15 3h6v6",
		key: "1q9fwt"
	}],
	["path", {
		d: "M10 14 21 3",
		key: "gplh6r"
	}],
	["path", {
		d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
		key: "a6xqqp"
	}]
]);
//#endregion
//#region src/components/Sidebar.tsx
function Sidebar({ state, setState }) {
	const { fontList, customFont, fontFamily, fontVariant, text, size, lineHeight, union, kerning, filled, separate, bezierAccuracy, dxfUnits, fill, stroke, strokeWidth, strokeNonScaling, fillRule } = state;
	const fontVariants = fontList && fontFamily ? fontList.items.find((f) => f.family === fontFamily)?.variants || [] : [];
	const fontOptions = (0, import_react.useMemo)(() => {
		if (!fontList) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Loading fonts..." });
		return fontList.items.map((font) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: font.family,
			children: font.family
		}, font.family));
	}, [fontList]);
	const handleFileUpload = async (event) => {
		const files = event.target.files;
		if (!files || files.length === 0) setState((prev) => ({
			...prev,
			customFont: void 0
		}));
		else {
			const font = parseBuffer(await files[0].arrayBuffer());
			setState((prev) => ({
				...prev,
				customFont: font
			}));
		}
	};
	const handleRemoveFont = () => {
		const fileInput = document.getElementById("font-upload");
		if (fileInput) fileInput.value = "";
		setState((prev) => ({
			...prev,
			customFont: void 0
		}));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
			open: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "Font Settings" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "label-with-link",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Google font:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "https://fonts.google.com/",
						target: "_blank",
						rel: "noopener noreferrer",
						children: ["Browse fonts ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 14 })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					id: "font-select",
					value: fontFamily,
					onChange: (e) => setState((prev) => ({
						...prev,
						fontFamily: e.target.value
					})),
					disabled: !!customFont,
					children: fontOptions
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["variant:", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					id: "font-variant",
					value: fontVariant,
					onChange: (e) => setState((prev) => ({
						...prev,
						fontVariant: e.target.value
					})),
					disabled: !!customFont,
					children: fontVariants.map((variant) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: variant,
						children: variant
					}, variant))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["(optional) upload font:", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "font-upload",
					type: "file",
					onChange: handleFileUpload,
					accept: ".ttf,.otf,.woff,.woff2"
				})] }),
				customFont && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleRemoveFont,
					children: "Remove"
				})
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
			open: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "Text Settings" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["text:", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					id: "input-text",
					rows: 3,
					value: text,
					onChange: (e) => setState((prev) => ({
						...prev,
						text: e.target.value
					}))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["size:", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "number",
					id: "input-size",
					value: size,
					onChange: (e) => setState((prev) => ({
						...prev,
						size: Number(e.target.value)
					}))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
					"line height:",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						title: "when you have multiline text",
						children: "ℹ️"
					}),
					":",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						id: "input-line-height",
						value: lineHeight,
						onChange: (e) => setState((prev) => ({
							...prev,
							lineHeight: Number(e.target.value)
						})),
						step: "0.1",
						min: "0.1"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["kerning:", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					id: "input-kerning",
					checked: kerning,
					onChange: (e) => setState((prev) => ({
						...prev,
						kerning: e.target.checked
					}))
				})] })
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
			open: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "Stroke" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
					"Stroke color:",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "color",
						id: "input-stroke",
						value: stroke,
						onChange: (e) => setState((prev) => ({
							...prev,
							stroke: e.target.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: stroke,
						onChange: (e) => setState((prev) => ({
							...prev,
							stroke: e.target.value
						})),
						placeholder: "#000000",
						style: {
							marginLeft: "8px",
							width: "80px"
						}
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Stroke Width:", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					id: "input-stroke-width",
					value: strokeWidth,
					onChange: (e) => setState((prev) => ({
						...prev,
						strokeWidth: e.target.value
					}))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Non-scaling stroke:", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					id: "input-stroke-non-scaling",
					checked: strokeNonScaling,
					onChange: (e) => setState((prev) => ({
						...prev,
						strokeNonScaling: e.target.checked
					}))
				})] })
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
			open: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "Fill" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["fill:", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					id: "input-filled",
					checked: filled,
					onChange: (e) => setState((prev) => ({
						...prev,
						filled: e.target.checked
					}))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
					"Fill color:",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "color",
						id: "input-fill",
						value: fill,
						onChange: (e) => setState((prev) => ({
							...prev,
							fill: e.target.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: fill,
						onChange: (e) => setState((prev) => ({
							...prev,
							fill: e.target.value
						})),
						placeholder: "#000000",
						style: {
							marginLeft: "8px",
							width: "80px"
						}
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Fill rule:", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					id: "input-fill-rule",
					value: fillRule,
					onChange: (e) => setState((prev) => ({
						...prev,
						fillRule: e.target.value
					})),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "evenodd",
						children: "evenodd"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "nonzero",
						children: "nonzero"
					})]
				})] })
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "Options" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["union:", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "checkbox",
				id: "input-union",
				checked: union,
				onChange: (e) => setState((prev) => ({
					...prev,
					union: e.target.checked
				}))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["separate characters:", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "checkbox",
				id: "input-separate",
				checked: separate,
				onChange: (e) => setState((prev) => ({
					...prev,
					separate: e.target.checked
				}))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
				"bezier accuracy",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					title: "0.5 = accurate to half a pixel \r.001 = accurate to 1/1000th of a pixel \rsmaller numbers take longer to compute \rleave blank for auto",
					children: "ℹ️"
				}),
				":",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					id: "input-bezier-accuracy",
					placeholder: "auto",
					value: bezierAccuracy,
					onChange: (e) => setState((prev) => ({
						...prev,
						bezierAccuracy: e.target.value
					}))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Dxf Units:", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				id: "dxf-units",
				value: dxfUnits,
				onChange: (e) => setState((prev) => ({
					...prev,
					dxfUnits: e.target.value
				})),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "Select units..."
				}), Object.values(import_dist.default.unitType).map((unit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: unit,
					children: unit
				}, unit))]
			})] })
		] })] })
	] });
}
//#endregion
//#region src/components/Output.tsx
function Output({ state }) {
	const { svgOutput, dxfOutput, errorMessage, text } = state;
	const [copyButtonText, setCopyButtonText] = (0, import_react.useState)("copy to clipboard");
	const copyToClipboard = () => {
		const textarea = document.getElementById("output-svg");
		if (textarea) {
			textarea.select();
			document.execCommand("copy");
			setCopyButtonText("copied");
			setTimeout(() => {
				setCopyButtonText("copy to clipboard");
			}, 2e3);
		}
	};
	const downloadSvg = () => {
		const a = document.createElement("a");
		a.href = "data:image/svg+xml;base64," + window.btoa(svgOutput);
		a.download = `${text}.svg`;
		a.click();
	};
	const downloadDxf = () => {
		const a = document.createElement("a");
		a.href = "data:application/dxf;base64," + window.btoa(dxfOutput);
		a.download = `${text}.dxf`;
		a.click();
	};
	const createLink = () => {
		const url = window.location.href;
		navigator.clipboard.writeText(url).then(() => {
			const btn = document.getElementById("create-link");
			if (btn) {
				btn.textContent = "copied";
				setTimeout(() => {
					btn.textContent = "Create link";
				}, 2e3);
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [errorMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			id: "error-display",
			style: {
				color: "red",
				padding: "10px"
			},
			children: errorMessage
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			id: "svg-render",
			dangerouslySetInnerHTML: { __html: svgOutput },
			style: { marginBottom: "20px" }
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "SVG Output" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "textarea-container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				id: "output-svg",
				readOnly: true,
				value: svgOutput,
				style: {
					width: "100%",
					minHeight: "200px",
					fontFamily: "monospace"
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "buttons-container",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn",
						onClick: copyToClipboard,
						children: copyButtonText
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn",
						onClick: downloadSvg,
						children: "Download Svg"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						id: "create-link",
						className: "btn",
						onClick: createLink,
						children: "Create link"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn",
						onClick: downloadDxf,
						children: "Download Dxf"
					})
				]
			})]
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			style: {
				marginTop: "40px",
				padding: "24px",
				background: "#faf5ff",
				borderRadius: "12px",
				border: "1px solid #e9d5ff",
				fontFamily: "system-ui, -apple-system, sans-serif",
				lineHeight: "1.6"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					style: {
						margin: "0 0 8px",
						fontSize: "18px",
						fontWeight: 700,
						color: "#1a1a2e"
					},
					children: "This tool has a new home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					style: {
						margin: "0 0 12px",
						color: "#4a4a6a",
						fontSize: "15px"
					},
					children: [
						"Everything you can do here is 100% free on",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://fontezzi.com/editor?ref=oss-footer",
							target: "_blank",
							rel: "noopener noreferrer",
							style: {
								color: "#dc3e78",
								fontWeight: 600
							},
							children: "Fontezzi"
						}),
						" ",
						"— same fonts, same SVG output, same downloads. Plus you get shadows, outlines, layers, and more. Pro users also get batch automation and React export. You lose nothing."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "https://fontezzi.com/editor?ref=oss-footer",
					target: "_blank",
					rel: "noopener noreferrer",
					style: {
						display: "inline-block",
						background: "linear-gradient(135deg, #f88028, #dc3e78)",
						color: "#fff",
						fontWeight: 700,
						padding: "8px 20px",
						borderRadius: "8px",
						textDecoration: "none",
						fontSize: "15px"
					},
					children: "Try Fontezzi free →"
				})
			]
		})
	] });
}
//#endregion
//#region src/lib/fontUtils.ts
var apiKey = "AIzaSyAOES8EmKhuJEnsn9kS1XKBpxxp-TgN8Jc";
async function loadGoogleFonts() {
	return (await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`)).json();
}
async function renderSvg(state) {
	try {
		const { fontList, fontFamily, fontVariant, customFont, text, size, lineHeight, union, filled, kerning, separate, bezierAccuracy, dxfUnits, fill, stroke, strokeWidth, strokeNonScaling, fillRule } = state;
		let font;
		if (customFont) font = customFont;
		else {
			const fontItem = fontList.items.find((f) => f.family === fontFamily);
			if (!fontItem) return { errorMessage: "Font not found" };
			const url = fontItem.files[fontVariant]?.replace("http:", "https:");
			if (!url) return { errorMessage: "Font variant not found" };
			font = await new Promise((resolve, reject) => {
				load(url, (err, loadedFont) => {
					if (err) reject(err);
					else resolve(loadedFont);
				});
			});
		}
		const lines = text.split("\n");
		const containerModel = { models: {} };
		lines.forEach((line, lineIndex) => {
			if (line.length === 0) return;
			const accuracy = parseFloat(bezierAccuracy) || void 0;
			const lineModel = new import_dist.default.models.Text(font, line, size, union, false, accuracy, { kerning });
			const yOffset = -lineIndex * size * lineHeight;
			import_dist.default.model.move(lineModel, [0, yOffset]);
			containerModel.models[`line_${lineIndex}`] = lineModel;
		});
		if (separate) {
			let charIndex = 0;
			for (const lineKey in containerModel.models) {
				const lineModel = containerModel.models[lineKey];
				for (const charKey in lineModel.models) {
					lineModel.models[charKey].layer = String(charIndex);
					charIndex++;
				}
			}
		}
		return {
			svgOutput: import_dist.default.exporter.toSVG(containerModel, {
				fill: filled ? fill : void 0,
				stroke: stroke ? stroke : void 0,
				strokeWidth: strokeWidth ? strokeWidth : void 0,
				fillRule: fillRule ? fillRule : void 0,
				scalingStroke: !strokeNonScaling
			}),
			dxfOutput: import_dist.default.exporter.toDXF(containerModel, {
				units: dxfUnits,
				usePOLYLINE: true
			}),
			errorMessage: ""
		};
	} catch (err) {
		return { errorMessage: err.toString() };
	}
}
//#endregion
//#region src/store/appStore.ts
var defaultState = {
	fontList: null,
	customFont: void 0,
	fontFamily: "ABeeZee",
	fontVariant: "regular",
	text: "Verb",
	size: 100,
	lineHeight: 1.2,
	union: false,
	kerning: true,
	filled: false,
	separate: false,
	bezierAccuracy: "",
	dxfUnits: "",
	fill: "#000000",
	stroke: "#000000",
	strokeWidth: "0.25mm",
	strokeNonScaling: true,
	fillRule: "evenodd",
	svgOutput: "",
	dxfOutput: "",
	errorMessage: ""
};
//#endregion
//#region src/components/App.tsx
function App() {
	const [state, setState] = (0, import_react.useState)(defaultState);
	(0, import_react.useEffect)(() => {
		loadGoogleFonts().then((data) => {
			setState((prev) => ({
				...prev,
				fontList: data
			}));
		});
	}, []);
	(0, import_react.useEffect)(() => {
		if (state.fontList && state.fontFamily && state.fontVariant) renderSvg(state).then((result) => {
			setState((prev) => ({
				...prev,
				...result
			}));
		});
	}, [
		state.fontList,
		state.fontFamily,
		state.fontVariant,
		state.customFont,
		state.text,
		state.size,
		state.lineHeight,
		state.union,
		state.filled,
		state.kerning,
		state.separate,
		state.bezierAccuracy,
		state.dxfUnits,
		state.fill,
		state.stroke,
		state.strokeWidth,
		state.strokeNonScaling,
		state.fillRule
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontezziBanner, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {
			state,
			setState
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Output, { state })
	] });
}
//#endregion
export { App as default };
