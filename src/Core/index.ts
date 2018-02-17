"use strict";

import View from "../View";
import Store from "../Store";
import Input from "../View/Input";

export default class TwoWay {
    rootElementId: string;
    store: Store;
    views: Array<View>;

    constructor(rootElementId: string, store: Object = {}) {
        this.rootElementId = rootElementId;
        this.store = new Store(store || {});
        this.views = [];

        this.init();
    }

    /**
     * Initialize all elements
     * 
     * @memberof TwoWay
     */
    init(): void {
        this.initViews();
        this.initInputs();
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

        for(let i = 0; i < elements.length; i++){
            const item = elements[i];
            this.views.push(new View(item, this.store));
        }
    }

    /**
     * Initialize all input elements
     * 
     * @memberof TwoWay
     */
    initInputs() {
        const elements = document.querySelectorAll(
            `${this.rootElementId} [data-model]`
        );

        for (let i = 0; i < elements.length; i++) {
            const item = elements[i];
            this.views.push(new Input(item, this.store));
        }
    }

    /**
     * Set value in store
     * 
     * @param {string} prop 
     * @param {*} val 
     * @memberof TwoWay
     */
    setValue(prop: string, val: any) {
        this.store.setValue(prop, val);
    }

    /**
     * Get value from store
     * 
     * @param {string} prop 
     * @memberof TwoWay
     */
    getValue(prop: string) {
        this.store.getValue(prop);
    }
}