function _populate(target:Object, path: Array<string>, value: any) {
    if(path.length > 0){
        let sub = path.shift();
        target[sub] = _populate(target[sub], path, value);
    }else {
        return value;
    }
    return target;
}

export default function buildProxy(prefix: string, o: any, callback: Function) {
    return new Proxy(o, {
        set(target: Object, property: string, value: any) {
            // same as above, but add prefix
            const path = property.split('.');
            target = _populate(target, path, value);
            callback(`${prefix}${property}`, value);
            return true;
        },


        get(target: Object, property: string) {
            // return a new proxy if possible, add to prefix
            const out = target[property];

            if (out instanceof Object) {
                return buildProxy(
                    `${prefix}${property}.`,
                    out,
                    callback
                );
            }
            return out;
        }
    });
}
