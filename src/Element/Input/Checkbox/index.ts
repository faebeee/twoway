import AbstractInput from "../AbstractInput";
import Store from "../../../Store/index";

export default class Checkbox extends AbstractInput {
    constructor(element: HTMLInputElement, store: Store) {
        super(element, store);

        this.propertyName = `${this.model}.${this.element.value}`;

        this.element.addEventListener("change", e => {
            this.update((<HTMLInputElement>e.target).checked);
        });

        this.store.registerObserver(this.propertyName, this);
    }

    update(value){
        super.update(value);
        this.element.checked = value;
    }
}
