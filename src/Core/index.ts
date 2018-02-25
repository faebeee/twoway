"use strict";

import ElementInterface from "../Element/ElementInterface";
import View from "../Element/View/index";
import Store from "../Store/index";
import Input from "../Element/Input/Input/index";
import Checkbox from "../Element/Input/Checkbox/index";
import Select from "../Element/Input/Select/index";

export default class TwoWay {
    rootElementId: string;
    store: Store;
    views: Array<ElementInterface>;

    constructor(rootElementId: string, store: Object) {
        this.rootElementId = rootElementId;
        this.store = new Store(store);
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

        this.initInput(`${this.rootElementId} input[data-model]:not([type='radio']):not([type='checkbox'])`, Input);
        this.initInput(`${this.rootElementId} textarea[data-model]`, Input);
        this.initInput(`${this.rootElementId} select[data-model]`, Select);
        this.initInput(`${this.rootElementId} input[type='radio'][data-model]`, Input);
        this.initInput(`${this.rootElementId} input[type='checkbox'][data-model]`, Checkbox);
    }

    /**
     *
     * @return {Object}
     */
    getStore(): Object {
        return this.store.store;
    }

    /**
     * Initialize all views
     *
     * @memberof TwoWay
     */
    initViews() {
        const elements = document.querySelectorAll(
            `${this.rootElementId} [data-property]`
        );

        for (let i = 0; i < elements.length; i++) {
            const item = (<HTMLInputElement>elements[i]);
            this.views.push(new View(item, this.store));
        }
    }

    /**
     *
     * @param {string} selector
     * @param AbstractInputClass
     */
    initInput(selector: string, AbstractInputClass: any) {
        const elements = document.querySelectorAll(selector);

        for (let i = 0; i < elements.length; i++) {
            const item = (<HTMLInputElement>elements[i]);
            this.views.push(new AbstractInputClass(item, this.store));
        }
    }
}
