import Store from "../Store/index";

export default interface ElementInterface {
    element: HTMLElement;
    model: string;
    value: any;
    store: Store;

    /**
     * Update a value
     *
     * @param {*} value
     * @memberof ElementInterface
     */
    update(value: any): void;
};
