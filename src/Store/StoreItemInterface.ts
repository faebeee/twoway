import View from '../View';

export default interface StoreItemInterface {
    name: string;
    value: any;
    observers: Array<View>;
};