import AbstractInput from "../AbstractInput";
import Store from "../../Store/index";

export default class Checkbox extends AbstractInput {
    constructor(element: Element, store: Store) {
        super(element, store);
    }

    update(value: any): void {
        super.update(value);
    }
}
