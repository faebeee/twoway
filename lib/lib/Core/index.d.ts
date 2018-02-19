import View from "../View";
import Store from "../Store";
export default class TwoWay {
    rootElementId: string;
    store: Store;
    views: Array<View>;
    constructor(rootElementId: string, store: Object);
    /**
     * Initialize all elements
     *
     * @memberof TwoWay
     */
    init(): void;
    /** */
    getStore(): Object;
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
}
