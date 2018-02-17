import StoreItemInterface from "./StoreItemInterface";
import View from '../View';

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

    setValue(prop: string, value: any): void {
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

    registerObserver(prop : string, view: View) {
        for (let i = 0; i < this.values.length; i++) {
            const val = this.values[i];
            if (val.name !== prop) {
                continue;
            }
            val.observers.push(view);
        }
    }
}
