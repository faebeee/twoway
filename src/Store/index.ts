import StoreItemInterface from "./StoreItemInterface";
import View from "../View";

export default class Store {
    values: Array<StoreItemInterface>;
    store: Object;
    subscribers: Array<Object>;

    constructor(initialStore: Object) {
        this.values = [];
        this.subscribers = [];

        this.store = this.observe(initialStore, (property, value) => {
            this.notifyObservers(property, value);
        });
    }

    buildProxy(prefix, o, callback) {
        return new Proxy(o, {
            set(target, property, value) {
                
                // same as above, but add prefix
                callback(prefix + property, value);
                target[property] = value;
                return true;
            },
            get(target, property) {
                // return a new proxy if possible, add to prefix
                const out = target[property];
                if (out instanceof Object) {
                    return this.buildProxy(
                        prefix + property + ".",
                        out,
                        callback
                    );
                }
                return out; // primitive, ignore
            }
        });
    }

    observe(o, callback) {
        return this.buildProxy("", o, callback);
    }

    notifyObservers(property: string, value: any) {
        for (let i = 0; i < this.subscribers.length; i++) {
            const subscriber = this.subscribers[i];
            if (subscriber.property !== property) {
                continue;
            }
            subscriber.observer.update(value);
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

        view.update(this.store[prop]);
    }
}
