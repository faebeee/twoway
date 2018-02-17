"use strict";

import View from "./View";
import Store from "./Store";

export default class TwoWay {
    rootElementId:string;
    store:Store;
    views:Array<View>;

    constructor(rootElementId:string, store:Store) {
        this.rootElementId = rootElementId;
        this.store = new Store(store || {});
        this.views = [];

        this.init();
    }

    init() {
        const elements = document.querySelectorAll(
            `${this.rootElementId} [data-property]`
        );

        elements.forEach(item => {
            this.views.push(new View(item, this.store));
        });
    }

    setValue(prop:string, val: any) {
        this.store.setValue(prop, val);
    }
};
