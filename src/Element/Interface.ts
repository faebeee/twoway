import Store from "../Store/index";

export default interface ElementInterface {
    element: Element;
    propertyName: string;
    value: any;
    store: Store;

    /**
     * Called when a value has been updated
     * 
     * @memberof ElementInterface
     */
    update(): void;

    /**
     * Update a value
     * 
     * @param {*} value 
     * @memberof ElementInterface
     */
    setValue(value: any): void;
};
