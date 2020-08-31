// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"5184ebf2968e250fb9518c7d585f4d25":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "7d4af9210bf730339d991671c3964d65";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
  var port = HMR_PORT || location.port;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  };

  newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now());
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      var absolute = /^https?:\/\//i.test(links[i].getAttribute('href'));

      if (!absolute) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      reloadCSS();
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"c00e607576b6da73f3471278d158f50f":[function(require,module,exports) {
"use strict";

var _preact = require("preact");

var _react = require("htm/react");

var _person = _interopRequireDefault(require("./components/person.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

console.log('Привет, Мир!');

class App extends _preact.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      persons: [{
        id: 0,
        name: 'MaryxxxJ',
        age: 10,
        end: 2
      }, {
        id: 1,
        name: 'Jane',
        age: 15,
        end: 5
      }]
    });

    _defineProperty(this, "increase", name => {
      console.log(name + ' minus');
      this.setState(prevState => ({
        persons: prevState.persons.map(el => el.name === name ? { ...el,
          age: el.age + 1
        } : el)
      }));
    });

    _defineProperty(this, "decrease", name => {
      console.log(name + ' plus');
      this.setState(prevState => ({
        persons: prevState.persons.map(el => el.name === name ? { ...el,
          age: el.age - 1
        } : el)
      }));
    });
  }

  render() {
    const f = () => console.log('clicker');

    const list = this.state.persons.map(person => (0, _react.html)`
<${_person.default}
				name=${person.name}
				age=${person.age}
				end=${person.end}
				clickPlus=${() => this.increase(person.name)}
				clickMinus=${() => this.decrease(person.name)}
			/>`);
    return (0, _react.html)`
		<div>
			<h1>Hello, Wosrldаа!</h1>
			${list}
		</div>
	`;
  }

}

