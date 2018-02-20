import View from '../Element/View';

export default interface StoreItemInterface {
    name: string;
    value: Boolean|String|Number|Object;
    observers: Array<View>;
};