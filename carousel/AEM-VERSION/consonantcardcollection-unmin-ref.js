!(function () {
  var e = {
    436: function (e, t, n) {
      const { MinHeap: r } = n(573),
        { MaxHeap: o } = n(945),
        { CustomHeap: a } = n(295);
      (t.MinHeap = r), (t.MaxHeap = o), (t.CustomHeap = a);
    },
    295: function (e, t, n) {
      /**
       * @license MIT
       * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
       */
      const { Heap: r } = n(613);
      class o extends r {
        constructor(e, t, n) {
          if ("function" != typeof e) throw new Error("CustomHeap expects a comparator function");
          super(t, n), (this._comparator = e);
        }
        _compare(e, t) {
          return this._comparator(e, t) <= 0;
        }
        _compareChildrenBefore(e, t, n) {
          return this._comparator(this._nodes[n], this._nodes[t]) <= 0 && n < e ? n : t;
        }
        clone() {
          return new o(this._comparator, this._nodes.slice(), this._leaf);
        }
        static heapify(e, t) {
          if (!Array.isArray(e)) throw new Error(".heapify expects an array");
          if ("function" != typeof t) throw new Error(".heapify expects a comparator function");
          return new o(t, e).fix();
        }
        static isHeapified(e, t) {
          if (!Array.isArray(e)) throw new Error(".heapify expects an array");
          if ("function" != typeof t) throw new Error(".isHeapified expects a comparator function");
          return new o(t, e).isValid();
        }
      }
      t.CustomHeap = o;
    },
    613: function (e, t) {
      t.Heap =
        /**
         * @license MIT
         * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
         *
         * @class
         * @abstract
         */
        class {
          constructor(e, t) {
            (this._nodes = Array.isArray(e) ? e : []), (this._leaf = t || null);
          }
          _hasLeftChild(e) {
            return 2 * e + 1 < this.size();
          }
          _hasRightChild(e) {
            return 2 * e + 2 < this.size();
          }
          _getKey(e) {
            return "object" == typeof e ? e.key : e;
          }
          _swap(e, t) {
            const n = this._nodes[e];
            (this._nodes[e] = this._nodes[t]), (this._nodes[t] = n);
          }
          _compare(e, t) {
            return this._compareKeys(this._getKey(e), this._getKey(t));
          }
          _shouldSwap(e, t) {
            return !(e < 0 || e >= this.size()) && !(t < 0 || t >= this.size()) && !this._compare(this._nodes[e], this._nodes[t]);
          }
          heapifyUp(e) {
            let t = e,
              n = Math.floor((t - 1) / 2);
            for (; this._shouldSwap(n, t);) this._swap(n, t), (t = n), (n = Math.floor((t - 1) / 2));
          }
          _compareChildrenOf(e) {
            if (!this._hasLeftChild(e) && !this._hasRightChild(e)) return -1;
            const t = 2 * e + 1,
              n = 2 * e + 2;
            if (!this._hasLeftChild(e)) return n;
            if (!this._hasRightChild(e)) return t;
            return this._compare(this._nodes[t], this._nodes[n]) ? t : n;
          }
          _heapifyDown(e) {
            let t = e,
              n = this._compareChildrenOf(t);
            for (; this._shouldSwap(t, n);) this._swap(t, n), (t = n), (n = this._compareChildrenOf(t));
          }
          extractRoot() {
            if (this.isEmpty()) return null;
            const e = this.root();
            return (this._nodes[0] = this._nodes[this.size() - 1]), this._nodes.pop(), this._heapifyDown(0), e === this._leaf && (this._leaf = this.root()), e;
          }
          _heapifyDownUntil(e) {
            let t,
              n = 0,
              r = 1,
              o = 2;
            for (; r < e;) (t = this._compareChildrenBefore(e, r, o)), this._shouldSwap(n, t) && this._swap(n, t), (n = t), (r = 2 * n + 1), (o = 2 * n + 2);
          }
          _clone(e) {
            return new e(this._nodes.slice(), this._leaf);
          }
          sort() {
            for (let e = this.size() - 1; e > 0; e -= 1) this._swap(0, e), this._heapifyDownUntil(e);
            return this._nodes;
          }
          insert(e, t) {
            const n = void 0 !== t ? { key: e, value: t } : e;
            return this._nodes.push(n), this.heapifyUp(this.size() - 1), (null !== this._leaf && this._compare(n, this._leaf)) || (this._leaf = n), this;
          }
          fix() {
            for (let e = 0; e < this.size(); e += 1) this.heapifyUp(e);
            return this;
          }
          isValid() {
            const e = (t) => {
              let n = !0,
                r = !0;
              if (this._hasLeftChild(t)) {
                const r = 2 * t + 1;
                if (((n = this._compare(this._nodes[t], this._nodes[r])), !n)) return !1;
                n = e(r);
              }
              if (this._hasRightChild(t)) {
                const n = 2 * t + 2;
                if (((r = this._compare(this._nodes[t], this._nodes[n])), !r)) return !1;
                r = e(n);
              }
              return n && r;
            };
            return e(0);
          }
          root() {
            return this.isEmpty() ? null : this._nodes[0];
          }
          leaf() {
            return this._leaf;
          }
          size() {
            return this._nodes.length;
          }
          isEmpty() {
            return 0 === this.size();
          }
          clear() {
            (this._nodes = []), (this._leaf = null);
          }
          static _heapify(e, t) {
            if (!Array.isArray(e)) throw new Error(".heapify expects an array");
            return new t(e).fix();
          }
          static _isHeapified(e, t) {
            return new t(e).isValid();
          }
        };
    },
    945: function (e, t, n) {
      /**
       * @license MIT
       * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
       */
      const { Heap: r } = n(613);
      class o extends r {
        _compareKeys(e, t) {
          return e > t;
        }
        _compareChildrenBefore(e, t, n) {
          const r = this._getKey(this._nodes[t]);
          return this._getKey(this._nodes[n]) > r && n < e ? n : t;
        }
        clone() {
          return super._clone(o);
        }
        static heapify(e) {
          return super._heapify(e, o);
        }
        static isHeapified(e) {
          return super._isHeapified(e, o);
        }
      }
      t.MaxHeap = o;
    },
    573: function (e, t, n) {
      /**
       * @license MIT
       * @copyright 2019 Eyas Ranjous <eyas.ranjous@gmail.com>
       */
      const { Heap: r } = n(613);
      class o extends r {
        _compareKeys(e, t) {
          return e < t;
        }
        _compareChildrenBefore(e, t, n) {
          const r = this._getKey(this._nodes[t]);
          return this._getKey(this._nodes[n]) < r && n < e ? n : t;
        }
        clone() {
          return super._clone(o);
        }
        static heapify(e) {
          return super._heapify(e, o);
        }
        static isHeapified(e) {
          return super._isHeapified(e, o);
        }
      }
      t.MinHeap = o;
    },
    82: function (e, t, n) {
      const { MinPriorityQueue: r } = n(192),
        { MaxPriorityQueue: o } = n(387),
        { PriorityQueue: a } = n(515);
      e.exports = { MinPriorityQueue: r, MaxPriorityQueue: o, PriorityQueue: a };
    },
    387: function (e, t, n) {
      /**
       * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
       * @license MIT
       */
      const { MaxHeap: r } = n(436),
        { PriorityQueue: o } = n(515);
      t.MaxPriorityQueue = class extends o {
        constructor(e) {
          super(e), this._compare || (this._heap = new r());
        }
      };
    },
    192: function (e, t, n) {
      /**
       * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
       * @license MIT
       */
      const { MinHeap: r } = n(436),
        { PriorityQueue: o } = n(515);
      t.MinPriorityQueue = class extends o {
        constructor(e) {
          super(e), this._compare || (this._heap = new r());
        }
      };
    },
    515: function (e, t, n) {
      /**
       * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
       * @license MIT
       */
      const { CustomHeap: r } = n(436);
      t.PriorityQueue = class {
        constructor(e = {}) {
          const { priority: t, compare: n } = e;
          if (n) {
            if ("function" != typeof n) throw new Error(".constructor expects a valid compare function");
            (this._compare = n), (this._heap = new r(this._compare));
          } else {
            if (void 0 !== t && "function" != typeof t) throw new Error(".constructor expects a valid priority function");
            this._priority = t || ((e) => +e);
          }
        }
        _getElementWithPriority(e) {
          return { priority: e.key, element: e.value };
        }
        size() {
          return this._heap.size();
        }
        isEmpty() {
          return this._heap.isEmpty();
        }
        front() {
          return this.isEmpty() ? null : this._compare ? this._heap.root() : this._getElementWithPriority(this._heap.root());
        }
        back() {
          return this.isEmpty() ? null : this._compare ? this._heap.leaf() : this._getElementWithPriority(this._heap.leaf());
        }
        enqueue(e, t) {
          if (this._compare) return this._heap.insert(e), this;
          if (t && Number.isNaN(+t)) throw new Error(".enqueue expects a numeric priority");
          if (Number.isNaN(+t) && Number.isNaN(this._priority(e))) throw new Error(".enqueue expects a numeric priority or a constructor callback that returns a number");
          const n = Number.isNaN(+t) ? this._priority(e) : t;
          return this._heap.insert(+n, e), this;
        }
        dequeue() {
          return this.isEmpty() ? null : this._compare ? this._heap.extractRoot() : this._getElementWithPriority(this._heap.extractRoot());
        }
        toArray() {
          return this._compare
            ? this._heap.clone().sort().reverse()
            : this._heap
              .clone()
              .sort()
              .map((e) => this._getElementWithPriority(e))
              .reverse();
        }
        clear() {
          this._heap.clear();
        }
      };
    },
    184: function (e, t) {
      var n;
                /*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/ !(function () {
        "use strict";
        var r = {}.hasOwnProperty;
        function o() {
          for (var e = [], t = 0; t < arguments.length; t++) {
            var n = arguments[t];
            if (n) {
              var a = typeof n;
              if ("string" === a || "number" === a) e.push(n);
              else if (Array.isArray(n)) {
                if (n.length) {
                  var i = o.apply(null, n);
                  i && e.push(i);
                }
              } else if ("object" === a)
                if (n.toString === Object.prototype.toString) for (var s in n) r.call(n, s) && n[s] && e.push(s);
                else e.push(n.toString());
            }
          }
          return e.join(" ");
        }
        e.exports
          ? ((o.default = o), (e.exports = o))
          : void 0 ===
          (n = function () {
            return o;
          }.apply(t, [])) || (e.exports = n);
      })();
    },
    830: function (e, t, n) {
      var r = n(995),
        o = n(928),
        a = n(178),
        i = 0,
        s = Math.pow(36, 4);
      function l() {
        return o(((a() * s) << 0).toString(36), 4);
      }
      function c() {
        return (i = i < s ? i : 0), ++i - 1;
      }
      function u() {
        return "c" + new Date().getTime().toString(36) + o(c().toString(36), 4) + r() + (l() + l());
      }
      (u.slug = function () {
        var e = new Date().getTime().toString(36),
          t = c().toString(36).slice(-4),
          n = r().slice(0, 1) + r().slice(-1),
          o = l().slice(-2);
        return e.slice(-2) + t + n + o;
      }),
        (u.isCuid = function (e) {
          return "string" == typeof e && !!e.startsWith("c");
        }),
        (u.isSlug = function (e) {
          if ("string" != typeof e) return !1;
          var t = e.length;
          return t >= 7 && t <= 10;
        }),
        (u.fingerprint = r),
        (e.exports = u);
    },
    995: function (e, t, n) {
      var r = n(928),
        o = "object" == typeof window ? window : self,
        a = Object.keys(o).length,
        i = r(((navigator.mimeTypes ? navigator.mimeTypes.length : 0) + navigator.userAgent.length).toString(36) + a.toString(36), 4);
      e.exports = function () {
        return i;
      };
    },
    178: function (e) {
      var t,
        n = ("undefined" != typeof window && (window.crypto || window.msCrypto)) || ("undefined" != typeof self && self.crypto);
      if (n) {
        var r = Math.pow(2, 32) - 1;
        t = function () {
          return Math.abs(n.getRandomValues(new Uint32Array(1))[0] / r);
        };
      } else t = Math.random;
      e.exports = t;
    },
    928: function (e) {
      e.exports = function (e, t) {
        var n = "000000000" + e;
        return n.substr(n.length - t);
      };
    },
    960: function (e, t) {
      "use strict";
      var n;
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Doctype = t.CDATA = t.Tag = t.Style = t.Script = t.Comment = t.Directive = t.Text = t.Root = t.isTag = t.ElementType = void 0),
        (function (e) {
          (e.Root = "root"), (e.Text = "text"), (e.Directive = "directive"), (e.Comment = "comment"), (e.Script = "script"), (e.Style = "style"), (e.Tag = "tag"), (e.CDATA = "cdata"), (e.Doctype = "doctype");
        })((n = t.ElementType || (t.ElementType = {}))),
        (t.isTag = function (e) {
          return e.type === n.Tag || e.type === n.Script || e.type === n.Style;
        }),
        (t.Root = n.Root),
        (t.Text = n.Text),
        (t.Directive = n.Directive),
        (t.Comment = n.Comment),
        (t.Script = n.Script),
        (t.Style = n.Style),
        (t.Tag = n.Tag),
        (t.CDATA = n.CDATA),
        (t.Doctype = n.Doctype);
    },
    790: function (e, t, n) {
      "use strict";
      var r,
        o =
          (this && this.__extends) ||
          ((r = function (e, t) {
            return (
              (r =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (e, t) {
                    e.__proto__ = t;
                  }) ||
                function (e, t) {
                  for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                }),
              r(e, t)
            );
          }),
            function (e, t) {
              if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
              function n() {
                this.constructor = e;
              }
              r(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
            }),
        a =
          (this && this.__assign) ||
          function () {
            return (
              (a =
                Object.assign ||
                function (e) {
                  for (var t, n = 1, r = arguments.length; n < r; n++) for (var o in (t = arguments[n])) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                  return e;
                }),
              a.apply(this, arguments)
            );
          };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.cloneNode = t.hasChildren = t.isDocument = t.isDirective = t.isComment = t.isText = t.isCDATA = t.isTag = t.Element = t.Document = t.NodeWithChildren = t.ProcessingInstruction = t.Comment = t.Text = t.DataNode = t.Node = void 0);
      var i = n(960),
        s = new Map([
          [i.ElementType.Tag, 1],
          [i.ElementType.Script, 1],
          [i.ElementType.Style, 1],
          [i.ElementType.Directive, 1],
          [i.ElementType.Text, 3],
          [i.ElementType.CDATA, 4],
          [i.ElementType.Comment, 8],
          [i.ElementType.Root, 9],
        ]),
        l = (function () {
          function e(e) {
            (this.type = e), (this.parent = null), (this.prev = null), (this.next = null), (this.startIndex = null), (this.endIndex = null);
          }
          return (
            Object.defineProperty(e.prototype, "nodeType", {
              get: function () {
                var e;
                return null !== (e = s.get(this.type)) && void 0 !== e ? e : 1;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "parentNode", {
              get: function () {
                return this.parent;
              },
              set: function (e) {
                this.parent = e;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "previousSibling", {
              get: function () {
                return this.prev;
              },
              set: function (e) {
                this.prev = e;
              },
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "nextSibling", {
              get: function () {
                return this.next;
              },
              set: function (e) {
                this.next = e;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.cloneNode = function (e) {
              return void 0 === e && (e = !1), k(this, e);
            }),
            e
          );
        })();
      t.Node = l;
      var c = (function (e) {
        function t(t, n) {
          var r = e.call(this, t) || this;
          return (r.data = n), r;
        }
        return (
          o(t, e),
          Object.defineProperty(t.prototype, "nodeValue", {
            get: function () {
              return this.data;
            },
            set: function (e) {
              this.data = e;
            },
            enumerable: !1,
            configurable: !0,
          }),
          t
        );
      })(l);
      t.DataNode = c;
      var u = (function (e) {
        function t(t) {
          return e.call(this, i.ElementType.Text, t) || this;
        }
        return o(t, e), t;
      })(c);
      t.Text = u;
      var d = (function (e) {
        function t(t) {
          return e.call(this, i.ElementType.Comment, t) || this;
        }
        return o(t, e), t;
      })(c);
      t.Comment = d;
      var f = (function (e) {
        function t(t, n) {
          var r = e.call(this, i.ElementType.Directive, n) || this;
          return (r.name = t), r;
        }
        return o(t, e), t;
      })(c);
      t.ProcessingInstruction = f;
      var p = (function (e) {
        function t(t, n) {
          var r = e.call(this, t) || this;
          return (r.children = n), r;
        }
        return (
          o(t, e),
          Object.defineProperty(t.prototype, "firstChild", {
            get: function () {
              var e;
              return null !== (e = this.children[0]) && void 0 !== e ? e : null;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "lastChild", {
            get: function () {
              return this.children.length > 0 ? this.children[this.children.length - 1] : null;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "childNodes", {
            get: function () {
              return this.children;
            },
            set: function (e) {
              this.children = e;
            },
            enumerable: !1,
            configurable: !0,
          }),
          t
        );
      })(l);
      t.NodeWithChildren = p;
      var m = (function (e) {
        function t(t) {
          return e.call(this, i.ElementType.Root, t) || this;
        }
        return o(t, e), t;
      })(p);
      t.Document = m;
      var h = (function (e) {
        function t(t, n, r, o) {
          void 0 === r && (r = []), void 0 === o && (o = "script" === t ? i.ElementType.Script : "style" === t ? i.ElementType.Style : i.ElementType.Tag);
          var a = e.call(this, o, r) || this;
          return (a.name = t), (a.attribs = n), a;
        }
        return (
          o(t, e),
          Object.defineProperty(t.prototype, "tagName", {
            get: function () {
              return this.name;
            },
            set: function (e) {
              this.name = e;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "attributes", {
            get: function () {
              var e = this;
              return Object.keys(this.attribs).map(function (t) {
                var n, r;
                return { name: t, value: e.attribs[t], namespace: null === (n = e["x-attribsNamespace"]) || void 0 === n ? void 0 : n[t], prefix: null === (r = e["x-attribsPrefix"]) || void 0 === r ? void 0 : r[t] };
              });
            },
            enumerable: !1,
            configurable: !0,
          }),
          t
        );
      })(p);
      function y(e) {
        return i.isTag(e);
      }
      function g(e) {
        return e.type === i.ElementType.CDATA;
      }
      function v(e) {
        return e.type === i.ElementType.Text;
      }
      function b(e) {
        return e.type === i.ElementType.Comment;
      }
      function w(e) {
        return e.type === i.ElementType.Directive;
      }
      function C(e) {
        return e.type === i.ElementType.Root;
      }
      function k(e, t) {
        var n;
        if ((void 0 === t && (t = !1), v(e))) n = new u(e.data);
        else if (b(e)) n = new d(e.data);
        else if (y(e)) {
          var r = t ? E(e.children) : [],
            o = new h(e.name, a({}, e.attribs), r);
          r.forEach(function (e) {
            return (e.parent = o);
          }),
            e["x-attribsNamespace"] && (o["x-attribsNamespace"] = a({}, e["x-attribsNamespace"])),
            e["x-attribsPrefix"] && (o["x-attribsPrefix"] = a({}, e["x-attribsPrefix"])),
            (n = o);
        } else if (g(e)) {
          r = t ? E(e.children) : [];
          var s = new p(i.ElementType.CDATA, r);
          r.forEach(function (e) {
            return (e.parent = s);
          }),
            (n = s);
        } else if (C(e)) {
          r = t ? E(e.children) : [];
          var l = new m(r);
          r.forEach(function (e) {
            return (e.parent = l);
          }),
            e["x-mode"] && (l["x-mode"] = e["x-mode"]),
            (n = l);
        } else {
          if (!w(e)) throw new Error("Not implemented yet: " + e.type);
          var c = new f(e.name, e.data);
          null != e["x-name"] && ((c["x-name"] = e["x-name"]), (c["x-publicId"] = e["x-publicId"]), (c["x-systemId"] = e["x-systemId"])), (n = c);
        }
        return (n.startIndex = e.startIndex), (n.endIndex = e.endIndex), n;
      }
      function E(e) {
        for (
          var t = e.map(function (e) {
            return k(e, !0);
          }),
          n = 1;
          n < t.length;
          n++
        )
          (t[n].prev = t[n - 1]), (t[n - 1].next = t[n]);
        return t;
      }
      (t.Element = h),
        (t.isTag = y),
        (t.isCDATA = g),
        (t.isText = v),
        (t.isComment = b),
        (t.isDirective = w),
        (t.isDocument = C),
        (t.hasChildren = function (e) {
          return Object.prototype.hasOwnProperty.call(e, "children");
        }),
        (t.cloneNode = k);
    },
    885: function (e) {
      e.exports = {
        CASE_SENSITIVE_TAG_NAMES: [
          "animateMotion",
          "animateTransform",
          "clipPath",
          "feBlend",
          "feColorMatrix",
          "feComponentTransfer",
          "feComposite",
          "feConvolveMatrix",
          "feDiffuseLighting",
          "feDisplacementMap",
          "feDropShadow",
          "feFlood",
          "feFuncA",
          "feFuncB",
          "feFuncG",
          "feFuncR",
          "feGaussainBlur",
          "feImage",
          "feMerge",
          "feMergeNode",
          "feMorphology",
          "feOffset",
          "fePointLight",
          "feSpecularLighting",
          "feSpotLight",
          "feTile",
          "feTurbulence",
          "foreignObject",
          "linearGradient",
          "radialGradient",
          "textPath",
        ],
      };
    },
    276: function (e, t, n) {
      var r = "html",
        o = "head",
        a = "body",
        i = /<([a-zA-Z]+[0-9]?)/,
        s = /<head.*>/i,
        l = /<body.*>/i,
        c = function () {
          throw new Error("This browser does not support `document.implementation.createHTMLDocument`");
        },
        u = function () {
          throw new Error("This browser does not support `DOMParser.prototype.parseFromString`");
        };
      if ("function" == typeof window.DOMParser) {
        var d = new window.DOMParser();
        c = u = function (e, t) {
          return t && (e = "<" + t + ">" + e + "</" + t + ">"), d.parseFromString(e, "text/html");
        };
      }
      if (document.implementation) {
        var f = n(507).isIE,
          p = document.implementation.createHTMLDocument(f() ? "html-dom-parser" : void 0);
        c = function (e, t) {
          return t ? ((p.documentElement.getElementsByTagName(t)[0].innerHTML = e), p) : ((p.documentElement.innerHTML = e), p);
        };
      }
      var m,
        h = document.createElement("template");
      h.content &&
        (m = function (e) {
          return (h.innerHTML = e), h.content.childNodes;
        }),
        (e.exports = function (e) {
          var t,
            n,
            d,
            f,
            p = e.match(i);
          switch ((p && p[1] && (t = p[1].toLowerCase()), t)) {
            case r:
              return (
                (n = u(e)), s.test(e) || ((d = n.getElementsByTagName(o)[0]) && d.parentNode.removeChild(d)), l.test(e) || ((d = n.getElementsByTagName(a)[0]) && d.parentNode.removeChild(d)), n.getElementsByTagName(r)
              );
            case o:
            case a:
              return (f = c(e).getElementsByTagName(t)), l.test(e) && s.test(e) ? f[0].parentNode.childNodes : f;
            default:
              return m ? m(e) : c(e, a).getElementsByTagName(a)[0].childNodes;
          }
        });
    },
    152: function (e, t, n) {
      var r = n(276),
        o = n(507).formatDOM,
        a = /<(![a-zA-Z\s]+)>/;
      e.exports = function (e) {
        if ("string" != typeof e) throw new TypeError("First argument must be a string");
        if ("" === e) return [];
        var t,
          n = e.match(a);
        return n && n[1] && (t = n[1]), o(r(e), null, t);
      };
    },
    507: function (e, t, n) {
      for (var r, o = n(885), a = n(790), i = o.CASE_SENSITIVE_TAG_NAMES, s = a.Comment, l = a.Element, c = a.ProcessingInstruction, u = a.Text, d = {}, f = 0, p = i.length; f < p; f++) (r = i[f]), (d[r.toLowerCase()] = r);
      function m(e) {
        for (var t, n = {}, r = 0, o = e.length; r < o; r++) n[(t = e[r]).name] = t.value;
        return n;
      }
      function h(e) {
        var t = (function (e) {
          return d[e];
        })((e = e.toLowerCase()));
        return t || e;
      }
      e.exports = {
        formatAttributes: m,
        formatDOM: function e(t, n, r) {
          n = n || null;
          for (var o = [], a = 0, i = t.length; a < i; a++) {
            var d,
              f = t[a];
            switch (f.nodeType) {
              case 1:
                (d = new l(h(f.nodeName), m(f.attributes))).children = e(f.childNodes, d);
                break;
              case 3:
                d = new u(f.nodeValue);
                break;
              case 8:
                d = new s(f.nodeValue);
                break;
              default:
                continue;
            }
            var p = o[a - 1] || null;
            p && (p.next = d), (d.parent = n), (d.prev = p), (d.next = null), o.push(d);
          }
          return r && (((d = new c(r.substring(0, r.indexOf(" ")).toLowerCase(), r)).next = o[0] || null), (d.parent = n), o.unshift(d), o[1] && (o[1].prev = o[0])), o;
        },
        isIE: function () {
          return /(MSIE |Trident\/|Edge\/)/.test(navigator.userAgent);
        },
      };
    },
    488: function (e, t, n) {
      var r = n(670),
        o = n(484),
        a = n(152),
        i = { lowerCaseAttributeNames: !1 };
      function s(e, t) {
        if ("string" != typeof e) throw new TypeError("First argument must be a string");
        return "" === e ? [] : r(a(e, (t = t || {}).htmlparser2 || i), t);
      }
      (s.domToReact = r), (s.htmlToDOM = a), (s.attributesToProps = o), (e.exports = s), (e.exports.default = s);
    },
    484: function (e, t, n) {
      var r = n(686),
        o = n(606),
        a = o.setStyleProp,
        i = r.html,
        s = r.svg,
        l = r.isCustomAttribute,
        c = Object.prototype.hasOwnProperty;
      e.exports = function (e) {
        var t, n, r, u;
        e = e || {};
        var d = {};
        for (t in e)
          (r = e[t]),
            l(t)
              ? (d[t] = r)
              : ((n = t.toLowerCase()),
                c.call(i, n)
                  ? (d[(u = i[n]).propertyName] = !!(u.hasBooleanValue || (u.hasOverloadedBooleanValue && !r)) || r)
                  : c.call(s, t)
                    ? (d[(u = s[t]).propertyName] = r)
                    : o.PRESERVE_CUSTOM_ATTRIBUTES && (d[t] = r));
        return a(e.style, d), d;
      };
    },
    670: function (e, t, n) {
      var r = n(363),
        o = n(484),
        a = n(606),
        i = a.setStyleProp;
      function s(e) {
        return a.PRESERVE_CUSTOM_ATTRIBUTES && "tag" === e.type && a.isCustomComponent(e.name, e.attribs);
      }
      e.exports = function e(t, n) {
        for (var a, l, c, u, d = (n = n || {}).library || r, f = d.cloneElement, p = d.createElement, m = d.isValidElement, h = [], y = "function" == typeof n.replace, g = n.trim, v = 0, b = t.length; v < b; v++)
          if (((a = t[v]), y && m((l = n.replace(a))))) b > 1 && (l = f(l, { key: l.key || v })), h.push(l);
          else if ("text" !== a.type) {
            switch (((c = a.attribs), s(a) ? i(c.style, c) : c && (c = o(c)), (u = null), a.type)) {
              case "script":
              case "style":
                a.children[0] && (c.dangerouslySetInnerHTML = { __html: a.children[0].data });
                break;
              case "tag":
                "textarea" === a.name && a.children[0] ? (c.defaultValue = a.children[0].data) : a.children && a.children.length && (u = e(a.children, n));
                break;
              default:
                continue;
            }
            b > 1 && (c.key = v), h.push(p(a.name, c, u));
          } else g ? a.data.trim() && h.push(a.data) : h.push(a.data);
        return 1 === h.length ? h[0] : h;
      };
    },
    606: function (e, t, n) {
      var r = n(363),
        o = n(476).default;
      var a = { reactCompat: !0 };
      var i = r.version.split(".")[0] >= 16;
      e.exports = {
        PRESERVE_CUSTOM_ATTRIBUTES: i,
        invertObject: function (e, t) {
          if (!e || "object" != typeof e) throw new TypeError("First argument must be an object");
          var n,
            r,
            o = "function" == typeof t,
            a = {},
            i = {};
          for (n in e) (r = e[n]), o && (a = t(n, r)) && 2 === a.length ? (i[a[0]] = a[1]) : "string" == typeof r && (i[r] = n);
          return i;
        },
        isCustomComponent: function (e, t) {
          if (-1 === e.indexOf("-")) return t && "string" == typeof t.is;
          switch (e) {
            case "annotation-xml":
            case "color-profile":
            case "font-face":
            case "font-face-src":
            case "font-face-uri":
            case "font-face-format":
            case "font-face-name":
            case "missing-glyph":
              return !1;
            default:
              return !0;
          }
        },
        setStyleProp: function (e, t) {
          if (null != e)
            try {
              t.style = o(e, a);
            } catch (e) {
              t.style = {};
            }
        },
      };
    },
    139: function (e) {
      var t = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,
        n = /\n/g,
        r = /^\s*/,
        o = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,
        a = /^:\s*/,
        i = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,
        s = /^[;\s]*/,
        l = /^\s+|\s+$/g,
        c = "";
      function u(e) {
        return e ? e.replace(l, c) : c;
      }
      e.exports = function (e, l) {
        if ("string" != typeof e) throw new TypeError("First argument must be a string");
        if (!e) return [];
        l = l || {};
        var d = 1,
          f = 1;
        function p(e) {
          var t = e.match(n);
          t && (d += t.length);
          var r = e.lastIndexOf("\n");
          f = ~r ? e.length - r : f + e.length;
        }
        function m() {
          var e = { line: d, column: f };
          return function (t) {
            return (t.position = new h(e)), b(), t;
          };
        }
        function h(e) {
          (this.start = e), (this.end = { line: d, column: f }), (this.source = l.source);
        }
        h.prototype.content = e;
        var y = [];
        function g(t) {
          var n = new Error(l.source + ":" + d + ":" + f + ": " + t);
          if (((n.reason = t), (n.filename = l.source), (n.line = d), (n.column = f), (n.source = e), !l.silent)) throw n;
          y.push(n);
        }
        function v(t) {
          var n = t.exec(e);
          if (n) {
            var r = n[0];
            return p(r), (e = e.slice(r.length)), n;
          }
        }
        function b() {
          v(r);
        }
        function w(e) {
          var t;
          for (e = e || []; (t = C());) !1 !== t && e.push(t);
          return e;
        }
        function C() {
          var t = m();
          if ("/" == e.charAt(0) && "*" == e.charAt(1)) {
            for (var n = 2; c != e.charAt(n) && ("*" != e.charAt(n) || "/" != e.charAt(n + 1));) ++n;
            if (((n += 2), c === e.charAt(n - 1))) return g("End of comment missing");
            var r = e.slice(2, n - 2);
            return (f += 2), p(r), (e = e.slice(n)), (f += 2), t({ type: "comment", comment: r });
          }
        }
        function k() {
          var e = m(),
            n = v(o);
          if (n) {
            if ((C(), !v(a))) return g("property missing ':'");
            var r = v(i),
              l = e({ type: "declaration", property: u(n[0].replace(t, c)), value: r ? u(r[0].replace(t, c)) : c });
            return v(s), l;
          }
        }
        return (
          b(),
          (function () {
            var e,
              t = [];
            for (w(t); (e = k());) !1 !== e && (t.push(e), w(t));
            return t;
          })()
        );
      };
    },
    703: function (e, t, n) {
      "use strict";
      var r = n(414);
      function o() { }
      function a() { }
      (a.resetWarningCache = o),
        (e.exports = function () {
          function e(e, t, n, o, a, i) {
            if (i !== r) {
              var s = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
              throw ((s.name = "Invariant Violation"), s);
            }
          }
          function t() {
            return e;
          }
          e.isRequired = e;
          var n = {
            array: e,
            bool: e,
            func: e,
            number: e,
            object: e,
            string: e,
            symbol: e,
            any: e,
            arrayOf: t,
            element: e,
            elementType: e,
            instanceOf: t,
            node: e,
            objectOf: t,
            oneOf: t,
            oneOfType: t,
            shape: t,
            exact: t,
            checkPropTypes: a,
            resetWarningCache: o,
          };
          return (n.PropTypes = n), n;
        });
    },
    697: function (e, t, n) {
      e.exports = n(703)();
    },
    414: function (e) {
      "use strict";
      e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    },
    265: function (e, t) {
      "use strict";
      function n(e, t, n, r) {
        var o = new e(n);
        return r.createElement(t, o.props);
      }
      function r(e, t, r, o) {
        (t && r) || console.warn("React (from react) and render (from react-dom) must be passed in.");
        var a = n(this.model, this.component, e, t),
          i = r(a, e);
        this.rendered.push({ element: e, reactElement: a, ref: i, rootElement: o });
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.createElement = n),
        (t.render = r),
        (t.default = function (e, t, n) {
          (e && t && n) || console.warn("createRDC requires nodeName, model, and component parameters to be defined.");
          return { nodeName: e, model: t, component: n, render: r, rendered: [] };
        });
    },
    511: function (e, t) {
      "use strict";
      function n(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }
      Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
      var r = (function () {
        function e(t) {
          !(function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          })(this, e),
            (this.props = {}),
            (this.element = t),
            (this.props.element = t),
            this.getId(),
            this.getClassList(),
            this.getChildNodes();
        }
        var t, r, o;
        return (
          (t = e),
          (r = [
            {
              key: "getId",
              value: function () {
                this.props.id = this.element.id;
              },
            },
            {
              key: "getClassList",
              value: function () {
                this.props.classList = this.element.classList;
              },
            },
            {
              key: "getDataAttribute",
              value: function (e) {
                this.props[e] = this.element.dataset[e];
              },
            },
            {
              key: "getAttribute",
              value: function (e, t) {
                t || (t = e), (this.props[t] = this.element.getAttribute(e));
              },
            },
            {
              key: "getTextContent",
              value: function () {
                var e = this.getChildNode("#text");
                this.props.text = null !== e ? e.textContent : null;
              },
            },
            {
              key: "getChildDOMModel",
              value: function (e, t) {
                var n = this.getChildNode(e);
                this.props[e] = null !== n ? new t(n) : null;
              },
            },
            {
              key: "getChildDOMModelArray",
              value: function (e, t) {
                this.props[e] = [];
                for (var n = 0; n < this.nodes.length; ++n) this.nodes[n].nodeName.toLowerCase() === e && this.props[e].push(new t(this.nodes[n]));
              },
            },
            {
              key: "getChildNodes",
              value: function () {
                this.nodes = this.element.childNodes;
              },
            },
            {
              key: "getChildNode",
              value: function (e) {
                for (var t = 0; t < this.nodes.length; ++t) if (this.nodes[t].nodeName.toLowerCase() === e) return this.nodes[t];
                return null;
              },
            },
          ]) && n(t.prototype, r),
          o && n(t, o),
          e
        );
      })();
      t.default = r;
    },
    731: function (e, t) {
      "use strict";
      function n(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }
      Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
      var r = (function () {
        function e(t, n) {
          !(function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          })(this, e),
            (function (e, t) {
              if (!e || "function" != typeof e.createElement || "function" != typeof e.Component)
                return console.warn("DOMRegistry: Invalid React object passed in.  Please verify the React parameter passed to DOMRegistry"), !1;
              var n = e.version ? parseInt(e.version.split(".")[0]) : 0;
              n < 16
                ? console.warn("DOMRegistry: Invalid React version.  React >= 16 must be used.  React major version detected: ", n)
                : "function" == typeof t || console.warn("DOMRegistry: Invalid reactDOMRender function passed in.  Please verify that `render` from `react-dom` is passed in.");
            })(t, n),
            (this.React = t),
            (this.reactDOMRender = n),
            (this.components = {});
        }
        var t, r, o;
        return (
          (t = e),
          (r = [
            {
              key: "register",
              value: function (e) {
                this.components ? (this.components = Object.assign(this.components, e)) : (this.components = e), this.getNodeNames();
              },
            },
            {
              key: "init",
              value: function () {
                var e = this,
                  t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document;
                this.element = t;
                var n = Object.keys(this.components);
                n.forEach(function (t) {
                  e.renderAll(e.element, e.components[t]);
                });
              },
            },
            {
              key: "render",
              value: function (e, t) {
                t ? e.render(t, this.React, this.reactDOMRender, this.element) : this.renderAll(this.element, e);
              },
            },
            {
              key: "renderAll",
              value: function (e, t) {
                var n = this,
                  r = e.querySelectorAll(t.nodeName);
                Array.prototype.forEach.call(r, function (e) {
                  n.traverseUpDom(e) && t.render(e, n.React, n.reactDOMRender, n.element);
                });
              },
            },
            {
              key: "traverseUpDom",
              value: function (e) {
                var t = e.parentNode;
                if (null !== t) {
                  var n = t.nodeName.toLowerCase();
                  return !this.nodeNames.includes(n) && ("body" === n || this.traverseUpDom(t), !0);
                }
                return !1;
              },
            },
            {
              key: "getNodeNames",
              value: function () {
                var e = this;
                (this.nodeNames = []),
                  Object.keys(this.components).forEach(function (t) {
                    e.nodeNames.push(e.components[t].nodeName);
                  });
              },
            },
          ]),
          r && n(t.prototype, r),
          o && n(t, o),
          e
        );
      })();
      t.default = r;
    },
    558: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "jk", {
        enumerable: !0,
        get: function () {
          return r.default;
        },
      }),
        Object.defineProperty(t, "bt", {
          enumerable: !0,
          get: function () {
            return o.default;
          },
        }),
        Object.defineProperty(t, "Rb", {
          enumerable: !0,
          get: function () {
            return a.default;
          },
        });
      var r = i(n(511)),
        o = i(n(731)),
        a = i(n(265));
      function i(e) {
        return e && e.__esModule ? e : { default: e };
      }
    },
    686: function (e, t, n) {
      var r = n(888),
        o = n(138),
        a = n(855),
        i = a.MUST_USE_PROPERTY,
        s = a.HAS_BOOLEAN_VALUE,
        l = a.HAS_NUMERIC_VALUE,
        c = a.HAS_POSITIVE_NUMERIC_VALUE,
        u = a.HAS_OVERLOADED_BOOLEAN_VALUE;
      function d(e, t) {
        return (e & t) === t;
      }
      function f(e, t, n) {
        var r,
          o,
          a,
          f = e.Properties,
          p = e.DOMAttributeNames;
        for (o in f)
          (r = p[o] || (n ? o : o.toLowerCase())),
            (a = f[o]),
            (t[r] = { attributeName: r, propertyName: o, mustUseProperty: d(a, i), hasBooleanValue: d(a, s), hasNumericValue: d(a, l), hasPositiveNumericValue: d(a, c), hasOverloadedBooleanValue: d(a, u) });
      }
      var p = {};
      f(r, p);
      var m = {};
      f(o, m, !0);
      var h = {};
      f(r, h), f(o, h, !0);
      e.exports = {
        html: p,
        svg: m,
        properties: h,
        isCustomAttribute: RegExp.prototype.test.bind(
          new RegExp(
            "^(data|aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
          )
        ),
      };
    },
    888: function (e) {
      e.exports = {
        Properties: {
          autoFocus: 4,
          accept: 0,
          acceptCharset: 0,
          accessKey: 0,
          action: 0,
          allowFullScreen: 4,
          allowTransparency: 0,
          alt: 0,
          as: 0,
          async: 4,
          autoComplete: 0,
          autoPlay: 4,
          capture: 4,
          cellPadding: 0,
          cellSpacing: 0,
          charSet: 0,
          challenge: 0,
          checked: 5,
          cite: 0,
          classID: 0,
          className: 0,
          cols: 24,
          colSpan: 0,
          content: 0,
          contentEditable: 0,
          contextMenu: 0,
          controls: 4,
          controlsList: 0,
          coords: 0,
          crossOrigin: 0,
          data: 0,
          dateTime: 0,
          default: 4,
          defer: 4,
          dir: 0,
          disabled: 4,
          download: 32,
          draggable: 0,
          encType: 0,
          form: 0,
          formAction: 0,
          formEncType: 0,
          formMethod: 0,
          formNoValidate: 4,
          formTarget: 0,
          frameBorder: 0,
          headers: 0,
          height: 0,
          hidden: 4,
          high: 0,
          href: 0,
          hrefLang: 0,
          htmlFor: 0,
          httpEquiv: 0,
          icon: 0,
          id: 0,
          inputMode: 0,
          integrity: 0,
          is: 0,
          keyParams: 0,
          keyType: 0,
          kind: 0,
          label: 0,
          lang: 0,
          list: 0,
          loop: 4,
          low: 0,
          manifest: 0,
          marginHeight: 0,
          marginWidth: 0,
          max: 0,
          maxLength: 0,
          media: 0,
          mediaGroup: 0,
          method: 0,
          min: 0,
          minLength: 0,
          multiple: 5,
          muted: 5,
          name: 0,
          nonce: 0,
          noValidate: 4,
          open: 4,
          optimum: 0,
          pattern: 0,
          placeholder: 0,
          playsInline: 4,
          poster: 0,
          preload: 0,
          profile: 0,
          radioGroup: 0,
          readOnly: 4,
          referrerPolicy: 0,
          rel: 0,
          required: 4,
          reversed: 4,
          role: 0,
          rows: 24,
          rowSpan: 8,
          sandbox: 0,
          scope: 0,
          scoped: 4,
          scrolling: 0,
          seamless: 4,
          selected: 5,
          shape: 0,
          size: 24,
          sizes: 0,
          span: 24,
          spellCheck: 0,
          src: 0,
          srcDoc: 0,
          srcLang: 0,
          srcSet: 0,
          start: 8,
          step: 0,
          style: 0,
          summary: 0,
          tabIndex: 0,
          target: 0,
          title: 0,
          type: 0,
          useMap: 0,
          value: 0,
          width: 0,
          wmode: 0,
          wrap: 0,
          about: 0,
          datatype: 0,
          inlist: 0,
          prefix: 0,
          property: 0,
          resource: 0,
          typeof: 0,
          vocab: 0,
          autoCapitalize: 0,
          autoCorrect: 0,
          autoSave: 0,
          color: 0,
          itemProp: 0,
          itemScope: 4,
          itemType: 0,
          itemID: 0,
          itemRef: 0,
          results: 0,
          security: 0,
          unselectable: 0,
        },
        DOMAttributeNames: { acceptCharset: "accept-charset", className: "class", htmlFor: "for", httpEquiv: "http-equiv" },
      };
    },
    138: function (e) {
      e.exports = {
        Properties: {
          accentHeight: 0,
          accumulate: 0,
          additive: 0,
          alignmentBaseline: 0,
          allowReorder: 0,
          alphabetic: 0,
          amplitude: 0,
          arabicForm: 0,
          ascent: 0,
          attributeName: 0,
          attributeType: 0,
          autoReverse: 0,
          azimuth: 0,
          baseFrequency: 0,
          baseProfile: 0,
          baselineShift: 0,
          bbox: 0,
          begin: 0,
          bias: 0,
          by: 0,
          calcMode: 0,
          capHeight: 0,
          clip: 0,
          clipPath: 0,
          clipRule: 0,
          clipPathUnits: 0,
          colorInterpolation: 0,
          colorInterpolationFilters: 0,
          colorProfile: 0,
          colorRendering: 0,
          contentScriptType: 0,
          contentStyleType: 0,
          cursor: 0,
          cx: 0,
          cy: 0,
          d: 0,
          decelerate: 0,
          descent: 0,
          diffuseConstant: 0,
          direction: 0,
          display: 0,
          divisor: 0,
          dominantBaseline: 0,
          dur: 0,
          dx: 0,
          dy: 0,
          edgeMode: 0,
          elevation: 0,
          enableBackground: 0,
          end: 0,
          exponent: 0,
          externalResourcesRequired: 0,
          fill: 0,
          fillOpacity: 0,
          fillRule: 0,
          filter: 0,
          filterRes: 0,
          filterUnits: 0,
          floodColor: 0,
          floodOpacity: 0,
          focusable: 0,
          fontFamily: 0,
          fontSize: 0,
          fontSizeAdjust: 0,
          fontStretch: 0,
          fontStyle: 0,
          fontVariant: 0,
          fontWeight: 0,
          format: 0,
          from: 0,
          fx: 0,
          fy: 0,
          g1: 0,
          g2: 0,
          glyphName: 0,
          glyphOrientationHorizontal: 0,
          glyphOrientationVertical: 0,
          glyphRef: 0,
          gradientTransform: 0,
          gradientUnits: 0,
          hanging: 0,
          horizAdvX: 0,
          horizOriginX: 0,
          ideographic: 0,
          imageRendering: 0,
          in: 0,
          in2: 0,
          intercept: 0,
          k: 0,
          k1: 0,
          k2: 0,
          k3: 0,
          k4: 0,
          kernelMatrix: 0,
          kernelUnitLength: 0,
          kerning: 0,
          keyPoints: 0,
          keySplines: 0,
          keyTimes: 0,
          lengthAdjust: 0,
          letterSpacing: 0,
          lightingColor: 0,
          limitingConeAngle: 0,
          local: 0,
          markerEnd: 0,
          markerMid: 0,
          markerStart: 0,
          markerHeight: 0,
          markerUnits: 0,
          markerWidth: 0,
          mask: 0,
          maskContentUnits: 0,
          maskUnits: 0,
          mathematical: 0,
          mode: 0,
          numOctaves: 0,
          offset: 0,
          opacity: 0,
          operator: 0,
          order: 0,
          orient: 0,
          orientation: 0,
          origin: 0,
          overflow: 0,
          overlinePosition: 0,
          overlineThickness: 0,
          paintOrder: 0,
          panose1: 0,
          pathLength: 0,
          patternContentUnits: 0,
          patternTransform: 0,
          patternUnits: 0,
          pointerEvents: 0,
          points: 0,
          pointsAtX: 0,
          pointsAtY: 0,
          pointsAtZ: 0,
          preserveAlpha: 0,
          preserveAspectRatio: 0,
          primitiveUnits: 0,
          r: 0,
          radius: 0,
          refX: 0,
          refY: 0,
          renderingIntent: 0,
          repeatCount: 0,
          repeatDur: 0,
          requiredExtensions: 0,
          requiredFeatures: 0,
          restart: 0,
          result: 0,
          rotate: 0,
          rx: 0,
          ry: 0,
          scale: 0,
          seed: 0,
          shapeRendering: 0,
          slope: 0,
          spacing: 0,
          specularConstant: 0,
          specularExponent: 0,
          speed: 0,
          spreadMethod: 0,
          startOffset: 0,
          stdDeviation: 0,
          stemh: 0,
          stemv: 0,
          stitchTiles: 0,
          stopColor: 0,
          stopOpacity: 0,
          strikethroughPosition: 0,
          strikethroughThickness: 0,
          string: 0,
          stroke: 0,
          strokeDasharray: 0,
          strokeDashoffset: 0,
          strokeLinecap: 0,
          strokeLinejoin: 0,
          strokeMiterlimit: 0,
          strokeOpacity: 0,
          strokeWidth: 0,
          surfaceScale: 0,
          systemLanguage: 0,
          tableValues: 0,
          targetX: 0,
          targetY: 0,
          textAnchor: 0,
          textDecoration: 0,
          textRendering: 0,
          textLength: 0,
          to: 0,
          transform: 0,
          u1: 0,
          u2: 0,
          underlinePosition: 0,
          underlineThickness: 0,
          unicode: 0,
          unicodeBidi: 0,
          unicodeRange: 0,
          unitsPerEm: 0,
          vAlphabetic: 0,
          vHanging: 0,
          vIdeographic: 0,
          vMathematical: 0,
          values: 0,
          vectorEffect: 0,
          version: 0,
          vertAdvY: 0,
          vertOriginX: 0,
          vertOriginY: 0,
          viewBox: 0,
          viewTarget: 0,
          visibility: 0,
          widths: 0,
          wordSpacing: 0,
          writingMode: 0,
          x: 0,
          xHeight: 0,
          x1: 0,
          x2: 0,
          xChannelSelector: 0,
          xlinkActuate: 0,
          xlinkArcrole: 0,
          xlinkHref: 0,
          xlinkRole: 0,
          xlinkShow: 0,
          xlinkTitle: 0,
          xlinkType: 0,
          xmlBase: 0,
          xmlns: 0,
          xmlnsXlink: 0,
          xmlLang: 0,
          xmlSpace: 0,
          y: 0,
          y1: 0,
          y2: 0,
          yChannelSelector: 0,
          z: 0,
          zoomAndPan: 0,
        },
        DOMAttributeNames: {
          accentHeight: "accent-height",
          alignmentBaseline: "alignment-baseline",
          arabicForm: "arabic-form",
          baselineShift: "baseline-shift",
          capHeight: "cap-height",
          clipPath: "clip-path",
          clipRule: "clip-rule",
          colorInterpolation: "color-interpolation",
          colorInterpolationFilters: "color-interpolation-filters",
          colorProfile: "color-profile",
          colorRendering: "color-rendering",
          dominantBaseline: "dominant-baseline",
          enableBackground: "enable-background",
          fillOpacity: "fill-opacity",
          fillRule: "fill-rule",
          floodColor: "flood-color",
          floodOpacity: "flood-opacity",
          fontFamily: "font-family",
          fontSize: "font-size",
          fontSizeAdjust: "font-size-adjust",
          fontStretch: "font-stretch",
          fontStyle: "font-style",
          fontVariant: "font-variant",
          fontWeight: "font-weight",
          glyphName: "glyph-name",
          glyphOrientationHorizontal: "glyph-orientation-horizontal",
          glyphOrientationVertical: "glyph-orientation-vertical",
          horizAdvX: "horiz-adv-x",
          horizOriginX: "horiz-origin-x",
          imageRendering: "image-rendering",
          letterSpacing: "letter-spacing",
          lightingColor: "lighting-color",
          markerEnd: "marker-end",
          markerMid: "marker-mid",
          markerStart: "marker-start",
          overlinePosition: "overline-position",
          overlineThickness: "overline-thickness",
          paintOrder: "paint-order",
          panose1: "panose-1",
          pointerEvents: "pointer-events",
          renderingIntent: "rendering-intent",
          shapeRendering: "shape-rendering",
          stopColor: "stop-color",
          stopOpacity: "stop-opacity",
          strikethroughPosition: "strikethrough-position",
          strikethroughThickness: "strikethrough-thickness",
          strokeDasharray: "stroke-dasharray",
          strokeDashoffset: "stroke-dashoffset",
          strokeLinecap: "stroke-linecap",
          strokeLinejoin: "stroke-linejoin",
          strokeMiterlimit: "stroke-miterlimit",
          strokeOpacity: "stroke-opacity",
          strokeWidth: "stroke-width",
          textAnchor: "text-anchor",
          textDecoration: "text-decoration",
          textRendering: "text-rendering",
          underlinePosition: "underline-position",
          underlineThickness: "underline-thickness",
          unicodeBidi: "unicode-bidi",
          unicodeRange: "unicode-range",
          unitsPerEm: "units-per-em",
          vAlphabetic: "v-alphabetic",
          vHanging: "v-hanging",
          vIdeographic: "v-ideographic",
          vMathematical: "v-mathematical",
          vectorEffect: "vector-effect",
          vertAdvY: "vert-adv-y",
          vertOriginX: "vert-origin-x",
          vertOriginY: "vert-origin-y",
          wordSpacing: "word-spacing",
          writingMode: "writing-mode",
          xHeight: "x-height",
          xlinkActuate: "xlink:actuate",
          xlinkArcrole: "xlink:arcrole",
          xlinkHref: "xlink:href",
          xlinkRole: "xlink:role",
          xlinkShow: "xlink:show",
          xlinkTitle: "xlink:title",
          xlinkType: "xlink:type",
          xmlBase: "xml:base",
          xmlnsXlink: "xmlns:xlink",
          xmlLang: "xml:lang",
          xmlSpace: "xml:space",
        },
      };
    },
    855: function (e) {
      e.exports = { MUST_USE_PROPERTY: 1, HAS_BOOLEAN_VALUE: 4, HAS_NUMERIC_VALUE: 8, HAS_POSITIVE_NUMERIC_VALUE: 24, HAS_OVERLOADED_BOOLEAN_VALUE: 32 };
    },
    476: function (e, t, n) {
      "use strict";
      var r =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      t.__esModule = !0;
      var o = r(n(848)),
        a = n(678);
      t.default = function (e, t) {
        var n = {};
        return e && "string" == typeof e
          ? (o.default(e, function (e, r) {
            e && r && (n[a.camelCase(e, t)] = r);
          }),
            n)
          : n;
      };
    },
    678: function (e, t) {
      "use strict";
      (t.__esModule = !0), (t.camelCase = void 0);
      var n = /^--[a-zA-Z0-9-]+$/,
        r = /-([a-z])/g,
        o = /^[^-]+$/,
        a = /^-(webkit|moz|ms|o|khtml)-/,
        i = function (e, t) {
          return t.toUpperCase();
        },
        s = function (e, t) {
          return t + "-";
        };
      t.camelCase = function (e, t) {
        return (
          void 0 === t && (t = {}),
          (function (e) {
            return !e || o.test(e) || n.test(e);
          })(e)
            ? e
            : ((e = e.toLowerCase()), t.reactCompat || (e = e.replace(a, s)), e.replace(r, i))
        );
      };
    },
    848: function (e, t, n) {
      var r = n(139);
      e.exports = function (e, t) {
        var n,
          o = null;
        if (!e || "string" != typeof e) return o;
        for (var a, i, s = r(e), l = "function" == typeof t, c = 0, u = s.length; c < u; c++) (a = (n = s[c]).property), (i = n.value), l ? t(a, i, n) : i && (o || (o = {}), (o[a] = i));
        return o;
      };
    },
    449: function (e, t, n) {
      /**
       *
       *
       * @author Jerry Bendy <jerry@icewingcc.com>
       * @licence MIT
       *
       */
      !(function (e) {
        "use strict";
        var t = e.URLSearchParams ? e.URLSearchParams : null,
          n = t && "a=1" === new t({ a: 1 }).toString(),
          r = t && "+" === new t("s=%2B").get("s"),
          o = l.prototype,
          a = !(!e.Symbol || !e.Symbol.iterator);
        if (!(t && n && r)) {
          (o.append = function (e, t) {
            p(this.__URLSearchParams__, e, t);
          }),
            (o.delete = function (e) {
              delete this.__URLSearchParams__[e];
            }),
            (o.get = function (e) {
              var t = this.__URLSearchParams__;
              return e in t ? t[e][0] : null;
            }),
            (o.getAll = function (e) {
              var t = this.__URLSearchParams__;
              return e in t ? t[e].slice(0) : [];
            }),
            (o.has = function (e) {
              return e in this.__URLSearchParams__;
            }),
            (o.set = function (e, t) {
              this.__URLSearchParams__[e] = ["" + t];
            }),
            (o.toString = function () {
              var e,
                t,
                n,
                r,
                o = this.__URLSearchParams__,
                a = [];
              for (t in o) for (n = c(t), e = 0, r = o[t]; e < r.length; e++) a.push(n + "=" + c(r[e]));
              return a.join("&");
            });
          var i = !!r && t && !n && e.Proxy;
          e.URLSearchParams = i
            ? new Proxy(t, {
              construct: function (e, t) {
                return new e(new l(t[0]).toString());
              },
            })
            : l;
          var s = e.URLSearchParams.prototype;
          (s.polyfill = !0),
            (s.forEach =
              s.forEach ||
              function (e, t) {
                var n = f(this.toString());
                Object.getOwnPropertyNames(n).forEach(function (r) {
                  n[r].forEach(function (n) {
                    e.call(t, n, r, this);
                  }, this);
                }, this);
              }),
            (s.sort =
              s.sort ||
              function () {
                var e,
                  t,
                  n,
                  r = f(this.toString()),
                  o = [];
                for (e in r) o.push(e);
                for (o.sort(), t = 0; t < o.length; t++) this.delete(o[t]);
                for (t = 0; t < o.length; t++) {
                  var a = o[t],
                    i = r[a];
                  for (n = 0; n < i.length; n++) this.append(a, i[n]);
                }
              }),
            (s.keys =
              s.keys ||
              function () {
                var e = [];
                return (
                  this.forEach(function (t, n) {
                    e.push(n);
                  }),
                  d(e)
                );
              }),
            (s.values =
              s.values ||
              function () {
                var e = [];
                return (
                  this.forEach(function (t) {
                    e.push(t);
                  }),
                  d(e)
                );
              }),
            (s.entries =
              s.entries ||
              function () {
                var e = [];
                return (
                  this.forEach(function (t, n) {
                    e.push([n, t]);
                  }),
                  d(e)
                );
              }),
            a && (s[e.Symbol.iterator] = s[e.Symbol.iterator] || s.entries);
        }
        function l(e) {
          ((e = e || "") instanceof URLSearchParams || e instanceof l) && (e = e.toString()), (this.__URLSearchParams__ = f(e));
        }
        function c(e) {
          var t = { "!": "%21", "'": "%27", "(": "%28", ")": "%29", "~": "%7E", "%20": "+", "%00": "\0" };
          return encodeURIComponent(e).replace(/[!'\(\)~]|%20|%00/g, function (e) {
            return t[e];
          });
        }
        function u(e) {
          return decodeURIComponent(e.replace(/\+/g, " "));
        }
        function d(t) {
          var n = {
            next: function () {
              var e = t.shift();
              return { done: void 0 === e, value: e };
            },
          };
          return (
            a &&
            (n[e.Symbol.iterator] = function () {
              return n;
            }),
            n
          );
        }
        function f(e) {
          var t = {};
          if ("object" == typeof e) for (var n in e) e.hasOwnProperty(n) && p(t, n, e[n]);
          else {
            0 === e.indexOf("?") && (e = e.slice(1));
            for (var r = e.split("&"), o = 0; o < r.length; o++) {
              var a = r[o],
                i = a.indexOf("=");
              -1 < i ? p(t, u(a.slice(0, i)), u(a.slice(i + 1))) : a && p(t, u(a), "");
            }
          }
          return t;
        }
        function p(e, t, n) {
          var r = "string" == typeof n ? n : null != n && "function" == typeof n.toString ? n.toString() : JSON.stringify(n);
          t in e ? e[t].push(r) : (e[t] = [r]);
        }
      })(void 0 !== n.g ? n.g : "undefined" != typeof window ? window : this);
    },
    147: function () {
      !(function (e) {
        "use strict";
        if (!e.fetch) {
          var t = "URLSearchParams" in e,
            n = "Symbol" in e && "iterator" in Symbol,
            r =
              "FileReader" in e &&
              "Blob" in e &&
              (function () {
                try {
                  return new Blob(), !0;
                } catch (e) {
                  return !1;
                }
              })(),
            o = "FormData" in e,
            a = "ArrayBuffer" in e;
          if (a)
            var i = [
              "[object Int8Array]",
              "[object Uint8Array]",
              "[object Uint8ClampedArray]",
              "[object Int16Array]",
              "[object Uint16Array]",
              "[object Int32Array]",
              "[object Uint32Array]",
              "[object Float32Array]",
              "[object Float64Array]",
            ],
              s = function (e) {
                return e && DataView.prototype.isPrototypeOf(e);
              },
              l =
                ArrayBuffer.isView ||
                function (e) {
                  return e && i.indexOf(Object.prototype.toString.call(e)) > -1;
                };
          (m.prototype.append = function (e, t) {
            (e = d(e)), (t = f(t));
            var n = this.map[e];
            this.map[e] = n ? n + "," + t : t;
          }),
            (m.prototype.delete = function (e) {
              delete this.map[d(e)];
            }),
            (m.prototype.get = function (e) {
              return (e = d(e)), this.has(e) ? this.map[e] : null;
            }),
            (m.prototype.has = function (e) {
              return this.map.hasOwnProperty(d(e));
            }),
            (m.prototype.set = function (e, t) {
              this.map[d(e)] = f(t);
            }),
            (m.prototype.forEach = function (e, t) {
              for (var n in this.map) this.map.hasOwnProperty(n) && e.call(t, this.map[n], n, this);
            }),
            (m.prototype.keys = function () {
              var e = [];
              return (
                this.forEach(function (t, n) {
                  e.push(n);
                }),
                p(e)
              );
            }),
            (m.prototype.values = function () {
              var e = [];
              return (
                this.forEach(function (t) {
                  e.push(t);
                }),
                p(e)
              );
            }),
            (m.prototype.entries = function () {
              var e = [];
              return (
                this.forEach(function (t, n) {
                  e.push([n, t]);
                }),
                p(e)
              );
            }),
            n && (m.prototype[Symbol.iterator] = m.prototype.entries);
          var c = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
          (w.prototype.clone = function () {
            return new w(this, { body: this._bodyInit });
          }),
            b.call(w.prototype),
            b.call(k.prototype),
            (k.prototype.clone = function () {
              return new k(this._bodyInit, { status: this.status, statusText: this.statusText, headers: new m(this.headers), url: this.url });
            }),
            (k.error = function () {
              var e = new k(null, { status: 0, statusText: "" });
              return (e.type = "error"), e;
            });
          var u = [301, 302, 303, 307, 308];
          (k.redirect = function (e, t) {
            if (-1 === u.indexOf(t)) throw new RangeError("Invalid status code");
            return new k(null, { status: t, headers: { location: e } });
          }),
            (e.Headers = m),
            (e.Request = w),
            (e.Response = k),
            (e.fetch = function (e, t) {
              return new Promise(function (n, o) {
                var a = new w(e, t),
                  i = new XMLHttpRequest();
                (i.onload = function () {
                  var e,
                    t,
                    r = {
                      status: i.status,
                      statusText: i.statusText,
                      headers:
                        ((e = i.getAllResponseHeaders() || ""),
                          (t = new m()),
                          e
                            .replace(/\r?\n[\t ]+/g, " ")
                            .split(/\r?\n/)
                            .forEach(function (e) {
                              var n = e.split(":"),
                                r = n.shift().trim();
                              if (r) {
                                var o = n.join(":").trim();
                                t.append(r, o);
                              }
                            }),
                          t),
                    };
                  r.url = "responseURL" in i ? i.responseURL : r.headers.get("X-Request-URL");
                  var o = "response" in i ? i.response : i.responseText;
                  n(new k(o, r));
                }),
                  (i.onerror = function () {
                    o(new TypeError("Network request failed"));
                  }),
                  (i.ontimeout = function () {
                    o(new TypeError("Network request failed"));
                  }),
                  i.open(a.method, a.url, !0),
                  "include" === a.credentials ? (i.withCredentials = !0) : "omit" === a.credentials && (i.withCredentials = !1),
                  "responseType" in i && r && (i.responseType = "blob"),
                  a.headers.forEach(function (e, t) {
                    i.setRequestHeader(t, e);
                  }),
                  i.send(void 0 === a._bodyInit ? null : a._bodyInit);
              });
            }),
            (e.fetch.polyfill = !0);
        }
        function d(e) {
          if (("string" != typeof e && (e = String(e)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e))) throw new TypeError("Invalid character in header field name");
          return e.toLowerCase();
        }
        function f(e) {
          return "string" != typeof e && (e = String(e)), e;
        }
        function p(e) {
          var t = {
            next: function () {
              var t = e.shift();
              return { done: void 0 === t, value: t };
            },
          };
          return (
            n &&
            (t[Symbol.iterator] = function () {
              return t;
            }),
            t
          );
        }
        function m(e) {
          (this.map = {}),
            e instanceof m
              ? e.forEach(function (e, t) {
                this.append(t, e);
              }, this)
              : Array.isArray(e)
                ? e.forEach(function (e) {
                  this.append(e[0], e[1]);
                }, this)
                : e &&
                Object.getOwnPropertyNames(e).forEach(function (t) {
                  this.append(t, e[t]);
                }, this);
        }
        function h(e) {
          if (e.bodyUsed) return Promise.reject(new TypeError("Already read"));
          e.bodyUsed = !0;
        }
        function y(e) {
          return new Promise(function (t, n) {
            (e.onload = function () {
              t(e.result);
            }),
              (e.onerror = function () {
                n(e.error);
              });
          });
        }
        function g(e) {
          var t = new FileReader(),
            n = y(t);
          return t.readAsArrayBuffer(e), n;
        }
        function v(e) {
          if (e.slice) return e.slice(0);
          var t = new Uint8Array(e.byteLength);
          return t.set(new Uint8Array(e)), t.buffer;
        }
        function b() {
          return (
            (this.bodyUsed = !1),
            (this._initBody = function (e) {
              if (((this._bodyInit = e), e))
                if ("string" == typeof e) this._bodyText = e;
                else if (r && Blob.prototype.isPrototypeOf(e)) this._bodyBlob = e;
                else if (o && FormData.prototype.isPrototypeOf(e)) this._bodyFormData = e;
                else if (t && URLSearchParams.prototype.isPrototypeOf(e)) this._bodyText = e.toString();
                else if (a && r && s(e)) (this._bodyArrayBuffer = v(e.buffer)), (this._bodyInit = new Blob([this._bodyArrayBuffer]));
                else {
                  if (!a || (!ArrayBuffer.prototype.isPrototypeOf(e) && !l(e))) throw new Error("unsupported BodyInit type");
                  this._bodyArrayBuffer = v(e);
                }
              else this._bodyText = "";
              this.headers.get("content-type") ||
                ("string" == typeof e
                  ? this.headers.set("content-type", "text/plain;charset=UTF-8")
                  : this._bodyBlob && this._bodyBlob.type
                    ? this.headers.set("content-type", this._bodyBlob.type)
                    : t && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
            }),
            r &&
            ((this.blob = function () {
              var e = h(this);
              if (e) return e;
              if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
              if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
              if (this._bodyFormData) throw new Error("could not read FormData body as blob");
              return Promise.resolve(new Blob([this._bodyText]));
            }),
              (this.arrayBuffer = function () {
                return this._bodyArrayBuffer ? h(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(g);
              })),
            (this.text = function () {
              var e,
                t,
                n,
                r = h(this);
              if (r) return r;
              if (this._bodyBlob) return (e = this._bodyBlob), (t = new FileReader()), (n = y(t)), t.readAsText(e), n;
              if (this._bodyArrayBuffer)
                return Promise.resolve(
                  (function (e) {
                    for (var t = new Uint8Array(e), n = new Array(t.length), r = 0; r < t.length; r++) n[r] = String.fromCharCode(t[r]);
                    return n.join("");
                  })(this._bodyArrayBuffer)
                );
              if (this._bodyFormData) throw new Error("could not read FormData body as text");
              return Promise.resolve(this._bodyText);
            }),
            o &&
            (this.formData = function () {
              return this.text().then(C);
            }),
            (this.json = function () {
              return this.text().then(JSON.parse);
            }),
            this
          );
        }
        function w(e, t) {
          var n,
            r,
            o = (t = t || {}).body;
          if (e instanceof w) {
            if (e.bodyUsed) throw new TypeError("Already read");
            (this.url = e.url),
              (this.credentials = e.credentials),
              t.headers || (this.headers = new m(e.headers)),
              (this.method = e.method),
              (this.mode = e.mode),
              o || null == e._bodyInit || ((o = e._bodyInit), (e.bodyUsed = !0));
          } else this.url = String(e);
          if (
            ((this.credentials = t.credentials || this.credentials || "omit"),
              (!t.headers && this.headers) || (this.headers = new m(t.headers)),
              (this.method = ((n = t.method || this.method || "GET"), (r = n.toUpperCase()), c.indexOf(r) > -1 ? r : n)),
              (this.mode = t.mode || this.mode || null),
              (this.referrer = null),
              ("GET" === this.method || "HEAD" === this.method) && o)
          )
            throw new TypeError("Body not allowed for GET or HEAD requests");
          this._initBody(o);
        }
        function C(e) {
          var t = new FormData();
          return (
            e
              .trim()
              .split("&")
              .forEach(function (e) {
                if (e) {
                  var n = e.split("="),
                    r = n.shift().replace(/\+/g, " "),
                    o = n.join("=").replace(/\+/g, " ");
                  t.append(decodeURIComponent(r), decodeURIComponent(o));
                }
              }),
            t
          );
        }
        function k(e, t) {
          t || (t = {}),
            (this.type = "default"),
            (this.status = void 0 === t.status ? 200 : t.status),
            (this.ok = this.status >= 200 && this.status < 300),
            (this.statusText = "statusText" in t ? t.statusText : "OK"),
            (this.headers = new m(t.headers)),
            (this.url = t.url || ""),
            this._initBody(e);
        }
      })("undefined" != typeof self ? self : this);
    },
    363: function (e) {
      "use strict";
      e.exports = React;
    },
  },
    t = {};
  function n(r) {
    var o = t[r];
    if (void 0 !== o) return o.exports;
    var a = (t[r] = { exports: {} });
    return e[r].call(a.exports, a, a.exports, n), a.exports;
  }
  (n.n = function (e) {
    var t =
      e && e.__esModule
        ? function () {
          return e.default;
        }
        : function () {
          return e;
        };
    return n.d(t, { a: t }), t;
  }),
    (n.d = function (e, t) {
      for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (n.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (function () {
      "use strict";
      var e = n(363),
        t = n.n(e),
        r = ReactDOM,
        o = n.n(r),
        a = n(558);
      function i() {
        return void 0 !== window.Granite;
      }
      var s = n(184),
        l = n.n(s),
        c = n(697),
        u = n.n(c),
        d =
          (n(147),
            function (e, t) {
              var n = void 0,
                r = function () {
                  for (var r = this, o = arguments.length, a = Array(o), i = 0; i < o; i++) a[i] = arguments[i];
                  var s = function () {
                    return e.apply(r, a);
                  };
                  clearTimeout(n), (n = setTimeout(s, t));
                };
              return (
                (r.cancel = function () {
                  n && clearTimeout(n);
                }),
                r
              );
            }),
        f = n(82);
      function p(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function m(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var n = null == e ? null : ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
            if (null != n) {
              var r,
                o,
                a = [],
                i = !0,
                s = !1;
              try {
                for (n = n.call(e); !(i = (r = n.next()).done) && (a.push(r.value), !t || a.length !== t); i = !0);
              } catch (e) {
                (s = !0), (o = e);
              } finally {
                try {
                  i || null == n.return || n.return();
                } finally {
                  if (s) throw o;
                }
              }
              return a;
            }
          })(e, t) ||
          y(e, t) ||
          (function () {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          })()
        );
      }
      function h(e) {
        return (
          (function (e) {
            if (Array.isArray(e)) return p(e);
          })(e) ||
          (function (e) {
            if (("undefined" != typeof Symbol && null != e[Symbol.iterator]) || null != e["@@iterator"]) return Array.from(e);
          })(e) ||
          y(e) ||
          (function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          })()
        );
      }
      function y(e, t) {
        if (e) {
          if ("string" == typeof e) return p(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(n) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? p(e, t) : void 0;
        }
      }
      var g = function () {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        return t.reduce(function (e, t) {
          return e.concat(t);
        }, []);
      },
        v = function (e) {
          return g.apply(void 0, h(e));
        },
        b = function (e) {
          return e.toLowerCase().trim();
        },
        w = function (e) {
          return !!e && e.constructor === Object;
        },
        C = function (e) {
          if (w(e))
            return (
              (t = e),
              (n = C),
              (r = {}),
              Object.keys(t).forEach(function (e) {
                r[e] = n(t[e]);
              }),
              r
            );
          if (Array.isArray(e)) return e.map(C);
          var t, n, r;
          try {
            return C(JSON.parse(e));
          } catch (t) {
            return e;
          }
        },
        k = function (e) {
          return null == e || Number.isNaN(e);
        },
        E = function (e) {
          return v(
            e.map(function (e) {
              return e.items;
            })
          ).some(function (e) {
            return e.selected;
          });
        },
        T = function (e) {
          return e.stopPropagation();
        },
        x = function (e, t, n) {
          if (!e || !t) return n;
          for (var r = e, o = t.split("."), a = 0; a < o.length; a += 1) {
            var i = o[a];
            if (null == r || !r.hasOwnProperty(i)) {
              r = n;
              break;
            }
            r = r[i];
          }
          return r;
        },
        S = function (e) {
          return e.filter(function (e) {
            var t = e.selected;
            return Boolean(t);
          }).length;
        },
        O = function (e) {
          var t = new URLSearchParams(e);
          return h(t.keys()).reduce(function (e, n) {
            if (!e[n]) {
              var r = t.getAll(n);
              if (1 === r.length) {
                var o = m(r, 1)[0];
                o.includes("|") && (r = o.split("|"));
              }
              e[n] = decodeURIComponent(r);
            }
            return e;
          }, {});
        },
        P = function (e) {
          var t = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).array,
            n = new URLSearchParams();
          return (
            Object.entries(e).forEach(function (e) {
              var r = m(e, 2),
                o = r[0],
                a = r[1];
              Array.isArray(a) ? ("comma" === t ? n.append(o, encodeURIComponent(a)) : n.append(o, encodeURIComponent(a.join("|")))) : n.append(o, encodeURIComponent(a));
            }),
            n.toString()
          );
        },
        A = function (e, t) {
          return Date.parse(e) < Date.parse(t);
        },
        F = 0;
      setInterval(function () {
        F += 1e3;
      }, 1e3);
      var I = function () {
        var e = new URLSearchParams(window.location.search),
          t = parseInt(e.get("servertime"), 10);
        return t ? new Date(t + F) : new Date();
      },
        N = function (e, t, n) {
          var r = I();
          return (function (e, t, n) {
            var r = Date.parse(e),
              o = Date.parse(t),
              a = Date.parse(n);
            return o <= r && a >= r;
          })(r, e, t)
            ? n.live
            : A(r, e)
              ? n.upcoming
              : n.onDemand;
        };
      function L(e) {
        for (var t = h(e), n = I(), r = new f.MinPriorityQueue(), o = 0; o < t.length; o++) {
          var a = Date.parse(t[o].startDate) - n;
          a && a > 0 && r.enqueue(t[o], a), t[o].endDate && r.enqueue(null, Date.parse(t[o].endDate) - n);
        }
        return r;
      }
      var R = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window.location.hostname,
          n = "_blank";
        try {
          var r = new URL(e),
            o = r.hostname,
            a = void 0 === o ? "" : o;
          t === a && (n = "_self");
        } catch (e) { }
        return n;
      },
        _ = 10,
        D = 4,
        B = { AND: "and", OR: "or", XOR: "xor" },
        M = "left",
        j = "top",
        q = { DATEASC: "dateasc", DATEDESC: "datedesc", EVENTSORT: "eventsort", FEATURED: "featured", TITLEASC: "titleasc", TITLEDESC: "titledesc", RANDOM: "random" },
        U = "left",
        H = "right",
        W = "price",
        z = "button",
        V = "icon-with-text",
        Q = "link-with-icon",
        G = "text",
        $ = "icon",
        K = "link",
        X = "progress-bar",
        Y = "rating",
        Z = "bookmark",
        J = "date-interval",
        ee = "gated",
        te = "light",
        ne = "dark",
        re = "darkest",
        oe = {
          collection: {
            mode: "",
            layout: { type: "3up", gutter: "4x", container: "32Margin" },
            button: { style: "" },
            resultsPerPage: 9,
            endpoint: "",
            title: "",
            totalCardLimit: -1,
            cardStyle: "",
            displayTotalResults: !0,
            totalResultsText: "{} results",
            i18n: {
              prettyDateIntervalFormat: "{LLL} {dd} | {timeRange} {timeZone}",
              totalResultsText: "{total} results",
              title: "",
              onErrorTitle: "Sorry there was a system error.",
              onErrorDescription: "Please try reloading the page or try coming back to the page another time.",
            },
          },
          featuredCards: [],
          header: { enabled: !1 },
          filterPanel: {
            enabled: !0,
            eventFilter: "",
            type: "left",
            filters: [],
            clearAllFiltersText: "Clear all",
            clearFilterText: "Clear",
            filterLogic: "and",
            leftPanelHeader: "Refine the results",
            topPanel: { mobile: { blurFilters: !0 } },
          },
          sort: { enabled: !0, defaultSort: "featured", options: [] },
          pagination: {
            enabled: !0,
            type: "loadMore",
            loadMoreButton: { style: "primary", useThemeThree: !1 },
            paginatorQuantityText: "Showing {}-{} of {} Results",
            paginatorPrevLabel: "Previous",
            paginatorNextLabel: "Next",
            loadMoreButtonText: "Load more",
            loadMoreQuantityText: "{} of {} displayed",
          },
          bookmarks: {
            enabled: !0,
            bookmarkOnlyCollection: !1,
            cardSavedIcon: "",
            cardUnsavedIcon: "",
            selectBookmarksIcon: "",
            unselectBookmarksIcon: "",
            saveCardText: "Save card",
            unsaveCardText: "Unsave card",
            bookmarksFilterTitle: "My favorites",
          },
          search: {
            enabled: !0,
            inputPlaceholderText: "Search here...",
            leftPanelTitle: "Search",
            searchFields: ["title", "description"],
            i18n: { noResultsTitle: "No results found", noResultsDescription: "We couldn’t find any results for your {query}.{break}\n            Check your spelling or try broadening your search." },
          },
          language: "en",
        },
        ae = "3:4",
        ie = "full-card",
        se = "half-height",
        le = "double-wide",
        ce = "custom-card",
        ue = "product",
        de = "2up",
        fe = "3up",
        pe = "4up",
        me = "5up",
        he = "1x",
        ye = "2x",
        ge = "3x",
        ve = "4x",
        be = "83Percent",
        we = "1200MaxWidth",
        Ce = "1600MaxWidth",
        ke = "32Margin",
        Ee = "carousel",
        Te = "medium",
        xe = "big",
        Se = function (e) {
          return function (t, n) {
            var r = n ? "".concat(t, ".").concat(n) : t,
              o = x(oe, r),
              a = x(e, r);
            return k(a) ? o : a;
          };
        };
      var Oe = t().createContext({ value: null, setValue: function () { } }),
        Pe = t().createContext({});
      function Ae(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function Fe(e, t, n) {
        return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
      }
      function Ie(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {},
            r = Object.keys(n);
          "function" == typeof Object.getOwnPropertySymbols &&
            (r = r.concat(
              Object.getOwnPropertySymbols(n).filter(function (e) {
                return Object.getOwnPropertyDescriptor(n, e).enumerable;
              })
            )),
            r.forEach(function (t) {
              Fe(e, t, n[t]);
            });
        }
        return e;
      }
      function Ne(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var n = null == e ? null : ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
            if (null != n) {
              var r,
                o,
                a = [],
                i = !0,
                s = !1;
              try {
                for (n = n.call(e); !(i = (r = n.next()).done) && (a.push(r.value), !t || a.length !== t); i = !0);
              } catch (e) {
                (s = !0), (o = e);
              } finally {
                try {
                  i || null == n.return || n.return();
                } finally {
                  if (s) throw o;
                }
              }
              return a;
            }
          })(e, t) ||
          (function (e, t) {
            if (!e) return;
            if ("string" == typeof e) return Ae(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(n);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Ae(e, t);
          })(e, t) ||
          (function () {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          })()
        );
      }
      var Le = function (t) {
        var n = (0, e.useContext)(Oe),
          r = n.value,
          o = n.setValue,
          a = (0, e.useCallback)(
            function (e) {
              e.stopPropagation(), o(r === t ? null : t);
            },
            [o, r]
          );
        return [r, a];
      },
        Re = function () {
          var t = (0, e.useContext)(Pe);
          return (0, e.useCallback)(Se(t), [t]);
        },
        _e = function (t, n) {
          var r = { rootMargin: "500px" },
            o = Ne((0, e.useState)(""), 2),
            a = o[0],
            i = o[1],
            s = Ne((0, e.useState)(""), 2),
            l = s[0],
            c = s[1],
            u = new IntersectionObserver(function (e) {
              0 !== e[0].intersectionRatio && c(n);
            }, r);
          return (
            (0, e.useEffect)(
              function () {
                var e;
                return (
                  l &&
                  (((e = new Image()).src = l),
                    (e.onload = function () {
                      i(l);
                    })),
                  function () {
                    e && (e.onload = function () { });
                  }
                );
              },
              [l]
            ),
            (0, e.useEffect)(
              function () {
                return (
                  t.current && u.observe(t.current),
                  function () {
                    u.unobserve(t.current);
                  }
                );
              },
              [t]
            ),
            [a]
          );
        },
        De = function () {
          var t = Ne((0, e.useState)(!1), 2),
            n = t[0],
            r = t[1];
          return (
            (0, e.useEffect)(
              function () {
                if (!n) {
                  var e = x(window, "feds.utilities", null),
                    t = e ? e.getEventData : null;
                  t &&
                    t()
                      .then(function () {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                          t = e.isRegistered;
                        t && r(!0);
                      })
                      .catch(function () {
                        var e,
                          t,
                          n,
                          o,
                          a,
                          i =
                            ((e = x(window, "feds.data", null)),
                              (t = x(e, "eventName", null)),
                              (n = t && e[t] ? e[t] : null),
                              (o = n ? n.isRegistered : null),
                              (a = x(e, "isRegisteredForMax", null)),
                              !(!o && !a));
                        i && r(i);
                      });
                }
              },
              [n]
            ),
            n
          );
        },
        Be = { id: c.string },
        Me = { from: c.string, until: c.string },
        je = { id: (0, c.oneOfType)([c.string, c.number]) },
        qe = {
          src: c.string,
          type: c.string,
          term: c.string,
          text: c.string,
          label: c.string,
          price: c.string,
          color: c.string,
          linkHint: c.string,
          percentage: c.string,
          openInNewTab: c.bool,
          srcAltText: c.string,
          totalStars: c.number,
          starsFilled: c.number,
          saveCardIcon: c.string,
          cardSaveText: c.string,
          unsaveCardIcon: c.string,
          cardUnsaveText: c.string,
          completionText: c.string,
        },
        Ue = { src: c.string, type: c.string, href: c.string, text: (0, c.oneOfType)([c.string, c.number]) },
        He = { src: c.string, type: c.string, style: c.string, endTime: c.string, startTime: c.string, text: (0, c.oneOfType)([c.string, c.number]) },
        We = { icon: c.string, fontColor: c.string, description: (0, c.oneOfType)([c.string, c.array]), backgroundColor: c.string },
        ze = { src: c.string, alt: c.string, borderColor: c.string, backgroundColor: c.string },
        Ve = { description: (0, c.oneOfType)([c.string, c.array]) },
        Qe = { url: c.string },
        Ge = { typeOverride: c.string, backgroundImage: c.string },
        $e = { detailText: c.string, title: (0, c.oneOfType)([c.string, c.array]), description: (0, c.oneOfType)([c.string, c.array]), dateDetailText: (0, c.shape)({ endTime: c.string, startTime: c.string }) },
        Ke = { logo: (0, c.shape)(ze), label: (0, c.shape)(Ve), banner: (0, c.shape)(We), videoButton: (0, c.shape)(Qe) },
        Xe = { divider: c.bool, isFluid: c.bool, left: (0, c.arrayOf)((0, c.shape)(qe)), right: (0, c.arrayOf)((0, c.shape)(He)), center: (0, c.arrayOf)((0, c.shape)(Ue)) },
        Ye = {
          id: c.string,
          title: c.string,
          cardDate: c.string,
          styles: (0, c.shape)(Ge),
          search: (0, c.shape)({}),
          showCard: (0, c.shape)(Me),
          overlays: (0, c.shape)(Ke),
          tags: (0, c.arrayOf)((0, c.shape)(je)),
          footer: (0, c.arrayOf)((0, c.shape)(Xe)),
          contentArea: (0, c.shape)($e),
          appliesTo: (0, c.arrayOf)((0, c.shape)(Be)),
        },
        Ze = [c.string, c.number],
        Je = [c.string, c.number],
        et = [c.bool, c.string],
        tt = { title: c.string, endpoint: c.string, cardStyle: c.string, totalResultsText: c.string, resultsPerPage: (0, c.oneOfType)(Ze), totalCardLimit: (0, c.oneOfType)(Je), displayTotalResults: (0, c.oneOfType)(et) },
        nt = [c.string, (0, c.arrayOf)((0, c.shape)(Ye))],
        rt = [c.bool, c.string],
        ot = { enabled: (0, c.oneOfType)(rt) },
        at = { id: c.string, label: (0, c.oneOfType)([c.string, c.number]) },
        it = { id: c.string, group: c.string, items: (0, c.arrayOf)((0, c.shape)(at)) },
        st = [c.string, (0, c.arrayOf)((0, c.shape)(it))],
        lt = { type: c.string, filterLogic: c.string, clearFilterText: c.string, leftPanelHeader: c.string, clearAllFiltersText: c.string, enabled: (0, c.oneOfType)(rt), filters: (0, c.oneOfType)(st) },
        ct = { type: c.string, paginatorPrevLabel: c.string, paginatorNextLabel: c.string, loadMoreButtonText: c.string, enabled: (0, c.oneOfType)(rt), loadMoreQuantityText: c.string, paginatorQuantityText: c.string },
        ut = {
          saveCardText: c.string,
          cardSavedIcon: c.string,
          unsaveCardText: c.string,
          cardUnsavedIcon: c.string,
          selectBookmarksIcon: c.string,
          enabled: (0, c.oneOfType)(rt),
          bookmarksFilterTitle: c.string,
          unselectBookmarksIcon: c.string,
        },
        dt = [c.string, (0, c.arrayOf)(c.string)],
        ft = { leftPanelTitle: c.string, inputPlaceholderText: c.string, enabled: (0, c.oneOfType)(rt), searchFields: (0, c.oneOfType)(dt) },
        pt = { sort: c.string, label: c.string },
        mt = { enabled: (0, c.oneOfType)(rt), options: (0, c.oneOfType)([c.string, (0, c.arrayOf)((0, c.shape)(pt))]) },
        ht = {
          sort: (0, c.shape)(mt),
          search: (0, c.shape)(ft),
          header: (0, c.shape)(ot),
          bookmarks: (0, c.shape)(ut),
          collection: (0, c.shape)(tt),
          pagination: (0, c.shape)(ct),
          filterPanel: (0, c.shape)(lt),
          featuredCards: (0, c.oneOfType)(nt),
        };
      function yt(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function gt(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var n = null == e ? null : ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
            if (null != n) {
              var r,
                o,
                a = [],
                i = !0,
                s = !1;
              try {
                for (n = n.call(e); !(i = (r = n.next()).done) && (a.push(r.value), !t || a.length !== t); i = !0);
              } catch (e) {
                (s = !0), (o = e);
              } finally {
                try {
                  i || null == n.return || n.return();
                } finally {
                  if (s) throw o;
                }
              }
              return a;
            }
          })(e, t) ||
          (function (e, t) {
            if (!e) return;
            if ("string" == typeof e) return yt(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(n);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return yt(e, t);
          })(e, t) ||
          (function () {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          })()
        );
      }
      var vt = {
        autoWidth: c.bool,
        id: c.string.isRequired,
        optionsAlignment: c.string,
        onSelect: c.func.isRequired,
        val: (0, c.shape)({ label: c.string, sort: c.string }).isRequired,
        values: (0, c.arrayOf)((0, c.shape)(pt)).isRequired,
      },
        bt = function (e) {
          var n = e.val,
            r = e.values,
            o = e.onSelect,
            a = e.autoWidth,
            i = e.optionsAlignment,
            s = e.id,
            c = gt(Le(s), 2),
            u = c[0],
            d = c[1],
            f = u === s,
            p = l()({ "consonant-Select": !0, "consonant-Select--autoWidth": a }),
            m = l()({ "consonant-Select-btn": !0, "is-active": f });
          return t().createElement(
            "div",
            { className: p },
            t().createElement("button", { "data-testid": "consonant-Select-btn", type: "button", onClick: d, className: m, tabIndex: "0" }, n.label),
            f &&
            t().createElement(
              "div",
              { "data-testid": "consonant-Select-options", className: "consonant-Select-options consonant-Select-options--".concat(i) },
              r.map(function (e) {
                return t().createElement(
                  "button",
                  {
                    "data-testid": "consonant-Select-option",
                    key: e.label,
                    type: "button",
                    className: e.label === n.label ? "consonant-Select-option is-selected" : "consonant-Select-option",
                    onClick: function (t) {
                      return (function (e, t) {
                        o(t), d(e);
                      })(t, e);
                    },
                    tabIndex: 0,
                  },
                  e.label
                );
              })
            )
          );
        };
      (bt.propTypes = vt), (bt.defaultProps = { autoWidth: !1, optionsAlignment: "right" });
      var wt = bt,
        Ct = { name: c.string, value: c.string, autofocus: c.bool, placeholderText: c.string, onSearch: c.func.isRequired },
        kt = "consonant-search",
        Et = function (n) {
          var r = n.value,
            o = n.onSearch,
            a = n.name,
            i = n.autofocus,
            s = n.placeholderText,
            l = Re()("search", "i18n.leftFilterPanel.searchTitle"),
            c = (0, e.useRef)(null);
          return (
            (0, e.useEffect)(
              function () {
                i && c.current && c.current.focus();
              },
              [i, c]
            ),
            t().createElement(
              "div",
              { "data-testid": a, className: "consonant-Search" },
              t().createElement(
                "label",
                { htmlFor: kt },
                t().createElement("span", { className: "consonant-Search-inputTitle" }, l),
                t().createElement(
                  "span",
                  { className: "consonant-Search-inputWrapper" },
                  t().createElement("input", {
                    id: kt,
                    "data-testid": "consonant-Search-input",
                    type: "search",
                    placeholder: s,
                    onClick: function (e) {
                      return e.stopPropagation();
                    },
                    value: r,
                    onChange: function (e) {
                      o(e.target.value);
                    },
                    ref: c,
                    className: "consonant-Search-input",
                    required: !0,
                  }),
                  t().createElement("button", {
                    "data-testid": "consonant-Search-inputClear",
                    type: "button",
                    title: "",
                    className: "consonant-Search-inputClear",
                    onClick: function () {
                      o(""), c.current.focus();
                    },
                    tabIndex: "0",
                  })
                )
              )
            )
          );
        };
      (Et.propTypes = Ct), (Et.defaultProps = { name: "", value: "", autofocus: !0, placeholderText: "" });
      var Tt = Et,
        xt = { size: c.string, hidden: c.bool, absolute: c.bool },
        St = { hidden: !1, absolute: !1, size: xe },
        Ot = function (e) {
          var n = e.size,
            r = e.hidden,
            o = e.absolute,
            a = l()({ "consonant-Loader--medium": n === Te, "consonant-Loader--big": n === xe, "consonant-Loader": !0, "consonant-Loader--absolute": o });
          return !r && t().createElement("div", { "data-testid": "consonant-Loader", className: a }, t().createElement("div", null), t().createElement("div", null), t().createElement("div", null), t().createElement("div", null));
        };
      (Ot.propTypes = xt), (Ot.defaultProps = St);
      var Pt = Ot,
        At = function (e) {
          return Array.prototype.slice.call(e);
        };
      function Ft() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
          n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          r = n.attribute,
          o = void 0 === r ? "scrollLeft" : r,
          a = n.callback,
          i = n.duration,
          s = void 0 === i ? 300 : i,
          l = e[o] || 0,
          c = ((t - l) / s) * 60,
          u =
            c > 0
              ? function (e, t) {
                return e >= t;
              }
              : function (e, t) {
                return e <= t;
              };
        function d() {
          var n = (e[o] || 0) + c;
          if (u(n, t)) {
            if (((e[o] = t), "function" == typeof a)) return a();
          } else (e[o] = n), window.requestAnimationFrame(d);
          return !0;
        }
        t !== e[o] && window.requestAnimationFrame(d);
      }
      var It = n(488),
        Nt = (It.domToReact, It.htmlToDOM, It.attributesToProps, It),
        Lt = { link: c.string, target: c.string },
        Rt = function (e) {
          var n = e.link,
            r = e.target;
          return t().createElement("a", { href: n, target: r, rel: "noopener noreferrer", tabIndex: "0", className: "consonant-LinkBlocker" });
        };
      (Rt.propTypes = Lt), (Rt.defaultProps = { link: "", target: "" });
      var _t = Rt,
        Dt = function (e) {
          var n = e.name,
            r = e.videoURL,
            o = e.innerRef,
            a = e.videoPolicy;
          return t().createElement(
            "div",
            { className: "modal", id: "dexter-Modal_".concat(Math.floor(1e13 * Math.random())) },
            t().createElement(
              "div",
              { className: "dexter-Modal_overlay mobile-place-center mobile-place-middle closePlacement-outsideTopRight is-Open", style: { backgroundColor: "rgba(0, 0, 0, 0.9)" }, "data-conf-display": "onPageLoad" },
              t().createElement(
                "div",
                { ref: o, className: "dexter-Modal mobile-width-100 mobile-height-auto tablet-width-640 desktop-width-1024 is-Open", id: "video-".concat(n) },
                t().createElement("h6", { id: "video-".concat(n, "-modalTitle"), className: "hide-all" }, "Video Modal"),
                t().createElement("p", { id: "video-".concat(n, "-modalDescription"), className: "hide-all" }, "Video Modal"),
                t().createElement("button", { className: "dexter-CloseButton" }, t().createElement("i", { className: "dexter-CloseButton_icon spectrum-close-circle-dark" })),
                t().createElement(
                  "div",
                  { className: "video aem-Grid aem-Grid--12 aem-Grid--default--12" },
                  t().createElement(
                    "div",
                    { className: "videoContainer", "data-in-modal": "true" },
                    t().createElement("iframe", { title: "Featured Video", "data-video-src": r, allow: a, frameBorder: "0", webkitallowfullscreen: "true", mozallowfullscreen: "true", allowFullScreen: "", src: r })
                  )
                )
              )
            )
          );
        };
      Dt.propTypes = { name: c.string.isRequired, videoURL: c.string.isRequired, videoPolicy: c.string.isRequired, innerRef: (0, c.oneOfType)([(0, c.shape)({ current: (0, c.instanceOf)(Element) })]).isRequired };
      var Bt = Dt;
      class Mt {
        constructor(e) {
          this.element = e;
        }
        setSrc() {
          this.element.src = this.element.dataset.videoSrc;
        }
        removeSrc() {
          const e = this.element.parentElement,
            t = this.element;
          e.removeChild(this.element), (t.src = ""), (this.element = t), e.appendChild(this.element);
        }
      }
      class jt {
        constructor(e) {
          this.element = e;
        }
        setSrc() {
          this.element.src = this.element.dataset.src;
        }
        removeSrc() {
          this.element.onload = void 0;
          const e = this.element.parentElement,
            t = this.element;
          e.removeChild(this.element), (t.src = ""), (this.element = t), e.appendChild(this.element);
        }
      }
      n(449);
      var qt = (function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
          }
        }
        return function (t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      })();
      function Ut(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }
      var Ht = (function () {
        function e() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          Ut(this, e),
            (this.log = this.logFactory("log")),
            (this.warn = this.logFactory("warn")),
            (this.error = this.logFactory("error")),
            (this.info = this.logFactory("info")),
            (this.debug = this.logFactory("debug")),
            (this.table = this.logFactory("table")),
            (this.trace = this.logFactory("trace"));
          var n = void 0 !== t.control,
            r = new URLSearchParams(window.location.search);
          this.options = { debug: !1, param: "dexter:debug", urlMode: "Enabling URL Debug mode for", fileMode: "Enabling File Debug mode for", debugAll: "All", concatenator: ":", control: n ? t.control : "" };
          var o = r.getAll(this.options.param),
            a = r.has(this.options.param),
            i = n && a && this.find(o, this.options.debugAll),
            s = n && a && this.find(o, t.control);
          this.options.debug
            ? this.info(this.options.fileMode, this.options.debugAll)
            : t.debug || !i || s
              ? t.debug || !s || i
                ? t.debug && n && ((this.options.debug = !0), this.info(this.options.fileMode, t.control))
                : ((this.options.debug = !0), this.info(this.options.urlMode, t.control))
              : ((this.options.debug = !0), this.info(this.options.urlMode, this.options.debugAll));
        }
        return (
          qt(e, [
            {
              key: "find",
              value: function (e, t) {
                return e.some(function (e) {
                  return e === t;
                });
              },
            },
            {
              key: "logFactory",
              value: function (e) {
                var t = this;
                return function () {
                  for (var n = arguments.length, r = Array(n), o = 0; o < n; o++) r[o] = arguments[o];
                  return !!r.length && t.printIt(e, r);
                };
              },
            },
            {
              key: "printIt",
              value: function (e, t) {
                var n = void 0,
                  r = void 0;
                switch (e) {
                  case "error":
                    n = console.error;
                    break;
                  case "warn":
                    n = console.warn;
                    break;
                  case "log":
                  default:
                    n = console.log;
                    break;
                  case "info":
                    n = console.info;
                    break;
                  case "debug":
                    n = console.debug;
                    break;
                  case "table":
                    n = console.table;
                    break;
                  case "trace":
                    n = console.trace;
                }
                return (
                  !(void 0 === e || void 0 === t || !this.options.debug) &&
                  ((r = [this.options.control + this.options.concatenator]),
                    t.forEach(function (e) {
                      r.push(e);
                    }),
                    (r = [].concat.apply(r)),
                    n.apply(console, r),
                    !0)
                );
              },
            },
          ]),
          e
        );
      })(),
        Wt = function (e) {
          var t = e.getBoundingClientRect(),
            n = t.top,
            r = t.bottom,
            o = window.innerHeight || document.documentElement.clientHeight;
          return (n > 0 || r > 0) && n < o;
        },
        zt = 37.4375,
        Vt = 56.1875,
        Qt = 74.9375,
        Gt = {
          phoneOnly: zt,
          tabletPortraitUp: 37.5,
          tabletPortraitMax: Vt,
          tabletLandscapeUp: 56.25,
          tabletLandscapeMax: Qt,
          desktop: 75,
          mediaExpression: {
            mobile: "(max-width: 37.4375rem)",
            tabletPortrait: "(min-width: 37.5rem) and (max-width: 56.1875rem)",
            tabletLandscape: "(min-width: 56.25rem) and (max-width: 74.9375rem)",
            desktop: "(min-width: 75rem)",
          },
        };
      var $t = (e = 250, t, n = {}, ...r) => {
        let o = null;
        return () => {
          const a = new Date().getTime();
          let i = null;
          i && clearTimeout(i),
            (!o || a - o >= e) &&
            ((o = a),
              t.apply(null, [n, r]),
              (i = setTimeout(() => {
                t.apply(null, [n, r]), (i = null);
              }, 2 * e)));
        };
      };
      const Kt = ".video-Wrapper.has-playOnView video",
        Xt = new Ht({ debug: !1, control: "BackgroundVideo" }),
        Yt = (e) => !!(e.currentTime > 0 && !e.paused && !e.ended && e.readyState > 2),
        Zt = (e) => {
          const t = e.play();
          return (
            t &&
            t
              .then(() => {
                Xt.log("Video starts playing successfully");
              })
              .catch(() => {
                Xt.log("Error while playing video");
              })
          );
        },
        Jt = (e) => {
          !Wt(e) || Yt(e) || e.ended ? !Wt(e) && Yt(e) && e.pause() : ("none" === e.getAttribute("preload") && e.setAttribute("preload", "metadata"), e.classList.contains("play-Onclick") || Zt(e));
        },
        en = (e) => {
          const t = ((e) => e.closest(".dexter-FlexContainer") || e.closest(".dexter-Position"))(e);
          t.addEventListener("mouseover", () => {
            !Wt(e) || Yt(e) || e.ended || Zt(e);
          }),
            t.addEventListener("mouseout", () => {
              Yt(e) && e.pause();
            });
        },
        tn = (e) => {
          const { videos: t, callback: n } = e;
          t &&
            t.forEach((e) => {
              n(e);
            });
        },
        nn = (e) => {
          Object.keys(Gt.mediaExpression).forEach((t) => {
            window.matchMedia(Gt.mediaExpression[t]).addListener((t) =>
              ((e, t) => {
                e.matches && tn(t);
              })(t, e)
            );
          });
        };
      var rn = (e = document, t = !1) => {
        i() ||
          (((e, t) => {
            const n = e instanceof HTMLDocument ? `.root ${Kt}` : Kt,
              r = e.querySelectorAll(n);
            r.length > 0 && (tn({ videos: r, callback: Jt }), nn({ videos: r, callback: Jt }), t && window.addEventListener("scroll", $t(300, tn, { videos: r, callback: Jt })));
          })(e, t),
            ((e) => {
              const t = e.querySelectorAll(".video-Wrapper.has-playOnHover video");
              t.length > 0 && tn({ videos: t, callback: en });
            })(e));
      };
      const on = "data-custom-text",
        an = "hidden",
        sn = "is-invalid",
        ln = "is-open",
        cn = "error";
      class un {
        constructor(e) {
          e &&
            ((this.element = e),
              (this.button = this.element.querySelector(".sl-cta")),
              (this.phone = this.element.querySelector(".phone_number")),
              (this.wrapper = this.element.querySelector(".sendLink-wrapper")),
              (this.branchKey = this.wrapper.getAttribute("data-branch-key")),
              (this.sendLinkForm = this.element.querySelector(".sendlinkform")),
              (this.sendLinkSuccess = this.element.querySelector(".success")),
              (this.tooltip = this.element.querySelector(".spectrum-Tooltip")),
              (this.closeCta = this.element.querySelector(".close-cta")),
              (this.linkData = {
                $android_url: this.wrapper.getAttribute("data-android-redirect"),
                $custom_sms_text: null !== this.wrapper.getAttribute(on) ? this.wrapper.getAttribute(on).concat("{{link}}") : "",
                $ios_url: this.wrapper.getAttribute("data-ios-redirect"),
              }),
              (this.analyticsLink = this.wrapper.getAttribute("data-product-name")),
              this.setUpBranchAndBind(),
              (function () {
                try {
                  return window.parent.location.href.indexOf("/editor.html/") >= 0;
                } catch (e) {
                  return !1;
                }
              })() && this.element.parentElement.classList.add("sendlink-desktop-auto"));
        }
        openView() {
          this.sendLinkForm.classList.remove(an), this.sendLinkSuccess.classList.add(an), (this.phone.value = ""), this.phone.classList.remove(sn), this.tooltip.classList.remove(ln);
        }
        bindEvents() {
          this.button.addEventListener("click", () => {
            this.sendCustomAnalytics("send"), this.sendSMS();
          }),
            this.phone.addEventListener("click", () => {
              this.phone.classList.remove(sn), this.tooltip.classList.remove(ln);
            }),
            this.closeCta.addEventListener("click", () => {
              const e = this.wrapper.closest(".dexter-Modal");
              e && e.querySelector(".dexter-CloseButton") && e.querySelector(".dexter-CloseButton").click();
            });
        }
        defBranch() {
          !(function (e, t, n, r, o, a, i, s, l, c) {
            if (!e[r] || !e[r]._q) {
              for (; s < i.length;) o(a, i[s++]);
              ((l = t.createElement(n)).async = 1), (l.src = "https://cdn.branch.io/branch-latest.min.js"), (c = t.getElementsByTagName(n)[0]).parentNode.insertBefore(l, c), (e[r] = a);
            }
          })(
            window,
            document,
            "script",
            "branch",
            function (e, t) {
              e[t] = function () {
                e._q.push([t, arguments]);
              };
            },
            { _q: [], _v: 1 },
            "addListener applyCode autoAppIndex banner closeBanner closeJourney creditHistory credits data deepview deepviewCta first getCode init link logout redeem referrals removeListener sendSMS setBranchViewData setIdentity track validateCode trackCommerceEvent logEvent disableTracking".split(
              " "
            ),
            0
          );
        }
        setUpBranchAndBind() {
          this.branchKey && !window.branchPromise && (this.defBranch(), this.initBranch()),
            window.branchPromise &&
            window.branchPromise
              .catch(() => {
                this.initBranch({ doBind: !1 });
              })
              .finally(() => {
                this.bindEvents();
              });
        }
        initBranch({ doBind: e = !0 } = {}) {
          const t = !!window.adobePrivacy && window.adobePrivacy.hasUserProvidedConsent();
          window.branch.init(this.branchKey, { tracking_disabled: !t }, () => {
            e && this.bindEvents();
          });
        }
        populateMessage(e) {
          e ? (this.phone.classList.add(sn), this.tooltip.classList.add(ln), this.sendCustomAnalytics(cn)) : (this.sendLinkForm.classList.add(an), this.sendLinkSuccess.classList.remove(an), this.sendCustomAnalytics("success"));
        }
        sendSMS() {
          void 0 !== window.branch
            ? window.branch.sendSMS(this.phone.value, { channel: "Adobe.com", feature: "Text-Me-The-App", data: this.linkData }, { make_new_link: !1 }, this.populateMessage.bind(this))
            : (this.phone.classList.add(sn), this.tooltip.classList.add(ln), this.sendCustomAnalytics(cn));
        }
        sendCustomAnalytics(e) {
          window.digitalData &&
            window._satellite &&
            null !== this.analyticsLink &&
            (window.digitalData._set("primaryEvent.eventInfo.eventName", `branch:${this.analyticsLink}:text_app_link:${e}`),
              window.digitalData._set("primaryEvent.eventInfo.interaction.click", `branch:${this.analyticsLink}:text_app_link:${e}`),
              window._satellite.track("event", { digitalData: window.digitalData._snapshot() }));
        }
      }
      var dn =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
            return typeof e;
          }
          : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
          };
      /*!
       * tabbable 5.2.0
       * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
       */
      var fn = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])', "details>summary:first-of-type", "details"],
        pn = fn.join(","),
        mn = "undefined" == typeof Element ? function () { } : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector,
        hn = function (e, t, n) {
          var r = Array.prototype.slice.apply(e.querySelectorAll(pn));
          return t && mn.call(e, pn) && r.unshift(e), (r = r.filter(n));
        },
        yn = function (e) {
          var t = parseInt(e.getAttribute("tabindex"), 10);
          return isNaN(t)
            ? (function (e) {
              return "true" === e.contentEditable;
            })(e)
              ? 0
              : ("AUDIO" !== e.nodeName && "VIDEO" !== e.nodeName && "DETAILS" !== e.nodeName) || null !== e.getAttribute("tabindex")
                ? e.tabIndex
                : 0
            : t;
        },
        gn = function (e, t) {
          return e.tabIndex === t.tabIndex ? e.documentOrder - t.documentOrder : e.tabIndex - t.tabIndex;
        },
        vn = function (e) {
          return "INPUT" === e.tagName;
        },
        bn = function (e) {
          return (
            (function (e) {
              return vn(e) && "radio" === e.type;
            })(e) &&
            !(function (e) {
              if (!e.name) return !0;
              var t,
                n = e.form || e.ownerDocument,
                r = function (e) {
                  return n.querySelectorAll('input[type="radio"][name="' + e + '"]');
                };
              if ("undefined" != typeof window && void 0 !== window.CSS && "function" == typeof window.CSS.escape) t = r(window.CSS.escape(e.name));
              else
                try {
                  t = r(e.name);
                } catch (e) {
                  return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", e.message), !1;
                }
              var o = (function (e, t) {
                for (var n = 0; n < e.length; n++) if (e[n].checked && e[n].form === t) return e[n];
              })(t, e.form);
              return !o || o === e;
            })(e)
          );
        },
        wn = function (e, t) {
          return !(
            t.disabled ||
            (function (e) {
              return vn(e) && "hidden" === e.type;
            })(t) ||
            (function (e, t) {
              if ("hidden" === getComputedStyle(e).visibility) return !0;
              var n = mn.call(e, "details>summary:first-of-type") ? e.parentElement : e;
              if (mn.call(n, "details:not([open]) *")) return !0;
              if (t && "full" !== t) {
                if ("non-zero-area" === t) {
                  var r = e.getBoundingClientRect(),
                    o = r.width,
                    a = r.height;
                  return 0 === o && 0 === a;
                }
              } else
                for (; e;) {
                  if ("none" === getComputedStyle(e).display) return !0;
                  e = e.parentElement;
                }
              return !1;
            })(t, e.displayCheck) ||
            (function (e) {
              return (
                "DETAILS" === e.tagName &&
                Array.prototype.slice.apply(e.children).some(function (e) {
                  return "SUMMARY" === e.tagName;
                })
              );
            })(t)
          );
        },
        Cn = function (e, t) {
          return !(!wn(e, t) || bn(t) || yn(t) < 0);
        },
        kn = fn.concat("iframe").join(","),
        En = function (e, t) {
          if (((t = t || {}), !e)) throw new Error("No node provided");
          return !1 !== mn.call(e, kn) && wn(t, e);
        };
      /*!
       * focus-trap 6.6.0
       * @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
       */
      function Tn(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      function xn(e, t, n) {
        return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
      }
      var Sn,
        On =
          ((Sn = []),
          {
            activateTrap: function (e) {
              if (Sn.length > 0) {
                var t = Sn[Sn.length - 1];
                t !== e && t.pause();
              }
              var n = Sn.indexOf(e);
              -1 === n || Sn.splice(n, 1), Sn.push(e);
            },
            deactivateTrap: function (e) {
              var t = Sn.indexOf(e);
              -1 !== t && Sn.splice(t, 1), Sn.length > 0 && Sn[Sn.length - 1].unpause();
            },
          }),
        Pn = function (e) {
          return setTimeout(e, 0);
        },
        An = function (e, t) {
          var n = -1;
          return (
            e.every(function (e, r) {
              return !t(e) || ((n = r), !1);
            }),
            n
          );
        },
        Fn = function (e) {
          for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
          return "function" == typeof e ? e.apply(void 0, n) : e;
        },
        In = function (e, t) {
          var n,
            r = document,
            o = (function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2
                  ? Tn(Object(n), !0).forEach(function (t) {
                    xn(e, t, n[t]);
                  })
                  : Object.getOwnPropertyDescriptors
                    ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                    : Tn(Object(n)).forEach(function (t) {
                      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                    });
              }
              return e;
            })({ returnFocusOnDeactivate: !0, escapeDeactivates: !0, delayInitialFocus: !0 }, t),
            a = { containers: [], tabbableGroups: [], nodeFocusedBeforeActivation: null, mostRecentlyFocusedNode: null, active: !1, paused: !1, delayInitialFocusTimer: void 0 },
            i = function (e, t, n) {
              return e && void 0 !== e[t] ? e[t] : o[n || t];
            },
            s = function (e) {
              return a.containers.some(function (t) {
                return t.contains(e);
              });
            },
            l = function (e) {
              var t = o[e];
              if (!t) return null;
              var n = t;
              if ("string" == typeof t && !(n = r.querySelector(t))) throw new Error("`".concat(e, "` refers to no known node"));
              if ("function" == typeof t && !(n = t())) throw new Error("`".concat(e, "` did not return a node"));
              return n;
            },
            c = function () {
              var e;
              if (!1 === i({}, "initialFocus")) return !1;
              if (null !== l("initialFocus")) e = l("initialFocus");
              else if (s(r.activeElement)) e = r.activeElement;
              else {
                var t = a.tabbableGroups[0];
                e = (t && t.firstTabbableNode) || l("fallbackFocus");
              }
              if (!e) throw new Error("Your focus-trap needs to have at least one focusable element");
              return e;
            },
            u = function () {
              if (
                ((a.tabbableGroups = a.containers
                  .map(function (e) {
                    var t = (function (e, t) {
                      var n = [],
                        r = [];
                      hn(e, (t = t || {}).includeContainer, Cn.bind(null, t)).forEach(function (e, t) {
                        var o = yn(e);
                        0 === o ? n.push(e) : r.push({ documentOrder: t, tabIndex: o, node: e });
                      });
                      var o = r
                        .sort(gn)
                        .map(function (e) {
                          return e.node;
                        })
                        .concat(n);
                      return o;
                    })(e);
                    if (t.length > 0) return { container: e, firstTabbableNode: t[0], lastTabbableNode: t[t.length - 1] };
                  })
                  .filter(function (e) {
                    return !!e;
                  })),
                  a.tabbableGroups.length <= 0 && !l("fallbackFocus"))
              )
                throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
            },
            d = function e(t) {
              !1 !== t &&
                t !== r.activeElement &&
                (t && t.focus
                  ? (t.focus({ preventScroll: !!o.preventScroll }),
                    (a.mostRecentlyFocusedNode = t),
                    (function (e) {
                      return e.tagName && "input" === e.tagName.toLowerCase() && "function" == typeof e.select;
                    })(t) && t.select())
                  : e(c()));
            },
            f = function (e) {
              var t = l("setReturnFocus");
              return t || e;
            },
            p = function (e) {
              s(e.target) || (Fn(o.clickOutsideDeactivates, e) ? n.deactivate({ returnFocus: o.returnFocusOnDeactivate && !En(e.target) }) : Fn(o.allowOutsideClick, e) || e.preventDefault());
            },
            m = function (e) {
              var t = s(e.target);
              t || e.target instanceof Document ? t && (a.mostRecentlyFocusedNode = e.target) : (e.stopImmediatePropagation(), d(a.mostRecentlyFocusedNode || c()));
            },
            h = function (e) {
              if (
                (function (e) {
                  return "Escape" === e.key || "Esc" === e.key || 27 === e.keyCode;
                })(e) &&
                !1 !== Fn(o.escapeDeactivates)
              )
                return e.preventDefault(), void n.deactivate();
              (function (e) {
                return "Tab" === e.key || 9 === e.keyCode;
              })(e) &&
                (function (e) {
                  u();
                  var t = null;
                  if (a.tabbableGroups.length > 0) {
                    var n = An(a.tabbableGroups, function (t) {
                      return t.container.contains(e.target);
                    });
                    if (n < 0) t = e.shiftKey ? a.tabbableGroups[a.tabbableGroups.length - 1].lastTabbableNode : a.tabbableGroups[0].firstTabbableNode;
                    else if (e.shiftKey) {
                      var r = An(a.tabbableGroups, function (t) {
                        var n = t.firstTabbableNode;
                        return e.target === n;
                      });
                      if ((r < 0 && a.tabbableGroups[n].container === e.target && (r = n), r >= 0)) {
                        var o = 0 === r ? a.tabbableGroups.length - 1 : r - 1;
                        t = a.tabbableGroups[o].lastTabbableNode;
                      }
                    } else {
                      var i = An(a.tabbableGroups, function (t) {
                        var n = t.lastTabbableNode;
                        return e.target === n;
                      });
                      if ((i < 0 && a.tabbableGroups[n].container === e.target && (i = n), i >= 0)) {
                        var s = i === a.tabbableGroups.length - 1 ? 0 : i + 1;
                        t = a.tabbableGroups[s].firstTabbableNode;
                      }
                    }
                  } else t = l("fallbackFocus");
                  t && (e.preventDefault(), d(t));
                })(e);
            },
            y = function (e) {
              Fn(o.clickOutsideDeactivates, e) || s(e.target) || Fn(o.allowOutsideClick, e) || (e.preventDefault(), e.stopImmediatePropagation());
            },
            g = function () {
              if (a.active)
                return (
                  On.activateTrap(n),
                  (a.delayInitialFocusTimer = o.delayInitialFocus
                    ? Pn(function () {
                      d(c());
                    })
                    : d(c())),
                  r.addEventListener("focusin", m, !0),
                  r.addEventListener("mousedown", p, { capture: !0, passive: !1 }),
                  r.addEventListener("touchstart", p, { capture: !0, passive: !1 }),
                  r.addEventListener("click", y, { capture: !0, passive: !1 }),
                  r.addEventListener("keydown", h, { capture: !0, passive: !1 }),
                  n
                );
            },
            v = function () {
              if (a.active)
                return (
                  r.removeEventListener("focusin", m, !0),
                  r.removeEventListener("mousedown", p, !0),
                  r.removeEventListener("touchstart", p, !0),
                  r.removeEventListener("click", y, !0),
                  r.removeEventListener("keydown", h, !0),
                  n
                );
            };
          return (
            (n = {
              activate: function (e) {
                if (a.active) return this;
                var t = i(e, "onActivate"),
                  n = i(e, "onPostActivate"),
                  o = i(e, "checkCanFocusTrap");
                o || u(), (a.active = !0), (a.paused = !1), (a.nodeFocusedBeforeActivation = r.activeElement), t && t();
                var s = function () {
                  o && u(), g(), n && n();
                };
                return o ? (o(a.containers.concat()).then(s, s), this) : (s(), this);
              },
              deactivate: function (e) {
                if (!a.active) return this;
                clearTimeout(a.delayInitialFocusTimer), (a.delayInitialFocusTimer = void 0), v(), (a.active = !1), (a.paused = !1), On.deactivateTrap(n);
                var t = i(e, "onDeactivate"),
                  r = i(e, "onPostDeactivate"),
                  o = i(e, "checkCanReturnFocus");
                t && t();
                var s = i(e, "returnFocus", "returnFocusOnDeactivate"),
                  l = function () {
                    Pn(function () {
                      s && d(f(a.nodeFocusedBeforeActivation)), r && r();
                    });
                  };
                return s && o ? (o(f(a.nodeFocusedBeforeActivation)).then(l, l), this) : (l(), this);
              },
              pause: function () {
                return a.paused || !a.active || ((a.paused = !0), v()), this;
              },
              unpause: function () {
                return a.paused && a.active ? ((a.paused = !1), u(), g(), this) : this;
              },
              updateContainerElements: function (e) {
                var t = [].concat(e).filter(Boolean);
                return (
                  (a.containers = t.map(function (e) {
                    return "string" == typeof e ? r.querySelector(e) : e;
                  })),
                  a.active && u(),
                  this
                );
              },
            }).updateContainerElements(e),
            n
          );
        };
      const Nn = "u-noScroll",
        Ln = ".dexter-Modal_overlay.is-Open",
        Rn =
          "desktop" ===
          (function (e, t) {
            if ("object" === (void 0 === e ? "undefined" : dn(e)) && "string" == typeof t && null !== e && Object.keys(e).length && t.length) {
              for (var n = t.split("."), r = n.length, o = e, a = 0; a < r; a += 1) {
                if (null == o || Number.isNaN(o)) return a === r ? o : void 0;
                if (!Object.prototype.hasOwnProperty.call(o, n[a])) return;
                o = o[n[a]];
              }
              return o;
            }
          })(window, "dexter.personalization.technology.platform.type"),
        _n = () => {
          const e = document.elementFromPoint(0, 0);
          return e ? e.closest(Ln) : null;
        },
        Dn = () => {
          const e = _n(),
            t =
              ((window.dexter.utils = window.dexter.utils || {}),
                window.dexter.utils.modalFocusTrap ||
                (window.dexter.utils.modalFocusTrap = In(Ln, {
                  escapeDeactivates: !1,
                  clickOutsideDeactivates: !1,
                  preventScroll: !1,
                  allowOutsideClick: !0,
                  returnFocusOnDeactivate: !1,
                  onActivate: () => {
                    Rn && document.body.classList.add(Nn);
                    const e = _n(),
                      t = () => {
                        if ((e.removeEventListener("focusin", t), !document.activeElement || !document.activeElement.classList.contains("dexter-CloseButton"))) return;
                        const n = e.querySelector(".dexter-Modal > .aem-Grid");
                        n && (n.tabIndex = "0");
                      };
                    e.addEventListener("focusin", t);
                  },
                  onDeactivate: () => {
                    Rn && document.body.classList.remove(Nn);
                  },
                  fallbackFocus: document.body,
                })),
                window.dexter.utils.modalFocusTrap);
          t.deactivate(), e && e.enableFocusTrap && (t.updateContainerElements(e), t.activate());
        },
        Bn = "data-remember-close-action",
        Mn = "is-Open",
        jn = () => window.location.href.replace(window.location.hash, "");
      class qn {
        constructor(e, t = {}) {
          (this.callbacks = t),
            (this.element = e),
            (this.isHashChangeModal() || e.parentElement.style.getPropertyValue("background-color")) && ((e.parentElement.enableFocusTrap = !0), this.getOverlay(), this.setupOverlayClick()),
            (this.isLocaleModal = "localeModal" === this.element.id),
            this.setupCloseClick(),
            this.isPageLoadModal() && (this.pageLoadDisplayed = !1);
        }
        isCloseEnabledRepeatUser() {
          const e = window.localStorage.getItem(this.getUserStorageValue());
          return this.closeButton.hasAttribute(Bn) && JSON.parse(e);
        }
        isPageLoadModal() {
          return "onPageLoad" === this.getDisplayType();
        }
        isHashChangeModal() {
          return "onHashChange" === this.getDisplayType();
        }
        getDisplayType() {
          return this.element.parentElement ? this.element.parentElement.dataset.confDisplay : {};
        }
        getId() {
          return this.element.id;
        }
        getDelay() {
          const e = this.element.parentElement.dataset.confDelay;
          return parseInt(e, 10);
        }
        getPageName() {
          return this.element.parentElement.dataset.pageName;
        }
        getUserStorageValue() {
          const e = this.getPageName();
          return this.closeButton.dataset.rememberCloseName || this.getId().concat("_", e);
        }
        setupCloseClick() {
          this.closeButton = this.element.querySelector(".dexter-CloseButton");
          this.closeButton.addEventListener("click", (e) => {
            e.stopPropagation(),
              e.preventDefault(),
              this.closeButton.hasAttribute(Bn) && window.localStorage.setItem(this.getUserStorageValue(), !0),
              "function" == typeof this.callbacks.buttonClose && this.callbacks.buttonClose(),
              this.close();
          });
        }
        sendCloseAnalytics() {
          window.digitalData &&
            window._satellite &&
            (window.digitalData._set("primaryEvent.eventInfo.eventName", window.digitalData._get("digitalData.page.pageInfo.pageName").concat(":tryFreeCloseClick", this.getId())),
              window._satellite.track("event", { digitalData: window.digitalData._snapshot() }));
        }
        getOverlay() {
          this.modalOverlay = this.element.parentElement;
        }
        getIframes() {
          if (!this.iframes || 0 === this.iframes.length) {
            const e = this.element.querySelectorAll(".frame-container iframe");
            this.iframes = Array.from(e, (e) => new jt(e));
          }
        }
        getSendLink() {
          if (!this.sendLink || 0 === this.sendLink.length) {
            const e = this.element.querySelector(".sendLink");
            e && (this.sendLink = new un(e));
          }
        }
        setupOverlayClick() {
          this.isPageLoadModal() && (this.modalOverlay.style.pointerEvents = "auto");
          this.modalOverlay.addEventListener("click", (e) => {
            e.target.classList.contains("dexter-Modal_overlay") && (e.stopPropagation(), e.preventDefault(), "function" == typeof this.callbacks.overlayClose && this.callbacks.overlayClose(), this.close());
          });
        }
        open(e, t, n) {
          (this.openHistoryLength = window.history.length),
            (this.isOpen = !0),
            (this.isDeepLinked = !!n),
            t && ((this.focusState = t), (this.focusState.modalOpen = !0)),
            (this.lastScrollPosition = window.scrollY),
            (this.previousHashValue = e && e.replace("#", "")),
            this.modalOverlay && this.modalOverlay.classList.add(Mn),
            this.element.parentElement.classList.add(Mn),
            this.element.classList.add(Mn),
            this.getVideos(),
            this.videos.forEach((e) => {
              e.setSrc();
            }),
            this.getIframes();
          const r = () => {
            const e = this.element.querySelector("iframe");
            e && e.focus();
          };
          this.iframes.forEach((e) => {
            (e.element.onload = r), e.setSrc();
          }),
            this.getSendLink(),
            this.sendLink && this.sendLink.openView(),
            rn(this.element, !1),
            (this.closeEscapeListener = this.setupCloseEscape()),
            _n() === this.element.parentElement && Dn(),
            "function" == typeof this.callbacks.onOpen && this.callbacks.onOpen();
        }
        getVideos() {
          if (!this.videos || 0 === this.videos.length) {
            const e = this.element.querySelectorAll(".videoContainer iframe");
            this.videos = Array.from(e, (e) => new Mt(e));
          }
        }
        close({ modifyHistory: e = !0 } = {}) {
          if (
            (this.focusState && (this.focusState.modalOpen = !1),
              this.closeEscapeListener && (this.closeEscapeListener(), delete this.closeEscapeListener),
              this.videos &&
              this.videos.length &&
              this.videos.forEach((e) => {
                e.removeSrc();
              }),
              this.modalOverlay && this.modalOverlay.classList.remove(Mn),
              this.iframes &&
              this.iframes.length &&
              this.iframes.forEach((e) => {
                e.removeSrc();
              }),
              this.element.classList.remove(Mn),
              this.resetFocus(),
              "function" == typeof this.callbacks.close && this.callbacks.close(),
              (this.isOpen = !1),
              this.isPageLoadModal())
          )
            Dn();
          else {
            if (!this.isLocaleModal) {
              if (this.isDeepLinked) return (window.location.hash = ""), void Dn();
              const t = window.location.hash;
              if (
                (this.previousHashValue && this.previousHashValue !== this.getId() ? window.history.replaceState(null, null, `${jn()}#${this.previousHashValue}`) : window.history.replaceState(null, null, jn()),
                  e && t !== this.deepLinkedModalId)
              ) {
                const e = window.history.length - this.openHistoryLength + 1;
                window.history.go(-e);
              }
            }
            Dn(), this.sendCloseAnalytics();
          }
        }
        resetFocus() {
          try {
            window.scrollTo(0, this.lastScrollPosition), this.focusState.lastFocusedElement.focus();
          } catch (e) { }
        }
        setupCloseEscape() {
          const e = (t) => {
            let n = !1;
            (n = "key" in t ? "Escape" === t.key || "Esc" === t.key : 27 === t.keyCode), n && ("function" == typeof this.callbacks.escClose && this.callbacks.escClose(), document.removeEventListener("keydown", e), this.close());
          };
          return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e);
        }
      }
      function Un(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function Hn(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var n = null == e ? null : ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
            if (null != n) {
              var r,
                o,
                a = [],
                i = !0,
                s = !1;
              try {
                for (n = n.call(e); !(i = (r = n.next()).done) && (a.push(r.value), !t || a.length !== t); i = !0);
              } catch (e) {
                (s = !0), (o = e);
              } finally {
                try {
                  i || null == n.return || n.return();
                } finally {
                  if (s) throw o;
                }
              }
              return a;
            }
          })(e, t) ||
          (function (e, t) {
            if (!e) return;
            if ("string" == typeof e) return Un(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(n);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Un(e, t);
          })(e, t) ||
          (function () {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          })()
        );
      }
      var Wn = function (n) {
        var o = n.name,
          a = n.videoURL,
          i = n.gateVideo,
          s = n.className,
          l = n.videoPolicy,
          c = document.querySelector(".modalContainer"),
          u = (0, e.useRef)(null),
          d = Hn((0, e.useState)(!1), 2),
          f = d[0],
          p = d[1],
          m = /^#[a-zA-Z0-9_-]+/.test(a),
          h = /https?:\/\/[a-zA-Z0-9_-]+/.test(a),
          y = function () {
            p(!1);
          },
          g = function () {
            p(!1);
          };
        return (
          (0, e.useEffect)(
            function () {
              f && u && u.current && new qn(u.current, { buttonClose: y, overlayClose: g }).open();
            },
            [f, u]
          ),
          t().createElement(
            e.Fragment,
            null,
            t().createElement("button", {
              className: s,
              "daa-ll": "play",
              onClick: function () {
                m ? (window.location.hash = new URL(a, document.baseURI).hash) : h && i ? window.open(a, "_blank") : p(!0);
              },
            }),
            f && (0, r.createPortal)(t().createElement(Bt, { name: o, videoURL: a, innerRef: u, videoPolicy: l }), c)
          )
        );
      };
      (Wn.propTypes = { name: c.string, videoPolicy: c.string, videoURL: c.string.isRequired, gateVideo: c.bool, className: c.string.isRequired }),
        (Wn.defaultProps = { name: "video-modal", videoPolicy: "autoplay; fullscreen", gateVideo: !1 });
      var zn = (0, e.memo)(Wn);
      function Vn(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function Qn(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var n = null == e ? null : ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
            if (null != n) {
              var r,
                o,
                a = [],
                i = !0,
                s = !1;
              try {
                for (n = n.call(e); !(i = (r = n.next()).done) && (a.push(r.value), !t || a.length !== t); i = !0);
              } catch (e) {
                (s = !0), (o = e);
              } finally {
                try {
                  i || null == n.return || n.return();
                } finally {
                  if (s) throw o;
                }
              }
              return a;
            }
          })(e, t) ||
          (function (e, t) {
            if (!e) return;
            if ("string" == typeof e) return Vn(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(n);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Vn(e, t);
          })(e, t) ||
          (function () {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          })()
        );
      }
      var Gn = {
        ctaLink: c.string,
        id: c.string.isRequired,
        lh: c.string,
        styles: (0, c.shape)(Ge),
        overlays: (0, c.shape)(Ke),
        contentArea: (0, c.shape)($e),
        renderBorder: c.bool,
        renderOverlay: c.bool,
        overlayLink: c.string,
        startDate: c.string,
        endDate: c.string,
        bannerMap: (0, c.shape)(Object).isRequired,
      },
        $n = function (e) {
          var n = e.id,
            r = e.lh,
            o = e.ctaLink,
            a = e.styles,
            i = a.backgroundImage,
            s = a.backgroundAltText,
            c = e.contentArea,
            u = c.title,
            d = c.detailText,
            f = e.overlays,
            p = f.banner,
            m = p.description,
            h = p.fontColor,
            y = p.backgroundColor,
            g = p.icon,
            v = f.videoButton.url,
            b = f.logo,
            w = b.src,
            C = b.alt,
            k = b.backgroundColor,
            E = b.borderColor,
            T = f.label.description,
            x = e.renderBorder,
            S = e.renderOverlay,
            O = e.overlayLink,
            P = e.startDate,
            A = e.endDate,
            F = e.bannerMap,
            I = y,
            L = g,
            _ = h,
            D = m,
            B = Re()("collection", "disableBanners"),
            M = l()({ "consonant-Card": !0, "consonant-FullCard": !0, "consonant-u-noBorders": !x }),
            j = t().useRef(),
            q = Qn(_e(j, i), 1)[0];
          if (P && A) {
            var U = N(P, A, F);
            (I = U.backgroundColor), (D = U.description), (_ = U.fontColor), (L = U.icon);
          }
          var H = R(o),
            W = R(O);
          return t().createElement(
            "div",
            { className: M, "data-testid": "consonant-FullCard", "daa-lh": r, id: n },
            S && t().createElement(_t, { target: W, link: O }),
            t().createElement(
              "div",
              { "data-testid": "consonant-FullCard-img", className: "consonant-FullCard-img", ref: j, style: { backgroundImage: q && 'url("'.concat(q, '")') }, role: s && "img", "aria-label": s },
              D &&
              _ &&
              I &&
              !B &&
              t().createElement(
                "span",
                { "data-testid": "consonant-FullCard-banner", className: "consonant-FullCard-banner", style: { backgroundColor: I, color: _ } },
                L && t().createElement("div", { className: "consonant-FullCard-bannerIconWrapper" }, t().createElement("img", { alt: "", loading: "lazy", "data-testid": "consonant-Card-bannerImg", src: L })),
                t().createElement("span", null, D)
              ),
              T && t().createElement("span", { className: "consonant-FullCard-badge" }, T),
              v && t().createElement(zn, { videoURL: v, className: "consonant-FullCard-videoIco" }),
              w && t().createElement("div", { style: { backgroundColor: k, borderColor: E }, className: "consonant-FullCard-logo" }, t().createElement("img", { src: w, alt: C, loading: "lazy", width: "32" }))
            ),
            t().createElement(
              "a",
              { href: o, target: H, "daa-ll": "Card CTA", "aria-label": u, rel: "noopener noreferrer", title: "", className: "consonant-FullCard-inner", tabIndex: "0" },
              d && t().createElement("span", { className: "consonant-FullCard-label" }, d),
              t().createElement("h2", { className: "consonant-FullCard-title" }, u)
            )
          );
        };
      ($n.propTypes = Gn), ($n.defaultProps = { styles: {}, lh: "", ctaLink: "", overlays: {}, contentArea: {}, renderBorder: !0, renderOverlay: !1, overlayLink: "", startDate: "", endDate: "" });
      var Kn = $n,
        Xn = function (e, t, n, r) {
          return r
            .replace("{LLL}", ((o = e), (a = n), new Date(o).toLocaleDateString(a, { month: "short" })))
            .replace(
              "{dd}",
              (function (e, t) {
                return new Date(e).toLocaleDateString(t, { day: "2-digit" });
              })(e, n)
            )
            .replace(
              "{ddd}",
              (function (e, t) {
                return new Date(e).toLocaleDateString(t, { weekday: "short" });
              })(e, n)
            )
            .replace(
              "{timeRange}",
              (function (e, t, n) {
                var r = { hour: "2-digit", minute: "2-digit" },
                  o = new Date(e).toLocaleTimeString(n, r),
                  a = new Date(t).toLocaleTimeString(n, r);
                return "".concat(o, " - ").concat(a);
              })(e, t, n)
            )
            .replace(
              "{timeZone}",
              (function (e, t) {
                return new Date(e).toLocaleTimeString(t, { timeZoneName: "short" }).split(" ").slice(-1)[0];
              })(e, n)
            );
          var o, a;
        };
      function Yn(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function Zn(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var n = null == e ? null : ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
            if (null != n) {
              var r,
                o,
                a = [],
                i = !0,
                s = !1;
              try {
                for (n = n.call(e); !(i = (r = n.next()).done) && (a.push(r.value), !t || a.length !== t); i = !0);
              } catch (e) {
                (s = !0), (o = e);
              } finally {
                try {
                  i || null == n.return || n.return();
                } finally {
                  if (s) throw o;
                }
              }
              return a;
            }
          })(e, t) ||
          (function (e, t) {
            if (!e) return;
            if ("string" == typeof e) return Yn(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(n);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Yn(e, t);
          })(e, t) ||
          (function () {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          })()
        );
      }
      var Jn = {
        ctaLink: c.string,
        id: c.string.isRequired,
        lh: c.string,
        styles: (0, c.shape)(Ge),
        overlays: (0, c.shape)(Ke),
        contentArea: (0, c.shape)($e),
        renderBorder: c.bool,
        renderOverlay: c.bool,
        overlayLink: c.string,
        startDate: c.string,
        endDate: c.string,
        bannerMap: (0, c.shape)(Object).isRequired,
      },
        er = function (e) {
          var n = e.id,
            r = e.ctaLink,
            o = e.lh,
            a = e.styles,
            i = a.backgroundImage,
            s = a.backgroundAltText,
            c = e.contentArea,
            u = c.title,
            d = c.description,
            f = c.detailText,
            p = c.dateDetailText,
            m = p.startTime,
            h = p.endTime,
            y = e.overlays,
            g = y.banner,
            v = g.description,
            b = g.fontColor,
            w = g.backgroundColor,
            C = g.icon,
            k = y.videoButton.url,
            E = y.logo,
            T = E.src,
            x = E.alt,
            S = E.backgroundColor,
            O = E.borderColor,
            P = y.label.description,
            A = e.renderBorder,
            F = e.renderOverlay,
            I = e.overlayLink,
            L = e.startDate,
            _ = e.endDate,
            D = e.bannerMap,
            B = w,
            M = C,
            j = b,
            q = v,
            U = Re(),
            H = U("collection", "i18n.prettyDateIntervalFormat"),
            W = U("language", ""),
            z = U("collection", "disableBanners"),
            V = l()({ "consonant-Card": !0, "consonant-ThreeFourthCard": !0, "consonant-u-noBorders": !A }),
            Q = t().useRef(),
            G = Zn(_e(Q, i), 1)[0],
            $ = (m ? Xn(m, h, W, H) : "") || f;
          if (L && _) {
            var K = N(L, _, D);
            (B = K.backgroundColor), (q = K.description), (j = K.fontColor), (M = K.icon);
          }
          var X = R(r),
            Y = R(I);
          return t().createElement(
            "div",
            { className: V, "daa-lh": o, "data-testid": "consonant-ThreeFourthCard", id: n },
            F && t().createElement(_t, { target: Y, link: I }),
            t().createElement(
              "div",
              { "data-testid": "consonant-ThreeFourthCard-img", className: "consonant-ThreeFourthCard-img", ref: Q, style: { backgroundImage: G && 'url("'.concat(G, '")') }, role: s && "img", "aria-label": s },
              q &&
              j &&
              B &&
              !z &&
              t().createElement(
                "span",
                { "data-testid": "consonant-ThreeFourthCard-banner", className: "consonant-ThreeFourthCard-banner", style: { backgroundColor: B, color: j } },
                M && t().createElement("div", { className: "consonant-ThreeFourthCard-bannerIconWrapper" }, t().createElement("img", { alt: "", loading: "lazy", src: M, "data-testid": "consonant-Card-bannerImg" })),
                t().createElement("span", null, q)
              ),
              P && t().createElement("span", { className: "consonant-ThreeFourthCard-badge" }, P),
              k && t().createElement(zn, { videoURL: k, className: "consonant-ThreeFourthCard-videoIco" }),
              T && t().createElement("div", { style: { backgroundColor: S, borderColor: O }, className: "consonant-ThreeFourthCard-logo" }, t().createElement("img", { src: T, alt: x, loading: "lazy", width: "32" }))
            ),
            t().createElement(
              "a",
              { href: r, target: X, "daa-ll": "Card CTA", "aria-label": u, rel: "noopener noreferrer", title: "Click to open in a new tab", className: "consonant-ThreeFourthCard-inner", tabIndex: "0" },
              $ && t().createElement("span", { "data-testid": "consonant-ThreeFourthCard-label", className: "consonant-ThreeFourthCard-label" }, $),
              u && t().createElement("h2", { className: "consonant-ThreeFourthCard-title" }, u),
              d && t().createElement("p", { className: "consonant-ThreeFourthCard-text" }, d)
            )
          );
        };
      (er.propTypes = Jn), (er.defaultProps = { styles: {}, ctaLink: "", overlays: {}, contentArea: {}, lh: "", renderBorder: !0, renderOverlay: !1, overlayLink: "", startDate: "", endDate: "" });
      var tr = er,
        nr = n(830),
        rr = n.n(nr),
        or = { alt: c.string, src: c.string.isRequired },
        ar = function (e) {
          var n = e.src,
            r = e.alt;
          return t().createElement("img", { className: "consonant-IconInfobit", width: "28", src: n, alt: r, loading: "lazy" });
        };
      (ar.propTypes = or), (ar.defaultProps = { alt: "" });
      var ir = ar,
        sr = { text: c.string.isRequired },
        lr = function (e) {
          var n = e.text;
          return t().createElement("p", { className: "consonant-TextInfobit" }, n);
        };
      lr.propTypes = sr;
      var cr = lr,
        ur = { term: c.string, price: c.string.isRequired },
        dr = function (e) {
          var n = e.price,
            r = e.term;
          return t().createElement(
            "span",
            { className: "consonant-PriceInfobit" },
            t().createElement("strong", { className: "consonant-PriceInfobit-price" }, n),
            t().createElement("span", { className: "consonant-PriceInfobit-term" }, r)
          );
        };
      (dr.propTypes = ur), (dr.defaultProps = { term: "" });
      var fr = dr,
        pr = "primary",
        mr = "secondary",
        hr = "call-to-action",
        yr = { text: c.string, href: c.string, style: c.string, iconSrc: c.string, iconAlt: c.string, iconPos: c.string },
        gr = { href: "", text: "", iconSrc: "", iconAlt: "", iconPos: "", style: hr },
        vr = function (e) {
          var n = e.style,
            r = e.text,
            o = e.href,
            a = e.iconSrc,
            i = e.iconAlt,
            s = e.iconPos,
            c = Re()("collection", "button.style"),
            u = (n === hr && c !== pr) || (c === hr && n !== mr),
            d = l()({ "consonant-BtnInfobit": !0, "consonant-BtnInfobit--cta": u }),
            f = l()({ "consonant-BtnInfobit-ico": !0, "consonant-BtnInfobit-ico--last": "aftertext" === s.toLowerCase() }),
            p = R(o);
          return t().createElement(
            "a",
            { className: d, "daa-ll": r, "data-testid": "consonant-BtnInfobit", tabIndex: "0", rel: "noopener noreferrer", target: p, href: o },
            a && t().createElement("img", { "data-testid": "consonant-BtnInfobit-ico", src: a, width: "20", height: "20", className: f, alt: i, loading: "lazy" }),
            t().createElement("span", null, r)
          );
        };
      (vr.propTypes = yr), (vr.defaultProps = gr);
      var br = vr,
        wr = { linkHint: c.string, href: c.string.isRequired, text: c.string.isRequired },
        Cr = function (e) {
          var n = e.href,
            r = e.linkHint,
            o = e.text,
            a = R(n);
          return t().createElement("a", { className: "consonant-LinkInfobit", "data-testid": "consonant-LinkInfobit", href: n, target: a, title: r, rel: "noopener noreferrer", tabIndex: "0" }, o);
        };
      (Cr.propTypes = wr), (Cr.defaultProps = { linkHint: "" });
      var kr = Cr,
        Er = { label: c.string, totalStars: c.number, starsFilled: c.number },
        Tr = { label: "", totalStars: 5, starsFilled: 0 },
        xr = function (e) {
          var n = e.label,
            r = e.totalStars,
            o = e.starsFilled,
            a = l()({ "consonant-RatingInfobit": !0, "consonant-RatingInfobit--negMargin": !n }),
            i = (function (e, t) {
              (e < 0 || e > t) && (e = 0), (t <= 0 || t > 5) && (t = Number.MAX_SAFE_INTEGER);
              var n = e / t;
              return Math.round(100 * n);
            })(o, r);
          return t().createElement(
            "div",
            { className: a, "data-stars": r },
            t().createElement("span", { "data-testid": "consonant-RatingInfobit-stars", className: "consonant-RatingInfobit-stars", "data-rating": i }),
            n && t().createElement("span", { className: "consonant-RatingInfobit-text" }, n)
          );
        };
      (xr.propTypes = Er), (xr.defaultProps = Tr);
      var Sr = xr,
        Or = { label: c.string, color: c.string, percentage: c.string, completionText: c.string },
        Pr = function (e) {
          var n = e.label,
            r = e.completionText,
            o = e.percentage,
            a = e.color,
            i = { width: "calc(".concat(o, " + 2px)"), backgroundColor: a },
            s = parseInt(o, 10);
          return t().createElement(
            "div",
            { className: "consonant-ProgressInfobit" },
            t().createElement(
              "div",
              { className: "consonant-ProgressInfobit-wrapper" },
              t().createElement("span", { className: "consonant-ProgressInfobit-text", title: n }, n),
              t().createElement("span", { className: "consonant-ProgressInfobit-text consonant-ProgressInfobit-text--italic", title: r }, r)
            ),
            t().createElement(
              "div",
              { className: "consonant-ProgressInfobit-el" },
              t().createElement("span", { className: "consonant-ProgressInfobit-val", style: i, role: "progressbar", "aria-valuenow": s, "aria-valuemin": "0", "aria-valuemax": "100" }, o)
            )
          );
        };
      (Pr.propTypes = Or), (Pr.defaultProps = { label: "", percentage: "0", color: "#1473E6", completionText: "" });
      var Ar = Pr,
        Fr = { src: c.string, srcAltText: c.string, text: (0, c.oneOfType)([c.string, c.number]) },
        Ir = function (e) {
          var n = e.src,
            r = e.srcAltText,
            o = e.text;
          return t().createElement(
            "div",
            { className: "consonant-IconWithTextInfobit" },
            n && t().createElement("img", { src: n, height: "22", alt: r, loading: "lazy" }),
            t().createElement("span", { className: "consonant-IconWithTextInfobit-text" }, o)
          );
        };
      (Ir.propTypes = Fr), (Ir.defaultProps = { src: "", text: "", srcAltText: "" });
      var Nr = Ir,
        Lr = { src: c.string, href: c.string, text: c.string, linkHint: c.string, srcAltText: c.string, openInNewTab: (0, c.oneOfType)([c.string, c.bool]) },
        Rr = function (e) {
          var n = e.href,
            r = e.openInNewTab,
            o = e.linkHint,
            a = e.text,
            i = e.src,
            s = e.srcAltText;
          return t().createElement(
            "a",
            { href: n, "data-testid": "consonant-LinkWithIcoInfobit", target: r ? "_blank" : "_self", className: "consonant-LinkWithIcoInfobit", title: o, rel: "noopener noreferrer", tabIndex: "0" },
            i && t().createElement("img", { src: i, alt: s, loading: "lazy", height: "18" }),
            t().createElement("span", null, a)
          );
        };
      (Rr.propTypes = Lr), (Rr.defaultProps = { src: "", href: "", text: "", linkHint: "", srcAltText: "", openInNewTab: !0 });
      var _r = Rr,
        Dr = { locale: c.string.isRequired, endTime: c.string.isRequired, startTime: c.string.isRequired, dateFormat: c.string.isRequired },
        Br = function (e) {
          var n = e.startTime,
            r = e.endTime,
            o = e.locale,
            a = e.dateFormat,
            i = Xn(n, r, o, a);
          return t().createElement("span", { title: i, className: "consonant-DateIntervalInfobit" }, i);
        };
      Br.propTypes = Dr;
      var Mr = Br,
        jr = { text: c.string },
        qr = function (e) {
          var n = e.text;
          return t().createElement("span", { className: "consonant-Tooltip" }, n);
        };
      (qr.propTypes = jr), (qr.defaultProps = { text: "" });
      var Ur = qr,
        Hr = { isBookmarked: c.bool, saveCardIcon: c.string, unsaveCardIcon: c.string, onClick: c.func.isRequired, cardId: c.string.isRequired, disableBookmarkIco: c.bool.isRequired, isProductCard: c.bool },
        Wr = function (e) {
          var n,
            r = e.cardId,
            o = e.isBookmarked,
            a = e.saveCardIcon,
            i = e.unsaveCardIcon,
            s = e.onClick,
            c = e.disableBookmarkIco,
            u = e.isProductCard,
            d = Re(),
            f = d("bookmarks", "showOnCards"),
            p = d("bookmarks", "i18n.card.saveText"),
            m = d("bookmarks", "i18n.card.unsaveText"),
            h = l()({ "consonant-BookmarkInfobit": !0, "is-active": o, "is-disabled": c }),
            y = o ? m : p;
          return (
            !u &&
            f &&
            t().createElement(
              "button",
              {
                "data-testid": "consonant-BookmarkInfobit",
                "data-tooltip-wrapper": !0,
                type: "button",
                className: h,
                onClick: function (e) {
                  e.stopPropagation(), s(r);
                },
                tabIndex: "0",
              },
              f &&
              ((n = o ? a : i),
                t().createElement("span", { "data-testid": "consonant-BookmarkInfobit-ico", className: "consonant-BookmarkInfobit-ico", "daa-ll": "bookmark", style: { backgroundImage: n ? "url(".concat(n, ")") : "" } })),
              f && t().createElement(Ur, { "data-testid": "consonant-Tooltip", text: y })
            )
          );
        };
      (Wr.propTypes = Hr), (Wr.defaultProps = { saveCardIcon: "", unsaveCardIcon: "", isBookmarked: !1, isProductCard: !1 });
      var zr = Wr,
        Vr = function () {
          return t().createElement(
            "span",
            { className: "consonant-GatedInfobit" },
            t().createElement(
              "svg",
              { xmlns: "http://www.w3.org/2000/svg", height: "20", viewBox: "0 0 15 20", width: "15" },
              t().createElement("path", {
                fill: "#747474",
                d:
                  "M14.38,8.66h-0.62v-2.3c0.06-3.45-2.69-6.3-6.14-6.36c-3.45-0.06-6.3,2.69-6.36,6.14 c0,0.07,0,0.15,0,0.22v2.3H0.63C0.28,8.66,0,8.95,0,9.29c0,0,0,0,0,0v10.07C0,19.71,0.28,20,0.62,20c0,0,0,0,0,0h13.75 c0.35,0,0.63-0.29,0.62-0.63c0,0,0,0,0,0V9.29C15,8.95,14.72,8.66,14.38,8.66C14.38,8.66,14.38,8.66,14.38,8.66z M3.75,6.36 c0-2.07,1.68-3.75,3.75-3.75s3.75,1.68,3.75,3.75v2.3h-7.5V6.36z M8.75,15.09v1.76c0,0.35-0.28,0.63-0.62,0.63c0,0,0,0,0,0H6.88 c-0.35,0-0.63-0.29-0.62-0.63c0,0,0,0,0,0v-1.76c-0.58-0.53-0.78-1.36-0.5-2.09c0.36-0.97,1.43-1.46,2.4-1.1 c0.51,0.19,0.91,0.59,1.1,1.1C9.53,13.73,9.33,14.56,8.75,15.09z",
              })
            )
          );
        };
      function Qr() {
        return (
          (Qr =
            Object.assign ||
            function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
              }
              return e;
            }),
          Qr.apply(this, arguments)
        );
      }
      var Gr = { renderList: (0, c.arrayOf)((0, c.oneOfType)([(0, c.shape)(qe), (0, c.shape)(He), (0, c.shape)(Ue)])) },
        $r = function (n) {
          var r = n.renderList;
          return t().createElement(
            e.Fragment,
            null,
            r.map(function (e) {
              switch (e.type) {
                case W:
                  return t().createElement(fr, Qr({}, e, { key: rr()() }));
                case z:
                  return t().createElement(br, Qr({}, e, { key: rr()() }));
                case V:
                  return t().createElement(Nr, Qr({}, e, { key: rr()() }));
                case Q:
                  return t().createElement(_r, Qr({}, e, { key: rr()() }));
                case G:
                  return t().createElement(cr, Qr({}, e, { key: rr()() }));
                case $:
                  return t().createElement(ir, Qr({}, e, { key: rr()() }));
                case K:
                  return t().createElement(kr, Qr({}, e, { key: rr()() }));
                case X:
                  return t().createElement(Ar, Qr({}, e, { key: rr()() }));
                case Y:
                  return t().createElement(Sr, { key: rr()(), label: e.label, totalStars: C(e.totalStars), starsFilled: C(e.starsFilled) });
                case Z:
                  return t().createElement(zr, Qr({}, e, { key: rr()() }));
                case J:
                  return t().createElement(Mr, Qr({}, e, { key: rr()() }));
                case ee:
                  return t().createElement(Vr, Qr({}, e, { key: rr()() }));
                default:
                  return null;
              }
            })
          );
        };
      ($r.propTypes = Gr), ($r.defaultProps = { renderList: [] });
      var Kr = $r,
        Xr = function (e) {
          var n = e.divider,
            r = e.left,
            o = e.center,
            a = e.right,
            i = e.isFluid,
            s = l()({ "consonant-CardFooter": !0, "consonant-CardFooter--divider": n }),
            c = l()({ "consonant-CardFooter-row": !0, "consonant-CardFooter-row--fluid": i }),
            u = r.some(function (e) {
              return e.type === J;
            })
              ? 2
              : 1,
            d = r && r.length > 0,
            f = o && o.length > 0,
            p = a && a.length > 0;
          return t().createElement(
            "div",
            { className: s },
            t().createElement(
              "div",
              { className: c, "data-cells": u },
              d && t().createElement("div", { className: "consonant-CardFooter-cell consonant-CardFooter-cell--left" }, t().createElement(Kr, { renderList: r })),
              f && t().createElement("div", { className: "consonant-CardFooter-cell consonant-CardFooter-cell--center" }, t().createElement(Kr, { renderList: o })),
              p && t().createElement("div", { className: "consonant-CardFooter-cell consonant-CardFooter-cell--right" }, t().createElement(Kr, { renderList: a }))
            )
          );
        };
      (Xr.propTypes = Xe), (Xr.defaultProps = { left: [], center: [], right: [], divider: !1, isFluid: !1 });
      var Yr = Xr;
      function Zr(e) {
        for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
        throw Error(
          "[Immer] minified error nr: " +
          e +
          (n.length
            ? " " +
            n
              .map(function (e) {
                return "'" + e + "'";
              })
              .join(",")
            : "") +
          ". Find the full error at: https://bit.ly/3cXEKWf"
        );
      }
      function Jr(e) {
        return !!e && !!e[Wo];
      }
      function eo(e) {
        return (
          !!e &&
          ((function (e) {
            if (!e || "object" != typeof e) return !1;
            var t = Object.getPrototypeOf(e);
            return !t || t === Object.prototype;
          })(e) ||
            Array.isArray(e) ||
            !!e[Ho] ||
            !!e.constructor[Ho] ||
            so(e) ||
            lo(e))
        );
      }
      function to(e, t, n) {
        void 0 === n && (n = !1),
          0 === no(e)
            ? (n ? Object.keys : zo)(e).forEach(function (r) {
              (n && "symbol" == typeof r) || t(r, e[r], e);
            })
            : e.forEach(function (n, r) {
              return t(r, n, e);
            });
      }
      function no(e) {
        var t = e[Wo];
        return t ? (t.i > 3 ? t.i - 4 : t.i) : Array.isArray(e) ? 1 : so(e) ? 2 : lo(e) ? 3 : 0;
      }
      function ro(e, t) {
        return 2 === no(e) ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
      }
      function oo(e, t) {
        return 2 === no(e) ? e.get(t) : e[t];
      }
      function ao(e, t, n) {
        var r = no(e);
        2 === r ? e.set(t, n) : 3 === r ? (e.delete(t), e.add(n)) : (e[t] = n);
      }
      function io(e, t) {
        return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t;
      }
      function so(e) {
        return Mo && e instanceof Map;
      }
      function lo(e) {
        return jo && e instanceof Set;
      }
      function co(e) {
        return e.o || e.t;
      }
      function uo(e) {
        if (Array.isArray(e)) return Array.prototype.slice.call(e);
        var t = Vo(e);
        delete t[Wo];
        for (var n = zo(t), r = 0; r < n.length; r++) {
          var o = n[r],
            a = t[o];
          !1 === a.writable && ((a.writable = !0), (a.configurable = !0)), (a.get || a.set) && (t[o] = { configurable: !0, writable: !0, enumerable: a.enumerable, value: e[o] });
        }
        return Object.create(Object.getPrototypeOf(e), t);
      }
      function fo(e, t) {
        mo(e) ||
          Jr(e) ||
          !eo(e) ||
          (no(e) > 1 && (e.set = e.add = e.clear = e.delete = po),
            Object.freeze(e),
            t &&
            to(
              e,
              function (e, t) {
                return fo(t, !0);
              },
              !0
            ));
      }
      function po() {
        Zr(2);
      }
      function mo(e) {
        return null == e || "object" != typeof e || Object.isFrozen(e);
      }
      function ho(e) {
        var t = Qo[e];
        return t || Zr(18, e), t;
      }
      function yo(e, t) {
        Qo[e] || (Qo[e] = t);
      }
      function go() {
        return Do;
      }
      function vo(e, t) {
        t && (ho("Patches"), (e.u = []), (e.s = []), (e.v = t));
      }
      function bo(e) {
        wo(e), e.p.forEach(ko), (e.p = null);
      }
      function wo(e) {
        e === Do && (Do = e.l);
      }
      function Co(e) {
        return (Do = { p: [], l: Do, h: e, m: !0, _: 0 });
      }
      function ko(e) {
        var t = e[Wo];
        0 === t.i || 1 === t.i ? t.j() : (t.g = !0);
      }
      function Eo(e, t) {
        t._ = t.p.length;
        var n = t.p[0],
          r = void 0 !== e && e !== n;
        return (
          t.h.O || ho("ES5").S(t, e, r),
          r ? (n[Wo].P && (bo(t), Zr(4)), eo(e) && ((e = To(t, e)), t.l || So(t, e)), t.u && ho("Patches").M(n[Wo], e, t.u, t.s)) : (e = To(t, n, [])),
          bo(t),
          t.u && t.v(t.u, t.s),
          e !== Uo ? e : void 0
        );
      }
      function To(e, t, n) {
        if (mo(t)) return t;
        var r = t[Wo];
        if (!r)
          return (
            to(
              t,
              function (o, a) {
                return xo(e, r, t, o, a, n);
              },
              !0
            ),
            t
          );
        if (r.A !== e) return t;
        if (!r.P) return So(e, r.t, !0), r.t;
        if (!r.I) {
          (r.I = !0), r.A._--;
          var o = 4 === r.i || 5 === r.i ? (r.o = uo(r.k)) : r.o;
          to(3 === r.i ? new Set(o) : o, function (t, a) {
            return xo(e, r, o, t, a, n);
          }),
            So(e, o, !1),
            n && e.u && ho("Patches").R(r, n, e.u, e.s);
        }
        return r.o;
      }
      function xo(e, t, n, r, o, a) {
        if (Jr(o)) {
          var i = To(e, o, a && t && 3 !== t.i && !ro(t.D, r) ? a.concat(r) : void 0);
          if ((ao(n, r, i), !Jr(i))) return;
          e.m = !1;
        }
        if (eo(o) && !mo(o)) {
          if (!e.h.N && e._ < 1) return;
          To(e, o), (t && t.A.l) || So(e, o);
        }
      }
      function So(e, t, n) {
        void 0 === n && (n = !1), e.h.N && e.m && fo(t, n);
      }
      function Oo(e, t) {
        var n = e[Wo];
        return (n ? co(n) : e)[t];
      }
      function Po(e, t) {
        if (t in e)
          for (var n = Object.getPrototypeOf(e); n;) {
            var r = Object.getOwnPropertyDescriptor(n, t);
            if (r) return r;
            n = Object.getPrototypeOf(n);
          }
      }
      function Ao(e) {
        e.P || ((e.P = !0), e.l && Ao(e.l));
      }
      function Fo(e) {
        e.o || (e.o = uo(e.t));
      }
      function Io(e, t, n) {
        var r = so(t)
          ? ho("MapSet").T(t, n)
          : lo(t)
            ? ho("MapSet").F(t, n)
            : e.O
              ? (function (e, t) {
                var n = Array.isArray(e),
                  r = { i: n ? 1 : 0, A: t ? t.A : go(), P: !1, I: !1, D: {}, l: t, t: e, k: null, o: null, j: null, C: !1 },
                  o = r,
                  a = Go;
                n && ((o = [r]), (a = $o));
                var i = Proxy.revocable(o, a),
                  s = i.revoke,
                  l = i.proxy;
                return (r.k = l), (r.j = s), l;
              })(t, n)
              : ho("ES5").J(t, n);
        return (n ? n.A : go()).p.push(r), r;
      }
      function No(e) {
        return (
          Jr(e) || Zr(22, e),
          (function e(t) {
            if (!eo(t)) return t;
            var n,
              r = t[Wo],
              o = no(t);
            if (r) {
              if (!r.P && (r.i < 4 || !ho("ES5").K(r))) return r.t;
              (r.I = !0), (n = Lo(t, o)), (r.I = !1);
            } else n = Lo(t, o);
            return (
              to(n, function (t, o) {
                (r && oo(r.t, t) === o) || ao(n, t, e(o));
              }),
              3 === o ? new Set(n) : n
            );
          })(e)
        );
      }
      function Lo(e, t) {
        switch (t) {
          case 2:
            return new Map(e);
          case 3:
            return Array.from(e);
        }
        return uo(e);
      }
      function Ro() {
        function e(e, t) {
          var n = o[e];
          return (
            n
              ? (n.enumerable = t)
              : (o[e] = n = {
                configurable: !0,
                enumerable: t,
                get: function () {
                  var t = this[Wo];
                  return Go.get(t, e);
                },
                set: function (t) {
                  var n = this[Wo];
                  Go.set(n, e, t);
                },
              }),
            n
          );
        }
        function t(e) {
          for (var t = e.length - 1; t >= 0; t--) {
            var o = e[t][Wo];
            if (!o.P)
              switch (o.i) {
                case 5:
                  r(o) && Ao(o);
                  break;
                case 4:
                  n(o) && Ao(o);
              }
          }
        }
        function n(e) {
          for (var t = e.t, n = e.k, r = zo(n), o = r.length - 1; o >= 0; o--) {
            var a = r[o];
            if (a !== Wo) {
              var i = t[a];
              if (void 0 === i && !ro(t, a)) return !0;
              var s = n[a],
                l = s && s[Wo];
              if (l ? l.t !== i : !io(s, i)) return !0;
            }
          }
          var c = !!t[Wo];
          return r.length !== zo(t).length + (c ? 0 : 1);
        }
        function r(e) {
          var t = e.k;
          if (t.length !== e.t.length) return !0;
          var n = Object.getOwnPropertyDescriptor(t, t.length - 1);
          return !(!n || n.get);
        }
        var o = {};
        yo("ES5", {
          J: function (t, n) {
            var r = Array.isArray(t),
              o = (function (t, n) {
                if (t) {
                  for (var r = Array(n.length), o = 0; o < n.length; o++) Object.defineProperty(r, "" + o, e(o, !0));
                  return r;
                }
                var a = Vo(n);
                delete a[Wo];
                for (var i = zo(a), s = 0; s < i.length; s++) {
                  var l = i[s];
                  a[l] = e(l, t || !!a[l].enumerable);
                }
                return Object.create(Object.getPrototypeOf(n), a);
              })(r, t),
              a = { i: r ? 5 : 4, A: n ? n.A : go(), P: !1, I: !1, D: {}, l: n, t: t, k: o, o: null, g: !1, C: !1 };
            return Object.defineProperty(o, Wo, { value: a, writable: !0 }), o;
          },
          S: function (e, n, o) {
            o
              ? Jr(n) && n[Wo].A === e && t(e.p)
              : (e.u &&
                (function e(t) {
                  if (t && "object" == typeof t) {
                    var n = t[Wo];
                    if (n) {
                      var o = n.t,
                        a = n.k,
                        i = n.D,
                        s = n.i;
                      if (4 === s)
                        to(a, function (t) {
                          t !== Wo && (void 0 !== o[t] || ro(o, t) ? i[t] || e(a[t]) : ((i[t] = !0), Ao(n)));
                        }),
                          to(o, function (e) {
                            void 0 !== a[e] || ro(a, e) || ((i[e] = !1), Ao(n));
                          });
                      else if (5 === s) {
                        if ((r(n) && (Ao(n), (i.length = !0)), a.length < o.length)) for (var l = a.length; l < o.length; l++) i[l] = !1;
                        else for (var c = o.length; c < a.length; c++) i[c] = !0;
                        for (var u = Math.min(a.length, o.length), d = 0; d < u; d++) void 0 === i[d] && e(a[d]);
                      }
                    }
                  }
                })(e.p[0]),
                t(e.p));
          },
          K: function (e) {
            return 4 === e.i ? n(e) : r(e);
          },
        });
      }
      var _o,
        Do,
        Bo = "undefined" != typeof Symbol && "symbol" == typeof Symbol("x"),
        Mo = "undefined" != typeof Map,
        jo = "undefined" != typeof Set,
        qo = "undefined" != typeof Proxy && void 0 !== Proxy.revocable && "undefined" != typeof Reflect,
        Uo = Bo ? Symbol.for("immer-nothing") : (((_o = {})["immer-nothing"] = !0), _o),
        Ho = Bo ? Symbol.for("immer-draftable") : "__$immer_draftable",
        Wo = Bo ? Symbol.for("immer-state") : "__$immer_state",
        zo =
          ("undefined" != typeof Symbol && Symbol.iterator,
            "undefined" != typeof Reflect && Reflect.ownKeys
              ? Reflect.ownKeys
              : void 0 !== Object.getOwnPropertySymbols
                ? function (e) {
                  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
                }
                : Object.getOwnPropertyNames),
        Vo =
          Object.getOwnPropertyDescriptors ||
          function (e) {
            var t = {};
            return (
              zo(e).forEach(function (n) {
                t[n] = Object.getOwnPropertyDescriptor(e, n);
              }),
              t
            );
          },
        Qo = {},
        Go = {
          get: function (e, t) {
            if (t === Wo) return e;
            var n = co(e);
            if (!ro(n, t))
              return (function (e, t, n) {
                var r,
                  o = Po(t, n);
                return o ? ("value" in o ? o.value : null === (r = o.get) || void 0 === r ? void 0 : r.call(e.k)) : void 0;
              })(e, n, t);
            var r = n[t];
            return e.I || !eo(r) ? r : r === Oo(e.t, t) ? (Fo(e), (e.o[t] = Io(e.A.h, r, e))) : r;
          },
          has: function (e, t) {
            return t in co(e);
          },
          ownKeys: function (e) {
            return Reflect.ownKeys(co(e));
          },
          set: function (e, t, n) {
            var r = Po(co(e), t);
            if (null == r ? void 0 : r.set) return r.set.call(e.k, n), !0;
            if (!e.P) {
              var o = Oo(co(e), t),
                a = null == o ? void 0 : o[Wo];
              if (a && a.t === n) return (e.o[t] = n), (e.D[t] = !1), !0;
              if (io(n, o) && (void 0 !== n || ro(e.t, t))) return !0;
              Fo(e), Ao(e);
            }
            return (e.o[t] = n), (e.D[t] = !0), !0;
          },
          deleteProperty: function (e, t) {
            return void 0 !== Oo(e.t, t) || t in e.t ? ((e.D[t] = !1), Fo(e), Ao(e)) : delete e.D[t], e.o && delete e.o[t], !0;
          },
          getOwnPropertyDescriptor: function (e, t) {
            var n = co(e),
              r = Reflect.getOwnPropertyDescriptor(n, t);
            return r ? { writable: !0, configurable: 1 !== e.i || "length" !== t, enumerable: r.enumerable, value: n[t] } : r;
          },
          defineProperty: function () {
            Zr(11);
          },
          getPrototypeOf: function (e) {
            return Object.getPrototypeOf(e.t);
          },
          setPrototypeOf: function () {
            Zr(12);
          },
        },
        $o = {};
      to(Go, function (e, t) {
        $o[e] = function () {
          return (arguments[0] = arguments[0][0]), t.apply(this, arguments);
        };
      }),
        ($o.deleteProperty = function (e, t) {
          return Go.deleteProperty.call(this, e[0], t);
        }),
        ($o.set = function (e, t, n) {
          return Go.set.call(this, e[0], t, n, e[0]);
        });
      var Ko = (function () {
        function e(e) {
          (this.O = qo),
            (this.N = !1),
            "boolean" == typeof (null == e ? void 0 : e.useProxies) && this.setUseProxies(e.useProxies),
            "boolean" == typeof (null == e ? void 0 : e.autoFreeze) && this.setAutoFreeze(e.autoFreeze),
            (this.produce = this.produce.bind(this)),
            (this.produceWithPatches = this.produceWithPatches.bind(this));
        }
        var t = e.prototype;
        return (
          (t.produce = function (e, t, n) {
            if ("function" == typeof e && "function" != typeof t) {
              var r = t;
              t = e;
              var o = this;
              return function (e) {
                var n = this;
                void 0 === e && (e = r);
                for (var a = arguments.length, i = Array(a > 1 ? a - 1 : 0), s = 1; s < a; s++) i[s - 1] = arguments[s];
                return o.produce(e, function (e) {
                  var r;
                  return (r = t).call.apply(r, [n, e].concat(i));
                });
              };
            }
            var a;
            if (("function" != typeof t && Zr(6), void 0 !== n && "function" != typeof n && Zr(7), eo(e))) {
              var i = Co(this),
                s = Io(this, e, void 0),
                l = !0;
              try {
                (a = t(s)), (l = !1);
              } finally {
                l ? bo(i) : wo(i);
              }
              return "undefined" != typeof Promise && a instanceof Promise
                ? a.then(
                  function (e) {
                    return vo(i, n), Eo(e, i);
                  },
                  function (e) {
                    throw (bo(i), e);
                  }
                )
                : (vo(i, n), Eo(a, i));
            }
            if (!e || "object" != typeof e) {
              if ((a = t(e)) === Uo) return;
              return void 0 === a && (a = e), this.N && fo(a, !0), a;
            }
            Zr(21, e);
          }),
          (t.produceWithPatches = function (e, t) {
            var n,
              r,
              o = this;
            return "function" == typeof e
              ? function (t) {
                for (var n = arguments.length, r = Array(n > 1 ? n - 1 : 0), a = 1; a < n; a++) r[a - 1] = arguments[a];
                return o.produceWithPatches(t, function (t) {
                  return e.apply(void 0, [t].concat(r));
                });
              }
              : [
                this.produce(e, t, function (e, t) {
                  (n = e), (r = t);
                }),
                n,
                r,
              ];
          }),
          (t.createDraft = function (e) {
            eo(e) || Zr(8), Jr(e) && (e = No(e));
            var t = Co(this),
              n = Io(this, e, void 0);
            return (n[Wo].C = !0), wo(t), n;
          }),
          (t.finishDraft = function (e, t) {
            var n = (e && e[Wo]).A;
            return vo(n, t), Eo(void 0, n);
          }),
          (t.setAutoFreeze = function (e) {
            this.N = e;
          }),
          (t.setUseProxies = function (e) {
            e && !qo && Zr(20), (this.O = e);
          }),
          (t.applyPatches = function (e, t) {
            var n;
            for (n = t.length - 1; n >= 0; n--) {
              var r = t[n];
              if (0 === r.path.length && "replace" === r.op) {
                e = r.value;
                break;
              }
            }
            var o = ho("Patches").$;
            return Jr(e)
              ? o(e, t)
              : this.produce(e, function (e) {
                return o(e, t.slice(n + 1));
              });
          }),
          e
        );
      })(),
        Xo = new Ko(),
        Yo = Xo.produce,
        Zo = (Xo.produceWithPatches.bind(Xo), Xo.setAutoFreeze.bind(Xo), Xo.setUseProxies.bind(Xo), Xo.applyPatches.bind(Xo), Xo.createDraft.bind(Xo), Xo.finishDraft.bind(Xo), Yo),
        Jo = function (e, n) {
          return e
            .split(new RegExp("({total})", "gi"))
            .filter(function (e) {
              return e;
            })
            .map(function (e) {
              return "{total}" === e.toLowerCase() ? t().createElement("strong", { key: rr()() }, n) : t().createElement("span", { key: rr()() }, e);
            });
        };
      "function" == typeof Symbol && Symbol.iterator;
      "function" == typeof Symbol && Symbol.iterator;
      "function" == typeof Symbol && Symbol.iterator;
      "function" == typeof Symbol && Symbol.iterator;
      function ea(e) {
        var t = (function (e) {
          var t = e.split(" ");
          return t.length > 1 ? t[0] + "T" + t[1] : e;
        })(e);
        return t.replace(/([+\-]\d\d)(\d\d)$/, "$1:$2");
      }
      function ta(e, t, n) {
        return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
      }
      function na(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {},
            r = Object.keys(n);
          "function" == typeof Object.getOwnPropertySymbols &&
            (r = r.concat(
              Object.getOwnPropertySymbols(n).filter(function (e) {
                return Object.getOwnPropertyDescriptor(n, e).enumerable;
              })
            )),
            r.forEach(function (t) {
              ta(e, t, n[t]);
            });
        }
        return e;
      }
      var ra = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        return e ? new Date(ea(e)).getTime() : 0;
      },
        oa = function () {
          var e = window.location,
            t = (void 0 === e ? {} : e).search,
            n = O(void 0 === t ? "" : t).servertime,
            r = void 0 === n ? "" : n;
          return r ? parseInt(r, 10) : void 0;
        },
        aa = /[a-zA-Z0-9-]+:[a-zA-Z0-9-\/]+live-expired/,
        ia = /[a-zA-Z0-9-]+:[a-zA-Z0-9-\/]+on-demand-scheduled/,
        sa = function (e) {
          return ba(aa, e);
        },
        la = function (e, t) {
          return !(!t || !e) && e >= t;
        },
        ca = function (e) {
          return ba(ia, e);
        },
        ua = function (e, t) {
          return !!t && t >= e;
        },
        da = 0;
      function fa() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
          t = arguments.length > 1 ? arguments[1] : void 0;
        if (!e.length) return [];
        var n,
          r = oa();
        function o(e, t) {
          if (e < t) return n;
          var r = e - t;
          return r > 864e5 ? n : (!n && r > 0) || r < n ? r : n;
        }
        var a = r + da || Date.now(),
          i = [],
          s = [],
          l = [],
          c = [];
        e
          .sort(function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              t = e.startDate,
              n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              r = n.startDate,
              o = ra(t),
              a = ra(r);
            return 0 === o ? 1 : 0 === a || o < a ? -1 : o > a ? 1 : 0;
          })
          .forEach(function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              t = e.endDate,
              r = e.startDate,
              u = e.tags,
              d = void 0 === u ? [] : u,
              f = ra(t),
              p = ra(r),
              m = !(!f || !p),
              h = !!m && ua(a, p),
              y = !(!m || h) && la(a, f),
              g = !(!m || h || y || !p),
              v = ca(d),
              b = sa(d);
            if ((m || s.push(e), h && m && !v)) {
              var w = o(p, a);
              c.push(e), (n = w && w > 0 ? w : n);
            }
            if ((y && m && !b && l.push(e), g && m)) {
              var C = o(p, a);
              i.push(e), (n = C && C > 0 ? C : n);
            }
            if (h && v && m) {
              var k = o(p, a);
              n = k && k > 0 ? k : n;
            }
          }),
          ((i.length || c.length) && n) || (n = 0);
        var u = [].concat(i, c, l, s);
        return "live" === t ? (u = i) : "upcoming" === t ? (u = c) : "on-demand" === t ? (u = l) : "not-timed" === t && (u = s), na({}, n && { nextTransitionMs: n }, { visibleSessions: u });
      }
      function pa(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function ma(e, t, n) {
        return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
      }
      function ha(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var n = null == e ? null : ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
            if (null != n) {
              var r,
                o,
                a = [],
                i = !0,
                s = !1;
              try {
                for (n = n.call(e); !(i = (r = n.next()).done) && (a.push(r.value), !t || a.length !== t); i = !0);
              } catch (e) {
                (s = !0), (o = e);
              } finally {
                try {
                  i || null == n.return || n.return();
                } finally {
                  if (s) throw o;
                }
              }
              return a;
            }
          })(e, t) ||
          (function (e, t) {
            if (!e) return;
            if ("string" == typeof e) return pa(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(n);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return pa(e, t);
          })(e, t) ||
          (function () {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          })()
        );
      }
      setInterval(function () {
        da += 1e3;
      }, 1e3),
        Ro();
      var ya = function (e, t, n, r) {
        var o = new Set(t),
          a = (function (e, t) {
            return e === t.XOR || e === t.AND;
          })(n, r),
          i = (function (e, t) {
            return e === t.OR;
          })(n, r);
        return 0 === o.size
          ? e
          : e.filter(function (e) {
            if (!e.tags) return !1;
            var t = new Set(
              e.tags.map(function (e) {
                return e.id;
              })
            );
            if (a)
              return (function (e, t) {
                var n = !0,
                  r = !1,
                  o = void 0;
                try {
                  for (var a, i = t[Symbol.iterator](); !(n = (a = i.next()).done); n = !0) {
                    var s = a.value;
                    if (!e.has(s)) return !1;
                  }
                } catch (e) {
                  (r = !0), (o = e);
                } finally {
                  try {
                    n || null == i.return || i.return();
                  } finally {
                    if (r) throw o;
                  }
                }
                return !0;
              })(t, o);
            if (i)
              return (function (e, t) {
                var n = new Set(),
                  r = !0,
                  o = !1,
                  a = void 0;
                try {
                  for (var i, s = t[Symbol.iterator](); !(r = (i = s.next()).done); r = !0) {
                    var l = i.value;
                    e.has(l) && n.add(l);
                  }
                } catch (e) {
                  (o = !0), (a = e);
                } finally {
                  try {
                    r || null == s.return || s.return();
                  } finally {
                    if (o) throw a;
                  }
                }
                return n;
              })(t, o).size;
            throw new Error("Unrecognized filter type: ".concat(n));
          });
      },
        ga = function (e, n, r) {
          return Zo(e, function (e) {
            var o = x(e, n, null);
            if (null !== o && "" !== o) {
              var a,
                i =
                  ((a = r),
                    o.split(new RegExp("(".concat(a, ")"), "gi")).map(function (e) {
                      return e.toLowerCase() === a ? t().createElement("span", { "data-testid": "consonant-SearchResult", className: "consonant-SearchResult", key: rr()() }, e) : e;
                    }));
              !(function (e, t, n) {
                if (e && t) {
                  var r = t.split("."),
                    o = r.slice(0, -1),
                    a = r[r.length - 1];
                  o.reduce(function (e, t) {
                    return w(e[t]) || (e[t] = {}), e[t];
                  }, e)[a] = n;
                }
              })(e, n, i);
            }
          });
        },
        va = function (e, t, n) {
          var r = [];
          return (
            e.forEach(function (e) {
              t.forEach(function (t) {
                (function (e, t, n) {
                  var r = x(t, e, "");
                  return b(r).includes(n);
                })(t, e, n) && r.push(e);
              });
            }),
            (function (e) {
              var t = [];
              return (
                e.forEach(function (e) {
                  t.findIndex(function (t) {
                    return t.id === e.id;
                  }) <= -1 && t.push(e);
                }),
                t
              );
            })(r)
          );
        },
        ba = function (e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
          return (
            !(!t.length || "RegExp" !== e.constructor.name) &&
            t.some(function () {
              var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                n = t.id,
                r = void 0 === n ? "" : n;
              return r && e.test(r);
            })
          );
        },
        wa = function (e) {
          return e.sort(function (e, t) {
            var n = x(e, "contentArea.title"),
              r = x(t, "contentArea.title");
            return n.localeCompare(r);
          });
        },
        Ca = function (e) {
          return e.sort(function (e, t) {
            var n = x(e, "cardDate"),
              r = x(t, "cardDate");
            return n && r ? n.localeCompare(r) : 0;
          });
        },
        ka = function (e, t) {
          return e.map(function (e) {
            return (function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {},
                  r = Object.keys(n);
                "function" == typeof Object.getOwnPropertySymbols &&
                  (r = r.concat(
                    Object.getOwnPropertySymbols(n).filter(function (e) {
                      return Object.getOwnPropertyDescriptor(n, e).enumerable;
                    })
                  )),
                  r.forEach(function (t) {
                    ma(e, t, n[t]);
                  });
              }
              return e;
            })({}, e, {
              isBookmarked: t.some(function (t) {
                return t === e.id;
              }),
            });
          });
        },
        Ea = new Map();
      function Ta(e, t) {
        return Math.floor(Math.random() * (t - e)) + e;
      }
      var xa = function (e, t, n) {
        if (!Ea.get(t)) {
          var r = (function (e, t) {
            var n = [],
              r = !0,
              o = !1,
              a = void 0;
            try {
              for (var i, s = Object.entries(e)[Symbol.iterator](); !(r = (i = s.next()).done); r = !0) {
                var l = ha(i.value, 2),
                  c = l[0],
                  u = l[1];
                if (n.length < t) n.push(u);
                else {
                  var d = Ta(0, c + 1);
                  d < t && (n[d] = u);
                }
              }
            } catch (e) {
              (o = !0), (a = e);
            } finally {
              try {
                r || null == s.return || s.return();
              } finally {
                if (o) throw a;
              }
            }
            return n;
          })(
            (function (e) {
              for (var t, n = e.length; 0 !== n;) {
                var r;
                (t = Ta(0, n)), n--, (r = [e[t], e[n]]), (e[n] = r[0]), (e[t] = r[1]);
              }
              return e;
            })(e),
            n
          );
          Ea.set(t, r);
        }
        return Ea.get(t);
      };
      function Sa(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function Oa(e, t, n) {
        return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
      }
      function Pa(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {},
            r = Object.keys(n);
          "function" == typeof Object.getOwnPropertySymbols &&
            (r = r.concat(
              Object.getOwnPropertySymbols(n).filter(function (e) {
                return Object.getOwnPropertyDescriptor(n, e).enumerable;
              })
            )),
            r.forEach(function (t) {
              Oa(e, t, n[t]);
            });
        }
        return e;
      }
      function Aa(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var n = null == e ? null : ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
            if (null != n) {
              var r,
                o,
                a = [],
                i = !0,
                s = !1;
              try {
                for (n = n.call(e); !(i = (r = n.next()).done) && (a.push(r.value), !t || a.length !== t); i = !0);
              } catch (e) {
                (s = !0), (o = e);
              } finally {
                try {
                  i || null == n.return || n.return();
                } finally {
                  if (s) throw o;
                }
              }
              return a;
            }
          })(e, t) ||
          (function (e, t) {
            if (!e) return;
            if ("string" == typeof e) return Sa(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(n);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Sa(e, t);
          })(e, t) ||
          (function () {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          })()
        );
      }
      var Fa = {
        isBookmarked: c.bool,
        dateFormat: c.string,
        id: c.string.isRequired,
        lh: c.string,
        styles: (0, c.shape)(Ge),
        disableBookmarkIco: c.bool,
        onClick: c.func.isRequired,
        overlays: (0, c.shape)(Ke),
        footer: (0, c.arrayOf)((0, c.shape)(Xe)),
        contentArea: (0, c.shape)($e),
        renderBorder: c.bool,
        renderOverlay: c.bool,
        overlayLink: c.string,
        startDate: c.string,
        endDate: c.string,
        bannerMap: (0, c.shape)(Object).isRequired,
        tags: (0, c.arrayOf)((0, c.shape)(je)),
      },
        Ia = function (e) {
          var n = e.id,
            r = e.footer,
            o = e.lh,
            a = e.tags,
            i = e.disableBookmarkIco,
            s = e.isBookmarked,
            c = e.onClick,
            u = e.dateFormat,
            d = e.styles,
            f = d.backgroundImage,
            p = d.backgroundAltText,
            m = e.contentArea,
            h = m.title,
            y = m.detailText,
            g = m.description,
            v = m.dateDetailText,
            b = v.startTime,
            w = v.endTime,
            C = e.overlays,
            k = C.banner,
            E = k.description,
            T = k.fontColor,
            x = k.backgroundColor,
            S = k.icon,
            O = C.videoButton.url,
            P = C.logo,
            A = P.src,
            F = P.alt,
            I = P.backgroundColor,
            L = P.borderColor,
            _ = C.label.description,
            D = e.renderBorder,
            B = e.renderOverlay,
            M = e.overlayLink,
            j = e.startDate,
            q = e.endDate,
            U = e.bannerMap,
            H = x,
            W = S,
            z = T,
            V = E,
            Q = Re(),
            G = Q("collection", "i18n.prettyDateIntervalFormat"),
            $ = Q("language", ""),
            K = Q("collection", "disableBanners"),
            X = l()({ "consonant-Card": !0, "consonant-OneHalfCard": !0, "consonant-u-noBorders": !D }),
            Y = t().useRef(),
            te = Aa(_e(Y, f), 1)[0],
            ne = (b ? Xn(b, w, $, G) : "") || y,
            re = ba(/caas:gated/, a);
          function oe(e) {
            return e
              ? e.map(function (e) {
                return e.type === Z ? (re && (e.type = ee), Pa({}, e, { cardId: n, disableBookmarkIco: i, isBookmarked: s, onClick: c })) : e.type === J ? Pa({}, e, { dateFormat: u, locale: $ }) : e;
              })
              : [];
          }
          if (j && q) {
            var ae = N(j, q, U);
            (H = ae.backgroundColor), (V = ae.description), (z = ae.fontColor), (W = ae.icon);
          }
          var ie = R(M);
          return t().createElement(
            "div",
            { "daa-lh": o, className: X, "aria-label": h, "data-testid": "consonant-OneHalfCard", id: n },
            B && t().createElement(_t, { target: ie, link: M }),
            t().createElement(
              "div",
              { "data-testid": "consonant-OneHalfCard-img", className: "consonant-OneHalfCard-img", ref: Y, style: { backgroundImage: te && 'url("'.concat(te, '")') }, role: p && "img", "aria-label": p },
              V &&
              z &&
              H &&
              !K &&
              t().createElement(
                "span",
                { "data-testid": "consonant-OneHalfCard-banner", className: "consonant-OneHalfCard-banner", style: { backgroundColor: H, color: z } },
                W && t().createElement("div", { className: "consonant-OneHalfCard-bannerIconWrapper" }, t().createElement("img", { alt: "", loading: "lazy", src: W, "data-testid": "consonant-Card-bannerImg" })),
                t().createElement("span", null, V)
              ),
              _ && t().createElement("span", { className: "consonant-OneHalfCard-badge" }, _),
              O && t().createElement(zn, { videoURL: O, className: "consonant-OneHalfCard-videoIco" }),
              A && t().createElement("div", { style: { backgroundColor: I, borderColor: L }, className: "consonant-OneHalfCard-logo" }, t().createElement("img", { src: A, alt: F, loading: "lazy", width: "32" }))
            ),
            t().createElement(
              "div",
              { className: "consonant-OneHalfCard-inner" },
              ne && t().createElement("span", { "data-testid": "consonant-OneHalfCard-label", className: "consonant-OneHalfCard-label" }, ne),
              t().createElement("h2", { className: "consonant-OneHalfCard-title" }, h),
              g && t().createElement("p", { className: "consonant-OneHalfCard-text" }, g),
              r.map(function (e) {
                return t().createElement(Yr, { divider: e.divider, isFluid: e.isFluid, key: rr()(), left: oe(e.left), center: oe(e.center), right: oe(e.right) });
              })
            )
          );
        };
      (Ia.propTypes = Fa),
        (Ia.defaultProps = {
          footer: [],
          styles: {},
          overlays: {},
          dateFormat: "",
          contentArea: {},
          lh: "",
          isBookmarked: !1,
          disableBookmarkIco: !1,
          renderBorder: !0,
          renderOverlay: !1,
          overlayLink: "",
          startDate: "",
          endDate: "",
          tags: [],
        });
      var Na = Ia;
      function La(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function Ra(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var n = null == e ? null : ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
            if (null != n) {
              var r,
                o,
                a = [],
                i = !0,
                s = !1;
              try {
                for (n = n.call(e); !(i = (r = n.next()).done) && (a.push(r.value), !t || a.length !== t); i = !0);
              } catch (e) {
                (s = !0), (o = e);
              } finally {
                try {
                  i || null == n.return || n.return();
                } finally {
                  if (s) throw o;
                }
              }
              return a;
            }
          })(e, t) ||
          (function (e, t) {
            if (!e) return;
            if ("string" == typeof e) return La(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(n);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return La(e, t);
          })(e, t) ||
          (function () {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          })()
        );
      }
      var _a = {
        ctaLink: c.string,
        id: c.string.isRequired,
        lh: c.string,
        styles: (0, c.shape)(Ge),
        overlays: (0, c.shape)(Ke),
        contentArea: (0, c.shape)($e),
        renderBorder: c.bool,
        renderOverlay: c.bool,
        overlayLink: c.string,
        startDate: c.string,
        endDate: c.string,
        bannerMap: (0, c.shape)(Object).isRequired,
        tags: (0, c.arrayOf)((0, c.shape)(je)),
      },
        Da = function (n) {
          var r = n.id,
            o = n.lh,
            a = n.ctaLink,
            i = n.styles,
            s = i.backgroundImage,
            c = i.backgroundAltText,
            u = n.tags,
            d = n.contentArea,
            f = d.title,
            p = d.detailText,
            m = n.overlays,
            h = m.banner,
            y = h.description,
            g = h.fontColor,
            v = h.backgroundColor,
            b = h.icon,
            w = m.videoButton.url,
            C = n.renderBorder,
            k = n.renderOverlay,
            E = n.overlayLink,
            T = n.startDate,
            x = n.endDate,
            S = n.bannerMap,
            O = v,
            P = b,
            F = g,
            L = y,
            _ = w,
            D = !1,
            B = p,
            M = Re(),
            j = M("collection", "banner.register.url"),
            q = M("collection", "i18n.prettyDateIntervalFormat"),
            U = M("language", ""),
            H = M("collection", "disableBanners"),
            W = l()({ "consonant-Card": !0, "consonant-HalfHeightCard": !0, "consonant-u-noBorders": !C }),
            z = t().useRef(),
            V = Ra(_e(z, s), 1)[0],
            Q = De(),
            G = ba(/caas:gated/, u) || ba(/caas:card-style\/half-height-featured/, u);
          if (G && !Q) (L = S.register.description), (P = ""), (O = S.register.backgroundColor), (F = S.register.fontColor), (_ = j), (D = !0);
          else if (T && x) {
            var $ = N(T, x, S);
            (O = $.backgroundColor), (L = $.description), (F = $.fontColor), (P = $.icon);
            var K = I();
            A(K, T) && (B = Xn(T, x, U, q));
          }
          var X = R(a),
            Y = R(E),
            Z = o.split(" | ").slice(1).join(" | "),
            J = function () {
              return t().createElement(
                e.Fragment,
                null,
                L &&
                F &&
                O &&
                (!G || !Q) &&
                (!H || G) &&
                t().createElement(
                  "span",
                  { className: "consonant-HalfHeightCard-banner", style: { backgroundColor: O, color: F } },
                  P && t().createElement("div", { className: "consonant-HalfHeightCard-bannerIconWrapper" }, t().createElement("img", { alt: "", loading: "lazy", src: P })),
                  t().createElement("span", null, L)
                ),
                t().createElement("div", { className: "consonant-HalfHeightCard-img", ref: z, style: { backgroundImage: V && 'url("'.concat(V, '")') }, role: c && "img", "aria-label": c }),
                t().createElement(
                  "div",
                  { className: "consonant-HalfHeightCard-inner" },
                  f && t().createElement("h2", { className: "consonant-HalfHeightCard-title", "daa-ll": "Card CTA" }, f),
                  B && t().createElement("span", { className: "consonant-HalfHeightCard-label" }, B),
                  _ && t().createElement(zn, { videoURL: _, gateVideo: D, className: "consonant-HalfHeightCard-videoIco" })
                )
              );
            };
          return _
            ? t().createElement("div", { className: W, "daa-lh": o, id: r }, k && t().createElement(_t, { target: Y, link: E }), J())
            : t().createElement("a", { href: a, target: X, "aria-label": Z, rel: "noopener noreferrer", className: W, title: "", "daa-lh": o, tabIndex: "0", id: r }, k && t().createElement(_t, { target: Y, link: E }), J());
        };
      (Da.propTypes = _a), (Da.defaultProps = { styles: {}, lh: "", ctaLink: "", overlays: {}, contentArea: {}, renderBorder: !0, renderOverlay: !1, overlayLink: "", startDate: "", endDate: "", tags: [] });
      var Ba = Da;
      function Ma(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function ja(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var n = null == e ? null : ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
            if (null != n) {
              var r,
                o,
                a = [],
                i = !0,
                s = !1;
              try {
                for (n = n.call(e); !(i = (r = n.next()).done) && (a.push(r.value), !t || a.length !== t); i = !0);
              } catch (e) {
                (s = !0), (o = e);
              } finally {
                try {
                  i || null == n.return || n.return();
                } finally {
                  if (s) throw o;
                }
              }
              return a;
            }
          })(e, t) ||
          (function (e, t) {
            if (!e) return;
            if ("string" == typeof e) return Ma(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(n);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Ma(e, t);
          })(e, t) ||
          (function () {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          })()
        );
      }
      var qa = {
        ctaLink: c.string,
        id: c.string.isRequired,
        lh: c.string,
        styles: (0, c.shape)(Ge),
        contentArea: (0, c.shape)($e),
        overlays: (0, c.shape)(Ke),
        renderBorder: c.bool,
        renderOverlay: c.bool,
        overlayLink: c.string,
        startDate: c.string,
        endDate: c.string,
        bannerMap: (0, c.shape)(Object).isRequired,
      },
        Ua = function (e) {
          var n = e.id,
            r = e.lh,
            o = e.ctaLink,
            a = e.styles,
            i = a.backgroundImage,
            s = a.backgroundAltText,
            c = e.contentArea,
            u = c.title,
            d = c.description,
            f = c.detailText,
            p = e.overlays,
            m = p.videoButton.url,
            h = p.banner,
            y = h.description,
            g = h.fontColor,
            v = h.backgroundColor,
            b = h.icon,
            w = e.renderBorder,
            C = e.renderOverlay,
            k = e.overlayLink,
            E = e.startDate,
            T = e.endDate,
            x = e.bannerMap,
            S = v,
            O = b,
            P = g,
            A = y,
            F = l()({ "consonant-Card": !0, "consonant-DoubleWideCard": !0, "consonant-DoubleWideCard--noTextInfo": !u && !d && !f, "consonant-u-noBorders": !w }),
            I = t().useRef(),
            L = ja(_e(I, i), 1)[0];
          if (E && T) {
            var _ = N(E, T, x);
            (S = _.backgroundColor), (A = _.description), (P = _.fontColor), (O = _.icon);
          }
          var D = R(o),
            B = R(k);
          return t().createElement(
            "div",
            { className: F, "daa-lh": r, id: n },
            C && t().createElement(_t, { target: B, link: k }),
            A &&
            P &&
            S &&
            t().createElement(
              "span",
              { "data-testid": "consonant-OneHalfCard-banner", className: "consonant-OneHalfCard-banner", style: { backgroundColor: S, color: P } },
              O && t().createElement("div", { className: "consonant-OneHalfCard-bannerIconWrapper" }, t().createElement("img", { alt: "", loading: "lazy", src: O, "data-testid": "consonant-Card-bannerImg" })),
              t().createElement("span", null, A)
            ),
            t().createElement(
              "div",
              { className: "consonant-DoubleWideCard-img", ref: I, style: { backgroundImage: L && 'url("'.concat(L, '")') }, role: s && "img", "aria-label": s },
              m && t().createElement(zn, { videoURL: m, className: "consonant-DoubleWideCard-videoIco" })
            ),
            t().createElement(
              "a",
              { href: o, target: D, "aria-label": u, "daa-ll": "Card CTA", rel: "noopener noreferrer", tabIndex: "0", className: "consonant-DoubleWideCard-inner" },
              f && t().createElement("span", { className: "consonant-DoubleWideCard-label" }, f),
              u && t().createElement("h2", { className: "consonant-DoubleWideCard-title" }, u),
              d && t().createElement("p", { className: "consonant-DoubleWideCard-text" }, d)
            )
          );
        };
      (Ua.propTypes = qa), (Ua.defaultProps = { styles: {}, lh: "", ctaLink: "", contentArea: {}, overlays: {}, renderBorder: !0, renderOverlay: !1, overlayLink: "", startDate: "", endDate: "" });
      var Ha = Ua;
      function Wa(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function za(e, t, n) {
        return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
      }
      function Va(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {},
            r = Object.keys(n);
          "function" == typeof Object.getOwnPropertySymbols &&
            (r = r.concat(
              Object.getOwnPropertySymbols(n).filter(function (e) {
                return Object.getOwnPropertyDescriptor(n, e).enumerable;
              })
            )),
            r.forEach(function (t) {
              za(e, t, n[t]);
            });
        }
        return e;
      }
      function Qa(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var n = null == e ? null : ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
            if (null != n) {
              var r,
                o,
                a = [],
                i = !0,
                s = !1;
              try {
                for (n = n.call(e); !(i = (r = n.next()).done) && (a.push(r.value), !t || a.length !== t); i = !0);
              } catch (e) {
                (s = !0), (o = e);
              } finally {
                try {
                  i || null == n.return || n.return();
                } finally {
                  if (s) throw o;
                }
              }
              return a;
            }
          })(e, t) ||
          (function (e, t) {
            if (!e) return;
            if ("string" == typeof e) return Wa(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(n);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Wa(e, t);
          })(e, t) ||
          (function () {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          })()
        );
      }
      var Ga = {
        footer: (0, c.arrayOf)((0, c.shape)(Xe)),
        ctaLink: c.string,
        id: c.string.isRequired,
        lh: c.string,
        styles: (0, c.shape)(Ge),
        contentArea: (0, c.shape)($e),
        renderBorder: c.bool,
        renderOverlay: c.bool,
        overlayLink: c.string,
        disableBookmarkIco: c.bool,
        isBookmarked: c.bool,
        onClick: c.func,
        dateFormat: c.string,
      },
        $a = function (e) {
          var n = e.id,
            r = e.footer,
            o = e.ctaLink,
            a = e.lh,
            i = e.styles.mnemonic,
            s = e.contentArea,
            c = s.title,
            u = s.description,
            d = e.renderBorder,
            f = e.renderOverlay,
            p = e.overlayLink,
            m = e.disableBookmarkIco,
            h = e.isBookmarked,
            y = e.onClick,
            g = e.dateFormat,
            v = Re()("language", ""),
            b = l()({ "consonant-Card": !0, "consonant-ProductCard": !0, "consonant-u-noBorders": !d }),
            w = l()({ "consonant-ProductCard-img": !0, "consonant-ProductCard-img--missing": "" === i }),
            C = t().useRef(),
            k = Qa(_e(C, i), 1)[0];
          function E(e) {
            return e
              ? e.map(function (e) {
                return e.type === Z ? Va({}, e, { cardId: n, disableBookmarkIco: m, isBookmarked: h, onClick: y, isProductCard: !0 }) : e.type === J ? Va({}, e, { dateFormat: g, locale: v }) : e;
              })
              : [];
          }
          var T = R(o),
            x = R(p);
          return t().createElement(
            "div",
            { "daa-lh": a, className: b, "data-testid": "consonant-ProductCard", "aria-label": c, id: n },
            f && t().createElement(_t, { target: x, link: p }),
            t().createElement(
              "div",
              { href: o, target: T, className: "consonant-ProductCard-inner" },
              c &&
              t().createElement(
                "div",
                { className: "consonant-ProductCard-row" },
                t().createElement("div", { "data-testid": w, className: w, ref: C, style: { backgroundImage: k && 'url("'.concat(k, '")') } }),
                t().createElement("h2", { className: "consonant-ProductCard-title" }, c)
              ),
              u && t().createElement("p", { className: "consonant-ProductCard-text" }, Nt(u)),
              r.map(function (e) {
                return t().createElement(Yr, { divider: e.divider, isFluid: e.isFluid, key: rr()(), left: E(e.left), center: E(e.center), right: E(e.right) });
              })
            )
          );
        };
      ($a.propTypes = Ga),
        ($a.defaultProps = { footer: [], styles: {}, ctaLink: "", contentArea: {}, lh: "", renderBorder: !0, renderOverlay: !1, overlayLink: "", disableBookmarkIco: !1, isBookmarked: !1, dateFormat: "", onClick: function () { } });
      var Ka = $a;
      function Xa() {
        return (
          (Xa =
            Object.assign ||
            function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
              }
              return e;
            }),
          Xa.apply(this, arguments)
        );
      }
      var Ya = { pages: c.number, resultsPerPage: c.number, cards: (0, c.arrayOf)((0, c.shape)(Ye)), onCardBookmark: c.func.isRequired, containerType: c.string, isAriaLiveActive: c.bool },
        Za = { pages: 1, cards: [], resultsPerPage: 8, containerType: "default", isAriaLiveActive: !1 },
        Ja = function (e) {
          var n = e.resultsPerPage,
            r = e.pages,
            o = e.onCardBookmark,
            a = e.cards,
            i = e.containerType,
            s = e.isAriaLiveActive,
            c = Re(),
            u = c("collection", "cardStyle"),
            d = c("collection", "layout.type"),
            f = c("collection", "layout.gutter"),
            p = c("collection", "setCardBorders"),
            m = c("collection", "useOverlayLinks"),
            h = c("collection", "i18n.prettyDateIntervalFormat"),
            y = c("language", ""),
            g = c("pagination", "type"),
            v = c("customCard"),
            b = l()({
              "consonant-CardsGrid": !0,
              "consonant-CardsGrid--2up": d === de,
              "consonant-CardsGrid--3up": d === fe,
              "consonant-CardsGrid--4up": d === pe,
              "consonant-CardsGrid--5up": d === me,
              "consonant-CardsGrid--with1xGutter": f === he,
              "consonant-CardsGrid--with2xGutter": f === ye,
              "consonant-CardsGrid--with3xGutter": f === ge,
              "consonant-CardsGrid--with4xGutter": f === ve,
              "consonant-CardsGrid--doubleWideCards": u === le,
            }),
            w = {
              live: { description: c("collection", "banner.live.description"), backgroundColor: "#ffffff", fontColor: "#d7373f", icon: "https://www.adobe.com/content/dam/cc/icons/live_banner_icon.svg" },
              upcoming: { description: c("collection", "banner.upcoming.description"), backgroundColor: "#FC6B35", fontColor: "#000000", icon: "" },
              onDemand: { description: c("collection", "banner.onDemand.description"), backgroundColor: "#2D9D78", fontColor: "#000000", icon: "" },
              register: { description: c("collection", "banner.register.description"), backgroundColor: "#EBC526", fontColor: "#323232", icon: "" },
            },
            C = "loadMore" === g || "carousel" === i,
            k = n * r,
            E = a,
            T = n * (r - 1);
          "paginator" === g && (E = a.slice(T, k)), C && (E = a.slice(0, n * r));
          var S = function (e) {
            return e.toString().replace(/\|/g, "-");
          };
          return (
            E.length > 0 &&
            t().createElement(
              "div",
              { "data-testid": "consonant-CardsGrid", className: b, "aria-live": s ? "polite" : "off" },
              E.map(function (e, n) {
                var r = x(e, "styles.typeOverride"),
                  a = u || r,
                  i = e.contentArea,
                  s = (void 0 === i ? {} : i).title,
                  l = void 0 === s ? "" : s,
                  c = e.id,
                  d = n + 1;
                switch (a) {
                  case ie:
                    return t().createElement(Kn, Xa({ lh: "Card ".concat(d, " | ").concat(S(l), " | ").concat(c), key: e.id }, e, { bannerMap: w, renderBorder: p, renderOverlay: m }));
                  case ae:
                    return t().createElement(tr, Xa({ lh: "Card ".concat(d, " | ").concat(S(l), " | ").concat(c), key: e.id }, e, { bannerMap: w, renderBorder: p, renderOverlay: m }));
                  case se:
                    return t().createElement(Ba, Xa({ lh: "Card ".concat(d, " | ").concat(S(l), " | ").concat(c), key: e.id }, e, { bannerMap: w, renderBorder: p, renderOverlay: m }));
                  case le:
                    return t().createElement(Ha, Xa({ lh: "Card ".concat(d, " | ").concat(S(l), " | ").concat(c), key: e.id }, e, { bannerMap: w, renderBorder: p, renderOverlay: m }));
                  case ue:
                    return t().createElement(Ka, Xa({ lh: "Card ".concat(n, " | ").concat(S(l), " | ").concat(c), key: e.id, renderBorder: p }, e, { renderOverlay: m }));
                  case ce:
                    return Nt(v(e));
                  default:
                    return t().createElement(
                      Na,
                      Xa({ lh: "Card ".concat(d, " | ").concat(S(l), " | ").concat(c), key: e.id }, e, { bannerMap: w, onClick: o, dateFormat: h, locale: y, renderBorder: p, renderOverlay: m })
                    );
                }
              })
            )
          );
        };
      (Ja.propTypes = Ya), (Ja.defaultProps = Za);
      var ei = Ja;
      function ti(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function ni(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var n = null == e ? null : ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
            if (null != n) {
              var r,
                o,
                a = [],
                i = !0,
                s = !1;
              try {
                for (n = n.call(e); !(i = (r = n.next()).done) && (a.push(r.value), !t || a.length !== t); i = !0);
              } catch (e) {
                (s = !0), (o = e);
              } finally {
                try {
                  i || null == n.return || n.return();
                } finally {
                  if (s) throw o;
                }
              }
              return a;
            }
          })(e, t) ||
          (function (e, t) {
            if (!e) return;
            if ("string" == typeof e) return ti(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(n);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ti(e, t);
          })(e, t) ||
          (function () {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          })()
        );
      }
      var ri = "paged",
        oi = "next",
        ai = "previous";
      function ii() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          r = n.cards,
          o = n.onCardBookmark,
          a = n.resQty,
          i = Re(),
          s = i("collection", "layout.type"),
          c = i("collection", "layout.gutter"),
          u = i("pagination", "animationStyle"),
          d = i("collection", "i18n.title"),
          f = i("collection", "showTotalResults"),
          p = i("collection", "i18n.totalResultsText"),
          m = i("collection", "useLightText"),
          h = u === ri,
          y = parseInt(s, 10),
          g = 8 * parseInt(c, 10),
          v = ni((0, e.useState)({ previous: !0, next: !0 }), 2),
          b = v[0],
          w = v[1],
          C = ni((0, e.useState)(2), 2),
          k = C[0],
          E = C[1],
          T = ni((0, e.useState)(0), 2),
          x = T[0],
          S = T[1],
          O = ni((0, e.useState)({}), 2),
          P = O[0],
          A = O[1],
          F = ni((0, e.useState)(0), 2),
          I = F[0],
          N = F[1],
          L = (0, e.useRef)(null);
        function R(e) {
          var t = L.current.offsetWidth,
            n = Math.floor(t / (e + g)) - y;
          return { adjustedPageSize: y + n, pageSizeMod: n };
        }
        function _(e) {
          var t = L.current,
            n = t.firstElementChild,
            o = (void 0 === n ? {} : n).children,
            a = void 0 === o ? [] : o,
            i = t.scrollWidth,
            s = r.length,
            l = void 0 === s ? 0 : s,
            c = At(a),
            u = c.length,
            d = void 0 === u ? 0 : u,
            f = R(c[I].offsetWidth),
            p = f.adjustedPageSize,
            m = void 0 === p ? y : p,
            v = f.pageSizeMod,
            b = {},
            w = 0;
          if (h) b = c[(w = (w = e === oi ? I + m : I - m) < 0 ? 0 : w)];
          else {
            var C = c[I],
              k = C.nextSibling,
              E = C.previousSibling;
            (w = e === oi ? I + 1 : I - 1), (b = e === oi ? k : E);
          }
          var T = b.offsetLeft + m * (b.offsetWidth + g) > i;
          if (h && T) {
            var x = 0 === v ? 1 : v,
              S = (w = w - x < 0 ? 0 : w - x) + m - r.length;
            b = c[(w = S >= 0 ? w - S : w - x)];
          }
          return { getMorePages: d < l, nextIndex: w, nextLeftVal: b.offsetLeft, nextLeftEl: b };
        }
        function D() {
          var e,
            t,
            n = L.current.offsetWidth,
            o = P.offsetWidth,
            a = void 0 === o ? 0 : o,
            i = L.current.querySelector(".consonant-Card").offsetWidth,
            s = R(a),
            l = s.adjustedPageSize,
            c = s.pageSizeMod,
            u = n - (a * y + g * l),
            d = Math.abs(u) <= g;
          h ? ((e = c < 0 && d ? l + 1 : l), (t = (r.length <= y && i * r.length + g * (r.length - 1) < n) || (0 !== I && I + e >= r.length))) : ((e = c < 0 && d ? l + 1 : l), (t = r.length - (I + e) == 0)),
            w({ previous: I >= 1, next: !t });
        }
        var B = function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = e.target,
            n = t.name,
            r = void 0 === n ? "" : n,
            o = _(r),
            a = o.getMorePages,
            i = o.nextIndex,
            s = o.nextLeftVal,
            l = o.nextLeftEl;
          A(l),
            N(i),
            a &&
            E(function (e) {
              return e + 2;
            }),
            S(s - 8);
        },
          M = l()({ "consonant-CarouselInfo-collectionTitle": !0, "consonant-CarouselInfo-collectionTitle--withLightText": m }),
          j = l()({ "consonant-CarouselInfo-results": !0, "consonant-CarouselInfo-results--withLightText": m }),
          q = Jo(p, a);
        return (
          (0, e.useEffect)(
            function () {
              D(), Ft(L.current, x, { duration: h ? 500 : 200 });
            },
            [x]
          ),
          (0, e.useEffect)(function () {
            if (r.length) {
              var e = L.current.firstElementChild,
                t = (void 0 === e ? {} : e).children;
              A(At(void 0 === t ? [] : t)[0]), D();
            }
          }, []),
          t().createElement(
            e.Fragment,
            null,
            t().createElement(
              "nav",
              { className: "consonant-Navigation--carousel" },
              b.previous && t().createElement("button", { "aria-label": "Previous button", className: "consonant-Button--previous", onClick: B, "daa-ll": "Previous", "daa-state": "true", name: ai, type: "button" }),
              b.next && t().createElement("button", { "aria-label": "Next button", className: "consonant-Button--next", "daa-ll": "Next", "daa-state": "true", onClick: B, name: oi, type: "button" })
            ),
            t().createElement(
              "div",
              { className: "consonant-CarouselInfo" },
              d && t().createElement("h3", { "data-testid": "consonant-CarouselInfo-collectionTitle", className: M }, d),
              f && t().createElement("div", { "data-testid": "consonant-CarouselInfo-results", className: j }, q)
            ),
            t().createElement("div", { className: "consonant-Container--carousel", ref: L }, t().createElement(ei, { cards: r, containerType: "carousel", resultsPerPage: y, onCardBookmark: o, pages: k }))
          )
        );
      }
      var si = ii;
      ii.propTypes = { cards: u().arrayOf(u().object).isRequired, onCardBookmark: u().func.isRequired, resQty: u().number.isRequired };
      var li = { description: c.string, replaceValue: c.string, title: c.string.isRequired },
        ci = function (e) {
          var n,
            r = e.title,
            o = e.description,
            a = e.replaceValue,
            i = Re(),
            s =
              ((n = a),
                o
                  .split(new RegExp("({query}|{break})", "gi"))
                  .filter(function (e) {
                    return e;
                  })
                  .map(function (e) {
                    switch (e.toLowerCase()) {
                      case "{query}":
                        return t().createElement("strong", { key: rr()() }, n);
                      case "{break}":
                        return t().createElement("br", { key: rr()() });
                      default:
                        return t().createElement("span", { key: rr()() }, e);
                    }
                  })),
            c = i("collection", "useLightText"),
            u = l()({ "consonant-NoResultsView": !0, "consonant-NoResultsView--withLightText": c });
          return t().createElement(
            "div",
            { "data-testid": "consonant-NoResultsView", className: u },
            t().createElement("strong", { className: "consonant-NoResultsView-title" }, r),
            o && t().createElement("div", { className: "consonant-NoResultsView-description" }, s)
          );
        };
      (ci.propTypes = li), (ci.defaultProps = { description: "", replaceValue: "" });
      var ui = ci,
        di = { show: c.number.isRequired, total: c.number.isRequired, onClick: c.func.isRequired },
        fi = function (e) {
          var n = e.show,
            r = e.total,
            o = e.onClick,
            a = Re(),
            i = a("pagination", "loadMoreButton.style"),
            s = a("pagination", "loadMoreButton.useThemeThree"),
            c = a("pagination", "i18n.loadMore.btnText"),
            u = a("pagination", "i18n.loadMore.resultsQuantityText"),
            d = l()({ "consonant-LoadMore": !0, "consonant-LoadMore--overBg": "over-background" === i && !s, "consonant-LoadMore--themeThree": s }),
            f = u.replace("{start}", n).replace("{end}", r),
            p = n < r;
          return n > 0 && r > 0
            ? t().createElement(
              "div",
              { "data-testid": "consonant-LoadMore", className: d },
              t().createElement(
                "div",
                { className: "consonant-LoadMore-inner" },
                t().createElement("p", { "data-testid": "consonant-LoadMore-text", className: "consonant-LoadMore-text" }, f),
                p && t().createElement("button", { type: "button", "data-testid": "consonant-LoadMore-btn", "daa-ll": c, className: "consonant-LoadMore-btn", onClick: o, tabIndex: "0" }, c)
              )
            )
            : null;
        };
      fi.propTypes = di;
      var pi = fi,
        mi = { showBookmarks: c.bool, savedCardsCount: c.number, onClick: c.func.isRequired },
        hi = function (e) {
          var n = e.onClick,
            r = e.showBookmarks,
            o = e.savedCardsCount,
            a = Re(),
            i = a("bookmarks", "i18n.leftFilterPanel.filterTitle"),
            s = a("bookmarks", "leftFilterPanel.selectBookmarksIcon"),
            c = a("bookmarks", "leftFilterPanel.unselectBookmarksIcon"),
            u = r ? s : c,
            d = { backgroundImage: u ? "url(".concat(u, ")") : "" },
            f = l()({ "consonant-Bookmarks": !0, "is-selected": r });
          return t().createElement(
            "button",
            { "data-testid": "consonant-Bookmarks", type: "button", onClick: n, className: f, tabIndex: "0" },
            t().createElement(
              "span",
              { className: "consonant-Bookmarks-icoWrapper" },
              t().createElement("span", { style: d, className: "consonant-Bookmarks-ico", "data-testid": "consonant-Bookmarks-ico" }),
              t().createElement("span", { className: "consonant-Bookmarks-title" }, i)
            ),
            t().createElement("span", { "data-testid": "consonant-Bookmarks-itemBadge", className: "consonant-Bookmarks-itemBadge" }, o)
          );
        };
      (hi.propTypes = mi), (hi.defaultProps = { showBookmarks: !1, savedCardsCount: 0 });
      var yi = hi;
      function gi(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function vi(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var n = null == e ? null : ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
            if (null != n) {
              var r,
                o,
                a = [],
                i = !0,
                s = !1;
              try {
                for (n = n.call(e); !(i = (r = n.next()).done) && (a.push(r.value), !t || a.length !== t); i = !0);
              } catch (e) {
                (s = !0), (o = e);
              } finally {
                try {
                  i || null == n.return || n.return();
                } finally {
                  if (s) throw o;
                }
              }
              return a;
            }
          })(e, t) ||
          (function (e, t) {
            if (!e) return;
            if ("string" == typeof e) return gi(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(n);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return gi(e, t);
          })(e, t) ||
          (function () {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          })()
        );
      }
      var bi = { onClick: c.func.isRequired, pageCount: c.number.isRequired, totalPages: c.number.isRequired, totalResults: c.number.isRequired, showItemsPerPage: c.number.isRequired, currentPageNumber: c.number.isRequired },
        wi = function (e) {
          var n = e.pageCount,
            r = e.currentPageNumber,
            o = e.totalPages,
            a = e.onClick,
            i = e.showItemsPerPage,
            s = e.totalResults,
            l = Re(),
            c = l("pagination", "i18n.paginator.resultsQuantityText"),
            u = l("pagination", "i18n.paginator.prevLabel"),
            d = l("pagination", "i18n.paginator.nextLabel"),
            f = vi(
              (function (e, t, n) {
                var r,
                  o,
                  a = Math.floor(t / 2);
                return n <= t + 1 ? ((r = 1), (o = n)) : ((r = Math.min(Math.max(1, e - a), n - t)), (o = Math.max(Math.min(e + a, n), t + 1))), [r, o];
              })(r, n, o),
              2
            ),
            p = (function (e, t) {
              var n = e,
                r = 1,
                o = [];
              for (t < n && (r = -r); r > 0 ? t >= n : t <= n;) o.push(n), (n += r);
              return o;
            })(f[0], f[1]),
            m = r - 1 > 0,
            h = r + 1 < o,
            y = function (e) {
              var t = e.target;
              e.preventDefault();
              var n = null,
                i = t.classList.contains("consonant-Pagination-btn--prev"),
                s = t.classList.contains("consonant-Pagination-btn--next");
              (n = i ? (m ? r - 1 : 1) : s ? (h ? r + 1 : o) : parseInt(t.firstChild.nodeValue, 10)), a(n);
            },
            g = c
              .replace(
                "{start}",
                (function (e, t) {
                  return 1 === e ? 1 : e * t - (t - 1);
                })(r, i)
              )
              .replace(
                "{end}",
                (function (e, t, n) {
                  var r = e * t;
                  return r < n ? r : n;
                })(r, i, s)
              )
              .replace("{total}", s);
          return t().createElement(
            "div",
            { className: "consonant-Pagination" },
            t().createElement(
              "div",
              { className: "consonant-Pagination-paginator" },
              t().createElement("button", { "data-testid": "consonant-Pagination-btn--prev", onClick: y, type: "button", className: "consonant-Pagination-btn consonant-Pagination-btn--prev", tabIndex: "0" }, u),
              t().createElement(
                "ul",
                { className: "consonant-Pagination-items" },
                p.map(function (e) {
                  return t().createElement(
                    "li",
                    { key: e, className: r === e ? "consonant-Pagination-item is-active" : "consonant-Pagination-item" },
                    t().createElement("button", { "data-testid": "consonant-Pagination-itemBtn", onClick: y, type: "button", className: "consonant-Pagination-itemBtn", tabIndex: "0" }, e)
                  );
                })
              ),
              t().createElement("button", { "data-testid": "consonant-Pagination-btn--next", onClick: y, type: "button", className: "consonant-Pagination-btn consonant-Pagination-btn--next", tabIndex: "0" }, d)
            ),
            t().createElement("div", { "data-testid": "consonant-Pagination-summary", className: "consonant-Pagination-summary" }, t().createElement("strong", null, g))
          );
        };
      wi.propTypes = bi;
      var Ci = wi,
        ki = function (e) {
          return new Date(e).getTime();
        };
      function Ei(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }
      var Ti = (function () {
        function e(t, n, r) {
          !(function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          })(this, e),
            (this.filteredCards = t),
            (this.randomSortId = n),
            (this.reservoirSize = r);
        }
        var t, n, r;
        return (
          (t = e),
          (n = [
            {
              key: "filterCards",
              value: function (e, t, n) {
                return (this.filteredCards = ya(this.filteredCards, e, t, n)), this;
              },
            },
            {
              key: "searchCards",
              value: function (e, t) {
                var n = e.trim().toLowerCase(),
                  r = (function (e, t, n) {
                    if (!e) return t;
                    var r = b(e);
                    return va(t, n, r);
                  })(e, this.filteredCards, t);
                return (
                  n.length >= 3
                    ? (this.filteredCards = r.map(function (e) {
                      return t.reduce(function (e, t) {
                        return ga(e, t, n);
                      }, e);
                    }))
                    : (this.filteredCards = r),
                  this
                );
              },
            },
            {
              key: "sortCards",
              value: function (e, t) {
                if (!this.filteredCards.length) return this;
                var n;
                switch (e ? e.sort.toLowerCase() : null) {
                  case q.DATEASC:
                    return (this.filteredCards = Ca(this.filteredCards)), this;
                  case q.DATEDESC:
                    return (this.filteredCards = ((n = this.filteredCards), Ca(n).reverse())), this;
                  case q.EVENTSORT:
                    var r = (function () {
                      return fa(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], arguments.length > 1 ? arguments[1] : void 0);
                    })(this.filteredCards, t),
                      o = r.nextTransitionMs,
                      a = r.visibleSessions,
                      i = void 0 === a ? [] : a;
                    return (this.filteredCards = i), o > 0 && (this.nextTransitionMs = o), this;
                  case q.FEATURED:
                    return (this.filteredCards = this.filteredCards), this;
                  case q.TITLEASC:
                    return (this.filteredCards = wa(this.filteredCards)), this;
                  case q.TITLEDESC:
                    return (
                      (this.filteredCards = (function (e) {
                        return wa(e).reverse();
                      })(this.filteredCards)),
                      this
                    );
                  case q.RANDOM:
                    return (this.filteredCards = xa(this.filteredCards, this.randomSortId, this.reservoirSize)), this;
                  default:
                    return this;
                }
              },
            },
            {
              key: "keepCardsWithinDateRange",
              value: function () {
                return this.filteredCards.length
                  ? ((this.filteredCards = (function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                      t = new Date().getTime();
                    return e.filter(function (e) {
                      var n = x(e, "showCard.from", ""),
                        r = x(e, "showCard.until", "");
                      if (!n || !r) return !0;
                      var o = ki(n),
                        a = ki(r);
                      return t >= o && t <= a;
                    });
                  })(this.filteredCards)),
                    this)
                  : this;
              },
            },
            {
              key: "keepBookmarkedCardsOnly",
              value: function (e, t, n) {
                return (
                  (e || n) &&
                  (this.filteredCards = this.filteredCards.filter(function (e) {
                    return t.includes(e.id);
                  })),
                  this
                );
              },
            },
            {
              key: "truncateList",
              value: function (e) {
                return this.filteredCards.length ? ((this.filteredCards = ((t = e), (n = this.filteredCards), t < 0 ? n : n.slice(0, t))), this) : this;
                var t, n;
              },
            },
          ]),
          n && Ei(t.prototype, n),
          r && Ei(t, r),
          e
        );
      })(),
        xi = { onClick: c.func.isRequired },
        Si = function (e) {
          var n = e.onClick;
          return t().createElement("button", { "data-testid": "search-icon", type: "button", className: "consonant-SearchIco", onClick: n, tabIndex: "0" }, t().createElement("span", null));
        };
      Si.propTypes = xi;
      var Oi = Si,
        Pi = { handleCheck: c.func.isRequired, stopPropagation: c.func.isRequired, clipWrapperItemsCount: c.number.isRequired, items: (0, c.arrayOf)((0, c.shape)(at)).isRequired },
        Ai = function (e) {
          var n = e.items,
            r = e.handleCheck,
            o = e.stopPropagation,
            a = e.clipWrapperItemsCount,
            i = n.length >= a,
            s = l()({ "consonant-TopFilter-items": !0, "consonant-TopFilter-items--clipped": i });
          return t().createElement(
            "ul",
            { "data-testid": "consonant-TopFilter-items", className: s },
            n.map(function (e) {
              return t().createElement(
                "li",
                { key: e.id, "data-testid": "consonant-TopFilter-item", "daa-ll": e.label, className: "consonant-TopFilter-item" },
                t().createElement(
                  "label",
                  { htmlFor: e.id, className: "consonant-TopFilter-itemLabel", onClick: o },
                  t().createElement("input", { "data-testid": "consonant-TopFilter-itemCheckbox", id: e.id, value: e.id, type: "checkbox", onChange: r, checked: e.selected, tabIndex: "0" }),
                  t().createElement("span", { className: "consonant-TopFilter-itemCheckmark" }),
                  t().createElement("span", { className: "consonant-TopFilter-itemName" }, e.label)
                )
              );
            })
          );
        };
      Ai.propTypes = Pi;
      var Fi = { clearFilterText: c.string, numItemsSelected: c.number, mobileFooterBtnText: c.string, handleClear: c.func.isRequired, handleToggle: c.func.isRequired, mobileGroupTotalResultsText: c.string },
        Ii = function (e) {
          var n = e.mobileGroupTotalResultsText,
            r = e.numItemsSelected,
            o = e.handleClear,
            a = e.clearFilterText,
            i = e.handleToggle,
            s = e.mobileFooterBtnText,
            l = r > 0;
          return t().createElement(
            "div",
            { className: "consonant-TopFilter-footer" },
            t().createElement("span", { className: "consonant-TopFilter-footerResQty" }, n),
            l && t().createElement("button", { "data-testid": "consonant-TopFilter-footerClearBtn", type: "button", onClick: o, className: "consonant-TopFilter-footerClearBtn", tabIndex: "0" }, a),
            t().createElement("button", { type: "button", onClick: i, className: "consonant-TopFilter-footerBtn", tabIndex: "0" }, s)
          );
        };
      function Ni(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function Li(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var n = null == e ? null : ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
            if (null != n) {
              var r,
                o,
                a = [],
                i = !0,
                s = !1;
              try {
                for (n = n.call(e); !(i = (r = n.next()).done) && (a.push(r.value), !t || a.length !== t); i = !0);
              } catch (e) {
                (s = !0), (o = e);
              } finally {
                try {
                  i || null == n.return || n.return();
                } finally {
                  if (s) throw o;
                }
              }
              return a;
            }
          })(e, t) ||
          (function (e, t) {
            if (!e) return;
            if ("string" == typeof e) return Ni(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(n);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Ni(e, t);
          })(e, t) ||
          (function () {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          })()
        );
      }
      (Ii.propTypes = Fi), (Ii.defaultProps = { numItemsSelected: 0, clearFilterText: "", mobileFooterBtnText: "", mobileGroupTotalResultsText: "" });
      var Ri = {
        id: c.string.isRequired,
        name: c.string.isRequired,
        clearFilterText: c.string,
        numItemsSelected: c.number,
        onCheck: c.func.isRequired,
        results: c.number.isRequired,
        onClearAll: c.func.isRequired,
        items: (0, c.arrayOf)((0, c.shape)(at)).isRequired,
      },
        _i = function (e) {
          var n = e.name,
            r = e.id,
            o = e.items,
            a = e.numItemsSelected,
            i = e.onCheck,
            s = e.onClearAll,
            c = e.results,
            u = e.clearFilterText,
            d = Re(),
            f = d("filterPanel", "i18n.topPanel.mobile.group.totalResultsText").replace("{total}", c),
            p = d("filterPanel", "i18n.topPanel.mobile.group.applyBtnText"),
            m = d("filterPanel", "i18n.topPanel.mobile.group.doneBtnText"),
            h = Li(Le(r), 2),
            y = h[0],
            g = h[1],
            v = y === r,
            b = a > 0 ? p : m,
            w = o.filter(function (e) {
              return e.selected;
            }),
            C = w.length > 0,
            k = w.length > 0 ? "".concat(w.length) : "",
            E = v,
            x = !v,
            S = o.length >= 9,
            O = l()({ "consonant-TopFilter": !0, "is-opened": E, "is-selected": C && x }),
            P = "".concat(n, " ").concat(v ? "Close" : "Open");
          return t().createElement(
            "div",
            { "data-testid": "consonant-TopFilter", "daa-lh": P, className: O },
            t().createElement(
              "div",
              { className: "consonant-TopFilter-inner" },
              t().createElement(
                "h3",
                { className: "consonant-TopFilter-name" },
                t().createElement(
                  "button",
                  { type: "button", className: "consonant-TopFilter-link", "data-testid": "consonant-TopFilter-link", onClick: g, tabIndex: "0" },
                  n,
                  t().createElement("span", { className: "consonant-TopFilter-selectedItemsQty" }, k)
                )
              ),
              t().createElement(
                "div",
                { className: "consonant-TopFilter-selectedItems" },
                t().createElement(
                  "div",
                  { className: "consonant-TopFilter-absoluteWrapper" },
                  t().createElement(Ai, {
                    clipWrapperItemsCount: 9,
                    handleCheck: function (e) {
                      e.stopPropagation(), i(r, e.target.value, e.target.checked);
                    },
                    stopPropagation: T,
                    items: o,
                  }),
                  S && t().createElement("aside", { className: "consonant-TopFilter-bg" }),
                  t().createElement(Ii, {
                    mobileFooterBtnText: b,
                    handleToggle: g,
                    clearFilterText: u,
                    handleClear: function (e) {
                      e.stopPropagation(), s(r);
                    },
                    numItemsSelected: a,
                    mobileGroupTotalResultsText: f,
                  })
                )
              )
            )
          );
        };
      function Di(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function Bi(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var n = null == e ? null : ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
            if (null != n) {
              var r,
                o,
                a = [],
                i = !0,
                s = !1;
              try {
                for (n = n.call(e); !(i = (r = n.next()).done) && (a.push(r.value), !t || a.length !== t); i = !0);
              } catch (e) {
                (s = !0), (o = e);
              } finally {
                try {
                  i || null == n.return || n.return();
                } finally {
                  if (s) throw o;
                }
              }
              return a;
            }
          })(e, t) ||
          (function (e, t) {
            if (!e) return;
            if ("string" == typeof e) return Di(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(n);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Di(e, t);
          })(e, t) ||
          (function () {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          })()
        );
      }
      (_i.propTypes = Ri), (_i.defaultProps = { numItemsSelected: 0, clearFilterText: "" });
      var Mi = {
        resQty: c.number,
        showLimitedFiltersQty: c.bool,
        sortComponent: c.node.isRequired,
        windowWidth: c.number.isRequired,
        onFilterClick: c.func.isRequired,
        onShowAllClick: c.func.isRequired,
        searchComponent: c.node.isRequired,
        filters: (0, c.arrayOf)((0, c.shape)(it)),
        onCheckboxClick: c.func.isRequired,
        onClearAllFilters: c.func.isRequired,
        onClearFilterItems: c.func.isRequired,
        filterPanelEnabled: c.bool.isRequired,
      },
        ji = function (e) {
          var n = e.filters,
            r = e.resQty,
            o = e.onCheckboxClick,
            a = e.onFilterClick,
            i = e.onClearAllFilters,
            s = e.onClearFilterItems,
            c = e.showLimitedFiltersQty,
            u = e.onShowAllClick,
            d = e.windowWidth,
            f = e.searchComponent,
            p = e.sortComponent,
            m = e.filterPanelEnabled,
            h = Re(),
            y = h("search", "enabled"),
            g = h("filterPanel", "i18n.topPanel.mobile.group.clearFilterText"),
            v = h("filterPanel", "i18n.topPanel.clearAllFiltersText"),
            b = h("filterPanel", "topPanel.mobile.blurFilters"),
            w = h("collection", "showTotalResults"),
            C = h("collection", "i18n.totalResultsText"),
            k = h("sort", "enabled"),
            T = h("sort", "options"),
            x = h("filterPanel", "i18n.topPanel.groupLabel"),
            O = h("filterPanel", "i18n.topPanel.moreFiltersBtnText"),
            P = h("collection", "i18n.title"),
            A = h("collection", "useLightText"),
            F = "top-search",
            I = Bi(Le(F), 2),
            N = I[0],
            L = I[1],
            R = Jo(C, r),
            _ = E(n),
            D = d < 768,
            B = d >= 768,
            M = n.length > 3,
            j = k && T.length > 0,
            q = n.length > 0 && m,
            U = M && B && c,
            H = P || w,
            W = f && D,
            z = _ || n.length >= 3,
            V = l()({ "consonant-TopFilters": !0, "consonant-TopFilters--withLightText": A }),
            Q = l()({ "consonant-TopFilters-filters": !0, "consonant-TopFilters-filters--truncated": c }),
            G = l()({ "consonant-TopFilters-clearBtnWrapper": !0, "consonant-TopFilters-clearBtnWrapper--withBlur": b && n.length > 1 }),
            $ = N === F,
            K = q || y || j || H;
          return t().createElement(
            "div",
            { "data-testid": "consonant-TopFilters", "daa-lh": "Filters", className: V },
            W && t().createElement("div", { "data-testid": "consonant-TopFilters-searchWrapper", className: "consonant-TopFilters-searchWrapper" }, f),
            K &&
            t().createElement(
              "div",
              { className: "consonant-TopFilters-inner" },
              q &&
              t().createElement(
                "div",
                { className: "consonant-TopFilters-filtersWrapper" },
                B && t().createElement("strong", { className: "consonant-TopFilters-title" }, x),
                t().createElement(
                  "div",
                  { "data-testid": "consonant-TopFilters-filters", className: Q },
                  n.map(function (e) {
                    return t().createElement(_i, {
                      key: e.id,
                      name: e.group,
                      items: e.items,
                      numItemsSelected: S(e.items),
                      results: r,
                      id: e.id,
                      isOpened: e.opened,
                      onCheck: o,
                      onClick: a,
                      onClearAll: s,
                      clearFilterText: g,
                      isTopFilter: !0,
                    });
                  }),
                  U && t().createElement("button", { type: "button", "data-testid": "consonant-TopFilters-moreBtn", className: "consonant-TopFilters-moreBtn", onClick: u }, O)
                ),
                z &&
                t().createElement(
                  "div",
                  { "data-testid": "consonant-TopFilters-clearBtnWrapper", className: G },
                  _ && t().createElement("button", { type: "button", "data-testid": "consonant-TopFilters-clearBtn", className: "consonant-TopFilters-clearBtn", onClick: i, tabIndex: "0" }, v)
                )
              ),
              y && B && t().createElement("div", { "data-testid": "consonant-TopFilters-searchIcoWrapper", className: "consonant-TopFilters-searchIcoWrapper" }, $ && f, B && t().createElement(Oi, { onClick: L })),
              j && t().createElement("div", { "data-testid": "consonant-TopFilters-selectWrapper", className: "consonant-TopFilters-selectWrapper" }, p),
              H &&
              t().createElement(
                "div",
                { className: "consonant-TopFilters-infoWrapper" },
                P && t().createElement("h3", { "data-testid": "consonant-TopFilters-collectionTitle", className: "consonant-TopFilters-collectionTitle" }, P),
                w && t().createElement("div", { "data-testid": "consonant-TopFilters-results", className: "consonant-TopFilters-results" }, R)
              )
            )
          );
        };
      (ji.propTypes = Mi), (ji.defaultProps = { resQty: 0, filters: [], showLimitedFiltersQty: !1 });
      var qi = ji,
        Ui = { handleCheck: c.func.isRequired, items: (0, c.arrayOf)((0, c.shape)(at)).isRequired },
        Hi = function (e) {
          var n = e.items,
            r = e.handleCheck;
          return t().createElement(
            "ul",
            { "data-testid": "consonant-LeftFilter-items", className: "consonant-LeftFilter-items" },
            n.map(function (e) {
              return t().createElement(
                "li",
                { key: e.id, "data-testid": "consonant-LeftFilter-itemsItem", "daa-ll": e.label, className: "consonant-LeftFilter-itemsItem" },
                t().createElement(
                  "label",
                  { htmlFor: e.id, className: "consonant-LeftFilter-itemsItemLabel" },
                  t().createElement("input", { "data-testid": "consonant-LeftFilter-itemsItemCheckbox", id: e.id, value: e.id, "daa-im": e.label, type: "checkbox", onChange: r, checked: e.selected, tabIndex: "0" }),
                  t().createElement("span", { className: "consonant-LeftFilter-itemsItemCheckmark" }),
                  t().createElement("span", { className: "consonant-LeftFilter-itemsItemName" }, e.label)
                )
              );
            })
          );
        };
      Hi.propTypes = Ui;
      var Wi = { ctaText: c.string, clearFilterText: c.string, numItemsSelected: c.number, handleClear: c.func.isRequired, handleClick: c.func.isRequired, mobileGroupTotalResultsText: c.string },
        zi = function (e) {
          var n = e.mobileGroupTotalResultsText,
            r = e.numItemsSelected,
            o = e.handleClear,
            a = e.clearFilterText,
            i = e.handleClick,
            s = e.ctaText;
          return t().createElement(
            "div",
            { className: "consonant-LeftFilter-footer" },
            t().createElement("span", { className: "consonant-LeftFilter-footerResQty" }, n),
            r > 0 && t().createElement("button", { type: "button", onClick: o, className: "consonant-LeftFilter-footerClearBtn" }, a),
            t().createElement("button", { type: "button", onClick: i, className: "consonant-LeftFilter-footerBtn" }, s)
          );
        };
      (zi.propTypes = Wi), (zi.defaultProps = { ctaText: "", numItemsSelected: 0, clearFilterText: "", mobileGroupTotalResultsText: "" });
      var Vi = { numItemsSelected: c.number, handleClear: c.func.isRequired },
        Qi = function (e) {
          var n = e.numItemsSelected,
            r = e.handleClear,
            o = n > 0 ? "".concat(n) : "";
          return t().createElement("button", { "data-testid": "consonant-LeftFilter-itemBadge", type: "button", className: "consonant-LeftFilter-itemBadge", onClick: r, tabIndex: "0" }, o);
        };
      (Qi.propTypes = Vi), (Qi.defaultProps = { numItemsSelected: 0 });
      var Gi = {
        icon: c.string,
        isOpened: c.bool,
        id: c.string.isRequired,
        clearFilterText: c.string,
        name: c.string.isRequired,
        onCheck: c.func.isRequired,
        onClick: c.func.isRequired,
        numItemsSelected: c.number,
        results: c.number.isRequired,
        onClearAll: c.func.isRequired,
        items: (0, c.arrayOf)((0, c.shape)(at)).isRequired,
      },
        $i = function (e) {
          var n = e.name,
            r = e.icon,
            o = e.id,
            a = e.items,
            i = e.numItemsSelected,
            s = e.isOpened,
            c = e.onCheck,
            u = e.onClick,
            d = e.onClearAll,
            f = e.results,
            p = e.clearFilterText,
            m = Re(),
            h = m("filterPanel", "i18n.leftPanel.mobile.group.totalResultsText").replace("{total}", f),
            y = m("filterPanel", "i18n.leftPanel.mobile.group.applyBtnText"),
            g = m("filterPanel", "i18n.leftPanel.mobile.group.doneBtnText"),
            v = i > 0 ? y : g,
            b = i > 0 ? "+".concat(i) : "",
            w = i > 0,
            C = a.filter(function (e) {
              return e.selected;
            }),
            k = C.map(function (e, t) {
              return t === C.length - 1 ? e.label : "".concat(e.label, ", ");
            }),
            E = function (e) {
              e.preventDefault(), u(o);
            },
            T = function () {
              return d(o);
            },
            x = l()({ "consonant-LeftFilter": !0, "consonant-LeftFilter is-opened": s }),
            S = "".concat(n, " ").concat(s ? "Close" : "Open");
          return t().createElement(
            "div",
            { "data-testid": "consonant-LeftFilter", "daa-lh": n, className: x },
            t().createElement(
              "div",
              { className: "consonant-LeftFilter-inner" },
              t().createElement(
                "h3",
                { "data-testid": "consonant-LeftFilter-name", className: "consonant-LeftFilter-name", "daa-ll": S },
                r && t().createElement("img", { src: r, width: "16", alt: "", loading: "lazy" }),
                t().createElement(
                  "button",
                  { type: "button", "data-testid": "consonant-LeftFilter-link", className: "consonant-LeftFilter-link", onClick: E, tabIndex: "0" },
                  n,
                  t().createElement("div", { className: "consonant-LeftFilter-selectedItemsQty", "data-qty": b }, k)
                )
              ),
              w && t().createElement(Qi, { handleClear: T, numItemsSelected: i }),
              t().createElement(Hi, {
                items: a,
                handleCheck: function (e) {
                  e.stopPropagation(), c(o, e.target.value, e.target.checked);
                },
              }),
              t().createElement(zi, { ctaText: v, handleClick: E, clearFilterText: p, handleClear: T, numItemsSelected: i, mobileGroupTotalResultsText: h })
            )
          );
        };
      ($i.propTypes = Gi), ($i.defaultProps = { icon: "", isOpened: !1, numItemsSelected: 0, clearFilterText: "" });
      var Ki = $i,
        Xi = { id: c.string.isRequired, name: c.string.isRequired, onClick: c.func.isRequired, parentId: c.string.isRequired },
        Yi = function (e) {
          var n = e.name,
            r = e.id,
            o = e.parentId,
            a = e.onClick;
          return t().createElement(
            "button",
            {
              type: "button",
              onClick: function () {
                a(o, r, !1);
              },
              "data-testid": "consonant-ChosenFilter",
              className: "consonant-ChosenFilter",
              tabIndex: "0",
            },
            n
          );
        };
      Yi.propTypes = Xi;
      var Zi = Yi,
        Ji = { onClick: c.func.isRequired, leftPanelMobileHeader: c.string },
        es = (0, e.forwardRef)(function (e, n) {
          var r = e.onClick,
            o = e.leftPanelMobileHeader;
          return t().createElement(
            "div",
            { className: "consonant-LeftFilters-mobTitle" },
            t().createElement("button", { "data-testid": "consonant-LeftFilters-mobBack", type: "button", onClick: r, className: "consonant-LeftFilters-mobBack", ref: n }),
            t().createElement("span", null, o)
          );
        });
      (es.propTypes = Ji), (es.defaultProps = { leftPanelMobileHeader: "" });
      var ts = { panelHeader: c.string },
        ns = function (e) {
          var n = e.panelHeader;
          return t().createElement("h3", { className: "consonant-LeftFilters-deskTitle" }, n);
        };
      (ns.propTypes = ts), (ns.defaultProps = { panelHeader: "" });
      var rs = {
        resQty: c.number,
        doneText: c.string,
        applyText: c.string,
        showTotalResults: c.bool,
        clearAllFiltersText: c.string,
        someFiltersAreSelected: c.bool,
        showTotalResultsText: c.string,
        onClearAllFilters: c.func.isRequired,
        onMobileFiltersToggleClick: c.func.isRequired,
      },
        os = function (e) {
          var n = e.showTotalResults,
            r = e.resQty,
            o = e.onClearAllFilters,
            a = e.clearAllFiltersText,
            i = e.onMobileFiltersToggleClick,
            s = e.someFiltersAreSelected,
            l = e.applyText,
            c = e.doneText,
            u = e.showTotalResultsText,
            d = s ? l : c;
          return t().createElement(
            "div",
            { className: "consonant-LeftFilters-mobileFooter" },
            n && t().createElement("span", { "data-testid": "consonant-LeftFilters-mobileFooterTotalResQty", className: "consonant-LeftFilters-mobileFooterTotalResQty" }, u.replace("{total}", r)),
            s && t().createElement("button", { type: "button", "data-testid": "consonant-LeftFilters-mobileFooterClearBtn", className: "consonant-LeftFilters-mobileFooterClearBtn", onClick: o }, a),
            t().createElement("button", { type: "button", "data-testid": "consonant-LeftFilters-mobileFooterBtn", className: "consonant-LeftFilters-mobileFooterBtn", onClick: i }, d)
          );
        };
      (os.propTypes = rs), (os.defaultProps = { resQty: 0, doneText: "", applyText: "", showTotalResults: !1, clearAllFiltersText: "", showTotalResultsText: "", someFiltersAreSelected: !1 });
      var as = { clearAllFiltersText: c.string, onClearAllFilters: c.func.isRequired },
        is = function (e) {
          var n = e.onClearAllFilters,
            r = e.clearAllFiltersText;
          return t().createElement("button", { type: "button", "data-testid": "consonant-LeftFilters-clearLink", className: "consonant-LeftFilters-clearLink", onClick: n, tabIndex: "0" }, r);
        };
      (is.propTypes = as), (is.defaultProps = { clearAllFiltersText: "" });
      var ss = {
        resQty: c.number,
        windowWidth: c.number,
        showMobileFilters: c.bool,
        selectedFiltersQty: c.number,
        onFilterClick: c.func.isRequired,
        onCheckboxClick: c.func.isRequired,
        searchComponent: c.node.isRequired,
        bookmarkComponent: c.node.isRequired,
        onClearAllFilters: c.func.isRequired,
        filters: (0, c.arrayOf)((0, c.shape)(it)),
        onClearFilterItems: c.func.isRequired,
        onSelectedFilterClick: c.func.isRequired,
        onMobileFiltersToggleClick: c.func.isRequired,
      },
        ls = { resQty: 0, filters: [], selectedFiltersQty: 0, showMobileFilters: !1, windowWidth: window.innerWidth },
        cs = (0, e.forwardRef)(function (e, n) {
          var r = e.filters,
            o = e.selectedFiltersQty,
            a = e.showMobileFilters,
            i = e.onFilterClick,
            s = e.onClearAllFilters,
            c = e.onClearFilterItems,
            u = e.onCheckboxClick,
            d = e.onMobileFiltersToggleClick,
            f = e.onSelectedFilterClick,
            p = e.resQty,
            m = e.searchComponent,
            h = e.bookmarkComponent,
            y = e.windowWidth,
            g = Re(),
            v = g("collection", "showTotalResults"),
            b = g("filterPanel", "i18n.leftPanel.clearAllFiltersText"),
            w = g("bookmarks", "leftFilterPanel.showBookmarksFilter"),
            C = g("search", "enabled"),
            k = g("filterPanel", "i18n.leftPanel.header"),
            T = g("filterPanel", "i18n.leftPanel.mobile.panel.totalResultsText"),
            x = g("filterPanel", "i18n.leftPanel.mobile.panel.clearFilterText"),
            O = g("filterPanel", "i18n.leftPanel.mobile.panel.header"),
            P = g("filterPanel", "i18n.leftPanel.mobile.panel.applyBtnText"),
            A = g("filterPanel", "i18n.leftPanel.mobile.panel.doneBtnText"),
            F = E(r),
            I = 1200,
            N = y >= I,
            L = y < I,
            R = y >= I && C,
            _ = y >= I && o > 0,
            D = r.length > 0,
            B = l()({ "consonant-LeftFilters": !0, "consonant-LeftFilters is-opened": a });
          return t().createElement(
            "div",
            { "data-testid": "consonant-LeftFilters", "daa-lh": "Filters", className: B },
            t().createElement(
              "div",
              { className: "consonant-LeftFilters-header" },
              L && t().createElement(es, { onClick: d, leftPanelMobileHeader: O, ref: n }),
              N && t().createElement(ns, { panelHeader: k }),
              N && t().createElement(is, { clearAllFiltersText: b, onClearAllFilters: s, panelHeader: k })
            ),
            R && m,
            _ &&
            t().createElement(
              "div",
              { className: "consonant-LeftFilters-chosenFilters" },
              r.map(function (e) {
                return e.items.map(function (n) {
                  return n.selected && t().createElement(Zi, { key: n.id, name: n.label, id: n.id, parentId: e.id, onClick: f });
                });
              })
            ),
            w && h,
            D &&
            t().createElement(
              "div",
              { className: "consonant-LeftFilters-list" },
              r.map(function (e) {
                return t().createElement(Ki, {
                  key: e.id,
                  name: e.group,
                  icon: e.icon,
                  items: e.items,
                  numItemsSelected: S(e.items),
                  results: p,
                  id: e.id,
                  isOpened: e.opened,
                  onCheck: u,
                  onClick: i,
                  onClearAll: c,
                  clearFilterText: x,
                });
              })
            ),
            L &&
            t().createElement(os, {
              doneText: A,
              applyText: P,
              someFiltersAreSelected: F,
              showTotalResultsText: T,
              onMobileFiltersToggleClick: d,
              clearAllFiltersText: b,
              onClearAllFilters: s,
              resQty: p,
              showTotalResults: v,
            })
          );
        });
      (cs.propTypes = ss), (cs.defaultProps = ls);
      var us = cs;
      function ds(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }
      function fs(e, t, n) {
        return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
      }
      function ps(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {},
            r = Object.keys(n);
          "function" == typeof Object.getOwnPropertySymbols &&
            (r = r.concat(
              Object.getOwnPropertySymbols(n).filter(function (e) {
                return Object.getOwnPropertyDescriptor(n, e).enumerable;
              })
            )),
            r.forEach(function (t) {
              fs(e, t, n[t]);
            });
        }
        return e;
      }
      var ms = (function () {
        function e(t) {
          !(function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          })(this, e),
            (this.processedCards = t);
        }
        var t, n, r;
        return (
          (t = e),
          (n = [
            {
              key: "removeDuplicateCards",
              value: function () {
                var e, t, n, r;
                return (
                  (this.processedCards =
                    ((e = this.processedCards),
                      (t = "id"),
                      (n = []),
                      (r = new Set()),
                      e.forEach(function (e) {
                        r.has(e[t]) || (n.push(e), r.add(e[t]));
                      }),
                      n)),
                  this
                );
              },
            },
            {
              key: "addFeaturedCards",
              value: function (e) {
                var t = e.map(function (e) {
                  return ps({}, e, { isFeatured: !0 });
                });
                return (this.processedCards = t.concat(this.processedCards)), this;
              },
            },
            {
              key: "addCardMetaData",
              value: function (e, t, n) {
                return (
                  (this.processedCards = this.processedCards.map(function (r) {
                    return ps({}, r, {
                      description: ((o = x(r, "contentArea.description", "")), (a = e), o.length <= a ? o : "".concat(o.slice(0, a), "...")),
                      isBookmarked: n.some(function (e) {
                        return e === r.id;
                      }),
                      disableBookmarkIco: t,
                      initial: {
                        title: x(r, "contentArea.title", ""),
                        description: x(r, "contentArea.description", ""),
                        bannerText: x(r, "overlays.banner.description", ""),
                        dateDetailText: x(r, "contentArea.dateTetailText", ""),
                        detailText: x(r, "contentArea.detailText", ""),
                      },
                    });
                    var o, a;
                  })),
                  this
                );
              },
            },
          ]),
          n && ds(t.prototype, n),
          r && ds(t, r),
          e
        );
      })(),
        hs = { selectedFiltersQty: c.number, mobileFilterBtnLabel: c.string, onMobileFiltersToggleClick: c.func.isRequired },
        ys = (0, e.forwardRef)(function (e, n) {
          var r = e.selectedFiltersQty,
            o = e.mobileFilterBtnLabel,
            a = e.onMobileFiltersToggleClick,
            i = r > 0,
            s = l()({ "consonant-FiltersInfo-btn": !0, "consonant-FiltersInfo-btn--withFilters": i });
          return t().createElement(
            "div",
            { "data-testid": "consonant-FiltersInfo-btnWrapper", className: "consonant-FiltersInfo-btnWrapper" },
            t().createElement(
              "button",
              { type: "button", "data-testid": "consonant-FiltersInfo-btn", className: s, onClick: a, ref: n },
              t().createElement("span", { className: "consonant-FiltersInfo-btnIco" }),
              t().createElement("span", { className: "consonant-FiltersInfo-btnText" }, o),
              i && t().createElement("span", { "data-testid": "consonant-FiltersInfo-btnSelected", className: "consonant-FiltersInfo-btnSelected" }, r)
            )
          );
        });
      (ys.propTypes = hs), (ys.defaultProps = { selectedFiltersQty: 0, mobileFilterBtnLabel: "" });
      var gs = {
        cardsQty: c.number,
        filtersQty: c.number,
        windowWidth: c.number,
        enabled: c.bool.isRequired,
        selectedFiltersQty: c.number,
        sortComponent: c.node.isRequired,
        searchComponent: c.node.isRequired,
        onMobileFiltersToggleClick: c.func.isRequired,
        sortOptions: (0, c.arrayOf)((0, c.shape)(pt)).isRequired,
      },
        vs = { cardsQty: 0, filtersQty: 0, selectedFiltersQty: 0, windowWidth: window.innerWidth },
        bs = (0, e.forwardRef)(function (e, n) {
          var r = e.enabled,
            o = e.filtersQty,
            a = e.cardsQty,
            i = e.selectedFiltersQty,
            s = e.onMobileFiltersToggleClick,
            c = e.searchComponent,
            u = e.sortComponent,
            d = e.sortOptions,
            f = e.windowWidth,
            p = Re(),
            m = p("collection", "i18n.title"),
            h = p("collection", "showTotalResults"),
            y = p("collection", "i18n.totalResultsText"),
            g = p("search", "enabled"),
            v = p("sort", "enabled"),
            b = p("filterPanel", "i18n.leftPanel.mobile.filtersBtnLabel"),
            w = p("collection", "useLightText"),
            C = Jo(y, a),
            k = f < 1200,
            E = v && d.length > 0,
            T = g && k,
            x = k && o > 0 && r,
            S = m || h,
            O = l()({ "consonant-FiltersInfo": !0, "consonant-FiltersInfo--withLightText": w }),
            P = l()({ "consonant-FiltersInfo-wrapper": !0, "consonant-FiltersInfo-wrapper--noLine": !v || !d.length });
          return t().createElement(
            "aside",
            { "data-testid": "consonant-FiltersInfo", className: O },
            T && t().createElement("div", { className: "consonant-FiltersInfo-search" }, c),
            x && t().createElement(ys, { selectedFiltersQty: i, mobileFilterBtnLabel: b, onMobileFiltersToggleClick: s, ref: n }),
            E && u,
            S &&
            t().createElement(
              "div",
              { className: P },
              m && t().createElement("h3", { "data-testid": "consonant-FiltersInfo-title", className: "consonant-FiltersInfo-title" }, m),
              h && t().createElement("div", { "data-testid": "consonant-FiltersInfo-results", className: "consonant-FiltersInfo-results" }, C)
            )
          );
        });
      function ws(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function Cs(e, t, n) {
        return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
      }
      function ks(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {},
            r = Object.keys(n);
          "function" == typeof Object.getOwnPropertySymbols &&
            (r = r.concat(
              Object.getOwnPropertySymbols(n).filter(function (e) {
                return Object.getOwnPropertyDescriptor(n, e).enumerable;
              })
            )),
            r.forEach(function (t) {
              Cs(e, t, n[t]);
            });
        }
        return e;
      }
      function Es(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var n = null == e ? null : ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
            if (null != n) {
              var r,
                o,
                a = [],
                i = !0,
                s = !1;
              try {
                for (n = n.call(e); !(i = (r = n.next()).done) && (a.push(r.value), !t || a.length !== t); i = !0);
              } catch (e) {
                (s = !0), (o = e);
              } finally {
                try {
                  i || null == n.return || n.return();
                } finally {
                  if (s) throw o;
                }
              }
              return a;
            }
          })(e, t) ||
          xs(e, t) ||
          (function () {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          })()
        );
      }
      function Ts(e) {
        return (
          (function (e) {
            if (Array.isArray(e)) return ws(e);
          })(e) ||
          (function (e) {
            if (("undefined" != typeof Symbol && null != e[Symbol.iterator]) || null != e["@@iterator"]) return Array.from(e);
          })(e) ||
          xs(e) ||
          (function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          })()
        );
      }
      function xs(e, t) {
        if (e) {
          if ("string" == typeof e) return ws(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(n) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? ws(e, t) : void 0;
        }
      }
      (bs.propTypes = gs), (bs.defaultProps = vs);
      var Ss = function (n) {
        var r,
          o = n.config,
          a = Se(o),
          i = a("filterPanel", "enabled"),
          s = a("filterPanel", "type"),
          c = a("pagination", "type"),
          u = a("pagination", "enabled"),
          f = a("collection", "resultsPerPage"),
          p = a("bookmarks", "leftFilterPanel.bookmarkOnlyCollection"),
          m = a("filterPanel", "filters"),
          h = a("filterPanel", "filterLogic").toLowerCase().trim(),
          y = a("collection", "totalCardsToShow"),
          g = a("collection", "reservoir.sample"),
          b = a("search", "searchFields"),
          w = a("sort", "options"),
          C = (function (e, t) {
            var n = Se(e)("sort", "options"),
              r = q[t.toUpperCase()];
            return (
              n.find(function (e) {
                return e.sort === t;
              }) || { label: r || "Featured", sort: r || "featured" }
            );
          })(o, a("sort", "defaultSort")),
          E = a("featuredCards", ""),
          T = a("search", "i18n.leftFilterPanel.searchPlaceholderText"),
          A = a("search", "i18n.topFilterPanel.searchPlaceholderText"),
          F = a("search", "i18n.filterInfo.searchPlaceholderText"),
          I = a("search", "i18n.noResultsTitle"),
          N = a("search", "i18n.noResultsDescription"),
          R = a("collection", "i18n.onErrorTitle"),
          W = a("collection", "i18n.onErrorDescription"),
          z = a("analytics", "trackImpressions"),
          V = a("analytics", "collectionIdentifier"),
          Q = a("target", "enabled"),
          G = a("collection", "mode"),
          $ = a("collection", "layout.container"),
          K = a("filterPanel", "showEmptyFilters"),
          X = a("filterPanel", "eventFilter"),
          Y = a("search", "enabled"),
          Z = a("sort", "enabled"),
          J = window.innerWidth >= 1200,
          ee = h.toLowerCase().trim() === B.XOR,
          oe = $ === Ee,
          ae = $ !== Ee,
          ie = Es((0, e.useState)([]), 2),
          se = ie[0],
          le = (ie[1], Es((0, e.useState)(0), 2)),
          ce = (le[0], le[1], Es(t().useState(), 2)[1]),
          ue = t().useCallback(function () {
            return ce({});
          }, []),
          de = Es(
            (function () {
              var t = window.location,
                n = t.search,
                r = t.pathname,
                o = Ne((0, e.useState)(O(n)), 2),
                a = o[0],
                i = o[1],
                s = (0, e.useCallback)(function (e, t) {
                  i(function (n) {
                    if (!t || (Array.isArray(t) && !t.length)) {
                      var r = Ie({}, n);
                      return delete r[e], r;
                    }
                    return Ie({}, n, Fe({}, e, t));
                  });
                }, []),
                l = (0, e.useCallback)(function () {
                  i({});
                }, []);
              return (
                (0, e.useEffect)(
                  function () {
                    var e = P(a, { array: "comma" }),
                      t = ""
                        .concat(r)
                        .concat(e ? "?" : "")
                        .concat(e);
                    window.history.replaceState(null, "", t);
                  },
                  [a]
                ),
                [a, s, l]
              );
            })(),
            3
          ),
          fe = de[0],
          pe = de[1],
          me = de[2],
          he = Es((0, e.useState)(null), 2),
          ye = he[0],
          ge = he[1],
          ve = Es((0, e.useState)(((r = JSON.parse(localStorage.getItem("bookmarks"))), Array.isArray(r) ? r : [])), 2),
          Te = ve[0],
          Ae = ve[1],
          Le = Es((0, e.useState)(1), 2),
          Re = Le[0],
          _e = Le[1],
          De = Es((0, e.useState)([]), 2),
          Be = De[0],
          Me = De[1],
          je = Es((0, e.useState)(""), 2),
          qe = je[0],
          Ue = je[1],
          He = Es((0, e.useState)(!1), 2),
          We = He[0],
          ze = He[1],
          Ve = Es((0, e.useState)(C), 2),
          Qe = Ve[0],
          Ge = Ve[1];
        Qe.sort === q.RANDOM && (y = g);
        var $e,
          Ke,
          Xe,
          Ye,
          Ze = (($e = function () {
            return { width: window.innerWidth, height: window.innerHeight };
          }),
            (Ke = Ne((0, e.useState)($e()), 2)),
            (Xe = Ke[0]),
            (Ye = Ke[1]),
            (0, e.useEffect)(function () {
              var e = d(function () {
                return Ye($e());
              });
              return (
                window.addEventListener("resize", e),
                function () {
                  return window.removeEventListener("resize", e);
                }
              );
            }, []),
            Xe).width,
          Je = Es((0, e.useState)(!1), 2),
          et = Je[0],
          tt = Je[1],
          nt = Es((0, e.useState)(!1), 2),
          rt = nt[0],
          ot = nt[1],
          at = Es((0, e.useState)("top" === s), 2),
          it = at[0],
          st = at[1],
          lt = Es((0, e.useState)([]), 2),
          ct = lt[0],
          ut = lt[1],
          dt = Es((0, e.useState)(!1), 2),
          ft = dt[0],
          pt = dt[1],
          mt = Es((0, e.useState)(!1), 2),
          ht = mt[0],
          yt = mt[1],
          gt = Es((0, e.useState)(null), 2),
          vt = gt[0],
          bt = gt[1],
          Ct = (0, e.createRef)(),
          kt = (0, e.createRef)(),
          Et = function (e) {
            Me(function (t) {
              var n = (function (e, t) {
                return t.map(function (t) {
                  return t.id !== e
                    ? t
                    : ks({}, t, {
                      items: t.items.map(function (e) {
                        return ks({}, e, { selected: !1 });
                      }),
                    });
                });
              })(e, t);
              return n;
            });
          },
          xt = function () {
            Me(function (e) {
              return e.map(function (e) {
                return ks({}, e, {
                  items: e.items.map(function (e) {
                    return ks({}, e, { selected: !1 });
                  }),
                });
              });
            });
            var e = new URLSearchParams(window.location.search).get("servertime");
            me(), pe("servertime", e);
          },
          St = function () {
            xt(), Ue(""), ot(!1);
          },
          Ot = function (e) {
            Ge(e), ze(!1);
          },
          At = function (e) {
            xt(), Ue(e);
          },
          Ft = function (e) {
            Me(function (t) {
              return t.map(function (t) {
                return ks({}, t, { opened: t.id === e ? !t.opened : t.opened });
              });
            });
          },
          It = function (e, t, n) {
            ee && n && xt(),
              Me(function (n) {
                return n.map(function (n) {
                  return n.id !== e
                    ? n
                    : ks({}, n, {
                      items: n.items.map(function (e) {
                        return ks({}, e, { selected: e.id === t ? !e.selected : e.selected });
                      }),
                    });
                });
              }),
              _e(1),
              (function (e, t, n) {
                var r = Be.find(function (t) {
                  return t.id === e;
                }),
                  o = r.group,
                  a = r.items.find(function (e) {
                    return e.id === t;
                  }).label,
                  i = fe[o] || [];
                "string" == typeof i && (i = i.split(","));
                var s = n
                  ? Ts(i).concat([a])
                  : i.filter(function (e) {
                    return e !== a;
                  });
                pe(o, s);
              })(e, t, n);
          },
          Nt = function () {
            return tt(function (e) {
              return !e;
            });
          },
          Lt = function (e) {
            var t = Te.find(function (t) {
              return t === e;
            });
            Ae(
              t
                ? function (t) {
                  return t.filter(function (t) {
                    return t !== e;
                  });
                }
                : function (t) {
                  return Ts(t).concat([e]);
                }
            );
          };
        (0, e.useEffect)(function () {
          Me(
            m.map(function (e) {
              return ks({}, e, {
                opened: !!J && e.openedOnLoad,
                items: e.items.map(function (e) {
                  return ks({}, e, { selected: !1 });
                }),
              });
            })
          );
        }, []),
          (0, e.useEffect)(function () {
            Me(function (e) {
              return e.map(function (e) {
                var t = e.group,
                  n = e.items,
                  r = fe[t];
                return r
                  ? ks({}, e, {
                    opened: !0,
                    items: n.map(function (e) {
                      return ks({}, e, { selected: r.includes(String(e.label)) });
                    }),
                  })
                  : e;
              });
            });
          }, []),
          (0, e.useEffect)(function () {
            bt(Math.floor(1e13 * Math.random()));
          }, []);
        var Rt = function (e, t) {
          var n,
            r = (n = []).concat.apply(
              n,
              Ts(
                t.map(function (e) {
                  return e.tags.map(function (e) {
                    return e.id;
                  });
                })
              )
            );
          return e
            .map(function (e) {
              return ks({}, e, {
                items: e.items.filter(function (e) {
                  return r.includes(e.id);
                }),
              });
            })
            .filter(function (e) {
              return e.items.length > 0;
            });
        };
        (0, e.useEffect)(function () {
          var e,
            t,
            n = window.__satelliteLoadedPromise,
            r = a("collection", "endpoint"),
            o = a("collection", "fallbackEndpoint");
          function i() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r;
            return window
              .fetch(e, { credentials: "include" })
              .then(function (e) {
                var t = e.ok,
                  n = e.status,
                  r = e.statusText,
                  o = e.url;
                return t
                  ? e.json().then(function (e) {
                    return !!Object.keys(e).length ? e : Promise.reject(new Error("no valid reponse data"));
                  })
                  : Promise.reject(new Error("".concat(n, ": ").concat(r, ", failure for call to ").concat(o)));
              })
              .then(function (e) {
                if ((pt(!1), x(e, "cards.length"))) {
                  var t = new ms(e.cards).addFeaturedCards(E).removeDuplicateCards().addCardMetaData(200, p, Te).processedCards,
                    n = void 0 === t ? [] : t,
                    r = L(n);
                  if ("eventsort" === Qe.sort.toLowerCase())
                    for (; r.size() > 0;)
                      setTimeout(function () {
                        ue();
                      }, r.dequeue().priority + 1e3);
                  ut(n),
                    K ||
                    Me(function (e) {
                      return Rt(e, n);
                    });
                }
              })
              .catch(function () {
                e === r && o ? i(o) : (pt(!1), yt(!0));
              });
          }
          function s(e) {
            var t = new URL(r);
            e.then(function (e) {
              var n = e.getVisitorId();
              t.searchParams.set("mcgvid", n.getMarketingCloudVisitorID()),
                t.searchParams.set("sdid", n.getSupplementalDataID()),
                t.searchParams.set("mboxAAMB", n.getAudienceManagerBlob()),
                t.searchParams.set("mboxMCGLH", n.getAudienceManagerLocationHint()),
                i((r = t.toString()));
            });
          }
          pt(!0),
            Q && n && s(n),
            Q &&
            !n &&
            ((e = 0),
              (t = function () {
                setTimeout(function () {
                  if (e >= 20) return pt(!1), void yt(!0);
                  var n = window.__satelliteLoadedPromise;
                  n && s(n), !n && e < 20 && t(), (e += 1);
                }, 100);
              })()),
            Q || i();
        }, []),
          (0, e.useEffect)(
            function () {
              var e;
              (e = Te), localStorage.setItem("bookmarks", JSON.stringify(e, null, 2)), ut(ka(ct, Te));
            },
            [Te]
          ),
          (0, e.useEffect)(
            function () {
              rt && (xt(), Ue(""));
            },
            [rt]
          ),
          (0, e.useEffect)(
            function () {
              var e;
              (e = et ? Ct.current : kt.current), k(e) || e.focus();
            },
            [et]
          );
        var _t = (function (e) {
          return v(
            e.map(function (e) {
              return e.items;
            })
          )
            .filter(function (e) {
              return e.selected;
            })
            .map(function (e) {
              return e.id;
            });
        })(Be),
          Dt = new Ti(ct, vt, g).sortCards(Qe, X).keepBookmarkedCardsOnly(p, Te, rt).keepCardsWithinDateRange().filterCards(_t, h, B).truncateList(y).searchCards(qe, b),
          Bt = Dt.filteredCards,
          Mt = void 0 === Bt ? [] : Bt,
          jt = (Dt.nextTransitionMs, se.length ? se : Mt),
          qt = (function (e, t) {
            return 0 === e ? 0 : Math.ceil(t / e);
          })(f, jt.length),
          Ut = (function (e, t, n) {
            return Math.min(e * t, n);
          })(f, Re, jt.length),
          Ht = (function (e) {
            var t = v(
              e.map(function (e) {
                return e.items;
              })
            );
            return S(t);
          })(Be),
          Wt = (function (e, t, n) {
            return e && t > 0 && !(n > t);
          })(u, y, jt.length),
          zt = Wt && "loadMore" === c,
          Vt = Wt && "paginator" === c,
          Qt = i && s === M,
          Gt = jt.length > 0,
          $t = Be.length > 0 && Ze < 768 ? U : H,
          Kt = J ? _ : D,
          Xt = s === j,
          Yt = s === M,
          Zt = i || Y || Z || u,
          Jt = "";
        Be.forEach(function (e) {
          e.items
            .filter(function (e) {
              return e.selected;
            })
            .forEach(function (e) {
              Jt += "".concat(e.label, ", ");
            });
        });
        var en = l()({ "consonant-u-themeLight": G === te, "consonant-u-themeDark": G === ne, "consonant-u-themeDarkest": G === re }),
          tn = V ? "".concat(V, " | ") : "",
          nn = Ht ? Jt : "No Filters",
          rn = qe || "None",
          on = "".concat(tn, "Card Collection | Filters: ").concat(nn, "| Search Query: ").concat(rn),
          an = l()({
            "consonant-Wrapper": !0,
            "consonant-Wrapper--32MarginContainer": $ === ke,
            "consonant-Wrapper--83PercentContainier": $ === be,
            "consonant-Wrapper--1200MaxWidth": $ === we,
            "consonant-Wrapper--1600MaxWidth": $ === Ce,
            "consonant-Wrapper--carousel": oe,
            "consonant-Wrapper--withLeftFilter": i && Yt,
          });
        return t().createElement(
          Pe.Provider,
          { value: o },
          t().createElement(
            Oe.Provider,
            { value: { value: ye, setValue: ge } },
            t().createElement(
              "section",
              {
                role: "group",
                "daa-lh": on,
                "daa-im": String(z),
                onClick: function () {
                  ge(null);
                },
                className: "".concat(an, " ").concat(en),
              },
              t().createElement(
                "div",
                { className: "consonant-Wrapper-inner" },
                Qt &&
                ae &&
                t().createElement(
                  "div",
                  { className: "consonant-Wrapper-leftFilterWrapper" },
                  t().createElement(us, {
                    filters: Be,
                    selectedFiltersQty: Ht,
                    windowWidth: Ze,
                    onFilterClick: Ft,
                    onClearAllFilters: St,
                    onClearFilterItems: Et,
                    onCheckboxClick: It,
                    onMobileFiltersToggleClick: Nt,
                    onSelectedFilterClick: It,
                    showMobileFilters: et,
                    resQty: jt.length,
                    bookmarkComponent: t().createElement(yi, {
                      showBookmarks: rt,
                      onClick: function (e) {
                        e.stopPropagation(),
                          ot(function (e) {
                            return !e;
                          }),
                          _e(1);
                      },
                      savedCardsCount: Te.length,
                    }),
                    searchComponent: t().createElement(Tt, { placeholderText: T, name: "filtersSideSearch", value: qe, autofocus: !1, onSearch: At }),
                    ref: Ct,
                  })
                ),
                t().createElement(
                  "div",
                  { className: "consonant-Wrapper-collection".concat(ft ? " is-loading" : "") },
                  Xt &&
                  ae &&
                  t().createElement(qi, {
                    filterPanelEnabled: i,
                    filters: Be,
                    windowWidth: Ze,
                    resQty: jt.length,
                    onCheckboxClick: It,
                    onFilterClick: Ft,
                    onClearFilterItems: Et,
                    onClearAllFilters: St,
                    showLimitedFiltersQty: it,
                    searchComponent: t().createElement(Tt, { placeholderText: A, name: "filtersTopSearch", value: qe, autofocus: J, onSearch: At }),
                    sortComponent: t().createElement(wt, { opened: We, id: "sort", val: Qe, values: w, onSelect: Ot, name: "filtersTopSelect", autoWidth: !0, optionsAlignment: $t }),
                    onShowAllClick: function () {
                      st(function (e) {
                        return !e;
                      });
                    },
                  }),
                  Yt &&
                  ae &&
                  t().createElement(bs, {
                    enabled: i,
                    filtersQty: Be.length,
                    filters: Be,
                    cardsQty: jt.length,
                    selectedFiltersQty: Ht,
                    windowWidth: Ze,
                    onMobileFiltersToggleClick: Nt,
                    searchComponent: t().createElement(Tt, { placeholderText: F, name: "searchFiltersInfo", value: qe, autofocus: !1, onSearch: At }),
                    sortComponent: t().createElement(wt, { opened: We, id: "sort", val: Qe, values: w, onSelect: Ot, autoWidth: !1, optionsAlignment: "right" }),
                    sortOptions: w,
                    ref: kt,
                  }),
                  Gt &&
                  ae &&
                  t().createElement(
                    e.Fragment,
                    null,
                    t().createElement(ei, { resultsPerPage: f, pages: Re, cards: jt, onCardBookmark: Lt, isAriaLiveActive: Zt }),
                    zt &&
                    t().createElement(pi, {
                      onClick: function () {
                        _e(function (e) {
                          return e + 1;
                        }),
                          window.scrollTo(0, window.pageYOffset);
                      },
                      show: Ut,
                      total: jt.length,
                    }),
                    Vt && t().createElement(Ci, { pageCount: Kt, currentPageNumber: Re, totalPages: qt, showItemsPerPage: f, totalResults: jt.length, onClick: _e })
                  ),
                  Gt && oe && t().createElement(si, { resQty: jt.length, cards: jt, onCardBookmark: Lt }),
                  ft && !Gt && t().createElement(Pt, { size: xe, hidden: !y, absolute: !0 }),
                  !ht && !Gt && !ft && t().createElement(ui, { title: I, description: N, replaceValue: qe }),
                  ht && t().createElement(ui, { title: R, description: W, replaceValue: "" })
                )
              )
            )
          )
        );
      };
      (Ss.propTypes = { config: (0, c.shape)(ht) }), (Ss.defaultProps = { config: {} });
      var Os = Ss;
      function Ps(e) {
        return (
          (Ps = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            }),
          Ps(e)
        );
      }
      function As(e, t) {
        return !t || ("object" !== Is(t) && "function" != typeof t)
          ? (function (e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          })(e)
          : t;
      }
      function Fs(e, t) {
        return (
          (Fs =
            Object.setPrototypeOf ||
            function (e, t) {
              return (e.__proto__ = t), e;
            }),
          Fs(e, t)
        );
      }
      var Is = function (e) {
        return e && "undefined" != typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e;
      };
      function Ns(e) {
        var t = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () { })), !0;
          } catch (e) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = Ps(e);
          if (t) {
            var o = Ps(this).constructor;
            n = Reflect.construct(r, arguments, o);
          } else n = r.apply(this, arguments);
          return As(this, n);
        };
      }
      var Ls,
        Rs = (function (e) {
          !(function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            (e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })), t && Fs(e, t);
          })(n, e);
          var t = Ns(n);
          function n(e) {
            var r;
            return (
              (function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
              })(this, n),
              (r = t.call(this, e)).getAttribute("id", "id"),
              r.getAttribute("data-config", "dataConfig"),
              r
            );
          }
          return n;
        })(a.jk),
        _s = (0, a.Rb)(
          "consonant-card-collection",
          Rs,
          ((Ls = Os),
            function (e) {
              var t = e.dataConfig,
                n = C(t);
              return React.createElement(Ls, { config: n });
            })
        );
      var Ds = new a.bt(t(), r.render);
      Ds.register({ consonantPageRDC: _s });
      var Bs = function (e) {
        Ds.init(e);
      };
      Bs(document);
      var Ms = null;
      try {
        window.dexter.dxf.registerApp(Bs);
      } catch (e) { }
      (window.ConsonantCardCollection = function e(n, r) {
        !(function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        })(this, e),
          o().render(t().createElement(t().Fragment, null, t().createElement(Os, { config: C(n) })), r);
      }),
        i() &&
        window.dx &&
        window.dx.author.watch.registerFunction(function (e) {
          Ms !== e &&
            (function (e) {
              var t = e.firstElementChild,
                n = null;
              return null !== t && (n = t.querySelectorAll(".consonantcardcollection")), e.className.indexOf("experiencefragment") && n && n.length > 0;
            })(e) &&
            ((Ms = e), Ds.render(_s));
        });
    })();
})();