(0, _preact.render)((0, _react.html)`<${App}/>`, document.querySelector('#root'));
},{"preact":"972ceb4780c8fe42bb292a7cbd55d2e5","htm/react":"7b8b82c966b5da6b195ae042c7739e57","./components/person.js":"ac126843c2617e18399427d44e7bb1c9"}],"972ceb4780c8fe42bb292a7cbd55d2e5":[function(require,module,exports) {
var n,l,u,t,i,o,r,f={},e=[],c=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function s(n,l){for(var u in l)n[u]=l[u];return n}function a(n){var l=n.parentNode;l&&l.removeChild(n)}function p(n,l,u){var t,i,o,r=arguments,f={};for(o in l)"key"==o?t=l[o]:"ref"==o?i=l[o]:f[o]=l[o];if(arguments.length>3)for(u=[u],o=3;o<arguments.length;o++)u.push(r[o]);if(null!=u&&(f.children=u),"function"==typeof n&&null!=n.defaultProps)for(o in n.defaultProps)void 0===f[o]&&(f[o]=n.defaultProps[o]);return v(n,f,t,i,null)}function v(l,u,t,i,o){var r={type:l,props:u,key:t,ref:i,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:o};return null==o&&(r.__v=r),null!=n.vnode&&n.vnode(r),r}function h(n){return n.children}function y(n,l){this.props=n,this.context=l}function d(n,l){if(null==l)return n.__?d(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return"function"==typeof n.type?d(n):null}function _(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return _(n)}}function w(l){(!l.__d&&(l.__d=!0)&&u.push(l)&&!x.__r++||i!==n.debounceRendering)&&((i=n.debounceRendering)||t)(x)}function x(){for(var n;x.__r=u.length;)n=u.sort(function(n,l){return n.__v.__b-l.__v.__b}),u=[],n.some(function(n){var l,u,t,i,o,r,f;n.__d&&(r=(o=(l=n).__v).__e,(f=l.__P)&&(u=[],(t=s({},o)).__v=t,i=z(f,o,t,l.__n,void 0!==f.ownerSVGElement,null,u,null==r?d(o):r),N(u,o),i!=r&&_(o)))})}function k(n,l,u,t,i,o,r,c,s,p){var y,_,w,x,k,g,b,A=t&&t.__k||e,P=A.length;for(s==f&&(s=null!=r?r[0]:P?d(t,0):null),u.__k=[],y=0;y<l.length;y++)if(null!=(x=u.__k[y]=null==(x=l[y])||"boolean"==typeof x?null:"string"==typeof x||"number"==typeof x?v(null,x,null,null,x):Array.isArray(x)?v(h,{children:x},null,null,null):null!=x.__e||null!=x.__c?v(x.type,x.props,x.key,null,x.__v):x)){if(x.__=u,x.__b=u.__b+1,null===(w=A[y])||w&&x.key==w.key&&x.type===w.type)A[y]=void 0;else for(_=0;_<P;_++){if((w=A[_])&&x.key==w.key&&x.type===w.type){A[_]=void 0;break}w=null}k=z(n,x,w=w||f,i,o,r,c,s,p),(_=x.ref)&&w.ref!=_&&(b||(b=[]),w.ref&&b.push(w.ref,null,x),b.push(_,x.__c||k,x)),null!=k?(null==g&&(g=k),s=m(n,x,w,A,r,k,s),p||"option"!=u.type?"function"==typeof u.type&&(u.__d=s):n.value=""):s&&w.__e==s&&s.parentNode!=n&&(s=d(w))}if(u.__e=g,null!=r&&"function"!=typeof u.type)for(y=r.length;y--;)null!=r[y]&&a(r[y]);for(y=P;y--;)null!=A[y]&&j(A[y],A[y]);if(b)for(y=0;y<b.length;y++)$(b[y],b[++y],b[++y])}function m(n,l,u,t,i,o,r){var f,e,c;if(void 0!==l.__d)f=l.__d,l.__d=void 0;else if(i==u||o!=r||null==o.parentNode)n:if(null==r||r.parentNode!==n)n.appendChild(o),f=null;else{for(e=r,c=0;(e=e.nextSibling)&&c<t.length;c+=2)if(e==o)break n;n.insertBefore(o,r),f=r}return void 0!==f?f:o.nextSibling}function g(n,l,u,t,i){var o;for(o in u)"children"===o||"key"===o||o in l||A(n,o,null,u[o],t);for(o in l)i&&"function"!=typeof l[o]||"children"===o||"key"===o||"value"===o||"checked"===o||u[o]===l[o]||A(n,o,l[o],u[o],t)}function b(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]=null==u?"":"number"!=typeof u||c.test(l)?u:u+"px"}function A(n,l,u,t,i){var o,r;if(i&&"className"==l&&(l="class"),"style"===l)if("string"==typeof u)n.style=u;else{if("string"==typeof t&&(n.style=t=""),t)for(l in t)u&&l in u||b(n.style,l,"");if(u)for(l in u)t&&u[l]===t[l]||b(n.style,l,u[l])}else"o"===l[0]&&"n"===l[1]?(o=l!==(l=l.replace(/Capture$/,"")),(r=l.toLowerCase())in n&&(l=r),l=l.slice(2),n.l||(n.l={}),n.l[l]=u,u?t||n.addEventListener(l,P,o):n.removeEventListener(l,P,o)):"list"!==l&&"tagName"!==l&&"form"!==l&&"type"!==l&&"size"!==l&&"download"!==l&&"href"!==l&&!i&&l in n?n[l]=null==u?"":u:"function"!=typeof u&&"dangerouslySetInnerHTML"!==l&&(l!==(l=l.replace(/xlink:?/,""))?null==u||!1===u?n.removeAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase()):n.setAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase(),u):null==u||!1===u&&!/^ar/.test(l)?n.removeAttribute(l):n.setAttribute(l,u))}function P(l){this.l[l.type](n.event?n.event(l):l)}function C(n,l,u){var t,i;for(t=0;t<n.__k.length;t++)(i=n.__k[t])&&(i.__=n,i.__e&&("function"==typeof i.type&&i.__k.length>1&&C(i,l,u),l=m(u,i,i,n.__k,null,i.__e,l),"function"==typeof n.type&&(n.__d=l)))}function z(l,u,t,i,o,r,f,e,c){var a,p,v,d,_,w,x,m,g,b,A,P=u.type;if(void 0!==u.constructor)return null;(a=n.__b)&&a(u);try{n:if("function"==typeof P){if(m=u.props,g=(a=P.contextType)&&i[a.__c],b=a?g?g.props.value:a.__:i,t.__c?x=(p=u.__c=t.__c).__=p.__E:("prototype"in P&&P.prototype.render?u.__c=p=new P(m,b):(u.__c=p=new y(m,b),p.constructor=P,p.render=H),g&&g.sub(p),p.props=m,p.state||(p.state={}),p.context=b,p.__n=i,v=p.__d=!0,p.__h=[]),null==p.__s&&(p.__s=p.state),null!=P.getDerivedStateFromProps&&(p.__s==p.state&&(p.__s=s({},p.__s)),s(p.__s,P.getDerivedStateFromProps(m,p.__s))),d=p.props,_=p.state,v)null==P.getDerivedStateFromProps&&null!=p.componentWillMount&&p.componentWillMount(),null!=p.componentDidMount&&p.__h.push(p.componentDidMount);else{if(null==P.getDerivedStateFromProps&&m!==d&&null!=p.componentWillReceiveProps&&p.componentWillReceiveProps(m,b),!p.__e&&null!=p.shouldComponentUpdate&&!1===p.shouldComponentUpdate(m,p.__s,b)||u.__v===t.__v){p.props=m,p.state=p.__s,u.__v!==t.__v&&(p.__d=!1),p.__v=u,u.__e=t.__e,u.__k=t.__k,p.__h.length&&f.push(p),C(u,e,l);break n}null!=p.componentWillUpdate&&p.componentWillUpdate(m,p.__s,b),null!=p.componentDidUpdate&&p.__h.push(function(){p.componentDidUpdate(d,_,w)})}p.context=b,p.props=m,p.state=p.__s,(a=n.__r)&&a(u),p.__d=!1,p.__v=u,p.__P=l,a=p.render(p.props,p.state,p.context),p.state=p.__s,null!=p.getChildContext&&(i=s(s({},i),p.getChildContext())),v||null==p.getSnapshotBeforeUpdate||(w=p.getSnapshotBeforeUpdate(d,_)),A=null!=a&&a.type==h&&null==a.key?a.props.children:a,k(l,Array.isArray(A)?A:[A],u,t,i,o,r,f,e,c),p.base=u.__e,p.__h.length&&f.push(p),x&&(p.__E=p.__=null),p.__e=!1}else null==r&&u.__v===t.__v?(u.__k=t.__k,u.__e=t.__e):u.__e=T(t.__e,u,t,i,o,r,f,c);(a=n.diffed)&&a(u)}catch(l){u.__v=null,n.__e(l,u,t)}return u.__e}function N(l,u){n.__c&&n.__c(u,l),l.some(function(u){try{l=u.__h,u.__h=[],l.some(function(n){n.call(u)})}catch(l){n.__e(l,u.__v)}})}function T(n,l,u,t,i,o,r,c){var s,a,p,v,h,y=u.props,d=l.props;if(i="svg"===l.type||i,null!=o)for(s=0;s<o.length;s++)if(null!=(a=o[s])&&((null===l.type?3===a.nodeType:a.localName===l.type)||n==a)){n=a,o[s]=null;break}if(null==n){if(null===l.type)return document.createTextNode(d);n=i?document.createElementNS("http://www.w3.org/2000/svg",l.type):document.createElement(l.type,d.is&&{is:d.is}),o=null,c=!1}if(null===l.type)y!==d&&n.data!==d&&(n.data=d);else{if(null!=o&&(o=e.slice.call(n.childNodes)),p=(y=u.props||f).dangerouslySetInnerHTML,v=d.dangerouslySetInnerHTML,!c){if(null!=o)for(y={},h=0;h<n.attributes.length;h++)y[n.attributes[h].name]=n.attributes[h].value;(v||p)&&(v&&p&&v.__html==p.__html||(n.innerHTML=v&&v.__html||""))}g(n,d,y,i,c),v?l.__k=[]:(s=l.props.children,k(n,Array.isArray(s)?s:[s],l,u,t,"foreignObject"!==l.type&&i,o,r,f,c)),c||("value"in d&&void 0!==(s=d.value)&&s!==n.value&&A(n,"value",s,y.value,!1),"checked"in d&&void 0!==(s=d.checked)&&s!==n.checked&&A(n,"checked",s,y.checked,!1))}return n}function $(l,u,t){try{"function"==typeof l?l(u):l.current=u}catch(l){n.__e(l,t)}}function j(l,u,t){var i,o,r;if(n.unmount&&n.unmount(l),(i=l.ref)&&(i.current&&i.current!==l.__e||$(i,null,u)),t||"function"==typeof l.type||(t=null!=(o=l.__e)),l.__e=l.__d=void 0,null!=(i=l.__c)){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(l){n.__e(l,u)}i.base=i.__P=null}if(i=l.__k)for(r=0;r<i.length;r++)i[r]&&j(i[r],u,t);null!=o&&a(o)}function H(n,l,u){return this.constructor(n,u)}function I(l,u,t){var i,r,c;n.__&&n.__(l,u),r=(i=t===o)?null:t&&t.__k||u.__k,l=p(h,null,[l]),c=[],z(u,(i?u:t||u).__k=l,r||f,f,void 0!==u.ownerSVGElement,t&&!i?[t]:r?null:u.childNodes.length?e.slice.call(u.childNodes):null,c,t||f,i),N(c,l)}n={__e:function(n,l){for(var u,t;l=l.__;)if((u=l.__c)&&!u.__)try{if(u.constructor&&null!=u.constructor.getDerivedStateFromError&&(t=!0,u.setState(u.constructor.getDerivedStateFromError(n))),null!=u.componentDidCatch&&(t=!0,u.componentDidCatch(n)),t)return w(u.__E=u)}catch(l){n=l}throw n}},l=function(n){return null!=n&&void 0===n.constructor},y.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=s({},this.state),"function"==typeof n&&(n=n(s({},u),this.props)),n&&s(u,n),null!=n&&this.__v&&(l&&this.__h.push(l),w(this))},y.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),w(this))},y.prototype.render=h,u=[],t="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,x.__r=0,o=f,r=0,exports.render=I,exports.hydrate=function(n,l){I(n,l,o)},exports.createElement=p,exports.h=p,exports.Fragment=h,exports.createRef=function(){return{current:null}},exports.isValidElement=l,exports.Component=y,exports.cloneElement=function(n,l,u){var t,i,o,r=arguments,f=s({},n.props);for(o in l)"key"==o?t=l[o]:"ref"==o?i=l[o]:f[o]=l[o];if(arguments.length>3)for(u=[u],o=3;o<arguments.length;o++)u.push(r[o]);return null!=u&&(f.children=u),v(n.type,f,t||n.key,i||n.ref,null)},exports.createContext=function(n,l){var u={__c:l="__cC"+r++,__:n,Consumer:function(n,l){return n.children(l)},Provider:function(n,u,t){return this.getChildContext||(u=[],(t={})[l]=this,this.getChildContext=function(){return t},this.shouldComponentUpdate=function(n){this.props.value!==n.value&&u.some(w)},this.sub=function(n){u.push(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){u.splice(u.indexOf(n),1),l&&l.call(n)}}),n.children}};return u.Provider.__=u.Consumer.contextType=u},exports.toChildArray=function n(l,u){return u=u||[],null==l||"boolean"==typeof l||(Array.isArray(l)?l.some(function(l){n(l,u)}):u.push(l)),u},exports.__u=j,exports.options=n;
//# sourceMappingURL=preact.js.map

},{}],"7b8b82c966b5da6b195ae042c7739e57":[function(require,module,exports) {
var e,t=require("react"),r=((e=require("htm"))&&"object"==typeof e&&"default"in e?e.default:e).bind(t.createElement);exports.html=r;

},{"react":"93797fee9240bef78f9cdce9f735dd39","htm":"c0b9c364bb01bce6d81de2fe1f4e3a25"}],"93797fee9240bef78f9cdce9f735dd39":[function(require,module,exports) {
var n=require("preact/hooks"),t=require("preact");function e(n,t){for(var e in t)n[e]=t[e];return n}function r(n,t){for(var e in n)if("__source"!==e&&!(e in t))return!0;for(var r in t)if("__source"!==r&&n[r]!==t[r])return!0;return!1}function o(n){this.props=n}function u(n,e){function o(n){var t=this.props.ref,o=t==n.ref;return!o&&t&&(t.call?t(null):t.current=null),e?!e(this.props,n)||!o:r(this.props,n)}function u(e){return this.shouldComponentUpdate=o,t.createElement(n,e)}return u.displayName="Memo("+(n.displayName||n.name)+")",u.prototype.isReactComponent=!0,u.__f=!0,u}(o.prototype=new t.Component).isPureReactComponent=!0,o.prototype.shouldComponentUpdate=function(n,t){return r(this.props,n)||r(this.state,t)};var i=t.options.__b;t.options.__b=function(n){n.type&&n.type.__f&&n.ref&&(n.props.ref=n.ref,n.ref=null),i&&i(n)};var f="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.forward_ref")||3911;function c(n){function t(t,r){var o=e({},t);return delete o.ref,n(o,(r=t.ref||r)&&("object"!=typeof r||"current"in r)?r:null)}return t.$$typeof=f,t.render=t,t.prototype.isReactComponent=t.__f=!0,t.displayName="ForwardRef("+(n.displayName||n.name)+")",t}var l=function(n,e){return n?t.toChildArray(t.toChildArray(n).map(e)):null},a={map:l,forEach:l,count:function(n){return n?t.toChildArray(n).length:0},only:function(n){var e=t.toChildArray(n);if(1!==e.length)throw"Children.only";return e[0]},toArray:t.toChildArray},s=t.options.__e;function p(n){return n&&((n=e({},n)).__c=null,n.__k=n.__k&&n.__k.map(p)),n}function v(n){return n&&(n.__v=null,n.__k=n.__k&&n.__k.map(v)),n}function h(){this.__u=0,this.t=null,this.__b=null}function d(n){var t=n.__.__c;return t&&t.o&&t.o(n)}function x(n){var e,r,o;function u(u){if(e||(e=n()).then(function(n){r=n.default||n},function(n){o=n}),o)throw o;if(!r)throw e;return t.createElement(r,u)}return u.displayName="Lazy",u.__f=!0,u}function m(){this.u=null,this.i=null}t.options.__e=function(n,t,e){if(n.then)for(var r,o=t;o=o.__;)if((r=o.__c)&&r.__c)return null==t.__e&&(t.__e=e.__e,t.__k=e.__k),r.__c(n,t.__c);s(n,t,e)},(h.prototype=new t.Component).__c=function(n,t){var e=this;null==e.t&&(e.t=[]),e.t.push(t);var r=d(e.__v),o=!1,u=function(){o||(o=!0,t.componentWillUnmount=t.__c,r?r(i):i())};t.__c=t.componentWillUnmount,t.componentWillUnmount=function(){u(),t.__c&&t.__c()};var i=function(){var n;if(!--e.__u)for(e.__v.__k[0]=v(e.state.o),e.setState({o:e.__b=null});n=e.t.pop();)n.forceUpdate()};e.__u++||e.setState({o:e.__b=e.__v.__k[0]}),n.then(u,u)},h.prototype.componentWillUnmount=function(){this.t=[]},h.prototype.render=function(n,e){return this.__b&&(this.__v.__k&&(this.__v.__k[0]=p(this.__b)),this.__b=null),[t.createElement(t.Fragment,null,e.o?null:n.children),e.o&&n.fallback]};var _=function(n,t,e){if(++e[1]===e[0]&&n.i.delete(t),n.props.revealOrder&&("t"!==n.props.revealOrder[0]||!n.i.size))for(e=n.u;e;){for(;e.length>3;)e.pop()();if(e[1]<e[0])break;n.u=e=e[2]}};function y(n){return this.getChildContext=function(){return n.context},n.children}function b(n){var e=this,r=n.l,o=t.createElement(y,{context:e.context},n.__v);e.componentWillUnmount=function(){var n=e.s.parentNode;n&&n.removeChild(e.s),t.__u(e.p)},e.l&&e.l!==r&&(e.componentWillUnmount(),e.v=!1),n.__v?e.v?(r.__k=e.__k,t.render(o,r),e.__k=r.__k):(e.s=document.createTextNode(""),e.__k=r.__k,t.hydrate("",r),r.appendChild(e.s),e.v=!0,e.l=r,t.render(o,r,e.s),r.__k=e.__k,e.__k=e.s.__k):e.v&&e.componentWillUnmount(),e.p=o}function S(n,e){return t.createElement(b,{__v:n,l:e})}(m.prototype=new t.Component).o=function(n){var t=this,e=d(t.__v),r=t.i.get(n);return r[0]++,function(o){var u=function(){t.props.revealOrder?(r.push(o),_(t,n,r)):o()};e?e(u):u()}},m.prototype.render=function(n){this.u=null,this.i=new Map;var e=t.toChildArray(n.children);n.revealOrder&&"b"===n.revealOrder[0]&&e.reverse();for(var r=e.length;r--;)this.i.set(e[r],this.u=[1,0,this.u]);return n.children},m.prototype.componentDidUpdate=m.prototype.componentDidMount=function(){var n=this;this.i.forEach(function(t,e){_(n,e,t)})};var E=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;t.Component.prototype.isReactComponent={};var w="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;function C(n,e,r){if(null==e.__k)for(;e.firstChild;)e.removeChild(e.firstChild);return t.render(n,e),"function"==typeof r&&r(),n?n.__c:null}function R(n,e,r){return t.hydrate(n,e),"function"==typeof r&&r(),n?n.__c:null}var g=t.options.event;function A(n,t){n["UNSAFE_"+t]&&!n[t]&&Object.defineProperty(n,t,{get:function(){return this["UNSAFE_"+t]},set:function(n){this["UNSAFE_"+t]=n}})}t.options.event=function(n){g&&(n=g(n)),n.persist=function(){};var t=!1,e=!1,r=n.stopPropagation;n.stopPropagation=function(){r.call(n),t=!0};var o=n.preventDefault;return n.preventDefault=function(){o.call(n),e=!0},n.isPropagationStopped=function(){return t},n.isDefaultPrevented=function(){return e},n.nativeEvent=n};var N,U={configurable:!0,get:function(){return this.class}},O=t.options.vnode;t.options.vnode=function(n){n.$$typeof=w;var e=n.type,r=n.props;if(e){var o;if(r.class!=r.className&&(U.enumerable="className"in r,null!=r.className&&(r.class=r.className),Object.defineProperty(r,"className",U)),"function"!=typeof e)for(o in r.defaultValue&&void 0!==r.value&&(r.value||0===r.value||(r.value=r.defaultValue),r.defaultValue=void 0),"select"===e&&r.multiple&&Array.isArray(r.value)&&(t.toChildArray(r.children).forEach(function(n){-1!=r.value.indexOf(n.props.value)&&(n.props.selected=!0)}),r.value=void 0),!0===r.download&&(r.download=""),r){var u=E.test(o);u&&(n.props[o.replace(/[A-Z0-9]/,"-$&").toLowerCase()]=r[o]),(u||null===r[o])&&(r[o]=void 0)}else e.prototype&&!e.prototype.h&&(e.prototype.h=!0,A(e.prototype,"componentWillMount"),A(e.prototype,"componentWillReceiveProps"),A(e.prototype,"componentWillUpdate"));!function(t){var e=n.type,r=n.props;if(r&&"string"==typeof e){var o={};for(var u in r)/^on(Ani|Tra|Tou)/.test(u)&&(r[u.toLowerCase()]=r[u],delete r[u]),o[u.toLowerCase()]=u;if(o.ondoubleclick&&(r.ondblclick=r[o.ondoubleclick],delete r[o.ondoubleclick]),o.onbeforeinput&&(r.onbeforeinput=r[o.onbeforeinput],delete r[o.onbeforeinput]),o.onchange&&("textarea"===e||"input"===e.toLowerCase()&&!/^fil|che|ra/i.test(r.type))){var i=o.oninput||"oninput";r[i]||(r[i]=r[o.onchange],delete r[o.onchange])}}}()}O&&O(n)};var F=t.options.__r;t.options.__r=function(n){F&&F(n),N=n.__c};var L={ReactCurrentDispatcher:{current:{readContext:function(n){return N.__n[n.__c].props.value}}}};function k(n){return t.createElement.bind(null,n)}function M(n){return!!n&&n.$$typeof===w}function D(n){return M(n)?t.cloneElement.apply(null,arguments):n}function T(n){return!!n.__k&&(t.render(null,n),!0)}function W(n){return n&&(n.base||1===n.nodeType&&n)||null}var j=function(n,t){return n(t)},I=t.Fragment,P={useState:n.useState,useReducer:n.useReducer,useEffect:n.useEffect,useLayoutEffect:n.useLayoutEffect,useRef:n.useRef,useImperativeHandle:n.useImperativeHandle,useMemo:n.useMemo,useCallback:n.useCallback,useContext:n.useContext,useDebugValue:n.useDebugValue,version:"16.8.0",Children:a,render:C,hydrate:R,unmountComponentAtNode:T,createPortal:S,createElement:t.createElement,createContext:t.createContext,createFactory:k,cloneElement:D,createRef:t.createRef,Fragment:t.Fragment,isValidElement:M,findDOMNode:W,Component:t.Component,PureComponent:o,memo:u,forwardRef:c,unstable_batchedUpdates:j,StrictMode:I,Suspense:h,SuspenseList:m,lazy:x,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:L};Object.keys(n).forEach(function(t){exports[t]=n[t]}),exports.createElement=t.createElement,exports.createContext=t.createContext,exports.createRef=t.createRef,exports.Fragment=t.Fragment,exports.Component=t.Component,exports.version="16.8.0",exports.Children=a,exports.render=C,exports.hydrate=R,exports.unmountComponentAtNode=T,exports.createPortal=S,exports.createFactory=k,exports.cloneElement=D,exports.isValidElement=M,exports.findDOMNode=W,exports.PureComponent=o,exports.memo=u,exports.forwardRef=c,exports.unstable_batchedUpdates=j,exports.StrictMode=I,exports.Suspense=h,exports.SuspenseList=m,exports.lazy=x,exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=L,exports.default=P;
//# sourceMappingURL=compat.js.map

},{"preact/hooks":"9fa17bd51cb6bac6d24ad51f7ce5db61","preact":"972ceb4780c8fe42bb292a7cbd55d2e5"}],"9fa17bd51cb6bac6d24ad51f7ce5db61":[function(require,module,exports) {
var n,t,r,u=require("preact"),o=0,i=[],c=u.options.__r,e=u.options.diffed,f=u.options.__c,a=u.options.unmount;function p(n,r){u.options.__h&&u.options.__h(t,n,o||r),o=0;var i=t.__H||(t.__H={__:[],__h:[]});return n>=i.__.length&&i.__.push({}),i.__[n]}function v(n){return o=1,s(A,n)}function s(r,u,o){var i=p(n++,2);return i.t=r,i.__c||(i.__c=t,i.__=[o?o(u):A(void 0,u),function(n){var t=i.t(i.__[0],n);i.__[0]!==t&&(i.__=[t,i.__[1]],i.__c.setState({}))}]),i.__}function x(r,o){var i=p(n++,4);!u.options.__s&&q(i.__H,o)&&(i.__=r,i.__H=o,t.__h.push(i))}function m(t,r){var u=p(n++,7);return q(u.__H,r)?(u.__H=r,u.__h=t,u.__=t()):u.__}function y(){i.some(function(n){if(n.__P)try{n.__H.__h.forEach(h),n.__H.__h.forEach(_),n.__H.__h=[]}catch(t){return n.__H.__h=[],u.options.__e(t,n.__v),!0}}),i=[]}u.options.__r=function(r){c&&c(r),n=0;var u=(t=r.__c).__H;u&&(u.__h.forEach(h),u.__h.forEach(_),u.__h=[])},u.options.diffed=function(n){e&&e(n);var t=n.__c;t&&t.__H&&t.__H.__h.length&&(1!==i.push(t)&&r===u.options.requestAnimationFrame||((r=u.options.requestAnimationFrame)||function(n){var t,r=function(){clearTimeout(u),l&&cancelAnimationFrame(t),setTimeout(n)},u=setTimeout(r,100);l&&(t=requestAnimationFrame(r))})(y))},u.options.__c=function(n,t){t.some(function(n){try{n.__h.forEach(h),n.__h=n.__h.filter(function(n){return!n.__||_(n)})}catch(r){t.some(function(n){n.__h&&(n.__h=[])}),t=[],u.options.__e(r,n.__v)}}),f&&f(n,t)},u.options.unmount=function(n){a&&a(n);var t=n.__c;if(t&&t.__H)try{t.__H.__.forEach(h)}catch(n){u.options.__e(n,t.__v)}};var l="function"==typeof requestAnimationFrame;function h(n){"function"==typeof n.u&&n.u()}function _(n){n.u=n.__()}function q(n,t){return!n||t.some(function(t,r){return t!==n[r]})}function A(n,t){return"function"==typeof t?t(n):t}exports.useState=v,exports.useReducer=s,exports.useEffect=function(r,o){var i=p(n++,3);!u.options.__s&&q(i.__H,o)&&(i.__=r,i.__H=o,t.__H.__h.push(i))},exports.useLayoutEffect=x,exports.useRef=function(n){return o=5,m(function(){return{current:n}},[])},exports.useImperativeHandle=function(n,t,r){o=6,x(function(){"function"==typeof n?n(t()):n&&(n.current=t())},null==r?r:r.concat(n))},exports.useMemo=m,exports.useCallback=function(n,t){return o=8,m(function(){return n},t)},exports.useContext=function(r){var u=t.context[r.__c],o=p(n++,9);return o.__c=r,u?(null==o.__&&(o.__=!0,u.sub(t)),u.props.value):r.__},exports.useDebugValue=function(n,t){u.options.useDebugValue&&u.options.useDebugValue(t?t(n):n)},exports.useErrorBoundary=function(r){var u=p(n++,10),o=v();return u.__=r,t.componentDidCatch||(t.componentDidCatch=function(n){u.__&&u.__(n),o[1](n)}),[o[0],function(){o[1](void 0)}]};
//# sourceMappingURL=hooks.js.map

},{"preact":"972ceb4780c8fe42bb292a7cbd55d2e5"}],"c0b9c364bb01bce6d81de2fe1f4e3a25":[function(require,module,exports) {
!function(){var n=function(t,e,s,u){var r;e[0]=0;for(var h=1;h<e.length;h++){var p=e[h++],a=e[h]?(e[0]|=p?1:2,s[e[h++]]):e[++h];3===p?u[0]=a:4===p?u[1]=Object.assign(u[1]||{},a):5===p?(u[1]=u[1]||{})[e[++h]]=a:6===p?u[1][e[++h]]+=a+"":p?(r=t.apply(a,n(t,a,s,["",null])),u.push(r),a[0]?e[0]|=2:(e[h-2]=0,e[h]=r)):u.push(a)}return u},t=new Map,e=function(e){var s=t.get(this);return s||(s=new Map,t.set(this,s)),(s=n(this,s.get(e)||(s.set(e,s=function(n){for(var t,e,s=1,u="",r="",h=[0],p=function(n){1===s&&(n||(u=u.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?h.push(0,n,u):3===s&&(n||u)?(h.push(3,n,u),s=2):2===s&&"..."===u&&n?h.push(4,n,0):2===s&&u&&!n?h.push(5,0,!0,u):s>=5&&((u||!n&&5===s)&&(h.push(s,0,u,e),s=6),n&&(h.push(s,n,0,e),s=6)),u=""},a=0;a<n.length;a++){a&&(1===s&&p(),p(a));for(var o=0;o<n[a].length;o++)t=n[a][o],1===s?"<"===t?(p(),h=[h],s=3):u+=t:4===s?"--"===u&&">"===t?(s=1,u=""):u=t+u[0]:r?t===r?r="":u+=t:'"'===t||"'"===t?r=t:">"===t?(p(),s=1):s&&("="===t?(s=5,e=u,u=""):"/"===t&&(s<5||">"===n[a][o+1])?(p(),3===s&&(h=h[0]),s=h,(h=h[0]).push(2,0,s),s=0):" "===t||"\t"===t||"\n"===t||"\r"===t?(p(),s=2):u+=t),3===s&&"!--"===u&&(s=4,h=h[0])}return p(),h}(e)),s),arguments,[])).length>1?s:s[0]};"undefined"!=typeof module?module.exports=e:self.htm=e}();

},{}],"ac126843c2617e18399427d44e7bb1c9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Person;

var _preact = require("preact");

var _preact2 = require("htm/preact");

//import { html } from 'https://unpkg.com/htm/preact/index.mjs?module'
function Person(props) {
  return (0, _preact.h)("div", {
    class: "person"
  }, (0, _preact.h)("h1", null, props.name), (0, _preact.h)("p", null, "\u0412\u043E\u0437\u0440\u0430\u0441\u0442 : ", props.age), (0, _preact.h)("p", null, "end: ", props.end), (0, _preact.h)("button", {
    onClick: props.clickPlus
  }, "\u0411\u043E\u043B\u044C\u0448\u0435"), (0, _preact.h)("button", {
    onClick: props.clickMinus
  }, "\u041C\u0435\u043D\u044C\u0448\u0435"));
}
},{"preact":"972ceb4780c8fe42bb292a7cbd55d2e5","htm/preact":"ddf89fd00e2985763c2d2203b67abfa8"}],"ddf89fd00e2985763c2d2203b67abfa8":[function(require,module,exports) {
var e,r=require("preact"),t=((e=require("htm"))&&"object"==typeof e&&"default"in e?e.default:e).bind(r.h);exports.h=r.h,exports.render=r.render,exports.Component=r.Component,exports.html=t;

},{"preact":"972ceb4780c8fe42bb292a7cbd55d2e5","htm":"c0b9c364bb01bce6d81de2fe1f4e3a25"}]},{},["5184ebf2968e250fb9518c7d585f4d25","c00e607576b6da73f3471278d158f50f"], null)

//# sourceMappingURL=preact_component.7d4af921.js.map
