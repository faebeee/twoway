import AbstractInput from "../AbstractInput";
import Store from "../../Store/index";

export default class Input extends AbstractInput {
    constructor(element: Element, store: Store) {
        super(element, store);

        this.element.addEventListener("change", e => {
            this.setValue((<HTMLInputElement>e.target).value);
        });

        this.element.addEventListener("keyup", e => {
            this.setValue((<HTMLInputElement>e.target).value);
        });
    }

    update(): void {
        (<HTMLInputElement>this.element).value = this.value;
    }
}
