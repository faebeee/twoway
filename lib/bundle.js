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


var _src = __webpack_require__(1);

var _src2 = _interopRequireDefault(_src);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _src2.default("#app");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const View_1 = __webpack_require__(2);
const Store_1 = __webpack_require__(3);
const Input_1 = __webpack_require__(4);
class TwoWay {
    constructor(rootElementId, store = {}) {
        this.rootElementId = rootElementId;
        this.store = new Store_1.default(store || {});
        this.views = [];
        this.init();
    }
    init() {
        this.initViews();
        this.initInputs();
    }
    initViews() {
        const elements = document.querySelectorAll(`${this.rootElementId} [data-property]`);
        elements.forEach(item => {
            this.views.push(new View_1.default(item, this.store));
        });
    }
    initInputs() {
        const elements = document.querySelectorAll(`${this.rootElementId} [data-model]`);
        elements.forEach(item => {
            this.views.push(new Input_1.default(item, this.store));
        });
    }
    setValue(prop, val) {
        this.store.setValue(prop, val);
    }
    getValue(prop) {
        this.store.getValue(prop);
    }
}
exports.default = TwoWay;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class View {
    constructor(element, store) {
        this.element = element;
        this.propertyName = element.getAttribute('data-property');
        this.value = null;
        store.registerObserver(this.propertyName, this);
    }
    update(value) {
        this.value = value;
        this.element.innerHTML = value;
    }
}
exports.default = View;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Store {
    constructor(initialStore) {
        this.values = [];
        const keys = Object.keys(initialStore);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            this.values.push({
                name: key,
                observers: [],
                value: initialStore[key]
            });
        }
    }
    setValue(prop, value) {
        for (let i = 0; i < this.values.length; i++) {
            const val = this.values[i];
            if (val.name !== prop) {
                continue;
            }
            val.value = value;
            val.observers.forEach(observer => {
                observer.update(value);
            });
        }
    }
    getValue(prop) {
        for (let i = 0; i < this.values.length; i++) {
            const val = this.values[i];
            if (val.name === prop) {
                return val.value;
            }
        }
        return null;
    }
    isPropertySetUp(prop) {
        for (let i = 0; i < this.values.length; i++) {
            const val = this.values[i];
            if (val.name === prop) {
                return true;
            }
            return false;
        }
    }
    setupProperty(prop) {
        this.values.push({
            name: prop,
            observers: [],
            value: null
        });
    }
    registerObserver(prop, view) {
        if (!this.isPropertySetUp(prop)) {
            this.setupProperty(prop);
        }
        for (let i = 0; i < this.values.length; i++) {
            const val = this.values[i];
            if (val.name !== prop) {
                continue;
            }
            val.observers.push(view);
            view.update(this.getValue(prop));
        }
    }
}
exports.default = Store;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Input {
    constructor(element, store) {
        this.element = element;
        this.propertyName = element.getAttribute("data-model");
        this.value = null;
        this.store = store;
        store.registerObserver(this.propertyName, this);
        this.element.addEventListener("change", e => {
            this.value = event.target.value;
            this.emitUpdateToStore();
        });
        this.element.addEventListener("keyup", e => {
            this.value = event.target.value;
            this.emitUpdateToStore();
        });
    }
    emitUpdateToStore() {
        this.store.setValue(this.propertyName, this.value);
    }
    update(value) {
        this.value = value;
    }
}
exports.default = Input;


/***/ })
/******/ ]);