const unit = require("unit.js");

const TwoWay = require('../src/Core/index.ts');

describe("Store", function() {
    describe("Create Store", function() {
        it("with nul values", function() {
             let store = TwoWay('#app', {
                 name: null
             });

             unit.value(store.name).isNull()
        });
    });
});
