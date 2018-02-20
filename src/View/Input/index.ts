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
            this.setValue((<HTMLInputElement>e.target).value);
        });

        this.element.addEventListener("keyup", e => {
           this.setValue((<HTMLInputElement>e.target).value);
        });
    }

    setValue(value: any){
        if(this.value !== value){
            this.value = value;
            this.emitUpdate();
        }
    }
    
    emitUpdateToElement(): void {
        var event = new CustomEvent("update", { detail: this.value });
        this.element.dispatchEvent(event);
    }

    emitUpdateToStore(): void {
        this.store.store[this.propertyName] = this.value;
    }

    emitUpdate() {
        this.emitUpdateToElement();
        this.emitUpdateToStore();
    }

    update(value: any): void {
        this.value = value;
        (<HTMLInputElement>this.element).value = value;
    }
}
