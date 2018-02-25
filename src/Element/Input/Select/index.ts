import Store from "../../../Store/index";
import ElementInterface from "../../ElementInterface";

export default class Select implements ElementInterface {
    element: HTMLSelectElement;
    model: string;
    propertyName: string;
    value: any;
    store: Store;
    isMulti: Boolean = false;

    constructor(element: HTMLSelectElement, store: Store) {
        this.element = element;
        this.model = element.getAttribute("data-model");
        this.propertyName = element.getAttribute("data-model");
        this.value = null;
        this.store = store;

        this.isMulti = this.element.getAttribute("multiple") !== null;

        this.element.addEventListener("change", e => {
            this.onChange((<HTMLSelectElement>e.target).value);
        });

        this.store.registerObserver(this.propertyName, this);


        let selected = this.getSelectedOptions();
        if(this.isMulti){
            this.value = selected;
        }else{
            this.value = selected.shift();
            this.onChange(this.value);
        }

    }

    getSelectedOptions() {
        let result = [];
        const options = this.element && this.element.options;


        for (var i = 0, iLen = options.length; i < iLen; i++) {
            let opt = options[i];
            if (opt.selected) {
                result.push(opt.value || opt.text);
            }
        }

        return result;
    }

    onChange(value: string) {
        if (this.isMulti) {
            this.value = this.getSelectedOptions();
        } else if (this.store.store[this.propertyName] !== value) {
            this.value = value;
        }

        this.store.store[this.propertyName] = this.value;
        this.emitUpdateToElement();
    }

    /**
     * Trigger the update method. Only triggered if there is a difference in the values
     * @param value New value
     */
    update(value: any): void {
        if (this.isMulti) {
            const options = this.element && this.element.options;
            for (var i = 0, iLen = options.length; i < iLen; i++) {
                let opt = options[i];
                opt.selected = value.indexOf(opt.value) !== -1
            }
        }else{
          const options = this.element && this.element.options;
            for (var i = 0, iLen = options.length; i < iLen; i++) {
                let opt = options[i];
                opt.selected = value === opt.value;
            }
        }
    }

    /**
     * Emitting update event to the DOM element
     *
     * @memberof AbstractInput
     */
    emitUpdateToElement(): void {
        const event = new CustomEvent("update", {detail: this.value});
        this.element.dispatchEvent(event);
    }
}
