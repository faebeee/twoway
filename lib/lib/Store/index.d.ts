import StoreItemInterface from "./StoreItemInterface";
import View from "../View";
export default class Store {
    values: Array<StoreItemInterface>;
    constructor(initialStore: Object);
    setValue(prop: string, value: Boolean | String | Number | Object): void;
    getValue(prop: string): Object;
    isPropertySetUp(prop: string): Boolean;
    setupProperty(prop: string): void;
    registerObserver(prop: string, view: View): void;
}
