import View from "./View";
import Store from "./Store";
export default class TwoWay {
    rootElementId: string;
    store: Store;
    views: Array<View>;
    constructor(rootElementId: string, store?: Object);
    init(): void;
    initViews(): void;
    initInputs(): void;
    setValue(prop: string, val: any): void;
    getValue(prop: string): void;
}
