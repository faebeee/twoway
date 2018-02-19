/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Core = __webpack_require__(1);

var _Core2 = _interopRequireDefault(_Core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (window) {
    window.TwoWay = _Core2.default;
}

exports.default = _Core2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var View_1 = __webpack_require__(2);
var Store_1 = __webpack_require__(3);
var Input_1 = __webpack_require__(4);
var TwoWay = /** @class */ (function () {
    function TwoWay(rootElementId, store) {
        this.rootElementId = rootElementId;
        this.store = new Store_1.default(store);
        this.views = [];
    }
    /**
     * Initialize all elements
     *
     * @memberof TwoWay
     */
    TwoWay.prototype.init = function () {
        this.initViews();
        this.initInputs();
        return this.store.store;
    };
    /**
     * Initialize all views
     *
     * @memberof TwoWay
     */
    TwoWay.prototype.initViews = function () {
        var elements = document.querySelectorAll(this.rootElementId + " [data-property]");
        for (var i = 0; i < elements.length; i++) {
            var item = elements[i];
            this.views.push(new View_1.default(item, this.store));
        }
    };
    /**
     * Initialize all input elements
     *
     * @memberof TwoWay
     */
    TwoWay.prototype.initInputs = function () {
        var elements = document.querySelectorAll(this.rootElementId + " [data-model]");
        for (var i = 0; i < elements.length; i++) {
            var item = elements[i];
            this.views.push(new Input_1.default(item, this.store));
        }
    };
    return TwoWay;
}());
exports.default = TwoWay;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var View = /** @class */ (function () {
    function View(element, store) {
        this.element = element;
        this.propertyName = element.getAttribute('data-property');
        this.value = null;
        store.registerObserver(this.propertyName, this);
    }
    View.prototype.update = function (value) {
        this.value = value;
        this.element.innerHTML = value;
    };
    return View;
}());
exports.default = View;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Store = /** @class */ (function () {
    function Store(initialStore) {
        var _this = this;
        this.values = [];
        this.subscribers = [];
        this.store = this.observe(initialStore, function (property, value) {
            _this.notifyObservers(property, value);
        });
    }
    Store.prototype.buildProxy = function (prefix, o, callback) {
        return new Proxy(o, {
            set: function (target, property, value) {
                // same as above, but add prefix
                callback(prefix + property, value);
                target[property] = value;
                return true;
            },
            get: function (target, property) {
                // return a new proxy if possible, add to prefix
                var out = target[property];
                if (out instanceof Object) {
                    return this.buildProxy(prefix + property + ".", out, callback);
                }
                return out; // primitive, ignore
            }
        });
    };
    Store.prototype.observe = function (o, callback) {
        return this.buildProxy("", o, callback);
    };
    Store.prototype.notifyObservers = function (property, value) {
        for (var i = 0; i < this.subscribers.length; i++) {
            var subscriber = this.subscribers[i];
            if (subscriber.property !== property) {
                continue;
            }
            subscriber.observer.update(value);
        }
    };
    /**
     * Add new observer
     *
     * @param {string} prop
     * @param {View} view
     * @memberof Store
     */
    Store.prototype.registerObserver = function (prop, view) {
        this.subscribers.push({
            property: prop,
            observer: view
        });
        view.update(this.store[prop]);
    };
    return Store;
}());
exports.default = Store;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Input = /** @class */ (function () {
    function Input(element, store) {
        var _this = this;
        this.element = element;
        this.propertyName = element.getAttribute("data-model");
        this.value = null;
        this.store = store;
        store.registerObserver(this.propertyName, this);
        this.element.addEventListener("change", function (e) {
            _this.value = e.target.value;
            _this.emitUpdateToStore();
        });
        this.element.addEventListener("keyup", function (e) {
            _this.value = e.target.value;
            _this.emitUpdateToStore();
        });
    }
    Input.prototype.emitUpdateToStore = function () {
        this.store.store[this.propertyName] = this.value;
    };
    Input.prototype.update = function (value) {
        this.value = value;
        this.element.value = value;
    };
    return Input;
}());
exports.default = Input;


/***/ })
/******/ ]);