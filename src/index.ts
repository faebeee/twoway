"use strict";

import View from "./View";
import Store from "./Store";
import Input from "./View/Input";

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

    init() {
        this.initViews();
        this.initInputs();
    }

    initViews() {
        const elements = document.querySelectorAll(
            `${this.rootElementId} [data-property]`
        );

        elements.forEach(item => {
            this.views.push(new View(item, this.store));
        });
    }

    initInputs() {
        const elements = document.querySelectorAll(
            `${this.rootElementId} [data-model]`
        );

        elements.forEach(item => {
            this.views.push(new Input(item, this.store));
        });
    }

    setValue(prop: string, val: any) {
        this.store.setValue(prop, val);
    }

    getValue(prop: string) {
        this.store.getValue(prop);
    }
}
