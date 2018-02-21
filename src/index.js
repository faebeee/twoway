import Core from "./Core";

(function() {
    if (typeof exports !== "undefined") {
        if (typeof module !== "undefined" && module.exports) {
            exports = module.exports = create;
        }
        exports.twoway = create;
    } else {
        root.twoway = create;
    }

    /**
     * create new instance
     *
     * @param {String} rootId
     * @param {Object} state
     * @returns
     */
    function create(rootId, state) {
        return new Core(rootId, state).getStore();
    }
})();
