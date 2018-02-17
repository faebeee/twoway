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
        if (store === void 0) { store = {}; }
        this.rootElementId = rootElementId;
        this.store = new Store_1.default(store || {});
        this.views = [];
        this.init();
    }
    /**
     * Initialize all elements
     *
     * @memberof TwoWay
     */
    TwoWay.prototype.init = function () {
        this.initViews();
        this.initInputs();
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
    /**
     * Set value in store
     *
     * @param {string} prop
     * @param {*} val
     * @memberof TwoWay
     */
    TwoWay.prototype.setValue = function (prop, val) {
        this.store.setValue(prop, val);
    };
    /**
     * Get value from store
     *
     * @param {string} prop
     * @memberof TwoWay
     */
    TwoWay.prototype.getValue = function (prop) {
        this.store.getValue(prop);
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
        this.values = [];
        var keys = Object.keys(initialStore);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            this.values.push({
                name: key,
                observers: [],
                value: initialStore[key]
            });
        }
    }
    /**
     * Set value
     *
     * @param {string} prop
     * @param {(Boolean | String | Number | Object)} value
     * @memberof Store
     */
    Store.prototype.setValue = function (prop, value) {
        for (var i = 0; i < this.values.length; i++) {
            var val = this.values[i];
            if (val.name !== prop) {
                continue;
            }
            val.value = value;
            val.observers.forEach(function (observer) {
                observer.update(value);
            });
        }
    };
    /**
     * Get value
     *
     * @param {string} prop
     * @returns {(Boolean | String | Number | Object)}
     * @memberof Store
     */
    Store.prototype.getValue = function (prop) {
        for (var i = 0; i < this.values.length; i++) {
            var val = this.values[i];
            if (val.name === prop) {
                return val.value;
            }
        }
        return null;
    };
    /**
     * Check if value has been setup in store
     *
     * @param {string} prop
     * @returns {Boolean}
     * @memberof Store
     */
    Store.prototype.isPropertySetUp = function (prop) {
        for (var i = 0; i < this.values.length; i++) {
            var val = this.values[i];
            if (val.name === prop) {
                return true;
            }
        }
        return false;
    };
    /**
     * setup prop
     *
     * @param {string} prop
     * @memberof Store
     */
    Store.prototype.setupProperty = function (prop) {
        this.values.push({
            name: prop,
            observers: [],
            value: null
        });
    };
    /**
     * Add new observer
     *
     * @param {string} prop
     * @param {View} view
     * @memberof Store
     */
    Store.prototype.registerObserver = function (prop, view) {
        if (!this.isPropertySetUp(prop)) {
            this.setupProperty(prop);
        }
        for (var i = 0; i < this.values.length; i++) {
            var val = this.values[i];
            if (val.name !== prop) {
                continue;
            }
            val.observers.push(view);
            view.update(this.getValue(prop));
        }
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
            _this.value = event.target.value;
            _this.emitUpdateToStore();
        });
        this.element.addEventListener("keyup", function (e) {
            _this.value = event.target.value;
            _this.emitUpdateToStore();
        });
    }
    Input.prototype.emitUpdateToStore = function () {
        this.store.setValue(this.propertyName, this.value);
    };
    Input.prototype.update = function (value) {
        this.value = value;
    };
    return Input;
}());
exports.default = Input;


/***/ })
/******/ ]);