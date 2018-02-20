import Store from "../../Store/index";
import ElementInterface from "../Interface";
import AbstractInput from "../AbstractInput";

export default class View implements ElementInterface {
    element: Element;
    propertyName: string;
    value: any;
    store: Store;

    constructor(element: Element, store: Store) {
        this.element = element;
        this.value = null;
        this.store = store;
        this.propertyName = element.getAttribute("data-property");

        if (!this.propertyName) {
            throw new Error("No data-property found on element!");
        }
        
        store.registerObserver(this.propertyName, this);
    }

    update(value: any): void{
        if (this.value !== value) {
            this.value = value;
            this.element.innerHTML = this.value;            
        }
    }
}
