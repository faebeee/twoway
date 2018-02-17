import StoreItemInterface from "./StoreItemInterface";
import View from "../View";
export default class Store {
    values: Array<StoreItemInterface>;
    constructor(initialStore: Object);
    /**
     * Set value
     *
     * @param {string} prop
     * @param {(Boolean | String | Number | Object)} value
     * @memberof Store
     */
    setValue(prop: string, value: Boolean | String | Number | Object): void;
    /**
     * Get value
     *
     * @param {string} prop
     * @returns {(Boolean | String | Number | Object)}
     * @memberof Store
     */
    getValue(prop: string): Boolean | String | Number | Object;
    /**
     * Check if value has been setup in store
     *
     * @param {string} prop
     * @returns {Boolean}
     * @memberof Store
     */
    isPropertySetUp(prop: string): Boolean;
    /**
     * setup prop
     *
     * @param {string} prop
     * @memberof Store
     */
    setupProperty(prop: string): void;
    /**
     * Add new observer
     *
     * @param {string} prop
     * @param {View} view
     * @memberof Store
     */
    registerObserver(prop: string, view: View): void;
}
