var TwoWay =
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


var _Core = __webpack_require__(1);

var _Core2 = _interopRequireDefault(_Core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (true) {
    if (typeof module !== "undefined" && module.exports) {
        exports = module.exports = create;
    }
    exports.TwoWay = create;
} else {
    root.TwoWay = create;
}

function create(rootId, state) {
    return new _Core2.default(rootId, state).getStore();
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Element_View__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Store__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Element_Input__ = __webpack_require__(4);




class TwoWay {
    constructor(rootElementId, store) {
        this.rootElementId = rootElementId;
        this.store = new __WEBPACK_IMPORTED_MODULE_1__Store__["a" /* default */](store);
        this.views = [];
        this.init();
    }
    /**
     * Initialize all elements
     *
     * @memberof TwoWay
     */
    init() {
        this.initViews();
        this.initInputs();
    }
    /** */
    getStore() {
        return this.store.store;
    }
    /**
     * Initialize all views
     *
     * @memberof TwoWay
     */
    initViews() {
        const elements = document.querySelectorAll(`${this.rootElementId} [data-property]`);
        for (let i = 0; i < elements.length; i++) {
            const item = elements[i];
            this.views.push(new __WEBPACK_IMPORTED_MODULE_0__Element_View__["a" /* default */](item, this.store));
        }
    }
    /**
     * Initialize all input elements
     *
     * @memberof TwoWay
     */
    initInputs() {
        const elements = document.querySelectorAll(`${this.rootElementId} [data-model]`);
        for (let i = 0; i < elements.length; i++) {
            const item = elements[i];
            this.views.push(new __WEBPACK_IMPORTED_MODULE_2__Element_Input__["a" /* default */](item, this.store));
        }
        //this._initFields(`${this.rootElementId} textarea[data-model]`, Input);
        //this._initFields(`${this.rootElementId}  input[data-model][type="radio"]`, Radiobox);
    }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = TwoWay;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class View {
    constructor(element, store) {
        this.element = element;
        this.value = null;
        this.store = store;
        this.propertyName = element.getAttribute("data-property");
        if (!this.propertyName) {
            throw new Error("No data-property found on element!");
        }
        store.registerObserver(this.propertyName, this);
    }
    setValue(value) {
        if (this.value !== value) {
            this.value = value;
        }
        this.update();
    }
    update() {
        this.element.innerHTML = this.value;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = View;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Store {
    constructor(initialStore) {
        this.subscribers = [];
        this.store = this.observe(initialStore, (property, value) => {
            this.notifyObservers(property, value);
        });
    }
    buildProxy(prefix, o, callback) {
        return new Proxy(o, {
            set(target, property, value) {
                // same as above, but add prefix
                callback(`${prefix}${property}`, value);
                target[property] = value;
                return true;
            },
            get(target, property) {
                // return a new proxy if possible, add to prefix
                const out = target[property];
                if (out instanceof Object) {
                    return this.buildProxy(`${prefix}${property}.`, out, callback);
                }
                return out; // primitive, ignore
            }
        });
    }
    observe(o, callback) {
        return this.buildProxy("", o, callback);
    }
    notifyObservers(property, value) {
        for (let i = 0; i < this.subscribers.length; i++) {
            const subscriber = this.subscribers[i];
            if (subscriber.property !== property) {
                continue;
            }
            subscriber.observer.setValue(value);
        }
    }
    /**
     * Add new observer
     *
     * @param {string} prop
     * @param {View} view
     * @memberof Store
     */
    registerObserver(prop, view) {
        this.subscribers.push({
            property: prop,
            observer: view
        });
        view.setValue(this.store[prop]);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Store;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AbstractInput__ = __webpack_require__(5);

class Input extends __WEBPACK_IMPORTED_MODULE_0__AbstractInput__["a" /* default */] {
    constructor(element, store) {
        super(element, store);
        this.element.addEventListener("change", e => {
            this.setValue(e.target.value);
        });
        this.element.addEventListener("keyup", e => {
            this.setValue(e.target.value);
        });
    }
    update() {
        this.element.value = this.value;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Input;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AbstractInput {
    constructor(element, store) {
        this.element = element;
        this.propertyName = element.getAttribute("data-model");
        this.value = null;
        this.store = store;
        store.registerObserver(this.propertyName, this);
    }
    update() {
    }
    setValue(value) {
        if (this.value !== value) {
            this.value = value;
            this.store.store[this.propertyName] = this.value;
            this.update();
            this._emitUpdateToElement();
        }
    }
    _emitUpdateToElement() {
        var event = new CustomEvent("update", { detail: this.value });
        this.element.dispatchEvent(event);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AbstractInput;



/***/ })
/******/ ]);