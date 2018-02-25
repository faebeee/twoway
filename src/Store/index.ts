import SubscriberInterface from "./SubscriberInterface";
import View from "../Element/View/index";
import buildProxy from './helpers';

export default class Store {
    store: Object;
    subscribers: Array<SubscriberInterface>;

    constructor(initialStore: Object) {
        this.subscribers = [];

        this.store = this.observe(initialStore, (property, value) => {
            this.notifyObservers(property);
        });
    }

    /**
     * Observe property for changes
     *
     * @param o
     * @param {Function} callback
     * @return {object}
     */
    observe(o: any, callback: Function) {
        return buildProxy("", o, callback);
    }

    /**
     * Notify all observers of updated property
     *
     * @param {string} property
     * @param value
     */
    notifyObservers(property: string): void {
        let path = property.split('.');
        let propPath = "";
        let storeVal = this.store;

        for(let i = 0; i < path.length; i++){
            if(propPath){
                propPath+='.';
            }
            storeVal = storeVal[path[i]];
            propPath = `${propPath}${path[i]}`;
            this._notifyProperty(propPath, storeVal);
        }
    }

    /**
     *
     * @param {string} property
     * @param value
     * @private
     */
    _notifyProperty(property: string, value: any): void {
        for (let i = 0; i < this.subscribers.length; i++) {
            const subscriber = this.subscribers[i];
            if (subscriber.property === property) {
                subscriber.observer.update(value);
            }
        }
    }

    /**
     * Add new observer
     *
     * @param {string} prop
     * @param {View} view
     * @memberof Store
     */
    registerObserver(prop: string, view: View): void {
        this.subscribers.push({
            property: prop,
            observer: view
        });

        this.notifyObservers(prop)
    }
}
