import Store from "../../Store";

export default class Input {
    element: Element;
    propertyName: string;
    value: any;
    store: Store;

    constructor(element: Element, store: Store) {
        this.element = element;
        this.propertyName = element.getAttribute("data-model");
        this.value = null;
        this.store = store;

        store.registerObserver(this.propertyName, this);

        this.element.addEventListener("change", e => {
            this.value = (<HTMLInputElement>e.target).value;
            this.emitUpdateToStore();
        });

        this.element.addEventListener("keyup", e => {
            this.value = (<HTMLInputElement>e.target).value;
            this.emitUpdateToStore();
        });
    }

    emitUpdateToStore(): void {
        this.store.store[this.propertyName] = this.value;
    }

    update(value: any): void {
        this.value = value;
        (<HTMLInputElement>this.element).value = value;
    }
}
