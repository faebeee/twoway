var twoway =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AbstractInput {
    constructor(element, store) {
        this.element = element;
        this.model = element.getAttribute("data-model");
        this.propertyName = element.getAttribute("data-model");
        this.value = null;
        this.store = store;
    }
    /**
     * Trigger the update method. Only triggered if there is a difference in the values
     * @param value New value
     */
    update(value) {
        if (this.value !== value) {
            this.value = value;
            this.store.store[this.propertyName] = this.value;
            this._emitUpdateToElement();
        }
    }
    /**
     * Emitting update event to the DOM element
     *
     * @memberof AbstractInput
     */
    _emitUpdateToElement() {
        const event = new CustomEvent("update", { detail: this.value });
        this.element.dispatchEvent(event);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AbstractInput;



/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Core = __webpack_require__(2);

var _Core2 = _interopRequireDefault(_Core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    if (true) {
        if (typeof module !== "undefined" && module.exports) {
            exports = module.exports = create;
        }
        exports.twoway = create;
    } else {
        root.twoway = create;
    }

    /**
     * create new instance
     *
     * @param {String} rootId
     * @param {Object} state
     * @returns
     */
    function create(rootId, state) {
        return new _Core2.default(rootId, state).getStore();
    }
})();

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Element_View_index__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Store_index__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Element_Input_Input_index__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Element_Input_Checkbox_index__ = __webpack_require__(7);





class TwoWay {
    constructor(rootElementId, store) {
        this.rootElementId = rootElementId;
        this.store = new __WEBPACK_IMPORTED_MODULE_1__Store_index__["a" /* default */](store);
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
        //this.initCheckbox();
        this.initInput(`${this.rootElementId} input[data-model]:not([type='radio']):not([type='checkbox'])`, __WEBPACK_IMPORTED_MODULE_2__Element_Input_Input_index__["a" /* default */]);
        this.initInput(`${this.rootElementId} textarea[data-model]`, __WEBPACK_IMPORTED_MODULE_2__Element_Input_Input_index__["a" /* default */]);
        this.initInput(`${this.rootElementId} select[data-model]`, __WEBPACK_IMPORTED_MODULE_2__Element_Input_Input_index__["a" /* default */]);
        this.initInput(`${this.rootElementId} input[type='radio'][data-model]`, __WEBPACK_IMPORTED_MODULE_2__Element_Input_Input_index__["a" /* default */]);
        this.initInput(`${this.rootElementId} input[type='checkbox'][data-model]`, __WEBPACK_IMPORTED_MODULE_3__Element_Input_Checkbox_index__["a" /* default */]);
    }
    /**
     *
     * @return {Object}
     */
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
            this.views.push(new __WEBPACK_IMPORTED_MODULE_0__Element_View_index__["a" /* default */](item, this.store));
        }
    }
    /**
     *
     * @param {string} selector
     * @param AbstractInputClass
     */
    initInput(selector, AbstractInputClass) {
        const elements = document.querySelectorAll(selector);
        for (let i = 0; i < elements.length; i++) {
            const item = elements[i];
            this.views.push(new AbstractInputClass(item, this.store));
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = TwoWay;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class View {
    constructor(element, store) {
        this.element = element;
        this.value = null;
        this.store = store;
        this.model = element.getAttribute("data-property");
        if (!this.model) {
            throw new Error("No data-property found on element!");
        }
        store.registerObserver(this.model, this);
    }
    update(value) {
        if (this.value !== value) {
            this.value = value;
            if (typeof this.value === 'object') {
                value = JSON.stringify(value);
            }
            this.element.innerHTML = value;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = View;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers__ = __webpack_require__(5);

class Store {
    constructor(initialStore) {
        this.subscribers = [];
        this.store = this.observe(initialStore, (property, value) => {
            this.notifyObservers(property);
        });
    }
    /**
     * Observe property for changes
     *
     * @param o
     * @param {Function} callback
     * @return {object}
     */
    observe(o, callback) {
        return Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["a" /* default */])("", o, callback);
    }
    /**
     * Notify all observers of updated property
     *
     * @param {string} property
     * @param value
     */
    notifyObservers(property) {
        let path = property.split('.');
        let propPath = "";
        let storeVal = this.store;
        for (let i = 0; i < path.length; i++) {
            if (propPath) {
                propPath += '.';
            }
            storeVal = storeVal[path[i]];
            propPath = `${propPath}${path[i]}`;
            this._notifyProperty(propPath, storeVal);
        }
    }
    /**
     *
     * @param {string} property
     * @param value
     * @private
     */
    _notifyProperty(property, value) {
        for (let i = 0; i < this.subscribers.length; i++) {
            const subscriber = this.subscribers[i];
            if (subscriber.property === property) {
                subscriber.observer.update(value);
            }
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
        this.notifyObservers(prop);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Store;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = buildProxy;
function _populate(target, path, value) {
    if (path.length > 0) {
        let sub = path.shift();
        target[sub] = _populate(target[sub], path, value);
    }
    else {
        return value;
    }
    return target;
}
function buildProxy(prefix, o, callback) {
    return new Proxy(o, {
        set(target, property, value) {
            // same as above, but add prefix
            const path = property.split('.');
            target = _populate(target, path, value);
            callback(`${prefix}${property}`, value);
            return true;
        },
        get(target, property) {
            // return a new proxy if possible, add to prefix
            const out = target[property];
            if (out instanceof Object) {
                return buildProxy(`${prefix}${property}.`, out, callback);
            }
            return out;
        }
    });
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AbstractInput__ = __webpack_require__(0);

class Input extends __WEBPACK_IMPORTED_MODULE_0__AbstractInput__["a" /* default */] {
    constructor(element, store) {
        super(element, store);
        this.element.addEventListener("change", e => {
            this.update(e.target.value);
        });
        this.element.addEventListener("keyup", e => {
            this.update(e.target.value);
        });
    }
    update(value) {
        super.update(value);
        this.element.value = value;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Input;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AbstractInput__ = __webpack_require__(0);

class Checkbox extends __WEBPACK_IMPORTED_MODULE_0__AbstractInput__["a" /* default */] {
    constructor(element, store) {
        super(element, store);
        this.propertyName = `${this.model}.${this.element.value}`;
        this.element.addEventListener("change", e => {
            this.update(e.target.checked);
        });
        this.store.registerObserver(this.propertyName, this);
    }
    update(value) {
        super.update(value);
        this.element.checked = value;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Checkbox;



/***/ })
/******/ ]);