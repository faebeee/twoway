import AbstractInput from "../AbstractInput";
import Store from "../../../Store/index";

export default class Radiobox extends AbstractInput {
    constructor(element: HTMLInputElement, store: Store) {
        super(element, store);

        this.element.addEventListener("change", e => {
            this.update((<HTMLInputElement>e.target).value);
        });

        this.store.registerObserver(this.propertyName, this);
    }

    update(value: any): void {
        super.update(value);
        this.element.checked = this.element.value === value;
    }
}
