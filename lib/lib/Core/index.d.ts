import View from "../View";
import Store from "../Store";
export default class TwoWay {
    rootElementId: string;
    store: Store;
    views: Array<View>;
    constructor(rootElementId: string, store?: Object);
    /**
     * Initialize all elements
     *
     * @memberof TwoWay
     */
    init(): void;
    /**
     * Initialize all views
     *
     * @memberof TwoWay
     */
    initViews(): void;
    /**
     * Initialize all input elements
     *
     * @memberof TwoWay
     */
    initInputs(): void;
    /**
     * Set value in store
     *
     * @param {string} prop
     * @param {*} val
     * @memberof TwoWay
     */
    setValue(prop: string, val: any): void;
    /**
     * Get value from store
     *
     * @param {string} prop
     * @memberof TwoWay
     */
    getValue(prop: string): void;
}
