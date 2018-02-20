"use strict";

import ElementInterface from "../Element/Interface";
import View from "../Element/View";
import Store from "../Store";
import Input from "../Element/Input";
import Radiobox from "../Element/Radiobox";
import AbstractInput from "../Element/AbstractInput";

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

        //this._initFields(`${this.rootElementId} textarea[data-model]`, Input);
        //this._initFields(`${this.rootElementId}  input[data-model][type="radio"]`, Radiobox);
    }
}
