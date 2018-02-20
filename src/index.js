import Core from './Core';

if (typeof exports !== "undefined") {
    if (typeof module !== "undefined" && module.exports) {
        exports = module.exports = create;
    }
    exports.TwoWay = create;
} else {
    root.TwoWay = create;
}

function create(rootId, state){
    return new Core(rootId, state);
}
    