import AbstractInput from "../AbstractInput";
import Store from "../../../Store";

export default class Input extends AbstractInput {
    constructor(element: Element, store: Store) {
        super(element, store);

        this.element.addEventListener("change", e => {
            this.update((<HTMLInputElement>e.target).value);
        });

        this.element.addEventListener("keyup", e => {
            this.update((<HTMLInputElement>e.target).value);
        });
    }

    update(value: any): void {
        super.update(value);
        (<HTMLInputElement>this.element).value = this.value;
    }
}
