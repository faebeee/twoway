import Store from "../Store/index";
import ElementInterface from "./Interface";

export default abstract class AbstractInput implements ElementInterface {
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
            this.update((<HTMLInputElement>e.target).value);
        });
    }

    update(value: any): void{
        if (this.value !== value) {
            this.value = value;
            this.store.store[this.propertyName] = this.value;
            this._emitUpdateToElement();
        }
    }

    _emitUpdateToElement(): void {
        var event = new CustomEvent("update", { detail: this.value });
        this.element.dispatchEvent(event);
    }
}
