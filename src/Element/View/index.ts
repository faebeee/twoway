import Store from "../../Store/index";
import ElementInterface from "../ElementInterface";

export default class View implements ElementInterface {
    element: HTMLInputElement;
    model: string;
    value: any;
    store: Store;

    constructor(element: HTMLInputElement, store: Store) {
        this.element = element;
        this.value = null;
        this.store = store;
        this.model = element.getAttribute("data-property");

        if (!this.model) {
            throw new Error("No data-property found on element!");
        }

        this.store.registerObserver(this.model, this);
    }

    update(value: any): void {
        if (this.value !== value) {
            this.value = value;
            if(typeof this.value === 'object'){
                this.value = JSON.stringify(value);
            }
            this.element.innerHTML = this.value;
        }
    }
}
