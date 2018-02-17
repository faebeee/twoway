import Store from "../../Store";
export default class Input {
    element: Element;
    propertyName: string;
    value: any;
    store: Store;
    constructor(element: Element, store: Store);
    emitUpdateToStore(): void;
    update(value: any): void;
}
