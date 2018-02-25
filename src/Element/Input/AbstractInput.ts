import Store from "../../Store/index";
import ElementInterface from "../ElementInterface";

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
    }

    /**
     * Trigger the update method. Only triggered if there is a difference in the values
     * @param value New value 
     */
    update(value: any): void{
        if (this.value !== value) {
            this.value = value;
            this.store.store[this.propertyName] = this.value;
            this._emitUpdateToElement();
        }
    }

    /**
     * Emitting update event to the DOM element
     * 
     * @memberof AbstractInput
     */
    _emitUpdateToElement(): void {
        var event = new CustomEvent("update", { detail: this.value });
        this.element.dispatchEvent(event);
    }
}