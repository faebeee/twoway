import Store from '../Store';

export default class View {

    element: Element;
    propertyName: string;
    value: any;

    constructor(element: Element, store: Store) {
        this.element = element;
        this.propertyName = element.getAttribute('data-property');
        this.value = null;
        store.registerObserver(this.propertyName, this);
    }

    update(value: any) : void{
        this.value = value;
        this.element.innerHTML = value;
    }
}