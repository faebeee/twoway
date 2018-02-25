"use strict";

import ElementInterface from "../Element/ElementInterface";
import View from "../Element/View";
import Store from "../Store";
import Input from "../Element/Input/Input";
import Checkbox from "../Element/Input/Checkbox";
import AbstractInput from "../Element/Input/AbstractInput";

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
        this.initInputs();
        this.initCheckbox();
    }

    /** */
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
            const item = elements[i];
            this.views.push(new View(item, this.store));
        }
    }

    initInputs() {
        const elements = document.querySelectorAll(
            `${this.rootElementId} input[data-model]:not([type='checkbox'])`
        );

        for (let i = 0; i < elements.length; i++) {
            const item = elements[i];
            this.views.push(new Input(item, this.store));
        }
    }

    initCheckbox() {
        const elements = document.querySelectorAll(`${this.rootElementId} input[type='checkbox'][data-model]`);

        for (let i = 0; i < elements.length; i++) {
            const item = elements[i];
            this.views.push(new Checkbox(item, this.store));
        }
    }
}
