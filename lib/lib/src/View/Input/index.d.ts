import Store from "../Store";
export default class Input {
    element: Element;
    propertyName: string;
    value: any;
    constructor(element: Element, store: Store);
    update(value: any): void;
}
