import StoreItemInterface from "./StoreItemInterface";
import View from "../View";

export default class Store {
    values: Array<StoreItemInterface>;

    constructor(initialStore: Object) {
        this.values = [];
        const keys = Object.keys(initialStore);

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            this.values.push({
                name: key,
                observers: [],
                value: initialStore[key]
            });
        }
    }

    setValue(prop: string, value: Boolean | String | Number | Object): void {
        for (let i = 0; i < this.values.length; i++) {
            const val = this.values[i];
            if (val.name !== prop) {
                continue;
            }
            val.value = value;
            val.observers.forEach(observer => {
                observer.update(value);
            });
        }
    }

    getValue(prop: string) {
        for (let i = 0; i < this.values.length; i++) {
            const val = this.values[i];
            if (val.name === prop) {
                return val.value;
            }
        }
        return null;
    }

    isPropertySetUp(prop: string): Boolean {
        for (let i = 0; i < this.values.length; i++) {
            const val = this.values[i];
            if (val.name === prop) {
                return true;
            }
            return false;
        }
    }

    setupProperty(prop: string): void {
        this.values.push({
            name: prop,
            observers: [],
            value: null
        });
    }

    registerObserver(prop: string, view: View): void {
        if(!this.isPropertySetUp(prop)){
            this.setupProperty(prop);
        }

        for (let i = 0; i < this.values.length; i++) {
            const val = this.values[i];
            if (val.name !== prop) {
                continue;
            }

            val.observers.push(view);
            view.update(this.getValue(prop));
        }
    }
}
