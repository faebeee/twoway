import SubscriberInterface from "./SubscriberInterface";
import View from "../View";
export default class Store {
    store: Object;
    subscribers: Array<SubscriberInterface>;
    constructor(initialStore: Object);
    buildProxy(prefix: any, o: any, callback: any): any;
    observe(o: any, callback: any): any;
    notifyObservers(property: string, value: any): void;
    /**
     * Add new observer
     *
     * @param {string} prop
     * @param {View} view
     * @memberof Store
     */
    registerObserver(prop: string, view: View): void;
}
