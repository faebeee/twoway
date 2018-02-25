import View from "../Element/View/index";
import buildProxy from './helpers';
import ElementInterface from "../Element/ElementInterface";

export default class Store {
    store: Object;
    scopedSubscribers: Object;

    constructor(initialStore: Object) {
        this.scopedSubscribers = {};

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
        if(!this.scopedSubscribers[property]){
            return;
        }

        const observers = this.scopedSubscribers[property].observers;
        for (let i = 0; i < observers.length; i++) {
            const observer = observers[i];
            if (observer.value !== value) {
                observer.update(value);
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
    registerObserver(prop: string, view: ElementInterface): void {
        if(!this.scopedSubscribers[prop]){
            this.scopedSubscribers[prop] = {observers : []};
        }

        this.scopedSubscribers[prop].observers.push(view);
        this.notifyObservers(prop)
    }
}
